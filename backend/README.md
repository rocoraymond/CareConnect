# Backend Placeholder & Architecture Specification

> **NOTICE**: Backend development is intentionally deferred during the frontend presentation phase.
>
> Do not generate empty NestJS modules, database files, or migrations in this folder during the frontend prototype phase. This document serves as the architectural contract for future implementation.

---

## 1. Intended Backend Architecture

* **Framework**: [NestJS](https://nestjs.com/) (TypeScript)
* **Architecture Pattern**: Modular Monolith
* **API Style**: RESTful API with strict DTO validation (`class-validator`, `class-transformer`)
* **ORM**: Prisma or TypeORM
* **Database**: PostgreSQL (Amazon RDS / Aurora)
* **Cache & Job Queues**: Redis (BullMQ) for async tasks and notifications
* **Authentication**: AWS Cognito / JWT with role-based guard middleware

---

## 2. Planned Backend Modules

When backend implementation begins, the NestJS monolith will be organized into the following bounded modules:

```text
backend/src/modules/
├── auth/                 # Authentication, JWT issuance, password hashing
├── users/                # Core user identity management
├── roles/                # Role-based access control (RBAC) permissions
├── businesses/           # Business entities & company profiles
├── facilities/           # Physical care facilities, addresses, compliance status
├── caregivers/           # Caregiver profiles, certifications, licenses
├── students/             # Student profiles, university affiliations
├── volunteers/           # Volunteer profiles, interests, availability
├── elderly/              # Care recipient profiles (supports delegated/guardian access)
├── opportunities/        # Opportunity postings, shifts, schedules, criteria
├── applications/         # Application lifecycle, status state machine
├── messaging/            # Direct messaging threads, chat history
├── volunteer-hours/      # Verified hours tracking & credit logs
├── notifications/        # User alert preferences & dispatch service
├── verification/         # Credential checks, license verification workflows
├── moderation/           # Content flagging, report resolution
├── reports/              # Compliance and platform usage reports
├── admin/                # Platform governance and operational tools
├── files/                # S3 pre-signed upload URLs and asset management
├── analytics/            # Utilization tracking and reporting metrics
└── common/               # Shared filters, interceptors, decorators, and DTOs
```

---

## 3. Frontend-to-Backend Interface Contract

The web application interfaces with the future backend through contracts defined in:
`apps/web/lib/api/`

All endpoints will follow standard REST conventions:

| Route | Method | Purpose |
| :--- | :--- | :--- |
| `/api/v1/auth/login` | `POST` | Authenticate user & return session |
| `/api/v1/opportunities` | `GET` | List opportunities with filter query parameters |
| `/api/v1/opportunities/:id` | `GET` | Retrieve opportunity details |
| `/api/v1/opportunities` | `POST` | Create new opportunity (Business Owner) |
| `/api/v1/applications` | `GET` | List applications for current user / facility |
| `/api/v1/applications` | `POST` | Submit application for opportunity |
| `/api/v1/applications/:id` | `PATCH` | Update application status |
| `/api/v1/facilities` | `GET` | List verified care facilities |
| `/api/v1/messages/threads` | `GET` | List conversation threads |
| `/api/v1/messages/threads/:id` | `GET` | Retrieve conversation message history |
| `/api/v1/messages` | `POST` | Send message in thread |
