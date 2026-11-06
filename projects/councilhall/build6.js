/* ============================================================
   THE COUNCIL HALL · BUILD 6 · THE SEATS OF EVERY VOICE
   Keep this file in projects/councilhall next to councilhall.html.
   Five rings of seats stepping down to the speaking floor, each
   chair with its own small desk, all facing the Heart.
   Build 6 ends when you set out the seats (press L).
   ============================================================ */
(function () {
  const K = KRYOS, PS = K.PS;
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(K.cityBuild({
    id: 6, name: 'THE SEATS OF EVERY VOICE',
    brief: 'Five rings of seats stepping down to the speaking floor in the middle — a seat for every voice on Unity, each with a small desk, all facing the Heart.',
    finishLabel: 'SET OUT THE SEATS', flags: ['cseats'], status: ['SEATS', 'READY'],
    finishCam: [[K.HX, K.HZ], 260], lookUp: 10,
    parts: {
      CTIER: { name: 'SEAT RING', code: 'FB', col: '#9a2a22', h: 30, count: K.TIERS, at: () => [K.HX, K.HZ], eye: (k, V) => V(0, 60, 150),
        make(g, t, M, THREE) {
          const S = K.hallMats(THREE), { rIn, top } = K.tier(t);
          K.add(THREE, g, new THREE.RingGeometry(rIn, rIn + 18, 96).rotateX(-Math.PI / 2), S.white, 0, top, 0);
          K.add(THREE, g, new THREE.CylinderGeometry(rIn, rIn, top - 7, 96, 1, true), S.white, 0, (top + 7) / 2, 0);
          const ch = K.hallChairs().filter(c => c.t === t), m = new THREE.Matrix4(), q = new THREE.Quaternion(), v = new THREE.Vector3(), one = new THREE.Vector3(1, 1, 1), off = new THREE.Vector3();
          for (const [w, h, d, x, y, z] of K.CHAIR_BOXES) {
            const im = new THREE.InstancedMesh(new THREE.BoxGeometry(w * PS, h * PS, d * PS), S.seat, ch.length); im.castShadow = true; im.receiveShadow = true;
            ch.forEach((c, i) => { q.setFromAxisAngle(new THREE.Vector3(0, 1, 0), c.face); off.set(x * PS, y * PS, z * PS).applyQuaternion(q); m.compose(v.set(c.x, c.y, c.z).add(off), q, one); im.setMatrixAt(i, m); });
            g.add(im);
          }
        } },
    },
    trips: [{ name: 'SEAT RINGS', parts: ['CTIER'] }],
  }));
})();
