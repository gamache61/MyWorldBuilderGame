/* ============================================================
   THE COUNCIL HALL · BUILD 7 · THE COUNCIL RING
   Keep this file in projects/councilhall next to councilhall.html.
   The round speaking floor in the middle of the hall, ringed in
   gold, and twelve high-backed chairs for the Unity Council.
   Build 7 ends when you call the council (press L).
   ============================================================ */
(function () {
  const K = KRYOS, PS = K.PS, TAU = Math.PI * 2;
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(K.cityBuild({
    id: 7, name: 'THE COUNCIL RING',
    brief: 'The round speaking floor ringed in gold, and twelve high-backed chairs in a circle round it for the heads of the Unity Council.',
    finishLabel: 'CALL THE COUNCIL', flags: ['ccouncil'], status: ['COUNCIL RING', 'READY'],
    finishCam: [[K.HX, K.HZ], 160], lookUp: 8,
    parts: {
      CFLOOR: { name: 'SPEAKING FLOOR', code: 'SF', col: '#6c757d', h: 4, count: 1, at: () => [K.HX, K.HZ], eye: (k, V) => V(0, 70, 110),
        make(g, k, M, THREE) { const S = K.hallMats(THREE); K.add(THREE, g, new THREE.CylinderGeometry(53, 53, 1.2, 64), S.white, 0, 7, 0); K.add(THREE, g, new THREE.TorusGeometry(48, 0.8, 6, 96).rotateX(Math.PI / 2), S.gold, 0, 7.7, 0); } },
      CTHRONE: { name: 'COUNCIL CHAIR', code: 'SY', col: '#e8e1d1', h: 14, count: 12, at: () => [K.HX, K.HZ], eye: (k, V) => V(0, 60, 100),
        make(g, i, M, THREE) {
          const S = K.hallMats(THREE), a = i / 12 * TAU + Math.PI / 12, ch = new THREE.Group();
          ch.position.set(Math.cos(a) * K.COUNCIL_R, 7.6, Math.sin(a) * K.COUNCIL_R); ch.rotation.y = Math.atan2(-Math.cos(a), -Math.sin(a)); g.add(ch);
          for (const [w, h, d, x, y, z] of K.THRONE_BOXES) K.add(THREE, ch, new THREE.BoxGeometry(w * PS, h * PS, d * PS), S.throne, x * PS, y * PS, z * PS);
          K.add(THREE, ch, new THREE.BoxGeometry(0.06 * PS, 0.9 * PS, 0.03 * PS), S.gold, 0, 1.1 * PS, -0.36 * PS);
        } },
    },
    trips: [{ name: 'COUNCIL RING', parts: ['CFLOOR', 'CTHRONE'] }],
  }));
})();
