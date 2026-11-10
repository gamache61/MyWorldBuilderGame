/* ============================================================
   THE STARWATCH ARRAY · BUILD 2 · THE LISTENING DISHES
   Keep this file in projects/starwatcharray next to 54-starwatcharray.html.
   Six great dishes in a ring, each on a tall mount, all turned to the
   sky. Together they hear things no one dish could.
   ============================================================ */
(function () {
  const P = window.YARD;
  P.dishPos = [[1780, 0], [1665, 199], [1435, 199], [1320, 0], [1435, -199], [1665, -199]];
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 2, name: 'THE LISTENING DISHES',
    brief: 'Six great listening dishes in a ring, each on a tall mount, all turned to the sky.',
    types: { DISH: { code: 'HP', name: 'LISTENING DISH', col: '#eef1f4', w: 64, d: 64, h: 70 } },
    order: ['DISH'],
    at: { DISH: P.dishPos },
    eye: [1000, 190, 420],
    stats(api, c) { return [['LISTENING DISHES', c('DISH') + ' / 6']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, S = P.hm(api), C = P.fun(api);
      const rim = P._dishRim = P._dishRim || new T.MeshStandardMaterial({ color: 0xd9a21b, roughness: 0.5 });
      add(new T.CylinderGeometry(14, 16, 3, 20), S.stone, 0, 1.5, 0);
      add(new T.CylinderGeometry(4, 6, 30, 14), F.white, 0, 17, 0);
      add(new T.BoxGeometry(18, 5, 10), F.dark, 0, 33, 0);
      // the dish itself: a shallow bowl tipped up toward the sky (each one turned a little differently), with a feed on three struts
      const tilt = new T.Group(); tilt.position.set(0, 42, 0); tilt.rotation.set(-0.55 - (k % 3) * 0.12, k * 1.05, 0); g.add(tilt);
      const put = (geo, m, x, y, z, sh = true) => { const o = new T.Mesh(geo, m); o.position.set(x, y, z); o.castShadow = sh; tilt.add(o); return o; };
      put(new T.SphereGeometry(31, 36, 12, 0, Math.PI * 2, 0, 0.62).rotateX(Math.PI), new T.MeshStandardMaterial({ color: 0xf2f5f8, roughness: 0.35, metalness: 0.35, side: T.DoubleSide }), 0, 31, 0);
      const rg = put(new T.TorusGeometry(17.8, 0.5, 6, 36), rim, 0, 5.8, 0); rg.rotation.x = Math.PI / 2;
      for (let i = 0; i < 3; i++) { const a = i / 3 * Math.PI * 2; const st = put(new T.CylinderGeometry(0.3, 0.3, 24, 5), F.steel, Math.cos(a) * 8, 17, Math.sin(a) * 8); st.rotation.set(Math.sin(a) * 0.38, 0, -Math.cos(a) * 0.38); }
      put(new T.CylinderGeometry(1.4, 2, 5, 10), F.dark, 0, 30, 0);
      put(new T.SphereGeometry(1.1, 10, 8), P._cry ? P._cry[k % 3] : F.lamp, 0, 33.6, 0, false);
      add(new T.BoxGeometry(8, 4, 6), S.slate, 20, 2, 6); add(new T.BoxGeometry(2.4, 2.4, 0.4), S.glass, 20, 2.6, 9.2);
      P.person(g, P.civ(54100 + k), 'tablet', 22, 1.5, -8, Math.PI);
    },
  }));
})();
