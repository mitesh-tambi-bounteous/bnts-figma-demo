# UI Guidelines

## Navigation & information architecture
Use a fixed left sidebar for primary sections, since the product is a persistent workspace users
return to repeatedly rather than a marketing surface. Keep a slim top bar for account/context
switching only, since duplicating navigation across sidebar and top bar creates ambiguity about
where a link lives.

## Layout & density
Favor a data-dense layout (compact `card` and `input` spacing via `space-1`/`space-2`) over a
spacious consumer look, since users scan lists and forms repeatedly and extra whitespace slows
that down. Collapse the sidebar below 768px, since narrow viewports can't fit both a sidebar and
usable content width.

## Component usage
Use `.card` for a single, self-contained record or summary (e.g. one entity's detail), since
cards imply one grouped, browsable unit rather than a comparable series. Use a table for any list
of records sharing the same fields, since tables let users compare values across rows at a
glance. Use `.chip` only for compact status/tag labels, since chips are too small to hold
actionable text. Use `.btn-primary` for exactly one primary action per view and `.btn-secondary`
for everything else, since more than one primary button removes the visual priority it's meant to
signal.

## Theme stance
Ship light theme only for now (`color-bg`/`color-fg` as defined in tokens), since the product has
one small team of internal users and a dark theme isn't a validated need yet.

## Voice & tone
Write copy in short, direct, task-oriented sentences (e.g. "Save changes", not "Would you like to
save your changes?"), since users are working through repetitive tasks and don't need
conversational framing.
