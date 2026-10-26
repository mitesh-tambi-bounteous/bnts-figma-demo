---
id: ADR-0009
category: cross_cutting
title: 'Cross-cutting: Cart and guest handling'
status: accepted
superseded_by: null
component_id: null
decision: 'Cart is session-only and guest-only: held in browser session storage, no
  sign-in, nothing stored server-side. Checkout is out of scope (placeholder page).'
evidence: FD-EPIC-012
---

## Context

FD-EPIC-012

## Decision

Cart is session-only and guest-only: held in browser session storage, no sign-in, nothing stored server-side. Checkout is out of scope (placeholder page).
