/* ============================================================
   AEGIS ARK · BUILD 7 · INDUSTRY
   Keep this file in the havenreach folder next to AegisArk.html.
   Trip 1 — 12 floor sections of the Industry ring.
   Trip 2 — 12 sections of factory halls and smokestacks.
   Build 7 ends when you start the factories (press L).
   ============================================================ */
(window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(HAVEN.ringBuild({
  ring: 'IND', name: 'INDUSTRY',
  brief: 'The industry ring: factories that turn recycled material into new parts for the station.',
  floorName: 'INDUSTRY FLOOR SECTION', packName: 'FACTORY BLOCK', packCode: 'FB', packCol: '#e8c13a',
  trip2: 'FACTORIES', finishLabel: 'START THE FACTORIES', flags: ['industry'],
  fill(api, THREE, S, b, a0, a1, R, k) {
    const y = R.y; let s = 700 + k; const rnd = () => (s = (s * 16807) % 2147483647) / 2147483647;
    for (let r = 660; r < 845; r += 60) for (let a = a0 + 35 / r; a < a1; a += 70 / r) { b.put('indHall', S.BOX, S.std(0xd8d2c4, 0.8), a, r, y, 50, 20, 34); b.put('indBand', S.BOX, S.std(0xe8c13a, 0.6), a, r, y + 18, 51, 3, 35); if (rnd() < 0.3) b.put('indStack', S.CYL, S.std(0xb8b2a6, 0.8), a + 30 / r, r + 22, y, 4, 60, 4); }
  },
}));
