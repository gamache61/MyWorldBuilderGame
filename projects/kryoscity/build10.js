/* ============================================================
   KRYOS CITY · BUILD 10 · SOUTH GLASS TOWERS
   Keep this file in projects/kryoscity next to kryoscity.html.
   The blue glass skyline of Kryos — homes and offices for the
   people of the city, south of the boulevard.
   Trip 1 — 9 towers.   Trip 2 — 9 more towers.
   Build 10 ends when you light up the south skyline (press L).
   ============================================================ */
(function () {
  const T = KRYOS.towerSpots.s;
  const part = off => ({ name: 'GLASS TOWER', code: 'HM', col: '#2f6690', h: 300, count: 9, at: k => [T[k + off].x, T[k + off].z],
    eye: (k, V) => V(260, 200, 380),
    make(g, k, M, THREE) { const t = T[k + off]; KRYOS.glassTower(THREE, g, 0, 0, t.h, t.r, t.kind, 3000 + k + off); } });
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(KRYOS.cityBuild({
    id: 10,
    name: 'SOUTH GLASS TOWERS',
    brief: 'Eighteen blue glass towers south of the boulevard — homes and offices for the people of Kryos.',
    finishLabel: 'LIGHT UP THE SOUTH SKYLINE', flags: ['ktowerss'], status: ['SOUTH SKYLINE', 'LIT'],
    finishCam: [[300, -500], 1800], lookUp: 150,
    parts: { KTOWS1: part(0), KTOWS2: part(9) },
    trips: [{ name: 'FIRST 9 TOWERS', parts: ['KTOWS1'] }, { name: 'LAST 9 TOWERS', parts: ['KTOWS2'] }],
  }));
})();
