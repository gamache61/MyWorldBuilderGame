/* ============================================================
   THE HAVENREACH SKY DOCKS · BUILD 2 · THE DOCK ARMS & BERTHS
   Keep this file in projects/havenreachskydocks next to 48-havenreachskydocks.html.
   Four long steel arms reach out from the edge of the top deck into
   open space. Visiting ships park at the tip of each arm, where a
   glowing docking ring and a boarding tube join them to the station.
   ============================================================ */
(function () {
  const P = window.YARD;
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 2, name: 'THE DOCK ARMS & BERTHS',
    brief: 'Four long steel arms reaching out from the edge of the top deck into space, each with a docking ring and boarding tube where a visiting ship can park.',
    types: { ARM: { code: 'SF', name: 'DOCK ARM', col: '#2f6690', w: 150, d: 30, h: 20 } },
    order: ['ARM'],
    at: { ARM: [[-330, -140], [-330, 140], [570, -140], [570, 140]] },
    eye: [120, 260, 480],
    stats(api, c) { return [['DOCK ARMS', c('ARM') + ' / 4'], ['BERTHS', c('ARM') + ' / 4']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, S = P.hm(api), C = P.fun(api), d = sl.x < 120 ? -1 : 1;
      const glow = P._ringM = P._ringM || new T.MeshBasicMaterial({ color: new T.Color(0.5, 1.5, 2.6), toneMapped: false });
      // the arm: a deck on trusses, with a rail and yellow edge lines
      add(new T.BoxGeometry(150, 3, 22), F.deck, 0, 1.5, 0);
      add(new T.BoxGeometry(150, 2, 3), F.steel, 0, -1.5, 0);
      for (let x = -70; x <= 70; x += 20) for (const z of [-9, 9]) add(new T.BoxGeometry(2, 14, 2), F.steel, x, -6, z).rotation.z = 0.0;
      for (const z of [-10.5, 10.5]) { add(new T.BoxGeometry(150, 0.5, 0.8), C.yellow, 0, 3.2, z); add(new T.BoxGeometry(150, 1.2, 0.4), F.steel, 0, 4, z * 1.02); }
      for (let x = -70; x <= 70; x += 35) { for (const z of [-10.5, 10.5]) { add(new T.CylinderGeometry(0.3, 0.3, 6, 6), F.steel, x, 6, z); add(new T.SphereGeometry(0.7, 8, 6), F.lamp, x, 9.2, z); } }
      // the docking ring at the outer tip, with a boarding tube
      const tip = d * 75;
      const ring = add(new T.TorusGeometry(9, 0.9, 10, 40), glow, tip, 10, 0); ring.rotation.y = Math.PI / 2; ring.castShadow = false;
      const tube = add(new T.CylinderGeometry(3.4, 3.4, 22, 14).rotateZ(Math.PI / 2), S.frame, tip + d * 8, 6, 0); tube.scale.set(1, 1, 1);
      add(new T.BoxGeometry(2, 14, 20), F.armor, tip - d * 2, 8, 0);
      add(new T.BoxGeometry(14, 10, 12), S.slate, -d * 62, 8, 0); add(new T.BoxGeometry(14.4, 3, 12.4), S.glass, -d * 62, 9, 0);
      P.sign(api, g, 'BERTH ' + (k + 1), 14, 2.6, -d * 40, 14, 11.6, 0, '#14324a', '#ffffff', true);
    },
  }));
})();
