import {UsersIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

/** Staff and the advisory board share one type — the grid that draws them is
 *  the same, and `group` is what decides which section a person appears in. */
export const personType = defineType({
  name: 'person',
  title: 'Person',
  icon: UsersIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      description: 'The card breaks this over lines exactly where you do.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'group',
      type: 'string',
      options: {
        list: [
          {title: 'Team', value: 'team'},
          {title: 'Advisory board', value: 'advisor'},
        ],
        layout: 'radio',
      },
      initialValue: 'team',
      validation: (r) => r.required(),
    }),
    defineField({name: 'pronouns', type: 'internationalizedArrayString'}),
    defineField({
      name: 'role',
      type: 'internationalizedArrayString',
      description: 'Line breaks are kept.',
    }),
    defineField({name: 'photo', type: 'image', options: {hotspot: true}}),
    defineField({name: 'bio', type: 'internationalizedArrayText'}),
    defineField({
      name: 'order',
      type: 'number',
      description: 'Low numbers first.',
      validation: (r) => r.required(),
    }),
  ],
  orderings: [{title: 'Order', name: 'order', by: [{field: 'order', direction: 'asc'}]}],
  preview: {
    select: {title: 'name', subtitle: 'group', media: 'photo'},
    prepare: ({title, subtitle, media}) => ({
      title: title?.replace(/\n/g, ' '),
      subtitle: subtitle === 'advisor' ? 'Advisory board' : 'Team',
      media,
    }),
  },
})
