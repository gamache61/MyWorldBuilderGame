/* ============================================================
   THE UNITY SHIPYARD · BUILD 5 · THE FITTING QUAY, THE CREW TRUCKS & THE FIRST LAUNCH
   Keep this file in projects/shipyard next to 74-shipyard.html.
   A fitting tower, parts trucks on the road, and the first launch of a ship built entirely from Unity's own parts.
   ============================================================ */
(function () {
  const P = window.PWP;
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 5, name: 'THE FITTING TOWER, THE TRUCKS & THE FIRST LAUNCH',
    brief: 'A tall fitting tower beside the slips, parts trucks on the road, then the first launch, when a ship built entirely from Unity\'s own parts is finished and lifts off.',
    types: {
      TOWER: { code: 'FB', name: 'FITTING TOWER', col: '#d7dade', w: 30, d: 30, h: 70 },
      TRUCK: { code: 'HM', name: 'PARTS TRUCK',   col: '#2f6fb0', w: 10, d: 4,  h: 5 },
      FORK:  { code: 'HM', name: 'FORKLIFT',      col: '#f2c41a', w: 6,  d: 3,  h: 5 },
    },
    order: ['TOWER', 'TRUCK', 'FORK'],
    at: {
      TOWER: [[1550 + 290, 420]],
      TRUCK: [[1550 - 190, 380], [1550 - 190, 430], [1550 + 20, 440], [1550 + 130, 440]],
      FORK: [[1550 - 150, 480], [1550 + 10, 480], [1550 + 170, 480]],
    },
    eye: [1550 + 60, P.SY + 200, 240],
    stats(api, c) { return [['FITTING TOWER', c('TOWER') ? 'BUILT' : 'NOT YET'], ['PARTS TRUCKS', c('TRUCK') + ' / 4'], ['FORKLIFTS', c('FORK') + ' / 3'], ['THE FIRST SHIP', api.flag('opened') ? 'LAUNCHED' : 'NOT YET']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, H = P.pw(api);
      if (type === 'TOWER') {
        add(new T.BoxGeometry(30, 1, 30), H.conc2, 0, 0.5, 0);
        add(new T.BoxGeometry(22, 60, 22), H.wall, 0, 31, 0);
        for (let y = 10; y < 60; y += 10) { add(new T.BoxGeometry(23, 0.8, 23), H.steel2, 0, y, 0, false); for (const s of [-1, 1]) add(new T.BoxGeometry(0.4, 4, 16), H.win, s * 11.2, y + 3, 0, false); }
        add(new T.BoxGeometry(26, 2, 26), H.roof, 0, 62, 0); add(new T.CylinderGeometry(0.4, 0.4, 14, 6), H.steel, 0, 70, 0, false); add(new T.SphereGeometry(1.4, 10, 8), H.cool, 0, 77.6, 0, false);
        P.sign(api, g, 'FITTING TOWER', 16, 3, 0, 40, 11.3, 0, '#14242e', '#a8d8ff');
      } else if (type === 'TRUCK') {
        const t = P.truck(api, add, H, 0, 0, Math.PI / 2, k % 2 ? H.blue : H.orange); g.add(t);
        for (let i = 0; i < 3; i++) add(new T.BoxGeometry(2.2, 1.8, 2.4), H.steel, 0, 3, -4 + i * 2.4, false);
      } else if (type === 'FORK') {
        add(new T.BoxGeometry(3.6, 1.8, 2.4), H.yellow, 0, 1.6, 0); add(new T.BoxGeometry(2, 1.6, 2), H.dark, -0.4, 3.3, 0); add(new T.BoxGeometry(0.4, 4.6, 2.2), H.steel, 2.2, 2.6, 0);
        for (const wx of [-1.2, 1.2]) for (const wz of [-1.3, 1.3]) { const w = add(new T.CylinderGeometry(0.6, 0.6, 0.5, 10), H.dark, wx, 0.6, wz, false); w.rotation.x = Math.PI / 2; }
      }
    },
    tick(api, dt, t) {
      if (api.flag('opened') && !document.getElementById('nextMeeting')) {
        const b = document.createElement('button'); b.id = 'nextMeeting';
        b.innerHTML = 'GO TO THE NEXT COUNCIL MEETING ▶<small style="display:block;font-weight:400;font-size:10px;letter-spacing:2px;color:#c8ecff;margin-top:3px">UNITY HAS BUILT ITS OWN SHIP</small>';
        b.style.cssText = 'position:fixed;left:50%;bottom:22px;transform:translateX(-50%);z-index:9;padding:10px 22px;font:600 14px "Segoe UI",Arial;letter-spacing:3px;color:#fff;background:rgba(20,60,100,.85);border:1px solid #9fd8ff;border-radius:6px;cursor:pointer;text-align:center';
        b.onmouseenter = () => b.style.background = 'rgba(30,90,140,.95)'; b.onmouseleave = () => b.style.background = 'rgba(20,60,100,.85)';
        b.onclick = () => { location.href = 'councilmeeting/councilmeeting41.html'; };
        document.body.appendChild(b);
      }
    },
    finish: {
      label: 'THE FIRST LAUNCH',
      cam: [[1550 + 100, 90, 330], [1550 + 220, 50, 540]],
      start(api) {
        this.stage = 0; this.t1 = 0; this._h = false; P.ring && P.ring(2);
        const T = api.THREE, H = P.pw(api), host = api.placed.find(p => p.piece && p.piece.parent), g = new T.Group();
        const m = (geo, mat, x, y, z, rx, ry, rz) => { const o = new T.Mesh(geo, mat); o.position.set(x, y, z); if (rx) o.rotation.x = rx; if (ry) o.rotation.y = ry; if (rz) o.rotation.z = rz; o.castShadow = true; g.add(o); return o; };
        m(new T.CylinderGeometry(4.2, 5.4, 56, 14).rotateX(Math.PI / 2), H.wall2, 0, 0, 0);
        m(new T.ConeGeometry(4.2, 18, 14).rotateX(-Math.PI / 2), H.wall, 0, 0, -37);
        m(new T.BoxGeometry(5, 2.6, 8), H.win, 0, 3.6, -22);
        for (const s of [-1, 1]) { m(new T.BoxGeometry(26, 0.8, 16), H.steel2, s * 14, -1, 8); m(new T.BoxGeometry(0.8, 8, 9), H.blue, s * 26, 2, 12); m(new T.CylinderGeometry(2.2, 2.6, 8, 10).rotateX(Math.PI / 2), H.dark, s * 7, -1, 28); m(new T.CylinderGeometry(1.7, 1.7, 0.6, 10).rotateX(Math.PI / 2), H.cool, s * 7, -1, 32.4); }
        m(new T.CylinderGeometry(2.4, 2.8, 7, 10).rotateX(Math.PI / 2), H.dark, 0, 0, 30); this.flame = m(new T.CylinderGeometry(1.8, 0.2, 14, 10).rotateX(-Math.PI / 2), H.hot, 0, 0, 40);
        this.flame2 = this.flame; this.ship = g;
        const o = P.OFF || [0, 0];
        this.x0 = 1550 + 220 + o[0]; this.z0 = 530 + o[1]; this.y0 = (P.SY || 0) + 22;
        g.position.set(this.x0, this.y0, this.z0); g.rotation.y = 0; g.scale.setScalar(0.01);
        (host ? host.piece.parent : null) && host.piece.parent.add(g);
        this.flame.visible = false;
      },
      update(api, dt, f) {
        this.t1 += dt; const g = this.ship, t = this.t1;
        if (g) {
          if (t < 3) { g.scale.setScalar(0.01 + (t / 3) * 0.99); }
          else { g.scale.setScalar(1); }
          if (t > 5) { const u = t - 5; this.flame.visible = true; this.flame.scale.set(1, 1, 0.7 + Math.random() * 0.6); g.position.y = this.y0 + u * u * 1.6; g.position.z = this.z0 - u * u * 2.6; g.rotation.x = -Math.min(0.5, u * 0.05); if (u > 11) { g.visible = false; } }
        }
        if (this.stage === 0) {
          P.hint(t < 3 ? 'THE LAST PLATE GOES ON · THE FIRST SHIP BUILT FROM UNITY\'S OWN PARTS' : t < 5 ? 'THE GANTRY LETS GO · THE ENGINES LIGHT' : 'THE FIRST UNITY SHIP LIFTS OFF');
          if (t > 17) { this.stage = 1; this.t1 = 0; P.hint(''); if (g && g.parent) g.parent.remove(g); this.ship = null; P.cover(true, 'THE UNITY SHIPYARD IS OPEN', 'THREE SLIPS · THE GANTRY CRANES · THE ASSEMBLY HALL · THE FITTING TOWER'); }
        } else {
          if (this.t1 > 4 && !this._h) { this._h = true; api.setFlag('shipyard', true); api.setFlag('opened', true); }
          if (this.t1 > 6.5) { P.cover(false); this._h = false; return true; }
        }
        return false;
      },
    },
  }));
})();
