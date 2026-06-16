(function () {
  const ev = { definite: 'definite', probable: 'probable', mimic: 'mimic', indeterminate: 'indeterminate', insufficient: 'insufficient' };

  const C = (id, dx, state, age, delta, note) => ({ id, dx, state, age, delta, note });

  const diseases = [
    {
      id: 'glioma', name: 'Glioma', abbr: 'GLIO', group: 'Neuro-oncology',
      accent: '#5B8DEF', accent2: '#2BD4C0',
      cohort: 1284, review: 7, abstain: '7.4%', calib: '0.031', ring: 86, ringLab: 'model calibration',
      heroTitle: 'Glioma program overview',
      heroSub: 'Pediatric low- & high-grade glioma · imaging, molecular, longitudinal surveillance.',
      info: { title: 'New enhancement flagged', desc: 'A 4.1 mm focus at a resection margin crossed the surveillance attention threshold.', chips: ['Recurrence', 'Margin'] },
      vital: { k: 'Recurrence signal', v: '0.72', sub: 'calibrated · CI 0.58–0.83' },
      cta: { t: 'Perfusion was motion-degraded — AURORA abstained on rCBV.', a: 'Why abstained' },
      metrics: [
        { lab: 'Cases in surveillance', val: '342', delta: '+12 this week', dir: 'up' },
        { lab: 'Awaiting review', val: '7', delta: '2 high-priority', dir: 'down' },
        { lab: 'Median read latency', val: '1.8s', delta: '−0.3s', dir: 'up' },
      ],
      triage: [
        C('GLIO-0417', 'Pilocytic astrocytoma · PF', ev.probable, '14y', '+4.1mm', 'margin enhancement'),
        C('GLIO-0392', 'Diffuse midline glioma', ev.definite, '8y', '+0.6cm³', 'H3 K27M'),
        C('GLIO-0451', 'Optic pathway glioma', ev.mimic, '5y', 'stable', 'tx effect?'),
        C('GLIO-0388', 'Ganglioglioma', ev.indeterminate, '11y', '+1.2mm', 'cystic change'),
        C('GLIO-0466', 'Pilomyxoid astrocytoma', ev.insufficient, '3y', 'n/a', 'perfusion abstained'),
        C('GLIO-0409', 'Low-grade glioma NOS', ev.probable, '9y', '+2.0mm', 'BRAF fusion'),
      ],
    },
    {
      id: 'hydro', name: 'Hydrocephalus', abbr: 'HYDRO', group: 'CSF & structural',
      accent: '#38BDF8', accent2: '#2BD4C0',
      cohort: 906, review: 4, abstain: '5.1%', calib: '0.028', ring: 82, ringLab: 'shunt-model calibration',
      heroTitle: 'Hydrocephalus overview',
      heroSub: 'Compensation, decompensation risk & life-course shunt / ETV tracking.',
      info: { title: 'Ventricular trend rising', desc: 'Fronto-occipital horn ratio increased across the last two studies in 3 cases.', chips: ['FOHR', 'Trend'] },
      vital: { k: 'Decompensation risk', v: '0.34', sub: 'calibrated · CI 0.21–0.49' },
      cta: { t: 'Two cases lack baseline ICP context — flagged for clinician input.', a: 'Review gaps' },
      metrics: [
        { lab: 'Active shunts tracked', val: '511', delta: '+8 this week', dir: 'up' },
        { lab: 'Awaiting review', val: '4', delta: '1 high-priority', dir: 'down' },
        { lab: 'ETV success est.', val: '71%', delta: '+2%', dir: 'up' },
      ],
      triage: [
        C('HYD-0211', 'Post-hemorrhagic · preterm', ev.probable, '4m', '+FOHR', 'horn ratio ↑'),
        C('HYD-0188', 'Aqueductal stenosis', ev.definite, '2y', 'stable', 'ETV candidate'),
        C('HYD-0240', 'Communicating HCP', ev.indeterminate, '6y', '+mild', 'compensation?'),
        C('HYD-0205', 'Shunt malfunction?', ev.mimic, '9y', 'n/a', 'artifact'),
        C('HYD-0233', 'Normal-pressure variant', ev.insufficient, '13y', 'n/a', 'insufficient'),
        C('HYD-0199', 'Loculated ventricle', ev.probable, '3y', '+septation', 'endoscopy'),
      ],
    },
    {
      id: 'spina', name: 'Spina bifida', abbr: 'SPINA', group: 'Spinal',
      accent: '#34D399', accent2: '#2BD4C0',
      cohort: 642, review: 5, abstain: '6.0%', calib: '0.034', ring: 79, ringLab: 'repair-outcome calibration',
      heroTitle: 'Spina bifida overview',
      heroSub: 'Prenatal repair, protection & life-course neuro-urologic tracking.',
      info: { title: 'Hindbrain herniation', desc: 'Chiari-II descent reduced post fetal repair in the latest cohort review.', chips: ['Prenatal', 'Hindbrain'] },
      vital: { k: 'Re-tether risk', v: '0.28', sub: 'calibrated · CI 0.17–0.42' },
      cta: { t: 'Urodynamic series incomplete for 1 case — assessment withheld.', a: 'Review gaps' },
      metrics: [
        { lab: 'Repairs tracked', val: '288', delta: '+5 this week', dir: 'up' },
        { lab: 'Awaiting review', val: '5', delta: '2 high-priority', dir: 'down' },
        { lab: 'Ambulation est.', val: '64%', delta: '+3%', dir: 'up' },
      ],
      triage: [
        C('SB-0140', 'Myelomeningocele · L4', ev.probable, '1y', '+motor', 'post-repair'),
        C('SB-0122', 'Open NTD · prenatal', ev.definite, 'fetal', 'repaired', '25wk repair'),
        C('SB-0155', 'Tethered cord, re-op?', ev.mimic, '7y', '+symptom', 're-tether?'),
        C('SB-0138', 'Lipomyelomeningocele', ev.indeterminate, '4y', 'stable', 'watch'),
        C('SB-0149', 'Neurogenic bladder', ev.insufficient, '9y', 'n/a', 'urodynamics'),
        C('SB-0131', 'Closed NTD', ev.probable, '2y', '+filum', 'imaging'),
      ],
    },
    {
      id: 'tethered', name: 'Tethered cord', abbr: 'TCS', group: 'Spinal',
      accent: '#22C7A9', accent2: '#5B8DEF',
      cohort: 418, review: 3, abstain: '8.2%', calib: '0.037', ring: 76, ringLab: 'release-model calibration',
      heroTitle: 'Tethered cord overview',
      heroSub: 'Signal detection, phenotype & surgical-release outcome tracking.',
      info: { title: 'Conus position', desc: 'Conus medullaris below L2 with thickened filum in 2 new referrals.', chips: ['Conus', 'Filum'] },
      vital: { k: 'Progression signal', v: '0.41', sub: 'calibrated · CI 0.29–0.55' },
      cta: { t: 'Lower-limb EMG missing in 1 referral — phenotype incomplete.', a: 'Review gaps' },
      metrics: [
        { lab: 'Referrals tracked', val: '203', delta: '+4 this week', dir: 'up' },
        { lab: 'Awaiting review', val: '3', delta: '1 high-priority', dir: 'down' },
        { lab: 'Release benefit est.', val: '68%', delta: '+1%', dir: 'up' },
      ],
      triage: [
        C('TCS-0091', 'Tight filum terminale', ev.probable, '6y', '+conus', 'below L2'),
        C('TCS-0084', 'Re-tethering post-op', ev.mimic, '10y', '+pain', 'scar vs tether'),
        C('TCS-0097', 'Fatty filum', ev.indeterminate, '3y', 'stable', 'incidental'),
        C('TCS-0079', 'Dermal sinus tract', ev.definite, '1y', '+tract', 'surgical'),
        C('TCS-0088', 'Occult dysraphism', ev.insufficient, '8y', 'n/a', 'EMG missing'),
        C('TCS-0093', 'Split cord type II', ev.probable, '5y', '+septum', 'bony spur'),
      ],
    },
    {
      id: 'dwm', name: 'Dandy-Walker', abbr: 'DWM', group: 'CSF & structural',
      accent: '#A78BFA', accent2: '#5B8DEF',
      cohort: 286, review: 2, abstain: '9.0%', calib: '0.041', ring: 74, ringLab: 'phenotype calibration',
      heroTitle: 'Dandy-Walker malformation',
      heroSub: 'Posterior-fossa origin & life-course developmental tracking.',
      info: { title: 'Vermian hypoplasia', desc: 'Tegmento-vermian angle widened in 1 prenatal referral pending review.', chips: ['Vermis', 'PF cyst'] },
      vital: { k: 'Developmental risk', v: '0.46', sub: 'calibrated · CI 0.31–0.61' },
      cta: { t: 'Prenatal MRI only — postnatal correlation pending, assessment deferred.', a: 'Review gaps' },
      metrics: [
        { lab: 'Cohort tracked', val: '142', delta: '+2 this week', dir: 'up' },
        { lab: 'Awaiting review', val: '2', delta: '1 prenatal', dir: 'down' },
        { lab: 'Shunt-free est.', val: '58%', delta: '+0%', dir: 'flat' },
      ],
      triage: [
        C('DWM-0044', 'Classic DWM', ev.definite, 'fetal', '+angle', 'prenatal'),
        C('DWM-0039', 'Vermian hypoplasia', ev.indeterminate, '2y', 'stable', 'spectrum'),
        C('DWM-0048', 'Mega cisterna magna', ev.mimic, '4y', 'n/a', 'variant?'),
        C('DWM-0041', 'Blake pouch cyst', ev.probable, '6m', '+cyst', 'fenestration'),
        C('DWM-0046', 'PF arachnoid cyst', ev.insufficient, '5y', 'n/a', 'deferred'),
        C('DWM-0037', 'Vermian agenesis', ev.probable, '1y', '+delay', 'develop'),
      ],
    },
    {
      id: 'enceph', name: 'Encephalocele', abbr: 'ENCEPH', group: 'Cranial',
      accent: '#F4978E', accent2: '#FBBF24',
      cohort: 174, review: 2, abstain: '10.1%', calib: '0.045', ring: 72, ringLab: 'forge-model calibration',
      heroTitle: 'Encephalocele overview',
      heroSub: 'Prism mapping & surgical-forge planning across sac contents.',
      info: { title: 'Sac contents', desc: 'Occipital sac with herniated neural tissue in 1 surgical candidate.', chips: ['Occipital', 'Neural'] },
      vital: { k: 'Neural-content risk', v: '0.55', sub: 'calibrated · CI 0.40–0.69' },
      cta: { t: 'Venous-sinus relationship unresolved on this sequence — abstained.', a: 'Why abstained' },
      metrics: [
        { lab: 'Cases tracked', val: '96', delta: '+1 this week', dir: 'up' },
        { lab: 'Awaiting review', val: '2', delta: '1 surgical', dir: 'down' },
        { lab: 'Repair planning', val: '8', delta: 'active', dir: 'flat' },
      ],
      triage: [
        C('ENC-0028', 'Occipital encephalocele', ev.probable, '6m', '+neural', 'surgical'),
        C('ENC-0024', 'Frontoethmoidal', ev.definite, '2y', 'mapped', 'forge plan'),
        C('ENC-0031', 'Atretic cephalocele', ev.mimic, '1y', 'n/a', 'variant?'),
        C('ENC-0026', 'Nasal glioma vs cele', ev.indeterminate, '3y', 'stable', 'biopsy?'),
        C('ENC-0029', 'Parietal cele', ev.insufficient, '4m', 'n/a', 'sinus map'),
        C('ENC-0022', 'Sincipital cele', ev.probable, '8m', '+sac', 'planning'),
      ],
    },
    {
      id: 'arach', name: 'Arachnoid cyst', abbr: 'ARACH', group: 'CSF & structural',
      accent: '#60A5FA', accent2: '#2BD4C0',
      cohort: 512, review: 3, abstain: '6.8%', calib: '0.033', ring: 80, ringLab: 'physics-model calibration',
      heroTitle: 'Arachnoid cyst overview',
      heroSub: 'Origin, CSF-flow physics & surgical-forge decisioning.',
      info: { title: 'Mass effect', desc: 'Middle-fossa cyst with mild midline shift on the newest study.', chips: ['Mass effect', 'Flow'] },
      vital: { k: 'Expansion signal', v: '0.31', sub: 'calibrated · CI 0.19–0.45' },
      cta: { t: 'Phase-contrast flow not acquired — communication status withheld.', a: 'Review gaps' },
      metrics: [
        { lab: 'Cysts tracked', val: '356', delta: '+6 this week', dir: 'up' },
        { lab: 'Awaiting review', val: '3', delta: '1 mass-effect', dir: 'down' },
        { lab: 'Intervention rate', val: '12%', delta: '−1%', dir: 'up' },
      ],
      triage: [
        C('ARA-0162', 'Middle-fossa cyst', ev.probable, '7y', '+shift', 'mass effect'),
        C('ARA-0155', 'Suprasellar cyst', ev.definite, '3y', '+size', 'fenestrate'),
        C('ARA-0168', 'Posterior-fossa cyst', ev.mimic, '5y', 'n/a', 'mega CM?'),
        C('ARA-0159', 'Interhemispheric', ev.indeterminate, '1y', 'stable', 'watch'),
        C('ARA-0164', 'Quadrigeminal cyst', ev.insufficient, '9y', 'n/a', 'flow study'),
        C('ARA-0151', 'Convexity cyst', ev.probable, '11y', '+mild', 'imaging'),
      ],
    },
    {
      id: 'cranio', name: 'Craniosynostosis', abbr: 'CRANIO', group: 'Cranial',
      accent: '#E8A23C', accent2: '#F4978E',
      cohort: 738, review: 6, abstain: '5.6%', calib: '0.030', ring: 84, ringLab: 'benchmark calibration',
      heroTitle: 'Craniosynostosis overview',
      heroSub: 'Suture physics, biomarkers, diagnostics & neurodevelopment endpoints.',
      info: { title: 'Suture fusion', desc: 'Sagittal synostosis with scaphocephalic index beyond threshold in 2 cases.', chips: ['Sagittal', 'CI'] },
      vital: { k: 'ICP-risk signal', v: '0.38', sub: 'calibrated · CI 0.25–0.52' },
      cta: { t: 'Fundoscopy not on file for 1 case — ICP context incomplete.', a: 'Review gaps' },
      metrics: [
        { lab: 'Cases tracked', val: '402', delta: '+9 this week', dir: 'up' },
        { lab: 'Awaiting review', val: '6', delta: '2 pre-surgical', dir: 'down' },
        { lab: 'Endoscopic window', val: '21', delta: 'eligible', dir: 'flat' },
      ],
      triage: [
        C('CRN-0301', 'Sagittal synostosis', ev.definite, '4m', '+CI', 'scaphocephaly'),
        C('CRN-0288', 'Metopic synostosis', ev.probable, '6m', '+ridge', 'trigonocephaly'),
        C('CRN-0312', 'Unicoronal', ev.indeterminate, '5m', 'stable', 'plagiocephaly'),
        C('CRN-0295', 'Positional vs synost.', ev.mimic, '3m', 'n/a', 'remodeling?'),
        C('CRN-0307', 'Syndromic (Apert)', ev.insufficient, '2m', 'n/a', 'genetics'),
        C('CRN-0284', 'Bicoronal', ev.probable, '7m', '+brachy', 'pre-surgical'),
      ],
    },
    {
      id: 'chiari', name: 'Chiari', abbr: 'CHIARI', group: 'CSF & structural',
      accent: '#818CF8', accent2: '#2BD4C0',
      cohort: 564, review: 4, abstain: '7.0%', calib: '0.032', ring: 81, ringLab: 'one-FM calibration',
      heroTitle: 'Chiari malformation overview',
      heroSub: 'Tonsillar descent, CSF dynamics & syrinx life-course tracking.',
      info: { title: 'Tonsillar descent', desc: 'Cerebellar tonsils 7 mm below foramen magnum with early syrinx.', chips: ['Descent', 'Syrinx'] },
      vital: { k: 'Syrinx-progression', v: '0.44', sub: 'calibrated · CI 0.30–0.58' },
      cta: { t: 'Cine-CSF flow degraded by motion — dynamics assessment abstained.', a: 'Why abstained' },
      metrics: [
        { lab: 'Cases tracked', val: '389', delta: '+7 this week', dir: 'up' },
        { lab: 'Awaiting review', val: '4', delta: '1 syrinx', dir: 'down' },
        { lab: 'Decompression est.', val: '34%', delta: '+2%', dir: 'up' },
      ],
      triage: [
        C('CHI-0241', 'Chiari I + syrinx', ev.probable, '9y', '+7mm', 'descent'),
        C('CHI-0233', 'Chiari I', ev.indeterminate, '12y', 'stable', 'headache'),
        C('CHI-0248', 'Chiari 1.5', ev.definite, '6y', '+descent', 'brainstem'),
        C('CHI-0236', 'Acquired tonsillar', ev.mimic, '8y', 'n/a', 'low-ICP?'),
        C('CHI-0244', 'Syringomyelia', ev.insufficient, '11y', 'n/a', 'cine flow'),
        C('CHI-0229', 'Chiari II (w/ SB)', ev.probable, '3y', '+syrinx', 'linked'),
      ],
    },
  ];

  const modules = [
    { id: 'overview', name: 'Overview', sub: 'Triage', pillar: 'Home', icon: 'home' },
    { id: 'imaging', name: 'Imaging read', sub: 'Read', pillar: 'Read', icon: 'scan' },
    { id: 'engines', name: 'Engines', sub: 'Reason', pillar: 'Reason', icon: 'cpu' },
    { id: 'registry', name: 'Registry', sub: 'Track', pillar: 'Track', icon: 'table' },
    { id: 'workspace', name: 'Workspace', sub: 'Canvas', pillar: 'Canvas', icon: 'canvas' },
    { id: 'calendar', name: 'Calendar', sub: 'Schedule', pillar: 'Schedule', icon: 'calendar' },
    { id: 'govern', name: 'Governance', sub: 'Govern', pillar: 'Govern', icon: 'shield' },
  ];

  const sites = [
    { id: 'cc',  name: 'Children’s Central',     short: 'CC',  color: '#5B8DEF', synced: true },
    { id: 'sm',  name: 'St. Mary’s Pediatric',   short: 'SM',  color: '#2BD4C0', synced: true },
    { id: 'rni', name: 'Regional Neuro Institute', short: 'RNI', color: '#A78BFA', synced: true },
    { id: 'tele', name: 'Telehealth',            short: 'TH',  color: '#F0A85A', synced: false },
  ];

  const calendar = {
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    dates: [2, 3, 4, 5, 6],
    hours: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
    events: [
      { day: 0, start: 8.5, end: 10, title: '{D} tumor board', site: 'cc', kind: 'MDT' },
      { day: 0, start: 11, end: 12, title: 'Imaging review', site: 'sm', kind: 'Read' },
      { day: 0, start: 14, end: 15.5, title: 'New-referral clinic', site: 'cc', kind: 'Clinic' },
      { day: 1, start: 9, end: 10.5, title: 'Surgical planning', site: 'rni', kind: 'Plan' },
      { day: 1, start: 13, end: 14, title: 'Telehealth follow-ups', site: 'tele', kind: 'Tele' },
      { day: 2, start: 8.5, end: 10, title: '{D} MDT · complex', site: 'cc', kind: 'MDT' },
      { day: 2, start: 11, end: 12.5, title: 'Research review', site: 'rni', kind: 'Research' },
      { day: 2, start: 15, end: 16, title: 'Calibration sign-off', site: 'sm', kind: 'Govern' },
      { day: 3, start: 9.5, end: 11, title: 'Operating list', site: 'rni', kind: 'OR' },
      { day: 3, start: 13.5, end: 15, title: 'Surveillance clinic', site: 'cc', kind: 'Clinic' },
      { day: 4, start: 10, end: 11, title: 'Imaging protocol sync', site: 'sm', kind: 'Read' },
      { day: 4, start: 13, end: 14.5, title: 'Family conference', site: 'tele', kind: 'Tele' },
    ],
  };

  const engines = [
    { name: 'Read · radiology inference', ds: 'Volumetric segmentation, enhancement & uncertainty maps', tag: 'v4.2.1', state: 'Live', good: true },
    { name: 'Reason · counterfactual', ds: 'Recurrence vs treatment-effect separation with abstention', tag: 'v3.8.0', state: 'Live', good: true },
    { name: 'Track · longitudinal', ds: 'Life-course trajectory & change-point detection', tag: 'v2.5.4', state: 'Live', good: true },
    { name: 'Knowledge graph', ds: 'Cross-disease substrate links (CSF · reserve · one-FM)', tag: 'v1.9.2', state: 'Live', good: true },
    { name: 'Calibration monitor', ds: 'Reliability diagrams & drift detection per build', tag: 'v2.1.0', state: 'Watch', good: false },
  ];

  const refusals = [
    { t: 'Perfusion below acquisition floor', d: 'DSC rCBV motion-degraded beyond usable threshold — rCBV withheld.', n: '142 / 1,284 reads' },
    { t: 'Out-of-distribution sequence', d: 'Non-standard sequence not represented in the data card — declined.', n: '38 reads' },
    { t: 'Missing clinical context', d: 'Baseline study absent; trajectory cannot be anchored — deferred.', n: '21 reads' },
    { t: 'Identifiability above policy', d: 'Input exceeded i2 without SSO-walled channel — routed, not assessed.', n: '6 reads' },
  ];

  window.AURORA = { diseases, modules, engines, refusals, sites, calendar, ev };
})();
