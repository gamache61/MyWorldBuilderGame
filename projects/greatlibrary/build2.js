/* ============================================================
   THE GREAT LIBRARY OF UNITY · BUILD 2 · THE GREAT READING HALL
   Keep this file in projects/greatlibrary next to 60-greatlibrary.html.
   The great hall of the Library: broad steps, twelve tall columns, a barrel-vaulted roof, glowing clerestory windows and doors that never close.
   ============================================================ */
(function () {
  const P = window.LIB;
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 2, name: 'THE GREAT READING HALL',
    brief: 'The great hall of the Library: broad steps, twelve tall columns, a barrel-vaulted roof, glowing high windows, and doors that never close.',
    types: { GREATHALL: { code: 'SY', name: 'GREAT READING HALL', col: '#e8e1d1', w: 200, d: 130, h: 62 } },
    order: ['GREATHALL'],
    at: { GREATHALL: [[1550, 0]] },
    eye: [1000, 210, 330],
    stats(api, c) { return [['GREAT READING HALL', c('GREATHALL') ? 'OPEN' : 'NOT YET'], ['BOOKS ON THE SHELVES', c('GREATHALL') ? '1,200,000' : '0']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, S = P.hm(api), C = P.fun(api);
      add(new T.BoxGeometry(206, 1.4, 136), S.gravel, 0, 0.7, 0);
      add(new T.BoxGeometry(192, 3, 124), S.stone, 0, 2.9, 0);
      add(new T.BoxGeometry(182, 3, 114), S.stone, 0, 5.9, 0);
      add(new T.BoxGeometry(160, 30, 84), F.white, 0, 22.5, 0);
      add(new T.BoxGeometry(168, 2.4, 92), S.slate, 0, 38.7, 0);
      const vault = add(new T.CylinderGeometry(40, 40, 160, 28).rotateZ(Math.PI / 2), S.copper, 0, 38, 0); vault.scale.set(1, 0.62, 1);
      for (let x = -70; x <= 70; x += 14) { const r = add(new T.TorusGeometry(40, 0.5, 6, 28, Math.PI), F.steel, x, 38, 0); r.rotation.y = Math.PI / 2; r.scale.set(0.62, 1, 1); r.castShadow = false; }
      for (let x = -66; x <= 66; x += 12) { add(new T.BoxGeometry(7, 11, 0.5), S.warm, x, 36, 41.6).castShadow = false; add(new T.BoxGeometry(7, 11, 0.5), S.warm, x, 36, -41.6).castShadow = false; }
      for (let i = 0; i < 12; i++) add(new T.CylinderGeometry(2.1, 2.4, 32, 12), F.white, -66 + i * 12, 22, 49);
      add(new T.BoxGeometry(160, 3, 10), S.stone, 0, 39, 49);
      add(new T.BoxGeometry(70, 12, 8), S.stone, 0, 46, 49);
      add(new T.CylinderGeometry(2, 2, 3, 3).rotateX(Math.PI / 2), S.stone, 0, 53, 49).scale.set(18, 3, 1);
      add(new T.BoxGeometry(28, 18, 1), F.dark, 0, 14, 42.2);
      for (let x = -56; x <= 56; x += 14) if (Math.abs(x) > 18) add(new T.BoxGeometry(8, 16, 0.5), S.glass, x, 18, 42.3);
      for (let i = 0; i < 7; i++) add(new T.BoxGeometry(182 - i * 6, 0.8, 8), S.stone, 0, 0.8 + i * 0.7, 66 - i * 1.5).castShadow = false;
      add(new T.BoxGeometry(12, 8, 12), S.stone, -90, 4, 62); add(new T.BoxGeometry(12, 8, 12), S.stone, 90, 4, 62);
      for (const sx of [-90, 90]) add(new T.SphereGeometry(4.5, 10, 8), F.gold, sx, 11, 62);
      P.sign(api, g, 'THE GREAT LIBRARY OF UNITY', 66, 5.5, 0, 47, 53.2, 0, '#2a2418', '#ffe9b0', true);
      P.sign(api, g, 'EVERY STORY · EVERY SONG · EVERY MAP · FOR EVERYONE', 60, 2.8, 0, 8.5, 42.8, 0, '#2a2418', '#e8e1d1', true);
      for (let i = 0; i < 6; i++) P.person(g, i % 2 ? P.kid(60100 + i) : P.civ(60100 + i), i % 2 ? 'idle' : 'tablet', -30 + i * 12, 4.4, 62, Math.PI);
      for (let i = 0; i < 5; i++) P.figure(api, add, -60 + i * 30, 1.4, 74, 0.7, i, g);
    },
  }));
})();
