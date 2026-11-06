/* ============================================================
   KRYOS CITY · BUILD 11 · OBSERVATION SPIRE & SKY GARDENS
   Keep this file in projects/kryoscity next to kryoscity.html.
   Trip 1 — the spire's base and 3 legs at the east end of the
            boulevard, and 2 sky gardens raised over the boulevard.
   Trip 2 — the spire mast with its two glass observation spheres.
   Build 11 ends when you light the spire (press L).
   ============================================================ */
(function () {
  const [SX, SZ] = KRYOS.SPIRE, DY = 46;
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(KRYOS.cityBuild({
    id: 11,
    name: 'OBSERVATION SPIRE & SKY GARDENS',
    brief: 'A 700 m observation spire at the end of the boulevard, and two garden platforms raised high over the walkways.',
    finishLabel: 'LIGHT THE SPIRE', flags: ['kspire'], status: ['OBSERVATION SPIRE', 'LIT'],
    finishCam: [[700, 0], 1500], lookUp: 260,
    parts: {
      KSBASE: {
        name: 'SPIRE BASE', code: 'SF', col: '#6c757d', h: 300, count: 1, at: () => [SX, SZ],
        eye: (k, V) => V(-500, 250, 420),
        make(g, k, M, THREE) {
          const S = KRYOS.style(THREE), add = (geo, m, x, y, z) => KRYOS.add(THREE, g, geo, m, x, y, z);
          add(new THREE.CylinderGeometry(30, 40, 30, 24), S.trim, 0, 15, 0);
          add(new THREE.CylinderGeometry(60, 64, 1.2, 48), S.pave(6, 6), 0, 0.6, 0);
          for (let i = 0; i < 3; i++) { const a = i / 3 * Math.PI * 2, leg = add(new THREE.CylinderGeometry(3.5, 5, 300, 10), S.pearl, Math.cos(a) * 16, 160, Math.sin(a) * 16); leg.rotation.set(Math.sin(a) * 0.05, 0, -Math.cos(a) * 0.05); }
          for (let y = 60; y < 300; y += 36) add(new THREE.TorusGeometry(15, 1, 6, 24).rotateX(Math.PI / 2), S.trim, 0, y, 0);
        },
      },
      KDISC: {
        name: 'SKY GARDEN', code: 'GD', col: '#3a7d44', h: DY, count: 2, at: k => KRYOS.DISCS[k],
        eye: (k, V) => V(150, 110, 220),
        make(g, k, M, THREE) {
          const S = KRYOS.style(THREE), add = (geo, m, x, y, z) => KRYOS.add(THREE, g, geo, m, x, y, z);
          for (const s of [-1, 1]) add(new THREE.CylinderGeometry(4, 6, DY, 12), S.trim, 0, DY / 2, s * 46);
          add(new THREE.CylinderGeometry(78, 66, 6, 48), S.trim, 0, DY, 0);
          add(new THREE.CylinderGeometry(74, 74, 1, 48), S.grass, 0, DY + 3.2, 0);
          const d = add(new THREE.SphereGeometry(28, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2), S.clear, 0, DY + 3.5, 0); d.castShadow = false;
          const r = KRYOS.rng(77 + k), pts = []; for (let i = 0; i < 26; i++) { const a = i / 26 * Math.PI * 2, rr = 50 + r() * 18; pts.push([Math.cos(a) * rr, Math.sin(a) * rr, DY + 3.5]); }
          KRYOS.trees(THREE, g, pts, 88 + k, 0.8);
          const ppl = []; for (let i = 0; i < 40; i++) { const a = r() * 6.28, rr = 32 + r() * 14; ppl.push([Math.cos(a) * rr, Math.sin(a) * rr, DY + 3.7]); }
          KRYOS.people(THREE, g, ppl, 99 + k);
        },
      },
      KSMAST: {
        name: 'SPIRE MAST', code: 'SY', col: '#e8e1d1', h: 700, count: 1, at: () => [SX + 0.5, SZ],
        needs: (api, k, cnt) => cnt('KSBASE') ? null : 'NEEDS THE SPIRE BASE', eye: (k, V) => V(-700, 380, 700),
        make(g, k, M, THREE, api, sl, B) {
          const S = KRYOS.style(THREE), add = (geo, m, x, y, z) => KRYOS.add(THREE, g, geo, m, x, y, z);
          add(new THREE.CylinderGeometry(9, 11, 560, 16), S.pearl, 0, 300, 0);
          add(new THREE.SphereGeometry(30, 32, 20), S.glass(0, 2, 1), 0, 320, 0);
          add(new THREE.TorusGeometry(31, 4, 12, 48).rotateX(Math.PI / 2), S.rose, 0, 320, 0);
          add(new THREE.CylinderGeometry(22, 26, 10, 32), S.trim, 0, 296, 0);
          add(new THREE.SphereGeometry(13, 24, 16), S.glass(2, 1, 1), 0, 470, 0);
          add(new THREE.TorusGeometry(14, 2.2, 8, 32).rotateX(Math.PI / 2), S.rose, 0, 470, 0);
          add(new THREE.CylinderGeometry(1, 3, 120, 8), S.pearl, 0, 640, 0);
          const tip = new THREE.Mesh(new THREE.SphereGeometry(3, 12, 8), B._mats.tip || (B._mats.tip = new THREE.MeshBasicMaterial({ color: new THREE.Color(0.5, 0.2, 0.2) }))); tip.position.y = 702; g.add(tip);
          const band = new THREE.Mesh(new THREE.TorusGeometry(31.5, 0.6, 6, 64).rotateX(Math.PI / 2), B._mats.band || (B._mats.band = new THREE.MeshBasicMaterial({ color: new THREE.Color(0.4, 0.45, 0.5) }))); band.position.y = 326; g.add(band);
        },
      },
    },
    trips: [{ name: 'BASE & SKY GARDENS', parts: ['KSBASE', 'KDISC'] }, { name: 'THE SPIRE MAST', parts: ['KSMAST'] }],
    tick(api, dt, t, lv) {
      const S = this._mats, p = 0.5 + 0.5 * Math.sin(t * 2.5);
      if (S.tip) S.tip.color.setRGB(0.5 + 2.5 * lv * p, 0.2 + 0.3 * lv * p, 0.2 + 0.2 * lv * p);
      if (S.band) S.band.color.setRGB(0.4 + 0.6 * lv, 0.45 + 1.2 * lv, 0.5 + 1.9 * lv);
    },
  }));
})();
