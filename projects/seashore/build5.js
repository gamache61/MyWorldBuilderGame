/* ============================================================
   SEAPORT · BUILD 5 · DOCKS & PIERS
   Keep this file in projects/seaport next to seaport.html.
   Trip 1 — 6 sections of quay wall along the shore.
   Trip 2 — 3 long piers reaching out into the harbour.
   Build 5 ends when you open the docks (press L).
   ============================================================ */
(function () {
  const X = KRYOS.SHORE, LEN = 260;
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(KRYOS.cityBuild({
    id: 5,
    name: 'DOCKS & PIERS',
    brief: 'A stone quay along the whole waterfront and three long piers where boats and ships tie up.',
    finishLabel: 'OPEN THE DOCKS', flags: ['sdocks'], status: ['DOCKS & PIERS', 'OPEN'],
    focus: [-300, -250], lookUp: 0,
    parts: {
      KQUAY: {
        name: 'QUAY WALL SECTION', code: 'SF', col: '#6c757d', h: 6, count: 6, at: k => [X - 6, KRYOS.SEG(k).zm],
        eye: (k, V) => V(-260, 90, 160),
        make(g, k, M, THREE, api, sl) {
          const S = KRYOS.style(THREE), sea = KRYOS.SEA(), land = api.DECK_TOP - 0.4, top = land - sl.y;
          KRYOS.add(THREE, g, new THREE.BoxGeometry(18, top - (KRYOS.FLOOR - sl.y), 250), S.concrete, 0, (top + (KRYOS.FLOOR - sl.y)) / 2, 0);
          KRYOS.add(THREE, g, new THREE.BoxGeometry(20, 1, 250), S.trim, 0, top + 0.5, 0);
          for (let z = -110; z <= 110; z += 44) { KRYOS.add(THREE, g, new THREE.CylinderGeometry(0.9, 1.1, 1.6, 10), S.dark, -8, top + 1.6, z); }
          for (let z = -100; z <= 100; z += 50) KRYOS.add(THREE, g, new THREE.CylinderGeometry(2.6, 2.6, 0.8, 12).rotateZ(Math.PI / 2), KRYOS.kit(THREE).std(0x2a2a2a, 0.9, 0), -9.6, top - 2, z);
        },
      },
      KPIER: {
        name: 'PIER', code: 'SF', col: '#6c757d', h: 6, count: 3, at: k => [X - 10 - LEN / 2, KRYOS.PIERS[k]],
        needs: (api, k, cnt) => cnt('KQUAY') >= 6 ? null : 'NEEDS THE QUAY WALL', eye: (k, V) => V(-160, 120, 260),
        make(g, k, M, THREE, api, sl) {
          const S = KRYOS.style(THREE), top = (api.DECK_TOP - 0.4) - sl.y;
          KRYOS.add(THREE, g, new THREE.BoxGeometry(LEN, 3, 22), S.concrete, 0, top - 1.5, 0);
          KRYOS.add(THREE, g, new THREE.BoxGeometry(LEN, 0.6, 23), S.trim, 0, top + 0.2, 0);
          for (let x = -LEN / 2 + 10; x < LEN / 2; x += 30) for (const s of [-1, 1]) KRYOS.add(THREE, g, new THREE.CylinderGeometry(1.2, 1.2, top - (KRYOS.FLOOR - sl.y), 8), S.concrete, x, (top + (KRYOS.FLOOR - sl.y)) / 2 - 1, s * 9);
          for (let x = -LEN / 2 + 20; x < LEN / 2; x += 40) for (const s of [-1, 1]) {
            KRYOS.add(THREE, g, new THREE.CylinderGeometry(0.25, 0.25, 6, 6), S.trim, x, top + 3.2, s * 10.5);
            KRYOS.add(THREE, g, new THREE.SphereGeometry(0.7, 8, 6), M.glowWarm, x, top + 6.4, s * 10.5);
          }
          KRYOS.add(THREE, g, new THREE.BoxGeometry(14, 6, 14), S.white(1, 1), -LEN / 2 + 10, top + 3.2, 0);
        },
      },
    },
    trips: [{ name: 'QUAY WALL', parts: ['KQUAY'] }, { name: 'THE PIERS', parts: ['KPIER'] }],
  }));
})();
