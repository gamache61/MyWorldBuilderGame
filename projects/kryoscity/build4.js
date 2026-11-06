/* ============================================================
   KRYOS CITY · BUILD 4 · THE GREEN BOULEVARD
   Keep this file in projects/kryoscity next to kryoscity.html.
   Kryos has no roads. Its main street is a green boulevard of
   walkways, lawns and a water channel running east and west from
   the landing field.
   Trip 1 — 8 boulevard sections (walkways, lawns, water channel).
   Trip 2 — 8 rows of trees and planters along them.
   Build 4 ends when you open the boulevard (press L).
   ============================================================ */
(function () {
  const W = 130;
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(KRYOS.cityBuild({
    id: 4,
    name: 'THE GREEN BOULEVARD',
    brief: 'The main street of Kryos — no roads and no cars, just walkways, lawns and a water channel, lined with trees.',
    finishLabel: 'OPEN THE BOULEVARD', flags: ['kblvd'], status: ['BOULEVARD', 'OPEN'],
    finishCam: [[650, 0], 900], lookUp: 20,
    parts: {
      KBLVD: {
        name: 'BOULEVARD SECTION', code: 'SF', col: '#6c757d', h: 2, count: 8, at: k => [KRYOS.SEG(k).xm, 0],
        eye: (k, V) => V(0, 140, 260),
        make(g, k, M, THREE) {
          const S = KRYOS.style(THREE), L = 260, add = (geo, m, x, y, z) => KRYOS.add(THREE, g, geo, m, x, y, z);
          add(new THREE.BoxGeometry(L, 3, W), S.pave(L / 12, W / 12), 0, -0.9, 0);
          add(new THREE.BoxGeometry(L, 0.4, 10), S.water, 0, 0.75, 0);
          for (const s of [-1, 1]) {
            add(new THREE.BoxGeometry(L, 0.5, 14), S.grass, 0, 0.75, s * 14);
            add(new THREE.BoxGeometry(L, 1, 1), S.trim, 0, 1, s * 5.5);
            add(new THREE.BoxGeometry(L, 0.6, 2), S.trim, 0, 0.6, s * (W / 2));
          }
          const pts = []; const r = KRYOS.rng(300 + k);
          for (let i = 0; i < 120; i++) pts.push([(r() - 0.5) * L, (r() < 0.5 ? -1 : 1) * (8 + r() * 56), 0.6]);
          KRYOS.people(THREE, g, pts, 70 + k);
        },
      },
      KROW: {
        name: 'TREE ROW', code: 'GD', col: '#3a7d44', h: 14, count: 8, at: k => [KRYOS.SEG(k).xm + 0.5, 0],
        needs: (api, k, cnt) => api.placed.some(p => p.b === 4 && p.type === 'KBLVD' && p.x === KRYOS.SEG(k).xm) ? null : 'NEEDS THE BOULEVARD SECTION UNDER IT',
        eye: (k, V) => V(0, 90, 200),
        make(g, k, M, THREE) {
          const S = KRYOS.style(THREE), L = 260, r = KRYOS.rng(500 + k), pts = [];
          for (let x = -L / 2 + 6; x < L / 2; x += 13) for (const s of [-1, 1]) { pts.push([x + r() * 4, s * (24 + r() * 4), 0.6]); if (r() < 0.5) pts.push([x + r() * 6, s * (38 + r() * 6), 0.6]); }
          KRYOS.trees(THREE, g, pts, 600 + k);
          for (let x = -L / 2 + 23; x < L / 2; x += 46) for (const s of [-1, 1]) {
            KRYOS.add(THREE, g, new THREE.BoxGeometry(26, 1.2, 10), S.trim, x, 1.2, s * 52);
            KRYOS.add(THREE, g, new THREE.BoxGeometry(25, 0.6, 9), S.crops[Math.abs(Math.round(x / 46)) % 3], x, 2, s * 52);
          }
        },
      },
    },
    trips: [{ name: 'BOULEVARD SECTIONS', parts: ['KBLVD'] }, { name: 'TREES & PLANTERS', parts: ['KROW'] }],
  }));
})();
