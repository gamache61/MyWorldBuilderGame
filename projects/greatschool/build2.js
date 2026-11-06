/* ============================================================
   THE GREAT SCHOOL OF UNITY · BUILD 2 · THE GREAT HALL & THE LIBRARY
   Keep this file in projects/greatschool next to greatschool.html.
   The round Great Hall under a glass dome, with a globe of Unity at
   its centre; the library tower with the school bell at the top; and
   the walks that join the school to the landing field.
   ============================================================ */
(function () {
  const P = window.SCHOOL;
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 2, name: 'THE GREAT HALL & THE LIBRARY',
    brief: 'The round Great Hall under a glass dome with a globe of Unity at its centre, the library tower with the school bell, and the walks that join it all up.',
    types: {
      GREATHALL: { code: 'SY', name: 'GREAT HALL', col: '#90f0b0', w: 140, d: 140, h: 60 },
      LIBRARY:   { code: 'SY', name: 'LIBRARY TOWER', col: '#efe6d2', w: 60, d: 60, h: 90 },
      WALK:      { code: 'SF', name: 'SCHOOL WALK', col: '#d8cdb6', w: 12, d: 120, h: 1 },
    },
    order: ['GREATHALL', 'LIBRARY', 'WALK'],
    at: { GREATHALL: [[-560, 0]], LIBRARY: [[-560, -170]], WALK: [[-365, 0], [-760, 0], [-560, 190]] },
    eye: [260, 220, 360],
    stats(api, c) { return [['GREAT HALL', c('GREATHALL') ? 'STANDING' : 'NOT YET'], ['LIBRARY', c('LIBRARY') ? c('LIBRARY') && '120,000 BOOKS' : 'NOT YET'], ['SCHOOL WALKS', c('WALK') + ' / 3']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, S = P.sch(api), C = P.fun(api);
      if (type === 'GREATHALL') {
        add(new T.CylinderGeometry(70, 70, 1.2, 48), S.stone, 0, 0.6, 0);
        for (let i = 0; i < 3; i++) add(new T.CylinderGeometry(58 - i * 3, 58 - i * 3, 1, 48), F.stoneDark, 0, 1.6 + i, 0);
        // the rotunda: cream walls, a ring of white columns and a glass dome with ribs
        add(new T.CylinderGeometry(40, 40, 22, 40), S.cream, 0, 15, 0);
        for (let i = 0; i < 28; i++) { const a = i / 28 * Math.PI * 2; add(new T.CylinderGeometry(1.1, 1.3, 22, 10), F.white, Math.cos(a) * 45, 15, Math.sin(a) * 45); add(new T.BoxGeometry(2.2, 9, 0.3), S.warm, Math.cos(a) * 40.2, 13, Math.sin(a) * 40.2, false).rotation.y = -a + Math.PI / 2; }
        add(new T.CylinderGeometry(47, 47, 2.4, 48), F.white, 0, 27.2, 0);
        add(new T.SphereGeometry(40, 40, 16, 0, Math.PI * 2, 0, Math.PI / 2), S.glass, 0, 28.4, 0, false);
        for (let i = 0; i < 12; i++) { const r = add(new T.TorusGeometry(40, 0.45, 6, 40, Math.PI), S.mint, 0, 28.4, 0, false); r.rotation.y = i / 12 * Math.PI; }
        for (const y of [10, 22]) { const rr = Math.sqrt(40 * 40 - y * y); add(new T.TorusGeometry(rr, 0.4, 6, 48).rotateX(Math.PI / 2), S.mint, 0, 28.4 + y, 0, false); }
        add(new T.CylinderGeometry(4, 5, 5, 16), F.white, 0, 70, 0); add(new T.ConeGeometry(4.6, 5, 16), S.copper, 0, 75, 0); add(new T.SphereGeometry(1.2, 10, 8), S.glow, 0, 78.4, 0, false);
        // the globe of Unity inside: green lands, blue seas, on a brass stand
        add(new T.CylinderGeometry(3, 5, 8, 16), S.brass, 0, 8, 0);
        const globe = new T.Group(); globe.position.y = 22; globe.userData.keep = true; g.add(globe); P.globe = globe;
        add(new T.SphereGeometry(10, 32, 20), new T.MeshStandardMaterial({ color: 0x2f6fb0, roughness: 0.4, metalness: 0.1 }), 0, 0, 0, false, globe);
        for (let i = 0; i < 9; i++) { const a = i * 2.3, b = Math.sin(i * 1.7) * 0.9, l = add(new T.SphereGeometry(3 + (i % 3), 10, 8), C.green, Math.cos(a) * Math.cos(b) * 8.4, Math.sin(b) * 8.4, Math.sin(a) * Math.cos(b) * 8.4, false, globe); l.scale.set(1, 0.5, 1); l.lookAt(0, 0, 0); }
        add(new T.TorusGeometry(13, 0.3, 6, 48), S.brass, 0, 0, 0, false, globe).rotation.x = 1.2;
        // rows of seats round the globe
        for (let r = 0; r < 4; r++) for (let i = 0; i < 20; i++) { const a = i / 20 * Math.PI * 2 + r * 0.08, rad = 18 + r * 5; if (Math.abs(Math.cos(a)) > 0.96 && Math.cos(a) > 0) continue; add(new T.BoxGeometry(3.4, 1, 2), S.timber, Math.cos(a) * rad, 4.6 + r * 0.8, Math.sin(a) * rad).rotation.y = -a; }
        // four porches, one to each walk; the east porch faces the landing field and carries the name
        for (let i = 0; i < 4; i++) {
          const a = i / 4 * Math.PI * 2, x = Math.cos(a) * 52, z = Math.sin(a) * 52, por = new T.Group(); por.position.set(x, 0, z); por.rotation.y = -a; g.add(por);
          add(new T.BoxGeometry(14, 1, 26), F.stoneDark, 0, 3.5, 0, true, por);
          for (const s of [-1, 1]) for (const zz of [-9, -3, 3, 9]) if (zz * s > 0) add(new T.CylinderGeometry(1, 1.2, 18, 10), F.white, 6, 13, zz, true, por);
          add(new T.BoxGeometry(14, 2.4, 26), F.white, 0, 23, 0, true, por);
          add(new T.CylinderGeometry(15, 15, 14, 3).rotateX(-Math.PI / 2).rotateY(Math.PI / 2), F.white, 0, 26.5, 0, true, por).scale.y = 0.3;
          add(new T.BoxGeometry(0.4, 12, 8), S.warm, -2, 10, 0, false, por);
        }
        P.sign(api, g, 'THE GREAT SCHOOL OF UNITY', 24, 2.4, 59.4, 23, 0, Math.PI / 2, '#ffffff', '#1f6a4a');
        for (let i = 0; i < 10; i++) { const a = i * 0.6 + 0.3, r = 61 + (i % 3) * 2; P.figure(api, add, Math.cos(a) * r, 1.2, Math.sin(a) * r, i % 3 ? 1 : 0.6, i); }
        for (let i = 0; i < 6; i++) { const a = i / 6 * Math.PI * 2; P.figure(api, add, Math.cos(a) * 21, 5.4, Math.sin(a) * 21, 1, i + 3); }
        P.person(g, P.civ(15000), 'gesture', 0, 3.6, 14, Math.PI);
        P.person(g, P.civ(15001), 'walk', 0, 1.2, 0, 0, { path: { type: 'circle', cx: 0, cz: 0, r: 64, speed: 1.2 } });
      } else if (type === 'LIBRARY') {
        add(new T.BoxGeometry(60, 1, 60), S.stone, 0, 0.5, 0);
        add(new T.BoxGeometry(40, 66, 40), S.cream, 0, 34, 0);
        // tall window bands, warm with reading lamps
        for (let i = 0; i < 5; i++) for (const s of [-1, 1]) for (let y = 14.5; y < 66; y += 11) { const x = -14 + i * 7; add(new T.BoxGeometry(3.6, 6, 0.3), S.glass, x, y, s * 20.15, false); add(new T.BoxGeometry(3.2, 5.4, 0.2), S.dim, x, y, s * 20.05, false); add(new T.BoxGeometry(0.3, 6, 3.6), S.glass, s * 20.15, y, x, false); add(new T.BoxGeometry(0.2, 5.4, 3.2), S.dim, s * 20.05, y, x, false); }
        for (let y = 9; y < 66; y += 11) add(new T.BoxGeometry(41, 0.8, 41), F.white, 0, y, 0);
        add(new T.BoxGeometry(44, 2, 44), F.white, 0, 68, 0);
        // the belfry: four columns, the school bell, a green copper roof
        for (const [x, z] of [[-15, -15], [15, -15], [-15, 15], [15, 15]]) add(new T.BoxGeometry(3, 14, 3), F.white, x, 76, z);
        add(new T.BoxGeometry(36, 2, 36), F.white, 0, 84, 0);
        const roof = add(new T.ConeGeometry(26, 14, 4), S.copper, 0, 92, 0); roof.rotation.y = Math.PI / 4;
        add(new T.SphereGeometry(1.6, 10, 8), S.glow, 0, 100, 0, false);
        const bell = new T.Group(); bell.position.set(0, 82, 0); bell.userData.keep = true; g.add(bell); P.bell = bell;
        add(new T.CylinderGeometry(3, 6, 8, 20, 1, true), S.brass, 0, -4, 0, true, bell); add(new T.SphereGeometry(3, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2), S.brass, 0, 0, 0, true, bell); add(new T.SphereGeometry(1, 8, 6), F.dark, 0, -7.6, 0, false, bell);
        // big doors, a sign and a glass bridge into the Great Hall
        add(new T.BoxGeometry(10, 12, 0.4), S.timber, 0, 7, 20.3, false);
        P.sign(api, g, 'THE LIBRARY', 20, 3, 0, 16, 20.4, 0, '#12333a', '#bff8d0', false);
        add(new T.BoxGeometry(10, 8, 90), S.glass, 0, 12, 65, false); add(new T.BoxGeometry(11, 0.8, 90), F.white, 0, 8, 65); add(new T.BoxGeometry(11, 0.8, 90), F.white, 0, 16.2, 65);
        for (const z of [40, 65, 90]) for (const s of [-1, 1]) add(new T.BoxGeometry(1, 8, 1), F.steel, s * 4.6, 4, z);
        for (let i = 0; i < 4; i++) P.figure(api, add, -6 + i * 4, 1, 24 + (i % 2) * 2, i === 2 ? 0.6 : 1, i + 7);
        P.person(g, P.civ(15010), 'walk', 0, 1, 0, 0, { path: { type: 'rect', x0: -26, x1: 26, z0: -26, z1: 26, speed: 1.1 } });
      } else if (type === 'WALK') {
        const along = Math.abs(sl.x + 560) < 1 ? 'z' : 'x', L = sl.x === -365 ? 250 : 240;
        add(new T.BoxGeometry(along === 'x' ? L : 12, 0.4, along === 'x' ? 12 : L), C.path, 0, 0.2, 0, false);
        add(new T.BoxGeometry(along === 'x' ? L : 30, 0.2, along === 'x' ? 30 : L), C.grass, 0, 0.1, 0, false);
        for (let s = -L / 2 + 12; s <= L / 2 - 12; s += 24) for (const e of [-1, 1]) {
          const x = along === 'x' ? s : e * 9, z = along === 'x' ? e * 9 : s;
          add(new T.CylinderGeometry(0.15, 0.2, 5, 6), F.steel, x, 2.5, z); add(new T.SphereGeometry(0.6, 8, 6), F.lamp, x, 5.2, z, false);
          const tx = along === 'x' ? s + 12 : e * 12, tz = along === 'x' ? e * 12 : s + 12;
          if (s + 12 < L / 2) { add(new T.CylinderGeometry(0.4, 0.6, 5, 6), F.wood, tx, 2.5, tz); add(new T.IcosahedronGeometry(3.4, 1), F.crops[(Math.abs(s) / 24 + (e > 0 ? 1 : 0)) % 5 | 0], tx, 7, tz); }
        }
        for (let i = 0; i < 4; i++) { const t = -L / 2 + 30 + i * (L - 60) / 3, e = i % 2 ? 1 : -1; add(new T.BoxGeometry(along === 'x' ? 5 : 1.4, 0.5, along === 'x' ? 1.4 : 5), F.wood, along === 'x' ? t : e * 7, 1.2, along === 'x' ? e * 7 : t); }
        for (let i = 0; i < 1; i++) P.person(g, P.civ(15100 + k * 7), 'walk', 0, 0.4, 0, 0, { path: { type: 'line', ax: along === 'x' ? -L / 2 + 10 : 2, az: along === 'x' ? 2 : -L / 2 + 10, bx: along === 'x' ? L / 2 - 10 : 2, bz: along === 'x' ? 2 : L / 2 - 10, speed: 1.2 } });
        for (let i = 0; i < 3; i++) { const t = -L / 3 + i * L / 3; P.figure(api, add, along === 'x' ? t : -2, 0.4, along === 'x' ? -2 : t, i === 1 ? 0.6 : 1, i + k * 3); }
      }
    },
    tick(api, dt) { if (P.globe) P.globe.rotation.y += dt * 0.15; },
  }));
})();
