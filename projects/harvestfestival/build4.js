/* ============================================================
   THE HARVEST FESTIVAL GROUNDS · BUILD 4 · THE STAGE, THE DANCING GREEN & THE CAROUSELS
   Keep this file in projects/harvestfestival next to 67-harvestfestival.html.
   A round bandshell stage at the east end, a wooden dancing floor ringed with lantern poles,
   and two painted carousels that turn slowly.
   ============================================================ */
(function () {
  const P = window.HFG;
  P.spin = P.spin || [];
  P.onTick = function (api, dt, t) {
    for (let i = P.spin.length - 1; i >= 0; i--) { const s = P.spin[i]; if (!s.m.parent) { P.spin.splice(i, 1); continue; } s.m.rotation.y += dt * s.sp; }
  };
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 4, name: 'THE STAGE, THE DANCING GREEN & THE CAROUSELS',
    brief: 'A bandshell stage at the east end with rows of benches, a round wooden dancing floor ringed with lantern poles, and two painted carousels that turn slowly.',
    types: {
      STAGE:    { code: 'SY', name: 'BANDSHELL STAGE', col: '#ffd9a0', w: 50, d: 36, h: 18 },
      DANCE:    { code: 'SF', name: 'DANCING GREEN',   col: '#c79a62', w: 64, d: 64, h: 3 },
      CAROUSEL: { code: 'HM', name: 'CAROUSEL',        col: '#f06aa8', w: 26, d: 26, h: 14 },
    },
    order: ['STAGE', 'DANCE', 'CAROUSEL'],
    at: { STAGE: [[1550 + 215, 0]], DANCE: [[1550 + 110, 0]], CAROUSEL: [[1550 + 40, -105], [1550 + 40, 105]] },
    eye: [1550 + 120, P.SY + 110, 220],
    stats(api, c) { return [['BANDSHELL STAGE', c('STAGE') ? 'READY' : 'NOT YET'], ['DANCING GREEN', c('DANCE') ? 'LAID' : 'NOT YET'], ['CAROUSELS', c('CAROUSEL') + ' / 2']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, H = P.hf(api);
      if (type === 'STAGE') {
        add(new T.BoxGeometry(50, 2, 36), H.stone, 0, 1, 0, true); add(new T.BoxGeometry(46, 0.4, 32), H.floor, 0, 2.2, 0, false);
        // half-dome shell opening west
        const sh = add(new T.SphereGeometry(16, 20, 12, 0, Math.PI, 0, Math.PI / 2).rotateY(-Math.PI / 2), H.wall, 12, 2.4, 0, true); sh.scale.set(1.2, 1, 1.05);
        add(new T.CylinderGeometry(16.5, 16.5, 0.5, 16, 1, false, 0, Math.PI).rotateY(Math.PI / 2), H.roof2, 12, 2.3, 0, false);
        for (let i = 0; i < 9; i++) add(new T.SphereGeometry(0.3, 6, 5), i % 2 ? H.lamp : H.glowA, -1 + Math.cos(i / 8 * Math.PI - Math.PI / 2) * 15, 14.5 * 0 + 2.4 + Math.sin(i / 8 * Math.PI) * 14.5, Math.sin(i / 8 * Math.PI - Math.PI / 2) * -15.5 * -1 * 0 + (-15.5 + i * 3.9), false);
        // benches in curved rows facing the stage (west of it)
        for (let r = 0; r < 4; r++) for (let i = -5; i <= 5; i++) add(new T.BoxGeometry(1.6, 0.4, 3.2), H.timber, -36 - r * 4.4, 0.6, i * 4.6, false);
        for (const z of [-5, 0, 5]) P.person(g, P.civ(67300 + z), 'idle', 14, 2.4, z, -Math.PI / 2);
        P.sign(api, g, 'THE HARVEST STAGE', 16, 2, -12, 17, 0, -Math.PI / 2, '#5a2a10', '#ffe9a0', false);
      } else if (type === 'DANCE') {
        add(new T.CylinderGeometry(32, 33, 0.7, 28), H.stone, 0, 0.35, 0, false); add(new T.CylinderGeometry(30, 30, 0.2, 28), H.floor, 0, 0.8, 0, false);
        for (let i = 0; i < 12; i++) add(new T.RingGeometry(i * 2.4 + 1, i * 2.4 + 1.5, 28).rotateX(-Math.PI / 2), i % 2 ? H.gold : H.red, 0, 0.93, 0, false);
        for (let i = 0; i < 10; i++) { const a = i / 10 * Math.PI * 2, x = Math.cos(a) * 30, z = Math.sin(a) * 30;
          add(new T.CylinderGeometry(0.16, 0.22, 9, 6), H.steel, x, 4.5, z, false); add(new T.SphereGeometry(0.5, 8, 6), i % 2 ? H.lamp : H.glowA, x, 9.2, z, false); }
        for (let i = 0; i < 10; i++) { const a = i / 10 * Math.PI * 2, b = (i + 1) / 10 * Math.PI * 2; for (let j = 1; j < 6; j++) { const u = j / 6, x = Math.cos(a) * 30 * (1 - u) + Math.cos(b) * 30 * u, z = Math.sin(a) * 30 * (1 - u) + Math.sin(b) * 30 * u; add(new T.SphereGeometry(0.2, 5, 4), H.flag[(i + j) % 6], x, 8.6 - Math.sin(u * Math.PI) * 1.4, z, false); } }
        for (let i = 0; i < 6; i++) { const a = i * 1.05; P.person(g, P.civ(67400 + i), 'idle', Math.cos(a) * 8, 0.9, Math.sin(a) * 8, a); }
      } else if (type === 'CAROUSEL') {
        add(new T.CylinderGeometry(13, 13.4, 0.8, 24), H.stone, 0, 0.4, 0, false);
        const top = new T.Group(); g.add(top);
        const put = (geo, mat, x, y, z) => { const m = new T.Mesh(geo, mat); m.position.set(x, y, z); top.add(m); return m; };
        put(new T.CylinderGeometry(11.5, 11.5, 0.5, 24), H.floor, 0, 1.1, 0); put(new T.CylinderGeometry(1.2, 1.2, 10, 10), H.white, 0, 6, 0);
        put(new T.ConeGeometry(13.5, 4.2, 24), H.awn[k % 6], 0, 12, 0); put(new T.CylinderGeometry(12.4, 12.4, 0.6, 24), H.red, 0, 9.8, 0); put(new T.SphereGeometry(0.7, 8, 6), H.gold, 0, 14.4, 0);
        for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2, x = Math.cos(a) * 8.6, z = Math.sin(a) * 8.6;
          put(new T.CylinderGeometry(0.12, 0.12, 8.4, 5), H.gold, x, 5.4, z); put(new T.BoxGeometry(1.2, 1.5, 3.2), H.awn[(i + k) % 6], x, 3.1, z).rotation.y = -a; put(new T.SphereGeometry(0.55, 6, 5), H.white, x + Math.cos(a) * 0.1, 4.3, z); put(new T.SphereGeometry(0.28, 6, 5), i % 2 ? H.lamp : H.glowA, Math.cos(a) * 12.3, 9.8, Math.sin(a) * 12.3); }
        const m = new T.Group(); m.userData.keep = true; m.add(top); g.add(m); P.spin.push({ m, sp: 0.45 });
      }
    },
  }));
})();
