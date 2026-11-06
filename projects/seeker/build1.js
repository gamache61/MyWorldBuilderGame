/* ============================================================
   THE SEEKER · BUILD 1 · SHIP CRADLE
   Keep this file in projects/seeker next to seeker.html.
   Eight steel cradle towers on the yard floor. The Seeker
   is built on top of them.
   ============================================================ */
(function () {
  const S = window.SEEKER;
  // tower tops sit just under the hull: the main hull at -8.5, the lower hull at -28.5
  const T = [[-40, 30, -8.5], [40, 30, -8.5], [-30, 100, -8.5], [30, 100, -8.5], [-12, -160, -28.5], [12, -160, -28.5], [-12, -95, -28.5], [12, -95, -28.5]];
  const ids = T.map(([x, z, top], k) => {
    const h = top + S.SHIP_Y;
    return S.part('CRADLE' + k, { name: 'CRADLE TOWER', cradle: true, at: [x, -S.SHIP_Y + h / 2, z],
      make(g, M, THREE) {
        const add = (geo, mat, X, Y, Z) => S.add(THREE, g, geo, mat, X, Y, Z), y0 = -S.SHIP_Y;
        add(new THREE.BoxGeometry(12, 1, 12), M.dark, x, y0 + 0.5, z);
        for (const sx of [-1, 1]) for (const sz of [-1, 1]) add(new THREE.BoxGeometry(1.2, h - 2, 1.2), M.yellow, x + sx * 3, y0 + h / 2, z + sz * 3);
        for (let y = y0 + 5; y < top - 2; y += 6) { add(new THREE.BoxGeometry(7.2, 0.6, 0.6), M.yellow, x, y, z - 3); add(new THREE.BoxGeometry(7.2, 0.6, 0.6), M.yellow, x, y, z + 3); add(new THREE.BoxGeometry(0.6, 0.6, 7.2), M.yellow, x - 3, y, z); add(new THREE.BoxGeometry(0.6, 0.6, 7.2), M.yellow, x + 3, y, z); }
        add(new THREE.BoxGeometry(10, 1.4, 10), M.dark, x, top - 0.7, z);
        add(new THREE.BoxGeometry(10.4, 0.3, 10.4), M.steel, x, top - 0.05, z);
      } });
  });
  S.build({ id: 1, name: 'SHIP CRADLE', brief: 'Eight steel cradle towers on the shipyard floor. The Seeker will be built on top of them.',
    trips: [{ name: 'CRADLE TOWERS', parts: ids }],
    finishLabel: 'LOCK THE CRADLE', finish: 'weld', flags: ['cradle'], status: ['CRADLE', 'LOCKED'] });
})();
