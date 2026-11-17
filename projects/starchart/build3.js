/* ============================================================
   THE STAR CHART HOUSE · BUILD 3 · THE ROUND HOUSE & THE READING WINGS
   Keep this file in projects/starchart next to 79-starchart.html.
   The great round house of the star charts with its copper dome, and two reading wings.
   ============================================================ */
(function () {
  const P = window.PWP;
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 3, name: 'THE ROUND HOUSE & THE READING WINGS',
    brief: 'The great round Star Chart House with a green copper dome and a ring of tall windows, and two long reading wings where the charts are read and copied.',
    types: {
      HOUSE: { code: 'FB', name: 'THE ROUND HOUSE', col: '#cfd2da', w: 100, d: 100, h: 44 },
      WING:  { code: 'FB', name: 'READING WING',    col: '#9aa0b0', w: 70, d: 36, h: 18 },
    },
    order: ['HOUSE', 'WING'],
    at: { HOUSE: [[1550 + 2400 + 0, 1250 + -20]], WING: [[1550 + 2400 + -110, 1250 + -20], [1550 + 2400 + 110, 1250 + -20]] },
    eye: [1550 + 2400 + 0, (window.__STAR.Y || -85) + 200, 1250 + 380],
    stats(api, c) { return [['THE ROUND HOUSE', c('HOUSE') ? 'BUILT' : 'NOT YET'], ['READING WINGS', c('WING') + ' / 2']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, H = P.pw(api), S = P.sc(api);
      if (type === 'HOUSE') {
        add(new T.CylinderGeometry(50, 52, 2, 40), S.stone2, 0, 1, 0);
        add(new T.CylinderGeometry(44, 44, 26, 40), S.stone, 0, 15, 0);
        for (let i = 0; i < 16; i++) { const a = i / 16 * Math.PI * 2; add(new T.BoxGeometry(4, 16, 1), H.win, Math.cos(a) * 44.2, 17, Math.sin(a) * 44.2, false).rotation.y = -a + Math.PI / 2; add(new T.BoxGeometry(1.6, 28, 1.6), S.navy2, Math.cos(a + 0.2) * 44.6, 15, Math.sin(a + 0.2) * 44.6, false); }
        add(new T.CylinderGeometry(46, 46, 2, 40), S.navy, 0, 29, 0);
        add(new T.SphereGeometry(40, 32, 12, 0, Math.PI * 2, 0, Math.PI / 2), S.copper, 0, 30, 0);
        for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI; add(new T.TorusGeometry(40.2, 0.5, 4, 32, Math.PI), S.brass, 0, 30, 0, false).rotation.y = a; }
        add(new T.CylinderGeometry(1, 1.6, 8, 8), S.brass, 0, 74, 0, false); add(new T.SphereGeometry(2.4, 10, 8), S.star, 0, 79, 0, false);
        add(new T.BoxGeometry(18, 14, 4), S.dark, 0, 9, 52, false);
        P.sign(api, g, 'STAR CHART HOUSE', 36, 4, 0, 24, 54, 0, '#14182e', '#ffe9a8');
        for (let i = 0; i < 6; i++) P.person(g, P.civ(79020 + i), 'idle', -10 + i * 4, 2.2, 60 + (i % 2) * 4, 0);
      } else if (type === 'WING') {
        add(new T.BoxGeometry(70, 2, 36), S.stone2, 0, 1, 0);
        add(new T.BoxGeometry(66, 14, 32), S.stone, 0, 9, 0);
        add(new T.BoxGeometry(68, 1.4, 34), S.navy, 0, 16.7, 0);
        for (let i = 0; i < 7; i++) add(new T.BoxGeometry(5, 7, 0.4), H.win, -27 + i * 9, 10, 16.2, false);
        P.person(g, P.civ(79030 + k), 'idle', 0, 2.2, 22, 0);
      }
    },
  }));
})();
