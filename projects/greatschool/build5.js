/* ============================================================
   THE GREAT SCHOOL OF UNITY · BUILD 5 · THE CLASSROOMS & THE FIRST DAY
   Keep this file in projects/greatschool next to greatschool.html.
   Four classroom wings — farming, building, healing and running
   Unity — groves of shady trees, and the school gate facing the
   landing field. Ends with L: the first day of school — people of
   every age come through the gate, the bell rings, and the Great
   School of Unity is open.
   ============================================================ */
(function () {
  const P = window.SCHOOL;
  P.hint = (text) => {
    let el = document.getElementById('playHint');
    if (!el) { el = document.createElement('div'); el.id = 'playHint'; el.style.cssText = 'position:fixed;left:50%;bottom:90px;transform:translateX(-50%);z-index:8;padding:8px 18px;background:rgba(8,20,35,.85);border:1px solid #90f0b0;border-radius:5px;color:#fff;font:600 13px "Segoe UI",Arial;letter-spacing:3px;text-align:center;pointer-events:none'; document.body.appendChild(el); }
    el.style.display = text ? 'block' : 'none'; if (text) el.textContent = text;
  };
  P.cover = (on, a, b) => {
    let el = document.getElementById('playCover');
    if (!el) { el = document.createElement('div'); el.id = 'playCover'; el.style.cssText = 'position:fixed;inset:0;z-index:8;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:0 40px;background:rgba(8,16,28,.92);color:#fff;font-family:"Segoe UI",Arial;opacity:0;transition:opacity 1.2s;pointer-events:none'; document.body.appendChild(el); }
    if (on) el.innerHTML = '<div style="font-size:26px;letter-spacing:7px;font-weight:600">' + a + '</div><div style="font-size:14px;letter-spacing:4px;margin-top:12px;color:#bff8d0">' + (b || '') + '</div>';
    el.style.opacity = on ? 1 : 0;
  };
  // the first day: people of every age walk in through the gate, along the walk to the Great Hall
  P.firstDay = (api) => {
    if (P._first) return; const gate = api.placed.find(p => p.type === 'SCHOOLGATE' && p.piece); if (!gate) return; P._first = true;
    for (let i = 0; i < 10; i++) {
      const kid = i % 3 === 1, z0 = (i % 5 - 2) * 2.4, x0 = 30 + (i % 4) * 6;
      P.person(gate.piece, kid ? P.kid(15800 + i) : P.civ(15800 + i), 'walk', x0, 0, z0, -Math.PI / 2, Object.assign(kid ? { scale: 0.6 } : {}, { path: { type: 'line', ax: x0, az: z0, bx: -180 - (i % 3) * 8, bz: z0, speed: kid ? 1.6 : 1.1 } }));
    }
  };
  P.swing = 0;
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 5, name: 'THE CLASSROOMS & THE FIRST DAY',
    brief: 'Four classroom wings — farming, building, healing and running Unity — groves of shady trees and the school gate, then the first day of school.',
    types: {
      CLASSWING:  { code: 'SY', name: 'CLASSROOM WING', col: '#7fd8ff', w: 100, d: 40, h: 16 },
      GROVE:      { code: 'GD', name: 'TREE GROVE', col: '#3a7d44', w: 30, d: 30, h: 14 },
      SCHOOLGATE: { code: 'HP', name: 'SCHOOL GATE', col: '#90f0b0', w: 8, d: 60, h: 30 },
    },
    order: ['CLASSWING', 'GROVE', 'SCHOOLGATE'],
    at: { CLASSWING: [[-390, 85], [-730, 85], [-390, -85], [-730, -85]], GROVE: [[-870, -60], [-870, 60], [-290, -265], [-640, -270], [-890, 250], [-290, 290]], SCHOOLGATE: [[-255, 0]] },
    eye: [240, 200, 340],
    stats(api, c) { return [['CLASSROOMS', c('CLASSWING') * 12 + ' / 48'], ['TREE GROVES', c('GROVE') + ' / 6'], ['SCHOOL GATE', c('SCHOOLGATE') ? 'STANDING' : 'NOT YET'], ['THE GREAT SCHOOL', api.flag('schoolOpen') ? 'OPEN' : 'NOT YET']]; },
    make(type, k, g, add, F, api) {
      const T = api.THREE, S = P.sch(api), C = P.fun(api);
      if (type === 'CLASSWING') {
        const NAMES = ['HEALING CLASSROOMS', 'FARMING CLASSROOMS', 'BUILDING CLASSROOMS', 'RUNNING UNITY'], DOORS = ['teal', 'green', 'orange', 'purple'];
        const face = k < 2 ? -1 : 1; // the wings face the walk along the middle
        add(new T.BoxGeometry(100, 0.8, 40), S.stone, 0, 0.4, 0);
        add(new T.BoxGeometry(92, 14, 26), S.cream, 0, 7.8, face * -3);
        add(new T.BoxGeometry(93, 1, 27), S.frame, 0, 15.2, face * -3); add(new T.BoxGeometry(86, 0.8, 22), S.roofGreen, 0, 16, face * -3);
        for (let i = 0; i < 4; i++) add(new T.SphereGeometry(1.6, 8, 6), F.crops[(i + k) % 5], -36 + i * 24, 17.4, face * -3 + (i % 2 ? 6 : -6), false);
        // twelve classrooms: six down, six up, each with a big window and a warm light
        for (let i = 0; i < 6; i++) for (const y of [4.6, 11.2]) { const x = -38 + i * 15.2; add(new T.BoxGeometry(11, 4.4, 0.3), S.glass, x, y, face * 10.1, false); add(new T.BoxGeometry(10.4, 3.6, 0.2), S.warm, x, y, face * 9.8, false); add(new T.BoxGeometry(12, 0.4, 1.2), F.white, x, y - 2.5, face * 10.6); }
        add(new T.BoxGeometry(8, 9, 0.4), C[DOORS[k]], 0, 5.3, face * 10.3, false);
        add(new T.BoxGeometry(14, 0.6, 6), F.white, 0, 10.4, face * 13); for (const s of [-1, 1]) add(new T.BoxGeometry(0.5, 10, 0.5), F.white, s * 6.5, 5.4, face * 15.6);
        P.sign(api, g, NAMES[k], 26, 2.6, 0, 12.6, face * 16.1, face < 0 ? Math.PI : 0, '#12333a', '#bff8d0', false);
        // a chalk board out front for lessons in the sun, and a class sitting round it
        add(new T.BoxGeometry(8, 5, 0.4), S.board, 30, 4, face * 15); add(new T.BoxGeometry(0.4, 4, 0.4), S.timber, 27, 2.4, face * 15); add(new T.BoxGeometry(0.4, 4, 0.4), S.timber, 33, 2.4, face * 15);
        for (let i = 0; i < 6; i++) P.figure(api, add, 25 + (i % 3) * 5, 0.8, face * (18 + (i >> 1 & 1) * 0 + (i > 2 ? 3 : 0)), i === 1 || i === 4 ? 0.6 : 0.9, i + k * 6);
        P.person(g, P.civ(15600 + k), 'gesture', 30, 0.8, face * 13, face < 0 ? Math.PI : 0);
        P.person(g, P.civ(15610 + k), 'walk', 0, 0.8, 0, 0, { path: { type: 'line', ax: -40, az: face * 14, bx: 20, bz: face * 14, speed: 1.1 } });
      } else if (type === 'GROVE') {
        add(new T.CylinderGeometry(15, 15, 0.4, 24), F.crops[0], 0, 0.2, 0, false);
        for (let i = 0; i < 7; i++) { const a = i / 7 * Math.PI * 2 + k, r = i ? 9 : 0, s = 1 + (i % 3) * 0.25; add(new T.CylinderGeometry(0.5, 0.8, 6 * s, 7), F.wood, Math.cos(a) * r, 3 * s, Math.sin(a) * r); add(new T.IcosahedronGeometry(4 * s, 1), F.crops[(i + k) % 5], Math.cos(a) * r, 7.5 * s, Math.sin(a) * r); }
        for (let i = 0; i < 10; i++) { const a = i * 0.63; add(new T.SphereGeometry(0.4, 6, 4), i % 2 ? F.flower : F.berry, Math.cos(a) * 13, 0.6, Math.sin(a) * 13, false); }
        add(new T.BoxGeometry(1.4, 0.5, 6), F.wood, 12.5, 1.2, 0);
        P.figure(api, add, 11, 1.4, -1, 1, k); if (k % 2) P.figure(api, add, 11, 1.4, 1.2, 0.6, k + 3);
      } else if (type === 'SCHOOLGATE') {
        // a white stone arch over the walk, lit in mint green, with the school's name on both faces
        for (const s of [-1, 1]) { add(new T.BoxGeometry(6, 24, 6), F.white, 0, 12, s * 22); add(new T.BoxGeometry(7, 2, 7), S.stone, 0, 1, s * 22); add(new T.BoxGeometry(6.6, 1.4, 6.6), S.copper, 0, 24.7, s * 22); add(new T.SphereGeometry(1.4, 10, 8), S.glow, 0, 26.6, s * 22, false); }
        add(new T.TorusGeometry(19, 1.4, 8, 40, Math.PI).rotateY(Math.PI / 2), F.white, 0, 12, 0);
        add(new T.TorusGeometry(17.4, 0.3, 6, 40, Math.PI).rotateY(Math.PI / 2), S.glow, 0, 12, 0, false);
        add(new T.BoxGeometry(5, 3.4, 38), F.white, 0, 33.4, 0);
        P.sign(api, g, 'THE GREAT SCHOOL OF UNITY', 34, 3, 2.6, 33.4, 0, Math.PI / 2, '#ffffff', '#1f6a4a', false);
        P.sign(api, g, 'OPEN TO EVERYONE OF EVERY AGE', 34, 3, -2.6, 33.4, 0, -Math.PI / 2, '#ffffff', '#1f6a4a', false);
        add(new T.BoxGeometry(30, 0.4, 14), C.path, 15, 0.2, 0, false);
        for (const s of [-1, 1]) for (let i = 0; i < 3; i++) { add(new T.CylinderGeometry(0.2, 0.2, 6, 6), F.steel, 6 + i * 8, 3, s * 9); const fl = add(new T.BoxGeometry(0.1, 2, 3), [S.mint, C.blue, C.yellow][i], 6 + i * 8, 5, s * 9 + 1.5, false); }
      }
    },
    tick(api, dt) {
      // once the school is open, a button leads straight into the eleventh council meeting
      if (api.flag('opened') && !document.getElementById('nextMeeting')) {
        const b = document.createElement('button'); b.id = 'nextMeeting';
        b.innerHTML = 'GO TO THE ELEVENTH COUNCIL MEETING ▶<small style="display:block;font-weight:400;font-size:10px;letter-spacing:2px;color:#d8ffe4;margin-top:3px">THE COUNCIL CHOOSES WHAT COMES NEXT</small>';
        b.style.cssText = 'position:fixed;left:50%;bottom:22px;transform:translateX(-50%);z-index:9;padding:10px 22px;font:600 14px "Segoe UI",Arial;letter-spacing:3px;color:#fff;background:rgba(30,100,70,.85);border:1px solid #90f0b0;border-radius:5px;cursor:pointer;box-shadow:0 0 18px rgba(144,240,176,.45)';
        b.onmouseenter = () => b.style.background = 'rgba(40,130,90,.95)'; b.onmouseleave = () => b.style.background = 'rgba(30,100,70,.85)';
        b.onclick = () => { location.href = 'councilmeeting/councilmeeting11.html'; };
        document.body.appendChild(b);
      }
      if (api.flag('schoolOpen')) P.firstDay(api);
      // the school bell swings while it rings
      if (P.bell) { P.swing = Math.max(0, P.swing - dt); P.bell.rotation.z = P.swing > 0 ? Math.sin(P.swing * 5) * 0.35 * Math.min(1, P.swing / 2) : 0; }
    },
    finish: {
      label: 'OPEN THE GREAT SCHOOL',
      cam: [[-120, 70, 140], [-330, 10, 0]],
      start(api) { this.stage = 0; this.t1 = 0; },
      update(api, dt, f) {
        this.t1 += dt;
        if (this.stage === 0) {
          P.firstDay(api); P.hint('THE FIRST DAY · PEOPLE OF EVERY AGE COME THROUGH THE GATE TO LEARN');
          if (this.t1 > 12) { this.stage = 1; this.t1 = 0; P.ring(4); P.swing = 6.5; }
        } else if (this.stage === 1) {
          P.hint('THE SCHOOL BELL RINGS · THE FIRST LESSONS BEGIN · TO FARM, BUILD, HEAL AND RUN UNITY');
          if (this.t1 > 10) { this.stage = 2; this.t1 = 0; P.hint(''); P.cover(true, 'THE GREAT SCHOOL OF UNITY IS OPEN', 'THE GREAT HALL · THE LIBRARY · THE WORKSHOP HALL · THE BUILDING YARD · THE FARM SCHOOL · THE HEALING SCHOOL · 48 CLASSROOMS · NEXT: THE ELEVENTH COUNCIL MEETING'); }
        } else {
          if (this.t1 > 4 && !this._h) { this._h = true; api.setFlag('schoolOpen', true); api.setFlag('opened', true); }
          if (this.t1 > 6.5) { P.cover(false); this._h = false; return true; }
        }
        return false;
      },
    },
  }));
})();
