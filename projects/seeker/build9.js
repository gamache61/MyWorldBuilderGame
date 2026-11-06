/* ============================================================
   THE SEEKER · BUILD 9 · SENSOR FIN & NAV LIGHTS
   Keep this file in projects/seeker next to seeker.html.
   The tall sensor fin on top of the ship, the red and green
   navigation lights, and the white beacons.
   ============================================================ */
(function () {
  const S = window.SEEKER;
  const ids = [
    S.part('DFIN', { name: 'SENSOR FIN', at: [0, 30, -10], make(g, M, THREE) {
      const s = new THREE.Shape(); s.moveTo(0, 0); s.lineTo(46, 0); s.quadraticCurveTo(20, 6, -6, 22); s.lineTo(-10, 22); s.lineTo(0, 0);
      const geo = new THREE.ExtrudeGeometry(s, { depth: 2, bevelEnabled: true, bevelThickness: 0.6, bevelSize: 0.6, bevelSegments: 2 }); geo.translate(0, 0, -1); geo.rotateY(-Math.PI / 2);
      S.add(THREE, g, geo, M.hull, 0, 20, -18);
      S.add(THREE, g, new THREE.BoxGeometry(0.8, 0.8, 30), M.teal, 0, 30, -4).rotation.x = -0.45;
    } }),
    S.part('NAV', { name: 'NAV LIGHTS', at: [0, 1, 12], make(g, M, THREE) {
      S.add(THREE, g, new THREE.SphereGeometry(1.4, 10, 8), M.navR, 85, 1, 12);
      S.add(THREE, g, new THREE.SphereGeometry(1.4, 10, 8), M.navG, -85, 1, 12);
    } }),
    S.part('BEACONS', { name: 'BEACONS', at: [0, 43, -26], make(g, M, THREE) {
      for (const [x, y, z] of [[0, 43, -26], [0, -41, -110]]) S.add(THREE, g, new THREE.SphereGeometry(1.1, 8, 6), M.beacon, x, y, z);
    } }),
  ];
  S.build({ id: 9, name: 'SENSOR FIN & NAV LIGHTS', brief: 'The tall sensor fin that listens to deep space, the red and green navigation lights, and the white beacons.',
    trips: [{ name: 'FIN & LIGHTS', parts: ids }],
    finishLabel: 'TEST THE SENSORS', finish: 'weld', flags: ['sensors'], status: ['SENSORS', 'ONLINE'] });
})();
