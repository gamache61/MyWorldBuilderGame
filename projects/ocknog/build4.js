/* ============================================================
   OCKNOG · BUILD 4 · THE SOIL LAB & THE DUST TANKS
   Keep this file in projects/ocknog next to 70-ocknog.html.
   The scientists test the poisoned soil, find what is wrong with it, mix the cure, and prove it on three small test beds.
   ============================================================ */
(function () {
  const P = window.OKP;
  const rel = a => a.map(([x, z]) => [1550 + x, z]);
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 4, name: 'THE SOIL LAB & THE DUST TANKS',
    brief: 'The scientists test the soil: a big soil lab with an analyser, four tanks where the cure is mixed, and three glass test beds where the healed soil grows green plants.',
    types: {
      LAB: { code: 'SY', name: 'SOIL LAB', col: '#f4f2ec', w: 60, d: 40, h: 20 },
      TANK: { code: 'WT', name: 'CURE TANK', col: '#dfe6ea', w: 16, d: 16, h: 26 },
      BED: { code: 'GD', name: 'TEST BED', col: '#7ac24a', w: 26, d: 18, h: 8 },
    },
    order: ['LAB', 'TANK', 'BED'],
    at: { LAB: rel([[150, -195]]), TANK: rel([[-100, -215], [-60, -215], [-20, -215], [20, -215]]), BED: rel([[-100, 215], [-60, 215], [-20, 215]]) },
    eye: [1550 - 40, P.SY + 100, -90],
    stats(api, c) { return [['SOIL LAB', c('LAB') ? 'OPEN' : 'NOT YET'], ['CURE TANKS', c('TANK') + ' / 4'], ['TEST BEDS', c('BED') + ' / 3'], ['SOIL TEST', c('LAB') && c('BED') > 2 ? 'THE DUST CAN BE MENDED' : 'WAITING']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, H = P.ok(api);
      if (type === 'LAB') {
        add(new T.BoxGeometry(60, 1, 40), H.stone, 0, 0.5, 0);
        add(new T.BoxGeometry(54, 14, 34), H.white, 0, 8, 0);
        add(new T.BoxGeometry(56, 0.8, 36), H.steel, 0, 15.4, 0);
        for (const x of [-18, -6, 6, 18]) add(new T.BoxGeometry(5, 5, 0.5), H.screen, x, 9, 17.3, false);
        add(new T.BoxGeometry(8, 9, 0.5), H.dark, 0, 5.5, 17.4, false);
        for (let i = 0; i < 3; i++) add(new T.BoxGeometry(14, 0.4, 6), H.solar, -16 + i * 16, 16.2, 0, false).rotation.z = 0.15;
        const an = add(new T.CylinderGeometry(3, 3, 6, 14), H.steel, 20, 18.4, 8); add(new T.SphereGeometry(1.4, 10, 8), H.cure, 20, 22, 8, false);
        P.sign(api, g, 'SOIL LAB · UNITY SCIENCE PARTY', 26, 2.4, 0, 12.5, 17.8, 0, '#13333a', '#bff8d0');
        for (let i = 0; i < 4; i++) P.person(g, P.civ(70600 + i), i % 2 ? 'tablet' : 'idle', -12 + i * 8, 1, 22, Math.PI);
        P.alien(api, g, 22, 1, 22, Math.PI, { seed: 4, scale: 0.9 });
      } else if (type === 'TANK') {
        add(new T.CylinderGeometry(8.5, 9, 1, 16), H.stone, 0, 0.5, 0);
        add(new T.CylinderGeometry(7.2, 7.2, 22, 18), H.tank, 0, 12, 0);
        add(new T.SphereGeometry(7.2, 18, 8, 0, Math.PI * 2, 0, Math.PI / 2), H.tank, 0, 23, 0);
        for (const y of [6, 12, 18]) add(new T.TorusGeometry(7.3, 0.25, 6, 20), H.steel, 0, y, 0, false).rotation.x = Math.PI / 2;
        add(new T.BoxGeometry(1.4, 12, 0.5), H.cure, 6.6, 12, 3.6, false);
        add(new T.CylinderGeometry(0.7, 0.7, 14, 8), H.pipe, 0, 7, -9).rotation.x = Math.PI / 2;
        P.sign(api, g, 'CURE · ' + (k + 1), 6, 1.2, 0, 3, 7.5, 0, '#13333a', '#7affc8');
      } else {
        add(new T.BoxGeometry(26, 1.4, 18), H.stone, 0, 0.7, 0);
        add(new T.BoxGeometry(24, 1.6, 16), H.dust2, 0, 1.6, 0);
        let s = 5 + k; const r = () => (s = (s * 16807) % 2147483647) / 2147483647;
        for (let i = 0; i < 40; i++) { const h = 1.4 + r() * 2.4, pl = add(new T.ConeGeometry(0.5, h, 5), r() < 0.5 ? H.crop : H.crop2, (r() - 0.5) * 22, 2.4 + h / 2, (r() - 0.5) * 14, false); pl.rotation.z = (r() - 0.5) * 0.4; }
        add(new T.BoxGeometry(26, 6, 18), H.glass, 0, 5, 0, false);
        add(new T.BoxGeometry(26.4, 0.4, 18.4), H.steel, 0, 8, 0, false);
        P.alien(api, g, 0, 1.6, 13, Math.PI, { seed: 20 + k, mode: 'cheer', scale: 0.8 });
      }
    },
  }));
})();
