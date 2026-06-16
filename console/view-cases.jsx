window.AV = window.AV || {};

window.AV.cases = function Cases({ m, ops, openCase }) {
  const a = m.accent;
  const [q, setQ] = React.useState("");
  const [tab, setTab] = React.useState("all");
  const STAGE_GROUPS = { all: () => true, active: (c) => c.stageIdx < 7, signed: (c) => c.stageIdx >= 7, flagged: (c) => c.flagged };
  const rows = ops.cases.filter((c) => STAGE_GROUPS[tab](c)).filter((c) =>
    !q || (c.id + c.mrn + c.dx + c.clinician).toLowerCase().includes(q.toLowerCase()));

  const counts = {
    intake: ops.cases.filter((c) => c.stageIdx <= 2).length,
    mdt: ops.cases.filter((c) => c.stageIdx >= 3 && c.stageIdx <= 5).length,
    signoff: ops.cases.filter((c) => c.stageIdx === 6).length,
    monitoring: ops.cases.filter((c) => c.stageIdx >= 7).length,
  };

  return (
    <div className="view">
      <ViewHead
        eyebrow={<>{m.code} · cases</>}
        title={<>Case <em className="s">queue</em></>}
        sub={`Every ${m.name.toLowerCase()} case bound to the substrate at pilot sites. Consent-gated; AURORA refuses to render on records without a cohort policy.`}
        actions={<><button className="btn btn-sm"><Icon n="filter" /> Filters</button><button className="btn btn-pri btn-sm"><Icon n="plus" /> Bind case</button></>}
      />

      <div className="grid g4" style={{ marginBottom: 16 }}>
        <Kpi edge label="Intake / imaging" value={counts.intake} foot="awaiting review" />
        <Kpi label="MDT pipeline" value={counts.mdt} foot="scheduled → review" />
        <Kpi label="Awaiting sign-off" value={counts.signoff} foot="ready" />
        <Kpi label="Signed · monitoring" value={counts.monitoring} foot="longitudinal" />
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14, flexWrap: "wrap" }}>
        <Tabs items={[{ k: "all", label: "All" }, { k: "active", label: "Active" }, { k: "signed", label: "Signed" }, { k: "flagged", label: "Flagged" }]} value={tab} onChange={setTab} />
        <div className="tb-search" style={{ margin: 0, width: 260 }}>
          <Icon n="search" /><input placeholder="Search cases, MRN, clinician…" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        <span className="note" style={{ marginLeft: "auto" }}>{rows.length} of {ops.cases.length} cases</span>
      </div>

      <Card flush>
        <div style={{ maxHeight: "62vh", overflowY: "auto" }}>
          <table className="tbl">
            <thead><tr>
              <th>Case</th><th>Dx</th><th>Age</th><th>Site</th><th>Stage</th><th>Clinician</th><th>Consent</th><th className="rt">Conf</th><th className="rt">Overrides</th><th>Updated</th><th></th>
            </tr></thead>
            <tbody>
              {rows.map((c) => (
                <tr key={c.id} onClick={() => openCase(c)}>
                  <td><b>{c.id}</b><div className="mono" style={{ fontSize: 10.5, color: "var(--muted)" }}>{c.mrn}</div></td>
                  <td>{c.dx}{c.flagged && <span className="pill flagged" style={{ marginLeft: 6 }}><span className="d" />flag</span>}</td>
                  <td className="num">{c.age}</td>
                  <td><code>{c.site}</code></td>
                  <td>{c.priority !== "routine" ? <span className={`pill ${c.priority}`}><span className="d" />{c.stage}</span> : <span style={{ color: "var(--text-2)" }}>{c.stage}</span>}</td>
                  <td><div style={{ display: "flex", alignItems: "center", gap: 7 }}><Avatar name={c.clinician} />{c.clinician}</div></td>
                  <td><code style={{ color: c.consent === "pending" ? "var(--warn)" : "var(--text-2)" }}>{c.consent}</code></td>
                  <td className="rt num">{c.conf.toFixed(2)}</td>
                  <td className="rt num">{c.overrides || "—"}</td>
                  <td className="num muted">{c.updated}</td>
                  <td><Icon n="chev" style={{ width: 15, color: "var(--muted-2)" }} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
