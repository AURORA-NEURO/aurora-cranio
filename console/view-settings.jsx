// ════════════════════════════════════════════════════════════════════
//  VIEW · SETTINGS — comprehensive, with a working appearance system
// ════════════════════════════════════════════════════════════════════
window.AV = window.AV || {};

const ST_SECTIONS = [
  { k: "profile", label: "Profile", ic: "users" },
  { k: "appearance", label: "Appearance", ic: "sun" },
  { k: "notifications", label: "Notifications", ic: "bell" },
  { k: "clinical", label: "Clinical defaults", ic: "pulse" },
  { k: "privacy", label: "Data & privacy", ic: "shield" },
  { k: "integrations", label: "Integrations", ic: "fed" },
  { k: "shortcuts", label: "Keyboard", ic: "cpu" },
  { k: "security", label: "Sessions & security", ic: "lock" },
  { k: "about", label: "About", ic: "doc" },
];

const STToggle = ({ on, set, label, hint }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 0", borderBottom: "1px solid var(--line)" }}>
    <div style={{ flex: 1 }}><div style={{ fontSize: 13, fontWeight: 500 }}>{label}</div>{hint && <div className="note" style={{ marginTop: 3 }}>{hint}</div>}</div>
    <span onClick={set} style={{ flexShrink: 0, width: 36, height: 20, borderRadius: 12, background: on ? "var(--ok)" : "var(--line-2)", position: "relative", cursor: "pointer" }}><span style={{ position: "absolute", top: 2.5, left: on ? 18 : 2.5, width: 15, height: 15, borderRadius: "50%", background: "#fff", transition: "left .15s" }} /></span>
  </div>
);

window.AV.settings = function Settings({ m, prefs, go }) {
  const [sec, setSec] = React.useState("appearance");
  const [tog, setTog] = React.useState({ emailAlerts: true, criticalPush: true, digest: false, autosign: false, showConf: true, telemetry: false, mfa: true });
  const t = (k) => setTog((p) => ({ ...p, [k]: !p[k] }));

  return (
    <div className="view">
      <ViewHead eyebrow="AURORA · settings" title={<>Settings & <em className="s">preferences</em></>} sub="Per-user preferences and workspace configuration. Appearance changes apply live across the console." />
      <div className="grid" style={{ gridTemplateColumns: "210px 1fr", gap: 18, alignItems: "start" }}>
        <div className="card" style={{ padding: 8, position: "sticky", top: 0 }}>
          {ST_SECTIONS.map((s) => (
            <a key={s.k} onClick={() => setSec(s.k)} className={`sb-link ${sec === s.k ? "active" : ""}`} style={{ color: sec === s.k ? "var(--text)" : "var(--text-2)", background: sec === s.k ? "var(--panel-2)" : "transparent", fontSize: 12.5 }}>
              <Icon n={s.ic} /> <span>{s.label}</span>
            </a>
          ))}
        </div>
        <div style={{ maxWidth: 760 }}>
          {sec === "profile" && <StProfile />}
          {sec === "appearance" && <StAppearance prefs={prefs} m={m} />}
          {sec === "notifications" && <Card title="Notifications" sub="how you're alerted">
            <STToggle on={tog.emailAlerts} set={() => t("emailAlerts")} label="Email alerts" hint="Case assignments, sign-off requests, mentions." />
            <STToggle on={tog.criticalPush} set={() => t("criticalPush")} label="Critical push" hint="Equity-gate blocks and major incidents (cannot be silenced for admins)." />
            <STToggle on={tog.digest} set={() => t("digest")} label="Daily digest" hint="A morning summary of your queue and cohort changes." />
          </Card>}
          {sec === "clinical" && <Card title="Clinical defaults" sub="your working preferences">
            <STToggle on={tog.autosign} set={() => t("autosign")} label="Require explicit e-signature" hint="Always present the signature ceremony before emitting a report." />
            <STToggle on={tog.showConf} set={() => t("showConf")} label="Show model confidence inline" hint="Display calibrated confidence next to every AI output." />
            <div style={{ paddingTop: 14 }}>
              <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 8 }}>Default landing surface</div>
              <Tabs value="overview" onChange={() => {}} items={[{ k: "overview", label: "Overview" }, { k: "cases", label: "Cases" }, { k: "clinical", label: "Clinical" }]} />
            </div>
          </Card>}
          {sec === "privacy" && <Card title="Data & privacy" sub="governed by your site policy">
            <STToggle on={tog.telemetry} set={() => t("telemetry")} label="Usage telemetry" hint="Off by default. Opt-in, per-site; payload schema reviewed by the patient-advocate council." />
            <div className="kv" style={{ gridTemplateColumns: "180px 1fr", marginTop: 8 }}>
              <div><div className="k">Data residency</div><div className="v">In-country · {m.stats.scope.split("·")[0]}</div></div>
              <div><div className="k">Consent enforcement</div><div className="v">refuse-without-policy</div></div>
              <div style={{ borderBottom: "none" }}><div className="k">Audit retention</div><div className="v">7 years</div></div>
            </div>
          </Card>}
          {sec === "integrations" && <StIntegrations />}
          {sec === "shortcuts" && <StShortcuts />}
          {sec === "security" && <StSecurity tog={tog} t={t} />}
          {sec === "about" && <StAbout />}
        </div>
      </div>
    </div>
  );
};

