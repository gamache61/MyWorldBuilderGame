/* ============================================================
   THE UNITY WAREHOUSES · BUILD 5 · THE GREAT PARTS HALL, THE LOADING WAREHOUSE, THE TRUCKS & OPENING DAY
   Keep this file in projects/warehouses next to 73-warehouses.html.
   The great hall that holds everything, the big loading warehouse with the sliding roof where the Aegis Ark will load, four parts trucks on the road, and opening day when the warehouse district opens.
   ============================================================ */
(function () {
  const P = window.PWP;
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 5, name: 'THE GREAT PARTS HALL, THE LOADING WAREHOUSE, THE TRUCKS & OPENING DAY',
    brief: 'The Great Parts Hall, the biggest building in the factory district, the Loading Warehouse with its sliding roof where the Aegis Ark will load, four trucks on the road, then opening day, when every warehouse opens and Unity can store all the parts it makes.',
    types: {
      HALL:  { code: 'FB', name: 'GREAT PARTS HALL', col: '#b8bec6', w: 150, d: 80, h: 34 },
      LOADHOUSE: { code: 'FB', name: 'LOADING WAREHOUSE', col: '#9aa6b2', w: 220, d: 130, h: 50 },
      TRUCK: { code: 'HM', name: 'PARTS TRUCK',      col: '#2f6fb0', w: 10,  d: 4,  h: 5 },
      FORK:  { code: 'HM', name: 'FORKLIFT',         col: '#f2c41a', w: 6,   d: 3,  h: 5 },
    },
    order: ['HALL', 'LOADHOUSE', 'TRUCK', 'FORK'],
    at: {
      HALL: [[1550 + 450, 190]],
      LOADHOUSE: [[1550 + 450, 400]],
      TRUCK: [[1550 + 332, -150], [1550 + 332, -50], [1550 + 332, 50], [1550 + 332, 150]],
      FORK: [[1550 + 380, 130], [1550 + 380, 70], [1550 + 380, 10]],
    },
    eye: [1550 + 270, P.SY + 150, 320],
    stats(api, c) { return [['GREAT PARTS HALL', c('HALL') ? 'BUILT' : 'NOT YET'], ['LOADING WAREHOUSE', c('LOADHOUSE') ? 'BUILT' : 'NOT YET'], ['PARTS TRUCKS', c('TRUCK') + ' / 4'], ['FORKLIFTS', c('FORK') + ' / 3'], ['THE WAREHOUSE DISTRICT', api.flag('opened') ? 'OPEN' : 'NOT YET']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, H = P.pw(api);
      if (type === 'HALL') {
        add(new T.BoxGeometry(150, 1, 80), H.conc2, 0, 0.5, 0);
        add(new T.BoxGeometry(146, 26, 76), H.wall, 0, 14, 0);
        add(new T.BoxGeometry(148, 1.6, 78), H.roof, 0, 27.8, 0);
        add(new T.BoxGeometry(100, 6, 50), H.roof2, 0, 31.6, 0);
        for (let i = 0; i < 6; i++) { add(new T.BoxGeometry(0.6, 18, 14), H.steel2, -73.3, 10, -30 + i * 12, false); add(new T.BoxGeometry(0.8, 0.8, 14), H.yellow, -73.5, 19.4, -30 + i * 12, false); }
        add(new T.BoxGeometry(0.8, 0.8, 76), H.blue, -73.5, 22, 0, false);
        for (let i = 0; i < 8; i++) add(new T.BoxGeometry(4, 5, 0.4), H.win, -60 + i * 17, 20, 38.2, false);
        for (let x = -50; x <= 50; x += 25) { add(new T.CylinderGeometry(1.8, 2.2, 14, 10), H.steel2, x, 41, 22); add(new T.CylinderGeometry(1.4, 1.4, 0.8, 10), H.cool, x, 48.4, 22, false); }
        P.sign(api, g, 'THE GREAT PARTS HALL', 56, 5.4, -73.9, 25, 0, -Math.PI / 2, '#14242e', '#ffe08a');
        P.person(g, P.civ(73050), 'tablet', -82, 0.5, 14, Math.PI / 2); P.person(g, P.civ(73051), 'idle', -82, 0.5, -14, Math.PI / 2);
      } else if (type === 'LOADHOUSE') {
        // the big loading warehouse: a wide hangar with a sliding roof, shown opened, and a cradle floor for the Aegis Ark
        add(new T.BoxGeometry(220, 1, 130), H.conc2, 0, 0.5, 0);
        add(new T.BoxGeometry(216, 46, 2), H.wall, 0, 24, -64);
        for (const s of [-1, 1]) add(new T.BoxGeometry(2, 46, 126), H.wall, s * 109, 24, 0);
        for (const s of [-1, 1]) add(new T.BoxGeometry(70, 46, 2), H.wall, s * 73, 24, 64);
        add(new T.BoxGeometry(78, 8, 2), H.wall, 0, 43, 64);
        for (const s of [-1, 1]) add(new T.BoxGeometry(1.2, 38, 3), H.yellow, s * 38.6, 20, 64.2, false);
        for (const s of [-1, 1]) add(new T.BoxGeometry(60, 1.6, 126), H.roof, s * 79, 48.6, 0);
        for (const z of [-40, 40]) add(new T.BoxGeometry(216, 1, 2), H.steel2, 0, 47.4, z, false);
        for (const s of [-1, 1]) { add(new T.BoxGeometry(2, 3, 126), H.steel2, s * 49, 46.8, 0, false); add(new T.BoxGeometry(0.8, 0.8, 126), H.blue, s * 49, 49, 0, false); }
        add(new T.BoxGeometry(70, 0.3, 110), H.hazard, 0, 1.2, 0, false);
        add(new T.BoxGeometry(56, 0.4, 96), H.conc2, 0, 1.4, 0, false);
        for (const [x, z] of [[-90, -50], [-90, 10], [90, -50], [90, 10]]) for (let r = 0; r < 2; r++) for (let c = 0; c < 3; c++) add(new T.BoxGeometry(5, 2.6, 4), [H.red, H.orange, H.blue][(r + c) % 3], x + c * 5.4, 2 + r * 2.7, z + r * 0.6);
        for (const [x, z] of [[-45, -55], [45, -55], [-45, 55], [45, 55]]) { add(new T.CylinderGeometry(0.5, 0.5, 22, 6), H.steel2, x, 11, z, false); add(new T.SphereGeometry(1.4, 8, 6), H.cool, x, 22.6, z, false); }
        P.sign(api, g, 'UNITY LOADING WAREHOUSE', 76, 6.4, 0, 38, 65.3, 0, '#14242e', '#ffe08a');
        P.person(g, P.civ(73060), 'tablet', -50, 0.5, 78, Math.PI); P.person(g, P.civ(73061), 'idle', 50, 0.5, 80, Math.PI);
      } else if (type === 'TRUCK') {
        const t = P.truck(api, add, H, 0, 0, Math.PI / 2, k % 2 ? H.blue : H.orange); g.add(t);
        for (let i = 0; i < 3; i++) { const c = add(new T.BoxGeometry(2.2, 1.8, 2.4), H.steel, 0, 3, -4 + i * 2.4, false); add(new T.BoxGeometry(2.3, 0.2, 2.5), H.cool, 0, 3.9, -4 + i * 2.4, false); }
      } else if (type === 'FORK') {
        add(new T.BoxGeometry(3.6, 1.8, 2.4), H.yellow, 0, 1.6, 0); add(new T.BoxGeometry(2, 1.6, 2), H.dark, -0.4, 3.3, 0); add(new T.BoxGeometry(0.4, 4.6, 2.2), H.steel, 2.2, 2.6, 0);
        add(new T.BoxGeometry(2.4, 0.3, 0.4), H.steel, 3.4, 0.9, -0.7, false); add(new T.BoxGeometry(2.4, 0.3, 0.4), H.steel, 3.4, 0.9, 0.7, false);
        for (const wx of [-1.2, 1.2]) for (const wz of [-1.3, 1.3]) { const w = add(new T.CylinderGeometry(0.6, 0.6, 0.5, 10), H.dark, wx, 0.6, wz, false); w.rotation.x = Math.PI / 2; }
      }
    },
    tick(api, dt, t) {
      if (api.flag('opened') && !document.getElementById('nextMeeting')) {
        const b = document.createElement('button'); b.id = 'nextMeeting';
        b.innerHTML = 'GO TO THE NEXT COUNCIL MEETING ▶<small style="display:block;font-weight:400;font-size:10px;letter-spacing:2px;color:#c8ecff;margin-top:3px">UNITY CAN NOW STORE EVERYTHING IT MAKES</small>';
        b.style.cssText = 'position:fixed;left:50%;bottom:22px;transform:translateX(-50%);z-index:9;padding:10px 22px;font:600 14px "Segoe UI",Arial;letter-spacing:3px;color:#fff;background:rgba(20,80,60,.85);border:1px solid #9fffd8;border-radius:6px;cursor:pointer';
        b.onmouseenter = () => b.style.background = 'rgba(30,110,80,.95)'; b.onmouseleave = () => b.style.background = 'rgba(20,80,60,.85)';
        b.onclick = () => { location.href = 'councilmeeting/councilmeeting40.html'; };
        document.body.appendChild(b);
      }
    },
    finish: {
      label: 'OPENING DAY',
      cam: [[1550 + 120, 200, 460], [1550 + 440, 40, 0]],
      start(api) { this.stage = 0; this.t1 = 0; P.ring && P.ring(2); },
      update(api, dt, f) {
        this.t1 += dt;
        if (this.stage === 0) {
          P.hint('THE WAREHOUSE DISTRICT OPENS · THE DOORS ROLL UP · THE LOADING WAREHOUSE ROOF SLIDES OPEN · THE TRUCKS PULL IN · THE FIRST PARTS GO ON THE SHELVES');
          if (this.t1 > 10) { this.stage = 1; this.t1 = 0; P.hint(''); P.cover(true, 'THE WAREHOUSE DISTRICT IS OPEN', 'THREE WAREHOUSES · THE COLD STORE · THE TOOL STORE · THE GREAT PARTS HALL · THE LOADING WAREHOUSE'); }
        } else {
          if (this.t1 > 4 && !this._h) { this._h = true; api.setFlag('warehouses', true); api.setFlag('opened', true); }
          if (this.t1 > 6.5) { P.cover(false); this._h = false; return true; }
        }
        return false;
      },
    },
  }));
})();
