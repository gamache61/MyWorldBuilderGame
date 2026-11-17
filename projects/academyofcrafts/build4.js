/* ============================================================
   THE UNITY ACADEMY OF CRAFTS · BUILD 4 · THE WIRING HOUSE, THE WEAVING HOUSE & THE FLIGHT FIELD
   Keep this file in projects/academyofcrafts next to 81-academyofcrafts.html.
   A wiring house where students learn power and circuits, a weaving house of looms and bright cloth, and a flight hangar with two little trainer craft on the practice field.
   ============================================================ */
(function () {
  const P = window.PWP;
  const AX = 1550 - 1400, AZ = 0;
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 4, name: 'THE WIRING HOUSE, THE WEAVING HOUSE & THE FLIGHT FIELD',
    brief: 'The Wiring House with its test pylon, the Weaving House of looms and hanging cloth, and the Flight Hangar with two little trainer craft waiting on the practice field.',
    types: {
      WIRE:    { code: 'FB', name: 'WIRING HOUSE',  col: '#2f6fb0', w: 44, d: 32, h: 18 },
      WEAVE:   { code: 'FB', name: 'WEAVING HOUSE', col: '#8a4fd0', w: 44, d: 32, h: 18 },
      HANGAR:  { code: 'FB', name: 'FLIGHT HANGAR', col: '#9aa6b2', w: 84, d: 50, h: 26 },
      TRAINER: { code: 'HM', name: 'TRAINER CRAFT', col: '#e8761a', w: 16, d: 10, h: 6 },
    },
    order: ['WIRE', 'WEAVE', 'HANGAR', 'TRAINER'],
    at: { WIRE: [[AX + 95, AZ - 150]], WEAVE: [[AX + 95, AZ + 150]], HANGAR: [[AX - 150, AZ + 215]],
      TRAINER: [[AX - 60, AZ + 215], [AX + 10, AZ + 215]] },
    eye: [AX + 220, (window.__ACAD.Y || -85) + 180, AZ + 330],
    stats(api, c) { return [['WIRING HOUSE', c('WIRE') ? 'LIVE' : 'NOT YET'], ['WEAVING HOUSE', c('WEAVE') ? 'OPEN' : 'NOT YET'], ['FLIGHT HANGAR', c('HANGAR') ? 'OPEN' : 'NOT YET'], ['TRAINER CRAFT', c('TRAINER') + ' / 2']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, H = P.pw(api), A = P.ac(api);
      if (type === 'WIRE' || type === 'WEAVE') {
        const s = type === 'WIRE' ? 1 : -1;   // the wiring house faces south, the weaving house faces north: both face the courtyard
        add(new T.BoxGeometry(48, 1, 36), H.conc2, 0, 0.5, 0);
        add(new T.BoxGeometry(44, 12, 32), type === 'WIRE' ? A.cream : A.brick, 0, 7, 0);
        for (const q of [-1, 1]) { const r = add(new T.BoxGeometry(46, 0.8, 19), type === 'WIRE' ? A.slate : A.tile, 0, 16.4, q * 7.6); r.rotation.x = -q * 0.44; }
        add(new T.BoxGeometry(47, 0.8, 1.2), A.brass, 0, 20.2, 0, false);
        add(new T.BoxGeometry(10, 8, 0.8), A.iron, 0, 5, s * 16.2, false);
        for (const x of [-15, -8, 8, 15]) add(new T.BoxGeometry(4, 4.4, 0.5), H.win, x, 8.4, s * 16.2, false);
        if (type === 'WIRE') {
          add(new T.CylinderGeometry(0.4, 0.6, 26, 6), H.steel2, 30, 14, s * 8, false); add(new T.BoxGeometry(0.6, 0.6, 12), H.steel2, 30, 25.4, s * 8, false);
          for (const z of [-5, 0, 5]) add(new T.SphereGeometry(0.7, 6, 5), H.cool, 30, 25.4, s * 8 + z, false);
          for (let i = 0; i < 5; i++) add(new T.BoxGeometry(0.4, 0.4, 14), H.copper, -16 + i * 1.6, 12.6 + i * 0.2, 4, false);
          P.sign(api, g, 'THE WIRING HOUSE', 24, 2.8, 0, 12.2, s * 16.9, 0, '#14242e', '#9fe0ff', false);
        } else {
          for (let i = 0; i < 6; i++) add(new T.BoxGeometry(0.4, 9, 3.4), A.banner[i % 5], -16 + i * 6.4, 6.5, s * 17.6, false);   // cloth hanging in the sun
          add(new T.BoxGeometry(40, 0.5, 0.5), A.timber, 0, 11.4, s * 17.6, false);
          P.sign(api, g, 'THE WEAVING HOUSE', 24, 2.8, 0, 13.4, s * 16.9, Math.PI, '#3a1a4a', '#ffd9f0', false);
        }
        P.person(g, P.kid(81050 + (type === 'WIRE' ? 0 : 1)), 'idle', 12, 1, s * 22, s > 0 ? 0 : Math.PI);
        P.person(g, P.civ(81054 + (type === 'WIRE' ? 0 : 1)), 'tablet', -12, 1, s * 22, s > 0 ? 0 : Math.PI);
      } else if (type === 'HANGAR') {
        add(new T.BoxGeometry(88, 1, 54), H.conc2, 0, 0.5, 0);
        add(new T.BoxGeometry(84, 18, 50), A.cream, 0, 10, 0);
        const arch = add(new T.CylinderGeometry(25.5, 25.5, 85, 20, 1, false, 0, Math.PI).rotateZ(Math.PI / 2), H.roof, 0, 19, 0); arch.scale.set(1, 0.34, 1);
        for (const x of [-30, 30]) add(new T.BoxGeometry(14, 14, 0.8), A.iron, x, 8, 25.3, false);
        add(new T.BoxGeometry(24, 14, 0.8), A.slate, 0, 8, 25.3, false);
        add(new T.BoxGeometry(26, 1, 1.2), H.yellow, 0, 15.4, 25.5, false);
        add(new T.CylinderGeometry(0.4, 0.5, 18, 6), H.steel2, 38, 9, 20, false); add(new T.ConeGeometry(2.2, 4, 12), H.red, 38, 20, 20, false);
        P.sign(api, g, 'THE FLIGHT HANGAR', 34, 3.4, 0, 20, 25.9, 0, '#14242e', '#ffe08a', false);
        P.person(g, P.kid(81060), 'idle', -10, 1, 31, Math.PI); P.person(g, P.civ(81061), 'tablet', 10, 1, 31, Math.PI);
      } else if (type === 'TRAINER') {
        add(new T.CylinderGeometry(9, 9.4, 0.5, 20), H.conc2, 0, 0.25, 0, false); add(new T.TorusGeometry(7.4, 0.2, 4, 28), H.yellow, 0, 0.6, 0, false).rotation.x = Math.PI / 2;
        add(new T.BoxGeometry(11, 1.6, 3.2), A.banner[k % 5], 0, 2.2, 0); add(new T.BoxGeometry(3.6, 1.6, 2.6), H.glass, 3.2, 3.2, 0, false);
        add(new T.BoxGeometry(2.4, 0.3, 12), H.white, -0.6, 2.3, 0, false); add(new T.BoxGeometry(1.6, 3, 0.3), A.banner[(k + 2) % 5], -5, 3.8, 0, false);
        for (const z of [-1.2, 1.2]) add(new T.CylinderGeometry(0.4, 0.4, 1.2, 6), H.dark, 1.6, 1.2, z, false);
      }
    },
  }));
})();
