// ════════════════════════════════════════════════════════════════════
//  VIEW · GUIDES — getting started, how-to, and the TEMPLATE GUIDE
//  This is the documentation that makes the console clone-able to any
//  module OR subsystem devtool.
// ════════════════════════════════════════════════════════════════════
window.AV = window.AV || {};

window.AV.guides = function Guides({ m, go }) {
  const [tab, setTab] = React.useState("start");
  const a = m.accent;

  const cards = [
    { ic: "install", t: "Install a module", d: "pip / docker / helm / rust, in one afternoon.", go: "install" },
    { ic: "pulse", t: "Run a case", d: "Bind a study, watch the pipeline, sign the report.", go: "clinical" },
    { ic: "cpu", t: "Pull model weights", d: "Versioned, signed, re-runnable foundation models.", go: "models" },
    { ic: "audit", t: "Read an audit trail", d: "Trace any output back to inputs, weights and config.", go: "audit" },
    { ic: "equity", t: "Pass the equity gate", d: "Equity-as-loss thresholds that block, not warn.", go: "audit" },
    { ic: "fed", t: "Onboard a federation site", d: "Outbound mTLS, no inbound ports, data stays put.", go: "admin" },
  ];

  return (
    <div className="view">
      <ViewHead
        eyebrow={<>AURORA · guides</>}
        title={<>Guides & the <em className="s">template</em></>}
        sub="How to use the console — and how to clone it for any module or subsystem devtool. This page is the contract between the template and your data."
      />

      <Tabs underline value={tab} onChange={setTab} items={[
        { k: "start", label: "Getting started" }, { k: "howto", label: "How-to guides" },
        { k: "template", label: "Clone the template" }, { k: "api", label: "Data contract" },
      ]} />

      {tab === "start" && (
        <div className="grid g3">
          {cards.map((c, i) => (
            <div key={i} className="card" style={{ padding: 18, cursor: "pointer" }} onClick={() => go(c.go)}>
              <div className="feed-ic" style={{ width: 34, height: 34, marginBottom: 12, color: a, borderColor: a + "44" }}><Icon n={c.ic} /></div>
              <div style={{ fontWeight: 600, fontSize: 15, letterSpacing: "-0.01em", marginBottom: 5 }}>{c.t}</div>
              <p style={{ margin: 0, fontSize: 13, color: "var(--text-2)", lineHeight: 1.5 }}>{c.d}</p>
              <div className="note" style={{ marginTop: 12, color: a }}>Open <Icon n="arrow" style={{ width: 13 }} /></div>
            </div>
          ))}
        </div>
      )}

      {tab === "howto" && (
        <div className="grid g2" style={{ alignItems: "start" }}>
          <Card title="Adopt one subsystem at a time">
            <div className="doc" style={{ fontSize: 13.5 }}>
              <p>Every subsystem can be installed and used independently. Most sites adopt the diagnostic and foundation subsystems first, then add the heavier solvers as workflows mature.</p>
              <ul>
                <li>Install alongside your existing vendor</li>
                <li>Compare on a held-out cohort for one quarter</li>
                <li>Move read-only surfaces to AURORA</li>
                <li>Decide on the rest — nothing creates lock-in</li>
              </ul>
            </div>
          </Card>
          <Card title="The override contract">
            <div className="doc" style={{ fontSize: 13.5 }}>
              <p>AURORA is decision-support, never an order. Every clinician override carries a logged reason and an explanation chain, written durably before the next render.</p>
              <div className="callout">If a subsystem has a consent dependency, it refuses to run on records without the appropriate cohort policy — by design.</div>
            </div>
          </Card>
        </div>
      )}

      {tab === "template" && (
        <div className="doc">
          <div className="callout">
            This console is <b>one data-driven template</b>. It already renders all {window.AURORA_DATA.modules.length} disease modules from <code>AURORA_DATA</code>. To stand up a new module — or a standalone subsystem devtool — you change <b>data</b>, not layout.
          </div>

          <h2>1 · It already clones to every module</h2>
          <p>Use the module switcher (top of the sidebar). Every view — overview, cases, clinical surface, subsystems, models, use-cases, research, audit, install, admin — re-renders from that module's entry in <code>AURORA_DATA.modules</code>. No view code changes.</p>

          <h2>2 · Clone it for a subsystem devtool</h2>
          <p>The same template applies one level down. A subsystem (e.g. a PDE solver, a foundation model, an equity auditor) is just a module with its own <code>subsystems</code>, <code>models</code> and I/O. To make a subsystem its own devtool:</p>
          <ul>
            <li>Add an entry to <code>AURORA_DATA.modules</code> with the subsystem's <code>slug</code>, <code>code</code>, <code>accent</code> and a <code>subsystems</code> array of its internal stages.</li>
            <li>The operational layer (<code>dash-data.jsx → OPS(slug)</code>) generates cases, model cards, deployments and audit for it automatically.</li>
            <li>Point the I/O builder (<code>view-product.jsx → buildIO</code>) and <code>CLASSIFY</code> map at the subsystem's real contract.</li>
          </ul>

          <h2>3 · The three files you touch</h2>
          <div className="card" style={{ margin: "0 0 18px" }}>
            <div className="kv" style={{ padding: "0 16px" }}>
              <div><div className="k">data.jsx</div><div className="v">Canonical, real spec — modules, subsystems, evidence, pillars. Edit here to add a module/subsystem.</div></div>
              <div><div className="k">dash-data.jsx</div><div className="v">Operational data builders (cases, models, deploys, users, audit). Swap the seeded generators for real fetches; keep the shapes.</div></div>
              <div style={{ borderBottom: "none" }}><div className="k">view-*.jsx</div><div className="v">Pure presentation. Read <code>m</code> (module) + <code>ops</code> (operational data). You rarely edit these.</div></div>
            </div>
          </div>

          <h2>4 · The component vocabulary</h2>
          <p>Every panel is built from the same primitives in <code>primitives.jsx</code> — so a new view is visually consistent for free:</p>
          <ul>
            <li><code>&lt;Kpi&gt;</code> · <code>&lt;Card&gt;</code> · <code>&lt;Pill&gt;</code> · <code>&lt;Chip&gt;</code> — surfaces & status</li>
            <li><code>&lt;Meter&gt;</code> · <code>&lt;BarRow&gt;</code> · <code>&lt;Spark&gt;</code> — quantitative</li>
            <li><code>&lt;Tabs&gt;</code> · <code>&lt;Accordion&gt;</code> · <code>&lt;ViewHead&gt;</code> — structure</li>
            <li><code>&lt;CodePane&gt;</code> · <code>&lt;Avatar&gt;</code> · <code>&lt;Icon&gt;</code> — detail</li>
          </ul>

          <h2>5 · Theming</h2>
          <p>Two themes via <code>[data-theme]</code> (toggle, top-right). Per-module accent flows from <code>m.accent</code> into the <code>--accent</code> custom property — change one value, recolour the whole surface.</p>
        </div>
      )}

      {tab === "api" && (
        <div>
          <p className="doc" style={{ marginBottom: 14 }}>The shape each view expects. Conform your backend to this and the entire console lights up.</p>
          <CodePane label="module shape · AURORA_DATA.modules[]">{`{
  slug: "glio", idx: "01", code: "AURORA-GLIO",
  name: "Glioma", latin: "Gliomata", accent: "#5cf0c2",
  status: "live",              // live | beta | soon
  tagline: "…", lead: "…", clinical: "…",
  personas: ["Neuro-oncology", "Radiology", …],
  stats: { subsystems, scope, readiness, pilots, latency, license },
  subsystems: [
    { id:"01", code:"GLIO-AI", name:"Foundation Models",
      desc:"…", status:"live" },   // ← each is itself a devtool
    …
  ],
}`}</CodePane>
          <div style={{ height: 14 }} />
          <CodePane label="operational shape · OPS(slug)">{`{
  kpis: { activeCases, cohortSize, pilotCount, uptime, latencyMs },
  cases:  [{ id, mrn, dx, age, site, stage, clinician,
             consent, conf, overrides, flagged }],
  models: [{ code, name, kind, params, quant, version,
             auc, eval, ece, signed, whash, drift }],
  strata:      [{ k, v, pass }],     // equity gate
  deployments: [{ site, node, mode, gpu, version, cases, status }],
  users:       [{ name, role, site, mfa, overrides, lastActive }],
  activity:    [{ icon, who, t, when }],
  throughput, latencyTrend, overrideRate,   // number[] series
}`}</CodePane>
        </div>
      )}
    </div>
  );
};
