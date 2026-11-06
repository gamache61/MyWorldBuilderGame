/* ============================================================
   AEGIS ARK · BUILD 10 · ENGINES
   Keep this file in projects/ark next to arkyard.html.
   Five engines on the stern: the big main engine, two side
   engines and two small ones underneath.
   ============================================================ */
(function () {
  const S = window.SHIPYARD;
  const E = [['MAIN ENGINE', 0, -1, 1.3], ['SIDE ENGINE', -22, 0, 0.9], ['SIDE ENGINE', 22, 0, 0.9], ['LOW ENGINE', -11, -8.5, 0.55], ['LOW ENGINE', 11, -8.5, 0.55]];
  const ids = E.map(([n, x, y, s], k) => S.part('ENGINE' + k, { name: n, at: [x, y, -208], make(g, M, THREE) { S.engine(THREE, g, M, x, y, s); } }));
  S.build({ id: 10, name: 'ENGINES', brief: 'Five engines on the stern: the big main engine first, then two side engines and two small ones underneath.',
    trips: [{ name: 'MAIN & SIDE ENGINES', parts: ids.slice(0, 3) }, { name: 'LOW ENGINES', parts: ids.slice(3) }],
    finishLabel: 'TEST THE ENGINES', finish: 'drives', flags: ['engines'], status: ['ENGINES', 'TESTED'] });
})();
