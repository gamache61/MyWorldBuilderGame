/* ============================================================
   THE STAR CHART HOUSE · BUILD 2 · THE FORECOURT, THE APPROACH ROAD & THE GATEHOUSE
   Keep this file in projects/starchart next to 79-starchart.html.
   A round stone forecourt on the hill terrace, an approach road, a gatehouse and tall lamps.
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
  // dark blue stone, brass and star light for the Star Chart House (one copy, shared by every build here)
  P.sc = function (api) {
    if (this._sc) return this._sc; const T = api.THREE, std = (c, r = 0.8, m = 0, e = {}) => new T.MeshStandardMaterial({ color: c, roughness: r, metalness: m, ...e });
    return this._sc = {
      stone: std(0xcfd2da, 0.9), stone2: std(0x9aa0b0, 0.9), navy: std(0x23305a, 0.6, 0.2), navy2: std(0x34457a, 0.55, 0.25), brass: std(0xc8a24a, 0.35, 0.8), copper: std(0x4aa88a, 0.5, 0.5), white: std(0xf4f6f8, 0.5), dark: std(0x1a1f2e, 0.6, 0.3),
      star: new T.MeshBasicMaterial({ color: new T.Color(2.2, 2.0, 1.2), toneMapped: false }), glow: new T.MeshBasicMaterial({ color: new T.Color(0.7, 1.2, 2.6), toneMapped: false }),
      glass: new T.MeshStandardMaterial({ color: 0xbfd8ff, roughness: 0.05, metalness: 0.3, transparent: true, opacity: 0.3, side: T.DoubleSide, depthWrite: false }),
      planet: [0xe8a060, 0x60a0e8, 0xd8d0b0, 0xc85040, 0x80c0a0].map(c => std(c, 0.6)),
    };
  };
  P.gy = (x, z) => window.coaxH(x, z);
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 2, name: 'THE FORECOURT, THE APPROACH ROAD & THE GATEHOUSE',
    brief: 'A great round forecourt of pale stone on the hill terrace, a curved approach road up from the valley, a gatehouse with a lifting barrier and tall lamps.',
    types: {
      COURT: { code: 'SF', name: 'THE FORECOURT', col: '#cfd2da', w: 240, d: 240, h: 2 },
      ROAD:  { code: 'SF', name: 'APPROACH ROAD', col: '#3a3e45', w: 140, d: 40, h: 1 },
      GATE:  { code: 'SY', name: 'GATEHOUSE',     col: '#d7dade', w: 22, d: 16, h: 12 },
      LAMP:  { code: 'HP', name: 'STAR LAMP',     col: '#f2c41a', w: 3, d: 3, h: 22 },
    },
    order: ['COURT', 'ROAD', 'GATE', 'LAMP'],
    at: { COURT: [[1550 + 2400 + 0, 1250 + 0]], ROAD: [[1550 + 2400 + 0, 1250 + 190]], GATE: [[1550 + 2400 + -40, 1250 + 125]],
      LAMP: [[1550 + 2400 + -100, 1250 + 100], [1550 + 2400 + 100, 1250 + 100], [1550 + 2400 + -100, 1250 + -100], [1550 + 2400 + 100, 1250 + -100], [1550 + 2400 + 0, 1250 + -110], [1550 + 2400 + 0, 1250 + 110]] },
    eye: [1550 + 2400 + 0, (window.__STAR.Y || -85) + 200, 1250 + 380],
    stats(api, c) { return [['THE FORECOURT', c('COURT') ? 'LAID' : 'NOT YET'], ['APPROACH ROAD', c('ROAD') ? 'MARKED' : 'NOT YET'], ['GATEHOUSE', c('GATE') ? 'MANNED' : 'NOT YET'], ['STAR LAMPS', c('LAMP') + ' / 6']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, H = P.pw(api), S = P.sc(api);
      if (type === 'COURT') {
        add(new T.CylinderGeometry(120, 121, 2.2, 48), S.stone, 0, 1.1, 0, false);
        for (const r of [40, 80, 115]) add(new T.TorusGeometry(r, 0.4, 4, 64), S.stone2, 0, 2.25, 0, false).rotation.x = Math.PI / 2;
        for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; add(new T.BoxGeometry(0.5, 0.06, 80), S.stone2, Math.cos(a) * 20 + 0, 2.25, Math.sin(a) * 20, false).rotation.y = -a; }
        add(new T.CylinderGeometry(6, 6, 0.3, 24), S.brass, 0, 2.3, 0, false);
      } else if (type === 'ROAD') {
        add(new T.BoxGeometry(40, 1.8, 140), H.road, 0, 0.9, 0, false);
        for (let z = -60; z <= 60; z += 16) add(new T.BoxGeometry(0.5, 0.05, 7), H.line, 0, 1.84, z, false);
      } else if (type === 'GATE') {
        add(new T.BoxGeometry(22, 2, 16), H.conc2, 0, 1, 0);
        add(new T.BoxGeometry(20, 10, 14), S.stone, 0, 7, 0);
        add(new T.BoxGeometry(23, 1, 17), S.navy, 0, 12.4, 0);
        add(new T.BoxGeometry(14, 4, 0.4), H.win, 0, 8, 7.2, false);
        add(new T.BoxGeometry(18, 0.8, 0.8), H.hazard, 20, 6.5, 0, false);
        P.sign(api, g, 'STAR CHART HOUSE', 20, 3, 0, 10.4, 7.3, 0, '#14182e', '#ffe9a8');
        P.person(g, P.civ(79010), 'idle', 12, 1.5, 6, -Math.PI / 2);
      } else if (type === 'LAMP') {
        add(new T.CylinderGeometry(1.2, 1.4, 2, 8), H.conc2, 0, 1, 0, false);
        add(new T.CylinderGeometry(0.3, 0.5, 21, 8), H.steel, 0, 11.5, 0, false); add(new T.SphereGeometry(1.6, 10, 8), S.star, 0, 22.5, 0, false);
        for (let i = 0; i < 4; i++) add(new T.BoxGeometry(0.3, 5, 0.3), S.brass, Math.cos(i * 1.57) * 1.8, 20.5, Math.sin(i * 1.57) * 1.8, false).rotation.set(Math.sin(i * 1.57) * 0.5, 0, -Math.cos(i * 1.57) * 0.5);
      }
    },
  }));
})();
