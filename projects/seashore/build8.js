/* ============================================================
   SEAPORT · BUILD 8 · HARBOUR DISTRICT
   Keep this file in projects/seaport next to seaport.html.
   White low-rise buildings with roof gardens behind the
   waterfront: the harbour office, shops, homes and schools.
   Trip 1 — 4 blocks north of the landing field.
   Trip 2 — 4 blocks south of it.
   Build 8 ends when you open the district (press L).
   ============================================================ */
(function () {
  const band = (k, s) => [-45, s * (360 + k * 120)];
  const blocks = (k, s) => {
    const r = KRYOS.rng(700 + k * 2 + (s > 0 ? 1 : 0)), out = [];
    for (let x = -60; x < 0;) { const w = 34 + r() * 26, d = 36 + r() * 40, h = 12 + r() * 26; if (r() > 0.1) out.push({ x: x + w / 2 - (-45), z: (r() - 0.5) * (110 - d), w, d, h }); x += w + 14; }
    return out;
  };
  const make = s => function (g, k, M, THREE) { blocks(k, s).forEach((b, i) => KRYOS.lowrise(THREE, g, b.x, b.z, b.w, b.d, b.h, 800 + k * 20 + i + (s > 0 ? 0 : 400))); };
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(KRYOS.cityBuild({
    id: 8,
    name: 'HARBOUR DISTRICT',
    brief: 'White low-rise buildings with roof gardens behind the waterfront — the harbour office, shops, homes and schools.',
    finishLabel: 'OPEN THE DISTRICT', flags: ['sdistrict'], status: ['HARBOUR DISTRICT', 'OPEN'],
    finishCam: [[-40, 0], 1100], lookUp: 0,
    parts: {
      KBLKN: { name: 'NORTH BLOCK', code: 'HM', col: '#e8e1d1', h: 40, count: 4, at: k => band(k, 1), eye: (k, V) => V(-260, 140, 200), make: make(1) },
      KBLKS: { name: 'SOUTH BLOCK', code: 'HM', col: '#e8e1d1', h: 40, count: 4, at: k => band(k, -1), eye: (k, V) => V(-260, 140, -200), make: make(-1) },
    },
    trips: [{ name: 'NORTH BLOCKS', parts: ['KBLKN'] }, { name: 'SOUTH BLOCKS', parts: ['KBLKS'] }],
  }));
})();
