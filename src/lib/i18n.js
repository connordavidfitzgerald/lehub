// The two languages the site is published in.
//
// English is the default and sits at the root (`/about`); French is prefixed
// (`/fr/about`). The prefix is the only difference between the two trees — the
// routes are the same files, built twice.

export const LOCALES = ["en", "fr"];
export const DEFAULT_LOCALE = "en";

/** `getStaticPaths` for every page: the English build takes no prefix. */
export const localePaths = () =>
    LOCALES.map((locale) => ({
        params: { locale: locale === DEFAULT_LOCALE ? undefined : locale },
        props: { locale },
    }));

/** A site path in the given language. `/about` -> `/fr/about`. */
export const localize = (href, locale) => {
    if (locale === DEFAULT_LOCALE) return href;
    // Only in-site paths get a prefix; a mailto:, an anchor, or another site
    // is left exactly as the editor wrote it.
    if (!href?.startsWith("/")) return href;
    return href === "/" ? "/fr" : `/fr${href}`;
};

/** The same page in the other language, for the language switch. */
export const swapLocale = (pathname, locale) => {
    const bare = pathname.replace(/^\/fr(?=\/|$)/, "") || "/";
    return localize(bare, locale);
};

export const OTHER_LOCALE = { en: "fr", fr: "en" };

/** How each language is named in the switch. Codes rather than names: the
 *  switch sits in the sidebar's `fine` scale, which is too small to carry
 *  "Français" without crowding the rules around it. */
export const LOCALE_CODE = { en: "EN", fr: "FR" };

/** The path with any language prefix taken off, for comparing against the
 *  unlocalized hrefs the navigation is stored with. */
export const barePath = (pathname) =>
    (pathname.replace(/^\/fr(?=\/|$)/, "").replace(/\/$/, "") || "/");

/** True on this item's own page, and on any page it holds — so a group stays
 *  lit, and opens, while you are inside it. */
export const isCurrent = (item, path) =>
    item.href === path || !!item.children?.some((child) => child.href === path);
