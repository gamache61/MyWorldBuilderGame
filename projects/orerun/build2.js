/* ============================================================
   THE ORE RUN · BUILD 2 · THE FREIGHTER PADS
   Keep this file in projects/orerun next to orerun.html.
   Four round landing pads for the ore freighters, ringed with lights,
   and the yard tower in the middle where the controllers guide every
   freighter in from Vesh.
   ============================================================ */
(function () {
  const P = window.ORE;
  // a small ore freighter: a blunt cargo hull with an ore bay, a cab at the front and four engines (shared by every build)
  P.freighter = function (api, add, grp, n) {
    const T = api.THREE, S = P.hm(api), F = P.mats(api), hull = P._fh || (P._fh = [0xc8cdd4, 0xb8c0c8, 0xd4d0c4].map(c => new T.MeshStandardMaterial({ color: c, roughness: 0.45, metalness: 0.6 })));
    const H = hull[n % 3];
    add(new T.BoxGeometry(14, 8, 34), H, 0, 7, 0, true, grp);
    add(new T.BoxGeometry(12, 3, 22), F.dark, 0, 11.6, -2, true, grp);
    add(new T.BoxGeometry(12.4, 1.2, 22), F.ore, 0, 12.4, -2, false, grp);
    add(new T.BoxGeometry(11, 6, 8), H, 0, 8, 20, true, grp); add(new T.BoxGeometry(10, 2.4, 0.3), S.glass, 0, 9.6, 24.1, false, grp);
    for (const [x, z] of [[-8.6, -12], [8.6, -12], [-8.6, 12], [8.6, 12]]) { add(new T.CylinderGeometry(2.4, 2.4, 3, 16), F.dark, x, 5, z, true, grp); add(new T.CircleGeometry(1.9, 16).rotateX(Math.PI / 2), F.engine, x, 3.4, z, false, grp); }
    for (const s of [-1, 1]) add(new T.BoxGeometry(0.4, 1, 30), S.yellow, s * 7.1, 6, 0, false, grp);
    for (const [x, z] of [[-5, -14], [5, -14], [-5, 14], [5, 14]]) add(new T.BoxGeometry(1, 3, 1), F.steel, x, 1.5, z, true, grp);
    add(new T.SphereGeometry(0.5, 6, 4), F.lamp, 0, 11.5, 24, false, grp);
  };
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 2, name: 'THE FREIGHTER PADS',
    brief: 'Four round landing pads for the ore freighters, ringed with lights, and the yard tower where the controllers guide every freighter in from Vesh.',
    types: {
      FPAD:      { code: 'SF', name: 'FREIGHTER PAD', col: '#6c757d', w: 60, d: 60, h: 3 },
      YARDTOWER: { code: 'SY', name: 'YARD TOWER', col: '#e8e1d1', w: 24, d: 24, h: 48 },
    },
    order: ['FPAD', 'YARDTOWER'],
    at: { FPAD: [[330, -150], [330, 150], [530, -150], [530, 150]], YARDTOWER: [[430, 0]] },
    eye: [-200, 220, 320],
    stats(api, c) { return [['FREIGHTER PADS', c('FPAD') + ' / 4'], ['YARD TOWER', c('YARDTOWER') ? 'ONLINE' : 'NOT YET']]; },
    make(type, k, g, add, F, api) {
      const T = api.THREE, S = P.hm(api);
      if (type === 'FPAD') {
        add(new T.CylinderGeometry(30, 31, 2.4, 40), F.stoneDark, 0, 1.2, 0);
        add(new T.CylinderGeometry(27, 27, 0.3, 40), F.dark, 0, 2.55, 0);
        add(new T.TorusGeometry(24, 0.6, 6, 48).rotateX(Math.PI / 2), S.yellow, 0, 2.75, 0, false);
        for (const a of [0, Math.PI / 2]) { const b = add(new T.BoxGeometry(34, 0.1, 2), F.white, 0, 2.75, 0, false); b.rotation.y = a; }
        P.sign(api, g, 'PAD ' + (k + 1), 10, 3, 0, 2.8, 0, 0, '#2a2f38', '#ffd060', false);
        g.children[g.children.length - 1].rotation.x = -Math.PI / 2; g.children[g.children.length - 1].position.set(0, 2.8, 14);
        for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; add(new T.SphereGeometry(0.6, 8, 6), F.lamp, Math.cos(a) * 29, 2.9, Math.sin(a) * 29, false); }
        P.person(g, P.civ(19000 + k), 'tablet', 26, 2.6, 18, -0.8);
      } else if (type === 'YARDTOWER') {
        add(new T.CylinderGeometry(12, 13, 2, 24), F.stoneDark, 0, 1, 0);
        add(new T.CylinderGeometry(4, 5, 38, 16), F.white, 0, 20, 0);
        add(new T.CylinderGeometry(11, 8, 9, 16), F.white, 0, 43, 0);
        add(new T.CylinderGeometry(11.1, 11.1, 4, 16, 1, true), S.glass, 0, 44, 0, false); add(new T.CylinderGeometry(11, 11, 3.6, 16, 1, true), S.dim, 0, 44, 0, false);
        add(new T.CylinderGeometry(12, 12, 1, 16), S.frame, 0, 47.8, 0);
        add(new T.CylinderGeometry(0.3, 0.3, 10, 6), F.steel, 0, 53, 0); const red = add(new T.SphereGeometry(0.9, 8, 6), new T.MeshBasicMaterial({ color: 0xff3020 }), 0, 58.4, 0, false); api.blink(red, 1.4, 0xff3020);
        const dish = new T.Group(); dish.position.set(6, 49, 0); dish.userData.keep = true; g.add(dish); P.dish = dish;
        add(new T.SphereGeometry(3, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2), F.white, 0, 0, 0, true, dish).rotation.x = Math.PI / 2;
        P.sign(api, g, 'ORE RUN · YARD TOWER', 18, 2.4, 0, 6, 4.6, 0, '#2a2f38', '#ffd060', false);
        for (let i = 0; i < 3; i++) P.figure(api, add, -3 + i * 3, 41, 6, 1, i);
      }
    },
    tick(api, dt, t) { if (P.dish) P.dish.rotation.y = t * 0.6; },
  }));
})();
