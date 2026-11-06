/* ============================================================
   FARMLANDS OF UNITY · BUILD 2 · WATER CHANNELS
   Keep this file in projects/farmlands next to farmlands.html.
   A reservoir fed from the hills, two pump houses, the main canal
   and four side channels that will water every field.
   Everything is beamed in by the transporter (T).
   ============================================================ */
(window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(window.FARM.build({
  id: 2, name: 'WATER CHANNELS',
  brief: 'A reservoir fed from the hills, two pump houses, a 380 m main canal and four side channels to water every field.',
  types: {
    RESERVOIR: { code: 'WR', name: 'RESERVOIR', col: '#2f8fb0', w: 84, d: 84, h: 5 },
    PUMP:      { code: 'SY', name: 'PUMP HOUSE', col: '#e8e1d1', w: 16, d: 12, h: 10 },
    CANAL:     { code: 'WC', name: 'CANAL SECTION', col: '#3a86b0', w: 48, d: 12, h: 2 },
    SIDE:      { code: 'WC', name: 'SIDE CHANNEL', col: '#5fa6c8', w: 8, d: 300, h: 2 },
  },
  order: ['RESERVOIR', 'PUMP', 'CANAL', 'SIDE'],
  at: {
    RESERVOIR: [[730, 0]],
    PUMP: [[730, -64], [730, 64]],
    CANAL: Array.from({ length: 8 }, (_, i) => [Math.round((300 + 47.5 * (i + 0.5)) * 100) / 100, 0]),
    SIDE: [[390, 160], [390, -160], [490, 160], [490, -160]],
  },
  stats(api, c) { return [['RESERVOIR', c('RESERVOIR') ? 'FILLING' : 'NOT YET'], ['PUMP HOUSES', c('PUMP') + ' / 2'], ['MAIN CANAL', Math.round(c('CANAL') * 47.5) + ' / 380 m'], ['SIDE CHANNELS', c('SIDE') + ' / 4']]; },
  make(type, k, g, add, F, api) {
    const T = api.THREE;
    if (type === 'RESERVOIR') {
      add(new T.CylinderGeometry(42, 43, 3, 64, 1, true), F.stone, 0, 1.5, 0).material = F.stone;
      add(new T.TorusGeometry(42.5, 1.2, 8, 96).rotateX(Math.PI / 2), F.stoneDark, 0, 3, 0);
      add(new T.CircleGeometry(42, 64).rotateX(-Math.PI / 2), F.water, 0, 2.2, 0, false);
      add(new T.CircleGeometry(42, 64).rotateX(-Math.PI / 2), F.stoneDark, 0, 0.2, 0, false);
      // the inflow from the hills and the outlet into the main canal
      add(new T.BoxGeometry(14, 3.4, 12), F.stone, 46, 1.7, 0);
      add(new T.BoxGeometry(16, 0.6, 7), F.water, 48, 2.6, 0, false);
      add(new T.BoxGeometry(10, 4, 14), F.stone, -44, 2, 0);
      for (let i = 0; i < 6; i++) { const a = i / 6 * Math.PI * 2 + 0.3; add(new T.CylinderGeometry(0.6, 0.6, 5, 8), F.white, Math.cos(a) * 43.5, 2.5, Math.sin(a) * 43.5); add(new T.SphereGeometry(0.7, 8, 6), F.glow, Math.cos(a) * 43.5, 5.4, Math.sin(a) * 43.5, false); }
      window.FARM.person(g, { kind: 'worker', seed: 8201, female: false }, 'tablet', -50, 0, 10, -Math.PI / 2);
    } else if (type === 'PUMP') {
      add(new T.BoxGeometry(16, 8, 12), F.white, 0, 4, 0);
      add(new T.BoxGeometry(16.6, 0.6, 12.6), F.stoneDark, 0, 8.3, 0);
      add(new T.BoxGeometry(15, 0.6, 11), F.roof, 0, 8.8, 0);
      add(new T.BoxGeometry(0.4, 1.2, 10), F.glow, 8.2, 6, 0, false);
      for (const z of [-3, 3]) add(new T.CylinderGeometry(1.2, 1.2, 10, 12).rotateZ(Math.PI / 2), F.steel, -9, 1.5, z);
      add(new T.BoxGeometry(3, 5, 0.3), F.dark, -8.1, 2.5, 0, false);
    } else if (type === 'CANAL') {
      for (const s of [-1, 1]) { add(new T.BoxGeometry(47.6, 2.2, 1.4), F.stone, 0, 1.1, s * 5.3); add(new T.BoxGeometry(47.6, 0.3, 1.8), F.stoneDark, 0, 2.3, s * 5.3); }
      add(new T.BoxGeometry(47.6, 0.4, 9.2), F.stoneDark, 0, 0.2, 0);
      add(new T.BoxGeometry(47.6, 0.3, 9.2), F.water, 0, 1.5, 0, false);
      if (k % 2 === 0) for (const s of [-1, 1]) add(new T.CylinderGeometry(0.25, 0.25, 4, 6), F.white, 23, 4, s * 5.3);
    } else if (type === 'SIDE') {
      for (const s of [-1, 1]) add(new T.BoxGeometry(1, 1.6, 300), F.stone, s * 3, 0.8, 0);
      add(new T.BoxGeometry(5, 0.3, 300), F.stoneDark, 0, 0.15, 0);
      add(new T.BoxGeometry(5, 0.25, 300), F.water, 0, 1.05, 0, false);
      for (let z = -140; z <= 140; z += 70) add(new T.BoxGeometry(1.4, 2.4, 2), F.steel, 0, 1.4, z);
      if (k === 1) window.FARM.person(g, { kind: 'worker', seed: 8202, female: true }, 'kneelWork', -5, 0, 40, Math.PI / 2);
    }
  },
}));
