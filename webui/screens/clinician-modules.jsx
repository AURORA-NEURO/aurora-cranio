/* AURORA clinician — module panels + shared UI. Exposes window.CLIN.
   Loaded as a Babel script; shares nothing by scope, so everything the
   app needs is attached to window.CLIN at the end. */

const ICONS = {
  home: 'M3 9.2L10 3.5l7 5.7V17a1 1 0 0 1-1 1h-4v-5H8v5H4a1 1 0 0 1-1-1z',
  scan: 'M3 6.5V4.5A1.5 1.5 0 0 1 4.5 3h2M13.5 3h2A1.5 1.5 0 0 1 17 4.5v2M17 13.5v2a1.5 1.5 0 0 1-1.5 1.5h-2M6.5 17h-2A1.5 1.5 0 0 1 3 15.5v-2M3 10h14',
  cpu: 'M6 6h8v8H6zM8.5 3v2M11.5 3v2M8.5 15v2M11.5 15v2M3 8.5h2M3 11.5h2M15 8.5h2M15 11.5h2',
  table: 'M3 4.5h14v11H3zM3 8.5h14M8 8.5v7M3 12h14',
  shield: 'M10 2.5l6 2.2v4.3c0 3.5-2.5 6-6 7-3.5-1-6-3.5-6-7V4.7z',
  settings: 'M10 6.6a3.4 3.4 0 1 0 0 6.8 3.4 3.4 0 0 0 0-6.8zM10 1.8v1.6M10 16.6v1.6M3.4 10H1.8M18.2 10h-1.6M5.1 5.1L4 4M16 16l-1.1-1.1M14.9 5.1L16 4M4 16l1.1-1.1',
  bell: 'M5 8a5 5 0 0 1 10 0c0 4 1.5 5 1.5 5h-13S5 12 5 8zM8 16a2 2 0 0 0 4 0',
  search: 'M9 3a6 6 0 1 0 0 12A6 6 0 0 0 9 3zM17 17l-3.5-3.5',
  command: 'M6.5 3.5a2 2 0 1 1-2 2h11a2 2 0 1 1-2 2v5a2 2 0 1 1 2 2h-11a2 2 0 1 1 2-2z',
  play: 'M6 4.5l9 5.5-9 5.5z',
  plus: 'M10 4v12M4 10h12',
  chev: 'M5 7.5l5 5 5-5',
  flask: 'M8 2.5v4.2L4 14a1.5 1.5 0 0 0 1.3 2.2h9.4A1.5 1.5 0 0 0 16 14l-4-7.3V2.5M7 2.5h6',
  graph: 'M4 16V8M9 16V4M14 16v-6',
  layers: 'M10 3l7 4-7 4-7-4zM3 11l7 4 7-4',
  lock: 'M5.5 9V6.5a4.5 4.5 0 0 1 9 0V9M4.5 9h11v7h-11z',
  pulse: 'M2 10h3l2-5 3 10 2-5h6',
  compare: 'M10 3v14M5 7l-2 2 2 2M15 7l2 2-2 2',
  filter: 'M3 4.5h14l-5.5 6.5V16l-3 1.5v-7z',
  brain: 'M7 4a3 3 0 0 0-3 3 2.5 2.5 0 0 0-1 4.5A2.5 2.5 0 0 0 6 15a2.5 2.5 0 0 0 4 0 2.5 2.5 0 0 0 4 0 2.5 2.5 0 0 0 3-3.5A2.5 2.5 0 0 0 16 7a3 3 0 0 0-3-3 2.5 2.5 0 0 0-3-1 2.5 2.5 0 0 0-3 1z',
  calendar: 'M4 5h12v11H4zM4 8.5h12M7 2.5v3M13 2.5v3M7 11.5h2M11 11.5h2',
  canvas: 'M3.5 4.5h13v11h-13zM10 8.2v5M7.5 10.7h5',
  embed: 'M7 6.5L4 10l3 3.5M13 6.5l3 3.5-3 3.5',
  upload: 'M10 3v9M6.5 6L10 2.5 13.5 6M4 16.5h12',
  grid: 'M3.5 3.5h5v5h-5zM11.5 3.5h5v5h-5zM3.5 11.5h5v5h-5zM11.5 11.5h5v5h-5z',
  link: 'M8 11l4-4M7 9l-2 2a2.5 2.5 0 1 0 3.5 3.5l2-2M13 11l2-2A2.5 2.5 0 0 0 11.5 5.5l-2 2',
};
function Icon({ name, size = 20, sw = 1.6, fill = false, style }) {
  const d = ICONS[name] || '';
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill={fill ? 'currentColor' : 'none'}
      stroke={fill ? 'none' : 'currentColor'} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" style={style}>
      <path d={d} />
    </svg>
  );
}

