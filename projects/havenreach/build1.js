/* ============================================================
   AEGIS ARK · BUILD 1 · LANDING PLATFORM-1
   Keep this file in the havenreach folder next to AegisArk.html.
   To add the next build, copy this file to build2.js, change
   id / name / types / kits / rules, and add
   <script src="build2.js"></script> to AegisArk.html.
   ============================================================ */
(window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push({
  id: 1,
  name: 'LANDING PLATFORM-1',
  brief: 'A 120 m × 540 m landing deck beside the Ark, so the ship can land and unload the rest of Station-7.',

  // part families carried in this build (container colour = family)
  types: {
    DECK:  { code: 'SF', name: 'DECK TILE',  col: '#6c757d', deck: true, w: 40, d: 60, h: 2.5, droneR: 26 },
    CLAMP: { code: 'DC', name: 'DOCK CLAMP', col: '#2f6690', w: 12, d: 14, h: 16, droneR: 10, noRotate: true },
    MAST:  { code: 'HP', name: 'LIGHT MAST', col: '#b03a2e', w: 6,  d: 6,  h: 42, droneR: 8 },
    POWER: { code: 'SY', name: 'POWER UNIT', col: '#e8e1d1', w: 20, d: 13, h: 13, droneR: 14 },
  },

  // how many of each kit the spaceport loads for this build
  kits: { DECK: 24, CLAMP: 4, MAST: 4, POWER: 2 },

  // deck tiles snap to this grid (world metres). 3 columns × 10 rows = 30 spots for 24 tiles.
  grid: { x: [80, 120, 160], z: [-270, -210, -150, -90, -30, 30, 90, 150, 210, 270] },

  // painted zones shown on the site
  zones: [
    { x0: 60, x1: 180, z0: -180, z1: 180, color: 0x40d0ff, name: 'LANDING PAD' },
    { x0: 60, x1: 180, z0: -40, z1: 180, color: 0x6080ff, name: 'CLAMP ZONE' },
  ],

  // where the Ark sets down when you press L
  land: { x: 120, z: 0 },

  // extra placement rules — return a reason string to block, or null to allow
  rule(type, x, z, rot, api) {
    const [w, d] = api.footprint(type, rot);
    if (type.startsWith('SUPPLY')) {
      if (Math.abs(z) - d / 2 < 182) return 'STACK SUPPLY CRATES AT THE ENDS OF THE PLATFORM, OFF THE LANDING PAD';
    }
    if (type === 'MAST' || type === 'POWER') {
      if (Math.abs(z) - d / 2 < 205) return 'KEEP TALL PARTS OFF THE LANDING PAD — PUT THEM AT THE ENDS';
    }
    if (type === 'CLAMP') {
      if (z - d / 2 < -40 || z + d / 2 > 180) return 'CLAMPS GO IN THE CLAMP ZONE (FRONT HALF OF THE PAD — WINGS ARE AT THE BACK)';
      if (Math.abs(x - 120) < 44) return 'CLAMPS GO ON THE OUTER EDGE OF THE PAD, BESIDE THE HULL';
    }
    return null;
  },

  // can the Ark land yet?
  ready(api) {
    const g = this.grid;
    let pad = 0, need = 0;
    for (const x of g.x) for (const z of g.z) if (Math.abs(z) < 180) { need++; if (api.deckAt(x, z)) pad++; }
    const cl = api.count('CLAMP');
    const left = api.kitsLeft();
    if (left > 0) return { ok: false, msg: left + ' CRATE' + (left > 1 ? 'S' : '') + ' STILL TO UNLOAD' };
    if (pad < need) return { ok: false, msg: 'LANDING PAD NEEDS ' + (need - pad) + ' MORE DECK TILE' + (need - pad > 1 ? 'S' : '') + ' — PICK UP SPARE TILES AND MOVE THEM' };
    if (cl < 4) return { ok: false, msg: 'NEEDS 4 DOCK CLAMPS' };
    return { ok: true, msg: 'PLATFORM-1 READY — PRESS L TO LAND THE AEGIS ARK' };
  },

  stats(api) {
    const g = this.grid; let pad = 0, need = 0;
    for (const x of g.x) for (const z of g.z) if (Math.abs(z) < 180) { need++; if (api.deckAt(x, z)) pad++; }
    return [
      ['DECK AREA', (api.count('DECK') * 2400).toLocaleString() + ' m²'],
      ['LANDING PAD', pad + ' / ' + need + ' tiles'],
      ['POWER', api.count('POWER') * 12 + ' MW'],
      ['LIGHT MASTS', api.count('MAST') + ' / 4'],
      ['DOCK CLAMPS', api.count('CLAMP') + ' / 4'],
    ];
  },

  // auto-unload uses this layout first (the classic Platform-1 design)
  suggest: (() => {
    const s = [];
    for (const z of [-150, -90, -30, 30, 90, 150, -210, 210]) for (const x of [120, 80, 160]) s.push({ type: 'DECK', x, z });
    for (const [x, z] of [[70, 150], [170, 150], [70, 30], [170, 30]]) s.push({ type: 'CLAMP', x, z });
    for (const [x, z] of [[66, 234], [174, 234], [66, -234], [174, -234]]) s.push({ type: 'MAST', x, z });
    for (const z of [226, -226]) s.push({ type: 'POWER', x: 120, z });
    return s;
  })(),

  // 3D pieces. Origin = deck surface at the piece centre.
  make(type, api, p) {
    const { THREE, M } = api;
    const g = new THREE.Group();
    const add = (geo, mat, x, y, z) => { const m = new THREE.Mesh(geo, mat); m.position.set(x, y, z); m.castShadow = m.receiveShadow = true; g.add(m); return m; };
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
    }
    return g;
  },
});
