/* ============================================================
   FARMLANDS OF UNITY · BUILD 3 · THE FIRST FIELDS
   Keep this file in projects/farmlands next to farmlands.html.
   Twelve planted fields along the canals — grain, greens, corn,
   beans and sunflowers — and four farm robots to tend them.
   ============================================================ */
(window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(window.FARM.build({
  id: 3, name: 'THE FIRST FIELDS',
  brief: 'Twelve planted fields along the canals — grain, greens, corn, beans and sunflowers — and four farm robots to tend them.',
  types: {
    FIELD: { code: 'GD', name: 'PLANTED FIELD', col: '#3a7d44', w: 80, d: 70, h: 3 },
    FARMBOT: { code: 'FB', name: 'FARM ROBOT', col: '#e8c13a', w: 4, d: 5, h: 5 },
  },
  order: ['FIELD', 'FARMBOT'],
  at: {
    FIELD: [[340, 90], [440, 90], [540, 90], [340, -90], [440, -90], [540, -90], [340, 180], [440, 180], [540, 180], [340, -180], [440, -180], [540, -180]],
    FARMBOT: [[340, 135], [540, 135], [340, -135], [540, -135]],
  },
  stats(api, c) { return [['FIELDS', c('FIELD') + ' / 12'], ['PLANTED', (c('FIELD') * 5600).toLocaleString() + ' m²'], ['FARM ROBOTS', c('FARMBOT') + ' / 4']]; },
  make(type, k, g, add, F, api) {
    const T = api.THREE;
    if (type === 'FIELD') {
      add(new T.BoxGeometry(80, 0.6, 70), F.soil, 0, 0.3, 0);
      const crop = F.crops[k % 5], tall = [1.2, 1.0, 2.6, 0.8, 2.0][k % 5];
      for (let z = -32; z <= 32; z += 5) add(new T.BoxGeometry(76, tall, 2.4), crop, 0, 0.6 + tall / 2, z);
      if (k % 5 === 4) for (let z = -32; z <= 32; z += 5) for (let x = -36; x <= 36; x += 6) add(new T.SphereGeometry(0.7, 6, 4), F.flower, x, 0.6 + tall + 0.4, z, false);
      if (k % 5 === 3) for (let z = -32; z <= 32; z += 10) for (let x = -34; x <= 34; x += 8) add(new T.SphereGeometry(0.4, 5, 4), F.berry, x, 0.6 + tall, z + 1, false);
      // a low hedge round the edge and an irrigation line across the middle
      for (const [w, d, x, z] of [[80, 0.8, 0, 35.4], [80, 0.8, 0, -35.4], [0.8, 70, 40.4, 0], [0.8, 70, -40.4, 0]]) add(new T.BoxGeometry(w, 1.4, d), F.crops[2], x, 0.7, z);
      add(new T.BoxGeometry(78, 0.4, 0.4), F.steel, 0, 3.4, 0);
      for (let x = -36; x <= 36; x += 18) add(new T.CylinderGeometry(0.2, 0.2, 3.4, 6), F.steel, x, 1.7, 0);
      if (k === 0 || k === 4 || k === 9) window.FARM.person(g, window.FARM.civ(8300 + k), 'kneelWork', -20 + k * 2, 0.6, 15, Math.PI / 2);
    } else if (type === 'FARMBOT') {
      add(new T.BoxGeometry(3, 1.6, 4), F.white, 0, 1.6, 0);
      add(new T.BoxGeometry(3.1, 0.3, 4.1), F.gold, 0, 2.5, 0);
      for (const [x, z] of [[-1.7, -1.4], [1.7, -1.4], [-1.7, 1.4], [1.7, 1.4]]) add(new T.CylinderGeometry(0.7, 0.7, 0.5, 14).rotateZ(Math.PI / 2), F.dark, x, 0.7, z);
      add(new T.CylinderGeometry(0.2, 0.25, 2.2, 8), F.steel, 0, 3.6, -1);
      add(new T.SphereGeometry(0.5, 12, 8), F.eye, 0, 4.8, -1, false);
      const arm = add(new T.BoxGeometry(0.3, 0.3, 2.6), F.steel, 0, 2.4, 2.8); arm.rotation.x = 0.5;
      add(new T.BoxGeometry(2.6, 0.08, 2.2), F.solar, 0, 2.7, 0, false);
    }
  },
}));
