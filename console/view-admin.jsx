// ════════════════════════════════════════════════════════════════════
//  VIEW · ADMIN — deep fleet-ops console
//  A console-within-the-console: 12 sub-sections let an admin drill into
//  anything — fleet, federation, releases, models, users/RBAC, security,
//  data/consent, equity governance, monitoring, audit log, billing, config.
// ════════════════════════════════════════════════════════════════════
window.AV = window.AV || {};

const ADMIN_SECTIONS = [
  { k: "fleet", label: "Module fleet", ic: "grid" },
  { k: "hospitals", label: "Hospitals", ic: "shield" },
  { k: "federation", label: "Federation", ic: "fed" },
  { k: "releases", label: "Releases & rollout", ic: "model" },
  { k: "users", label: "Users & RBAC", ic: "users" },
  { k: "security", label: "Security & keys", ic: "lock" },
  { k: "data", label: "Data & consent", ic: "shield" },
  { k: "equity", label: "Equity governance", ic: "equity" },
  { k: "approvals", label: "Approvals & gates", ic: "check" },
  { k: "monitoring", label: "Monitoring & SRE", ic: "monitor" },
  { k: "slo", label: "SLOs & error budgets", ic: "pulse" },
  { k: "cost", label: "Cost & capacity", ic: "cases" },
  { k: "notifications", label: "Notifications", ic: "bell" },
  { k: "audit", label: "Audit log", ic: "audit" },
  { k: "billing", label: "Usage & license", ic: "download" },
  { k: "config", label: "Config & flags", ic: "cpu" },
  { k: "rfc", label: "Governance / RFCs", ic: "book" },
];

window.AV.admin = function Admin({ m, ops, go, setModule }) {
  const fleet = window.OPS_FLEET();
  const A = window.OPS_ADMIN();
  const [sec, setSec] = React.useState("fleet");

  return (
    <div className="view">
      <ViewHead
        eyebrow={<>AURORA · operations</>}
        title={<>Fleet <em className="s">admin</em> console</>}
        sub="Drill into anything: every module, node, release, key, dataset, gate, incident and audit event across the federation."
        actions={<><button className="btn btn-sm"><Icon n="download" /> Export</button><button className="btn btn-pri btn-sm"><Icon n="plus" /> Onboard site</button></>}
      />

      <div className="grid g6" style={{ marginBottom: 16 }}>
        <Kpi edge label="Modules" icon="grid" value={fleet.mods.length} foot="in pilot" />
        <Kpi label="Subsystems" icon="cpu" value={fleet.totalSubsystems} foot="across fleet" />
        <Kpi label="Active cases" icon="cases" value={fleet.totalCases} foot="now" />
        <Kpi label="Cohort" icon="users" value={(fleet.totalCohort / 1000).toFixed(1)} unit="k" foot="consented" />
        <Kpi label="Nodes" icon="fed" value={fleet.totalDeploys} foot="federated" />
        <Kpi label="Open incidents" icon="bell" value={A.incidents.filter((i) => i.status !== "resolved" && i.status !== "planned").length} foot="needs attention" />
      </div>

      <div className="grid" style={{ gridTemplateColumns: "210px 1fr", gap: 16, alignItems: "start" }}>
        {/* sub-nav */}
        <div className="card" style={{ padding: 8, position: "sticky", top: 0 }}>
          {ADMIN_SECTIONS.map((s) => (
            <a key={s.k} onClick={() => setSec(s.k)} className={`sb-link ${sec === s.k ? "active" : ""}`}
              style={{ color: sec === s.k ? "var(--text)" : "var(--text-2)", background: sec === s.k ? "var(--panel-2)" : "transparent", fontSize: 12.5 }}>
              <Icon n={s.ic} /> <span>{s.label}</span>
            </a>
          ))}
        </div>

        {/* section body */}
        <div>
          {sec === "fleet" && <AdFleet {...{ fleet, go, setModule }} />}
          {sec === "hospitals" && <AdHospitals {...{ go }} />}
          {sec === "federation" && <AdFederation {...{ m, ops, A }} />}
          {sec === "releases" && <AdReleases {...{ A }} />}
          {sec === "users" && <AdUsers {...{ ops }} />}
          {sec === "security" && <AdSecurity {...{ A }} />}
          {sec === "data" && <AdData {...{ A }} />}
          {sec === "equity" && <AdEquity {...{ fleet }} />}
          {sec === "approvals" && <AdApprovals {...{ A }} />}
          {sec === "monitoring" && <AdMonitoring {...{ A, ops, m }} />}
          {sec === "slo" && <AdSlo {...{ A }} />}
          {sec === "cost" && <AdCost {...{ A, m }} />}
          {sec === "notifications" && <AdNotifications {...{ A }} />}
          {sec === "audit" && <AdAudit {...{ A }} />}
          {sec === "billing" && <AdBilling {...{ A }} />}
          {sec === "config" && <AdConfig {...{ A }} />}
          {sec === "rfc" && <AdRfc {...{ A }} />}
        </div>
      </div>
    </div>
  );
};

const Sec = ({ title, sub, children, right }) => (
  <div style={{ marginBottom: 18 }}>
    <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 12 }}>
      <div><h2 style={{ margin: 0, fontSize: 18, letterSpacing: "-0.02em", fontWeight: 600 }}>{title}</h2>{sub && <div className="note" style={{ marginTop: 4 }}>{sub}</div>}</div>
      {right}
    </div>
    {children}
  </div>
);

