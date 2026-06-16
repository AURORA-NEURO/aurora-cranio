
window.AURORA_DATA = {
  "meta": {
    "version": "1.0.0",
    "versionLabel": "Ω program umbrella — 9 sections / 30+ modules (Research preview)",
    "license": "Apache-2.0 — Research / Specialist-Support, non-prescriptive (per-module DUA overlays)",
    "modules": 1,
    "subsystems": 11,
    "languages": [
      "TypeScript",
      "Python"
    ],
    "state": "AURORA-CRANIO Ω is a program umbrella that ties together a 9-section, 30+ module craniosynostosis research-clinical operating system. It is not a single trained model: §5 CRANIO-FORGE is substantial (4 shipped surgical twins) and §7 CRANIO-BENCHMARK has 3 shipped suites, while §1/§3/§4/§6/§8 range from spec-only to scaffold. This console governs the whole module family; the trained checkpoints live inside individual modules (§2.5, §2.7, §5.x).",
    "modelsLabel": "Modules",
    "subsystemsLabel": "Subsystems",
    "foundationChip": "Program umbrella",
    "foundationNoun": "module program",
    "productType": "sim-policy"
  },
  "modules": [
    {
      "slug": "aurora-cranio",
      "idx": "01",
      "code": "AURORA-CRANIO",
      "name": "AURORA-CRANIO Ω",
      "latin": "systema operandi craniosynostosis per probationem",
      "tagline": "The first craniosynostosis-specific research-clinical operating system: 9 sections, 30+ modules, a non-prescriptive safety contract baked into every release.",
      "lead": "AURORA-CRANIO Ω is an open research-clinical operating system for craniosynostosis biology, skull-growth mechanics, neurodevelopment, surgical topology, biomarker discovery, and outcome learning. It is disease-specific by construction: every output type, endpoint, benchmark task, and test fixture is craniosynostosis-shaped, and every module is specialist-support, non-prescriptive, evidence-anchored, time-aware, and federated-ready. The program decomposes into 9 sections (CRANIO-ORIGIN, CRANIO-PHYSICS, CRANIO-BIOMARKERS, CRANIO-DIAGNOSTICS, CRANIO-FORGE, CRANIO-NEURODEVELOPMENT, CRANIO-BENCHMARK, CRANIO-ENDPOINTS, CRANIO-GOVERNANCE) and 30+ separately-versioned modules that share one engineering substrate and obey 10 core invariants. The deterministic SafetyGate — not any ML model — is the primary safety control in every module; the embedded checkpoints (CranioNeuroDev, CranioFOT, CranioForge-Vault, CranioFOA, CranioPVD-FM) are secondary signals.",
      "accent": "#7C3AED",
      "accent2": "#F59E0B",
      "status": "live",
      "stats": {
        "subsystems": 11,
        "scope": "Covers: one evidence object per child across 20+ years, wiring craniofacial surgery, neurosurgery, neuroradiology, genetics, ophthalmology, sleep/airway, neurodevelopment, and family outcomes around the same record. Does NOT: diagnose a child, recommend surgery / timing / technique / device activation or removal, replace specialist review, convert association into causation, or expose any family-facing diagnostic interface. Every UI is operator-facing behind specialist authentication.",
        "readiness": "Program-aggregate >=1,650 passing tests across shipped modules, each independently verified with its own regulatory packet. Reference module §5.5 PVD: 671/671 TS + 52/52 Python, predeploy 52/52. Other shipped: §2.2 predeploy 145/145; §2.3 32/32; §2.5 90/90 + 34/34; §2.7 116/116 + 16/16; §5.2 82/82 + 17/17; §5.3 165 tests + 6/6; §5.4 54/54 + 17/17; §7.1 144/144 + 10/10; §7.3 26/26. Local umbrella atlas: 13 domains, 103 catalogued biomarkers, 22 services.",
        "pilots": "Research preview. No clinical deployment. PVD-first regulatory strategy: §5.5 is Phase-4-ready with a 17-document submission packet drafted, Q-Sub to be filed first; ECSC/OCVR/FOA follow on the validated template. Partner-site cold outreach targets high-volume craniofacial centers (CHOP, Boston Children's, Seattle Children's, Stanford, GOSH, Texas Children's); federated learning keeps raw PHI inside each institution.",
        "latency": "target <120ms",
        "license": "Apache-2.0 — Research / Specialist-Support, non-prescriptive (per-module DUA overlays)"
      },
      "clinical": "Research preview / specialist-support, non-prescriptive by construction. Not a diagnostic device, not a surgical decision-support tool, not a consumer/family app, not an autonomous AI. No module emits a standalone diagnosis without specialist adjudication, and prescriptive language is hard-blocked at the SafetyGate of every module via regex + structural check + audit log. IMDRF SaMD pathway is module-specific (mostly Class II / IEC 62304 Class B; §5.3 OCVR Class C; §4.x diagnostic adjudicators Class III evaluation) and pending Q-Sub. Apache-2.0 governs code; clinical data rights are governed by executed DUA/BAA with each partner institution.",
      "personas": [
        "Craniofacial / plastic surgeon",
        "Pediatric neurosurgeon",
        "Pediatric neuroradiologist",
        "Clinical geneticist / genetic counselor",
        "Neuro-ophthalmologist",
        "Craniofacial outcomes researcher"
      ],
      "seedKey": "aurora-cranio",
      "dxPool": [
        "Sagittal (scaphocephaly)",
        "Metopic (trigonocephaly)",
        "Unilateral coronal",
        "Bilateral coronal",
        "Lambdoid",
        "Multisuture / pansynostosis",
        "Syndromic (Apert / Crouzon / Pfeiffer, FGFR)",
        "Saethre-Chotzen (TWIST1/TCF12)",
        "Muenke",
        "Deformational plagiocephaly (mimic)",
        "Benign metopic ridge (mimic)",
        "Secondary synostosis (microcephaly / metabolic / shunt-related)"
      ],
      "diff": [
        [
          "§5 CRANIO-FORGE surgical twins (shipped)",
          0.3
        ],
        [
          "§7 CRANIO-BENCHMARK + stress suites (shipped)",
          0.18
        ],
        [
          "§2 CRANIO-PHYSICS ICP-reserve / coupling (shipped)",
          0.16
        ],
        [
          "§9 SafetyGate + non-prescriptive contract",
          0.14
        ],
        [
          "§1 CRANIO-ORIGIN suture proof + etiology (planned)",
          0.1
        ],
        [
          "§3 CRANIO-BIOMARKERS validation-tier atlas (planned)",
          0.07
        ],
        [
          "§8 CRANIO-ENDPOINTS FHIR/DICOM-SR/OMOP exporters",
          0.05
        ]
      ],
      "prom": {
        "name": "Unsafe-claim suppression on safety benchmark tasks",
        "unit": "/100",
        "v": 100,
        "peer": 0,
        "dir": "higher"
      },
      "fm": {
        "code": "CRANIO-ORIGIN",
        "name": "AURORA-CRANIO Ω program umbrella",
        "kind": "Program / portfolio umbrella, not a model. Ties together 9 sections and 30+ separately-versioned craniosynostosis modules over one engineering substrate (TypeScript core + deterministic SafetyGate + CLI + production API + Next.js dashboard + Python sidecar + EHR/de-id pipeline + validation tooling + IaC + regulatory packet). The trained PyTorch checkpoints (CranioNeuroDev, CranioFOT-tiny, CranioForge-Vault, CranioFOA, CranioPVD-FM) live inside individual modules and are secondary signals; the SafetyGate is the primary safety control.",
        "params": "rule-encoded / non-parametric (program umbrella; per-module checkpoints range from ~2.4M to ~500M params)",
        "quant": "n/a",
        "version": "1.0.0",
        "auc": 0,
        "eval": 0,
        "ece": 0,
        "status": "live",
        "signed": false,
        "whash": "omega-v1.0.0",
        "trainN": "0 (a program is not a model; per-module training corpora documented in each module's data card, e.g. §5.5 PVD: HPO 19,944 terms + ClinVar 1,471 craniofacial variants + 1,888 PubMed abstracts)",
        "sites": 0,
        "drift": 0,
        "blurb": "This is a program umbrella, not a trained model, so auc/eval/ece are 0 and it is unsigned by construction — that is the honest state. AURORA-CRANIO Ω coordinates a 9-section, 30+ module operating system whose maturity is uneven: §5 CRANIO-FORGE is substantial (4 shipped surgical twins, §5.5 PVD as reference implementation), §7 CRANIO-BENCHMARK has 3 of 4 suites shipped, §2 CRANIO-PHYSICS has 4 shipped modules including 2 with trained checkpoints, while §1 CRANIO-ORIGIN, §3 CRANIO-BIOMARKERS, §4 CRANIO-DIAGNOSTICS, §6 CRANIO-NEURODEVELOPMENT, and §8 CRANIO-ENDPOINTS are spec-only or scaffold. The weakest honest metric is program completeness itself: roughly a third of the spec'd modules are shipped; the rest are planned. Every shipped module enforces the same 10 invariants and a 1.00 unsafe-claim-suppression gate."
      },
      "subsystems": [
        {
          "id": "01",
          "code": "CRANIO-ORIGIN",
          "name": "§1 CRANIO-ORIGIN",
          "desc": "Suture identity, fusion proof, etiology, genetics, developmental biology. Central artifact: the Craniosynostosis Identity & Origin Object with 9 suture states and a proof ledger — no suture label without proof. Primary-vs-secondary router + etiology posterior (FGFR / TWIST1 / TCF12 / ERF / EFNB1 / RAB23 / MSX2 pathways). Spec-only.",
          "status": "beta"
        },
        {
          "id": "02",
          "code": "CRANIO-PHYSICS",
          "name": "§2 CRANIO-PHYSICS",
          "desc": "Skull-growth mechanics, ICP reserve, brain constraint, venous/airway coupling, neurodevelopmental risk. Shipped: §2.2 Intracranial Volume Reserve + ICP-Risk Twin (prod-grade), §2.3 Venous/Posterior-Fossa Coupling Mapper, §2.5 Head-Shape→Neurodevelopment Causal Adjudicator (trained), §2.7 Family Observation Translator (trained).",
          "status": "live"
        },
        {
          "id": "03",
          "code": "CRANIO-BIOMARKERS",
          "name": "§3 CRANIO-BIOMARKERS",
          "desc": "Validation-tier biomarker atlas across 12 domains (suture-fusion, skull-shape, intracranial-volume, ICP-risk, ophthalmic, airway/sleep, venous, brain-development, molecular, tissue/fluid, surgical-response, outcome). 10-tier validation ladder; tier-bleed impossible. Genotype-morphotype-surgery response engine. Mostly planned; embedded in §5.5 clinical-real engines.",
          "status": "beta"
        },
        {
          "id": "04",
          "code": "CRANIO-DIAGNOSTICS",
          "name": "§4 CRANIO-DIAGNOSTICS",
          "desc": "Diagnosis, differential, radiation-minimizing imaging-pathway router, workup orchestration. §4.2 craniosynostosis-vs-deformational-plagiocephaly adjudicator + §4.3 syndromic red-flag router are scaffolds. Routes by question; does not order tests — surfaces evidence gaps for the multidisciplinary discussion.",
          "status": "beta"
        },
        {
          "id": "05",
          "code": "CRANIO-FORGE",
          "name": "§5 CRANIO-FORGE",
          "desc": "The most-developed section. Surgery counterfactuals, operative-truth capture, postoperative skull-graph tracking, refusion/relapse/revision learning. 4 shipped surgical twins: §5.2 ECSC, §5.3 OCVR, §5.4 FOA, §5.5 PVD (v5.5.5 reference implementation — 21 engines, 5 core outputs, 12 hard-stops, CranioPVD-FM checkpoint, Dice 0.864).",
          "status": "live"
        },
        {
          "id": "06",
          "code": "CRANIO-NEURODEV",
          "name": "§6 CRANIO-NEURODEVELOPMENT",
          "desc": "Brain, vision, hearing, sleep, school, behavior, and family outcomes as first-class endpoints. Neurodevelopmental baseline + longitudinal endpoint factory, optic-neuropathy sentinel, hearing/speech/airway router, school-function + caregiver-burden factory. Partial overlap with §2.5 / §3.5 / §3.6; otherwise planned.",
          "status": "beta"
        },
        {
          "id": "07",
          "code": "CRANIO-BENCHMARK",
          "name": "§7 CRANIO-BENCHMARK",
          "desc": "Open benchmark, rare-case stress tests, biomarker validation. Shipped: §7.1 Segmentation + Suture + Skull-Shape Benchmark (144 tests, 35 routes), §7.3 Rare Craniosynostosis Stress Suite (12 archetypes, 14 stress classes), §7.4 Biomarker Validation Bench. §7.2 Mimic + Hard-Negative is scaffold. A model that cannot safely say 'not craniosynostosis' gets no diagnostic-support claim.",
          "status": "live"
        },
        {
          "id": "08",
          "code": "CRANIO-ENDPOINTS",
          "name": "§8 CRANIO-ENDPOINTS",
          "desc": "DICOM-SR + FHIR R4 + GA4GH Phenopackets v2 + XNAT + MONAI Label + OMOP CDM + CDISC trial-endpoint factory. Endpoint Dictionary partially shipped via the AURORA Atlas 8.1 pack (11 cranio CSVs + dictionary.json); exporters distributed across shipped §5.x modules. Trial Comparability Engine (§8.3) scaffold. Umbrella module awaits build-out.",
          "status": "beta"
        },
        {
          "id": "09",
          "code": "CRANIO-GOVERNANCE",
          "name": "§9 CRANIO-GOVERNANCE",
          "desc": "Claim-scope gate, unsupported-case router, safety-case + lifecycle monitor, market-beating release package. The SafetyGate pattern (regex + structural hard-stops + hash-chained audit) is universal in every shipped module; the 10 core invariants and 1.00 unsafe-claim-suppression gate are enforced on every release. Cross-module governance registry pending.",
          "status": "live"
        },
        {
          "id": "10",
          "code": "SAFETY-CONTRACT",
          "name": "10 Core Invariants — the safety contract",
          "desc": "Cross-cutting non-prescriptive safety contract every module obeys: no synostosis label without suture proof; no timing claim without age-window + pathway context; no ICP claim without optic+volume+venous+airway evidence; no genotype claim without validation state; no biomarker without an evidence tier; no postop-success claim without skull-topology + endpoint change; no neurodev claim without age-normalized measurement; no release without subgroup+calibration+uncertainty+external-site+rare-case testing; no prescriptive language anywhere; specialist-review handoff always present.",
          "status": "live"
        },
        {
          "id": "11",
          "code": "ENGINEERING-SUBSTRATE",
          "name": "Engineering substrate + program console",
          "desc": "The shared 12-layer substrate every module clones: numbered spec → TS core + deterministic SafetyGate → 30+ cmd CLI → production API (OIDC/JWT 2-key, RBAC+ABAC, hash-chained audit, OTel/Prometheus) → Next.js dashboard → Python/FastAPI sidecar with PyTorch checkpoints → clinical-real engines (HPO/ClinVar/PubMed) → EHR + HIPAA de-id pipeline → validation tooling (ConcordanceEngine) → IaC (Docker/K8s/Helm/Terraform/CI) → 16-17 doc regulatory packet → partnership pack. This admin console governs that family.",
          "status": "live"
        }
      ]
    }
  ],
  "pilotSites": [
    "AURORA-NEURO Research Network (program-internal, research preview)",
    "CHOP — Philadelphia (target; published PVD program, multidisciplinary craniofacial team)",
    "Boston Children's Hospital (target; joint plastic surgery + neurosurgery craniofacial program)",
    "Seattle Children's (target; long-running distraction-osteogenesis program)",
    "Stanford / Lucile Packard Children's (target; active surgical-innovation program)",
    "GOSH London (target; largest European PVD volume; GDPR/IDTA cross-border workflow)",
    "Texas Children's / Baylor (target; distraction-osteogenesis research)"
  ],
  "evidence": {
    "aurora-cranio": [
      {
        "authors": "Mathijssen IMJ (on behalf of the Working Group).",
        "title": "Updated Guideline on Treatment and Management of Craniosynostosis",
        "venue": "Journal of Craniofacial Surgery",
        "year": 2021,
        "vol": "32(1):371-450",
        "doi": "10.1097/SCS.0000000000007035",
        "tag": "clinical-guideline"
      },
      {
        "authors": "Twigg SRF, Wilkie AOM.",
        "title": "A Genetic-Pathophysiological Framework for Craniosynostosis",
        "venue": "The American Journal of Human Genetics",
        "year": 2015,
        "vol": "97(3):359-377",
        "doi": "10.1016/j.ajhg.2015.07.006",
        "tag": "genetics-framework"
      },
      {
        "authors": "Sharma VP, Fenwick AL, Brockop MS, et al.",
        "title": "Mutations in TCF12, encoding a basic helix-loop-helix partner of TWIST1, are a frequent cause of coronal craniosynostosis",
        "venue": "Nature Genetics",
        "year": 2013,
        "vol": "45(3):304-307",
        "doi": "10.1038/ng.2531",
        "tag": "TCF12-coronal"
      },
      {
        "authors": "Driessen C, Eveleens J, Bleyen I, van Veelen ML, Joosten K, Mathijssen I.",
        "title": "Optical coherence tomography: a quantitative tool to screen for papilledema in craniosynostosis",
        "venue": "Child's Nervous System",
        "year": 2014,
        "vol": "30(6):1067-1073",
        "doi": "10.1007/s00381-014-2376-9",
        "tag": "ICP-OCT-surveillance"
      },
      {
        "authors": "Wolfswinkel EM, Howell LK, Fahradyan A, et al. (spring-force biomechanics).",
        "title": "Spring forces and calvarial thickness predict cephalic index changes following spring-mediated cranioplasty for sagittal craniosynostosis",
        "venue": "Child's Nervous System",
        "year": 2023,
        "vol": "39(3):663-671",
        "doi": "10.1007/s00381-022-05752-9",
        "tag": "surgical-response-biomechanics"
      }
    ]
  }
};
