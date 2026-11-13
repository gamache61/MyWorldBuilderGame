/* ============================================================
   THE SEED VAULT · BUILD 5 · THE COLD PLANT, THE SEED LAB & THE OPENING
   Keep this file in projects/seedvault next to 64-seedvault.html.
   A cold plant that keeps the vault at -18 degrees and a glass seed lab beside it.
   Ends with L: the shuttle lands on the pad, the first seed keepers walk to the
   vault door and the great doors slide open.
   ============================================================ */
(function () {
  const P = window.SDV;
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 5, name: 'THE COLD PLANT & THE FIRST SEEDS',
    brief: 'A cold plant with roof fans, tanks and pipes that keeps the vault deep-frozen, and a glass seed lab where the first seeds are sorted, counted and packed. Then the doors open.',
    types: {
      COLDPLANT: { code: 'SF', name: 'COLD PLANT', col: '#c8ced6', w: 30, d: 24, h: 14 },
      SEEDLAB:   { code: 'SF', name: 'SEED LAB',   col: '#bfe8ff', w: 36, d: 24, h: 10 },
    },
    order: ['COLDPLANT', 'SEEDLAB'],
    at: { COLDPLANT: [[1550 + 110, -60]], SEEDLAB: [[1550 - 110, -60]] },
    eye: [1550 + 130, P.SY + 120, 120],
    stats(api, c) { return [['COLD PLANT', c('COLDPLANT') ? 'RUNNING' : 'NOT YET'], ['SEED LAB', c('SEEDLAB') ? 'STANDING' : 'NOT YET'], ['THE SEED VAULT', api.flag('seedvault') ? 'OPEN' : 'NOT YET']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, H = P.sv(api);
      if (type === 'COLDPLANT') {
        add(new T.BoxGeometry(30, 0.6, 24), H.concrete2, 0, 0.3, 0, false);
        add(new T.BoxGeometry(26, 11, 18), H.concrete, -1, 6.1, 0, true);
        add(new T.BoxGeometry(28, 0.8, 20), H.steel, -1, 12, 0, true);
        for (let i = 0; i < 3; i++) { add(new T.CylinderGeometry(2.6, 2.6, 0.6, 20), H.dark, -8 + i * 8, 12.7, 0, false); const fan = add(new T.BoxGeometry(4.6, 0.15, 0.5), H.steel, -8 + i * 8, 13.1, 0, false); fan.userData.keep = true; fan.name = 'fan'; fan.rotation.y = i; }
        for (let i = 0; i < 2; i++) { add(new T.CylinderGeometry(2.4, 2.4, 9, 16), H.tank, 13 + i * 0, 4.5, -6 + i * 12, true); add(new T.SphereGeometry(2.4, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2), H.tank, 13, 9, -6 + i * 12, false); }
        add(new T.CylinderGeometry(0.4, 0.4, 24, 8), H.pipe, 10.5, 5, 0, false).rotation.x = Math.PI / 2;
        add(new T.CylinderGeometry(0.4, 0.4, 30, 8), H.pipe, -1, 3, -10, false).rotation.z = Math.PI / 2;
        add(new T.BoxGeometry(6, 0.4, 0.4), H.glowC, -1, 9, 9.2, false); add(new T.BoxGeometry(2.4, 4, 0.3), H.door, -8, 2.6, 9.2, false);
        P.sign(api, g, 'COLD PLANT · -18°', 11, 1.4, -1, 10.4, 9.4, 0, '#102a3a', '#bff8ff', false);
        P.person(g, P.civ(64060), 'idle', -3, 0.8, 12, Math.PI);
      } else if (type === 'SEEDLAB') {
        add(new T.BoxGeometry(36, 0.6, 24), H.concrete2, 0, 0.3, 0, false);
        add(new T.BoxGeometry(35, 7.6, 23), H.glass, 0, 4.4, 0, true);
        for (let i = 0; i <= 6; i++) add(new T.BoxGeometry(0.3, 7.8, 23.4), H.steel, -17.5 + i * 5.83, 4.4, 0, false);
        for (const z of [-11.7, 11.7]) add(new T.BoxGeometry(36, 0.3, 0.3), H.steel, 0, 8.2, z, false);
        const rf = add(new T.BoxGeometry(37, 0.3, 24), H.glass, 0, 8.3, 0, false); rf.rotation.z = 0;
        for (let r = 0; r < 3; r++) for (let i = 0; i < 6; i++) { add(new T.BoxGeometry(4, 0.8, 1.6), H.soil, -12.5 + i * 5, 1.0, -7 + r * 7, false); add(new T.IcosahedronGeometry(0.9 + (i % 2) * 0.2, 0), H.leaf, -12.5 + i * 5, 2.1, -7 + r * 7, false); }
        add(new T.BoxGeometry(9, 1.2, 2.2), H.steel, 11, 1.2, 9.5, false); add(new T.BoxGeometry(8, 0.1, 1.8), H.glowC, 11, 1.85, 9.5, false);
        P.sign(api, g, 'SEED LAB', 8, 1.4, 0, 10.4, 12, 0, '#14322a', '#bff8d0', false);
        P.person(g, P.civ(64070), 'tablet', 10, 0.8, 8, Math.PI * 0.2); P.person(g, P.civ(64071), 'idle', -6, 0.8, 5, Math.PI * 0.6);
      }
    },
    tick(api, dt, t) {
      if (api.flag('opened') && !document.getElementById('nextMeeting')) {
        const b = document.createElement('button'); b.id = 'nextMeeting';
        b.innerHTML = 'GO TO THE THIRTY-SECOND COUNCIL MEETING ▶<small style="display:block;font-weight:400;font-size:10px;letter-spacing:2px;color:#ffe9c8;margin-top:3px">THE SEED VAULT</small>';
        b.style.cssText = 'position:fixed;left:50%;bottom:22px;transform:translateX(-50%);z-index:9;padding:10px 22px;font:600 14px "Segoe UI",Arial;letter-spacing:3px;color:#fff;background:rgba(40,90,70,.88);border:1px solid #bff8d0;border-radius:5px;cursor:pointer;box-shadow:0 0 18px rgba(191,248,208,.45)';
        b.onmouseenter = () => b.style.background = 'rgba(52,116,90,.97)'; b.onmouseleave = () => b.style.background = 'rgba(40,90,70,.88)';
        b.onclick = () => { location.href = 'councilmeeting/councilmeeting32.html'; };
        document.body.appendChild(b);
      }
      // the cold plant fans always turn
      for (const p of api.placed) if (p.type === 'COLDPLANT' && p.piece) p.piece.traverse(o => { if (o.name === 'fan') o.rotation.y += dt * 6; });
    },
    finish: {
      label: 'THE OPENING',
      cam: [[1550 + 120, P.SY + 40, 140], [1550, P.SY + 6, 10]],
      start(api) {
        this.stage = 0; this.t1 = 0; this._fam = false; this.ship = null;
        const par = api.placed.find(p => p.type === 'PAD' && p.piece); this.par = par ? par.piece.parent : null;
        this.px = P.OFF[0] + 1670; this.pz = P.OFF[1] + 90; this.py = P.gy(this.px, this.pz) + 1.3;
        const M = window.MTN;
        if (M && M.craft) { if (!M.F.craft) { M.F.craft = M.craft(api); window.__scene.add(M.F.craft); } this.ship = M.F.craft; this.ship.visible = true; M.F.park = null; M.F.on = false; }
        this.doors = []; for (const p of api.placed) if (p.type === 'DOORS' && p.piece) p.piece.traverse(o => { if (o.name === 'leafL' || o.name === 'leafR') this.doors.push(o); });
        this.d0 = this.doors.map(o => o.position.x);
        P.ring && P.ring(2);
      },
      update(api, dt, f) {
        this.t1 += dt;
        if (this.stage === 0) {
          P.hint('THE SHUTTLE BRINGS THE FIRST SEED KEEPERS DOWN TO THE NEW PAD');
          if (this.ship) { const k = Math.min(1, this.t1 / 10), e = 1 - Math.pow(1 - k, 2.4); this.ship.position.set(this.px + (1 - e) * 500, this.py + 2.2 + (1 - e) * 150, this.pz + (1 - e) * 220); this.ship.rotation.set(0, Math.PI - 0.3 * (1 - e), 0); }
          if (this.t1 > 11) { this.stage = 1; this.t1 = 0; }
        } else if (this.stage === 1) {
          P.hint('THE KEEPERS WALK TO THE VAULT AND THE GREAT DOORS SLIDE OPEN');
          if (!this._fam && this.par) {
            this._fam = true; const dx = P.OFF[0] + 1550, dz = P.OFF[1] + 24;
            for (let i = 0; i < 3; i++) { const sx = this.px - 8 - i * 1.5, sz = this.pz + (i % 2 ? 6 : 9), ex = dx - 3 + i * 3, ez = dz + (i % 2) * 2;
              P.person(this.par, P.civ(64400 + i), 'walk', sx, this.py, sz, Math.PI, { path: { type: 'line', ax: sx, az: sz, bx: ex, bz: ez, speed: 1.6 }, scale: undefined }); }
          }
          const o = Math.max(0, Math.min(1, (this.t1 - 9) / 5)); this.doors.forEach((d, i) => { d.position.x = this.d0[i] + (d.name === 'leafL' ? -1 : 1) * o * 6.4; });
          if (this.t1 > 16) { this.stage = 2; this.t1 = 0; P.hint(''); P.cover(true, 'THE SEED VAULT IS OPEN', 'FORECOURT · PORTAL · VAULT HALLS · COLD PLANT · SEED LAB · EVERY SEED KEPT SAFE · NEXT: THE THIRTY-SECOND COUNCIL MEETING'); }
        } else {
          if (this.t1 > 4 && !this._h) { this._h = true; api.setFlag('seedvault', true); api.setFlag('opened', true); }
          if (this.t1 > 6.5) { P.cover(false); this._h = false; const M = window.MTN; if (M && M.F) M.F.park = { x: this.px, y: this.py + 2.2, z: this.pz, yaw: Math.PI }; return true; }
        }
        return false;
      },
    },
  }));
})();
