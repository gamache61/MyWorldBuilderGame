/* ============================================================
   THE KEEPER'S GATE · BUILD 2 · GATE FOUNDATIONS
   Keep this file in projects/keepersgate next to keepersgate.html.
   Two cradle feet that the ring will sit on, two great pylons that
   will hold its sides, and a power conduit from the landing field
   out to the gate. Everything is beamed in by the transporter (T).
   ============================================================ */
(window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push({
  id: 2,
  name: 'GATE FOUNDATIONS',
  brief: 'Two cradle feet for the ring, two 170 m pylons to hold its sides, and a power conduit from the landing field to the gate.',

  types: {
    FOOT:    { code: 'FN', name: 'CRADLE FOOT',  col: '#8a7a5a', fixed: true, w: 40, d: 30, h: 27, fx: 3 },
    PYLON:   { code: 'PY', name: 'GATE PYLON',   col: '#5a6470', fixed: true, w: 20, d: 30, h: 170, fx: 5 },
    CONDUIT: { code: 'GC', name: 'POWER CONDUIT', col: '#2f8fb0', fixed: true, w: 59, d: 8, h: 2, fx: 3 },
  },
  kits: { FOOT: 2, PYLON: 2, CONDUIT: 6 },

  conduitX: i => 186 + 59 * i + 29.5,

  setup(api) {
    const { THREE } = api, V = (x, y, z) => new THREE.Vector3(x, y, z), KG = window.KG, DT = api.DECK_TOP;
    const GC = V(KG.C.x, KG.C.y, KG.C.z), E = V(-430, 40, 300);
    const gateShot = (x, y, z) => ({ look: GC.clone().sub(V(x, y, z)).setY(GC.y - y - 40), eye: GC.clone().add(E).sub(V(x, y, z)) });
    this.slots = [];
    for (const z of [-34, 34]) this.slots.push({ type: 'FOOT', x: KG.C.x, z, y: DT, fx: V(0, 14, 0), ...gateShot(KG.C.x, DT, z) });
    for (let i = 0; i < 6; i++) { const x = this.conduitX(i); this.slots.push({ type: 'CONDUIT', x, z: 0, y: DT, fx: V(0, 1, 0), look: V(370 - x, 0, 0), eye: V(250 - x, 90, 260) }); }
    for (const z of [-150, 150]) this.slots.push({ type: 'PYLON', x: KG.C.x, z, y: DT, fx: V(0, 80, 0), ...gateShot(KG.C.x, DT, z) });
  },

  // supply crates still go to the ends of the landing field
  rule(type, x, z, rot, api) {
    const [, d] = api.footprint(type, rot);
    if (type.startsWith('SUPPLY') && Math.abs(z) - d / 2 < 182) return 'STACK SUPPLY CRATES AT THE ENDS OF THE FIELD, OFF THE LANDING PAD';
    return null;
  },

  stats(api) {
    return [
      ['CRADLE FEET', api.count('FOOT') + ' / 2'],
      ['GATE PYLONS', api.count('PYLON') + ' / 2'],
      ['POWER CONDUIT', api.count('CONDUIT') * 59 + ' / 354 m'],
    ];
  },

  make(type, api, p) {
    const { THREE, M } = api, KG = window.KG, K = KG.mats(api);
    const g = new THREE.Group();
    const add = (geo, mat, x, y, z) => { const m = new THREE.Mesh(geo, mat); m.position.set(x, y, z); m.castShadow = m.receiveShadow = true; g.add(m); return m; };
    this._mats = this._mats || K;

    if (type === 'FOOT') {
      // the ring's outer edge comes down to meet the top of the saddle
      const top = KG.C.y - Math.sqrt(KG.RO * KG.RO - p.z * p.z) - api.DECK_TOP;
      add(new THREE.BoxGeometry(44, 4, 32), K.stoneDark, 0, 2, 0);
      add(new THREE.BoxGeometry(30, top - 6, 24), K.stone, 0, 4 + (top - 6) / 2, 0);
      add(new THREE.BoxGeometry(32, 2, 26), K.gold, 0, top - 1, 0);
      for (const s of [-1, 1]) { add(new THREE.BoxGeometry(2, top - 8, 2), K.glow, s * 15.2, 4 + (top - 8) / 2, 12.2).castShadow = false; add(new THREE.BoxGeometry(2, top - 8, 2), K.glow, s * 15.2, 4 + (top - 8) / 2, -12.2).castShadow = false; }
      KG.person(g, { kind: 'worker', seed: 7200 + (p.z > 0 ? 10 : 0), female: p.z > 0 }, 'kneelWork', -24, 0, -4, Math.PI / 2);
    } else if (type === 'PYLON') {
      const H = 170, s = Math.sign(p.z);   // s = which side: the arm reaches in towards the ring
      add(new THREE.BoxGeometry(34, 6, 34), K.stoneDark, 0, 3, 0);
      const tw = add(new THREE.CylinderGeometry(7, 13, H, 4, 1), K.steel, 0, 6 + H / 2, 0); tw.rotation.y = Math.PI / 4;
      for (let y = 20; y < H; y += 24) add(new THREE.BoxGeometry(14 - y * 0.035, 1.4, 14 - y * 0.035), K.gold, 0, 6 + y, 0);
      add(new THREE.BoxGeometry(1.2, H - 20, 1.2), K.glow, -5.2, 6 + H / 2, -s * 5.2).castShadow = false;
      add(new THREE.BoxGeometry(1.2, H - 20, 1.2), K.glow, 5.2, 6 + H / 2, -s * 5.2).castShadow = false;
      // the arm that will hold the side of the ring
      const armY = KG.C.y - api.DECK_TOP, reach = 150 - KG.RO + 4;
      add(new THREE.BoxGeometry(14, 10, reach), K.ringDark, 0, armY, -s * reach / 2);
      add(new THREE.BoxGeometry(22, 18, 4), K.gold, 0, armY, -s * (reach - 1));
      add(new THREE.BoxGeometry(16, 4, 16), K.ringDark, 0, 6 + H + 2, 0);
      const red = new THREE.Mesh(new THREE.SphereGeometry(1.4, 10, 8), new THREE.MeshBasicMaterial({ color: 0xff3020 })); red.position.y = 6 + H + 5.5; red.userData.keep = true; g.add(red); api.blink(red, 1.8, 0xff3020);
    } else if (type === 'CONDUIT') {
      add(new THREE.BoxGeometry(58.6, 1.6, 8), K.ringDark, 0, 0.8, 0);
      add(new THREE.BoxGeometry(58.6, 0.5, 2.2), K.glow, 0, 1.75, 0).castShadow = false;
      for (const s of [-1, 1]) add(new THREE.BoxGeometry(58.6, 0.4, 0.6), K.gold, 0, 1.8, s * 3.6);
      add(new THREE.BoxGeometry(4, 2.6, 9), K.steel, 29, 1.3, 0);
    }
    return KG.bake(api, g);
  },

  tick(api, dt, t) { window.KG.update(api, dt, t); },
});
