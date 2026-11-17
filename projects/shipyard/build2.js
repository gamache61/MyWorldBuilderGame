/* ============================================================
   THE UNITY SHIPYARD · BUILD 2 · THE SHIPYARD APRON, THE ROAD & THE GATEHOUSE
   Keep this file in projects/shipyard next to 73-warehouses.html.
   A wide concrete apron south of the Parts Works with a truck road that joins the two yards, a gatehouse with a barrier, and tall work lamps.
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
  P.gy = (x, z) => window.coaxH(x, z);
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 2, name: 'THE SHIPYARD APRON, THE ROAD & THE GATEHOUSE',
    brief: 'A wide concrete apron on the flat ground south of the Parts Works, a truck road that joins it to the Parts Works yard, a gatehouse with a lifting barrier and tall work lamps.',
    types: {
      APRON: { code: 'SF', name: 'THE APRON',      col: '#a9adb2', w: 560, d: 400, h: 2 },
      ROAD:  { code: 'SF', name: 'THE TRUCK ROAD', col: '#3a3e45', w: 40,  d: 140, h: 1 },
      GATE:  { code: 'SY', name: 'GATEHOUSE',      col: '#d7dade', w: 22,  d: 16,  h: 12 },
      LAMP:  { code: 'HP', name: 'WORK LAMP',      col: '#f2c41a', w: 3,   d: 3,   h: 22 },
    },
    order: ['APRON', 'ROAD', 'GATE', 'LAMP'],
    at: {
      APRON: [[1550 + 60, 500]], ROAD: [[1550 + 60, 290]], GATE: [[1550 + 90, 300]],
      LAMP: [[-190, 320], [-60, 320], [60, 320], [190, 320], [310, 320], [-190, 680], [310, 680]].map(([x, z]) => [1550 + x, z]),
    },
    eye: [1550 + 60, P.SY + 230, 90],
    stats(api, c) { return [['THE APRON', c('APRON') ? 'POURED' : 'NOT YET'], ['THE TRUCK ROAD', c('ROAD') ? 'MARKED' : 'NOT YET'], ['GATEHOUSE', c('GATE') ? 'MANNED' : 'NOT YET'], ['WORK LAMPS', c('LAMP') + ' / 7']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, H = P.pw(api);
      if (type === 'APRON') {
        add(new T.BoxGeometry(560, 1.4, 400), H.conc, 0, 0.7, 0, false);
        for (let x = -240; x <= 240; x += 40) add(new T.BoxGeometry(0.4, 0.06, 400), H.conc2, x, 1.43, 0, false);
        for (let z = -180; z <= 180; z += 40) add(new T.BoxGeometry(560, 0.06, 0.4), H.conc2, 0, 1.43, z, false);
        for (const s of [-1, 1]) { add(new T.BoxGeometry(560, 1.6, 1), H.hazard, 0, 1.0, s * 198, false); add(new T.BoxGeometry(1, 1.6, 400), H.hazard, s * 278, 1.0, 0, false); }
      } else if (type === 'ROAD') {
        add(new T.BoxGeometry(20, 0.3, 140), H.road, 0, 0.55, 0, false);
        for (let z = -60; z <= 60; z += 16) add(new T.BoxGeometry(0.5, 0.05, 7), H.line, 0, 0.74, z, false);
        for (const s of [-1, 1]) add(new T.BoxGeometry(0.8, 0.4, 140), H.hazard, s * 10.4, 0.6, 0, false);
      } else if (type === 'GATE') {
        add(new T.BoxGeometry(22, 1, 16), H.conc2, 0, 0.5, 0);
        add(new T.BoxGeometry(20, 10, 14), H.wall, 0, 6, 0);
        add(new T.BoxGeometry(23, 1, 17), H.roof, 0, 11.4, 0);
        add(new T.BoxGeometry(14, 4, 0.4), H.win, 0, 7, 7.2, false); add(new T.BoxGeometry(0.4, 4, 10), H.win, -10.2, 7, 0, false);
        add(new T.BoxGeometry(1.2, 6, 1.2), H.dark, -18, 3.5, 0, false); add(new T.BoxGeometry(1.2, 6, 1.2), H.dark, -34, 3.5, 0, false);
        add(new T.BoxGeometry(18, 0.8, 0.8), H.hazard, -26, 5.5, 0, false);
        P.sign(api, g, 'UNITY SHIPYARD', 20, 3, 0, 9.4, 7.3, 0, '#14242e', '#a8d8ff');
        P.person(g, P.civ(74010), 'idle', 12, 0.5, 6, -Math.PI / 2);
      } else if (type === 'LAMP') {
        add(new T.CylinderGeometry(0.3, 0.5, 21, 8), H.steel, 0, 10.5, 0, false); add(new T.BoxGeometry(5, 1.4, 1.2), H.dark, 0, 21.5, 0, false); add(new T.BoxGeometry(4.4, 0.5, 1), H.lamp, 0, 20.7, 0, false);
        add(new T.CylinderGeometry(1.2, 1.4, 1, 8), H.conc2, 0, 0.5, 0, false);
      }
    },
  }));
})();
