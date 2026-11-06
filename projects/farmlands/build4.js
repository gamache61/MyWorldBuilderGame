/* ============================================================
   FARMLANDS OF UNITY · BUILD 4 · GREENHOUSES
   Keep this file in projects/farmlands next to farmlands.html.
   Six great glass greenhouses grow food all year round, and four
   solar arrays give the farm its own clean power.
   ============================================================ */
(window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(window.FARM.build({
  id: 4, name: 'GREENHOUSES',
  brief: 'Six glass greenhouses that grow food all year round, and four solar arrays that give the farm its own clean power.',
  types: {
    GREENHOUSE: { code: 'GD', name: 'GREENHOUSE', col: '#6aa84a', w: 80, d: 70, h: 14 },
    SOLAR: { code: 'SY', name: 'SOLAR ARRAY', col: '#2f4f8a', w: 50, d: 30, h: 4 },
  },
  order: ['GREENHOUSE', 'SOLAR'],
  at: {
    GREENHOUSE: [[340, 270], [440, 270], [540, 270], [340, -270], [440, -270], [540, -270]],
    SOLAR: [[640, 300], [640, 340], [700, 300], [700, 340]],
  },
  stats(api, c) { return [['GREENHOUSES', c('GREENHOUSE') + ' / 6'], ['UNDER GLASS', (c('GREENHOUSE') * 5600).toLocaleString() + ' m²'], ['SOLAR POWER', c('SOLAR') * 3 + ' MW']]; },
  make(type, k, g, add, F, api) {
    const T = api.THREE;
    if (type === 'GREENHOUSE') {
      add(new T.BoxGeometry(80, 0.8, 70), F.stoneDark, 0, 0.4, 0);
      // three glass barrel vaults side by side, with white ribs
      for (const x of [-26.5, 0, 26.5]) {
        add(new T.CylinderGeometry(13, 13, 66, 28, 1, true, Math.PI / 2, Math.PI).rotateX(Math.PI / 2), F.glass, x, 1.2, 0, false);
        for (let z = -33; z <= 33; z += 11) add(new T.TorusGeometry(13, 0.35, 6, 24, Math.PI), F.white, x, 1.2, z);
        add(new T.BoxGeometry(0.6, 0.6, 66), F.white, x, 14.2, 0);
        for (const s of [-1, 1]) for (let z = -28; z <= 28; z += 8) add(new T.BoxGeometry(7, 1.2, 6), F.crops[(k + Math.round(z / 8) + 20) % 5], x + s * 5, 1.4, z);
        for (const z of [-33, 33]) add(new T.CircleGeometry(13, 24, 0, Math.PI), F.glass, x, 1.2, z, false);
      }
      add(new T.BoxGeometry(6, 6, 0.4), F.white, 0, 3.8, 35.2);
      if (k === 1) window.FARM.person(g, window.FARM.civ(8401), 'tablet', 3, 0.8, 38, 0);
    } else if (type === 'SOLAR') {
      for (let i = 0; i < 4; i++) {
        const p = add(new T.BoxGeometry(46, 0.4, 6), F.solar, 0, 2.6, -10.5 + i * 7); p.rotation.x = -0.35;
        add(new T.BoxGeometry(46.4, 0.2, 0.3), F.white, 0, 2.95, -10.5 + i * 7 - 2.8);
        for (const x of [-20, 0, 20]) add(new T.CylinderGeometry(0.25, 0.25, 2.4, 6), F.steel, x, 1.2, -10.5 + i * 7);
      }
    }
  },
}));
