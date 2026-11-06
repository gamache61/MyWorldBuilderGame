/* ============================================================
   KRYOS CITY · shared city plan
   Keep this file in projects/kryoscity next to kryoscity.html.
   It holds the layout of the city on the Kryos plateau and the
   helpers every build file uses. build1.js … build12.js load
   after it.
   ============================================================ */
(function () {
  const TAU = Math.PI * 2;
  const K = window.KRYOS = {};

  // the city centre is the middle of the landing field; districts sit round it
  K.C = { x: 120, z: 0 };
  K.at = (a, r) => [Math.round((K.C.x + Math.cos(a) * r) * 10) / 10, Math.round((K.C.z + Math.sin(a) * r) * 10) / 10];
  K.ground = (api, x, z) => (window.coaxH ? window.coaxH(x, z) : api.DECK_TOP - 0.4);

  // the city plan: a green boulevard runs east and west from the landing field, with
  // white low-rise blocks beside it and glass towers behind; power to the north, skyport
  // beyond it, recycling south-west, farms south-east and the observation spire at the east end
  K.SEG = k => { const e = k < 4, i = k % 4, x0 = e ? 260 + i * 260 : -280 - i * 260; return { x0, x1: x0 + 260, xm: x0 + 130, east: e }; };
  K.POWER = [120, 640]; K.SKYPORT = [120, 1060]; K.RECYCLE = [-450, -700]; K.FARMS = [700, -760]; K.SPIRE = [1250, 0];
  K.DISCS = [[780, 0], [-540, 0]];
  // glass tower spots, worked out once: clear of the boulevard, the districts and the field
  K.towerSpots = (() => {
    const r = (s => () => (s = (s * 16807) % 2147483647) / 2147483647)(4242), out = { n: [], s: [] };
    const keep = [[...K.POWER, 340], [...K.SKYPORT, 260], [...K.RECYCLE, 380], [...K.FARMS, 420], [...K.SPIRE, 180]];
    for (let tries = 0; tries < 6000 && (out.n.length < 18 || out.s.length < 18); tries++) {
      const x = -1150 + r() * 2400, z = (r() < 0.5 ? 1 : -1) * (270 + r() * 900), side = z > 0 ? out.n : out.s;
      if (side.length >= 18 || Math.hypot(x - 120, z) > 1180 || (Math.abs(x - 120) < 280 && Math.abs(z) < 1150)) continue;
      if (keep.some(([kx, kz, kr]) => Math.hypot(x - kx, z - kz) < kr)) continue;
      if ([...out.n, ...out.s].some(t => Math.hypot(t.x - x, t.z - z) < 95)) continue;
      const mid = Math.exp(-Math.pow((x - 700) / 700, 2)) * Math.exp(-Math.abs(z) / 700);
      side.push({ x: Math.round(x), z: Math.round(z), h: Math.round(130 + r() * 130 + mid * 300), r: Math.round(18 + r() * 12), kind: (r() * 4) | 0 });
    }
    return out;
  })();

  K.canvas = (THREE, w, h, draw, rx = 1, ry = 1) => {
    const c = document.createElement('canvas'); c.width = w; c.height = h; draw(c.getContext('2d'), w, h);
    const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(rx, ry); t.anisotropy = 4; return t;
  };

  /* ---------- shared materials and shapes (made once) ---------- */
  let M = null;
  K.kit = (THREE) => {
    if (M) return M;
    const std = (c, r = 0.6, m = 0.2, extra = {}) => new THREE.MeshStandardMaterial({ color: c, roughness: r, metalness: m, ...extra });
    const winTex = K.canvas(THREE, 256, 512, (g, w, h) => {
      g.fillStyle = '#dfe7ee'; g.fillRect(0, 0, w, h);
      for (let y = 6; y < h; y += 16) { g.fillStyle = '#1d2a36'; g.fillRect(0, y, w, 9); }
      g.fillStyle = 'rgba(255,255,255,.5)'; for (let x = 0; x < w; x += 32) g.fillRect(x, 0, 2, h);
    });
    const winGlow = K.canvas(THREE, 256, 512, (g, w, h) => {
      g.fillStyle = '#000'; g.fillRect(0, 0, w, h);
      for (let y = 6; y < h; y += 16) for (let x = 0; x < w; x += 8) if (Math.random() < 0.38) { g.fillStyle = Math.random() < 0.8 ? '#ffe2b0' : '#a8e8ff'; g.fillRect(x + 1, y + 1, 6, 7); }
    });
    const tower = (rx = 1, ry = 1) => { const a = winTex.clone(), b = winGlow.clone(); a.needsUpdate = b.needsUpdate = true; a.repeat.set(rx, ry); b.repeat.set(rx, ry); return new THREE.MeshStandardMaterial({ map: a, emissive: 0xffffff, emissiveMap: b, emissiveIntensity: 0.35, roughness: 0.25, metalness: 0.55 }); };
    const solar = K.canvas(THREE, 128, 128, (g, w, h) => { g.fillStyle = '#0e2340'; g.fillRect(0, 0, w, h); g.strokeStyle = '#4f7fb0'; g.lineWidth = 2; for (let i = 0; i <= w; i += 16) { g.beginPath(); g.moveTo(i, 0); g.lineTo(i, h); g.stroke(); g.beginPath(); g.moveTo(0, i); g.lineTo(w, i); g.stroke(); } });
    const pave = K.canvas(THREE, 256, 256, (g, w, h) => { g.fillStyle = '#c9c6bd'; g.fillRect(0, 0, w, h); g.strokeStyle = '#aaa69b'; g.lineWidth = 2; for (let i = 0; i <= w; i += 32) { g.beginPath(); g.moveTo(i, 0); g.lineTo(i, h); g.stroke(); g.beginPath(); g.moveTo(0, i); g.lineTo(w, i); g.stroke(); } });
    M = {
      std, tower,
      white: std(0xeef2f5, 0.35, 0.3), pearl: std(0xdfe8ee, 0.2, 0.6), steel: std(0x9aa3ad, 0.3, 0.85), dark: std(0x232830, 0.45, 0.7),
      glass: new THREE.MeshStandardMaterial({ color: 0x9fd8ff, roughness: 0.05, metalness: 0.4, transparent: true, opacity: 0.35, side: THREE.DoubleSide, depthWrite: false }),
      glassGreen: new THREE.MeshStandardMaterial({ color: 0xbff0d0, roughness: 0.05, metalness: 0.3, transparent: true, opacity: 0.4, side: THREE.DoubleSide, depthWrite: false }),
      glow: new THREE.MeshBasicMaterial({ color: new THREE.Color(0.45, 1.6, 1.3) }),
      glowBlue: new THREE.MeshBasicMaterial({ color: new THREE.Color(0.5, 1.1, 2.2) }),
      glowWarm: new THREE.MeshBasicMaterial({ color: new THREE.Color(2.2, 1.6, 0.8) }),
      leaf: new THREE.MeshStandardMaterial({ color: 0x3f8a3a, roughness: 0.9, flatShading: true }),
      leafLight: new THREE.MeshStandardMaterial({ color: 0x6aa84a, roughness: 0.9, flatShading: true }),
      crops: [0x5f9e3a, 0x8fb04a, 0x3f7a2c, 0xa8b45a].map(c => std(c, 0.95, 0)),
      water: std(0x3a86b0, 0.08, 0.4),
      solar: new THREE.MeshStandardMaterial({ map: solar, roughness: 0.25, metalness: 0.7 }),
      pave: new THREE.MeshStandardMaterial({ map: pave, roughness: 0.9 }),
      grass: std(0x5a9a3e, 0.95, 0),
      core: new THREE.MeshBasicMaterial({ color: new THREE.Color(0.3, 0.5, 0.6) }),
    };
    M.pave.map.repeat.set(8, 8);
    return M;
  };

  // seeded random numbers so every player gets the same city
  K.rng = (seed) => { let s = (seed * 7919 + 13) % 2147483647 || 1; return () => (s = (s * 16807) % 2147483647) / 2147483647; };

  /* ---------- the Kryos look: blue glass towers, white low-rise, green everywhere ---------- */
  let G = null;
  K.style = (THREE) => {
    if (G) return G;
    const glassTex = (hue, seed) => { const r = K.rng(seed); return K.canvas(THREE, 256, 512, (g, w, h) => {
      g.fillStyle = `hsl(${hue},48%,56%)`; g.fillRect(0, 0, w, h);
      for (let y = 0; y < h; y += 12) { g.fillStyle = 'rgba(20,40,70,.35)'; g.fillRect(0, y, w, 2); }
      for (let x = 0; x < w; x += 16) { g.fillStyle = 'rgba(230,240,255,.35)'; g.fillRect(x, 0, 1.5, h); }
      for (let i = 0; i < 300; i++) { g.fillStyle = `rgba(255,255,255,${r() * 0.12})`; g.fillRect(((r() * w / 16) | 0) * 16, ((r() * h / 12) | 0) * 12, 16, 12); }
    }); };
    const whiteTex = K.canvas(THREE, 256, 256, (g, w, h) => { g.fillStyle = '#eef1f4'; g.fillRect(0, 0, w, h); for (let y = 10; y < h; y += 32) { g.fillStyle = '#5b7891'; g.fillRect(0, y, w, 14); g.fillStyle = 'rgba(255,255,255,.5)'; for (let x = 0; x < w; x += 24) g.fillRect(x, y, 2, 14); } });
    const paveTex = K.canvas(THREE, 256, 256, (g, w, h) => { g.fillStyle = '#cfcac0'; g.fillRect(0, 0, w, h); g.strokeStyle = '#b5afa3'; g.lineWidth = 2; for (let i = 0; i <= w; i += 32) { g.beginPath(); g.moveTo(i, 0); g.lineTo(i, h); g.stroke(); g.beginPath(); g.moveTo(0, i); g.lineTo(w, i); g.stroke(); } });
    const plain = (c, r = 0.5, m = 0.1) => new THREE.MeshStandardMaterial({ color: c, roughness: r, metalness: m });
    G = {
      glassTex: [205, 212, 198, 220].map((h, i) => glassTex(h, 40 + i)),
      glass(i, rx, ry) { const t = this.glassTex[i % 4].clone(); t.needsUpdate = true; t.repeat.set(rx, ry); return new THREE.MeshStandardMaterial({ map: t, metalness: 0.75, roughness: 0.12, envMapIntensity: 1.3 }); },
      whiteTex, white(rx, ry) { const t = whiteTex.clone(); t.needsUpdate = true; t.repeat.set(rx, ry); return new THREE.MeshStandardMaterial({ map: t, roughness: 0.35, metalness: 0.2 }); },
      paveTex, pave(rx, ry) { const t = paveTex.clone(); t.needsUpdate = true; t.repeat.set(rx, ry); return new THREE.MeshStandardMaterial({ map: t, roughness: 0.9 }); },
      trim: new THREE.MeshStandardMaterial({ color: 0xf4f6f8, roughness: 0.25, metalness: 0.3 }),
      concrete: plain(0xd7d8d6), trunk: plain(0x5a4030, 0.9, 0),
      grass: new THREE.MeshStandardMaterial({ color: 0x5f9a42, roughness: 1 }),
      leaf: new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9, flatShading: true }),
      water: new THREE.MeshStandardMaterial({ color: 0x5fa6c8, roughness: 0.05, metalness: 0.5 }),
      clear: new THREE.MeshStandardMaterial({ color: 0xbfe4ff, roughness: 0.05, metalness: 0.6, transparent: true, opacity: 0.4, depthWrite: false }),
      pearl: new THREE.MeshStandardMaterial({ color: 0xf2f5f8, metalness: 0.5, roughness: 0.15 }),
      rose: new THREE.MeshStandardMaterial({ color: 0xd88aa0, metalness: 0.4, roughness: 0.25 }),
      dark: new THREE.MeshStandardMaterial({ color: 0x1a2a3a, metalness: 0.8, roughness: 0.1 }),
      crops: [0x6aa84a, 0x8fbf4a, 0x4f8f3a].map(c => plain(c, 1, 0)),
      people: new THREE.MeshStandardMaterial({ roughness: 0.7 }),
      ico: new THREE.IcosahedronGeometry(1, 1), cyl: new THREE.CylinderGeometry(0.35, 0.5, 1, 5),
    };
    return G;
  };
  // add a mesh to a group
  K.add = (THREE, g, geo, mat, x = 0, y = 0, z = 0) => { const m = new THREE.Mesh(geo, mat); m.position.set(x, y, z); m.castShadow = m.receiveShadow = true; g.add(m); return m; };
  // round-crowned trees at the given [x, z] spots (group coordinates)
  K.trees = (THREE, g, pts, seed = 1, size = 1) => {
    const S = K.style(THREE), r = K.rng(seed), n = pts.length; if (!n) return;
    const crown = new THREE.InstancedMesh(S.ico, S.leaf, n), trunk = new THREE.InstancedMesh(S.cyl, S.trunk, n);
    crown.castShadow = trunk.castShadow = true; crown.receiveShadow = true;
    const m = new THREE.Matrix4(), q = new THREE.Quaternion(), c = new THREE.Color(), v = new THREE.Vector3(), sc = new THREE.Vector3();
    pts.forEach(([x, z, y = 0], i) => {
      const s = (4 + r() * 3) * size;
      m.compose(v.set(x, y + s * 1.5 + 2.5 * size, z), q, sc.set(s, s * 1.05, s)); crown.setMatrixAt(i, m); crown.setColorAt(i, c.setHSL(0.27 + r() * 0.06, 0.5, 0.28 + r() * 0.12));
      m.compose(v.set(x, y + 2.5 * size, z), q, sc.set(size, 5 * size, size)); trunk.setMatrixAt(i, m);
    });
    g.add(crown, trunk);
  };
  // people strolling (group coordinates): real walking people where the game allows, simple figures for the rest
  K.people = (THREE, g, pts, seed = 1) => {
    if (window.WB_CITY_PEOPLE && pts.length) {
      const rest = [], every = Math.max(1, Math.ceil(pts.length / 14));   // about 14 real walkers per group of people
      pts.forEach(([x, z, y = 0], i) => { if (i % every || !window.WB_CITY_PEOPLE.spawn(g, x, y, z, seed * 131 + i)) rest.push([x, z, y]); });
      pts = rest;
    }
    const S = K.style(THREE), r = K.rng(seed), n = pts.length; if (!n) return;
    const p = new THREE.InstancedMesh(new THREE.CapsuleGeometry(0.32, 1.1, 3, 6), S.people, n), m = new THREE.Matrix4(), c = new THREE.Color();
    const cols = [0x2a3a5a, 0xd04a3a, 0xe8e2d8, 0x3a6a8a, 0x2a2a2a, 0xd9a21b, 0x5a8a4a];
    pts.forEach(([x, z, y = 0], i) => { m.makeTranslation(x, y + 0.9, z); p.setMatrixAt(i, m); p.setColorAt(i, c.setHex(cols[(r() * cols.length) | 0])); });
    g.add(p);
  };
  // a white low-rise building with a roof garden (centred on x, z)
  K.lowrise = (THREE, g, x, z, w, d, h, seed = 1) => {
    const S = K.style(THREE), r = K.rng(seed);
    K.add(THREE, g, new THREE.BoxGeometry(w, h, d), S.white(Math.max(1, Math.round(w / 40)), Math.max(1, Math.round(h / 20))), x, h / 2, z);
    K.add(THREE, g, new THREE.BoxGeometry(w + 1, 1, d + 1), S.trim, x, h, z);
    K.add(THREE, g, new THREE.BoxGeometry(w * 0.9, 0.8, d * 0.9), S.grass, x, h + 0.9, z);
    const pts = []; for (let i = 0; i < Math.max(2, (w * d) / 260); i++) pts.push([x + (r() - 0.5) * w * 0.75, z + (r() - 0.5) * d * 0.75, h + 1.2]);
    K.trees(THREE, g, pts, seed + 5, 0.5);
  };
  // a blue glass skyscraper: 0 round with a dome crown · 1 square with setbacks · 2 slim with a point · 3 twisting oval
  K.glassTower = (THREE, g, x, z, h, r, kind, seed = 1) => {
    const S = K.style(THREE), mat = S.glass(seed, Math.max(1, Math.round(r / 7)), Math.max(1, Math.round(h / 45))), add = (geo, m, X, Y, Z) => K.add(THREE, g, geo, m, X, Y, Z);
    if (kind === 0) {
      add(new THREE.CylinderGeometry(r * 0.92, r, h, 36), mat, x, h / 2, z);
      add(new THREE.SphereGeometry(r * 0.92, 36, 12, 0, Math.PI * 2, 0, Math.PI / 2), mat, x, h, z).scale.y = 0.45;
    } else if (kind === 1) {
      let y = 0, w = r * 1.8;
      for (const f of [0.55, 0.3, 0.15]) { const hh = h * f; add(new THREE.BoxGeometry(w, hh, w), mat, x, y + hh / 2, z); add(new THREE.BoxGeometry(w + 0.6, 1, w + 0.6), S.trim, x, y + hh, z); y += hh; w *= 0.78; }
      add(new THREE.CylinderGeometry(0.4, 0.8, h * 0.12, 6), S.trim, x, y + h * 0.06, z);
    } else if (kind === 2) {
      add(new THREE.CylinderGeometry(r * 0.55, r, h, 6), mat, x, h / 2, z);
      add(new THREE.ConeGeometry(r * 0.55, h * 0.18, 6), mat, x, h + h * 0.09, z);
    } else {
      for (let i = 0; i < 8; i++) { const hh = h / 8, m = add(new THREE.CylinderGeometry(r * (1 - i * 0.04), r * (1 - i * 0.03), hh, 24), mat, x, i * hh + hh / 2, z); m.scale.z = 0.62; m.rotation.y = i * 0.12; }
    }
    add(new THREE.BoxGeometry(r * 2.6, 6, r * 2.6), S.trim, x, 3, z);
    add(new THREE.BoxGeometry(r * 3.4, 0.6, r * 3.4), S.pave(2, 2), x, 0.3, z);
  };

  // a sleek futuristic tower: tapered body with window bands, glowing crown and a sky-dock ring
  K.tower = (THREE, M, g, x, z, h, r, o = {}) => {
    const body = new THREE.Mesh(new THREE.CylinderGeometry(r * (o.top || 0.72), r, h, o.sides || 6), M.tower(Math.max(1, Math.round(r / 6)), Math.max(1, Math.round(h / 40))));
    body.position.set(x, h / 2, z); g.add(body);
    const base = new THREE.Mesh(new THREE.CylinderGeometry(r * 1.25, r * 1.35, 6, o.sides || 6), M.white); base.position.set(x, 3, z); g.add(base);
    const crown = new THREE.Mesh(new THREE.ConeGeometry(r * (o.top || 0.72), r * 2.2, o.sides || 6), M.pearl); crown.position.set(x, h + r * 1.1, z); g.add(crown);
    const band = new THREE.Mesh(new THREE.CylinderGeometry(r * (o.top || 0.72) * 1.04, r * (o.top || 0.72) * 1.04, 1.5, o.sides || 6, 1, true), M.glow); band.position.set(x, h - 2, z); g.add(band);
    if (o.dock !== false) {
      const dy = h * (o.dockAt || 0.62), rr = r * 1.9;
      const ring = new THREE.Mesh(new THREE.CylinderGeometry(rr, rr * 0.9, 3, 24), M.white); ring.position.set(x, dy, z); g.add(ring);
      const lip = new THREE.Mesh(new THREE.TorusGeometry(rr, 0.5, 6, 32).rotateX(Math.PI / 2), M.glowBlue); lip.position.set(x, dy + 1.6, z); g.add(lip);
    }
    return body;
  };

  // a small passenger spacecraft: smooth lifting body, canopy, twin thrusters (nose toward +z)
  K.craftCols = [0xeef2f5, 0x2f6690, 0xd9a21b, 0x9a2a22, 0x3a7d44, 0x7b4fa0];
  K.craft = (THREE, M, s = 1, v = 0) => {
    const c = new THREE.Group(), paint = M['paint' + v % 6] || (M['paint' + v % 6] = M.std(K.craftCols[v % 6], 0.3, 0.5));
    const add = (geo, mat, x, y, z) => { const m = new THREE.Mesh(geo, mat); m.position.set(x, y, z); c.add(m); return m; };
    const body = add(new THREE.SphereGeometry(3, 20, 12), M.white, 0, 0, 0); body.scale.set(1.15, 0.55, 2.6);
    const stripe = add(new THREE.SphereGeometry(3.02, 20, 12, 0, Math.PI * 2, Math.PI * 0.42, Math.PI * 0.16), paint, 0, 0, 0); stripe.scale.set(1.15, 0.55, 2.6);
    const can = add(new THREE.SphereGeometry(1.9, 16, 10, 0, Math.PI * 2, 0, Math.PI / 2), M.glass, 0, 1.1, 2.2); can.scale.set(1, 0.7, 1.8);
    for (const sx of [-1, 1]) {
      const pod = add(new THREE.CylinderGeometry(0.9, 1.1, 4.5, 12).rotateX(Math.PI / 2), M.pearl, sx * 3.6, -0.2, -2.4);
      const fin = add(new THREE.BoxGeometry(2.6, 0.3, 3), paint, sx * 2.4, -0.1, -2.2); fin.rotation.z = sx * -0.15;
      add(new THREE.CircleGeometry(0.8, 12).rotateY(Math.PI), M.glowBlue, sx * 3.6, -0.2, -4.66);
    }
    c.scale.setScalar(s); return c;
  };

  /* ---------- a city build made of fixed parts that are beamed into place ---------- */
  // def.parts = { TYPE: { name, code, col, h, count, at(k) -> [x, z], y?(k), needs?(api, k, cnt), make(g, k, M, THREE, api, sl, B) } }
  // def.trips = [{ name, parts: ['TYPE', …] }, { name, parts: [...] }]   (the last trip ends with L)
  K.cityBuild = (def) => {
    const types = {};
    for (const [t, P] of Object.entries(def.parts)) types[t] = { code: P.code || 'SF', name: P.name, col: P.col || '#6c757d', fixed: true, h: P.h || 30, fx: P.fx || Math.max(20, P.h || 30) };
    const trips = def.trips.map((T, i) => {
      const kits = {}; for (const t of T.parts) kits[t] = def.parts[t].count;
      return { name: T.name, kits, finish: i === def.trips.length - 1 ? 'custom' : 'unload' };
    });
    // an optional first trip of loose parts placed with the crane (deck tiles, the transporter …)
    if (def.pre) { trips.unshift({ name: def.pre.name, kits: def.pre.kits, finish: 'unload' }); Object.assign(types, def.pre.types); }
    const LAST = trips.length - 1;
    return {
      id: def.id, name: def.name, brief: def.brief, kryos: true, types, trips,
      ...(def.pre ? { grid: def.pre.grid, stationTX: def.pre.stationTX } : {}),
      finishLabel: def.finishLabel, flags: def.flags || [],
      setup(api) {
        const V = (x, y, z) => new api.THREE.Vector3(x, y, z), slots = [], self = this;
        const cnt = t => api.placed.filter(p => p.b === def.id && p.type === t).length;
        for (const T of def.trips) for (const t of T.parts) {
          const P = def.parts[t];
          for (let k = 0; k < P.count; k++) {
            const [x, z] = P.at(k), y = K.ground(api, x, z) + (P.y ? P.y(k) : 0), h = P.h || 30;
            slots.push({ type: t, k, x, y, z, fx: V(0, Math.min(h, 200) / 2, 0),
              eye: P.eye ? P.eye(k, V) : V(140 + h * 0.9, 50 + h * 0.6, 180 + h * 1.1), look: V(0, Math.min(h, 300) * 0.4, 0),
              needs: P.needs ? () => P.needs(api, k, cnt) : null });
          }
        }
        this.slots = slots; this.suggest = def.pre ? def.pre.suggest || [] : []; this.zones = def.pre ? def.pre.zones || [] : [];
        const fc = def.finishCam || [def.focus || [K.C.x, K.C.z], 900];
        const [fx, fz] = fc[0], fy = K.ground(api, fx, fz);
        this.finishCam = [V(fx + fc[1] * 0.75, fy + fc[1] * 0.45, fz + fc[1] * 0.85), V(fx, fy + (def.lookUp || 60), fz)];
      },
      rule(type, x, z, rot, api) {
        const [w, d] = api.footprint(type, rot);
        if (type.startsWith('SUPPLY') && x > 58 && x < 182 && Math.abs(z) - d / 2 < 182) return 'KEEP SUPPLY CRATES OFF THE LANDING PAD';
        if (def.pre && def.pre.rule) return def.pre.rule(type, x, z, rot, api);
        return null;
      },
      ready(api) {
        const built = api.placed.filter(p => p.b === def.id && p.s !== undefined).length;
        if (api.trip === LAST && built < this.slots.length) return { ok: false, msg: def.name + ' ' + built + ' / ' + this.slots.length + ' PARTS' };
        return { ok: true, msg: 'READY — PRESS L TO ' + def.finishLabel };
      },
      stats(api) {
        const c = t => api.placed.filter(p => p.b === def.id && p.type === t).length;
        const rows = Object.entries(def.parts).map(([t, P]) => [P.name + 'S', c(t) + ' / ' + P.count]);
        if (def.status) rows.push([def.status[0], def.flags.every(f => api.flag(f)) ? def.status[1] : 'OFFLINE']);
        return rows;
      },
      finishStart() { this._go = 0; this._flash = false; },
      finishUpdate(api, dt) {
        this._go = (this._go || 0) + dt; this._level = Math.min(1, this._go / 6);
        if (this._go > 4 && !this._flash) { this._flash = true; for (const sl of this.slots.slice(0, 8)) api.sparkle(new api.THREE.Vector3(sl.x, sl.y + 30, sl.z), 6); }
        if (this._go >= 8) { for (const f of def.flags || []) api.setFlag(f, true); this._level = 1; return true; }
        return false;
      },
      tick(api, dt, t) {
        if (!def.tick || !this._mats) return;
        def.tick.call(this, api, dt, t, (def.flags || []).every(f => api.flag(f)) ? 1 : (this._level || 0));
      },
      make(type, api, p) {
        const THREE = api.THREE, MM = K.kit(THREE); this._mats = this._mats || {};
        if (def.pre && def.pre.types[type]) return def.pre.make(type, api, p);
        const g = new THREE.Group(), sl = this.slots[p.s];
        def.parts[type].make(g, sl.k, MM, THREE, api, sl, this);
        return g;
      },
    };
  };
})();