const EV_COLOR = {
  definite: 'var(--ev-definite)', probable: 'var(--ev-probable)', mimic: 'var(--ev-mimic)',
  indeterminate: 'var(--ev-indeterminate)', insufficient: 'var(--ev-insufficient)',
};
const EV_LABEL = { definite: 'Definite', probable: 'Probable', mimic: 'Caution · mimic', indeterminate: 'Indeterminate', insufficient: 'Insufficient' };
function EvRing({ state }) {
  const c = 'currentColor';
  if (state === 'definite') return (<svg className="ring" viewBox="0 0 16 16"><circle cx="8" cy="8" r="6" fill={c} opacity=".22"/><circle cx="8" cy="8" r="6" fill="none" stroke={c} strokeWidth="2"/></svg>);
  if (state === 'probable') return (<svg className="ring" viewBox="0 0 16 16"><circle cx="8" cy="8" r="6" fill="none" stroke={c} strokeWidth="2" strokeDasharray="28.3 9.4" strokeLinecap="round" transform="rotate(-90 8 8)"/></svg>);
  if (state === 'mimic') return (<svg className="ring" viewBox="0 0 16 16"><circle cx="8" cy="8" r="6" fill="none" stroke={c} strokeWidth="2" strokeDasharray="2.2 2.6"/></svg>);
  if (state === 'indeterminate') return (<svg className="ring" viewBox="0 0 16 16"><circle cx="8" cy="8" r="6" fill="none" stroke={c} strokeWidth="2" strokeDasharray="0.1 3" strokeLinecap="round"/></svg>);
  return (<svg className="ring" viewBox="0 0 16 16"><defs><pattern id={'h'+Math.random().toString(36).slice(2,7)} width="3" height="3" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="3" stroke={c} strokeWidth="1.1"/></pattern></defs><circle cx="8" cy="8" r="6" fill="none" stroke={c} strokeWidth="1.3"/></svg>);
}
function EvChip({ state, label }) {
  return (<span className={'ev-chip ' + state}><EvRing state={state}/>{label || EV_LABEL[state]}</span>);
}

/* ── live clock status card ── */
function StatusCard({ d, ctx }) {
  const [now, setNow] = React.useState(new Date());
  React.useEffect(() => { const t = setInterval(() => setNow(new Date()), 1000); return () => clearInterval(t); }, []);
  const hh = String(now.getHours()).padStart(2, '0');
  const mm = String(now.getMinutes()).padStart(2, '0');
  const date = now.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' });
  const plane = (ctx && ctx.plane === 'clinical') ? 'Clinical' : 'Research';
  const chan = (ctx && ctx.channel) || 'A';
  const chanLab = { A: 'A · pointer-only', B: 'B · clinical-context', C: 'C · full evidence' }[chan];
  return (
    <div className="gcard statusc">
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
        <div className="time num">{hh}:{mm}</div>
        <div className="date">{date}</div>
      </div>
      <div className="status-rows">
        <div className="srow"><span className="k">Plane</span><span className="v">{plane}</span></div>
        <div className="srow"><span className="k">Channel</span><span className="v">{chanLab}</span></div>
        <div className="srow"><span className="k">Model build</span><span className="v">{d.abbr.toLowerCase()}-rad · v4.2.1</span></div>
        <div className="srow"><span className="k">Calibration ECE</span><span className="v">{d.calib}</span></div>
        <div className="srow"><span className="k">Sync</span><span className="v" style={{ color: 'var(--positive)' }}>● live</span></div>
      </div>
    </div>
  );
}

