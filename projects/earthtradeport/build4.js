/* ============================================================
   THE EARTH TRADE PORT · BUILD 4 · THE CARGO CRANES & THE SKY RAIL SPUR
   Keep this file in projects/earthtradeport next to 46-earthtradeport.html.
   Two tall quay cranes that lift containers on and off the ships, and
   a Sky Rail spur: a raised track that brings cargo from the cities
   straight down to the warehouses and the quays.
   ============================================================ */
(function () {
  const P = window.YARD;
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 4, name: 'THE CARGO CRANES & THE SKY RAIL SPUR',
    brief: 'Two tall quay cranes for lifting containers on and off the ships, and a raised Sky Rail spur that brings cargo down from the cities.',
    types: {
      CRANE: { code: 'FB', name: 'QUAY CRANE', col: '#e8c13a', w: 36, d: 20, h: 46 },
      SPUR: { code: 'SY', name: 'SKY RAIL SPUR', col: '#9aa3ad', w: 420, d: 14, h: 30 },
    },
    order: ['CRANE', 'SPUR'],
    at: { CRANE: [[-236, -1335], [-236, -1475]], SPUR: [[150, -1400]] },
    eye: [-340, 120, -1200],
    stats(api, c) { return [['QUAY CRANES', c('CRANE') + ' / 2'], ['SKY RAIL SPUR', c('SPUR') ? 'RUNNING' : 'NOT YET']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, S = P.hm(api), C = P.fun(api), y0 = sl.y;
      if (type === 'CRANE') {
        const top = P.QDECK - y0, cm = new T.MeshStandardMaterial({ color: [0xc8643a, 0x2f7fe0][k], roughness: 0.6, metalness: 0.2 });
        for (const x of [-16, 16]) for (const z of [-8, 8]) add(new T.BoxGeometry(2, 34, 2), C.yellow, x, top + 17, z);
        for (const x of [-16, 16]) add(new T.BoxGeometry(2.4, 2, 20), F.dark, x, top + 1, 0);
        add(new T.BoxGeometry(36, 3, 20), C.yellow, 0, top + 34, 0);
        add(new T.BoxGeometry(10, 6, 8), F.white, 4, top + 37.5, 0); add(new T.BoxGeometry(10.2, 2, 8.2), S.glass, 4, top + 38, 0);
        // the long boom out over the ship, and the back stay
        add(new T.BoxGeometry(76, 2, 3), C.yellow, -24, top + 36, 0); add(new T.BoxGeometry(76, 2, 3), C.yellow, -24, top + 36, 6); add(new T.BoxGeometry(76, 2, 3), C.yellow, -24, top + 36, -6);
        add(new T.BoxGeometry(18, 2, 14), F.dark, 22, top + 36, 0);
        const tr = add(new T.BoxGeometry(5, 3, 8), F.dark, -44 + k * 6, top + 34, 0);
        add(new T.CylinderGeometry(0.12, 0.12, 22, 4), F.steel, -44 + k * 6, top + 22, 0); add(new T.BoxGeometry(6, 2.6, 2.6), cm, -44 + k * 6, top + 10, 0);
        add(new T.SphereGeometry(0.7, 8, 6), F.lamp, -60, top + 37.4, 0);
        P.person(g, P.civ(46400 + k), 'gesture', 0, top, 14, 0);
      } else {
        // the raised track on pylons, a terminal by the warehouses, and a glowing train
        const L = 420, h = 26, steel = F.steel;
        add(new T.BoxGeometry(L, 1.6, 9), F.panel, 0, h, 0);
        for (const z of [-3.2, 3.2]) add(new T.BoxGeometry(L, 0.5, 0.6), steel, 0, h + 1.1, z);
        add(new T.BoxGeometry(L, 0.3, 0.5), F.eye, 0, h + 0.2, 4.6);
        for (let x = -200; x <= 200; x += 40) { const gy = P.ground(api, sl.x + x, sl.z) - y0; add(new T.BoxGeometry(4, h - gy, 4), S.stone, x, gy + (h - gy) / 2, 0); add(new T.BoxGeometry(8, 1.2, 8), S.stone, x, h - 1, 0); }
        // terminal at the sea end
        add(new T.BoxGeometry(54, 12, 22), F.white, -190, h + 7, 0); add(new T.BoxGeometry(56, 1.4, 24), S.slate, -190, h + 13.4, 0); add(new T.BoxGeometry(50, 7, 22.4), S.glass, -190, h + 7, 0);
        P.sign(api, g, 'SKY RAIL · EARTH TRADE PORT', 36, 3.4, -190, h + 17.6, 11.4, 0, '#14324a', '#bff8ff', true);
        // a lift down to the warehouse yard
        add(new T.BoxGeometry(6, h, 6), F.steel, -160, h / 2 + (P.ground(api, sl.x - 160, sl.z) - y0), 8);
        // the train: three white cars with a glowing stripe
        for (let i = 0; i < 3; i++) { const x = 60 - i * 24; add(new T.BoxGeometry(22, 5, 6), F.white, x, h + 4.3, 0); add(new T.BoxGeometry(22.2, 1.4, 6.2), S.glass, x, h + 5, 0); add(new T.BoxGeometry(22.2, 0.5, 6.2), F.eye, x, h + 3, 0); }
        for (let i = 0; i < 5; i++) P.person(g, i % 3 === 1 ? P.kid(46500 + i) : P.civ(46500 + i), 'idle', -190 + i * 3 - 6, h + 0.8, 14 * 0 + 0, Math.PI);
      }
    },
  }));
})();
