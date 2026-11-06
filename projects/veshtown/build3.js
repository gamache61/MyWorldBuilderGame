/* ============================================================
   THE TOWN ON VESH · BUILD 3 · THE MOON SPACEPORT
   Keep this file in projects/veshtown next to veshtown.html.
   Two round shuttle pads for the shuttles that will fly between
   Vesh and Unity, the port dome where travellers wait, and four
   beacon towers to guide the shuttles in.
   ============================================================ */
(window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(window.VESH.build({
  id: 3, name: 'THE MOON SPACEPORT',
  brief: 'Two shuttle pads for the shuttles between Vesh and Unity, the port dome where travellers wait, and four beacon towers to guide the shuttles in.',
  types: {
    SPAD:     { code: 'SF', name: 'SHUTTLE PAD', col: '#6c757d', w: 64, d: 64, h: 2 },
    PORTDOME: { code: 'HM', name: 'PORT DOME', col: '#8a5ad0', w: 44, d: 44, h: 20 },
    VBEACON:  { code: 'HP', name: 'BEACON TOWER', col: '#b03a2e', w: 6, d: 6, h: 30 },
  },
  order: ['SPAD', 'PORTDOME', 'VBEACON'],
  at: { SPAD: [[320, 220], [440, 220]], PORTDOME: [[380, 320]], VBEACON: [[280, 175], [480, 175], [280, 265], [480, 265]] },
  eye: [-220, 150, 240],
  stats(api, c) { return [['SHUTTLE PADS', c('SPAD') + ' / 2'], ['PORT DOME', c('PORTDOME') ? 'OPEN' : 'NOT YET'], ['BEACONS', c('VBEACON') + ' / 4']]; },
  make(type, k, g, add, F, api) {
    const T = api.THREE, V = window.VESH;
    if (type === 'SPAD') {
      add(new T.CylinderGeometry(32, 33, 1.6, 48), F.dark, 0, 0.8, 0);
      add(new T.TorusGeometry(26, 0.8, 6, 64).rotateX(Math.PI / 2), F.yellow, 0, 1.7, 0, false);
      add(new T.TorusGeometry(10, 0.6, 6, 48).rotateX(Math.PI / 2), F.yellow, 0, 1.7, 0, false);
      for (let i = 0; i < 16; i++) { const a = i / 16 * Math.PI * 2; add(new T.BoxGeometry(1.2, 0.5, 1.2), F.glow, Math.cos(a) * 30.5, 1.85, Math.sin(a) * 30.5, false); }
      for (let i = 0; i < 4; i++) { const a = i / 4 * Math.PI * 2; add(new T.BoxGeometry(14, 0.2, 2), F.white, Math.cos(a) * 18, 1.75, Math.sin(a) * 18, false).rotation.y = -a; }
    } else if (type === 'PORTDOME') {
      add(new T.CylinderGeometry(22, 23, 3, 40), F.panel, 0, 1.5, 0);
      add(new T.CylinderGeometry(21, 21, 0.6, 40), F.garden, 0, 3.2, 0);
      add(new T.SphereGeometry(21, 40, 16, 0, Math.PI * 2, 0, Math.PI / 2), F.glass, 0, 3, 0, false);
      for (let i = 0; i < 8; i++) { const r = new T.Mesh(new T.TorusGeometry(21, 0.35, 6, 32, Math.PI), F.white); r.position.y = 3; r.rotation.y = i / 8 * Math.PI; g.add(r); }
      add(new T.TorusGeometry(21.1, 0.6, 6, 48).rotateX(Math.PI / 2), F.gold, 0, 3, 0);
      for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2; add(new T.BoxGeometry(4, 1, 1.4), F.wood, Math.cos(a) * 12, 4, Math.sin(a) * 12); }
      add(new T.BoxGeometry(6, 5, 10), F.white, 0, 2.5, -24);
      for (let i = 0; i < 3; i++) V.person(g, V.civ(11300 + i), i === 1 ? 'gesture' : 'idle', -6 + i * 6, 3.5, 4, Math.PI);
    } else if (type === 'VBEACON') {
      add(new T.CylinderGeometry(2, 2.6, 2, 10), F.dark, 0, 1, 0);
      add(new T.CylinderGeometry(0.6, 0.9, 26, 8), F.steel, 0, 15, 0);
      add(new T.TorusGeometry(2, 0.3, 6, 16).rotateX(Math.PI / 2), F.glow, 0, 24, 0, false);
      const l = new T.Mesh(new T.SphereGeometry(1, 10, 8), new T.MeshBasicMaterial({ color: 0x40c0ff })); l.position.y = 29; l.userData.keep = true; g.add(l); api.blink(l, 1.4, 0x40c0ff);
    }
  },
}));
