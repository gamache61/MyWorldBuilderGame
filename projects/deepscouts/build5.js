/* ============================================================
   THE DEEP SPACE SCOUTS · BUILD 5 · THE LAUNCH TOWER, THE MISSION HALL & THE FIRST LAUNCH
   Keep this file in projects/deepscouts next to 77-deepscouts.html.
   A launch tower and a mission hall, then the day the three scouts lift off and fly beyond the sun of Unity.
   ============================================================ */
(function () {
  const P = window.PWP;
  // a small, fast scout ship: long needle nose, swept wings, a big engine bell; nose points to -z
  P.scoutShip = P.scoutShip || function (api, add, H, col) {
    const T = api.THREE;
    const prof = [[0, 0], [1.6, 3], [2.8, 10], [3.4, 20], [3.4, 30], [2.8, 36], [2.2, 38]].map(([r, y]) => new T.Vector2(r, y));
    const body = add(new T.LatheGeometry(prof, 14).rotateX(Math.PI / 2).translate(0, 0, -18), col, 0, 0, 0);
    add(new T.SphereGeometry(2.2, 10, 8), H.glass, 0, 2.2, -10, false).scale.set(0.9, 0.7, 2.2);
    for (const s of [-1, 1]) {
      const w = add(new T.BoxGeometry(14, 0.6, 12), H.steel2, s * 8, -0.4, 10); w.rotation.y = s * 0.45;
      add(new T.BoxGeometry(0.6, 5, 5), H.orange, s * 14.5, 2, 15, false).rotation.y = s * 0.2;
      add(new T.CylinderGeometry(0.8, 1, 8, 8).rotateX(Math.PI / 2), H.dark, s * 5, -0.4, 16, false);
    }
    add(new T.CylinderGeometry(1.8, 2.6, 4, 12).rotateX(Math.PI / 2), H.dark, 0, 0, 20, false);
    add(new T.BoxGeometry(0.5, 4, 9), H.white, 0, 3.4, 14, false);
    add(new T.TorusGeometry(3.4, 0.2, 6, 20), H.cool, 0, 0, 6, false);
  };
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 5, name: 'THE LAUNCH TOWER, THE MISSION HALL & THE FIRST LAUNCH',
    brief: 'A tall launch tower and the mission hall where the scouts are watched, then launch day, when all three scouts lift off one after another and fly out beyond the sun of Unity.',
    types: {
      TOWER: { code: 'FB', name: 'LAUNCH TOWER', col: '#d7dade', w: 24, d: 24, h: 64 },
      HALL:  { code: 'FB', name: 'MISSION HALL', col: '#b8bec6', w: 46, d: 26, h: 16 },
    },
    order: ['TOWER', 'HALL'],
    at: { TOWER: [[1550 + 500 + 190, 1100 + -60]], HALL: [[1550 + 500 + 190, 1100 + 50]] },
    eye: [1550 + 500 + 0, (window.__SCOUT.Y || -85) + 190, 1100 - 330],
    stats(api, c) { return [['LAUNCH TOWER', c('TOWER') ? 'BUILT' : 'NOT YET'], ['MISSION HALL', c('HALL') ? 'OPEN' : 'NOT YET'], ['THE THREE SCOUTS', api.flag('opened') ? 'LAUNCHED' : 'NOT YET']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, H = P.pw(api);
      if (type === 'TOWER') {
        add(new T.BoxGeometry(24, 1, 24), H.conc2, 0, 0.5, 0);
        add(new T.BoxGeometry(16, 54, 16), H.wall, 0, 28, 0);
        for (let y = 10; y < 54; y += 10) { add(new T.BoxGeometry(17, 0.8, 17), H.steel2, 0, y, 0, false); for (const s of [-1, 1]) add(new T.BoxGeometry(0.4, 4, 11), H.win, s * 8.2, y + 3, 0, false); }
        add(new T.BoxGeometry(20, 2, 20), H.roof, 0, 56, 0); add(new T.CylinderGeometry(0.4, 0.4, 14, 6), H.steel, 0, 63, 0, false); add(new T.SphereGeometry(1.4, 10, 8), H.cool, 0, 70.6, 0, false);
        P.sign(api, g, 'LAUNCH CONTROL', 16, 3, 0, 36, 8.3, 0, '#14242e', '#a8d8ff');
      } else if (type === 'HALL') {
        add(new T.BoxGeometry(46, 1, 26), H.conc2, 0, 0.5, 0);
        add(new T.BoxGeometry(42, 11, 22), H.wall2, 0, 6.5, 0);
        add(new T.BoxGeometry(44, 1, 24), H.roof, 0, 12.5, 0);
        for (let i = 0; i < 5; i++) add(new T.BoxGeometry(5, 4, 0.4), H.win, -16 + i * 8, 7, 11.2, false);
        add(new T.SphereGeometry(5, 14, 8, 0, Math.PI * 2, 0, Math.PI / 2), H.white, 12, 13, 0, false);
        P.sign(api, g, 'MISSION HALL', 18, 2.6, -8, 9.6, 11.4, 0, '#14242e', '#80f0ff');
        P.person(g, P.civ(77030), 'idle', -6, 0.5, 15, 0); P.person(g, P.civ(77031), 'idle', 0, 0.5, 15, 0);
      }
    },
    tick(api, dt, t) {
      if (api.flag('opened') && !document.getElementById('nextMeeting')) {
        const b = document.createElement('button'); b.id = 'nextMeeting';
        b.innerHTML = 'GO TO THE NEXT COUNCIL MEETING ▶<small style="display:block;font-weight:400;font-size:10px;letter-spacing:2px;color:#c8f4ff;margin-top:3px">THE SCOUTS ARE ON THEIR WAY</small>';
        b.style.cssText = 'position:fixed;left:50%;bottom:22px;transform:translateX(-50%);z-index:9;padding:10px 22px;font:600 14px "Segoe UI",Arial;letter-spacing:3px;color:#fff;background:rgba(10,70,90,.85);border:1px solid #80f0ff;border-radius:6px;cursor:pointer';
        b.onmouseenter = () => b.style.background = 'rgba(20,100,125,.95)'; b.onmouseleave = () => b.style.background = 'rgba(10,70,90,.85)';
        b.onclick = () => { location.href = 'councilmeeting/councilmeeting44.html'; };
        document.body.appendChild(b);
      }
    },
    finish: {
      label: 'THE LAUNCH',
      cam: [[1550 + 500 + 0, (window.__SCOUT.Y || -85) + 110, 1100 + 340], [1550 + 500 + 0, (window.__SCOUT.Y || -85) + 45, 1100 - 40]],
      start(api) {
        this.stage = 0; this.t1 = 0; this._h = false; P.ring && P.ring(2);
        const T = api.THREE, H = P.pw(api), host = api.placed.find(p => p.piece && p.piece.parent), par = host && host.piece.parent, o = P.OFF || [0, 0];
        this.ships = []; this.hidden = [];
        for (const p of api.placed.filter(p => p.type === 'SCOUT' && p.piece)) {
          p.piece.visible = false; this.hidden.push(p.piece);
          const g = new T.Group(), add = (geo, mat, x, y, z) => { const m = new T.Mesh(geo, mat); m.position.set(x, y, z); m.castShadow = true; g.add(m); return m; };
          P.scoutShip(api, add, H, H.white);
          const f = new T.Mesh(new T.CylinderGeometry(1.6, 0.2, 16, 10).rotateX(-Math.PI / 2), H.hot); f.position.set(0, 0, 30); f.visible = false; g.add(f);
          g.scale.setScalar(1.5); g.position.set(p.piece.position.x, p.piece.position.y + 7.2, p.piece.position.z - 4); g.userData.y0 = g.position.y; g.userData.z0 = g.position.z; g.userData.f = f;
          par && par.add(g); this.ships.push(g);
        }
        this.ships.sort((a, b) => a.position.x - b.position.x);
      },
      update(api, dt, f) {
        this.t1 += dt; const t = this.t1;
        this.ships.forEach((g, i) => {
          const u = t - 4 - i * 3.2; if (u < 0) return;
          g.userData.f.visible = true; g.userData.f.scale.set(1, 1, 0.7 + Math.random() * 0.6);
          g.position.y = g.userData.y0 + u * u * 2.2; g.position.z = g.userData.z0 - u * u * 3.2 - 0; g.rotation.x = -Math.min(0.9, u * 0.12);
          g.visible = u < 12;
        });
        if (this.stage === 0) {
          P.hint(t < 3 ? 'THE LAST SCOUT IS FUELLED · THE GANTRIES PULL BACK' : t < 6 ? 'SCOUT ONE · ENGINES LIT' : t < 9 ? 'SCOUT TWO LIFTS OFF' : t < 13 ? 'SCOUT THREE · THEY CLIMB AWAY FROM UNITY' : 'THREE SCOUTS FLY OUT BEYOND THE SUN');
          if (t > 19) { this.stage = 1; this.t1 = 0; P.hint(''); this.ships.forEach(g => g.parent && g.parent.remove(g)); this.ships = []; P.cover(true, 'THE DEEP SPACE SCOUTS HAVE LAUNCHED', 'THREE SCOUTS · THE LAUNCH TOWER · THE MISSION HALL · THE SCOUT FIELD'); }
        } else {
          if (this.t1 > 4 && !this._h) { this._h = true; api.setFlag('deepscouts', true); api.setFlag('opened', true); }
          if (this.t1 > 6.5) { P.cover(false); this._h = false; return true; }
        }
        return false;
      },
    },
  }));
})();
