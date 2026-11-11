/* ============================================================
   THE RESCUE · BUILD 3 · THE FUEL STAND & THE MEDICAL BAY
   Keep this file in projects/rescue next to 56-rescue.html.
   Fuel left in an open place, with a sign saying it is the stranger's, and a medical bay with its own landing circle.
   ============================================================ */
(function () {
  const P = window.YARD;
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 3, name: 'THE FUEL STAND & THE MEDICAL BAY',
    brief: 'Fuel left in an open place, free for the stranger, and a medical bay with its own landing circle.',
    types: {
      FUELSTAND: { code: 'SY', name: 'OPEN FUEL STAND', col: '#e8c13a', w: 70, d: 50, h: 22 },
      MEDBAY: { code: 'SY', name: 'MEDICAL BAY', col: '#f2f4f6', w: 80, d: 50, h: 22 },
    },
    order: ['FUELSTAND', 'MEDBAY'],
    at: { FUELSTAND: [[1550, 70]], MEDBAY: [[1550, -60]] },
    eye: [1150, 150, 330],
    stats(api, c) { return [['OPEN FUEL STAND', c('FUELSTAND') ? 'FILLED' : 'NOT YET'], ['MEDICAL BAY', c('MEDBAY') ? 'READY' : 'NOT YET']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, S = P.hm(api), C = P.fun(api);
      const cry = P._cry = P._cry || [0x7ffcff, 0x9f7bff, 0x6dffb0].map(c => new T.MeshStandardMaterial({ color: c, emissive: c, emissiveIntensity: 1.4, roughness: 0.25, transparent: true, opacity: 0.92 }));
      if (type === 'FUELSTAND') {
        add(new T.BoxGeometry(72, 1, 52), S.gravel, 0, 0.5, 0);
        for (let i = 0; i < 4; i++) { add(new T.CylinderGeometry(5, 5, 14, 20), i % 2 ? C.yellow : F.white, -24 + i * 16, 8, -12); add(new T.SphereGeometry(5, 18, 8, 0, Math.PI * 2, 0, Math.PI / 2), i % 2 ? C.yellow : F.white, -24 + i * 16, 15, -12); add(new T.CylinderGeometry(5.2, 5.2, 0.8, 20), C.blue, -24 + i * 16, 5, -12); }
        for (let i = 0; i < 6; i++) { add(new T.CylinderGeometry(0.4, 0.4, 20, 6).rotateZ(Math.PI / 2), F.dark, -22 + i * 9, 1.4, 2); }
        for (let r = 0; r < 3; r++) for (let c = 0; c < 5; c++) add(new T.OctahedronGeometry(2.2), cry[(r + c) % 3], -20 + c * 10, 2.6, 12 + r * 4.4).scale.set(1, 1.3, 1);
        add(new T.BoxGeometry(18, 0.6, 18), C.orange, 24, 0.9, 12);
        P.sign(api, g, 'THIS FUEL IS YOURS · FREE · TAKE IT', 44, 5, 0, 12, 24.6, 0, '#14324a', '#ffe9b8', true);
        for (let i = 0; i < 2; i++) P.person(g, P.civ(56200 + i), i ? 'idle' : 'tablet', -26 + i * 52, 1, 30, Math.PI);
      } else {
        add(new T.BoxGeometry(82, 1, 52), S.gravel, 0, 0.5, 0);
        add(new T.BoxGeometry(56, 12, 30), F.white, -10, 7, -6);
        const roof = add(new T.CylinderGeometry(15, 15, 58, 3, 1).rotateZ(Math.PI / 2), S.slate, -10, 14, -6); roof.scale.set(1, 0.3, 1);
        for (let x = -30; x <= 8; x += 9.5) add(new T.BoxGeometry(6, 5, 0.4), S.glass, x, 8, 9.2);
        add(new T.BoxGeometry(2.4, 10, 0.5), C.red, -10, 16, 9.6); add(new T.BoxGeometry(10, 2.4, 0.5), C.red, -10, 16, 9.6);
        add(new T.CylinderGeometry(15, 15, 0.8, 32), S.dim, 30, 1.4, 4); const rg = add(new T.TorusGeometry(13.5, 0.4, 6, 40), F.lamp, 30, 1.9, 4); rg.rotation.x = Math.PI / 2; rg.castShadow = false;
        add(new T.BoxGeometry(2.6, 0.2, 9), C.red, 30, 1.9, 4); add(new T.BoxGeometry(9, 0.2, 2.6), C.red, 30, 1.9, 4);
        P.sign(api, g, 'MEDICAL BAY · DOCTORS READY', 36, 4, -10, 4, 10, 0, '#7a1f1a', '#ffffff', true);
        for (let i = 0; i < 3; i++) P.person(g, P.civ(56300 + i), i % 2 ? 'idle' : 'tablet', -24 + i * 14, 1, 20, Math.PI);
      }
    },
  }));
})();
