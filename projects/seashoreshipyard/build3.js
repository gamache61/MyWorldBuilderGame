/* ============================================================
   THE SEASHORE SHIPYARD · BUILD 3 · THE SHIP HALL & THE FLOATING DOCK
   Keep this file in projects/seashoreshipyard next to 42-seashoreshipyard.html.
   The great ship hall where hulls, engines and cabins are made from
   Unity's own moon metal and brought out to the slipways, and a
   floating dock out in the sea where ships are lifted out of the
   water to be cleaned and mended.
   ============================================================ */
(function () {
  const P = window.YARD;
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 3, name: 'THE SHIP HALL & THE FLOATING DOCK',
    brief: 'The great ship hall where hulls, engines and cabins are made from moon metal, and a floating dock out in the sea where ships are lifted out of the water to be mended.',
    types: {
      SHIPHALL:  { code: 'SY', name: 'SHIP HALL', col: '#e8e1d1', w: 200, d: 150, h: 40 },
      FLOATDOCK: { code: 'FB', name: 'FLOATING DOCK', col: '#d9a21b', w: 220, d: 60, h: 16 },
    },
    order: ['SHIPHALL', 'FLOATDOCK'],
    at: { SHIPHALL: [[130, 1360]], FLOATDOCK: [[-360, 1580]] },
    eye: [-240, 160, 290],
    stats(api, c) { return [['SHIP HALL', c('SHIPHALL') ? 'WORKING' : 'NOT YET'], ['FLOATING DOCK', c('FLOATDOCK') ? 'AFLOAT' : 'NOT YET']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, S = P.hm(api), C = P.fun(api);
      if (type === 'SHIPHALL') {
        // a long hall with a curved roof, big doors toward the slipways, roof lights and solar panels
        add(new T.BoxGeometry(200, 1, 150), S.gravel, 0, 0.5, 0);
        add(new T.BoxGeometry(180, 26, 130), F.white, 10, 13.5, 0);
        const roof = add(new T.CylinderGeometry(65, 65, 182, 32, 1, false, -Math.PI / 2, Math.PI).rotateZ(Math.PI / 2), F.panel, 10, 26.5, 0); roof.scale.set(1, 0.24, 1);
        for (let x = -70; x <= 90; x += 20) add(new T.BoxGeometry(8, 0.4, 100), F.solar, x, 26.5 + 13, 0);
        for (const z of [-40, 40]) { add(new T.BoxGeometry(1, 22, 46), F.dark, -80.6, 12, z); add(new T.BoxGeometry(1.2, 2, 46), C.yellow, -80.8, 23.5, z); }
        for (let i = 0; i < 9; i++) add(new T.BoxGeometry(14, 3, 0.4), S.dim, -60 + i * 18, 20, 65.2, false);
        P.sign(api, g, 'SEASHORE SHIPYARD', 46, 5, 10, 31, 65.6, 0, '#14324a', '#80d8ff', false);
        // hull sections waiting outside, and workers
        for (const [x, z] of [[-92, -10], [-92, 14]]) { add(new T.CylinderGeometry(6, 6, 18, 16, 1, false, 0, Math.PI).rotateZ(Math.PI / 2), F.white, x, 6, z); }
        P.person(g, P.civ(43000), 'tablet', -90, 1, 0, Math.PI / 2); P.person(g, P.civ(43001), 'walk', 0, 1, 0, 0, { path: { type: 'line', ax: -95, az: 30, bx: -95, bz: -60, speed: 1 } });
        P.person(g, P.civ(43002), 'gesture', -86, 1, -32, Math.PI / 2);
      } else if (type === 'FLOATDOCK') {
        // a U-shaped steel pontoon floating on the sea: two long side walls, a deck between, cranes on the walls
        add(new T.BoxGeometry(220, 3, 46), F.armor, 0, 0.5, 0);
        for (const s of [-1, 1]) { add(new T.BoxGeometry(220, 12, 8), C.orange, 0, 6, s * 25); add(new T.BoxGeometry(220, 0.6, 8.4), S.yellow, 0, 12.3, s * 25); }
        for (const s of [-1, 1]) for (const x of [-60, 40]) { add(new T.BoxGeometry(3, 18, 3), C.yellow, x, 21, s * 25); const j = add(new T.BoxGeometry(26, 2, 2), C.yellow, x - s * 0, 30, s * 16); j.rotation.y = 0; }
        for (let x = -100; x <= 100; x += 25) add(new T.BoxGeometry(3, 1.4, 20), S.timber, x, 2.7, 0);
        P.sign(api, g, 'FLOATING DOCK', 26, 3, 0, 9, 29.2, 0, '#14324a', '#ffffff', false);
        P.person(g, P.civ(43010), 'tablet', -80, 12.6, 25, Math.PI); P.person(g, P.civ(43011), 'idle', 60, 12.6, -25, 0);
      }
    },
  }));
})();
