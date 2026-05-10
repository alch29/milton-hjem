# Technologies
Overview of the different technologies used in the project.

## Vue.js
The JavaScript framework Vue has been used to build the app as a Single Page Application (SPA), using the MVVM design pattern and Vue's native design pattern Composables + Observer + Unidirectional (read more under Architecture).

## Pinia
Pinia is a state management library designed for Vue, and is used in this project to manage global application state and API calls to the Firestore database. An example of this is the user store, which holds the state of the currently logged-in user.

## ESLint
ESLint is a linting tool used in this project to ensure that all code is written and structured according to the syntax rules agreed upon by the team. It is configured to only lint files within the `src` directory, since that is where the majority of the team's code is located.

## Vitest
For unit testing and component testing, Vitest has been used throughout the project. Each test is scoped to a single piece of functionality or one aspect of a component at a time, in order to ensure code quality and simplify debugging.

## Cypress
Cypress is an end-to-end testing framework used in this project to test complete user flows from start to finish. This helps ensure a consistent and reliable user experience.

## Firebase
Several Google Firebase services have been used in this project: Firestore as the primary database (read more in the database documentation), Firebase Storage for storing uploaded images and documents, and Firebase Authentication for handling user authentication.

## JSDoc
JSDoc is a documentation tool for JavaScript that generates documentation directly from comments written in the source code. It has been used in this project to document functions, parameters, and return values, making the codebase easier to understand and maintain. The documentation has been deployed and is publicly available via GitHub Pages. 

## Git & GitHub
Git has been used for version control throughout the project, and GitHub has been used to host the repository. The team has followed a branching strategy where each feature or fix is developed on a separate branch and merged into the main branch via pull requests.

### GitHub Actions
GitHub Actions has been used to set up a CI/CD pipeline for the project. The pipeline is triggered on pushes to the main branch, and is configured to automatically run the ESLint linter, build the application, and generate and deploy JSDoc documentation to GitHub Pages.

### GitHub Pages
GitHub Pages is used for static hosting of the JSDoc documentation.