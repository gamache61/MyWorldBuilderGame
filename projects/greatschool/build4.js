/* ============================================================
   THE GREAT SCHOOL OF UNITY · BUILD 4 · THE FARM SCHOOL & THE HEALING SCHOOL
   Keep this file in projects/greatschool next to greatschool.html.
   Two teaching greenhouses and the practice fields, where students
   learn to grow food with the farm robots; and the Healing School,
   white wings round a garden courtyard, where they learn to care for
   the sick and keep everyone well.
   ============================================================ */
(function () {
  const P = window.SCHOOL;
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 4, name: 'THE FARM SCHOOL & THE HEALING SCHOOL',
    brief: 'Two teaching greenhouses and practice fields with a farm robot, and the Healing School: white wings round a garden courtyard where students learn to care for everyone.',
    types: {
      GREENHOUSE:    { code: 'GD', name: 'TEACHING GREENHOUSE', col: '#3fb04a', w: 80, d: 60, h: 16 },
      PRACTICEFIELD: { code: 'GD', name: 'PRACTICE FIELDS', col: '#5f9e3a', w: 180, d: 60, h: 4 },
      HEALING:       { code: 'SY', name: 'HEALING SCHOOL', col: '#f2f4f6', w: 140, d: 100, h: 24 },
    },
    order: ['GREENHOUSE', 'PRACTICEFIELD', 'HEALING'],
    at: { GREENHOUSE: [[-800, 150], [-700, 150]], PRACTICEFIELD: [[-750, 260]], HEALING: [[-370, 180]] },
    eye: [240, 210, 320],
    stats(api, c) { return [['GREENHOUSES', c('GREENHOUSE') + ' / 2'], ['PRACTICE FIELDS', c('PRACTICEFIELD') ? 'PLANTED' : 'NOT YET'], ['HEALING SCHOOL', c('HEALING') ? 'OPEN' : 'NOT YET']]; },
    make(type, k, g, add, F, api) {
      const T = api.THREE, S = P.sch(api), C = P.fun(api);
      if (type === 'GREENHOUSE') {
        add(new T.BoxGeometry(80, 0.8, 60), S.stone, 0, 0.4, 0);
        add(new T.BoxGeometry(72, 6, 50), S.glass, 0, 3.8, 0, false);
        for (const s of [-1, 1]) { const r = add(new T.BoxGeometry(72, 0.3, 27.6), S.glass, 0, 10.6, s * 12.5, false); r.rotation.x = s * 0.5; }
        for (let i = 0; i <= 8; i++) { const x = -36 + i * 9; for (const s of [-1, 1]) { add(new T.BoxGeometry(0.5, 6, 0.5), S.frame, x, 3.8, s * 25); const r = add(new T.BoxGeometry(0.5, 0.5, 27.6), S.frame, x, 10.6, s * 12.5); r.rotation.x = s * 0.5; } }
        add(new T.BoxGeometry(73, 0.6, 0.6), S.frame, 0, 17.2, 0); for (const s of [-1, 1]) add(new T.BoxGeometry(73, 0.5, 0.5), S.frame, 0, 6.8, s * 25);
        // raised beds of seedlings, herbs and tomatoes
        for (let r = 0; r < 4; r++) {
          const z = -16 + r * 10.6; add(new T.BoxGeometry(62, 1.4, 5), S.timber, 0, 1.5, z); add(new T.BoxGeometry(61, 0.4, 4.4), F.soil, 0, 2.3, z, false);
          for (let i = 0; i < 16; i++) add(new T.IcosahedronGeometry(1 + ((i + r) % 3) * 0.3, 0), F.crops[(i + r + k) % 5], -29 + i * 3.9, 3.2, z, false);
        }
        for (let i = 0; i < 5; i++) P.figure(api, add, -20 + i * 9, 0.8, -21 + (i % 2) * 10.6 + 5.3, i % 2 ? 0.65 : 1, i + k * 5);
        P.person(g, P.civ(15400 + k), 'gesture', 30, 0.8, 0, -Math.PI / 2);
        P.sign(api, g, k ? 'GROWING FOOD' : 'SEEDS & SOIL', 18, 2.4, 0, 8.6, 25.4, 0, '#1f3b2c', '#c8f0a0', false);
      } else if (type === 'PRACTICEFIELD') {
        add(new T.BoxGeometry(180, 0.4, 60), F.soil, 0, 0.2, 0);
        // twelve strips, each a different crop the students tend
        for (let i = 0; i < 12; i++) { const x = -82 + i * 15; for (let j = 0; j < 9; j++) add(new T.IcosahedronGeometry(1.4 + (i % 3) * 0.3, 0), F.crops[i % 5], x, 1.4, -24 + j * 6, false); }
        for (const s of [-1, 1]) add(new T.BoxGeometry(180, 1.4, 0.3), S.timber, 0, 1, s * 30);
        // a farm robot rolling up and down a row
        const bot = new T.Group(); bot.userData.keep = true; g.add(bot); P.farmBot = bot;
        add(new T.BoxGeometry(5, 2.4, 3.4), F.white, 0, 2.6, 0, true, bot); add(new T.BoxGeometry(4, 0.4, 2.4), S.glow, 0, 4, 0, false, bot);
        for (const [x, z] of [[-2, -1.8], [2, -1.8], [-2, 1.8], [2, 1.8]]) add(new T.CylinderGeometry(0.9, 0.9, 0.6, 12).rotateX(Math.PI / 2), F.dark, x, 1, z, true, bot);
        add(new T.BoxGeometry(0.4, 3, 0.4), F.steel, 2.6, 1.8, 0, true, bot);
        // a teacher and the class out in the field, and a water barrel and a scarecrow for fun
        P.person(g, P.civ(15410), 'gesture', -60, 0.4, -2, Math.PI / 2);
        for (let i = 0; i < 7; i++) P.figure(api, add, -54 + (i % 4) * 3, 0.4, -6 + (i >> 2) * 6, i % 3 ? 1 : 0.65, i + 2);
        add(new T.CylinderGeometry(2, 2, 4, 14), S.teal, 80, 2.2, -20);
        add(new T.BoxGeometry(0.4, 7, 0.4), S.timber, 40, 3.5, 10); add(new T.BoxGeometry(5, 0.4, 0.4), S.timber, 40, 5.6, 10); add(new T.SphereGeometry(1, 8, 6), C.yellow, 40, 7.6, 10); add(new T.BoxGeometry(2.4, 2.6, 1), C.red, 40, 5, 10);
      } else if (type === 'HEALING') {
        add(new T.BoxGeometry(140, 0.8, 100), S.stone, 0, 0.4, 0);
        // three white wings round a garden courtyard, open to the walk on the west
        const wing = (x, z, w, d) => { add(new T.BoxGeometry(w, 18, d), F.white, x, 9.8, z); add(new T.BoxGeometry(w + 1, 1, d + 1), S.frame, x, 19.3, z); add(new T.BoxGeometry(w * 0.9, 0.8, d * 0.86), S.roofGreen, x, 20.2, z);
          const long = w > d; for (const y of [6, 13.4]) for (const s of [-1, 1]) add(new T.BoxGeometry(long ? w * 0.94 : 0.3, 3.4, long ? 0.3 : d * 0.94), S.glass, long ? x : x + s * (w / 2 + 0.05), y, long ? z + s * (d / 2 + 0.05) : z, false);
          for (const y of [6, 13.4]) for (const s of [-1, 1]) add(new T.BoxGeometry(long ? w * 0.9 : 0.2, 2.6, long ? 0.2 : d * 0.9), S.warm, long ? x : x + s * (w / 2 - 0.3), y, long ? z + s * (d / 2 - 0.3) : z, false); };
        wing(10, -36, 110, 22); wing(10, 36, 110, 22); wing(55, 0, 22, 50);
        // the courtyard garden with a fountain, benches and herb beds
        add(new T.BoxGeometry(80, 0.4, 48), C.grass, -6, 1, 0);
        add(new T.CylinderGeometry(7, 7, 1.4, 24), F.white, -10, 1.6, 0); add(new T.CylinderGeometry(6.2, 6.2, 0.4, 24), F.water, -10, 2.2, 0, false); add(new T.CylinderGeometry(0.5, 0.8, 4, 8), F.white, -10, 3.6, 0);
        for (const [x, z] of [[-30, -14], [-30, 14], [12, -14], [12, 14]]) { add(new T.BoxGeometry(12, 1, 5), S.timber, x, 1.6, z); for (let i = 0; i < 4; i++) add(new T.IcosahedronGeometry(1.2, 0), i % 2 ? F.flower : F.crops[i], x - 4.5 + i * 3, 2.8, z, false); }
        for (const [x, z] of [[-44, -10], [-44, 10], [-20, 0]]) { add(new T.CylinderGeometry(0.5, 0.7, 5, 6), F.wood, x, 3.5, z); add(new T.IcosahedronGeometry(4, 1), F.crops[2], x, 8, z); }
        for (const z of [-8, 8]) add(new T.BoxGeometry(5, 0.5, 1.4), F.wood, 2, 1.6, z);
        // the healing sign: a green heart over the entrance
        const heart = new T.Shape(); heart.moveTo(0, -3); heart.bezierCurveTo(-6, 1, -3, 5.5, 0, 2.6); heart.bezierCurveTo(3, 5.5, 6, 1, 0, -3);
        const hm = add(new T.ExtrudeGeometry(heart, { depth: 0.6, bevelEnabled: false }), S.glow, -46, 22, -36, false); hm.rotation.y = -Math.PI / 2; hm.scale.setScalar(1.3);
        P.sign(api, g, 'HEALING SCHOOL', 22, 3, -45.2, 16, -36, -Math.PI / 2, '#ffffff', '#1f7a5a', false);
        P.sign(api, g, 'HEALING SCHOOL', 22, 3, -45.2, 16, 36, -Math.PI / 2, '#ffffff', '#1f7a5a', false);
        // a sky pod ambulance parked at the side, students and teachers in the garden
        const amb = add(new T.CapsuleGeometry(3.4, 8, 6, 14).rotateZ(Math.PI / 2), F.white, -56, 5, 0); amb.scale.z = 0.8; add(new T.BoxGeometry(9, 0.6, 5.6), S.mint, -56, 5, 0);
        for (let i = 0; i < 8; i++) { const a = i * 0.8; P.figure(api, add, -10 + Math.cos(a) * 12, 1.2, Math.sin(a) * 12, i % 4 ? 1 : 0.65, i + 11); }
        P.person(g, P.civ(15500), 'tablet', -24, 1.2, 4, Math.PI / 2);
        P.person(g, P.civ(15501), 'walk', 0, 1.2, 0, 0, { path: { type: 'rect', x0: -40, x1: 30, z0: -20, z1: 20, speed: 1 } });
      }
    },
    tick(api, dt, t) { if (P.farmBot) P.farmBot.position.set(-37 + 0 * t, 0.4, Math.sin(t * 0.18) * 24); },
  }));
})();
