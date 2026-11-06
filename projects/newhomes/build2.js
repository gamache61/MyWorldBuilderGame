/* ============================================================
   NEW HOMES FOR THE FAMILIES · BUILD 2 · GARDEN STREETS & THE FIRST HOMES
   Keep this file in projects/newhomes next to newhomes.html.
   The garden streets of the new district — a main street north from
   the landing field and two cross streets, lined with trees and lamps —
   and the first four rows of family homes, each house with its own
   garden, solar roof and front door.
   ============================================================ */
(function () {
  const P = window.HOMES;
  // the house colours of the district, shared by every build
  P.walls = function (api) {
    if (this._walls) return this._walls; const T = api.THREE, std = (c, r = 0.75) => new T.MeshStandardMaterial({ color: c, roughness: r, metalness: 0.05 });
    return this._walls = { walls: [0xf2ede2, 0xe8d8c0, 0xdfe8ee, 0xf0e0d0, 0xe6efe0].map(c => std(c)), doors: [0x2f7fe0, 0xe0402e, 0x3fb04a, 0xf2c41a, 0x8a4fd0, 0xf08a1a].map(c => std(c, 0.5)),
      roofs: [0x5f9a42, 0x4f8a3a, 0x6aa84a].map(c => std(c, 1)), hedge: std(0x3f7a2c, 0.95), fence: std(0xf4f6f8, 0.5), solar: new T.MeshStandardMaterial({ color: 0x13294a, roughness: 0.25, metalness: 0.7 }) };
  };
  // one family house: walls, a green roof with solar panels, a door, windows that glow, a garden in front
  P.house = function (api, add, x, z, n, face, grp) {
    const T = api.THREE, W = P.walls(api), S = P.hm(api), F = P.mats(api), C = P.fun(api);
    add(new T.BoxGeometry(18, 9, 12), W.walls[n % 5], x, 4.9, z, true, grp);
    add(new T.CylinderGeometry(7.5, 7.5, 19, 3).rotateZ(Math.PI / 2).rotateX(-Math.PI / 2), W.roofs[n % 3], x, 11.46, z, true, grp).scale.y = 0.55;
    add(new T.BoxGeometry(14, 0.3, 4), W.solar, x, 12.5, z - face * 2.4, false, grp).rotation.x = -face * 0.56;
    add(new T.BoxGeometry(3, 5.4, 0.3), W.doors[n % 6], x - 4, 3.1, z + face * 6.05, false, grp);
    for (const wx of [1, 6]) add(new T.BoxGeometry(3.4, 2.6, 0.25), S.dim, x + wx, 5, z + face * 6.05, false, grp);
    for (const wx of [-4, 1, 6]) add(new T.BoxGeometry(3.4, 2.4, 0.25), S.dim, x + wx, 8, z + face * 6.05, false, grp);
    // the front garden: grass, a hedge, a path to the door and a small tree
    add(new T.BoxGeometry(18, 0.4, 9), C.grass, x, 0.6, z + face * 10.6, false, grp);
    add(new T.BoxGeometry(18, 1.6, 0.8), W.hedge, x, 1.3, z + face * 14.8, true, grp);
    add(new T.BoxGeometry(2.4, 0.45, 9), C.path, x - 4, 0.65, z + face * 10.6, false, grp);
    add(new T.CylinderGeometry(0.3, 0.4, 3, 6), F.wood, x + 5, 2.1, z + face * 10.5, true, grp); add(new T.IcosahedronGeometry(2, 0), F.crops[n % 5], x + 5, 4.8, z + face * 10.5, true, grp);
    if (n % 3 === 0) add(new T.SphereGeometry(0.5, 6, 4), n % 2 ? F.flower : F.berry, x + 1, 1, z + face * 9, false, grp);
  };
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 2, name: 'GARDEN STREETS & THE FIRST HOMES',
    brief: 'The garden streets of the new district, lined with trees and lamps, and the first four rows of family homes, each with its own garden.',
    types: {
      STREET:  { code: 'SF', name: 'GARDEN STREET', col: '#d8cdb6', w: 12, d: 250, h: 1 },
      HOMEROW: { code: 'HM', name: 'ROW OF HOMES', col: '#7b4fa0', w: 220, d: 30, h: 14 },
    },
    order: ['STREET', 'HOMEROW'],
    at: { STREET: [[120, 460], [120, 710], [120, 960], [120, 500], [120, 800]], HOMEROW: [[-20, 385], [260, 385], [-20, 445], [260, 445]] },
    eye: [-200, 200, -240],
    stats(api, c) { return [['GARDEN STREETS', c('STREET') + ' / 5'], ['ROWS OF HOMES', c('HOMEROW') + ' / 4'], ['FAMILY HOUSES', c('HOMEROW') * 10]]; },
    make(type, k, g, add, F, api) {
      const T = api.THREE, S = P.hm(api), C = P.fun(api);
      if (type === 'STREET') {
        const along = k < 3 ? 'z' : 'x', L = along === 'z' ? 250 : 540;
        const box = (w, h, d, m, x, y, z, sh) => along === 'z' ? add(new T.BoxGeometry(w, h, d), m, x, y, z, sh) : add(new T.BoxGeometry(d, h, w), m, z, y, x, sh);
        box(30, 0.2, L, C.grass, 0, 0.1, 0, false); box(12, 0.4, L, C.path, 0, 0.25, 0, false);
        for (let s = -L / 2 + 10; s <= L / 2 - 10; s += 20) for (const e of [-1, 1]) {
          box(0.3, 5, 0.3, F.steel, e * 7.5, 2.5, s); box(1.2, 1.2, 1.2, F.lamp, e * 7.5, 5.2, s, false);
          if ((s / 20 | 0) % 2 === 0) { box(0.8, 5, 0.8, F.wood, e * 11, 2.5, s + 10); const t = along === 'z' ? add(new T.IcosahedronGeometry(3.6, 1), F.crops[(Math.abs(s / 20) | 0) % 5], e * 11, 7, s + 10) : add(new T.IcosahedronGeometry(3.6, 1), F.crops[(Math.abs(s / 20) | 0) % 5], s + 10, 7, e * 11); }
        }
        for (let i = 0; i < 4; i++) { const t = -L / 2 + 25 + i * (L - 50) / 3; box(1.4, 0.5, 5, F.wood, (i % 2 ? 1 : -1) * 9, 1.2, t); P.figure(api, add, along === 'z' ? (i % 2 ? -2 : 2) : t + 6, 0.4, along === 'z' ? t + 6 : (i % 2 ? -2 : 2), i === 2 ? 0.6 : 1, i + k * 4); }
        P.person(g, P.civ(16000 + k), 'walk', 0, 0.4, 0, 0, { path: along === 'z' ? { type: 'line', ax: 2, az: -L / 2 + 10, bx: 2, bz: L / 2 - 10, speed: 1.2 } : { type: 'line', ax: -L / 2 + 10, az: 2, bx: L / 2 - 10, bz: 2, speed: 1.2 } });
      } else if (type === 'HOMEROW') {
        const face = k < 2 ? -1 : 1; // the first rows face the landing field, the second rows face the cross street
        add(new T.BoxGeometry(220, 0.6, 30), S.stone, 0, 0.3, 0);
        for (let i = 0; i < 10; i++) P.house(api, add, -99 + i * 22, -face * 2, i + k * 3, face);
        for (let i = 0; i < 4; i++) P.figure(api, add, -80 + i * 50, 0.8, face * 12, i % 2 ? 0.6 : 1, i + k);
        P.person(g, P.civ(16010 + k), 'walk', 0, 0.8, 0, 0, { path: { type: 'line', ax: -100, az: face * 16, bx: 100, bz: face * 16, speed: 1.1 } });
      }
    },
  }));
})();
