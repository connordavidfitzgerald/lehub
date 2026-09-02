// The Mailchimp list, in one place: the overlay and the footer field both post
// to it directly.
//
// Their classic embed ships a stylesheet, jQuery, and ~600 lines of
// SMS/country-picker script for a form with a single email field. None of it is
// needed — the endpoint reads EMAIL and the bot-trap input, and answers with its
// own confirmation page. Posting with `target="_blank"` is what lets that page
// open in a tab of its own and leave ours where it was; nothing is fetched from
// their domain, so there is no CORS problem and no third-party JS on the site.

/** The embed's <form action>: `u`/`id` name the audience, `f_id` the form. */
export const ACTION =
    "https://lehub.us7.list-manage.com/subscribe/post?u=6da6ef9a2de17cfdceb029edc&id=d52d6ac267&f_id=0087b0e4f0";

/** Mailchimp's honeypot. The field name is the secret, so it is copied verbatim. */
export const TRAP = "b_6da6ef9a2de17cfdceb029edc_d52d6ac267";
