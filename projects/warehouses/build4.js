/* ============================================================
   THE UNITY WAREHOUSES · BUILD 4 · THE COLD STORE & THE TOOL STORE
   Keep this file in projects/warehouses next to 73-warehouses.html.
   A white cold store with cooling units for food and medicine, and a tool store with a gantry crane and tall racks.
   ============================================================ */
(function () {
  const P = window.PWP;
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 4, name: 'THE COLD STORE & THE TOOL STORE',
    brief: 'A white cold store with humming cooling units for food and medicine, a tool store with a gantry crane and tall racks of machine parts, and a row of tall storage racks outside.',
    types: {
      COLD:  { code: 'FB', name: 'COLD STORE', col: '#f4f6f8', w: 100, d: 60, h: 20 },
      TOOLS: { code: 'FB', name: 'TOOL STORE', col: '#e8761a', w: 100, d: 60, h: 22 },
      RACK:  { code: 'SF', name: 'STORAGE RACK', col: '#2f6fb0', w: 30, d: 8, h: 14 },
    },
    order: ['COLD', 'TOOLS', 'RACK'],
    at: {
      COLD: [[1550 + 440, 20]], TOOLS: [[1550 + 440, 100]],
      RACK: [[1550 + 535, -160], [1550 + 535, -120], [1550 + 535, -80], [1550 + 535, -40]],
    },
    eye: [1550 + 270, P.SY + 150, 230],
    stats(api, c) { return [['COLD STORE', c('COLD') ? 'COOLING' : 'NOT YET'], ['TOOL STORE', c('TOOLS') ? 'STOCKED' : 'NOT YET'], ['STORAGE RACKS', c('RACK') + ' / 4']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, H = P.pw(api);
      if (type === 'COLD') {
        add(new T.BoxGeometry(100, 1, 60), H.conc2, 0, 0.5, 0);
        add(new T.BoxGeometry(96, 16, 56), H.white, 0, 9, 0);
        add(new T.BoxGeometry(98, 1.2, 58), H.roof2, 0, 17.6, 0);
        for (let i = 0; i < 5; i++) { add(new T.CylinderGeometry(3.4, 3.4, 1.4, 16), H.dark, -34 + i * 17, 18.6, 12); add(new T.CylinderGeometry(3, 3, 0.4, 16), H.cool, -34 + i * 17, 19.4, 12, false); }
        for (let i = 0; i < 3; i++) add(new T.BoxGeometry(0.5, 11, 12), H.blue, -48.2, 6.5, -14 + i * 14, false);
        add(new T.BoxGeometry(0.6, 0.6, 40), H.cool, -48.4, 13.4, 0, false);
        for (let i = 0; i < 4; i++) add(new T.BoxGeometry(0.4, 3, 6), H.win, 48.2, 11, -18 + i * 12, false);
        P.sign(api, g, 'COLD STORE · FOOD & MEDICINE', 40, 3.6, -48.8, 15.4, 0, -Math.PI / 2, '#0c2a3a', '#aef0ff');
        P.person(g, P.civ(73030), 'idle', -56, 0.5, -10, Math.PI / 2);
      } else if (type === 'TOOLS') {
        add(new T.BoxGeometry(100, 1, 60), H.conc2, 0, 0.5, 0);
        add(new T.BoxGeometry(96, 18, 56), H.wall2, 0, 10, 0);
        add(new T.BoxGeometry(98, 1.2, 58), H.roof, 0, 19.6, 0);
        for (let i = 0; i < 6; i++) add(new T.BoxGeometry(12, 4, 58), H.roof2, -40 + i * 16, 22, 0);
        for (let i = 0; i < 4; i++) { add(new T.BoxGeometry(0.5, 12, 12), H.steel2, -48.2, 7, -18 + i * 12, false); add(new T.BoxGeometry(0.7, 0.6, 12), H.yellow, -48.4, 13.3, -18 + i * 12, false); }
        for (const z of [-14, 14]) add(new T.BoxGeometry(0.8, 0.8, 0.8), H.steel, 0, 17, z, false);
        add(new T.BoxGeometry(2, 1.4, 30), H.yellow, 10, 17.6, 0, false);
        for (let i = 0; i < 5; i++) add(new T.BoxGeometry(0.4, 3, 6), H.win, 48.2, 12, -20 + i * 10, false);
        P.sign(api, g, 'TOOL STORE', 24, 3.6, -48.8, 16.6, 0, -Math.PI / 2, '#2a1a10', '#ffb24a');
        P.person(g, P.civ(73031), 'tablet', -56, 0.5, 6, Math.PI / 2);
      } else if (type === 'RACK') {
        for (const x of [-14, 0, 14]) add(new T.BoxGeometry(0.8, 14, 8), H.blue, x, 7, 0, false);
        for (let r = 0; r < 4; r++) { add(new T.BoxGeometry(30, 0.5, 8), H.steel, 0, 1.5 + r * 3.6, 0, false); for (let c = 0; c < 5; c++) add(new T.BoxGeometry(4.6, 2.2, 6.4), [H.orange, H.beam, H.red, H.yellow][(r + c) % 4], -12 + c * 6, 2.8 + r * 3.6, 0, false); }
      }
    },
  }));
})();
