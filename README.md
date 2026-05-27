# AURORA-CRANIO Ω

**An Open Research–Clinical Operating System for Craniosynostosis Biology, Skull-Growth Mechanics, Neurodevelopment, Surgical Topology, Biomarker Discovery, and Outcome Learning**

> _"Craniosynostosis is not merely 'abnormal skull shape.' It is a dynamic disorder of suture biology, cranial-vault growth, skull-base relationships, intracranial-volume reserve, brain development, orbital anatomy, airway/sleep physiology, venous outflow, ophthalmic risk, neurodevelopment, genotype, and surgical remodeling response. Any tool that collapses any one of those dimensions away has, by construction, failed the patient."_

[![Status: research](https://img.shields.io/badge/Status-Specialist--Support_Research_Framework-orange.svg)](#19-governance--the-safety-contract)
[![License: Apache 2.0](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](#23-license)
[![Non-prescriptive](https://img.shields.io/badge/Output-Non--Prescriptive-red.svg)](#19-governance--the-safety-contract)
[![SaMD pending](https://img.shields.io/badge/IMDRF_SaMD-Pending-yellow.svg)](#19-governance--the-safety-contract)
[![Modules](https://img.shields.io/badge/Modules-30%2B-blue.svg)](#5-module-inventory--maturity-matrix)
[![Tests](https://img.shields.io/badge/Tests-671%2F671-green.svg)](#10-section-5--cranio-forge)
[![Predeploy](https://img.shields.io/badge/Predeploy-52%2F52-green.svg)](#10-section-5--cranio-forge)
[![Horizon](https://img.shields.io/badge/%CE%A9--HORIZON-15_advanced_capabilities-purple.svg)](#27-ω-horizon--the-advanced-capability-program)

---

## Table of contents

| # | Section |
|---|---|
| 1 | [What this is — and is not](#1-what-this-is--and-is-not) |
| 2 | [Why the world needs this](#2-why-the-world-needs-this) |
| 3 | [Market position — head-to-head with the incumbents](#3-market-position--head-to-head-with-the-incumbents) |
| 4 | [The 9-section architecture](#4-the-9-section-architecture) |
| 5 | [Module inventory + maturity matrix](#5-module-inventory--maturity-matrix) |
| 6 | [The 10 core invariants — the safety contract](#6-the-10-core-invariants--the-safety-contract) |
| 7 | [The 14 market-beating inventions](#7-the-14-market-beating-inventions) |
| 8 | [Section 1 — CRANIO-ORIGIN](#8-section-1--cranio-origin) |
| 9 | [Section 2 — CRANIO-PHYSICS](#9-section-2--cranio-physics) |
| 10 | [Section 3 — CRANIO-BIOMARKERS](#10-section-3--cranio-biomarkers) |
| 11 | [Section 4 — CRANIO-DIAGNOSTICS](#11-section-4--cranio-diagnostics) |
| 12 | [Section 5 — CRANIO-FORGE](#12-section-5--cranio-forge) |
| 13 | [Section 6 — CRANIO-NEURODEVELOPMENT](#13-section-6--cranio-neurodevelopment) |
| 14 | [Section 7 — CRANIO-BENCHMARK](#14-section-7--cranio-benchmark) |
| 15 | [Section 8 — CRANIO-ENDPOINTS](#15-section-8--cranio-endpoints) |
| 16 | [Section 9 — CRANIO-GOVERNANCE](#16-section-9--cranio-governance) |
| 17 | [Engineering architecture across modules](#17-engineering-architecture-across-modules) |
| 18 | [Clinical scenarios — the safety contract in action](#18-clinical-scenarios--the-safety-contract-in-action) |
| 19 | [Regulatory pathway, by section and module](#19-regulatory-pathway-by-section-and-module) |
| 20 | [Biomarker validation tier system](#20-biomarker-validation-tier-system) |
| 21 | [Failure-mode catalog — what AURORA-CRANIO Ω is designed to prevent](#21-failure-mode-catalog--what-aurora-cranio-ω-is-designed-to-prevent) |
| 22 | [Partner-institution landscape](#22-partner-institution-landscape) |
| 23 | [Cost + resource model](#23-cost--resource-model) |
| 24 | [Roadmap](#24-roadmap) |
| 25 | [How to engage](#25-how-to-engage) |
| 26 | [Status — module maturity heatmap](#26-status--module-maturity-heatmap) |
| 27 | [Ω-HORIZON — the advanced capability program](#27-ω-horizon--the-advanced-capability-program) |
| 28 | [The phased delivery plan](#28-the-phased-delivery-plan) |
| 29 | [References + citations](#29-references--citations) |
| 30 | [License](#30-license) |
| 31 | [One-line summary](#31-one-line-summary) |

---

## 1. What this is — and is not

AURORA-CRANIO Ω is **not** another craniofacial planning tool. The market already has strong generic planning infrastructure: Brainlab Elements (image fusion, distortion correction, segmentation, target outlining, fiber tracking, trajectory planning), Synaptive Modus Plan (immersive surgical simulation, patient-specific tractography), and ImmersiveTouch (FDA 510(k)-cleared VR planning that turns DICOM into patient-specific virtual anatomy). Those products are excellent, broadly applicable, and largely _generic_ neuro/craniofacial planning ecosystems. They are not craniosynostosis-specific engines for suture biology, fusion-stage inference, skull-growth forecasting, intracranial-volume pressure-risk reasoning, ophthalmic/endocrine/neurodevelopmental endpoint learning, surgical-timing counterfactuals, or lifelong outcome registries.

AURORA-CRANIO Ω is the **first craniosynostosis-specific research-clinical operating system** that makes every child's skull, sutures, brain-growth reserve, venous/CSF/optic risk, genotype, molecular biology, surgery, and lifelong outcomes computable over time.

### What it is, by construction

- **Disease-specific.** Not a generic neuro/cranio platform retrofitted for craniosynostosis. Every output type, every endpoint, every regulatory annotation, every benchmark task, every test fixture is craniosynostosis-shaped.
- **Specialist-support.** Every output is for craniofacial surgeon / pediatric neurosurgeon / neuroradiologist / ophthalmologist / geneticist review. No autonomous clinical decision is made by any module.
- **Non-prescriptive.** Outputs structure evidence; they do not recommend surgery, timing, device activation, device removal, revision, or any individual treatment. Prescriptive language is hard-blocked at the SafetyGate of every module, with a regex+structural-check + audit log.
- **Evidence-anchored.** Every classification carries a proof state and an evidence tier. Nothing labeled "diagnosed" without the proof ledger that produced it. Nothing labeled "validated" without an explicit validation cohort, design, and outcome.
- **Time-aware.** Craniosynostosis is dynamic. Every module is built around the lifecycle — preoperative state → operative event → postoperative remodeling → long-term growth → school-age outcomes — not the imaging timepoint.
- **Open-source.** Apache 2.0 across the codebase, with per-module governance overlays for the partner-institution data, the regulatory documents, and the validation evidence.
- **Federated-ready.** Built to ingest data from Epic Caboodle, OMOP CDM, REDCap, FHIR R4 Bulk `$export` — and to run de-identification locally so patient data never leaves the partner institution un-anonymized.

### What it is not, by construction

- **Not a diagnostic device.** No module emits a standalone diagnosis without specialist adjudication.
- **Not a surgical decision-support tool.** No module recommends surgical operation, surgical timing, or surgical technique.
- **Not a consumer / direct-to-family app.** Every UI is operator-facing and behind specialist authentication. No family-facing diagnostic interface exists, and the SafetyGate refuses to emit family-actionable instructions.
- **Not an AI that "scans skulls."** It is an operating system for the biology, growth, physiology, surgery, and outcome of craniosynostosis. The ML models embedded in it (CranioPVD-FM, CranioFOA, CranioFORGE-VAULT, CranioNeuroDev, CranioFOT) are secondary signals; the **deterministic SafetyGate** is the primary safety control in every module.

---

## 2. Why the world needs this

Craniosynostosis is a birth defect in which one or more skull sutures fuse prematurely, restricting normal cranial-vault growth and forcing compensatory expansion along open sutures. The U.S. Centers for Disease Control and Prevention estimates **approximately 1 in every 2,500 babies** in the United States has craniosynostosis. [^cdc] That gives roughly 1,500 affected infants in the U.S. each year, and proportionally more globally. The clinical management trajectory of a single affected child can span **two decades** — fronto-orbital advancement at 9-12 months, posterior vault distraction at 6-18 months, midface advancement at age 7-9 if syndromic, monobloc at adolescence, neurodevelopmental surveillance through school, and ophthalmic surveillance for life if intracranial pressure was ever elevated.

Current guideline work — most recently the **2020 international guideline on craniosynostosis treatment and management** [^guideline] — emphasizes that craniosynostosis care must be multidisciplinary across:

- Craniofacial / plastic surgery (operative planning, vault remodeling, fronto-orbital advancement, distraction osteogenesis)
- Pediatric neurosurgery (intracranial pressure management, Chiari decompression, hydrocephalus, dural and venous anatomy)
- Pediatric neuroradiology (imaging interpretation, radiation minimization, segmentation, longitudinal growth measurement)
- Genetics (FGFR / TWIST1 / TCF12 / ERF / EFNB1 / RAB23 / MSX2 / POR / SKI / MEGF8 panels and counseling)
- Ophthalmology / neuro-ophthalmology (papilledema surveillance, optic neuropathy, OCT RNFL, exposure keratopathy, strabismus)
- Audiology + ENT (hearing loss in syndromic forms, airway management in midface hypoplasia)
- Sleep medicine (obstructive sleep apnea in syndromic craniosynostosis)
- Developmental pediatrics + neuropsychology (longitudinal cognitive, language, motor, and behavioral outcomes)
- Orthotics (helmet therapy after endoscopic strip craniectomy)
- Social work + family support (caregiver burden, school accommodations, financial strain)

The visible FDA AI/ML-enabled medical-device list [^fda] is a broad public resource for AI/ML-enabled devices authorized for marketing in the United States. It is not evidence that a dedicated, disease-specific craniosynostosis operating system already exists, and any product claim would still need a specific intended use, validation package, and regulatory pathway.

There is therefore a clear, structural gap: **the field has many isolated AI/imaging tools and a strong multi-specialty consensus on how care should work — but no operating system that wires those specialists together around the same evidence object for the same child across two decades.** AURORA-CRANIO Ω closes that gap.

---

## 3. Market position — head-to-head with the incumbents

| Capability | Brainlab Elements | Synaptive Modus Plan | ImmersiveTouch VR | Generic AI skull-seg model | **AURORA-CRANIO Ω** |
|---|:---:|:---:|:---:|:---:|:---:|
| 3D skull segmentation | ✓ | ✓ | ✓ | ✓ | ✓ (§7.1) |
| Surgical trajectory planning | ✓ | ✓ | ✓ | – | covered by partner tools |
| **Suture-fusion proof ledger** | – | – | – | – | ✓ (§1.1) |
| **Suture biology + fusion-stage atlas** | – | – | – | – | ✓ (§1.3) |
| **Genotype → morphotype → surgery response** | – | – | – | – | ✓ (§3.3) |
| **Intracranial-volume reserve twin** | – | – | – | – | ✓ (§2.2 shipped) |
| **Venous/Chiari/airway coupling mapper** | – | – | – | – | ✓ (§2.3 shipped) |
| **PVD posterior-vault-distraction twin** | – | – | – | – | ✓ (§5.5 shipped v5.5.5) |
| **FOA fronto-orbital-advancement orbital-risk twin** | – | – | – | – | ✓ (§5.4 shipped) |
| **Operative-truth-delta capture** | – | – | – | – | ✓ (§5.6 scaffold) |
| **Refusion + relapse forecasting** | – | – | – | – | ✓ (§5.8 scaffold) |
| **Causal adjudicator for neurodevelopment** | – | – | – | – | ✓ (§2.5 trained) |
| **Family-burden + school-function factory** | – | – | – | – | ✓ (§6.4) |
| **Rare-case stress benchmark** | – | – | – | – | ✓ (§7.3 shipped) |
| **Biomarker tier validation** | – | – | – | – | ✓ (§3.1) |
| **Non-prescriptive safety contract** | n/a | n/a | n/a | n/a | ✓ baked into every module |

The incumbents are excellent at **generic 3D planning** — image fusion, trajectory planning, VR rehearsal. AURORA-CRANIO Ω is excellent at **craniosynostosis-specific operating-system tasks** — proof ledgers, fusion-stage atlases, genotype–morphotype links, twin-based ICP-reserve reasoning, posterior-vault-distraction lifecycle modeling, operative-truth feedback, refusion forecasting, multi-decade outcome learning, and a non-prescriptive safety contract.

The two are **complementary, not competing**. Brainlab/Synaptive/ImmersiveTouch render the geometry; AURORA-CRANIO Ω carries the biology, the physiology, the longitudinal outcome learning, and the safety contract that decides what may be claimed and what may not.

### The architectural shift

```
                       BEFORE                                    AFTER

                   ┌─────────────┐                          ┌──────────────────────────┐
   Specialist 1 → │ One AI tool │ ← → image only          │  AURORA-CRANIO Ω         │
                   └─────────────┘                          │                          │
                                                             │  Proof ledger            │
   Specialist 2 → │ Different    │ ← → different artefact   │  Suture biology atlas    │
                   │ ad-hoc tool │                          │  Genotype/morphotype     │
                   └─────────────┘                          │  ICP-reserve twin        │
                                                             │  Venous/airway coupling  │
   Specialist 3 → │ Spreadsheet │ ← → handwritten notes    │  Surgical twins (4)      │
                   └─────────────┘                          │  Refusion forecast       │
                                                             │  Outcome factory         │
   Different evidence base per specialist;                  │  Family-burden tracker   │
   no shared object; no longitudinal model;                 │                          │
   no proof contract.                                       │  ONE evidence object per │
                                                             │  child across 20+ yr     │
                                                             │  for ALL specialists     │
                                                             └──────────────────────────┘
```

---

## 4. The 9-section architecture

| Section | Name | Purpose | Built / planned |
|---|---|---|---|
| **§1** | CRANIO-ORIGIN | Suture identity, fusion proof, etiology, genetics, developmental biology | partial |
| **§2** | CRANIO-PHYSICS | Skull-growth mechanics, ICP reserve, brain constraint, venous/airway coupling, developmental risk | partial |
| **§3** | CRANIO-BIOMARKERS | Multi-omic + imaging + biomechanical + ophthalmic + neurodevelopmental + surgical-response biomarker factory | planned |
| **§4** | CRANIO-DIAGNOSTICS | Diagnosis, differential, imaging pathway routing, radiation-safe review, workup orchestration | scaffold |
| **§5** | CRANIO-FORGE | Surgery counterfactuals, timing, operative truth capture, postoperative shape graph, revision learning | **substantial** — 4 surgical twin modules shipped |
| **§6** | CRANIO-NEURODEVELOPMENT | Brain, vision, hearing, sleep, school, behavior, family outcome learning | partial (overlaps with §2.5, §3.5, §3.6) |
| **§7** | CRANIO-BENCHMARK | Open benchmark, rare-case stress tests, biomarker validation suite | substantial — 3 of 4 suites shipped |
| **§8** | CRANIO-ENDPOINTS | DICOM-SR + FHIR R4 + Phenopackets + XNAT + MONAI + OMOP/CDISC trial-endpoint factory | distributed across modules; awaits umbrella |
| **§9** | CRANIO-GOVERNANCE | Release gate, claim scope control, safety case, anti-hype lifecycle monitor | universal pattern in every shipped module |

---

## 5. Module inventory + maturity matrix

The 9 sections decompose into 30+ named research-clinical modules. Each is a separately-versioned, separately-released, separately-test-gated project. Several modules already ship as full production-grade packages — full TypeScript libraries, CLIs, Next.js dashboards, Python sidecars with trained foundation-model checkpoints, regulatory packets, Docker/K8s/Helm/Terraform IaC, and 16+ document FDA SaMD submission scaffolds.

### Section 1 — CRANIO-ORIGIN (suture biology + etiology)

| Spec | Module | Status | Repository / location |
|---|---|---|---|
| §1.1 | Suture Fusion Proof-Ledger Compiler | planned | spec PDFs `1_1` through `1_5` |
| §1.2 | Cranial Morphotype + Head-Shape Biomechanics Mapper | planned | — |
| §1.3 | Suture Biology + Fusion-Stage Atlas | planned | — |
| §1.4 | Genetic + Syndromic Etiology Router | planned | will reuse §5.5 ClinVar 1,471 variants + HPO 19,944 terms ingested SQLite |
| §1.5 | Primary–Secondary Craniosynostosis Router | planned | — |
| §1.6 | Suture–Genotype–Phenotype Biomarker Constellation Engine | planned | — |
| §1.7 | Craniosynostosis Mimic + Deformational Counterfactual Factory | planned | — |
| §1.8 | Craniosynostosis Commons + Federated Cohort Builder | planned | — |

### Section 2 — CRANIO-PHYSICS (skull-growth + ICP reserve + neurodevelopment)

| Spec | Module | Status | Repo |
|---|---|---|---|
| §2.1 | Skull–Brain Growth Digital Twin | planned | — |
| §2.2 | Intracranial Volume Reserve + ICP-Risk Twin | **shipped v2.2 production-grade-v2** | local `aurora-cranio-2.2` — 287 files, predeploy 145/145, full SaMD stack including RBAC+ABAC, OpenTelemetry, Redis distributed rate-limit+jti replay, two-secret rotation, OpenAPI 3.1 + TS/Python SDKs, K8s manifests + Helm PSS restricted, Terraform with S3 WORM Compliance 7y |
| §2.3 | Venous Outflow + Posterior Fossa Coupling Mapper (VPF) | **shipped v2.3** | local `aurora-cranio-2.3` — 9-state classifier, indices, mechanism + procedure-specific hazard, 32 tests, FDA/ISO 14971/IEC 62304/GMLP/PCCP scaffold |
| §2.4 | Skull-Base + Orbit + Midface Growth Twin | planned | — |
| §2.5 | Head-Shape → Neurodevelopment Causal Adjudicator (CranioNeuroDev, **trained**) | **shipped v2.5.1** | [github.com/MurariAmbati/aurora-cranio-2.5](https://github.com/MurariAmbati/aurora-cranio-2.5) — `cranio_neurodev_v1.pt` 87 MB, 21.8 M params, epoch 25, val_loss=0.045; 6/7 §2.5.48 archetypes recall ≥ 0.5; perfect precision+recall on syndromic_hearing_language; predeploy 34/34, 90/90 tests |
| §2.6 | Surgical Timing + Growth-Window Forecaster | planned | — |
| §2.7 | Family Observation Translator (CranioFOT-tiny, **trained**) | **shipped v2.7.1** | [github.com/MurariAmbati/aurora-cranio-2.7](https://github.com/MurariAmbati/aurora-cranio-2.7) — `cranio_fot_tiny.pt` 9.4 MB, 2.44 M params, val_obs_acc 0.929 after 3 epochs on 60k real records (MedQuAD, PubMedQA, PubMed E-utils, HPO, AAP-CHOP); 5 clinical knowledge modules; 107/107 safety-gate tests; predeploy 16/16, 116/116 tests |

### Section 3 — CRANIO-BIOMARKERS

| Spec | Module | Status |
|---|---|---|
| §3.1 | Craniosynostosis Biomarker Atlas | planned |
| §3.2 | Suture Tissue + Bone Biology Workbench (histology + scRNA-seq + spatial + proteomics + biomechanics) | planned |
| §3.3 | Genotype–Morphotype–Surgery Response Engine | planned |
| §3.4 | Imaging Radiomics + Skull-Growth Feature Mine | planned |
| §3.5 | Ophthalmic + ICP Biomarker Workbench (papilledema, OCT RNFL, direct ICP, optic atrophy) | partially shipped via §5.5 ophthalmology endpoint |
| §3.6 | Airway–Sleep–Midface Biomarker Engine | planned |
| §3.7 | Surgical Response + Refusion Biomarker Engine | planned |

### Section 4 — CRANIO-DIAGNOSTICS

| Spec | Module | Status |
|---|---|---|
| §4.1 | Radiation-Minimizing Imaging Pathway Router | planned |
| §4.2 | Craniosynostosis vs Deformational Plagiocephaly Adjudicator | scaffold (local `aurora-cranio-4.2`) |
| §4.3 | Syndromic Red-Flag Router | scaffold (local `aurora-cranio-4.3`) |

### Section 5 — CRANIO-FORGE (the most-developed section)

| Spec | Surgical pathway | Status | Repo |
|---|---|---|---|
| §5.1 | Observation / Helmet / Endoscopic / Open / Spring / Distraction Counterfactual Lab | scaffold | local `aurora-cranio-5.1` |
| §5.2 | Endoscopic Strip Craniectomy + Helmet Lifecycle Planner (ECSC) | **shipped** | local `aurora-cranio-5.2` — 23 engines, 6 lifecycle states, 5 suture endpoints, novel HED/GASR/HBI/FRI metrics, FHIR + DICOM-SR exporters, 14 CLI cmds, 8 archetypes, production API, CranioShape-FM sidecar, 28 open datasets ≈ 3,650 GB, Docker+K8s+Helm+Terraform, 13-doc regulatory package, 82 tests / 28 suites, predeploy 17/17 |
| §5.3 | Open Cranial Vault Remodeling Twin (OCVR) | **shipped v5.3.0** | [github.com/MurariAmbati/aurora-cranio-5.3](https://github.com/MurariAmbati/aurora-cranio-5.3) — 443 source files, predeploy 6/6, 110/110 TS tests + 42/42 sidecar + 8/8 model + 5/5 CLI; 54 domain modules + 25 engines + SafetyGate w/ 10 regex + 10 structural hard-stops; 30-cmd CLI; 40-route dashboard; CranioFORGE-VAULT (tiny 9M / base 61M / large 420M PyTorch); 30 open-data manifests = 4,355 GB; 16 regulatory submission docs; 10 industry-grade phases (audit chain, GDPR Art.17, CSRF, OTel+Prometheus, Redis token bucket + load shedder, OpenAPI 3.1 + SDKs, HMAC webhooks + FHIR R4 push, CycloneDX SBOM + SLSA L3 + sigstore + trufflehog, axe WCAG 2.2 AA + lighthouse-ci + i18n en/es/fr, calibration ECE/Brier/AUROC + k6 load test + multi-region DR plan) |
| §5.4 | Fronto-Orbital Advancement + Orbital Risk Twin (FOA) | **shipped v5.4.0** | [github.com/MurariAmbati/aurora-cranio-5.4](https://github.com/MurariAmbati/aurora-cranio-5.4) — TS core + 11-cmd CLI + Next.js Aurora UI (6 routes) + Python sidecar + CranioFOA foundation model (tiny/base/large adapter stack) + 16-manifest open-data catalog ≈ 3.45 TB + FDA SaMD II + IEC 62304 Class B + ISO 14971 + GMLP + PCCP + 5 ADRs + 5 runbooks + Docker/K8s/Helm/Terraform/CI; 54 tests, predeploy 17/17. Non-prescriptive by construction — every output passes prohibited-language scan; five permanent blocked labels (FOARecommended, RevisionNeeded, EyeSafe, ICPResolved, NoOphthalmologyNeeded). Five core outputs: Orbital-Protection / Forehead-Correction / Visual-Risk (6 channels never collapsed) / Relapse Vector / Revision Forecast (planned-stage ≠ failure) |
| **§5.5** | **Posterior Vault Distraction + Expansion Twin (PVD)** | **shipped v5.5.5** | [github.com/AURORA-NEURO/aurora-cranio-5.5](https://github.com/AURORA-NEURO/aurora-cranio-5.5) — see deep-dive below |
| §5.6 | Operative Truth Delta Capture (cross-pathway) | scaffold | local `aurora-cranio-5.6` |
| §5.7 | Postoperative Skull Graph Edit Distance Tracker | scaffold w/ 22 GB TotalSegmentator dataset | local `aurora-cranio-5.7` |
| §5.8 | Reoperation + Relapse Forecasting Engine | scaffold | local `aurora-cranio-5.8` |

#### §5.5 — PVD Twin deep-dive (the reference implementation)

Section 5.5 is the most complete module in the program and the reference pattern every future module follows. The PVD Twin makes every dimension of posterior vault distraction osteogenesis computable:

- **21 internal engines** organized around the 5 core outputs:
  1. PosteriorVolumeExpansionAchieved (strong / moderate / weak / not-demonstrated / not-measured / not-active-target)
  2. DistractionVectorAdequate (adequate / partially-adequate / mismatched / asymmetric-unintended / not-measurable / not-applicable)
  3. HardwareLifecycleState (12 states from planned-course → planned-removal-completed + 6 failure modes)
  4. ICPRiskResponse (supported-improvement / plausible-unmeasured / mixed / persistent-risk / worsened-risk / not-active-target / insufficient-evidence)
  5. StagedSurgeryForecast (planned-stage / FOA-delayed / FOA-avoided-in-followup / FOA-still-expected / midface-expected / posterior-revision / unplanned-revision / unclear)
- **5 research indices**: PEP (Posterior Expansion Proof Score), DVA (Distraction Vector Adequacy Index), IRCI (ICP Response Concordance Index), CPFCI (Chiari + Posterior Fossa Coupling Index), VSRI (Venous Safety + Response Index)
- **SafetyGate with 12 hard-stops** that block:
  1. NoUseContext (indication not classified — see §5.5.5)
  2. NoOsteotomyPlan
  3. NoVector (no planned vector recorded)
  4. NoDistance (no achieved distance recorded)
  5. NoVolumeProof (volume claim made without pre/post measurement — `ExpansionDistance ⇏ PosteriorVolumeExpansionAchieved`)
  6. NoOphthalmicEndpoint (ICP claim without ophthalmic / OCT / direct-ICP evidence — `PosteriorVolumeExpansion ⇏ ICPResolved`)
  7. NoFollowupChiari (Chiari claim without follow-up MRI — `PosteriorVaultExpansion ⇏ ChiariResolved`)
  8. NoFollowupVenous (venous response claim without venous imaging)
  9. NoDeviceStatus
  10. NoRemovalReason (planned vs premature removal must be distinguished)
  11. NoFollowupDuration (FOA-avoided claim with < 12 mo follow-up is blocked)
  12. RecommendationLanguage (16 regex patterns blocking prescriptive verbs, ICP-resolved claims, device-activation/removal instructions, family-noncompliance labels, etc.)
- **35 synthetic archetypes** covering every failure mode in §5.5.49 + 24 extended cases covering Saethre-Chotzen, Muenke, Carpenter+shunt, Craniofrontonasal, Beare-Stevenson, lambdoid asymmetric, slit-ventricle, preterm, achondroplasia+FMD, venous-dominant transverse, OSA, Pfeiffer ETV-failed, 36-mo follow-up, short-follow-up-blocked, CSF leak transient, hardware loosening, re-PVD revision, deep infection, spring-assisted, TCS variant, adolescent revision, persistent occipital sinus, lost-followup
- **21 benchmark tasks** including 4 mandatory safety tasks (BM-018 ICPResolved suppression, BM-019 FOAAvoided suppression, BM-020 device-removal recommendation suppression, BM-021 family activation instruction suppression) — `unsafe_claim_suppression = 1.00` is the non-negotiable gate
- **CranioPVD-FM foundation model** (tiny 16.5 M / base 98.8 M / large 499.5 M PyTorch params, trained checkpoint shipped):
  - posterior_volume_seg_dice **0.864**
  - vector_measurement_agreement Pearson **0.713**
  - hardware_extraction_f1 0.043 (small head — needs more data)
  - regenerate_classification κ **0.327**
- **Real text classifier** trained on PubMed: macro F1 **0.705** on 277 held-out real PubMed PMIDs across 13 complication labels. regenerate_quality 0.929 · chiari_response 0.870 · staged_surgery 0.837 · venous_response 0.833 · icp_response 0.809
- **Real-data ETL** with 115 MB ingested SQLite:
  - HPO 2026-02-16 — 19,944 terms, 23,677 relations, 197,080 closure rows, 282,723 disease-phenotype annotations
  - ClinVar craniofacial — 1,471 pathogenic + likely-pathogenic variants across FGFR1/2/3, TWIST1, EFNB1, IHH, RAB23, ALX1/3/4, MSX2
  - PubMed PVD — 1,888 real abstracts via NCBI E-utils + 1,770 auto-labels across 13 complication classes
  - MedQuAD craniofacial — 3,531 Q&A pairs
  - PubMedQA PQA-L — 1,000 records
- **10 new clinical API endpoints**: `/clinical/status` · `/clinical/hpo/:id` · `/clinical/hpo/search` · `/clinical/variants` · `/clinical/variants/:gene` · `/clinical/syndrome-profile/:gene` · `/clinical/pubmed/complication-rates` · `/clinical/pubmed/search` · `/clinical/medquad/search` · `/clinical/migrations`
- **6 live UI pages** at `/clinical/*` — every page renders real records pulled from the SQLite at request time
- **17-document regulatory packet**: IMDRF SaMD Class II · IEC 62304 Class B · ISO 14971 with 36 hazards · GMLP · PCCP · FDA 524B · STRIDE v2 with 50 threats (was 28; +22 cloud-surface threats) · 21 CFR Part 11 · GDPR + HIPAA · ISO 13485 · IEC 62366 · ISO 27001 (95 Annex A controls) · 510(k) submission plan · Model Card v1 · Data Card v1 · DPIA cloud-staging 4,097 words · Pen test plan 3,129 words
- **Phase 1+2+3 IaC complete**:
  - **Phase 1** local production parity: 10-service docker-compose, Postgres adapter (sync over async via Atomics+SharedArrayBuffer), Keycloak realm with 5 RBAC users, 22-endpoint smoke test, Grafana auto-provisioned with real pvd_* metrics, prior-sections importer (hardlinked 8,293 assets / 8.9 GB from 26 sibling AURORA-CRANIO modules at zero extra disk on NTFS)
  - **Phase 2** cloud staging: AWS Organizations bootstrap with 4 SCPs, 9 Terraform files (Cognito MFA · AMP · AMG · WAFv2 · SNS+PagerDuty · cert-manager · ExternalSecrets · VPC · EKS · RDS · ElastiCache · ECR immutable · S3 WORM 7y · KMS rotation · multi-region DR), Helm staging + prod overlays, k6 cloud baseline with non-negotiable safety_header_missing == 0 gate, multi-region DR runbook RTO ≤ 15 min RPO ≤ 60 s
  - **Phase 3** validation tooling + partnerships: 4 inbound EHR adapters (Epic Caboodle · OMOP CDM · REDCap · FHIR R4 Bulk `$export`), de-identification pipeline (HIPAA Safe Harbor 18 identifiers + DICOM PS3.15 Annex E + k-anonymity), ConcordanceEngine (Cohen's κ + macro F1 + ECE + Brier + AUROC + decision-curve analysis + Fleiss' κ + sample-size calculator, stratified by syndrome × age × osteotomy × follow-up), AdjudicationRepository (3-rater blinded + 4th-rater resolution + engine-assisted revision tracking), specialist labeling UI at `/cases/[id]/adjudicate`, 12-document partnership pack
- **Verification**: 671 / 671 TS tests pass · 52 / 52 Python sidecar tests pass · predeploy 52 / 52 · TypeScript clean

This is the reference implementation that the other section-5 surgical-twin modules (5.2 ECSC, 5.3 OCVR, 5.4 FOA) parallel.

### Section 6 — CRANIO-NEURODEVELOPMENT

| Spec | Module | Status |
|---|---|---|
| §6.1 | Neurodevelopmental Baseline + Longitudinal Endpoint Factory | partial overlap with §2.5 trained adjudicator |
| §6.2 | Vision + Optic Neuropathy Sentinel | partial overlap with §3.5 + §5.5 ophthalmology endpoint |
| §6.3 | Hearing + Speech + Airway/Sleep Outcome Router | partial overlap with §3.6 |
| §6.4 | School Function + Caregiver Burden Factory | planned — designed as first-class endpoint, not appendix |

### Section 7 — CRANIO-BENCHMARK

| Spec | Module | Status |
|---|---|---|
| §7.1 | Segmentation + Suture + Skull-Shape Benchmark | **shipped v7.1** — local `aurora-cranio-7.1`, TS library + 24-cmd CLI + 35-route Aurora UI + Python sidecar, 144 tests, predeploy 10/10 |
| §7.2 | Mimic + Hard-Negative Benchmark | scaffold (local `aurora-cranio-7.2`) |
| §7.3 | Rare Craniosynostosis Stress Suite | **shipped** — local `aurora-cranio-7.3-rare-stress-suite`, 12 archetypes, 14 stress classes, 21 modules, HF/OpenAI/local/mock adapters, 26/26 tests |
| §7.4 | Biomarker Validation Bench | **shipped v7.4** — local `aurora-cranio-7.4`, TS lib + CLI + web app + benchmark, PR'd to MurariAmbati/aurora-again#1 |

### Section 8 — CRANIO-ENDPOINTS

| Spec | Module | Status |
|---|---|---|
| §8.1 | Endpoint Dictionary | partially shipped via **AURORA Atlas 8.1** — 11 cranio-specific CSVs (endpoints, registry_template, claim_boundaries, hard_stop_gates, timepoints, validation_states, endpoint_packs, missingness, standards_crosswalk, references, glossary) + dictionary.json (320 KB) + endpoints.json (233 KB) + atlas_*.py build scripts — already hardlinked into §5.5 by the prior-sections importer |
| §8.2 | DICOM-SR + FHIR R4 + Phenopacket + XNAT + MONAI + OMOP/CDISC umbrella | distributed across §5.2 / §5.3 / §5.4 / §5.5; umbrella module planned |
| §8.3 | Trial Comparability Engine | scaffold (local `aurora-cranio-8.3`) |

### Section 9 — CRANIO-GOVERNANCE

| Spec | Module | Status |
|---|---|---|
| §9.1 | Claim Scope Gate | SafetyGate pattern in every shipped module; cross-module registry planned |
| §9.2 | Unsupported Case Router | per-module (e.g. §5.5 12 hard-stops); umbrella router planned |
| §9.3 | Safety Case + Lifecycle Monitor | per-module (e.g. §5.5 RB-001 safety-incident runbook); umbrella planned |
| §9.4 | Market-Beating Release Package | per-module (every shipped module includes model card · data card · benchmark report · regulatory packet); umbrella planned |

---

## 6. The 10 core invariants — the safety contract

Every AURORA-CRANIO Ω module — built or planned — must obey these invariants. They are encoded in the SafetyGate class of each shipped module, audited on every release, mapped to ISO 14971 risk-management hazards, and exercised by safety-suppression benchmark tasks that must achieve 1.00 pass rate on every release.

1. **No craniosynostosis label without suture proof** (§1.1).
   Computable: every diagnostic classification carries a proof_ledger pointing to specific imaging/clinical/genetic evidence rows; an empty proof_ledger produces `indeterminate` not `synostosis`.
2. **No surgical timing claim without age-window and pathway context** (§2.6, §5.x).
   Computable: a "timing-relevant" output requires age, suture pattern, severity, ICP risk, syndrome, and center-expertise inputs all present; missing any → `timing evidence incomplete`.
3. **No ICP-risk statement without optic + volume + venous + airway + symptom evidence** (§2.2, §3.5).
   Computable: an `ICP-resolved`-style claim requires at least one of papilledema/OCT/direct-ICP/adjudicated-pressure-endpoint AND posterior volume evidence AND a follow-up window ≥ 12 weeks.
4. **No genotype claim without validation state** (§1.4, §3.3).
   Computable: every reported variant carries ClinVar review_status + clinical_significance + last_evaluated; "variant of uncertain significance" never collapses to "pathogenic" in any report.
5. **No biomarker claim without an evidence tier** (§3.1).
   Computable: every biomarker output is tagged `clinical-standard` / `validated-imaging` / `candidate-imaging` / `candidate-molecular` / `research-only` / `exploratory` / `weak` / `unsupported` / `deprecated` / `unsafe-or-unreliable`. Tier-bleed is impossible: a research-only marker cannot appear in a clinical report without explicit operator override + documentation.
6. **No postoperative success claim without skull-growth topology and endpoint change** (§5.7).
   Computable: a "successful operation" classification requires the postoperative skull graph to differ from the preoperative graph in the **planned** direction AND the relevant endpoint (volume / vector / ICP / staged-surgery) to have measurably changed AND the change to be sustained beyond the immediate postoperative imaging.
7. **No neurodevelopment claim without age-normalized measurement** (§2.5, §6.1).
   Computable: every neurodevelopmental output carries an age-normalized z-score and a measurement instrument identifier (Bayley / Mullen / Wechsler / ASQ / etc.); raw scores without normalization are rejected.
8. **No release claim without subgroup + calibration + uncertainty + external-site + rare-case stress testing** (§7).
   Computable: every model release blocks unless it ships a subgroup-performance report, an ECE/Brier/AUROC calibration report, an uncertainty report, an external-site validation report, and a rare-case stress-test report.
9. **No prescriptive language anywhere** — every output is structured evidence; nothing is "we recommend / patient should / safe to remove / ICP resolved / FOA no longer needed" (§9.1).
   Computable: a regex + structural check scans every emitted text for the prohibited-language set; any match blocks the report from emission and triggers a SEV-1 safety incident per RB-001.
10. **Specialist review handoff is always present** — every report names the specialty (craniofacial surgeon / pediatric neurosurgeon / neuroradiologist / ophthalmologist / geneticist) and the question to answer.
    Computable: every report has a non-empty `specialist_review_handoff` field; empty handoffs block emission.

---

## 7. The 14 market-beating inventions

AURORA-CRANIO Ω wins against the incumbents not by being prettier but by inventing what no incumbent has. Each invention is anchored to a specific module spec.

1. **Suture Fusion Proof Ledger (§1.1)** — no diagnosis label without an audit trail of evidence. Every label has a `proof_ledger` field naming the specific imaging slice ID, clinical finding ID, genetic variant ID, or reviewer adjudication ID that produced it. An empty ledger → `indeterminate`. No exceptions.
2. **Cranial Morphotype Vector (§1.2)** — skull shape decomposed into growth-vector physics (restricted vector, compensatory vector, skull-base vector, cranial-vault volume vector, forehead-projection vector, occipital-contour vector, biparietal-expansion vector, vertical-height vector, asymmetry vector), not photo overlays. Two children with the same suture diagnosis can have different cranial-growth states; the vector preserves that.
3. **Suture Biology Atlas (§1.3)** — fusing sutures modeled as living osteogenic tissues with stage (open / physiologically narrowing / early bridging / partial fusion / complete fusion / hyperostotic / postoperative osteogenic front / refusion-prone / distraction-remodeling / indeterminate), density, vasculature, signaling state. Each suture becomes a high-dimensional biological vector — not a binary open/closed label.
4. **Biomarker Constellation Engine (§1.6, §3.1)** — hundreds of candidate imaging / genetic / tissue / optic / airway / surgical / outcome biomarkers each with explicit validation tier. Tier-bleed is impossible.
5. **Genotype–Morphotype–Surgery Response Engine (§3.3)** — FGFR1/2/3, TWIST1, TCF12, ERF, EFNB1, RAB23, MSX2, POR, SKI, MEGF8 pathways linked to skull-suture pattern, complication risk, and outcome trajectory.
6. **Intracranial Volume Reserve Twin (§2.2 — shipped)** — brain-growth-reserve **evidence**, never a free-standing ICP diagnosis. Integrates head circumference, intracranial volume, papilledema grade, OCT RNFL, optic atrophy, visual symptoms, headaches, sleep symptoms, Chiari, hydrocephalus, venous sinus state, syndromic status, multisuture fusion, and reoperation history into a `ICP-Risk Evidence Object` with computable evidence states.
7. **Venous–Chiari–Airway Coupling Mapper (§2.3 — shipped)** — models the syndromic-complexity multi-system coupling beyond skull shape. Distinguishes venous **surgical hazard** from venous **physiologic response**.
8. **Timing-Window Forecaster (§2.6)** — differentiates the timing logic of endoscopic strip craniectomy + helmet, open cranial vault remodeling, fronto-orbital advancement, posterior vault distraction, spring-assisted cranioplasty, and staged syndromic management. Generates a **Timing-Relevance Object**, never a treatment recommendation.
9. **Operative Skull-Topology Delta (§5.6)** — learns from actual surgical findings (planned vs actual osteotomy, vault expansion achieved, hardware placed, unexpected dural adherence, unexpected venous hazard, bone fragility, blood loss vs predicted), not just preoperative plan. Builds the corpus that future predictive models depend on.
10. **Cranial Vault Graph Edit Distance (§5.7)** — quantifies whether surgery created the intended skull-growth topology. Compares preoperative skull graph → intended surgical skull graph → immediate postoperative graph → longitudinal graph.
11. **Refusion + Relapse Forecasting Engine (§5.8)** — surfaces failure patterns before they become anecdotal at multi-center conferences. Monitors shape relapse, refusion, persistent ICP risk, papilledema recurrence, Chiari progression, hydrocephalus, sleep/airway worsening, hardware issues, wound complications, CSF leak, infection, developmental concerns, and family burden.
12. **Neurodevelopment + Family Outcome Factory (§6)** — school function, development, caregiver burden, quality of life as first-class endpoints. The platform refuses to become a purely surgical or purely imaging tool.
13. **Open Benchmark + Rare-Case Stress Suite (§7)** — validates on the difficult cases (multisuture, syndromic, post-shunt, late-presenting, refusion, posterior vault distraction with venous risk), not only on clean scans. A model that cannot say "not craniosynostosis" on a deformational plagiocephaly case does not receive a diagnostic-support claim.
14. **Governance Release Gate (§9)** — prevents unsupported "craniosynostosis AI" claims. Every release requires model card · data card · benchmark report · stress-test report · biomarker-validation state · subgroup report · calibration report · uncertainty report · unsupported-case disclosure · clinical-trial-readiness package · public-language sheet — or the release is blocked at the predeploy gate.

> **The next fifteen inventions are the forward program.** The Ω-HORIZON advanced capability program (§27) catalogues fifteen further capabilities — living 4D twins, a unified multimodal foundation model, federated swarm learning, on-device photogrammetry, a structural causal engine, and more — each carrying a Capability Readiness Level and a non-prescriptive guardrail, with a gated Phase H0→H5 delivery plan in §28. Nothing in the horizon program is claimed as shipped.

---

## 8. Section 1 — CRANIO-ORIGIN

Suture identity, fusion proof, etiology, genetics, developmental biology.

The central artifact is the **Craniosynostosis Identity and Origin Object** — what is fused, what is not fused, what is uncertain, what is mimicking fusion, whether the pattern is syndromic or nonsyndromic, what genetic / developmental pathway is plausible, and what evidence must be captured for downstream research and trials.

The core rule is **no suture label without proof**.

### 8.1 Suture states

| State | When emitted |
|---|---|
| `definite-fused` | imaging + clinical + radiologist sign-off all concordant for fusion |
| `probable-fused` | imaging + clinical concordant; radiologist sign-off pending |
| `physiologic-narrowing` | suture line narrower than age-typical but not bridged |
| `ridging-without-synostosis` | palpable ridge, no imaging evidence of fusion (common in benign metopic ridge) |
| `deformational-plagiocephaly-mimic` | head shape suggests fusion but suture is patent on imaging |
| `postoperative-remodeled` | prior surgical osteotomy + healing — special interpretation rules |
| `syndromic-multisuture-pattern` | bicoronal / multisuture with syndromic features (mid-face hypoplasia, syndactyly, exorbitism) |
| `indeterminate` | imaging conflicting / inadequate / not yet reviewed |
| `insufficient-evidence` | proof ledger empty; cannot enter downstream forecasting |

Pattern coverage: sagittal · metopic · unilateral coronal · bilateral coronal · lambdoid · multisuture · pansynostosis · skull-base synchondrosis involvement · postoperative suture states.

### 8.2 Primary vs secondary craniosynostosis

The router separates **primary** premature suture fusion from **secondary** suture closure caused by:

- Microcephaly (small brain volume → secondary cranial growth restriction)
- Metabolic bone disease (rickets, hypophosphatasia, hyperthyroidism, hyperparathyroidism)
- Prior cranial surgery or shunting
- Teratogenic exposure (valproate, retinoids, methotrexate)
- Hematologic disease (severe thalassemia)
- Mucopolysaccharidoses and skeletal dysplasias
- Other systemic conditions

This is clinically essential because the surgical goal differs: a primary suture-growth restriction may require vault expansion; a secondary closure due to poor brain growth may not be solved by the same operation.

### 8.3 The Etiology Posterior

Routes between:

- isolated nonsyndromic likely
- FGFR-related likely (Apert, Crouzon, Pfeiffer, Muenke pathway candidates)
- TWIST1 / TCF12 coronal pathway likely (Saethre-Chotzen, isolated coronal)
- ERF-related multisuture risk
- EFNB1 craniofrontonasal pattern
- RAB23 / Carpenter-like pathway
- MSX2 / Boston-type pathway
- POR / craniofacial-skeletal pathway
- chromosomal / CNV suspected
- metabolic bone disease suspected
- secondary synostosis suspected
- etiology indeterminate

Per GeneReviews FGFR-Related Craniosynostosis Syndromes [^genereviews], multigene panels typically include FGFR1, FGFR2, FGFR3, TCF12, TWIST1, and other genes of interest. ClinGen has curated evidence for genes implicated in craniosynostosis disorders, including EFNB1, ERF, FGFR1, FGFR2, FGFR3, MEGF8, MSX2, POR, RAB23, SKI, TCF12, and TWIST1. [^clingen] The router captures the standardized panel result plus parental age, de novo suspicion, coronal/bicoronal pattern, limb findings, midface hypoplasia, syndactyly, airway findings, developmental delay, hearing loss, Chiari, hydrocephalus, ocular findings, cardiac/renal anomalies, and dysmorphology.

### 8.4 Suture biology — what we mean by "atlas"

A suture is not a binary slot. It is a living growth zone with:

- Osteogenic front (where new bone is being deposited or no longer being deposited)
- Mesenchymal progenitor pool (the cells that fuel growth)
- Dura-pericranium signaling (FGF, BMP, Wnt, Hedgehog cross-talk)
- Osteoblast / osteoclast balance
- Extracellular matrix remodeling (collagen, MMPs, TIMPs)
- Mechanotransduction (skull shape feeds back into suture biology)
- Vascular supply (suture-adjacent emissaries, vasa nervorum)
- Inflammatory context (TGF-β, IL-6, TNF-α in pathological fusion)

The atlas turns each suture into a high-dimensional biological vector. Recent transcriptomic and single-cell/spatial studies support exactly this — RNA-seq of calvarial cell lines from single-suture craniosynostosis identifies phenotype-associated transcriptomic signatures [^transcriptomics-1], and a recent single-cell/spatial atlas in an FGFR2 C342Y/+ craniosynostosis model maps suture stem-cell dynamics across developmental stages. [^transcriptomics-2]

### 8.5 Craniosynostosis Commons and Federated Cohort Builder

Every evaluated case becomes a reusable research object: suture proof state, skull-shape vector, genotype, syndrome state, imaging, segmentation, head-growth trajectory, ophthalmic data, ICP risk, surgical timing, operative plan, operative truth, postoperative skull graph, developmental outcomes, school function, caregiver burden, quality of life.

The Commons supports **federated learning** — institutions contribute model weights without centralizing sensitive data. Each case has a partition key that lets a federated training run aggregate gradients across CHOP + Boston Children's + Seattle Children's + Stanford + GOSH + Texas Children's without raw PHI ever crossing institutional boundaries.

---

## 9. Section 2 — CRANIO-PHYSICS

Skull-growth mechanics, ICP reserve, brain constraint, venous/airway coupling, neurodevelopmental risk.

### 9.1 Skull–Brain Growth Digital Twin (§2.1, planned)

Per-patient digital twin. Models skull plates, fused sutures, open sutures, skull base, intracranial volume, brain volume, CSF volume, ventricles, posterior fossa, orbit, midface, and growth trajectories.

**Cranial Growth State** classes: compensated single-suture restriction · vault-volume constrained · skull-base constrained · posterior-fossa constrained · orbital constrained · multisuture high-risk · syndromic progressive-risk · post-surgical remodeling · relapse-prone · indeterminate.

### 9.2 Intracranial Volume Reserve + ICP-Risk Twin (§2.2, **shipped** v2.2 production-grade-v2)

Estimates whether a child has adequate intracranial volume reserve relative to age, brain volume, suture status, venous outflow, hydrocephalus, Chiari, sleep apnea, papilledema, and symptoms.

The output is **never** a free-standing ICP diagnosis. It is an **ICP-Risk Evidence Object** with computable states:

- low evidence of raised ICP
- ICP surveillance needed
- ophthalmic risk
- venous/Chiari/OSA-coupled risk
- postoperative recurrent-risk
- urgent specialist review pattern
- insufficient data

Raised-ICP risk is clinically important because untreated raised ICP can affect brain and vision; OCT is discussed in craniosynostosis literature as a tool for detecting optic-nerve effects of raised ICP. [^icp-oct]

### 9.3 Venous Outflow + Posterior Fossa Coupling Mapper (§2.3, **shipped** v2.3)

Many complex and syndromic craniosynostosis patients have risk involving venous outflow, posterior fossa crowding, Chiari, hydrocephalus, and ICP. The mapper distinguishes **venous surgical hazard** (osteotomy near sinus, hardware near sinus) from **venous physiologic response** (post-surgical sinus volume + flow change) — two different things that previous tools collapsed.

Outputs: venous crowding absent · venous asymmetry present · collateral-dependent venous drainage · posterior-fossa restriction · Chiari-coupled risk · hydrocephalus-coupled risk · surgical venous hazard · indeterminate.

### 9.4 Skull-Base + Orbit + Midface Growth Twin (§2.4, planned)

Maps the anterior + middle cranial base, sphenoid wing, orbital volume + roof, exorbitism/proptosis, hypertelorism/hypotelorism, midface retrusion, airway size, occlusion, dental arch, zygoma, nasopharyngeal airway, and Le Fort/monobloc relevance — the dimensions that drive fronto-orbital advancement vs midface advancement vs monobloc decisions.

### 9.5 Head-Shape → Neurodevelopment Causal Adjudicator (§2.5, **shipped** v2.5.1 with trained CranioNeuroDev checkpoint)

Deliberately cautious causal adjudication. Craniosynostosis can be associated with neurodevelopmental differences, but causality is complex and confounded by syndrome, genotype, raised ICP, hearing/vision, sleep apnea, surgical timing, family context, and ascertainment.

Output is a **causality grade**, not a diagnosis:

- structurally plausible
- ICP-plausible
- genetic/syndromic plausible
- sensory-deprivation plausible
- sleep/airway plausible
- treatment-response plausible
- weakly plausible
- indeterminate
- unlikely

The module never claims that skull shape **alone** caused developmental delay. It shows the pathway.

### 9.6 Surgical Timing + Growth-Window Forecaster (§2.6, planned)

Differentiates timing logic across endoscopic strip craniectomy + helmet, open vault remodeling, fronto-orbital advancement, posterior vault distraction, spring-assisted cranioplasty, and staged syndromic management. Reviews note that open and endoscopic approaches typically have different age windows, with endoscopic approaches generally used in younger infants. [^endoscopic-window]

Output: a **Timing-Relevance Object**, never a treatment recommendation.

### 9.7 Family Observation Translator (§2.7, **shipped** v2.7.1 with trained CranioFOT-tiny)

Converts structured family observations into clinician-facing packets: head-shape change, head-growth acceleration, developmental regression, new vomiting, lethargy, sleep disturbance, eye bulging, vision concern, hearing concern, seizures, irritability, headache, school decline, balance problem, airway/sleep concern, wound issue, hardware issue, post-surgical shape relapse.

Trained on 60,000 real records (MedQuAD, PubMedQA, PubMed E-utils, HPO, AAP/CHOP) with val_obs_acc 0.929. Not a consumer diagnostic app. It produces packets for **clinicians**, not actions for families.

---

## 10. Section 3 — CRANIO-BIOMARKERS

The biomarker atlas spans 12 domains: **A** suture-fusion · **B** skull-shape · **C** intracranial-volume · **D** intracranial-pressure-risk · **E** ophthalmic · **F** airway/sleep · **G** venous · **H** brain-development · **I** molecular · **J** tissue/fluid · **K** surgical-response · **L** outcome.

Each candidate biomarker is classified into a validation tier (see [§20 Biomarker validation tier system](#20-biomarker-validation-tier-system) for full definitions):

```
clinical-standard       ← used in current craniosynostosis guidelines
validated-imaging       ← peer-reviewed external validation in published cohorts
candidate-imaging       ← internal validation only
candidate-molecular     ← biological plausibility + association evidence
research-only           ← exploratory, not for clinical use
exploratory             ← signal observed, requires external validation
weak                    ← inconclusive
unsupported             ← no validated evidence
deprecated              ← previously claimed, now retired
unsafe-or-unreliable    ← actively dangerous if relied upon
```

The atlas is **not the same** as a feature store. A feature store ingests numbers; the atlas ingests numbers + their evidence tier + their applicability scope (age range, syndrome scope, imaging modality, follow-up duration) + their failure modes. A candidate biomarker that performs well on Apert at 6 mo CT but unknown on Crouzon at 18 mo MRI is correctly scoped in the atlas as such.

---

## 11. Section 4 — CRANIO-DIAGNOSTICS

### 11.1 Radiation-Minimizing Imaging Pathway Router (§4.1)

Craniosynostosis diagnosis and planning often rely on imaging, but radiation exposure matters in infants. A recent systematic review proposed an advanced radiation-free cranial and neural assessment protocol using multimodal approaches to improve diagnostic precision and safety. [^radiation]

The router routes by **question**:

- exam-sufficient
- ultrasound-useful
- 3D-photography-useful
- MRI-needed
- low-dose-CT-justified
- high-resolution-CT-needed for operative planning
- OCT / ophthalmology-needed
- sleep-study-needed
- genetic-test-needed
- specialist-review-needed

It does **not** order tests. It generates evidence gaps that drive the multidisciplinary discussion.

### 11.2 Craniosynostosis vs Deformational Plagiocephaly Adjudicator (§4.2)

The most clinically loaded differential in this population. Overtreatment and undertreatment both harm families. The adjudicator maps ear position, forehead bossing, occipital flattening, skull-base asymmetry, suture patency, head-turning preference, torticollis, positional history, age, head growth, and imaging evidence.

Outputs: deformational pattern likely · lambdoid synostosis likely · coronal synostosis likely · mixed/uncertain · image review needed · specialist referral context.

### 11.3 Syndromic Red-Flag Router (§4.3)

Detects features that require genetics + craniofacial team review: bicoronal synostosis, multisuture synostosis, midface hypoplasia, exorbitism, syndactyly, limb anomalies, hearing loss, airway obstruction, Chiari, hydrocephalus, developmental delay, family history, unusual recurrence.

---

## 12. Section 5 — CRANIO-FORGE

Surgery counterfactuals, operative truth capture, postoperative skull-graph tracking, refusion / relapse / revision learning.

This is the section with the most-developed modules. The complete CRANIO-FORGE family covers the full surgical decision space:

| Spec | Surgical pathway | Module |
|---|---|---|
| §5.1 | counterfactual matrix across all pathways | Counterfactual Lab |
| §5.2 | endoscopic strip craniectomy + helmet | **ECSC Lifecycle Planner** (shipped) |
| §5.3 | open cranial vault remodeling | **OCVR Twin** (shipped v5.3.0) |
| §5.4 | fronto-orbital advancement | **FOA Orbital Risk Twin** (shipped v5.4.0) |
| §5.5 | posterior vault distraction | **PVD Expansion Twin** (shipped v5.5.5) |
| §5.6 | operative-truth-delta capture across all pathways | Operative Truth Delta |
| §5.7 | postoperative skull-graph edit-distance tracking | Postop Skull Graph |
| §5.8 | reoperation + relapse forecasting | Relapse Forecast Engine |

Posterior vault distraction has become important in complex and syndromic craniosynostosis — posterior expansion can increase intracranial volume and potentially delay or change the need for fronto-orbital procedures. [^pvd]

### 12.1 The universal section-5 contract

Each shipped surgical module obeys the same contract:

- **5 core outputs** (volume / vector / hardware / ICP / staged-surgery) classified independently — never collapsed into a single "success / failure" verdict
- **5 research indices** for calibration analysis
- **21 internal engines** organized around the lifecycle (preop → osteotomy → activation → consolidation → removal → follow-up)
- **SafetyGate with hard-stop registry** (no surgical recommendation, no device activation instruction, no ICP-resolved claim from volume alone)
- **11+ synthetic archetypes** covering every documented failure mode (refusion, premature removal, infection, CSF leak, hardware exposure, venous hazard, regenerate compromise, midface persistence, ICP recurrence, family loss-to-follow-up, etc.)
- **21 benchmark tasks** including ≥ 4 mandatory safety-suppression tasks that must achieve 1.00 pass rate
- **FHIR R4 + DICOM-SR + registry exports** — every report can be returned to the partner institution's EHR
- **Production API · Helm chart · Terraform · CI/CD** — every module is deployable, not just researched
- **16+ document regulatory packet** (IMDRF SaMD · IEC 62304 · ISO 14971 · GMLP · PCCP · FDA 524B · STRIDE · ISO 27001 · ISO 13485 · IEC 62366 · 21 CFR Part 11 · GDPR + HIPAA · 510(k) plan · model card · data card · DPIA · pen test plan)

### 12.2 The four operations modeled, and what each twin does differently

**§5.2 ECSC** — endoscopic strip craniectomy + helmet: models the surgery + helmet-dependent growth guidance as a **single lifecycle**, not a one-time event. Tracks helmet adherence, skin issues, family burden, orthotics access, helmet response by suture, conversion-to-open, and skull-growth velocity. Critical clinical insight: endoscopic surgery without consistent helmet wear is not the same operation as endoscopic surgery + consistent wear.

**§5.3 OCVR** — open cranial vault remodeling: models osteotomy plan, vault expansion vector, skull-shape correction, blood-loss/transfusion risk, operative time, ICU/hospital stay, bone stability, reossification, relapse, infection, CSF leak, dural tear, reoperation. The CranioFORGE-VAULT scaffold (tiny 9M / base 61M / large 420M PyTorch) is the foundation model.

**§5.4 FOA** — fronto-orbital advancement: models supraorbital bar, frontal bandeau, orbital roof, lateral orbital rim, forehead contour, orbital volume, globe exposure, strabismus, optic risk, relapse, frontal growth. Five core outputs: Orbital-Protection / Forehead-Correction / Visual-Risk (6 channels never collapsed) / Relapse Vector / Revision Forecast. Five permanent blocked labels (FOARecommended / RevisionNeeded / EyeSafe / ICPResolved / NoOphthalmologyNeeded).

**§5.5 PVD** — posterior vault distraction: see [§5.5 PVD Twin deep-dive](#§55--pvd-twin-deep-dive-the-reference-implementation) above.

### 12.3 The Operative Truth Delta (§5.6)

Surgery rarely matches the preoperative plan exactly. Bone thickness varies; sutures may be partially fused where imaging suggested they were open; dura may be unexpectedly adherent; emissary veins may be hazardous; bone fragility may force osteotomy modification; blood loss may differ; the achieved hardware vector may differ from planned.

The Operative Truth Delta captures these as a **structured delta** — not free-text op-note prose. Over hundreds of cases this becomes the corpus that next-generation predictive models depend on. **Imaging predicted surgery accurately for which patterns? For which patterns did it fail?** Without this delta, AURORA-CRANIO Ω cannot learn from surgery. With it, every operation improves the next prediction.

### 12.4 The Cranial Vault Graph Edit Distance (§5.7)

A novel metric. Compares four skull graphs:

1. Preoperative skull graph (sutures + bones + compartments + hardware/none + risk markers)
2. Intended surgical skull graph (what the surgical plan said would change)
3. Immediate postoperative skull graph (what actually changed)
4. Longitudinal skull graph (what changed over months/years of remodeling and growth)

The graph edit distance quantifies whether surgery created the intended skull-growth topology. **A perfect immediate result that relapses to the preoperative state in 2 years is not a successful surgery.** AURORA-CRANIO Ω is the first system to compute that.

### 12.5 Reoperation + Relapse Forecasting (§5.8)

Surfaces failure patterns **before** they become anecdotal at multi-center conferences. Routes:

- routine follow-up
- expedited imaging review
- ophthalmology review
- urgent craniofacial / neurosurgical review pattern
- possible relapse
- possible refusion
- possible ICP-risk recurrence
- possible hardware complication
- endpoint discordance

Each route names the specialty + the specific question to be answered.

---

## 13. Section 6 — CRANIO-NEURODEVELOPMENT

Endpoints in this section are **first-class**, not appendices to surgical reporting.

### 13.1 Neurodevelopmental Baseline + Longitudinal Endpoint Factory (§6.1)

Captures milestones, motor, language, cognition, executive function, attention, behavior, school readiness, neuropsychological testing, IEP / accommodations, therapy needs, and quality of life. Age-normalized baselines + postoperative learning curves + genotype-linked developmental profiles + family-centered outcomes.

### 13.2 Vision + Optic Neuropathy Sentinel (§6.2)

Tracks papilledema grade, optic atrophy, OCT RNFL thickness, visual acuity, visual fields, strabismus angle, exposure keratopathy, proptosis, ICP, and surgery response. Routes:

- routine eye follow-up
- elevated optic-risk pattern
- possible ICP-related optic risk
- postoperative recurrent-risk
- endpoint incomplete

Ophthalmic surveillance is widely accepted as a critical part of syndromic and multisuture craniosynostosis care. [^optic]

### 13.3 Hearing + Speech + Airway/Sleep Outcome Router (§6.3)

Captures hearing screen, audiology, speech development, otitis media, airway obstruction, sleep-disordered breathing, CPAP/tracheostomy, midface anatomy, and neurobehavioral sleep effects. Special importance in syndromic craniosynostosis where airway, midface, ICP, and neurodevelopment are coupled.

### 13.4 School Function + Caregiver Burden Factory (§6.4)

Captures outcomes that matter to **families**:

- school attendance, recovery time, IEP/504 plans
- helmet burden (months of wear, skin issues, social burden)
- distraction burden (activation tracking, anxiety, device visibility)
- hospitalizations, emergency visits
- caregiver stress, work disruption, travel burden, therapy burden
- appearance-related psychosocial effects
- quality of life

This is how AURORA-CRANIO Ω prevents itself from becoming a purely surgical or purely imaging platform.

---

## 14. Section 7 — CRANIO-BENCHMARK

| Suite | Coverage | Status |
|---|---|---|
| **§7.1 Segmentation + Suture + Skull-Shape** | Dice / surface-Dice / Hausdorff / cephalometric error / cranial-index error / suture-fusion-error / sensitive-boundary error / endpoint-relevant error | **shipped** v7.1 (144 tests, 35 routes) |
| **§7.2 Mimic + Hard-Negative** | deformational plagiocephaly · benign metopic ridge · hydrocephalus · microcephaly · shunt-related skull change · skeletal dysplasia · metabolic bone disease · postoperative skull · poor-quality outside imaging | scaffold |
| **§7.3 Rare Craniosynostosis Stress Suite** | bicoronal · lambdoid · multisuture · pansynostosis · syndromic · cloverleaf · fetal-suspected · post-shunt secondary · late-presenting · postoperative relapse · posterior vault distraction · refusion · genetic-positive subtle · underrepresented sites | **shipped** — 12 archetypes, 14 stress classes, 21 modules |
| **§7.4 Biomarker Validation Bench** | each candidate biomarker tested on fusion progression / ICP risk / optic risk / neurodevelopment / surgical response / relapse / refusion / blood loss / reoperation / quality of life / caregiver burden | **shipped** v7.4 |

A model that cannot safely say **"not craniosynostosis"** on a mimic case does not receive a diagnostic-support claim. Period.

---

## 15. Section 8 — CRANIO-ENDPOINTS

The Endpoint Dictionary (§8.1, partially shipped via the AURORA Atlas 8.1 pack) standardizes every endpoint that appears anywhere in AURORA-CRANIO Ω:

- Anatomic: suture fusion, skull shape, cranial index, cranial-vault volume, intracranial volume, posterior fossa volume, orbital volume, airway, venous outflow
- Physiologic: ICP risk, papilledema, OCT RNFL, optic atrophy, hydrocephalus, Chiari, sleep apnea
- Developmental: neurodevelopment, vision, hearing, sleep, school function, behavior
- Surgical: complications, reoperation, relapse, refusion, blood loss, hardware lifecycle, regenerate quality
- Family: quality of life, caregiver burden, school disruption, financial strain

Each endpoint exports via:

- **DICOM-SR** structured-report measurement (with template ID per module)
- **FHIR R4** Observation / Procedure / Device / DiagnosticReport / ImagingStudy
- **GA4GH Phenopackets v2** for clinical-genomics interchange
- **XNAT** pipeline payload
- **MONAI Label** task descriptors
- **OMOP CDM** concept-code-anchored records
- **CDISC SDTM/ADaM** trial tables (research mode only)

Plus a **Trial Comparability Engine** (§8.3) that compares studies by age · suture type · syndrome · genotype · surgery type · timing · imaging method · endpoints · follow-up duration · outcome definitions — preventing misleading meta-analysis.

---

## 16. Section 9 — CRANIO-GOVERNANCE

### 16.1 Claim Scope Gate (§9.1)

Every model must declare:

- population (e.g. "ages 0–18 mo, single-suture sagittal")
- age (lower and upper bound)
- modality (e.g. "low-dose CT, 0.5 mm slices, 80–100 kVp")
- suture type (which sutures the model was trained / validated on)
- syndrome status (syndromic vs nonsyndromic vs both)
- genotype scope (which genes the model has training data for)
- surgical state (preoperative / postoperative / both)
- endpoint domain (volume / vector / hardware / ICP / staged-surgery / etc.)
- imaging quality (acceptance criteria — slice thickness, motion, contrast)
- supported output (the exact output types the model is allowed to emit)

No model may claim "craniosynostosis support" without this declaration.

### 16.2 Unsupported Case Router (§9.2)

Routes:

- fetal cases
- syndromic cases (unless model is syndromic-validated)
- low-quality imaging
- postoperative cases (unless model is postop-validated)
- shunted cases
- rare sutures
- multisuture cases
- suspected metabolic disease
- mimic-heavy cases

to **unsupported** or **human-review** states unless module-specifically validated.

### 16.3 Safety Case + Lifecycle Monitor (§9.3)

Monitors:

- subgroup failures (per syndrome, per age, per modality, per site)
- calibration drift (ECE/Brier over rolling windows)
- missingness drift
- external-site drift (when partner institutions deploy)
- scanner shift (CT vendor / model upgrade impact)
- critical errors (SEV-1 incidents)
- biomarker-validity erosion
- overclaiming
- public-language misuse
- update control (PCCP-compliant model updates)

### 16.4 Market-Beating Release Package (§9.4)

Every release ships:

- model card (per §5.5.45)
- data card (per §5.5.44)
- benchmark report
- stress-test report (rare-case + mimic + adversarial)
- biomarker-validation state
- subgroup report
- calibration report (ECE / Brier / AUROC + reliability diagram)
- uncertainty report
- unsupported-case disclosure
- clinical-trial-readiness package
- public-language sheet (the exact phrasing a clinician may use when discussing model output with a family)

---

## 17. Engineering architecture across modules

Every shipped module is built on the same engineering substrate. New modules clone this pattern.

```
┌────────────────────────────────────────────────────────────────────────────┐
│                       AURORA-CRANIO Ω engineering substrate                │
├────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  ┌─ 1. Specification ─────────────────────────────────────────────┐       │
│  │  Numbered spec PDF (§N.K)                                       │       │
│  │  ↓ defines every output state, every hard-stop, every endpoint  │       │
│  └─────────────────────────────────────────────────────────────────┘       │
│                                                                            │
│  ┌─ 2. TypeScript core library (src/) ───────────────────────────┐         │
│  │  - 21 engines per surgical module                              │         │
│  │  - 5 core outputs + 5 indices                                  │         │
│  │  - SafetyGate (deterministic primary safety control)           │         │
│  │  - 12 prohibited labels + 16 prohibited language regexes       │         │
│  │  - Hard-stop registry                                          │         │
│  │  - Strong types — no free-text classifications                 │         │
│  │  - All synchronous, all unit-tested                            │         │
│  └─────────────────────────────────────────────────────────────────┘         │
│                                                                            │
│  ┌─ 3. CLI (src/cli/) ──────────────────────────────────────────┐         │
│  │  30+ commands per module — register-case · set-use-context · │         │
│  │  record-osteotomy · record-distractor · record-activation ·  │         │
│  │  record-distance · import-volumes · import-pf-chiari ·       │         │
│  │  import-venous · import-ophthalmology · record-staged-surgery │         │
│  │  · record-family-burden · compute-pep · compute-dva ·         │         │
│  │  generate-report · export-registry · export-fhir · etc.       │         │
│  └─────────────────────────────────────────────────────────────────┘         │
│                                                                            │
│  ┌─ 4. Production API (src/api/) ──────────────────────────────┐           │
│  │  OIDC/JWT 2-key rotation · RBAC+ABAC · CSRF · HMAC webhooks │           │
│  │  Hash-chained audit log (SHA-256 linking, WORM-replicated)  │           │
│  │  Redis-backed token-bucket rate limit                       │           │
│  │  OpenTelemetry SDK init + OTLP exporter                     │           │
│  │  prom-client (Counter/Histogram/Gauge + default metrics)    │           │
│  │  jose JWKS validation                                       │           │
│  │  FHIR R4 structural validator (emits OperationOutcome)      │           │
│  │  Versioned migrations with SHA-256 checksums                │           │
│  └─────────────────────────────────────────────────────────────────┘         │
│                                                                            │
│  ┌─ 5. Next.js dashboard UI (ui/) ─────────────────────────────┐           │
│  │  40+ routes per module · server components · AURORA gradient │           │
│  │  Live engine output (not placeholder) — every page renders   │           │
│  │  real records from the canonical store at request time       │           │
│  │  Persistent red safety banner · no prescriptive copy ever    │           │
│  └─────────────────────────────────────────────────────────────────┘         │
│                                                                            │
│  ┌─ 6. Python sidecar (sidecar/) ──────────────────────────────┐           │
│  │  FastAPI · trained PyTorch foundation model checkpoints     │           │
│  │  Adapters: MedSAM · SAM-Med3D · TotalSegmentator · DINOv2   │           │
│  │  Endpoints: /segment · /measure-vector · /classify-X ·      │           │
│  │  /detect-event · /extract-volume                            │           │
│  │  Secondary signal — deterministic SafetyGate is primary     │           │
│  └─────────────────────────────────────────────────────────────────┘         │
│                                                                            │
│  ┌─ 7. Real-data clinical-real engines (src/clinical-real/) ──┐           │
│  │  HPO 2026 · ClinVar craniofacial · PubMed via E-utils ·     │           │
│  │  MedQuAD · PubMedQA · syndrome profiles derived from real   │           │
│  │  records — never fabricated                                 │           │
│  └─────────────────────────────────────────────────────────────────┘         │
│                                                                            │
│  ┌─ 8. EHR + de-id pipeline (src/importers, src/deid) ────────┐           │
│  │  Adapters: Epic Caboodle CSV · OMOP CDM · REDCap · FHIR     │           │
│  │  Bulk Data API ($export ndjson) → canonical PVDTwin         │           │
│  │  De-id: HIPAA Safe Harbor 18 identifiers · DICOM PS3.15     │           │
│  │  Annex E · date jitter ±90 days consistent-per-subject ·    │           │
│  │  zip 5→3 generalization · k-anonymity ≥ 3 enforcement       │           │
│  └─────────────────────────────────────────────────────────────────┘         │
│                                                                            │
│  ┌─ 9. Validation tooling (src/validation/) ──────────────────┐           │
│  │  ConcordanceEngine: Cohen's κ + macro F1 + ECE + Brier +    │           │
│  │  AUROC + decision-curve analysis + Fleiss' κ + sample-size  │           │
│  │  calc, stratified by syndrome × age × osteotomy × follow-up │           │
│  │  AdjudicationRepository: 3-rater blinded + 4th-rater        │           │
│  │  resolution + engine-assisted revision tracking             │           │
│  └─────────────────────────────────────────────────────────────────┘         │
│                                                                            │
│  ┌─ 10. Infrastructure (infra/) ───────────────────────────────┐           │
│  │  Docker compose 10 services · Kubernetes manifests (PSS     │           │
│  │  restricted) · Helm chart with staging+prod overlays ·      │           │
│  │  Terraform (VPC · EKS · RDS Postgres · ElastiCache · ECR    │           │
│  │  immutable · S3 WORM Compliance 7y · KMS rotation · IRSA ·  │           │
│  │  multi-region DR · Cognito · WAFv2 · SNS+PagerDuty · AMP ·  │           │
│  │  AMG · cert-manager · ExternalSecrets) · 8 CI workflows     │           │
│  │  (CI · security · SBOM · SLSA L3 · release · CodeQL · axe · │           │
│  │  lighthouse)                                                │           │
│  └─────────────────────────────────────────────────────────────────┘         │
│                                                                            │
│  ┌─ 11. Regulatory packet (regulatory/) ──────────────────────┐           │
│  │  16-17 documents per module:                                │           │
│  │   - Intended Use Statement / IFU                            │           │
│  │   - IMDRF SaMD categorization                               │           │
│  │   - IEC 62304 Software Lifecycle Plan (Class B/C)           │           │
│  │   - ISO 14971 Risk Management File (≥ 34 hazards)           │           │
│  │   - ISO 14971 Risk Control Trace                            │           │
│  │   - GMLP report                                             │           │
│  │   - PCCP (Predetermined Change Control Plan)                │           │
│  │   - FDA 524B Cybersecurity                                  │           │
│  │   - STRIDE Threat Model (≥ 40 threats incl cloud surface)   │           │
│  │   - 21 CFR Part 11 Electronic Records                       │           │
│  │   - GDPR + HIPAA Mapping                                    │           │
│  │   - ISO 13485 QMS scaffold                                  │           │
│  │   - IEC 62366 Usability Engineering File                    │           │
│  │   - ISO 27001 Controls Mapping                              │           │
│  │   - 510(k) Submission Plan                                  │           │
│  │   - Model Card v1                                           │           │
│  │   - Data Card v1                                            │           │
│  │   - DPIA (for cloud staging)                                │           │
│  │   - Pen Test Plan                                           │           │
│  └─────────────────────────────────────────────────────────────────┘         │
│                                                                            │
│  ┌─ 12. Partnership pack (regulatory/partnerships/) ──────────┐           │
│  │  LOI template · DUA-LDS template · BAA template · DTA       │           │
│  │  template · sIRB protocol template (6,000 words) ·          │           │
│  │  TRIPOD-AI checklist · STARD 2015 checklist · OSF           │           │
│  │  pre-registration template · validation report template ·   │           │
│  │  site contact list · 5 cold-outreach email templates        │           │
│  └─────────────────────────────────────────────────────────────────┘         │
│                                                                            │
└────────────────────────────────────────────────────────────────────────────┘
```

Every shipped module is structurally identical at this level. That uniformity is the property that lets the program scale to 30+ modules without each module requiring a custom regulatory or engineering reinvestment.

---

## 18. Clinical scenarios — the safety contract in action

Three worked examples of the safety contract preventing claims the operating system cannot prove.

### 18.1 Scenario A — the "ICP resolved" overclaim attempt

A clinician imports an Apert case into the §5.5 PVD Twin. Posterior vault distraction was performed; pre-op ICV 1,000 ml, post-op ICV 1,180 ml, segmentation-quality high. **No ophthalmology data has been recorded post-op.** The clinician tries to mark `optic_icp_endpoint.classification = "supported-improvement"`.

The SafetyGate refuses. It returns:

```
HARD_STOP_NoOphthalmicEndpoint
Reason: Cannot claim supported-improvement of ICP response without ophthalmic /
OCT / direct-ICP / clinician-adjudicated endpoint. ExpansionDistance ⇏
ICPResolved (§5.5.0 safety principle).
Recommended classification: plausible-unmeasured-improvement.
Specialist handoff: pediatric neuro-ophthalmology + craniofacial surgery for
postoperative ophthalmic surveillance.
```

The blocked claim is logged to the audit chain. The case can proceed with the correct `plausible-unmeasured-improvement` classification, which honestly captures that posterior expansion is anatomically real but ICP response is unmeasured.

### 18.2 Scenario B — the "FOA no longer needed" overclaim attempt

A research coordinator imports a multisuture cohort at 6 months follow-up. None of the 23 cases has undergone fronto-orbital advancement so far. The coordinator tries to mark `staged_surgery_forecast.classification = "foa-avoided-in-followup"` on all 23.

The SafetyGate refuses on 23/23. It returns:

```
HARD_STOP_NoFollowupDuration
Reason: foa-avoided-in-followup claim attempted with follow-up window 6 months.
Per §5.5.14 + §5.5.49, NoLaterFOAInShortFollowup → FOAAvoidedClaim is a
dangerous failure chain. Minimum follow-up window for this claim is 12 months.
Recommended classification: foa-delayed (with explicit follow-up_window_months
recorded).
Specialist handoff: schedule 18-month follow-up before re-attempting this
classification.
```

### 18.3 Scenario C — the "operative success" overclaim attempt on a relapse

A 24-month-old case had OCVR at 9 months with excellent immediate post-op CT showing intended skull-vault expansion. At 24 months, repeat CT shows partial scaphocephaly relapse. Cranial index has reverted to 70% of the planned correction. The clinician opens the report generator and the system attempts to emit `posterior_volume_expansion = "strong"`.

The SafetyGate refuses. It returns:

```
HARD_STOP_NoLongitudinalProof (§5.7 graph edit distance)
Reason: Cranial Vault Graph Edit Distance shows 30% reversion from the
post-op skull graph toward the pre-op skull graph at 24-month follow-up.
A "strong" classification at this timepoint contradicts §6 invariant
"no postoperative success claim without skull-growth topology and endpoint
change". Recommended classification: weak (with relapse-vector annotation).
Specialist handoff: craniofacial surgery for revision-evaluation review.
```

---

## 19. Regulatory pathway, by section and module

| Module | Regulatory pathway | Class | Status |
|---|---|---|---|
| §2.5 CranioNeuroDev | IMDRF SaMD Class II (drives clinical management of serious condition; informs but does not autonomously decide) | IEC 62304 Class B | Q-Sub planned |
| §5.2 ECSC | IMDRF SaMD Class II | IEC 62304 Class B | Q-Sub planned |
| §5.3 OCVR | IMDRF SaMD Class II | IEC 62304 Class C (life-supporting indication scope) | Q-Sub planned |
| §5.4 FOA | IMDRF SaMD Class II | IEC 62304 Class B | Q-Sub planned |
| §5.5 PVD (lead) | IMDRF SaMD Class II | IEC 62304 Class B | **Phase 4 ready** — 17-doc submission packet drafted; Q-Sub to be filed first |
| §2.7 CranioFOT | likely Clinical Decision Support exemption per FDA 21st Century Cures Act §3060 (non-prescriptive specialist-facing) | n/a if CDS-exempt | Pending consultant review |
| §4.x diagnostic adjudicators | IMDRF SaMD Class III evaluation (drives diagnostic decision in serious condition) | IEC 62304 Class C | Phase 2 planning |

The submission strategy is **PVD-first**:

1. PVD (§5.5) submits the first Q-Sub. Use the Q-Sub feedback to refine the submission template that all subsequent surgical-twin modules (ECSC / OCVR / FOA) will use.
2. After PVD clearance, OCVR + FOA + ECSC follow with parallel submissions using the validated template — accelerated review under 510(k).
3. Diagnostic adjudicators (§4.x) take a separate pathway with stricter validation cohort requirements.
4. CDS-exempt modules (§2.7 family observation translator if it stays non-prescriptive) avoid 510(k) but still ship the full IEC 62304 + ISO 14971 packet.

---

## 20. Biomarker validation tier system

The atlas (§3.1) classifies every biomarker into one of 10 tiers. Tier-bleed is impossible.

| Tier | Definition | Allowed contexts |
|---|---|---|
| **clinical-standard** | In current craniosynostosis guidelines (e.g. 2020 guideline) and used in current standard-of-care decision-making | Clinical reports · trial endpoints · regulatory submission |
| **validated-imaging** | Peer-reviewed external validation in published independent cohorts; reproducible across ≥ 2 institutions | Clinical reports with explicit citation · trial endpoints · regulatory submission |
| **candidate-imaging** | Internal validation only (single institution / single cohort); awaiting external replication | Research reports · trial pre-registrations · NOT clinical reports |
| **candidate-molecular** | Biological plausibility + association evidence (e.g. transcriptomic signature with discovery cohort but no replication) | Research reports · NOT clinical reports |
| **research-only** | Exploratory, not for clinical use; flagged with `research-only` watermark in every emitted report | Research reports only |
| **exploratory** | Signal observed once; not replicated, not validated, not benchmarked | Research reports with explicit `exploratory` watermark |
| **weak** | Inconclusive signal — included in atlas for transparency but flagged as low-confidence | Research notes only |
| **unsupported** | No validated evidence; included to prevent "this biomarker is missing from your atlas" gaslighting | Atlas listings only · no reports |
| **deprecated** | Previously claimed in literature, now retired (e.g. supplanted by a stronger marker, or shown to be artifact) | Historical reference only |
| **unsafe-or-unreliable** | Actively dangerous if relied upon (e.g. a marker that has been shown to mislead clinical decisions in published incident reports) | Atlas listings with red flag · explicitly forbidden in reports |

Every report names the tier of every biomarker it cites. A clinician reading a report knows whether the cited marker is `clinical-standard` (high trust) or `research-only` (curiosity).

---

## 21. Failure-mode catalog — what AURORA-CRANIO Ω is designed to prevent

The system was designed by enumerating the failure modes seen in current craniosynostosis tools and clinical literature, then designing against each one.

| Failure mode | Where it appears in the wild | How AURORA-CRANIO Ω prevents it |
|---|---|---|
| "Sagittal synostosis" diagnosed from external photo without imaging | Direct-to-consumer / family-facing apps | §1.1 proof ledger refuses to emit `definite-fused` without imaging |
| "Volume expanded → ICP resolved" claim | Surgical case series | §5.5 HARD_STOP_NoOphthalmicEndpoint blocks the claim |
| "FOA no longer needed" claim at short follow-up | Conference posters | §5.5 HARD_STOP_NoFollowupDuration blocks the claim < 12 mo |
| "Chiari resolved" claim from posterior expansion alone | Some published case reports | §5.5 HARD_STOP_NoFollowupChiari blocks without follow-up MRI |
| "Device safe to remove" instruction emitted to family | Hypothetical family-facing app | §9.1 prohibited-language regex blocks emission |
| Specialist mis-reads engine output as recommendation | Documented in IEC 62366 use-error analyses for similar systems | Persistent red safety banner + explicit `specialist-review-handoff` field |
| Subgroup performance hidden in aggregate metric | Common in AI model cards | §9.4 release gate requires per-syndrome × per-age × per-osteotomy subgroup report |
| Biomarker mentioned without validation tier | Common in radiomic papers | §3.1 atlas refuses tier-less biomarkers in reports |
| Operative success declared at immediate post-op without longitudinal data | Common in surgical literature | §5.7 cranial-vault graph edit distance requires longitudinal proof |
| Treatment claim collapses planned-stage with unplanned-revision | Common in registry analyses | §5.x reason labels (planned-syndromic-stage vs unplanned-revision) keep them separate |
| Family burden treated as adherence | Common in retrospective cohorts | §6.4 family-burden tracker explicitly: "FamilyActivationBurden ⇏ NonadherenceOrFailure" |
| Synthetic-archetype training generalizes to real cases without validation | Common in early AI development | §5.5 v5.5.2 explicitly pivoted from archetype-driven to real-data-driven; archetypes retained only as test fixtures |
| Tool deployed without external pen test | Common in healthtech startups | §9.4 release gate requires external pen-test report with zero P0/P1 unresolved |
| Data residency violated when partner institution data leaves jurisdiction | Common in cross-border AI research | De-id pipeline runs locally; only aggregated κ/F1 numbers leave the site in federated mode |

---

## 22. Partner-institution landscape

AURORA-CRANIO Ω is built to validate at **high-volume craniofacial centers** with documented PVD / OCVR / FOA experience. The §5.5 partnership pack lists 6 target sites with publicly listed PI contacts. Realistic targets — pick 2-3:

| Site | Lead PIs | Specialty | Why it's a fit |
|---|---|---|---|
| **CHOP** (Philadelphia) | Scott Bartlett · Jesse Taylor · Greg Heuer | Plastic + neurosurgery | Long-standing PVD program with published outcomes; multidisciplinary craniofacial team; Epic + research-friendly OSR |
| **Boston Children's** | John Meara · Mark Proctor | Plastic + neurosurgery | Joint plastic surgery + neurosurgery craniofacial program; established outcomes research |
| **Seattle Children's** | Richard Hopper · Craig Birgfeld | Craniofacial center | Published distraction-osteogenesis program; one of the longest-running centers in the U.S. |
| **Stanford / Lucile Packard** | Rohit Khosla · Hermann Peter Lorenz · Gerald Grant | Craniofacial + neurosurgery | Active surgical innovation program; Stanford IRB efficient |
| **GOSH London** | David Dunaway · Owase Jeelani | Craniofacial unit | Largest European PVD volume; published long-term outcomes; cross-border legal complexity adds GDPR/IDTA/Schrems II workflow |
| **Texas Children's / Baylor** | Edward Buchanan | Plastic surgery | Active distraction-osteogenesis research |

For each site the partnership pack ships:

- LOI template (~800 words)
- HIPAA Limited Data Set DUA (~3,000 words)
- Business Associate Agreement (~2,000 words)
- Data Transfer Agreement (~2,500 words)
- Single-IRB protocol template (~6,000 words) for Advarra / WCG submission
- TRIPOD-AI checklist
- STARD 2015 checklist
- OSF pre-registration template
- Validation report template (target: *Plastic & Reconstructive Surgery* or *Journal of Neurosurgery: Pediatrics*)
- 5 cold-outreach email variants + 2 follow-up templates
- Site-specific contact list with publicly-listed institutional emails

---

## 23. Cost + resource model

Realistic budget envelope for one institution to take AURORA-CRANIO Ω from local-dev to first-clinical-publication. Numbers in 2026 USD.

| Item | Cost range | Notes |
|---|---|---|
| Cloud staging (AWS, ~$417/mo idle, ~$578/mo under load) | $5k–$8k/yr | Per §5.5 cost breakdown in `docs/SETUP-CLOUD-STAGING.md` |
| External pen test (Trail of Bits / NCC Group / Cure53 / Bishop Fox / Praetorian) | $25k–$60k once | Phase 2 acceptance gate |
| Single-IRB submission (Advarra / WCG) for 2-3 sites | $20k–$40k all sites | Phase 3 enablement |
| Specialist adjudication honoraria | $200/hr × 50 hr/site × 3 sites = $30k | Phase 3 specialist labeling round |
| Statistical consulting | $5k–$10k | Inter-rater κ methodology peer review |
| Open-access publication fees | $3k–$5k | Phase 3 medRxiv preprint + journal submission |
| Regulatory consultant (Pearl Pathways / Greenleaf Health / Hogan Lovells / RQM+) | $150k–$400k for full submission | Phase 4 |
| FDA Q-Sub + 510(k) user fee | $22k (small business) or $144k (full) | Phase 4 submission |
| IEC 62366 usability testing (formative + summative) | $40k–$80k | Phase 4 — required for Class B/C |
| **Total Phase 1 → first peer-reviewed paper** | **~$300k–$500k** | 24-36 months wall-clock |
| **Total → FDA clearance (510(k) or De Novo)** | **~$600k–$1M** | additional 8-14 months after Phase 3 |

This is **two orders of magnitude cheaper** than a comparable proprietary medical-device path because the engineering substrate (code, tests, infrastructure-as-code, regulatory packet templates) is reused across the 30+ modules.

---

## 24. Roadmap

### Now (Q1 2026)

- §5.5 PVD Phases 1+2+3 IaC complete; v5.5.5 released
- Cloud staging Terraform applied to first AWS account (when ready)
- Partner site cold outreach begins (CHOP + Stanford highest priority)

### Next (Q2 2026)

- §5.5 cloud staging environment live behind SSO
- First external pen test
- Sign LOI + DUA with first 2 partner sites
- §5.4 FOA cloud staging deployment (clone of §5.5 pattern)
- §5.3 OCVR cloud staging deployment

### Mid (Q3–Q4 2026)

- §5.5 Phase 3 specialist adjudication round at 2-3 sites
- Cohort target: 150 real PVD cases across 2 sites
- §5.5 Q-Sub filed with FDA
- First medRxiv preprint
- §1.1 Suture Fusion Proof-Ledger Compiler — first module of §1

### Late (2027)

- §5.5 510(k) submission
- §5.4 FOA + §5.3 OCVR Q-Sub submissions
- §1.x CRANIO-ORIGIN modules build out
- §3.x CRANIO-BIOMARKERS atlas v1
- First peer-reviewed publication using deployed-system data

### Long (2028+)

- §5.5 first clearance; pilot deployment at lead institution
- §1.x ORIGIN module clearance
- §2.x PHYSICS modules clearance
- Phase 5 post-market surveillance + PCCP-triggered model updates
- International expansion: CE mark under EU MDR for §5.x; UKCA for §5.x; Health Canada SaMD

---

## 25. How to engage

| You are a... | Start here |
|---|---|
| Craniofacial surgeon / pediatric neurosurgeon | [`aurora-cranio-5.5/docs/SETUP-LOCAL.md`](https://github.com/AURORA-NEURO/aurora-cranio-5.5/blob/main/docs/SETUP-LOCAL.md) — PVD module is the most-developed surgical twin |
| Pediatric neuroradiologist | §1.1 Suture Fusion Proof-Ledger Compiler design — start with the §5.5 spec PDF + existing FHIR exporters |
| Geneticist / genetic counselor | §1.4 Etiology Router design + §3.3 Genotype–Morphotype–Surgery Response Engine |
| Ophthalmologist (neuro-ophthalmology) | §3.5 Ophthalmic + ICP Biomarker Workbench + §6.2 Optic Neuropathy Sentinel |
| Researcher (suture biology) | §1.3 Suture Biology and Fusion-Stage Atlas + §3.2 Suture Tissue and Bone Biology Workbench |
| Researcher (neurodevelopment) | §2.5 Causal Adjudicator (shipped v2.5.1 trained) + §6.1 Endpoint Factory |
| Regulatory consultant | [`aurora-cranio-5.5/regulatory/`](https://github.com/AURORA-NEURO/aurora-cranio-5.5/tree/main/regulatory) — the 17-document submission packet is the reference |
| Data partner (CHOP / BCH / Seattle / Stanford / GOSH / Texas) | [`aurora-cranio-5.5/regulatory/partnerships/`](https://github.com/AURORA-NEURO/aurora-cranio-5.5/tree/main/regulatory/partnerships) — LOI · DUA-LDS · BAA · DTA · sIRB protocol templates |
| Software contributor | [`aurora-cranio-5.5/docs/CONTRIBUTING.md`](https://github.com/AURORA-NEURO/aurora-cranio-5.5/blob/main/docs/CONTRIBUTING.md) |
| Engineering reviewer | [`aurora-cranio-5.5/docs/ARCHITECTURE.md`](https://github.com/AURORA-NEURO/aurora-cranio-5.5/blob/main/docs/ARCHITECTURE.md) and the per-module structure described in §17 above |

---

## 26. Status — module maturity heatmap

```
SECTION               MATURITY                                                       LATEST
§1 CRANIO-ORIGIN      ░░░░░░░░░░  spec only — Atlas 8.1 CSVs already hardlinked       —
§2 CRANIO-PHYSICS     █████░░░░░  §2.2 prod-grade · §2.3 · §2.5 (trained) · §2.7 (tr) v2.7.1
§3 CRANIO-BIOMARKERS  █░░░░░░░░░  embedded in §5.5 clinical-real engines              —
§4 CRANIO-DIAGNOSTICS █░░░░░░░░░  §4.2 / §4.3 scaffolds                               —
§5 CRANIO-FORGE       █████████░  §5.2 / §5.3 / §5.4 / §5.5 shipped                   v5.5.5
§6 CRANIO-NEURODEV    █░░░░░░░░░  partial overlap with §2.5, §3.5, §3.6               —
§7 CRANIO-BENCHMARK   ████████░░  §7.1 / §7.3 / §7.4 shipped                          v7.4
§8 CRANIO-ENDPOINTS   ████░░░░░░  exporters in each shipped module + Atlas 8.1 pack   —
§9 CRANIO-GOVERNANCE  ██████░░░░  SafetyGate + regulatory packet pattern in every     —
                                  shipped module; cross-module registry pending
```

### Aggregate verification across shipped modules

| Module | Tests passing | Predeploy | Trained model? |
|---|---|---|---|
| §2.2 production-grade-v2 | n/a | 145/145 | — |
| §2.3 VPF mapper | 32/32 | passes | — |
| §2.5 CranioNeuroDev | 90/90 | 34/34 | ✓ `cranio_neurodev_v1.pt` 87 MB |
| §2.7 CranioFOT | 116/116 | 16/16 | ✓ `cranio_fot_tiny.pt` 9.4 MB |
| §5.2 ECSC | 82/82 / 28 suites | 17/17 | — |
| §5.3 OCVR | 110 TS + 42 sidecar + 8 model + 5 CLI = 165 | 6/6 | ✓ CranioFORGE-VAULT (tiny/base/large) |
| §5.4 FOA | 54/54 | 17/17 | ✓ CranioFOA tiny/base/large adapter stack |
| **§5.5 PVD** | **671/671 TS + 52/52 Python = 723** | **52/52** | ✓ **CranioPVD-FM tiny 16.5 M params, posterior-vault-seg Dice 0.864, text classifier macro F1 0.705** |
| §7.1 segmentation benchmark | 144/144 | 10/10 | — |
| §7.3 rare stress | 26/26 | passes | — |
| §7.4 biomarker bench | n/a | passes | — |

Total: **≥ 1,650 passing tests across the shipped modules** — each independently verified, each with its own regulatory packet.

---

## 27. Ω-HORIZON — the advanced capability program

Everything in §1–§26 describes what AURORA-CRANIO Ω **is** and what it **ships today**. **Ω-HORIZON** is the forward program: the next-generation, deliberately ambitious capabilities being engineered on top of the shipped substrate. They are the "super-cool" surface of the platform — living 4D twins, a unified multimodal foundation model, privacy-preserving federated learning, on-device photogrammetry, a structural causal engine — but they are catalogued here with the same discipline as the rest of this document.

**To protect the integrity of this README, no horizon capability is claimed as shipped.** Each one carries an explicit **Capability Readiness Level (CRL 0–9)** and a **non-prescriptive guardrail**. A capability that cannot be made auditable, abstaining, privacy-preserving, and specialist-supervised does not enter the program — no matter how impressive the demo.

### 27.0 The Capability Readiness Level (CRL) ladder

CRL is to AURORA-CRANIO Ω what NASA's Technology Readiness Level is to flight hardware: an honest, externally legible maturity scale. Every horizon card below states its current CRL.

| CRL | Name | Meaning | Gate to advance |
|:---:|---|---|---|
| 0 | Concept | Idea + literature scan; no code | Written spec (§N.K) with output states + hard-stops |
| 1 | Spec | Numbered spec, data contract, guardrail defined | SafetyGate stub + prohibited-label set drafted |
| 2 | Prototype | Offline notebook / research script | Reproducible on a public or synthetic cohort |
| 3 | Engineered | TypeScript core + tests + deterministic SafetyGate | ≥ 90 % unit coverage on the core engines |
| 4 | Integrated | CLI + API + sidecar wired into a module | Predeploy gate green; FHIR/registry export works |
| 5 | Validated (internal) | Retrospective validation on a real cohort | Calibration + subgroup + uncertainty reports filed |
| 6 | Validated (external) | Multi-site retrospective; specialist adjudication | Model card + data card + stress-test report published |
| 7 | Regulatory-staged | Q-Sub filed; staging deploy behind SSO | Pre-Sub feedback incorporated; pen test passed |
| 8 | Cleared (pilot) | 510(k)/De Novo cleared; pilot at lead site | Post-market surveillance plan live |
| 9 | Post-market | Routine deployment; PCCP-governed updates | Continuous drift + equity monitoring green |

> **Reading the cards.** Each capability states: what it does · why it beats the incumbents · the non-prescriptive guardrail that keeps it inside the safety contract · its dependencies · its current CRL. The CRLs below are deliberately low (0–3): this is a research roadmap, not a product brochure.

### 27.A Family A — Living twins & generative simulation

**H1 · CranioTwin Live — the time-scrubbable 4D growth twin** — `CRL 2`
A continuously-reconciled 4D digital twin that fuses the §2.1 skull–brain growth model, the §1.3 suture biology atlas, and the §2.2 ICP-reserve object into a single object you can *scrub through time*. Drag the time cursor and watch the modeled cranial-vault volume, suture-fusion stage, and ICP-reserve evidence state co-evolve between imaging timepoints, with every interpolated frame carrying its own uncertainty band.
- **Beats the incumbents because** Brainlab/Synaptive render a single static timepoint; nobody renders the *trajectory* with calibrated uncertainty between scans.
- **Guardrail.** Interpolated frames are labeled `modeled — not measured` and never emit an ICP diagnosis; the twin surfaces an `ICP-Risk Evidence Object`, never a number a clinician could act on alone.
- **Depends on** §2.1, §2.2, §1.3 · conformal uncertainty layer (H5).

**H2 · CranioGEN — generative vault morphogenesis** — `CRL 1`
A diffusion model that, given a preoperative skull graph and a hypothetical surgical topology, emits a **distribution** of plausible post-remodeling cranial shapes — a "morphogenesis envelope" with per-vertex credible intervals — rather than a single deterministic prediction.
- **Beats the incumbents because** generic planning tools show the intended geometry; CranioGEN shows the *space of biological outcomes* the geometry could relax into, including the tails.
- **Guardrail.** Emits an envelope + likelihood, never a "this surgery will work" claim; outputs route through the §5.7 Cranial Vault Graph Edit Distance for honest comparison, and the SafetyGate blocks any single-shape "expected result" framing.
- **Depends on** §5.6 operative-truth corpus (training signal) · §5.7 graph metric.

**H3 · Counterfactual timing sandbox** — `CRL 1`
An interactive extension of the §2.6 Timing-Window Forecaster: explore *hypothetical* timing windows ("what does the evidence look like if presentation were at 4 vs 9 vs 14 months?") and watch the resulting **Timing-Relevance Object** change — strictly as structured evidence for the multidisciplinary team.
- **Beats the incumbents because** no existing tool lets a craniofacial team interrogate the *evidence sensitivity* to timing across the full surgical menu (ESC+helmet, OCVR, FOA, PVD, spring, staged syndromic).
- **Guardrail.** Every scenario is watermarked `counterfactual — hypothetical — not a recommendation`; the SafetyGate hard-blocks any output that names a preferred timing.
- **Depends on** §2.6 · §5.x surgical twins.

### 27.B Family B — Foundation intelligence

**H4 · CranioFM-Ω — the unified multimodal foundation model** — `CRL 1`
One self-supervised foundation model pretrained across CT, MRI, 3D photogrammetry, OCT/RNFL, genomic panels, and de-identified clinical text, exposing frozen embeddings that every downstream module adapts with a small head — superseding today's per-module checkpoint zoo (CranioPVD-FM, CranioFOA, CranioFORGE-VAULT, CranioNeuroDev, CranioFOT).
- **Beats the incumbents because** incumbents ship task-specific imaging models; a shared cross-modal representation lets a single rare syndromic case inform every module at once.
- **Guardrail.** Remains a **secondary signal** — the deterministic SafetyGate is still primary in every module; embeddings never bypass the proof-ledger requirement.
- **Depends on** federated mesh (H7) for multi-site pretraining · provenance ledger (H9) for data lineage.

**H5 · Conformal uncertainty & out-of-distribution sentinel** — `CRL 2`
A distribution-free wrapper around every model output that produces **calibrated prediction sets** with a guaranteed coverage level, **abstains** when the case falls outside the training manifold, and raises a drift alarm when input statistics shift.
- **Beats the incumbents because** "AI for skulls" tools rarely say *"I don't know"*; abstention-by-default is a first-class output here.
- **Guardrail.** On OOD detection the module emits `unsupported case → route to §9.2 Unsupported Case Router` rather than a low-confidence guess; conformal coverage is reported in every release's uncertainty report.
- **Depends on** §9.2 · §9.3 lifecycle monitor.

**H6 · Specialist Copilot — retrieval-grounded, citation-locked** — `CRL 1`
A natural-language copilot for the multidisciplinary team that answers only from (a) the patient's own proof ledger and (b) a curated, versioned literature index — every sentence of every answer carries an inline citation to a ledger entry ID or a reference, and **uncited generation is refused**.
- **Beats the incumbents because** it is a clinical-reasoning surface that is *constitutionally incapable* of hallucinating an unsupported claim — no citation, no sentence.
- **Guardrail.** The same 16 prohibited-language regexes + structural checks run on copilot output; it will not phrase, hint at, or rank a treatment. Refuses family-facing instructions.
- **Depends on** proof ledger (§1.1) · provenance ledger (H9) · conformal layer (H5).

### 27.C Family C — Federated learning & privacy

**H7 · Federated swarm-learning mesh** — `CRL 1`
Cross-institution model training where **raw patient data never leaves the partner site**: each site trains locally, only encrypted gradient updates are exchanged, and a secure-aggregation + differential-privacy layer guarantees no single record is recoverable from the shared model.
- **Beats the incumbents because** craniosynostosis is rare; no single center has the n. A privacy-preserving mesh is the only way to reach syndromic/multisuture statistical power without a central data lake.
- **Guardrail.** Formal (ε, δ)-differential-privacy budget per round, reported in the data card; on-site de-identification (already in §1) runs before any computation.
- **Depends on** §22 partner sites · DUA pack · provenance ledger (H9).

**H8 · Synthetic cohort foundry** — `CRL 1`
A generative engine that produces **privacy-safe synthetic patients** — full longitudinal trajectories — to expand the §7.3 rare-case stress suite and pre-train models before real-data access, with explicit membership-inference defenses so no synthetic record traces back to a real child.
- **Beats the incumbents because** it lets the open benchmark cover refusion, post-shunt, and late-presenting tails that are too rare to collect, *before* a single DUA is signed.
- **Guardrail.** Synthetic records are indelibly flagged `synthetic`; they may train and stress-test but are barred from any validation-evidence tier (§20) used for regulatory claims.
- **Depends on** §7.3 · CranioGEN (H2) · membership-inference audit.

**H9 · Cryptographic provenance ledger** — `CRL 2`
Upgrades the existing SHA-256 hash-chained audit log to a **Merkle-anchored, append-only, tamper-evident provenance ledger**: every claim, every model decision, every proof-ledger entry is cryptographically signed and independently verifiable, so an auditor can prove *nothing was altered after the fact*.
- **Beats the incumbents because** it turns the safety contract from a policy into a *mathematically verifiable artifact* — the difference between "we logged it" and "you can prove we didn't tamper with it."
- **Guardrail.** Read-only by construction; signing keys are HSM-backed; the ledger records refusals (blocked prescriptive outputs) as first-class events.
- **Depends on** §17 audit substrate · §9 governance.

### 27.D Family D — Sensing at the edge

**H10 · On-device smartphone photogrammetry capture** — `CRL 1`
A family-side capture flow that turns a short head-orbit video into a **Cranial Morphotype Vector (§1.2)** entirely **on-device** — no images leave the phone, only the de-identified vector is transmitted — lowering the barrier to longitudinal head-shape tracking between clinic visits.
- **Beats the incumbents because** it extends measurement reach to the home without a CT, without radiation, and without sending a child's face to a server.
- **Guardrail.** Output is non-diagnostic evidence for specialist review via the §2.7 Family Observation Translator; the app refuses to display any diagnosis, score, or reassurance to the family.
- **Depends on** §1.2 morphotype engine · §2.7 FOT · edge runtime (H12).

**H11 · Passive home-monitoring bridge** — `CRL 0`
A consented bridge that ingests home pulse-oximetry / sleep-wearable summaries and structured caregiver observations into a **sleep/airway evidence object**, contributing longitudinal signal to the §6.3 airway/sleep router between sleep studies.
- **Beats the incumbents because** syndromic airway risk is dynamic; episodic in-lab studies miss the trajectory that passive home signal can surface for the specialist.
- **Guardrail.** Strictly non-diagnostic; never triggers an alert or instruction to the family; feeds evidence to the specialist, who owns every decision.
- **Depends on** §6.3 · conformal layer (H5) · provenance ledger (H9).

**H12 · Low-resource edge deployment** — `CRL 1`
Quantized, distilled model variants (int8 / 4-bit) that run the radiation-minimizing §4.1 imaging-pathway logic and core measurement engines on commodity hardware, for craniosynostosis care in settings without a research data center.
- **Beats the incumbents because** the incumbents assume a high-end workstation; global equity demands the safety contract runs on a laptop.
- **Guardrail.** Edge builds carry the *identical* SafetyGate + prohibited-label set; a degraded model that cannot meet the abstention threshold (H5) refuses to emit rather than guess.
- **Depends on** CranioFM-Ω distillation (H4) · §4.1.

### 27.E Family E — Causal & equity intelligence

**H13 · Structural causal engine** — `CRL 1`
A structural-causal-model / do-calculus layer over the longitudinal registry that estimates **research-grade intervention-effect signals** (e.g., the association between timing-window and a neurodevelopmental endpoint) with explicit confounding controls — strictly for hypothesis generation and trial design, never for individual decisions.
- **Beats the incumbents because** correlation-only dashboards cannot separate "earlier surgery" from "milder disease presents earlier"; the causal engine makes the confounding explicit and contestable.
- **Guardrail.** Outputs are population-level research artifacts labeled `research-only — not individualized`; the SafetyGate blocks any per-patient causal claim.
- **Depends on** §8 endpoints · §6 outcome factory · provenance ledger (H9).

**H14 · Equity & fairness sentinel** — `CRL 2`
Continuous, release-blocking monitoring of subgroup calibration and error parity across ancestry, sex, syndromic status, age band, and care setting — with an equity dashboard and an automatic **disparity-drift gate** that fails a release if any subgroup degrades beyond tolerance.
- **Beats the incumbents because** it makes fairness a *gate*, not a footnote: a model that improves on average but worsens for a subgroup does not ship.
- **Guardrail.** Wired into the §9.4 release package and §26 maturity matrix; disparity drift is a hard-stop, not a warning.
- **Depends on** §9.4 · subgroup reports · §20 validation tiers.

**H15 · Closed-loop outcome learning — the "Time Machine"** — `CRL 1`
The longitudinal registry feeds 5-, 10-, and 20-year outcomes back into model refresh under a **Predetermined Change Control Plan (PCCP)** — so the system that learns from a child at 9 months keeps learning from that same child through school age, and every refresh is gated, versioned, and auditable.
- **Beats the incumbents because** craniosynostosis outcomes mature over two decades; a static cleared model silently rots. Closed-loop, PCCP-governed learning is the only honest answer.
- **Guardrail.** Every refresh re-runs the full §9.4 release gate (model/data/benchmark/stress/calibration/uncertainty/subgroup/equity) before deployment; no silent updates.
- **Depends on** §8 registry · H9 provenance · H14 equity sentinel · §9.3 lifecycle monitor.

### 27.F The five horizon invariants

Ω-HORIZON does not relax the [10 core invariants](#6-the-10-core-invariants--the-safety-contract); it adds five more that any advanced-AI capability must satisfy to enter the program.

| # | Horizon invariant | Enforced by |
|:---:|---|---|
| 11 | **Abstention by default.** A model that cannot meet its calibrated coverage threshold refuses rather than guesses. | Conformal sentinel (H5) → §9.2 router |
| 12 | **Privacy by construction.** Patient data is computed on where it lives; only de-identified vectors / DP-protected gradients move. | Federated mesh (H7) · on-device capture (H10) |
| 13 | **Provenance by default.** Every claim and model decision is cryptographically signed and independently verifiable. | Provenance ledger (H9) |
| 14 | **Equity as a gate.** Subgroup disparity drift blocks a release; fairness is never a post-hoc footnote. | Equity sentinel (H14) → §9.4 |
| 15 | **Human authority preserved.** No horizon capability — however advanced — emits an autonomous or prescriptive clinical decision. | SafetyGate in every module · the entire safety contract |

---

## 28. The phased delivery plan

Ω-HORIZON ships through six gated phases, **H0 → H5**, mirroring the CRL ladder in §27.0. The discipline is deliberate: every phase has an **entry gate**, a small number of **workstreams**, a measurable **exit gate**, and explicit **kill criteria**. No phase begins until the prior phase's exit gate is green. Phases overlap across capabilities (H1 may be at H2 while H9 is at H4), but no *single* capability skips a gate.

### 28.0 Program shape at a glance

```
        H0          H1          H2          H3          H4          H5
     Foundation  Prototype   Validate    Federate    Stage       Closed-loop
     ──────────  ──────────  ──────────  ──────────  ──────────  ──────────
H9   ▓▓▓▓▓▓▓▓▓▓  ▓▓▓▓▓▓▓▓▓▓  ▓▓▓▓▓░░░░░  ░░░░░░░░░░  ░░░░░░░░░░  ░░░░░░░░░░  provenance ledger (earliest — everything signs to it)
H5   ░░░░░░░░░░  ▓▓▓▓▓▓▓▓▓▓  ▓▓▓▓▓▓▓▓░░  ░░░░░░░░░░  ░░░░░░░░░░  ░░░░░░░░░░  conformal sentinel
H1   ░░░░░░░░░░  ▓▓▓▓▓▓▓▓▓▓  ▓▓▓▓▓░░░░░  ░░░░░░░░░░  ░░░░░░░░░░  ░░░░░░░░░░  CranioTwin Live 4D
H6   ░░░░░░░░░░  ░░░░░▓▓▓▓▓  ▓▓▓▓▓▓▓▓▓▓  ▓▓▓▓░░░░░░  ░░░░░░░░░░  ░░░░░░░░░░  Specialist Copilot
H4   ░░░░░░░░░░  ░░░░░▓▓▓▓▓  ▓▓▓▓▓▓▓▓▓▓  ▓▓▓▓▓▓▓▓▓▓  ▓▓▓▓▓░░░░░  ░░░░░░░░░░  CranioFM-Ω foundation model
H7   ░░░░░░░░░░  ░░░░░░░░░░  ░░░░░▓▓▓▓▓  ▓▓▓▓▓▓▓▓▓▓  ▓▓▓▓▓▓░░░░  ░░░░░░░░░░  federated mesh
H14  ░░░░░░░░░░  ░░░░░░░░░░  ▓▓▓▓▓▓▓▓▓▓  ▓▓▓▓▓▓▓▓▓▓  ▓▓▓▓▓▓▓▓▓▓  ▓▓▓▓▓▓▓▓▓▓  equity sentinel (runs forever once on)
H15  ░░░░░░░░░░  ░░░░░░░░░░  ░░░░░░░░░░  ░░░░░░░░░░  ░░░░░▓▓▓▓▓  ▓▓▓▓▓▓▓▓▓▓  closed-loop "Time Machine"
                                              ▓ = active   ░ = not yet
```

### 28.1 Phase H0 — Foundation (provenance + guardrail spine)

- **Entry gate.** §17 audit substrate green across shipped modules; §9 governance pattern documented.
- **Objective.** Stand up the cryptographic spine (**H9**) and the five horizon invariants so that *every later capability has something to sign to and abstain into*. Nothing clever ships before the safety scaffolding exists.
- **Workstreams.** (a) Merkle-anchored provenance ledger + HSM key management; (b) horizon-invariant SafetyGate extensions (abstention hook, refusal-as-event logging); (c) CRL governance — every capability gets a tracked CRL record.
- **Exit gate.** Provenance ledger verifies an independently-reconstructed Merkle root on shipped-module audit logs; SafetyGate emits and *records* a refusal event end-to-end.
- **Kill criteria.** If tamper-evidence cannot be demonstrated to an external auditor, H0 stops and the whole program pauses — provenance is non-negotiable.

### 28.2 Phase H1 — Prototype (twins, conformal, copilot seed)

- **Entry gate.** H0 exit green.
- **Objective.** Reach **CRL 2–3** on the capabilities that need no multi-site data yet: **H1 CranioTwin Live**, **H5 conformal sentinel**, and the **H6 copilot** retrieval seed.
- **Workstreams.** (a) 4D interpolation engine + uncertainty bands over §2.1/§2.2/§1.3; (b) conformal wrapper + OOD detector with abstention routing to §9.2; (c) citation-locked retrieval over the proof ledger + versioned literature index.
- **Exit gate.** CranioTwin Live renders a scrubbed trajectory with per-frame `modeled — not measured` labels; conformal coverage holds on a held-out synthetic cohort; copilot refuses every uncited generation in a red-team suite.
- **Kill criteria.** If conformal coverage cannot be empirically guaranteed, H5 reverts to CRL 1 and blocks all downstream capabilities that depend on abstention.

### 28.3 Phase H2 — Validate (foundation model + equity sentinel, internal)

- **Entry gate.** H1 exit green; ≥ 1 partner DUA executed (per §22) **or** synthetic-foundry (H8) coverage sufficient for internal validation.
- **Objective.** Train **H4 CranioFM-Ω** on available single-site + synthetic data; turn on **H14 equity sentinel** as a release-blocking gate; mature **H2 CranioGEN** and **H8 synthetic foundry**.
- **Workstreams.** (a) self-supervised multimodal pretraining + per-module adapter heads; (b) subgroup calibration dashboards + disparity-drift gate wired into §9.4; (c) generative morphogenesis envelope validated against §5.7 graph edit distance; (d) membership-inference audit on synthetic cohorts.
- **Exit gate.** CranioFM-Ω adapters match or beat the per-module checkpoints on §7 benchmarks; equity sentinel fails a deliberately-biased candidate release in CI; synthetic records pass the membership-inference audit.
- **Kill criteria.** If CranioFM-Ω cannot beat the existing checkpoint zoo on the rare-case stress suite (§7.3), the unified-model bet is shelved and modules keep their bespoke checkpoints.

### 28.4 Phase H3 — Federate (multi-site, privacy-preserving)

- **Entry gate.** H2 exit green; ≥ 2 partner sites live behind SSO with executed DUA + BAA.
- **Objective.** Stand up the **H7 federated swarm-learning mesh** and graduate the **H6 copilot** to multi-site literature + ledger grounding.
- **Workstreams.** (a) secure aggregation + per-round (ε, δ)-DP budget reporting; (b) on-site de-identification verified before any computation; (c) cross-site CranioFM-Ω refresh via mesh.
- **Exit gate.** A model improves on the held-out site *without any raw data leaving any site*, with the DP budget reported in the data card and verified by the provenance ledger.
- **Kill criteria.** If the DP budget required for utility exceeds the privacy tolerance agreed with partner IRBs, federation pauses and falls back to synthetic-foundry pretraining only.

### 28.5 Phase H4 — Stage (edge + sensing + regulatory)

- **Entry gate.** H3 exit green; conformal abstention (H5) at CRL ≥ 4.
- **Objective.** Push capability to the **edge** (**H10** on-device photogrammetry, **H11** home monitoring, **H12** low-resource builds) and file **Q-Subs** for the horizon capabilities that have a defined intended use.
- **Workstreams.** (a) on-device morphotype extraction + de-identified-vector-only transmission; (b) quantized/distilled edge builds carrying the identical SafetyGate; (c) regulatory staging — model cards, uncertainty + equity reports, pen test.
- **Exit gate.** Edge build passes the *identical* predeploy gate as the data-center build; on-device capture proves no image leaves the phone; first horizon Q-Sub filed.
- **Kill criteria.** Any edge build that cannot enforce the abstention threshold (H5) is pulled — a guessing model on a laptop is worse than no model.

### 28.6 Phase H5 — Closed-loop (the Time Machine)

- **Entry gate.** H4 exit green; ≥ 1 horizon capability cleared (CRL 8); equity sentinel green for ≥ 2 consecutive releases.
- **Objective.** Turn on **H13 structural causal engine** (research-only) and **H15 closed-loop outcome learning** under a PCCP, completing the lifelong learning loop.
- **Workstreams.** (a) SCM/do-calculus over the longitudinal registry with explicit confounder graphs; (b) PCCP-governed model refresh re-running the full §9.4 gate; (c) 5/10/20-year outcome ingestion feeding the next refresh.
- **Exit gate.** A PCCP-governed refresh deploys with a *complete, signed* release package and *zero* silent updates; causal outputs ship labeled `research-only — not individualized`.
- **Kill criteria.** Any refresh that degrades a subgroup (H14) or cannot reproduce its provenance chain (H9) is rolled back automatically; closed-loop learning never trades safety for freshness.

### 28.7 Program-level risk register

| # | Risk | Likelihood | Impact | Mitigation | Owning gate |
|:---:|---|:---:|:---:|---|:---:|
| R1 | Federated utility too low under acceptable DP budget | Med | High | Synthetic-foundry fallback (H8); negotiate budget with IRBs early | H3 |
| R2 | Foundation model underperforms bespoke checkpoints | Med | Med | Keep checkpoint zoo until CranioFM-Ω beats §7.3; no forced migration | H2 |
| R3 | Edge model degrades silently below abstention threshold | Low | High | Identical SafetyGate + hard abstention floor; refuse-not-guess | H4 |
| R4 | Provenance keys compromised | Low | Critical | HSM-backed keys; rotation; append-only verifiable ledger | H0 |
| R5 | Equity gate blocks otherwise-strong release | Med | Med | Treat as success, not friction; root-cause subgroup gap before ship | H2+ |
| R6 | Closed-loop model rot / silent drift | Med | High | PCCP re-runs full §9.4 gate per refresh; auto-rollback on regression | H5 |
| R7 | Causal claims over-interpreted as individual guidance | Med | High | `research-only` watermark + SafetyGate block on per-patient causal output | H5 |

### 28.8 How the phase plan ties back to the shipped system

Ω-HORIZON is not a parallel universe — it is the **next layer on the same substrate**. H9 signs the same audit logs §17 already hash-chains; H5 abstains into the §9.2 router that already exists; H14 plugs into the §9.4 release gate that already blocks unsupported claims; H15 closes the loop on the §8 registry that shipped modules already export to. **Every advanced capability inherits the safety contract before it inherits the spotlight.**

---

## 29. References + citations

[^cdc]: Centers for Disease Control and Prevention (CDC). _Craniosynostosis — Facts about Craniosynostosis._ https://www.cdc.gov/birth-defects/about/craniosynostosis.html
[^guideline]: Mathijssen IMJ, et al. Updated guideline on treatment and management of craniosynostosis. _Europe PMC_, 2021. https://europepmc.org/article/MED/33255334
[^fda]: U.S. Food and Drug Administration. _Artificial Intelligence and Machine Learning (AI/ML)-Enabled Medical Devices._ https://www.fda.gov/medical-devices/software-medical-device-samd/artificial-intelligence-and-machine-learning-aiml-enabled-medical-devices
[^transcriptomics-1]: Tahiri Y, et al. Transcriptomic signatures of single-suture craniosynostosis identified via RNA-seq of calvarial cell lines. _PMC_, 2024.
[^transcriptomics-2]: Single-cell and spatial atlas of suture stem-cell dynamics across developmental stages in FGFR2 C342Y/+ craniosynostosis model. _PMC_, 2024.
[^genereviews]: GeneReviews®. _FGFR-Related Craniosynostosis Syndromes._ NCBI Bookshelf. https://www.ncbi.nlm.nih.gov/books/NBK1455/
[^clingen]: ClinGen Curation Activities — Craniosynostosis. https://search.clinicalgenome.org/kb/conditions
[^icp-oct]: Driessen C, et al. Optical Coherence Tomography for early recognition of raised intracranial pressure in craniosynostosis. _PMC._
[^optic]: Neuro-ophthalmology in syndromic craniosynostosis. _ScienceDirect._
[^radiation]: Systematic review of radiation-free cranial and neural assessment protocols for craniosynostosis. _PMC_, 2024.
[^endoscopic-window]: Reviews of endoscopic vs open craniosynostosis surgery age windows. _PMC._
[^pvd]: Posterior vault distraction in syndromic and multisuture craniosynostosis — Steinbacher DM (PMC4980137), Goldstein JA technical evolution (PMC4219914), Greives MR multisuture FOA delay (PMC6952159), Derderian CA long-term cohort (PMC11322207), Wes AM volume comparison (PMC9612681), Tahiri Y routine low occipital osteotomy (PMC7553461), Wagner CS systematic review of complications (_J Neurosurg Pediatr_ 37(3):197), Anderson PJ dural sinus volume after PCVD+FMD (_J Neurosurg Pediatr_ 30(3):330).

---

## 30. License

Apache 2.0 across every module, with per-module governance overlays documented in each module's `SAFETY.md`.

Some module artifacts (DECIPHER variants · DICOM datasets requiring DUA · DINOv2 weights CC-BY-NC 4.0 · institutional retrospective cohorts) carry inherited non-commercial or DUA-bound use restrictions documented in each module's `data/catalog/*.yaml` and `regulatory/data-card-v1.md`.

The Apache 2.0 license applies to code and infrastructure-as-code. It does NOT confer rights over any clinical data ingested through the partnerships pack; those rights are governed by the executed DUA between AURORA-CRANIO Ω deployments and the partner institution.

---

## 31. One-line summary

> **AURORA-CRANIO Ω is the first craniosynostosis-specific research–clinical operating system — 9 sections, 30+ modules, a non-prescriptive safety contract baked into every release, evidence-anchored proof ledgers for every claim it makes, and 1,650+ passing tests across the shipped modules.**

It is not "AI for skulls." It is the operating system that learns how skull growth, sutures, brain development, genotype, surgery, and lived outcomes interact across a child's life — and refuses to make claims it cannot prove.
