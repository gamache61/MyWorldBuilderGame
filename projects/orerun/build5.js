/* ============================================================
   THE ORE RUN · BUILD 5 · THE HANGAR & THE FIRST RUN
   Keep this file in projects/orerun next to orerun.html.
   A maintenance hangar where the freighters are serviced and a fuel
   depot beside the pads. Ends with L: the first run — the four
   freighters lift off one after another, fly to Vesh and come home
   loaded, and from then on the Ore Run flies day and night.
   ============================================================ */
(function () {
  const P = window.ORE;
  P.hint = (text) => {
    let el = document.getElementById('playHint');
    if (!el) { el = document.createElement('div'); el.id = 'playHint'; el.style.cssText = 'position:fixed;left:50%;bottom:90px;transform:translateX(-50%);z-index:8;padding:8px 18px;background:rgba(8,20,35,.85);border:1px solid #f0b070;border-radius:5px;color:#fff;font:600 13px "Segoe UI",Arial;letter-spacing:3px;text-align:center;pointer-events:none'; document.body.appendChild(el); }
    el.style.display = text ? 'block' : 'none'; if (text) el.textContent = text;
  };
  P.cover = (on, a, b) => {
    let el = document.getElementById('playCover');
    if (!el) { el = document.createElement('div'); el.id = 'playCover'; el.style.cssText = 'position:fixed;inset:0;z-index:8;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:0 40px;background:rgba(8,16,28,.92);color:#fff;font-family:"Segoe UI",Arial;opacity:0;transition:opacity 1.2s;pointer-events:none'; document.body.appendChild(el); }
    if (on) el.innerHTML = '<div style="font-size:26px;letter-spacing:7px;font-weight:600">' + a + '</div><div style="font-size:14px;letter-spacing:4px;margin-top:12px;color:#ffe0c0">' + (b || '') + '</div>';
    el.style.opacity = on ? 1 : 0;
  };
  // the run: each freighter lifts off, climbs, flies away towards Vesh, is gone a while, then comes home and lands
  P.runT = -1;
  P.fly = function (dt) {
    if (P.runT < 0 || !P.ships) return; P.runT += dt;
    const L = 70;
    P.ships.forEach((s, k) => {
      if (!s) return; const t = (P.runT - k * 6) / L; let y = 0, z = 0, tilt = 0, vis = true;
      if (t > 0) { const f = t % 1;
        if (f < 0.12) y = (f / 0.12) * 120;
        else if (f < 0.4) { y = 120 + (f - 0.12) / 0.28 * 700; z = ((f - 0.12) / 0.28) ** 2 * 2500; tilt = -0.25; }
        else if (f < 0.7) vis = false;
        else if (f < 0.9) { const u = 1 - (f - 0.7) / 0.2; y = 120 + u * 700; z = u * u * 2500; tilt = 0.15; }
        else y = (1 - (f - 0.9) / 0.1) * 120; }
      s.g.visible = vis; s.g.position.set(s.base.x, s.base.y + y, s.base.z + (s.g.rotation.y ? -z : z)); s.g.rotation.x = tilt * (s.g.rotation.y ? -1 : 1);
    });
  };
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 5, name: 'THE HANGAR & THE FIRST RUN',
    brief: 'A maintenance hangar where the freighters are serviced and a fuel depot beside the pads — then the first run to Vesh.',
    types: {
      HANGAR:    { code: 'HP', name: 'MAINTENANCE HANGAR', col: '#b03a2e', w: 100, d: 70, h: 30 },
      FUELDEPOT: { code: 'FB', name: 'FUEL DEPOT', col: '#d9a21b', w: 60, d: 60, h: 16 },
    },
    order: ['HANGAR', 'FUELDEPOT'],
    at: { HANGAR: [[860, -200]], FUELDEPOT: [[860, 200]] },
    eye: [-220, 220, 300],
    stats(api, c) { return [['HANGAR', c('HANGAR') ? 'OPEN' : 'NOT YET'], ['FUEL DEPOT', c('FUELDEPOT') ? 'FULL' : 'NOT YET'], ['THE ORE RUN', api.flag('oreRun') ? 'FLYING' : 'NOT YET']]; },
    make(type, k, g, add, F, api) {
      const T = api.THREE, S = P.hm(api);
      if (type === 'HANGAR') {
        add(new T.BoxGeometry(100, 1, 70), F.stoneDark, 0, 0.5, 0);
        add(new T.CylinderGeometry(30, 30, 90, 24, 1, true, Math.PI / 2, Math.PI).rotateX(Math.PI / 2).rotateY(Math.PI / 2), S.slate, 0, 1, 0);
        add(new T.CircleGeometry(29.6, 24, 0, Math.PI).rotateY(Math.PI / 2), F.white, -45, 1, 0);
        for (let i = 0; i <= 6; i++) add(new T.TorusGeometry(30, 0.5, 6, 24, Math.PI).rotateY(Math.PI / 2), S.yellow, -45 + i * 15, 1, 0);
        add(new T.CircleGeometry(27, 24, 0, Math.PI).rotateY(Math.PI / 2), S.dim, 45.2, 1, 0, false);
        const fr = new T.Group(); fr.position.set(10, 1, 0); fr.rotation.y = Math.PI / 2; g.add(fr); P.freighter(api, add, fr, 2);
        for (const s of [-1, 1]) add(new T.BoxGeometry(4, 18, 4), S.yellow, 10 + s * 14, 10, -16); add(new T.BoxGeometry(32, 2, 4), S.yellow, 10, 19, -16);
        P.sign(api, g, 'MAINTENANCE HANGAR', 26, 3, 45.6, 28, 0, Math.PI / 2, '#2a2f38', '#ffd060', false);
        for (let i = 0; i < 4; i++) P.figure(api, add, 0 + i * 6, 1, 14, 1, i);
        P.person(g, P.civ(19300), 'tablet', 30, 1, 10, Math.PI / 2);
      } else if (type === 'FUELDEPOT') {
        add(new T.BoxGeometry(60, 1, 60), F.stoneDark, 0, 0.5, 0);
        for (const [x, z] of [[-14, -14], [14, -14], [-14, 14], [14, 14]]) { add(new T.SphereGeometry(10, 20, 14), F.white, x, 11, z); add(new T.CylinderGeometry(6, 7, 3, 16), F.steel, x, 2.5, z); add(new T.TorusGeometry(10.1, 0.3, 4, 32).rotateX(Math.PI / 2), S.yellow, x, 11, z, false); }
        add(new T.BoxGeometry(40, 1.2, 1.2), F.steel, 0, 3, 0); add(new T.BoxGeometry(1.2, 1.2, 40), F.steel, 0, 3, 0);
        add(new T.BoxGeometry(6, 5, 4), F.dark, 0, 3.5, 26); P.sign(api, g, 'FUEL · CLEAN HYDROGEN', 18, 2.2, 0, 8, 28.4, 0, '#2a2f38', '#ffd060', false);
      }
    },
    tick(api, dt) {
      // once the Ore Run is flying, a button leads straight into the fifteenth council meeting
      if (api.flag('opened') && !document.getElementById('nextMeeting')) {
        const b = document.createElement('button'); b.id = 'nextMeeting';
        b.innerHTML = 'GO TO THE FIFTEENTH COUNCIL MEETING ▶<small style="display:block;font-weight:400;font-size:10px;letter-spacing:2px;color:#ffe0c0;margin-top:3px">THE COUNCIL CHOOSES WHAT COMES NEXT</small>';
        b.style.cssText = 'position:fixed;left:50%;bottom:22px;transform:translateX(-50%);z-index:9;padding:10px 22px;font:600 14px "Segoe UI",Arial;letter-spacing:3px;color:#fff;background:rgba(130,80,30,.85);border:1px solid #f0b070;border-radius:5px;cursor:pointer;box-shadow:0 0 18px rgba(240,176,112,.45)';
        b.onmouseenter = () => b.style.background = 'rgba(165,105,40,.95)'; b.onmouseleave = () => b.style.background = 'rgba(130,80,30,.85)';
        b.onclick = () => { location.href = 'councilmeeting/councilmeeting15.html'; };
        document.body.appendChild(b);
      }
      // the freighters keep flying the run once it has started
      if (api.flag('oreRun') && P.runT < 0) P.runT = 0;
      P.fly(dt);
    },
    finish: {
      label: 'START THE ORE RUN',
      cam: [[160, 120, 420], [430, 30, 0]],
      start(api) { this.stage = 0; this.t1 = 0; P.runT = 0; },
      update(api, dt, f) {
        this.t1 += dt;
        if (this.stage === 0) {
          P.hint('THE FIRST RUN · THE FOUR FREIGHTERS LIFT OFF ONE AFTER ANOTHER FOR VESH');
          if (this.t1 > 16) { this.stage = 1; this.t1 = 0; }
        } else if (this.stage === 1) {
          P.hint('CREWED BY THE PEOPLE OF VESH · THE AEGIS ARK IS FREE TO BUILD AGAIN');
          if (this.t1 > 10) { this.stage = 2; this.t1 = 0; P.hint(''); P.cover(true, 'THE ORE RUN IS FLYING', 'FOUR FREIGHTERS · TWO ORE HOPPERS · A CONVEYOR TO THE DEPOT · THE CREW HALL · THE HANGAR · NEXT: THE FIFTEENTH COUNCIL MEETING'); }
        } else {
          if (this.t1 > 4 && !this._h) { this._h = true; api.setFlag('oreRun', true); api.setFlag('opened', true); }
          if (this.t1 > 6.5) { P.cover(false); this._h = false; return true; }
        }
        return false;
      },
    },
  }));
})();
