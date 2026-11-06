/* ============================================================
   THE RETURN FLEET · BUILD 2 · THE SPACEPORT
   Keep this file in projects/returnfleet next to returnfleet.html.
   Two great pads, each long enough for an Ark — the shipyard pad
   and the arrivals pad — with edge lights, light masts round them
   and the spaceport control tower between them.
   ============================================================ */
(window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(window.FLEET.build({
  id: 2, name: 'THE SPACEPORT',
  brief: 'Two great pads long enough for an Ark — the shipyard pad and the arrivals pad — with light masts round them and the control tower between.',
  types: {
    PAD:      { code: 'SF', name: 'ARK PAD', col: '#6c757d', w: 160, d: 480, h: 2 },
    TOWER:    { code: 'SY', name: 'CONTROL TOWER', col: '#e8e1d1', w: 24, d: 24, h: 74 },
    PADLIGHT: { code: 'HP', name: 'PAD LIGHT MAST', col: '#b03a2e', w: 4, d: 4, h: 40 },
  },
  order: ['PAD', 'TOWER', 'PADLIGHT'],
  at: {
    PAD: [[380, 0], [600, 0]],
    TOWER: [[490, -300]],
    PADLIGHT: [[300, -255], [460, -255], [520, -255], [680, -255], [300, 255], [460, 255], [520, 255], [680, 255]],
  },
  eye: [-260, 180, 320],
  stats(api, c) { return [['ARK PADS', c('PAD') + ' / 2'], ['CONTROL TOWER', c('TOWER') ? 'STAFFED' : 'NOT YET'], ['LIGHT MASTS', c('PADLIGHT') + ' / 8']]; },
  make(type, k, g, add, F, api) {
    const T = api.THREE, FL = window.FLEET;
    if (type === 'PAD') {
      add(new T.BoxGeometry(160, 1.6, 480), F.deck, 0, 0.8, 0);
      for (const [w, d, x, z] of [[160, 2, 0, 239], [160, 2, 0, -239], [2, 480, 79, 0], [2, 480, -79, 0]]) add(new T.BoxGeometry(w, 0.2, d), F.yellow, x, 1.7, z, false);
      add(new T.BoxGeometry(4, 0.15, 440), F.white, 0, 1.7, 0, false);
      for (let z = -200; z <= 200; z += 100) add(new T.BoxGeometry(60, 0.15, 3), F.white, 0, 1.7, z, false);
      for (let z = -230; z <= 230; z += 23) for (const s of [-1, 1]) add(new T.BoxGeometry(1.4, 0.6, 1.4), k ? F.lamp : F.glow, s * 77, 1.9, z, false);
      const sign = api.canvasTex(512, 128, (c, w, h) => { c.fillStyle = 'rgba(0,0,0,0)'; c.clearRect(0, 0, w, h); c.fillStyle = '#f2f2f2'; c.font = 'bold 84px Arial'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(k ? 'ARRIVALS' : 'SHIPYARD', w / 2, h / 2); });
      const sg = new T.Mesh(new T.PlaneGeometry(110, 27).rotateX(-Math.PI / 2), new T.MeshBasicMaterial({ map: sign, transparent: true })); sg.position.set(0, 1.75, 205); sg.rotation.z = 0; g.add(sg);
    } else if (type === 'TOWER') {
      add(new T.BoxGeometry(24, 4, 24), F.stoneDark, 0, 2, 0);
      add(new T.CylinderGeometry(5, 8, 56, 12), F.white, 0, 32, 0);
      add(new T.CylinderGeometry(13, 10, 10, 16), F.glass, 0, 64, 0, false);
      add(new T.CylinderGeometry(13.4, 13.4, 1, 16), F.gold, 0, 69.5, 0);
      add(new T.CylinderGeometry(13.2, 13.2, 1, 16), F.white, 0, 59, 0);
      add(new T.CylinderGeometry(0.4, 0.4, 12, 6), F.steel, 0, 76, 0);
      add(new T.SphereGeometry(1, 8, 6), F.eye, 0, 82.5, 0, false);
      add(new T.TorusGeometry(13.3, 0.4, 6, 32).rotateX(Math.PI / 2), F.glow, 0, 61, 0, false);
      FL.person(g, { kind: 'crew', seed: 9901, female: true, name: 'PORT', dept: '#2f6fb0', headset: true }, 'tablet', -14, 0, 4, -Math.PI / 2);
    } else if (type === 'PADLIGHT') {
      add(new T.CylinderGeometry(1.6, 2, 2, 10), F.dark, 0, 1, 0);
      add(new T.CylinderGeometry(0.6, 0.9, 36, 8), F.steel, 0, 20, 0);
      add(new T.BoxGeometry(5, 1.2, 2.4), F.lamp, 0, 38, 0, false);
      const red = new T.Mesh(new T.SphereGeometry(0.7, 8, 6), new T.MeshBasicMaterial({ color: 0xff3020 })); red.position.y = 39.6; red.userData.keep = true; g.add(red); api.blink(red, 1.6, 0xff3020);
    }
  },
}));
