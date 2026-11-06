/* ============================================================
   NEW HOMES FOR THE FAMILIES · BUILD 3 · THE APARTMENT BLOCKS
   Keep this file in projects/newhomes next to newhomes.html.
   Six white apartment blocks with stepped garden terraces, balconies
   and roof gardens — homes for most of the nine thousand families —
   and two pocket parks between them.
   ============================================================ */
(function () {
  const P = window.HOMES;
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 3, name: 'THE APARTMENT BLOCKS',
    brief: 'Six white apartment blocks with stepped garden terraces, balconies and roof gardens, and two pocket parks between them.',
    types: {
      APARTMENT:  { code: 'HM', name: 'APARTMENT BLOCK', col: '#7b4fa0', w: 90, d: 60, h: 44 },
      POCKETPARK: { code: 'GD', name: 'POCKET PARK', col: '#3a7d44', w: 36, d: 36, h: 10 },
    },
    order: ['APARTMENT', 'POCKETPARK'],
    at: { APARTMENT: [[-90, 580], [40, 580], [200, 580], [330, 580], [-90, 720], [330, 720]], POCKETPARK: [[-25, 650], [265, 650]] },
    eye: [-220, 220, -260],
    stats(api, c) { return [['APARTMENT BLOCKS', c('APARTMENT') + ' / 6'], ['APARTMENTS', (c('APARTMENT') * 1300).toLocaleString()], ['POCKET PARKS', c('POCKETPARK') + ' / 2']]; },
    make(type, k, g, add, F, api) {
      const T = api.THREE, S = P.hm(api), C = P.fun(api), W = P.walls(api);
      if (type === 'APARTMENT') {
        add(new T.BoxGeometry(90, 0.8, 60), S.stone, 0, 0.4, 0);
        // three stepped tiers, each with a garden terrace on the step below
        let y = 0.8; const tiers = [[80, 44, 16], [66, 36, 14], [52, 28, 12]];
        tiers.forEach(([w, d, h], i) => {
          add(new T.BoxGeometry(w, h, d), W.walls[(k + i) % 5], 0, y + h / 2, -i * 3);
          for (let f = 0; f < h / 4 - 0.5; f++) for (const s of [-1, 1]) {
            const fy = y + 2.2 + f * 4;
            add(new T.BoxGeometry(w * 0.92, 2.2, 0.25), S.dim, 0, fy, -i * 3 + s * (d / 2 + 0.05), false);
            for (let b = 0; b < w / 10 - 1; b++) add(new T.BoxGeometry(6, 0.3, 1.6), F.white, -w / 2 + 8 + b * 10, fy - 1.3, -i * 3 + s * (d / 2 + 0.8));
          }
          add(new T.BoxGeometry(w + 0.6, 0.8, d + 0.6), S.frame, 0, y + h, -i * 3);
          if (i < 2) { const nw = tiers[i + 1][0], nd = tiers[i + 1][1]; add(new T.BoxGeometry(w - 2, 0.5, d - 2), C.grass, 0, y + h + 0.6, -i * 3);
            for (let t = 0; t < 8; t++) { const a = t / 8 * Math.PI * 2, tx = Math.cos(a) * (nw / 2 + 3), tz = -(i + 1) * 3 + Math.sin(a) * (nd / 2 + 3); if (Math.abs(tx) < w / 2 - 2 && Math.abs(tz + i * 3) < d / 2 - 1) add(new T.IcosahedronGeometry(1.8, 0), F.crops[(t + k) % 5], tx, y + h + 2, tz, false); } }
          y += h;
        });
        add(new T.BoxGeometry(46, 0.6, 22), C.grass, 0, y + 0.6, -6);
        for (let i = 0; i < 6; i++) add(new T.BoxGeometry(5, 0.3, 3), W.solar, -16 + i * 6.4, y + 1.4, 2).rotation.x = -0.4;
        for (const [x, z] of [[-14, -10], [10, -12], [-2, -4]]) { add(new T.CylinderGeometry(0.3, 0.4, 3, 6), F.wood, x, y + 2.4, z); add(new T.IcosahedronGeometry(2.2, 0), F.crops[(x + k) & 3], x, y + 5, z); }
        // the front door and a little square
        const fz = k < 4 ? -1 : 1;
        add(new T.BoxGeometry(10, 6, 0.4), S.glass, 0, 4, fz * 22.3, false); add(new T.BoxGeometry(12, 0.6, 5), F.white, 0, 7.4, fz * 24);
        for (const x of [-30, 30]) { add(new T.CylinderGeometry(0.4, 0.6, 5, 6), F.wood, x, 3.3, fz * 26); add(new T.IcosahedronGeometry(3.2, 1), F.crops[(k + 2) % 5], x, 7.4, fz * 26); }
        for (let i = 0; i < 4; i++) P.figure(api, add, -12 + i * 7, 0.8, fz * 26, i === 1 ? 0.6 : 1, i + k * 4);
        P.person(g, P.civ(16100 + k), 'walk', 0, 0.8, 0, 0, { path: { type: 'rect', x0: -44, x1: 44, z0: -28, z1: 28, speed: 1.1 } });
      } else if (type === 'POCKETPARK') {
        add(new T.CylinderGeometry(18, 18, 0.5, 28), C.grass, 0, 0.25, 0);
        add(new T.TorusGeometry(12, 1.2, 4, 32).rotateX(Math.PI / 2), C.path, 0, 0.55, 0, false);
        for (let i = 0; i < 5; i++) { const a = i / 5 * Math.PI * 2 + k; add(new T.CylinderGeometry(0.5, 0.7, 5, 6), F.wood, Math.cos(a) * 15, 2.8, Math.sin(a) * 15); add(new T.IcosahedronGeometry(3.6, 1), F.crops[(i + k) % 5], Math.cos(a) * 15, 7.2, Math.sin(a) * 15); }
        add(new T.BoxGeometry(5, 2.4, 3), C.red, 0, 1.5, 0); add(new T.BoxGeometry(2.4, 0.4, 6), C.yellow, 2.8, 1.6, 0).rotation.z = 0.4;
        for (const a of [0.5, 2.6, 4.7]) add(new T.BoxGeometry(5, 0.5, 1.4), F.wood, Math.cos(a) * 9, 1.2, Math.sin(a) * 9).rotation.y = -a + Math.PI / 2;
        for (let i = 0; i < 5; i++) P.figure(api, add, Math.cos(i) * 5, 0.5, Math.sin(i) * 5, i % 2 ? 0.6 : 1, i + 3);
      }
    },
  }));
})();
