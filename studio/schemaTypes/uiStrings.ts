import {StringIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

/** The words the interface says on its own behalf — buttons, labels, and the
 *  handful of headings that are not part of any one page's copy. They are here
 *  rather than in code so both languages are edited in the same place as
 *  everything else. */
const s = (name: string, description?: string) =>
  defineField({name, type: 'internationalizedArrayString', description})

export const uiStringsType = defineType({
  name: 'uiStrings',
  title: 'Interface labels',
  icon: StringIcon,
  type: 'document',
  fields: [
    s('menu', 'The mobile menu button, closed'),
    s('menuClose', 'The same button once the menu is open'),
    s('close', 'The close control on the cards'),
    s('learnMore', 'Under the homepage about copy and each programme blurb'),
    s('testimonialsHeading'),
    s('readFullTestimonial'),
    s('fullTestimonialFrom', 'Screen-reader label. {name} is replaced by the person.'),
    s('signUp', 'The sidebar line: "Sign up here"'),
    s('signUpHere', 'The word in that line that opens the card'),
    s('subscribe', 'The arrow button label'),
    s('emailPlaceholder'),
    s('info', 'The eyebrow beside a programme’s INFO line'),
    s('pdfSuffix', 'Read after a report title by a screen reader'),
    s('skipToContent'),
  ],
  preview: {prepare: () => ({title: 'Interface labels'})},
})
