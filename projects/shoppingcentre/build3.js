/* ============================================================
   THE KRYOS SHOPPING CENTRE · BUILD 3 · THE FOOD HALL & THE CAFES
   Keep this file in projects/shoppingcentre next to shoppingcentre.html.
   A round food hall under a golden dome at the north end of the great
   hall, where food from the Farmlands is cooked and shared, and two
   cafe terraces with tables and sunshades along the promenade.
   ============================================================ */
(function () {
  const P = window.SHOP;
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 3, name: 'THE FOOD HALL & THE CAFÉS',
    brief: 'A round food hall under a golden dome where food from the Farmlands is cooked and shared, and two café terraces along the promenade.',
    types: {
      FOODHALL: { code: 'SY', name: 'FOOD HALL', col: '#f2c41a', w: 64, d: 64, h: 30 },
      CAFE:     { code: 'SY', name: 'CAFÉ TERRACE', col: '#f06aa8', w: 50, d: 30, h: 10 },
    },
    order: ['FOODHALL', 'CAFE'],
    at: { FOODHALL: [[-1070, 195]], CAFE: [[-950, 45], [-950, -45]] },
    eye: [260, 210, 280],
    stats(api, c) { return [['FOOD HALL', c('FOODHALL') ? 'OPEN' : 'NOT YET'], ['CAFÉS', c('CAFE') + ' / 2'], ['SEATS', c('FOODHALL') * 600 + c('CAFE') * 80]]; },
    make(type, k, g, add, F, api) {
      const T = api.THREE, S = P.hm(api), C = P.fun(api);
      if (type === 'FOODHALL') {
        add(new T.CylinderGeometry(32, 32, 1, 32), S.stone, 0, 0.5, 0);
        add(new T.CylinderGeometry(26, 26, 14, 32), S.cream, 0, 8, 0);
        add(new T.CylinderGeometry(26.15, 26.15, 8, 32, 1, true), S.glass, 0, 8, 0, false); add(new T.CylinderGeometry(26.05, 26.05, 7, 32, 1, true), S.dim, 0, 8, 0, false);
        add(new T.CylinderGeometry(28, 28, 1.2, 32), F.white, 0, 15.6, 0);
        add(new T.SphereGeometry(24, 28, 12, 0, Math.PI * 2, 0, Math.PI / 2), S.brass, 0, 16, 0);
        add(new T.CylinderGeometry(3, 3.4, 5, 12), F.white, 0, 41, 0); add(new T.SphereGeometry(1.4, 10, 8), S.glow, 0, 44.6, 0, false);
        // a tunnel of glass joining it to the great hall, and long tables outside in the sun
        add(new T.BoxGeometry(16, 10, 30), S.glass, 0, 6, -36, false); add(new T.BoxGeometry(17, 0.8, 31), F.white, 0, 11.2, -36);
        for (let i = 0; i < 6; i++) { const a = i / 6 * Math.PI * 2 + 0.3; if (Math.sin(a) < -0.5) continue; const x = Math.cos(a) * 30, z = Math.sin(a) * 30;
          const t = add(new T.BoxGeometry(10, 0.5, 2.6), S.timber, x, 2.6, z); t.rotation.y = -a; for (const e of [-1, 1]) add(new T.BoxGeometry(10, 0.4, 1), S.timber, x - Math.sin(a) * e * 2.4, 1.8, z + Math.cos(a) * e * 2.4).rotation.y = -a;
          for (let p = 0; p < 3; p++) P.figure(api, add, x + Math.cos(a + Math.PI / 2) * (p - 1) * 3, 0.9, z + Math.sin(a + Math.PI / 2) * (p - 1) * 3, p === 1 ? 0.6 : 1, i * 3 + p); }
        P.sign(api, g, 'FOOD HALL', 16, 2.6, 0, 13, 26.3, 0, '#ffffff', '#c86a1a', false);
        P.person(g, P.civ(18100), 'walk', 0, 1, 0, 0, { path: { type: 'circle', cx: 0, cz: 0, r: 31, speed: 1 } });
      } else if (type === 'CAFE') {
        add(new T.BoxGeometry(50, 0.6, 30), S.timber, 0, 0.3, 0);
        add(new T.BoxGeometry(20, 7, 10), F.white, -12, 4, k ? -8 : 8); add(new T.BoxGeometry(18, 2.4, 0.3), S.dim, -12, 4.4, k ? -2.9 : 2.9, false);
        add(new T.BoxGeometry(21, 0.6, 11), k ? C.red : C.blue, -12, 7.8, k ? -8 : 8);
        P.sign(api, g, k ? 'CAFÉ VESH' : 'CAFÉ UNITY', 10, 1.6, -12, 9.4, k ? -2.8 : 2.8, k ? Math.PI : 0, '#fff6e0', '#7a4a1a', false);
        const shade = [C.yellow, C.orange, C.pink, C.green, C.purple];
        for (let i = 0; i < 6; i++) { const x = -2 + (i % 3) * 9, z = (i < 3 ? -6 : 6);
          add(new T.CylinderGeometry(1.8, 1.8, 0.2, 12), F.white, x, 2.6, z); add(new T.CylinderGeometry(0.15, 0.15, 2.2, 6), F.steel, x, 1.6, z);
          add(new T.CylinderGeometry(0.08, 0.08, 4, 4), F.steel, x, 4, z); add(new T.ConeGeometry(3.2, 1.4, 10), shade[(i + k) % 5], x, 6.4, z);
          P.figure(api, add, x - 2.2, 0.6, z, 1, i + k * 6); if (i % 2) P.figure(api, add, x + 2.2, 0.6, z, 0.6, i + 3); }
        for (const x of [-22, 22]) { add(new T.BoxGeometry(3, 2, 3), S.timber, x, 1.6, k ? 12 : -12); add(new T.IcosahedronGeometry(2, 0), F.flower, x, 3.6, k ? 12 : -12, false); }
        P.person(g, P.civ(18110 + k), 'gesture', -6, 0.6, k ? -2 : 2, k ? Math.PI : 0);
      }
    },
  }));
})();
