import {DocumentPdfIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const reportType = defineType({
  name: 'report',
  title: 'Report',
  icon: DocumentPdfIcon,
  type: 'document',
  fields: [
    defineField({name: 'title', type: 'internationalizedArrayString'}),
    defineField({name: 'subtitle', type: 'internationalizedArrayText'}),
    defineField({name: 'author', type: 'internationalizedArrayString'}),
    defineField({
      name: 'cover',
      type: 'image',
      options: {hotspot: true},
      description: 'The cover artwork carries the title, so it is the whole card.',
    }),
    defineField({
      name: 'pdf',
      title: 'PDF link',
      type: 'internationalizedArrayString',
      description: 'Per language — leave French empty to fall back to the English PDF.',
    }),
    defineField({
      name: 'cardColor',
      title: 'Card colour',
      type: 'string',
      options: {
        list: [
          {title: 'Pink', value: 'bg-card-pink'},
          {title: 'Yellow', value: 'bg-card-yellow'},
          {title: 'Green', value: 'bg-card-green'},
        ],
      },
      initialValue: 'bg-card-pink',
    }),
    defineField({name: 'order', type: 'number', validation: (r) => r.required()}),
  ],
  orderings: [{title: 'Order', name: 'order', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'title.0.value', media: 'cover'}},
})
