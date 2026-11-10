/* ============================================================
   THE EARTH TRADE PORT · BUILD 3 · THE WAREHOUSES & THE ORE STORES
   Keep this file in projects/earthtradeport next to 46-earthtradeport.html.
   Long warehouses where food, parts and goods wait for their ships,
   and open ore stores where heaps of raw ore and glowing fuel
   crystals from the Crystal Mines wait to be loaded.
   ============================================================ */
(function () {
  const P = window.YARD;
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 3, name: 'THE WAREHOUSES & THE ORE STORES',
    brief: 'Long warehouses for goods waiting for their ships, and open ore stores where ore and glowing fuel crystals wait to be loaded.',
    types: {
      WAREHOUSE: { code: 'SY', name: 'WAREHOUSE', col: '#d8d2c6', w: 90, d: 50, h: 22 },
      OREBAY: { code: 'SY', name: 'ORE STORE', col: '#8a5a3a', w: 70, d: 50, h: 18 },
    },
    order: ['WAREHOUSE', 'OREBAY'],
    at: { WAREHOUSE: [[-110, -1345], [-110, -1415], [-110, -1485]], OREBAY: [[-10, -1360], [-10, -1450]] },
    eye: [-250, 130, -1230],
    stats(api, c) { return [['WAREHOUSES', c('WAREHOUSE') + ' / 3'], ['ORE STORES', c('OREBAY') + ' / 2']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, S = P.hm(api), C = P.fun(api);
      const cols = [0xc8643a, 0x2f7fe0, 0xe8c13a, 0x3fb04a, 0xf2f4f6, 0x8a4fd0];
      if (type === 'WAREHOUSE') {
        add(new T.BoxGeometry(92, 1, 52), S.gravel, 0, 0.5, 0);
        add(new T.BoxGeometry(76, 14, 36), F.white, 0, 8, 0);
        const roof = add(new T.CylinderGeometry(22, 22, 78, 3, 1).rotateZ(Math.PI / 2).rotateX(0), S.slate, 0, 16, 0); roof.scale.set(1, 0.45, 1.6);
        // big sliding doors toward the quay (west), with yellow trim
        for (const z of [-10, 0, 10]) { add(new T.BoxGeometry(0.6, 9, 8), F.dark, -38.2, 5.5, z); add(new T.BoxGeometry(0.8, 0.5, 9), C.yellow, -38.4, 10.2, z); }
        // container stacks beside it
        const mats = cols.map(c => new T.MeshStandardMaterial({ color: c, roughness: 0.6, metalness: 0.2 }));
        for (let i = 0; i < 4; i++) for (let j = 0; j < 2; j++) for (let l = 0; l <= (i + j + k) % 3; l++) add(new T.BoxGeometry(6, 2.6, 2.6), mats[(i * 3 + j + l + k) % 6], -22 + i * 7, 1.3 + 1.3 + l * 2.6, 22 + j * 3);
        P.sign(api, g, 'WAREHOUSE ' + (k + 1), 18, 3, -38.6, 13, -20, -Math.PI / 2, '#3a2a14', '#ffe9b0', false);
        P.person(g, P.civ(46200 + k), 'idle', -44, 1, -6, -Math.PI / 2); P.person(g, P.civ(46210 + k), 'tablet', -44, 1, 8, -Math.PI / 2);
      } else {
        add(new T.BoxGeometry(72, 1, 52), S.gravel, 0, 0.5, 0);
        // three-sided concrete bays full of ore and glowing fuel crystals
        for (const z of [-24, 24]) add(new T.BoxGeometry(72, 8, 2), S.stone, 0, 5, z);
        add(new T.BoxGeometry(2, 8, 50), S.stone, 35, 5, 0);
        const ore = new T.MeshStandardMaterial({ color: 0x6b4a34, roughness: 0.95 }), ore2 = new T.MeshStandardMaterial({ color: 0x8a8f96, roughness: 0.8, metalness: 0.3 });
        const cr = P._cry = P._cry || [0x7ffcff, 0x9f7bff, 0x6dffb0].map(c => new T.MeshStandardMaterial({ color: c, emissive: c, emissiveIntensity: 1.4, roughness: 0.25, transparent: true, opacity: 0.92 }));
        for (const [z, m] of [[-12, ore], [12, ore2]]) add(new T.ConeGeometry(14, 11, 9), m, 8, 6.5, z);
        for (let i = 0; i < 9; i++) { const a = i * 2.4 + k, r = 3 + (i % 4) * 2.6; const c = add(new T.OctahedronGeometry(1.6 + (i % 3) * 0.7), cr[(i + k) % 3], -14 + Math.cos(a) * r, 2.4 + (i % 3), Math.sin(a) * r * 2); c.scale.set(0.7, 1.9, 0.7); c.rotation.set(0.2 * (i % 3), a, 0.15 * (i % 2)); c.castShadow = false; }
        P.sign(api, g, k ? 'FUEL CRYSTALS' : 'RAW ORE', 20, 3, -35, 12, -24.2, 0, '#14324a', '#bff8ff', true);
        P.person(g, P.civ(46300 + k), 'gesture', -36, 1, 2, -Math.PI / 2);
      }
    },
  }));
})();
