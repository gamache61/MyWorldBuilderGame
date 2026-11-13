/* ============================================================
   OCKNOG · BUILD 2 · THE SCIENCE CAMP
   Keep this file in projects/ocknog next to 70-ocknog.html.
   The Unity scientists land on Ocknog, guided by the strangers who proved they are safe. They clear a dusty plateau,
   put up lab domes and flood lamps, and sink soil drills. Also holds the shared helpers: the dust-brown look of Ocknog,
   the poisonous dust clouds, and the people of Ocknog.
   ============================================================ */
(function () {
  const P = window.OKP;
  P.ok = function (api) {
    if (this._ok) return this._ok; const T = api.THREE, std = (c, r = 0.9, m = 0, e = {}) => new T.MeshStandardMaterial({ color: c, roughness: r, metalness: m, ...e });
    return this._ok = {
      dust: std(0x9a8062, 1), dust2: std(0x85694c, 1), crack: std(0x5a4632, 1), stone: std(0xa89880, 0.95), dark: std(0x33383f, 0.7, 0.3),
      steel: std(0xc8ced6, 0.35, 0.75), white: std(0xf4f2ec, 0.55, 0.1), solar: std(0x13294a, 0.25, 0.7), clay: std(0xb88a5a, 0.95), clay2: std(0x9a6c44, 0.95),
      thatch: std(0x8a6a38, 1), stalk: std(0x6a5a30, 1), crop: std(0x4fae44, 0.8), crop2: std(0x7ac24a, 0.8), tank: std(0xdfe6ea, 0.35, 0.5), pipe: std(0x7d8791, 0.5, 0.7),
      glass: new T.MeshStandardMaterial({ color: 0xcfefff, roughness: 0.05, metalness: 0.3, transparent: true, opacity: 0.3, side: T.DoubleSide, depthWrite: false }),
      lamp: new T.MeshBasicMaterial({ color: new T.Color(1.9, 1.6, 0.9), toneMapped: false }), screen: new T.MeshBasicMaterial({ color: new T.Color(0.5, 1.8, 1.4), toneMapped: false }),
      cure: new T.MeshBasicMaterial({ color: new T.Color(0.5, 2.0, 1.6), toneMapped: false }), warn: new T.MeshBasicMaterial({ color: new T.Color(2.4, 0.9, 0.4), toneMapped: false }),
      skin: std(0x86a890, 0.7), skin2: std(0x7b9c8a, 0.7), eye: new T.MeshStandardMaterial({ color: 0x050a0c, roughness: 0.2, metalness: 0.5, emissive: 0x16424a, emissiveIntensity: 0.8 }),
      robes: [0xc8873a, 0x8a5a9a, 0x3a8a8a, 0xb0503a, 0x6a8a3a].map(c => std(c, 0.9, 0, { side: T.DoubleSide })),
    };
  };
  P.gy = (x, z) => window.coaxH(x, z);
  // a being of Ocknog: tall and slender, grey-green skin, a long head, big dark eyes, three-fingered hands, a long robe
  P.aliens = P.aliens || [];
  P.alien = function (api, parent, x, y, z, ry = 0, o = {}) {
    const T = api.THREE, F = P.ok(api), g = new T.Group(); g.position.set(x, y, z); g.rotation.y = ry; g.scale.setScalar(o.scale || 1); g.userData.keep = true; parent.add(g);
    const m = (geo, mat, X, Y, Z) => { const q = new T.Mesh(geo, mat); q.position.set(X, Y, Z); q.castShadow = true; g.add(q); return q; };
    const seed = o.seed || 1, skin = seed % 2 ? F.skin : F.skin2, robe = F.robes[seed % 5];
    m(new T.CylinderGeometry(0.2, 0.44, 1.5, 10, 1, true), robe, 0, 0.95, 0);                    // the long robe
    m(new T.CapsuleGeometry(0.2, 0.6, 4, 8), robe, 0, 1.75, 0);                                   // chest
    m(new T.CylinderGeometry(0.06, 0.08, 0.35, 6), skin, 0, 2.2, 0);                              // neck
    const head = new T.Group(); head.position.set(0, 2.55, 0); g.add(head);
    const sk = new T.Mesh(new T.SphereGeometry(0.3, 14, 10), skin); sk.scale.set(0.85, 1.35, 0.95); sk.castShadow = true; head.add(sk);
    for (const s of [-1, 1]) { const e = new T.Mesh(new T.SphereGeometry(0.1, 10, 8), F.eye); e.scale.set(0.8, 1.7, 0.35); e.position.set(s * 0.13, 0.05, 0.25); e.rotation.z = s * 0.4; head.add(e); }
    const arms = [-1, 1].map(s => { const a = new T.Group(); a.position.set(s * 0.3, 2.0, 0); g.add(a); const up = new T.Mesh(new T.CapsuleGeometry(0.055, 0.8, 3, 6), skin); up.position.y = -0.45; a.add(up); for (let i = 0; i < 3; i++) { const f = new T.Mesh(new T.ConeGeometry(0.02, 0.2, 4), skin); f.position.set((i - 1) * 0.03, -0.95, 0); f.rotation.x = Math.PI; a.add(f); } a.rotation.z = s * 0.12; return a; });
    for (const s of [-1, 1]) m(new T.CylinderGeometry(0.07, 0.06, 0.4, 6), skin, s * 0.12, 0.2, 0);
    if (o.elder) { m(new T.CylinderGeometry(0.03, 0.03, 2.6, 6), F.stone, 0.55, 1.3, 0.2); const orb = m(new T.SphereGeometry(0.12, 8, 6), F.cure, 0.55, 2.7, 0.2); orb.castShadow = false; }
    g.userData.head = head; g.userData.arms = arms; g.userData.mode = o.mode || 'idle'; g.userData.ph = seed * 1.7; g.userData.base = ry;
    P.aliens.push(g); return g;
  };
  // Ocknog: a dusty brown world under a haze of poisonous dust clouds, seen only near the site
  P.world = function (api) {
    if (this._world || !api.placed || !api.placed.length) return; const land = api.placed.find(p => p.piece && p.piece.parent); if (!land) return; this._world = true;
    const T = api.THREE, OK = window.__OK, host = land.piece.parent, y = OK.Y;
    this.shell = new T.Mesh(new T.SphereGeometry(5000, 32, 16), new T.MeshBasicMaterial({ color: new T.Color(0.72, 0.5, 0.3), transparent: true, opacity: 0.5, side: T.BackSide, depthWrite: false, fog: false, toneMapped: false }));
    this.shell.position.set(OK.x, y, OK.z); this.shell.visible = false; this.shell.renderOrder = -1; host.add(this.shell);
    this.clouds = new T.Group(); this.clouds.position.set(OK.x, y, OK.z); this.clouds.visible = false; host.add(this.clouds);
    const cm = new T.MeshBasicMaterial({ color: new T.Color(0.5, 0.52, 0.22), transparent: true, opacity: 0.3, depthWrite: false, fog: false, toneMapped: false }); this.cloudMat = cm;
    let s = 77; const r = () => (s = (s * 16807) % 2147483647) / 2147483647;
    for (let i = 0; i < 22; i++) { const a = r() * 6.28, d = 200 + r() * 1800, c = new T.Mesh(new T.SphereGeometry(180 + r() * 260, 14, 10), cm); c.position.set(Math.cos(a) * d, 380 + r() * 520, Math.sin(a) * d); c.scale.y = 0.45; c.userData.v = 0.6 + r(); c.userData.a = a; c.userData.d = d; this.clouds.add(c); }
    // no forest on Ocknog
    { let root = land.piece; while (root.parent) root = root.parent; const m4 = new T.Matrix4(), v = new T.Vector3(), zero = new T.Matrix4().makeScale(0, 0, 0);
      root.traverse(o => { if (!o.isInstancedMesh || o.count < 3000) return; let hit = false; for (let i = 0; i < o.count; i++) { o.getMatrixAt(i, m4); v.setFromMatrixPosition(m4); if (Math.hypot(v.x - OK.x, v.z - OK.z) < 2500) { o.setMatrixAt(i, zero); hit = true; } } if (hit) o.instanceMatrix.needsUpdate = true; }); }
  };
  P.onTick = function (api, dt, t) {
    P.world(api); const cam = window.__cam, OK = window.__OK;
    if (P.shell && cam) { const near = Math.hypot(cam.position.x - OK.x, cam.position.z - OK.z) < 5200; P.shell.visible = near && !(P.clean >= 1); if (P.clouds) P.clouds.visible = near; }
    if (P.clouds && P.clouds.visible) P.clouds.children.forEach(c => { c.userData.a += dt * 0.004 * c.userData.v; c.position.x = Math.cos(c.userData.a) * c.userData.d; c.position.z = Math.sin(c.userData.a) * c.userData.d; });
    // Ocknog's sky: dusty ochre while the soil is poisoned, clearing to a pale blue when it is mended
    if (window.__coaxSky && cam) { const S = window.__coaxSky, d = Math.hypot(cam.position.x - OK.x, cam.position.z - OK.z), k = Math.max(0, Math.min(1, (9000 - d) / 4000)) * (1 - 0.8 * Math.min(1, P.clean || 0));
      S.sky.setRGB(0.62 + (0.8 - 0.62) * k, 0.76 + (0.58 - 0.76) * k, 0.84 + (0.38 - 0.84) * k); S.fog.color.copy(S.sky); S.fog.near = 3500 - 3100 * k; S.fog.far = 34000 - 28000 * k; }
    // when the soil is mended the haze thins and the poison clouds fade
    if (P.shell && P.clean > 0) { P.shell.material.opacity = 0.5 * (1 - Math.min(1, P.clean)); P.cloudMat.opacity = 0.3 * (1 - Math.min(1, P.clean)); }
    for (const a of P.aliens) {
      const u = a.userData, ph = t + u.ph; if (!a.parent) continue;
      u.head.rotation.y = Math.sin(ph * 0.6) * 0.5; u.head.rotation.z = Math.sin(ph * 0.4) * 0.08;
      if (u.mode === 'wave') { u.arms[1].rotation.z = 2.6 + Math.sin(ph * 5) * 0.35; u.arms[0].rotation.z = -0.12; }
      else if (u.mode === 'cheer') { u.arms[0].rotation.z = -2.7 - Math.sin(ph * 6) * 0.3; u.arms[1].rotation.z = 2.7 + Math.sin(ph * 6) * 0.3; a.position.y = (u.y0 === undefined ? (u.y0 = a.position.y) : u.y0) + Math.abs(Math.sin(ph * 4)) * 0.4; }
      else { u.arms[0].rotation.z = -0.12 + Math.sin(ph * 0.8) * 0.04; u.arms[1].rotation.z = 0.12 - Math.sin(ph * 0.8) * 0.04; }
    }
  };
  const rel = a => a.map(([x, z]) => [1550 + x, z]);
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 2, name: 'THE SCIENCE CAMP',
    brief: 'Guided by the strangers of Ocknog, who have proved they are safe, the Unity scientists land on a dusty plateau and make camp: a cleared floor, three lab domes, flood lamps, and six soil drills to take samples of the poisoned ground.',
    types: {
      FLOOR: { code: 'SF', name: 'THE PLATEAU', col: '#9a8062', w: 460, d: 470, h: 2 },
      DOME: { code: 'SY', name: 'LAB DOME', col: '#f4f2ec', w: 34, d: 34, h: 16 },
      DRILL: { code: 'HP', name: 'SOIL DRILL', col: '#c8ced6', w: 8, d: 8, h: 22 },
      LAMP: { code: 'HP', name: 'FLOOD LAMP', col: '#ffd070', w: 3, d: 3, h: 14 },
    },
    order: ['FLOOR', 'DOME', 'LAMP', 'DRILL'],
    at: {
      FLOOR: rel([[0, 0]]), DOME: rel([[-170, -90], [-170, 90], [-100, 0]]),
      LAMP: rel([[-210, -150], [-210, 150], [-130, -150], [-130, 150], [-60, -60], [-60, 60]]),
      DRILL: rel([[-225, -45], [-225, 0], [-225, 45], [-160, -50], [-160, 50], [-130, -85]]),
    },
    eye: [1550 - 60, P.SY + 120, 260],
    stats(api, c) { return [['THE PLATEAU', c('FLOOR') ? 'CLEARED' : 'NOT YET'], ['LAB DOMES', c('DOME') + ' / 3'], ['FLOOD LAMPS', c('LAMP') + ' / 6'], ['SOIL DRILLS', c('DRILL') + ' / 6']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, H = P.ok(api);
      if (type === 'FLOOR') {
        add(new T.BoxGeometry(460, 0.3, 470), H.dust, 0, 0.15, 0, false);
        let s = 19; const r = () => (s = (s * 16807) % 2147483647) / 2147483647;
        for (let i = 0; i < 70; i++) add(new T.BoxGeometry(2 + r() * 14, 0.06, 0.25), H.crack, (r() - 0.5) * 440, 0.34, (r() - 0.5) * 450, false).rotation.y = r() * 3.14;
        for (let i = 0; i < 60; i++) add(new T.DodecahedronGeometry(0.8 + r() * 2, 0), H.stone, (r() - 0.5) * 440, 0.6, (r() - 0.5) * 450, false);
        for (let x = -224; x <= 224; x += 28) for (const z of [-229, 229]) { add(new T.BoxGeometry(0.4, 3, 0.4), H.steel, x, 1.5, z, false); add(new T.SphereGeometry(0.4, 6, 5), H.warn, x, 3.1, z, false); }
      } else if (type === 'DOME') {
        add(new T.CylinderGeometry(17, 17.5, 1, 28), H.stone, 0, 0.5, 0);
        add(new T.SphereGeometry(15, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2), H.white, 0, 1, 0);
        add(new T.SphereGeometry(15.3, 24, 12, 0, Math.PI * 2, 0.9, 0.5), H.glass, 0, 1, 0, false);
        add(new T.BoxGeometry(6, 6, 4), H.white, 0, 3, 16); add(new T.BoxGeometry(3, 4, 0.4), H.dark, 0, 2.6, 18.2, false);
        add(new T.BoxGeometry(14, 0.4, 5), H.solar, -4, 16.5, 0, false).rotation.z = 0.3;
        P.person(g, P.civ(70100 + k), k % 2 ? 'tablet' : 'idle', 5, 1, 21, Math.PI); P.person(g, P.civ(70120 + k), 'idle', -4, 1, 22, Math.PI);
      } else if (type === 'LAMP') {
        add(new T.CylinderGeometry(0.2, 0.3, 13, 8), H.steel, 0, 6.5, 0, false); add(new T.BoxGeometry(2.6, 1.6, 1.6), H.dark, 0, 13.2, 0, false); add(new T.BoxGeometry(2.3, 1.2, 0.3), H.lamp, 0, 13.2, 0.9, false);
      } else {
        add(new T.CylinderGeometry(3, 3.6, 0.6, 10), H.stone, 0, 0.3, 0);
        for (let i = 0; i < 3; i++) { const a = i / 3 * Math.PI * 2, leg = add(new T.CylinderGeometry(0.15, 0.2, 14, 6), H.steel, Math.cos(a) * 2.2, 7, Math.sin(a) * 2.2, false); leg.rotation.set(Math.sin(a) * 0.22, 0, -Math.cos(a) * 0.22); }
        add(new T.CylinderGeometry(0.3, 0.3, 22, 8), H.steel, 0, 11, 0, false); add(new T.BoxGeometry(3, 2.4, 2.4), H.dark, 0, 18, 0); add(new T.SphereGeometry(0.6, 8, 6), H.warn, 0, 20, 0, false);
        add(new T.CylinderGeometry(0.5, 0.5, 2.2, 8), H.cure, 2.4, 1.6, 0, false);
        P.person(g, P.civ(70200 + k), 'tablet', 5, 0.6, 3, -2);
      }
    },
  }));
})();
