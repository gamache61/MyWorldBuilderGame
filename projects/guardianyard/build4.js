/* ============================================================
   THE GUARDIAN YARD · BUILD 4 · THE GUARD SHIPS & THE SHIELD HEART
   Keep this file in projects/guardianyard next to 52-guardianyard.html.
   Three guard ships on the launch apron — built to turn trouble away,
   to shield and to rescue — and the shield heart, a great crystal that
   feeds the four towers.
   ============================================================ */
(function () {
  const P = window.YARD;
  // one shape for every guard ship (also used by the opening-day flight in build 5). The nose points along +z.
  P.gship = function (api, add, parent, x, y, z, ry = 0, s = 1) {
    const T = api.THREE, F = P.mats(api), S = P.hm(api), g = new T.Group(); g.position.set(x, y, z); g.rotation.y = ry; g.scale.setScalar(s); parent.add(g);
    const cry = P._cry = P._cry || [0x7ffcff, 0x9f7bff, 0x6dffb0].map(c => new T.MeshStandardMaterial({ color: c, emissive: c, emissiveIntensity: 1.4, roughness: 0.25, transparent: true, opacity: 0.92 }));
    const a = (geo, m, X, Y, Z, sh = true) => add(geo, m, X, Y, Z, sh, g);
    const hull = P._gsM = P._gsM || new T.MeshStandardMaterial({ color: 0xdfe5ea, roughness: 0.4, metalness: 0.3 });
    const trim = P._gsT = P._gsT || new T.MeshStandardMaterial({ color: 0xd9a21b, roughness: 0.5 });
    const body = a(new T.CapsuleGeometry(2.6, 14, 6, 14).rotateX(Math.PI / 2), hull, 0, 3.4, 0); body.scale.set(1, 0.8, 1);
    a(new T.ConeGeometry(2.4, 6, 14).rotateX(Math.PI / 2), hull, 0, 3.4, 12.5);
    a(new T.SphereGeometry(2, 14, 10, 0, Math.PI * 2, 0, Math.PI / 2), S.glass, 0, 4.6, 4).scale.set(1, 0.8, 1.7);
    for (const sx of [-1, 1]) { const w = a(new T.BoxGeometry(11, 0.5, 6.5), hull, sx * 7, 3, -2); w.rotation.z = -sx * 0.05; a(new T.BoxGeometry(11.2, 0.6, 1), trim, sx * 7, 3, -4.6); a(new T.CylinderGeometry(1, 1.2, 5, 10).rotateX(Math.PI / 2), F.dark, sx * 5, 2.6, -6); a(new T.SphereGeometry(0.9, 10, 8), cry[0], sx * 5, 2.6, -8.8, false); a(new T.BoxGeometry(0.4, 3, 3), hull, sx * 12.5, 4, -3.5); }
    a(new T.BoxGeometry(0.5, 5, 4), hull, 0, 7.2, -7); a(new T.BoxGeometry(5.6, 0.4, 2), hull, 0, 9, -7.4);
    a(new T.SphereGeometry(1.3, 10, 8), cry[2], 0, 3.2, -10.2, false);
    for (const sx of [-1, 1]) a(new T.CylinderGeometry(0.5, 0.7, 5, 8).rotateX(Math.PI / 2), F.steel, sx * 7, 2.2, 5);
    g.userData.keep = true; return g;
  };
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 4, name: 'THE GUARD SHIPS & THE SHIELD HEART',
    brief: 'Three guard ships on the launch apron, and the shield heart: a great crystal that feeds all four towers.',
    types: {
      GUARDSHIP: { code: 'FB', name: 'GUARD SHIP', col: '#dfe5ea', w: 28, d: 32, h: 12 },
      SHIELDHEART: { code: 'SY', name: 'SHIELD HEART', col: '#9fffd8', w: 44, d: 44, h: 50 },
    },
    order: ['GUARDSHIP', 'SHIELDHEART'],
    at: { GUARDSHIP: [[1400, 110], [1550, 110], [1700, 110]], SHIELDHEART: [[1550, -300]] },
    eye: [1100, 160, 380],
    stats(api, c) { return [['GUARD SHIPS', c('GUARDSHIP') + ' / 3'], ['SHIELD HEART', c('SHIELDHEART') ? 'GLOWING' : 'NOT YET']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, S = P.hm(api), C = P.fun(api);
      const cry = P._cry = P._cry || [0x7ffcff, 0x9f7bff, 0x6dffb0].map(c => new T.MeshStandardMaterial({ color: c, emissive: c, emissiveIntensity: 1.4, roughness: 0.25, transparent: true, opacity: 0.92 }));
      if (type === 'GUARDSHIP') {
        add(new T.CylinderGeometry(19, 19, 0.8, 32), F.deck, 0, 0.4, 0); const ring = add(new T.TorusGeometry(17, 0.4, 8, 40), cry[0], 0, 1, 0); ring.rotation.x = Math.PI / 2; ring.castShadow = false;
        P.gship(api, add, g, 0, 0.6, 0, 0, 1);
        P.person(g, P.civ(52400 + k), 'tablet', 14, 0.4, -14, Math.PI * 0.75);
      } else {
        add(new T.CylinderGeometry(23, 25, 3, 28), S.stone, 0, 1.5, 0);
        add(new T.CylinderGeometry(17, 17, 10, 28), F.white, 0, 8, 0);
        const dome = add(new T.SphereGeometry(15, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2), S.glass, 0, 13, 0); dome.castShadow = false;
        const core = add(new T.OctahedronGeometry(9), cry[2], 0, 24, 0); core.scale.set(0.8, 1.9, 0.8); core.castShadow = false;
        for (const r of [11, 14]) { const ring = add(new T.TorusGeometry(r, 0.45, 8, 40), cry[r > 12 ? 0 : 1], 0, 24, 0); ring.rotation.x = Math.PI / 2 + (r > 12 ? 0.4 : -0.3); ring.castShadow = false; }
        for (let i = 0; i < 4; i++) { const a = i / 4 * Math.PI * 2 + 0.78; add(new T.BoxGeometry(1.2, 1.2, 40), F.dark, Math.cos(a) * 28, 1.4, Math.sin(a) * 28).rotation.y = -a + Math.PI / 2; }
        P.sign(api, g, 'SHIELD HEART', 20, 3, 0, 4, 26, 0, '#14324a', '#bff8d0', true);
        P.person(g, P.civ(52500), 'idle', 12, 1.5, 28, Math.PI);
      }
    },
  }));
})();
