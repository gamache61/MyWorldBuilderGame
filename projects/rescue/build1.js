/* ============================================================
   THE RESCUE · BUILD 1 · THE LANDING FIELD
   Keep this file in projects/rescue next to 56-rescue.html.
   The stranger is hurt and out of power. The Keeper said: help from a distance first, with fuel left in the open, a rescue craft that stays outside the shield, a guard ship beside it and a medic aboard. The landing field and transporter are already there, so it begins at build 2. The Factory District is loaded, finished, from its own files.
   ============================================================ */

/* ---------- shared by every mine build (one copy, kept on window) ---------- */
window.YARD = window.YARD || {
  _t: -1, people: [],
  ground(api, x, z) { return Math.max(window.coaxH ? window.coaxH(x, z) : api.DECK_TOP - 0.4, window.SEA_Y !== undefined ? window.SEA_Y : -1e9); },
  // the seabed (for piers and docks standing in the water)
  seabed(api, x, z) { return window.coaxH ? window.coaxH(x, z) : api.DECK_TOP - 30; },
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
  // a mine build made of fixed parts beamed in by the transporter.
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
        try { def.make(type, sl.k, g, add, F, api, sl); } catch (e) { console.warn('mine part', type, e); }
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
  // clear the wild forest trees off the yard ground east of the Factory District
  clearYard(api) {
    const land = api.placed.find(p => p.piece && p.piece.parent); if (!land) { this._kryos = false; return; }
    const T = api.THREE; let root = land.piece; while (root.parent) root = root.parent; const m4 = new T.Matrix4(), v = new T.Vector3(), zero = new T.Matrix4().makeScale(0, 0, 0);
    root.traverse(o => { if (!o.isInstancedMesh || o.count < 5000) return; let hit = false;
      for (let i = 0; i < o.count; i++) { o.getMatrixAt(i, m4); v.setFromMatrixPosition(m4); if (v.x > 1000 && v.x < 2200 && v.z > -600 && v.z < 600) { o.setMatrixAt(i, zero); hit = true; } }
      if (hit) o.instanceMatrix.needsUpdate = true; });
  },
  update(api, dt, t) {
    if (!this._kryos && api.placed && api.placed.length) { this._kryos = true; try { this.clearYard(api); } catch (e) { console.warn('mine ground', e); } }
    if (!this._fin && api.placed && api.placed.length) { this._fin = true; this.finished(api); }
    if (this.bgTick) this.bgTick(api, dt, t);
    if (t === this._t) return; this._t = t;
    if (window.WB_PERSON && this.people.length) for (const q of this.people.splice(0)) { try { const c = window.WB_PERSON(q.group, q.o, q.act, q.x, q.y, q.z, q.ry || 0, q.extra || {}); if (c && q.extra && q.extra.scale) c.P.root.scale.setScalar(q.extra.scale); } catch (e) { } }
    if (this.onTick) this.onTick(api, dt, t);
  },
};

/* ---------- mine helpers, shared by every build ---------- */
(function () {
  const P = window.YARD;
  // bright colours (one copy, shared by every build)
  P.fun = function (api) {
    if (this._fun) return this._fun; const T = api.THREE, std = (c, r = 0.6, m = 0.1) => new T.MeshStandardMaterial({ color: c, roughness: r, metalness: m });
    return this._fun = { red: std(0xe0402e), blue: std(0x2f7fe0), green: std(0x3fb04a), purple: std(0x8a4fd0), orange: std(0xf08a1a), pink: std(0xf06aa8), yellow: std(0xf2c41a),
      soft: std(0x3a8f7a, 0.95), soft2: std(0xc8643a, 0.95), sand: std(0xe8d49a, 1), grass: std(0x5aa64a, 1), path: std(0xd8cdb6, 0.9), rope: std(0xc8a878, 0.9) };
  };
  // stone, timber, roofs and glass for the mine (one copy, shared by every build)
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
  // simple standing figures (two shapes each) for most of the crowd, so the mine stays smooth; a few real people walk about
  P.figure = (api, add, x, y, z, s = 0.6, n = 0, parent) => { const T = api.THREE, C = P.fun(api), cols = ['red', 'blue', 'green', 'yellow', 'pink', 'purple', 'orange'];
    add(new T.CapsuleGeometry(0.34 * s / 0.6 * 0.6, 1.0 * s, 3, 6), C[cols[n % 7]], x, y + 0.9 * s, z, true, parent); add(new T.SphereGeometry(0.26 * s, 8, 6), C.skin || (C.skin = new T.MeshStandardMaterial({ color: [0xe0b090, 0xb07850, 0x8a5a3a, 0xf0c8a0][n % 4], roughness: 0.8 })), x, y + 1.75 * s, z, true, parent); };
})();

