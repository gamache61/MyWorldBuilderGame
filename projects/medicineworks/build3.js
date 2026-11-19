/* ============================================================
   THE UNITY MEDICINE WORKS · BUILD 3 · THE LABORATORY
   Keep this file in projects/medicineworks next to 86-medicineworks.html.
   The main laboratory with two research wings and two growth domes, west of the yard.
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
    id: 3, name: 'THE LABORATORY',
    brief: 'The great laboratory of the Medicine Works: a tall white main hall with glass fronts, two research wings either side of it and two glass growth domes where new medicines are tried on living cells, never on living creatures.',
    types: {
      LAB:  { code: 'SY', name: 'MAIN LABORATORY', col: '#f4f6f8', w: 90, d: 60, h: 34 },
      WING: { code: 'SY', name: 'RESEARCH WING',   col: '#e8eef2', w: 50, d: 40, h: 22 },
      DOME: { code: 'GD', name: 'GROWTH DOME',     col: '#bfe8ff', w: 36, d: 36, h: 20 },
    },
    order: ['LAB', 'WING', 'DOME'],
    at: { LAB: [[HX - 235, HZ + 30]], WING: [[HX - 235, HZ - 45], [HX - 235, HZ + 105]], DOME: [[HX - 262, HZ - 118], [HX - 205, HZ - 118]] },
    eye: [HX + 250, (window.__MED.Y || -85) + 190, HZ + 330],
    stats(api, c) { return [['MAIN LABORATORY', c('LAB') ? 'BUILT' : 'NOT YET'], ['RESEARCH WINGS', c('WING') + ' / 2'], ['GROWTH DOMES', c('DOME') + ' / 2']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, H = P.pw(api), M = P.md(api);
      if (type === 'LAB') {
        add(new T.BoxGeometry(90, 2, 60), H.conc2, 0, 1, 0, false);
        add(new T.BoxGeometry(84, 30, 54), M.wall, 0, 17, 0);
        add(new T.BoxGeometry(86, 2.4, 56), M.roof, 0, 33.2, 0, false);
        for (let r = 0; r < 4; r++) for (let i = 0; i < 9; i++) { add(new T.BoxGeometry(6, 5, 0.6), H.win, -36 + i * 9, 8 + r * 7, 27.2, false); add(new T.BoxGeometry(6, 5, 0.6), H.win, -36 + i * 9, 8 + r * 7, -27.2, false); }
        add(new T.BoxGeometry(22, 14, 3), M.teal, 0, 7, 28.6, false); add(new T.BoxGeometry(18, 12, 0.6), H.glass, 0, 7, 30.2, false);
        add(new T.BoxGeometry(14, 1.6, 4), M.red, 0, 29, 28.6, false); add(new T.BoxGeometry(4, 8, 4), M.red, 0, 29, 28.7, false); add(new T.BoxGeometry(8, 4, 4), M.red, 0, 29, 28.8, false);
        add(new T.CylinderGeometry(3, 3, 12, 12), M.tank, 30, 40, -10, false); add(new T.CylinderGeometry(3, 3, 12, 12), M.tank, 38, 40, -10, false);
      } else if (type === 'WING') {
        add(new T.BoxGeometry(50, 1.4, 40), H.conc2, 0, 0.7, 0, false);
        add(new T.BoxGeometry(46, 19, 36), M.wall, 0, 10.9, 0);
        add(new T.BoxGeometry(48, 1.6, 38), M.roof, 0, 20.8, 0, false);
        for (let r = 0; r < 2; r++) for (let i = 0; i < 5; i++) { add(new T.BoxGeometry(6, 5, 0.6), H.win, -18 + i * 9, 8 + r * 7, 18.2, false); add(new T.BoxGeometry(6, 5, 0.6), H.win, -18 + i * 9, 8 + r * 7, -18.2, false); }
        add(new T.BoxGeometry(10, 1, 4), M.red, 0, 18, 18.6, false);
      } else if (type === 'DOME') {
        add(new T.CylinderGeometry(18, 18, 1.4, 20), H.conc2, 0, 0.7, 0, false);
        add(new T.SphereGeometry(17, 20, 12, 0, Math.PI * 2, 0, Math.PI / 2), H.glass, 0, 1.4, 0, false);
        for (let i = 0; i < 8; i++) add(new T.BoxGeometry(0.5, 0.5, 34), M.frame, 0, 3, 0, false);
        for (let i = 0; i < 9; i++) { const a = i * 0.7; add(new T.SphereGeometry(1.6, 8, 6), M.herb[i % 5], Math.cos(a) * (3 + i), 2.6, Math.sin(a) * (3 + i), false); }
      }
    },
  }));
})();
