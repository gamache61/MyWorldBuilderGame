/* ============================================================
   THE EARTH TRADE PORT · BUILD 2 · THE DEEP QUAYS & THE CUSTOMS HALL
   Keep this file in projects/earthtradeport next to 46-earthtradeport.html.
   Two long concrete quays stand out over deep water on tall piles, so
   the biggest ships from Earth can tie up beside them. Behind them the
   Customs Hall, where every crate that comes in or goes out is counted.
   ============================================================ */
(function () {
  const P = window.YARD;
  P.QDECK = -27.4;   // the top of the quays, in world height
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 2, name: 'THE DEEP QUAYS & THE CUSTOMS HALL',
    brief: 'Two long concrete quays out over deep water on tall piles, with bollards and lamps, and the Customs Hall where every crate is counted.',
    types: {
      QUAY: { code: 'FB', name: 'DEEP QUAY', col: '#a0a096', w: 50, d: 150, h: 8 },
      CUSTOMS: { code: 'SY', name: 'CUSTOMS HALL', col: '#e8e1d1', w: 90, d: 56, h: 26 },
    },
    order: ['QUAY', 'CUSTOMS'],
    at: { QUAY: [[-236, -1335], [-236, -1475]], CUSTOMS: [[-120, -1250]] },
    eye: [-330, 120, -1180],
    stats(api, c) { return [['DEEP QUAYS', c('QUAY') + ' / 2'], ['CUSTOMS HALL', c('CUSTOMS') ? 'OPEN' : 'NOT YET']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, S = P.hm(api), C = P.fun(api), y0 = sl.y, top = P.QDECK - y0;
      if (type === 'QUAY') {
        add(new T.BoxGeometry(50, 3, 150), F.deck, 0, top - 1.5, 0);
        add(new T.BoxGeometry(50.4, 0.5, 150.4), F.dark, 0, top - 3.2, 0);
        // piles down to the sea floor
        for (let z = -70; z <= 70; z += 20) for (const x of [-22, 0, 22]) { const bed = P.seabed(api, sl.x + x, sl.z + z) - y0, h = top - 3 - bed; if (h > 1) add(new T.CylinderGeometry(1.3, 1.5, h, 8), S.stone, x, bed + h / 2, z); }
        // yellow edge, bollards and lamps along the sea side
        add(new T.BoxGeometry(0.8, 0.3, 150), C.yellow, -24.5, top + 0.15, 0);
        for (let z = -66; z <= 66; z += 22) { add(new T.CylinderGeometry(0.9, 1.1, 1.6, 8), F.dark, -22.5, top + 0.8, z); }
        for (let z = -60; z <= 60; z += 40) { add(new T.CylinderGeometry(0.25, 0.3, 14, 6), F.steel, 22, top + 7, z); add(new T.BoxGeometry(2.4, 0.5, 1.2), F.lamp, 22, top + 14.2, z); }
        // rails for the cranes
        for (const x of [-16, 16]) add(new T.BoxGeometry(1, 0.4, 148), F.steel, x, top + 0.2, 0);
        P.sign(api, g, 'DEEP QUAY ' + (k + 1), 14, 2.6, 0, top + 6, 74, 0, '#14324a', '#ffffff', true);
        P.person(g, P.civ(46000 + k), 'tablet', 6, top, -20, Math.PI / 2);
        P.person(g, P.civ(46010 + k), 'gesture', -6, top, 28, -Math.PI / 2);
      } else {
        const wl = P.hm(api);
        add(new T.BoxGeometry(92, 1, 58), S.gravel, 0, 0.5, 0);
        add(new T.BoxGeometry(80, 16, 40), F.white, 0, 9, 0);
        add(new T.BoxGeometry(84, 1.4, 44), S.slate, 0, 17.7, 0);
        add(new T.BoxGeometry(60, 9, 36), F.white, 0, 22, 0);
        add(new T.BoxGeometry(64, 1.2, 40), S.slate, 0, 26.8, 0);
        // a glass front toward the sea, and the flags of Unity and Earth
        add(new T.BoxGeometry(0.6, 12, 34), S.glass, -40.4, 8.5, 0);
        for (let z = -16; z <= 16; z += 8) add(new T.BoxGeometry(0.8, 14, 0.8), F.steel, -40.6, 8, z);
        for (const [z, c] of [[-26, 0x2f7fe0], [26, 0x3fb04a]]) { add(new T.CylinderGeometry(0.2, 0.25, 26, 6), F.steel, -34, 13, z); add(new T.BoxGeometry(0.2, 3, 5), new T.MeshStandardMaterial({ color: c, roughness: 0.8 }), -34, 24, z + 2.6 * Math.sign(z)); }
        P.sign(api, g, 'CUSTOMS HALL', 30, 4, -41.2, 20.5, 0, -Math.PI / 2, '#12333a', '#bff8d0', false);
        // counting lanes: low desks with glowing scanners
        for (let z = -14; z <= 14; z += 7) { add(new T.BoxGeometry(5, 1.4, 3), S.timber, -46, 0.7 + 0.5, z); add(new T.BoxGeometry(5, 0.3, 0.4), F.eye, -46, 3.4, z - 1.5); }
        for (let i = 0; i < 6; i++) P.person(g, i % 3 === 1 ? P.kid(46100 + i) : P.civ(46100 + i), i % 2 ? 'tablet' : 'idle', -50 - (i % 3) * 3, 1, -12 + i * 5, -Math.PI / 2);
      }
    },
  }));
})();