/* ── OVERVIEW (bento) ── */
function Overview({ d, ctx }) {
  return (
    <div className="bento mod-enter">
      <div className="bento-top">

        {/* hero */}
        <div className="gcard hero">
          <div className="hero-media">
            <div className="render"></div>
            <div className="grid-tex"></div>
            <image-slot id={'hero-' + d.id} shape="rect" fit="cover" placeholder="Drop a volumetric render / MRI"></image-slot>
            <span className="pin" style={{ left: '52%', top: '30%' }}></span>
            <span className="pin" style={{ left: '63%', top: '46%' }}></span>
            <span className="pin" style={{ left: '47%', top: '58%' }}></span>
          </div>

          <div className="hero-vital">
            <span className="pill"><span style={{ color: 'var(--fg-muted)' }}>{d.vital.k}</span> <b style={{ color: 'var(--accent)' }}>{d.vital.v}</b></span>
            <svg className="hero-spark" viewBox="0 0 260 56" preserveAspectRatio="none">
              <path d="M0,34 C30,30 40,18 60,22 C82,26 92,40 112,38 C133,36 142,12 165,16 C188,20 196,40 215,34 C232,29 244,24 260,26"
                fill="none" stroke="rgba(255,255,255,.5)" strokeWidth="1.6"/>
              <circle cx="165" cy="16" r="3" fill="#fff"/>
            </svg>
          </div>

          <div className="hero-in">
            <div className="hero-h">{d.heroTitle}<span className="sub">{d.heroSub}</span></div>
            <div className="hero-info">
              <div className="ttl">{d.info.title}</div>
              <div className="desc">{d.info.desc}</div>
              <div className="mini-chips">
                {d.info.chips.map((c, i) => <span key={i} className={'mini-chip' + (i === 0 ? ' on' : '')}>{c}</span>)}
              </div>
            </div>
          </div>

          <div className="hero-cta">
            <div className="bubble">
              <div className="t">{d.cta.t}</div>
              <a href="#">{d.cta.a} →</a>
            </div>
          </div>
        </div>

        {/* right column */}
        <div className="bento-right">
          <StatusCard d={d} ctx={ctx} />
          <div className="gcard imgc">
            <div className="imgc-head">
              <div className="il"><span className="card-k">Latest read</span><span className="il-dx">{d.abbr}-series · 184 slices</span></div>
              <span className="il-date mono">2026-05-22</span>
            </div>
            <div className="media">
              <image-slot id={'img-' + d.id} shape="rect" fit="cover" placeholder="Drop latest series"></image-slot>
              <div className="scan-fx"></div>
              <div className="ov">
                <div className="badge-row">
                  <span className="scan-pill">Axial · T2 FLAIR</span>
                  <span className="scan-pill accent-pill">Uncertainty map</span>
                </div>
                <button className="scan-play"><Icon name="play" size={16} fill /></button>
              </div>
            </div>
            <div className="imgc-foot">
              <span className="ev-chip probable" style={{ height: 26 }}><EvRing state="probable" /> Probable</span>
              <span className="imgc-open">Open in Imaging <Icon name="embed" size={13} /></span>
            </div>
          </div>
        </div>
      </div>

      {/* bottom row */}
      <div className="bento-bot">

        {/* triage */}
        <div className="gcard triage">
          <div className="triage-head">
            <div>
              <div className="card-k">Needs review</div>
              <div className="card-t" style={{ marginTop: 4 }}>{d.review} cases across {d.name}</div>
            </div>
            <div className="right"><span className="btn ghost" style={{ height: 30 }}>See all</span></div>
          </div>
          <div className="triage-scroll">
            {d.triage.map((c) => (
              <div key={c.id} className="tcase">
                <div className="id">{c.id}</div>
                <div className="dx">{c.dx}</div>
                <div style={{ marginTop: 9 }}><span style={{ color: EV_COLOR[c.state] }}><EvChip state={c.state} label={EV_LABEL[c.state].split(' ')[0]} /></span></div>
                <div className="foot">
                  <span className="mini-chip" style={{ height: 22, fontSize: 11 }}>{c.age}</span>
                  <span style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--fg-faint)', fontFamily: 'var(--font-mono)' }}>{c.delta}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* metrics */}
        <div className="gcard" style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div className="card-k">Program metrics · 7 days</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 9, flex: 1 }}>
            {d.metrics.map((m, i) => (
              <div key={i} className="mtile" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 14px' }}>
                <div style={{ flex: 1 }}>
                  <div className="lab">{m.lab}</div>
                  <div className="val num">{m.val}</div>
                </div>
                <div className={'delta ' + (m.dir === 'up' ? 'up' : m.dir === 'down' ? 'down' : '')} style={{ marginTop: 0, color: m.dir === 'flat' ? 'var(--fg-faint)' : '' }}>{m.delta}</div>
              </div>
            ))}
          </div>
        </div>

        {/* calibration ring */}
        <div className="gcard ringc">
          <div style={{ display: 'flex', width: '100%', alignItems: 'flex-start' }}>
            <div className="card-k">Model calibration</div>
            <span className="mini-chip" style={{ marginLeft: 'auto', height: 26 }}>Month ▾</span>
          </div>
          <div className="ring-wrap dial" style={{ width: 150, height: 150 }}>
            <svg width="150" height="150" viewBox="0 0 150 150" style={{ transform: 'rotate(-90deg)' }}>
              <circle cx="75" cy="75" r="62" fill="none" stroke="var(--ink-700)" strokeWidth="11" />
              <circle className="arc2" cx="75" cy="75" r="62" fill="none" stroke="url(#rg)" strokeWidth="11" strokeLinecap="round"
                style={{ '--circ': 389.6, '--arc-off': 389.6 * (1 - d.ring / 100) }} />
              <defs><linearGradient id="rg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={d.accent} /><stop offset="1" stopColor={d.accent2} /></linearGradient></defs>
            </svg>
            <div className="ctr">
              <div className="num" style={{ fontSize: 30, fontWeight: 600 }} data-countup={d.ring} data-suffix="%">0%</div>
              <div style={{ fontSize: 11, color: 'var(--fg-faint)' }}>{d.ringLab}</div>
            </div>
          </div>
          <div style={{ fontSize: 11.5, color: 'var(--fg-muted)', textAlign: 'center', marginTop: 2 }}>Reliability within ±3% across {d.cohort.toLocaleString()} reads</div>
        </div>
      </div>
    </div>
  );
}

