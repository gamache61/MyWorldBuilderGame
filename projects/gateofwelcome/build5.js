/* ============================================================
   THE GATE OF WELCOME · BUILD 5 · THE STRONG DOORS & THE GATE OPENS
   Keep this file in projects/gateofwelcome next to 61-gateofwelcome.html.
   Two strong armoured doors behind the Gate, kept open, and then the Gate opens for the first guests: the stranger's ship lands.
   ============================================================ */
(function () {
  const P = window.GATE;
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 5, name: 'THE STRONG DOORS & THE GATE OPENS',
    brief: 'Two great armoured doors behind the Gate, strong enough to hold a siege and always left open, then the Gate opens for its first guests: the stranger\'s ship comes down.',
    types: { BULWARK: { code: 'SY', name: 'STRONG DOOR', col: '#9aa3ad', w: 140, d: 26, h: 44 } },
    order: ['BULWARK'],
    at: { BULWARK: [[1420, -230], [1680, -230]] },
    eye: [1040, 190, 260],
    stats(api, c) { return [['STRONG DOORS', c('BULWARK') + ' / 2'], ['THE FIRST GUESTS', api.flag('gateofwelcome') ? 'WELCOMED' : 'NOT YET']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, S = P.hm(api), C = P.fun(api);
      add(new T.BoxGeometry(144, 1, 30), S.gravel, 0, 0.5, 0);
      for (const sx of [-1, 1]) { add(new T.BoxGeometry(44, 36, 22), F.armor, sx * 48, 19, 0); add(new T.BoxGeometry(48, 3, 26), F.steel, sx * 48, 38.5, 0); }
      add(new T.BoxGeometry(60, 10, 22), F.armor, 0, 40, 0);
      for (const sx of [-1, 1]) add(new T.BoxGeometry(22, 34, 3), F.dark, sx * 13, 18, 3);
      for (let i = 0; i < 6; i++) add(new T.BoxGeometry(44, 0.6, 22.2), F.steel, -48 + (i % 2) * 96, 6 + i * 5, 0);
      for (const sx of [-1, 1]) for (let i = 0; i < 3; i++) add(new T.SphereGeometry(1.2, 8, 6), F.lamp, sx * 48, 30, 11.4 - i * 0.01).position.x = sx * 48 + (i - 1) * 9;
      P.sign(api, g, 'THE STRONG DOORS · OPEN · BUT THEY COULD CLOSE', 60, 3.2, 0, 44, 11.5, 0, '#2a2f38', '#ffd9a0', true);
    },
    tick(api, dt, t) {
      if (api.flag('opened') && !document.getElementById('nextMeeting')) {
        const b = document.createElement('button'); b.id = 'nextMeeting';
        b.innerHTML = 'GO TO THE TWENTY-NINTH COUNCIL MEETING ▶<small style="display:block;font-weight:400;font-size:10px;letter-spacing:2px;color:#c8ecff;margin-top:3px">THE STRANGER STANDS ON UNITY</small>';
        b.style.cssText = 'position:fixed;left:50%;bottom:22px;transform:translateX(-50%);z-index:9;padding:10px 22px;font:600 14px "Segoe UI",Arial;letter-spacing:3px;color:#fff;background:rgba(20,60,100,.85);border:1px solid #80d8ff;border-radius:6px;cursor:pointer;text-align:center';
        b.onmouseenter = () => b.style.background = 'rgba(30,80,130,.95)'; b.onmouseleave = () => b.style.background = 'rgba(20,60,100,.85)';
        b.onclick = () => { location.href = 'councilmeeting/councilmeeting29.html'; };
        document.body.appendChild(b);
      }
    },
    finish: {
      label: 'OPEN THE GATE',
      cam: [[1200, 110, 400], [1650, 36, 40]],
      start(api) {
        this.stage = 0; this.t1 = 0; this.words = []; this.sayI = 0; this.next = 0; P.ring && P.ring(2);
        const T = api.THREE, par = (api.placed.find(p => p.piece && p.piece.parent) || {}).piece; if (!par) return;
        const grp = new T.Group(); par.parent.add(grp); grp.position.set(P.OFF[0], 0, P.OFF[1]); this.grp = grp; this.y0 = api.DECK_TOP;
        const bm = (c, o = 0) => new T.MeshBasicMaterial({ color: c, transparent: true, opacity: o, blending: T.AdditiveBlending, depthWrite: false, toneMapped: false, side: T.DoubleSide });
        this.mk = (text, col, size) => {
          const w = Math.max(256, text.length * 40), tex = api.canvasTex(w, 96, (g2, ww, hh) => { g2.clearRect(0, 0, ww, hh); g2.font = '700 54px "Segoe UI", Arial'; g2.textAlign = 'center'; g2.textBaseline = 'middle'; g2.shadowColor = col; g2.shadowBlur = 18; g2.fillStyle = '#fff'; g2.fillText(text, ww / 2, hh / 2); });
          const sp = new T.Sprite(new T.SpriteMaterial({ map: tex, transparent: true, opacity: 0, depthWrite: false, toneMapped: false })); sp.scale.set(size * w / 96, size, 1); grp.add(sp); return sp;
        };
        // the stranger's ship: an original faceted shard craft, small enough to land on a pad
        const metal = new T.MeshStandardMaterial({ color: 0xaab4c4, roughness: 0.3, metalness: 0.9, flatShading: true }), edge = bm(new T.Color(0.5, 1.6, 1.5), 0.9);
        const ship = new T.Group(); this.ship = ship;
        const core = new T.Mesh(new T.OctahedronGeometry(14), metal); core.scale.set(1.9, 0.55, 0.9); ship.add(core);
        for (let i = 0; i < 6; i++) { const sh = new T.Mesh(new T.OctahedronGeometry(4 + (i % 3) * 1.5), metal); const a = i / 6 * Math.PI * 2; sh.position.set(Math.cos(a) * 22, Math.sin(a * 2) * 3, Math.sin(a) * 9); sh.scale.set(1.5, 0.6, 0.8); sh.rotation.set(a, a * 2, 0); ship.add(sh); }
        const glow = new T.Mesh(new T.SphereGeometry(3.2, 12, 8), edge); glow.position.y = -4; ship.add(glow);
        this.thr = new T.Mesh(new T.CylinderGeometry(2, 9, 30, 12, 1, true), bm(new T.Color(0.4, 1.4, 1.4), 0.25)); this.thr.position.y = -18; ship.add(this.thr);
        ship.position.set(2000, this.y0 + 380, 420); grp.add(ship);
        this.beam = new T.Mesh(new T.CylinderGeometry(3, 9, 400, 12, 1, true), bm(new T.Color(1.5, 1.3, 0.6))); this.beam.position.set(1550, this.y0 + 220, 170); grp.add(this.beam);
        this.ring = []; for (let i = 0; i < 31; i++) { const a = i / 31 * Math.PI * 2; const m = new T.Mesh(new T.SphereGeometry(1.6, 10, 8), bm(new T.Color(1.9, 1.7, 0.7), 0)); m.position.set(1720 + Math.cos(a) * 20, this.y0 + 8 + (i % 3), 60 + Math.sin(a) * 20); grp.add(m); this.ring.push(m); }
      },
      update(api, dt, f) {
        this.t1 += dt; if (!this.ring) return this.t1 > 1;
        const ease = x => x * x * (3 - 2 * x);
        this.words.forEach(w => { w.t += dt; w.sp.position.y += dt * 6; w.sp.material.opacity = Math.max(0, Math.min(1, w.t / 1.2, (8 - w.t) / 2)); });
        this.words = this.words.filter(w => { if (w.t > 8) { this.grp.remove(w.sp); return false; } return true; });
        const on = this.stage === 0 ? Math.min(1, this.t1 / 3) : this.stage === 3 ? Math.max(0, 1 - this.t1 / 4) : 1;
        this.beam.material.opacity = on * 0.14 * (0.7 + Math.sin(f * 3) * 0.3);
        if (this.stage === 0) {
          P.hint('THE GATE OPENS · FAR ABOVE, A SHIP COMES DOWN');
          const k = Math.min(1, this.t1 / 14), e = ease(k);
          this.ship.position.set(2000 + (1720 - 2000) * e, this.y0 + 380 + (this.y0 + 15 - (this.y0 + 380)) * e, 420 + (60 - 420) * e); this.ship.rotation.y = Math.sin(f * 0.5) * 0.1 + (1 - e) * 0.6;
          this.thr.material.opacity = 0.25 * (1 - e * 0.7);
          if (this.t1 > 16) { this.stage = 1; this.t1 = 0; this.thr.material.opacity = 0; P.ring && P.ring(3); }
        } else if (this.stage === 1) {
          P.hint('THE SHIP SETS DOWN · THIRTY-ONE TRAVELLERS STEP OUT INTO THE LIGHT');
          const lit = Math.min(31, this.t1 * 3 | 0);
          this.ring.forEach((m, i) => m.material.opacity = i < lit ? 0.8 + Math.sin(f * 5 + i) * 0.2 : 0);
          if (this.t1 > 11) { this.stage = 2; this.t1 = 0; this.next = 0; this.said = ['THANK YOU FOR THE PLACE TO STAND', 'WE HAVE READ YOUR BOOKS · WE WOULD LIKE TO MEET YOUR PEOPLE']; this.sayI = 0; }
        } else if (this.stage === 2) {
          P.hint('THE QUIET ROOM IS READY · THE TABLE IS SET');
          this.ring.forEach((m, i) => m.material.opacity = 0.6 + Math.sin(f * 4 + i) * 0.25);
          if (this.t1 > this.next && this.sayI < this.said.length) { this.next = this.t1 + 4.8; const sp = this.mk(this.said[this.sayI], '#ffe08a', 7); sp.position.set(1720, this.y0 + 40 + this.sayI * 12, 60); this.words.push({ sp, t: 0 }); this.sayI++; }
          if (this.t1 > 12) { this.stage = 3; this.t1 = 0; P.hint(''); P.cover(true, 'THE GATE OF WELCOME IS OPEN', 'THE GREAT GATE · THE WELCOME HALL · THE LANDING PADS · THE QUIET ROOM · THE FOOD HALLS · THE STRONG DOORS · THE STRANGER HAS LANDED'); }
        } else {
          this.ring.forEach(m => m.material.opacity = Math.max(0, m.material.opacity - dt * 0.2));
          if (this.t1 > 4 && !this._h) { this._h = true; api.setFlag('gateofwelcome', true); api.setFlag('opened', true); }
          if (this.t1 > 6.5) { P.cover(false); this._h = false; return true; }
        }
        return false;
      },
    },
  }));
})();
