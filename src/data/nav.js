// The five nav items, shared by the desktop sidebar and the mobile menu.
//
// Each carries the colour its own section is printed in on the homepage, so the
// highlight makes the nav a key to the page rather than five links in house
// pink. Kept here because the two navs must never drift apart.
export const nav = [
    { label: "about", href: "/about", hl: "var(--color-lime)" },
    {
        // Resources is a disclosure rather than a destination: it holds two
        // things and clicking it opens onto them. Any item with `children`
        // renders as a button in both navs.
        label: "resources",
        hl: "var(--color-blue)",
        children: [
            { label: "reports", href: "/reports" },
            { label: "wiki", href: "#" },
        ],
    },
    { label: "offerings", href: "/offerings", hl: "var(--color-gold)" },
    { label: "contact", href: "/contact", hl: "var(--color-pink-band)" },
    { label: "faq", href: "/faq", hl: "var(--color-purple)" },
];

/** Normalised current path, for marking the item you're already on. */
export const currentPath = (url) => url.pathname.replace(/\/$/, "") || "/";

/** True on this item's own page, and on any page it holds — so a group stays
 *  lit, and opens, while you are inside it. */
export const isCurrent = (item, path) =>
    item.href === path || !!item.children?.some((child) => child.href === path);
