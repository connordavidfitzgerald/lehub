import { stickers } from "./sticker.js";

/* ------------------------------------------------------------------ *
 * Print sheet — keep the rosette/grain overlay travelling with the page.
 *
 * The overlay is viewport-fixed for compositing reasons, so on its own it
 * would read as glass held in front of the screen. Offsetting the tiled
 * backgrounds by the scroll position makes it read as one continuous printed
 * sheet instead — pinning the texture to the content is *less* apparent
 * movement, not more.
 * ------------------------------------------------------------------ */
function printSheet() {
    const root = document.documentElement;
    const set = (y) => root.style.setProperty("--print-y", Math.round(y));

    let queued = false;
    addEventListener(
        "scroll",
        () => {
            if (queued) return;
            queued = true;
            requestAnimationFrame(() => {
                queued = false;
                set(window.scrollY);
            });
        },
        { passive: true },
    );
    set(window.scrollY);
}

/* ------------------------------------------------------------------ *
 * Mobile menu
 * ------------------------------------------------------------------ */
function mobileMenu() {
    const toggle = document.querySelector("[data-menu-toggle]");
    const panel = document.querySelector("[data-menu-panel]");
    const label = document.querySelector("[data-menu-label]");
    if (!toggle || !panel) return;

    let open = false;

    toggle.addEventListener("click", () => {
        open = !open;
        toggle.setAttribute("aria-expanded", String(open));
        if (label) label.textContent = open ? "close" : "menu";
        document.body.style.overflow = open ? "hidden" : "";
        panel.hidden = !open;
    });
}

/* ------------------------------------------------------------------ *
 * FAQ accordion — click toggles State=Open
 * ------------------------------------------------------------------ */
function faq() {
    document.querySelectorAll("[data-faq-item]").forEach((item) => {
        const button = item.querySelector("[data-faq-trigger]");
        const answer = item.querySelector("[data-faq-answer]");
        if (!button || !answer) return;

        answer.hidden = true;
        let open = false;

        button.addEventListener("click", () => {
            open = !open;
            button.setAttribute("aria-expanded", String(open));
            answer.hidden = !open;
        });
    });
}

/* ------------------------------------------------------------------ *
 * Nav groups — a nav item that holds pages opens onto them.
 *
 * The markup ships expanded when you are already inside the group, so the
 * server decides the initial state and this only has to flip it. Both navs are
 * in the DOM at once, hence the id prefix on aria-controls.
 * ------------------------------------------------------------------ */
function navGroups() {
    document.querySelectorAll("[data-nav-toggle]").forEach((button) => {
        const panel = document.getElementById(button.getAttribute("aria-controls"));
        if (!panel) return;

        button.addEventListener("click", () => {
            const open = button.getAttribute("aria-expanded") !== "true";
            button.setAttribute("aria-expanded", String(open));
            panel.toggleAttribute("data-open", open);
        });
    });
}

/* ------------------------------------------------------------------ *
 * Offerings accordion — one programme open at a time.
 *
 * State lives on the button's aria-expanded (which the + marker is styled off)
 * and a data-open on the panel; the CSS owns the timing, so there is no height
 * to measure here and nothing to recompute on resize.
 * ------------------------------------------------------------------ */
function pillars() {
    const root = document.querySelector("[data-pillars]");
    if (!root) return;

    const items = [...root.querySelectorAll("[data-pillar]")].map((button) => ({
        button,
        panel: root.querySelector(`[data-pillar-panel="${button.dataset.pillar}"]`),
    }));

    const close = ({ button, panel }) => {
        button.setAttribute("aria-expanded", "false");
        panel?.removeAttribute("data-open");
    };

    items.forEach((item) => {
        item.button.addEventListener("click", () => {
            const isOpen = item.button.getAttribute("aria-expanded") === "true";
            // Close everything first: clicking the open bar collapses it, and
            // clicking any other swaps which one is open.
            items.forEach(close);
            if (isOpen) return;
            item.button.setAttribute("aria-expanded", "true");
            item.panel?.setAttribute("data-open", "");
        });
    });
}

