/* ============================================================
   THE STARWATCH ARRAY · BUILD 4 · THE BEACON & THE OBSERVATORIES
   Keep this file in projects/starwatcharray next to 54-starwatcharray.html.
   The beacon: a tall mast with a crystal lens that can send a message
   out to the stars, and two observatory domes with telescopes.
   ============================================================ */
(function () {
  const P = window.YARD;
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 4, name: 'THE BEACON & THE OBSERVATORIES',
    brief: 'The beacon, a tall mast with a crystal lens that can send a message to the stars, and two observatory domes.',
    types: {
      BEACONMAST: { code: 'HP', name: 'ANSWERING BEACON', col: '#cfd6dd', w: 24, d: 24, h: 140 },
      OBSERVATORY: { code: 'SY', name: 'OBSERVATORY', col: '#e8e1d1', w: 36, d: 36, h: 34 },
    },
    order: ['BEACONMAST', 'OBSERVATORY'],
    at: { BEACONMAST: [[1550, 110]], OBSERVATORY: [[1550, 320], [1550, -320]] },
    eye: [1100, 220, 480],
    stats(api, c) { return [['ANSWERING BEACON', c('BEACONMAST') ? 'READY' : 'NOT YET'], ['OBSERVATORIES', c('OBSERVATORY') + ' / 2']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, S = P.hm(api), C = P.fun(api);
      const cry = P._cry = P._cry || [0x7ffcff, 0x9f7bff, 0x6dffb0].map(c => new T.MeshStandardMaterial({ color: c, emissive: c, emissiveIntensity: 1.4, roughness: 0.25, transparent: true, opacity: 0.92 }));
      if (type === 'BEACONMAST') {
        add(new T.CylinderGeometry(13, 15, 3, 24), S.stone, 0, 1.5, 0);
        add(new T.CylinderGeometry(3.4, 6, 100, 14), F.white, 0, 52, 0);
        for (const y of [20, 45, 70, 92]) add(new T.CylinderGeometry(5.6 - y * 0.03, 5.6 - y * 0.03, 1.4, 14), C.yellow, 0, y, 0);
        for (let i = 0; i < 3; i++) { const a = i / 3 * Math.PI * 2; add(new T.BoxGeometry(1.2, 80, 1.2), F.steel, Math.cos(a) * 9, 38, Math.sin(a) * 9).rotation.set(-Math.sin(a) * 0.1, 0, Math.cos(a) * 0.1); }
        add(new T.CylinderGeometry(8, 3.4, 8, 14), F.dark, 0, 106, 0);
        const lens = add(new T.OctahedronGeometry(10), cry[1], 0, 122, 0); lens.scale.set(0.9, 1.6, 0.9); lens.castShadow = false;
        for (const r of [14, 19]) { const ring = add(new T.TorusGeometry(r, 0.5, 8, 40), cry[r > 15 ? 0 : 2], 0, 122, 0); ring.rotation.x = Math.PI / 2 + (r > 15 ? 0.3 : -0.25); ring.castShadow = false; }
        P.sign(api, g, 'ANSWERING BEACON', 18, 3, 0, 4, 16, 0, '#14324a', '#c8b0ff', true);
        P.person(g, P.civ(54400), 'tablet', 14, 1.5, 12, Math.PI);
      } else {
        add(new T.CylinderGeometry(19, 20, 2, 28), S.gravel, 0, 1, 0);
        add(new T.CylinderGeometry(15, 15, 16, 28), F.white, 0, 10, 0);
        const dome = add(new T.SphereGeometry(15.4, 28, 14, 0, Math.PI * 2, 0, Math.PI / 2), new T.MeshStandardMaterial({ color: 0xf0f3f6, roughness: 0.3, metalness: 0.3 }), 0, 18, 0);
        add(new T.BoxGeometry(5, 15, 0.6), F.dark, 0, 24, 14.2).rotation.x = -0.1;
        const tube = add(new T.CylinderGeometry(1.2, 1.6, 14, 12), F.steel, 0, 28, 8); tube.rotation.x = -1.0;
        add(new T.BoxGeometry(6, 4, 5), S.slate, 20, 2, 6);
        P.person(g, P.civ(54450 + k), 'idle', 24, 1, 12, Math.PI);
      }
    },
  }));
})();
