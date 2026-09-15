import {MenuIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

/** The sidebar and the mobile menu read this one list, so the two can never
 *  drift apart. An item with children renders as a disclosure rather than a
 *  link, and carries the colour its own section is printed in. */
const HIGHLIGHTS = [
  {title: 'Lime (About)', value: 'var(--color-lime)'},
  {title: 'Blue (Resources)', value: 'var(--color-blue)'},
  {title: 'Gold (Offerings)', value: 'var(--color-gold)'},
  {title: 'Pink (Contact)', value: 'var(--color-pink-band)'},
  {title: 'Purple (FAQ)', value: 'var(--color-purple)'},
]

export const navigationType = defineType({
  name: 'navigation',
  title: 'Navigation',
  icon: MenuIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'items',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'navItem',
          fields: [
            defineField({name: 'label', type: 'internationalizedArrayString'}),
            defineField({
              name: 'href',
              type: 'string',
              description: 'Leave empty to make this a disclosure holding the links below.',
            }),
            defineField({
              name: 'highlight',
              type: 'string',
              options: {list: HIGHLIGHTS},
            }),
            defineField({
              name: 'children',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'object',
                  name: 'navChild',
                  fields: [
                    defineField({name: 'label', type: 'internationalizedArrayString'}),
                    defineField({name: 'href', type: 'string', validation: (r) => r.required()}),
                    defineField({
                      name: 'external',
                      type: 'boolean',
                      description: 'Opens in a new tab.',
                      initialValue: false,
                    }),
                  ],
                  preview: {select: {title: 'label.0.value', subtitle: 'href'}},
                }),
              ],
            }),
          ],
          preview: {select: {title: 'label.0.value', subtitle: 'href'}},
        }),
      ],
    }),
  ],
  preview: {prepare: () => ({title: 'Navigation'})},
})
