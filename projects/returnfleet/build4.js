/* ============================================================
   THE RETURN FLEET · BUILD 4 · THE FLEET SHIPYARD
   Keep this file in projects/returnfleet next to returnfleet.html.
   Four tall yard towers round the shipyard pad, two travelling
   bridge cranes over it, and the cradles a new Ark will be built
   on — made with metal from the moon ore.
   ============================================================ */
(window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(window.FLEET.build({
  id: 4, name: 'THE FLEET SHIPYARD',
  brief: 'Four yard towers round the shipyard pad, two bridge cranes over it, and the cradles a new Ark will be built on — from metal made of moon ore.',
  types: {
    YARDTOWER: { code: 'SF', name: 'YARD TOWER', col: '#6c757d', w: 14, d: 14, h: 92 },
    YARDCRANE: { code: 'HP', name: 'BRIDGE CRANE', col: '#d9a21b', w: 176, d: 14, h: 10 },
    CRADLE:    { code: 'SF', name: 'HULL CRADLE', col: '#6c757d', w: 90, d: 12, h: 12 },
  },
  order: ['YARDTOWER', 'CRADLE', 'YARDCRANE'],
  at: {
    YARDTOWER: [[296, -235], [464, -235], [296, 235], [464, 235]],
    CRADLE: [[380, -150], [380, -50], [380, 50], [380, 150]],
    YARDCRANE: [[380, -90], [380, 90]],
  },
  eye: [-260, 170, 300],
  stats(api, c) { return [['YARD TOWERS', c('YARDTOWER') + ' / 4'], ['BRIDGE CRANES', c('YARDCRANE') + ' / 2'], ['HULL CRADLES', c('CRADLE') + ' / 4']]; },
  make(type, k, g, add, F, api) {
    const T = api.THREE, FL = window.FLEET;
    if (type === 'YARDTOWER') {
      add(new T.BoxGeometry(14, 3, 14), F.dark, 0, 1.5, 0);
      for (const [x, z] of [[-5, -5], [5, -5], [-5, 5], [5, 5]]) add(new T.BoxGeometry(1.4, 86, 1.4), F.yellow, x, 46, z);
      for (let y = 10; y < 88; y += 10) for (const [w, d, x, z] of [[11, 0.8, 0, -5], [11, 0.8, 0, 5], [0.8, 11, -5, 0], [0.8, 11, 5, 0]]) add(new T.BoxGeometry(w, 0.8, d), F.yellow, x, y, z);
      add(new T.BoxGeometry(16, 4, 16), F.armor, 0, 90, 0);
      const red = new T.Mesh(new T.SphereGeometry(1, 8, 6), new T.MeshBasicMaterial({ color: 0xff3020 })); red.position.y = 93; red.userData.keep = true; g.add(red); api.blink(red, 1.5, 0xff3020);
      if (k === 0) FL.person(g, { kind: 'worker', seed: 9951, female: false }, 'tablet', -10, 0, 10, Math.PI / 2);
    } else if (type === 'YARDCRANE') {
      // a bridge across the pad between the towers' rails, with a trolley and its hook
      add(new T.BoxGeometry(176, 6, 8), F.yellow, 0, 84, 0);
      for (const s of [-1, 1]) add(new T.BoxGeometry(6, 8, 12), F.armor, s * 85, 84, 0);
      add(new T.BoxGeometry(14, 5, 10), F.dark, (k ? 30 : -20), 79, 0);
      add(new T.CylinderGeometry(0.3, 0.3, 30, 6), F.steel, (k ? 30 : -20), 62, 0);
      add(new T.BoxGeometry(6, 2, 6), F.yellow, (k ? 30 : -20), 46, 0);
      add(new T.BoxGeometry(176, 0.4, 0.4), F.glow, 0, 80.8, 4.2, false);
    } else if (type === 'CRADLE') {
      for (const x of [-34, 34]) { add(new T.BoxGeometry(16, 12, 10), F.armor, x, 6, 0); add(new T.BoxGeometry(18, 1.2, 11), F.yellow, x, 12.6, 0); }
      add(new T.BoxGeometry(84, 2, 4), F.dark, 0, 1, 0);
      if (k === 1) FL.person(g, { kind: 'worker', seed: 9960, female: true }, 'kneelWork', 0, 2, 4, 0);
    }
  },
}));
