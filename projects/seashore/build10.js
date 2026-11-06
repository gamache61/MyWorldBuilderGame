/* ============================================================
   SEAPORT · BUILD 10 · SEA FARMS & WATER PLANT
   Keep this file in projects/seaport next to seaport.html.
   Trip 1 — 6 kelp and shellfish farms floating outside the
            breakwater.
   Trip 2 — the water plant on the shore that turns sea water into
            fresh water, and 3 water towers.
   Build 10 ends when you start the water plant (press L).
   ============================================================ */
(function () {
  const W = KRYOS.WATER;
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(KRYOS.cityBuild({
    id: 10,
    name: 'SEA FARMS & WATER PLANT',
    brief: 'Kelp and shellfish farms out in the sea feed the seaport, and a water plant makes fresh water from sea water.',
    finishLabel: 'START THE WATER PLANT', flags: ['sfarms'], status: ['SEA FARMS & WATER', 'FLOWING'],
    finishCam: [[-700, 300], 1700], lookUp: 0,
    parts: {
      KKELP: {
        name: 'SEA FARM', code: 'GD', col: '#3a7d44', h: 4, count: 6, at: k => [-1080 + (k % 2) * 140, -330 + Math.floor(k / 2) * 230],
        eye: (k, V) => V(120, 90, 180),
        make(g, k, M, THREE, api) {
          const S = KRYOS.style(THREE), yellow = KRYOS.kit(THREE).std(0xe0b030, 0.5, 0.2), rope = KRYOS.kit(THREE).std(0x4a3a2a, 1, 0);
          for (let r = 0; r < 6; r++) {
            KRYOS.add(THREE, g, new THREE.BoxGeometry(110, 0.3, 0.4), rope, 0, 0.3, -50 + r * 20);
            for (let c = 0; c < 9; c++) KRYOS.add(THREE, g, new THREE.SphereGeometry(1.3, 8, 6), c % 2 ? yellow : S.trim, -48 + c * 12, 0.5, -50 + r * 20);
          }
          const raft = KRYOS.add(THREE, g, new THREE.BoxGeometry(16, 2, 10), S.trim, 62, 0.6, 0);
          KRYOS.add(THREE, g, new THREE.BoxGeometry(8, 4, 6), S.white(1, 1), 62, 3.5, 0);
        },
      },
      KWPLANT: {
        name: 'WATER PLANT', code: 'WR', col: '#2a9d8f', h: 24, count: 1, at: () => W,
        make(g, k, M, THREE, api, sl, B) {
          const S = KRYOS.style(THREE), add = (geo, m, x, y, z) => KRYOS.add(THREE, g, geo, m, x, y, z);
          add(new THREE.BoxGeometry(110, 16, 56), S.white(3, 1), 0, 8, 0);
          add(new THREE.BoxGeometry(111, 1, 57), S.trim, 0, 16, 0);
          add(new THREE.BoxGeometry(100, 1, 48), S.grass, 0, 16.8, 0);
          for (let i = 0; i < 4; i++) add(new THREE.CylinderGeometry(8, 8, 14, 20), S.clear, -36 + i * 24, 7, 36);
          const band = new THREE.Mesh(new THREE.BoxGeometry(111, 1, 57), B._mats.wp || (B._mats.wp = new THREE.MeshBasicMaterial({ color: new THREE.Color(0.3, 0.4, 0.45) }))); band.position.y = 4; g.add(band);
          add(new THREE.BoxGeometry(160, 1.2, 3), KRYOS.kit(THREE).std(0x5fa6c8, 0.2, 0.4), -135, -1, 0);
        },
      },
      KWTOWER: {
        name: 'WATER TOWER', code: 'WR', col: '#2a9d8f', h: 60, count: 3, at: k => [W[0] + 90 + k * 50, W[1] - 40 + (k % 2) * 70],
        make(g, k, M, THREE) {
          const S = KRYOS.style(THREE);
          for (let i = 0; i < 4; i++) { const a = i / 4 * Math.PI * 2 + Math.PI / 4; KRYOS.add(THREE, g, new THREE.CylinderGeometry(1, 1.4, 42, 6), S.trim, Math.cos(a) * 8, 21, Math.sin(a) * 8); }
          KRYOS.add(THREE, g, new THREE.SphereGeometry(14, 24, 16), S.pearl, 0, 52, 0).scale.y = 0.85;
          KRYOS.add(THREE, g, new THREE.CylinderGeometry(14.2, 14.2, 3, 32, 1, true), KRYOS.style(THREE).glass(1, 4, 1), 0, 52, 0);
        },
      },
    },
    trips: [{ name: 'SEA FARMS', parts: ['KKELP'] }, { name: 'WATER PLANT', parts: ['KWPLANT', 'KWTOWER'] }],
    tick(api, dt, t, lv) { const S = this._mats; if (S.wp) S.wp.color.setRGB(0.3 + 0.3 * lv, 0.4 + 1.3 * lv, 0.45 + 1.8 * lv); },
  }));
})();
