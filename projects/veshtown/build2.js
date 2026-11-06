/* ============================================================
   THE TOWN ON VESH · BUILD 2 · THE ICE MINE & WATER WORKS
   Keep this file in projects/veshtown next to veshtown.html.
   In a crater that never sees the sun lies old ice. Three drills
   cut it out, the water works melts it into clean water and
   splits some into air to breathe, and the tanks store it.
   ============================================================ */
(window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(window.VESH.build({
  id: 2, name: 'THE ICE MINE & WATER WORKS',
  brief: 'Old ice in a crater that never sees the sun: three drills cut it out, the water works melts it into water and air, and the tanks store it.',
  types: {
    ICECRATER:  { code: 'WR', name: 'ICE CRATER WORKINGS', col: '#8fb8d0', w: 130, d: 130, h: 12 },
    ICEDRILL:   { code: 'MN', name: 'ICE DRILL', col: '#d9731b', w: 12, d: 12, h: 30 },
    WATERWORKS: { code: 'WR', name: 'WATER WORKS', col: '#2f8fb0', w: 44, d: 40, h: 22 },
    WTANK:      { code: 'WR', name: 'WATER & AIR TANK', col: '#e8e1d1', w: 18, d: 18, h: 24 },
  },
  order: ['ICECRATER', 'ICEDRILL', 'WATERWORKS', 'WTANK'],
  at: { ICECRATER: [[420, -260]], ICEDRILL: [[420, -228], [392, -276], [448, -276]], WATERWORKS: [[560, -260]], WTANK: [[625, -305], [625, -260], [625, -215]] },
  eye: [-220, 150, 260],
  stats(api, c) { return [['ICE WORKINGS', c('ICECRATER') ? 'OPEN' : 'NOT YET'], ['ICE DRILLS', c('ICEDRILL') + ' / 3'], ['WATER WORKS', c('WATERWORKS') ? 'RUNNING' : 'NOT YET'], ['TANKS', c('WTANK') + ' / 3'], ['WATER', (c('WATERWORKS') ? 900 : 0) + ' t / day']]; },
  make(type, k, g, add, F, api) {
    const T = api.THREE, V = window.VESH;
    if (type === 'ICECRATER') {
      // a dark crater floor with old blue-white ice, and a raised rim of dug rock
      add(new T.CircleGeometry(52, 48).rotateX(-Math.PI / 2), F.oreDark, 0, 0.3, 0, false);
      for (let i = 0; i < 14; i++) { const a = i * 2.39, r = 8 + (i % 5) * 8; const p = add(new T.CircleGeometry(5 + (i % 3) * 4, 16).rotateX(-Math.PI / 2), F.ice, Math.cos(a) * r, 0.45 + i * 0.01, Math.sin(a) * r, false); }
      const ring = new T.Shape(); ring.absarc(0, 0, 64, 0, Math.PI * 2, false); const hole = new T.Path(); hole.absarc(0, 0, 52, 0, Math.PI * 2, true); ring.holes.push(hole);
      add(new T.ExtrudeGeometry(ring, { depth: 8, bevelEnabled: false, curveSegments: 48 }).rotateX(-Math.PI / 2), F.rock, 0, 0, 0);
      for (let i = 0; i < 6; i++) { const a = i / 6 * Math.PI * 2 + 0.3; add(new T.CylinderGeometry(0.4, 0.4, 10, 6), F.steel, Math.cos(a) * 58, 13, Math.sin(a) * 58); add(new T.BoxGeometry(3, 1, 1.6), F.window, Math.cos(a) * 58, 18.4, Math.sin(a) * 58, false); }
      for (let i = 0; i < 2; i++) V.person(g, { kind: 'astro', seed: 11201 + i, stripe: ['#2e7cc8', '#e8c13a'][i] }, i ? 'tablet' : 'kneelWork', -10 + i * 14, 0.4, 14, i);
    } else if (type === 'ICEDRILL') {
      add(new T.BoxGeometry(12, 3, 12), F.dark, 0, 1.5, 0);
      for (const [x, z] of [[-3.5, -3.5], [3.5, -3.5], [-3.5, 3.5], [3.5, 3.5]]) add(new T.BoxGeometry(1, 26, 1), F.orange, x, 16, z);
      for (let y = 6; y < 28; y += 6) for (const [w, d, x, z] of [[8, 0.6, 0, -3.5], [8, 0.6, 0, 3.5], [0.6, 8, -3.5, 0], [0.6, 8, 3.5, 0]]) add(new T.BoxGeometry(w, 0.6, d), F.orange, x, y, z);
      add(new T.BoxGeometry(9, 3, 9), F.yellow, 0, 30, 0);
      add(new T.CylinderGeometry(1.2, 1.2, 24, 12), F.steel, 0, 14, 0);
      add(new T.ConeGeometry(2.2, 4, 12).rotateX(Math.PI), F.ice, 0, 2, 0, false);
    } else if (type === 'WATERWORKS') {
      add(new T.BoxGeometry(44, 2, 40), F.dark, 0, 1, 0);
      add(new T.BoxGeometry(40, 14, 36), F.panel, 0, 9, 0);
      add(new T.BoxGeometry(40.6, 1, 36.6), F.gold, 0, 16.4, 0);
      for (const x of [-10, 10]) { add(new T.SphereGeometry(7, 20, 10, 0, Math.PI * 2, 0, Math.PI / 2), F.glass, x, 17, 0, false); add(new T.CylinderGeometry(6.8, 6.8, 0.4, 20), F.water, x, 17.4, 0, false); }
      add(new T.BoxGeometry(40.4, 1, 36.4), F.glow, 0, 12, 0, false);
      add(new T.BoxGeometry(50, 1.4, 1.4), F.steel, -45, 4, 0);
      V.person(g, { kind: 'astro', seed: 11210, stripe: '#3ec85a' }, 'tablet', -26, 0, 8, Math.PI / 2);
    } else if (type === 'WTANK') {
      add(new T.CylinderGeometry(9, 9, 2, 24), F.dark, 0, 1, 0);
      add(new T.CylinderGeometry(8, 8, 16, 24), F.white, 0, 10, 0);
      add(new T.SphereGeometry(8, 24, 10, 0, Math.PI * 2, 0, Math.PI / 2), k === 1 ? F.foil : F.white, 0, 18, 0);
      add(new T.TorusGeometry(8.1, 0.35, 6, 32).rotateX(Math.PI / 2), k === 1 ? F.glow : F.steel, 0, 12, 0, false);
      add(new T.BoxGeometry(1, 16, 1), F.steel, 8.4, 10, 0);
    }
  },
}));
