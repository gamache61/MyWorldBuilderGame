/* ============================================================
   THE WATCH NETWORK · BUILD 5 · THE SKY TOUR PODS & FIRST WATCH DAY
   Keep this file in projects/watchnetwork next to 76-watchnetwork.html.
   Two sky tour pods, a tour station, and the day the whole network goes live and the council sees every place of Unity at once.
   ============================================================ */
(function () {
  const P = window.PWP;
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 5, name: 'THE SKY TOUR PODS & FIRST WATCH DAY',
    brief: 'A tour station with two sky pods that take visitors to see the far places, then first watch day, when the whole network goes live and the council can see Havenreach, the ore mine, Seashore and the Farmlands at once.',
    types: {
      STATION: { code: 'FB', name: 'TOUR STATION', col: '#d7dade', w: 40, d: 24, h: 14 },
      POD:     { code: 'HM', name: 'SKY POD',      col: '#80f0ff', w: 12, d: 6,  h: 8 },
    },
    order: ['STATION', 'POD'],
    at: { STATION: [[1550 + 1480, -80]], POD: [[1550 + 1450, -105], [1550 + 1510, -105]] },
    eye: [1550 + 1400, (window.__WATCH.Y || -85) + 180, -420],
    stats(api, c) { return [['TOUR STATION', c('STATION') ? 'OPEN' : 'NOT YET'], ['SKY PODS', c('POD') + ' / 2'], ['THE WATCH NETWORK', api.flag('opened') ? 'LIVE' : 'NOT YET']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, H = P.pw(api);
      if (type === 'STATION') {
        add(new T.BoxGeometry(40, 1, 24), H.conc2, 0, 0.5, 0);
        add(new T.BoxGeometry(36, 9, 20), H.wall, 0, 5.5, 0);
        add(new T.BoxGeometry(38, 1, 22), H.roof, 0, 10.5, 0);
        for (let i = 0; i < 4; i++) add(new T.BoxGeometry(6, 4, 0.4), H.win, -13 + i * 9, 6, 10.2, false);
        add(new T.BoxGeometry(40, 0.6, 3), H.hazard, 0, 14, -9, false);
        P.sign(api, g, 'SKY TOURS', 20, 2.6, 0, 7.8, 10.4, 0, '#14242e', '#80f0ff');
        P.person(g, P.civ(76030), 'idle', 8, 0.5, 15, 0); P.person(g, P.civ(76031), 'idle', 12, 0.5, 15, 0);
      } else if (type === 'POD') {
        add(new T.CylinderGeometry(3.4, 3.4, 11, 14).rotateZ(Math.PI / 2), H.white, 0, 5, 0);
        add(new T.SphereGeometry(3.4, 14, 8), H.white, 5.5, 5, 0, false); add(new T.SphereGeometry(3.4, 14, 8), H.white, -5.5, 5, 0, false);
        add(new T.BoxGeometry(8, 1.8, 6.8), H.glass, 0, 6, 0, false);
        add(new T.BoxGeometry(11, 0.5, 0.5), H.cool, 0, 2.2, 3.4, false);
        add(new T.BoxGeometry(1, 3, 1), H.steel2, 0, 9.5, 0, false);
      }
    },
    tick(api, dt, t) {
      if (api.flag('opened') && !document.getElementById('nextMeeting')) {
        const b = document.createElement('button'); b.id = 'nextMeeting';
        b.innerHTML = 'GO TO THE NEXT COUNCIL MEETING ▶<small style="display:block;font-weight:400;font-size:10px;letter-spacing:2px;color:#c8f4ff;margin-top:3px">THE COUNCIL CAN SEE EVERY PLACE</small>';
        b.style.cssText = 'position:fixed;left:50%;bottom:22px;transform:translateX(-50%);z-index:9;padding:10px 22px;font:600 14px "Segoe UI",Arial;letter-spacing:3px;color:#fff;background:rgba(10,70,90,.85);border:1px solid #80f0ff;border-radius:6px;cursor:pointer;text-align:center';
        b.onmouseenter = () => b.style.background = 'rgba(20,100,125,.95)'; b.onmouseleave = () => b.style.background = 'rgba(10,70,90,.85)';
        b.onclick = () => { location.href = 'councilmeeting/councilmeeting43.html'; };
        document.body.appendChild(b);
      }
    },
    finish: {
      label: 'FIRST WATCH DAY',
      cam: [[1550 + 1400, (window.__WATCH.Y || -85) + 150, -400], [1550 + 1400, (window.__WATCH.Y || -85) + 20, -150]],
      start(api) {
        this.stage = 0; this.t1 = 0; this._h = false; P.ring && P.ring(2);
        const T = api.THREE, host = api.placed.find(p => p.piece && p.piece.parent), o = P.OFF || [0, 0], Y0 = (window.__WATCH.Y || -85);
        this.beams = []; const dirs = [[0, -1], [1, -0.4], [0.4, 1], [-1, 0.5]], mk = (px, pz, d) => {
          const m = new T.Mesh(new T.CylinderGeometry(0.6, 0.6, 400, 6, 1, true), new T.MeshBasicMaterial({ color: new T.Color(0.5, 1.9, 2.2), transparent: true, opacity: 0, depthWrite: false, toneMapped: false, side: T.DoubleSide }));
          m.position.set(1550 + px + o[0], Y0 + 70 + 100, pz + o[1]); m.rotation.set(0.9 * d[1], 0, -0.9 * d[0]); m.position.x += d[0] * 90; m.position.z += d[1] * 90; this.beams.push(m); host && host.piece.parent.add(m); };
        [[1255, -265], [1545, -265], [1545, -35], [1255, -35]].forEach(([x, z], i) => mk(x, z, dirs[i]));
      },
      update(api, dt, f) {
        this.t1 += dt; const t = this.t1;
        (this.beams || []).forEach((m, i) => { m.material.opacity = Math.max(0, Math.min(0.55, (t - 2 - i * 2.5) / 2)) * (t > 15 ? Math.max(0, 1 - (t - 15) / 3) : 1); });
        if (this.stage === 0) {
          P.hint(t < 3 ? 'THE LAST CAMERA IS CONNECTED' : t < 5.5 ? 'HAVENREACH COMES ON THE SCREEN' : t < 8 ? 'THE ORE MINE ON VESH · THE MINERS WAVE' : t < 10.5 ? 'SEASHORE · THE FERRY IS IN' : t < 13 ? 'THE FARMLANDS · THE FIELDS ARE GREEN' : 'THE WHOLE NETWORK IS LIVE · THE COUNCIL CAN SEE EVERY PLACE');
          if (t > 18) { this.stage = 1; this.t1 = 0; P.hint(''); (this.beams || []).forEach(m => m.parent && m.parent.remove(m)); this.beams = null; P.cover(true, 'THE WATCH NETWORK IS LIVE', 'THE WATCH HALL · FOUR LIVE SCREENS · FOUR RELAY MASTS · THE SKY TOURS'); }
        } else {
          if (this.t1 > 4 && !this._h) { this._h = true; api.setFlag('watchnetwork', true); api.setFlag('opened', true); }
          if (this.t1 > 6.5) { P.cover(false); this._h = false; return true; }
        }
        return false;
      },
    },
  }));
})();
