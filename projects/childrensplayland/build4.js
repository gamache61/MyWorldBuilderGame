/* ============================================================
   THE CHILDREN'S PLAYLAND · BUILD 4 · THE BIG WHEEL & THE SPORTS FIELDS
   Keep this file in projects/childrensplayland next to childrensplayland.html.
   A big wheel with sixteen bright cabins, tall enough to see the
   whole of Kryos from the top, and two sports fields with goals,
   lines and stands for cheering families.
   ============================================================ */
(function () {
  const P = window.PLAY;
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 4, name: 'THE BIG WHEEL & THE SPORTS FIELDS',
    brief: 'A big wheel with sixteen bright cabins, tall enough to see all of Kryos from the top, and two sports fields with goals and stands.',
    types: {
      BIGWHEEL:    { code: 'HP', name: 'BIG WHEEL', col: '#2f7fe0', w: 30, d: 76, h: 76 },
      SPORTSFIELD: { code: 'GD', name: 'SPORTS FIELD', col: '#5aa64a', w: 90, d: 150, h: 6 },
    },
    order: ['BIGWHEEL', 'SPORTSFIELD'],
    at: { BIGWHEEL: [[500, -180]], SPORTSFIELD: [[830, -100], [830, 100]] },
    eye: [-240, 220, 360],
    stats(api, c) { return [['BIG WHEEL', c('BIGWHEEL') ? 'TURNING' : 'NOT YET'], ['SPORTS FIELDS', c('SPORTSFIELD') + ' / 2']]; },
    make(type, k, g, add, F, api) {
      const T = api.THREE, C = P.fun(api);
      if (type === 'BIGWHEEL') {
        const R = 32, HY = 38;
        add(new T.BoxGeometry(30, 1, 40), F.stoneDark, 0, 0.5, 0);
        for (const x of [-7, 7]) for (const s of [-1, 1]) { const leg = add(new T.BoxGeometry(1.6, 42, 1.6), F.white, x, HY / 2, s * 11); leg.rotation.x = -s * 0.28; }
        add(new T.CylinderGeometry(1.4, 1.4, 16, 12).rotateZ(Math.PI / 2), F.steel, 0, HY, 0);
        const wheel = new T.Group(); wheel.position.y = HY; wheel.userData.keep = true; g.add(wheel); P.wheel = wheel;
        for (const x of [-3, 3]) { add(new T.TorusGeometry(R, 0.5, 6, 64).rotateY(Math.PI / 2), C.blue, x, 0, 0, true, wheel); add(new T.TorusGeometry(R * 0.55, 0.3, 6, 48).rotateY(Math.PI / 2), C.blue, x, 0, 0, true, wheel); }
        for (let i = 0; i < 16; i++) { const a = i / 16 * Math.PI * 2; for (const x of [-3, 3]) { const sp = add(new T.BoxGeometry(0.3, R, 0.3), F.white, x, Math.sin(a) * R / 2, Math.cos(a) * R / 2, false, wheel); sp.rotation.x = -a + Math.PI / 2; } add(new T.SphereGeometry(0.5, 6, 4), F.lamp, 3.4, Math.sin(a) * R, Math.cos(a) * R, false, wheel); }
        // the cabins hang level while the wheel turns
        P.cabins = [];
        const cols = ['red', 'yellow', 'green', 'purple', 'orange', 'pink', 'blue', 'red'];
        for (let i = 0; i < 16; i++) {
          const a = i / 16 * Math.PI * 2, cab = new T.Group(); cab.position.set(0, Math.sin(a) * R, Math.cos(a) * R); wheel.add(cab); P.cabins.push(cab);
          add(new T.BoxGeometry(4.4, 3.4, 4), C[cols[i % 8]], 0, -2.6, 0, true, cab); add(new T.BoxGeometry(4.6, 0.4, 4.2), F.white, 0, -0.8, 0, true, cab);
          add(new T.BoxGeometry(4.5, 1.4, 3.2), F.glass, 0, -2.2, 0, false, cab); add(new T.BoxGeometry(0.3, 1, 0.3), F.steel, 0, -0.3, 0, false, cab);
        }
        for (let i = 0; i < 5; i++) P.figure(api, add, -4 + i * 2, 1, 22, i % 2 ? 1 : 0.6, i);
      } else if (type === 'SPORTSFIELD') {
        add(new T.BoxGeometry(90, 0.6, 150), C.grass, 0, 0.3, 0);
        const line = (w, d, x, z) => add(new T.BoxGeometry(w, 0.1, d), F.white, x, 0.66, z, false);
        line(70, 0.6, 0, -65); line(70, 0.6, 0, 65); line(0.6, 130, -35, 0); line(0.6, 130, 35, 0); line(70, 0.6, 0, 0);
        add(new T.TorusGeometry(9, 0.3, 4, 40).rotateX(Math.PI / 2), F.white, 0, 0.66, 0, false);
        for (const s of [-1, 1]) { line(24, 0.6, 0, s * 53); line(0.6, 12, -12, s * 59); line(0.6, 12, 12, s * 59);
          for (const x of [-6, 6]) add(new T.BoxGeometry(0.5, 4, 0.5), F.white, x, 2.6, s * 65); add(new T.BoxGeometry(12.5, 0.5, 0.5), F.white, 0, 4.6, s * 65); add(new T.BoxGeometry(12, 4, 0.1), F.glass, 0, 2.6, s * 67, false); }
        // a stand for the families along one side
        for (let r = 0; r < 4; r++) add(new T.BoxGeometry(2.4, 1, 100), k ? C.blue : C.red, -41 - r * 2.4, 0.5 + r, 0);
        add(new T.SphereGeometry(0.6, 10, 8), F.white, 5, 1.2, 8);
        for (let i = 0; i < 1; i++) P.person(g, P.kid(13600 + k * 20 + i), 'walk', 0, 0.6, 0, 0, { scale: 0.65, path: { type: 'line', ax: -25 + (i % 5) * 12, az: -50 + (i % 2) * 20, bx: -20 + (i % 5) * 10, bz: 40 - (i % 3) * 15, speed: 2 + (i % 3) * 0.4 } });
        for (let i = 0; i < 9; i++) P.figure(api, add, (i % 4 - 1.5) * 14, 0.6, -40 + (i % 3) * 35 + (i % 2) * 8, 0.65, i + k);
        for (let i = 0; i < 12; i++) P.figure(api, add, -42 - (i % 3) * 2.4, 1 + (i % 3), -40 + i * 7, 1, i * 3 + k);
      }
    },
    tick(api, dt) {
      if (P.wheel) { P.wheel.rotation.x += dt * (P.fast ? 0.12 : 0.05); for (const c of P.cabins || []) c.rotation.x = -P.wheel.rotation.x; }
    },
  }));
})();
