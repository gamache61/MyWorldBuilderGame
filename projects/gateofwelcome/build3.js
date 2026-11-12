/* ============================================================
   THE GATE OF WELCOME · BUILD 3 · THE WELCOME HALL & THE LANDING PADS
   Keep this file in projects/gateofwelcome next to 61-gateofwelcome.html.
   A warm hall where visitors are greeted, and two landing pads with lamps and a table at the edge of each.
   ============================================================ */
(function () {
  const P = window.GATE;
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 3, name: 'THE WELCOME HALL & THE LANDING PADS',
    brief: 'A warm hall behind the gate where visitors are greeted by name, and two landing pads with lamps and a table at the edge of each, so nobody is hurried.',
    types: {
      WELCOMEHALL: { code: 'SY', name: 'WELCOME HALL', col: '#e8d8b8', w: 140, d: 90, h: 36 },
      LANDPAD: { code: 'SY', name: 'LANDING PAD', col: '#9fd8ff', w: 80, d: 80, h: 6 },
    },
    order: ['WELCOMEHALL', 'LANDPAD'],
    at: { WELCOMEHALL: [[1550, 40]], LANDPAD: [[1380, 60], [1720, 60]] },
    eye: [1000, 200, 420],
    stats(api, c) { return [['WELCOME HALL', c('WELCOMEHALL') ? 'OPEN' : 'NOT YET'], ['LANDING PADS', c('LANDPAD') + ' / 2']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, S = P.hm(api), C = P.fun(api);
      if (type === 'WELCOMEHALL') {
        add(new T.BoxGeometry(144, 1.4, 94), S.gravel, 0, 0.7, 0);
        add(new T.BoxGeometry(130, 22, 80), new T.MeshStandardMaterial({ color: 0xe8d8b8, roughness: 0.8 }), 0, 12.4, 0);
        add(new T.BoxGeometry(140, 2.4, 90), S.slate, 0, 24.8, 0);
        const roof = add(new T.CylinderGeometry(34, 34, 130, 24).rotateZ(Math.PI / 2), S.copper, 0, 25, 0); roof.scale.set(1, 0.38, 1.05);
        for (let x = -56; x <= 56; x += 14) { add(new T.BoxGeometry(8, 12, 0.5), S.glass, x, 13, 40.4); add(new T.BoxGeometry(8, 12, 0.5), S.glass, x, 13, -40.4); }
        for (let i = 0; i < 8; i++) add(new T.CylinderGeometry(1.2, 1.4, 20, 8), F.white, -49 + i * 14, 12, 44);
        add(new T.BoxGeometry(22, 14, 1), F.dark, 0, 8, 40.6);
        P.sign(api, g, 'THE WELCOME HALL · YOU ARE EXPECTED', 54, 3.6, 0, 22, 45.6, 0, '#2a2418', '#ffe9b0', true);
        for (let i = 0; i < 5; i++) P.person(g, i % 2 ? P.kid(61200 + i) : P.civ(61200 + i), i % 2 ? 'idle' : 'tablet', -22 + i * 11, 1.4, 52, 0);
      } else {
        add(new T.BoxGeometry(84, 1, 84), S.gravel, 0, 0.5, 0);
        add(new T.CylinderGeometry(36, 38, 2, 32), S.stone, 0, 1.8, 0);
        add(new T.CylinderGeometry(33, 33, 0.4, 32), S.dark, 0, 3, 0).castShadow = false;
        for (let i = 0; i < 16; i++) { const a = i / 16 * Math.PI * 2; add(new T.SphereGeometry(0.9, 8, 6), F.lamp, Math.cos(a) * 34.5, 3.4, Math.sin(a) * 34.5).castShadow = false; }
        add(new T.TorusGeometry(20, 0.5, 6, 32), S.glow, 0, 3.4, 0).rotation.x = Math.PI / 2;
        add(new T.CylinderGeometry(3, 3, 1.2, 12), S.glow, 0, 3.2, 0).castShadow = false;
        add(new T.CylinderGeometry(4, 4, 1.2, 16), F.wood, 34, 1.2, 0); add(new T.CylinderGeometry(0.6, 0.6, 3, 6), F.wood, 34, 0.6, 0);
        for (let i = 0; i < 4; i++) { const a = i * Math.PI / 2; add(new T.BoxGeometry(2.4, 1, 1), F.wood, 34 + Math.cos(a) * 5.4, 1.5, Math.sin(a) * 5.4); }
        P.sign(api, g, 'LANDING PAD ' + (k + 1) + ' · TAKE YOUR TIME', 40, 3, 0, 6, 37, 0, '#14324a', '#bff8d0', true);
      }
    },
  }));
})();
