/* ============================================================
   THE SUN FIELDS · BUILD 5 · THE LAST ARRAYS, THE BEACON TOWER & SWITCH-ON DAY
   Keep this file in projects/sunfields next to 75-sunfields.html.
   Three more arrays, a tall beacon tower, a few trucks, and the day the sun fields are switched on.
   ============================================================ */
(function () {
  const P = window.PWP;
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 5, name: 'THE LAST ARRAYS, THE BEACON TOWER & SWITCH-ON DAY',
    brief: 'Three more arrays in a third row, a tall beacon tower that shows the sun fields are working, a pair of service trucks, then switch-on day, when the whole field turns to the sun and the power flows.',
    types: {
      ARRAY: { code: 'SF', name: 'SOLAR ARRAY',   col: '#14306a', w: 100, d: 60, h: 8 },
      TOWER: { code: 'HP', name: 'BEACON TOWER',  col: '#f2c41a', w: 8,   d: 8,  h: 60 },
      TRUCK: { code: 'HM', name: 'SERVICE TRUCK', col: '#2f6fb0', w: 10,  d: 4,  h: 5 },
    },
    order: ['ARRAY', 'TOWER', 'TRUCK'],
    at: {
      ARRAY: [[1650, -610], [1850, -610], [2050, -610]].map(([x, z]) => [1550 + x, z]),
      TOWER: [[1550 + 2130, -850]],
      TRUCK: [[1550 + 1600, -870], [1550 + 1980, -870]],
    },
    eye: [1550 + 1850, (window.__SUNF.Y || -85) + 240, -1010],
    stats(api, c) { return [['SOLAR ARRAYS', (6 + c('ARRAY')) + ' / 9'], ['BEACON TOWER', c('TOWER') ? 'LIT' : 'NOT YET'], ['SERVICE TRUCKS', c('TRUCK') + ' / 2'], ['THE SUN FIELDS', api.flag('opened') ? 'SWITCHED ON' : 'NOT YET']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, H = P.pw(api);
      if (type === 'ARRAY') P.panels(api, add, H, k);
      else if (type === 'TOWER') {
        add(new T.CylinderGeometry(2.6, 3.4, 4, 10), H.conc2, 0, 2, 0);
        add(new T.CylinderGeometry(0.8, 1.4, 52, 8), H.steel, 0, 28, 0);
        add(new T.CylinderGeometry(3.4, 3.4, 1, 14), H.yellow, 0, 40, 0, false);
        add(new T.SphereGeometry(2.4, 14, 10), H.lamp, 0, 56, 0, false);
        for (let y = 10; y < 52; y += 10) add(new T.BoxGeometry(5, 0.4, 0.4), H.hazard, 0, y, 0, false);
      } else if (type === 'TRUCK') {
        const t = P.truck(api, add, H, 0, 0, Math.PI / 2, k % 2 ? H.blue : H.orange); g.add(t);
        add(new T.BoxGeometry(2.4, 2.4, 6), H.steel, 0, 3.2, -2.5, false);
      }
    },
    tick(api, dt, t) {
      if (api.flag('opened') && !document.getElementById('nextMeeting')) {
        const b = document.createElement('button'); b.id = 'nextMeeting';
        b.innerHTML = 'GO TO THE NEXT COUNCIL MEETING ▶<small style="display:block;font-weight:400;font-size:10px;letter-spacing:2px;color:#ffe8b0;margin-top:3px">THE SUN FIELDS ARE ON</small>';
        b.style.cssText = 'position:fixed;left:50%;bottom:22px;transform:translateX(-50%);z-index:9;padding:10px 22px;font:600 14px "Segoe UI",Arial;letter-spacing:3px;color:#fff;background:rgba(110,80,10,.85);border:1px solid #ffe08a;border-radius:6px;cursor:pointer;text-align:center';
        b.onmouseenter = () => b.style.background = 'rgba(150,110,20,.95)'; b.onmouseleave = () => b.style.background = 'rgba(110,80,10,.85)';
        b.onclick = () => { location.href = 'councilmeeting/councilmeeting42.html'; };
        document.body.appendChild(b);
      }
    },
    finish: {
      label: 'SWITCH-ON DAY',
      cam: [[1550 + 1850, (window.__SUNF.Y || -85) + 170, -1060], [1550 + 1850, (window.__SUNF.Y || -85) + 10, -730]],
      start(api) {
        this.stage = 0; this.t1 = 0; this._h = false; P.ring && P.ring(2);
        const T = api.THREE, H = P.pw(api), host = api.placed.find(p => p.piece && p.piece.parent), o = P.OFF || [0, 0];
        const beam = new T.Mesh(new T.CylinderGeometry(3, 3, 300, 14, 1, true), new T.MeshBasicMaterial({ color: new T.Color(2.2, 1.8, 0.7), transparent: true, opacity: 0, depthWrite: false, toneMapped: false, side: T.DoubleSide }));
        beam.position.set(1550 + 2130 + o[0], (window.__SUNF.Y || -85) + 150, -850 + o[1]); this.beam = beam; host && host.piece.parent.add(beam);
      },
      update(api, dt, f) {
        this.t1 += dt; const t = this.t1;
        if (this.beam) this.beam.material.opacity = Math.max(0, Math.min(0.5, (t - 3) / 4)) * (t > 14 ? Math.max(0, 1 - (t - 14) / 3) : 1);
        if (this.stage === 0) {
          P.hint(t < 4 ? 'THE LAST WIRE IS CONNECTED' : t < 9 ? 'THE BEACON LIGHTS · THE SUN\'S POWER FLOWS INTO THE BATTERY HOUSES' : 'THE SUN FIELDS ARE SWITCHED ON · THE FUEL CRYSTAL CAN REST');
          if (t > 17) { this.stage = 1; this.t1 = 0; P.hint(''); if (this.beam && this.beam.parent) this.beam.parent.remove(this.beam); this.beam = null; P.cover(true, 'THE SUN FIELDS ARE ON', 'NINE ARRAYS · THE POWER HALL · TWO BATTERY HOUSES · THE BEACON TOWER'); }
        } else {
          if (this.t1 > 4 && !this._h) { this._h = true; api.setFlag('sunfields', true); api.setFlag('opened', true); }
          if (this.t1 > 6.5) { P.cover(false); this._h = false; return true; }
        }
        return false;
      },
    },
  }));
})();
