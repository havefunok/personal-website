# Verification record

Verified on 2026-10-26 (UTC), using Node 24.22.1, npm 11.9.0, Astro 7.4.2, and a Chromium browser. These results describe the implementation, not a guarantee about future content changes.

## Automated results

| Check | Result |
| --- | --- |
| Clean locked dependency installation | Passed (`npm ci` through the managed installer) |
| Production dependency audit | 0 known vulnerabilities (`npm audit --omit=dev`) |
| Astro and strict TypeScript checks | Passed; 0 errors, warnings, or hints |
| CMS paths, fields, media, resume, workflow checks | Passed |
| URL/base-path regression tests | 2 passed |
| Repository-subpath production build | Passed at `/engineering-portfolio/` |
| Root-path production build | Passed at `/` |
| Production output crawl | 10 HTML pages; 230 internal links/assets/metadata image references checked |
| SEO and structure | Unique titles and descriptions, one H1 per page, canonical origin/base, valid JSON-LD, sitemap and robots output checked |
| Draft protection | Draft projects and writing excluded from routes, sitemap, and featured content |
| New project and article | Automatic detail routes generated from temporary content files |
| Featured selection and existing-content editing | New featured item reached Home; an edited project heading reached its page |
| CMS-compatible settings | Homepage edit reached output; nullable optional global fields and project order accepted |
| Rich article rendering | MDX, MathML/KaTeX, dual-theme highlighted code, tables, TOC, responsive image variants, and internal links passed |
| Temporary fixtures | Removed and a clean build restored |

`npm run verify` repeats the main checks. `npm run test:content` repeats the content-creation test, restores the original files, and rebuilds. The output crawler checks both ordinary links and responsive image candidates, including sharing images.

## Browser checks

The real rendered pages were tested in 375, 768, and 1440 px iframe viewports, in light and dark themes. This is browser layout testing, not native phone/tablet emulation.

- Home, About, Projects, all three public project details, Writing, Resume, Contact, and a disposable technical article were checked.
- No horizontal page overflow at the tested widths. Code and table layouts remained contained.
- axe-core 4.14.0 ran WCAG 2 A/AA, WCAG 2.1 A/AA, and best-practice checks: **zero violations and zero incomplete findings in the final checks**. This is not a full accessibility certification.
- The first audit found a brand-link label issue, theme-transition contrast, and a low-contrast syntax color. These were fixed and the affected checks repeated. The article's final six width/theme combinations passed after using high-contrast syntax themes.
- The mobile menu opens using the keyboard, Escape closes it, and navigation works. The desktop links and generated detail links work.
- Category and tag filtering return the expected project count. An unmatched search produces the empty-results message. Query-string filters are retained in the URL.
- Theme changes work and the manual preference survives a reload. System mode is available.
- The resume link opened the generated PDF. The PDF was also rendered and visually inspected; the HTML resume provides a more accessible alternative to the untagged PDF.
- A fresh browser session showed no application console errors on the tested interactions. Browser-extension metadata errors were unrelated to the application. Development hot-reload errors during intermediate font/config edits were resolved before the final checks.
- Reduced-motion rules are implemented; screen-reader, forced-colors, native-device, and browser-specific assistive-technology testing were not performed.

The reproducible browser harness is in `tests/fixtures/`. Use `npm run qa:prepare`, run the dev server, and open `/qa-responsive/`. Remove fixtures using `npm run qa:clean`. Production builds deliberately reject the temporary QA routes.

## Pages CMS

The configuration was checked against the official Pages CMS source schema (`lib/config-schema.ts`, blob `cc434fd87bcebc80aa8fe777b99c7d0f943ef11f`) and local model/path checks. Official documentation was reviewed for GitHub App installation, repository access, Markdown/JSON formats, named media directories, and rich-text editing.

Images upload to `public/images`; PDF documents upload to `public/documents`. Returned media paths match the site's public paths. Projects, writing, experience, About, the resume summary, and global/homepage settings use the same files in both editing methods. MDX is excluded from the visual collections and remains an advanced code-editing option.

