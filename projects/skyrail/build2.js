/* ============================================================
   THE SKY RAIL · BUILD 2 · KRYOS SKY RAIL STATION
   Keep this file in projects/skyrail next to 40-skyrail.html.
   The station in the south-east of Kryos: long glass platforms high
   above the street on either side of the guideway, under a curved
   glass roof, and the concourse below with its lift towers, ticket
   hall and plaza. The Sky Rail is free to ride, like everything else
   the people of Unity need.
   ============================================================ */
(function () {
  const P = window.SKY;
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 2, name: 'KRYOS SKY RAIL STATION',
    brief: 'The Sky Rail station in the south-east of Kryos: long glass platforms high above the street on either side of the guideway, and the concourse below with its lift towers and plaza.',
    types: {
      STATION:   { code: 'SY', name: 'SKY RAIL STATION', col: '#e8e1d1', w: 240, d: 50, h: 30 },
      CONCOURSE: { code: 'SF', name: 'STATION CONCOURSE', col: '#8fe8ff', w: 120, d: 30, h: 16 },
    },
    order: ['STATION', 'CONCOURSE'],
    at: { STATION: [[640, -420]], CONCOURSE: [[640, -372]] },
    eye: [-200, 120, 220],
    stats(api, c) { return [['STATION', c('STATION') ? 'STANDING' : 'NOT YET'], ['CONCOURSE', c('CONCOURSE') ? 'OPEN' : 'NOT YET'], ['FARE', 'FREE FOR EVERYONE']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, S = P.hm(api), C = P.fun(api), top = P.RAIL_Y - sl.y;
      if (type === 'STATION') {
        // the guideway through the station
        P.beam(api, add, F, -120, 120, top, top);
        // platforms on both sides, at the pod doors, on white columns
        const py = top + 1.2;
        for (const s of [-1, 1]) {
          add(new T.BoxGeometry(230, 1.4, 9), S.stone, 0, py - 0.7, s * 9.5);
          add(new T.BoxGeometry(230, 0.3, 0.5), S.yellow, 0, py + 0.05, s * 5.4, false);
          for (let x = -105; x <= 105; x += 30) add(new T.CylinderGeometry(0.9, 1.1, py, 10), S.frame, x, py / 2, s * 11);
          // glass walls along the outer edge
          add(new T.BoxGeometry(230, 3.2, 0.3), S.glass, 0, py + 1.6, s * 14, false);
          // benches and people waiting
          for (let x = -90; x <= 90; x += 45) add(new T.BoxGeometry(5, 0.9, 1.2), S.timber, x, py + 0.45, s * 12.2);
          for (let i = 0; i < 6; i++) P.figure(api, add, -80 + i * 32 + s * 6, py, s * 10.5, 1.4, i + (s > 0 ? 3 : 0));
        }
        // the curved glass roof on white ribs
        for (let x = -110; x <= 110; x += 22) { const r = add(new T.TorusGeometry(15, 0.45, 6, 24, Math.PI).rotateY(Math.PI / 2), S.frame, x, py + 2, 0); r.scale.y = 0.75; }
        const roof = add(new T.CylinderGeometry(15, 15, 226, 24, 1, true, -Math.PI / 2, Math.PI).rotateZ(Math.PI / 2), S.glass, 0, py + 2, 0, false); roof.scale.set(1, 0.75, 1); roof.rotation.y = 0;
        add(new T.BoxGeometry(226, 0.6, 2), S.frame, 0, py + 2 + 15 * 0.75, 0);
        P.sign(api, g, 'KRYOS · SKY RAIL', 26, 3.4, -115, py + 7, 0, -Math.PI / 2, '#0e2a3a', '#9fffd8', false);
        P.sign(api, g, 'KRYOS · SKY RAIL', 26, 3.4, 115, py + 7, 0, Math.PI / 2, '#0e2a3a', '#9fffd8', false);
        for (const s of [-1, 1]) P.sign(api, g, 'SEASHORE · FARMLANDS · FACTORIES  ▶', 30, 2.2, 60, py + 4.4, s * 13.8, s < 0 ? Math.PI : 0, '#0e2a3a', '#ffffff', false);
        P.person(g, P.civ(40000), 'tablet', -30, py, -10.5, 0); P.person(g, P.civ(40001), 'idle', 40, py, 10.5, Math.PI);
        P.person(g, P.civ(40002), 'walk', 0, py, 0, 0, { path: { type: 'line', ax: -100, az: 11.5, bx: 100, bz: 11.5, speed: 1.1 } });
      } else if (type === 'CONCOURSE') {
        // a low glass ticket hall on the plaza, two lift towers up to the platforms, trees and benches
        add(new T.BoxGeometry(70, 9, 18), S.frame, 0, 4.5, 2); add(new T.BoxGeometry(64, 7, 0.3), S.glass, 0, 4, 11.2, false);
        add(new T.BoxGeometry(72, 0.8, 20), S.roofGreen, 0, 9.4, 2);
        for (const s of [-1, 1]) {
          const lh = P.RAIL_Y - sl.y + 6;
          add(new T.BoxGeometry(8, lh, 8), S.glass, s * 46, lh / 2, -6, false); add(new T.BoxGeometry(8.6, 1, 8.6), S.frame, s * 46, lh, -6);
          for (const e of [-1, 1]) add(new T.BoxGeometry(0.5, lh, 0.5), S.frame, s * 46 + e * 4, lh / 2, -2);
          add(new T.BoxGeometry(6, 3, 6), S.warm, s * 46, 2 + (s > 0 ? 6 : 14), -6, false);
          add(new T.BoxGeometry(4, 1, 14), S.stone, s * 46, lh - 1.5, -13);
        }
        P.sign(api, g, 'SKY RAIL · FREE FOR EVERYONE', 30, 2.6, 0, 7.3, 11.4, 0, '#0e2a3a', '#9fffd8', false);
        for (const x of [-56, -24, 24, 56]) { add(new T.CylinderGeometry(0.5, 0.7, 5, 6), F.wood, x, 2.5, 14); add(new T.IcosahedronGeometry(3.6, 1), F.crops[(x / 8 | 0) & 3], x, 7, 14); }
        for (const x of [-40, 40]) add(new T.BoxGeometry(6, 0.9, 1.4), S.timber, x, 0.5, 13);
        P.person(g, P.civ(40010), 'walk', 0, 0.2, 0, 0, { path: { type: 'line', ax: -60, az: 16, bx: 60, bz: 16, speed: 1 } });
        P.person(g, P.kid(40011), 'walk', 0, 0.2, 0, 0, { path: { type: 'line', ax: 58, az: 17.5, bx: -58, bz: 17.5, speed: 1.2 }, scale: 0.6 });
        P.person(g, P.civ(40012), 'gesture', 10, 0.2, 12.5, Math.PI);
      }
    },
  }));
})();
