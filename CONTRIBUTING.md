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

Rules:

- Use lowercase only.
- Use exactly one `/` between `type` and summary.
- Summary must use letters, numbers, and `-` only.
- Do not use `_` or spaces.
- Branch type should match the commit types within it.

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

- `<type>: <short imperative summary>`

Allowed `<type>` values:

- `feat`
- `fix`
- `chore`
- `docs`
- `refactor`
- `test`

Rules:

- Use lowercase `type`.
- Use one-line summary in imperative form (for example: `add`, `fix`, `update`).
- Keep summary concise (target up to 72 characters).

Valid commit messages:

- `feat: add monthly availability view`
- `fix: handle missing access token`
- `docs: update local setup steps`

Invalid commit messages:

- `Feature: Add monthly availability view` (invalid type case)
- `fix add monthly availability view` (missing `:`)
- `feat(auth): handle missing access token` (no scopes)

## Pull Requests

PR title format (same as commit format):

- `<type>: <short imperative summary>`

Rules:

- All PRs are **squash-merged** into `master`.
- The squash commit message is derived from the PR title, with the PR number appended automatically.
- The resulting commit on `master` will read: `<type>: <summary> (#<pr-number>)`.
- Keep the PR title concise and descriptive — it becomes the permanent history entry.

Valid PR titles:

- `feat: add monthly availability view`
- `fix: handle missing access token`
- `docs: update contributing guidelines`
Invalid PR titles:

- `Add monthly availability view` (missing type prefix)
- `feat: add monthly availability view (#12)` (do not add PR number manually)
- `feat(auth): handle missing access token` (no scopes)

Example end-to-end flow:

1. Create branch: `feat/monthly-availability-view`
2. Open PR with title: `feat: add monthly availability view`
3. Squash-merge → commit on `master`: `feat: add monthly availability view (#12)`

## Closing Issues

To automatically close a GitHub issue when your PR is merged, add a keyword followed by the issue number in the **PR description body** (not the title):

- `Closes #<issue>`
- `Fixes #<issue>`

GitHub closes the referenced issue when the PR is squash-merged into `master`. The PR template includes a placeholder for this.

Rules:

- Put the keyword in the PR body, never in the PR title.
- Use one keyword per issue. To close multiple issues, add multiple lines.
- The issue is closed only when the PR is merged into `master`.

## Releases

Releases are automated via [Release Please](https://github.com/googleapis/release-please). After PRs are squash-merged, Release Please:

- Accumulates changes into an auto-updated release PR.
- Groups entries by type (`feat` → Features, `fix` → Bug Fixes, etc.).
- Bumps the version using semver (`feat` = minor, `fix` = patch).
- On merge of the release PR, creates a GitHub Release, git tag, and updates `CHANGELOG.md`.
