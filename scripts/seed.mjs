// Seeds the Sanity dataset with the site's content in both languages, and
// uploads the photographs that used to live in src/assets/images.
//
// Safe to re-run: every document is written with `createOrReplace` at a fixed
// id, and images are looked up by their original filename before being
// uploaded again, so a second run replaces content without duplicating assets.
//
//   node --env-file=.env scripts/seed.mjs
//
// Pass --dry to build every document and print what would be written without
// touching the dataset.

import {createClient} from '@sanity/client'
import {readFile} from 'node:fs/promises'
import {join, dirname} from 'node:path'
import {fileURLToPath} from 'node:url'
import {documents, IMAGES} from './lib/content.mjs'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dry = process.argv.includes('--dry')

const client = createClient({
  projectId: process.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.PUBLIC_SANITY_DATASET,
  apiVersion: '2025-02-19',
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
})

/** Upload each photograph once, keyed by its original filename so a re-run
 *  finds what is already there instead of uploading a second copy. */
async function uploadImages() {
  const assets = {}
  const existing = dry
    ? []
    : await client.fetch(`*[_type == "sanity.imageAsset"]{_id, originalFilename}`)

  for (const file of IMAGES) {
    const found = existing.find((a) => a.originalFilename === file)
    if (found) {
      assets[file] = found._id
      console.log(`  = ${file}`)
      continue
    }
    if (dry) {
      assets[file] = `image-dry-${file}`
      continue
    }
    const data = await readFile(join(root, 'src/assets/images', file))
    const asset = await client.assets.upload('image', data, {filename: file})
    assets[file] = asset._id
    console.log(`  + ${file}`)
  }
  return assets
}

async function main() {
  if (!process.env.SANITY_WRITE_TOKEN && !dry) {
    throw new Error('SANITY_WRITE_TOKEN is not set — run with `node --env-file=.env`')
  }

  console.log('Images')
  const assets = await uploadImages()

  const docs = documents(assets)
  console.log(`\nDocuments (${docs.length})`)

  if (dry) {
    for (const doc of docs) console.log(`  · ${doc._id} (${doc._type})`)
    console.log('\nDry run — nothing written.')
    return
  }

  // One transaction: either the dataset ends up whole or it is untouched, so a
  // half-seeded dataset can never be what the site builds against.
  const tx = docs.reduce((t, doc) => t.createOrReplace(doc), client.transaction())
  await tx.commit()
  for (const doc of docs) console.log(`  · ${doc._id}`)
  console.log('\nDone.')
}

main().catch((error) => {
  console.error(error.message)
  process.exit(1)
})
