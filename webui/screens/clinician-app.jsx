/* AURORA clinician — app shell. Reads window.AURORA (data) + window.CLIN (modules). */
const { useState, useEffect, useRef } = React;
const A = window.AURORA;
const { Icon } = window.CLIN;

const ACCENTS = [
{ id: 'disease', label: 'Match disease' },
{ id: '#5B8DEF', label: 'Indigo' },
{ id: '#2BD4C0', label: 'Teal' },
{ id: '#A78BFA', label: 'Violet' },
{ id: '#38BDF8', label: 'Sky' }];


function Switch({ on, onClick, lock }) {
  return <div className={'sw2' + (on ? ' on' : '') + (lock ? ' lock' : '')} onClick={lock ? null : onClick}><i></i></div>;
}

function Settings({ st, set, onClose }) {
  const isLight = typeof document !== 'undefined' && document.body.classList.contains('theme-light');
  return (
    <>
      <div className={'scrim' + (st.open ? ' show' : '')} onClick={onClose}></div>
      <aside className={'settings' + (st.open ? ' show' : '')}>
        <div className="set-head">
          <span className="t">Settings</span>
          <button className="icon-btn2 x" onClick={onClose}><Icon name="plus" size={16} style={{ transform: 'rotate(45deg)' }} /></button>
        </div>
        <div className="set-body">

          <div className="set-sec">
            <div className="sh">Appearance</div>
            <div className="set-row">
              <div className="info"><div className="nm">Surface</div><div className="ds">Dark instrument · light reading</div></div>
              <div className="ctl segm">
                <a href="clinician.html" className={isLight ? '' : 'on'} style={{ textDecoration: 'none' }}>Dark</a>
                <a href="clinician-light.html" className={isLight ? 'on' : ''} style={{ textDecoration: 'none' }}>Light</a>
              </div>
            </div>
            <div className="set-row">
              <div className="info"><div className="nm">Accent</div><div className="ds">Drives highlights, focus &amp; charts</div></div>
              <div className="ctl swatches">
                {ACCENTS.map((a) =>
                <div key={a.id} title={a.label}
                className={'s' + (st.accent === a.id ? ' on' : '')}
                style={{ background: a.id === 'disease' ? 'var(--brand-grad)' : a.id }}
                onClick={() => set({ accent: a.id })}></div>
                )}
              </div>
            </div>
            <div className="set-row">
              <div className="info"><div className="nm">Density</div><div className="ds">Spacing of cards &amp; tables</div></div>
              <div className="ctl segm">
                {['cozy', 'compact'].map((v) => <span key={v} className={st.density === v ? 'on' : ''} onClick={() => set({ density: v })}>{v[0].toUpperCase() + v.slice(1)}</span>)}
              </div>
            </div>
            <div className="set-row">
              <div className="info"><div className="nm">Glass surfaces</div><div className="ds">Backdrop blur on panels</div></div>
              <div className="ctl"><Switch on={st.glass} onClick={() => set({ glass: !st.glass })} /></div>
            </div>
            <div className="set-row">
              <div className="info"><div className="nm">Reduce motion</div><div className="ds">Calmer transitions, no count-ups</div></div>
              <div className="ctl"><Switch on={st.motion} onClick={() => set({ motion: !st.motion })} /></div>
            </div>
          </div>

          <div className="set-sec">
            <div className="sh">Defaults</div>
            <div className="set-row">
              <div className="info"><div className="nm">Working plane</div><div className="ds">Research ↔ Clinical context</div></div>
              <div className="ctl segm">
                {['research', 'clinical'].map((v) => <span key={v} className={st.plane === v ? 'on' : ''} onClick={() => set({ plane: v })}>{v[0].toUpperCase() + v.slice(1)}</span>)}
              </div>
            </div>
            <div className="set-row">
              <div className="info"><div className="nm">PHI channel</div><div className="ds">A pointer · B context · C full</div></div>
              <div className="ctl segm">
                {['A', 'B', 'C'].map((v) => <span key={v} className={st.channel === v ? 'on' : ''} onClick={() => set({ channel: v })}>{v}</span>)}
              </div>
            </div>
          </div>

          <div className="set-sec">
            <div className="sh">Clinical safety</div>
            <div className="set-row">
              <div className="info"><div className="nm">Non-prescriptive UI</div><div className="ds">Outputs never styled as directives · locked</div></div>
              <div className="ctl"><Switch on={true} lock /></div>
            </div>
            <div className="set-row">
              <div className="info"><div className="nm">Always show abstention</div><div className="ds">Insufficient-evidence states stay visible</div></div>
              <div className="ctl"><Switch on={st.abst} onClick={() => set({ abst: !st.abst })} /></div>
            </div>
            <div className="set-row">
              <div className="info"><div className="nm">Provenance one-click</div><div className="ds">Model &amp; data card on every claim</div></div>
              <div className="ctl"><Switch on={st.prov} onClick={() => set({ prov: !st.prov })} /></div>
            </div>
          </div>

          <div className="set-sec">
            <div className="sh">Notifications</div>
            <div className="set-row">
              <div className="info"><div className="nm">ANAG routing</div><div className="ds">Doorbell-not-a-chart alerts</div></div>
              <div className="ctl"><Switch on={st.anag} onClick={() => set({ anag: !st.anag })} /></div>
            </div>
            <div className="set-row">
              <div className="info"><div className="nm">Critical alerts</div><div className="ds">Genuine clinical danger only</div></div>
              <div className="ctl"><Switch on={st.crit} onClick={() => set({ crit: !st.crit })} /></div>
            </div>
          </div>

          <div className="set-sec">
            <div className="sh">Account</div>
            <a href="screens/patient-dashboard.html" className="set-row" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="info"><div className="nm" style={{ color: 'var(--accent)' }}>Switch to patient view →</div><div className="ds">AURORA Care · Maya R.</div></div>
            </a>
            <div className="set-row">
              <div className="info"><div className="nm">Signed in</div><div className="ds">Dr. R. Kaur · neuro-oncology</div></div>
              <div className="ctl"><a href="login.html" className="btn" style={{ height: 32, textDecoration: 'none' }}>Sign out</a></div>
            </div>
          </div>

        </div>
      </aside>
    </>);

}

