/* ============================================================
   AEGIS ARK · BUILD 2 · LANDING DECK & TRANSPORTER
   Keep this file in the havenreach folder next to AegisArk.html.
   Trip 1 — 6 more deck tiles at the ends of Platform-1 and the station
            transporter (pad + 2 cores), all placed with the crane.
   Trip 2 — the big round landing deck around Platform-1: 8 deck
            sections, 8 struts, landing pads, hangars and the
            control tower, beamed in by the new transporter.
   Build 2 ends when you light up the landing deck (press L).
   ============================================================ */
(window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push({
  id: 2,
  name: 'LANDING DECK & TRANSPORTER',
  brief: 'The round landing deck on top of the station, with pads, hangars, a control tower and the station transporter.',

  types: {
    LTILE:   { code: 'SF', name: 'DECK TILE', col: '#6c757d', deck: true, w: 40, d: 60, h: 2.5, droneR: 26 },
    TXPAD:   { code: 'TP', name: 'TRANSPORTER PAD', col: '#e8e1d1', w: 30, d: 30, h: 3, droneR: 16, noRotate: true },
    TXCORE:  { code: 'TC', name: 'TRANSPORTER CORE', col: '#e8e1d1', w: 6, d: 6, h: 16, droneR: 8, noRotate: true },
    LDECK:   { code: 'SF', name: 'LANDING DECK SECTION', col: '#6c757d', fixed: true, h: 24, fx: 60 },
    LSTRUT:  { code: 'SF', name: 'DECK STRUT', col: '#6c757d', fixed: true, h: 60, fx: 40 },
    LPAD:    { code: 'DC', name: 'LANDING PAD', col: '#2f6690', fixed: true, h: 4, fx: 30 },
    LHANGAR: { code: 'HP', name: 'HANGAR', col: '#9a2a22', fixed: true, h: 30, fx: 30 },
    LTOWER:  { code: 'SY', name: 'CONTROL TOWER', col: '#e8e1d1', fixed: true, h: 130, fx: 60 },
  },

  trips: [
    { name: 'TRANSPORTER', kits: { LTILE: 6, TXPAD: 1, TXCORE: 2 }, finish: 'unload' },
    { name: 'THE LANDING DECK', kits: { LDECK: 8, LSTRUT: 8, LPAD: 8, LHANGAR: 4, LTOWER: 1 }, finish: 'custom' },
  ],
  finishLabel: 'LIGHT UP THE LANDING DECK',
  flags: ['deck'],
  stationTX: [['TXPAD', 1], ['TXCORE', 2]],
  grid: { x: [80, 120, 160], z: [-270, 270] },

  setup(api) {
    const V = (x, y, z) => new api.THREE.Vector3(x, y, z), L = HAVEN.LAND, TAU = Math.PI * 2;
    this.zones = [{ x0: 60, x1: 180, z0: -300, z1: -240, color: 0x40d0ff, name: 'TRANSPORTER' }];
    this.suggest = [-270, 270].flatMap(z => [120, 80, 160].map(x => ({ type: 'LTILE', x, z })));
    this.suggest.push({ type: 'TXPAD', x: 120, z: -270 }, { type: 'TXCORE', x: 85, z: -270 }, { type: 'TXCORE', x: 155, z: -270 });
    const slots = [], cnt = t => api.placed.filter(p => p.b === 2 && p.type === t).length;
    const add = (type, extra) => { const i = slots.length; slots.push({ type, x: L.x, y: L.y, z: L.z + i * 0.001, eye: V(900, 520, 1100), look: V(0, -120, 0), ...extra }); };
    const pol = (a, r, y = 0) => V(Math.cos(a) * r, y, Math.sin(a) * r);
    for (let k = 0; k < 8; k++) add('LDECK', { k, fx: pol((k + 0.5) / 8 * TAU, 380, 2), needs: () => cnt('TXCORE') >= 2 ? null : 'NEEDS THE TRANSPORTER' });
    for (let k = 0; k < 8; k++) add('LSTRUT', { k, fx: pol((k + 0.5) / 8 * TAU, 280, -130), needs: () => cnt('LDECK') >= 8 ? null : 'NEEDS THE WHOLE DECK' });
    for (let k = 0; k < 8; k++) add('LPAD', { k, fx: pol((k + 0.5) / 8 * TAU, 400, 2), needs: () => api.placed.some(p => p.b === 2 && p.type === 'LDECK' && slots[p.s] && slots[p.s].k === k) ? null : 'NEEDS THE DECK SECTION UNDER IT' });
    [1, 2, 6, 7].forEach((k, i) => add('LHANGAR', { k, i, fx: pol(k / 8 * TAU, 485, 10), needs: () => cnt('LDECK') >= 8 ? null : 'NEEDS THE WHOLE DECK' }));
    add('LTOWER', { k: 0, fx: pol(0, 470, 60), needs: () => cnt('LDECK') >= 8 ? null : 'NEEDS THE WHOLE DECK' });
    this.slots = slots;
    this.finishCam = [V(L.x + 900, L.y + 520, L.z + 1100), V(L.x, L.y - 120, L.z)];
  },

  rule(type, x, z, rot, api) {
    const [w, d] = api.footprint(type, rot);
    if (type.startsWith('SUPPLY') && x > 58 && x < 182 && Math.abs(z) - d / 2 < 182) return 'KEEP SUPPLY CRATES OFF THE LANDING PAD';
    if ((type === 'TXPAD' || type === 'TXCORE') && z > -240) return 'THE TRANSPORTER GOES ON THE NEW TILES AT THE BACK END';
    return null;
  },

  ready(api) {
    const built = api.placed.filter(p => p.b === 2 && p.s !== undefined).length;
    if (api.trip === 1 && built < this.slots.length) return { ok: false, msg: 'LANDING DECK ' + built + ' / ' + this.slots.length + ' PARTS' };
    return { ok: true, msg: 'DECK READY — PRESS L TO LIGHT IT UP' };
  },

  stats(api) {
    const c = t => api.placed.filter(p => p.b === 2 && p.type === t).length;
    return [
      ['TRANSPORTER', c('TXPAD') && c('TXCORE') >= 2 ? 'ONLINE' : 'OFFLINE'],
      ['LANDING DECK', c('LDECK') + ' / 8 sections'],
      ['STRUTS', c('LSTRUT') + ' / 8'],
      ['PADS · HANGARS · TOWER', c('LPAD') + c('LHANGAR') + c('LTOWER') + ' / 13'],
    ];
  },

  finishStart() { this._go = 0; },
  finishUpdate(api, dt) {
    this._go = (this._go || 0) + dt; this._level = Math.min(1, this._go / 5);
    if (this._go >= 7) { api.setFlag('deck', true); this._level = 1; return true; }
    return false;
  },
  tick(api, dt, t) {
    const S = this._mats; if (!S || !S.edge) return;
    const lv = api.flag('deck') ? 1 : (this._level || 0), b = 0.6 + 0.4 * Math.sin(t * 2.5);
    S.edge.color.setRGB(0.15 + 0.4 * lv * b, 0.3 + 1.2 * lv * b, 0.4 + 2.0 * lv * b);
    S.padLight.color.setRGB(0.2 + 1.6 * lv, 0.25 + 1.4 * lv, 0.1 + 0.4 * lv);
  },

  make(type, api, p) {
    const { THREE, M } = api, TAU = Math.PI * 2, L = HAVEN.LAND;
    if (type === 'LTILE') return window.AEGIS_BUILDS.find(b => b.id === 1).make('DECK', api, p);
    const g = new THREE.Group();
    const add = (geo, mat, x = 0, y = 0, z = 0, parent = g) => { const m = new THREE.Mesh(geo, mat); m.position.set(x, y, z); m.castShadow = m.receiveShadow = true; parent.add(m); return m; };
    const K = HAVEN.kit(THREE);
    const S = this._mats || (this._mats = {
      deck: new THREE.MeshStandardMaterial({ map: HAVEN.canvas(THREE, 512, 512, (c, w, h) => { c.fillStyle = '#2c3138'; c.fillRect(0, 0, w, h); c.strokeStyle = '#3c434c'; c.lineWidth = 3; for (let x = 0; x <= w; x += 32) { c.beginPath(); c.moveTo(x, 0); c.lineTo(x, h); c.stroke(); c.beginPath(); c.moveTo(0, x); c.lineTo(w, x); c.stroke(); } }), roughness: 0.8, metalness: 0.3 }),
      side: new THREE.MeshStandardMaterial({ color: 0x3a3e46, roughness: 0.5, metalness: 0.7, side: THREE.DoubleSide }),
      pad: new THREE.MeshStandardMaterial({ map: HAVEN.canvas(THREE, 256, 256, (c, w, h) => { c.fillStyle = '#2c3138'; c.fillRect(0, 0, w, h); c.strokeStyle = '#ffd166'; c.lineWidth = 10; c.beginPath(); c.arc(128, 128, 112, 0, TAU); c.stroke(); c.fillStyle = '#e8eef5'; c.font = 'bold 150px Arial'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('H', 128, 136); }), roughness: 0.8 }),
      txpad: new THREE.MeshStandardMaterial({ map: HAVEN.canvas(THREE, 512, 512, (c, w, h) => { c.fillStyle = '#0b1622'; c.fillRect(0, 0, w, h); c.strokeStyle = '#7fd8ff'; c.lineWidth = 4; for (let r = 40; r < 256; r += 36) { c.beginPath(); c.arc(256, 256, r, 0, 7); c.stroke(); } }), emissive: 0x2a7fbf, emissiveIntensity: 0.9, metalness: 0.3, roughness: 0.5 }),
      core: new THREE.MeshBasicMaterial({ color: new THREE.Color(0.5, 0.85, 1.6) }),
      edge: new THREE.MeshBasicMaterial({ color: new THREE.Color(0.15, 0.3, 0.4) }),
      padLight: new THREE.MeshBasicMaterial({ color: new THREE.Color(0.2, 0.25, 0.1) }),
      hangar: new THREE.MeshStandardMaterial({ color: 0xc8ccd2, roughness: 0.5, metalness: 0.5 }),
    });
    const sl = p.s !== undefined && this.slots ? this.slots[p.s] : null;

    if (type === 'TXPAD') {
      add(new THREE.CylinderGeometry(15, 15.6, 1.6, 48), M.gun, 0, 0.8, 0);
      add(new THREE.CylinderGeometry(13.6, 13.6, 0.3, 48), S.txpad, 0, 1.75, 0);
      for (let i = 0; i < 8; i++) { const a = i / 8 * TAU; add(new THREE.BoxGeometry(1.2, 3, 1.2), M.armor, Math.cos(a) * 14.6, 3, Math.sin(a) * 14.6); add(new THREE.SphereGeometry(0.5, 8, 6), S.core, Math.cos(a) * 14.6, 4.7, Math.sin(a) * 14.6).castShadow = false; }
    } else if (type === 'TXCORE') {
      add(new THREE.BoxGeometry(6, 2, 6), M.armor, 0, 1, 0);
      add(new THREE.CylinderGeometry(1.6, 1.6, 12, 16), S.core, 0, 8, 0).castShadow = false;
      for (let i = 0; i < 4; i++) { const a = i / 4 * TAU + Math.PI / 4; add(new THREE.BoxGeometry(0.6, 13, 0.6), M.gun, Math.cos(a) * 2.6, 8.5, Math.sin(a) * 2.6); }
      add(new THREE.BoxGeometry(6, 1.6, 6), M.armor, 0, 15, 0);
      const l = new THREE.Mesh(new THREE.SphereGeometry(0.6, 8, 6), new THREE.MeshBasicMaterial({ color: 0x7fd8ff })); l.position.y = 16.2; g.add(l); api.blink(l, 1.2, 0x7fd8ff);
    } else if (type === 'LDECK') {
      const a0 = sl.k / 8 * TAU, a1 = (sl.k + 1) / 8 * TAU, R = L.r;
      const top = new THREE.Mesh(HAVEN.ann(THREE, 0.5, R, a0, a1, -1.8, false, 64), S.deck); top.receiveShadow = true; g.add(top);
      const rim = new THREE.CylinderGeometry(R, R * 0.82, 26, 24, 1, true, Math.PI / 2 - a1, a1 - a0); rim.translate(0, -14.8, 0); add(rim, S.side);
      add(HAVEN.ann(THREE, 0.5, R * 0.82, a0, a1, -27.8, true, 64), S.side);
      add(HAVEN.ann(THREE, R - 5, R - 1, a0, a1, -1.6, false), S.edge).castShadow = false;
    } else if (type === 'LSTRUT') {
      const a = (sl.k + 0.5) / 8 * TAU, A = new THREE.Vector3(Math.cos(a) * 380, -30, Math.sin(a) * 380), B = new THREE.Vector3(Math.cos(a) * 180, -175, Math.sin(a) * 180);
      const s = add(new THREE.CylinderGeometry(6, 8, A.distanceTo(B), 10), M.armor); s.position.copy(A).add(B).multiplyScalar(0.5); s.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), A.clone().sub(B).normalize());
      for (const q of [A, B]) add(new THREE.SphereGeometry(10, 12, 8), M.gun, q.x, q.y, q.z);
    } else if (type === 'LPAD') {
      const a = (sl.k + 0.5) / 8 * TAU, x = Math.cos(a) * 400, z = Math.sin(a) * 400;
      add(new THREE.CylinderGeometry(36, 36, 0.6, 40), S.pad, x, -1.4, z);
      for (let q = 0; q < 12; q++) { const b = q / 12 * TAU; add(new THREE.SphereGeometry(0.9, 8, 6), S.padLight, x + Math.cos(b) * 38, -0.6, z + Math.sin(b) * 38).castShadow = false; }
    } else if (type === 'LHANGAR') {
      const a = sl.k / 8 * TAU, x = Math.cos(a) * 485, z = Math.sin(a) * 485;
      const h = add(new THREE.SphereGeometry(1, 24, 12, 0, TAU, 0, Math.PI / 2), S.hangar, x, -1.8, z); h.scale.set(30, 22, 26); h.rotation.y = -a;
      const door = add(new THREE.BoxGeometry(2, 14, 30), M.gun, x - Math.cos(a) * 29, 5, z - Math.sin(a) * 29); door.rotation.y = -a;
    } else if (type === 'LTOWER') {
      const x = 470, z = 0;
      add(new THREE.CylinderGeometry(10, 14, 120, 16), K.std(0xd8dde2, 0.4, 0.5), x, 58, z);
      add(new THREE.CylinderGeometry(24, 20, 16, 16), K.glassy, x, 126, z);
      add(new THREE.CylinderGeometry(25, 25, 2, 16), M.gun, x, 135, z);
      const l = new THREE.Mesh(new THREE.SphereGeometry(2, 10, 8), new THREE.MeshBasicMaterial({ color: 0xff3030 })); l.position.set(x, 142, z); g.add(l); api.blink(l, 1.4, 0xff3030);
    }
    return g;
  },
});
