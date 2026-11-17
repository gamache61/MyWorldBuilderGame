/* ============================================================
   THE UNITY ACADEMY OF CRAFTS · BUILD 3 · THE BUILDING & WELDING WORKSHOPS
   Keep this file in projects/academyofcrafts next to 81-academyofcrafts.html.
   Two brick workshop halls facing the courtyard, one for building and carpentry and one for welding and metalwork, outdoor forges and stacks of timber and steel.
   ============================================================ */
(function () {
  const P = window.PWP;
  const AX = 1550 - 1400, AZ = 0;
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 3, name: 'THE BUILDING & WELDING WORKSHOPS',
    brief: 'Two long brick workshops facing the courtyard: the Building Hall, where students raise timber frames and brick walls, and the Welding Hall, where they join steel. Outdoor forges and stacks of timber and steel stand beside them.',
    types: {
      SHOP:  { code: 'FB', name: 'WORKSHOP HALL', col: '#b8694a', w: 76, d: 44, h: 26 },
      FORGE: { code: 'HM', name: 'OPEN FORGE',    col: '#e8761a', w: 12, d: 12, h: 10 },
      STACK: { code: 'HM', name: 'MATERIAL STACK', col: '#7a5430', w: 18, d: 8, h: 7 },
    },
    order: ['SHOP', 'FORGE', 'STACK'],
    at: { SHOP: [[AX - 40, AZ - 135], [AX - 40, AZ + 135]],
      FORGE: [[AX + 25, AZ - 108], [AX + 25, AZ + 108]],
      STACK: [[AX - 100, AZ - 98], [AX - 100, AZ + 98], [AX + 55, AZ - 150]] },
    eye: [AX + 240, (window.__ACAD.Y || -85) + 170, AZ + 300],
    stats(api, c) { return [['BUILDING HALL', c('SHOP') >= 1 ? 'OPEN' : 'NOT YET'], ['WELDING HALL', c('SHOP') >= 2 ? 'OPEN' : 'NOT YET'], ['OPEN FORGES', c('FORGE') + ' / 2'], ['MATERIAL STACKS', c('STACK') + ' / 3']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, H = P.pw(api), A = P.ac(api);
      if (type === 'SHOP') {
        const s = k === 0 ? 1 : -1;   // the north hall faces south, the south hall faces north: both face the courtyard
        add(new T.BoxGeometry(80, 1, 48), H.conc2, 0, 0.5, 0);
        add(new T.BoxGeometry(76, 15, 44), A.brick, 0, 8.5, 0);
        add(new T.BoxGeometry(77, 1.2, 45), A.cream, 0, 16.4, 0, false);
        for (const q of [-1, 1]) { const r = add(new T.BoxGeometry(78, 0.9, 24), A.tile, 0, 21.2, q * 10.4); r.rotation.x = -q * 0.46; }
        add(new T.BoxGeometry(79, 0.9, 1.4), A.brass, 0, 26.3, 0, false);
        const sh = new T.Shape(); sh.moveTo(-22, 0); sh.lineTo(22, 0); sh.lineTo(0, 10.4); sh.lineTo(-22, 0);
        for (const q of [-1, 1]) { const gb = add(new T.ExtrudeGeometry(sh, { depth: 0.8, bevelEnabled: false }), A.brick2, q * 38.4, 16, 0, false); gb.rotation.y = Math.PI / 2; }
        add(new T.BoxGeometry(18, 11, 0.8), A.iron, 0, 7, s * 22.2, false); add(new T.BoxGeometry(20, 0.8, 1.4), A.timber, 0, 12.6, s * 22.4, false);
        for (const x of [-24, -14, 14, 24]) add(new T.BoxGeometry(5, 5.4, 0.5), H.win, x, 10, s * 22.2, false);
        add(new T.BoxGeometry(3.2, 15, 3.2), A.brick2, 28, 25, -s * 10); add(new T.BoxGeometry(4, 1, 4), A.iron, 28, 32.6, -s * 10, false);
        if (k === 0) {
          // timber frame going up and a stack of bricks
          for (let i = 0; i < 4; i++) { add(new T.BoxGeometry(0.8, 11, 0.8), A.timber, -31 + i * 6, 6.5, s * 32, false); }
          add(new T.BoxGeometry(18.8, 0.8, 0.8), A.timber, -22, 12, s * 32, false); add(new T.BoxGeometry(18.8, 0.8, 0.8), A.timber, -22, 6, s * 32, false);
          for (let i = 0; i < 3; i++) for (let j = 0; j < 4; j++) add(new T.BoxGeometry(2.4, 1.1, 1.2), A.brick, 20 + j * 2.6, 1.5 + i * 1.15, s * 30, false);
          P.sign(api, g, 'THE BUILDING HALL', 30, 3.2, 0, 14.4, s * 22.9, s > 0 ? 0 : Math.PI, '#3a2210', '#ffe08a', false);
        } else {
          // welding: bright sparks at the door and beams on trestles
          for (let i = 0; i < 6; i++) add(new T.SphereGeometry(0.35, 6, 5), A.spark, -4 + (i % 3) * 3, 4 + (i % 2) * 1.6, s * 27, false);
          add(new T.BoxGeometry(14, 1, 1.2), H.beam, 20, 3.4, s * 30, false); add(new T.BoxGeometry(14, 1, 1.2), H.beam, 20, 4.8, s * 31.4, false);
          for (const x of [14, 26]) add(new T.BoxGeometry(0.8, 3.4, 4), A.iron, x, 1.9, s * 30.6, false);
          P.sign(api, g, 'THE WELDING HALL', 30, 3.2, 0, 14.4, s * 22.9, s > 0 ? 0 : Math.PI, '#2a2f38', '#ffb070', false);
        }
        P.person(g, P.kid(81030 + k), 'idle', -8, 1, s * 29, s > 0 ? 0 : Math.PI);
        P.person(g, P.civ(81032 + k), 'tablet', 6, 1, s * 28, s > 0 ? 0 : Math.PI);
      } else if (type === 'FORGE') {
        add(new T.BoxGeometry(9, 4, 7), A.brick2, 0, 2.4, 0); add(new T.BoxGeometry(4, 1, 3), A.fire, 0, 4.6, 0, false);
        add(new T.BoxGeometry(2.6, 7, 2.6), A.brick, -3, 7, -2.4); add(new T.BoxGeometry(3, 1.6, 6), A.iron, 4.6, 1.8, 0);
        P.person(g, P.kid(81040 + k), 'idle', 0, 0.5, 6.4, Math.PI);
      } else if (type === 'STACK') {
        const mat = k === 1 ? H.beam : A.timber;
        for (let r = 0; r < 3; r++) for (let c = 0; c < 4 - r; c++) add(new T.BoxGeometry(16, 1.7, 1.7), mat, 0, 1.2 + r * 1.9, -3 + c * 2 + r);
        add(new T.BoxGeometry(18, 0.4, 8), H.conc2, 0, 0.2, 0, false);
      }
    },
  }));
})();
