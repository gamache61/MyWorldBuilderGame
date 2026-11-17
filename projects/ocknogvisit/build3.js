/* ============================================================
   THE VISIT TO OCKNOG · BUILD 3 · THE GIFTS OF UNITY
   Keep this file in projects/ocknogvisit next to 80-ocknogvisit.html.
   Seed silos, tool sheds and crates of gifts that Unity brings to the friends of Ocknog.
   ============================================================ */
(function () {
  const P = window.PWP;
  const CX = 1550 + 2600, CZ = 990;
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 3, name: 'THE GIFTS OF UNITY',
    brief: 'Four seed silos, three tool sheds and three piles of gift crates that Unity brings, set down beside the meeting place for the friends of Ocknog.',
    types: {
      SILO:  { code: 'HM', name: 'SEED SILO',   col: '#d8d2c6', w: 14, d: 14, h: 22 },
      SHED:  { code: 'FB', name: 'TOOL SHED',   col: '#7a5a3a', w: 24, d: 16, h: 10 },
      CRATES: { code: 'HP', name: 'GIFT CRATES', col: '#e8c13a', w: 16, d: 12, h: 7 },
    },
    order: ['SILO', 'SHED', 'CRATES'],
    at: {
      SILO: [[-215, -60], [215, -60], [-215, -150], [215, -150]].map(([x, z]) => [CX + x, CZ + z]),
      SHED: [[-110, -235], [110, -235], [0, -265]].map(([x, z]) => [CX + x, CZ + z]),
      CRATES: [[-160, -190], [160, -190], [-60, 5]].map(([x, z]) => [CX + x, CZ + z]),
    },
    eye: [CX + 0, (window.__OCK.Y || -85) + 220, CZ + 400],
    stats(api, c) { return [['SEED SILOS', c('SILO') + ' / 4'], ['TOOL SHEDS', c('SHED') + ' / 3'], ['GIFT CRATES', c('CRATES') + ' / 3']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, O = P.ok(api);
      if (type === 'SILO') {
        add(new T.CylinderGeometry(5.5, 6, 16, 16), O.stone, 0, 8, 0);
        add(new T.ConeGeometry(6.6, 6, 16), O.dark, 0, 19, 0);
        add(new T.BoxGeometry(2.6, 4.4, 0.6), O.wood, 0, 2.2, 5.9, false);
        add(new T.BoxGeometry(1.6, 1.6, 0.5), O.lamp, 4.4, 9, 3.4, false);
        P.alien(api, g, 8, 0.1, 6, -0.6, { seed: 120 + k, mode: k % 2 ? 'idle' : 'wave', scale: 0.85 });
      } else if (type === 'SHED') {
        add(new T.BoxGeometry(22, 8, 14), O.wood, 0, 4, 0);
        add(new T.BoxGeometry(24, 1.2, 16), O.dark, 0, 8.4, 0, false).rotation.z = 0.06;
        add(new T.BoxGeometry(5, 5.4, 0.6), O.dark, -4, 2.7, 7.2, false);
        for (let i = 0; i < 3; i++) add(new T.CylinderGeometry(0.2, 0.2, 7, 5), O.wood, 5 + i * 1.6, 3.5, 8.5, false).rotation.z = 0.2 - i * 0.2;
        add(new T.BoxGeometry(1.8, 1.8, 0.5), O.lamp, 7, 6, 7.3, false);
        P.alien(api, g, -9, 0.1, 10, 0.5, { seed: 140 + k, scale: 0.9 });
      } else if (type === 'CRATES') {
        for (let i = 0; i < 6; i++) { const c = add(new T.BoxGeometry(4.2, 3.6, 4.2), i % 2 ? O.wood : O.clay2, (i % 3) * 4.6 - 4.6, 1.8 + (i > 3 ? 3.6 : 0), (i % 2) * 4.6 - 2.3); c.rotation.y = i * 0.2; }
        add(new T.BoxGeometry(4, 0.4, 4), O.cloth[k % 5], 0, 7.6, 0, false);
        P.alien(api, g, 8, 0.1, 5, -0.8, { seed: 160 + k, mode: 'wave', scale: 0.55 });
        P.alien(api, g, -8, 0.1, 5, 0.8, { seed: 170 + k, scale: 0.9 });
      }
    },
    tick(api, dt, t) { P.moveAliens(t); },
  }));
})();
