// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
    // Absolute URLs for the hreflang pair the layout emits, and for anything
    // else that needs to name the site rather than a path.
    site: 'https://www.lehub.ca',

    // English sits at the root and French is prefixed — `/about` and
    // `/fr/about`. The routing itself is done by the `[...locale]` rest
    // parameter every page is built under, which is what lets one file serve
    // both trees; this block is here so `Astro.currentLocale` and the i18n
    // helpers agree with it.
    i18n: {
        locales: ['en', 'fr'],
        defaultLocale: 'en',
        routing: { prefixDefaultLocale: false },
    },

    vite: {
        plugins: [tailwindcss()]
    }
});
