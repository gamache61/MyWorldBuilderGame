/* ============================================================
   THE RESCUE · BUILD 4 · THE ESCORT & THE RELAY MAST
   Keep this file in projects/rescue next to 56-rescue.html.
   A guard ship to fly beside the rescue, outside the shield, and a relay mast to tell the stranger plainly what is coming.
   ============================================================ */
(function () {
  const P = window.YARD;
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 4, name: 'THE ESCORT & THE RELAY MAST',
    brief: 'Two guard ships to fly beside the rescue, outside the shield, and a relay mast to tell the stranger in plain lights what is coming.',
    types: {
      ESCORT: { code: 'HP', name: 'GUARD ESCORT', col: '#9aa3ad', w: 36, d: 56, h: 22 },
      RELAYMAST: { code: 'HP', name: 'RELAY MAST', col: '#cfd6dd', w: 20, d: 20, h: 110 },
    },
    order: ['ESCORT', 'RELAYMAST'],
    at: { ESCORT: [[1380, -90], [1380, 90]], RELAYMAST: [[1700, 130]] },
    eye: [1000, 170, 380],
    stats(api, c) { return [['GUARD ESCORTS', c('ESCORT') + ' / 2'], ['RELAY MAST', c('RELAYMAST') ? 'SENDING' : 'NOT YET']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, S = P.hm(api), C = P.fun(api);
      const cry = P._cry = P._cry || [0x7ffcff, 0x9f7bff, 0x6dffb0].map(c => new T.MeshStandardMaterial({ color: c, emissive: c, emissiveIntensity: 1.4, roughness: 0.25, transparent: true, opacity: 0.92 }));
      if (type === 'ESCORT') {
        add(new T.CylinderGeometry(19, 20, 1.2, 28), S.gravel, 0, 0.6, 0);
        add(new T.CapsuleGeometry(4.6, 26, 6, 14).rotateX(Math.PI / 2), new T.MeshStandardMaterial({ color: 0x8e99a6, roughness: 0.4, metalness: 0.5 }), 0, 10, 0);
        add(new T.ConeGeometry(4.6, 9, 12).rotateX(Math.PI / 2), F.dark, 0, 10, 20);
        for (const sd of [-1, 1]) { const w = add(new T.BoxGeometry(14, 0.7, 12), F.steel, sd * 9, 8, -6); w.rotation.z = sd * -0.12; add(new T.CylinderGeometry(1.3, 1.5, 6, 8).rotateX(Math.PI / 2), F.dark, sd * 15, 8.4, 6); add(new T.SphereGeometry(1, 8, 6), cry[0], sd * 15, 8.4, 9.4).castShadow = false; }
        add(new T.BoxGeometry(1, 6, 7), F.steel, 0, 16, -9);
        add(new T.BoxGeometry(6.4, 2.2, 8), S.glass, 0, 13.6, 6);
        for (const [x, z] of [[-4, 6], [4, 6], [0, -12]]) add(new T.CylinderGeometry(0.4, 0.6, 6, 6), F.steel, x, 4, z);
        add(new T.BoxGeometry(11, 0.5, 6), C.blue, 0, 14.2, -3);
        P.sign(api, g, 'ESCORT · OUTSIDE THE SHIELD', 18, 2.6, 0, 3.4, 22, 0, '#14324a', '#bfe8ff', true);
        P.person(g, P.civ(56400 + k), 'idle', 14, 1.2, 12, Math.PI);
      } else {
        add(new T.CylinderGeometry(10, 12, 3, 20), S.stone, 0, 1.5, 0);
        add(new T.CylinderGeometry(1.6, 3.2, 90, 10), F.white, 0, 46, 0);
        for (const y of [20, 44, 66, 84]) add(new T.CylinderGeometry(2.8 - y * 0.012, 2.8 - y * 0.012, 1, 10), C.red, 0, y, 0);
        add(new T.CylinderGeometry(5, 2, 5, 12), F.dark, 0, 93, 0);
        const lens = add(new T.OctahedronGeometry(6), cry[2], 0, 102, 0); lens.scale.set(0.9, 1.5, 0.9); lens.castShadow = false;
        for (const r of [8, 11]) { const rg = add(new T.TorusGeometry(r, 0.35, 6, 36), cry[r > 9 ? 0 : 1], 0, 102, 0); rg.rotation.x = Math.PI / 2 + (r > 9 ? 0.3 : -0.2); rg.castShadow = false; }
        P.sign(api, g, 'RELAY · HELP IS COMING · FUEL IS FREE', 26, 3, 0, 5, 12, 0, '#14324a', '#ffe9b8', true);
        P.person(g, P.civ(56450), 'tablet', 10, 1.5, 10, Math.PI);
      }
    },
  }));
})();
