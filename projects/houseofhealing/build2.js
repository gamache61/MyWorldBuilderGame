/* ============================================================
   THE HOUSE OF HEALING · BUILD 2 · THE MAIN HOSPITAL
   Keep this file in projects/houseofhealing next to houseofhealing.html.
   The main hospital: a long white building with a tall glass atrium
   full of trees, the green heart of healing over the doors, and the
   walks that lead to it from the landing field.
   ============================================================ */
(function () {
  const P = window.HEAL;
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 2, name: 'THE MAIN HOSPITAL',
    brief: 'A long white hospital with a tall glass atrium full of trees, the green heart of healing over the doors, and the walks that lead to it.',
    types: {
      HOSPITAL: { code: 'SY', name: 'MAIN HOSPITAL', col: '#80f0e0', w: 160, d: 80, h: 48 },
      HWALK:    { code: 'SF', name: 'HOSPITAL WALK', col: '#d8cdb6', w: 12, d: 180, h: 1 },
    },
    order: ['HOSPITAL', 'HWALK'],
    at: { HOSPITAL: [[120, -560]], HWALK: [[120, -430], [120, -630]] },
    eye: [-220, 220, 260],
    stats(api, c) { return [['MAIN HOSPITAL', c('HOSPITAL') ? 'STANDING' : 'NOT YET'], ['BEDS', c('HOSPITAL') * 160], ['WALKS', c('HWALK') + ' / 2']]; },
    make(type, k, g, add, F, api) {
      const T = api.THREE, S = P.hm(api), C = P.fun(api);
      if (type === 'HOSPITAL') {
        add(new T.BoxGeometry(160, 1, 80), S.stone, 0, 0.5, 0);
        // two long wings either side of the atrium, five floors each
        for (const s of [-1, 1]) {
          const x = s * 48;
          add(new T.BoxGeometry(64, 36, 56), F.white, x, 19, -4);
          add(new T.BoxGeometry(65, 1.2, 57), S.frame, x, 37.4, -4); add(new T.BoxGeometry(58, 0.8, 50), S.roofGreen, x, 38.4, -4);
          for (let f = 0; f < 5; f++) { const y = 4.6 + f * 7; add(new T.BoxGeometry(60, 3.2, 0.3), S.glass, x, y, 24.15, false); add(new T.BoxGeometry(59, 2.8, 0.2), S.dim, x, y, 24.05, false); add(new T.BoxGeometry(62, 0.5, 1.6), F.white, x, y - 2, 24.8);
            add(new T.BoxGeometry(60, 3.2, 0.3), S.glass, x, y, -32.15, false); add(new T.BoxGeometry(0.3, 3.2, 50), S.glass, x + s * 32.15, y, -4, false); }
          for (let i = 0; i < 6; i++) add(new T.BoxGeometry(5, 0.3, 3), S.dark, x - 20 + i * 8, 39, -10).rotation.x = -0.4;
        }
        // the atrium: tall glass between the wings, with trees growing inside
        add(new T.BoxGeometry(32, 44, 48), S.glass, 0, 22.5, -2, false);
        for (let i = 0; i <= 4; i++) { add(new T.BoxGeometry(0.6, 44, 0.6), S.frame, -16 + i * 8, 22.5, 22); add(new T.BoxGeometry(0.6, 44, 0.6), S.frame, -16 + i * 8, 22.5, -26); }
        for (let y = 8; y < 44; y += 9) add(new T.BoxGeometry(32.4, 0.5, 0.6), S.frame, 0, y, 22);
        add(new T.BoxGeometry(33, 1.4, 49), S.frame, 0, 45, -2);
        for (const [x, z, s] of [[-8, 4, 1.4], [7, -8, 1.2], [-4, -16, 1], [8, 12, 0.9]]) { add(new T.CylinderGeometry(0.6 * s, 0.9 * s, 10 * s, 7), F.wood, x, 1 + 5 * s, z); add(new T.IcosahedronGeometry(5 * s, 1), F.crops[(x + 20) % 5 | 0], x, 1 + 12 * s, z); }
        for (let f = 1; f < 5; f++) add(new T.BoxGeometry(30, 0.4, 4), F.white, 0, f * 7 + 1, -24);
        // the front doors, a canopy and the green heart of healing
        add(new T.BoxGeometry(14, 7, 0.4), S.glass, 0, 4.5, 22.3, false); add(new T.BoxGeometry(40, 0.8, 12), F.white, 0, 9, 29);
        for (const x of [-18, 18]) add(new T.CylinderGeometry(0.5, 0.5, 8, 8), F.white, x, 5, 34);
        const heart = new T.Shape(); heart.moveTo(0, -3); heart.bezierCurveTo(-6, 1, -3, 5.5, 0, 2.6); heart.bezierCurveTo(3, 5.5, 6, 1, 0, -3);
        add(new T.ExtrudeGeometry(heart, { depth: 0.8, bevelEnabled: false }), S.glow, 0, 37, 22.6, false).scale.setScalar(1.8);
        P.sign(api, g, 'THE HOUSE OF HEALING', 30, 3, 0, 30, 22.8, 0, '#ffffff', '#1f7a6a', false);
        add(new T.BoxGeometry(60, 0.4, 14), C.path, 0, 1.2, 33, false);
        for (let i = 0; i < 6; i++) P.figure(api, add, -12 + i * 5, 1, 32 + (i % 2) * 3, i === 3 ? 0.6 : 1, i);
        P.person(g, P.civ(17000), 'walk', 0, 1, 0, 0, { path: { type: 'line', ax: -26, az: 36, bx: 26, bz: 36, speed: 1.1 } });
        P.person(g, P.civ(17001), 'tablet', 6, 1, 26, Math.PI);
      } else if (type === 'HWALK') {
        const along = k === 0 ? 'z' : 'x', L = k === 0 ? 180 : 460;
        const box = (w, h, d, m, x, y, z, sh) => along === 'z' ? add(new T.BoxGeometry(w, h, d), m, x, y, z, sh) : add(new T.BoxGeometry(d, h, w), m, z, y, x, sh);
        box(30, 0.2, L, C.grass, 0, 0.1, 0, false); box(12, 0.4, L, C.path, 0, 0.25, 0, false);
        for (let s = -L / 2 + 10; s <= L / 2 - 10; s += 20) for (const e of [-1, 1]) {
          box(0.3, 5, 0.3, F.steel, e * 7.5, 2.5, s); box(1.2, 1.2, 1.2, F.lamp, e * 7.5, 5.2, s, false);
          if ((Math.abs(s) / 20 | 0) % 2 === 0) { box(0.8, 5, 0.8, F.wood, e * 11, 2.5, s + 10); if (along === 'z') add(new T.IcosahedronGeometry(3.6, 1), F.crops[(Math.abs(s / 20) | 0) % 5], e * 11, 7, s + 10); else add(new T.IcosahedronGeometry(3.6, 1), F.crops[(Math.abs(s / 20) | 0) % 5], s + 10, 7, e * 11); }
        }
        P.person(g, P.civ(17010 + k), 'walk', 0, 0.4, 0, 0, { path: along === 'z' ? { type: 'line', ax: 2, az: -L / 2 + 10, bx: 2, bz: L / 2 - 10, speed: 1.2 } : { type: 'line', ax: -L / 2 + 10, az: 2, bx: L / 2 - 10, bz: 2, speed: 1.2 } });
        for (let i = 0; i < 3; i++) { const t = -L / 3 + i * L / 3; P.figure(api, add, along === 'z' ? -2 : t, 0.4, along === 'z' ? t : -2, 1, i + k * 3); }
      }
    },
  }));
})();
