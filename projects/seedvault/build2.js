/* ============================================================
   THE SEED VAULT · BUILD 2 · THE FORECOURT & THE SHUTTLE PAD
   Keep this file in projects/seedvault next to 64-seedvault.html.
   At the foot of the far mountain, on the levelled terrace: a paved forecourt,
   a landing pad for the shuttle, a gatehouse and four lamps.
   ============================================================ */
(function () {
  const P = window.SDV;
  // stone, concrete, rock, steel, glass and glow for every Seed Vault build (one copy)
  P.sv = function (api) {
    if (this._sv) return this._sv; const T = api.THREE, std = (c, r = 0.8, m = 0, e = {}) => new T.MeshStandardMaterial({ color: c, roughness: r, metalness: m, ...e });
    return this._sv = {
      paving: std(0xb4ada0, 0.95), paving2: std(0x9a9488, 0.95), concrete: std(0xc6c8c3, 0.9), concrete2: std(0x9ea29d, 0.92), dark: std(0x3a4048, 0.7, 0.3),
      rock: std(0x7d7a70, 1, 0, { flatShading: true }), rock2: std(0x6a675f, 1, 0, { flatShading: true }), moss: std(0x56803c, 1, 0, { flatShading: true }),
      grass: std(0x5aa64a, 1), white: std(0xf4f1ea, 0.6), cream: std(0xe8dcc0, 0.8), timber: std(0x9a6f42, 0.85), timber2: std(0x6e4a2a, 0.9),
      roof: std(0x3b7a5a, 0.85), steel: std(0xc8ced6, 0.35, 0.75), door: std(0x59646f, 0.45, 0.7), hazard: std(0xe8b81a, 0.6), red: std(0xb03a2e, 0.6), kraft: std(0xc8a46a, 0.9),
      glass: new T.MeshStandardMaterial({ color: 0xbfe8ff, roughness: 0.05, metalness: 0.3, transparent: true, opacity: 0.38, side: T.DoubleSide, depthWrite: false }),
      win: new T.MeshStandardMaterial({ color: 0x2a3a34, emissive: 0xffe3b0, emissiveIntensity: 0.6, roughness: 0.5 }),
      lamp: new T.MeshBasicMaterial({ color: new T.Color(1.7, 1.4, 0.8), toneMapped: false }), glowG: new T.MeshBasicMaterial({ color: new T.Color(0.5, 1.8, 1.0), toneMapped: false }),
      glowA: new T.MeshBasicMaterial({ color: new T.Color(2, 1.4, 0.4), toneMapped: false }), glowC: new T.MeshBasicMaterial({ color: new T.Color(0.7, 1.7, 2.0), toneMapped: false }),
      frost: std(0xe3f4ff, 0.3, 0.1), pipe: std(0x8aa0b0, 0.4, 0.8), tank: std(0xdfe6ea, 0.35, 0.6), soil: std(0x4a3a2a, 1), leaf: std(0x4fa03a, 0.85), shelf: std(0xb6bec6, 0.5, 0.6),
      box: [0xc8a46a, 0x4f8fd0, 0x5cb85c, 0xd9a21b, 0xe0642e].map(c => std(c, 0.85)),
    };
  };
  P.gy = (x, z) => window.coaxH(x, z);
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 2, name: 'THE FORECOURT & THE SHUTTLE PAD',
    brief: 'At the foot of the far mountain, on the levelled terrace: a paved forecourt, a landing pad for the shuttle, a gatehouse and four lamps — the way in to the Seed Vault.',
    types: {
      TERRACE:   { code: 'SF', name: 'FORECOURT',    col: '#b4ada0', w: 150, d: 90, h: 2 },
      PAD:       { code: 'SF', name: 'SHUTTLE PAD',  col: '#6c757d', w: 56,  d: 56, h: 2 },
      GATEHOUSE: { code: 'HM', name: 'GATEHOUSE',    col: '#d9c9a8', w: 16,  d: 12, h: 8 },
      LAMP:      { code: 'HP', name: 'LAMP POST',    col: '#d9a21b', w: 4,   d: 4,  h: 9 },
    },
    order: ['TERRACE', 'PAD', 'GATEHOUSE', 'LAMP'],
    at: { TERRACE: [[1550, 60]], PAD: [[1550 + 120, 90]], GATEHOUSE: [[1550 - 95, 70]], LAMP: [[1550 - 60, 25], [1550 + 60, 25], [1550 - 60, 95], [1550 + 60, 95]] },
    eye: [1550 + 150, P.SY + 110, 200],
    stats(api, c) { return [['FORECOURT', c('TERRACE') ? 'LAID' : 'NOT YET'], ['SHUTTLE PAD', c('PAD') ? 'READY' : 'NOT YET'], ['GATEHOUSE', c('GATEHOUSE') ? 'STANDING' : 'NOT YET'], ['LAMPS', c('LAMP') + ' / 4']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, H = P.sv(api);
      if (type === 'TERRACE') {
        add(new T.BoxGeometry(150, 1.2, 90), H.paving, 0, 0.6, 0, false);
        add(new T.BoxGeometry(152, 0.5, 1.2), H.paving2, 0, 1.2, 45.4, false); add(new T.BoxGeometry(152, 0.5, 1.2), H.paving2, 0, 1.2, -45.4, false);
        for (const s of [-1, 1]) add(new T.BoxGeometry(1.2, 0.5, 92), H.paving2, s * 75.4, 1.2, 0, false);
        add(new T.BoxGeometry(12, 0.15, 86), H.concrete, 0, 1.28, 0, false);                    // the path to the portal
        for (let i = -3; i <= 3; i++) add(new T.BoxGeometry(150, 0.08, 0.3), H.paving2, 0, 1.24, i * 12, false);
        for (const s of [-1, 1]) for (let z = -36; z <= 36; z += 18) { add(new T.BoxGeometry(2.2, 0.8, 2.2), H.paving2, s * 40, 1.6, z, false); add(new T.SphereGeometry(1.6, 6, 5), H.moss, s * 40, 2.6, z, false); }
        P.sign(api, g, 'THE SEED VAULT', 18, 3, 0, 4.2, 43, 0, '#14322a', '#bff8d0');
      } else if (type === 'PAD') {
        add(new T.CylinderGeometry(27, 28, 1.2, 48), H.dark, 0, 0.6, 0, true);
        add(new T.CylinderGeometry(24, 24, 0.2, 48), H.concrete2, 0, 1.25, 0, false);
        const r1 = add(new T.TorusGeometry(22, 0.35, 6, 64), H.hazard, 0, 1.45, 0, false); r1.rotation.x = Math.PI / 2;
        const r2 = add(new T.TorusGeometry(10, 0.3, 6, 48), H.hazard, 0, 1.45, 0, false); r2.rotation.x = Math.PI / 2;
        for (const x of [-4, 4]) add(new T.BoxGeometry(1.2, 0.15, 12), H.white, x, 1.45, 0, false); add(new T.BoxGeometry(8, 0.15, 1.2), H.white, 0, 1.45, 0, false);
        for (let i = 0; i < 24; i++) { const a = i / 24 * Math.PI * 2; add(new T.SphereGeometry(0.35, 6, 5), i % 2 ? H.glowG : H.glowA, Math.cos(a) * 26, 1.5, Math.sin(a) * 26, false); }
      } else if (type === 'GATEHOUSE') {
        add(new T.BoxGeometry(16, 0.6, 12), H.concrete2, 0, 0.3, 0, false);
        add(new T.BoxGeometry(14, 6, 10), H.cream, 0, 3.6, 0, true); add(new T.BoxGeometry(16, 0.7, 12), H.roof, 0, 6.9, 0, true); add(new T.BoxGeometry(15, 0.5, 11), H.grass, 0, 7.4, 0, false);
        add(new T.BoxGeometry(9, 3.2, 0.3), H.glass, 0, 3.8, 5.1, false); add(new T.BoxGeometry(8.6, 2.8, 0.2), H.win, 0, 3.8, 4.95, false);
        add(new T.BoxGeometry(1.4, 3.6, 0.3), H.timber2, 5.2, 2.5, 5.1, false);
        // the barrier arm across the path
        add(new T.CylinderGeometry(0.3, 0.3, 3, 8), H.red, 9, 1.5, 6, false); add(new T.BoxGeometry(11, 0.3, 0.3), H.hazard, 14.4, 2.8, 6, false);
        P.person(g, P.civ(64010), 'idle', 3, 0.6, 7.5, 0);
      } else if (type === 'LAMP') {
        add(new T.CylinderGeometry(0.18, 0.28, 8, 8), H.steel, 0, 4, 0, false); add(new T.BoxGeometry(1.6, 0.25, 0.8), H.steel, 0.7, 8, 0, false);
        add(new T.SphereGeometry(0.55, 8, 6), H.lamp, 1.3, 7.75, 0, false); add(new T.CylinderGeometry(0.5, 0.6, 0.6, 8), H.concrete2, 0, 0.3, 0, false);
      }
    },
  }));
})();
