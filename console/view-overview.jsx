// ════════════════════════════════════════════════════════════════════
//  VIEW · OVERVIEW — per-module command center
// ════════════════════════════════════════════════════════════════════
window.AV = window.AV || {};

window.AV.overview = function Overview({ m, ops, go }) {
  const a = m.accent;
  const k = ops.kpis;
  const liveSubs = m.subsystems.filter((s) => s.status === "live").length;

  const ACT_IC = { sign: "sign", override: "override", model: "model", sync: "sync", equity: "equity", case: "cases" };

  return (
    <div className="view">
      <ViewHead
        eyebrow={<>{m.code} · operations</>}
        title={<>{m.name} <em className="s">command center</em></>}
        sub={m.tagline}
        actions={<>
          <button className="btn btn-sm"><Icon n="download" /> Export</button>
          <button className="btn btn-pri btn-sm" onClick={() => go("clinical")}><Icon n="pulse" /> Open clinical surface</button>
        </>}
      />

      {/* status banner */}
      <div className="card" style={{ marginBottom: 14, borderLeft: `3px solid ${a}` }}>
        <div className="card-b" style={{ display: "flex", gap: 22, alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span className="swatch" style={{ width: 38, height: 38, borderRadius: 10, background: a, display: "grid", placeItems: "center", color: "#fff", fontFamily: "var(--mono)", fontWeight: 600 }}>{m.idx}</span>
            <div>
              <div style={{ fontWeight: 600, fontSize: 15, letterSpacing: "-0.01em", display: "flex", alignItems: "center", gap: 8 }}>{m.code} <Pill s={m.status} /></div>
              <div className="mono" style={{ fontSize: 11, color: "var(--muted)" }}>{m.latin} · {m.stats.scope}</div>
            </div>
          </div>
          <div style={{ marginLeft: "auto", display: "flex", gap: 26, flexWrap: "wrap" }}>
            <div><div className="mono" style={{ fontSize: 10, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--muted)" }}>Readiness</div><div style={{ fontSize: 13, fontWeight: 500, marginTop: 3 }}>{m.stats.readiness}</div></div>
            <div><div className="mono" style={{ fontSize: 10, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--muted)" }}>Pilots</div><div style={{ fontSize: 13, fontWeight: 500, marginTop: 3 }}>{m.stats.pilots}</div></div>
          </div>
        </div>
      </div>

      {/* KPI row */}
      <div className="grid g6" style={{ marginBottom: 14 }}>
        <Kpi edge label="Active cases" icon="cases" value={k.activeCases} delta="+6" dir="up" foot="this week" />
        <Kpi label="Cohort" icon="users" value={k.cohortSize.toLocaleString()} foot="consented" />
        <Kpi label="Subsystems" icon="grid" value={liveSubs} unit={`/ ${m.subsystems.length}`} foot="live" />
        <Kpi label="Median latency" icon="pulse" value={k.latencyMs} unit="ms" delta="-4" dir="up" foot="per case" />
        <Kpi label="Uptime" icon="monitor" value={k.uptime} unit="%" foot="30-day" />
        <Kpi label="Equity gates" icon="equity" value={ops.equityPass} unit={`/ ${ops.equityTotal}`} foot="passing" />
      </div>

      {/* main grid */}
      <div className="grid g3" style={{ alignItems: "start" }}>
        {/* left 2/3 */}
        <div className="span2 grid" style={{ gap: 14 }}>
          <Card title="Subsystem health" sub={`${m.subsystems.length} subsystems`} right={<button className="btn btn-ghost btn-sm" onClick={() => go("subsystems")}>View all <Icon n="arrow" /></button>}>
            <div className="grid g2">
              {m.subsystems.map((s, i) => {
                const pct = ops.models[i] ? Math.round(ops.models[i].eval * 100) : 80;
                return (
                  <div key={s.id} style={{ padding: "11px 13px", border: "1px solid var(--line)", borderRadius: 10, cursor: "pointer" }} onClick={() => go("subsystems")}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 7 }}>
                      <span className="tag-dot" style={{ background: a }} />
                      <code style={{ fontSize: 10.5, color: "var(--muted)" }}>{s.code}</code>
                      <span style={{ marginLeft: "auto" }}><Pill s={s.status} /></span>
                    </div>
                    <div style={{ fontWeight: 600, fontSize: 13, letterSpacing: "-0.01em", marginBottom: 8 }}>{s.name}</div>
                    <Meter pct={pct} color={a} />
                  </div>
                );
              })}
            </div>
          </Card>

          <div className="grid g2">
            <Card title="Case throughput" sub="30 days">
              <div style={{ fontSize: 28, fontWeight: 600, letterSpacing: "-0.03em" }}>{k.activeCases}<small style={{ fontSize: 13, color: "var(--muted)", fontWeight: 400, marginLeft: 6 }}>active</small></div>
              <div style={{ margin: "10px 0 0" }}><Spark data={ops.throughput} color={a} /></div>
            </Card>
            <Card title="Latency trend" sub="ms / case">
              <div style={{ fontSize: 28, fontWeight: 600, letterSpacing: "-0.03em" }}>{k.latencyMs}<small style={{ fontSize: 13, color: "var(--muted)", fontWeight: 400, marginLeft: 6 }}>ms p50</small></div>
              <div style={{ margin: "10px 0 0" }}><Spark data={ops.latencyTrend} color={a} kind="bars" /></div>
            </Card>
          </div>

          <Card title="Federation" sub={`${ops.deployments.length} nodes`} right={<button className="btn btn-ghost btn-sm" onClick={() => go("admin")}>Manage <Icon n="arrow" /></button>} flush>
            <table className="tbl">
              <thead><tr><th>Site</th><th>Mode</th><th>Version</th><th className="rt">Cases</th><th>Sync</th><th>Status</th></tr></thead>
              <tbody>
                {ops.deployments.slice(0, 5).map((d, i) => (
                  <tr key={i}>
                    <td><b>{d.site}</b></td>
                    <td><code>{d.mode}</code></td>
                    <td className="num">{d.version}</td>
                    <td className="rt num">{d.cases.toLocaleString()}</td>
                    <td className="num muted">{d.lastSync} ago</td>
                    <td><Pill s={d.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>

        {/* right 1/3 */}
        <div className="grid" style={{ gap: 14 }}>
          <Card title="Equity gate" sub="release blocker" right={<span className="note">{ops.equityPass}/{ops.equityTotal} pass</span>}>
            {ops.strata.slice(0, 6).map((s, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 0" }}>
                <span style={{ fontSize: 12, color: "var(--text-2)", flex: 1 }}>{s.k}</span>
                <span className="num" style={{ fontSize: 12, fontWeight: 600 }}>{s.v.toFixed(2)}</span>
                <Pill s={s.pass ? "pass" : "fail"}>{s.pass ? "pass" : "block"}</Pill>
              </div>
            ))}
            <div className="note warn-note" style={{ marginTop: 10 }}>Releases below threshold are blocked, not warned.</div>
          </Card>

          <Card title="Activity" sub="live" right={<span className="chip"><span className="d" />live</span>}>
            <div className="feed">
              {ops.activity.map((ev, i) => (
                <div className="feed-item" key={i}>
                  <div className="feed-ic"><Icon n={ACT_IC[ev.icon] || "pulse"} /></div>
                  <div>
                    <div className="feed-tx"><b>{ev.who}</b> {ev.t}</div>
                    <div className="feed-when">{ev.when}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
