/* ============================================================
   THE HOMEWARD FLEET · BUILD 5 · ENGINES & THE GREAT VOYAGE
   Keep this file in projects/homewardfleet next to homewardfleet.html.
   Five engines for each of the three new Arks. Ends with L: the
   cranes roll clear, the whole fleet lifts off together for Earth,
   and comes home full of families, who walk off the berths and
   into the fleet terminal.
   ============================================================ */
(function () {
  const FL = window.FLEET, A = FL.ARK, ENG = [[0, -218], [-42, -216], [42, -216], [-75, -212], [75, -212]];
  const at = []; for (const x of A.XS) for (const [dx, z] of ENG) at.push([x + dx, z]);
  const shipOf = p => p.type === 'ARKHULL' ? (A.XS.indexOf(p.x)) : p.type === 'ARKENGINE' ? A.XS.findIndex(x => Math.abs(p.x - x) <= 80) : -1;
  const arkParts = (api, s) => api.placed.filter(p => (p.type === 'ARKHULL' || p.type === 'ARKENGINE') && p.piece && shipOf(p) === s);
  const placeArk = (api, s, dy, dz) => { for (const p of arkParts(api, s)) p.piece.position.set(p.x, p.y + dy, p.z + dz); };
  // the cranes roll to the ends of the berths, over the towers, so the Arks can lift straight up
  const cranes = api => api.placed.filter(p => p.type === 'YARDCRANE' && p.piece);
  const rollCranes = (api, f) => { for (const p of cranes(api)) p.piece.position.z = p.z + (Math.sign(p.z) * 250 - p.z) * f; };
  FL.hint = (text) => {
    let el = document.getElementById('fleetHint');
    if (!el) { el = document.createElement('div'); el.id = 'fleetHint'; el.style.cssText = 'position:fixed;left:50%;bottom:90px;transform:translateX(-50%);z-index:8;padding:8px 18px;background:rgba(8,20,35,.85);border:1px solid #ffd060;border-radius:5px;color:#fff;font:600 13px "Segoe UI",Arial;letter-spacing:3px;text-align:center;pointer-events:none'; document.body.appendChild(el); }
    el.style.display = text ? 'block' : 'none'; if (text) el.textContent = text;
  };
  FL.cover = (on, a, b) => {
    let el = document.getElementById('fleetCover');
    if (!el) { el = document.createElement('div'); el.id = 'fleetCover'; el.style.cssText = 'position:fixed;inset:0;z-index:8;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:0 40px;background:rgba(8,16,28,.92);color:#fff;font-family:"Segoe UI",Arial;opacity:0;transition:opacity 1.2s;pointer-events:none'; document.body.appendChild(el); }
    if (on) el.innerHTML = '<div style="font-size:26px;letter-spacing:7px;font-weight:600">' + a + '</div><div style="font-size:14px;letter-spacing:4px;margin-top:12px;color:#bfefff">' + (b || '') + '</div>';
    el.style.opacity = on ? 1 : 0;
  };
  // the families: from each Ark, down onto the berth and up to the terminal door opposite it
  FL.families = (api) => {
    if (FL._fam) return; const term = api.placed.find(p => p.type === 'FTERMINAL' && p.piece); if (!term) return; FL._fam = true;
    A.XS.forEach((x, s) => {
      for (let i = 0; i < 12; i++) {
        const x0 = x - term.x + (i % 4 - 1.5) * 6, z0 = 215 + (i % 3) * 6 - term.z;
        FL.person(term.piece, FL.civ(12300 + s * 20 + i), 'walk', x0, 0, z0, 0, { path: { type: 'line', ax: x0, az: z0, bx: x - term.x + (i % 3 - 1) * 3, bz: -26, speed: 1.1 + (i % 4) * 0.12 } });
      }
    });
  };

  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(FL.build({
    id: 5, name: 'ENGINES & THE GREAT VOYAGE',
    brief: 'Five engines for each of the three new Arks — then the whole Homeward Fleet lifts off together for Earth and comes home full of families.',
    types: { ARKENGINE: { code: 'HC', name: 'ARK ENGINE', col: '#d9731b', w: 20, d: 34, h: 20, fx: 4 } },
    order: ['ARKENGINE'],
    at: { ARKENGINE: at },
    eye: [-300, 200, 380],
    stats(api, c) { return [['ENGINES', c('ARKENGINE') + ' / 15'], ['THE FLEET', c('ARKENGINE') === 15 ? '3 ARKS · READY' : 'BUILDING'], ['FAMILIES BROUGHT HOME', api.flag('fleetHome') ? '9,000' : '—']]; },
    make(type, k, g, add, F, api) {
      const T = api.THREE, r = k % 5 ? 8 : 11;
      add(new T.CylinderGeometry(r, r * 1.1, 32, 20).rotateX(Math.PI / 2), F.armor, 0, A.BASE + 10 + 14, 0);
      add(new T.TorusGeometry(r * 1.1, 1, 8, 24), F.gold, 0, A.BASE + 10 + 14, -16);
      add(new T.CircleGeometry(r * 0.9, 24).rotateY(Math.PI), F.engine, 0, A.BASE + 10 + 14, -16.2, false);
    },
    tick(api) {
      // once the fleet is home, a button leads straight into the ninth council meeting
      if (api.flag('opened') && !document.getElementById('nextMeeting')) {
        const b = document.createElement('button'); b.id = 'nextMeeting';
        b.innerHTML = 'GO TO THE NINTH COUNCIL MEETING ▶<small style="display:block;font-weight:400;font-size:10px;letter-spacing:2px;color:#ffe9b8;margin-top:3px">THE COUNCIL CHOOSES WHAT COMES NEXT</small>';
        b.style.cssText = 'position:fixed;left:50%;bottom:22px;transform:translateX(-50%);z-index:9;padding:10px 22px;font:600 14px "Segoe UI",Arial;letter-spacing:3px;color:#fff;background:rgba(120,90,20,.85);border:1px solid #ffd060;border-radius:5px;cursor:pointer;box-shadow:0 0 18px rgba(255,208,96,.45)';
        b.onmouseenter = () => b.style.background = 'rgba(160,120,30,.95)'; b.onmouseleave = () => b.style.background = 'rgba(120,90,20,.85)';
        b.onclick = () => { location.href = 'councilmeeting/councilmeeting9.html'; };
        document.body.appendChild(b);
      }
      // after the voyage the cranes stay rolled back and the families keep walking in
      if (api.flag('fleetHome') && !FL._docked) { FL._docked = true; rollCranes(api, 1); FL.families(api); }
    },
    finish: {
      label: 'LAUNCH THE HOMEWARD FLEET TO EARTH',
      cam: [[100, 120, 640], [560, 60, 0]],
      start(api) { this.stage = 0; this.t1 = 0; },
      update(api, dt, f) {
        this.t1 += dt; const t1 = this.t1;
        if (this.stage === 0) {
          const k = Math.min(1, t1 / 6); rollCranes(api, k * k * (3 - 2 * k));
          FL.hint('THE BRIDGE CRANES ROLL CLEAR OF THE ARKS');
          if (t1 > 6.5) { this.stage = 1; this.t1 = 0; }
        } else if (this.stage === 1) {
          // all three lift off the cradles together, then climb away over the forest one after another
          for (let s = 0; s < 3; s++) { const u = Math.max(0, t1 - s * 1.2), e = Math.min(1, u / 4), up = 70 * e * e, tau = Math.max(0, u - 4), d = 0.5 * 120 * tau * tau; placeArk(api, s, up + d * 0.5, d); }
          FL.hint('THE HOMEWARD FLEET LIFTS OFF FOR EARTH · KINDRED · HARMONY · NEW DAWN');
          if (t1 > 13) { this.stage = 2; this.t1 = 0; FL.hint(''); FL.cover(true, 'THE HOMEWARD FLEET SAILS FOR EARTH', 'THREE ARKS · AT THE EARTH WAREHOUSE 9,000 FAMILIES COME ABOARD · THEN HOME TO UNITY'); }
        } else if (this.stage === 2) {
          if (t1 > 2) for (let s = 0; s < 3; s++) placeArk(api, s, 600 + s * 80, 0);
          if (t1 > 5) { this.stage = 3; this.t1 = 0; FL.cover(false); }
        } else if (this.stage === 3) {
          // back down, each onto its own berth
          let done = true;
          for (let s = 0; s < 3; s++) { const e = Math.min(1, Math.max(0, t1 - s * 1.5) / 8); if (e < 1) done = false; placeArk(api, s, (600 + s * 80) * Math.pow(1 - e, 2), 0); }
          FL.hint('THE HOMEWARD FLEET IS HOME · SETTING DOWN ON THE BERTHS');
          if (done) { this.stage = 4; this.t1 = 0; FL.families(api); FL._docked = true; api.setFlag('fleetHome', true); }
        } else {
          FL.hint('9,000 FAMILIES FROM EARTH COME HOME TO UNITY');
          if (t1 > 9) { FL.hint(''); api.setFlag('opened', true); return true; }
        }
        return false;
      },
    },
  }));
})();
