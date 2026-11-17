/* ============================================================
   THE SEASHORE HARBOR · BUILD 3 · THE FISHING BOATS & THE QUAY CRANES
   Keep this file in projects/seashoreharbor next to 84-seashoreharbor.html.
   Four fishing boats moored at the quay and two tall quay cranes.
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
    id: 3, name: 'THE FISHING BOATS & THE QUAY CRANES',
    brief: 'Four fishing boats, red, blue, yellow and green, moored along the quay with their nets ready, and two tall quay cranes to lift the catch ashore.',
    types: {
      BOAT:  { code: 'FB', name: 'FISHING BOAT', col: '#c8402e', w: 36, d: 14, h: 14 },
      CRANE: { code: 'HP', name: 'QUAY CRANE',   col: '#e8b82a', w: 10, d: 10, h: 34 },
    },
    order: ['CRANE', 'BOAT'],
    at: { CRANE: [[HX - 110, HZ + 3], [HX + 80, HZ + 3]], BOAT: [[HX - 90, HZ - 42], [HX - 30, HZ - 42], [HX + 30, HZ - 42], [HX + 90 - 20, HZ - 42]] },
    eye: [HX + 230, (window.__HARBOR.Y || -85) + 180, HZ + 320],
    stats(api, c) { return [['FISHING BOATS', c('BOAT') + ' / 4'], ['QUAY CRANES', c('CRANE') + ' / 2'], ['CREWS', c('BOAT') * 6 + ' / 24']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, H = P.pw(api), S = P.hb(api);
      if (type === 'BOAT') {
        const off = P.OFF || [0, 0], bx = [-90, -30, 30, 70][k] || 0, dy = window.__SEA.WL - window.coaxH(HX + bx + off[0], HZ - 42 + off[1]) + 0.5;
        add(new T.BoxGeometry(34, 4, 11), S.hull[k % 4], 0, 3, 0); const bow = add(new T.ConeGeometry(5.6, 8, 4), S.hull[k % 4], 20, 3, 0); bow.rotation.z = -Math.PI / 2; bow.rotation.x = Math.PI / 4;
        add(new T.BoxGeometry(34, 1, 11.4), S.hullw, 0, 5.4, 0, false);
        add(new T.BoxGeometry(9, 6, 8), S.hullw, -8, 9, 0); add(new T.BoxGeometry(9.4, 1, 8.4), S.hull[(k + 1) % 4], -8, 12.4, 0, false); add(new T.BoxGeometry(0.6, 2.4, 6), H.win, -3.4, 9.6, 0, false);
        add(new T.CylinderGeometry(0.4, 0.4, 16, 6), S.wood, 8, 13, 0, false); add(new T.BoxGeometry(0.2, 8, 0.2), S.wood, 8, 17, 4, false).rotation.x = 0.5;
        for (let i = 0; i < 4; i++) add(new T.TorusGeometry(2.2 - i * 0.2, 0.25, 6, 14), S.net, 12 - i * 2, 6.6, 0, false).rotation.x = Math.PI / 2;
        for (const ch of g.children) ch.position.y += dy;
        P.person(g, P.civ(84100 + k), 'idle', -8, 5.8 + dy, 3, Math.PI);
      } else if (type === 'CRANE') {
        for (const [x, z] of [[-3, -3], [3, -3], [-3, 3], [3, 3]]) add(new T.BoxGeometry(0.8, 24, 0.8), H.steel2, x, 12, z, false);
        add(new T.BoxGeometry(8, 1, 8), H.steel2, 0, 24, 0, false); add(new T.BoxGeometry(2, 2, 26), H.steel, 0, 27, -8, false);
        add(new T.BoxGeometry(2.6, 5, 2.6), U_YEL(api), 0, 22, -2, false); add(new T.CylinderGeometry(0.15, 0.15, 14, 4), H.dark, 0, 19, -18, false); add(new T.BoxGeometry(3, 1.6, 3), H.dark, 0, 11.4, -18, false);
      }
    },
  }));
  function U_YEL(api) { return P.uw ? P.uw(api).yellow : P.pw(api).dark; }
})();
