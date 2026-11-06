/* ============================================================
   THE FACTORY DISTRICT · BUILD 5 · THE WAREHOUSES
   Keep this file in projects/factorydistrict next to factorydistrict.html.
   Four great warehouses where the finished parts are stored and
   sorted into crates, ready for every build to come.
   ============================================================ */
(window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(window.FAC.build({
  id: 5, name: 'THE WAREHOUSES',
  brief: 'Four great warehouses where the finished parts are stored and sorted into crates, ready for every build to come.',
  types: { WAREHOUSE: { code: 'SF', name: 'WAREHOUSE', col: '#6c757d', w: 100, d: 60, h: 22 } },
  order: ['WAREHOUSE'],
  at: { WAREHOUSE: [[330, 200], [450, 200], [570, 200], [690, 200]] },
  eye: [-260, 150, 300],
  stats(api, c) { return [['WAREHOUSES', c('WAREHOUSE') + ' / 4'], ['STORAGE', (c('WAREHOUSE') * 6000).toLocaleString() + ' m²']]; },
  make(type, k, g, add, F, api) {
    const T = api.THREE, FA = window.FAC, cols = [F.grey, F.red, F.white, F.yellow, F.orange];
    add(new T.BoxGeometry(100, 1.4, 60), F.stoneDark, 0, 0.7, 0);
    add(new T.BoxGeometry(96, 14, 56), F.panel, 0, 8.4, 0);
    add(new T.CylinderGeometry(32, 32, 96, 32, 1, false, Math.PI / 2 - 1.05, 2.1).rotateZ(Math.PI / 2), F.white, 0, -12.2, 0);
    add(new T.BoxGeometry(96.4, 1, 56.4), F.glow, 0, 13, 0, false);
    for (const x of [-32, 0, 32]) add(new T.BoxGeometry(18, 11, 0.4), F.dark, x, 7, -28.2, false);
    const sign = api.canvasTex(512, 96, (c, w, h) => { c.fillStyle = '#12233a'; c.fillRect(0, 0, w, h); c.fillStyle = '#ffffff'; c.font = 'bold 56px Arial'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('WAREHOUSE ' + (k + 1), w / 2, h / 2 + 2); });
    const m = new T.Mesh(new T.PlaneGeometry(30, 5.6), new T.MeshBasicMaterial({ map: sign })); m.position.set(0, 16, -28.4); m.rotation.y = Math.PI; g.add(m);
    // crates of parts by the loading doors, in the family colours
    for (let i = 0; i < 12; i++) add(new T.BoxGeometry(2.44, 2.6, 12.2), cols[(i + k) % 5], -44 + (i % 6) * 3, 1.3 + ((i / 6) | 0) * 2.6, -38);
    if (k % 2 === 0) FA.person(g, { kind: 'worker', seed: 10500 + k, female: k === 2 }, 'tablet', -28, 0, -36, Math.PI);
  },
}));
