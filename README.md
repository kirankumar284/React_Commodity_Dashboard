# GitHub Pages + Custom CI/CD for JavaScript Framework App (React/Angular/Vue)

### 1. GitHub Pages Basics

* Designed for **static site hosting**: HTML, CSS, JS files only.
* Supports frontend frameworks (React, Vue, Angular) **after build** — outputs static files.
* Free hosting with HTTPS and CDN via GitHub’s global infrastructure.
* Repo → GitHub Actions workflow → build → deploy → global CDN.

---

### 2. Custom CI/CD Workflow Using GitHub Actions

* Enable GitHub Pages **source = GitHub Actions** in repo settings.
* Use GitHub’s system-managed workflow `pages-build-deployment` or create your own.
* Typical workflow steps for React apps:

  * Checkout code
  * Setup Node environment
  * Install dependencies (`npm install`)
  * Build app (`npm run build`) → produces static files in `build/` (CRA) or `dist/` (Vue)
  * Upload static files as artifact
  * Deploy via `actions/deploy-pages@v4`
* Permissions needed: `pages: write`, `contents: read`, `id-token: write`.

---

### 3. Important Configuration for Framework Apps

* Set `"homepage"` in `package.json` to your GitHub Pages URL, e.g.
  `"homepage": "https://username.github.io/repo-name"`
  This ensures correct asset paths post-build.
* React Router users must set `basename` in `BrowserRouter` to the repo subpath, e.g.
  `<BrowserRouter basename="/repo-name">`
  or use `HashRouter` to avoid routing issues.
* Build output directory (`build` for CRA, `dist` for Vue) must match artifact upload path.

---

### 4. Common Problems & Solutions

| Problem                                           | Cause                                              | Solution                                                                                  |
| ------------------------------------------------- | -------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| **404 errors for static assets**                  | Wrong `"homepage"` or missing basename             | Add `"homepage"` in `package.json`, set `basename` in Router                              |
| **Workflow fails with "No such dir"**             | Artifact upload path incorrect (`dist` vs `build`) | Change upload path to actual build output folder                                          |
| **Deploy fails with 404 "Pages not enabled"**     | GitHub Pages source not set to GitHub Actions      | In repo Settings → Pages, set source = GitHub Actions                                     |
| **Custom domain save disabled or error**          | Site not deployed yet or invalid domain            | Deploy site successfully first, then set domain; ensure domain DNS is configured properly |
| **Site works on navigation but not initial load** | React Router misconfiguration                      | Use `basename` in `BrowserRouter` or switch to `HashRouter`                               |
| **GitHub Actions dependency conflicts**           | npm peer dependency mismatches                     | Use `npm install --legacy-peer-deps` or resolve version conflicts                         |

---

### 5. Tips & Best Practices

* Always test builds locally with `npm run build` before pushing.
* Push small changes frequently to verify deployment.
* Use GitHub Actions logs to debug failures.
* Use free GitHub domain until custom domain setup is fully understood.
* Remember GitHub Pages only hosts static files, no server-side code.
* For advanced CI/CD (tests, linting), extend your workflow with extra jobs before deploy step.

---

### Summary Flowchart

```
Code Push (main branch)
        ↓
GitHub Actions Workflow triggers
        ↓
Checkout → Install deps → Build app
        ↓
Upload static files artifact (build/ or dist/)
        ↓
Deploy artifact to GitHub Pages (CDN)
        ↓
Site available at https://username.github.io/repo-name
```

---

This summary provides a clear guide to set up and troubleshoot custom CI/CD for modern JavaScript frameworks on GitHub Pages, helping avoid common pitfalls and ensuring smooth deployment.

---

If you want, I can also help draft this as a nicely formatted README section or cheat sheet!
