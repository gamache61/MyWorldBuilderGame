/* ============================================================
   THE PARTS WORKS · BUILD 2 · THE YARD, THE ROADS & THE BEAM MILL
   Keep this file in projects/partsworks next to 72-partsworks.html.
   A wide concrete yard with truck roads, the beam mill that rolls Vesh ore into beams, stacks of finished beams and tall work lamps.
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
    id: 2, name: 'THE YARD, THE ROADS & THE BEAM MILL',
    brief: 'A wide concrete yard on a flat terrace with two crossing truck roads, the beam mill that rolls Vesh ore into steel beams, three stacks of finished beams and tall work lamps.',
    types: {
      YARD:  { code: 'SF', name: 'THE YARD',     col: '#a9adb2', w: 520, d: 440, h: 2 },
      ROADS: { code: 'SF', name: 'TRUCK ROADS',  col: '#3a3e45', w: 500, d: 400, h: 1 },
      MILL:  { code: 'FB', name: 'BEAM MILL',    col: '#7d8a96', w: 120, d: 60,  h: 28 },
      STACK: { code: 'FB', name: 'BEAM STACK',   col: '#b8bcc4', w: 30,  d: 14,  h: 10 },
      LAMP:  { code: 'HP', name: 'WORK LAMP',    col: '#f2c41a', w: 3,   d: 3,   h: 22 },
    },
    order: ['YARD', 'ROADS', 'MILL', 'STACK', 'LAMP'],
    at: {
      YARD: [[1550, 0]], ROADS: [[1550, 0]], MILL: [[1550 - 140, -120]],
      STACK: [[1550 - 190, -62], [1550 - 140, -62], [1550 - 90, -62]],
      LAMP: [[-240, 30], [-120, 90], [0, 30], [120, 90], [240, 30], [0, -170]].map(([x, z]) => [1550 + x, z]),
    },
    eye: [1550 - 40, P.SY + 150, 280],
    stats(api, c) { return [['THE YARD', c('YARD') ? 'POURED' : 'NOT YET'], ['TRUCK ROADS', c('ROADS') ? 'MARKED' : 'NOT YET'], ['BEAM MILL', c('MILL') ? 'ROLLING' : 'NOT YET'], ['BEAM STACKS', c('STACK') + ' / 3'], ['WORK LAMPS', c('LAMP') + ' / 6']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, H = P.pw(api);
      if (type === 'YARD') {
        add(new T.BoxGeometry(520, 0.4, 440), H.conc, 0, 0.2, 0, false);
        for (let x = -240; x <= 240; x += 40) add(new T.BoxGeometry(0.4, 0.06, 440), H.conc2, x, 0.43, 0, false);
        for (let z = -200; z <= 200; z += 40) add(new T.BoxGeometry(520, 0.06, 0.4), H.conc2, 0, 0.43, z, false);
        for (const s of [-1, 1]) { add(new T.BoxGeometry(520, 1.6, 1), H.hazard, 0, 1.0, s * 222, false); add(new T.BoxGeometry(1, 1.6, 440), H.hazard, s * 262, 1.0, 0, false); }
      } else if (type === 'ROADS') {
        add(new T.BoxGeometry(500, 0.3, 18), H.road, 0, 0.55, 60, false); add(new T.BoxGeometry(18, 0.3, 400), H.road, -10, 0.56, 0, false);
        for (let x = -240; x <= 240; x += 16) add(new T.BoxGeometry(7, 0.05, 0.5), H.line, x, 0.74, 60, false);
        for (let z = -190; z <= 190; z += 16) add(new T.BoxGeometry(0.5, 0.05, 7), H.line, -10, 0.74, z, false);
        add(new T.BoxGeometry(18, 0.32, 18), H.road, -10, 0.57, 60, false);
        for (let i = 0; i < 8; i++) add(new T.BoxGeometry(1.4, 0.06, 18), H.line, -17 + i * 2, 0.75, 60, false);   // the crossing
      } else if (type === 'MILL') {
        add(new T.BoxGeometry(120, 1, 60), H.conc2, 0, 0.5, 0);
        add(new T.BoxGeometry(116, 18, 56), H.wall2, 0, 10, 0);
        add(new T.BoxGeometry(122, 1.2, 62), H.roof, 0, 19.4, 0);
        for (let i = 0; i < 6; i++) { const r = add(new T.BoxGeometry(14, 5, 58), H.roof2, -48 + i * 19, 22.6, 0); r.scale.set(1, 1, 1); add(new T.BoxGeometry(12, 3, 0.4), H.win, -48 + i * 19, 22.6, 29.2, false); }
        for (let i = 0; i < 8; i++) add(new T.BoxGeometry(8, 7, 0.4), H.win, -52 + i * 15, 12, 28.2, false);
        add(new T.BoxGeometry(14, 14, 0.5), H.dark, 61, 8, 0, false);       // the mouth where beams roll out
        add(new T.BoxGeometry(3, 3, 3), H.hot, 58, 4, 0, false);
        for (let i = 0; i < 6; i++) { add(new T.CylinderGeometry(0.9, 0.9, 6, 10), H.steel, 66 + i * 5, 1.4, 0, false).rotation.x = Math.PI / 2; }
        for (let x = -50; x <= 50; x += 25) { add(new T.CylinderGeometry(1.6, 2, 26, 10), H.steel2, x, 33, 20); add(new T.CylinderGeometry(1.2, 1.2, 1, 10), H.cool, x, 46.4, 20, false); }   // clean vents: no smoke
        P.sign(api, g, 'BEAM MILL', 30, 4, 0, 15, 28.3, 0, '#1b2733', '#ffd27a');
        P.person(g, P.civ(72010), 'idle', 64, 0.5, 12, -Math.PI / 2);
      } else if (type === 'STACK') {
        for (let r = 0; r < 4; r++) for (let c = 0; c < 4 - (r > 1 ? 1 : 0); c++) add(new T.BoxGeometry(28, 1.8, 1.8), H.beam, 0, 1 + r * 2, -5 + c * 2.6 + (r > 1 ? 1.3 : 0));
        for (const x of [-12, 0, 12]) add(new T.BoxGeometry(1.2, 0.8, 11), H.dark, x, 0.4, 0, false);
        add(new T.BoxGeometry(30, 0.2, 14), H.yellow, 0, 0.12, 0, false);
      } else if (type === 'LAMP') {
        add(new T.CylinderGeometry(0.3, 0.5, 21, 8), H.steel, 0, 10.5, 0, false); add(new T.BoxGeometry(5, 1.4, 1.2), H.dark, 0, 21.5, 0, false); add(new T.BoxGeometry(4.4, 0.5, 1), H.lamp, 0, 20.7, 0, false);
        add(new T.CylinderGeometry(1.2, 1.4, 1, 8), H.conc2, 0, 0.5, 0, false);
      }
    },
  }));
})();
