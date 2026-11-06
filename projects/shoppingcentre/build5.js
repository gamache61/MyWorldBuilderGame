/* ============================================================
   THE KRYOS SHOPPING CENTRE · BUILD 5 · THE ROOF GARDEN & OPENING DAY
   Keep this file in projects/shoppingcentre next to shoppingcentre.html.
   Gardens over both rows of shops, a sky-pod stop beside the promenade,
   and the gate facing the boulevard. Ends with L: opening day — the
   families of Kryos come through the gate, the shops light up, and the
   Kryos Shopping Centre is open.
   ============================================================ */
(function () {
  const P = window.SHOP;
  P.hint = (text) => {
    let el = document.getElementById('playHint');
    if (!el) { el = document.createElement('div'); el.id = 'playHint'; el.style.cssText = 'position:fixed;left:50%;bottom:90px;transform:translateX(-50%);z-index:8;padding:8px 18px;background:rgba(8,20,35,.85);border:1px solid #ffc890;border-radius:5px;color:#fff;font:600 13px "Segoe UI",Arial;letter-spacing:3px;text-align:center;pointer-events:none'; document.body.appendChild(el); }
    el.style.display = text ? 'block' : 'none'; if (text) el.textContent = text;
  };
  P.cover = (on, a, b) => {
    let el = document.getElementById('playCover');
    if (!el) { el = document.createElement('div'); el.id = 'playCover'; el.style.cssText = 'position:fixed;inset:0;z-index:8;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:0 40px;background:rgba(8,16,28,.92);color:#fff;font-family:"Segoe UI",Arial;opacity:0;transition:opacity 1.2s;pointer-events:none'; document.body.appendChild(el); }
    if (on) el.innerHTML = '<div style="font-size:26px;letter-spacing:7px;font-weight:600">' + a + '</div><div style="font-size:14px;letter-spacing:4px;margin-top:12px;color:#ffe6c8">' + (b || '') + '</div>';
    el.style.opacity = on ? 1 : 0;
  };
  // opening day: families walk in through the gate, along the promenade and into the great hall
  P.opening = (api) => {
    if (P._open) return; const gate = api.placed.find(p => p.type === 'SHOPGATE' && p.piece); if (!gate) return; P._open = true;
    for (let i = 0; i < 12; i++) {
      const kid = i % 4 === 3, z0 = (i % 4 - 1.5) * 2.4, x0 = 26 + (i >> 2) * 6;
      P.person(gate.piece, kid ? P.kid(18800 + i) : P.civ(18800 + i), 'walk', x0, 0, z0, -Math.PI / 2, Object.assign(kid ? { scale: 0.6 } : {}, { path: { type: 'line', ax: x0, az: z0, bx: -150 - (i % 4) * 20, bz: z0, speed: kid ? 1.5 : 1.1 } }));
    }
  };
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 5, name: 'THE ROOF GARDEN & OPENING DAY',
    brief: 'Gardens over both rows of shops, a sky-pod stop by the promenade and the gate to the boulevard — then opening day.',
    types: {
      ROOFGARDEN: { code: 'GD', name: 'ROOF GARDEN', col: '#3fb04a', w: 120, d: 280, h: 8 },
      SHOPPOD:    { code: 'SY', name: 'SKY-POD STOP', col: '#7fd8ff', w: 50, d: 30, h: 16 },
      SHOPGATE:   { code: 'HP', name: 'SHOPPING CENTRE GATE', col: '#ffc890', w: 8, d: 60, h: 30 },
    },
    order: ['ROOFGARDEN', 'SHOPPOD', 'SHOPGATE'],
    at: { ROOFGARDEN: [[-1070, 0]], SHOPPOD: [[-945, 130]], SHOPGATE: [[-893, 0]] },
    eye: [260, 230, 300],
    stats(api, c) { return [['ROOF GARDEN', c('ROOFGARDEN') ? 'PLANTED' : 'NOT YET'], ['SKY-POD STOP', c('SHOPPOD') ? 'RUNNING' : 'NOT YET'], ['GATE', c('SHOPGATE') ? 'STANDING' : 'NOT YET'], ['THE SHOPPING CENTRE', api.flag('shopOpen') ? 'OPEN' : 'NOT YET']]; },
    make(type, k, g, add, F, api) {
      const T = api.THREE, S = P.hm(api), C = P.fun(api);
      if (type === 'ROOFGARDEN') {
        // gardens on the roofs of both shop rows: lawns, trees, flower beds and paths, with rails at the edges
        for (const s of [-1, 1]) {
          const x = s * 46, y = 26;
          add(new T.BoxGeometry(38, 0.6, 276), C.grass, x, y + 0.3, 0);
          add(new T.BoxGeometry(4, 0.3, 276), C.path, x, y + 0.75, 0, false);
          for (const e of [-1, 1]) add(new T.BoxGeometry(0.3, 1.4, 276), S.glass, x + e * 19, y + 1.3, 0, false);
          for (let i = 0; i < 12; i++) { const z = -126 + i * 23, tx = x + (i % 2 ? 9 : -9); add(new T.CylinderGeometry(0.4, 0.6, 4, 6), F.wood, tx, y + 2.6, z); add(new T.IcosahedronGeometry(3.4, 1), F.crops[(i + (s > 0 ? 2 : 0)) % 5], tx, y + 6.4, z); }
          for (let i = 0; i < 20; i++) add(new T.IcosahedronGeometry(0.9, 0), i % 3 ? F.flower : F.berry, x + (i % 2 ? -12 : 12), y + 1.2, -130 + i * 13.6, false);
          for (let i = 0; i < 6; i++) { add(new T.BoxGeometry(1.4, 0.5, 5), F.wood, x + 4, y + 1.2, -100 + i * 40); P.figure(api, add, x + 4, y + 0.6, -100 + i * 40, i % 3 ? 1 : 0.6, i + (s > 0 ? 6 : 0)); }
          P.person(g, P.civ(18300 + (s > 0 ? 1 : 0)), 'walk', 0, y + 0.6, 0, 0, { path: { type: 'line', ax: x, az: -130, bx: x, bz: 130, speed: 1 } });
        }
      } else if (type === 'SHOPPOD') {
        add(new T.BoxGeometry(50, 0.6, 30), S.stone, 0, 0.3, 0);
        for (const [x, z] of [[-20, -8], [20, -8], [-20, 8], [20, 8]]) add(new T.CylinderGeometry(0.8, 1, 10, 10), F.white, x, 5, z);
        add(new T.BoxGeometry(48, 1, 22), F.white, 0, 10.5, 0); add(new T.BoxGeometry(30, 5, 6), S.glass, 0, 13.5, 4, false); add(new T.BoxGeometry(31, 0.5, 7), F.white, 0, 16.2, 4);
        add(new T.BoxGeometry(50, 0.8, 1.2), S.glow, 0, 11.4, -7, false);
        add(new T.CapsuleGeometry(3, 8, 6, 14).rotateZ(Math.PI / 2), F.white, 4, 14, -5).scale.z = 0.8; add(new T.BoxGeometry(7, 2, 4.6), S.glass, 4, 15.4, -5, false);
        add(new T.BoxGeometry(4, 10, 4), F.white, -22, 5, 12); for (let i = 0; i < 4; i++) add(new T.BoxGeometry(3.6, 0.5, 2), F.stoneDark, -22, 1 + i * 2.6, 15 + i * 0.1);
        for (let i = 0; i < 4; i++) P.figure(api, add, -8 + i * 4, 11, 4, i === 2 ? 0.6 : 1, i + 9);
        P.sign(api, g, 'SKY POD · SHOPPING CENTRE', 16, 2, 0, 9, -11.1, Math.PI, '#12333a', '#bff8d0', false);
      } else if (type === 'SHOPGATE') {
        // a warm copper and glass arch over the promenade, facing the boulevard
        for (const s of [-1, 1]) { add(new T.BoxGeometry(6, 22, 6), F.white, 0, 11, s * 20); add(new T.BoxGeometry(7, 1.6, 7), S.brass, 0, 22.8, s * 20); add(new T.SphereGeometry(1.4, 10, 8), F.lamp, 0, 24.8, s * 20, false); }
        add(new T.TorusGeometry(17, 1.2, 8, 40, Math.PI).rotateY(Math.PI / 2), S.brass, 0, 11, 0);
        add(new T.BoxGeometry(4, 4, 40), F.white, 0, 30, 0);
        P.sign(api, g, 'KRYOS SHOPPING CENTRE', 36, 3, 2.1, 30, 0, Math.PI / 2, '#ffffff', '#c86a1a', false);
        P.sign(api, g, 'COME AGAIN SOON', 30, 3, -2.1, 30, 0, -Math.PI / 2, '#ffffff', '#c86a1a', false);
        add(new T.BoxGeometry(30, 0.4, 14), C.path, 15, 0.25, 0, false);
        for (const s of [-1, 1]) for (let i = 0; i < 3; i++) add(new T.IcosahedronGeometry(1.8, 0), i % 2 ? F.flower : F.crops[i], 4 + i * 5, 1.6, s * 25, false);
      }
    },
    tick(api, dt) {
      // once the shopping centre is open, a button leads straight into the fourteenth council meeting
      if (api.flag('opened') && !document.getElementById('nextMeeting')) {
        const b = document.createElement('button'); b.id = 'nextMeeting';
        b.innerHTML = 'GO TO THE FOURTEENTH COUNCIL MEETING ▶<small style="display:block;font-weight:400;font-size:10px;letter-spacing:2px;color:#ffe6c8;margin-top:3px">THE COUNCIL CHOOSES WHAT COMES NEXT</small>';
        b.style.cssText = 'position:fixed;left:50%;bottom:22px;transform:translateX(-50%);z-index:9;padding:10px 22px;font:600 14px "Segoe UI",Arial;letter-spacing:3px;color:#fff;background:rgba(130,80,30,.85);border:1px solid #ffc890;border-radius:5px;cursor:pointer;box-shadow:0 0 18px rgba(255,200,144,.45)';
        b.onmouseenter = () => b.style.background = 'rgba(165,105,40,.95)'; b.onmouseleave = () => b.style.background = 'rgba(130,80,30,.85)';
        b.onclick = () => { location.href = 'councilmeeting/councilmeeting14.html'; };
        document.body.appendChild(b);
      }
      if (api.flag('shopOpen')) P.opening(api);
    },
    finish: {
      label: 'OPEN THE SHOPPING CENTRE',
      cam: [[-820, 70, 130], [-960, 15, 0]],
      start(api) { this.stage = 0; this.t1 = 0; },
      update(api, dt, f) {
        this.t1 += dt;
        if (this.stage === 0) {
          P.opening(api); P.hint('OPENING DAY · THE FAMILIES OF KRYOS COME THROUGH THE GATE');
          if (this.t1 > 12) { this.stage = 1; this.t1 = 0; P.ring(2); }
        } else if (this.stage === 1) {
          P.hint('SIXTY-FOUR SHOPS, TWELVE WORKSHOPS, A FOOD HALL AND A MARKET · EVERYTHING A FAMILY NEEDS, CLOSE TO HOME');
          if (this.t1 > 10) { this.stage = 2; this.t1 = 0; P.hint(''); P.cover(true, 'THE KRYOS SHOPPING CENTRE IS OPEN', 'THE GREAT GLASS HALL · THE FOOD HALL · TWO CAFÉS · THE WORKSHOPS · THE MARKET SQUARE · THE ROOF GARDEN · NEXT: THE FOURTEENTH COUNCIL MEETING'); }
        } else {
          if (this.t1 > 4 && !this._h) { this._h = true; api.setFlag('shopOpen', true); api.setFlag('opened', true); }
          if (this.t1 > 6.5) { P.cover(false); this._h = false; return true; }
        }
        return false;
      },
    },
  }));
})();
