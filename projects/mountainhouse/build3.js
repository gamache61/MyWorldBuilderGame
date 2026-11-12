/* ============================================================
   MOUNTAIN HOUSE · BUILD 3 · THE HOUSE ON THE SUMMIT
   Keep this file in projects/mountainhouse next to 63-mountainhouse.html.
   A round stone terrace on the flat summit, the house — two long wings of
   timber, white walls and glass with green roofs — and a glass viewing tower.
   ============================================================ */
(function () {
  const P = window.MTN;
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 3, name: 'THE HOUSE ON THE SUMMIT',
    brief: 'On the flat top of the mountain: a round stone terrace, the house itself — two long wings of timber, white wall and glass under green roofs — and a glass viewing tower.',
    types: {
      FOUNDATION: { code: 'SF', name: 'SUMMIT TERRACE', col: '#b9b1a2', w: 124, d: 124, h: 2 },
      WING:       { code: 'HM', name: 'HOUSE WING',     col: '#d9c9a8', w: 40,  d: 30,  h: 18 },
      TOWER:      { code: 'SY', name: 'GLASS TOWER',    col: '#bfe8ff', w: 18,  d: 18,  h: 36 },
    },
    order: ['FOUNDATION', 'WING', 'TOWER'],
    at: { FOUNDATION: [[1550 - 32, 12]], WING: [[1550 - 52, 12], [1550 - 12, 12]], TOWER: [[1550 + 12, -22]] },
    eye: [200, 440, 190],
    stats(api, c) { return [['TERRACE', c('FOUNDATION') ? 'LAID' : 'NOT YET'], ['HOUSE WINGS', c('WING') + ' / 2'], ['GLASS TOWER', c('TOWER') ? 'STANDING' : 'NOT YET'], ['ROOMS', c('WING') * 6]]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, H = P.mh(api);
      if (type === 'FOUNDATION') {
        add(new T.CylinderGeometry(62, 62, 0.7, 48), H.stone, 0, 0.35, 0, false);
        add(new T.TorusGeometry(61, 0.9, 6, 64), H.stone2, 0, 1.1, 0, true).rotation.x = Math.PI / 2;
        for (let i = 0; i < 16; i++) { const a = i / 16 * Math.PI * 2; add(new T.CylinderGeometry(0.2, 0.25, 4, 6), H.dark, Math.cos(a) * 61, 2.6, Math.sin(a) * 61, false); if (i % 2 === 0) add(new T.SphereGeometry(0.5, 8, 6), H.lamp, Math.cos(a) * 61, 4.8, Math.sin(a) * 61, false); }
        const ring = add(new T.TorusGeometry(40, 0.25, 6, 64), H.stone2, 0, 0.75, 0, false); ring.rotation.x = Math.PI / 2;
      } else if (type === 'WING') {
        const w = 40, d = 30, h = 13, wm = k ? H.white : H.cream;
        add(new T.BoxGeometry(w, h, d), wm, 0, h / 2 + 0.7, 0, true);
        add(new T.BoxGeometry(w + 4, 0.9, d + 4), H.roof, 0, h + 1.2, 0, true); add(new T.BoxGeometry(w + 2, 0.8, d + 2), H.grass, 0, h + 1.9, 0, false);
        add(new T.BoxGeometry(w + 4, 0.5, 0.8), H.timber2, 0, h + 0.7, d / 2 + 2, false); add(new T.BoxGeometry(w + 4, 0.5, 0.8), H.timber2, 0, h + 0.7, -d / 2 - 2, false);
        // big glass on the long south side and the east end, timber posts between
        for (let i = 0; i < 5; i++) { const x = -16 + i * 8; add(new T.BoxGeometry(6.4, 8.6, 0.4), H.glass, x, 6, d / 2 + 0.15, false); add(new T.BoxGeometry(0.7, 11, 0.8), H.timber, x + 4, 6.2, d / 2 + 0.3, false); add(new T.BoxGeometry(6, 8, 0.3), H.win, x, 6, d / 2 - 0.2, false); }
        add(new T.BoxGeometry(0.4, 8.6, 20), H.glass, w / 2 + 0.15, 6, 0, false); add(new T.BoxGeometry(0.3, 8, 19), H.win, w / 2 - 0.2, 6, 0, false);
        for (let i = 0; i < 5; i++) { const x = -16 + i * 8; add(new T.BoxGeometry(6.4, 8.6, 0.4), H.glass, x, 6, -d / 2 - 0.15, false); add(new T.BoxGeometry(0.7, 11, 0.8), H.timber, x + 4, 6.2, -d / 2 - 0.3, false); add(new T.BoxGeometry(6, 8, 0.3), H.win, x, 6, -d / 2 + 0.2, false); }
        add(new T.BoxGeometry(w + 2, 0.6, 7), H.timber, 0, 0.9, -d / 2 - 4, true);   // deck on the north side too, facing Kryos
        if (k === 1) { add(new T.BoxGeometry(7, 0.6, 24), H.timber, w / 2 + 4, 0.9, 0, true); P.person(g, P.civ(63110), 'idle', w / 2 + 4.5, 1.3, 4, Math.PI / 2); }
        add(new T.BoxGeometry(w + 2, 0.6, 7), H.timber, 0, 0.9, d / 2 + 4, true);   // deck
        if (k === 0) { add(new T.BoxGeometry(3.4, 9, 3.4), H.stone2, -12, h + 5.5, -8, true); add(new T.BoxGeometry(4.2, 0.8, 4.2), H.dark, -12, h + 10.2, -8, false); }
        if (k === 1) { add(new T.BoxGeometry(4, 7.6, 0.4), H.timber2, 14, 4.5, d / 2 + 0.4, false); }
        P.person(g, P.civ(63100 + k), 'idle', -6 + k * 8, 1.3, d / 2 + 4.5, 0);
      } else if (type === 'TOWER') {
        add(new T.CylinderGeometry(8.4, 9, 1.4, 20), H.stone2, 0, 0.7, 0, true);
        add(new T.CylinderGeometry(7, 7, 28, 20, 1, true), H.glass, 0, 15.4, 0, false);
        for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2; add(new T.BoxGeometry(0.7, 28, 0.7), H.steel, Math.cos(a) * 7, 15.4, Math.sin(a) * 7, false); }
        for (const y of [10, 20]) add(new T.CylinderGeometry(6.8, 6.8, 0.5, 20), H.timber, 0, y, 0, false);
        add(new T.CylinderGeometry(9.6, 9.6, 1, 20), H.roof, 0, 29.8, 0, true); add(new T.ConeGeometry(9.6, 5, 20), H.roof, 0, 32.8, 0, true);
        add(new T.CylinderGeometry(0.25, 0.25, 7, 6), H.steel, 0, 38, 0, false); add(new T.SphereGeometry(0.6, 8, 6), H.glowA, 0, 41.7, 0, false);
      }
    },
  }));
})();
