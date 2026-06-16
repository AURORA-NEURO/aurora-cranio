window.AV = window.AV || {};

window.AV.analytics = function Analytics({ m, ops, go }) {
  const a = m.accent;
  const an = React.useMemo(() => window.OPS_ANALYTICS(m.slug), [m.slug]);
  const [tab, setTab] = React.useState("cohort");

  return (
    <div className="view">
      <ViewHead
        eyebrow={<>{m.code} · analytics</>}
        title={<>Cohort <em className="s">intelligence</em></>}
        sub="Survival, pathway conversion, patient-reported trajectories, drift and head-to-head model evaluation — across the whole cohort and the fleet."
        actions={<><button className="btn btn-sm"><Icon n="download" /> Export</button><button className="btn btn-sm"><Icon n="filter" /> Cohort filter</button></>}
      />

      <Tabs underline value={tab} onChange={setTab} items={[
        { k: "cohort", label: "Cohort" }, { k: "outcomes", label: "Outcomes & PROMs" },
        { k: "benchmark", label: "Benchmarks" }, { k: "eval", label: "Model evaluation" },
      ]} />

      {tab === "cohort" && <AnCohort {...{ an, a, m, ops }} />}
      {tab === "outcomes" && <AnOutcomes {...{ an, a, m }} />}
      {tab === "benchmark" && <AnBenchmark {...{ a, m, go }} />}
      {tab === "eval" && <AnEval {...{ an, a, m }} />}
    </div>
  );
};

function AnCohort({ an, a, m, ops }) {
  return (
    <>
      <div className="grid g4" style={{ marginBottom: 14 }}>
        <Kpi edge label="Cohort size" icon="users" value={ops.kpis.cohortSize.toLocaleString()} foot="consented" />
        <Kpi label="Median OS" value="18.4" unit="mo" delta="+2.1" dir="up" foot="favourable stratum" />
        <Kpi label="Pathway conversion" value="49" unit="%" foot="referred → signed" />
        <Kpi label="Trial enrolment" value="21" unit="%" delta="+12" dir="up" foot="of eligible" />
      </div>
      <div className="grid g2" style={{ alignItems: "start", marginBottom: 14 }}>
        <Card title="Overall survival" sub="Kaplan–Meier · by molecular stratum">
          <KMCurve curves={an.km} />
          <div style={{ marginTop: 10 }}><Legend cols={3} items={an.km.map((c) => ({ l: c.label, color: c.color }))} /></div>
        </Card>
        <Card title="Care pathway funnel" sub="cohort conversion">
          <div style={{ padding: "8px 0" }}><Funnel stages={an.funnel} color={a} /></div>
        </Card>
      </div>
      <div className="grid g3" style={{ alignItems: "start" }}>
        <Card title="Diagnosis mix" sub="cohort">
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <Donut segments={an.dxDist} center={{ v: an.dxDist.reduce((s, x) => s + x.v, 0), l: "cases" }} />
            <div style={{ flex: 1 }}><Legend items={an.dxDist.map((d) => ({ l: d.l, v: d.v, color: d.color }))} /></div>
          </div>
        </Card>
        <Card title="Monthly enrolment" sub="12 months" className="span2">
          <LineChart series={[{ data: an.enrol, color: a }]} labels={an.months} height={200} />
        </Card>
      </div>
    </>
  );
}

function AnOutcomes({ an, a, m }) {
  return (
    <>
      <div className="grid g2" style={{ alignItems: "start", marginBottom: 14 }}>
        <Card title="EQ-5D index trajectory" sub="cohort mean vs peer band">
          <LineChart series={[{ data: an.promCohort, color: a }, { data: an.promPeer, color: "var(--muted-2)" }]} labels={an.months} height={210} yMax={1} fmtPct />
          <div style={{ marginTop: 8 }}><Legend cols={2} items={[{ l: "This cohort", color: a }, { l: "Peer / normal band", color: "var(--muted-2)" }]} /></div>
        </Card>
        <Card title="Treatment response" sub="distribution">
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <Donut segments={an.outcomes} center={{ v: an.outcomes.reduce((s, x) => s + x.v, 0) + "%", l: "n" }} />
            <div style={{ flex: 1 }}><Legend items={an.outcomes.map((o) => ({ l: o.l, v: o.v + "%", color: o.color }))} /></div>
          </div>
        </Card>
      </div>
      <Card title="Model drift" sub="distribution shift per subsystem · 12 months">
        <LineChart series={an.drift} labels={an.months} height={200} yMax={0.18} area={false} yfmt={(t) => t.toFixed(2) + "σ"} />
        <div style={{ marginTop: 8 }}><Legend cols={3} items={an.drift.map((d) => ({ l: d.label, color: d.color }))} /></div>
        <div className="note warn-note" style={{ marginTop: 10 }}>Drift beyond 0.10σ triggers an automatic re-evaluation against the held-out cohort.</div>
      </Card>
    </>
  );
}

