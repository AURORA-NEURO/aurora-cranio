
(function () {
  const DATA = window.AURORA_DATA;

  const seeded = (seed) => {
    let a = seed >>> 0;
    return () => {
      a |= 0; a = (a + 0x6d2b79f5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  };
  const hashStr = (s) => {
    let h = 2166136261;
    for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
    return h >>> 0;
  };
  const pick = (rng, arr) => arr[Math.floor(rng() * arr.length)];
  const rint = (rng, lo, hi) => Math.floor(lo + rng() * (hi - lo + 1));

  const FIRST = ["A.", "M.", "J.", "L.", "S.", "R.", "K.", "N.", "T.", "E.", "C.", "P.", "D.", "H.", "O.", "F."];
  const LAST = ["Okafor", "Lindqvist", "Moreau", "Tanaka", "Rossi", "Patel", "Nguyen", "García", "Müller", "Haddad",
    "Andersson", "Kowalski", "Silva", "Ferrari", "Schmidt", "Rahman", "Costa", "Novak", "Ibrahim", "Larsen"];
  const SITES_SHORT = ["KAR", "UCSF", "NECK", "GOSH", "BCH", "BGPH", "SK", "CHAR", "AIIMS", "NUHS", "KYU", "HIBA"];

  const initials = (rng) => `${pick(rng, FIRST)} ${pick(rng, LAST)}`;

  const STAGES = ["Intake", "Imaging review", "Molecular pending", "MDT scheduled", "MDT review",
    "Plan drafting", "Awaiting sign-off", "Signed · monitoring", "Closed"];
  const PRIORITIES = ["routine", "expedited", "urgent"];
  const CONSENT = ["cohort-2026", "cohort-2026", "cohort-2026", "research-opt-in", "pending"];

  const buildForModule = (m) => {
    const rng = seeded(hashStr(m.seedKey || m.slug));
    const subs = m.subsystems;
    const accent = m.accent;

    const activeCases = rint(rng, 18, 64);
    const cohortSize = rint(rng, 280, 1900);
    const pilotCount = parseInt((m.stats.pilots.match(/\d+/) || [rint(rng, 1, 4)])[0], 10);
    const uptime = (99 + rng()).toFixed(2);
    const latencyMs = parseInt((m.stats.latency.match(/\d+/) || [120])[0], 10);

    const dxPool = m.dxPool || (() => {
      switch (m.slug) {
        case "glio": return ["GBM IDH-WT", "Astro IDH-mut G3", "Oligo 1p19q-codel", "GBM IDH-WT · MGMT+", "Diffuse midline H3K27M"];
        case "spina-bifida": return ["Myelomeningocele L3", "Myelomeningocele S1", "Lipomyelomeningocele", "Closed NTD", "Open NTD · prenatal"];
        case "tc": return ["Occult TCS", "Classical TCS", "Adult-onset TCS", "Tight filum", "Re-tether watch"];
        case "hydrocephalus": return ["Congenital HCP", "Post-haemorrhagic HCP", "iNPH", "Obstructive HCP", "Shunt malfunction"];
        case "dwm": return ["DWM classic", "DW variant", "Mega cisterna magna", "Vermian hypoplasia"];
        case "enceph": return ["Frontoethmoidal", "Occipital", "Parietal", "Nasal meningoencephalocele"];
        case "arach": return ["Sylvian AC Galassi II", "Posterior fossa AC", "Suprasellar AC", "Incidental AC"];
        case "cranio": return ["Sagittal synostosis", "Metopic synostosis", "Unicoronal", "Bicoronal · Apert", "Multisuture"];
        case "chiari": return ["Chiari I", "Chiari I · syrinx", "Chiari II", "Borderline · 4mm", "Post-decompression"];
        default: return ["Primary dx", "Variant A", "Variant B"];
      }
    })();

    const N = 40;
    const cases = Array.from({ length: N }, (_, i) => {
      const stageIdx = rint(rng, 0, STAGES.length - 1);
      const conf = +(0.62 + rng() * 0.37).toFixed(2);
      return {
        id: `${m.code.replace("AURORA-", "")}-${String(4800 + rint(rng, 1, 5200)).slice(0, 4)}${String(i).padStart(2, "0")}`,
        mrn: `MRN-${rint(rng, 100000, 999999)}`,
        dx: pick(rng, dxPool),
        age: m.slug === "spina-bifida" || m.slug === "dwm" ? `${rint(rng, 0, 11)}m` : `${rint(rng, 1, 78)}y`,
        site: pick(rng, SITES_SHORT),
        stage: STAGES[stageIdx],
        stageIdx,
        priority: rng() > 0.78 ? pick(rng, PRIORITIES) : "routine",
        clinician: initials(rng),
        updated: `${rint(rng, 1, 59)}m ago`,
        overrides: rng() > 0.7 ? rint(rng, 1, 3) : 0,
        consent: pick(rng, CONSENT),
        conf,
        flagged: rng() > 0.86,
      };
    }).sort((a, b) => a.stageIdx - b.stageIdx);

    const aiSub = subs.find((s) => /AI|FOUNDATION/.test(s.code)) || subs[0];
    const models = subs.map((s, i) => {
      const isFoundation = s === aiSub;
      const params = isFoundation ? pick(rng, ["7B", "9B", "13B"]) : pick(rng, ["340M", "780M", "1.2B", "2.1B", "PDE-core", "graph-net"]);
      return {
        code: s.code,
        name: s.name,
        kind: isFoundation ? "Foundation · VLO transformer"
          : /PDE|INFIL|PHYSIC|FLOW|CSF/.test(s.code) ? "Mechanistic · PDE solver"
          : /CAUS/.test(s.code) ? "Causal · counterfactual graph"
          : /ETHIC/.test(s.code) ? "Audit · equity-as-loss"
          : "Task head · supervised",
        params,
        quant: isFoundation ? "int4 · two-pass" : pick(rng, ["fp16", "int8", "fp32", "—"]),
        version: `2026.${pick(rng, ["Q1", "Q1", "Q2"])}.${rint(rng, 0, 9)}`,
        auc: +(0.78 + rng() * 0.19).toFixed(3),
        eval: +(0.80 + rng() * 0.17).toFixed(3),
        ece: +(0.01 + rng() * 0.06).toFixed(3),
        status: s.status,
        signed: rng() > 0.12,
        whash: Array.from({ length: 7 }, () => "0123456789abcdef"[rint(rng, 0, 15)]).join(""),
        trainN: `${rint(rng, 4, 38)}.${rint(rng, 0, 9)}k`,
        sites: rint(rng, 3, 12),
        drift: +(rng() * 2 - 0.6).toFixed(2),
      };
    });

    let foundation = models.find((x) => /AI|FOUND/.test(x.code)) || models[0];
    if (m.fm) {
      const tgt = models.find((x) => x.code === m.fm.code);
      if (tgt) { Object.assign(tgt, m.fm); foundation = tgt; }
      else { foundation = { ...foundation, ...m.fm }; models.unshift(foundation); }
    }

    const strata = [
      { k: "Ancestry · African", v: +(0.79 + rng() * 0.15).toFixed(2) },
      { k: "Ancestry · European", v: +(0.86 + rng() * 0.11).toFixed(2) },
      { k: "Ancestry · East Asian", v: +(0.82 + rng() * 0.13).toFixed(2) },
      { k: "Ancestry · South Asian", v: +(0.78 + rng() * 0.14).toFixed(2) },
      { k: "Sex · female", v: +(0.84 + rng() * 0.12).toFixed(2) },
      { k: "Sex · male", v: +(0.85 + rng() * 0.11).toFixed(2) },
      { k: "Age band · paediatric", v: +(0.80 + rng() * 0.15).toFixed(2) },
      { k: "Access proxy · low", v: +(0.74 + rng() * 0.16).toFixed(2) },
    ].map((s) => ({ ...s, pass: s.v >= 0.78 }));

    const SITE_NAMES = DATA.pilotSites;
    const deployments = SITE_NAMES.slice(0, Math.max(2, pilotCount + rint(rng, 1, 4))).map((name, i) => ({
      site: name,
      tag: SITES_SHORT[i % SITES_SHORT.length],
      mode: pick(rng, ["on-prem", "federated", "air-gapped", "hosted"]),
      node: `aurora-${m.slug}.${SITES_SHORT[i % SITES_SHORT.length].toLowerCase()}:8443`,
      version: `pilot.${rint(rng, 8, 24)}`,
      status: rng() > 0.16 ? "synced" : (rng() > 0.5 ? "syncing" : "degraded"),
      lastSync: `${rint(rng, 1, 48)}m`,
      cases: rint(rng, 40, 9300),
      gpu: pick(rng, ["1× A100", "2× A100", "1× RTX 4090", "CPU-only", "4× H100"]),
    }));

    const ROLES = ["Neurosurgeon", "Radiologist", "Researcher", "Module maintainer", "Site admin", "Trial coordinator"];
    const users = Array.from({ length: 12 }, (_, i) => ({
      name: initials(rng),
      role: ROLES[i % ROLES.length],
      site: pick(rng, SITES_SHORT),
      lastActive: rng() > 0.3 ? `${rint(rng, 1, 59)}m ago` : `${rint(rng, 1, 6)}d ago`,
      overrides: rint(rng, 0, 24),
      mfa: rng() > 0.1,
    }));

    const ACT_VERBS = [
      (rng) => ({ icon: "sign", t: `signed integrated report on ${pick(rng, cases).id}` }),
      (rng) => ({ icon: "override", t: `logged override on ${pick(rng, subs).code}` }),
      (rng) => ({ icon: "model", t: `promoted ${pick(rng, models).code} to ${pick(rng, ["pilot", "staging"])}` }),
      (rng) => ({ icon: "sync", t: `federation sync from ${pick(rng, SITE_NAMES)}` }),
      (rng) => ({ icon: "equity", t: `equity gate re-run passed for ${pick(rng, models).code}` }),
      (rng) => ({ icon: "case", t: `new case bound · ${pick(rng, dxPool)}` }),
    ];
    const activity = Array.from({ length: 9 }, () => {
      const ev = pick(rng, ACT_VERBS)(rng);
      return { ...ev, who: initials(rng), when: `${rint(rng, 1, 240)}m ago` };
    });

    const series = (base, jit) => Array.from({ length: 30 }, (_, i) =>
      Math.max(0, Math.round(base + Math.sin(i / 3) * jit + (rng() - 0.5) * jit)));

    return {
      kpis: { activeCases, cohortSize, pilotCount, uptime, latencyMs },
      cases, models, foundation, strata, deployments, users, activity,
      throughput: series(activeCases / 2, 10),
      latencyTrend: series(latencyMs, latencyMs * 0.12),
      overrideRate: series(8, 4),
      equityPass: strata.filter((s) => s.pass).length,
      equityTotal: strata.length,
    };
  };

  window.CASE_DETAIL = (m, c) => {
    const rng = seeded(hashStr(c.id));
    const subs = m.subsystems;

    const SERIES_BY_MOD = {
      glio: ["T1", "T1c", "T2", "FLAIR", "DWI/ADC", "DSC-perf"],
      hydrocephalus: ["T1", "T2", "FLAIR", "cine-PC", "CISS"],
      chiari: ["T1 sag", "T2 sag", "cine-PC", "CISS axial"],
    };
    const series = (SERIES_BY_MOD[m.slug] || ["T1", "T1c", "T2", "FLAIR", "DWI"]).map((s, i) => ({
      name: s, slices: rint(rng, 24, 192), thick: pick(rng, ["1.0", "1.5", "3.0"]), done: true, active: i === 1,
    }));

    const measures = [
      ["Primary ROI volume", `${(8 + rng() * 40).toFixed(1)} cm³`],
      ["Max diameter", `${(18 + rng() * 50).toFixed(0)} mm`],
      ["Midline shift", `${(rng() * 9).toFixed(1)} mm`],
      ["Field σ (uncertainty)", `${(0.8 + rng() * 1.4).toFixed(1)} mm`],
      ["Enhancing fraction", `${(20 + rng() * 60).toFixed(0)} %`],
      ["Necrotic fraction", `${(rng() * 30).toFixed(0)} %`],
    ];

    const months = ["Jan", "Mar", "May", "Jul", "Sep", "Nov"];
    const longitudinal = months.slice(0, rint(rng, 3, 6)).map((mo, i) => ({
      when: `${mo} 26`, vol: +(10 + i * 4 + rng() * 6).toFixed(1),
      event: i === 0 ? "baseline" : i === 1 ? "post-op" : pick(rng, ["RT", "surveillance", "TMZ cycle", "—"]),
    }));

    const ROLES = ["Attending neurosurgeon", "Neuro-radiologist", "Neuro-oncologist", "Radiation oncologist", "Path / molecular", "Trial coordinator"];
    const team = ROLES.map((r) => ({ role: r, name: initials(rng) }));

    const recs = subs.slice(0, 5).map((s, i) => ({
      code: s.code, name: s.name,
      rec: [
        "Maximal safe resection — eloquence-aware corridor proposed",
        "Methylation classifier concordant; proceed to integrated dx",
        "Margin field exceeds contrast volume by 6 mm — widen CTV",
        "3 active trials match; arm B fit 0.81",
        "Equity strata within threshold — no gate block",
      ][i] || s.desc,
      conf: +(0.7 + rng() * 0.28).toFixed(2),
      level: i < 2 ? "strong" : i < 4 ? "moderate" : "advisory",
    }));

    const trials = Array.from({ length: 4 }, (_, i) => ({
      id: `NCT0${rint(rng, 4000000, 5999999)}`,
      name: pick(rng, ["Adaptive RT dose-escalation", "Anti-PD1 + SOC", "IDH inhibitor maintenance", "Tumour-treating fields", "Neoadjuvant immunotherapy"]),
      phase: pick(rng, ["I", "I/II", "II", "II/III", "III"]),
      arms: rint(rng, 2, 4),
      fit: +(0.55 + rng() * 0.42).toFixed(2),
      status: pick(rng, ["enrolling", "enrolling", "screening", "paused"]),
    })).sort((a, b) => b.fit - a.fit);

    const diff = (m.diff || CLASSIFY_DIFF[m.slug] || [["Primary dx", 0.86], ["Alt A", 0.09], ["Alt B", 0.05]]);

    const alerts = [
      c.consent === "pending" && { sev: "warn", t: "Consent scope pending — predictions gated until cohort policy attached." },
      c.flagged && { sev: "bad", t: "Equity stratum below threshold for this subgroup — flagged before MDT." },
      c.overrides > 0 && { sev: "info", t: `${c.overrides} clinician override(s) logged on this case.` },
      { sev: "info", t: "Foundation model v" + ops0(m).models[0].version + " — last re-run 2 min ago." },
    ].filter(Boolean);

    const encounter = [
      ["Encounter", pick(rng, ["Outpatient MDT", "Inpatient", "Pre-op clinic", "Surveillance"])],
      ["Referred by", initials(rng)],
      ["Attending", c.clinician],
      ["First seen", `${rint(rng, 1, 28)} ${pick(rng, ["Jan", "Feb", "Mar", "Apr"])} 26`],
      ["Performance (KPS)", `${rint(rng, 6, 10) * 10}`],
      ["Comorbidity (CCI)", `${rint(rng, 0, 5)}`],
    ];

    const promMonths = ["Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May"];
    const eqBase = 0.42 + rng() * 0.2;
    const eqTrend = promMonths.map((mo, i) => +(Math.min(0.97, eqBase + i * (0.04 + rng() * 0.03))).toFixed(2));
    const vasTrend = promMonths.map((mo, i) => Math.round(Math.min(95, 45 + i * 6 + rng() * 8)));
    const eqDims = [
      { k: "Mobility", v: rint(rng, 1, 4) },
      { k: "Self-care", v: rint(rng, 1, 3) },
      { k: "Usual activities", v: rint(rng, 1, 4) },
      { k: "Pain / discomfort", v: rint(rng, 2, 5) },
      { k: "Anxiety / depression", v: rint(rng, 1, 4) },
    ];
    const DISEASE_PROM = {
      glio: { name: "FACT-Br", unit: "/200", v: rint(rng, 110, 175), peer: 148, dir: "higher" },
      "spina-bifida": { name: "ASKp mobility", unit: "/100", v: rint(rng, 40, 85), peer: 72, dir: "higher" },
      tc: { name: "Bladder (ICIQ)", unit: "/21", v: rint(rng, 4, 16), peer: 8, dir: "lower" },
      hydrocephalus: { name: "Gait & balance (TUG)", unit: "s", v: rint(rng, 9, 28), peer: 12, dir: "lower" },
      dwm: { name: "Bayley-III motor", unit: "/19", v: rint(rng, 5, 15), peer: 10, dir: "higher" },
      enceph: { name: "Glasgow benefit", unit: "/100", v: rint(rng, 40, 85), peer: 65, dir: "higher" },
      arach: { name: "Headache (HIT-6)", unit: "/78", v: rint(rng, 42, 68), peer: 50, dir: "lower" },
      cranio: { name: "Whitaker class", unit: "I–IV", v: pick(rng, ["I", "I", "II", "III"]), peer: "I–II", dir: "lower" },
      chiari: { name: "Chicago CSS", unit: "/100", v: rint(rng, 45, 90), peer: 78, dir: "higher" },
    };
    const dPROM = m.prom || DISEASE_PROM[m.slug] || { name: "Disease PROM", unit: "/100", v: rint(rng, 40, 90), peer: 70, dir: "higher" };

    const goals = [
      { g: "Return to independent ambulation", target: "EQ mobility ≤2", prog: rint(rng, 30, 95), due: "Aug 26" },
      { g: "Pain controlled without opioids", target: "Pain ≤2 / VAS ≥70", prog: rint(rng, 20, 90), due: "Jul 26" },
      { g: dPROM.dir === "higher" ? `${dPROM.name} ≥ peer (${dPROM.peer})` : `${dPROM.name} ≤ peer (${dPROM.peer})`, target: `${dPROM.peer}${dPROM.unit}`, prog: rint(rng, 25, 88), due: "Sep 26" },
    ];

    const events = [
      { d: "08 Jan 26", t: "Diagnosis confirmed", k: "dx" },
      { d: "21 Jan 26", t: m.slug === "glio" ? "Maximal safe resection" : "Index surgery", k: "surgery" },
      { d: "02 Feb 26", t: "Integrated diagnosis signed", k: "report" },
      m.slug === "glio" && { d: "15 Feb 26", t: "Chemoradiation started (Stupp)", k: "tx" },
      m.slug === "glio" && { d: "28 Mar 26", t: "Adjuvant TMZ cycle 1", k: "tx" },
      { d: "10 May 26", t: "Surveillance scan — stable", k: "scan" },
    ].filter(Boolean);

    const doneTo = Math.min(c.stageIdx + rint(rng, 0, 1), 99);
    const ROUTINE = [
      { group: "Intake", items: [
        ["Verify identity & MRN", "system"], ["Bind imaging study by SOP UID", "system"],
        ["Confirm consent cohort policy", "system"], ["Assign care team", c.clinician],
      ] },
      { group: "Imaging & data", items: [
        ["Ingest required sequences", "system"], ["QC image series", "Radiology"],
        ["Pull molecular / lab feed", "system"], ["Extract radiomic measures", "system"],
      ] },
      { group: "AI synthesis", items: [
        ["Run foundation pass", "system"], ["Macro–micro grounding", "system"],
        ["Generate integrated diagnosis", "system"], ["Equity gate check", "system"],
      ] },
      { group: "MDT & plan", items: [
        ["Schedule MDT review", c.clinician], ["Review AI recommendations", "MDT"],
        ["Resolve discrepancies / overrides", c.clinician], ["Draft treatment plan", c.clinician],
        ["Match active trials", "system"],
      ] },
      { group: "Sign-off", items: [
        ["Patient counselled (shared decision)", c.clinician], ["PROM baseline captured", "Patient"],
        ["Sign integrated report", c.clinician], ["Emit to PACS / EHR / RT", "system"],
        ["Schedule surveillance", c.clinician],
      ] },
    ];
    let idx = 0;
    const routine = ROUTINE.map((grp) => ({
      group: grp.group,
      items: grp.items.map(([t, owner]) => {
        const gi = idx++;
        const pctThru = (c.stageIdx / 9) * 21;
        const done = gi < pctThru;
        const active = gi === Math.floor(pctThru);
        return { t, owner, done, active };
      }),
    }));
    const routineDone = routine.flatMap((g) => g.items).filter((i) => i.done).length;
    const routineTotal = routine.flatMap((g) => g.items).length;

    const report = {
      generated: "30 May 2026 · 14:22",
      reportId: `RPT-${c.id}`,
      summary: `${c.dx}. Integrated ${m.code}-DIAG synthesis with calibrated confidence ${c.conf.toFixed(2)}. ${recs[0] ? recs[0].rec + "." : ""} Plan reviewed at multidisciplinary team; ${c.overrides} clinician override(s) logged. Audit chain signed by the site federation key.`,
      impression: recs.slice(0, 3).map((r) => r.rec),
      authoredBy: c.clinician,
    };

    return { series, measures, longitudinal, team, recs, trials, diff, alerts, encounter,
      routine, routineDone, routineTotal, report,
      proms: { promMonths, eqTrend, vasTrend, eqDims, dPROM, goals, events } };
  };
  const CLASSIFY_DIFF = {
    glio: [["GBM, IDH-WT", 0.91], ["Astro IDH-mut G4", 0.06], ["Metastasis", 0.03]],
    chiari: [["Chiari I + syrinx", 0.84], ["Low-lying tonsils (norm)", 0.11], ["Acquired Chiari", 0.05]],
    hydrocephalus: [["Obstructive HCP", 0.79], ["Communicating HCP", 0.15], ["iNPH", 0.06]],
    cranio: [["Sagittal synostosis", 0.88], ["Positional plagiocephaly", 0.08], ["Multisuture", 0.04]],
  };
  const ops0 = (m) => window.OPS(m.slug);

  //  FLEET-WIDE ADMIN DATA (deep ops — releases, security, data,
  window.OPS_ADMIN = () => {
    const rng = seeded(99173);
    const DATA2 = window.AURORA_DATA;
    const SITE_NAMES = DATA2.pilotSites;

    const channels = ["dev", "staging", "pilot", "public-alpha"];
    const releases = [];
    DATA2.modules.forEach((m) => {
      const o = window.OPS(m.slug);
      o.models.slice(0, 3).forEach((mdl) => {
        releases.push({
          module: m.code.replace("AURORA-", ""), accent: m.accent,
          code: mdl.code, version: mdl.version, params: mdl.params,
          channel: pick(rng, channels), signed: mdl.signed, whash: mdl.whash,
          promotedBy: initials(rng), when: `${rint(rng, 1, 27)}d ago`,
          eval: mdl.eval, gate: mdl.eval > 0.8 ? "pass" : "review",
        });
      });
    });

    const datasets = SITE_NAMES.slice(0, 9).map((s, i) => ({
      name: `${s.split(" ")[0]} neuro registry`, site: s,
      modality: pick(rng, ["MRI + molecular", "MRI + WSI", "CT + MRI", "Imaging only", "Multi-omic"]),
      records: rint(rng, 800, 24000), consented: +(0.7 + rng() * 0.29).toFixed(2),
      dp: pick(rng, ["ε=1.0", "ε=2.0", "ε=4.0", "off"]), signed: rng() > 0.1,
      license: pick(rng, ["MIT", "DUA", "research-only"]), updated: `${rint(rng, 1, 20)}d ago`,
    }));

    // auth providers / keys / certs (security)
    const authProviders = [
      { name: "Microsoft AD FS", type: "OIDC", sites: 5, status: "active" },
      { name: "Okta", type: "OIDC", sites: 3, status: "active" },
      { name: "Keycloak (self-host)", type: "OIDC", sites: 4, status: "active" },
      { name: "Legacy LDAP", type: "LDAP", sites: 1, status: "deprecated" },
    ];
    const keys = SITE_NAMES.slice(0, 6).map((s, i) => ({
      site: s, kind: pick(rng, ["HSM", "Vault", "KMS"]),
      algo: "ECDSA P-256", rotated: `${rint(rng, 1, 90)}d ago`,
      expires: `${rint(rng, 30, 320)}d`, status: rng() > 0.12 ? "valid" : "rotate-soon",
    }));

    const incidents = [
      { id: "INC-2041", sev: "minor", t: "Federation sync lag at Charité", status: "resolved", when: "2d ago", mttr: "38m" },
      { id: "INC-2044", sev: "major", t: "Equity gate block on GLIO-RAD release", status: "resolved", when: "5d ago", mttr: "3h 10m" },
      { id: "INC-2049", sev: "minor", t: "DICOM C-STORE timeout at AIIMS", status: "monitoring", when: "9h ago", mttr: "—" },
      { id: "INC-2050", sev: "info", t: "Scheduled weight rotation — CRANIO foundation", status: "planned", when: "in 2d", mttr: "—" },
    ];

    const services = [
      ["federation-control-plane", "healthy", 99.99, "12ms"],
      ["inference-gateway", "healthy", 99.96, "44ms"],
      ["audit-ledger", "healthy", 100.0, "8ms"],
      ["model-registry", "healthy", 99.98, "21ms"],
      ["equity-evaluator", "degraded", 99.4, "180ms"],
      ["fhir-connector", "healthy", 99.9, "33ms"],
      ["dicom-router", "healthy", 99.95, "27ms"],
      ["object-store", "healthy", 99.99, "15ms"],
    ].map(([name, status, up, lat]) => ({ name, status, up, lat }));

    const usage = DATA2.modules.map((m) => {
      const o = window.OPS(m.slug);
      return { module: m.code.replace("AURORA-", ""), accent: m.accent,
        cases: o.kpis.activeCases * rint(rng, 8, 30), gpuHrs: rint(rng, 200, 4200),
        storage: +(rng() * 40 + 4).toFixed(1), seats: rint(rng, 4, 60) };
    });

    const flags = [
      { k: "ethics.equityGate", v: "on", scope: "all modules", locked: true },
      { k: "telemetry.enabled", v: "off", scope: "all sites", locked: false },
      { k: "federation.mode", v: "on-prem", scope: "per-site", locked: false },
      { k: "audit.signBeforeRender", v: "on", scope: "global", locked: true },
      { k: "models.autopromote", v: "off", scope: "global", locked: false },
      { k: "consent.refuseWithoutPolicy", v: "on", scope: "global", locked: true },
      { k: "rollout.canaryPercent", v: "5%", scope: "pilot", locked: false },
    ];

    const rfcs = [
      { id: "RFC-018", t: "Equity threshold revision for paediatric strata", status: "in review", owner: initials(rng) },
      { id: "RFC-021", t: "Federated trial-routing data contract", status: "ratified", owner: initials(rng) },
      { id: "RFC-024", t: "Organoid-twin consent schema", status: "draft", owner: initials(rng) },
      { id: "RFC-026", t: "Public-alpha registry signing policy", status: "in review", owner: initials(rng) },
    ];

    const slos = [
      { name: "Inference availability", target: 99.9, actual: 99.96, window: "30d" },
      { name: "Report sign latency (p95)", target: 95, actual: 92, window: "30d", unit: "% < 5s" },
      { name: "Federation sync success", target: 99.5, actual: 99.7, window: "30d" },
      { name: "Equity gate coverage", target: 100, actual: 96, window: "30d" },
      { name: "Audit write durability", target: 100, actual: 100, window: "30d" },
    ].map((s) => ({ ...s, budget: +(((s.actual - s.target) / (100 - s.target || 1)) * 100).toFixed(0), burn: rng() })); 

    const costPlan = {
      gpuHrs: rint(rng, 9000, 24000), gpuTrend: Array.from({ length: 12 }, (_, i) => rint(rng, 600, 2200)),
      perModule: DATA2.modules.map((m) => ({ module: m.code.replace("AURORA-", ""), accent: m.accent, gpuHrs: rint(rng, 200, 4200), proj: rint(rng, 240, 4800) })),
      headroom: rint(rng, 18, 52),
    };

    const notifRules = [
      { event: "equity.gate.block", channel: "PagerDuty · governance", sev: "critical", on: true },
      { event: "incident.major", channel: "Slack #aurora-sre + email", sev: "critical", on: true },
      { event: "release.promote", channel: "Slack #releases", sev: "info", on: true },
      { event: "federation.degraded", channel: "Email · site admin", sev: "warning", on: true },
      { event: "consent.refused", channel: "Audit only", sev: "info", on: false },
      { event: "key.expiry < 30d", channel: "Email · security officer", sev: "warning", on: true },
    ];

    const approvals = [
      { kind: "Model promotion", item: "GLIO-RAD → public-alpha", requester: initials(rng), votes: "2/3", status: "awaiting", gate: "equity + eval" },
      { kind: "Access request", item: "Site admin · AIIMS", requester: initials(rng), votes: "—", status: "awaiting", gate: "identity" },
      { kind: "RFC vote", item: "RFC-018 equity threshold", requester: initials(rng), votes: "5/7", status: "awaiting", gate: "council" },
      { kind: "Config change", item: "rollout.canaryPercent → 10%", requester: initials(rng), votes: "1/2", status: "awaiting", gate: "SRE" },
      { kind: "Model promotion", item: "CRANIO-AI → pilot", requester: initials(rng), votes: "3/3", status: "approved", gate: "equity + eval" },
    ];

    const AUDIT_KINDS = [
      ["model.promote", "Promoted model to channel"], ["override.log", "Clinician override recorded"],
      ["consent.verify", "Consent policy verified"], ["federation.sync", "Federation update pulled"],
      ["equity.gate", "Equity gate evaluated"], ["key.rotate", "Signing key rotated"],
      ["user.login", "User authenticated"], ["release.sign", "Release signed (sigstore)"],
      ["data.export", "Audit envelope exported"], ["config.change", "Configuration changed"],
      ["admin.grant", "Permission granted"], ["report.sign", "Integrated report signed"],
    ];
    const ROLES_A = ["Neurosurgeon", "Radiologist", "Site admin", "Module maintainer", "Security officer", "Data steward"];
    const sysAudit = Array.from({ length: 40 }, (_, i) => {
      const [kind, desc] = pick(rng, AUDIT_KINDS);
      const actor = rng() > 0.35 ? initials(rng) : "system";
      return {
        ts: `2026-05-${String(29 - (i % 28)).padStart(2, "0")} ${String((8 + i) % 24).toString().padStart(2, "0")}:${String((i * 11) % 60).padStart(2, "0")}:${String((i * 7) % 60).padStart(2, "0")}`,
        kind, desc, actor, role: actor === "system" ? "service" : pick(rng, ROLES_A),
        module: pick(rng, DATA2.modules).code.replace("AURORA-", ""),
        site: pick(rng, SITES_SHORT), ip: `10.${rint(rng, 0, 40)}.${rint(rng, 0, 255)}.${rint(rng, 2, 254)}`,
        resource: kind.includes("model") || kind.includes("release") ? pick(rng, DATA2.modules).code.replace("AURORA-", "") + "-AI" : kind.includes("override") || kind.includes("report") ? `case ${rint(rng, 480000, 489999)}` : kind.includes("key") ? "fed-key/HSM" : "—",
        sig: Array.from({ length: 8 }, () => "0123456789abcdef"[rint(rng, 0, 15)]).join(""),
        result: rng() > 0.08 ? "ok" : "blocked",
      };
    });

    return { releases, datasets, authProviders, keys, incidents, services, usage, flags, rfcs, sysAudit,
      slos, costPlan, notifRules, approvals, SITE_NAMES };
  };

  window.AURORA_CAPS = [
    { k: "cases.view", g: "Clinical" }, { k: "cases.bind", g: "Clinical" },
    { k: "reports.sign", g: "Clinical" }, { k: "overrides.log", g: "Clinical" },
    { k: "models.view", g: "Models" }, { k: "models.promote", g: "Models" }, { k: "models.deploy", g: "Models" },
    { k: "users.manage", g: "Admin" }, { k: "admins.delegate", g: "Admin" }, { k: "site.configure", g: "Admin" },
    { k: "data.manage", g: "Governance" }, { k: "consent.manage", g: "Governance" },
    { k: "audit.view", g: "Governance" }, { k: "audit.export", g: "Governance" },
    { k: "keys.rotate", g: "Security" }, { k: "billing.view", g: "Security" },
  ];
  const CAP_KEYS = window.AURORA_CAPS.map((c) => c.k);
  const ADMIN_ROLE_CAPS = {
    "Site administrator": CAP_KEYS,
    "Delegated admin": ["cases.view", "cases.bind", "reports.sign", "overrides.log", "models.view", "users.manage", "site.configure", "audit.view"],
    "Security officer": ["audit.view", "audit.export", "keys.rotate", "users.manage", "site.configure", "admins.delegate"],
    "Data steward": ["data.manage", "consent.manage", "audit.view", "audit.export", "cases.view"],
    "Clinical lead": ["cases.view", "cases.bind", "reports.sign", "overrides.log", "models.view"],
  };

  const BRANDS = [
    { primary: "#0a4f8c", accent: "#3ad6ff" }, { primary: "#0b6e4f", accent: "#5cf0c2" },
    { primary: "#7a1f5c", accent: "#e8489f" }, { primary: "#143b8c", accent: "#6755e8" },
    { primary: "#8c3a0b", accent: "#e87b1f" }, { primary: "#0d5c63", accent: "#14b88a" },
    { primary: "#5b1d8c", accent: "#8a7bff" }, { primary: "#8c1f2f", accent: "#ff7a8a" },
    { primary: "#1f5c2e", accent: "#5cf0c2" }, { primary: "#0a3a8c", accent: "#0099e0" },
    { primary: "#6b4f0b", accent: "#e8b84b" }, { primary: "#2a2f8c", accent: "#6755e8" },
  ];
  const ONBOARD_STEPS = ["MoU & legal", "Identity (OIDC)", "Federation node", "Data & consent", "Modules", "Brand & users", "Go-live review"];

  window.OPS_HOSPITALS = () => {
    const DATA2 = window.AURORA_DATA;
    return DATA2.pilotSites.map((name, hi) => {
      const rng = seeded(hashStr("hosp-" + name));
      const tag = SITES_SHORT[hi % SITES_SHORT.length];
      const country = pick(rng, ["Sweden", "USA", "France", "UK", "Italy", "Canada", "Germany", "India", "Singapore", "Japan", "Argentina"]);
      const statusPool = ["live", "live", "live", "onboarding", "scoping", "suspended"];
      const status = hi < 4 ? "live" : pick(rng, statusPool);
      const onbDone = status === "live" ? 7 : status === "onboarding" ? rint(rng, 3, 6) : status === "scoping" ? rint(rng, 0, 2) : 7;

      const roles = ["Site administrator", "Delegated admin", "Security officer", "Data steward", "Clinical lead"];
      const admins = roles.slice(0, rint(rng, 3, 5)).map((role) => ({
        name: initials(rng), role, caps: ADMIN_ROLE_CAPS[role],
        scope: role === "Clinical lead" ? pick(rng, DATA2.modules).code.replace("AURORA-", "") : "all modules",
        mfa: rng() > 0.08, lastActive: rng() > 0.3 ? `${rint(rng, 1, 59)}m ago` : `${rint(rng, 1, 9)}d ago`,
        since: `${pick(rng, ["Jan", "Feb", "Mar"])} 26`,
      }));

      const enabled = DATA2.modules.filter(() => rng() > 0.45).map((m) => m.slug);
      if (enabled.length === 0) enabled.push("glio");

      const userTotal = rint(rng, 18, 240);
      const byRole = [
        ["Neurosurgeons", Math.round(userTotal * 0.22)], ["Radiologists", Math.round(userTotal * 0.18)],
        ["Researchers", Math.round(userTotal * 0.14)], ["Nurses / PAC", Math.round(userTotal * 0.3)],
        ["Trial coordinators", Math.round(userTotal * 0.08)], ["Admins", Math.round(userTotal * 0.08)],
      ];

      const nodes = Array.from({ length: rint(rng, 1, 3) }, (_, i) => ({
        node: `aurora-${tag.toLowerCase()}-${i + 1}:8443`, mode: pick(rng, ["on-prem", "federated", "air-gapped"]),
        gpu: pick(rng, ["2× A100", "1× RTX 4090", "4× H100", "CPU-only"]), version: `pilot.${rint(rng, 8, 24)}`,
        status: rng() > 0.15 ? "synced" : "syncing", lastSync: `${rint(rng, 1, 50)}m`,
      }));

      const registries = [
        { name: `${name.split(" ")[0]} imaging registry`, records: rint(rng, 800, 18000), consent: +(0.7 + rng() * 0.28).toFixed(2), dp: pick(rng, ["ε=1.0", "ε=2.0", "off"]) },
        { name: `${name.split(" ")[0]} molecular bank`, records: rint(rng, 200, 6000), consent: +(0.6 + rng() * 0.35).toFixed(2), dp: pick(rng, ["ε=2.0", "ε=4.0"]) },
      ];

      const settings = [
        ["Federation mode", nodes[0].mode], ["Data residency", country], ["Identity provider", pick(rng, ["Microsoft AD FS", "Okta", "Keycloak"])],
        ["Equity gate", "enforced (locked)"], ["Telemetry", "off"], ["Audit retention", `${rint(rng, 3, 10)} years`],
        ["Consent enforcement", "refuse-without-policy"], ["Time zone", pick(rng, ["CET", "EST", "GMT", "JST", "IST"])],
      ];

      const accessReq = Array.from({ length: rint(rng, 0, 4) }, () => ({
        name: initials(rng), role: pick(rng, roles), requested: `${rint(rng, 1, 5)}d ago`, by: initials(rng),
      }));

      const KIND = [["user.login", "Authenticated"], ["report.sign", "Signed report"], ["override.log", "Override logged"], ["consent.verify", "Consent verified"], ["admin.grant", "Permission granted"], ["data.export", "Audit exported"], ["config.change", "Setting changed"], ["model.deploy", "Model deployed"]];
      const audit = Array.from({ length: 22 }, (_, i) => {
        const [k, d] = pick(rng, KIND);
        const actor = rng() > 0.3 ? initials(rng) : "system";
        return { ts: `2026-05-${String(29 - (i % 27)).padStart(2, "0")} ${String((9 + i) % 24).toString().padStart(2, "0")}:${String((i * 13) % 60).padStart(2, "0")}`, kind: k, desc: d, actor, role: actor === "system" ? "service" : pick(rng, roles), ip: `10.${rint(rng, 1, 30)}.${rint(rng, 0, 255)}.${rint(rng, 2, 250)}`, result: rng() > 0.07 ? "ok" : "blocked", sig: Array.from({ length: 6 }, () => "0123456789abcdef"[rint(rng, 0, 15)]).join("") };
      });

      return {
        name, tag, country, status, since: `${pick(rng, ["2025", "Jan 26", "Feb 26", "Mar 26"])}`,
        tier: pick(rng, ["Founding", "Pilot", "Pilot", "Associate"]), mou: status === "scoping" ? "pending" : "signed",
        brand: { ...BRANDS[hi % BRANDS.length], initials: name.split(" ").map((w) => w[0]).join("").slice(0, 3).toUpperCase() },
        onboarding: { done: onbDone, total: ONBOARD_STEPS.length, steps: ONBOARD_STEPS.map((s, i) => ({ s, done: i < onbDone, active: i === onbDone })) },
        admins, enabled, userTotal, byRole, nodes, registries, settings, accessReq, audit,
        contact: { email: `aurora-admin@${name.toLowerCase().replace(/[^a-z]+/g, "")}.org`, phone: `+${rint(rng, 1, 81)} ${rint(rng, 100, 999)} ${rint(rng, 1000, 9999)}` },
        equityOk: rng() > 0.2,
      };
    });
  };
  window.ONBOARD_STEPS = ONBOARD_STEPS;

  window.OPS_MESSAGES = (slug) => {
    const m = DATA.modules.find((x) => x.slug === slug);
    const o = window.OPS(slug);
    const rng = seeded(hashStr("msg-" + slug));
    const KIND = ["MDT", "secure", "system", "MDT", "secure"];
    const SUBJ = {
      glio: ["Pre-op MDT — GBM IDH-WT", "Margin field discrepancy", "Trial eligibility — arm B", "Methylation result back", "Re-resection discussion"],
      default: ["Pre-op MDT review", "Imaging discrepancy", "Plan sign-off needed", "Consent scope query", "Surveillance follow-up"],
    };
    const subs = SUBJ[slug] || SUBJ.default;
    const threads = subs.map((subject, i) => {
      const c = o.cases[i % o.cases.length];
      const kind = KIND[i % KIND.length];
      const n = rint(rng, 2, 5);
      const people = Array.from({ length: rint(rng, 2, 4) }, () => initials(rng));
      const msgs = Array.from({ length: n }, (_, j) => {
        const you = j === n - 1 && rng() > 0.6;
        return {
          from: you ? "You" : pick(rng, people), role: pick(rng, ["Neurosurgeon", "Radiologist", "Neuro-oncologist", "Trial coordinator"]),
          ts: `${rint(rng, 1, 11)}:${String(rint(rng, 0, 59)).padStart(2, "0")}`,
          body: pick(rng, [
            "Reviewed the overlay — margin extends 6 mm beyond contrast. Suggest widening the CTV.",
            "Molecular is back: MGMT methylated, IDH wildtype. Concordant with the radiomic read.",
            "Agree with proceeding to maximal safe resection. Eloquence map looks acceptable.",
            "Patient counselled; prefers to enrol if arm B is open. Flagging for the coordinator.",
            "Consent scope covers research use — cleared to run the organoid twin.",
            "Can we get the cine-flow re-acquired? The dwell-time estimate looks noisy.",
          ]),
          you,
        };
      });
      return {
        id: `THR-${String(i + 1).padStart(3, "0")}`, subject, kind, caseId: c.id, site: c.site,
        module: m.code.replace("AURORA-", ""), participants: people, unread: i < 2 ? rint(rng, 1, 3) : 0,
        last: msgs[msgs.length - 1].ts, msgs,
      };
    });
    return threads;
  };

  window.OPS_ANALYTICS = (slug) => {
    const m = DATA.modules.find((x) => x.slug === slug);
    const o = window.OPS(slug);
    const rng = seeded(hashStr("an-" + slug));

    const mkSteps = (drop, n) => {
      let s = 1; const steps = [];
      for (let i = 1; i <= n; i++) { const d = drop * (0.6 + rng() * 0.8) / n; const to = Math.max(0.04, s - d); steps.push({ t: (i / n) * 36, from: s, to }); s = to; }
      return steps;
    };
    const km = [
      { label: "Favourable molecular", color: m.accent, steps: mkSteps(0.35, 9) },
      { label: "Intermediate", color: m.accent2 || "#0099e0", steps: mkSteps(0.6, 9) },
      { label: "High risk", color: "#e8489f", steps: mkSteps(0.85, 9) },
    ];

    const base = o.kpis.cohortSize;
    const funnel = [
      { l: "Referred", v: base }, { l: "Imaged + bound", v: Math.round(base * 0.86) },
      { l: "Integrated dx", v: Math.round(base * 0.71) }, { l: "MDT reviewed", v: Math.round(base * 0.58) },
      { l: "Plan signed", v: Math.round(base * 0.49) }, { l: "Trial matched", v: Math.round(base * 0.21) },
    ];

    const palette = [m.accent, m.accent2 || "#0099e0", "#8a7bff", "#e8489f", "#e87b1f"];
    const dx = (o.cases || []).reduce((acc, c) => { acc[c.dx] = (acc[c.dx] || 0) + 1; return acc; }, {});
    const dxDist = Object.entries(dx).slice(0, 5).map(([l, v], i) => ({ l, v, color: palette[i % palette.length] }));

    const months = ["Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May"];
    const enrol = months.map((_, i) => Math.round(20 + i * 4 + rng() * 14));

    const promCohort = months.map((_, i) => +(0.5 + i * 0.025 + rng() * 0.03).toFixed(3));
    const promPeer = months.map(() => +(0.72 + rng() * 0.04).toFixed(3));

    const outcomes = [
      { l: "Complete response", v: rint(rng, 8, 22), color: "#15935f" },
      { l: "Partial response", v: rint(rng, 20, 38), color: m.accent },
      { l: "Stable disease", v: rint(rng, 18, 34), color: "#e8b84b" },
      { l: "Progression", v: rint(rng, 8, 20), color: "#c43d4b" },
    ];

    const drift = m.subsystems.slice(0, 3).map((s, i) => ({
      label: s.code, color: palette[i],
      data: months.map((_, j) => +(0.02 + Math.sin(j / 3 + i) * 0.05 + rng() * 0.04).toFixed(3)),
    }));

    const mkROC = (auc) => { const pts = [[0, 0]]; for (let x = 0.05; x <= 1.0001; x += 0.05) { const y = Math.min(1, Math.pow(x, (1 - auc) * 2)); pts.push([x, +y.toFixed(3)]); } return pts; };
    const evalModels = o.models.map((mdl) => ({
      code: mdl.code, name: mdl.name, auc: mdl.auc, eval: mdl.eval, ece: mdl.ece, color: m.accent,
      roc: mkROC(mdl.auc),
      calib: Array.from({ length: 6 }, (_, i) => { const x = i / 5; return [x, +Math.min(1, Math.max(0, x + (rng() - 0.5) * 0.14)).toFixed(3)]; }),
      confusion: [[rint(rng, 70, 95), rint(rng, 1, 8), rint(rng, 0, 4)], [rint(rng, 2, 9), rint(rng, 60, 90), rint(rng, 1, 7)], [rint(rng, 0, 5), rint(rng, 2, 8), rint(rng, 55, 88)]],
      strata: o.strata.slice(0, 6).map((s) => ({ l: s.k, v: Math.round(s.v * 100), color: s.pass ? "#15935f" : "#c43d4b" })),
      versions: Array.from({ length: 4 }, (_, i) => ({ v: `2026.Q1.${i}`, auc: +(mdl.auc - i * 0.012 - rng() * 0.01).toFixed(3) })).reverse(),
    }));

    return { km, funnel, dxDist, months, enrol, promCohort, promPeer, outcomes, drift, evalModels,
      confLabels: ["Class A", "Class B", "Class C"] };
  };

  window.OPS_BENCHMARK = () => {
    const rng = seeded(424242);
    return DATA.modules.map((m) => ({
      module: m.code.replace("AURORA-", ""), name: m.name, accent: m.accent,
      resection: rint(rng, 72, 96), ttd: rint(rng, 28, 62), accuracy: rint(rng, 84, 97),
      enrol: rint(rng, 8, 28), overrideAudit: 100, equity: rint(rng, 80, 100),
    }));
  };

  const cache = {};
  window.OPS = (slug) => {
    if (!cache[slug]) {
      const m = DATA.modules.find((x) => x.slug === slug);
      cache[slug] = buildForModule(m);
    }
    return cache[slug];
  };

  window.OPS_FLEET = () => {
    const mods = DATA.modules.map((m) => {
      const o = window.OPS(m.slug);
      return {
        m,
        activeCases: o.kpis.activeCases,
        cohortSize: o.kpis.cohortSize,
        deployments: o.deployments.length,
        synced: o.deployments.filter((d) => d.status === "synced").length,
        equityPass: o.equityPass,
        equityTotal: o.equityTotal,
        uptime: o.kpis.uptime,
        subsystems: m.subsystems.length,
        live: m.subsystems.filter((s) => s.status === "live").length,
      };
    });
    return {
      mods,
      totalCases: mods.reduce((a, b) => a + b.activeCases, 0),
      totalCohort: mods.reduce((a, b) => a + b.cohortSize, 0),
      totalDeploys: mods.reduce((a, b) => a + b.deployments, 0),
      totalSubsystems: mods.reduce((a, b) => a + b.subsystems, 0),
    };
  };
})();
