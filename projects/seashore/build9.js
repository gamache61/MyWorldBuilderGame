/* ============================================================
   SEAPORT · BUILD 9 · HARBOUR SKYLINE
   Keep this file in projects/seaport next to seaport.html.
   The blue glass towers of the seaport, rising behind the
   harbour district.
   Trip 1 — 9 towers.   Trip 2 — 9 more towers.
   Build 9 ends when you light up the skyline (press L).
   ============================================================ */
(function () {
  const T = KRYOS.towerSpots;
  const part = off => ({ name: 'GLASS TOWER', code: 'HM', col: '#2f6690', h: 300, count: 9, at: k => [T[k + off].x, T[k + off].z],
    eye: (k, V) => V(-300, 200, 380),
    make(g, k, M, THREE) { const t = T[k + off]; KRYOS.glassTower(THREE, g, 0, 0, t.h, t.r, t.kind, 5000 + k + off); } });
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(KRYOS.cityBuild({
    id: 9,
    name: 'HARBOUR SKYLINE',
    brief: 'Eighteen blue glass towers rising behind the harbour — homes and offices with a view over the sea.',
    finishLabel: 'LIGHT UP THE SKYLINE', flags: ['stowers'], status: ['SKYLINE', 'LIT'],
    finishCam: [[-900, 0], 2300], lookUp: 200,
    parts: { KSKY1: part(0), KSKY2: part(9) },
    trips: [{ name: 'FIRST 9 TOWERS', parts: ['KSKY1'] }, { name: 'LAST 9 TOWERS', parts: ['KSKY2'] }],
  }));
})();
