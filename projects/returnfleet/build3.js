/* ============================================================
   THE RETURN FLEET · BUILD 3 · THE WELCOME TERMINAL
   Keep this file in projects/returnfleet next to returnfleet.html.
   The glass terminal where families from Earth will step onto
   Unity for the first time, covered gangways out to both pads,
   and two welcome gardens beside it.
   ============================================================ */
(window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(window.FLEET.build({
  id: 3, name: 'THE WELCOME TERMINAL',
  brief: 'The glass terminal where families from Earth will step onto Unity for the first time, covered gangways out to both pads, and two welcome gardens.',
  types: {
    TERMINAL: { code: 'SY', name: 'WELCOME TERMINAL', col: '#e8e1d1', w: 200, d: 60, h: 24 },
    GANGWAY:  { code: 'SF', name: 'COVERED GANGWAY', col: '#6c757d', w: 12, d: 50, h: 10 },
    GARDEN:   { code: 'GD', name: 'WELCOME GARDEN', col: '#3a7d44', w: 56, d: 56, h: 10 },
  },
  order: ['TERMINAL', 'GANGWAY', 'GARDEN'],
  at: { TERMINAL: [[490, 330]], GANGWAY: [[380, 272], [600, 272]], GARDEN: [[352, 335], [628, 335]] },
  eye: [-200, 140, 260],
  stats(api, c) { return [['TERMINAL', c('TERMINAL') ? 'OPEN' : 'NOT YET'], ['GANGWAYS', c('GANGWAY') + ' / 2'], ['WELCOME GARDENS', c('GARDEN') + ' / 2'], ['ARRIVALS A DAY', c('TERMINAL') ? '40,000' : '—']]; },
  make(type, k, g, add, F, api) {
    const T = api.THREE, FL = window.FLEET;
    if (type === 'TERMINAL') {
      add(new T.BoxGeometry(200, 1.4, 60), F.stoneDark, 0, 0.7, 0);
      add(new T.BoxGeometry(196, 16, 56), F.glass, 0, 9.4, 0, false);
      for (let x = -96; x <= 96; x += 12) add(new T.BoxGeometry(1, 16, 56.4), F.white, x, 9.4, 0);
      // a long curved roof with a garden on top, and the WELCOME sign
      add(new T.CylinderGeometry(34, 34, 204, 32, 1, false, Math.PI / 2 - 0.55, 1.1).rotateZ(Math.PI / 2), F.white, 0, -12, 0);
      add(new T.BoxGeometry(180, 0.6, 30), F.roof, 0, 22.4, 0);
      for (let x = -80; x <= 80; x += 20) add(new T.IcosahedronGeometry(3, 0), F.crops[2], x, 25, (x / 20) % 2 ? 6 : -6);
      const sign = api.canvasTex(1024, 128, (c, w, h) => { c.fillStyle = '#12233a'; c.fillRect(0, 0, w, h); c.fillStyle = '#ffd060'; c.font = 'bold 78px Arial'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('WELCOME HOME TO UNITY', w / 2, h / 2 + 3); });
      const sg = new T.Mesh(new T.PlaneGeometry(120, 15), new T.MeshBasicMaterial({ map: sign })); sg.position.set(0, 20, -30.4); sg.rotation.y = Math.PI; g.add(sg);
      for (let i = 0; i < 6; i++) add(new T.BoxGeometry(10, 8, 0.4), F.dark, -75 + i * 30, 5, -28.4, false);
      for (let i = 0; i < 6; i++) FL.person(g, FL.civ(9910 + i), i % 3 ? 'idle' : 'gesture', -60 + i * 22, 1.4, -6 + (i % 2) * 8, Math.PI);
    } else if (type === 'GANGWAY') {
      add(new T.BoxGeometry(12, 1, 52), F.stone, 0, 4, 0);
      add(new T.CylinderGeometry(6, 6, 52, 16, 1, true, Math.PI / 2, Math.PI).rotateX(Math.PI / 2), F.glass, 0, 4.5, 0, false);
      for (let z = -24; z <= 24; z += 8) add(new T.TorusGeometry(6.05, 0.3, 6, 16, Math.PI), F.white, 0, 4.5, z);
      for (const z of [-20, 0, 20]) for (const s of [-1, 1]) add(new T.BoxGeometry(0.8, 4, 0.8), F.steel, s * 5, 2, z);
    } else if (type === 'GARDEN') {
      add(new T.CylinderGeometry(27, 28, 1, 40), F.stone, 0, 0.5, 0);
      add(new T.CylinderGeometry(25, 25, 0.6, 40), F.roof, 0, 1.2, 0);
      add(new T.CylinderGeometry(6, 7, 1.6, 24), F.stone, 0, 1.8, 0);
      add(new T.CylinderGeometry(5.4, 5.4, 0.3, 24), F.water, 0, 2.5, 0, false);
      add(new T.CylinderGeometry(0.6, 0.8, 4, 10), F.white, 0, 4, 0);
      for (let i = 0; i < 10; i++) { const a = i / 10 * Math.PI * 2, r = 16 + (i % 2) * 4; add(new T.CylinderGeometry(0.5, 0.7, 4, 6), F.wood, Math.cos(a) * r, 3.4, Math.sin(a) * r); add(new T.IcosahedronGeometry(3.4, 0), F.crops[i % 5], Math.cos(a) * r, 7, Math.sin(a) * r); }
      for (let i = 0; i < 16; i++) { const a = i / 16 * Math.PI * 2; add(new T.SphereGeometry(0.6, 6, 4), i % 2 ? F.flower : F.berry, Math.cos(a) * 9, 1.8, Math.sin(a) * 9, false); }
      FL.person(g, FL.civ(9930 + k), 'idle', 9, 1.5, 4, k);
    }
  },
}));
