/* ============================================================
   THE CHILDREN'S PLAYLAND · BUILD 2 · THE PLAYGROUNDS
   Keep this file in projects/childrensplayland next to childrensplayland.html.
   Four big playgrounds on soft ground — slides, swings, climbing
   frames, a rope web, see-saws and a sandpit in each — and the
   park paths that join everything up.
   ============================================================ */
(function () {
  const P = window.PLAY;
  const COLS = ['red', 'blue', 'green', 'purple'];
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 2, name: 'THE PLAYGROUNDS',
    brief: 'Four big playgrounds on soft ground, each with slides, swings, a climbing frame, a rope web, see-saws and a sandpit, and the paths that join them up.',
    types: {
      PLAYGROUND: { code: 'GD', name: 'PLAYGROUND', col: '#3fb04a', w: 90, d: 90, h: 14 },
      PARKPATH:   { code: 'SF', name: 'PARK PATH', col: '#d8cdb6', w: 12, d: 120, h: 1 },
    },
    order: ['PLAYGROUND', 'PARKPATH'],
    at: { PLAYGROUND: [[340, -160], [340, 160], [660, -160], [660, 160]], PARKPATH: [[500, -100], [500, 100], [420, 0], [580, 0]] },
    eye: [-260, 220, 360],
    stats(api, c) { return [['PLAYGROUNDS', c('PLAYGROUND') + ' / 4'], ['PARK PATHS', c('PARKPATH') + ' / 4'], ['SLIDES', c('PLAYGROUND') * 3], ['SWINGS', c('PLAYGROUND') * 6]]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, C = P.fun(api), main = C[COLS[k]], other = C[COLS[(k + 1) % 4]];
      if (type === 'PLAYGROUND') {
        add(new T.BoxGeometry(90, 0.6, 90), F.stoneDark, 0, 0.3, 0);
        add(new T.BoxGeometry(86, 0.5, 86), k % 2 ? C.soft : C.soft2, 0, 0.75, 0);
        // the climbing frame with a tower, a roof and three slides
        for (const [x, z] of [[-6, -6], [6, -6], [-6, 6], [6, 6]]) add(new T.BoxGeometry(1, 12, 1), main, x, 6.5, z);
        add(new T.BoxGeometry(13, 0.8, 13), C.yellow, 0, 6, 0);
        const roof = add(new T.ConeGeometry(9.5, 5, 4), other, 0, 15, 0); roof.rotation.y = Math.PI / 4;
        for (let i = 0; i < 3; i++) { const a = i * 2.1 + 0.4, sx = Math.cos(a), sz = Math.sin(a), s = add(new T.BoxGeometry(3, 0.4, 15), [C.yellow, C.orange, C.pink][i], sx * 12, 3.4, sz * 12); s.rotation.y = -a + Math.PI / 2; s.rotation.x = 0.42; }
        for (let y = 1.5; y < 6; y += 1.5) add(new T.BoxGeometry(5, 0.3, 0.3), F.steel, -4, y, -6.6);
        // swings
        const sw = new T.Group(); sw.position.set(-26, 0, 22); g.add(sw);
        for (const x of [-12, 12]) { const l = add(new T.BoxGeometry(0.8, 10, 0.8), main, x, 5, -2, true, sw); l.rotation.x = 0.2; const r = add(new T.BoxGeometry(0.8, 10, 0.8), main, x, 5, 2, true, sw); r.rotation.x = -0.2; }
        add(new T.BoxGeometry(25, 0.8, 0.8), main, 0, 10, 0, true, sw);
        for (let i = 0; i < 6; i++) { const x = -10 + i * 4; add(new T.BoxGeometry(0.1, 7, 0.1), F.steel, x - 0.8, 6.5, 0, false, sw); add(new T.BoxGeometry(0.1, 7, 0.1), F.steel, x + 0.8, 6.5, 0, false, sw); add(new T.BoxGeometry(2, 0.3, 1), [C.red, C.blue, C.yellow][i % 3], x, 3, 0, true, sw); }
        // a rope web
        const web = new T.Group(); web.position.set(24, 0, -22); g.add(web);
        add(new T.CylinderGeometry(0.4, 0.5, 11, 8), F.steel, 0, 5.5, 0, true, web);
        for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2, rp = add(new T.CylinderGeometry(0.15, 0.15, 13, 4), C.rope, Math.cos(a) * 4.5, 5.2, Math.sin(a) * 4.5, false, web); rp.lookAt(Math.cos(a) * 9, 0, Math.sin(a) * 9); rp.rotateX(Math.PI / 2); }
        for (const r of [3, 6]) add(new T.TorusGeometry(r, 0.15, 4, 24).rotateX(Math.PI / 2), C.rope, 0, 9 - r * 0.9, 0, false, web);
        // see-saws and a sandpit
        for (const z of [-30, -22]) { add(new T.BoxGeometry(1.4, 1.2, 1.4), F.dark, -28, 1.6, z); const b = add(new T.BoxGeometry(10, 0.4, 1.2), other, -28, 2.4, z); b.rotation.z = z < -25 ? 0.18 : -0.18; }
        add(new T.BoxGeometry(22, 0.6, 16), F.wood, 26, 1.1, 24); add(new T.BoxGeometry(20, 0.5, 14), C.sand, 26, 1.3, 24, false);
        add(new T.BoxGeometry(2, 1, 2), C.red, 23, 1.9, 22); add(new T.ConeGeometry(1.2, 1.6, 8), C.blue, 29, 2.2, 26);
        // benches for the grown-ups, and a fence round it all
        for (const s of [-1, 1]) { add(new T.BoxGeometry(6, 0.5, 1.4), F.wood, s * 40, 1.4, 0); add(new T.BoxGeometry(90, 1.2, 0.3), F.white, 0, 1.4, s * 45.2); if (s < 0) add(new T.BoxGeometry(0.3, 1.2, 90), F.white, s * 45.2, 1.4, 0); }
        add(new T.BoxGeometry(0.3, 1.2, 36), F.white, 45.2, 1.4, -27); add(new T.BoxGeometry(0.3, 1.2, 36), F.white, 45.2, 1.4, 27);
        // children playing
        for (let i = 0; i < 1; i++) P.person(g, P.kid(13000 + k * 10 + i), 'walk', 0, 0.9, 0, 0, { scale: 0.6, path: { type: 'circle', cx: (i % 2 ? 1 : -1) * 14, cz: (i < 3 ? -1 : 1) * 14, r: 4 + (i % 3) * 3, speed: 1.4 + (i % 3) * 0.3 } });
        for (const [i, [x, z]] of [[26, 21], [23, 26], [-24, 22], [-6, -14], [4, 12], [-28, -26]].entries()) P.figure(api, add, x, i ? 0.9 : 1.5, z, 0.6, k * 3 + i);
        P.figure(api, add, -40, 1, 3, 1, k);
      } else if (type === 'PARKPATH') {
        const along = sl.x === 500 ? 'z' : 'x', L = along === 'z' ? 120 : 70;
        add(new T.BoxGeometry(along === 'x' ? L : 10, 0.4, along === 'x' ? 10 : L), C.path, 0, 0.2, 0, false);
        for (let s = -L / 2 + 10; s <= L / 2 - 10; s += 20) for (const e of [-1, 1]) {
          const x = along === 'x' ? s : e * 7, z = along === 'x' ? e * 7 : s;
          add(new T.CylinderGeometry(0.15, 0.2, 5, 6), F.steel, x, 2.5, z); add(new T.SphereGeometry(0.6, 8, 6), F.lamp, x, 5.2, z, false);
        }
      }
    },
  }));
})();
