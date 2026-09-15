// Small builders for the shapes the seed writes: internationalised array
// fields, and the Portable Text that goes inside the rich-text ones.
//
// Keys have to be stable across runs or every re-seed rewrites every block and
// the document history fills with diffs that changed nothing, so they come off
// a counter rather than out of randomness: content.mjs builds its documents in
// one fixed order, so the same block gets the same key on every run.
//
// The counter is shared by the whole file, which is fine — a `_key` has to be
// unique within its own array, not across the dataset.

let n = 0
const key = () => `k${(n++).toString(36)}`

const wrap = (type) => (en, fr) =>
  [
    {_key: 'en', _type: `internationalizedArray${type}Value`, value: en},
    {_key: 'fr', _type: `internationalizedArray${type}Value`, value: fr},
  ].filter((entry) => entry.value !== undefined && entry.value !== null)

/** `str("About", "À propos")` — one localized string field. */
export const str = wrap('String')
/** Same, for the multi-line `text` fields. */
export const text = wrap('Text')

/**
 * A paragraph. Takes strings and marked segments, mirroring the `parts` arrays
 * the site's RichText component already reads:
 *
 *   p("Write to ", {t: "contact@lehub.ca", href: "mailto:contact@lehub.ca"})
 *   p("Subscribe to ", {t: "our newsletter", newsletter: true})
 *   p({t: "(EN)", small: true})
 */
export const p = (...parts) => {
  const markDefs = []
  const children = parts.map((part) => {
    if (typeof part === 'string') {
      return {_type: 'span', _key: key(), text: part, marks: []}
    }
    const marks = []
    if (part.small) marks.push('small')
    if (part.strong) marks.push('strong')
    if (part.em) marks.push('em')
    if (part.href) {
      const _key = key()
      markDefs.push({_type: 'link', _key, href: part.href})
      marks.push(_key)
    }
    if (part.newsletter) {
      const _key = key()
      markDefs.push({_type: 'newsletter', _key, enabled: true})
      marks.push(_key)
    }
    return {_type: 'span', _key: key(), text: part.t, marks}
  })
  return {_type: 'block', _key: key(), style: 'normal', markDefs, children}
}

/** A rich-text field: `rich([p("Hello")], [p("Bonjour")])`. */
export const rich = (en, fr) => [
  {_key: 'en', _type: 'internationalizedArrayRichTextValue', value: en},
  {_key: 'fr', _type: 'internationalizedArrayRichTextValue', value: fr},
]

/** Plain paragraphs, the common case: `richText(["a","b"], ["a","b"])`. */
export const richText = (en, fr) => rich(en.map((s) => p(s)), fr.map((s) => p(s)))
