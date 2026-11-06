/* ============================================================
   AEGIS ARK · BUILD 6 · RECYCLING
   Keep this file in the havenreach folder next to AegisArk.html.
   Trip 1 — 12 floor sections of the Recycling ring.
   Trip 2 — 12 sections of water tanks and sorting halls.
   Build 6 ends when you start the recyclers (press L).
   ============================================================ */
(window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(HAVEN.ringBuild({
  ring: 'REC', name: 'RECYCLING',
  brief: 'The recycling ring: water reclaimers, air scrubbers and sorting halls that reuse almost everything.',
  floorName: 'RECYCLING FLOOR SECTION', packName: 'RECYCLER BLOCK', packCode: 'RU', packCol: '#2a9d8f', floorCol: '#2a9d8f',
  trip2: 'RECYCLERS', finishLabel: 'START THE RECYCLERS', flags: ['recycle'],
  fill(api, THREE, S, b, a0, a1, R, k) {
    const y = R.y; let s = 600 + k; const rnd = () => (s = (s * 16807) % 2147483647) / 2147483647;
    for (let r = 420; r < 610; r += 55) for (let a = a0 + 25 / r; a < a1; a += 50 / r) { b.put('recTank', S.CYL, S.std(0x8fb3ac, 0.5, 0.4), a, r, y, 16, 16 + rnd() * 18, 16); if (rnd() < 0.5) b.put('recHall', S.BOX, S.std(0x6d8f8a, 0.7), a + 25 / r, r + 20, y, 36, 14, 22); }
  },
}));
