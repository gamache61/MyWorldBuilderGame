/* ============================================================
   THE UNITY WORKS · BUILD 3 · THE GLASSWORKS
   Keep this file in projects/unityworks next to 83-unityworks.html.
   A long glassworks with a glowing kiln, a hall of cooling racks and three sand silos beside it.
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
    id: 3, name: 'THE GLASSWORKS & THE SAND SILOS',
    brief: 'A long glassworks with a glowing kiln, racks of cooling glass sheets seen through its tall windows, and three round sand silos behind it, for the glass of every window and solar panel on Unity.',
    types: {
      GLASSWORKS: { code: 'FB', name: 'THE GLASSWORKS', col: '#b8bec6', w: 130, d: 80, h: 34 },
      SILO:       { code: 'FB', name: 'SAND SILO',      col: '#d8c690', w: 16,  d: 16, h: 40 },
      RACK:       { code: 'SF', name: 'GLASS RACK',     col: '#bfe8ff', w: 30,  d: 10, h: 8 },
    },
    order: ['GLASSWORKS', 'SILO', 'RACK'],
    at: { GLASSWORKS: [[HX - 100, HZ + 120]], SILO: [[HX - 175, HZ + 205], [HX - 145, HZ + 205], [HX - 115, HZ + 205]], RACK: [[HX - 30, HZ + 190], [HX + 10, HZ + 190]] },
    eye: [HX + 230, (window.__WORKS.Y || -85) + 180, HZ + 340],
    stats(api, c) { return [['THE GLASSWORKS', c('GLASSWORKS') ? 'FIRED' : 'NOT YET'], ['SAND SILOS', c('SILO') + ' / 3'], ['GLASS RACKS', c('RACK') + ' / 2']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, H = P.pw(api), U = P.uw(api);
      if (type === 'GLASSWORKS') {
        add(new T.BoxGeometry(130, 24, 80), H.wall, 0, 12, 0); add(new T.BoxGeometry(134, 1.6, 84), H.steel2, 0, 24.8, 0, false);
        const hall = add(new T.BoxGeometry(100, 12, 70), H.glass, 0, 31, 0, false);
        for (let i = 0; i < 6; i++) add(new T.BoxGeometry(0.8, 12, 70), H.steel2, -50 + i * 20, 31, 0, false);
        add(new T.BoxGeometry(100, 1, 72), H.steel, 0, 37.4, 0, false);
        add(new T.BoxGeometry(26, 20, 22), U.brick, -46, 10, 0); add(new T.BoxGeometry(14, 8, 0.6), U.fire, -46, 8, 11.4, false);
        for (let i = 0; i < 5; i++) add(new T.BoxGeometry(14, 6, 0.6), H.win, -12 + i * 20, 12, 40.4, false);
        for (let i = 0; i < 5; i++) add(new T.BoxGeometry(12, 9, 0.5), H.glass, -20 + i * 14, 6, -6, false);
        P.sign(api, g, 'THE GLASSWORKS', 36, 4, 10, 20, 40.8, 0, '#23282f', '#bfe8ff');
        P.person(g, P.civ(83020), 'tablet', 20, 0.5, 48, 0);
      } else if (type === 'SILO') {
        add(new T.CylinderGeometry(7.6, 8, 32, 18), H.wall, 0, 16, 0); add(new T.ConeGeometry(8.2, 7, 18), H.steel2, 0, 35.5, 0, false); add(new T.CylinderGeometry(0.4, 0.4, 7, 6), H.dark, 0, 41, 0, false);
        for (let y = 6; y < 30; y += 8) add(new T.TorusGeometry(7.9, 0.35, 6, 24), H.steel2, 0, y, 0, false).rotation.x = Math.PI / 2;
        add(new T.CylinderGeometry(1.6, 3, 6, 8), U.sand, 0, 3, 8.6, false);
      } else if (type === 'RACK') {
        add(new T.BoxGeometry(30, 1, 10), H.steel2, 0, 0.5, 0, false);
        for (let i = 0; i < 7; i++) { const s = add(new T.BoxGeometry(0.5, 7, 8), H.glass, -12 + i * 4, 4.5, 0, false); s.rotation.z = 0.12; }
        for (const x of [-14, 14]) add(new T.BoxGeometry(1, 8, 9), H.steel2, x, 4, 0, false);
      }
    },
  }));
})();
