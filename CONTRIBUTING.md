<div align="center">

# Contributing

**Guidelines for branching, commits, pull requests, and releases.**

</div>

---

## Workflow

This repository follows a PR-to-`master` workflow.

| Step | Rule |
|------|------|
| Branch from | `master` |
| Branch lifetime | Short-lived, focused on a single change |
| Merge target | `master` via PR only |
| Merge strategy | Squash merge |
| After merge | Delete the branch |

> [!IMPORTANT]
> No direct pushes to `master`. All changes go through pull requests.

## Branch Naming

Format: **`<type>/<short-kebab-summary>`**

### Allowed Types

| Type | Purpose |
|------|---------|
| `feat` | New functionality |
| `fix` | Bug fix |
| `chore` | Tooling, dependencies, config |
| `docs` | Documentation only |
| `refactor` | Code restructuring, no behavior change |
| `test` | Tests only |

### Rules

- Lowercase only
- Exactly one `/` between type and summary
- Summary uses letters, numbers, and `-` only (no `_` or spaces)
- Branch type should match the commit types within it

<details>
<summary><strong>Examples</strong></summary>

<br>

**Valid:**

- `feat/monthly-availability-view`
- `fix/login-callback-redirect`
- `chore/update-dependencies`

**Invalid:**

| Branch | Problem |
|--------|---------|
| `feature/monthly-availability-view` | Invalid type (`feature` not allowed) |
| `feat_monthly-availability-view` | Missing `/` separator |
| `feat/monthly_availability_view` | Uses `_` instead of `-` |
| `feat/Monthly-Availability-View` | Contains uppercase |

</details>

## Commit Messages

Format: **`<type>: <short imperative summary>`**

Uses the same [allowed types](#allowed-types) as branch naming.

### Rules

- Lowercase `type`
- Imperative form (e.g., `add`, `fix`, `update`)
- Target up to 72 characters

<details>
<summary><strong>Examples</strong></summary>

<br>

**Valid:**

- `feat: add monthly availability view`
- `fix: handle missing access token`
- `docs: update local setup steps`

**Invalid:**

| Commit | Problem |
|--------|---------|
| `Feature: Add monthly availability view` | Invalid type case |
| `fix add monthly availability view` | Missing `:` separator |
| `feat(auth): handle missing access token` | Scopes not allowed |

</details>

## Pull Requests

PR title format is the same as commit format: **`<type>: <short imperative summary>`**

| Rule | Details |
|------|---------|
| Merge strategy | All PRs are **squash-merged** into `master` |
| Squash message | Derived from PR title + auto-appended PR number |
| Result on `master` | `<type>: <summary> (#<pr-number>)` |

> [!NOTE]
> The PR title becomes the permanent history entry on `master`. Keep it concise and descriptive.

<details>
<summary><strong>Examples</strong></summary>

<br>

**Valid PR titles:**

- `feat: add monthly availability view`
- `fix: handle missing access token`
- `docs: update contributing guidelines`

**Invalid PR titles:**

| Title | Problem |
|-------|---------|
| `Add monthly availability view` | Missing type prefix |
| `feat: add monthly availability view (#12)` | Don't add PR number manually |
| `feat(auth): handle missing access token` | Scopes not allowed |

**End-to-end flow:**

1. Create branch: `feat/monthly-availability-view`
2. Open PR with title: `feat: add monthly availability view`
3. Squash-merge → commit on `master`: `feat: add monthly availability view (#12)`

</details>

## Closing Issues

Add a keyword in the **PR description body** (not the title) to auto-close issues on merge:

```
Closes #<issue>
Fixes #<issue>
```

| Rule | Details |
|------|---------|
| Location | PR body only, never the title |
| Multiple issues | One keyword per line |
| When closed | On squash-merge into `master` |

> [!NOTE]
> The PR template includes a `Closes #` placeholder.

## Releases

Releases are automated via [Release Please](https://github.com/googleapis/release-please).

| Step | What Happens |
|------|--------------|
| PRs merged | Changes accumulate in an auto-updated release PR |
| Grouping | Entries grouped by type (`feat` → Features, `fix` → Bug Fixes, etc.) |
| Versioning | Semver bump (`feat` = minor, `fix` = patch) |
| Release PR merged | GitHub Release created, git tag applied, `CHANGELOG.md` updated |
