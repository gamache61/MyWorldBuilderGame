/* ============================================================
   KRYOS CITY · BUILD 9 · NORTH GLASS TOWERS
   Keep this file in projects/kryoscity next to kryoscity.html.
   The blue glass skyline of Kryos — homes and offices for the
   people of the city, north of the boulevard.
   Trip 1 — 9 towers.   Trip 2 — 9 more towers.
   Build 9 ends when you light up the north skyline (press L).
   ============================================================ */
(function () {
  const T = KRYOS.towerSpots.n;
  const part = off => ({ name: 'GLASS TOWER', code: 'HM', col: '#2f6690', h: 300, count: 9, at: k => [T[k + off].x, T[k + off].z],
    eye: (k, V) => V(260, 200, 380),
    make(g, k, M, THREE) { const t = T[k + off]; KRYOS.glassTower(THREE, g, 0, 0, t.h, t.r, t.kind, 2000 + k + off); } });
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(KRYOS.cityBuild({
    id: 9,
    name: 'NORTH GLASS TOWERS',
    brief: 'Eighteen blue glass towers north of the boulevard — homes and offices for the people of Kryos.',
    finishLabel: 'LIGHT UP THE NORTH SKYLINE', flags: ['ktowersn'], status: ['NORTH SKYLINE', 'LIT'],
    finishCam: [[300, 500], 1800], lookUp: 150,
    parts: { KTOWN1: part(0), KTOWN2: part(9) },
    trips: [{ name: 'FIRST 9 TOWERS', parts: ['KTOWN1'] }, { name: 'LAST 9 TOWERS', parts: ['KTOWN2'] }],
  }));
})();
