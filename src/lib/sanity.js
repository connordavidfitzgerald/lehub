// The read-only client the build fetches content with, plus the image helper.
//
// No token: the dataset is public and the site is built statically, so the
// build only ever reads what is already published.
import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";

// Both of these are public — the ID is in every image URL the site serves —
// so they carry defaults rather than being required config. A build host with
// no environment set (a fresh Vercel project, a clone, CI) still produces the
// real site instead of failing in the Sanity client with "Configuration must
// contain `projectId`"; setting the vars still overrides, which is what points
// a preview deploy at another dataset.
const PROJECT_ID = import.meta.env.PUBLIC_SANITY_PROJECT_ID || "e797khcc";
const DATASET = import.meta.env.PUBLIC_SANITY_DATASET || "production";

export const sanity = createClient({
    projectId: PROJECT_ID,
    dataset: DATASET,
    apiVersion: "2025-02-19",
    // The build wants what was published a moment ago, not what the CDN cached.
    useCdn: false,
});

const builder = createImageUrlBuilder(sanity);

/**
 * A CDN URL for an image field. Every call names a width, because an image
 * asked for without one is served at its full upload size.
 *
 *   urlFor(page.heroImage, 1600)
 */
export const urlFor = (source, width, { quality = 82 } = {}) =>
    source?.asset
        ? builder.image(source).width(width).quality(quality).auto("format").url()
        : undefined;

/** The same image at 1x and 2x, for a `srcset`. */
export const srcSet = (source, width) =>
    source?.asset ? `${urlFor(source, width)} 1x, ${urlFor(source, width * 2)} 2x` : undefined;
