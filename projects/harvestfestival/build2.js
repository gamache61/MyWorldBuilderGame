/* ============================================================
   THE HARVEST FESTIVAL GROUNDS · BUILD 2 · THE GROUNDS, THE PROMENADE & THE GATE
   Keep this file in projects/harvestfestival next to 67-harvestfestival.html.
   A wide green with a long promenade, a cross path, a flower gate and poles strung with bunting.
   ============================================================ */
(function () {
  const P = window.HFG;
  P.hf = function (api) {
    if (this._hf) return this._hf; const T = api.THREE, std = (c, r = 0.85, m = 0, e = {}) => new T.MeshStandardMaterial({ color: c, roughness: r, metalness: m, ...e });
    return this._hf = {
      lawn: std(0x7ab455, 1), lawn2: std(0x69a248, 1), path: std(0xe0d2b0, 0.95), path2: std(0xc2b48f, 0.95), stone: std(0xb9b2a4, 0.9), dark: std(0x3a4048, 0.7, 0.3),
      timber: std(0x9a6f42, 0.85), timber2: std(0x6e4a2a, 0.9), white: std(0xf6f2ea, 0.6), steel: std(0xc8ced6, 0.35, 0.75), floor: std(0xc79a62, 0.8),
      wall: std(0xf1e3c6, 0.8), roof: std(0xb4573a, 0.75), roof2: std(0x6a4b3a, 0.75), red: std(0xc8362a, 0.6), gold: std(0xe8b81a, 0.5), straw: std(0xe6c660, 1), pumpkin: std(0xe8761a, 0.7),
      flag: [0xd9302a, 0xf2c41a, 0x3a8ae0, 0x4fae52, 0xf06aa8, 0xf08a1a].map(c => std(c, 0.7, 0, { side: T.DoubleSide })),
      awn: [0xd9302a, 0x2f7ad0, 0x3fa04a, 0xe8a81a, 0x8a4fd0, 0xf06aa8].map(c => std(c, 0.7, 0, { side: T.DoubleSide })),
      flowers: [0xe0402e, 0xf2c41a, 0xf06aa8, 0xffffff, 0x8a4fd0, 0xf08a1a, 0x3a8ae0].map(c => std(c, 0.7)),
      leaf: std(0x4f9a3a, 0.9, 0, { flatShading: true }), trunk: std(0x6a4a30, 0.9),
      win: new T.MeshStandardMaterial({ color: 0x3a3226, emissive: 0xffd9a0, emissiveIntensity: 0.75, roughness: 0.5 }),
      lamp: new T.MeshBasicMaterial({ color: new T.Color(1.8, 1.4, 0.8), toneMapped: false }), glowA: new T.MeshBasicMaterial({ color: new T.Color(2, 1.4, 0.4), toneMapped: false }),
      fire: new T.MeshBasicMaterial({ color: new T.Color(2.4, 1.1, 0.25), toneMapped: false }),
    };
  };
  P.gy = (x, z) => window.coaxH(x, z);
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 2, name: 'THE GROUNDS, THE PROMENADE & THE GATE',
    brief: 'A wide green on a flat terrace, a long promenade running east and west with a cross path, a flower gate at the west end and tall poles strung with coloured bunting.',
    types: {
      FLOOR: { code: 'SF', name: 'THE GREEN',     col: '#7ab455', w: 520, d: 460, h: 2 },
      PROM:  { code: 'SF', name: 'PROMENADE',     col: '#e0d2b0', w: 500, d: 14,  h: 1 },
      CROSS: { code: 'SF', name: 'CROSS PATH',    col: '#e0d2b0', w: 14,  d: 380, h: 1 },
      GATE:  { code: 'HM', name: 'FLOWER GATE',   col: '#c8a070', w: 8,   d: 30,  h: 14 },
      POLE:  { code: 'HP', name: 'BUNTING POLE',  col: '#d9a21b', w: 4,   d: 4,   h: 14 },
    },
    order: ['FLOOR', 'PROM', 'CROSS', 'GATE', 'POLE'],
    at: {
      FLOOR: [[1550, 0]], PROM: [[1550, 0]], CROSS: [[1550 - 20, 0]], GATE: [[1550 - 262, 0]],
      POLE: [[-240, 9], [-160, -9], [-80, 9], [0, -9], [80, 9], [160, -9], [240, 9], [-240, -9], [-160, 9], [-80, -9]].map(([x, z]) => [1550 + x, z]),
    },
    eye: [1550 + 60, P.SY + 130, 260],
    stats(api, c) { return [['THE GREEN', c('FLOOR') ? 'LAID' : 'NOT YET'], ['PROMENADE', c('PROM') ? 'LAID' : 'NOT YET'], ['CROSS PATH', c('CROSS') ? 'LAID' : 'NOT YET'], ['FLOWER GATE', c('GATE') ? 'STANDING' : 'NOT YET'], ['BUNTING POLES', c('POLE') + ' / 10']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, H = P.hf(api);
      if (type === 'FLOOR') {
        add(new T.BoxGeometry(520, 0.3, 460), H.lawn, 0, 0.15, 0, false);
        for (let i = 0; i < 12; i++) add(new T.BoxGeometry(520, 0.05, 16), H.lawn2, 0, 0.33, -210 + i * 38, false);
        let s = 57; const r = () => (s = (s * 16807) % 2147483647) / 2147483647;
        for (let i = 0; i < 160; i++) { const x = (r() - 0.5) * 500, z = (r() - 0.5) * 440; if (Math.abs(z) < 12 || Math.abs(x + 20) < 12) continue; add(new T.SphereGeometry(0.28, 5, 4), H.flowers[i % 7], x, 0.5, z, false); }
        for (let x = -256; x <= 256; x += 6) for (const z of [-224, 224]) add(new T.BoxGeometry(5.4, 0.18, 0.2), H.timber, x, 1.4, z, false);
        for (let x = -256; x <= 256; x += 18) for (const z of [-224, 224]) add(new T.BoxGeometry(0.4, 1.8, 0.4), H.timber2, x, 0.9, z, false);
        // hay bales and pumpkins round the edge
        for (let i = 0; i < 14; i++) { const x = -240 + i * 36, z = i % 2 ? 214 : -214; add(new T.CylinderGeometry(1.4, 1.4, 1.6, 10).rotateZ(Math.PI / 2), H.straw, x, 1.1, z, false); add(new T.SphereGeometry(0.8, 8, 6), H.pumpkin, x + 3, 0.9, z + (z > 0 ? -2 : 2), false); }
      } else if (type === 'PROM') {
        add(new T.BoxGeometry(500, 0.5, 14), H.path, 0, 0.35, 0, false);
        for (const s of [-1, 1]) add(new T.BoxGeometry(500, 0.55, 0.7), H.path2, 0, 0.38, s * 7.1, false);
        for (let x = -240; x <= 240; x += 16) add(new T.BoxGeometry(6, 0.06, 0.6), H.path2, x, 0.66, 0, false);
      } else if (type === 'CROSS') {
        add(new T.BoxGeometry(14, 0.5, 380), H.path, 0, 0.35, 0, false);
        for (const s of [-1, 1]) add(new T.BoxGeometry(0.7, 0.55, 380), H.path2, s * 7.1, 0.38, 0, false);
      } else if (type === 'GATE') {
        for (const s of [-1, 1]) { add(new T.BoxGeometry(2.6, 12, 2.6), H.timber2, 0, 6, s * 13, true); add(new T.BoxGeometry(3.6, 0.8, 3.6), H.stone, 0, 0.4, s * 13, false); }
        add(new T.BoxGeometry(2.2, 2.6, 28.4), H.timber, 0, 11.4, 0, true); add(new T.BoxGeometry(3.2, 0.6, 30), H.roof2, 0, 12.9, 0, false);
        for (let i = -6; i <= 6; i++) { add(new T.SphereGeometry(0.5, 6, 5), H.flowers[(i + 6) % 7], -1.5, 10.2, i * 2.1, false); add(new T.SphereGeometry(0.3, 6, 5), i % 2 ? H.lamp : H.glowA, -1.5, 13.7, i * 2.1, false); }
        P.sign(api, g, 'THE HARVEST FESTIVAL', 20, 2.6, 1.3, 11.4, 0, Math.PI / 2, '#5a2a10', '#ffe9a0');
        P.person(g, P.civ(67010), 'idle', 5, 0.5, 8, -Math.PI / 2);
      } else if (type === 'POLE') {
        add(new T.CylinderGeometry(0.2, 0.3, 14, 8), H.steel, 0, 7, 0, false); add(new T.CylinderGeometry(0.5, 0.6, 0.6, 8), H.stone, 0, 0.3, 0, false);
        add(new T.SphereGeometry(0.55, 8, 6), H.lamp, 0, 14.4, 0, false);
        for (let i = 0; i < 5; i++) { const f = add(new T.ConeGeometry(0.6, 1.5, 3).rotateZ(Math.PI), H.flag[(i + k) % 6], 0.9 + i * 1.6, 13.4 - Math.sin((i + 0.5) / 5 * Math.PI) * -0.0 - (i % 2 ? 0.2 : 0), 0, false); f.rotation.z = Math.PI; }
      }
    },
  }));
})();
