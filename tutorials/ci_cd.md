# CI/CD Pipeline

Every push to `main` triggers two workflows in parallel.

---

```
Push to main
      │
      ├─────────────────────────────────┬
      │                                 │                               
      ▼                                 ▼                              
┌─────────────┐               ┌─────────────────┐             
│  deploy.yml │               │   docs.yml      │           
└──────┬──────┘               └────────┬────────┘               
       │                               │
       ▼                               ▼
  Checkout code                   Checkout code
       │                               │
       ▼                               ▼
  Install deps                    Install deps
  (npm ci)                        (npm ci)
       │                               │
       ▼                               ▼
    Lint                          Generate docs
  (ESLint)                        (npm run docs)
       │                               │
       ▼                               ▼
    Build                         Deploy to
  (Vite + Firebase               GitHub Pages
   env secrets)                  (/docs folder)
       │
       ▼
  Deploy to
  Firebase Hosting
  (milton-hjem.web.app)
```

---

## deploy.yml

| Step | Tool | What it does |
|---|---|---|
| Checkout code | `actions/checkout` | Downloads the repo onto the CI server |
| Install deps | `npm ci` | Installs exact versions from `package-lock.json` |
| Lint | ESLint | Fails the pipeline if there are code style errors |
| Build | Vite | Compiles the app using Firebase secrets stored in GitHub |
| Deploy | Firebase CLI | Uploads the `dist/` folder to Firebase Hosting |

## docs.yml

| Step | Tool | What it does |
|---|---|---|
| Checkout code | `actions/checkout` | Downloads the repo onto the CI server |
| Install deps | `npm ci` | Installs exact versions from `package-lock.json` |
| Generate docs | JSDoc + docdash | Generates HTML documentation from source code comments |
| Deploy | peaceiris/actions-gh-pages | Publishes the `docs/` folder to the `gh-pages` branch |
