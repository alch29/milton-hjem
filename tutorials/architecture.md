# Architecture
For the architecture of this app, two design patterns are used, which are MVVM (Model View Viewmodel) and Composables + Observer + Unidirectional. Both design patterns integrate well into Vue and play a big part in how the app has been structured.

## Overall structure of the app
Below is a diagram of the application's file structure, located within the src directory. The src directory contains all the source files of the project, including components, views, styles, routing and application logic.

```
src/
├── assets/
│   ├── icons/
│   ├── images/
│   └── scss/
│       └── _typography.scss
│       └── _variables.scss
│       └── main.scss
├── components/
│   ├── __tests__/
│   ├── cardComponents/
│   ├── chatComponents/
│   ├── timelineComponents/
│   └── ...
├── composables/
│   ├── __tests__/
│   └── ...
├── config/
│   └── firebase.js
├── layouts/
│   └── ...
├── router/
│   └── index.js
├── stores/
│   ├── __tests__/
│   └── ...
├── views/
│   ├── clientViews/
│   ├── consultantViews/
│   └── ...
├── App.vue
└── main.js

```

### Components
The components folder holds all the individual components of the app, which are being implemented and reused across the views. When looking at the individual components, the use of MVVM can be seen in how the logic and state is being handled by the script setup tag and the view portion by the template tag.

### Composables and stores
Logic, functionality and reactive values that are being used by multiple components, are organised as composables and placed in the composables folder. The stores folder holds logic and functionality as well, which is being used across multiple components, however they differ from composables in that they manage global state and are responsible for all API calls to the Firestore database.

### Layouts and views
The layouts folder holds components that need to be visible almost everywhere on the app, which is the header and navigation bar component. The views folder contains the views of the app and are being imported in the index file of the router folder, to handle the routing of the app.

### App.vue and Main.js
Lastly the App.vue file works as the root component of the application. It's the wrapper that all the components and views are rendered within. main.js is responsible for initialising Vue, registering global plugins such as the router and Pinia, and mounting the root component to the DOM.