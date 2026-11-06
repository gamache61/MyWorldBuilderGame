/* ============================================================
   AEGIS ARK · BUILD 11 · DEFENCE TURRETS
   Keep this file in projects/ark next to arkyard.html.
   Six big twin-gun turrets on top and underneath, then the
   rows of small turrets down each side.
   ============================================================ */
(function () {
  const S = window.SHIPYARD;
  const V = (THREE, x, y, z) => new THREE.Vector3(x, y, z);
  const big = [[100, 1], [125, 1], [-105, 1], [-128, 1], [95, -1], [-120, -1]].map(([z, up], k) => S.part('TURRET' + k, { name: 'BIG TURRET', at: [0, up > 0 ? 18 : -16, z], make(g, M, THREE) {
    const p = S.sp(THREE, [0, up > 0 ? 16 : -14], z).add(V(THREE, 0, up > 0 ? -0.2 : 0.2, 0));
    S.turret(THREE, g, M, p, V(THREE, 0, up, 0), true, z < 0);
  } }));
  const small = [-1, 1].map(s => S.part('GUNS' + (s < 0 ? 'P' : 'S'), { name: 'SIDE TURRET ROW', at: [s * 40, -4, 20], make(g, M, THREE) {
    for (const z of [165, 120, 40, -10, -55, -110, -160]) {
      const a = S.sp(THREE, [s * 42, 2], z), b = S.sp(THREE, [s * 36, -8], z), p = a.clone().lerp(b, 0.45), n = V(THREE, s * 10, -6, 0).normalize();
      S.turret(THREE, g, M, p.addScaledVector(n, 0.2), n, false, false);
    }
  } }));
  S.build({ id: 11, name: 'DEFENCE TURRETS', brief: 'Six big twin-gun turrets on top and underneath the hull, then the rows of small turrets down each side to keep the cargo safe.',
    trips: [{ name: 'BIG TURRETS', parts: big }, { name: 'SIDE TURRET ROWS', parts: small }],
    finishLabel: 'TEST THE TURRETS', finish: 'weld', flags: ['turrets'], status: ['TURRETS', 'READY'] });
})();
