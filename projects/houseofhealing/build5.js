/* ============================================================
   THE HOUSE OF HEALING · BUILD 5 · THE SKY-POD PAD & OPENING DAY
   Keep this file in projects/houseofhealing next to houseofhealing.html.
   The sky-pod pad where the healing pods land with people who need
   care, groves of trees, and the gate facing the landing field. Ends
   with L: opening day — the healers and the Healing School students
   walk in together, the first healing pod lands, and the House of
   Healing is open for every family on Unity.
   ============================================================ */
(function () {
  const P = window.HEAL;
  P.hint = (text) => {
    let el = document.getElementById('playHint');
    if (!el) { el = document.createElement('div'); el.id = 'playHint'; el.style.cssText = 'position:fixed;left:50%;bottom:90px;transform:translateX(-50%);z-index:8;padding:8px 18px;background:rgba(8,20,35,.85);border:1px solid #80f0e0;border-radius:5px;color:#fff;font:600 13px "Segoe UI",Arial;letter-spacing:3px;text-align:center;pointer-events:none'; document.body.appendChild(el); }
    el.style.display = text ? 'block' : 'none'; if (text) el.textContent = text;
  };
  P.cover = (on, a, b) => {
    let el = document.getElementById('playCover');
    if (!el) { el = document.createElement('div'); el.id = 'playCover'; el.style.cssText = 'position:fixed;inset:0;z-index:8;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:0 40px;background:rgba(8,16,28,.92);color:#fff;font-family:"Segoe UI",Arial;opacity:0;transition:opacity 1.2s;pointer-events:none'; document.body.appendChild(el); }
    if (on) el.innerHTML = '<div style="font-size:26px;letter-spacing:7px;font-weight:600">' + a + '</div><div style="font-size:14px;letter-spacing:4px;margin-top:12px;color:#c8fff4">' + (b || '') + '</div>';
    el.style.opacity = on ? 1 : 0;
  };
  // opening day: the healers and the students walk in through the gate, side by side
  P.opening = (api) => {
    if (P._open) return; const gate = api.placed.find(p => p.type === 'HEALGATE' && p.piece); if (!gate) return; P._open = true;
    for (let i = 0; i < 12; i++) {
      const x0 = (i % 4 - 1.5) * 2.6, z0 = 30 + (i >> 2) * 6;
      P.person(gate.piece, P.civ(17800 + i), 'walk', x0, 0, z0, Math.PI, { path: { type: 'line', ax: x0, az: z0, bx: x0, bz: -150 - (i % 3) * 8, speed: 1.1 } });
    }
  };
  P.podT = -1;
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 5, name: 'THE SKY-POD PAD & OPENING DAY',
    brief: 'The sky-pod pad where the healing pods land, groves of trees and the gate facing the landing field — then opening day.',
    types: {
      SKYPAD:   { code: 'HP', name: 'SKY-POD PAD', col: '#7fd8ff', w: 60, d: 60, h: 10 },
      HGROVE:   { code: 'GD', name: 'TREE GROVE', col: '#3a7d44', w: 30, d: 30, h: 14 },
      HEALGATE: { code: 'HP', name: 'HOSPITAL GATE', col: '#80f0e0', w: 60, d: 8, h: 30 },
    },
    order: ['SKYPAD', 'HGROVE', 'HEALGATE'],
    at: { SKYPAD: [[-40, -430]], HGROVE: [[280, -430], [330, -480], [-125, -690], [370, -690], [-120, -800], [360, -800]], HEALGATE: [[120, -345]] },
    eye: [-220, 210, 260],
    stats(api, c) { return [['SKY-POD PAD', c('SKYPAD') ? 'READY' : 'NOT YET'], ['TREE GROVES', c('HGROVE') + ' / 6'], ['HOSPITAL GATE', c('HEALGATE') ? 'STANDING' : 'NOT YET'], ['THE HOUSE OF HEALING', api.flag('healOpen') ? 'OPEN' : 'NOT YET']]; },
    make(type, k, g, add, F, api) {
      const T = api.THREE, S = P.hm(api), C = P.fun(api);
      if (type === 'SKYPAD') {
        add(new T.CylinderGeometry(28, 30, 2, 32), F.stoneDark, 0, 1, 0);
        add(new T.CylinderGeometry(26, 26, 0.4, 32), F.dark, 0, 2.2, 0);
        add(new T.TorusGeometry(22, 0.5, 6, 48).rotateX(Math.PI / 2), S.glow, 0, 2.5, 0, false);
        const heart = new T.Shape(); heart.moveTo(0, -3); heart.bezierCurveTo(-6, 1, -3, 5.5, 0, 2.6); heart.bezierCurveTo(3, 5.5, 6, 1, 0, -3);
        const h = add(new T.ShapeGeometry(heart), S.glow, 0, 2.5, 0, false); h.rotation.x = -Math.PI / 2; h.scale.setScalar(2.2);
        for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2; add(new T.SphereGeometry(0.6, 8, 6), F.lamp, Math.cos(a) * 26, 2.8, Math.sin(a) * 26, false); }
        // a healing pod parked at the edge, and the one that lands on opening day
        const pod = (grp, x, z) => { add(new T.CapsuleGeometry(3, 8, 6, 14).rotateZ(Math.PI / 2), F.white, x, 5.4, z, true, grp).scale.z = 0.8; add(new T.BoxGeometry(9, 0.6, 5), S.mint, x, 5.4, z, true, grp); add(new T.BoxGeometry(5, 2, 4.4), S.glass, x - 2, 7, z, false, grp); for (const s of [-1, 1]) add(new T.CylinderGeometry(1.2, 1.2, 1.6, 10), F.dark, x + 3, 4, z + s * 3, true, grp); };
        pod(g, -30, 18);
        const fly = new T.Group(); fly.position.set(0, 90, 0); fly.userData.keep = true; g.add(fly); P.pod = fly; pod(fly, 0, 0);
        add(new T.BoxGeometry(10, 5, 6), F.white, 30, 3.5, -20); add(new T.BoxGeometry(0.3, 3, 4), S.glass, 25, 4, -20, false);
        for (let i = 0; i < 3; i++) P.figure(api, add, 22 + i * 3, 2.4, -12, 1, i + 3);
      } else if (type === 'HGROVE') {
        add(new T.CylinderGeometry(15, 15, 0.4, 24), F.crops[0], 0, 0.2, 0, false);
        for (let i = 0; i < 7; i++) { const a = i / 7 * Math.PI * 2 + k, r = i ? 9 : 0, s = 1 + (i % 3) * 0.25; add(new T.CylinderGeometry(0.5, 0.8, 6 * s, 7), F.wood, Math.cos(a) * r, 3 * s, Math.sin(a) * r); add(new T.IcosahedronGeometry(4 * s, 1), F.crops[(i + k) % 5], Math.cos(a) * r, 7.5 * s, Math.sin(a) * r); }
        for (let i = 0; i < 10; i++) { const a = i * 0.63; add(new T.SphereGeometry(0.4, 6, 4), i % 2 ? F.flower : F.berry, Math.cos(a) * 13, 0.6, Math.sin(a) * 13, false); }
        add(new T.BoxGeometry(6, 0.5, 1.4), F.wood, 0, 1.2, 12.5);
      } else if (type === 'HEALGATE') {
        // a white gate with the green heart, facing the landing field
        for (const s of [-1, 1]) { add(new T.BoxGeometry(6, 22, 6), F.white, s * 18, 11, 0); add(new T.BoxGeometry(7, 1.6, 7), S.teal, s * 18, 22.8, 0); add(new T.SphereGeometry(1.4, 10, 8), S.glow, s * 18, 24.8, 0, false); }
        add(new T.BoxGeometry(42, 4, 3), F.white, 0, 28, 0);
        const heart = new T.Shape(); heart.moveTo(0, -3); heart.bezierCurveTo(-6, 1, -3, 5.5, 0, 2.6); heart.bezierCurveTo(3, 5.5, 6, 1, 0, -3);
        add(new T.ExtrudeGeometry(heart, { depth: 1, bevelEnabled: false }), S.glow, 0, 35, -0.5, false).scale.setScalar(1.3);
        P.sign(api, g, 'THE HOUSE OF HEALING', 36, 3, 0, 28, 1.6, 0, '#ffffff', '#1f7a6a', false);
        P.sign(api, g, 'CARE FOR EVERY FAMILY', 36, 3, 0, 28, -1.6, Math.PI, '#ffffff', '#1f7a6a', false);
        add(new T.BoxGeometry(12, 0.4, 40), C.path, 0, 0.25, 14, false);
        for (const s of [-1, 1]) for (let i = 0; i < 3; i++) add(new T.IcosahedronGeometry(1.8, 0), i % 2 ? F.flower : F.crops[i], s * (24 + i * 4), 1.6, 2, false);
      }
    },
    tick(api, dt) {
      // once the hospital is open, a button leads straight into the thirteenth council meeting
      if (api.flag('opened') && !document.getElementById('nextMeeting')) {
        const b = document.createElement('button'); b.id = 'nextMeeting';
        b.innerHTML = 'GO TO THE THIRTEENTH COUNCIL MEETING ▶<small style="display:block;font-weight:400;font-size:10px;letter-spacing:2px;color:#d8fff6;margin-top:3px">THE COUNCIL CHOOSES WHAT COMES NEXT</small>';
        b.style.cssText = 'position:fixed;left:50%;bottom:22px;transform:translateX(-50%);z-index:9;padding:10px 22px;font:600 14px "Segoe UI",Arial;letter-spacing:3px;color:#fff;background:rgba(20,100,90,.85);border:1px solid #80f0e0;border-radius:5px;cursor:pointer;box-shadow:0 0 18px rgba(128,240,224,.45)';
        b.onmouseenter = () => b.style.background = 'rgba(30,130,115,.95)'; b.onmouseleave = () => b.style.background = 'rgba(20,100,90,.85)';
        b.onclick = () => { location.href = 'councilmeeting/councilmeeting13.html'; };
        document.body.appendChild(b);
      }
      if (api.flag('healOpen')) P.opening(api);
      // the healing pod comes down onto the pad, or sits there once the hospital is open
      if (P.pod) { if (P.podT >= 0) { P.podT += dt; P.pod.position.y = Math.max(0, 90 - P.podT * 9); } else if (api.flag('healOpen')) P.pod.position.y = 0; }
    },
    finish: {
      label: 'OPEN THE HOUSE OF HEALING',
      cam: [[220, 80, -260], [80, 10, -470]],
      start(api) { this.stage = 0; this.t1 = 0; },
      update(api, dt, f) {
        this.t1 += dt;
        if (this.stage === 0) {
          P.opening(api); P.hint('OPENING DAY · THE HEALERS AND THE HEALING SCHOOL STUDENTS WALK IN TOGETHER');
          if (this.t1 > 12) { this.stage = 1; this.t1 = 0; P.podT = 0; P.ring(2); }
        } else if (this.stage === 1) {
          P.hint('THE FIRST HEALING POD LANDS · CARE FOR EVERY FAMILY ON UNITY');
          if (this.t1 > 11) { this.stage = 2; this.t1 = 0; P.hint(''); P.cover(true, 'THE HOUSE OF HEALING IS OPEN', 'THE MAIN HOSPITAL · TWO WARD TOWERS · THE CHILDREN’S WING · THE HEALING GARDENS · THE BIRTH HOUSE · THE SKY-POD PAD · NEXT: THE THIRTEENTH COUNCIL MEETING'); }
        } else {
          if (this.t1 > 4 && !this._h) { this._h = true; api.setFlag('healOpen', true); api.setFlag('opened', true); }
          if (this.t1 > 6.5) { P.cover(false); this._h = false; return true; }
        }
        return false;
      },
    },
  }));
})();
