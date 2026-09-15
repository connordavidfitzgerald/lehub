import {CommentIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const testimonialType = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  icon: CommentIcon,
  type: 'document',
  fields: [
    defineField({name: 'name', type: 'string', validation: (r) => r.required()}),
    defineField({
      name: 'lines',
      title: 'Attribution',
      type: 'internationalizedArrayText',
      description: 'Role first, then organisation — one per line.',
    }),
    defineField({
      name: 'quote',
      title: 'Short quote',
      type: 'internationalizedArrayText',
      description: 'The pull quote on the card, quotation marks included.',
    }),
    defineField({
      name: 'full',
      title: 'Full testimonial',
      type: 'internationalizedArrayRichText',
      description: 'Opens in the panel behind "Read full testimonial".',
    }),
    defineField({name: 'order', type: 'number', validation: (r) => r.required()}),
  ],
  orderings: [{title: 'Order', name: 'order', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'name'}},
})
