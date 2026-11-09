/* ============================================================
   THE SEEKER · BUILD 4 · NECK & KEEL FIN
   Keep this file in projects/seeker next to 01-seeker.html.
   The neck that will hold up the main hull, and the keel fin
   under the lower hull.
   ============================================================ */
(function () {
  const S = window.SEEKER;
  const ids = [
    S.part('NECK', { name: 'NECK', at: [0, -10, -48], make(g, M, THREE) {
      S.add(THREE, g, new THREE.BoxGeometry(22, 14, 50), M.hull, 0, -10, -48);
      for (const sx of [-1, 1]) S.add(THREE, g, new THREE.BoxGeometry(0.6, 1.6, 40), M.win, sx * 11.1, -8, -48);
    } }),
    S.part('KFIN', { name: 'KEEL FIN', at: [0, -32, -120], make(g, M, THREE) {
      const s = new THREE.Shape(); s.moveTo(0, 0); s.lineTo(70, 0); s.lineTo(40, -14); s.lineTo(8, -10); s.lineTo(0, 0);
      const geo = new THREE.ExtrudeGeometry(s, { depth: 1.6, bevelEnabled: false }); geo.translate(0, 0, -0.8); geo.rotateY(-Math.PI / 2);
      S.add(THREE, g, geo, M.dark, 0, -26, -150);
    } }),
  ];
  S.build({ id: 4, name: 'NECK & KEEL FIN', brief: 'The neck that will carry the main hull, and the keel fin that runs under the lower hull.',
    trips: [{ name: 'NECK & KEEL FIN', parts: ids }],
    finishLabel: 'WELD THE NECK', finish: 'weld', flags: ['neck'], status: ['NECK', 'WELDED'] });
})();
