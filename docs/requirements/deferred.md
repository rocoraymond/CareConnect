# Intentionally Deferred Functionality

This document records architectural, backend, and secondary features intentionally deferred during the **Frontend Presentation Prototype** phase.

| Item | Category | Reason for Deferral | Intended Future Implementation |
| :--- | :--- | :--- | :--- |
| **NestJS Backend Service** | Backend | Client presentation priority; API contracts are mocked via `lib/api/` | NestJS modular monolith with REST controllers |
| **PostgreSQL Database** | Database | Schema requirements pending client feedback on data models | Amazon RDS PostgreSQL (evaluated with Aurora) |
| **Elderly Direct Auth Model** | Domain Model | Open client requirement: direct login vs. family/caregiver-managed profile | Delegate access & family guardian role model |
| **AWS Cloud Infrastructure** | DevOps | Local presentation environment is sufficient for prototype review | AWS ECS/Fargate, ALB, CloudFront, Route53 via IaC |
| **Amazon S3 File Storage** | Storage | Document and profile image uploads are simulated in memory | S3 bucket with pre-signed upload URLs |
| **Redis Caching & Queues** | Infrastructure | Real-time caching and background queues not needed for prototype | Amazon ElastiCache Redis for jobs/sessions |
| **Production Authentication** | Security | Instant demo role switcher is required for seamless client demos | AWS Cognito User Pools / OAuth2 with JWT RBAC |
| **Real-time WebSockets** | Realtime | UI messaging prototype demonstrates chat layout and states | NestJS WebSockets gateway or AWS AppSync |
| **Payment & Billing Gateways** | Financial | Monetization model is not in current client presentation scope | Stripe Connect for payouts and subscriptions |
| **Automated Background Checks** | Compliance | Third-party vendor integration requires live operational accounts | Checkr / Sterling API webhook integration |
| **Volunteer Hour Certificates** | Output | PDF generation deferred until volunteer hour schema is finalized | PDFKit or headless Chromium PDF service |
| **AI Matching Engine** | Algorithm | Core matching logic to be established after data volume grows | Vector embeddings & weighted attribute matching |
| **Native Mobile Apps** | Platform | Web-first responsive prototype prioritizes immediate review | React Native / Expo sharing API boundaries |

### Review Policy
Before implementing any item listed above, the team must:
1. Complete and approve the client presentation prototype.
2. Obtain formal client approval on the specific requirement and API specification.
3. Formulate an ADR and architectural task plan before writing code.
