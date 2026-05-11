# Test Strategy

This document describes how and what we test in the project, and which tools we use.

---


## Unit Tests

Unit tests are written with Vitest and are located in `__tests__` folders next to the code they test. They focus on one thing at a time — a single function, a piece of store logic, or one aspect of a component.

Firebase is mocked in all unit tests using `vi.mock()`, so the tests never communicate with the real database. This keeps them fast and predictable.

### Stores (`src/stores/__tests__/`)

| File | What it tests |
|---|---|
| `document.test.js` | `uploadDocument` (file upload, title fallback, lowercase category) and `fetchDocuments` (result count) |
| `timeline.test.js` | Timeline store logic |

### Composables (`src/composables/__tests__/`)

| File | What it tests |
|---|---|
| `useClientId.test.js` | Returns the selected client's ID when the user is a consultant, and the user's own ID when they are a client |
| `useFormatDate.test.js` | Date formatting logic |

### Components (`src/components/__tests__/`)

| File | What it tests |
|---|---|
| `UploadMedia.test.js` | Shows correct categories based on the `type` prop, and disables the upload button when no file or category is selected |
| `Calendar.test.js` | Calendar component rendering |
| `Timeline.test.js` | Timeline component rendering |

---

## End-to-End Tests

E2E tests are written with Cypress and are located in `cypress/e2e/`. They test complete user flows by interacting with the app the same way a real user would — clicking buttons, filling in forms, and navigating between pages.

The tests run against a live version of the app with real Firebase data. A dev server must be running before the tests can be executed:

```
npm run test:e2e:dev
```

### Covered flows (`cypress/e2e/miltonHjem.cy.js`)

| Test | What it does |
|---|---|
| Login as client and view timeline | Logs in as a client, navigates to the timeline, expands it, and opens the calendar view |
| Login as consultant and upload image | Logs in as a consultant, selects a client, navigates to upload, and uploads an image with a title and category |
| Login as consultant and upload document | Logs in as a consultant, selects a client, navigates to upload, and uploads a document with a title and category |

---
