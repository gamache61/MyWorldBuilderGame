/* ============================================================
   THE UNITY ORE DEPOT · BUILD 3 · THE UNDERGROUND STORE
   Keep this file in projects/oredepot next to oredepot.html.
   A cavern store deep under the plateau where the moon ore will
   be kept. On the surface you see its tunnel entrance, a service
   lift, glowing skylights and the clean-air vents.
   ============================================================ */
(window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(window.DEPOT.build({
  id: 3, name: 'THE UNDERGROUND STORE',
  brief: 'A cavern store deep under the plateau for the moon ore. On the surface: the tunnel entrance, a service lift, glowing skylights and clean-air vents.',
  types: {
    TUNNEL:   { code: 'SF', name: 'TUNNEL ENTRANCE', col: '#6c757d', w: 40, d: 30, h: 16 },
    SLIFT:    { code: 'SY', name: 'SERVICE LIFT', col: '#e8e1d1', w: 16, d: 16, h: 24 },
    SKYLIGHT: { code: 'SY', name: 'STORE SKYLIGHT', col: '#5fa6c8', w: 28, d: 28, h: 5 },
    VENT:     { code: 'SY', name: 'AIR VENT', col: '#e8e1d1', w: 10, d: 10, h: 26 },
  },
  order: ['TUNNEL', 'SLIFT', 'SKYLIGHT', 'VENT'],
  at: {
    TUNNEL: [[-150, 0]],
    SLIFT: [[-80, -300]],
    SKYLIGHT: [[-60, 110], [-60, -110], [-130, 230], [-130, -230]],
    VENT: [[-115, 130], [-115, -130], [-60, 280], [-60, -200]],
  },
  eye: [-220, 140, 200],
  stats(api, c) { return [['TUNNEL', c('TUNNEL') ? 'OPEN' : 'NOT YET'], ['SERVICE LIFT', c('SLIFT') ? 'RUNNING' : 'NOT YET'], ['SKYLIGHTS', c('SKYLIGHT') + ' / 4'], ['AIR VENTS', c('VENT') + ' / 4'], ['STORE SIZE', c('TUNNEL') ? '1.2 km of caverns' : '—']]; },
  make(type, k, g, add, F, api) {
    const T = api.THREE, D = window.DEPOT;
    if (type === 'TUNNEL') {
      // a low grassy mound with the tunnel mouth facing west, and the road going down into it
      const mound = add(new T.SphereGeometry(22, 24, 10, 0, Math.PI * 2, 0, Math.PI / 2), F.roof, 6, 0, 0); mound.scale.set(1, 0.5, 1.2);
      add(new T.BoxGeometry(6, 12, 22), F.stone, -14, 6, 0);
      add(new T.BoxGeometry(2, 10, 16), F.hole, -17.2, 5, 0, false);
      add(new T.TorusGeometry(8, 1, 8, 24, Math.PI), F.panel, -17.6, 2, 0).rotation.y = Math.PI / 2;
      add(new T.BoxGeometry(30, 0.4, 14), F.stoneDark, -32, 0.2, 0);
      for (const s of [-1, 1]) add(new T.BoxGeometry(30, 1.6, 0.6), F.yellow, -32, 0.8, s * 7);
      for (let i = 0; i < 4; i++) add(new T.BoxGeometry(0.6, 0.6, 3), F.lamp, -17.4, 9.6, -6 + i * 4, false);
      D.person(g, { kind: 'worker', seed: 9701, female: true }, 'tablet', -36, 0.4, 4, -Math.PI / 2);
    } else if (type === 'SLIFT') {
      add(new T.BoxGeometry(16, 20, 16), F.white, 0, 10, 0);
      add(new T.BoxGeometry(16.6, 1, 16.6), F.gold, 0, 20.5, 0);
      add(new T.BoxGeometry(14, 1, 14), F.roof, 0, 21.4, 0);
      add(new T.BoxGeometry(6, 9, 0.4), F.dark, 0, 4.5, 8.2, false);
      add(new T.BoxGeometry(16.4, 1, 16.4), F.glow, 0, 16, 0, false);
      add(new T.CylinderGeometry(3, 3, 8, 16), F.steel, 0, 25.8, 0);
    } else if (type === 'SKYLIGHT') {
      // the cavern lights glow up through the glass
      add(new T.CylinderGeometry(14, 14.5, 1.4, 40), F.stone, 0, 0.7, 0);
      add(new T.CircleGeometry(12.5, 40).rotateX(-Math.PI / 2), F.lamp, 0, 1.0, 0, false);
      add(new T.SphereGeometry(12.6, 40, 8, 0, Math.PI * 2, 0, Math.PI / 2), F.glass, 0, 1.2, 0, false).scale.y = 0.3;
      for (let i = 0; i < 6; i++) { const r = new T.Mesh(new T.TorusGeometry(12.6, 0.25, 6, 24, Math.PI), F.white); r.position.y = 1.2; r.scale.y = 0.3; r.rotation.y = i / 6 * Math.PI; g.add(r); }
    } else if (type === 'VENT') {
      add(new T.BoxGeometry(10, 2, 10), F.stone, 0, 1, 0);
      add(new T.CylinderGeometry(3, 3.6, 22, 16), F.white, 0, 13, 0);
      add(new T.CylinderGeometry(3.6, 3.6, 2, 16), F.gold, 0, 24.5, 0);
      add(new T.CylinderGeometry(2.8, 2.8, 0.3, 16), F.dark, 0, 25.6, 0, false);
      add(new T.TorusGeometry(3.15, 0.25, 6, 24).rotateX(Math.PI / 2), F.glow, 0, 18, 0, false);
    }
  },
}));
