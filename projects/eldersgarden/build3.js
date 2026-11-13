/* ============================================================
   THE ELDERS GARDEN · BUILD 3 · THE GROWING BEDS, THE POND & THE SHADE TREES
   Keep this file in projects/eldersgarden next to 68-eldersgarden.html.
   ============================================================ */
(function () {
  const P = window.EGP;
  const rel = a => a.map(([x, z]) => [1550 + x, z]);
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 3, name: 'THE GROWING BEDS, THE POND & THE SHADE TREES',
    brief: 'Raised beds of vegetables and herbs that the elders tend, a still pond with a little bridge, and six big shade trees to sit under.',
    types: {
      BED:  { code: 'GD', name: 'GROWING BED', col: '#6fae52', w: 36, d: 20, h: 3 },
      POND: { code: 'SF', name: 'THE POND',    col: '#3f86b0', w: 60, d: 60, h: 2 },
      BRIDGE: { code: 'HM', name: 'LITTLE BRIDGE', col: '#9a6f42', w: 30, d: 8, h: 4 },
      TREE: { code: 'GD', name: 'SHADE TREE',  col: '#3f7a2c', w: 24, d: 24, h: 22 },
    },
    order: ['BED', 'POND', 'BRIDGE', 'TREE'],
    at: {
      BED: rel([[-180, -100], [-110, -100], [-180, 100], [-110, 100], [60, -100], [130, -100], [60, 100], [130, 100]]),
      POND: rel([[20, 0]]), BRIDGE: rel([[20, 0]]),
      TREE: rel([[-60, -150], [20, -150], [100, -150], [-60, 150], [20, 150], [100, 150]]),
    },
    eye: [1550 + 60, P.SY + 120, 250],
    stats(api, c) { return [['GROWING BEDS', c('BED') + ' / 8'], ['THE POND', c('POND') ? 'FILLED' : 'NOT YET'], ['LITTLE BRIDGE', c('BRIDGE') ? 'STANDING' : 'NOT YET'], ['SHADE TREES', c('TREE') + ' / 6']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, H = P.eg(api);
      if (type === 'BED') {
        add(new T.BoxGeometry(36, 1.6, 20), H.timber2, 0, 0.8, 0); add(new T.BoxGeometry(34, 0.3, 18), H.soil, 0, 1.7, 0, false);
        for (let i = 0; i < 6; i++) for (let j = 0; j < 3; j++) { const m = H.veg[(i + j + k) % 6]; add(new T.SphereGeometry(0.9, 6, 5), m, -14 + i * 5.6, 2.4, -6 + j * 6, false).scale.y = 0.8; }
        if (k % 2 === 0) P.person(g, P.civ(68100 + k), 'idle', 0, 0, 13, Math.PI);
      } else if (type === 'POND') {
        add(new T.CylinderGeometry(31, 31, 0.8, 36), H.stone, 0, 0.4, 0, false);
        add(new T.CylinderGeometry(28, 28, 0.9, 36), H.water, 0, 0.55, 0, false);
        for (let i = 0; i < 9; i++) { const a = i * 0.7, r = 8 + (i % 4) * 5; add(new T.CylinderGeometry(1.4, 1.4, 0.1, 10), H.leaf, Math.cos(a) * r, 1.05, Math.sin(a) * r, false); }
        for (let i = 0; i < 18; i++) { const a = i / 18 * Math.PI * 2; add(new T.SphereGeometry(1.5 + (i % 3) * 0.4, 6, 5), H.stone, Math.cos(a) * 31, 0.9, Math.sin(a) * 31, false); }
        P.sign(api, g, 'THE STILL POND', 12, 1.6, 0, 3, 34, 0, '#1f3b2c', '#e8ffd8');
      } else if (type === 'BRIDGE') {
        for (let i = -6; i <= 6; i++) { const y = 3.2 - Math.abs(i) * 0.12 + 0.3; add(new T.BoxGeometry(2.2, 0.5, 7), H.timber, i * 2.2, y, 0, false); }
        for (const s of [-1, 1]) { add(new T.BoxGeometry(30, 0.25, 0.3), H.timber2, 0, 4.2, s * 3.6, false); for (let i = -6; i <= 6; i += 3) add(new T.BoxGeometry(0.3, 1.8, 0.3), H.timber2, i * 2.2, 3.3 - Math.abs(i) * 0.1, s * 3.6, false); }
        for (const s of [-1, 1]) add(new T.BoxGeometry(4, 2.4, 8), H.stone, s * 15.5, 1.2, 0, false);
      } else if (type === 'TREE') {
        add(new T.CylinderGeometry(1.3, 2, 10, 8), H.trunk, 0, 5, 0);
        for (const [x, y, z, r] of [[0, 14, 0, 9], [-6, 12, 3, 6.5], [6, 12.5, -3, 7], [2, 18, 2, 6]]) add(new T.IcosahedronGeometry(r, 1), k % 2 ? H.leaf : H.leaf2, x, y, z);
        add(new T.BoxGeometry(9, 0.8, 3), H.timber, 8, 1.4, 6, false);
        if (k === 1) P.person(g, P.civ(68140), 'idle', 9, 1.9, 6, 0);
      }
    },
  }));
})();
