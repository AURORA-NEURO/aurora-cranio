
const I = {
  overview: "M3 3h7v7H3zM14 3h7v4h-7zM14 10h7v11h-7zM3 14h7v7H3z",
  grid: "M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z",
  cpu: "M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3M6 6h12v12H6zM9.5 9.5h5v5h-5z",
  cases: "M4 4h16v16H4zM4 9h16M9 9v11",
  pulse: "M3 12h4l2-7 4 14 2-7h6",
  beaker: "M9 3h6M10 3v6l-5 9a2 2 0 002 3h10a2 2 0 002-3l-5-9V3M6.5 15h11",
  shield: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z",
  audit: "M9 3h6l2 2v16H7V5zM9 9h6M9 13h6M9 17h4",
  install: "M12 3v12M7 10l5 5 5-5M4 19h16",
  fed: "M12 2a4 4 0 100 8 4 4 0 000-8zM4 22a4 4 0 100-8 4 4 0 000 8zM20 22a4 4 0 100-8 4 4 0 000 8zM10.5 9L6 13.5M13.5 9L18 13.5",
  users: "M16 19a4 4 0 00-8 0M12 11a3.5 3.5 0 100-7 3.5 3.5 0 000 7M22 19a3.5 3.5 0 00-5-3.2M2 19a3.5 3.5 0 015-3.2",
  monitor: "M3 4h18v12H3zM8 20h8M12 16v4",
  book: "M4 4h13a2 2 0 012 2v15H6a2 2 0 01-2-2zM4 4v13a2 2 0 002 2",
  search: "M11 4a7 7 0 100 14 7 7 0 000-14zM20 20l-4-4",
  bell: "M6 9a6 6 0 1112 0c0 5 2 6 2 6H4s2-1 2-6M10 21h4",
  sun: "M12 4v2M12 18v2M4 12h2M18 12h2M6 6l1.5 1.5M16.5 16.5L18 18M18 6l-1.5 1.5M7.5 16.5L6 18M12 8a4 4 0 100 8 4 4 0 000-8z",
  moon: "M20 14a8 8 0 11-9-11 6 6 0 009 11z",
  burger: "M3 6h18M3 12h18M3 18h18",
  chev: "M9 6l6 6-6 6",
  chevd: "M6 9l6 6 6-6",
  arrow: "M5 12h14M13 6l6 6-6 6",
  check: "M5 12l5 5L20 6",
  sign: "M3 17l6-6 4 4 8-8M21 7v5h-5",
  override: "M4 4v6h6M20 20v-6h-6M20 9A8 8 0 006 5M4 15a8 8 0 0014 4",
  sync: "M21 12a9 9 0 01-9 9M3 12a9 9 0 019-9M3 12l3-3M3 12l3 3M21 12l-3-3M21 12l-3 3",
  equity: "M12 3v18M5 7l7-3 7 3M5 7l-2 6a3 3 0 006 0zM19 7l-2 6a3 3 0 006 0z",
  model: "M12 2l9 5v10l-9 5-9-5V7zM12 2v20M3 7l9 5 9-5",
  doc: "M14 3H6v18h12V8zM14 3v5h5M9 13h6M9 17h6",
  external: "M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 01-1 1H5a1 1 0 01-1-1V7a1 1 0 011-1h5",
  filter: "M3 5h18l-7 8v5l-4 2v-7z",
  plus: "M12 5v14M5 12h14",
  download: "M12 3v12M7 10l5 5 5-5M5 21h14",
  pin: "M12 2a6 6 0 016 6c0 4-6 12-6 12S6 12 6 8a6 6 0 016-6zM12 8h.01",
  hist: "M3 12a9 9 0 109-9 9 9 0 00-9 9zM3 12H1M12 7v5l3 2",
  lock: "M6 10V7a6 6 0 0112 0v3M5 10h14v11H5z",
};

const Icon = ({ n, className = "", style }) => (
  <svg className={`ic ${className}`} style={style} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d={I[n] || I.grid} />
  </svg>
);

const STATUS_LABEL = { live: "live", beta: "beta", soon: "soon", synced: "synced", syncing: "syncing", degraded: "degraded" };
const Pill = ({ s, children }) => (
  <span className={`pill ${s}`}><span className="d" />{children || STATUS_LABEL[s] || s}</span>
);
const Chip = ({ children, dot }) => (
  <span className="chip">{dot && <span className="d" />}{children}</span>
);

const Kpi = ({ label, icon, value, unit, foot, delta, dir, edge }) => (
  <div className="kpi">
    {edge && <div className="accent-edge" />}
    <div className="l">{icon && <Icon n={icon} />}{label}</div>
    <div className="v">{value}{unit && <small>{unit}</small>}</div>
    {(foot || delta) && (
      <div className="foot">
        {delta && <span className={`delta ${dir}`}>{dir === "up" ? "▲" : dir === "down" ? "▼" : ""} {delta}</span>}
        {foot && <span className="muted">{foot}</span>}
      </div>
    )}
  </div>
);