function StProfile() {
  const inp = { width: "100%", height: 40, border: "1px solid var(--line)", borderRadius: 9, padding: "0 13px", font: "inherit", fontSize: 13.5, color: "var(--text)", background: "var(--panel-2)", outline: "none" };
  return (
    <Card title="Profile" sub="your identity in the audit log">
      <div style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 18 }}>
        <div className="av-sm" style={{ width: 56, height: 56, fontSize: 18, background: "var(--aurora)" }}>AK</div>
        <div><div style={{ fontWeight: 600, fontSize: 16 }}>A. Kessler</div><div className="note">Module maintainer · all modules</div></div>
        <button className="btn btn-sm" style={{ marginLeft: "auto" }}>Change avatar</button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <div><label style={{ fontSize: 12.5, fontWeight: 600, display: "block", marginBottom: 6 }}>Display name</label><input style={inp} defaultValue="A. Kessler" /></div>
        <div><label style={{ fontSize: 12.5, fontWeight: 600, display: "block", marginBottom: 6 }}>Role</label><input style={inp} defaultValue="Module maintainer" /></div>
        <div><label style={{ fontSize: 12.5, fontWeight: 600, display: "block", marginBottom: 6 }}>Email</label><input style={inp} defaultValue="a.kessler@aurora.health" /></div>
        <div><label style={{ fontSize: 12.5, fontWeight: 600, display: "block", marginBottom: 6 }}>Primary site</label><input style={inp} defaultValue="Karolinska Institutet" /></div>
      </div>
      <button className="btn btn-pri btn-sm" style={{ marginTop: 16 }}><Icon n="check" /> Save profile</button>
    </Card>
  );
}

function StAppearance({ prefs, m }) {
  const ACCENTS = ["#0099e0", "#14b88a", "#6755e8", "#e8489f", "#e87b1f", "#5cf0c2"];
  return (
    <div className="grid" style={{ gap: 14 }}>
      <Card title="Theme" sub="applies live">
        <div style={{ display: "flex", gap: 10 }}>
          {["light", "dark"].map((th) => (
            <div key={th} onClick={() => prefs.setTheme(th)} style={{ flex: 1, border: prefs.theme === th ? "2px solid var(--accent)" : "1px solid var(--line)", borderRadius: 12, padding: 14, cursor: "pointer", background: th === "dark" ? "#0d0f14" : "#fff" }}>
              <div style={{ display: "flex", gap: 6, marginBottom: 10 }}><span style={{ width: 30, height: 6, borderRadius: 3, background: th === "dark" ? "#2b313d" : "#e5e7eb" }} /><span style={{ width: 14, height: 6, borderRadius: 3, background: m.accent }} /></div>
              <div style={{ display: "flex", gap: 6 }}><span style={{ width: 20, height: 20, borderRadius: 5, background: th === "dark" ? "#151922" : "#f3f5f8" }} /><span style={{ flex: 1, height: 20, borderRadius: 5, background: th === "dark" ? "#151922" : "#f3f5f8" }} /></div>
              <div style={{ fontSize: 12, fontWeight: 600, marginTop: 10, color: th === "dark" ? "#f1f3f7" : "#0a0c10", textTransform: "capitalize" }}>{th}{prefs.theme === th && " ✓"}</div>
            </div>
          ))}
        </div>
      </Card>
      <Card title="Density" sub="information per screen">
        <div style={{ display: "flex", gap: 10 }}>
          {[["comfortable", "Comfortable"], ["compact", "Compact"]].map(([k, l]) => (
            <button key={k} className={`btn ${prefs.density === k ? "btn-pri" : ""}`} style={{ flex: 1, justifyContent: "center" }} onClick={() => prefs.setDensity(k)}>{l}{prefs.density === k && " ✓"}</button>
          ))}
        </div>
        <div className="note" style={{ marginTop: 10 }}>Compact tightens padding and type for high-throughput reading rooms.</div>
      </Card>
      <Card title="Accent override" sub="per-user · falls back to module colour">
        <div style={{ display: "flex", gap: 9, flexWrap: "wrap", alignItems: "center" }}>
          <button className="btn btn-sm" onClick={() => prefs.setAccentPref("")} style={{ border: !prefs.accentPref ? "2px solid var(--accent)" : undefined }}>Module default</button>
          {ACCENTS.map((c) => (
            <span key={c} onClick={() => prefs.setAccentPref(c)} style={{ width: 30, height: 30, borderRadius: 8, background: c, cursor: "pointer", border: prefs.accentPref === c ? "2px solid var(--text)" : "2px solid transparent", boxShadow: "var(--shadow)" }} />
          ))}
        </div>
      </Card>
    </div>
  );
}

