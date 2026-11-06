/* ============================================================
   THE ORE RUN · BUILD 4 · THE FREIGHTERS & THE CREW HALL
   Keep this file in projects/orerun next to orerun.html.
   Four small ore freighters, one on each pad, built here from
   Unity-made parts, and the Crew Hall where the freighter crews from
   Vesh rest between runs.
   ============================================================ */
(function () {
  const P = window.ORE;
  P.ships = P.ships || [];
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 4, name: 'THE FREIGHTERS & THE CREW HALL',
    brief: 'Four small ore freighters, one on each pad, and the Crew Hall where the freighter crews from Vesh rest between runs.',
    types: {
      FREIGHTER: { code: 'HP', name: 'ORE FREIGHTER', col: '#b03a2e', w: 20, d: 50, h: 16 },
      CREWHALL:  { code: 'SY', name: 'CREW HALL', col: '#8fe8ff', w: 120, d: 40, h: 16 },
    },
    order: ['FREIGHTER', 'CREWHALL'],
    at: { FREIGHTER: [[330, -150], [330, 150], [530, -150], [530, 150]], CREWHALL: [[430, 255]] },
    eye: [-200, 200, 300],
    stats(api, c) { return [['ORE FREIGHTERS', c('FREIGHTER') + ' / 4'], ['CREW HALL', c('CREWHALL') ? 'OPEN' : 'NOT YET'], ['ORE PER DAY', c('FREIGHTER') * 300 + ' t']]; },
    make(type, k, g, add, F, api) {
      const T = api.THREE, S = P.hm(api), C = P.fun(api);
      if (type === 'FREIGHTER') {
        // the freighter sits on its pad; it is kept as one moving group so it can fly the run later
        const ship = new T.Group(); ship.position.y = 2.6; ship.rotation.y = k % 2 ? Math.PI : 0; ship.userData.keep = true; g.add(ship);
        P.freighter(api, add, ship, k); P.ships[k] = { g: ship, base: ship.position.clone(), ph: k * 0.25 };
        P.sign(api, ship, ['VESH 1', 'VESH 2', 'VESH 3', 'VESH 4'][k], 8, 1.6, 7.3, 7, 0, Math.PI / 2, '#2a2f38', '#ffffff', true);
        P.person(g, P.civ(19200 + k), 'gesture', 14, 2.6, 0, -Math.PI / 2);
      } else if (type === 'CREWHALL') {
        add(new T.BoxGeometry(120, 0.8, 40), S.stone, 0, 0.4, 0);
        // a long low hall with round windows, like the domes on Vesh, and a garden for the crews to sit in
        add(new T.BoxGeometry(90, 12, 24), F.white, -10, 6.8, -4);
        for (let i = 0; i < 4; i++) { add(new T.SphereGeometry(9, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2), S.glass, -46 + i * 24, 12.8, -4, false); add(new T.TorusGeometry(9, 0.4, 4, 24).rotateX(Math.PI / 2), F.white, -46 + i * 24, 12.8, -4); }
        for (let i = 0; i < 9; i++) add(new T.CylinderGeometry(1.6, 1.6, 0.3, 14).rotateX(Math.PI / 2), S.dim, -48 + i * 9.5, 7, 8.1, false);
        add(new T.BoxGeometry(6, 7, 0.4), C.blue, -10, 4.3, 8.2, false);
        P.sign(api, g, 'CREW HALL · VESH', 18, 2.4, -10, 10.6, 8.3, 0, '#ffffff', '#2f6a8a', false);
        add(new T.BoxGeometry(30, 0.4, 14), C.grass, 44, 1, 8); for (const x of [36, 52]) { add(new T.CylinderGeometry(0.4, 0.6, 5, 6), F.wood, x, 3.4, 8); add(new T.IcosahedronGeometry(3, 1), F.crops[2], x, 7.4, 8); }
        for (let i = 0; i < 6; i++) P.figure(api, add, 38 + (i % 3) * 5, 1.2, 12 + (i >> 1 & 1) * 0, i % 3 ? 1 : 0.6, i);
        P.person(g, P.civ(19210), 'walk', 0, 0.8, 0, 0, { path: { type: 'line', ax: -50, az: 14, bx: 40, bz: 14, speed: 1.1 } });
      }
    },
  }));
})();
