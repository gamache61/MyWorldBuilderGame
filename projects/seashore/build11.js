/* ============================================================
   SEAPORT · BUILD 11 · FLOATING MARINA
   Keep this file in projects/seaport next to seaport.html.
   Trip 1 — 6 floating homes anchored in the south of the harbour.
   Trip 2 — 2 boat docks and 12 small boats.
   Build 11 ends when you open the marina (press L).
   ============================================================ */
(function () {
  const [MX, MZ] = KRYOS.MARINA, HOME = k => [MX - 60 + (k % 3) * 65, MZ - 30 - Math.floor(k / 3) * 65], BOAT = k => [MX - 110 + (k % 6) * 22, (k < 6 ? -456 : -484)];
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(KRYOS.cityBuild({
    id: 11,
    name: 'FLOATING MARINA',
    brief: 'Floating homes with roof gardens and a marina of small boats in the sheltered south of the harbour.',
    finishLabel: 'OPEN THE MARINA', flags: ['smarina'], status: ['FLOATING MARINA', 'OPEN'],
    focus: [MX, MZ], lookUp: 0,
    parts: {
      KFHOME: {
        name: 'FLOATING HOME', code: 'HM', col: '#e8e1d1', h: 14, count: 6, at: k => HOME(k),
        needs: api => api.flag('sbreak') ? null : 'NEEDS THE BREAKWATER', eye: (k, V) => V(110, 70, 130),
        make(g, k, M, THREE) {
          const S = KRYOS.style(THREE), add = (geo, m, x, y, z) => KRYOS.add(THREE, g, geo, m, x, y, z);
          add(new THREE.CylinderGeometry(26, 26, 2.4, 6), S.trim, 0, 0.6, 0);
          add(new THREE.BoxGeometry(22, 9, 16), S.white(1, 1), 0, 6, 0);
          add(new THREE.BoxGeometry(22.4, 3, 16.4), S.glass(k, 2, 1), 0, 4, 0);
          add(new THREE.BoxGeometry(23, 0.8, 17), S.grass, 0, 10.8, 0);
          KRYOS.trees(THREE, g, [[-7, -4, 11.2], [6, 3, 11.2]], 300 + k, 0.4);
          add(new THREE.BoxGeometry(14, 0.6, 3), KRYOS.kit(THREE).std(0xb89a76, 0.9, 0), 22, 1.2, 0);
        },
      },
      KBDOCK: {
        name: 'BOAT DOCK', code: 'SF', col: '#6c757d', h: 3, count: 2, at: k => [MX - 55 + k * 0.5, k ? -484 - 14 : -456 + 14],
        make(g, k, M, THREE) {
          const deck = KRYOS.kit(THREE).std(0xb89a76, 0.9, 0);
          KRYOS.add(THREE, g, new THREE.BoxGeometry(140, 1.2, 4), deck, 0, 0.8, 0);
          for (let x = -60; x <= 60; x += 22) KRYOS.add(THREE, g, new THREE.BoxGeometry(1.4, 1, 12), deck, x + 11, 0.8, k ? 7 : -7);
        },
      },
      KBOAT: {
        name: 'SMALL BOAT', code: 'DF', col: '#2f6690', h: 4, count: 12, at: k => BOAT(k),
        needs: (api, k, cnt) => cnt('KBDOCK') >= 2 ? null : 'NEEDS THE BOAT DOCKS',
        make(g, k, M, THREE) {
          const S = KRYOS.style(THREE), paint = KRYOS.kit(THREE).std(KRYOS.craftCols[k % 6], 0.4, 0.3);
          const hull = KRYOS.add(THREE, g, new THREE.CapsuleGeometry(2.4, 10, 4, 10).rotateZ(Math.PI / 2), S.trim, 0, 0.8, 0); hull.scale.set(1, 0.55, 1);
          KRYOS.add(THREE, g, new THREE.BoxGeometry(14, 0.5, 4.6), paint, 0, 0.6, 0);
          KRYOS.add(THREE, g, new THREE.BoxGeometry(4, 2, 3), S.dark, -1, 2.6, 0);
          if (k % 3 === 0) KRYOS.add(THREE, g, new THREE.CylinderGeometry(0.2, 0.2, 14, 6), S.trim, 1, 8, 0);
          g.userData.bob = k;
        },
      },
    },
    trips: [{ name: 'FLOATING HOMES', parts: ['KFHOME'] }, { name: 'DOCKS & BOATS', parts: ['KBDOCK', 'KBOAT'] }],
    tick(api, dt, t) {
      for (const p of api.placed) if (p.b === 11 && p.piece) { const k = p.s || 0; p.piece.position.y = p.y + Math.sin(t * 1.2 + k) * 0.25; p.piece.rotation.z = Math.sin(t * 0.9 + k * 2) * 0.01; }
    },
  }));
})();
