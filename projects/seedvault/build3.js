/* ============================================================
   THE SEED VAULT · BUILD 3 · THE ENTRANCE PORTAL
   Keep this file in projects/seedvault next to 64-seedvault.html.
   A wedge of pale concrete pushed out of the hillside, a glowing light panel
   across its roof, rock walls on both sides, two sliding steel doors and two lanterns.
   ============================================================ */
(function () {
  const P = window.SDV;
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 3, name: 'THE ENTRANCE PORTAL',
    brief: 'The face of the vault: a wedge of pale concrete pushed out of the hillside with a glowing light panel on its roof, rock walls on both sides, two great steel doors and two lanterns.',
    types: {
      PORTAL:   { code: 'SF', name: 'ENTRANCE PORTAL', col: '#c6c8c3', w: 34, d: 28, h: 17 },
      ROCKWALL: { code: 'HP', name: 'ROCK WALL',       col: '#7d7a70', w: 58, d: 24, h: 22 },
      DOORS:    { code: 'SY', name: 'VAULT DOORS',     col: '#59646f', w: 16, d: 3,  h: 9 },
      LANTERN:  { code: 'HP', name: 'LANTERN',         col: '#bff8d0', w: 4,  d: 4,  h: 8 },
    },
    order: ['PORTAL', 'ROCKWALL', 'DOORS', 'LANTERN'],
    at: { PORTAL: [[1550, 0]], ROCKWALL: [[1550 - 46, -2], [1550 + 46, -2]], DOORS: [[1550, 14.6]], LANTERN: [[1550 - 24, 22], [1550 + 24, 22]] },
    eye: [1550 + 150, P.SY + 110, 190],
    stats(api, c) { return [['PORTAL', c('PORTAL') ? 'STANDING' : 'NOT YET'], ['ROCK WALLS', c('ROCKWALL') + ' / 2'], ['VAULT DOORS', c('DOORS') ? 'HUNG' : 'NOT YET'], ['LANTERNS', c('LANTERN') + ' / 2']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, H = P.sv(api);
      if (type === 'PORTAL') {
        // the wedge: low front (10 m) rising into the hill behind (17 m), as a side profile pushed out along x
        const sh = new T.Shape(); sh.moveTo(-14, 0); sh.lineTo(14, 0); sh.lineTo(14, 17); sh.lineTo(-14, 10); sh.closePath();
        const wg = new T.ExtrudeGeometry(sh, { depth: 34, bevelEnabled: false }); wg.translate(0, 0, -17); wg.rotateY(Math.PI / 2);
        add(wg, H.concrete, 0, 0, 0, true);
        // the dark doorway recess and a frame round it
        add(new T.BoxGeometry(14, 9, 1.4), H.dark, 0, 4.5, 13.6, false);
        for (const s of [-1, 1]) add(new T.BoxGeometry(1.2, 9.6, 1.8), H.concrete2, s * 7.6, 4.8, 14, true);
        add(new T.BoxGeometry(16.4, 1.2, 1.8), H.concrete2, 0, 9.4, 14, true);
        // the light panel: a long glowing strip across the sloped roof, with ribs
        const roof = new T.Group(); roof.rotation.x = -Math.atan2(7, 28); roof.position.set(0, 13.6, -0.5); g.add(roof);
        add(new T.BoxGeometry(26, 0.35, 24), H.glowC, 0, 0.2, 0, false, roof);
        for (let i = -6; i <= 6; i++) add(new T.BoxGeometry(0.25, 0.5, 24.4), H.steel, i * 2, 0.45, 0, false, roof);
        add(new T.BoxGeometry(27, 0.5, 0.5), H.steel, 0, 0.45, 12.2, false, roof); add(new T.BoxGeometry(27, 0.5, 0.5), H.steel, 0, 0.45, -12.2, false, roof);
        add(new T.BoxGeometry(24, 0.9, 0.5), H.glowG, 0, 10.9, 14.2, false);   // a green line of light over the door
      } else if (type === 'ROCKWALL') {
        const r = (n) => { const x = Math.sin((k * 17 + n) * 12.9898) * 43758.5453; return x - Math.floor(x); };
        const sgn = k ? 1 : -1;
        for (let i = 0; i < 14; i++) {
          const rr = 5 + r(i) * 5, x = (i / 13 - 0.5) * 52 + (r(i + 30) - 0.5) * 4, z = (r(i + 60) - 0.5) * 12 - 1, y = rr * 0.55 + r(i + 90) * 5 * (1 - Math.abs(x) / 30) + 2;
          const m = add(new T.IcosahedronGeometry(rr, 0), (i % 3) ? H.rock : H.rock2, x, y, z, true); m.scale.set(1.2, 0.9 + r(i) * 0.5, 1); m.rotation.set(r(i) * 3, r(i + 5) * 3, 0);
        }
        for (let i = 0; i < 7; i++) add(new T.IcosahedronGeometry(3 + r(i + 11) * 2, 0), H.moss, (i / 6 - 0.5) * 44, 16 + r(i) * 3 - Math.abs(i - 3) * 1.4, (r(i + 4) - 0.5) * 8, false).scale.set(1.3, 0.55, 1);
        add(new T.BoxGeometry(58, 1, 14), H.rock2, 0, 0.5, 0, false);
        // a young tree on top of each wall
        add(new T.CylinderGeometry(0.4, 0.55, 5, 5), H.timber2, sgn * 6, 20.5, 0, false); add(new T.IcosahedronGeometry(3.4, 0), H.leaf, sgn * 6, 25, 0, false);
      } else if (type === 'DOORS') {
        // two heavy sliding leaves in a steel frame; the finish slides them apart
        for (const s of [-1, 1]) { const m = add(new T.BoxGeometry(6.6, 8.6, 0.8), H.door, s * 3.4, 4.5, 0, true); m.userData.keep = true; m.name = s < 0 ? 'leafL' : 'leafR';
          for (let i = 0; i < 4; i++) { const b = add(new T.BoxGeometry(5.6, 0.25, 0.2), H.hazard, 0, -3 + i * 2.1, 0.5, false, m); }
          add(new T.BoxGeometry(0.4, 2.4, 0.4), H.steel, -s * 2.6, 0, 0.6, false, m); }
        add(new T.BoxGeometry(16, 0.7, 1.4), H.steel, 0, 9.3, 0, true);
        P.sign(api, g, 'SEED VAULT', 12, 1.8, 0, 11.4, 0.9, 0, '#14322a', '#bff8d0', false);
        add(new T.BoxGeometry(0.2, 2.2, 0.2), H.steel, -5.5, 10.4, 0.8, false); add(new T.BoxGeometry(0.2, 2.2, 0.2), H.steel, 5.5, 10.4, 0.8, false);
      } else if (type === 'LANTERN') {
        add(new T.CylinderGeometry(0.5, 0.7, 0.8, 8), H.concrete2, 0, 0.4, 0, false); add(new T.CylinderGeometry(0.16, 0.2, 6, 8), H.steel, 0, 3.8, 0, false);
        add(new T.BoxGeometry(1.4, 1.6, 1.4), H.glowG, 0, 7.2, 0, false); add(new T.ConeGeometry(1.1, 0.9, 4), H.steel, 0, 8.4, 0, false).rotation.y = Math.PI / 4;
      }
    },
  }));
})();
