/* ============================================================
   THE TOWN ON VESH · BUILD 4 · THE MINERS' TOWN
   Keep this file in projects/veshtown next to veshtown.html.
   Six home domes for the miners' families, joined by tubes, a
   school dome for the children, and a great park dome with trees
   and a pond — so the miners never have to live far from home.
   ============================================================ */
(window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(window.VESH.build({
  id: 4, name: 'THE MINERS’ TOWN',
  brief: 'Six home domes for the miners’ families joined by tubes, a school dome for the children, and a great park dome with trees and a pond.',
  types: {
    HOMEDOME: { code: 'HM', name: 'HOME DOME', col: '#8a5ad0', w: 46, d: 46, h: 22 },
    VTUBE:    { code: 'SF', name: 'TOWN TUBE', col: '#6c757d', w: 36, d: 9, h: 9 },
    SCHOOL:   { code: 'HM', name: 'SCHOOL DOME', col: '#e8c13a', w: 40, d: 40, h: 20 },
    PARKDOME: { code: 'GD', name: 'PARK DOME', col: '#3a7d44', w: 84, d: 84, h: 34 },
  },
  order: ['HOMEDOME', 'VTUBE', 'SCHOOL', 'PARKDOME'],
  at: {
    HOMEDOME: [[560, 120], [640, 120], [720, 120], [560, 220], [640, 220], [720, 220]],
    VTUBE: [[600, 120], [680, 120], [600, 220], [680, 220]],
    SCHOOL: [[810, 170]], PARKDOME: [[660, 335]],
  },
  eye: [-240, 170, 280],
  stats(api, c) { return [['HOME DOMES', c('HOMEDOME') + ' / 6'], ['FAMILIES HOUSED', c('HOMEDOME') * 40], ['SCHOOL', c('SCHOOL') ? 'OPEN' : 'NOT YET'], ['PARK DOME', c('PARKDOME') ? 'GROWING' : 'NOT YET']]; },
  make(type, k, g, add, F, api) {
    const T = api.THREE, V = window.VESH;
    const dome = (r, floorMat) => {
      add(new T.CylinderGeometry(r + 1, r + 2, 3, 40), F.panel, 0, 1.5, 0);
      add(new T.CylinderGeometry(r - 0.5, r - 0.5, 0.6, 40), floorMat, 0, 3.2, 0);
      add(new T.SphereGeometry(r, 40, 16, 0, Math.PI * 2, 0, Math.PI / 2), F.glass, 0, 3, 0, false);
      for (let i = 0; i < 8; i++) { const m = new T.Mesh(new T.TorusGeometry(r, 0.35, 6, 32, Math.PI), F.white); m.position.y = 3; m.rotation.y = i / 8 * Math.PI; g.add(m); }
      add(new T.TorusGeometry(r + 0.1, 0.6, 6, 48).rotateX(Math.PI / 2), F.gold, 0, 3, 0);
    };
    if (type === 'HOMEDOME') {
      dome(22, F.garden);
      const Y = 3.5, roofs = [F.orange, F.dark, F.wood, F.orange, F.panel, F.dark, F.wood];
      // a stone path round the dome, a little square in the middle with a tree and benches
      const ring = new T.RingGeometry(8.5, 10.5, 40).rotateX(-Math.PI / 2); add(ring, F.stone, 0, Y + 0.02, 0, false);
      add(new T.CylinderGeometry(4.5, 4.5, 0.1, 28), F.stone, 0, Y, 0, false);
      add(new T.CylinderGeometry(0.5, 0.7, 4, 8), F.wood, 0, Y + 2, 0); add(new T.IcosahedronGeometry(2.6, 1), F.garden, 0, Y + 5, 0);
      for (let i = 0; i < 3; i++) { const a = i / 3 * Math.PI * 2 + 0.5, bx = Math.cos(a) * 3.4, bz = Math.sin(a) * 3.4; const b = add(new T.BoxGeometry(2.2, 0.3, 0.7), F.wood, bx, Y + 0.6, bz); b.rotation.y = -a + Math.PI / 2; }
      // seven family homes round the path, each with a front door, lit windows, a pitched roof and a front garden
      for (let i = 0; i < 7; i++) {
        const a = i / 7 * Math.PI * 2 + k * 0.4, r = 14.5, h = new T.Group();
        h.position.set(Math.cos(a) * r, Y, Math.sin(a) * r); h.rotation.y = -a - Math.PI / 2; g.add(h);
        add(new T.BoxGeometry(6.4, 4.6, 5.4), i % 2 ? F.white : F.panel, 0, 2.3, 0, true, h);
        const roof = add(new T.ConeGeometry(4.8, 2.4, 4), roofs[(i + k) % 7], 0, 5.8, 0, true, h); roof.rotation.y = Math.PI / 4; roof.scale.set(1, 1, 0.86);
        add(new T.BoxGeometry(0.6, 1.8, 0.6), F.dark, 1.8, 6.4, 0.6, true, h);
        add(new T.BoxGeometry(1.3, 2.4, 0.12), F.wood, 0, 1.2, 2.72, false, h);
        add(new T.BoxGeometry(2, 0.15, 0.9), F.stone, 0, 0.08, 3.1, false, h);
        for (const x of [-2.1, 2.1]) { add(new T.BoxGeometry(1.3, 1.1, 0.1), F.window, x, 1.7, 2.72, false, h); add(new T.BoxGeometry(1.3, 1.1, 0.1), F.window, x, 3.6, 2.72, false, h); }
        for (const s2 of [-1, 1]) add(new T.BoxGeometry(0.1, 1.1, 1.3), F.window, s2 * 3.22, 3.2, 0, false, h);
        for (let f = 0; f < 4; f++) add(new T.SphereGeometry(0.35, 6, 4), F.flower, -2.4 + f * 1.6 + (f > 1 ? 0.8 : -0.8) * 0, 0.3, 3.9, false, h);
        add(new T.BoxGeometry(6.4, 0.5, 0.15), F.white, 0, 0.25, 4.4, false, h);
      }
      // street lamps along the path
      for (let i = 0; i < 6; i++) { const a = i / 6 * Math.PI * 2 + 0.25; add(new T.CylinderGeometry(0.12, 0.15, 3.6, 6), F.steel, Math.cos(a) * 11, Y + 1.8, Math.sin(a) * 11); add(new T.SphereGeometry(0.4, 8, 6), F.window, Math.cos(a) * 11, Y + 3.8, Math.sin(a) * 11, false); }
      // the families at home: someone strolling the path, children playing in the square, a neighbour at the door
      V.person(g, V.civ(11400 + k), 'walk', 9.5, Y, 0, 0, { path: { type: 'circle', cx: 0, cz: 0, r: 9.5, speed: 0.9 } });
      V.person(g, V.civ(11410 + k), 'walk', 0, Y, 2, 0, { path: { type: 'circle', cx: 0, cz: 0, r: 2.2, speed: 1.6 }, scale: 0.6 });
      V.person(g, V.civ(11420 + k), 'gesture', Math.cos(k * 0.4) * 10.4, Y, Math.sin(k * 0.4) * 10.4, -k * 0.4 + Math.PI / 2);
    } else if (type === 'VTUBE') {
      const L = 36;
      add(new T.CylinderGeometry(4, 4, L, 20, 1, true).rotateZ(Math.PI / 2), F.white, 0, 6, 0);
      for (let s = -L / 2 + 3; s <= L / 2 - 3; s += 6) add(new T.TorusGeometry(4.15, 0.35, 6, 24).rotateY(Math.PI / 2), F.gold, s, 6, 0);
      for (const s of [-1, 1]) add(new T.BoxGeometry(L - 2, 1, 0.2), F.window, 0, 7, s * 4.05, false);
    } else if (type === 'SCHOOL') {
      dome(19, F.stone);
      for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) add(new T.BoxGeometry(2, 1, 1.2), F.wood, -6 + c * 4, 4, -4 + r * 4);
      add(new T.BoxGeometry(12, 5, 0.4), F.dark, 0, 6, -9);
      const sign = api.canvasTex(512, 96, (c, w, h) => { c.fillStyle = '#12233a'; c.fillRect(0, 0, w, h); c.fillStyle = '#ffd060'; c.font = 'bold 54px Arial'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('VESH SCHOOL', w / 2, h / 2 + 2); });
      const m = new T.Mesh(new T.PlaneGeometry(14, 2.6), new T.MeshBasicMaterial({ map: sign })); m.position.set(0, 2, 21.5); g.add(m);
      for (let i = 0; i < 5; i++) V.person(g, V.civ(11450 + i), i === 0 ? 'gesture' : 'sitType', -6 + i * 3, 3.5, i === 0 ? -7 : 0, 0);
    } else if (type === 'PARKDOME') {
      dome(40, F.garden);
      add(new T.CylinderGeometry(10, 10, 0.4, 32), F.water, 0, 3.7, 0, false);
      for (let i = 0; i < 18; i++) { const a = i / 18 * Math.PI * 2, r = 18 + (i % 3) * 6; add(new T.CylinderGeometry(0.5, 0.7, 5, 6), F.wood, Math.cos(a) * r, 5.8, Math.sin(a) * r); add(new T.IcosahedronGeometry(3.4, 0), F.garden, Math.cos(a) * r, 10, Math.sin(a) * r); }
      for (let i = 0; i < 24; i++) { const a = i / 24 * Math.PI * 2; add(new T.SphereGeometry(0.5, 6, 4), F.flower, Math.cos(a) * 12, 3.8, Math.sin(a) * 12, false); }
      for (let i = 0; i < 4; i++) V.person(g, V.civ(11470 + i), 'walk', 0, 3.5, 0, 0, { path: { type: 'circle', cx: 0, cz: 0, r: 14 + i * 2, speed: 0.8 + i * 0.1 } });
    }
  },
}));
