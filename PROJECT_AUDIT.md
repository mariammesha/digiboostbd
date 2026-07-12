# DigiBoost BD — Project Audit Report

> **Generated:** 2026-07-12
> **Scope:** Full read-only codebase audit
> **Author:** Antigravity (AI assistant)
> **Purpose:** Documentation only — no files were modified.

---

## 1. Project Structure

```
digiboostbd/
├── .env.local                  # Local secrets (gitignored)
├── .env.local.example          # Template documenting required env vars
├── .eslintrc.json              # ESLint config (extends next/core-web-vitals + prettier)
├── .prettierrc                 # Prettier code formatting config
├── debug.js                    # One-off debug/utility script (not part of the app)
├── docker-compose.yml          # Postgres container for local development
├── next-env.d.ts               # Auto-generated Next.js TS declarations
├── next.config.mjs             # Next.js config (minimal)
├── package.json                # Dependencies and npm scripts
├── postcss.config.mjs          # PostCSS config (for Tailwind)
├── tailwind.config.ts          # Tailwind theme with custom brand tokens
├── tsconfig.json               # TypeScript config
│
├── prisma/                     # Database layer — schema, migrations, seed
│   ├── schema.prisma           # Single source of truth for all DB models
│   ├── seed.ts                 # Creates the initial admin user + SiteSettings row
│   └── migrations/             # Prisma migration history
│
├── public/                     # Static assets served at the root URL
│   └── reports/                # Uploaded client PDF reports are saved here at runtime
│
└── src/
    ├── middleware.ts            # Edge middleware: enforces authentication and admin role guard
    ├── app/                    # Next.js App Router — all pages and API routes
    │   ├── layout.tsx           # Root layout: wraps every page with Navbar, Footer, WhatsApp btn
    │   ├── page.tsx             # Home page (marketing landing)
    │   ├── globals.css          # Global base styles
    │   ├── error.tsx            # Global error boundary component
    │   ├── fonts/               # Self-hosted or imported fonts
    │   ├── about/               # /about — About Us marketing page
    │   ├── contact/             # /contact — Contact Us marketing page
    │   ├── pricing/             # /pricing — Pricing tiers marketing page
    │   ├── services/            # /services — Services detail marketing page
    │   ├── free-audit/          # /free-audit — Lead capture form (client-side only, no backend)
    │   ├── (auth)/              # Route group: auth pages and client dashboard (no public Navbar)
    │   │   ├── layout.tsx       # Isolated layout (hides marketing Navbar/Footer)
    │   │   ├── login/           # /login — Credential sign-in form
    │   │   ├── signup/          # /signup — New client registration form
    │   │   └── dashboard/       # /dashboard — Authenticated client portal
    │   │       ├── page.tsx
    │   │       ├── dashboard.css
    │   │       ├── SignOutButton.tsx
    │   │       └── reports/     # /dashboard/reports — Client PDF report viewer
    │   ├── admin/               # /admin — Internal admin panel (ADMIN role only)
    │   │   ├── layout.tsx       # Admin sidebar layout
    │   │   ├── page.tsx         # /admin — Overview stats dashboard
    │   │   ├── actions.ts       # Server Actions: markInvoicePaid, createReport
    │   │   ├── clients/         # /admin/clients — Client list and detail views
    │   │   │   ├── page.tsx     # Client list table
    │   │   │   └── [id]/        # /admin/clients/:id — Single client management
    │   │   │       ├── page.tsx
    │   │   │       └── ReportUploadForm.tsx
    │   │   └── settings/        # /admin/settings — Site-wide settings editor
    │   └── api/                 # Next.js Route Handlers (REST API endpoints)
    │       ├── auth/
    │       │   ├── [...nextauth]/route.ts  # NextAuth catch-all handler
    │       │   └── signup/route.ts         # POST /api/auth/signup
    │       └── reports/
    │           └── upload/route.ts         # POST /api/reports/upload
    ├── components/              # Shared UI components used across pages
    │   ├── index.ts             # Barrel export
    │   ├── Navbar.tsx           # Public marketing navigation bar
    │   ├── Footer.tsx           # Public marketing footer
    │   ├── WhatsAppButton.tsx   # Floating WhatsApp CTA button
    │   └── NextAuthProvider.tsx # Client-side SessionProvider wrapper
    ├── lib/                     # Shared server-side utilities
    │   ├── auth.ts              # NextAuth configuration (authOptions)
    │   ├── prisma.ts            # Singleton Prisma client instance
    │   └── utils.ts             # Utility helpers (cn() class name joiner)
    └── types/                   # TypeScript type augmentations
        ├── index.ts
        └── next-auth.d.ts       # Extends Session/JWT to carry id and role fields
```