function StIntegrations() {
  const rows = [["PACS · DICOM", "dicom.hospital.local:11112", "connected"], ["EHR · FHIR R4", "fhir.hospital.local:8080", "connected"], ["Identity · OIDC", "Microsoft AD FS", "connected"], ["RT planning", "Eclipse · RayStation", "connected"], ["Molecular LIS", "HL7v2 ORU", "connected"], ["Object store", "S3-compatible", "connected"]];
  return (
    <Card title="Integrations" sub="endpoints this workspace talks to" flush>
      <table className="tbl"><thead><tr><th>Surface</th><th>Endpoint</th><th>Status</th><th></th></tr></thead>
        <tbody>{rows.map((r, i) => (<tr key={i} style={{ cursor: "default" }}><td><b>{r[0]}</b></td><td className="mono muted" style={{ fontSize: 11.5 }}>{r[1]}</td><td><Pill s="synced">{r[2]}</Pill></td><td className="rt"><button className="btn btn-sm btn-ghost">Test</button></td></tr>))}</tbody>
      </table>
    </Card>
  );
}

function StShortcuts() {
  const keys = [["⌘ K", "Command palette"], ["G then O", "Go to Overview"], ["G then C", "Go to Cases"], ["G then M", "Go to Messages"], ["S", "Sign report"], ["/", "Focus search"], ["⌘ \\", "Toggle sidebar"], ["?", "This list"]];
  return (
    <Card title="Keyboard shortcuts" sub="navigate without the mouse">
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2px 28px" }}>
        {keys.map((k, i) => (<div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 0", borderBottom: "1px solid var(--line)" }}><span style={{ fontSize: 13, color: "var(--text-2)" }}>{k[1]}</span><kbd style={{ fontFamily: "var(--mono)", fontSize: 11, padding: "2px 7px", borderRadius: 5, border: "1px solid var(--line-2)", color: "var(--text)" }}>{k[0]}</kbd></div>))}
      </div>
    </Card>
  );
}

function StSecurity({ tog, t }) {
  const sessions = [["MacBook Pro · Stockholm", "this device", "now"], ["iPad · ward round", "Safari", "2h ago"], ["Workstation · reading room 3", "Chrome", "1d ago"]];
  return (
    <div className="grid" style={{ gap: 14 }}>
      <Card title="Security"><STToggle on={tog.mfa} set={() => t("mfa")} label="Multi-factor authentication" hint="Required by your site policy." /></Card>
      <Card title="Active sessions" sub="sign out remotely" flush>
        <table className="tbl"><thead><tr><th>Device</th><th>Client</th><th>Last active</th><th></th></tr></thead>
          <tbody>{sessions.map((s, i) => (<tr key={i} style={{ cursor: "default" }}><td><b>{s[0]}</b></td><td className="muted">{s[1]}</td><td className="num muted">{s[2]}</td><td className="rt">{i === 0 ? <span className="note">current</span> : <button className="btn btn-sm btn-ghost">Sign out</button>}</td></tr>))}</tbody>
        </table>
      </Card>
    </div>
  );
}

function StAbout() {
  const meta = window.AURORA_DATA.meta;
  return (
    <Card title="About AURORA Console">
      <div className="kv" style={{ gridTemplateColumns: "160px 1fr" }}>
        <div><div className="k">Version</div><div className="v">{meta.version} · {meta.versionLabel}</div></div>
        <div><div className="k">License</div><div className="v">{meta.license}</div></div>
        <div><div className="k">Modules</div><div className="v">{meta.modules} disease modules · {meta.subsystems} subsystems</div></div>
        <div><div className="k">Stack</div><div className="v">{meta.languages.join(" · ")}</div></div>
        <div style={{ borderBottom: "none" }}><div className="k">State</div><div className="v">{meta.state}</div></div>
      </div>
      <div className="note" style={{ marginTop: 14 }}>AURORA is decision-support infrastructure, not a medical device. Every recommendation explainable, every override logged.</div>
    </Card>
  );
}
