/* ============================================================
   THE FACTORY DISTRICT · BUILD 2 · THE ORE LINE & SMELTER
   Keep this file in projects/factorydistrict next to factorydistrict.html.
   The ore comes up out of the depot through a tunnel, rides a
   conveyor to the smelter and comes out as clean metal ingots.
   Every bit of heat is caught and used again — no smoke.
   ============================================================ */
(window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(window.FAC.build({
  id: 2, name: 'THE ORE LINE & SMELTER',
  brief: 'The ore comes up from the depot through a tunnel, rides a conveyor to the smelter and comes out as clean metal ingots — no smoke, every bit of heat used again.',
  types: {
    PORTAL:  { code: 'MN', name: 'ORE TUNNEL PORTAL', col: '#8a5a3a', w: 40, d: 30, h: 16 },
    ORECONV: { code: 'SF', name: 'ORE CONVEYOR', col: '#6c757d', w: 30, d: 6, h: 6 },
    SMELTER: { code: 'FB', name: 'SMELTER', col: '#d9731b', w: 50, d: 60, h: 36 },
    INGOTS:  { code: 'FB', name: 'INGOT YARD', col: '#b8bcc2', w: 40, d: 30, h: 6 },
  },
  order: ['PORTAL', 'ORECONV', 'SMELTER', 'INGOTS'],
  at: { PORTAL: [[255, -200]], ORECONV: [[290, -200], [320, -200], [350, -200], [380, -200], [410, -200], [440, -200]], SMELTER: [[490, -200]], INGOTS: [[565, -240], [565, -160]] },
  eye: [-220, 140, 260],
  stats(api, c) { return [['ORE TUNNEL', c('PORTAL') ? 'OPEN TO THE DEPOT' : 'NOT YET'], ['CONVEYOR', c('ORECONV') * 30 + ' / 180 m'], ['SMELTER', c('SMELTER') ? 'MELTING' : 'NOT YET'], ['INGOT YARDS', c('INGOTS') + ' / 2']]; },
  make(type, k, g, add, F, api) {
    const T = api.THREE, FA = window.FAC;
    if (type === 'PORTAL') {
      const mound = add(new T.SphereGeometry(20, 24, 10, 0, Math.PI * 2, 0, Math.PI / 2), F.roof, -6, 0, 0); mound.scale.set(1, 0.5, 1.1);
      add(new T.BoxGeometry(6, 12, 20), F.stone, 12, 6, 0);
      add(new T.BoxGeometry(2, 9, 12), F.hole, 15.2, 4.5, 0, false);
      add(new T.TorusGeometry(7, 0.9, 8, 24, Math.PI), F.panel, 15.6, 1, 0).rotation.y = Math.PI / 2;
      const sign = api.canvasTex(512, 96, (c, w, h) => { c.fillStyle = '#12233a'; c.fillRect(0, 0, w, h); c.fillStyle = '#e0a070'; c.font = 'bold 48px Arial'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('FROM THE ORE DEPOT', w / 2, h / 2 + 2); });
      const m = new T.Mesh(new T.PlaneGeometry(18, 3.4), new T.MeshBasicMaterial({ map: sign })); m.position.set(15.3, 11, 0); m.rotation.y = Math.PI / 2; g.add(m);
      add(new T.BoxGeometry(14, 1, 4), F.dark, 22, 4, 0);
    } else if (type === 'ORECONV') {
      add(new T.BoxGeometry(30, 1, 4), F.dark, 0, 4, 0);
      add(new T.BoxGeometry(30, 0.3, 3.4), F.oreDark, 0, 4.6, 0);
      for (let x = -12; x <= 12; x += 6) add(new T.DodecahedronGeometry(0.8, 0), F.ore, x + (k % 2) * 3, 5.2, 0);
      for (const x of [-12, 12]) for (const s of [-1, 1]) add(new T.BoxGeometry(0.6, 4, 0.6), F.steel, x, 2, s * 1.8);
      for (const s of [-1, 1]) add(new T.BoxGeometry(30, 1.2, 0.3), F.yellow, 0, 5, s * 2.1);
    } else if (type === 'SMELTER') {
      add(new T.BoxGeometry(50, 2, 60), F.stoneDark, 0, 1, 0);
      add(new T.BoxGeometry(44, 22, 54), F.panel, 0, 13, 0);
      add(new T.BoxGeometry(44.6, 1, 54.6), F.gold, 0, 24.4, 0);
      for (const z of [-14, 14]) { add(new T.CylinderGeometry(8, 9, 12, 20), F.copper, 0, 31, z); add(new T.CylinderGeometry(8.1, 8.1, 1.4, 20, 1, true), F.hot, 0, 32, z, false); add(new T.SphereGeometry(8, 20, 8, 0, Math.PI * 2, 0, Math.PI / 2), F.white, 0, 37, z); }
      for (let z = -22; z <= 22; z += 11) add(new T.BoxGeometry(0.4, 5, 6), F.hot, -22.2, 9, z, false);
      add(new T.BoxGeometry(10, 9, 0.4), F.dark, 12, 5.5, 27.2, false);
      // the heat-recovery loop instead of a chimney
      add(new T.TorusGeometry(20, 1, 8, 32, Math.PI).rotateY(Math.PI / 2), F.steel, 0, 25, 0);
      FA.person(g, { kind: 'worker', seed: 10201, female: true }, 'tablet', -30, 0, 8, Math.PI / 2);
    } else if (type === 'INGOTS') {
      add(new T.BoxGeometry(40, 0.6, 30), F.stoneDark, 0, 0.3, 0);
      for (let r = 0; r < 4; r++) for (let c = 0; c < 5; c++) for (let l = 0; l < 3; l++) add(new T.BoxGeometry(5, 1.2, 1.8), F.metal, -14 + c * 7, 1.2 + l * 1.25, -10 + r * 6 + (l % 2) * 0.6);
      if (k === 0) FA.person(g, { kind: 'worker', seed: 10202, female: false }, 'carry', 16, 0.6, 0, 0);
    }
  },
}));
