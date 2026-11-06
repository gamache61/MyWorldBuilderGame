/* ============================================================
   THE COUNCIL HALL · BUILD 5 · HALL FLOOR & COLUMNS
   Keep this file in projects/councilhall next to councilhall.html.
   The round stone floor of the hall, then sixty white columns in
   six sections with the stone ring that runs along their tops.
   Build 5 ends when you raise the last column (press L).
   ============================================================ */
(function () {
  const K = KRYOS, H = K.HALL, TAU = Math.PI * 2, R = H.R;
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(K.cityBuild({
    id: 5, name: 'HALL FLOOR & COLUMNS',
    brief: 'The round floor of the Council Hall with its six entrance steps, then sixty white columns in six sections and the stone ring that rests on top of them.',
    finishLabel: 'RAISE THE LAST COLUMN', flags: ['ccols'], status: ['COLUMNS', 'STANDING'],
    finishCam: [[K.HX, K.HZ], 520], lookUp: 30,
    parts: {
      CBASE: { name: 'HALL FLOOR', code: 'SF', col: '#6c757d', h: 8, count: 1, at: () => [K.HX, K.HZ], eye: (k, V) => V(260, 170, 300),
        make(g, k, M, THREE) {
          const S = K.hallMats(THREE);
          K.add(THREE, g, new THREE.CylinderGeometry(R + 12, R + 16, 6, 96), S.white, 0, 3, 0);
          for (let i = 0; i < 6; i++) { const a = K.pathA(i), st = K.add(THREE, g, new THREE.BoxGeometry(40, 6, 30), S.white, Math.cos(a) * (R + 22), 1, Math.sin(a) * (R + 22)); st.rotation.y = -a; }
          K.add(THREE, g, new THREE.CylinderGeometry(R - 2, R - 2, 1, 96), S.stone, 0, 6.5, 0);
        } },
      CCOLS: { name: 'COLUMN SECTION', code: 'SF', col: '#e8e1d1', h: H.H + 12, count: 6, at: () => [K.HX, K.HZ], eye: (k, V) => V(Math.cos(k / 6 * TAU + 0.5) * 320, 120, Math.sin(k / 6 * TAU + 0.5) * 320),
        make(g, k, M, THREE) {
          const S = K.hallMats(THREE), a0 = k / 6 * TAU, top = 6 + H.H;
          for (let i = 0; i < 10; i++) { const a = a0 + (i + 0.5) / 60 * TAU; K.add(THREE, g, new THREE.CylinderGeometry(2.6, 3, H.H, 16), S.white, Math.cos(a) * R, 6 + H.H / 2, Math.sin(a) * R); }
          const t = K.add(THREE, g, new THREE.TorusGeometry(R, 5, 12, 24, TAU / 6).rotateX(Math.PI / 2), S.white, 0, top + 2, 0); t.rotation.y = -a0;
          K.add(THREE, g, new THREE.CylinderGeometry(R + 6, R + 6, 8, 24, 1, true, Math.PI / 2 - a0 - TAU / 6, TAU / 6), S.white, 0, top + 4, 0);
          const gr = K.add(THREE, g, new THREE.TorusGeometry(R + 6, 1.4, 8, 24, TAU / 6).rotateX(Math.PI / 2), S.gold, 0, top + 8, 0); gr.rotation.y = -a0;
        } },
    },
    trips: [{ name: 'HALL FLOOR', parts: ['CBASE'] }, { name: 'COLUMNS', parts: ['CCOLS'] }],
  }));
})();