/* ---------- the finished Factory District, loaded from their own build files ---------- */
(function () {
  const P = window.YARD;
  const me = (document.currentScript && document.currentScript.src) || '';
  P.base = /\/rescue\/build1\.js/i.test(me) ? me.replace(/rescue\/build1\.js.*$/i, '') : 'projects/';
  const loadOne = (src) => new Promise(res => { const s = document.createElement('script'); s.src = src; s.onload = () => res(true); s.onerror = () => { s.remove(); res(false); }; document.head.appendChild(s); });
  P.finished = async function (api) {
    const land = api.placed.find(p => p.piece && p.piece.parent); if (!land) { this._fin = false; return; }
    for (let w = 0; w < 300 && (window.AEGIS_BUILDS || []).length < 5; w++) await new Promise(r => setTimeout(r, 200));   // let this chapter's own five builds finish loading first
    const parent = land.piece.parent, keep = window.AEGIS_BUILDS;
    const bgApi = Object.create(api, { flag: { value: () => true }, setFlag: { value: () => { } }, count: { value: () => 99 }, kitsLeft: { value: () => 0 } });
    // bring one finished project in from its own build files and put every part of it in the world
    const bring = async (folder, label, first, still) => {
      const list = []; window.AEGIS_BUILDS = list;
      await loadOne(P.base + folder + '/station.js');
      for (let i = first; i <= 30; i++) { const ok = await loadOne(P.base + folder + '/build' + i + '.js'); if (!ok) break; }
      window.AEGIS_BUILDS = keep;
      const put = (B, p) => {
        try {
          const g = B.make(p.type, bgApi, p); g.position.set(p.x, p.y !== undefined ? p.y : api.DECK_TOP, p.z); g.rotation.y = (p.rot || 0) * Math.PI / 2;
          g.traverse(o => { if (o.isMesh && !o.material.isMeshBasicMaterial) { o.castShadow = true; o.receiveShadow = true; } });
          parent.add(g);
        } catch (e) { console.warn('Yard: finished ' + label + ' part', B.id, p.type, e); }
      };
      const mine = [];
      for (const B of list.sort((a, b) => a.id - b.id)) {
        if (B.id === 1 || !B.setup || !B.make) continue;   // the landing field is already here
        await new Promise(r => setTimeout(r, 0));   // let the game breathe between builds
        try {
          B.setup(bgApi);
          for (const sg of B.suggest || []) put(B, { type: sg.type, x: sg.x, z: sg.z, rot: sg.rot || 0, b: B.id });
          (B.slots || []).forEach((sl, s) => put(B, { s, type: sl.type, x: sl.x, z: sl.z, y: sl.y, b: B.id }));
          if (!still) mine.push(B);
        } catch (e) { console.warn('Yard: finished ' + label + ' build', B.id, e); }
      }
      return mine;
    };
    this.bgBuilds = [];
    try { this.bgBuilds = await bring('factorydistrict', 'Factory District', 1, false); } catch (e) { console.warn('Yard: finished Factory District', e); }
    // the Factory District's lights keep moving
    this.bgTick = (api2, dt, t) => { for (const B of this.bgBuilds) if (B.tick && B.id !== 6) try { B.tick(bgApi, dt, t); } catch (e) { } };
  };

  /* ---------- ships: one shape for every water ship the yard builds ---------- */
  // kind: 'ferry', 'fisher', 'research', or 'trade' (a big Earth cargo ship with container stacks)
  P.ship = function (api, add, parent, kind, x, y, z, ry = 0) {
    const T = api.THREE, S = P.hm(api), F = P.mats(api), g = new T.Group(); g.position.set(x, y, z); g.rotation.y = ry; parent.add(g); g.userData.keep = true;
    const a = (geo, m, X, Y, Z) => add(geo, m, X, Y, Z, true, g);
    const D = { ferry: [70, 15, 0xf2f4f6, 0x2f6690], fisher: [26, 7, 0x2f7fe0, 0xf2f4f6], research: [52, 11, 0xf08a1a, 0xf2f4f6], trade: [118, 18, 0x39465a, 0xd9a21b] }[kind] || [40, 10, 0xf2f4f6, 0x2f6690];
    const [L, W, hullC, trimC] = D, hull = P._shipM = P._shipM || {}, hm = c => hull[c] || (hull[c] = new T.MeshStandardMaterial({ color: c, roughness: 0.5, metalness: 0.2 }));
    // the hull: a long box with a pointed bow, dark below the waterline
    a(new T.BoxGeometry(L * 0.8, W * 0.35, W), hm(0x23303c), -L * 0.05, W * 0.05, 0);
    a(new T.BoxGeometry(L * 0.8, W * 0.35, W), hm(hullC), -L * 0.05, W * 0.38, 0);
    const bow = a(new T.CylinderGeometry(0, W * 0.5, L * 0.25, 4, 1).rotateZ(-Math.PI / 2).rotateX(Math.PI / 4), hm(hullC), L * 0.475, W * 0.22, 0); bow.scale.set(1, 1.0, 1.0);
    a(new T.BoxGeometry(L * 0.82, 0.4, W + 0.2), hm(trimC), -L * 0.04, W * 0.56, 0);
    if (kind === 'ferry') {
      a(new T.BoxGeometry(L * 0.6, W * 0.3, W * 0.85), hm(0xf2f4f6), -L * 0.08, W * 0.72, 0);
      a(new T.BoxGeometry(L * 0.58, W * 0.08, W * 0.87), S.dim, -L * 0.08, W * 0.75, 0);
      a(new T.BoxGeometry(L * 0.4, W * 0.26, W * 0.7), hm(0xf2f4f6), -L * 0.1, W * 1.0, 0);
      a(new T.BoxGeometry(L * 0.38, W * 0.07, W * 0.72), S.dim, -L * 0.1, W * 1.02, 0);
      a(new T.BoxGeometry(L * 0.12, W * 0.22, W * 0.5), S.glass, L * 0.14, W * 1.2, 0);
      a(new T.CylinderGeometry(W * 0.12, W * 0.14, W * 0.5, 12), hm(trimC), -L * 0.25, W * 1.35, 0);
    } else if (kind === 'fisher') {
      a(new T.BoxGeometry(L * 0.25, W * 0.6, W * 0.7), hm(0xf2f4f6), L * 0.12, W * 0.9, 0);
      a(new T.BoxGeometry(L * 0.22, W * 0.15, W * 0.72), S.glass, L * 0.12, W * 1.05, 0);
      a(new T.CylinderGeometry(0.25, 0.3, W * 1.8, 6), F.steel, -L * 0.15, W * 1.4, 0);
      const boom = a(new T.CylinderGeometry(0.15, 0.15, L * 0.4, 6).rotateZ(Math.PI / 2.6), F.steel, -L * 0.3, W * 1.5, 0);
      a(new T.BoxGeometry(L * 0.2, W * 0.2, W * 0.6), P.fun(api).yellow, -L * 0.32, W * 0.7, 0);
    } else if (kind === 'trade') {
      const cols = [0xc8643a, 0x2f7fe0, 0xe8c13a, 0x3fb04a, 0xf2f4f6, 0x8a4fd0];
      for (let i = 0; i < 6; i++) for (let j = 0; j < 2; j++) for (let k = 0; k < 1 + ((i + j) % 3); k++) a(new T.BoxGeometry(L * 0.1, W * 0.2, W * 0.34), hm(cols[(i * 2 + j + k) % 6]), L * 0.3 - i * L * 0.115, W * 0.7 + k * W * 0.2, (j - 0.5) * W * 0.4);
      a(new T.BoxGeometry(L * 0.14, W * 0.7, W * 0.8), hm(0xf2f4f6), -L * 0.36, W * 0.95, 0);
      a(new T.BoxGeometry(L * 0.145, W * 0.12, W * 0.82), S.glass, -L * 0.36, W * 1.1, 0);
      a(new T.CylinderGeometry(0.3, 0.4, W * 1.0, 6), F.steel, -L * 0.36, W * 1.75, 0);
      for (const sd of [-1, 1]) for (const x of [-0.3, 0, 0.3]) a(new T.CylinderGeometry(W * 0.12, W * 0.14, 0.6, 14), F.engine, L * x, -W * 0.14, sd * W * 0.32);
    } else {
      a(new T.BoxGeometry(L * 0.35, W * 0.5, W * 0.8), hm(0xf2f4f6), L * 0.05, W * 0.85, 0);
      a(new T.BoxGeometry(L * 0.33, W * 0.12, W * 0.82), S.glass, L * 0.05, W * 0.95, 0);
      a(new T.BoxGeometry(L * 0.15, W * 0.35, W * 0.5), hm(0xf2f4f6), L * 0.12, W * 1.25, 0);
      a(new T.CylinderGeometry(0.4, 0.5, W * 1.6, 8), F.steel, -L * 0.2, W * 1.3, 0);
      const arm = a(new T.BoxGeometry(L * 0.3, 0.6, 0.6), P.fun(api).yellow, -L * 0.32, W * 1.9, 0); arm.rotation.z = 0.35;
      a(new T.SphereGeometry(W * 0.12, 12, 8), F.white, L * 0.12, W * 1.6, 0);
    }
    a(new T.SphereGeometry(0.4, 8, 6), F.lamp, L * 0.55, W * 0.9, 0);
    return g;
  };
  P.hint = (text) => {
    let el = document.getElementById('playHint');
    if (!el) { el = document.createElement('div'); el.id = 'playHint'; el.style.cssText = 'position:fixed;left:50%;bottom:90px;transform:translateX(-50%);z-index:8;padding:8px 18px;background:rgba(8,20,35,.85);border:1px solid #80d8ff;border-radius:5px;color:#fff;font:600 13px "Segoe UI",Arial;letter-spacing:3px;text-align:center;pointer-events:none'; document.body.appendChild(el); }
    el.style.display = text ? 'block' : 'none'; if (text) el.textContent = text;
  };
  P.cover = (on, a, b) => {
    let el = document.getElementById('playCover');
    if (!el) { el = document.createElement('div'); el.id = 'playCover'; el.style.cssText = 'position:fixed;inset:0;z-index:8;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:0 40px;background:rgba(8,16,28,.92);color:#fff;font-family:"Segoe UI",Arial;opacity:0;transition:opacity 1.2s;pointer-events:none'; document.body.appendChild(el); }
    if (on) el.innerHTML = '<div style="font-size:26px;letter-spacing:7px;font-weight:600">' + a + '</div><div style="font-size:14px;letter-spacing:4px;margin-top:12px;color:#c8ecff">' + (b || '') + '</div>';
    el.style.opacity = on ? 1 : 0;
  };
})();

