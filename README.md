# AURORA-CRANIO — console + clinician workstation

**Build-less, browser-only UI surfaces for the AURORA-CRANIO Ω craniosynostosis research-clinical operating system.**

[![Status: research preview](https://img.shields.io/badge/Status-Research_preview-orange.svg)](#governance--safety)
[![Language: JavaScript / JSX](https://img.shields.io/badge/Language-JavaScript%20%2F%20JSX-f7df1e.svg)](#metrics)
[![Output: non-prescriptive](https://img.shields.io/badge/Output-Non--prescriptive-red.svg)](#governance--safety)
[![License: Apache 2.0](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](#license--citation)
[![No build](https://img.shields.io/badge/Build-none%20(CDN%20React%20%2B%20Babel)-blue.svg)](#installation)

> Research-Use-Only (RUO), non-autonomous. These are **front-end demonstration surfaces** — static mock dashboards rendered in the browser. They contain **synthetic data only**, perform no diagnosis, and call no live model or backend.

---

## Table of contents

- [What this is](#what-this-is)
- [Status & provenance](#status--provenance)
- [Architecture](#architecture)
- [Installation](#installation)
- [Quickstart / usage](#quickstart--usage)
- [Project structure](#project-structure)
- [Testing & reproduction](#testing--reproduction)
- [Configuration](#configuration)
- [Metrics](#metrics)
- [Governance & safety](#governance--safety)
- [License & citation](#license--citation)

---

## What this is

This repository contains the **two browser-facing UI surfaces** for **AURORA-CRANIO Ω**, an open research-clinical operating system for craniosynostosis (premature fusion of infant skull sutures and its syndromic, surgical, and developmental sequelae). It is **not** the program's computational core. The trained checkpoints, rule engines, deterministic SafetyGates, Python sidecars, and regulatory packets live in the *individual numbered module repositories* (e.g. `aurora-cranio-2.2`, `aurora-cranio-2.5`, `aurora-cranio-5.5`); this repo holds only the operator-facing presentation layer that *governs and showcases* that module family.

Concretely, the repo ships two independent, **build-less** React applications:

- **`console/`** — an operator / governance **console** (admin, fleet, audit, onboarding). It renders an "AURORA Console" dashboard for the program umbrella: an overview, a case roster, a clinical surface, a foundation-models view, analytics, research/papers, an audit-and-provenance view, fleet admin, hospital onboarding, messages, guides, and settings. All content is driven from a single generated data object, `window.AURORA_DATA` (in `console/data.jsx`).
- **`webui/`** — a **clinician workstation** demo (sign-in screen, a dark and a light clinician surface, and a patient dashboard still). It renders a multi-disease triage/reading workstation whose landing program is pinned to craniosynostosis via `webui/screens/aurora-config.js` (`AURORA_DEFAULT_DZ = 'cranio'`).

Both surfaces are **mock UIs**: React 18 and Babel are loaded from a CDN and JSX is transpiled in-browser at page load (no bundler, no `package.json`, no build step). They are intended for design review, stakeholder walkthroughs, and as the front-end template that real module backends would later be wired behind.

**What this repo explicitly does NOT do.** It does not diagnose a child; it does not recommend surgery, surgical timing, technique, or device activation/removal; it does not run any ML model or call any API; it does not contain patient data. Every output type in the AURORA-CRANIO program is *specialist-support, non-prescriptive, and evidence-anchored*, and the demonstration data here reflects that framing (evidence rings labelled definite / probable / mimic / indeterminate / insufficient, explicit "abstained" states, no actionable instructions). The deterministic SafetyGate that enforces non-prescriptive output is implemented in the **module repos**, not here.

> Note: the previous README in this repo was the full ~100 KB AURORA-CRANIO Ω *program* specification (9 sections, 30+ modules, market analysis, regulatory pathway). That document describes the broader program — not the files actually present in this repository. This README documents the **actual contents of this repo** (the two dashboards). For the full program narrative, see the per-module repositories and the program documentation.

---

## Status & provenance

- **Build status:** No automated build or test pipeline exists in this repository (no `package.json`, no CI config, no test files). The surfaces are validated by opening them in a browser. Treat all "passing tests / predeploy" badges that appear *inside the rendered console data* as **claims belonging to other module repos**, surfaced here for display — they are not verified by anything in this repo.
- **Data provenance — SYNTHETIC only.** Both apps render hard-coded, de-identified, synthetic data:
  - `console/data.jsx` / `console/dash-data.jsx` — generated console data object (`window.AURORA_DATA`) describing the program umbrella, subsystems, personas, and mock metrics.
  - `webui/screens/clinician-data.js` — a synthetic, de-identified multi-disease atlas (`window.AURORA`) with mock triage cases across glioma / hydrocephalus / craniosynostosis / etc. Header comment: *"data model (synthetic, de-identified)."*
  - There is **no REAL patient data** and **no POINTER/manifest** to external datasets in this repo. Real-data provenance (REAL/SYNTHETIC/POINTER, checksums, DUAs) lives in the individual module repos.
- **Honest limitations / negatives:** numbers shown in the UI (cohort sizes, calibration, latency targets, test counts) are illustrative or imported from sibling-module notes; they are **not computed here**. Several program sections referenced in the console data are spec-only or scaffold in their own repos.
- **Reproducibility:** the rendered output is fully deterministic given the static data files — reopening the pages produces the same view (modulo entrance animations and `localStorage`-persisted theme/density/accent preferences).

---

## Architecture

This is a **pure client-side, no-build** architecture. There is no TypeScript governance core and no Python numerics sidecar *in this repo* — those belong to the module repositories. The guardEmission / SafetyGate chokepoint described in the program is enforced in the module backends, **not** in these display surfaces.

### Runtime model (both surfaces)

Each HTML entry point loads, in order, from `unpkg` CDN:

1. `react@18.3.1` + `react-dom@18.3.1` (UMD, development builds, SRI-pinned).
2. `@babel/standalone@7.29.0` — transpiles `text/babel` `<script>` JSX **in the browser** at load time.
3. The app's data scripts, UI primitives, view modules, shell, and mount script — each as a separate `<script>` tag, sharing state through **`window` globals** (no ES modules, no imports).

### `console/` — operator / governance console

Data flow (declared by the `<script>` order in `console/index.html`):

```
data.jsx ┐
dash-data.jsx ┤→ window.AURORA_DATA, window.OPS(), window.OPS_MESSAGES()
            │
primitives.jsx → shared UI atoms
charts.jsx     → inline SVG charts
view-*.jsx     → 15 view components (overview, cases, clinical, models,
                 product, research, analytics, audit, admin, onboarding,
                 messages, settings, guides)
shell.jsx      → <Shell/>: nav (Clinical / Build / Evidence / Deploy / Learn),
                 routing, theme/density/accent, localStorage persistence
app.jsx        → ReactDOM.createRoot(...).render(<Shell/>)  (mount, 7 lines)
```

- The nav groups and routes are defined in `console/shell.jsx` (`NAV` array).
- View state, selected module, theme, density, and accent are persisted to `localStorage` under `aurora.<CODE>.*` keys.
- `app.jsx` also rewrites `document.title` from the first module's `code`/`name`.

### `webui/` — clinician workstation

Three HTML entry points (`index.html`, `clinician.html` = dark, `clinician-light.html` = light) each load:

```
aurora-config.js  → window.AURORA_DEFAULT_DZ = 'cranio'; window.AURORA_DEPLOY
image-slot.js     → image/scan slot rendering helpers
clinician-data.js → window.AURORA (synthetic multi-disease atlas)
clinician-modules.jsx → window.CLIN (Icon set, evidence rings, module panels)
clinician-app.jsx → app shell; reads window.AURORA + window.CLIN; mounts to #root
```

- `webui/login.html` is a self-contained sign-in mock (inline CSS, no React).
- `webui/screens/patient-dashboard.html` is a standalone static patient-dashboard still.
- `webui/screens/aurora.js` is a tiny mock runtime (count-up + staged entrance reveal) for static screen stills.
- Evidence states are colour-coded (`definite / probable / mimic / indeterminate / insufficient`) via CSS variables in `clinician-data.js` / `clinician.css`.

### Cross-cutting

- **No backend, no network calls** beyond the CDN script/font fetches.
- **Theming** via `data-theme` / `theme-light` body class and CSS custom properties (`console/console.css`, `webui/screens/*.css`).

---

## Installation

There is **nothing to install or build** — no `package.json`, no lockfile, no toolchain. The only requirement is a static file server and a modern browser (the apps fetch React/Babel from `unpkg.com`, so an internet connection is needed on first load).

Serve the repo root over HTTP (opening the HTML via `file://` works for some pages but a static server is recommended so relative `<script src>` paths resolve consistently):

```bash
# from the repository root — pick any static server you have:

# Python 3 (no dependency to install)
python -m http.server 8080

# or Node, if installed (npx fetches a server on demand)
npx --yes serve -l 8080
```

Then open:

- Console: <http://localhost:8080/console/index.html>
- Clinician workstation (dark): <http://localhost:8080/webui/index.html> or `.../webui/clinician.html`
- Clinician workstation (light): <http://localhost:8080/webui/clinician-light.html>
- Sign-in mock: <http://localhost:8080/webui/login.html>
- Patient dashboard still: <http://localhost:8080/webui/screens/patient-dashboard.html>

No native dependencies, no GPU, and no large data downloads. React 18.3.1 and `@babel/standalone` 7.29.0 are pulled from `unpkg` at runtime; pin/vendor them locally if you need offline use.

> The port `8080` above is just an example for the static server — it is **not** configured anywhere in the repo. The named program ports (e.g. sidecar `8088`, API `8036`) belong to the module repos, not to these UIs.

---

## Quickstart / usage

The smallest working example is "serve and open":

```bash
python -m http.server 8080
# then visit http://localhost:8080/console/index.html
```

What you should see:

- **Console** — boots into the **Overview** view of the AURORA-CRANIO Ω program umbrella, with a left nav (Clinical / Build / Evidence / Deploy / Learn), a module switcher, theme/density toggles, and 15 switchable views. State (active view, theme, accent) persists in `localStorage` across reloads.
- **Clinician workstation** — boots into the craniosynostosis program (pinned by `AURORA_DEFAULT_DZ = 'cranio'`), showing a synthetic triage list, evidence rings, and module panels; the program is switchable at runtime, and the settings drawer links between the dark (`clinician.html`) and light (`clinician-light.html`) surfaces.

To re-point the clinician workstation's default landing program, edit `webui/screens/aurora-config.js`:

```js
// valid: glioma · hydro · spina · tethered · dwm · enceph · arach · cranio · chiari
window.AURORA_DEFAULT_DZ = 'cranio';
window.AURORA_DEPLOY = { repo: 'aurora-cranio', program: 'cranio' };
```

There is no CLI, server, or library import surface in this repo — interaction is entirely through the browser.

---

## Project structure

```
aurora-cranio/
├── README.md                      # this file
├── console/                       # operator / governance console (single-page React app)
│   ├── index.html                 # entry point; loads CDN React+Babel then all scripts in order
│   ├── data.jsx                   # window.AURORA_DATA — generated program-umbrella console data
│   ├── dash-data.jsx              # additional dashboard data / OPS() helpers
│   ├── primitives.jsx             # shared UI atoms
│   ├── charts.jsx                 # inline SVG charts
│   ├── shell.jsx                  # <Shell/> — nav, routing, theme/density/accent, localStorage
│   ├── app.jsx                    # mount: ReactDOM.createRoot(...).render(<Shell/>)
│   ├── view-overview.jsx          # Overview view
│   ├── view-cases.jsx             # Case roster
│   ├── view-clinical.jsx          # Clinical surface
│   ├── view-models.jsx            # Foundation models
│   ├── view-product.jsx           # Use cases & I/O
│   ├── view-research.jsx          # Research & papers
│   ├── view-analytics.jsx         # Analytics
│   ├── view-audit.jsx             # Audit & provenance
│   ├── view-admin.jsx             # Fleet admin (largest view, ~786 LOC)
│   ├── view-onboarding.jsx        # Onboard hospital
│   ├── view-messages.jsx          # Messages
│   ├── view-settings.jsx          # Settings
│   ├── view-guides.jsx            # Guides
│   └── console.css                # console styling (theming via CSS variables)
└── webui/                         # clinician workstation demo
    ├── index.html                 # clinician workstation entry (dark)
    ├── clinician.html             # dark clinician surface
    ├── clinician-light.html       # light clinician surface
    ├── login.html                 # self-contained sign-in mock (inline CSS, no React)
    └── screens/
        ├── aurora-config.js       # per-deployment config; AURORA_DEFAULT_DZ='cranio'
        ├── image-slot.js          # image/scan slot rendering helpers
        ├── clinician-data.js      # window.AURORA — synthetic, de-identified multi-disease atlas
        ├── clinician-modules.jsx  # window.CLIN — icons, evidence rings, module panels
        ├── clinician-app.jsx      # app shell; mounts to #root
        ├── aurora.js              # tiny mock runtime (count-up + staged reveal)
        ├── patient-dashboard.html # standalone static patient dashboard still
        ├── aurora.css / clinician.css / clinician-light.css / patient.css  # styling
```

(Directories `node_modules/` and `dist/` do not exist — there is no build.)

---

## Testing & reproduction

There are **no automated tests** in this repository (`test_files: 0`, no test runner, no `package.json`). Verification is manual:

1. Serve the repo (see [Installation](#installation)).
2. Open each HTML entry point and confirm it renders without console errors:
   - `console/index.html` → console shell renders, nav switches between all 15 views, theme/density/accent toggles persist across reload.
   - `webui/index.html`, `webui/clinician.html`, `webui/clinician-light.html` → clinician workstation renders with the craniosynostosis program selected by default.
   - `webui/login.html`, `webui/screens/patient-dashboard.html` → static screens render.

Because JSX is transpiled in-browser by `@babel/standalone`, a syntax error in any `.jsx` surfaces as a runtime error in the browser console rather than at build time — check the devtools console when reviewing.

There is **no headline benchmark to reproduce in this repo**. Any quantitative result referenced in the rendered console data (cohort sizes, calibration, test counts, predeploy gates) is produced and validated in the corresponding **module repository**, not here. To reproduce those, consult the per-module repos (e.g. `aurora-cranio-5.5` for the PVD twin's `671/671` + `52/52` claims).

---

## Configuration

This repo has minimal, file-based configuration only — there are **no environment variables, no JWT/RBAC, and no server-side config** (those auth/governance controls live in the module backends).

| Surface | Mechanism | Where | Effect |
|---|---|---|---|
| Clinician workstation | `window.AURORA_DEFAULT_DZ` | `webui/screens/aurora-config.js` | Landing disease program (one of `glioma · hydro · spina · tethered · dwm · enceph · arach · cranio · chiari`); all remain runtime-switchable |
| Clinician workstation | `window.AURORA_DEPLOY` | `webui/screens/aurora-config.js` | `{ repo, program }` deployment tag |
| Console | `window.AURORA_DATA` | `console/data.jsx` | Entire console data model (modules, meta, personas, stats) |
| Clinician workstation | `window.AURORA` | `webui/screens/clinician-data.js` | Synthetic multi-disease atlas / triage data |
| Both | `localStorage` keys | runtime | `aurora.theme`, `aurora.density`, `aurora.accent`, `aurora.<CODE>.module`, `aurora.<CODE>.view` — UI preferences only |
| CDN pins | `<script src>` | each `*.html` | React `18.3.1`, `@babel/standalone` `7.29.0`, fetched from `unpkg.com` with SRI hashes |

To run fully offline, vendor the three CDN scripts locally and update the `<script src>` URLs in the HTML files.

---

## Metrics

| Metric | Value |
|---|---|
| Functional LOC (code) | 6,161 |
| Test LOC | 0 |
| Total files (surveyed) | 25 |
| Test files | 0 |
| Language split | JavaScript / JSX: 6,161 (100%) |
| TypeScript | none in this repo |
| Python | none in this repo |
| Declared npm scripts | none (no `package.json`) |
| Build step | none (CDN React + in-browser Babel) |

LOC and language split are from the repository survey. (A direct `wc -l` over the `console/` + `webui/` trees counts ~8.7 K total lines including HTML and CSS; the survey's 6,161 reflects functional JS/JSX code.)

---

## Governance & safety

**Research-Use-Only (RUO). Non-autonomous. Non-prescriptive.** These UI surfaces are part of the AURORA-CRANIO Ω program, which is specialist-support by construction:

- **Not a medical device, not clinically deployable.** This repo is a research-preview front-end. It makes no clinical decision, emits no diagnosis, and recommends no surgery, timing, technique, or device action.
- **No autonomous output.** The surfaces render only synthetic, de-identified demonstration data. They call no model and no backend; nothing here can act on a patient.
- **Prohibited outputs.** Prescriptive / family-actionable language is structurally blocked at the deterministic SafetyGate of each **module** (regex + structural check + audit log). That chokepoint is *not implemented in this repo* — these are display surfaces only, and they reflect the non-prescriptive contract in their labelling (evidence rings, explicit abstention states, no actionable instructions).
- **Operator-facing.** Both surfaces are designed for craniofacial-surgery / neurosurgery / neuroradiology / genetics / ophthalmology reviewers behind specialist authentication; there is no family-facing diagnostic interface.
- **Audit behavior.** This repo performs no audit logging itself; the program's hash-chain audit and provenance ledgers live in the module repos. The console's "Audit & provenance" view (`console/view-audit.jsx`) is a presentation of those concepts over synthetic data.

If you connect these surfaces to any real backend, that backend — not this repo — must carry the SafetyGate, authentication, audit chain, and regulatory controls described in the program documentation.

---

## License & citation

- **License:** Apache-2.0 (as declared by the AURORA-CRANIO Ω program and the console data's `license` field). Note: no standalone `LICENSE` file is currently present in this repository — the Apache-2.0 grant is asserted in the program documentation and the rendered console metadata. The license covers code/UI only; it confers no rights over any clinical data.
- **Family / program:** AURORA-CRANIO Ω — a 9-section, 30+ module craniosynostosis research-clinical operating system. This repo provides the program's operator console and clinician-workstation UI surfaces; computational modules ship as separate repositories (`aurora-cranio-<section>.<module>`).
- **Citation / contact:** `170054497+MurariAmbati@users.noreply.github.com`

> Reminder: this is Research-Use-Only software for research and design review. It is not a medical device, has not been cleared or approved by any regulator, and must not be used to inform clinical care.
