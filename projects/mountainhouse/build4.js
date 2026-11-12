/* ============================================================
   MOUNTAIN HOUSE · BUILD 4 · THE LANDING PAD
   Keep this file in projects/mountainhouse next to 63-mountainhouse.html.
   A round landing pad at the north-east edge of the summit, four beacons,
   a windsock and a small fuel point.
   ============================================================ */
(function () {
  const P = window.MTN;
  P.BEACONS = [0, 1, 2, 3].map(i => { const a = i * Math.PI / 2 + Math.PI / 4; return [1550 + 50 + Math.round(Math.cos(a) * 30), -70 + Math.round(Math.sin(a) * 30)]; });
  P.PADL = [1600, -70];
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 4, name: 'THE LANDING PAD',
    brief: 'A round landing pad on the summit, four beacon lights, a windsock and a fuel point — so a ship can set down at the door of the house.',
    types: {
      PAD:       { code: 'SF', name: 'LANDING PAD',  col: '#6c757d', w: 56, d: 56, h: 2 },
      BEACON:    { code: 'HP', name: 'BEACON LIGHT', col: '#d9a21b', w: 6,  d: 6,  h: 10 },
      WINDSOCK:  { code: 'SY', name: 'WINDSOCK',     col: '#e07a30', w: 6,  d: 6,  h: 20 },
      FUELPOINT: { code: 'SY', name: 'FUEL POINT',   col: '#b03a2e', w: 16, d: 10, h: 8 },
    },
    order: ['PAD', 'BEACON', 'WINDSOCK', 'FUELPOINT'],
    at: { PAD: [P.PADL], BEACON: P.BEACONS, WINDSOCK: [[1550 + 90, -95]], FUELPOINT: [[1550 + 50, -108]] },
    eye: [200, 430, 20],
    stats(api, c) { return [['LANDING PAD', c('PAD') ? 'READY' : 'NOT YET'], ['BEACONS', c('BEACON') + ' / 4'], ['WINDSOCK', c('WINDSOCK') ? 'UP' : 'NOT YET'], ['FUEL POINT', c('FUELPOINT') ? 'OPEN' : 'NOT YET']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, H = P.mh(api);
      if (type === 'PAD') {
        add(new T.CylinderGeometry(27, 28, 1.2, 48), H.dark, 0, 0.6, 0, true);
        add(new T.CylinderGeometry(24, 24, 0.2, 48), H.stone2, 0, 1.25, 0, false);
        const r1 = add(new T.TorusGeometry(22, 0.35, 6, 64), H.yellow, 0, 1.45, 0, false); r1.rotation.x = Math.PI / 2;
        const r2 = add(new T.TorusGeometry(10, 0.3, 6, 48), H.yellow, 0, 1.45, 0, false); r2.rotation.x = Math.PI / 2;
        for (const x of [-4, 4]) add(new T.BoxGeometry(1.2, 0.15, 12), H.white, x, 1.45, 0, false); add(new T.BoxGeometry(8, 0.15, 1.2), H.white, 0, 1.45, 0, false);
        for (let i = 0; i < 24; i++) { const a = i / 24 * Math.PI * 2; add(new T.SphereGeometry(0.35, 6, 5), i % 2 ? H.glowG : H.glowA, Math.cos(a) * 26, 1.5, Math.sin(a) * 26, false); }
      } else if (type === 'BEACON') {
        add(new T.CylinderGeometry(0.3, 0.45, 6, 8), H.steel, 0, 3, 0, false); add(new T.SphereGeometry(1, 10, 8), H.glowA, 0, 6.6, 0, false);
        const pl = new T.PointLight(0xffc060, 1800, 70, 2); pl.position.set(0, 7, 0); g.add(pl);
      } else if (type === 'WINDSOCK') {
        add(new T.CylinderGeometry(0.25, 0.35, 16, 6), H.steel, 0, 8, 0, true);
        const s = add(new T.ConeGeometry(1.6, 7, 10, 1, true), H.glowA, 3.5, 15.5, 0, false); s.rotation.z = -Math.PI / 2; s.material = H.red; add(new T.TorusGeometry(1.6, 0.12, 5, 14), H.steel, 0.1, 15.5, 0, false).rotation.y = Math.PI / 2;
      } else if (type === 'FUELPOINT') {
        add(new T.BoxGeometry(16, 0.8, 10), H.stone, 0, 0.4, 0, false); add(new T.CylinderGeometry(2.6, 2.6, 8, 14).rotateZ(Math.PI / 2), H.white, -2, 3.6, 0, true);
        add(new T.BoxGeometry(2, 4.4, 1.6), H.red, 5, 3, 3, true); add(new T.BoxGeometry(1.4, 1.4, 0.3), H.win, 5, 4.4, 3.9, false);
        P.person(g, P.civ(63200), 'tablet', 1, 0.8, 4, Math.PI);
      }
    },
  }));
})();
