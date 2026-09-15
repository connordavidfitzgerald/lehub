import {TranslateIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

/** Locales live in the dataset, not in code, so the Studio plugins and the
 *  site read the same list. Two for now: English and French. */
export const localeType = defineType({
  name: 'locale',
  title: 'Language',
  icon: TranslateIcon,
  type: 'document',
  fields: [
    defineField({name: 'name', type: 'string', validation: (r) => r.required()}),
    defineField({
      name: 'tag',
      type: 'string',
      description: 'IANA tag — "en", "fr"',
      validation: (r) => r.required(),
    }),
    defineField({name: 'isDefault', title: 'Default language', type: 'boolean'}),
    defineField({name: 'order', type: 'number', hidden: true}),
  ],
  orderings: [{title: 'Order', name: 'order', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'name', subtitle: 'tag'}},
})
