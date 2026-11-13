/* ============================================================
   THE ELDERS GARDEN · BUILD 5 · THE COTTAGES, THE HAILING MAST & OPENING DAY
   Keep this file in projects/eldersgarden next to 68-eldersgarden.html.
   Ends with L: the garden opens.
   ============================================================ */
(function () {
  const P = window.EGP;
  const rel = a => a.map(([x, z]) => [1550 + x, z]);
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 5, name: 'THE COTTAGES, THE HAILING MAST & OPENING DAY',
    brief: 'Four little cottages for the elders, a tall hailing mast that can call any ship in the sky, then opening day, when the garden opens.',
    types: {
      COTTAGE: { code: 'HM', name: 'ELDERS COTTAGE', col: '#e8d2b4', w: 22, d: 18, h: 12 },
      MAST: { code: 'HP', name: 'HAILING MAST', col: '#ff7a7a', w: 10, d: 10, h: 50 },
    },
    order: ['COTTAGE', 'MAST'],
    at: { COTTAGE: rel([[200, 60], [200, 110], [240, 60], [240, 110]]), MAST: rel([[-150, 0]]) },
    eye: [1550 + 180, P.SY + 110, 230],
    stats(api, c) { return [['COTTAGES', c('COTTAGE') + ' / 4'], ['HAILING MAST', c('MAST') ? 'READY' : 'NOT YET'], ['OPENING DAY', api.flag('eldersgarden') ? 'DONE' : 'NOT YET']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, H = P.eg(api);
      if (type === 'COTTAGE') {
        add(new T.BoxGeometry(22, 1, 18), H.stone, 0, 0.5, 0);
        add(new T.BoxGeometry(19, 7, 15), H.wall, 0, 4.5, 0);
        add(new T.BoxGeometry(24, 0.6, 20), H.roof2, 0, 8.4, 0).scale.set(1, 1, 1);
        const rf = add(new T.ConeGeometry(15, 6, 4), H.roof, 0, 11.4, 0); rf.rotation.y = Math.PI / 4;
        for (const x of [-5, 5]) add(new T.BoxGeometry(3, 3, 0.3), H.win, x, 5, 7.6, false);
        add(new T.BoxGeometry(3, 5, 0.4), H.timber2, 0, 3.5, 7.6, false);
        add(new T.BoxGeometry(2, 4, 2), H.stone, 6, 11.5, -3);
        add(new T.BoxGeometry(9, 0.4, 5), H.stone, 0, 1.2, 11, false);
        P.person(g, P.civ(68400 + k), k % 2 ? 'tablet' : 'idle', 0, 1.2, 12.5, 0);
      } else {
        add(new T.CylinderGeometry(6, 7, 2, 12), H.stone, 0, 1, 0);
        add(new T.CylinderGeometry(0.7, 1.5, 44, 8), H.steel, 0, 23, 0);
        for (const y of [12, 24, 36]) { add(new T.BoxGeometry(9, 0.3, 0.3), H.steel, 0, y, 0, false); add(new T.BoxGeometry(0.3, 0.3, 9), H.steel, 0, y, 0, false); }
        const dish = add(new T.SphereGeometry(4, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2.2), H.white, 0, 46, 0); dish.rotation.x = -2.2;
        add(new T.SphereGeometry(1.1, 10, 8), new T.MeshBasicMaterial({ color: new T.Color(2.4, 0.5, 0.4), toneMapped: false }), 0, 49, 0, false);
        P.sign(api, g, 'HAILING MAST · WE ASK BEFORE WE ACT', 16, 2, 0, 6, 7.2, 0, '#3a1a1a', '#ffe0d0');
      }
    },
    tick(api, dt, t) {
      if (api.flag('opened') && !document.getElementById('nextMeeting')) {
        const b = document.createElement('button'); b.id = 'nextMeeting';
        b.innerHTML = 'GO TO THE NEXT CHAPTER · THE HUNGRY SHIPS ▶<small style="display:block;font-weight:400;font-size:10px;letter-spacing:2px;color:#c8ecff;margin-top:3px">STRANGE SHIPS ARE COMING DOWN OVER KRYOS</small>';
        b.style.cssText = 'position:fixed;left:50%;bottom:22px;transform:translateX(-50%);z-index:9;padding:10px 22px;font:600 14px "Segoe UI",Arial;letter-spacing:3px;color:#fff;background:rgba(20,80,60,.85);border:1px solid #9fffd8;border-radius:5px;cursor:pointer';
        b.onmouseenter = () => b.style.background = 'rgba(30,110,80,.95)'; b.onmouseleave = () => b.style.background = 'rgba(20,80,60,.85)';
        b.onclick = () => { location.href = '69-hungryships.html'; };
        document.body.appendChild(b);
      }
    },
    finish: {
      label: 'OPENING DAY',
      cam: [[1000, 190, 620], [1550, 70, 0]],
      start(api) { this.stage = 0; this.t1 = 0; P.ring && P.ring(2); },
      update(api, dt, f) {
        this.t1 += dt;
        if (this.stage === 0) {
          P.hint('THE ELDERS GARDEN IS FINISHED · THE ELDERS WALK IN AND SIT BY THE POND');
          if (this.t1 > 9) { this.stage = 1; this.t1 = 0; P.hint(''); P.cover(true, 'THE ELDERS GARDEN IS OPEN', 'THE GARDEN · THE MOON GATE · THE BEDS · THE POND · THE STORY HOUSE · THE COTTAGES · NEXT: THE HUNGRY SHIPS'); }
        } else {
          if (this.t1 > 4 && !this._h) { this._h = true; api.setFlag('eldersgarden', true); api.setFlag('opened', true); }
          if (this.t1 > 6.5) { P.cover(false); this._h = false; return true; }
        }
        return false;
      },
    },
  }));
})();
