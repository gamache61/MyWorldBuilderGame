/* ============================================================
   AEGIS ARK · BUILD 9 · GARDENS
   Keep this file in the havenreach folder next to AegisArk.html.
   Trip 1 — 12 sections of open grass floor under the glass roof.
   Trip 2 — 12 sections of fields, orchards, lakes, greenhouses
            and farms.
   Build 9 ends when you plant the gardens (press L).
   ============================================================ */
(window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(HAVEN.ringBuild({
  ring: 'GAR', name: 'GARDENS',
  brief: 'The gardens: open farmland, orchards and lakes under the glass roof.',
  floorName: 'GARDEN FLOOR SECTION', packName: 'FARM SECTION', packCode: 'GD', packCol: '#3a7d44', floorCol: '#3a7d44',
  trip2: 'FARMS & ORCHARDS', finishLabel: 'PLANT THE GARDENS', flags: ['gardens'],
  fill(api, THREE, S, b, a0, a1, R, k, g, mesh) {
    const y = R.y; let s = 900 + k * 7; const rnd = () => (s = (s * 16807) % 2147483647) / 2147483647;
    let i = k;
    for (let r = 1100; r < 1550; r += 112) for (let a = a0 + 0.004; a < a1 - 0.004; a += 160 / r) {
      const v = rnd(), e = Math.min(a1 - 0.004, a + 150 / r);
      if (H_onRoad(a, e, r)) continue;
      if (v < 0.08) mesh(HAVEN.ann(THREE, r, r + 104, a, e, y + 0.4), S.water, false);
      else if (v < 0.2) { for (let p = a + 6 / r; p < e - 4 / r; p += 9 / r) for (let rr = r + 6; rr < r + 100; rr += 11) b.put('orchard', S.BALL, S.leaf, p, rr, y + 6, 3.5, 3.8, 3.5, 0, 0x3f8a34); }
      else mesh(HAVEN.ann(THREE, r, r + 104, a, e, y + 0.3, false, 20), S.crops[i++ % S.crops.length], false);
    }
    for (let a = a0 + 0.05; a < a1; a += 0.16) for (const r of [1150, 1500]) { b.put('green', S.BOX, S.greenhouse, a, r, y, 36, 8, 12); b.put('farm', S.BOX, S.std(0x9a2a22), a + 26 / r, r, y, 12, 8, 16); b.put('farmRoof', S.CONE4, S.std(0x4a3a30), a + 26 / r, r, y + 8, 15, 5, 20); }
  },
}));
function H_onRoad(a, e, r) { for (let p = a; p <= e; p += (e - a) / 4) if (HAVEN.onRoad(p, r, 10)) return true; return false; }
