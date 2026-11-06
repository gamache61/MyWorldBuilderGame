/* ============================================================
   SEAPORT · BUILD 7 · WATERFRONT PROMENADE
   Keep this file in projects/seaport next to seaport.html.
   Trip 1 — 6 sections of boardwalk along the quay.
   Trip 2 — 6 rows of trees, cafés and benches beside it.
   Build 7 ends when you open the waterfront (press L).
   ============================================================ */
(function () {
  const X = KRYOS.SHORE + 30, cafeCols = [0x2f6690, 0xc8402e, 0xe0b030, 0x3a7d44];
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(KRYOS.cityBuild({
    id: 7,
    name: 'WATERFRONT PROMENADE',
    brief: 'A wooden boardwalk the whole length of the harbour, lined with trees, cafés and benches looking out over the water.',
    finishLabel: 'OPEN THE WATERFRONT', flags: ['sprom'], status: ['WATERFRONT', 'OPEN'],
    finishCam: [[-150, 0], 900], lookUp: 0,
    parts: {
      KWALK: {
        name: 'BOARDWALK SECTION', code: 'SF', col: '#6c757d', h: 3, count: 6, at: k => [X, KRYOS.SEG(k).zm],
        eye: (k, V) => V(-200, 70, 140),
        make(g, k, M, THREE, api) {
          const S = KRYOS.style(THREE), deck = KRYOS.kit(THREE).std(0xb89a76, 0.9, 0);
          KRYOS.add(THREE, g, new THREE.BoxGeometry(36, 1.6, 250), deck, 0, 0.6, 0);
          KRYOS.add(THREE, g, new THREE.BoxGeometry(1, 1.4, 250), S.trim, -18, 1.8, 0);
          const r = KRYOS.rng(150 + k), pts = []; for (let i = 0; i < 90; i++) pts.push([(r() - 0.5) * 32, (r() - 0.5) * 246, 1.4]);
          KRYOS.people(THREE, g, pts, 170 + k);
          for (let z = -110; z <= 110; z += 22) KRYOS.add(THREE, g, new THREE.SphereGeometry(0.6, 8, 6), M.glowWarm, -17, 5, z), KRYOS.add(THREE, g, new THREE.CylinderGeometry(0.15, 0.15, 3.6, 5), S.trim, -17, 3, z);
        },
      },
      KTREES: {
        name: 'TREES & CAFÉS', code: 'GD', col: '#3a7d44', h: 12, count: 6, at: k => [X + 0.5, KRYOS.SEG(k).zm],
        needs: (api, k, cnt) => api.placed.some(p => p.b === 7 && p.type === 'KWALK' && p.z === KRYOS.SEG(k).zm) ? null : 'NEEDS THE BOARDWALK',
        eye: (k, V) => V(-200, 70, 140),
        make(g, k, M, THREE) {
          const S = KRYOS.style(THREE), r = KRYOS.rng(200 + k), pts = [];
          for (let z = -120; z < 125; z += 14) { pts.push([24 + r() * 4, z + r() * 4]); if (r() < 0.5) pts.push([40 + r() * 8, z + r() * 6]); }
          KRYOS.trees(THREE, g, pts, 220 + k);
          for (let z = -90; z <= 90; z += 90) {
            KRYOS.add(THREE, g, new THREE.BoxGeometry(14, 6, 24), S.white(1, 1), 30, 3, z);
            KRYOS.add(THREE, g, new THREE.BoxGeometry(18, 0.6, 28), KRYOS.kit(THREE).std(cafeCols[(k + z / 90 + 4) % 4], 0.6, 0.1), 26, 6.3, z);
            for (let i = 0; i < 4; i++) KRYOS.add(THREE, g, new THREE.CylinderGeometry(1.4, 1.4, 0.3, 10), S.trim, 14, 2, z - 9 + i * 6);
          }
        },
      },
    },
    trips: [{ name: 'THE BOARDWALK', parts: ['KWALK'] }, { name: 'TREES & CAFÉS', parts: ['KTREES'] }],
  }));
})();
