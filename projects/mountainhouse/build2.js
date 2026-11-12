/* ============================================================
   MOUNTAIN HOUSE · BUILD 2 · THE MOUNTAIN STAIR & THE TRAILHEAD
   Keep this file in projects/mountainhouse next to 63-mountainhouse.html.
   A stone stair winds round the mountain from the foot to the summit,
   with a trailhead arch at the bottom and two timber view shelters on the way.
   ============================================================ */
(function () {
  const P = window.MTN;
  P.mh = function (api) {
    if (this._mh) return this._mh; const T = api.THREE, std = (c, r = 0.8, m = 0, e = {}) => new T.MeshStandardMaterial({ color: c, roughness: r, metalness: m, ...e });
    return this._mh = {
      stone: std(0xb9b1a2, 0.95), stone2: std(0x9c9484, 0.95), dark: std(0x4a4f57, 0.7, 0.2), timber: std(0x9a6f42, 0.85), timber2: std(0x6e4a2a, 0.9), white: std(0xf4f1ea, 0.6), cream: std(0xe8dcc0, 0.8),
      roof: std(0x2f7f8a, 0.8), glass: new T.MeshStandardMaterial({ color: 0xbfe8ff, roughness: 0.05, metalness: 0.3, transparent: true, opacity: 0.4, side: T.DoubleSide, depthWrite: false }),
      win: new T.MeshStandardMaterial({ color: 0x3a3226, emissive: 0xffd9a0, emissiveIntensity: 0.55, roughness: 0.5 }), lamp: new T.MeshBasicMaterial({ color: new T.Color(1.6, 1.3, 0.8), toneMapped: false }),
      grass: std(0x5aa64a, 1), leaf: std(0x4f8f3a, 0.9, 0, { flatShading: true }), trunk: std(0x6a4a2a, 0.9), flower: [0xe0402e, 0xf2c41a, 0xf06aa8, 0x8a4fd0, 0xffffff].map(c => std(c, 0.8)),
      steel: std(0xc8ced6, 0.35, 0.7), red: std(0xb03a2e, 0.6), yellow: std(0xd9a21b, 0.6), glowG: new T.MeshBasicMaterial({ color: new T.Color(0.5, 1.6, 1.2), toneMapped: false }), glowA: new T.MeshBasicMaterial({ color: new T.Color(2, 1.4, 0.4), toneMapped: false }),
    };
  };
  P.gy = (x, z) => window.coaxH(x, z);
  // ---- the shuttle: a sleek navy-and-white craft with upturned wing tips ----
  P.craft = function (api) {
    const T = api.THREE, g = new T.Group();
    const navy = new T.MeshStandardMaterial({ color: 0x0a1a3c, roughness: 0.12, metalness: 0.75 }), white = new T.MeshStandardMaterial({ color: 0xf5f7fa, roughness: 0.25, metalness: 0.2 }), dark = new T.MeshStandardMaterial({ color: 0x14161c, roughness: 0.5, metalness: 0.4 });
    const glow = new T.MeshBasicMaterial({ color: new T.Color(0.5, 1.6, 1.4), toneMapped: false });
    const m = (geo, mat, x, y, z, sx = 1, sy = 1, sz = 1) => { const o = new T.Mesh(geo, mat); o.position.set(x, y, z); o.scale.set(sx, sy, sz); o.castShadow = true; g.add(o); return o; };
    const sph = new T.SphereGeometry(1, 28, 16);
    m(sph, navy, 0, 0.2, 0, 9, 2.1, 6.6);                      // the upper hull
    m(sph, white, 0, -0.55, 0, 9.4, 1.0, 6.9);                 // the white band round the edge
    m(sph, dark, 0, -1.15, 0, 8.4, 1.1, 6.0);                  // the dark belly
    m(sph, navy, 1.2, 1.5, 0, 3.8, 1.7, 3.1);                  // the canopy
    const ring = m(new T.TorusGeometry(1, 0.06, 6, 40), white, 1.2, 1.55, 0, 3.7, 3.0, 1.6); ring.rotation.x = Math.PI / 2; ring.scale.set(3.7, 3.0, 3.1); ring.position.y = 2.2;
    for (const s of [-1, 1]) { const w = m(new T.BoxGeometry(5, 5.5, 0.5), navy, -4.2, 2.6, s * 7.4); w.rotation.x = -s * 0.32; w.rotation.y = s * 0.28; w.geometry.translate(0, 0, 0); m(new T.BoxGeometry(5.2, 0.4, 0.6), white, -4.4, 0.1, s * 6.6).rotation.y = s * 0.28;
      m(new T.SphereGeometry(0.7, 8, 6), glow, -8.7, -0.1, s * 2.2); }
    return g;
  };
  // ---- flying it: arrow keys, Space to climb, Shift to dive, G to get in and to land ----
  const F = P.F = { view: 'cab', on: false, pos: null, yaw: 0, spd: 0, vy: 0, roll: 0, craft: null, park: null, keys: new Set(), msgT: 0 };
  P.padWorld = (which) => which === 'summit' ? [P.OFF[0] + 1600, P.OFF[1] - 70] : [P.KP[0], P.KP[1]];
  P.padY = (which) => { const q = P.padWorld(which); return P.gy(q[0], q[1]) + 1.5; };
  P.shuttleReady = (api) => api && api.placed.some(p => p.type === 'SHUTTLE' && p.piece);
  P.flyHint = (t) => { try { P.hint(t); } catch (e) { } };
  P.parkAt = (which) => { const w = P.padWorld(which); F.park = { x: w[0], y: P.padY(which) + 2.2, z: w[1], yaw: F.yaw || 0 }; };
  const board = () => {
    const api = P.api; if (!api || F.on || !window.__G || window.__G.loc !== 'site') return;
    const T = api.THREE, W = window.__walk, walking = W && W.on;
    if (!F.craft) { F.craft = P.craft(api); window.__scene.add(F.craft); const pc = api.placed.find(p => p.type === 'SHUTTLE' && p.piece); if (pc) pc.piece.visible = false; P.parkAt('kryos'); const sw = P.padWorld('summit'); F.park.yaw = Math.atan2(-(sw[1] - F.park.z), sw[0] - F.park.x); }
    if (!F.park) P.parkAt('kryos');
    // on foot and far from the shuttle: it comes to you
    if (walking && Math.hypot(W.pos.x - F.park.x, W.pos.z - F.park.z) > 22) { const x = W.pos.x + Math.sin(W.yaw) * 16, z = W.pos.z + Math.cos(W.yaw) * 16; F.park = { x, y: P.gy(x, z) + 2.2, z, yaw: Math.atan2(-Math.cos(W.yaw), Math.sin(W.yaw)) }; }
    F.pos = new T.Vector3(F.park.x, F.park.y + 1, F.park.z); F.craft.position.copy(F.pos); F.craft.visible = true;
    F.yaw = F.park.yaw; F.park = null; F.spd = 0; F.vy = 0; F.roll = 0; F.on = true; F.keys.clear();
    F.cam = walking ? window.__cam.position.clone() : null; if (walking) W.off(); window.__controls.enabled = false; F.t0 = performance.now();
  };
  const land = () => {
    const api = P.api; if (!F.on) return false;
    const gnd = P.gy(F.pos.x, F.pos.z);
    if (F.pos.y - gnd < 30 && F.spd < 45) {
      let x = F.pos.x, z = F.pos.z, y = gnd + 2.2;
      for (const which of ['kryos', 'summit']) { const w = P.padWorld(which); if (Math.hypot(x - w[0], z - w[1]) < 45) { x = w[0]; z = w[1]; y = P.padY(which) + 2.2; } }
      F.on = false; F.park = { x, y, z, yaw: F.yaw }; F.pos.set(x, y, z); F.craft.position.copy(F.pos); F.craft.rotation.set(0, F.yaw, 0); F.spd = 0; P.flyHint('');
      const W = window.__walk, sd = F.yaw + Math.PI / 2, ox = x + Math.cos(sd) * 17, oz = z - Math.sin(sd) * 17;
      if (W && W.landed) W.at(ox, P.gy(ox, oz), oz, Math.atan2(x - ox, z - oz)); else { window.__controls.enabled = true; window.__controls.target.copy(F.pos); }
      return true; }
    P.flyHint('TO LAND: SLOW DOWN AND FLY LOW (UNDER 30 M), THEN PRESS G · YOU CAN LAND ANYWHERE'); F.msgT = 3; return false;
  };
  addEventListener('keydown', e => {
    const k = e.key.toLowerCase();
    if (k === 'g' && !e.repeat && !WALKING()) { e.stopImmediatePropagation(); e.preventDefault(); F.on ? land() : board(); return; }
    if (!F.on) return;
    if (k !== 'm') e.stopImmediatePropagation();
    if (k === 'c' && !e.repeat) { F.view = F.view === 'cab' ? 'chase' : 'cab'; F.cam = null; }
    if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright', ' ', 'shift'].includes(k)) { F.keys.add(k); e.preventDefault(); }
  }, true);
  addEventListener('keyup', e => { if (F.on) { F.keys.delete(e.key.toLowerCase()); e.stopImmediatePropagation(); } }, true);
  const WALKING = () => false;
  let last = performance.now();
  const loop = (now) => {
    requestAnimationFrame(loop); const dt = Math.min(0.1, (now - last) / 1000); last = now;
    const api = P.api; if (!api || !F.craft) return;
    if (!F.on && window.__walk && window.__walk.on && window.__G && window.__G.loc === 'site' && F.msgT <= 0) { const q = F.park; P.flyHint(!q ? 'PRESS G TO CALL YOUR SHUTTLE' : Math.hypot(window.__walk.pos.x - q.x, window.__walk.pos.z - q.z) < 22 ? 'PRESS G TO GET IN THE SHUTTLE' : 'PRESS G TO CALL YOUR SHUTTLE TO YOU'); }
    if (F.msgT > 0 && !F.on) F.msgT -= dt;
    if (!F.on) { if (F.park) { F.craft.position.set(F.park.x, F.park.y, F.park.z); F.craft.rotation.set(0, F.park.yaw, 0); } return; }
    const T = api.THREE, K = F.keys;
    if (K.has('arrowup')) F.spd = Math.min(300, F.spd + 100 * dt); else if (K.has('arrowdown')) F.spd = Math.max(0, F.spd - 140 * dt); else F.spd *= 1 - 0.04 * dt;
    const turn = (K.has('arrowleft') ? 1 : 0) - (K.has('arrowright') ? 1 : 0); F.yaw += turn * 1.0 * dt * (0.5 + Math.min(1, F.spd / 60) * 0.7);
    const wantV = K.has(' ') ? 90 : K.has('shift') ? -90 : 0; F.vy += (wantV - F.vy) * Math.min(1, 3 * dt);
    const fx = Math.cos(F.yaw), fz = -Math.sin(F.yaw);
    F.pos.x += fx * F.spd * dt; F.pos.z += fz * F.spd * dt; F.pos.y += F.vy * dt;
    const gmin = P.gy(F.pos.x, F.pos.z) + 5; if (F.pos.y < gmin) { F.pos.y = gmin; if (F.vy < 0) F.vy = 0; F.spd *= 1 - 0.6 * dt; }
    if (F.pos.y > 6000) F.pos.y = 6000;
    F.roll += (-turn * 0.5 * Math.min(1, F.spd / 50) - F.roll) * Math.min(1, 4 * dt);
    F.craft.position.copy(F.pos); F.craft.rotation.order = 'YZX'; F.craft.rotation.set(F.roll, F.yaw, F.vy * 0.004 + (K.has('arrowup') ? -0.03 : 0));
    // the view: from the cab (default) or behind the craft (C switches)
    const cam = window.__cam, c = window.__controls, up = new T.Vector3(0, 1, 0);
    if (F.view !== 'chase') { const eye = new T.Vector3(F.pos.x + fx * 4.2, F.pos.y + 2.7, F.pos.z + fz * 4.2), tgt = new T.Vector3(eye.x + fx * 80, eye.y + F.vy * 0.2, eye.z + fz * 80); cam.position.copy(eye); c.target.copy(tgt); cam.lookAt(tgt); F.craft.visible = true; }
    else { const want = new T.Vector3(F.pos.x - fx * 46, F.pos.y + 13, F.pos.z - fz * 46), tgt = new T.Vector3(F.pos.x + fx * 18, F.pos.y + 3, F.pos.z + fz * 18);
      if (!F.cam) { F.cam = cam.position.clone(); } F.cam.lerp(want, Math.min(1, 7 * dt)); cam.position.copy(F.cam); c.target.copy(tgt); cam.lookAt(tgt); }
    const sw = P.padWorld('summit'), dk = Math.hypot(F.pos.x - sw[0], F.pos.z - sw[1]), dh = Math.hypot(F.pos.x - P.KP[0], F.pos.z - P.KP[1]);
    if (F.msgT > 0) F.msgT -= dt; else P.flyHint('SHUTTLE · ↑ FASTER · ↓ SLOWER · ← → TURN · SPACE CLIMB · SHIFT DIVE · C VIEW · G LAND   |   ' + Math.round(F.spd * 3.6) + ' KM/H · ALT ' + Math.round(F.pos.y - P.gy(F.pos.x, F.pos.z)) + ' M · MOUNTAIN HOUSE ' + (dk / 1000).toFixed(1) + ' KM · KRYOS ' + (dh / 1000).toFixed(1) + ' KM');
  };
  requestAnimationFrame(loop);
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 2, name: 'THE SHUTTLE & ITS STOP',
    brief: 'No stairs and no road: a sleek shuttle craft, flown with the arrow keys, takes the Builder from a shuttle stop in Kryos to the mountain top. Build the stop, the waiting lounge and the shuttle itself.',
    types: {
      KRYOSPAD: { code: 'SF', name: 'KRYOS SHUTTLE STOP', col: '#8a8478', w: 60, d: 60, h: 3 },
      LOUNGE:   { code: 'HM', name: 'WAITING LOUNGE',     col: '#bfe8ff', w: 22, d: 14, h: 9 },
      SHUTTLE:  { code: 'SY', name: 'THE SHUTTLE',        col: '#0a1a3c', w: 24, d: 20, h: 6 },
    },
    order: ['KRYOSPAD', 'LOUNGE', 'SHUTTLE'],
    at: { KRYOSPAD: [[P.KP[0] - P.OFF[0], P.KP[1] - P.OFF[1]]], LOUNGE: [[P.KP[0] - P.OFF[0] + 40, P.KP[1] - P.OFF[1] + 14]], SHUTTLE: [[P.KP[0] - P.OFF[0], P.KP[1] - P.OFF[1]]] },
    eye: [P.KP[0] - P.OFF[0] + 70, 150, P.KP[1] - P.OFF[1] + 90],
    stats(api, c) { return [['SHUTTLE STOP', c('KRYOSPAD') ? 'READY' : 'NOT YET'], ['LOUNGE', c('LOUNGE') ? 'OPEN' : 'NOT YET'], ['SHUTTLE', c('SHUTTLE') ? 'READY · PRESS G TO FLY IT' : 'NOT YET']]; },
    tick(api) { P.api = api; },
    make(type, k, g, add, F2, api, sl) {
      const T = api.THREE, H = P.mh(api); P.api = api;
      if (type === 'KRYOSPAD') {
        add(new T.CylinderGeometry(29, 30, 1.2, 48), H.dark, 0, 0.6, 0, true); add(new T.CylinderGeometry(25, 25, 0.2, 48), H.stone2, 0, 1.25, 0, false);
        const r1 = add(new T.TorusGeometry(22, 0.35, 6, 64), H.yellow, 0, 1.45, 0, false); r1.rotation.x = Math.PI / 2;
        for (const x of [-4, 4]) add(new T.BoxGeometry(1.2, 0.15, 12), H.white, x, 1.45, 0, false); add(new T.BoxGeometry(8, 0.15, 1.2), H.white, 0, 1.45, 0, false);
        for (let i = 0; i < 24; i++) { const a = i / 24 * Math.PI * 2; add(new T.SphereGeometry(0.35, 6, 5), i % 2 ? H.glowG : H.glowA, Math.cos(a) * 27, 1.5, Math.sin(a) * 27, false); }
        P.sign(api, g, 'SHUTTLE · MOUNTAIN HOUSE', 20, 3, 0, 5, 33, 0, '#0a1a3c', '#bff8d0');
      } else if (type === 'LOUNGE') {
        add(new T.BoxGeometry(22, 0.6, 14), H.stone, 0, 0.3, 0, false);
        for (const x of [-10, 10]) for (const z of [-6, 6]) add(new T.BoxGeometry(0.7, 8, 0.7), H.steel, x, 4.4, z, true);
        add(new T.BoxGeometry(24, 0.7, 16), H.roof, 0, 8.6, 0, true); add(new T.BoxGeometry(20, 7, 0.3), H.glass, 0, 4.4, 6.8, false);
        add(new T.BoxGeometry(12, 0.8, 2.4), H.timber, 0, 1.6, -4, true);
        P.person(g, P.civ(63060), 'idle', -3, 0.6, -1, 0); P.person(g, P.civ(63061), 'idle', 4, 0.6, 0, Math.PI);
      } else if (type === 'SHUTTLE') {
        const c = P.craft(api); c.position.y = 3.6; g.add(c);
      }
    },
  }));
})();
