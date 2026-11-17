/* ============================================================
   THE DEEP SPACE SCOUTS · BUILD 4 · THE SCOUT SHIPS
   Keep this file in projects/deepscouts next to 77-deepscouts.html.
   Three small fast deep space scouts, built from Unity's own parts, one on each launch pad.
   ============================================================ */
(function () {
  const P = window.PWP;
  // a small, fast scout ship: long needle nose, swept wings, a big engine bell; nose points to -z
  P.scoutShip = function (api, add, H, col) {
    const T = api.THREE;
    const prof = [[0, 0], [1.6, 3], [2.8, 10], [3.4, 20], [3.4, 30], [2.8, 36], [2.2, 38]].map(([r, y]) => new T.Vector2(r, y));
    const body = add(new T.LatheGeometry(prof, 14).rotateX(Math.PI / 2).translate(0, 0, -18), col, 0, 0, 0);
    add(new T.SphereGeometry(2.2, 10, 8), H.glass, 0, 2.2, -10, false).scale.set(0.9, 0.7, 2.2);
    for (const s of [-1, 1]) {
      const w = add(new T.BoxGeometry(14, 0.6, 12), H.steel2, s * 8, -0.4, 10); w.rotation.y = s * 0.45;
      add(new T.BoxGeometry(0.6, 5, 5), H.orange, s * 14.5, 2, 15, false).rotation.y = s * 0.2;
      add(new T.CylinderGeometry(0.8, 1, 8, 8).rotateX(Math.PI / 2), H.dark, s * 5, -0.4, 16, false);
    }
    add(new T.CylinderGeometry(1.8, 2.6, 4, 12).rotateX(Math.PI / 2), H.dark, 0, 0, 20, false);
    add(new T.BoxGeometry(0.5, 4, 9), H.white, 0, 3.4, 14, false);
    add(new T.TorusGeometry(3.4, 0.2, 6, 20), H.cool, 0, 0, 6, false);
  };
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 4, name: 'THE THREE SCOUT SHIPS',
    brief: 'Three small, fast scout ships, built from Unity\'s own parts and set one on each launch pad, ready to fly far beyond the sun of Unity.',
    types: { SCOUT: { code: 'HM', name: 'DEEP SPACE SCOUT', col: '#80f0ff', w: 30, d: 42, h: 8 } },
    order: ['SCOUT'],
    at: { SCOUT: [[1550 + 500 + -90, 1100 + 30], [1550 + 500 + 0, 1100 + 30], [1550 + 500 + 90, 1100 + 30]] },
    eye: [1550 + 500 + 0, (window.__SCOUT.Y || -85) + 190, 1100 - 330],
    stats(api, c) { return [['DEEP SPACE SCOUTS', c('SCOUT') + ' / 3'], ['ENGINES', c('SCOUT') ? 'ONLINE' : 'COLD']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, H = P.pw(api), cols = [H.white, H.wall2, H.white];
      const s = new T.Group(); s.position.set(0, 7.2, -4); s.scale.setScalar(1.5); g.add(s);
      const add2 = (geo, mat, x, y, z, sh = true) => add(geo, mat, x, y, z, sh, s);
      P.scoutShip(api, add2, H, cols[k % 3]);
      const stripe = [H.blue, H.orange, H.green][k % 3];
      add2(new T.BoxGeometry(7, 0.5, 6), stripe, 0, 3.5, 4, false);
      for (const lx of [-6, 6]) add(new T.BoxGeometry(0.8, 7, 0.8), H.steel2, lx, 3.5, 4, false);
    },
  }));
})();
