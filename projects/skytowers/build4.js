/* ============================================================
   SKY TOWERS & GARDEN HOMES · BUILD 4 · THE GARDEN HOMES & THE MARKET
   Keep this file in projects/skytowers next to 85-skytowers.html.
   Six rows of white garden homes with green roofs, and a covered market with six stalls.
   ============================================================ */
(function () {
  const P = window.PWP;
  const HX = -900, HZ = 0;   // the middle of the Sky Towers terrace (world -2150, 1050)
  // Kryos look: blue glass, white walls with green roofs, stone, trees and water (one copy, shared by every build here)
  P.sk = P.sk || function (api) {
    if (this._sk) return this._sk; const T = api.THREE, std = (c, r = 0.8, m = 0, e = {}) => new T.MeshStandardMaterial({ color: c, roughness: r, metalness: m, ...e });
    const gt = hue => api.canvasTex(128, 512, (c, w, h) => { c.fillStyle = `hsl(${hue},50%,52%)`; c.fillRect(0, 0, w, h); for (let y = 0; y < h; y += 16) { c.fillStyle = 'rgba(15,35,65,.4)'; c.fillRect(0, y, w, 3); } for (let x = 0; x < w; x += 16) { c.fillStyle = 'rgba(15,35,65,.3)'; c.fillRect(x, 0, 2, h); } for (let i = 0; i < 90; i++) { c.fillStyle = 'rgba(255,255,255,.12)'; c.fillRect(Math.random() * w, Math.random() * h, 12, 8); } });
    const gm = [205, 212, 198, 220, 208, 200].map(hue => { const t = gt(hue); t.repeat.set(2, 3); return new T.MeshStandardMaterial({ map: t, metalness: 0.75, roughness: 0.12 }); });
    return this._sk = {
      glass: gm, trim: std(0xf4f6f8, 0.25, 0.3), wall: std(0xf0f2f4, 0.5, 0.1), wall2: std(0xdfe4ea, 0.6), roof: std(0x4f9a3c, 0.95), roof2: std(0x6fb04a, 0.95), grass: std(0x5f9a42, 1), leaf: std(0x3f8f3a, 0.9, 0, { flatShading: true }), leaf2: std(0x6fb040, 0.9, 0, { flatShading: true }),
      blossom: std(0xf2a0c0, 0.8, 0, { flatShading: true }), trunk: std(0x5a4030, 0.9), stone: std(0xcfc8ba, 0.9), stone2: std(0xa9a294, 0.9), path: std(0xe6dcc0, 0.95), wood: std(0x7a5a3a, 0.85), water: new T.MeshStandardMaterial({ color: 0x3f9ac8, roughness: 0.05, metalness: 0.4, transparent: true, opacity: 0.85 }),
      steel: std(0x9aa3ad, 0.35, 0.85), dark: std(0x2a2f38, 0.5, 0.5), win: new T.MeshStandardMaterial({ color: 0x20303a, emissive: 0x9fe0ff, emissiveIntensity: 0.7, roughness: 0.5 }),
      door: std(0x3a6f9a, 0.6), awn: [0xc8402e, 0x2f6690, 0xe8b82a, 0x3a8a44, 0xf06aa8, 0x8a4fd6].map(c => std(c, 0.8, 0, { side: T.DoubleSide })), flower: [0xe8402e, 0xf2c41a, 0xf06aa8, 0xffffff].map(c => std(c, 0.8)),
      glassP: new T.MeshStandardMaterial({ color: 0xbfe8ff, roughness: 0.05, metalness: 0.3, transparent: true, opacity: 0.32, side: T.DoubleSide, depthWrite: false }),
      lamp: new T.MeshBasicMaterial({ color: new T.Color(2.0, 1.8, 1.2), toneMapped: false }), glow: new T.MeshBasicMaterial({ color: new T.Color(0.6, 1.6, 2.4), toneMapped: false }),
      rail: std(0x6c7580, 0.4, 0.8), train: std(0xeef2f5, 0.3, 0.4), trainb: std(0x2f6690, 0.4, 0.4),
    };
  };
  P.gy = P.gy || ((x, z) => window.coaxH(x, z));
  const tree = (add, S, x, y, z, s = 1, b = false) => { add(new P.THREE_CYL(0.3 * s, 0.45 * s, 4 * s, 5), S.trunk, x, y + 2 * s, z, false); add(new P.THREE_ICO(3.4 * s, 0), b ? S.blossom : S.leaf, x, y + 6.2 * s, z, false); };

  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 4, name: 'THE GARDEN HOMES & THE MARKET',
    brief: 'Six rows of white garden homes with green roofs, each with a front garden, and a covered market hall with six stalls for the people of the towers.',
    types: {
      HOMES:  { code: 'SF', name: 'GARDEN HOMES', col: '#f0f2f4', w: 86, d: 28, h: 12 },
      MARKET: { code: 'HP', name: 'MARKET',       col: '#e8b82a', w: 70, d: 44, h: 16 },
    },
    order: ['HOMES', 'MARKET'],
    at: { HOMES: [[HX - 60, HZ + 30], [HX + 40, HZ + 30], [HX - 60, HZ + 70], [HX + 40, HZ + 70], [HX - 60, HZ + 110], [HX + 40, HZ + 110]], MARKET: [[HX + 170, HZ + 60]] },
    eye: [HX + 230, (window.__SKY.Y || -85) + 190, HZ + 330],
    stats(api, c) { return [['GARDEN HOMES', c('HOMES') * 4 + ' / 24'], ['MARKET', c('MARKET') ? 'OPEN' : 'NOT YET']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, S = P.sk(api); P.THREE_CYL = T.CylinderGeometry; P.THREE_ICO = T.IcosahedronGeometry;
      if (type === 'HOMES') {
        // a row of four white garden homes with green roofs, a front door each, and a small garden
        for (let i = 0; i < 4; i++) {
          const x = -31.5 + i * 21;
          add(new T.BoxGeometry(18, 9, 14), S.wall, x, 4.5, 0); add(new T.BoxGeometry(19.4, 1.2, 15.4), S.trim, x, 9.2, 0, false);
          add(new T.BoxGeometry(17, 1.4, 13), S.roof, x, 10.3, 0, false); add(new T.BoxGeometry(15, 1, 11), S.roof2, x, 11.3, 0, false); tree(add, S, x + 5, 11.8, 2, 0.45, i % 2 === 0);
          add(new T.BoxGeometry(3, 5.4, 0.4), S.door, x - 4, 2.7, 7.1, false); add(new T.BoxGeometry(5, 3.4, 0.3), S.win, x + 3.5, 5.6, 7.1, false); add(new T.BoxGeometry(5, 3.4, 0.3), S.win, x + 3.5, 5.6, -7.1, false);
          add(new T.BoxGeometry(12, 0.5, 5), S.grass, x - 1, 0.25, 10, false); add(new T.SphereGeometry(0.8, 6, 5), S.flower[(i + k) % 4], x - 6, 1, 10.5, false); add(new T.SphereGeometry(0.8, 6, 5), S.flower[(i + k + 1) % 4], x + 4, 1, 10.5, false);
        }
        add(new T.BoxGeometry(86, 0.3, 4), S.path, 0, 0.15, 11, false);
        P.person(g, P.civ(85400 + k), 'idle', -10, 0.4, 11, 0);
      } else if (type === 'MARKET') {
        add(new T.BoxGeometry(70, 0.8, 44), S.stone, 0, 0.4, 0, false);
        for (const x of [-30, 0, 30]) for (const z of [-17, 17]) add(new T.BoxGeometry(1.2, 11, 1.2), S.steel, x, 6, z, false);
        add(new T.BoxGeometry(68, 0.8, 42), S.glassP, 0, 11.6, 0, false); add(new T.BoxGeometry(70, 1, 1), S.trim, 0, 12, -21, false); add(new T.BoxGeometry(70, 1, 1), S.trim, 0, 12, 21, false);
        for (let i = 0; i < 6; i++) { const x = -26 + (i % 3) * 26, z = i < 3 ? -12 : 12; add(new T.BoxGeometry(14, 0.7, 7), S.awn[i], x, 7.4, z + (i < 3 ? 4 : -4)); add(new T.BoxGeometry(12, 3, 4), S.wood, x, 2.2, z + (i < 3 ? -2 : 2), false);
          for (let j = 0; j < 5; j++) add(new T.SphereGeometry(0.8, 6, 5), S.flower[(i + j) % 4], x - 4 + j * 2, 4.4, z + (i < 3 ? -2 : 2), false);
          P.person(g, P.civ(85420 + i), 'idle', x, 0.8, z + (i < 3 ? 2 : -2), i < 3 ? 0 : Math.PI); }
        add(new T.BoxGeometry(24, 4, 0.5), S.dark, 0, 15, 21.6, false); add(new T.BoxGeometry(22, 2.6, 0.3), S.lamp, 0, 15, 21.9, false);
      }
    },

  }));
})();
