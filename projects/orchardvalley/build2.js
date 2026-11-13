/* ============================================================
   THE ORCHARD VALLEY · BUILD 2 · THE VALLEY FLOOR, THE ROAD, THE STREAM & THE GATE
   Keep this file in projects/orchardvalley next to 66-orchardvalley.html.
   In the valley below the Seed Vault: a wide meadow floor, a gravel road, a clear stream
   with a timber bridge, a gate at the west end and lamp posts along the road.
   ============================================================ */
(function () {
  const P = window.ORV;
  // soft valley colours for every Orchard Valley build (one copy)
  P.ov = function (api) {
    if (this._ov) return this._ov; const T = api.THREE, std = (c, r = 0.85, m = 0, e = {}) => new T.MeshStandardMaterial({ color: c, roughness: r, metalness: m, ...e });
    return this._ov = {
      lawn: std(0x78ad54, 1), lawn2: std(0x679c47, 1), grassDark: std(0x4f8a3c, 1), path: std(0xd2c3a4, 0.95), path2: std(0xb3a583, 0.95), stone: std(0xb9b2a4, 0.9), dark: std(0x3a4048, 0.7, 0.3),
      trunk: std(0x6a4a30, 0.9), timber: std(0x9a6f42, 0.85), timber2: std(0x6e4a2a, 0.9), white: std(0xf6f2ea, 0.6), steel: std(0xc8ced6, 0.35, 0.75), soil: std(0x4a3a2a, 1),
      leaf: std(0x4f9a3a, 0.9, 0, { flatShading: true }), leaf2: std(0x6aa83a, 0.9, 0, { flatShading: true }), leaf3: std(0x3f8a44, 0.9, 0, { flatShading: true }), blossom: std(0xf7c9d8, 0.8, 0, { flatShading: true }), blossom2: std(0xfff0f4, 0.8, 0, { flatShading: true }),
      apple: std(0xd9302a, 0.5), pear: std(0xc8d84a, 0.55), plum: std(0x6a3a8a, 0.5), cherry: std(0xb0203a, 0.5), gold: std(0xe8b81a, 0.5),
      water: new T.MeshStandardMaterial({ color: 0x4f9fc8, roughness: 0.06, metalness: 0.35, transparent: true, opacity: 0.8 }),
      reed: std(0x8aa84a, 1), wall: std(0xf1e3c6, 0.8), wall2: std(0xe8d2b4, 0.8), roof: std(0xb4573a, 0.75), roof2: std(0x6a4b3a, 0.75), door: std(0x3a8a5a, 0.6), red: std(0xb03a2e, 0.6),
      hive: std(0xf2ece0, 0.7), hive2: std(0xe8c13a, 0.7), bee: new T.MeshBasicMaterial({ color: 0x221a10 }),
      flowers: [0xe0402e, 0xf2c41a, 0xf06aa8, 0xffffff, 0x8a4fd0, 0xf08a1a, 0x3a8ae0].map(c => std(c, 0.7)),
      win: new T.MeshStandardMaterial({ color: 0x3a3226, emissive: 0xffd9a0, emissiveIntensity: 0.75, roughness: 0.5 }),
      lamp: new T.MeshBasicMaterial({ color: new T.Color(1.8, 1.4, 0.8), toneMapped: false }), glowA: new T.MeshBasicMaterial({ color: new T.Color(2, 1.4, 0.4), toneMapped: false }),
      glass: new T.MeshStandardMaterial({ color: 0xbfe8ff, roughness: 0.05, metalness: 0.3, transparent: true, opacity: 0.4, side: T.DoubleSide, depthWrite: false }),
    };
  };
  P.gy = (x, z) => window.coaxH(x, z);
  // a fruit tree: v = 0 apple, 1 pear, 2 plum, 3 cherry in blossom
  P.fruitTree = function (api, add, H, x, z, s = 1, v = 0, n = 0, parent) {
    const T = api.THREE, crown = [H.leaf, H.leaf2, H.leaf3, H.blossom][v], fruit = [H.apple, H.pear, H.plum, H.blossom2][v];
    add(new T.CylinderGeometry(0.3 * s, 0.45 * s, 3 * s, 5), H.trunk, x, 1.5 * s, z, false, parent);
    add(new T.IcosahedronGeometry(2.7 * s, 0), crown, x, 4.6 * s, z, true, parent).scale.y = 0.85;
    for (let i = 0; i < 6; i++) { const a = (i + n * 0.7) * 1.05; add(new T.SphereGeometry(v === 3 ? 0.42 * s : 0.34 * s, 6, 5), fruit, x + Math.cos(a) * 2.5 * s, (3.9 + (i % 3) * 0.7) * s, z + Math.sin(a) * 2.5 * s, false, parent); }
  };
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 2, name: 'THE VALLEY FLOOR, THE ROAD, THE STREAM & THE GATE',
    brief: 'In the valley below the Seed Vault: a wide meadow floor, a gravel road running east and west, a clear stream with a timber bridge, a gate at the west end and lamp posts along the road.',
    types: {
      FLOOR:  { code: 'SF', name: 'VALLEY FLOOR', col: '#78ad54', w: 500, d: 460, h: 2 },
      ROAD:   { code: 'SF', name: 'ROAD',         col: '#d2c3a4', w: 168, d: 9,   h: 1 },
      STREAM: { code: 'SF', name: 'STREAM',       col: '#4f9fc8', w: 14,  d: 460, h: 1 },
      BRIDGE: { code: 'HM', name: 'TIMBER BRIDGE', col: '#9a6f42', w: 26, d: 13,  h: 5 },
      GATE:   { code: 'HM', name: 'VALLEY GATE',  col: '#c8a070', w: 8,   d: 24,  h: 12 },
      LAMP:   { code: 'HP', name: 'LAMP POST',    col: '#d9a21b', w: 4,   d: 4,   h: 9 },
    },
    order: ['FLOOR', 'ROAD', 'STREAM', 'BRIDGE', 'GATE', 'LAMP'],
    at: {
      FLOOR: [[1550, 0]], ROAD: [[1550 - 168, 0], [1550, 0], [1550 + 168, 0]], STREAM: [[1550 + 120, 0]], BRIDGE: [[1550 + 120, 0]], GATE: [[1550 - 250, 0]],
      LAMP: [[-200, 8], [-120, -8], [-40, 8], [40, -8], [200, 8], [160, -8], [-200, -8], [-120, 8]].map(([x, z]) => [1550 + x, z]),
    },
    eye: [1550 + 120, P.SY + 120, 250],
    stats(api, c) { return [['VALLEY FLOOR', c('FLOOR') ? 'LAID' : 'NOT YET'], ['ROAD', c('ROAD') + ' / 3'], ['STREAM', c('STREAM') ? 'FLOWING' : 'NOT YET'], ['BRIDGE', c('BRIDGE') ? 'STANDING' : 'NOT YET'], ['VALLEY GATE', c('GATE') ? 'STANDING' : 'NOT YET'], ['LAMPS', c('LAMP') + ' / 8']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, H = P.ov(api);
      if (type === 'FLOOR') {
        add(new T.BoxGeometry(500, 0.3, 460), H.lawn, 0, 0.15, 0, false);
        for (let i = 0; i < 12; i++) add(new T.BoxGeometry(500, 0.05, 16), H.lawn2, 0, 0.33, -210 + i * 38, false);
        // wild flowers scattered on the meadow and a few boulders
        let s = 91; const r = () => (s = (s * 16807) % 2147483647) / 2147483647;
        for (let i = 0; i < 160; i++) { const x = (r() - 0.5) * 480, z = (r() - 0.5) * 440; if (Math.abs(z) < 10 || Math.abs(x - 120) < 12) continue; add(new T.SphereGeometry(0.28, 5, 4), H.flowers[i % 7], x, 0.5, z, false); }
        for (let i = 0; i < 12; i++) { const a = r() * 6.28, d = 215 + r() * 20; add(new T.IcosahedronGeometry(1.4 + r() * 1.6, 0), H.stone, Math.cos(a) * d * 1.05, 0.9, Math.sin(a) * d, true); }
        // a low timber fence round the edge, with gaps for the road
        for (let x = -246; x <= 246; x += 6) for (const z of [-224, 224]) add(new T.BoxGeometry(5.4, 0.18, 0.2), H.timber, x, 1.5, z, false);
        for (let x = -246; x <= 246; x += 18) for (const z of [-224, 224]) add(new T.BoxGeometry(0.4, 1.9, 0.4), H.timber2, x, 0.95, z, false);
      } else if (type === 'ROAD') {
        add(new T.BoxGeometry(168, 0.5, 9), H.path, 0, 0.35, 0, false);
        for (const s of [-1, 1]) add(new T.BoxGeometry(168, 0.55, 0.6), H.path2, 0, 0.38, s * 4.7, false);
        for (let x = -80; x <= 80; x += 14) add(new T.BoxGeometry(5, 0.06, 0.5), H.path2, x, 0.66, 0, false);
      } else if (type === 'STREAM') {
        add(new T.BoxGeometry(14, 0.1, 460), H.dark, 0, 0.05, 0, false);
        add(new T.BoxGeometry(11, 0.25, 460), H.water, 0, 0.32, 0, false);
        for (const s of [-1, 1]) { add(new T.BoxGeometry(2.2, 0.9, 460), H.stone, s * 6.6, 0.45, 0, false); for (let z = -220; z <= 220; z += 14) if (Math.abs(z) > 14) add(new T.CylinderGeometry(0.12, 0.12, 2.2 + (z % 3), 5), H.reed, s * 7.8, 1.5, z + (s > 0 ? 3 : 0), false); }
        for (let z = -216; z <= 216; z += 36) add(new T.IcosahedronGeometry(1 + (Math.abs(z) % 3) * 0.2, 0), H.stone, (z % 2 ? 1 : -1) * 2.6, 0.4, z, false);
      } else if (type === 'BRIDGE') {
        // a timber bridge carrying the road over the stream, along x
        add(new T.BoxGeometry(24, 0.6, 9.4), H.timber, 0, 1.9, 0, true);
        for (let x = -11; x <= 11; x += 2) add(new T.BoxGeometry(0.9, 0.12, 9.4), H.timber2, x, 2.25, 0, false);
        for (const z of [-4.8, 4.8]) { add(new T.BoxGeometry(24, 0.3, 0.3), H.timber2, 0, 3.7, z, false); add(new T.BoxGeometry(24, 0.2, 0.2), H.timber2, 0, 3.0, z, false); for (let x = -11; x <= 11; x += 2.75) add(new T.BoxGeometry(0.3, 1.9, 0.3), H.timber2, x, 2.6, z, false); }
        for (const x of [-9.5, 9.5]) for (const z of [-4, 4]) add(new T.BoxGeometry(1, 2, 1), H.stone, x, 0.9, z, false);
        add(new T.SphereGeometry(0.4, 6, 5), H.lamp, -11.5, 4.2, 4.8, false); add(new T.SphereGeometry(0.4, 6, 5), H.lamp, 11.5, 4.2, -4.8, false);
      } else if (type === 'GATE') {
        for (const s of [-1, 1]) { add(new T.BoxGeometry(2.4, 11, 2.4), H.timber2, 0, 5.5, s * 10, true); add(new T.BoxGeometry(3.4, 0.7, 3.4), H.stone, 0, 11.3, s * 10, false); add(new T.BoxGeometry(3.4, 0.8, 3.4), H.stone, 0, 0.4, s * 10, false); }
        add(new T.BoxGeometry(2, 2.4, 22.4), H.timber, 0, 10.4, 0, true); add(new T.BoxGeometry(3, 0.6, 24), H.roof2, 0, 11.9, 0, false);
        for (let i = -4; i <= 4; i++) add(new T.SphereGeometry(0.3, 6, 5), i % 2 ? H.lamp : H.glowA, -1.4, 9.0, i * 2.4, false);
        P.sign(api, g, 'THE ORCHARD VALLEY', 16, 2.4, 1.2, 10.4, 0, Math.PI / 2, '#2a3a1a', '#fff0c0');
        P.person(g, P.civ(66010), 'idle', 5, 0.5, 6, -Math.PI / 2);
      } else if (type === 'LAMP') {
        add(new T.CylinderGeometry(0.18, 0.28, 8, 8), H.steel, 0, 4, 0, false); add(new T.BoxGeometry(1.6, 0.25, 0.8), H.steel, 0.7, 8, 0, false);
        add(new T.SphereGeometry(0.55, 8, 6), H.lamp, 1.3, 7.75, 0, false); add(new T.CylinderGeometry(0.5, 0.6, 0.6, 8), H.stone, 0, 0.3, 0, false);
      }
    },
  }));
})();
