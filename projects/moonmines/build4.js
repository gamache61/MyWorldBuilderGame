/* ============================================================
   THE MOON MINES · BUILD 4 · SMELTER & PART FACTORY
   Keep this file in projects/moonmines next to moonmines.html.
   The smelter melts the ore into clean metal (every bit of heat is
   reused — no smoke), the part factory turns it into station and
   city parts, with ore silos and haul rovers to keep it fed.
   ============================================================ */
(window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(window.MOON.build({
  id: 4, name: 'SMELTER & PART FACTORY',
  brief: 'The smelter turns ore into clean metal with no smoke, the part factory makes it into parts, with ore silos and haul rovers to keep it fed.',
  types: {
    SMELTER: { code: 'FB', name: 'SMELTER', col: '#d9731b', w: 40, d: 50, h: 34 },
    FACTORY: { code: 'FB', name: 'PART FACTORY', col: '#e8c13a', w: 70, d: 50, h: 20 },
    ORESILO: { code: 'MN', name: 'ORE SILO', col: '#8a5a3a', w: 20, d: 20, h: 28 },
    ROVER:   { code: 'MN', name: 'HAUL ROVER', col: '#e8c13a', w: 10, d: 16, h: 7 },
  },
  order: ['SMELTER', 'FACTORY', 'ORESILO', 'ROVER'],
  at: {
    SMELTER: [[780, -150]],
    FACTORY: [[780, -40]],
    ORESILO: [[700, -250], [745, -250], [790, -250]],
    ROVER: [[470, -30], [520, -30], [570, -30], [620, -30]],
  },
  stats(api, c) { return [['SMELTER', c('SMELTER') ? 'MELTING' : 'NOT YET'], ['PART FACTORY', c('FACTORY') ? 'MAKING PARTS' : 'NOT YET'], ['ORE SILOS', c('ORESILO') + ' / 3'], ['HAUL ROVERS', c('ROVER') + ' / 4']]; },
  make(type, k, g, add, F, api) {
    const T = api.THREE, MOON = window.MOON;
    if (type === 'SMELTER') {
      add(new T.BoxGeometry(40, 2, 50), F.dark, 0, 1, 0);
      add(new T.BoxGeometry(36, 20, 46), F.panel, 0, 12, 0);
      add(new T.BoxGeometry(36.6, 1, 46.6), F.gold, 0, 22.4, 0);
      for (const z of [-12, 12]) { add(new T.CylinderGeometry(7, 8, 12, 20), F.foil, 0, 28, z); add(new T.CylinderGeometry(7.1, 7.1, 1.4, 20, 1, true), F.hot, 0, 29, z, false); add(new T.SphereGeometry(7, 20, 8, 0, Math.PI * 2, 0, Math.PI / 2), F.white, 0, 34, z); }
      for (let z = -18; z <= 18; z += 9) add(new T.BoxGeometry(0.4, 4, 5), F.hot, -18.2, 8, z, false);
      add(new T.BoxGeometry(8, 8, 0.4), F.dark, -10, 5, 23.2, false);
      MOON.person(g, { kind: 'astro', seed: 9401, stripe: '#e8c13a' }, 'tablet', -24, 0, 10, Math.PI / 2);
    } else if (type === 'FACTORY') {
      add(new T.BoxGeometry(70, 2, 50), F.dark, 0, 1, 0);
      add(new T.BoxGeometry(66, 14, 46), F.white, 0, 9, 0);
      for (let x = -27; x <= 27; x += 13.5) add(new T.CylinderGeometry(6, 6, 46, 16, 1, true, 0, Math.PI).rotateX(Math.PI / 2).rotateZ(Math.PI / 2), F.panel, x, 16, 0);
      add(new T.BoxGeometry(66.4, 0.8, 46.4), F.glow, 0, 13.2, 0, false);
      add(new T.BoxGeometry(0.4, 10, 22), F.dark, -33.2, 7, 0, false);
      // finished parts stacked outside, ready for Unity: the same coloured crates the Ark carries
      const cols = [0x6c757d, 0x2f6690, 0xb03a2e, 0xe8e1d1, 0x3a7d44, 0xd9a21b];
      for (let i = 0; i < 12; i++) add(new T.BoxGeometry(2.44, 2.6, 12.2), F[['steel', 'panel', 'orange', 'white', 'garden', 'yellow'][i % 6]], -40 - (i % 3) * 3, 1.3 + ((i / 6) | 0) * 2.6, -14 + (((i / 3) | 0) % 2) * 15);
      MOON.person(g, { kind: 'astro', seed: 9402, stripe: '#2e7cc8' }, 'idle', -38, 0, 8, Math.PI / 2);
    } else if (type === 'ORESILO') {
      add(new T.CylinderGeometry(10, 10, 2, 24), F.dark, 0, 1, 0);
      add(new T.CylinderGeometry(9, 9, 20, 24), F.panel, 0, 12, 0);
      add(new T.ConeGeometry(9, 6, 24), F.foil, 0, 25, 0);
      for (const y of [6, 12, 18]) add(new T.TorusGeometry(9.1, 0.3, 6, 32).rotateX(Math.PI / 2), F.steel, 0, y, 0);
      add(new T.BoxGeometry(1.2, 22, 1.2), F.steel, 9.4, 12, 0);
    } else if (type === 'ROVER') {
      add(new T.BoxGeometry(7, 3, 12), F.yellow, 0, 3.5, 0);
      add(new T.BoxGeometry(6.4, 2.6, 7), F.oreDark, 0, 5.6, -2);
      for (let i = 0; i < 4; i++) add(new T.DodecahedronGeometry(1, 0), F.ore, -1.5 + (i % 2) * 3, 7.2, -4 + (i >> 1) * 3);
      add(new T.BoxGeometry(6, 3, 3.4), F.white, 0, 5.4, 4.6);
      add(new T.BoxGeometry(5.6, 1.4, 0.2), F.window, 0, 6, 6.35, false);
      for (const z of [-4, 0, 4]) for (const s of [-1, 1]) add(new T.CylinderGeometry(1.5, 1.5, 1.4, 14).rotateZ(Math.PI / 2), F.dark, s * 4, 1.5, z);
    }
  },
}));