// ── Fleet ──────────────────────────────────────────────────────────
function AdFleet({ fleet, go, setModule }) {
  return (
    <Sec title="Module fleet" sub="Every disease module — click to enter its console">
      <div className="grid g3">
        {fleet.mods.map((f) => (
          <div key={f.m.slug} className="fleet-card" onClick={() => { setModule(f.m.slug); go("overview"); }} style={{ cursor: "pointer" }}>
            <div className="edge" style={{ background: f.m.accent }} />
            <div className="fleet-top">
              <span className="swatch" style={{ background: f.m.accent }}>{f.m.idx}</span>
              <div style={{ flex: 1 }}><h4>{f.m.name}</h4><code>{f.m.code}</code></div>
              <Pill s={f.m.status} />
            </div>
            <div className="fleet-mini">
              <div><div className="n">{f.live}/{f.subsystems}</div><div className="t">live subs</div></div>
              <div><div className="n">{f.activeCases}</div><div className="t">cases</div></div>
              <div><div className="n">{f.synced}/{f.deployments}</div><div className="t">synced</div></div>
              <div><div className="n" style={{ color: f.equityPass === f.equityTotal ? "var(--ok)" : "var(--warn)" }}>{f.equityPass}/{f.equityTotal}</div><div className="t">equity</div></div>
            </div>
          </div>
        ))}
      </div>
    </Sec>
  );
}