/* ── IMAGING ── */
function Imaging({ d }) {
  const series = ['T2 FLAIR', 'T1 +C', 'DWI', 'SWI', 'rCBV'];
  return (
    <div className="modwrap mod-enter">
      <div className="viewer">
        <div className="serierail">
          {series.map((s, i) => (
            <div key={s} className={'serithumb' + (i === 0 ? ' on' : '')}><span className="lb">{s}</span></div>
          ))}
        </div>
        <div className="viewport-c">
          <image-slot id={'view-' + d.id} shape="rect" fit="cover" placeholder="Drop DICOM / volumetric series"></image-slot>
          <div className="vp-tools">
            <span className="glasspill"><Icon name="layers" size={13} /> Segmentation</span>
            <span className="glasspill" style={{ color: 'var(--accent)' }}>Uncertainty map</span>
            <span className="glasspill">Boundary</span>
            <div className="right">
              <span className="glasspill"><Icon name="compare" size={13} /> Compare</span>
              <span className="glasspill"><Icon name="scan" size={13} /> W/L</span>
            </div>
          </div>
          <div className="vp-bottom">
            <span className="glasspill" style={{ fontFamily: 'var(--font-mono)' }}>slice 78 / 184</span>
            <div className="scrubber"><i></i><span className="h"></span></div>
            <span className="glasspill" style={{ fontFamily: 'var(--font-mono)' }}>2.0mm</span>
          </div>
          <div style={{ position: 'absolute', left: 16, bottom: 58, zIndex: 3 }}>
            <span className="ev-chip insufficient" style={{ background: 'var(--glass-2)', backdropFilter: 'blur(8px)' }}><EvRing state="insufficient" /> rCBV region abstained</span>
          </div>
        </div>
        <div className="scroll-y" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div className="gcard" style={{ padding: '15px 16px' }}>
            <div className="card-k">Read summary</div>
            <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div className="srow"><span className="k">Lesion volume</span><span className="v">0.42 cm³</span></div>
              <div className="srow"><span className="k">Δ vs prior</span><span className="v" style={{ color: 'var(--ev-mimic)' }}>+18%</span></div>
              <div className="srow"><span className="k">Enhancement</span><span className="v">nodular</span></div>
              <div className="srow"><span className="k">Margin</span><span className="v">posterior</span></div>
            </div>
          </div>
          <div className="gcard" style={{ padding: '15px 16px' }}>
            <div className="card-k">Calibrated finding</div>
            <div style={{ marginTop: 11 }}><EvChip state="probable" /></div>
            <div className="unc" style={{ marginTop: 13 }}>
              <div className="unc-band"><div className="unc-interval" style={{ left: '58%', width: '25%' }}></div><div className="unc-point" style={{ left: '72%' }}></div></div>
              <div className="unc-scale" style={{ marginTop: 6 }}><span>tx effect</span><span>recurrence</span></div>
            </div>
          </div>
          <div className="gcard" style={{ padding: '15px 16px' }}>
            <div className="card-k">Provenance</div>
            <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 9 }}>
              <div className="srow"><span className="k">Build</span><span className="v">{d.abbr.toLowerCase()}-rad v4.2.1</span></div>
              <div className="srow"><span className="k">Weights</span><span className="v">a3f9·c1e7</span></div>
              <div className="srow"><span className="k">Data card</span><span className="v">PF-21</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── ENGINES ── */
