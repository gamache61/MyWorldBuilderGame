/* ============================================================
   AEGIS ARK · BUILD 12 · LIGHTS & MARKINGS
   Keep this file in projects/ark next to arkyard.html.
   The blue running lights, the ship's name, the nav beacons
   and the hatches on the aft deck.
   ============================================================ */
(function () {
  const S = window.SHIPYARD;
  const ids = [
    S.part('RUNLIGHTS', { name: 'RUNNING LIGHTS', at: [0, 2, 0], make(g, M, THREE) {
      for (const s of [-1, 1]) { const pts = []; for (let z = S.AFT; z <= S.NOSE - 4; z += 3) pts.push(S.sp(THREE, [s * 42, 2], z).add(new THREE.Vector3(s * 0.25, 0, 0))); S.mesh(THREE, new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 260, 0.35, 6), M.strip, g); }
    } }),
    S.part('NAME', { name: 'NAME PLATES', at: [0, -3, 20], make(g, M, THREE) {
      const c = document.createElement('canvas'); c.width = 1024; c.height = 128; const x = c.getContext('2d');
      x.fillStyle = 'rgba(225,230,236,.9)'; x.font = 'bold 80px Arial'; x.textBaseline = 'middle'; x.fillText('AEGIS ARK', 24, 64);
      x.fillStyle = '#a3261d'; x.fillRect(500, 28, 10, 72); x.fillStyle = 'rgba(225,230,236,.9)'; x.font = 'bold 64px Arial'; x.fillText('AXA-402', 540, 64);
      const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace;
      const mat = new THREE.MeshStandardMaterial({ map: t, transparent: true, roughness: .6, polygonOffset: true, polygonOffsetFactor: -2 });
      for (const s of [-1, 1]) { const mid = new THREE.Vector3(s * 39, -3, 20), n = new THREE.Vector3(s * 10, -6, 0).normalize(); const d = S.mesh(THREE, new THREE.PlaneGeometry(40, 5), mat, g); d.position.copy(mid).addScaledVector(n, 0.05); d.lookAt(mid.clone().add(n)); }
    } }),
    S.part('BEACONS', { name: 'NAV BEACONS', at: [0, 0, 201], make(g, M, THREE) {
      S.mesh(THREE, new THREE.SphereGeometry(0.6, 10, 8), M.navW, g, 0, -0.5, 201.5);
      S.mesh(THREE, new THREE.SphereGeometry(0.6, 10, 8), M.navR, g, 0, S.sp(THREE, [0, 16], -150).y + 0.5, -150);
      S.mesh(THREE, new THREE.SphereGeometry(0.6, 10, 8), M.navR, g, 0, -14.8, 0);
    } }),
    S.part('HATCHES', { name: 'DECK HATCHES', at: [0, 15, -117], make(g, M, THREE) {
      for (const s of [-1, 1]) for (let r = 0; r < 6; r++) for (let c = 0; c < 2; c++) {
        const z = -100 - r * 7, f = 0.3 + c * 0.3, A = [s * 28 * (f - 0.12), 16 - 4 * (f - 0.12)], B = [s * 28 * (f + 0.12), 16 - 4 * (f + 0.12)];
        S.slab(THREE, g, s > 0 ? A : B, s > 0 ? B : A, z - 2.6, z + 2.6, 0.35, r % 2 ? M.dark : M.gun, 0);
      }
    } }),
  ];
  S.build({ id: 12, name: 'LIGHTS & MARKINGS', brief: 'The blue running lights down both sides, the AEGIS ARK name plates, the nav beacons, and the hatches on the aft deck.',
    trips: [{ name: 'LIGHTS & MARKINGS', parts: ids }],
    finishLabel: 'PAINT THE NAME', finish: 'weld', flags: ['markings'], status: ['MARKINGS', 'DONE'] });
})();
