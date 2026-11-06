/* ============================================================
   THE KEEPER'S GATE · BUILD 1 · GATE LANDING FIELD
   Keep this file in projects/keepersgate next to keepersgate.html.
   The council chose the Keeper's Gate. First comes a landing field
   on the gate site so the Aegis Ark can set down on Unity, and a
   transporter pad so the gate parts can be beamed into place.
   ============================================================ */

/* ---------- shared by every Keeper's Gate build (one copy, kept on window) ---------- */
window.KG = window.KG || {
  // the gate stands on its feet past the end of the landing field, facing the field
  C: { x: 560, y: -28 + 150, z: 0 },   // centre of the ring
  RO: 128, RI: 106, DEPTH: 18,          // outer / inner radius and thickness of the ring (metres)
  powerK: 0, openK: 0, _t: -1, people: [], beams: [], emitBeams: [], portal: null, voiced: false,
  mats(api) {
    if (this._m) return this._m;
    const { THREE } = api;
    const glow = new THREE.MeshStandardMaterial({ color: 0x9fe8ff, emissive: 0x5fd8ff, emissiveIntensity: 0.15, metalness: 0.2, roughness: 0.3 });
    const gglow = new THREE.MeshStandardMaterial({ color: 0xffe0a0, emissive: 0xffc860, emissiveIntensity: 0.2, metalness: 0.4, roughness: 0.3 });
    return this._m = {
      ring: new THREE.MeshStandardMaterial({ color: 0xe9e4d8, metalness: 0.55, roughness: 0.32 }),
      ringDark: new THREE.MeshStandardMaterial({ color: 0x3a3f4a, metalness: 0.7, roughness: 0.4 }),
      gold: new THREE.MeshStandardMaterial({ color: 0xd9b44a, metalness: 0.85, roughness: 0.28 }),
      stone: new THREE.MeshStandardMaterial({ color: 0xe8e2d8, metalness: 0.05, roughness: 0.75 }),
      stoneDark: new THREE.MeshStandardMaterial({ color: 0xb9b2a4, metalness: 0.05, roughness: 0.8 }),
      steel: new THREE.MeshStandardMaterial({ color: 0x8e98a4, metalness: 0.85, roughness: 0.35 }),
      glow, gglow,
      beam: new THREE.MeshBasicMaterial({ color: new THREE.Color(1.0, 0.8, 0.45).multiplyScalar(3), transparent: true, opacity: 0.85, depthWrite: false, blending: THREE.AdditiveBlending, toneMapped: false }),
      beamBlue: new THREE.MeshBasicMaterial({ color: new THREE.Color(0.45, 0.85, 1.0).multiplyScalar(1.5), transparent: true, opacity: 0.55, depthWrite: false, blending: THREE.AdditiveBlending, toneMapped: false }),
      crystal: new THREE.MeshBasicMaterial({ color: new THREE.Color(1.0, 0.85, 0.55).multiplyScalar(2.2), toneMapped: false }),
    };
  },
  // an arc of the ring between two angles (radians, 0 = the +z side, π/2 = the top), drawn round the ring centre
  arc(api, a0, a1, ro, ri, depth) {
    const { THREE } = api, s = new THREE.Shape(), n = Math.max(4, Math.ceil((a1 - a0) / 0.03));
    for (let i = 0; i <= n; i++) { const a = a0 + (a1 - a0) * i / n; i ? s.lineTo(Math.cos(a) * ro, Math.sin(a) * ro) : s.moveTo(Math.cos(a) * ro, Math.sin(a) * ro); }
    for (let i = n; i >= 0; i--) { const a = a0 + (a1 - a0) * i / n; s.lineTo(Math.cos(a) * ri, Math.sin(a) * ri); }
    const g = new THREE.ExtrudeGeometry(s, { depth, bevelEnabled: false, curveSegments: 4 });
    g.rotateY(-Math.PI / 2); g.translate(depth / 2, 0, 0);   // shape x → world z, shape y → world y, thickness along x
    return g;
  },
  // ring point at angle a and radius r (world)
  at(api, a, r) { return new api.THREE.Vector3(this.C.x, this.C.y + Math.sin(a) * r, this.C.z + Math.cos(a) * r); },
  // workers and visitors: queued while the game starts, then made with the same people as every other project
  person(group, o, act, x, y, z, ry) { this.people.push({ group, o, act, x, y, z, ry }); },
  update(api, dt, t) {
    if (t === this._t) return; this._t = t;
    if (window.WB_PERSON && this.people.length) for (const q of this.people.splice(0)) { try { window.WB_PERSON(q.group, q.o, q.act, q.x, q.y, q.z, q.ry || 0); } catch (e) { } }
    const m = this._m; if (!m) return;
    const pw = api.flag('gatePower') ? 1 : this.powerK, op = api.flag('opened') ? 1 : this.openK;
    // the ring's light channels wake when the Heart's power arrives, and burn bright once the gate is open
    m.glow.emissiveIntensity = 0.15 + pw * (1.6 + Math.sin(t * 1.8) * 0.35) + op * 1.2;
    m.gglow.emissiveIntensity = 0.2 + pw * (1.2 + Math.sin(t * 1.3 + 1) * 0.3) + op;
    for (const b of this.beams) b.visible = pw > 0.01 && b.userData.k <= pw + 0.001;
    for (const b of this.emitBeams) { b.visible = op > 0.02; if (b.visible) b.scale.set(0.6 + Math.sin(t * 9 + b.userData.ph) * 0.25, Math.min(1, op * 2.5), 0.6 + Math.sin(t * 9 + b.userData.ph) * 0.25); }
    if (this.portal) {
      const u = this.portal.material.uniforms; u.time.value = t; u.open.value = Math.max(0, Math.min(1, (op - 0.3) / 0.7));
      this.portal.visible = u.open.value > 0.001;
    }
  },
  // speed: merge the still meshes of a piece into one mesh per material (same look, far fewer draw calls).
  // meshes marked userData.keep (beams, blinking lights, spinning crystals, the portal) stay separate.
  bake(api, g) {
    const { THREE } = api, buckets = new Map(), dead = [];
    g.updateMatrixWorld(true);
    const kept = o => { for (let p = o; p && p !== g; p = p.parent) if (p.userData.keep) return true; return false; };
    g.traverse(m => {
      if (!m.isMesh || kept(m) || Array.isArray(m.material)) return;
      const geo = (m.geometry.index ? m.geometry.toNonIndexed() : m.geometry.clone());
      for (const n of Object.keys(geo.attributes)) if (n !== 'position' && n !== 'normal' && n !== 'uv') geo.deleteAttribute(n);
      if (!geo.attributes.normal) geo.computeVertexNormals();
      if (!geo.attributes.uv) geo.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(geo.attributes.position.count * 2), 2));
      geo.applyMatrix4(m.matrixWorld);
      const key = m.material.uuid + (m.castShadow ? 's' : '');
      if (!buckets.has(key)) buckets.set(key, { mat: m.material, cast: m.castShadow, geos: [] });
      buckets.get(key).geos.push(geo); dead.push(m);
    });
    for (const m of dead) m.parent.remove(m);
    for (const { mat, cast, geos } of buckets.values()) {
      let n = 0; for (const q of geos) n += q.attributes.position.count;
      const pos = new Float32Array(n * 3), nor = new Float32Array(n * 3), uv = new Float32Array(n * 2); let o = 0;
      for (const q of geos) { pos.set(q.attributes.position.array, o * 3); nor.set(q.attributes.normal.array, o * 3); uv.set(q.attributes.uv.array, o * 2); o += q.attributes.position.count; q.dispose(); }
      const bg = new THREE.BufferGeometry();
      bg.setAttribute('position', new THREE.BufferAttribute(pos, 3)); bg.setAttribute('normal', new THREE.BufferAttribute(nor, 3)); bg.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
      bg.computeBoundingSphere();
      const mm = new THREE.Mesh(bg, mat); mm.castShadow = cast; mm.receiveShadow = true; g.add(mm);
    }
    return g;
  },
  // the Keeper's deep, slow voice when the gate opens
  speak(text) {
    if (!('speechSynthesis' in window)) return;
    try {
      speechSynthesis.cancel();
      const vs = speechSynthesis.getVoices().filter(v => /^en/i.test(v.lang));
      const v = vs.find(v => /David|Daniel|George|Guy|Male|Fred|Alex|Ryan|Christopher/i.test(v.name)) || vs[0];
      const u = new SpeechSynthesisUtterance(text); u.pitch = 0; u.rate = 0.58; if (v) u.voice = v; speechSynthesis.speak(u);
    } catch (e) { }
  },
};

