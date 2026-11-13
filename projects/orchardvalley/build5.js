/* ============================================================
   THE ORCHARD VALLEY · BUILD 5 · THE PACKING HOUSE, THE CIDER BARN & THE FIRST HARVEST
   Keep this file in projects/orchardvalley next to 66-orchardvalley.html.
   A packing house with a conveyor and a loading dock, and a long cider barn with a timber roof.
   Ends with L: the pickers walk in from the gate, the first baskets are filled, the lanterns light
   and the Orchard Valley is open.
   ============================================================ */
(function () {
  const P = window.ORV;
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 5, name: 'THE PACKING HOUSE, THE CIDER BARN & THE FIRST HARVEST',
    brief: 'A packing house with a loading dock and a long cider barn beside the road, east of the stream. Then the pickers come in from the gate and the first harvest begins.',
    types: {
      PACKHOUSE: { code: 'SY', name: 'PACKING HOUSE', col: '#ffd9a0', w: 46, d: 28, h: 14 },
      BARN:      { code: 'HM', name: 'CIDER BARN',    col: '#c8a070', w: 52, d: 30, h: 17 },
    },
    order: ['PACKHOUSE', 'BARN'],
    at: { PACKHOUSE: [[1550 + 205, -70]], BARN: [[1550 + 205, 70]] },
    eye: [1550 + 120, P.SY + 90, 200],
    stats(api, c) { return [['PACKING HOUSE', c('PACKHOUSE') ? 'WORKING' : 'NOT YET'], ['CIDER BARN', c('BARN') ? 'STANDING' : 'NOT YET'], ['THE ORCHARD VALLEY', api.flag('orchardvalley') ? 'OPEN' : 'NOT YET']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, H = P.ov(api);
      if (type === 'PACKHOUSE') {
        add(new T.BoxGeometry(46, 0.5, 28), H.stone, 0, 0.25, 0, false);
        add(new T.BoxGeometry(40, 7, 20), H.wall, 0, 4, 0, true);
        const rf = add(new T.CylinderGeometry(12, 12, 42, 3, 1, false, Math.PI / 2).rotateZ(Math.PI / 2), H.roof, 0, 7.5 + 12 * 0.5 * 0.4, 0, true); rf.scale.y = 0.4;
        // a loading dock with a canopy on the south side, crates of fruit and a conveyor
        add(new T.BoxGeometry(30, 1.2, 6), H.timber, 0, 0.9, 13, false); add(new T.BoxGeometry(32, 0.4, 7), H.roof2, 0, 5.8, 13.4, false);
        for (const x of [-14, 14]) add(new T.BoxGeometry(0.5, 5, 0.5), H.timber2, x, 3, 15.8, false);
        for (let i = 0; i < 8; i++) { add(new T.BoxGeometry(2.4, 1.3, 1.8), H.timber, -12 + i * 3.2, 2.2, 13 + (i % 2), false); add(new T.SphereGeometry(0.5, 6, 5), [H.apple, H.pear, H.plum][i % 3], -12 + i * 3.2, 3.1, 13 + (i % 2), false); }
        add(new T.BoxGeometry(14, 0.6, 1.6), H.dark, 14, 1.8, -12, false); for (let i = 0; i < 5; i++) add(new T.SphereGeometry(0.4, 6, 5), H.apple, 8 + i * 2.5, 2.4, -12, false);
        for (let x = -14; x <= 14; x += 7) add(new T.BoxGeometry(3, 2.4, 0.2), H.win, x, 4.6, 10.1, false);
        add(new T.BoxGeometry(5, 4.6, 0.3), H.door, -4, 2.6, 10.1, false);
        P.sign(api, g, 'PACKING HOUSE', 12, 1.5, 0, 8.6, 10.4, 0, '#2a3a1a', '#fff0c0', false);
        P.person(g, P.civ(66500), 'tablet', -6, 1.2, 15.2, 0); P.person(g, P.civ(66501), 'idle', 8, 0.4, 17, Math.PI);
      } else if (type === 'BARN') {
        add(new T.BoxGeometry(52, 0.5, 30), H.stone, 0, 0.25, 0, false);
        add(new T.BoxGeometry(46, 8, 22), H.wall2, 0, 4.5, 0, true);
        const rf = add(new T.CylinderGeometry(14, 14, 50, 3, 1, false, Math.PI / 2).rotateZ(Math.PI / 2), H.roof2, 0, 8.5 + 14 * 0.5 * 0.45, 0, true); rf.scale.y = 0.45;
        // big timber doors, cask stacks and a chimney
        add(new T.BoxGeometry(10, 6.4, 0.3), H.timber2, 0, 3.7, 11.2, false); add(new T.BoxGeometry(0.4, 6.4, 0.35), H.timber, 0, 3.7, 11.4, false);
        for (const s of [-1, 1]) for (let i = 0; i < 3; i++) add(new T.CylinderGeometry(1.6, 1.6, 2.4, 12).rotateX(Math.PI / 2), H.timber, s * (11 + i * 3.4), 2.1, 14, false);
        for (let i = 0; i < 3; i++) add(new T.SphereGeometry(0.5, 6, 5), H.red, -14 + i * 2, 0.9, 18, false);
        add(new T.BoxGeometry(2.4, 6, 2.4), H.stone, 14, 12, -5, true);
        for (const x of [-16, 16]) add(new T.BoxGeometry(3, 2.6, 0.2), H.win, x, 5.4, 11.2, false);
        for (let i = 0; i < 9; i++) { const x = -20 + i * 5; add(new T.SphereGeometry(0.34, 6, 5), i % 2 ? H.lamp : H.glowA, x, 7.2, 12.4, false); }
        P.sign(api, g, 'CIDER BARN', 10, 1.4, 0, 9.6, 11.6, 0, '#2a3a1a', '#fff0c0', false);
        P.person(g, P.civ(66510), 'idle', 4, 0.4, 14, Math.PI);
      }
    },
    tick(api, dt, t) {
      if (api.flag('opened') && !document.getElementById('nextMeeting')) {
        const b = document.createElement('button'); b.id = 'nextMeeting';
        b.innerHTML = 'GO TO THE THIRTY-FOURTH COUNCIL MEETING ▶<small style="display:block;font-weight:400;font-size:10px;letter-spacing:2px;color:#e8ffd0;margin-top:3px">THE ORCHARD VALLEY</small>';
        b.style.cssText = 'position:fixed;left:50%;bottom:22px;transform:translateX(-50%);z-index:9;padding:10px 22px;font:600 14px "Segoe UI",Arial;letter-spacing:3px;color:#fff;background:rgba(60,110,40,.88);border:1px solid #e8ffd0;border-radius:5px;cursor:pointer;text-align:center';
        b.onmouseenter = () => b.style.background = 'rgba(80,140,52,.97)'; b.onmouseleave = () => b.style.background = 'rgba(60,110,40,.88)';
        b.onclick = () => { location.href = 'councilmeeting/councilmeeting34.html'; };
        document.body.appendChild(b);
      }
    },
    finish: {
      label: 'THE FIRST HARVEST',
      cam: [[1550 + 120, P.SY + 55, 150], [1550 - 20, P.SY + 6, 0]],
      start(api) {
        this.stage = 0; this.t1 = 0; this._fam = false;
        const par = api.placed.find(p => p.type === 'PACKHOUSE' && p.piece); this.par = par ? par.piece.parent : null;
        P.ring && P.ring(2);
      },
      update(api, dt, f) {
        this.t1 += dt;
        if (this.stage === 0) {
          P.hint('THE PICKERS WALK IN FROM THE GATE WITH THEIR BASKETS');
          if (!this._fam && this.par) {
            this._fam = true; const gx = P.OFF[0] + 1550 - 240;
            for (let i = 0; i < 6; i++) { const sx = gx - i * 2.2, sz = P.OFF[1] + (i % 2 ? 3 : -3), y = P.gy(sx, sz), tx = P.OFF[0] + 1550 + [-195, -100, -5, -195, -100, -5][i], tz = P.OFF[1] + (i < 3 ? -22 : 22);
              P.person(this.par, P.civ(66400 + i), 'walk', sx, y, sz, 0, { path: { type: 'line', ax: sx, az: sz, bx: tx, bz: tz, speed: 2.2 } }); }
          }
          if (this.t1 > 12) { this.stage = 1; this.t1 = 0; }
        } else if (this.stage === 1) {
          P.hint('THE FIRST BASKETS ARE FILLED · THE BEES ARE AT WORK · THE LANTERNS LIGHT');
          if (this.t1 > 9) { this.stage = 2; this.t1 = 0; P.hint(''); P.cover(true, 'THE ORCHARD VALLEY IS OPEN', 'THE ROAD · THE STREAM · THE ORCHARDS · THE BEES · THE SEED FIELDS · THE PACKING HOUSE · NEXT: THE THIRTY-FOURTH COUNCIL MEETING'); }
        } else {
          if (this.t1 > 4 && !this._h) { this._h = true; api.setFlag('orchardvalley', true); api.setFlag('opened', true); }
          if (this.t1 > 6.5) { P.cover(false); this._h = false; return true; }
        }
        return false;
      },
    },
  }));
})();
