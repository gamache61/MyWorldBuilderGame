/* ============================================================
   THE CHILDREN'S PLAYLAND · BUILD 3 · THE SPLASH POND & THE CAROUSEL
   Keep this file in projects/childrensplayland next to childrensplayland.html.
   A shallow splash pond with fountains and a water slide, a bright
   carousel that turns in the middle of the playland, and a snack bar.
   ============================================================ */
(function () {
  const P = window.PLAY;
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 3, name: 'THE SPLASH POND & THE CAROUSEL',
    brief: 'A shallow splash pond with fountains and a water slide, a bright carousel that turns in the middle of the playland, and a snack bar.',
    types: {
      SPLASH:   { code: 'WR', name: 'SPLASH POND', col: '#3f86b0', w: 80, d: 70, h: 12 },
      CAROUSEL: { code: 'GD', name: 'CAROUSEL', col: '#f06aa8', w: 36, d: 36, h: 16 },
      SNACKBAR: { code: 'SY', name: 'SNACK BAR', col: '#e8e1d1', w: 24, d: 16, h: 8 },
    },
    order: ['SPLASH', 'CAROUSEL', 'SNACKBAR'],
    at: { SPLASH: [[500, 170]], CAROUSEL: [[500, 0]], SNACKBAR: [[660, 0]] },
    eye: [-240, 200, 340],
    stats(api, c) { return [['SPLASH POND', c('SPLASH') ? 'FULL' : 'NOT YET'], ['CAROUSEL', c('CAROUSEL') ? 'TURNING' : 'NOT YET'], ['SNACK BAR', c('SNACKBAR') ? 'OPEN' : 'NOT YET']]; },
    make(type, k, g, add, F, api) {
      const T = api.THREE, C = P.fun(api);
      if (type === 'SPLASH') {
        add(new T.BoxGeometry(80, 0.6, 70), F.stone, 0, 0.3, 0);
        add(new T.CylinderGeometry(30, 30, 0.8, 40), F.white, 0, 0.6, 0); add(new T.CylinderGeometry(28.5, 28.5, 0.4, 40), F.water, 0, 1, 0, false);
        // fountains: jets of water round a centre spray
        const jet = new T.MeshStandardMaterial({ color: 0xcfefff, transparent: true, opacity: 0.55, roughness: 0.1 });
        add(new T.CylinderGeometry(0.4, 1.2, 9, 10), jet, 0, 5.5, 0, false); add(new T.SphereGeometry(2.2, 12, 8), jet, 0, 10, 0, false);
        for (let i = 0; i < 10; i++) { const a = i / 10 * Math.PI * 2; add(new T.CylinderGeometry(0.15, 0.4, 4, 6), jet, Math.cos(a) * 12, 3, Math.sin(a) * 12, false); }
        // a little water slide into the pond, and mushroom showers
        add(new T.BoxGeometry(6, 8, 6), C.blue, 22, 4, -18); const sl = add(new T.BoxGeometry(3.4, 0.5, 14), C.yellow, 16, 4, -12); sl.rotation.y = 0.8; sl.rotation.x = 0.5;
        for (const [x, z, c] of [[-14, 10, 'pink'], [-8, 18, 'orange'], [6, 16, 'green']]) { add(new T.CylinderGeometry(0.4, 0.4, 5, 8), F.white, x, 3.5, z); add(new T.SphereGeometry(3, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2), C[c], x, 6, z); }
        for (let i = 0; i < 1; i++) P.person(g, P.kid(13200 + i), 'walk', 0, 1, 0, 0, { scale: 0.6, path: { type: 'circle', cx: 0, cz: 0, r: 8 + (i % 4) * 4, speed: 1.3 + (i % 3) * 0.3 } });
        for (const s of [-1, 1]) add(new T.BoxGeometry(6, 0.5, 1.4), F.wood, s * 36, 1.4, -30);
        for (let i = 0; i < 8; i++) { const a = i * 0.8, r = 6 + (i % 4) * 5; P.figure(api, add, Math.cos(a) * r, 1, Math.sin(a) * r, 0.6, i); }
      } else if (type === 'CAROUSEL') {
        add(new T.CylinderGeometry(18, 18, 1.2, 40), F.stoneDark, 0, 0.6, 0);
        const spin = new T.Group(); spin.position.y = 1.2; spin.userData.keep = true; g.add(spin); P.carousel = spin;
        add(new T.CylinderGeometry(15, 15, 1, 40), C.yellow, 0, 0.5, 0, true, spin);
        add(new T.CylinderGeometry(1.6, 1.6, 11, 12), F.gold, 0, 6, 0, true, spin);
        add(new T.ConeGeometry(17, 5, 24), C.red, 0, 13.5, 0, true, spin);
        add(new T.CylinderGeometry(17, 17, 1.6, 24, 1, true), C.blue, 0, 10.6, 0, true, spin);
        for (let i = 0; i < 24; i++) { const a = i / 24 * Math.PI * 2; add(new T.SphereGeometry(0.4, 6, 4), F.lamp, Math.cos(a) * 17.1, 10.6, Math.sin(a) * 17.1, false, spin); }
        add(new T.SphereGeometry(1.2, 10, 8), F.gold, 0, 16.5, 0, true, spin);
        // twelve riding animals on poles, each a bright colour
        const cols = ['red', 'blue', 'green', 'purple', 'orange', 'pink'];
        for (let i = 0; i < 12; i++) {
          const a = i / 12 * Math.PI * 2, r = i % 2 ? 9 : 12.5, x = Math.cos(a) * r, z = Math.sin(a) * r, y = 3.4 + (i % 3) * 0.6;
          add(new T.CylinderGeometry(0.15, 0.15, 9, 6), F.gold, x, 5.5, z, false, spin);
          const body = add(new T.CapsuleGeometry(0.9, 2.4, 4, 8).rotateZ(Math.PI / 2), C[cols[i % 6]], x, y, z, true, spin); body.rotation.y = -a;
          add(new T.SphereGeometry(0.75, 8, 6), C[cols[(i + 2) % 6]], x - Math.sin(a) * 1.9, y + 1, z + Math.cos(a) * 1.9, true, spin);
          if (i % 3 === 0) P.figure(api, add, x, y + 0.3, z, 0.6, i, spin);
        }
      } else if (type === 'SNACKBAR') {
        add(new T.BoxGeometry(24, 0.6, 16), F.stone, 0, 0.3, 0);
        add(new T.BoxGeometry(18, 6, 10), F.white, 0, 3.6, -1);
        add(new T.BoxGeometry(14, 2.6, 0.2), F.lamp, 0, 4.6, 4.05, false);
        for (let i = 0; i < 6; i++) add(new T.BoxGeometry(3.2, 0.6, 3), i % 2 ? C.red : F.white, -8 + i * 3.2, 7.4, 5, true).rotation.x = 0.4;
        for (const x of [-8, 0, 8]) { add(new T.CylinderGeometry(1.6, 1.6, 0.2, 12), F.white, x, 2.4, 9); add(new T.CylinderGeometry(0.15, 0.15, 2.2, 6), F.steel, x, 1.4, 9); add(new T.ConeGeometry(2.4, 1.4, 10), C.yellow, x, 5.4, 9); add(new T.CylinderGeometry(0.08, 0.08, 3, 4), F.steel, x, 4, 9); }
        P.person(g, P.civ(13400), 'gesture', 0, 0.6, 2.6, 0);
        P.figure(api, add, -3, 0.6, 6.5, 0.6, 1); P.figure(api, add, 2, 0.6, 6.8, 0.6, 2);
      }
    },
    tick(api, dt) { if (P.carousel) P.carousel.rotation.y += dt * (P.fast ? 0.9 : 0.35); },
  }));
})();
