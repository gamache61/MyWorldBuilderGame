/* ============================================================
   THE SEASHORE SHIPYARD · BUILD 2 · THE SLIPWAYS & THE GANTRY CRANES
   Keep this file in projects/seashoreshipyard next to 42-seashoreshipyard.html.
   Two long concrete slipways run from the shore straight down into the
   sea, so a finished ship can slide into the water. Over each one stands
   a tall yellow gantry crane that lifts the ship's parts into place.
   ============================================================ */
(function () {
  const P = window.YARD;
  // the slipway slope, in world height: land level at x = -40, five metres under the sea at x = -330
  P.SLIP = { x0: -40, x1: -330, y0: -28.4, y1: -36 };
  P.slipY = x => { const S = P.SLIP, t = Math.min(1, Math.max(0, (S.x0 - x) / (S.x0 - S.x1))); return S.y0 + (S.y1 - S.y0) * t; };
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 2, name: 'THE SLIPWAYS & THE GANTRY CRANES',
    brief: 'Two long concrete slipways running from the shore down into the sea, so a finished ship can slide into the water, each with a tall yellow gantry crane over it.',
    types: {
      SLIPWAY: { code: 'SF', name: 'SLIPWAY', col: '#a0a096', w: 290, d: 40, h: 46 },
    },
    order: ['SLIPWAY'],
    at: { SLIPWAY: [[-185, 1300], [-185, 1420]] },
    eye: [-230, 150, 260],
    stats(api, c) { return [['SLIPWAYS', c('SLIPWAY') + ' / 2'], ['GANTRY CRANES', c('SLIPWAY') + ' / 2']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, S = P.hm(api), C = P.fun(api), y0 = sl.y;
      // the ramp: concrete slabs on piers, sloping from the shore into the sea
      const L = 290, a = Math.atan2(P.SLIP.y0 - P.SLIP.y1, L), mid = (P.slipY(sl.x) - y0);
      const ramp = add(new T.BoxGeometry(L + 4, 2.4, 30), S.stone, 0, mid - 0.8, 0); ramp.rotation.z = a;
      for (const z of [-6, 6]) { const r = add(new T.BoxGeometry(L, 0.6, 1.2), F.steel, 0, mid + 0.7, z); r.rotation.z = a; }
      for (let x = -140; x <= 140; x += 20) { const wx = sl.x + x, top = P.slipY(wx) - y0 - 2.4, bed = P.seabed(api, wx, sl.z) - y0; if (top - bed > 1) for (const z of [-11, 11]) add(new T.BoxGeometry(2.4, top - bed, 2.4), S.stone, x, bed + (top - bed) / 2, z); }
      // the cradle blocks the ship will sit on
      for (let x = -20; x <= 120; x += 20) add(new T.BoxGeometry(3, 1.2, 10), S.timber, x, P.slipY(sl.x + x) - y0 + 0.6, 0);
      // the gantry crane: two legs on rails each side, a beam across, a trolley and a hook
      for (const s of [-1, 1]) {
        add(new T.BoxGeometry(150, 0.8, 1.6), F.steel, 75, 0.4, s * 22);
        for (const x of [40, 64]) add(new T.BoxGeometry(2.4, 44, 2.4), C.yellow, x, 22, s * 22);
        add(new T.BoxGeometry(28, 2.4, 2.4), C.yellow, 52, 3, s * 22);
      }
      for (const x of [40, 64]) add(new T.BoxGeometry(2.6, 3, 48), C.yellow, x, 45, 0);
      add(new T.BoxGeometry(10, 4, 6), F.dark, 52, 42, 0); add(new T.CylinderGeometry(0.15, 0.15, 18, 4), F.steel, 52, 31, 0); add(new T.BoxGeometry(2, 1.2, 2), C.yellow, 52, 22, 0);
      P.sign(api, g, 'SLIPWAY ' + (k + 1), 12, 2.4, 52, 40, 24.2, 0, '#14324a', '#ffffff', true);
      P.person(g, P.civ(42000 + k), 'tablet', 70, 0.5, -16, Math.PI); P.person(g, P.civ(42010 + k), 'gesture', 30, P.slipY(sl.x + 30) - y0, 8, -Math.PI / 2);
    },
  }));
})();
