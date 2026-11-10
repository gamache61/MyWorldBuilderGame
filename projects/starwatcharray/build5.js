/* ============================================================
   THE STARWATCH ARRAY · BUILD 5 · THE SOLAR FIELDS, THE LODGE & THE FIRST LISTENING
   Keep this file in projects/starwatcharray next to 54-starwatcharray.html.
   Two solar fields to power the array, and a lodge where the listeners
   sleep by day. Ends with L: the first listening — the beacon says
   hello to the sky, and something answers.
   ============================================================ */
(function () {
  const P = window.YARD;
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 5, name: 'THE SOLAR FIELDS, THE LODGE & THE FIRST LISTENING',
    brief: 'Two solar fields to power the array and a lodge where the listeners sleep by day — then the first listening: the beacon says hello to the sky.',
    types: {
      SOLAR: { code: 'SY', name: 'SOLAR FIELD', col: '#2f4f80', w: 120, d: 70, h: 12 },
      LODGE: { code: 'SY', name: 'LISTENERS’ LODGE', col: '#b08a60', w: 80, d: 40, h: 16 },
    },
    order: ['SOLAR', 'LODGE'],
    at: { SOLAR: [[1250, -400], [1850, -400]], LODGE: [[1550, -430]] },
    eye: [1150, 190, 380],
    stats(api, c) { return [['SOLAR FIELDS', c('SOLAR') + ' / 2'], ['LISTENERS’ LODGE', c('LODGE') ? 'OPEN' : 'NOT YET'], ['FIRST LISTENING', api.flag('starwatch') ? 'DONE' : 'NOT YET']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, S = P.hm(api), C = P.fun(api);
      if (type === 'SOLAR') {
        add(new T.BoxGeometry(122, 0.6, 72), S.gravel, 0, 0.3, 0);
        const pm = P._solar = P._solar || new T.MeshStandardMaterial({ color: 0x1d3f7a, roughness: 0.25, metalness: 0.6 });
        for (let r = 0; r < 4; r++) for (let c = 0; c < 8; c++) { const p = add(new T.BoxGeometry(12, 0.5, 8), pm, -52 + c * 15, 4.5, -26 + r * 17); p.rotation.x = -0.5; add(new T.BoxGeometry(0.6, 4, 0.6), F.steel, -52 + c * 15, 2.2, -26 + r * 17); }
        P.person(g, P.civ(54500 + k), 'tablet', 64, 0.6, 30, Math.PI);
      } else {
        add(new T.BoxGeometry(82, 1, 42), S.gravel, 0, 0.5, 0);
        add(new T.BoxGeometry(72, 9, 30), new T.MeshStandardMaterial({ color: 0xb89870, roughness: 0.8 }), 0, 6, 0);
        const roof = add(new T.CylinderGeometry(20, 20, 76, 3, 1).rotateZ(Math.PI / 2), S.slate, 0, 14, 0); roof.scale.set(1, 0.38, 0.9);
        for (let x = -28; x <= 28; x += 14) add(new T.BoxGeometry(6, 4, 0.4), S.glass, x, 7, 15.2);
        P.sign(api, g, 'LISTENERS’ LODGE · SHHH, DAY SLEEPERS', 30, 3, 0, 18, 15.6, 0, '#14324a', '#ffe9b8', true);
        for (let i = 0; i < 3; i++) P.person(g, P.civ(54600 + i), i % 2 ? 'idle' : 'tablet', -14 + i * 14, 1, 24, Math.PI);
      }
    },
    tick(api, dt, t) {
      if (api.flag('opened') && !document.getElementById('nextMeeting')) {
        const b = document.createElement('button'); b.id = 'nextMeeting';
        b.innerHTML = 'GO TO THE TWENTY-FOURTH COUNCIL MEETING ▶<small style="display:block;font-weight:400;font-size:10px;letter-spacing:2px;color:#c8ecff;margin-top:3px">THE STRANGER ANSWERS</small>';
        b.style.cssText = 'position:fixed;left:50%;bottom:22px;transform:translateX(-50%);z-index:9;padding:10px 22px;font:600 14px "Segoe UI",Arial;letter-spacing:3px;color:#fff;background:rgba(20,60,100,.85);border:1px solid #80d8ff;border-radius:5px;cursor:pointer';
        b.onmouseenter = () => b.style.background = 'rgba(30,80,130,.95)'; b.onmouseleave = () => b.style.background = 'rgba(20,60,100,.85)';
        b.onclick = () => { location.href = 'councilmeeting/councilmeeting24.html'; };
        document.body.appendChild(b);
      }
    },
    finish: {
      label: 'FIRST LISTENING',
      cam: [[1000, 170, 520], [1550, 120, 0]],
      start(api) {
        this.stage = 0; this.t1 = 0; P.ring && P.ring(2);
        const T = api.THREE, par = (api.placed.find(p => p.piece && p.piece.parent) || {}).piece; if (!par) return;
        const grp = new T.Group(); par.parent.add(grp); this.grp = grp; this.y0 = api.DECK_TOP;
        const bm = (c, o = 0) => new T.MeshBasicMaterial({ color: c, transparent: true, opacity: o, blending: T.AdditiveBlending, depthWrite: false, toneMapped: false, side: T.DoubleSide });
        // a beam from every dish and one thick beam from the beacon, rising to the sky
        this.beams = [];
        P.dishPos.forEach(([x, z]) => { const m = new T.Mesh(new T.CylinderGeometry(1.6, 4, 700, 10, 1, true), bm(new T.Color(0.4, 1.2, 1.8))); m.position.set(x, this.y0 + 350 + 40, z); grp.add(m); this.beams.push(m); });
        this.bb = new T.Mesh(new T.CylinderGeometry(3, 8, 1400, 12, 1, true), bm(new T.Color(1.2, 0.8, 2.0))); this.bb.position.set(1550, this.y0 + 700 + 120, 110); grp.add(this.bb);
        // pulse rings that spread out from the beacon lens
        this.rings = []; for (let i = 0; i < 5; i++) { const r = new T.Mesh(new T.TorusGeometry(1, 0.35, 6, 48), bm(new T.Color(1.0, 0.7, 2.0))); r.rotation.x = Math.PI / 2; r.position.set(1550, this.y0 + 122, 110); grp.add(r); this.rings.push(r); }
        // the answer: a far light in the sky that blinks back, then a steady glow
        this.ans = new T.Mesh(new T.SphereGeometry(7, 14, 10), bm(new T.Color(2.0, 1.6, 0.6), 0)); this.ans.position.set(1550, this.y0 + 760, -1700); grp.add(this.ans);
        this.halo = new T.Mesh(new T.SphereGeometry(22, 14, 10), bm(new T.Color(1.0, 0.7, 0.2), 0)); this.halo.position.copy(this.ans.position); grp.add(this.halo);
      },
      update(api, dt, f) {
        this.t1 += dt;
        const on = this.stage >= 0 && this.stage < 2 ? Math.min(1, this.t1 / 3) : (this.stage === 2 ? Math.max(0, 1 - this.t1 / 4) : 0);
        const pulse = 0.55 + Math.sin(f * 4) * 0.2;
        if (this.beams) { this.beams.forEach((m, i) => m.material.opacity = (this.stage < 2 ? Math.min(1, this.t1 / 3) : on) * 0.22 * (0.7 + Math.sin(f * 3 + i) * 0.3)); this.bb.material.opacity = on * 0.3 * pulse; }
        if (this.rings) this.rings.forEach((r, i) => { const u = ((f * 0.35 + i / 5) % 1); r.scale.setScalar(6 + u * 90); r.material.opacity = (this.stage < 2 ? 1 : on) * (1 - u) * 0.25; r.position.y = this.y0 + 122 + u * 25; });
        if (this.stage === 0) {
          P.hint('THE FIRST LISTENING · THE DISHES TURN TO THE SKY AND THE BEACON SAYS HELLO');
          if (this.t1 > 12) { this.stage = 1; this.t1 = 0; P.ring && P.ring(3); }
        } else if (this.stage === 1) {
          P.hint('...AND FAR OUT IN THE SKY, SOMETHING BLINKS BACK');
          const blink = this.t1 < 2 ? 0 : this.t1 < 10 ? (Math.floor((this.t1 - 2) * 1.5) % 4 < 3 ? 1 : 0) * ((this.t1 - 2) * 1.5 % 1 < 0.6 ? 1 : 0) : 1;
          this.ans.material.opacity = blink; this.halo.material.opacity = blink * 0.35;
          if (this.t1 > 14) { this.stage = 2; this.t1 = 0; P.hint(''); P.cover(true, 'THE STARWATCH ARRAY IS LISTENING', 'THE DISHES · THE LISTENING HALL · THE BEACON · THE OBSERVATORIES · THE SOLAR FIELDS · AND THE STRANGER HAS ANSWERED · NEXT: THE TWENTY-FOURTH COUNCIL MEETING'); }
        } else {
          if (this.t1 > 4 && !this._h) { this._h = true; api.setFlag('starwatch', true); api.setFlag('opened', true); }
          if (this.t1 > 6.5) { P.cover(false); this._h = false; return true; }
        }
        return false;
      },
    },
  }));
})();
