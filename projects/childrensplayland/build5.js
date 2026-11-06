/* ============================================================
   THE CHILDREN'S PLAYLAND · BUILD 5 · THE CLUBHOUSE & OPENING DAY
   Keep this file in projects/childrensplayland next to childrensplayland.html.
   The children's own clubhouse, groves of shady trees, and the
   rainbow gate. Ends with L: opening day — families from the
   Homeward Fleet bring their children through the gate, the wheel
   and the carousel spin up, and the playland is open.
   ============================================================ */
(function () {
  const P = window.PLAY;
  P.hint = (text) => {
    let el = document.getElementById('playHint');
    if (!el) { el = document.createElement('div'); el.id = 'playHint'; el.style.cssText = 'position:fixed;left:50%;bottom:90px;transform:translateX(-50%);z-index:8;padding:8px 18px;background:rgba(8,20,35,.85);border:1px solid #ffd060;border-radius:5px;color:#fff;font:600 13px "Segoe UI",Arial;letter-spacing:3px;text-align:center;pointer-events:none'; document.body.appendChild(el); }
    el.style.display = text ? 'block' : 'none'; if (text) el.textContent = text;
  };
  P.cover = (on, a, b) => {
    let el = document.getElementById('playCover');
    if (!el) { el = document.createElement('div'); el.id = 'playCover'; el.style.cssText = 'position:fixed;inset:0;z-index:8;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:0 40px;background:rgba(8,16,28,.92);color:#fff;font-family:"Segoe UI",Arial;opacity:0;transition:opacity 1.2s;pointer-events:none'; document.body.appendChild(el); }
    if (on) el.innerHTML = '<div style="font-size:26px;letter-spacing:7px;font-weight:600">' + a + '</div><div style="font-size:14px;letter-spacing:4px;margin-top:12px;color:#bfefff">' + (b || '') + '</div>';
    el.style.opacity = on ? 1 : 0;
  };
  // opening day: families walk in through the gate and the children run on ahead
  P.opening = (api) => {
    if (P._open) return; const gate = api.placed.find(p => p.type === 'PLAYGATE' && p.piece); if (!gate) return; P._open = true;
    for (let i = 0; i < 8; i++) {
      const kid = i % 3 !== 0, x0 = (i % 6 - 2.5) * 4, z0 = 40 + (i % 4) * 5;
      P.person(gate.piece, kid ? P.kid(13800 + i) : P.civ(13800 + i), 'walk', x0, 0, z0, 0, Object.assign(kid ? { scale: 0.6 } : {}, { path: { type: 'line', ax: x0, az: z0, bx: (i % 5 - 2) * 14, bz: -70 - (i % 3) * 10, speed: kid ? 1.8 + (i % 3) * 0.3 : 1.1 } }));
    }
  };
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 5, name: 'THE CLUBHOUSE & OPENING DAY',
    brief: 'The children’s own clubhouse, groves of shady trees, and the rainbow gate — then opening day, when the families bring their children in.',
    types: {
      CLUBHOUSE: { code: 'SY', name: 'CLUBHOUSE', col: '#f2c41a', w: 60, d: 46, h: 20 },
      GROVE:     { code: 'GD', name: 'TREE GROVE', col: '#3a7d44', w: 30, d: 30, h: 14 },
      PLAYGATE:  { code: 'HP', name: 'RAINBOW GATE', col: '#f06aa8', w: 60, d: 8, h: 30 },
    },
    order: ['CLUBHOUSE', 'GROVE', 'PLAYGATE'],
    at: { CLUBHOUSE: [[340, 0]], GROVE: [[250, -60], [250, 60], [430, -260], [570, -260], [430, 255], [740, 0]], PLAYGATE: [[500, 255]] },
    eye: [-240, 200, 360],
    stats(api, c) { return [['CLUBHOUSE', c('CLUBHOUSE') ? 'OPEN' : 'NOT YET'], ['TREE GROVES', c('GROVE') + ' / 6'], ['RAINBOW GATE', c('PLAYGATE') ? 'STANDING' : 'NOT YET'], ['THE PLAYLAND', api.flag('playOpen') ? 'OPEN' : 'NOT YET']]; },
    make(type, k, g, add, F, api) {
      const T = api.THREE, C = P.fun(api);
      if (type === 'CLUBHOUSE') {
        // a two-storey clubhouse with a round tower, a slide out of the top floor and a deck
        add(new T.BoxGeometry(60, 0.8, 46), F.stone, 0, 0.4, 0);
        add(new T.BoxGeometry(40, 8, 26), C.yellow, -4, 4.8, 0); add(new T.BoxGeometry(34, 7, 22), C.blue, -6, 12.3, 0);
        const roof = add(new T.ConeGeometry(22, 6, 4), C.red, -6, 18.8, 0); roof.rotation.y = Math.PI / 4; roof.scale.set(1, 1, 0.7);
        add(new T.CylinderGeometry(6, 6, 18, 20), C.green, 18, 9.8, 0); add(new T.ConeGeometry(7, 7, 20), C.purple, 18, 22.3, 0);
        for (let i = 0; i < 6; i++) { add(new T.BoxGeometry(3, 2.4, 0.2), F.lamp, -20 + i * 6, 5, 13.1, false); add(new T.BoxGeometry(3, 2.4, 0.2), F.lamp, -21 + i * 5.6, 12.6, 11.1, false); }
        add(new T.BoxGeometry(4, 5, 0.3), F.wood, -4, 3.3, 13.2, false);
        const sl = add(new T.BoxGeometry(3.4, 0.5, 18), C.orange, 18, 7, 13); sl.rotation.x = 0.7;
        add(new T.BoxGeometry(18, 0.6, 10), F.wood, -4, 1.1, 18);
        const sign = api.canvasTex(1024, 160, (c, w, h) => { c.fillStyle = '#12233a'; c.fillRect(0, 0, w, h); const cs = ['#e0402e', '#f08a1a', '#f2c41a', '#3fb04a', '#2f7fe0', '#8a4fd0']; c.font = 'bold 92px Arial'; c.textAlign = 'center'; c.textBaseline = 'middle'; const t = 'THE CLUBHOUSE'; let x = w / 2 - c.measureText(t).width / 2; c.textAlign = 'left'; for (let i = 0; i < t.length; i++) { c.fillStyle = cs[i % 6]; c.fillText(t[i], x, h / 2 + 4); x += c.measureText(t[i]).width; } });
        const m = new T.Mesh(new T.PlaneGeometry(26, 4), new T.MeshBasicMaterial({ map: sign })); m.position.set(-6, 9.6, 13.15); g.add(m);
        for (let i = 0; i < 5; i++) P.figure(api, add, -10 + i * 3, 1.4, 17, 0.6, i);
        P.person(g, P.civ(13710), 'gesture', 2, 1.4, 20, Math.PI);
      } else if (type === 'GROVE') {
        add(new T.CylinderGeometry(15, 15, 0.4, 24), F.crops[0], 0, 0.2, 0, false);
        for (let i = 0; i < 7; i++) { const a = i / 7 * Math.PI * 2 + k, r = i ? 9 : 0, s = 1 + (i % 3) * 0.25; add(new T.CylinderGeometry(0.5, 0.8, 6 * s, 7), F.wood, Math.cos(a) * r, 3 * s, Math.sin(a) * r); add(new T.IcosahedronGeometry(4 * s, 1), F.crops[(i + k) % 5], Math.cos(a) * r, 7.5 * s, Math.sin(a) * r); }
        for (let i = 0; i < 10; i++) { const a = i * 0.63; add(new T.SphereGeometry(0.4, 6, 4), i % 2 ? F.flower : F.berry, Math.cos(a) * 13, 0.6, Math.sin(a) * 13, false); }
        add(new T.BoxGeometry(6, 0.5, 1.4), F.wood, 0, 1.2, 12.5);
      } else if (type === 'PLAYGATE') {
        // a rainbow arch over the way in, with the playland's name on it
        const cs = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'];
        cs.forEach((c, i) => add(new T.TorusGeometry(26 - i * 1.4, 0.7, 8, 48, Math.PI), C[c], 0, 0, 0));
        for (const s of [-1, 1]) add(new T.BoxGeometry(4, 2, 4), F.stoneDark, s * 23, 1, 0);
        const sign = api.canvasTex(1024, 128, (c, w, h) => { c.fillStyle = '#ffffff'; c.fillRect(0, 0, w, h); c.fillStyle = '#e0402e'; c.font = 'bold 76px Arial'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('THE CHILDREN’S PLAYLAND', w / 2, h / 2 + 3); });
        for (const s of [-1, 1]) { const m = new T.Mesh(new T.PlaneGeometry(36, 4.5), new T.MeshBasicMaterial({ map: sign })); m.position.set(0, 20, s * 0.9); if (s < 0) m.rotation.y = Math.PI; g.add(m); }
        add(new T.BoxGeometry(12, 0.4, 60), C.path, 0, 0.2, 30, false);
      }
    },
    tick(api) {
      // once the playland is open, a button leads straight into the tenth council meeting
      if (api.flag('opened') && !document.getElementById('nextMeeting')) {
        const b = document.createElement('button'); b.id = 'nextMeeting';
        b.innerHTML = 'GO TO THE TENTH COUNCIL MEETING ▶<small style="display:block;font-weight:400;font-size:10px;letter-spacing:2px;color:#ffe9b8;margin-top:3px">THE COUNCIL CHOOSES WHAT COMES NEXT</small>';
        b.style.cssText = 'position:fixed;left:50%;bottom:22px;transform:translateX(-50%);z-index:9;padding:10px 22px;font:600 14px "Segoe UI",Arial;letter-spacing:3px;color:#fff;background:rgba(120,90,20,.85);border:1px solid #ffd060;border-radius:5px;cursor:pointer;box-shadow:0 0 18px rgba(255,208,96,.45)';
        b.onmouseenter = () => b.style.background = 'rgba(160,120,30,.95)'; b.onmouseleave = () => b.style.background = 'rgba(120,90,20,.85)';
        b.onclick = () => { location.href = 'councilmeeting/councilmeeting10.html'; };
        document.body.appendChild(b);
      }
      if (api.flag('playOpen')) { P.fast = true; P.opening(api); }
    },
    finish: {
      label: 'OPEN THE PLAYLAND',
      cam: [[500, 70, 420], [500, 10, 150]],
      start(api) { this.stage = 0; this.t1 = 0; },
      update(api, dt, f) {
        this.t1 += dt;
        if (this.stage === 0) {
          P.opening(api); P.hint('OPENING DAY · THE FAMILIES FROM THE HOMEWARD FLEET BRING THEIR CHILDREN THROUGH THE RAINBOW GATE');
          if (this.t1 > 12) { this.stage = 1; this.t1 = 0; P.fast = true; }
        } else if (this.stage === 1) {
          P.hint('THE BIG WHEEL AND THE CAROUSEL SPIN UP · THE CHILDREN OF UNITY HAVE A PLACE OF THEIR OWN');
          if (this.t1 > 10) { this.stage = 2; this.t1 = 0; P.hint(''); P.cover(true, 'THE CHILDREN’S PLAYLAND IS OPEN', 'PLAYGROUNDS · A SPLASH POND · THE CAROUSEL · THE BIG WHEEL · SPORTS FIELDS · THE CLUBHOUSE · NEXT: THE TENTH COUNCIL MEETING'); }
        } else {
          if (this.t1 > 4 && !this._h) { this._h = true; api.setFlag('playOpen', true); api.setFlag('opened', true); }
          if (this.t1 > 6.5) { P.cover(false); this._h = false; return true; }
        }
        return false;
      },
    },
  }));
})();
