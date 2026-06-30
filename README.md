# aurora-cranio-omega — AURORA-CRANIO · Craniosynostosis research-clinical operating system

> A program index for a craniosynostosis-specific research toolchain that keeps one shared,
> evidence-anchored record of a child's skull, biology, surgery, and outcomes over time, for
> specialist review.

> **Research use only.** This software is not a medical device. It does not diagnose, treat,
> or recommend treatment, and it must not be used for clinical decision-making. Every output
> is structured evidence for a named specialist to review; the system never recommends an
> operation, a timing, or a device action.

![status](https://img.shields.io/badge/status-specialist--support%20research-orange)
![program](https://img.shields.io/badge/program-AURORA--CRANIO-blue)
![output](https://img.shields.io/badge/output-non--prescriptive-red)
![tests](https://img.shields.io/badge/tests-1650%2B%20across%20shipped%20modules-green)
![RUO](https://img.shields.io/badge/use-research--only-orange)
![license](https://img.shields.io/badge/license-Apache--2.0-lightgrey)

| | |
| --- | --- |
| Archetype | E — Meta / organization (program index) |
| Program | AURORA-CRANIO |
| Documentation standard | 1.0.0 |
| Status | Active; one module FDA-submission-ready, several shipped, most planned |

---

## Overview

Craniosynostosis is a birth defect in which one or more of the seams between an infant's
skull bones (the sutures) fuse too early. That restricts how the skull can grow and changes
its shape. Caring for an affected child can span two decades and many specialists: surgeons,
neurosurgeons, radiologists, geneticists, eye doctors, sleep doctors, and developmental
teams.

Today each specialist tends to use a different tool and keep a different record, so no single
shared picture of the child follows them through care. AURORA-CRANIO is a family of research
software that aims to fix that. It builds one shared, time-aware record of a child's skull,
sutures, biology, imaging, surgery, and long-term outcomes that every specialist can read from
and add to.

This repository is the index for that program. It is not the software itself. It describes the
nine areas the program covers, lists the modules in each, says honestly which ones are built and
which are still planned, and states the safety rules every module must obey. The most important
rule: the system structures evidence for a specialist to judge; it never recommends a treatment.

---

## Table of contents

- [Demonstration](#demonstration)
- [What this is](#what-this-is)
- [Why it matters](#why-it-matters)
- [Key concepts](#key-concepts)
- [Architecture](#architecture)
- [Installation](#installation)
- [Quickstart](#quickstart)
- [Usage](#usage)
- [Methods and science](#methods-and-science)
- [Data](#data)
- [Validation](#validation)
- [Results](#results)
- [Governance and safety](#governance-and-safety)
- [Reproducibility](#reproducibility)
- [Limitations](#limitations)
- [Roadmap](#roadmap)
- [Related repositories](#related-repositories)
- [Contributing](#contributing)
- [License and citation](#license-and-citation)

---

## Demonstration

A short walkthrough for any reader: open a real surgical case in the most-developed module,
watch the system assemble the evidence for a posterior-vault expansion, and then watch its
safety checkpoint refuse an over-strong claim the data cannot support and hand the case to the
right specialist instead.

*Walkthrough video to be published.* No hero image ships with this index repository; the worked
safety scenarios under [Governance and safety](#governance-and-safety) stand in for it.

---

## What this is

AURORA-CRANIO is a craniosynostosis-specific research and clinical-support toolchain, organized
as nine areas that decompose into more than thirty separately-versioned modules. This repository
is the program index. Each module is built, tested, and released on its own.

The program is defined by six commitments, all preserved as built:

- **Disease-specific.** Every output type, endpoint, benchmark task, and test fixture is shaped
  for craniosynostosis, not a generic neuro or craniofacial planner adapted after the fact.
- **Specialist-support.** Every output is for a craniofacial surgeon, pediatric neurosurgeon,
  neuroradiologist, ophthalmologist, or geneticist to review. No module makes an autonomous
  clinical decision.
- **Non-prescriptive.** Outputs structure evidence. They do not recommend surgery, timing,
  device activation, device removal, or revision. Prescriptive wording is blocked at a
  safety checkpoint in every module.
- **Evidence-anchored.** Every classification carries a proof state and an evidence tier.
  Nothing is labeled "diagnosed" without the proof record that produced it, and nothing is
  labeled "validated" without a stated validation cohort, design, and outcome.
- **Time-aware.** Each module is built around the care lifecycle, from before surgery through
  the operation, postoperative remodeling, long-term growth, and school-age outcomes, not a
  single imaging timepoint.
- **Open-source.** Apache-2.0 across the codebase, with per-module governance overlays for
  partner data, regulatory documents, and validation evidence.

**What it does not do, by construction.** It is not a diagnostic device: no module emits a
standalone diagnosis without specialist adjudication. It is not a surgical decision-support
tool: no module recommends an operation, a timing, or a technique. It is not a consumer or
family-facing app: every interface is operator-facing behind specialist authentication, and the
safety checkpoint refuses to emit family-actionable instructions. The machine-learning models
embedded in some modules are secondary signals; a deterministic safety checkpoint, not a model,
is the primary safety control in every module.

---

## Why it matters

The field already has strong generic surgical-planning tools and a clear multi-specialty
consensus on how craniosynostosis care should work. What it lacks is a shared record that wires
those specialists together around the same evidence object, for the same child, across two
decades.

Generic planners render the geometry of a skull well. They were not built to reason about
suture biology, fusion stage, skull-growth forecasting, intracranial-volume reserve, eye and
endocrine and developmental endpoints, surgical-timing trade-offs, or lifelong outcome learning.
AURORA-CRANIO is built for those craniosynostosis-specific tasks, and it is designed to
complement the generic planners rather than compete with them: they render the geometry, this
program carries the biology, the physiology, the longitudinal outcome learning, and the safety
contract that decides what may be claimed and what may not.

The U.S. Centers for Disease Control and Prevention estimates that approximately 1 in 2,500
babies in the United States has craniosynostosis, which is on the order of 1,500 affected
infants per year and proportionally more worldwide. The most recent international guideline, the
2020 guideline on craniosynostosis treatment and management (Mathijssen et al., 2021),
emphasizes that this care must be multidisciplinary across plastic and craniofacial surgery,
pediatric neurosurgery, neuroradiology, genetics, ophthalmology, audiology and ear-nose-throat
care, sleep medicine, developmental pediatrics, orthotics, and family support. A shared,
auditable evidence record is what lets those specialists work from the same object instead of a
dozen disconnected ones.

---

## Key concepts

- **Craniosynostosis** — a condition in which one or more skull sutures fuse prematurely,
  restricting skull growth and forcing compensatory expansion along the sutures that remain open.
- **Suture** — a fibrous seam between two skull bones where growth happens. The program models a
  suture as a living growth zone with a fusion stage, not a simple open-or-closed switch.
- **Proof ledger** — the record of specific evidence (an imaging slice, a clinical finding, a
  genetic variant, a reviewer adjudication) behind any label. An empty ledger forces the label
  to "indeterminate," never to a diagnosis.
- **Evidence tier** — the validation status attached to every biomarker, from clinical-standard
  down to unsupported, so a reader always knows how much trust a number has earned.
- **Digital twin** — a per-patient computational model of skull and brain growth used to reason
  about expansion and reserve. Its outputs are model-based estimates, never measured pressures.
- **Intracranial pressure (ICP) reserve** — how much room a child's skull has to accommodate
  brain growth. The program reports this only as an evidence object, never as a standalone ICP
  diagnosis.
- **Safety checkpoint (SafetyGate)** — the deterministic control that scans every output, blocks
  prescriptive or unproven claims, and routes the case to a named specialist. It is the primary
  safety control in every module.
- **Specialist-review handoff** — a required field on every report naming the specialty to review
  it and the exact question to answer. An empty handoff blocks the report from being emitted.

---

## Architecture

The program is organized into nine areas, and every module inside them follows the same one-way
evidence path. A case is registered, its evidence is captured as structured records rather than
free text, each module's engines classify the case along several independent outputs, and every
result is forced through a deterministic safety checkpoint before it can be returned, exported,
or shown.

The nine areas are:

| Area | Name | What it covers | Maturity |
| --- | --- | --- | --- |
| Section 1 | CRANIO-ORIGIN | Suture identity, fusion proof, etiology, genetics, developmental biology | Planned |
| Section 2 | CRANIO-PHYSICS | Skull-growth mechanics, ICP reserve, venous and airway coupling, developmental risk | Partial; four modules shipped |
| Section 3 | CRANIO-BIOMARKERS | A biomarker factory spanning imaging, molecular, ophthalmic, and outcome markers | Planned; embedded markers shipped |
| Section 4 | CRANIO-DIAGNOSTICS | Diagnosis support, differential, imaging-pathway routing, radiation-safe review | Scaffold |
| Section 5 | CRANIO-FORGE | Surgical-counterfactual, operative-truth, and postoperative-tracking twins | Substantial; four surgical twins shipped |
| Section 6 | CRANIO-NEURODEVELOPMENT | Brain, vision, hearing, sleep, school, behavior, and family outcome learning | Partial; overlaps Sections 2 and 3 |
| Section 7 | CRANIO-BENCHMARK | Open benchmark, rare-case stress tests, biomarker-validation suite | Substantial; three of four suites shipped |
| Section 8 | CRANIO-ENDPOINTS | Standardized endpoint export to DICOM-SR, FHIR R4, Phenopackets, OMOP, and CDISC | Distributed across modules; umbrella planned |
| Section 9 | CRANIO-GOVERNANCE | Claim-scope gate, unsupported-case routing, safety case, release gate | Universal pattern in every shipped module |

Every shipped module is built on the same substrate so that new modules clone a proven pattern
rather than reinvent it. In plain terms, each module is a typed core library that does the
reasoning, wrapped by the same supporting layers: a command-line interface, a production
application programming interface (API), a dashboard, an optional machine-learning sidecar that
supplies secondary signals, a real-data engine that reads only from verified records, a
de-identification pipeline for partner data, validation tooling, deployment infrastructure, and a
regulatory packet. The constant element across all of them is the deterministic safety
checkpoint, which is the primary safety control and sits in front of every output. This uniformity
is what lets the program scale to more than thirty modules without re-engineering each one.

---

## Installation

This repository is the program index; it contains documentation only and has nothing to install.
Each module is its own installable project with its own setup instructions.

The shipped modules are full TypeScript libraries with command-line interfaces, dashboards, and
Python sidecars that carry trained model checkpoints. To work with one, clone that module's
repository and follow its own setup guide. The most-developed module, the posterior-vault
distraction twin, lives at
[github.com/AURORA-NEURO/aurora-cranio-5.5](https://github.com/AURORA-NEURO/aurora-cranio-5.5) and
is the reference for how a module is structured and run.

---

## Quickstart

There is no code to run from this index. The smallest real result the program produces is a
safety refusal: when a clinician tries to claim more than the evidence supports, the safety
checkpoint blocks the claim, names why, and proposes the honest classification instead.

A representative refusal, from the posterior-vault distraction twin, when a clinician tries to
claim that intracranial pressure improved without any postoperative eye evidence on record:

```text
HARD_STOP_NoOphthalmicEndpoint
Reason: cannot claim supported-improvement of ICP response without ophthalmic, OCT,
direct-ICP, or clinician-adjudicated endpoint. Expansion distance does not imply
ICP resolved.
Recommended classification: plausible-unmeasured-improvement.
Specialist handoff: pediatric neuro-ophthalmology and craniofacial surgery for
postoperative ophthalmic surveillance.
```

To run the full module and reproduce this behavior, clone
[aurora-cranio-5.5](https://github.com/AURORA-NEURO/aurora-cranio-5.5) and follow its setup guide.

---

## Usage

Each module exposes the same four ways to use it, so a reader who learns one module can navigate
the rest.

- **Library.** A typed core library that classifies a case along several independent outputs and
  returns structured evidence objects, never free-text verdicts.
- **Command-line.** Per-module commands to register a case, import measurements, compute the
  research indices, and generate or export a report.
- **API and dashboard.** A production API with authentication and audit logging, and a dashboard
  whose every page renders real records at request time behind a persistent safety banner.
- **Export.** Every report can be returned to a partner institution's records as DICOM-SR, FHIR
  R4, Phenopackets, OMOP, or research-mode CDISC tables.

The concrete commands and endpoints live in each module's own repository. The posterior-vault
distraction twin at
[github.com/AURORA-NEURO/aurora-cranio-5.5](https://github.com/AURORA-NEURO/aurora-cranio-5.5) is
the reference implementation for all four surfaces.

---

## Methods and science

*In plain terms,* each module turns a clinical case into structured records, reasons over those
records with a fixed set of engines, and refuses to state anything it cannot prove from the
evidence on file. The science is in how the records are defined, how the reasoning is decomposed
so that distinct judgments are never collapsed, and how the proofs and tiers are enforced.

Three method patterns recur across the program:

- **Independent outputs, never collapsed.** Each surgical twin classifies a case along five core
  outputs (volume, vector, hardware, ICP response, staged-surgery forecast) and reports each
  separately, instead of a single "success or failure" verdict. A strong volume result does not
  imply a resolved ICP, and the types make that impossible to conflate.
- **Proof before label.** Every diagnostic label points to a proof ledger of specific evidence
  rows. An empty ledger yields "indeterminate," not a diagnosis. Every genetic variant carries its
  ClinVar review status and clinical significance, so a variant of uncertain significance never
  collapses to "pathogenic."
- **Tiered biomarkers.** Every biomarker is tagged with a validation tier, and a research-only
  marker cannot appear in a clinical report. The biomarker atlas stores each marker together with
  its tier, its applicability scope (age range, syndrome, imaging modality, follow-up), and its
  known failure modes.

The machine-learning components are deliberately secondary. Where a module ships a trained model,
the model supplies a signal that the deterministic safety checkpoint can override but never
defer to.

---

## Data

The program distinguishes real data from synthetic stand-ins at every step, and synthetic
material is retained only as test fixtures, never to support a real-case claim. The largest
shipped real-data ingestion belongs to the posterior-vault distraction twin and is recorded in
that module's data card.

| Dataset | Real / synthetic | Role |
| --- | --- | --- |
| Human Phenotype Ontology (HPO), 2026-02-16 | real | 19,944 terms, 23,677 relations, 282,723 disease-phenotype annotations |
| ClinVar craniofacial subset | real | 1,471 pathogenic and likely-pathogenic variants across FGFR1/2/3, TWIST1, EFNB1, IHH, RAB23, ALX1/3/4, MSX2 |
| PubMed posterior-vault-distraction corpus | real | 1,888 abstracts via NCBI E-utils, with 1,770 auto-labels across 13 complication classes |
| MedQuAD craniofacial | real | 3,531 question-and-answer pairs |
| PubMedQA (PQA-L) | real | 1,000 records |
| Synthetic case archetypes | synthetic | Failure-mode coverage for testing only; never used to support a real-case claim |

Training data for the shipped models is similarly real: the family-observation translator was
trained on 60,000 real records drawn from MedQuAD, PubMedQA, PubMed E-utils, HPO, and
AAP and CHOP material.

Some module artifacts carry inherited use restrictions, including DECIPHER variants, DICOM
datasets requiring a data-use agreement, certain model weights under non-commercial licenses, and
institutional retrospective cohorts. These restrictions are documented in each module's own data
card.

---

## Validation

The program's evidence comes from per-module verification, trained-model metrics on held-out
real data, and a benchmark suite whose safety-suppression tasks must pass completely on every
release. Every figure below is per-module and labeled with its provenance.

- **The posterior-vault distraction twin verifies cleanly.** It passes 671 of 671 TypeScript tests
  and 52 of 52 Python sidecar tests, with all 52 of 52 predeploy checks passing.
- **Its foundation model reports honest, mixed metrics on real data.** Posterior-volume
  segmentation reaches a Dice overlap of 0.864; vector-measurement agreement is a Pearson
  correlation of 0.713; hardware-extraction F1 is 0.043, which the module flags as too low and
  attributable to a small training head. A text classifier trained on PubMed reaches a macro F1 of
  0.705 on 277 held-out real PubMed records across 13 complication labels.
- **The neurodevelopment causal adjudicator is trained and bounded.** Its checkpoint is 87 MB and
  21.8 million parameters; it reaches a recall of at least 0.5 on six of seven archetypes and
  passes 90 of 90 tests with 34 of 34 predeploy checks.
- **The family-observation translator reports a modest accuracy honestly.** It reaches an
  observation accuracy of 0.929 after three epochs on its 60,000 real records, passes 107 of 107
  safety-gate tests, and passes 116 of 116 tests with 16 of 16 predeploy checks.

A model that cannot safely say "not craniosynostosis" on a mimic case does not receive a
diagnostic-support claim. The rare-case stress suite (twelve archetypes, fourteen stress classes)
and the segmentation benchmark (144 tests) enforce that boundary.

---

## Results

The headline findings below are stated with their provenance and their caveats. The program is
mostly planned; what is shipped is concentrated in Sections 2, 5, and 7.

- **One module is FDA-submission-ready.** The posterior-vault distraction twin (version 5.5.5)
  ships its full engine set, a foundation model, a real-data clinical layer, a 17-document
  regulatory packet, and complete deployment infrastructure, with 671 of 671 TypeScript and 52 of
  52 Python tests passing.
- **Four surgical twins are shipped.** Endoscopic strip craniectomy, open cranial vault
  remodeling, fronto-orbital advancement, and posterior-vault distraction each ship as a full
  module sharing the same five-output, safety-gated contract.
- **Two trained clinical models are shipped beyond the surgical twins.** The neurodevelopment
  causal adjudicator and the family-observation translator both ship trained checkpoints and pass
  their full test suites.
- **The program-wide test total exceeds 1,650 passing tests across the shipped modules**, each
  module independently verified with its own regulatory packet. This is the figure the body
  supports; the individual badge of 671 tests reflects the posterior-vault twin alone, not the
  whole program.
- **The benchmark layer is three-quarters shipped.** Three of the four benchmark suites are
  released: segmentation and skull-shape, the rare-case stress suite, and the biomarker-validation
  bench.

Most modules across Sections 1, 3, 4, 6, 8, and 9 are still planned or at scaffold stage; the
status of every module is given in [Architecture](#architecture) and [Roadmap](#roadmap).

---

## Governance and safety

Every output is structured evidence that a named specialist must review, and every output passes
through a deterministic safety checkpoint before it can be returned, exported, or shown. The
checkpoint is the primary safety control in every module; the machine-learning models are
secondary signals it can override. There is no bypass: on any violation the checkpoint blocks the
output and logs the attempt to a hash-chained audit record.

Ten invariants hold across every module, built or planned:

1. No craniosynostosis label without suture proof; an empty proof ledger yields "indeterminate."
2. No surgical-timing claim without age-window and pathway context.
3. No ICP-risk statement without optic, volume, venous, airway, or symptom evidence and an
   adequate follow-up window.
4. No genotype claim without a validation state; a variant of uncertain significance never
   collapses to "pathogenic."
5. No biomarker claim without an evidence tier; a research-only marker cannot enter a clinical
   report.
6. No postoperative-success claim without a sustained, planned-direction change in skull-growth
   topology and the relevant endpoint.
7. No neurodevelopment claim without an age-normalized measurement and a named instrument.
8. No release without subgroup, calibration, uncertainty, external-site, and rare-case stress
   reports.
9. No prescriptive language anywhere; a regex and structural scan blocks any output that
   recommends, instructs, or declares an outcome resolved, and triggers a safety incident.
10. A specialist-review handoff is always present; an empty handoff blocks emission.

The safety checkpoint is exercised by mandatory suppression tasks in the benchmark suite, and a
complete pass on those tasks is a non-negotiable release gate. Worked examples of the checkpoint
refusing an "ICP resolved" overclaim, a premature "fronto-orbital advancement no longer needed"
claim, and an "operative success" claim on a case that has relapsed are part of each module's
documentation.

---

## Reproducibility

Each module reproduces its own headline numbers from a clean checkout of that module's
repository. The test suites, predeploy checks, and benchmark runs are each a single command
inside the module, and the real datasets are ingested into a versioned local store so the inputs
are identical across runs. Synthetic stand-ins are always labeled as such and are never used to
support a real-case result.

This index repository carries no code and no figures to reproduce. To reproduce a module's
results, clone that module and run its test and benchmark commands; the posterior-vault
distraction twin at
[github.com/AURORA-NEURO/aurora-cranio-5.5](https://github.com/AURORA-NEURO/aurora-cranio-5.5)
is the reference.

---

## Limitations

- **The program is mostly planned.** Across nine areas and more than thirty modules, only a
  handful are shipped; Sections 1, 3, 4, 6, 8, and 9 are largely planned or at scaffold stage.
- **The shipped evidence is concentrated in one module.** The deepest validation belongs to the
  posterior-vault distraction twin. The program-wide total of more than 1,650 tests is a sum of
  independently verified modules, not a single integrated test run.
- **Some model metrics are weak and labeled as such.** Hardware-extraction F1 of 0.043 reflects a
  small training head; segmentation and text-classification metrics are moderate, not definitive.
- **Twin outputs are model-based estimates, not measurements.** Intracranial-volume and
  pressure-reserve reasoning is reported as an evidence object and is never presented as a
  measured pressure.
- **No regulatory clearance exists.** Regulatory pathways are planned and one Q-submission is in
  preparation; nothing in the program is cleared, and nothing is clinically deployable.
- **Validation is largely on synthetic archetypes and retrospective public data.** Prospective,
  multi-site validation on real cohorts is future work, gated behind partner data-use agreements.
- **This repository is documentation only.** It installs nothing and runs nothing; it indexes the
  program.

---

## Roadmap

The near-term plan is posterior-vault-first: the most-developed module files the first regulatory
Q-submission, and its feedback shapes the template the other surgical twins reuse.

- **Now (Q1 2026).** Posterior-vault distraction twin released at version 5.5.5 with its
  infrastructure complete; cloud-staging configuration prepared; first partner-site outreach
  begins.
- **Next (Q2 2026).** Cloud staging live behind single sign-on; first external penetration test;
  first partner agreements signed; fronto-orbital and open-vault twins deployed to staging.
- **Mid (Q3 to Q4 2026).** Specialist-adjudication round at two to three sites, targeting roughly
  150 real posterior-vault cases; first regulatory Q-submission filed; first preprint; the first
  Section 1 module (suture-fusion proof-ledger compiler) begins.
- **Late (2027).** First 510(k) submission for the lead module; further Q-submissions; Section 1
  and Section 3 modules build out; first peer-reviewed publication on deployed-system data.
- **Long (2028 and beyond).** First clearance and pilot deployment; physics-module clearances;
  post-market surveillance with controlled model updates; international regulatory expansion.

---

## Related repositories

AURORA-CRANIO decomposes into separately-released modules. The most-developed module is published
under the AURORA-NEURO organization; several other shipped modules are currently published under a
personal namespace, and they are linked here exactly as the program records them rather than
under a fabricated organization URL.

- [`aurora-cranio-5.5`](https://github.com/AURORA-NEURO/aurora-cranio-5.5) — posterior-vault
  distraction and expansion twin (Section 5.5); the reference implementation.
- [`aurora-cranio-5.3`](https://github.com/MurariAmbati/aurora-cranio-5.3) — open cranial vault
  remodeling twin (Section 5.3).
- [`aurora-cranio-5.4`](https://github.com/MurariAmbati/aurora-cranio-5.4) — fronto-orbital
  advancement and orbital-risk twin (Section 5.4).
- [`aurora-cranio-2.5`](https://github.com/MurariAmbati/aurora-cranio-2.5) — head-shape to
  neurodevelopment causal adjudicator (Section 2.5).
- [`aurora-cranio-2.7`](https://github.com/MurariAmbati/aurora-cranio-2.7) — family-observation
  translator (Section 2.7).

The endoscopic strip craniectomy twin (Section 5.2), the intracranial-volume reserve twin
(Section 2.2), the venous-coupling mapper (Section 2.3), and the benchmark suites (Sections 7.1,
7.3, 7.4) are shipped as local modules without a public repository link at this time.

---

## Contributing

Contributions happen inside each module's own repository, where the test suite, linter, and
predeploy checks are part of every change. New results must carry units, uncertainty intervals,
sample sizes, and a real-versus-synthetic label, and new outputs must respect the safety
checkpoint and the ten invariants. Each module documents its own setup, test, and review process;
the posterior-vault distraction twin at
[github.com/AURORA-NEURO/aurora-cranio-5.5](https://github.com/AURORA-NEURO/aurora-cranio-5.5) is
the reference for the contribution workflow.

---

## License and citation

Apache-2.0 across every module, with per-module governance overlays documented in each module's
own safety document. The Apache-2.0 license applies to code and infrastructure-as-code. It does
not confer rights over any clinical data ingested through a partnership; those rights are governed
by the executed data-use agreement between a deployment and the partner institution. Some module
artifacts carry inherited non-commercial or agreement-bound restrictions, documented in each
module's data card.

If you reference this program in research, cite it as the AURORA-CRANIO toolchain and cite the
specific module and dataset you used:

```text
AURORA-NEURO. AURORA-CRANIO: a craniosynostosis-specific research-clinical operating system, 2026.
```

Selected sources behind the program's clinical framing: the U.S. Centers for Disease Control and
Prevention craniosynostosis facts; the 2020 international guideline on craniosynostosis treatment
and management (Mathijssen et al., 2021); GeneReviews FGFR-related craniosynostosis syndromes; and
ClinGen curation of craniosynostosis genes. Full references are recorded in the modules that rest
on them.

---

> **Research use only.** This software is not a medical device and does not diagnose, treat, or
> recommend treatment. Every output is structured evidence for specialist review; the system never
> recommends an operation, a timing, or a device action.