(window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push({
  id: 1,
  name: 'THE LANDING FIELD',
  brief: 'The landing field and transporter pad, already in place, so the yard starts straight away.',

  types: {
    DECK:  { code: 'SF', name: 'DECK TILE',  col: '#6c757d', deck: true, w: 40, d: 60, h: 2.5, droneR: 26 },
    CLAMP: { code: 'DC', name: 'DOCK CLAMP', col: '#2f6690', w: 12, d: 14, h: 16, droneR: 10, noRotate: true },
    MAST:  { code: 'HP', name: 'LIGHT MAST', col: '#b03a2e', w: 6,  d: 6,  h: 42, droneR: 8 },
    POWER: { code: 'SY', name: 'POWER UNIT', col: '#e8e1d1', w: 20, d: 13, h: 13, droneR: 14 },
    RTXPAD: { code: 'TX', name: 'TRANSPORTER PAD', col: '#7b4fa0', w: 14, d: 14, h: 5, droneR: 10, noRotate: true },
  },

  kits: { DECK: 24, CLAMP: 4, MAST: 4, POWER: 2, RTXPAD: 1 },

  // once the pad is down, the city has its own transporter (T beams the cargo)
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
    return { ok: true, msg: 'LANDING FIELD READY — PRESS L TO LAND THE AEGIS ARK AT SEASHORE' };
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
    const F = window.YARD.mats(api);
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
      window.YARD.person(g, { kind: 'worker', seed: 8101, female: true }, 'tablet', 2.2, 0, -8.2, Math.PI);
      return window.YARD.bake(api, g);
    }
    return g;
  },

  tick(api, dt, t) { window.YARD.update(api, dt, t); },
});
