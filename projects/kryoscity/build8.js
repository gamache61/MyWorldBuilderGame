/* ============================================================
   KRYOS CITY · BUILD 8 · BOULEVARD DISTRICT
   Keep this file in projects/kryoscity next to kryoscity.html.
   White low-rise buildings with roof gardens line both sides of
   the boulevard: shops, schools, clinics and offices.
   Trip 1 — 4 blocks on the east boulevard.
   Trip 2 — 4 blocks on the west boulevard.
   Build 8 ends when you open the district (press L).
   ============================================================ */
(function () {
  const blocks = k => {
    const S = KRYOS.SEG(k), r = KRYOS.rng(900 + k), out = [];
    for (const s of [-1, 1]) for (let x = S.x0 + 20; x < S.x1 - 30;) {
      const w = 40 + r() * 40, d = 40 + r() * 30, h = 14 + r() * 30;
      if (!(S.east && x < 460) && !(!S.east && x + w > -240) && r() > 0.12) out.push({ x: x + w / 2 - S.xm, z: s * (92 + d / 2 + r() * 30), w, d, h });
      x += w + 18 + r() * 20;
    }
    return out;
  };
  const make = function (g, k, M, THREE) { for (const [i, b] of blocks(k).entries()) KRYOS.lowrise(THREE, g, b.x, b.z, b.w, b.d, b.h, 1000 + k * 20 + i); };
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(KRYOS.cityBuild({
    id: 8,
    name: 'BOULEVARD DISTRICT',
    brief: 'White low-rise buildings with roof gardens along the boulevard — shops, schools, clinics and offices.',
    finishLabel: 'OPEN THE DISTRICT', flags: ['klowrise'], status: ['BOULEVARD DISTRICT', 'OPEN'],
    finishCam: [[400, 0], 1100], lookUp: 20,
    parts: {
      KBLOCKE: { name: 'EAST BLOCK', code: 'HM', col: '#e8e1d1', h: 40, count: 4, at: k => [KRYOS.SEG(k).xm, 0.7], eye: (k, V) => V(0, 160, 330), make: (g, k, M, T) => make(g, k, M, T) },
      KBLOCKW: { name: 'WEST BLOCK', code: 'HM', col: '#e8e1d1', h: 40, count: 4, at: k => [KRYOS.SEG(k + 4).xm, 0.7], eye: (k, V) => V(0, 160, 330), make: (g, k, M, T) => make(g, k + 4, M, T) },
    },
    trips: [{ name: 'EAST BLOCKS', parts: ['KBLOCKE'] }, { name: 'WEST BLOCKS', parts: ['KBLOCKW'] }],
  }));
})();
