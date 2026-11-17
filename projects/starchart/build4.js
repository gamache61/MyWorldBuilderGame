/* ============================================================
   THE STAR CHART HOUSE · BUILD 4 · THE STAR THEATRE, THE MAP TABLES & THE DISHES
   Keep this file in projects/starchart next to 79-starchart.html.
   A domed star theatre for the schools, four glowing map tables in the courtyard and two dishes that hear the scouts.
   ============================================================ */
(function () {
  const P = window.PWP;
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 4, name: 'THE STAR THEATRE, THE MAP TABLES & THE DISHES',
    brief: 'A white domed star theatre where the schools watch the sky, four glowing map tables in the courtyard where the scouts\' charts are laid out, and two dishes that hear the scouts from far away.',
    types: {
      THEATRE: { code: 'FB', name: 'STAR THEATRE', col: '#f4f6f8', w: 60, d: 60, h: 28 },
      TABLE:   { code: 'HM', name: 'MAP TABLE',    col: '#7fb8ff', w: 18, d: 12, h: 5 },
      DISH:    { code: 'HP', name: 'LISTENING DISH', col: '#d8dce4', w: 22, d: 22, h: 24 },
    },
    order: ['THEATRE', 'TABLE', 'DISH'],
    at: { THEATRE: [[1550 + 2400 + 0, 1250 + -150]], TABLE: [[1550 + 2400 + -50, 1250 + 70], [1550 + 2400 + 50, 1250 + 70], [1550 + 2400 + -50, 1250 + 110], [1550 + 2400 + 50, 1250 + 110]], DISH: [[1550 + 2400 + -180, 1250 + -130], [1550 + 2400 + 180, 1250 + -130]] },
    eye: [1550 + 2400 + 0, (window.__STAR.Y || -85) + 200, 1250 + 380],
    stats(api, c) { return [['STAR THEATRE', c('THEATRE') ? 'OPEN' : 'NOT YET'], ['MAP TABLES', c('TABLE') + ' / 4'], ['LISTENING DISHES', c('DISH') + ' / 2']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, H = P.pw(api), S = P.sc(api);
      if (type === 'THEATRE') {
        add(new T.CylinderGeometry(30, 32, 2, 28), S.stone2, 0, 1, 0);
        add(new T.CylinderGeometry(27, 27, 8, 28), S.stone, 0, 6, 0);
        add(new T.SphereGeometry(27, 28, 12, 0, Math.PI * 2, 0, Math.PI / 2), S.white, 0, 10, 0);
        add(new T.BoxGeometry(3, 20, 14), S.dark, 0, 24, 12, false).rotation.x = -0.4;
        add(new T.BoxGeometry(14, 10, 1), S.dark, 0, 6, 27.2, false);
        P.sign(api, g, 'STAR THEATRE', 20, 2.6, 0, 12, 27.6, 0, '#14182e', '#ffe9a8');
        for (let i = 0; i < 4; i++) P.person(g, P.civ(79040 + i), 'idle', -6 + i * 4, 2, 34, 0);
      } else if (type === 'TABLE') {
        add(new T.CylinderGeometry(0.6, 0.9, 3, 8), S.stone2, 0, 1.5, 0, false);
        add(new T.BoxGeometry(18, 1.2, 12), S.brass, 0, 3.4, 0);
        add(new T.BoxGeometry(16.4, 0.2, 10.4), S.glow, 0, 4.1, 0, false);
        for (let i = 0; i < 16; i++) add(new T.SphereGeometry(0.25, 5, 4), S.star, -7 + ((i * 37) % 15), 4.6 + (i % 3) * 0.5, -4 + ((i * 53) % 9), false);
        P.person(g, P.civ(79050 + k), 'idle', 0, 0.5, 8, Math.PI);
      } else if (type === 'DISH') {
        add(new T.CylinderGeometry(3, 4, 12, 10), S.stone2, 0, 6, 0);
        const d = add(new T.SphereGeometry(11, 20, 10, 0, Math.PI * 2, 0, 1.0), H.white, 0, 15, 0); d.rotation.x = -1.0; d.scale.set(1, 1, 1); d.material = H.white;
        add(new T.CylinderGeometry(0.3, 0.3, 9, 6), S.brass, 0, 19, -6, false).rotation.x = 0.8;
        add(new T.SphereGeometry(0.9, 8, 6), S.star, 0, 23, -9, false);
      }
    },
  }));
})();
