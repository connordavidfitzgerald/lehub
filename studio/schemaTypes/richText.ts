import {defineArrayMember, defineType} from 'sanity'

/** Running copy with the few things the site's own RichText component can
 *  already draw: a link, an aside set half size, and the button that opens the
 *  newsletter card. No headings or lists — every place this is used sets its
 *  own type, and a heading inside it would fight that. */
export const richTextType = defineType({
  name: 'richText',
  title: 'Rich text',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [{title: 'Normal', value: 'normal'}],
      lists: [],
      marks: {
        decorators: [
          {title: 'Bold', value: 'strong'},
          {title: 'Italic', value: 'em'},
          {title: 'Small', value: 'small'},
        ],
        annotations: [
          {
            name: 'link',
            title: 'Link',
            type: 'object',
            fields: [
              {
                name: 'href',
                title: 'URL',
                type: 'string',
                description: 'A full URL, a path such as /offerings, or mailto:someone@lehub.ca',
                validation: (r) => r.required(),
              },
            ],
          },
          {
            name: 'newsletter',
            title: 'Newsletter sign-up',
            type: 'object',
            description: 'Opens the newsletter card instead of going somewhere',
            fields: [{name: 'enabled', type: 'boolean', hidden: true, initialValue: true}],
          },
        ],
      },
    }),
  ],
})