(window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push({
  id: 1,
  name: 'GATE LANDING FIELD',
  brief: 'A 120 m × 540 m landing field on the gate site, plus a transporter pad so every gate part after this can be beamed into place.',

  // part families carried in this build (container colour = family)
  types: {
    DECK:  { code: 'SF', name: 'DECK TILE',  col: '#6c757d', deck: true, w: 40, d: 60, h: 2.5, droneR: 26 },
    CLAMP: { code: 'DC', name: 'DOCK CLAMP', col: '#2f6690', w: 12, d: 14, h: 16, droneR: 10, noRotate: true },
    MAST:  { code: 'HP', name: 'LIGHT MAST', col: '#b03a2e', w: 6,  d: 6,  h: 42, droneR: 8 },
    POWER: { code: 'SY', name: 'POWER UNIT', col: '#e8e1d1', w: 20, d: 13, h: 13, droneR: 14 },
    TXPAD: { code: 'TX', name: 'TRANSPORTER PAD', col: '#7b4fa0', w: 14, d: 14, h: 5, droneR: 10, noRotate: true },
  },

  kits: { DECK: 24, CLAMP: 4, MAST: 4, POWER: 2, TXPAD: 1 },

  // once the pad is down, the gate site has its own transporter (T beams the cargo)
  stationTX: [['TXPAD', 1]],

  // deck tiles snap to this grid (world metres). 3 columns × 10 rows = 30 spots for 24 tiles.
  grid: { x: [80, 120, 160], z: [-270, -210, -150, -90, -30, 30, 90, 150, 210, 270] },

  zones: [
    { x0: 60, x1: 180, z0: -180, z1: 180, color: 0x40d0ff, name: 'LANDING PAD' },
    { x0: 60, x1: 180, z0: -40, z1: 180, color: 0x6080ff, name: 'CLAMP ZONE' },
  ],

  land: { x: 120, z: 0 },

  padDone(api) {
    const g = this.grid; let pad = 0, need = 0;
    for (const x of g.x) for (const z of g.z) if (Math.abs(z) < 180) { need++; if (api.deckAt(x, z)) pad++; }
    return { pad, need };
  },

  rule(type, x, z, rot, api) {
    const [w, d] = api.footprint(type, rot);
    if (type.startsWith('SUPPLY')) {
      if (Math.abs(z) - d / 2 < 182) return 'STACK SUPPLY CRATES AT THE ENDS OF THE FIELD, OFF THE LANDING PAD';
    }
    if (type === 'MAST' || type === 'POWER') {
      if (Math.abs(z) - d / 2 < 205) return 'KEEP TALL PARTS OFF THE LANDING FIELD — PUT THEM AT THE ENDS';
    }
    if (type === 'TXPAD') {
      if (Math.abs(z) - d / 2 < 182) return 'THE TRANSPORTER PAD GOES AT AN END OF THE FIELD, OFF THE LANDING PAD';
      const { pad, need } = this.padDone(api);
      if (pad < need || api.count('CLAMP') < 4) return 'FINISH THE LANDING PAD AND ITS 4 CLAMPS BEFORE THE TRANSPORTER PAD';
    }
    if (type === 'CLAMP') {
      if (z - d / 2 < -40 || z + d / 2 > 180) return 'CLAMPS GO IN THE CLAMP ZONE (FRONT HALF OF THE PAD — WINGS ARE AT THE BACK)';
      if (Math.abs(x - 120) < 44) return 'CLAMPS GO ON THE OUTER EDGE OF THE PAD, BESIDE THE HULL';
    }
    return null;
  },

  ready(api) {
    const { pad, need } = this.padDone(api);
    const left = api.kitsLeft();
    if (left > 0) return { ok: false, msg: left + ' CRATE' + (left > 1 ? 'S' : '') + ' STILL TO UNLOAD' };
    if (pad < need) return { ok: false, msg: 'LANDING PAD NEEDS ' + (need - pad) + ' MORE DECK TILE' + (need - pad > 1 ? 'S' : '') + ' — PICK UP SPARE TILES AND MOVE THEM' };
    if (api.count('CLAMP') < 4) return { ok: false, msg: 'NEEDS 4 DOCK CLAMPS' };
    if (api.count('TXPAD') < 1) return { ok: false, msg: 'NEEDS THE TRANSPORTER PAD' };
    return { ok: true, msg: 'LANDING FIELD READY — PRESS L TO LAND THE AEGIS ARK ON THE GATE SITE' };
  },

  stats(api) {
    const { pad, need } = this.padDone(api);
    return [
      ['DECK AREA', (api.count('DECK') * 2400).toLocaleString() + ' m²'],
      ['LANDING PAD', pad + ' / ' + need + ' tiles'],
      ['POWER', api.count('POWER') * 12 + ' MW'],
      ['LIGHT MASTS', api.count('MAST') + ' / 4'],
      ['DOCK CLAMPS', api.count('CLAMP') + ' / 4'],
      ['TRANSPORTER', api.count('TXPAD') ? 'ONLINE' : 'NOT YET'],
    ];
  },

  // auto-unload uses this layout first (the transporter pad last, once the pad is finished)
  suggest: (() => {
    const s = [];
    for (const z of [-150, -90, -30, 30, 90, 150, -210, 210]) for (const x of [120, 80, 160]) s.push({ type: 'DECK', x, z });
    for (const [x, z] of [[70, 150], [170, 150], [70, 30], [170, 30]]) s.push({ type: 'CLAMP', x, z });
    for (const [x, z] of [[66, 234], [174, 234], [66, -234], [174, -234]]) s.push({ type: 'MAST', x, z });
    for (const z of [226, -226]) s.push({ type: 'POWER', x: 120, z });
    s.push({ type: 'TXPAD', x: 120, z: -196 });
    return s;
  })(),

  make(type, api, p) {
    const { THREE, M } = api;
    const g = new THREE.Group();
    const add = (geo, mat, x, y, z) => { const m = new THREE.Mesh(geo, mat); m.position.set(x, y, z); m.castShadow = m.receiveShadow = true; g.add(m); return m; };
    const K = window.KG.mats(api);
    const S = this._mats || (this._mats = (() => {
      const deckTex = (centre) => api.canvasTex(512, 768, (c, w, h) => {
        c.fillStyle = '#3d424a'; c.fillRect(0, 0, w, h);
        for (let y = 0; y < h; y += 64) for (let x = 0; x < w; x += 64) { const v = 56 + Math.random() * 16 | 0; c.fillStyle = `rgb(${v},${v + 3},${v + 9})`; c.fillRect(x + 2, y + 2, 60, 60); }
        for (let i = 0; i < w; i += 28) { c.fillStyle = (i / 28) % 2 ? '#1b1b1b' : '#e0a92a'; c.fillRect(i, 0, 28, 12); c.fillRect(i, h - 12, 28, 12); }
        if (centre) {
          c.fillStyle = '#f2f2f2'; for (let y = 30; y < h; y += 90) c.fillRect(w / 2 - 8, y, 16, 50);
          c.strokeStyle = '#e0a92a'; c.lineWidth = 10; for (let y = 120; y < h; y += 240) { c.beginPath(); c.moveTo(w / 2 - 90, y + 50); c.lineTo(w / 2, y); c.lineTo(w / 2 + 90, y + 50); c.stroke(); }
        }
      });
      return {
        side: new THREE.MeshStandardMaterial({ color: 0x2a2e35, metalness: 0.7, roughness: 0.45 }),
        top: [deckTex(false), deckTex(true)].map(t => new THREE.MeshStandardMaterial({ map: t, metalness: 0.5, roughness: 0.55 })),
        steel: new THREE.MeshStandardMaterial({ color: 0x9aa3ad, metalness: 0.85, roughness: 0.35 }),
        txGlow: new THREE.MeshBasicMaterial({ color: new THREE.Color(0.7, 0.5, 1.0).multiplyScalar(2.2), toneMapped: false }),
      };
    })());

    if (type === 'DECK') {
      add(new THREE.BoxGeometry(39.6, 2.5, 59.6), [S.side, S.side, S.top[p.x === 120 ? 1 : 0], S.side, S.side, S.side], 0, -1.25, 0);
      for (const x of [-15, 15]) add(new THREE.BoxGeometry(2, 3, 58), M.gun, x, -4, 0);
      for (const z of [-25, 0, 25]) add(new THREE.BoxGeometry(34, 1.5, 1.5), M.gun, 0, -4.5, z);
      for (const [w, d, x, z] of [[39.6, 0.3, 0, 29.7], [39.6, 0.3, 0, -29.7], [0.3, 59.6, 19.7, 0], [0.3, 59.6, -19.7, 0]]) add(new THREE.BoxGeometry(w, 0.25, d), M.strip, x, 0.05, z);
    } else if (type === 'CLAMP') {
      const dir = p.x < 120 ? 1 : -1;
      add(new THREE.BoxGeometry(12, 3, 14), M.yellow, 0, 1.5, 0);
      add(new THREE.BoxGeometry(6, 12, 8), M.armor, 0, 8, 0);
      const piv = new THREE.Group(); piv.position.set(dir * 2, 14, 0); g.add(piv);
      const arm = new THREE.Mesh(new THREE.BoxGeometry(2.2, 13, 3.4), M.yellow); arm.position.y = 6.5; arm.castShadow = true; piv.add(arm);
      const pad = new THREE.Mesh(new THREE.BoxGeometry(3.2, 1.6, 6), M.dark); pad.position.y = 13; piv.add(pad);
      g.userData.arm = piv; g.userData.dir = dir;
      const l = new THREE.Mesh(new THREE.SphereGeometry(0.6, 8, 6), new THREE.MeshBasicMaterial({ color: 0x40ff80 })); l.position.set(0, 14.6, 0); g.add(l);
    } else if (type === 'MAST') {
      add(new THREE.CylinderGeometry(2.4, 3, 2, 12), M.gun, 0, 1, 0);
      add(new THREE.CylinderGeometry(0.8, 1.2, 40, 10), S.steel, 0, 21, 0);
      add(new THREE.BoxGeometry(6, 1.6, 3), M.dark, 0, 40.5, 0);
      const lamp = add(new THREE.BoxGeometry(5.4, 0.6, 2.4), new THREE.MeshBasicMaterial({ color: new THREE.Color(0xfff2d8).multiplyScalar(3) }), 0, 39.6, 0); lamp.castShadow = false;
      const red = new THREE.Mesh(new THREE.SphereGeometry(0.8, 8, 6), new THREE.MeshBasicMaterial({ color: 0xff3020 })); red.position.y = 42; g.add(red);
      api.blink(red, 1.6, 0xff3020);
      const pl = new THREE.PointLight(0xfff2d8, 9000, 140, 2); pl.position.set(0, 38, 0); g.add(pl);
    } else if (type === 'POWER') {
      add(new THREE.BoxGeometry(20, 8, 13), M.armor, 0, 4, 0);
      for (const x of [-6, 0, 6]) { add(new THREE.CylinderGeometry(2, 2, 9, 16), M.gun, x, 8.5, 0); add(new THREE.TorusGeometry(2.1, 0.25, 6, 24), M.strip, x, 12.6, 0).rotation.x = Math.PI / 2; }
      add(new THREE.BoxGeometry(20.2, 0.4, 0.4), M.strip, 0, 7.9, 6.6);
    } else if (type === 'TXPAD') {
      add(new THREE.CylinderGeometry(7, 7.4, 1.2, 32), M.armor, 0, 0.6, 0);
      add(new THREE.CylinderGeometry(5.6, 5.6, 0.3, 32), K.ringDark, 0, 1.35, 0);
      const ring = add(new THREE.TorusGeometry(5.2, 0.22, 8, 48), S.txGlow, 0, 1.55, 0); ring.rotation.x = Math.PI / 2; ring.castShadow = false;
      for (let i = 0; i < 4; i++) {
        const a = i / 4 * Math.PI * 2 + Math.PI / 4;
        add(new THREE.BoxGeometry(0.9, 4.6, 0.9), S.steel, Math.cos(a) * 6.4, 3.4, Math.sin(a) * 6.4);
        const tip = add(new THREE.SphereGeometry(0.45, 10, 8), S.txGlow, Math.cos(a) * 6.4, 5.9, Math.sin(a) * 6.4); tip.castShadow = false;
      }
      add(new THREE.BoxGeometry(3, 1.6, 1.2), M.dark, 0, 2, -6.6);
      const scr = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 1.1), new THREE.MeshBasicMaterial({ color: new THREE.Color(0.45, 0.75, 1) })); scr.position.set(0, 2.2, -5.98); g.add(scr);
      window.KG.person(g, { kind: 'worker', seed: 7101, female: false }, 'tablet', 2.2, 0, -8.2, Math.PI);
      return window.KG.bake(api, g);
    }
    return g;
  },

  tick(api, dt, t) { window.KG.update(api, dt, t); },
});
