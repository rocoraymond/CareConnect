# ADR 001: Frontend-First Presentation Prototype

## Status
**Accepted** (Phase 1)

## Context
Care Connect is envisioned as an enterprise-grade healthcare and community care platform connecting facilities, professional caregivers, students, and community volunteers. 

In early planning stages, building full-stack infrastructure (NestJS backend, PostgreSQL database schemas, Redis queues, and AWS deployment pipelines) before validating core user journeys with stakeholders introduces substantial risk:
1. Business requirements and user experience flows for distinct personas (caregivers, business owners, volunteers, students) need client review and alignment.
2. The Elderly user model is currently unresolved (whether elderly individuals interact directly, or through caregiver/family-delegated accounts).
3. Developing database schemas and backend endpoints before UI validation frequently results in premature abstractions, wasted engineering time, and costly database migrations.

## Decision
We will execute a **Frontend-First Development Phase** prior to backend construction:
1. **Focus**: Build a high-finish, interactive frontend web prototype using Next.js (App Router), TypeScript, and Tailwind CSS.
2. **Data Layer**: Structure all data as strongly-typed, realistic mock datasets isolated in `apps/web/lib/mock/`.
3. **API Boundary**: Route all UI interactions through an asynchronous service layer in `apps/web/lib/api/` that mimics future REST API calls.
4. **Backend Deferral**: Explicitly place future backend (NestJS) and infrastructure (AWS/PostgreSQL/Redis) into documented placeholder directories (`backend/README.md` and `infrastructure/README.md`) without writing premature boilerplate code.

## Consequences

### Positive
* **Client Alignment**: Stakeholders experience realistic end-to-end user journeys (discovering opportunities, applying, managing applicants, simulated messaging) and can provide concrete feedback before backend code is written.
* **Agility**: Rapid iteration on layouts, interaction patterns, and role workflows without database migration overhead.
* **Seamless Future Migration**: When the NestJS + PostgreSQL backend is ready, the UI layer will remain unmodified; only the `apps/web/lib/api/` adapter needs to swap from local mock resolvers to standard HTTP `fetch()` calls.
* **Clear Team Boundaries**: Junior/beginner team members are not overwhelmed by simultaneous frontend and full-stack DevOps complexity.

### Negative / Mitigations
* **Negative**: Prototype data does not persist across separate browser sessions.
  * *Mitigation*: In-memory and local session state will manage simulated interactive workflows during the presentation.
* **Negative**: Risk of team confusing frontend validation with security boundaries.
  * *Mitigation*: Clearly document that frontend validation is for UX clarity only; server-side validation and RBAC will be strictly enforced upon backend implementation.