function DiseaseSwitcher({ dz, setDz }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const h = (e) => {if (ref.current && !ref.current.contains(e.target)) setOpen(false);};
    document.addEventListener('pointerdown', h);return () => document.removeEventListener('pointerdown', h);
  }, []);
  const cur = A.diseases.find((x) => x.id === dz);
  const groups = [...new Set(A.diseases.map((d) => d.group))];
  return (
    <div className={'dsw' + (open ? ' open' : '')} ref={ref}>
      <div className="dsw-btn" onClick={() => setOpen((o) => !o)} title="Switch program">
        <span className="dsw-dot"></span>
        <span><span className="dsw-name">{cur.name}</span><span className="dsw-sub" style={{ display: 'block' }}>{cur.group} · {cur.cohort.toLocaleString()} cases</span></span>
        <span className="dsw-chev"><Icon name="chev" size={15} /></span>
      </div>
      {open &&
      <div className="dsw-menu">
          <div className="dsw-menu-h">
            <span>Switch program</span>
            <span className="dsw-count">{A.diseases.length} diseases</span>
          </div>
          {groups.map((g) =>
        <div key={g}>
              <div className="grp">{g}</div>
              {A.diseases.filter((d) => d.group === g).map((d) =>
          <div key={d.id} className={'dsw-item' + (d.id === dz ? ' on' : '')} onClick={() => {setDz(d.id);setOpen(false);}} style={{ color: d.accent }}>
                  <span className="sw" style={{ background: d.accent }}></span>
                  <span className="dtxt">
                    <span className="nm">{d.name}</span>
                    <span className="sub2">{d.cohort.toLocaleString()} cases · ECE {d.calib}</span>
                  </span>
                  {d.review > 0 ?
            <span className="nrev" title={d.review + ' need review'}>{d.review}</span> :
            <span className="nrev zero">0</span>}
                  <svg className="chk" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M3.5 8.5l3 3 6-7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
          )}
            </div>
        )}
        </div>
      }
    </div>);

}

