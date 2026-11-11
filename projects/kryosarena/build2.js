/* ============================================================
   THE KRYOS ARENA · BUILD 2 · THE ARENA BOWL
   Keep this file in projects/kryosarena next to 58-kryosarena.html.
   A great open-roofed bowl with tiers of seats, a green pitch in the middle, four floodlight towers and a gate at each end.
   ============================================================ */
(function () {
  const P = window.YARD;
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 2, name: 'THE ARENA BOWL',
    brief: 'A great open-roofed bowl with tiers of seats around a green pitch, four floodlight towers and a gate at each end.',
    types: { ARENABOWL: { code: 'SY', name: 'ARENA BOWL', col: '#e8e1d1', w: 230, d: 170, h: 46 } },
    order: ['ARENABOWL'],
    at: { ARENABOWL: [[1550, 0]] },
    eye: [1000, 230, 330],
    stats(api, c) { return [['ARENA BOWL', c('ARENABOWL') ? 'OPEN TO THE SKY' : 'NOT YET'], ['SEATS', c('ARENABOWL') ? '40,000' : '0']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, S = P.hm(api), C = P.fun(api);
      const el = (geo, m, x, y, z) => { const o = add(geo, m, x, y, z); o.scale.set(1, 1, 0.72); return o; };
      add(new T.CylinderGeometry(115, 118, 1.6, 48), S.gravel, 0, 0.8, 0).scale.set(1, 1, 0.74);
      el(new T.CylinderGeometry(70, 70, 0.6, 48), C.grass, 0, 2, 0);
      for (let i = -3; i <= 3; i += 2) add(new T.BoxGeometry(8, 0.2, 100), C.soft, i * 14, 2.4, 0).castShadow = false;
      add(new T.BoxGeometry(1, 0.2, 100), F.white, 0, 2.5, 0).castShadow = false;
      const cc = add(new T.TorusGeometry(10, 0.3, 6, 30), F.white, 0, 2.5, 0); cc.rotation.x = Math.PI / 2; cc.castShadow = false;
      const cols = [0x2f6690, 0x3fb04a, 0xe8c13a, 0xe0402e];
      for (let t = 0; t < 4; t++) {
        const r0 = 76 + t * 9, r1 = 86 + t * 9;
        el(new T.CylinderGeometry(r1, r0, 9, 48, 1, true), new T.MeshStandardMaterial({ color: cols[t], roughness: 0.7, side: T.DoubleSide }), 0, 4 + t * 9 + 4.5, 0);
        el(new T.CylinderGeometry(r0 - 1, r0 - 1, 9, 48, 1, true), F.white, 0, 4 + t * 9 + 4.5, 0);
      }
      el(new T.TorusGeometry(114, 1.2, 6, 64).rotateX(Math.PI / 2), F.white, 0, 42, 0);
      el(new T.CylinderGeometry(119, 114, 22, 48, 1, true), new T.MeshStandardMaterial({ color: 0xe8e1d1, roughness: 0.7, side: T.DoubleSide }), 0, 12, 0);
      for (const sd of [-1, 1]) { add(new T.BoxGeometry(34, 16, 10), F.white, sd * 118, 8, 0); add(new T.BoxGeometry(18, 11, 11), F.dark, sd * 118, 6, 0); P.sign(api, g, sd < 0 ? 'KRYOS ARENA · WEST GATE' : 'KRYOS ARENA · EAST GATE', 28, 3, sd * 118, 18, 0, sd < 0 ? -Math.PI / 2 : Math.PI / 2, '#14324a', '#ffd9a0', true); }
      for (const [x, z] of [[-96, -74], [96, -74], [-96, 74], [96, 74]]) { add(new T.CylinderGeometry(1.4, 2.2, 70, 8), F.steel, x, 35, z); add(new T.BoxGeometry(14, 6, 3), F.dark, x, 72, z); for (let i = -2; i <= 2; i++) add(new T.BoxGeometry(1.8, 1.8, 0.8), F.lamp, x + i * 2.6, 72, z + 2).castShadow = false; }
      for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2; P.figure(api, add, Math.cos(a) * 80, 8, Math.sin(a) * 58, 0.7, i, g); }
      for (let i = 0; i < 3; i++) P.person(g, P.kid(58100 + i), 'idle', -20 + i * 20, 1, 100, Math.PI);
      P.sign(api, g, 'THE KRYOS ARENA', 70, 7, 0, 38, 84, 0, '#14324a', '#ffd9a0', true);
    },
  }));
})();
