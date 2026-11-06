/* ============================================================
   THE CHILDREN'S PLAYLAND · BUILD 1 · KRYOS LANDING FIELD
   Keep this file in projects/childrensplayland next to childrensplayland.html.
   The council chose the Children's Playland: a place for the children
   of Unity to gather and have fun. It is built in Kryos city, so the
   city's own landing field and transporter pad are already there when a
   new game starts: the Ark lands on them and the playland begins at
   build 2. This file still describes that field so it can be drawn. The playland
   is in Kryos city itself, on the first stretch of the east boulevard
   beside the landing field, with the city's glass towers all round it.
   ============================================================ */

/* ---------- shared by every Children's Playland build (one copy, kept on window) ---------- */
window.PLAY = window.PLAY || {
  _t: -1, people: [],
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
  // a playland build made of fixed parts beamed in by the transporter.
  // def = { id, name, brief, types: { T: { code, name, col, w, d, h } }, at: { T: [[x, z], …] }, order: ['T', …],
  //         make(type, k, g, add, F, api, sl), stats(api, c), eye?, finish?: { label, cam: [[x,y,z],[x,y,z]], start(api), update(api, dt, k) -> done } }
  build(def) {
    const PLAY = this;
    const types = {}; for (const [t, T] of Object.entries(def.types)) types[t] = { fixed: true, fx: 3, ...T };
    const kits = {}; for (const t of def.order) kits[t] = def.at[t].length;
    const B = {
      id: def.id, name: def.name, brief: def.brief, types,
      trips: [{ name: def.name, kits, finish: def.finish ? 'custom' : 'unload' }],
      finishLabel: def.finish ? def.finish.label : undefined,
      setup(api) {
        const V = (x, y, z) => new api.THREE.Vector3(x, y, z), E = def.eye || [-170, 120, 230];
        this.slots = [];
        for (const t of def.order) def.at[t].forEach(([x, z], k) => {
          this.slots.push({ type: t, k, x, z, y: PLAY.ground(api, x, z), fx: V(0, Math.min(types[t].h || 6, 30) / 2, 0), look: V(0, 6, 0), eye: V(...E) });
        });
        if (def.finish) this.finishCam = [V(...def.finish.cam[0]), V(...def.finish.cam[1])];
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
        try { def.make(type, sl.k, g, add, F, api, sl); } catch (e) { console.warn('playland part', type, e); }
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
  // Kryos city all round the playland: the same blue glass towers, white low-rise blocks with roof
  // gardens and green boulevard as the city itself. The playland takes the place of the first
  // stretch of the east boulevard, right beside the landing field at the heart of the city.
  kryos(api) {
    const land = api.placed.find(p => p.piece && p.piece.parent); if (!land) { this._kryos = false; return; }
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
    // keep the playland itself clear
    const clear = (x, z, r) => x + r > 225 && x - r < 905 && z + r > -290 && z - r < 340;
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
    for (const [a, b] of [[-1300, -170], [905, 1300]]) { const L = b - a, gr = add(new T.BoxGeometry(L, 0.3, 120), grass, (a + b) / 2, Y((a + b) / 2, 0) + 0.15, 0); gr.castShadow = false; for (let x = a + 20; x < b; x += 40) for (const sd of [-1, 1]) tree(x, sd * 50, Y(x, sd * 50), 1); }
    land.piece.parent.add(this.bake(api, g));
  },
  update(api, dt, t) {
    if (!this._kryos && api.placed && api.placed.length) { this._kryos = true; try { this.kryos(api); } catch (e) { console.warn('kryos city', e); } }
    if (t === this._t) return; this._t = t;
    if (window.WB_PERSON && this.people.length) for (const q of this.people.splice(0)) { try { const c = window.WB_PERSON(q.group, q.o, q.act, q.x, q.y, q.z, q.ry || 0, q.extra || {}); if (c && q.extra && q.extra.scale) c.P.root.scale.setScalar(q.extra.scale); } catch (e) { } }
    if (this.onTick) this.onTick(api, dt, t);
  },
};

/* ---------- playland helpers, shared by every build ---------- */
(function () {
  const P = window.PLAY;
  // bright colours for the playland (one copy, shared by every build)
  P.fun = function (api) {
    if (this._fun) return this._fun; const T = api.THREE, std = (c, r = 0.6, m = 0.1) => new T.MeshStandardMaterial({ color: c, roughness: r, metalness: m });
    return this._fun = { red: std(0xe0402e), blue: std(0x2f7fe0), green: std(0x3fb04a), purple: std(0x8a4fd0), orange: std(0xf08a1a), pink: std(0xf06aa8), yellow: std(0xf2c41a),
      soft: std(0x3a8f7a, 0.95), soft2: std(0xc8643a, 0.95), sand: std(0xe8d49a, 1), grass: std(0x5aa64a, 1), path: std(0xd8cdb6, 0.9), rope: std(0xc8a878, 0.9) };
  };
  P.kid = seed => { const o = P.civ(seed); o.shirt = ['#e0402e', '#2f7fe0', '#3fb04a', '#f2c41a', '#f06aa8', '#8a4fd0', '#f08a1a'][seed % 7]; return o; };
  // simple standing figures (two shapes each) for most of the crowd, so the playland stays smooth; a few real people walk about
  P.figure = (api, add, x, y, z, s = 0.6, n = 0, parent) => { const T = api.THREE, C = P.fun(api), cols = ['red', 'blue', 'green', 'yellow', 'pink', 'purple', 'orange'];
    add(new T.CapsuleGeometry(0.34 * s / 0.6 * 0.6, 1.0 * s, 3, 6), C[cols[n % 7]], x, y + 0.9 * s, z, true, parent); add(new T.SphereGeometry(0.26 * s, 8, 6), C.skin || (C.skin = new T.MeshStandardMaterial({ color: [0xe0b090, 0xb07850, 0x8a5a3a, 0xf0c8a0][n % 4], roughness: 0.8 })), x, y + 1.75 * s, z, true, parent); };
})();

(window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push({
  id: 1,
  name: 'KRYOS LANDING FIELD',
  brief: 'Kryos city\u2019s own landing field and transporter pad, already in place in the middle of the city, so the playland starts straight away.',

  types: {
    DECK:  { code: 'SF', name: 'DECK TILE',  col: '#6c757d', deck: true, w: 40, d: 60, h: 2.5, droneR: 26 },
    CLAMP: { code: 'DC', name: 'DOCK CLAMP', col: '#2f6690', w: 12, d: 14, h: 16, droneR: 10, noRotate: true },
    MAST:  { code: 'HP', name: 'LIGHT MAST', col: '#b03a2e', w: 6,  d: 6,  h: 42, droneR: 8 },
    POWER: { code: 'SY', name: 'POWER UNIT', col: '#e8e1d1', w: 20, d: 13, h: 13, droneR: 14 },
    RTXPAD: { code: 'TX', name: 'TRANSPORTER PAD', col: '#7b4fa0', w: 14, d: 14, h: 5, droneR: 10, noRotate: true },
  },

  kits: { DECK: 24, CLAMP: 4, MAST: 4, POWER: 2, RTXPAD: 1 },

  // once the pad is down, the playland has its own transporter (T beams the cargo)
  stationTX: [['RTXPAD', 1]],

  grid: { x: [80, 120, 160], z: [-270, -210, -150, -90, -30, 30, 90, 150, 210, 270] },

  zones: [
    { x0: 60, x1: 180, z0: -180, z1: 180, color: 0x40d0ff, name: 'LANDING PAD' },
    { x0: 60, x1: 180, z0: -40, z1: 180, color: 0x6080ff, name: 'CLAMP ZONE' },
  ],

  land: { x: 120, z: 0 },

  padDone(api) {
    const g = this.grid; let pad = 0, need = 0;
    for (const x of g.x) for (const z of g.z) if (Math.abs(z) < 180) { need++; if (api.deckAt(x, z)) pad++; }
    return { pad, need };
  },

  rule(type, x, z, rot, api) {
    const [w, d] = api.footprint(type, rot);
    if (type.startsWith('SUPPLY')) {
      if (Math.abs(z) - d / 2 < 182) return 'STACK SUPPLY CRATES AT THE ENDS OF THE FIELD, OFF THE LANDING PAD';
    }
    if (type === 'MAST' || type === 'POWER') {
      if (Math.abs(z) - d / 2 < 205) return 'KEEP TALL PARTS OFF THE LANDING FIELD — PUT THEM AT THE ENDS';
    }
    if (type === 'RTXPAD') {
      if (Math.abs(z) - d / 2 < 182) return 'THE TRANSPORTER PAD GOES AT AN END OF THE FIELD, OFF THE LANDING PAD';
      const { pad, need } = this.padDone(api);
      if (pad < need || api.count('CLAMP') < 4) return 'FINISH THE LANDING PAD AND ITS 4 CLAMPS BEFORE THE TRANSPORTER PAD';
    }
    if (type === 'CLAMP') {
      if (z - d / 2 < -40 || z + d / 2 > 180) return 'CLAMPS GO IN THE CLAMP ZONE (FRONT HALF OF THE PAD — WINGS ARE AT THE BACK)';
      if (Math.abs(x - 120) < 44) return 'CLAMPS GO ON THE OUTER EDGE OF THE PAD, BESIDE THE HULL';
    }
    return null;
  },

  ready(api) {
    const { pad, need } = this.padDone(api);
    const left = api.kitsLeft();
    if (left > 0) return { ok: false, msg: left + ' CRATE' + (left > 1 ? 'S' : '') + ' STILL TO UNLOAD' };
    if (pad < need) return { ok: false, msg: 'LANDING PAD NEEDS ' + (need - pad) + ' MORE DECK TILE' + (need - pad > 1 ? 'S' : '') + ' — PICK UP SPARE TILES AND MOVE THEM' };
    if (api.count('CLAMP') < 4) return { ok: false, msg: 'NEEDS 4 DOCK CLAMPS' };
    if (api.count('RTXPAD') < 1) return { ok: false, msg: 'NEEDS THE TRANSPORTER PAD' };
    return { ok: true, msg: 'LANDING FIELD READY — PRESS L TO LAND THE AEGIS ARK AT THE PLAYLAND' };
  },

  stats(api) {
    const { pad, need } = this.padDone(api);
    return [
      ['DECK AREA', (api.count('DECK') * 2400).toLocaleString() + ' m²'],
      ['LANDING PAD', pad + ' / ' + need + ' tiles'],
      ['POWER', api.count('POWER') * 12 + ' MW'],
      ['LIGHT MASTS', api.count('MAST') + ' / 4'],
      ['DOCK CLAMPS', api.count('CLAMP') + ' / 4'],
      ['TRANSPORTER', api.count('RTXPAD') ? 'ONLINE' : 'NOT YET'],
    ];
  },

  suggest: (() => {
    const s = [];
    for (const z of [-150, -90, -30, 30, 90, 150, -210, 210]) for (const x of [120, 80, 160]) s.push({ type: 'DECK', x, z });
    for (const [x, z] of [[70, 150], [170, 150], [70, 30], [170, 30]]) s.push({ type: 'CLAMP', x, z });
    for (const [x, z] of [[66, 234], [174, 234], [66, -234], [174, -234]]) s.push({ type: 'MAST', x, z });
    for (const z of [226, -226]) s.push({ type: 'POWER', x: 120, z });
    s.push({ type: 'RTXPAD', x: 120, z: -196 });
    return s;
  })(),

  make(type, api, p) {
    const { THREE, M } = api;
    const g = new THREE.Group();
    const add = (geo, mat, x, y, z) => { const m = new THREE.Mesh(geo, mat); m.position.set(x, y, z); m.castShadow = m.receiveShadow = true; g.add(m); return m; };
    const F = window.PLAY.mats(api);
    const S = this._mats || (this._mats = (() => {
      const deckTex = (centre) => api.canvasTex(512, 768, (c, w, h) => {
        c.fillStyle = '#3d424a'; c.fillRect(0, 0, w, h);
        for (let y = 0; y < h; y += 64) for (let x = 0; x < w; x += 64) { const v = 56 + Math.random() * 16 | 0; c.fillStyle = `rgb(${v},${v + 3},${v + 9})`; c.fillRect(x + 2, y + 2, 60, 60); }
        for (let i = 0; i < w; i += 28) { c.fillStyle = (i / 28) % 2 ? '#1b1b1b' : '#e0a92a'; c.fillRect(i, 0, 28, 12); c.fillRect(i, h - 12, 28, 12); }
        if (centre) {
          c.fillStyle = '#f2f2f2'; for (let y = 30; y < h; y += 90) c.fillRect(w / 2 - 8, y, 16, 50);
          c.strokeStyle = '#e0a92a'; c.lineWidth = 10; for (let y = 120; y < h; y += 240) { c.beginPath(); c.moveTo(w / 2 - 90, y + 50); c.lineTo(w / 2, y); c.lineTo(w / 2 + 90, y + 50); c.stroke(); }
        }
      });
      return {
        side: new THREE.MeshStandardMaterial({ color: 0x2a2e35, metalness: 0.7, roughness: 0.45 }),
        top: [deckTex(false), deckTex(true)].map(t => new THREE.MeshStandardMaterial({ map: t, metalness: 0.5, roughness: 0.55 })),
        steel: new THREE.MeshStandardMaterial({ color: 0x9aa3ad, metalness: 0.85, roughness: 0.35 }),
        txGlow: new THREE.MeshBasicMaterial({ color: new THREE.Color(0.7, 0.5, 1.0).multiplyScalar(2.2), toneMapped: false }),
      };
    })());

    if (type === 'DECK') {
      add(new THREE.BoxGeometry(39.6, 2.5, 59.6), [S.side, S.side, S.top[p.x === 120 ? 1 : 0], S.side, S.side, S.side], 0, -1.25, 0);
      for (const x of [-15, 15]) add(new THREE.BoxGeometry(2, 3, 58), M.gun, x, -4, 0);
      for (const z of [-25, 0, 25]) add(new THREE.BoxGeometry(34, 1.5, 1.5), M.gun, 0, -4.5, z);
      for (const [w, d, x, z] of [[39.6, 0.3, 0, 29.7], [39.6, 0.3, 0, -29.7], [0.3, 59.6, 19.7, 0], [0.3, 59.6, -19.7, 0]]) add(new THREE.BoxGeometry(w, 0.25, d), M.strip, x, 0.05, z);
    } else if (type === 'CLAMP') {
      const dir = p.x < 120 ? 1 : -1;
      add(new THREE.BoxGeometry(12, 3, 14), M.yellow, 0, 1.5, 0);
      add(new THREE.BoxGeometry(6, 12, 8), M.armor, 0, 8, 0);
      const piv = new THREE.Group(); piv.position.set(dir * 2, 14, 0); g.add(piv);
      const arm = new THREE.Mesh(new THREE.BoxGeometry(2.2, 13, 3.4), M.yellow); arm.position.y = 6.5; arm.castShadow = true; piv.add(arm);
      const pad = new THREE.Mesh(new THREE.BoxGeometry(3.2, 1.6, 6), M.dark); pad.position.y = 13; piv.add(pad);
      g.userData.arm = piv; g.userData.dir = dir;
      const l = new THREE.Mesh(new THREE.SphereGeometry(0.6, 8, 6), new THREE.MeshBasicMaterial({ color: 0x40ff80 })); l.position.set(0, 14.6, 0); g.add(l);
    } else if (type === 'MAST') {
      add(new THREE.CylinderGeometry(2.4, 3, 2, 12), M.gun, 0, 1, 0);
      add(new THREE.CylinderGeometry(0.8, 1.2, 40, 10), S.steel, 0, 21, 0);
      add(new THREE.BoxGeometry(6, 1.6, 3), M.dark, 0, 40.5, 0);
      const lamp = add(new THREE.BoxGeometry(5.4, 0.6, 2.4), new THREE.MeshBasicMaterial({ color: new THREE.Color(0xfff2d8).multiplyScalar(3) }), 0, 39.6, 0); lamp.castShadow = false;
      const red = new THREE.Mesh(new THREE.SphereGeometry(0.8, 8, 6), new THREE.MeshBasicMaterial({ color: 0xff3020 })); red.position.y = 42; g.add(red);
      api.blink(red, 1.6, 0xff3020);
      const pl = new THREE.PointLight(0xfff2d8, 9000, 140, 2); pl.position.set(0, 38, 0); g.add(pl);
    } else if (type === 'POWER') {
      add(new THREE.BoxGeometry(20, 8, 13), M.armor, 0, 4, 0);
      for (const x of [-6, 0, 6]) { add(new THREE.CylinderGeometry(2, 2, 9, 16), M.gun, x, 8.5, 0); add(new THREE.TorusGeometry(2.1, 0.25, 6, 24), M.strip, x, 12.6, 0).rotation.x = Math.PI / 2; }
      add(new THREE.BoxGeometry(20.2, 0.4, 0.4), M.strip, 0, 7.9, 6.6);
    } else if (type === 'RTXPAD') {
      add(new THREE.CylinderGeometry(7, 7.4, 1.2, 32), M.armor, 0, 0.6, 0);
      add(new THREE.CylinderGeometry(5.6, 5.6, 0.3, 32), F.dark, 0, 1.35, 0);
      const ring = add(new THREE.TorusGeometry(5.2, 0.22, 8, 48), S.txGlow, 0, 1.55, 0); ring.rotation.x = Math.PI / 2; ring.castShadow = false;
      for (let i = 0; i < 4; i++) {
        const a = i / 4 * Math.PI * 2 + Math.PI / 4;
        add(new THREE.BoxGeometry(0.9, 4.6, 0.9), S.steel, Math.cos(a) * 6.4, 3.4, Math.sin(a) * 6.4);
        const tip = add(new THREE.SphereGeometry(0.45, 10, 8), S.txGlow, Math.cos(a) * 6.4, 5.9, Math.sin(a) * 6.4); tip.castShadow = false;
      }
      add(new THREE.BoxGeometry(3, 1.6, 1.2), M.dark, 0, 2, -6.6);
      window.PLAY.person(g, { kind: 'worker', seed: 8101, female: true }, 'tablet', 2.2, 0, -8.2, Math.PI);
      return window.PLAY.bake(api, g);
    }
    return g;
  },

  tick(api, dt, t) { window.PLAY.update(api, dt, t); },
});
