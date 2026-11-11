/* ============================================================
   THE GREAT LIBRARY OF UNITY · BUILD 4 · THE ARCHIVE TOWER & THE READING GARDEN
   Keep this file in projects/greatlibrary next to 60-greatlibrary.html.
   A tall archive tower that keeps the oldest and rarest things, and a garden where people read under trees beside a pond.
   ============================================================ */
(function () {
  const P = window.LIB;
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 4, name: 'THE ARCHIVE TOWER & THE READING GARDEN',
    brief: 'A tall round tower that keeps the oldest and rarest things, and a garden where people read under the trees beside a pond.',
    types: {
      ARCHIVE: { code: 'SY', name: 'ARCHIVE TOWER', col: '#d8d2c6', w: 70, d: 70, h: 110 },
      READGARDEN: { code: 'SY', name: 'READING GARDEN', col: '#6fd08a', w: 180, d: 80, h: 14 },
    },
    order: ['ARCHIVE', 'READGARDEN'],
    at: { ARCHIVE: [[1550, -190]], READGARDEN: [[1550, 185]] },
    eye: [1120, 190, 480],
    stats(api, c) { return [['ARCHIVE TOWER', c('ARCHIVE') ? 'OPEN' : 'NOT YET'], ['READING GARDEN', c('READGARDEN') ? 'OPEN' : 'NOT YET']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, S = P.hm(api), C = P.fun(api);
      if (type === 'ARCHIVE') {
        add(new T.BoxGeometry(72, 1, 72), S.gravel, 0, 0.5, 0);
        add(new T.CylinderGeometry(24, 28, 6, 24), S.stone, 0, 4, 0);
        add(new T.CylinderGeometry(20, 22, 80, 24), new T.MeshStandardMaterial({ color: 0xd8d2c6, roughness: 0.8 }), 0, 47, 0);
        for (let i = 0; i < 6; i++) { add(new T.TorusGeometry(21.2 - i * 0.2, 0.7, 6, 24), F.gold, 0, 14 + i * 13, 0).rotation.x = Math.PI / 2; }
        for (let r = 0; r < 5; r++) for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2 + r * 0.26; add(new T.BoxGeometry(2.6, 6, 0.5), S.warm, Math.cos(a) * 21, 20 + r * 13, Math.sin(a) * 21).rotation.y = -a + Math.PI / 2; }
        add(new T.CylinderGeometry(23, 20, 4, 24), S.slate, 0, 88.5, 0);
        add(new T.ConeGeometry(18, 22, 24), S.copper, 0, 101, 0);
        add(new T.CylinderGeometry(0.5, 0.5, 14, 6), F.steel, 0, 120, 0); add(new T.SphereGeometry(2.2, 10, 8), F.lamp, 0, 128, 0).castShadow = false;
        add(new T.BoxGeometry(9, 12, 6), S.stone, 0, 8, 24); add(new T.BoxGeometry(5, 8, 1), F.dark, 0, 6, 27.2);
        P.sign(api, g, 'THE ARCHIVE · THE OLDEST AND RAREST THINGS', 34, 3.2, 0, 15, 27.6, 0, '#2a2418', '#ffe9b0', true);
      } else {
        const water = P._pond = P._pond || new T.MeshStandardMaterial({ color: 0x3f86b0, roughness: 0.08, metalness: 0.45 });
        add(new T.BoxGeometry(184, 1, 84), S.gravel, 0, 0.5, 0);
        add(new T.BoxGeometry(178, 0.6, 78), C.grass, 0, 1.2, 0).castShadow = false;
        add(new T.CylinderGeometry(16, 16, 0.8, 28), S.stone, 0, 1.4, 0); add(new T.CylinderGeometry(13.5, 13.5, 1, 28), water, 0, 1.6, 0).castShadow = false;
        add(new T.CylinderGeometry(1.2, 1.6, 7, 10), S.stone, 0, 4.5, 0);
        for (const sx of [-1, 1]) { add(new T.BoxGeometry(60, 0.3, 4), S.stone, sx * 46, 1.6, 0).castShadow = false; }
        for (const sx of [-1, 1]) for (const sz of [-1, 1]) {
          const x = sx * 68, z = sz * 26; add(new T.CylinderGeometry(0.7, 1, 8, 6), F.wood, x, 5, z); add(new T.IcosahedronGeometry(6.4, 0), C.green, x, 12, z);
        }
        for (let i = 0; i < 6; i++) { const a = i / 6 * Math.PI * 2, x = Math.cos(a) * 22, z = Math.sin(a) * 16; add(new T.BoxGeometry(5, 0.8, 1.6), F.wood, x, 2.4, z).rotation.y = -a; }
        for (let i = 0; i < 6; i++) P.person(g, i % 2 ? P.kid(60300 + i) : P.civ(60300 + i), i % 2 ? 'idle' : 'tablet', -40 + i * 16, 1.5, 30 - (i % 3) * 8, Math.PI * 0.2 * i);
        P.sign(api, g, 'THE READING GARDEN · NO SHUSHING OUT HERE', 52, 3.2, 0, 7, -38, Math.PI, '#14324a', '#c8ffd0', true);
      }
    },
  }));
})();
