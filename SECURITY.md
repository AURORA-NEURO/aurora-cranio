# Security Policy

> **Research-use-only (RUO) software.** This repository is part of the
> AURORA-NEURO research portfolio and is **not** an FDA-cleared medical device.
> Do not use it for clinical decision-making.

## Supported versions

The `main` branch is the only supported version.

## Reporting a vulnerability

Please report security vulnerabilities **privately**:

- Open a [GitHub Security Advisory](../../security/advisories/new) on this repository, **or**
- Email the maintainers at `170054497+MurariAmbati@users.noreply.github.com`.

Please include: affected file/endpoint, reproduction steps, and impact. Do **not**
open a public issue for security problems.

We aim to acknowledge reports within 5 business days.

## Automated checks in this repository

- **`tools/security_scan.py`** — portable secret + SAST-lite scanner (no GHAS required).
- **`.github/workflows/codeql.yml`** — CodeQL static analysis (JS/TS/Python).
- **`.github/workflows/security-audit.yml`** — secret scan + `npm audit` / `pip-audit`.
- **`.github/dependabot.yml`** — weekly dependency-update PRs.

Run locally: `python tools/security_scan.py`
