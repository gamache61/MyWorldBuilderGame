/* ============================================================
   THE SEEKER · BUILD 5 · MAIN HULL · BOTTOM LAYER
   Keep this file in projects/seeker next to 01-seeker.html.
   The big arrowhead hull with its split prow, in eight
   sections: four at the back, then four at the front.
   ============================================================ */
(function () {
  const S = window.SEEKER;
  const bands = [[-80, 0, 40, -30], [0, 60, 50, 30], [60, 120, 40, 90], [120, 190, 14, 145]];
  const ids = [];
  bands.forEach(([z0, z1, x, zc], b) => { for (const side of [-1, 1]) ids.push(S.part('HULL1_' + b + (side < 0 ? 'P' : 'S'), { name: 'HULL SECTION', at: [side * x, 0, zc],
    make(g, M, THREE) { S.hullPiece(THREE, g, 0, z0, z1, side); } })); });
  S.build({ id: 5, name: 'MAIN HULL · BOTTOM LAYER', brief: 'The great arrowhead hull with its split prow. Eight sections: four at the back first, then four at the front.',
    trips: [{ name: 'BACK SECTIONS', parts: ids.slice(0, 4) }, { name: 'FRONT SECTIONS', parts: ids.slice(4) }],
    finishLabel: 'WELD THE MAIN HULL', finish: 'weld', flags: ['hull1'], status: ['MAIN HULL', 'WELDED'] });
})();
