/* ============================================================
   THE UNITY MEDICINE WORKS · BUILD 2 · THE YARD, THE GLASSHOUSES & THE HERB FIELDS
   Keep this file in projects/medicineworks next to 86-medicineworks.html.
   A paved yard, a road east to the factory district, three long glasshouses where healing herbs grow all year, four herb fields in the open and lamps along the yard.
   ============================================================ */
(function () {
  const P = window.PWP;
  const HX = -900, HZ = 2200;   // the middle of the Unity Medicine Works terrace (world -2150, 3250)
  // concrete, steel and hazard paint (one copy, shared by every build)
  P.pw = P.pw || function (api) {
    if (this._pw) return this._pw; const T = api.THREE, std = (c, r = 0.8, m = 0, e = {}) => new T.MeshStandardMaterial({ color: c, roughness: r, metalness: m, ...e });
    return this._pw = {
      conc: std(0xa9adb2, 0.95), conc2: std(0x8f949a, 0.95), road: std(0x3a3e45, 0.9), line: std(0xf2e6a0, 0.8), wall: std(0xd7dade, 0.7), wall2: std(0xb8bec6, 0.7, 0.2),
      steel: std(0x9aa3ad, 0.35, 0.85), steel2: std(0x6c7580, 0.4, 0.8), dark: std(0x23282f, 0.55, 0.5), white: std(0xf4f6f8, 0.45, 0.2),
      glass: new T.MeshStandardMaterial({ color: 0xbfe8ff, roughness: 0.05, metalness: 0.3, transparent: true, opacity: 0.32, side: T.DoubleSide, depthWrite: false }),
      win: new T.MeshStandardMaterial({ color: 0x20303a, emissive: 0x9fe0ff, emissiveIntensity: 0.8, roughness: 0.5 }),
      lamp: new T.MeshBasicMaterial({ color: new T.Color(2.0, 1.8, 1.2), toneMapped: false }),
    };
  };
  // the look of the Medicine Works: herbs, glasshouses, white labs, steel tanks and red crosses (one copy, shared by every build here)
  P.md = P.md || function (api) {
    if (this._md) return this._md; const T = api.THREE, std = (c, r = 0.8, m = 0, e = {}) => new T.MeshStandardMaterial({ color: c, roughness: r, metalness: m, ...e });
    return this._md = {
      soil: std(0x5a4030, 1), leaf: std(0x3f9a4a, 0.8), leaf2: std(0x2f7a3a, 0.8), herb: [0x8ac84a, 0x6fb04a, 0xb8d85a, 0xd8a8e8, 0xf2c41a].map(c => std(c, 0.8)),
      frame: std(0xe8eef2, 0.4, 0.6), wall: std(0xf4f6f8, 0.5, 0.1), teal: std(0x2fa8a0, 0.5, 0.2), red: std(0xd8302e, 0.6), tank: std(0xdfe8ee, 0.25, 0.9), roof: std(0x2f8a8a, 0.6, 0.3),
      drone: std(0xf4f6f8, 0.4, 0.3), rotor: new T.MeshStandardMaterial({ color: 0xcfd8de, roughness: 0.3, transparent: true, opacity: 0.5, side: T.DoubleSide, depthWrite: false }),
      ribbon: std(0xd8302e, 0.6, 0, { side: T.DoubleSide }),
    };
  };
  P.gy = P.gy || ((x, z) => window.coaxH(x, z));

  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 2, name: 'THE YARD, THE GLASSHOUSES & THE HERB FIELDS',
    brief: 'A paved yard on the Medicine Works\u2019 own terrace, a road running east towards the factory district, three long glasshouses where healing herbs grow all year round, four herb fields in the open air and lamps along the yard.',
    types: {
      YARD:  { code: 'SF', name: 'THE YARD',      col: '#8f949a', w: 270, d: 140, h: 2 },
      ROAD:  { code: 'SF', name: 'THE ROAD',      col: '#3a3e45', w: 160, d: 30, h: 1 },
      GLASS: { code: 'GD', name: 'GLASSHOUSE',    col: '#bfe8ff', w: 90, d: 40, h: 20 },
      HERB:  { code: 'GD', name: 'HERB FIELD',    col: '#6fb04a', w: 60, d: 44, h: 3 },
      LAMP:  { code: 'HP', name: 'LAMP',          col: '#f2c41a', w: 3, d: 3, h: 20 },
    },
    order: ['YARD', 'ROAD', 'GLASS', 'HERB', 'LAMP'],
    at: { YARD: [[HX, HZ + 80]], ROAD: [[HX + 215, HZ + 80]],
      GLASS: [[HX - 100, HZ - 45], [HX, HZ - 45], [HX + 100, HZ - 45]],
      HERB: [[HX - 135, HZ - 120], [HX - 45, HZ - 120], [HX + 45, HZ - 120], [HX + 135, HZ - 120]],
      LAMP: [[HX - 120, HZ + 20], [HX - 60, HZ + 20], [HX, HZ + 20], [HX + 60, HZ + 20], [HX + 120, HZ + 20], [HX + 150, HZ + 60]] },
    eye: [HX + 250, (window.__MED.Y || -85) + 190, HZ + 330],
    stats(api, c) { return [['THE YARD', c('YARD') ? 'LAID' : 'NOT YET'], ['THE ROAD', c('ROAD') ? 'OPEN' : 'NOT YET'], ['GLASSHOUSES', c('GLASS') + ' / 3'], ['HERB FIELDS', c('HERB') + ' / 4'], ['LAMPS', c('LAMP') + ' / 6']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, H = P.pw(api), M = P.md(api);
      if (type === 'YARD') {
        add(new T.BoxGeometry(270, 2, 140), H.conc, 0, 1, 0, false);
        for (let x = -120; x <= 120; x += 40) add(new T.BoxGeometry(0.7, 0.3, 140), H.conc2, x, 2.1, 0, false);
        add(new T.BoxGeometry(270, 1.2, 2), H.line, 0, 2.4, 68, false);
        P.sign(api, g, 'THE UNITY MEDICINE WORKS \u00b7 HEALING FOR ALL OF UNITY', 56, 4, 0, 7, 70, 0, '#0c4a46', '#d8fff0');
      } else if (type === 'ROAD') {
        add(new T.BoxGeometry(160, 0.8, 30), H.road, 0, 0.4, 0, false);
        for (let x = -70; x <= 70; x += 20) add(new T.BoxGeometry(8, 0.2, 1), H.line, x, 0.85, 0, false);
        for (const s of [-1, 1]) add(new T.BoxGeometry(160, 1.2, 1.2), H.conc2, 0, 0.8, s * 15.6, false);
      } else if (type === 'GLASS') {
        // a long glasshouse: white frame, glass walls and a glass roof, rows of herbs inside
        add(new T.BoxGeometry(90, 1.2, 40), H.conc2, 0, 0.6, 0, false);
        for (let r = 0; r < 4; r++) { add(new T.BoxGeometry(80, 1.6, 4), M.soil, 0, 1.6, -13.5 + r * 9, false); for (let i = 0; i < 16; i++) add(new T.SphereGeometry(1.6, 8, 6), M.herb[(i + r) % 3], -37.5 + i * 5, 3.2, -13.5 + r * 9, false); }
        add(new T.BoxGeometry(88, 12, 38), H.glass, 0, 7.2, 0, false);
        add(new T.BoxGeometry(88, 0.6, 38), H.glass, 0, 13.2, 0, false);
        for (const x of [-44, -22, 0, 22, 44]) { add(new T.BoxGeometry(0.8, 12.6, 0.8), M.frame, x, 7.2, -19, false); add(new T.BoxGeometry(0.8, 12.6, 0.8), M.frame, x, 7.2, 19, false); add(new T.BoxGeometry(0.8, 0.8, 38), M.frame, x, 13.4, 0, false); }
        add(new T.BoxGeometry(88, 0.8, 0.8), M.frame, 0, 13.4, -19, false); add(new T.BoxGeometry(88, 0.8, 0.8), M.frame, 0, 13.4, 19, false);
      } else if (type === 'HERB') {
        add(new T.BoxGeometry(60, 1.2, 44), H.conc2, 0, 0.6, 0, false);
        for (let r = 0; r < 4; r++) { add(new T.BoxGeometry(54, 1.6, 6), M.soil, 0, 1.6, -15 + r * 10, false); for (let i = 0; i < 12; i++) add(new T.ConeGeometry(1.7, 3.4, 6), M.herb[(i + r * 2) % 5], -24.5 + i * 4.5, 4, -15 + r * 10, false); }
      } else if (type === 'LAMP') {
        add(new T.CylinderGeometry(0.4, 0.5, 15, 6), H.dark, 0, 7.5, 0, false); add(new T.BoxGeometry(5, 0.8, 1.6), H.dark, 0, 15.2, 0, false); add(new T.SphereGeometry(1.4, 10, 8), H.lamp, 0, 14.4, 0, false);
      }
    },
  }));
})();
