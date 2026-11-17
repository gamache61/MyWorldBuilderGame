/* ============================================================
   THE HOUSE OF OCKNOG · BUILD 5 · THE LANTERN TOWER & OPENING DAY
   Keep this file in projects/houseofocknog next to 82-houseofocknog.html.
   A tall lantern tower beside the court, four lantern poles, and opening day: Sela-Oru walks in through the gate, her people cheer, and the lanterns rise.
   ============================================================ */
(function () {
  const P = window.PWP;
  const HX = 1550 - 1400, HZ = 1100;
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 5, name: 'THE LANTERN TOWER & OPENING DAY',
    brief: 'A tall clay lantern tower beside the court, four lantern poles on the court\u2019s edge, then opening day, when Sela-Oru walks in through the gate with her people and the lanterns rise over the House of Ocknog.',
    types: {
      TOWER: { code: 'FB', name: 'LANTERN TOWER', col: '#c08c5c', w: 16, d: 16, h: 56 },
      POLE:  { code: 'HP', name: 'LANTERN POLE',  col: '#f2c41a', w: 3, d: 3, h: 26 },
    },
    order: ['TOWER', 'POLE'],
    at: { TOWER: [[HX + 62, HZ + 112]], POLE: [[HX + 40, HZ - 100], [HX + 40, HZ + 100], [HX - 20, HZ - 108], [HX - 20, HZ + 108]] },
    eye: [HX + 250, (window.__HOUSE.Y || -85) + 200, HZ + 330],
    stats(api, c) { return [['LANTERN TOWER', c('TOWER') ? 'LIT' : 'NOT YET'], ['LANTERN POLES', c('POLE') + ' / 4'], ['THE HOUSE OF OCKNOG', api.flag('opened') ? 'OPEN' : 'NOT YET']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, O = P.ok(api);
      if (type === 'TOWER') {
        add(new T.CylinderGeometry(7.4, 8.6, 44, 20), O.clay, 0, 22, 0); for (let y = 8; y < 44; y += 9) add(new T.TorusGeometry(7.6 - y * 0.02, 0.5, 6, 24), O.clay2, 0, y, 0, false).rotation.x = Math.PI / 2;
        add(new T.CylinderGeometry(9.6, 8, 3, 20), O.stone, 0, 45.5, 0, false);
        add(new T.CylinderGeometry(5.4, 5.8, 8, 14), O.lamp, 0, 50, 0, false); add(new T.ConeGeometry(7, 7, 14), O.thatch, 0, 57.5, 0, false); add(new T.SphereGeometry(1.1, 8, 6), O.brass, 0, 62, 0, false);
        add(new T.BoxGeometry(1, 5, 3), O.dark, 8, 3, 0, false);
      } else if (type === 'POLE') {
        add(new T.CylinderGeometry(0.4, 0.55, 22, 6), O.dark, 0, 11, 0, false); add(new T.SphereGeometry(2, 10, 8), O.lamp, 0, 24, 0, false); add(new T.ConeGeometry(2.6, 1.8, 8), O.brass, 0, 26.6, 0, false);
        for (let i = 0; i < 3; i++) add(new T.BoxGeometry(0.3, 4, 1.6), O.cloth[(k + i) % 5], 0.3, 15 - i * 3.4, 1.8, false);
      }
    },
    finish: {
      label: 'OPENING DAY',
      cam: [[HX + 150, 220, HZ + 330], [HX - 60, 50, HZ]],
      start(api) { this.stage = 0; this.t1 = 0; this.mk = []; P.ring && P.ring(3); },
      update(api, dt, f) {
        this.t1 += dt; const T = api.THREE;
        if (this.stage === 0) {
          if (!this.sela) {
            const land = api.placed.find(p => p.piece && p.piece.parent), par = land ? land.piece.parent : null;
            if (par) {
              const x = HX + 118 + (window.PWP.OFF ? window.PWP.OFF[0] : 0), z = HZ + (window.PWP.OFF ? window.PWP.OFF[1] : 0), y = (window.__HOUSE.Y || 0) + 2.4;
              this.sela = P.alien(api, par, x + 50, y, z, -Math.PI / 2, { seed: 2099, mode: 'wave', scale: 1.1, elder: true });
              this.crowd = []; for (let i = 0; i < 7; i++) this.crowd.push(P.alien(api, par, x + 70 + (i % 3) * 7, y, z - 12 + i * 4, -Math.PI / 2, { seed: 2100 + i, mode: 'idle', scale: 1 }));
              this.x0 = x + 50; this.x1 = x - 30;
            }
          }
          const u = Math.min(1, this.t1 / 9);
          if (this.sela) { this.sela.position.x = this.x0 + (this.x1 - this.x0) * u; for (const c of this.crowd) c.position.x = c.position.x + (this.x1 + 40 - c.position.x) * Math.min(1, dt * 0.35); }
          P.hint(this.t1 < 9 ? 'SELA-ORU WALKS IN THROUGH THE GATE · HER PEOPLE FOLLOW' : 'THE LANTERNS RISE OVER THE HOUSE OF OCKNOG');
          if (this.t1 > 9 && this.crowd) for (const c of this.crowd) c.userData.mode = 'cheer';
          if (this.t1 > 15) { this.stage = 1; this.t1 = 0; P.hint(''); P.cover(true, 'THE HOUSE OF OCKNOG IS OPEN', 'A DOOR OF THEIR OWN IN KRYOS · SELA-ORU HAS A HOUSE ON UNITY'); }
        } else {
          if (this.t1 > 4 && !this._h) { this._h = true; api.setFlag('houseocknog', true); api.setFlag('opened', true); }
          if (this.t1 > 6.5) { P.cover(false); this._h = false; return true; }
        }
        return false;
      },
    },
    tick(api, dt, t) {
      if (api.flag('opened') && !document.getElementById('nextMeeting')) {
        const b = document.createElement('button'); b.id = 'nextMeeting';
        b.innerHTML = 'GO TO THE NEXT COUNCIL MEETING ▶<small style="display:block;font-weight:400;font-size:10px;letter-spacing:2px;color:#ffe3c0;margin-top:3px">THE HOUSE OF OCKNOG IS OPEN</small>';
        b.style.cssText = 'position:fixed;left:50%;bottom:22px;transform:translateX(-50%);z-index:9;padding:10px 22px;font:600 14px "Segoe UI",Arial;letter-spacing:3px;color:#fff;background:rgba(120,60,30,.88);border:1px solid #ffd9a0;border-radius:6px;cursor:pointer';
        b.onmouseenter = () => b.style.background = 'rgba(150,80,40,.96)'; b.onmouseleave = () => b.style.background = 'rgba(120,60,30,.88)';
        b.onclick = () => { location.href = 'councilmeeting/councilmeeting49.html'; };
        document.body.appendChild(b);
      }
    },
  }));
})();
