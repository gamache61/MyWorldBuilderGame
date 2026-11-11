/* ============================================================
   THE LANGUAGE HOUSE · BUILD 5 · THE THINKING MACHINES & THE FIRST WORDS
   Keep this file in projects/languagehouse next to 59-languagehouse.html.
   Two halls of thinking machines that learn every language they hear. Ends with L: the first words, spoken to the stranger and answered.
   ============================================================ */
(function () {
  const P = window.YARD;
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 5, name: 'THE THINKING MACHINES & THE FIRST WORDS',
    brief: 'Two halls of thinking machines that learn every language they hear — then the first words: Unity speaks to the stranger, and the stranger answers.',
    types: { MACHINEHALL: { code: 'SY', name: 'THINKING MACHINE HALL', col: '#5fe8d8', w: 90, d: 70, h: 30 } },
    order: ['MACHINEHALL'],
    at: { MACHINEHALL: [[1550, -200], [1550, 200]] },
    eye: [1050, 200, 330],
    stats(api, c) { return [['MACHINE HALLS', c('MACHINEHALL') + ' / 2'], ['THE FIRST WORDS', api.flag('language') ? 'SPOKEN' : 'NOT YET']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, S = P.hm(api), C = P.fun(api);
      const glow = P._glow = P._glow || [0x7ffcff, 0x9f7bff, 0x6dffb0].map(c => new T.MeshBasicMaterial({ color: new T.Color(c).multiplyScalar(1.8), toneMapped: false }));
      add(new T.BoxGeometry(92, 1, 72), S.gravel, 0, 0.5, 0);
      add(new T.BoxGeometry(80, 24, 58), F.dark, 0, 13, 0);
      add(new T.BoxGeometry(84, 2, 62), S.slate, 0, 26, 0);
      for (let i = 0; i < 8; i++) { add(new T.BoxGeometry(5, 18, 0.5), glow[i % 3], -28 + i * 8, 13, 29.3).castShadow = false; add(new T.BoxGeometry(5, 18, 0.5), glow[(i + 1) % 3], -28 + i * 8, 13, -29.3).castShadow = false; }
      add(new T.CylinderGeometry(7, 9, 4, 14), F.steel, 0, 28, 0);
      const orb = add(new T.OctahedronGeometry(6), glow[k % 3], 0, 38, 0); orb.scale.set(0.9, 1.5, 0.9); orb.castShadow = false;
      add(new T.CylinderGeometry(0.5, 0.5, 8, 6), F.steel, 0, 32, 0);
      add(new T.BoxGeometry(16, 10, 1), F.dark, 0, 7, 29.6);
      P.sign(api, g, 'THINKING MACHINES · THEY LEARN EVERY TONGUE', 52, 3.6, 0, 20, 30.4, 0, '#14324a', '#c8ffd0', true);
      for (let i = 0; i < 3; i++) P.person(g, P.civ(59400 + k * 4 + i), i % 2 ? 'tablet' : 'idle', -10 + i * 10, 1.1, 38, Math.PI);
    },
    tick(api, dt, t) {
      if (api.flag('opened') && !document.getElementById('nextMeeting')) {
        const b = document.createElement('button'); b.id = 'nextMeeting';
        b.innerHTML = 'GO TO THE TWENTY-SIXTH COUNCIL MEETING ▶<small style="display:block;font-weight:400;font-size:10px;letter-spacing:2px;color:#c8ecff;margin-top:3px">THE STRANGER HAS SPOKEN</small>';
        b.style.cssText = 'position:fixed;left:50%;bottom:22px;transform:translateX(-50%);z-index:9;padding:10px 22px;font:600 14px "Segoe UI",Arial;letter-spacing:3px;color:#fff;background:rgba(20,60,100,.85);border:1px solid #80d8ff;border-radius:6px;cursor:pointer;text-align:center';
        b.onmouseenter = () => b.style.background = 'rgba(30,80,130,.95)'; b.onmouseleave = () => b.style.background = 'rgba(20,60,100,.85)';
        b.onclick = () => { location.href = 'councilmeeting/councilmeeting26.html'; };
        document.body.appendChild(b);
      }
    },
    finish: {
      label: 'THE FIRST WORDS',
      cam: [[1070, 150, 420], [1550, 150, -10]],
      start(api) {
        this.stage = 0; this.t1 = 0; this.next = 0; this.words = []; this.idx = 0; P.ring && P.ring(2);
        const T = api.THREE, par = (api.placed.find(p => p.piece && p.piece.parent) || {}).piece; if (!par) return;
        const grp = new T.Group(); par.parent.add(grp); this.grp = grp; this.y0 = api.DECK_TOP;
        const bm = (c, o = 0) => new T.MeshBasicMaterial({ color: c, transparent: true, opacity: o, blending: T.AdditiveBlending, depthWrite: false, toneMapped: false, side: T.DoubleSide });
        this.mk = (text, col, size) => {
          const w = Math.max(256, text.length * 40), tex = api.canvasTex(w, 96, (g2, ww, hh) => { g2.clearRect(0, 0, ww, hh); g2.font = '700 54px "Segoe UI", Arial'; g2.textAlign = 'center'; g2.textBaseline = 'middle'; g2.shadowColor = col; g2.shadowBlur = 18; g2.fillStyle = '#fff'; g2.fillText(text, ww / 2, hh / 2); });
          const sp = new T.Sprite(new T.SpriteMaterial({ map: tex, transparent: true, opacity: 0, depthWrite: false, toneMapped: false })); sp.scale.set(size * w / 96, size, 1); grp.add(sp); return sp;
        };
        this.beam = new T.Mesh(new T.CylinderGeometry(3, 12, 700, 12, 1, true), bm(new T.Color(0.4, 1.5, 1.4))); this.beam.position.set(1550, this.y0 + 400, 0); grp.add(this.beam);
        this.ring = []; for (let i = 0; i < 31; i++) { const a = i / 31 * Math.PI * 2; const m = new T.Mesh(new T.SphereGeometry(4.2, 10, 8), bm(new T.Color(1.9, 1.7, 0.7), 0)); m.position.set(1550 + Math.cos(a) * 190, this.y0 + 330 + Math.sin(a) * 60, Math.sin(a) * 120 - 40); grp.add(m); this.ring.push(m); }
        this.said = [];
      },
      update(api, dt, f) {
        this.t1 += dt; if (!this.ring) return this.t1 > 1;
        const T = api.THREE, W = ['HELLO', 'BONJOUR', 'HOLA', 'CIAO', 'NAMASTE', 'SHALOM', 'SALAAM', 'HEJ', 'ALOHA', 'MERHABA', 'AHOY', 'WELCOME'];
        this.words.forEach(w => { w.t += dt; w.sp.position.y += dt * 18; w.sp.position.x += Math.sin(w.t + w.ph) * dt * 6; w.sp.material.opacity = Math.max(0, Math.min(1, w.t / 1.2, (9 - w.t) / 2)); });
        this.words = this.words.filter(w => { if (w.t > 9) { this.grp.remove(w.sp); return false; } return true; });
        const on = this.stage === 0 ? Math.min(1, this.t1 / 3) : this.stage === 3 ? Math.max(0, 1 - this.t1 / 4) : 1;
        this.beam.material.opacity = on * 0.16 * (0.7 + Math.sin(f * 3) * 0.3);
        if (this.stage === 0) {
          P.hint('THE FIRST WORDS · THE HOUSE SPEAKS TO THE STRANGER IN EVERY TONGUE IT KNOWS');
          if (this.t1 > this.next && this.idx < W.length) { this.next = this.t1 + 0.9; const sp = this.mk(W[this.idx], '#7ffcff', 26); sp.position.set(1550 + (Math.random() - 0.5) * 220, this.y0 + 90, (Math.random() - 0.5) * 70); this.words.push({ sp, t: 0, ph: Math.random() * 6 }); this.idx++; }
          if (this.t1 > 13) { this.stage = 1; this.t1 = 0; P.ring && P.ring(3); }
        } else if (this.stage === 1) {
          P.hint('...AND FAR ABOVE, THE STRANGER ANSWERS IN LIGHTS');
          const lit = Math.min(31, this.t1 * 3.2 | 0);
          this.ring.forEach((m, i) => m.material.opacity = i < lit ? 0.7 + Math.sin(f * 5 + i) * 0.3 : 0);
          if (this.t1 > 11) { this.stage = 2; this.t1 = 0; this.next = 0; this.said = ['WE ARE THIRTY-ONE', 'WE ASK ONLY A PLACE TO STAND']; this.sayI = 0; }
        } else if (this.stage === 2) {
          P.hint('THE THINKING MACHINES READ THE LIGHTS · THE STRANGER IS SPEAKING');
          this.ring.forEach((m, i) => m.material.opacity = 0.55 + Math.sin(f * 4 + i) * 0.25);
          if (this.t1 > this.next && this.sayI < this.said.length) { this.next = this.t1 + 4.5; const sp = this.mk(this.said[this.sayI], '#ffe08a', 34); sp.position.set(1550, this.y0 + 200 + this.sayI * 44, -10); this.words.push({ sp, t: 0, ph: 0 }); this.words[this.words.length - 1].sp.position.y -= 0; this.sayI++; }
          if (this.t1 > 12) { this.stage = 3; this.t1 = 0; P.hint(''); P.cover(true, 'THE LANGUAGE HOUSE IS OPEN', 'THE HOUSE OF WORDS · THE CLASSROOMS · THE LISTENING LIBRARY · THE SONG GARDEN · THE THINKING MACHINES · THE STRANGER HAS SPOKEN'); }
        } else {
          this.ring.forEach(m => m.material.opacity = Math.max(0, m.material.opacity - dt * 0.2));
          if (this.t1 > 4 && !this._h) { this._h = true; api.setFlag('language', true); api.setFlag('opened', true); }
          if (this.t1 > 6.5) { P.cover(false); this._h = false; return true; }
        }
        return false;
      },
    },
  }));
})();
