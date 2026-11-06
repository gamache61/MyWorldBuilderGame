/* ============================================================
   THE HOMEWARD FLEET · BUILD 3 · CRANES, FUEL & THE FLEET TERMINAL
   Keep this file in projects/homewardfleet next to homewardfleet.html.
   Six bridge cranes, two over each berth, six fuel tanks for the
   long voyage, and the fleet terminal where thousands of families
   will step onto Unity when the fleet comes home.
   ============================================================ */
(window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(window.FLEET.build({
  id: 3, name: 'CRANES, FUEL & THE FLEET TERMINAL',
  brief: 'Six bridge cranes, two over each berth, six fuel tanks for the long voyage, and the fleet terminal where thousands of families will step onto Unity.',
  types: {
    YARDCRANE: { code: 'HP', name: 'BRIDGE CRANE', col: '#d9a21b', w: 176, d: 14, h: 10 },
    FUEL:      { code: 'FL', name: 'FUEL TANK', col: '#d9731b', w: 18, d: 18, h: 26 },
    FTERMINAL: { code: 'SY', name: 'FLEET TERMINAL', col: '#e8e1d1', w: 420, d: 50, h: 26 },
  },
  order: ['YARDCRANE', 'FUEL', 'FTERMINAL'],
  at: {
    YARDCRANE: [[380, -90], [380, 90], [560, -90], [560, 90], [740, -90], [740, 90]],
    FUEL: [[905, -200], [905, -120], [905, -40], [905, 40], [905, 120], [905, 200]],
    FTERMINAL: [[560, 345]],
  },
  eye: [-280, 220, 400],
  stats(api, c) { return [['BRIDGE CRANES', c('YARDCRANE') + ' / 6'], ['FUEL TANKS', c('FUEL') + ' / 6'], ['FLEET TERMINAL', c('FTERMINAL') ? 'OPEN' : 'NOT YET']]; },
  make(type, k, g, add, F, api) {
    const T = api.THREE, FL = window.FLEET;
    if (type === 'YARDCRANE') {
      // a bridge across the berth, high above the hull, with a trolley and a short hook
      add(new T.BoxGeometry(176, 6, 8), F.yellow, 0, 88, 0);
      for (const s of [-1, 1]) { add(new T.BoxGeometry(8, 8, 12), F.armor, s * 88, 88, 0); add(new T.CylinderGeometry(1.4, 1.4, 3, 10).rotateZ(Math.PI / 2), F.dark, s * 90, 93.6, 0); }
      const tx = k % 2 ? 30 : -20;
      add(new T.BoxGeometry(14, 5, 10), F.dark, tx, 83, 0);
      add(new T.CylinderGeometry(0.3, 0.3, 12, 6), F.steel, tx, 75, 0);
      add(new T.BoxGeometry(6, 2, 6), F.yellow, tx, 68, 0);
      add(new T.BoxGeometry(176, 0.4, 0.4), F.glow, 0, 84.8, 4.2, false);
    } else if (type === 'FUEL') {
      add(new T.CylinderGeometry(9, 9, 2, 24), F.stoneDark, 0, 1, 0);
      add(new T.CylinderGeometry(8, 8, 20, 24), F.white, 0, 12, 0);
      add(new T.SphereGeometry(8, 24, 10, 0, Math.PI * 2, 0, Math.PI / 2), F.white, 0, 22, 0);
      for (const y of [6, 12, 18]) add(new T.TorusGeometry(8.1, 0.3, 6, 32).rotateX(Math.PI / 2), F.yellow, 0, y, 0);
      add(new T.BoxGeometry(70, 1.4, 1.4), F.steel, -44, 4, 0);
    } else if (type === 'FTERMINAL') {
      // a long glass hall facing the three berths, with a door opposite each one
      add(new T.BoxGeometry(420, 3, 50), F.stoneDark, 0, 1.5, 0);
      add(new T.BoxGeometry(416, 18, 44), F.glass, 0, 12, 0, false);
      add(new T.BoxGeometry(418, 2, 46), F.white, 0, 22, 0);
      add(new T.BoxGeometry(410, 0.6, 40), F.stone, 0, 3.3, 0);
      for (let x = -200; x <= 200; x += 20) add(new T.BoxGeometry(1.2, 18, 1.2), F.white, x, 12, -22.4);
      const roof = new T.CylinderGeometry(25, 25, 418, 24, 1, false, 0, Math.PI).rotateZ(Math.PI / 2); roof.scale(1, 0.3, 1); add(roof, F.glass, 0, 23, 0, false);
      for (const x of [-180, 0, 180]) { add(new T.BoxGeometry(16, 10, 2), F.lamp, x, 8, -23.2, false); add(new T.BoxGeometry(18, 1.4, 6), F.gold, x, 14, -25); }
      const sign = api.canvasTex(1024, 128, (c, w, h) => { c.fillStyle = '#12233a'; c.fillRect(0, 0, w, h); c.fillStyle = '#ffd060'; c.font = 'bold 80px Arial'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('WELCOME HOME TO UNITY', w / 2, h / 2 + 3); });
      const m = new T.Mesh(new T.PlaneGeometry(90, 9), new T.MeshBasicMaterial({ map: sign })); m.position.set(0, 27, -23.5); m.rotation.y = Math.PI; g.add(m);
      for (let i = 0; i < 10; i++) { const x = -160 + i * 36; add(new T.BoxGeometry(8, 1, 2.4), F.wood, x, 4.3, 8); add(new T.IcosahedronGeometry(2.2, 0), F.flower, x + 12, 6, 12); }
      for (let i = 0; i < 6; i++) FL.person(g, FL.civ(12100 + i), i % 2 ? 'idle' : 'walk', -100 + i * 40, 3.6, 0, 0, i % 2 ? undefined : { path: { type: 'line', ax: -150 + i * 40, az: -6, bx: -80 + i * 40, bz: 6, speed: 1 } });
    }
  },
}));
