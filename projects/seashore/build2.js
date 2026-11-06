/* ============================================================
   SEAPORT · BUILD 2 · TRANSPORTER & HARBOUR CONTROL
   Keep this file in projects/seaport next to seaport.html.
   Trip 1 — 6 more field tiles at the ends of the landing field and
            the city transporter (pad + 2 cores), placed with the crane.
   Trip 2 — the harbour control tower, 2 small-craft hangars and
            8 landing beacons, beamed in by the new transporter.
   Build 2 ends when you light up the landing field (press L).
   ============================================================ */
(window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(KRYOS.cityBuild({
  id: 2,
  name: 'TRANSPORTER & HARBOUR CONTROL',
  brief: 'The transporter, the harbour control tower and hangars by the landing field — from now on parts are beamed into place.',
  finishLabel: 'LIGHT UP THE LANDING FIELD', flags: ['kfield'], status: ['LANDING FIELD', 'LIT'],
  focus: [260, 0],
  pre: {
    name: 'THE TRANSPORTER',
    types: {
      KTILE:   { code: 'SF', name: 'FIELD TILE', col: '#6c757d', deck: true, w: 40, d: 60, h: 2.5, droneR: 26 },
      KTXPAD:  { code: 'TP', name: 'TRANSPORTER PAD', col: '#e8e1d1', w: 30, d: 30, h: 3, droneR: 16, noRotate: true },
      KTXCORE: { code: 'TC', name: 'TRANSPORTER CORE', col: '#e8e1d1', w: 6, d: 6, h: 16, droneR: 8, noRotate: true },
    },
    kits: { KTILE: 6, KTXPAD: 1, KTXCORE: 2 },
    grid: { x: [80, 120, 160], z: [-270, 270] },
    zones: [{ x0: 60, x1: 180, z0: -300, z1: -240, color: 0x40d0ff, name: 'TRANSPORTER' }],
    suggest: [-270, 270].flatMap(z => [120, 80, 160].map(x => ({ type: 'KTILE', x, z }))).concat([{ type: 'KTXPAD', x: 120, z: -270 }, { type: 'KTXCORE', x: 85, z: -270 }, { type: 'KTXCORE', x: 155, z: -270 }]),
    stationTX: [['KTXPAD', 1], ['KTXCORE', 2]],
    rule(type, x, z) { if ((type === 'KTXPAD' || type === 'KTXCORE') && z > -240) return 'THE TRANSPORTER GOES ON THE NEW TILES AT THE BACK END'; return null; },
    make(type, api, p) {
      const { THREE, M } = api, TAU = Math.PI * 2;
      if (type === 'KTILE') return window.AEGIS_BUILDS.find(b => b.id === 1).make('DECK', api, p);
      const g = new THREE.Group(), add = (geo, mat, x = 0, y = 0, z = 0) => { const m = new THREE.Mesh(geo, mat); m.position.set(x, y, z); g.add(m); return m; };
      const pad = new THREE.MeshStandardMaterial({ map: KRYOS.canvas(THREE, 512, 512, (c, w, h) => { c.fillStyle = '#0b1622'; c.fillRect(0, 0, w, h); c.strokeStyle = '#7fd8ff'; c.lineWidth = 4; for (let r = 40; r < 256; r += 36) { c.beginPath(); c.arc(256, 256, r, 0, 7); c.stroke(); } }), emissive: 0x2a7fbf, emissiveIntensity: 0.9, metalness: 0.3, roughness: 0.5 });
      const core = new THREE.MeshBasicMaterial({ color: new THREE.Color(0.5, 0.85, 1.6) });
      if (type === 'KTXPAD') {
        add(new THREE.CylinderGeometry(15, 15.6, 1.6, 48), M.gun, 0, 0.8, 0);
        add(new THREE.CylinderGeometry(13.6, 13.6, 0.3, 48), pad, 0, 1.75, 0);
        for (let i = 0; i < 8; i++) { const a = i / 8 * TAU; add(new THREE.BoxGeometry(1.2, 3, 1.2), M.armor, Math.cos(a) * 14.6, 3, Math.sin(a) * 14.6); add(new THREE.SphereGeometry(0.5, 8, 6), core, Math.cos(a) * 14.6, 4.7, Math.sin(a) * 14.6); }
      } else {
        add(new THREE.BoxGeometry(6, 2, 6), M.armor, 0, 1, 0);
        add(new THREE.CylinderGeometry(1.6, 1.6, 12, 16), core, 0, 8, 0);
        for (let i = 0; i < 4; i++) { const a = i / 4 * TAU + Math.PI / 4; add(new THREE.BoxGeometry(0.6, 13, 0.6), M.gun, Math.cos(a) * 2.6, 8.5, Math.sin(a) * 2.6); }
        add(new THREE.BoxGeometry(6, 1.6, 6), M.armor, 0, 15, 0);
        const l = add(new THREE.SphereGeometry(0.6, 8, 6), new THREE.MeshBasicMaterial({ color: 0x7fd8ff }), 0, 16.2, 0); api.blink(l, 1.2, 0x7fd8ff);
      }
      return g;
    },
  },
  parts: {
    KCTOWER: {
      name: 'HARBOUR CONTROL TOWER', code: 'SY', col: '#e8e1d1', h: 110, count: 1, at: () => [340, -140],
      make(g, k, M, THREE, api) {
        const add = (geo, mat, x = 0, y = 0, z = 0) => { const m = new THREE.Mesh(geo, mat); m.position.set(x, y, z); g.add(m); return m; };
        add(new THREE.CylinderGeometry(16, 20, 6, 8), M.white, 0, 1, 0);
        add(new THREE.CylinderGeometry(5, 8, 96, 12), M.pearl, 0, 50, 0);
        add(new THREE.CylinderGeometry(20, 12, 14, 16), M.glass, 0, 100, 0);
        add(new THREE.CylinderGeometry(21, 21, 1.6, 16), M.white, 0, 93, 0);
        add(new THREE.CylinderGeometry(18, 21, 3, 16), M.white, 0, 108, 0);
        add(new THREE.TorusGeometry(20.5, 0.4, 6, 32).rotateX(Math.PI / 2), M.glow, 0, 94, 0);
        add(new THREE.CylinderGeometry(0.6, 0.6, 22, 6), M.steel, 0, 120, 0);
        const l = add(new THREE.SphereGeometry(1.4, 10, 8), new THREE.MeshBasicMaterial({ color: 0xff3030 }), 0, 131, 0); api.blink(l, 1.4, 0xff3030);
        const dish = add(new THREE.SphereGeometry(6, 16, 8, 0, Math.PI * 2, 0, Math.PI / 3), M.white, 8, 114, 0); dish.rotation.z = -1;
      },
    },
    KHANGAR: {
      name: 'SMALL-CRAFT HANGAR', code: 'HP', col: '#9a2a22', h: 26, count: 2, at: k => [350, 120 + k * 120],
      make(g, k, M, THREE) {
        const h = new THREE.Mesh(new THREE.CylinderGeometry(28, 28, 80, 24, 1, false, 0, Math.PI).rotateZ(Math.PI / 2), M.white); h.scale.set(1, 0.9, 1); g.add(h);
        const door = new THREE.Mesh(new THREE.CircleGeometry(26, 24, 0, Math.PI), M.dark); door.rotation.y = -Math.PI / 2; door.position.set(-40.1, 0, 0); g.add(door);
        const strip = new THREE.Mesh(new THREE.BoxGeometry(80, 0.6, 1), M.glow); strip.position.set(0, 25.5, 0); g.add(strip);
        const apron = new THREE.Mesh(new THREE.BoxGeometry(40, 0.6, 50), M.dark); apron.position.set(-60, 0.2, 0); g.add(apron);
      },
    },
    KBEACON: {
      name: 'LANDING BEACON', code: 'DC', col: '#2f6690', h: 10, count: 8, at: k => [k < 4 ? 14 : 226, -240 + (k % 4) * 160],
      make(g, k, M, THREE, api, sl, B) {
        const add = (geo, mat, y) => { const m = new THREE.Mesh(geo, mat); m.position.y = y; g.add(m); return m; };
        add(new THREE.CylinderGeometry(2.5, 3, 1.5, 12), M.dark, 0.75);
        add(new THREE.CylinderGeometry(0.5, 0.7, 8, 8), M.steel, 5);
        const lamp = add(new THREE.SphereGeometry(1.3, 12, 8), (B._mats.beacon || (B._mats.beacon = new THREE.MeshBasicMaterial({ color: new THREE.Color(0.2, 0.3, 0.3) }))), 9.6);
        lamp.userData.k = k;
      },
    },
  },
  trips: [{ name: 'HARBOUR CONTROL', parts: ['KCTOWER', 'KHANGAR', 'KBEACON'] }],
  tick(api, dt, t, lv) {
    const m = this._mats.beacon; if (!m) return;
    const b = 0.5 + 0.5 * Math.sin(t * 4);
    m.color.setRGB(0.2 + lv * 0.4 * b, 0.3 + lv * 1.6 * b, 0.3 + lv * 1.2 * b);
  },
}));
