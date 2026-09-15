# Le Hub

The Le Hub site: a static Astro build, published in English and French, with all
of its copy and photography held in Sanity.

## Running it

```sh
bun install
bun run dev            # the site, at localhost:4321
bun run studio         # the editor, at localhost:3333
```

The editor is also deployed, for anyone who is not running it locally:
**https://lehub.sanity.studio**. `bun run studio:deploy` republishes it — the
host and app id are pinned in `studio/sanity.cli.ts`, so it never prompts.

`bun run build` writes the whole site — both languages — to `dist/`.

`.env` holds the project id and dataset (see `.env.example`). The build only
reads published content from a public dataset, so it needs no token; the seed
script does, and only it.

## The two languages

English sits at the root and French is prefixed: `/about` and `/fr/about`. Both
trees are built from the same files — every page lives under
`src/pages/[...locale]/` and is built twice, once per language, so a change to a
page is a change to both. `src/lib/i18n.js` holds the prefix rules and the
`localize()` helper that keeps an in-site link inside the tree it was clicked in.

Content is localized at the field level rather than the document level: one
document carries both languages, side by side in the Studio. That is what keeps
a person's photograph, a programme's order, or a report's cover shared between
the two rather than duplicated and free to drift. `src/lib/queries.js` picks the
language being built and falls back to English, so a field left untranslated
shows English rather than a hole.

## Band and hero sizes

The display bands used to carry a hand-measured size per title — 36.9cqw for
ABOUT, 23.15 for OFFERINGS, and so on, each read off the Figma artboard. Those
numbers turn out to be exactly `100 / (width of the title in ems)`: the size at
which the title spans its band. Now that the titles come out of a CMS in two
languages, `src/lib/fit.js` measures the actual font at build time and computes
that size, so "À PROPOS" sets itself correctly without anyone touching the code.
The hero works the same way, holding the fraction of the column its two lines
were composed at.

## Editing

Everything is in the Studio:

- **Pages** — the six singletons, each with its hero, its band label, and its own copy
- **People, Programmes, Reports, Testimonials, FAQ questions** — the lists the pages draw from
- **Site settings** — the footer block, the land acknowledgement, the newsletter endpoint, the social accounts
- **Navigation** — one list, read by both the sidebar and the mobile menu
- **Interface labels** — the words the interface says on its own behalf

Art direction stays in code on purpose: band colours, programme colours, and the
type scale are keyed to each other across the site, so they are not editable
fields.

## Seeding

`scripts/seed.mjs` wrote the dataset the first time — both languages and every
photograph — and is kept so the dataset can be rebuilt from scratch. It is safe
to re-run: documents are written at fixed ids and images are matched by filename
before being uploaded again. It overwrites, so anything edited in the Studio
since the last run is lost.

```sh
node --env-file=.env scripts/seed.mjs --dry   # build everything, write nothing
node --env-file=.env scripts/seed.mjs
```
