// How big a display line has to be set to span the column it sits in.
//
// The band sizes used to be a hand-measured cqw per title — 36.9 for ABOUT,
// 23.15 for OFFERINGS, and so on, each one read off the Figma artboard. That
// works exactly as long as the words never change, which stops being true the
// moment the titles come out of a CMS in two languages: "À PROPOS" is not
// "ABOUT"'s width, so it would either overrun the band or sit short of it.
//
// The numbers were never arbitrary, though. Measured against the font they are
// all 100 / (advance width in em), to within half a percent — the size at which
// the title spans the container exactly. So the size is computed from the font
// here instead, and any title in any language sets itself correctly.
//
// This runs at build time only: fontkit reads the same .otf the browser is
// served, so what is measured is what is drawn.
import * as fontkit from "fontkit";
import { resolve } from "node:path";

// Resolved from the project root rather than from `import.meta.url`: Astro
// bundles this module into dist/.prerender before running it, so a URL relative
// to the module's own file points at a directory the font was never copied to.
// The build always runs from the project root, which is what makes cwd the
// stable anchor here.
const font = fontkit.openSync(resolve(process.cwd(), "src/assets/fonts/ReviewCondensed-Heavy.otf"));

// The Figma sizes come in ~1% under a true full-bleed fit, which is the optical
// margin the band is drawn with. Reproducing it keeps the English bands the
// size they already were and gives every other language the same breathing room.
const BAND_FIT = 0.99;

// The hero is not full-bleed: its two stickers are centred in the column with
// the longer one inset. 9.98cqw against "LEARN TO ORGANIZE," at 8.042em is
// 0.8026 of a full fit, and that fraction is what holds the composition.
const HERO_FIT = 0.8026;

/** Width of a string in ems, as the display face will actually set it. */
const advance = (s) => font.layout(s.toUpperCase()).advanceWidth / font.unitsPerEm;

/** Three decimals is well under a tenth of a pixel at any width the site runs. */
const round = (n) => Math.round(n * 1000) / 1000;

/**
 * The font-size, in cqw of the content column, at which `title` spans the band.
 *
 * Returned as a style value rather than a Tailwind class on purpose: Tailwind
 * v4 generates arbitrary values by scanning source files for literal strings,
 * so a class built from a computed number is one it never sees and never emits.
 */
export const bandSize = (title) => `${round((100 / advance(title || " ")) * BAND_FIT)}cqw`;

/**
 * The hero's size: one size for both lines, set by whichever runs wider, and
 * clamped the way the original was — a legibility floor on small screens, and a
 * ceiling at the size the ratio reaches on the 1603px artboard.
 */
export const heroSize = (lines) => {
    const widest = Math.max(...lines.map(advance));
    const cqw = (100 / widest) * HERO_FIT;
    return `clamp(34px, ${round(cqw)}cqw, ${round((cqw / 100) * 1603)}px)`;
};
