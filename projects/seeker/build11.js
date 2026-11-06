/* ============================================================
   THE SEEKER · BUILD 11 · TWIN DRIVES
   Keep this file in projects/seeker next to seeker.html.
   The two long fold drives on top of the engine arms, then
   their glowing caps and light strips.
   ============================================================ */
(function () {
  const S = window.SEEKER;
  const body = [-1, 1].map(sx => S.part('DRIVE' + (sx < 0 ? 'P' : 'S'), { name: 'DRIVE BODY', at: [sx * 88, 26, -96], make(g, M, THREE) {
    S.add(THREE, g, new THREE.CapsuleGeometry(8, 150, 10, 24).rotateX(Math.PI / 2), M.hull, sx * 88, 26, -96).scale.set(0.9, 1.05, 1);
    S.add(THREE, g, new THREE.BoxGeometry(8, 9, 120), M.dark, sx * 88, 22, -100);
  } }));
  const glow = [-1, 1].map(sx => S.part('DGLOW' + (sx < 0 ? 'P' : 'S'), { name: 'DRIVE CAP & STRIPS', at: [sx * 88, 26, -60], make(g, M, THREE) {
    for (const dx of [-7.6, 7.6]) S.add(THREE, g, new THREE.BoxGeometry(1, 3.5, 118), M.teal, sx * 88 + dx, 25, -100);
    S.add(THREE, g, new THREE.SphereGeometry(7.6, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2).rotateX(Math.PI / 2), M.amber, sx * 88, 26, -18).scale.set(0.9, 1.05, 0.8);
    S.add(THREE, g, new THREE.TorusGeometry(7.8, 0.9, 8, 32), M.gold, sx * 88, 26, -22).scale.set(0.9, 1.05, 1);
    S.add(THREE, g, new THREE.BoxGeometry(1, 16, 26), M.gold, sx * 88, 36, -166);
    S.add(THREE, g, new THREE.CircleGeometry(6, 24).rotateY(Math.PI), M.teal, sx * 88, 26, -179.5);
    S.add(THREE, g, new THREE.SphereGeometry(1.1, 8, 6), M.beacon, sx * 88, 44.5, -166);
  } }));
  S.build({ id: 11, name: 'TWIN DRIVES', brief: 'The two long fold drives that will carry the Seeker between the stars. Bodies first, then the glowing caps and light strips.',
    trips: [{ name: 'DRIVE BODIES', parts: body }, { name: 'CAPS & LIGHT STRIPS', parts: glow }],
    finishLabel: 'TEST THE DRIVES', finish: 'drives', flags: ['drives'], status: ['DRIVES', 'TESTED'] });
})();
