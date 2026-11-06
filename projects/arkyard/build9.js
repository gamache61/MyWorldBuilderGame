/* ============================================================
   AEGIS ARK · BUILD 9 · BAY DOORS
   Keep this file in projects/ark next to arkyard.html.
   Four armoured clamshell doors that close over the top of
   the cargo bay.
   ============================================================ */
(function () {
  const S = window.SHIPYARD;
  const segLen = (S.BAY_FRONT - S.BAY_BACK) / 2, len = Math.hypot(28, 4), base = Math.atan2(4, 28);
  const ids = [];
  for (let k = 0; k < 2; k++) for (const s of [-1, 1]) {
    const zc = S.BAY_BACK + segLen * (k + 0.5);
    ids.push(S.part('DOOR' + k + (s < 0 ? 'P' : 'S'), { name: 'BAY DOOR', at: [s * 14, 13, zc], make(g, M, THREE) {
      const pivot = new THREE.Group(); pivot.position.set(s * 28, 12, zc); pivot.rotation.z = s * -base; g.add(pivot);
      S.mesh(THREE, new THREE.BoxGeometry(len, 1.4, segLen - 0.3), M.hull, pivot, -s * len / 2, -0.7, 0);
      S.mesh(THREE, new THREE.BoxGeometry(len * 0.86, 0.6, segLen - 4), M.armor, pivot, -s * len / 2, 0.3, 0);
      for (let i = 0; i < 4; i++) S.mesh(THREE, new THREE.BoxGeometry(len * 0.9, 1, 0.8), M.gun, pivot, -s * len / 2, -1.6, -segLen / 2 + 6 + i * (segLen - 12) / 3);
    } }));
  }
  S.build({ id: 9, name: 'BAY DOORS', brief: 'Four armoured clamshell doors that close flush over the top of the cargo bay.',
    trips: [{ name: 'BAY DOORS', parts: ids }],
    finishLabel: 'TEST THE BAY DOORS', finish: 'weld', flags: ['doors'], status: ['BAY DOORS', 'WORKING'] });
})();
