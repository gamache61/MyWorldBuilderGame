/* ============================================================
   THE PARTS WORKS · BUILD 5 · THE SHIP-PARTS FOUNDRY, THE WAREHOUSE YARD & OPENING DAY
   Keep this file in projects/partsworks next to 72-partsworks.html.
   Ends with L: the Parts Works starts up and the first ship parts made on Unity roll out.
   ============================================================ */
(function () {
  const P = window.PWP;
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 5, name: 'THE SHIP-PARTS FOUNDRY, THE WAREHOUSE YARD & OPENING DAY',
    brief: 'The foundry that casts ship parts, three long warehouses and four trucks in the warehouse yard, then opening day, when the Parts Works starts up and the first parts made on Unity roll out.',
    types: {
      FOUNDRY:   { code: 'FB', name: 'SHIP-PARTS FOUNDRY', col: '#e8761a', w: 110, d: 70, h: 32 },
      WAREHOUSE: { code: 'FB', name: 'WAREHOUSE',          col: '#b8bec6', w: 80,  d: 46, h: 16 },
      TRUCK:     { code: 'HM', name: 'PARTS TRUCK',        col: '#2f6fb0', w: 10,  d: 4,  h: 5 },
    },
    order: ['FOUNDRY', 'WAREHOUSE', 'TRUCK'],
    at: {
      FOUNDRY: [[1550 + 175, -120]],
      WAREHOUSE: [[1550 + 135, 130], [1550 + 215, 130], [1550 + 175, 190]],
      TRUCK: [[-100, 60], [-30, 60], [50, 60], [130, 60]].map(([x, z]) => [1550 + x, z]),
    },
    eye: [1550 + 120, P.SY + 150, 300],
    stats(api, c) { return [['FOUNDRY', c('FOUNDRY') ? 'READY TO POUR' : 'NOT YET'], ['WAREHOUSES', c('WAREHOUSE') + ' / 3'], ['PARTS TRUCKS', c('TRUCK') + ' / 4'], ['THE PARTS WORKS', api.flag('opened') ? 'RUNNING' : 'NOT YET']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, H = P.pw(api);
      if (type === 'FOUNDRY') {
        add(new T.BoxGeometry(110, 1, 70), H.conc2, 0, 0.5, 0);
        add(new T.BoxGeometry(106, 22, 66), H.wall2, 0, 12, 0);
        add(new T.BoxGeometry(112, 1.4, 72), H.roof, 0, 23.7, 0);
        add(new T.BoxGeometry(70, 8, 30), H.roof2, 0, 28, -10);
        for (let i = 0; i < 4; i++) { add(new T.CylinderGeometry(2.4, 3, 30, 12), H.steel2, -36 + i * 24, 40, 18); add(new T.CylinderGeometry(2.0, 2.0, 1, 12), H.cool, -36 + i * 24, 55.4, 18, false); }   // clean vents: nothing but warm air
        add(new T.BoxGeometry(34, 12, 0.4), H.hot, -20, 12, 33.2, false); add(new T.BoxGeometry(36, 0.8, 0.8), H.dark, -20, 6, 33.5, false);
        add(new T.BoxGeometry(30, 12, 0.4), H.warm, 30, 12, 33.2, false);
        for (let i = 0; i < 5; i++) add(new T.BoxGeometry(5, 5, 0.4), H.win, -48 + i * 24, 19, 33.2, false);
        add(new T.BoxGeometry(14, 15, 0.5), H.dark, -55.2, 8.5, 0, false);
        for (let i = 0; i < 4; i++) { const p = add(new T.BoxGeometry(3, 1.6, 6), H.beam, -66 - i * 6, 1.8, -8 + i * 4, false); p.rotation.y = 0.3 * i; }   // finished ship parts coming out
        P.sign(api, g, 'SHIP-PARTS FOUNDRY', 44, 4.6, 0, 20.5, 33.6, 0, '#2a1a10', '#ffb24a');
        P.person(g, P.civ(72050), 'tablet', 40, 0.5, 40, 0);
      } else if (type === 'WAREHOUSE') {
        add(new T.BoxGeometry(80, 1, 46), H.conc2, 0, 0.5, 0);
        add(new T.BoxGeometry(76, 12, 42), H.wall, 0, 7, 0);
        add(new T.BoxGeometry(78, 1.2, 44), H.roof, 0, 13.4, 0);
        for (let i = 0; i < 4; i++) { add(new T.BoxGeometry(12, 9, 0.5), H.steel2, -27 + i * 18, 5.5, 21.2, false); add(new T.BoxGeometry(12, 0.5, 0.7), H.yellow, -27 + i * 18, 10.2, 21.4, false); }
        add(new T.BoxGeometry(70, 0.5, 0.6), H.blue, 0, 11.2, 21.4, false);
        P.sign(api, g, 'PARTS WAREHOUSE ' + ['A', 'B', 'C'][k], 30, 3.4, 0, 14.4, 21.2, 0, '#14242e', '#bff8d0');
        P.person(g, P.civ(72060 + k), 'idle', -34, 0.5, 26, 0);
      } else if (type === 'TRUCK') {
        const t = P.truck(api, add, H, 0, 0, 0, k % 2 ? H.blue : H.orange); g.add(t);
        for (let i = 0; i < 3; i++) { const c = add(new T.BoxGeometry(2.2, 1.8, 2.4), H.steel, -4 + i * 2.4, 3, 0, false); c.rotation.y = 0.1 * i; add(new T.BoxGeometry(2.3, 0.2, 2.5), H.cool, -4 + i * 2.4, 3.9, 0, false); }
      }
    },
    tick(api, dt, t) {
      const H = P._pw; if (H) { const f = 2.3 + 0.35 * Math.sin(t * 2.4); H.hot.color.setRGB(f + 0.3, f * 0.4, 0.2); H.warm.color.setRGB(f * 0.8, f * 0.33, 0.12); }
      if (api.flag('opened') && !document.getElementById('nextMeeting')) {
        const b = document.createElement('button'); b.id = 'nextMeeting';
        b.innerHTML = 'GO TO THE NEXT COUNCIL MEETING ▶<small style="display:block;font-weight:400;font-size:10px;letter-spacing:2px;color:#c8ecff;margin-top:3px">UNITY NOW MAKES ITS OWN SHIP PARTS</small>';
        b.style.cssText = 'position:fixed;left:50%;bottom:22px;transform:translateX(-50%);z-index:9;padding:10px 22px;font:600 14px "Segoe UI",Arial;letter-spacing:3px;color:#fff;background:rgba(20,80,60,.85);border:1px solid #9fffd8;border-radius:6px;cursor:pointer;text-transform:uppercase';
        b.onmouseenter = () => b.style.background = 'rgba(30,110,80,.95)'; b.onmouseleave = () => b.style.background = 'rgba(20,80,60,.85)';
        b.onclick = () => { location.href = 'councilmeeting/councilmeeting39.html'; };
        document.body.appendChild(b);
      }
    },
    finish: {
      label: 'OPENING DAY',
      cam: [[1100, 200, 560], [1550, 40, 0]],
      start(api) { this.stage = 0; this.t1 = 0; P.ring && P.ring(2); },
      update(api, dt, f) {
        this.t1 += dt;
        if (this.stage === 0) {
          P.hint('THE PARTS WORKS STARTS UP · THE MILL ROLLS · THE FOUNDRY POURS · THE FIRST PARTS MADE ON UNITY ROLL OUT');
          if (this.t1 > 10) { this.stage = 1; this.t1 = 0; P.hint(''); P.cover(true, 'THE PARTS WORKS IS RUNNING', 'THE BEAM MILL · THE MACHINE HALL · THE CIRCUIT WORKS · THE GLASS WORKS · THE FOUNDRY · THE WAREHOUSE YARD'); }
        } else {
          if (this.t1 > 4 && !this._h) { this._h = true; api.setFlag('partsworks', true); api.setFlag('opened', true); }
          if (this.t1 > 6.5) { P.cover(false); this._h = false; return true; }
        }
        return false;
      },
    },
  }));
})();
