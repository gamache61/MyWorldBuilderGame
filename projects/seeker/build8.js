/* ============================================================
   THE SEEKER · BUILD 8 · STAR LENS & IMPULSE STRIP
   Keep this file in projects/seeker next to seeker.html.
   The gold star lens in the split of the prow, and the
   impulse strip on the back edge of the main hull.
   ============================================================ */
(function () {
  const S = window.SEEKER;
  const ids = [
    S.part('LENS', { name: 'STAR LENS', at: [0, 2, 158], make(g, M, THREE) {
      S.add(THREE, g, new THREE.SphereGeometry(4.5, 20, 14), M.amber, 0, 2, 158).scale.set(1, 0.6, 1.4);
      S.add(THREE, g, new THREE.TorusGeometry(6, 0.8, 8, 32).rotateY(Math.PI / 2).rotateZ(Math.PI / 2), M.gold, 0, 2, 156);
    } }),
    S.part('IMPULSE', { name: 'IMPULSE STRIP', at: [0, 4, -57], make(g, M, THREE) {
      S.add(THREE, g, new THREE.BoxGeometry(34, 3, 1.2), M.amber, 0, 4, -56.5);
      S.add(THREE, g, new THREE.BoxGeometry(36, 4.4, 1), M.gold, 0, 4, -56);
    } }),
  ];
  S.build({ id: 8, name: 'STAR LENS & IMPULSE STRIP', brief: 'The gold star lens that sits in the split of the prow, and the impulse strip on the back edge of the main hull.',
    trips: [{ name: 'LENS & STRIP', parts: ids }],
    finishLabel: 'FIT THE STAR LENS', finish: 'weld', flags: ['lens'], status: ['STAR LENS', 'FITTED'] });
})();
