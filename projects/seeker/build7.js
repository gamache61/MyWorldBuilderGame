/* ============================================================
   THE SEEKER · BUILD 7 · TOP LAYER & BRIDGE
   Keep this file in projects/seeker next to seeker.html.
   The top layer of the main hull and the bridge with its
   glass dome.
   ============================================================ */
(function () {
  const S = window.SEEKER;
  const ids = [-1, 1].map(side => S.part('HULL3_' + (side < 0 ? 'P' : 'S'), { name: 'TOP DECK', at: [side * 20, 15, 20],
    make(g, M, THREE) { S.hullPiece(THREE, g, 2, -80, 190, side); } }));
  ids.push(S.part('BRIDGE', { name: 'BRIDGE DOME', at: [0, 23, 34], make(g, M, THREE) {
    S.add(THREE, g, new THREE.CylinderGeometry(9, 12, 6, 32), M.hull, 0, 22, 34);
    S.add(THREE, g, new THREE.SphereGeometry(8, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2), M.glass, 0, 25, 34);
    S.add(THREE, g, new THREE.TorusGeometry(9.2, 0.7, 8, 40).rotateX(Math.PI / 2), M.gold, 0, 25, 34);
  } }));
  S.build({ id: 7, name: 'TOP LAYER & BRIDGE', brief: 'The top layer of the main hull, and the bridge under its glass dome where the crew will first see The Keeper.',
    trips: [{ name: 'TOP DECK', parts: ids.slice(0, 2) }, { name: 'BRIDGE DOME', parts: ids.slice(2) }],
    finishLabel: 'SEAL THE BRIDGE', finish: 'weld', flags: ['bridge'], status: ['BRIDGE', 'SEALED'] });
})();
