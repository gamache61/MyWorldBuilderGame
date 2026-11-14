/* ============================================================
   THE HUNGRY SHIPS · BUILD 1 · THE ATTACK ON KRYOS
   Kryos city all round, with every project already built in Kryos. Keep this file in projects/hungryships.
   ============================================================ */

/* ---------- shared by every Elders Garden build (one copy, kept on window) ---------- */
window.HSP = window.HSP || {
  // this chapter is built in the valley below the Seed Vault: every build position is moved by OFF
  OFF: [0, 0],
  SY: -28,
  _t: -1, people: [],
  // a flat valley floor below the vault
  SV: {},
  KP: [270, -120],

  ground(api, x, z) { return window.coaxH ? window.coaxH(x, z) : api.DECK_TOP - 0.4; },
  mats(api) {
    if (this._m) return this._m;
    const { THREE } = api, std = (c, r = 0.7, m = 0, e = {}) => new THREE.MeshStandardMaterial({ color: c, roughness: r, metalness: m, ...e });
    const rowTex = api.canvasTex(256, 256, (g, w, h) => { g.fillStyle = '#5a3e28'; g.fillRect(0, 0, w, h); for (let i = 0; i < 4000; i++) { g.fillStyle = Math.random() < 0.5 ? 'rgba(40,25,15,.35)' : 'rgba(120,90,60,.25)'; g.fillRect(Math.random() * w, Math.random() * h, 2, 2); } for (let y = 0; y < h; y += 16) { g.fillStyle = 'rgba(30,20,10,.45)'; g.fillRect(0, y, w, 4); } });
    rowTex.repeat.set(4, 4);
    return this._m = {
      soil: new THREE.MeshStandardMaterial({ map: rowTex, roughness: 1 }),
      crops: [0x5f9e3a, 0xc8b04a, 0x3f7a2c, 0x8fb04a, 0x6aa84a].map(c => std(c, 0.95)),
      flower: std(0xe8c13a, 0.8), berry: std(0xb03a2e, 0.7),
      white: std(0xf2f4f6, 0.4, 0.15), stone: std(0xd8d2c6, 0.85), stoneDark: std(0xa9a294, 0.9),
      roof: std(0x5f9a42, 1), steel: std(0x9aa3ad, 0.35, 0.85), dark: std(0x2a2f38, 0.5, 0.5), gold: std(0xd9b44a, 0.3, 0.85),
      water: std(0x3f86b0, 0.08, 0.45), wood: std(0x7a5a3a, 0.8),
      glass: new THREE.MeshStandardMaterial({ color: 0xcfefff, roughness: 0.05, metalness: 0.3, transparent: true, opacity: 0.28, side: THREE.DoubleSide, depthWrite: false }),
      solar: std(0x13294a, 0.25, 0.7),
      glow: new THREE.MeshStandardMaterial({ color: 0x9fffd8, emissive: 0x5fe8b0, emissiveIntensity: 0.9, roughness: 0.4 }),
      eye: new THREE.MeshBasicMaterial({ color: new THREE.Color(0.5, 1.6, 1.1), toneMapped: false }),
      podGlow: new THREE.MeshBasicMaterial({ color: new THREE.Color(1.6, 1.3, 0.6), toneMapped: false }),
      ore: std(0x8a5a3a, 0.9, 0.2), oreDark: std(0x4a3a30, 1), panel: std(0xd6dadf, 0.45, 0.35), yellow: std(0xe8c13a, 0.5, 0.3),
      hole: new THREE.MeshBasicMaterial({ color: 0x020203 }), armor: std(0x2a2e35, 0.45, 0.7), hull: std(0x3a3f48, 0.4, 0.75), deck: std(0x5a5e64, 0.85, 0.3),
      engine: new THREE.MeshBasicMaterial({ color: new THREE.Color(0.6, 1.2, 2.6), toneMapped: false }),
      shaftWall: std(0x2a2826, 1), lamp: new THREE.MeshBasicMaterial({ color: new THREE.Color(1.8, 1.4, 0.8), toneMapped: false }),
    };
  },
  // speed: merge the still meshes of a piece into one mesh per material (meshes marked userData.keep stay separate)
  bake(api, g) {
    const { THREE } = api, buckets = new Map(), dead = [];
    g.updateMatrixWorld(true);
    const kept = o => { for (let p = o; p && p !== g; p = p.parent) if (p.userData.keep) return true; return false; };
    g.traverse(m => {
      if (!m.isMesh || m.isInstancedMesh || kept(m) || Array.isArray(m.material)) return;
      const geo = (m.geometry.index ? m.geometry.toNonIndexed() : m.geometry.clone());
      for (const n of Object.keys(geo.attributes)) if (n !== 'position' && n !== 'normal' && n !== 'uv') geo.deleteAttribute(n);
      if (!geo.attributes.normal) geo.computeVertexNormals();
      if (!geo.attributes.uv) geo.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(geo.attributes.position.count * 2), 2));
      geo.applyMatrix4(m.matrixWorld);
      const key = m.material.uuid + (m.castShadow ? 's' : '');
      if (!buckets.has(key)) buckets.set(key, { mat: m.material, cast: m.castShadow, geos: [] });
      buckets.get(key).geos.push(geo); dead.push(m);
    });
    for (const m of dead) m.parent.remove(m);
    for (const { mat, cast, geos } of buckets.values()) {
      let n = 0; for (const q of geos) n += q.attributes.position.count;
      const pos = new Float32Array(n * 3), nor = new Float32Array(n * 3), uv = new Float32Array(n * 2); let o = 0;
      for (const q of geos) { pos.set(q.attributes.position.array, o * 3); nor.set(q.attributes.normal.array, o * 3); uv.set(q.attributes.uv.array, o * 2); o += q.attributes.position.count; q.dispose(); }
      const bg = new THREE.BufferGeometry();
      bg.setAttribute('position', new THREE.BufferAttribute(pos, 3)); bg.setAttribute('normal', new THREE.BufferAttribute(nor, 3)); bg.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
      bg.computeBoundingSphere();
      const mm = new THREE.Mesh(bg, mat); mm.castShadow = cast; mm.receiveShadow = true; g.add(mm);
    }
    return g;
  },
  // a Guests\u2019 Quarter build made of fixed parts beamed in by the transporter.
  // def = { id, name, brief, types: { T: { code, name, col, w, d, h } }, at: { T: [[x, z], …] }, order: ['T', …],
  //         make(type, k, g, add, F, api, sl), stats(api, c), eye?, finish?: { label, cam: [[x,y,z],[x,y,z]], start(api), update(api, dt, k) -> done } }
  build(def) {
    const PLAY = this, OFF = (this.OFF || [0, 0]).slice();
    const types = {}; for (const [t, T] of Object.entries(def.types)) types[t] = { fixed: true, fx: 3, ...T };
    const kits = {}; for (const t of def.order) kits[t] = def.at[t].length;
    const B = {
      id: def.id, name: def.name, brief: def.brief, types,
      trips: [{ name: def.name, kits, finish: def.finish ? 'custom' : 'unload' }],
      finishLabel: def.finish ? def.finish.label : undefined,
      setup(api) {
        const V = (x, y, z) => new api.THREE.Vector3(x, y, z), E = def.eye || [-170, 120, 230];
        this.slots = [];
        for (const t of def.order) def.at[t].forEach(([ax, az], k) => {
          const x = ax + OFF[0], z = az + OFF[1];
          const gy0 = PLAY.ground(api, x, z); this.slots.push({ type: t, k, x, z, y: gy0, fx: V(0, Math.min(types[t].h || 6, 30) / 2, 0), look: V(0, 6, 0), eye: V(E[0] + OFF[0] - x, E[1] - gy0, E[2] + OFF[1] - z) });   // the camera spot is an offset from the part: E is a place near the build, so the follow camera stays close and above the ground
        });
        if (def.finish) this.finishCam = def.finish.cam.map(c => V(c[0] + OFF[0], c[1], c[2] + OFF[1]));
      },
      rule(type, x, z, rot, api) {
        const [, d] = api.footprint(type, rot);
        if (type.startsWith('SUPPLY') && Math.abs(z) - d / 2 < 182) return 'STACK SUPPLY CRATES AT THE ENDS OF THE FIELD, OFF THE LANDING PAD';
        return null;
      },
      stats(api) { const c = t => api.count(t); return def.stats ? def.stats(api, c) : def.order.map(t => [types[t].name + 'S', c(t) + ' / ' + def.at[t].length]); },
      make(type, api, p) {
        const { THREE } = api, F = PLAY.mats(api), sl = this.slots[p.s]; this._mats = this._mats || F;
        const g = new THREE.Group();
        const add = (geo, mat, x = 0, y = 0, z = 0, shadow = true, parent = g) => { const m = new THREE.Mesh(geo, mat); m.position.set(x, y, z); m.castShadow = shadow; m.receiveShadow = true; parent.add(m); return m; };
        try { def.make(type, sl.k, g, add, F, api, sl); } catch (e) { console.warn('homeward two part', type, e); }
        return PLAY.bake(api, g);
      },
      tick(api, dt, t) { PLAY.update(api, dt, t); if (def.tick) def.tick(api, dt, t); },
    };
    if (def.ready) B.ready = def.ready;
    if (def.finish) {
      B.finishStart = function (api) { this._f = 0; def.finish.start && def.finish.start(api); };
      B.finishUpdate = function (api, dt) { this._f += dt; return def.finish.update(api, dt, this._f); };
    }
    return B;
  },
  // workers: queued while the game starts, then made with the same people as every other project
  person(group, o, act, x, y, z, ry, extra) { this.people.push({ group, o, act, x, y, z, ry, extra }); },
  civ(seed) { const r = n => ((seed * 9301 + n * 49297) % 233280) / 233280, pick = (a, n) => a[(r(n) * a.length) | 0]; return { kind: 'worker', civilian: true, seed, female: r(1) < 0.5, shirt: pick(['#b03a2e', '#2f6690', '#e8dcc0', '#3a7d44', '#7b4fa0', '#d9a21b', '#eef2f5', '#5fa6c8'], 2), pants: pick(['#2c3a52', '#3a3a3a', '#5a4b36', '#e8e2d8'], 3) }; },
  // Kryos city all round: the same blue glass towers, white low-rise blocks with roof gardens and green
  // boulevard as the city itself, with the projects already built — the playland, the Great School,
  // Homeward, the House of Healing and the shopping centre. The Animal Care Centre stands at the east end of the boulevard.
  kryos(api) {
    const land = (api.placed.find(p => p.piece && p.piece.parent) || (window.__siteGroup && { piece: { parent: window.__siteGroup } })); if (!land) { this._kryos = false; return; }
    const T = api.THREE, g = new T.Group(), Y = (x, z) => this.ground(api, x, z);
    const rng = seed => { let s2 = (seed * 7919 + 13) % 2147483647 || 1; return () => (s2 = (s2 * 16807) % 2147483647) / 2147483647; };
    const canvas = (w, h, draw) => { const c = document.createElement('canvas'); c.width = w; c.height = h; draw(c.getContext('2d'), w, h); const t = new T.CanvasTexture(c); t.colorSpace = T.SRGBColorSpace; t.wrapS = t.wrapT = T.RepeatWrapping; t.anisotropy = 4; return t; };
    const glassTex = [205, 212, 198, 220].map((hue, n) => { const r = rng(40 + n); return canvas(256, 512, (c, w, h) => { c.fillStyle = `hsl(${hue},48%,56%)`; c.fillRect(0, 0, w, h); for (let y = 0; y < h; y += 12) { c.fillStyle = 'rgba(20,40,70,.35)'; c.fillRect(0, y, w, 2); } for (let x = 0; x < w; x += 16) { c.fillStyle = 'rgba(230,240,255,.35)'; c.fillRect(x, 0, 1.5, h); } for (let k = 0; k < 300; k++) { c.fillStyle = `rgba(255,255,255,${r() * 0.12})`; c.fillRect(((r() * w / 16) | 0) * 16, ((r() * h / 12) | 0) * 12, 16, 12); } }); });
    const whiteTex = canvas(256, 256, (c, w, h) => { c.fillStyle = '#eef1f4'; c.fillRect(0, 0, w, h); for (let y = 10; y < h; y += 32) { c.fillStyle = '#5b7891'; c.fillRect(0, y, w, 14); c.fillStyle = 'rgba(255,255,255,.5)'; for (let x = 0; x < w; x += 24) c.fillRect(x, y, 2, 14); } });
    const glassM = glassTex.map(t => { t.repeat.set(3, 6); return new T.MeshStandardMaterial({ map: t, metalness: 0.75, roughness: 0.12 }); }), glass = n => glassM[n % 4];
    whiteTex.repeat.set(1, 1); const whiteM = new T.MeshStandardMaterial({ map: whiteTex, roughness: 0.35, metalness: 0.2 }), white = () => whiteM;
    const trim = new T.MeshStandardMaterial({ color: 0xf4f6f8, roughness: 0.25, metalness: 0.3 }), grass = new T.MeshStandardMaterial({ color: 0x5f9a42, roughness: 1 }), leaf = new T.MeshStandardMaterial({ color: 0x4f8f3a, roughness: 0.9, flatShading: true }), trunk = new T.MeshStandardMaterial({ color: 0x5a4030, roughness: 0.9 });
    const add = (geo, m, x, y, z) => { const o = new T.Mesh(geo, m); o.position.set(x, y, z); o.castShadow = false; o.receiveShadow = false; g.add(o); return o; };
    const tree = (x, z, y, s) => { add(new T.CylinderGeometry(0.35 * s, 0.5 * s, 5 * s, 5), trunk, x, y + 2.5 * s, z); add(new T.IcosahedronGeometry(4.5 * s, 0), leaf, x, y + 8 * s, z); };
    // keep the school, the playland, Homeward, the hospital, the shopping centre, the animal care centre and the Sky Rail clear
    const clear = (x, z, r) => (x + r > 480 && x - r < 800 && z + r > -490 && z - r < -350) || (x + r > 740 && Math.abs(z + 420) < r + 50) || (z + r > -290 && z - r < 340 && ((x + r > -905 && x - r < -225) || (x + r > 225 && x - r < 905))) || (x + r > -170 && x - r < 410 && Math.abs(z) + r > 300 && Math.abs(z) - r < 1110) || (x + r > -1260 && x - r < -885 && z + r > -250 && z - r < 250) || (x + r > 900 && x - r < 1420 && z + r > -340 && z - r < 340) || (x + r > -800 && x - r < -150 && z + r > 370 && z - r < 1040) || (x + r > 400 && x - r < 1000 && z + r > 500 && z - r < 1020) || (x + r > -380 && x - r < 620 && z + r > 1050 && z - r < 1340) || (x + r > -970 && x - r < -430 && z + r > -960 && z - r < -420);
    // the glass towers, in the same places as in Kryos city
    const r0 = rng(4242), spots = []; const keep = [[120, 640, 340], [120, 1060, 260], [-450, -700, 380], [700, -760, 420], [1250, 0, 180]];
    for (let tries = 0, n = 0, s2 = 0; tries < 6000 && (n < 18 || s2 < 18); tries++) {
      const x = -1150 + r0() * 2400, z = (r0() < 0.5 ? 1 : -1) * (270 + r0() * 900), north = z > 0;
      if ((north ? n : s2) >= 18 || Math.hypot(x - 120, z) > 1180 || (Math.abs(x - 120) < 280 && Math.abs(z) < 1150)) continue;
      if (keep.some(([kx, kz, kr]) => Math.hypot(x - kx, z - kz) < kr)) continue;
      if (spots.some(t => Math.hypot(t.x - x, t.z - z) < 95)) continue;
      const mid = Math.exp(-Math.pow((x - 700) / 700, 2)) * Math.exp(-Math.abs(z) / 700);
      spots.push({ x: Math.round(x), z: Math.round(z), h: Math.round(130 + r0() * 130 + mid * 300), r: Math.round(18 + r0() * 12), kind: (r0() * 4) | 0 }); if (north) n++; else s2++;
    }
    spots.forEach((t, n) => {
      if (clear(t.x, t.z, t.r * 1.8)) return;
      const { x, z, h, r, kind } = t, y = Y(x, z), m = glass(n, Math.max(1, Math.round(r / 7)), Math.max(1, Math.round(h / 45)));
      if (kind === 0) { add(new T.CylinderGeometry(r * 0.92, r, h, 16), m, x, y + h / 2, z); add(new T.SphereGeometry(r * 0.92, 16, 6, 0, Math.PI * 2, 0, Math.PI / 2), m, x, y + h, z).scale.y = 0.45; }
      else if (kind === 1) { let yy = 0, w = r * 1.8; for (const f of [0.55, 0.3, 0.15]) { const hh = h * f; add(new T.BoxGeometry(w, hh, w), m, x, y + yy + hh / 2, z); add(new T.BoxGeometry(w + 0.6, 1, w + 0.6), trim, x, y + yy + hh, z); yy += hh; w *= 0.78; } }
      else if (kind === 2) { add(new T.CylinderGeometry(r * 0.55, r, h, 6), m, x, y + h / 2, z); add(new T.ConeGeometry(r * 0.55, h * 0.18, 6), m, x, y + h * 1.09, z); }
      else for (let k = 0; k < 8; k++) { const hh = h / 8, o = add(new T.CylinderGeometry(r * (1 - k * 0.04), r * (1 - k * 0.03), hh, 12), m, x, y + k * hh + hh / 2, z); o.scale.z = 0.62; o.rotation.y = k * 0.12; }
      add(new T.BoxGeometry(r * 2.6, 6, r * 2.6), trim, x, y + 3, z);
    });
    // white low-rise blocks with roof gardens along the boulevard, and the green boulevard itself
    const rl = rng(77);
    for (let x0 = -1300; x0 < 1300; x0 += 65) for (const sd of [-1, 1]) {
      if (Math.abs(x0 - 120) < 290) continue;
      const w = 40 + rl() * 14, d = 50 + rl() * 40, h = 14 + rl() * 22, z = sd * (80 + d / 2 + rl() * 40);
      if (clear(x0, z, Math.max(w, d) / 2 + 6) || Math.hypot(x0 - 120, z) > 1240 || Math.hypot(x0 - 1250, z) < 200) continue;
      const y = Y(x0, z); add(new T.BoxGeometry(w, h, d), white(Math.max(1, Math.round(w / 40)), Math.max(1, Math.round(h / 20))), x0, y + h / 2, z);
      add(new T.BoxGeometry(w + 1, 1, d + 1), trim, x0, y + h, z); add(new T.BoxGeometry(w * 0.9, 0.8, d * 0.9), grass, x0, y + h + 0.9, z);
      tree(x0 - w * 0.25, z, y + h + 1.2, 0.5); tree(x0 + w * 0.25, z + d * 0.2, y + h + 1.2, 0.5);
    }
    for (const [a, b] of []) { const L = b - a, gr = add(new T.BoxGeometry(L, 0.3, 120), grass, (a + b) / 2, Y((a + b) / 2, 0) + 0.15, 0); gr.castShadow = false; for (let x = a + 20; x < b; x += 40) for (const sd of [-1, 1]) tree(x, sd * 50, Y(x, sd * 50), 1); }
    // low ground pads under the finished projects (the projects themselves are loaded from their own build files)
    for (const [x, z, w, d] of [[565, 25, 680, 630], [-565, 25, 680, 630], [-1070, 0, 400, 470], [1160, 0, 400, 470], [-550, 705, 650, 670]]) add(new T.BoxGeometry(w, 0.24, d), grass, x, Y(x, z) - 0.02, z);
    // the Homeward Two ground: a paved plaza under the station
    add(new T.BoxGeometry(270, 0.24, 84), new T.MeshStandardMaterial({ color: 0x9a948a, roughness: 0.95 }), 640, Y(640, -420) - 0.02, -420);
    land.piece.parent.add(this.bake(api, g));
    // clear the wild forest trees off Homeward, the hospital, the shopping centre, the animal care centre and the Sky Rail line
    { let root = land.piece; while (root.parent) root = root.parent; const m4 = new T.Matrix4(), v = new T.Vector3(), zero = new T.Matrix4().makeScale(0, 0, 0);
      root.traverse(o => { if (!o.isInstancedMesh || o.count < 5000) return; let hit = false;
        for (let i = 0; i < o.count; i++) { o.getMatrixAt(i, m4); v.setFromMatrixPosition(m4); if ((v.x > -190 && v.x < 430 && Math.abs(v.z) > 280 && Math.abs(v.z) < 1130) || (v.x > -1290 && v.x < -880 && Math.abs(v.z) < 270) || (v.x > 890 && v.x < 1430 && Math.abs(v.z) < 350) || (v.x > -960 && v.x < -440 && v.z > -950 && v.z < -430) || (v.x > 470 && v.x < 810 && v.z > -500 && v.z < -340) || (v.x > 730 && v.x < 3200 && Math.abs(v.z + 420) < 45) || (v.x > -800 && v.x < -150 && v.z > 370 && v.z < 1040) || (v.x > 300 && v.x < 940 && v.z > -1140 && v.z < -450) || (v.x > -820 && v.x < -230 && v.z > -1020 && v.z < -500) || (v.x > -270 && v.x < 270 && v.z > -1230 && v.z < -660) || (v.x > 400 && v.x < 1000 && v.z > 500 && v.z < 1020) || (v.x > -380 && v.x < 620 && v.z > 1050 && v.z < 1340)) { o.setMatrixAt(i, zero); hit = true; } }
        if (hit) o.instanceMatrix.needsUpdate = true; }); }
  },
  update(api, dt, t) {
    if (!this._kryos && ((api.placed && api.placed.length) || window.__siteGroup)) { this._kryos = true; try { this.kryos(api); } catch (e) { console.warn('kryos city', e); } }
    if (!this._fin && ((api.placed && api.placed.length) || window.__siteGroup)) { this._fin = true; this.finished(api); }
    if (this.bgTick) this.bgTick(api, dt, t);
    if (t === this._t) return; this._t = t;
    if (window.WB_PERSON && this.people.length) for (const q of this.people.splice(0)) { try { const c = window.WB_PERSON(q.group, q.o, q.act, q.x, q.y, q.z, q.ry || 0, q.extra || {}); if (c && q.extra && q.extra.scale) c.P.root.scale.setScalar(q.extra.scale); } catch (e) { } }
    if (this.onTick) this.onTick(api, dt, t);
  },
};

