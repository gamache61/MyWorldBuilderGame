/* ============================================================
   THE KRYOS ARENA · BUILD 5 · THE FESTIVAL GROUNDS & OPENING DAY
   Keep this file in projects/kryosarena next to 58-kryosarena.html.
   Market stalls, food tents and a fair green for the festivals. Ends with L: Opening Day, the first race, the first concert lights and the first fireworks over Kryos.
   ============================================================ */
(function () {
  const P = window.YARD;
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 5, name: 'THE FESTIVAL GROUNDS & OPENING DAY',
    brief: 'Market stalls, food tents and a fair green for the festivals — then Opening Day: the first race, the first concert and the first fireworks over Kryos.',
    types: { FESTIVAL: { code: 'SY', name: 'FESTIVAL GROUND', col: '#f06aa8', w: 110, d: 100, h: 16 } },
    order: ['FESTIVAL'],
    at: { FESTIVAL: [[1300, 0], [1550, -250]] },
    eye: [1000, 200, 300],
    stats(api, c) { return [['FESTIVAL GROUNDS', c('FESTIVAL') + ' / 2'], ['OPENING DAY', api.flag('arena') ? 'DONE' : 'NOT YET']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, S = P.hm(api), C = P.fun(api);
      add(new T.BoxGeometry(112, 1, 102), S.gravel, 0, 0.5, 0);
      add(new T.BoxGeometry(60, 0.5, 60), C.grass, k ? -18 : 18, 1.1, 0).castShadow = false;
      const cols = [C.red, C.blue, C.yellow, C.green, C.pink, C.orange, C.purple];
      for (let i = 0; i < 8; i++) { const x = -44 + i * 12.6, z = i % 2 ? 38 : -38, c = cols[(i + k * 3) % 7];
        add(new T.BoxGeometry(9, 5, 7), F.white, x, 3.5, z); const r = add(new T.ConeGeometry(7.2, 4, 4).rotateY(Math.PI / 4), c, x, 8, z); r.scale.set(1, 1, 0.8);
        add(new T.BoxGeometry(9.4, 1, 1), c, x, 5.6, z + (z > 0 ? -3.6 : 3.6)); }
      add(new T.CylinderGeometry(14, 14, 7, 20), C.pink, k ? 30 : -30, 4.5, 0); add(new T.ConeGeometry(15.5, 9, 20), cols[(k + 2) % 7], k ? 30 : -30, 12.5, 0);
      add(new T.CylinderGeometry(0.3, 0.3, 14, 5), F.steel, k ? 30 : -30, 20, 0); add(new T.BoxGeometry(3, 1.6, 0.2), C.red, (k ? 30 : -30) + 1.6, 25, 0);
      for (let i = 0; i < 14; i++) { const a = i / 14 * Math.PI * 2, cx = (k ? -18 : 18) + Math.cos(a) * 26; add(new T.SphereGeometry(0.8, 6, 5), cols[i % 7], cx, 6.5, Math.sin(a) * 26).castShadow = false; add(new T.CylinderGeometry(0.15, 0.15, 6, 4), F.steel, cx, 3.5, Math.sin(a) * 26); }
      for (let i = 0; i < 10; i++) P.figure(api, add, -40 + i * 9, 1, (i % 3 - 1) * 14, 0.7, i + k, g);
      P.sign(api, g, k ? 'FOOD HALL & FAIR GREEN' : 'MARKET SQUARE · FESTIVAL DAYS', 46, 4, 0, 17, 51, 0, '#2a1450', '#ffd9a0', true);
      for (let i = 0; i < 3; i++) P.person(g, i === 1 ? P.kid(58500 + k * 4 + i) : P.civ(58500 + k * 4 + i), 'idle', -12 + i * 12, 1, 46, Math.PI);
    },
    finish: {
      label: 'OPENING DAY',
      cam: [[1100, 200, 520], [1550, 90, 0]],
      start(api) {
        this.stage = 0; this.t1 = 0; this.next = 0; this.rockets = []; P.ring && P.ring(2);
        const T = api.THREE, par = (api.placed.find(p => p.piece && p.piece.parent) || {}).piece; if (!par) return;
        const grp = new T.Group(); par.parent.add(grp); this.grp = grp; this.y0 = api.DECK_TOP;
        const bm = (c, o = 0) => new T.MeshBasicMaterial({ color: c, transparent: true, opacity: o, blending: T.AdditiveBlending, depthWrite: false, toneMapped: false, side: T.DoubleSide });
        this.runners = [0xe0402e, 0x2f7fe0, 0x3fb04a, 0xf2c41a, 0xf06aa8].map(c => { const m = new T.Mesh(new T.SphereGeometry(2.2, 10, 8), new T.MeshBasicMaterial({ color: new T.Color(c).multiplyScalar(1.6), toneMapped: false })); grp.add(m); return m; });
        this.beams = []; for (const [x, z, c] of [[1430, 340, [1.8, 0.6, 1.2]], [1670, 340, [0.5, 1.6, 1.9]], [1550, 250, [1.8, 1.4, 0.4]]]) { const m = new T.Mesh(new T.CylinderGeometry(2, 9, 500, 10, 1, true), bm(new T.Color(...c))); m.position.set(x, this.y0 + 270, z); grp.add(m); this.beams.push(m); }
      },
      update(api, dt, f) {
        this.t1 += dt; if (!this.runners) return this.t1 > 1;
        const T = api.THREE;
        const lap = Math.min(1, this.t1 / 14);
        this.runners.forEach((m, i) => { const a = Math.PI * 2 * (lap * (1.9 - i * 0.07)); const rx = 76 + i * 4.2, rz = 30 + i * 4.2; m.position.set(1800 + Math.cos(a - 1.57) * rx, this.y0 + 4, Math.sin(a - 1.57) * rz); });
        const on = this.stage === 2 ? Math.max(0, 1 - this.t1 / 4) : Math.min(1, this.t1 / 3);
        this.beams.forEach((m, i) => { m.material.opacity = on * 0.2 * (0.7 + Math.sin(f * 3 + i) * 0.3); m.rotation.z = Math.sin(f * 0.7 + i * 2) * 0.28; m.rotation.x = Math.cos(f * 0.5 + i) * 0.2; });
        if (this.stage === 1 && this.t1 > this.next) {
          this.next = this.t1 + 0.55; const x = 1250 + Math.random() * 600, z = -240 + Math.random() * 480, top = this.y0 + 190 + Math.random() * 110;
          const col = new T.Color().setHSL(Math.random(), 0.9, 0.6).multiplyScalar(2.2), n = 70, pos = new Float32Array(n * 3), dir = [];
          for (let i = 0; i < n; i++) { const u = Math.random() * 2 - 1, a = Math.random() * 6.283, s = Math.sqrt(1 - u * u); dir.push([s * Math.cos(a), u, s * Math.sin(a)]); }
          const pts = new T.Points(new T.BufferGeometry().setAttribute('position', new T.BufferAttribute(pos, 3)), new T.PointsMaterial({ color: col, size: 4, transparent: true, opacity: 1, blending: T.AdditiveBlending, depthWrite: false, toneMapped: false }));
          pts.frustumCulled = false; this.grp.add(pts); this.rockets.push({ pts, x, z, top, y: this.y0 + 8, t: 0, dir, pos });
        }
        for (let i = this.rockets.length - 1; i >= 0; i--) {
          const r = this.rockets[i]; r.t += dt; const climb = Math.min(1, r.t / 1.1);
          if (r.t < 1.1) { for (let j = 0; j < r.dir.length; j++) { r.pos[j * 3] = r.x; r.pos[j * 3 + 1] = r.y + (r.top - r.y) * climb; r.pos[j * 3 + 2] = r.z; } r.pts.material.size = 3; }
          else { const e = r.t - 1.1, rad = 70 * (1 - Math.exp(-e * 1.8)); for (let j = 0; j < r.dir.length; j++) { r.pos[j * 3] = r.x + r.dir[j][0] * rad; r.pos[j * 3 + 1] = r.top + r.dir[j][1] * rad - e * e * 9; r.pos[j * 3 + 2] = r.z + r.dir[j][2] * rad; } r.pts.material.opacity = Math.max(0, 1 - e / 2.2); r.pts.material.size = 5; }
          r.pts.geometry.attributes.position.needsUpdate = true;
          if (r.t > 3.4) { this.grp.remove(r.pts); r.pts.geometry.dispose(); r.pts.material.dispose(); this.rockets.splice(i, 1); }
        }
        if (this.stage === 0) {
          P.hint('OPENING DAY · THE FIRST RACE ROUND THE KRYOS TRACK');
          if (this.t1 > 14) { this.stage = 1; this.t1 = 0; this.next = 0; P.ring && P.ring(3); }
        } else if (this.stage === 1) {
          P.hint('...AND THE FIRST FIREWORKS OVER KRYOS');
          if (this.t1 > 16) { this.stage = 2; this.t1 = 0; P.hint(''); P.cover(true, 'THE KRYOS ARENA IS OPEN', 'THE BOWL · THE TRACK · THE TRAINING FIELDS · THE STAGE · THE FESTIVAL GROUNDS · A PLACE FOR ALL OF US TO GATHER'); }
        } else {
          if (this.t1 > 4 && !this._h) { this._h = true; api.setFlag('arena', true); api.setFlag('opened', true); }
          if (this.t1 > 6.5) { P.cover(false); this._h = false; return true; }
        }
        return false;
      },
    },
  }));
})();