---

## 2. Routes / Pages

| URL Path | Access | Description | Key Components and Data |
|---|---|---|---|
| / | **Public** | Marketing home page. Hero section, services grid, value proposition, CTA to free audit. | Navbar, Footer, WhatsAppButton; no DB calls |
| /about | **Public** | About Us page. Brand story, values, and static team profiles (Rafiq, Nadia, Karim). | Navbar, Footer; static data only |
| /services | **Public** | Detailed breakdown of all 6 services offered (Social Media, Ads, SEO, Content, Email, Website). | Navbar, Footer; static data only |
| /pricing | **Public** | Three pricing tiers (Basic BDT 5K, Standard BDT 10K, Premium BDT 20K) with feature lists and FAQ. | Navbar, Footer; static data only — all CTAs link to /free-audit |
| /contact | **Public** | Contact details (phone, WhatsApp, email, office address). No contact form — links out to WhatsApp. | Navbar, Footer; static data only |
| /free-audit | **Public** | Lead-capture form collecting business name, owner name, phone, business type, and marketing challenge. **Form submission is client-side only (fake timeout) — data is never sent anywhere.** | Navbar, Footer; no API call on submit |
| /login | **Public** (redirects if already authed) | Credential sign-in form. On success, fetches /api/auth/session to check role and redirects to /dashboard (CLIENT) or /admin (ADMIN). | signIn() from next-auth/react |
| /signup | **Public** | New client registration. Collects name, phone, business name, email, password. Calls POST /api/auth/signup, then auto-signs in and redirects to /dashboard. | fetch('/api/auth/signup'), signIn() |
| /dashboard | **Client-only** (middleware + server redirect) | Client overview portal. Displays: welcome greeting, current package tier badge, email, phone, member-since date, and a link to the Reports tab with report count. | Reads Client + User + Report[] from DB via getServerSession + Prisma |
| /dashboard/reports | **Client-only** | Lists all PDF reports uploaded for this client. Each card shows title, upload date, and a View/Download link. Redirects ADMIN users to /admin. | Reads Report[] filtered by client.id; links to public/reports/ files |
| /admin | **Admin-only** (middleware) | Admin overview dashboard. Shows total client count, total paid revenue (sum of paid invoices), and clients grouped by package tier. | Reads Client.count(), Invoice.aggregate(), Client.groupBy() |
| /admin/clients | **Admin-only** | Table of all clients: business name, contact, tier, invoice/report count, and link to detail view. | Reads all Client records including User, _count.invoices, _count.reports |
| /admin/clients/[id] | **Admin-only** | Full client detail page. Contact info, uploaded reports list, upload form, invoice list with Mark as Paid buttons. | Reads one Client with User, Invoice[], Report[]; Server Action markInvoicePaid; uses ReportUploadForm |
| /admin/settings | **Admin-only** | Site-wide settings editor: WhatsApp number, contact email, contact address, accent colour. Saves to SiteSettings singleton row. Calls revalidatePath('/','layout') on save. | Reads/writes SiteSettings; inline Server Action updateSettings |

---

## 3. API Routes

### GET|POST /api/auth/[...nextauth]

| Field | Detail |
|---|---|
| **File** | src/app/api/auth/[...nextauth]/route.ts |
| **What it does** | NextAuth catch-all handler. Handles sign-in, sign-out, session fetching (GET /api/auth/session), and CSRF token management. |
| **DB access** | Reads User table via prisma.user.findUnique() inside the authorize callback in lib/auth.ts. |
| **Auth check** | None — this is the auth endpoint itself. |

### POST /api/auth/signup

