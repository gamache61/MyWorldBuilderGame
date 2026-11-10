/* ============================================================
   THE CRYSTAL MINES · BUILD 5 · THE FUELLING YARD & FIRST CRYSTAL DAY
   Keep this file in projects/crystalmines next to 50-crystalmines.html.
   The fuelling yard where the Arks, the freighters and the tankers
   fill up, with fuel trucks to carry it to the cities, Vesh and
   Havenreach. Ends with L: first crystal day — the first train of
   fuel runs down the Crystal Rail from the mountains and the
   people of Unity cheer.
   ============================================================ */
(function () {
  const P = window.YARD;
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 5, name: 'THE FUELLING YARD & FIRST CRYSTAL DAY',
    brief: 'The fuelling yard where the Arks and the freighters fill up, three fuel trucks — then first crystal day, with the first train of fuel down the Crystal Rail.',
    types: {
      FUELYARD: { code: 'FL', name: 'FUELLING YARD', col: '#d9731b', w: 130, d: 100, h: 40 },
      FUELTRUCK: { code: 'FB', name: 'FUEL TRUCK', col: '#e8c13a', w: 8, d: 22, h: 8 },
    },
    order: ['FUELYARD', 'FUELTRUCK'],
    at: { FUELYARD: [[1480, 190]], FUELTRUCK: [[1370, 100], [1370, 128], [1370, 156]] },
    eye: [1200, 170, 440],
    stats(api, c) { return [['FUELLING YARD', c('FUELYARD') ? 'OPEN' : 'NOT YET'], ['FUEL TRUCKS', c('FUELTRUCK') + ' / 3'], ['FIRST CRYSTAL DAY', api.flag('crystalmines') ? 'DONE' : 'NOT YET']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, S = P.hm(api), C = P.fun(api);
      const cry = P._cry = P._cry || [0x7ffcff, 0x9f7bff, 0x6dffb0].map(c => new T.MeshStandardMaterial({ color: c, emissive: c, emissiveIntensity: 1.4, roughness: 0.25, transparent: true, opacity: 0.92 }));
      if (type === 'FUELYARD') {
        add(new T.BoxGeometry(132, 1, 102), F.deck, 0, 0.5, 0);
        // a ring of big fuel tanks, three landing pads with fuel arms, and a control tower
        for (let i = 0; i < 4; i++) { const x = -48 + i * 24; add(new T.CylinderGeometry(9, 9, 24, 24), F.white, x, 13, -36); add(new T.CylinderGeometry(9.4, 9.4, 1.4, 24), C.yellow, x, 25.4, -36); add(new T.CylinderGeometry(7, 7, 14, 24), cry[i % 3], x, 13, -36).castShadow = false; add(new T.BoxGeometry(2, 2, 22), F.steel, x, 8, -20); }
        for (const x of [-40, 0, 40]) { const ring = add(new T.TorusGeometry(15, 0.5, 8, 40), cry[0], x, 1.2, 14); ring.rotation.x = Math.PI / 2; ring.castShadow = false; add(new T.CylinderGeometry(0.8, 0.8, 18, 8), F.steel, x + 17, 9, 14); add(new T.BoxGeometry(14, 1, 1), F.steel, x + 10, 17.5, 14); add(new T.SphereGeometry(0.6, 8, 6), F.lamp, x + 3, 17, 14); }
        add(new T.BoxGeometry(12, 30, 12), F.white, 58, 16, 30); add(new T.BoxGeometry(14, 6, 14), S.glass, 58, 33, 30); add(new T.BoxGeometry(15, 1, 15), S.slate, 58, 36.4, 30);
        P.sign(api, g, 'FUELLING YARD · ARKS & FREIGHTERS', 34, 3.6, 0, 33, -40, 0, '#14324a', '#ffd9a0', true);
        for (let i = 0; i < 4; i++) P.person(g, P.civ(50600 + i), i % 2 ? 'tablet' : 'idle', -50 + i * 30, 1, 40, Math.PI);
      } else {
        // a tanker truck: a cab, a long silver tank with a glowing crystal band
        add(new T.BoxGeometry(8, 0.8, 22), F.dark, 0, 1.4, 0);
        add(new T.BoxGeometry(7.6, 4.4, 5), C.yellow, 0, 4, 8.4); add(new T.BoxGeometry(7.7, 1.8, 5.1), S.glass, 0, 5.4, 8.5);
        add(new T.CylinderGeometry(3.3, 3.3, 14, 18).rotateX(Math.PI / 2), F.white, 0, 5, -3); add(new T.CylinderGeometry(3.4, 3.4, 1.6, 18).rotateX(Math.PI / 2), cry[k % 3], 0, 5, -3).castShadow = false;
        for (const [x, z] of [[-3.4, 8], [3.4, 8], [-3.4, -4], [3.4, -4], [-3.4, -8], [3.4, -8]]) add(new T.CylinderGeometry(1.4, 1.4, 1, 12).rotateZ(Math.PI / 2), F.dark, x, 1.4, z);
        P.person(g, P.civ(50700 + k), 'gesture', 6, 0.2, 10, -Math.PI / 2);
      }
    },
    tick(api, dt, t) {
      if (api.flag('opened') && !document.getElementById('nextMeeting')) {
        const b = document.createElement('button'); b.id = 'nextMeeting';
        b.innerHTML = 'GO TO THE TWENTY-SECOND COUNCIL MEETING ▶<small style="display:block;font-weight:400;font-size:10px;letter-spacing:2px;color:#c8ecff;margin-top:3px">THE COUNCIL ASKS THE KEEPER ABOUT WEAPONS</small>';
        b.style.cssText = 'position:fixed;left:50%;bottom:22px;transform:translateX(-50%);z-index:9;padding:10px 22px;font:600 14px "Segoe UI",Arial;letter-spacing:3px;color:#fff;background:rgba(20,60,100,.85);border:1px solid #80d8ff;border-radius:5px;cursor:pointer';
        b.onmouseenter = () => b.style.background = 'rgba(30,80,130,.95)'; b.onmouseleave = () => b.style.background = 'rgba(20,60,100,.85)';
        b.onclick = () => { location.href = 'councilmeeting/councilmeeting22.html'; };
        document.body.appendChild(b);
      }
    },
    finish: {
      label: 'FIRST CRYSTAL DAY',
      cam: [[1500, 120, 330], [1200, -10, 40]],
      start(api) {
        this.stage = 0; this.t1 = 0; P.ring && P.ring(2);
        const T = api.THREE, par = (api.placed.find(p => p.piece && p.piece.parent) || {}).piece; if (!par) return;
        const grp = new T.Group(); par.parent.add(grp); this.grp = grp;
        const add = (geo, mat, x = 0, y = 0, z = 0, shadow = true, parent = grp) => { const m = new T.Mesh(geo, mat); m.position.set(x, y, z); m.castShadow = shadow; parent.add(m); return m; };
        const F = P.mats(api), cry = P._cry || [0x7ffcff, 0x9f7bff, 0x6dffb0].map(c => new T.MeshStandardMaterial({ color: c, emissive: c, emissiveIntensity: 1.4, roughness: 0.25 }));
        this.train = new T.Group(); grp.add(this.train);
        for (let i = 0; i < 4; i++) { const x = -i * 26; add(new T.BoxGeometry(24, 5, 6.4), F.white, x, 4.5, 0, true, this.train); add(new T.BoxGeometry(24.2, 1.2, 6.6), cry[i % 3], x, 3, 0, false, this.train); add(new T.BoxGeometry(20, 2.6, 5), cry[(i + 1) % 3], x, 7.9, 0, false, this.train); }
        this.y0 = api.DECK_TOP + 28 + 1; this.sx = 1730; this.ex = 860; this.z = 80;
        this.flare = add(new T.SphereGeometry(10, 16, 10), new T.MeshBasicMaterial({ color: new T.Color(0.6, 2.0, 1.8), toneMapped: false, transparent: true, opacity: 0 }), 1480, api.DECK_TOP + 20, 190, false);
      },
      update(api, dt, f) {
        this.t1 += dt;
        if (this.train) {
          // the first train of fuel runs from the mountains down the Crystal Rail
          const e = Math.min(1, f / 20), s = e * e * (3 - 2 * e), x = this.sx + (this.ex - this.sx) * s;
          this.train.position.set(x, this.y0 + Math.sin(f * 2) * 0.05, this.z);
        }
        if (this.flare) { this.flare.material.opacity = this.stage >= 1 ? 0.35 + Math.sin(f * 3) * 0.2 : 0; this.flare.scale.setScalar(1 + Math.sin(f * 2) * 0.1); }
        if (this.stage === 0) {
          P.hint('FIRST CRYSTAL DAY · THE FIRST TRAIN OF FUEL RUNS DOWN THE CRYSTAL RAIL');
          if (this.t1 > 21) { this.stage = 1; this.t1 = 0; P.ring && P.ring(3); }
        } else if (this.stage === 1) {
          P.hint('THE FUELLING YARD FILLS · THE HEARTFORGE, THE CORES AND THE ARKS NOW RUN ON UNITY’S OWN CRYSTAL');
          if (this.t1 > 11) { this.stage = 2; this.t1 = 0; P.hint(''); P.cover(true, 'THE CRYSTAL MINES ARE OPEN', 'THE MOUNTAINS · THE MINE ENTRANCES · THE WINDING TOWERS · THE REFINERY · THE CRYSTAL RAIL · THE FUELLING YARD · NEXT: THE TWENTY-SECOND COUNCIL MEETING'); }
        } else {
          if (this.t1 > 4 && !this._h) { this._h = true; api.setFlag('crystalmines', true); api.setFlag('opened', true); }
          if (this.t1 > 6.5) { P.cover(false); this._h = false; return true; }
        }
        return false;
      },
    },
  }));
})();
