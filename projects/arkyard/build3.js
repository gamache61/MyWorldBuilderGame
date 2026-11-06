/* ============================================================
   AEGIS ARK · BUILD 3 · CARGO BAY HULL
   Keep this file in projects/ark next to arkyard.html.
   The thick armoured shell round the cargo bay, in two
   halves, and the airlock walls at each end of the bay.
   ============================================================ */
(function () {
  const S = window.SHIPYARD;
  const U = [[28, 12], [42, 2], [36, -8], [18, -13], [0, -14], [-18, -13], [-36, -8], [-42, 2], [-28, 12], [-24, 12], [-24, -9], [24, -9], [24, 12]];
  const shell = (z0, z1) => (g, M, THREE) => {
    const geo = new THREE.ExtrudeGeometry(new THREE.Shape(U.map(([x, y]) => new THREE.Vector2(x, y))), { depth: z1 - z0, bevelEnabled: false }); geo.translate(0, 0, z0);
    S.mesh(THREE, geo, [M.hidden, M.hull], g);
  };
  const ids = [
    S.part('BAYHULL0', { name: 'BAY HULL', at: [0, 0, -45], make: shell(S.BAY_BACK, -10) }),
    S.part('BAYHULL1', { name: 'BAY HULL', at: [0, 0, 25], make: shell(-10, S.BAY_FRONT) }),
    S.part('AIRLOCKS', { name: 'AIRLOCK WALLS', at: [0, -4, -10], make(g, M, THREE) {
      for (const [z, dir] of [[S.BAY_FRONT - 0.1, -1], [S.BAY_BACK + 0.1, 1]]) {
        S.mesh(THREE, new THREE.BoxGeometry(12, 10, 0.6), M.yellow, g, 0, -4, z + dir * 0.1);
        S.mesh(THREE, new THREE.PlaneGeometry(10, 8), M.warm, g, 0, -4.5, z + dir * 0.5).rotation.y = dir > 0 ? 0 : Math.PI;
      }
    } }),
  ];
  S.build({ id: 3, name: 'CARGO BAY HULL', brief: 'The thick armoured shell that wraps round the cargo bay, in two halves, then the airlock walls at each end of the bay.',
    trips: [{ name: 'BAY HULL', parts: ids.slice(0, 2) }, { name: 'AIRLOCK WALLS', parts: ids.slice(2) }],
    finishLabel: 'SEAL THE CARGO BAY', finish: 'weld', flags: ['bay'], status: ['CARGO BAY', 'SEALED'] });
})();
