// ════════════════════════════════════════════════════════════════════
//  VIEW · CLINICAL SURFACE — full clinical workstation
//  Integrates AI/molecular outputs WITH the evidence-based clinical-
//  dashboard design components (Bischof et al. 2024, JMIR): patient
//  info, key-events timeline, PROMs (index + dimensional + trend +
//  peer band), health goals, alerts, free write-in notes, audit.
// ════════════════════════════════════════════════════════════════════
window.AV = window.AV || {};

// per-module molecular / classification facts
const CLASSIFY = {
  glio: [["IDH", "wildtype", 0.99], ["MGMT", "methylated", 0.83], ["TERT", "C228T mut", 0.97], ["EGFR", "amplified", 0.94], ["Chr 7/10", "+7 / −10", 0.91], ["WHO 2021", "GBM IDH-WT", 0.96]],
  "spina-bifida": [["Lesion", "L3 level", 0.95], ["Defect", "open NTD", 0.98], ["Hindbrain", "Chiari II", 0.9], ["Ventricles", "16 mm", 0.93], ["Repair", "prenatal cand.", 0.81], ["Folate axis", "low", 0.77]],
  tc: [["Conus", "L2–L3", 0.92], ["Filum", "thickened", 0.88], ["Type", "occult TCS", 0.79], ["Bladder", "neurogenic", 0.84], ["Traction", "elevated", 0.86], ["Release", "candidate", 0.74]],
  hydrocephalus: [["Type", "obstructive", 0.93], ["Evans idx", "0.41", 0.96], ["Transmantle", "high", 0.88], ["Aqueduct", "stenotic", 0.9], ["ETVSS", "72", 0.85], ["Decision", "ETV", 0.8]],
  dwm: [["Vermis", "hypoplastic", 0.91], ["4th vent", "cystic", 0.94], ["Post fossa", "enlarged", 0.89], ["Torcula", "elevated", 0.82], ["Spectrum", "DWM classic", 0.86], ["Hydroceph", "present", 0.9]],
  enceph: [["Subtype", "frontoethmoidal", 0.93], ["Sac", "42 cm³", 0.95], ["Contents", "gliotic", 0.84], ["Defect", "11 mm", 0.9], ["Vessels", "mapped", 0.88], ["Closure", "forge plan", 0.79]],
  arach: [["Location", "Sylvian", 0.94], ["Galassi", "type II", 0.9], ["Volume", "38 cm³", 0.95], ["Mass effect", "mild", 0.83], ["Pressure", "iso-CSF", 0.78], ["Decision", "watch", 0.86]],
  cranio: [["Suture", "sagittal", 0.97], ["CI", "0.68", 0.95], ["Severity", "moderate", 0.88], ["ICP risk", "low", 0.82], ["Genetics", "non-syndromic", 0.9], ["Plan", "endoscopic", 0.84]],
  chiari: [["Tonsils", "−9 mm", 0.96], ["Morphology", "peg-like", 0.89], ["CSF flow", "reduced", 0.91], ["Syrinx", "C4–C7", 0.87], ["Clivus angle", "128°", 0.84], ["Decision", "decompress", 0.8]],
};
const EVENT_IC = { dx: "doc", surgery: "pulse", report: "sign", tx: "beaker", scan: "monitor" };
const REC_PILL = { strong: "pass", moderate: "beta", advisory: "soon" };

