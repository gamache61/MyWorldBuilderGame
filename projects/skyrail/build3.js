/* ============================================================
   THE SKY RAIL · BUILD 3 · THE CITY LINE
   Keep this file in projects/skyrail next to 40-skyrail.html.
   Five tall white pylons march east from the station across the
   south of Kryos, and two long guideway spans are set on top of them,
   high above the streets, so the city below stays green and quiet.
   ============================================================ */
(function () {
  const P = window.SKY;
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 3, name: 'THE CITY LINE',
    brief: 'Five tall white pylons east of the station, and two long guideway spans set on top of them, high above the streets of Kryos.',
    types: {
      PYLON:    { code: 'SF', name: 'SKY RAIL PYLON', col: '#e8e1d1', w: 12, d: 12, h: 30 },
      CITYSPAN: { code: 'SF', name: 'GUIDEWAY SPAN', col: '#6c757d', w: 190, d: 8, h: 6 },
    },
    order: ['PYLON', 'CITYSPAN'],
    at: { PYLON: [[800, -420], [880, -420], [960, -420], [1040, -420], [1120, -420]], CITYSPAN: [[855, -420], [1050, -420]] },
    eye: [-160, 110, 200],
    stats(api, c) { return [['PYLONS', c('PYLON') + ' / 5'], ['GUIDEWAY SPANS', c('CITYSPAN') + ' / 2'], ['CITY LINE', (c('CITYSPAN') * 195) + ' m']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, S = P.hm(api), top = P.RAIL_Y - sl.y;
      if (type === 'PYLON') {
        // a slim white column that opens into a Y to cradle the beam
        add(new T.CylinderGeometry(3, 3.6, 1.4, 16), S.stone, 0, 0.7, 0);
        add(new T.CylinderGeometry(1.4, 2, top - 9, 14), S.frame, 0, (top - 9) / 2, 0);
        for (const s of [-1, 1]) { const arm = add(new T.CylinderGeometry(0.9, 1.3, 8, 10), S.frame, 0, top - 7, s * 2); arm.rotation.x = s * 0.5; }
        add(new T.BoxGeometry(6, 1.2, 9), F.steel, 0, top - 4.6, 0);
        add(new T.SphereGeometry(0.5, 8, 6), S.glow, 0, top - 9.5, 2.1, false);
        // a planted ring at the foot
        add(new T.CylinderGeometry(6, 6, 0.5, 20), P.fun(api).grass, 0, 0.3, 0);
      } else if (type === 'CITYSPAN') {
        P.beam(api, add, F, -95, 95, top, top);
      }
    },
  }));
})();
