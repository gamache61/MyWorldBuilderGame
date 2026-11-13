/* ============================================================
   THE ORCHARD VALLEY · BUILD 4 · THE BEE GARDENS & THE SEED FIELDS
   Keep this file in projects/orchardvalley next to 66-orchardvalley.html.
   Four bee gardens with painted hives and busy bees, and six seed fields
   where the vault's first seeds are planted out in bright rows.
   ============================================================ */
(function () {
  const P = window.ORV;
  P.bees = P.bees || [];
  // the bees fly slow loops over their garden
  P.onTick = function (api, dt, t) {
    for (let i = P.bees.length - 1; i >= 0; i--) { const b = P.bees[i]; if (!b.m.parent) { P.bees.splice(i, 1); continue; }
      const a = t * b.sp + b.ph; b.m.position.set(b.cx + Math.cos(a) * b.r, b.h + Math.sin(a * 2.3) * 0.9, b.cz + Math.sin(a * 1.3) * b.r); }
  };
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 4, name: 'THE BEE GARDENS & THE SEED FIELDS',
    brief: 'Four bee gardens with painted hives, flower beds and busy bees, and six seed fields where the first seeds from the vault are planted out in bright rows.',
    types: {
      BEES:  { code: 'GD', name: 'BEE GARDEN', col: '#f2c41a', w: 50, d: 50, h: 6 },
      SEEDS: { code: 'GD', name: 'SEED FIELD', col: '#e0642e', w: 84, d: 70, h: 5 },
    },
    order: ['BEES', 'SEEDS'],
    at: {
      BEES: [[160, -205], [160, 205], [240, -170], [240, 170]].map(([x, z]) => [1550 + x, z]),
      SEEDS: [[-170, -195], [-80, -195], [10, -195], [-170, 195], [-80, 195], [10, 195]].map(([x, z]) => [1550 + x, z]),
    },
    eye: [1550 + 60, P.SY + 120, 280],
    stats(api, c) { return [['BEE GARDENS', c('BEES') + ' / 4'], ['SEED FIELDS', c('SEEDS') + ' / 6'], ['HIVES', c('BEES') * 6]]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, H = P.ov(api);
      if (type === 'BEES') {
        add(new T.BoxGeometry(50, 0.2, 50), H.lawn, 0, 0.1, 0, false);
        // flower beds in rings and a low hedge
        for (let i = 0; i < 4; i++) { const x = (i % 2 ? 1 : -1) * 13, z = (i < 2 ? -1 : 1) * 13; add(new T.BoxGeometry(14, 0.5, 14), H.soil, x, 0.4, z, false); for (let j = 0; j < 16; j++) add(new T.SphereGeometry(0.5, 6, 5), H.flowers[(i * 3 + j) % 7], x - 5.5 + (j % 4) * 3.6, 1.0, z - 5.5 + ((j / 4) | 0) * 3.6, false); }
        for (const s of [-1, 1]) for (let x = -23; x <= 23; x += 4) { add(new T.BoxGeometry(3.4, 1.2, 1.2), H.leaf3, x, 0.8, s * 24.4, false); }
        // six painted hives on low stands
        for (let i = 0; i < 6; i++) { const x = -15 + i * 6, z = 0; add(new T.BoxGeometry(0.4, 1.2, 3), H.timber2, x, 0.6, z, false); add(new T.BoxGeometry(2.6, 2.2, 2.6), i % 2 ? H.hive : H.hive2, x, 2.2, z, true); add(new T.BoxGeometry(3, 0.3, 3), H.roof2, x, 3.5, z, false); add(new T.BoxGeometry(1.2, 0.3, 0.2), H.dark, x, 1.5, 1.35, false); }
        add(new T.BoxGeometry(4, 0.5, 1.2), H.timber, 0, 0.7, 19, false);
        P.person(g, P.civ(66200 + k), 'tablet', 4, 0.4, 7, Math.PI);
        for (let i = 0; i < 12; i++) { const m = add(new T.SphereGeometry(0.22, 6, 5), H.bee, 0, 2, 0, false); m.userData.keep = true; P.bees.push({ m, cx: -15 + (i % 6) * 6, cz: 0, r: 2 + (i % 3) * 1.6, h: 3.6 + (i % 4) * 0.7, sp: 1.6 + (i % 5) * 0.3, ph: i * 1.7 }); }
        P.sign(api, g, 'BEES · HONEY', 9, 1.4, 0, 3.4, 26, 0, '#3a2a0a', '#ffe9a0', false);
      } else if (type === 'SEEDS') {
        add(new T.BoxGeometry(84, 0.2, 70), H.grassDark, 0, 0.1, 0, false);
        for (let r = 0; r < 8; r++) {
          const z = -28 + r * 8, col = [0, 1, 2, 4, 5, 3, 6, 2][(r + k) % 8];
          add(new T.BoxGeometry(78, 0.5, 3.4), H.soil, 0, 0.45, z, false);
          for (let x = -37; x <= 37; x += 3.6) { add(new T.CylinderGeometry(0.1, 0.1, 2.2 + ((x + r) % 3) * 0.3, 4), H.reed, x, 1.5, z, false); add(new T.SphereGeometry(0.62, 6, 5), H.flowers[col], x, 2.7 + ((x + r) % 3) * 0.3, z, false); }
        }
        // a scarecrow and a seed shed
        add(new T.CylinderGeometry(0.15, 0.15, 5, 5), H.timber2, -36, 2.5, 32, false); add(new T.BoxGeometry(4.4, 0.25, 0.25), H.timber2, -36, 4.2, 32, false); add(new T.SphereGeometry(0.9, 8, 6), H.gold, -36, 5.5, 32, false); add(new T.ConeGeometry(1.1, 1, 8), H.roof2, -36, 6.5, 32, false);
        add(new T.BoxGeometry(8, 4.6, 5), H.wall2, 34, 2.5, 31, true); add(new T.BoxGeometry(9.4, 0.5, 6.4), H.roof, 34, 5.2, 31, false); add(new T.BoxGeometry(1.8, 3, 0.2), H.door, 34, 1.7, 33.6, false);
        if (k % 2) P.person(g, P.civ(66300 + k), 'idle', 28, 0.4, 33, Math.PI);
        P.sign(api, g, 'SEED FIELD ' + (k + 1), 9, 1.4, 0, 3.4, 36, 0, '#2a3a1a', '#fff0c0', false);
      }
    },
  }));
})();
