// The GROQ the build runs, and the one helper every query is written with.
//
// Localization is field-level: a localized field is an array of `{_key, value}`
// with one entry per language, so every projection picks the entry for the
// language being built and falls back to English if it is empty. That fallback
// is why a half-translated field shows English rather than a hole.
import { sanity } from "./sanity.js";

/** `t("title")` -> the title in $locale, or the English one. */
const t = (field, as) =>
    `"${as ?? field.split(".").pop()}": coalesce(${field}[_key == $locale][0].value, ${field}[_key == "en"][0].value)`;

const HERO = [t("title"), "heroImage", t("heroAlt"), t("bandLabel")].join(",");

/** Everything the layout draws on every page, in one round trip. */
const GLOBAL = `
  "settings": *[_id == "siteSettings"][0]{
    ${t("defaultTitle")}, ${t("metaDescription")},
    instagram, facebook, ${t("wikiUrl")}, ${t("nextCourse")},
    footerImage, ${t("contactEyebrow")}, contactEmail, ${t("socialEyebrow")},
    ${t("testimonialEyebrow")}, ${t("testimonialLinkLabel")}, testimonialUrl,
    newsletterAction, newsletterTrap,
    ${t("newsletterLabel")}, ${t("newsletterFooterLabel")},
    ${t("newsletterHeading")}, ${t("newsletterFinePrint")},
    ${t("landLine")}, ${t("landLinkLabel")}, ${t("landTitle")}, ${t("landBody")}
  },
  "nav": *[_id == "navigation"][0].items[]{
    ${t("label")}, href, highlight,
    children[]{ ${t("label")}, href, external }
  },
  "ui": *[_id == "uiStrings"][0]{
    ${t("menu")}, ${t("menuClose")}, ${t("close")}, ${t("learnMore")}, ${t("testimonialsHeading")},
    ${t("readFullTestimonial")}, ${t("fullTestimonialFrom")}, ${t("signUp")},
    ${t("signUpHere")}, ${t("subscribe")}, ${t("emailPlaceholder")}, ${t("info")},
    ${t("pdfSuffix")}, ${t("skipToContent")}
  }`;

const PAGES = {
    home: `"page": *[_id == "homePage"][0]{
      ${t("title")}, heroImage, ${t("heroAlt")}, ${t("heroLines")},
      ${t("aboutBandLabel")}, aboutImage, ${t("aboutImageAlt")}, ${t("aboutBody")},
      ${t("offeringsBandLabel")}, ${t("resourcesBandLabel")},
      ${t("wikiLabel")}, wikiImage, ${t("reportsLabel")}, reportsImage
    },
    "programs": *[_type == "program"]|order(order asc){ key, ${t("title")}, ${t("blurb")} },
    "testimonials": *[_type == "testimonial"]|order(order asc){
      name, ${t("lines")}, ${t("quote")}, ${t("full")}
    }`,

    about: `"page": *[_id == "aboutPage"][0]{
      ${HERO},
      ${t("statement")}, statementImage, ${t("statementImageAlt")},
      focusImage, ${t("focusImageAlt")}, ${t("focus")},
      momentImage, ${t("moment")},
      ${t("teamBandLabel")}, ${t("advisoryBandLabel")},
      ${t("rootsBandLabel")}, rootsImage, ${t("rootsImageAlt")}, ${t("rootsBody")},
      ${t("alumniTitle")}, alumni,
      ${t("approachBandLabel")}, ${t("approachStatement")},
      approachCards[]{ ${t("title")}, ${t("body")}, background }
    },
    "team": *[_type == "person" && group == "team"]|order(order asc){
      name, photo, ${t("pronouns")}, ${t("role")}, ${t("bio")}
    },
    "advisors": *[_type == "person" && group == "advisor"]|order(order asc){
      name, photo, ${t("pronouns")}, ${t("role")}, ${t("bio")}
    }`,

    offerings: `"page": *[_id == "offeringsPage"][0]{ ${HERO} },
    "programs": *[_type == "program"]|order(order asc){
      key, ${t("title")}, image, imageFirst, ${t("body")}, ${t("info")}
    }`,

    faq: `"page": *[_id == "faqPage"][0]{ ${HERO} },
    "items": *[_type == "faqItem"]|order(order asc){ ${t("question")}, ${t("answer")}, draft }`,

    reports: `"page": *[_id == "reportsPage"][0]{ ${HERO} },
    "reports": *[_type == "report"]|order(order asc){
      ${t("title")}, ${t("subtitle")}, ${t("author")}, cover, ${t("pdf")}, cardColor
    }`,

    contact: `"page": *[_id == "contactPage"][0]{ ${HERO} }`,
};

/**
 * Everything one page in one language needs, as a single query — the layout's
 * share and the page's own, so a build makes one request per page rather than
 * one per block.
 */
export const getPage = (name, locale) =>
    sanity.fetch(`{${GLOBAL},${PAGES[name]}}`, { locale });
