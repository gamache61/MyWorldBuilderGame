/* ============================================================
   THE GUARDIAN YARD · BUILD 5 · THE WATCH HALL & OPENING DAY
   Keep this file in projects/guardianyard next to 52-guardianyard.html.
   The watch hall, where every decision to defend Unity is made in the
   open by many hands, and two warning beacons. Ends with L: opening
   day — the shield rises over Unity, the three guard ships lift off
   and circle, and the people of Unity watch.
   ============================================================ */
(function () {
  const P = window.YARD;
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 5, name: 'THE WATCH HALL & OPENING DAY',
    brief: 'The watch hall where every decision to defend Unity is made in the open, and two warning beacons — then opening day, with the shield raised and the guard ships in the sky.',
    types: {
      WATCHHALL: { code: 'SY', name: 'WATCH HALL', col: '#e8e1d1', w: 90, d: 90, h: 40 },
      BEACON: { code: 'HP', name: 'WARNING BEACON', col: '#d9a21b', w: 12, d: 12, h: 60 },
    },
    order: ['WATCHHALL', 'BEACON'],
    at: { WATCHHALL: [[1550, 290]], BEACON: [[1100, 0], [2000, 0]] },
    eye: [1150, 170, 520],
    stats(api, c) { return [['WATCH HALL', c('WATCHHALL') ? 'OPEN TO ALL' : 'NOT YET'], ['WARNING BEACONS', c('BEACON') + ' / 2'], ['OPENING DAY', api.flag('guardianyard') ? 'DONE' : 'NOT YET']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, S = P.hm(api), C = P.fun(api);
      const cry = P._cry = P._cry || [0x7ffcff, 0x9f7bff, 0x6dffb0].map(c => new T.MeshStandardMaterial({ color: c, emissive: c, emissiveIntensity: 1.4, roughness: 0.25, transparent: true, opacity: 0.92 }));
      if (type === 'WATCHHALL') {
        add(new T.CylinderGeometry(46, 48, 2, 40), S.gravel, 0, 1, 0);
        add(new T.CylinderGeometry(38, 38, 22, 40), F.white, 0, 13, 0);
        // a ring of tall glass doors: nothing is decided behind a closed wall
        for (let i = 0; i < 16; i++) { const a = i / 16 * Math.PI * 2; add(new T.BoxGeometry(8, 15, 0.5), S.glass, Math.cos(a) * 38.2, 12, Math.sin(a) * 38.2).rotation.y = -a + Math.PI / 2; }
        add(new T.CylinderGeometry(40, 40, 2.4, 40), S.slate, 0, 25, 0);
        const dome = add(new T.SphereGeometry(34, 32, 14, 0, Math.PI * 2, 0, Math.PI / 2), S.glass, 0, 26, 0); dome.castShadow = false;
        // inside: a ring of thirteen seats round a table (twelve councillors and the Builder) under a glowing globe of Unity
        add(new T.CylinderGeometry(14, 14, 1.6, 28), F.dark, 0, 3, 0);
        for (let i = 0; i < 13; i++) { const a = i / 13 * Math.PI * 2; add(new T.BoxGeometry(3.4, 3, 3.4), i === 0 ? C.yellow : F.steel, Math.cos(a) * 18, 3.5, Math.sin(a) * 18); }
        const gl = add(new T.SphereGeometry(5, 24, 16), new T.MeshStandardMaterial({ color: 0x2f7fe0, emissive: 0x2f7fe0, emissiveIntensity: 0.9, transparent: true, opacity: 0.85 }), 0, 12, 0); gl.castShadow = false;
        const rg = add(new T.TorusGeometry(7, 0.25, 8, 40), cry[0], 0, 12, 0); rg.rotation.x = Math.PI / 2 + 0.3; rg.castShadow = false;
        // wide steps and a notice board where every decision is posted for the whole people
        add(new T.BoxGeometry(30, 1, 10), S.stone, 0, 0.5, 52); add(new T.BoxGeometry(26, 1, 6), S.stone, 0, 1.4, 50);
        add(new T.BoxGeometry(20, 8, 1), F.dark, 34, 5, 50); P.sign(api, g, 'EVERY DECISION TOLD TO ALL', 20, 3, 34, 6, 49.4, 0, '#14324a', '#ffe9b8', true);
        P.sign(api, g, 'WATCH HALL · DECIDED IN THE OPEN', 46, 4, 0, 30, 36, 0, '#14324a', '#bff8ff', true);
        for (let i = 0; i < 6; i++) P.person(g, P.civ(52600 + i), i % 3 === 1 ? 'tablet' : 'idle', -22 + i * 9, 1, 60, Math.PI);
        P.person(g, P.kid(52650), 'idle', 6, 1, 64, Math.PI);
      } else {
        add(new T.CylinderGeometry(7, 8, 2, 14), S.stone, 0, 1, 0);
        add(new T.CylinderGeometry(1.6, 2.6, 50, 10), F.white, 0, 27, 0);
        for (const y of [14, 30, 44]) add(new T.CylinderGeometry(3, 3, 1.4, 10), C.yellow, 0, y, 0);
        add(new T.CylinderGeometry(4.4, 3, 4, 10), F.dark, 0, 54, 0);
        const lamp = add(new T.SphereGeometry(3.6, 14, 10), new T.MeshBasicMaterial({ color: new T.Color(2.0, 1.3, 0.4), toneMapped: false }), 0, 59, 0); lamp.castShadow = false;
      }
    },
    tick(api, dt, t) {
      if (api.flag('opened') && !document.getElementById('nextMeeting')) {
        const b = document.createElement('button'); b.id = 'nextMeeting';
        b.innerHTML = 'GO TO THE TWENTY-THIRD COUNCIL MEETING ▶<small style="display:block;font-weight:400;font-size:10px;letter-spacing:2px;color:#c8ecff;margin-top:3px">A STRANGE SHIP WAITS AT THE EDGE OF THE SKY</small>';
        b.style.cssText = 'position:fixed;left:50%;bottom:22px;transform:translateX(-50%);z-index:9;padding:10px 22px;font:600 14px "Segoe UI",Arial;letter-spacing:3px;color:#fff;background:rgba(20,60,100,.85);border:1px solid #80d8ff;border-radius:5px;cursor:pointer';
        b.onmouseenter = () => b.style.background = 'rgba(30,80,130,.95)'; b.onmouseleave = () => b.style.background = 'rgba(20,60,100,.85)';
        b.onclick = () => { location.href = 'councilmeeting/councilmeeting23.html'; };
        document.body.appendChild(b);
      }
    },
    finish: {
      label: 'OPENING DAY',
      cam: [[1000, 190, 620], [1550, 70, 0]],
      start(api) {
        this.stage = 0; this.t1 = 0; P.ring && P.ring(2);
        const T = api.THREE, par = (api.placed.find(p => p.piece && p.piece.parent) || {}).piece; if (!par) return;
        const grp = new T.Group(); par.parent.add(grp); this.grp = grp;
        this.y0 = api.DECK_TOP;
        const sh = new T.Mesh(new T.SphereGeometry(640, 40, 20, 0, Math.PI * 2, 0, Math.PI / 2), new T.MeshBasicMaterial({ color: new T.Color(0.25, 0.9, 1.0), transparent: true, opacity: 0, blending: T.AdditiveBlending, depthWrite: false, side: T.DoubleSide, toneMapped: false }));
        sh.position.set(1550, this.y0, 0); grp.add(sh); this.dome = sh;
        const wf = new T.Mesh(new T.SphereGeometry(641, 28, 14, 0, Math.PI * 2, 0, Math.PI / 2), new T.MeshBasicMaterial({ color: new T.Color(0.5, 1.6, 1.8), wireframe: true, transparent: true, opacity: 0, depthWrite: false, toneMapped: false }));
        wf.position.copy(sh.position); grp.add(wf); this.wire = wf;
        const add = (geo, mat, x = 0, y = 0, z = 0, shadow = true, parent = grp) => { const m = new T.Mesh(geo, mat); m.position.set(x, y, z); m.castShadow = shadow; parent.add(m); return m; };
        this.ships = []; this.apron = [[1400, 110], [1550, 110], [1700, 110]];
        this.apron.forEach(([x, z], i) => { const s = P.gship(api, add, grp, x, this.y0 + 0.6, z, 0, 1); s.visible = false; this.ships.push(s); });
        this.orig = api.placed.filter(p => p.type === 'GUARDSHIP' && p.piece).map(p => p.piece);
        this.pos = this.ships.map(s => s.position.clone());
      },
      update(api, dt, f) {
        this.t1 += dt;
        const sm = e => e * e * (3 - 2 * e);
        if (this.dome) {
          const on = this.stage === 0 ? sm(Math.min(1, this.t1 / 8)) : this.stage === 1 ? 1 : Math.max(0, 1 - this.t1 / 5);
          this.dome.material.opacity = on * (0.10 + Math.sin(f * 2) * 0.02); this.wire.material.opacity = on * 0.22;
        }
        const fly = (u) => {   // u: seconds into the flight
          this.ships.forEach((s, i) => {
            const e = sm(Math.min(1, u / 7)), back = sm(Math.min(1, Math.max(0, (u - 17) / 7))), k = e * (1 - back);
            const ang = i / 3 * Math.PI * 2 + u * 0.45, ox = 1550 + Math.cos(ang) * 260, oz = Math.sin(ang) * 260, oy = this.y0 + 170 + Math.sin(u + i) * 8;
            const nx = this.apron[i][0] + (ox - this.apron[i][0]) * k, nz = this.apron[i][1] + (oz - this.apron[i][1]) * k, ny = this.y0 + 0.6 + (oy - this.y0 - 0.6) * k;
            const dx = nx - s.position.x, dz = nz - s.position.z; if (dx * dx + dz * dz > 0.0004) s.rotation.y = Math.atan2(dx, dz);
            if (k < 0.001) s.rotation.y = 0;
            s.position.set(nx, ny, nz); s.rotation.z = -Math.sin(ang) * 0.25 * k;
          });
        };
        if (this.stage === 0) {
          P.hint('OPENING DAY · THE SHIELD TOWERS RAISE THE SHIELD OVER ALL OF UNITY');
          if (this.t1 > 9) { this.stage = 1; this.t1 = 0; P.ring && P.ring(3); this.orig.forEach(p => p.visible = false); this.ships.forEach(s => s.visible = true); }
        } else if (this.stage === 1) {
          P.hint('THREE GUARD SHIPS LIFT OFF AND CIRCLE · THEY ARE THERE TO SHIELD AND TO RESCUE');
          fly(this.t1);
          if (this.t1 > 24) { this.stage = 2; this.t1 = 0; this.orig.forEach(p => p.visible = true); this.ships.forEach(s => s.visible = false); P.hint(''); P.cover(true, 'THE GUARDIAN YARD IS OPEN', 'THE SHIELD TOWERS · THE BUILDING SLIPS · THE GUARD SHIPS · THE SHIELD HEART · THE WATCH HALL · NEXT: THE TWENTY-THIRD COUNCIL MEETING'); }
        } else {
          if (this.t1 > 4 && !this._h) { this._h = true; api.setFlag('guardianyard', true); api.setFlag('opened', true); }
          if (this.t1 > 6.5) { P.cover(false); this._h = false; return true; }
        }
        return false;
      },
    },
  }));
})();
