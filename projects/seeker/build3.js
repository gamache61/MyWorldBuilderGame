/* ============================================================
   THE SEEKER · BUILD 3 · LOWER HULL & ENGINE ROOM
   Keep this file in projects/seeker next to seeker.html.
   The long lower hull: three hull rings, the nose cap and the
   engine room at the back.
   ============================================================ */
(function () {
  const S = window.SEEKER;
  const SC = [1.25, 0.8, 1];
  const ring = (z0, z1) => (g, M, THREE) => {
    const add = (geo, mat, X, Y, Z) => S.add(THREE, g, geo, mat, X, Y, Z), L = z1 - z0, zm = (z0 + z1) / 2;
    add(new THREE.CylinderGeometry(15, 15, L, 28, 1, true).rotateX(Math.PI / 2).scale(...SC), M.hull, 0, -16, zm);
    add(new THREE.TorusGeometry(15.2, 0.6, 6, 40).scale(...SC), M.dark, 0, -16, z0 + 0.3);
    add(new THREE.BoxGeometry(1.2, 1.2, L), M.teal, 0, -28.5, zm);
    for (let z = z0 + 4; z < z1 - 2; z += 8) for (const sx of [-1, 1]) add(new THREE.BoxGeometry(0.5, 1.2, 1.6), M.win, sx * 18.6, -14, z);
  };
  const Z = [-165, -128.3, -91.7, -55];
  const ids = [0, 1, 2].map(k => S.part('LHULL' + k, { name: 'HULL RING', at: [0, -16, (Z[k] + Z[k + 1]) / 2], make: ring(Z[k], Z[k + 1]) }));
  ids.push(S.part('LNOSE', { name: 'NOSE CAP', at: [0, -16, -50],
    make(g, M, THREE) { S.add(THREE, g, new THREE.SphereGeometry(15, 28, 14, 0, Math.PI * 2, 0, Math.PI / 2).rotateX(Math.PI / 2).scale(...SC), M.hull, 0, -16, -55); } }));
  ids.push(S.part('LENGINE', { name: 'ENGINE ROOM', at: [0, -16, -172],
    make(g, M, THREE) {
      const add = (geo, mat, X, Y, Z) => S.add(THREE, g, geo, mat, X, Y, Z);
      add(new THREE.SphereGeometry(15, 28, 14, 0, Math.PI * 2, 0, Math.PI / 2).rotateX(-Math.PI / 2).scale(...SC), M.hull, 0, -16, -165);
      add(new THREE.CylinderGeometry(7, 9, 4, 24).rotateX(Math.PI / 2), M.gold, 0, -16, -179);
      add(new THREE.CircleGeometry(6.5, 24).rotateY(Math.PI), M.amber, 0, -16, -181.1);
    } }));
  S.build({ id: 3, name: 'LOWER HULL & ENGINE ROOM', brief: 'The long lower hull wraps round the keel: three hull rings, the nose cap, and the engine room at the back.',
    trips: [{ name: 'HULL RINGS', parts: ids.slice(0, 3) }, { name: 'NOSE CAP & ENGINE ROOM', parts: ids.slice(3) }],
    finishLabel: 'SEAL THE LOWER HULL', finish: 'weld', flags: ['lhull'], status: ['LOWER HULL', 'SEALED'] });
})();
