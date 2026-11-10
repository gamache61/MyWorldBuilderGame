/* ============================================================
   THE CRYSTAL MINES · BUILD 4 · THE REFINERY & THE CRYSTAL RAIL
   Keep this file in projects/crystalmines next to 50-crystalmines.html.
   The refinery, where raw crystal is melted and made into clean fuel,
   and the Crystal Rail: a long raised line that carries the fuel
   down from the mountains to the landing field and the cities.
   ============================================================ */
(function () {
  const P = window.YARD;
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 4, name: 'THE REFINERY & THE CRYSTAL RAIL',
    brief: 'The refinery where raw crystal is made into clean fuel, and a long raised Crystal Rail that carries the fuel down from the mountains to the landing field and the cities.',
    types: {
      REFINERY: { code: 'SY', name: 'REFINERY', col: '#d9731b', w: 140, d: 90, h: 60 },
      CRYSTALRAIL: { code: 'SF', name: 'CRYSTAL RAIL', col: '#9aa3ad', w: 1000, d: 16, h: 30 },
    },
    order: ['REFINERY', 'CRYSTALRAIL'],
    at: { REFINERY: [[1580, -20]], CRYSTALRAIL: [[1300, 80]] },
    eye: [1250, 190, 480],
    stats(api, c) { return [['REFINERY', c('REFINERY') ? 'REFINING' : 'NOT YET'], ['CRYSTAL RAIL', c('CRYSTALRAIL') ? 'RUNNING' : 'NOT YET']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, S = P.hm(api), C = P.fun(api);
      const cry = P._cry = P._cry || [0x7ffcff, 0x9f7bff, 0x6dffb0].map(c => new T.MeshStandardMaterial({ color: c, emissive: c, emissiveIntensity: 1.4, roughness: 0.25, transparent: true, opacity: 0.92 }));
      const hot = P._hot = P._hot || new T.MeshBasicMaterial({ color: new T.Color(2.2, 1.3, 0.5), toneMapped: false });
      if (type === 'REFINERY') {
        add(new T.BoxGeometry(142, 1, 92), S.gravel, 0, 0.5, 0);
        add(new T.BoxGeometry(60, 26, 50), F.white, -30, 14, 0); add(new T.BoxGeometry(64, 1.6, 54), S.slate, -30, 27.8, 0);
        // tall glass tanks full of glowing liquid crystal, with pipes between them, and tall chimneys
        for (let i = 0; i < 5; i++) { const x = 10 + i * 20; add(new T.CylinderGeometry(7, 7, 38, 20), S.glass, x, 20, -22).castShadow = false; add(new T.CylinderGeometry(5.6, 5.6, 28 - (i % 3) * 5, 20), cry[i % 3], x, 15, -22).castShadow = false; add(new T.CylinderGeometry(7.4, 7.4, 1.4, 20), C.yellow, x, 39.6, -22); add(new T.BoxGeometry(2, 2, 22), F.steel, x, 34, -10); }
        for (let i = 0; i < 4; i++) { const x = 20 + i * 24; add(new T.CylinderGeometry(4, 5, 50, 16), F.white, x, 26, 24); add(new T.CylinderGeometry(4.2, 4.2, 1.6, 16), hot, x, 51, 24).castShadow = false; }
        add(new T.BoxGeometry(100, 1.6, 1.6), F.steel, 20, 33, -10); add(new T.BoxGeometry(1.6, 1.6, 30), F.steel, -2, 33, 2);
        add(new T.BoxGeometry(16, 10, 0.6), S.glass, -30, 10, 25.4);
        P.sign(api, g, 'THE REFINERY · CRYSTAL TO FUEL', 34, 3.6, -30, 31, 26, 0, '#14324a', '#bff8d0', true);
        for (let i = 0; i < 3; i++) P.person(g, P.civ(50400 + i), i % 2 ? 'tablet' : 'idle', -8 + i * 8, 1, 38, Math.PI);
      } else {
        // the Crystal Rail: a raised track on pylons from the mountains to the landing field, a station at each end, and a train
        const L = 1000, h = 28, half = L / 2;
        add(new T.BoxGeometry(L, 1.8, 10), F.panel, 0, h, 0);
        for (const z of [-3.4, 3.4]) add(new T.BoxGeometry(L, 0.5, 0.6), F.steel, 0, h + 1.2, z);
        add(new T.BoxGeometry(L, 0.3, 0.5), cry[0], 0, h + 0.2, 4.8).castShadow = false;
        for (let x = -half + 20; x <= half - 20; x += 50) { const gy = P.ground(api, sl.x + x, sl.z) - sl.y; add(new T.BoxGeometry(4.4, h - gy, 4.4), S.stone, x, gy + (h - gy) / 2, 0); add(new T.BoxGeometry(9, 1.4, 9), S.stone, x, h - 1.2, 0); }
        for (const [x, w2] of [[half - 70, 1], [-half + 60, -1]]) { add(new T.BoxGeometry(70, 13, 22), F.white, x, h + 8, 0); add(new T.BoxGeometry(72, 1.4, 24), S.slate, x, h + 14.8, 0); add(new T.BoxGeometry(66, 8, 22.4), S.glass, x, h + 8, 0); P.sign(api, g, w2 > 0 ? 'CRYSTAL RAIL · THE MINES' : 'CRYSTAL RAIL · SEASHORE & KRYOS', 36, 3.2, x, h + 18.6, 11.4, 0, '#14324a', '#bff8ff', true); }
        // a train of three fuel cars waiting at the mine end
        for (let i = 0; i < 3; i++) { const x = half - 120 - i * 26; add(new T.BoxGeometry(24, 5, 6.4), F.white, x, h + 4.5, 0); add(new T.BoxGeometry(24.2, 1.2, 6.6), cry[i % 3], x, h + 3, 0).castShadow = false; add(new T.BoxGeometry(20, 2.6, 5), cry[(i + 1) % 3], x, h + 7.9, 0).castShadow = false; }
        for (let i = 0; i < 4; i++) P.person(g, i % 3 === 1 ? P.kid(50500 + i) : P.civ(50500 + i), 'idle', half - 80 + i * 4, h + 1, 12 * 0 + 0, Math.PI);
      }
    },
  }));
})();