/* ------------------------------------------------------------------ *
 * Testimonial overlays — "Read full testimonial" opens the long version.
 *
 * One card at a time, and the trigger that opened it keeps aria-expanded, so
 * the button stays the labelled control for the region it reveals. The CSS
 * owns the stamp; this only flips data-open.
 *
 * The artboard draws no close control, so dismissal is Escape or a click off
 * the card — the hidden close button is there for keyboard and assistive tech.
 * ------------------------------------------------------------------ */
function testimonials() {
    const triggers = [...document.querySelectorAll("[data-testimonial-open]")];
    if (!triggers.length) return;

    const panelFor = (key) => document.querySelector(`[data-testimonial-panel="${key}"]`);

    const closeAll = () => {
        triggers.forEach((t) => {
            t.setAttribute("aria-expanded", "false");
            panelFor(t.dataset.testimonialOpen)?.removeAttribute("data-open");
        });
    };

    triggers.forEach((trigger) => {
        const panel = panelFor(trigger.dataset.testimonialOpen);
        if (!panel) return;

        trigger.addEventListener("click", () => {
            const isOpen = trigger.getAttribute("aria-expanded") === "true";
            // Close everything first: re-clicking the open one dismisses it,
            // clicking the other swaps which is up.
            closeAll();
            if (isOpen) return;
            trigger.setAttribute("aria-expanded", "true");
            panel.setAttribute("data-open", "");
            // The panel is the point of the click, so send focus into it —
            // otherwise the trigger it covers keeps the caret. preventScroll:
            // the panel is mid-slide and already exactly where it belongs, so
            // there is nothing to scroll into view and plenty to disturb.
            panel.querySelector("[data-testimonial-close]")?.focus({ preventScroll: true });
        });

        panel.querySelector("[data-testimonial-close]")?.addEventListener("click", () => {
            closeAll();
            trigger.focus({ preventScroll: true });
        });
    });

    const openTrigger = () =>
        triggers.find((t) => t.getAttribute("aria-expanded") === "true");

    addEventListener("keydown", (event) => {
        if (event.key !== "Escape") return;
        const trigger = openTrigger();
        if (!trigger) return;
        closeAll();
        trigger.focus({ preventScroll: true });
    });

    // Click-off, bound wide so a click anywhere on the page dismisses the card,
    // not just one inside the section. Both the trigger's own handler and this
    // one see every click; a click on a trigger or on the open card is left
    // alone, so opening never immediately closes.
    addEventListener("click", (event) => {
        if (!openTrigger()) return;
        const hit = event.target instanceof Element ? event.target : null;
        if (hit?.closest("[data-testimonial-panel][data-open], [data-testimonial-open]")) return;
        closeAll();
    });
}

/* ------------------------------------------------------------------ *
 * Land acknowledgement — "Read more" opens the full text over the footer.
 *
 * Same shape as the testimonial cards: the trigger keeps aria-expanded so it
 * stays the labelled control for what it reveals, the CSS owns the stamp, and
 * dismissal is Escape, the close button, or a click off the card.
 * ------------------------------------------------------------------ */
function landAcknowledgement() {
    const trigger = document.querySelector("[data-land-open]");
    const panel = document.querySelector("[data-land-panel]");
    if (!trigger || !panel) return;

    const isOpen = () => trigger.getAttribute("aria-expanded") === "true";

    const close = ({ refocus } = {}) => {
        if (!isOpen()) return;
        trigger.setAttribute("aria-expanded", "false");
        panel.removeAttribute("data-open");
        if (refocus) trigger.focus({ preventScroll: true });
    };

    trigger.addEventListener("click", () => {
        if (isOpen()) return close();
        trigger.setAttribute("aria-expanded", "true");
        panel.setAttribute("data-open", "");
        // preventScroll: the card is mid-stamp and already exactly where it
        // belongs — there is nothing to scroll into view and plenty to disturb.
        panel.querySelector("[data-land-close]")?.focus({ preventScroll: true });
    });

    panel.querySelector("[data-land-close]")?.addEventListener("click", () => {
        close({ refocus: true });
    });

    addEventListener("keydown", (event) => {
        if (event.key === "Escape") close({ refocus: true });
    });

    // Click-off. The trigger's own handler and this one both see every click,
    // so a click on the trigger or inside the open card is left alone and
    // opening never immediately closes.
    addEventListener("click", (event) => {
        if (!isOpen()) return;
        const hit = event.target instanceof Element ? event.target : null;
        if (hit?.closest("[data-land-panel][data-open], [data-land-open]")) return;
        close();
    });
}

