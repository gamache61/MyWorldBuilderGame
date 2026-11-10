/* ============================================================
   WORLD BUILDER · TOWNSPEOPLE
   Keep this file at projects/townspeople.js.
   Every chapter file loads it right after chapterlock.js.

   It fills the places people live and work with people walking
   about: streets, plazas, parks, markets, yards and quays. It
   works on every build without the build files having to place
   anyone:
   - it looks down on the finished parts and maps where there is
     open ground to walk on (not roofs, walls, trees or water);
   - people stroll over that ground, stop now and then, and keep
     off the landing field;
   - the people close to the camera are the same detailed people
     as everywhere else in the game, the far ones are simple
     walking figures, so the game stays smooth;
   - fewer people are out at night.

   SETTINGS are just below: which chapters have townspeople, how
   many, how many are workers or children.
   ============================================================ */
(function () {
  'use strict';

  /* ---------- settings, by chapter file name (without the number and .html) ---------- */
  // on: townspeople in this chapter · work: share in work vests and hard hats · kids: share of children
  // density: 1 = normal, 2 = twice as many · skip: part types nobody walks on
  const SETTINGS = {
    default:          { on: true, work: 0.10, kids: 0.12, density: 1, skip: [] },
    havenreach:       { on: false },            // a station in space
    moonmines:        { on: false },            // no air on the moon Vesh
    veshtown:         { on: false },
    kryoscity:        { work: 0.08, kids: 0.12, skip: ['KPAD', 'KCRAFT', 'KTRAIN', 'KTRACK', 'KPOOL', 'KCONDUIT'] },
    seashore:         { work: 0.15, kids: 0.15, skip: ['KPAD', 'KCRAFT', 'KTURB', 'KCABLE', 'KKELP', 'KSHIPA', 'KSHIPB', 'KRVESSEL', 'KFERRY', 'KBOAT'] },
    councilhall:      { work: 0.05, kids: 0.08, skip: ['CPOOL', 'CLINE', 'CHEART'] },
    keepersgate:      { work: 0.30, kids: 0.05, skip: ['RING', 'RINGU', 'KEY', 'EMIT', 'CONDUIT', 'FOOT', 'PYLON'] },
    farmlands:        { work: 0.55, kids: 0.05, density: 0.7, skip: ['RESERVOIR', 'CANAL', 'SIDE', 'FARMBOT', 'SOLAR'] },
    oredepot:         { work: 0.90, kids: 0, density: 0.8, skip: ['COLLAR', 'GUIDE', 'DISTRICT', 'SKYLIGHT'] },
    returnfleet:      { work: 0.45, kids: 0.10, skip: ['PAD', 'ARKHULL', 'ARKENGINE', 'CRADLE'] },
    factorydistrict:  { work: 0.90, kids: 0, skip: ['ORECONV', 'TRUCK'] },
    homewardfleet:    { work: 0.60, kids: 0.08, skip: ['ARKHULL', 'ARKENGINE'] },
    childrensplayland:{ work: 0.03, kids: 0.55, density: 1.4 },
    greatschool:      { work: 0.05, kids: 0.40, density: 1.2 },
    newhomes:         { work: 0.05, kids: 0.25, density: 1.2 },
    houseofhealing:   { work: 0.05, kids: 0.10 },
    shoppingcentre:   { work: 0.05, kids: 0.15, density: 1.4 },
    orerun:           { work: 0.90, kids: 0, density: 0.8, skip: ['FPAD', 'FREIGHTER', 'CONVEYOR'] },
    animalcare:       { work: 0.25, kids: 0.20, skip: ['ENCLOSURE'] },
    skyrail:          { work: 0.15, kids: 0.12, skip: ['PYLON', 'CITYSPAN', 'RAMP', 'FORESTTRACK', 'VIADUCT', 'SKYPOD'] },
    seashoreshipyard: { work: 0.80, kids: 0.02, skip: ['FERRY', 'FISHER', 'RESEARCH'] },
    homewardtwo:      { work: 0.05, kids: 0.25, density: 1.2 },
    earthtradeport:   { work: 0.85, kids: 0.02, skip: ['TRADESHIP'] },
    crystalmines:     { work: 0.85, kids: 0.0 },
    guardianyard:     { work: 0.8, kids: 0.0 },
    starwatcharray:   { work: 0.6, kids: 0.1 },
  };
  const MAX_PEOPLE = 260;       // most simple walking figures at once
  const MAX_DETAILED = 22;      // most detailed people at once (the ones nearest the camera)
  const AREA_PER_PERSON = 110;  // square metres of open ground for each person
  const NIGHT_SHARE = 0.4;      // share of the people still out at night

  const chapter = decodeURIComponent(location.pathname.split('/').pop() || '').toLowerCase().replace(/\.html?$/, '').replace(/^\d+[-_ ]*/, '');
  const CFG = Object.assign({}, SETTINGS.default, SETTINGS[chapter] || {});
  const SKIP = new Set(CFG.skip || []);

  /* ---------- the ground map: 256 m tiles, 1 m cells ---------- */
  const S = 256, W = S + 2, BL = 16, NB = S / BL, L_SOLID = 20, L_WATER = 21;
  const APRON = 9, STEP = 0.45, BAND_LO = -1.5, BAND_HI = 6, SEED_LO = -0.8, SEED_HI = 1.6;
  const tiles = new Map(), recs = [], seen = new WeakSet();
  let E = null, T = null, ready = false, navCam, rt, depthMat, buf, waterMeshes = 0;
  let agents = [], pool = [], fig = null, lastT = 0, scanT = 0, lodT = 0, blockT = 0, blocks = [], blockSum = 0, poolMakeT = 0, started = 0, mapT = 0;
  const rnd = Math.random;

  function isWater(m) {
    if (!m || !m.color || !m.isMeshStandardMaterial) return false;
    const c = m.color; return m.roughness <= 0.12 && m.metalness >= 0.3 && c.b > c.r * 1.4 && c.b >= c.g;
  }
  function tagPiece(piece, roots) {
    piece.traverse(o => {
      if (!o.isMesh) return;
      for (let p = o; p && p !== piece; p = p.parent) if (roots.has(p)) return;
      const m = Array.isArray(o.material) ? o.material[0] : o.material; if (!m || m.visible === false) return;
      if (isWater(m)) { o.layers.enable(L_WATER); waterMeshes++; return; }
      if (m.transparent && m.opacity < 0.55) return;
      o.layers.enable(L_SOLID);
    });
  }
  function tileAt(ti, tj, make) {
    const k = ti + ',' + tj; let t = tiles.get(k);
    if (!t && make) { t = { ti, tj, h: null, open: null, blocks: new Uint16Array(NB * NB), n: 0, dirtyAt: 0, dirty: false }; tiles.set(k, t); }
    return t;
  }
  function markDirty(r, now) {
    for (let ti = Math.floor((r.x0 - 3) / S); ti <= Math.floor((r.x1 + 3) / S); ti++)
      for (let tj = Math.floor((r.z0 - 3) / S); tj <= Math.floor((r.z1 + 3) / S); tj++) { const t = tileAt(ti, tj, true); t.dirty = true; t.dirtyAt = now; }
  }
  // find new and removed parts
  function scan(now) {
    const placed = E.placed; let roots = null;
    for (let i = recs.length - 1; i >= 0; i--) if (!recs[i].piece.parent || placed.indexOf(recs[i].p) < 0) { markDirty(recs[i], now); recs.splice(i, 1); }
    for (const p of placed) {
      if (!p.piece || p.busy || seen.has(p.piece)) continue;
      seen.add(p.piece);
      if (!roots) roots = new Set(E.crowd.map(c => c.P && c.P.root));
      p.piece.updateMatrixWorld(true);
      const box = new T.Box3().setFromObject(p.piece); if (box.isEmpty()) continue;
      box.applyMatrix4(new T.Matrix4().copy(E.siteGroup.matrixWorld).invert());
      if (box.max.x - box.min.x > 4000 || box.max.z - box.min.z > 4000) continue;
      tagPiece(p.piece, roots);
      const field = p.b === 1 || E.isDeck(p.type);
      const r = { p, piece: p.piece, x0: box.min.x, x1: box.max.x, z0: box.min.z, z1: box.max.z, y0: box.min.y, y1: box.max.y, base: p.piece.position.y,
        field, walk: !field && p.type !== 'SUPPLY' && !SKIP.has(p.type) };
      recs.push(r); markDirty(r, now);
    }
  }
  function unpack(b, o) { return (b[o] / 16777216 + b[o + 1] / 65536 + b[o + 2] / 256 + b[o + 3]) / 256; }
  function shoot(t, layer, y0, y1, out) {
    const R = E.renderer, sc = E.scene;
    navCam.position.set(t.ti * S + S / 2, y1, t.tj * S + S / 2); navCam.far = y1 - y0; navCam.updateProjectionMatrix(); navCam.updateMatrixWorld(true);
    navCam.layers.set(layer);
    const pRT = R.getRenderTarget(), pBg = sc.background, pOv = sc.overrideMaterial, pSh = R.shadowMap.autoUpdate, pCol = R.getClearColor(new T.Color()), pA = R.getClearAlpha(), pAC = R.autoClear;
    try {
      sc.background = null; sc.overrideMaterial = depthMat; R.shadowMap.autoUpdate = false; R.autoClear = true;
      R.setRenderTarget(rt); R.setClearColor(0xffffff, 1); R.clear(); R.render(sc, navCam);
      R.readRenderTargetPixels(rt, 0, 0, W, W, buf);
    } finally {
      sc.background = pBg; sc.overrideMaterial = pOv; R.shadowMap.autoUpdate = pSh; R.autoClear = pAC; R.setRenderTarget(pRT); R.setClearColor(pCol, pA);
    }
    // pixel (px, py) -> my layout (i + 1) + (j + 1) * W, with j running along +z
    for (let py = 0; py < W; py++) for (let px = 0; px < W; px++) {
      const d = unpack(buf, (py * W + px) * 4);
      out[px + (W - 1 - py) * W] = d > 0.9995 ? -1e9 : y1 - d * (y1 - y0);
    }
  }
  function buildTile(t) {
    t.dirty = false;
    const X0 = t.ti * S - 1, Z0 = t.tj * S - 1, X1 = X0 + W, Z1 = Z0 + W;
    const near = recs.filter(r => r.x1 > X0 && r.x0 < X1 && r.z1 > Z0 && r.z0 < Z1);
    t.blocks.fill(0); t.n = 0;
    if (!near.some(r => r.walk)) { t.h = t.open = null; return; }
    let y0 = Infinity, y1 = -Infinity; for (const r of near) { y0 = Math.min(y0, r.y0, r.base); y1 = Math.max(y1, r.y1); }
    y0 -= 4; y1 += 4;
    const H = new Float32Array(W * W); shoot(t, L_SOLID, y0, y1, H);
    let HW = null; if (waterMeshes) { HW = new Float32Array(W * W); shoot(t, L_WATER, y0, y1, HW); }
    const cand = new Uint8Array(W * W);   // 1 = ground in reach, 2 = ground at street level too
    const span = (r, f) => { const a = Math.max(0, Math.floor(r.x0 - X0)), b = Math.min(W - 1, Math.ceil(r.x1 - X0) - 1), c = Math.max(0, Math.floor(r.z0 - Z0)), d = Math.min(W - 1, Math.ceil(r.z1 - Z0) - 1); for (let j = c; j <= d; j++) for (let i = a; i <= b; i++) f(i + j * W); };
    for (const r of near) if (r.walk) span(r, k => { const e = H[k] - r.base; if (e >= BAND_LO && e <= BAND_HI) cand[k] |= (e >= SEED_LO && e <= SEED_HI) ? 3 : 1; });
    // open land right round the buildings counts as ground too (not the sea)
    if (window.coaxH) {
      const sea = typeof window.SEA_Y === 'number' ? window.SEA_Y + 0.4 : -1e9;
      for (const r of near) if (r.walk) span({ x0: r.x0 - APRON, x1: r.x1 + APRON, z0: r.z0 - APRON, z1: r.z1 + APRON }, k => {
        if (H[k] > -1e8) return; const g = window.coaxH(X0 + (k % W) + 0.5, Z0 + ((k / W) | 0) + 0.5); if (g > sea && Math.abs(g - r.base) < 3) { H[k] = g; cand[k] = 3; } });
    }
    for (const r of near) if (r.field) span({ x0: r.x0 - 6, x1: r.x1 + 6, z0: r.z0 - 6, z1: r.z1 + 6 }, k => { cand[k] = 0; });
    if (HW) for (let k = 0; k < W * W; k++) if (HW[k] > -1e8 && HW[k] >= H[k] - 0.15) cand[k] = 0;
    // open ground: a cell and everything round it is ground with no step up or down
    const open = new Uint8Array(S * S), h = new Float32Array(S * S), nb = [-1, 1, -W, W, -W - 1, -W + 1, W - 1, W + 1];
    for (let j = 0; j < S; j++) for (let i = 0; i < S; i++) {
      const k = (i + 1) + (j + 1) * W, c = j * S + i; h[c] = H[k];
      if (!cand[k]) continue;
      let ok = 1; for (let n = 0; n < 8; n++) { const q = k + nb[n]; if (!cand[q] || Math.abs(H[q] - H[k]) > (n < 4 ? STEP : STEP * 1.4)) { ok = 0; break; } }
      if (ok) open[c] = cand[k] & 2 ? 2 : 1;
    }
    // keep only joined-up ground that reaches street level and is big enough to stroll on
    const mark = new Int32Array(S * S), stack = new Int32Array(S * S); let id = 0;
    for (let c0 = 0; c0 < S * S; c0++) {
      if (!open[c0] || mark[c0]) continue;
      id++; let sp = 0, n = 0, seed = false, edge = false; stack[sp++] = c0; mark[c0] = id; const first = c0;
      const cells = [];
      while (sp) {
        const c = stack[--sp], i = c % S, j = (c / S) | 0; n++; cells.push(c); if (open[c] === 2) seed = true; if (i === 0 || j === 0 || i === S - 1 || j === S - 1) edge = true;
        if (i > 0 && open[c - 1] && !mark[c - 1]) { mark[c - 1] = id; stack[sp++] = c - 1; }
        if (i < S - 1 && open[c + 1] && !mark[c + 1]) { mark[c + 1] = id; stack[sp++] = c + 1; }
        if (j > 0 && open[c - S] && !mark[c - S]) { mark[c - S] = id; stack[sp++] = c - S; }
        if (j < S - 1 && open[c + S] && !mark[c + S]) { mark[c + S] = id; stack[sp++] = c + S; }
      }
      if (!(seed && (n >= 40 || (edge && n >= 6)))) for (const c of cells) open[c] = 0;
    }
    for (let c = 0; c < S * S; c++) if (open[c]) { open[c] = 1; t.blocks[((c % S) / BL | 0) + ((c / S / BL) | 0) * NB]++; t.n++; }
    t.h = h; t.open = open;
  }
  function cellOpen(x, z) {
    const ti = Math.floor(x / S), tj = Math.floor(z / S), t = tiles.get(ti + ',' + tj); if (!t || !t.open) return false;
    return t.open[(Math.floor(x) - ti * S) + (Math.floor(z) - tj * S) * S] === 1;
  }
  function cellH(x, z, d) {
    const ti = Math.floor(x / S), tj = Math.floor(z / S), t = tiles.get(ti + ',' + tj); if (!t || !t.h) return d;
    return t.h[(Math.floor(x) - ti * S) + (Math.floor(z) - tj * S) * S];
  }
  // how far a person can walk in a straight line from (x, z)
  function reach(x, z, dx, dz, far) { let d = 0; while (d < far) { d += 0.75; if (!cellOpen(x + dx * d, z + dz * d)) return d - 0.75; } return far; }

  /* ---------- the people ---------- */
  const SHIRTS = [0xb03a2e, 0x2f6690, 0xe8dcc0, 0x3a7d44, 0x7b4fa0, 0xd9a21b, 0xeef2f5, 0x5fa6c8, 0xc8643a, 0x2f9a8a, 0x8a8f98, 0xf06aa8];
  const KID_SHIRTS = [0xe0402e, 0x2f7fe0, 0x3fb04a, 0xf2c41a, 0xf06aa8, 0x8a4fd0, 0xf08a1a];
  const PANTS = [0x2c3a52, 0x3a3a3a, 0x5a4b36, 0xe8e2d8, 0x4a5568, 0x6b4a3a];
  const SKINS = [0xf3cdb0, 0xe6b48f, 0xcf9a74, 0xb07a55, 0x8a5a3c, 0x5e3b27];
  const HAIRS = [0x17110e, 0x2e1d13, 0x4a2f1c, 0x7a5230, 0xb48a55, 0xd8c49a, 0x7d7d7d];
  const VESTS = [0xff6a10, 0xc6f000], HATS = [0xf5c518, 0xf2f2ee, 0x2b6fd6];
  const pick = a => a[(rnd() * a.length) | 0];

  function newAgent() {
    const work = rnd() < CFG.work, kid = !work && rnd() < CFG.kids / Math.max(0.01, 1 - CFG.work);
    return { live: false, x: 0, y: 0, z: 0, yaw: rnd() * 6.28, tx: 0, tz: 0, speed: (kid ? 1.5 : 1.05) + rnd() * 0.45, state: 0, timer: 0, walked: rnd() * 10, heading: rnd() * 6.28,
      work, kid, female: rnd() < (work ? 0.35 : 0.5), scale: kid ? 0.55 + rnd() * 0.15 : 0.94 + rnd() * 0.12,
      shirt: new T.Color(work ? pick(VESTS) : kid ? pick(KID_SHIRTS) : pick(SHIRTS)), pants: new T.Color(pick(PANTS)), skin: new T.Color(pick(SKINS)), hair: new T.Color(work ? pick(HATS) : pick(HAIRS)), under: new T.Color(pick([0x3a4a5e, 0x5b6470, 0x2d3b4c, 0x6a5a48])),
      bound: -1, fresh: 0 };
  }
  function makeFigures() {
    const g = E.siteGroup, mk = (geo) => { const m = new T.InstancedMesh(geo, new T.MeshStandardMaterial({ roughness: 0.85, metalness: 0 }), MAX_PEOPLE); m.frustumCulled = false; m.castShadow = false; m.receiveShadow = false; m.count = 0; m.instanceMatrix.setUsage(T.DynamicDrawUsage); m.setColorAt(0, new T.Color(1, 1, 1)); m.instanceColor.setUsage(T.DynamicDrawUsage); m.raycast = () => { }; g.add(m); return m; };
    const torso = new T.CapsuleGeometry(0.19, 0.3, 3, 8); torso.scale(1.12, 1, 0.72); torso.translate(0, 1.19, 0);
    const head = new T.SphereGeometry(0.125, 10, 8); head.translate(0, 1.63, 0);
    const hair = new T.SphereGeometry(0.135, 10, 6, 0, Math.PI * 2, 0, Math.PI * 0.55); hair.rotateX(-0.3); hair.translate(0, 1.645, -0.008);
    const leg = new T.CapsuleGeometry(0.075, 0.72, 2, 6); leg.translate(0, -0.44, 0);
    const arm = new T.CapsuleGeometry(0.05, 0.5, 2, 6); arm.translate(0, -0.29, 0);
    fig = { torso: mk(torso), head: mk(head), hair: mk(hair), legL: mk(leg), legR: mk(leg), armL: mk(arm), armR: mk(arm) };
  }
  // one detailed person for the pool (made a few at a time so the game never stalls)
  function makeDetailed(i) {
    const work = i < Math.round(MAX_DETAILED * Math.min(0.9, CFG.work + (CFG.work > 0 ? 0.08 : 0)));
    const female = i % 2 === 0;
    const o = work ? { kind: 'worker', seed: 5200 + i * 7, female, vest: '#ffffff', hat: '#ffffff', shirt: '#ffffff', pants: '#ffffff' }
      : { kind: 'worker', civilian: true, seed: 5200 + i * 7, female, shirt: '#ffffff', pants: '#ffffff' };
    const c = E.spawnPerson(E.siteGroup, o, 'walk', 0, -9999, 0, 0, { noShadow: true });
    c.group = E.siteGroup; c.P.root.visible = false;
    const J = c.P.J, d = { c, work, female, agent: null, top: J.spine.children[0].material, legs: J.hips.children[0].material, skin: J.neck.children[0].material, hair: [], vest: null, hat: [] };
    J.head.traverse(m => {
      if (!m.isMesh || !m.material.color) return;
      if (work && m.material.roughness === 0.35 && m.material.metalness === 0.05) d.hat.push(m.material);
      else if (HAIRS.indexOf(m.material.color.getHex()) >= 0 && d.hair.indexOf(m.material) < 0) d.hair.push(m.material);
    });
    if (work) for (const m of J.spine.children) if (m.isMesh && m.material.emissiveIntensity === 0.12) d.vest = m.material;
    pool.push(d);
  }
  function bind(d, a) {
    d.agent = a; a.bound = pool.indexOf(d);
    if (d.work) { if (d.vest) { d.vest.color.copy(a.shirt); d.vest.emissive.copy(a.shirt); } d.top.color.copy(a.under); for (const m of d.hat) m.color.copy(a.hair); }
    else { d.top.color.copy(a.shirt); for (const m of d.hair) m.color.copy(a.hair); }
    d.legs.color.copy(a.pants); d.skin.color.copy(a.skin);
    d.c.P.root.scale.setScalar(a.scale); d.c.P.root.visible = true;
  }
  function unbind(d) { if (d.agent) d.agent.bound = -1; d.agent = null; d.c.P.root.visible = false; d.c.P.root.position.y = -9999; }

  /* ---------- where the camera is looking ---------- */
  const focus = { x: 0, z: 0, R: 200, cx: 0, cy: 0, cz: 0 };
  let vp = null, v3 = null, v3b = null, m4 = null, q1 = null, q2 = null, sc3 = null, ex = null;
  function lookFocus() {
    const cam = E.camera; cam.updateMatrixWorld();
    v3.setFromMatrixPosition(cam.matrixWorld); E.siteGroup.worldToLocal(v3); focus.cx = v3.x; focus.cy = v3.y; focus.cz = v3.z;
    cam.getWorldDirection(v3b);   // siteGroup is not turned, so this is good in its space too
    let gy = 0, n = 0; for (const r of recs) if (r.walk) { gy += r.base; n++; } gy = n ? gy / n : 0;
    let d = 80; if (v3b.y < -0.05) d = Math.min(700, Math.max(0, (focus.cy - gy) / -v3b.y));
    focus.x = focus.cx + v3b.x * d; focus.z = focus.cz + v3b.z * d;
    focus.R = Math.max(150, Math.min(380, d * 0.8));
    vp.multiplyMatrices(cam.projectionMatrix, cam.matrixWorldInverse).multiply(E.siteGroup.matrixWorld);
  }
  function inView(x, y, z) { v3.set(x, y + 1, z).applyMatrix4(vp); return Math.abs(v3.x) < 1.05 && Math.abs(v3.y) < 1.05 && v3.z < 1; }
  function gatherBlocks() {
    blocks.length = 0; blockSum = 0; const R2 = focus.R * focus.R;
    for (const t of tiles.values()) {
      if (!t.open || !t.n) continue;
      const tx = t.ti * S, tz = t.tj * S; if (focus.x < tx - focus.R || focus.x > tx + S + focus.R || focus.z < tz - focus.R || focus.z > tz + S + focus.R) continue;
      for (let b = 0; b < NB * NB; b++) { const n = t.blocks[b]; if (!n) continue; const bx = tx + (b % NB) * BL + BL / 2, bz = tz + ((b / NB) | 0) * BL + BL / 2, dx = bx - focus.x, dz = bz - focus.z; if (dx * dx + dz * dz > R2) continue; blockSum += n; blocks.push(t, b, blockSum); }
    }
  }
  function place(a, anywhere) {
    if (!blockSum) return false;
    for (let tries = 0; tries < 6; tries++) {
      const w = rnd() * blockSum; let lo = 0, hi = blocks.length / 3 - 1; while (lo < hi) { const mid = (lo + hi) >> 1; if (blocks[mid * 3 + 2] < w) lo = mid + 1; else hi = mid; }
      const t = blocks[lo * 3], b = blocks[lo * 3 + 1], bi = (b % NB) * BL, bj = ((b / NB) | 0) * BL;
      for (let k = 0; k < 10; k++) {
        const i = bi + ((rnd() * BL) | 0), j = bj + ((rnd() * BL) | 0), c = i + j * S; if (t.open[c] !== 1) continue;
        const x = t.ti * S + i + 0.5, z = t.tj * S + j + 0.5, y = t.h[c];
        if (!anywhere) { const dx = x - focus.cx, dy = y - focus.cy, dz = z - focus.cz; if (dx * dx + dy * dy + dz * dz < 150 * 150 && inView(x, y, z)) break; }
        a.x = x; a.z = z; a.y = y; a.live = true; a.state = 1; a.timer = rnd() * 1.5; a.heading = rnd() * 6.28; a.yaw = a.heading; return true;
      }
    }
    return false;
  }
  function retarget(a) {
    for (let k = 0; k < 5; k++) {
      const ang = a.heading + (k === 0 ? (rnd() - 0.5) * 0.9 : k < 3 ? (rnd() - 0.5) * 3 : rnd() * 6.28), dx = Math.sin(ang), dz = Math.cos(ang);
      const far = reach(a.x, a.z, dx, dz, 12 + rnd() * 40);
      if (far >= 4) { const d = far - 1 - rnd() * Math.min(3, far - 4); a.tx = a.x + dx * d; a.tz = a.z + dz * d; a.heading = ang; a.state = 0; return; }
    }
    a.state = 1; a.timer = 0.6 + rnd() * 1.5; a.heading = rnd() * 6.28;
  }
  function stepAgent(a, dt) {
    if (a.state === 1) { a.timer -= dt; if (a.timer <= 0) retarget(a); return; }
    const dx = a.tx - a.x, dz = a.tz - a.z, d = Math.hypot(dx, dz), s = a.speed * dt;
    if (d <= s + 0.05) {
      a.x = a.tx; a.z = a.tz;
      if (rnd() < 0.3) { a.state = 1; a.timer = 2 + rnd() * 6; } else retarget(a);
    } else {
      a.x += dx / d * s; a.z += dz / d * s; a.walked += s;
      let dy = Math.atan2(dx, dz) - a.yaw; dy = Math.atan2(Math.sin(dy), Math.cos(dy)); a.yaw += dy * Math.min(1, dt * 6);
    }
    if (cellOpen(a.x, a.z)) { const gh = cellH(a.x, a.z, a.y); a.y += (gh - a.y) * Math.min(1, dt * 10); }
  }
  function writeFigure(k, a) {
    const s = a.scale, sy = Math.sin(a.yaw), cy = Math.cos(a.yaw), sw = a.state === 0 ? Math.sin(a.walked * 2.4 / s) : 0, bob = a.state === 0 ? Math.abs(Math.cos(a.walked * 2.4 / s)) * 0.03 * s : 0;
    q1.setFromAxisAngle(ex.set(0, 1, 0), a.yaw); sc3.set(s, s, s);
    m4.compose(v3.set(a.x, a.y + bob, a.z), q1, sc3);
    fig.torso.setMatrixAt(k, m4); fig.head.setMatrixAt(k, m4); fig.hair.setMatrixAt(k, m4);
    const limb = (mesh, px, py, ang) => { q2.setFromAxisAngle(ex.set(1, 0, 0), ang).premultiply(q1); m4.compose(v3.set(a.x + (px * cy) * s, a.y + bob + py * s, a.z + (-px * sy) * s), q2, sc3); mesh.setMatrixAt(k, m4); };
    limb(fig.legL, 0.1, 0.9, -0.5 * sw); limb(fig.legR, -0.1, 0.9, 0.5 * sw);
    limb(fig.armL, 0.265, 1.45, 0.4 * sw); limb(fig.armR, -0.265, 1.45, -0.4 * sw);
    fig.torso.setColorAt(k, a.shirt); fig.armL.setColorAt(k, a.work ? a.under : a.shirt); fig.armR.setColorAt(k, a.work ? a.under : a.shirt);
    fig.legL.setColorAt(k, a.pants); fig.legR.setColorAt(k, a.pants); fig.head.setColorAt(k, a.skin); fig.hair.setColorAt(k, a.hair);
  }
  function hideAll() {
    if (fig) for (const n in fig) fig[n].count = 0;
    for (const d of pool) if (d.agent) unbind(d);
  }

  function start(engine) {
    E = engine; T = E.THREE; ready = true;
    navCam = new T.OrthographicCamera(-W / 2, W / 2, W / 2, -W / 2, 0, 100); navCam.rotation.x = -Math.PI / 2; E.siteGroup.add(navCam);
    rt = new T.WebGLRenderTarget(W, W, { minFilter: T.NearestFilter, magFilter: T.NearestFilter, depthBuffer: true });
    depthMat = new T.MeshDepthMaterial({ depthPacking: T.RGBADepthPacking, side: T.DoubleSide }); depthMat.blending = T.NoBlending;
    buf = new Uint8Array(W * W * 4);
    vp = new T.Matrix4(); v3 = new T.Vector3(); v3b = new T.Vector3(); m4 = new T.Matrix4(); q1 = new T.Quaternion(); q2 = new T.Quaternion(); sc3 = new T.Vector3(); ex = new T.Vector3();
    makeFigures();
    for (let i = 0; i < MAX_PEOPLE; i++) agents.push(newAgent());
  }

  function tick(engine, dt, t) {
    if (!CFG.on) return;
    try {
      if (!ready) { if (!engine.placed.length) return; start(engine); started = t; }
      if (!E.atSite || E.inside || E.showPeople === false) { hideAll(); return; }
      dt = Math.min(dt, 0.1);
      if (t - scanT > 0.4) { scanT = t; scan(t); }
      lookFocus();
      // map one waiting tile at a time, the nearest to where the camera looks first
      { let best = null, bd = Infinity; for (const tl of tiles.values()) if (tl.dirty && t - tl.dirtyAt > 0.6 && t - mapT > 0.05) { const d = Math.hypot(tl.ti * S + S / 2 - focus.x, tl.tj * S + S / 2 - focus.z); if (d < bd) { bd = d; best = tl; } }
        if (best) { mapT = t; buildTile(best); blockT = 0; } }
      if (t - blockT > 0.8) { blockT = t; gatherBlocks(); }
      // how many people should be out
      const want = Math.min(MAX_PEOPLE, Math.round(blockSum / AREA_PER_PERSON * (CFG.density || 1) * (E.night ? NIGHT_SHARE : 1)));
      let live = 0; const Rout = focus.R + 80, R2 = Rout * Rout;
      for (const a of agents) {
        if (!a.live) continue;
        const dx = a.x - focus.x, dz = a.z - focus.z;
        a.off = cellOpen(a.x, a.z) ? 0 : (a.off || 0) + dt;   // off the map for a few seconds (the ground changed): take them away
        if (dx * dx + dz * dz > R2 || a.off > 3) { a.live = false; a.off = 0; if (a.bound >= 0) unbind(pool[a.bound]); continue; }
        live++;
      }
      if (live > want) { let cut = Math.min(2, live - want); for (const a of agents) { if (!cut) break; if (a.live && a.bound < 0 && !(Math.hypot(a.x - focus.cx, a.z - focus.cz) < 150 && inView(a.x, a.y, a.z))) { a.live = false; cut--; live--; } } }
      if (live < want) { const burst = live < want * 0.5; let add = burst ? 40 : 3; for (const a of agents) { if (!add || live >= want) break; if (!a.live) { add--; if (place(a, burst)) live++; } } }
      // detailed people for the ones nearest the camera
      if (pool.length < MAX_DETAILED && t - poolMakeT > 0.15 && t - started > 2) { poolMakeT = t; makeDetailed(pool.length); }
      if (t - lodT > 0.3) {
        lodT = t;
        const d2 = a => { const dx = a.x - focus.cx, dy = a.y - focus.cy, dz = a.z - focus.cz; return dx * dx + dy * dy + dz * dz; };
        for (const d of pool) if (d.agent && (!d.agent.live || d2(d.agent) > 80 * 80)) unbind(d);
        const free = pool.filter(d => !d.agent);
        if (free.length) {
          const nearA = []; for (const a of agents) if (a.live && a.bound < 0) { const q = d2(a); if (q < 62 * 62) nearA.push([q, a]); }
          nearA.sort((p, q) => p[0] - q[0]);
          for (const [, a] of nearA) { if (!free.length) break; let k = free.findIndex(d => d.work === a.work && d.female === a.female); if (k < 0) k = free.findIndex(d => d.work === a.work); if (k < 0) continue; bind(free.splice(k, 1)[0], a); }
        }
      }
      // move everyone and draw
      let k = 0;
      for (const a of agents) {
        if (!a.live) continue;
        stepAgent(a, dt);
        if (a.bound >= 0) { const d = pool[a.bound], r = d.c.P.root; r.position.set(a.x, a.y, a.z); r.rotation.y = a.yaw; d.c.act = a.state === 0 ? 'walk' : 'idle'; }
        else writeFigure(k++, a);
      }
      for (const n in fig) { const m = fig[n]; m.count = k; m.instanceMatrix.needsUpdate = true; if (m.instanceColor) m.instanceColor.needsUpdate = true; }
    } catch (e) { if (!tick.warned) { tick.warned = true; console.warn('townspeople', e); } }
  }

  window.WB_TOWN = { tick, settings: CFG, _dbg: { tiles, recs, get agents() { return agents; }, get pool() { return pool; }, focus, get fig() { return fig; } } };
})();
