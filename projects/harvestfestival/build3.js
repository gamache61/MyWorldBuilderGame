/* ============================================================
   THE HARVEST FESTIVAL GROUNDS · BUILD 3 · THE MARKET STALLS & THE FOOD TENTS
   Keep this file in projects/harvestfestival next to 67-harvestfestival.html.
   Twelve striped market stalls along the promenade and four big food tents with long tables.
   ============================================================ */
(function () {
  const P = window.HFG;
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 3, name: 'THE MARKET STALLS & THE FOOD TENTS',
    brief: 'Twelve striped market stalls stand along both sides of the promenade, piled with fruit, honey and bread, and four big food tents wait with long tables and benches.',
    types: {
      STALL: { code: 'HM', name: 'MARKET STALL', col: '#d9302a', w: 14, d: 8,  h: 6 },
      TENT:  { code: 'HM', name: 'FOOD TENT',    col: '#f1e3c6', w: 34, d: 22, h: 11 },
    },
    order: ['STALL', 'TENT'],
    at: {
      STALL: [-230, -180, -130, -80, -30, 20].flatMap(x => [[1550 + x, -17], [1550 + x, 17]]),
      TENT: [[-170, -100], [-70, -100], [-170, 100], [-70, 100]].map(([x, z]) => [1550 + x, z]),
    },
    eye: [1550 - 80, P.SY + 110, 220],
    stats(api, c) { return [['MARKET STALLS', c('STALL') + ' / 12'], ['FOOD TENTS', c('TENT') + ' / 4']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, H = P.hf(api);
      if (type === 'STALL') {
        const front = (k % 2) ? -1 : 1; // opens toward the promenade
        const aw = H.awn[k % 6];
        for (const x of [-6.4, 6.4]) for (const z of [-3.4, 3.4]) add(new T.BoxGeometry(0.3, 5.6, 0.3), H.timber2, x, 2.8, z, false);
        const roof = add(new T.BoxGeometry(14.6, 0.2, 8.6), aw, 0, 5.9, 0, true); roof.rotation.x = front * 0.12;
        for (let i = -6; i <= 6; i += 2) add(new T.BoxGeometry(1, 0.22, 8.7), H.white, i + 0.5, 6.0, 0, false).rotation.x = front * 0.12;
        add(new T.BoxGeometry(13, 1.2, 2.2), H.timber, 0, 1.0, -front * 3.2, false); add(new T.BoxGeometry(13.4, 0.2, 2.8), H.timber2, 0, 1.7, front * 1.2, false);
        for (let i = 0; i < 9; i++) add(new T.SphereGeometry(0.5, 6, 5), [H.red, H.gold, H.pumpkin][(i + k) % 3], -5.6 + i * 1.4, 2.1, front * 1.2, false);
        P.sign(api, g, ['APPLES', 'HONEY', 'BREAD', 'PEARS', 'CIDER', 'JAM', 'PLUMS', 'CHEESE', 'PIES', 'SEEDS', 'CHERRIES', 'FLOWERS'][k % 12], 7, 1.2, 0, 7.4, front * 4.4, front > 0 ? 0 : Math.PI, '#3a2410', '#fff0c0', false);
        P.person(g, P.civ(67100 + k), 'idle', 0, 0.4, -front * 2.2, front > 0 ? 0 : Math.PI);
      } else if (type === 'TENT') {
        add(new T.BoxGeometry(34, 0.3, 22), H.floor, 0, 0.15, 0, false);
        for (const x of [-15, 15]) for (const z of [-9, 9]) add(new T.CylinderGeometry(0.25, 0.25, 7, 6), H.timber2, x, 3.5, z, false);
        const rf = add(new T.CylinderGeometry(11.4, 11.4, 34, 3, 1, false, Math.PI / 2).rotateZ(Math.PI / 2), H.white, 0, 7.4 + 0.3, 0, true); rf.scale.y = 0.38;
        for (let i = -7; i <= 7; i += 2) add(new T.BoxGeometry(1, 0.1, 22.6), H.awn[(i + 7 + k) % 6], i * 2.2, 7.9 - Math.abs(i) * 0.0, 0, false);
        for (const z of [-4, 0, 4]) { add(new T.BoxGeometry(26, 0.18, 1.6), H.timber, 0, 1.7, z, false); for (const dz of [-1.5, 1.5]) add(new T.BoxGeometry(26, 0.12, 0.7), H.timber2, 0, 1.0, z + dz, false); }
        for (let i = 0; i < 14; i++) add(new T.SphereGeometry(0.4, 6, 5), [H.red, H.gold, H.pumpkin][i % 3], -11 + i * 1.7, 2.0, (i % 3 - 1) * 4, false);
        for (let i = -4; i <= 4; i++) add(new T.SphereGeometry(0.25, 6, 5), i % 2 ? H.lamp : H.glowA, i * 3.2, 8.1, 0, false);
        P.person(g, P.civ(67200 + k), 'idle', -6, 0.4, 7, Math.PI); P.person(g, P.civ(67210 + k), 'idle', 6, 0.4, 7, Math.PI);
      }
    },
  }));
})();
