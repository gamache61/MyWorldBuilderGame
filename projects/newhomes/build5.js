/* ============================================================
   NEW HOMES FOR THE FAMILIES · BUILD 5 · THE PARK & MOVING-IN DAY
   Keep this file in projects/newhomes next to newhomes.html.
   Homeward Park at the top of the main street, with a pond, a
   bandstand and lawns; a sky-pod stop; and the district gate facing
   the landing field. Ends with L: moving-in day — the families from
   the Homeward Fleet carry their things up the main street, the lights
   come on in every window, and nine thousand families are home.
   ============================================================ */
(function () {
  const P = window.HOMES;
  P.hint = (text) => {
    let el = document.getElementById('playHint');
    if (!el) { el = document.createElement('div'); el.id = 'playHint'; el.style.cssText = 'position:fixed;left:50%;bottom:90px;transform:translateX(-50%);z-index:8;padding:8px 18px;background:rgba(8,20,35,.85);border:1px solid #ffd060;border-radius:5px;color:#fff;font:600 13px "Segoe UI",Arial;letter-spacing:3px;text-align:center;pointer-events:none'; document.body.appendChild(el); }
    el.style.display = text ? 'block' : 'none'; if (text) el.textContent = text;
  };
  P.cover = (on, a, b) => {
    let el = document.getElementById('playCover');
    if (!el) { el = document.createElement('div'); el.id = 'playCover'; el.style.cssText = 'position:fixed;inset:0;z-index:8;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:0 40px;background:rgba(8,16,28,.92);color:#fff;font-family:"Segoe UI",Arial;opacity:0;transition:opacity 1.2s;pointer-events:none'; document.body.appendChild(el); }
    if (on) el.innerHTML = '<div style="font-size:26px;letter-spacing:7px;font-weight:600">' + a + '</div><div style="font-size:14px;letter-spacing:4px;margin-top:12px;color:#ffe9b8">' + (b || '') + '</div>';
    el.style.opacity = on ? 1 : 0;
  };
  // moving-in day: families walk in through the gate and up the main street, carrying their boxes
  P.movingIn = (api) => {
    if (P._moved) return; const gate = api.placed.find(p => p.type === 'HOMEGATE' && p.piece); if (!gate) return; P._moved = true;
    for (let i = 0; i < 12; i++) {
      const kid = i % 4 === 3, x0 = (i % 4 - 1.5) * 2.6, z0 = -30 - (i >> 2) * 6;
      P.person(gate.piece, kid ? P.kid(16800 + i) : P.civ(16800 + i), 'walk', x0, 0, z0, 0, Object.assign(kid ? { scale: 0.6 } : {}, { path: { type: 'line', ax: x0, az: z0, bx: x0, bz: 120 + (i % 6) * 40, speed: kid ? 1.5 : 1.1 } }));
    }
  };
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 5, name: 'THE PARK & MOVING-IN DAY',
    brief: 'Homeward Park with a pond and a bandstand, a sky-pod stop and the district gate — then moving-in day, when nine thousand families come home.',
    types: {
      PARK:     { code: 'GD', name: 'HOMEWARD PARK', col: '#3fb04a', w: 500, d: 150, h: 12 },
      SKYSTOP:  { code: 'SY', name: 'SKY-POD STOP', col: '#7fd8ff', w: 50, d: 30, h: 16 },
      HOMEGATE: { code: 'HP', name: 'DISTRICT GATE', col: '#ffd060', w: 60, d: 8, h: 30 },
    },
    order: ['PARK', 'SKYSTOP', 'HOMEGATE'],
    at: { PARK: [[120, 990]], SKYSTOP: [[-110, 650]], HOMEGATE: [[120, 345]] },
    eye: [-240, 240, -280],
    stats(api, c) { return [['HOMEWARD PARK', c('PARK') ? 'OPEN' : 'NOT YET'], ['SKY-POD STOP', c('SKYSTOP') ? 'RUNNING' : 'NOT YET'], ['DISTRICT GATE', c('HOMEGATE') ? 'STANDING' : 'NOT YET'], ['FAMILIES HOME', api.flag('homesOpen') ? '9,000' : 'NOT YET']]; },
    make(type, k, g, add, F, api) {
      const T = api.THREE, S = P.hm(api), C = P.fun(api);
      if (type === 'PARK') {
        add(new T.BoxGeometry(500, 0.4, 150), C.grass, 0, 0.2, 0);
        // a pond with a little island, paths round it and a bandstand on the lawn
        add(new T.CylinderGeometry(46, 46, 0.6, 40), S.stone, -120, 0.5, 5); add(new T.CylinderGeometry(44, 44, 0.4, 40), F.water, -120, 0.8, 5, false);
        add(new T.CylinderGeometry(8, 9, 1.4, 16), C.grass, -120, 1, 5); add(new T.CylinderGeometry(0.5, 0.7, 5, 6), F.wood, -120, 3.5, 5); add(new T.IcosahedronGeometry(4, 1), F.crops[2], -120, 7.5, 5);
        add(new T.TorusGeometry(52, 2, 4, 48).rotateX(Math.PI / 2), C.path, -120, 0.45, 5, false);
        add(new T.BoxGeometry(12, 0.4, 150), C.path, 0, 0.45, 0, false);
        add(new T.CylinderGeometry(11, 11, 1.4, 8), F.white, 110, 0.9, -10);
        for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2; add(new T.CylinderGeometry(0.4, 0.4, 7, 6), F.white, 110 + Math.cos(a) * 10, 5, -10 + Math.sin(a) * 10); }
        add(new T.ConeGeometry(13, 5, 8), S.copper, 110, 11, -10);
        for (let i = 0; i < 5; i++) P.figure(api, add, 106 + i * 2, 1.6, -12, 1, i);
        for (let i = 0; i < 14; i++) P.figure(api, add, 80 + (i % 7) * 9, 0.4, 10 + (i >> 1 & 3) * 5, i % 3 ? 1 : 0.6, i + 5);
        // trees all round the edge, benches, a playing lawn and a few picnics
        for (let i = 0; i < 34; i++) { const t = i / 34, x = -240 + (i % 17) * 30, z = i < 17 ? -66 : 66; add(new T.CylinderGeometry(0.6, 0.8, 6, 6), F.wood, x, 3, z); add(new T.IcosahedronGeometry(4.6, 1), F.crops[i % 5], x + (i % 3), 8.4, z); }
        for (let i = 0; i < 6; i++) add(new T.BoxGeometry(5, 0.5, 1.4), F.wood, -60 + i * 30, 1.2, (i % 2 ? 1 : -1) * 54);
        for (const [x, z, c] of [[180, 30, 'red'], [200, -30, 'blue'], [-200, 40, 'yellow']]) { add(new T.BoxGeometry(6, 0.2, 6), C[c], x, 0.5, z, false); for (let i = 0; i < 3; i++) P.figure(api, add, x - 2 + i * 2, 0.4, z, i === 1 ? 0.6 : 1, i + x); }
        P.person(g, P.civ(16300), 'walk', 0, 0.4, 0, 0, { path: { type: 'circle', cx: -120, cz: 5, r: 52, speed: 1.2 } });
        P.person(g, P.kid(16301), 'walk', 0, 0.4, 0, 0, { path: { type: 'circle', cx: 150, cz: 25, r: 16, speed: 1.8 }, scale: 0.6 });
        P.sign(api, g, 'HOMEWARD PARK', 20, 3, 0, 4, -74.6, Math.PI, '#ffffff', '#3a6a2a', false);
      } else if (type === 'SKYSTOP') {
        // a raised platform on the sky-pod line, with a glass shelter and a waiting pod
        add(new T.BoxGeometry(50, 0.6, 30), S.stone, 0, 0.3, 0);
        for (const [x, z] of [[-20, -8], [20, -8], [-20, 8], [20, 8]]) add(new T.CylinderGeometry(0.8, 1, 10, 10), F.white, x, 5, z);
        add(new T.BoxGeometry(48, 1, 22), F.white, 0, 10.5, 0); add(new T.BoxGeometry(30, 5, 6), S.glass, 0, 13.5, 4, false); add(new T.BoxGeometry(31, 0.5, 7), F.white, 0, 16.2, 4);
        add(new T.BoxGeometry(50, 0.8, 1.2), S.glow, 0, 11.4, -7, false);
        const pod = add(new T.CapsuleGeometry(3, 8, 6, 14).rotateZ(Math.PI / 2), F.white, 4, 14, -5); pod.scale.z = 0.8; add(new T.BoxGeometry(7, 2, 4.6), S.glass, 4, 15.4, -5, false);
        add(new T.BoxGeometry(4, 10, 4), F.white, -22, 5, 12); for (let i = 0; i < 4; i++) add(new T.BoxGeometry(3.6, 0.5, 2), F.stoneDark, -22, 1 + i * 2.6, 15 + i * 0.1);
        for (let i = 0; i < 4; i++) P.figure(api, add, -8 + i * 4, 11, 4, i === 2 ? 0.6 : 1, i + 9);
        P.sign(api, g, 'SKY POD · HOMEWARD', 14, 2, 0, 9, -11.1, Math.PI, '#12333a', '#bff8d0', false);
      } else if (type === 'HOMEGATE') {
        // a timber and stone gate over the main street with the district's name, facing the landing field
        for (const s of [-1, 1]) { add(new T.BoxGeometry(6, 22, 6), S.stone, s * 18, 11, 0); add(new T.BoxGeometry(7, 2, 7), S.copper, s * 18, 23, 0); add(new T.SphereGeometry(1.4, 10, 8), F.lamp, s * 18, 25, 0, false); }
        add(new T.TorusGeometry(15, 1.2, 8, 40, Math.PI), S.timber, 0, 12, 0);
        add(new T.BoxGeometry(42, 4, 3), S.timber, 0, 29, 0);
        P.sign(api, g, 'HOMEWARD · NEW HOMES FOR THE FAMILIES', 38, 3, 0, 29, -1.6, Math.PI, '#fff6e0', '#7a4a1a', false);
        P.sign(api, g, 'WELCOME HOME', 30, 3, 0, 29, 1.6, 0, '#fff6e0', '#7a4a1a', false);
        add(new T.BoxGeometry(12, 0.4, 40), C.path, 0, 0.25, -14, false);
        for (const s of [-1, 1]) for (let i = 0; i < 3; i++) { add(new T.IcosahedronGeometry(1.8, 0), F.flower, s * (24 + i * 4), 1.6, -2, false); add(new T.IcosahedronGeometry(1.6, 0), F.berry, s * (26 + i * 4), 1.4, 2, false); }
      }
    },
    tick(api, dt) {
      // clear the wild forest trees out of the new district, so none stand in the pond or the gardens
      if (!P._cleared) { const p = api.placed.find(q => q.piece && q.piece.parent); if (p) { P._cleared = true; let root = p.piece; while (root.parent) root = root.parent;
        const m4 = new api.THREE.Matrix4(), v = new api.THREE.Vector3(), zero = new api.THREE.Matrix4().makeScale(0, 0, 0);
        root.traverse(o => { if (!o.isInstancedMesh || o.count < 5000) return; let hit = false;
          for (let i = 0; i < o.count; i++) { o.getMatrixAt(i, m4); v.setFromMatrixPosition(m4); if (v.x > -190 && v.x < 430 && v.z > 280 && v.z < 1130) { o.setMatrixAt(i, zero); hit = true; } }
          if (hit) { o.instanceMatrix.needsUpdate = true; o.computeBoundingSphere && o.computeBoundingSphere(); } }); } }
      // once the families are home, a button leads straight into the twelfth council meeting
      if (api.flag('opened') && !document.getElementById('nextMeeting')) {
        const b = document.createElement('button'); b.id = 'nextMeeting';
        b.innerHTML = 'GO TO THE TWELFTH COUNCIL MEETING ▶<small style="display:block;font-weight:400;font-size:10px;letter-spacing:2px;color:#ffe9b8;margin-top:3px">THE COUNCIL CHOOSES WHAT COMES NEXT</small>';
        b.style.cssText = 'position:fixed;left:50%;bottom:22px;transform:translateX(-50%);z-index:9;padding:10px 22px;font:600 14px "Segoe UI",Arial;letter-spacing:3px;color:#fff;background:rgba(120,90,20,.85);border:1px solid #ffd060;border-radius:5px;cursor:pointer;box-shadow:0 0 18px rgba(255,208,96,.45)';
        b.onmouseenter = () => b.style.background = 'rgba(160,120,30,.95)'; b.onmouseleave = () => b.style.background = 'rgba(120,90,20,.85)';
        b.onclick = () => { location.href = 'councilmeeting/councilmeeting12.html'; };
        document.body.appendChild(b);
      }
      if (api.flag('homesOpen')) P.movingIn(api);
    },
    finish: {
      label: 'MOVING-IN DAY',
      cam: [[120, 70, 230], [120, 10, 420]],
      start(api) { this.stage = 0; this.t1 = 0; },
      update(api, dt, f) {
        this.t1 += dt;
        if (this.stage === 0) {
          P.movingIn(api); P.hint('MOVING-IN DAY · THE FAMILIES FROM THE HOMEWARD FLEET WALK THROUGH THE GATE TO THEIR NEW HOMES');
          if (this.t1 > 12) { this.stage = 1; this.t1 = 0; P.ring(2); }
        } else if (this.stage === 1) {
          P.hint('THE LIGHTS COME ON IN EVERY WINDOW · NO MORE ARK CABINS AND SPARE ROOMS');
          if (this.t1 > 10) { this.stage = 2; this.t1 = 0; P.hint(''); P.cover(true, 'NINE THOUSAND FAMILIES ARE HOME', 'GARDEN STREETS · ROWS OF HOMES · SIX APARTMENT BLOCKS · A SCHOOL · A MARKET · COMMUNITY GARDENS · HOMEWARD PARK · NEXT: THE TWELFTH COUNCIL MEETING'); }
        } else {
          if (this.t1 > 4 && !this._h) { this._h = true; api.setFlag('homesOpen', true); api.setFlag('opened', true); }
          if (this.t1 > 6.5) { P.cover(false); this._h = false; return true; }
        }
        return false;
      },
    },
  }));
})();
