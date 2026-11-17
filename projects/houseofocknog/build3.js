/* ============================================================
   THE HOUSE OF OCKNOG · BUILD 3 · THE ROUND HOUSE & THE GUEST HUTS
   Keep this file in projects/houseofocknog next to 82-houseofocknog.html.
   The great round clay house with its domed roof, an open middle and a door that faces the court, and four round guest huts around it, for Sela-Oru and every visitor from Ocknog.
   ============================================================ */
(function () {
  const P = window.PWP;
  const HX = 1550 - 1400, HZ = 1100;
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 3, name: 'THE ROUND HOUSE & THE GUEST HUTS',
    brief: 'The great round clay house at the head of the court, with a domed roof, a ring of windows and a wide door, and four round guest huts around it, so every visitor from Ocknog has a bed of their own.',
    types: {
      ROUNDHOUSE: { code: 'FB', name: 'THE ROUND HOUSE', col: '#c08c5c', w: 112, d: 112, h: 44 },
      HUT:        { code: 'FB', name: 'GUEST HUT',       col: '#a06c44', w: 28, d: 28, h: 16 },
    },
    order: ['ROUNDHOUSE', 'HUT'],
    at: { ROUNDHOUSE: [[HX - 85, HZ]], HUT: [[HX - 40, HZ - 135], [HX - 110, HZ - 130], [HX - 40, HZ + 135], [HX - 110, HZ + 130]] },
    eye: [HX + 230, (window.__HOUSE.Y || -85) + 170, HZ + 300],
    stats(api, c) { return [['THE ROUND HOUSE', c('ROUNDHOUSE') ? 'BUILT' : 'NOT YET'], ['GUEST HUTS', c('HUT') + ' / 4'], ['BEDS FOR GUESTS', c('HUT') * 6 + ' / 24']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, O = P.ok(api), H = P.pw(api);
      if (type === 'ROUNDHOUSE') {
        add(new T.CylinderGeometry(58, 60, 1.6, 48), O.stone, 0, 0.8, 0, false);
        add(new T.CylinderGeometry(52, 54, 30, 48), O.clay, 0, 16, 0);
        add(new T.TorusGeometry(53, 1.2, 8, 64), O.clay2, 0, 31.4, 0, false).rotation.x = Math.PI / 2;
        const dome = add(new T.SphereGeometry(52, 40, 16, 0, Math.PI * 2, 0, Math.PI / 2), O.clay2, 0, 31, 0); dome.scale.y = 0.42;
        add(new T.CylinderGeometry(7, 8, 5, 20), O.stone, 0, 52, 0, false); add(new T.SphereGeometry(3, 12, 8), O.lamp, 0, 56.6, 0, false);
        for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; if (Math.abs(((a + Math.PI * 2) % (Math.PI * 2))) < 0.3 || Math.abs(a - Math.PI * 2) < 0.3) continue;
          add(new T.BoxGeometry(0.6, 8, 5), H.win, Math.cos(a) * 52.6, 20, Math.sin(a) * 52.6, false).rotation.y = -a; }
        for (const s of [-1, 1]) add(new T.CylinderGeometry(2.4, 2.8, 22, 12), O.stone, 52, 11, s * 11);
        add(new T.BoxGeometry(2.4, 3, 28), O.stone2, 52, 23, 0, false); add(new T.BoxGeometry(1.2, 20, 18), O.dark, 52.4, 10, 0, false);
        for (let i = 0; i < 6; i++) add(new T.BoxGeometry(0.4, 12, 3.4), O.cloth[i % 5], 54.6, 12, -9 + i * 3.6, false);
        P.sign(api, g, 'THE HOUSE OF OCKNOG', 34, 3.6, 56, 29, 0, Math.PI / 2, '#4a2c18', '#ffe2a0');
        P.alien(api, g, 62, 1.6, -8, Math.PI / 2, { seed: 2020, mode: 'wave', scale: 1 }); P.alien(api, g, 62, 1.6, 9, Math.PI / 2, { seed: 2021, scale: 1.05, elder: false });
      } else if (type === 'HUT') {
        add(new T.CylinderGeometry(14, 15, 11, 24), O.clay, 0, 5.5, 0);
        const roof = add(new T.ConeGeometry(17, 9, 24), O.thatch, 0, 15.5, 0); add(new T.SphereGeometry(1.1, 8, 6), O.brass, 0, 20.6, 0, false);
        add(new T.BoxGeometry(0.8, 7, 4.6), O.dark, 14.2, 3.5, 0, false);
        add(new T.BoxGeometry(0.6, 3, 3), H.win, 0, 7, 14.2, false); add(new T.BoxGeometry(3, 3, 0.6), H.win, 14, 7, 6, false);
        add(new T.SphereGeometry(0.8, 8, 6), O.lamp, 16, 8, 3.6, false);
        P.alien(api, g, 20, 0.4, 6, Math.PI / 2, { seed: 2030 + k, mode: k % 2 ? 'idle' : 'wave', scale: 0.9 });
      }
    },
  }));
})();
