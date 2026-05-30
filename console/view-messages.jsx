// ════════════════════════════════════════════════════════════════════
//  VIEW · MESSAGES — secure MDT / clinical threads, linked to cases
// ════════════════════════════════════════════════════════════════════
window.AV = window.AV || {};

window.AV.messages = function Messages({ m, ops, go, openCase }) {
  const a = m.accent;
  const threads = React.useMemo(() => window.OPS_MESSAGES(m.slug), [m.slug]);
  const [selId, setSelId] = React.useState(threads[0] && threads[0].id);
  const [draft, setDraft] = React.useState("");
  const [filter, setFilter] = React.useState("all");
  const t = threads.find((x) => x.id === selId) || threads[0];

  const KIND_PILL = { MDT: "beta", secure: "pass", system: "soon" };
  const list = threads.filter((x) => filter === "all" || x.kind === filter);
  const totalUnread = threads.reduce((n, x) => n + x.unread, 0);

  const openLinkedCase = () => {
    const c = ops.cases.find((x) => x.id === t.caseId) || ops.cases[0];
    openCase(c);
  };

  return (
    <div className="view">
      <ViewHead
        eyebrow={<>{m.code} · messages</>}
        title={<>Secure <em className="s">messaging</em></>}
        sub="MDT discussion and secure clinical messages — every thread linked to its case, site and care team."
        actions={<><span className="chip"><span className="d" />{totalUnread} unread</span><button className="btn btn-pri btn-sm"><Icon n="plus" /> New thread</button></>}
      />

      <div className="card" style={{ overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "320px 1fr", minHeight: 560 }}>
          {/* thread list */}
          <div style={{ borderRight: "1px solid var(--line)", display: "flex", flexDirection: "column" }}>
            <div style={{ padding: 12, borderBottom: "1px solid var(--line)", display: "flex", gap: 4 }}>
              {["all", "MDT", "secure"].map((k) => (
                <button key={k} className={`utab ${filter === k ? "active" : ""}`} style={{ padding: "6px 12px", fontSize: 12, marginBottom: 0 }} onClick={() => setFilter(k)}>{k}</button>
              ))}
            </div>
            <div style={{ overflowY: "auto", flex: 1 }}>
              {list.map((th) => (
                <div key={th.id} onClick={() => setSelId(th.id)} style={{ padding: "12px 14px", borderBottom: "1px solid var(--line)", cursor: "pointer", background: th.id === selId ? "var(--panel-2)" : "transparent", borderLeft: th.id === selId ? `2px solid ${a}` : "2px solid transparent" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 4 }}>
                    <span className={`pill ${KIND_PILL[th.kind]}`} style={{ fontSize: 9 }}><span className="d" />{th.kind}</span>
                    {th.unread > 0 && <span style={{ marginLeft: "auto", background: a, color: "#fff", fontSize: 10, fontWeight: 600, borderRadius: 20, padding: "1px 7px", fontFamily: "var(--mono)" }}>{th.unread}</span>}
                    <span className="num muted" style={{ fontSize: 10.5, marginLeft: th.unread ? 0 : "auto" }}>{th.last}</span>
                  </div>
                  <div style={{ fontWeight: 600, fontSize: 13, letterSpacing: "-0.01em", marginBottom: 3 }}>{th.subject}</div>
                  <div className="mono" style={{ fontSize: 10.5, color: "var(--muted)" }}>{th.caseId} · {th.site} · {th.participants.length} people</div>
                </div>
              ))}
            </div>
          </div>

          {/* conversation */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div className="card-h" style={{ padding: "12px 16px" }}>
              <div>
                <h3 style={{ fontSize: 14 }}>{t.subject}</h3>
                <div className="mono" style={{ fontSize: 10.5, color: "var(--muted)", marginTop: 2 }}>{t.kind} · {t.participants.join(", ")}</div>
              </div>
              <button className="btn btn-sm" onClick={openLinkedCase}><Icon n="cases" /> {t.caseId} <Icon n="arrow" /></button>
            </div>

            <div style={{ flex: 1, overflowY: "auto", padding: 18, display: "flex", flexDirection: "column", gap: 14, background: "var(--bg)" }}>
              <div className="note" style={{ textAlign: "center", margin: "0 auto" }}>Thread linked to case {t.caseId} · end-to-end encrypted · logged to audit</div>
              {t.msgs.map((msg, i) => (
                <div key={i} style={{ display: "flex", gap: 10, flexDirection: msg.you ? "row-reverse" : "row", alignItems: "flex-end" }}>
                  {!msg.you && <Avatar name={msg.from} />}
                  <div style={{ maxWidth: "70%" }}>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 4, flexDirection: msg.you ? "row-reverse" : "row" }}>
                      <span style={{ fontSize: 12, fontWeight: 600 }}>{msg.from}</span>
                      <span className="mono muted" style={{ fontSize: 10 }}>{msg.role} · {msg.ts}</span>
                    </div>
                    <div style={{ padding: "10px 13px", borderRadius: 12, fontSize: 13, lineHeight: 1.5, background: msg.you ? a : "var(--panel)", color: msg.you ? "#fff" : "var(--text-2)", border: msg.you ? "none" : "1px solid var(--line)", borderBottomRightRadius: msg.you ? 3 : 12, borderBottomLeftRadius: msg.you ? 12 : 3 }}>{msg.body}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* composer */}
            <div style={{ padding: 14, borderTop: "1px solid var(--line)", display: "flex", gap: 9, alignItems: "flex-end" }}>
              <textarea value={draft} onChange={(e) => setDraft(e.target.value)} placeholder={`Message the ${t.subject} team…`} rows={1}
                style={{ flex: 1, minHeight: 40, maxHeight: 120, border: "1px solid var(--line)", borderRadius: 10, padding: "10px 13px", font: "inherit", fontSize: 13, lineHeight: 1.5, color: "var(--text)", background: "var(--panel-2)", resize: "none", outline: "none" }} />
              <button className="btn"><Icon n="pin" /></button>
              <button className="btn btn-pri" style={{ background: a, borderColor: a }} onClick={() => setDraft("")}><Icon n="arrow" /> Send</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
