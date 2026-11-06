/* ============================================================
   FARMLANDS OF UNITY · BUILD 5 · THE HARVEST HALL
   Keep this file in projects/farmlands next to farmlands.html.
   The harvest hall where the crops are sorted and packed, a food
   processor, and four grain silos beside the reservoir.
   ============================================================ */
(window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(window.FARM.build({
  id: 5, name: 'THE HARVEST HALL',
  brief: 'The harvest hall where the crops are sorted and packed, a food processor beside it, and four grain silos by the reservoir.',
  types: {
    HALL: { code: 'FP', name: 'HARVEST HALL', col: '#d9b13a', w: 70, d: 110, h: 20 },
    PROC: { code: 'FP', name: 'FOOD PROCESSOR', col: '#c8a03a', w: 20, d: 30, h: 22 },
    SILO: { code: 'FP', name: 'GRAIN SILO', col: '#e8e2d8', w: 18, d: 18, h: 34 },
  },
  order: ['HALL', 'PROC', 'SILO'],
  at: {
    HALL: [[660, -170]],
    PROC: [[600, -170]],
    SILO: [[650, 120], [650, 160], [650, 200], [650, 240]],
  },
  stats(api, c) { return [['HARVEST HALL', c('HALL') ? 'OPEN' : 'NOT YET'], ['FOOD PROCESSOR', c('PROC') ? 'RUNNING' : 'NOT YET'], ['GRAIN SILOS', c('SILO') + ' / 4'], ['STORAGE', (c('SILO') * 6000).toLocaleString() + ' t']]; },
  make(type, k, g, add, F, api) {
    const T = api.THREE;
    if (type === 'HALL') {
      add(new T.BoxGeometry(70, 1, 110), F.stoneDark, 0, 0.5, 0);
      add(new T.BoxGeometry(66, 16, 106), F.white, 0, 9, 0);
      add(new T.BoxGeometry(67, 0.8, 107), F.gold, 0, 17.2, 0);
      add(new T.BoxGeometry(62, 1, 102), F.roof, 0, 18, 0);
      for (let z = -40; z <= 40; z += 20) add(new T.BoxGeometry(44, 0.2, 9), F.solar, 0, 18.6, z, false);
      // big doors on the field side, a glowing window band all round, and a loading dock
      for (const z of [-30, 0, 30]) { add(new T.BoxGeometry(0.4, 10, 14), F.dark, -33.2, 6, z, false); add(new T.BoxGeometry(0.5, 0.6, 15), F.gold, -33.3, 11.3, z, false); }
      add(new T.BoxGeometry(66.4, 1.2, 106.4), F.glow, 0, 13.6, 0, false);
      add(new T.BoxGeometry(10, 1.4, 90), F.stone, -38, 0.7, 0);
      for (let i = 0; i < 6; i++) add(new T.BoxGeometry(2.4, 2.4, 2.4), i % 2 ? F.wood : F.crops[i % 5], -38, 2.6, -36 + i * 14);
      window.FARM.person(g, window.FARM.civ(8501), 'carry', -38, 1.4, -20, Math.PI);
      window.FARM.person(g, { kind: 'worker', seed: 8502, female: true }, 'tablet', -39, 1.4, 12, -Math.PI / 2);
    } else if (type === 'PROC') {
      add(new T.BoxGeometry(20, 12, 30), F.white, 0, 6, 0);
      add(new T.BoxGeometry(20.6, 0.6, 30.6), F.gold, 0, 12.3, 0);
      for (const z of [-8, 8]) { add(new T.CylinderGeometry(4, 4, 10, 20), F.steel, 0, 17, z); add(new T.SphereGeometry(4, 20, 10, 0, Math.PI * 2, 0, Math.PI / 2), F.white, 0, 22, z); add(new T.TorusGeometry(4.1, 0.3, 6, 24).rotateX(Math.PI / 2), F.glow, 0, 19, z, false); }
      add(new T.BoxGeometry(12, 3, 3), F.steel, 16, 9, 0);
    } else if (type === 'SILO') {
      add(new T.CylinderGeometry(9, 9, 2, 24), F.stoneDark, 0, 1, 0);
      add(new T.CylinderGeometry(8, 8, 28, 24), F.white, 0, 16, 0);
      add(new T.SphereGeometry(8, 24, 10, 0, Math.PI * 2, 0, Math.PI / 2), F.gold, 0, 30, 0);
      for (const y of [8, 16, 24]) add(new T.TorusGeometry(8.1, 0.3, 6, 32).rotateX(Math.PI / 2), F.steel, 0, y, 0);
      add(new T.TorusGeometry(8.15, 0.25, 6, 32).rotateX(Math.PI / 2), F.glow, 0, 28.5, 0, false);
      add(new T.BoxGeometry(1.2, 28, 1.2), F.steel, -8.4, 15, 0);
    }
  },
}));
