# Maintaining your website

You can edit the same content either in GitHub or in [Pages CMS](https://app.pagescms.org/). Saving to `main` triggers the GitHub Pages workflow once hosting is configured. You do not need to edit Astro components to add a project or article.

## Find the right file

| I want to… | Edit this |
| --- | --- |
| Change my name, email, GitHub, LinkedIn, or navigation | `src/config/site.json` |
| Change the homepage introduction or headline | `src/config/site.json` → `hero` and `introduction` |
| Update what I'm working on | `src/config/site.json` → `currentFocus.items` |
| Change the personal-interest section | `src/config/site.json` → `beyond` |
| Change the personal writing introduction or topics | `src/config/site.json` → `personalWriting` |
| Change the contact invitation | `src/config/site.json` → `contact` |
| Edit About | `src/content/pages/about.md` |
| Edit the HTML resume summary | `src/content/pages/resume.md` |
| Replace the resume PDF | `public/resume.pdf` |
| Add or edit projects | `src/content/projects/` |
| Add or edit articles | `src/content/writing/` |
| Update experience | `src/content/experience/` |
| Change colors, typography, or spacing | `src/styles/global.css` |

## 1. Edit homepage text

In GitHub, open `src/config/site.json`, click the pencil, change the text inside quotation marks, and commit. JSON uses commas between entries and cannot contain comments. The CMS offers labeled fields instead.

For example, the greeting and introduction are:

```json
"hero": {
  "greeting": "Hello, I am Oorjith.",
  "intro": "I study Electrical Engineering at UC San Diego. I am interested in robotics, embedded systems, and the connections between hardware and software."
}
```

This is a shortened editing example; retain the other settings in the real file. The social sharing image updates during the build. An empty `linkedin` value hides that link; provide your verified full URL to show it. To add another social service, add `{ "label": "Service", "url": "https://your-real-url" }` to `socials`.

## 2. Edit About

Open `src/content/pages/about.md`, or select **About page** in Pages CMS. Text between the first pair of `---` lines is metadata; the remaining text is the body. The title and description create the page introduction. Use `##` for body section headings because the page already supplies the H1.

The homepage links to the `Beyond engineering` section. If you rename that heading, update the corresponding `beyond.items` link in `site.json`; the output check catches broken anchors.

To add a portrait, upload a real photo to `public/images/personal/`, set `portrait` to `/images/personal/your-photo.jpg`, and write a descriptive `portraitAlt`. Leave both empty if you do not want a photo.

## 3. Add a project

Copy `templates/project.md` into `src/content/projects/` and rename it, for example `motor-controller.md`. Alternatively, click **Projects → New** in Pages CMS.

Here is a minimal example. Replace its sample facts with your own; it starts unpublished:

```yaml
---
title: "Motor controller"
description: "A concise, factual description of what I built."
category: "Embedded Systems"
tags: [C++, Control Systems]
featured: true
featuredOrder: 1
status: ongoing
role: "Firmware"
draft: true
---
## Overview

Explain the problem and your contribution in your own words.
```

1. Add only claims, dates, and results you can support.
2. Write the case study below the frontmatter. Keep useful sections and remove empty ones.
3. Set `draft: false` when ready.
4. Commit. The route, directory entry, and homepage feature are generated automatically.

The filename determines the URL: `motor-controller.md` becomes `/projects/motor-controller/`, with your repository subpath added automatically. Renaming a published file changes its URL, so avoid unnecessary renames. Never put a project file in `src/pages/`.

### Useful optional fields

| Field | Meaning |
| --- | --- |
| `date`, `endDate`, `updated` | ISO dates such as `2026-10-25`; omit unknown dates |
| `timeframe` | Human-readable period when an exact date is inappropriate |
| `subtitle` | Longer deck beneath the title |
| `category` | Any category name; filters pick it up automatically |
| `tags` | Topics used by the tag filter |
| `technologies` | Tools shown in the project sidebar |
| `role`, `collaborators` | Your role and collaborators you wish to credit |
| `status` | `planned`, `ongoing`, `completed`, or `archived`; optional |
| `featured` | Whether the homepage can select this project |
| `featuredOrder` | Lower numbers appear first |
| `coverImage`, `coverAlt` | Optional cover and required description when a cover is set |
| `github`, `demo` | Verified external URLs; omit or leave blank when absent |
| `links` | Additional `{label, url}` objects |

When a project has no `coverImage`, its title, category, and technologies form a typographic cover automatically. Uploading a cover image replaces that treatment; no component changes are needed.

The homepage shows up to `featuredLimit` selected entries. To feature a new project, adjust metadata only. Categories suggested in `site.json` are editable; categories used by published projects also appear automatically, so components and CMS enums do not need updating.

## 4. Add images and diagrams

Upload original files to `public/images/projects/` or use the CMS media manager. Reference them with root-relative content URLs:

```yaml
coverImage: "/images/projects/controller-board.jpg"
coverAlt: "Controller board showing the microcontroller, power input, and motor connectors"
```

Inline Markdown:

```md
![Bench setup with the controller and test motor](/images/projects/bench.jpg)
```

Do not add `/engineering-portfolio` to content paths. The build inserts the hosting base automatically. Include meaningful alt text. Use SVG for exact technical diagrams and caption the diagram in surrounding prose.

Raster images get responsive WebP variants automatically on a production build. SVGs remain vector files. Keep uploaded originals reasonably sized. After adding an image during local development, restart `npm run dev`; an existing image's manifest is generated when Astro loads its configuration.

## 5. Add an article

Copy `templates/article.md` into `src/content/writing/`, choose a descriptive filename, and fill it in. Or select **Writing → New** in Pages CMS.

```yaml
---
title: "What I learned tuning a motor loop"
description: "A short summary of the question and the main lesson."
date: 2026-10-25
kind: technical
tags: [Control Systems, Notes]
draft: true
---
```

Choose the section with `kind: personal` for essays, reading notes, and reflections, or `kind: technical` for engineering notes. The visual editor calls this **Writing section**. A missing or blank kind defaults to `personal`, so older entries remain compatible. Personal entries appear in the personal writing section and the latest two appear on Home. Technical entries appear under Engineering notes. The same `/writing/your-filename/` URL works for either type.

For a personal essay, copy `templates/article.md` and keep `kind: personal`. The supplied reading reflections are style references and have not been published as articles. There is no need to publish sample content to fill the layout.

Writing requires a date. The site calculates reading time and builds a table of contents when there are at least four level-two headings. Set `draft: false` to publish. Unpublished entries do not appear in public routes, indexes, or the sitemap.

### Code, equations, tables, and links

Use fenced code blocks with a language name, such as `cpp`, `python`, or `systemverilog`. Syntax highlighting happens at build time.

Use `$V = IR$` for inline math or `$$ ... $$` on separate lines for display math. Use Markdown tables and normal links. Internal links should be `/projects/competition-robot-systems/` or another site-relative URL; the deployment prefix is added for you.

Use the CMS **Source** mode for math or syntax the rich-text editor does not represent reliably. Check the saved file and the rebuilt page after editing those features.

### Advanced MDX

Copy `templates/technical-note.mdx` to a project or writing collection. MDX can contain components such as:

```mdx
<Media src="/images/projects/bench.jpg" alt="Motor test bench" caption="The assembled test setup." />

<Video src="/videos/test.mp4" title="Motor response test" captions="/videos/test.vtt" />

<Embed src="https://www.youtube-nocookie.com/embed/YOUR_VIDEO_ID" title="Motor test demonstration" />
```

`Media`, `Video`, and `Embed` are supplied by the layouts. Local video files go under `public/videos/`; add a caption track and a text transcript when speech or visual information needs an accessible alternative. Embed supports YouTube's privacy-enhanced origin and Vimeo's player origin. Use your real video ID.

Edit MDX in GitHub or a code editor. `.mdx` entries are excluded from the CMS rich-text collections to protect imports, JSX, and component attributes. You can use an imported Astro component for a custom exact diagram; no client framework is required.

## 6. Edit experience

Use **Experience** in Pages CMS or edit the Markdown files in `src/content/experience/`. `organization`, `position`, and `description` are required. Optional fields include start/end dates, current flag, location, achievements, technologies, organization link, and display order. Dates are optional because the initial history has no verified timeline.

An experience record appears automatically on About and the HTML resume. Set `draft: true` to hide it. Smaller `order` numbers display first.

## 7. Update the resume

Replace `public/resume.pdf` with your current PDF, retaining the filename, and commit. Both open and download links will use it automatically. The current PDF is your uploaded classic resume, preserved without changes. The HTML summary and shared experience entries were updated from that version.

To upload through Pages CMS, use **PDF documents**, then select the uploaded PDF in **Site settings & homepage → Resume path**. CMS uploads live under `/documents/`; the new path can differ from `/resume.pdf`. Update the HTML summary separately in **Resume summary** when relevant. The build catches a configured path that does not exist.

## 8. Use the visual editor

1. Open [app.pagescms.org](https://app.pagescms.org/).
2. Sign in with GitHub and install the provider's GitHub App for the repository you intend to edit. Select only the repository you need. Organization-owned repositories may need administrator approval.
3. Select the repository and `main` branch. `.pages.yml` must already be committed there.
4. Choose **Site settings & homepage**, **About page**, **Resume summary**, **Projects**, **Writing**, or **Experience**.
5. Edit fields or the body. Upload/select images in the image fields or media manager.
6. Save the change to GitHub. New projects and articles start as drafts.
7. To publish an entry, switch its Draft field off and save. Watch the GitHub Actions deployment finish.

There is one content source: the repository. The editor is not a live page builder and does not give a second website database. Commit history lets you restore an earlier version.

Do the real editing test in `START_HERE.md` before relying on the CMS. Authentication and saving in your account cannot be inferred from a valid configuration.

## 9. Change the design

In `src/styles/global.css`, edit the semantic tokens near the top:

- `--bg`, `--surface`, `--text`, `--secondary`, `--border`, `--accent` for color.
- Matching tokens in `[data-theme="dark"]` and the system-dark fallback.
- `--h1`, `--h2` for page and section heading sizes. The compact homepage greeting uses the `.hero h1` rule.
- `--content`, `--reading`, `--gutter` and the spacing scale for layout.

Keep both themes readable after changes. The theme button cycles System → Light → Dark → System and remembers the selection. Avoid putting personal content into CSS or components.

## 10. Publish and recover

Commit to `main`. GitHub Actions runs checks and builds before deployment. Open **Actions** to see progress. A green deployment supplies the real URL. Verify a detail page directly, not just the homepage.

If a build fails, open its failed step. Typical causes are invalid YAML/JSON, a missing image or PDF, a cover without alt text, an unrecognized status, or a broken internal link. Fix the named file and commit again. The previous deployment remains live until a new one succeeds.

To undo an edit, restore the previous file using GitHub history or revert its commit. Keep personal drafts free of secrets: `draft: true` excludes them from the built website, but files remain visible to anyone who can read the source repository.

## 11. Keep the writing voice consistent

The website copy follows the explanatory style of the two supplied reading reflections. For future additions:

- Begin with a clear idea, then explain the connection or reasoning behind it.
- Develop the idea through a concrete example from the actual work, followed by what that example means to you.
- Use connected sentences with clauses that explain cause, context, or qualification. Transitions such as “Although,” “In addition,” “For example,” and “However” should reflect the relationship between the ideas.
- Prefer first-person phrasing such as “I am interested in” and “This experience made me consider.” Use a measured, fairly formal tone and normally spell out contractions.
- Refer explicitly to the system, project, or idea under discussion. Repeating a precise noun can make the explanation easier to follow.
- Keep headings and navigation concise. Use complete explanations in the body rather than promotional slogans or a string of short declarations.

Keep the original facts and distinguish an interpretation or interest from a demonstrated result. The reference essays informed the voice; their text is not included in the website.

## 12. The visual design

The current design draws on the compact introduction, underlined navigation, two-column work gallery, and quiet typography of https://long-nguyen.dev/. All components and project covers are implemented locally; no third-party portfolio images or proprietary fonts are copied. The typeface is the self-hosted, openly licensed DM Sans, with Newsreader reserved for quotations and IBM Plex Mono for technical details.

All palette values are in `src/styles/global.css`: change `--bg`, `--text`, `--secondary`, and `--accent` for the page, and `--cover-one-*`, `--cover-two-*`, and `--cover-three-*` for the typographic project covers. The dark theme has its own semantic tokens. The gallery chooses cover treatments automatically, and becomes one column on mobile.
