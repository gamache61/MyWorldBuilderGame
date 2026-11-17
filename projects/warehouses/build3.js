/* ============================================================
   THE UNITY WAREHOUSES · BUILD 3 · THE FIRST THREE WAREHOUSES
   Keep this file in projects/warehouses next to 73-warehouses.html.
   Three long warehouses side by side with loading doors on the road side, dock ramps and stacks of parts crates.
   ============================================================ */
(function () {
  const P = window.PWP;
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 3, name: 'THE FIRST THREE WAREHOUSES',
    brief: 'Three long warehouses side by side with big loading doors facing the truck road, a dock ramp for each, and stacks of parts crates waiting outside.',
    types: {
      WAREHOUSE: { code: 'FB', name: 'WAREHOUSE',   col: '#b8bec6', w: 100, d: 56, h: 20 },
      RAMP:      { code: 'SF', name: 'DOCK RAMP',   col: '#6c7580', w: 16,  d: 24, h: 4 },
      CRATES:    { code: 'HM', name: 'CRATE STACK', col: '#c8362a', w: 16,  d: 10, h: 8 },
    },
    order: ['WAREHOUSE', 'RAMP', 'CRATES'],
    at: {
      WAREHOUSE: [[1550 + 440, -200], [1550 + 440, -130], [1550 + 440, -60]],
      RAMP: [[1550 + 372, -200], [1550 + 372, -130], [1550 + 372, -60]],
      CRATES: [[1550 + 340, -165], [1550 + 340, -95], [1550 + 340, -25], [1550 + 525, -230]],
    },
    eye: [1550 + 270, P.SY + 150, 130],
    stats(api, c) { return [['WAREHOUSES', c('WAREHOUSE') + ' / 3'], ['DOCK RAMPS', c('RAMP') + ' / 3'], ['CRATE STACKS', c('CRATES') + ' / 4']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, H = P.pw(api);
      if (type === 'WAREHOUSE') {
        add(new T.BoxGeometry(100, 1, 56), H.conc2, 0, 0.5, 0);
        add(new T.BoxGeometry(96, 15, 52), H.wall, 0, 8.5, 0);
        add(new T.BoxGeometry(98, 1.2, 54), H.roof, 0, 16.6, 0);
        add(new T.BoxGeometry(60, 3, 30), H.roof2, 0, 18.5, 0);
        for (let i = 0; i < 4; i++) { add(new T.BoxGeometry(0.5, 11, 12), H.steel2, -48.2, 6.5, -18 + i * 12, false); add(new T.BoxGeometry(0.7, 0.6, 12), H.yellow, -48.4, 12.3, -18 + i * 12, false); }
        add(new T.BoxGeometry(0.6, 0.6, 50), H.blue, -48.4, 14.4, 0, false);
        for (let i = 0; i < 5; i++) add(new T.BoxGeometry(0.4, 3, 6), H.win, 48.2, 11, -20 + i * 10, false);
        for (const z of [-15, 15]) { add(new T.CylinderGeometry(1.2, 1.2, 8, 10), H.steel, 20, 21, z, false); add(new T.CylinderGeometry(1, 1, 0.6, 10), H.cool, 20, 25.2, z, false); }
        P.sign(api, g, 'WAREHOUSE ' + ['ONE', 'TWO', 'THREE'][k], 34, 3.6, -48.8, 15.2, 0, -Math.PI / 2, '#14242e', '#bff8d0');
        P.person(g, P.civ(73020 + k), 'tablet', -56, 0.5, 8, Math.PI / 2);
      } else if (type === 'RAMP') {
        add(new T.BoxGeometry(16, 3, 24), H.conc2, 0, 1.5, 0);
        const r = add(new T.BoxGeometry(14, 0.6, 14), H.steel2, -9, 2.2, 0); r.rotation.z = 0.26;
        add(new T.BoxGeometry(16, 0.4, 24), H.hazard, 0, 3.1, 0, false);
      } else if (type === 'CRATES') {
        for (let r = 0; r < 3; r++) for (let c = 0; c < 3 - r; c++) { const col = [H.red, H.orange, H.blue][(r + c + k) % 3]; add(new T.BoxGeometry(4.6, 2.4, 4), col, -5 + c * 5 + r * 2.5, 1.2 + r * 2.5, (r % 2) * 1.5); }
        add(new T.BoxGeometry(16, 0.4, 10), H.conc2, 0, 0.2, 0, false);
      }
    },
  }));
})();
