/* ============================================================
   THE CRYSTAL MINES · BUILD 2 · THE CRYSTAL MOUNTAINS & THE MINE ENTRANCES
   Keep this file in projects/crystalmines next to 50-crystalmines.html.
   Three rugged mountains rise on the plain east of Kryos, their
   cliffs glowing where fuel crystals grow in the rock. Three great
   stone portals open into the mountainsides, each with a rail
   running out and a cart of crystal waiting.
   ============================================================ */
(function () {
  const P = window.YARD;
  // a rough rocky peak: a cone with its vertices pushed about, so every mountain looks different
  P.peak = (api, r, h, seed) => {
    const T = api.THREE, geo = new T.ConeGeometry(r, h, 28, 14, true); const pos = geo.attributes.position; let q = seed;
    const rnd = () => (q = (q * 16807) % 2147483647) / 2147483647;
    for (let i = 0; i < pos.count; i++) { const y = pos.getY(i); if (y > h / 2 - 1) continue; const k = 1 - (y + h / 2) / h, n = (rnd() - 0.5) * r * 0.16 * (1 - k * 0.6); pos.setX(i, pos.getX(i) * (1 + n / r) + n * 0.4); pos.setZ(i, pos.getZ(i) * (1 + n / r) + n * 0.4); pos.setY(i, y + (rnd() - 0.5) * h * 0.04); }
    geo.computeVertexNormals(); return geo;
  };
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 2, name: 'THE CRYSTAL MOUNTAINS & THE MINE ENTRANCES',
    brief: 'Three rugged mountains east of Kryos with glowing crystal veins in the cliffs, and three great stone portals leading into them, each with a rail and a cart of crystal.',
    types: {
      PEAK: { code: 'SF', name: 'CRYSTAL MOUNTAIN', col: '#7a6a5a', w: 400, d: 400, h: 200 },
      PORTAL: { code: 'SY', name: 'MINE ENTRANCE', col: '#a0a096', w: 34, d: 70, h: 26 },
    },
    order: ['PEAK', 'PORTAL'],
    at: { PEAK: [[2330, -100], [2640, 120], [2100, 170]], PORTAL: [[2125, -130], [2470, 175], [1960, 175]] },
    eye: [1500, 220, 520],
    stats(api, c) { return [['MOUNTAINS', c('PEAK') + ' / 3'], ['MINE ENTRANCES', c('PORTAL') + ' / 3']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, S = P.hm(api), C = P.fun(api);
      const rock = P._rock = P._rock || new T.MeshStandardMaterial({ color: 0x77695b, roughness: 1, flatShading: true }), rock2 = P._rock2 = P._rock2 || new T.MeshStandardMaterial({ color: 0x5d5249, roughness: 1, flatShading: true });
      const cry = P._cry = P._cry || [0x7ffcff, 0x9f7bff, 0x6dffb0].map(c => new T.MeshStandardMaterial({ color: c, emissive: c, emissiveIntensity: 1.4, roughness: 0.25, transparent: true, opacity: 0.92 }));
      if (type === 'PEAK') {
        const R = [230, 200, 170][k], H = [270, 230, 180][k];
        const m = add(P.peak(api, R, H, 7 + k * 31), rock, 0, H / 2 - 2, 0);
        add(new T.ConeGeometry(R * 0.55, H * 0.55, 20, 6, true).translate(0, 0, 0), rock2, R * 0.12, H * 0.74, R * 0.06);
        // glowing crystal veins and clusters on the cliffs
        for (let i = 0; i < 26; i++) { const a = i * 2.39996 + k, t = 0.12 + ((i * 37) % 70) / 100, rr = R * (1 - t) * 1.0 * 0.92, hh = t * H - 2, s = 3 + (i % 5) * 2.2; const c = add(new T.OctahedronGeometry(s), cry[(i + k) % 3], Math.cos(a) * rr, hh + s * 0.6, Math.sin(a) * rr); c.scale.set(0.55, 1.9, 0.55); c.rotation.set((i % 3) * 0.3, a, (i % 2) * 0.25); c.castShadow = false; }
        // a pale cap of cold stone and a few boulders at the foot
        add(new T.ConeGeometry(R * 0.2, H * 0.22, 12, 1, true), F.white, 0, H * 0.9, 0);
        for (let i = 0; i < 9; i++) { const a = i * 0.7 + k, rr = R * (0.95 + (i % 3) * 0.12); add(new T.DodecahedronGeometry(6 + (i % 4) * 3, 0), rock2, Math.cos(a) * rr, 4, Math.sin(a) * rr); }
      } else {
        // a stone portal in the mountainside: two pillars, a lintel and a dark opening, with a timber frame, rails and a cart of crystals
        const cry2 = P._cry;
        add(new T.BoxGeometry(34, 2, 70), S.gravel, 0, 1, 0);
        add(new T.BoxGeometry(8, 24, 14), S.stone, -12, 13, 18); add(new T.BoxGeometry(8, 24, 14), S.stone, 12, 13, 18);
        add(new T.BoxGeometry(32, 6, 14), S.stone, 0, 24, 18); add(new T.BoxGeometry(34, 1.4, 16), S.slate, 0, 27.6, 18);
        add(new T.BoxGeometry(16, 20, 6), F.hole, 0, 11, 24);
        add(new T.BoxGeometry(2, 18, 2), S.timber, -7, 10, 14); add(new T.BoxGeometry(2, 18, 2), S.timber, 7, 10, 14); add(new T.BoxGeometry(16, 2, 2), S.timber, 0, 19, 14);
        for (const x of [-2.4, 2.4]) add(new T.BoxGeometry(0.5, 0.4, 70), F.steel, x, 2.3, 0);
        for (let z = -30; z <= 30; z += 4) add(new T.BoxGeometry(7, 0.4, 0.8), S.timber, 0, 2.1, z);
        const cart = add(new T.BoxGeometry(5, 3, 8), F.dark, 0, 4.6, -18); add(new T.BoxGeometry(5.2, 0.5, 8.2), C.yellow, 0, 6.3, -18);
        for (let i = 0; i < 5; i++) { const c = add(new T.OctahedronGeometry(1.2), cry2[i % 3], -1.5 + i * 0.8, 7.4, -18 + (i % 2) * 2 - 1); c.scale.set(0.6, 1.5, 0.6); c.castShadow = false; }
        add(new T.BoxGeometry(5, 0.3, 4), F.lamp, 0, 24.6, 26); add(new T.SphereGeometry(0.9, 8, 6), F.lamp, -12, 27, 26); add(new T.SphereGeometry(0.9, 8, 6), F.lamp, 12, 27, 26);
        P.sign(api, g, 'MINE ' + (k + 1), 14, 2.8, 0, 31, 30, 0, '#3a2a14', '#ffe9b0', true);
        P.person(g, P.civ(50000 + k), 'idle', -9, 2, -6, Math.PI / 2); P.person(g, P.civ(50010 + k), 'gesture', 9, 2, -26, -Math.PI / 2);
        P.person(g, P.civ(50020 + k), 'tablet', 14, 2, -2, Math.PI);
      }
    },
  }));
})();
