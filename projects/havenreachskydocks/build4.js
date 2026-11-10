/* ============================================================
   THE HAVENREACH SKY DOCKS · BUILD 4 · THE VISITORS' HALL & THE GLASS SKYDECK
   Keep this file in projects/havenreachskydocks next to 48-havenreachskydocks.html.
   The hall where visitors from Earth step off their ships and are
   welcomed, and the great glass skydeck with a clear floor where
   everyone can look straight down on the green planet Unity.
   ============================================================ */
(function () {
  const P = window.YARD;
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 4, name: 'THE VISITORS’ HALL & THE GLASS SKYDECK',
    brief: 'The hall where visitors from Earth are welcomed, and a great glass skydeck with a clear floor where everyone can look down on Unity.',
    types: {
      VISHALL: { code: 'SY', name: 'VISITORS’ HALL', col: '#e8e1d1', w: 100, d: 56, h: 24 },
      SKYDECK: { code: 'HP', name: 'GLASS SKYDECK', col: '#a8c8ff', w: 110, d: 60, h: 34 },
    },
    order: ['VISHALL', 'SKYDECK'],
    at: { VISHALL: [[120, -400]], SKYDECK: [[120, 400]] },
    eye: [120, 220, 40],
    stats(api, c) { return [['VISITORS’ HALL', c('VISHALL') ? 'OPEN' : 'NOT YET'], ['GLASS SKYDECK', c('SKYDECK') ? 'OPEN' : 'NOT YET']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, S = P.hm(api), C = P.fun(api);
      if (type === 'VISHALL') {
        add(new T.BoxGeometry(102, 1, 58), S.gravel, 0, 0.5, 0);
        add(new T.BoxGeometry(92, 14, 44), F.white, 0, 8, 0); add(new T.BoxGeometry(96, 1.4, 48), S.slate, 0, 15.7, 0);
        add(new T.BoxGeometry(70, 7, 40), F.white, 0, 19.5, 0); add(new T.BoxGeometry(74, 1.2, 44), S.slate, 0, 23.6, 0);
        add(new T.BoxGeometry(80, 10, 0.6), S.glass, 0, 7, 22.4);
        for (let x = -36; x <= 36; x += 12) add(new T.BoxGeometry(0.8, 11, 0.8), F.steel, x, 6.5, 22.6);
        for (const [x, c] of [[-30, 0x2f7fe0], [30, 0x3fb04a]]) { add(new T.CylinderGeometry(0.2, 0.25, 22, 6), F.steel, x, 12, 28); add(new T.BoxGeometry(5, 3, 0.2), new T.MeshStandardMaterial({ color: c, roughness: 0.8 }), x + 2.6, 21, 28); }
        P.sign(api, g, 'VISITORS’ HALL · WELCOME TO UNITY', 40, 4, 0, 26, 0, 0, '#12333a', '#bff8d0', true);
      } else {
        // a round glass pavilion on a deck, with a clear floor ring and a telescope
        add(new T.CylinderGeometry(54, 56, 2, 40), S.gravel, 0, 1, 0);
        add(new T.CylinderGeometry(46, 46, 0.5, 40), S.glass, 0, 2.3, 0);
        const glow = P._skyG = P._skyG || new T.MeshBasicMaterial({ color: new T.Color(0.5, 1.5, 2.6), toneMapped: false });
        const ring = add(new T.TorusGeometry(46, 0.5, 8, 60), glow, 0, 2.8, 0); ring.rotation.x = Math.PI / 2; ring.castShadow = false;
        const dome = add(new T.SphereGeometry(47, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2), S.glass, 0, 2.5, 0); dome.castShadow = false;
        for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; add(new T.BoxGeometry(0.8, 47, 0.8), F.steel, Math.cos(a) * 23.5, 24, Math.sin(a) * 23.5).rotation.set(Math.sin(a) * 0.5, 0, -Math.cos(a) * 0.5); }
        add(new T.CylinderGeometry(6, 6, 1.2, 20), F.dark, 0, 3.1, 0);
        add(new T.CylinderGeometry(0.8, 0.8, 7, 8), F.steel, 0, 6.6, 0); const tel = add(new T.CylinderGeometry(1.2, 1.6, 9, 12), F.white, 0, 11, 0); tel.rotation.x = 0.9;
        for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2; add(new T.BoxGeometry(5, 0.6, 1.4), S.timber, Math.cos(a) * 36, 3, Math.sin(a) * 36).rotation.y = -a; }
        P.sign(api, g, 'GLASS SKYDECK · LOOK DOWN ON UNITY', 40, 4, 0, 4, -48, 0, '#12333a', '#bff8d0', true);
      }
    },
  }));
})();
