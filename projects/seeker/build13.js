/* ============================================================
   THE SEEKER · BUILD 13 · CREW & SUPPLIES
   Keep this file in projects/seeker next to seeker.html.
   Food, water, tools and science gear for 140 explorers,
   loaded through the cargo hatch. Then power up the ship.
   ============================================================ */
(function () {
  const S = window.SEEKER;
  const names = ['FOOD STORES', 'WATER & AIR', 'SCIENCE GEAR', 'TOOLS & SPARES', 'MEDICAL BAY', 'CREW CABINS KIT'];
  const ids = names.map((n, k) => S.part('SUPPLY' + k, { name: n, at: [(k % 2 ? 7 : -7), -3, -172], make() { } }));
  S.build({ id: 13, name: 'CREW & SUPPLIES', brief: 'Food, water and air, science gear, tools and everything 140 explorers need for a long voyage. Then power up the Seeker.',
    trips: [{ name: 'SUPPLIES', parts: ids }],
    finishLabel: 'POWER UP THE SEEKER', finish: 'power', flags: ['power'], status: ['SHIP POWER', 'ON'] });
})();
