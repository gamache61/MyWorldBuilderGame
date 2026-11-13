/* ============================================================
   THE HARVEST FESTIVAL GROUNDS · BUILD 5 · THE FEAST HALL, THE BONFIRE & THE FIRST FESTIVAL
   Keep this file in projects/harvestfestival next to 67-harvestfestival.html.
   A long timber feast hall and a great stone bonfire ring. Ends with L: the people
   walk in through the flower gate, the lanterns and the bonfire are lit, and the festival is open.
   ============================================================ */
(function () {
  const P = window.HFG;
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 5, name: 'THE FEAST HALL, THE BONFIRE & THE FIRST FESTIVAL',
    brief: 'A long timber feast hall with tables for hundreds and a great stone ring for the festival bonfire. Then the people walk in through the flower gate and the first Harvest Festival begins.',
    types: {
      FEASTHALL: { code: 'SY', name: 'FEAST HALL', col: '#e8d2b4', w: 64, d: 28, h: 16 },
      BONFIRE:   { code: 'HP', name: 'BONFIRE RING', col: '#e8761a', w: 26, d: 26, h: 8 },
    },
    order: ['FEASTHALL', 'BONFIRE'],
    at: { FEASTHALL: [[1550 + 130, -120]], BONFIRE: [[1550 + 130, 120]] },
    eye: [1550 + 90, P.SY + 90, 200],
    stats(api, c) { return [['FEAST HALL', c('FEASTHALL') ? 'STANDING' : 'NOT YET'], ['BONFIRE RING', c('BONFIRE') ? 'BUILT' : 'NOT YET'], ['THE HARVEST FESTIVAL', api.flag('harvestfestival') ? 'OPEN' : 'NOT YET']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, H = P.hf(api);
      if (type === 'FEASTHALL') {
        add(new T.BoxGeometry(64, 0.5, 28), H.stone, 0, 0.25, 0, false);
        add(new T.BoxGeometry(58, 8, 22), H.wall, 0, 4.5, 0, true);
        const rf = add(new T.CylinderGeometry(14.5, 14.5, 62, 3, 1, false, Math.PI / 2).rotateZ(Math.PI / 2), H.roof, 0, 8.5 + 14.5 * 0.5 * 0.45, 0, true); rf.scale.y = 0.45;
        for (let x = -28; x <= 28; x += 7) { add(new T.BoxGeometry(0.6, 8, 0.6), H.timber2, x, 4.5, 11.2, false); add(new T.BoxGeometry(3.4, 3, 0.2), H.win, x + 3.5, 5, 11.1, false); }
        add(new T.BoxGeometry(9, 6.4, 0.3), H.timber2, 0, 3.7, 11.2, false);
        for (const z of [-5, 0, 5]) { add(new T.BoxGeometry(48, 0.2, 1.8), H.timber, 0, 1.7, z * 0.8 + 0, false); }
        for (let i = -4; i <= 4; i++) add(new T.SphereGeometry(0.3, 6, 5), i % 2 ? H.lamp : H.glowA, i * 6, 9.2, 12.4, false);
        add(new T.BoxGeometry(2.4, 6, 2.4), H.stone, 22, 12, -5, true);
        P.sign(api, g, 'THE FEAST HALL', 14, 1.6, 0, 11.4, 11.8, 0, '#5a2a10', '#ffe9a0', false);
        P.person(g, P.civ(67500), 'idle', -8, 0.4, 14, Math.PI); P.person(g, P.civ(67501), 'idle', 9, 0.4, 14.5, Math.PI);
      } else if (type === 'BONFIRE') {
        add(new T.CylinderGeometry(12, 12.6, 1.2, 20), H.stone, 0, 0.6, 0, false);
        for (let i = 0; i < 16; i++) { const a = i / 16 * Math.PI * 2; add(new T.BoxGeometry(2.6, 1.8, 1.6), H.stone, Math.cos(a) * 9.5, 1.5, Math.sin(a) * 9.5, false).rotation.y = -a; }
        for (let i = 0; i < 9; i++) { const a = i / 9 * Math.PI * 2; const l = add(new T.CylinderGeometry(0.4, 0.4, 7, 6), H.timber2, Math.cos(a) * 1.3, 4, Math.sin(a) * 1.3, false); l.rotation.set(Math.sin(a) * 0.45, 0, -Math.cos(a) * 0.45); }
        for (let i = 0; i < 4; i++) add(new T.ConeGeometry(2.4 - i * 0.4, 5 - i * 0.6, 8), H.fire, 0, 3.5 + i * 1.5, 0, false);
        for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2 + 0.2; add(new T.BoxGeometry(5, 0.5, 1.4), H.timber, Math.cos(a) * 15, 0.7, Math.sin(a) * 15, false).rotation.y = -a + Math.PI / 2; }
        for (let i = 0; i < 4; i++) P.person(g, P.civ(67600 + i), 'idle', Math.cos(i * 1.6) * 12.5, 0.4, Math.sin(i * 1.6) * 12.5, i * 1.6 + Math.PI);
      }
    },
    tick(api, dt, t) {
      if (api.flag('opened') && !document.getElementById('nextMeeting')) {
        const b = document.createElement('button'); b.id = 'nextMeeting';
        b.innerHTML = 'GO TO THE THIRTY-FIFTH COUNCIL MEETING ▶<small style="display:block;font-weight:400;font-size:10px;letter-spacing:2px;color:#ffe9b0;margin-top:3px">THE HARVEST FESTIVAL GROUNDS</small>';
        b.style.cssText = 'position:fixed;left:50%;bottom:22px;transform:translateX(-50%);z-index:9;padding:10px 22px;font:600 14px "Segoe UI",Arial;letter-spacing:3px;color:#fff;background:rgba(150,80,20,.9);border:1px solid #ffe9b0;border-radius:5px;cursor:pointer;text-align:center';
        b.onmouseenter = () => b.style.background = 'rgba(190,105,30,.97)'; b.onmouseleave = () => b.style.background = 'rgba(150,80,20,.9)';
        b.onclick = () => { location.href = 'councilmeeting/councilmeeting35.html'; };
        document.body.appendChild(b);
      }
    },
    finish: {
      label: 'THE FIRST HARVEST FESTIVAL',
      cam: [[1550 + 40, P.SY + 70, 180], [1550 + 20, P.SY + 6, 0]],
      start(api) {
        this.stage = 0; this.t1 = 0; this._fam = false;
        const par = api.placed.find(p => p.type === 'FEASTHALL' && p.piece); this.par = par ? par.piece.parent : null;
        P.ring && P.ring(2);
      },
      update(api, dt, f) {
        this.t1 += dt;
        if (this.stage === 0) {
          P.hint('THE PEOPLE WALK IN THROUGH THE FLOWER GATE');
          if (!this._fam && this.par) {
            this._fam = true; const gx = P.OFF[0] + 1550 - 280;
            for (let i = 0; i < 10; i++) { const sx = gx - i * 2.4, sz = P.OFF[1] + (i % 2 ? 3 : -3), y = P.gy(sx, sz), tx = P.OFF[0] + 1550 + [-200, -150, -100, -50, 0, 60, 110, 110, 130, 130][i], tz = P.OFF[1] + [-30, 30, -30, 30, -30, 30, -12, 12, 100, -100][i];
              P.person(this.par, P.civ(67700 + i), 'walk', sx, y, sz, 0, { path: { type: 'line', ax: sx, az: sz, bx: tx, bz: tz, speed: 2.4 } }); }
          }
          if (this.t1 > 12) { this.stage = 1; this.t1 = 0; }
        } else if (this.stage === 1) {
          P.hint('THE LANTERNS LIGHT · THE CAROUSELS TURN · THE BONFIRE IS LIT');
          if (this.t1 > 9) { this.stage = 2; this.t1 = 0; P.hint(''); P.cover(true, 'THE HARVEST FESTIVAL IS OPEN', 'THE GREEN · THE STALLS · THE FOOD TENTS · THE STAGE · THE DANCING GREEN · THE FEAST HALL · NEXT: THE THIRTY-FIFTH COUNCIL MEETING'); }
        } else {
          if (this.t1 > 4 && !this._h) { this._h = true; api.setFlag('harvestfestival', true); api.setFlag('opened', true); }
          if (this.t1 > 6.5) { P.cover(false); this._h = false; return true; }
        }
        return false;
      },
    },
  }));
})();
