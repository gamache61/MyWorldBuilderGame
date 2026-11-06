/* ============================================================
   THE SEEKER · BUILD 12 · DRONE BAYS & SURVEY DRONES
   Keep this file in projects/seeker next to seeker.html.
   Two drone bays on the lower hull, then six survey drones
   that scout ahead of the ship.
   ============================================================ */
(function () {
  const S = window.SEEKER;
  const bays = [-1, 1].map(sx => S.part('BAY' + (sx < 0 ? 'P' : 'S'), { name: 'DRONE BAY', at: [sx * 22, -12, -160], make(g, M, THREE) {
    S.add(THREE, g, new THREE.BoxGeometry(8, 10, 24), M.hull, sx * 22, -12, -160);
    S.add(THREE, g, new THREE.BoxGeometry(0.4, 6, 18), M.dark, sx * 26.1, -12, -160);
    S.add(THREE, g, new THREE.BoxGeometry(0.5, 0.8, 20), M.teal, sx * 26.2, -8, -160);
  } }));
  const drones = [];
  for (let k = 0; k < 6; k++) { const x = (k % 2 ? 6 : -6), z = -150 + Math.floor(k / 2) * 18;
    drones.push(S.part('DRONE' + k, { name: 'SURVEY DRONE', drone: true, at: [x, -2.5, z], make(g, M, THREE) {
      S.add(THREE, g, new THREE.OctahedronGeometry(3, 0), M.hull, x, -2.5, z).scale.set(1, 0.5, 1.6);
      S.add(THREE, g, new THREE.SphereGeometry(0.9, 8, 6), M.teal, x, -2.5, z - 4.5);
    } })); }
  S.build({ id: 12, name: 'DRONE BAYS & SURVEY DRONES', brief: 'Two drone bays on the lower hull, then six survey drones that will scout ahead of the Seeker in deep space.',
    trips: [{ name: 'DRONE BAYS', parts: bays }, { name: 'SURVEY DRONES', parts: drones }],
    finishLabel: 'FLY A SURVEY TEST', finish: 'drones', flags: ['drones'], status: ['SURVEY DRONES', 'READY'] });
})();
