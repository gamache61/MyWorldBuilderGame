/* ============================================================
   THE STARWATCH ARRAY · BUILD 3 · THE LISTENING HALL & THE VISITORS' DOME
   Keep this file in projects/starwatcharray next to 54-starwatcharray.html.
   The listening hall in the middle of the ring, where the listeners
   turn what the dishes hear into sound and pictures, and a dome where
   visitors and the schools come to see the sky.
   ============================================================ */
(function () {
  const P = window.YARD;
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 3, name: 'THE LISTENING HALL & THE VISITORS’ DOME',
    brief: 'The listening hall at the heart of the ring, and a dome where visitors and the schools come to see the sky.',
    types: {
      LISTENHALL: { code: 'SY', name: 'LISTENING HALL', col: '#e8e1d1', w: 90, d: 70, h: 30 },
      SKYDOME: { code: 'SY', name: 'VISITORS’ DOME', col: '#e8e1d1', w: 60, d: 60, h: 36 },
    },
    order: ['LISTENHALL', 'SKYDOME'],
    at: { LISTENHALL: [[1550, 0]], SKYDOME: [[1550, -110]] },
    eye: [1150, 160, 360],
    stats(api, c) { return [['LISTENING HALL', c('LISTENHALL') ? 'LISTENING' : 'NOT YET'], ['VISITORS’ DOME', c('SKYDOME') ? 'OPEN' : 'NOT YET']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, S = P.hm(api), C = P.fun(api);
      const cry = P._cry = P._cry || [0x7ffcff, 0x9f7bff, 0x6dffb0].map(c => new T.MeshStandardMaterial({ color: c, emissive: c, emissiveIntensity: 1.4, roughness: 0.25, transparent: true, opacity: 0.92 }));
      if (type === 'LISTENHALL') {
        add(new T.BoxGeometry(92, 1, 72), S.gravel, 0, 0.5, 0);
        add(new T.BoxGeometry(80, 18, 56), F.white, 0, 10, 0);
        const roof = add(new T.CylinderGeometry(34, 34, 82, 3, 1).rotateZ(Math.PI / 2), S.slate, 0, 21, 0); roof.scale.set(1, 0.32, 1.1);
        for (let x = -30; x <= 30; x += 15) add(new T.BoxGeometry(10, 9, 0.4), S.glass, x, 11, 28.2);
        // a wall of screens and a stage of listening desks seen through the glass
        add(new T.BoxGeometry(70, 7, 0.6), cry[0], 0, 14, -27.6).castShadow = false;
        for (let i = 0; i < 6; i++) add(new T.BoxGeometry(8, 1.6, 4), F.dark, -25 + i * 10, 3.4, -4);
        P.sign(api, g, 'LISTENING HALL · QUIET PLEASE', 34, 3.4, 0, 24, 28.6, 0, '#14324a', '#c8b0ff', true);
        for (let i = 0; i < 3; i++) P.person(g, P.civ(54200 + i), i % 2 ? 'tablet' : 'idle', -12 + i * 12, 1, 36, Math.PI);
      } else {
        add(new T.CylinderGeometry(31, 32, 2, 32), S.gravel, 0, 1, 0);
        add(new T.CylinderGeometry(26, 26, 8, 32), F.white, 0, 6, 0);
        const dome = add(new T.SphereGeometry(26, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2), new T.MeshStandardMaterial({ color: 0xe4eaf0, roughness: 0.3, metalness: 0.2 }), 0, 10, 0);
        add(new T.BoxGeometry(8, 8, 0.6), S.glass, 0, 6, 26.4);
        for (let i = 0; i < 10; i++) { const a = i / 10 * Math.PI * 2; const s = add(new T.SphereGeometry(0.7, 8, 6), cry[i % 3], Math.cos(a) * 25.4, 6.4, Math.sin(a) * 25.4); s.castShadow = false; }
        P.sign(api, g, 'COME & SEE THE SKY', 22, 3, 0, 4, 28, 0, '#14324a', '#ffe9b8', true);
        for (let i = 0; i < 4; i++) P.person(g, i === 2 ? P.kid(54300 + i) : P.civ(54300 + i), 'idle', -10 + i * 7, 1, 36, Math.PI);
      }
    },
  }));
})();
