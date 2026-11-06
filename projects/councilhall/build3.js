/* ============================================================
   THE COUNCIL HALL · BUILD 3 · THE PLAZA & SIX PATHS
   Keep this file in projects/councilhall next to councilhall.html.
   The great stone plaza where the hall will stand, and six paths
   leading out from it — one toward every part of Unity.
   Build 3 ends when you lay the last stones (press L).
   ============================================================ */
(function () {
  const K = KRYOS, H = K.HALL, mid = (H.PATH0 + H.PATH1) / 2;
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(K.cityBuild({
    id: 3, name: 'THE PLAZA & SIX PATHS',
    brief: 'A stone plaza 660 m across for the Council Hall, and six paths leading out from it toward Kryos, Seashore, Havenreach, the farmlands, the forests and the new worlds.',
    finishLabel: 'LAY THE LAST STONES', flags: ['cplaza'], status: ['PLAZA', 'LAID'],
    finishCam: [[K.HX, K.HZ], 1300], lookUp: 20,
    parts: {
      CPLAZA: { name: 'PLAZA', code: 'SF', col: '#6c757d', h: 8, count: 1, at: () => [K.HX, K.HZ], eye: (k, V) => V(520, 380, 620),
        make(g, k, M, THREE) { const S = K.hallMats(THREE); K.add(THREE, g, new THREE.CylinderGeometry(H.PLAZA, H.PLAZA + 10, 10, 128), S.stone, 0, -3, 0); } },
      CPATH: { name: 'PATH', code: 'SF', col: '#6c757d', h: 6, count: 6, at: k => K.hallAt(K.pathA(k), mid), eye: (k, V) => V(220, 160, 260),
        make(g, k, M, THREE) { const S = K.hallMats(THREE); const r = new THREE.Group(); r.rotation.y = -K.pathA(k); g.add(r); K.add(THREE, r, new THREE.BoxGeometry(H.PATH1 - H.PATH0 + 20, 8, 34), S.path, 0, -2.5, 0); } },
    },
    trips: [{ name: 'PLAZA & PATHS', parts: ['CPLAZA', 'CPATH'] }],
  }));
})();
