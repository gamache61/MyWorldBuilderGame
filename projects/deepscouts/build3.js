/* ============================================================
   THE DEEP SPACE SCOUTS · BUILD 3 · THE LAUNCH PADS, THE HANGARS & THE FUEL STORE
   Keep this file in projects/deepscouts next to 77-deepscouts.html.
   Three round launch pads on the apron, three scout hangars along its north edge, and a fuel store.
   ============================================================ */
(function () {
  const P = window.PWP;
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 3, name: 'THE LAUNCH PADS, THE HANGARS & THE FUEL STORE',
    brief: 'Three round launch pads on the apron, three hangars where the scouts will be fitted, and a fuel store with two tall tanks.',
    types: {
      PAD:    { code: 'SF', name: 'LAUNCH PAD', col: '#6c757d', w: 46, d: 46, h: 2 },
      HANGAR: { code: 'FB', name: 'SCOUT HANGAR', col: '#d7dade', w: 60, d: 50, h: 28 },
      TANK:   { code: 'SY', name: 'FUEL TANK', col: '#e8e1d1', w: 22, d: 22, h: 30 },
    },
    order: ['PAD', 'HANGAR', 'TANK'],
    at: {
      PAD: [[1550 + 500 + -90, 1100 + 30], [1550 + 500 + 0, 1100 + 30], [1550 + 500 + 90, 1100 + 30]],
      HANGAR: [[1550 + 500 + -90, 1100 + -80], [1550 + 500 + 0, 1100 + -80], [1550 + 500 + 90, 1100 + -80]],
      TANK: [[1550 + 500 + -215, 1100 + 70], [1550 + 500 + -215, 1100 + 105]],
    },
    eye: [1550 + 500 + 0, (window.__SCOUT.Y || -85) + 190, 1100 - 330],
    stats(api, c) { return [['LAUNCH PADS', c('PAD') + ' / 3'], ['SCOUT HANGARS', c('HANGAR') + ' / 3'], ['FUEL TANKS', c('TANK') + ' / 2']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, H = P.pw(api);
      if (type === 'PAD') {
        add(new T.CylinderGeometry(22, 23, 1.2, 36), H.conc2, 0, 2.0, 0);
        add(new T.CylinderGeometry(17, 17, 0.3, 36), H.dark, 0, 2.7, 0, false);
        add(new T.TorusGeometry(19.5, 0.35, 6, 48), H.cool, 0, 2.7, 0, false).rotation.x = Math.PI / 2;
        for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2; add(new T.BoxGeometry(1.2, 0.2, 4), H.yellow, Math.cos(a) * 12, 2.8, Math.sin(a) * 12, false).rotation.y = -a; }
      } else if (type === 'HANGAR') {
        add(new T.BoxGeometry(60, 1, 50), H.conc2, 0, 0.5, 0);
        add(new T.BoxGeometry(56, 18, 46), H.wall, 0, 10, 0);
        const roof = add(new T.CylinderGeometry(24, 24, 56, 20, 1, false, 0, Math.PI).rotateZ(Math.PI / 2).rotateY(Math.PI / 2), H.roof2, 0, 19, 0); roof.scale.set(1, 0.5, 1);
        add(new T.BoxGeometry(34, 14, 0.5), H.dark, 0, 8.5, 23.2, false);
        for (let x = -12; x <= 12; x += 12) add(new T.BoxGeometry(0.4, 14, 0.3), H.steel2, x, 8.5, 23.5, false);
        add(new T.BoxGeometry(36, 1.2, 0.6), H.hazard, 0, 16.3, 23.4, false);
        P.sign(api, g, 'SCOUT HANGAR ' + (k + 1), 20, 3, 0, 24, 23.6, 0, '#14242e', '#a8d8ff');
        P.person(g, P.civ(77020 + k), 'idle', 10, 0.5, 28, 0);
      } else if (type === 'TANK') {
        add(new T.CylinderGeometry(10, 10, 26, 20), H.white, 0, 14, 0);
        add(new T.SphereGeometry(10, 20, 8, 0, Math.PI * 2, 0, Math.PI / 2), H.white, 0, 27, 0);
        for (const y of [8, 20]) add(new T.TorusGeometry(10.1, 0.35, 6, 24), H.orange, 0, y, 0, false).rotation.x = Math.PI / 2;
        add(new T.CylinderGeometry(0.3, 0.3, 10, 6), H.steel, 12, 5, 0, false);
        add(new T.CylinderGeometry(11, 11, 1, 20), H.conc2, 0, 0.5, 0);
      }
    },
  }));
})();