window.AV.clinical = function Clinical({ m, ops, activeCase, go }) {
  const a = m.accent;
  const c = activeCase || ops.cases.find((x) => x.stageIdx >= 4) || ops.cases[0];
  const D = window.CASE_DETAIL(m, c);
  const classify = CLASSIFY[m.slug] || m.subsystems.slice(0, 6).map((s, i) => [s.code.split("-").pop(), s.status, 0.8 + i * 0.02]);
  const sigs = m.subsystems.map((s, i) => ({ ...s, pct: ops.models[i] ? Math.round(ops.models[i].eval * 100) : 80 }));
  const showRoi = ["glio", "enceph", "arach", "dwm"].includes(m.slug);
  const [tab, setTab] = React.useState("overview");
  const [note, setNote] = React.useState("");
  const [showReport, setShowReport] = React.useState(false);
  const [showSign, setShowSign] = React.useState(false);
  const P = D.proms;

  const SURF = [
    { k: "overview", label: "Case overview", ic: "overview" },
    { k: "imaging", label: "Imaging & radiomics", ic: "monitor" },
    { k: "signals", label: "AI signals & dx", ic: "cpu" },
    { k: "proms", label: "Patient outcomes", ic: "pulse" },
    { k: "orders", label: "Order sets", ic: "check" },
    { k: "routine", label: "Routine workflow", ic: "check" },
    { k: "plan", label: "Plan & trials", ic: "model" },
    { k: "patient", label: "Patient companion", ic: "users" },
    { k: "notes", label: "Notes", ic: "doc" },
    { k: "audit", label: "Audit trail", ic: "audit" },
  ];

  return (
    <div className="view">
      {showReport && <ClinicalReport m={m} c={c} D={D} classify={classify} onClose={() => setShowReport(false)} />}
      {showSign && <ESignCeremony m={m} c={c} D={D} onClose={() => setShowSign(false)} />}
      <ViewHead
        eyebrow={<>{m.code} · clinical surface</>}
        title={<>Clinical <em className="s">workstation</em></>}
        sub="One report: patient context, AI outputs, patient-reported outcomes and the audit trail — built to strengthen shared decision-making, not replace it."
        actions={<><button className="btn btn-sm" onClick={() => go("cases")}><Icon n="arrow" style={{ transform: "rotate(180deg)" }} /> Queue</button><button className="btn btn-sm" onClick={() => go("messages")}><Icon n="doc" /> MDT thread</button><button className="btn btn-sm" onClick={() => setShowReport(true)}><Icon n="doc" /> Generate PDF</button><button className="btn btn-pri btn-sm" style={{ background: a, borderColor: a }} onClick={() => setShowSign(true)}><Icon n="sign" /> Sign report</button></>}
      />

      {/* patient banner */}
      <div className="card" style={{ marginBottom: 14, borderLeft: `3px solid ${a}` }}>
        <div className="card-b" style={{ display: "flex", gap: 18, alignItems: "center", flexWrap: "wrap", padding: "14px 18px" }}>
          <div className="av-sm" style={{ width: 44, height: 44, fontSize: 14, background: a }}>{c.clinician.split(" ").map((x) => x[0]).join("")}</div>
          <div>
            <div style={{ fontWeight: 600, fontSize: 16, letterSpacing: "-0.02em", display: "flex", alignItems: "center", gap: 9 }}>{c.id} <span className="mono" style={{ fontSize: 11, color: "var(--muted)", fontWeight: 400 }}>{c.mrn}</span></div>
            <div style={{ fontSize: 12.5, color: "var(--text-2)", marginTop: 2 }}>{c.dx} · {c.age} · {c.site}</div>
          </div>
          <div style={{ display: "flex", gap: 22, marginLeft: "auto", flexWrap: "wrap" }}>
            {D.encounter.slice(0, 4).map(([k, v], i) => (
              <div key={i}><div className="mono" style={{ fontSize: 9.5, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--muted)" }}>{k}</div><div style={{ fontSize: 13, fontWeight: 500, marginTop: 3 }}>{v}</div></div>
            ))}
            <div style={{ display: "flex", flexDirection: "column", gap: 4, alignItems: "flex-end" }}>
              <Pill s={m.status} />
              {c.overrides > 0 && <span className="pill warn"><span className="d" />override · {c.overrides}</span>}
            </div>
          </div>
        </div>
      </div>

      {/* alerts (threshold-based, per paper) */}
      {D.alerts.length > 0 && (
        <div className="grid" style={{ gap: 8, marginBottom: 14 }}>
          {D.alerts.map((al, i) => (
            <div key={i} className="card" style={{ padding: "10px 14px", display: "flex", alignItems: "center", gap: 11, borderLeft: `3px solid var(--${al.sev === "bad" ? "bad" : al.sev === "warn" ? "warn" : "info"})` }}>
              <Icon n="bell" style={{ width: 15, color: `var(--${al.sev === "bad" ? "bad" : al.sev === "warn" ? "warn" : "info"})` }} />
              <span style={{ fontSize: 13, color: "var(--text-2)" }}>{al.t}</span>
            </div>
          ))}
        </div>
      )}

      <div className="card" style={{ overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "200px 1fr" }}>
          {/* surface nav */}
          <div style={{ borderRight: "1px solid var(--line)", padding: 12, background: "var(--panel-2)" }}>
            <div className="mono" style={{ fontSize: 9.5, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--muted)", padding: "4px 8px 8px" }}>{m.code} · surfaces</div>
            {SURF.map((s) => (
              <a key={s.k} onClick={() => setTab(s.k)} className={`sb-link ${tab === s.k ? "active" : ""}`} style={{ color: tab === s.k ? "var(--text)" : "var(--text-2)", background: tab === s.k ? "var(--bg-elev)" : "transparent", fontSize: 12.5 }}>
                <Icon n={s.ic} /> <span>{s.label}</span>
              </a>
            ))}
            <div className="mono" style={{ fontSize: 9.5, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--muted)", padding: "18px 8px 8px" }}>Care team</div>
            {D.team.map((t, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 8px" }}>
                <Avatar name={t.name} />
                <div style={{ lineHeight: 1.2, minWidth: 0 }}><div style={{ fontSize: 11.5, fontWeight: 500, whiteSpace: "nowrap" }}>{t.name}</div><div style={{ fontSize: 10, color: "var(--muted)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{t.role}</div></div>
              </div>
            ))}
          </div>

          {/* surface body */}
          <div style={{ padding: 18, minHeight: 520 }}>
            {tab === "overview" && <CSOverview {...{ m, c, D, a, classify }} />}
            {tab === "imaging" && <CSImaging {...{ m, D, a, showRoi }} />}
            {tab === "signals" && <CSSignals {...{ m, sigs, classify, D, a }} />}
            {tab === "proms" && <CSProms {...{ P, a }} />}
            {tab === "orders" && <CSOrders {...{ D, m, a }} />}
            {tab === "routine" && <CSRoutine {...{ D, a, onReport: () => setShowReport(true) }} />}
            {tab === "plan" && <CSPlan {...{ D, a }} />}
            {tab === "patient" && <CSPatient {...{ P, c, a }} />}
            {tab === "notes" && <CSNotes {...{ note, setNote, D, a }} />}
            {tab === "audit" && <CSAudit {...{ m, c, ops, a }} />}
          </div>
        </div>
      </div>
    </div>
  );
};

// ── Case overview ──────────────────────────────────────────────────
function CSOverview({ m, c, D, a, classify }) {
  return (
    <div className="grid" style={{ gridTemplateColumns: "1.4fr 1fr", gap: 16, alignItems: "start" }}>
      <div className="grid" style={{ gap: 14 }}>
        <div className="grid g4">
          <div className="kpi" style={{ boxShadow: "none" }}><div className="l">Stage</div><div className="v" style={{ fontSize: 15 }}>{c.stage}</div></div>
          <div className="kpi" style={{ boxShadow: "none" }}><div className="l">Subsystems</div><div className="v" style={{ fontSize: 15 }}>{m.subsystems.length}<small>ready</small></div></div>
          <div className="kpi" style={{ boxShadow: "none" }}><div className="l">Confidence</div><div className="v" style={{ fontSize: 15 }}>{c.conf.toFixed(2)}</div></div>
          <div className="kpi" style={{ boxShadow: "none" }}><div className="l">Audit</div><div className="v" style={{ fontSize: 15, color: "var(--ok)" }}>on</div></div>
        </div>

        <Card title="Key events" sub="treatment timeline">
          <div className="flow">
            {D.proms.events.map((e, i) => (
              <div key={i} className={`flow-step ${i < D.proms.events.length - 1 ? "done" : "active"}`}>
                <div className="node"><Icon n={EVENT_IC[e.k] || "doc"} style={{ width: 13 }} /></div>
                <div className="flow-bd"><b>{e.t} <span className="lat">· {e.d}</span></b></div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Integrated diagnosis" sub={`${m.code}-DIAG · signed`}>
          <div className="mol-grid">
            {classify.slice(0, 6).map((g, i) => (
              <div key={i} className="mol-cell"><div className="k">{g[0]}</div><div className="v">{g[1]}</div><div className="c">conf {typeof g[2] === "number" ? g[2].toFixed(2) : g[2]}</div></div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid" style={{ gap: 14 }}>
        <Card title="Encounter">
          <div className="kv" style={{ gridTemplateColumns: "130px 1fr" }}>
            {D.encounter.map(([k, v], i) => (
              <div key={i} style={{ borderBottom: i >= D.encounter.length - 1 ? "none" : undefined }}><div className="k">{k}</div><div className="v">{v}</div></div>
            ))}
          </div>
        </Card>
        <Card title="Health-related QoL" sub="EQ-5D index">
          <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}><div style={{ fontSize: 30, fontWeight: 600, letterSpacing: "-0.03em" }}>{D.proms.eqTrend[D.proms.eqTrend.length - 1]}</div><span className="delta up mono" style={{ color: "var(--ok)", fontSize: 12 }}>▲ improving</span></div>
          <Spark data={D.proms.eqTrend.map((x) => x * 100)} color={a} />
          <div className="note" style={{ marginTop: 8 }}>VAS {D.proms.vasTrend[D.proms.vasTrend.length - 1]}/100 · {D.proms.promMonths.length} assessments</div>
        </Card>
      </div>
    </div>
  );
}

// ── Imaging & radiomics ────────────────────────────────────────────
function CSImaging({ m, D, a, showRoi }) {
  return (
    <div className="grid" style={{ gridTemplateColumns: "1.3fr 1fr", gap: 16, alignItems: "start" }}>
      <div>
        <div className="card-h" style={{ padding: "0 0 10px", border: "none" }}><h3 style={{ fontSize: 13 }}>Primary modality · overlay</h3><span className="sub">updated 2s ago</span></div>
        <div className="cs-imgbox">
          <div className="cs-margin" style={{ background: `radial-gradient(closest-side, ${a}66, transparent 70%)` }} />
          {showRoi && <div className="cs-roi" />}
          <div className="cs-hints"><span>σ = 1.4 mm</span><span>·</span><span>ROI 24.7 cm³</span></div>
          <div className="cs-scale">10 mm</div>
        </div>
        <div className="cs-legend">
          <div><span className="sw" style={{ background: a }} /> overlay field</div>
          {showRoi && <div><span className="sw" style={{ background: "#ef476f" }} /> primary ROI</div>}
          <div><span className="sw" style={{ border: "1px dashed var(--muted-2)" }} /> plan draft</div>
        </div>
        <Card title="Longitudinal volume" sub="cm³ over scans" style={{ marginTop: 14 }}>
          <table className="tbl"><thead><tr><th>Scan</th><th>Event</th><th className="rt">Volume</th></tr></thead>
            <tbody>{D.longitudinal.map((l, i) => (<tr key={i} style={{ cursor: "default" }}><td className="num"><b>{l.when}</b></td><td>{l.event}</td><td className="rt num">{l.vol} cm³</td></tr>))}</tbody>
          </table>
        </Card>
      </div>
      <div className="grid" style={{ gap: 14 }}>
        <Card title="Series" sub={`${D.series.length} acquired`}>
          {D.series.map((s, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 0", borderBottom: i < D.series.length - 1 ? "1px solid var(--line)" : "none" }}>
              <span className="tag-dot" style={{ background: s.active ? a : "var(--muted-2)" }} />
              <b style={{ fontSize: 13 }}>{s.name}</b>
              <span className="mono muted" style={{ fontSize: 11, marginLeft: "auto" }}>{s.slices} sl · {s.thick} mm</span>
              <Icon n="check" style={{ width: 14, color: "var(--ok)" }} />
            </div>
          ))}
        </Card>
        <Card title="Radiomic measures" sub="auto-extracted">
          <div className="kv" style={{ gridTemplateColumns: "1fr auto" }}>
            {D.measures.map(([k, v], i) => (<div key={i} style={{ borderBottom: i >= D.measures.length - 1 ? "none" : undefined, justifyContent: "space-between" }}><div className="k" style={{ textTransform: "none", letterSpacing: 0, fontFamily: "var(--display)", fontSize: 13, color: "var(--text-2)" }}>{k}</div><div className="v num" style={{ fontWeight: 600, color: "var(--text)" }}>{v}</div></div>))}
          </div>
        </Card>
      </div>
    </div>
  );
}

// ── AI signals & differential ──────────────────────────────────────
function CSSignals({ m, sigs, classify, D, a }) {
  return (
    <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", gap: 16, alignItems: "start" }}>
      <Card title="Subsystem signals" sub={`${sigs.length} firing`}>
        {sigs.map((s) => <BarRow key={s.id} code={s.code} name={s.name} pct={s.pct} color={a} />)}
      </Card>
      <div className="grid" style={{ gap: 14 }}>
        <Card title="Differential" sub="ranked posterior">
          {D.diff.map((d, i) => (
            <div key={i} className="bar-block">
              <div className="bar-row"><span><b style={{ fontWeight: i === 0 ? 600 : 400 }}>{d[0]}</b></span><span className="num muted">{(d[1] * 100).toFixed(0)}%</span></div>
              <Meter pct={d[1] * 100} color={i === 0 ? a : "var(--muted-2)"} />
            </div>
          ))}
        </Card>
        <Card title="Recommendations" sub="decision-support">
          {D.recs.slice(0, 4).map((r, i) => (
            <div key={i} style={{ padding: "9px 0", borderBottom: i < 3 ? "1px solid var(--line)" : "none" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}><code style={{ fontSize: 10.5, color: "var(--muted)" }}>{r.code}</code><span className={`pill ${REC_PILL[r.level]}`} style={{ marginLeft: "auto" }}><span className="d" />{r.level}</span></div>
              <div style={{ fontSize: 12.5, color: "var(--text-2)", lineHeight: 1.45 }}>{r.rec} <span className="mono muted">· conf {r.conf}</span></div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}

// ── PROMs (the paper's centerpiece) ────────────────────────────────
function CSProms({ P, a }) {
  const dimColor = (v) => v <= 1 ? "var(--ok)" : v <= 2 ? a : v <= 3 ? "var(--warn)" : "var(--bad)";
  const dp = P.dPROM;
  const peerDelta = typeof dp.v === "number" ? (dp.dir === "higher" ? dp.v >= dp.peer : dp.v <= dp.peer) : true;
  return (
    <div className="grid" style={{ gap: 16 }}>
      <div className="grid g2" style={{ alignItems: "start" }}>
        <Card title="EQ-5D index over time" sub="generic PROM · 0–1">
          <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 4 }}><div style={{ fontSize: 30, fontWeight: 600, letterSpacing: "-0.03em" }}>{P.eqTrend[P.eqTrend.length - 1]}</div><span className="muted" style={{ fontSize: 12 }}>was {P.eqTrend[0]} ({P.promMonths[0]})</span></div>
          <Spark data={P.eqTrend.map((x) => x * 100)} color={a} h={56} />
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }} className="mono muted">{P.promMonths.map((mo, i) => <span key={i} style={{ fontSize: 9 }}>{mo}</span>)}</div>
        </Card>
        <Card title="VAS — overall health" sub="self-rated · 0–100">
          <div style={{ fontSize: 30, fontWeight: 600, letterSpacing: "-0.03em" }}>{P.vasTrend[P.vasTrend.length - 1]}<small style={{ fontSize: 13, color: "var(--muted)" }}>/100</small></div>
          <Spark data={P.vasTrend} color={a} kind="bars" h={56} />
        </Card>
      </div>

      <div className="grid g2" style={{ alignItems: "start" }}>
        <Card title="EQ-5D dimensions" sub="1 none → 5 extreme">
          {P.eqDims.map((d, i) => (
            <div key={i} className="bar-block">
              <div className="bar-row"><span>{d.k}</span><span className="num" style={{ color: dimColor(d.v) }}>level {d.v}</span></div>
              <Meter pct={(d.v / 5) * 100} color={dimColor(d.v)} />
            </div>
          ))}
        </Card>
        <Card title={`${dp.name} vs peer group`} sub="disease-specific · peer band">
          <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
            <div style={{ fontSize: 30, fontWeight: 600, letterSpacing: "-0.03em" }}>{dp.v}<small style={{ fontSize: 13, color: "var(--muted)" }}>{dp.unit}</small></div>
            <span className={`pill ${peerDelta ? "pass" : "warn"}`}><span className="d" />{peerDelta ? "at / above peer" : "below peer"}</span>
          </div>
          <div style={{ position: "relative", marginTop: 18, height: 40 }}>
            <div style={{ position: "absolute", left: "30%", right: "18%", top: 12, height: 8, background: "color-mix(in oklab, var(--ok) 22%, transparent)", borderRadius: 6 }} />
            <div className="mono" style={{ position: "absolute", left: "30%", top: 24, fontSize: 9, color: "var(--muted)" }}>peer / normal band</div>
            <div style={{ position: "absolute", left: typeof dp.v === "number" ? `${Math.min(92, Math.max(2, (dp.dir === "higher" ? dp.v : 100 - dp.v) % 100))}%` : "60%", top: 6, width: 3, height: 20, background: a, borderRadius: 3 }} />
            <div className="mono" style={{ position: "absolute", top: 0, fontSize: 9, color: "var(--text-2)", left: 0 }}>this patient ▾</div>
          </div>
        </Card>
      </div>

      <Card title="Health goals" sub="set with patient · tracked">
        <table className="tbl"><thead><tr><th>Goal</th><th>Target</th><th style={{ width: 200 }}>Progress</th><th>Due</th></tr></thead>
          <tbody>
            {P.goals.map((g, i) => (
              <tr key={i} style={{ cursor: "default" }}>
                <td><b>{g.g}</b></td>
                <td className="muted">{g.target}</td>
                <td><div style={{ display: "flex", alignItems: "center", gap: 9 }}><Meter pct={g.prog} color={g.prog >= 70 ? "var(--ok)" : a} /><span className="num" style={{ fontSize: 11, width: 32 }}>{g.prog}%</span></div></td>
                <td className="num muted">{g.due}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

// ── Plan & trials ──────────────────────────────────────────────────
function CSPlan({ D, a }) {
  return (
    <div className="grid" style={{ gap: 16 }}>
      <Card title="Recommended plan" sub="decision-support · every override logged">
        <div className="flow">
          {D.recs.map((r, i) => (
            <div key={i} className={`flow-step ${i < 2 ? "done" : "active"}`}>
              <div className="node">{i + 1}</div>
              <div className="flow-bd"><b>{r.name} <span className="lat">· {r.code} · conf {r.conf}</span></b><p>{r.rec}</p></div>
            </div>
          ))}
        </div>
      </Card>
      <Card title="Matched trials" sub="refreshed nightly · per-arm fit" flush>
        <table className="tbl"><thead><tr><th>Trial</th><th>Phase</th><th className="rt">Arms</th><th style={{ width: 160 }}>Fit</th><th>Status</th></tr></thead>
          <tbody>
            {D.trials.map((t, i) => (
              <tr key={i}>
                <td><b>{t.name}</b><div className="mono" style={{ fontSize: 10.5, color: "var(--muted)" }}>{t.id}</div></td>
                <td><span className="chip">{t.phase}</span></td>
                <td className="rt num">{t.arms}</td>
                <td><div style={{ display: "flex", alignItems: "center", gap: 9 }}><Meter pct={t.fit * 100} color={t.fit > 0.75 ? "var(--ok)" : a} /><span className="num" style={{ fontSize: 11 }}>{t.fit.toFixed(2)}</span></div></td>
                <td>{t.status === "paused" ? <Pill s="warn">{t.status}</Pill> : <Pill s="pass">{t.status}</Pill>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

// ── Free write-in notes (per paper) ────────────────────────────────
function CSNotes({ note, setNote, D, a }) {
  const presets = ["Discussed at MDT — consensus on plan.", "Patient prefers watchful waiting; reassess 3 months.", "Flag for re-imaging in 6 weeks.", "Counselled family re: risks/benefits."];
  return (
    <div className="grid" style={{ gridTemplateColumns: "1.4fr 1fr", gap: 16, alignItems: "start" }}>
      <Card title="Clinician note" sub="free write-in · attached to audit">
        <textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Type a note for the MDT record…"
          style={{ width: "100%", minHeight: 180, border: "1px solid var(--line)", borderRadius: 10, padding: 13, font: "inherit", fontSize: 13.5, lineHeight: 1.6, color: "var(--text)", background: "var(--panel-2)", resize: "vertical", outline: "none" }} />
        <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginTop: 10 }}>
          {presets.map((p, i) => <button key={i} className="btn btn-sm" onClick={() => setNote(note ? note + "\n" + p : p)}><Icon n="plus" /> {p.slice(0, 22)}…</button>)}
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 12 }}><button className="btn btn-pri btn-sm" style={{ background: a, borderColor: a }}><Icon n="sign" /> Save to record</button><button className="btn btn-sm">Discard</button></div>
      </Card>
      <Card title="Recent notes" sub="this case">
        <div className="feed">
          {[["A. Lindqvist", "Pre-op MDT — proceed with maximal safe resection.", "2d ago"], ["M. Moreau", "Molecular pending; hold integrated dx.", "5d ago"], ["S. Patel", "Imaging reviewed — no acute change.", "8d ago"]].map((n, i) => (
            <div className="feed-item" key={i}><div className="feed-ic"><Icon n="doc" /></div><div><div className="feed-tx"><b>{n[0]}</b> — {n[1]}</div><div className="feed-when">{n[2]}</div></div></div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ── Routine workflow completer ─────────────────────────────────────
function CSRoutine({ D, a, onReport }) {
  const pct = Math.round((D.routineDone / D.routineTotal) * 100);
  return (
    <div className="grid" style={{ gridTemplateColumns: "1.5fr 1fr", gap: 16, alignItems: "start" }}>
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}><b style={{ fontSize: 13 }}>Pathway progress</b><span className="num muted">{D.routineDone}/{D.routineTotal} steps · {pct}%</span></div>
            <Meter pct={pct} color={a} />
          </div>
        </div>
        {D.routine.map((grp, gi) => {
          const gd = grp.items.filter((i) => i.done).length;
          return (
            <Card key={gi} title={grp.group} sub={`${gd}/${grp.items.length}`} style={{ marginBottom: 12 }}>
              {grp.items.map((it, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 11, padding: "8px 0", borderBottom: i < grp.items.length - 1 ? "1px solid var(--line)" : "none" }}>
                  <span style={{ width: 20, height: 20, borderRadius: 6, flexShrink: 0, display: "grid", placeItems: "center", background: it.done ? a : it.active ? "transparent" : "transparent", border: it.done ? "none" : `1.5px solid ${it.active ? a : "var(--line-2)"}`, color: "#fff" }}>{it.done && <Icon n="check" style={{ width: 13 }} />}</span>
                  <span style={{ fontSize: 13, color: it.done ? "var(--text-2)" : "var(--text)", textDecoration: it.done ? "none" : "none", flex: 1, fontWeight: it.active ? 600 : 400 }}>{it.t}</span>
                  <span className="mono muted" style={{ fontSize: 10.5 }}>{it.owner}</span>
                  {it.active && <button className="btn btn-sm btn-pri" style={{ background: a, borderColor: a }}>Complete</button>}
                </div>
              ))}
            </Card>
          );
        })}
      </div>
      <div className="grid" style={{ gap: 14 }}>
        <Card title="Generate documents" sub="signed outputs">
          <p style={{ margin: "0 0 14px", fontSize: 13, color: "var(--text-2)", lineHeight: 1.55 }}>Produce the patient-facing summary and the integrated clinical report from this case's completed routine. Each emits to PACS / EHR and is logged to audit.</p>
          <button className="btn btn-pri" style={{ width: "100%", justifyContent: "center", background: a, borderColor: a, marginBottom: 8 }} onClick={onReport}><Icon n="doc" /> Generate report PDF</button>
          <button className="btn" style={{ width: "100%", justifyContent: "center" }}><Icon n="download" /> Patient summary</button>
        </Card>
        <Card title="Routine SLA" sub="time-to-complete">
          <BarRow name="Intake → bound" pct={100} color="var(--ok)" unit="%" />
          <BarRow name="Imaging QC" pct={92} color="var(--ok)" unit="%" />
          <BarRow name="AI synthesis" pct={78} color={a} unit="%" />
          <BarRow name="MDT scheduled" pct={pct} color={a} unit="%" />
        </Card>
      </div>
    </div>
  );
}

// ── Printable clinical report (PDF via browser print) ──────────────
function ClinicalReport({ m, c, D, classify, onClose }) {
  const bp = m.accent;
  return (
    <div className="report-scrim" onClick={(e) => { if (e.target.classList.contains("report-scrim")) onClose(); }}>
      <div className="report-toolbar">
        <span className="chip" style={{ background: "rgba(255,255,255,.1)", color: "#fff", borderColor: "rgba(255,255,255,.2)" }}><Icon n="doc" /> {D.report.reportId}</span>
        <span className="sp" />
        <button className="btn btn-sm" onClick={() => window.print()}><Icon n="download" /> Print / Save as PDF</button>
        <button className="btn btn-sm" onClick={onClose}>Close</button>
      </div>
      <div className="report-doc" id="report-doc">
        <div className="rd-band" style={{ background: `linear-gradient(90deg, ${bp}, ${m.accent2 || bp})` }} />
        <div className="rd-pad">
          <div className="rd-head">
            <div className="rd-logo">
              <span className="mk" style={{ background: bp }}>{m.idx}</span>
              <div><b>AURORA · {m.code}</b><span>Integrated clinical report</span></div>
            </div>
            <div className="rd-meta">
              Report {D.report.reportId}<br />Generated {D.report.generated}<br />Status: SIGNED · auditable
            </div>
          </div>

          <h2 className="rd-title">{c.dx}</h2>
          <p className="rd-sub">{c.id} · {c.mrn} · {c.age} · {c.site} · confidence {c.conf.toFixed(2)}</p>

          <div className="rd-sec">
            <h4>Patient & encounter</h4>
            <div className="rd-kv">
              {D.encounter.map(([k, v], i) => (<div key={i}><span className="k">{k}</span><span className="v">{v}</span></div>))}
            </div>
          </div>

          <div className="rd-sec">
            <h4>Integrated diagnosis · {m.code}-DIAG</h4>
            <div className="rd-mol">
              {classify.slice(0, 6).map((g, i) => (<div key={i}><div className="k">{g[0]}</div><div className="v">{g[1]}</div><div className="c">conf {typeof g[2] === "number" ? g[2].toFixed(2) : g[2]}</div></div>))}
            </div>
          </div>

          <div className="rd-sec">
            <h4>Clinical summary</h4>
            <p className="rd-prose">{D.report.summary}</p>
          </div>

          <div className="rd-sec">
            <h4>Impression & recommendations</h4>
            <ol className="rd-impr">{D.report.impression.map((r, i) => <li key={i}>{r}</li>)}</ol>
          </div>

          <div className="rd-sec">
            <h4>Patient-reported outcomes</h4>
            <div className="rd-kv">
              <div><span className="k">EQ-5D index (latest)</span><span className="v">{D.proms.eqTrend[D.proms.eqTrend.length - 1]}</span></div>
              <div><span className="k">VAS (overall health)</span><span className="v">{D.proms.vasTrend[D.proms.vasTrend.length - 1]}/100</span></div>
              <div><span className="k">{D.proms.dPROM.name}</span><span className="v">{D.proms.dPROM.v}{D.proms.dPROM.unit}</span></div>
              <div><span className="k">Assessments</span><span className="v">{D.proms.promMonths.length}</span></div>
            </div>
          </div>

          <div className="rd-sign">
            <div><div className="who">{D.report.authoredBy}</div><div className="line">Authoring clinician · electronically signed</div></div>
            <div style={{ textAlign: "right" }}><div className="line" style={{ fontFamily: "var(--mono)", fontSize: 10 }}>Audit chain: inputs → weights → config → outputs</div><div className="line" style={{ fontFamily: "var(--mono)", fontSize: 10 }}>sigstore-verified · {D.report.generated}</div></div>
          </div>
        </div>
        <div className="rd-foot">AURORA {m.code} · decision-support, not a medical device · every recommendation explainable, every override logged · generated for {c.site}</div>
      </div>
    </div>
  );
}

// ── Order sets ─────────────────────────────────────────────────────
function CSOrders({ D, m, a }) {
  const [checked, setChecked] = React.useState({});
  const sets = [
    { group: "Imaging", items: ["Post-op MRI within 72h", "Cine-flow / perfusion if indicated", "Baseline for surveillance"] },
    { group: "Labs & molecular", items: ["Full WHO-2021 molecular panel", "Methylation classifier (if available)", "Pre-op coagulation screen"] },
    { group: "Medication", items: m.slug === "glio" ? ["Dexamethasone taper", "Levetiracetam prophylaxis", "Temozolomide per Stupp"] : ["Analgesia ladder", "DVT prophylaxis", "Stress-ulcer prophylaxis"] },
    { group: "Referrals", items: ["MDT / tumour board", "PROM baseline capture", "Trial coordinator if eligible", "Rehab / PM&R"] },
  ];
  const total = sets.flatMap((s) => s.items).length;
  const done = Object.values(checked).filter(Boolean).length;
  const tog = (k) => setChecked((p) => ({ ...p, [k]: !p[k] }));
  return (
    <div className="grid" style={{ gridTemplateColumns: "1.5fr 1fr", gap: 16, alignItems: "start" }}>
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}><b style={{ fontSize: 13 }}>Standard order set · {m.name}</b><span className="num muted">{done}/{total} selected</span></div>
        {sets.map((s, si) => (
          <Card key={si} title={s.group} style={{ marginBottom: 12 }}>
            {s.items.map((it, i) => {
              const k = si + "-" + i, on = checked[k];
              return (
                <div key={i} onClick={() => tog(k)} style={{ display: "flex", alignItems: "center", gap: 11, padding: "8px 0", borderBottom: i < s.items.length - 1 ? "1px solid var(--line)" : "none", cursor: "pointer" }}>
                  <span style={{ width: 19, height: 19, borderRadius: 5, flexShrink: 0, display: "grid", placeItems: "center", background: on ? a : "transparent", border: on ? "none" : "1.5px solid var(--line-2)", color: "#fff" }}>{on && <Icon n="check" style={{ width: 12 }} />}</span>
                  <span style={{ fontSize: 13, color: "var(--text)" }}>{it}</span>
                </div>
              );
            })}
          </Card>
        ))}
      </div>
      <Card title="Submit orders" sub="decision-support, not auto-execute">
        <p style={{ margin: "0 0 14px", fontSize: 13, color: "var(--text-2)", lineHeight: 1.55 }}>Selected orders are staged for the attending to authorise. Each writes to the EHR as a FHIR ServiceRequest and is logged to audit with your identity.</p>
        <div style={{ fontSize: 30, fontWeight: 600, letterSpacing: "-0.03em" }}>{done}<small style={{ fontSize: 13, color: "var(--muted)" }}> / {total} orders</small></div>
        <Meter pct={(done / total) * 100} color={a} />
        <button className="btn btn-pri" style={{ width: "100%", justifyContent: "center", background: a, borderColor: a, marginTop: 14, opacity: done ? 1 : 0.5 }} disabled={!done}><Icon n="sign" /> Stage {done} order(s)</button>
      </Card>
    </div>
  );
}

// ── Patient companion (PROMs rendered for the patient) ─────────────
function CSPatient({ P, c, a }) {
  const dimWord = (v) => ["", "No problems", "Slight", "Moderate", "Severe", "Extreme"][v];
  const dimColor = (v) => v <= 1 ? "var(--ok)" : v <= 2 ? a : v <= 3 ? "var(--warn)" : "var(--bad)";
  return (
    <div>
      <div className="note" style={{ marginBottom: 14 }}>This is the view shared with the patient — plain-language, their own reported data, framed for the conversation (not the clinical detail).</div>
      <div className="grid g3" style={{ marginBottom: 14 }}>
        <Card title="Your overall health" sub="you rated">
          <div style={{ display: "grid", placeItems: "center", padding: 6 }}><window.Gauge value={P.vasTrend[P.vasTrend.length - 1]} max={100} color={a} label="OUT OF 100" size={150} /></div>
          <div className="note" style={{ textAlign: "center" }}>up from {P.vasTrend[0]} in {P.promMonths[0]}</div>
        </Card>
        <Card title="How you've been trending" sub="your last visits" className="span2">
          <window.LineChart series={[{ data: P.vasTrend, color: a }]} labels={P.promMonths} height={170} yMax={100} />
        </Card>
      </div>
      <Card title="How you're doing, day to day" sub="your own answers">
        <div className="grid g2">
          {P.eqDims.map((d, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: "1px solid var(--line)" }}>
              <span style={{ width: 10, height: 10, borderRadius: 3, background: dimColor(d.v), flexShrink: 0 }} />
              <span style={{ fontSize: 13.5, flex: 1 }}>{d.k}</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: dimColor(d.v) }}>{dimWord(d.v)}</span>
            </div>
          ))}
        </div>
        <div className="note" style={{ marginTop: 12 }}>Your care team reviews these answers at every visit. Tell them if anything here doesn't match how you feel.</div>
      </Card>
    </div>
  );
}

// ── E-signature ceremony ───────────────────────────────────────────
function ESignCeremony({ m, c, D, onClose }) {
  const [step, setStep] = React.useState(0); // 0 review, 1 attest, 2 signed
  const [pin, setPin] = React.useState("");
  const a = m.accent;
  return (
    <div className="report-scrim" onClick={(e) => { if (e.target.classList.contains("report-scrim")) onClose(); }}>
      <div style={{ width: 460, maxWidth: "100%", background: "var(--bg-elev)", border: "1px solid var(--line-2)", borderRadius: 16, boxShadow: "var(--shadow-lg)", overflow: "hidden" }}>
        <div style={{ height: 4, background: `linear-gradient(90deg, ${a}, ${m.accent2 || a})` }} />
        <div style={{ padding: 24 }}>
          {step === 0 && <>
            <h3 style={{ margin: "0 0 6px", fontSize: 18, letterSpacing: "-0.02em" }}>Sign integrated report</h3>
            <p style={{ margin: "0 0 16px", fontSize: 13, color: "var(--text-2)", lineHeight: 1.55 }}>You are about to electronically sign the {m.code} integrated report for <b style={{ color: "var(--text)" }}>{c.id}</b>. This emits to PACS/EHR and writes a signed entry to the audit log.</p>
            <div className="kv" style={{ gridTemplateColumns: "130px 1fr" }}>
              <div><div className="k">Patient</div><div className="v">{c.id} · {c.dx}</div></div>
              <div><div className="k">Confidence</div><div className="v">{c.conf.toFixed(2)}</div></div>
              <div><div className="k">Overrides</div><div className="v">{c.overrides} logged</div></div>
              <div style={{ borderBottom: "none" }}><div className="k">Authoring</div><div className="v">{D.report.authoredBy}</div></div>
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 18 }}><button className="btn" style={{ flex: 1, justifyContent: "center" }} onClick={onClose}>Cancel</button><button className="btn btn-pri" style={{ flex: 1, justifyContent: "center", background: a, borderColor: a }} onClick={() => setStep(1)}>Continue <Icon n="arrow" /></button></div>
          </>}
          {step === 1 && <>
            <h3 style={{ margin: "0 0 6px", fontSize: 18, letterSpacing: "-0.02em" }}>Attest & authenticate</h3>
            <div style={{ border: "1px solid var(--line)", borderRadius: 10, padding: 13, background: "var(--panel-2)", fontSize: 12.5, color: "var(--text-2)", lineHeight: 1.5, marginBottom: 14 }}>I attest that I have reviewed this report, that any AI recommendation overridden has a logged reason, and that this signature reflects my clinical judgement.</div>
            <label style={{ fontSize: 12.5, fontWeight: 600, display: "block", marginBottom: 6 }}>Signing PIN / passkey</label>
            <input value={pin} onChange={(e) => setPin(e.target.value)} type="password" placeholder="••••••" style={{ width: "100%", height: 42, border: "1px solid var(--line)", borderRadius: 9, padding: "0 13px", font: "inherit", fontSize: 16, letterSpacing: "0.2em", color: "var(--text)", background: "var(--panel-2)", outline: "none" }} />
            <div style={{ display: "flex", gap: 8, marginTop: 18 }}><button className="btn" style={{ flex: 1, justifyContent: "center" }} onClick={() => setStep(0)}>Back</button><button className="btn btn-pri" style={{ flex: 1, justifyContent: "center", background: a, borderColor: a, opacity: pin.length >= 4 ? 1 : 0.5 }} disabled={pin.length < 4} onClick={() => setStep(2)}><Icon n="lock" /> Sign</button></div>
          </>}
          {step === 2 && <div style={{ textAlign: "center", padding: "10px 0" }}>
            <div style={{ width: 52, height: 52, borderRadius: "50%", background: "var(--ok-bg)", display: "grid", placeItems: "center", margin: "0 auto 14px", border: "1px solid var(--ok)" }}><Icon n="check" style={{ width: 26, color: "var(--ok)" }} /></div>
            <h3 style={{ margin: "0 0 6px", fontSize: 18, letterSpacing: "-0.02em" }}>Report signed</h3>
            <p style={{ margin: "0 0 8px", fontSize: 13, color: "var(--text-2)", lineHeight: 1.55 }}>Signed by {D.report.authoredBy} · {D.report.generated}. Emitted to PACS as SR and to EHR as DiagnosticReport.</p>
            <div className="mono" style={{ fontSize: 11, color: "var(--muted)", marginBottom: 16, display: "flex", alignItems: "center", gap: 6, justifyContent: "center" }}><Icon n="lock" style={{ width: 12, color: "var(--ok)" }} /> sigstore · audit chain link written</div>
            <button className="btn btn-pri" style={{ background: a, borderColor: a }} onClick={onClose}>Done</button>
          </div>}
        </div>
      </div>
    </div>
  );
}

// ── Per-case audit ─────────────────────────────────────────────────
function CSAudit({ m, c, ops, a }) {
  const chain = [
    { k: "Inputs", v: `study ${c.mrn} · consent ${c.consent}`, h: "a3f1c9e" },
    { k: "Weights", v: `${m.code} foundation ${ops.models[0].version}`, h: ops.models[0].whash },
    { k: "Config", v: "runtime pilot.21 · equity-gate on", h: "7b2d04a" },
    { k: "Outputs", v: "integrated report · field SEG · envelope", h: "e91f6c2" },
  ];
  const log = [["signed integrated report", c.clinician, "2m ago"], ["override · margin extent", c.clinician, "14m ago"], ["bound case by SOP UID", "system", "2h ago"], ["consent policy verified", "system", "2h ago"]];
  return (
    <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", gap: 16, alignItems: "start" }}>
      <Card title="Run hash chain" sub="re-runnable · signed">
        <div className="flow">
          {chain.map((c2, i) => (<div key={i} className="flow-step done"><div className="node"><Icon n="lock" style={{ width: 13 }} /></div><div className="flow-bd"><b>{c2.k} <span className="lat">· {c2.h}</span></b><p>{c2.v}</p></div></div>))}
        </div>
      </Card>
      <Card title="Case audit log" sub="durable · ordered" flush>
        <table className="tbl"><thead><tr><th>Action</th><th>By</th><th>When</th></tr></thead>
          <tbody>{log.map((l, i) => (<tr key={i} style={{ cursor: "default" }}><td><b>{l[0]}</b></td><td>{l[1]}</td><td className="num muted">{l[2]}</td></tr>))}</tbody>
        </table>
      </Card>
    </div>
  );
}
