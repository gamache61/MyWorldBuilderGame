/* ============================================================
   THE STAR CHART HOUSE · BUILD 5 · THE OBSERVATORY, THE GARDEN OF PLANETS & THE FIRST CHART
   Keep this file in projects/starchart next to 79-starchart.html.
   A tall observatory tower, a garden of model planets, then the first night the scouts' charts are shown over Unity.
   ============================================================ */
(function () {
  const P = window.PWP;
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 5, name: 'THE OBSERVATORY, THE GARDEN OF PLANETS & THE FIRST CHART',
    brief: 'A tall observatory tower beside the house, a garden of five model planets on poles, then the first chart night, when the scouts\' charts are shown as a great map of stars over the house.',
    types: {
      TOWER:  { code: 'FB', name: 'OBSERVATORY TOWER', col: '#cfd2da', w: 24, d: 24, h: 70 },
      PLANET: { code: 'HM', name: 'MODEL PLANET',      col: '#e8a060', w: 14, d: 14, h: 18 },
    },
    order: ['TOWER', 'PLANET'],
    at: { TOWER: [[1550 + 2400 + 150, 1250 + 40]], PLANET: [[1550 + 2400 + -160, 1250 + 60], [1550 + 2400 + -120, 1250 + 100], [1550 + 2400 + -80, 1250 + 140], [1550 + 2400 + -40, 1250 + 100], [1550 + 2400 + 0, 1250 + 140]] },
    eye: [1550 + 2400 + 0, (window.__STAR.Y || -85) + 200, 1250 + 380],
    stats(api, c) { return [['OBSERVATORY TOWER', c('TOWER') ? 'BUILT' : 'NOT YET'], ['MODEL PLANETS', c('PLANET') + ' / 5'], ['THE FIRST CHART', api.flag('opened') ? 'SHOWN' : 'NOT YET']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, H = P.pw(api), S = P.sc(api);
      if (type === 'TOWER') {
        add(new T.BoxGeometry(24, 2, 24), S.stone2, 0, 1, 0);
        add(new T.CylinderGeometry(8, 10, 58, 16), S.stone, 0, 31, 0);
        for (let y = 12; y < 58; y += 12) add(new T.TorusGeometry(8.6, 0.5, 4, 20), S.brass, 0, y, 0, false).rotation.x = Math.PI / 2;
        add(new T.CylinderGeometry(11, 9, 3, 16), S.navy, 0, 61, 0);
        add(new T.SphereGeometry(9, 18, 10, 0, Math.PI * 2, 0, Math.PI / 2), S.copper, 0, 62.5, 0);
        add(new T.BoxGeometry(3, 8, 6), S.dark, 0, 68, 6, false).rotation.x = -0.5;
        add(new T.CylinderGeometry(0.4, 0.4, 12, 6), S.brass, 0, 76, 0, false); add(new T.SphereGeometry(1.4, 10, 8), S.star, 0, 82.4, 0, false);
        P.sign(api, g, 'OBSERVATORY', 14, 2.4, 0, 20, 10.4, 0, '#14182e', '#ffe9a8');
      } else if (type === 'PLANET') {
        add(new T.CylinderGeometry(2.4, 3, 2, 10), S.stone2, 0, 1, 0, false);
        add(new T.CylinderGeometry(0.4, 0.4, 10, 6), S.brass, 0, 6, 0, false);
        const r = 4 + (k % 3) * 0.9; add(new T.SphereGeometry(r, 16, 12), S.planet[k % 5], 0, 11 + r, 0);
        if (k === 1 || k === 3) add(new T.TorusGeometry(r * 1.7, 0.35, 4, 32), S.planet[(k + 2) % 5], 0, 11 + r, 0, false).rotation.x = 1.3;
      }
    },
    tick(api, dt, t) {
      if (api.flag('opened') && !document.getElementById('nextMeeting')) {
        const b = document.createElement('button'); b.id = 'nextMeeting';
        b.innerHTML = 'GO TO THE NEXT COUNCIL MEETING ▶<small style="display:block;font-weight:400;font-size:10px;letter-spacing:2px;color:#ffe9a8;margin-top:3px">THE FIRST STAR CHART IS SHOWN</small>';
        b.style.cssText = 'position:fixed;left:50%;bottom:22px;transform:translateX(-50%);z-index:9;padding:10px 22px;font:600 14px "Segoe UI",Arial;letter-spacing:3px;color:#fff;background:rgba(30,40,100,.85);border:1px solid #c8d0ff;border-radius:6px;cursor:pointer';
        b.onmouseenter = () => b.style.background = 'rgba(45,60,140,.95)'; b.onmouseleave = () => b.style.background = 'rgba(30,40,100,.85)';
        b.onclick = () => { location.href = 'councilmeeting/councilmeeting46.html'; };
        document.body.appendChild(b);
      }
    },
    finish: {
      label: 'THE FIRST CHART',
      cam: [[1550 + 2400 + 0, (window.__STAR.Y || -85) + 60, 1250 + 330], [1550 + 2400 + 0, (window.__STAR.Y || -85) + 110, 1250 - 40]],
      start(api) {
        this.stage = 0; this.t1 = 0; this._h = false; P.ring && P.ring(2);
        const T = api.THREE, host = api.placed.find(p => p.piece && p.piece.parent), par = host && host.piece.parent, o = P.OFF || [0, 0], Y0 = (window.__STAR.Y || -85);
        this.grp = new T.Group(); this.grp.position.set(1550 + 2400 + o[0], Y0 + 175, 1250 + o[1] - 20); par && par.add(this.grp);
        const cols = [new T.Color(2.2, 2.0, 1.2), new T.Color(1.0, 1.6, 2.8), new T.Color(2.6, 1.2, 0.8)];
        this.stars = []; for (let i = 0; i < 260; i++) { const m = new T.Mesh(new T.SphereGeometry(0.7 + Math.random() * 1.1, 5, 4), new T.MeshBasicMaterial({ color: cols[i % 3], transparent: true, opacity: 0, toneMapped: false }));
          const a = Math.random() * Math.PI * 2, r = Math.sqrt(Math.random()) * 150; m.position.set(Math.cos(a) * r, (Math.random() - 0.5) * 30 + Math.sin(a * 3) * 8, Math.sin(a) * r * 0.8); m.userData.d = Math.random() * 6; this.grp.add(m); this.stars.push(m); }
        this.lines = []; for (let i = 0; i < 40; i++) { const A = this.stars[(Math.random() * 260) | 0], B = this.stars[(Math.random() * 260) | 0]; const pts = [A.position.clone(), B.position.clone()]; if (pts[0].distanceTo(pts[1]) > 60) continue;
          const l = new T.Line(new T.BufferGeometry().setFromPoints(pts), new T.LineBasicMaterial({ color: 0x9fc8ff, transparent: true, opacity: 0, toneMapped: false })); l.userData.d = 4 + Math.random() * 6; this.grp.add(l); this.lines.push(l); }
        const ring = new T.Mesh(new T.TorusGeometry(170, 0.8, 6, 80), new T.MeshBasicMaterial({ color: new T.Color(0.7, 1.2, 2.6), transparent: true, opacity: 0, toneMapped: false })); ring.rotation.x = Math.PI / 2; ring.scale.z = 1; this.grp.add(ring); this.ring = ring;
      },
      update(api, dt, f) {
        this.t1 += dt; const t = this.t1;
        (this.stars || []).forEach(m => { const u = t - 2 - m.userData.d * 0.6; m.material.opacity = Math.max(0, Math.min(1, u)) * (t > 16 ? Math.max(0, 1 - (t - 16) / 3) : 1); m.scale.setScalar(1 + 0.25 * Math.sin(t * 3 + m.userData.d * 9)); });
        (this.lines || []).forEach(l => { const u = t - 2 - l.userData.d; l.material.opacity = Math.max(0, Math.min(0.7, u * 0.5)) * (t > 16 ? Math.max(0, 1 - (t - 16) / 3) : 1); });
        if (this.ring) { this.ring.material.opacity = Math.min(0.6, Math.max(0, (t - 1) / 3)) * (t > 16 ? Math.max(0, 1 - (t - 16) / 3) : 1); this.grp.rotation.y = t * 0.05; }
        if (this.stage === 0) {
          P.hint(t < 3 ? 'THE DOME OPENS · THE DISHES LISTEN' : t < 7 ? 'THE FIRST STARS APPEAR OVER THE HOUSE' : t < 12 ? 'THE SCOUTS\' CHARTS JOIN THE STARS INTO ONE GREAT MAP' : 'A MAP OF THE DARK BEYOND THE SUN OF UNITY');
          if (t > 19) { this.stage = 1; this.t1 = 0; P.hint(''); this.grp && this.grp.parent && this.grp.parent.remove(this.grp); this.grp = null; this.stars = this.lines = this.ring = null; P.cover(true, 'THE STAR CHART HOUSE IS OPEN', 'THE ROUND HOUSE · THE STAR THEATRE · FOUR MAP TABLES · TWO DISHES · THE OBSERVATORY · THE GARDEN OF PLANETS'); }
        } else {
          if (this.t1 > 4 && !this._h) { this._h = true; api.setFlag('starchart', true); api.setFlag('opened', true); }
          if (this.t1 > 6.5) { P.cover(false); this._h = false; return true; }
        }
        return false;
      },
    },
  }));
})();
