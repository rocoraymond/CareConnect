# Care Connect

> **Healthcare & Community Care Connecting Platform**  
> Bridging professional caregivers, volunteers, students, and community care facilities.

---

## 1. Project Overview
Care Connect is a modern healthcare and community care platform designed to empower care facilities (senior living centers, hospices, and non-profits) to connect effortlessly with certified caregivers, student interns, and community volunteers.

---

## 2. Current Development Phase

```
┌────────────────────────────────────────────────────────┐
│ CURRENT PHASE: Frontend Presentation Prototype         │
│ - High-fidelity interactive UI & responsive design     │
│ - Typed fictional mock datasets & role switcher        │
│ - Clean API boundary ready for future REST backend     │
└────────────────────────────────────────────────────────┘
                           ↓
┌────────────────────────────────────────────────────────┐
│ FUTURE PHASE: Backend + Database Integration           │
│ - NestJS Modular Monolith + PostgreSQL (RDS/Aurora)    │
│ - AWS S3, Redis caching, and Cognito Authentication   │
└────────────────────────────────────────────────────────┘
```

> **IMPORTANT**: Backend and cloud infrastructure services are intentionally deferred during this client presentation phase. No database or real backend is required to run this prototype.

---

## 3. Technology Stack

* **Framework**: [Next.js](https://nextjs.org/) (App Router, React 19 / 18, TypeScript)
* **Styling**: [Tailwind CSS](https://tailwindcss.com/) with a custom, accessible design token palette
* **Icons**: [Lucide React](https://lucide.dev/) (consistent, accessible iconography)
* **Data Access**: Typed asynchronous service boundary simulating future REST endpoints
* **Future Backend (Planned)**: NestJS (TypeScript) + PostgreSQL

---

## 4. Quick Start & Installation

### Prerequisites
* **Node.js**: v18+ (tested on Node.js v24.19.0)
* **npm**: v9+ (tested on npm 11.17.0)

*(Note for Windows users: run CLI commands using `npm.cmd` if PowerShell script execution is restricted).*

### Installation Steps

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd CareConnect
   ```

2. **Install dependencies**:
   ```bash
   npm --prefix apps/web install
   ```

3. **Configure environment**:
   ```bash
   cp .env.example apps/web/.env.local
   ```

4. **Run the local development server**:
   ```bash
   npm run dev
   ```
   Open your browser at [http://localhost:3000](http://localhost:3000).

5. **Type checking and verification**:
   ```bash
   npm run type-check
   npm run build
   ```

---

## 5. Environment Variables

All active environment variables are public and frontend-safe. See `.env.example`:

| Variable | Description | Default Value |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_APP_NAME` | Display name of the application | `"Care Connect"` |
| `NEXT_PUBLIC_APP_DESCRIPTION` | App description | `"Healthcare & Community Care Connecting Platform"` |
| `NEXT_PUBLIC_API_BASE_URL` | Placeholder URL for future REST API | `"http://localhost:3001/api"` |
| `NEXT_PUBLIC_DEMO_MODE` | Enables instant role switcher & mock data | `true` |

*Security Warning: Never store database passwords, AWS secret keys, or private JWT secrets in `NEXT_PUBLIC_` variables.*

---

## 6. Directory Structure

```text
CareConnect/
├── README.md                          # This file
├── .gitignore                         # Git exclusion rules
├── .env.example                       # Safe frontend environment template
├── package.json                       # Monorepo root scripts
│
├── docs/                              # Project governance & specifications
│   ├── README.md                      # Documentation index
│   ├── architecture/                  # Architectural diagrams & flows
│   ├── design/                        # Design tokens & UX principles
│   ├── requirements/                  # Scopes, checklists, & deferred items
│   │   ├── scope-guardrails.md        # P0 / P1 / P2 scope boundaries
│   │   ├── client-presentation-checklist.md # Quality criteria
│   │   └── deferred.md                # Intentionally deferred features
│   └── decisions/
│       └── 001-frontend-first.md      # ADR: Why frontend is built first
│
├── apps/
│   └── web/                           # Next.js Application
│       ├── app/                       # Next.js App Router (pages & layouts)
│       ├── components/                # Reusable UI primitives & layout shells
│       │   ├── ui/                    # Buttons, Badges, Inputs, Cards, Dialogs
│       │   ├── layout/                # Navbar, Sidebar, Footer, MobileNav
│       │   └── feedback/              # EmptyState, LoadingSkeleton, Badges
│       ├── features/                  # Domain-specific components
│       ├── lib/                       # Utilities, typed mock data & API boundary
│       │   ├── api/                   # Future-proof API abstractions
│       │   ├── mock/                  # Strongly-typed fictional datasets
│       │   └── utils/                 # Classname mergers & formatting helpers
│       ├── types/                     # TypeScript domain models
│       └── styles/                    # Tailwind CSS & design tokens
│
├── backend/                           # Explicit PLACEHOLDER
│   └── README.md                      # Blueprint for future NestJS modular monolith
│
└── infrastructure/                    # Explicit PLACEHOLDER
    └── README.md                      # Blueprint for future AWS cloud infrastructure
```

---

## 7. Mock-Data Architecture

The UI does **not** hardcode data inside components. All presentation data passes through an asynchronous boundary in `apps/web/lib/api/` that queries typed mock records in `apps/web/lib/mock/`:

```
┌───────────────────────────┐
│       UI Components       │
└─────────────┬─────────────┘
              │ (React Hooks)
              ▼
┌───────────────────────────┐
│     lib/api/ Service      │  <-- Today: resolves typed mock data with simulated latency
└─────────────┬─────────────┘  <-- Future: simple fetch() call to NestJS REST API
              │
              ▼
┌───────────────────────────┐
│     lib/mock/ Datasets    │  <-- 100% fictional demo data (no real personal info)
└───────────────────────────┘
```

When backend development begins, replacing the mock adapter with real HTTP calls requires zero changes to the UI component layer.

---

## 8. Future Backend Architecture (Planned)

The approved future backend is a **NestJS Modular Monolith** interfacing with **PostgreSQL**:

* **REST API**: Clean controller endpoints mapped to frontend DTOs.
* **Database**: Amazon RDS PostgreSQL (with Aurora evaluation as scale demands).
* **Storage**: Amazon S3 for documents, credentials, and profile assets.
* **Caching & Queues**: Redis (ElastiCache) for background jobs and notification dispatch.
* *See `backend/README.md` for the full planned module listing.*

---

## 9. Implemented vs. Deferred Modules

### Current Scope (Presentation Phase)
* **P0 (Required)**: Landing Page, Auth / Demo Mode with Instant Role Switcher, Role-Aware Dashboard, Opportunity Discovery & Multi-Facet Filters, Opportunity Details, Interactive Application Flow, Simulated Application Status Tracking, Profile Management.
* **P1 (Optional Enhancements)**: Facilities Directory & Profiles, Simulated Messaging Prototype, Notification Flyout.

### Intentionally Deferred Scope (P2 / Out of Scope)
* PostgreSQL database, NestJS backend, AWS infrastructure, production Cognito auth, payment processing, real-time WebSockets, automated certificate generation, AI matchmaking algorithms.
* *Detailed log: `docs/requirements/deferred.md`.*

---

## 10. Git Workflow

* `main`: Protected presentation releases.
* `develop`: Integration branch.
* `feature/<feature-name>`: Scoped feature development.
* All commits follow conventional commit formats (`feat:`, `fix:`, `docs:`, `chore:`).
