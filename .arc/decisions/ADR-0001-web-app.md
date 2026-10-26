---
id: ADR-0001
category: component
title: Web App
status: accepted
superseded_by: null
component_id: comp_web_app
responsibility: 'Forno Rosso storefront SPA: shared header/footer, client-side routing
  (Home, Menu, Cart, not-found, legal and checkout coming-soon placeholders), menu
  browsing with client-side category filter, session-only guest cart (badge, quantities,
  totals, promo, delivery form), responsive layouts.'
kind: web_ui
serves:
- FD-EPIC-001
- FD-EPIC-002
- FD-EPIC-003
- FD-EPIC-005
- FD-EPIC-006
- FD-EPIC-007
- FD-EPIC-008
- FD-EPIC-009
- FD-EPIC-010
- FD-EPIC-011
- FD-EPIC-012
- FD-EPIC-013
split_reason: The only client runtime the storefront epics require; no code exists
  yet (empty codebase scan).
talks_to:
- component_id: comp_catalogue_api
  interaction: sync
  evidence: 'FD-EPIC-011: home and menu draw from one stored catalogue'
evidence: FD-EPIC-001, FD-EPIC-009, FD-EPIC-012; codebase scan empty
---

## Context

FD-EPIC-001, FD-EPIC-009, FD-EPIC-012; codebase scan empty

Serves: FD-EPIC-001, FD-EPIC-002, FD-EPIC-003, FD-EPIC-005, FD-EPIC-006, FD-EPIC-007, FD-EPIC-008, FD-EPIC-009, FD-EPIC-010, FD-EPIC-011, FD-EPIC-012, FD-EPIC-013.

## Decision

Forno Rosso storefront SPA: shared header/footer, client-side routing (Home, Menu, Cart, not-found, legal and checkout coming-soon placeholders), menu browsing with client-side category filter, session-only guest cart (badge, quantities, totals, promo, delivery form), responsive layouts.

Kept separate because The only client runtime the storefront epics require; no code exists yet (empty codebase scan)..

## Talks to

- **Catalogue API** (sync) — FD-EPIC-011: home and menu draw from one stored catalogue
