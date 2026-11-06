/* ============================================================
   AEGIS ARK · BUILD 10 · LIVING DISTRICTS
   Keep this file in the havenreach folder next to AegisArk.html.
   Trip 1 — 12 sections of open floor under the glass roof.
   Trip 2 — 12 city sections: the avenue, shops, homes, apartment
            blocks and parks.
   Build 10 ends when you open the districts (press L).
   ============================================================ */
(window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(HAVEN.ringBuild({
  ring: 'LIV', name: 'LIVING DISTRICTS',
  brief: 'Where the people live: an avenue of shops round the disc, homes, apartment blocks and parks.',
  floorName: 'DISTRICT FLOOR SECTION', packName: 'CITY SECTION', packCode: 'HM', packCol: '#7b4fa0', floorCol: '#3a7d44',
  trip2: 'THE CITY', finishLabel: 'OPEN THE DISTRICTS', flags: ['living'],
  fill(api, THREE, S, b, a0, a1, R, k, g, mesh) {
    const y = R.y, AV = 1830; let s = 1000 + k * 13; const rnd = () => (s = (s * 16807) % 2147483647) / 2147483647;
    const wc = [0xe8dcc0, 0xd8c8b0, 0xc8d0d8, 0xe0d0c8, 0xb8c4b0, 0xd0b8a8], rc = [0x7a3a2a, 0x4a4a50, 0x3a5a6a, 0x6a4a3a];
    mesh(HAVEN.ann(THREE, AV - 9, AV + 9, a0, a1, y + 0.35), S.asphalt, false);
    mesh(HAVEN.ann(THREE, AV - 15, AV - 9, a0, a1, y + 0.4), S.walk, false); mesh(HAVEN.ann(THREE, AV + 9, AV + 15, a0, a1, y + 0.4), S.walk, false);
    for (let a = a0 + 9 / AV; a < a1; a += 18 / AV) for (const sd of [-1, 1]) { b.put('shop', S.BOX, S.white, a, AV + sd * 22, y, 12, 9, 15, 0, wc[(rnd() * 6) | 0]); b.put('shopWin', S.BOX, S.glow, a, AV + sd * 15.8, y + 1, 0.3, 2.6, 13, 0, 0xbfe0ff); }
    for (let r = 1590; r < 2090; r += 44) { if (Math.abs(r - AV) < 40) continue;
      for (let a = a0 + 9 / r; a < a1; a += 18 / r) { const v = rnd();
        if (v < 0.1) { b.put('tree', S.BALL, S.leaf, a, r, y + 7, 5, 6, 5, 0, 0x3c7d33); continue; }
        if (v < 0.27) { const fl = 4 + ((rnd() * 6) | 0); b.put('apt', S.BOX, S.white, a, r, y, 14, fl * 3.4, 14, 0, wc[(rnd() * 6) | 0]); for (let f = 0; f < fl; f++) b.put('aptWin', S.BOX, S.glow, a, r, y + 1.5 + f * 3.4, 14.2, 1.1, 14.2, 0, 0xbfe0ff); continue; }
        b.put('house', S.BOX, S.white, a, r, y, 9, 6, 8, 0, wc[(rnd() * 6) | 0]); b.put('roof', S.CONE4, S.white, a, r, y + 6, 12, 4, 11, 0, rc[(rnd() * 4) | 0]); } }
    const pa = (a0 + a1) / 2 + 0.06; for (let j = 0; j < 60; j++) b.put('park', S.BALL, S.leaf, pa + (rnd() - 0.5) * 120 / 1735, 1700 + rnd() * 70, y + 7, 5, 6, 5, 0, 0x4f9a3a);
  },
}));
