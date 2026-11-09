/* ============================================================
   THE SKY RAIL · BUILD 5 · THE VALLEY VIADUCT & THE FIRST RUN
   Keep this file in projects/skyrail next to 40-skyrail.html.
   Where the plateau ends, a great viaduct strides out across the
   valley on tall white piers, carrying the line on toward Seashore,
   the Farmlands and the factory district. Three sky pods are set on
   the guideway at the station. Ends with L: the first run — a sky pod
   full of the people of Kryos glides out of the station, over the
   city, under the green bridges and away across the valley.
   ============================================================ */
(function () {
  const P = window.SKY;
  // pods on the line: the first-run pod, then the pods that keep running once the Sky Rail is open
  P.runs = P.runs || [];
  P.lineParent = (api) => { const s = api.placed.find(p => p.type === 'STATION' && p.piece); return s ? s.piece.parent : null; };
  P.addRun = (api, x, dir, sp, n) => {
    const par = P.lineParent(api); if (!par) return null; const T = api.THREE;
    const pod = P.pod(api, (geo, m, X, Y, Z, sh, parent) => { const o = new T.Mesh(geo, m); o.position.set(X, Y, Z); o.castShadow = true; parent.add(o); return o; }, par, x, P.railY(x), P.Z, n);
    const r = { pod, x, dir, sp }; P.runs.push(r); return r;
  };
  P.stepRuns = (dt) => {
    for (const r of P.runs) {
      r.x += r.dir * r.sp * dt;
      if (r.loop) { if (r.x > P.X.end2) { r.x = P.X.end2; r.dir = -1; } if (r.x < 560) { r.x = 560; r.dir = 1; } }
      const a = Math.atan2(P.railY(r.x + 1) - P.railY(r.x - 1), 2);
      r.pod.position.set(r.x, P.railY(r.x), P.Z); r.pod.rotation.set(0, r.dir > 0 ? 0 : Math.PI, r.dir > 0 ? a : -a);
      r.pod.visible = r.x < P.X.end2 + 10;
    }
  };
  P.X.end2 = 2990;
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 5, name: 'THE VALLEY VIADUCT & THE FIRST RUN',
    brief: 'A great viaduct on tall white piers across the valley, carrying the line on toward Seashore, the Farmlands and the factories, and three sky pods at the station — then the first run.',
    types: {
      VIADUCT: { code: 'SF', name: 'VIADUCT SPAN', col: '#e8e1d1', w: 520, d: 12, h: 30 },
      SKYPOD:  { code: 'SY', name: 'SKY POD', col: '#9fffd8', w: 24, d: 6, h: 7 },
    },
    order: ['VIADUCT', 'SKYPOD'],
    at: { VIADUCT: [[1700, -420], [2220, -420], [2740, -420]], SKYPOD: [[575, -420], [640, -420], [705, -420]] },
    eye: [-220, 160, 280],
    stats(api, c) { return [['VIADUCT SPANS', c('VIADUCT') + ' / 3'], ['SKY PODS', c('SKYPOD') + ' / 3'], ['SKY RAIL', api.flag('skyRail') ? 'RUNNING' : 'NOT YET']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, S = P.hm(api), y0 = sl.y, ty = P.TRACK_Y - y0;
      if (type === 'VIADUCT') {
        P.beam(api, add, F, -260, 260, ty, ty, 8);
        // tall white piers down to the valley floor, joined by slender arches
        for (let x = -260; x <= 260; x += 65) {
          const gy = P.ground(api, sl.x + x, sl.z) - y0, h = ty - 4.6 - gy; if (h < 2) continue;
          add(new T.CylinderGeometry(2.2, 3.6, h, 14), S.frame, x, gy + h / 2, 0);
          add(new T.BoxGeometry(8, 1.6, 10), F.steel, x, ty - 5.4, 0);
          add(new T.CylinderGeometry(5, 5, 1.6, 16), S.stone, x, gy + 0.8, 0);
          if (h > 40) add(new T.SphereGeometry(0.6, 8, 6), S.glow, x, ty - 7, 2.6, false);
        }
        for (let x = -227.5; x < 260; x += 65) { const a = add(new T.TorusGeometry(30, 0.9, 6, 24, Math.PI), S.frame, x, ty - 6, 0); a.rotation.z = Math.PI; a.scale.y = 0.35; }
      } else if (type === 'SKYPOD') {
        P.pod(api, add, g, 0, P.RAIL_Y - y0, 0, k);
      }
    },
    tick(api, dt, t) {
      P.moveWalkers(t);
      // once the Sky Rail is running, pods glide up and down the line, and a button leads to the seventeenth council meeting
      if (api.flag('opened') && !P._looping && P.lineParent(api)) {
        P._looping = true;
        for (const [x, dir, n] of [[900, 1, 0], [2100, -1, 1], [1500, 1, 2]]) { const r = P.addRun(api, x, dir, 38, n); if (r) r.loop = true; }
      }
      if (api.flag('opened') && !document.getElementById('nextMeeting')) {
        const b = document.createElement('button'); b.id = 'nextMeeting';
        b.innerHTML = 'GO TO THE SEVENTEENTH COUNCIL MEETING ▶<small style="display:block;font-weight:400;font-size:10px;letter-spacing:2px;color:#c8fff0;margin-top:3px">THE COUNCIL CHOOSES WHAT COMES NEXT</small>';
        b.style.cssText = 'position:fixed;left:50%;bottom:22px;transform:translateX(-50%);z-index:9;padding:10px 22px;font:600 14px "Segoe UI",Arial;letter-spacing:3px;color:#fff;background:rgba(20,80,90,.85);border:1px solid #9fffd8;border-radius:5px;cursor:pointer;box-shadow:0 0 18px rgba(159,255,216,.45)';
        b.onmouseenter = () => b.style.background = 'rgba(30,105,115,.95)'; b.onmouseleave = () => b.style.background = 'rgba(20,80,90,.85)';
        b.onclick = () => { location.href = 'councilmeeting/councilmeeting17.html'; };
        document.body.appendChild(b);
      }
      P.stepRuns(dt);
    },
    finish: {
      label: 'THE FIRST RUN',
      cam: [[820, 70, -250], [1050, -10, -420]],
      start(api) { this.stage = 0; this.t1 = 0; this.run = P.addRun(api, 600, 1, 0, 0); P.ring && P.ring(2); },
      update(api, dt, f) {
        this.t1 += dt; const R = this.run;
        if (R) R.sp = Math.min(70, R.sp + dt * 9);
        if (this.stage === 0) {
          P.hint('THE FIRST RUN · A SKY POD FULL OF THE PEOPLE OF KRYOS GLIDES OUT OF THE STATION');
          if (this.t1 > 12) { this.stage = 1; this.t1 = 0; }
        } else if (this.stage === 1) {
          P.hint('OVER THE CITY, UNDER THE GREEN BRIDGES AND AWAY ACROSS THE VALLEY · FREE FOR EVERYONE');
          if (this.t1 > 22 || (R && R.x > P.X.end2)) { this.stage = 2; this.t1 = 0; P.hint(''); P.cover(true, 'THE SKY RAIL IS RUNNING', 'KRYOS · SEASHORE · THE FARMLANDS · THE FACTORY DISTRICT · GREEN BRIDGES FOR THE ANIMALS · NEXT: THE SEVENTEENTH COUNCIL MEETING'); }
        } else {
          if (this.t1 > 4 && !this._h) { this._h = true; api.setFlag('skyRail', true); api.setFlag('opened', true); }
          if (this.t1 > 6.5) { P.cover(false); this._h = false; if (R) { R.pod.visible = false; R.sp = 0; R.x = 99999; } return true; }
        }
        return false;
      },
    },
  }));
})();
