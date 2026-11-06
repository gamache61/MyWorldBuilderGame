/* ============================================================
   SEAPORT · BUILD 6 · CARGO TERMINAL
   Keep this file in projects/seaport next to seaport.html.
   Trip 1 — the terminal quay built out into the north of the
            harbour, and 4 container yards on it.
   Trip 2 — 4 gantry cranes along the quay edge.
   Build 6 ends when you open the terminal (press L).
   ============================================================ */
(function () {
  const T = KRYOS.CARGO, W = T.x1 - T.x0, D = T.z1 - T.z0, CX = (T.x0 + T.x1) / 2, CZ = (T.z0 + T.z1) / 2;
  const cc = [0x2f6690, 0xc8402e, 0xe0b030, 0x3a7d44, 0xe8e2d8, 0x7b4fa0];
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(KRYOS.cityBuild({
    id: 6,
    name: 'CARGO TERMINAL',
    brief: 'A terminal quay with container yards and tall gantry cranes, ready for the cargo ships that will trade with the seaport.',
    finishLabel: 'OPEN THE CARGO TERMINAL', flags: ['scargo'], status: ['CARGO TERMINAL', 'WORKING'],
    focus: [CX, CZ], lookUp: 20,
    parts: {
      KTQUAY: {
        name: 'TERMINAL QUAY', code: 'SF', col: '#6c757d', h: 6, count: 1, at: () => [CX, CZ],
        needs: api => api.flag('sdocks') ? null : 'NEEDS THE DOCKS',
        make(g, k, M, THREE, api, sl) {
          const S = KRYOS.style(THREE), top = (api.DECK_TOP - 0.4) - sl.y, bot = KRYOS.FLOOR - sl.y;
          KRYOS.add(THREE, g, new THREE.BoxGeometry(W, top - bot, D), S.concrete, 0, (top + bot) / 2, 0);
          KRYOS.add(THREE, g, new THREE.BoxGeometry(W + 1, 0.6, D + 1), S.trim, 0, top + 0.2, 0);
          for (let i = 0; i < 4; i++) KRYOS.add(THREE, g, new THREE.BoxGeometry(2, 0.3, D - 20), KRYOS.kit(THREE).std(0xe0b030, 0.6, 0.2), -W / 2 + 16 + i * 6, top + 0.55, 0);
        },
      },
      KYARD: {
        name: 'CONTAINER YARD', code: 'FB', col: '#e8c13a', h: 14, count: 4, at: k => [CX + 40 - (k % 2) * 0, Math.round(T.z0 + 50 + k * 75)],
        needs: (api, k, cnt) => cnt('KTQUAY') ? null : 'NEEDS THE TERMINAL QUAY',
        make(g, k, M, THREE, api, sl) {
          const top = (api.DECK_TOP - 0.4) - sl.y, r = KRYOS.rng(60 + k), box = new THREE.BoxGeometry(12, 2.6, 2.6);
          const n = 120, inst = new THREE.InstancedMesh(box, new THREE.MeshStandardMaterial({ roughness: 0.6, metalness: 0.3 }), n), m = new THREE.Matrix4(), c = new THREE.Color();
          let i = 0; for (let row = 0; row < 6 && i < n; row++) for (let col = 0; col < 6 && i < n; col++) { const h = 1 + ((row * 7 + col * 3 + k) % 4); for (let s = 0; s < h && i < n; s++, i++) { m.makeTranslation(-45 + row * 16, top + 1.3 + s * 2.6, -24 + col * 9.5); inst.setMatrixAt(i, m); inst.setColorAt(i, c.setHex(cc[(row + col + s + k) % 6])); } }
          inst.count = i; inst.castShadow = true; g.add(inst);
        },
      },
      KGANTRY: {
        name: 'GANTRY CRANE', code: 'SY', col: '#e8e1d1', h: 60, count: 4, at: k => [T.x0 + 22, Math.round(T.z0 + 50 + k * 80)],
        needs: (api, k, cnt) => cnt('KTQUAY') ? null : 'NEEDS THE TERMINAL QUAY', eye: (k, V) => V(-180, 90, 160),
        make(g, k, M, THREE, api, sl) {
          const S = KRYOS.style(THREE), top = (api.DECK_TOP - 0.4) - sl.y, add = (geo, m, x, y, z) => KRYOS.add(THREE, g, geo, m, x, y, z);
          for (const [dx, dz] of [[-10, -12], [10, -12], [-10, 12], [10, 12]]) add(new THREE.BoxGeometry(2, 52, 2), S.trim, dx, top + 26, dz);
          add(new THREE.BoxGeometry(110, 4, 26), S.trim, -25, top + 54, 0);
          add(new THREE.BoxGeometry(8, 6, 8), S.dark, -6, top + 50, 0);
          add(new THREE.BoxGeometry(1, 3, 26), KRYOS.kit(THREE).std(0xe0b030, 0.5, 0.3), -78, top + 54, 0);
          add(new THREE.CylinderGeometry(0.2, 0.2, 30, 4), S.dark, -40, top + 38, 0);
          add(new THREE.BoxGeometry(12, 1.5, 3), KRYOS.kit(THREE).std(0xe0b030, 0.5, 0.3), -40, top + 22.5, 0);
        },
      },
    },
    trips: [{ name: 'QUAY & YARDS', parts: ['KTQUAY', 'KYARD'] }, { name: 'GANTRY CRANES', parts: ['KGANTRY'] }],
  }));
})();
