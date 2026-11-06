/* ============================================================
   THE HOUSE OF HEALING · BUILD 3 · THE WARDS & THE CHILDREN'S WING
   Keep this file in projects/houseofhealing next to houseofhealing.html.
   Two round ward towers with sunny balconies, joined to the main
   hospital by glass bridges, and the Children's Wing: a bright, low
   building with coloured windows, a play room and a garden of its own.
   ============================================================ */
(function () {
  const P = window.HEAL;
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 3, name: 'THE WARDS & THE CHILDREN’S WING',
    brief: 'Two round ward towers with sunny balconies and glass bridges to the hospital, and the bright Children’s Wing with its own play garden.',
    types: {
      WARD:      { code: 'SY', name: 'WARD TOWER', col: '#f2f4f6', w: 70, d: 60, h: 60 },
      CHILDWING: { code: 'SY', name: 'CHILDREN’S WING', col: '#f2c41a', w: 120, d: 50, h: 16 },
    },
    order: ['WARD', 'CHILDWING'],
    at: { WARD: [[-40, -560], [280, -560]], CHILDWING: [[120, -690]] },
    eye: [-220, 230, 260],
    stats(api, c) { return [['WARD TOWERS', c('WARD') + ' / 2'], ['BEDS', 160 + c('WARD') * 120 + c('CHILDWING') * 40], ['CHILDREN’S WING', c('CHILDWING') ? 'OPEN' : 'NOT YET']]; },
    make(type, k, g, add, F, api) {
      const T = api.THREE, S = P.hm(api), C = P.fun(api);
      if (type === 'WARD') {
        const s = k ? -1 : 1; // the side that faces the main hospital
        add(new T.BoxGeometry(70, 1, 60), S.stone, 0, 0.5, 0);
        add(new T.CylinderGeometry(22, 22, 56, 32), F.white, 0, 29, 0);
        for (let f = 0; f < 8; f++) { const y = 4.5 + f * 7;
          add(new T.CylinderGeometry(22.15, 22.15, 3, 32, 1, true), S.glass, 0, y, 0, false); add(new T.CylinderGeometry(22.05, 22.05, 2.6, 32, 1, true), S.dim, 0, y, 0, false);
          add(new T.CylinderGeometry(24.5, 24.5, 0.5, 32), F.white, 0, y - 2.2, 0); add(new T.TorusGeometry(24.3, 0.15, 4, 48).rotateX(Math.PI / 2), F.steel, 0, y - 1.2, 0, false); }
        add(new T.CylinderGeometry(23, 23, 1.2, 32), S.frame, 0, 57.6, 0); add(new T.CylinderGeometry(20, 20, 0.6, 32), S.roofGreen, 0, 58.4, 0);
        for (let i = 0; i < 6; i++) { const a = i / 6 * Math.PI * 2; add(new T.IcosahedronGeometry(2.4, 0), F.crops[(i + k) % 5], Math.cos(a) * 13, 60.4, Math.sin(a) * 13, false); }
        // glass bridges across to the main hospital, on the 2nd and 4th floors
        for (const y of [11.5, 25.5]) { add(new T.BoxGeometry(60, 5, 8), S.glass, s * 51, y, 0, false); add(new T.BoxGeometry(60, 0.6, 9), F.white, s * 51, y - 2.6, 0); add(new T.BoxGeometry(60, 0.6, 9), F.white, s * 51, y + 2.6, 0); }
        for (let i = 0; i < 5; i++) { const a = i * 1.2 + 0.4; P.figure(api, add, Math.cos(a) * 23.6, 4.5 + 7 * (i % 4) - 2, Math.sin(a) * 23.6, 1, i + k * 5); }
        P.person(g, P.civ(17100 + k), 'walk', 0, 1, 0, 0, { path: { type: 'circle', cx: 0, cz: 0, r: 27, speed: 1 } });
      } else if (type === 'CHILDWING') {
        add(new T.BoxGeometry(120, 0.8, 50), S.stone, 0, 0.4, 0);
        add(new T.BoxGeometry(90, 12, 30), C.yellow, -10, 6.8, -6);
        add(new T.BoxGeometry(91, 0.8, 31), S.frame, -10, 13.2, -6); add(new T.BoxGeometry(84, 0.6, 26), S.roofGreen, -10, 13.8, -6);
        // coloured round windows facing the walk, and a round play room at the end
        const cols = ['red', 'blue', 'green', 'purple', 'orange', 'pink'];
        for (let i = 0; i < 9; i++) for (const y of [4.4, 9.4]) { const w = add(new T.CylinderGeometry(1.6, 1.6, 0.3, 16).rotateX(Math.PI / 2), C[cols[(i + (y > 5 ? 2 : 0)) % 6]], -48 + i * 9.6, y, 9.1, false); }
        add(new T.CylinderGeometry(12, 12, 13, 24), S.glass, 42, 7, -4, false); add(new T.CylinderGeometry(12.6, 12.6, 1, 24), C.red, 42, 13.6, -4); add(new T.ConeGeometry(13, 6, 24), C.purple, 42, 17, -4);
        add(new T.CylinderGeometry(11, 11, 0.4, 24), C.soft, 42, 1, -4, false); add(new T.BoxGeometry(4, 4, 4), C.blue, 40, 3, -6); add(new T.SphereGeometry(1.5, 10, 8), C.yellow, 46, 2.4, -2);
        P.sign(api, g, 'CHILDREN’S WING', 22, 2.8, -10, 11.6, 9.15, 0, '#ffffff', '#e0402e', false);
        // the play garden: soft ground, a small slide and a sandpit
        add(new T.BoxGeometry(60, 0.4, 14), C.soft, -20, 1, 17);
        add(new T.BoxGeometry(5, 5, 5), C.green, -40, 3, 17); add(new T.BoxGeometry(2.6, 0.4, 9), C.orange, -40, 3, 22).rotation.x = 0.5;
        add(new T.BoxGeometry(12, 0.6, 8), F.wood, -10, 1.3, 17); add(new T.BoxGeometry(11, 0.5, 7), C.sand, -10, 1.6, 17, false);
        for (let i = 0; i < 6; i++) P.figure(api, add, -30 + i * 6, 1.2, 16 + (i % 2) * 3, i % 3 ? 0.6 : 1, i + 2);
        P.person(g, P.kid(17110), 'walk', 0, 1.2, 0, 0, { path: { type: 'circle', cx: -20, cz: 17, r: 6, speed: 1.5 }, scale: 0.6 });
        P.person(g, P.civ(17111), 'gesture', 4, 1.2, 14, Math.PI);
      }
    },
  }));
})();
