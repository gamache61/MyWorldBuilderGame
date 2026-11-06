/* ============================================================
   AEGIS ARK · BUILD 1 · SHIP CRADLE
   Keep this file in projects/ark next to arkyard.html.
   Eight steel cradle towers on the yard floor. The Aegis Ark
   is built on top of them.
   ============================================================ */
(function () {
  const S = window.SHIPYARD;
  const T = [[-14, -160, -12.2], [14, -160, -12.2], [-14, -60, -13.3], [14, -60, -13.3], [-14, 20, -13.3], [14, 20, -13.3], [-14, 85, -13.3], [14, 85, -13.3]];
  const ids = T.map(([x, z, top], k) => {
    const h = top + S.SHIP_Y;
    return S.part('CRADLE' + k, { name: 'CRADLE TOWER', cradle: true, at: [x, -S.SHIP_Y + h / 2, z],
      make(g, M, THREE) {
        const add = (geo, mat, X, Y, Z) => S.mesh(THREE, geo, mat, g, X, Y, Z), y0 = -S.SHIP_Y;
        add(new THREE.BoxGeometry(12, 1, 12), M.dark, x, y0 + 0.5, z);
        for (const sx of [-1, 1]) for (const sz of [-1, 1]) add(new THREE.BoxGeometry(1.2, h - 2, 1.2), M.yellow, x + sx * 3, y0 + h / 2, z + sz * 3);
        for (let y = y0 + 5; y < top - 2; y += 6) { add(new THREE.BoxGeometry(7.2, 0.6, 0.6), M.yellow, x, y, z - 3); add(new THREE.BoxGeometry(7.2, 0.6, 0.6), M.yellow, x, y, z + 3); add(new THREE.BoxGeometry(0.6, 0.6, 7.2), M.yellow, x - 3, y, z); add(new THREE.BoxGeometry(0.6, 0.6, 7.2), M.yellow, x + 3, y, z); }
        add(new THREE.BoxGeometry(10, 1.4, 10), M.dark, x, top - 0.7, z);
      } });
  });
  S.build({ id: 1, name: 'SHIP CRADLE', brief: 'Eight steel cradle towers on the shipyard floor. The Aegis Ark will be built on top of them.',
    trips: [{ name: 'CRADLE TOWERS', parts: ids }],
    finishLabel: 'LOCK THE CRADLE', finish: 'weld', flags: ['cradle'], status: ['CRADLE', 'LOCKED'] });
})();
