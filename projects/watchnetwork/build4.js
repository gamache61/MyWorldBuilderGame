/* ============================================================
   THE WATCH NETWORK · BUILD 4 · THE RELAY MASTS & THE CAMERA POLES
   Keep this file in projects/watchnetwork next to 76-watchnetwork.html.
   Four tall relay masts with dishes that talk to the far places, and camera poles round the yard.
   ============================================================ */
(function () {
  const P = window.PWP;
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 4, name: 'THE RELAY MASTS & THE CAMERA POLES',
    brief: 'Four tall relay masts with dishes pointing at Havenreach, Vesh, Seashore and the Farmlands, and a ring of camera poles round the yard that watch every road.',
    types: {
      MAST: { code: 'HP', name: 'RELAY MAST',  col: '#f2c41a', w: 8, d: 8, h: 70 },
      CAM:  { code: 'HP', name: 'CAMERA POLE', col: '#c9d1da', w: 3, d: 3, h: 16 },
    },
    order: ['MAST', 'CAM'],
    at: {
      MAST: [[1255, -265], [1545, -265], [1255, -35], [1545, -35]].map(([x, z]) => [1550 + x, z]),
      CAM: [[1250, -150], [1400, -270], [1400, -30], [1550, -150], [1330, -90], [1470, -90]].map(([x, z]) => [1550 + x, z]),
    },
    eye: [1550 + 1400, (window.__WATCH.Y || -85) + 190, -420],
    stats(api, c) { return [['RELAY MASTS', c('MAST') + ' / 4'], ['CAMERA POLES', c('CAM') + ' / 6']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, H = P.pw(api);
      if (type === 'MAST') {
        add(new T.CylinderGeometry(3, 4, 3, 10), H.conc2, 0, 1.5, 0);
        add(new T.CylinderGeometry(0.7, 1.4, 62, 8), H.steel, 0, 33, 0);
        for (let y = 12; y < 62; y += 12) add(new T.BoxGeometry(6, 0.4, 0.4), H.hazard, 0, y, 0, false);
        for (let i = 0; i < 3; i++) { const d = add(new T.SphereGeometry(4, 12, 6, 0, Math.PI * 2, 0, 1.1), H.white, 0, 44 + i * 6, 0, false); d.rotation.set(Math.PI / 2.2, i * 2.1 + k, 0); d.position.set(Math.cos(i * 2.1 + k) * 3, 44 + i * 6, Math.sin(i * 2.1 + k) * 3); }
        add(new T.SphereGeometry(1.6, 10, 8), H.lamp, 0, 66, 0, false);
      } else if (type === 'CAM') {
        add(new T.CylinderGeometry(0.3, 0.5, 15, 6), H.steel2, 0, 7.5, 0, false);
        add(new T.BoxGeometry(2.4, 1.4, 3), H.dark, 0, 15.5, 0, false); add(new T.CylinderGeometry(0.4, 0.4, 0.4, 8), H.cool, 0, 15.5, 1.7, false).rotation.x = Math.PI / 2;
      }
    },
  }));
})();
