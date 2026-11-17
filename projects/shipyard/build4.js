/* ============================================================
   THE UNITY SHIPYARD · BUILD 4 · THE FIRST HULLS & THE ASSEMBLY HALL
   Keep this file in projects/shipyard next to 74-shipyard.html.
   Three ship hulls growing on the slips, from bare ribs to nearly plated, and a great assembly hall where the parts are joined.
   ============================================================ */
(function () {
  const P = window.PWP;
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 4, name: 'THE FIRST HULLS & THE ASSEMBLY HALL',
    brief: 'Three ship hulls growing on the slips, one a bare frame of ribs, one half plated and one almost finished, and a great assembly hall where the parts from the Parts Works are joined.',
    types: {
      HULL: { code: 'HM', name: 'SHIP HULL',     col: '#8a96a4', w: 40, d: 170, h: 26 },
      HALL: { code: 'FB', name: 'ASSEMBLY HALL', col: '#d7dade', w: 150, d: 70, h: 34 },
    },
    order: ['HULL', 'HALL'],
    at: {
      HULL: [[1550 - 100, 530], [1550 + 60, 530], [1550 + 220, 530]],
      HALL: [[1550 + 60, 372]],
    },
    eye: [1550 + 60, P.SY + 200, 220],
    stats(api, c) { return [['SHIP HULLS', c('HULL') + ' / 3'], ['ASSEMBLY HALL', c('HALL') ? 'BUILT' : 'NOT YET']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, H = P.pw(api);
      if (type === 'HULL') {
        const L = 170, RM = 17, CY = 3 + RM * 0.72, plated = [0.3, 0.65, 1][k % 3];
        const rad = u => RM * (u < 0.38 ? Math.pow(Math.sin(u / 0.38 * Math.PI / 2), 0.62) : 1 - 0.42 * Math.pow(Math.max(0, (u - 0.72) / 0.28), 2));
        // cradle blocks the hull rests on
        for (let i = 0; i < 9; i++) add(new T.BoxGeometry(34, 2.4, 3), H.dark, 0, 2.4, -L / 2 + 12 + i * 18, false);
        // the ribs: a ring every few metres, like the frame of a ship
        for (let i = 1; i <= 24; i++) { const u = i / 25, r = rad(u); if (r < 1) continue; const rib = add(new T.TorusGeometry(r, 0.45, 4, 24), H.steel2, 0, CY, -L / 2 + u * L, false); rib.scale.set(1, 0.72, 1); }
        for (const ang of [0.5, 1.2, 2.0, 2.64]) for (const s of [-1, 1]) { const pts = []; for (let i = 1; i <= 24; i++) { const u = i / 25, r = rad(u); pts.push(new T.Vector3(s * Math.sin(ang) * r, CY - Math.cos(ang) * r * 0.72, -L / 2 + u * L)); } add(new T.TubeGeometry(new T.CatmullRomCurve3(pts), 40, 0.3, 4), H.steel, 0, 0, 0, false); }
        // the plated skin: the front of the hull is covered, the rest still shows its ribs
        const n = Math.max(2, Math.round(plated * 30)), prof = []; for (let i = 0; i <= n; i++) { const u = i / 30; prof.push(new T.Vector2(Math.max(0.01, rad(u)), -L / 2 + u * L)); }
        const skin = new T.Mesh(new T.LatheGeometry(prof, 28).rotateX(Math.PI / 2), new T.MeshStandardMaterial({ color: plated > 0.9 ? 0xdde3ea : 0xaab4bf, roughness: 0.45, metalness: 0.55, side: T.DoubleSide }));
        skin.position.y = CY; skin.scale.set(1, 0.72, 1); skin.castShadow = true; g.add(skin);
        for (let i = 2; i < n; i += 2) { const u = i / 30, rb = add(new T.TorusGeometry(rad(u) + 0.08, 0.14, 4, 28), H.steel2, 0, CY, -L / 2 + u * L, false); rb.scale.set(1, 0.72, 1); }
        if (plated > 0.9) {
          add(new T.BoxGeometry(9, 5, 14), H.wall, 0, CY + RM * 0.72 + 1.5, -36);
          add(new T.BoxGeometry(8.4, 1.6, 0.4), H.win, 0, CY + RM * 0.72 + 2.6, -43.1, false);
          for (const s of [-1, 1]) add(new T.BoxGeometry(18, 0.7, 14), H.steel2, s * (RM + 8), CY - 2, 20);
          add(new T.BoxGeometry(0.8, 12, 12), H.blue, 0, CY + RM * 0.72 + 5, 62);
          for (const s of [-1, 1]) { const e = add(new T.CylinderGeometry(3, 3.4, 6, 12).rotateX(Math.PI / 2), H.dark, s * 7, CY, 68, false); }
        }
        add(new T.BoxGeometry(60, 0.5, 4), H.hazard, 0, 2.2, 90, false);
        P.person(g, P.civ(74030 + k), 'tablet', 26, 1.5, 70, -Math.PI / 2);
      } else if (type === 'HALL') {
        add(new T.BoxGeometry(150, 1, 70), H.conc2, 0, 0.5, 0);
        add(new T.BoxGeometry(146, 26, 66), H.wall, 0, 14, 0);
        add(new T.BoxGeometry(148, 1.6, 68), H.roof, 0, 27.8, 0);
        add(new T.BoxGeometry(100, 6, 44), H.roof2, 0, 31.6, 0);
        for (let i = 0; i < 6; i++) { add(new T.BoxGeometry(12, 16, 0.6), H.steel2, -50 + i * 20, 9, 33.3, false); add(new T.BoxGeometry(12, 0.8, 0.8), H.yellow, -50 + i * 20, 17.4, 33.5, false); }
        for (let i = 0; i < 8; i++) add(new T.BoxGeometry(4, 5, 0.4), H.win, -60 + i * 17, 21, -33.2, false);
        for (let x = -45; x <= 45; x += 30) { add(new T.CylinderGeometry(1.6, 2, 12, 10), H.steel2, x, 40, 0); add(new T.CylinderGeometry(1.3, 1.3, 0.8, 10), H.cool, x, 46.4, 0, false); }
        P.sign(api, g, 'THE ASSEMBLY HALL', 50, 5, 0, 24, -33.8, Math.PI, '#14242e', '#ffe08a');
        P.person(g, P.civ(74040), 'tablet', 20, 0.5, -40, Math.PI); P.person(g, P.civ(74041), 'idle', 26, 0.5, -40, Math.PI);
      }
    },
  }));
})();