/* ---------- Homeward Two helpers, shared by every build ---------- */
(function () {
  const P = window.HSP;
  // bright colours (one copy, shared by every build)
  P.fun = function (api) {
    if (this._fun) return this._fun; const T = api.THREE, std = (c, r = 0.6, m = 0.1) => new T.MeshStandardMaterial({ color: c, roughness: r, metalness: m });
    return this._fun = { red: std(0xe0402e), blue: std(0x2f7fe0), green: std(0x3fb04a), purple: std(0x8a4fd0), orange: std(0xf08a1a), pink: std(0xf06aa8), yellow: std(0xf2c41a),
      soft: std(0x3a8f7a, 0.95), soft2: std(0xc8643a, 0.95), sand: std(0xe8d49a, 1), grass: std(0x5aa64a, 1), path: std(0xd8cdb6, 0.9), rope: std(0xc8a878, 0.9) };
  };
  // stone, timber, roofs and glass for the Homeward Two (one copy, shared by every build)
  P.hm = function (api) {
    if (this._hm) return this._hm; const T = api.THREE, std = (c, r = 0.6, m = 0.1, e = {}) => new T.MeshStandardMaterial({ color: c, roughness: r, metalness: m, ...e });
    return this._hm = { cream: std(0xefe6d2, 0.7), stone: std(0xd8d2c6, 0.85), mint: std(0x90f0b0, 0.5, 0.2), copper: std(0x5f9e86, 0.5, 0.6), brass: std(0xd9b44a, 0.3, 0.85),
      slate: std(0x3a4a5a, 0.6, 0.3), timber: std(0xa07a4a, 0.85), brick: std(0xa8553a, 0.9), gravel: std(0x8a8478, 1), board: std(0x1f3b2c, 0.9), roofGreen: std(0x5f9a42, 1),
      frame: std(0xf2f4f6, 0.35, 0.3), yellow: std(0xe8c13a, 0.5, 0.3), dark: std(0x2a2f38, 0.5, 0.5), teal: std(0x2f9a8a, 0.5, 0.2),
      glow: new T.MeshBasicMaterial({ color: new T.Color(0.6, 1.9, 1.0), toneMapped: false }), warm: new T.MeshBasicMaterial({ color: new T.Color(1.25, 1.05, 0.75), toneMapped: false }), dim: new T.MeshStandardMaterial({ color: 0x3a3226, emissive: 0xffd9a0, emissiveIntensity: 0.35, roughness: 0.6 }),
      glass: new T.MeshStandardMaterial({ color: 0xbfe8ff, roughness: 0.05, metalness: 0.3, transparent: true, opacity: 0.3, side: T.DoubleSide, depthWrite: false }) };
  };
  // a painted sign: text on a coloured board, drawn on both sides
  P.sign = function (api, g, text, w, h, x, y, z, ry = 0, bg = '#12333a', fg = '#bff8d0', both = true) {
    const T = api.THREE, tex = api.canvasTex(1024, Math.round(1024 * h / w), (c, cw, ch) => { c.fillStyle = bg; c.fillRect(0, 0, cw, ch); c.fillStyle = fg; let fs = ch * 0.62; c.font = 'bold ' + fs + 'px Arial'; while (c.measureText(text).width > cw * 0.92 && fs > 10) { fs -= 2; c.font = 'bold ' + fs + 'px Arial'; } c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(text, cw / 2, ch / 2 + 2); });
    for (const s of both ? [0, 1] : [0]) { const m = new T.Mesh(new T.PlaneGeometry(w, h), new T.MeshBasicMaterial({ map: tex })); m.position.set(x, y, z); m.rotation.y = ry + s * Math.PI; if (s) m.position.add(new T.Vector3(Math.sin(ry) * -0.2, 0, Math.cos(ry) * -0.2)); g.add(m); }
  };
  // a soft chime made in the browser
  P.ring = function (times = 3) {
    try {
      const A = this._ac || (this._ac = new (window.AudioContext || window.webkitAudioContext)()); if (A.state === 'suspended') A.resume();
      for (let n = 0; n < times; n++) { const t0 = A.currentTime + n * 1.6;
        for (const [f, v, d] of [[220, 0.22, 4], [440, 0.12, 3], [553, 0.06, 2.4], [880, 0.04, 1.6]]) { const o = A.createOscillator(), gn = A.createGain(); o.type = 'sine'; o.frequency.value = f; gn.gain.setValueAtTime(0.0001, t0); gn.gain.exponentialRampToValueAtTime(v, t0 + 0.02); gn.gain.exponentialRampToValueAtTime(0.0001, t0 + d); o.connect(gn); gn.connect(A.destination); o.start(t0); o.stop(t0 + d + 0.1); } }
    } catch (e) { }
  };
  P.kid = seed => { const o = P.civ(seed); o.shirt = ['#e0402e', '#2f7fe0', '#3fb04a', '#f2c41a', '#f06aa8', '#8a4fd0', '#f08a1a'][seed % 7]; return o; };
  // simple standing figures (two shapes each) for most of the crowd, so the Homeward Two stays smooth; a few real people walk about
  P.figure = (api, add, x, y, z, s = 0.6, n = 0, parent) => { const T = api.THREE, C = P.fun(api), cols = ['red', 'blue', 'green', 'yellow', 'pink', 'purple', 'orange'];
    add(new T.CapsuleGeometry(0.34 * s / 0.6 * 0.6, 1.0 * s, 3, 6), C[cols[n % 7]], x, y + 0.9 * s, z, true, parent); add(new T.SphereGeometry(0.26 * s, 8, 6), C.skin || (C.skin = new T.MeshStandardMaterial({ color: [0xe0b090, 0xb07850, 0x8a5a3a, 0xf0c8a0][n % 4], roughness: 0.8 })), x, y + 1.75 * s, z, true, parent); };
})();

