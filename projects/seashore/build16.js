/* ============================================================
   SEASHORE · BUILD 16 · BEACH RESORT
   Keep this file in projects/seashore next to seashore.html.
   Trip 1 — 3 sections of sandy beach down the coast,
            with umbrellas and palm trees.
   Trip 2 — 3 terraced resort hotels with roof pools.
   Build 16 ends when you open the resort (press L). The seashore is
            complete.
   ============================================================ */
(function () {
  const X = KRYOS.SHORE, Z = k => -1650 - k * 160;
  const umbr = [0xc8402e, 0x2f6690, 0xe0b030, 0x3a7d44, 0xe8e2d8];
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(KRYOS.cityBuild({
    id: 16,
    name: 'BEACH RESORT',
    brief: 'A sandy beach down the coast with umbrellas and palms, and terraced hotels with pools on their roofs.',
    finishLabel: 'OPEN THE BEACH RESORT', flags: ['sresort'], status: ['BEACH RESORT', 'OPEN'],
    finishCam: [[-150, -1810], 900], lookUp: 0,
    parts: {
      KBEACH: {
        name: 'BEACH SECTION', code: 'SF', col: '#e8c13a', h: 6, count: 3, at: k => [X + 20, Z(k)],
        eye: (k, V) => V(-180, 60, 120),
        make(g, k, M, THREE, api, sl) {
          const S = KRYOS.style(THREE), sand = KRYOS.kit(THREE).std(0xe6d6aa, 1, 0), r = KRYOS.rng(1600 + k);
          const b = KRYOS.add(THREE, g, new THREE.BoxGeometry(150, 3, 160), sand, -40, -1.8, 0); b.rotation.z = 0.025;
          for (let i = 0; i < 18; i++) {
            const x = -60 + r() * 70, z = -70 + r() * 140, c = KRYOS.kit(THREE).std(umbr[i % 5], 0.6, 0);
            KRYOS.add(THREE, g, new THREE.CylinderGeometry(0.15, 0.15, 4, 5), S.trim, x, 1.5, z);
            KRYOS.add(THREE, g, new THREE.ConeGeometry(3, 1.2, 8), c, x, 3.6, z);
            KRYOS.add(THREE, g, new THREE.BoxGeometry(2, 0.3, 4), S.trim, x + 2, 0.4, z + 1);
          }
          const leafM = KRYOS.kit(THREE).std(0x3f8a3a, 0.9, 0);
          for (let i = 0; i < 10; i++) {
            const x = 18 + r() * 12, z = -70 + i * 15, h = 9 + r() * 4, pg = new THREE.Group(); pg.position.set(x, 0, z); g.add(pg);
            const t = KRYOS.add(THREE, pg, new THREE.CylinderGeometry(0.4, 0.6, h, 6), KRYOS.style(THREE).trunk, 0, h / 2, 0); t.rotation.z = 0.12;
            for (let j = 0; j < 6; j++) { const f = KRYOS.add(THREE, pg, new THREE.BoxGeometry(6, 0.2, 1.2).translate(3, 0, 0), leafM, 0.6, h, 0); f.rotation.set(0, j / 6 * Math.PI * 2, -0.35); }
          }
          const ppl = []; for (let i = 0; i < 50; i++) ppl.push([-75 + r() * 85, -70 + r() * 140, 0]);
          KRYOS.people(THREE, g, ppl, 1650 + k);
        },
      },
      KHOTEL: {
        name: 'RESORT HOTEL', code: 'HM', col: '#e8e1d1', h: 60, count: 3, at: k => [X + 160, Z(k)],
        needs: (api, k, cnt) => cnt('KBEACH') >= 3 ? null : 'NEEDS THE BEACH', eye: (k, V) => V(-220, 110, 160),
        make(g, k, M, THREE) {
          const S = KRYOS.style(THREE), add = (geo, m, x, y, z) => KRYOS.add(THREE, g, geo, m, x, y, z);
          let y = 0;
          for (let f = 0; f < 5; f++) { const w = 70 - f * 9, h = 10; add(new THREE.BoxGeometry(w, h, 110), S.white(2, 1), 15 + f * 4.5, y + h / 2, 0); add(new THREE.BoxGeometry(w + 1, 1, 111), S.trim, 15 + f * 4.5, y + h, 0); add(new THREE.BoxGeometry(4, 1, 108), S.grass, 15 + f * 4.5 - w / 2 + 2, y + h + 0.8, 0); y += h; }
          add(new THREE.BoxGeometry(24, 1.2, 60), KRYOS.style(THREE).water, 33, y + 0.8, 0);
          add(new THREE.BoxGeometry(36, 0.6, 80), KRYOS.kit(THREE).std(0xb89a76, 0.9, 0), 33, y + 0.3, 0);
          add(new THREE.CylinderGeometry(22, 22, 0.8, 24), KRYOS.style(THREE).water, -40, 0.6, 0).scale.set(1, 1, 1.4);
          KRYOS.trees(THREE, g, [[-40, -45], [-40, 45], [-10, -50], [-10, 50]], 1700 + k, 0.8);
        },
      },
    },
    trips: [{ name: 'THE BEACH', parts: ['KBEACH'] }, { name: 'RESORT HOTELS', parts: ['KHOTEL'] }],
  }));
})();
