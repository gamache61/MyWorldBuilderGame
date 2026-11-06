/* ============================================================
   THE ANIMAL CARE CENTRE · BUILD 4 · THE RANGER STATION & THE AVIARY
   Keep this file in projects/animalcare next to animalcare.html.
   The ranger station, home of the rangers who keep the wild animals
   safe and lead them gently out of the fields, and a great netted
   aviary where hurt birds learn to fly again.
   ============================================================ */
(function () {
  const P = window.VET;
  P.birds = P.birds || [];
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 4, name: 'THE RANGER STATION & THE AVIARY',
    brief: 'The ranger station for the rangers who keep the wild animals safe, and a great netted aviary where hurt birds learn to fly again.',
    types: {
      RANGERS: { code: 'SY', name: 'RANGER STATION', col: '#8fe8ff', w: 60, d: 40, h: 20 },
      AVIARY:  { code: 'HP', name: 'AVIARY', col: '#b03a2e', w: 80, d: 80, h: 34 },
    },
    order: ['RANGERS', 'AVIARY'],
    at: { RANGERS: [[1090, 75]], AVIARY: [[1335, -190]] },
    eye: [-260, 220, 300],
    stats(api, c) { return [['RANGER STATION', c('RANGERS') ? 'OPEN' : 'NOT YET'], ['RANGERS', c('RANGERS') * 24], ['AVIARY', c('AVIARY') ? 'OPEN' : 'NOT YET']]; },
    make(type, k, g, add, F, api) {
      const T = api.THREE, S = P.hm(api), C = P.fun(api);
      if (type === 'RANGERS') {
        add(new T.BoxGeometry(60, 0.6, 40), S.stone, 0, 0.3, 0);
        // a timber lodge with a lookout tower, two ranger pods and a map board
        add(new T.BoxGeometry(34, 9, 18), S.timber, -8, 5, -6);
        add(new T.CylinderGeometry(13, 13, 35, 3).rotateZ(Math.PI / 2).rotateX(-Math.PI / 2), S.roofGreen, -8, 12.5, -6).scale.y = 0.45;
        for (let i = 0; i < 4; i++) add(new T.BoxGeometry(5, 3, 0.3), S.dim, -20 + i * 8, 5.4, 3.1, false);
        for (const [x, z] of [[17, -12], [25, -12], [17, -4], [25, -4]]) add(new T.BoxGeometry(0.8, 20, 0.8), S.timber, x, 10, z);
        add(new T.BoxGeometry(11, 5, 11), S.timber, 21, 22, -8); add(new T.ConeGeometry(8.5, 4, 4), S.roofGreen, 21, 26.5, -8).rotation.y = Math.PI / 4;
        for (const x of [-20, -4]) { const pod = add(new T.CapsuleGeometry(2.4, 6, 6, 12).rotateZ(Math.PI / 2), F.white, x, 3, 13); pod.scale.z = 0.8; add(new T.BoxGeometry(8, 0.5, 4), C.green, x, 3, 13); }
        add(new T.BoxGeometry(8, 5, 0.4), S.board, 14, 4, 12); P.figure(api, add, 12, 0.6, 14, 1, 2); P.figure(api, add, 16, 0.6, 14, 1, 5);
        P.sign(api, g, 'RANGER STATION', 16, 2.2, -8, 8.2, 3.2, 0, '#3a2a1a', '#e8d8b0', false);
        P.person(g, P.civ(20200), 'gesture', 14, 0.6, 9, Math.PI);
      } else if (type === 'AVIARY') {
        add(new T.CylinderGeometry(40, 40, 0.6, 40), C.grass, 0, 0.3, 0);
        // a tall net dome on a ring of posts, with trees, perches and a little stream inside
        const net = new T.MeshStandardMaterial({ color: 0xdfe8ee, wireframe: true, transparent: true, opacity: 0.35 });
        add(new T.SphereGeometry(36, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2), net, 0, 0.6, 0, false);
        for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; add(new T.CylinderGeometry(0.5, 0.5, 6, 6), F.steel, Math.cos(a) * 36, 3, Math.sin(a) * 36); }
        add(new T.CylinderGeometry(1, 1.2, 36, 8), F.steel, 0, 18, 0);
        for (let i = 0; i < 5; i++) { const a = i * 1.3, r = 16; add(new T.CylinderGeometry(0.7, 1, 10, 6), F.wood, Math.cos(a) * r, 5, Math.sin(a) * r); add(new T.IcosahedronGeometry(5.5, 1), F.crops[i % 5], Math.cos(a) * r, 13, Math.sin(a) * r); }
        add(new T.BoxGeometry(50, 0.3, 4), F.water, 0, 0.8, 22, false);
        const flock = new T.Group(); flock.userData.keep = true; g.add(flock); P.flock = flock;
        for (let i = 0; i < 14; i++) { const b = P.animal(api, add, flock, 'bird', 0, 0, 0, 0, 2.2); P.birds.push({ b, r: 8 + (i % 5) * 4, h: 10 + (i % 4) * 4, ph: i * 0.45, sp: 0.6 + (i % 3) * 0.25 }); }
        P.sign(api, g, 'THE AVIARY', 12, 2, 0, 3.4, 40.4, 0, '#3a2a1a', '#e8d8b0', false);
        P.figure(api, add, 4, 0.6, 42, 1, 1); P.figure(api, add, 7, 0.6, 42, 0.6, 2);
      }
    },
    tick(api, dt, t) { for (const q of P.birds) { const a = q.ph + t * q.sp; q.b.position.set(Math.cos(a) * q.r, q.h + Math.sin(t * 2 + q.ph) * 1.5, Math.sin(a) * q.r); q.b.rotation.y = -a; q.b.children[1] && (q.b.children[1].scale.x = 0.6 + Math.abs(Math.sin(t * 9 + q.ph)) * 0.6); } },
  }));
})();
