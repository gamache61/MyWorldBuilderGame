/* ============================================================
   AEGIS ARK · BUILD 13 · DEFENSE SQUADRON
   Keep this file in the havenreach folder next to AegisArk.html.
   Trip 1 — 4 launch racks and the first 10 fighters, beamed onto
            the east side of the landing deck.
   Trip 2 — the other 10 fighters and the squadron control mast.
   Build 13 ends when you launch the squadron (press L). From then on
            the 20 fighters fly patrol circuits around the station.
   ============================================================ */
(window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push({
  id: 13,
  haven: true,
  name: 'DEFENSE SQUADRON',
  brief: 'Twenty small, fast fighters that park on the landing deck and fly patrol around Station-7 Havenreach.',

  types: {
    FRACK:  { code: 'SF', name: 'LAUNCH RACK', col: '#6c757d', fixed: true, h: 6, fx: 60 },
    FIGHTER:{ code: 'DF', name: 'DEFENSE FIGHTER', col: '#2f6690', fixed: true, h: 6, fx: 14 },
    FCOMM:  { code: 'SY', name: 'SQUADRON CONTROL', col: '#e8e1d1', fixed: true, h: 60, fx: 30 },
  },
  trips: [
    { name: 'FIRST FLIGHT', kits: { FRACK: 4, FIGHTER: 10 }, finish: 'unload' },
    { name: 'SECOND FLIGHT', kits: { FIGHTER: 10, FCOMM: 1 }, finish: 'custom' },
  ],
  finishLabel: 'LAUNCH THE SQUADRON',
  flags: ['squadron'],

  setup(api) {
    const V = (x, y, z) => new api.THREE.Vector3(x, y, z), L = HAVEN.LAND, D = Math.PI / 180;
    const slots = [], cnt = t => api.placed.filter(p => p.b === 13 && p.type === t).length;
    const add = (type, extra) => { const i = slots.length; slots.push({ type, x: L.x, y: L.y, z: L.z + i * 0.001, eye: V(700, 260, 300), look: V(200, -40, 0), ...extra }); };
    const pol = (a, r, y = 0) => V(Math.cos(a) * r, y, Math.sin(a) * r);
    // parking spots: two arcs on the east side of the deck, clear of Platform-1, the pads and the hangars
    this._spots = [];
    for (let row = 0; row < 2; row++) for (let j = 0; j < 10; j++) {
      const a = (-58 + j * (116 / 9)) * D, r = row ? 310 : 235;
      this._spots.push({ a, r, x: Math.cos(a) * r, z: Math.sin(a) * r });
    }
    // racks: one under each half-row (rows 0/1 × left/right)
    for (let k = 0; k < 4; k++) { const row = k >> 1, side = k & 1; add('FRACK', { k, row, side, fx: pol((side ? 32 : -32) * D, row ? 310 : 235, 2), needs: () => api.flag('deck') ? null : 'NEEDS THE LANDING DECK' }); }
    for (let i = 0; i < 20; i++) {
      const s = this._spots[i], rack = (i >= 10 ? 2 : 0) + (i % 10 >= 5 ? 1 : 0);
      add('FIGHTER', { i, fx: V(s.x, 4, s.z), needs: () => api.placed.some(p => p.b === 13 && p.type === 'FRACK' && slots[p.s] && slots[p.s].k === rack) ? null : 'NEEDS ITS LAUNCH RACK' });
    }
    add('FCOMM', { fx: pol(0, 372, 30), needs: () => cnt('FIGHTER') >= 10 ? null : 'NEEDS THE FIRST FLIGHT' });
    this.slots = slots; this.suggest = []; this.zones = [];
    this.finishCam = [V(L.x + 1100, L.y + 420, L.z + 900), V(L.x + 250, L.y + 60, L.z)];
  },

  rule(type, x, z, rot, api) {
    const [w, d] = api.footprint(type, rot);
    if (type.startsWith('SUPPLY') && x > 58 && x < 182 && Math.abs(z) - d / 2 < 182) return 'KEEP SUPPLY CRATES OFF THE LANDING PAD';
    return null;
  },
  ready(api) {
    const built = api.placed.filter(p => p.b === 13 && p.s !== undefined).length;
    if (api.trip === 1 && built < this.slots.length) return { ok: false, msg: 'SQUADRON ' + built + ' / ' + this.slots.length + ' PARTS' };
    return { ok: true, msg: 'ALL 20 FIGHTERS READY — PRESS L TO LAUNCH THE SQUADRON' };
  },
  stats(api) {
    const c = t => api.placed.filter(p => p.b === 13 && p.type === t).length;
    return [['FIGHTERS', c('FIGHTER') + ' / 20'], ['LAUNCH RACKS', c('FRACK') + ' / 4'], ['SQUADRON CONTROL', c('FCOMM') ? 'ONLINE' : 'NOT BUILT'], ['PATROL', api.flag('squadron') ? '20 ON PATROL' : 'GROUNDED']];
  },

  finishStart() { this._go = 0; },
  finishUpdate(api, dt) {
    this._go = (this._go || 0) + dt;
    if (this._go >= 16) { api.setFlag('squadron', true); return true; }
    return false;
  },

  // where fighter i is on its patrol circuit at time t (world coordinates)
  _orbit(i, t, out) {
    const C = HAVEN.C, lane = i % 4, dir = i % 2 ? -1 : 1;
    const R = 2750 + lane * 170 + (i % 3) * 40, w = dir * (0.11 + lane * 0.012);
    const a = t * w + i * (Math.PI * 2 / 20) * 3.0;
    const tilt = (lane - 1.5) * 0.12, h = 120 + (i % 5) * 110;
    out.set(C.x + Math.cos(a) * R, C.y + h + Math.sin(a * 1.5 + i) * 90 + Math.sin(a) * R * tilt, C.z + Math.sin(a) * R);
    return out;
  },

  tick(api, dt, t) {
    const S = this._mats; if (!S) return;
    const THREE = api.THREE, flying = api.flag('squadron'), go = flying ? Infinity : (this._go || 0);
    const v = this._v || (this._v = { a: new THREE.Vector3(), b: new THREE.Vector3(), c: new THREE.Vector3(), w: new THREE.Vector3(), park: new THREE.Vector3() });
    S.glow.color.setRGB(0.4 + 1.6 * (0.7 + 0.3 * Math.sin(t * 9)), 0.8 + 1.0 * (0.7 + 0.3 * Math.sin(t * 9)), 2.2);
    for (const p of api.placed) {
      if (p.b !== 13 || p.type !== 'FIGHTER' || !p.piece || !p.piece.userData.craft) continue;
      const craft = p.piece.userData.craft, i = craft.userData.i, sp = craft.userData.spot, U = craft.userData;
      U.trail.visible = U.halo.visible = false;
      if (go <= 0 || !this._spots) { craft.position.set(sp.x, 2.8, sp.z); craft.rotation.set(0, Math.PI / 2 - sp.a, 0); craft.userData.flame.scale.z = 0.3; continue; }
      p.piece.updateMatrixWorld(true);
      const base = v.w.setFromMatrixPosition(p.piece.matrixWorld);
      v.park.set(base.x + sp.x, base.y + 2.8, base.z + sp.z);
      const tl = go - i * 0.55;              // each fighter takes off a moment after the one before
      let pos, ahead;
      if (tl <= 0) { craft.position.set(sp.x, 2.8, sp.z); craft.rotation.set(0, Math.PI / 2 - sp.a, 0); craft.userData.flame.scale.z = 0.6; continue; }
      if (tl < 1.6) {                         // lift straight up off the rack
        const k = tl / 1.6, e = k * k * (3 - 2 * k);
        pos = v.a.copy(v.park); pos.y += 45 * e;
        ahead = v.b.set(pos.x + Math.cos(sp.a) * 50, pos.y + 2, pos.z + Math.sin(sp.a) * 50);
        craft.userData.flame.scale.z = 0.8 + k;
      } else {                                // blast out to the patrol circuit
        const k = Math.min(1, (tl - 1.6) / 5), e = k * k * (3 - 2 * k);
        const lift = v.c.copy(v.park); lift.y += 45; lift.x += Math.cos(sp.a) * 260 * e; lift.z += Math.sin(sp.a) * 260 * e;
        const orb = this._orbit(i, t, v.a);
        pos = orb.lerp(lift, 1 - e);
        const nx = this._orbit(i, t + 0.4, v.b);
        ahead = k < 1 ? nx.lerp(lift, 1 - Math.min(1, e + 0.15)) : nx;
        craft.userData.flame.scale.z = 2.2; U.halo.visible = true; U.trail.visible = k > 0.3;
      }
      craft.position.set(pos.x - base.x, pos.y - base.y, pos.z - base.z);
      craft.lookAt(ahead);
    }
  },

  make(type, api, p) {
    const { THREE, M } = api, TAU = Math.PI * 2, K = HAVEN.kit(THREE);
    const g = new THREE.Group();
    const add = (geo, mat, x = 0, y = 0, z = 0, parent = g) => { const m = new THREE.Mesh(geo, mat); m.position.set(x, y, z); m.castShadow = m.receiveShadow = true; parent.add(m); return m; };
    const S = this._mats || (this._mats = {
      hull: new THREE.MeshStandardMaterial({ color: 0xd9dee4, roughness: 0.35, metalness: 0.6 }),
      wing: new THREE.MeshStandardMaterial({ color: 0xd9dee4, roughness: 0.35, metalness: 0.6, side: THREE.DoubleSide }),
      dark: new THREE.MeshStandardMaterial({ color: 0x23272e, roughness: 0.5, metalness: 0.7 }),
      stripe: new THREE.MeshStandardMaterial({ color: 0x2f6690, roughness: 0.4, metalness: 0.5 }),
      canopy: new THREE.MeshStandardMaterial({ color: 0x0a1a2a, emissive: 0x164a7a, emissiveIntensity: 0.6, roughness: 0.1, metalness: 0.9 }),
      glow: new THREE.MeshBasicMaterial({ color: new THREE.Color(1.6, 1.6, 2.2) }),
      flame: new THREE.MeshBasicMaterial({ color: new THREE.Color(0.5, 0.9, 2.5), transparent: true, opacity: 0.75, blending: THREE.AdditiveBlending, depthWrite: false }),
      trail: new THREE.MeshBasicMaterial({ color: new THREE.Color(0.25, 0.55, 1.4), transparent: true, opacity: 0.55, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide }),
      halo: new THREE.SpriteMaterial({ map: HAVEN.canvas(THREE, 64, 64, (c, w, h) => { const gr = c.createRadialGradient(32, 32, 0, 32, 32, 32); gr.addColorStop(0, 'rgba(220,240,255,1)'); gr.addColorStop(0.25, 'rgba(120,190,255,0.6)'); gr.addColorStop(1, 'rgba(60,120,255,0)'); c.fillStyle = gr; c.fillRect(0, 0, w, h); }), color: 0xffffff, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false }),
      rack: new THREE.MeshStandardMaterial({ color: 0x3a3e46, roughness: 0.6, metalness: 0.6 }),
      lamp: new THREE.MeshBasicMaterial({ color: new THREE.Color(1.8, 1.3, 0.3) }),
    });
    const sl = p.s !== undefined && this.slots ? this.slots[p.s] : null;

    if (type === 'FIGHTER') {
      // a ~20 m dart: nose toward +z
      const c = new THREE.Group(); g.add(c);
      const body = add(new THREE.CylinderGeometry(1.5, 1.9, 13, 12).rotateX(Math.PI / 2), S.hull, 0, 0, 0, c);
      add(new THREE.ConeGeometry(1.5, 6, 12).rotateX(Math.PI / 2), S.hull, 0, 0, 9.5, c);
      add(new THREE.SphereGeometry(1.2, 12, 8, 0, TAU, 0, Math.PI / 2).scale(1, 0.8, 2.4), S.canopy, 0, 1.2, 4.5, c);
      for (const s of [1, -1]) {
        const wing = new THREE.Shape(); wing.moveTo(0, 4); wing.lineTo(9 * s, -3.5); wing.lineTo(9 * s, -5.5); wing.lineTo(0, -5); wing.lineTo(0, 4);
        add(new THREE.ExtrudeGeometry(wing, { depth: 0.5, bevelEnabled: false }).rotateX(Math.PI / 2), S.wing, 0, 0.2, 0, c);
        add(new THREE.BoxGeometry(0.6, 0.6, 5), S.dark, s * 8.6, 0, -4, c);                       // wing-tip cannon
        add(new THREE.BoxGeometry(3.4, 0.55, 0.9), S.stripe, s * 4, 0.3, -1.5, c);
        const fin = add(new THREE.BoxGeometry(0.35, 3.6, 3.4), S.stripe, s * 1.6, 2, -5, c); fin.rotation.z = s * -0.35;
        add(new THREE.SphereGeometry(0.35, 6, 4), s > 0 ? new THREE.MeshBasicMaterial({ color: 0x20ff40 }) : new THREE.MeshBasicMaterial({ color: 0xff2020 }), s * 9, 0.2, -5.2, c).castShadow = false;
      }
      add(new THREE.CylinderGeometry(1.7, 1.3, 2, 12).rotateX(Math.PI / 2), S.dark, 0, 0, -7.3, c);
      add(new THREE.CircleGeometry(1.25, 16).rotateY(Math.PI), S.glow, 0, 0, -8.35, c).castShadow = false;
      const flame = add(new THREE.ConeGeometry(1.2, 7, 12, 1, true).rotateX(-Math.PI / 2).translate(0, 0, -3.5), S.flame, 0, 0, -8.4, c); flame.castShadow = false;
      // long engine trail + glow so the fighters can be picked out from far away while on patrol
      const trail = add(new THREE.CylinderGeometry(0.2, 1.3, 1, 8, 1, true).rotateX(-Math.PI / 2).translate(0, 0, -0.5), S.trail, 0, 0, -8.4, c); trail.castShadow = false; trail.scale.z = 140; trail.visible = false;
      const halo = new THREE.Sprite(S.halo); halo.scale.setScalar(26); halo.position.z = -9; halo.visible = false; c.add(halo);
      for (const [x, z] of [[0, 6], [-2.4, -3], [2.4, -3]]) add(new THREE.CylinderGeometry(0.25, 0.25, 1.6, 6), S.dark, x, -2, z, c);
      const sp = this._spots[sl.i];
      c.userData = { i: sl.i, spot: sp, flame, trail, halo };
      c.position.set(sp.x, 2.8, sp.z); c.rotation.y = Math.PI / 2 - sp.a;
      g.userData.craft = c;
    } else if (type === 'FRACK') {
      // a curved launch rack under five parking spots
      const a0 = (sl.side ? 0 : -1) * 62 * Math.PI / 180, a1 = a0 + 62 * Math.PI / 180, r = sl.row ? 310 : 235;
      add(HAVEN.ann(THREE, r - 16, r + 16, a0 + 0.02, a1 - 0.02, -1.0, false, 24), S.rack).castShadow = false;
      for (let j = 0; j < 5; j++) {
        const sp = this._spots[sl.row * 10 + sl.side * 5 + j];
        add(new THREE.CylinderGeometry(11, 11, 0.8, 24), S.dark, sp.x, -0.4, sp.z);
        for (let q = 0; q < 6; q++) { const b = q / 6 * TAU; add(new THREE.SphereGeometry(0.6, 6, 4), S.lamp, sp.x + Math.cos(b) * 11.5, 0.2, sp.z + Math.sin(b) * 11.5).castShadow = false; }
        add(new THREE.BoxGeometry(2, 1.2, 2), M.gun, sp.x - Math.cos(sp.a) * 9, 0.6, sp.z - Math.sin(sp.a) * 9);
      }
    } else if (type === 'FCOMM') {
      const x = 372, z = 0;
      add(new THREE.CylinderGeometry(5, 7, 50, 12), K.std(0xd8dde2, 0.4, 0.5), x, 24, z);
      add(new THREE.BoxGeometry(18, 8, 14), S.dark, x, 52, z);
      add(new THREE.BoxGeometry(18.4, 2, 14.4), S.canopy, x, 54, z);
      const dish = add(new THREE.SphereGeometry(7, 16, 8, 0, TAU, 0, Math.PI / 3), S.hull, x, 60, z); dish.rotation.x = Math.PI; dish.position.y = 66;
      const l = new THREE.Mesh(new THREE.SphereGeometry(1.4, 10, 8), new THREE.MeshBasicMaterial({ color: 0x40a0ff })); l.position.set(x, 70, z); g.add(l); api.blink(l, 1.0, 0x40a0ff);
    }
    return g;
  },
});
