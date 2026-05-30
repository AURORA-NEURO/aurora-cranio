// ════════════════════════════════════════════════════════════════════
//  VIEW · ONBOARDING — brand-aware hospital onboarding assessment
//  A real, stateful multi-step wizard that stands up a new tenant under
//  its own brand, identity, federation, data policy, modules and admins.
// ════════════════════════════════════════════════════════════════════
window.AV = window.AV || {};

const OB_BRANDS = [
  { primary: "#0a4f8c", accent: "#3ad6ff" }, { primary: "#0b6e4f", accent: "#5cf0c2" },
  { primary: "#7a1f5c", accent: "#e8489f" }, { primary: "#143b8c", accent: "#6755e8" },
  { primary: "#8c3a0b", accent: "#e87b1f" }, { primary: "#8c1f2f", accent: "#ff7a8a" },
];

window.AV.onboarding = function Onboarding({ go }) {
  const STEPS = window.ONBOARD_STEPS || ["MoU & legal", "Identity (OIDC)", "Federation node", "Data & consent", "Modules", "Brand & users", "Go-live review"];
  const [step, setStep] = React.useState(0);
  const [f, setF] = React.useState({
    name: "", country: "", tier: "Pilot", mou: false, baa: false,
    idp: "Microsoft AD FS", domain: "", mfa: true,
    mode: "on-prem", gpu: "1× A100", residency: "in-country",
    dp: "ε=2.0", consent: "refuse-without-policy", retention: "7 years",
    modules: ["glio"], brand: OB_BRANDS[0], initials: "",
    admins: [{ name: "", email: "", role: "Site administrator" }],
  });
  const set = (k, v) => setF((p) => ({ ...p, [k]: v }));
  const bp = f.brand.primary, ba = f.brand.accent;
  const monogram = f.initials || (f.name ? f.name.split(" ").map((w) => w[0]).join("").slice(0, 3).toUpperCase() : "NEW");

  const done = step === STEPS.length; // review submitted state
  const pct = Math.round((step / STEPS.length) * 100);

  const toggleModule = (slug) => set("modules", f.modules.includes(slug) ? f.modules.filter((x) => x !== slug) : [...f.modules, slug]);
  const canNext = step === 0 ? (f.name && f.mou) : true;

  return (
    <div className="view">
      <ViewHead
        eyebrow={<>AURORA · onboarding</>}
        title={<>Onboard a <em className="s">hospital</em></>}
        sub="A guided assessment that provisions a new tenant — brand, identity, federation, data governance, modules and its first administrators."
        actions={<button className="btn btn-sm" onClick={() => go("admin")}><Icon n="arrow" style={{ transform: "rotate(180deg)" }} /> Hospitals</button>}
      />

      <div className="grid" style={{ gridTemplateColumns: "240px 1fr", gap: 18, alignItems: "start" }}>
        {/* stepper */}
        <div className="card" style={{ padding: 16, position: "sticky", top: 0 }}>
          <div className="note" style={{ marginBottom: 12 }}>Setup · {pct}%</div>
          <div className="meter" style={{ marginBottom: 16 }}><div className="fill" style={{ width: pct + "%", background: ba }} /></div>
          <div className="flow">
            {STEPS.map((s, i) => (
              <div key={i} className={`flow-step ${i < step ? "done" : ""} ${i === step ? "active" : ""}`} style={{ "--accent": ba, cursor: i <= step ? "pointer" : "default" }} onClick={() => i <= step && setStep(i)}>
                <div className="node">{i < step ? "✓" : i + 1}</div>
                <div className="flow-bd"><b style={{ fontSize: 12.5 }}>{s}</b></div>
              </div>
            ))}
          </div>
          {/* live brand preview */}
          <div style={{ marginTop: 18, borderTop: "1px solid var(--line)", paddingTop: 14 }}>
            <div className="note" style={{ marginBottom: 8 }}>Live preview</div>
            <div style={{ borderRadius: 10, overflow: "hidden", border: "1px solid var(--line)" }}>
              <div style={{ height: 4, background: `linear-gradient(90deg, ${bp}, ${ba})` }} />
              <div style={{ display: "flex", alignItems: "center", gap: 9, padding: 10 }}>
                <span className="av-sm" style={{ background: bp, borderRadius: 7, fontSize: 10 }}>{monogram}</span>
                <div style={{ minWidth: 0 }}><div style={{ fontSize: 12.5, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{f.name || "Hospital name"}</div><div className="mono" style={{ fontSize: 9.5, color: "var(--muted)" }}>AURORA tenant</div></div>
              </div>
            </div>
          </div>
        </div>

        {/* step body */}
        <div>
          {done ? (
            <Card>
              <div style={{ textAlign: "center", padding: "30px 20px" }}>
                <div className="av-sm" style={{ width: 56, height: 56, borderRadius: 14, background: bp, fontSize: 18, margin: "0 auto 16px" }}>{monogram}</div>
                <h2 style={{ margin: "0 0 8px", fontSize: 24, letterSpacing: "-0.02em" }}>{f.name || "New hospital"} provisioned</h2>
                <p style={{ color: "var(--text-2)", maxWidth: 460, margin: "0 auto 20px", lineHeight: 1.55 }}>Tenant created under its own brand with {f.modules.length} module(s), {f.idp} identity, a {f.mode} federation node and {f.admins.filter((a) => a.name).length || 1} administrator(s). The federation key is being generated in the HSM; first sync runs on node registration.</p>
                <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
                  <button className="btn btn-pri" style={{ background: bp, borderColor: bp }} onClick={() => go("admin")}><Icon n="shield" /> Open hospital admin</button>
                  <button className="btn" onClick={() => { setStep(0); }}>Onboard another</button>
                </div>
              </div>
            </Card>
          ) : (
            <Card title={`Step ${step + 1} of ${STEPS.length} · ${STEPS[step]}`} sub={`${pct}% complete`}>
              {step === 0 && <ObLegal {...{ f, set }} />}
              {step === 1 && <ObIdentity {...{ f, set }} />}
              {step === 2 && <ObFederation {...{ f, set }} />}
              {step === 3 && <ObData {...{ f, set }} />}
              {step === 4 && <ObModules {...{ f, toggleModule, ba }} />}
              {step === 5 && <ObBrand {...{ f, set, monogram }} />}
              {step === 6 && <ObReview {...{ f, monogram }} />}

              <div style={{ display: "flex", gap: 8, marginTop: 22, borderTop: "1px solid var(--line)", paddingTop: 16 }}>
                {step > 0 && <button className="btn" onClick={() => setStep(step - 1)}><Icon n="arrow" style={{ transform: "rotate(180deg)" }} /> Back</button>}
                <button className="btn btn-pri" style={{ marginLeft: "auto", background: ba, borderColor: ba, opacity: canNext ? 1 : 0.5 }} disabled={!canNext}
                  onClick={() => setStep(step + 1)}>
                  {step === STEPS.length - 1 ? <>Provision tenant <Icon n="check" /></> : <>Continue <Icon n="arrow" /></>}
                </button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

// ── form primitives ────────────────────────────────────────────────
const OBField = ({ label, hint, children }) => (
  <div style={{ marginBottom: 16 }}>
    <label style={{ display: "block", fontSize: 12.5, fontWeight: 600, marginBottom: 6, letterSpacing: "-0.01em" }}>{label}</label>
    {children}
    {hint && <div className="note" style={{ marginTop: 5 }}>{hint}</div>}
  </div>
);
const inp = { width: "100%", height: 40, border: "1px solid var(--line)", borderRadius: 9, padding: "0 13px", font: "inherit", fontSize: 13.5, color: "var(--text)", background: "var(--panel-2)", outline: "none" };
const OBInput = (p) => <input {...p} style={{ ...inp, ...(p.style || {}) }} />;
const OBSelect = ({ value, onChange, options }) => (
  <select value={value} onChange={(e) => onChange(e.target.value)} style={{ ...inp, appearance: "auto" }}>
    {options.map((o) => <option key={o} value={o}>{o}</option>)}
  </select>
);
const OBToggle = ({ on, onClick, label }) => (
  <div onClick={onClick} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", padding: "9px 0" }}>
    <span style={{ width: 34, height: 19, borderRadius: 12, background: on ? "var(--ok)" : "var(--line-2)", position: "relative", flexShrink: 0, transition: "background .15s" }}><span style={{ position: "absolute", top: 2.5, left: on ? 17 : 2.5, width: 14, height: 14, borderRadius: "50%", background: "#fff", transition: "left .15s" }} /></span>
    <span style={{ fontSize: 13 }}>{label}</span>
  </div>
);
const ObGrid = ({ children }) => <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>{children}</div>;

function ObLegal({ f, set }) {
  return (
    <div>
      <ObGrid>
        <OBField label="Hospital / network name" hint="Required"><OBInput value={f.name} onChange={(e) => set("name", e.target.value)} placeholder="e.g. Karolinska Institutet" /></OBField>
        <OBField label="Country / region"><OBInput value={f.country} onChange={(e) => set("country", e.target.value)} placeholder="e.g. Sweden" /></OBField>
      </ObGrid>
      <OBField label="Partnership tier"><OBSelect value={f.tier} onChange={(v) => set("tier", v)} options={["Founding", "Pilot", "Associate"]} /></OBField>
      <div style={{ border: "1px solid var(--line)", borderRadius: 10, padding: "4px 14px", marginTop: 4 }}>
        <OBToggle on={f.mou} onClick={() => set("mou", !f.mou)} label="Memorandum of Understanding signed (required to proceed)" />
        <div style={{ borderTop: "1px solid var(--line)" }} />
        <OBToggle on={f.baa} onClick={() => set("baa", !f.baa)} label="Business Associate / Data Processing Agreement executed" />
      </div>
    </div>
  );
}
function ObIdentity({ f, set }) {
  return (
    <div>
      <OBField label="Identity provider" hint="Per-clinician identity is written into every audit entry."><OBSelect value={f.idp} onChange={(v) => set("idp", v)} options={["Microsoft AD FS", "Okta", "Keycloak (self-host)", "Google Workspace"]} /></OBField>
      <OBField label="Login domain"><OBInput value={f.domain} onChange={(e) => set("domain", e.target.value)} placeholder="clinicians@hospital.org" /></OBField>
      <div style={{ border: "1px solid var(--line)", borderRadius: 10, padding: "4px 14px" }}>
        <OBToggle on={f.mfa} onClick={() => set("mfa", !f.mfa)} label="Require multi-factor authentication for all roles" />
      </div>
    </div>
  );
}
function ObFederation({ f, set }) {
  return (
    <div>
      <OBField label="Federation mode" hint="On-prem and air-gapped need no inbound ports — outbound mTLS only.">
        <div style={{ display: "flex", gap: 8 }}>
          {["on-prem", "federated", "air-gapped", "hosted"].map((mode) => (
            <button key={mode} className={`btn btn-sm ${f.mode === mode ? "btn-pri" : ""}`} onClick={() => set("mode", mode)}>{mode}</button>
          ))}
        </div>
      </OBField>
      <ObGrid>
        <OBField label="GPU class"><OBSelect value={f.gpu} onChange={(v) => set("gpu", v)} options={["CPU-only", "1× RTX 4090", "1× A100", "2× A100", "4× H100"]} /></OBField>
        <OBField label="Data residency"><OBSelect value={f.residency} onChange={(v) => set("residency", v)} options={["in-country", "in-region", "on-prem only"]} /></OBField>
      </ObGrid>
    </div>
  );
}
function ObData({ f, set }) {
  return (
    <div>
      <ObGrid>
        <OBField label="Differential-privacy budget"><OBSelect value={f.dp} onChange={(v) => set("dp", v)} options={["ε=1.0", "ε=2.0", "ε=4.0", "off"]} /></OBField>
        <OBField label="Audit retention"><OBSelect value={f.retention} onChange={(v) => set("retention", v)} options={["3 years", "7 years", "10 years", "indefinite"]} /></OBField>
      </ObGrid>
      <OBField label="Consent enforcement" hint="Consent metadata is a first-class object."><OBSelect value={f.consent} onChange={(v) => set("consent", v)} options={["refuse-without-policy", "warn-only", "research-opt-in"]} /></OBField>
      <div className="note warn-note">Equity gate is enforced and locked for all tenants — releases below threshold are blocked, not warned.</div>
    </div>
  );
}
function ObModules({ f, toggleModule, ba }) {
  return (
    <div>
      <div className="note" style={{ marginBottom: 12 }}>Enable the disease modules this hospital will run. Each can be adopted independently.</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {window.AURORA_DATA.modules.map((m) => {
          const on = f.modules.includes(m.slug);
          return (
            <div key={m.slug} onClick={() => toggleModule(m.slug)} style={{ display: "flex", alignItems: "center", gap: 11, padding: "11px 13px", borderRadius: 10, border: `1px solid ${on ? ba : "var(--line)"}`, background: on ? "var(--panel-2)" : "transparent", cursor: "pointer" }}>
              <span className="av-sm" style={{ width: 30, height: 30, borderRadius: 8, background: m.accent, fontSize: 10 }}>{m.idx}</span>
              <div style={{ flex: 1, minWidth: 0 }}><div style={{ fontWeight: 600, fontSize: 13, letterSpacing: "-0.01em" }}>{m.name}</div><div className="mono" style={{ fontSize: 10, color: "var(--muted)" }}>{m.code} · {m.subsystems.length} subs</div></div>
              {on ? <Icon n="check" style={{ width: 16, color: ba }} /> : <span style={{ width: 16, height: 16, borderRadius: 4, border: "1px solid var(--line-2)" }} />}
            </div>
          );
        })}
      </div>
    </div>
  );
}
function ObBrand({ f, set, monogram }) {
  return (
    <div>
      <OBField label="Brand palette" hint="Applied across this tenant's surfaces and reports.">
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {OB_BRANDS.map((b, i) => {
            const on = f.brand.primary === b.primary;
            return (
              <div key={i} onClick={() => set("brand", b)} style={{ width: 64, height: 44, borderRadius: 10, background: `linear-gradient(120deg, ${b.primary}, ${b.accent})`, cursor: "pointer", border: on ? "2px solid var(--text)" : "2px solid transparent", boxShadow: "var(--shadow)" }} />
            );
          })}
        </div>
      </OBField>
      <ObGrid>
        <OBField label="Logo monogram" hint="Up to 3 letters"><OBInput value={f.initials} onChange={(e) => set("initials", e.target.value.toUpperCase().slice(0, 3))} placeholder={monogram} /></OBField>
        <OBField label="First administrator — name"><OBInput value={f.admins[0].name} onChange={(e) => set("admins", [{ ...f.admins[0], name: e.target.value }])} placeholder="Dr. A. Administrator" /></OBField>
      </ObGrid>
      <OBField label="First administrator — email & role">
        <div style={{ display: "flex", gap: 8 }}>
          <OBInput value={f.admins[0].email} onChange={(e) => set("admins", [{ ...f.admins[0], email: e.target.value }])} placeholder="admin@hospital.org" style={{ flex: 2 }} />
          <select value={f.admins[0].role} onChange={(e) => set("admins", [{ ...f.admins[0], role: e.target.value }])} style={{ ...inp, flex: 1, appearance: "auto" }}>
            {["Site administrator", "Delegated admin", "Security officer", "Data steward", "Clinical lead"].map((r) => <option key={r}>{r}</option>)}
          </select>
        </div>
      </OBField>
    </div>
  );
}
function ObReview({ f, monogram }) {
  const rows = [
    ["Hospital", f.name || "—"], ["Region", f.country || "—"], ["Tier", f.tier],
    ["MoU / DPA", `${f.mou ? "signed" : "pending"} / ${f.baa ? "executed" : "pending"}`],
    ["Identity", `${f.idp}${f.mfa ? " · MFA required" : ""}`],
    ["Federation", `${f.mode} · ${f.gpu} · ${f.residency}`],
    ["Data policy", `${f.dp} · consent ${f.consent} · retain ${f.retention}`],
    ["Modules", f.modules.map((s) => window.AURORA_DATA.modules.find((m) => m.slug === s).code.replace("AURORA-", "")).join(", ")],
    ["Brand", `${monogram} · ${f.brand.primary}`],
    ["First admin", `${f.admins[0].name || "—"} · ${f.admins[0].role}`],
  ];
  return (
    <div>
      <div className="note" style={{ marginBottom: 12 }}>Review the tenant configuration. Provisioning generates the federation key, applies the brand, and writes the first entries to the site audit log.</div>
      <div className="kv" style={{ gridTemplateColumns: "150px 1fr" }}>
        {rows.map(([k, v], i) => (<div key={i} style={{ borderBottom: i >= rows.length - 1 ? "none" : undefined }}><div className="k">{k}</div><div className="v">{v}</div></div>))}
      </div>
    </div>
  );
}
