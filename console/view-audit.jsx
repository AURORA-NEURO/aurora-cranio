// ════════════════════════════════════════════════════════════════════
//  VIEW · AUDIT — override log, provenance chain, equity, consent
// ════════════════════════════════════════════════════════════════════
window.AV = window.AV || {};

window.AV.audit = function Audit({ m, ops }) {
  const a = m.accent;
  const [tab, setTab] = React.useState("overrides");

  // override log derived from flagged/override cases
  const log = ops.cases.filter((c) => c.overrides > 0).slice(0, 14).map((c, i) => ({
    ts: `2026-05-${String(28 - (i % 27)).padStart(2, "0")} ${String(9 + (i % 12)).padStart(2, "0")}:${String((i * 7) % 60).padStart(2, "0")}`,
    who: c.clinician, sub: m.subsystems[i % m.subsystems.length].code, caseId: c.id,
    reason: ["disagree with margin extent", "molecular result pending", "imaging artefact", "clinical override per MDT", "consent scope change"][i % 5],
  }));

  // provenance chain
  const chain = [
    { k: "Inputs", v: "DICOM study 1.2.840…4871 · molecular ORU · consent cohort-2026", hash: "a3f1c9e" },
    { k: "Weights", v: `${m.code} foundation ${ops.models[0].version} · ${ops.models[0].whash}`, hash: ops.models[0].whash },
    { k: "Config", v: "runtime pilot.21 · equity-gate on · telemetry off", hash: "7b2d04a" },
    { k: "Outputs", v: "integrated report · field SEG · audit envelope", hash: "e91f6c2" },
  ];

  return (
    <div className="view">
      <ViewHead
        eyebrow={<>{m.code} · audit & provenance</>}
        title={<>Every output <em className="s">traces back</em></>}
        sub="Hash chain from inputs → weights → config → outputs, signed by the site's federation key. Every override logged with a reason before the next render."
        actions={<button className="btn btn-sm"><Icon n="download" /> Export NDJSON</button>}
      />

      <div className="grid g4" style={{ marginBottom: 16 }}>
        <Kpi edge label="Override rate" icon="override" value="100" unit="%" foot="auditable" />
        <Kpi label="Equity gates" icon="equity" value={ops.equityPass} unit={`/ ${ops.equityTotal}`} foot="passing" />
        <Kpi label="Signed runs" icon="lock" value="100" unit="%" foot="sigstore" />
        <Kpi label="Consent refusals" icon="shield" value={ops.cases.filter((c) => c.consent === "pending").length} foot="records gated" />
      </div>

      <Tabs underline value={tab} onChange={setTab} items={[
        { k: "overrides", label: "Override log" }, { k: "provenance", label: "Provenance chain" },
        { k: "equity", label: "Equity audit" }, { k: "consent", label: "Consent ledger" },
      ]} />

      {tab === "overrides" && (
        <Card flush>
          <table className="tbl">
            <thead><tr><th>Timestamp</th><th>Clinician</th><th>Subsystem</th><th>Case</th><th>Logged reason</th></tr></thead>
            <tbody>
              {log.map((l, i) => (
                <tr key={i} style={{ cursor: "default" }}>
                  <td className="num muted">{l.ts}</td>
                  <td><div style={{ display: "flex", alignItems: "center", gap: 7 }}><Avatar name={l.who} />{l.who}</div></td>
                  <td><code>{l.sub}</code></td>
                  <td><code>{l.caseId}</code></td>
                  <td style={{ color: "var(--text-2)" }}>{l.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}

      {tab === "provenance" && (
        <div className="grid g2" style={{ alignItems: "start" }}>
          <Card title="Run hash chain" sub="re-runnable">
            <div className="flow">
              {chain.map((c, i) => (
                <div key={i} className={`flow-step done`}>
                  <div className="node"><Icon n="lock" style={{ width: 13 }} /></div>
                  <div className="flow-bd"><b>{c.k} <span className="lat">· {c.hash}</span></b><p>{c.v}</p></div>
                </div>
              ))}
            </div>
          </Card>
          <Card title="Signature" sub="sigstore">
            <div className="kv">
              <div><div className="k">Signed by</div><div className="v">{m.slug}.kar federation key (HSM)</div></div>
              <div><div className="k">Algorithm</div><div className="v">ECDSA P-256 · Rekor transparency log</div></div>
              <div><div className="k">Reproducible</div><div className="v"><Icon n="check" style={{ width: 13, color: "var(--ok)" }} /> bytewise on identical inputs</div></div>
              <div style={{ borderBottom: "none" }}><div className="k">Verified</div><div className="v">2 min ago · chain intact</div></div>
            </div>
            <CodePane label="verify"># verify the run signature
aurora audit verify runs/{m.slug}-0007 --rekor
# → chain intact · 4 links · signed {m.slug}.kar</CodePane>
          </Card>
        </div>
      )}

      {tab === "equity" && (
        <Card title="Equity-as-loss audit" sub="release gate" right={<span className="note">{ops.equityPass}/{ops.equityTotal} pass</span>}>
          <table className="tbl">
            <thead><tr><th>Stratum</th><th className="rt">Performance</th><th>Threshold 0.78</th><th>Gate</th></tr></thead>
            <tbody>
              {ops.strata.map((s, i) => (
                <tr key={i} style={{ cursor: "default" }}>
                  <td><b>{s.k}</b></td>
                  <td className="rt num">{s.v.toFixed(2)}</td>
                  <td style={{ width: 220 }}><Meter pct={s.v * 100} color={s.pass ? "var(--ok)" : "var(--bad)"} /></td>
                  <td><Pill s={s.pass ? "pass" : "fail"}>{s.pass ? "pass" : "block"}</Pill></td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="card-b"><div className="note warn-note">Releases failing the threshold are blocked, not warned. Threshold revisable only by RFC.</div></div>
        </Card>
      )}

      {tab === "consent" && (
        <Card title="Consent ledger" sub="first-class object" flush>
          <table className="tbl">
            <thead><tr><th>Case</th><th>Cohort policy</th><th>Scope</th><th>Status</th></tr></thead>
            <tbody>
              {ops.cases.slice(0, 12).map((c) => (
                <tr key={c.id} style={{ cursor: "default" }}>
                  <td><code>{c.id}</code></td>
                  <td><code>{c.consent}</code></td>
                  <td style={{ color: "var(--text-2)" }}>{c.consent === "research-opt-in" ? "research + clinical" : c.consent === "pending" ? "— awaiting" : "clinical decision-support"}</td>
                  <td>{c.consent === "pending" ? <Pill s="warn">gated</Pill> : <Pill s="pass">active</Pill>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}
    </div>
  );
};

// ════════════════════════════════════════════════════════════════════
//  VIEW · INSTALL — multi-env, hardware matrix, migration
// ════════════════════════════════════════════════════════════════════
window.AV.install = function Install({ m }) {
  const a = m.accent;
  const [tab, setTab] = React.useState("pip");
  const blocks = {
    pip: [
      `# 1 · install\npip install aurora-${m.slug}\n# or full stack\npip install aurora-neuro[${m.slug}]`,
      `# 2 · verify\naurora doctor ${m.slug}\n# → ${m.code}  ✓ python ≥3.11  ✓ torch ≥2.4\n# → models      ✓ ${m.subsystems.length} loaded\n# → license     MIT @ public alpha`,
      `# 3 · try a public case\nfrom aurora.${m.slug} import load_case, diagnose\ncase = load_case("bench/${m.slug}/case-0007")\nprint(diagnose(case).summary)`,
    ],
    docker: [
      `# 1 · pull (pilot registry)\ndocker pull ghcr.io/aurora-collective/aurora-${m.slug}:pilot`,
      `# 2 · run with DICOM endpoint\ndocker run --gpus all -p 8088:8088 \\\n  -e AURORA_FEDERATION=on-prem \\\n  -e AURORA_DICOM=dicom.hospital.local:11112 \\\n  ghcr.io/aurora-collective/aurora-${m.slug}:pilot`,
      `# 3 · health\ncurl -s localhost:8088/healthz | jq\n# → { "module":"aurora-${m.slug}", "ready":true }`,
    ],
    helm: [
      `# 1 · add chart\nhelm repo add aurora https://charts.aurora.health\nhelm repo update`,
      `# 2 · install into cluster\nhelm install ${m.slug} aurora/aurora-${m.slug} \\\n  --namespace aurora --create-namespace \\\n  --set federation.mode=on-prem \\\n  --set ethics.equityGate=true`,
      `# 3 · air-gapped\nhelm install ${m.slug} ./aurora-${m.slug}-pilot.tgz --set offline=true`,
    ],
    rust: [
      `# numerical core (Rust kernels, signing, PDE)\ncargo add aurora-core --features "${m.slug},signing"\ncargo add aurora-${m.slug}`,
      `// solve on a phantom\nuse aurora_${m.slug.replace(/-/g, "_")}::Solver;\nlet field = Solver::default().solve(&phantom, 180.0, 0.5)?;`,
    ],
  };

  return (
    <div className="view">
      <ViewHead
        eyebrow={<>{m.code} · install</>}
        title={<>From <code style={{ fontFamily: "var(--mono)", fontSize: "0.7em" }}>pip install</code> to a hospital deploy <em className="s">in an afternoon</em></>}
        sub="Pilot partners today on private registries. At public alpha the same images, weights and signatures ship under MIT. Same code, same model cards, same audit story."
        actions={<button className="btn btn-pri btn-sm"><Icon n="download" /> Full download grid</button>}
      />

      <div className="grid g4" style={{ marginBottom: 18 }}>
        <Kpi edge label="Hardware" value="CPU → H100" foot="NVIDIA · AMD · Apple" />
        <Kpi label="OS" value="4" unit="targets" foot="Linux · macOS · Win · WSL" />
        <Kpi label="Deploys" value="4" unit="modes" foot="Cloud · on-prem · air-gap · edge" />
        <Kpi label="Telemetry" value="Off" foot="opt-in only" />
      </div>

      <Tabs value={tab} onChange={setTab} items={[
        { k: "pip", label: "Python" }, { k: "docker", label: "Docker" }, { k: "helm", label: "Kubernetes" }, { k: "rust", label: "Rust" },
      ]} />

      <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 880, marginTop: 16 }}>
        {blocks[tab].map((b, i) => (
          <CodePane key={i} label={`step ${i + 1} of ${blocks[tab].length}`}>{b}</CodePane>
        ))}
      </div>

      <div className="grid g3" style={{ marginTop: 22, alignItems: "start" }}>
        <Card title="Hardware footprint"><p style={{ margin: 0, fontSize: 13, color: "var(--text-2)", lineHeight: 1.6 }}>Designed to run on hardware already inside hospital networks. CPU-only inference for the lighter subsystems; a single recent GPU handles a case under {m.stats.latency.replace("target ", "")}.</p></Card>
        <Card title="Networking & consent"><p style={{ margin: 0, fontSize: 13, color: "var(--text-2)", lineHeight: 1.6 }}>Federated deploys need no open inbound ports — outbound mTLS only. Patient data never traverses the federation. Subsystems with a consent dependency refuse records lacking a cohort policy.</p></Card>
        <Card title="Migration path"><p style={{ margin: 0, fontSize: 13, color: "var(--text-2)", lineHeight: 1.6 }}>Install alongside, compare on a held-out cohort for one quarter, move read-only surfaces over, then decide on the rest. Reversibility is a design goal — nothing creates lock-in.</p></Card>
      </div>
    </div>
  );
};
