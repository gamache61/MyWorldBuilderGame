/* ============================================================
   THE RETURN FLEET · BUILD 5 · THE NEW ARK
   Keep this file in projects/returnfleet next to returnfleet.html.
   The first ship of the Return Fleet, built on the cradles in
   the shipyard: eight hull sections from stern to bow, and five
   engines — a sister ship to the Aegis Ark, AXA-403 Homeward.
   ============================================================ */
(function () {
  const FL = window.FLEET, NS = 8, SEG = 50, Z0 = -200, BASE = 13;
  // the hull's size along its length: full width amidships, narrowing to the bow
  const W = z => { const t = (z - Z0) / (NS * SEG); return 150 * (t < 0.6 ? 1 - 0.12 * Math.pow(1 - t / 0.6, 2) : 1 - 0.62 * Math.pow((t - 0.6) / 0.4, 1.3)); };
  const H = z => { const t = (z - Z0) / (NS * SEG); return 34 * (t < 0.7 ? 1 : 1 - 0.55 * (t - 0.7) / 0.3); };
  const section = (T, w, h) => { const s = new T.Shape(); s.moveTo(-w / 2, 0); s.lineTo(-w * 0.42, h * 0.55); s.lineTo(-w * 0.16, h); s.lineTo(w * 0.16, h); s.lineTo(w * 0.42, h * 0.55); s.lineTo(w / 2, 0); s.lineTo(w * 0.3, -h * 0.3); s.lineTo(-w * 0.3, -h * 0.3); s.closePath(); return s; };
  FL.ARK = { NS, SEG, Z0, BASE, W, H };
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(FL.build({
    id: 5, name: 'THE NEW ARK',
    brief: 'The first ship of the Return Fleet, built on the shipyard cradles: eight hull sections from stern to bow and five engines — AXA-403 Homeward, sister of the Aegis Ark.',
    types: {
      ARKHULL:   { code: 'HP', name: 'ARK HULL SECTION', col: '#9a2a22', w: 150, d: 50, h: 40, fx: 6 },
      ARKENGINE: { code: 'HC', name: 'ARK ENGINE', col: '#d9731b', w: 20, d: 34, h: 20, fx: 4 },
    },
    order: ['ARKHULL', 'ARKENGINE'],
    at: { ARKHULL: Array.from({ length: NS }, (_, i) => [380, Z0 + SEG * (i + 0.5)]), ARKENGINE: [[380, -218], [338, -216], [422, -216], [305, -212], [455, -212]] },
    eye: [-300, 170, 320],
    stats(api, c) { return [['HULL SECTIONS', c('ARKHULL') + ' / ' + NS], ['ENGINES', c('ARKENGINE') + ' / 5'], ['THE NEW ARK', c('ARKHULL') === NS && c('ARKENGINE') === 5 ? 'AXA-403 HOMEWARD · READY' : 'BUILDING']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE;
      if (type === 'ARKHULL') {
        const z0 = Z0 + SEG * k, z1 = z0 + SEG, wa = W(z0), wb = W(z1), ha = H(z0), hb = H(z1);
        // one length of hull, tapering from its stern end to its bow end
        const geo = new T.ExtrudeGeometry(section(T, wa, ha), { depth: SEG - 0.6, bevelEnabled: false });
        const p = geo.attributes.position;
        for (let i = 0; i < p.count; i++) { const f = p.getZ(i) / (SEG - 0.6), sx = 1 + (wb / wa - 1) * f, sy = 1 + (hb / ha - 1) * f; p.setX(i, p.getX(i) * sx); p.setY(i, p.getY(i) * sy); }
        geo.computeVertexNormals(); geo.translate(0, BASE + 10, -SEG / 2 + 0.3);
        add(geo, F.hull, 0, 0, 0);
        const wm = (wa + wb) / 2, hm = (ha + hb) / 2;
        for (const s of [-1, 1]) { add(new T.BoxGeometry(1, 1.2, SEG - 2), F.glow, s * wm * 0.43, BASE + 10 + hm * 0.55, 0, false); add(new T.BoxGeometry(wm * 0.2, 1.2, SEG - 4), F.armor, s * wm * 0.3, BASE + 10 + hm * 1.0, 0); }
        if (k === 3) { const plate = api.canvasTex(1024, 128, (c, w, h) => { c.fillStyle = '#1a1e24'; c.fillRect(0, 0, w, h); c.fillStyle = '#e8e8e8'; c.font = 'bold 76px Arial'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('AXA-403 · HOMEWARD', w / 2, h / 2 + 3); });
          for (const s of [-1, 1]) { const m = new T.Mesh(new T.PlaneGeometry(44, 5.5), new T.MeshBasicMaterial({ map: plate })); m.position.set(s * (wm * 0.47 + 0.3), BASE + 10 + hm * 0.25, 0); m.rotation.y = s * Math.PI / 2; m.rotation.x = 0; g.add(m); } }
        if (k === 6) add(new T.BoxGeometry(30, 6, 20), F.glass, 0, BASE + 10 + hm + 2, 0, false);
        if (k === 1 || k === 5) window.FLEET.person(g, { kind: 'worker', seed: 9970 + k, female: k === 5 }, 'kneelWork', 20, BASE + 10 + hm, 6, 0);
      } else if (type === 'ARKENGINE') {
        const r = k ? 8 : 11;
        add(new T.CylinderGeometry(r, r * 1.1, 32, 20).rotateX(Math.PI / 2), F.armor, 0, BASE + 10 + 14, 0);
        add(new T.TorusGeometry(r * 1.1, 1, 8, 24), F.gold, 0, BASE + 10 + 14, -16);
        add(new T.CircleGeometry(r * 0.9, 24).rotateY(Math.PI), F.engine, 0, BASE + 10 + 14, -16.2, false);
      }
    },
  }));
})();
