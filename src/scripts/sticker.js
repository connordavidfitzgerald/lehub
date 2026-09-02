/* ------------------------------------------------------------------ *
 * Sticker reveal — letters stamp onto the coloured band one at a time.
 *
 * The whole thing is deliberately *not* smooth. Everything runs on a 12fps
 * grid (see --sticker-frame in global.css): the keyframes are quantised with
 * steps(), and the per-letter delay is a whole number of frames, so no letter
 * ever lands between beats. Read as one movement it should feel like a
 * flip-book or a stamp hitting paper, not a tween.
 *
 * The band itself is never hidden — only the letters are. A blank coloured
 * sticker holding its final width while the type arrives is the effect;
 * animating the band's width would reflow the letters mid-reveal.
 * ------------------------------------------------------------------ */

const reduced = matchMedia("(prefers-reduced-motion: reduce)");

/* Deterministic per-letter jitter. Random rotation would resample on every
   HMR pass and never settle while you're dialling the look in; hashing the
   index keeps a given headline printing the same way every load. */
function jitter(seed) {
    const n = Math.sin(seed * 12.9898) * 43758.5453;
    return n - Math.floor(n); // 0..1
}

/** Rewrite the element's text as per-letter spans, words kept unbreakable. */
function split(el) {
    const text = el.textContent.replace(/\s+/g, " ").trim();
    if (!text) return 0;

    el.setAttribute("aria-label", text);
    const frag = document.createDocumentFragment();
    let i = 0;

    text.split(" ").forEach((word, w) => {
        if (w > 0) {
            // A real space, outside any word span, so lines still break here.
            frag.append(document.createTextNode(" "));
            i++;
        }
        const wordEl = document.createElement("span");
        wordEl.className = "sticker-word";
        wordEl.setAttribute("aria-hidden", "true");

        for (const char of word) {
            const letter = document.createElement("span");
            letter.className = "sticker-letter";
            letter.style.setProperty("--i", i);
            // ±1 frame of drift and a small tilt, so the line doesn't stamp
            // like a machine.
            letter.style.setProperty("--r", `${(jitter(i + 1) * 2 - 1).toFixed(2)}deg`);
            letter.textContent = char;
            wordEl.append(letter);
            i++;
        }
        frag.append(wordEl);
    });

    el.replaceChildren(frag);
    return i;
}

export function stickers() {
    const els = [...document.querySelectorAll("[data-sticker]")];
    if (!els.length) return;

    if (reduced.matches) {
        // No split, no animation — but still mark them ready, or the
        // pre-split transparent-text guard would never lift.
        els.forEach((el) => {
            el.setAttribute("data-sticker-ready", "");
            el.setAttribute("data-sticker-in", "");
        });
        return;
    }

    els.forEach(split);
    els.forEach((el) => el.setAttribute("data-sticker-ready", ""));

    const io = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.setAttribute("data-sticker-in", "");
                io.unobserve(entry.target);
            });
        },
        // Fires once the band is a little way into the viewport, so the reveal
        // isn't already over by the time it's readable.
        { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );

    els.forEach((el) => io.observe(el));
}
