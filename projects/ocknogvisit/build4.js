/* ============================================================
   THE VISIT TO OCKNOG · BUILD 4 · THE MARKET
   Keep this file in projects/ocknogvisit next to 80-ocknogvisit.html.
   Four market stalls on the welcome field where the people of Ocknog and Unity trade and talk.
   Council meetings are held on Unity, so Ocknog has no meeting place of its own.
   ============================================================ */
(function () {
  const P = window.PWP;
  const CX = 1550 + 2600, CZ = 990;
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 4, name: 'THE MARKET',
    brief: 'Four market stalls on the welcome field where the people of Ocknog and Unity trade, share food and talk.',
    types: {
      STALL:  { code: 'HM', name: 'MARKET STALL',     col: '#d0a64a', w: 14, d: 10, h: 10 },
    },
    order: ['STALL'],
    at: {
      STALL: [[-92, 85], [92, 85], [-110, 5], [110, 5]].map(([x, z]) => [CX + x, CZ + z]) },
    eye: [CX + 0, (window.__OCK.Y || -85) + 170, CZ + 330],
    stats(api, c) { return [['MARKET STALLS', c('STALL') + ' / 4']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, O = P.ok(api);
      if (type === 'STALL') {
        for (const x of [-6, 6]) for (const z of [-4, 4]) add(new T.CylinderGeometry(0.25, 0.25, 8, 6), O.wood, x, 4, z, false);
        const cl = O.cloth[k % 5]; const aw = add(new T.BoxGeometry(15, 0.35, 10.6), cl, 0, 8.4, 0); aw.rotation.x = 0.1;
        add(new T.BoxGeometry(13, 3, 2), O.wood, 0, 1.6, 3.4);
        const goods = [O.crop, O.crop2, O.clay, O.brass];
        for (let i = 0; i < 6; i++) add(new T.SphereGeometry(0.7, 8, 6), goods[(i + k) % 4], -5 + i * 2, 3.7, 3.4, false);
        for (let i = 0; i < 3; i++) add(new T.CylinderGeometry(0.8, 0.6, 1.4, 8), O.clay2, -4 + i * 4, 3.9, 0.2, false);
        add(new T.BoxGeometry(5, 0.2, 0.2), O.lamp, 0, 7.6, 5.3, false);
        P.alien(api, g, 0, 0.1, -1.8, 0, { seed: 90 + k, mode: k % 2 ? 'wave' : 'idle', scale: 0.9 });
        P.person(g, P.civ(80420 + k), 'idle', 3.5 - k, 2.3, 8.5, Math.PI);
        g.children.forEach(c => { c.position.y += 2.2; });   // the stalls stand on the welcome field
      }
    },
    tick(api, dt, t) { P.moveAliens(t); },
  }));
})();
