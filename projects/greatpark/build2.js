/* ============================================================
   THE GREAT PARK OF UNITY · BUILD 2 · THE ENTRANCE PLAZA, THE GATE & THE PATHS
   Keep this file in projects/greatpark next to 78-greatpark.html.
   A wide entrance plaza of pale stone, a great flower gate, long walking paths and lamp posts.
   ============================================================ */
(function () {
  const P = window.PWP;
  // concrete, steel, hazard paint and furnace glow for the whole Parts Works (one copy, shared by every build)
  P.pw = function (api) {
    if (this._pw) return this._pw; const T = api.THREE, std = (c, r = 0.8, m = 0, e = {}) => new T.MeshStandardMaterial({ color: c, roughness: r, metalness: m, ...e });
    return this._pw = {
      conc: std(0xa9adb2, 0.95), conc2: std(0x8f949a, 0.95), road: std(0x3a3e45, 0.9), line: std(0xf2e6a0, 0.8), wall: std(0xd7dade, 0.7), wall2: std(0xb8bec6, 0.7, 0.2),
      steel: std(0x9aa3ad, 0.35, 0.85), steel2: std(0x6c7580, 0.4, 0.8), dark: std(0x23282f, 0.55, 0.5), roof: std(0x5c6670, 0.6, 0.4), roof2: std(0x7d8a96, 0.55, 0.45),
      orange: std(0xe8761a, 0.55, 0.2), yellow: std(0xf2c41a, 0.55, 0.2), blue: std(0x2f6fb0, 0.5, 0.3), red: std(0xc8362a, 0.6, 0.2), white: std(0xf4f6f8, 0.45, 0.2), green: std(0x3f9a5a, 0.6, 0.2),
      beam: std(0xb8bcc4, 0.35, 0.85), ore: std(0x7a4a2a, 0.95), copper: std(0xc07a4a, 0.4, 0.8), crystal: std(0x7fe8ff, 0.2, 0.2, { emissive: 0x2a90b0, emissiveIntensity: 0.6 }),
      glass: new T.MeshStandardMaterial({ color: 0xbfe8ff, roughness: 0.05, metalness: 0.3, transparent: true, opacity: 0.32, side: T.DoubleSide, depthWrite: false }),
      win: new T.MeshStandardMaterial({ color: 0x20303a, emissive: 0x9fe0ff, emissiveIntensity: 0.8, roughness: 0.5 }),
      hot: new T.MeshBasicMaterial({ color: new T.Color(2.6, 1.0, 0.2), toneMapped: false }), warm: new T.MeshBasicMaterial({ color: new T.Color(2.0, 0.8, 0.3), toneMapped: false }),
      cool: new T.MeshBasicMaterial({ color: new T.Color(0.5, 1.9, 2.2), toneMapped: false }), lamp: new T.MeshBasicMaterial({ color: new T.Color(2.0, 1.8, 1.2), toneMapped: false }),
      hazard: (() => { const tx = api.canvasTex(128, 32, (c, w, h) => { c.fillStyle = '#f2c41a'; c.fillRect(0, 0, w, h); c.fillStyle = '#202020'; for (let x = -h; x < w + h; x += 24) { c.beginPath(); c.moveTo(x, h); c.lineTo(x + 12, h); c.lineTo(x + 12 + h, 0); c.lineTo(x + h, 0); c.fill(); } }); return new T.MeshStandardMaterial({ map: tx, roughness: 0.7 }); })(),
    };
  };
  // a wide truck of the Parts Works, used by the yard and the warehouse build
  P.truck = function (api, add, H, x, z, ry, col) {
    const T = api.THREE, g = new T.Group(); g.position.set(x, 0, z); g.rotation.y = ry; const a = (geo, m, X, Y, Z) => { const o = new T.Mesh(geo, m); o.position.set(X, Y, Z); o.castShadow = true; g.add(o); return o; };
    a(new T.BoxGeometry(9, 0.8, 3.2), H.dark, 0, 1.4, 0); a(new T.BoxGeometry(3.2, 3.2, 3.2), col, 3.4, 3, 0); a(new T.BoxGeometry(0.2, 1.4, 2.6), H.glass, 5.05, 3.6, 0);
    a(new T.BoxGeometry(5.4, 0.3, 3), H.steel, -1.2, 2, 0);
    for (const wx of [-3, -0.4, 3.4]) for (const wz of [-1.7, 1.7]) { const w = a(new T.CylinderGeometry(0.8, 0.8, 0.7, 12), H.dark, wx, 0.8, wz); w.rotation.x = Math.PI / 2; }
    return g;
  };
  // greens, stone and flowers for the Great Park (one copy, shared by every park build)
  P.park = function (api) {
    if (this._pk) return this._pk; const T = api.THREE, std = (c, r = 0.9, m = 0, e = {}) => new T.MeshStandardMaterial({ color: c, roughness: r, metalness: m, ...e });
    return this._pk = {
      stone: std(0xe4dcc8, 0.9), stone2: std(0xc9c0a8, 0.9), path: std(0xd8cdb0, 0.95), grass: std(0x6fae48, 1), grass2: std(0x5c9a3c, 1), leaf: std(0x3f8a3a, 0.9), leaf2: std(0x2f7a38, 0.9), trunk: std(0x6a4a30, 0.9),
      water: new T.MeshStandardMaterial({ color: 0x3f98c8, roughness: 0.08, metalness: 0.35, transparent: true, opacity: 0.88 }), sand: std(0xe6d49a, 1), wood: std(0x8a6038, 0.8), cloth: std(0xd84a4a, 0.8), white: std(0xf4f6f8, 0.5),
      bloom: [0xe8508a, 0xf2c41a, 0xf4f6f8, 0xb070e0].map(c => std(c, 0.7)),
    };
  };
  P.gy = (x, z) => window.coaxH(x, z);
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 2, name: 'THE ENTRANCE PLAZA, THE GATE & THE PATHS',
    brief: 'A wide plaza of pale stone at the south end of the park, a great flower gate, two long walking paths that run north through the park, and lamp posts along the paths.',
    types: {
      PLAZA: { code: 'SF', name: 'THE PLAZA',  col: '#e4dcc8', w: 160, d: 80, h: 2 },
      GATE:  { code: 'SY', name: 'FLOWER GATE', col: '#e8a0b8', w: 40, d: 8, h: 22 },
      PATH:  { code: 'SF', name: 'WALKING PATH', col: '#d8cdb0', w: 12, d: 360, h: 1 },
      LAMP:  { code: 'HP', name: 'PARK LAMP',  col: '#f2c41a', w: 3,   d: 3,   h: 12 },
    },
    order: ['PLAZA', 'GATE', 'PATH', 'LAMP'],
    at: {
      PLAZA: [[1550 + 1600 + 0, 1200 + 360]], GATE: [[1550 + 1600 + 0, 1200 + 300]], PATH: [[1550 + 1600 + -40, 1200 + 110], [1550 + 1600 + 40, 1200 + 110]],
      LAMP: [[1550 + 1600 + -60, 1200 + 290], [1550 + 1600 + 60, 1200 + 290], [1550 + 1600 + -60, 1200 + 200], [1550 + 1600 + 60, 1200 + 200], [1550 + 1600 + -60, 1200 + 110], [1550 + 1600 + 60, 1200 + 110], [1550 + 1600 + -60, 1200 + 20], [1550 + 1600 + 60, 1200 + 20]],
    },
    eye: [1550 + 1600 + 0, (window.__PARK.Y || -85) + 220, 1200 + 420],
    stats(api, c) { return [['THE PLAZA', c('PLAZA') ? 'LAID' : 'NOT YET'], ['FLOWER GATE', c('GATE') ? 'STANDING' : 'NOT YET'], ['WALKING PATHS', c('PATH') + ' / 2'], ['PARK LAMPS', c('LAMP') + ' / 8']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, H = P.pw(api), M = P.park(api);
      if (type === 'PLAZA') {
        add(new T.BoxGeometry(160, 2.2, 80), M.stone, 0, 1.1, 0, false);
        for (let x = -60; x <= 60; x += 30) add(new T.BoxGeometry(0.4, 0.06, 80), M.stone2, x, 2.23, 0, false);
        for (let z = -30; z <= 30; z += 30) add(new T.BoxGeometry(160, 0.06, 0.4), M.stone2, 0, 2.23, z, false);
        for (const x of [-50, 50]) { add(new T.CylinderGeometry(7, 7.4, 1.4, 20), M.stone2, x, 2.6, 10); add(new T.CylinderGeometry(5.6, 5.6, 1.2, 20), H.glass, x, 3.2, 10, false); add(new T.CylinderGeometry(0.6, 0.9, 4, 8), M.stone2, x, 4.8, 10, false); }
        for (let i = 0; i < 6; i++) P.person(g, P.civ(78010 + i), i % 2 ? 'idle' : 'walk', -40 + i * 16, 2.2, -20 + (i % 3) * 14, 0);
      } else if (type === 'GATE') {
        for (const s of [-1, 1]) { add(new T.CylinderGeometry(1.4, 1.8, 20, 10), M.stone2, s * 16, 10, 0); add(new T.SphereGeometry(2.6, 10, 8), M.bloom[0], s * 16, 21, 0, false); }
        const arch = add(new T.TorusGeometry(16, 1.1, 8, 28, Math.PI), M.leaf, 0, 18, 0); 
        for (let i = 0; i <= 14; i++) { const a = i / 14 * Math.PI; add(new T.SphereGeometry(1.5, 6, 5), M.bloom[i % 4], Math.cos(a) * 16, 18 + Math.sin(a) * 16, 0, false); }
        P.sign(api, g, 'THE GREAT PARK', 24, 3, 0, 6, 1.2, 0, '#2a4a2a', '#ffe8f0');
      } else if (type === 'PATH') {
        add(new T.BoxGeometry(12, 1.8, 360), M.path, 0, 0.9, 0, false);
        for (const s of [-1, 1]) add(new T.BoxGeometry(0.8, 2.3, 360), M.stone2, s * 6.2, 1.15, 0, false);
      } else if (type === 'LAMP') {
        add(new T.CylinderGeometry(0.2, 0.3, 11, 8), H.steel, 0, 5.5, 0, false); add(new T.SphereGeometry(1, 10, 8), H.lamp, 0, 11.6, 0, false);
        add(new T.CylinderGeometry(0.9, 1.1, 0.8, 8), M.stone2, 0, 0.4, 0, false);
      }
    },
  }));
})();