The hosted editor was opened and showed its sign-in screen. **Authentication, repository authorization, a real CMS save, and a real CMS media upload have not been tested.** They require the owner's Pages CMS/GitHub authorization and the chosen destination repository. Follow the end-to-end test in `START_HERE.md`; configuration validation does not prove account integration.

## Deployment and performance boundaries

The GitHub Actions YAML, required permissions, triggers, static artifact path, and origin/base-path behavior were checked locally. **GitHub Pages itself has not been deployed by this session.** The connected tools do not provide repository creation or Pages administration, and neither existing portfolio repository was overwritten. Enable Pages in the chosen repository and push this package to run the workflow.

A separate owner-private review deployment is prepared through Sites; its publishing result is reported with the handoff. It is independent of GitHub Pages and CMS authentication.

**Lighthouse scores were not measured.** The available browser controls do not expose Lighthouse, so no score of 90+ is claimed. Static rendering, self-hosted fonts, responsive images, build-time math/highlighting, and minimal client JavaScript are in place. Run Lighthouse on the final public GitHub Pages URL as described in `START_HERE.md`, particularly after adding images or embeds.

## Voice revision on October 26 2026

Revised the homepage, About page, three public project narratives, and supporting page text using the two supplied reading reflections as style references. The maintenance guide includes the writing patterns used for future content updates.

After the rewrite, `npm run verify` passed with zero Astro/TypeScript diagnostics, both existing URL tests passing, and 10 production HTML pages checked. The browser harness completed 60 page/width/theme combinations with zero horizontal overflow, zero axe violations, and zero incomplete findings. The longer homepage and About text was visually inspected. Temporary browser fixtures were removed before the final root-path production build and output crawl.

## Reference design revision on October 26 2026

Reworked the visual system around the supplied Long Nguyen reference: compact sans-serif introduction, underlined navigation, warm neutral colors, a two-column gallery, and responsive typographic project covers. The user's existing prose is retained throughout the case studies and About page. Personal writing now has a homepage section and a separate archive from engineering notes; both use the same content collection and Pages CMS editor. The visual record in `docs/design-preview.jpg` shows the revised homepage.

- Astro/TypeScript and CMS model checks passed with zero diagnostics.
- Both existing URL tests passed; production output contains 10 HTML pages and 294 validated local links/assets.
- The content integration check created a personal reflection and a technical MDX note. It verified separate archive placement, automatic homepage selection of personal writing, nullable/default section compatibility, generated routes, and the existing rich-content features. All temporary content was removed.
- The browser harness passed all 60 page/width/theme combinations at 375, 768, and 1440 px with no horizontal overflow, no axe violations, and no incomplete findings.
- Mobile layout and keyboard menu operation were inspected. Category/tag filtering, the empty-search state, personal-writing navigation, and dark-theme persistence after reload were checked. The browser logs showed no application errors; unrelated browser-extension messages were present.
- The social sharing image and content-maintenance instructions were updated for the new design and writing categories.

The existing account-specific boundaries remain: Pages CMS authentication/save/upload, GitHub Pages activation, and Lighthouse scores have not been verified. This revision is delivered through the existing owner-private review Site.

## Uploaded resume update on October 26 2026

Replaced `public/resume.pdf` with the exact user-supplied `Oorjith_Komarraju_Resume_Classic.pdf` (one page, 89,502 bytes). The PDF was rendered and inspected without modifying its contents. SHA-256: `73e701434f9fbf8559905f9d9a8db01a43958285ef1314c4ec2d334d89d17d8f`.

Updated the HTML resume, shared experience entries, About education/research details, LinkedIn URL, and Fremont Robotics Academy figures from that attachment. The current resume supersedes the earlier supplied academy counts. The downloadable file keeps its original formatting; personal writing and the visual design remain in place.

`npm run verify` passed: zero Astro/TypeScript diagnostics, two URL tests, the repository-subpath build, and the 10-page/294-reference output crawl. The uploaded, source, and built PDFs were confirmed byte-identical. Both resume links point to the PDF, and the download link carries the download attribute. The PDF opened correctly in the browser. Resume and About each passed all six viewport/theme combinations (375, 768, and 1440 px; light and dark), with no horizontal overflow, axe violations, or incomplete findings. See `docs/resume-preview.jpg` for the rendered resume page. Temporary browser fixtures were removed before packaging.
