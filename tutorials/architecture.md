# Architecture
For the architecture of this app, two design patterns are used, which are MVVM (Model View Viewmodel) and Composables + Observer + Unidirectional. Both design patterns integrate well into Vue and play a big part in how the app has been structured.

## Overall structure of the app
Below is a diagram of the apps filestructure. 

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
│   └── ...
├── config/
│   └── firebase.js
├── layouts/
│   └── ...
├── router/
│   └── index.js
├── stores/
│   └── ...
├── views/
│   ├── clientViews/
│   ├── consultantViews/
│   └── ...
├── App.vue
└── main.js

```

### Components
The components folder hold all the individual components of the app, which are being implemented and reused across the views. When looking at the individual components, the use of MVVM can be seen in how the logic and state is being handled by the script setup tag and the view portion by the template tag.

### Composables and stores
Logic, functionality and reactive values that are being used by multiple components, has been organised as composables and placed in the composables folder. The stores folder holds logic and functionality as well, which is being used across multiple components, however they differ from composables in scale and all of the stores handles API calls to the firestore database.

### Layouts and views
The layouts folder, which holds components that has to be visible almost everywhere on the app, which is the header and navigation bar component. The views folder contains the views of the app and are being imported in the index file of the router folder, to handle the routing of the app. Lastly the App.vue representing the whole app itself and the main.js being the initiation of the app.