/* ============================================================
   AEGIS ARK · BUILD 2 · KEEL & BAY FRAME
   Keep this file in projects/ark next to arkyard.html.
   The red keel that runs the whole length of the ship, and
   the floor and frame of the big cargo bay.
   ============================================================ */
(function () {
  const S = window.SHIPYARD;
  const ids = [
    S.part('KEEL', { name: 'KEEL', at: [0, -14.5, 0], make(g, M, THREE) {
      const pts = []; for (let z = S.AFT; z <= S.NOSE - 6; z += 3) pts.push(S.sp(THREE, [0, -14], z).add(new THREE.Vector3(0, -0.3, 0)));
      S.mesh(THREE, new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 200, 0.8, 6), M.red, g);
      S.mesh(THREE, new THREE.BoxGeometry(6, 2, S.BAY_FRONT - S.BAY_BACK + 160), M.dark, g, 0, -12.5, -10);
    } }),
    S.part('BAYFLOOR', { name: 'BAY FLOOR', at: [0, -8.8, -10], make(g, M, THREE) {
      S.mesh(THREE, new THREE.BoxGeometry(47.6, 0.4, S.BAY_FRONT - S.BAY_BACK - 1), M.dark, g, 0, -8.8, (S.BAY_FRONT + S.BAY_BACK) / 2);
      S.mesh(THREE, new THREE.BoxGeometry(48, 4, S.BAY_FRONT - S.BAY_BACK - 1), M.gun, g, 0, -11.2, (S.BAY_FRONT + S.BAY_BACK) / 2);
    } }),
    S.part('BAYFRAME', { name: 'BAY FRAME', at: [0, 1, -10], make(g, M, THREE) {
      const L = S.BAY_FRONT - S.BAY_BACK, zc = (S.BAY_FRONT + S.BAY_BACK) / 2;
      for (let z = S.BAY_BACK + 5; z < S.BAY_FRONT; z += 10) for (const s of [-1, 1]) S.mesh(THREE, new THREE.BoxGeometry(1.2, 20, 1.2), M.gun, g, s * 23.4, 1, z);
      for (const s of [-1, 1]) {
        S.mesh(THREE, new THREE.BoxGeometry(0.3, 0.5, L - 2), M.warm, g, s * 23.7, 9.5, zc);
        S.mesh(THREE, new THREE.BoxGeometry(0.3, 0.3, L - 2), M.warm, g, s * 23.7, -7.5, zc);
        S.mesh(THREE, new THREE.BoxGeometry(1.5, 1.5, L - 1), M.yellow, g, s * 23, 11, zc);
      }
    } }),
  ];
  S.build({ id: 2, name: 'KEEL & BAY FRAME', brief: 'The red keel that runs the whole length of the ship, then the floor and frame of the big cargo bay where every load will ride.',
    trips: [{ name: 'KEEL & BAY FRAME', parts: ids }],
    finishLabel: 'WELD THE KEEL', finish: 'weld', flags: ['keel'], status: ['KEEL', 'WELDED'] });
})();
