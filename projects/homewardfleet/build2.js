/* ============================================================
   THE HOMEWARD FLEET · BUILD 2 · THE THREE BERTHS
   Keep this file in projects/homewardfleet next to homewardfleet.html.
   Three great building berths side by side, each long enough for an
   Ark and fitted with its hull cradles, and eight tall yard towers
   between them to carry the bridge cranes.
   ============================================================ */
(window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(window.FLEET.build({
  id: 2, name: 'THE THREE BERTHS',
  brief: 'Three great building berths side by side, each long enough for an Ark and fitted with hull cradles, and eight yard towers between them for the cranes.',
  types: {
    BERTH:     { code: 'SF', name: 'BUILDING BERTH', col: '#6c757d', w: 160, d: 480, h: 14 },
    YARDTOWER: { code: 'SF', name: 'YARD TOWER', col: '#6c757d', w: 14, d: 14, h: 92 },
  },
  order: ['BERTH', 'YARDTOWER'],
  at: {
    BERTH: [[380, 0], [560, 0], [740, 0]],
    YARDTOWER: [[290, -250], [470, -250], [650, -250], [830, -250], [290, 250], [470, 250], [650, 250], [830, 250]],
  },
  eye: [-280, 220, 380],
  stats(api, c) { return [['BERTHS', c('BERTH') + ' / 3'], ['YARD TOWERS', c('YARDTOWER') + ' / 8']]; },
  make(type, k, g, add, F, api) {
    const T = api.THREE, FL = window.FLEET;
    if (type === 'BERTH') {
      add(new T.BoxGeometry(160, 1.6, 480), F.deck, 0, 0.8, 0);
      for (const [w, d, x, z] of [[160, 2, 0, 239], [160, 2, 0, -239], [2, 480, 79, 0], [2, 480, -79, 0]]) add(new T.BoxGeometry(w, 0.2, d), F.yellow, x, 1.7, z, false);
      for (let z = -230; z <= 230; z += 23) for (const s of [-1, 1]) add(new T.BoxGeometry(1.4, 0.6, 1.4), F.glow, s * 77, 1.9, z, false);
      // the hull cradles the Ark is built on
      for (const z of [-150, -50, 50, 150]) { for (const x of [-34, 34]) { add(new T.BoxGeometry(16, 12, 10), F.armor, x, 6, z); add(new T.BoxGeometry(18, 1.2, 11), F.yellow, x, 12.6, z); } add(new T.BoxGeometry(84, 2, 4), F.dark, 0, 1, z); }
      const sign = api.canvasTex(512, 128, (c, w, h) => { c.clearRect(0, 0, w, h); c.fillStyle = '#f2f2f2'; c.font = 'bold 84px Arial'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('BERTH ' + (k + 1), w / 2, h / 2); });
      const sg = new T.Mesh(new T.PlaneGeometry(90, 22).rotateX(-Math.PI / 2), new T.MeshBasicMaterial({ map: sign, transparent: true })); sg.position.set(0, 1.75, 222); g.add(sg);
      FL.person(g, { kind: 'worker', seed: 12001 + k, female: k === 1 }, 'kneelWork', 30, 2, -50, 0);
    } else if (type === 'YARDTOWER') {
      add(new T.BoxGeometry(14, 3, 14), F.dark, 0, 1.5, 0);
      for (const [x, z] of [[-5, -5], [5, -5], [-5, 5], [5, 5]]) add(new T.BoxGeometry(1.4, 86, 1.4), F.yellow, x, 46, z);
      for (let y = 10; y < 88; y += 10) for (const [w, d, x, z] of [[11, 0.8, 0, -5], [11, 0.8, 0, 5], [0.8, 11, -5, 0], [0.8, 11, 5, 0]]) add(new T.BoxGeometry(w, 0.8, d), F.yellow, x, y, z);
      add(new T.BoxGeometry(16, 4, 16), F.armor, 0, 90, 0);
      // the rail the bridge cranes ride on runs along the top of each row of towers
      if (k === 0 || k === 4) add(new T.BoxGeometry(554, 1.6, 3), F.steel, 270, 92.8, 0);
      const red = new T.Mesh(new T.SphereGeometry(1, 8, 6), new T.MeshBasicMaterial({ color: 0xff3020 })); red.position.y = 94.5; red.userData.keep = true; g.add(red); api.blink(red, 1.5, 0xff3020);
      if (k === 1) FL.person(g, { kind: 'worker', seed: 12010, female: false }, 'tablet', -10, 0, 10, Math.PI / 2);
    }
  },
}));
