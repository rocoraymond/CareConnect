# Scope Guardrails

To ensure disciplined execution and protect the project from scope creep during the frontend presentation phase, all modules and capabilities are classified under the following strict tiers:

---

## 🟢 P0 — Required (Presentation Core)
*Must be fully functional, styled, responsive, and connected to typed mock data.*

1. **Landing / Home**: Core value proposition, persona pathways, trust indicators, featured opportunities.
2. **Auth / Demo Mode**: Sign-in & sign-up presentation UI featuring an instant **1-Click Demo Persona Switcher** (Caregiver, Business Owner, Volunteer, Student).
3. **Role-Aware Dashboard**: Dynamic dashboard adapting metrics, quick actions, and recent activity according to the active demo role.
4. **Opportunity Discovery**: Rich search and multi-facet filtering (categories, commitment type, location, facility type, compensation).
5. **Opportunity Details**: Comprehensive opportunity specification, requirements, schedule, facility overview, and clear CTA.
6. **Interactive Application Flow**: Multi-step application modal capturing applicant availability, notes, and credentials.
7. **Simulated Application Status Tracking**: Visual status tracker (Submitted, Under Review, Interview, Accepted) updating session state.
8. **Profile Management**: Profile viewer and editor displaying certifications, skills tags, availability, and contact information.

---

## 🟡 P1 — Approved Enhancements
*Optional secondary presentation flows to demonstrate extended product depth.*

1. **Facility Directory & Profiles**: Listing of senior living centers, hospices, and community hubs with verified badges and active shifts.
2. **Simulated Messaging Prototype**: Two-pane inbox with active conversation threads, unread counters, simulated sending, and empty states.
3. **Notification Flyout**: Bell icon drawer with realistic alert triggers (application updates, new message alerts, shift reminders).

---

## 🟠 P2 — Future Capabilities (Deferred to Post-Prototype)
*Strictly deferred until the frontend presentation is approved and backend implementation commences.*

1. **Admin Expansion**: Deep user moderation, suspension, platform analytics, and audit logging.
2. **Analytics Dashboards**: Complex charting, reporting, and utilization metrics.
3. **Payments & Billing**: Stripe/payment processing, automated invoice generation, premium subscriptions.
4. **AI Matching**: Machine-learning-based candidate-to-shift recommendation engines.
5. **Volunteer Certificates**: Automated PDF generation and digital hour verification credentials.
6. **Advanced Identity Verification**: Third-party automated background checks and license lookups.

---

## 🔴 OUT OF SCOPE — Do Not Build
*Forbidden during the current phase.*

* Real PostgreSQL databases, migrations, or ORMs.
* NestJS backend controllers, services, or microservices.
* AWS cloud infrastructure (RDS, Aurora, S3, CloudFront, ECS Fargate, ALB, ElastiCache Redis).
* Production Cognito user pools or production JWT verification.
* Real-time WebSocket servers.
* Native mobile application code (iOS/Android).
