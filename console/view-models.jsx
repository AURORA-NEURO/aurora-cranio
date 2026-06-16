window.AV = window.AV || {};

const artefactOf = (code) => {
  const t = code.toLowerCase();
  if (/ai|found/.test(t)) return "case representation (.aurora.case)";
  if (/infil|physic|pde|flow|csf/.test(t)) return "field (DICOM SEG + NIfTI + σ)";
  if (/diag/.test(t)) return "signed report (PDF + JSON SR)";
  if (/rad|forge|repair|release|decide/.test(t)) return "plan draft (DICOM-RT / JSON)";
  if (/clin|trial/.test(t)) return "routing list (FHIR ServiceRequest)";
  if (/ethic/.test(t)) return "equity audit (JSON + NDJSON)";
  return "structured artefact (JSON)";
};

window.AV.subsystems = function Subsystems({ m, ops, go }) {
  const a = m.accent;
  return (
    <div className="view">
      <ViewHead
        eyebrow={<>{m.code} · the stack</>}
        title={<>{m.subsystems.length} subsystems. <em className="s">Each independently useful.</em></>}
        sub={`Every ${m.code} subsystem can be adopted alone or as a bundle. Each ships its own model card, eval and one-command install. Numbering reflects firing order on a real case.`}
        actions={<button className="btn btn-pri btn-sm" onClick={() => go("models")}><Icon n="cpu" /> Foundation models</button>}
      />

      <div className="grid g3" style={{ marginBottom: 18 }}>
        <Kpi edge label="Live" value={m.subsystems.filter((s) => s.status === "live").length} foot="in pilot" />
        <Kpi label="Beta" value={m.subsystems.filter((s) => s.status === "beta").length} foot="in build" />
        <Kpi label="Planned" value={m.subsystems.filter((s) => s.status === "soon").length} foot="spec frozen" />
      </div>

      {m.subsystems.map((s, i) => {
        const mdl = ops.models[i];
        return (
          <Accordion key={s.id} defaultOpen={i === 0}
            head={
              <>
                <span className="swatch" style={{ width: 30, height: 30, borderRadius: 8, background: a, display: "grid", placeItems: "center", color: "#fff", fontFamily: "var(--mono)", fontSize: 11, fontWeight: 600, flexShrink: 0 }}>{s.id}</span>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontWeight: 600, fontSize: 14, letterSpacing: "-0.01em", display: "flex", alignItems: "center", gap: 9 }}>{s.name} <code style={{ fontSize: 10.5, color: "var(--muted)" }}>{s.code}</code></div>
                  <div style={{ fontSize: 12.5, color: "var(--text-2)", marginTop: 2 }}>{s.desc}</div>
                </div>
                <span style={{ marginLeft: "auto", display: "flex", gap: 10, alignItems: "center" }}><Pill s={s.status} /></span>
              </>
            }
          >
            <div className="grid g3" style={{ gap: 16, alignItems: "start" }}>
              <div className="span2">
                <div className="kv">
                  <div><div className="k">Model kind</div><div className="v">{mdl.kind}</div></div>
                  <div><div className="k">Parameters</div><div className="v">{mdl.params} · {mdl.quant}</div></div>
                  <div><div className="k">Artefact out</div><div className="v">{artefactOf(s.code)}</div></div>
                  <div><div className="k">Eval</div><div className="v">eval {mdl.eval} · AUC {mdl.auc} · ECE {mdl.ece}</div></div>
                  <div><div className="k">Provenance</div><div className="v" style={{ display: "flex", alignItems: "center", gap: 7 }}>{mdl.signed ? <><Icon n="lock" style={{ width: 13, color: "var(--ok)" }} /> sigstore-signed · weights {mdl.whash}</> : <span style={{ color: "var(--warn)" }}>unsigned · staging only</span>}</div></div>
                </div>
              </div>
              <div className="grid" style={{ gap: 10 }}>
                <Card title="Eval" sub={`v${mdl.version}`}>
                  <BarRow name="Eval score" pct={Math.round(mdl.eval * 100)} color={a} />
                  <BarRow name="AUC" pct={Math.round(mdl.auc * 100)} color={a} />
                  <div className="bar-row" style={{ marginTop: 12 }}><span>Drift (30d)</span><span className="num" style={{ color: mdl.drift > 0.5 ? "var(--warn)" : "var(--ok)" }}>{mdl.drift > 0 ? "+" : ""}{mdl.drift}σ</span></div>
                </Card>
                <div style={{ display: "flex", gap: 8 }}>
                  <button className="btn btn-sm" style={{ flex: 1 }} onClick={() => go("models")}><Icon n="model" /> Model card</button>
                  <button className="btn btn-sm" style={{ flex: 1 }} onClick={() => go("install")}><Icon n="download" /> Install</button>
                </div>
              </div>
            </div>
          </Accordion>
        );
      })}
    </div>
  );
};

