/* ============================================================
   KRYOS CITY · BUILD 7 · GARDENS & VERTICAL FARMS
   Keep this file in projects/kryoscity next to kryoscity.html.
   Trip 1 — 6 crop terraces and 4 greenhouse domes.
   Trip 2 — 4 vertical farm towers and 3 orchard groves.
   Build 5 ends when you plant the gardens (press L).
   ============================================================ */
(function () {
  const C = KRYOS.FARMS;
  const around = (k, n, r, a0 = 0) => { const a = a0 + k / n * Math.PI * 2; return [Math.round(C[0] + Math.cos(a) * r), Math.round(C[1] + Math.sin(a) * r)]; };
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(KRYOS.cityBuild({
    id: 7,
    name: 'GARDENS & VERTICAL FARMS',
    brief: 'Kryos grows all its own food: crop terraces, greenhouse domes, orchards and glass farm towers stacked floor on floor.',
    finishLabel: 'PLANT THE GARDENS', flags: ['kfarms'], status: ['FOOD', 'GROWING'],
    focus: C,
    parts: {
      KTERRACE: {
        name: 'CROP TERRACE', code: 'GD', col: '#3a7d44', h: 3, count: 6, at: k => around(k, 6, 210, 0.2),
        make(g, k, M, THREE, api, sl) {
          const a = Math.atan2(sl.z - C[1], sl.x - C[0]); g.rotation.y = -a;
          for (let i = 0; i < 4; i++) { const f = new THREE.Mesh(new THREE.BoxGeometry(22, 1.2 + i * 1.2, 70), M.crops[(k + i) % 4]); f.position.set(-33 + i * 22, 0.6 + i * 0.6, 0); g.add(f);
            const e = new THREE.Mesh(new THREE.BoxGeometry(1, 1.6 + i * 1.2, 70), M.white); e.position.set(-22 + i * 22, 0.8 + i * 0.6, 0); g.add(e); }
        },
      },
      KGREEN: {
        name: 'GREENHOUSE DOME', code: 'GD', col: '#3a7d44', h: 30, count: 4, at: k => around(k, 4, 105, Math.PI / 4),
        make(g, k, M, THREE) {
          const d = new THREE.Mesh(new THREE.SphereGeometry(34, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2), M.glassGreen); g.add(d);
          for (let i = 0; i < 8; i++) { const r = new THREE.Mesh(new THREE.TorusGeometry(34, 0.5, 4, 32, Math.PI), M.white); r.rotation.y = i / 8 * Math.PI; g.add(r); }
          for (let i = 0; i < 14; i++) { const t = new THREE.Mesh(new THREE.IcosahedronGeometry(4 + (i % 3), 0), i % 2 ? M.leaf : M.leafLight); const a = i * 2.4, r = 6 + (i % 5) * 4.5; t.position.set(Math.cos(a) * r, 4, Math.sin(a) * r); g.add(t); }
          const base = new THREE.Mesh(new THREE.CylinderGeometry(35, 35, 1, 32), M.white); base.position.y = 0.2; g.add(base);
        },
      },
      KVFARM: {
        name: 'VERTICAL FARM', code: 'FP', col: '#3a7d44', h: 140, count: 4, at: k => around(k, 4, 320, 0),
        make(g, k, M, THREE) {
          const FL = 14;
          for (let f = 0; f < FL; f++) {
            const y = f * 10;
            const slab = new THREE.Mesh(new THREE.CylinderGeometry(19, 19, 1, 8), M.white); slab.position.y = y + 0.5; g.add(slab);
            const crop = new THREE.Mesh(new THREE.CylinderGeometry(17, 17, 2.4, 8), M.crops[f % 4]); crop.position.y = y + 2.2; g.add(crop);
          }
          const glass = new THREE.Mesh(new THREE.CylinderGeometry(20, 20, FL * 10, 8, 1, true), M.glassGreen); glass.position.y = FL * 5; g.add(glass);
          const core = new THREE.Mesh(new THREE.CylinderGeometry(4, 4, FL * 10 + 10, 8), M.pearl); core.position.y = FL * 5 + 5; g.add(core);
          const top = new THREE.Mesh(new THREE.CylinderGeometry(21, 21, 2, 8), M.white); top.position.y = FL * 10; g.add(top);
          const ring = new THREE.Mesh(new THREE.TorusGeometry(21, 0.5, 6, 8).rotateX(Math.PI / 2), M.glow); ring.position.y = FL * 10 + 1.4; ring.rotation.y = Math.PI / 8; g.add(ring);
        },
      },
      KORCH: {
        name: 'ORCHARD GROVE', code: 'GD', col: '#3a7d44', h: 14, count: 3, at: k => around(k, 3, 330, Math.PI / 6),
        make(g, k, M, THREE) {
          const n = 90, inst = new THREE.InstancedMesh(new THREE.IcosahedronGeometry(5, 0).translate(0, 7, 0), M.leaf, n), trunk = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.5, 0.7, 5, 5).translate(0, 2.5, 0), M.dark, n);
          const m4 = new THREE.Matrix4(), c = new THREE.Color();
          for (let i = 0; i < n; i++) { const x = (i % 10) * 12 - 54, z = Math.floor(i / 10) * 12 - 48; m4.makeTranslation(x, 0, z); inst.setMatrixAt(i, m4); trunk.setMatrixAt(i, m4); inst.setColorAt(i, c.setRGB(0.8 + (i % 7) * 0.05, 1, 0.8)); }
          g.add(inst, trunk);
          const lawn = new THREE.Mesh(new THREE.BoxGeometry(124, 0.6, 112), M.grass); lawn.position.y = 0.1; g.add(lawn);
        },
      },
    },
    trips: [{ name: 'TERRACES & DOMES', parts: ['KTERRACE', 'KGREEN'] }, { name: 'FARM TOWERS', parts: ['KVFARM', 'KORCH'] }],
  }));
})();
