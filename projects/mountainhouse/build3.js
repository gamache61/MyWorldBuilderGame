/* ============================================================
   MOUNTAIN HOUSE · BUILD 3 · THE HOUSE ON THE SUMMIT
   Keep this file in projects/mountainhouse next to 63-mountainhouse.html.
   A round stone terrace on the flat summit, and a modern white house of stacked
   boxes: a flowing base, a glass ground floor and dark-framed upper floors, with a tall box tower.
   ============================================================ */
(function () {
  const P = window.MTN;
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 3, name: 'THE HOUSE ON THE SUMMIT',
    brief: 'On the flat top of the mountain: a round stone terrace, the house itself — a modern white house of stacked boxes with a flowing base, glass ground floor and dark-framed upper floors — and a tall box tower.',
    types: {
      FOUNDATION: { code: 'SF', name: 'SUMMIT TERRACE', col: '#b9b1a2', w: 124, d: 124, h: 2 },
      WING:       { code: 'HM', name: 'HOUSE VOLUME',   col: '#f4f4f0', w: 40,  d: 30,  h: 18 },
      TOWER:      { code: 'SY', name: 'TALL BOX TOWER', col: '#f4f4f0', w: 18,  d: 18,  h: 36 },
    },
    order: ['FOUNDATION', 'WING', 'TOWER'],
    at: { FOUNDATION: [[1550 - 32, 12]], WING: [[1550 - 52, 12], [1550 - 12, 12]], TOWER: [[1550 + 12, -22]] },
    eye: [1550 + 110, P.SY + 95, 170],
    stats(api, c) { return [['TERRACE', c('FOUNDATION') ? 'LAID' : 'NOT YET'], ['HOUSE VOLUMES', c('WING') + ' / 2'], ['TALL TOWER', c('TOWER') ? 'STANDING' : 'NOT YET'], ['ROOMS', c('WING') * 6]]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, H = P.mh(api);
      if (!H.mdg) H.mdg = new T.MeshStandardMaterial({ color: 0x1c2833, roughness: 0.08, metalness: 0.6, emissive: 0x0a1418, emissiveIntensity: 0.4 });
      if (type === 'FOUNDATION') {
        add(new T.CylinderGeometry(62, 62, 0.7, 48), H.stone, 0, 0.35, 0, false);
        add(new T.TorusGeometry(61, 0.9, 6, 64), H.stone2, 0, 1.1, 0, true).rotation.x = Math.PI / 2;
        for (let i = 0; i < 16; i++) { const a = i / 16 * Math.PI * 2; add(new T.CylinderGeometry(0.2, 0.25, 4, 6), H.dark, Math.cos(a) * 61, 2.6, Math.sin(a) * 61, false); if (i % 2 === 0) add(new T.SphereGeometry(0.5, 8, 6), H.lamp, Math.cos(a) * 61, 4.8, Math.sin(a) * 61, false); }
        const ring = add(new T.TorusGeometry(40, 0.25, 6, 64), H.stone2, 0, 0.75, 0, false); ring.rotation.x = Math.PI / 2;
      } else if (type === 'WING') {
        // a modern white house of stacked boxes: a flowing white base, a glass ground floor and dark-framed upper boxes that reach out over it
        const WM = H.mw || (H.mw = new T.MeshStandardMaterial({ color: 0xfbfbf8, roughness: 0.42 })), FR = H.mf || (H.mf = new T.MeshStandardMaterial({ color: 0x14171b, roughness: 0.5, metalness: 0.3 })),
          WT = H.mwater || (H.mwater = new T.MeshStandardMaterial({ color: 0x3a86a8, roughness: 0.08, metalness: 0.2, emissive: 0x0a2a3a, emissiveIntensity: 0.5 }));
        // a dark-framed band of windows on a face · w wide, h high, centred at x,y,z, turned ry
        const band = (x, y, z, w, h, ry, n) => { const b = new T.Group(); b.position.set(x, y, z); b.rotation.y = ry; g.add(b);
          add(new T.BoxGeometry(w + 0.9, h + 0.9, 0.9), FR, 0, 0, 0, true, b);
          for (let q = 0; q < n; q++) { const pw = (w - 0.3 * (n + 1)) / n; add(new T.BoxGeometry(pw, h - 0.3, 0.3), H.mdg, -w / 2 + 0.3 + pw / 2 + q * (pw + 0.3), 0, 0.5, false, b); add(new T.BoxGeometry(pw, h - 0.3, 0.12), H.glass, -w / 2 + 0.3 + pw / 2 + q * (pw + 0.3), 0, 0.62, false, b); } return b; };
        if (k === 0) {
          // the flowing white base: a wide slab with one great curve running out into the lawn
          const sh = new T.Shape(); sh.moveTo(-20, 14); sh.lineTo(20, 14); sh.lineTo(20, -6); sh.bezierCurveTo(20, -17, 8, -19, 0, -16); sh.bezierCurveTo(-8, -13, -14, -17, -20, -12); sh.closePath();
          const sg = new T.ExtrudeGeometry(sh, { depth: 1.1, bevelEnabled: false }); sg.rotateX(-Math.PI / 2); add(sg, WM, 0, 0.7, 0, true);
          // the glass ground floor and its still pool on the south side
          add(new T.BoxGeometry(34, 5.4, 18), H.glass, -1, 4.2, -1, false);
          for (let i = 0; i <= 7; i++) add(new T.BoxGeometry(0.35, 5.6, 0.5), FR, -18 + i * 4.85, 4.2, 8.2, false);
          add(new T.BoxGeometry(34, 0.5, 0.5), FR, -1, 7, 8.2, false); add(new T.BoxGeometry(34, 0.5, 0.5), FR, -1, 1.7, 8.2, false);
          add(new T.BoxGeometry(32, 0.5, 16), H.timber, -1, 1.55, -1, false);
          add(new T.BoxGeometry(18, 0.12, 5.4), WT, -5, 1.8, 11.4, false); add(new T.BoxGeometry(19, 0.5, 6.4), WM, -5, 1.55, 11.4, false).scale.y = 0.4;
          // the upper box, pushed out over the glass, with its dark window band
          add(new T.BoxGeometry(30, 6.2, 17), WM, 3, 10.6, -2, true); add(new T.BoxGeometry(31.4, 0.7, 18.4), WM, 3, 14, -2, true);
          band(3, 10.6, 6.6, 26, 3.6, 0, 4); band(18.2, 10.6, -2, 12, 3.6, Math.PI / 2, 2);
          add(new T.BoxGeometry(3.4, 6.4, 3.4), FR, -9, 10.6, 5.5, true);   // a dark stair block at the corner
        } else {
          // the second volume: a white ground box with a long strip of glass and a rounded end, a dark-framed box stacked and shifted above
          add(new T.BoxGeometry(30, 7, 20), WM, 0, 4.2, 0, true); add(new T.CylinderGeometry(10, 10, 7, 32, 1, false, -Math.PI / 2, Math.PI), WM, 15, 4.2, 0, true);
          add(new T.BoxGeometry(22, 0.7, 24), WM, -6, 0.9, 0, true); add(new T.BoxGeometry(32, 0.5, 21), WM, 0, 7.8, 0, true);
          band(-3, 4.8, 10.3, 20, 3.2, 0, 3); band(-3, 4.8, -10.3, 20, 3.2, Math.PI, 3);
          add(new T.BoxGeometry(24, 6.2, 18), WM, 4, 11.4, 1, true); add(new T.BoxGeometry(25.4, 0.7, 19.4), WM, 4, 14.8, 1, true);
          band(0, 11.4, 10.3, 14, 4, 0, 3); band(16.4, 11.4, 1, 14, 4, Math.PI / 2, 3); band(-8.4, 11.4, 1, 10, 4, -Math.PI / 2, 2);
          add(new T.BoxGeometry(7, 0.6, 24), H.timber, 24, 0.9, 0, true);
          add(new T.BoxGeometry(4, 6.4, 0.4), FR, 8, 4.1, 10.4, false);   // the front door
        }
        add(new T.BoxGeometry(44, 0.6, 7), H.timber, 0, 0.9, -(k ? 16 : 17), true);   // deck on the north side, facing Kryos
      } else if (type === 'TOWER') {
        // the tall volume at the back: a white box rising above the rest with a dark window band at the top and a roof terrace
        const WM = H.mw || (H.mw = new T.MeshStandardMaterial({ color: 0xfbfbf8, roughness: 0.42 })), FR = H.mf || (H.mf = new T.MeshStandardMaterial({ color: 0x14171b, roughness: 0.5, metalness: 0.3 }));
        add(new T.BoxGeometry(18, 1, 18), H.stone2, 0, 0.5, 0, true);
        add(new T.BoxGeometry(14, 16, 14), WM, 0, 9, 0, true); add(new T.BoxGeometry(20, 7, 16), WM, 3, 20.5, 0, true); add(new T.BoxGeometry(21.4, 0.7, 17.4), WM, 3, 24.4, 0, true);
        for (const [x, z, w, ry] of [[3, 8.4, 16, 0], [13.2, 0, 11, Math.PI / 2], [-6, 8.4, 6, 0]]) { const b = new T.Group(); b.position.set(x, 20.5, z); b.rotation.y = ry; g.add(b); add(new T.BoxGeometry(w + 0.9, 4.2, 0.9), FR, 0, 0, 0, true, b); for (let q = 0; q < 3; q++) { const pw = (w - 1.2) / 3; add(new T.BoxGeometry(pw, 3.6, 0.3), H.mdg, -w / 2 + 0.3 + pw / 2 + q * (pw + 0.3), 0, 0.5, false, b); add(new T.BoxGeometry(pw, 3.6, 0.12), H.glass, -w / 2 + 0.3 + pw / 2 + q * (pw + 0.3), 0, 0.62, false, b); } }
        for (const y of [6, 12]) add(new T.BoxGeometry(14.4, 0.4, 0.4), FR, 0, y, 7.1, false);
        add(new T.CylinderGeometry(0.25, 0.25, 6, 6), H.steel, 8, 28, -6, false); add(new T.SphereGeometry(0.6, 8, 6), H.glowA, 8, 31.4, -6, false);
      }
    },
  }));
})();
