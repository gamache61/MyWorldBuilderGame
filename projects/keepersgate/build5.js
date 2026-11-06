/* ============================================================
   THE KEEPER'S GATE · BUILD 5 · THE HEART LINK
   Keep this file in projects/keepersgate next to keepersgate.html.
   Eight emitters on the inside of the ring, four capacitor banks,
   and the link spire behind the gate that catches the power of the
   Heart of Unity. Ends with L: the Heart's power reaches the gate.
   ============================================================ */
(window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push({
  id: 5,
  name: 'THE HEART LINK',
  brief: 'Eight emitters inside the ring, four capacitor banks and the link spire; the Heart of Unity sends its power and the ring wakes up.',

  types: {
    EMIT: { code: 'EM', name: 'GATE EMITTER',   col: '#5fe8d8', fixed: true, w: 10, d: 10, h: 14, fx: 2 },
    CAP:  { code: 'CP', name: 'CAPACITOR BANK', col: '#e8c13a', fixed: true, w: 22, d: 16, h: 18, fx: 2 },
    LINK: { code: 'LK', name: 'HEART LINK SPIRE', col: '#ff9a3a', fixed: true, w: 24, d: 24, h: 150, fx: 4 },
  },
  trips: [{ name: 'THE HEART LINK', kits: { EMIT: 8, CAP: 4, LINK: 1 }, finish: 'custom' }],
  finishLabel: 'LINK THE GATE TO THE HEART OF UNITY',

  // the spire stands behind the gate, so you see it through the ring from the landing field
  LINK_AT: { x: 780, z: 0, h: 140 },
  // the Heart's light comes from the direction of the Council Hall
  HEART_FROM: { x: 1700, y: 520, z: 260 },

  setup(api) {
    const { THREE } = api, V = (x, y, z) => new THREE.Vector3(x, y, z), KG = window.KG, DT = api.DECK_TOP;
    const GC = V(KG.C.x, KG.C.y, KG.C.z), E = V(-430, 30, 300);
    const shot = (w) => ({ look: GC.clone().sub(w), eye: GC.clone().add(E).sub(w) });
    this.slots = [];
    for (let k = 0; k < 8; k++) { const a = Math.PI / 8 + k * Math.PI / 4, w = KG.at(api, a, KG.RI - 1); this.slots.push({ type: 'EMIT', x: Math.round((w.x + k * 0.01) * 100) / 100, z: Math.round(w.z * 1000) / 1000, y: w.y, a, fx: V(0, 0, 0), ...shot(w) }); }
    for (const [x, z] of [[610, -72], [610, 72], [650, -72], [650, 72]]) { const w = V(x, DT, z); this.slots.push({ type: 'CAP', x, z, y: DT, fx: V(0, 8, 0), look: V(620, DT + 20, 0).sub(w), eye: V(420, DT + 90, 240).sub(w) }); }
    const L = this.LINK_AT, lw = V(L.x, DT, L.z);
    this.slots.push({ type: 'LINK', x: L.x, z: L.z, y: DT, fx: V(0, 70, 0), look: V(L.x, DT + 70, 0).sub(lw), eye: V(L.x - 360, DT + 120, 320).sub(lw) });
    this.finishCam = [V(80, DT + 120, 420), V(640, DT + 130, 0)];
  },

  rule(type, x, z, rot, api) {
    const [, d] = api.footprint(type, rot);
    if (type.startsWith('SUPPLY') && Math.abs(z) - d / 2 < 182) return 'STACK SUPPLY CRATES AT THE ENDS OF THE FIELD, OFF THE LANDING PAD';
    return null;
  },

  stats(api) {
    return [
      ['EMITTERS', api.count('EMIT') + ' / 8'],
      ['CAPACITORS', api.count('CAP') + ' / 4'],
      ['LINK SPIRE', api.count('LINK') ? 'STANDING' : 'NOT YET'],
      ['HEART POWER', api.flag('gatePower') ? 'FLOWING' : 'WAITING'],
    ];
  },

  make(type, api, p) {
    const { THREE, M } = api, KG = window.KG, K = KG.mats(api), sl = this.slots[p.s];
    this._mats = this._mats || K;
    const g = new THREE.Group();
    const add = (geo, mat, x, y, z, parent = g, shadow = true) => { const m = new THREE.Mesh(geo, mat); m.position.set(x, y, z); m.castShadow = shadow; m.receiveShadow = true; parent.add(m); return m; };

    if (type === 'EMIT') {
      // points from the inner face of the ring towards its centre
      const dir = new THREE.Vector3(0, -Math.sin(sl.a), -Math.cos(sl.a)), q = new THREE.Group(); g.add(q);
      q.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
      add(new THREE.BoxGeometry(14, 3, 12), K.ringDark, 0, 1.5, 0, q);
      add(new THREE.CylinderGeometry(3.6, 4.6, 7, 12), K.ring, 0, 6, 0, q);
      add(new THREE.TorusGeometry(3.8, 0.5, 8, 24).rotateX(Math.PI / 2), K.gold, 0, 8.5, 0, q);
      const tip = add(new THREE.OctahedronGeometry(2.2, 0), K.crystal, 0, 11.5, 0, q, false); tip.scale.y = 1.6;
      // the beam it fires at the centre when the gate opens (hidden until then)
      const len = KG.RI - 1 - 13;
      const b = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 0.9, len, 10, 1, true).translate(0, len / 2, 0), K.beamBlue);
      b.position.y = 13; b.visible = false; b.userData.keep = true; b.userData.ph = p.s * 1.7; q.add(b); KG.emitBeams.push(b);
    } else if (type === 'CAP') {
      add(new THREE.BoxGeometry(22, 4, 16), K.ringDark, 0, 2, 0);
      for (const [x, z] of [[-6, -4], [6, -4], [-6, 4], [6, 4]]) {
        add(new THREE.CylinderGeometry(2.6, 2.6, 12, 16), K.ring, x, 10, z);
        for (const y of [7, 11, 15]) add(new THREE.TorusGeometry(2.7, 0.3, 6, 20).rotateX(Math.PI / 2), K.glow, x, y, z, g, false);
        add(new THREE.SphereGeometry(1.4, 12, 8), K.gold, x, 16.6, z);
      }
      if (p.s === 8) KG.person(g, { kind: 'worker', seed: 7500, female: true }, 'tablet', -13, 0, 0, Math.PI / 2);
    } else if (type === 'LINK') {
      const H = this.LINK_AT.h;
      add(new THREE.CylinderGeometry(16, 18, 6, 8), K.stoneDark, 0, 3, 0);
      add(new THREE.CylinderGeometry(9, 12, 10, 8), K.gold, 0, 11, 0);
      add(new THREE.CylinderGeometry(2.6, 7, H - 16, 8), K.ring, 0, 16 + (H - 16) / 2, 0);
      for (let y = 30; y < H; y += 22) add(new THREE.TorusGeometry(7.2 - y * 0.032, 0.6, 6, 24).rotateX(Math.PI / 2), K.glow, 0, y, 0, g, false);
      for (let i = 0; i < 4; i++) { const a = i / 4 * Math.PI * 2; const f = add(new THREE.BoxGeometry(2, 40, 10), K.gold, Math.cos(a) * 9, 34, Math.sin(a) * 9); f.rotation.y = -a; }
      const cr = add(new THREE.OctahedronGeometry(8, 0), K.crystal, 0, H + 8, 0, g, false); cr.scale.y = 1.7; cr.userData.keep = true; g.userData.spin = cr;
      // the two beams: the Heart's light to the spire, and the spire to the centre of the gate (shown once the power flows)
      const top = new THREE.Vector3(0, H + 8, 0), gx = KG.C.x - p.x, gy = KG.C.y - api.DECK_TOP;
      const from = new THREE.Vector3(this.HEART_FROM.x - p.x, this.HEART_FROM.y - api.DECK_TOP, this.HEART_FROM.z - p.z);
      const beam = (a, b, r, mat, k) => {
        const d = b.clone().sub(a), L = d.length();
        const m = new THREE.Mesh(new THREE.CylinderGeometry(r, r, L, 12, 1, true).translate(0, L / 2, 0), mat);
        m.position.copy(a); m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), d.normalize()); m.visible = false; m.userData.k = k; m.userData.keep = true;
        g.add(m); KG.beams.push(m); return m;
      };
      beam(from, top, 2.2, K.beam, 0.05);
      const soft = K.beam.clone(); soft.opacity = 0.22; beam(from, top, 6, soft, 0.15);
      beam(top, new THREE.Vector3(gx, gy, 0), 1.6, K.beam, 0.45);
      KG.person(g, { kind: 'worker', seed: 7590, female: true }, 'tablet', -20, 0, 8, -Math.PI / 2);
    }
    return KG.bake(api, g);
  },

  // ---- L: the Heart of Unity sends its power down the link ----
  finishStart(api) { this._f = 0; window.KG.powerK = 0.01; },
  finishUpdate(api, dt) {
    const KG = window.KG; this._f += dt;
    KG.powerK = Math.min(1, this._f / 7);
    const link = api.placed.find(p => p.type === 'LINK' && p.piece);
    if (link && this._f > 3 && !this._sp) { this._sp = true; api.sparkle(link.piece.position.clone().add(new api.THREE.Vector3(0, this.LINK_AT.h + 8, 0)), 3); }
    if (this._f > 6.5 && !this._sp2) { this._sp2 = true; api.sparkle(new api.THREE.Vector3(KG.C.x, KG.C.y, KG.C.z), 6); }
    if (this._f >= 8) { api.setFlag('gatePower', true); this._sp = this._sp2 = false; return true; }
    return false;
  },

  tick(api, dt, t) {
    window.KG.update(api, dt, t);
    for (const p of api.placed) if (p.type === 'LINK' && p.piece && p.piece.userData.spin) p.piece.userData.spin.rotation.y += dt * 0.8;
  },
});
