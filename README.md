# LeadDesk Mini

[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=for-the-badge&logo=next.js)](https://next.js.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4.0-38bdf8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

**LeadDesk Mini** is an enterprise-grade lead intelligence and pipeline triage platform engineered for modern B2B SaaS teams and high-growth agencies. It combines automated intake validation, an invisible honeypot anti-spam shield, optimistic pipeline state mutations, and a protected real-time executive admin dashboard.

---

## 🎥 Submission Assets & Video Links

- **Google Drive Submission Folder (Video Walkthrough & Candidate Resume)**: [View Submission Folder](https://drive.google.com/drive/folders/1WTmkpxyztBIIIjX0gOQDS1Cypx3XGhoP?usp=sharing)
- **Direct Asset / Video Link**: [View Direct Asset File](https://drive.google.com/file/d/1CMUvmc09P2drLbijSU4fZrpI2bg8vKOP/view?usp=sharing)

---

## 🌟 Key Features

- **Handcrafted Editorial Design System**: Hand-tailored UI built with `Space_Grotesk` display headlines, `Instrument_Serif` editorial accents, `Plus_Jakarta_Sans` UI body type, and `Geist_Mono` metrics.
- **Instant Lead Capture Engine**: Multi-field intake modal and embedded form supporting budget allocations (`$1k-$5k`, `$5k-$10k`, `$10k-$25k`, `$25k+`) and project descriptions.
- **Honeypot Anti-Spam Shield & Zod Validation**: Invisible bot traps and strict client-and-server input sanitization preventing junk data submissions.
- **Protected Admin Control Center**: Executive dashboard protected by `jose` JWT HTTP-only cookies and Next.js Edge Middleware route guards.
- **Real-Time Executive KPI Analytics**: Real-time summary cards tracking Total Inbound Leads, New Inquiries, In-Contact Deals, Closed Contracts, and Conversion Velocity.
- **Full-Text Compound Search & Triage**: MongoDB compound text index searching lead names, emails, budget tiers, and notes with zero page reloads.
- **Optimistic State Triage**: One-click status cycling (`New` → `Contacted` → `Closed`) powered by React 19 optimistic UI hooks.
- **Soft-Delete Data Audit Trail**: Safe lead archiving with `isDeleted` flags to preserve revenue analytics and audit compliance.
- **Automated Database Seeder**: One-click demo data populator generating realistic production-style lead records for evaluation.

---

## 📷 Screenshots

### Landing Page & Editorial Hero
![Landing Page](/assets/home.png)

### Lead Intake Modal & Anti-Spam Form
![Lead Capture Form](/assets/form.png)

### Protected Admin Control Center
![Executive Admin Dashboard](/assets/dashboard.png)

---

## 🛠️ Tech Stack

| Category | Technology |
| :--- | :--- |
| **Framework** | Next.js 16.2 (App Router & Server Actions) |
| **Language** | TypeScript 5.0 (Strict Mode) |
| **Database** | MongoDB Atlas & Mongoose 8 ORM |
| **Authentication** | `jose` JWT Signed HTTP-Only Cookies & Edge Middleware |
| **Validation** | Zod 3 Schema Validation |
| **Styling** | Vanilla CSS Tokens & Tailwind CSS v4 |
| **Typography** | Google Fonts (`Space_Grotesk`, `Instrument_Serif`, `Plus_Jakarta_Sans`, `Geist_Mono`) |
| **Icons** | Lucide React |
| **Password Hashing** | `bcryptjs` |

---

## 🏗️ Architecture

```
                                  +-----------------------+
                                  |    Client Browser     |
                                  +-----------+-----------+
                                              |
                                              v
                                  +-----------------------+
                                  | Edge Middleware Guard |
                                  | (Jose JWT Verification)|
                                  +-----------+-----------+
                                              |
                                              v
                                  +-----------------------+
                                  |  Next.js App Router   |
                                  | (Server Actions & API)|
                                  +-----------+-----------+
                                              |
                                              v
                                  +-----------------------+
                                  |  Mongoose ODM Layer   |
                                  |  (Connection Caching) |
                                  +-----------+-----------+
                                              |
                                              v
                                  +-----------------------+
                                  | MongoDB Atlas Cluster |
                                  +-----------------------+
```

---

## 📂 Folder Structure

```
digital-heroes/
├── docs/                        # Complete technical documentation suite
│   ├── ARCHITECTURE.md          # In-depth system architecture & request flows
│   ├── API_REFERENCE.md         # Full REST API & Server Actions reference
│   ├── DATABASE.md              # MongoDB collections, Mongoose schemas & indexes
│   └── DEPLOYMENT.md            # Step-by-step Atlas & Vercel deployment guide
├── public/                      # Static assets & icons
├── src/
│   ├── actions/                 # Next.js Server Actions (Lead & Auth mutations)
│   │   ├── auth.actions.ts      # Login & logout server actions
│   │   ├── lead.actions.ts      # Submit, status toggle & soft-delete actions
│   │   └── seed.actions.ts      # Sample database seeder action
│   ├── app/                     # Next.js 16 App Router pages & API routes
│   │   ├── (admin)/             # Protected admin route group
│   │   │   ├── admin/           # Dashboard page & metrics overview
│   │   │   └── admin/login/     # Admin authentication login page
│   │   ├── api/                 # REST API endpoints (/api/leads, /api/seed, /api/health)
│   │   ├── globals.css          # Design system tokens & utility classes
│   │   ├── layout.tsx           # Root layout with font configuration
│   │   └── page.tsx             # Public landing page
│   ├── components/              # Modular UI components
│   │   ├── admin/               # Admin Header, Lead Table, Filters & Detail Drawer
│   │   ├── landing/             # Hero, Navbar, Benefits, Features, Workflow, FAQ, Footer
│   │   └── ui/                  # Primitives (Button, Input, Select, Badge, Card, Modal, Toast)
│   ├── lib/                     # Utilities & infrastructure helpers
│   │   ├── db.ts                # Mongoose global connection caching singleton
│   │   ├── rate-limit.ts        # In-memory IP rate limiting
│   │   ├── session.ts           # Jose JWT cookie encryption & verification
│   │   └── utils.ts             # Date formatters & classname mergers
│   ├── models/                  # Mongoose data models (Lead & User)
│   ├── schemas/                 # Zod validation schemas (LeadSubmissionSchema & LoginSchema)
│   ├── types/                   # TypeScript interfaces (Lead, Auth, API responses)
│   └── middleware.ts            # Next.js Edge Middleware session protection
├── .env.local                   # Environment configuration (ignored in git)
├── next.config.ts               # Next.js configuration
├── package.json                 # Node dependencies & npm scripts
└── tsconfig.json                # Strict TypeScript configuration
```

---

## 🗄️ Data Models

### 1. `Lead` Collection (`models/Lead.ts`)

| Field | Type | Options / Enums | Description |
| :--- | :--- | :--- | :--- |
| `name` | String | Required, Trimmed | Prospect full name |
| `email` | String | Required, Trimmed, Lowercase | Work email address |
| `budget` | String | Enum: `$1k-$5k`, `$5k-$10k`, `$10k-$25k`, `$25k+` | Estimated budget tier |
| `message` | String | Required, Trimmed | Project requirements |
| `status` | String | Enum: `New`, `Contacted`, `Closed` (Default: `New`) | Pipeline triage state |
| `isDeleted` | Boolean | Default: `false` | Soft-delete audit flag |
| `createdAt` | Date | Auto Timestamp | Submission timestamp |
| `updatedAt` | Date | Auto Timestamp | Last update timestamp |

**Indexes**:
- Compound Text Index: `{ name: "text", email: "text", message: "text" }`
- Compound Filter Index: `{ isDeleted: 1, status: 1, createdAt: -1 }`

### 2. `User` Collection (`models/User.ts`)

| Field | Type | Options / Enums | Description |
| :--- | :--- | :--- | :--- |
| `name` | String | Required | Admin user full name |
| `email` | String | Required, Unique, Lowercase | Admin login email |
| `passwordHash`| String | Required | Bcrypt salted password hash |
| `role` | String | Default: `admin` | Authorization role |
| `createdAt` | Date | Auto Timestamp | Creation timestamp |

---

## 🔒 Authentication & Route Security

- **Stateless JWT Sessions**: Encrypted using `jose` (`HS256`) and stored in HTTP-only `SameSite=Lax` cookies (`leaddesk_session`).
- **Edge Middleware Protection**: Next.js Edge Middleware (`middleware.ts`) intercepts requests to `/admin` and `/api/leads`. Unauthenticated users are redirected to `/admin/login`.
- **Auto Admin Provisioning**: Automated fallback creates default admin credentials (`ADMIN_EMAIL` and `ADMIN_PASSWORD`) if no admin user exists in MongoDB.

---

## 📡 API Reference Summary

| Method | Endpoint / Action | Auth | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/leads` | Public | Submit new lead inquiry (validated by Zod & honeypot) |
| `GET` | `/api/leads` | Admin | Fetch paginated leads with text search and status filter |
| `PATCH` | `/api/leads` | Admin | Update lead status (`New` → `Contacted` → `Closed`) |
| `DELETE` | `/api/leads` | Admin | Soft-delete lead record |
| `POST` | `/api/seed` | Admin | Populate sample lead records for evaluation |
| `GET` | `/api/health` | Public | System health check & MongoDB ping |

*For complete payload specifications and JSON examples, see [docs/API_REFERENCE.md](docs/API_REFERENCE.md).*

---

## 🔑 Environment Variables

Create a `.env.local` file in the root directory:

```env
# MongoDB Atlas Connection URI
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/leaddesk_mini?retryWrites=true&w=majority

# Cryptographically Secure JWT Session Secret (256-bit)
AUTH_SECRET=9e7f4a21b38d605c1e4f82a93701d5ce6b4fa29817e0349c5d1b6e82f704a391

# Default Admin Credentials
ADMIN_EMAIL=admin@leaddesk.com
ADMIN_PASSWORD=AdminPassword123!
```

---

## 🚀 Quickstart & Local Setup

### Prerequisites
- Node.js 18.x or 20.x+
- MongoDB instance (Local MongoDB server or MongoDB Atlas cluster)

### Step 1: Clone Repository
```bash
git clone https://github.com/SarveshHardas/LeadDesk-DigitalHeroess.git
cd LeadDesk-DigitalHeroess
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Configure Environment Variables
Copy `.env.local` and configure your MongoDB URI:
```bash
cp .env.local
```

### Step 4: Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Step 5: Verify Production Build
```bash
npm run lint
npx tsc --noEmit
npm run build
npm run start
```

---

## 🌐 Production Deployment

### MongoDB Atlas Setup
1. Create a free cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a database user and whitelist network access (`0.0.0.0/0` for serverless Vercel deployment).
3. Obtain the connection string and paste it into `MONGODB_URI`.

### Vercel Deployment
1. Import the repository into your [Vercel Dashboard](https://vercel.com).
2. Add environment variables: `MONGODB_URI`, `AUTH_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`.
3. Deploy! Vercel automatically detects Next.js 16 Turbopack build scripts.

*For complete step-by-step instructions, see [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md).*

---

## 💡 Architecture & Design Decisions

1. **Why Next.js 16 App Router & Server Actions?**
   Server Actions eliminate boiler-plate REST endpoints for form submissions while offering native server-side validation and optimistic UI updates.
2. **Why MongoDB Atlas & Mongoose?**
   MongoDB's flexible schema accommodates dynamic lead intake attributes while Mongoose compound text indexes power instant multi-field search.
3. **Why `jose` Over Heavy Auth Libraries?**
   Lightweight Edge-compatible JWT encryption allows session validation directly within Next.js Edge Middleware without cold-start overhead.
4. **Why Handcrafted CSS Tokens Over Standard Tailwind Presets?**
   Ensures an Awwwards-grade visual hierarchy with bespoke surface depth, tactile borders, and custom typography.

---

## ⚖️ Engineering Tradeoffs

- **Stateless JWT Cookies vs. Redis Session Store**: JWT cookies provide zero-infrastructure stateless auth. Revocation relies on short expiration windows (7 days) rather than instant Redis blacklist lookups.
- **Soft-Delete Audit Trail vs. Hard Delete**: Retaining soft-deleted leads (`isDeleted: true`) increases storage slightly but guarantees historical pipeline revenue analytics and compliance audit trails.

---

## ⚡ Performance Optimizations

- **Server Component Rendering**: Static sections (Hero typography, Benefits, Features, Workflow) are prerendered at build time.
- **Mongoose Global Connection Pooling**: Prevents connection exhaustion in serverless environments by caching the database instance globally (`lib/db.ts`).
- **Compound Text Indexing**: Offloads search text filtering directly to MongoDB Atlas.

---

## ♿ Accessibility & Security

- **Semantic HTML5**: Full ARIA landmark compliance, headings hierarchy (`<h1>` through `<h3>`), and screen-reader label associations.
- **Keyboard Navigation**: Focus rings (`focus-visible:ring-2 focus-visible:ring-amber-500`), modal `Escape` key listeners, and focus trap management.
- **Anti-Spam Honeypot**: Hidden trap field eliminates bot form spam without frustrating human users with CAPTCHAs.
- **Strict Input Validation**: Zod schema validation sanitizes inputs on both client and server boundaries.

---

## 📝 License

This project is licensed under the [MIT License](LICENSE).

---

## 🏆 Credits

Built for **Digital Heroes Training Task** — [digitalheroesco.com](https://digitalheroesco.com).
