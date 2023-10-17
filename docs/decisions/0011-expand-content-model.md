# 11. Expand the project content model (client, year, live URL, tags)

- Status: Accepted
- Date: 2026-11-23

## Context

The initial content model (role, stack, repo URL, featured) proved the headless
pipeline but was thin for a real portfolio. Readers expect to see when a project
was delivered, who it was for, a link to the running product (not only its
source), and a way to browse by theme or technology.

## Decision

Add three scalar meta fields and one taxonomy, reusing the existing patterns so
no new drift is introduced:

- **Meta** — `client` (string), `year` (int), `liveUrl` (url). Each is declared
  once in `ProjectMeta::definitions()` and flows to REST and WPGraphQL through the
  same single-source mechanism as the original fields (see
  [ADR 0003](0003-register-meta-once.md)). `year` is stored as an int; `0` means
  unset and consumers treat a falsy year as absent.
- **Taxonomy** — a flat `project_tag` taxonomy, registered with `show_in_rest`
  and `show_in_graphql`. It is not publicly queryable on WordPress (the theme
  never renders projects, per [ADR 0005](0005-cpt-not-publicly-rendered.md)) but
  is exposed to the headless surfaces, so the frontend can read and filter by tag.

The featured image was already supported by the CPT (`thumbnail`) and exposed by
WPGraphQL; this change also carries it through to the project **detail** read and
the draft-preview REST shape, which previously omitted it.

## Consequences

- New fields stay a single source of truth; editing surfaces (the React panel and
  the optional ACF group) gained matching inputs, and the native taxonomy UI
  manages tags.
- The `hwr/v1/.../preview` draft shape now mirrors the published GraphQL detail
  read (nested `featuredImage` and `projectTags`), so a draft renders identically
  to a published project.
- Tag filtering on the home page is client-side over the already-fetched list; no
  extra query is needed for the current catalog size.