| Field | Detail |
|---|---|
| **File** | src/app/api/auth/signup/route.ts |
| **What it does** | Creates a new client account. Validates all fields, checks for duplicate email, hashes password with bcryptjs (cost factor 12), then creates a User and a linked Client record in a single Prisma transaction. Always assigns role: 'CLIENT' and packageTier: 'BASIC'. |
| **DB writes** | User.create() + Client.create() inside prisma.(). |
| **Auth check** | None — this endpoint is public (anyone can self-register). |

### POST /api/reports/upload

| Field | Detail |
|---|---|
| **File** | src/app/api/reports/upload/route.ts |
| **What it does** | Accepts a multipart form upload with clientId, title, and a PDF file. Validates: caller is ADMIN, file is a PDF, file is 20 MB or less, and clientId exists. Saves the file to public/reports/<uuid>.pdf on disk using Node.js fs/promises.writeFile. Creates a Report DB record. |
| **DB reads** | Client.findUnique({ where: { id: clientId } }) to verify client existence. |
| **DB writes** | Report.create({ clientId, title, fileUrl }). |
| **Auth check** | getServerSession(authOptions) — rejects with 401 unless session.user.role === 'ADMIN'. |

> **WARNING:** Files are stored on the local filesystem under public/reports/. This is incompatible with serverless or ephemeral hosting environments (Vercel, Railway). A cloud storage solution (S3, Cloudflare R2, Supabase Storage) is required before production deployment.

---

## 4. Database Schema

Database: **PostgreSQL**, managed via **Prisma ORM**.

### enum Role
Values: CLIENT | ADMIN. Assigned to every User. Controls access: CLIENTs access /dashboard, ADMINs access /admin.

### enum PackageTier
Values: BASIC | STANDARD | PREMIUM. Represents which service tier a client is subscribed to. Defaults to BASIC on signup.

### model User
Represents a login account. Both client users and admin users have a User row.

| Field | Type | Notes |
|---|---|---|
| id | String (cuid) | Primary key |
| name | String | Full name |
| email | String | Unique — used for login |
| passwordHash | String | bcryptjs hash (cost 12) |
| role | Role | CLIENT (default) or ADMIN |
| createdAt | DateTime | Auto-set on creation |
| client | Client? (relation) | Optional 1-to-1 — only CLIENT users have a linked Client record |

### model Client
Represents a business customer of DigiBoost BD. Every Client is linked 1-to-1 with a User for authentication.

| Field | Type | Notes |
|---|---|---|
| id | String (cuid) | Primary key |
| userId | String | Unique FK to User.id (cascade delete) |
| businessName | String | The client's business name |
| phone | String | Contact phone number |
| packageTier | PackageTier | BASIC (default), STANDARD, or PREMIUM |
| createdAt | DateTime | Auto-set on creation |
| user | User (relation) | Parent user account |
| invoices | Invoice[] (relation) | All invoices for this client |
| reports | Report[] (relation) | All PDF reports for this client |

### model Package
Stores package definitions (name, price, description). Currently **not linked to any other model** and is never queried in any codebase file. The Client model stores its tier via the PackageTier enum, not via a FK to Package. This model appears to be a placeholder for future dynamic pricing logic.

| Field | Type | Notes |
|---|---|---|
| id | String (cuid) | Primary key |
| name | String | e.g. Basic, Standard |
| monthlyFeeBDT | Float | Price in Bangladeshi Taka |
| description | String | |

### model Invoice
Represents a monthly billing record for a client. Admins can mark invoices as paid from the client detail page.

| Field | Type | Notes |
|---|---|---|
| id | String (cuid) | Primary key |
| clientId | String | FK to Client.id (cascade delete) |
| amountBDT | Float | Invoice amount in BDT |
| isPaid | Boolean | Defaults to false |
| createdAt | DateTime | Auto-set on creation |
| client | Client (relation) | Owning client |

> **NOTE:** There is no API route or UI to *create* invoices. Only marking as paid is implemented. Invoice creation is a future feature.

### model Report
Represents a PDF marketing performance report uploaded by an admin for a specific client.

