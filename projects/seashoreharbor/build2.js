/* ============================================================
   THE SEASHORE HARBOR · BUILD 2 · THE QUAY & THE HARBOR
   Keep this file in projects/seashoreharbor next to 84-seashoreharbor.html.
   A stone quay along the shore of Unity\u2019s sea, a long breakwater into deep water, a paved yard behind, a road east to the factory district and lamps.
   ============================================================ */
(function () {
  const P = window.PWP;
  const HX = -1950, HZ = 1100;   // the middle of the Seashore Harbor terrace (world -3200, 2150)
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
  // the look of the Works: ore, slag, fire, sand, solar glass, battery cells and tin (one copy, shared by every build)
  P.uw = P.uw || function (api) {
    if (this._uw) return this._uw; const T = api.THREE, std = (c, r = 0.8, m = 0, e = {}) => new T.MeshStandardMaterial({ color: c, roughness: r, metalness: m, ...e });
    return this._uw = {
      ore: std(0x6b4a36, 1), ore2: std(0x8a5a3c, 1), slag: std(0x3a3532, 0.95), sand: std(0xd8c690, 1), brick: std(0x9a4a34, 0.9), brick2: std(0x7a3a28, 0.9),
      fire: new T.MeshBasicMaterial({ color: new T.Color(2.6, 1.0, 0.25), toneMapped: false }), glow: new T.MeshBasicMaterial({ color: new T.Color(2.0, 1.5, 0.5), toneMapped: false }),
      solar: new T.MeshStandardMaterial({ color: 0x14306a, roughness: 0.15, metalness: 0.6, emissive: 0x0a1a40, emissiveIntensity: 0.5 }), frame: std(0xc8ced6, 0.4, 0.8),
      cell: std(0x2f9d57, 0.5, 0.4), cellw: std(0xeef2f5, 0.5, 0.2), tin: std(0xdfe4ea, 0.25, 0.9), red: std(0xc8402e, 0.7), green: std(0x3a8a44, 0.7), yellow: std(0xe8b82a, 0.7),
      smoke: new T.MeshStandardMaterial({ color: 0xcfd3d8, roughness: 1, transparent: true, opacity: 0.55, depthWrite: false }),
    };
  };
  // sea, boats, nets and salt (one copy, shared by every build here)
  P.hb = P.hb || function (api) {
    if (this._hb) return this._hb; const T = api.THREE, std = (c, r = 0.8, m = 0, e = {}) => new T.MeshStandardMaterial({ color: c, roughness: r, metalness: m, ...e });
    return this._hb = { water: new T.MeshStandardMaterial({ color: 0x2f86b0, roughness: 0.08, metalness: 0.4, transparent: true, opacity: 0.88 }), bed: std(0x1c4a66, 1), hull: [0xc8402e, 0x2f6690, 0xe8b82a, 0x3a8a44].map(c => std(c, 0.6)), hullw: std(0xf4f6f8, 0.5), wood: std(0x6a4a2a, 0.85), salt: std(0xf4f6f8, 0.9), brine: std(0xcfe6ee, 0.4), net: std(0x8aa0a8, 1), awn: [0xc8402e, 0x2f6690, 0xe8b82a, 0x3a8a44].map(c => std(c, 0.8, 0, { side: T.DoubleSide })), fish: std(0xc8d4de, 0.3, 0.8), ice: std(0xdff2fb, 0.2, 0.2) };
  };
  P.gy = P.gy || ((x, z) => window.coaxH(x, z));


  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 2, name: 'THE YARD, THE QUAY & THE HARBOR',
    brief: 'A paved yard on its own terrace beside Unity\u2019s sea, a long stone quay on the shore, a stone breakwater running out into the deep water to shelter the boats, a road running east towards the factory district and lamps along the quay.',
    types: {
      YARD:  { code: 'SF', name: 'THE YARD',   col: '#8f949a', w: 270, d: 140, h: 2 },
      QUAY:  { code: 'SF', name: 'THE QUAY',   col: '#b8bec6', w: 270, d: 16, h: 3 },
      MOLE:  { code: 'SF', name: 'THE BREAKWATER', col: '#8f949a', w: 20, d: 130, h: 2 },
      ROAD:  { code: 'SF', name: 'THE ROAD',   col: '#3a3e45', w: 160, d: 30, h: 1 },
      LAMP:  { code: 'HP', name: 'LAMP',       col: '#f2c41a', w: 3, d: 3, h: 20 },
    },
    order: ['QUAY', 'MOLE', 'YARD', 'ROAD', 'LAMP'],
    at: { MOLE: [[HX + 120, HZ - 70]], QUAY: [[HX, HZ + 2]], YARD: [[HX, HZ + 80]], ROAD: [[HX + 215, HZ + 80]],
      LAMP: [[HX - 120, HZ + 20], [HX - 60, HZ + 20], [HX, HZ + 20], [HX + 60, HZ + 20], [HX + 120, HZ + 20], [HX + 150, HZ + 60]] },
    eye: [HX + 250, (window.__HARBOR.Y || -85) + 190, HZ + 330],
    stats(api, c) { return [['THE BREAKWATER', c('MOLE') ? 'BUILT' : 'NOT YET'], ['THE QUAY', c('QUAY') ? 'BUILT' : 'NOT YET'], ['THE YARD', c('YARD') ? 'LAID' : 'NOT YET'], ['THE ROAD', c('ROAD') ? 'OPEN' : 'NOT YET'], ['LAMPS', c('LAMP') + ' / 6']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, H = P.pw(api), S = P.hb(api);
      if (type === 'MOLE') {
        // a stone arm built up from the seabed to just above the water
        const off = P.OFF || [0, 0], gy = window.coaxH(HX + 120 + off[0], HZ - 70 + off[1]), top = window.__SEA.WL + 4, hh = top - gy + 45;
        add(new T.BoxGeometry(20, hh, 130), H.conc2, 0, top - gy - hh / 2, 0);
        add(new T.BoxGeometry(22, 1.4, 132), H.wall2, 0, top - gy + 0.7, 0, false);
        for (let i = 0; i < 6; i++) add(new T.CylinderGeometry(1.1, 1.3, 4, 8), H.dark, -9, top - gy + 3, -56 + i * 22, false);
      } else if (type === 'QUAY') {
        add(new T.BoxGeometry(270, 3, 16), H.wall2, 0, 1.5, 0); add(new T.BoxGeometry(270, 0.6, 1), H.line, 0, 3.2, -6.5, false);
        for (let x = -120; x <= 120; x += 40) add(new T.CylinderGeometry(1, 1.2, 2.4, 8), H.dark, x, 4.2, -7, false);
      } else if (type === 'YARD') {
        add(new T.BoxGeometry(270, 2, 140), H.conc, 0, 1, 0, false);
        for (let x = -120; x <= 120; x += 40) add(new T.BoxGeometry(0.7, 0.3, 140), H.conc2, x, 2.1, 0, false);
        add(new T.BoxGeometry(270, 1.2, 2), H.line, 0, 2.4, 68, false);
        P.sign(api, g, 'THE SEASHORE HARBOR · FISH & SALT FROM UNITY\u2019S OWN SEA', 56, 4, 0, 7, 70, 0, '#0c3a66', '#bfe8ff');
      } else if (type === 'ROAD') {
        add(new T.BoxGeometry(160, 0.8, 30), H.road, 0, 0.4, 0, false);
        for (let x = -70; x <= 70; x += 20) add(new T.BoxGeometry(8, 0.2, 1), H.line, x, 0.85, 0, false);
        for (const s of [-1, 1]) add(new T.BoxGeometry(160, 1.2, 1.2), H.conc2, 0, 0.8, s * 15.6, false);
      } else if (type === 'LAMP') {
        add(new T.CylinderGeometry(0.4, 0.5, 15, 6), H.dark, 0, 7.5, 0, false); add(new T.BoxGeometry(5, 0.8, 1.6), H.dark, 0, 15.2, 0, false); add(new T.SphereGeometry(1.4, 10, 8), H.lamp, 0, 14.4, 0, false);
      }
    },
  }));
})();
