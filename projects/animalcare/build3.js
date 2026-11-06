/* ============================================================
   THE ANIMAL CARE CENTRE · BUILD 3 · THE WILDLIFE REFUGE
   Keep this file in projects/animalcare next to animalcare.html.
   Three quiet enclosures at the forest edge, with ponds, shelters and
   their own trees, where hurt wild animals — deer, foxes and rabbits —
   rest and heal before they go back to the forest.
   ============================================================ */
(function () {
  const P = window.VET;
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 3, name: 'THE WILDLIFE REFUGE',
    brief: 'Three quiet enclosures at the forest edge, with ponds, shelters and their own trees, where hurt wild animals rest and heal before they go back to the forest.',
    types: {
      ENCLOSURE: { code: 'GD', name: 'REFUGE ENCLOSURE', col: '#3fb04a', w: 110, d: 110, h: 14 },
    },
    order: ['ENCLOSURE'],
    at: { ENCLOSURE: [[1180, -200], [1180, 200], [1330, 10]] },
    eye: [-260, 230, 300],
    stats(api, c) { return [['REFUGE ENCLOSURES', c('ENCLOSURE') + ' / 3'], ['ANIMALS IN CARE', c('ENCLOSURE') * 9]]; },
    make(type, k, g, add, F, api) {
      const T = api.THREE, S = P.hm(api), C = P.fun(api);
      add(new T.CylinderGeometry(55, 55, 0.4, 40), C.grass, 0, 0.2, 0);
      // a high wooden fence that animals cannot jump, with a gate for the healers
      for (let i = 0; i < 40; i++) { const a = i / 40 * Math.PI * 2; if (i === 10) continue; add(new T.BoxGeometry(0.6, 6, 0.6), S.timber, Math.cos(a) * 53, 3, Math.sin(a) * 53); }
      for (const y of [2, 4.5]) add(new T.TorusGeometry(53, 0.25, 4, 64).rotateX(Math.PI / 2), S.timber, 0, y, 0);
      // a pond, a shelter of logs and trees from the forest inside
      add(new T.CylinderGeometry(12, 12, 0.5, 24), F.water, -18, 0.5, 14, false);
      add(new T.BoxGeometry(16, 0.6, 10), S.timber, 22, 5.6, -22); for (const [x, z] of [[15, -26], [29, -26], [15, -18], [29, -18]]) add(new T.CylinderGeometry(0.5, 0.5, 5.6, 6), S.timber, x, 2.8, z);
      add(new T.BoxGeometry(14, 1.6, 8), S.yellow, 22, 1.2, -22);
      for (let i = 0; i < 9; i++) { const a = i * 0.71 + k, r = 26 + (i % 3) * 7; add(new T.CylinderGeometry(0.6, 0.9, 8, 6), F.wood, Math.cos(a) * r, 4, Math.sin(a) * r); i % 2 ? add(new T.ConeGeometry(4, 12, 7), F.crops[2], Math.cos(a) * r, 13, Math.sin(a) * r) : add(new T.IcosahedronGeometry(5, 1), F.crops[(i + k) % 5], Math.cos(a) * r, 11, Math.sin(a) * r); }
      // the animals in each enclosure: deer, foxes and rabbits
      const kinds = [['deer', 4, 2.4], ['fox', 3, 2.2], ['rabbit', 6, 2.2]];
      for (const [kind, n, sc] of [kinds[k % 3], kinds[(k + 1) % 3]]) P.wander(api, add, g, kind, 0, 0, kind === 'deer' ? 30 : 18, Math.max(2, n - 1), sc, 0.4);
      P.sign(api, g, ['REFUGE · DEER', 'REFUGE · FOXES', 'REFUGE · RABBITS'][k], 14, 2, 53.6, 6.4, 0, Math.PI / 2, '#3a2a1a', '#e8d8b0', false);
      P.person(g, P.civ(20100 + k), 'tablet', 46, 0.4, 6, Math.PI / 2);
    },
  }));
})();
