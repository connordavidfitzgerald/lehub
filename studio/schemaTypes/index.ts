import {localeType} from './locale'
import {richTextType} from './richText'
import {personType} from './person'
import {testimonialType} from './testimonial'
import {programType} from './program'
import {reportType} from './report'
import {faqItemType} from './faqItem'
import {siteSettingsType} from './siteSettings'
import {navigationType} from './navigation'
import {uiStringsType} from './uiStrings'
import {
  homePageType,
  aboutPageType,
  offeringsPageType,
  faqPageType,
  reportsPageType,
  contactPageType,
} from './pages'

export const schemaTypes = [
  localeType,
  richTextType,
  siteSettingsType,
  navigationType,
  uiStringsType,
  homePageType,
  aboutPageType,
  offeringsPageType,
  faqPageType,
  reportsPageType,
  contactPageType,
  personType,
  programType,
  testimonialType,
  reportType,
  faqItemType,
]
