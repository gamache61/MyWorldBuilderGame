/* ============================================================
   MOUNTAIN HOUSE · BUILD 4 · THE LANDING PAD
   Keep this file in projects/mountainhouse next to 63-mountainhouse.html.
   A round landing pad at the north-east edge of the summit, four beacons,
   a windsock and a small fuel point.
   ============================================================ */
(function () {
  const P = window.MTN;
  // the landing platform sits on the roof of the house: round, held up on columns above both roofs, with a stair and walkway down to the front door
  P.PADL = [1518, 6]; P.PADH = 17.5;
  P.BEACONS = [0, 1, 2, 3].map(i => { const a = i * Math.PI / 2 + Math.PI / 4; return [P.PADL[0] + Math.round(Math.cos(a) * 24), P.PADL[1] + Math.round(Math.sin(a) * 24)]; });
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 4, name: 'THE ROOF LANDING PLATFORM',
    brief: 'A round landing platform on the roof of the house, four beacon lights, a windsock, a fuel point and a covered stair and walkway down to the front door — so a ship can set down right above your home.',
    types: {
      PAD:       { code: 'SF', name: 'ROOF PLATFORM', col: '#6c757d', w: 56, d: 56, h: 2 },
      BEACON:    { code: 'HP', name: 'BEACON LIGHT', col: '#d9a21b', w: 6,  d: 6,  h: 10 },
      WALKWAY:   { code: 'SF', name: 'STAIR & WALKWAY', col: '#d8d8d2', w: 32, d: 14, h: 18 },
      WINDSOCK:  { code: 'SY', name: 'WINDSOCK',     col: '#e07a30', w: 6,  d: 6,  h: 20 },
      FUELPOINT: { code: 'SY', name: 'FUEL POINT',   col: '#b03a2e', w: 16, d: 10, h: 8 },
    },
    order: ['PAD', 'BEACON', 'WALKWAY', 'WINDSOCK', 'FUELPOINT'],
    at: { PAD: [P.PADL], BEACON: P.BEACONS, WALKWAY: [[1533, 33]], WINDSOCK: [[1550 + 90, -95]], FUELPOINT: [[1550 + 50, -108]] },
    eye: [1550 + 130, P.SY + 110, 110],
    stats(api, c) { return [['ROOF PLATFORM', c('PAD') ? 'READY' : 'NOT YET'], ['BEACONS', c('BEACON') + ' / 4'], ['STAIR & WALKWAY', c('WALKWAY') ? 'OPEN' : 'NOT YET'], ['WINDSOCK', c('WINDSOCK') ? 'UP' : 'NOT YET'], ['FUEL POINT', c('FUELPOINT') ? 'OPEN' : 'NOT YET']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, H = P.mh(api);
      if (type === 'PAD') {
        const HH = P.PADH, gg = new T.Group(); gg.position.y = HH - 1; g.add(gg); const addg = (geo, m, x, y, z, s) => add(geo, m, x, y, z, s, gg);
        const col = P.mh(api).white; for (const [x, z] of [[0, -22], [-19, -18], [19, -18], [0, 24], [-18, 25], [20, 20]]) { add(new T.CylinderGeometry(1.1, 1.3, HH - 1, 12), col, x, (HH - 1) / 2, z, true); }
        add(new T.TorusGeometry(26, 0.8, 6, 64), col, 0, HH - 2.2, 0, false).rotation.x = Math.PI / 2;
        addg(new T.CylinderGeometry(27, 28, 1.2, 48), H.dark, 0, 0.6, 0, true);
        addg(new T.CylinderGeometry(24, 24, 0.2, 48), H.stone2, 0, 1.25, 0, false);
        const r1 = addg(new T.TorusGeometry(22, 0.35, 6, 64), H.yellow, 0, 1.45, 0, false); r1.rotation.x = Math.PI / 2;
        const r2 = addg(new T.TorusGeometry(10, 0.3, 6, 48), H.yellow, 0, 1.45, 0, false); r2.rotation.x = Math.PI / 2;
        for (const x of [-4, 4]) addg(new T.BoxGeometry(1.2, 0.15, 12), H.white, x, 1.45, 0, false); addg(new T.BoxGeometry(8, 0.15, 1.2), H.white, 0, 1.45, 0, false);
        for (let i = 0; i < 24; i++) { const a = i / 24 * Math.PI * 2; addg(new T.SphereGeometry(0.35, 6, 5), i % 2 ? H.glowG : H.glowA, Math.cos(a) * 26, 1.5, Math.sin(a) * 26, false); }
      } else if (type === 'BEACON') {
        const by = P.PADH + 0.2; add(new T.CylinderGeometry(0.3, 0.45, 6, 8), H.steel, 0, by + 3, 0, false); add(new T.SphereGeometry(1, 10, 8), H.glowA, 0, by + 6.6, 0, false);
        const pl = new T.PointLight(0xffc060, 1800, 70, 2); pl.position.set(0, P.PADH + 7, 0); g.add(pl);
      } else if (type === 'WALKWAY') {
        const WM = H.mw || (H.mw = new T.MeshStandardMaterial({ color: 0xfbfbf8, roughness: 0.42 })), HH = P.PADH, N = 30, L = 26;
        // a straight stair running east from the rim of the roof platform down to a landing, then a paved walkway north to the front door
        for (let i = 0; i < N; i++) { const t = i / (N - 1), x = -13 + t * L, y = HH * (1 - t); add(new T.BoxGeometry(L / N + 0.05, 0.4, 3.6), WM, x, y, 0, true); add(new T.BoxGeometry(L / N + 0.05, 0.12, 3.7), H.stone2, x, y - 0.25, 0, false); }
        const ang = Math.atan2(HH, L), len = Math.hypot(L, HH);
        for (const z of [-1.9, 1.9]) { const rl = add(new T.BoxGeometry(len, 0.18, 0.18), H.steel, 0, HH / 2 + 1.1, z, false); rl.rotation.z = -ang; const gl = add(new T.BoxGeometry(len, 0.08, 0.1), H.glowG || H.glowA, 0, HH / 2 + 0.3, z * 1.0, false); gl.rotation.z = -ang;
          for (let q = 0; q <= 6; q++) { const t = q / 6; add(new T.CylinderGeometry(0.1, 0.1, 1.2, 6), H.steel, -13 + t * L, HH * (1 - t) + 0.6, z, false); } }
        add(new T.BoxGeometry(5, 0.5, 5), WM, 13, 0.3, 0, true);
        add(new T.BoxGeometry(4, 0.5, 11), H.stone2, 13, 0.3, -7.5, true);
        for (let q = 0; q < 4; q++) for (const x of [11.1, 14.9]) add(new T.SphereGeometry(0.28, 8, 6), H.lamp, x, 1.4, -2 - q * 2.6, false);
        P.sign && P.sign(api, g, 'WALK IN', 4, 0.9, 13, 2.2, 2.9, 0, '#12333a', '#bff8d0', false);
      } else if (type === 'WINDSOCK') {
        add(new T.CylinderGeometry(0.25, 0.35, 16, 6), H.steel, 0, 8, 0, true);
        const s = add(new T.ConeGeometry(1.6, 7, 10, 1, true), H.glowA, 3.5, 15.5, 0, false); s.rotation.z = -Math.PI / 2; s.material = H.red; add(new T.TorusGeometry(1.6, 0.12, 5, 14), H.steel, 0.1, 15.5, 0, false).rotation.y = Math.PI / 2;
      } else if (type === 'FUELPOINT') {
        add(new T.BoxGeometry(16, 0.8, 10), H.stone, 0, 0.4, 0, false); add(new T.CylinderGeometry(2.6, 2.6, 8, 14).rotateZ(Math.PI / 2), H.white, -2, 3.6, 0, true);
        add(new T.BoxGeometry(2, 4.4, 1.6), H.red, 5, 3, 3, true); add(new T.BoxGeometry(1.4, 1.4, 0.3), H.win, 5, 4.4, 3.9, false);
      }
    },
  }));
})();
