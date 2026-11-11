/* ============================================================
   THE LANGUAGE HOUSE · BUILD 4 · THE LISTENING LIBRARY & THE SONG GARDEN
   Keep this file in projects/languagehouse next to 59-languagehouse.html.
   A great round library of books, songs and maps, and a garden of bells and chimes where songs are learned by ear.
   ============================================================ */
(function () {
  const P = window.YARD;
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 4, name: 'THE LISTENING LIBRARY & THE SONG GARDEN',
    brief: 'A great round library of books, songs and maps, and a garden of bells and chimes where songs are learned by ear.',
    types: {
      LIBRARY: { code: 'SY', name: 'LISTENING LIBRARY', col: '#c8a878', w: 100, d: 90, h: 36 },
      SONGGARDEN: { code: 'SY', name: 'SONG GARDEN', col: '#6fd08a', w: 110, d: 110, h: 22 },
    },
    order: ['LIBRARY', 'SONGGARDEN'],
    at: { LIBRARY: [[1800, -120]], SONGGARDEN: [[1800, 110]] },
    eye: [1120, 190, 480],
    stats(api, c) { return [['LISTENING LIBRARY', c('LIBRARY') ? 'OPEN' : 'NOT YET'], ['SONG GARDEN', c('SONGGARDEN') ? 'RINGING' : 'NOT YET']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, S = P.hm(api), C = P.fun(api);
      const gold = P._gold = P._gold || new T.MeshStandardMaterial({ color: 0xe8c060, roughness: 0.3, metalness: 0.8 });
      if (type === 'LIBRARY') {
        add(new T.BoxGeometry(102, 1, 92), S.gravel, 0, 0.5, 0);
        add(new T.CylinderGeometry(36, 38, 26, 36), new T.MeshStandardMaterial({ color: 0xc8a878, roughness: 0.8 }), 0, 14, 0);
        add(new T.CylinderGeometry(37, 37, 2, 36), S.slate, 0, 28, 0);
        add(new T.SphereGeometry(30, 28, 10, 0, Math.PI * 2, 0, Math.PI / 2), S.glass, 0, 29, 0).castShadow = false;
        for (let i = 0; i < 18; i++) { const a = i / 18 * Math.PI * 2; add(new T.BoxGeometry(3.4, 18, 0.6), S.glass, Math.cos(a) * 37.5, 15, Math.sin(a) * 37.5).rotation.y = -a + Math.PI / 2; }
        for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; add(new T.CylinderGeometry(1.4, 1.6, 26, 8), F.white, Math.cos(a) * 41, 14, Math.sin(a) * 41); }
        add(new T.BoxGeometry(24, 12, 20), F.white, 0, 8, 44); add(new T.BoxGeometry(12, 9, 1), F.dark, 0, 6, 54.2);
        for (let i = 0; i < 6; i++) add(new T.BoxGeometry(2.4, 5, 2.4), gold, -15 + i * 6, 4, 58).castShadow = false;
        P.sign(api, g, 'THE LISTENING LIBRARY', 42, 4, 0, 18, 55, 0, '#3a2410', '#ffe9b0', true);
        for (let i = 0; i < 3; i++) P.person(g, P.civ(59300 + i), i % 2 ? 'tablet' : 'idle', -8 + i * 8, 1.1, 62, Math.PI);
      } else {
        add(new T.BoxGeometry(112, 1, 112), S.gravel, 0, 0.5, 0);
        add(new T.CylinderGeometry(52, 52, 0.6, 40), C.grass, 0, 1.2, 0).castShadow = false;
        for (let i = 0; i < 4; i++) { const a = i / 4 * Math.PI * 2; const p = add(new T.BoxGeometry(5, 0.2, 52), C.soft, Math.cos(a) * 26, 1.6, Math.sin(a) * 26); p.rotation.y = -a + Math.PI / 2; p.castShadow = false; }
        add(new T.CylinderGeometry(14, 14, 2, 24), S.stone, 0, 1.6, 0);
        for (let i = 0; i < 6; i++) { const a = i / 6 * Math.PI * 2, x = Math.cos(a) * 36, z = Math.sin(a) * 36;
          add(new T.CylinderGeometry(0.5, 0.6, 20, 6), F.steel, x, 10, z); add(new T.BoxGeometry(8, 0.6, 0.6), F.steel, x, 20, z);
          for (let j = 0; j < 4; j++) add(new T.CylinderGeometry(0.4 + j * 0.1, 0.8 + j * 0.15, 4 + j * 1.2, 8), gold, x - 3.2 + j * 2.1, 16 - j * 0.6, z); }
        add(new T.CylinderGeometry(1.2, 1.6, 18, 8), F.white, 0, 11, 0);
        for (let j = 0; j < 7; j++) { const a = j / 7 * Math.PI * 2; add(new T.CylinderGeometry(0.5 + (j % 3) * 0.2, 1.1 + (j % 3) * 0.3, 4, 8), gold, Math.cos(a) * 6, 16, Math.sin(a) * 6); }
        for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2; add(new T.BoxGeometry(5, 1.2, 1.6), F.wood || S.dim, Math.cos(a) * 46, 1.6, Math.sin(a) * 46).rotation.y = -a; }
        P.sign(api, g, 'THE SONG GARDEN · LEARN A SONG BY EAR', 44, 3.4, 0, 6, 58, 0, '#14324a', '#c8ffd0', true);
        for (let i = 0; i < 7; i++) P.person(g, i % 2 ? P.kid(59350 + i) : P.civ(59350 + i), 'idle', -18 + i * 6, 1.2, 30 + (i % 3) * 3, Math.PI);
      }
    },
  }));
})();
