# Branching Strategy

This project uses a **feature branch workflow**. All new work happens on its own branch and gets merged into `main` when it's done.

---

## Branch Types

### `main`
The stable branch. Every push to `main` triggers the CI/CD pipeline (lint, build, and docs deployment). Only finished, working code belongs here.

### `feature/<name>`
Used for new features or components. Named after what's being built:

| Branch | What it was for |
|---|---|
| `feature/store-document` | Document store |
| `feature/store-image` | Image store |
| `feature/component-upload-media` | UploadMedia component |
| `feature/composable-useClientId` | useClientId composable |
| `feature/github-actions` | CI/CD pipeline setup |
| `feature/jsdocs` | JSDoc documentation |
| `feature/unit-testing` | Unit tests |

### `test/<name>`
Used for branches focused on writing or fixing tests, separate from the feature itself.

### `linting/<name>`
Used for branches that only deal with linting fixes or code style changes.

---

## Workflow

1. **Create a branch** from `main` with a descriptive name:
   ```
   git checkout -b feature/my-feature
   ```

2. **Work on the branch** - commit often with clear messages describing what changed.

3. **Push the branch** to GitHub:
   ```
   git add .
   git commit -m "my-message"
   git push -u origin feature/my-feature
   ```

4. **Merge into `main`** when the feature is complete and tested:
   ```
   git checkout main
   git merge feature/my-feature
   git push
   ```

5. **The CI/CD pipeline runs automatically** on every push to `main`, checking that the code lints, builds, and that docs are generated correctly.

---

## Naming Convention

Branch names follow this pattern: `type/short-description`
- Use lowercase and hyphens - no spaces or underscores
- Be specific enough that the branch name explains what it does
