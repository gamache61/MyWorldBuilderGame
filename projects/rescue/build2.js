/* ============================================================
   THE RESCUE · BUILD 2 · THE RESCUE CRAFT
   Keep this file in projects/rescue next to 56-rescue.html.
   Three sleek white rescue craft with open hands: no guns, a red cross on the side and a doctor's seat inside.
   ============================================================ */
(function () {
  const P = window.YARD;
  P.craftPos = [[1450, -200], [1550, -200], [1650, -200]];
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 2, name: 'THE RESCUE CRAFT',
    brief: 'Three sleek white rescue craft, unarmed, with a red cross on the side and a medic’s seat inside.',
    types: { RESCUECRAFT: { code: 'SY', name: 'RESCUE CRAFT', col: '#f2f4f6', w: 40, d: 60, h: 24 } },
    order: ['RESCUECRAFT'],
    at: { RESCUECRAFT: P.craftPos },
    eye: [1000, 150, -20],
    stats(api, c) { return [['RESCUE CRAFT', c('RESCUECRAFT') + ' / 3']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, S = P.hm(api), C = P.fun(api);
      add(new T.CylinderGeometry(19, 20, 1.2, 28), S.gravel, 0, 0.6, 0);
      const ring = add(new T.TorusGeometry(17, 0.35, 6, 40), F.lamp, 0, 1.3, 0); ring.rotation.x = Math.PI / 2; ring.castShadow = false;
      add(new T.CapsuleGeometry(5.2, 24, 6, 16).rotateX(Math.PI / 2), F.white, 0, 11, 0);
      add(new T.BoxGeometry(10.6, 1.4, 22), C.orange, 0, 14.6, -2);
      const cp = add(new T.SphereGeometry(4.4, 18, 10, 0, Math.PI * 2, 0, Math.PI / 2), S.glass, 0, 13.4, 10); cp.rotation.x = 0.35;
      for (const sd of [-1, 1]) { add(new T.BoxGeometry(0.4, 5.6, 1.6), C.red, sd * 5.3, 11, -4); add(new T.BoxGeometry(0.4, 1.6, 5.6), C.red, sd * 5.3, 11, -4); }
      add(new T.BoxGeometry(26, 0.8, 8), F.white, 0, 8.6, -6);
      for (const sd of [-1, 1]) { const n = add(new T.CylinderGeometry(1.9, 1.9, 10, 12).rotateX(Math.PI / 2), F.steel, sd * 13, 8.6, -7); add(new T.SphereGeometry(1.5, 10, 8), F.lamp, sd * 13, 8.6, -12.4).castShadow = false; add(new T.CylinderGeometry(0.3, 0.3, 7, 5), F.steel, sd * 13, 4.6, -6); }
      for (const [x, z] of [[-4, 8], [4, 8], [0, -10]]) add(new T.CylinderGeometry(0.4, 0.6, 7, 6), F.steel, x, 4.6, z);
      add(new T.BoxGeometry(2.6, 5.5, 1), F.white, 0, 17, -13);
      P.sign(api, g, 'RESCUE ' + (k + 1) + ' · NO WEAPONS', 16, 2.6, 0, 3.6, 21, 0, '#7a1f1a', '#ffffff', true);
      P.person(g, P.civ(56100 + k), 'tablet', 14, 1.2, 14, Math.PI);
    },
  }));
})();