/* ---------- the finished projects of Kryos, loaded from their own build files ---------- */
(function () {
  const P = window.HSP;
  // where this file was loaded from, so the other projects' folders sit beside it
  const me = (document.currentScript && document.currentScript.src) || '';
  P.base = /\/homewardtwo\/build1\.js/i.test(me) ? me.replace(/homewardtwo\/build1\.js.*$/i, '') : 'projects/';
  // every project already built in Kryos: its folder, and the helper its build files share
  P.FINISHED = [['childrensplayland', 'PLAY'], ['greatschool', 'SCHOOL'], ['newhomes', 'HOMES'], ['houseofhealing', 'HEAL'], ['shoppingcentre', 'SHOP'], ['animalcare', 'VET'], ['skyrail', 'SKY'], ['homewardtwo', 'HW2'], ['kryosarena', 'ARENA'], ['languagehouse', 'LANG'], ['greatlibrary', 'LIB'], ['gateofwelcome', 'GATE'], ['homewardthree', 'HW3'], ['mountainhouse', 'MTN'], ['seedvault', 'SDV'], ['guestsquarter', 'GSQ'], ['orchardvalley', 'ORV'], ['harvestfestival', 'HFG'], ['eldersgarden', 'EGP']];
  const loadOne = (src) => new Promise(res => { const s = document.createElement('script'); s.src = src; s.onload = () => res(true); s.onerror = () => { s.remove(); res(false); }; document.head.appendChild(s); });
  P.finished = async function (api) {
    const land = (api.placed.find(p => p.piece && p.piece.parent) || (window.__siteGroup && { piece: { parent: window.__siteGroup } })); if (!land) { this._fin = false; return; }
    const parent = land.piece.parent, T = api.THREE, keep = window.AEGIS_BUILDS, helpers = [];
    // the finished look: every flag of an earlier project counts as done, and nothing it does can change this game
    const bgApi = Object.create(api, { flag: { value: () => true }, setFlag: { value: () => { } }, count: { value: () => 99 }, kitsLeft: { value: () => 0 } });
    for (const [folder, name] of P.FINISHED) {
      const list = [];
      window.AEGIS_BUILDS = list;
      for (let i = 1; i <= 12; i++) { const ok = await loadOne(P.base + folder + '/build' + i + '.js'); if (!ok) break; }
      window.AEGIS_BUILDS = keep;
      const H = window[name]; if (!H) { console.warn('Homeward Two: could not load the finished ' + folder); continue; }
      H._kryos = true;   // its own simple copy of the city is not needed, this game already has the city
      helpers.push(H);
      for (const B of list.sort((a, b) => a.id - b.id)) {
        if (!B.setup || !B.make) continue;   // the landing field is already here
        try {
          B.setup(bgApi);
          await new Promise(r => setTimeout(r, 0));   // let the game breathe between builds
          (B.slots || []).forEach((sl, s) => {
            try {
              const g = B.make(sl.type, bgApi, { s, type: sl.type, x: sl.x, z: sl.z, y: sl.y, b: B.id });
              g.position.set(sl.x, sl.y, sl.z);
              g.traverse(o => { if (o.isMesh && !o.material.isMeshBasicMaterial) { o.castShadow = true; o.receiveShadow = true; } });
              parent.add(g);
            } catch (e) { console.warn('Homeward Two: finished part', folder, sl.type, e); }
          });
        } catch (e) { console.warn('Homeward Two: finished build', folder, B.id, e); }
      }
    }
    // the people of those projects, and their animals moving about
    this.bgHelpers = helpers;
    this.bgTick = (api2, dt, t) => {
      for (const H of this.bgHelpers) {
        if (window.WB_PERSON && H.people && H.people.length) for (const q of H.people.splice(0)) { try { const c = window.WB_PERSON(q.group, q.o, q.act, q.x, q.y, q.z, q.ry || 0, q.extra || {}); if (c && q.extra && q.extra.scale) c.P.root.scale.setScalar(q.extra.scale); } catch (e) { } }
        if (H.moveWalkers) try { H.moveWalkers(t); } catch (e) { }
      }
    };
  };

  /* ---------- the Homeward Two line ---------- */
  // the line runs east along z = -420: the station, the city line high on pylons, the ramp down
  // into the forest, the forest track under the green bridges, then the viaduct across the valley
  P.Z = -420;
  P.RAIL_Y = -28 + 24;            // top of the city guideway (DECK_TOP + 24)
  P.TRACK_Y = -28 + 5;            // top of the forest track and the viaduct deck
  P.X = { station: 640, cityA: 760, ramp: 1150, forest: 1250, edge: 1440, end: 2290 };
  P.railY = x => x <= P.X.ramp ? P.RAIL_Y : x >= P.X.forest ? P.TRACK_Y : P.RAIL_Y + (P.TRACK_Y - P.RAIL_Y) * ((x - P.X.ramp) / (P.X.forest - P.X.ramp));
  // one length of guideway beam from x0 to x1 (the beam top at y0 → y1, in the part's own space)
  P.beam = function (api, add, F, x0, x1, y0, y1, w = 7) {
    const T = api.THREE, L = Math.hypot(x1 - x0, y1 - y0), a = Math.atan2(y1 - y0, x1 - x0), cx = (x0 + x1) / 2, cy = (y0 + y1) / 2, S = P.hm(api);
    const b = add(new T.BoxGeometry(L, 3.2, w), S.stone, cx, cy - 1.6, 0); b.rotation.z = a;
    const u = add(new T.BoxGeometry(L, 1.2, w * 0.6), F.steel, cx, cy - 3.6, 0); u.rotation.z = a;
    for (const s of [-1, 1]) { const r = add(new T.BoxGeometry(L, 0.5, 0.5), F.steel, cx, cy + 0.25, s * 1.6); r.rotation.z = a; }
    const gl = add(new T.BoxGeometry(L, 0.15, 0.4), S.glow, cx, cy - 1.2, w / 2 + 0.05, false); gl.rotation.z = a;
  };
  // a sky pod: a white capsule with a glass band and a glowing strip, sitting on the beam
  P.pod = function (api, add, parent, x, y, z, n = 0) {
    const T = api.THREE, S = P.hm(api), F = P.mats(api), g = new T.Group(); g.position.set(x, y, z); parent.add(g); g.userData.keep = true;
    const a = (geo, m, X, Y, Z) => add(geo, m, X, Y, Z, true, g);
    a(new T.CapsuleGeometry(2.6, 18, 6, 16).rotateZ(Math.PI / 2), F.white, 0, 3.4, 0);
    a(new T.CapsuleGeometry(2.66, 15, 4, 16).rotateZ(Math.PI / 2), S.glass, 0, 4.0, 0).scale.set(1, 0.55, 1.02);
    a(new T.BoxGeometry(20, 0.3, 5.4), [S.glow, S.teal, S.yellow][n % 3], 0, 2.2, 0);
    a(new T.BoxGeometry(16, 1.2, 2.4), F.dark, 0, 0.6, 0);
    return g;
  };
  // simple low-poly animals: deer, fox, rabbit, bird (the same ones as the Animal Care Centre)
  P.animal = function (api, add, grp, kind, x, y, z, ry = 0, sc = 1) {
    const T = api.THREE, std = c => (P._am = P._am || {})[c] || (P._am[c] = new T.MeshStandardMaterial({ color: c, roughness: 0.8 }));
    const a = new T.Group(); a.position.set(x, y, z); a.rotation.y = ry; a.scale.setScalar(sc); grp.add(a);
    const S = { deer: [1.1, 0.9, 1.4, 0x9a6a3a], fox: [0.55, 0.35, 0.5, 0xd8641e], rabbit: [0.3, 0.25, 0.2, 0xb8a890] }[kind] || [1.1, 0.9, 1.4, 0x9a6a3a];
    const [L, H, legH, col] = S, m = std(col), dark = std(0x3a2a1a);
    add(new T.CapsuleGeometry(H * 0.5, L, 4, 8).rotateZ(Math.PI / 2), m, 0, legH + H * 0.5, 0, true, a);
    for (const [lx, lz] of [[-L * 0.4, -H * 0.3], [-L * 0.4, H * 0.3], [L * 0.4, -H * 0.3], [L * 0.4, H * 0.3]]) add(new T.CylinderGeometry(0.06 * (H + 0.6), 0.05 * (H + 0.6), legH, 5), dark, lx, legH / 2, lz, true, a);
    const hx = L * 0.5 + H * 0.35, hy = legH + H * (kind === 'deer' ? 1.2 : 0.9);
    add(new T.CylinderGeometry(H * 0.18, H * 0.25, H * 0.8, 6).rotateZ(-0.8), m, L * 0.5, legH + H * 0.8, 0, true, a);
    add(new T.BoxGeometry(H * 0.7, H * 0.5, H * 0.45), m, hx, hy, 0, true, a);
    if (kind === 'deer') for (const s of [-1, 1]) add(new T.CylinderGeometry(0.03, 0.04, 0.7, 4).rotateZ(0.3 * s).rotateX(0.3 * s), dark, hx - 0.1, hy + 0.5, s * 0.15, false, a);
    else for (const s of [-1, 1]) add(new T.ConeGeometry(H * 0.12, H * (kind === 'rabbit' ? 0.9 : 0.35), 4), m, hx - 0.05, hy + H * 0.4, s * H * 0.14, false, a);
    if (kind !== 'rabbit') add(new T.CylinderGeometry(0.04 * (H + 0.6), 0.02, L * (kind === 'fox' ? 0.6 : 0.35), 5).rotateZ(1.1), kind === 'fox' ? std(0xf2e8d8) : m, -L * 0.6, legH + H * 0.5, 0, false, a);
    return a;
  };
  // animals that walk to and fro across a green bridge (kept separate so they can move)
  P.walkers = P.walkers || [];
  P.crosser = function (api, add, grp, kind, x, z0, z1, yOf, sp, sc, ph) {
    const a = P.animal(api, add, grp, kind, x, 0, z0, 0, sc); a.userData.keep = true; P.walkers.push({ a, x, z0, z1, yOf, sp, ph });
  };
  P.moveWalkers = function (t) {
    for (const w of P.walkers) { const u = (Math.sin(t * w.sp + w.ph) + 1) / 2, z = w.z0 + (w.z1 - w.z0) * u, dir = Math.cos(t * w.sp + w.ph) > 0 ? 1 : -1;
      w.a.position.set(w.x, w.yOf(z), z); w.a.rotation.y = dir * (w.z1 > w.z0 ? -1 : 1) * Math.PI / 2; }
  };
  P.hint = (text) => {
    let el = document.getElementById('playHint');
    if (!el) { el = document.createElement('div'); el.id = 'playHint'; el.style.cssText = 'position:fixed;left:50%;bottom:90px;transform:translateX(-50%);z-index:8;padding:8px 18px;background:rgba(8,20,35,.85);border:1px solid #9fffd8;border-radius:5px;color:#fff;font:600 13px "Segoe UI",Arial;letter-spacing:3px;text-align:center;pointer-events:none'; document.body.appendChild(el); }
    el.style.display = text ? 'block' : 'none'; if (text) el.textContent = text;
  };
  P.cover = (on, a, b) => {
    let el = document.getElementById('playCover');
    if (!el) { el = document.createElement('div'); el.id = 'playCover'; el.style.cssText = 'position:fixed;inset:0;z-index:8;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:0 40px;background:rgba(8,16,28,.92);color:#fff;font-family:"Segoe UI",Arial;opacity:0;transition:opacity 1.2s;pointer-events:none'; document.body.appendChild(el); }
    if (on) el.innerHTML = '<div style="font-size:26px;letter-spacing:7px;font-weight:600">' + a + '</div><div style="font-size:14px;letter-spacing:4px;margin-top:12px;color:#c8fff0">' + (b || '') + '</div>';
    el.style.opacity = on ? 1 : 0;
  };
})();

