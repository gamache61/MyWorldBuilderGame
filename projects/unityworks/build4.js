/* ============================================================
   THE UNITY WORKS · BUILD 4 · THE SOLAR & BATTERY WORKS
   Keep this file in projects/unityworks next to 83-unityworks.html.
   Six arrays of solar panels made at the Works, and a battery hall with racks of green cells that store the sun for the night.
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
    id: 4, name: 'THE SOLAR PANELS & THE BATTERY HALL',
    brief: 'Six arrays of solar panels turned to the sun, and a long battery hall with racks of green storage cells, so the sun of the day lights Unity through the night.',
    types: {
      SOLAR:   { code: 'SF', name: 'SOLAR ARRAY',    col: '#14306a', w: 44, d: 36, h: 8 },
      BATTERY: { code: 'FB', name: 'THE BATTERY HALL', col: '#eef2f5', w: 90, d: 60, h: 22 },
    },
    order: ['BATTERY', 'SOLAR'],
    at: { BATTERY: [[HX + 190, HZ - 90]],
      SOLAR: [[HX + 70, HZ + 80], [HX + 70, HZ + 125], [HX + 70, HZ + 170], [HX + 125, HZ + 80], [HX + 125, HZ + 125], [HX + 125, HZ + 170]] },
    eye: [HX + 270, (window.__WORKS.Y || -85) + 190, HZ + 320],
    stats(api, c) { return [['THE BATTERY HALL', c('BATTERY') ? 'CHARGING' : 'NOT YET'], ['SOLAR ARRAYS', c('SOLAR') + ' / 6'], ['POWER MADE', (c('SOLAR') * 5) + ' MW']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, H = P.pw(api), U = P.uw(api);
      if (type === 'SOLAR') {
        add(new T.BoxGeometry(44, 0.8, 36), H.conc2, 0, 0.4, 0, false);
        for (let r = 0; r < 3; r++) { const p = add(new T.BoxGeometry(40, 0.6, 9.6), U.solar, 0, 5.2, -11 + r * 11); p.rotation.x = -0.45; add(new T.BoxGeometry(41, 0.4, 0.5), U.frame, 0, 5.9, -11 + r * 11 - 4.3, false).rotation.x = -0.45;
          for (let i = 1; i < 8; i++) add(new T.BoxGeometry(0.2, 0.7, 9.6), U.frame, -20 + i * 5, 5.25, -11 + r * 11, false).rotation.x = -0.45;
          for (const x of [-18, 18]) add(new T.BoxGeometry(0.8, 5, 0.8), H.steel2, x, 2.6, -11 + r * 11 + 1, false); }
      } else if (type === 'BATTERY') {
        add(new T.BoxGeometry(90, 18, 60), H.white, 0, 9, 0); add(new T.BoxGeometry(92, 1.4, 62), H.steel2, 0, 18.7, 0, false);
        for (let i = 0; i < 4; i++) add(new T.BoxGeometry(14, 8, 0.6), H.win, -30 + i * 20, 11, 30.4, false);
        for (let i = 0; i < 5; i++) for (let j = 0; j < 3; j++) add(new T.BoxGeometry(12, 8, 3), U.cell, -36 + i * 18, 24 + (j % 2) * 0.1, 18 - j * 18, false).position.y = 22.5;
        add(new T.BoxGeometry(30, 14, 1), H.dark, 46, 7, 0, false); for (let i = 0; i < 6; i++) add(new T.BoxGeometry(2, 9, 0.5), U.cell, 46.4, 7, -12 + i * 4.8, false);
        for (const z of [-20, 20]) { add(new T.BoxGeometry(14, 10, 10), H.steel, 52, 5, z); add(new T.CylinderGeometry(2.2, 2.2, 6, 10), H.steel2, 52, 13, z, false); }
        P.sign(api, g, 'THE BATTERY HALL · THE SUN, SAVED FOR NIGHT', 50, 3.6, 0, 20, 30.8, 0, '#23282f', '#7dff9a');
      }
    },
  }));
})();
