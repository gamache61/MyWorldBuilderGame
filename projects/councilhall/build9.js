/* ============================================================
   THE COUNCIL HALL · BUILD 9 · THE HEART OF UNITY
   Keep this file in projects/councilhall next to councilhall.html.
   The Heart of Unity — the golden rings and ball the Builder found
   in the gold mine on Earth, the Keeper's own copy — set above the
   speaking floor to power the whole world.
   Build 9 ends when you ignite the Heart (press L): it glows, its
   rings start turning and a column of light rises through the
   eye of the dome.
   ============================================================ */
(function () {
  const K = KRYOS, TAU = Math.PI * 2;
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(K.cityBuild({
    id: 9, name: 'THE HEART OF UNITY',
    brief: 'The golden rings and ball the Builder found in the mine on Earth, the Keeper\'s own copy, become the Heart of Unity: a burning heart inside three turning rings, set above the speaking floor. It powers the whole of Unity.',
    finishLabel: 'IGNITE THE HEART', flags: ['heart'], status: ['THE HEART', 'BURNING'],
    finishCam: [[K.HX, K.HZ], 170], lookUp: 50,
    parts: {
      CHEART: { name: 'HEART OF UNITY', code: 'HC', col: '#d9731b', h: 70, count: 1, at: () => [K.HX, K.HZ], eye: (k, V) => V(60, 80, 70),
        needs: (api) => api.flag('cdome') ? null : 'SEAL THE DOME FIRST',
        make(g, k, M, THREE, api, sl, B) {
          const hg = new THREE.Group(); hg.position.y = K.HEART_Y; g.add(hg);
          const core = B._mats.core = new THREE.MeshBasicMaterial({ color: new THREE.Color(0.35, 0.3, 0.25) });
          hg.add(new THREE.Mesh(new THREE.SphereGeometry(9, 48, 32), core));
          const glow = K.canvas(THREE, 256, 256, (c) => { const r = c.createRadialGradient(128, 128, 0, 128, 128, 128); r.addColorStop(0, 'rgba(255,250,235,1)'); r.addColorStop(0.25, 'rgba(255,205,120,.45)'); r.addColorStop(1, 'rgba(255,150,60,0)'); c.fillStyle = r; c.fillRect(0, 0, 256, 256); });
          const halo = B._halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: glow, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: 0 })); halo.scale.setScalar(55); hg.add(halo);
          B._rings = [];
          [[24, [1.7, 1.15, 0.4], true], [19, [0.35, 1.0, 1.8], false], [15, [1.7, 0.8, 0.25], true]].forEach(([r, c, up], i) => {
            const piv = new THREE.Group(); hg.add(piv); const ring = new THREE.Group(); piv.add(ring); if (!up) ring.rotation.x = Math.PI / 2;
            ring.add(new THREE.Mesh(new THREE.TorusGeometry(r, 0.45, 10, 120), new THREE.MeshBasicMaterial({ color: new THREE.Color(...c) })));
            ring.add(new THREE.Mesh(new THREE.TorusGeometry(r, 1.4, 8, 120), new THREE.MeshBasicMaterial({ color: new THREE.Color(...c).multiplyScalar(0.3), transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending, depthWrite: false })));
            B._rings.push({ piv, up, dir: i === 1 ? -1 : 1 });
          });
          const beam = B._beam = new THREE.Mesh(new THREE.CylinderGeometry(3, 6, 900, 24, 1, true), new THREE.MeshBasicMaterial({ color: new THREE.Color(1.6, 1.3, 0.8), transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide }));
          beam.position.y = K.HEART_Y + 450; g.add(beam);
          const light = B._light = new THREE.PointLight(0xffd9a0, 0, 220, 2); light.position.y = K.HEART_Y; g.add(light);
        } },
    },
    trips: [{ name: 'THE HEART', parts: ['CHEART'] }],
    tick(api, dt, t, lv) {
      if (!this._rings) return;
      const beat = 1 + 0.08 * Math.sin(t * 1.6) * lv;
      this._mats.core.color.setRGB((0.35 + 0.95 * lv) * beat, (0.3 + 0.7 * lv) * beat, (0.25 + 0.35 * lv) * beat);
      this._halo.material.opacity = 0.6 * lv; this._halo.scale.setScalar(55 * beat);
      this._beam.material.opacity = (0.16 + 0.05 * Math.sin(t * 1.6)) * lv; this._beam.visible = lv > 0.01;
      this._light.intensity = 260 * lv;
      for (const r of this._rings) { const sp = dt * (0.05 + 0.85 * lv) * r.dir; if (r.up) r.piv.rotation.y += sp; else r.piv.rotation.x += sp; }
    },
  }));
})();
