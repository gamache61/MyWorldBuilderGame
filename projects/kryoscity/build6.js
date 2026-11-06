/* ============================================================
   KRYOS CITY · BUILD 6 · WATER & RECYCLING
   Keep this file in projects/kryoscity next to kryoscity.html.
   Trip 1 — the reservoir, 4 water towers and 4 reclaimer domes.
   Trip 2 — 3 sorting halls with solar roofs.
   Build 4 ends when you start the recyclers (press L).
   ============================================================ */
(function () {
  const C = KRYOS.RECYCLE;
  const around = (k, n, r, a0 = 0) => { const a = a0 + k / n * Math.PI * 2; return [Math.round(C[0] + Math.cos(a) * r), Math.round(C[1] + Math.sin(a) * r)]; };
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(KRYOS.cityBuild({
    id: 6,
    name: 'WATER & RECYCLING',
    brief: 'Kryos wastes nothing: a reservoir, water towers, reclaimers that clean every drop, and halls that sort and reuse everything.',
    finishLabel: 'START THE RECYCLERS', flags: ['krecycle'], status: ['RECYCLING', '99% REUSED'],
    focus: C, needsPower: true,
    parts: {
      KPOOL: {
        name: 'RESERVOIR', code: 'WR', col: '#2a9d8f', h: 6, count: 1, at: () => C,
        needs: api => api.flag('power') ? null : 'NEEDS THE POWER CORE LIT FIRST',
        make(g, k, M, THREE) {
          const rim = new THREE.Mesh(new THREE.CylinderGeometry(62, 66, 4, 48), M.white); rim.position.y = 1; g.add(rim);
          const w = new THREE.Mesh(new THREE.CylinderGeometry(58, 58, 1, 48), M.water); w.position.y = 2.8; g.add(w);
          const f = new THREE.Mesh(new THREE.CylinderGeometry(4, 6, 10, 12), M.pearl); f.position.y = 6; g.add(f);
          const jet = new THREE.Mesh(new THREE.ConeGeometry(5, 16, 12, 1, true), M.glass); jet.position.y = 16; jet.rotation.x = Math.PI; g.add(jet);
        },
      },
      KWTOWER: {
        name: 'WATER TOWER', code: 'WR', col: '#2a9d8f', h: 70, count: 4, at: k => around(k, 4, 120, Math.PI / 4),
        make(g, k, M, THREE) {
          for (let i = 0; i < 4; i++) { const a = i / 4 * Math.PI * 2 + Math.PI / 4, l = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.6, 46, 6), M.steel); l.position.set(Math.cos(a) * 9, 23, Math.sin(a) * 9); g.add(l); }
          const tank = new THREE.Mesh(new THREE.SphereGeometry(16, 24, 16), M.pearl); tank.position.y = 56; tank.scale.y = 0.85; g.add(tank);
          const band = new THREE.Mesh(new THREE.CylinderGeometry(16.2, 16.2, 3, 32, 1, true), M.glassGreen); band.position.y = 56; g.add(band);
          const ring = new THREE.Mesh(new THREE.TorusGeometry(16.4, 0.4, 6, 32).rotateX(Math.PI / 2), M.glow); ring.position.y = 57.6; g.add(ring);
        },
      },
      KRECLAIM: {
        name: 'RECLAIMER DOME', code: 'RU', col: '#2a9d8f', h: 24, count: 4, at: k => around(k, 4, 190, 0),
        make(g, k, M, THREE) {
          const d = new THREE.Mesh(new THREE.SphereGeometry(24, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2), M.white); g.add(d);
          const w = new THREE.Mesh(new THREE.CylinderGeometry(24.3, 24.3, 3, 32, 1, true), M.glass); w.position.y = 5; g.add(w);
          for (let i = 0; i < 3; i++) { const p = new THREE.Mesh(new THREE.CylinderGeometry(2, 2, 30, 8), M.steel); p.rotation.z = Math.PI / 2; p.position.set(0, 2, -14 + i * 14); p.scale.y = 1.6; g.add(p); }
          const top = new THREE.Mesh(new THREE.CylinderGeometry(4, 5, 6, 12), M.dark); top.position.y = 25; g.add(top);
        },
      },
      KSORT: {
        name: 'SORTING HALL', code: 'RU', col: '#2a9d8f', h: 18, count: 3, at: k => around(k, 3, 290, Math.PI / 3),
        make(g, k, M, THREE, api, sl) {
          const a = Math.atan2(sl.z - C[1], sl.x - C[0]); g.rotation.y = -a + Math.PI / 2;
          const body = new THREE.Mesh(new THREE.BoxGeometry(110, 16, 40), M.white); body.position.y = 8; g.add(body);
          const roof = new THREE.Mesh(new THREE.BoxGeometry(112, 1, 42), M.solar); roof.position.y = 16.5; g.add(roof);
          const win = new THREE.Mesh(new THREE.BoxGeometry(110.4, 3, 40.4), M.glass); win.position.y = 11; g.add(win);
          const strip = new THREE.Mesh(new THREE.BoxGeometry(110.6, 0.5, 40.6), M.glow); strip.position.y = 4; g.add(strip);
        },
      },
    },
    trips: [{ name: 'WATER WORKS', parts: ['KPOOL', 'KWTOWER', 'KRECLAIM'] }, { name: 'SORTING HALLS', parts: ['KSORT'] }],
  }));
})();
