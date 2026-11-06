/* ============================================================
   SEASHORE · BUILD 4 · TIDAL POWER
   Keep this file in projects/seashore next to seashore.html.
   Trip 1 — 6 tidal turbines out in the open sea, where the tide
            flows strongly twice a day.
   Trip 2 — the tidal power hall on the shore and 2 sea cables.
   Build 4 ends when you start the turbines (press L). The seashore
            has power from then on.
   ============================================================ */
(function () {
  const TX = (k) => [Math.round(-1080 + (k % 3) * 60), Math.round(-640 - Math.floor(k / 3) * 60)];   // out in the open sea, clear of the harbour mouth and the shipping lanes
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(KRYOS.cityBuild({
    id: 4,
    name: 'TIDAL POWER',
    brief: 'Turbines out in the open sea turn with every tide, feeding a power hall on the shore — clean power for the whole seashore.',
    finishLabel: 'START THE TIDAL TURBINES', flags: ['power'], status: ['TIDAL POWER', '1.6 GW ONLINE'],
    focus: [-600, -800], lookUp: 0,
    parts: {
      KTURB: {
        name: 'TIDAL TURBINE', code: 'HC', col: '#d9731b', h: 20, count: 6, at: k => TX(k),
        needs: (api, k, cnt) => api.flag('sbreak') ? null : 'NEEDS THE BREAKWATER',
        eye: (k, V) => V(60, 60, -140),
        make(g, k, M, THREE, api, sl, B) {
          const S = KRYOS.style(THREE), add = (geo, m, x, y, z) => KRYOS.add(THREE, g, geo, m, x, y, z), yellow = KRYOS.kit(THREE).std(0xe0b030, 0.5, 0.3);
          add(new THREE.CylinderGeometry(2.6, 3.2, 70, 12), S.trim, 0, -27, 0);
          add(new THREE.CylinderGeometry(5, 5, 4, 16), yellow, 0, 9, 0);
          const hub = new THREE.Group(); hub.position.y = -16; g.add(hub);
          add(new THREE.CapsuleGeometry(3.4, 10, 4, 12).rotateX(Math.PI / 2), S.trim, 0, -16, 0);
          const rotor = new THREE.Group(); rotor.position.set(0, -16, -9); g.add(rotor);
          for (let i = 0; i < 3; i++) { const b = new THREE.Mesh(new THREE.BoxGeometry(1.6, 15, 0.6), yellow); b.position.y = 7.5; const p = new THREE.Group(); p.rotation.z = i / 3 * Math.PI * 2; p.add(b); rotor.add(p); }
          (B._rotors || (B._rotors = [])).push(rotor);
          const l = new THREE.Mesh(new THREE.SphereGeometry(0.8, 8, 6), new THREE.MeshBasicMaterial({ color: 0xffa020 })); l.position.y = 12; g.add(l); api.blink(l, 1.5, 0xffa020);
        },
      },
      KHALL: {
        name: 'TIDAL POWER HALL', code: 'SY', col: '#e8e1d1', h: 26, count: 1, at: () => KRYOS.TIDAL,
        make(g, k, M, THREE, api, sl, B) {
          const S = KRYOS.style(THREE), add = (geo, m, x, y, z) => KRYOS.add(THREE, g, geo, m, x, y, z);
          add(new THREE.BoxGeometry(120, 20, 60), S.white(3, 1), 0, 10, 0);
          add(new THREE.CylinderGeometry(30, 30, 120, 24, 1, false, 0, Math.PI).rotateZ(Math.PI / 2), S.clear, 0, 20, 0).scale.set(1, 0.45, 1);
          add(new THREE.BoxGeometry(121, 1, 61), S.trim, 0, 20, 0);
          const band = new THREE.Mesh(new THREE.BoxGeometry(121, 1.2, 61.2), B._mats.hall || (B._mats.hall = new THREE.MeshBasicMaterial({ color: new THREE.Color(0.3, 0.4, 0.45) }))); band.position.y = 6; g.add(band);
          KRYOS.trees(THREE, g, [[-70, -40], [-70, 40], [70, -40], [70, 40], [0, 44], [30, 44], [-30, 44]], 9);
        },
      },
      KCABLE: {
        name: 'SEA CABLE', code: 'HC', col: '#d9731b', h: 2, count: 2, at: k => [KRYOS.TIDAL[0] + 0.5 + k, KRYOS.TIDAL[1]],
        needs: (api, k, cnt) => cnt('KHALL') ? null : 'NEEDS THE POWER HALL',
        make(g, k, M, THREE, api, sl, B) {
          // a glowing cable trench from the power hall out to the turbines (k = 0) or up to the landing field (k = 1)
          const to = k ? [60, -330] : TX(3), dx = to[0] - sl.x, dz = to[1] - sl.z, len = Math.hypot(dx, dz), a = Math.atan2(dz, dx);
          const m = new THREE.Mesh(new THREE.BoxGeometry(len, 0.8, 3), B._mats.cab || (B._mats.cab = new THREE.MeshBasicMaterial({ color: new THREE.Color(0.2, 0.3, 0.35) })));
          m.position.set(dx / 2, 0.6, dz / 2); m.rotation.y = -a; g.add(m);
        },
      },
    },
    trips: [{ name: 'THE TURBINES', parts: ['KTURB'] }, { name: 'POWER HALL', parts: ['KHALL', 'KCABLE'] }],
    tick(api, dt, t, lv) {
      const S = this._mats, f = 0.6 + 0.4 * Math.sin(t * 5);
      for (const r of this._rotors || []) r.rotation.z += dt * (0.1 + lv * 1.4);
      if (S.hall) S.hall.color.setRGB(0.3 + 0.3 * lv, 0.4 + 1.3 * lv, 0.45 + 1.8 * lv);
      if (S.cab) S.cab.color.setRGB(0.2 + 0.4 * lv * f, 0.3 + 1.4 * lv * f, 0.35 + 1.8 * lv * f);
    },
  }));
})();
