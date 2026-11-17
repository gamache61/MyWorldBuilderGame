/* ============================================================
   THE UNITY ACADEMY OF CRAFTS · BUILD 5 · THE GREAT HALL OF WORKSHOPS & OPENING DAY
   Keep this file in projects/academyofcrafts next to 81-academyofcrafts.html.
   The great hall at the head of the courtyard, its clock tower, four banner poles, and opening day when the first students walk in.
   ============================================================ */
(function () {
  const P = window.PWP;
  const AX = 1550 - 1400, AZ = 0;
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 5, name: 'THE GREAT HALL OF WORKSHOPS & OPENING DAY',
    brief: 'The Great Hall of Workshops at the head of the courtyard, a clock tower, four banner poles, then opening day, when the first young people of Unity walk in to learn to build, weld, wire, weave and fly.',
    types: {
      HALL:   { code: 'FB', name: 'GREAT HALL OF WORKSHOPS', col: '#b8694a', w: 90, d: 140, h: 38 },
      TOWER:  { code: 'FB', name: 'CLOCK TOWER',             col: '#e8dcc0', w: 14, d: 14, h: 58 },
      BANNER: { code: 'HP', name: 'BANNER POLE',             col: '#c8362a', w: 3, d: 3, h: 30 },
    },
    order: ['HALL', 'TOWER', 'BANNER'],
    at: { HALL: [[AX - 205, AZ]], TOWER: [[AX - 130, AZ - 76]],
      BANNER: [[AX + 70, AZ - 100], [AX + 70, AZ + 100], [AX - 70, AZ - 100], [AX - 70, AZ + 100]] },
    eye: [AX + 250, (window.__ACAD.Y || -85) + 200, AZ + 330],
    stats(api, c) { return [['GREAT HALL', c('HALL') ? 'BUILT' : 'NOT YET'], ['CLOCK TOWER', c('TOWER') ? 'STRIKING' : 'NOT YET'], ['BANNER POLES', c('BANNER') + ' / 4'], ['THE ACADEMY', api.flag('opened') ? 'OPEN' : 'NOT YET']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, H = P.pw(api), A = P.ac(api);
      if (type === 'HALL') {
        // the long axis runs north-south and the front faces east, onto the courtyard
        add(new T.BoxGeometry(94, 1, 144), H.conc2, 0, 0.5, 0);
        add(new T.BoxGeometry(90, 26, 140), A.brick, 0, 14, 0);
        add(new T.BoxGeometry(92, 1.4, 142), A.cream, 0, 27.4, 0, false);
        for (const q of [-1, 1]) { const r = add(new T.BoxGeometry(34, 1, 144), A.tile, q * 15.6, 33.4, 0); r.rotation.z = q * 0.44; }
        add(new T.BoxGeometry(1.6, 1, 146), A.brass, 0, 39.4, 0, false);
        for (let i = 0; i < 6; i++) { add(new T.BoxGeometry(0.8, 16, 12), A.iron, 45.4, 10, -52 + i * 20.8, false); add(new T.BoxGeometry(1, 0.8, 14), A.timber, 45.6, 18.4, -52 + i * 20.8, false); }
        for (let i = 0; i < 6; i++) add(new T.BoxGeometry(0.5, 5, 6), H.win, 45.4, 22, -52 + i * 20.8, false);
        for (let i = 0; i < 6; i++) add(new T.BoxGeometry(5, 5.4, 0.5), H.win, 20 - i * 8, 17, 70.2, false);
        for (const z of [-30, -10, 10, 30]) add(new T.BoxGeometry(16, 3, 12), H.glass, -8, 41.6, z, false);
        P.sign(api, g, 'THE GREAT HALL OF WORKSHOPS', 70, 6.2, 46.4, 30, 0, Math.PI / 2, '#3a2210', '#ffe08a');
        for (const z of [-16, 16]) add(new T.CylinderGeometry(1.4, 1.6, 8, 10), A.cream, 47.4, 4, z, false);
        P.person(g, P.civ(81070), 'tablet', 52, 1, -8, Math.PI / 2); P.person(g, P.kid(81071), 'idle', 52, 1, 8, Math.PI / 2); P.person(g, P.kid(81072), 'idle', 55, 1, 0, Math.PI / 2);
      } else if (type === 'TOWER') {
        add(new T.BoxGeometry(14, 40, 14), A.cream, 0, 20, 0); add(new T.BoxGeometry(15.6, 1.4, 15.6), A.brick2, 0, 40.4, 0, false);
        add(new T.BoxGeometry(11, 6, 11), A.cream, 0, 44, 0); add(new T.ConeGeometry(9, 12, 4), A.patina, 0, 53, 0).rotation.y = Math.PI / 4;
        for (const [x, z, ry] of [[7.2, 0, Math.PI / 2], [-7.2, 0, -Math.PI / 2], [0, 7.2, 0], [0, -7.2, Math.PI]]) { const c = add(new T.CylinderGeometry(3.2, 3.2, 0.5, 20), A.brass, x, 30, z, false); c.rotation.set(Math.PI / 2, 0, 0); if (x) c.rotation.set(0, 0, Math.PI / 2); }
        add(new T.SphereGeometry(0.8, 8, 6), A.brass, 0, 59.4, 0, false);
      } else if (type === 'BANNER') {
        add(new T.CylinderGeometry(0.35, 0.5, 30, 6), A.iron, 0, 15, 0, false);
        add(new T.BoxGeometry(0.4, 12, 7), A.banner[k % 5], 0, 22, 3.8, false); add(new T.BoxGeometry(0.5, 1, 1), A.brass, 0, 30.4, 0, false);
      }
    },
    tick(api, dt, t) {
      if (api.flag('opened') && !document.getElementById('nextMeeting')) {
        const b = document.createElement('button'); b.id = 'nextMeeting';
        b.innerHTML = 'GO TO THE NEXT COUNCIL MEETING ▶<small style="display:block;font-weight:400;font-size:10px;letter-spacing:2px;color:#ffe3c0;margin-top:3px">THE ACADEMY OF CRAFTS IS OPEN</small>';
        b.style.cssText = 'position:fixed;left:50%;bottom:22px;transform:translateX(-50%);z-index:9;padding:10px 22px;font:600 14px "Segoe UI",Arial;letter-spacing:3px;color:#fff;background:rgba(120,60,30,.88);border:1px solid #ffd9a0;border-radius:6px;cursor:pointer';
        b.onmouseenter = () => b.style.background = 'rgba(150,80,40,.96)'; b.onmouseleave = () => b.style.background = 'rgba(120,60,30,.88)';
        b.onclick = () => { location.href = 'councilmeeting/councilmeeting48.html'; };
        document.body.appendChild(b);
      }
    },
    finish: {
      label: 'OPENING DAY',
      cam: [[AX + 120, 210, AZ + 330], [AX - 100, 40, AZ]],
      start(api) { this.stage = 0; this.t1 = 0; P.ring && P.ring(3); },
      update(api, dt, f) {
        this.t1 += dt;
        if (this.stage === 0) {
          P.hint(this.t1 < 5 ? 'THE CLOCK TOWER STRIKES · THE BANNERS RISE' : 'THE FIRST STUDENTS WALK IN · BUILD · WELD · WIRE · WEAVE · FLY');
          if (this.t1 > 11) { this.stage = 1; this.t1 = 0; P.hint(''); P.cover(true, 'THE UNITY ACADEMY OF CRAFTS IS OPEN', 'THE BUILDING HALL · THE WELDING HALL · THE WIRING HOUSE · THE WEAVING HOUSE · THE FLIGHT HANGAR'); }
        } else {
          if (this.t1 > 4 && !this._h) { this._h = true; api.setFlag('academy', true); api.setFlag('opened', true); }
          if (this.t1 > 6.5) { P.cover(false); this._h = false; return true; }
        }
        return false;
      },
    },
  }));
})();
