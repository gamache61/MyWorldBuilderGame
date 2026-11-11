/* ============================================================
   THE LANGUAGE HOUSE · BUILD 2 · THE HOUSE OF WORDS
   Keep this file in projects/languagehouse next to 60-languagehouse.html.
   The great hall of the Language House: a stepped stone base, a ring of columns, a glass dome and a front door that says hello in many tongues.
   ============================================================ */
(function () {
  const P = window.LANG;
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 2, name: 'THE HOUSE OF WORDS',
    brief: 'The great hall of the Language House: a stepped stone base, a ring of columns, a glass dome, and a front door that says hello in many tongues.',
    types: { LANGHOUSE: { code: 'SY', name: 'HOUSE OF WORDS', col: '#e8e1d1', w: 160, d: 120, h: 70 } },
    order: ['LANGHOUSE'],
    at: { LANGHOUSE: [[1550, 0]] },
    eye: [1000, 210, 330],
    stats(api, c) { return [['HOUSE OF WORDS', c('LANGHOUSE') ? 'OPEN' : 'NOT YET'], ['TONGUES ON THE DOOR', c('LANGHOUSE') ? '9' : '0']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, S = P.hm(api), C = P.fun(api);
      add(new T.BoxGeometry(164, 1.4, 124), S.gravel, 0, 0.7, 0);
      add(new T.BoxGeometry(150, 3, 108), S.stone, 0, 2.9, 0);
      add(new T.BoxGeometry(140, 3, 98), S.stone, 0, 5.9, 0);
      add(new T.BoxGeometry(110, 26, 70), F.white, 0, 20.5, 0);
      add(new T.BoxGeometry(118, 3, 78), S.slate, 0, 35.5, 0);
      for (let i = 0; i < 12; i++) { const x = -55 + i * 10; for (const z of [-44, 44]) add(new T.CylinderGeometry(2, 2.2, 28, 10), F.white, x, 21, z); }
      for (let i = 1; i < 6; i++) { const z = -44 + i * 14.7; for (const x of [-60, 60]) add(new T.CylinderGeometry(2, 2.2, 28, 10), F.white, x, 21, z); }
      for (let x = -40; x <= 40; x += 16) { add(new T.BoxGeometry(9, 14, 0.5), S.glass, x, 17, 35.3); add(new T.BoxGeometry(9, 14, 0.5), S.glass, x, 17, -35.3); }
      const dome = add(new T.SphereGeometry(30, 32, 14, 0, Math.PI * 2, 0, Math.PI / 2), S.glass, 0, 37, 0); dome.castShadow = false;
      for (let i = 0; i < 8; i++) { const r = add(new T.TorusGeometry(30, 0.5, 6, 24, Math.PI), F.steel, 0, 37, 0); r.rotation.y = i / 8 * Math.PI; r.castShadow = false; }
      add(new T.CylinderGeometry(1.4, 1.4, 12, 8), F.steel, 0, 73, 0); add(new T.SphereGeometry(2.4, 10, 8), F.lamp, 0, 80, 0).castShadow = false;
      add(new T.BoxGeometry(26, 14, 1), F.dark, 0, 11, 36);
      for (let i = 0; i < 6; i++) add(new T.BoxGeometry(150 - i * 8, 0.8, 8), S.stone, 0, 0.8 + i * 0.7, 56 - i * 1.2).castShadow = false;
      P.sign(api, g, 'THE LANGUAGE HOUSE', 62, 6, 0, 33, 40, 0, '#14324a', '#b8f0a0', true);
      P.sign(api, g, 'HELLO · BONJOUR · HOLA · CIAO · NAMASTE · SHALOM · SALAAM', 64, 3, 0, 27, 40.6, 0, '#14324a', '#ffd9a0', true);
      for (let i = 0; i < 5; i++) P.person(g, i % 2 ? P.kid(59100 + i) : P.civ(59100 + i), i % 2 ? 'idle' : 'tablet', -24 + i * 12, 1.4, 62, Math.PI);
      for (let i = 0; i < 4; i++) P.figure(api, add, -50 + i * 33, 6, 50, 0.7, i, g);
    },
  }));
})();
