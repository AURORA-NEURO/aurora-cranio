window.AV = window.AV || {};

window.AV.research = function Research({ m, ops }) {
  const a = m.accent;
  const [tab, setTab] = React.useState("papers");
  const evidence = (window.AURORA_DATA.evidence && window.AURORA_DATA.evidence[m.slug]) || [];

  const KIND = ["Working paper", "Preprint", "Protocol RFC", "Position paper", "Concept note"];
  const STAT = ["Drafting", "In review", "Ratified", "Drafting", "Sketch"];
  const papers = m.subsystems.map((s, i) => ({
    id: `WP-${String(i + 1).padStart(2, "0")}`,
    code: s.code, name: s.name, kind: KIND[i % KIND.length], status: STAT[i % STAT.length],
  }));

  const endpoints = [
    ["+18.4", "%", "Resection / closure quality", "Target lift on partner cohorts vs pre-AURORA baseline."],
    ["−40", "%", "Time to integrated diagnosis", "From sample arrival to guideline-aligned report, board-ready."],
    ["94.2", "%", "Quantitative field accuracy", "Validated against histology / longitudinal ground truth."],
    ["0.91", "AUC", "Progression vs treatment-effect", "Distinguishing true change from artefact on follow-up."],
    ["+12", "%", "Trial enrolment", "Eligible patients matched earlier in the pathway."],
    ["100", "%", "Auditable override rate", "Every override carries a logged reason + explanation chain."],
  ];

  return (
    <div className="view">
      <ViewHead
        eyebrow={<>{m.code} · research</>}
        title={<>Our <em className="s">own</em> writing & the evidence floor</>}
        sub="Working papers document one slice of the substrate each. The evidence base is the landmark literature the module is built on — the floor, not in dispute."
        actions={<button className="btn btn-pri btn-sm"><Icon n="plus" /> New draft</button>}
      />

      <Tabs underline value={tab} onChange={setTab} items={[
        { k: "papers", label: `Working papers · ${papers.length}` },
        { k: "evidence", label: `Evidence base · ${evidence.length}` },
        { k: "endpoints", label: "Endpoints" },
      ]} />

      {tab === "papers" && (
        <Card flush>
          <table className="tbl">
            <thead><tr><th>ID</th><th>Title</th><th>Subsystem</th><th>Kind</th><th>Status</th><th></th></tr></thead>
            <tbody>
              {papers.map((p) => (
                <tr key={p.id}>
                  <td><code className="strong">{p.id}</code></td>
                  <td><b>{p.name}</b><div style={{ fontSize: 11.5, color: "var(--muted)" }}>Module team · {p.code}</div></td>
                  <td><code>{p.code}</code></td>
                  <td>{p.kind}</td>
                  <td><span className={`pill ${p.status === "Ratified" ? "pass" : p.status === "In review" ? "beta" : "soon"}`}><span className="d" />{p.status}</span></td>
                  <td><Icon n="external" style={{ width: 14, color: "var(--muted-2)" }} /></td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="card-b"><div className="note warn-note">⚠ Drafts · DOI-stamped at public alpha · no external "evidence library" shipped here.</div></div>
        </Card>
      )}

      {tab === "evidence" && (
        <div className="grid" style={{ gap: 10 }}>
          {evidence.length === 0 && <div className="note">No evidence rows for this module yet — add to <code style={{ fontFamily: "var(--mono)" }}>AURORA_DATA.evidence.{m.slug}</code>.</div>}
          {evidence.map((e, i) => (
            <div key={i} className="card" style={{ padding: "14px 16px", display: "flex", gap: 16, alignItems: "flex-start" }}>
              <div className="mono" style={{ fontSize: 12, color: "var(--muted)", width: 44, flexShrink: 0 }}>{e.year}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 13.5, letterSpacing: "-0.01em", lineHeight: 1.4 }}>{e.title}</div>
                <div style={{ fontSize: 12, color: "var(--text-2)", marginTop: 3 }}>{e.authors}</div>
                <div className="mono" style={{ fontSize: 11, color: "var(--muted)", marginTop: 4 }}><em style={{ fontFamily: "var(--serif)", fontStyle: "italic" }}>{e.venue}</em> · {e.vol} · doi:{e.doi}</div>
              </div>
              <span className="chip" style={{ flexShrink: 0 }}>{e.tag}</span>
            </div>
          ))}
        </div>
      )}

      {tab === "endpoints" && (
        <>
          <div className="grid g3">
            {endpoints.map((o, i) => (
              <div key={i} className="card" style={{ padding: 18 }}>
                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
                  <div style={{ fontSize: 30, fontWeight: 600, letterSpacing: "-0.03em" }}>{o[0]}<small style={{ fontSize: 14, color: "var(--muted)", marginLeft: 3 }}>{o[1]}</small></div>
                  <span className="pill" style={{ color: a, borderColor: a + "66" }}>target</span>
                </div>
                <div style={{ fontWeight: 600, fontSize: 14, margin: "12px 0 5px", letterSpacing: "-0.01em" }}>{o[2]}</div>
                <p style={{ margin: 0, fontSize: 12.5, color: "var(--text-2)", lineHeight: 1.5 }}>{o[3]}</p>
              </div>
            ))}
          </div>
          <div className="note warn-note" style={{ marginTop: 16 }}>⚠ Pilot targets · not retrospective results · validated at public alpha.</div>
        </>
      )}
    </div>
  );
};
