---
id: ADR-0008
category: deployment_target
title: "Deployment target: AWS, serverless, single region (region not yet named):\
  \ Web App as static assets\u2026"
status: accepted
superseded_by: null
component_id: null
decision: 'AWS, serverless, single region (region not yet named): Web App as static
  assets behind a CDN, Catalogue API on serverless functions, Catalogue Store as an
  AWS-managed service; prod and staging environments.'
evidence: 'User: "AWS, serverless, single region"'
contested: true
alternatives_considered:
- 'GCP with containers: not chosen by the user'
- 'Static host plus managed backend with no cloud preference: not chosen by the user'
consequences:
- Catalogue Store product should be an AWS-managed service
- Specific AWS region and budget still to be confirmed
---

## Context

User: "AWS, serverless, single region"

## Decision

AWS, serverless, single region (region not yet named): Web App as static assets behind a CDN, Catalogue API on serverless functions, Catalogue Store as an AWS-managed service; prod and staging environments.

## Alternatives considered

- GCP with containers: not chosen by the user
- Static host plus managed backend with no cloud preference: not chosen by the user

## Consequences

- Catalogue Store product should be an AWS-managed service
- Specific AWS region and budget still to be confirmed
