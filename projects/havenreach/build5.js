/* ============================================================
   AEGIS ARK · BUILD 5 · COMMAND & ENGINEERING
   Keep this file in the havenreach folder next to AegisArk.html.
   Trip 1 — 12 floor sections of the innermost raised ring, around
            the spindle and the Heartforge.
   Trip 2 — 12 sections of control towers, offices and domes.
   Build 5 ends when you start the disc spinning (press L).
   ============================================================ */
(window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(HAVEN.ringBuild({
  ring: 'CMD', name: 'COMMAND & ENGINEERING',
  brief: 'The innermost ring of the disc: control towers and engineering offices around the Heartforge.',
  floorName: 'COMMAND FLOOR SECTION', packName: 'CONTROL TOWER BLOCK', packCode: 'SY', packCol: '#e8e1d1',
  trip2: 'CONTROL TOWERS', finishLabel: 'START THE DISC SPINNING', flags: ['spin'],
  needs: (api) => api.flag('power') ? null : 'NEEDS THE HEARTFORGE LIT FIRST',
  fill(api, THREE, S, b, a0, a1, R, k) {
    const y = R.y, rnd = mul(500 + k);
    for (let r = 225; r < 380; r += 50) for (let a = a0 + 30 / r; a < a1; a += 60 / r) { if (rnd() < 0.3) continue; const h = 15 + rnd() * 60; b.put('cmdT', S.BOX, S.glassy, a, r, y, 24, h, 24); b.put('cmdB', S.BOX, S.white, a, r, y + h, 25, 2, 25); }
    if (k % 4 === 1) b.put('cmdDome', S.DOME, S.std(0xd8dde2, 0.3, 0.5), (a0 + a1) / 2 + 0.05, 300, y, 45, 35, 45);
  },
}));
function mul(a) { return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
