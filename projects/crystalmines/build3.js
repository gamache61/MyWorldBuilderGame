/* ============================================================
   THE CRYSTAL MINES · BUILD 3 · THE WINDING TOWERS & THE POWER HOUSE
   Keep this file in projects/crystalmines next to 50-crystalmines.html.
   Tall winding towers that raise the crystal from the deep shafts, a
   sorting hall where it is cleaned and graded, and a power house that
   runs the whole mine on the crystals themselves.
   ============================================================ */
(function () {
  const P = window.YARD;
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 3, name: 'THE WINDING TOWERS & THE POWER HOUSE',
    brief: 'Tall winding towers that raise crystal from the deep shafts, a sorting hall where it is cleaned and graded, and a power house that runs the mine on the crystals themselves.',
    types: {
      WINDER: { code: 'HP', name: 'WINDING TOWER', col: '#d9a21b', w: 30, d: 30, h: 80 },
      SORTHALL: { code: 'SY', name: 'SORTING HALL', col: '#e8e1d1', w: 110, d: 60, h: 34 },
      MINEPOWER: { code: 'SY', name: 'MINE POWER HOUSE', col: '#9fffd8', w: 50, d: 50, h: 40 },
    },
    order: ['WINDER', 'SORTHALL', 'MINEPOWER'],
    at: { WINDER: [[1830, -110], [1830, 70]], SORTHALL: [[1740, -20]], MINEPOWER: [[1830, 230]] },
    eye: [1450, 200, 480],
    stats(api, c) { return [['WINDING TOWERS', c('WINDER') + ' / 2'], ['SORTING HALL', c('SORTHALL') ? 'WORKING' : 'NOT YET'], ['POWER HOUSE', c('MINEPOWER') ? 'RUNNING' : 'NOT YET']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, S = P.hm(api), C = P.fun(api);
      const cry = P._cry = P._cry || [0x7ffcff, 0x9f7bff, 0x6dffb0].map(c => new T.MeshStandardMaterial({ color: c, emissive: c, emissiveIntensity: 1.4, roughness: 0.25, transparent: true, opacity: 0.92 }));
      if (type === 'WINDER') {
        // a steel headframe over a shaft: four legs, a crown with two big wheels, a cage and ropes
        add(new T.CylinderGeometry(9, 10, 2, 16), S.stone, 0, 1, 0);
        for (const [x, z] of [[-7, -7], [7, -7], [-7, 7], [7, 7]]) { const l = add(new T.BoxGeometry(1.6, 60, 1.6), C.yellow, x * 0.8, 31, z * 0.8); l.rotation.set(z * 0.006, 0, -x * 0.006); }
        for (const y of [18, 36, 52]) { add(new T.BoxGeometry(14, 0.8, 0.8), F.steel, 0, y, -5.6); add(new T.BoxGeometry(14, 0.8, 0.8), F.steel, 0, y, 5.6); add(new T.BoxGeometry(0.8, 0.8, 11), F.steel, -5.6, y, 0); add(new T.BoxGeometry(0.8, 0.8, 11), F.steel, 5.6, y, 0); }
        add(new T.BoxGeometry(16, 3, 10), F.dark, 0, 62, 0);
        for (const x of [-3.5, 3.5]) { const w = add(new T.TorusGeometry(4.5, 0.6, 8, 28), C.yellow, x, 66.5, 0); w.rotation.y = Math.PI / 2; add(new T.CylinderGeometry(0.4, 0.4, 3, 6).rotateZ(Math.PI / 2), F.steel, x, 66.5, 0); }
        for (const x of [-3.5, 3.5]) add(new T.CylinderGeometry(0.15, 0.15, 44, 4), F.steel, x, 40, 0);
        add(new T.BoxGeometry(5, 5, 4), F.armor, 0, 20, 0); add(new T.BoxGeometry(5.2, 0.8, 4.2), C.yellow, 0, 22.8, 0);
        add(new T.BoxGeometry(14, 10, 12), S.slate, 20, 6, 0); add(new T.CylinderGeometry(3, 3, 4, 12), F.steel, 20, 13, 0);
        const c1 = add(new T.OctahedronGeometry(2), cry[k % 3], 0, 70, 0); c1.scale.set(0.6, 1.8, 0.6); c1.castShadow = false;
        P.person(g, P.civ(50100 + k), 'idle', 14, 2, 8, Math.PI); P.person(g, P.civ(50110 + k), 'tablet', 14, 2, -8, 0);
      } else if (type === 'SORTHALL') {
        add(new T.BoxGeometry(112, 1, 62), S.gravel, 0, 0.5, 0);
        add(new T.BoxGeometry(100, 18, 48), F.white, 0, 10, 0);
        const roof = add(new T.CylinderGeometry(34, 34, 102, 3, 1).rotateZ(Math.PI / 2), S.slate, 0, 21, 0); roof.scale.set(1, 0.4, 1.5);
        for (let x = -40; x <= 40; x += 20) add(new T.BoxGeometry(8, 0.6, 20), S.glass, x, 27, 0);
        for (const z of [-24.2, 24.2]) for (let x = -40; x <= 40; x += 20) add(new T.BoxGeometry(10, 8, 0.4), S.glass, x, 12, z);
        // a conveyor along the front carrying crystals in to be sorted into three heaps
        add(new T.BoxGeometry(100, 1.2, 3), F.dark, 0, 2.2, 30); for (let x = -46; x <= 46; x += 5) add(new T.BoxGeometry(1.6, 1.4, 3.2), F.steel, x, 2.2, 30);
        for (let i = 0; i < 12; i++) { const c = add(new T.OctahedronGeometry(1), cry[i % 3], -44 + i * 8, 3.6, 30); c.scale.set(0.6, 1.4, 0.6); c.castShadow = false; }
        for (let i = 0; i < 3; i++) { add(new T.ConeGeometry(5, 5, 7), cry[i], -30 + i * 30, 3, 40).castShadow = false; }
        P.sign(api, g, 'SORTING HALL · CLEAN & GRADE', 28, 3.4, 0, 28, 24.8, 0, '#14324a', '#bff8ff', true);
        P.person(g, P.civ(50200), 'idle', -20, 1, 36, Math.PI); P.person(g, P.civ(50201), 'tablet', 20, 1, 36, Math.PI); P.person(g, P.civ(50202), 'gesture', 0, 1, 44, Math.PI);
      } else {
        // the power house: a glass hall with a crystal core that glows and four cooling fins
        add(new T.CylinderGeometry(26, 27, 2, 32), S.gravel, 0, 1, 0);
        add(new T.CylinderGeometry(20, 20, 20, 32), F.white, 0, 12, 0);
        add(new T.CylinderGeometry(20.5, 20.5, 2, 32), S.slate, 0, 22.8, 0);
        const dome = add(new T.SphereGeometry(18, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2), S.glass, 0, 23, 0); dome.castShadow = false;
        const core = add(new T.OctahedronGeometry(7), cry[2], 0, 32, 0); core.scale.set(0.8, 1.7, 0.8); core.castShadow = false;
        const ring = add(new T.TorusGeometry(10, 0.5, 8, 40), cry[0], 0, 31, 0); ring.rotation.x = Math.PI / 2; ring.castShadow = false;
        for (let i = 0; i < 4; i++) { const a = i / 4 * Math.PI * 2 + 0.78; add(new T.BoxGeometry(2, 18, 10), F.steel, Math.cos(a) * 24, 10, Math.sin(a) * 24).rotation.y = -a; }
        add(new T.BoxGeometry(14, 6, 0.6), S.glass, 0, 8, 20.4);
        P.sign(api, g, 'POWER HOUSE · RUNS ON CRYSTAL', 26, 3.2, 0, 3, 28, 0, '#14324a', '#bff8d0', true);
        P.person(g, P.civ(50300), 'idle', 12, 2, 26, Math.PI);
      }
    },
  }));
})();
