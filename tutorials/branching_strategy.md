# Branching Strategy

This project uses a **feature branch workflow**. All new work happens on its own branch and gets merged into `main` when it's done.

Initially, the plan was to follow a feature branch strategy — every piece of work isolated on its own branch, reviewed, and merged only when complete. In practice however, the team was pushing more frequently and directly to `main` without always going through a separate branch first.

This is closer to a **trunk-based development** approach, where the main branch is kept in a continuously deployable state and integration happens often. The shift was not a conscious decision but a natural consequence of the pace of development.

This also affected the branch naming conventions. Since the plan was to use feature branches, most branches were named with a `feature/` prefix. In a more structured workflow, branch names should clearly communicate both the type of change and the specific scope of work. Something closer to `fix/`, `refactor/` or `test/`

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
