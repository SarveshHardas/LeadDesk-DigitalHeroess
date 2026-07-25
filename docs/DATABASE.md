# LeadDesk Mini - Database Schema & Indexing Architecture

This document provides complete technical specifications for the MongoDB database schema, indexing strategies, soft-delete mechanisms, and connection pooling model implemented in **LeadDesk Mini**.

---

## 1. Database Rationale

**LeadDesk Mini** utilizes **MongoDB Atlas** (Document Store) coupled with **Mongoose 8 ODM**.

### Key Rationale
- **Schema Flexibility**: Accommodates varying prospect inquiry attributes without rigid migration downtime.
- **Compound Text Indexing**: Provides native full-text multi-field search across prospect names, emails, budget tiers, and requirement notes directly at the database layer.
- **Serverless Compatibility**: Caches connection instances globally across Vercel serverless function invocations.

---

## 2. Collections & Schema Definitions

### A. `leads` Collection (`src/models/Lead.ts`)

Represents prospect inbound lead submissions.

```typescript
import mongoose, { Schema, Document } from 'mongoose';

export interface ILeadDocument extends Document {
  name: string;
  email: string;
  budget: '$1k-$5k' | '$5k-$10k' | '$10k-$25k' | '$25k+';
  message: string;
  status: 'New' | 'Contacted' | 'Closed';
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

#### Field Specifications

| Field | Type | Required | Default | Validation & Enums |
| :--- | :--- | :--- | :--- | :--- |
| `name` | String | Yes | — | Trimmed, non-empty |
| `email` | String | Yes | — | Trimmed, lowercase, RFC 5322 email regex |
| `budget` | String | Yes | — | Enum: `['$1k-$5k', '$5k-$10k', '$10k-$25k', '$25k+']` |
| `message` | String | Yes | — | Trimmed, min length 10 chars |
| `status` | String | Yes | `'New'` | Enum: `['New', 'Contacted', 'Closed']` |
| `isDeleted` | Boolean | Yes | `false` | Soft-delete flag |
| `createdAt` | Date | Auto | `now` | Mongoose `{ timestamps: true }` |
| `updatedAt` | Date | Auto | `now` | Mongoose `{ timestamps: true }` |

---

### B. `users` Collection (`src/models/User.ts`)

Represents authorized administrator accounts.

```typescript
import mongoose, { Schema, Document } from 'mongoose';

export interface IUserDocument extends Document {
  name: string;
  email: string;
  passwordHash: string;
  role: 'admin';
  createdAt: Date;
}
```

#### Field Specifications

| Field | Type | Required | Default | Validation & Enums |
| :--- | :--- | :--- | :--- | :--- |
| `name` | String | Yes | — | Trimmed |
| `email` | String | Yes | — | Unique index, lowercase, trimmed |
| `passwordHash`| String | Yes | — | Salted `bcryptjs` hash (cost factor 10) |
| `role` | String | Yes | `'admin'`| Enum: `['admin']` |
| `createdAt` | Date | Auto | `now` | Mongoose `{ timestamps: true }` |

---

## 3. Database Indexing Strategy

To maintain sub-15ms query latency under heavy pipeline loads, compound indexes are defined in `models/Lead.ts`:

### 1. Compound Text Index (Multi-field Search)
```typescript
LeadSchema.index(
  { name: 'text', email: 'text', message: 'text' },
  { weights: { name: 3, email: 2, message: 1 } }
);
```
- **Purpose**: Powers the real-time search bar in the admin dashboard.
- **Weights**: Gives highest relevance weight to matching prospect names, followed by email addresses.

### 2. Compound Query Index (Filtered Pagination & Metrics)
```typescript
LeadSchema.index({ isDeleted: 1, status: 1, createdAt: -1 });
```
- **Purpose**: Accelerates filtered dashboard queries (`WHERE isDeleted = false AND status = 'New' ORDER BY createdAt DESC`).

---

## 4. Soft-Delete Audit Trail

Instead of physically purging lead records on deletion, LeadDesk Mini sets `isDeleted: true`.

```typescript
// Soft-delete action execution
await Lead.findByIdAndUpdate(leadId, { isDeleted: true });

// Standard active query filter
const activeLeads = await Lead.find({ isDeleted: false });
```

### Benefits
1. **Historical Reporting Integrity**: Total lead conversion rates and revenue metrics remain accurate.
2. **Accidental Deletion Recovery**: Leads can be restored by resetting `isDeleted: false`.

---

## 5. Mongoose Connection Caching Singleton (`lib/db.ts`)

```typescript
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define MONGODB_URI in environment variables');
}

let cached = global.mongooseCache || { conn: null, promise: null };

export async function connectToDatabase() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
  }
  cached.conn = await cached.promise;
  global.mongooseCache = cached;
  return cached.conn;
}
```