const Card = ({ title, sub, right, children, flush, className = "", style }) => (
  <div className={`card ${className}`} style={style}>
    {(title || right) && (
      <div className="card-h">
        <h3>{title}</h3>
        {right ? right : sub ? <span className="sub">{sub}</span> : null}
      </div>
    )}
    <div className={`card-b ${flush ? "flush" : ""}`}>{children}</div>
  </div>
);

const Meter = ({ pct, color }) => (
  <div className="meter"><div className="fill" style={{ width: Math.max(2, Math.min(100, pct)) + "%", background: color }} /></div>
);
const BarRow = ({ code, name, pct, color, unit = "%" }) => (
  <div className="bar-block">
    <div className="bar-row">
      <span>{code && <code>{code}</code>} {name && <b>{name}</b>}</span>
      <span className="muted mono">{pct}{unit}</span>
    </div>
    <Meter pct={pct} color={color} />
  </div>
);

const Spark = ({ data, color, kind = "line", h = 44 }) => {
  const w = 200, max = Math.max(...data, 1), min = Math.min(...data, 0);
  const rng = max - min || 1;
  if (kind === "bars") {
    const bw = w / data.length;
    return (
      <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ width: "100%", height: h, display: "block" }}>
        {data.map((d, i) => {
          const bh = ((d - min) / rng) * (h - 4) + 2;
          return <rect key={i} x={i * bw + bw * 0.18} y={h - bh} width={bw * 0.64} height={bh} rx="1" fill={color} opacity={0.45 + 0.55 * ((d - min) / rng)} />;
        })}
      </svg>
    );
  }
  const pts = data.map((d, i) => `${(i / (data.length - 1)) * w},${h - 2 - ((d - min) / rng) * (h - 4)}`).join(" ");
  const area = `0,${h} ${pts} ${w},${h}`;
  const id = "sg" + Math.random().toString(36).slice(2, 7);
  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ width: "100%", height: h, display: "block" }}>
      <defs><linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={color} stopOpacity="0.22" /><stop offset="1" stopColor={color} stopOpacity="0" />
      </linearGradient></defs>
      <polygon points={area} fill={`url(#${id})`} />
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.6" vectorEffect="non-scaling-stroke" />
    </svg>
  );
};

const Tabs = ({ items, value, onChange, underline }) => (
  <div className={underline ? "utabs" : "tabs"}>
    {items.map((it) => {
      const k = typeof it === "string" ? it : it.k;
      const label = typeof it === "string" ? it : it.label;
      return (
        <button key={k} className={`${underline ? "utab" : "tab"} ${value === k ? "active" : ""}`} onClick={() => onChange(k)}>{label}</button>
      );
    })}
  </div>
);

const Accordion = ({ head, children, defaultOpen }) => {
  const [open, setOpen] = React.useState(!!defaultOpen);
  return (
    <div className={`acc ${open ? "open" : ""}`}>
      <div className="acc-h" onClick={() => setOpen(!open)}>{head}<span className="plus">+</span></div>
      {open && <div className="acc-b"><div className="acc-b-inner">{children}</div></div>}
    </div>
  );
};

const AV_HUES = [200, 150, 270, 330, 30, 90];
const Avatar = ({ name, sm }) => {
  const init = (name || "?").split(" ").map((x) => x[0]).join("").slice(0, 2);
  const hue = AV_HUES[(name || "").length % AV_HUES.length];
  return <div className={sm ? "av-sm" : "av-sm"} style={{ background: `oklch(0.62 0.13 ${hue})` }}>{init}</div>;
};

const ViewHead = ({ eyebrow, title, sub, actions }) => (
  <div className="vhead">
    <div>
      {eyebrow && <div className="eyebrow">{eyebrow}</div>}
      <h1>{title}</h1>
      {sub && <p>{sub}</p>}
    </div>
    {actions && <div className="vhead-actions">{actions}</div>}
  </div>
);

const Code = ({ children }) => {
  const html = String(children)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;")
    .replace(/(#.*)$/gm, '<span class="c">$1</span>')
    .replace(/\b(pip|install|docker|helm|cargo|run|from|import|print|use|fn|let|mut)\b/g, '<span class="k">$1</span>')
    .replace(/("[^"]*")/g, '<span class="s">$1</span>');
  return <pre dangerouslySetInnerHTML={{ __html: html }} />;
};
const CodePane = ({ label, children }) => (
  <div className="codepane">
    <div className="codepane-h"><div className="dots"><span /><span /><span /></div><span>{label}</span></div>
    <Code>{children}</Code>
  </div>
);

Object.assign(window, { Icon, Pill, Chip, Kpi, Card, Meter, BarRow, Spark, Tabs, Accordion, Avatar, ViewHead, Code, CodePane });
