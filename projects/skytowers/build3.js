/* ============================================================
   SKY TOWERS & GARDEN HOMES · BUILD 3 · THE SIX SKY TOWERS
   Keep this file in projects/skytowers next to 85-skytowers.html.
   Six blue-glass towers in two rows of three, each with its own garden podium.
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
    id: 3, name: 'THE SIX SKY TOWERS',
    brief: 'Six blue-glass towers, no two the same: round, stepped, six-sided and ringed, each standing on a garden podium with trees at its corners.',
    types: {
      TOWER: { code: 'HP', name: 'SKY TOWER', col: '#2f7fb0', w: 44, d: 44, h: 190 },
    },
    order: ['TOWER'],
    at: { TOWER: [[HX - 100, HZ - 140], [HX, HZ - 140], [HX + 100, HZ - 140], [HX - 100, HZ - 80], [HX, HZ - 80], [HX + 100, HZ - 80]] },
    eye: [HX + 230, (window.__SKY.Y || -85) + 190, HZ + 330],
    stats(api, c) { return [['SKY TOWERS', c('TOWER') + ' / 6'], ['TOWER HOMES', c('TOWER') * 1000 + ' / 6,000'], ['TALLEST', c('TOWER') ? 'UP TO 195 m' : '—']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, S = P.sk(api); P.THREE_CYL = T.CylinderGeometry; P.THREE_ICO = T.IcosahedronGeometry;
      if (type === 'TOWER') {
        const h = [150, 175, 195, 165, 185, 140][k], m = S.glass[k], r = 15;
        add(new T.BoxGeometry(44, 5, 44), S.trim, 0, 2.5, 0); add(new T.BoxGeometry(36, 12, 36), S.glass[(k + 3) % 6], 0, 11, 0);
        for (const [x, z] of [[-20, -20], [20, -20], [-20, 20], [20, 20]]) tree(add, S, x, 5, z, 0.7, k % 2 === 0);
        const y0 = 17;
        if (k % 3 === 0) { add(new T.CylinderGeometry(r * 0.92, r, h, 18), m, 0, y0 + h / 2, 0); add(new T.SphereGeometry(r * 0.92, 18, 6, 0, Math.PI * 2, 0, Math.PI / 2), m, 0, y0 + h, 0).scale.y = 0.5; }
        else if (k % 3 === 1) { let yy = 0, w = r * 2.1; for (const f of [0.55, 0.3, 0.15]) { const hh = h * f; add(new T.BoxGeometry(w, hh, w), m, 0, y0 + yy + hh / 2, 0); add(new T.BoxGeometry(w + 0.8, 1.2, w + 0.8), S.trim, 0, y0 + yy + hh, 0); add(new T.BoxGeometry(w - 4, 0.8, w - 4), S.grass, 0, y0 + yy + hh + 1, 0, false); yy += hh; w *= 0.78; } }
        else { add(new T.CylinderGeometry(r * 0.55, r, h, 6), m, 0, y0 + h / 2, 0); add(new T.ConeGeometry(r * 0.55, h * 0.16, 6), m, 0, y0 + h * 1.08, 0); }
        for (let y = 40; y < h; y += 40) add(new T.BoxGeometry(r * 2.2, 1.4, r * 2.2), S.trim, 0, y0 + y, 0, false);
        const top = k % 3 === 1 ? 1.02 : 1.17; const red = add(new T.SphereGeometry(1, 8, 6), S.glow, 0, y0 + h * top + 4, 0, false); api.blink(red, 1.4 + k * 0.1, 0x40d0ff);
        add(new T.CylinderGeometry(0.3, 0.3, 8, 6), S.steel, 0, y0 + h * top, 0, false);
        P.person(g, P.civ(85300 + k), 'idle', 0, 5, 24, 0);
      }
    },

  }));
})();
