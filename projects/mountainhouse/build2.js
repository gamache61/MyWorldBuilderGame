/* ============================================================
   MOUNTAIN HOUSE · BUILD 2 · THE MOUNTAIN STAIR & THE TRAILHEAD
   Keep this file in projects/mountainhouse next to 63-mountainhouse.html.
   A stone stair winds round the mountain from the foot to the summit,
   with a trailhead arch at the bottom and two timber view shelters on the way.
   ============================================================ */
(function () {
  const P = window.MTN;
  P.mh = function (api) {
    if (this._mh) return this._mh; const T = api.THREE, std = (c, r = 0.8, m = 0, e = {}) => new T.MeshStandardMaterial({ color: c, roughness: r, metalness: m, ...e });
    return this._mh = {
      stone: std(0xb9b1a2, 0.95), stone2: std(0x9c9484, 0.95), dark: std(0x4a4f57, 0.7, 0.2), timber: std(0x9a6f42, 0.85), timber2: std(0x6e4a2a, 0.9), white: std(0xf4f1ea, 0.6), cream: std(0xe8dcc0, 0.8),
      roof: std(0x2f7f8a, 0.8), glass: new T.MeshStandardMaterial({ color: 0xbfe8ff, roughness: 0.05, metalness: 0.3, transparent: true, opacity: 0.4, side: T.DoubleSide, depthWrite: false }),
      win: new T.MeshStandardMaterial({ color: 0x3a3226, emissive: 0xffd9a0, emissiveIntensity: 0.55, roughness: 0.5 }), lamp: new T.MeshBasicMaterial({ color: new T.Color(1.6, 1.3, 0.8), toneMapped: false }),
      grass: std(0x5aa64a, 1), leaf: std(0x4f8f3a, 0.9, 0, { flatShading: true }), trunk: std(0x6a4a2a, 0.9), flower: [0xe0402e, 0xf2c41a, 0xf06aa8, 0x8a4fd0, 0xffffff].map(c => std(c, 0.8)),
      steel: std(0xc8ced6, 0.35, 0.7), red: std(0xb03a2e, 0.6), yellow: std(0xd9a21b, 0.6), glowG: new T.MeshBasicMaterial({ color: new T.Color(0.5, 1.6, 1.2), toneMapped: false }), glowA: new T.MeshBasicMaterial({ color: new T.Color(2, 1.4, 0.4), toneMapped: false }),
    };
  };
  P.gy = (x, z) => window.coaxH(x, z);
  // a box lying between two world points (cables, rails, stair slabs), placed relative to the slot
  P.span = (api, add, g, sl, a, b, w, h, mat, up = 0, parent) => {
    const dx = b[0] - a[0], dz = b[2] === undefined ? 0 : 0; const ax = a[0], az = a[1], ay = a[2], bx = b[0], bz = b[1], by = b[2];
    const hx = bx - ax, hz = bz - az, hy = by - ay, L = Math.hypot(hx, hz), L3 = Math.hypot(L, hy);
    const m = add(new api.THREE.BoxGeometry(L3, h, w), mat, (ax + bx) / 2 - sl.x, (ay + by) / 2 - sl.y + up, (az + bz) / 2 - sl.z, true, parent || g);
    m.rotation.order = 'YZX'; m.rotation.y = -Math.atan2(hz, hx); m.rotation.z = Math.atan2(hy, L); return m;
  };
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 2, name: 'THE MOUNTAIN STAIR & THE TRAILHEAD',
    brief: 'A stone stair winds up the mountain from the foot to the summit, with lamps and rails, a trailhead arch at the bottom and two timber view shelters on the way.',
    types: {
      STAIR:     { code: 'SF', name: 'STAIR FLIGHT',   col: '#b9b1a2', w: 36, d: 36, h: 8 },
      TRAILHEAD: { code: 'SF', name: 'TRAILHEAD ARCH', col: '#e8cfa6', w: 40, d: 24, h: 24 },
      SHELTER:   { code: 'HM', name: 'VIEW SHELTER',   col: '#9a6f42', w: 30, d: 24, h: 14 },
    },
    order: ['STAIR', 'TRAILHEAD', 'SHELTER'],
    at: { STAIR: [0, 1, 2, 3].map(i => { const q = P.path((i + 0.5) / 4); return [q[0] - P.OFF[0], q[1] - P.OFF[1]]; }), TRAILHEAD: [(() => { const q = P.path(0); return [q[0] - P.OFF[0], q[1] - P.OFF[1]]; })()],
      SHELTER: [0.33, 0.66].map(t => { const q = P.shelterAt(t); return [q[0] - P.OFF[0], q[1] - P.OFF[1]]; }) },
    eye: [420, 470, 420],
    stats(api, c) { return [['STAIR FLIGHTS', c('STAIR') + ' / 4'], ['TRAILHEAD', c('TRAILHEAD') ? 'OPEN' : 'NOT YET'], ['VIEW SHELTERS', c('SHELTER') + ' / 2']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, H = P.mh(api), gy = P.gy;
      if (type === 'STAIR') {
        const N = 16, t0 = k / 4, t1 = (k + 1) / 4; let prev = null;
        for (let i = 0; i <= N; i++) {
          const t = t0 + (t1 - t0) * i / N, q = P.path(t), y = gy(q[0], q[1]) + 0.4, pt = [q[0], q[1], y];
          if (prev) {
            const mx = (prev[0] + pt[0]) / 2, mz = (prev[1] + pt[1]) / 2;
            P.span(api, add, g, sl, prev, pt, 7, 0.7, i % 2 ? H.stone : H.stone2);
            const m = add(new T.BoxGeometry(8, 12, 8), H.stone2, mx - sl.x, (prev[2] + pt[2]) / 2 - sl.y - 6.3, mz - sl.z, false);   // the cut-and-fill under the stair
            const a = -0.6 * Math.PI + 1.5 * Math.PI * t, ca = Math.cos(a), sa = Math.sin(a);
            for (const s of [-1, 1]) { const ox = -sa * s * 3.4, oz = ca * s * 3.4; add(new T.CylinderGeometry(0.2, 0.2, 2.2, 5), H.dark, pt[0] + ox - sl.x, pt[2] - sl.y + 1.2, pt[1] + oz - sl.z, false);
              if (i % 4 === 0 && s === 1) { add(new T.CylinderGeometry(0.15, 0.2, 5, 6), H.dark, pt[0] + ox * 1.15 - sl.x, pt[2] - sl.y + 2.8, pt[1] + oz * 1.15 - sl.z, false); add(new T.SphereGeometry(0.5, 8, 6), H.lamp, pt[0] + ox * 1.15 - sl.x, pt[2] - sl.y + 5.4, pt[1] + oz * 1.15 - sl.z, false); } }
          }
          prev = pt;
        }
        for (let i = 0; i < 2; i++) { const q = P.path(t0 + (t1 - t0) * (0.3 + i * 0.4)), y = gy(q[0], q[1]); const cx = Math.cos(-0.6 * Math.PI + 1.5 * Math.PI * (t0 + (t1 - t0) * 0.5));
          P.person(g, P.civ(63000 + k * 5 + i), 'walk', q[0] - sl.x, y + 0.8 - sl.y, q[1] - sl.z, 0); }
      } else if (type === 'TRAILHEAD') {
        const q0 = P.path(0), q1 = P.path(0.02), th = Math.atan2(q1[1] - q0[1], q1[0] - q0[0]), rg = new T.Group(); rg.rotation.y = -th; rg.position.y = 0; g.add(rg);
        add(new T.BoxGeometry(46, 1, 26), H.stone, 0, 0.1, 0, false, rg); add(new T.BoxGeometry(46, 12, 26), H.stone2, 0, -6, 0, false, rg);
        for (const s of [-1, 1]) add(new T.BoxGeometry(2.4, 18, 2.4), H.timber2, 0, 9, s * 8, true, rg);
        add(new T.BoxGeometry(3, 2.4, 20), H.timber2, 0, 18.5, 0, true, rg); add(new T.BoxGeometry(2, 1, 22), H.roof, 0, 20, 0, true, rg);
        P.sign(api, g, 'MOUNTAIN HOUSE TRAIL', 18, 3, sl.x * 0, 14.4, 0, -th - Math.PI / 2, '#3b2a18', '#ffe9b8');
        for (const [bx, bz] of [[-14, 10], [-14, -10]]) { add(new T.BoxGeometry(6, 0.8, 1.6), H.timber, bx, 1.5, bz, true, rg); add(new T.BoxGeometry(0.8, 1.2, 1.2), H.timber2, bx, 0.8, bz, false, rg); }
        P.person(g, P.civ(63050), 'gesture', -10, 0.6, 0, th); P.person(g, P.kid(63051), 'idle', -12, 0.6, 5, th, { scale: 0.6 });
      } else if (type === 'SHELTER') {
        const q = P.shelterAt(k === 0 ? 0.33 : 0.66), a = -0.6 * Math.PI + 1.5 * Math.PI * (k === 0 ? 0.33 : 0.66), rg = new T.Group(); rg.rotation.y = -a; g.add(rg);
        add(new T.BoxGeometry(18, 1, 12), H.stone, 0, 0.1, 0, false, rg); add(new T.BoxGeometry(18, 12, 12), H.stone2, 0, -6, 0, false, rg);
        for (const x of [-7.5, 7.5]) for (const z of [-5, 5]) add(new T.BoxGeometry(0.9, 8, 0.9), H.timber2, x, 4.5, z, true, rg);
        for (const s of [-1, 1]) { const r = add(new T.BoxGeometry(22, 0.6, 8), H.roof, 0, 9.6, s * 3.3, true, rg); r.rotation.x = -s * 0.26; }
        add(new T.BoxGeometry(14, 0.8, 2.4), H.timber, 0, 1.6, -4, true, rg); add(new T.BoxGeometry(14, 2, 0.5), H.timber, 0, 3, -5.4, true, rg);
        P.person(g, P.civ(63060 + k), 'idle', 2, 1.1, 2, a + Math.PI / 2);
      }
    },
  }));
})();
