/* ============================================================
   THE UNITY MEDICINE WORKS · BUILD 4 · THE MEDICINE FACTORY
   Keep this file in projects/medicineworks next to 86-medicineworks.html.
   The medicine factory hall, a bottling hall, four steel tanks and a tall white stack east of the yard.
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
    id: 4, name: 'THE MEDICINE FACTORY',
    brief: 'Where the herbs become medicine: a long white factory hall, a bottling hall behind it, four steel tanks for the herb extracts and a tall white stack that gives off only clean steam, for Unity recycles everything.',
    types: {
      FACT:  { code: 'FB', name: 'FACTORY HALL',  col: '#f4f6f8', w: 110, d: 60, h: 24 },
      BOT:   { code: 'FB', name: 'BOTTLING HALL', col: '#e8eef2', w: 70, d: 40, h: 16 },
      TANK:  { code: 'WR', name: 'EXTRACT TANK',  col: '#dfe8ee', w: 18, d: 18, h: 24 },
      STACK: { code: 'HP', name: 'STEAM STACK',   col: '#f4f6f8', w: 10, d: 10, h: 50 },
    },
    order: ['FACT', 'BOT', 'TANK', 'STACK'],
    at: { FACT: [[HX + 240, HZ - 40]], BOT: [[HX + 240, HZ - 120]], TANK: [[HX + 185, HZ + 28], [HX + 215, HZ + 28], [HX + 245, HZ + 28], [HX + 275, HZ + 28]], STACK: [[HX + 300, HZ - 100]] },
    eye: [HX + 250, (window.__MED.Y || -85) + 190, HZ + 330],
    stats(api, c) { return [['FACTORY HALL', c('FACT') ? 'BUILT' : 'NOT YET'], ['BOTTLING HALL', c('BOT') ? 'BUILT' : 'NOT YET'], ['EXTRACT TANKS', c('TANK') + ' / 4'], ['STEAM STACK', c('STACK') ? 'BUILT' : 'NOT YET']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, H = P.pw(api), M = P.md(api);
      if (type === 'FACT') {
        add(new T.BoxGeometry(110, 2, 60), H.conc2, 0, 1, 0, false);
        add(new T.BoxGeometry(104, 20, 54), M.wall, 0, 12, 0);
        add(new T.BoxGeometry(106, 1.6, 56), M.roof, 0, 22.8, 0, false);
        for (let i = 0; i < 11; i++) { add(new T.BoxGeometry(6, 5, 0.6), H.win, -45 + i * 9, 14, 27.2, false); add(new T.BoxGeometry(6, 5, 0.6), H.win, -45 + i * 9, 14, -27.2, false); }
        for (let i = 0; i < 3; i++) add(new T.BoxGeometry(14, 11, 0.8), H.dark, -34 + i * 34, 7.5, 27.4, false);
        for (let i = 0; i < 4; i++) add(new T.CylinderGeometry(1.6, 1.6, 4, 8), H.steel, -36 + i * 24, 25, 0, false);
        add(new T.BoxGeometry(20, 3, 1), M.red, 0, 19, 27.6, false);
      } else if (type === 'BOT') {
        add(new T.BoxGeometry(70, 1.4, 40), H.conc2, 0, 0.7, 0, false);
        add(new T.BoxGeometry(66, 13, 36), M.wall, 0, 7.9, 0);
        add(new T.BoxGeometry(68, 1.4, 38), M.roof, 0, 15, 0, false);
        for (let i = 0; i < 7; i++) add(new T.BoxGeometry(5, 4, 0.6), H.win, -27 + i * 9, 9, 18.2, false);
        for (let i = 0; i < 6; i++) add(new T.BoxGeometry(3, 3, 3), M.teal, -22 + i * 9, 4, 22, false);
      } else if (type === 'TANK') {
        add(new T.CylinderGeometry(9, 9, 1, 16), H.conc2, 0, 0.5, 0, false);
        add(new T.CylinderGeometry(8, 8, 20, 18), M.tank, 0, 11, 0); add(new T.SphereGeometry(8, 18, 8, 0, Math.PI * 2, 0, Math.PI / 2), M.tank, 0, 21, 0, false);
        for (const a of [0, 2.1, 4.2]) add(new T.CylinderGeometry(0.5, 0.5, 8, 6), H.steel2, Math.cos(a) * 8, 4, Math.sin(a) * 8, false);
        add(new T.BoxGeometry(8, 1.4, 0.5), M.red, 0, 12, 8.1, false);
      } else if (type === 'STACK') {
        add(new T.CylinderGeometry(3, 4, 46, 14), M.wall, 0, 23, 0); add(new T.CylinderGeometry(3.4, 3.2, 3, 14), M.red, 0, 43, 0, false);
        add(new T.CylinderGeometry(2.4, 3, 2, 14), H.dark, 0, 47, 0, false);
      }
    },
  }));
})();
