/* ============================================================
   THE KRYOS ARENA · BUILD 3 · THE RUNNING TRACK & THE TRAINING FIELDS
   Keep this file in projects/kryosarena next to 58-kryosarena.html.
   A red running track with a finish gantry, and four training fields for every school.
   ============================================================ */
(function () {
  const P = window.ARENA;
  P.fieldPos = [[1300, -190], [1300, 190], [1800, -190], [1800, 190]];
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 3, name: 'THE RUNNING TRACK & THE TRAINING FIELDS',
    brief: 'A red running track and four training fields, one for every school in Kryos.',
    types: {
      RUNTRACK: { code: 'SY', name: 'RUNNING TRACK', col: '#c8643a', w: 180, d: 110, h: 10 },
      FIELD: { code: 'SY', name: 'TRAINING FIELD', col: '#3fb04a', w: 100, d: 66, h: 12 },
    },
    order: ['RUNTRACK', 'FIELD'],
    at: { RUNTRACK: [[1800, 0]], FIELD: P.fieldPos },
    eye: [1100, 200, 420],
    stats(api, c) { return [['RUNNING TRACK', c('RUNTRACK') ? 'MARKED' : 'NOT YET'], ['TRAINING FIELDS', c('FIELD') + ' / 4']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, S = P.hm(api), C = P.fun(api);
      if (type === 'RUNTRACK') {
        add(new T.BoxGeometry(182, 0.8, 112), S.gravel, 0, 0.4, 0);
        const lane = new T.MeshStandardMaterial({ color: 0xc8643a, roughness: 0.9 });
        for (let i = 0; i < 4; i++) { const r = add(new T.TorusGeometry(26 + i * 4.2, 2, 4, 48).rotateX(Math.PI / 2), lane, 0, 1, 0); r.scale.set(2.5 - i * 0.11, 1, 1); r.castShadow = false; }
        const ct = add(new T.CylinderGeometry(24, 24, 0.5, 36), C.grass, 0, 0.9, 0); ct.scale.set(2.4, 1, 0.9);
        for (const z of [-26, 26]) add(new T.BoxGeometry(1.4, 14, 1.4), F.steel, 0, 7, z);
        add(new T.BoxGeometry(2, 3, 56), C.yellow, 0, 14, 0);
        add(new T.BoxGeometry(0.6, 1.6, 54), new T.MeshBasicMaterial({ color: new T.Color(1.4, 1.2, 0.5), toneMapped: false }), 0, 11.6, 0).castShadow = false;
        for (let i = 0; i < 5; i++) P.person(g, P.kid(58200 + i), 'idle', -10 + i * 2.6, 1, 30 + (i % 2) * 2, Math.PI);
        P.sign(api, g, 'KRYOS TRACK · FINISH', 24, 3, 0, 17, 0, Math.PI / 2, '#14324a', '#ffd9a0', true);
      } else {
        add(new T.BoxGeometry(102, 0.8, 68), S.gravel, 0, 0.4, 0);
        add(new T.BoxGeometry(96, 0.5, 62), C.grass, 0, 1.0, 0).castShadow = false;
        for (let x = -36; x <= 36; x += 24) add(new T.BoxGeometry(12, 0.15, 62), C.soft, x, 1.3, 0).castShadow = false;
        add(new T.BoxGeometry(0.8, 0.15, 62), F.white, 0, 1.4, 0).castShadow = false;
        for (const sd of [-1, 1]) { for (const z of [-4, 4]) add(new T.CylinderGeometry(0.3, 0.3, 8, 6), F.white, sd * 46, 4, z); add(new T.BoxGeometry(0.4, 0.4, 8.6), F.white, sd * 46, 8, 0); }
        P.sign(api, g, 'SCHOOL FIELD ' + (k + 1) + ' · EVERYONE PLAYS', 40, 3.4, 0, 6, 36, 0, '#14324a', '#c8ffd0', true);
        for (let i = 0; i < 6; i++) P.person(g, P.kid(58300 + k * 8 + i), 'idle', -20 + i * 8, 1.2, (i % 2 ? 8 : -8), i % 2 ? Math.PI : 0);
      }
    },
  }));
})();
