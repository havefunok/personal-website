# Start here

The complete Astro website is ready to run. It includes Home, About, Projects, case-study routes, Writing, article routes, Resume, Contact, a 404 page, themes, project filters, validated content, a Pages CMS configuration, and a GitHub Pages workflow.

**Readiness is not account activation:** local verification is recorded in `VERIFICATION.md`. GitHub Pages and Pages CMS must be enabled for your chosen repository. The private review site is separate from GitHub Pages.

## Shortest route to a public website

1. Extract the project ZIP. Create a new GitHub repository, or intentionally choose an existing one. A public repository is the free GitHub Pages option. Upload the project contents at its root, including `.github/` and `.pages.yml`. Do not upload the containing ZIP, `node_modules/`, or `dist/`.
2. In the repository, select **Settings → Pages → Source → GitHub Actions**. Ensure Actions are allowed.
3. Commit/push to `main`. If the first push occurred before Pages was enabled, run **Actions → Build and deploy portfolio → Run workflow**.
4. Wait for the build and deployment jobs to turn green. Open the deployment URL shown by GitHub.
5. To enable visual editing, sign in to [Pages CMS](https://app.pagescms.org/), install its GitHub App for that repository, and open the `main` branch.

The workflow detects the correct repository subpath from Pages settings. A custom domain can be configured later. No paid CMS, backend server, or database is needed.

If replacing an older site, use a branch and pull request or keep a backup first. This implementation did not overwrite either existing portfolio repository. The defaults mention `/engineering-portfolio`, but the Actions deployment adapts to the repository you actually choose.

Your uploaded classic resume is installed at `public/resume.pdf`. The HTML resume, shared experience entries, LinkedIn link, and academy figures have been updated from it.

## One checklist of remaining personal inputs

These do not prevent previewing the website. Review them before using the site for applications:

- [ ] Confirm the display name and public contact email in `src/config/site.json` (taken from the connected GitHub profile).
- [ ] Review the first-person copy and three public project summaries for your preferred wording.
- [ ] Optionally add a portrait and actual project photographs.
- [ ] Review the unpublished autonomy and power-module entries before making them public. Add verified implementation details and results; leave unknown dates out.
- [ ] Choose the destination GitHub repository and, optionally, a custom domain.

Personal writing has its own homepage section and Writing-page archive, alongside Engineering notes. In the CMS, choose **Writing section → personal** for essays or **technical** for engineering notes. There are no fake article entries on the public site; each section populates automatically when you publish your own writing.

## Accounts and permissions

You need a GitHub account with write access to the destination repository and permission to enable Pages/Actions. GitHub Free hosts Pages from public repositories; a private repository needs a qualifying plan. You also need to authorize the hosted Pages CMS GitHub App for the repository. This permission is separate from the ChatGPT GitHub connection.

Pages CMS supports installed repositories without a public-repository requirement. The editor needs repository write access. Organization policy and branch protection can affect saving; use an allowed editing branch and merge if direct `main` writes are blocked. No CMS secrets belong in this codebase.

## Preview locally

Install Node.js 24 LTS, open a terminal in the project folder, then run:

```sh
npm ci
npm run dev
```

Open Astro's printed URL. Stop with Ctrl+C. Before publishing, run:

```sh
npm run verify
npm run preview
```

Production preview uses the configured base path, normally `/engineering-portfolio/`. To change local production defaults, edit `siteUrl` and `basePath` in `src/config/site.json`. GitHub Actions obtains the deployment values from Pages settings automatically.

## Verify publishing worked

- Open Home, About, Projects, Writing, Resume, and Contact.
- Open a project by its full URL and refresh it.
- Open and download the resume PDF.
- Test category/tag filtering and change the theme, then refresh.
- Check on your phone and confirm that Menu opens and its links work.
- Open the sitemap and robots file under the deployed base URL.
- Confirm drafts have no published route and no sitemap entry.
- In Chrome DevTools, run Lighthouse on Home, a project, and a real article after one is published. The target is at least 90 in each category; no unmeasured score is claimed.

## Complete the real CMS test

1. Open **Site settings & homepage** and make a small, reversible change to a Current focus description. Save.
2. In GitHub, confirm the same `src/config/site.json` changed and that the workflow ran.
3. Confirm the change on the deployed website; restore the text if desired.
4. Create a project with Draft enabled, upload a small image, save, and check that the Markdown and image were committed to the expected directories.
5. Confirm the draft is absent from the website. When the content is ready, disable Draft, save, and check its automatic detail route and index entry.

The configuration has been validated. The hosted editor currently opens at its sign-in screen; this account-specific sign-in/save/upload/deploy cycle is the remaining CMS acceptance test. See `CONTENT_GUIDE.md` for everyday editing, and `README.md` for technical details.
