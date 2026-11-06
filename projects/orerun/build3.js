/* ============================================================
   THE ORE RUN · BUILD 3 · THE ORE HOPPERS & THE CONVEYOR
   Keep this file in projects/orerun next to orerun.html.
   Two great ore hoppers where the freighters tip their loads, a covered
   conveyor that joins them, and the tunnel mouth where the ore goes
   underground to the Ore Depot.
   ============================================================ */
(function () {
  const P = window.ORE;
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 3, name: 'THE ORE HOPPERS & THE CONVEYOR',
    brief: 'Two great ore hoppers where the freighters tip their loads, a covered conveyor between them, and the tunnel mouth that takes the ore underground to the Ore Depot.',
    types: {
      HOPPER:    { code: 'FB', name: 'ORE HOPPER', col: '#d9a21b', w: 50, d: 50, h: 34 },
      CONVEYOR:  { code: 'SF', name: 'CONVEYOR', col: '#6c757d', w: 14, d: 250, h: 10 },
      ORETUNNEL: { code: 'SF', name: 'TUNNEL MOUTH', col: '#6c757d', w: 36, d: 36, h: 14 },
    },
    order: ['HOPPER', 'CONVEYOR', 'ORETUNNEL'],
    at: { HOPPER: [[690, -150], [690, 150]], CONVEYOR: [[690, 0]], ORETUNNEL: [[780, 0]] },
    eye: [-220, 220, 300],
    stats(api, c) { return [['ORE HOPPERS', c('HOPPER') + ' / 2'], ['CONVEYOR', c('CONVEYOR') ? 'RUNNING' : 'NOT YET'], ['TUNNEL TO THE DEPOT', c('ORETUNNEL') ? 'OPEN' : 'NOT YET']]; },
    make(type, k, g, add, F, api) {
      const T = api.THREE, S = P.hm(api);
      if (type === 'HOPPER') {
        add(new T.BoxGeometry(50, 1.5, 50), F.stoneDark, 0, 0.75, 0);
        for (const [x, z] of [[-18, -18], [18, -18], [-18, 18], [18, 18]]) add(new T.BoxGeometry(2.4, 20, 2.4), S.yellow, x, 11, z);
        add(new T.CylinderGeometry(22, 8, 14, 4, 1, true).rotateY(Math.PI / 4), F.steel, 0, 27, 0);
        add(new T.BoxGeometry(31, 1.6, 31), S.yellow, 0, 34, 0);
        add(new T.CylinderGeometry(18, 18, 3, 4).rotateY(Math.PI / 4), F.ore, 0, 32, 0, false);
        add(new T.BoxGeometry(8, 8, 8), F.dark, 0, 16, 0); add(new T.CylinderGeometry(2.6, 2.6, 6, 10), F.steel, 0, 9, 0);
        add(new T.BoxGeometry(10, 3, 30), F.dark, 0, 3, (k ? -1 : 1) * 12);
        P.sign(api, g, 'HOPPER ' + (k ? 'B' : 'A'), 12, 2.4, 0, 22, 18.4, 0, '#2a2f38', '#ffd060', false);
        P.person(g, P.civ(19100 + k), 'tablet', 22, 1.5, 22, -0.8);
      } else if (type === 'CONVEYOR') {
        // a covered belt on legs, with ore riding along it to the tunnel
        for (let z = -110; z <= 110; z += 22) { for (const x of [-5, 5]) add(new T.BoxGeometry(1, 8, 1), F.steel, x, 4, z); }
        add(new T.BoxGeometry(12, 1, 250), F.dark, 0, 8.5, 0);
        add(new T.BoxGeometry(10, 0.4, 250), F.oreDark, 0, 9.2, 0, false);
        add(new T.CylinderGeometry(7, 7, 250, 16, 1, true, Math.PI / 2, Math.PI).rotateX(Math.PI / 2), S.glass, 0, 9, 0, false);
        const ore = new T.Group(); ore.userData.keep = true; g.add(ore); P.belt = ore;
        for (let i = 0; i < 40; i++) add(new T.DodecahedronGeometry(1 + (i % 3) * 0.3, 0), F.ore, (i % 3 - 1) * 2.4, 10.2, -125 + i * 6.25, false, ore);
        add(new T.BoxGeometry(80, 1, 10), F.dark, 45, 8.5, 0); add(new T.BoxGeometry(78, 0.4, 8), F.oreDark, 45, 9.2, 0, false);
        for (const x of [20, 45, 70]) for (const s of [-1, 1]) add(new T.BoxGeometry(1, 8, 1), F.steel, x, 4, s * 4);
      } else if (type === 'ORETUNNEL') {
        add(new T.BoxGeometry(36, 2, 36), F.stoneDark, 0, 1, 0);
        add(new T.CylinderGeometry(14, 14, 30, 24, 1, true, Math.PI / 2, Math.PI).rotateX(Math.PI / 2).rotateY(Math.PI / 2), F.stone, 0, 2, 0);
        add(new T.CircleGeometry(11, 24, 0, Math.PI).rotateY(-Math.PI / 2), new T.MeshBasicMaterial({ color: 0x050505 }), -15.2, 2, 0, false);
        add(new T.BoxGeometry(2, 16, 34), S.yellow, -16, 8, 0); for (const z of [-12, 0, 12]) add(new T.SphereGeometry(0.7, 8, 6), F.lamp, -16.6, 15, z, false);
        P.sign(api, g, 'TO THE ORE DEPOT', 20, 2.6, -17.2, 18.6, 0, -Math.PI / 2, '#2a2f38', '#ffd060', false);
      }
    },
    tick(api, dt, t) { if (P.belt) P.belt.position.z = ((t * 6) % 6.25); },
  }));
})();
