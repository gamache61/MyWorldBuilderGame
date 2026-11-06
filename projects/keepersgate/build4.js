/* ============================================================
   THE KEEPER'S GATE · BUILD 4 · THE RING · UPPER HALF
   Keep this file in projects/keepersgate next to keepersgate.html.
   Twelve more segments climb from the pylon arms up both sides
   and meet at the top, then the golden keystone locks the ring.
   ============================================================ */
(window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push({
  id: 4,
  name: 'THE RING · UPPER HALF',
  brief: 'Twelve ring segments climb both sides and meet at the top; the golden keystone crystal locks the ring closed.',

  types: {
    RINGU: { code: 'RS', name: 'UPPER RING SEGMENT', col: '#d9b44a', fixed: true, w: 18, d: 32, h: 26, fx: 3 },
    KEY:   { code: 'KS', name: 'KEYSTONE', col: '#ffd060', fixed: true, w: 26, d: 30, h: 40, fx: 3 },
  },
  kits: { RINGU: 12, KEY: 1 },

  setup(api) {
    const { THREE } = api, V = (x, y, z) => new THREE.Vector3(x, y, z), KG = window.KG;
    const GC = V(KG.C.x, KG.C.y, KG.C.z), E = V(-430, 30, 300), Rm = (KG.RO + KG.RI) / 2, step = Math.PI / 12;
    // up from the pylon arms on both sides, closing at the top
    const order = [0, 11, 1, 10, 2, 9, 3, 8, 4, 7, 5, 6];
    this.slots = order.map(i => {
      const a0 = i * step, a = a0 + step / 2, w = KG.at(api, a, Rm);
      return { type: 'RINGU', x: w.x, z: Math.round(w.z * 1000) / 1000, y: w.y, a0, a1: a0 + step, fx: V(0, 0, 0), look: GC.clone().sub(w), eye: GC.clone().add(E).sub(w) };
    });
    const top = KG.at(api, Math.PI / 2, KG.RO + 6), self = this;
    this.slots.push({
      type: 'KEY', x: top.x, z: 0, y: top.y, fx: V(0, 4, 0), look: GC.clone().sub(top).add(V(0, 60, 0)), eye: GC.clone().add(V(-300, 90, 200)).sub(top),
      needs: () => self.slots.every((s, i) => s.type !== 'RINGU' || api.slotFilled(i)) ? null : 'THE KEYSTONE GOES IN LAST, WHEN BOTH SIDES MEET AT THE TOP',
    });
  },

  rule(type, x, z, rot, api) {
    const [, d] = api.footprint(type, rot);
    if (type.startsWith('SUPPLY') && Math.abs(z) - d / 2 < 182) return 'STACK SUPPLY CRATES AT THE ENDS OF THE FIELD, OFF THE LANDING PAD';
    return null;
  },

  stats(api) {
    return [
      ['UPPER SEGMENTS', api.count('RINGU') + ' / 12'],
      ['RING', Math.round((12 + api.count('RINGU')) / 24 * 100) + '% CLOSED'],
      ['KEYSTONE', api.count('KEY') ? 'LOCKED' : 'WAITING'],
    ];
  },

  make(type, api, p) {
    const sl = this.slots[p.s];
    if (type === 'RINGU') return window.KG_SEGMENT(api, sl, true, this);
    const { THREE } = api, KG = window.KG, K = KG.mats(api);
    this._mats = this._mats || K;
    const g = new THREE.Group();
    const add = (geo, mat, x, y, z, shadow = true) => { const m = new THREE.Mesh(geo, mat); m.position.set(x, y, z); m.castShadow = shadow; m.receiveShadow = true; g.add(m); return m; };
    // a gold wedge across the top of the ring, with the keystone crystal on top
    const wedge = new THREE.Group(); wedge.position.set(KG.C.x - sl.x, KG.C.y - sl.y, 0); g.add(wedge);
    for (const [ro, ri, dp, m] of [[KG.RO + 12, KG.RO - 4, KG.DEPTH + 6, K.gold], [KG.RO + 13, KG.RO + 11, KG.DEPTH + 7, K.ringDark]]) {
      const w = new THREE.Mesh(KG.arc(api, Math.PI / 2 - 0.07, Math.PI / 2 + 0.07, ro, ri, dp), m); w.castShadow = w.receiveShadow = true; wedge.add(w);
    }
    for (const s of [-1, 1]) { const ch = new THREE.Mesh(KG.arc(api, Math.PI / 2 - 0.05, Math.PI / 2 + 0.05, KG.RO + 9, KG.RO + 7, 0.6), K.glow); ch.position.x = s * (KG.DEPTH / 2 + 3.4); wedge.add(ch); }
    const cr = add(new THREE.OctahedronGeometry(7, 0), K.crystal, 0, 14, 0, false); cr.scale.set(0.8, 1.6, 0.8);
    add(new THREE.CylinderGeometry(5, 7, 4, 8), K.gold, 0, 5, 0);
    cr.userData.keep = true; g.userData.spin = cr;
    return KG.bake(api, g);
  },

  tick(api, dt, t) {
    window.KG.update(api, dt, t);
    for (const p of api.placed) if (p.type === 'KEY' && p.piece && p.piece.userData.spin) p.piece.userData.spin.rotation.y += dt * 0.6;
  },
});
