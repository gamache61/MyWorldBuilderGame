/* ============================================================
   THE COUNCIL HALL · BUILD 4 · POOLS, BANNERS & GROVES
   Keep this file in projects/councilhall next to councilhall.html.
   Six reflecting pools between the paths, a banner for each part
   of Unity where its path meets the plaza, and groves of trees.
   Build 4 ends when you fill the pools (press L).
   ============================================================ */
(function () {
  const K = KRYOS, TAU = Math.PI * 2;
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(K.cityBuild({
    id: 4, name: 'POOLS, BANNERS & GROVES',
    brief: 'Reflecting pools between the paths, a coloured banner for every part of Unity where its path meets the plaza, and groves of trees all round.',
    finishLabel: 'FILL THE POOLS', flags: ['cpools'], status: ['POOLS', 'FILLED'],
    finishCam: [[K.HX, K.HZ], 1200], lookUp: 20,
    parts: {
      CPOOL: { name: 'REFLECTING POOL', code: 'WR', col: '#2a9d8f', h: 6, count: 6, at: k => K.hallAt(K.pathA(k) + Math.PI / 6, 470), eye: (k, V) => V(160, 110, 190),
        make(g, k, M, THREE, api, sl, B) {
          const S = K.hallMats(THREE), r = new THREE.Group(); r.rotation.y = -(K.pathA(k) + Math.PI / 6); g.add(r);
          K.add(THREE, r, new THREE.BoxGeometry(150, 8, 46), S.white, 0, -2, 0);
          const w = K.add(THREE, r, new THREE.BoxGeometry(142, 1, 38), B._mats.water || (B._mats.water = new THREE.MeshStandardMaterial({ color: 0x8a7a60, roughness: 0.6, metalness: 0.1 })), 0, 2.2, 0);
        } },
      CBANNER: { name: 'BANNER', code: 'HP', col: '#b03a2e', h: 64, count: 6, at: k => K.hallAt(K.pathA(k), 360), eye: (k, V) => V(110, 70, 130),
        make(g, k, M, THREE) {
          const S = K.hallMats(THREE), r = new THREE.Group(); r.rotation.y = -K.pathA(k); g.add(r);
          const col = new THREE.MeshStandardMaterial({ color: K.REGIONS[k][1], roughness: 0.6, side: THREE.DoubleSide });
          for (const z of [-26, 26]) K.add(THREE, r, new THREE.BoxGeometry(4, 60, 4), S.white, 0, 30, z);
          K.add(THREE, r, new THREE.PlaneGeometry(46, 40), col, 0, 36, 0).rotation.y = Math.PI / 2;
          K.add(THREE, r, new THREE.BoxGeometry(6, 4, 60), S.gold, 0, 62, 0);
          const lbl = K.canvas(THREE, 512, 64, (c, w, h) => { c.fillStyle = 'rgba(0,0,0,0)'; c.fillRect(0, 0, w, h); c.fillStyle = '#ffffff'; c.font = 'bold 40px Arial'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(K.REGIONS[k][0], w / 2, h / 2); });
          for (const s of [1, -1]) { const t = K.add(THREE, r, new THREE.PlaneGeometry(42, 5.2), new THREE.MeshBasicMaterial({ map: lbl, transparent: true }), s * 0.2, 47, 0); t.rotation.y = s * Math.PI / 2; }
        } },
      CGROVE: { name: 'GROVE', code: 'GD', col: '#3a7d44', h: 20, count: 6, at: k => K.hallAt(K.pathA(k) + Math.PI / 6, K.HALL.PATH1), eye: (k, V) => V(260, 160, 300),
        make(g, k, M, THREE) {
          const r = K.rng(70 + k), pts = [], c = K.hallAt(K.pathA(k) + Math.PI / 6, K.HALL.PATH1), a0 = K.pathA(k) + 0.14, a1 = K.pathA(k) + Math.PI / 3 - 0.14;
          for (let i = 0; i < 40; i++) { const a = a0 + r() * (a1 - a0), rr = K.HALL.PATH1 - 90 + r() * 150; const x = K.HX + Math.cos(a) * rr - c[0], z = K.HZ + Math.sin(a) * rr - c[1]; pts.push([x, z]); }
          for (let i = 0; i < 7; i++) { const a = a0 + (i + 0.5) / 7 * (a1 - a0); pts.push([K.HX + Math.cos(a) * 300 - c[0], K.HZ + Math.sin(a) * 300 - c[1]]); }
          K.trees(THREE, g, pts, 90 + k, 1.4);
        } },
    },
    trips: [{ name: 'POOLS & BANNERS', parts: ['CPOOL', 'CBANNER'] }, { name: 'GROVES', parts: ['CGROVE'] }],
    tick(api, dt, t, lv) { const w = this._mats.water; if (w) { w.color.setRGB(0.54 - 0.17 * lv, 0.48 + 0.17 * lv, 0.38 + 0.4 * lv); w.roughness = 0.6 - 0.56 * lv; w.metalness = 0.1 + 0.5 * lv; } },
  }));
})();
