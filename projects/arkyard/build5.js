/* ============================================================
   AEGIS ARK · BUILD 5 · BOW HULL
   Keep this file in projects/ark next to arkyard.html.
   The long pointed bow, in three sections from the cargo
   bay out to the nose.
   ============================================================ */
(function () {
  const S = window.SHIPYARD;
  const Z = [S.BAY_FRONT, 107, 154, S.NOSE];
  const ids = [0, 1, 2].map(k => S.part('BOW' + k, { name: 'BOW SECTION', at: [0, k * -0.5, (Z[k] + Z[k + 1]) / 2], make(g, M, THREE) {
    S.mesh(THREE, S.loft(THREE, Z[k], Z[k + 1], 20), M.hull, g);
    if (k === 0) S.mesh(THREE, S.cap(THREE, S.BAY_FRONT), M.hull, g);
  } }));
  S.build({ id: 5, name: 'BOW HULL', brief: 'The long pointed bow of the Ark, in three sections from the cargo bay out to the nose.',
    trips: [{ name: 'BOW SECTIONS', parts: ids }],
    finishLabel: 'WELD THE BOW', finish: 'weld', flags: ['bow'], status: ['BOW', 'WELDED'] });
})();
