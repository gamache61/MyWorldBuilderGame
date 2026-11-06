/* ============================================================
   THE SEEKER · BUILD 10 · ENGINE ARMS
   Keep this file in projects/seeker next to seeker.html.
   The two curved arms that lift the drives up above the
   hull.
   ============================================================ */
(function () {
  const S = window.SEEKER;
  const ids = [-1, 1].map(sx => S.part('ARM' + (sx < 0 ? 'P' : 'S'), { name: 'ENGINE ARM', at: [sx * 50, -4, -126], make(g, M, THREE) {
    const V = (x, y, z) => new THREE.Vector3(x, y, z);
    const pts = [V(sx * 14, -16, -112), V(sx * 40, -12, -124), V(sx * 66, 4, -132), V(sx * 82, 22, -128)];
    S.add(THREE, g, new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 40, 4.5, 14), M.hull);
    S.add(THREE, g, new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts.map(p => p.clone().add(V(0, 0, 10)))), 40, 1.6, 8), M.dark);
  } }));
  S.build({ id: 10, name: 'ENGINE ARMS', brief: 'Two curved arms that sweep up from the lower hull and lift the drives high above the ship.',
    trips: [{ name: 'ENGINE ARMS', parts: ids }],
    finishLabel: 'WELD THE ARMS', finish: 'weld', flags: ['arms'], status: ['ENGINE ARMS', 'WELDED'] });
})();
