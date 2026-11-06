/* ============================================================
   THE KRYOS SHOPPING CENTRE · BUILD 4 · THE WORKSHOPS & THE MARKET SQUARE
   Keep this file in projects/shoppingcentre next to shoppingcentre.html.
   A long row of open workshops on the west side, where people make and
   mend clothes, shoes, furniture and tools, and the open-air market
   square at the south end with stalls under striped canopies.
   ============================================================ */
(function () {
  const P = window.SHOP;
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 4, name: 'THE WORKSHOPS & THE MARKET SQUARE',
    brief: 'A row of open workshops where people make and mend clothes, shoes, furniture and tools, and the open-air market square with striped stalls.',
    types: {
      WORKSHOPS: { code: 'FB', name: 'WORKSHOP ROW', col: '#d9a21b', w: 40, d: 260, h: 14 },
      MARKETSQ:  { code: 'FB', name: 'MARKET SQUARE', col: '#e8e1d1', w: 100, d: 60, h: 8 },
    },
    order: ['WORKSHOPS', 'MARKETSQ'],
    at: { WORKSHOPS: [[-1190, 0]], MARKETSQ: [[-1070, -200]] },
    eye: [260, 220, 300],
    stats(api, c) { return [['WORKSHOPS', c('WORKSHOPS') * 12 + ' / 12'], ['MARKET STALLS', c('MARKETSQ') * 24 + ' / 24'], ['NEW JOBS', (c('WORKSHOPS') * 300 + c('MARKETSQ') * 200).toLocaleString()]]; },
    make(type, k, g, add, F, api) {
      const T = api.THREE, S = P.hm(api), C = P.fun(api);
      if (type === 'WORKSHOPS') {
        add(new T.BoxGeometry(40, 0.6, 260), S.stone, 0, 0.3, 0);
        const trades = ['CLOTHES', 'SHOES', 'FURNITURE', 'TOOLS', 'POTTERY', 'BICYCLES', 'BOOKS', 'GLASS', 'TOYS', 'REPAIRS', 'TAILOR', 'LAMPS'];
        for (let i = 0; i < 12; i++) {
          const z = -121 + i * 22;
          add(new T.BoxGeometry(24, 11, 20), i % 2 ? S.brick : S.cream, -6, 6, z);
          add(new T.BoxGeometry(26, 0.8, 21), S.slate, -6, 11.8, z);
          add(new T.BoxGeometry(0.3, 6, 14), S.dim, 6.1, 4.5, z, false);
          add(new T.BoxGeometry(5, 0.4, 16), [C.red, C.blue, C.green, C.orange][i % 4], 8.4, 8.6, z).rotation.z = -0.35;
          P.sign(api, g, trades[i], 12, 1.6, 6.2, 10, z, Math.PI / 2, '#2a2f38', '#ffd060', false);
          add(new T.BoxGeometry(6, 1, 2.4), S.timber, 12, 1.4, z - 4); P.figure(api, add, 12, 0.6, z + 1, 1, i);
          if (i % 3 === 0) P.figure(api, add, 15, 0.6, z - 2, 0.6, i + 2);
        }
        P.person(g, P.civ(18200), 'walk', 0, 0.6, 0, 0, { path: { type: 'line', ax: 16, az: -125, bx: 16, bz: 125, speed: 1 } });
        P.person(g, P.civ(18201), 'tablet', 11, 0.6, 30, Math.PI / 2);
      } else if (type === 'MARKETSQ') {
        add(new T.BoxGeometry(100, 0.6, 60), S.cream, 0, 0.3, 0);
        for (let x = -45; x <= 45; x += 10) add(new T.BoxGeometry(0.6, 0.1, 60), S.stone, x, 0.65, 0, false);
        // twenty-four stalls in four rows under striped canopies
        const cols = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'];
        for (let r = 0; r < 4; r++) for (let i = 0; i < 6; i++) {
          const x = -38 + i * 15, z = -21 + r * 14;
          add(new T.BoxGeometry(8, 2.6, 3.6), S.timber, x, 1.9, z);
          for (const e of [-1, 1]) add(new T.CylinderGeometry(0.15, 0.15, 6, 4), F.steel, x + e * 3.8, 3.6, z - 1.6);
          for (let st = 0; st < 4; st++) add(new T.BoxGeometry(2.2, 0.3, 4.6), st % 2 ? F.white : C[cols[(i + r) % 6]], x - 3.3 + st * 2.2, 6.6, z - 0.2, false).rotation.x = -0.3;
          for (let f = 0; f < 3; f++) add(new T.SphereGeometry(0.6, 6, 4), [F.berry, F.flower, F.crops[1], C.orange][(f + i + r) % 4], x - 2.4 + f * 2.4, 3.6, z, false);
          P.figure(api, add, x, 0.6, z - 3.2, (i + r) % 3 ? 1 : 0.6, i + r * 6);
        }
        add(new T.CylinderGeometry(0.4, 0.5, 14, 8), S.brass, 44, 7.6, 26); add(new T.BoxGeometry(5, 5, 1), F.white, 44, 13, 26);
        P.person(g, P.civ(18210), 'walk', 0, 0.6, 0, 0, { path: { type: 'rect', x0: -46, x1: 46, z0: -27, z1: 27, speed: 1.1 } });
        P.sign(api, g, 'MARKET SQUARE', 18, 2.6, 0, 3.4, 30.6, 0, '#ffffff', '#c86a1a', false);
      }
    },
  }));
})();
