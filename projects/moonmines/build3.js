/* ============================================================
   THE MOON MINES · BUILD 3 · THE ORE PIT & DRILL RIGS
   Keep this file in projects/moonmines next to moonmines.html.
   A terraced open pit into the metal-rich ground, four great drill
   rigs round its edge, and a conveyor to carry the ore away.
   ============================================================ */
(window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(window.MOON.build({
  id: 3, name: 'THE ORE PIT & DRILL RIGS',
  brief: 'A terraced open pit into the metal-rich ground of Vesh, four drill rigs round its edge, and a conveyor to carry the ore to the smelter.',
  types: {
    OREPIT:   { code: 'MN', name: 'ORE PIT', col: '#8a5a3a', w: 150, d: 150, h: 16 },
    RIG:      { code: 'MN', name: 'DRILL RIG', col: '#d9731b', w: 14, d: 14, h: 46 },
    CONVEYOR: { code: 'SF', name: 'CONVEYOR SECTION', col: '#6c757d', w: 30, d: 6, h: 6 },
  },
  order: ['OREPIT', 'RIG', 'CONVEYOR'],
  at: {
    OREPIT: [[540, -150]],
    RIG: [[597, -93], [483, -93], [483, -207], [597, -207]],
    CONVEYOR: [[640, -150], [670, -150], [700, -150], [730, -150]],
  },
  eye: [-200, 150, 260],
  stats(api, c) { return [['ORE PIT', c('OREPIT') ? 'OPEN' : 'NOT YET'], ['DRILL RIGS', c('RIG') + ' / 4'], ['CONVEYOR', c('CONVEYOR') * 30 + ' / 120 m'], ['ORE', c('RIG') * 250 + ' t / day']]; },
  make(type, k, g, add, F, api) {
    const T = api.THREE, MOON = window.MOON;
    if (type === 'OREPIT') {
      // terraces step down to a dark seam of ore in the middle
      add(new T.CircleGeometry(22, 40).rotateX(-Math.PI / 2), F.oreDark, 0, 0.4, 0, false);
      for (let i = 0; i < 6; i++) {
        const r0 = 22 + i * 9, h = 2 + i * 2.6;
        const ring = new T.Shape(); ring.absarc(0, 0, r0 + 9, 0, Math.PI * 2, false); const hole = new T.Path(); hole.absarc(0, 0, r0, 0, Math.PI * 2, true); ring.holes.push(hole);
        add(new T.ExtrudeGeometry(ring, { depth: h, bevelEnabled: false, curveSegments: 48 }).rotateX(-Math.PI / 2), i % 2 ? F.ore : F.rock, 0, 0, 0);
        add(new T.CylinderGeometry(r0 + 0.2, r0 + 0.2, 0.6, 48, 1, true), F.oreDark, 0, h - 0.3, 0, false);
      }
      // a ramp down into the pit and work lights
      const ramp = add(new T.BoxGeometry(10, 1, 60), F.regolith, 0, 8, 46); ramp.rotation.x = 0.27;
      for (let i = 0; i < 6; i++) { const a = i / 6 * Math.PI * 2; add(new T.CylinderGeometry(0.4, 0.4, 10, 6), F.steel, Math.cos(a) * 74, 20, Math.sin(a) * 74); add(new T.BoxGeometry(3, 1, 1.6), F.window, Math.cos(a) * 74, 25.4, Math.sin(a) * 74, false); }
      for (let i = 0; i < 3; i++) MOON.person(g, { kind: 'astro', seed: 9300 + i, stripe: ['#e8c13a', '#2e7cc8', '#3ec85a'][i] }, i === 1 ? 'tablet' : 'kneelWork', -8 + i * 8, 0.4, -6 + i * 4, i);
    } else if (type === 'RIG') {
      add(new T.BoxGeometry(14, 3, 14), F.dark, 0, 1.5, 0);
      for (const s of [-1, 1]) add(new T.BoxGeometry(3, 2.4, 16), F.steel, s * 6, 1.2, 0);
      // a lattice tower
      for (const [x, z] of [[-4, -4], [4, -4], [-4, 4], [4, 4]]) add(new T.BoxGeometry(1, 40, 1), F.orange, x * (1 - 0) , 23, z);
      for (let y = 6; y < 42; y += 6) for (const [w, d, x, z] of [[9, 0.6, 0, -4], [9, 0.6, 0, 4], [0.6, 9, -4, 0], [0.6, 9, 4, 0]]) add(new T.BoxGeometry(w, 0.6, d), F.orange, x, y, z);
      add(new T.BoxGeometry(10, 3, 10), F.yellow, 0, 44, 0);
      add(new T.CylinderGeometry(1.4, 1.4, 34, 12), F.steel, 0, 20, 0);
      add(new T.ConeGeometry(2.6, 5, 12).rotateX(Math.PI), F.hot, 0, 2.5, 0, false);
      add(new T.SphereGeometry(0.9, 8, 6), F.eye, 0, 46.2, 0, false);
    } else if (type === 'CONVEYOR') {
      add(new T.BoxGeometry(30, 1, 4), F.dark, 0, 5, 0);
      add(new T.BoxGeometry(30, 0.3, 3.4), F.oreDark, 0, 5.6, 0);
      for (let x = -12; x <= 12; x += 6) add(new T.DodecahedronGeometry(0.8, 0), F.ore, x + (k % 2) * 3, 6.2, 0);
      for (const x of [-12, 12]) for (const s of [-1, 1]) add(new T.BoxGeometry(0.6, 5, 0.6), F.steel, x, 2.5, s * 1.8);
      for (const s of [-1, 1]) add(new T.BoxGeometry(30, 1.2, 0.3), F.yellow, 0, 6, s * 2.1);
    }
  },
}));
