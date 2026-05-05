# Database

This project uses **Firebase Firestore** as its database. Firestore is a NoSQL cloud database that stores data as documents inside collections.

---

## Collections

### `users`
Stores all user accounts. 
Each document ID matches the user's Firebase Auth UID.

| Field | Type | Description |
|---|---|---|
| `firstName` | string | The user's first name |
| `lastName` | string | The user's last name |
| `email` | string | The user's email |
| `address` | string | The user's address |
| `postalCode` | string | The user's postal code |
| `phoneNumber` | string | The user's phone number |
| `isConsultant` | boolean | Whether the user is a consultant or a client |
| `consultantId` | string | The ID of the consultant assigned to this client (clients only) |

---

### `documents`
Stores uploaded documents (PDFs, etc.) for clients.

| Field | Type | Description |
|---|---|---|
| `title` | string | Display name for the document |
| `category` | string | Category the document belongs to (fx `kontrakter`) |
| `uploadDate` | timestamp | When the document was uploaded |
| `url` | string | Download URL from Firebase Storage |
| `clientId` | string | The ID of the client this document belongs to |

---

### `batches`
Groups images uploaded together into a single batch. 
Each batch has an `images` subcollection.

| Field | Type | Description |
|---|---|---|
| `title` | string | Display name for the batch |
| `category` | string | Category the images belong to (fx `gulv`) |
| `uploadDate` | timestamp | When the batch was uploaded |
| `url` | string | URL of the first image, used as a preview |
| `clientId` | string | The ID of the client this batch belongs to |

#### `batches/{batchId}/images`
Each document in this subcollection represents a single image inside the batch.

| Field | Type | Description |
|---|---|---|
| `file` | string | Download URL of the image from Firebase Storage |

---

### `timelines`
Each document represents a timeline belonging to a client. Events are stored in a subcollection.

| Field | Type | Description |
|---|---|---|
| `clientId` | string | The ID of the client this timeline belongs to |

#### `timelines/{timelineId}/events`
Each document in this subcollection represents a single event on the timeline.

| Field | Type | Description |
|---|---|---|
| `title` | string | The event title |
| `date` | timestamp | The date of the event |
| `type` | string | The type of event (e.g. `meeting`, `completed`) |

---

## Relationships

- A **consultant** has many **clients** — linked via `consultantId` on each client's user document
- A **client** has many **documents** — linked via `clientId` on each document
- A **client** has many **image batches** — linked via `clientId` on each batch
- A **client** has one **timeline** — linked via `clientId` on the timeline document
