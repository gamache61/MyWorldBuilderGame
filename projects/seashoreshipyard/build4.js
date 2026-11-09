/* ============================================================
   THE SEASHORE SHIPYARD · BUILD 4 · THE FITTING-OUT QUAY & THE WORKSHOP
   Keep this file in projects/seashoreshipyard next to 42-seashoreshipyard.html.
   A long quay running out into the sea, where new ships are moored
   while their cabins, engines and lights are fitted, with its own
   crane — and the yard workshop and offices on the shore.
   ============================================================ */
(function () {
  const P = window.YARD;
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 4, name: 'THE FITTING-OUT QUAY & THE WORKSHOP',
    brief: 'A long quay out into the sea where new ships are moored while they are fitted out, with its own crane, and the yard workshop and offices on the shore.',
    types: {
      QUAY:     { code: 'SF', name: 'FITTING-OUT QUAY', col: '#6c757d', w: 200, d: 26, h: 30 },
      WORKSHOP: { code: 'SY', name: 'YARD WORKSHOP', col: '#8fe8ff', w: 90, d: 60, h: 18 },
    },
    order: ['QUAY', 'WORKSHOP'],
    at: { QUAY: [[-290, 1210]], WORKSHOP: [[60, 1560]] },
    eye: [-230, 150, 260],
    stats(api, c) { return [['FITTING-OUT QUAY', c('QUAY') ? 'OPEN' : 'NOT YET'], ['WORKSHOP', c('WORKSHOP') ? 'WORKING' : 'NOT YET']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, S = P.hm(api), C = P.fun(api), y0 = sl.y;
      if (type === 'QUAY') {
        // a concrete deck at land level on piles down to the seabed, bollards, a fence and a travelling crane
        const deck = -28.4 - y0;
        add(new T.BoxGeometry(204, 2, 26), S.stone, 0, deck - 1, 0);
        for (let x = -96; x <= 96; x += 16) for (const z of [-10, 10]) { const bed = P.seabed(api, sl.x + x, sl.z + z) - y0, h = deck - 2 - bed; if (h > 1) add(new T.CylinderGeometry(1.2, 1.2, h, 8), S.stone, x, bed + h / 2, z); }
        for (let x = -90; x <= 90; x += 30) for (const z of [-12, 12]) add(new T.CylinderGeometry(0.6, 0.8, 1.2, 8), F.dark, x, deck + 0.6, z);
        for (let x = -98; x <= 98; x += 14) add(new T.SphereGeometry(0.35, 8, 6), F.lamp, x, deck + 4, 12.6, false);
        for (const x of [-30, -16]) for (const z of [-9, 9]) add(new T.BoxGeometry(2, 30, 2), C.yellow, x, deck + 15, z);
        add(new T.BoxGeometry(18, 3, 22), C.yellow, -23, deck + 31, 0); const jib = add(new T.BoxGeometry(46, 2, 2), C.yellow, -23, deck + 34, -22); jib.rotation.y = 0;
        add(new T.BoxGeometry(6, 4, 5), F.dark, -23, deck + 30, -40);
        P.sign(api, g, 'FITTING-OUT QUAY', 20, 2.4, 96, deck + 3, 0, Math.PI / 2, '#14324a', '#ffffff', true);
        P.person(g, P.civ(44000), 'walk', 0, deck, 0, 0, { path: { type: 'line', ax: 90, az: 6, bx: -90, bz: 6, speed: 1 } });
        P.person(g, P.civ(44001), 'tablet', -60, deck, -9, -Math.PI / 2);
      } else if (type === 'WORKSHOP') {
        // a low workshop with a sawtooth roof, the yard office with big windows, and stacks of steel
        add(new T.BoxGeometry(90, 0.8, 60), S.gravel, 0, 0.4, 0);
        add(new T.BoxGeometry(56, 12, 40), S.brick, -10, 6.8, 0);
        for (let i = 0; i < 4; i++) { const t = add(new T.BoxGeometry(14, 6, 40), F.panel, -31 + i * 14, 15.6, 0); t.rotation.z = 0.35; add(new T.BoxGeometry(0.3, 5, 40), S.glass, -25 + i * 14, 15, 0, false); }
        add(new T.BoxGeometry(22, 16, 22), F.white, 30, 8.8, 4); add(new T.BoxGeometry(22.4, 5, 22.4), S.glass, 30, 11, 4, false); add(new T.BoxGeometry(20, 0.6, 20), S.roofGreen, 30, 17, 4);
        for (const [x, z] of [[24, -22], [34, -22]]) for (let j = 0; j < 4; j++) add(new T.BoxGeometry(7, 0.8, 3), F.steel, x, 1.2 + j * 0.9, z);
        P.sign(api, g, 'YARD OFFICE', 14, 2.2, 30, 14, 15.3, 0, '#14324a', '#80d8ff', false);
        P.person(g, P.civ(44010), 'gesture', 18, 0.8, 18, 0); P.person(g, P.civ(44011), 'walk', 0, 0.8, 0, 0, { path: { type: 'line', ax: -40, az: 26, bx: 40, bz: 26, speed: 1.1 } });
      }
    },
  }));
})();
