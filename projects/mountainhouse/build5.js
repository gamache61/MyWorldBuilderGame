/* ============================================================
   MOUNTAIN HOUSE · BUILD 5 · THE SKY LIFT, THE GARDENS & THE FIRST GUESTS
   Keep this file in projects/mountainhouse next to 63-mountainhouse.html.
   A sky lift runs straight up the south-east face from a station on the
   plateau to the summit, on three pylons; two terrace gardens in front of
   the house. Ends with L: a ship settles onto the pad and the first guests
   walk up to the door.
   ============================================================ */
(function () {
  const P = window.MTN;
  // sky lift nodes, bottom (0) to top (4), in world coordinates
  P.node = (i) => { const L = P.LIFT, x = P.MT.x + L.bot[0] + (L.top[0] - L.bot[0]) * i / 4, z = P.MT.z + L.bot[1] + (L.top[1] - L.bot[1]) * i / 4; return [x, z]; };
  P.nodeLocal = (i) => { const q = P.node(i); return [q[0] - P.OFF[0], q[1] - P.OFF[1]]; };
  P.nodeY = (i) => { if (P._ny) return P._ny[i]; const g = (j) => { const q = P.node(j); return window.coaxH(q[0], q[1]); }, yb = g(0) + 17, yt = g(4) + 17;
    P._ny = [0, 1, 2, 3, 4].map(j => j === 0 ? yb : j === 4 ? yt : Math.max(yb + (yt - yb) * j / 4, g(j) + 14)); return P._ny[i]; };
  P.padParent = (api) => { const s = api.placed.find(p => p.type === 'PAD' && p.piece); return s ? s.piece.parent : null; };
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 5, name: 'THE SKY LIFT, THE GARDENS & THE FIRST GUESTS',
    brief: 'A sky lift up the south-east face on three pylons, two terrace gardens in front of the house — then the first ship lands on the pad and the first guests walk in.',
    types: {
      LIFTBASE: { code: 'SY', name: 'LIFT BASE STATION', col: '#9fffd8', w: 34, d: 26, h: 22 },
      PYLON:    { code: 'SY', name: 'LIFT PYLON',        col: '#c8ced6', w: 8,  d: 8,  h: 40 },
      LIFTTOP:  { code: 'SY', name: 'LIFT SUMMIT STATION', col: '#9fffd8', w: 26, d: 20, h: 22 },
      GARDEN:   { code: 'GD', name: 'TERRACE GARDEN',    col: '#3fb04a', w: 40, d: 24, h: 8 },
    },
    order: ['LIFTBASE', 'PYLON', 'LIFTTOP', 'GARDEN'],
    at: { LIFTBASE: [P.nodeLocal(0)], PYLON: [P.nodeLocal(1), P.nodeLocal(2), P.nodeLocal(3)], LIFTTOP: [P.nodeLocal(4)], GARDEN: [[1550 - 55, 48], [1550 - 10, 48]] },
    eye: [430, 480, 430],
    stats(api, c) { return [['LIFT STATIONS', (c('LIFTBASE') + c('LIFTTOP')) + ' / 2'], ['PYLONS', c('PYLON') + ' / 3'], ['GARDENS', c('GARDEN') + ' / 2'], ['MOUNTAIN HOUSE', api.flag('mountainHouse') ? 'OPEN' : 'NOT YET']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, H = P.mh(api);
      const cable = (i) => { const a = P.node(i), b = P.node(i + 1); P.span(api, add, g, sl, [a[0], a[1], P.nodeY(i)], [b[0], b[1], P.nodeY(i + 1)], 0.5, 0.5, H.dark); };
      if (type === 'LIFTBASE' || type === 'LIFTTOP') {
        const top = type === 'LIFTTOP', i = top ? 4 : 0, y = P.nodeY(i) - sl.y;
        add(new T.BoxGeometry(top ? 26 : 34, 1, top ? 20 : 26), H.stone, 0, 0.3, 0, false); add(new T.BoxGeometry(top ? 26 : 34, 14, top ? 20 : 26), H.stone2, 0, -7, 0, false);
        for (const x of [-1, 1]) for (const z of [-1, 1]) add(new T.BoxGeometry(1, y - 0.5, 1), H.timber2, x * (top ? 11 : 15), (y - 0.5) / 2 + 0.5, z * (top ? 8 : 10), true);
        add(new T.BoxGeometry(top ? 26 : 34, 1, top ? 20 : 26), H.roof, 0, y + 0.5, 0, true); add(new T.BoxGeometry(top ? 22 : 30, 7, 0.4), H.glass, 0, y - 4, top ? 8 : 10, false);
        const wh = add(new T.CylinderGeometry(3, 3, 1, 16).rotateX(Math.PI / 2), H.steel, 0, y - 1.6, 0, false);
        if (!top) cable(0);
        P.person(g, P.civ(63300 + (top ? 1 : 0)), 'idle', 6, 1.2, top ? 4 : 5, Math.PI);
      } else if (type === 'PYLON') {
        const i = k + 1, y = P.nodeY(i) - sl.y, q = P.node(i);
        add(new T.BoxGeometry(6, 8, 6), H.stone2, 0, -3, 0, false);
        add(new T.CylinderGeometry(0.7, 1.5, y + 4, 8), H.steel, 0, (y - 4) / 2 + 2 + 0.5, 0, true);
        add(new T.BoxGeometry(1.2, 1.2, 9), H.steel, 0, y - 0.5, 0, true); add(new T.SphereGeometry(0.7, 8, 6), H.red, 0, y + 1.2, 0, false);
        cable(i);
        if (k === 1) { const a = P.node(2), b = P.node(3), f = 0.4, cx = a[0] + (b[0] - a[0]) * f, cz = a[1] + (b[1] - a[1]) * f, cy = P.nodeY(2) + (P.nodeY(3) - P.nodeY(2)) * f;
          const cab = new T.Group(); cab.position.set(cx - sl.x, cy - sl.y - 5, cz - sl.z); g.add(cab);
          add(new T.CylinderGeometry(0.15, 0.15, 3, 5), H.dark, 0, 2.5, 0, false, cab); add(new T.BoxGeometry(6, 3.6, 4.4), H.white, 0, 0, 0, true, cab); add(new T.BoxGeometry(6.2, 2, 4.6), H.glass, 0, 0.3, 0, false, cab); add(new T.BoxGeometry(6.4, 0.5, 4.8), H.roof, 0, 2, 0, false, cab); }
      } else if (type === 'GARDEN') {
        add(new T.BoxGeometry(40, 0.6, 24), H.stone, 0, 0.3, 0, false); add(new T.BoxGeometry(36, 0.5, 20), H.grass, 0, 0.7, 0, false);
        if (k === 0) {
          for (let i = 0; i < 8; i++) for (let j = 0; j < 2; j++) add(new T.SphereGeometry(0.8, 6, 5), H.flower[(i + j) % 5], -14 + i * 4, 1.5, -5 + j * 10, false);
          for (const x of [-16, 16]) { add(new T.CylinderGeometry(0.4, 0.55, 4, 5), H.trunk, x, 2.7, 8, true); add(new T.IcosahedronGeometry(3.4, 0), H.leaf, x, 6.4, 8, true); }
          add(new T.BoxGeometry(7, 0.7, 1.6), H.timber, 0, 1.6, 0, true);
          P.person(g, P.kid(63320), 'walk', 0, 1, 0, 0, { path: { type: 'line', ax: -12, az: 2, bx: 12, bz: 2, speed: 0.8 }, scale: 0.6 });
        } else {
          add(new T.CylinderGeometry(4, 4.4, 0.8, 16), H.stone2, 0, 1.2, 0, true); add(new T.CylinderGeometry(3, 3, 0.9, 16), H.dark, 0, 1.3, 0, false);
          const fl = add(new T.ConeGeometry(1.2, 3, 8), H.glowA, 0, 3, 0, false); fl.userData.flame = true;
          for (let i = 0; i < 5; i++) { const a = i / 5 * Math.PI * 2; add(new T.BoxGeometry(5, 0.9, 1.4), H.timber, Math.cos(a) * 7.5, 1.4, Math.sin(a) * 7.5, true).rotation.y = -a + Math.PI / 2; }
          P.person(g, P.civ(63321), 'idle', 7.5, 1.4, 0, -Math.PI / 2); P.person(g, P.civ(63322), 'idle', -7.5, 1.4, 0, Math.PI / 2);
        }
      }
    },
    tick(api, dt, t) {
      if (api.flag('opened') && !document.getElementById('nextMeeting')) {
        const b = document.createElement('button'); b.id = 'nextMeeting';
        b.innerHTML = 'GO TO THE THIRTY-FIRST COUNCIL MEETING ▶<small style="display:block;font-weight:400;font-size:10px;letter-spacing:2px;color:#ffe9c8;margin-top:3px">A HOUSE ON THE MOUNTAIN TOP</small>';
        b.style.cssText = 'position:fixed;left:50%;bottom:22px;transform:translateX(-50%);z-index:9;padding:10px 22px;font:600 14px "Segoe UI",Arial;letter-spacing:3px;color:#fff;background:rgba(40,90,70,.88);border:1px solid #bff8d0;border-radius:5px;cursor:pointer;box-shadow:0 0 18px rgba(191,248,208,.45)';
        b.onmouseenter = () => b.style.background = 'rgba(52,116,90,.97)'; b.onmouseleave = () => b.style.background = 'rgba(40,90,70,.88)';
        b.onclick = () => { location.href = 'councilmeeting/councilmeeting31.html'; };
        document.body.appendChild(b);
      }
    },
    finish: {
      label: 'THE FIRST GUESTS',
      cam: [[1550 + 150, 345, 150], [1550 + 10, 296, -20]],
      start(api) {
        this.stage = 0; this.t1 = 0; this.ship = null; this._fam = false;
        const par = P.padParent(api); this.par = par; this.px = P.OFF[0] + P.PADL[0]; this.pz = P.OFF[1] + P.PADL[1]; this.py = P.gy(this.px, this.pz) + 1.3;
        if (par) {
          const T = api.THREE, H = P.mh(api), s = new T.Group(); s.userData.keep = true; par.add(s); this.ship = s;
          const m = (geo, mat, x, y, z) => { const o = new T.Mesh(geo, mat); o.position.set(x, y, z); o.castShadow = true; s.add(o); return o; };
          m(new T.CapsuleGeometry(3.2, 12, 6, 16).rotateZ(Math.PI / 2), H.white, 0, 5.2, 0); m(new T.SphereGeometry(2.6, 14, 10), H.glass, -5, 6.4, 0);
          for (const z of [-1, 1]) { m(new T.BoxGeometry(7, 0.5, 8), H.steel, 1.5, 4.6, z * 5.6).rotation.y = z * 0.35; m(new T.BoxGeometry(2, 3, 0.6), H.roof, 6, 7, z * 2.2); }
          for (const [x, z] of [[-4, -3], [-4, 3], [5, 0]]) { m(new T.CylinderGeometry(0.2, 0.3, 3, 6), H.dark, x, 1.8, z); m(new T.CylinderGeometry(0.9, 0.9, 0.3, 8), H.dark, x, 0.2, z); }
          this.glow = m(new T.SphereGeometry(1.6, 10, 8), H.glowG, 9.2, 4.6, 0); this.pl = new T.PointLight(0x80ffd0, 6000, 120, 2); this.pl.position.set(8, 3, 0); s.add(this.pl);
          s.rotation.y = 0; s.position.set(this.px, this.py + 150, this.pz);
        }
        P.ring && P.ring(2);
      },
      update(api, dt, f) {
        this.t1 += dt;
        if (this.stage === 0) {
          P.hint('A SHIP COMES IN OVER THE MOUNTAIN AND SETTLES ONTO THE NEW LANDING PAD');
          if (this.ship) { const k = Math.min(1, this.t1 / 11), e = 1 - Math.pow(1 - k, 2.4); this.ship.position.set(this.px + (1 - e) * 120, this.py + 1.9 + (1 - e) * 150, this.pz); this.ship.rotation.z = (1 - e) * 0.12; this.glow.scale.setScalar(0.3 + (1 - k) * 1.4); this.pl.intensity = 800 + (1 - k) * 7000; }
          if (this.t1 > 12) { this.stage = 1; this.t1 = 0; }
        } else if (this.stage === 1) {
          P.hint('THE HATCH OPENS · THE FIRST GUESTS WALK UP TO THE DOOR OF THE MOUNTAIN HOUSE');
          if (this.ship) { this.glow.scale.setScalar(0.3); this.pl.intensity = 300; }
          if (!this._fam && this.par) {
            this._fam = true; const dx = P.OFF[0] + 1550 + 10, dz = P.OFF[1] + 12;
            for (let i = 0; i < 5; i++) { const sx = this.px - 8 - i * 1.5, sz = this.pz + (i % 2 ? 9 : 12), ex = dx + 4 + (i % 3), ez = dz + (i - 2) * 2.4;
              P.person(this.par, i > 2 ? P.kid(63400 + i) : P.civ(63400 + i), 'walk', sx, this.py, sz, Math.PI, { path: { type: 'line', ax: sx, az: sz, bx: ex, bz: ez, speed: 1.1 }, scale: i > 2 ? 0.6 : undefined }); }
          }
          if (this.t1 > 16) { this.stage = 2; this.t1 = 0; P.hint(''); P.cover(true, 'MOUNTAIN HOUSE IS OPEN', 'STAIR · HOUSE · TOWER · LANDING PAD · SKY LIFT · GARDENS · NEXT: THE THIRTY-FIRST COUNCIL MEETING'); }
        } else {
          if (this.t1 > 4 && !this._h) { this._h = true; api.setFlag('mountainHouse', true); api.setFlag('opened', true); }
          if (this.t1 > 6.5) { P.cover(false); this._h = false; return true; }
        }
        return false;
      },
    },
  }));
})();
