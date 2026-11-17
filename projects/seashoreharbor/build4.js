/* ============================================================
   THE SEASHORE HARBOR · BUILD 4 · THE COLD STORE & THE FISH MARKET
   Keep this file in projects/seashoreharbor next to 84-seashoreharbor.html.
   A cold store with a chilled door and an open fish market with striped awnings and stalls.
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
    id: 4, name: 'THE COLD STORE & THE FISH MARKET',
    brief: 'A cold store with a chilled loading door and a roof of cooling fans, and an open fish market with striped awnings and stalls of ice and silver fish, beside the quay.',
    types: {
      COLD:   { code: 'FB', name: 'THE COLD STORE',  col: '#eef2f5', w: 100, d: 60, h: 24 },
      MARKET: { code: 'FB', name: 'THE FISH MARKET', col: '#2f6690', w: 90, d: 50, h: 18 },
    },
    order: ['COLD', 'MARKET'],
    at: { COLD: [[HX - 80, HZ + 95]], MARKET: [[HX + 60, HZ + 95]] },
    eye: [HX + 240, (window.__HARBOR.Y || -85) + 180, HZ + 330],
    stats(api, c) { return [['THE COLD STORE', c('COLD') ? 'CHILLED' : 'NOT YET'], ['THE FISH MARKET', c('MARKET') ? 'OPEN' : 'NOT YET'], ['STALLS', c('MARKET') * 8 + ' / 8']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, H = P.pw(api), S = P.hb(api);
      if (type === 'COLD') {
        add(new T.BoxGeometry(100, 20, 60), H.white, 0, 10, 0); add(new T.BoxGeometry(102, 1.4, 62), S.hull[1], 0, 20.7, 0, false);
        for (let i = 0; i < 4; i++) { add(new T.CylinderGeometry(4, 4, 1.2, 14), H.steel2, -30 + i * 20, 22, 8, false); add(new T.CylinderGeometry(3.4, 3.4, 0.4, 14), H.dark, -30 + i * 20, 22.7, 8, false); }
        add(new T.BoxGeometry(24, 14, 0.8), H.dark, 20, 7, 30.4, false); for (let i = 0; i < 6; i++) add(new T.BoxGeometry(3.4, 12, 0.5), S.ice, 10.6 + i * 3.6, 7, 30.9, false);
        for (let i = 0; i < 3; i++) add(new T.BoxGeometry(14, 4, 0.6), H.win, -34 + i * 18, 14, 30.4, false);
        P.sign(api, g, 'THE COLD STORE', 34, 4, -16, 26, 31, 0, '#0c3a66', '#bfe8ff');
        P.person(g, P.civ(84200), 'tablet', 6, 0.5, 38, 0);
      } else if (type === 'MARKET') {
        add(new T.BoxGeometry(92, 1, 52), H.conc2, 0, 0.5, 0, false);
        for (const [x, z] of [[-42, -22], [42, -22], [-42, 22], [42, 22], [0, -22], [0, 22]]) add(new T.CylinderGeometry(0.9, 1, 15, 8), H.steel2, x, 8, z, false);
        for (let i = 0; i < 6; i++) { const a = add(new T.BoxGeometry(15.4, 0.5, 52), S.awn[i % 4], -38.5 + i * 15.4, 16.2, 0, false); a.rotation.z = 0.06; }
        for (let i = 0; i < 8; i++) { const x = -34 + (i % 4) * 22, z = i < 4 ? -12 : 12; add(new T.BoxGeometry(14, 3, 6), S.wood, x, 2.5, z, false); add(new T.BoxGeometry(12, 0.8, 4.4), S.ice, x, 4.3, z, false);
          for (let j = 0; j < 5; j++) add(new T.CapsuleGeometry(0.5, 1.6, 3, 6), S.fish, x - 4 + j * 2, 5.1, z + (j % 2 ? 1 : -1), false).rotation.z = Math.PI / 2; }
        P.sign(api, g, 'THE FISH MARKET', 30, 3.4, 0, 14, 26.4, 0, '#0c3a66', '#ffffff');
        P.person(g, P.civ(84210), 'idle', -10, 0.5, 8, Math.PI); P.person(g, P.civ(84211), 'tablet', 12, 0.5, -6, 0);
      }
    },
  }));
})();
