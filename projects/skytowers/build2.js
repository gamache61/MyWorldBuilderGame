/* ============================================================
   SKY TOWERS & GARDEN HOMES · BUILD 2 · THE SKY RAIL STOP & THE PARK
   Keep this file in projects/skytowers next to 85-skytowers.html.
   A Sky Rail stop on the east side, a garden park with ponds and trees on the west, and a fountain plaza in the middle.
   ============================================================ */
(function () {
  const P = window.PWP;
  const HX = -900, HZ = 0;   // the middle of the Sky Towers terrace (world -2150, 1050)
  // Kryos look: blue glass, white walls with green roofs, stone, trees and water (one copy, shared by every build here)
  P.sk = P.sk || function (api) {
    if (this._sk) return this._sk; const T = api.THREE, std = (c, r = 0.8, m = 0, e = {}) => new T.MeshStandardMaterial({ color: c, roughness: r, metalness: m, ...e });
    const gt = hue => api.canvasTex(128, 512, (c, w, h) => { c.fillStyle = `hsl(${hue},50%,52%)`; c.fillRect(0, 0, w, h); for (let y = 0; y < h; y += 16) { c.fillStyle = 'rgba(15,35,65,.4)'; c.fillRect(0, y, w, 3); } for (let x = 0; x < w; x += 16) { c.fillStyle = 'rgba(15,35,65,.3)'; c.fillRect(x, 0, 2, h); } for (let i = 0; i < 90; i++) { c.fillStyle = 'rgba(255,255,255,.12)'; c.fillRect(Math.random() * w, Math.random() * h, 12, 8); } });
    const gm = [205, 212, 198, 220, 208, 200].map(hue => { const t = gt(hue); t.repeat.set(2, 3); return new T.MeshStandardMaterial({ map: t, metalness: 0.75, roughness: 0.12 }); });
    return this._sk = {
      glass: gm, trim: std(0xf4f6f8, 0.25, 0.3), wall: std(0xf0f2f4, 0.5, 0.1), wall2: std(0xdfe4ea, 0.6), roof: std(0x4f9a3c, 0.95), roof2: std(0x6fb04a, 0.95), grass: std(0x5f9a42, 1), leaf: std(0x3f8f3a, 0.9, 0, { flatShading: true }), leaf2: std(0x6fb040, 0.9, 0, { flatShading: true }),
      blossom: std(0xf2a0c0, 0.8, 0, { flatShading: true }), trunk: std(0x5a4030, 0.9), stone: std(0xcfc8ba, 0.9), stone2: std(0xa9a294, 0.9), path: std(0xe6dcc0, 0.95), wood: std(0x7a5a3a, 0.85), water: new T.MeshStandardMaterial({ color: 0x3f9ac8, roughness: 0.05, metalness: 0.4, transparent: true, opacity: 0.85 }),
      steel: std(0x9aa3ad, 0.35, 0.85), dark: std(0x2a2f38, 0.5, 0.5), win: new T.MeshStandardMaterial({ color: 0x20303a, emissive: 0x9fe0ff, emissiveIntensity: 0.7, roughness: 0.5 }),
      door: std(0x3a6f9a, 0.6), awn: [0xc8402e, 0x2f6690, 0xe8b82a, 0x3a8a44, 0xf06aa8, 0x8a4fd6].map(c => std(c, 0.8, 0, { side: T.DoubleSide })), flower: [0xe8402e, 0xf2c41a, 0xf06aa8, 0xffffff].map(c => std(c, 0.8)),
      glassP: new T.MeshStandardMaterial({ color: 0xbfe8ff, roughness: 0.05, metalness: 0.3, transparent: true, opacity: 0.32, side: T.DoubleSide, depthWrite: false }),
      lamp: new T.MeshBasicMaterial({ color: new T.Color(2.0, 1.8, 1.2), toneMapped: false }), glow: new T.MeshBasicMaterial({ color: new T.Color(0.6, 1.6, 2.4), toneMapped: false }),
      rail: std(0x6c7580, 0.4, 0.8), train: std(0xeef2f5, 0.3, 0.4), trainb: std(0x2f6690, 0.4, 0.4),
    };
  };
  P.gy = P.gy || ((x, z) => window.coaxH(x, z));
  const tree = (add, S, x, y, z, s = 1, b = false) => { add(new P.THREE_CYL(0.3 * s, 0.45 * s, 4 * s, 5), S.trunk, x, y + 2 * s, z, false); add(new P.THREE_ICO(3.4 * s, 0), b ? S.blossom : S.leaf, x, y + 6.2 * s, z, false); };

  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 2, name: 'THE SKY RAIL STOP & THE PARK',
    brief: 'The Sky Rail stop where the line from Kryos comes in, a garden park with a pond and trees on the west side, and a paved plaza with a fountain between the towers and the homes.',
    types: {
      STOP:  { code: 'SF', name: 'SKY RAIL STOP', col: '#2f6690', w: 90, d: 24, h: 36 },
      PARK:  { code: 'HP', name: 'GARDEN PARK',   col: '#5f9a42', w: 80, d: 80, h: 6 },
      PLAZA: { code: 'SY', name: 'TOWER PLAZA',   col: '#cfc8ba', w: 100, d: 22, h: 8 },
    },
    order: ['PLAZA', 'PARK', 'STOP'],
    at: { PLAZA: [[HX, HZ - 4]], PARK: [[HX - 190, HZ - 30], [HX - 190, HZ + 70]], STOP: [[HX + 150, HZ - 150]] },
    eye: [HX + 230, (window.__SKY.Y || -85) + 190, HZ + 330],
    stats(api, c) { return [['PLAZA', c('PLAZA') + ' / 1'], ['GARDEN PARKS', c('PARK') + ' / 2'], ['SKY RAIL STOP', c('STOP') ? 'BUILT' : 'NOT YET']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, S = P.sk(api); P.THREE_CYL = T.CylinderGeometry; P.THREE_ICO = T.IcosahedronGeometry;
      const Y0 = 0, tr = (x, z, s = 1, b = false) => tree(add, S, x, 0, z, s, b);
      if (type === 'STOP') {
        // the Sky Rail stop: an elevated platform on pylons with a glass canopy, and the line running on either side
        for (const x of [-34, 34]) for (const z of [-4, 4]) add(new T.BoxGeometry(3, 22, 3), S.steel, x, 11, z);
        add(new T.BoxGeometry(84, 2, 14), S.stone, 0, 23, 0); add(new T.BoxGeometry(84, 0.6, 1), S.glow, 0, 24.2, 6.4, false);
        for (const x of [-40, -13, 13, 40]) add(new T.BoxGeometry(1, 11, 1), S.steel, x, 29.5, -5, false);
        add(new T.BoxGeometry(86, 0.6, 14), S.glassP, 0, 35.2, 0, false); add(new T.BoxGeometry(86, 0.8, 1), S.trim, 0, 35.6, -6.8, false);
        for (const z of [-1.6, 1.6]) add(new T.BoxGeometry(150, 0.7, 0.7), S.rail, 0, 24.4, z - 8.5, false);
        add(new T.BoxGeometry(150, 1.4, 3.2), S.stone2, 0, 23, -8.5, false);
        for (const x of [-72, 72]) add(new T.BoxGeometry(3, 22, 3), S.steel, x, 11, -8.5, false);
        // stairs down to the ground
        for (let i = 0; i < 11; i++) add(new T.BoxGeometry(6, 1, 2.2), S.stone, 0, 1 + i * 2, 12 - i * 1.2, false);
        add(new T.BoxGeometry(8, 0.6, 2), S.stone, 0, 23, 8.5, false);
        const sg = add(new T.BoxGeometry(22, 4, 0.5), S.dark, 0, 31, 7.4, false); add(new T.BoxGeometry(20, 2.4, 0.3), S.glow, 0, 31, 7.7, false);
        for (const x of [-24, 0, 24]) { add(new T.BoxGeometry(5, 0.7, 1.4), S.wood, x, 24.8, 3.5, false); }
        P.person(g, P.civ(85200), 'idle', -10, 24, 2, Math.PI); P.person(g, P.civ(85201), 'idle', 14, 24, 3, Math.PI);
      } else if (type === 'PARK') {
        add(new T.BoxGeometry(80, 0.6, 80), S.grass, 0, 0.3, 0, false);
        for (const [x, z, w, d] of [[0, 0, 4, 80], [0, 0, 80, 4]]) add(new T.BoxGeometry(w, 0.2, d), S.path, x, 0.7, z, false);
        const pond = add(new T.CylinderGeometry(11, 11, 0.4, 28), S.water, k ? -20 : 20, 0.75, k ? 20 : -20, false);
        add(new T.TorusGeometry(11, 0.8, 6, 28), S.stone, k ? -20 : 20, 0.9, k ? 20 : -20, false).rotation.x = Math.PI / 2;
        const pts = k ? [[-30, -28], [-12, -32], [24, -26], [32, 28], [12, 30], [-32, 30], [28, -6], [-26, 8]] : [[-30, 28], [-12, 32], [24, 26], [32, -28], [-30, -26], [-8, -30], [-28, 6], [28, 8]];
        pts.forEach(([x, z], i) => tree(add, S, x, 0.6, z, 1.1 + (i % 3) * 0.2, i % 4 === 0));
        for (const [x, z, r] of [[-8, 8, 0], [8, -8, Math.PI], [-8, -8, Math.PI / 2], [8, 8, -Math.PI / 2]]) add(new T.BoxGeometry(5, 0.7, 1.4), S.wood, x, 1.2, z, false).rotation.y = r;
        for (let i = 0; i < 14; i++) add(new T.SphereGeometry(0.7, 6, 5), S.flower[i % 4], -34 + (i % 7) * 11, 1, (i < 7 ? -37 : 37), false);
        P.person(g, P.civ(85210 + k), 'idle', 6, 0.8, 4, 1); P.person(g, P.civ(85212 + k), 'idle', -6, 0.8, -4, 4);
      } else if (type === 'PLAZA') {
        add(new T.BoxGeometry(100, 0.6, 22), S.stone, 0, 0.3, 0, false); add(new T.BoxGeometry(94, 0.2, 16), S.path, 0, 0.7, 0, false);
        add(new T.CylinderGeometry(6, 6.4, 1.6, 24), S.stone2, 0, 1.4, 0, false); add(new T.CylinderGeometry(5.2, 5.2, 1.2, 24), S.water, 0, 1.9, 0, false);
        add(new T.CylinderGeometry(0.7, 1, 6, 8), S.stone, 0, 4, 0, false); add(new T.SphereGeometry(1.4, 10, 8), S.water, 0, 7.4, 0, false);
        for (const x of [-42, -24, 24, 42]) { add(new T.CylinderGeometry(0.3, 0.4, 7, 6), S.steel, x, 3.5, 8, false); add(new T.SphereGeometry(0.9, 8, 6), S.lamp, x, 7.4, 8, false); }
        for (const x of [-34, 34]) tree(add, S, x, 0.6, -6, 0.9, true);
        P.person(g, P.civ(85220), 'idle', -16, 0.7, 4, 0.6); P.person(g, P.civ(85221), 'idle', 18, 0.7, -3, 3.8);
      }
    },

  }));
})();
