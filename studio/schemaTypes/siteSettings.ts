import {CogIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

/** Everything that appears on every page: the wordmark's title tag, the two
 *  social accounts, the footer block, and the land acknowledgement. */
export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Site settings',
  icon: CogIcon,
  type: 'document',
  groups: [
    {name: 'general', title: 'General', default: true},
    {name: 'footer', title: 'Footer'},
    {name: 'newsletter', title: 'Newsletter'},
    {name: 'land', title: 'Land acknowledgement'},
  ],
  fields: [
    defineField({
      name: 'defaultTitle',
      title: 'Default page title',
      type: 'internationalizedArrayString',
      group: 'general',
    }),
    defineField({
      name: 'metaDescription',
      type: 'internationalizedArrayText',
      group: 'general',
    }),
    defineField({name: 'instagram', type: 'url', group: 'general'}),
    defineField({name: 'facebook', type: 'url', group: 'general'}),
    defineField({name: 'wikiUrl', title: 'Wiki URL', type: 'internationalizedArrayString', group: 'general'}),
    defineField({
      name: 'nextCourse',
      title: 'Next course (sidebar)',
      type: 'internationalizedArrayText',
      description: 'The two lines above "Sign up here" in the sidebar and mobile menu.',
      group: 'general',
    }),

    defineField({name: 'footerImage', type: 'image', options: {hotspot: true}, group: 'footer'}),
    defineField({name: 'contactEyebrow', type: 'internationalizedArrayText', group: 'footer'}),
    defineField({name: 'contactEmail', type: 'string', group: 'footer'}),
    defineField({name: 'socialEyebrow', type: 'internationalizedArrayString', group: 'footer'}),
    defineField({name: 'testimonialEyebrow', type: 'internationalizedArrayText', group: 'footer'}),
    defineField({name: 'testimonialLinkLabel', type: 'internationalizedArrayString', group: 'footer'}),
    defineField({name: 'testimonialUrl', type: 'url', group: 'footer'}),

    defineField({
      name: 'newsletterAction',
      title: 'Mailchimp form action',
      type: 'url',
      group: 'newsletter',
    }),
    defineField({
      name: 'newsletterTrap',
      title: 'Mailchimp honeypot field name',
      type: 'string',
      group: 'newsletter',
    }),
    defineField({name: 'newsletterLabel', type: 'internationalizedArrayString', group: 'newsletter'}),
    defineField({name: 'newsletterFooterLabel', type: 'internationalizedArrayString', group: 'newsletter'}),
    defineField({name: 'newsletterHeading', type: 'internationalizedArrayString', group: 'newsletter'}),
    defineField({name: 'newsletterFinePrint', type: 'internationalizedArrayText', group: 'newsletter'}),

    defineField({name: 'landLine', title: 'Footer line', type: 'internationalizedArrayText', group: 'land'}),
    defineField({name: 'landLinkLabel', type: 'internationalizedArrayString', group: 'land'}),
    defineField({name: 'landTitle', type: 'internationalizedArrayString', group: 'land'}),
    defineField({name: 'landBody', type: 'internationalizedArrayRichText', group: 'land'}),
  ],
  preview: {prepare: () => ({title: 'Site settings'})},
})
