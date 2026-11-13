/* ============================================================
   THE ELDERS GARDEN · BUILD 2 · THE GARDEN, THE PATHS & THE MOON GATE
   Keep this file in projects/eldersgarden next to 68-eldersgarden.html.
   A quiet green garden, crossing gravel paths, a round moon gate and lanterns on poles.
   ============================================================ */
(function () {
  const P = window.EGP;
  P.eg = function (api) {
    if (this._eg) return this._eg; const T = api.THREE, std = (c, r = 0.85, m = 0, e = {}) => new T.MeshStandardMaterial({ color: c, roughness: r, metalness: m, ...e });
    return this._eg = {
      lawn: std(0x6fa84e, 1), lawn2: std(0x5f9a42, 1), path: std(0xd8ccb0, 0.95), path2: std(0xb8aa8a, 0.95), stone: std(0xb9b2a4, 0.9), dark: std(0x3a4048, 0.7, 0.3),
      timber: std(0x9a6f42, 0.85), timber2: std(0x6e4a2a, 0.9), white: std(0xf6f2ea, 0.6), steel: std(0xc8ced6, 0.35, 0.75),
      wall: std(0xf1e3c6, 0.8), roof: std(0x6a8a5a, 0.75), roof2: std(0x6a4b3a, 0.75), soil: std(0x4a3524, 1), red: std(0xc8362a, 0.6), gold: std(0xe8b81a, 0.5),
      leaf: std(0x4f9a3a, 0.9, 0, { flatShading: true }), leaf2: std(0x3f7a2c, 0.9, 0, { flatShading: true }), trunk: std(0x6a4a30, 0.9),
      veg: [0x5f9e3a, 0x8fb04a, 0xc8362a, 0xe8761a, 0x7b4fa0, 0xf2c41a].map(c => std(c, 0.8)),
      flowers: [0xe0402e, 0xf2c41a, 0xf06aa8, 0xffffff, 0x8a4fd0, 0xf08a1a, 0x3a8ae0].map(c => std(c, 0.7)),
      water: new T.MeshStandardMaterial({ color: 0x3f86b0, roughness: 0.08, metalness: 0.45, transparent: true, opacity: 0.85 }),
      glass: new T.MeshStandardMaterial({ color: 0xcfefff, roughness: 0.05, metalness: 0.3, transparent: true, opacity: 0.3, side: T.DoubleSide, depthWrite: false }),
      win: new T.MeshStandardMaterial({ color: 0x3a3226, emissive: 0xffd9a0, emissiveIntensity: 0.75, roughness: 0.5 }),
      lamp: new T.MeshBasicMaterial({ color: new T.Color(1.8, 1.5, 0.8), toneMapped: false }), glow: new T.MeshBasicMaterial({ color: new T.Color(0.7, 2.0, 1.1), toneMapped: false }),
      fire: new T.MeshBasicMaterial({ color: new T.Color(2.4, 1.1, 0.25), toneMapped: false }),
    };
  };
  P.gy = (x, z) => window.coaxH(x, z);
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 2, name: 'THE GARDEN, THE PATHS & THE MOON GATE',
    brief: 'A wide quiet garden on a flat terrace, gravel paths that cross in the middle, a round moon gate at the west end and tall lantern poles along the paths.',
    types: {
      FLOOR: { code: 'SF', name: 'THE GARDEN',  col: '#6fa84e', w: 520, d: 460, h: 2 },
      PATHS: { code: 'SF', name: 'GARDEN PATHS', col: '#d8ccb0', w: 500, d: 400, h: 1 },
      GATE:  { code: 'HM', name: 'MOON GATE',   col: '#c8a070', w: 8,   d: 30,  h: 16 },
      LANTERN: { code: 'HP', name: 'LANTERN POLE', col: '#d9a21b', w: 3, d: 3, h: 12 },
    },
    order: ['FLOOR', 'PATHS', 'GATE', 'LANTERN'],
    at: {
      FLOOR: [[1550, 0]], PATHS: [[1550, 0]], GATE: [[1550 - 262, 0]],
      LANTERN: [[-200, 10], [-120, -10], [-40, 10], [40, -10], [120, 10], [200, -10], [10, -90], [10, 90], [10, -170], [10, 170]].map(([x, z]) => [1550 + x, z]),
    },
    eye: [1550 + 60, P.SY + 130, 260],
    stats(api, c) { return [['THE GARDEN', c('FLOOR') ? 'LAID' : 'NOT YET'], ['PATHS', c('PATHS') ? 'LAID' : 'NOT YET'], ['MOON GATE', c('GATE') ? 'STANDING' : 'NOT YET'], ['LANTERN POLES', c('LANTERN') + ' / 10']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, H = P.eg(api);
      if (type === 'FLOOR') {
        add(new T.BoxGeometry(520, 0.3, 460), H.lawn, 0, 0.15, 0, false);
        for (let i = 0; i < 12; i++) add(new T.BoxGeometry(520, 0.05, 16), H.lawn2, 0, 0.33, -210 + i * 38, false);
        let s = 91; const r = () => (s = (s * 16807) % 2147483647) / 2147483647;
        for (let i = 0; i < 170; i++) { const x = (r() - 0.5) * 500, z = (r() - 0.5) * 440; if (Math.abs(z) < 10 || Math.abs(x) < 10) continue; add(new T.SphereGeometry(0.28, 5, 4), H.flowers[i % 7], x, 0.5, z, false); }
        for (let x = -256; x <= 256; x += 6) for (const z of [-224, 224]) add(new T.BoxGeometry(5.4, 0.18, 0.2), H.timber, x, 1.2, z, false);
        for (let x = -256; x <= 256; x += 18) for (const z of [-224, 224]) add(new T.BoxGeometry(0.4, 1.6, 0.4), H.timber2, x, 0.8, z, false);
        // clipped hedges along the far edge
        for (let x = -240; x <= 240; x += 20) add(new T.BoxGeometry(18, 2.4, 3), H.leaf2, x, 1.5, -218, false);
      } else if (type === 'PATHS') {
        add(new T.BoxGeometry(500, 0.5, 12), H.path, 0, 0.35, 0, false); add(new T.BoxGeometry(12, 0.5, 400), H.path, 0, 0.36, 0, false);
        for (const s of [-1, 1]) { add(new T.BoxGeometry(500, 0.55, 0.6), H.path2, 0, 0.38, s * 6.2, false); add(new T.BoxGeometry(0.6, 0.55, 400), H.path2, s * 6.2, 0.38, 0, false); }
        add(new T.CylinderGeometry(22, 22, 0.55, 32), H.path, 0, 0.4, 0, false);   // a round meeting place in the middle
        for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; add(new T.BoxGeometry(5, 0.6, 1.2), H.path2, Math.cos(a) * 18, 0.7, Math.sin(a) * 18, false).rotation.y = -a; }
      } else if (type === 'GATE') {
        for (const s of [-1, 1]) { add(new T.BoxGeometry(3, 6, 4), H.stone, 0, 3, s * 12); add(new T.BoxGeometry(3.6, 0.8, 4.6), H.stone, 0, 6.2, s * 12); }
        add(new T.TorusGeometry(8, 1.1, 10, 40), H.stone, 0, 8, 0).rotation.y = Math.PI / 2;
        add(new T.TorusGeometry(8, 0.3, 8, 40), H.glow, 0.8, 8, 0, false).rotation.y = Math.PI / 2;
        add(new T.BoxGeometry(3.6, 1, 32), H.stone, 0, 0.5, 0);
        for (let i = 0; i < 16; i++) { const a = i / 16 * Math.PI * 2; add(new T.SphereGeometry(0.4, 6, 5), H.flowers[i % 7], -1.4, 8 + Math.sin(a) * 8.6, Math.cos(a) * 8.6, false); }
        P.sign(api, g, 'THE ELDERS GARDEN', 14, 2, 1.9, 15.6, 0, Math.PI / 2, '#1f3b2c', '#e8ffd8');
        P.person(g, P.civ(68010), 'idle', 5, 0.5, 8, -Math.PI / 2);
      } else if (type === 'LANTERN') {
        add(new T.CylinderGeometry(0.18, 0.28, 11, 8), H.steel, 0, 5.5, 0, false); add(new T.CylinderGeometry(0.5, 0.6, 0.6, 8), H.stone, 0, 0.3, 0, false);
        add(new T.BoxGeometry(1.4, 1.8, 1.4), H.lamp, 0, 11.6, 0, false); add(new T.ConeGeometry(1.2, 0.9, 4), H.roof2, 0, 13, 0, false).rotation.y = Math.PI / 4;
      }
    },
  }));
})();
