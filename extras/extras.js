/* ============================================================
   WORLD BUILDER · BUILDER'S EXTRAS · LIST
   Keep this file at extras/extras.js.
   To add a new extra: make its file in this folder (like fountainplaza.js)
   and add its file name to the list below. Nothing else changes.
   Sizes:  small  = 2 build points · $0.99 · costs the council 4
           medium = 5 build points · $1.39 · costs the council 10
           large  = 10 build points · $1.99 · costs the council 20
   Every player gets 10 free build points. After that, each extra is
   paid for with its own unlock code.
   ============================================================ */
window.WB_EXTRAS = [];
window.WB_EXTRA_FILES = [
  'fountainplaza.js',
  'motorboat.js',
  'lookouttower.js',
  'marketsquare.js',
  'mountainresort.js'
];
window.WB_SIZES = {
  small:  { points: 2,  price: '$0.99', cost: 4  },
  medium: { points: 5,  price: '$1.39', cost: 10 },
  large:  { points: 10, price: '$1.99', cost: 20 }
};
window.WB_PLACES = [
  'Kryos City',
  'Seashore',
  'Station-7 Havenreach',
  'A new city on another continent',
  'A new orbit station'
];
window.WB_FREE_POINTS = 10;
