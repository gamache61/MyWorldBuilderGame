/* ============================================================
   AEGIS ARK · BUILD 8 · WINGS & TAIL FINS
   Keep this file in projects/ark next to arkyard.html.
   The two swept wings and the two tail fins.
   ============================================================ */
(function () {
  const S = window.SHIPYARD;
  const wings = [-1, 1].map(s => S.part('WING' + (s < 0 ? 'P' : 'S'), { name: 'WING', at: [s * 58, -2, -120], make(g, M, THREE) {
    const sh = new THREE.Shape([[0, 0], [0, -115], [40, -128], [42, -112], [10, -8]].map(([x, y]) => new THREE.Vector2(x, y)));
    const geo = new THREE.ExtrudeGeometry(sh, { depth: 1.6, bevelEnabled: true, bevelThickness: 0.4, bevelSize: 0.4, bevelSegments: 1 }); geo.rotateX(Math.PI / 2);
    const w = S.mesh(THREE, geo, M.hull, g, s * 37, -1, -60); w.scale.x = s; w.rotation.z = s * -0.08;
    S.mesh(THREE, new THREE.SphereGeometry(0.9, 10, 8), s < 0 ? M.navR : M.navG, g, s * 79, -4.2, -178);
    S.mesh(THREE, new THREE.BoxGeometry(0.5, 0.5, 16), M.strip, g, s * 79.5, -4.2, -170);
  } }));
  const fins = [-1, 1].map(s => S.part('FIN' + (s < 0 ? 'P' : 'S'), { name: 'TAIL FIN', at: [s * 22, 26, -160], make(g, M, THREE) {
    const sh = new THREE.Shape([[0, 0], [0, -40], [22, -48], [20, -38]].map(([x, y]) => new THREE.Vector2(x, y)));
    const geo = new THREE.ExtrudeGeometry(sh, { depth: 1.2, bevelEnabled: false }); geo.rotateX(Math.PI / 2);
    const f = new THREE.Group(); f.position.set(s * 14, 13.5, -138); f.rotation.z = s > 0 ? 1.05 : Math.PI - 1.05; g.add(f);
    S.mesh(THREE, geo, M.hull, f);
  } }));
  S.build({ id: 8, name: 'WINGS & TAIL FINS', brief: 'The two swept wings with their running lights, then the two tail fins on top of the stern.',
    trips: [{ name: 'WINGS', parts: wings }, { name: 'TAIL FINS', parts: fins }],
    finishLabel: 'WELD THE WINGS', finish: 'weld', flags: ['wings'], status: ['WINGS', 'WELDED'] });
})();