/* ---------- THE HUNGRY SHIPS · BUILD 1 · THE ATTACK ON KRYOS ---------- */
/* Nothing is built in this chapter. The Ark warps to Kryos, then L starts the scene:
   hungry ships from the world Ocknog attack the whole city, the shield over Kryos holds,
   the Keeper steps in and stops the ships without hurting anyone, asks what they want, and hears
   that Ocknog's soil is contaminated by a poisonous dust cloud and its people are hungry.
   The Keeper calls an emergency council meeting. Keep this file in projects/hungryships. */
(window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push({
  id: 1,
  name: 'THE HUNGRY SHIPS',
  brief: 'Nothing is built in this chapter. Hungry ships from the world Ocknog attack the whole city of Kryos while the shield holds. The Keeper steps in, stops every ship without hurting anyone, and asks what they want. Then the emergency council meets: send scientists to Ocknog for soil samples, or let the strangers grow food on Kryos. Kryos feeds them for now, and the party of scientists leaves for Ocknog.',
  sceneOnly: true,
  types: {},
  kits: {},
  trips: [{ name: 'THE HUNGRY SHIPS', kits: {}, finish: 'custom' }],
  finishLabel: 'WATCH THE ATTACK ON KRYOS',
  setup(api) {
    const V = (x, y, z) => new api.THREE.Vector3(x, y, z);
    this.slots = [];
    this.finishCam = [V(-1900, 430, 2200), V(120, 340, 0)];
  },
  rule() { return null; },
  ready() { return { ok: true, msg: 'PRESS L TO WATCH THE ATTACK ON KRYOS' }; },
  stats(api) { return [['THE ATTACK', window.HSP.done ? 'STOPPED BY THE KEEPER' : 'NOT YET'], ['SHIELD OVER KRYOS', 'UP'], ['BUILDING TODAY', 'NOTHING']]; },
  make(type, api) { return new api.THREE.Group(); },
  tick(api, dt, t) {
    window.HSP.update(api, dt, t);
    if (api.flag('opened') && !document.getElementById('nextMeeting')) {
      const b = document.createElement('button'); b.id = 'nextMeeting';
      b.innerHTML = 'GO TO THE NEXT COUNCIL MEETING ▶<small style="display:block;font-weight:400;font-size:10px;letter-spacing:2px;color:#c8ecff;margin-top:3px">THE SCIENTISTS ARE READY TO LEAVE</small>';
      b.style.cssText = 'position:fixed;left:50%;bottom:22px;transform:translateX(-50%);z-index:9;padding:10px 22px;font:600 14px "Segoe UI",Arial;letter-spacing:3px;color:#fff;background:rgba(20,80,60,.85);border:1px solid #9fffd8;border-radius:5px;cursor:pointer';
      b.onmouseenter = () => b.style.background = 'rgba(30,110,80,.95)'; b.onmouseleave = () => b.style.background = 'rgba(20,80,60,.85)';
      b.onclick = () => { location.href = 'councilmeeting/councilmeeting36.html'; };
      document.body.appendChild(b);
    }
  },
  finishStart(api) {
    if (!window.__keeperUnlock) { window.__keeperUnlock = true; const un = () => { try { const u = new SpeechSynthesisUtterance(' '); u.volume = 0; window.speechSynthesis.speak(u); } catch (e) {} }; un(); addEventListener('keydown', un, { once: true }); addEventListener('pointerdown', un, { once: true }); }
    const P = window.HSP, T = api.THREE; this.t1 = 0; this.stage = 0; this.bolts = []; this.flash = []; this.nb = 0; P.ring && P.ring(2);
    const par = ((api.placed.find(p => p.piece && p.piece.parent) || (window.__siteGroup && { piece: { parent: window.__siteGroup } })) || {}).piece, host = par ? par.parent : (window.__siteGroup || window.__scene);
    const grp = new T.Group(); host.add(grp); this.grp = grp;
    const cx = 120, cz = 0, y0 = api.DECK_TOP - 0.4; this.cx = cx; this.cz = cz; this.y0 = y0; this.DR = 1450;
    this.red = new T.Color(2.6, 0.4, 0.3); this.amber = new T.Color(2.0, 1.4, 0.4); this.ice = new T.Color(0.6, 1.6, 2.4);
    this.glowMat = new T.MeshBasicMaterial({ color: this.red.clone(), toneMapped: false });
    const dark = new T.MeshStandardMaterial({ color: 0x2a2226, roughness: 0.5, metalness: 0.7 });
    this.iceShell = new T.MeshBasicMaterial({ color: new T.Color(0.5, 1.4, 2.0), transparent: true, opacity: 0, visible: false, depthWrite: false, blending: T.AdditiveBlending, toneMapped: false });
    const mkShip = (sc) => {
      const s = new T.Group();
      s.add(new T.Mesh(new T.CylinderGeometry(7, 16, 4, 14), dark));
      const top = new T.Mesh(new T.SphereGeometry(7, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2), dark); top.position.y = 2; s.add(top);
      for (let j = 0; j < 10; j++) { const a = j / 10 * Math.PI * 2, sp = new T.Mesh(new T.ConeGeometry(1.3, 9, 5), dark); sp.position.set(Math.cos(a) * 15, 0, Math.sin(a) * 15); sp.rotation.z = -Math.cos(a) * 1.2; sp.rotation.x = Math.sin(a) * 1.2; s.add(sp); }
      const rg = new T.Mesh(new T.TorusGeometry(11, 0.7, 6, 28), this.glowMat); rg.rotation.x = Math.PI / 2; rg.position.y = -0.6; s.add(rg);
      const core = new T.Mesh(new T.SphereGeometry(2.4, 10, 8), this.glowMat); core.position.y = -2.4; s.add(core);
      const sh = new T.Mesh(new T.SphereGeometry(21, 16, 10), this.iceShell); s.add(sh);
      s.scale.setScalar(sc); s.visible = false; grp.add(s); return s;
    };
    this.ships = Array.from({ length: 9 }, () => mkShip(3.4));
    this.mother = mkShip(46); this.mother.position.set(cx + 700, y0 + 1500, cz - 2300); this.mother.visible = false;
    this.shield = new T.Mesh(new T.SphereGeometry(this.DR, 56, 28, 0, Math.PI * 2, 0, Math.PI / 2), new T.MeshBasicMaterial({ color: new T.Color(0.25, 0.9, 1.0), transparent: true, opacity: 0.06, blending: T.AdditiveBlending, depthWrite: false, side: T.DoubleSide, toneMapped: false }));
    this.shield.position.set(cx, y0, cz); grp.add(this.shield);
    this.shieldWire = new T.Mesh(new T.SphereGeometry(this.DR + 1, 36, 18, 0, Math.PI * 2, 0, Math.PI / 2), new T.MeshBasicMaterial({ color: new T.Color(0.5, 1.6, 1.8), wireframe: true, transparent: true, opacity: 0.12, depthWrite: false, toneMapped: false }));
    this.shieldWire.position.copy(this.shield.position); grp.add(this.shieldWire);
    // the Keeper: a golden heart of light with turning rings, high over Kryos
    const K = new T.Group(); K.position.set(cx, y0 + 950, cz); K.scale.setScalar(0.001); grp.add(K); this.keeper = K;
    const gold = new T.MeshBasicMaterial({ color: new T.Color(1.5, 1.2, 0.6), toneMapped: false });
    K.add(new T.Mesh(new T.SphereGeometry(34, 28, 20), gold));
    this.rings = [[62, 0.2], [84, -0.35], [108, 0.5]].map(([r, sp], i) => { const m = new T.Mesh(new T.TorusGeometry(r, 1.3, 8, 72), new T.MeshBasicMaterial({ color: i === 1 ? new T.Color(0.7, 1.6, 2.4) : new T.Color(2.2, 1.5, 0.6), toneMapped: false })); m.rotation.x = Math.PI / 2 + i * 0.5; m.userData.sp = sp; K.add(m); return m; });
    this.keeperLight = new T.PointLight(0xffe0a0, 0, 3000, 2); this.keeperLight.position.copy(K.position); grp.add(this.keeperLight);
    this.lineMat = new T.MeshBasicMaterial({ color: new T.Color(1.2, 2.2, 3.0), toneMapped: false });
    this.lines = this.ships.map(() => { const m = new T.Mesh(new T.CylinderGeometry(1.4, 1.4, 1, 6, 1, true).rotateX(Math.PI / 2), this.lineMat); m.visible = false; grp.add(m); return m; });
    this.boltMat = new T.MeshBasicMaterial({ color: new T.Color(3, 0.5, 0.3), toneMapped: false }); this.boltGeo = new T.SphereGeometry(4, 8, 6);
    this.frozen = this.ships.map(() => false);
    this.fp = []; this.sun = null;
    window.HSP.done = false;
  },
  finishUpdate(api, dt) {
    const P = window.HSP, T = api.THREE, sm = e => e * e * (3 - 2 * e), cx = this.cx, cz = this.cz, y0 = this.y0, DR = this.DR;
    this.t1 += dt; const t = this.t1, f = performance.now() / 1000;
    this.rings.forEach(r => { r.rotation.z += dt * r.userData.sp; });
    this.lines.forEach((l, i) => { if (!l.visible) return; const a = this.keeper.position, b = this.ships[i].position, L = a.distanceTo(b); l.position.copy(a).add(b).multiplyScalar(0.5); l.lookAt(b); l.scale.set(1, 1, L); });
    const orbit = (i, u) => {   // ships wheel round the city just outside the shield
      const e = sm(Math.min(1, u / 8)), ang = i / 9 * Math.PI * 2 + u * (0.18 + (i % 3) * 0.03), R = 2900 + (DR + 260 + (i % 3) * 120 - 2900) * e, Y = y0 + 900 + (260 + (i % 4) * 70 - 900) * e + Math.sin(u * 0.9 + i) * 16;
      return new T.Vector3(cx + Math.cos(ang) * R, Y, cz + Math.sin(ang) * R);
    };
    const moveShips = u => this.ships.forEach((s, i) => { if (this.frozen[i]) return; s.position.copy(orbit(i, u)); s.rotation.y += dt * 0.7; s.rotation.z = Math.sin(u + i) * 0.06; });
    const stepFx = (frozenBolts) => {
      if (!frozenBolts) for (let i = this.bolts.length - 1; i >= 0; i--) {
        const b = this.bolts[i]; b.u += dt / 1.0; b.m.position.lerpVectors(b.a, b.b, Math.min(1, b.u));
        if (b.u >= 1) { const fm = new T.Mesh(new T.SphereGeometry(1, 12, 8), new T.MeshBasicMaterial({ color: new T.Color(0.7, 2.0, 2.4), transparent: true, opacity: 1, depthWrite: false, blending: T.AdditiveBlending, toneMapped: false })); fm.position.copy(b.b); this.grp.add(fm); this.flash.push({ m: fm, u: 0 }); this.grp.remove(b.m); this.bolts.splice(i, 1); this.hit = 1; }
      }
      for (let i = this.flash.length - 1; i >= 0; i--) { const q = this.flash[i]; q.u += dt; q.m.scale.setScalar(10 + q.u * 130); q.m.material.opacity = Math.max(0, 1 - q.u / 0.9); if (q.u > 0.9) { this.grp.remove(q.m); this.flash.splice(i, 1); } }
      this.hit = Math.max(0, (this.hit || 0) - dt * 2); this.shield.material.opacity = 0.06 + Math.sin(f * 2) * 0.01 + this.hit * 0.12; this.shieldWire.material.opacity = 0.12 + this.hit * 0.5;
    };
    const fire = (rate, until) => {
      if (t - this.nb > rate && t < until) {
        this.nb = t; const i = (Math.random() * 9) | 0, a = this.ships[i].position, ang = Math.atan2(a.z - cz, a.x - cx) + (Math.random() - 0.5) * 0.4, el = 0.12 + Math.random() * 0.7;
        const b = new T.Vector3(cx + Math.cos(ang) * DR * Math.cos(el), y0 + DR * Math.sin(el), cz + Math.sin(ang) * DR * Math.cos(el));
        const m = new T.Mesh(this.boltGeo, this.boltMat); m.position.copy(a); this.grp.add(m); this.bolts.push({ m, a: a.clone(), b, u: 0 });
      }
    };
    const say = txt => P.hint(txt);
    const speakK = (key, txt, alien) => {   // the Keeper speaks out loud: a slow, deep voice
      if (this._sp === key) return; this._sp = key;
      try { const ss = window.speechSynthesis; if (!ss) return; ss.cancel(); if (!txt) return;
        const text = txt.replace(/[“”]/g, '').replace(/^THE (KEEPER|STRANGER):\s*/, '').toLowerCase().replace(/(^|[.!?]\s+)([a-z])/g, (m, a, b) => a + b.toUpperCase()).replace(/\bi\b/g, 'I').replace(/\bkryos\b/gi, 'Kryos').replace(/\bocknog\b/gi, 'Ocknog').replace(/\bunity\b/gi, 'Unity');
        const go = () => { const u = new SpeechSynthesisUtterance(text), vs = ss.getVoices(), en = vs.filter(v => /^en/i.test(v.lang)), v = (alien ? en.find(v => /female|zira|samantha|hazel|susan|karen|moira/i.test(v.name)) : en.find(v => /male|david|daniel|george|james|mark|guy|alex/i.test(v.name) && !/female/i.test(v.name))) || en[0] || vs[0];
          if (v) { u.voice = v; u.lang = v.lang; } else u.lang = 'en-US'; u.pitch = alien ? 1.7 : 0.45; u.rate = alien ? 0.78 : 0.86; u.volume = 1; window.__keeperU = u; ss.resume(); ss.speak(u); };
        if (ss.getVoices().length) setTimeout(go, 120); else { let done = false; const once = () => { if (done) return; done = true; go(); }; ss.onvoiceschanged = once; setTimeout(once, 600); } } catch (e) { console.warn('keeper voice', e); }
    };

    if (this.stage === 0) {   // a quiet morning, the shield up
      stepFx(false);
      say('KRYOS · A QUIET MORNING · THE SHIELD STANDS OVER THE WHOLE CITY');
      if (t > 14) { this.stage = 1; this.t1 = 0; P.ring && P.ring(3); this.ships.forEach((s, i) => { s.visible = true; s.position.copy(orbit(i, 0)); }); this.mother.visible = true; }
    } else if (this.stage === 1) {   // the ships arrive
      stepFx(false); moveShips(t); this.mother.position.y += (y0 + 1250 - this.mother.position.y) * Math.min(1, dt * 0.25);
      say('ALARM · A MOTHER SHIP AND NINE DARK SHIPS FALL OUT OF THE SKY OVER KRYOS');
      if (t > 14) { this.stage = 2; this.t1 = 0; this.nb = 0; }
    } else if (this.stage === 2) {   // the attack on the whole city; the shield holds
      stepFx(false); moveShips(14 + t); fire(0.22, 66);
      say(t < 14 ? 'THEY ATTACK THE WHOLE CITY OF KRYOS · THE SHIELD IS UP · EVERY SHOT STOPS AT THE SHIELD' : t < 28 ? 'THE SHIELD HOLDS OVER EVERY HOME · THE PEOPLE OF KRYOS WATCH FROM THE STREETS' : t < 44 ? 'THE SHIPS WHEEL ROUND THE CITY, FIRING AT EVERY SIDE OF THE SHIELD' : t < 56 ? 'THE SHIELD FLASHES WITH EVERY HIT · THE CITY IS SAFE, BUT HOW LONG CAN THE SHIELD HOLD?' : 'THE ATTACK GROWS · THE PEOPLE OF KRYOS CALL FOR THE KEEPER');
      if (t > 66) { this.stage = 3; this.t1 = 0; this.fp = this.ships.map(s => s.position.clone()); P.ring && P.ring(3); }
    } else if (this.stage === 3) {   // the Keeper steps in
      stepFx(false); moveShips(80 + t);
      const e = sm(Math.min(1, t / 4)); this.keeper.scale.setScalar(Math.max(0.001, e)); this.keeperLight.intensity = 3e4 * e;
      say(t < 4 ? 'THE SKY OVER KRYOS TURNS TO GOLD · THE KEEPER STEPS IN' : 'THE KEEPER: “ENOUGH. BE STILL. NO ONE WILL BE HURT.”');
      if (t >= 4) speakK('s3', 'Enough. Be still. No one will be hurt.');
      if (t > 4) {
        const R = (t - 4) * 700;
        this.ships.forEach((s, i) => { if (!this.frozen[i] && s.position.distanceTo(this.keeper.position) < R) { this.frozen[i] = true; this.lines[i].visible = true; } });
        this.glowMat.color.lerp(this.ice, Math.min(1, dt * 2));
      }
      if (t > 9) { this.stage = 4; this.t1 = 0; this.bolts.forEach(b => this.grp.remove(b.m)); this.bolts = []; }
    } else if (this.stage === 4) {   // every ship frozen where it hangs, unhurt; the Keeper asks
      stepFx(true); this.glowMat.color.lerp(this.ice, Math.min(1, dt * 2));
      const L = [
        'THE KEEPER: “YOU ARE STOPPED, AND NOT ONE OF YOU IS HURT. I WILL NOT HARM YOU. WHAT DO YOU WANT?”',
        'THE STRANGER: “WE ARE FROM OCKNOG. WE ARE HUNGRY. OUR PEOPLE NEED FOOD, MORE FOOD THAN ANY ONE WORLD CAN SPARE.”',
        'THE STRANGER: “A POISONOUS DUST CLOUD HAS CONTAMINATED THE SOIL OF OCKNOG. NOTHING WILL GROW THERE ANY MORE.”',
        'THE STRANGER: “WE THOUGHT UNITY WOULD NEVER GIVE US SO MUCH FOOD, SO WE CAME TO TAKE IT.”',
        'THE KEEPER: “I WILL CALL AN EMERGENCY COUNCIL MEETING, AND UNITY WILL DECIDE HOW TO HELP. WAIT IN YOUR MOTHER SHIP.”'];
      const k = Math.min(L.length - 1, Math.floor(t / 8)); say(L[k]); speakK('s4' + k, L[k], /^THE STRANGER/.test(L[k]));
      if (t > 8 * L.length) { this.stage = 5; this.t1 = 0; this.frozen = this.frozen.map(() => false); this.lines.forEach(l => l.visible = false); this.fp = this.ships.map(s => s.position.clone()); }
    } else if (this.stage === 5) {   // the ships rise and go back to the mother ship
      stepFx(true); this.glowMat.color.lerp(this.amber, Math.min(1, dt * 1.5));
      const e = sm(Math.min(1, t / 9)); this.keeper.scale.setScalar(Math.max(0.001, 1 - sm(Math.min(1, Math.max(0, (t - 3) / 6))))); this.keeperLight.intensity = 3e4 * (1 - sm(Math.min(1, t / 9)));
      this.ships.forEach((s, i) => { s.position.lerpVectors(this.fp[i], this.mother.position, e); s.rotation.y += dt * 0.4; s.scale.setScalar(3.4 * (1 - e * 0.9)); });
      say('THE SHIPS RISE AND GO BACK TO THEIR MOTHER SHIP · THE KEEPER WATCHES THEM GO');
      if (t > 11) { this.stage = 6; this.t1 = 0; this.ships.forEach(s => s.visible = false); this.mother.position.set(cx + 700, y0 + 1250, cz - 2300); P.hint(''); P.ring && P.ring(2); this._cl = -1; }
    } else if (this.stage === 6) {   // the emergency council meeting
      stepFx(true);
      const C = [
        ['THE KEEPER', 'PEOPLE OF KRYOS, THE SHIPS ARE STILL AND NOT ONE PERSON WAS HURT. THEY ARE FROM OCKNOG, AND THEY ARE HUNGRY.'],
        ['THE COUNCIL', 'TEN SHIPS AND ABOUT FORTY THOUSAND STRANGERS. THEY CAME TO TAKE FOOD BECAUSE THEY THOUGHT UNITY WOULD NEVER GIVE IT.'],
        ['THE COUNCIL', 'A POISONOUS DUST CLOUD HAS CONTAMINATED THEIR SOIL. HUNGRY PEOPLE WITH NOWHERE TO GROW FOOD WILL ALWAYS BE IN DANGER.'],
        ['THE KEEPER', 'TWO ROADS ARE OPEN. WE CAN GO TO OCKNOG AND TAKE SOIL SAMPLES, OR WE CAN LET THEM GROW FOOD ON KRYOS. THE COUNCIL WILL CHOOSE.'],
        ['THE TREASURER', 'THE SOIL MISSION COSTS 1.4 BILLION. THE STRANGERS’ FIELDS ON KRYOS COST 1.6 BILLION, AND WOULD EARN 8 MILLION A MONTH.'],
        ['AN ELDER OF KRYOS', 'IF WE CAN MEND THEIR SOIL THEY CAN GO HOME AND GROW THEIR OWN FOOD. THAT IS BETTER FOR THEM, AND FOR US.'],
        ['THE VOTE', 'THE COUNCIL VOTES · THE SOIL MISSION TO OCKNOG: 8 · THE STRANGERS’ FIELDS ON KRYOS: 4'],
        ['THE KEEPER', 'SO IT IS CHOSEN. WE CHECK THEIR SOIL FIRST. UNTIL THEN, KRYOS WILL FEED THEM.']];
      const k = Math.min(C.length - 1, Math.floor(t / 10));
      let el = document.getElementById('hsCouncil');
      if (!el) { el = document.createElement('div'); el.id = 'hsCouncil'; el.style.cssText = 'position:fixed;left:50%;top:64px;transform:translateX(-50%);width:min(880px,92vw);z-index:8;padding:16px 22px;background:rgba(6,14,24,.9);border:1px solid #6fe0ff;border-radius:6px;color:#e8f6ff;font:600 15px "Segoe UI",Arial;letter-spacing:1.5px;line-height:1.5'; document.body.appendChild(el); }
      if (k !== this._cl) { this._cl = k; speakK('s6' + k, C[k][0] === 'THE KEEPER' ? C[k][1] : '');
        const card = (n, a, b, v, win) => '<div style="flex:1;padding:10px 12px;border:1px solid ' + (win ? '#ffe08a' : '#4a7a96') + ';border-radius:4px;background:rgba(20,40,60,.7)"><div style="font-size:11px;color:#9fd8ff">PROPOSAL ' + n + '</div><div>' + a + '</div><div style="font-size:12px;font-weight:400;color:#c8e8ff">' + b + '</div>' + (v !== null ? '<div style="margin-top:6px;color:#ffe08a">' + v + ' VOTES' + (win ? ' · CHOSEN' : '') + '</div>' : '') + '</div>';
        el.innerHTML = '<div style="font-size:11px;letter-spacing:4px;color:#6fe0ff;margin-bottom:6px">THE EMERGENCY COUNCIL · KRYOS</div><div style="color:#ffe08a;font-size:12px;letter-spacing:3px">' + C[k][0] + '</div><div>' + C[k][1] + '</div>' +
          (k >= 3 ? '<div style="display:flex;gap:12px;margin-top:12px">' + card(1, 'THE SOIL MISSION TO OCKNOG', 'SCIENTISTS GO TO OCKNOG AND TAKE SOIL SAMPLES · 1.4 BILLION', k >= 6 ? 8 : null, k >= 6) + card(2, 'THE STRANGERS’ FIELDS ON KRYOS', 'A PLACE TO GROW FOOD ON UNITY · 1.6 BILLION · EARNS 8 MILLION A MONTH', k >= 6 ? 4 : null, false) + '</div>' : '');
      }
      if (t > 10 * C.length) { this.stage = 7; speakK('end', ''); this.t1 = 0; el.remove(); this.food = []; this.fl = 0;
        const fm = new T.MeshStandardMaterial({ color: 0xe8d8a0, roughness: 0.6 }), fg = new T.MeshBasicMaterial({ color: new T.Color(0.6, 2.0, 1.2), toneMapped: false });
        this.foodGeo = new T.BoxGeometry(14, 10, 14); this.foodMat = fm; this.foodGlow = fg; }
    } else if (this.stage === 7) {   // short term: Kryos feeds the strangers
      stepFx(true);
      say(t < 12 ? 'KRYOS FEEDS THE STRANGERS · FOOD CAPSULES RISE FROM THE CITY TO THE MOTHER SHIP' : t < 26 ? 'CAPSULE AFTER CAPSULE · ENOUGH FOR FORTY THOUSAND PEOPLE' : 'THE STRANGERS ARE FED · NOW THE SCIENTISTS MUST FIND OUT WHAT IS WRONG WITH THEIR SOIL');
      if (t - this.fl > 0.45 && t < 24) { this.fl = t; const m = new T.Mesh(this.foodGeo, this.foodMat); const g2 = new T.Mesh(new T.BoxGeometry(15, 2, 15), this.foodGlow); m.add(g2);
        const a = new T.Vector3(cx + (Math.random() - 0.5) * 900, y0 + 30, cz + (Math.random() - 0.5) * 900); m.position.copy(a); this.grp.add(m); this.food.push({ m, a, u: 0 }); }
      for (let i = this.food.length - 1; i >= 0; i--) { const q = this.food[i]; q.u += dt / 9; const e = Math.min(1, q.u); q.m.position.lerpVectors(q.a, this.mother.position, e * e); q.m.position.y += Math.sin(e * Math.PI) * 200; q.m.rotation.y += dt; q.m.scale.setScalar(1 - e * 0.6); if (q.u >= 1) { this.grp.remove(q.m); this.food.splice(i, 1); } }
      if (t > 34) { this.stage = 8; this.t1 = 0; this.food.forEach(q => this.grp.remove(q.m)); this.food = [];
        const wm = new T.MeshStandardMaterial({ color: 0xf0f2f4, roughness: 0.4, metalness: 0.4 }), gm = new T.MeshBasicMaterial({ color: new T.Color(0.6, 1.6, 2.4), toneMapped: false });
        this.sci = Array.from({ length: 3 }, (_, i) => { const g3 = new T.Group(); g3.add(new T.Mesh(new T.CapsuleGeometry(6, 18, 4, 10).rotateZ(Math.PI / 2), wm)); const e2 = new T.Mesh(new T.SphereGeometry(2.2, 8, 6), gm); e2.position.set(-12, 0, 0); g3.add(e2); g3.position.set(cx + 140 + i * 40, y0 + 20, cz + 60 - i * 60); g3.scale.setScalar(2.4); this.grp.add(g3); return g3; }); }
    } else if (this.stage === 8) {   // the party of scientists leaves for Ocknog
      stepFx(true);
      say(t < 8 ? 'THE PARTY OF SCIENTISTS BOARDS THREE SHUTTLES · SOIL BOXES, LAB KITS AND A WARM COAT FOR EVERY ONE' : 'THE SHUTTLES RISE · THE STRANGERS SHOW THE WAY HOME');
      const e = sm(Math.max(0, Math.min(1, (t - 5) / 12)));
      this.sci.forEach((g3, i) => { const a = new T.Vector3(cx + 140 + i * 40, y0 + 20, cz + 60 - i * 60); g3.position.lerpVectors(a, this.mother.position, e); g3.position.y += Math.sin(e * Math.PI) * 120; g3.lookAt(this.mother.position); g3.scale.setScalar(2.4 * (1 - e * 0.7)); });
      if (t > 19) { this.stage = 9; this.t1 = 0; this.sci.forEach(g3 => this.grp.remove(g3)); P.hint(''); P.cover(true, 'THE SCIENTISTS LEAVE FOR OCKNOG', 'NO ONE WAS HURT · KRYOS FEEDS THE STRANGERS · THE SOIL MISSION BEGINS · NEXT: OCKNOG'); }
    } else {
      this.mother.position.y += dt * 120;
      if (t > 4 && !this._h) { this._h = true; window.HSP.done = true; api.setFlag('hungryships', true); api.setFlag('opened', true); }
      if (t > 7) { P.cover(false); this._h = false; this.mother.visible = false; this.shield.material.opacity = 0.0; this.shieldWire.material.opacity = 0; return true; }
    }
    return false;
  },
});
