/* ============================================================
   THE RETURN FLEET · BUILD 6 · LAUNCH & HOMECOMING
   Keep this file in projects/returnfleet next to returnfleet.html.
   Fuel tanks for the long voyage and the welcome arch over the
   arrivals pad. Ends with L: the new Ark lifts off for Earth,
   and comes home again full of families, who walk off the pad
   and into the welcome terminal.
   ============================================================ */
(function () {
  const FL = window.FLEET, DX = 220;   // the arrivals pad is 220 m east of the shipyard pad
  const arkPieces = api => api.placed.filter(p => (p.type === 'ARKHULL' || p.type === 'ARKENGINE') && p.piece);
  const placeArk = (api, dx, dy, dz) => { for (const p of arkPieces(api)) p.piece.position.set(p.x + dx, p.y + dy, p.z + dz); };
  // the families coming home: they walk from the arrivals pad up the gangway into the terminal
  FL.homecoming = (api) => {
    if (FL._home) return; const term = api.placed.find(p => p.type === 'TERMINAL' && p.piece); if (!term) return; FL._home = true;
    for (let i = 0; i < 24; i++) {
      const x0 = 600 - term.x + (i % 6 - 2.5) * 5, z0 = 206 + (i % 4) * 7 - term.z;
      FL.person(term.piece, FL.civ(9990 + i), 'walk', x0, 0, z0, 0, { path: { type: 'line', ax: x0, az: z0, bx: 600 - term.x + (i % 3 - 1) * 2, bz: -40, speed: 1.1 + (i % 4) * 0.12 } });
    }
  };
  FL.cover = (on, a, b) => {
    let el = document.getElementById('fleetCover');
    if (!el) { el = document.createElement('div'); el.id = 'fleetCover'; el.style.cssText = 'position:fixed;inset:0;z-index:8;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:0 40px;background:rgba(8,16,28,.92);color:#fff;font-family:"Segoe UI",Arial;opacity:0;transition:opacity 1.2s;pointer-events:none'; document.body.appendChild(el); }
    if (on) el.innerHTML = '<div style="font-size:26px;letter-spacing:7px;font-weight:600">' + a + '</div><div style="font-size:14px;letter-spacing:4px;margin-top:12px;color:#bfefff">' + (b || '') + '</div>';
    el.style.opacity = on ? 1 : 0;
  };
  FL.hint = (text) => {
    let el = document.getElementById('fleetHint');
    if (!el) { el = document.createElement('div'); el.id = 'fleetHint'; el.style.cssText = 'position:fixed;left:50%;bottom:90px;transform:translateX(-50%);z-index:8;padding:8px 18px;background:rgba(8,20,35,.85);border:1px solid #ffd060;border-radius:5px;color:#fff;font:600 13px "Segoe UI",Arial;letter-spacing:3px;text-align:center;pointer-events:none'; document.body.appendChild(el); }
    el.style.display = text ? 'block' : 'none'; if (text) el.textContent = text;
  };

  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(FL.build({
    id: 6, name: 'LAUNCH & HOMECOMING',
    brief: 'Fuel tanks for the long voyage and a welcome arch over the arrivals pad — then the new Ark sails for Earth and comes home full of families.',
    types: {
      FUEL: { code: 'FL', name: 'FUEL TANK', col: '#d9731b', w: 18, d: 18, h: 26 },
      ARCH: { code: 'HP', name: 'WELCOME ARCH', col: '#d9a21b', w: 70, d: 8, h: 40 },
    },
    order: ['FUEL', 'ARCH'],
    at: { FUEL: [[262, -190], [262, -110], [262, 110], [262, 190]], ARCH: [[600, 252]] },
    eye: [-260, 150, 300],
    stats(api, c) { return [['FUEL TANKS', c('FUEL') + ' / 4'], ['WELCOME ARCH', c('ARCH') ? 'STANDING' : 'NOT YET'], ['FIRST FAMILIES', api.flag('homecoming') ? 'HOME ON UNITY' : 'WAITING ON EARTH']]; },
    make(type, k, g, add, F, api) {
      const T = api.THREE;
      if (type === 'FUEL') {
        add(new T.CylinderGeometry(9, 9, 2, 24), F.stoneDark, 0, 1, 0);
        add(new T.CylinderGeometry(8, 8, 20, 24), F.white, 0, 12, 0);
        add(new T.SphereGeometry(8, 24, 10, 0, Math.PI * 2, 0, Math.PI / 2), F.white, 0, 22, 0);
        for (const y of [6, 12, 18]) add(new T.TorusGeometry(8.1, 0.3, 6, 32).rotateX(Math.PI / 2), F.yellow, 0, y, 0);
        add(new T.BoxGeometry(30, 1.4, 1.4), F.steel, 24, 4, 0);
      } else if (type === 'ARCH') {
        for (const s of [-1, 1]) { add(new T.BoxGeometry(5, 30, 5), F.white, s * 32, 15, 0); add(new T.BoxGeometry(7, 2, 7), F.gold, s * 32, 1, 0); }
        add(new T.TorusGeometry(32, 2.2, 10, 48, Math.PI), F.gold, 0, 30, 0);
        const sign = api.canvasTex(1024, 128, (c, w, h) => { c.fillStyle = '#12233a'; c.fillRect(0, 0, w, h); c.fillStyle = '#ffd060'; c.font = 'bold 80px Arial'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('WELCOME HOME', w / 2, h / 2 + 3); });
        for (const s of [-1, 1]) { const m = new T.Mesh(new T.PlaneGeometry(40, 5), new T.MeshBasicMaterial({ map: sign })); m.position.set(0, 36, s * 0.8); if (s < 0) m.rotation.y = Math.PI; g.add(m); }
      }
    },
    tick(api, dt, t) {
      // once the families are home, a button leads straight into the sixth council meeting
      if (api.flag('opened') && !document.getElementById('nextMeeting')) {
        const b = document.createElement('button'); b.id = 'nextMeeting';
        b.innerHTML = 'GO TO THE SIXTH COUNCIL MEETING ▶<small style="display:block;font-weight:400;font-size:10px;letter-spacing:2px;color:#ffe9b8;margin-top:3px">THE COUNCIL TALKS ABOUT THE NEWCOMERS AND CHOOSES WHAT COMES NEXT</small>';
        b.style.cssText = 'position:fixed;left:50%;bottom:22px;transform:translateX(-50%);z-index:9;padding:10px 22px;font:600 14px "Segoe UI",Arial;letter-spacing:3px;color:#fff;background:rgba(120,90,20,.85);border:1px solid #ffd060;border-radius:5px;cursor:pointer;box-shadow:0 0 18px rgba(255,208,96,.45)';
        b.onmouseenter = () => b.style.background = 'rgba(160,120,30,.95)'; b.onmouseleave = () => b.style.background = 'rgba(120,90,20,.85)';
        b.onclick = () => { location.href = 'councilmeeting/councilmeeting6.html'; };
        document.body.appendChild(b);
      }
      // after the homecoming the new Ark stays on the arrivals pad and the families keep walking in
      if (api.flag('homecoming') && !FL._docked) { FL._docked = true; placeArk(api, DX, 0, 0); FL.homecoming(api); }
    },
    finish: {
      label: 'LAUNCH THE NEW ARK TO EARTH',
      cam: [[120, 70, 520], [470, 60, 0]],
      start(api) { this.stage = 0; this.t1 = 0; },
      update(api, dt, f) {
        this.t1 += dt; const t1 = this.t1;
        if (this.stage === 0) {
          // lift off the cradles, then climb away and out over the forest
          const e = Math.min(1, t1 / 4), up = 70 * e * e, tau = Math.max(0, t1 - 4), s = 0.5 * 120 * tau * tau;
          placeArk(api, 0, up + s * 0.5, s);
          FL.hint('AXA-403 HOMEWARD LIFTS OFF FOR EARTH');
          if (t1 > 11) { this.stage = 1; this.t1 = 0; FL.hint(''); FL.cover(true, 'AXA-403 HOMEWARD SAILS FOR EARTH', 'AT THE EARTH WAREHOUSE THE FIRST FAMILIES COME ABOARD · THEN HOME TO UNITY'); }
        } else if (this.stage === 1) {
          if (t1 > 2) placeArk(api, DX, 600, 0);
          if (t1 > 5) { this.stage = 2; this.t1 = 0; FL.cover(false); }
        } else if (this.stage === 2) {
          // down onto the arrivals pad
          const e = Math.min(1, t1 / 7); placeArk(api, DX, 600 * Math.pow(1 - e, 2), 0);
          FL.hint('AXA-403 HOMEWARD IS BACK · SETTING DOWN ON THE ARRIVALS PAD');
          if (t1 >= 7) { this.stage = 3; this.t1 = 0; FL.homecoming(api); FL._docked = true; api.setFlag('homecoming', true); }
        } else {
          FL.hint('THE FIRST FAMILIES FROM EARTH COME HOME TO UNITY');
          if (t1 > 8) { FL.hint(''); api.setFlag('opened', true); return true; }
        }
        return false;
      },
    },
  }));
})();
