/* ============================================================
   THE UNITY WORKS · BUILD 2 · THE ORE FOUNDRY & THE YARD
   Keep this file in projects/unityworks next to 83-unityworks.html.
   A wide concrete yard, the Ore Foundry with a glowing furnace and two tall stacks, three heaps of ore, a road east to the factory district and lamps.
   ============================================================ */
(function () {
  const P = window.PWP;
  const HX = -900, HZ = 1100;   // the middle of the Unity Works terrace (world -2150, 2150)
  // concrete, steel and hazard paint (one copy, shared by every build)
  P.pw = P.pw || function (api) {
    if (this._pw) return this._pw; const T = api.THREE, std = (c, r = 0.8, m = 0, e = {}) => new T.MeshStandardMaterial({ color: c, roughness: r, metalness: m, ...e });
    return this._pw = {
      conc: std(0xa9adb2, 0.95), conc2: std(0x8f949a, 0.95), road: std(0x3a3e45, 0.9), line: std(0xf2e6a0, 0.8), wall: std(0xd7dade, 0.7), wall2: std(0xb8bec6, 0.7, 0.2),
      steel: std(0x9aa3ad, 0.35, 0.85), steel2: std(0x6c7580, 0.4, 0.8), dark: std(0x23282f, 0.55, 0.5), white: std(0xf4f6f8, 0.45, 0.2),
      glass: new T.MeshStandardMaterial({ color: 0xbfe8ff, roughness: 0.05, metalness: 0.3, transparent: true, opacity: 0.32, side: T.DoubleSide, depthWrite: false }),
      win: new T.MeshStandardMaterial({ color: 0x20303a, emissive: 0x9fe0ff, emissiveIntensity: 0.8, roughness: 0.5 }),
      lamp: new T.MeshBasicMaterial({ color: new T.Color(2.0, 1.8, 1.2), toneMapped: false }),
    };
  };
  // the look of the Works: ore, slag, fire, sand, solar glass, battery cells and tin (one copy, shared by every build)
  P.uw = P.uw || function (api) {
    if (this._uw) return this._uw; const T = api.THREE, std = (c, r = 0.8, m = 0, e = {}) => new T.MeshStandardMaterial({ color: c, roughness: r, metalness: m, ...e });
    return this._uw = {
      ore: std(0x6b4a36, 1), ore2: std(0x8a5a3c, 1), slag: std(0x3a3532, 0.95), sand: std(0xd8c690, 1), brick: std(0x9a4a34, 0.9), brick2: std(0x7a3a28, 0.9),
      fire: new T.MeshBasicMaterial({ color: new T.Color(2.6, 1.0, 0.25), toneMapped: false }), glow: new T.MeshBasicMaterial({ color: new T.Color(2.0, 1.5, 0.5), toneMapped: false }),
      solar: new T.MeshStandardMaterial({ color: 0x14306a, roughness: 0.15, metalness: 0.6, emissive: 0x0a1a40, emissiveIntensity: 0.5 }), frame: std(0xc8ced6, 0.4, 0.8),
      cell: std(0x2f9d57, 0.5, 0.4), cellw: std(0xeef2f5, 0.5, 0.2), tin: std(0xdfe4ea, 0.25, 0.9), red: std(0xc8402e, 0.7), green: std(0x3a8a44, 0.7), yellow: std(0xe8b82a, 0.7),
      smoke: new T.MeshStandardMaterial({ color: 0xcfd3d8, roughness: 1, transparent: true, opacity: 0.55, depthWrite: false }),
    };
  };
  P.gy = P.gy || ((x, z) => window.coaxH(x, z));

  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 2, name: 'THE YARD, THE ROAD & THE ORE FOUNDRY',
    brief: 'A wide concrete yard on its own terrace, a road running east towards the factory district, the Ore Foundry with a glowing furnace and its two tall stacks, three heaps of ore, and lamps.',
    types: {
      YARD:    { code: 'SF', name: 'THE YARD',        col: '#8f949a', w: 270, d: 270, h: 2 },
      ROAD:    { code: 'SF', name: 'THE ROAD',        col: '#3a3e45', w: 160, d: 30,  h: 1 },
      FOUNDRY: { code: 'FB', name: 'THE ORE FOUNDRY', col: '#9a4a34', w: 130, d: 90,  h: 46 },
      STACK:   { code: 'HP', name: 'FOUNDRY STACK',   col: '#b8bec6', w: 12,  d: 12,  h: 70 },
      ORE:     { code: 'SF', name: 'ORE HEAP',        col: '#6b4a36', w: 40,  d: 40,  h: 14 },
      LAMP:    { code: 'HP', name: 'LAMP',            col: '#f2c41a', w: 3,   d: 3,   h: 20 },
    },
    order: ['YARD', 'ROAD', 'FOUNDRY', 'STACK', 'ORE', 'LAMP'],
    at: { YARD: [[HX, HZ]], ROAD: [[HX + 215, HZ]], FOUNDRY: [[HX - 100, HZ - 120]], STACK: [[HX - 165, HZ - 190], [HX - 35, HZ - 190]],
      ORE: [[HX + 60, HZ - 150], [HX + 60, HZ - 100], [HX + 110, HZ - 125]],
      LAMP: [[HX + 80, HZ - 40], [HX + 80, HZ + 40], [HX - 20, HZ - 40], [HX - 20, HZ + 40], [HX + 150, HZ - 24], [HX + 150, HZ + 24]] },
    eye: [HX + 250, (window.__WORKS.Y || -85) + 190, HZ + 330],
    stats(api, c) { return [['THE YARD', c('YARD') ? 'LAID' : 'NOT YET'], ['THE ROAD', c('ROAD') ? 'OPEN' : 'NOT YET'], ['ORE FOUNDRY', c('FOUNDRY') ? 'BUILT' : 'NOT YET'], ['STACKS', c('STACK') + ' / 2'], ['ORE HEAPS', c('ORE') + ' / 3'], ['LAMPS', c('LAMP') + ' / 6']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, H = P.pw(api), U = P.uw(api);
      if (type === 'YARD') {
        add(new T.BoxGeometry(270, 2, 270), H.conc, 0, 1, 0, false);
        for (let x = -120; x <= 120; x += 40) add(new T.BoxGeometry(0.7, 0.3, 270), H.conc2, x, 2.1, 0, false);
        for (let z = -120; z <= 120; z += 40) add(new T.BoxGeometry(270, 0.3, 0.7), H.conc2, 0, 2.1, z, false);
        add(new T.BoxGeometry(270, 1.2, 2), H.line, 0, 2.4, 135, false); add(new T.BoxGeometry(270, 1.2, 2), H.line, 0, 2.4, -135, false);
        P.sign(api, g, 'THE UNITY WORKS · MADE ON UNITY, FOR UNITY', 56, 4, 0, 7, 138, 0, '#23282f', '#ffd060');
      } else if (type === 'ROAD') {
        add(new T.BoxGeometry(160, 0.8, 30), H.road, 0, 0.4, 0, false);
        for (let x = -70; x <= 70; x += 20) add(new T.BoxGeometry(8, 0.2, 1), H.line, x, 0.85, 0, false);
        for (const s of [-1, 1]) add(new T.BoxGeometry(160, 1.2, 1.2), H.conc2, 0, 0.8, s * 15.6, false);
      } else if (type === 'FOUNDRY') {
        add(new T.BoxGeometry(130, 30, 90), U.brick, 0, 16, 0); add(new T.BoxGeometry(134, 2, 94), H.steel2, 0, 31.5, 0, false);
        const roof = add(new T.BoxGeometry(134, 1.4, 50), H.steel, 0, 36, -24); roof.rotation.x = 0.28; const r2 = add(new T.BoxGeometry(134, 1.4, 50), H.steel, 0, 36, 24); r2.rotation.x = -0.28;
        add(new T.BoxGeometry(30, 26, 1), H.dark, 40, 13, 45.4, false); add(new T.BoxGeometry(22, 18, 0.6), U.fire, 40, 11, 45.8, false);
        for (let i = 0; i < 4; i++) add(new T.BoxGeometry(14, 5, 0.6), H.win, -45 + i * 22, 22, 45.4, false);
        add(new T.CylinderGeometry(9, 11, 28, 16), H.steel2, -42, 44, -10); add(new T.CylinderGeometry(7, 7.4, 3, 16), U.fire, -42, 58.5, -10, false);
        for (const s of [-1, 1]) add(new T.CylinderGeometry(1.4, 1.4, 34, 8), H.steel2, 66, 17, s * 30);
        P.sign(api, g, 'THE ORE FOUNDRY', 40, 4, 0, 24, 46, 0, '#23282f', '#ffd060');
        P.person(g, P.civ(83010), 'tablet', 40, 2, 52, 0); P.person(g, P.civ(83011), 'idle', 30, 2, 54, 0);
      } else if (type === 'STACK') {
        add(new T.CylinderGeometry(4.6, 6.4, 70, 16), U.brick2, 0, 35, 0); for (let y = 12; y < 70; y += 14) add(new T.TorusGeometry(5.2 - y * 0.012, 0.5, 6, 20), H.steel2, 0, y, 0, false).rotation.x = Math.PI / 2;
        add(new T.CylinderGeometry(5.2, 4.6, 2, 16), H.dark, 0, 70.6, 0, false); add(new T.CylinderGeometry(3.6, 3.6, 0.8, 16), U.fire, 0, 71.6, 0, false);
        for (let i = 0; i < 3; i++) { const s = add(new T.SphereGeometry(5 + i * 2.2, 10, 8), U.smoke, 4 + i * 6, 78 + i * 9, 0, false); s.userData.smoke = true; }
      } else if (type === 'ORE') {
        const h = add(new T.ConeGeometry(20, 14, 12), U.ore, 0, 7, 0); h.scale.set(1, 1, 0.95);
        for (let i = 0; i < 7; i++) { const a = i * 2.3; add(new T.DodecahedronGeometry(2 + (i % 3) * 0.8), i % 2 ? U.ore2 : U.slag, Math.cos(a) * (8 + (i % 4) * 3), 3 + (i % 3) * 2.2, Math.sin(a) * (8 + (i % 4) * 3), false); }
      } else if (type === 'LAMP') {
        add(new T.CylinderGeometry(0.4, 0.5, 15, 6), H.dark, 0, 7.5, 0, false); add(new T.BoxGeometry(5, 0.8, 1.6), H.dark, 0, 15.2, 0, false); add(new T.SphereGeometry(1.4, 10, 8), H.lamp, 0, 14.4, 0, false);
      }
    },
  }));
})();
