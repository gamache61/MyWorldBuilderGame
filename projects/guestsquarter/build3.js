/* ============================================================
   THE GUESTS' QUARTER · BUILD 3 · THE NORTH HOMES
   Keep this file in projects/guestsquarter next to 65-guestsquarter.html.
   Twenty warm little homes in two rows facing the north lane, each with a pitched roof,
   a coloured door, glowing windows and its own front garden.
   ============================================================ */
(function () {
  const P = window.GSQ;
  // one home, door on the side of the lane (f = +1 faces +z, -1 faces -z)
  P.home = function (api, add, g, k, f) {
    const T = api.THREE, H = P.gq(api), wall = H.walls[(k * 3 + (f > 0 ? 0 : 1)) % H.walls.length], roof = H.roofs[(k * 2 + (f > 0 ? 1 : 0)) % H.roofs.length], door = H.doors[(k + (f > 0 ? 2 : 0)) % H.doors.length];
    const z = v => v * f;
    add(new T.BoxGeometry(14.4, 0.6, 12), H.stone, 0, 0.3, 0, false);
    add(new T.BoxGeometry(12, 5, 8.6), wall, 0, 3.1, z(-0.6), true);
    // pitched roof along x
    const r = 6.2, rf = add(new T.CylinderGeometry(r, r, 13.4, 3, 1, false, Math.PI / 2).rotateZ(Math.PI / 2), roof, 0, 5.6 + r * 0.5 * 0.45, z(-0.6), true); rf.scale.y = 0.45;
    if (k % 3 === 0) add(new T.BoxGeometry(1.4, 3, 1.4), H.stone, 3.4, 8.2, z(-2), false);
    // door with a little porch and step
    add(new T.BoxGeometry(2, 3.2, 0.3), door, -2.4, 2.2, z(3.8), false);
    add(new T.BoxGeometry(3.6, 0.35, 1.8), H.timber, -2.4, 4.0, z(4.7), false);
    for (const s of [-1, 1]) add(new T.BoxGeometry(0.25, 2.6, 0.25), H.timber2, -2.4 + s * 1.6, 2.4, z(5.4), false);
    add(new T.BoxGeometry(3, 0.3, 1.4), H.stone, -2.4, 0.7, z(5.2), false);
    add(new T.SphereGeometry(0.2, 6, 5), H.lamp, -0.9, 3.4, z(4.8), false);
    // two glowing windows and a small one at the side
    for (const x of [2.2, 4.6]) { add(new T.BoxGeometry(1.7, 1.8, 0.25), H.white, x, 3.5, z(3.75), false); add(new T.BoxGeometry(1.4, 1.5, 0.3), H.win, x, 3.5, z(3.8), false); }
    for (const s of [-1, 1]) add(new T.BoxGeometry(0.25, 1.5, 1.6), H.win, s * 6.05, 3.5, z(-0.6), false);
    // the garden in front: a fence, a path, flower beds, a tree
    for (let x = -6.4; x <= 6.4; x += 1.6) if (Math.abs(x + 2.4) > 1.4) add(new T.BoxGeometry(0.2, 0.9, 0.2), H.white, x, 0.9, z(11.4), false);
    add(new T.BoxGeometry(12.8, 0.18, 0.18), H.white, 0, 1.15, z(11.4), false);
    add(new T.BoxGeometry(2, 0.08, 5.6), H.path, -2.4, 0.64, z(8.6), false);
    for (const [bx, bw] of [[3.2, 6], [-6.3, 2.4]]) { add(new T.BoxGeometry(bw, 0.5, 2, 1, 1, 1), H.soil, bx, 0.85, z(8.6), false); for (let i = 0; i < 4; i++) add(new T.IcosahedronGeometry(0.34, 0), H.flowers[(k + i) % 6], bx - bw / 2 + 0.7 + i * (bw - 1.4) / 3, 1.3, z(8.6 + (i % 2 ? 0.4 : -0.4)), false); }
    P.tree(api, add, H, 6.2 * (k % 2 ? 1 : -1), z(9.6), 0.8, k);
    // a back garden bed
    add(new T.BoxGeometry(5, 0.4, 1.4), H.soil, 2.6, 0.8, z(-8.4), false); for (let i = 0; i < 4; i++) add(new T.IcosahedronGeometry(0.4, 0), H.leaf2, 1.2 + i * 1.1, 1.2, z(-8.4), false);
    if (k % 4 === 1) P.person(g, P.civ(65100 + k * 2 + (f > 0 ? 0 : 1)), k % 8 === 1 ? 'tablet' : 'idle', -2.4, 0.8, z(7.6), f > 0 ? 0 : Math.PI);
  };
  const row = z => Array.from({ length: 10 }, (_, i) => [1550 - 135 + i * 30, z]);
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 3, name: 'THE NORTH HOMES',
    brief: 'Twenty warm homes in two rows facing the north lane, each with a pitched roof, a coloured door, glowing windows and its own front garden.',
    types: { HOME: { code: 'HM', name: 'GUEST HOME', col: '#f0c9a0', w: 14, d: 12, h: 9 } },
    order: ['HOME'],
    at: { HOME: [...row(-125), ...row(-75)] },
    eye: [1550 + 140, P.SY + 70, -40],
    stats(api, c) { return [['NORTH HOMES', c('HOME') + ' / 20'], ['BEDS', c('HOME') * 3]]; },
    make(type, k, g, add, F, api, sl) {
      const lz = Math.round(sl.z - P.OFF[1]);
      P.home(api, add, g, k, lz < -100 ? 1 : -1);
    },
  }));
})();
