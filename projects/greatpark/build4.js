/* ============================================================
   THE GREAT PARK OF UNITY · BUILD 4 · THE TREE WALKS, THE GROVES & THE BOATS
   Keep this file in projects/greatpark next to 78-greatpark.html.
   Rows of tall trees along the paths, picnic groves, a bandstand and three little boats on the lake.
   ============================================================ */
(function () {
  const P = window.PWP;
  P.parkTree = function (api, add, M, k, s) {
    const T = api.THREE;
    add(new T.CylinderGeometry(0.7 * s, 1 * s, 8 * s, 7), M.trunk, 0, 4 * s, 0, false);
    add(new T.SphereGeometry(5 * s, 10, 8), k % 2 ? M.leaf : M.leaf2, 0, 10 * s, 0).scale.set(1, 1.1, 1);
    add(new T.SphereGeometry(3.6 * s, 9, 7), k % 2 ? M.leaf2 : M.leaf, 2.2 * s, 8 * s, 1 * s, false);
  };
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 4, name: 'THE TREE WALKS, THE GROVES & THE BOATS',
    brief: 'Two tree walks of tall green trees along the paths, four picnic groves with tables, a bandstand in the middle of the park and three little boats on the lake.',
    types: {
      WALK:    { code: 'HP', name: 'TREE WALK',    col: '#3f8a3a', w: 14, d: 320, h: 14 },
      PICNIC:  { code: 'HM', name: 'PICNIC GROVE', col: '#d84a4a', w: 40, d: 40,  h: 14 },
      BANDSTAND: { code: 'FB', name: 'BANDSTAND', col: '#e4dcc8', w: 36, d: 30, h: 18 },
      BOAT:    { code: 'HM', name: 'LAKE BOAT',    col: '#f4f6f8', w: 10, d: 5, h: 4 },
    },
    order: ['WALK', 'PICNIC', 'BANDSTAND', 'BOAT'],
    at: {
      WALK: [[1550 + 1600 + -60, 1200 + 110], [1550 + 1600 + 60, 1200 + 110]],
      PICNIC: [[1550 + 1600 + -130, 1200 + 230], [1550 + 1600 + 130, 1200 + 230], [1550 + 1600 + -130, 1200 + 50], [1550 + 1600 + 130, 1200 + 50]],
      BANDSTAND: [[1550 + 1600 + 0, 1200 + 150]],
      BOAT: [[1550 + 1600 + -50, 1200 + -130], [1550 + 1600 + 10, 1200 + -110], [1550 + 1600 + 60, 1200 + -150]],
    },
    eye: [1550 + 1600 + 0, (window.__PARK.Y || -85) + 220, 1200 + 420],
    stats(api, c) { return [['TREE WALKS', c('WALK') + ' / 2'], ['PICNIC GROVES', c('PICNIC') + ' / 4'], ['BANDSTAND', c('BANDSTAND') ? 'BUILT' : 'NOT YET'], ['LAKE BOATS', c('BOAT') + ' / 3']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, M = P.park(api);
      if (type === 'WALK') {
        for (let z = -150; z <= 150; z += 25) { const t = new T.Group(); t.position.set(0, 0, z); g.add(t); P.parkTree(api, (a, b, x, y, zz, sh = true) => add(a, b, x, y, zz, sh, t), M, (z / 25 | 0) + k, 0.9); }
      } else if (type === 'PICNIC') {
        P.parkTree(api, add, M, k, 1.2);
        for (const [x, z] of [[-12, 8], [12, -8], [10, 12]]) { add(new T.BoxGeometry(6, 0.5, 3), M.wood, x, 2.2, z, false); add(new T.BoxGeometry(0.5, 2, 2.6), M.trunk, x - 2, 1.1, z, false); add(new T.BoxGeometry(0.5, 2, 2.6), M.trunk, x + 2, 1.1, z, false); }
        add(new T.BoxGeometry(8, 0.1, 8), M.cloth, -12, 0.2, 8, false);
        P.person(g, P.civ(78030 + k), 'idle', -8, 0.5, 10, 1);
      } else if (type === 'BANDSTAND') {
        add(new T.CylinderGeometry(14, 15, 1.6, 8), M.stone2, 0, 0.8, 0);
        for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2; add(new T.CylinderGeometry(0.45, 0.45, 10, 6), M.white, Math.cos(a) * 12, 6.6, Math.sin(a) * 12, false); }
        add(new T.ConeGeometry(15.5, 5, 8), M.cloth, 0, 14.6, 0);
        add(new T.SphereGeometry(0.8, 8, 6), M.bloom[1], 0, 17.6, 0, false);
        for (let i = 0; i < 4; i++) P.person(g, P.civ(78040 + i), 'idle', -6 + i * 4, 1.6, -2, 0);
      } else if (type === 'BOAT') {
        add(new T.CylinderGeometry(2.4, 1.6, 8, 8).rotateZ(Math.PI / 2).scale(1, 0.5, 1), M.white, 0, 2.2, 0);
        add(new T.BoxGeometry(0.2, 5, 0.2), M.trunk, 0, 5, 0, false); add(new T.BoxGeometry(0.1, 4, 3), M.cloth, 0, 5.4, 1.4, false);
      }
    },
  }));
})();
