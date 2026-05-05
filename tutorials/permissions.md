# Permissions

This project has two user roles: **consultant** and **client**. 
Which role a user has is determined by the `isConsultant` field on their user document in Firestore.

---

## Roles

### Consultant
A consultant manages one or more clients. They have full access to their clients' data and are the only ones who can upload or edit content.

### Client
A client is assigned to a consultant via the `consultantId` field on their user document. They can only view their own data and cannot upload or modify anything.

---

## What each role can do

| Action | Consultant | Client |
|---|---|---|
| View own profile | Yes | Yes |
| View assigned clients | Yes | No |
| View consultant profile | No | Yes |
| Upload documents | Yes (for their clients) | No |
| View documents | Yes (their clients' only) | Yes (own only) |
| Upload images | Yes (for their clients) | No |
| View images | Yes (their clients' only) | Yes (own only) |
| Create timeline events | Yes (for their clients) | No |
| View timeline | Yes (their clients' only) | Yes (own only) |

---

## Firestore security rules

The permissions above are enforced in Firestore using security rules. No one can bypass them — even if someone tried to access the database directly, the rules would block them.

### Helper functions

```javascript
function isSignedIn() {
  return request.auth != null;
}
```
Checks that the user is logged in.

```javascript
function isConsultant() {
  return isSignedIn() &&
    get(/databases/$(database)/documents/users/$(request.auth.uid)).data.isConsultant == true;
}
```
Checks if the logged-in user is a consultant by looking at their own user document.

```javascript
function ownsClient(clientId) {
  return get(/databases/$(database)/documents/users/$(clientId)).data.consultantId == request.auth.uid;
}
```
Checks that a given client actually belongs to the logged-in consultant.

---

### Rules summary

**Users**
- Everyone can read their own profile
- Consultants can read the profiles of their own clients
- Clients can read their assigned consultant's profile
- No one can write — accounts are created manually in Firebase console

**Documents**
- Clients can read their own documents
- Consultants can read, update and delete documents for their own clients
- Consultants can create documents for their own clients

**Batches (images)**
- Same rules as documents
- For the `images` subcollection, the parent batch is looked up to verify the `clientId`

**Timelines**
- Clients can read their own timeline and events
- Only consultants can create or edit timeline events, and only for their own clients

---

## Default deny

Everything not explicitly allowed by the rules above is denied. This is enforced by a fallback rule at the top of the Firestore rules file:

```javascript
match /{document=**} {
  allow read, write: if false;
}
```
