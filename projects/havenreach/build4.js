/* ============================================================
   AEGIS ARK · BUILD 4 · HEARTFORGE ENGINE
   Keep this file in the havenreach folder next to AegisArk.html.
   Trip 1 — the containment cage on the spindle where the disc's
            centre will be: 8 shell sections and 2 big collars.
   Trip 2 — the engine itself: the core, 3 drive rings and 8 coils.
   Build 4 ends when you light the Heartforge (press L). The station
            has power from then on.
   ============================================================ */
(window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push({
  id: 4,
  name: 'HEARTFORGE ENGINE',
  brief: 'The warp engine at the heart of the station, on the spindle at the centre of the disc. It powers everything.',

  types: {
    HSHELL:  { code: 'CS', name: 'CONTAINMENT SHELL', col: '#b03a2e', fixed: true, h: 250, fx: 120 },
    HCOLLAR: { code: 'SF', name: 'ENGINE COLLAR', col: '#6c757d', fixed: true, h: 47, fx: 120 },
    HCORE:   { code: 'HC', name: 'HEARTFORGE CORE', col: '#d9731b', fixed: true, h: 160, fx: 0 },
    HRING:   { code: 'HC', name: 'DRIVE RING', col: '#d9731b', fixed: true, h: 230, fx: 100 },
    HCOIL:   { code: 'HC', name: 'WARP COIL', col: '#d9731b', fixed: true, h: 40, fx: 120 },
  },
  trips: [
    { name: 'CONTAINMENT CAGE', kits: { HSHELL: 8, HCOLLAR: 2 }, finish: 'unload' },
    { name: 'THE ENGINE', kits: { HCORE: 1, HRING: 3, HCOIL: 8 }, finish: 'custom' },
  ],
  finishLabel: 'LIGHT THE HEARTFORGE',
  flags: ['power'],

  setup(api) {
    const V = (x, y, z) => new api.THREE.Vector3(x, y, z), C = HAVEN.C, TAU = Math.PI * 2;
    const slots = [], cnt = t => api.placed.filter(p => p.b === 4 && p.type === t).length;
    const add = (type, extra) => { const i = slots.length; slots.push({ type, x: C.x, y: C.y, z: C.z + i * 0.001, eye: V(520, 240, 640), look: V(0, 0, 0), ...extra }); };
    const spine = () => api.placed.filter(p => p.type === 'SPINE').length >= 12 ? null : 'NEEDS THE WHOLE SPINDLE';
    for (let k = 0; k < 2; k++) add('HCOLLAR', { k, fx: V(0, k ? -195 : 195, 0), needs: spine });
    for (let k = 0; k < 8; k++) add('HSHELL', { k, fx: V(Math.cos((k + 0.5) / 8 * TAU) * 125, 0, Math.sin((k + 0.5) / 8 * TAU) * 125), needs: () => cnt('HCOLLAR') >= 2 ? null : 'NEEDS BOTH COLLARS' });
    add('HCORE', { fx: V(0, 0, 0), needs: () => cnt('HSHELL') >= 4 ? null : 'NEEDS THE CAGE AROUND IT' });
    for (let k = 0; k < 3; k++) add('HRING', { k, fx: V(100 + k * 12, 0, 0), needs: () => cnt('HCORE') ? null : 'NEEDS THE CORE' });
    for (let k = 0; k < 8; k++) add('HCOIL', { k, fx: V(Math.cos(k / 8 * TAU) * 135, 0, Math.sin(k / 8 * TAU) * 135), needs: () => cnt('HCORE') ? null : 'NEEDS THE CORE' });
    this.slots = slots; this.suggest = []; this.zones = [];
    this.finishCam = [V(C.x + 520, C.y + 240, C.z + 640), V(C.x, C.y, C.z)];
  },

  rule(type, x, z, rot, api) {
    const [w, d] = api.footprint(type, rot);
    if (type.startsWith('SUPPLY') && x > 58 && x < 182 && Math.abs(z) - d / 2 < 182) return 'KEEP SUPPLY CRATES OFF THE LANDING PAD';
    return null;
  },
  ready(api) {
    const built = api.placed.filter(p => p.b === 4 && p.s !== undefined).length;
    if (api.trip === 1 && built < this.slots.length) return { ok: false, msg: 'HEARTFORGE ' + built + ' / ' + this.slots.length + ' PARTS' };
    return { ok: true, msg: 'ENGINE READY — PRESS L TO LIGHT THE HEARTFORGE' };
  },
  stats(api) {
    const c = t => api.placed.filter(p => p.b === 4 && p.type === t).length;
    return [['CONTAINMENT CAGE', c('HSHELL') + c('HCOLLAR') + ' / 10'], ['ENGINE', c('HCORE') + c('HRING') + c('HCOIL') + ' / 12'], ...(api.flag('power') ? [] : [['STATION POWER', 'OFF']])];
  },
  finishStart() { this._ign = 0; },
  finishUpdate(api, dt) {
    this._ign = (this._ign || 0) + dt; this._level = Math.min(1, this._ign / 7);
    if (this._ign > 6 && !this._flashed) { this._flashed = true; api.sparkle(new api.THREE.Vector3(HAVEN.C.x, HAVEN.C.y, HAVEN.C.z), 16); }
    if (this._ign >= 8) { api.setFlag('power', true); this._level = 1; return true; }
    return false;
  },
  tick(api, dt, t) {
    const S = this._mats; if (!S) return;
    const lv = api.flag('power') ? 1 : (this._level || 0);
    S.core.color.setRGB((0.3 + 1.9 * lv) * (1 + 0.06 * Math.sin(t * 3)), 0.15 + 1.5 * lv, 0.08 + 0.9 * lv);
    S.ring.color.setRGB(0.25 + 1.55 * lv, 0.15 + 1.1 * lv, 0.08 + 0.7 * lv);
    S.coil.emissiveIntensity = 0.1 + 1.4 * lv;
    (this._rings || []).forEach((r, i) => { r.rotation.x += dt * (0.1 + lv * (0.6 + i * 0.3)); r.rotation.y += dt * (0.05 + lv * (0.4 - i * 0.2)); });
  },
  make(type, api, p) {
    const { THREE, M } = api, TAU = Math.PI * 2, K = HAVEN.kit(THREE);
    const g = new THREE.Group();
    const add = (geo, mat, x = 0, y = 0, z = 0, parent = g) => { const m = new THREE.Mesh(geo, mat); m.position.set(x, y, z); m.castShadow = m.receiveShadow = true; parent.add(m); return m; };
    const S = this._mats || (this._mats = {
      core: new THREE.MeshBasicMaterial({ color: new THREE.Color(0.3, 0.15, 0.08) }),
      ring: new THREE.MeshBasicMaterial({ color: new THREE.Color(0.25, 0.15, 0.08) }),
      shell: new THREE.MeshStandardMaterial({ color: 0x3a3e46, metalness: 0.8, roughness: 0.35, transparent: true, opacity: 0.55, side: THREE.DoubleSide, depthWrite: false }),
      coil: new THREE.MeshStandardMaterial({ color: 0x2a1a12, emissive: 0xff6a20, emissiveIntensity: 0.1, roughness: 0.5, metalness: 0.5 }),
    });
    const sl = this.slots[p.s];
    if (type === 'HCOLLAR') {
      const y = sl.k ? -195 : 195;
      add(new THREE.CylinderGeometry(125, 125, 47, 48), K.steel, 0, y, 0);
      add(new THREE.TorusGeometry(126, 4.7, 6, 64).rotateX(Math.PI / 2), K.strip, 0, y + (sl.k ? -24 : 24), 0).castShadow = false;
    } else if (type === 'HSHELL') {
      const a0 = sl.k / 8 * TAU;
      add(new THREE.SphereGeometry(125, 12, 24, Math.PI / 2 - a0 - TAU / 8, TAU / 8, 0.5, Math.PI - 1.0), S.shell).castShadow = false;
      const rib = add(new THREE.TorusGeometry(125, 3, 6, 48, Math.PI), K.steel); rib.rotation.set(0, -a0, Math.PI / 2);
    } else if (type === 'HCORE') {
      add(new THREE.SphereGeometry(78, 48, 32), S.core).castShadow = false;
    } else if (type === 'HRING') {
      const r = add(new THREE.TorusGeometry(100 + sl.k * 12, 4, 8, 96), S.ring); r.castShadow = false; r.rotation.set(sl.k * 1.1, sl.k * 0.7, 0);
      (this._rings || (this._rings = [])).push(r);
    } else if (type === 'HCOIL') {
      const a = sl.k / 8 * TAU, c = add(new THREE.CylinderGeometry(14, 14, 36, 20), S.coil, Math.cos(a) * 135, 0, Math.sin(a) * 135);
      for (const dy of [-12, 0, 12]) add(new THREE.TorusGeometry(15, 1.5, 6, 24).rotateX(Math.PI / 2), M.gun, Math.cos(a) * 135, dy, Math.sin(a) * 135);
    }
    return g;
  },
});
