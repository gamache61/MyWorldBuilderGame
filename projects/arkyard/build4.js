/* ============================================================
   AEGIS ARK · BUILD 4 · STERN HULL
   Keep this file in projects/ark next to arkyard.html.
   The back of the ship: two stern hull sections and the
   stern cap the engines will bolt to.
   ============================================================ */
(function () {
  const S = window.SHIPYARD;
  const ids = [
    S.part('STERN0', { name: 'STERN SECTION', at: [0, 0, -106], make(g, M, THREE) { S.mesh(THREE, S.loft(THREE, -132, S.BAY_BACK, 10), M.hull, g); S.mesh(THREE, S.cap(THREE, S.BAY_BACK), M.hull, g); } }),
    S.part('STERN1', { name: 'STERN SECTION', at: [0, 0, -158], make(g, M, THREE) { S.mesh(THREE, S.loft(THREE, S.AFT, -132, 10), M.hull, g); } }),
    S.part('STERNCAP', { name: 'STERN CAP', at: [0, 0, -185], make(g, M, THREE) { S.mesh(THREE, S.cap(THREE, S.AFT), M.dark, g); } }),
  ];
  S.build({ id: 4, name: 'STERN HULL', brief: 'The back of the Ark: two stern hull sections, then the stern cap that the engines will bolt on to.',
    trips: [{ name: 'STERN SECTIONS', parts: ids.slice(0, 2) }, { name: 'STERN CAP', parts: ids.slice(2) }],
    finishLabel: 'WELD THE STERN', finish: 'weld', flags: ['stern'], status: ['STERN', 'WELDED'] });
})();
