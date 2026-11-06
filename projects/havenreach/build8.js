/* ============================================================
   AEGIS ARK · BUILD 8 · FOOD PROCESSING
   Keep this file in the havenreach folder next to AegisArk.html.
   Trip 1 — 12 floor sections of the Food Processing ring.
   Trip 2 — 12 sections of food plants and silos.
   Build 8 ends when you start the food plants (press L).
   ============================================================ */
(window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(HAVEN.ringBuild({
  ring: 'FOOD', name: 'FOOD PROCESSING',
  brief: 'The food ring: plants and silos that turn the harvest into meals for 2.5 million people.',
  floorName: 'FOOD FLOOR SECTION', packName: 'FOOD PLANT BLOCK', packCode: 'FP', packCol: '#e8e1d1',
  trip2: 'FOOD PLANTS', finishLabel: 'START THE FOOD PLANTS', flags: ['food'],
  fill(api, THREE, S, b, a0, a1, R, k) {
    const y = R.y; let s = 800 + k; const rnd = () => (s = (s * 16807) % 2147483647) / 2147483647;
    for (let r = 890; r < 1075; r += 60) for (let a = a0 + 35 / r; a < a1; a += 70 / r) { b.put('foodPlant', S.BOX, S.std(0xeef1f4, 0.6), a, r, y, 48, 16, 30); if (rnd() < 0.6) b.put('foodSilo', S.CYL, S.std(0xd8d0b8, 0.6, 0.3), a + 36 / r, r + 20, y, 7, 30, 7); }
  },
}));
