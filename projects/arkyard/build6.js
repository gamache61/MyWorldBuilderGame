/* ============================================================
   AEGIS ARK · BUILD 6 · ARMOUR PLATING
   Keep this file in projects/ark next to arkyard.html.
   Heavy armour plates down both flanks: the midsection belts,
   then the bow and stern plates.
   ============================================================ */
(function () {
  const S = window.SHIPYARD;
  const ids = [
    S.part('ARMORMID', { name: 'MIDSECTION ARMOUR', at: [0, 0, -10], make(g, M, THREE) {
      for (let z = S.BAY_BACK + 1; z < S.BAY_FRONT - 5; z += 17.5) for (const [A, B] of [[[28, 12], [42, 2]], [[-42, 2], [-28, 12]], [[36, -8], [18, -13]], [[-18, -13], [-36, -8]]]) S.slab(THREE, g, A, B, z, z + 16.5, 0.9, M.armor, 0.08);
    } }),
    S.part('ARMORBOW', { name: 'BOW ARMOUR', at: [0, 4, 115], make(g, M, THREE) {
      for (let z = 64; z < 170; z += 13) for (const [A, B] of [[[28, 12], [42, 2]], [[-42, 2], [-28, 12]]]) S.slab(THREE, g, A, B, z, z + 12, 0.7, M.armor, 0.1);
    } }),
    S.part('ARMORSTERN', { name: 'STERN ARMOUR', at: [0, 0, -132], make(g, M, THREE) {
      for (let z = -180; z < -84; z += 16) for (const [A, B] of [[[28, 12], [42, 2]], [[-42, 2], [-28, 12]], [[36, -8], [18, -13]], [[-18, -13], [-36, -8]]]) S.slab(THREE, g, A, B, z, z + 15, 0.8, M.armor, 0.08);
    } }),
  ];
  S.build({ id: 6, name: 'ARMOUR PLATING', brief: 'Heavy armour plates down both flanks — the midsection belts first, then the bow and stern plates.',
    trips: [{ name: 'MIDSECTION ARMOUR', parts: ids.slice(0, 1) }, { name: 'BOW & STERN ARMOUR', parts: ids.slice(1) }],
    finishLabel: 'BOLT DOWN THE ARMOUR', finish: 'weld', flags: ['armor'], status: ['ARMOUR', 'BOLTED'] });
})();
