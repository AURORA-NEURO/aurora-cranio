
const _Frame = ({ w, h, pad, xticks, yticks, xfmt, yfmt, yMin, yMax }) => {
  const [pl, pr, pt, pb] = pad;
  const iw = w - pl - pr, ih = h - pt - pb;
  return (
    <g>
      {yticks.map((t, i) => {
        const y = pt + ih - ((t - yMin) / (yMax - yMin || 1)) * ih;
        return (
          <g key={i}>
            <line x1={pl} y1={y} x2={w - pr} y2={y} stroke="var(--line)" strokeWidth="1" />
            <text x={pl - 7} y={y + 3.5} textAnchor="end" fontSize="9.5" fill="var(--muted)" fontFamily="var(--mono)">{yfmt ? yfmt(t) : t}</text>
          </g>
        );
      })}
      {xticks && xticks.map((t, i) => {
        const x = pl + (i / (xticks.length - 1 || 1)) * iw;
        return <text key={i} x={x} y={h - pb + 13} textAnchor="middle" fontSize="9" fill="var(--muted)" fontFamily="var(--mono)">{xfmt ? xfmt(t) : t}</text>;
      })}
    </g>
  );
};

const LineChart = ({ series, labels, height = 200, yMax, yMin = 0, area = true, yfmt, fmtPct }) => {
  const w = 520, h = height, pad = [40, 14, 14, 26];
  const [pl, pr, pt, pb] = pad;
  const iw = w - pl - pr, ih = h - pt - pb;
  const allv = series.flatMap((s) => s.data);
  const ymax = yMax != null ? yMax : Math.max(...allv) * 1.1 || 1;
  const ticks = 4;
  const yticks = Array.from({ length: ticks + 1 }, (_, i) => yMin + (i / ticks) * (ymax - yMin));
  const n = series[0].data.length;
  const px = (i) => pl + (i / (n - 1 || 1)) * iw;
  const py = (v) => pt + ih - ((v - yMin) / (ymax - yMin || 1)) * ih;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} style={{ width: "100%", height: "auto", display: "block" }}>
      <_Frame w={w} h={h} pad={pad} xticks={labels} yticks={yticks} yMin={yMin} yMax={ymax} yfmt={yfmt || (fmtPct ? (t) => Math.round(t * 100) + "%" : (t) => (t >= 1000 ? (t / 1000).toFixed(0) + "k" : Math.round(t)))} />
      {series.map((s, si) => {
        const pts = s.data.map((v, i) => `${px(i)},${py(v)}`).join(" ");
        const id = "lc" + si + Math.random().toString(36).slice(2, 6);
        return (
          <g key={si}>
            {area && <><defs><linearGradient id={id} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={s.color} stopOpacity="0.18" /><stop offset="1" stopColor={s.color} stopOpacity="0" /></linearGradient></defs>
              <polygon points={`${px(0)},${py(yMin)} ${pts} ${px(n - 1)},${py(yMin)}`} fill={`url(#${id})`} /></>}
            <polyline points={pts} fill="none" stroke={s.color} strokeWidth="2" strokeLinejoin="round" />
          </g>
        );
      })}
    </svg>
  );
};