function AnBenchmark({ a, m, go }) {
  const bench = React.useMemo(() => window.OPS_BENCHMARK(), []);
  const cur = bench.find((b) => b.module === m.code.replace("AURORA-", ""));
  const metrics = [
    ["resection", "Resection / closure quality", "%"], ["accuracy", "Diagnostic accuracy", "%"],
    ["equity", "Equity coverage", "%"], ["enrol", "Trial enrolment", "%"],
  ];
  return (
    <>
      <div className="note" style={{ marginBottom: 14 }}>Open benchmarks beat closed leaderboards — every module evaluated on the same axes, every result reproducible.</div>
      <div className="grid g2" style={{ alignItems: "start", marginBottom: 14 }}>
        <Card title="This module vs fleet" sub={m.code}>
          <Radar axes={["Resection", "Accuracy", "Equity", "Enrol", "Speed"]} series={[
            { color: a, vals: [cur.resection / 100, cur.accuracy / 100, cur.equity / 100, cur.enrol / 30, (90 - cur.ttd) / 90] },
            { color: "var(--muted-2)", vals: [0.85, 0.9, 0.9, 0.6, 0.55] },
          ]} />
          <div style={{ marginTop: 6 }}><Legend cols={2} items={[{ l: m.name, color: a }, { l: "Fleet median", color: "var(--muted-2)" }]} /></div>
        </Card>
        <Card title="Diagnostic accuracy" sub="all modules">
          <HBars color={a} rows={bench.map((b) => ({ l: b.name, v: b.accuracy, color: b.module === cur.module ? a : "var(--line-2)" }))} unit="%" />
        </Card>
      </div>
      <Card title="Cross-module benchmark" sub="reproducible · same axes" flush>
        <table className="tbl">
          <thead><tr><th>Module</th><th className="rt">Resection/closure</th><th className="rt">Time-to-dx</th><th className="rt">Accuracy</th><th className="rt">Enrolment</th><th className="rt">Override audit</th><th className="rt">Equity</th></tr></thead>
          <tbody>
            {bench.map((b, i) => (
              <tr key={i} onClick={() => go("models")} style={{ background: b.module === cur.module ? "var(--panel-2)" : undefined }}>
                <td><span className="tag-dot" style={{ background: b.accent, marginRight: 7 }} /><b>{b.name}</b></td>
                <td className="rt num">{b.resection}%</td><td className="rt num">−{b.ttd}%</td>
                <td className="rt num">{b.accuracy}%</td><td className="rt num">+{b.enrol}%</td>
                <td className="rt num">{b.overrideAudit}%</td>
                <td className="rt num" style={{ color: b.equity === 100 ? "var(--ok)" : "var(--warn)" }}>{b.equity}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </>
  );
}

function AnEval({ an, a, m }) {
  const [sel, setSel] = React.useState(an.evalModels[0].code);
  const mdl = an.evalModels.find((x) => x.code === sel) || an.evalModels[0];
  return (
    <>
      <div style={{ display: "flex", gap: 6, marginBottom: 14, flexWrap: "wrap" }}>
        {an.evalModels.map((x) => (
          <button key={x.code} className={`utab ${sel === x.code ? "active" : ""}`} style={{ padding: "6px 11px", fontSize: 12 }} onClick={() => setSel(x.code)}>{x.code}</button>
        ))}
      </div>
      <div className="grid g4" style={{ marginBottom: 14 }}>
        <Kpi edge label="AUC" value={mdl.auc} foot="held-out" />
        <Kpi label="Eval score" value={mdl.eval} foot="composite" />
        <Kpi label="Calibration (ECE)" value={mdl.ece} foot="lower is better" />
        <Kpi label="Strata passing" value={`${mdl.strata.filter((s) => s.v >= 78).length}/${mdl.strata.length}`} foot="equity" />
      </div>
      <div className="grid g3" style={{ alignItems: "start", marginBottom: 14 }}>
        <Card title="ROC curve" sub={mdl.code}><div style={{ display: "grid", placeItems: "center" }}><ROC points={mdl.roc} auc={mdl.auc} color={a} /></div></Card>
        <Card title="Calibration" sub="predicted vs observed"><div style={{ display: "grid", placeItems: "center" }}><Calibration points={mdl.calib} color={a} /></div></Card>
        <Card title="Confusion matrix" sub="held-out test"><div style={{ padding: "8px 4px" }}><Confusion matrix={mdl.confusion} labels={an.confLabels} color={a} /></div></Card>
      </div>
      <div className="grid g2" style={{ alignItems: "start" }}>
        <Card title="Per-stratum performance" sub="equity-as-loss"><HBars color={a} rows={mdl.strata} unit="%" /></Card>
        <Card title="Version history" sub="AUC over releases">
          <LineChart series={[{ data: mdl.versions.map((v) => v.auc), color: a }]} labels={mdl.versions.map((v) => v.v.replace("2026.", ""))} height={180} yMin={Math.min(...mdl.versions.map((v) => v.auc)) - 0.02} yMax={1} fmtPct />
          <div className="note" style={{ marginTop: 8 }}>Every version pinned, signed and re-runnable · rollback available from the release channel.</div>
        </Card>
      </div>
    </>
  );
}
