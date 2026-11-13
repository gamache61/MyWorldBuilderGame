/* ============================================================
   THE ORCHARD VALLEY · BUILD 3 · THE ORCHARDS
   Keep this file in projects/orchardvalley next to 66-orchardvalley.html.
   Six orchard plots on either side of the road: apple, pear, plum and cherry,
   in tidy rows with grass between them, crates and ladders, and a few pickers.
   ============================================================ */
(function () {
  const P = window.ORV;
  P.plot = function (api, add, g, k) {
    const T = api.THREE, H = P.ov(api), v = k % 4;
    add(new T.BoxGeometry(90, 0.2, 126), H.grassDark, 0, 0.1, 0, false);
    for (let i = 0; i < 6; i++) add(new T.BoxGeometry(90, 0.05, 10), H.lawn2, 0, 0.24, -50 + i * 20, false);
    let n = 0;
    for (const x of [-33, -11, 11, 33]) for (let z = -50; z <= 50; z += 20) { P.fruitTree(api, add, H, x + (n % 3) * 0.6, z + (n % 2) * 0.5, 0.95 + (n % 4) * 0.08, v, n); n++; }
    // a little path down the middle, crates, a ladder and a wheelbarrow
    add(new T.BoxGeometry(2.6, 0.1, 118), H.path, 0, 0.28, 0, false);
    for (const [x, z] of [[-40, 58], [-37, 58], [-38.5, 58]]) { add(new T.BoxGeometry(2.4, 1.2, 1.8), H.timber, x, 0.7, z + (x > -38 ? 2 : 0), false); }
    add(new T.BoxGeometry(0.2, 6, 0.2), H.timber2, 38, 3, 4, false).rotation.z = 0.2; add(new T.BoxGeometry(0.2, 6, 0.2), H.timber2, 39.4, 3, 4, false).rotation.z = 0.2;
    for (let i = 0; i < 6; i++) add(new T.BoxGeometry(1.5, 0.15, 0.15), H.timber2, 38.7, 0.8 + i, 4, false);
    const fruitMat = [H.apple, H.pear, H.plum, H.blossom2][v];
    for (let i = 0; i < 5; i++) add(new T.SphereGeometry(0.4, 6, 5), fruitMat, -37 + i * 0.6, 1.5, 59, false);
    if (k % 2 === 0) P.person(g, P.civ(66100 + k), 'idle', 6, 0.4, -8, k % 4 ? Math.PI : 0);
    P.sign(api, g, ['APPLES', 'PEARS', 'PLUMS', 'CHERRIES'][v], 9, 1.4, -44, 3.2, -62, 0, '#2a3a1a', '#fff0c0');
  };
  const X = [-195, -100, -5], Z = [-75, 75];
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 3, name: 'THE ORCHARDS',
    brief: 'Six orchard plots on either side of the road: apples, pears, plums and cherry trees in blossom, in tidy rows with grass between, crates, ladders and a few pickers.',
    types: { ORCHARD: { code: 'GD', name: 'ORCHARD PLOT', col: '#6fae52', w: 90, d: 126, h: 9 } },
    order: ['ORCHARD'],
    at: { ORCHARD: Z.flatMap(z => X.map(x => [1550 + x, z])) },
    eye: [1550 + 60, P.SY + 110, 260],
    stats(api, c) { return [['ORCHARD PLOTS', c('ORCHARD') + ' / 6'], ['FRUIT TREES', c('ORCHARD') * 24]]; },
    make(type, k, g, add, F, api, sl) { P.plot(api, add, g, k); },
  }));
})();