const Donut = ({ segments, size = 150, thickness = 22, center }) => {
  const r = size / 2 - 4, c = size / 2, circ = 2 * Math.PI * (r - thickness / 2);
  const total = segments.reduce((a, b) => a + b.v, 0) || 1;
  let off = 0;
  return (
    <svg viewBox={`0 0 ${size} ${size}`} style={{ width: size, height: size }}>
      <circle cx={c} cy={c} r={r - thickness / 2} fill="none" stroke="var(--panel-3)" strokeWidth={thickness} />
      {segments.map((s, i) => {
        const frac = s.v / total, len = frac * circ;
        const el = <circle key={i} cx={c} cy={c} r={r - thickness / 2} fill="none" stroke={s.color} strokeWidth={thickness}
          strokeDasharray={`${len} ${circ - len}`} strokeDashoffset={-off} transform={`rotate(-90 ${c} ${c})`} strokeLinecap="butt" />;
        off += len;
        return el;
      })}
      {center && <text x={c} y={c - 2} textAnchor="middle" fontSize="22" fontWeight="600" fill="var(--text)" letterSpacing="-0.02em">{center.v}</text>}
      {center && <text x={c} y={c + 14} textAnchor="middle" fontSize="9" fill="var(--muted)" fontFamily="var(--mono)" letterSpacing="0.08em">{center.l}</text>}
    </svg>
  );
};
const Legend = ({ items, cols = 1 }) => (
  <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols},1fr)`, gap: "6px 14px" }}>
    {items.map((it, i) => (
      <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12 }}>
        <span style={{ width: 9, height: 9, borderRadius: 2, background: it.color, flexShrink: 0 }} />
        <span style={{ color: "var(--text-2)", flex: 1 }}>{it.l}</span>
        {it.v != null && <span className="num" style={{ color: "var(--text)", fontWeight: 600 }}>{it.v}</span>}
      </div>
    ))}
  </div>
);

const KMCurve = ({ curves, height = 220, months = 36 }) => {
  const w = 520, h = height, pad = [40, 14, 14, 28];
  const [pl, pr, pt, pb] = pad, iw = w - pl - pr, ih = h - pt - pb;
  const px = (t) => pl + (t / months) * iw;
  const py = (s) => pt + ih - s * ih;
  const yticks = [0, 0.25, 0.5, 0.75, 1];
  const xticks = [0, months / 3, (2 * months) / 3, months];
  return (
    <svg viewBox={`0 0 ${w} ${h}`} style={{ width: "100%", height: "auto", display: "block" }}>
      {yticks.map((t, i) => { const y = py(t); return (<g key={i}><line x1={pl} y1={y} x2={w - pr} y2={y} stroke="var(--line)" /><text x={pl - 7} y={y + 3.5} textAnchor="end" fontSize="9.5" fill="var(--muted)" fontFamily="var(--mono)">{Math.round(t * 100)}%</text></g>); })}
      {xticks.map((t, i) => <text key={i} x={px(t)} y={h - pb + 14} textAnchor="middle" fontSize="9" fill="var(--muted)" fontFamily="var(--mono)">{Math.round(t)}mo</text>)}
      {curves.map((cv, ci) => {
        let d = `M ${px(0)} ${py(1)}`;
        cv.steps.forEach((s) => { d += ` L ${px(s.t)} ${py(s.from)} L ${px(s.t)} ${py(s.to)}`; });
        const last = cv.steps[cv.steps.length - 1];
        d += ` L ${px(months)} ${py(last ? last.to : 1)}`;
        return <path key={ci} d={d} fill="none" stroke={cv.color} strokeWidth="2" />;
      })}
    </svg>
  );
};

const ROC = ({ points, auc, color, height = 180 }) => {
  const s = height, pad = 28, iw = s - pad - 10, ih = s - pad - 10;
  const px = (x) => pad + x * iw, py = (y) => (s - pad) - y * ih;
  const d = "M " + points.map((p) => `${px(p[0])} ${py(p[1])}`).join(" L ");
  return (
    <svg viewBox={`0 0 ${s} ${s}`} style={{ width: "100%", maxWidth: 220, height: "auto", display: "block" }}>
      <line x1={pad} y1={s - pad} x2={s - 10} y2={s - pad} stroke="var(--line-2)" />
      <line x1={pad} y1={s - pad} x2={pad} y2={10} stroke="var(--line-2)" />
      <line x1={px(0)} y1={py(0)} x2={px(1)} y2={py(1)} stroke="var(--muted-2)" strokeDasharray="3 3" />
      <path d={d} fill="none" stroke={color} strokeWidth="2" />
      <text x={s / 2} y={s - 6} textAnchor="middle" fontSize="9" fill="var(--muted)" fontFamily="var(--mono)">FPR</text>
      {auc != null && <text x={s - 14} y={py(0.12)} textAnchor="end" fontSize="12" fontWeight="600" fill={color} fontFamily="var(--mono)">AUC {auc}</text>}
    </svg>
  );
};

const Calibration = ({ points, color, height = 180 }) => {
  const s = height, pad = 28, iw = s - pad - 10, ih = s - pad - 10;
  const px = (x) => pad + x * iw, py = (y) => (s - pad) - y * ih;
  return (
    <svg viewBox={`0 0 ${s} ${s}`} style={{ width: "100%", maxWidth: 220, height: "auto", display: "block" }}>
      <line x1={px(0)} y1={py(0)} x2={px(1)} y2={py(1)} stroke="var(--muted-2)" strokeDasharray="3 3" />
      <line x1={pad} y1={s - pad} x2={s - 10} y2={s - pad} stroke="var(--line-2)" />
      <line x1={pad} y1={s - pad} x2={pad} y2={10} stroke="var(--line-2)" />
      <polyline points={points.map((p) => `${px(p[0])},${py(p[1])}`).join(" ")} fill="none" stroke={color} strokeWidth="2" />
      {points.map((p, i) => <circle key={i} cx={px(p[0])} cy={py(p[1])} r="2.6" fill={color} />)}
      <text x={s / 2} y={s - 6} textAnchor="middle" fontSize="9" fill="var(--muted)" fontFamily="var(--mono)">predicted</text>
    </svg>
  );
};

const Confusion = ({ matrix, labels, color }) => {
  const max = Math.max(...matrix.flat()) || 1;
  return (
    <div style={{ display: "grid", gridTemplateColumns: `auto repeat(${labels.length}, 1fr)`, gap: 3, fontSize: 11 }}>
      <div />
      {labels.map((l, i) => <div key={i} className="mono" style={{ textAlign: "center", color: "var(--muted)", fontSize: 9.5, paddingBottom: 2 }}>{l}</div>)}
      {matrix.map((row, r) => (
        <React.Fragment key={r}>
          <div className="mono" style={{ color: "var(--muted)", fontSize: 9.5, display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: 4 }}>{labels[r]}</div>
          {row.map((v, c) => (
            <div key={c} style={{ aspectRatio: "1.6", display: "grid", placeItems: "center", borderRadius: 5, background: `color-mix(in oklab, ${color} ${Math.round((v / max) * 85 + 4)}%, transparent)`, color: v / max > 0.5 ? "#fff" : "var(--text)", fontWeight: 600, fontFamily: "var(--mono)" }}>{v}</div>
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};

const Funnel = ({ stages, color }) => {
  const max = stages[0] ? stages[0].v : 1;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      {stages.map((s, i) => {
        const w = (s.v / max) * 100;
        return (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 130, fontSize: 12.5, color: "var(--text-2)", textAlign: "right", flexShrink: 0 }}>{s.l}</div>
            <div style={{ flex: 1, height: 26, background: "var(--panel-3)", borderRadius: 6, overflow: "hidden", position: "relative" }}>
              <div style={{ width: w + "%", height: "100%", background: `color-mix(in oklab, ${color} ${90 - i * 9}%, transparent)`, borderRadius: 6, display: "flex", alignItems: "center", paddingLeft: 10 }}>
                <span className="mono" style={{ fontSize: 11, color: w > 18 ? "#fff" : "var(--text)", fontWeight: 600 }}>{s.v}</span>
              </div>
            </div>
            <div className="mono" style={{ width: 44, fontSize: 11, color: "var(--muted)" }}>{Math.round(w)}%</div>
          </div>
        );
      })}
    </div>
  );
};

const HBars = ({ rows, color, max = 100, unit = "" }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
    {rows.map((r, i) => (
      <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 120, fontSize: 12, color: "var(--text-2)", flexShrink: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{r.l}</div>
        <div style={{ flex: 1, height: 18, background: "var(--panel-3)", borderRadius: 5, overflow: "hidden" }}>
          <div style={{ width: (r.v / max) * 100 + "%", height: "100%", background: r.color || color, borderRadius: 5 }} />
        </div>
        <div className="num" style={{ width: 50, fontSize: 12, fontWeight: 600, textAlign: "right" }}>{r.v}{unit}</div>
      </div>
    ))}
  </div>
);

const Radar = ({ axes, series, size = 240 }) => {
  const c = size / 2, r = size / 2 - 30, n = axes.length;
  const pt = (ai, val) => { const a = (Math.PI * 2 * ai) / n - Math.PI / 2; return [c + Math.cos(a) * r * val, c + Math.sin(a) * r * val]; };
  return (
    <svg viewBox={`0 0 ${size} ${size}`} style={{ width: "100%", maxWidth: 280, height: "auto", display: "block" }}>
      {[0.25, 0.5, 0.75, 1].map((ring, i) => (
        <polygon key={i} points={axes.map((_, ai) => pt(ai, ring).join(",")).join(" ")} fill="none" stroke="var(--line)" />
      ))}
      {axes.map((ax, ai) => { const [x, y] = pt(ai, 1.0); return (<g key={ai}><line x1={c} y1={c} x2={x} y2={y} stroke="var(--line)" /><text x={pt(ai, 1.18)[0]} y={pt(ai, 1.18)[1]} textAnchor="middle" fontSize="9" fill="var(--muted)" fontFamily="var(--mono)">{ax}</text></g>); })}
      {series.map((s, si) => (
        <polygon key={si} points={s.vals.map((v, ai) => pt(ai, v).join(",")).join(" ")} fill={`color-mix(in oklab, ${s.color} 18%, transparent)`} stroke={s.color} strokeWidth="2" />
      ))}
    </svg>
  );
};

const Gauge = ({ value, max = 100, color, label, size = 120 }) => {
  const r = size / 2 - 8, c = size / 2, circ = Math.PI * r;
  const frac = Math.min(1, value / max);
  return (
    <svg viewBox={`0 0 ${size} ${size / 1.7}`} style={{ width: "100%", maxWidth: size, height: "auto" }}>
      <path d={`M 8 ${c} A ${r} ${r} 0 0 1 ${size - 8} ${c}`} fill="none" stroke="var(--panel-3)" strokeWidth="10" strokeLinecap="round" />
      <path d={`M 8 ${c} A ${r} ${r} 0 0 1 ${size - 8} ${c}`} fill="none" stroke={color} strokeWidth="10" strokeLinecap="round" strokeDasharray={`${frac * circ} ${circ}`} />
      <text x={c} y={c - 6} textAnchor="middle" fontSize="22" fontWeight="600" fill="var(--text)" letterSpacing="-0.02em">{value}</text>
      {label && <text x={c} y={c + 8} textAnchor="middle" fontSize="8.5" fill="var(--muted)" fontFamily="var(--mono)" letterSpacing="0.08em">{label}</text>}
    </svg>
  );
};

Object.assign(window, { LineChart, Donut, Legend, KMCurve, ROC, Calibration, Confusion, Funnel, HBars, Radar, Gauge });
