/* ============================================================
   OCKNOG · BUILD 3 · THE VILLAGE OF OCKNOG
   Keep this file in projects/ocknog next to 70-ocknog.html.
   The scientists are welcomed by the people of Ocknog: clay huts, dry fields of dead stalks, an empty well,
   and the meeting circle where the Elder of Ocknog speaks to the Unity party.
   ============================================================ */
(function () {
  const P = window.OKP;
  const rel = a => a.map(([x, z]) => [1550 + x, z]);
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 3, name: 'THE VILLAGE OF OCKNOG',
    brief: 'The people of Ocknog welcome the scientists: eight clay huts, three dry fields of dead stalks, an empty well, and the meeting circle where the Elder of Ocknog speaks.',
    types: {
      HUT: { code: 'HM', name: 'CLAY HUT', col: '#b88a5a', w: 24, d: 24, h: 14 },
      FIELD: { code: 'GD', name: 'DEAD FIELD', col: '#6a5a30', w: 70, d: 50, h: 4 },
      WELL: { code: 'HP', name: 'DRY WELL', col: '#a89880', w: 12, d: 12, h: 10 },
      CIRCLE: { code: 'SY', name: 'MEETING CIRCLE', col: '#c8873a', w: 46, d: 46, h: 10 },
    },
    order: ['CIRCLE', 'WELL', 'HUT', 'FIELD'],
    at: {
      CIRCLE: rel([[-20, 0]]), WELL: rel([[50, 0]]),
      HUT: rel([[-130, -170], [-60, -170], [20, -170], [100, -170], [-130, 170], [-60, 170], [20, 170], [100, 170]]),
      FIELD: rel([[190, -120], [190, 0], [190, 120]]),
    },
    eye: [1550 - 150, P.SY + 90, 200],
    stats(api, c) { return [['MEETING CIRCLE', c('CIRCLE') ? 'READY' : 'NOT YET'], ['CLAY HUTS', c('HUT') + ' / 8'], ['DEAD FIELDS', c('FIELD') + ' / 3'], ['THE WELL', c('WELL') ? 'DRY' : 'NOT YET']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, H = P.ok(api);
      let s = 31 + k * 7; const r = () => (s = (s * 16807) % 2147483647) / 2147483647;
      if (type === 'HUT') {
        add(new T.CylinderGeometry(12.5, 13, 1, 16), H.stone, 0, 0.5, 0);
        add(new T.CylinderGeometry(9.5, 10.5, 8, 16), k % 2 ? H.clay : H.clay2, 0, 5, 0);
        add(new T.SphereGeometry(10.8, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2), H.thatch, 0, 9, 0);
        add(new T.BoxGeometry(3.4, 5.4, 0.8), H.dark, 0, 3.7, 10.2, false);
        for (const a of [1.6, 3.4, 5.2]) add(new T.BoxGeometry(1.6, 1.6, 0.6), H.lamp, Math.cos(a) * 9.8, 6.4, Math.sin(a) * 9.8, false).rotation.y = -a + Math.PI / 2;
        add(new T.CylinderGeometry(0.5, 0.5, 4, 6), H.stone, 4, 12, -3);
        P.alien(api, g, 0, 1, 14.5, r() * 6.28, { seed: k + 1, mode: k % 3 ? 'idle' : 'wave', scale: 0.85 });
      } else if (type === 'FIELD') {
        add(new T.BoxGeometry(70, 1, 50), H.dust2, 0, 0.5, 0);
        for (let i = 0; i < 6; i++) add(new T.BoxGeometry(66, 0.5, 1.4), H.crack, 0, 1.1, -21 + i * 8.4, false);
        for (let i = 0; i < 90; i++) { const st = add(new T.CylinderGeometry(0.05, 0.1, 1.5 + r() * 1.5, 4), H.stalk, (r() - 0.5) * 66, 2, (r() - 0.5) * 46, false); st.rotation.z = (r() - 0.5) * 1.2; st.rotation.x = (r() - 0.5) * 1.2; }
        P.alien(api, g, -28, 1, 6, 1.2, { seed: 7 + k, scale: 0.85 });
      } else if (type === 'WELL') {
        add(new T.CylinderGeometry(5.6, 6, 1.4, 14), H.stone, 0, 0.7, 0);
        add(new T.CylinderGeometry(4, 4, 4, 14, 1, true), H.stone, 0, 3, 0).material = H.stone;
        add(new T.CylinderGeometry(3.4, 3.4, 0.2, 14), H.dark, 0, 2.2, 0, false);
        for (const x of [-4, 4]) add(new T.BoxGeometry(0.6, 9, 0.6), H.clay2, x, 5.5, 0);
        add(new T.BoxGeometry(10, 0.6, 0.6), H.clay2, 0, 10, 0); add(new T.CylinderGeometry(0.1, 0.1, 5, 4), H.pipe, 0, 7.4, 0, false);
        P.sign(api, g, 'DRY SINCE THE DUST CAME', 9, 1.4, 0, 5.8, 6.6, 0, '#3a2a1a', '#ffd9a0');
      } else {
        add(new T.CylinderGeometry(23, 23.5, 1, 32), H.stone, 0, 0.5, 0);
        add(new T.CylinderGeometry(15, 15, 1.4, 32), H.dust, 0, 1.2, 0, false);
        for (let i = 0; i < 12; i++) { const a = i / 12 * 6.28; add(new T.BoxGeometry(4, 7 + (i % 3) * 2, 2), H.stone, Math.cos(a) * 20, 4.5, Math.sin(a) * 20, true).rotation.y = -a; }
        add(new T.CylinderGeometry(2.4, 2.8, 1.8, 12), H.stone, 0, 2, 0);
        const orb = add(new T.SphereGeometry(1.4, 12, 8), H.cure, 0, 4.6, 0, false); orb.userData.keep = true;
        P.alien(api, g, 0, 2.2, -4, 0, { seed: 3, elder: true, mode: 'wave', scale: 1.15 });
        for (let i = 0; i < 6; i++) { const a = 0.9 + i * 0.9; P.alien(api, g, Math.cos(a) * 12, 1.2, Math.sin(a) * 12, -a + 1.57, { seed: 9 + i, scale: 0.8 + (i % 2) * 0.1 }); }
        for (let i = 0; i < 3; i++) P.person(g, P.civ(70500 + i), i % 2 ? 'tablet' : 'idle', -9 + i * 3, 1.2, 15, Math.PI);
        P.sign(api, g, 'WELCOME, FRIENDS OF UNITY · THE PEOPLE OF OCKNOG', 22, 2.2, 0, 11.5, 0, 0, '#3a2210', '#ffd9a0');
      }
    },
  }));
})();
