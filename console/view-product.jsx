// ════════════════════════════════════════════════════════════════════
//  VIEW · USE CASES — I/O spec, workflow, integrations
//  Mirrors the per-module product spec (inputs → pipeline → outputs).
// ════════════════════════════════════════════════════════════════════
window.AV = window.AV || {};

// generic builders (replace with real per-module content when cloning)
const buildIO = (m) => {
  const D = m.code.replace("AURORA-", "");
  return {
    inputs: [
      { l: "Imaging", v: "Multi-parametric MRI / CT as the case demands. Core sequences required; advanced sequences improve the foundation pass but are not gating.", fmt: "DICOM 3.0 · PACS C-STORE" },
      { l: "Molecular / lab", v: "Disease-relevant panel wired into the diagnostic synthesiser when present; the module degrades gracefully without it.", fmt: "HL7v2 ORU · FHIR Observation" },
      { l: "Operative / clinical", v: "Operative notes, procedure metadata and follow-up. None gating; all improve longitudinal performance.", fmt: "FHIR Procedure + free text" },
      { l: "Consent seed", v: "Cohort consent metadata. AURORA refuses to render predictions on records lacking the appropriate cohort policy.", fmt: "AURORA audit (NDJSON)" },
    ],
    outputs: [
      { l: "Integrated diagnosis", v: "Synthesised, guideline-aligned report with confidence per axis and the audit chain back to source assays.", fmt: "Signed PDF + JSON SR → PACS" },
      { l: "Quantitative field / plan", v: "Per-voxel or per-level quantitative output with calibrated σ; solver state checkpointed for re-runs.", fmt: "DICOM SEG + NIfTI + sidecar" },
      { l: "Decision support", v: "Ranked, explainable recommendations. Decision-support, never an order. Every override logged with reason.", fmt: "FHIR ServiceRequest · JSON" },
      { l: "Audit envelope", v: "Hash chain: inputs → weights → config → outputs. Re-runnable and signed by the site's federation key.", fmt: "NDJSON + Sigstore" },
    ],
    integrations: [
      { k: "PACS", v: "DICOM C-STORE inbound + C-FIND outbound · STOW-RS for derived series · SR attachment on signed reports." },
      { k: "EHR / FHIR", v: "FHIR R4 — DiagnosticReport, Condition, Observation, Procedure, ServiceRequest. OAuth2 client credentials, SMART scopes." },
      { k: "Auth", v: "OIDC — AD FS, Okta, Keycloak. Per-clinician identity in every override log entry; role mapping per RFC." },
      { k: "Provenance", v: "Sigstore-signed weights + container digests. Per-site federation key in Vault, KMS or HSM. Audit log signed before next render." },
      { k: "Air-gap", v: "OCI tarball + offline Helm chart. Identical outputs to networked deploys on identical inputs; bytewise reproducible." },
      { k: "Telemetry", v: "Off by default. When enabled, opt-in per-site; payload schema in the module's ETHIC RFC, reviewed by the patient-advocate council." },
    ],
  };
};

window.AV.product = function Product({ m, ops }) {
  const a = m.accent;
  const io = buildIO(m);
  const [tab, setTab] = React.useState("workflow");

  // workflow from subsystems firing order
  const steps = m.subsystems.slice(0, 8).map((s, i) => ({
    code: s.code, name: s.name, desc: s.desc,
    lat: i === 0 ? "≤1s" : `${2 + i * 2}–${5 + i * 2}s`,
    done: s.status === "live", active: s.status === "beta",
  }));

  const personas = m.personas || [];

  return (
    <div className="view">
      <ViewHead
        eyebrow={<>{m.code} · use cases</>}
        title={<>What the module <em className="s">produces</em>, end-to-end</>}
        sub={`${m.code} reads the inputs a real ${m.name.toLowerCase()} case already produces, runs them through ${m.subsystems.length} subsystems on a shared substrate, and returns explainable artefacts. Every override is logged.`}
      />

      {/* personas */}
      <div className="grid g4" style={{ marginBottom: 18 }}>
        {personas.map((p, i) => (
          <div key={i} className="card" style={{ padding: "13px 15px" }}>
            <div className="mono" style={{ fontSize: 9.5, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 6 }}>Persona {i + 1}</div>
            <div style={{ fontWeight: 600, fontSize: 14, letterSpacing: "-0.01em" }}>{p}</div>
          </div>
        ))}
      </div>

      <Tabs underline value={tab} onChange={setTab} items={[
        { k: "workflow", label: "Workflow" }, { k: "inputs", label: "Inputs" },
        { k: "outputs", label: "Outputs" }, { k: "integrations", label: "Integrations" },
      ]} />

      {tab === "workflow" && (
        <Card title="Case pipeline" sub={`${steps.length} stages`}>
          <div className="flow">
            {steps.map((s, i) => (
              <div key={i} className={`flow-step ${s.done ? "done" : ""} ${s.active ? "active" : ""}`}>
                <div className="node">{s.done ? "✓" : i + 1}</div>
                <div className="flow-bd">
                  <b>{s.name} <span className="lat">· {s.code} · {s.lat}</span></b>
                  <p>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {(tab === "inputs" || tab === "outputs") && (
        <div className="grid g2" style={{ alignItems: "start" }}>
          {io[tab].map((row, i) => (
            <Card key={i} title={row.l} sub={tab === "inputs" ? "ingest" : "emit"}>
              <p style={{ margin: "0 0 12px", fontSize: 13, color: "var(--text-2)", lineHeight: 1.55 }}>{row.v}</p>
              <div className="note" style={{ borderTop: "1px solid var(--line)", paddingTop: 11, color: a }}><Icon n="doc" style={{ width: 13 }} /> {row.fmt}</div>
            </Card>
          ))}
        </div>
      )}

      {tab === "integrations" && (
        <Card flush>
          <table className="tbl">
            <thead><tr><th>Surface</th><th>Contract</th></tr></thead>
            <tbody>
              {io.integrations.map((it, i) => (
                <tr key={i} style={{ cursor: "default" }}>
                  <td style={{ width: 160 }}><b>{it.k}</b></td>
                  <td style={{ color: "var(--text-2)", lineHeight: 1.5 }}>{it.v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}

      <div className="note" style={{ marginTop: 16 }}>↻ When cloning this template, replace <code style={{ fontFamily: "var(--mono)" }}>buildIO()</code> with the module's real I/O contract — see the Guides page.</div>
    </div>
  );
};
