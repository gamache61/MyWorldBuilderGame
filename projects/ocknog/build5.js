/* ============================================================
   OCKNOG · BUILD 5 · THE CLOUD LAUNCHERS & THE HEALING
   Keep this file in projects/ocknog next to 70-ocknog.html.
   Ends with L: four launchers fire one great cloud of cure into the sky, the cloud spreads over Ocknog,
   and the poisoned soil turns back to living ground.
   ============================================================ */
(function () {
  const P = window.OKP;
  const rel = a => a.map(([x, z]) => [1550 + x, z]);
  const LAUNCH = [[-60, -110], [-60, 110], [140, -110], [140, 110]];
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 5, name: 'THE CLOUD LAUNCHERS & THE HEALING',
    brief: 'A chemical plant makes the cure, four tall launchers stand ready to fire it into the sky, then the great cloud of cure spreads over Ocknog and puts the soil back to normal.',
    types: {
      PLANT: { code: 'SY', name: 'CURE PLANT', col: '#dfe6ea', w: 50, d: 36, h: 24 },
      LAUNCHER: { code: 'HP', name: 'CLOUD LAUNCHER', col: '#c8ced6', w: 14, d: 14, h: 60 },
    },
    order: ['PLANT', 'LAUNCHER'],
    at: { PLANT: rel([[110, 0]]), LAUNCHER: rel(LAUNCH) },
    eye: [1550 - 40, P.SY + 120, 250],
    stats(api, c) { return [['CURE PLANT', c('PLANT') ? 'RUNNING' : 'NOT YET'], ['LAUNCHERS', c('LAUNCHER') + ' / 4'], ['THE SOIL OF OCKNOG', api.flag('ocknog') ? 'HEALED' : 'POISONED']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, H = P.ok(api);
      if (type === 'PLANT') {
        add(new T.BoxGeometry(50, 1, 36), H.stone, 0, 0.5, 0);
        add(new T.BoxGeometry(34, 16, 26), H.white, -6, 9, 0); add(new T.BoxGeometry(36, 0.8, 28), H.steel, -6, 17.4, 0);
        for (const [x, z] of [[14, -8], [14, 8], [20, 0]]) { add(new T.CylinderGeometry(3.4, 3.4, 20, 14), H.tank, x, 11, z); add(new T.SphereGeometry(3.4, 14, 6, 0, Math.PI * 2, 0, Math.PI / 2), H.tank, x, 21, z); }
        add(new T.CylinderGeometry(1.4, 1.8, 14, 10), H.steel, -18, 24, -8); add(new T.SphereGeometry(1.6, 8, 6), H.cure, -18, 31.5, -8, false);
        for (let i = 0; i < 5; i++) add(new T.BoxGeometry(5, 4, 0.5), H.screen, -20 + i * 6, 11, 13.2, false);
        add(new T.CylinderGeometry(0.6, 0.6, 30, 8), H.pipe, 12, 4, 0).rotation.z = Math.PI / 2;
        P.sign(api, g, 'THE CURE · A GIFT FROM UNITY TO OCKNOG', 30, 2.6, -6, 12, 13.6, 0, '#13333a', '#7affc8');
        for (let i = 0; i < 3; i++) P.person(g, P.civ(70700 + i), 'idle', -14 + i * 5, 1, 19, Math.PI);
        for (let i = 0; i < 3; i++) P.alien(api, g, 4 + i * 4, 1, 19, Math.PI, { seed: 30 + i, scale: 0.85 });
      } else {
        add(new T.CylinderGeometry(8, 9, 1.6, 12), H.stone, 0, 0.8, 0);
        for (let i = 0; i < 4; i++) { const a = i / 4 * 6.28; add(new T.BoxGeometry(1, 14, 1), H.steel, Math.cos(a) * 5.4, 8, Math.sin(a) * 5.4); }
        const tube = add(new T.CylinderGeometry(2.6, 3.4, 44, 14), H.steel, 0, 24, 0); tube.rotation.z = 0.12;
        add(new T.CylinderGeometry(3.4, 2.8, 4, 14), H.dark, -2.6, 46.4, 0).rotation.z = 0.12;
        add(new T.TorusGeometry(3.1, 0.35, 6, 16), H.cure, -2.6, 48.4, 0, false).rotation.x = Math.PI / 2;
        add(new T.BoxGeometry(5, 5, 4), H.dark, 6, 4, 0);
      }
    },
    tick(api, dt, t) {
      if (api.flag('flownHome') && !document.getElementById('nextMeeting')) {
        const b = document.createElement('button'); b.id = 'nextMeeting';
        b.innerHTML = 'GO TO THE NEXT COUNCIL MEETING ▶<small style="display:block;font-weight:400;font-size:10px;letter-spacing:2px;color:#c8ecff;margin-top:3px">THE SOIL OF OCKNOG IS MENDED</small>';
        b.style.cssText = 'position:fixed;left:50%;bottom:22px;transform:translateX(-50%);z-index:9;padding:10px 22px;font:600 14px "Segoe UI",Arial;letter-spacing:3px;color:#fff;background:rgba(20,80,60,.85);border:1px solid #9fffd8;border-radius:5px;cursor:pointer';
        b.onclick = () => { location.href = 'councilmeeting/councilmeeting37.html'; };
        document.body.appendChild(b);
      }
      if (api.flag('ocknog') && !P._healed) { P._healed = true; P.clean = 1; window.__okGround && window.__okGround.set(1); }
    },
    finish: {
      label: 'FIRE THE CLOUD',
      cam: [[1550 - 650, P.SY + 330, 720], [1550 + 20, P.SY + 120, 0]],
      start(api) {
        const T = api.THREE, OK = window.__OK, land = api.placed.find(p => p.piece && p.piece.parent), host = land.piece.parent;
        this.stage = 0; this.t1 = 0; this.puffs = []; this.streaks = [];
        this.grp = new T.Group(); this.grp.position.set(OK.x, OK.Y, OK.z); host.add(this.grp);
        const mat = this.mat = new T.MeshBasicMaterial({ color: new T.Color(0.35, 1.5, 1.2), transparent: true, opacity: 0.0, depthWrite: false, fog: false, toneMapped: false });
        let s = 11; const r = () => (s = (s * 16807) % 2147483647) / 2147483647;
        for (let i = 0; i < 16; i++) { const m = new T.Mesh(new T.SphereGeometry(1, 14, 10), mat); m.userData = { a: r() * 6.28, d: r(), h: 0.7 + r() * 0.6, sz: 0.5 + r() * 0.6 }; m.scale.setScalar(0.01); this.grp.add(m); this.puffs.push(m); }
        const sm = new T.MeshBasicMaterial({ color: new T.Color(2, 2, 1.6), toneMapped: false });
        for (let i = 0; i < 4; i++) { const m = new T.Mesh(new T.SphereGeometry(4, 8, 6), sm); m.visible = false; this.grp.add(m); this.streaks.push(m); }
        this.rain = new T.Points((() => { const g = new T.BufferGeometry(), n = 1800, a = new Float32Array(n * 3); for (let i = 0; i < n; i++) { const q = r() * 6.28, d = Math.sqrt(r()) * 1500; a[i * 3] = Math.cos(q) * d; a[i * 3 + 1] = r() * 500; a[i * 3 + 2] = Math.sin(q) * d; } g.setAttribute('position', new T.BufferAttribute(a, 3)); return g; })(), new T.PointsMaterial({ color: new T.Color(0.5, 2, 1.5), size: 6, transparent: true, opacity: 0, depthWrite: false, fog: false, toneMapped: false }));
        this.grp.add(this.rain); P.clean = 0; P.ring && P.ring(1);
      },
      update(api, dt, f) {
        this.t1 += dt; const T1 = this.t1, OKr = 1700;
        if (this.stage === 0) {
          P.hint('THE CURE IS READY · THE FOUR LAUNCHERS TURN TOWARD THE SKY');
          if (T1 > 8) { this.stage = 1; this.t1 = 0; P.hint('FIRE · THE CURE RISES ABOVE OCKNOG'); }
        } else if (this.stage === 1) {
          const k = Math.min(1, T1 / 7);
          this.streaks.forEach((m, i) => { const [x, z] = LAUNCH[i]; m.visible = true; const e = k * k; m.position.set(x * (1 - e), 60 + e * 520, z * (1 - e)); m.scale.setScalar(1 + (1 - e) * 0.8); });
          if (T1 > 7) { this.stage = 2; this.t1 = 0; this.streaks.forEach(m => m.visible = false); P.hint('THE GREAT CLOUD SPREADS OVER OCKNOG'); }
        } else if (this.stage === 2) {
          const k = Math.min(1, T1 / 26), e = 1 - Math.pow(1 - k, 2);
          this.mat.opacity = 0.34 * Math.min(1, T1 / 3) * (1 - Math.max(0, (k - 0.8) / 0.2) * 0.8);
          this.puffs.forEach(m => { const u = m.userData, d = u.d * OKr * 0.85 * e; m.position.set(Math.cos(u.a + e * 0.3) * d, 520 * u.h - e * 120, Math.sin(u.a + e * 0.3) * d); m.scale.set((120 + 330 * u.sz) * (0.3 + e), (60 + 130 * u.sz) * (0.3 + e), (120 + 330 * u.sz) * (0.3 + e)); });
          this.rain.material.opacity = Math.min(0.9, T1 / 4) * (1 - Math.max(0, (k - 0.85) / 0.15));
          this.rain.position.y = -((T1 * 40) % 500) + 250; 
          P.clean = Math.max(0, (k - 0.15) / 0.8); window.__okGround && window.__okGround.set(P.clean);
          if (T1 > 26) { this.stage = 3; this.t1 = 0; P.clean = 1; window.__okGround && window.__okGround.set(1); P.hint('THE SOIL OF OCKNOG IS ALIVE AGAIN · THE PEOPLE CHEER'); for (const a of P.aliens) a.userData.mode = 'cheer'; }
        } else if (this.stage === 3) {
          this.mat.opacity *= 0.96; this.rain.material.opacity = 0;
          if (T1 > 9) { this.stage = 4; this.t1 = 0; P.hint(''); P.cover(true, 'THE SOIL OF OCKNOG IS MENDED', 'THE ELDER OF OCKNOG SAYS: THE PEOPLE OF UNITY ARE OUR FRIENDS FOR EVER'); for (const a of P.aliens) a.userData.mode = 'idle'; }
        } else {
          if (T1 > 5 && !this._h) { this._h = true; api.setFlag('ocknog', true); api.setFlag('opened', true); }
          if (T1 > 8) { P.cover(false); this._h = false; this.grp.parent && this.grp.parent.remove(this.grp); return true; }
        }
        return false;
      },
    },
  }));
})();
