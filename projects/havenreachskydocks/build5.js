/* ============================================================
   THE HAVENREACH SKY DOCKS · BUILD 5 · THE VISITING SHIPS & OPENING DAY
   Keep this file in projects/havenreachskydocks next to 48-havenreachskydocks.html.
   Three ships from the peaceful towns of Earth park at the dock arms:
   a freighter, a passenger liner and a repair tug. Ends with L:
   opening day — one more ship flies in from deep space, docks at the
   last berth and the Heartforge fills its tanks.
   ============================================================ */
(function () {
  const P = window.YARD;
  const SHIPS = { VTRADER: 'trader', VLINER: 'liner', VTUG: 'tug' };
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 5, name: 'THE VISITING SHIPS & OPENING DAY',
    brief: 'Three ships from the peaceful towns of Earth parked at the dock arms — a freighter, a passenger liner and a repair tug — then opening day.',
    types: {
      VTRADER: { code: 'FB', name: 'EARTH FREIGHTER', col: '#39465a', w: 20, d: 62, h: 22 },
      VLINER: { code: 'FB', name: 'PASSENGER LINER', col: '#f2f4f6', w: 16, d: 78, h: 18 },
      VTUG: { code: 'FB', name: 'REPAIR TUG', col: '#e8c13a', w: 12, d: 32, h: 12 },
    },
    order: ['VTRADER', 'VLINER', 'VTUG'],
    at: { VTRADER: [[-428, -140]], VLINER: [[-428, 140]], VTUG: [[668, -140]] },
    eye: [-200, 120, 360],
    stats(api, c) { return [['EARTH FREIGHTER', c('VTRADER') ? 'AT BERTH 1' : 'NOT YET'], ['PASSENGER LINER', c('VLINER') ? 'AT BERTH 2' : 'NOT YET'], ['REPAIR TUG', c('VTUG') ? 'AT BERTH 3' : 'NOT YET'], ['OPENING DAY', api.flag('skydocks') ? 'DONE' : 'NOT YET']]; },
    make(type, k, g, add, F, api, sl) {
      const s = P.craft(api, add, g, SHIPS[type], 0, 7, 0, Math.PI / 2);
      s.userData.isVisitor = true;
    },
    tick(api, dt, t) {
      for (const p of api.placed) if (p.piece && SHIPS[p.type]) p.piece.traverse(o => { if (o.userData.isVisitor) o.position.y = 7 + Math.sin(t * 0.9 + p.x * 0.01) * 0.35; });
      if (api.flag('opened') && !document.getElementById('nextMeeting')) {
        const b = document.createElement('button'); b.id = 'nextMeeting';
        b.innerHTML = 'GO TO THE TWENTY-FIRST COUNCIL MEETING ▶<small style="display:block;font-weight:400;font-size:10px;letter-spacing:2px;color:#c8ecff;margin-top:3px">THE COUNCIL ASKS THE KEEPER: IS ANYONE ELSE OUT THERE?</small>';
        b.style.cssText = 'position:fixed;left:50%;bottom:22px;transform:translateX(-50%);z-index:9;padding:10px 22px;font:600 14px "Segoe UI",Arial;letter-spacing:3px;color:#fff;background:rgba(20,60,100,.85);border:1px solid #80d8ff;border-radius:5px;cursor:pointer';
        b.onmouseenter = () => b.style.background = 'rgba(30,80,130,.95)'; b.onmouseleave = () => b.style.background = 'rgba(20,60,100,.85)';
        b.onclick = () => { location.href = 'councilmeeting/councilmeeting21.html'; };
        document.body.appendChild(b);
      }
    },
    finish: {
      label: 'OPENING DAY',
      cam: [[860, 110, 420], [668, -20, 140]],
      start(api) {
        this.stage = 0; this.t1 = 0; P.ring && P.ring(2);
        const T = api.THREE, par = (api.placed.find(p => p.piece && p.piece.parent) || {}).piece; if (!par) return;
        const root = par.parent, grp = new T.Group(); root.add(grp); this.grp = grp;
        const add = (geo, mat, x = 0, y = 0, z = 0, shadow = true, parent = grp) => { const m = new T.Mesh(geo, mat); m.position.set(x, y, z); m.castShadow = shadow; parent.add(m); return m; };
        this.ship = P.craft(api, add, grp, 'liner', 0, 0, 0, Math.PI / 2); this.ship.rotation.y = Math.PI / 2;
        this.home = new T.Vector3(668, api.DECK_TOP + 7, 140); this.from = new T.Vector3(2200, api.DECK_TOP + 420, 1500);
      },
      update(api, dt, f) {
        this.t1 += dt; const s = this.ship, h = this.home, o = this.from;
        if (s) {
          // fly in from far out in space, slowing down, and settle at the last berth
          const e = Math.min(1, f / 16), ease = 1 - Math.pow(1 - e, 3);
          s.position.set(h.x + (o.x - h.x) * (1 - ease), h.y + (o.y - h.y) * (1 - ease) + Math.sin(f * 1.1) * 0.3, h.z + (o.z - h.z) * (1 - ease));
          s.rotation.y = Math.PI / 2 + Math.atan2(o.x - h.x, o.z - h.z) * (1 - ease) * 0.0 + (1 - ease) * 0.9;
        }
        if (this.stage === 0) {
          P.hint('OPENING DAY · A SHIP FROM EARTH FLIES IN FROM DEEP SPACE TO THE LAST BERTH');
          if (this.t1 > 18) { this.stage = 1; this.t1 = 0; P.ring && P.ring(3); }
        } else if (this.stage === 1) {
          P.hint('THE HEARTFORGE FILLS THE FIRST SHIP · VISITORS LOOK DOWN ON UNITY FROM THE SKYDECK');
          if (this.t1 > 11) { this.stage = 2; this.t1 = 0; P.hint(''); P.cover(true, 'THE HAVENREACH SKY DOCKS ARE OPEN', 'THE DOCK ARMS · THE REPAIR HANGARS · THE FUEL BAYS · THE VISITORS’ HALL · THE GLASS SKYDECK · NEXT: THE TWENTY-FIRST COUNCIL MEETING'); }
        } else {
          if (this.t1 > 4 && !this._h) { this._h = true; api.setFlag('skydocks', true); api.setFlag('opened', true); }
          if (this.t1 > 6.5) { P.cover(false); this._h = false; return true; }
        }
        return false;
      },
    },
  }));
})();
