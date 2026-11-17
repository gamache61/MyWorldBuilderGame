/* ============================================================
   THE SUN FIELDS · BUILD 4 · THE POWER HALL & THE BATTERY HOUSES
   Keep this file in projects/sunfields next to 75-sunfields.html.
   A power hall with humming transformers and two battery houses that keep the sun's power for the night.
   ============================================================ */
(function () {
  const P = window.PWP;
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 4, name: 'THE POWER HALL & THE BATTERY HOUSES',
    brief: 'A power hall with humming transformers where the sun\'s power is gathered, and two battery houses with rows of cells that keep the power for the night.',
    types: {
      HALL:    { code: 'FB', name: 'POWER HALL',    col: '#d7dade', w: 90, d: 50, h: 26 },
      BATTERY: { code: 'FB', name: 'BATTERY HOUSE', col: '#3f9a5a', w: 60, d: 36, h: 14 },
    },
    order: ['HALL', 'BATTERY'],
    at: { HALL: [[1550 + 1620, -910]], BATTERY: [[1550 + 1800, -910], [1550 + 1880, -910]] },
    eye: [1550 + 1810, (window.__SUNF.Y || -85) + 200, -1060],
    stats(api, c) { return [['POWER HALL', c('HALL') ? 'HUMMING' : 'NOT YET'], ['BATTERY HOUSES', c('BATTERY') + ' / 2']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, H = P.pw(api);
      if (type === 'HALL') {
        add(new T.BoxGeometry(90, 1, 50), H.conc2, 0, 0.5, 0);
        add(new T.BoxGeometry(86, 20, 46), H.wall, 0, 11, 0);
        add(new T.BoxGeometry(88, 1.4, 48), H.roof, 0, 21.7, 0);
        for (let i = 0; i < 4; i++) add(new T.BoxGeometry(14, 4, 0.4), H.win, -30 + i * 20, 15, 23.2, false);
        for (let i = 0; i < 5; i++) { add(new T.CylinderGeometry(2.6, 2.6, 6, 12), H.steel2, -34 + i * 17, 25, -6); add(new T.CylinderGeometry(2.2, 2.2, 0.5, 12), H.cool, -34 + i * 17, 28.3, -6, false); }
        for (const x of [-30, 0, 30]) { add(new T.BoxGeometry(8, 7, 6), H.yellow, x, 4, -30); for (let j = 0; j < 4; j++) add(new T.CylinderGeometry(0.5, 0.5, 4, 6), H.steel, x - 3 + j * 2, 9.5, -30, false); }
        P.sign(api, g, 'THE POWER HALL', 40, 4, 0, 16, 23.4, 0, '#14242e', '#ffe08a');
        P.person(g, P.civ(75020), 'tablet', 20, 0.5, 30, 0);
      } else if (type === 'BATTERY') {
        add(new T.BoxGeometry(60, 1, 36), H.conc2, 0, 0.5, 0);
        add(new T.BoxGeometry(56, 11, 32), H.wall2, 0, 6.5, 0);
        add(new T.BoxGeometry(58, 1, 34), H.roof, 0, 12.5, 0);
        for (let i = 0; i < 8; i++) { add(new T.BoxGeometry(5, 7, 0.4), H.green, -24.5 + i * 7, 6, 16.2, false); add(new T.BoxGeometry(5, 0.8, 0.5), H.cool, -24.5 + i * 7, 10.2, 16.3, false); }
        add(new T.BoxGeometry(8, 1.2, 4), H.hazard, 0, 1.4, 20, false);
        P.sign(api, g, 'BATTERY HOUSE ' + ['ONE', 'TWO'][k], 30, 2.6, 0, 11.6, 16.4, 0, '#14242e', '#bff8d0');
      }
    },
  }));
})();