function Engines({ d }) {
  return (
    <div className="modwrap mod-enter">
      <div className="panel-grid" style={{ gridTemplateColumns: '1.3fr 1fr' }}>
        <div className="gcard scroll-y" style={{ padding: '6px 18px' }}>
          {window.AURORA.engines.map((e, i) => (
            <div key={i} className="engine" style={{ borderBottom: i < window.AURORA.engines.length - 1 ? 'var(--hair-soft)' : 'none' }}>
              <div className="ico"><Icon name={['scan','cpu','pulse','graph','layers'][i] || 'cpu'} size={20} /></div>
              <div style={{ minWidth: 0 }}>
                <div className="nm">{e.name}</div>
                <div className="ds">{e.ds}</div>
              </div>
              <div className="st">
                <div style={{ display: 'flex', alignItems: 'center', gap: 7, justifyContent: 'flex-end' }}>
                  <span className="dot" style={{ background: e.good ? 'var(--positive)' : 'var(--ev-mimic)' }}></span>
                  <span style={{ fontSize: 12, color: e.good ? 'var(--positive)' : 'var(--ev-mimic)' }}>{e.state}</span>
                </div>
                <div className="mono" style={{ fontSize: 11, color: 'var(--fg-faint)', marginTop: 3 }}>{e.tag}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="gcard kgraph" style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column' }}>
          <div className="card-k">Knowledge graph · cross-disease substrate</div>
          <svg viewBox="0 0 320 240" style={{ flex: 1, marginTop: 8 }}>
            <g stroke="var(--ink-600)" strokeWidth="1.2">
              <line x1="160" y1="120" x2="80" y2="60" /><line x1="160" y1="120" x2="250" y2="70" />
              <line x1="160" y1="120" x2="70" y2="180" /><line x1="160" y1="120" x2="245" y2="180" />
              <line x1="80" y1="60" x2="250" y2="70" /><line x1="70" y1="180" x2="245" y2="180" />
            </g>
            {[[160,120,'CSF',13,true],[80,60,'reserve',9],[250,70,'one-FM',9],[70,180,'flow',8],[245,180,'niche',8]].map((n,i)=>(
              <g key={i}>
                <circle cx={n[0]} cy={n[1]} r={n[3]} fill={n[4] ? d.accent : 'var(--ink-700)'} stroke={n[4] ? 'none' : 'var(--ink-500)'} strokeWidth="1.2"/>
                <text x={n[0]} y={n[1]+n[3]+13} fontSize="11" fill="var(--fg-muted)" textAnchor="middle" fontFamily="var(--font-sans)">{n[2]}</text>
              </g>
            ))}
          </svg>
          <div style={{ fontSize: 11.5, color: 'var(--fg-faint)' }}>{d.name} shares the CSF · reserve · one-FM substrate with 4 other programs.</div>
        </div>
      </div>
    </div>
  );
}

/* ── REGISTRY ── */
function Registry({ d }) {
  const rows = d.triage.concat(d.triage.slice(0, 2)).map((c, i) => ({ ...c, age: c.age, last: ['2d', '5d', '1w', '2w', '3w', '1mo', '6w', '2mo'][i] }));
  return (
    <div className="modwrap mod-enter">
      <div className="panel-grid" style={{ gridTemplateRows: 'auto 1fr' }}>
        <div style={{ display: 'flex', gap: 9, alignItems: 'center' }}>
          <span className="glasspill" style={{ height: 32 }}><Icon name="filter" size={14} /> All ages</span>
          <span className="glasspill" style={{ height: 32 }}>Evidence: any</span>
          <span className="glasspill" style={{ height: 32 }}>Plane: research</span>
          <span className="glasspill" style={{ height: 32, marginLeft: 'auto', color: 'var(--accent)' }}>Equity slices</span>
          <span style={{ fontSize: 12, color: 'var(--fg-faint)' }}>{d.cohort.toLocaleString()} records</span>
        </div>
        <div className="gcard scroll-y" style={{ padding: 0 }}>
          <table className="dgrid">
            <thead><tr><th>Case</th><th>Diagnosis</th><th>Age</th><th>Evidence</th><th>Δ</th><th>Last read</th><th>Identifiability</th></tr></thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i}>
                  <td className="mono">{r.id}</td>
                  <td style={{ fontWeight: 500 }}>{r.dx}</td>
                  <td>{r.age}</td>
                  <td><span style={{ color: EV_COLOR[r.state] }}><EvChip state={r.state} label={EV_LABEL[r.state].split(' ')[0]} /></span></td>
                  <td className="mono">{r.delta}</td>
                  <td className="mono">{r.last}</td>
                  <td className="mono">i{(i % 3) + 1}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ── GOVERNANCE ── */
function Govern({ d }) {
  return (
    <div className="modwrap mod-enter">
      <div className="panel-grid" style={{ gridTemplateColumns: '1.25fr 1fr' }}>
        <div className="gcard scroll-y" style={{ padding: '18px 20px' }}>
          <div className="card-k">Refusal report · what {d.name} declined</div>
          <div style={{ marginTop: 6 }}>
            {window.AURORA.refusals.map((r, i) => (
              <div key={i} className="refrow">
                <div className="ico"><Icon name="lock" size={16} /></div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 600 }}>{r.t}</div>
                  <div style={{ fontSize: 12, color: 'var(--fg-muted)', marginTop: 3 }}>{r.d}</div>
                </div>
                <div className="mono" style={{ fontSize: 11, color: 'var(--fg-faint)', whiteSpace: 'nowrap' }}>{r.n}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, minHeight: 0 }}>
          <div className="gcard" style={{ padding: '16px 18px' }}>
            <div className="card-k">Intended-use boundary</div>
            <div style={{ fontSize: 13, color: 'var(--fg-muted)', lineHeight: '20px', marginTop: 10 }}>
              <b style={{ color: 'var(--fg)' }}>Decision support only.</b> {d.name} outputs evidence with calibrated uncertainty and honest abstention — never an autonomous recommendation or directive.
            </div>
            <div style={{ display: 'flex', gap: 7, marginTop: 13, flexWrap: 'wrap' }}>
              <span className="ev-chip probable" style={{ background: 'color-mix(in oklab,var(--positive) 12%,transparent)', color: 'var(--positive)', borderColor: 'transparent' }}>HIPAA</span>
              <span className="mini-chip">SOC-2</span>
              <span className="mini-chip">Non-prescriptive</span>
              <span className="mini-chip">Synthetic public</span>
            </div>
          </div>
          <div className="gcard" style={{ padding: '16px 18px', flex: 1 }}>
            <div className="card-k">Model & data card</div>
            <div style={{ marginTop: 11, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div className="srow"><span className="k">Build</span><span className="v">{d.abbr.toLowerCase()}-rad v4.2.1</span></div>
              <div className="srow"><span className="k">Frozen weights</span><span className="v">a3f9·c1e7·b204</span></div>
              <div className="srow"><span className="k">Calibration ECE</span><span className="v">{d.calib}</span></div>
              <div className="srow"><span className="k">Abstention rate</span><span className="v">{d.abstain}</span></div>
              <div className="srow"><span className="k">Cohort</span><span className="v">{d.cohort.toLocaleString()} reads</span></div>
              <div className="srow"><span className="k">Equity audit</span><span className="v" style={{ color: 'var(--positive)' }}>passed · 9 slices</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── WORKSPACE / CANVAS (template import surface) ── */
function Workspace({ d }) {
  const targets = [
    { id: 'overview', name: 'Overview', icon: 'home' },
    { id: 'imaging', name: 'Imaging', icon: 'scan' },
    { id: 'engines', name: 'Engines', icon: 'cpu' },
    { id: 'registry', name: 'Registry', icon: 'table' },
    { id: 'calendar', name: 'Calendar', icon: 'calendar' },
  ];
  const [target, setTarget] = React.useState('overview');
  const t = targets.find(x => x.id === target);
  return (
    <div className="modwrap mod-enter">
      <div className="ws">
        <div className="ws-head">
          <div>
            <div className="card-k" style={{ whiteSpace: 'nowrap' }}>Program workspace · template</div>
            <div className="card-t" style={{ marginTop: 4, whiteSpace: 'nowrap' }}>{d.name} canvas</div>
          </div>
          <div className="ws-targets">
            <span style={{ fontSize: 11.5, color: 'var(--fg-faint)', marginRight: 2 }}>Import view:</span>
            {targets.map(x => (
              <button key={x.id} className={'ws-chip' + (x.id === target ? ' on' : '')} onClick={() => setTarget(x.id)}>
                <Icon name={x.icon} size={14} /> {x.name}
              </button>
            ))}
          </div>
        </div>

        <div className="ws-body">
          <div className="ws-canvas">
            <image-slot id={'canvas-' + d.id + '-' + target} shape="rect" fit="contain"
              placeholder={'Blank canvas — drop or import the ' + t.name + ' view for ' + d.name}></image-slot>
            <div className="ws-empty">
              <div className="ws-empty-ico"><Icon name={t.icon} size={26} /></div>
              <div className="ws-empty-t">Import the {t.name} view for {d.name}</div>
              <div className="ws-empty-s">This section is a per-program template slot. Drop an image, embed a live view, or pull from a connected module — it persists per program and per module.</div>
              <div className="ws-empty-actions">
                <span className="btn primary" style={{ height: 36 }}><Icon name="upload" size={15} /> Import view</span>
                <span className="btn" style={{ height: 36 }}><Icon name="embed" size={15} /> Embed URL</span>
                <span className="btn" style={{ height: 36 }}><Icon name="link" size={15} /> From module</span>
              </div>
            </div>
          </div>

          <div className="ws-side">
            <div className="gcard" style={{ padding: '15px 16px' }}>
              <div className="card-k">Imported blocks</div>
              <div className="ws-blocks">
                {targets.map((x, i) => (
                  <div key={x.id} className={'ws-block' + (x.id === target ? ' on' : '')} onClick={() => setTarget(x.id)}>
                    <div className="ico"><Icon name={x.icon} size={15} /></div>
                    <div className="nm">{x.name}</div>
                    <span className="st">{i === 0 ? 'linked' : 'empty'}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="gcard" style={{ padding: '15px 16px' }}>
              <div className="card-k">Template scope</div>
              <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 9 }}>
                <div className="srow"><span className="k">Program</span><span className="v">{d.abbr}</span></div>
                <div className="srow"><span className="k">Modules</span><span className="v">{window.AURORA.modules.length}</span></div>
                <div className="srow"><span className="k">Shared shell</span><span className="v" style={{ color: 'var(--positive)' }}>uniform</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── CALENDAR (uniform across all programs, hospital-paired) ── */
function Calendar({ d }) {
  const { days, dates, hours, events } = window.AURORA.calendar;
  const sites = window.AURORA.sites;
  const siteOf = (id) => sites.find(s => s.id === id) || sites[0];
  const H0 = hours[0], HN = hours[hours.length - 1];
  const span = HN - H0;
  const todayIdx = 2; // Wed highlighted
  const localize = (title) => title.replace('{D}', d.name);
  // agenda = today's events
  const agenda = events.filter(e => e.day === todayIdx).sort((a, b) => a.start - b.start);

  return (
    <div className="modwrap mod-enter">
      <div className="panel-grid" style={{ gridTemplateColumns: '264px 1fr' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, minHeight: 0 }}>
          <div className="gcard" style={{ padding: '16px 17px' }}>
            <div className="card-k">Paired hospitals</div>
            <div className="site-list">
              {sites.map(s => (
                <div key={s.id} className="site-row">
                  <span className="site-dot" style={{ background: s.color }}></span>
                  <span className="site-nm">{s.name}</span>
                  <span className={'site-st' + (s.synced ? ' ok' : '')}>{s.synced ? 'synced' : 'pair'}</span>
                </div>
              ))}
            </div>
            <button className="btn" style={{ width: '100%', marginTop: 13, height: 36 }}><Icon name="plus" size={14} /> Pair a hospital</button>
          </div>
          <div className="gcard" style={{ padding: '16px 17px', flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
            <div className="card-k">Today · Wed {dates[todayIdx]} June</div>
            <div className="agenda scroll-y" style={{ marginTop: 10 }}>
              {agenda.map((e, i) => {
                const s = siteOf(e.site);
                return (
                  <div key={i} className="ag-row">
                    <span className="ag-bar" style={{ background: s.color }}></span>
                    <div style={{ minWidth: 0 }}>
                      <div className="ag-t">{localize(e.title)}</div>
                      <div className="ag-s">{s.short} · {e.kind}</div>
                    </div>
                    <span className="ag-time mono">{fmtH(e.start)}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="gcard" style={{ padding: '14px 16px 8px', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          <div className="cal-head">
            <div className="card-t">This week · June {dates[0]}–{dates[dates.length - 1]}</div>
            <div className="right" style={{ marginLeft: 'auto', display: 'flex', gap: 8, alignItems: 'center' }}>
              <span className="segm"><span className="on">Week</span><span>Month</span></span>
              <span className="glasspill" style={{ height: 30 }}><Icon name="link" size={13} /> {d.name} program</span>
            </div>
          </div>
          <div className="cal-grid">
            <div className="cal-gutter">
              <div className="cal-corner"></div>
              {hours.map(h => <div key={h} className="cal-hour"><span>{fmtH(h)}</span></div>)}
            </div>
            {days.map((dy, di) => (
              <div key={dy} className={'cal-col' + (di === todayIdx ? ' today' : '')}>
                <div className="cal-dayhead"><span className="dn">{dy}</span><span className="dd">{dates[di]}</span></div>
                <div className="cal-track">
                  {hours.map((h, hi) => hi < hours.length - 1 && <div key={h} className="cal-cell"></div>)}
                  {events.filter(e => e.day === di).map((e, i) => {
                    const s = siteOf(e.site);
                    const top = ((e.start - H0) / span) * 100;
                    const hgt = ((e.end - e.start) / span) * 100;
                    return (
                      <div key={i} className="cal-ev" style={{ top: top + '%', height: hgt + '%',
                        background: 'color-mix(in oklab, ' + s.color + ' 20%, transparent)',
                        borderLeft: '2.5px solid ' + s.color }}>
                        <div className="ce-t">{localize(e.title)}</div>
                        <div className="ce-s">{fmtH(e.start)} · {s.short}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
function fmtH(h) { const hr = Math.floor(h); const m = Math.round((h - hr) * 60); return String(hr).padStart(2, '0') + ':' + String(m).padStart(2, '0'); }

window.CLIN = { Icon, EvChip, EvRing, Overview, Imaging, Engines, Registry, Govern, Workspace, Calendar, ICONS };
