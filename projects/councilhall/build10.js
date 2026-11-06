/* ============================================================
   THE COUNCIL HALL · BUILD 10 · POWER TO ALL OF UNITY
   Keep this file in projects/councilhall next to councilhall.html.
   Six lines of light set into the paths carry the Heart's power
   out to every part of Unity, each ending in a power stone.
   Build 10 ends when you send the power out (press L).
   ============================================================ */
(function () {
  const K = KRYOS, H = K.HALL, r0 = H.R + 30, r1 = H.PATH1, mid = (r0 + r1) / 2;
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(K.cityBuild({
    id: 10, name: 'POWER TO ALL OF UNITY',
    brief: 'Six lines of light set into the plaza and the paths carry the power of the Heart out to every part of Unity, each one ending in a glowing power stone.',
    finishLabel: 'SEND THE POWER OUT', flags: ['upower'], status: ['UNITY POWER', 'FLOWING'],
    finishCam: [[K.HX, K.HZ], 1100], lookUp: 20,
    parts: {
      CLINE: { name: 'POWER LINE', code: 'SY', col: '#e8e1d1', h: 4, count: 6, at: k => K.hallAt(K.pathA(k), mid), eye: (k, V) => V(200, 120, 240),
        needs: (api) => api.flag('heart') ? null : 'IGNITE THE HEART FIRST',
        make(g, k, M, THREE, api, sl, B) {
          const r = new THREE.Group(); r.rotation.y = -K.pathA(k); g.add(r);
          const m = B._mats.line || (B._mats.line = new THREE.MeshBasicMaterial({ color: new THREE.Color(0.3, 0.28, 0.2) }));
          K.add(THREE, r, new THREE.BoxGeometry(r1 - r0, 0.5, 1.6), m, 0, 2.6, 0);
        } },
      CSTONE: { name: 'POWER STONE', code: 'HC', col: '#d9731b', h: 16, count: 6, at: k => K.hallAt(K.pathA(k), r1 + 14), eye: (k, V) => V(60, 40, 70),
        make(g, k, M, THREE, api, sl, B) {
          const S = K.hallMats(THREE);
          K.add(THREE, g, new THREE.CylinderGeometry(7, 9, 3, 6), S.white, 0, 1.5, 0);
          K.add(THREE, g, new THREE.OctahedronGeometry(5, 0), B._mats.stone || (B._mats.stone = new THREE.MeshBasicMaterial({ color: new THREE.Color(0.35, 0.3, 0.2) })), 0, 10, 0).scale.y = 1.6;
        } },
    },
    trips: [{ name: 'LINES & STONES', parts: ['CLINE', 'CSTONE'] }],
    tick(api, dt, t, lv) {
      const p = 0.75 + 0.25 * Math.sin(t * 2);
      if (this._mats.line) this._mats.line.color.setRGB(0.3 + 0.9 * lv * p, 0.28 + 0.72 * lv * p, 0.2 + 0.3 * lv * p);
      if (this._mats.stone) this._mats.stone.color.setRGB(0.35 + 1.6 * lv * p, 0.3 + 1.2 * lv * p, 0.2 + 0.5 * lv * p);
    },
  }));
})();
