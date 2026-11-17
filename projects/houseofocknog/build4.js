/* ============================================================
   THE HOUSE OF OCKNOG · BUILD 4 · THE TRADE HALL, THE CROP GARDEN & THE ARRIVAL FIELD
   Keep this file in projects/houseofocknog next to 82-houseofocknog.html.
   An open trade hall for the goods of Ocknog and Unity, three garden beds of Ocknog's own crops, and a small arrival field where their ships can land.
   ============================================================ */
(function () {
  const P = window.PWP;
  const HX = 1550 - 1400, HZ = 1100;
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 4, name: 'THE TRADE HALL, THE CROP GARDEN & THE ARRIVAL FIELD',
    brief: 'An open trade hall where the goods of Ocknog and Unity are laid out side by side, three garden beds of Ocknog\u2019s own crops growing behind the round house, and a small arrival field where their ships can land.',
    types: {
      TRADE:  { code: 'FB', name: 'THE TRADE HALL',   col: '#c08c5c', w: 96, d: 52, h: 24 },
      BED:    { code: 'SF', name: 'CROP GARDEN BED',  col: '#4fae44', w: 44, d: 56, h: 3 },
      ARRIVE: { code: 'SF', name: 'THE ARRIVAL FIELD', col: '#a88a62', w: 100, d: 100, h: 1 },
    },
    order: ['TRADE', 'BED', 'ARRIVE'],
    at: { TRADE: [[HX + 10, HZ - 190]], BED: [[HX - 190, HZ - 62], [HX - 190, HZ], [HX - 190, HZ + 62]], ARRIVE: [[HX + 10, HZ + 190]] },
    eye: [HX + 240, (window.__HOUSE.Y || -85) + 180, HZ + 320],
    stats(api, c) { return [['THE TRADE HALL', c('TRADE') ? 'OPEN' : 'NOT YET'], ['CROP BEDS', c('BED') + ' / 3'], ['ARRIVAL FIELD', c('ARRIVE') ? 'READY' : 'NOT YET']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, O = P.ok(api), H = P.pw(api);
      if (type === 'TRADE') {
        add(new T.BoxGeometry(100, 1, 56), O.stone, 0, 0.5, 0, false);
        for (let i = 0; i < 5; i++) for (const z of [-22, 22]) add(new T.CylinderGeometry(1.7, 2, 16, 10), O.clay, -40 + i * 20, 9, z);
        const roof = add(new T.BoxGeometry(100, 1.6, 58), O.thatch, 0, 18.2, 0);
        for (const q of [-1, 1]) { const r = add(new T.BoxGeometry(100, 1.2, 31), O.thatch, 0, 21.6, q * 13); r.rotation.x = -q * 0.34; }
        add(new T.BoxGeometry(101, 1, 1.4), O.brass, 0, 25, 0, false);
        for (let i = 0; i < 4; i++) { add(new T.BoxGeometry(16, 3, 6), O.wood, -30 + i * 20, 2.6, -6, false); for (let j = 0; j < 4; j++) add(new T.BoxGeometry(2.4, 1.8, 2.4), j % 2 ? O.crop : O.cloth[(i + j) % 5], -35 + i * 20 + j * 3.4, 5.4, -6, false); }
        for (let i = 0; i < 4; i++) add(new T.BoxGeometry(0.4, 8, 3.2), O.cloth[i % 5], -33 + i * 22, 14, 27.4, false);
        P.sign(api, g, 'THE TRADE HALL · OCKNOG & UNITY', 60, 5, 0, 22, 29.4, 0, '#4a2c18', '#ffe2a0', false);
        P.alien(api, g, -8, 1, 16, 0, { seed: 2040, mode: 'wave', scale: 1 }); P.alien(api, g, 12, 1, 18, 0, { seed: 2041, scale: 1 }); P.person(g, P.civ(82040), 'tablet', 0, 1, 20, 0);
      } else if (type === 'BED') {
        add(new T.BoxGeometry(44, 1.2, 56), O.stone2, 0, 0.6, 0, false); add(new T.BoxGeometry(41, 1.6, 53), O.soil, 0, 1.2, 0, false);
        for (let r = 0; r < 6; r++) for (let c = 0; c < 5; c++) { const h = 1.6 + ((r * 3 + c * 5 + k) % 4) * 0.5; add(new T.ConeGeometry(1.2, h * 2.4, 5), (r + c) % 2 ? O.crop : O.crop2, -16 + c * 8, 2 + h, -22 + r * 8.8, false); }
      } else if (type === 'ARRIVE') {
        add(new T.CylinderGeometry(50, 51, 1, 40), O.dust, 0, 0.5, 0, false); add(new T.TorusGeometry(40, 0.5, 6, 48), O.brass, 0, 1.2, 0, false).rotation.x = Math.PI / 2;
        for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2; add(new T.SphereGeometry(1, 8, 6), O.lamp, Math.cos(a) * 46, 2, Math.sin(a) * 46, false); }
        // a small round skiff of Ocknog, clay-coloured with a lit ring
        add(new T.SphereGeometry(9, 20, 12, 0, Math.PI * 2, 0, Math.PI / 2), O.clay2, 0, 3.4, 0).scale.set(1, 0.7, 1); add(new T.TorusGeometry(9, 0.6, 6, 32), O.lamp, 0, 3.6, 0, false).rotation.x = Math.PI / 2;
        add(new T.CylinderGeometry(7, 9, 2, 20), O.stone2, 0, 2.2, 0, false); for (const a of [0, 2.1, 4.2]) add(new T.CylinderGeometry(0.4, 0.4, 3, 5), O.dark, Math.cos(a) * 7, 1.6, Math.sin(a) * 7, false);
        P.sign(api, g, 'ARRIVAL FIELD · SHIPS OF OCKNOG', 40, 3, 0, 7, 44, 0, '#4a2c18', '#ffe2a0');
        P.alien(api, g, 16, 1, 14, 0.6, { seed: 2050, mode: 'wave', scale: 0.95 });
      }
    },
  }));
})();
