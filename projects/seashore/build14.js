/* ============================================================
   SEASHORE · BUILD 14 · FERRY TERMINAL & FERRIES
   Keep this file in projects/seashore next to seashore.html.
   Trip 1 — the ferry terminal on the end of the middle pier.
   Trip 2 — 3 passenger ferries.
   Build 14 ends when you start the ferries (press L).
   ============================================================ */
(function () {
  const TERM = [-482, KRYOS.PIERS[1]], MOUTH = [-303, -775];
  const F = [
    { park: [-535, 115], path: [[-535, 115], [-590, -150], [-420, -470], MOUTH, [-560, -1050], [-900, -2000], [-1100, -3200]] },
    { park: [-535, 5], path: [[-535, 5], [-570, -250], [-420, -470], MOUTH, [-520, -1000], [-1300, -1300], [-3000, -900]] },
    { park: [-590, 60], path: [[-590, 60], [-600, 200], [-560, 265]] },
  ];
  const head0 = i => { const a = F[i].path[0], b = F[i].path[1]; return Math.atan2(b[1] - a[1], b[0] - a[0]); };
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(KRYOS.cityBuild({
    id: 14,
    name: 'FERRY TERMINAL & FERRIES',
    brief: 'A glass ferry terminal on the middle pier and three passenger ferries that run across the harbour and out along the coast.',
    finishLabel: 'START THE FERRIES', flags: ['sferries'], status: ['FERRIES', 'RUNNING'],
    focus: TERM, lookUp: 0,
    parts: {
      KFTERM: {
        name: 'FERRY TERMINAL', code: 'SY', col: '#e8e1d1', h: 20, count: 1, at: () => TERM,
        needs: api => api.flag('sdocks') ? null : 'NEEDS THE PIERS', eye: (k, V) => V(-160, 70, 140),
        make(g, k, M, THREE, api, sl) {
          const S = KRYOS.style(THREE), top = (api.DECK_TOP - 0.4) - sl.y, add = (geo, m, x, y, z) => KRYOS.add(THREE, g, geo, m, x, y, z);
          for (const [x, z] of [[-14, -18], [14, -18], [-14, 18], [14, 18]]) add(new THREE.CylinderGeometry(1.4, 1.4, top - (KRYOS.FLOOR - sl.y), 8), S.concrete, x, (top + KRYOS.FLOOR - sl.y) / 2, z);
          add(new THREE.BoxGeometry(36, 2, 46), S.trim, 0, top, 0);
          add(new THREE.CylinderGeometry(16, 16, 36, 24, 1, false, 0, Math.PI).rotateZ(Math.PI / 2).rotateY(Math.PI / 2), S.clear, 0, top + 1, 0).scale.set(1, 0.7, 1);
          add(new THREE.BoxGeometry(30, 7, 20), S.white(1, 1), 0, top + 4.5, 0);
          for (const z of [-24, 24]) add(new THREE.BoxGeometry(10, 1, 6), S.trim, -16, top, z);
        },
      },
      KFERRY: {
        name: 'PASSENGER FERRY', code: 'DF', col: '#2f6690', h: 16, count: 3, at: k => F[k].park, y: () => 0,
        needs: (api, k, cnt) => cnt('KFTERM') ? null : 'NEEDS THE FERRY TERMINAL', eye: (k, V) => V(-120, 60, 120),
        make(g, k, M, THREE) { const f = KRYOS.ferry(THREE, k); f.position.y = 2; f.rotation.y = -head0(k); f.userData = { i: k }; g.add(f); g.userData.ferry = f; },
      },
    },
    trips: [{ name: 'FERRY TERMINAL', parts: ['KFTERM'] }, { name: 'THE FERRIES', parts: ['KFERRY'] }],
    tick(api, dt, t) {
      const go = api.flag('sferries');
      for (const p of api.placed) {
        if (p.b !== 14 || !p.piece || !p.piece.userData.ferry) continue;
        const f = p.piece.userData.ferry, i = f.userData.i;
        f.position.y = 2 + Math.sin(t * 1.1 + i) * 0.3;
        if (!go) { f.position.x = 0; f.position.z = 0; f.rotation.y = -head0(i); continue; }
        const [x, z, h] = KRYOS.sail(F[i].path, t, i === 2 ? 10 : 15, i * 45);
        f.position.x = x - p.x; f.position.z = z - p.z; f.rotation.y = -h;
      }
    },
  }));
})();
