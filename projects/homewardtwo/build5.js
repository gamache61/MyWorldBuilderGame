/* ============================================================
   HOMEWARD TWO · BUILD 5 · THE PARK, THE SKY STOP & THE FIRST FAMILIES
   Keep this file in projects/homewardtwo next to 44-homewardtwo.html.
   The park at the head of the street, with a pond, a bridge, a
   pavilion and flower beds; the south gate with its welcome arch; four
   groves round the edge; and the district's own Sky Rail stop, a glass
   platform on slender pylons. Ends with L: the first sky pod arrives
   from Kryos and the first families step out into Homeward Two.
   ============================================================ */
(function () {
  const P = window.HW2;
  P.STOP = { x: -270, z: 700, top: 22 };
  P.lineParent2 = (api) => { const s = api.placed.find(p => p.type === 'SKYSTOP' && p.piece); return s ? s.piece.parent : null; };
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 5, name: 'THE PARK, THE SKY STOP & THE FIRST FAMILIES',
    brief: 'The park with its pond and pavilion, the welcome gate, four groves, and the district’s own Sky Rail stop — then the first sky pod arrives and the first families move in.',
    types: {
      PARK:        { code: 'GD', name: 'THE PARK',       col: '#3fb04a', w: 220, d: 110, h: 14 },
      SKYSTOP:     { code: 'SY', name: 'SKY RAIL STOP',  col: '#9fffd8', w: 220, d: 40,  h: 34 },
      HOMEGATE:    { code: 'SF', name: 'WELCOME GATE',   col: '#e8cfa6', w: 90,  d: 10,  h: 26 },
      FAMILYGROVE: { code: 'GD', name: 'FAMILY GROVE',   col: '#2f8a46', w: 40,  d: 80,  h: 14 },
    },
    order: ['PARK', 'SKYSTOP', 'HOMEGATE', 'FAMILYGROVE'],
    at: { PARK: [[-550, 950]], SKYSTOP: [[-270, 700]], HOMEGATE: [[-550, 385]], FAMILYGROVE: [[-340, 520], [-340, 880], [-770, 520], [-770, 880]] },
    eye: [-220, 220, -260],
    stats(api, c) { return [['PARK', c('PARK') ? 'OPEN' : 'NOT YET'], ['SKY RAIL STOP', c('SKYSTOP') ? 'STANDING' : 'NOT YET'], ['GATE', c('HOMEGATE') ? 'UP' : 'NOT YET'], ['GROVES', c('FAMILYGROVE') + ' / 4'], ['HOMEWARD TWO', api.flag('homewardTwo') ? 'OPEN' : 'NOT YET']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, H = P.h2(api);
      if (type === 'PARK') {
        add(new T.BoxGeometry(220, 0.5, 110), H.grass, 0, 0.25, 0, false);
        // pond with a little bridge, stepping stones and reeds
        add(new T.CylinderGeometry(24, 24.6, 0.9, 32).scale(1.5, 1, 1), H.stone, -40, 0.6, 8); add(new T.CylinderGeometry(22.6, 22.6, 1, 32).scale(1.5, 1, 1), H.water, -40, 0.7, 8, false);
        const br = add(new T.BoxGeometry(20, 0.8, 5), H.timber, -40, 3.4, 8); add(new T.BoxGeometry(20, 1.4, 0.3), H.timber, -40, 4.3, 5.7); add(new T.BoxGeometry(20, 1.4, 0.3), H.timber, -40, 4.3, 10.3);
        for (const s of [-1, 1]) { const r = add(new T.BoxGeometry(8, 0.8, 5), H.timber, -40 + s * 12.5, 2.4, 8); r.rotation.z = s * 0.35; }
        // paths, circling the lawn and crossing to the street
        add(new T.BoxGeometry(220, 0.55, 6), H.paving, 0, 0.3, -40, false); add(new T.BoxGeometry(6, 0.55, 110), H.paving, 40, 0.3, 0, false);
        add(new T.CylinderGeometry(15, 15, 0.6, 28), H.paving, 40, 0.3, 4, false); add(new T.CylinderGeometry(3.2, 3.6, 1.4, 16), H.stone, 40, 1, 4); add(new T.CylinderGeometry(2.7, 2.7, 1.5, 16), H.water, 40, 1.05, 4, false);
        add(new T.CylinderGeometry(0.5, 0.7, 4, 8), H.stone, 40, 3, 4); add(new T.SphereGeometry(1.1, 10, 8), H.water, 40, 5.4, 4, false);
        // pavilion
        for (const [x, z] of [[-8, -8], [8, -8], [-8, 8], [8, 8]]) add(new T.CylinderGeometry(0.7, 0.8, 9, 8), H.white, 80 + x, 4.5, 20 + z);
        add(new T.CylinderGeometry(12, 12, 0.8, 24), H.paving, 80, 0.7, 20); add(new T.ConeGeometry(14, 6, 8), H.clay, 80, 12, 20);
        // flower beds
        for (let i = 0; i < 8; i++) { const x = 70 + (i % 4) * 11 - 16, z = -22 + Math.floor(i / 4) * 12; add(new T.BoxGeometry(9, 0.7, 7), H.stone, x, 0.45, z); for (let q = 0; q < 9; q++) add(new T.SphereGeometry(0.7, 6, 5), H.flower[(i + q) % 5], x - 3 + (q % 3) * 3, 1.1, z - 2 + Math.floor(q / 3) * 2, false); }
        for (const [x, z] of [[-95, -30], [-95, 30], [-70, -42], [-10, 40], [10, 44], [95, -34], [100, 36], [-15, -20], [60, 30]]) P.tree(api, add, x, 0.4, z, 1.1, x + z);
        for (const [x, z] of [[-70, 30], [-10, -34], [20, 12], [60, -8]]) add(new T.BoxGeometry(5, 0.9, 1.4), H.timber, x, 0.95, z);
        for (const [x, z] of [[-80, -12], [-60, 24]]) add(new T.BoxGeometry(8, 0.2, 7), new T.MeshStandardMaterial({ color: [0xd24a3a, 0x2f7fe0][(x < -70) | 0], roughness: 1 }), x, 0.6, z, false);
        P.sign(api, g, 'HOMEWARD TWO PARK', 28, 3, 0, 8, -53, 0, '#1f3b2c', '#d8f8d0', false);
        for (let i = 0; i < 6; i++) P.person(g, i % 2 ? P.kid(44200 + i) : P.civ(44200 + i), 'walk', -80 + i * 28, 0.5, -40, 0, { path: { type: 'line', ax: -90 + i * 30, az: -40, bx: -60 + i * 30, bz: -40, speed: i % 2 ? 1.4 : 0.9 }, scale: i % 2 ? 0.6 : undefined });
        P.person(g, P.civ(44210), 'idle', -62, 0.5, 26, 0); P.person(g, P.kid(44211), 'idle', -78, 0.5, -12, 0, { scale: 0.6 });
        P.person(g, P.civ(44212), 'walk', 40, 0.5, 4, 0, { path: { type: 'circle', cx: 40, cz: 4, r: 11, speed: 0.6 } });
      } else if (type === 'SKYSTOP') {
        const top = P.STOP.top, py = top + 1.2;
        P.beam(api, add, F, -110, 110, top, top, 7);
        // slender pylons down to the ground
        for (let x = -100; x <= 100; x += 50) { const gy = P.ground(api, sl.x + x, sl.z) - sl.y, h = top - 4.4 - gy; if (h < 1) continue; add(new T.CylinderGeometry(1.1, 1.8, h, 12), H.white, x, gy + h / 2, 0); add(new T.BoxGeometry(8, 1.4, 9), F.steel, x, top - 5, 0); }
        // a glass platform with a curved roof on white ribs, on the south side of the beam
        const z0 = -11;
        add(new T.BoxGeometry(96, 1.4, 10), H.stone, 0, py - 0.7, z0); add(new T.BoxGeometry(96, 0.3, 0.5), P.hm(api).yellow, 0, py + 0.05, z0 + 4.4, false);
        for (let x = -44; x <= 44; x += 22) { add(new T.CylinderGeometry(0.8, 1, py, 10), H.white, x, py / 2, z0 - 4); add(new T.TorusGeometry(7.5, 0.4, 6, 20, Math.PI).rotateY(Math.PI / 2), H.white, x, py + 1, z0 - 0.5).scale.y = 0.8; }
        const roof = add(new T.CylinderGeometry(7.5, 7.5, 92, 20, 1, true, -Math.PI / 2, Math.PI).rotateZ(Math.PI / 2), H.glass, 0, py + 1, z0 - 0.5, false); roof.scale.set(1, 0.8, 1);
        add(new T.BoxGeometry(92, 3.2, 0.3), H.glass, 0, py + 1.6, z0 - 5, false);
        for (let x = -36; x <= 36; x += 36) add(new T.BoxGeometry(5, 0.9, 1.2), H.timber, x, py + 0.45, z0 - 3);
        // a lift tower and a stair down to the street
        add(new T.BoxGeometry(8, top + 6, 8), H.glass, 52, (top + 6) / 2, z0 - 2, false); add(new T.BoxGeometry(8.6, 1, 8.6), H.white, 52, top + 6, z0 - 2); add(new T.BoxGeometry(6, 3, 6), P.hm(api).warm, 52, 6, z0 - 2, false);
        add(new T.BoxGeometry(4, 1, 8), H.stone, 52, top + 0.5, z0 + 4);
        const st = add(new T.BoxGeometry(5, 0.8, 52), H.stone, -60, top / 2, z0 - 2); st.rotation.x = Math.atan2(top, 48);
        P.sign(api, g, 'HOMEWARD TWO · SKY RAIL', 24, 3, 0, py + 9, z0 - 4.6, Math.PI, '#0e2a3a', '#9fffd8', false);
        P.sign(api, g, 'KRYOS · SEASHORE · FARMLANDS  ▶', 28, 2.2, -30, py + 4.4, z0 + 4.9, 0, '#0e2a3a', '#ffffff', false);
        P.person(g, P.civ(44230), 'tablet', -20, py, z0 - 1, 0); P.person(g, P.civ(44231), 'idle', 20, py, z0 - 1, Math.PI);
        P.person(g, P.kid(44232), 'idle', 12, py, z0 - 2, Math.PI, { scale: 0.6 });
      } else if (type === 'HOMEGATE') {
        // a welcome arch over the south end of the street: two stone piers, a broad timber beam and a lit sign
        for (const s of [-1, 1]) { add(new T.BoxGeometry(7, 26, 7), H.walls[1], s * 38, 13, 0); add(new T.BoxGeometry(9, 1.2, 9), H.stone, s * 38, 26.6, 0); add(new T.ConeGeometry(6, 5, 4), H.clay, s * 38, 29.8, 0).rotation.y = Math.PI / 4; for (const dz of [-1, 1]) add(new T.SphereGeometry(0.9, 8, 6), H.lamp, s * 38 + 0, 18, dz * 3.8, false); }
        add(new T.BoxGeometry(84, 5, 3), H.timber, 0, 22, 0); add(new T.BoxGeometry(84, 0.8, 4), H.clay, 0, 25.2, 0);
        P.sign(api, g, 'WELCOME TO HOMEWARD TWO', 58, 4.4, 0, 22.3, 1.6, 0, '#4a2a22', '#ffe9c8', true);
        for (let i = 0; i < 5; i++) P.lamp(api, add, -26 + i * 13, 0.4, 7);
        P.person(g, P.civ(44240), 'gesture', 30, 0.4, 8, 0); P.person(g, P.kid(44241), 'walk', 0, 0.4, 14, 0, { path: { type: 'line', ax: -12, az: 14, bx: 12, bz: 14, speed: 1.2 }, scale: 0.6 });
      } else if (type === 'FAMILYGROVE') {
        // a small wood of mixed trees with a bench, a path and a few flowers
        add(new T.BoxGeometry(40, 0.5, 80), H.grass, 0, 0.25, 0, false); add(new T.BoxGeometry(4, 0.55, 80), H.paving, 0, 0.3, 0, false);
        for (let i = 0; i < 16; i++) { const a = (i * 2.399) % 6.28, rr = 5 + (i % 4) * 6; P.tree(api, add, (i % 2 ? 1 : -1) * (8 + (i * 7) % 11), 0.4, -34 + i * 4.4, 0.8 + (i % 3) * 0.25, i + k); }
        for (let z = -24; z <= 24; z += 24) add(new T.BoxGeometry(1.4, 0.9, 5), H.timber, 3.6, 0.95, z);
        for (let i = 0; i < 6; i++) add(new T.SphereGeometry(0.7, 6, 5), H.flower[i % 5], -3 + (i % 2) * 6, 0.9, -28 + i * 11, false);
        P.person(g, P.civ(44250 + k), 'walk', 0, 0.5, 0, 0, { path: { type: 'line', ax: 0, az: -34, bx: 0, bz: 34, speed: 0.9 } });
        if (k % 2 === 0) P.person(g, P.kid(44260 + k), 'idle', 3.8, 0.5, 12, Math.PI / 2, { scale: 0.6 });
      }
    },
    tick(api, dt, t) {
      // once Homeward Two is open, a button leads to the nineteenth council meeting
      if (api.flag('opened') && !document.getElementById('nextMeeting')) {
        const b = document.createElement('button'); b.id = 'nextMeeting';
        b.innerHTML = 'GO TO THE NINETEENTH COUNCIL MEETING ▶<small style="display:block;font-weight:400;font-size:10px;letter-spacing:2px;color:#ffe9c8;margin-top:3px">THE COUNCIL CHOOSES WHAT COMES NEXT</small>';
        b.style.cssText = 'position:fixed;left:50%;bottom:22px;transform:translateX(-50%);z-index:9;padding:10px 22px;font:600 14px "Segoe UI",Arial;letter-spacing:3px;color:#fff;background:rgba(110,60,40,.88);border:1px solid #ffd9a0;border-radius:5px;cursor:pointer;box-shadow:0 0 18px rgba(255,217,160,.45)';
        b.onmouseenter = () => b.style.background = 'rgba(140,80,52,.97)'; b.onmouseleave = () => b.style.background = 'rgba(110,60,40,.88)';
        b.onclick = () => { location.href = 'councilmeeting/councilmeeting19.html'; };
        document.body.appendChild(b);
      }
    },
    finish: {
      label: 'THE FIRST FAMILIES',
      cam: [[-110, 120, 520], [-420, 20, 760]],
      start(api) {
        this.stage = 0; this.t1 = 0; this.pod = null; this.px = -60;
        const par = P.lineParent2(api); this.par = par;
        if (par) {
          const T = api.THREE, add = (geo, m, X, Y, Z, sh, parent) => { const o = new T.Mesh(geo, m); o.position.set(X, Y, Z); o.castShadow = true; parent.add(o); return o; };
          this.y = P.ground(api, P.STOP.x, P.STOP.z) + P.STOP.top;
          this.pod = P.pod(api, add, par, this.px, this.y, P.STOP.z, 0);
        }
        P.ring && P.ring(2);
      },
      update(api, dt, f) {
        this.t1 += dt;
        if (this.stage === 0) {
          P.hint('THE FIRST SKY POD FROM KRYOS GLIDES INTO THE HOMEWARD TWO STOP');
          if (this.pod) { const target = P.STOP.x + 6; this.px = Math.max(target, this.px - Math.min(28, 4 + this.t1 * 5) * dt); this.pod.position.set(this.px, this.y, P.STOP.z); this.pod.rotation.set(0, Math.PI, 0); }
          if (this.t1 > 16 || (this.pod && this.px <= P.STOP.x + 6.01 && this.t1 > 8)) { this.stage = 1; this.t1 = 0; }
        } else if (this.stage === 1) {
          P.hint('THE DOORS OPEN · THE FIRST FAMILIES STEP OUT AND LOOK AT THEIR NEW HOMES');
          if (!this._fam && this.par) {
            this._fam = true;
            for (let i = 0; i < 9; i++) { const px = P.STOP.x - 30 + i * 8, ax = i % 2 ? px - 14 : px + 14; P.person(this.par, i % 3 === 2 ? P.kid(44300 + i) : P.civ(44300 + i), 'walk', px, this.y + 1.2, P.STOP.z - 11, Math.PI / 2, { path: { type: 'line', ax: px, az: P.STOP.z - 11, bx: ax, bz: P.STOP.z - 11, speed: 1.0 }, scale: i % 3 === 2 ? 0.6 : undefined }); }
          }
          if (this.t1 > 16) { this.stage = 2; this.t1 = 0; P.hint(''); P.cover(true, 'HOMEWARD TWO IS OPEN', 'STREETS · HOMES · APARTMENTS · SCHOOL · MARKET · PARK · SKY RAIL STOP · NEXT: THE NINETEENTH COUNCIL MEETING'); }
        } else {
          if (this.t1 > 4 && !this._h) { this._h = true; api.setFlag('homewardTwo', true); api.setFlag('opened', true); }
          if (this.t1 > 6.5) { P.cover(false); this._h = false; return true; }
        }
        return false;
      },
    },
  }));
})();
