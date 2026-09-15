# Cloud Infrastructure Specification

> **NOTICE**: Cloud infrastructure deployment is intentionally deferred during the frontend presentation phase.
>
> No live cloud resources, Terraform templates, or AWS CDK scripts are implemented in this phase. This document specifies the target architecture for production readiness.

---

## 1. Target AWS Cloud Topology

```text
                           [ End Users / Web Clients ]
                                       │
                                       ▼
                             [ AWS CloudFront CDN ]
                                       │
                    ┌──────────────────┴──────────────────┐
                    ▼                                     ▼
        [ Next.js Web App (ECS) ]              [ Amazon S3 Bucket ]
                    │                           (Static Assets & Docs)
                    ▼
         [ Application Load Balancer ]
                    │
                    ▼
       [ NestJS Backend (ECS / Fargate) ]
                    │
         ┌──────────┴──────────┐
         ▼                     ▼
[ Amazon RDS PostgreSQL ]  [ Amazon ElastiCache Redis ]
   (Multi-AZ Cluster)         (Session & Job Queues)
```

---

## 2. Infrastructure Components

* **Compute**: AWS ECS (Elastic Container Service) running Docker containers on AWS Fargate.
* **Database**: Amazon RDS for PostgreSQL with automated daily snapshots and Multi-AZ replication.
* **Caching & Queues**: Amazon ElastiCache for Redis handling async background jobs and rate limiting.
* **Storage**: Amazon S3 encrypted at rest via AWS KMS for care documentation, profile avatars, and verification records.
* **Edge & Delivery**: Amazon CloudFront distribution with SSL/TLS termination via AWS Certificate Manager (ACM).
* **Identity & Security**: AWS IAM roles with least-privilege policies, AWS Secrets Manager for environment secrets, and VPC private subnets for database isolation.
* **Monitoring**: Amazon CloudWatch metrics, alarms, and AWS X-Ray distributed tracing.
