import {HelpCircleIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const faqItemType = defineType({
  name: 'faqItem',
  title: 'FAQ question',
  icon: HelpCircleIcon,
  type: 'document',
  fields: [
    defineField({name: 'question', type: 'internationalizedArrayString'}),
    defineField({name: 'answer', type: 'internationalizedArrayRichText'}),
    defineField({
      name: 'draft',
      title: 'Awaiting review',
      type: 'boolean',
      description: 'Marks copy that was drafted for the client rather than supplied.',
      initialValue: false,
    }),
    defineField({name: 'order', type: 'number', validation: (r) => r.required()}),
  ],
  orderings: [{title: 'Order', name: 'order', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'question.0.value'}},
})
