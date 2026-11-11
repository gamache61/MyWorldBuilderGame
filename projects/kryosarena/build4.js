/* ============================================================
   THE KRYOS ARENA · BUILD 4 · THE CONCERT STAGE & THE LIGHT TOWERS
   Keep this file in projects/kryosarena next to 58-kryosarena.html.
   A big arched stage on a lawn for concerts and festivals, and two tall towers that fire the festival lights.
   ============================================================ */
(function () {
  const P = window.ARENA;
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 4, name: 'THE CONCERT STAGE & THE LIGHT TOWERS',
    brief: 'A big arched stage on a lawn for concerts and festivals, and two tall towers that fire the festival lights.',
    types: {
      STAGE: { code: 'SY', name: 'CONCERT STAGE', col: '#7b4fa0', w: 100, d: 56, h: 46 },
      LIGHTTOWER: { code: 'HP', name: 'FESTIVAL TOWER', col: '#e8c13a', w: 20, d: 20, h: 100 },
    },
    order: ['STAGE', 'LIGHTTOWER'],
    at: { STAGE: [[1550, 250]], LIGHTTOWER: [[1430, 340], [1670, 340]] },
    eye: [1100, 190, 520],
    stats(api, c) { return [['CONCERT STAGE', c('STAGE') ? 'READY' : 'NOT YET'], ['FESTIVAL TOWERS', c('LIGHTTOWER') + ' / 2']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, S = P.hm(api), C = P.fun(api);
      const neon = P._neon = P._neon || [0xff5fa8, 0x7ffcff, 0xffd060, 0x9f7bff].map(c => new T.MeshBasicMaterial({ color: new T.Color(c).multiplyScalar(2), toneMapped: false }));
      if (type === 'STAGE') {
        add(new T.BoxGeometry(102, 1, 58), S.gravel, 0, 0.5, 0);
        add(new T.BoxGeometry(88, 4, 34), S.dim, 0, 3, -8);
        for (const sd of [-1, 1]) add(new T.BoxGeometry(5, 46, 5), F.steel, sd * 44, 24, -8);
        const arch = add(new T.TorusGeometry(44, 2.4, 8, 36, Math.PI), F.steel, 0, 24, -8); arch.castShadow = false;
        for (let i = 0; i < 6; i++) { const a = i / 5 * Math.PI; add(new T.SphereGeometry(1.8, 8, 6), neon[i % 4], Math.cos(a) * 44, 24 + Math.sin(a) * 44, -6.6).castShadow = false; }
        add(new T.BoxGeometry(60, 20, 1), new T.MeshBasicMaterial({ color: 0x141a28 }), 0, 18, -24.6);
        add(new T.BoxGeometry(56, 17, 0.5), neon[3], 0, 18, -24).castShadow = false;
        for (const sd of [-1, 1]) { add(new T.BoxGeometry(8, 16, 8), F.dark, sd * 38, 10, 6); add(new T.CylinderGeometry(2.4, 2.4, 0.5, 14).rotateX(Math.PI / 2), F.steel, sd * 38, 12, 10.2); add(new T.CylinderGeometry(2.4, 2.4, 0.5, 14).rotateX(Math.PI / 2), F.steel, sd * 38, 6, 10.2); }
        P.sign(api, g, 'KRYOS FESTIVAL STAGE', 50, 4.4, 0, 52, -8, 0, '#2a1450', '#ffd9a0', true);
        for (let i = 0; i < 12; i++) P.figure(api, add, -30 + (i % 6) * 12, 0.5, 40 + ((i >> 1) & 1) * 6 + (i % 2) * 3, 0.7, i, g);
        for (let i = 0; i < 3; i++) P.person(g, P.civ(58400 + i), i % 2 ? 'tablet' : 'idle', -10 + i * 10, 4.6, -6, Math.PI);
      } else {
        add(new T.CylinderGeometry(10, 12, 3, 18), S.stone, 0, 1.5, 0);
        add(new T.CylinderGeometry(2, 3.6, 84, 10), F.white, 0, 43, 0);
        for (const y of [16, 36, 56, 76]) add(new T.CylinderGeometry(3.2 - y * 0.012, 3.2 - y * 0.012, 1, 10), C.yellow, 0, y, 0);
        add(new T.CylinderGeometry(6, 2.4, 5, 12), F.dark, 0, 88, 0);
        for (let i = 0; i < 6; i++) { const a = i / 6 * Math.PI * 2; add(new T.SphereGeometry(1.6, 8, 6), neon[(i + k) % 4], Math.cos(a) * 5, 92, Math.sin(a) * 5).castShadow = false; }
        const orb = add(new T.OctahedronGeometry(5), neon[(k + 1) % 4], 0, 98, 0); orb.scale.set(0.9, 1.5, 0.9); orb.castShadow = false;
        P.sign(api, g, 'FESTIVAL TOWER', 18, 2.6, 0, 5, 13, 0, '#2a1450', '#ffd9a0', true);
        P.person(g, P.civ(58450 + k), 'tablet', 10, 1.5, 10, Math.PI);
      }
    },
  }));
})();
