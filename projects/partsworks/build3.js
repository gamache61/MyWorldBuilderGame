/* ============================================================
   THE PARTS WORKS · BUILD 3 · THE MACHINE HALL & THE BELT
   Keep this file in projects/partsworks next to 72-partsworks.html.
   A long machine hall with sawtooth skylights and lathes inside, three belt sections that carry beams from the mill, two gantry cranes and robot arms.
   ============================================================ */
(function () {
  const P = window.PWP;
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 3, name: 'THE MACHINE HALL & THE BELT',
    brief: 'A long machine hall with sawtooth skylights and bright lathes inside, a belt that carries beams over from the mill, two gantry cranes and three robot arms that cut and drill the parts.',
    types: {
      HALL:  { code: 'FB', name: 'MACHINE HALL',  col: '#b8bec6', w: 120, d: 70, h: 26 },
      BELT:  { code: 'SF', name: 'BELT SECTION',  col: '#6c7580', w: 22,  d: 8,  h: 4 },
      GANTRY:{ code: 'HP', name: 'GANTRY CRANE',  col: '#f2c41a', w: 40,  d: 16, h: 24 },
      ROBOT: { code: 'HM', name: 'ROBOT ARM',     col: '#e8761a', w: 8,   d: 8,  h: 12 },
    },
    order: ['HALL', 'BELT', 'GANTRY', 'ROBOT'],
    at: {
      HALL: [[1550 + 40, -120]],
      BELT: [[1550 - 70, -120], [1550 - 48, -120], [1550 - 26, -120]],
      GANTRY: [[1550 + 40, -40], [1550 + 40, -200]],
      ROBOT: [[1550 + 118, -140], [1550 + 118, -118], [1550 + 118, -96]],
    },
    eye: [1550 - 20, P.SY + 150, 280],
    stats(api, c) { return [['MACHINE HALL', c('HALL') ? 'READY' : 'NOT YET'], ['BELT', c('BELT') * 22 + ' / 66 m'], ['GANTRY CRANES', c('GANTRY') + ' / 2'], ['ROBOT ARMS', c('ROBOT') + ' / 3']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, H = P.pw(api);
      if (type === 'HALL') {
        add(new T.BoxGeometry(120, 1, 70), H.conc2, 0, 0.5, 0);
        add(new T.BoxGeometry(116, 16, 66), H.wall, 0, 9, 0);
        add(new T.BoxGeometry(122, 1.2, 72), H.roof, 0, 17.6, 0);
        for (let i = 0; i < 8; i++) { const s = add(new T.BoxGeometry(14, 6, 70), H.roof2, -52.5 + i * 15, 21, 0, false); s.rotation.z = 0; add(new T.BoxGeometry(0.4, 5, 68), H.win, -52.5 + i * 15 + 7, 21, 0, false); }
        for (let i = 0; i < 9; i++) add(new T.BoxGeometry(8, 7, 0.4), H.win, -54 + i * 13.5, 11, 33.2, false);
        add(new T.BoxGeometry(24, 13, 0.5), H.dark, -61, 7.5, 0, false);   // the door the beams come in
        for (let i = 0; i < 5; i++) { const x = -40 + i * 20; add(new T.BoxGeometry(10, 3, 6), H.steel2, x, 2.5, -12); add(new T.BoxGeometry(3, 6, 3), H.orange, x - 3, 5.5, -12); add(new T.BoxGeometry(1.4, 1.4, 1.4), H.cool, x + 2, 5.2, -9.5, false); }
        for (let i = 0; i < 5; i++) { const x = -40 + i * 20; add(new T.BoxGeometry(10, 3, 6), H.steel2, x, 2.5, 14); add(new T.BoxGeometry(3, 6, 3), H.blue, x + 3, 5.5, 14); add(new T.BoxGeometry(1.4, 1.4, 1.4), H.warm, x - 2, 5.2, 11.5, false); }
        P.sign(api, g, 'MACHINE HALL', 34, 4.4, 0, 14, 33.4, 0, '#1b2733', '#9fe0ff');
        P.person(g, P.civ(72020), 'tablet', -50, 0.5, 40, 0);
      } else if (type === 'BELT') {
        add(new T.BoxGeometry(22, 0.8, 7), H.steel2, 0, 3, 0, false);
        add(new T.BoxGeometry(22, 0.3, 5.4), H.dark, 0, 3.5, 0, false);
        for (let x = -9; x <= 9; x += 3) add(new T.CylinderGeometry(0.6, 0.6, 5.6, 10), H.steel, x, 3.55, 0, false).rotation.x = Math.PI / 2;
        for (const x of [-9, 9]) { add(new T.BoxGeometry(1, 3, 1), H.steel2, x, 1.5, -2.8); add(new T.BoxGeometry(1, 3, 1), H.steel2, x, 1.5, 2.8); }
        add(new T.BoxGeometry(20, 0.4, 1), H.beam, 0, 4.1, 0 + (k - 1) * 1.1, false);
        add(new T.BoxGeometry(22, 0.2, 0.3), H.yellow, 0, 3.5, 3.4, false);
      } else if (type === 'GANTRY') {
        for (const x of [-18, 18]) for (const z of [-6, 6]) add(new T.BoxGeometry(1.2, 20, 1.2), H.yellow, x, 10, z);
        for (const z of [-6, 6]) add(new T.BoxGeometry(40, 1.6, 1.6), H.yellow, 0, 20.4, z);
        add(new T.BoxGeometry(2, 1.6, 14), H.yellow, 0, 21, 0); add(new T.BoxGeometry(5, 2.4, 4), H.dark, 0, 19, 0);
        add(new T.CylinderGeometry(0.15, 0.15, 7, 6), H.steel, 0, 14.8, 0, false); add(new T.BoxGeometry(2, 1.2, 1.2), H.red, 0, 11, 0, false);
        add(new T.BoxGeometry(1.4, 1.4, 1.4), H.warm, 0, 20, 7.4, false);
      } else if (type === 'ROBOT') {
        add(new T.CylinderGeometry(3.5, 4, 1.2, 14), H.dark, 0, 0.6, 0);
        add(new T.CylinderGeometry(1.5, 1.8, 4, 12), H.orange, 0, 3.2, 0);
        const a = add(new T.BoxGeometry(1.4, 7, 1.4), H.orange, 0, 8, 0); a.rotation.z = 0.45; a.position.set(-1.6, 7.6, 0);
        const b = add(new T.BoxGeometry(1.2, 6, 1.2), H.orange, 3.6, 12.5, 0); b.rotation.z = -1.1; add(new T.SphereGeometry(1, 10, 8), H.dark, -3.4, 10.4, 0);
        add(new T.BoxGeometry(1.6, 1, 1), H.cool, 6.5, 11.6, 0, false); add(new T.SphereGeometry(0.9, 8, 6), H.steel, 0, 5.4, 0);
        add(new T.BoxGeometry(5, 0.2, 5), H.hazard, 0, 1.25, 0, false);
      }
    },
  }));
})();
