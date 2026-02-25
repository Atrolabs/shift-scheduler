# Contributing

This repository follows a PR-to-`master` workflow.

## Branching Workflow

- Branch off `master`.
- Keep branches short-lived and focused on a single change.
- Open a pull request directly into `master`.
- Merge via PR only (no direct pushes to `master`).
- Delete branch after merge.

## Branch Naming (Required)

Branch format:

- `<type>/<short-kebab-summary>`

Allowed `<type>` values:

- `feat`
- `fix`
- `chore`
- `docs`
- `refactor`
- `test`
- `hotfix`
- `release`

Rules:

- Use lowercase only.
- Use exactly one `/` between `type` and summary.
- Summary must use letters, numbers, and `-` only.
- Do not use `_` or spaces.

Valid branch names:

- `feat/monthly-availability-view`
- `fix/login-callback-redirect`
- `chore/update-dependencies`

Invalid branch names:

- `feature/monthly-availability-view` (invalid type)
- `feat_monthly-availability-view` (missing `/`)
- `feat/monthly_availability_view` (uses `_`)
- `feat/Monthly-Availability-View` (contains uppercase)

## Commit Messages (Required)

Commit format:

- Without ticket: `<type>: <short imperative summary>`
- With ticket (optional): `<type>: <short imperative summary> (<ticket-id>)`

Allowed `<type>` values:

- `feat`
- `fix`
- `chore`
- `docs`
- `refactor`
- `test`
- `hotfix`
- `release`

Rules:

- Use lowercase `type`.
- Use one-line summary in imperative form (for example: `add`, `fix`, `update`).
- Keep summary concise (target up to 72 characters).
- Ticket ID is optional and should be added at the end in parentheses.

Valid commit messages:

- `feat: add monthly availability view`
- `fix: handle missing access token`
- `docs: update local setup steps`
- `feat: add monthly availability view (PROJ-142)`
- `fix: handle missing access token (JIRA-77)`

Invalid commit messages:

- `Feature: Add monthly availability view` (invalid type case)
- `fix add monthly availability view` (missing `:`)
- `feat(PROJ-142): add monthly availability view` (ticket must be suffix)

## Tickets

Tickets are optional and are not required in branch names. For commits, include ticket IDs only as an optional suffix: `(<ticket-id>)`.