| Field | Type | Notes |
|---|---|---|
| id | String (cuid) | Primary key |
| clientId | String | FK to Client.id (cascade delete) |
| title | String | e.g. July SEO Audit |
| fileUrl | String | Relative URL e.g. /reports/<uuid>.pdf (served from public/reports/) |
| createdAt | DateTime | Auto-set on creation |
| client | Client (relation) | Owning client |

### model SiteSettings
A singleton configuration record (always id = singleton). Controls site-wide settings editable by the admin without a code deploy.

| Field | Type | Notes |
|---|---|---|
| id | String | PK — always singleton |
| whatsappNumber | String | Shown in Footer and WhatsApp button (default: 8801700000000) |
| contactEmail | String | Shown in Footer (default: hello@digiboostbd.com) |
| contactAddress | String | Shown in Footer (default: Dhaka, Bangladesh) |
| accentColor | String | One of orange, blue, green, purple — injected as CSS variable on body |
| updatedAt | DateTime | Auto-updated by Prisma on every write |

---

## 5. Auth and Roles

### How Authentication Works

Authentication uses **NextAuth v4** with the **Credentials provider** and **JWT sessions** (no database sessions table).

**Sign-in flow:**
1. User submits email + password on /login, or is auto-signed in after /signup.
2. The uthorize() callback in lib/auth.ts is called:
   - Looks up the user by email via prisma.user.findUnique().
   - Compares the submitted password against passwordHash using cryptjs.compare().
   - Returns { id, name, email, role } on success; throws a descriptive error on failure.
3. The jwt callback copies user.id and user.role into the JWT token on first sign-in.
4. The session callback copies 	oken.id and 	oken.role into the session object on every request.
5. TypeScript augmentations in 	ypes/next-auth.d.ts ensure session.user.id and session.user.role are fully typed across the codebase.

The custom sign-in page is configured as /login (overriding the NextAuth default /api/auth/signin).

### Role Check — CLIENT vs ADMIN

| Layer | Mechanism |
|---|---|
| **Edge Middleware** (src/middleware.ts) | withAuth from next-auth/middleware. The authorized callback returns !!token — any authenticated user passes the login gate. The custom middleware function additionally checks token.role === 'ADMIN' for any path under /admin. Non-admins hitting /admin are redirected to /dashboard. |
| **Middleware matcher** | ['/dashboard', '/dashboard/:path*', '/admin', '/admin/:path*'] — all other paths are unprotected. |
| **Server Components** | dashboard/page.tsx and dashboard/reports/page.tsx call getServerSession(authOptions) and redirect to /login if no session. dashboard/reports/page.tsx also redirects ADMIN users to /admin. |
| **Server Actions** (admin/actions.ts) | requireAdmin() helper calls getServerSession() and throws 'Unauthorized' if role !== 'ADMIN'. Called by markInvoicePaid() and createReport(). |
| **API Route** (api/reports/upload/route.ts) | Calls getServerSession(authOptions) and returns 401 if role !== 'ADMIN'. |
| **Admin layout** (admin/layout.tsx) | Does NOT independently check the session — relies entirely on middleware. |

### Files Enforcing Route Protection

| File | Type | What It Enforces |
|---|---|---|
| src/middleware.ts | Edge Middleware | Login required for /dashboard and /admin; ADMIN role required for /admin |
| src/app/(auth)/dashboard/page.tsx | Server Component | Redirects to /login if no session or no client record found |
| src/app/(auth)/dashboard/reports/page.tsx | Server Component | Redirects to /login if unauthenticated; redirects ADMIN to /admin |
| src/app/admin/actions.ts | Server Actions | Throws if caller is not ADMIN |
| src/app/api/reports/upload/route.ts | API Route Handler | Returns 401 if caller is not ADMIN |

---

## 6. Components

### Shared / Reusable Components (src/components/)

