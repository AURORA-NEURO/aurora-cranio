// ════════════════════════════════════════════════════════════════════
//  AURORA CONSOLE · app shell + router
// ════════════════════════════════════════════════════════════════════

const NAV = [
  { group: "Clinical", items: [
    { k: "overview", label: "Overview", ic: "overview" },
    { k: "cases", label: "Cases", ic: "cases" },
    { k: "clinical", label: "Clinical surface", ic: "pulse" },
    { k: "messages", label: "Messages", ic: "doc" },
  ]},
  { group: "Build", items: [
    { k: "subsystems", label: "Subsystems", ic: "grid" },
    { k: "models", label: "Foundation models", ic: "cpu" },
    { k: "product", label: "Use cases & I/O", ic: "model" },
  ]},
  { group: "Evidence", items: [
    { k: "analytics", label: "Analytics", ic: "pulse" },
    { k: "research", label: "Research & papers", ic: "book" },
    { k: "audit", label: "Audit & provenance", ic: "audit" },
  ]},
  { group: "Deploy", items: [
    { k: "install", label: "Install", ic: "install" },
    { k: "admin", label: "Fleet admin", ic: "fed" },
    { k: "onboarding", label: "Onboard hospital", ic: "plus" },
  ]},
  { group: "Learn", items: [
    { k: "guides", label: "Guides", ic: "doc" },
    { k: "settings", label: "Settings", ic: "cpu" },
  ]},
];

const CRUMB_GROUP = {};
NAV.forEach((g) => g.items.forEach((it) => { CRUMB_GROUP[it.k] = g.group; }));

function Shell() {
  const modules = window.AURORA_DATA.modules;
  const meta = window.AURORA_DATA.meta || {};
  const lsKey = (k) => `aurora.${(modules[0] && modules[0].code) || "x"}.${k}`;
  const [slug, setSlug] = React.useState(() => {
    const stored = localStorage.getItem(lsKey("module"));
    return (modules.find((x) => x.slug === stored) ? stored : (modules[0] && modules[0].slug)) || "";
  });
  const [view, setView] = React.useState(() => localStorage.getItem(lsKey("view")) || "overview");
  const [theme, setTheme] = React.useState(() => localStorage.getItem("aurora.theme") || "light");
  const [density, setDensity] = React.useState(() => localStorage.getItem("aurora.density") || "comfortable");
  const [accentPref, setAccentPref] = React.useState(() => localStorage.getItem("aurora.accent") || "");
  const [collapsed, setCollapsed] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [modPop, setModPop] = React.useState(false);
  const [activeCase, setActiveCase] = React.useState(null);

  const m = modules.find((x) => x.slug === slug) || modules[0];
  const ops = window.OPS(slug);
  const msgUnread = React.useMemo(() => (window.OPS_MESSAGES(slug) || []).reduce((n, t) => n + t.unread, 0), [slug]);

  React.useEffect(() => { document.documentElement.setAttribute("data-theme", theme); localStorage.setItem("aurora.theme", theme); }, [theme]);
  React.useEffect(() => { document.documentElement.setAttribute("data-density", density); localStorage.setItem("aurora.density", density); }, [density]);
  React.useEffect(() => { localStorage.setItem("aurora.accent", accentPref); }, [accentPref]);
  React.useEffect(() => { localStorage.setItem(lsKey("module"), slug); }, [slug]);
  React.useEffect(() => { localStorage.setItem(lsKey("view"), view); }, [view]);

  // accent flows into --accent (user override wins)
  const rootStyle = { "--accent": accentPref || m.accent };
  const prefs = { theme, setTheme, density, setDensity, accentPref, setAccentPref };

  const go = (v) => { setView(v); setMobileOpen(false); document.querySelector(".scroll-area")?.scrollTo(0, 0); };
  const setModule = (s) => { setSlug(s); setActiveCase(null); setModPop(false); };
  const openCase = (c) => { setActiveCase(c); go("clinical"); };

  const View = window.AV[view] || window.AV.overview;

  return (
    <div className={`app ${collapsed ? "collapsed" : ""} ${mobileOpen ? "mobile-open" : ""}`} style={rootStyle}>
      {/* ── SIDEBAR ── */}
      <aside className="sb">
        <div className="sb-top">
          <div className="sb-mark" />
          <div className="sb-brand"><b>AURORA</b><span>console</span></div>
        </div>

        {/* module switcher */}
        <div className="sb-mod" onClick={() => setModPop(!modPop)}>
          <span className="swatch" style={{ background: m.accent }} />
          <div className="sb-mod-meta"><b>{m.name}</b><span>{m.code}</span></div>
          <Icon n="chevd" className="chev" />
          {modPop && (
            <div className="mod-pop" onClick={(e) => e.stopPropagation()}>
              {modules.map((x) => (
                <a key={x.slug} className={`mod-pop-item ${x.slug === slug ? "active" : ""}`} onClick={() => setModule(x.slug)}>
                  <span className="sw" style={{ background: x.accent }} />
                  <b>{x.name}</b><code>{x.code.replace("AURORA-", "")}</code>
                </a>
              ))}
            </div>
          )}
        </div>

        <nav className="sb-scroll">
          {NAV.map((g) => (
            <div key={g.group}>
              <div className="sb-group-label">{g.group}</div>
              {g.items.map((it) => (
                <a key={it.k} className={`sb-link ${view === it.k ? "active" : ""}`} onClick={() => go(it.k)} title={it.label}>
                  <Icon n={it.ic} />
                  <span>{it.k === "models" && meta.modelsLabel ? meta.modelsLabel : it.k === "subsystems" && meta.subsystemsLabel ? meta.subsystemsLabel : it.label}</span>
                  {it.k === "cases" && <span className="badge">{ops.kpis.activeCases}</span>}
                  {it.k === "subsystems" && <span className="badge">{m.subsystems.length}</span>}
                  {it.k === "messages" && msgUnread > 0 && <span className="badge" style={{ background: m.accent, color: "#fff" }}>{msgUnread}</span>}
                </a>
              ))}
            </div>
          ))}
        </nav>

        <div className="sb-foot">
          <div className="av">AK</div>
          <div className="sb-foot-txt"><b>A. Kessler</b><span>Module maintainer</span></div>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <div className="main">
        <header className="topbar">
          <button className="tb-burger" onClick={() => { setCollapsed(!collapsed); setMobileOpen(!mobileOpen); }}><Icon n="burger" /></button>
          <div className="crumbs">
            <span>{m.code.replace("AURORA-", "")}</span>
            <span className="sep">/</span>
            <span>{CRUMB_GROUP[view]}</span>
            <span className="sep">/</span>
            <b>{(NAV.flatMap((g) => g.items).find((i) => i.k === view) || {}).label}</b>
          </div>

          <div className="tb-search">
            <Icon n="search" />
            <input placeholder="Search cases, models, sites…" />
            <kbd>⌘K</kbd>
          </div>
          <button className="tb-btn" title="Notifications"><Icon n="bell" /><span className="dot" /></button>
          <button className="tb-btn" onClick={() => setTheme(theme === "light" ? "dark" : "light")} title="Toggle theme">
            <Icon n={theme === "light" ? "moon" : "sun"} />
          </button>
        </header>

        <div className="scroll-area">
          <View m={m} ops={ops} go={go} setModule={setModule} openCase={openCase} activeCase={activeCase} prefs={prefs} />>
        </div>
      </div>
    </div>
  );
}

window.Shell = Shell;
