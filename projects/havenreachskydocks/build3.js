/* ============================================================
   THE HAVENREACH SKY DOCKS · BUILD 3 · THE REPAIR HANGARS & FUEL BAYS
   Keep this file in projects/havenreachskydocks next to 48-havenreachskydocks.html.
   Four big hangars where visiting ships are mended, and two fuel
   bays. Glowing fuel crystals are fed down from the Heartforge to
   fill each ship's tanks.
   ============================================================ */
(function () {
  const P = window.YARD;
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 3, name: 'THE REPAIR HANGARS & FUEL BAYS',
    brief: 'Four big hangars where visiting ships are repaired, and two fuel bays where glowing fuel crystals from the Heartforge fill the ships’ tanks.',
    types: {
      HANGAR: { code: 'SY', name: 'REPAIR HANGAR', col: '#e8e1d1', w: 90, d: 70, h: 34 },
      FUELBAY: { code: 'FL', name: 'FUEL BAY', col: '#d9731b', w: 40, d: 60, h: 26 },
    },
    order: ['HANGAR', 'FUELBAY'],
    at: { HANGAR: [[-200, -300], [-200, 300], [440, -300], [440, 300]], FUELBAY: [[-250, 0], [490, 0]] },
    eye: [120, 240, 420],
    stats(api, c) { return [['REPAIR HANGARS', c('HANGAR') + ' / 4'], ['FUEL BAYS', c('FUELBAY') + ' / 2']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, S = P.hm(api), C = P.fun(api);
      const cr = P._cry = P._cry || [0x7ffcff, 0x9f7bff, 0x6dffb0].map(c => new T.MeshStandardMaterial({ color: c, emissive: c, emissiveIntensity: 1.4, roughness: 0.25, transparent: true, opacity: 0.92 }));
      if (type === 'HANGAR') {
        const toward = sl.x < 120 ? 1 : -1;   // the big door faces the middle of the deck
        add(new T.BoxGeometry(92, 1, 72), S.gravel, 0, 0.5, 0);
        add(new T.BoxGeometry(80, 24, 58), F.white, 0, 12.5, 0);
        const roof = add(new T.CylinderGeometry(30, 30, 82, 3, 1).rotateZ(Math.PI / 2), S.slate, 0, 27, 0); roof.scale.set(1, 0.38, 1.8);
        add(new T.BoxGeometry(1, 20, 46), F.dark, toward * 40.4, 11, 0); add(new T.BoxGeometry(1.4, 2, 48), C.yellow, toward * 40.6, 21.5, 0);
        for (const z of [-10, 10]) add(new T.BoxGeometry(0.6, 20, 0.6), F.steel, toward * 40.8, 11, z);
        add(new T.BoxGeometry(40, 3, 3), C.yellow, 0, 24.6, 20); add(new T.BoxGeometry(2, 6, 2), F.steel, -20, 22, 20); add(new T.BoxGeometry(2, 6, 2), F.steel, 20, 22, 20);
        P.sign(api, g, 'REPAIR HANGAR ' + (k + 1), 22, 3.4, toward * 41.2, 24.5, 0, toward * Math.PI / 2, '#3a2a14', '#ffe9b0', false);
      } else {
        // three glowing fuel tanks, a pipe to the hangars and a pad for the fuel tugs
        add(new T.BoxGeometry(42, 1, 62), S.gravel, 0, 0.5, 0);
        for (const z of [-18, 0, 18]) { add(new T.CylinderGeometry(7, 7, 20, 20), F.white, 0, 11, z); add(new T.CylinderGeometry(7.2, 7.2, 1.2, 20), C.yellow, 0, 21.4, z); add(new T.CylinderGeometry(5.4, 5.4, 12, 20), cr[(z / 18 + 1 + k) % 3 | 0], 0, 11, z).castShadow = false; }
        for (let i = 0; i < 8; i++) { const a = i * 2.2 + k, c = add(new T.OctahedronGeometry(1.4 + (i % 3) * 0.6), cr[i % 3], 16 + Math.cos(a) * 2.5, 2.2 + (i % 3), -22 + i * 6); c.scale.set(0.7, 1.9, 0.7); c.rotation.y = a; c.castShadow = false; }
        add(new T.CylinderGeometry(1.2, 1.2, 60, 8).rotateX(Math.PI / 2), F.steel, -12, 6, 0);
        P.sign(api, g, 'FUEL BAY ' + (k + 1) + ' · HEARTFORGE', 22, 3, 0, 26, 0, Math.PI / 2, '#14324a', '#ffd9a0', true);
      }
    },
  }));
})();
