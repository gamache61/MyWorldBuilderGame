/* ============================================================
   THE COUNCIL HALL · BUILD 8 · THE GLASS DOME
   Keep this file in projects/councilhall next to councilhall.html.
   The great glass dome on golden ribs, in six sections, with an
   open eye at the top for the light of the Heart.
   Build 8 ends when you seal the dome (press L).
   ============================================================ */
(function () {
  const K = KRYOS, H = K.HALL, TAU = Math.PI * 2, R = H.R, DY = 6 + H.H + 8;
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(K.cityBuild({
    id: 8, name: 'THE GLASS DOME',
    brief: 'A great glass dome on golden ribs, raised in six sections over the hall, with an open eye at the very top for the light of the Heart.',
    finishLabel: 'SEAL THE DOME', flags: ['cdome'], status: ['DOME', 'SEALED'],
    finishCam: [[K.HX, K.HZ], 640], lookUp: 60,
    parts: {
      CDOME: { name: 'DOME SECTION', code: 'HP', col: '#9fd8ff', h: 100, count: 6, at: () => [K.HX, K.HZ], eye: (k, V) => V(Math.cos(k / 6 * TAU + 0.5) * 380, 220, Math.sin(k / 6 * TAU + 0.5) * 380),
        make(g, k, M, THREE) {
          const S = K.hallMats(THREE), a0 = k / 6 * TAU;
          const d = K.add(THREE, g, new THREE.SphereGeometry(R + 6, 16, 24, Math.PI - a0 - TAU / 6, TAU / 6, 0.12, Math.PI / 2 - 0.12), S.glass, 0, DY, 0); d.scale.y = 0.6; d.castShadow = false;
          for (let i = 0; i < 4; i++) { const rib = K.add(THREE, g, new THREE.TorusGeometry(R + 6, 0.9, 6, 48, Math.PI / 2 - 0.12), S.gold, 0, DY, 0); rib.rotation.order = 'YXZ'; rib.rotation.set(0, -(a0 + i / 24 * TAU) + Math.PI, Math.PI / 2); rib.scale.set(0.6, 1, 1); }
          for (const kk of [0.45, 0.8]) { const t = K.add(THREE, g, new THREE.TorusGeometry((R + 6) * Math.cos(Math.asin(kk)), 0.9, 6, 16, TAU / 6).rotateX(Math.PI / 2), S.gold, 0, DY + (R + 6) * kk * 0.6, 0); t.rotation.y = -a0; }
        } },
      CEYE: { name: 'DOME EYE', code: 'HP', col: '#d9a21b', h: 10, count: 1, at: () => [K.HX, K.HZ], eye: (k, V) => V(200, 260, 240),
        make(g, k, M, THREE) { const S = K.hallMats(THREE); K.add(THREE, g, new THREE.TorusGeometry((R + 6) * Math.sin(0.12), 2, 8, 48).rotateX(Math.PI / 2), S.gold, 0, DY + (R + 6) * Math.cos(0.12) * 0.6, 0); } },
    },
    trips: [{ name: 'DOME SECTIONS', parts: ['CDOME'] }, { name: 'THE EYE', parts: ['CEYE'] }],
  }));
})();
