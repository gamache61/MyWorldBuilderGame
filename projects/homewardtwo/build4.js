/* ============================================================
   HOMEWARD TWO · BUILD 4 · THE SCHOOL & THE MARKET
   Keep this file in projects/homewardtwo next to 44-homewardtwo.html.
   The district's own school on the west side of the street — a long
   low schoolhouse with a bell tower, flag, and a playing yard — and
   the covered market on the east side, with stalls, crates and a
   clock, so the families never have to go far for lessons or food.
   ============================================================ */
(function () {
  const P = window.HW2;
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 4, name: 'THE SCHOOL & THE MARKET',
    brief: 'The district school with its bell tower and playing yard, and the covered market with its stalls and clock, on either side of the street.',
    types: {
      SCHOOLHOUSE: { code: 'SF', name: 'SCHOOLHOUSE', col: '#e8cfa6', w: 100, d: 70, h: 28 },
      MARKETHALL:  { code: 'SY', name: 'MARKET HALL', col: '#d9a21b', w: 100, d: 70, h: 24 },
      SCHOOLYARD:  { code: 'GD', name: 'PLAYING YARD', col: '#3fb04a', w: 100, d: 36, h: 6 },
      MARKETSQUARE: { code: 'SF', name: 'MARKET SQUARE', col: '#bfb49c', w: 100, d: 36, h: 8 },
    },
    order: ['SCHOOLHOUSE', 'MARKETHALL', 'SCHOOLYARD', 'MARKETSQUARE'],
    at: { SCHOOLHOUSE: [[-655, 780]], MARKETHALL: [[-445, 780]], SCHOOLYARD: [[-655, 855]], MARKETSQUARE: [[-445, 855]] },
    eye: [-220, 220, -260],
    stats(api, c) { return [['SCHOOL', c('SCHOOLHOUSE') ? 'STANDING' : 'NOT YET'], ['PLAYING YARD', c('SCHOOLYARD') ? 'READY' : 'NOT YET'], ['MARKET', c('MARKETHALL') ? 'COVERED HALL' : 'NOT YET'], ['MARKET SQUARE', c('MARKETSQUARE') ? 'OPEN' : 'NOT YET']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, H = P.h2(api);
      if (type === 'SCHOOLHOUSE') {
        // fronts face east, to the street
        const rg = new T.Group(); rg.rotation.y = Math.PI / 2; g.add(rg);
        add(new T.BoxGeometry(80, 14, 30), H.walls[1], 0, 7, 0, true, rg);
        for (const s of [-1, 1]) add(new T.BoxGeometry(24, 18, 40), H.walls[4], s * 44, 9, 4, true, rg);
        add(new T.BoxGeometry(34, 22, 26), H.walls[1], 0, 11, 0, true, rg);
        // clay roofs
        for (const s of [-1, 1]) { const r = add(new T.BoxGeometry(84, 0.8, 18), H.clay, 0, 17.5, s * 7, true, rg); r.rotation.x = s * -0.32; }
        for (const s of [-1, 1]) { const r = add(new T.BoxGeometry(26, 0.8, 24), H.clay2, s * 44, 21, 4 + 0, true, rg); r.rotation.z = s * 0.0; }
        const pr = add(new T.ConeGeometry(21, 8, 4), H.clay, 0, 26, 0, true, rg); pr.rotation.y = Math.PI / 4;
        // bell tower with a clock
        add(new T.BoxGeometry(9, 16, 9), H.walls[4], 0, 34, 0, true, rg); add(new T.ConeGeometry(7.5, 8, 4), H.clay, 0, 46, 0, true, rg).rotation.y = Math.PI / 4;
        add(new T.CylinderGeometry(2.4, 2.4, 0.5, 20).rotateX(Math.PI / 2), H.white, 0, 35, 4.6, false); add(new T.CylinderGeometry(2.4, 2.4, 0.5, 20).rotateX(Math.PI / 2), H.white, 0, 35, -4.6, false);
        add(new T.CylinderGeometry(0.15, 0.15, 3, 6), H.slate, 0, 44, 0);
        // rows of tall windows and a wide doorway on the street side (east)
        for (let i = -3; i <= 3; i++) add(new T.BoxGeometry(5, 7, 0.4), H.win, i * 10, 8, 15.2, false, rg);
        add(new T.BoxGeometry(10, 9, 0.5), H.door[0], 0, 4.5, 13.3, false, rg);
        add(new T.BoxGeometry(12, 0.6, 4), H.stone, 0, 0.3, 16, false, rg);
        // flagpole and the school sign
        add(new T.CylinderGeometry(0.2, 0.3, 24, 6), H.slate, 36, 12, 24, false, rg); add(new T.BoxGeometry(7, 4, 0.2), H.white, 39.6, 22, 24, false, rg);
        P.sign(api, g, 'HOMEWARD TWO SCHOOL', 34, 3.6, 15.5, 20, 0, Math.PI / 2, '#4a2a22', '#ffe9c8', false);
        for (let i = 0; i < 5; i++) { const lx = -30 + i * 14; P.person(g, P.kid(44100 + i), i % 2 ? 'idle' : 'walk', 24, 0.4, -lx, Math.PI / 2, i % 2 ? undefined : { path: { type: 'line', ax: 22, az: -lx, bx: 34, bz: -lx - 8, speed: 1.2 }, scale: 0.6 }); }
        P.person(g, P.civ(44110), 'tablet', 20, 0.4, 8, Math.PI / 2);
      } else if (type === 'MARKETHALL') {
        // a big covered hall on timber posts, open on every side, with a clay roof, stalls and crates
        for (let x = -45; x <= 45; x += 15) for (const z of [-30, 30]) add(new T.CylinderGeometry(0.9, 1.1, 18, 8), H.timber, x, 9, z);
        const th = 0.3;
        for (const s of [-1, 1]) { const r = add(new T.BoxGeometry(104, 1, 38), H.clay, 0, 21, s * 17, true); r.rotation.x = s * th; }
        add(new T.BoxGeometry(104, 1.2, 1.6), H.clay2, 0, 24.7, 0);
        add(new T.BoxGeometry(100, 0.8, 66), H.paving, 0, 0.4, 0, false);
        // stalls in rows with striped awnings
        const cols = [0xd24a3a, 0x2f7fe0, 0x3fb04a, 0xf2c41a, 0xf06aa8, 0x8a4fd0];
        for (let i = 0; i < 6; i++) for (const z of [-17, 17]) {
          const x = -42 + i * 17;
          add(new T.BoxGeometry(11, 3.4, 5), H.timber, x, 1.7, z); add(new T.BoxGeometry(12, 0.5, 6.4), new T.MeshStandardMaterial({ color: cols[(i + (z > 0 ? 3 : 0)) % 6], roughness: 0.85 }), x, 6.4, z);
          for (let q = 0; q < 4; q++) add(new T.SphereGeometry(0.7, 6, 5), H.flower[(i + q) % 5], x - 3.6 + q * 2.4, 3.9, z + (z > 0 ? -1 : 1) * 0.6, false);
          for (const px of [-5, 5]) add(new T.CylinderGeometry(0.2, 0.2, 5, 5), H.timber, x + px, 4, z + (z > 0 ? 2.6 : -2.6));
        }
        // crates, sacks and baskets in the aisle
        for (let i = 0; i < 9; i++) add(new T.BoxGeometry(2.4, 1.8, 2.4), H.timber, -40 + i * 10, 1.3, (i % 2 ? 4 : -4), true);
        // a clock over the street side
        add(new T.BoxGeometry(0.8, 6, 14), H.walls[1], -31.5, 21.5, 0, true); add(new T.CylinderGeometry(2.2, 2.2, 0.5, 20).rotateZ(Math.PI / 2), H.white, -32.1, 21.5, 0, false);
        P.sign(api, g, 'HOMEWARD TWO MARKET', 30, 3.2, -31.4, 17, 0, -Math.PI / 2, '#4a2a22', '#ffe9c8', false);
        for (let i = 0; i < 7; i++) P.person(g, P.civ(44120 + i), i % 3 === 0 ? 'idle' : 'walk', -38 + i * 12, 0.5, 0, i % 2 ? 0 : Math.PI, i % 3 === 0 ? undefined : { path: { type: 'line', ax: -42 + i * 12, az: 0, bx: -30 + i * 12, bz: 0, speed: 0.9 } });
      } else if (type === 'SCHOOLYARD') {
        // a playing yard: a green court with lines, a fence, swings, a slide and a sandpit, children playing
        add(new T.BoxGeometry(100, 0.5, 36), H.grass, 0, 0.25, 0, false);
        add(new T.BoxGeometry(46, 0.55, 26), new T.MeshStandardMaterial({ color: 0x3a7d44, roughness: 1 }), -22, 0.3, 0, false);
        for (const [x, z, bw, bd] of [[-22, 0, 44, 0.5], [-22, -12, 44, 0.5], [-22, 12, 44, 0.5], [-22, 0, 0.5, 24]]) add(new T.BoxGeometry(bw, 0.6, bd), H.white, x, 0.35, z, false);
        for (const x of [-44, 0]) { add(new T.CylinderGeometry(0.25, 0.25, 7, 6), H.slate, x, 3.5, 0); add(new T.BoxGeometry(0.4, 0.4, 5), H.slate, x, 7, 0); }
        for (const [x, z] of [[18, -8], [28, -8], [38, -8]]) { add(new T.BoxGeometry(0.3, 8, 0.3), H.timber, x - 3, 4, z); add(new T.BoxGeometry(0.3, 8, 0.3), H.timber, x + 3, 4, z); add(new T.BoxGeometry(7, 0.3, 0.3), H.timber, x, 8, z); add(new T.BoxGeometry(2.4, 0.3, 1.2), H.door[2], x, 2.6, z, false); }
        add(new T.BoxGeometry(12, 0.8, 12), new T.MeshStandardMaterial({ color: 0xe8d49a, roughness: 1 }), 30, 0.55, 9, false);
        const sl2 = add(new T.BoxGeometry(2.4, 0.4, 12), H.door[0], 44, 3.6, 8, true); sl2.rotation.x = 0.5; add(new T.BoxGeometry(3, 0.6, 3), H.timber, 44, 7, 4);
        for (const z of [-17.5, 17.5]) add(new T.BoxGeometry(98, 1.6, 0.3), H.slate, 0, 1.2, z, false);
        for (const [x, z] of [[-46, 14], [46, -14]]) P.tree(api, add, x, 0.4, z, 0.8, x);
        for (let i = 0; i < 5; i++) P.person(g, P.kid(44140 + i), 'walk', -20 + i * 8, 0.5, 0, 0, { path: { type: 'line', ax: -40 + i * 10, az: -9 + i * 2, bx: -10 + i * 10, bz: 9 - i * 2, speed: 1.5 }, scale: 0.6 });
      } else if (type === 'MARKETSQUARE') {
        // a paved square in front of the market with a clock column, trees, benches and a few outdoor stalls
        add(new T.BoxGeometry(100, 0.5, 36), H.paving, 0, 0.25, 0, false);
        for (let x = -45; x <= 45; x += 10) add(new T.BoxGeometry(0.5, 0.12, 36), H.paving2, x, 0.56, 0, false);
        add(new T.CylinderGeometry(2.4, 3, 1.4, 12), H.stone, 0, 1, 0); add(new T.CylinderGeometry(1, 1.3, 14, 10), H.walls[1], 0, 8.4, 0);
        add(new T.CylinderGeometry(2.6, 2.6, 0.8, 20).rotateX(Math.PI / 2), H.white, 0, 13.5, 0.8, false); add(new T.ConeGeometry(2.4, 3, 8), H.clay, 0, 16.4, 0);
        for (const [x, z] of [[-40, -12], [-40, 12], [40, -12], [40, 12], [-20, 14], [20, -14]]) { P.tree(api, add, x, 0.4, z, 0.75, x + z); add(new T.BoxGeometry(5, 0.9, 1.4), H.timber, x + (x < 0 ? 5 : -5), 0.95, z); }
        for (let i = 0; i < 3; i++) { const x = -22 + i * 22; add(new T.BoxGeometry(8, 3, 4), H.timber, x, 1.5, 11); add(new T.BoxGeometry(9, 0.4, 5), new T.MeshStandardMaterial({ color: [0xd24a3a, 0x3fb04a, 0xf2c41a][i], roughness: 0.9 }), x, 5.6, 11); for (const px of [-3.6, 3.6]) add(new T.CylinderGeometry(0.2, 0.2, 5, 5), H.timber, x + px, 3, 13); }
        for (let i = 0; i < 3; i++) P.lamp(api, add, -40 + i * 40, 0.4, -15);
        for (let i = 0; i < 5; i++) P.person(g, i % 2 ? P.kid(44160 + i) : P.civ(44160 + i), i % 2 ? 'idle' : 'walk', -30 + i * 14, 0.5, 0, 0, i % 2 ? { scale: 0.6 } : { path: { type: 'line', ax: -36 + i * 14, az: 0, bx: -24 + i * 14, bz: 8, speed: 0.9 } });
      }
    },
  }));
})();
