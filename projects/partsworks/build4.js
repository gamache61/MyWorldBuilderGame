/* ============================================================
   THE PARTS WORKS · BUILD 4 · THE CIRCUIT WORKS & THE GLASS WORKS
   Keep this file in projects/partsworks next to 72-partsworks.html.
   A clean white circuit works, a glass furnace works, three silos of sand and crystal and racks of glass sheets.
   ============================================================ */
(function () {
  const P = window.PWP;
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 4, name: 'THE CIRCUIT WORKS & THE GLASS WORKS',
    brief: 'A clean white circuit works where Vesh crystal becomes ship brains, a glowing glass works with its furnace, three silos of sand and crystal, and racks of finished glass sheets.',
    types: {
      CIRCUIT: { code: 'FB', name: 'CIRCUIT WORKS', col: '#f4f6f8', w: 100, d: 60, h: 20 },
      GLASS:   { code: 'FB', name: 'GLASS WORKS',   col: '#e8761a', w: 90,  d: 60, h: 28 },
      SILO:    { code: 'FB', name: 'SILO',          col: '#c8ced6', w: 12,  d: 12, h: 34 },
      RACK:    { code: 'FB', name: 'GLASS RACK',    col: '#bfe8ff', w: 24,  d: 8,  h: 12 },
    },
    order: ['CIRCUIT', 'GLASS', 'SILO', 'RACK'],
    at: {
      CIRCUIT: [[1550 - 120, 130]], GLASS: [[1550 + 20, 130]],
      SILO: [[1550 + 78, 112], [1550 + 78, 130], [1550 + 78, 148]],
      RACK: [[1550 - 120, 185], [1550 - 90, 185], [1550 + 20, 185]],
    },
    eye: [1550 - 40, P.SY + 150, 330],
    stats(api, c) { return [['CIRCUIT WORKS', c('CIRCUIT') ? 'HUMMING' : 'NOT YET'], ['GLASS WORKS', c('GLASS') ? 'FIRED' : 'NOT YET'], ['SILOS', c('SILO') + ' / 3'], ['GLASS RACKS', c('RACK') + ' / 3']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, H = P.pw(api);
      if (type === 'CIRCUIT') {
        add(new T.BoxGeometry(100, 1, 60), H.conc2, 0, 0.5, 0);
        add(new T.BoxGeometry(96, 14, 56), H.white, 0, 8, 0);
        add(new T.BoxGeometry(98, 1, 58), H.wall2, 0, 15.5, 0);
        for (let i = 0; i < 12; i++) add(new T.BoxGeometry(5, 8, 0.4), H.win, -46 + i * 8.4, 9, -28.2, false);
        for (let i = 0; i < 12; i++) add(new T.BoxGeometry(5, 8, 0.4), H.win, -46 + i * 8.4, 9, 28.2, false);
        for (let i = 0; i < 5; i++) { add(new T.BoxGeometry(10, 2.4, 10), H.wall2, -36 + i * 18, 16.9, 0); add(new T.BoxGeometry(8, 0.6, 8), H.cool, -36 + i * 18, 18.4, 0, false); }   // clean-air units
        add(new T.BoxGeometry(14, 10, 0.5), H.glass, 0, 6, 28.5, false); add(new T.BoxGeometry(15, 0.8, 1.6), H.steel, 0, 11.4, 29, false);
        for (let i = 0; i < 6; i++) add(new T.BoxGeometry(6, 0.3, 0.3), H.cool, -40 + i * 16, 14.6, 28.6, false);
        P.sign(api, g, 'CIRCUIT WORKS', 34, 4.4, 0, 12.8, 29.5, 0, '#14242e', '#bff8d0');
        P.person(g, P.civ(72030), 'tablet', 18, 0.5, 36, 0);
        P.person(g, P.civ(72031), 'idle', -22, 0.5, 36, 0);
      } else if (type === 'GLASS') {
        add(new T.BoxGeometry(90, 1, 60), H.conc2, 0, 0.5, 0);
        add(new T.BoxGeometry(86, 18, 56), H.wall2, 0, 10, 0);
        add(new T.BoxGeometry(92, 1.2, 62), H.roof, 0, 19.6, 0);
        add(new T.CylinderGeometry(8, 9, 12, 16), H.steel2, -20, 26, 0); add(new T.CylinderGeometry(7.4, 7.4, 1, 16), H.hot, -20, 32.3, 0, false);   // the furnace crown
        add(new T.BoxGeometry(34, 6, 0.4), H.warm, 12, 10, 28.2, false); add(new T.BoxGeometry(34, 0.8, 0.8), H.dark, 12, 6.2, 28.5, false);
        for (let i = 0; i < 4; i++) add(new T.BoxGeometry(8, 7, 0.4), H.win, -38 + i * 8.6, 11, 28.2, false);
        for (let i = 0; i < 6; i++) { const t = add(new T.CylinderGeometry(1.1, 1.1, 10, 10), H.steel, 36, 5, -20 + i * 8, false); t.rotation.z = Math.PI / 2; }
        for (let x of [-30, -10, 10]) { add(new T.CylinderGeometry(1.4, 1.8, 20, 10), H.steel2, x, 30, -20); add(new T.CylinderGeometry(1.1, 1.1, 1, 10), H.cool, x, 40.4, -20, false); }
        P.sign(api, g, 'GLASS WORKS', 30, 4.2, 0, 15, 28.4, 0, '#2a1a10', '#ffb24a');
        P.person(g, P.civ(72040), 'idle', 24, 0.5, 36, 0);
      } else if (type === 'SILO') {
        add(new T.CylinderGeometry(5.6, 5.6, 26, 16), H.wall, 0, 14, 0); add(new T.ConeGeometry(5.8, 5, 16), H.roof2, 0, 29.5, 0); add(new T.CylinderGeometry(5.4, 3, 6, 16), H.steel2, 0, 3, 0);
        add(new T.BoxGeometry(1.2, 26, 1.2), H.steel, 5.9, 14, 0, false); add(new T.BoxGeometry(0.5, 1, 0.5), k === 2 ? H.crystal : H.warm, 0, 32.4, 0, false);
        for (let y = 6; y <= 24; y += 6) add(new T.TorusGeometry(5.7, 0.25, 6, 20), H.steel2, 0, y, 0, false).rotation.x = Math.PI / 2;
        add(new T.BoxGeometry(5, 1.4, 0.3), k === 2 ? H.crystal : H.orange, 0, 12, 5.65, false);
      } else if (type === 'RACK') {
        add(new T.BoxGeometry(24, 0.8, 8), H.dark, 0, 0.4, 0);
        for (let i = 0; i < 12; i++) { const p = add(new T.BoxGeometry(1.2, 9, 6.4), H.glass, -11 + i * 2, 5.2, 0, false); p.rotation.z = 0.05 * (i % 2 ? 1 : -1); }
        for (const x of [-12, 12]) add(new T.BoxGeometry(0.6, 11, 7), H.steel2, x, 5.8, 0, false);
        add(new T.BoxGeometry(24, 0.6, 0.6), H.steel2, 0, 11.2, 3.5, false); add(new T.BoxGeometry(24, 0.6, 0.6), H.steel2, 0, 11.2, -3.5, false);
      }
    },
  }));
})();
