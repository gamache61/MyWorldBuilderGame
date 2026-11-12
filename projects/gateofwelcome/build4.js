/* ============================================================
   THE GATE OF WELCOME · BUILD 4 · THE QUIET ROOM & THE FOOD HALLS
   Keep this file in projects/gateofwelcome next to 61-gateofwelcome.html.
   A round quiet room with one table in the middle, and two food halls where every guest is fed first.
   ============================================================ */
(function () {
  const P = window.GATE;
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 4, name: 'THE QUIET ROOM & THE FOOD HALLS',
    brief: 'A round, quiet room with one table in the middle, where nobody is hurried and the doors open both ways, and two food halls where every guest is fed first.',
    types: {
      QUIETROOM: { code: 'SY', name: 'QUIET ROOM', col: '#d8c8f0', w: 70, d: 70, h: 28 },
      FOODHALL: { code: 'SY', name: 'FOOD HALL', col: '#f0b070', w: 90, d: 60, h: 24 },
    },
    order: ['QUIETROOM', 'FOODHALL'],
    at: { QUIETROOM: [[1550, -90]], FOODHALL: [[1380, -110], [1720, -110]] },
    eye: [1020, 200, 330],
    stats(api, c) { return [['QUIET ROOM', c('QUIETROOM') ? 'OPEN' : 'NOT YET'], ['FOOD HALLS', c('FOODHALL') + ' / 2']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, S = P.hm(api), C = P.fun(api);
      if (type === 'QUIETROOM') {
        add(new T.BoxGeometry(72, 1, 72), S.gravel, 0, 0.5, 0);
        add(new T.CylinderGeometry(28, 30, 18, 28), new T.MeshStandardMaterial({ color: 0xd8c8f0, roughness: 0.7 }), 0, 10, 0);
        add(new T.SphereGeometry(27, 28, 12, 0, Math.PI * 2, 0, Math.PI / 2), S.glass, 0, 19, 0).castShadow = false;
        for (let i = 0; i < 8; i++) { const r = add(new T.TorusGeometry(27, 0.4, 6, 24, Math.PI), F.steel, 0, 19, 0); r.rotation.y = i / 8 * Math.PI; r.castShadow = false; }
        for (let i = 0; i < 4; i++) { const a = i * Math.PI / 2 + Math.PI / 4; add(new T.BoxGeometry(2, 9, 6), F.dark, Math.cos(a) * 29, 7, Math.sin(a) * 29).rotation.y = -a; }
        add(new T.CylinderGeometry(7, 7, 1.2, 20), F.wood, 0, 2, 0); add(new T.CylinderGeometry(1, 1, 2, 8), F.wood, 0, 1.2, 0);
        for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2; add(new T.BoxGeometry(2.4, 1.2, 2.4), F.wood, Math.cos(a) * 11, 1.4, Math.sin(a) * 11); }
        add(new T.SphereGeometry(1.6, 10, 8), F.lamp, 0, 4, 0).castShadow = false;
        P.sign(api, g, 'THE QUIET ROOM · ONE TABLE · NO HURRY', 44, 3.2, 0, 10, 33, 0, '#2a2418', '#e8d8ff', true);
        for (let i = 0; i < 3; i++) P.person(g, P.civ(61300 + i), 'idle', -6 + i * 6, 1.2, 38, 0);
      } else {
        add(new T.BoxGeometry(92, 1, 62), S.gravel, 0, 0.5, 0);
        add(new T.BoxGeometry(84, 14, 54), new T.MeshStandardMaterial({ color: 0xf0b070, roughness: 0.8 }), 0, 8, 0);
        add(new T.BoxGeometry(90, 2, 60), S.slate, 0, 16, 0);
        for (let i = 0; i < 4; i++) add(new T.CylinderGeometry(1.6, 1.6, 10, 8), F.steel, -30 + i * 20, 22, -10);
        for (let x = -34; x <= 34; x += 11) add(new T.BoxGeometry(6, 8, 0.5), S.glass, x, 9, 27.4);
        add(new T.BoxGeometry(14, 10, 1), F.dark, 0, 6, 27.4);
        for (let i = 0; i < 3; i++) { add(new T.BoxGeometry(24, 0.8, 5), F.wood, -28 + i * 28, 1.6, 38); }
        P.sign(api, g, 'THE FOOD HALL · EVERYONE EATS FIRST', 50, 3.2, 0, 14, 28, 0, '#3a2410', '#ffe9b0', true);
        for (let i = 0; i < 3; i++) P.person(g, i % 2 ? P.kid(61400 + k * 4 + i) : P.civ(61400 + k * 4 + i), i % 2 ? 'idle' : 'tablet', -16 + i * 16, 1.1, 42, 0);
      }
    },
  }));
})();
