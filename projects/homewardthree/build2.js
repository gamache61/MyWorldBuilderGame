/* ============================================================
   HOMEWARD THREE · BUILD 2 · THE STREETS & THE FAMILY HOMES
   Keep this file in projects/homewardthree next to 62-homewardthree.html.
   A third district of homes along the northern rim of Kryos. One broad
   walking street runs north from the south gate — no cars on Unity —
   with paving, trees, lamps and benches, and the first rows of family
   homes on either side: terraced houses in cream, sand, rose and sky,
   with warm clay roofs, shutters, doorsteps and gardens.
   ============================================================ */
(function () {
  const P = window.HW3;
  // colours and shared pieces for every Homeward Three build (one copy, kept on window)
  P.h2 = function (api) {
    if (this._h2) return this._h2; const T = api.THREE, std = (c, r = 0.8, m = 0, e = {}) => new T.MeshStandardMaterial({ color: c, roughness: r, metalness: m, ...e });
    return this._h2 = {
      walls: [0xf4efe2, 0xcfe3f2, 0xc9e6d8, 0xf1dcc4, 0xe6dff2, 0xd9ecf5].map(c => std(c, 0.85)),
      clay: std(0x2f7f8a, 0.85), clay2: std(0x286a74, 0.85), slate: std(0x4a5560, 0.7), door: [0x2f6690, 0x3a7d44, 0xb03a2e, 0xd9a21b, 0x7b4fa0].map(c => std(c, 0.6)),
      paving: std(0xb4a98f, 0.95), paving2: std(0x9a8f78, 0.95), stone: std(0xd8d2c6, 0.85), grass: std(0x5aa64a, 1), leaf: std(0x4f8f3a, 0.9, 0, { flatShading: true }), leaf2: std(0x6aa84a, 0.9, 0, { flatShading: true }), trunk: std(0x6a4a2a, 0.9),
      timber: std(0xa07a4a, 0.85), white: std(0xf4f6f8, 0.4, 0.15), glass: new T.MeshStandardMaterial({ color: 0xbfe8ff, roughness: 0.05, metalness: 0.3, transparent: true, opacity: 0.35, side: T.DoubleSide, depthWrite: false }),
      win: new T.MeshStandardMaterial({ color: 0x3a3226, emissive: 0xffd9a0, emissiveIntensity: 0.45, roughness: 0.5 }),
      lamp: new T.MeshBasicMaterial({ color: new T.Color(1.6, 1.3, 0.8), toneMapped: false }), water: std(0x3f86b0, 0.08, 0.45), flower: [0xe0402e, 0xf2c41a, 0xf06aa8, 0x8a4fd0, 0xffffff].map(c => std(c, 0.8)),
    };
  };
  P.tree = (api, add, x, y, z, s = 1, n = 0, parent) => { const H = P.h2(api), T = api.THREE; add(new T.CylinderGeometry(0.35 * s, 0.5 * s, 4 * s, 5), H.trunk, x, y + 2 * s, z, true, parent); add(new T.IcosahedronGeometry(3.6 * s, 0), n % 2 ? H.leaf : H.leaf2, x, y + 6.4 * s, z, true, parent); };
  P.lamp = (api, add, x, y, z, parent) => { const H = P.h2(api), T = api.THREE; add(new T.CylinderGeometry(0.15, 0.2, 6, 6), H.slate, x, y + 3, z, false, parent); add(new T.SphereGeometry(0.55, 8, 6), H.lamp, x, y + 6.3, z, false, parent); };
  // one family house: walls, a clay gabled roof along its width, chimney, door, shutters, windows
  P.house = (api, add, cx, cz, w, d, h, n, parent, facing = 1) => {
    const T = api.THREE, H = P.h2(api), wall = H.walls[n % 6], rm = n % 2 ? H.clay : H.clay2;
    add(new T.BoxGeometry(w, h, d), wall, cx, h / 2, cz, true, parent);
    const rise = Math.min(w, d) * 0.36, ang = Math.atan2(rise, d / 2), L = Math.hypot(rise, d / 2) + 1.2;
    for (const s of [-1, 1]) { const r = add(new T.BoxGeometry(w + 1.6, 0.7, L), rm, cx, h + rise / 2 + 0.2, cz + s * d / 4, true, parent); r.rotation.x = s * ang; }
    add(new T.BoxGeometry(w + 1.6, 0.6, 0.7), rm, cx, h + rise + 0.45, cz, true, parent);
    add(new T.BoxGeometry(2.2, 5, 2.2), H.stone, cx + w * 0.28, h + rise * 0.8, cz - d * 0.2, true, parent);
    const fz = cz + facing * (d / 2 + 0.06);
    add(new T.BoxGeometry(3.4, 6.2, 0.4), H.door[n % 5], cx - w * 0.2, 3.1, fz, false, parent);
    add(new T.BoxGeometry(5.4, 0.5, 2.4), H.stone, cx - w * 0.2, 0.25, fz + facing * 1.2, false, parent);
    for (const x of [0.22, -0.02]) for (const y of [h * 0.28, h * 0.72]) { if (y < 5 && x < 0) continue; add(new T.BoxGeometry(3.6, 3.2, 0.3), H.win, cx + w * x + (x > 0 ? 0 : 0), y + 1.4, fz, false, parent); for (const sd of [-1, 1]) add(new T.BoxGeometry(1.1, 3.2, 0.3), H.door[(n + 1) % 5], cx + w * x + sd * 2.6, y + 1.4, fz + facing * 0.05, false, parent); }
    // little front garden
    add(new T.BoxGeometry(w - 2, 0.4, 7), H.grass, cx, 0.2, fz + facing * 5.5, false, parent);
    for (let i = 0; i < 3; i++) add(new T.SphereGeometry(0.7, 6, 5), H.flower[(n + i) % 5], cx - w * 0.3 + i * 4, 0.9, fz + facing * 7.2, false, parent);
  };
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 2, name: 'THE STREETS & THE FAMILY HOMES',
    brief: 'Two broad walking streets through the new district along the northern rim of Kryos, and the first rows of family homes on either side — teal roofs, shutters and little gardens.',
    types: {
      STREET:  { code: 'SF', name: 'WALKING STREET', col: '#8a8478', w: 50, d: 150, h: 3 },
      HOMEROW: { code: 'HM', name: 'ROW OF HOMES',   col: '#a06a5a', w: 50, d: 90, h: 22 },
    },
    order: ['STREET', 'HOMEROW'],
    at: { STREET: [[1215, 0], [1485, 0]], HOMEROW: [[1125, -45], [1125, 45], [1305, -45], [1305, 45]] },
    eye: [1490, 230, -330],
    stats(api, c) { return [['STREETS', c('STREET') + ' / 2'], ['ROWS OF HOMES', c('HOMEROW') + ' / 4'], ['FAMILY HOMES', c('HOMEROW') * 3]]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, H = P.h2(api);
      if (type === 'STREET') {
        add(new T.BoxGeometry(50, 0.5, 150), H.paving, 0, 0.25, 0, false);
        for (let z = -70; z <= 70; z += 10) add(new T.BoxGeometry(50, 0.12, 0.5), H.paving2, 0, 0.55, z, false);
        add(new T.BoxGeometry(2, 0.14, 150), H.paving2, 0, 0.56, 0, false);
        for (const s of [-1, 1]) {
          for (const z of [-60, -20, 20, 60]) { P.tree(api, add, s * 22, 0.4, z, 0.8, z + k); add(new T.BoxGeometry(5, 0.9, 1.5), H.timber, s * 16, 0.95, z + 10); P.lamp(api, add, s * 18, 0.4, z - 10); }
          add(new T.BoxGeometry(2, 0.7, 150), H.grass, s * 24.3, 0.4, 0, false);
        }
        P.person(g, P.civ(62000 + k * 3), 'walk', 0, 0.5, 0, 0, { path: { type: 'line', ax: -6, az: -65, bx: -6, bz: 65, speed: 1.0 } });
        P.person(g, P.kid(62001 + k * 3), 'walk', 0, 0.5, 0, 0, { path: { type: 'line', ax: 8, az: 65, bx: 8, bz: -65, speed: 1.3 }, scale: 0.6 });
        if (k === 0) P.person(g, P.civ(62002), 'gesture', 12, 0.5, -30, Math.PI / 2);
      } else if (type === 'HOMEROW') {
        // three terraced homes in a row along the street, each its own colour, fronts and gardens facing the street
        const th = sl.x - P.OFF[0] < 1215 ? Math.PI / 2 : -Math.PI / 2, c = Math.cos(th), sn = Math.sin(th), R = (x, z) => [x * c + z * sn, -x * sn + z * c];
        const rg = new T.Group(); rg.rotation.y = th; g.add(rg);
        for (let i = 0; i < 3; i++) P.house(api, add, -30 + i * 30, 0, 28, 26, 11 + (i % 2), i + k * 2, rg, 1);
        add(new T.BoxGeometry(92, 1.4, 1.2), H.leaf, 0, 0.7, 16.5, false, rg);
        for (const x of [-48, 48]) P.tree(api, add, x, 0.2, 4, 0.9, k, rg);
        for (let i = 0; i < 3; i++) { const [px, pz] = R(-30 + i * 30, 21), [qx, qz] = R(-26 + i * 30, 36);
          P.person(g, P.civ(62020 + k * 4 + i), i % 2 ? 'idle' : 'walk', px, 0.4, pz, th + Math.PI, i % 2 ? undefined : { path: { type: 'line', ax: px, az: pz, bx: qx, bz: qz, speed: 0.8 } }); }
      }
    },
  }));
})();
