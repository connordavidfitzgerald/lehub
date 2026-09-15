import {RocketIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

/** The three programmes. One document feeds both the homepage accordion (which
 *  shows `blurb`) and the offerings page (which shows `body` and `info`). */
export const programType = defineType({
  name: 'program',
  title: 'Programme',
  icon: RocketIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'key',
      title: 'Key',
      type: 'string',
      description: 'Lowercase, no spaces — it is the link target, e.g. /offerings#compass',
      validation: (r) => r.required(),
    }),
    defineField({name: 'title', type: 'internationalizedArrayString'}),
    defineField({name: 'image', type: 'image', options: {hotspot: true}}),
    defineField({
      name: 'blurb',
      title: 'Blurb (homepage)',
      type: 'internationalizedArrayText',
    }),
    defineField({
      name: 'body',
      title: 'Body (offerings page)',
      type: 'internationalizedArrayRichText',
    }),
    defineField({
      name: 'info',
      title: 'INFO line',
      type: 'internationalizedArrayRichText',
      description: 'The line under the rule — how to reach the programme.',
    }),
    defineField({
      name: 'imageFirst',
      title: 'Picture on the left',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({name: 'order', type: 'number', validation: (r) => r.required()}),
  ],
  orderings: [{title: 'Order', name: 'order', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'key', media: 'image'}},
})
