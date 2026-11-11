/* ============================================================
   THE GREAT LIBRARY OF UNITY · BUILD 5 · THE STAR GLOBES & THE FIRST BOOK
   Keep this file in projects/greatlibrary next to 60-greatlibrary.html.
   Two great lit globes of Earth and Unity at the Archive Tower, and the Library's first night: every story rises into the sky and the stranger reads.
   ============================================================ */
(function () {
  const P = window.LIB;
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 5, name: 'THE STAR GLOBES & THE FIRST BOOK',
    brief: 'Two great lit globes, one of Earth and one of Unity, at the foot of the Archive Tower — then the first night: every story rises into the sky, and the stranger reads.',
    types: { STARGLOBE: { code: 'SY', name: 'STAR GLOBE', col: '#9fd8ff', w: 44, d: 44, h: 56 } },
    order: ['STARGLOBE'],
    at: { STARGLOBE: [[1448, -200], [1652, -200]] },
    eye: [1050, 200, 330],
    stats(api, c) { return [['STAR GLOBES', c('STARGLOBE') + ' / 2'], ['THE FIRST BOOK', api.flag('greatlibrary') ? 'READ' : 'NOT YET']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, S = P.hm(api), C = P.fun(api);
      const tex = api.canvasTex(512, 256, (c, w, h) => { c.fillStyle = k ? '#2f7a60' : '#2a5f9a'; c.fillRect(0, 0, w, h);
        let s = 7 + k * 5; const r = () => (s = (s * 16807) % 2147483647) / 2147483647;
        for (let i = 0; i < 26; i++) { c.fillStyle = k ? (i % 2 ? '#7fb85a' : '#3f9a48') : (i % 2 ? '#4f9a48' : '#c8b068'); c.beginPath(); c.ellipse(r() * w, r() * h, 12 + r() * 40, 8 + r() * 20, r() * 3, 0, 7); c.fill(); }
        c.fillStyle = 'rgba(255,255,255,.55)'; c.fillRect(0, 0, w, 14); c.fillRect(0, h - 14, w, 14); });
      add(new T.BoxGeometry(46, 1, 46), S.gravel, 0, 0.5, 0);
      add(new T.CylinderGeometry(15, 18, 4, 20), S.stone, 0, 3, 0);
      add(new T.CylinderGeometry(5, 7, 12, 12), F.steel, 0, 11, 0);
      const globe = add(new T.SphereGeometry(15, 28, 20), new T.MeshStandardMaterial({ map: tex, roughness: 0.6, emissive: 0x335566, emissiveIntensity: 0.5 }), 0, 33, 0); globe.rotation.z = 0.4;
      const ring = add(new T.TorusGeometry(19, 0.7, 8, 40), F.gold, 0, 33, 0); ring.rotation.set(Math.PI / 2 + 0.4, 0, 0); ring.castShadow = false;
      const ring2 = add(new T.TorusGeometry(19, 0.4, 8, 40), F.gold, 0, 33, 0); ring2.rotation.set(0.4, 0, 0); ring2.castShadow = false;
      P.sign(api, g, k ? 'UNITY' : 'EARTH', 18, 3, 0, 5, 19.5, 0, '#2a2418', '#ffe9b0', true);
      for (let i = 0; i < 2; i++) P.person(g, P.kid(60400 + k * 3 + i), 'idle', -6 + i * 12, 1.1, 24, Math.PI);
    },
    tick(api, dt, t) {
      if (api.flag('opened') && !document.getElementById('nextMeeting')) {
        const b = document.createElement('button'); b.id = 'nextMeeting';
        b.innerHTML = 'GO TO THE TWENTY-EIGHTH COUNCIL MEETING ▶<small style="display:block;font-weight:400;font-size:10px;letter-spacing:2px;color:#c8ecff;margin-top:3px">THE STRANGER HAS READ OUR BOOKS</small>';
        b.style.cssText = 'position:fixed;left:50%;bottom:22px;transform:translateX(-50%);z-index:9;padding:10px 22px;font:600 14px "Segoe UI",Arial;letter-spacing:3px;color:#fff;background:rgba(20,60,100,.85);border:1px solid #80d8ff;border-radius:6px;cursor:pointer;text-align:center';
        b.onmouseenter = () => b.style.background = 'rgba(30,80,130,.95)'; b.onmouseleave = () => b.style.background = 'rgba(20,60,100,.85)';
        b.onclick = () => { location.href = 'councilmeeting/councilmeeting28.html'; };
        document.body.appendChild(b);
      }
    },
    finish: {
      label: 'THE FIRST BOOK',
      cam: [[1070, 150, 420], [1550, 150, -10]],
      start(api) {
        this.stage = 0; this.t1 = 0; this.next = 0; this.words = []; this.idx = 0; P.ring && P.ring(2);
        const T = api.THREE, par = (api.placed.find(p => p.piece && p.piece.parent) || {}).piece; if (!par) return;
        const grp = new T.Group(); par.parent.add(grp); grp.position.set(P.OFF[0], 0, P.OFF[1]); this.grp = grp; this.y0 = api.DECK_TOP;
        const bm = (c, o = 0) => new T.MeshBasicMaterial({ color: c, transparent: true, opacity: o, blending: T.AdditiveBlending, depthWrite: false, toneMapped: false, side: T.DoubleSide });
        this.mk = (text, col, size) => {
          const w = Math.max(256, text.length * 40), tex = api.canvasTex(w, 96, (g2, ww, hh) => { g2.clearRect(0, 0, ww, hh); g2.font = '700 54px "Segoe UI", Arial'; g2.textAlign = 'center'; g2.textBaseline = 'middle'; g2.shadowColor = col; g2.shadowBlur = 18; g2.fillStyle = '#fff'; g2.fillText(text, ww / 2, hh / 2); });
          const sp = new T.Sprite(new T.SpriteMaterial({ map: tex, transparent: true, opacity: 0, depthWrite: false, toneMapped: false })); sp.scale.set(size * w / 96, size, 1); grp.add(sp); return sp;
        };
        this.beam = new T.Mesh(new T.CylinderGeometry(3, 12, 700, 12, 1, true), bm(new T.Color(1.5, 1.3, 0.6))); this.beam.position.set(1550, this.y0 + 400, 0); grp.add(this.beam);
        this.ring = []; for (let i = 0; i < 31; i++) { const a = i / 31 * Math.PI * 2; const m = new T.Mesh(new T.SphereGeometry(4.2, 10, 8), bm(new T.Color(1.9, 1.7, 0.7), 0)); m.position.set(1550 + Math.cos(a) * 190, this.y0 + 330 + Math.sin(a) * 60, Math.sin(a) * 120 - 40); grp.add(m); this.ring.push(m); }
        this.said = [];
      },
      update(api, dt, f) {
        this.t1 += dt; if (!this.ring) return this.t1 > 1;
        const T = api.THREE, W = ['ONCE UPON A TIME', 'THE MAP OF UNITY', 'THE SONG OF THE SEA', 'HOW TO BUILD A HOME', 'THE FIRST GARDEN', 'A HISTORY OF EARTH', 'THE BOOK OF NAMES', 'WHERE THE RIVER GOES', 'LETTERS HOME', 'GOODNIGHT, UNITY'];
        this.words.forEach(w => { w.t += dt; w.sp.position.y += dt * 18; w.sp.position.x += Math.sin(w.t + w.ph) * dt * 6; w.sp.material.opacity = Math.max(0, Math.min(1, w.t / 1.2, (9 - w.t) / 2)); });
        this.words = this.words.filter(w => { if (w.t > 9) { this.grp.remove(w.sp); return false; } return true; });
        const on = this.stage === 0 ? Math.min(1, this.t1 / 3) : this.stage === 3 ? Math.max(0, 1 - this.t1 / 4) : 1;
        this.beam.material.opacity = on * 0.16 * (0.7 + Math.sin(f * 3) * 0.3);
        if (this.stage === 0) {
          P.hint('THE FIRST NIGHT · EVERY STORY IN THE LIBRARY RISES INTO THE SKY');
          if (this.t1 > this.next && this.idx < W.length) { this.next = this.t1 + 1.1; const sp = this.mk(W[this.idx], '#ffe08a', 18); sp.position.set(1550 + (Math.random() - 0.5) * 220, this.y0 + 90, (Math.random() - 0.5) * 70); this.words.push({ sp, t: 0, ph: Math.random() * 6 }); this.idx++; }
          if (this.t1 > 13) { this.stage = 1; this.t1 = 0; P.ring && P.ring(3); }
        } else if (this.stage === 1) {
          P.hint('...AND FAR ABOVE, THE STRANGER LIGHTS UP, ONE LIGHT FOR EVERY TRAVELLER');
          const lit = Math.min(31, this.t1 * 3.2 | 0);
          this.ring.forEach((m, i) => m.material.opacity = i < lit ? 0.7 + Math.sin(f * 5 + i) * 0.3 : 0);
          if (this.t1 > 11) { this.stage = 2; this.t1 = 0; this.next = 0; this.said = ['WE HAVE READ YOUR STORIES', 'MAY WE HOLD ONE PAGE']; this.sayI = 0; }
        } else if (this.stage === 2) {
          P.hint('THE STRANGER IS READING · THE LIBRARY HAS BEEN HEARD');
          this.ring.forEach((m, i) => m.material.opacity = 0.55 + Math.sin(f * 4 + i) * 0.25);
          if (this.t1 > this.next && this.sayI < this.said.length) { this.next = this.t1 + 4.5; const sp = this.mk(this.said[this.sayI], '#9fd8ff', 30); sp.position.set(1550, this.y0 + 200 + this.sayI * 44, -10); this.words.push({ sp, t: 0, ph: 0 }); this.sayI++; }
          if (this.t1 > 12) { this.stage = 3; this.t1 = 0; P.hint(''); P.cover(true, 'THE GREAT LIBRARY IS OPEN', 'THE GREAT HALL · THE READING ROOMS · THE ARCHIVE TOWER · THE READING GARDEN · THE STAR GLOBES · THE STRANGER HAS READ OUR BOOKS'); }
        } else {
          this.ring.forEach(m => m.material.opacity = Math.max(0, m.material.opacity - dt * 0.2));
          if (this.t1 > 4 && !this._h) { this._h = true; api.setFlag('greatlibrary', true); api.setFlag('opened', true); }
          if (this.t1 > 6.5) { P.cover(false); this._h = false; return true; }
        }
        return false;
      },
    },
  }));
})();
