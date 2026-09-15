import {DocumentIcon, HomeIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

/** Every page opens on a full-bleed photo and a coloured band. The band's
 *  colour is art direction and stays in code — the nav is keyed to it — so only
 *  the words it carries are edited here. Its size is measured from the font at
 *  build time, which is why there is no size to set: a longer French title sets
 *  itself smaller on its own. */
const hero = [
  defineField({name: 'heroImage', type: 'image', options: {hotspot: true}}),
  defineField({name: 'heroAlt', title: 'Hero alt text', type: 'internationalizedArrayString'}),
  defineField({name: 'bandLabel', type: 'internationalizedArrayString'}),
]

const meta = defineField({
  name: 'title',
  title: 'Browser title',
  type: 'internationalizedArrayString',
})

export const homePageType = defineType({
  name: 'homePage',
  title: 'Home page',
  icon: HomeIcon,
  type: 'document',
  groups: [
    {name: 'hero', title: 'Hero', default: true},
    {name: 'about', title: 'About'},
    {name: 'resources', title: 'Resources'},
  ],
  fields: [
    {...meta, group: 'hero'},
    defineField({name: 'heroImage', type: 'image', options: {hotspot: true}, group: 'hero'}),
    defineField({name: 'heroAlt', type: 'internationalizedArrayString', group: 'hero'}),
    defineField({
      name: 'heroLines',
      title: 'Hero lines',
      type: 'internationalizedArrayText',
      description: 'Two lines, one per line — each is stamped as its own sticker.',
      group: 'hero',
    }),

    defineField({name: 'aboutBandLabel', type: 'internationalizedArrayString', group: 'about'}),
    defineField({name: 'aboutImage', type: 'image', options: {hotspot: true}, group: 'about'}),
    defineField({name: 'aboutImageAlt', type: 'internationalizedArrayString', group: 'about'}),
    defineField({name: 'aboutBody', type: 'internationalizedArrayRichText', group: 'about'}),
    defineField({name: 'offeringsBandLabel', type: 'internationalizedArrayString', group: 'about'}),

    defineField({name: 'resourcesBandLabel', type: 'internationalizedArrayString', group: 'resources'}),
    defineField({name: 'wikiLabel', type: 'internationalizedArrayString', group: 'resources'}),
    defineField({name: 'wikiImage', type: 'image', group: 'resources'}),
    defineField({name: 'reportsLabel', type: 'internationalizedArrayString', group: 'resources'}),
    defineField({name: 'reportsImage', type: 'image', group: 'resources'}),
  ],
  preview: {prepare: () => ({title: 'Home page'})},
})

export const aboutPageType = defineType({
  name: 'aboutPage',
  title: 'About page',
  icon: DocumentIcon,
  type: 'document',
  groups: [
    {name: 'top', title: 'Opening', default: true},
    {name: 'team', title: 'Team & board'},
    {name: 'roots', title: 'Roots'},
    {name: 'approach', title: 'Approach'},
  ],
  fields: [
    {...meta, group: 'top'},
    ...hero.map((f) => ({...f, group: 'top'})),
    defineField({name: 'statement', type: 'internationalizedArrayRichText', group: 'top'}),
    defineField({name: 'statementImage', type: 'image', options: {hotspot: true}, group: 'top'}),
    defineField({name: 'statementImageAlt', type: 'internationalizedArrayString', group: 'top'}),
    defineField({name: 'focusImage', type: 'image', options: {hotspot: true}, group: 'top'}),
    defineField({name: 'focusImageAlt', type: 'internationalizedArrayString', group: 'top'}),
    defineField({name: 'focus', type: 'internationalizedArrayRichText', group: 'top'}),
    defineField({name: 'momentImage', type: 'image', options: {hotspot: true}, group: 'top'}),
    defineField({name: 'moment', type: 'internationalizedArrayRichText', group: 'top'}),

    defineField({name: 'teamBandLabel', type: 'internationalizedArrayString', group: 'team'}),
    defineField({name: 'advisoryBandLabel', type: 'internationalizedArrayString', group: 'team'}),

    defineField({name: 'rootsBandLabel', type: 'internationalizedArrayString', group: 'roots'}),
    defineField({name: 'rootsImage', type: 'image', options: {hotspot: true}, group: 'roots'}),
    defineField({name: 'rootsImageAlt', type: 'internationalizedArrayString', group: 'roots'}),
    defineField({name: 'rootsBody', type: 'internationalizedArrayRichText', group: 'roots'}),
    defineField({name: 'alumniTitle', type: 'internationalizedArrayString', group: 'roots'}),
    defineField({
      name: 'alumni',
      title: 'Former advisors and members',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      description: 'Names are not translated, so this one list serves both languages.',
      group: 'roots',
    }),

    defineField({name: 'approachBandLabel', type: 'internationalizedArrayString', group: 'approach'}),
    defineField({name: 'approachStatement', type: 'internationalizedArrayRichText', group: 'approach'}),
    defineField({
      name: 'approachCards',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'approachCard',
          fields: [
            defineField({name: 'title', type: 'internationalizedArrayString'}),
            defineField({name: 'body', type: 'internationalizedArrayText'}),
            defineField({
              name: 'background',
              type: 'string',
              options: {
                list: [
                  {title: 'Paper', value: 'bg-paper'},
                  {title: 'Green', value: 'bg-band-green'},
                  {title: 'Pink', value: 'bg-band-pink'},
                ],
              },
              initialValue: 'bg-paper',
            }),
          ],
          preview: {select: {title: 'title.0.value'}},
        }),
      ],
      group: 'approach',
    }),
  ],
  preview: {prepare: () => ({title: 'About page'})},
})

/** The three pages that are a hero, a band, and a list drawn from documents
 *  elsewhere. Contact adds nothing of its own — the footer block is the page. */
const simplePage = (name: string, title: string) =>
  defineType({
    name,
    title,
    icon: DocumentIcon,
    type: 'document',
    fields: [meta, ...hero],
    preview: {prepare: () => ({title})},
  })

export const offeringsPageType = simplePage('offeringsPage', 'Offerings page')
export const faqPageType = simplePage('faqPage', 'FAQ page')
export const reportsPageType = simplePage('reportsPage', 'Reports page')
export const contactPageType = simplePage('contactPage', 'Contact page')
