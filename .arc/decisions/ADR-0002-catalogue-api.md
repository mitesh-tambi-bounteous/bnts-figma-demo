---
id: ADR-0002
category: component
title: Catalogue API
status: accepted
superseded_by: null
component_id: comp_catalogue_api
responsibility: Read-only API serving the single shared menu catalogue (items, prices,
  categories, chef-recommended/popular flags) and promo code values to Home, Menu
  and Cart.
kind: api_service
serves:
- FD-EPIC-010
- FD-EPIC-011
- FD-EPIC-012
split_reason: 'FD-EPIC-011: catalogue is stored and prices/promo values change outside
  the site without a rebuild, so they cannot be baked into the web bundle.'
talks_to:
- component_id: comp_catalogue_store
  interaction: sync
  evidence: 'FD-EPIC-011: catalogue is stored'
evidence: FD-EPIC-011
---

## Context

FD-EPIC-011

Serves: FD-EPIC-010, FD-EPIC-011, FD-EPIC-012.

## Decision

Read-only API serving the single shared menu catalogue (items, prices, categories, chef-recommended/popular flags) and promo code values to Home, Menu and Cart.

Kept separate because FD-EPIC-011: catalogue is stored and prices/promo values change outside the site without a rebuild, so they cannot be baked into the web bundle..

## Talks to

- **Catalogue Store** (sync) — FD-EPIC-011: catalogue is stored
