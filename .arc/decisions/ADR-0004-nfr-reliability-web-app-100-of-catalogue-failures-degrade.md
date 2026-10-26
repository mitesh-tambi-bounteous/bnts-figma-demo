---
id: ADR-0004
category: nfr
title: "NFR: reliability (Web App) \u2014 100% of catalogue failures degrade only\
  \ the chef-recommended section"
status: accepted
superseded_by: null
dimension: reliability
metric: Home page hero, free-delivery banner and brand story render when the catalogue
  fetch fails
threshold: 100% of catalogue failures degrade only the chef-recommended section
component_id: comp_web_app
needs_dedicated_tracking: true
evidence: FD-STORY-026 (reliability)
---

## Context

FD-STORY-026 (reliability)

## Decision

Home page hero, free-delivery banner and brand story render when the catalogue fetch fails: 100% of catalogue failures degrade only the chef-recommended section

Applies to Web App.
