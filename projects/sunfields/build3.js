/* ============================================================
   THE SUN FIELDS · BUILD 3 · THE FIRST SOLAR ARRAYS
   Keep this file in projects/sunfields next to 75-sunfields.html.
   Six long arrays of sun panels in two rows, each panel tilted to face the sun.
   ============================================================ */
(function () {
  const P = window.PWP;
  P.panels = function (api, add, H, k) {
    const T = api.THREE, F = P.sunMats || (P.sunMats = {
      cell: new T.MeshStandardMaterial({ color: 0x14306a, roughness: 0.25, metalness: 0.7 }),
      frame: new T.MeshStandardMaterial({ color: 0xc9d1da, roughness: 0.4, metalness: 0.8 }),
    });
    const gp = P.sunGeo || (P.sunGeo = { cell: new T.BoxGeometry(9.2, 0.3, 10.4), rail: new T.BoxGeometry(9.6, 0.3, 0.5), post: new T.CylinderGeometry(0.35, 0.45, 5, 6), foot: new T.BoxGeometry(1.4, 0.4, 1.4) });
    add(new T.BoxGeometry(100, 0.4, 60), H.conc2, 0, 0.2, 0, false);
    for (let r = 0; r < 4; r++) {
      const z = -21 + r * 14;
      for (let c = 0; c < 10; c++) {
        const x = -45 + c * 10, cell = add(gp.cell, F.cell, x, 5.4, z, true); cell.rotation.x = -0.5;
        const rl = add(gp.rail, F.frame, x, 5.7, z + 5, false); rl.rotation.x = -0.5;
      }
      for (let c = 0; c <= 10; c += 2) { add(gp.post, H.steel2, -50 + c * 10, 2.9, z + 3, false); add(gp.foot, H.conc2, -50 + c * 10, 0.6, z + 3, false); }
    }
    add(new T.BoxGeometry(100, 0.3, 0.6), H.yellow, 0, 0.5, 30.3, false);
  };
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 3, name: 'THE FIRST SOLAR ARRAYS',
    brief: 'Six long arrays of sun panels in two rows on the pad, each panel tilted to face the sun, each array on its own steel posts.',
    types: { ARRAY: { code: 'SF', name: 'SOLAR ARRAY', col: '#14306a', w: 100, d: 60, h: 8 } },
    order: ['ARRAY'],
    at: { ARRAY: [[1650, -810], [1850, -810], [2050, -810], [1650, -710], [1850, -710], [2050, -710]].map(([x, z]) => [1550 + x, z]) },
    eye: [1550 + 1850, (window.__SUNF.Y || -85) + 240, -1020],
    stats(api, c) { return [['SOLAR ARRAYS', c('ARRAY') + ' / 6']]; },
    make(type, k, g, add, F, api, sl) { P.panels(api, add, P.pw(api), k); },
  }));
})();
