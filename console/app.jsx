try {
  const m0 = window.AURORA_DATA && window.AURORA_DATA.modules && window.AURORA_DATA.modules[0];
  if (m0) document.title = `${m0.code} Console — ${m0.name}`;
} catch (e) {}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Shell />);
