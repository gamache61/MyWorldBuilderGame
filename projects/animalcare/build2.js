/* ============================================================
   THE ANIMAL CARE CENTRE · BUILD 2 · THE ANIMAL CLINIC & THE FARM BARN
   Keep this file in projects/animalcare next to animalcare.html.
   The animal clinic, where the pets of Kryos are looked after by the
   first animal healers on Unity, a farm barn and paddock for cows and
   horses brought in from the Farmlands, and the path that runs out to
   the forest edge.
   ============================================================ */
(function () {
  const P = window.VET;
  // simple low-poly animals, shared by every build: deer, fox, dog, cat, cow, horse, rabbit, bird
  P.animal = function (api, add, grp, kind, x, y, z, ry = 0, sc = 1) {
    const T = api.THREE, std = c => (P._am = P._am || {})[c] || (P._am[c] = new T.MeshStandardMaterial({ color: c, roughness: 0.8 }));
    const a = new T.Group(); a.position.set(x, y, z); a.rotation.y = ry; a.scale.setScalar(sc); grp.add(a);
    const S = { deer: [1.1, 0.9, 1.4, 0x9a6a3a], fox: [0.55, 0.35, 0.5, 0xd8641e], dog: [0.6, 0.45, 0.6, 0xc8a070], cat: [0.4, 0.25, 0.35, 0x6a6a6a], cow: [1.6, 1.0, 1.4, 0xf2f2f2], horse: [1.5, 0.8, 1.7, 0x6a4028], rabbit: [0.3, 0.25, 0.2, 0xb8a890] }[kind];
    if (kind === 'bird') { add(new T.SphereGeometry(0.25, 8, 6), std([0x2f7fe0, 0xe0402e, 0xf2c41a][(x * 7 + z | 0) & 1 ? 0 : 2]), 0, 0, 0, false, a); add(new T.BoxGeometry(0.9, 0.04, 0.25), std(0x333333), 0, 0.05, 0, false, a); return a; }
    const [L, H, legH, col] = S, m = std(col), dark = std(kind === 'cow' ? 0x222222 : 0x3a2a1a);
    add(new T.CapsuleGeometry(H * 0.5, L, 4, 8).rotateZ(Math.PI / 2), m, 0, legH + H * 0.5, 0, true, a);
    for (const [lx, lz] of [[-L * 0.4, -H * 0.3], [-L * 0.4, H * 0.3], [L * 0.4, -H * 0.3], [L * 0.4, H * 0.3]]) add(new T.CylinderGeometry(0.06 * (H + 0.6), 0.05 * (H + 0.6), legH, 5), dark, lx, legH / 2, lz, true, a);
    const hx = L * 0.5 + H * 0.35, hy = legH + H * (kind === 'horse' || kind === 'deer' ? 1.2 : 0.9);
    add(new T.CylinderGeometry(H * 0.18, H * 0.25, H * 0.8, 6).rotateZ(-0.8), m, L * 0.5, legH + H * 0.8, 0, true, a);
    add(new T.BoxGeometry(H * 0.7, H * 0.5, H * 0.45), m, hx, hy, 0, true, a);
    if (kind === 'deer') for (const s of [-1, 1]) { add(new T.CylinderGeometry(0.03, 0.04, 0.7, 4).rotateZ(0.3 * s).rotateX(0.3 * s), dark, hx - 0.1, hy + 0.5, s * 0.15, false, a); }
    if (kind === 'fox' || kind === 'cat' || kind === 'dog' || kind === 'rabbit') for (const s of [-1, 1]) add(new T.ConeGeometry(H * 0.12, H * (kind === 'rabbit' ? 0.9 : 0.35), 4), m, hx - 0.05, hy + H * 0.4, s * H * 0.14, false, a);
    if (kind === 'cow') { add(new T.BoxGeometry(L * 0.3, H * 0.5, H * 1.02), dark, -L * 0.1, legH + H * 0.6, 0, false, a); }
    if (kind !== 'rabbit') add(new T.CylinderGeometry(0.04 * (H + 0.6), 0.02, L * (kind === 'fox' ? 0.6 : 0.35), 5).rotateZ(1.1), kind === 'fox' ? std(0xf2e8d8) : m, -L * 0.6, legH + H * 0.5, 0, false, a);
    return a;
  };
  // animals that wander slowly round a circle (kept separate so they can move)
  P.walkers = P.walkers || [];
  P.wander = function (api, add, grp, kind, cx, cz, r, n, sc = 1, y = 0) {
    for (let i = 0; i < n; i++) { const a = P.animal(api, add, grp, kind, 0, y, 0, 0, sc); a.userData.keep = true; P.walkers.push({ a, cx, cz, r: r * (0.6 + (i % 3) * 0.2), ph: i / n * Math.PI * 2, sp: 0.05 + (i % 4) * 0.015 }); }
  };
  P.moveWalkers = function (t) { for (const w of P.walkers) { const q = w.ph + t * w.sp; w.a.position.x = w.cx + Math.cos(q) * w.r; w.a.position.z = w.cz + Math.sin(q) * w.r; w.a.rotation.y = -q - Math.PI; } };
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 2, name: 'THE ANIMAL CLINIC & THE FARM BARN',
    brief: 'The animal clinic where the first animal healers on Unity care for the pets of Kryos, a farm barn and paddock for sick cows and horses, and the path out to the forest edge.',
    types: {
      CLINIC:   { code: 'SY', name: 'ANIMAL CLINIC', col: '#b8f090', w: 110, d: 70, h: 18 },
      FARMBARN: { code: 'FB', name: 'FARM BARN', col: '#d9a21b', w: 100, d: 60, h: 18 },
      APATH:    { code: 'SF', name: 'FOREST PATH', col: '#d8cdb6', w: 380, d: 12, h: 1 },
    },
    order: ['CLINIC', 'FARMBARN', 'APATH'],
    at: { CLINIC: [[1000, -120]], FARMBARN: [[1000, 120]], APATH: [[1120, 0]] },
    eye: [-260, 220, 300],
    stats(api, c) { return [['ANIMAL CLINIC', c('CLINIC') ? 'OPEN' : 'NOT YET'], ['FARM BARN', c('FARMBARN') ? 'OPEN' : 'NOT YET'], ['FOREST PATH', c('APATH') ? 'OPEN' : 'NOT YET']]; },
    make(type, k, g, add, F, api) {
      const T = api.THREE, S = P.hm(api), C = P.fun(api);
      if (type === 'CLINIC') {
        add(new T.BoxGeometry(110, 0.8, 70), S.stone, 0, 0.4, 0);
        // a low, friendly clinic with a green roof, big windows, a paw sign and an exercise yard
        add(new T.BoxGeometry(80, 12, 36), F.white, -10, 6.8, -8);
        add(new T.BoxGeometry(81, 1, 37), S.frame, -10, 13.3, -8); add(new T.BoxGeometry(76, 0.8, 32), S.roofGreen, -10, 14.2, -8);
        for (let i = 0; i < 8; i++) add(new T.BoxGeometry(7, 4, 0.3), S.dim, -44 + i * 9.6, 6.5, 10.15, false);
        add(new T.BoxGeometry(10, 7, 0.4), S.glass, -10, 4.3, 10.3, false);
        const paw = (x, y, z, k2) => { add(new T.CylinderGeometry(1.6 * k2, 1.6 * k2, 0.3, 16).rotateX(Math.PI / 2), S.glow, x, y, z, false); for (let i = 0; i < 4; i++) add(new T.CylinderGeometry(0.6 * k2, 0.6 * k2, 0.3, 10).rotateX(Math.PI / 2), S.glow, x - 1.8 * k2 + i * 1.2 * k2, y + 2 * k2 - (i === 0 || i === 3 ? 0.5 * k2 : 0), z, false); };
        paw(14, 10, 10.4, 1.2);
        P.sign(api, g, 'ANIMAL CLINIC', 20, 2.8, -14, 10.6, 10.4, 0, '#ffffff', '#3a7a2a', false);
        // the exercise yard with dogs, and a family bringing their cat
        add(new T.BoxGeometry(34, 0.4, 24), C.grass, 34, 1, 18); for (const [w, d, x, z] of [[34, 0.3, 34, 6], [34, 0.3, 34, 30], [0.3, 24, 17, 18], [0.3, 24, 51, 18]]) add(new T.BoxGeometry(w, 1.4, d), F.white, x, 1.6, z);
        P.wander(api, add, g, 'dog', 34, 18, 7, 3, 1.4, 1.2);
        P.animal(api, add, g, 'cat', -6, 0.8, 15, 0.5, 1.4); P.figure(api, add, -8, 0.8, 16, 1, 3); P.figure(api, add, -10, 0.8, 16.5, 0.6, 4);
        P.person(g, P.civ(20000), 'gesture', -4, 0.8, 14, Math.PI);
        P.person(g, P.civ(20001), 'walk', 0, 1, 0, 0, { path: { type: 'line', ax: 20, az: 32, bx: 48, bz: 32, speed: 1 } });
      } else if (type === 'FARMBARN') {
        add(new T.BoxGeometry(100, 0.6, 60), F.soil, 0, 0.3, 0);
        // a red barn with a big door and a hay loft, and a fenced paddock with cows and horses getting better
        add(new T.BoxGeometry(36, 12, 26), S.brick, -24, 6.6, -10);
        add(new T.CylinderGeometry(15, 15, 37, 3).rotateZ(Math.PI / 2).rotateX(-Math.PI / 2), S.slate, -24, 15.6, -10).scale.y = 0.5;
        add(new T.BoxGeometry(10, 9, 0.4), S.timber, -24, 5, 3.2, false); add(new T.BoxGeometry(5, 3, 0.4), S.timber, -24, 13, 3.2, false);
        for (let i = 0; i < 4; i++) add(new T.BoxGeometry(3, 2.4, 3), S.yellow, -40 + i * 3.4, 1.8, 8);
        add(new T.BoxGeometry(56, 0.4, 50), C.grass, 20, 0.7, 2);
        for (const [w, d, x, z] of [[56, 0.3, 20, -23], [56, 0.3, 20, 27], [0.3, 50, -8, 2], [0.3, 50, 48, 2]]) for (const y of [1.4, 2.6]) add(new T.BoxGeometry(w, 0.3, d), S.timber, x, y, z);
        P.wander(api, add, g, 'cow', 20, 2, 14, 3, 2.4, 0.9); P.wander(api, add, g, 'horse', 20, 2, 20, 2, 2.4, 0.9);
        add(new T.CylinderGeometry(2, 2, 1.4, 12), S.teal, 40, 1.4, -16);
        P.person(g, P.civ(20010), 'tablet', 6, 0.9, -14, 0.6);
        P.sign(api, g, 'FARM BARN', 14, 2.2, -24, 11, 3.4, 0, '#fff6e0', '#8a3a1a', false);
      } else if (type === 'APATH') {
        add(new T.BoxGeometry(380, 0.2, 32), C.grass, 0, 0.1, 0, false); add(new T.BoxGeometry(380, 0.4, 10), C.path, 0, 0.25, 0, false);
        for (let x = -180; x <= 180; x += 24) for (const e of [-1, 1]) { add(new T.CylinderGeometry(0.15, 0.2, 4, 6), F.steel, x, 2, e * 7); add(new T.SphereGeometry(0.5, 8, 6), F.lamp, x, 4.2, e * 7, false); }
        for (let x = -170; x <= 170; x += 30) for (const e of [-1, 1]) { add(new T.CylinderGeometry(0.4, 0.6, 5, 6), F.wood, x + 12, 2.5, e * 13); add(new T.IcosahedronGeometry(3.4, 1), F.crops[((x + 170) / 30 | 0) % 5], x + 12, 7, e * 13); }
        P.person(g, P.civ(20020), 'walk', 0, 0.4, 0, 0, { path: { type: 'line', ax: -180, az: 1.5, bx: 180, bz: 1.5, speed: 1.1 } });
        P.person(g, P.kid(20021), 'walk', 0, 0.4, 0, 0, { path: { type: 'line', ax: 170, az: -1.5, bx: -170, bz: -1.5, speed: 1.3 }, scale: 0.6 });
      }
    },
    tick(api, dt, t) { P.moveWalkers(t); },
  }));
})();
