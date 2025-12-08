# Git Flow Guide

## Branch Structure

### Main Branches

- **`main`** - Production-ready code. Only receives merges from `release/*` and `hotfix/*` branches.
- **`develop`** - Integration branch for features. Latest development changes.

### Supporting Branches

- **`feature/*`** - New features
  - Branch from: `develop`
  - Merge into: `develop`
  - Example: `feature/add-uuid-builder`
- **`release/*`** - Release preparation
  - Branch from: `develop`
  - Merge into: `main` (auto-merges back to `develop`)
  - Example: `release/v1.2.0`
- **`hotfix/*`** - Emergency production fixes
  - Branch from: `main`
  - Merge into: `main` (auto-merges back to `develop`)
  - Example: `hotfix/v1.0.1`

## Workflow Examples

### Starting a Feature

```bash
git checkout develop
git pull origin develop
git checkout -b feature/add-uuid-builder

# Work on feature
git add .
git commit -m "feat: add UUID builder"
git push origin feature/add-uuid-builder

# Create PR to develop
```

### Creating a Release

**Option 1: GitHub Actions UI** (Recommended)

1. Go to Actions → "Create Release"
2. Click "Run workflow"
3. Select release type (patch/minor/major) or enter custom version
4. Click "Run workflow"
5. Review and merge the auto-created PR
6. Release publishes automatically to NPM

**Option 2: Manual**

```bash
git checkout develop
git pull origin develop
git checkout -b release/v1.1.0
npm version minor  # or major, patch
git push origin release/v1.1.0
# Create PR to main
```

### Creating a Hotfix

```bash
git checkout main
git pull origin main
git checkout -b hotfix/v1.0.1

# Fix the bug
git commit -m "fix: critical issue"
npm version patch
git push origin hotfix/v1.0.1

# Create PR to main
# After merge → auto-publish to NPM
```

## GitHub Actions Workflows

### CI Workflow (`ci.yml`)

**Triggers:** Push to `develop`, `feature/*`, `release/*`, `hotfix/*`

**Actions:**

- Lint code (ESLint)
- Check formatting (Prettier)
- Run tests with coverage
- Build package
- Upload coverage to Codecov
- Test package installation

### Release Workflow (`release.yml`)

**Triggers:** Push/merge to `main`

**Actions:**

- Run full validation
- Extract version from package.json
- Create Git tag
- Generate changelog
- Create GitHub Release
- Publish to NPM with provenance

### Auto-merge Workflow (`auto-merge-develop.yml`)

**Triggers:** Push to `main`

**Actions:**

- Auto-merge `main` → `develop`
- Create PR if conflicts occur

### Create Release Workflow (`create-release.yml`)

**Triggers:** Manual via GitHub Actions UI

**Inputs:**

- Version (for custom releases)
- Release type (patch/minor/major/custom)
- Source branch (default: develop)

**Actions:**

- Create release branch
- Bump version in package.json
- Auto-create PR to main

## Commit Conventions

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```bash
<type>: <description>

# Types:
feat:     New feature
fix:      Bug fix
docs:     Documentation
test:     Tests
refactor: Code refactoring
chore:    Maintenance

# Examples:
git commit -m "feat: add UUID builder"
git commit -m "fix: correct string length"
git commit -m "docs: update README"
```

## Semantic Versioning

- **MAJOR** (1.0.0 → 2.0.0): Breaking changes
- **MINOR** (1.0.0 → 1.1.0): New features (backward compatible)
- **PATCH** (1.0.0 → 1.0.1): Bug fixes

```bash
npm version major   # Breaking changes
npm version minor   # New features
npm version patch   # Bug fixes
```

## Quick Reference

| Task           | Command                                    |
| -------------- | ------------------------------------------ |
| Start feature  | `git checkout -b feature/name develop`     |
| Create release | GitHub Actions → "Create Release" workflow |
| Create hotfix  | `git checkout -b hotfix/vX.X.X main`       |
| Run tests      | `yarn validate`                            |

## Setup Requirements

### GitHub Secrets

Configure in **Settings → Secrets and variables → Actions**:

- **`NPM_TOKEN`** (required) - NPM automation token for publishing
  - Get from: https://www.npmjs.com/settings/YOUR_USERNAME/tokens
  - Type: Automation
  - Permissions: Read and Publish

- **`CODECOV_TOKEN`** (optional) - Code coverage reporting
  - Get from: https://codecov.io/

### Branch Protection (Recommended)

**`main` branch:**

- Require PR reviews (1+)
- Require status checks to pass
- No force pushes

**`develop` branch:**

- Require PR reviews (1+)
- Require status checks to pass
