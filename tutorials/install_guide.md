# Install Guide

## Requirements

- [Node.js](https://nodejs.org/) version 20 or higher
- A Firebase project with Firestore, Authentication and Storage enabled

---

## 1. Clone the repository

```bash
git clone https://github.com/alch29/milton-hjem.git
cd milton-hjem
```

---

## 2. Install dependencies

```bash
npm install
```

---

## 3. Set up environment variables

Create a `.env` file in the root of the project with the following values. You can find these in the Firebase console under **Project settings → Your apps**.

```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

> The `.env` file is not committed to Git. Ask a teammate for the values if you don't have them.

---

## 4. Run the development server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## Other useful commands

| Command | Description |
|---|---|
| `npm run build` | Build the app for production |
| `npm run lint` | Check the code for errors |
| `npm run docs` | Generate the documentation |
