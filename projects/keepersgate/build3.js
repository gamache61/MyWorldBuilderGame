/* ============================================================
   THE KEEPER'S GATE · BUILD 3 · THE RING · LOWER HALF
   Keep this file in projects/keepersgate next to keepersgate.html.
   Twelve great ring segments are beamed onto the cradle feet and
   the pylon arms, from both sides down to the bottom of the ring.
   ============================================================ */
(window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push({
  id: 3,
  name: 'THE RING · LOWER HALF',
  brief: 'Twelve 30 m ring segments beamed onto the cradle feet and pylon arms — the lower half of a ring 256 m across.',

  types: {
    RING: { code: 'RS', name: 'RING SEGMENT', col: '#d9b44a', fixed: true, w: 18, d: 32, h: 26, fx: 3 },
  },
  kits: { RING: 12 },

  setup(api) {
    const { THREE } = api, V = (x, y, z) => new THREE.Vector3(x, y, z), KG = window.KG;
    const GC = V(KG.C.x, KG.C.y, KG.C.z), E = V(-430, 30, 300), Rm = (KG.RO + KG.RI) / 2, step = Math.PI / 12;
    // from the pylon arms on each side, down round the bottom to meet in the middle
    const order = [0, 11, 1, 10, 2, 9, 3, 8, 4, 7, 5, 6];
    this.slots = order.map(i => {
      const a0 = Math.PI + i * step, a = a0 + step / 2, w = KG.at(api, a, Rm);
      return { type: 'RING', x: w.x, z: Math.round(w.z * 1000) / 1000, y: w.y, a0, a1: a0 + step, fx: V(0, 0, 0), look: GC.clone().sub(w), eye: GC.clone().add(E).sub(w) };
    });
  },

  rule(type, x, z, rot, api) {
    const [, d] = api.footprint(type, rot);
    if (type.startsWith('SUPPLY') && Math.abs(z) - d / 2 < 182) return 'STACK SUPPLY CRATES AT THE ENDS OF THE FIELD, OFF THE LANDING PAD';
    return null;
  },

  stats(api) {
    return [
      ['RING SEGMENTS', api.count('RING') + ' / 12'],
      ['LOWER HALF', Math.round(api.count('RING') / 12 * 100) + '%'],
      ['RING SIZE', '256 m across'],
    ];
  },

  make(type, api, p) {
    return window.KG_SEGMENT(api, this.slots[p.s], false, this);
  },

  tick(api, dt, t) { window.KG.update(api, dt, t); },
});

/* one ring segment: white-gold body, gold outer rim, a light channel on both faces and a chevron in the middle */
window.KG_SEGMENT = window.KG_SEGMENT || function (api, sl, upper, B) {
  const { THREE } = api, KG = window.KG, K = KG.mats(api);
  B._mats = B._mats || K;
  const g = new THREE.Group(), body = new THREE.Group(); g.add(body);
  body.position.set(KG.C.x - sl.x, KG.C.y - sl.y, KG.C.z - sl.z);   // geometry is drawn round the ring centre
  const add = (geo, mat, shadow = true) => { const m = new THREE.Mesh(geo, mat); m.castShadow = shadow; m.receiveShadow = true; body.add(m); return m; };
  const { RO, RI, DEPTH } = KG, gap = 0.004;
  add(KG.arc(api, sl.a0 + gap, sl.a1 - gap, RO - 1.5, RI, DEPTH), K.ring);
  add(KG.arc(api, sl.a0 + gap, sl.a1 - gap, RO + 0.6, RO - 1.5, DEPTH + 1.6), K.gold);
  add(KG.arc(api, sl.a0 + gap, sl.a1 - gap, RI + 0.2, RI - 1.0, DEPTH + 1.0), K.ringDark);
  for (const s of [-1, 1]) {
    const ch = add(KG.arc(api, sl.a0 + gap * 3, sl.a1 - gap * 3, RI + 10.5, RI + 7.5, 0.6), K.glow, false); ch.position.x = s * (DEPTH / 2 + 0.3);
    const tr = add(KG.arc(api, sl.a0 + gap * 3, sl.a1 - gap * 3, RO - 4, RO - 5.2, 0.5), K.gold, false); tr.position.x = s * (DEPTH / 2 + 0.25);
  }
  // the chevron: a glowing mark in the middle of each segment, on both faces
  const am = (sl.a0 + sl.a1) / 2, cr = (RO + RI) / 2 + 3;
  for (const s of [-1, 1]) {
    const c = add(new THREE.BoxGeometry(0.8, 4, 6), K.gglow, false);
    c.position.set(s * (DEPTH / 2 + 0.5), Math.sin(am) * cr, Math.cos(am) * cr); c.rotation.x = -am;
  }
  // segment joints (bolted collars at each end)
  for (const a of [sl.a0, sl.a1]) {
    const j = add(new THREE.BoxGeometry(DEPTH + 2.4, 1.4, RO - RI + 2), K.ringDark);
    const r = (RO + RI) / 2; j.position.set(0, Math.sin(a) * r, Math.cos(a) * r); j.rotation.x = -a;
  }
  return KG.bake(api, g);
};
