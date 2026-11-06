/* ============================================================
   THE GREAT SCHOOL OF UNITY · BUILD 3 · THE WORKSHOP HALL & THE BUILDING YARD
   Keep this file in projects/greatschool next to greatschool.html.
   The long workshop hall with a saw-tooth glass roof, workbenches,
   machines, a robot arm and an overhead crane; and the building yard,
   where students learn to build for real: a training crane, house
   frames going up, and a sky pod on blocks for the flight mechanics.
   ============================================================ */
(function () {
  const P = window.SCHOOL;
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 3, name: 'THE WORKSHOP HALL & THE BUILDING YARD',
    brief: 'A long workshop hall with a saw-tooth glass roof, machines, a robot arm and an overhead crane, and the building yard with a training crane, house frames and a sky pod to mend.',
    types: {
      WORKSHOP:  { code: 'FB', name: 'WORKSHOP HALL', col: '#d9a21b', w: 150, d: 90, h: 30 },
      BUILDYARD: { code: 'HP', name: 'BUILDING YARD', col: '#b03a2e', w: 150, d: 110, h: 46 },
    },
    order: ['WORKSHOP', 'BUILDYARD'],
    at: { WORKSHOP: [[-380, -170]], BUILDYARD: [[-760, -170]] },
    eye: [220, 200, 330],
    stats(api, c) { return [['WORKSHOP HALL', c('WORKSHOP') ? 'OPEN' : 'NOT YET'], ['BUILDING YARD', c('BUILDYARD') ? 'OPEN' : 'NOT YET'], ['TRADES TAUGHT', (c('WORKSHOP') + c('BUILDYARD')) * 6]]; },
    make(type, k, g, add, F, api) {
      const T = api.THREE, S = P.sch(api), C = P.fun(api);
      if (type === 'WORKSHOP') {
        add(new T.BoxGeometry(150, 0.8, 90), S.stone, 0, 0.4, 0);
        add(new T.BoxGeometry(140, 0.4, 70), F.deck, 0, 1, -5);
        // walls on three sides, the front (facing the walk) open with big sliding doors
        add(new T.BoxGeometry(140, 18, 1.2), S.brick, 0, 9.8, -40);
        for (const s of [-1, 1]) add(new T.BoxGeometry(1.2, 18, 70), S.brick, s * 70, 9.8, -5);
        for (let i = 0; i < 6; i++) add(new T.BoxGeometry(1.6, 18, 1.6), F.steel, -70 + i * 28, 9.8, 30);
        for (const x of [-56, 56]) add(new T.BoxGeometry(24, 16, 0.6), S.slate, x, 9, 31);
        // the saw-tooth roof: five teeth, each a slope of slate and a face of glass to the north light
        for (let i = 0; i < 5; i++) {
          const z = -33 + i * 14;
          const sl = add(new T.BoxGeometry(142, 0.6, 15.5), S.slate, 0, 22.6, z); sl.rotation.x = -0.45;
          add(new T.BoxGeometry(142, 6.4, 0.3), S.glass, 0, 22.4, z - 6.6, false);
        }
        add(new T.BoxGeometry(142, 1, 1), F.white, 0, 18.8, 30.5);
        P.sign(api, g, 'WORKSHOP HALL', 30, 3.4, 0, 16, 31.6, 0, '#2a2f38', '#ffd060', false);
        // workbenches, machines and tool walls
        for (let r = 0; r < 3; r++) for (let i = 0; i < 6; i++) {
          const x = -55 + i * 22, z = -28 + r * 16;
          add(new T.BoxGeometry(12, 1, 5), S.timber, x, 4.6, z); for (const sx of [-5, 5]) add(new T.BoxGeometry(0.6, 3.6, 4), F.steel, x + sx, 2.8, z);
          if ((i + r) % 3 === 0) { add(new T.BoxGeometry(3, 3, 3), S.yellow, x - 3, 6.6, z); add(new T.CylinderGeometry(0.4, 0.4, 3, 8).rotateZ(Math.PI / 2), F.steel, x, 6.6, z); }
          else if ((i + r) % 3 === 1) add(new T.BoxGeometry(4, 0.6, 3), F.dark, x + 2, 5.4, z);
          P.figure(api, add, x + (r % 2 ? 3 : -3), 1.2, z + 3.4, r === 1 && i % 2 ? 0.65 : 1, i + r * 6);
        }
        for (let i = 0; i < 8; i++) add(new T.BoxGeometry(12, 8, 0.4), i % 2 ? S.board : F.panel, -56 + i * 16, 9, -39.2);
        for (const s of [-1, 1]) { add(new T.BoxGeometry(16, 10, 12), S.yellow, s * 58, 6.2, 16); add(new T.BoxGeometry(14, 2, 10), F.dark, s * 58, 12.2, 16); add(new T.BoxGeometry(4, 3, 0.3), S.glow, s * 58, 8, 22.1, false); }
        // an overhead crane on rails
        for (const z of [-34, 24]) add(new T.BoxGeometry(140, 1.2, 1.2), S.yellow, 0, 17.4, z);
        const crane = new T.Group(); crane.userData.keep = true; g.add(crane); P.wsCrane = crane;
        add(new T.BoxGeometry(2, 1.8, 60), S.yellow, 0, 16.4, -5, true, crane); add(new T.BoxGeometry(3, 2, 3), F.dark, 0, 15, -5, true, crane);
        add(new T.CylinderGeometry(0.1, 0.1, 8, 4), F.steel, 0, 10.8, -5, false, crane); add(new T.BoxGeometry(5, 2.4, 3.6), C.blue, 0, 6, -5, true, crane);
        // a teaching robot arm that turns and dips
        const base = new T.Group(); base.position.set(30, 1.2, 20); base.userData.keep = true; g.add(base); P.arm = base;
        add(new T.CylinderGeometry(2.4, 3, 2, 16), F.dark, 0, 1, 0, true, base);
        const up = new T.Group(); up.position.y = 2; base.add(up); P.armUp = up;
        add(new T.BoxGeometry(1.4, 9, 1.4), C.orange, 0, 4.5, 0, true, up);
        const fore = new T.Group(); fore.position.y = 9; up.add(fore); P.armFore = fore;
        add(new T.SphereGeometry(1.1, 10, 8), F.dark, 0, 0, 0, true, fore); add(new T.BoxGeometry(1.1, 1.1, 7), C.orange, 0, 0, 3.5, true, fore); add(new T.BoxGeometry(2, 0.8, 0.8), F.steel, 0, 0, 7.2, true, fore);
        P.person(g, P.civ(15200), 'gesture', 24, 1.2, 25, -0.6);
        for (let i = 0; i < 3; i++) P.figure(api, add, 26 + i * 3, 1.2, 28, i === 1 ? 0.65 : 1, i + 2);
        P.person(g, P.civ(15201), 'walk', 0, 1.2, 0, 0, { path: { type: 'rect', x0: -62, x1: 62, z0: -36, z1: 26, speed: 1.1 } });
      } else if (type === 'BUILDYARD') {
        add(new T.BoxGeometry(150, 0.6, 110), S.gravel, 0, 0.3, 0);
        for (const s of [-1, 1]) { add(new T.BoxGeometry(150, 2, 0.4), F.white, 0, 1.6, s * 55); add(new T.BoxGeometry(0.4, 2, 110), F.white, s * 75, 1.6, 0); }
        // the training tower crane, which turns slowly over the yard
        add(new T.BoxGeometry(8, 1.5, 8), F.stoneDark, -45, 1, -25);
        for (let y = 0; y < 44; y += 4) { add(new T.BoxGeometry(3, 4, 0.3), S.yellow, -45, 2 + y, -26.4); add(new T.BoxGeometry(3, 4, 0.3), S.yellow, -45, 2 + y, -23.6); }
        for (const [x, z] of [[-46.4, -26.4], [-43.6, -26.4], [-46.4, -23.6], [-43.6, -23.6]]) add(new T.BoxGeometry(0.4, 44, 0.4), S.yellow, x, 23, z);
        const jib = new T.Group(); jib.position.set(-45, 45, -25); jib.userData.keep = true; g.add(jib); P.jib = jib;
        add(new T.BoxGeometry(3.4, 3, 3.4), F.white, 0, 0, 0, true, jib); add(new T.BoxGeometry(70, 1.6, 1.6), S.yellow, 25, 1.6, 0, true, jib); add(new T.BoxGeometry(6, 3, 3), F.stoneDark, -13, 0.6, 0, true, jib); add(new T.BoxGeometry(16, 1.2, 1.2), S.yellow, -6, 1.6, 0, true, jib);
        add(new T.CylinderGeometry(0.08, 0.08, 26, 4), F.steel, 40, -12, 0, false, jib); add(new T.BoxGeometry(10, 0.8, 0.8), S.timber, 40, -25.4, 0, true, jib);
        // two practice houses going up: a timber frame, and one with walls and half a roof
        const frame = (x, z, walls) => {
          add(new T.BoxGeometry(30, 1, 22), F.stoneDark, x, 1.1, z);
          for (const px of [-14, -4.7, 4.7, 14]) for (const pz of [-10, 10]) add(new T.BoxGeometry(0.8, 9, 0.8), S.timber, x + px, 6, z + pz);
          for (const pz of [-10, 10]) add(new T.BoxGeometry(29, 0.8, 0.8), S.timber, x, 10.6, z + pz);
          for (const px of [-14, 0, 14]) add(new T.BoxGeometry(0.8, 0.8, 21), S.timber, x + px, 10.6, z);
          for (let i = 0; i < 7; i++) for (const s of [-1, 1]) { const r = add(new T.BoxGeometry(0.5, 0.5, 13), S.timber, x - 14 + i * 4.66, 14, z + s * 5.2); r.rotation.x = s * 0.6; }
          if (walls) { add(new T.BoxGeometry(29, 9, 0.6), F.white, x, 6, z - 10); add(new T.BoxGeometry(0.6, 9, 20), F.white, x - 14, 6, z); const rf = add(new T.BoxGeometry(30, 0.5, 12.4), S.roofGreen, x, 14, z - 5.2); rf.rotation.x = -0.6; }
        };
        frame(10, -25, false); frame(45, 18, true);
        // stacks of beams and panels, safety cones
        for (let i = 0; i < 5; i++) add(new T.BoxGeometry(14, 0.8, 0.8), S.timber, 10 + (i % 2) * 0.4, 1 + i * 0.8, 40);
        for (let i = 0; i < 4; i++) add(new T.BoxGeometry(8, 0.5, 6), F.panel, 32, 1 + i * 0.5, 40);
        for (const [x, z] of [[-10, 0], [-6, 8], [-22, 36], [60, -40], [66, -36]]) add(new T.ConeGeometry(0.8, 2, 8), C.orange, x, 1.6, z);
        // a sky pod on blocks for the flight mechanics class, with its panels open
        add(new T.BoxGeometry(3, 2, 3), F.stoneDark, -45, 1.6, 28); add(new T.BoxGeometry(3, 2, 3), F.stoneDark, -33, 1.6, 28);
        const pod = add(new T.CapsuleGeometry(4.4, 10, 6, 16).rotateZ(Math.PI / 2), F.white, -39, 7, 28); pod.scale.z = 0.8;
        add(new T.BoxGeometry(6, 3, 6.6), S.glass, -44, 9.4, 28, false);
        add(new T.BoxGeometry(5, 0.3, 4), F.white, -34, 12.6, 30).rotation.x = -0.8;
        for (const s of [-1, 1]) { add(new T.CylinderGeometry(1.8, 1.8, 3, 12).rotateZ(Math.PI / 2), F.dark, -32, 6, 28 + s * 6); add(new T.CircleGeometry(1.4, 12).rotateY(Math.PI / 2), F.engine, -30.4, 6, 28 + s * 6, false); }
        P.person(g, P.civ(15300), 'tablet', -36, 0.6, 22, 0.4);
        for (let i = 0; i < 4; i++) P.figure(api, add, -46 + i * 3.4, 0.6, 20, i === 2 ? 0.65 : 1, i + 4);
        for (let i = 0; i < 6; i++) P.figure(api, add, (i % 3) * 8 - 2, 0.6, -6 + (i >> 1) * 10 + 20, 1, i + 9);
        P.person(g, P.civ(15301), 'walk', 0, 0.6, 0, 0, { path: { type: 'line', ax: -10, az: -42, bx: 60, bz: 45, speed: 1.2 } });
        P.sign(api, g, 'BUILDING YARD', 24, 3, 0, 4.4, 55.4, 0, '#2a2f38', '#ffd060', false);
      }
    },
    tick(api, dt, t) {
      if (P.wsCrane) P.wsCrane.position.x = Math.sin(t * 0.12) * 55;
      if (P.arm) { P.arm.rotation.y = Math.sin(t * 0.5) * 1.6; P.armUp.rotation.x = 0.3 + Math.sin(t * 0.8) * 0.25; P.armFore.rotation.x = 0.6 + Math.sin(t * 1.1) * 0.4; }
      if (P.jib) P.jib.rotation.y = Math.sin(t * 0.06) * 1.4 + 0.4;
    },
  }));
})();
