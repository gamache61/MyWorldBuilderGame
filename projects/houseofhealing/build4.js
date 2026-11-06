/* ============================================================
   THE HOUSE OF HEALING · BUILD 4 · THE HEALING GARDENS & THE BIRTH HOUSE
   Keep this file in projects/houseofhealing next to houseofhealing.html.
   Two healing gardens where patients sit in the sun beside quiet
   water and herb beds, and the Birth House — a calm round building
   beside a pond, so every baby born on Unity is born in a place made
   for it.
   ============================================================ */
(function () {
  const P = window.HEAL;
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 4, name: 'THE HEALING GARDENS & THE BIRTH HOUSE',
    brief: 'Two healing gardens with quiet water, herb beds and shady seats, and the Birth House beside its pond, where every baby on Unity is born.',
    types: {
      HEALGARDEN: { code: 'GD', name: 'HEALING GARDEN', col: '#3fb04a', w: 120, d: 80, h: 10 },
      BIRTHHOUSE: { code: 'WR', name: 'BIRTH HOUSE', col: '#3f86b0', w: 90, d: 60, h: 18 },
    },
    order: ['HEALGARDEN', 'BIRTHHOUSE'],
    at: { HEALGARDEN: [[-40, -720], [280, -720]], BIRTHHOUSE: [[120, -800]] },
    eye: [-220, 220, 250],
    stats(api, c) { return [['HEALING GARDENS', c('HEALGARDEN') + ' / 2'], ['BIRTH HOUSE', c('BIRTHHOUSE') ? 'OPEN' : 'NOT YET'], ['BIRTH ROOMS', c('BIRTHHOUSE') * 24]]; },
    make(type, k, g, add, F, api) {
      const T = api.THREE, S = P.hm(api), C = P.fun(api);
      if (type === 'HEALGARDEN') {
        add(new T.BoxGeometry(120, 0.4, 80), C.grass, 0, 0.2, 0);
        // a long reflecting pool with stepping stones, herb beds round it and a glass sun room
        add(new T.BoxGeometry(60, 0.6, 14), S.stone, 0, 0.5, 0); add(new T.BoxGeometry(57, 0.4, 11), F.water, 0, 0.8, 0, false);
        for (let i = 0; i < 6; i++) add(new T.CylinderGeometry(1.6, 1.6, 0.6, 10), S.stone, -22 + i * 9, 1, 0);
        for (let r = 0; r < 2; r++) for (let i = 0; i < 5; i++) { const x = -44 + i * 22, z = r ? 24 : -24; add(new T.BoxGeometry(14, 1.2, 6), S.timber, x, 0.8, z); for (let j = 0; j < 4; j++) add(new T.IcosahedronGeometry(1.1, 0), j % 2 ? F.flower : F.crops[(i + j) % 5], x - 5 + j * 3.4, 2, z, false); }
        add(new T.BoxGeometry(22, 8, 14), S.glass, k ? -40 : 40, 4.4, -28, false); add(new T.BoxGeometry(23, 0.6, 15), S.frame, k ? -40 : 40, 8.6, -28);
        for (let i = 0; i < 7; i++) { const a = i / 7 * Math.PI * 2 + k, x = Math.cos(a) * 52, z = Math.sin(a) * 34; add(new T.CylinderGeometry(0.6, 0.8, 6, 6), F.wood, x, 3, z); add(new T.IcosahedronGeometry(4.6, 1), F.crops[(i + k) % 5], x, 8.4, z); }
        for (const [x, z] of [[-24, 12], [0, 12], [24, 12], [-12, -12], [12, -12]]) { add(new T.BoxGeometry(5, 0.5, 1.4), F.wood, x, 1.2, z); P.figure(api, add, x, 1.4, z, 1, x + k); }
        P.person(g, P.civ(17200 + k), 'walk', 0, 0.4, 0, 0, { path: { type: 'rect', x0: -50, x1: 50, z0: -16, z1: 16, speed: 0.8 } });
        P.person(g, P.civ(17210 + k), 'idle', 30, 0.4, -14, 0.5);
      } else if (type === 'BIRTHHOUSE') {
        add(new T.BoxGeometry(90, 0.8, 60), S.stone, 0, 0.4, 0);
        // a round two-storey house of soft colours with a wide roof and a glass ring, beside a lily pond
        add(new T.CylinderGeometry(20, 20, 14, 32), S.cream, -10, 7.8, 0);
        add(new T.CylinderGeometry(20.15, 20.15, 4, 32, 1, true), S.glass, -10, 10, 0, false); add(new T.CylinderGeometry(20.05, 20.05, 3.6, 32, 1, true), S.dim, -10, 10, 0, false);
        add(new T.CylinderGeometry(26, 26, 1.2, 32), F.white, -10, 15.4, 0); add(new T.ConeGeometry(24, 6, 32), S.teal, -10, 19, 0);
        add(new T.SphereGeometry(1.4, 10, 8), S.glow, -10, 22.6, 0, false);
        add(new T.BoxGeometry(10, 6, 0.4), S.glass, -10, 4, 20.2, false);
        P.sign(api, g, 'THE BIRTH HOUSE', 18, 2.4, -10, 12.6, 20.3, 0, '#ffffff', '#2f6a8a', false);
        add(new T.CylinderGeometry(14, 14, 0.6, 28), S.stone, 28, 0.6, 6); add(new T.CylinderGeometry(13, 13, 0.4, 28), F.water, 28, 0.9, 6, false);
        for (let i = 0; i < 7; i++) { const a = i * 0.9; add(new T.CylinderGeometry(1, 1, 0.15, 10), F.crops[0], 28 + Math.cos(a) * 7, 1.15, 6 + Math.sin(a) * 7, false); add(new T.SphereGeometry(0.4, 6, 4), F.flower, 28 + Math.cos(a) * 7, 1.4, 6 + Math.sin(a) * 7, false); }
        for (const x of [12, 44]) { add(new T.CylinderGeometry(0.6, 0.8, 6, 6), F.wood, x, 3.4, -18); add(new T.IcosahedronGeometry(4.4, 1), F.crops[2], x, 8.6, -18); }
        for (let i = 0; i < 4; i++) P.figure(api, add, -18 + i * 4, 0.8, 24, i === 2 ? 0.45 : 1, i + 4);
        P.person(g, P.civ(17220), 'walk', 0, 0.8, 0, 0, { path: { type: 'circle', cx: 28, cz: 6, r: 16, speed: 0.7 } });
      }
    },
  }));
})();