// ── Federation ─────────────────────────────────────────────────────
function AdFederation({ m, ops, A }) {
  const [node, setNode] = React.useState(ops.deployments[0]);
  return (
    <Sec title="Federation" sub={`${m.code} · ${ops.deployments.length} nodes · compute travels to data, never the reverse`}>
      <div className="grid" style={{ gridTemplateColumns: "1.5fr 1fr", gap: 16, alignItems: "start" }}>
        <Card flush>
          <table className="tbl">
            <thead><tr><th>Site</th><th>Mode</th><th>GPU</th><th className="rt">Cases</th><th>Sync</th><th>Status</th></tr></thead>
            <tbody>
              {ops.deployments.map((d, i) => (
                <tr key={i} onClick={() => setNode(d)} style={{ background: node === d ? "var(--panel-2)" : undefined }}>
                  <td><b>{d.site}</b><div className="mono" style={{ fontSize: 10, color: "var(--muted)" }}>{d.node}</div></td>
                  <td><code>{d.mode}</code></td>
                  <td className="num muted">{d.gpu}</td>
                  <td className="rt num">{d.cases.toLocaleString()}</td>
                  <td className="num muted">{d.lastSync} ago</td>
                  <td><Pill s={d.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
        <Card title={node.tag + " · node detail"} sub={node.status}>
          <div className="kv" style={{ gridTemplateColumns: "120px 1fr" }}>
            <div><div className="k">Site</div><div className="v">{node.site}</div></div>
            <div><div className="k">Endpoint</div><div className="v mono" style={{ fontSize: 11.5 }}>{node.node}</div></div>
            <div><div className="k">Mode</div><div className="v">{node.mode} · outbound mTLS</div></div>
            <div><div className="k">GPU</div><div className="v">{node.gpu}</div></div>
            <div><div className="k">Version</div><div className="v">{node.version}</div></div>
            <div><div className="k">Bound cases</div><div className="v">{node.cases.toLocaleString()}</div></div>
            <div style={{ borderBottom: "none" }}><div className="k">Last sync</div><div className="v">{node.lastSync} ago · signed pull</div></div>
          </div>
          <div style={{ marginTop: 12 }}><div className="note" style={{ marginBottom: 6 }}>Sync history (7d)</div><Spark data={ops.throughput.slice(0, 14)} color={m.accent} kind="bars" /></div>
          <div style={{ display: "flex", gap: 8, marginTop: 12 }}><button className="btn btn-sm"><Icon n="sync" /> Force sync</button><button className="btn btn-sm"><Icon n="external" /> Logs</button></div>
        </Card>
      </div>
    </Sec>
  );
}

// ── Releases & rollout ─────────────────────────────────────────────
function AdReleases({ A }) {
  const [ch, setCh] = React.useState("all");
  const channels = ["all", "dev", "staging", "pilot", "public-alpha"];
  const rows = A.releases.filter((r) => ch === "all" || r.channel === ch);
  return (
    <Sec title="Releases & rollout" sub="Signed, pinned, gated — every weight versioned and re-runnable"
      right={<Tabs value={ch} onChange={setCh} items={channels.map((c) => ({ k: c, label: c }))} />}>
      <Card flush>
        <table className="tbl">
          <thead><tr><th>Module</th><th>Model</th><th>Version</th><th>Params</th><th>Channel</th><th className="rt">Eval</th><th>Gate</th><th>Signed</th><th>Promoted</th><th></th></tr></thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i}>
                <td><span className="tag-dot" style={{ background: r.accent, marginRight: 7 }} /><b>{r.module}</b></td>
                <td><code className="strong">{r.code}</code></td>
                <td className="num">{r.version}</td>
                <td className="num muted">{r.params}</td>
                <td><span className={`pill ${r.channel === "public-alpha" ? "pass" : r.channel === "pilot" ? "beta" : "soon"}`}><span className="d" />{r.channel}</span></td>
                <td className="rt num">{r.eval}</td>
                <td>{r.gate === "pass" ? <Pill s="pass" /> : <Pill s="warn">review</Pill>}</td>
                <td>{r.signed ? <Icon n="lock" style={{ width: 14, color: "var(--ok)" }} /> : <span className="pill warn"><span className="d" />no</span>}</td>
                <td className="num muted">{r.promotedBy} · {r.when}</td>
                <td><button className="btn btn-sm btn-ghost">Promote <Icon n="arrow" /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </Sec>
  );
}

// ── Users & RBAC ───────────────────────────────────────────────────
function AdUsers({ ops }) {
  const PERMS = ["View cases", "Sign reports", "Override", "Promote models", "Manage sites", "Edit config"];
  const ROLE_PERMS = {
    "Neurosurgeon": [1, 1, 1, 0, 0, 0], "Radiologist": [1, 1, 1, 0, 0, 0], "Researcher": [1, 0, 0, 1, 0, 0],
    "Module maintainer": [1, 0, 1, 1, 0, 1], "Site admin": [1, 0, 0, 0, 1, 1], "Trial coordinator": [1, 0, 0, 0, 0, 0],
  };
  return (
    <>
      <Sec title="Permission matrix" sub="RBAC · role → capability">
        <Card flush>
          <table className="tbl">
            <thead><tr><th>Role</th>{PERMS.map((p) => <th key={p} className="rt">{p}</th>)}</tr></thead>
            <tbody>
              {Object.entries(ROLE_PERMS).map(([role, perms]) => (
                <tr key={role} style={{ cursor: "default" }}>
                  <td><b>{role}</b></td>
                  {perms.map((v, i) => <td key={i} className="rt">{v ? <Icon n="check" style={{ width: 15, color: "var(--ok)" }} /> : <span style={{ color: "var(--muted-2)" }}>—</span>}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </Sec>
      <Sec title="Users" sub={`${ops.users.length} active · per-clinician identity in every audit entry`}>
        <Card flush>
          <table className="tbl">
            <thead><tr><th>User</th><th>Role</th><th>Site</th><th>MFA</th><th className="rt">Overrides</th><th>Last active</th><th>Session</th></tr></thead>
            <tbody>
              {ops.users.map((u, i) => (
                <tr key={i} style={{ cursor: "default" }}>
                  <td><div style={{ display: "flex", alignItems: "center", gap: 8 }}><Avatar name={u.name} /><b>{u.name}</b></div></td>
                  <td>{u.role}</td><td><code>{u.site}</code></td>
                  <td>{u.mfa ? <Icon n="check" style={{ width: 14, color: "var(--ok)" }} /> : <span className="pill warn"><span className="d" />off</span>}</td>
                  <td className="rt num">{u.overrides}</td>
                  <td className="num muted">{u.lastActive}</td>
                  <td>{/m ago/.test(u.lastActive) ? <Pill s="synced">active</Pill> : <span className="muted">idle</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </Sec>
    </>
  );
}

// ── Security & keys ────────────────────────────────────────────────
function AdSecurity({ A }) {
  return (
    <>
      <Sec title="Identity providers" sub="OIDC / SMART · per-clinician identity">
        <div className="grid g2">
          {A.authProviders.map((p, i) => (
            <Card key={i}><div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div className="feed-ic"><Icon n="lock" /></div>
              <div style={{ flex: 1 }}><div style={{ fontWeight: 600, fontSize: 14 }}>{p.name}</div><div className="note">{p.type} · {p.sites} sites</div></div>
              {p.status === "active" ? <Pill s="pass">active</Pill> : <Pill s="warn">deprecated</Pill>}
            </div></Card>
          ))}
        </div>
      </Sec>
      <Sec title="Signing keys & certificates" sub="Sigstore · per-site federation key in HSM / Vault / KMS">
        <Card flush>
          <table className="tbl">
            <thead><tr><th>Site</th><th>Store</th><th>Algorithm</th><th>Rotated</th><th>Expires</th><th>Status</th><th></th></tr></thead>
            <tbody>
              {A.keys.map((k, i) => (
                <tr key={i} style={{ cursor: "default" }}>
                  <td><b>{k.site}</b></td><td><code>{k.kind}</code></td><td className="num">{k.algo}</td>
                  <td className="num muted">{k.rotated}</td><td className="num muted">in {k.expires}</td>
                  <td>{k.status === "valid" ? <Pill s="pass">valid</Pill> : <Pill s="warn">rotate soon</Pill>}</td>
                  <td><button className="btn btn-sm btn-ghost"><Icon n="sync" /> Rotate</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </Sec>
    </>
  );
}

// ── Data & consent ─────────────────────────────────────────────────
function AdData({ A }) {
  return (
    <Sec title="Federated registries" sub="Compute travels to data · differential-privacy budgets enforced per registry">
      <Card flush>
        <table className="tbl">
          <thead><tr><th>Registry</th><th>Modality</th><th className="rt">Records</th><th className="rt">Consented</th><th>DP budget</th><th>License</th><th>Signed</th><th>Updated</th></tr></thead>
          <tbody>
            {A.datasets.map((d, i) => (
              <tr key={i} style={{ cursor: "default" }}>
                <td><b>{d.name}</b><div className="mono" style={{ fontSize: 10, color: "var(--muted)" }}>{d.site}</div></td>
                <td>{d.modality}</td>
                <td className="rt num">{d.records.toLocaleString()}</td>
                <td className="rt num">{(d.consented * 100).toFixed(0)}%</td>
                <td><code>{d.dp}</code></td>
                <td><span className="chip">{d.license}</span></td>
                <td>{d.signed ? <Icon n="lock" style={{ width: 14, color: "var(--ok)" }} /> : <span className="pill warn"><span className="d" />no</span>}</td>
                <td className="num muted">{d.updated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </Sec>
  );
}

// ── Equity governance ──────────────────────────────────────────────
function AdEquity({ fleet }) {
  return (
    <Sec title="Equity governance" sub="Equity-as-loss runs inside the training loop · releases below threshold are blocked, not warned">
      <Card flush>
        <table className="tbl">
          <thead><tr><th>Module</th><th className="rt">Strata passing</th><th style={{ width: 260 }}>Coverage</th><th>Gate</th><th>Threshold</th></tr></thead>
          <tbody>
            {fleet.mods.map((f) => {
              const pct = (f.equityPass / f.equityTotal) * 100;
              return (
                <tr key={f.m.slug} style={{ cursor: "default" }}>
                  <td><span className="tag-dot" style={{ background: f.m.accent, marginRight: 7 }} /><b>{f.m.name}</b> <code style={{ fontSize: 10, color: "var(--muted)" }}>{f.m.code.replace("AURORA-", "")}</code></td>
                  <td className="rt num">{f.equityPass}/{f.equityTotal}</td>
                  <td><Meter pct={pct} color={pct === 100 ? "var(--ok)" : "var(--warn)"} /></td>
                  <td>{pct === 100 ? <Pill s="pass">clear</Pill> : <Pill s="warn">blocking</Pill>}</td>
                  <td className="mono muted">≥ 0.78 · RFC-018</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </Sec>
  );
}

// ── Monitoring & SRE ───────────────────────────────────────────────
function AdMonitoring({ A, ops, m }) {
  const SEV = { major: "fail", minor: "warn", info: "beta", planned: "soon" };
  return (
    <>
      <Sec title="Service health" sub="control plane · gateways · ledger">
        <Card flush>
          <table className="tbl">
            <thead><tr><th>Service</th><th>Status</th><th className="rt">Uptime 30d</th><th className="rt">p50 latency</th><th style={{ width: 160 }}></th></tr></thead>
            <tbody>
              {A.services.map((s, i) => (
                <tr key={i} style={{ cursor: "default" }}>
                  <td><code className="strong">{s.name}</code></td>
                  <td>{s.status === "healthy" ? <Pill s="pass">healthy</Pill> : <Pill s="warn">degraded</Pill>}</td>
                  <td className="rt num">{s.up.toFixed(2)}%</td>
                  <td className="rt num">{s.lat}</td>
                  <td><Meter pct={s.up} color={s.status === "healthy" ? "var(--ok)" : "var(--warn)"} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </Sec>
      <div className="grid g2" style={{ alignItems: "start", marginBottom: 18 }}>
        <Card title="Throughput" sub="cases / day"><Spark data={ops.throughput} color={m.accent} h={60} /></Card>
        <Card title="Inference latency" sub="ms p50"><Spark data={ops.latencyTrend} color={m.accent} kind="bars" h={60} /></Card>
      </div>
      <Sec title="Incidents" sub="MTTR tracked · postmortems on majors">
        <Card flush>
          <table className="tbl">
            <thead><tr><th>ID</th><th>Severity</th><th>Summary</th><th>Status</th><th>When</th><th className="rt">MTTR</th></tr></thead>
            <tbody>
              {A.incidents.map((inc, i) => (
                <tr key={i} style={{ cursor: "default" }}>
                  <td><code className="strong">{inc.id}</code></td>
                  <td><span className={`pill ${SEV[inc.sev]}`}><span className="d" />{inc.sev}</span></td>
                  <td>{inc.t}</td>
                  <td>{inc.status === "resolved" ? <Pill s="pass">resolved</Pill> : inc.status === "planned" ? <Pill s="soon">planned</Pill> : <Pill s="warn">{inc.status}</Pill>}</td>
                  <td className="num muted">{inc.when}</td>
                  <td className="rt num">{inc.mttr}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </Sec>
    </>
  );
}

// ── Audit log (enriched + expandable) ──────────────────────────────
function AdAudit({ A }) {
  const [q, setQ] = React.useState("");
  const [kind, setKind] = React.useState("all");
  const [open, setOpen] = React.useState(-1);
  const kinds = ["all", ...Array.from(new Set(A.sysAudit.map((e) => e.kind)))].slice(0, 9);
  const rows = A.sysAudit.filter((e) => (kind === "all" || e.kind === kind) &&
    (!q || (e.kind + e.actor + e.module + e.site + e.resource).toLowerCase().includes(q.toLowerCase())));
  return (
    <Sec title="System-wide audit log" sub={`${A.sysAudit.length} events · every privileged action, signed before the next render · tamper-evident chain`}
      right={<div className="tb-search" style={{ margin: 0, width: 220 }}><Icon n="search" /><input placeholder="Filter events…" value={q} onChange={(e) => setQ(e.target.value)} /></div>}>
      <div style={{ display: "flex", gap: 6, marginBottom: 12, flexWrap: "wrap" }}>
        {kinds.map((k) => <button key={k} className={`utab ${kind === k ? "active" : ""}`} style={{ padding: "5px 10px", fontSize: 12 }} onClick={() => setKind(k)}>{k}</button>)}
      </div>
      <Card flush>
        <table className="tbl">
          <thead><tr><th>Timestamp</th><th>Event</th><th>Actor</th><th>Role</th><th>Module</th><th>Resource</th><th>Source IP</th><th>Result</th><th></th></tr></thead>
          <tbody>
            {rows.map((e, i) => (
              <React.Fragment key={i}>
                <tr onClick={() => setOpen(open === i ? -1 : i)}>
                  <td className="num muted">{e.ts}</td>
                  <td><code className="strong">{e.kind}</code></td>
                  <td>{e.actor === "system" ? <span className="muted">system</span> : <div style={{ display: "flex", alignItems: "center", gap: 7 }}><Avatar name={e.actor} />{e.actor}</div>}</td>
                  <td className="muted" style={{ fontSize: 12 }}>{e.role}</td>
                  <td><code>{e.module}</code></td>
                  <td className="muted" style={{ fontSize: 12 }}>{e.resource}</td>
                  <td className="num muted" style={{ fontSize: 11.5 }}>{e.ip}</td>
                  <td>{e.result === "ok" ? <Pill s="pass">ok</Pill> : <Pill s="fail">blocked</Pill>}</td>
                  <td><Icon n={open === i ? "chevd" : "chev"} style={{ width: 14, color: "var(--muted-2)" }} /></td>
                </tr>
                {open === i && (
                  <tr style={{ cursor: "default" }}><td colSpan={9} style={{ background: "var(--panel-2)", padding: 0 }}>
                    <div style={{ padding: "14px 16px", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14 }}>
                      <div><div className="note">Description</div><div style={{ fontSize: 13, marginTop: 4 }}>{e.desc}</div></div>
                      <div><div className="note">Signature</div><div className="mono" style={{ fontSize: 12, marginTop: 4, display: "flex", alignItems: "center", gap: 6 }}><Icon n="lock" style={{ width: 12, color: "var(--ok)" }} /> {e.sig}</div></div>
                      <div><div className="note">Rekor entry</div><div className="mono" style={{ fontSize: 12, marginTop: 4 }}>verified ✓</div></div>
                      <div><div className="note">Chain</div><div className="mono" style={{ fontSize: 12, marginTop: 4 }}>link {i + 1} · intact</div></div>
                    </div>
                  </td></tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </Card>
      <div className="note" style={{ marginTop: 12 }}>{rows.length} of {A.sysAudit.length} events · click a row for signature + chain detail · export as NDJSON for external SIEM.</div>
    </Sec>
  );
}

// ── Hospitals (tenant administration — master/detail) ──────────────
function AdHospitals({ go }) {
  const hosps = React.useMemo(() => window.OPS_HOSPITALS(), []);
  const [sel, setSel] = React.useState(null);
  if (sel) return <HospitalDetail h={sel} back={() => setSel(null)} go={go} />;
  return (
    <Sec title="Hospitals" sub={`${hosps.length} tenants · each self-administers under its own brand, admins and policies`}
      right={<button className="btn btn-pri btn-sm" onClick={() => go("onboarding")}><Icon n="plus" /> Onboard hospital</button>}>
      <Card flush>
        <table className="tbl">
          <thead><tr><th>Hospital</th><th>Region</th><th>Tier</th><th className="rt">Modules</th><th className="rt">Users</th><th className="rt">Admins</th><th className="rt">Nodes</th><th>MoU</th><th>Onboarding</th><th>Status</th><th></th></tr></thead>
          <tbody>
            {hosps.map((h, i) => (
              <tr key={i} onClick={() => setSel(h)}>
                <td><div style={{ display: "flex", alignItems: "center", gap: 9 }}><span className="av-sm" style={{ background: h.brand.primary, borderRadius: 7, fontSize: 9 }}>{h.brand.initials}</span><b>{h.name}</b></div></td>
                <td className="muted">{h.country}</td>
                <td><span className="chip">{h.tier}</span></td>
                <td className="rt num">{h.enabled.length}</td>
                <td className="rt num">{h.userTotal}</td>
                <td className="rt num">{h.admins.length}</td>
                <td className="rt num">{h.nodes.length}</td>
                <td>{h.mou === "signed" ? <Pill s="pass">signed</Pill> : <Pill s="warn">pending</Pill>}</td>
                <td style={{ width: 130 }}><div style={{ display: "flex", alignItems: "center", gap: 7 }}><Meter pct={(h.onboarding.done / h.onboarding.total) * 100} color={h.onboarding.done === h.onboarding.total ? "var(--ok)" : h.brand.accent} /><span className="num muted" style={{ fontSize: 11 }}>{h.onboarding.done}/{h.onboarding.total}</span></div></td>
                <td>{h.status === "live" ? <Pill s="live" /> : h.status === "suspended" ? <Pill s="fail">suspended</Pill> : <Pill s={h.status === "onboarding" ? "beta" : "soon"}>{h.status}</Pill>}</td>
                <td><Icon n="chev" style={{ width: 15, color: "var(--muted-2)" }} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </Sec>
  );
}

const HOSP_TABS = [
  { k: "admins", label: "Admins & permissions" }, { k: "users", label: "Users" },
  { k: "modules", label: "Modules" }, { k: "nodes", label: "Deployments" },
  { k: "data", label: "Data & consent" }, { k: "audit", label: "Audit log" },
  { k: "access", label: "Access requests" }, { k: "settings", label: "Settings & brand" },
];

function HospitalDetail({ h, back, go }) {
  const [tab, setTab] = React.useState("admins");
  const bp = h.brand.primary, ba = h.brand.accent;
  return (
    <div>
      <button className="btn btn-sm btn-ghost" onClick={back} style={{ marginBottom: 12 }}><Icon n="arrow" style={{ transform: "rotate(180deg)" }} /> All hospitals</button>
      {/* hospital header — branded */}
      <div className="card" style={{ marginBottom: 14, overflow: "hidden" }}>
        <div style={{ height: 4, background: `linear-gradient(90deg, ${bp}, ${ba})` }} />
        <div className="card-b" style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap", padding: "16px 18px" }}>
          <span className="av-sm" style={{ width: 48, height: 48, borderRadius: 12, background: bp, fontSize: 15 }}>{h.brand.initials}</span>
          <div>
            <div style={{ fontWeight: 600, fontSize: 18, letterSpacing: "-0.02em", display: "flex", alignItems: "center", gap: 10 }}>{h.name} {h.status === "live" ? <Pill s="live" /> : <Pill s={h.status === "suspended" ? "fail" : "beta"}>{h.status}</Pill>}</div>
            <div className="note" style={{ marginTop: 3 }}>{h.country} · {h.tier} partner · since {h.since} · {h.contact.email}</div>
          </div>
          <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
            <button className="btn btn-sm"><Icon n="external" /> Contact</button>
            <button className="btn btn-sm" style={{ background: bp, borderColor: bp, color: "#fff" }} onClick={() => go("onboarding")}><Icon n="install" /> {h.onboarding.done === h.onboarding.total ? "Re-run setup" : "Resume onboarding"}</button>
          </div>
        </div>
      </div>

      <div className="grid g4" style={{ marginBottom: 14 }}>
        <Kpi edge label="Administrators" value={h.admins.length} foot="delegated" />
        <Kpi label="Users" value={h.userTotal} foot="provisioned" />
        <Kpi label="Modules enabled" value={h.enabled.length} foot={`of ${window.AURORA_DATA.modules.length}`} />
        <Kpi label="Onboarding" value={`${h.onboarding.done}/${h.onboarding.total}`} foot={h.onboarding.done === h.onboarding.total ? "complete" : "in progress"} />
      </div>

      <Tabs underline value={tab} onChange={setTab} items={HOSP_TABS} />

      {tab === "admins" && <HospAdmins h={h} ba={ba} />}
      {tab === "users" && (
        <div className="grid g3">
          {h.byRole.map((r, i) => (
            <Card key={i}><div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}><div style={{ fontSize: 26, fontWeight: 600, letterSpacing: "-0.02em" }}>{r[1]}</div><span className="note">{((r[1] / h.userTotal) * 100).toFixed(0)}%</span></div><div style={{ fontSize: 13, color: "var(--text-2)", marginTop: 4 }}>{r[0]}</div><div style={{ marginTop: 10 }}><Meter pct={(r[1] / h.userTotal) * 100} color={ba} /></div></Card>
          ))}
        </div>
      )}
      {tab === "modules" && (
        <Card flush><table className="tbl"><thead><tr><th>Module</th><th>Code</th><th>Status</th><th></th></tr></thead>
          <tbody>{window.AURORA_DATA.modules.map((m) => { const on = h.enabled.includes(m.slug); return (
            <tr key={m.slug} style={{ cursor: "default" }}><td><span className="tag-dot" style={{ background: m.accent, marginRight: 7 }} /><b>{m.name}</b></td><td><code>{m.code}</code></td><td>{on ? <Pill s="live">enabled</Pill> : <span className="muted">not enabled</span>}</td><td className="rt"><button className="btn btn-sm btn-ghost">{on ? "Configure" : "Enable"}</button></td></tr>
          ); })}</tbody></table></Card>
      )}
      {tab === "nodes" && (
        <Card flush><table className="tbl"><thead><tr><th>Node</th><th>Mode</th><th>GPU</th><th>Version</th><th>Last sync</th><th>Status</th></tr></thead>
          <tbody>{h.nodes.map((n, i) => (<tr key={i} style={{ cursor: "default" }}><td><code className="strong">{n.node}</code></td><td><code>{n.mode}</code></td><td className="num muted">{n.gpu}</td><td className="num">{n.version}</td><td className="num muted">{n.lastSync} ago</td><td><Pill s={n.status} /></td></tr>))}</tbody></table></Card>
      )}
      {tab === "data" && (
        <Card flush><table className="tbl"><thead><tr><th>Registry</th><th className="rt">Records</th><th className="rt">Consented</th><th>DP budget</th></tr></thead>
          <tbody>{h.registries.map((r, i) => (<tr key={i} style={{ cursor: "default" }}><td><b>{r.name}</b></td><td className="rt num">{r.records.toLocaleString()}</td><td className="rt num">{(r.consent * 100).toFixed(0)}%</td><td><code>{r.dp}</code></td></tr>))}</tbody></table></Card>
      )}
      {tab === "audit" && (
        <Card flush><table className="tbl"><thead><tr><th>Timestamp</th><th>Event</th><th>Actor</th><th>Role</th><th>Source IP</th><th>Result</th><th>Sig</th></tr></thead>
          <tbody>{h.audit.map((e, i) => (<tr key={i} style={{ cursor: "default" }}><td className="num muted">{e.ts}</td><td><code className="strong">{e.kind}</code></td><td>{e.actor === "system" ? <span className="muted">system</span> : e.actor}</td><td className="muted" style={{ fontSize: 12 }}>{e.role}</td><td className="num muted" style={{ fontSize: 11.5 }}>{e.ip}</td><td>{e.result === "ok" ? <Pill s="pass">ok</Pill> : <Pill s="fail">blocked</Pill>}</td><td className="mono muted" style={{ fontSize: 11 }}>{e.sig}</td></tr>))}</tbody></table></Card>
      )}
      {tab === "access" && (
        h.accessReq.length === 0 ? <div className="note">No pending access requests.</div> :
        <Card flush><table className="tbl"><thead><tr><th>Requestor</th><th>Requested role</th><th>By</th><th>When</th><th></th></tr></thead>
          <tbody>{h.accessReq.map((r, i) => (<tr key={i} style={{ cursor: "default" }}><td><div style={{ display: "flex", alignItems: "center", gap: 7 }}><Avatar name={r.name} /><b>{r.name}</b></div></td><td>{r.role}</td><td className="muted">{r.by}</td><td className="num muted">{r.requested}</td><td className="rt"><div style={{ display: "flex", gap: 6, justifyContent: "flex-end" }}><button className="btn btn-sm btn-pri" style={{ background: ba, borderColor: ba }}>Approve</button><button className="btn btn-sm">Deny</button></div></td></tr>))}</tbody></table></Card>
      )}
      {tab === "settings" && (
        <div className="grid g2" style={{ alignItems: "start" }}>
          <Card title="Site settings" sub="locked = governance-controlled">
            <div className="kv" style={{ gridTemplateColumns: "150px 1fr" }}>
              {h.settings.map(([k, v], i) => (<div key={i} style={{ borderBottom: i >= h.settings.length - 1 ? "none" : undefined }}><div className="k">{k}</div><div className="v">{v}{/locked/.test(v) && <Icon n="lock" style={{ width: 11, marginLeft: 6, color: "var(--muted)" }} />}</div></div>))}
            </div>
          </Card>
          <Card title="Brand" sub="applied to this tenant's surfaces">
            <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 14 }}>
              <span className="av-sm" style={{ width: 44, height: 44, borderRadius: 11, background: bp, fontSize: 14 }}>{h.brand.initials}</span>
              <div style={{ height: 44, flex: 1, borderRadius: 10, background: `linear-gradient(90deg, ${bp}, ${ba})` }} />
            </div>
            <div className="kv" style={{ gridTemplateColumns: "120px 1fr" }}>
              <div><div className="k">Primary</div><div className="v mono">{bp}</div></div>
              <div><div className="k">Accent</div><div className="v mono">{ba}</div></div>
              <div style={{ borderBottom: "none" }}><div className="k">Logo mark</div><div className="v">{h.brand.initials} · monogram</div></div>
            </div>
            <button className="btn btn-sm" style={{ marginTop: 12 }} onClick={() => go("onboarding")}><Icon n="external" /> Edit in onboarding</button>
          </Card>
        </div>
      )}
    </div>
  );
}

function HospAdmins({ h, ba }) {
  const caps = window.AURORA_CAPS;
  const [sel, setSel] = React.useState(0);
  const admin = h.admins[sel];
  const groups = Array.from(new Set(caps.map((c) => c.g)));
  return (
    <div className="grid" style={{ gridTemplateColumns: "1fr 1.3fr", gap: 16, alignItems: "start" }}>
      <Card title="Administrators" sub="delegated · scoped" flush>
        <table className="tbl"><thead><tr><th>Admin</th><th>Role</th><th>MFA</th></tr></thead>
          <tbody>{h.admins.map((a, i) => (
            <tr key={i} onClick={() => setSel(i)} style={{ background: sel === i ? "var(--panel-2)" : undefined }}>
              <td><div style={{ display: "flex", alignItems: "center", gap: 8 }}><Avatar name={a.name} /><div><b>{a.name}</b><div className="mono" style={{ fontSize: 10, color: "var(--muted)" }}>{a.scope}</div></div></div></td>
              <td style={{ fontSize: 12.5 }}>{a.role}</td>
              <td>{a.mfa ? <Icon n="check" style={{ width: 14, color: "var(--ok)" }} /> : <span className="pill warn"><span className="d" />off</span>}</td>
            </tr>
          ))}</tbody></table>
        <div className="card-b"><button className="btn btn-sm" style={{ width: "100%", justifyContent: "center" }}><Icon n="plus" /> Add administrator</button></div>
      </Card>
      <Card title={`${admin.name} · permissions`} sub={`${admin.role} · ${admin.caps.length}/${caps.length} capabilities`}>
        {groups.map((g) => (
          <div key={g} style={{ marginBottom: 14 }}>
            <div className="note" style={{ marginBottom: 8 }}>{g}</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {caps.filter((c) => c.g === g).map((c) => {
                const has = admin.caps.includes(c.k);
                return (
                  <div key={c.k} style={{ display: "flex", alignItems: "center", gap: 9, padding: "7px 11px", borderRadius: 8, border: "1px solid var(--line)", background: has ? "var(--panel-2)" : "transparent", opacity: has ? 1 : 0.55 }}>
                    <span style={{ width: 28, height: 16, borderRadius: 10, background: has ? ba : "var(--line-2)", position: "relative", flexShrink: 0, transition: "background .15s" }}><span style={{ position: "absolute", top: 2, left: has ? 14 : 2, width: 12, height: 12, borderRadius: "50%", background: "#fff", transition: "left .15s" }} /></span>
                    <code style={{ fontSize: 11.5, color: has ? "var(--text)" : "var(--muted)" }}>{c.k}</code>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
        <div className="note" style={{ marginTop: 6 }}>Toggle a capability to scope this admin. Changes are written to the site audit log and require the Site administrator role.</div>
      </Card>
    </div>
  );
}

// ── Usage & license ────────────────────────────────────────────────
function AdBilling({ A }) {
  const tot = A.usage.reduce((a, b) => ({ cases: a.cases + b.cases, gpuHrs: a.gpuHrs + b.gpuHrs, storage: a.storage + b.storage, seats: a.seats + b.seats }), { cases: 0, gpuHrs: 0, storage: 0, seats: 0 });
  return (
    <>
      <Sec title="License & metering" sub="MIT @ public alpha · usage shown for capacity planning, not billing">
        <div className="grid g4" style={{ marginBottom: 16 }}>
          <Kpi edge label="Cases processed" value={tot.cases.toLocaleString()} foot="all modules · 30d" />
          <Kpi label="GPU-hours" value={tot.gpuHrs.toLocaleString()} foot="inference + train" />
          <Kpi label="Storage" value={tot.storage.toFixed(0)} unit="TB" foot="weights + audit" />
          <Kpi label="Seats" value={tot.seats} foot="active clinicians" />
        </div>
      </Sec>
      <Sec title="Per-module usage">
        <Card flush>
          <table className="tbl">
            <thead><tr><th>Module</th><th className="rt">Cases 30d</th><th className="rt">GPU-hrs</th><th className="rt">Storage</th><th className="rt">Seats</th></tr></thead>
            <tbody>
              {A.usage.map((u, i) => (
                <tr key={i} style={{ cursor: "default" }}>
                  <td><span className="tag-dot" style={{ background: u.accent, marginRight: 7 }} /><b>{u.module}</b></td>
                  <td className="rt num">{u.cases.toLocaleString()}</td>
                  <td className="rt num">{u.gpuHrs.toLocaleString()}</td>
                  <td className="rt num">{u.storage} TB</td>
                  <td className="rt num">{u.seats}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </Sec>
    </>
  );
}

// ── Config & flags ─────────────────────────────────────────────────
function AdConfig({ A }) {
  return (
    <Sec title="Configuration & feature flags" sub="Locked flags are governance-controlled — changeable only by RFC">
      <Card flush>
        <table className="tbl">
          <thead><tr><th>Key</th><th>Value</th><th>Scope</th><th>Control</th><th></th></tr></thead>
          <tbody>
            {A.flags.map((f, i) => (
              <tr key={i} style={{ cursor: "default" }}>
                <td><code className="strong">{f.k}</code></td>
                <td><span className={`pill ${f.v === "on" ? "pass" : f.v === "off" ? "soon" : "beta"}`}><span className="d" />{f.v}</span></td>
                <td className="muted">{f.scope}</td>
                <td>{f.locked ? <span className="note"><Icon n="lock" style={{ width: 12 }} /> RFC-locked</span> : <span className="muted">editable</span>}</td>
                <td><button className="btn btn-sm btn-ghost" disabled={f.locked} style={{ opacity: f.locked ? 0.4 : 1 }}>Edit</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </Sec>
  );
}

// ── Governance / RFCs ──────────────────────────────────────────────
function AdRfc({ A }) {
  return (
    <Sec title="Governance / RFCs" sub="Council-led roadmap · thresholds and contracts change only here">
      <div className="grid g2">
        {A.rfcs.map((r, i) => (
          <Card key={i}>
            <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 8 }}>
              <code className="strong">{r.id}</code>
              <span className={`pill ${r.status === "ratified" ? "pass" : r.status === "in review" ? "beta" : "soon"}`} style={{ marginLeft: "auto" }}><span className="d" />{r.status}</span>
            </div>
            <div style={{ fontWeight: 600, fontSize: 14, letterSpacing: "-0.01em", lineHeight: 1.4 }}>{r.t}</div>
            <div className="note" style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 7 }}><Avatar name={r.owner} /> owner {r.owner}</div>
          </Card>
        ))}
      </div>
    </Sec>
  );
}

// ── Approvals & gates ──────────────────────────────────────────────
function AdApprovals({ A }) {
  const KP = { "Model promotion": "model", "Access request": "users", "RFC vote": "book", "Config change": "cpu" };
  return (
    <Sec title="Approvals & gates" sub="Promotion gates, access requests and RFC votes — nothing ships without sign-off">
      <Card flush>
        <table className="tbl">
          <thead><tr><th>Type</th><th>Item</th><th>Requester</th><th>Gate</th><th>Votes</th><th>Status</th><th></th></tr></thead>
          <tbody>
            {A.approvals.map((ap, i) => (
              <tr key={i} style={{ cursor: "default" }}>
                <td><Icon n={KP[ap.kind] || "check"} style={{ width: 14, color: "var(--muted)", marginRight: 7 }} /><b>{ap.kind}</b></td>
                <td><code>{ap.item}</code></td>
                <td><div style={{ display: "flex", alignItems: "center", gap: 7 }}><Avatar name={ap.requester} />{ap.requester}</div></td>
                <td className="muted">{ap.gate}</td>
                <td className="num">{ap.votes}</td>
                <td>{ap.status === "approved" ? <Pill s="pass">approved</Pill> : <Pill s="warn">awaiting</Pill>}</td>
                <td className="rt">{ap.status === "awaiting" ? <div style={{ display: "flex", gap: 6, justifyContent: "flex-end" }}><button className="btn btn-sm btn-pri">Approve</button><button className="btn btn-sm">Reject</button></div> : <span className="note">done</span>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </Sec>
  );
}

// ── SLOs & error budgets ───────────────────────────────────────────
function AdSlo({ A }) {
  return (
    <Sec title="SLOs & error budgets" sub="Service-level objectives with remaining error budget and 30-day burn">
      <div className="grid g2" style={{ alignItems: "start" }}>
        {A.slos.map((s, i) => {
          const ok = s.actual >= s.target;
          const budget = Math.max(0, Math.min(100, s.budget));
          return (
            <Card key={i} title={s.name} sub={s.window} right={ok ? <Pill s="pass">meeting</Pill> : <Pill s="warn">at risk</Pill>}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 12 }}>
                <div style={{ fontSize: 26, fontWeight: 600, letterSpacing: "-0.03em" }}>{s.actual}{s.unit ? "" : "%"}</div>
                <span className="muted" style={{ fontSize: 12 }}>target {s.target}{s.unit ? "" : "%"} {s.unit ? `(${s.unit})` : ""}</span>
              </div>
              <div className="bar-row"><span>Error budget remaining</span><span className="num" style={{ color: budget > 30 ? "var(--ok)" : "var(--warn)" }}>{budget}%</span></div>
              <Meter pct={budget} color={budget > 30 ? "var(--ok)" : "var(--warn)"} />
              <div style={{ marginTop: 10 }}><Spark data={Array.from({ length: 20 }, (_, j) => 100 - j * (s.burn * 2) - Math.random() * 4)} color={ok ? "var(--ok)" : "var(--warn)"} /></div>
            </Card>
          );
        })}
      </div>
    </Sec>
  );
}

// ── Cost & capacity ────────────────────────────────────────────────
function AdCost({ A, m }) {
  const c = A.costPlan;
  const months = ["Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May"];
  return (
    <Sec title="Cost & capacity planning" sub="GPU-hour consumption, projection and headroom — for capacity, not billing (MIT)">
      <div className="grid g4" style={{ marginBottom: 14 }}>
        <Kpi edge label="GPU-hours" value={c.gpuHrs.toLocaleString()} foot="30 days" />
        <Kpi label="Projected next mo" value={Math.round(c.gpuHrs * 1.08).toLocaleString()} delta="+8%" dir="down" foot="at current rate" />
        <Kpi label="Cluster headroom" value={c.headroom} unit="%" foot="before scale-out" />
        <Kpi label="Modules" value={c.perModule.length} foot="sharing fleet" />
      </div>
      <div className="grid g2" style={{ alignItems: "start", marginBottom: 14 }}>
        <Card title="GPU-hour consumption" sub="12 months"><window.LineChart series={[{ data: c.gpuTrend, color: m.accent }]} labels={months} height={200} /></Card>
        <Card title="Capacity headroom" sub="before scale-out"><div style={{ display: "grid", placeItems: "center", padding: 10 }}><window.Gauge value={c.headroom} max={100} color={c.headroom > 25 ? "var(--ok)" : "var(--warn)"} label="HEADROOM %" size={160} /></div></Card>
      </div>
      <Card title="Per-module GPU consumption" sub="current vs projected" flush>
        <table className="tbl"><thead><tr><th>Module</th><th className="rt">GPU-hrs (30d)</th><th className="rt">Projected</th><th style={{ width: 200 }}>Share</th></tr></thead>
          <tbody>{c.perModule.map((p, i) => (<tr key={i} style={{ cursor: "default" }}><td><span className="tag-dot" style={{ background: p.accent, marginRight: 7 }} /><b>{p.module}</b></td><td className="rt num">{p.gpuHrs.toLocaleString()}</td><td className="rt num">{p.proj.toLocaleString()}</td><td><Meter pct={(p.gpuHrs / Math.max(...c.perModule.map((x) => x.gpuHrs))) * 100} color={p.accent} /></td></tr>))}</tbody>
        </table>
      </Card>
    </Sec>
  );
}

// ── Notifications ──────────────────────────────────────────────────
function AdNotifications({ A }) {
  const [rules, setRules] = React.useState(A.notifRules);
  const toggle = (i) => setRules((r) => r.map((x, j) => j === i ? { ...x, on: !x.on } : x));
  const SEV = { critical: "fail", warning: "warn", info: "beta" };
  return (
    <Sec title="Notification routing" sub="Event → channel rules · avoid alert fatigue, route by severity">
      <Card flush>
        <table className="tbl">
          <thead><tr><th>Event</th><th>Severity</th><th>Channel</th><th>Enabled</th></tr></thead>
          <tbody>
            {rules.map((r, i) => (
              <tr key={i} style={{ cursor: "default" }}>
                <td><code className="strong">{r.event}</code></td>
                <td><span className={`pill ${SEV[r.sev]}`}><span className="d" />{r.sev}</span></td>
                <td className="muted">{r.channel}</td>
                <td><span onClick={() => toggle(i)} style={{ display: "inline-block", width: 34, height: 19, borderRadius: 12, background: r.on ? "var(--ok)" : "var(--line-2)", position: "relative", cursor: "pointer" }}><span style={{ position: "absolute", top: 2.5, left: r.on ? 17 : 2.5, width: 14, height: 14, borderRadius: "50%", background: "#fff", transition: "left .15s" }} /></span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      <div className="note" style={{ marginTop: 12 }}>Critical events (equity-gate blocks, major incidents) cannot be fully disabled — they always write to the audit log.</div>
    </Sec>
  );
}
