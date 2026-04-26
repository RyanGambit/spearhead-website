# Inline Copy Editor — Internal Guide

This site has a hidden inline edit mode that lets a small group of trusted
editors propose copy changes from the live site. Edits are **never published
automatically** — they're emailed to whoever owns the Formspree inbox for
review and manual application.

## How to use

1. Visit any page with `?edit=1` appended to the URL, e.g.:
   - `https://spearhead-site.vercel.app/about.html?edit=1`
   - `https://spearhead-site.vercel.app/?edit=1`
2. A password prompt appears. Current password: **`spearhead-edit`**
3. After unlocking, every editable text element (headings, paragraphs, list
   items, team titles, etc.) shows a faint dashed outline on hover.
4. Click any text to edit it inline. Type as you would in a regular text
   field. Pasting from Word / Google Docs is automatically converted to
   plain text so formatting stays consistent.
5. The floating toolbar at the bottom shows how many edits are pending on
   this page.
6. Hit **Save & email N edits** when ready. The proposed changes are emailed
   to the team. You'll see a confirmation toast when the email is sent.
7. **Revert page** discards all unsaved edits on the current page.
8. **Exit** leaves edit mode (you'll go back to view-only and the URL stays
   clean).

## What can and can't be edited

**Editable:** body copy — headings, paragraphs, list items, blockquotes,
team member names and titles, value pill text, hero subtitles.

**Not editable:** the navbar, footer, form fields, buttons, links (the link
text is editable on team bios, but URLs are not), images, layout, colors,
or anything structural.

## Edit mode persists across pages

Once you've unlocked edit mode on one page, you can navigate to any other
page on the site and edit there too — edit mode stays on until you click
**Exit** (or clear your browser storage). The toolbar appears on every
page.

You must hit **Save & email** on each page individually before navigating
away, otherwise unsaved edits on that page are lost.

## What the email looks like

Each save sends one email per page, with subject:

```
Site copy suggestion — <page title>
```

The body includes:
- Page URL
- Page title
- Number of edits
- A human-readable diff for each edit (`BEFORE` / `AFTER` plus the section
  heading and CSS path of the element)
- A JSON block with the same data, machine-parseable

## Changing the password

Edit `EDIT_PASSWORD` near the top of `inline-edit.js` and redeploy. Note:
this is a deterrent only — anyone who reads the page source can see the
password. It exists to prevent stray visitors from stumbling into edit mode,
not to provide real security. Since edits never publish automatically, the
worst-case abuse is spam emails to the inbox.

## Changing the notification email

By default, edits go to the same Formspree endpoint as the contact form
(`formspree.io/f/xojpzrbr`). To split them out:

1. Create a new Formspree form for content suggestions.
2. Replace `FORMSPREE_URL` in `inline-edit.js` with the new endpoint URL.
3. Filter your inbox by subject `Site copy suggestion —` if you stay on the
   shared endpoint.