| Component | File | Where Used | What It Does |
|---|---|---|---|
| Navbar | src/components/Navbar.tsx | app/layout.tsx (root layout) — present on all public pages | Sticky top nav with logo, links (Services, Pricing, About, Contact), session-aware CTA (Login/Sign Up when logged out; Dashboard/Admin Panel/Logout when logged in), and a hamburger menu for mobile. Uses useSession() from next-auth/react. |
| Footer | src/components/Footer.tsx | app/layout.tsx (root layout) | Three-column footer with brand copy, services links, quick links, and dynamic contact details (phone, email, address) passed as props from the root layout (which reads from SiteSettings). |
| WhatsAppButton | src/components/WhatsAppButton.tsx | app/layout.tsx (root layout) | Fixed floating action button (bottom-right). Opens a WhatsApp wa.me link with a pre-filled greeting message. Phone number is passed as a prop from the root layout. |
| NextAuthProvider | src/components/NextAuthProvider.tsx | app/layout.tsx (root layout) | Thin wrapper around NextAuth's SessionProvider. Required so that useSession() works inside any client component in the tree. |

### Co-located Page Components

| Component | File | Where Used | What It Does |
|---|---|---|---|
| SignOutButton | src/app/(auth)/dashboard/SignOutButton.tsx | dashboard/page.tsx, dashboard/reports/page.tsx, admin/layout.tsx | Client component button that calls signOut({ callbackUrl: '/' }). Shared between the client dashboard and the admin layout. |
| ReportUploadForm | src/app/admin/clients/[id]/ReportUploadForm.tsx | admin/clients/[id]/page.tsx | Client component form for uploading a PDF report. POSTs to /api/reports/upload with multipart form data. Shows uploading/success/error states. Calls router.refresh() on success. |

---

## 7. Environment Variables

All variables are read from .env.local. See .env.local.example for the template.

| Variable | Used In | Purpose |
|---|---|---|
| DATABASE_URL | prisma/schema.prisma, Prisma client | PostgreSQL connection string. Format: postgresql://USER:PASSWORD@HOST:PORT/DB?schema=public |
| NEXTAUTH_SECRET | NextAuth (automatic) | Secret used to sign and verify JWT tokens and CSRF tokens. Must be a cryptographically random string (32+ bytes). |
| NEXTAUTH_URL | NextAuth (automatic) | Canonical base URL of the application e.g. http://localhost:3000. Required in production. |
| BKASH_API_KEY | .env.local.example only | Placeholder for future bKash payment gateway integration. Not consumed by any code yet. |
| NAGAD_API_KEY | .env.local.example only | Placeholder for future Nagad payment gateway integration. Not consumed by any code yet. |
| ADMIN_EMAIL | prisma/seed.ts | Email address for the initial admin account created during npm run seed. |
| ADMIN_PASSWORD | prisma/seed.ts | Password for the initial admin account. Used only during seeding — hashed with bcryptjs before storage. |

---

## 8. Known Gaps / TODOs

### Critical Gaps

| # | File | Line | Issue |
|---|---|---|---|
| 1 | src/app/free-audit/page.tsx | 54-58 | **Free Audit form has no backend.** Submission is faked with a setTimeout. Comment reads: Simulate async submission — no backend yet. Form data is never sent anywhere — no email notification, no database record, no webhook. |
| 2 | src/app/api/reports/upload/route.ts | 48-49 | **Reports stored on local filesystem** (public/reports/). This is incompatible with serverless or ephemeral deployment environments (Vercel, Railway). A cloud storage provider (AWS S3, Cloudflare R2, Supabase Storage) is required before production deployment. |

### Missing Features / Incomplete Logic

| # | File | Line | Issue |
|---|---|---|---|
| 3 | prisma/schema.prisma | 52-57 | **Package model is orphaned.** It exists in the schema with no foreign key relationships and is never queried anywhere. Client.packageTier stores a plain enum value, not a FK to Package. The model appears to be a placeholder for a future dynamic pricing feature. |
| 4 | Entire codebase | — | **No invoice creation UI or API.** The Invoice model and Mark as Paid action exist, but there is no way to create invoices through the app. Invoices must be inserted manually (Prisma Studio) or via a future admin UI. |
| 5 | src/app/(auth)/dashboard/page.tsx | 144 | **Coming soon in Phase 4** placeholder text is visible to real clients inside the Member Since card: More features and reports coming soon in Phase 4. |
| 6 | src/app/free-audit/page.tsx | 6 | **Missing metadata file.** Comment says See: src/app/free-audit/metadata.ts but this file does not exist. The page is a 'use client' component and cannot export metadata directly — the referenced companion file was never created. |

