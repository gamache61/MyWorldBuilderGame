/* ============================================================
   THE HOUSE OF OCKNOG · BUILD 2 · THE WELCOME COURT, THE CLAY WALL & THE GATE
   Keep this file in projects/houseofocknog next to 82-houseofocknog.html.
   A round clay court with a stone circle, a low clay wall and a welcome gate towards the lane, warm lanterns, and the first people of Ocknog waiting at the gate.
   ============================================================ */
(function () {
  const P = window.PWP;
  const HX = 1550 - 1400, HZ = 1100;   // the middle of the House of Ocknog terrace (world -1100, 2150)
  // concrete, steel, hazard paint for the Parts Works (one copy, shared by every build)
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
  // clay, thatch, dust and warm light: the look of Ocknog (one copy, shared by every build here)
  P.ok = function (api) {
    if (this._ok) return this._ok; const T = api.THREE, std = (c, r = 0.9, m = 0, e = {}) => new T.MeshStandardMaterial({ color: c, roughness: r, metalness: m, ...e });
    return this._ok = {
      dust: std(0xc4a478, 1), dust2: std(0xa88a62, 1), stone: std(0xb8a88c, 0.95), stone2: std(0x8f8068, 0.95), clay: std(0xc08c5c, 0.95), clay2: std(0xa06c44, 0.95),
      thatch: std(0x9a7a3c, 1), wood: std(0x6a4a2a, 0.85), dark: std(0x2a2620, 0.7, 0.2), brass: std(0xd0a64a, 0.35, 0.8), steel: std(0xc8ced6, 0.35, 0.75),
      crop: std(0x4fae44, 0.8), crop2: std(0x7ac24a, 0.8), soil: std(0x5a3e28, 1), water: std(0x3f9ac0, 0.08, 0.45), white: std(0xf4f2ec, 0.55, 0.1),
      cloth: [0xc8873a, 0x8a5a9a, 0x3a8a8a, 0xb0503a, 0x6a8a3a].map(c => std(c, 0.9, 0, { side: T.DoubleSide })),
      lamp: new T.MeshBasicMaterial({ color: new T.Color(2.2, 1.7, 0.8), toneMapped: false }),
      cure: new T.MeshBasicMaterial({ color: new T.Color(0.5, 2.0, 1.6), toneMapped: false }),
      glass: new T.MeshStandardMaterial({ color: 0xcfefff, roughness: 0.05, metalness: 0.3, transparent: true, opacity: 0.3, side: T.DoubleSide, depthWrite: false }),
      skin: std(0x86a890, 0.7), skin2: std(0x7b9c8a, 0.7),
      eye: new T.MeshStandardMaterial({ color: 0x050a0c, roughness: 0.2, metalness: 0.5, emissive: 0x16424a, emissiveIntensity: 0.8 }),
      robes: [0xc8873a, 0x8a5a9a, 0x3a8a8a, 0xb0503a, 0x6a8a3a].map(c => std(c, 0.9, 0, { side: T.DoubleSide })),
    };
  };
  P.gy = (x, z) => window.coaxH(x, z);
  // a person of Ocknog: an alien, tall and slender, grey-green skin, a long head, big dark eyes, three-fingered hands, a long robe
  P.aliens = P.aliens || [];
  P.alien = function (api, parent, x, y, z, ry = 0, o = {}) {
    const T = api.THREE, F = P.ok(api), g = new T.Group(); g.position.set(x, y, z); g.rotation.y = ry; g.scale.setScalar(o.scale || 1); g.userData.keep = true; parent.add(g);
    const m = (geo, mat, X, Y, Z) => { const q = new T.Mesh(geo, mat); q.position.set(X, Y, Z); q.castShadow = true; g.add(q); return q; };
    const seed = o.seed || 1, skin = seed % 2 ? F.skin : F.skin2, robe = F.robes[seed % 5];
    m(new T.CylinderGeometry(0.2, 0.44, 1.5, 10, 1, true), robe, 0, 0.95, 0);
    m(new T.CapsuleGeometry(0.2, 0.6, 4, 8), robe, 0, 1.75, 0);
    m(new T.CylinderGeometry(0.06, 0.08, 0.35, 6), skin, 0, 2.2, 0);
    const head = new T.Group(); head.position.set(0, 2.55, 0); g.add(head);
    const sk = new T.Mesh(new T.SphereGeometry(0.3, 14, 10), skin); sk.scale.set(0.85, 1.35, 0.95); sk.castShadow = true; head.add(sk);
    for (const s of [-1, 1]) { const e = new T.Mesh(new T.SphereGeometry(0.1, 10, 8), F.eye); e.scale.set(0.8, 1.7, 0.35); e.position.set(s * 0.13, 0.05, 0.25); e.rotation.z = s * 0.4; head.add(e); }
    const arms = [-1, 1].map(s => { const a = new T.Group(); a.position.set(s * 0.3, 2.0, 0); g.add(a); const up = new T.Mesh(new T.CapsuleGeometry(0.055, 0.8, 3, 6), skin); up.position.y = -0.45; a.add(up); for (let i = 0; i < 3; i++) { const f = new T.Mesh(new T.ConeGeometry(0.02, 0.2, 4), skin); f.position.set((i - 1) * 0.03, -0.95, 0); f.rotation.x = Math.PI; a.add(f); } a.rotation.z = s * 0.12; return a; });
    for (const s of [-1, 1]) m(new T.CylinderGeometry(0.07, 0.06, 0.4, 6), skin, s * 0.12, 0.2, 0);
    if (o.elder) { m(new T.CylinderGeometry(0.03, 0.03, 2.6, 6), F.stone, 0.55, 1.3, 0.2); const orb = m(new T.SphereGeometry(0.12, 8, 6), F.cure, 0.55, 2.7, 0.2); orb.castShadow = false; }
    g.userData.head = head; g.userData.arms = arms; g.userData.mode = o.mode || 'idle'; g.userData.ph = seed * 1.7; g.userData.base = ry;
    P.aliens.push(g); return g;
  };
  // the people of Ocknog move: heads turn, hands wave, and they jump when they cheer
  P.moveAliens = function (t) {
    for (const a of P.aliens) {
      const u = a.userData, ph = t + u.ph; if (!a.parent || !u.head) continue;
      u.head.rotation.y = Math.sin(ph * 0.6) * 0.5; u.head.rotation.z = Math.sin(ph * 0.4) * 0.08;
      if (u.mode === 'wave') { u.arms[1].rotation.z = 2.6 + Math.sin(ph * 5) * 0.35; u.arms[0].rotation.z = -0.12; }
      else if (u.mode === 'cheer') { u.arms[0].rotation.z = -2.7 - Math.sin(ph * 6) * 0.3; u.arms[1].rotation.z = 2.7 + Math.sin(ph * 6) * 0.3; if (u.y0 === undefined) u.y0 = a.position.y; a.position.y = u.y0 + Math.abs(Math.sin(ph * 4)) * 0.4; }
      else { u.arms[0].rotation.z = -0.12 + Math.sin(ph * 0.8) * 0.04; u.arms[1].rotation.z = 0.12 - Math.sin(ph * 0.8) * 0.04; if (u.y0 !== undefined) { a.position.y = u.y0; u.y0 = undefined; } }
    }
  };
  // the same movement for the Ocknog people of a finished visit seen from a later chapter
  if (!P._alienWrap) { P._alienWrap = true; const mw = P.moveWalkers; P.moveWalkers = function (t) { if (mw) mw.call(this, t); P.moveAliens(t); }; }

  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 2, name: 'THE WELCOME COURT, THE CLAY WALL & THE GATE',
    brief: 'A round clay court with a stone circle for talking, a low clay wall on each side of a welcome gate, a lane running east towards the Parts Works, warm lanterns, and the first people of Ocknog waiting at the gate.',
    types: {
      COURT: { code: 'SF', name: 'THE WELCOME COURT', col: '#c4a478', w: 220, d: 220, h: 2 },
      LANE:  { code: 'SF', name: 'THE LANE',          col: '#a88a62', w: 140, d: 30, h: 1 },
      GATE:  { code: 'SY', name: 'THE WELCOME GATE',  col: '#c08c5c', w: 16, d: 40, h: 22 },
      WALL:  { code: 'SY', name: 'CLAY WALL',         col: '#a06c44', w: 8, d: 80, h: 8 },
      LAMP:  { code: 'HP', name: 'LANTERN',           col: '#f2c41a', w: 3, d: 3, h: 20 },
    },
    order: ['COURT', 'LANE', 'GATE', 'WALL', 'LAMP'],
    at: { COURT: [[HX, HZ]], LANE: [[HX + 190, HZ]], GATE: [[HX + 118, HZ]], WALL: [[HX + 118, HZ - 62], [HX + 118, HZ + 62]],
      LAMP: [[HX + 95, HZ - 30], [HX + 95, HZ + 30], [HX + 155, HZ - 24], [HX + 155, HZ + 24], [HX + 225, HZ - 24], [HX + 225, HZ + 24]] },
    eye: [HX + 260, (window.__HOUSE.Y || -85) + 190, HZ + 330],
    stats(api, c) { return [['THE WELCOME COURT', c('COURT') ? 'LAID' : 'NOT YET'], ['THE LANE', c('LANE') ? 'OPEN' : 'NOT YET'], ['THE GATE', c('GATE') ? 'HUNG' : 'NOT YET'], ['CLAY WALLS', c('WALL') + ' / 2'], ['LANTERNS', c('LAMP') + ' / 6']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, H = P.pw(api), O = P.ok(api);
      if (type === 'COURT') {
        add(new T.CylinderGeometry(110, 111, 2.2, 48), O.dust, 0, 1.1, 0, false);
        for (const r of [28, 66, 104]) add(new T.TorusGeometry(r, 0.4, 4, 64), O.dust2, 0, 2.25, 0, false).rotation.x = Math.PI / 2;
        // the stone circle for talking, with the sun of Unity and the star of Ocknog laid in the middle
        add(new T.CylinderGeometry(14, 14.6, 1.4, 32), O.stone, 0, 2.6, 0, false); add(new T.TorusGeometry(10, 0.5, 6, 40), O.brass, 0, 3.4, 0, false).rotation.x = Math.PI / 2;
        for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2; add(new T.BoxGeometry(5, 3.4, 3), O.stone2, Math.cos(a) * 19, 4, Math.sin(a) * 19, false).rotation.y = -a; }
        P.sign(api, g, 'WELCOME · HERE UNITY AND OCKNOG SIT TOGETHER', 40, 3.2, 0, 8, 26, 0, '#4a2c18', '#ffe2a0');
        for (let i = 0; i < 4; i++) P.alien(api, g, -14 + i * 9, 2.2, 48 - (i % 2) * 6, Math.PI, { seed: 2000 + i, mode: i % 2 ? 'idle' : 'wave', scale: 0.95 });
        P.person(g, P.kid(82010), 'idle', 18, 2.2, 56, Math.PI);
      } else if (type === 'LANE') {
        add(new T.BoxGeometry(140, 0.8, 30), O.dust, 0, 0.4, 0, false);
        for (let x = -60; x <= 60; x += 20) add(new T.BoxGeometry(0.8, 0.9, 30), O.dust2, x, 0.5, 0, false);
        for (const s of [-1, 1]) add(new T.BoxGeometry(140, 1.4, 1.2), O.stone2, 0, 0.9, s * 15.6, false);
      } else if (type === 'GATE') {
        for (const s of [-1, 1]) { add(new T.CylinderGeometry(3, 3.6, 20, 12), O.clay, 0, 10, s * 14); add(new T.SphereGeometry(3.4, 12, 8), O.clay2, 0, 20.6, s * 14, false); }
        const arch = add(new T.TorusGeometry(14, 1.6, 8, 24, Math.PI), O.clay2, 0, 18.4, 0); arch.rotation.y = Math.PI / 2;
        add(new T.BoxGeometry(1, 2, 20), O.brass, 0, 26, 0, false);
        for (let i = 0; i < 5; i++) { const c = add(new T.BoxGeometry(0.3, 9, 2.2), O.cloth[i % 5], 0.2, 12, -10 + i * 5, false); }
        P.sign(api, g, 'THE HOUSE OF OCKNOG', 30, 3, 3.6, 31, 0, Math.PI / 2, '#4a2c18', '#ffe2a0');
        P.alien(api, g, -7, 0.5, 6, Math.PI / 2, { seed: 2010, mode: 'wave', scale: 1 }); P.alien(api, g, -7, 0.5, -6, Math.PI / 2, { seed: 2011, scale: 1 });
      } else if (type === 'WALL') {
        add(new T.BoxGeometry(4, 6, 80), O.clay, 0, 3, 0); add(new T.BoxGeometry(5, 1, 80), O.clay2, 0, 6.4, 0, false);
        for (let z = -34; z <= 34; z += 17) add(new T.BoxGeometry(5.4, 7, 2), O.stone2, 0, 3.5, z, false);
      } else if (type === 'LAMP') {
        add(new T.CylinderGeometry(0.4, 0.5, 15, 6), O.dark, 0, 7.5, 0, false); add(new T.SphereGeometry(1.5, 10, 8), O.lamp, 0, 16.2, 0, false); add(new T.ConeGeometry(2, 1.4, 8), O.brass, 0, 18.2, 0, false);
      }
    },
  }));
})();
