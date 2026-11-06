/* ============================================================
   SEAPORT · BUILD 3 · BREAKWATER & LIGHTHOUSE
   Keep this file in projects/seaport next to seaport.html.
   Trip 1 — 8 sections of the curved breakwater that makes a calm
            harbour out of the open sea.
   Trip 2 — the lighthouse at the harbour mouth and a harbour
            beacon at the north end of the wall.
   Build 3 ends when you light the lighthouse (press L).
   ============================================================ */
(function () {
  const BW = KRYOS.BW, N = 8, TAU = Math.PI * 2;
  const segA = k => [BW.a0 + (BW.a1 - BW.a0) * k / N, BW.a0 + (BW.a1 - BW.a0) * (k + 1) / N];
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(KRYOS.cityBuild({
    id: 3,
    name: 'BREAKWATER & LIGHTHOUSE',
    brief: 'A curved stone and concrete breakwater that turns open sea into a calm harbour, with a lighthouse at its mouth.',
    finishLabel: 'LIGHT THE LIGHTHOUSE', flags: ['sbreak'], status: ['BREAKWATER', 'HARBOUR CALM'],
    finishCam: [[-300, -200], 1600], lookUp: 0,
    parts: {
      KBWALL: {
        name: 'BREAKWATER SECTION', code: 'SF', col: '#6c757d', h: 14, count: N, at: k => { const [a0, a1] = segA(k); return KRYOS.bwPoint((a0 + a1) / 2); },
        eye: (k, V) => V(-260, 140, 120),
        make(g, k, M, THREE, api, sl) {
          const S = KRYOS.style(THREE), [a0, a1] = segA(k), sea = KRYOS.SEA(), base = sl.y;
          const pts = []; for (let i = 0; i <= 12; i++) { const a = a0 + (a1 - a0) * i / 12; pts.push(new THREE.Vector3(BW.x + Math.cos(a) * BW.R - sl.x, 0, BW.z + Math.sin(a) * BW.R - sl.z)); }
          const curve = new THREE.CatmullRomCurve3(pts);
          const wall = new THREE.Mesh(new THREE.TubeGeometry(curve, 24, 13, 6, false), S.concrete); wall.scale.y = 1.4; wall.position.y = sea - base - 6; wall.castShadow = wall.receiveShadow = true; g.add(wall);
          const walk = new THREE.Mesh(new THREE.TubeGeometry(curve, 24, 7, 4, false), S.trim); walk.position.y = sea - base + 9; walk.scale.y = 0.15; g.add(walk);
          const r = KRYOS.rng(40 + k), rock = KRYOS.kit(THREE).std(0x8a8a86, 1, 0);
          for (let i = 0; i < 26; i++) { const p = curve.getPoint(r()), s = 3 + r() * 5; KRYOS.add(THREE, g, new THREE.DodecahedronGeometry(s, 0), rock, p.x + (r() - 0.5) * 30, sea - base - 1, p.z + (r() - 0.5) * 30).rotation.set(r() * 3, r() * 3, 0); }
          for (let i = 1; i < 4; i++) { const p = curve.getPoint(i / 4); KRYOS.add(THREE, g, new THREE.CylinderGeometry(0.3, 0.3, 6, 6), S.trim, p.x, sea - base + 12, p.z); KRYOS.add(THREE, g, new THREE.SphereGeometry(0.8, 8, 6), M.glowWarm, p.x, sea - base + 15.4, p.z); }
        },
      },
      KLIGHT: {
        name: 'LIGHTHOUSE', code: 'SY', col: '#e8e1d1', h: 140, count: 1, at: () => KRYOS.LIGHT,
        needs: (api, k, cnt) => cnt('KBWALL') >= N ? null : 'NEEDS THE WHOLE BREAKWATER', eye: (k, V) => V(-220, 120, -200),
        make(g, k, M, THREE, api, sl, B) {
          const S = KRYOS.style(THREE), add = (geo, m, x, y, z) => KRYOS.add(THREE, g, geo, m, x, y, z), red = KRYOS.kit(THREE).std(0xc8402e, 0.5, 0.2);
          add(new THREE.CylinderGeometry(20, 24, 20, 24), S.concrete, 0, 0, 0);
          add(new THREE.CylinderGeometry(5, 9, 110, 20), S.trim, 0, 64, 0);
          for (const y of [42, 82]) add(new THREE.CylinderGeometry(7.6 - (y - 42) * 0.04, 8.1 - (y - 42) * 0.04, 6, 20), red, 0, y, 0);
          add(new THREE.CylinderGeometry(10, 10, 2, 20), S.trim, 0, 120, 0);
          add(new THREE.CylinderGeometry(6.5, 6.5, 12, 20), S.clear, 0, 127, 0);
          const lamp = new THREE.Mesh(new THREE.SphereGeometry(3.2, 16, 12), B._mats.lamp || (B._mats.lamp = new THREE.MeshBasicMaterial({ color: new THREE.Color(0.5, 0.45, 0.35) }))); lamp.position.y = 127; g.add(lamp);
          const beam = new THREE.Mesh(new THREE.ConeGeometry(14, 260, 16, 1, true).rotateZ(Math.PI / 2).translate(130, 0, 0), B._mats.beam || (B._mats.beam = new THREE.MeshBasicMaterial({ color: new THREE.Color(1.2, 1.1, 0.8), transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide })));
          beam.position.y = 127; g.add(beam); B._beam = beam;
          add(new THREE.ConeGeometry(8, 10, 20), red, 0, 138, 0);
        },
      },
      KBEACON: {
        name: 'HARBOUR BEACON', code: 'DC', col: '#2f6690', h: 30, count: 1, at: () => KRYOS.bwPoint(KRYOS.BW.a0),
        make(g, k, M, THREE, api, sl, B) {
          const S = KRYOS.style(THREE);
          KRYOS.add(THREE, g, new THREE.CylinderGeometry(9, 11, 14, 16), S.concrete, 0, 0, 0);
          KRYOS.add(THREE, g, new THREE.CylinderGeometry(1.6, 2.4, 26, 10), S.trim, 0, 18, 0);
          const l = new THREE.Mesh(new THREE.SphereGeometry(2.2, 12, 8), new THREE.MeshBasicMaterial({ color: 0x40ff60 })); l.position.y = 32; g.add(l); api.blink(l, 2, 0x40ff60);
        },
      },
    },
    trips: [{ name: 'THE BREAKWATER', parts: ['KBWALL'] }, { name: 'LIGHTHOUSE & BEACON', parts: ['KLIGHT', 'KBEACON'] }],
    tick(api, dt, t, lv) {
      const S = this._mats;
      if (S.lamp) { const p = 0.7 + 0.3 * Math.sin(t * 3); S.lamp.color.setRGB(0.5 + 2.6 * lv * p, 0.45 + 2.3 * lv * p, 0.35 + 1.4 * lv * p); }
      if (S.beam) S.beam.opacity = lv * 0.18;
      if (this._beam) this._beam.rotation.y += dt * 0.6;
    },
  }));
})();
