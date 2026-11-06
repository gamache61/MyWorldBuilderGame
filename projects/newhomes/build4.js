/* ============================================================
   NEW HOMES FOR THE FAMILIES · BUILD 4 · THE DISTRICT SCHOOL, MARKET & GARDENS
   Keep this file in projects/newhomes next to newhomes.html.
   Everything a neighbourhood needs near home: a small district school
   with its own playground, a glass market hall where the farmlands'
   harvest is shared out, and community gardens where every family
   can grow its own vegetables.
   ============================================================ */
(function () {
  const P = window.HOMES;
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 4, name: 'THE DISTRICT SCHOOL, MARKET & GARDENS',
    brief: 'A district school with a playground, a glass market hall where the harvest is shared out, and community gardens for every family.',
    types: {
      HOMESCHOOL: { code: 'SY', name: 'DISTRICT SCHOOL', col: '#90f0b0', w: 90, d: 60, h: 18 },
      MARKET:     { code: 'SY', name: 'MARKET HALL', col: '#e8e1d1', w: 90, d: 60, h: 20 },
      ALLOTMENT:  { code: 'GD', name: 'COMMUNITY GARDENS', col: '#5f9e3a', w: 220, d: 60, h: 6 },
    },
    order: ['HOMESCHOOL', 'MARKET', 'ALLOTMENT'],
    at: { HOMESCHOOL: [[40, 720]], MARKET: [[200, 720]], ALLOTMENT: [[-20, 860], [260, 860]] },
    eye: [-220, 210, -250],
    stats(api, c) { return [['DISTRICT SCHOOL', c('HOMESCHOOL') ? 'OPEN' : 'NOT YET'], ['MARKET HALL', c('MARKET') ? 'OPEN' : 'NOT YET'], ['GARDEN PLOTS', c('ALLOTMENT') * 60 + ' / 120']]; },
    make(type, k, g, add, F, api) {
      const T = api.THREE, S = P.hm(api), C = P.fun(api), W = P.walls(api);
      if (type === 'HOMESCHOOL') {
        add(new T.BoxGeometry(90, 0.8, 60), S.stone, 0, 0.4, 0);
        // an L-shaped school: two classroom wings, a round hall where they meet, and a playground in the corner
        add(new T.BoxGeometry(60, 12, 18), S.cream, -10, 6.8, -16); add(new T.BoxGeometry(18, 12, 34), S.cream, -31, 6.8, 9);
        add(new T.CylinderGeometry(11, 11, 15, 24), S.mint, -31, 8.3, -16); add(new T.ConeGeometry(12, 5, 24), S.copper, -31, 18.3, -16);
        for (const [w, d, x, z] of [[60, 18, -10, -16], [18, 34, -31, 9]]) { add(new T.BoxGeometry(w + 1, 0.8, d + 1), S.frame, x, 13.2, z); add(new T.BoxGeometry(w - 2, 0.6, d - 2), S.roofGreen, x, 13.8, z); }
        for (let i = 0; i < 6; i++) for (const y of [4.4, 9.4]) add(new T.BoxGeometry(6, 3, 0.25), S.dim, -34 + i * 9.6 + 10, y, -6.9, false);
        for (let i = 0; i < 3; i++) for (const y of [4.4, 9.4]) add(new T.BoxGeometry(0.25, 3, 6), S.dim, -21.9, y, 0 + i * 9, false);
        P.sign(api, g, 'HOMEWARD SCHOOL', 18, 2.4, -10, 11, -6.8, 0, '#12333a', '#bff8d0', false);
        // the playground
        add(new T.BoxGeometry(44, 0.4, 34), C.soft, 18, 1, 12);
        add(new T.BoxGeometry(8, 0.6, 8), C.yellow, 12, 5, 8); for (const [x, z] of [[8.5, 4.5], [15.5, 4.5], [8.5, 11.5], [15.5, 11.5]]) add(new T.BoxGeometry(0.6, 9, 0.6), C.blue, x, 5, z);
        add(new T.ConeGeometry(6, 3, 4), C.red, 12, 10.5, 8).rotation.y = Math.PI / 4; add(new T.BoxGeometry(2.6, 0.4, 10), C.orange, 12, 3, 16).rotation.x = 0.5;
        for (const x of [26, 32]) { add(new T.BoxGeometry(0.5, 7, 0.5), C.green, x, 4.5, 20); } add(new T.BoxGeometry(7, 0.5, 0.5), C.green, 29, 8, 20);
        for (let i = 0; i < 8; i++) P.figure(api, add, 4 + (i % 4) * 7, 1.2, 6 + (i >> 2) * 14, i % 3 ? 0.6 : 1, i);
        P.person(g, P.civ(16200), 'walk', 0, 1.2, 0, 0, { path: { type: 'circle', cx: 22, cz: 12, r: 10, speed: 1.4 }, scale: 0.6 });
      } else if (type === 'MARKET') {
        add(new T.BoxGeometry(90, 0.8, 60), S.stone, 0, 0.4, 0);
        // a long glass hall with a curved timber roof, open at both ends, and stalls inside and out
        add(new T.CylinderGeometry(20, 20, 70, 24, 1, true, 0, Math.PI).rotateZ(Math.PI / 2), S.glass, 0, 1, 0, false);
        for (let i = 0; i <= 7; i++) add(new T.TorusGeometry(20, 0.5, 6, 24, Math.PI).rotateY(Math.PI / 2), S.timber, -35 + i * 10, 1, 0);
        add(new T.BoxGeometry(72, 0.6, 1), S.timber, 0, 21, 0);
        const cols = ['red', 'yellow', 'green', 'orange', 'purple', 'blue'];
        for (let i = 0; i < 6; i++) for (const s of [-1, 1]) {
          const x = -27 + i * 11, z = s * 9;
          add(new T.BoxGeometry(7, 3, 4), S.timber, x, 2.3, z); add(new T.BoxGeometry(7.6, 0.4, 5), C[cols[(i + (s > 0 ? 3 : 0)) % 6]], x, 6.4, z);
          for (let f = 0; f < 4; f++) add(new T.SphereGeometry(0.6, 6, 4), [F.berry, F.flower, F.crops[2], C.orange][(f + i) % 4], x - 2.4 + f * 1.6, 4.2, z, false);
          P.figure(api, add, x, 0.8, z - s * 3.4, (i + s) % 3 ? 1 : 0.6, i * 2 + (s > 0 ? 1 : 0));
        }
        P.sign(api, g, 'HOMEWARD MARKET', 22, 3, 36, 14, 0, Math.PI / 2, '#ffffff', '#3a6a2a', true);
        for (const s of [-1, 1]) for (let i = 0; i < 3; i++) { add(new T.CylinderGeometry(2, 2, 0.2, 12), F.white, -20 + i * 20, 2.4, s * 26); add(new T.ConeGeometry(3, 1.4, 10), C[cols[i * 2]], -20 + i * 20, 5.4, s * 26); add(new T.CylinderGeometry(0.1, 0.1, 4, 4), F.steel, -20 + i * 20, 3.6, s * 26); }
        P.person(g, P.civ(16210), 'walk', 0, 0.8, 0, 0, { path: { type: 'line', ax: -32, az: 0, bx: 32, bz: 0, speed: 1 } });
        P.person(g, P.civ(16211), 'gesture', 5, 0.8, 9 - 3.4, Math.PI);
      } else if (type === 'ALLOTMENT') {
        add(new T.BoxGeometry(220, 0.4, 60), C.grass, 0, 0.2, 0);
        // sixty garden plots in neat rows, each with its own crops, a shed for every ten and water barrels
        for (let r = 0; r < 3; r++) for (let i = 0; i < 20; i++) {
          const x = -100 + i * 10.5, z = -18 + r * 18;
          add(new T.BoxGeometry(9, 0.5, 13), F.soil, x, 0.6, z, false);
          for (let j = 0; j < 3; j++) add(new T.IcosahedronGeometry(1 + ((i + j + r) % 3) * 0.3, 0), F.crops[(i + r * 2 + j) % 5], x, 1.6, z - 4 + j * 4, false);
        }
        for (let i = 0; i < 6; i++) { const x = -90 + i * 36; add(new T.BoxGeometry(5, 4, 4), S.timber, x, 2.4, 27); add(new T.BoxGeometry(5.6, 0.4, 4.8), W.roofs[i % 3], x, 4.6, 27); add(new T.CylinderGeometry(1.2, 1.2, 2.6, 10), S.teal, x + 5, 1.5, 27); }
        for (let i = 0; i < 8; i++) P.figure(api, add, -90 + i * 25, 0.4, -9 + (i % 2) * 18, i % 3 === 2 ? 0.6 : 1, i + k * 8);
        P.person(g, P.civ(16220 + k), 'walk', 0, 0.4, 0, 0, { path: { type: 'line', ax: -100, az: -27, bx: 100, bz: -27, speed: 1 } });
      }
    },
  }));
})();
