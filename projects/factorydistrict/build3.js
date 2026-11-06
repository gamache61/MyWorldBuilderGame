/* ============================================================
   THE FACTORY DISTRICT · BUILD 3 · THE ROLLING MILL & FOUNDRY
   Keep this file in projects/factorydistrict next to factorydistrict.html.
   A long rolling mill presses the hot metal into beams and plates,
   the foundry casts the heavy parts, and two heat exchangers carry
   the waste heat back to the smelter.
   ============================================================ */
(window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(window.FAC.build({
  id: 3, name: 'THE ROLLING MILL & FOUNDRY',
  brief: 'A long rolling mill presses hot metal into beams and plates, the foundry casts the heavy parts, and heat exchangers carry the waste heat back to the smelter.',
  types: {
    MILL:    { code: 'FB', name: 'ROLLING MILL', col: '#e8c13a', w: 120, d: 40, h: 22 },
    FOUNDRY: { code: 'FB', name: 'FOUNDRY', col: '#d9731b', w: 50, d: 40, h: 24 },
    HEATX:   { code: 'SY', name: 'HEAT EXCHANGER', col: '#e8e1d1', w: 20, d: 20, h: 30 },
  },
  order: ['MILL', 'FOUNDRY', 'HEATX'],
  at: { MILL: [[680, -200]], FOUNDRY: [[680, -115]], HEATX: [[790, -240], [790, -160]] },
  eye: [-240, 140, 260],
  stats(api, c) { return [['ROLLING MILL', c('MILL') ? 'ROLLING' : 'NOT YET'], ['FOUNDRY', c('FOUNDRY') ? 'CASTING' : 'NOT YET'], ['HEAT EXCHANGERS', c('HEATX') + ' / 2'], ['HEAT REUSED', c('HEATX') ? '96%' : '—']]; },
  make(type, k, g, add, F, api) {
    const T = api.THREE, FA = window.FAC;
    if (type === 'MILL') {
      add(new T.BoxGeometry(120, 2, 40), F.stoneDark, 0, 1, 0);
      add(new T.BoxGeometry(116, 14, 34), F.white, 0, 9, 0);
      add(new T.CylinderGeometry(10, 10, 118, 20, 1, false, Math.PI / 2, Math.PI).rotateZ(Math.PI / 2), F.panel, 0, 16, 0);
      add(new T.BoxGeometry(116.4, 1, 34.4), F.glow, 0, 13, 0, false);
      // the rollers and a glowing slab coming out of the end
      for (let x = -40; x <= 40; x += 20) add(new T.CylinderGeometry(2.4, 2.4, 14, 16).rotateX(Math.PI / 2), F.steel, x, 3.4, 19.5);
      add(new T.BoxGeometry(18, 1, 8), F.hot, 66, 2.2, 0, false);
      for (let i = 0; i < 6; i++) add(new T.BoxGeometry(12, 1.4, 2), F.metal, 66 + (i % 2) * 2, 3.4 + i * 1.5, -12);
      FA.person(g, { kind: 'worker', seed: 10301, female: false }, 'tablet', 64, 2, 12, -Math.PI / 2);
    } else if (type === 'FOUNDRY') {
      add(new T.BoxGeometry(50, 2, 40), F.stoneDark, 0, 1, 0);
      add(new T.BoxGeometry(46, 18, 36), F.panel, 0, 11, 0);
      add(new T.BoxGeometry(46.6, 1, 36.6), F.copper, 0, 20.4, 0);
      for (let x = -15; x <= 15; x += 15) add(new T.BoxGeometry(8, 6, 8), F.dark, x, 24, 0);
      add(new T.BoxGeometry(0.4, 6, 14), F.hot, -23.2, 6, 0, false);
      add(new T.BoxGeometry(46.4, 1, 36.4), F.glow, 0, 17, 0, false);
    } else if (type === 'HEATX') {
      add(new T.CylinderGeometry(10, 10, 2, 24), F.stoneDark, 0, 1, 0);
      add(new T.CylinderGeometry(7, 9, 24, 24), F.white, 0, 14, 0);
      for (const y of [6, 12, 18, 24]) add(new T.TorusGeometry(8.6 - y * 0.08, 0.4, 6, 24).rotateX(Math.PI / 2), F.copper, 0, y, 0);
      add(new T.TorusGeometry(7.1, 0.4, 6, 24).rotateX(Math.PI / 2), F.glow, 0, 26, 0, false);
      add(new T.BoxGeometry(60, 1.6, 1.6), F.steel, -40, 8, 0);
    }
  },
}));
