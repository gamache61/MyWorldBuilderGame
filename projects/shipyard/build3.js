/* ============================================================
   THE UNITY SHIPYARD · BUILD 3 · THE BUILDING SLIPS & THE GANTRY CRANES
   Keep this file in projects/shipyard next to 74-shipyard.html.
   Three long building slips with steel rails and a tall gantry crane straddling each one.
   ============================================================ */
(function () {
  const P = window.PWP;
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 3, name: 'THE BUILDING SLIPS & THE GANTRY CRANES',
    brief: 'Three long building slips where whole ships will be built, each with steel rails, and a tall gantry crane that straddles it and lifts the heavy parts into place.',
    types: {
      SLIP:   { code: 'SF', name: 'BUILDING SLIP', col: '#6c7580', w: 60, d: 200, h: 3 },
      GANTRY: { code: 'HM', name: 'GANTRY CRANE',  col: '#f2c41a', w: 80, d: 12,  h: 60 },
    },
    order: ['SLIP', 'GANTRY'],
    at: {
      SLIP: [[1550 - 100, 530], [1550 + 60, 530], [1550 + 220, 530]],
      GANTRY: [[1550 - 100, 530], [1550 + 60, 530], [1550 + 220, 530]],
    },
    eye: [1550 + 60, P.SY + 200, 250],
    stats(api, c) { return [['BUILDING SLIPS', c('SLIP') + ' / 3'], ['GANTRY CRANES', c('GANTRY') + ' / 3']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, H = P.pw(api);
      if (type === 'SLIP') {
        add(new T.BoxGeometry(60, 1, 200), H.conc2, 0, 0.5, 0);
        add(new T.BoxGeometry(44, 0.5, 190), H.dark, 0, 1.2, 0, false);
        for (const s of [-1, 1]) { add(new T.BoxGeometry(1.4, 1.2, 196), H.steel, s * 19, 1.7, 0, false); add(new T.BoxGeometry(1.4, 1.2, 196), H.steel, s * 27, 1.7, 0, false); }
        for (let z = -90; z <= 90; z += 6) add(new T.BoxGeometry(46, 0.3, 0.8), H.steel2, 0, 1.5, z, false);
        for (const s of [-1, 1]) add(new T.BoxGeometry(0.8, 0.5, 200), H.hazard, s * 30.4, 1.0, 0, false);
      } else if (type === 'GANTRY') {
        for (const x of [-34, 34]) for (const z of [-5, 5]) add(new T.BoxGeometry(2.6, 52, 2.6), H.yellow, x, 26, z);
        add(new T.BoxGeometry(72, 3.4, 8), H.yellow, 0, 52, 0);
        add(new T.BoxGeometry(72, 0.8, 8.4), H.dark, 0, 54.3, 0, false);
        for (const x of [-34, 34]) add(new T.BoxGeometry(5, 1.6, 14), H.dark, x, 1.2, 0);
        add(new T.BoxGeometry(6, 3, 6), H.orange, 8, 49, 0);
        add(new T.BoxGeometry(0.5, 40, 0.5), H.steel, 8, 28, 0, false); add(new T.BoxGeometry(5, 1.2, 3), H.hazard, 8, 8, 0, false);
        add(new T.BoxGeometry(2.4, 2.4, 2.4), H.cool, 0, 56, 0, false);
        P.person(g, P.civ(74020 + k), 'idle', 40, 0.5, 6, Math.PI / 2);
      }
    },
  }));
})();