function App() {
  const [mod, setMod] = useState('overview');
  const DEFAULT_DZ = (typeof window !== 'undefined' && window.AURORA_DEFAULT_DZ) || 'glioma';
  const [dz, setDz] = useState(A.diseases.some((x) => x.id === DEFAULT_DZ) ? DEFAULT_DZ : 'glioma');
  const [st, setSt] = useState({
    open: false, accent: 'disease', density: 'cozy', glass: true, motion: false,
    plane: 'research', channel: 'A', abst: true, prov: true, anag: true, crit: true
  });
  const set = (p) => setSt((s) => ({ ...s, ...p }));
  const d = A.diseases.find((x) => x.id === dz);
  const accent = st.accent === 'disease' ? d.accent : st.accent;
  const accent2 = st.accent === 'disease' ? d.accent2 : d.accent2;
  const curMod = A.modules.find((m) => m.id === mod);

  // count-up on module/disease change (unless reduced motion)
  useEffect(() => {
    const nums = document.querySelectorAll('[data-countup]');
    nums.forEach((el) => {
      const target = parseFloat(el.getAttribute('data-countup'));
      const suf = el.getAttribute('data-suffix') || '';
      if (st.motion) {el.textContent = target + suf;return;}
      const dur = 620,t0 = performance.now();
      const step = (n) => {const t = Math.min(1, (n - t0) / dur);const e = 1 - Math.pow(1 - t, 3);el.textContent = Math.round(target * e) + suf;if (t < 1) requestAnimationFrame(step);};
      requestAnimationFrame(step);
    });
  }, [mod, dz, st.motion]);

  const Mod = window.CLIN[{ overview: 'Overview', imaging: 'Imaging', engines: 'Engines', registry: 'Registry', workspace: 'Workspace', calendar: 'Calendar', govern: 'Govern' }[mod]];
  const ctx = { plane: st.plane, channel: st.channel };

  const rootCls = 'clab' + (st.density === 'compact' ? ' compact' : '') + (st.motion ? ' reduce-motion' : '') + (!st.glass ? ' no-glass' : '');

  return (
    <div className={rootCls} style={{ '--accent': accent, '--accent-2': accent2 }}>
      {/* rail */}
      <nav className="rail">
        <div className="brand-row">
          <div className="logo"></div>
          <div className="wm">AURORA</div>
        </div>
        <div className="nav-label">Workspace</div>
        {A.modules.map((m) =>
        <button key={m.id} className={'rail-btn' + (m.id === mod ? ' on' : '')} onClick={() => setMod(m.id)}>
            <Icon name={m.icon} size={19} />
            {m.name}
            <span className="rb-sub">{m.sub}</span>
          </button>
        )}
        <div className="spacer"></div>
        <button className={'rail-btn' + (st.open ? ' on' : '')} onClick={() => set({ open: true })}>
          <Icon name="settings" size={19} /> Settings
        </button>
        <div className="rail-foot">
          <a href="login.html" className="ava" title="Account">RK</a>
          <div className="who">
            <div className="nm">Dr. R. Kaur</div>
            <div className="rl">Neuro-oncology</div>
          </div>
          <a href="login.html" className="icon-btn2" title="Sign out" style={{ marginLeft: 'auto', textDecoration: 'none' }}>
            <Icon name="upload" size={15} style={{ transform: 'rotate(90deg)' }} />
          </a>
        </div>
      </nav>

      {/* main */}
      <div className="mainc">
        <header className="topbar">
          <DiseaseSwitcher dz={dz} setDz={setDz} />
          <div className="plane">
            <span className="pthumb" style={{ left: st.plane === 'research' ? 3 : '50%', width: 'calc(50% - 3px)' }}></span>
            <span className={'pt' + (st.plane === 'research' ? ' on' : '')} onClick={() => set({ plane: 'research' })}><span className="dot" style={{ background: 'var(--accent)' }}></span>Research</span>
            <span className={'pt' + (st.plane === 'clinical' ? ' on' : '')} onClick={() => set({ plane: 'clinical' })}><span className="dot" style={{ background: 'var(--positive)' }}></span>Clinical</span>
          </div>
          <div className="tb-search"><Icon name="search" size={15} /> Search cases, engines, diseases… <span className="kbd">⌘K</span></div>
          <div className="tb-right">
            <div className="local-ind" title="All processing runs on-device; no patient data leaves this machine">
              <span className="dot" style={{ background: 'var(--positive)' }}></span> Local · de-identified
            </div>
            <div className="channel-ind" onClick={() => set({ channel: st.channel === 'A' ? 'B' : st.channel === 'B' ? 'C' : 'A' })} title="Cycle PHI channel">
              <Icon name="lock" size={14} /> Channel {st.channel}
            </div>
            <button className="icon-btn2"><Icon name="bell" size={17} />{st.anag && <span className="nd"></span>}</button>
            <button className="icon-btn2" onClick={() => set({ open: true })}><Icon name="settings" size={17} /></button>
          </div>
        </header>

        <main className="content">
          <div className="crumbs">
            <span className="h">{curMod.name}</span>
            <span className="sep">·</span>
            <span className="mod">{d.name} <span style={{ color: 'var(--fg-faint)' }}>/ {d.group}</span></span>
            <div className="right">
              <span className="glasspill" style={{ height: 30 }}><span className="dot" style={{ background: st.plane === 'research' ? 'var(--accent)' : 'var(--positive)' }}></span>{st.plane === 'research' ? 'Research plane' : 'Clinical plane'}</span>
              <span className="btn" style={{ height: 30 }}><Icon name="plus" size={14} /> Export</span>
            </div>
          </div>
          <div style={{ height: 'calc(100% - 40px)' }}>
            <Mod d={d} ctx={ctx} key={mod + dz} />
          </div>
        </main>

        <footer className="statusbar">
          <span className="sb-item"><span className="dot" style={{ background: 'var(--positive)' }}></span> Runs locally · no PHI leaves this device</span>
          <span className="sb-sep"></span>
          <span className="sb-item"><Icon name="lock" size={12} /> De-identified · channel {st.channel}</span>
          <span className="sb-sep"></span>
          <span className="sb-item"><Icon name="pulse" size={12} /> Tracking {d.cohort.toLocaleString()} patients · {d.review} need review</span>
          <span className="sb-right">
            <span className="sb-item mono">{d.abbr.toLowerCase()}-rad v4.2.1</span>
            <span className="sb-sep"></span>
            <span className="sb-item">{st.plane === 'research' ? 'Research plane' : 'Clinical plane'}</span>
            <span className="sb-sep"></span>
            <span className="sb-item">60 fps</span>
          </span>
        </footer>
      </div>

      <Settings st={st} set={set} onClose={() => set({ open: false })} />
    </div>);

}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);