/* ============================================================
   THE GATE OF WELCOME · BUILD 2 · THE GREAT GATE
   Keep this file in projects/gateofwelcome next to 61-gateofwelcome.html.
   A great arched gate at the north-east edge of Kryos, with two towers, glowing doors and a lamp that is always lit.
   ============================================================ */
(function () {
  const P = window.GATE;
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 2, name: 'THE GREAT GATE',
    brief: 'A great arched gate at the edge of Kryos: two stone towers, tall doors that open both ways, and a lamp that is always lit.',
    types: { GATE: { code: 'SY', name: 'GREAT GATE', col: '#e8e1d1', w: 170, d: 40, h: 62 } },
    order: ['GATE'],
    at: { GATE: [[1550, 170]] },
    eye: [1000, 210, 400],
    stats(api, c) { return [['THE GREAT GATE', c('GATE') ? 'OPEN' : 'NOT YET'], ['DOORS THAT OPEN BOTH WAYS', c('GATE') ? '2' : '0']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, S = P.hm(api), C = P.fun(api);
      add(new T.BoxGeometry(176, 1.4, 46), S.gravel, 0, 0.7, 0);
      for (const sx of [-1, 1]) {
        const x = sx * 68;
        add(new T.BoxGeometry(34, 54, 30), S.stone, x, 28, 0);
        add(new T.BoxGeometry(38, 3, 34), S.slate, x, 56.5, 0);
        add(new T.ConeGeometry(15, 16, 4).rotateY(Math.PI / 4), S.copper, x, 66, 0);
        for (let i = 0; i < 3; i++) add(new T.BoxGeometry(3, 8, 0.5), S.warm, x - 8 + i * 8, 40, 15.3).castShadow = false;
        add(new T.CylinderGeometry(0.4, 0.4, 12, 6), F.steel, x, 80, 0); add(new T.SphereGeometry(2, 10, 8), F.lamp, x, 87, 0).castShadow = false;
      }
      add(new T.BoxGeometry(104, 14, 30), S.stone, 0, 47, 0);
      const arch = add(new T.CylinderGeometry(30, 30, 30, 28, 1, false, 0, Math.PI).rotateX(Math.PI / 2).rotateZ(Math.PI / 2), S.dark, 0, 18, 0); arch.castShadow = false;
      add(new T.BoxGeometry(60, 36, 0.8), S.glow, 0, 20, 0.3).castShadow = false;
      for (const sx of [-1, 1]) add(new T.BoxGeometry(29, 34, 2), F.dark, sx * 15, 19, 12);
      add(new T.BoxGeometry(1, 30, 2.4), F.gold, 0, 19, 12.2);
      add(new T.CylinderGeometry(1.2, 1.2, 10, 8), F.steel, 0, 60, 0); add(new T.SphereGeometry(3, 12, 10), F.lamp, 0, 67, 0).castShadow = false;
      add(new T.BoxGeometry(104, 2, 36), S.stone, 0, 55, 0);
      P.sign(api, g, 'THE GATE OF WELCOME', 66, 6, 0, 50, 15.6, 0, '#14324a', '#ffe08a', true);
      P.sign(api, g, 'COME IN · SIT DOWN · BE HEARD', 60, 3, 0, 40, 15.8, 0, '#14324a', '#e8e1d1', true);
      for (let i = 0; i < 5; i++) P.person(g, i % 2 ? P.kid(61100 + i) : P.civ(61100 + i), i % 2 ? 'idle' : 'tablet', -24 + i * 12, 1.4, 26, 0);
      for (let i = 0; i < 4; i++) P.figure(api, add, -50 + i * 33, 1.4, 32, 0.7, i, g);
    },
  }));
})();
