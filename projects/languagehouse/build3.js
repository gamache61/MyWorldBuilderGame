/* ============================================================
   THE LANGUAGE HOUSE · BUILD 3 · THE CLASSROOMS
   Keep this file in projects/languagehouse next to 59-languagehouse.html.
   Three glass-fronted classrooms for the languages of lights, of songs and of words.
   ============================================================ */
(function () {
  const P = window.YARD;
  P.classPos = [[1330, -170], [1330, 0], [1330, 170]];
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 3, name: 'THE CLASSROOMS',
    brief: 'Three glass-fronted classrooms beside the great hall: one for the languages of lights, one for songs, one for words.',
    types: { CLASSROOM: { code: 'SY', name: 'CLASSROOM', col: '#9fd8ff', w: 70, d: 46, h: 20 } },
    order: ['CLASSROOM'],
    at: { CLASSROOM: P.classPos },
    eye: [1000, 190, 400],
    stats(api, c) { return [['CLASSROOMS', c('CLASSROOM') + ' / 3'], ['LANGUAGES BEING TAUGHT', 'LIGHTS · SONGS · WORDS']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, S = P.hm(api), C = P.fun(api);
      const col = [C.blue, C.green, C.orange][k % 3], names = ['THE CLASS OF LIGHTS', 'THE CLASS OF SONGS', 'THE CLASS OF WORDS'];
      add(new T.BoxGeometry(72, 1, 48), S.gravel, 0, 0.5, 0);
      add(new T.BoxGeometry(66, 12, 40), F.white, 0, 7, 0);
      const roof = add(new T.BoxGeometry(72, 2, 46), col, 0, 14, 0); roof.castShadow = true;
      add(new T.BoxGeometry(58, 8, 0.6), S.glass, 0, 8, 20.4); add(new T.BoxGeometry(58, 8, 0.6), S.glass, 0, 8, -20.4);
      for (let x = -24; x <= 24; x += 12) add(new T.BoxGeometry(0.8, 8, 0.8), F.steel, x, 8, 20.8);
      for (let i = 0; i < 6; i++) add(new T.BoxGeometry(6, 0.5, 3), F.dark, -22 + i * 9, 3, 6 + (i % 2) * 4).castShadow = false;
      add(new T.BoxGeometry(30, 7, 0.4), new T.MeshBasicMaterial({ color: new T.Color(0.5, 1.4, 1.0), toneMapped: false }), 0, 10, -19.6).castShadow = false;
      P.sign(api, g, names[k % 3], 32, 3.2, 0, 17, 22, 0, '#14324a', '#c8ffd0', true);
      for (let i = 0; i < 5; i++) P.person(g, P.kid(59200 + k * 8 + i), 'idle', -16 + i * 8, 1.1, 28 + (i % 2) * 2, Math.PI);
      P.person(g, P.civ(59250 + k), 'tablet', 0, 1.1, -24, 0);
    },
  }));
})();
