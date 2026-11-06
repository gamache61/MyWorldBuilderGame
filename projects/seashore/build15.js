/* ============================================================
   SEASHORE · BUILD 15 · OCEAN RESEARCH CENTRE
   Keep this file in projects/seashore next to seashore.html.
   Trip 1 — the research labs and the great glass aquarium dome on
            the north shore.
   Trip 2 — an underwater observatory in the harbour and the glass
            walkway that leads out to it.
   Build 15 ends when you open the research centre (press L).
   ============================================================ */
(function () {
  const LAB = [-40, 1180], OBS = [-340, 120];
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(KRYOS.cityBuild({
    id: 15,
    name: 'OCEAN RESEARCH CENTRE',
    brief: 'Labs and a great glass aquarium on the north shore, and an observatory out in the harbour where people watch the sea life of Unity.',
    finishLabel: 'OPEN THE RESEARCH CENTRE', flags: ['sresearch'], status: ['OCEAN RESEARCH', 'OPEN'],
    finishCam: [[-200, 600], 1200], lookUp: 0,
    parts: {
      KLAB: {
        name: 'RESEARCH LABS', code: 'SY', col: '#e8e1d1', h: 24, count: 1, at: () => [LAB[0] + 90, LAB[1]],
        make(g, k, M, THREE) {
          const S = KRYOS.style(THREE);
          KRYOS.lowrise(THREE, g, 0, -30, 70, 40, 18, 1501); KRYOS.lowrise(THREE, g, 0, 30, 70, 40, 24, 1502);
          KRYOS.add(THREE, g, new THREE.CylinderGeometry(0.4, 0.4, 30, 6), S.trim, 20, 40, 30);
          KRYOS.add(THREE, g, new THREE.SphereGeometry(6, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2), S.trim, -20, 24, 30);
        },
      },
      KAQUA: {
        name: 'AQUARIUM DOME', code: 'WR', col: '#2a9d8f', h: 50, count: 1, at: () => LAB,
        make(g, k, M, THREE, api, sl, B) {
          const S = KRYOS.style(THREE), add = (geo, m, x, y, z) => KRYOS.add(THREE, g, geo, m, x, y, z);
          add(new THREE.CylinderGeometry(64, 66, 4, 48), S.trim, 0, 2, 0);
          const d = add(new THREE.SphereGeometry(60, 48, 24, 0, Math.PI * 2, 0, Math.PI / 2), S.clear, 0, 4, 0); d.castShadow = false;
          for (let i = 0; i < 10; i++) { const r = new THREE.Mesh(new THREE.TorusGeometry(60, 0.6, 6, 48, Math.PI), S.trim); r.position.y = 4; r.rotation.y = i / 10 * Math.PI; g.add(r); }
          add(new THREE.CylinderGeometry(42, 42, 22, 40), KRYOS.style(THREE).water, 0, 15, 0);
          const fishM = B._mats.fish || (B._mats.fish = new THREE.MeshBasicMaterial({ color: new THREE.Color(1.6, 0.9, 0.3) }));
          const fish = new THREE.Group(); fish.position.y = 15; g.add(fish); B._fish = fish;
          for (let i = 0; i < 40; i++) { const f = new THREE.Mesh(new THREE.ConeGeometry(0.7, 2.4, 6).rotateZ(Math.PI / 2), fishM); const a = i * 2.4, r = 10 + (i % 7) * 4; f.position.set(Math.cos(a) * r, (i % 5) * 2 - 4, Math.sin(a) * r); f.rotation.y = -a - Math.PI / 2; fish.add(f); }
          KRYOS.trees(THREE, g, [[-70, -40], [-75, 20], [70, -45], [72, 30], [0, -72], [40, -66], [-40, -66]], 1505);
        },
      },
      KOBS: {
        name: 'UNDERWATER OBSERVATORY', code: 'WR', col: '#2a9d8f', h: 14, count: 1, at: () => OBS,
        needs: api => api.flag('sbreak') ? null : 'NEEDS THE BREAKWATER', eye: (k, V) => V(-120, 60, 120),
        make(g, k, M, THREE) {
          const S = KRYOS.style(THREE), add = (geo, m, x, y, z) => KRYOS.add(THREE, g, geo, m, x, y, z);
          add(new THREE.CylinderGeometry(26, 26, 3, 32), S.trim, 0, 1.5, 0);
          const d = add(new THREE.SphereGeometry(18, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2), S.clear, 0, 3, 0); d.castShadow = false;
          const under = add(new THREE.SphereGeometry(24, 32, 16, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), S.clear, 0, 0, 0); under.castShadow = false;
          add(new THREE.CylinderGeometry(3, 3, 60, 10), S.trim, 0, -30, 0);
        },
      },
      KWALKWAY: {
        name: 'GLASS WALKWAY', code: 'SF', col: '#6c757d', h: 8, count: 1, at: () => [OBS[0] + 0.5, OBS[1]],
        needs: (api, k, cnt) => cnt('KOBS') ? null : 'NEEDS THE OBSERVATORY',
        make(g, k, M, THREE, api, sl) {
          const S = KRYOS.style(THREE), L = KRYOS.SHORE - 6 - (OBS[0] + 26), mid = OBS[0] + 26 + L / 2 - sl.x, top = (api.DECK_TOP - 0.4) - sl.y;
          KRYOS.add(THREE, g, new THREE.BoxGeometry(L, 2, 8), S.trim, mid, top, 0);
          KRYOS.add(THREE, g, new THREE.CylinderGeometry(5, 5, L, 16, 1, true, 0, Math.PI).rotateZ(Math.PI / 2), S.clear, mid, top + 1, 0);
          for (let x = -L / 2 + 10; x < L / 2; x += 25) KRYOS.add(THREE, g, new THREE.CylinderGeometry(1, 1, top - (KRYOS.FLOOR - sl.y), 8), S.concrete, mid + x, (top + KRYOS.FLOOR - sl.y) / 2, 0);
        },
      },
    },
    trips: [{ name: 'LABS & AQUARIUM', parts: ['KLAB', 'KAQUA'] }, { name: 'OBSERVATORY', parts: ['KOBS', 'KWALKWAY'] }],
    tick(api, dt, t) { if (this._fish) this._fish.rotation.y += dt * 0.25; },
  }));
})();
