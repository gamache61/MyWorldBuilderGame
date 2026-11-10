/* ============================================================
   THE EARTH TRADE PORT · BUILD 5 · THE TRADE SHIPS & FIRST TRADE DAY
   Keep this file in projects/earthtradeport next to 46-earthtradeport.html.
   Two big ships from Earth with their decks stacked with containers.
   Ends with L: first trade day — a third ship arrives from far out at
   sea, ties up at the deep quay and the people of Unity welcome it.
   ============================================================ */
(function () {
  const P = window.YARD;
  const SEA = () => (window.SEA_Y !== undefined ? window.SEA_Y : -31);
  P.findTrade = (api, last) => { const l = api.placed.filter(q => q.type === 'TRADESHIP' && q.piece); const p = last ? l[l.length - 1] : l[0]; let s = null; if (p) p.piece.traverse(o => { if (o.userData.isTrade && !s) s = o; }); return s; };
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 5, name: 'THE TRADE SHIPS & FIRST TRADE DAY',
    brief: 'Two big trade ships from Earth tied up at the deep quays with their decks stacked with containers — then first trade day.',
    types: {
      TRADESHIP: { code: 'FB', name: 'EARTH TRADE SHIP', col: '#39465a', w: 22, d: 124, h: 40 },
    },
    order: ['TRADESHIP'],
    at: { TRADESHIP: [[-272, -1335], [-272, -1475]] },
    eye: [-380, 130, -1220],
    stats(api, c) { return [['TRADE SHIPS', c('TRADESHIP') + ' / 2'], ['FIRST TRADE DAY', api.flag('tradeport') ? 'DONE' : 'NOT YET']]; },
    make(type, k, g, add, F, api, sl) {
      const y0 = sl.y, s = P.ship(api, add, g, 'trade', 0, SEA() - y0 + 2.6, 0, -Math.PI / 2);
      s.userData.isTrade = true;
      P.sign(api, g, k ? 'UNITY TRADER' : 'EARTH TRADER', 16, 2.4, 0, 9, 0, 0, '#39465a', '#e8c13a', false);
    },
    tick(api, dt, t) {
      if (api.flag('opened') && !document.getElementById('nextMeeting')) {
        const b = document.createElement('button'); b.id = 'nextMeeting';
        b.innerHTML = 'GO TO THE TWENTIETH COUNCIL MEETING ▶<small style="display:block;font-weight:400;font-size:10px;letter-spacing:2px;color:#c8ecff;margin-top:3px">THE COUNCIL TALKS ABOUT FUEL</small>';
        b.style.cssText = 'position:fixed;left:50%;bottom:22px;transform:translateX(-50%);z-index:9;padding:10px 22px;font:600 14px "Segoe UI",Arial;letter-spacing:3px;color:#fff;background:rgba(20,60,100,.85);border:1px solid #80d8ff;border-radius:5px;cursor:pointer';
        b.onmouseenter = () => b.style.background = 'rgba(30,80,130,.95)'; b.onmouseleave = () => b.style.background = 'rgba(20,60,100,.85)';
        b.onclick = () => { location.href = 'councilmeeting/councilmeeting20.html'; };
        document.body.appendChild(b);
      }
      // the lift fans of the ships shimmer a little at the quay
      for (const last of [false, true]) { const s = P.findTrade(api, last); if (s && !s._arriving) s.rotation.x = Math.sin(t * 1.1 + (last ? 2 : 0)) * 0.012; }
    },
    finish: {
      label: 'FIRST TRADE DAY',
      cam: [[-430, 60, -1700], [-272, -20, -1475]],
      start(api) {
        this.stage = 0; this.t1 = 0; this.ship = P.findTrade(api, true); P.ring && P.ring(2);
        if (this.ship) { this.ship._arriving = true; this.z0 = this.ship.position.z; this.x0 = this.ship.position.x; }
        const par = this.ship && this.ship.parent; if (!par) return;
        this.px = par.getWorldPosition(new api.THREE.Vector3());
        for (let i = 0; i < 12; i++) P.person(par, i % 3 === 1 ? P.kid(46600 + i) : P.civ(46600 + i), 'idle', 18 + (i % 3) * 2.5, P.QDECK - this.px.y + 0.4 - 0.1, -30 + (i >> 1) * 3 + (i % 2), -Math.PI / 2, i % 3 === 1 ? { scale: 0.6 } : {});
      },
      update(api, dt, f) {
        this.t1 += dt; const s = this.ship;
        if (s) {
          // sail in from far out at sea along the quay, slowing down to tie up
          const e = Math.min(1, f / 15), ease = 1 - (1 - e) * (1 - e);
          s.position.z = this.z0 - 560 * (1 - ease); s.position.x = this.x0 + 40 * (1 - ease) * (1 - ease); s.rotation.y = -Math.PI / 2 + 0.1 * (1 - ease);
          s.position.y = Math.sin(f * 1.2) * 0.1 + (SEA() + 2.6 - (s.parent.getWorldPosition(new api.THREE.Vector3()).y));
        }
        if (this.stage === 0) {
          P.hint('FIRST TRADE DAY · A SHIP FROM EARTH SAILS IN TO THE DEEP QUAY');
          if (this.t1 > 16) { this.stage = 1; this.t1 = 0; P.ring && P.ring(3); }
        } else if (this.stage === 1) {
          P.hint('THE CRANES LIFT THE FIRST CONTAINERS · THE PEOPLE OF UNITY WELCOME EARTH');
          if (this.t1 > 11) { this.stage = 2; this.t1 = 0; P.hint(''); P.cover(true, 'THE EARTH TRADE PORT IS OPEN', 'THE DEEP QUAYS · THE CUSTOMS HALL · THE WAREHOUSES · THE ORE STORES · THE SKY RAIL SPUR · NEXT: THE TWENTIETH COUNCIL MEETING'); }
        } else {
          if (this.t1 > 4 && !this._h) { this._h = true; if (s) s._arriving = false; api.setFlag('tradeport', true); api.setFlag('opened', true); }
          if (this.t1 > 6.5) { P.cover(false); this._h = false; return true; }
        }
        return false;
      },
    },
  }));
})();
