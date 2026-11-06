/* ============================================================
   THE HOMEWARD FLEET · BUILD 4 · THE THREE HULLS
   Keep this file in projects/homewardfleet next to homewardfleet.html.
   Three new Arks take shape at once, one on each berth: eight hull
   sections apiece from stern to bow, every plate and beam made on
   Unity from moon ore. AXA-404 Kindred, AXA-405 Harmony and
   AXA-406 New Dawn — sisters of the Homeward.
   ============================================================ */
(function () {
  const FL = window.FLEET, NS = 8, SEG = 50, Z0 = -200, BASE = 13, XS = [380, 560, 740];
  const NAMES = ['AXA-404 · KINDRED', 'AXA-405 · HARMONY', 'AXA-406 · NEW DAWN'];
  const W = z => { const t = (z - Z0) / (NS * SEG); return 150 * (t < 0.6 ? 1 - 0.12 * Math.pow(1 - t / 0.6, 2) : 1 - 0.62 * Math.pow((t - 0.6) / 0.4, 1.3)); };
  const H = z => { const t = (z - Z0) / (NS * SEG); return 34 * (t < 0.7 ? 1 : 1 - 0.55 * (t - 0.7) / 0.3); };
  const section = (T, w, h) => { const s = new T.Shape(); s.moveTo(-w / 2, 0); s.lineTo(-w * 0.42, h * 0.55); s.lineTo(-w * 0.16, h); s.lineTo(w * 0.16, h); s.lineTo(w * 0.42, h * 0.55); s.lineTo(w / 2, 0); s.lineTo(w * 0.3, -h * 0.3); s.lineTo(-w * 0.3, -h * 0.3); s.closePath(); return s; };
  FL.ARK = { NS, SEG, Z0, BASE, XS, NAMES };
  const at = []; for (const x of XS) for (let i = 0; i < NS; i++) at.push([x, Z0 + SEG * (i + 0.5)]);
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(FL.build({
    id: 4, name: 'THE THREE HULLS',
    brief: 'Three new Arks take shape at once, eight hull sections apiece, every plate made on Unity: AXA-404 Kindred, AXA-405 Harmony and AXA-406 New Dawn.',
    types: { ARKHULL: { code: 'HP', name: 'ARK HULL SECTION', col: '#9a2a22', w: 150, d: 50, h: 40, fx: 6 } },
    order: ['ARKHULL'],
    at: { ARKHULL: at },
    eye: [-300, 220, 400],
    stats(api, c) { const n = c('ARKHULL'); return [['HULL SECTIONS', n + ' / ' + NS * 3]].concat(NAMES.map((nm, s) => [nm.replace(' · ', ' '), Math.max(0, Math.min(NS, n - s * NS)) + ' / ' + NS])); },
    make(type, k, g, add, F, api) {
      const T = api.THREE, ship = (k / NS) | 0, j = k % NS;
      const z0 = Z0 + SEG * j, z1 = z0 + SEG, wa = W(z0), wb = W(z1), ha = H(z0), hb = H(z1);
      const geo = new T.ExtrudeGeometry(section(T, wa, ha), { depth: SEG - 0.6, bevelEnabled: false });
      const p = geo.attributes.position;
      for (let i = 0; i < p.count; i++) { const f = p.getZ(i) / (SEG - 0.6), sx = 1 + (wb / wa - 1) * f, sy = 1 + (hb / ha - 1) * f; p.setX(i, p.getX(i) * sx); p.setY(i, p.getY(i) * sy); }
      geo.computeVertexNormals(); geo.translate(0, BASE + 10, -SEG / 2 + 0.3);
      add(geo, F.hull, 0, 0, 0);
      const wm = (wa + wb) / 2, hm = (ha + hb) / 2, stripe = [F.gold, F.glow, F.yellow][ship];
      for (const s of [-1, 1]) { add(new T.BoxGeometry(1, 1.2, SEG - 2), stripe, s * wm * 0.43, BASE + 10 + hm * 0.55, 0, false); add(new T.BoxGeometry(wm * 0.2, 1.2, SEG - 4), F.armor, s * wm * 0.3, BASE + 10 + hm * 1.0, 0); }
      if (j === 3) { const plate = api.canvasTex(1024, 128, (c, w, h) => { c.fillStyle = '#1a1e24'; c.fillRect(0, 0, w, h); c.fillStyle = '#e8e8e8'; c.font = 'bold 76px Arial'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(NAMES[ship], w / 2, h / 2 + 3); });
        for (const s of [-1, 1]) { const m = new T.Mesh(new T.PlaneGeometry(44, 5.5), new T.MeshBasicMaterial({ map: plate })); m.position.set(s * (wm * 0.47 + 0.3), BASE + 10 + hm * 0.25, 0); m.rotation.y = s * Math.PI / 2; g.add(m); } }
      if (j === 6) add(new T.BoxGeometry(30, 6, 20), F.glass, 0, BASE + 10 + hm + 2, 0, false);
      if (j === 2 || j === 5) FL.person(g, { kind: 'worker', seed: 12200 + k, female: j === 5 }, 'kneelWork', 20, BASE + 10 + hm, 6, 0);
    },
  }));
})();
