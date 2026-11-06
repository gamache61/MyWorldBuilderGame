/* ============================================================
   AEGIS ARK · BUILD 3 · SPINDLE & VAULT
   Keep this file in the havenreach folder next to AegisArk.html.
   Trip 1 — the spindle: 12 sections running straight down from
            under the landing deck, through where the disc will
            be, to the bottom of the station.
   Trip 2 — the Vault on the spindle under the disc: 8 wall panels,
            2 end collars and 12 storage racks.
   Build 3 ends when every supply crate on the station has been
            beamed into the Vault (press L when the hall is done).
   ============================================================ */
(window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push({
  id: 3,
  name: 'SPINDLE & VAULT',
  brief: 'The spindle that runs down through the whole station, and the Vault where supplies are stored.',

  types: {
    SPINE: { code: 'SF', name: 'SPINDLE SECTION', col: '#6c757d', fixed: true, h: 150, fx: 60 },
    VWALL: { code: 'HP', name: 'VAULT WALL PANEL', col: '#9a2a22', fixed: true, h: 520, fx: 120 },
    VCAP:  { code: 'SF', name: 'VAULT COLLAR', col: '#6c757d', fixed: true, h: 22, fx: 120 },
    VRACK: { code: 'FB', name: 'STORAGE RACK', col: '#e8c13a', fixed: true, h: 400, fx: 80 },
  },

  trips: [
    { name: 'THE SPINDLE', kits: { SPINE: 12 }, finish: 'unload' },
    { name: 'THE VAULT', kits: { VWALL: 8, VCAP: 2, VRACK: 12 }, finish: 'custom' },
  ],
  finishLabel: 'STORE THE SUPPLIES IN THE VAULT',

  setup(api) {
    const V = (x, y, z) => new api.THREE.Vector3(x, y, z), L = HAVEN.LAND, C = HAVEN.C, TAU = Math.PI * 2;
    const TOP = L.y - 50, BOT = C.y - 1100, N = 12, SEG = (TOP - BOT) / N;
    const VY = C.y - 430, VH = 520;
    Object.assign(this, { TOP, BOT, SEG, VY, VH });
    this.zones = []; this.suggest = [];
    const slots = [], cnt = t => api.placed.filter(p => p.b === 3 && p.type === t).length;
    const has = (t, f) => api.placed.some(p => p.b === 3 && p.type === t && slots[p.s] && f(slots[p.s]));
    for (let j = 0; j < N; j++) { const i = slots.length, y = TOP - (j + 0.5) * SEG; slots.push({ type: 'SPINE', j, x: C.x, y, z: C.z + i * 0.001, fx: V(0, 0, 0), eye: V(700, 260, 860), look: V(0, 0, 0), needs: () => j === 0 ? (api.placed.some(p => p.type === 'LDECK') ? null : 'NEEDS THE LANDING DECK') : (has('SPINE', s => s.j === j - 1) ? null : 'NEEDS THE SECTION ABOVE IT') }); }
    const spineDone = () => cnt('SPINE') >= N ? null : 'NEEDS THE WHOLE SPINDLE';
    const vadd = (type, extra) => { const i = slots.length; slots.push({ type, x: C.x, y: VY, z: C.z + i * 0.001, eye: V(760, 160, 900), look: V(0, 0, 0), ...extra }); };
    for (let k = 0; k < 2; k++) vadd('VCAP', { k, fx: V(0, (k ? -1 : 1) * VH / 2, 0), needs: spineDone });
    for (let k = 0; k < 12; k++) vadd('VRACK', { k, fx: V(Math.cos(k / 12 * TAU) * 150, 0, Math.sin(k / 12 * TAU) * 150), needs: () => cnt('VCAP') >= 2 ? null : 'NEEDS BOTH VAULT COLLARS' });
    for (let k = 0; k < 8; k++) vadd('VWALL', { k, fx: V(Math.cos((k + 0.5) / 8 * TAU) * 200, 0, Math.sin((k + 0.5) / 8 * TAU) * 200), needs: () => cnt('VCAP') >= 2 ? null : 'NEEDS BOTH VAULT COLLARS' });
    this.slots = slots;
    this.finishCam = [V(C.x + 760, VY + 200, C.z + 900), V(C.x, VY, C.z)];
  },

  rule(type, x, z, rot, api) {
    const [w, d] = api.footprint(type, rot);
    if (type.startsWith('SUPPLY') && x > 58 && x < 182 && Math.abs(z) - d / 2 < 182) return 'KEEP SUPPLY CRATES OFF THE LANDING PAD';
    return null;
  },

  ready(api) {
    const built = api.placed.filter(p => p.b === 3 && p.s !== undefined).length;
    if (api.trip === 1 && built < this.slots.length) return { ok: false, msg: 'VAULT ' + built + ' / ' + this.slots.length + ' PARTS' };
    return { ok: true, msg: 'VAULT READY — PRESS L TO STORE THE SUPPLIES' };
  },

  stats(api) {
    const c = t => api.placed.filter(p => p.b === 3 && p.type === t).length;
    return [
      ['SPINDLE', Math.round(c('SPINE') * this.SEG) + ' / ' + Math.round(12 * this.SEG) + ' m'],
      ['VAULT', c('VWALL') + c('VCAP') + c('VRACK') + ' / 22 parts'],
      ['VAULT STOCK', api.stock + ' crates'],
    ];
  },

  // a crate goes into the racks: fill the shelves in order
  onStored(api) {
    let left = api.stock;
    for (const r of this._racks || []) { const n = Math.max(0, Math.min(r.cap, left)); r.inst.count = n; left -= r.cap; }
  },

  make(type, api, p) {
    const { THREE, M } = api, TAU = Math.PI * 2, K = HAVEN.kit(THREE);
    const g = new THREE.Group();
    const add = (geo, mat, x = 0, y = 0, z = 0) => { const m = new THREE.Mesh(geo, mat); m.position.set(x, y, z); m.castShadow = m.receiveShadow = true; g.add(m); return m; };
    const S = this._mats || (this._mats = {
      crates: new THREE.MeshStandardMaterial({ map: HAVEN.canvas(THREE, 512, 512, (g2, w, h) => { g2.fillStyle = '#2a2e35'; g2.fillRect(0, 0, w, h); const cols = ['#6c757d', '#2f6690', '#b5651d', '#b03a2e', '#e8e1d1', '#1f4e5f', '#d4a017', '#3a7d44', '#8e44ad']; for (let y = 4; y < h; y += 14) for (let x = 2; x < w; x += 26) if (Math.random() < .82) { g2.fillStyle = cols[Math.random() * cols.length | 0]; g2.fillRect(x, y, 22, 10); } }, 1, 3), roughness: 0.6, metalness: 0.3, side: THREE.DoubleSide }),
      glass: new THREE.MeshStandardMaterial({ color: 0x9fd8ff, transparent: true, opacity: 0.2, roughness: 0.05, metalness: 0.3, side: THREE.DoubleSide, depthWrite: false }),
      shelf: new THREE.MeshStandardMaterial({ color: 0xd9a21b, metalness: 0.5, roughness: 0.5 }),
      crate: new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.4, roughness: 0.6 }),
    });
    const sl = this.slots[p.s];
    if (type === 'SPINE') {
      add(new THREE.CylinderGeometry(70, 70, this.SEG, 48, 1, true), K.armour).material.side = THREE.DoubleSide;
      for (const y of [-this.SEG / 2 + 3, this.SEG / 2 - 3]) add(new THREE.CylinderGeometry(76, 76, 6, 48), K.steel, 0, y, 0);
      add(new THREE.TorusGeometry(77, 1.2, 6, 64).rotateX(Math.PI / 2), K.strip, 0, 0, 0).castShadow = false;
      for (let k = 0; k < 6; k++) { const a = k / 6 * TAU; add(new THREE.BoxGeometry(6, this.SEG - 12, 6), M.gun, Math.cos(a) * 72, 0, Math.sin(a) * 72); }
    } else if (type === 'VCAP') {
      add(new THREE.CylinderGeometry(222, 222, 22, 8), K.armour);
      add(new THREE.TorusGeometry(223, 2, 6, 8).rotateX(Math.PI / 2).rotateY(Math.PI / 8), K.strip, 0, sl.k ? -11 : 11, 0).castShadow = false;
      g.position.y = 0; g.children.forEach(c => c.position.y += (sl.k ? -1 : 1) * (this.VH / 2 + 11));
    } else if (type === 'VWALL') {
      const a0 = sl.k / 8 * TAU, a1 = (sl.k + 1) / 8 * TAU;
      const w = new THREE.CylinderGeometry(200, 200, this.VH, 1, 1, true, Math.PI / 2 - a1, a1 - a0);
      add(w, sl.k % 2 ? S.glass : S.crates).castShadow = sl.k % 2 === 0;
      for (const a of [a0, a1]) add(new THREE.BoxGeometry(6, this.VH, 6), M.gun, Math.cos(a) * 200, 0, Math.sin(a) * 200);
    } else if (type === 'VRACK') {
      const a = sl.k / 12 * TAU, X = Math.cos(a) * 150, Z = Math.sin(a) * 150, LV = 10, PER = 20, cap = LV * PER;
      const rack = new THREE.Group(); rack.position.set(X, 0, Z); rack.rotation.y = -a; g.add(rack);
      for (const dz of [-20, 20]) for (const dx of [-6, 6]) { const c = new THREE.Mesh(new THREE.BoxGeometry(1.4, 420, 1.4), S.shelf); c.position.set(dx, 0, dz); rack.add(c); }
      for (let lv = 0; lv < LV; lv++) { const s = new THREE.Mesh(new THREE.BoxGeometry(14, 0.8, 42), S.shelf); s.position.y = -200 + lv * 42; rack.add(s); }
      const inst = new THREE.InstancedMesh(new THREE.BoxGeometry(12.2, 2.6, 2.44), S.crate, cap);
      const mtx = new THREE.Matrix4(), col = new THREE.Color(), cols = ['#3a7d44', '#2f6690', '#d9731b', '#7d848c'];
      for (let i = 0; i < cap; i++) { const lv = i % LV, k = (i / LV) | 0; mtx.makeTranslation(0, -200 + lv * 42 + 1.7, -19 + k * 2.0); inst.setMatrixAt(i, mtx); inst.setColorAt(i, col.set(cols[(k / 4 | 0) % 4])); }
      inst.count = 0; rack.add(inst);
      (this._racks || (this._racks = [])).push({ inst, cap });
      this.onStored(api);
    }
    return g;
  },
});
