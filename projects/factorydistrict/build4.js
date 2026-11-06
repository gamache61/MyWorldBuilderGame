/* ============================================================
   THE FACTORY DISTRICT · BUILD 4 · THE PARTS FACTORIES
   Keep this file in projects/factorydistrict next to factorydistrict.html.
   Three factories turn Unity's own metal into the parts every
   build needs: the Frame Works (beams and deck frames), the Plate
   Works (hull and shield plates) and the Machine Works (systems,
   tools and power parts).
   ============================================================ */
(window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(window.FAC.build({
  id: 4, name: 'THE PARTS FACTORIES',
  brief: 'Three factories turn Unity metal into parts: the Frame Works (beams and frames), the Plate Works (hull and shield plates) and the Machine Works (systems, tools and power parts).',
  types: { WORKS: { code: 'FB', name: 'PARTS FACTORY', col: '#e8c13a', w: 100, d: 70, h: 24 } },
  order: ['WORKS'],
  at: { WORKS: [[330, 40], [470, 40], [610, 40]] },
  eye: [-260, 150, 280],
  stats(api, c) { return [['FRAME WORKS', c('WORKS') > 0 ? 'MAKING BEAMS' : 'NOT YET'], ['PLATE WORKS', c('WORKS') > 1 ? 'MAKING PLATES' : 'NOT YET'], ['MACHINE WORKS', c('WORKS') > 2 ? 'MAKING MACHINES' : 'NOT YET']]; },
  make(type, k, g, add, F, api) {
    const T = api.THREE, FA = window.FAC;
    const NAMES = ['FRAME WORKS', 'PLATE WORKS', 'MACHINE WORKS'], ROOF = [F.grey, F.red, F.white], STACK = [F.grey, F.red, F.yellow];
    add(new T.BoxGeometry(100, 2, 70), F.stoneDark, 0, 1, 0);
    add(new T.BoxGeometry(96, 16, 66), F.white, 0, 10, 0);
    // a saw-tooth roof with glass to let the daylight in
    for (let z = -27; z <= 27; z += 13.5) { const r = add(new T.BoxGeometry(96, 0.6, 12), ROOF[k], 0, 21, z - 2); r.rotation.x = -0.45; add(new T.BoxGeometry(96, 5, 0.4), F.glass, 0, 20.5, z + 3.5, false); }
    add(new T.BoxGeometry(96.6, 1, 66.6), F.gold, 0, 18.3, 0);
    add(new T.BoxGeometry(96.4, 1, 66.4), F.glow, 0, 14, 0, false);
    for (const x of [-30, 0, 30]) add(new T.BoxGeometry(14, 10, 0.4), F.dark, x, 6, 33.2, false);
    const sign = api.canvasTex(512, 96, (c, w, h) => { c.fillStyle = '#12233a'; c.fillRect(0, 0, w, h); c.fillStyle = '#ffc850'; c.font = 'bold 54px Arial'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(NAMES[k], w / 2, h / 2 + 2); });
    const m = new T.Mesh(new T.PlaneGeometry(40, 7.5), new T.MeshBasicMaterial({ map: sign })); m.position.set(0, 15.5, 33.3); g.add(m);
    // finished parts waiting outside
    for (let i = 0; i < 9; i++) {
      const x = -40 + (i % 3) * 4, z = 40 + ((i / 3) | 0) * 6;
      if (k === 0) add(new T.BoxGeometry(2, 2, 12), STACK[k], x, 1 + ((i / 3) | 0) * 0, z - 4);
      else if (k === 1) add(new T.BoxGeometry(10, 0.8, 8), STACK[k], x + 2, 0.4 + i * 0.85, 44);
      else add(new T.BoxGeometry(3, 3, 3), STACK[k], x, 1.5, z - 4);
    }
    FA.person(g, { kind: 'worker', seed: 10400 + k, female: k === 1 }, k === 1 ? 'carry' : 'tablet', -30, 0, 40, 0);
    FA.person(g, FA.civ(10410 + k), 'idle', 20, 0, 38, Math.PI);
  },
}));
