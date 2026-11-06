/* ============================================================
   THE UNITY ORE DEPOT · BUILD 2 · THE SHAFT
   Keep this file in projects/oredepot next to oredepot.html.
   A great shaft 64 m across, bored deep into the rock beside the
   landing field, with a reinforced collar round its mouth and
   eight guide lights so the Ark can line up over it.
   ============================================================ */
(window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(window.DEPOT.build({
  id: 2, name: 'THE SHAFT',
  brief: 'A shaft 64 m across bored deep into the rock, with a reinforced collar round its mouth and eight guide lights so the Ark can line up over it.',
  types: {
    COLLAR: { code: 'SF', name: 'SHAFT COLLAR', col: '#6c757d', w: 76, d: 76, h: 6 },
    GUIDE:  { code: 'HP', name: 'GUIDE LIGHT', col: '#b03a2e', w: 4, d: 4, h: 14 },
  },
  order: ['COLLAR', 'GUIDE'],
  at: { COLLAR: [[0, 0]], GUIDE: Array.from({ length: 8 }, (_, i) => { const a = i / 8 * Math.PI * 2 + Math.PI / 8; return [Math.round(Math.cos(a) * 46 * 100) / 100, Math.round(Math.sin(a) * 46 * 100) / 100]; }) },
  eye: [-160, 110, 180],
  stats(api, c) { return [['SHAFT', c('COLLAR') ? '64 m ACROSS · 900 m DEEP' : 'NOT YET'], ['GUIDE LIGHTS', c('GUIDE') + ' / 8']]; },
  make(type, k, g, add, F, api) {
    const T = api.THREE, D = window.DEPOT;
    if (type === 'COLLAR') {
      // the dark mouth of the shaft, its wall going down into the rock, and a heavy collar round the rim
      add(new T.CircleGeometry(32, 64).rotateX(-Math.PI / 2), F.hole, 0, 0.15, 0, false);
      add(new T.CylinderGeometry(32, 32, 5, 64, 1, true), F.shaftWall, 0, 2.3, 0, false).material.side = T.BackSide;
      const ring = new T.Shape(); ring.absarc(0, 0, 38, 0, Math.PI * 2, false); const hole = new T.Path(); hole.absarc(0, 0, 32, 0, Math.PI * 2, true); ring.holes.push(hole);
      add(new T.ExtrudeGeometry(ring, { depth: 5, bevelEnabled: false, curveSegments: 64 }).rotateX(-Math.PI / 2), F.stone, 0, 0, 0);
      add(new T.TorusGeometry(35, 0.6, 6, 96).rotateX(Math.PI / 2), F.yellow, 0, 5.1, 0, false);
      for (let i = 0; i < 24; i++) { const a = i / 24 * Math.PI * 2; add(new T.BoxGeometry(1.2, 0.3, 4), i % 2 ? F.dark : F.yellow, Math.cos(a) * 35, 5.2, Math.sin(a) * 35, false).rotation.y = -a; }
      for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2; add(new T.BoxGeometry(1.2, 0.8, 0.4), F.lamp, Math.cos(a) * 31.6, 3.4, Math.sin(a) * 31.6, false).rotation.y = -a + Math.PI / 2; }
      D.person(g, { kind: 'worker', seed: 9601, female: false }, 'tablet', -44, 0, 6, Math.PI / 2);
      D.person(g, { kind: 'worker', seed: 9602, female: true }, 'kneelWork', -40, 0, -10, Math.PI / 2);
    } else if (type === 'GUIDE') {
      add(new T.CylinderGeometry(1.2, 1.6, 2, 10), F.dark, 0, 1, 0);
      add(new T.CylinderGeometry(0.5, 0.7, 12, 8), F.steel, 0, 8, 0);
      const l = new T.Mesh(new T.SphereGeometry(1, 10, 8), new T.MeshBasicMaterial({ color: 0xff8020 })); l.position.y = 14.6; l.userData.keep = true; g.add(l); api.blink(l, 1.2, 0xff8020);
    }
  },
}));
