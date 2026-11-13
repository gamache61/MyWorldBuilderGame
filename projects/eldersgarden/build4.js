/* ============================================================
   THE ELDERS GARDEN · BUILD 4 · THE BENCHES, THE GREENHOUSES & THE STORY HOUSE
   Keep this file in projects/eldersgarden next to 68-eldersgarden.html.
   ============================================================ */
(function () {
  const P = window.EGP;
  const rel = a => a.map(([x, z]) => [1550 + x, z]);
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 4, name: 'THE BENCHES, THE GREENHOUSES & THE STORY HOUSE',
    brief: 'Ten benches along the paths, two glass greenhouses for seedlings, and the Story House, a warm round hall where the elders tell what they remember.',
    types: {
      BENCH: { code: 'HM', name: 'GARDEN BENCH', col: '#9a6f42', w: 8, d: 3, h: 3 },
      GREENHOUSE: { code: 'SY', name: 'GREENHOUSE', col: '#cfefff', w: 50, d: 24, h: 12 },
      STORYHOUSE: { code: 'SY', name: 'STORY HOUSE', col: '#ffd9a0', w: 60, d: 30, h: 16 },
    },
    order: ['BENCH', 'GREENHOUSE', 'STORYHOUSE'],
    at: {
      BENCH: rel([[-150, -12], [-150, 12], [-70, -12], [-70, 12], [70, -12], [70, 12], [150, -12], [150, 12], [14, -50], [14, 50]]),
      GREENHOUSE: rel([[190, -170], [190, 170]]), STORYHOUSE: rel([[200, -90]]),
    },
    eye: [1550 + 120, P.SY + 120, 250],
    stats(api, c) { return [['BENCHES', c('BENCH') + ' / 10'], ['GREENHOUSES', c('GREENHOUSE') + ' / 2'], ['STORY HOUSE', c('STORYHOUSE') ? 'OPEN TO ALL' : 'NOT YET']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, H = P.eg(api);
      if (type === 'BENCH') {
        const face = k >= 8 ? 0 : (k % 2 ? 0 : Math.PI);
        const b = new T.Group(); g.add(b); b.rotation.y = face;
        add(new T.BoxGeometry(8, 0.5, 2.4), H.timber, 0, 1.6, 0, false, b); add(new T.BoxGeometry(8, 1.6, 0.4), H.timber, 0, 2.6, -1.1, false, b);
        for (const x of [-3.4, 3.4]) add(new T.BoxGeometry(0.5, 1.6, 2.2), H.dark, x, 0.8, 0, false, b);
        if (k % 3 === 0) P.person(b, P.civ(68200 + k), 'idle', 0, 1.8, 0, Math.PI);
      } else if (type === 'GREENHOUSE') {
        add(new T.BoxGeometry(50, 0.8, 24), H.stone, 0, 0.4, 0);
        add(new T.BoxGeometry(48, 7, 22), H.glass, 0, 4.4, 0, false);
        for (const sd of [-1, 1]) { const rf = add(new T.BoxGeometry(48, 0.3, 12.4), H.glass, 0, 9.6, sd * 5.3, false); rf.rotation.x = sd * 0.42; }
        for (let i = -4; i <= 4; i++) add(new T.BoxGeometry(0.4, 8.5, 22.4), H.white, i * 6, 4.6, 0, false);
        for (const z of [-6, 6]) for (let i = 0; i < 8; i++) add(new T.SphereGeometry(1, 6, 5), H.veg[(i + k) % 6], -20 + i * 5.7, 1.9, z, false);
        P.person(g, P.civ(68260 + k), 'idle', 0, 0.8, 0, k ? 0 : Math.PI);
      } else {
        add(new T.CylinderGeometry(15, 16, 1.2, 28), H.stone, 0, 0.6, 0);
        add(new T.CylinderGeometry(13, 13, 9, 28), H.wall, 0, 5.7, 0);
        for (let i = 0; i < 14; i++) { const a = i / 14 * Math.PI * 2; add(new T.BoxGeometry(2.2, 3.6, 0.3), H.win, Math.cos(a) * 13.1, 6, Math.sin(a) * 13.1, false).rotation.y = -a + Math.PI / 2; }
        add(new T.ConeGeometry(15, 8, 28), H.roof, 0, 14.7, 0);
        add(new T.CylinderGeometry(0.5, 0.5, 3, 8), H.steel, 0, 19.2, 0, false); add(new T.SphereGeometry(0.9, 8, 6), H.lamp, 0, 21, 0, false);
        add(new T.BoxGeometry(5, 5, 0.6), H.dark, 0, 3.8, 13.2, false);
        add(new T.CylinderGeometry(4.5, 4.5, 0.8, 16), H.fire, 0, 9.6, 0, false).visible = false;
        for (let i = 0; i < 7; i++) P.person(g, P.civ(68300 + i), i % 3 === 1 ? 'tablet' : 'idle', -9 + i * 3, 1.2, 19, Math.PI);
        P.person(g, P.kid(68310), 'idle', 4, 1.2, 22, Math.PI);
        P.sign(api, g, 'THE STORY HOUSE · ASK AN ELDER', 22, 2.4, 0, 12, 15.4, 0, '#3a2a1a', '#ffe9b8');
      }
    },
  }));
})();
