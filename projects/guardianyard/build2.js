/* ============================================================
   THE GUARDIAN YARD · BUILD 2 · THE SHIELD TOWERS
   Keep this file in projects/guardianyard next to 52-guardianyard.html.
   Four tall shield towers around the yard. Each one carries a crystal
   emitter that, together, can raise a glowing shield over the whole
   of Unity. They are for keeping people safe, not for starting fights.
   ============================================================ */
(function () {
  const P = window.YARD;
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 2, name: 'THE SHIELD TOWERS',
    brief: 'Four tall shield towers with crystal emitters that can raise a glowing shield over all of Unity.',
    types: { SHIELDTOWER: { code: 'HP', name: 'SHIELD TOWER', col: '#cfd6dd', w: 24, d: 24, h: 130 } },
    order: ['SHIELDTOWER'],
    at: { SHIELDTOWER: [[1250, -230], [1250, 230], [1850, -230], [1850, 230]] },
    eye: [1000, 190, 420],
    stats(api, c) { return [['SHIELD TOWERS', c('SHIELDTOWER') + ' / 4']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, S = P.hm(api), C = P.fun(api);
      const cry = P._cry = P._cry || [0x7ffcff, 0x9f7bff, 0x6dffb0].map(c => new T.MeshStandardMaterial({ color: c, emissive: c, emissiveIntensity: 1.4, roughness: 0.25, transparent: true, opacity: 0.92 }));
      add(new T.CylinderGeometry(15, 17, 3, 20), S.stone, 0, 1.5, 0);
      add(new T.CylinderGeometry(5.5, 8, 80, 16), F.white, 0, 42, 0);
      for (const y of [18, 40, 62]) add(new T.CylinderGeometry(8.4 - y * 0.03, 8.4 - y * 0.03, 1.6, 16), C.yellow, 0, y, 0);
      for (let i = 0; i < 4; i++) { const a = i / 4 * Math.PI * 2 + 0.78; const f = add(new T.BoxGeometry(1.6, 44, 9), F.steel, Math.cos(a) * 9, 24, Math.sin(a) * 9); f.rotation.y = -a; }
      add(new T.CylinderGeometry(9, 5.5, 8, 16), F.dark, 0, 86, 0);
      const em = add(new T.OctahedronGeometry(9), cry[k % 3], 0, 102, 0); em.scale.set(0.9, 1.7, 0.9); em.castShadow = false;
      for (const r of [14, 19]) { const ring = add(new T.TorusGeometry(r, 0.5, 8, 40), cry[(k + 1) % 3], 0, 102, 0); ring.rotation.x = Math.PI / 2 + (r > 15 ? 0.35 : -0.2); ring.castShadow = false; }
      add(new T.BoxGeometry(10, 5, 8), S.slate, 13, 3, 0); add(new T.BoxGeometry(3, 3.4, 0.4), S.glass, 13, 3.4, 4.2);
      P.person(g, P.civ(52100 + k), 'tablet', 18, 1.5, 6, Math.PI);
    },
  }));
})();