/* ------------------------------------------------------------------ *
 * Newsletter — the sign-up fields open one shared overlay.
 *
 * Two kinds of trigger open it. A field (the sidebar and the mobile menu) opens
 * it on focus as well as on submit, so clicking where you would type gets you
 * the form rather than a dead input, and whatever is already typed comes with
 * you. Anything else — the words "our newsletter" in the offerings copy — opens
 * it on click. The footer is neither: its field is big enough to be the form
 * itself, so it posts to Mailchimp directly.
 *
 * Same shape as the testimonial and land-acknowledgement cards — the CSS owns
 * the stamp, this only flips data-open — with one difference: this card is
 * `aria-modal`, so focus is kept inside it while it is up and handed back to
 * the field that opened it on the way out.
 * ------------------------------------------------------------------ */
function newsletter() {
    const panel = document.querySelector("[data-newsletter-panel]");
    const scrim = document.querySelector("[data-newsletter-scrim]");
    const forms = [...document.querySelectorAll("[data-newsletter-open]")];
    if (!panel || !forms.length) return;

    const email = panel.querySelector("#newsletter-email");
    const closeButton = panel.querySelector("[data-newsletter-close]");
    const isOpen = () => panel.hasAttribute("data-open");
    let opener = null;

    const open = (field) => {
        opener = field ?? null;
        // Carry the typed value over, so opening the card never costs anyone
        // what they had already written.
        if (field?.value && email) email.value = field.value;
        panel.setAttribute("data-open", "");
        scrim?.setAttribute("data-open", "");
        // preventScroll: the card is fixed and mid-stamp, already exactly where
        // it belongs — there is nothing to scroll into view and plenty to
        // disturb. The blur clears the caret out of the field behind the card.
        field?.blur();
        email?.focus({ preventScroll: true });
    };

    const close = ({ refocus } = {}) => {
        if (!isOpen()) return;
        panel.removeAttribute("data-open");
        scrim?.removeAttribute("data-open");
        if (refocus && opener?.isConnected) opener.focus({ preventScroll: true });
        opener = null;
    };

    forms.forEach((trigger) => {
        if (trigger.tagName !== "FORM") {
            trigger.addEventListener("click", () => open(null));
            return;
        }
        const field = trigger.querySelector("[data-newsletter-field]");
        // Submitting is the sidebar and mobile fields' only affordance — they
        // have no button — so Enter has to open the card rather than reload
        // the page onto a query string.
        trigger.addEventListener("submit", (event) => {
            event.preventDefault();
            open(field);
        });
        field?.addEventListener("focus", () => {
            if (!isOpen()) open(field);
        });
    });

    closeButton?.addEventListener("click", () => close({ refocus: true }));
    scrim?.addEventListener("click", () => close({ refocus: true }));

    addEventListener("keydown", (event) => {
        if (!isOpen()) return;
        if (event.key === "Escape") return close({ refocus: true });
        if (event.key !== "Tab") return;

        // aria-modal promises the rest of the page is inert, and nothing else
        // enforces that without a <dialog>. Two stops make the cycle: the
        // close button and whatever the form holds.
        const stops = [...panel.querySelectorAll("a[href], button, input, select, textarea")].filter(
            (el) => !el.disabled && el.tabIndex !== -1 && el.offsetParent !== null,
        );
        if (!stops.length) return;
        const first = stops[0];
        const last = stops[stops.length - 1];
        const on = document.activeElement;
        if (event.shiftKey && (on === first || !panel.contains(on))) {
            event.preventDefault();
            last.focus({ preventScroll: true });
        } else if (!event.shiftKey && on === last) {
            event.preventDefault();
            first.focus({ preventScroll: true });
        }
    });

    // The card posts to Mailchimp in a new tab, so this one keeps standing
    // here with the card up. Closing it is the honest end to the interaction.
    panel.querySelector("form")?.addEventListener("submit", () => {
        setTimeout(() => close(), 0);
    });
}

/* ------------------------------------------------------------------ */
printSheet();
stickers();
mobileMenu();
navGroups();
faq();
pillars();
testimonials();
landAcknowledgement();
newsletter();
