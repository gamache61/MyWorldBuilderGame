/* ============================================================
   THE MOON MINES · BUILD 2 · HABITAT DOMES
   Keep this file in projects/moonmines next to moonmines.html.
   A central hub, twenty great glass habitat domes where the 250
   miners' families live in terraced homes round a garden, the tubes
   that join them, and two solar fields.
   Everything is beamed in by the transporter (T).
   ============================================================ */
(window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(window.MOON.build({
  id: 2, name: 'HABITAT DOMES',
  brief: 'A central hub and twenty great glass habitat domes where the 250 miners\u2019 families live in terraced homes round a garden, the tubes that join them, and two solar fields.',
  types: {
    HUB:    { code: 'SY', name: 'HABITAT HUB', col: '#e8e1d1', w: 34, d: 34, h: 26 },
    HAB:    { code: 'HM', name: 'HABITAT DOME', col: '#8a5ad0', w: 60, d: 60, h: 32 },
    HABX:   { code: 'HM', name: 'HABITAT DOME', col: '#8a5ad0', w: 60, d: 60, h: 32 },
    TUBE:   { code: 'SF', name: 'CONNECTING TUBE', col: '#6c757d', w: 30, d: 9, h: 9 },
    SOLARM: { code: 'SY', name: 'SOLAR FIELD', col: '#2f4f8a', w: 60, d: 40, h: 5 },
  },
  order: ['HUB', 'HAB', 'TUBE', 'SOLARM', 'HABX'],
  at: {
    HUB: [[320, 220]],
    HAB: [[250, 220], [390, 220], [320, 150], [320, 290]],
    TUBE: [[285, 220], [355, 220], [320, 185], [320, 255]],
    SOLARM: [[680, 280], [680, 170]],
    // sixteen more domes on the same 70 m grid round the hub
    HABX: [[250, 150], [390, 150], [460, 150], [530, 150], [460, 220], [530, 220], [600, 220], [250, 290], [390, 290], [460, 290], [530, 290], [250, 360], [320, 360], [390, 360], [460, 360], [530, 360]],
  },
  stats(api, c) { return [['HUB', c('HUB') ? 'PRESSURISED' : 'NOT YET'], ['HABITAT DOMES', (c('HAB') + c('HABX')) + ' / 20'], ['TUBES', c('TUBE') + ' / 4'], ['FAMILIES HOUSED', Math.round((c('HAB') + c('HABX')) * 12.5)], ['SOLAR POWER', c('SOLARM') * 8 + ' MW']]; },
  make(type, k, g, add, F, api, sl) {
    const T = api.THREE, MOON = window.MOON;
    if (type === 'HUB') {
      add(new T.CylinderGeometry(17, 18, 3, 32), F.panel, 0, 1.5, 0);
      add(new T.CylinderGeometry(14, 15, 10, 32), F.white, 0, 8, 0);
      add(new T.CylinderGeometry(14.1, 14.1, 1.6, 32, 1, true), F.window, 0, 9, 0, false);
      add(new T.SphereGeometry(14, 32, 14, 0, Math.PI * 2, 0, Math.PI / 2), F.white, 0, 13, 0);
      add(new T.CylinderGeometry(0.4, 0.4, 12, 8), F.steel, 0, 32, 0);
      add(new T.SphereGeometry(1, 10, 8), F.eye, 0, 38.5, 0, false);
      for (let i = 0; i < 4; i++) { const a = i / 4 * Math.PI * 2; add(new T.BoxGeometry(5, 7, 5), F.foil, Math.cos(a) * 15.5, 3.5, Math.sin(a) * 15.5); }
      MOON.person(g, { kind: 'astro', seed: 9201, stripe: '#c83a2e' }, 'tablet', -20, 0, 6, -Math.PI / 2);
    } else if (type === 'HAB' || type === 'HABX') {
      const R = 28, Y = 3.5, me = [sl.x, sl.z];
      add(new T.CylinderGeometry(R + 1, R + 2, 3, 48), F.panel, 0, 1.5, 0);
      add(new T.CylinderGeometry(R - 0.5, R - 0.5, 0.6, 48), F.garden, 0, 3.2, 0);
      add(new T.SphereGeometry(R, 48, 18, 0, Math.PI * 2, 0, Math.PI / 2), F.glass, 0, 3, 0, false);
      for (let i = 0; i < 10; i++) { const m = new T.Mesh(new T.TorusGeometry(R, 0.4, 6, 36, Math.PI), F.white); m.position.y = 3; m.rotation.y = i / 10 * Math.PI; g.add(m); }
      add(new T.TorusGeometry(R + 0.1, 0.7, 6, 56).rotateX(Math.PI / 2), F.gold, 0, 3, 0);
      // a ring of terraced homes, three storeys stepping down to the garden: thirteen family homes and a few spare flats
      const N = 16, floors = [[11, 22, 0], [13, 21, 3.4], [15, 20, 6.8]];
      for (let b = 0; b < N; b++) {
        if (b === 0) continue;   // a gap in the ring: the way in from the tubes
        const a = b / N * Math.PI * 2 + 0.2, h = new T.Group(); h.rotation.y = -a; g.add(h);
        floors.forEach(([r0, r1, y], f) => {
          const rm = (r0 + r1) / 2, wd = 2 * Math.PI * r0 / N * 0.94;
          add(new T.BoxGeometry(r1 - r0, 3.2, wd + (r1 - r0) * 0.25), f % 2 ? F.panel : F.white, rm, Y + y + 1.6, 0, true, h);
          add(new T.BoxGeometry(1.6, 0.25, wd), F.garden, r0 - 0.8 + (f ? 0 : 0), Y + y + 3.35, 0, false, h);
          add(new T.BoxGeometry(0.1, 1.3, wd * 0.6), F.window, r0 - 0.06, Y + y + 1.9, 0, false, h);
          if (f === 0) add(new T.BoxGeometry(0.12, 2.2, 1), F.wood, r0 - 0.07, Y + 1.1, wd * 0.3, false, h);
        });
        add(new T.BoxGeometry(4, 0.4, 2 * Math.PI * 15 / N), F.garden, 17.5, Y + 10.4, 0, false, h);
      }
      // the garden in the middle: a path, trees, a pond and a play area
      add(new T.RingGeometry(7.5, 9.5, 40).rotateX(-Math.PI / 2), F.stone, 0, Y + 0.02, 0, false);
      add(new T.CylinderGeometry(3.5, 3.5, 0.3, 24), F.water, 0, Y + 0.05, 0, false);
      for (let i = 0; i < 7; i++) { const a = i / 7 * Math.PI * 2 + 0.4, rr = 5.5; add(new T.CylinderGeometry(0.3, 0.4, 3, 6), F.dark, Math.cos(a) * rr, Y + 1.5, Math.sin(a) * rr); add(new T.IcosahedronGeometry(1.8, 0), F.garden, Math.cos(a) * rr, Y + 3.8, Math.sin(a) * rr); }
      // tubes to the next domes on the grid (the tubes to the hub are their own parts)
      const all = [[250, 220], [390, 220], [320, 150], [320, 290], [250, 150], [390, 150], [460, 150], [530, 150], [460, 220], [530, 220], [600, 220], [250, 290], [390, 290], [460, 290], [530, 290], [250, 360], [320, 360], [390, 360], [460, 360], [530, 360]];
      const there = (x, z) => all.some(p => p[0] === x && p[1] === z);
      for (const [dx, dz] of [[70, 0], [0, 70]]) if (there(me[0] + dx, me[1] + dz)) {
        const L = 20, cx = dx / 2, cz = dz / 2, tube = new T.CylinderGeometry(4, 4, L, 20, 1, true);
        if (dx) tube.rotateZ(Math.PI / 2); else tube.rotateX(Math.PI / 2);
        add(tube, F.white, cx, 6, cz);
        for (let s = -L / 2 + 2; s <= L / 2 - 2; s += 5) { const ring = new T.TorusGeometry(4.15, 0.35, 6, 24); if (dx) ring.rotateY(Math.PI / 2); add(ring, F.gold, dx ? cx + s : 0, 6, dz ? cz + s : 0); }
      }
      MOON.person(g, MOON.civ(9210 + k * 3 + (type === 'HABX' ? 40 : 0)), 'walk', 8.5, Y, 0, 0, { path: { type: 'circle', cx: 0, cz: 0, r: 8.5, speed: 0.9 } });
      if (k % 2 === 0) MOON.person(g, MOON.civ(9211 + k * 3 + (type === 'HABX' ? 40 : 0)), 'idle', -6, Y, 4, k);
    } else if (type === 'TUBE') {
      const along = sl.z === 220 ? 'x' : 'z', L = 30;
      const tube = new T.CylinderGeometry(4, 4, L, 20, 1, true), ribs = [];
      if (along === 'x') tube.rotateZ(Math.PI / 2); else tube.rotateX(Math.PI / 2);
      add(tube, F.white, 0, 6, 0);
      for (let s = -L / 2 + 2; s <= L / 2 - 2; s += 5) { const r = new T.TorusGeometry(4.15, 0.35, 6, 24); if (along === 'x') r.rotateY(Math.PI / 2); add(r, F.gold, along === 'x' ? s : 0, 6, along === 'x' ? 0 : s); }
      for (const s of [-1, 1]) { const w = new T.BoxGeometry(along === 'x' ? L - 2 : 0.2, 1, along === 'x' ? 0.2 : L - 2); add(w, F.window, along === 'x' ? 0 : s * 4.05, 7, along === 'x' ? s * 4.05 : 0, false); }
      for (const s of [-6, 6]) add(new T.BoxGeometry(2, 2, 2), F.steel, along === 'x' ? s : 0, 1, along === 'x' ? 0 : s);
    } else if (type === 'SOLARM') {
      for (let i = 0; i < 4; i++) {
        const p = add(new T.BoxGeometry(56, 0.4, 7.5), F.solar, 0, 3, -13.5 + i * 9); p.rotation.x = -0.5;
        add(new T.BoxGeometry(56.4, 0.2, 0.3), F.white, 0, 3.6, -13.5 + i * 9 - 3.4);
        for (const x of [-24, 0, 24]) add(new T.CylinderGeometry(0.3, 0.3, 3, 6), F.steel, x, 1.5, -13.5 + i * 9);
      }
    }
  },
}));
