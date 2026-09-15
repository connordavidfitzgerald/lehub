// Each programme is printed in its own colour, on the homepage accordion and
// again as the sticky title on /offerings. The pairing is art direction rather
// than content — it is keyed to the nav and the band palette — so it stays in
// code, keyed by the programme's `key` field.
//
// Tailwind v4 generates arbitrary values by scanning source for literal
// strings, so every class here is written out in full rather than assembled.
const COLORS = {
    compass: { bg: "bg-compass", text: "text-[#2e4318]" },
    catalyst: { bg: "bg-catalyst", text: "text-[#0d2f22]" },
    groundswell: { bg: "bg-groundswell", text: "text-[#0a1d2b]" },
};

/** A programme added in the Studio that has no colour here still renders —
 *  it takes the house paper and ink rather than nothing at all. */
export const programColor = (key) => COLORS[key] ?? { bg: "bg-paper", text: "text-black/80" };
