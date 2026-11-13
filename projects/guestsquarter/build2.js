/* ============================================================
   THE GUESTS' QUARTER · BUILD 2 · THE GREEN, THE LANES & THE GATE
   Keep this file in projects/guestsquarter next to 65-guestsquarter.html.
   At the north-west edge of Kryos: a wide green, three lanes, a welcome gate,
   a shuttle pad and lamps.
   ============================================================ */
(function () {
  const P = window.GSQ;
  // warm colours for every Guests' Quarter build (one copy)
  P.gq = function (api) {
    if (this._gq) return this._gq; const T = api.THREE, std = (c, r = 0.85, m = 0, e = {}) => new T.MeshStandardMaterial({ color: c, roughness: r, metalness: m, ...e });
    return this._gq = {
      lawn: std(0x6fae52, 1), lawn2: std(0x5a9a44, 1), path: std(0xd9cdb4, 0.95), path2: std(0xbfb299, 0.95), stone: std(0xb9b2a4, 0.9), dark: std(0x3a4048, 0.7, 0.3),
      walls: [0xf1e3c6, 0xf0c9a0, 0xe0a47a, 0xf3d88a, 0xc9d9a8, 0xe8d2b4, 0xf2b8a0, 0xd8e6d0].map(c => std(c, 0.8)),
      roofs: [0xb4573a, 0x6a4b3a, 0x4a6a5a, 0x8a4a3a, 0x5a5f78].map(c => std(c, 0.75)),
      doors: [0x2f7fb0, 0xb03a2e, 0x3a8a5a, 0xd9a21b, 0x7b4fa0, 0xe0642e].map(c => std(c, 0.6)),
      flowers: [0xe0402e, 0xf2c41a, 0xf06aa8, 0xffffff, 0x8a4fd0, 0xf08a1a].map(c => std(c, 0.7)),
      timber: std(0x9a6f42, 0.85), timber2: std(0x6e4a2a, 0.9), white: std(0xf6f2ea, 0.6), steel: std(0xc8ced6, 0.35, 0.75), soil: std(0x4a3a2a, 1),
      trunk: std(0x6a4a30, 0.9), leaf: std(0x4f9a3a, 0.9, 0, { flatShading: true }), leaf2: std(0x7aa83a, 0.9, 0, { flatShading: true }), hedge: std(0x3f7a34, 1),
      win: new T.MeshStandardMaterial({ color: 0x3a3226, emissive: 0xffd9a0, emissiveIntensity: 0.75, roughness: 0.5 }),
      lamp: new T.MeshBasicMaterial({ color: new T.Color(1.8, 1.4, 0.8), toneMapped: false }), glowG: new T.MeshBasicMaterial({ color: new T.Color(0.5, 1.8, 1.0), toneMapped: false }),
      glowA: new T.MeshBasicMaterial({ color: new T.Color(2, 1.4, 0.4), toneMapped: false }),
      glass: new T.MeshStandardMaterial({ color: 0xbfe8ff, roughness: 0.05, metalness: 0.3, transparent: true, opacity: 0.4, side: T.DoubleSide, depthWrite: false }),
      hazard: std(0xe8b81a, 0.6), red: std(0xb03a2e, 0.6), sign: std(0x14322a, 0.6),
    };
  };
  P.gy = (x, z) => window.coaxH(x, z);
  // a small round tree
  P.tree = function (api, add, H, x, z, s = 1, n = 0, parent) {
    const T = api.THREE; add(new T.CylinderGeometry(0.28 * s, 0.4 * s, 3 * s, 5), H.trunk, x, 1.5 * s, z, false, parent); add(new T.IcosahedronGeometry(2.4 * s, 0), n % 2 ? H.leaf2 : H.leaf, x, 4.2 * s, z, true, parent);
  };
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 2, name: 'THE GREEN, THE LANES & THE GATE',
    brief: 'At the north-west edge of Kryos: a wide green with trees, three paved lanes, a welcome gate at the west end, a shuttle pad and lamp posts, ready for forty homes.',
    types: {
      GREEN: { code: 'SF', name: 'THE GREEN',    col: '#6fae52', w: 340, d: 300, h: 2 },
      LANE:  { code: 'SF', name: 'LANE',         col: '#d9cdb4', w: 330, d: 8,   h: 1 },
      GATE:  { code: 'HM', name: 'WELCOME GATE', col: '#f0c9a0', w: 14,  d: 20,  h: 10 },
      PAD:   { code: 'SF', name: 'SHUTTLE PAD',  col: '#6c757d', w: 44,  d: 44,  h: 2 },
      LAMP:  { code: 'HP', name: 'LAMP POST',    col: '#d9a21b', w: 4,   d: 4,   h: 9 },
    },
    order: ['GREEN', 'LANE', 'GATE', 'PAD', 'LAMP'],
    at: {
      GREEN: [[1550, 0]], LANE: [[1550, -100], [1550, 0], [1550, 100]], GATE: [[1550 - 176, 0]], PAD: [[1550 + 170, 40]],
      LAMP: [[-120, -92], [0, -92], [120, -92], [-120, 92], [0, 92], [120, 92], [-120, 8], [120, 8], [-150, 8], [150, -8]].map(([x, z]) => [1550 + x, z]),
    },
    eye: [1550 + 150, P.SY + 120, 230],
    stats(api, c) { return [['THE GREEN', c('GREEN') ? 'LAID' : 'NOT YET'], ['LANES', c('LANE') + ' / 3'], ['WELCOME GATE', c('GATE') ? 'STANDING' : 'NOT YET'], ['SHUTTLE PAD', c('PAD') ? 'READY' : 'NOT YET'], ['LAMPS', c('LAMP') + ' / 10']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, H = P.gq(api);
      if (type === 'GREEN') {
        add(new T.BoxGeometry(340, 0.3, 300), H.lawn, 0, 0.15, 0, false);
        for (let i = 0; i < 9; i++) add(new T.BoxGeometry(340, 0.05, 14), H.lawn2, 0, 0.33, -140 + i * 34, false);
        // a low hedge round the edge, with gaps for the lanes and the gate
        for (const s of [-1, 1]) for (let x = -160; x <= 160; x += 8) add(new T.BoxGeometry(7, 1.2, 1.6), H.hedge, x, 0.9, s * 149, false);
        for (const s of [-1, 1]) for (let z = -140; z <= 140; z += 8) if (Math.abs(z) > 16 || s > 0) add(new T.BoxGeometry(1.6, 1.2, 7), H.hedge, s * 169, 0.9, z, false);
        // trees on the lawn between the home blocks and a few round the edge
        let n = 0; for (const z of [-40, 40]) for (let x = -150; x <= 150; x += 25) { if (Math.abs(x) < 80 && Math.abs(z) < 50) continue; P.tree(api, add, H, x + (n % 3) * 3, z + ((n + 1) % 3) * 2, 0.9 + (n % 4) * 0.12, n); n++; }
        for (let x = -160; x <= 160; x += 40) for (const z of [-158, 158]) P.tree(api, add, H, x, z, 1.1, n++);
        // benches and a little pond on the south lawn
        const pond = add(new T.CylinderGeometry(9, 9, 0.2, 24), F.water || H.glass, 0, 0.35, 45, false); pond.scale.z = 0.6;
        for (let a = 0; a < 6; a++) { const t = a / 6 * Math.PI * 2; add(new T.BoxGeometry(2.4, 0.6, 0.8), H.timber, Math.cos(t) * 13, 0.7, 45 + Math.sin(t) * 8, false).rotation.y = -t + Math.PI / 2; }
        P.sign(api, g, 'THE GUESTS’ QUARTER', 20, 3, 0, 4.4, 150, 0, '#3a2414', '#ffe3b0');
      } else if (type === 'LANE') {
        add(new T.BoxGeometry(330, 0.5, 8), H.path, 0, 0.35, 0, false);
        for (const s of [-1, 1]) add(new T.BoxGeometry(330, 0.55, 0.5), H.path2, 0, 0.38, s * 4.1, false);
        for (let x = -160; x <= 160; x += 20) add(new T.BoxGeometry(0.3, 0.06, 6), H.path2, x, 0.64, 0, false);
      } else if (type === 'GATE') {
        for (const s of [-1, 1]) { add(new T.BoxGeometry(2.6, 9, 2.6), H.walls[1], 0, 4.5, s * 7, true); add(new T.BoxGeometry(3.4, 0.7, 3.4), H.stone, 0, 9.3, s * 7, false); add(new T.BoxGeometry(3.2, 0.8, 3.2), H.stone, 0, 0.4, s * 7, false); }
        add(new T.BoxGeometry(2.4, 2, 18), H.roofs[0], 0, 9.8, 0, true); add(new T.BoxGeometry(2.8, 0.5, 19), H.roofs[1], 0, 10.9, 0, false);
        for (let i = -3; i <= 3; i++) add(new T.SphereGeometry(0.35, 6, 5), i % 2 ? H.lamp : H.glowA, -1.4, 8.6, i * 2.4, false);
        P.sign(api, g, 'WELCOME', 9, 1.6, 1.4, 9.8, 0, Math.PI / 2, '#3a2414', '#ffe3b0');
        P.sign(api, g, 'WELCOME', 9, 1.6, -1.4, 9.8, 0, -Math.PI / 2, '#3a2414', '#ffe3b0', false);
        P.person(g, P.civ(65010), 'idle', 5, 0.5, 5, -Math.PI / 2);
      } else if (type === 'PAD') {
        add(new T.CylinderGeometry(21, 22, 1.0, 40), H.dark, 0, 0.5, 0, true);
        add(new T.CylinderGeometry(19, 19, 0.2, 40), H.stone, 0, 1.05, 0, false);
        const r1 = add(new T.TorusGeometry(17, 0.3, 6, 56), H.hazard, 0, 1.25, 0, false); r1.rotation.x = Math.PI / 2;
        for (const x of [-3.2, 3.2]) add(new T.BoxGeometry(1, 0.15, 10), H.white, x, 1.25, 0, false); add(new T.BoxGeometry(6.4, 0.15, 1), H.white, 0, 1.25, 0, false);
        for (let i = 0; i < 20; i++) { const a = i / 20 * Math.PI * 2; add(new T.SphereGeometry(0.32, 6, 5), i % 2 ? H.glowG : H.glowA, Math.cos(a) * 20.4, 1.3, Math.sin(a) * 20.4, false); }
        add(new T.BoxGeometry(18, 0.12, 3), H.path, -30, 0.4, 0, false);   // the path from the pad toward the lane
      } else if (type === 'LAMP') {
        add(new T.CylinderGeometry(0.18, 0.28, 8, 8), H.steel, 0, 4, 0, false); add(new T.BoxGeometry(1.6, 0.25, 0.8), H.steel, 0.7, 8, 0, false);
        add(new T.SphereGeometry(0.55, 8, 6), H.lamp, 1.3, 7.75, 0, false); add(new T.CylinderGeometry(0.5, 0.6, 0.6, 8), H.stone, 0, 0.3, 0, false);
      }
    },
  }));
})();
