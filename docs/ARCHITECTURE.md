# LeadDesk Mini - System Architecture & Technical Specifications

This document outlines the architectural blueprints, data flows, serverless request lifecycles, and design system specifications of **LeadDesk Mini**.

---

## 1. High-Level Architecture Overview

LeadDesk Mini is built as a serverless full-stack web application using **Next.js 16 (App Router)**, **MongoDB Atlas**, **Mongoose ODM**, and **Tailwind CSS v4**.

```
+-------------------------------------------------------------------------------+
|                                CLIENT BROWSER                                 |
|  React 19 Interactive Components (Navbar, Intake Modal, Admin Table, Drawer)  |
+---------------------------------------+---------------------------------------+
                                        |
                                        v
+-------------------------------------------------------------------------------+
|                           NEXT.JS EDGE MIDDLEWARE                             |
|       `middleware.ts` intercepts `/admin` & `/api/leads` protected routes     |
|             Verifies Jose JWT cookie (`leaddesk_session`) on Edge             |
+---------------------------------------+---------------------------------------+
                                        |
                                        v
+-------------------------------------------------------------------------------+
|                            NEXT.JS SERVER ROUTER                              |
|   +------------------------------------+-----------------------------------+  |
|   |         Server Actions             |           REST API Routes         |  |
|   |  (`submitLeadAction`, `loginAction`|    (`/api/leads`, `/api/seed`,    |  |
|   |   `updateLeadStatusAction`, etc.)  |          `/api/health`)            |  |
|   +------------------------------------+-----------------------------------+  |
+---------------------------------------+---------------------------------------+
                                        |
                                        v
+-------------------------------------------------------------------------------+
|                            MONGOOSE ODM & DB LAYER                            |
|             Global connection singleton caching (`lib/db.ts`)                 |
|             Models: `Lead` (Text Index) & `User` (Bcrypt hash)                |
+---------------------------------------+---------------------------------------+
                                        |
                                        v
+-------------------------------------------------------------------------------+
|                         MONGODB ATLAS CLOUD DATABASE                          |
+-------------------------------------------------------------------------------+
```

---

## 2. Request Lifecycles & Data Flow

### A. Public Lead Intake Lifecycle

```
[User Fills Form] 
       │
       ▼
[Client-side Zod Validation] ──(Invalid)──► Render Inline Errors
       │ (Valid)
       ▼
[Client submits Server Action `submitLeadAction`]
       │
       ▼
[Honeypot Trap Check] ──(Bot Detected)──► Return Fake Success
       │ (Human)
       ▼
[Server-side Zod Validation (`LeadSubmissionSchema`)]
       │
       ▼
[Connect to MongoDB Atlas Singleton (`lib/db.ts`)]
       │
       ▼
[Mongoose Document Insert: `Lead.create({...})`]
       │
       ▼
[Revalidate Path `/admin` & Return `{ success: true }`]
```

### B. Admin Authentication & Protected Route Lifecycle

```
[Admin Enters Credentials at `/admin/login`]
       │
       ▼
[Server Action `loginAction`]
       │
       ▼
[Fetch User Document & Compare Password with `bcrypt.compare`]
       │
       ▼
[Encrypt JWT Payload using `jose` HS256]
       │
       ▼
[Set HTTP-Only Cookie (`leaddesk_session`, SameSite=Lax, Secure)]
       │
       ▼
[Redirect to `/admin` -> Intercepted by `middleware.ts`]
```

---

## 3. Directory & Component Hierarchy

### Component Design Tree

```
src/
├── app/
│   ├── layout.tsx                     # Root Layout with Font Providers
│   ├── page.tsx                       # Public Landing Page Container
│   ├── (admin)/admin/page.tsx         # Admin Dashboard Container
│   └── (admin)/admin/login/page.tsx   # Admin Login Container
├── components/
│   ├── ui/                            # Primitive Components
│   │   ├── Button.tsx                 # Tactile Button (Primary, Secondary, Ghost, Outline)
│   │   ├── Input.tsx                  # Tactile Input & Textarea
│   │   ├── Select.tsx                 # Tactile Dropdown
│   │   ├── Badge.tsx                  # Status Badge (New, Contacted, Closed)
│   │   ├── Card.tsx                   # Tactile Card Container
│   │   ├── Modal.tsx                  # Accessible Dialog Backdrop & Focus Lock
│   │   ├── Skeleton.tsx               # Loading State Placeholders
│   │   └── Toast.tsx                  # Toast Provider & Notification Queue
│   ├── landing/                       # Public Landing Page Sections
│   │   ├── Navbar.tsx                 # Floating Pill Header Navigation
│   │   ├── Hero.tsx                   # Full-Screen Editorial Hero Fold & App Console
│   │   ├── Benefits.tsx               # Asymmetrical Magazine Grid (01-04)
│   │   ├── Features.tsx               # Architectural System List (SYS-01 to SYS-06)
│   │   ├── Workflow.tsx               # 3-Step Visual Timeline
│   │   ├── Testimonials.tsx           # Magazine Reviews Grid
│   │   ├── FAQ.tsx                    # Accessible Accordion
│   │   ├── LeadFormModal.tsx          # Dialog Lead Intake Form
│   │   ├── LeadFormSection.tsx         # Inline Lead Intake Section
│   │   └── Footer.tsx                 # Product Footer & Digital Heroes Attribution
│   └── admin/                         # Admin Workspace Components
│       ├── AdminHeader.tsx            # Protected Header & Logout Control
│       ├── MetricsCards.tsx           # 4 Executive KPI Summary Cards
│       ├── LeadFilters.tsx            # Status Tabs & Multi-Field Search Input
│       ├── LeadTable.tsx              # Paginated Lead Table with Quick Status Toggles
│       └── LeadDetailModal.tsx        # Slide-Over Lead Detail Drawer
```

---

## 4. Serverless MongoDB Connection Caching (`lib/db.ts`)

In serverless environments (Vercel Node.js Functions), establishing a new MongoDB connection on every request causes connection pool exhaustion. LeadDesk Mini implements a global connection caching pattern:

```typescript
import mongoose from 'mongoose';

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongooseCache: MongooseCache | undefined;
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
  return cached.conn;
}
```

---

## 5. Design System Tokens & Typography

Defined in `src/app/globals.css`:

```css
:root {
  --background: #0a0b0d;        /* Deep Charcoal Surface */
  --foreground: #f4f3ef;        /* Warm Cream Text */
  --surface-1: #121418;         /* Dark Graphite Card Surface */
  --surface-2: #191c22;         /* Tactile Stone Container */
  --amber-accent: #d97706;      /* Primary Brand Amber */
  --border-tactile: rgba(255, 255, 255, 0.08);

  --font-sans: var(--font-plus-jakarta);
  --font-display: var(--font-space-grotesk);
  --font-serif: var(--font-instrument-serif);
  --font-mono: var(--font-geist-mono);
}
```
