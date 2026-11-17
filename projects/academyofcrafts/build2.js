/* ============================================================
   THE UNITY ACADEMY OF CRAFTS · BUILD 2 · THE COURTYARD, THE LANE & THE GATE
   Keep this file in projects/academyofcrafts next to 81-academyofcrafts.html.
   A round cobbled courtyard with a monument to the first builders, a lane that runs east to the Parts Works, an arched gate and lanterns.
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
  // warm brick, timber, tile and copper for the Academy of Crafts (one copy, shared by every build here)
  P.ac = function (api) {
    if (this._ac) return this._ac; const T = api.THREE, std = (c, r = 0.8, m = 0, e = {}) => new T.MeshStandardMaterial({ color: c, roughness: r, metalness: m, ...e });
    return this._ac = {
      cobble: std(0xb5a78e, 0.95), cobble2: std(0x948872, 0.95), brick: std(0xb8694a, 0.85), brick2: std(0x8f4c34, 0.9), cream: std(0xe8dcc0, 0.8), timber: std(0x7a5430, 0.85),
      tile: std(0xa8452e, 0.75), slate: std(0x46515c, 0.7, 0.2), patina: std(0x4aa88a, 0.5, 0.5), brass: std(0xc8a24a, 0.35, 0.8), iron: std(0x2c3138, 0.5, 0.7),
      banner: [0xc8362a, 0x2f6fb0, 0xe8a61a, 0x3f9a5a, 0x8a4fd0].map(c => std(c, 0.7)),
      fire: new T.MeshBasicMaterial({ color: new T.Color(2.6, 1.1, 0.25), toneMapped: false }), spark: new T.MeshBasicMaterial({ color: new T.Color(2.4, 2.2, 1.6), toneMapped: false }),
      lantern: new T.MeshBasicMaterial({ color: new T.Color(2.2, 1.7, 0.9), toneMapped: false }),
    };
  };
  const AX = 1550 - 1400, AZ = 0;
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 2, name: 'THE COURTYARD, THE LANE & THE GATE',
    brief: 'A round cobbled courtyard with a monument to the first builders of Unity, a lane running east towards the Parts Works, an arched gate and tall lanterns.',
    types: {
      COURT: { code: 'SF', name: 'THE COURTYARD', col: '#b5a78e', w: 220, d: 220, h: 2 },
      LANE:  { code: 'SF', name: 'THE LANE',      col: '#948872', w: 140, d: 30, h: 1 },
      GATE:  { code: 'SY', name: 'THE GATE',      col: '#b8694a', w: 16, d: 40, h: 22 },
      LAMP:  { code: 'HP', name: 'LANTERN',       col: '#f2c41a', w: 3, d: 3, h: 20 },
    },
    order: ['COURT', 'LANE', 'GATE', 'LAMP'],
    at: { COURT: [[AX, AZ]], LANE: [[AX + 170, AZ]], GATE: [[AX + 112, AZ]],
      LAMP: [[AX + 95, AZ - 30], [AX + 95, AZ + 30], [AX + 150, AZ - 24], [AX + 150, AZ + 24], [AX + 215, AZ - 24], [AX + 215, AZ + 24]] },
    eye: [AX + 260, (window.__ACAD.Y || -85) + 190, AZ + 330],
    stats(api, c) { return [['THE COURTYARD', c('COURT') ? 'LAID' : 'NOT YET'], ['THE LANE', c('LANE') ? 'OPEN' : 'NOT YET'], ['THE GATE', c('GATE') ? 'HUNG' : 'NOT YET'], ['LANTERNS', c('LAMP') + ' / 6']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, H = P.pw(api), A = P.ac(api);
      if (type === 'COURT') {
        add(new T.CylinderGeometry(110, 111, 2.2, 48), A.cobble, 0, 1.1, 0, false);
        for (const r of [30, 70, 105]) add(new T.TorusGeometry(r, 0.4, 4, 64), A.cobble2, 0, 2.25, 0, false).rotation.x = Math.PI / 2;
        // the monument to the first builders: a stone plinth, a great anvil and a bronze hammer
        add(new T.CylinderGeometry(9, 10, 3, 16), A.cobble2, 0, 3.4, 0);
        add(new T.BoxGeometry(8, 6, 5), A.iron, 0, 8, 0); add(new T.BoxGeometry(11, 2, 5), A.iron, 0, 11.6, 0); add(new T.CylinderGeometry(0.7, 0.7, 7, 8), A.timber, 3, 14.5, 0, false).rotation.z = 0.6;
        add(new T.BoxGeometry(3, 2.2, 2.2), A.brass, 5.4, 17.2, 0, false);
        P.sign(api, g, 'THE FIRST BUILDERS OF UNITY', 22, 2.4, 0, 6, 10.3, 0, '#3a2210', '#ffe08a');
        for (let i = 0; i < 6; i++) { const a = i / 6 * Math.PI * 2 + 0.3; add(new T.BoxGeometry(5, 0.8, 1.6), A.timber, Math.cos(a) * 52, 2.7, Math.sin(a) * 52, false).rotation.y = -a; }
        for (let i = 0; i < 5; i++) P.person(g, P.kid(81010 + i), i % 2 ? 'idle' : 'tablet', -40 + i * 18, 2.2, 66 - (i % 2) * 8, Math.PI);
      } else if (type === 'LANE') {
        add(new T.BoxGeometry(140, 0.8, 30), A.cobble, 0, 0.4, 0, false);
        for (let x = -60; x <= 60; x += 20) add(new T.BoxGeometry(0.8, 0.9, 30), A.cobble2, x, 0.5, 0, false);
        for (const s of [-1, 1]) add(new T.BoxGeometry(140, 1.4, 1.2), A.cobble2, 0, 0.9, s * 15.6, false);
      } else if (type === 'GATE') {
        for (const s of [-1, 1]) { add(new T.BoxGeometry(5, 18, 5), A.brick, 0, 9, s * 14); add(new T.BoxGeometry(6.4, 1.2, 6.4), A.cobble2, 0, 18.6, s * 14, false); }
        add(new T.BoxGeometry(5, 4, 33), A.brick2, 0, 20, 0); add(new T.BoxGeometry(3, 2, 20), A.brass, 0, 23, 0, false);
        for (let i = 0; i < 5; i++) add(new T.BoxGeometry(0.6, 12, 0.6), A.iron, 0.4, 7, -8 + i * 4, false);
        P.sign(api, g, 'THE UNITY ACADEMY OF CRAFTS', 30, 3, 2.7, 20, 0, Math.PI / 2, '#3a2210', '#ffe08a');
        P.person(g, P.civ(81020), 'idle', -6, 0.5, 20, Math.PI / 2);
      } else if (type === 'LAMP') {
        add(new T.CylinderGeometry(0.4, 0.5, 15, 6), A.iron, 0, 7.5, 0, false); add(new T.BoxGeometry(2.2, 2.6, 2.2), A.lantern, 0, 16.4, 0, false); add(new T.ConeGeometry(2, 1.6, 4), A.tile, 0, 18.4, 0, false);
      }
    },
  }));
})();
