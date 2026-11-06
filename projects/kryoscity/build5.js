/* ============================================================
   KRYOS CITY · BUILD 5 · POD GUIDEWAYS
   Keep this file in projects/kryoscity next to kryoscity.html.
   Sleek pod trains glide on raised guideways along both sides of
   the boulevard.
   Trip 1 — 8 guideway sections (both sides of the boulevard).
   Trip 2 — 2 stations by the landing field and 4 pod trains.
   Build 5 ends when you start the pods (press L).
   ============================================================ */
(function () {
  const Y = 20, ZT = 72, L = 260, TRAINS = [[0, 1], [0, -1], [1, 1], [1, -1]];   // [east/west, side]
  const LEN = 4 * L;
  // where train i is along its line at time t (x), running back and forth between the station and the far end
  const pos = (i, t) => { const [w, s] = TRAINS[i], u = ((t * 22 / LEN) + i * 0.37) % 2, f = u < 1 ? u : 2 - u; return w ? -150 - f * 880 : 390 + f * 880; };
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(KRYOS.cityBuild({
    id: 5,
    name: 'POD GUIDEWAYS',
    brief: 'Raised guideways along both sides of the boulevard, where sleek pod trains carry people across Kryos.',
    finishLabel: 'START THE POD TRAINS', flags: ['kpods'], status: ['POD TRAINS', 'RUNNING'],
    finishCam: [[700, 0], 700], lookUp: 20,
    parts: {
      KTRACK: {
        name: 'GUIDEWAY SECTION', code: 'SF', col: '#6c757d', h: Y, count: 8, at: k => [KRYOS.SEG(k).xm, 0.3],
        eye: (k, V) => V(60, 90, 230),
        make(g, k, M, THREE) {
          const S = KRYOS.style(THREE), add = (geo, m, x, y, z) => KRYOS.add(THREE, g, geo, m, x, y, z);
          for (const s of [-1, 1]) {
            add(new THREE.BoxGeometry(L, 2.4, 9), S.concrete, 0, Y, s * ZT);
            add(new THREE.BoxGeometry(L, 0.6, 10), S.trim, 0, Y + 1.4, s * ZT);
            for (let x = -L / 2 + 30; x < L / 2; x += 60) { add(new THREE.CylinderGeometry(2.2, 2.8, Y, 10), S.concrete, x, Y / 2, s * ZT); add(new THREE.BoxGeometry(4, 2, 12), S.concrete, x, Y - 1.5, s * ZT); }
          }
        },
      },
      KSTATION: {
        name: 'POD STATION', code: 'SY', col: '#e8e1d1', h: 30, count: 2, at: k => [k ? -150 : 390, 0.2],
        make(g, k, M, THREE) {
          const S = KRYOS.style(THREE), add = (geo, m, x, y, z) => KRYOS.add(THREE, g, geo, m, x, y, z);
          for (const s of [-1, 1]) {
            add(new THREE.BoxGeometry(90, 2, 14), S.trim, 0, Y + 1, s * (ZT + 11));
            add(new THREE.CylinderGeometry(9, 9, 92, 24, 1, true, 0, Math.PI).rotateZ(Math.PI / 2), S.clear, 0, Y + 2, s * ZT).scale.set(1, 1, 1.4);
            for (const x of [-36, 0, 36]) add(new THREE.CylinderGeometry(1.4, 1.4, Y, 8), S.trim, x, Y / 2, s * (ZT + 16));
            add(new THREE.BoxGeometry(10, Y, 10), S.glass(1, 1, 1), 40, Y / 2, s * (ZT + 18));
          }
        },
      },
      KTRAIN: {
        name: 'POD TRAIN', code: 'DF', col: '#2f6690', h: 6, count: 4, at: k => [TRAINS[k][0] ? -150.5 + k : 390.5 + k, TRAINS[k][1] * ZT],
        y: () => Y + 4.6, needs: (api, k, cnt) => cnt('KSTATION') >= 2 ? null : 'NEEDS BOTH STATIONS',
        make(g, k, M, THREE, api, sl, B) {
          const S = KRYOS.style(THREE), train = new THREE.Group();
          for (let c = 0; c < 3; c++) {
            KRYOS.add(THREE, train, new THREE.CapsuleGeometry(2.6, 15, 6, 16).rotateZ(Math.PI / 2), S.trim, (c - 1) * 22, 0, 0);
            const w = KRYOS.add(THREE, train, new THREE.CapsuleGeometry(2.62, 12, 4, 16).rotateZ(Math.PI / 2), S.dark, (c - 1) * 22, 0.9, 0); w.scale.set(1, 0.32, 1.01);
          }
          train.userData = { i: k, home: sl.x }; g.add(train); g.userData.train = train;
        },
      },
    },
    trips: [{ name: 'GUIDEWAYS', parts: ['KTRACK'] }, { name: 'STATIONS & TRAINS', parts: ['KSTATION', 'KTRAIN'] }],
    tick(api, dt, t, lv) {
      const run = api.flag('kpods');
      for (const p of api.placed) {
        if (p.b !== 5 || !p.piece || !p.piece.userData.train) continue;
        const tr = p.piece.userData.train, i = tr.userData.i;
        tr.position.x = run ? pos(i, t) - tr.userData.home : 0;
      }
    },
  }));
})();
