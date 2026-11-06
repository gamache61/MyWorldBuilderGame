/* ============================================================
   AEGIS ARK · BUILD 13 · CREW & SUPPLIES
   Keep this file in projects/ark next to arkyard.html.
   Food, water, tools and spare parts for the crew, loaded
   through the bay doors. Then power up the Ark.
   ============================================================ */
(function () {
  const S = window.SHIPYARD;
  const names = ['FOOD STORES', 'WATER & AIR', 'TOOLS & SPARES', 'CARGO STRAPS & CLAMPS', 'MEDICAL BAY', 'CREW CABINS KIT'];
  const ids = names.map((n, k) => S.part('SUPPLY' + k, { name: n, at: [(k % 2 ? 8 : -8), 0, -40 + k * 12], make() { } }));
  S.build({ id: 13, name: 'CREW & SUPPLIES', brief: 'Food, water and air, tools, spare parts and cargo clamps for the crew, lowered in through the bay. Then power up the Ark.',
    trips: [{ name: 'SUPPLIES', parts: ids }],
    finishLabel: 'POWER UP THE ARK', finish: 'power', flags: ['power'], status: ['SHIP POWER', 'ON'] });
})();
