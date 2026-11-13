/* ============================================================
   THE GUESTS' QUARTER · BUILD 5 · THE KITCHEN, THE HALL & THE WELCOME
   Keep this file in projects/guestsquarter next to 65-guestsquarter.html.
   A shared kitchen with long tables under a vine pergola, and a round meeting hall
   with a dome. Ends with L: the shuttle brings the first guests down to the pad,
   they walk to the hall, the lanterns light and the Quarter is open.
   ============================================================ */
(function () {
  const P = window.GSQ;
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 5, name: 'THE KITCHEN, THE HALL & THE WELCOME',
    brief: 'A shared kitchen with long tables under a vine pergola and a round meeting hall with a timber dome, between the two halves of the Quarter. Then the first guests arrive.',
    types: {
      KITCHEN: { code: 'SY', name: 'SHARED KITCHEN', col: '#ffd9a0', w: 46, d: 24, h: 12 },
      HALL:    { code: 'HM', name: 'MEETING HALL',   col: '#e8c9a0', w: 44, d: 44, h: 16 },
    },
    order: ['KITCHEN', 'HALL'],
    at: { KITCHEN: [[1550 - 55, 0]], HALL: [[1550 + 55, 0]] },
    eye: [1550 + 140, P.SY + 90, 150],
    stats(api, c) { return [['SHARED KITCHEN', c('KITCHEN') ? 'COOKING' : 'NOT YET'], ['MEETING HALL', c('HALL') ? 'STANDING' : 'NOT YET'], ['THE GUESTS’ QUARTER', api.flag('guestsquarter') ? 'OPEN' : 'NOT YET']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, H = P.gq(api);
      if (type === 'KITCHEN') {
        add(new T.BoxGeometry(46, 0.5, 24), H.stone, 0, 0.25, 0, false);
        add(new T.BoxGeometry(40, 6, 12), H.walls[3], 0, 3.5, -4, true);
        const rf = add(new T.CylinderGeometry(7.6, 7.6, 42, 3, 1, false, Math.PI / 2).rotateZ(Math.PI / 2), H.roofs[0], 0, 6.5 + 7.6 * 0.5 * 0.5, -4, true); rf.scale.y = 0.5;
        for (const x of [-12, 8]) { add(new T.BoxGeometry(2.4, 5, 2.4), H.stone, x, 11, -6, true); add(new T.BoxGeometry(3, 0.5, 3), H.dark, x, 13.7, -6, false); }
        // the serving window and counter on the south side
        add(new T.BoxGeometry(18, 2.4, 0.3), H.win, -6, 4, 2.1, false); add(new T.BoxGeometry(19, 0.5, 1.6), H.timber, -6, 2.6, 2.6, false);
        for (const x of [-14, -6, 2]) add(new T.BoxGeometry(2.6, 2, 0.3), H.doors[(x + 20) % 6 | 0], x, 5.8, 2.2, false);
        add(new T.BoxGeometry(2.4, 4, 0.3), H.doors[0], 12, 2.5, 2.1, false);
        // a vine pergola with two long tables and benches
        for (const x of [-18, -2, 14]) for (const z of [6, 11]) add(new T.BoxGeometry(0.5, 6, 0.5), H.timber2, x, 3, z, false);
        for (let i = 0; i < 8; i++) add(new T.BoxGeometry(0.4, 0.4, 7), H.timber2, -19 + i * 4.6, 6.2, 8.5, false);
        add(new T.BoxGeometry(38, 0.3, 2), H.moss || H.leaf, 0, 6.5, 8.5, false);
        for (const z of [7, 10]) { add(new T.BoxGeometry(34, 0.3, 1.5), H.timber, -2, 2.1, z, false); for (const x of [-16, 0, 14]) add(new T.BoxGeometry(0.4, 2, 1.2), H.timber2, x, 1, z, false); }
        for (let i = 0; i < 7; i++) add(new T.SphereGeometry(0.3, 6, 5), i % 2 ? H.lamp : H.glowA, -17 + i * 5.6, 5.6, 8.5, false);
        P.sign(api, g, 'SHARED KITCHEN', 11, 1.4, -6, 8, 2.5, 0, '#3a2414', '#ffe3b0', false);
        P.person(g, P.civ(65500), 'tablet', -6, 0.5, -1.6, Math.PI); P.person(g, P.civ(65501), 'idle', 4, 0.5, 8.5, Math.PI * 0.5); P.person(g, P.civ(65502), 'idle', -12, 0.5, 8.5, -Math.PI * 0.5);
      } else if (type === 'HALL') {
        add(new T.CylinderGeometry(22, 22.6, 0.6, 40), H.stone, 0, 0.3, 0, false);
        add(new T.CylinderGeometry(19, 19, 8, 40), H.walls[0], 0, 4.6, 0, true);
        // a glass band all round with timber posts
        add(new T.CylinderGeometry(19.15, 19.15, 3.6, 40, 1, true), H.glass, 0, 4.8, 0, false);
        for (let i = 0; i < 24; i++) { const a = i / 24 * Math.PI * 2; add(new T.BoxGeometry(0.7, 8.2, 0.7), H.timber2, Math.cos(a) * 19.3, 4.6, Math.sin(a) * 19.3, false); }
        add(new T.CylinderGeometry(19.4, 19.4, 0.8, 40), H.timber, 0, 8.8, 0, false);
        const dome = add(new T.SphereGeometry(19.6, 40, 14, 0, Math.PI * 2, 0, Math.PI / 2), H.roofs[0], 0, 9, 0, true); dome.scale.y = 0.5;
        add(new T.CylinderGeometry(2.6, 3, 1.4, 16), H.timber2, 0, 18.5, 0, false); add(new T.SphereGeometry(1.6, 12, 8), H.lamp, 0, 19.7, 0, false);
        // the entrance on the south side, with steps
        add(new T.BoxGeometry(7, 5, 3), H.walls[1], 0, 3, 20, true); add(new T.BoxGeometry(4, 3.6, 0.3), H.doors[3], 0, 2.4, 21.6, false);
        for (let i = 0; i < 3; i++) add(new T.BoxGeometry(8 + i * 1.4, 0.3, 1.2), H.stone, 0, 0.55 - i * 0.12 + 0.4, 22.4 + i * 1.1, false);
        // seats in a ring inside, a table in the middle
        add(new T.CylinderGeometry(4.5, 4.5, 1.2, 24), H.timber, 0, 1.2, 0, false);
        for (let i = 0; i < 20; i++) { const a = i / 20 * Math.PI * 2; add(new T.BoxGeometry(2.2, 1.2, 1.6), H.doors[i % 6], Math.cos(a) * 11, 1.2, Math.sin(a) * 11, false).rotation.y = -a + Math.PI / 2; }
        // lantern strings and a flag
        for (let i = 0; i < 28; i++) { const a = i / 28 * Math.PI * 2; add(new T.SphereGeometry(0.34, 6, 5), i % 2 ? H.lamp : H.glowA, Math.cos(a) * 23.6, 3.2 + (i % 2) * 0.5, Math.sin(a) * 23.6, false); }
        add(new T.CylinderGeometry(0.15, 0.2, 14, 6), H.steel, 14, 7, -14, false); add(new T.BoxGeometry(4, 2.4, 0.1), H.doors[1], 16, 12.6, -14, false);
        P.sign(api, g, 'MEETING HALL', 10, 1.4, 0, 6.2, 21.8, 0, '#3a2414', '#ffe3b0', false);
        P.person(g, P.civ(65510), 'idle', 5, 0.5, 24, Math.PI); P.person(g, P.civ(65511), 'tablet', -6, 0.5, 25, Math.PI * 0.9);
      }
    },
    tick(api, dt, t) {
      if (api.flag('opened') && !document.getElementById('nextMeeting')) {
        const b = document.createElement('button'); b.id = 'nextMeeting';
        b.innerHTML = 'GO TO THE THIRTY-THIRD COUNCIL MEETING ▶<small style="display:block;font-weight:400;font-size:10px;letter-spacing:2px;color:#ffe9c8;margin-top:3px">THE GUESTS’ QUARTER</small>';
        b.style.cssText = 'position:fixed;left:50%;bottom:22px;transform:translateX(-50%);z-index:9;padding:10px 22px;font:600 14px "Segoe UI",Arial;letter-spacing:3px;color:#fff;background:rgba(140,80,40,.88);border:1px solid #ffe3b0;border-radius:5px;cursor:pointer;text-align:center';
        b.onmouseenter = () => b.style.background = 'rgba(170,100,52,.97)'; b.onmouseleave = () => b.style.background = 'rgba(140,80,40,.88)';
        b.onclick = () => { location.href = 'councilmeeting/councilmeeting33.html'; };
        document.body.appendChild(b);
      }
    },
    finish: {
      label: 'THE WELCOME',
      cam: [[1550 + 150, P.SY + 50, 120], [1550 + 20, P.SY + 6, 5]],
      start(api) {
        this.stage = 0; this.t1 = 0; this._fam = false; this.ship = null;
        const par = api.placed.find(p => p.type === 'PAD' && p.piece); this.par = par ? par.piece.parent : null;
        this.px = P.OFF[0] + 1550 + 170; this.pz = P.OFF[1] + 40; this.py = P.gy(this.px, this.pz) + 1.3;
        const M = window.MTN;
        if (M && M.craft) { if (!M.F.craft) { M.F.craft = M.craft(api); window.__scene.add(M.F.craft); } this.ship = M.F.craft; this.ship.visible = true; M.F.park = null; M.F.on = false; }
        P.ring && P.ring(2);
      },
      update(api, dt, f) {
        this.t1 += dt;
        if (this.stage === 0) {
          P.hint('THE SHUTTLE BRINGS THE FIRST GUESTS DOWN TO THE NEW PAD');
          if (this.ship) { const k = Math.min(1, this.t1 / 10), e = 1 - Math.pow(1 - k, 2.4); this.ship.position.set(this.px + (1 - e) * 500, this.py + 2.2 + (1 - e) * 150, this.pz + (1 - e) * 220); this.ship.rotation.set(0, Math.PI - 0.3 * (1 - e), 0); }
          if (this.t1 > 11) { this.stage = 1; this.t1 = 0; }
        } else if (this.stage === 1) {
          P.hint('THE GUESTS WALK THROUGH THE GATE TO THE MEETING HALL');
          if (!this._fam && this.par) {
            this._fam = true; const dx = P.OFF[0] + 1550 + 55, dz = P.OFF[1] + 26;
            for (let i = 0; i < 5; i++) { const sx = this.px - 8 - i * 1.5, sz = this.pz + (i % 2 ? 6 : 9), ex = dx - 4 + i * 2, ez = dz + (i % 2) * 2;
              P.person(this.par, P.civ(65400 + i), 'walk', sx, this.py, sz, Math.PI, { path: { type: 'line', ax: sx, az: sz, bx: ex, bz: ez, speed: 1.8 } }); }
          }
          if (this.t1 > 16) { this.stage = 2; this.t1 = 0; P.hint(''); P.cover(true, 'THE GUESTS’ QUARTER IS OPEN', 'THE GREEN · THE LANES · FORTY HOMES · THE KITCHEN · THE MEETING HALL · NEXT: THE THIRTY-THIRD COUNCIL MEETING'); }
        } else {
          if (this.t1 > 4 && !this._h) { this._h = true; api.setFlag('guestsquarter', true); api.setFlag('opened', true); }
          if (this.t1 > 6.5) { P.cover(false); this._h = false; const M = window.MTN; if (M && M.F) M.F.park = { x: this.px, y: this.py + 2.2, z: this.pz, yaw: Math.PI }; return true; }
        }
        return false;
      },
    },
  }));
})();