window.AV.models = function Models({ m, ops }) {
  const a = m.accent;
  const meta = (window.AURORA_DATA && window.AURORA_DATA.meta) || {};
  const foundation = ops.foundation || ops.models.find((x) => /AI|FOUND/.test(x.code)) || ops.models[0];
  const [sel, setSel] = React.useState(foundation.code);
  const mdl = ops.models.find((x) => x.code === sel) || foundation;

  return (
    <div className="view">
      <ViewHead
        eyebrow={<>{m.code} · model registry</>}
        title={<>Foundation & <em className="s">subsystem models</em></>}
        sub="Every weight versioned, pinned and re-runnable. Foundation model distilled to clinic-edge sizes; task heads consume its representation."
        actions={<><button className="btn btn-sm"><Icon n="hist" /> Versions</button><button className="btn btn-pri btn-sm"><Icon n="download" /> Pull weights</button></>}
      />

      <Card className="span2" style={{ marginBottom: 16, borderTop: `2px solid ${a}` }}>
        <div className="card-b" style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 22, padding: 20 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <span className="chip"><span className="d" style={{ background: a }} />{meta.foundationChip || "Foundation"}</span>
              <code style={{ fontSize: 11, color: "var(--muted)" }}>{foundation.code}</code>
              <Pill s={foundation.status} />
            </div>
            <h2 style={{ margin: "0 0 8px", fontSize: 22, letterSpacing: "-0.02em" }}>{m.code} {meta.foundationNoun || "foundation model"}</h2>
            <p style={{ color: "var(--text-2)", fontSize: 13.5, lineHeight: 1.55, margin: "0 0 16px", maxWidth: 460 }}>
              {foundation.blurb || <>Vision-language-omics transformer pre-trained on permissively-licensed neuro corpora, with a {m.name.toLowerCase()}-conditioned head. Distilled to {foundation.params} with {foundation.quant} quantisation — a single RTX-class GPU handles a case under {m.stats.latency.replace("target ", "")}.</>}
            </p>
            <div className="grid g4" style={{ gap: 12 }}>
              <div><div className="mono" style={{ fontSize: 9.5, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--muted)" }}>Params</div><div style={{ fontSize: 19, fontWeight: 600 }}>{foundation.params}</div></div>
              <div><div className="mono" style={{ fontSize: 9.5, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--muted)" }}>Train set</div><div style={{ fontSize: 19, fontWeight: 600 }}>{foundation.trainN}</div></div>
              <div><div className="mono" style={{ fontSize: 9.5, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--muted)" }}>Sites</div><div style={{ fontSize: 19, fontWeight: 600 }}>{foundation.sites}</div></div>
              <div><div className="mono" style={{ fontSize: 9.5, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--muted)" }}>Version</div><div style={{ fontSize: 19, fontWeight: 600 }}>{foundation.version}</div></div>
            </div>
          </div>
          <div className="grid" style={{ gap: 12, alignContent: "start" }}>
            <Card title="Eval" sub="held-out">
              <BarRow name="Eval score" pct={Math.round(foundation.eval * 100)} color={a} />
              <BarRow name="AUC" pct={Math.round(foundation.auc * 100)} color={a} />
              <BarRow name="Calibration (1−ECE)" pct={Math.round((1 - foundation.ece) * 100)} color={a} />
            </Card>
            <div className="kv" style={{ border: "1px solid var(--line)", borderRadius: 10, padding: "0 14px" }}>
              <div><div className="k">Signed</div><div className="v"><Icon n="lock" style={{ width: 13, color: "var(--ok)" }} /> sigstore · {foundation.whash}</div></div>
              <div style={{ borderBottom: "none" }}><div className="k">License</div><div className="v">{(m.stats && m.stats.license) || "MIT"}</div></div>
            </div>
          </div>
        </div>
      </Card>

      <Card title="Model registry" sub={`${ops.models.length} models`} flush>
        <table className="tbl">
          <thead><tr><th>Code</th><th>Name</th><th>Kind</th><th>Params</th><th>Version</th><th className="rt">Eval</th><th className="rt">AUC</th><th className="rt">ECE</th><th className="rt">Drift</th><th>Signed</th><th>Status</th></tr></thead>
          <tbody>
            {ops.models.map((x) => (
              <tr key={x.code} onClick={() => setSel(x.code)} style={{ background: sel === x.code ? "var(--panel-2)" : undefined }}>
                <td><code className="strong">{x.code}</code></td>
                <td><b>{x.name}</b></td>
                <td style={{ fontSize: 12 }}>{x.kind}</td>
                <td className="num">{x.params}</td>
                <td className="num muted">{x.version}</td>
                <td className="rt num">{x.eval}</td>
                <td className="rt num">{x.auc}</td>
                <td className="rt num">{x.ece}</td>
                <td className="rt num" style={{ color: x.drift > 0.5 ? "var(--warn)" : "var(--text-2)" }}>{x.drift > 0 ? "+" : ""}{x.drift}σ</td>
                <td>{x.signed ? <Icon n="lock" style={{ width: 14, color: "var(--ok)" }} /> : <span className="pill warn"><span className="d" />no</span>}</td>
                <td><Pill s={x.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <div className="note" style={{ marginTop: 14 }}>⚠ Pilot weights on private registries · MIT public registries open at public alpha (Q4 2026) · pinned weights, containers and data hashes.</div>
    </div>
  );
};