### Placeholder / Hardcoded Data

| # | File | Line | Issue |
|---|---|---|---|
| 7 | src/app/contact/page.tsx | 14-15 | Phone number (+880 1700-000000) and WhatsApp link (wa.me/8801700000000) are hardcoded in the contactDetails array. The Footer and WhatsApp button correctly read from SiteSettings but this page does not. |
| 8 | src/app/contact/page.tsx | 44, 151-154 | Google Maps link is a generic https://maps.google.com placeholder, not a real link to the Banani, Dhaka office location. |
| 9 | src/components/Footer.tsx | 50, 58 | Social media links are https://facebook.com and https://instagram.com (homepage roots), not real DigiBoost BD page URLs. |
| 10 | src/app/about/page.tsx | 33-52 | Team members are fictitious placeholders (Rafiq Hossain, Nadia Akter, Karim Uddin) with initials-only avatars and no real photos. |
| 11 | src/app/page.tsx | 43-48 | Stats are hardcoded (200+ SMEs Helped, 2Cr+ Ad Spend Managed, 40% Avg. Lead Increase). These are not pulled from the database. |
| 12 | .env.local.example | 17-18 | Admin credentials are stored in the example env file in plaintext. The ADMIN_EMAIL and ADMIN_PASSWORD values should be rotated and not stored in any version-controlled file, even as examples. |

### Minor / Style Notes

| # | File | Line | Issue |
|---|---|---|---|
| 13 | src/app/(auth)/login/page.tsx | 116 | Uses styled-jsx (style jsx) for page-level CSS — inconsistent with the rest of the codebase which uses Tailwind utilities and separate .css files. |
| 14 | src/app/(auth)/signup/page.tsx | 187 | Same as #13 — styled-jsx used for all auth form styles instead of Tailwind or a shared CSS file. |
| 15 | src/app/(auth)/dashboard/SignOutButton.tsx | 13 | styled-jsx inside the SignOutButton component — same consistency issue. |
| 16 | src/app/admin/layout.tsx | — | Admin layout does not independently verify the session. It relies entirely on middleware. A secondary getServerSession check in the layout would add defence-in-depth if middleware is ever misconfigured. |

---

## 9. Dependencies

### Runtime Dependencies

| Package | Version | Purpose |
|---|---|---|
| next | ^14.2.35 | Core framework — App Router, Server Components, Route Handlers, Server Actions |
| react / react-dom | ^18 | React 18 with concurrent features |
| next-auth | ^4.24.14 | Authentication — Credentials provider, JWT sessions, middleware helper |
| @prisma/client | ^6.19.3 | Generated Prisma ORM client for PostgreSQL |
| bcryptjs | ^3.0.3 | Password hashing (pure JS implementation, no native dependency) |

### Development Dependencies

| Package | Version | Purpose |
|---|---|---|
| prisma | 6.19.3 | Prisma CLI — schema management, migrations, Prisma Studio |
| tailwindcss | ^3.4.1 | Utility-first CSS framework (custom brand design system via tailwind.config.ts) |
| typescript | ^5 | TypeScript compiler |
| tsx | ^4.23.0 | TypeScript script runner — used to execute prisma/seed.ts |
| puppeteer | ^25.3.0 | Headless browser — present in devDependencies but NOT referenced anywhere in the current source code. Likely a legacy or planned dependency (e.g., for future PDF report generation). |
| prettier | ^3 | Code formatter |
| eslint / eslint-config-next | ^8 / 14.2.35 | Linting — Next.js recommended rules + prettier integration |
| @types/bcryptjs | ^2.4.6 | TypeScript types for bcryptjs |

### Notable npm Scripts

| Script | Command | Use |
|---|---|---|
| dev | next dev | Start local development server |
| build | next build | Production build |
| db:generate | prisma generate | Regenerate Prisma client after schema changes |
| db:migrate | prisma migrate dev | Apply schema migrations in development |
| db:studio | prisma studio | Open Prisma Studio (database GUI) |
| seed | prisma db seed -> npx tsx prisma/seed.ts | Create initial admin user and SiteSettings row |

---

*End of audit. This document is read-only — no source files were modified during its generation.*
