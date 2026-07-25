# LeadDesk Mini - High-Conversion Lead Intelligence CRM

> Production-Grade SaaS CRM and Lead Management Engine built for the **Digital Heroes Qualification Task**.

LeadDesk Mini is a full-stack, production-quality SaaS CRM application built with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS v4**, **React 19**, and **MongoDB Atlas** via **Mongoose**.

---

## 🌟 Key Features

- **High-Conversion Landing Page**: Modern dark mode glassmorphism UI, interactive live app preview, hero section, benefits grid, workflow timeline, testimonials, and accessible FAQ accordion.
- **Lead Capture & Anti-Spam Shield**:
  - Client-side Zod validation with instantaneous inline error messages.
  - Server-side Zod schema validation & email rate limiting.
  - Invisible **honeypot field** (`website`) to detect and reject bot submissions silently.
  - Duplicate intake throttling (prevents multiple submissions from the same email address within 24 hours).
- **Admin Lead Management Panel**:
  - Protected route at `/admin` guarded by Next.js edge middleware and HTTP-only JWT session cookies.
  - Executive KPI summary cards (Total Leads, New, Contacted, Closed Deals, and Conversion Rate %).
  - Real-time multi-field full-text search across lead names, emails, and inquiry messages.
  - Status filter tabs (`All`, `New`, `Contacted`, `Closed`).
  - **Optimistic UI Updates**: Status toggles update UI instantly with zero page reloads.
  - Lead Detail Modal Drawer for viewing full message context and inline status mutation.
  - Soft-delete support for archiving leads safely.
  - **Automated Database Seeder**: One-click demo data population inserting 8-10 realistic leads for rapid evaluation.

---

## 🏗️ Technical Architecture & Folder Structure

```
digital-heroes/
├── src/
│   ├── actions/             # Server Actions
│   │   ├── auth.actions.ts   # Login, Logout, Session verification
│   │   ├── lead.actions.ts   # Intake submission, status toggle, search, soft delete
│   │   └── seed.actions.ts   # Automated database seeding utility
│   ├── app/                 # Next.js App Router
│   │   ├── (admin)/admin/   # Protected Admin Dashboard & Login routes
│   │   ├── api/             # REST API Handlers (/api/leads, /api/seed, /api/health)
│   │   ├── globals.css      # Design tokens, glassmorphism, 8pt spacing system
│   │   ├── layout.tsx       # Root layout with accessibility & SEO metadata
│   │   ├── page.tsx         # High-conversion Landing Page
│   │   ├── error.tsx        # Global Error Boundary
│   │   ├── loading.tsx      # Suspense Loading Skeletons
│   │   └── not-found.tsx    # Custom 404 page
│   ├── components/          # React Components
│   │   ├── admin/           # AdminHeader, MetricsCards, LeadFilters, LeadTable, LeadDetailModal
│   │   ├── landing/         # Navbar, Hero, Benefits, Features, Workflow, Testimonials, FAQ, Footer
│   │   └── ui/              # Button, Input, Select, Badge, Card, Modal, Toast, Skeleton
│   ├── hooks/               # Custom hooks (useDebounce, useToast)
│   ├── lib/                 # Utilities
│   │   ├── db.ts            # Mongoose singleton connection pool builder
│   │   ├── rate-limit.ts    # In-memory IP/Email submission rate limiter
│   │   ├── session.ts       # Jose JWT session encryption & cookie manager
│   │   └── utils.ts         # Class merging & formatters
│   ├── models/              # Mongoose MongoDB Schemas
│   │   ├── Lead.ts          # Lead schema with text & compound indexes
│   │   └── User.ts          # Admin user schema
│   ├── schemas/             # Zod validation schemas
│   │   ├── auth.schema.ts
│   │   └── lead.schema.ts
│   ├── types/               # Strict TypeScript definitions
│   │   ├── api.ts
│   │   ├── auth.ts
│   │   └── lead.ts
│   └── middleware.ts        # Next.js Edge Authorization Middleware
└── next.config.ts           # Performance & Security Config
```

---

## 🗄️ Data Model (MongoDB / Mongoose)

### `Lead` Schema
| Field | Type | Options | Description |
| :--- | :--- | :--- | :--- |
| `_id` | `ObjectId` | Auto | Primary Key |
| `name` | `String` | Required, Trim, 2-100 chars | Lead full name |
| `email` | `String` | Required, Trim, Lowercase, Indexed | Contact email address |
| `budget` | `String` | Enum (`$1k-$5k`, `$5k-$10k`, `$10k-$25k`, `$25k+`) | Budget range |
| `message` | `String` | Required, Trim, 10-1000 chars | Project context |
| `status` | `String` | Enum (`New`, `Contacted`, `Closed`), Index | Pipeline status |
| `isDeleted` | `Boolean` | Default: `false`, Index | Soft delete flag |
| `createdAt` | `Date` | Timestamp, Index | Submission date |
| `updatedAt` | `Date` | Timestamp | Last modified date |

**Indexes**:
- Compound Index: `{ status: 1, isDeleted: 1, createdAt: -1 }`
- Full-Text Search Index: `{ name: "text", email: "text", message: "text" }`

---

## 🔑 Authentication & Route Protection

- **Session Security**: Authenticated sessions are encoded using **`jose` HS256 JWT tokens** stored in HTTP-only, SameSite: lax cookies.
- **Middleware Guard**: `middleware.ts` intercepts all requests to `/admin` routes. Unauthenticated requests are automatically redirected to `/admin/login`.
- **Default Evaluator Admin Credentials**:
  - **Email**: `admin@leaddesk.com`
  - **Password**: `AdminPassword123!`
  - *(The login page features a 1-click Auto-Fill button for evaluator convenience).*

---

## 🚀 Quick Start & Local Setup

### 1. Environment Variables
Create a `.env.local` file in the root directory:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/leaddesk_mini
AUTH_SECRET=your_super_secret_jwt_encryption_key_here
ADMIN_EMAIL=admin@leaddesk.com
ADMIN_PASSWORD=AdminPassword123!
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Seed Demo Data
Log into the Admin Portal at `/admin/login` and click **"Seed Sample Leads"** (or click the seed button directly in the table empty state).

---

## 📡 REST API Documentation

### `POST /api/leads`
Submit a new lead record via REST.
```json
{
  "name": "Jane Doe",
  "email": "jane@company.com",
  "budget": "$10k-$25k",
  "message": "Interested in custom CRM implementation."
}
```

### `GET /api/leads?search=jane&status=New&page=1&limit=10`
Query paginated leads list with optional filters.

### `POST /api/seed`
Trigger database seeder programmatically.

### `GET /api/health`
Health check endpoint returning database connectivity status.

---

## 🎨 Design Decisions & Tradeoffs

1. **NoSQL MongoDB over SQL**: MongoDB was chosen to align with the prompt requirements. Mongoose schemas were built with strict field validation and compound indexes to provide SQL-like data safety while preserving NoSQL query speed.
2. **Optimistic Updates**: Lead status toggles use React's `useOptimistic` hook, giving admins an instant feedback experience without waiting for network roundtrips.
3. **Custom Glassmorphism Design System**: Built with CSS variables and Tailwind CSS v4, eschewing generic templates to deliver a high-converting, state-of-the-art visual aesthetic.

---

## 📄 Task Attribution

Built for **[Digital Heroes Training Task](https://digitalheroesco.com)**.
