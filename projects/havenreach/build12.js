/* ============================================================
   AEGIS ARK · BUILD 12 · SHIP BAY & ASSEMBLY YARD
   Keep this file in the havenreach folder next to AegisArk.html.
   Trip 1 — the Small Ship Bay on the spindle between the disc and
            the landing deck: 4 hangar sections and 2 collars.
   Trip 2 — the Assembly Yard at the bottom of the spindle: 8 yard
            columns, 2 frame rings and the first ring section
            being built in it.
   Build 12 ends when you open the shipyard (press L). Station-7
            Havenreach is complete.
   ============================================================ */
(window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push({
  id: 12,
  name: 'SHIP BAY & ASSEMBLY YARD',
  brief: 'A hangar for small ships on the spindle above the disc, and a yard below the Vault where the station builds big parts itself.',

  types: {
    BAYSEC:  { code: 'HP', name: 'HANGAR SECTION', col: '#9a2a22', fixed: true, h: 85, fx: 120 },
    BAYCAP:  { code: 'SF', name: 'HANGAR COLLAR', col: '#6c757d', fixed: true, h: 20, fx: 120 },
    YARDCOL: { code: 'FB', name: 'YARD COLUMN', col: '#e8c13a', fixed: true, h: 300, fx: 60 },
    YARDRING:{ code: 'FB', name: 'YARD FRAME RING', col: '#e8c13a', fixed: true, h: 10, fx: 120 },
    YARDSEG: { code: 'SF', name: 'RING SECTION', col: '#6c757d', fixed: true, h: 60, fx: 120 },
  },
  trips: [
    { name: 'SMALL SHIP BAY', kits: { BAYSEC: 4, BAYCAP: 2 }, finish: 'unload' },
    { name: 'ASSEMBLY YARD', kits: { YARDCOL: 8, YARDRING: 2, YARDSEG: 1 }, finish: 'custom' },
  ],
  finishLabel: 'OPEN THE SHIPYARD',
  flags: ['yard'],

  setup(api) {
    const V = (x, y, z) => new api.THREE.Vector3(x, y, z), C = HAVEN.C, TAU = Math.PI * 2;
    const B0 = C.y + 255, B1 = C.y + 585, BH = (B1 - B0) / 4, YY = C.y - 860;
    Object.assign(this, { B0, B1, BH, YY });
    const slots = [], cnt = t => api.placed.filter(p => p.b === 12 && p.type === t).length;
    const add = (type, y, extra) => { const i = slots.length; slots.push({ type, x: C.x, y, z: C.z + i * 0.001, eye: V(760, 200, 900), look: V(0, 0, 0), ...extra }); };
    for (let k = 0; k < 2; k++) add('BAYCAP', k ? B1 : B0, { k, fx: V(0, 0, 0), needs: () => api.flag('power') ? null : 'NEEDS STATION POWER' });
    for (let k = 0; k < 4; k++) add('BAYSEC', B0 + (k + 0.5) * BH, { k, fx: V(0, 0, 0), needs: () => cnt('BAYCAP') >= 2 ? null : 'NEEDS BOTH HANGAR COLLARS' });
    for (let k = 0; k < 2; k++) add('YARDRING', YY + (k ? -150 : 150), { k, fx: V(0, 0, 0), needs: () => api.flag('power') ? null : 'NEEDS STATION POWER' });
    for (let k = 0; k < 8; k++) add('YARDCOL', YY, { k, fx: V(Math.cos(k / 8 * TAU) * 250, 0, Math.sin(k / 8 * TAU) * 250), needs: () => cnt('YARDRING') >= 2 ? null : 'NEEDS BOTH FRAME RINGS' });
    add('YARDSEG', YY, { fx: V(170, 0, 0), needs: () => cnt('YARDCOL') >= 8 ? null : 'NEEDS ALL 8 COLUMNS' });
    this.slots = slots; this.suggest = []; this.zones = [];
    this.finishCam = [V(C.x + 2600, C.y + 400, C.z + 3000), V(C.x, C.y - 300, C.z)];
  },
  rule(type, x, z, rot, api) {
    const [w, d] = api.footprint(type, rot);
    if (type.startsWith('SUPPLY') && x > 58 && x < 182 && Math.abs(z) - d / 2 < 182) return 'KEEP SUPPLY CRATES OFF THE LANDING PAD';
    return null;
  },
  ready(api) {
    const built = api.placed.filter(p => p.b === 12 && p.s !== undefined).length;
    if (api.trip === 1 && built < this.slots.length) return { ok: false, msg: 'SHIP BAY & YARD ' + built + ' / ' + this.slots.length + ' PARTS' };
    return { ok: true, msg: 'ALL DONE — PRESS L TO OPEN THE SHIPYARD' };
  },
  stats(api) {
    const c = t => api.placed.filter(p => p.b === 12 && p.type === t).length;
    return [['SMALL SHIP BAY', c('BAYSEC') + c('BAYCAP') + ' / 6'], ['ASSEMBLY YARD', c('YARDCOL') + c('YARDRING') + c('YARDSEG') + ' / 11']];
  },
  finishStart() { this._go = 0; },
  finishUpdate(api, dt) {
    this._go = (this._go || 0) + dt;
    if (this._go > 3 && !this._flash) { this._flash = true; api.sparkle(new api.THREE.Vector3(HAVEN.C.x + 170, this.YY, HAVEN.C.z), 10); }
    if (this._go >= 7) { api.setFlag('yard', true); return true; }
    return false;
  },
  tick(api, dt, t) {
    const S = this._mats; if (!S) return;
    const on = api.flag('yard');
    S.weld.visible = on && Math.sin(t * 9) > 0;
    S.bayGlow.color.setRGB(0.3 + (on ? 0.6 : 0.2), 0.5 + (on ? 0.7 : 0.2), 0.8 + (on ? 0.9 : 0.2));
  },
  make(type, api, p) {
    const { THREE, M } = api, TAU = Math.PI * 2, K = HAVEN.kit(THREE);
    const g = new THREE.Group();
    const add = (geo, mat, x = 0, y = 0, z = 0) => { const m = new THREE.Mesh(geo, mat); m.position.set(x, y, z); m.castShadow = m.receiveShadow = true; g.add(m); return m; };
    const S = this._mats || (this._mats = {
      hangar: new THREE.MeshStandardMaterial({ map: HAVEN.canvas(THREE, 1024, 256, (g2, w, h) => { g2.fillStyle = '#383d45'; g2.fillRect(0, 0, w, h); for (let y = 20; y < h; y += 60) for (let x = 10; x < w; x += 42) { g2.fillStyle = '#1a1d22'; g2.fillRect(x, y, 34, 40); } }, 4, 1), emissive: 0x7fdcff, emissiveIntensity: 0.12, metalness: 0.6, roughness: 0.45 }),
      bayGlow: new THREE.MeshBasicMaterial({ color: new THREE.Color(0.7, 1, 1.4) }),
      yellow: new THREE.MeshStandardMaterial({ color: 0xd9a21b, metalness: 0.5, roughness: 0.5 }),
      weld: new THREE.Mesh(new THREE.SphereGeometry(8, 8, 6), new THREE.MeshBasicMaterial({ color: new THREE.Color(0xbfe8ff).multiplyScalar(5) })),
    });
    const sl = this.slots[p.s];
    if (type === 'BAYCAP') { add(new THREE.CylinderGeometry(185, 185, 20, 48), K.armour); add(new THREE.TorusGeometry(186, 2, 6, 64).rotateX(Math.PI / 2), S.bayGlow).castShadow = false; }
    else if (type === 'BAYSEC') {
      add(new THREE.CylinderGeometry(170, 170, this.BH - 2, 48, 1, true), S.hangar).material.side = THREE.DoubleSide;
      for (let i = 0; i < 12; i++) { const a = i / 12 * TAU; const d = add(new THREE.BoxGeometry(2, this.BH * 0.5, 24), S.bayGlow, Math.cos(a) * 171, 0, Math.sin(a) * 171); d.rotation.y = -a; d.castShadow = false; }
    } else if (type === 'YARDRING') { add(new THREE.TorusGeometry(250, 5, 8, 8).rotateX(Math.PI / 2).rotateY(Math.PI / 8), S.yellow); }
    else if (type === 'YARDCOL') {
      const a = sl.k / 8 * TAU; add(new THREE.BoxGeometry(12, 300, 12), S.yellow, Math.cos(a) * 250, 0, Math.sin(a) * 250);
      const b = add(new THREE.BoxGeometry(4, 330, 4), S.yellow, Math.cos(a + TAU / 16) * 240, 0, Math.sin(a + TAU / 16) * 240); b.rotation.set(0, -a, 0.5);
    } else if (type === 'YARDSEG') {
      const s = add(new THREE.TorusGeometry(170, 26, 10, 48, Math.PI * 1.1).rotateX(Math.PI / 2), K.wallFor(170, 52));
      S.weld.position.set(Math.cos(Math.PI * 1.1) * 170, 0, -Math.sin(Math.PI * 1.1) * 170); g.add(S.weld);
    }
    return g;
  },
});
