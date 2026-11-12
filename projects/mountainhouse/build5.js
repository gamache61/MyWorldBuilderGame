/* ============================================================
   MOUNTAIN HOUSE · BUILD 5 · THE STARGAZER DOME, THE HANGAR & MOVING IN
   Keep this file in projects/mountainhouse next to 63-mountainhouse.html.
   Two terrace gardens in front of the house and a small stargazer dome.
   Ends with L: the shuttle comes in from Kryos and settles onto the pad
   and the first guests walk up to the door. After that, G flies the shuttle.
   ============================================================ */
(function () {
  const P = window.MTN;
  P.padParent = (api) => { const s = api.placed.find(p => p.type === 'PAD' && p.piece); return s ? s.piece.parent : null; };
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 5, name: 'THE STARGAZER DOME, THE HANGAR & MOVING IN',
    brief: 'A small stargazer dome and a hangar for the shuttle beside the landing pad — then the shuttle brings the Builder up from Kryos, and the Builder walks in to their own home.',
    types: {
      HANGAR: { code: 'SF', name: 'SHUTTLE HANGAR', col: '#c8ced6', w: 32, d: 26, h: 12 },
      DOME:   { code: 'SY', name: 'STARGAZER DOME', col: '#c8b0ff', w: 26, d: 26, h: 16 },
    },
    order: ['HANGAR', 'DOME'],
    at: { HANGAR: [[1550 + 92, -8]], DOME: [[1550 - 80, -70]] },
    eye: [200, P.SY + 150, 200],
    stats(api, c) { return [['HANGAR', c('HANGAR') ? 'STANDING' : 'NOT YET'], ['STARGAZER DOME', c('DOME') ? 'STANDING' : 'NOT YET'], ['MOUNTAIN HOUSE', api.flag('mountainHouse') ? 'OPEN' : 'NOT YET']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, H = P.mh(api);
      if (type === 'HANGAR') {
        add(new T.BoxGeometry(32, 0.6, 26), H.stone, 0, 0.3, 0, false); add(new T.BoxGeometry(32, 10, 1), H.white, 0, 5.6, -12.5, true);
        for (const s2 of [-1, 1]) add(new T.BoxGeometry(1, 10, 26), H.white, s2 * 15.5, 5.6, 0, true);
        add(new T.BoxGeometry(34, 0.8, 28), H.roof, 0, 11, 0, true); add(new T.BoxGeometry(14, 0.3, 14), H.glowG, 0, 0.7, 0, false);
      } else if (type === 'DOME') {
        add(new T.CylinderGeometry(11, 12, 1, 24), H.stone, 0, 0.5, 0, false); add(new T.CylinderGeometry(9, 9, 6, 24), H.white, 0, 4, 0, true);
        add(new T.SphereGeometry(9.2, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2), H.white, 0, 7, 0, true);
        const sl2 = add(new T.BoxGeometry(2.4, 9, 6), H.dark, 4.5, 11, 0, false); sl2.rotation.z = -0.9;
        add(new T.CylinderGeometry(0.5, 0.6, 3, 8), H.steel, 0, 8.5, 0, false);
      }
    },
    tick(api, dt, t) {
      if (api.flag('opened') && !document.getElementById('nextMeeting')) {
        const b = document.createElement('button'); b.id = 'nextMeeting';
        b.innerHTML = 'GO TO THE THIRTY-FIRST COUNCIL MEETING ▶<small style="display:block;font-weight:400;font-size:10px;letter-spacing:2px;color:#ffe9c8;margin-top:3px">A HOUSE ON THE MOUNTAIN TOP</small>';
        b.style.cssText = 'position:fixed;left:50%;bottom:22px;transform:translateX(-50%);z-index:9;padding:10px 22px;font:600 14px "Segoe UI",Arial;letter-spacing:3px;color:#fff;background:rgba(40,90,70,.88);border:1px solid #bff8d0;border-radius:5px;cursor:pointer;box-shadow:0 0 18px rgba(191,248,208,.45)';
        b.onmouseenter = () => b.style.background = 'rgba(52,116,90,.97)'; b.onmouseleave = () => b.style.background = 'rgba(40,90,70,.88)';
        b.onclick = () => { location.href = 'councilmeeting/councilmeeting31.html'; };
        document.body.appendChild(b);
      }
    },
    finish: {
      label: 'MOVING IN',
      cam: [[1550 + 150, P.SY + 55, 150], [1550 + 10, P.SY + 6, -20]],
      start(api) {
        this.stage = 0; this.t1 = 0; this.ship = null; this._fam = false;
        const par = P.padParent(api); this.par = par; this.px = P.OFF[0] + P.PADL[0]; this.pz = P.OFF[1] + P.PADL[1]; this.py = P.gy(this.px, this.pz) + 1.3;
        P.F.on = false; if (window.__controls) window.__controls.enabled = true;
        if (!P.F.craft) { P.F.craft = P.craft(api); window.__scene.add(P.F.craft); const pc = api.placed.find(p => p.type === 'SHUTTLE' && p.piece); if (pc) pc.piece.visible = false; }
        this.ship = P.F.craft; this.ship.visible = true; P.F.park = null; this.ship.position.set(this.px, this.py + 150, this.pz);
        P.ring && P.ring(2);
      },
      update(api, dt, f) {
        this.t1 += dt;
        if (this.stage === 0) {
          P.hint('THE SHUTTLE COMES UP FROM KRYOS AND SETTLES ONTO THE NEW LANDING PAD');
          if (this.ship) { const k = Math.min(1, this.t1 / 11), e = 1 - Math.pow(1 - k, 2.4); this.ship.position.set(this.px + (1 - e) * 600, this.py + 2.2 + (1 - e) * 160, this.pz + (1 - e) * 200); this.ship.rotation.set(0, Math.PI - 0.3 * (1 - e), 0); }
          if (this.t1 > 12) { this.stage = 1; this.t1 = 0; }
        } else if (this.stage === 1) {
          P.hint('THE HATCH OPENS · THE BUILDER WALKS UP TO THE DOOR OF THE MOUNTAIN HOUSE');
          if (!this._fam && this.par) {
            this._fam = true; const dx = P.OFF[0] + 1550 + 10, dz = P.OFF[1] + 12;
            for (let i = 0; i < 1; i++) { const sx = this.px - 8 - i * 1.5, sz = this.pz + (i % 2 ? 9 : 12), ex = dx + 4 + (i % 3), ez = dz + (i - 2) * 2.4;
              P.person(this.par, P.civ(63400 + i), 'walk', sx, this.py, sz, Math.PI, { path: { type: 'line', ax: sx, az: sz, bx: ex, bz: ez, speed: 1.1 }, scale: undefined }); }
          }
          if (this.t1 > 16) { this.stage = 2; this.t1 = 0; P.hint(''); P.cover(true, 'MOUNTAIN HOUSE IS OPEN', 'SHUTTLE · HOUSE · TOWER · LANDING PAD · HANGAR · DOME · PRESS G TO FLY THE SHUTTLE · NEXT: THE THIRTY-FIRST COUNCIL MEETING'); }
        } else {
          if (this.t1 > 4 && !this._h) { this._h = true; api.setFlag('mountainHouse', true); api.setFlag('opened', true); }
          if (this.t1 > 6.5) { P.cover(false); this._h = false; P.F.yaw = Math.PI; P.parkAt('summit'); return true; }
        }
        return false;
      },
    },
  }));
})();
