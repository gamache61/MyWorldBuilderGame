/* ============================================================
   THE GREAT PARK OF UNITY · BUILD 5 · THE GREAT FOUNTAIN, THE QUIET GARDEN, THE CAFÉ & OPENING DAY
   Keep this file in projects/greatpark next to 78-greatpark.html.
   A great fountain, a walled quiet garden and a café, then opening day with balloons and fireworks over the park.
   ============================================================ */
(function () {
  const P = window.PWP;
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 5, name: 'THE GREAT FOUNTAIN, THE QUIET GARDEN, THE CAFÉ & OPENING DAY',
    brief: 'A great fountain between the two paths, a walled quiet garden with a still pond, and a little café, then opening day, when the whole park opens to the families of Unity with balloons and fireworks.',
    types: {
      FOUNTAIN: { code: 'SY', name: 'GREAT FOUNTAIN', col: '#3f98c8', w: 40, d: 40, h: 16 },
      GARDEN:   { code: 'HP', name: 'QUIET GARDEN',   col: '#e8a0b8', w: 70, d: 60, h: 10 },
      CAFE:     { code: 'FB', name: 'PARK CAFÉ',      col: '#f0e4c8', w: 36, d: 24, h: 12 },
    },
    order: ['FOUNTAIN', 'GARDEN', 'CAFE'],
    at: { FOUNTAIN: [[1550 + 1600 + 0, 1200 + 235]], GARDEN: [[1550 + 1600 + 250, 1200 + 60]], CAFE: [[1550 + 1600 + -250, 1200 + 200]] },
    eye: [1550 + 1600 + 0, (window.__PARK.Y || -85) + 220, 1200 + 420],
    stats(api, c) { return [['GREAT FOUNTAIN', c('FOUNTAIN') ? 'RUNNING' : 'NOT YET'], ['QUIET GARDEN', c('GARDEN') ? 'OPEN' : 'NOT YET'], ['PARK CAFÉ', c('CAFE') ? 'OPEN' : 'NOT YET'], ['THE GREAT PARK', api.flag('opened') ? 'OPEN' : 'NOT YET']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, M = P.park(api);
      if (type === 'FOUNTAIN') {
        add(new T.CylinderGeometry(18, 19, 2, 28), M.stone2, 0, 1, 0);
        add(new T.CylinderGeometry(16, 16, 1.2, 28), M.water, 0, 2, 0, false);
        add(new T.CylinderGeometry(5, 6, 5, 16), M.stone, 0, 4, 0);
        add(new T.CylinderGeometry(9, 9, 0.8, 20), M.stone, 0, 7, 0); add(new T.CylinderGeometry(8, 8, 0.6, 20), M.water, 0, 7.5, 0, false);
        add(new T.CylinderGeometry(1.2, 1.6, 8, 8), M.stone, 0, 10, 0);
        add(new T.CylinderGeometry(0.7, 2.6, 8, 10, 1, true), new T.MeshBasicMaterial({ color: new T.Color(0.7, 1.4, 1.8), transparent: true, opacity: 0.4, depthWrite: false, side: T.DoubleSide, toneMapped: false }), 0, 15, 0, false);
        for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2; add(new T.CylinderGeometry(0.2, 0.9, 6, 6, 1, true), new T.MeshBasicMaterial({ color: new T.Color(0.7, 1.4, 1.8), transparent: true, opacity: 0.35, depthWrite: false, toneMapped: false }), Math.cos(a) * 11, 4.4, Math.sin(a) * 11, false).rotation.set(Math.sin(a) * 0.5, 0, -Math.cos(a) * 0.5); }
      } else if (type === 'GARDEN') {
        add(new T.BoxGeometry(70, 1.8, 60), M.grass, 0, 0.9, 0, false);
        for (const [w, d, x, z] of [[70, 1.6, 0, 30], [70, 1.6, 0, -30], [1.6, 60, 35, 0], [1.6, 60, -35, 0]]) add(new T.BoxGeometry(w, 5, d), M.stone, x, 3, z);
        const gate = add(new T.TorusGeometry(5, 0.8, 8, 24), M.stone2, 0, 6, 30.4, false);
        add(new T.CylinderGeometry(10, 10.5, 0.8, 24), M.stone2, 0, 1.9, 0, false); add(new T.CylinderGeometry(9, 9, 0.7, 24), M.water, 0, 2.3, 0, false);
        for (let i = 0; i < 18; i++) { const a = i * 2.4, r = 14 + (i % 4) * 3; add(new T.SphereGeometry(1.4, 7, 6), M.bloom[i % 4], Math.cos(a) * r, 2.8, Math.sin(a) * r * 0.85, false); }
        P.person(g, P.civ(78060), 'idle', 16, 0.5, 8, 1);
      } else if (type === 'CAFE') {
        add(new T.BoxGeometry(36, 1, 24), M.stone2, 0, 0.5, 0);
        add(new T.BoxGeometry(32, 8, 20), M.stone, 0, 5, 0);
        add(new T.ConeGeometry(25, 5, 4).rotateY(Math.PI / 4), M.cloth, 0, 11.5, 0);
        for (let i = 0; i < 4; i++) add(new T.BoxGeometry(5, 3.4, 0.3), P.pw(api).win, -12 + i * 8, 5.5, 10.2, false);
        for (const [x, z] of [[-10, 17], [2, 19], [12, 16]]) { add(new T.CylinderGeometry(2, 2, 0.4, 10), M.wood, x, 2.8, z, false); add(new T.CylinderGeometry(0.3, 0.3, 2.4, 6), M.trunk, x, 1.5, z, false); add(new T.ConeGeometry(3.4, 1.4, 10), M.bloom[x > 0 ? 1 : 0], x, 6.8, z, false); add(new T.CylinderGeometry(0.15, 0.15, 4, 6), M.white, x, 4.8, z, false); }
        P.sign(api, g, 'PARK CAFÉ', 18, 2.6, 0, 8, 10.4, 0, '#4a2a1a', '#ffe8c0');
        P.person(g, P.civ(78070), 'idle', -6, 0.5, 15, 0); P.person(g, P.civ(78071), 'idle', 6, 0.5, 15, 0);
      }
    },
    tick(api, dt, t) {
      if (api.flag('opened') && !document.getElementById('nextMeeting')) {
        const b = document.createElement('button'); b.id = 'nextMeeting';
        b.innerHTML = 'GO TO THE NEXT COUNCIL MEETING ▶<small style="display:block;font-weight:400;font-size:10px;letter-spacing:2px;color:#d8ffd0;margin-top:3px">THE GREAT PARK IS OPEN</small>';
        b.style.cssText = 'position:fixed;left:50%;bottom:22px;transform:translateX(-50%);z-index:9;padding:10px 22px;font:600 14px "Segoe UI",Arial;letter-spacing:3px;color:#fff;background:rgba(20,90,40,.85);border:1px solid #90f0a0;border-radius:6px;cursor:pointer';
        b.onmouseenter = () => b.style.background = 'rgba(30,120,55,.95)'; b.onmouseleave = () => b.style.background = 'rgba(20,90,40,.85)';
        b.onclick = () => { location.href = 'councilmeeting/councilmeeting45.html'; };
        document.body.appendChild(b);
      }
    },
    finish: {
      label: 'OPENING DAY',
      cam: [[1550 + 1600 + 0, (window.__PARK.Y || -85) + 140, 1200 + 470], [1550 + 1600 + 0, (window.__PARK.Y || -85) + 40, 1200 + 40]],
      start(api) {
        this.stage = 0; this.t1 = 0; this._h = false; P.ring && P.ring(2);
        const T = api.THREE, host = api.placed.find(p => p.piece && p.piece.parent), par = host && host.piece.parent, o = P.OFF || [0, 0], Y0 = (window.__PARK.Y || -85);
        this.grp = new T.Group(); par && par.add(this.grp);
        const cols = [0xe8508a, 0xf2c41a, 0x4aa0e8, 0x70d070, 0xb070e0, 0xff8a3a];
        this.balloons = []; for (let i = 0; i < 40; i++) {
          const m = new T.Group(), c = cols[i % 6], b = new T.Mesh(new T.SphereGeometry(2.2, 10, 8), new T.MeshStandardMaterial({ color: c, roughness: 0.4 })); b.scale.y = 1.2; m.add(b);
          const s = new T.Mesh(new T.CylinderGeometry(0.05, 0.05, 8, 4), new T.MeshBasicMaterial({ color: 0xeeeeee })); s.position.y = -6; m.add(s);
          m.userData = { x: 1550 + 1600 + o[0] + (Math.random() - 0.5) * 140, z: 1200 + o[1] + 300 + (Math.random() - 0.5) * 60, y0: Y0 + 4, sp: 7 + Math.random() * 8, d: Math.random() * 3 }; m.position.set(m.userData.x, -9999, m.userData.z); this.grp.add(m); this.balloons.push(m);
        }
        this.fw = []; [[-110, 60, 5], [0, 30, 7.5], [110, 80, 10]].forEach(([dx, dy, t0], n) => {
          const gg = new T.Group(); gg.userData = { t0, x: 1550 + 1600 + o[0] + dx, y: Y0 + 190 + dy, z: 1200 + o[1] + 60, parts: [] };
          const col = [new T.Color(2.4, 0.6, 1.2), new T.Color(2.4, 2, 0.5), new T.Color(0.6, 1.6, 2.6)][n];
          for (let i = 0; i < 70; i++) { const p = new T.Mesh(new T.SphereGeometry(1.1, 5, 4), new T.MeshBasicMaterial({ color: col, transparent: true, opacity: 0, toneMapped: false })); const v = new T.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize().multiplyScalar(26 + Math.random() * 18); p.userData.v = v; gg.add(p); }
          gg.position.set(gg.userData.x, gg.userData.y, gg.userData.z); this.grp.add(gg); this.fw.push(gg);
        });
      },
      update(api, dt, f) {
        this.t1 += dt; const t = this.t1;
        (this.balloons || []).forEach(m => { const u = t - 1 - m.userData.d; if (u < 0) return; m.position.y = m.userData.y0 + u * m.userData.sp; m.position.x = m.userData.x + Math.sin(u * 0.8 + m.userData.d) * 3; m.visible = u < 20; });
        (this.fw || []).forEach(gg => { const u = t - gg.userData.t0; gg.children.forEach(p => { if (u < 0) { p.material.opacity = 0; return; } p.position.copy(p.userData.v).multiplyScalar(u * 0.6); p.position.y -= u * u * 2; p.material.opacity = Math.max(0, 1 - u / 3.2); }); });
        if (this.stage === 0) {
          P.hint(t < 3 ? 'THE GATE OPENS · THE FAMILIES OF UNITY WALK IN' : t < 7 ? 'BALLOONS RISE OVER THE LAKE' : t < 12 ? 'THE FIREWORKS BEGIN' : 'THE GREAT PARK OF UNITY IS OPEN');
          if (t > 17) { this.stage = 1; this.t1 = 0; P.hint(''); this.grp && this.grp.parent && this.grp.parent.remove(this.grp); this.grp = null; this.balloons = this.fw = null; P.cover(true, 'THE GREAT PARK OF UNITY IS OPEN', 'FOUR LAWNS · THE LAKE · TREE WALKS · PICNIC GROVES · THE BANDSTAND · THE FOUNTAIN · THE QUIET GARDEN'); }
        } else {
          if (this.t1 > 4 && !this._h) { this._h = true; api.setFlag('greatpark', true); api.setFlag('opened', true); }
          if (this.t1 > 6.5) { P.cover(false); this._h = false; return true; }
        }
        return false;
      },
    },
  }));
})();
