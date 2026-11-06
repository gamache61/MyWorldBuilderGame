/* ============================================================
   STATION-7 HAVENREACH · shared station plan
   Keep this file in the havenreach folder next to AegisArk.html.
   It holds the shape of the station (the disc, its rings and the
   spindle with the landing deck on top) and the helpers every
   build file uses. The build files (build1.js … build12.js) load
   after it.
   ============================================================ */
(function () {
  const TAU = Math.PI * 2;
  const H = window.HAVEN = {};

  // the landing deck sits on top of the spindle at the Ark's landing spot;
  // the disc's centre is 760 m below it
  H.LAND = { x: 120, y: -28, z: 0, r: 520 };
  H.C = { x: 120, y: -28 - 760, z: 0 };
  H.Y_BOT = -125; H.Y_FLOOR = 31; H.Y_ROOF = 140; H.Y_RIMTOP = 172;   // heights relative to the disc centre
  H.R_RIM = 2180;
  H.RINGS = [
    { key: 'CMD', id: 5, name: 'COMMAND & ENGINEERING', r0: 195, r1: 390, y: 117, floor: 0x5a6672 },
    { key: 'REC', id: 6, name: 'RECYCLING', r0: 390, r1: 625, y: 94, floor: 0x3e5856 },
    { key: 'IND', id: 7, name: 'INDUSTRY', r0: 625, r1: 860, y: 105, floor: 0x4b4b4f },
    { key: 'FOOD', id: 8, name: 'FOOD PROCESSING', r0: 860, r1: 1090, y: 86, floor: 0x5e5246 },
    { key: 'GAR', id: 9, name: 'GARDENS', r0: 1090, r1: 1560, y: 31, floor: null },
    { key: 'LIV', id: 10, name: 'LIVING DISTRICTS', r0: 1560, r1: 2105, y: 31, floor: null },
    { key: 'DEF', id: 11, name: 'DEFENSE & SHIELD RIM', r0: 2105, r1: 2180, y: 172, floor: 0x3a3e46 },
  ];
  H.SECTORS = 12;
  H.sectorA = k => [k / 12 * TAU, (k + 1) / 12 * TAU];
  H.roadA = k => k / 12 * TAU + Math.PI / 24;
  H.onRoad = (a, r, w) => { for (let k = 0; k < 12; k++) { let d = (a - H.roadA(k)) % TAU; if (d > Math.PI) d -= TAU; if (d < -Math.PI) d += TAU; if (Math.abs(d) * r < w) return true; } return false; };

  // the disc turns slowly once Command & Engineering starts it
  H.SPIN = 0.03; H.ang = 0;
  H.step = (api, dt) => { if (api.flag('spin')) H.ang = (H.ang + H.SPIN * dt) % TAU; };

  // which ring is at radius r, and is its floor built there?
  H.ringAt = r => H.RINGS.find(R => r >= R.r0 && r < R.r1) || null;
  H.floorAt = (api, r, a) => {
    const R = H.ringAt(r); if (!R) return null;
    a = ((a % TAU) + TAU) % TAU; const k = Math.floor(a / TAU * 12) % 12;
    const B = (window.AEGIS_BUILDS || []).find(b => b.id === R.id); if (!B || !B.slots) return null;
    const built = api.placed.some(p => p.b === R.id && B.slots[p.s] && B.slots[p.s].floor && B.slots[p.s].k === k);
    return built ? R.y : null;
  };

  /* ---------- geometry helpers ---------- */
  // flat annulus sector facing up (or down), uv in metres / tile
  H.ann = (THREE, r0, r1, a0, a1, y, down = false, tile = 40) => {
    const n = Math.max(2, Math.ceil((a1 - a0) * r1 / 40)), pos = [], uv = [], idx = [];
    for (let i = 0; i <= n; i++) {
      const a = a0 + (a1 - a0) * i / n, c = Math.cos(a), s = Math.sin(a);
      pos.push(r0 * c, y, r0 * s, r1 * c, y, r1 * s); uv.push(r0 * c / tile, r0 * s / tile, r1 * c / tile, r1 * s / tile);
      if (i < n) { const k = i * 2; if (down) idx.push(k, k + 1, k + 2, k + 1, k + 3, k + 2); else idx.push(k, k + 2, k + 1, k + 1, k + 2, k + 3); }
    }
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2)); g.setIndex(idx); g.computeVertexNormals(); return g;
  };
  // curved wall segment at radius r between heights y0..y1 and angles a0..a1
  H.wall = (THREE, r, y0, y1, a0, a1) => {
    const g = new THREE.CylinderGeometry(r, r, y1 - y0, Math.max(4, Math.ceil((a1 - a0) * r / 30)), 1, true, Math.PI / 2 - a1, a1 - a0);
    g.translate(0, (y0 + y1) / 2, 0); return g;
  };
  H.canvas = (THREE, w, h, draw, rx = 1, ry = 1) => {
    const c = document.createElement('canvas'); c.width = w; c.height = h; draw(c.getContext('2d'), w, h);
    const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(rx, ry); return t;
  };
  // instanced "put this shape at angle a, radius r" helper for filling a sector
  H.batch = (THREE) => {
    const map = new Map(), O = new THREE.Object3D();
    return {
      put(key, geo, mat, a, r, y, sx = 1, sy = 1, sz = 1, yaw = 0, color, keepOnRoad) {
        if (!keepOnRoad && H.onRoad(a, r, 10 + Math.max(sx, sz) / 2)) return;
        let b = map.get(key); if (!b) { b = { geo, mat, list: [], cols: [] }; map.set(key, b); }
        O.position.set(Math.cos(a) * r, y, Math.sin(a) * r); O.rotation.set(0, -a + yaw, 0); O.scale.set(sx, sy, sz); O.updateMatrix();
        b.list.push(O.matrix.clone()); b.cols.push(color);
      },
      flush(group) {
        for (const b of map.values()) {
          if (!b.list.length) continue;
          const m = new THREE.InstancedMesh(b.geo, b.mat, b.list.length); m.castShadow = m.receiveShadow = true;
          const col = new THREE.Color();
          b.list.forEach((mx, i) => { m.setMatrixAt(i, mx); if (b.cols[i] !== undefined) m.setColorAt(i, col.set(b.cols[i])); });
          m.computeBoundingSphere(); group.add(m);
        }
      },
    };
  };

  /* ---------- shared materials and shapes (made once) ---------- */
  let K = null;
  H.kit = (THREE) => {
    if (K) return K;
    const std = (c, r = 0.8, m = 0) => new THREE.MeshStandardMaterial({ color: c, roughness: r, metalness: m });
    const win = H.canvas(THREE, 1024, 256, (g, w, h) => { g.fillStyle = '#3a3f47'; g.fillRect(0, 0, w, h); for (let y = 10; y < h; y += 26) { g.fillStyle = '#2a2e35'; g.fillRect(0, y, w, 4); } g.fillStyle = '#8a1f1a'; g.fillRect(0, h - 22, w, 8); });
    const winGlow = H.canvas(THREE, 1024, 256, (g, w, h) => { g.fillStyle = '#000'; g.fillRect(0, 0, w, h); for (let y = 18; y < h - 30; y += 26) for (let x = 0; x < w; x += 7) if (Math.random() < .45) { g.fillStyle = Math.random() < .85 ? '#ffd9a0' : '#9fe0ff'; g.fillRect(x, y, 4, 5); } });
    const grass = H.canvas(THREE, 256, 256, (c, w, h) => { c.fillStyle = '#4f8f3c'; c.fillRect(0, 0, w, h); for (let i = 0; i < 2500; i++) { const v = Math.random(); c.fillStyle = v < .45 ? '#478535' : v < .85 ? '#5a9c45' : '#6aa852'; c.fillRect(Math.random() * w, Math.random() * h, 2, 3); } });
    const hull = H.canvas(THREE, 512, 512, (g, w, h) => { g.fillStyle = '#3c4048'; g.fillRect(0, 0, w, h); for (let i = 0; i < 400; i++) { const v = 52 + Math.random() * 22 | 0; g.fillStyle = `rgb(${v},${v + 3},${v + 8})`; g.fillRect(Math.random() * w, Math.random() * h, 60, 24); } });
    const field = (a, b) => new THREE.MeshStandardMaterial({ map: H.canvas(THREE, 64, 64, (c, w, h) => { c.fillStyle = a; c.fillRect(0, 0, w, h); c.fillStyle = b; for (let yy = 0; yy < h; yy += 8) c.fillRect(0, yy, w, 4); }), roughness: 1 });
    K = {
      std,
      BOX: new THREE.BoxGeometry(1, 1, 1).translate(0, 0.5, 0),
      CYL: new THREE.CylinderGeometry(1, 1, 1, 16).translate(0, 0.5, 0),
      CONE4: new THREE.ConeGeometry(0.72, 1, 4).rotateY(Math.PI / 4).translate(0, 0.5, 0),
      BALL: new THREE.IcosahedronGeometry(1, 0),
      DOME: new THREE.SphereGeometry(1, 18, 9, 0, TAU, 0, Math.PI / 2),
      TOWER: new THREE.CylinderGeometry(0.6, 1.0, 1, 8).translate(0, 0.5, 0),
      white: std(0xffffff, 0.75), glassy: std(0x9ec8e8, 0.15, 0.6), steel: std(0x9aa1aa, 0.35, 0.9), armour: std(0x3a3e46, 0.45, 0.75),
      dark: std(0x1c1f25, 0.5, 0.8), asphalt: std(0x3b3b3e, 0.95), walk: std(0x8a857c, 0.95), red: std(0x8a1f1a, 0.45, 0.5),
      glow: new THREE.MeshBasicMaterial({ color: 0xffffff }),
      leaf: new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9, flatShading: true }),
      strip: new THREE.MeshBasicMaterial({ color: new THREE.Color(0x7fdcff).multiplyScalar(2) }),
      sunStrip: new THREE.MeshBasicMaterial({ color: new THREE.Color(0xfff4d8).multiplyScalar(1.6) }),
      grass: new THREE.MeshStandardMaterial({ map: grass, roughness: 1 }),
      hull: new THREE.MeshStandardMaterial({ map: hull, roughness: 0.5, metalness: 0.6, side: THREE.DoubleSide }),
      roof: new THREE.MeshStandardMaterial({ color: 0x9fd4ff, transparent: true, opacity: 0.12, roughness: 0.04, metalness: 1, side: THREE.DoubleSide, depthWrite: false }),
      water: new THREE.MeshStandardMaterial({ color: 0x2e6f9a, roughness: 0.08, metalness: 0.4 }),
      greenhouse: new THREE.MeshStandardMaterial({ color: 0xdff4ff, roughness: 0.05, metalness: 0.3, transparent: true, opacity: 0.55 }),
      crops: [field('#4f8a3c', '#3f7a2c'), field('#c9b45a', '#a8923a'), field('#6c9a3e', '#507f28'), field('#9bb24a', '#7fa038'), field('#a8873f', '#8a6a2a')],
      heat: new THREE.MeshStandardMaterial({ color: 0x2a1a12, emissive: 0xff6a20, emissiveIntensity: 1.4, roughness: 0.5, metalness: 0.5 }),
      winTex: win, winGlow,
      wallMats: new Map(),
    };
    // window walls: one material per ring so the windows are the right size
    K.wallFor = (r, h) => {
      const key = Math.round(r) + ':' + Math.round(h);
      if (!K.wallMats.has(key)) {
        const m = win.clone(), e = winGlow.clone(); m.needsUpdate = e.needsUpdate = true;
        m.repeat.set(Math.max(1, Math.round(TAU * r / 12 / 40)), Math.max(1, h / 60)); e.repeat.copy(m.repeat);
        K.wallMats.set(key, new THREE.MeshStandardMaterial({ map: m, emissive: 0xffffff, emissiveMap: e, emissiveIntensity: 0.9, roughness: 0.5, metalness: 0.6, side: THREE.DoubleSide }));
      }
      return K.wallMats.get(key);
    };
    return K;
  };

  /* ---------- a ring build: trip 1 = 12 floor sections, trip 2 = 12 sections of what goes on them ---------- */
  H.ringBuild = (def) => {
    const R = H.RINGS.find(r => r.key === def.ring), P = def.ring;
    const FT = P + 'FLOOR', CT = P + 'PACK';
    const types = {};
    types[FT] = { code: def.floorCode || 'SF', name: def.floorName, col: def.floorCol || '#6c757d', fixed: true, h: 60, fx: 120 };
    types[CT] = { code: def.packCode, name: def.packName, col: def.packCol, fixed: true, h: 40, fx: 120 };
    const kits1 = {}, kits2 = {}; kits1[FT] = 12; kits2[CT] = 12;
    return {
      id: R.id, name: def.name, brief: def.brief, disc: true,
      types,
      trips: [
        { name: def.trip1 || (R.name + ' FLOOR'), kits: kits1, finish: 'unload' },
        { name: def.trip2, kits: kits2, finish: 'custom' },
      ],
      finishLabel: def.finishLabel,
      flags: def.flags,
      setup(api) {
        const V = (x, y, z) => new api.THREE.Vector3(x, y, z), C = H.C;
        const slots = [], self = this, mid = (R.r0 + R.r1) / 2;
        const inner = H.RINGS[H.RINGS.indexOf(R) - 1];
        const floorBuilt = (b, k) => { const B = (window.AEGIS_BUILDS || []).find(x => x.id === b); return !!(B && B.slots && api.placed.some(p => p.b === b && B.slots[p.s] && B.slots[p.s].floor && B.slots[p.s].k === k)); };
        const pol = (a, r, y) => V(Math.cos(a) * r, y, Math.sin(a) * r);
        const add = (type, extra) => { const i = slots.length; slots.push({ type, x: C.x, y: C.y, z: C.z + i * 0.001, eye: V(2300, 1500, 2900), look: V(0, 0, 0), ...extra }); };
        for (let k = 0; k < 12; k++) {
          const am = (k + 0.5) / 12 * TAU;
          add(FT, { k, floor: true, fx: pol(am, mid, R.y), needs: () => def.needs ? def.needs(api, k) : (inner ? (floorBuilt(inner.id, k) ? null : 'NEEDS ' + inner.name + ' HERE FIRST') : null) });
        }
        for (let k = 0; k < 12; k++) {
          const am = (k + 0.5) / 12 * TAU;
          add(CT, { k, pack: true, fx: pol(am, mid, R.y + 20), needs: () => floorBuilt(R.id, k) ? null : 'NEEDS THE FLOOR SECTION UNDER IT' });
        }
        this.slots = slots; this.suggest = []; this.zones = [];
        this.finishCam = [V(C.x + 2500, C.y + 1600, C.z + 3000), V(C.x, C.y, C.z)];
      },
      rule(type, x, z, rot, api) {
        const [w, d] = api.footprint(type, rot);
        if (type.startsWith('SUPPLY') && x > 58 && x < 182 && Math.abs(z) - d / 2 < 182) return 'KEEP SUPPLY CRATES OFF THE LANDING PAD';
        return null;
      },
      ready(api) {
        const built = api.placed.filter(p => p.b === R.id && p.s !== undefined).length;
        if (api.trip === 1 && built < this.slots.length) return { ok: false, msg: R.name + ' ' + built + ' / ' + this.slots.length + ' SECTIONS' };
        return { ok: true, msg: 'READY — PRESS L TO ' + def.finishLabel };
      },
      stats(api) {
        const c = t => api.placed.filter(p => p.b === R.id && p.type === t).length;
        return [['FLOOR SECTIONS', c(FT) + ' / 12'], [def.packName + 'S', c(CT) + ' / 12'], ...(def.flags.every(f => api.flag(f)) ? [] : [[R.name, 'OFFLINE']])];
      },
      finishStart() { this._go = 0; },
      finishUpdate(api, dt) {
        this._go = (this._go || 0) + dt; this._level = Math.min(1, this._go / 6);
        if (this._go > 5 && !this._flash) { this._flash = true; for (let k = 0; k < 6; k++) { const a = k / 6 * TAU; api.sparkle(new api.THREE.Vector3(H.C.x + Math.cos(a) * (R.r0 + R.r1) / 2, H.C.y + R.y + 30, H.C.z + Math.sin(a) * (R.r0 + R.r1) / 2), 8); } }
        if (this._go >= 8) { for (const f of def.flags) api.setFlag(f, true); this._level = 1; return true; }
        return false;
      },
      tick(api, dt, t) {
        for (const p of api.placed) if (p.b === R.id && p.piece) p.piece.rotation.y = -H.ang;
        if (def.tick) def.tick.call(this, api, dt, t, def.flags.every(f => api.flag(f)) ? 1 : (this._level || 0));
      },
      make(type, api, p) {
        const THREE = api.THREE, S = H.kit(THREE); this._mats = this._mats || {};
        const g = new THREE.Group(), sl = this.slots[p.s], [a0, a1] = H.sectorA(sl.k);
        const mesh = (geo, mat, cast = true) => { const m = new THREE.Mesh(geo, mat); m.castShadow = cast; m.receiveShadow = true; g.add(m); return m; };
        if (type === FT) {
          // floor top, underside of the hull, walls; the low gardens/city floor gets the glass roof
          mesh(H.ann(THREE, R.r0, R.r1, a0, a1, R.y), R.floor === null ? S.grass : S.std(R.floor, 0.85, 0.15));
          mesh(H.ann(THREE, R.r0, R.r1, a0, a1, H.Y_BOT, true, 120), S.hull, false);
          const b = H.batch(THREE);
          b.put('road', S.BOX, S.asphalt, H.roadA(sl.k), (R.r0 + R.r1) / 2, R.y + 0.4, R.r1 - R.r0 - 2, 0.2, 14, 0, undefined, true);
          if (R.key === 'DEF') {
            mesh(H.wall(THREE, R.r0, H.Y_FLOOR, R.y, a0, a1), S.wallFor(R.r0, R.y - H.Y_FLOOR));
            mesh(H.wall(THREE, R.r1, H.Y_BOT, R.y, a0, a1), S.wallFor(R.r1, R.y - H.Y_BOT));
            mesh(H.wall(THREE, R.r1 + 0.6, 105, 125, a0, a1), S.red);
          } else if (R.floor === null) {
            const roof = mesh(H.ann(THREE, R.r0, R.r1, a0, a1, H.Y_ROOF), S.roof, false); roof.renderOrder = 2;
            for (let i = 0; i < 12; i++) { const a = a0 + (i + 0.5) / 12 * (a1 - a0); b.put('rafter', S.BOX, S.steel, a, (R.r0 + R.r1) / 2, H.Y_ROOF, R.r1 - R.r0, 1.2, 1.2, 0, undefined, true); }
            for (const r of [R.r0 + (R.r1 - R.r0) / 3, R.r0 + 2 * (R.r1 - R.r0) / 3]) { mesh(H.ann(THREE, r - 1.5, r + 1.5, a0, a1, H.Y_ROOF - 3, true), S.sunStrip, false); for (let i = 0; i < 8; i++) b.put('mull', S.CYL, S.steel, a0 + (i + 0.5) / 8 * (a1 - a0), r, R.y, 2, H.Y_ROOF - R.y, 2); }
            if (R.key === 'GAR') mesh(H.wall(THREE, R.r0, H.RINGS[3].y, H.Y_ROOF, a0, a1), S.wallFor(R.r0, H.Y_ROOF - H.RINGS[3].y));
          } else {
            mesh(H.wall(THREE, R.r1, H.Y_BOT, R.y, a0, a1), S.wallFor(R.r1, R.y - H.Y_BOT));
            if (R.key === 'CMD') mesh(H.wall(THREE, R.r0, H.Y_BOT, R.y, a0, a1), S.wallFor(R.r0, R.y - H.Y_BOT));
          }
          b.flush(g);
        } else {
          const b = H.batch(THREE);
          def.fill.call(this, api, THREE, S, b, a0, a1, R, sl.k, g, mesh);
          b.flush(g);
        }
        return g;
      },
    };
  };
})();
