/* ============================================================
   THE GUESTS' QUARTER · BUILD 4 · THE SOUTH HOMES
   Keep this file in projects/guestsquarter next to 65-guestsquarter.html.
   Twenty more warm homes in two rows facing the south lane: forty in all.
   ============================================================ */
(function () {
  const P = window.GSQ;
  const row = z => Array.from({ length: 10 }, (_, i) => [1550 - 135 + i * 30, z]);
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 4, name: 'THE SOUTH HOMES',
    brief: 'Twenty more warm homes in two rows facing the south lane, beside the pond and the benches. Forty homes in all.',
    types: { HOME: { code: 'HM', name: 'GUEST HOME', col: '#f0c9a0', w: 14, d: 12, h: 9 } },
    order: ['HOME'],
    at: { HOME: [...row(75), ...row(125)] },
    eye: [1550 + 140, P.SY + 70, 190],
    stats(api, c) { return [['SOUTH HOMES', c('HOME') + ' / 20'], ['ALL HOMES', (20 + c('HOME')) + ' / 40']]; },
    make(type, k, g, add, F, api, sl) {
      const lz = Math.round(sl.z - P.OFF[1]);
      P.home(api, add, g, k + 20, lz < 100 ? 1 : -1);
    },
  }));
})();
