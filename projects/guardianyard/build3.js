/* ============================================================
   THE GUARDIAN YARD · BUILD 3 · THE BUILDING SLIPS
   Keep this file in projects/guardianyard next to 52-guardianyard.html.
   Three building slips with gantries where guard ships are put
   together, and a sorting store for hull plates and crystal drives.
   ============================================================ */
(function () {
  const P = window.YARD;
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 3, name: 'THE BUILDING SLIPS',
    brief: 'Three building slips with tall gantries where guard ships are put together, and a store for hull plates and crystal drives.',
    types: {
      SLIP: { code: 'SY', name: 'BUILDING SLIP', col: '#9aa3ad', w: 70, d: 130, h: 70 },
      STORE: { code: 'SY', name: 'PLATE & DRIVE STORE', col: '#e8e1d1', w: 110, d: 50, h: 28 },
    },
    order: ['SLIP', 'STORE'],
    at: { SLIP: [[1400, -60], [1550, -60], [1700, -60]], STORE: [[1550, -190]] },
    eye: [1100, 200, 320],
    stats(api, c) { return [['BUILDING SLIPS', c('SLIP') + ' / 3'], ['PLATE & DRIVE STORE', c('STORE') ? 'STOCKED' : 'NOT YET']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, S = P.hm(api), C = P.fun(api);
      const cry = P._cry = P._cry || [0x7ffcff, 0x9f7bff, 0x6dffb0].map(c => new T.MeshStandardMaterial({ color: c, emissive: c, emissiveIntensity: 1.4, roughness: 0.25, transparent: true, opacity: 0.92 }));
      if (type === 'SLIP') {
        add(new T.BoxGeometry(72, 1.4, 132), F.deck, 0, 0.7, 0);
        for (const x of [-26, 26]) { add(new T.BoxGeometry(2.4, 1.2, 128), F.steel, x, 2, 0); }
        for (let z = -56; z <= 56; z += 16) add(new T.BoxGeometry(56, 0.8, 1.6), F.dark, 0, 1.6, z);
        // two gantry legs with a travelling bridge crane across the slip
        for (const x of [-34, 34]) for (const z of [-48, 48]) add(new T.BoxGeometry(3, 62, 3), C.yellow, x, 32, z);
        for (const z of [-48, 48]) add(new T.BoxGeometry(72, 3, 3), C.yellow, 0, 62, z);
        for (const x of [-34, 34]) add(new T.BoxGeometry(3, 3, 100), C.yellow, x, 62, 0);
        add(new T.BoxGeometry(72, 3, 5), F.steel, 0, 65, 0); add(new T.BoxGeometry(6, 5, 7), F.armor, 0, 61, 0); add(new T.CylinderGeometry(0.3, 0.3, 22, 4), F.steel, 0, 50, 0);
        for (const [x, z] of [[-34, -48], [34, 48]]) add(new T.SphereGeometry(1.1, 8, 6), F.lamp, x, 64, z).castShadow = false;
        // the bare frame of a hull being built: ribs and a keel
        add(new T.BoxGeometry(1.4, 1.6, 90), F.steel, 0, 5, 0);
        for (let z = -40; z <= 40; z += 10) { const r = add(new T.TorusGeometry(7 - Math.abs(z) * 0.08, 0.35, 6, 18, Math.PI), F.steel, 0, 6, z); r.rotation.z = 0; }
        P.sign(api, g, 'SLIP ' + (k + 1), 14, 3, 0, 10, -66, 0, '#14324a', '#ffd9a0', true);
        P.person(g, P.civ(52200 + k), 'idle', 40, 1.4, 10, Math.PI / 2); P.person(g, P.civ(52210 + k), 'tablet', -40, 1.4, -10, -Math.PI / 2);
      } else {
        add(new T.BoxGeometry(112, 1, 52), S.gravel, 0, 0.5, 0);
        add(new T.BoxGeometry(100, 16, 40), F.white, 0, 9, 0);
        const roof = add(new T.CylinderGeometry(30, 30, 102, 3, 1).rotateZ(Math.PI / 2), S.slate, 0, 18, 0); roof.scale.set(1, 0.34, 1.3);
        for (let x = -40; x <= 40; x += 20) add(new T.BoxGeometry(14, 10, 0.4), S.glass, x, 9, 20.3);
        for (let i = 0; i < 5; i++) add(new T.BoxGeometry(14, 2, 8), F.armor, -40 + i * 20, 2, 30);
        for (let i = 0; i < 4; i++) { const c = add(new T.OctahedronGeometry(1.8), cry[i % 3], -30 + i * 20, 3, 36); c.scale.set(0.6, 1.4, 0.6); c.castShadow = false; }
        P.sign(api, g, 'PLATE & DRIVE STORE', 24, 3.2, 0, 22, 20.8, 0, '#14324a', '#bff8ff', true);
        P.person(g, P.civ(52300), 'idle', -20, 1, 34, Math.PI); P.person(g, P.civ(52301), 'tablet', 20, 1, 34, Math.PI);
      }
    },
  }));
})();
