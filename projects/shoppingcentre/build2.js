/* ============================================================
   THE KRYOS SHOPPING CENTRE · BUILD 2 · THE GREAT GLASS HALL
   Keep this file in projects/shoppingcentre next to shoppingcentre.html.
   A long glass hall under a curved roof, two floors of shops down each
   side of a bright gallery with trees and a fountain, and the
   promenade that joins it to the boulevard and the Great School.
   ============================================================ */
(function () {
  const P = window.SHOP;
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 2, name: 'THE GREAT GLASS HALL',
    brief: 'A long glass hall under a curved roof, with two floors of shops down each side of a bright gallery, and the promenade to the boulevard.',
    types: {
      MALL:      { code: 'SY', name: 'GREAT GLASS HALL', col: '#ffc890', w: 140, d: 300, h: 34 },
      PROMENADE: { code: 'SF', name: 'PROMENADE', col: '#d8cdb6', w: 110, d: 12, h: 1 },
    },
    order: ['MALL', 'PROMENADE'],
    at: { MALL: [[-1070, 0]], PROMENADE: [[-945, 0]] },
    eye: [260, 220, 300],
    stats(api, c) { return [['GREAT GLASS HALL', c('MALL') ? 'STANDING' : 'NOT YET'], ['SHOPS', c('MALL') * 64], ['PROMENADE', c('PROMENADE') ? 'OPEN' : 'NOT YET']]; },
    make(type, k, g, add, F, api) {
      const T = api.THREE, S = P.hm(api), C = P.fun(api);
      if (type === 'MALL') {
        add(new T.BoxGeometry(140, 1, 300), S.stone, 0, 0.5, 0);
        // two rows of shops, two floors high, each with a coloured awning and a lit window
        const cols = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink'];
        for (const s of [-1, 1]) {
          add(new T.BoxGeometry(40, 24, 280), F.white, s * 46, 13, 0);
          add(new T.BoxGeometry(6, 0.8, 280), F.white, s * 23, 12.4, 0);
          add(new T.BoxGeometry(0.3, 1.4, 280), S.glass, s * 20.2, 13.6, 0, false);
          for (let i = 0; i < 16; i++) for (const y of [5.5, 17.5]) {
            const z = -131 + i * 17.4;
            add(new T.BoxGeometry(0.3, 7, 14), S.glass, s * 25.9, y, z, false);
            add(new T.BoxGeometry(0.2, 6, 13), S.dim, s * 25.8, y, z, false);
            add(new T.BoxGeometry(3, 0.4, 14), C[cols[(i + (y > 9 ? 3 : 0) + (s > 0 ? 1 : 0)) % 7]], s * 24.4, y + 4.2, z).rotation.z = -s * 0.3;
          }
          // outside walls, with long windows and green roofs over the shop rows
          for (let i = 0; i < 14; i++) add(new T.BoxGeometry(0.3, 16, 12), S.glass, s * 66.1, 13, -126 + i * 19.4, false);
          add(new T.BoxGeometry(41, 0.8, 281), S.frame, s * 46, 25.4, 0);
        }
        // the curved glass roof over the gallery, with ribs
        add(new T.CylinderGeometry(26, 26, 290, 24, 1, true, Math.PI / 2, Math.PI).rotateX(Math.PI / 2), S.glass, 0, 25, 0, false);
        for (let i = 0; i <= 14; i++) add(new T.TorusGeometry(26, 0.45, 6, 20, Math.PI), S.frame, 0, 25, -140 + i * 20);
        add(new T.BoxGeometry(1, 1, 290), S.frame, 0, 51, 0);
        // the gallery floor: trees, benches and a round fountain in the middle
        add(new T.BoxGeometry(40, 0.3, 290), S.cream, 0, 1.15, 0, false);
        add(new T.CylinderGeometry(9, 9, 1.4, 24), F.white, 0, 1.8, 0); add(new T.CylinderGeometry(8.2, 8.2, 0.4, 24), F.water, 0, 2.4, 0, false);
        const jet = new T.MeshStandardMaterial({ color: 0xcfefff, transparent: true, opacity: 0.55, roughness: 0.1 });
        add(new T.CylinderGeometry(0.3, 0.9, 7, 8), jet, 0, 5.5, 0, false); add(new T.SphereGeometry(1.6, 10, 8), jet, 0, 9.2, 0, false);
        for (let i = 0; i < 10; i++) { const z = -120 + i * 26.6; if (Math.abs(z) < 16) continue; for (const x of [-12, 12]) { add(new T.CylinderGeometry(1.4, 1.4, 1.6, 10), S.stone, x, 2, z); add(new T.CylinderGeometry(0.35, 0.5, 5, 6), F.wood, x, 5, z); add(new T.IcosahedronGeometry(3, 1), F.crops[(i + (x > 0 ? 1 : 0)) % 5], x, 9, z); }
          add(new T.BoxGeometry(1.4, 0.5, 5), F.wood, 0, 1.6, z + 13); }
        // the big glass doors at the east end, facing the promenade, with the name over them
        add(new T.BoxGeometry(0.5, 20, 40), S.glass, 70.2, 11, 0, false);
        P.sign(api, g, 'KRYOS SHOPPING CENTRE', 40, 4, 70.6, 28, 0, Math.PI / 2, '#ffffff', '#c86a1a', false);
        add(new T.BoxGeometry(14, 1, 44), F.white, 77, 22, 0);
        for (let i = 0; i < 14; i++) P.figure(api, add, (i % 2 ? 5 : -5) + (i % 3), 1.3, -120 + i * 18, i % 3 === 2 ? 0.6 : 1, i);
        P.person(g, P.civ(18000), 'walk', 0, 1.3, 0, 0, { path: { type: 'line', ax: -4, az: -130, bx: -4, bz: 130, speed: 1.1 } });
        P.person(g, P.civ(18001), 'walk', 0, 1.3, 0, 0, { path: { type: 'line', ax: 5, az: 130, bx: 5, bz: -130, speed: 1 } });
      } else if (type === 'PROMENADE') {
        add(new T.BoxGeometry(110, 0.2, 34), C.grass, 0, 0.1, 0, false); add(new T.BoxGeometry(110, 0.4, 14), C.path, 0, 0.25, 0, false);
        for (let x = -45; x <= 45; x += 18) for (const e of [-1, 1]) { add(new T.CylinderGeometry(0.15, 0.2, 5, 6), F.steel, x, 2.5, e * 8.5); add(new T.SphereGeometry(0.6, 8, 6), F.lamp, x, 5.2, e * 8.5, false); add(new T.CylinderGeometry(0.4, 0.6, 5, 6), F.wood, x + 9, 2.5, e * 13); add(new T.IcosahedronGeometry(3.4, 1), F.crops[(x + 45) / 18 % 5 | 0], x + 9, 7, e * 13); }
        for (let i = 0; i < 4; i++) P.figure(api, add, -40 + i * 26, 0.4, i % 2 ? 2 : -2, i === 2 ? 0.6 : 1, i + 4);
        P.person(g, P.civ(18010), 'walk', 0, 0.4, 0, 0, { path: { type: 'line', ax: -52, az: 1, bx: 52, bz: 1, speed: 1.2 } });
      }
    },
  }));
})();
