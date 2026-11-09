/* ============================================================
   THE SKY RAIL · BUILD 4 · THE FOREST LINE & THE GREEN BRIDGES
   Keep this file in projects/skyrail next to 40-skyrail.html.
   At the edge of the city the line ramps gently down into the forest
   and runs low along a grassy bed. Two green bridges, planted with
   grass and bushes, carry the deer, foxes and rabbits over the line,
   so the Sky Rail never cuts the forest in two.
   ============================================================ */
(function () {
  const P = window.SKY;
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 4, name: 'THE FOREST LINE & THE GREEN BRIDGES',
    brief: 'The ramp down from the city into the forest, the low forest track, and two green bridges that carry the animals over the line.',
    types: {
      RAMP:        { code: 'SF', name: 'RAMP SPAN', col: '#6c757d', w: 100, d: 10, h: 24 },
      FORESTTRACK: { code: 'SF', name: 'FOREST TRACK', col: '#8a8478', w: 190, d: 14, h: 4 },
      GREENBRIDGE: { code: 'GD', name: 'GREEN BRIDGE', col: '#3fb04a', w: 30, d: 76, h: 14 },
    },
    order: ['RAMP', 'FORESTTRACK', 'GREENBRIDGE'],
    at: { RAMP: [[1200, -420]], FORESTTRACK: [[1345, -420]], GREENBRIDGE: [[1300, -420], [1395, -420]] },
    eye: [-170, 110, 210],
    stats(api, c) { return [['RAMP', c('RAMP') ? 'SET' : 'NOT YET'], ['FOREST TRACK', c('FORESTTRACK') ? 'LAID' : 'NOT YET'], ['GREEN BRIDGES', c('GREENBRIDGE') + ' / 2'], ['ANIMALS CROSSING', c('GREENBRIDGE') ? 'EVERY DAY' : 'NOT YET']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, S = P.hm(api), C = P.fun(api), y0 = sl.y;
      if (type === 'RAMP') {
        // the beam slopes down from the city line to the forest track, on three short pylons
        P.beam(api, add, F, -50, 50, P.RAIL_Y - y0, P.TRACK_Y - y0);
        for (const x of [-25, 0, 25]) { const yt = P.railY(sl.x + x) - y0 - 4.6, gy = P.ground(api, sl.x + x, sl.z) - y0; if (yt - gy > 1) add(new T.CylinderGeometry(1.3, 1.8, yt - gy, 12), S.frame, x, gy + (yt - gy) / 2, 0); }
      } else if (type === 'FORESTTRACK') {
        // a grassy bed with the low beam on it, a fence of timber posts either side
        const ty = P.TRACK_Y - y0;
        add(new T.BoxGeometry(190, 1.2, 12), S.gravel, 0, 0, 0);
        for (const x of [-60, 0, 60]) add(new T.BoxGeometry(5, Math.max(0.5, ty - 4.2), 6), S.frame, x, Math.max(0.5, ty - 4.2) / 2, 0);
        P.beam(api, add, F, -95, 95, ty, ty);
        for (const s of [-1, 1]) for (let x = -90; x <= 90; x += 10) add(new T.BoxGeometry(0.4, 2.4, 0.4), S.timber, x, 1.2, s * 15);
        for (const s of [-1, 1]) for (const y of [0.9, 2]) add(new T.BoxGeometry(190, 0.25, 0.25), S.timber, 0, y, s * 15);
      } else if (type === 'GREENBRIDGE') {
        // a planted arch over the line, wide enough for deer, with hedges along its edges and a glowing sign
        const ty = P.TRACK_Y - y0, dk = ty + 9;
        add(new T.BoxGeometry(26, 1.8, 22), S.stone, 0, dk, 0); add(new T.BoxGeometry(24, 0.4, 22), C.grass, 0, dk + 1.1, 0);
        for (const s of [-1, 1]) {
          const L = 28, rise = dk + 1; const r = add(new T.BoxGeometry(26, 1.8, Math.hypot(L, rise)), S.stone, 0, rise / 2 - 0.4, s * (11 + L / 2)); r.rotation.x = s * Math.atan2(rise, L);
          const gr = add(new T.BoxGeometry(24, 0.4, Math.hypot(L, rise)), C.grass, 0, rise / 2 + 0.6, s * (11 + L / 2)); gr.rotation.x = s * Math.atan2(rise, L);
          add(new T.BoxGeometry(2.4, dk, 22), S.stone, s * 12, dk / 2, 0);
        }
        for (const s of [-1, 1]) for (let z = -10; z <= 10; z += 4) add(new T.IcosahedronGeometry(1.5, 0), F.crops[2], s * 11, dk + 2.4, z, false);
        for (let i = 0; i < 5; i++) add(new T.IcosahedronGeometry(1.4, 0), F.crops[(i + k) % 5], -6 + i * 3, dk + 2, (i % 2 ? -5 : 5), false);
        P.sign(api, g, 'GREEN BRIDGE · ANIMALS CROSSING', 16, 1.8, 0, dk - 2.2, 11.2, 0, '#3a2a1a', '#e8d8b0', false);
        // deer and foxes crossing to and fro
        const yOf = z => { const a = Math.abs(z); return a <= 11 ? dk + 1.3 : Math.max(0.3, dk + 1.3 - (a - 11) * (dk + 1) / 28); };
        P.crosser(api, add, g, k ? 'fox' : 'deer', -4, -36, 36, yOf, 0.12 + k * 0.03, k ? 1.7 : 1.9, k * 1.7);
        P.crosser(api, add, g, k ? 'rabbit' : 'fox', 5, 34, -34, yOf, 0.09, 1.6, 0.8 + k);
      }
    },
    tick(api, dt, t) { P.moveWalkers(t); },
  }));
})();
