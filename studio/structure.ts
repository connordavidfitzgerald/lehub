import type {StructureResolver} from 'sanity/structure'
import {CogIcon, MenuIcon, StringIcon, DocumentIcon, HomeIcon, TranslateIcon} from '@sanity/icons'

/** The singletons are pinned to fixed ids and given one list item each, so an
 *  editor opens "Home page" rather than a list holding a single document. */
const SINGLETONS: [string, string, any][] = [
  ['homePage', 'Home page', HomeIcon],
  ['aboutPage', 'About page', DocumentIcon],
  ['offeringsPage', 'Offerings page', DocumentIcon],
  ['reportsPage', 'Reports page', DocumentIcon],
  ['faqPage', 'FAQ page', DocumentIcon],
  ['contactPage', 'Contact page', DocumentIcon],
]

const GLOBALS: [string, string, any][] = [
  ['siteSettings', 'Site settings', CogIcon],
  ['navigation', 'Navigation', MenuIcon],
  ['uiStrings', 'Interface labels', StringIcon],
]

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      ...SINGLETONS.map(([type, title, icon]) =>
        S.listItem()
          .title(title)
          .icon(icon)
          .id(type)
          .child(S.document().schemaType(type).documentId(type).title(title)),
      ),
      S.divider(),
      S.documentTypeListItem('person').title('People'),
      S.documentTypeListItem('program').title('Programmes'),
      S.documentTypeListItem('report').title('Reports'),
      S.documentTypeListItem('testimonial').title('Testimonials'),
      S.documentTypeListItem('faqItem').title('FAQ questions'),
      S.divider(),
      ...GLOBALS.map(([type, title, icon]) =>
        S.listItem()
          .title(title)
          .icon(icon)
          .id(type)
          .child(S.document().schemaType(type).documentId(type).title(title)),
      ),
      S.documentTypeListItem('locale').title('Languages').icon(TranslateIcon),
    ])
