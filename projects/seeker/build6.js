/* ============================================================
   THE SEEKER · BUILD 6 · MAIN HULL · MIDDLE LAYER
   Keep this file in projects/seeker next to seeker.html.
   The second layer of the main hull, with its rows of
   cabin windows.
   ============================================================ */
(function () {
  const S = window.SEEKER;
  const ids = [];
  [[-80, 40, 38, -10], [40, 190, 26, 80]].forEach(([z0, z1, x, zc], b) => { for (const side of [-1, 1]) ids.push(S.part('HULL2_' + b + (side < 0 ? 'P' : 'S'), { name: 'DECK SECTION', at: [side * x, 9, zc],
    make(g, M, THREE) { S.hullPiece(THREE, g, 1, z0, z1, side); } })); });
  S.build({ id: 6, name: 'MAIN HULL · MIDDLE LAYER', brief: 'The second layer of the main hull: crew cabins, labs and lounges, with rows of windows all round.',
    trips: [{ name: 'DECK SECTIONS', parts: ids }],
    finishLabel: 'WELD THE DECKS', finish: 'weld', flags: ['hull2'], status: ['CREW DECKS', 'WELDED'] });
})();
