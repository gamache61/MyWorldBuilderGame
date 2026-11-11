/* ============================================================
   THE GREAT LIBRARY OF UNITY · BUILD 3 · THE READING ROOMS
   Keep this file in projects/greatlibrary next to 60-greatlibrary.html.
   Four quiet reading rooms beside the hall: stories, maps, science and songs.
   ============================================================ */
(function () {
  const P = window.LIB;
  P.roomPos = [[1360, -100], [1360, 100], [1740, -100], [1740, 100]];
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 3, name: 'THE READING ROOMS',
    brief: 'Four quiet reading rooms in the wings of the Library: one for stories, one for maps, one for science and one for songs.',
    types: { READROOM: { code: 'SY', name: 'READING ROOM', col: '#c8a878', w: 90, d: 70, h: 30 } },
    order: ['READROOM'],
    at: { READROOM: P.roomPos },
    eye: [1000, 190, 400],
    stats(api, c) { return [['READING ROOMS', c('READROOM') + ' / 4'], ['QUIET SEATS', (c('READROOM') * 250).toLocaleString()]]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, S = P.hm(api), C = P.fun(api);
      const names = ['THE ROOM OF STORIES', 'THE ROOM OF MAPS', 'THE ROOM OF SCIENCE', 'THE ROOM OF SONGS'], col = [C.pink, C.blue, C.green, C.orange][k % 4];
      const wall = P._wall = P._wall || new T.MeshStandardMaterial({ color: 0xd8c8a8, roughness: 0.85 });
      add(new T.BoxGeometry(92, 1, 72), S.gravel, 0, 0.5, 0);
      add(new T.BoxGeometry(86, 18, 64), wall, 0, 10, 0);
      add(new T.BoxGeometry(92, 2, 70), col, 0, 20, 0);
      add(new T.BoxGeometry(60, 8, 40), S.glass, 0, 24, 0).castShadow = false;
      add(new T.BoxGeometry(62, 1.2, 42), F.steel, 0, 28.2, 0);
      for (let x = -34; x <= 34; x += 11) { add(new T.BoxGeometry(6, 11, 0.5), S.glass, x, 11, 32.4); add(new T.BoxGeometry(6, 11, 0.5), S.glass, x, 11, -32.4); }
      for (let i = 0; i < 6; i++) add(new T.CylinderGeometry(1.1, 1.2, 18, 8), F.white, -40 + i * 16, 10, 36);
      add(new T.BoxGeometry(14, 10, 1), F.dark, 0, 6, 32.6);
      P.sign(api, g, names[k % 4], 50, 3.6, 0, 22, 36.6, 0, '#2a2418', '#ffe9b0', true);
      for (let i = 0; i < 3; i++) P.person(g, P.civ(60200 + k * 4 + i), i % 2 ? 'tablet' : 'idle', -8 + i * 8, 1.1, 42, Math.PI);
    },
  }));
})();
