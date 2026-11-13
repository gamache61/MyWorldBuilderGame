/* ============================================================
   THE SEED VAULT · BUILD 4 · THE VAULT HALLS
   Keep this file in projects/seedvault next to 64-seedvault.html.
   A covered corridor leads in from the portal to a round hub, and three
   long seed halls branch off it: Unity's plants, Earth's plants, and the
   room kept empty for whatever the people grow next.
   ============================================================ */
(function () {
  const P = window.SDV;
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 4, name: 'THE VAULT HALLS',
    brief: 'A covered corridor runs in from the portal to a round hub, with three seed halls branching off it: one for the plants of Unity, one for the plants of Earth, and one kept empty for whatever grows next.',
    types: {
      CORRIDOR: { code: 'SF', name: 'COVERED CORRIDOR', col: '#c6c8c3', w: 14, d: 64, h: 9 },
      HUB:      { code: 'HM', name: 'ROUND HUB',        col: '#e8dcc0', w: 30, d: 30, h: 11 },
      HALL:     { code: 'HM', name: 'SEED HALL',        col: '#bfe8ff', w: 40, d: 30, h: 10 },
    },
    order: ['CORRIDOR', 'HUB', 'HALL'],
    at: { CORRIDOR: [[1550, -45]], HUB: [[1550, -92]], HALL: [[1550 - 62, -92], [1550 + 62, -92], [1550, -132]] },
    eye: [1550 + 150, P.SY + 120, 40],
    stats(api, c) { return [['CORRIDOR', c('CORRIDOR') ? 'OPEN' : 'NOT YET'], ['ROUND HUB', c('HUB') ? 'STANDING' : 'NOT YET'], ['SEED HALLS', c('HALL') + ' / 3'], ['SHELVES', c('HALL') * 24]]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, H = P.sv(api);
      if (type === 'CORRIDOR') {
        add(new T.BoxGeometry(14, 0.6, 64), H.concrete2, 0, 0.3, 0, false);
        add(new T.BoxGeometry(14, 7, 64), H.concrete, 0, 4.1, 0, true);
        add(new T.BoxGeometry(15, 0.8, 65), H.moss, 0, 8, 0, false); add(new T.BoxGeometry(13.4, 0.5, 63), H.grass, 0, 8.5, 0, false);
        for (let i = 0; i < 8; i++) { const z = -28 + i * 8; add(new T.BoxGeometry(2.4, 0.5, 4), H.glass, 0, 8.9, z, false); add(new T.BoxGeometry(2, 0.3, 3.4), H.glowC, 0, 8.7, z, false);
          for (const s of [-1, 1]) add(new T.BoxGeometry(0.2, 1.4, 3.2), H.win, s * 7.05, 4.6, z, false); }
        for (const s of [-1, 1]) add(new T.BoxGeometry(0.5, 0.4, 64), H.glowG, s * 7.1, 1.4, 0, false);
      } else if (type === 'HUB') {
        add(new T.CylinderGeometry(15.5, 16, 0.8, 32), H.concrete2, 0, 0.4, 0, false);
        add(new T.CylinderGeometry(14, 14, 8, 32), H.cream, 0, 4.8, 0, true);
        add(new T.SphereGeometry(14.4, 32, 12, 0, Math.PI * 2, 0, Math.PI / 2), H.moss, 0, 8.8, 0, true).scale.y = 0.4;
        add(new T.CylinderGeometry(3.4, 3.4, 0.5, 20), H.glass, 0, 12.4, 0, false); add(new T.CylinderGeometry(2.8, 2.8, 0.3, 20), H.glowC, 0, 12.2, 0, false);
        for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; add(new T.BoxGeometry(2.6, 3, 0.3), H.win, Math.cos(a) * 14.05, 5.2, Math.sin(a) * 14.05, false).rotation.y = -a + Math.PI / 2; }
        P.person(g, P.civ(64040), 'idle', 3, 0.8, 8, 0); P.person(g, P.civ(64041), 'tablet', -4, 0.8, 7, Math.PI);
      } else if (type === 'HALL') {
        const w = 40, d = 30, h = 8; const dir = k === 0 ? 1 : k === 1 ? -1 : 0;   // which side the passage to the hub is on
        add(new T.BoxGeometry(w, 0.6, d), H.concrete2, 0, 0.3, 0, false);
        add(new T.BoxGeometry(w, h, d), H.concrete, 0, h / 2 + 0.6, 0, true);
        // the barrel roof, covered in grass like a bank of earth
        const roof = add(new T.CylinderGeometry(d / 2 + 1, d / 2 + 1, w + 1, 24, 1, false, 0, Math.PI).rotateZ(Math.PI / 2).rotateY(0), H.moss, 0, h + 0.6, 0, true); roof.scale.set(1, 0.34, 1); roof.rotation.y = 0;
        // glass wall on the side facing the forecourt, with the lit shelves behind it
        add(new T.BoxGeometry(w - 4, 5, 0.3), H.glass, 0, 4, d / 2 + 0.2, false); add(new T.BoxGeometry(w - 4.4, 4.6, 0.2), H.win, 0, 4, d / 2 - 0.1, false);
        for (let row = 0; row < 3; row++) for (let i = 0; i < 8; i++) { const x = -15 + i * 4.3, y = 1.6 + row * 1.7;
          add(new T.BoxGeometry(3.6, 0.15, 2.4), H.shelf, x, y, d / 2 - 2, false); add(new T.BoxGeometry(2.8, 1.0, 1.8), H.box[(i + row + k) % 5], x, y + 0.6, d / 2 - 2, false); }
        // the passage to the hub
        if (dir) { add(new T.BoxGeometry(27, 4.2, 6), H.concrete, dir * (w / 2 + 13.5), 2.7, 0, true); add(new T.BoxGeometry(28, 0.6, 7), H.moss, dir * (w / 2 + 13.5), 5, 0, false); }
        else { add(new T.BoxGeometry(6, 4.2, 9), H.concrete, 0, 2.7, d / 2 + 4.5, true); add(new T.BoxGeometry(7, 0.6, 9.5), H.moss, 0, 5, d / 2 + 4.5, false); }
        P.sign(api, g, k === 0 ? 'PLANTS OF UNITY' : k === 1 ? 'PLANTS OF EARTH' : 'THE EMPTY HALL · FOR WHAT GROWS NEXT', 16, 1.6, 0, h + 3.4, d / 2 + 0.5, 0, '#14322a', '#bff8d0', false);
        add(new T.BoxGeometry(0.2, 3, 0.2), H.steel, -7, h + 1.8, d / 2 + 0.5, false); add(new T.BoxGeometry(0.2, 3, 0.2), H.steel, 7, h + 1.8, d / 2 + 0.5, false);
        P.person(g, P.civ(64050 + k), 'tablet', -3 + k * 3, 0.8, d / 2 + 3.5, Math.PI * 0.1);
      }
    },
  }));
})();
