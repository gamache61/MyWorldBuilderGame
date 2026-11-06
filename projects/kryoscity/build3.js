/* ============================================================
   KRYOS CITY · BUILD 3 · POWER CORE
   Keep this file in projects/kryoscity next to kryoscity.html.
   Trip 1 — the core foundation and 6 conduit pylons north of the
            landing field.
   Trip 2 — the reactor dome and 6 power conduits that carry the
            energy out to the city.
   Build 3 ends when you ignite the core (press L). Kryos has power
            from then on.
   ============================================================ */
(window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(KRYOS.cityBuild({
  id: 3,
  name: 'POWER CORE',
  brief: 'The fusion core that powers Kryos, sunk into the plateau north of the landing field with pylons that send its energy across the city.',
  finishLabel: 'IGNITE THE POWER CORE', flags: ['power'], status: ['CITY POWER', '2.4 GW ONLINE'],
  focus: KRYOS.POWER, lookUp: 40,
  parts: {
    KPBASE: {
      name: 'CORE FOUNDATION', code: 'SF', col: '#6c757d', h: 12, count: 1, at: () => KRYOS.POWER,
      make(g, k, M, THREE) {
        const add = (geo, mat, y) => { const m = new THREE.Mesh(geo, mat); m.position.y = y; g.add(m); return m; };
        add(new THREE.CylinderGeometry(120, 128, 6, 48), M.white, 0);
        add(new THREE.CylinderGeometry(100, 106, 4, 48), M.pave, 4);
        add(new THREE.CylinderGeometry(66, 66, 3, 48), M.dark, 6.5);
        add(new THREE.TorusGeometry(103, 0.8, 6, 64).rotateX(Math.PI / 2), M.glow, 6.2);
        add(new THREE.TorusGeometry(67, 0.8, 6, 64).rotateX(Math.PI / 2), M.glowBlue, 8.1);
      },
    },
    KPYLON: {
      name: 'CONDUIT PYLON', code: 'SY', col: '#e8e1d1', h: 70, count: 6, needs: (api, k, cnt) => cnt('KPBASE') ? null : 'NEEDS THE CORE FOUNDATION',
      at: k => { const [cx, cz] = KRYOS.POWER, a = k / 6 * Math.PI * 2 + Math.PI / 6; return [Math.round(cx + Math.cos(a) * 150), Math.round(cz + Math.sin(a) * 150)]; },
      make(g, k, M, THREE, api, sl, B) {
        const add = (geo, mat, y) => { const m = new THREE.Mesh(geo, mat); m.position.y = y; g.add(m); return m; };
        add(new THREE.CylinderGeometry(9, 11, 4, 6), M.white, 2);
        add(new THREE.CylinderGeometry(3, 5, 62, 6), M.pearl, 34);
        for (const y of [20, 38, 56]) add(new THREE.TorusGeometry(5.5, 0.8, 6, 16).rotateX(Math.PI / 2), M.steel, y);
        const orb = add(new THREE.SphereGeometry(5, 16, 12), B._mats.orb || (B._mats.orb = new THREE.MeshBasicMaterial({ color: new THREE.Color(0.2, 0.3, 0.35) })), 69);
      },
    },
    KREACTOR: {
      name: 'REACTOR DOME', code: 'HC', col: '#d9731b', h: 90, count: 1, at: () => KRYOS.POWER, y: () => 8,
      make(g, k, M, THREE, api, sl, B) {
        const core = B._mats.core || (B._mats.core = new THREE.MeshBasicMaterial({ color: new THREE.Color(0.3, 0.35, 0.4) }));
        const beam = B._mats.beam || (B._mats.beam = new THREE.MeshBasicMaterial({ color: new THREE.Color(0.4, 1.0, 1.6), transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false }));
        const sph = new THREE.Mesh(new THREE.SphereGeometry(34, 40, 28), core); sph.position.y = 34; g.add(sph);
        const dome = new THREE.Mesh(new THREE.SphereGeometry(62, 48, 24, 0, Math.PI * 2, 0, Math.PI / 2), M.glass); g.add(dome);
        for (let i = 0; i < 12; i++) { const r = new THREE.Mesh(new THREE.TorusGeometry(62, 1, 6, 48, Math.PI), M.white); r.rotation.set(0, i / 12 * Math.PI, 0); g.add(r); }
        const ring = new THREE.Mesh(new THREE.TorusGeometry(46, 2, 8, 64), B._mats.ringC || (B._mats.ringC = new THREE.MeshBasicMaterial({ color: new THREE.Color(0.3, 0.4, 0.5) }))); ring.position.y = 34; g.add(ring); B._ring = ring;
        const b = new THREE.Mesh(new THREE.CylinderGeometry(4, 10, 1600, 16, 1, true), beam); b.position.y = 860; g.add(b);
      },
    },
    KCONDUIT: {
      name: 'POWER CONDUIT', code: 'HC', col: '#d9731b', h: 4, count: 6, needs: (api, k, cnt) => cnt('KREACTOR') ? null : 'NEEDS THE REACTOR DOME',
      at: k => { const [cx, cz] = KRYOS.POWER, a = k / 6 * Math.PI * 2 + Math.PI / 6; return [Math.round(cx + Math.cos(a) * 151), Math.round(cz + Math.sin(a) * 151)]; },
      make(g, k, M, THREE, api, sl, B) {
        // a glowing channel in the ground from the pylon out toward the city
        const [cx, cz] = KRYOS.POWER, a = Math.atan2(sl.z - cz, sl.x - cx);
        const len = 170, m = new THREE.Mesh(new THREE.BoxGeometry(len, 0.8, 3), B._mats.cond || (B._mats.cond = new THREE.MeshBasicMaterial({ color: new THREE.Color(0.2, 0.35, 0.4) })));
        m.position.set(Math.cos(a) * len / 2, 0.6, Math.sin(a) * len / 2); m.rotation.y = -a; g.add(m);
        const edge = new THREE.Mesh(new THREE.BoxGeometry(len, 0.5, 7), M.white); edge.position.copy(m.position); edge.position.y = 0.2; edge.rotation.y = -a; g.add(edge);
      },
    },
  },
  trips: [{ name: 'CORE FOUNDATION', parts: ['KPBASE', 'KPYLON'] }, { name: 'THE REACTOR', parts: ['KREACTOR', 'KCONDUIT'] }],
  tick(api, dt, t, lv) {
    const S = this._mats, p = 0.85 + 0.15 * Math.sin(t * 3);
    if (S.core) S.core.color.setRGB((0.3 + 1.2 * lv) * p, (0.35 + 1.6 * lv) * p, (0.4 + 2.2 * lv) * p);
    if (S.ringC) S.ringC.color.setRGB(0.3 + 0.6 * lv, 0.4 + 1.4 * lv, 0.5 + 2.0 * lv);
    if (S.orb) S.orb.color.setRGB(0.2 + 0.4 * lv * p, 0.3 + 1.5 * lv * p, 0.35 + 1.8 * lv * p);
    if (S.cond) { const f = 0.6 + 0.4 * Math.sin(t * 6); S.cond.color.setRGB(0.2 + 0.3 * lv * f, 0.35 + 1.4 * lv * f, 0.4 + 1.8 * lv * f); }
    if (S.beam) S.beam.opacity = lv * (0.25 + 0.1 * Math.sin(t * 5));
    if (this._ring) { this._ring.rotation.x += dt * (0.1 + lv * 0.8); this._ring.rotation.y += dt * (0.05 + lv * 0.5); }
  },
}));
