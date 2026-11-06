/* ============================================================
   AEGIS ARK · BUILD 7 · BRIDGE
   Keep this file in projects/ark next to arkyard.html.
   The slit-window canopy on top of the bow and the round
   glass bridge pod that hangs under it.
   ============================================================ */
(function () {
  const S = window.SHIPYARD;
  const ids = [
    S.part('CANOPY', { name: 'BRIDGE CANOPY', at: [0, 14, 148], make(g, M, THREE) {
      S.slab(THREE, g, [0, 16], [28, 12], 140, 158, 0.5, M.glass, 0.25); S.slab(THREE, g, [-28, 12], [0, 16], 140, 158, 0.5, M.glass, 0.25);
      S.slab(THREE, g, [0, 16], [28, 12], 134, 139, 0.6, M.armor, 0.15); S.slab(THREE, g, [-28, 12], [0, 16], 134, 139, 0.6, M.armor, 0.15);
    } }),
    S.part('BRIDGEPOD', { name: 'BRIDGE POD', at: [0, -14, 132], make(g, M, THREE) {
      const BR = new THREE.Vector3(0, -16.2, 132), R = 10.5, ext = new THREE.Group(); ext.position.copy(BR); g.add(ext);
      const m = (geo, mat, y) => S.mesh(THREE, geo, mat, ext, 0, y, 0);
      m(new THREE.CylinderGeometry(R, R, 5, 64, 1, true, Math.PI / 4, Math.PI * 1.5), M.armor, 2.25);
      m(new THREE.CylinderGeometry(R, R, 1.05, 24, 1, true, -Math.PI / 4, Math.PI / 2), M.armor, 0.275);
      m(new THREE.CylinderGeometry(R, R, 0.75, 24, 1, true, -Math.PI / 4, Math.PI / 2), M.armor, 4.375);
      m(new THREE.CylinderGeometry(R - 0.05, R - 0.05, 3.2, 48, 1, true, -Math.PI / 4, Math.PI / 2), M.podGlass, 2.4);
      m(new THREE.SphereGeometry(R, 64, 16, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), M.armor, -0.25).scale.y = 0.32;
      m(new THREE.CylinderGeometry(R - 1.5, R, 1.2, 64), M.armor, 5.35);
      const top = BR.y + 5.95, hullY = S.sp(THREE, [0, -14], 132).y;
      S.mesh(THREE, new THREE.BoxGeometry(9, hullY - top + 1.5, 16), M.armor, g, 0, (top + hullY) / 2 + 0.3, 130);
      S.mesh(THREE, new THREE.SphereGeometry(0.5, 10, 8), M.navR, g, 0, BR.y - 3.6, 132);
    } }),
  ];
  S.build({ id: 7, name: 'BRIDGE', brief: 'The slit-window canopy on top of the bow, and the round glass bridge pod that hangs underneath it where the crew fly the ship.',
    trips: [{ name: 'CANOPY & BRIDGE POD', parts: ids }],
    finishLabel: 'SEAL THE BRIDGE', finish: 'weld', flags: ['bridge'], status: ['BRIDGE', 'SEALED'] });
})();
