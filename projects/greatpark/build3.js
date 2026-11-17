/* ============================================================
   THE GREAT PARK OF UNITY · BUILD 3 · THE LAWNS & THE LAKE
   Keep this file in projects/greatpark next to 78-greatpark.html.
   Four wide lawns and a great lake with a sandy beach, so the park has green and water.
   ============================================================ */
(function () {
  const P = window.PWP;
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 3, name: 'THE LAWNS & THE LAKE',
    brief: 'Four wide green lawns either side of the paths and a great lake at the north end, with a sandy beach and a little wooden jetty.',
    types: {
      LAWN: { code: 'SF', name: 'GREEN LAWN', col: '#6fae48', w: 150, d: 120, h: 1 },
      LAKE: { code: 'SF', name: 'THE LAKE', col: '#3f98c8', w: 300, d: 160, h: 1 },
      JETTY: { code: 'SY', name: 'THE JETTY', col: '#8a6038', w: 14, d: 50, h: 4 },
    },
    order: ['LAWN', 'LAKE', 'JETTY'],
    at: {
      LAWN: [[1550 + 1600 + -110, 1200 + 230], [1550 + 1600 + 110, 1200 + 230], [1550 + 1600 + -110, 1200 + 60], [1550 + 1600 + 110, 1200 + 60]],
      LAKE: [[1550 + 1600 + 0, 1200 + -130]], JETTY: [[1550 + 1600 + 0, 1200 + -60]],
    },
    eye: [1550 + 1600 + 0, (window.__PARK.Y || -85) + 220, 1200 + 420],
    stats(api, c) { return [['GREEN LAWNS', c('LAWN') + ' / 4'], ['THE LAKE', c('LAKE') ? 'FILLED' : 'NOT YET'], ['THE JETTY', c('JETTY') ? 'BUILT' : 'NOT YET']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, M = P.park(api);
      if (type === 'LAWN') {
        add(new T.BoxGeometry(150, 2, 120), k % 2 ? M.grass : M.grass2, 0, 1, 0, false);
        for (let i = 0; i < 6; i++) add(new T.BoxGeometry(150, 0.05, 6), i % 2 ? M.grass : M.grass2, 0, 2.04, -50 + i * 20, false);
      } else if (type === 'LAKE') {
        add(new T.CylinderGeometry(150, 156, 2.2, 40).scale(1, 1, 0.55), M.sand, 0, 1.1, 0, false);
        add(new T.CylinderGeometry(140, 140, 1, 40).scale(1, 1, 0.5), M.water, 0, 2.4, 0, false);
      } else if (type === 'JETTY') {
        add(new T.BoxGeometry(8, 1, 50), M.wood, 0, 2.4, 0);
        for (let z = -22; z <= 22; z += 11) for (const s of [-1, 1]) add(new T.CylinderGeometry(0.4, 0.4, 4, 6), M.trunk, s * 4, 1.2, z, false);
      }
    },
  }));
})();
