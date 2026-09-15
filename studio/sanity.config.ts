import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {internationalizedArray} from 'sanity-plugin-internationalized-array'

import {schemaTypes} from './schemaTypes'
import {structure} from './structure'

/** The singletons are one document each at a fixed id, so they must not be
 *  creatable or deletable from the Studio's own menus. */
const SINGLETONS = new Set([
  'homePage',
  'aboutPage',
  'offeringsPage',
  'reportsPage',
  'faqPage',
  'contactPage',
  'siteSettings',
  'navigation',
  'uiStrings',
])

export default defineConfig({
  name: 'default',
  title: 'Le Hub',
  projectId: 'e797khcc',
  dataset: 'production',

  plugins: [
    structureTool({structure}),
    // Field-level rather than document-level: every piece of this site exists
    // in both languages and the two are written together, so one document
    // carrying both keeps them from drifting and keeps the structure — a
    // person's photo, a programme's order — shared rather than duplicated.
    internationalizedArray({
      languages: (client) =>
        client.fetch(`*[_type == "locale"]|order(order asc){"id": tag, "title": name}`),
      defaultLanguages: ['en'],
      fieldTypes: ['string', 'text', 'richText'],
      buttonLocations: ['field'],
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
    templates: (prev) => prev.filter((t) => !SINGLETONS.has(t.schemaType)),
  },

  document: {
    actions: (prev, {schemaType}) =>
      SINGLETONS.has(schemaType)
        ? prev.filter(({action}) => action !== 'unpublish' && action !== 'delete' && action !== 'duplicate')
        : prev,
  },
})
