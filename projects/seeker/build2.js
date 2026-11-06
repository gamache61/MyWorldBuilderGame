/* ============================================================
   THE SEEKER · BUILD 2 · KEEL
   Keep this file in projects/seeker next to seeker.html.
   The backbone of the lower hull: four keel sections laid
   end to end on the cradle.
   ============================================================ */
(function () {
  const S = window.SEEKER;
  const ids = [-164, -128, -92, -62].map((z, k) => S.part('KEEL' + k, { name: 'KEEL SECTION', at: [0, -16, z],
    make(g, M, THREE) {
      const add = (geo, mat, X, Y, Z) => S.add(THREE, g, geo, mat, X, Y, Z), L = k === 3 ? 38 : 36;
      add(new THREE.BoxGeometry(12, 9, L), M.dark, 0, -16, z);
      for (const sx of [-1, 1]) add(new THREE.BoxGeometry(1.6, 12, L), M.steel, sx * 6.8, -16, z);
      for (let d = -L / 2 + 4; d < L / 2; d += 8) add(new THREE.BoxGeometry(22, 1.2, 1.2), M.steel, 0, -16, z + d);
    } }));
  S.build({ id: 2, name: 'KEEL', brief: 'The backbone of the lower hull. Four keel sections are laid end to end on the cradle.',
    trips: [{ name: 'KEEL SECTIONS', parts: ids }],
    finishLabel: 'WELD THE KEEL', finish: 'weld', flags: ['keel'], status: ['KEEL', 'WELDED'] });
})();
