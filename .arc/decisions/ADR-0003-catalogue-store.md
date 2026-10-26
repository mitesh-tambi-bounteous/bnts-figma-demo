---
id: ADR-0003
category: component
title: Catalogue Store
status: accepted
superseded_by: null
component_id: comp_catalogue_store
responsibility: Managed relational database storing the menu catalogue and promo values,
  editable outside the site (no admin screen) without a rebuild. Specific engine/product
  (e.g. on AWS) not yet named.
kind: managed_service
serves:
- FD-EPIC-011
split_reason: FD-EPIC-011 requires a stored catalogue editable without rebuild; data-ownership
  boundary separate from the API.
evidence: 'User: "Managed relational database"'
contested: true
alternatives_considered:
- 'Managed document/NoSQL store: not chosen by the user'
- 'JSON/config file in object storage: not chosen by the user'
- 'Headless CMS: not chosen by the user'
consequences:
- Prices and promos are changed by editing rows directly, with no admin UI
- Serverless API needs connection handling suited to a relational database
---

## Context

User: "Managed relational database"

Serves: FD-EPIC-011.

## Decision

Managed relational database storing the menu catalogue and promo values, editable outside the site (no admin screen) without a rebuild. Specific engine/product (e.g. on AWS) not yet named.

Kept separate because FD-EPIC-011 requires a stored catalogue editable without rebuild; data-ownership boundary separate from the API..

## Alternatives considered

- Managed document/NoSQL store: not chosen by the user
- JSON/config file in object storage: not chosen by the user
- Headless CMS: not chosen by the user

## Consequences

- Prices and promos are changed by editing rows directly, with no admin UI
- Serverless API needs connection handling suited to a relational database
