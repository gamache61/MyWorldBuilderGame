/* ============================================================
   THE SEASHORE SHIPYARD · BUILD 5 · THE FIRST SHIPS & LAUNCH DAY
   Keep this file in projects/seashoreshipyard next to 42-seashoreshipyard.html.
   Unity's first water ships: the ferry Coastline on slipway 1, two
   fishing boats at the quay and the sea-research ship Deepwater in
   the floating dock. Ends with L: launch day — the ferry slides down
   the slipway into the sea and sails out on its first run along the
   coast, while the people of Seashore watch from the shore.
   ============================================================ */
(function () {
  const P = window.YARD;
  const SEA = () => (window.SEA_Y !== undefined ? window.SEA_Y : -31);
  // a ship part: its slot sits on the slipway, at the quay or in the dock
  const SHIPS = { FERRY: ['ferry', 0], FISHER: ['fisher', 0], RESEARCH: ['research', 0] };
  P.sailing = P.sailing || [];
  P.findShip = (api, type) => { const p = api.placed.find(q => q.type === type && q.piece); let s = null; if (p) p.piece.traverse(o => { if (o.userData.isShip && !s) s = o; }); return s; };
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 5, name: 'THE FIRST SHIPS & LAUNCH DAY',
    brief: 'Unity’s first water ships: the ferry Coastline on the slipway, two fishing boats at the quay and the sea-research ship Deepwater in the floating dock — then launch day.',
    types: {
      FERRY:    { code: 'FB', name: 'FERRY COASTLINE', col: '#f2f4f6', w: 74, d: 16, h: 22 },
      FISHER:   { code: 'FB', name: 'FISHING BOAT', col: '#2f7fe0', w: 28, d: 8, h: 14 },
      RESEARCH: { code: 'FB', name: 'RESEARCH SHIP DEEPWATER', col: '#f08a1a', w: 54, d: 12, h: 22 },
    },
    order: ['FERRY', 'FISHER', 'RESEARCH'],
    at: { FERRY: [[-120, 1300]], FISHER: [[-250, 1190], [-330, 1230]], RESEARCH: [[-360, 1580]] },
    eye: [-220, 150, 260],
    stats(api, c) { return [['FERRY', c('FERRY') ? 'ON THE SLIPWAY' : 'NOT YET'], ['FISHING BOATS', c('FISHER') + ' / 2'], ['RESEARCH SHIP', c('RESEARCH') ? 'IN THE DOCK' : 'NOT YET'], ['LAUNCHED', api.flag('shipyard') ? 'COASTLINE IS SAILING' : 'NOT YET']]; },
    make(type, k, g, add, F, api, sl) {
      const y0 = sl.y; let s;
      if (type === 'FERRY') {
        // on the cradle blocks, bow toward the sea, tilted with the slipway
        const y = P.slipY(sl.x) + 1.2 - y0; s = P.ship(api, add, g, 'ferry', 0, y + 1.9, 0, Math.PI); s.rotation.z = -Math.atan2(7.6, 290);
        P.person(g, P.civ(45000), 'idle', 30, P.slipY(sl.x + 30) - y0, 14, Math.PI);
      } else if (type === 'FISHER') {
        s = P.ship(api, add, g, 'fisher', 0, SEA() - y0 + 0.6, 0, k ? Math.PI : 0);
      } else {
        // lifted up in the floating dock, on its blocks
        s = P.ship(api, add, g, 'research', 0, 4.2, 0, 0);
      }
      s.userData.isShip = true;
    },
    tick(api, dt, t) {
      // once the yard is open the ferry runs up and down the coast, and the fishing boats go out to sea and back
      if (api.flag('opened') && !P._sailing) {
        P._sailing = true;
        const ferry = P.findShip(api, 'FERRY');
        if (ferry) { const w = ferry.getWorldPosition(new api.THREE.Vector3()); P.sailing.push({ s: ferry, cx: -900, cz: 1450, rx: 300, rz: 350, sp: 0.05, ph: 0, y: SEA() + 1.9 - (ferry.parent ? ferry.parent.getWorldPosition(new api.THREE.Vector3()).y : 0), base: ferry.parent }); ferry.rotation.z = 0; }
      }
      for (const r of P.sailing) {
        const q = r.ph + t * r.sp, x = r.cx + Math.cos(q) * r.rx, z = r.cz + Math.sin(q) * r.rz, pp = r.base.getWorldPosition(new api.THREE.Vector3());
        r.s.position.set(x - pp.x, r.y, z - pp.z); r.s.rotation.y = -Math.atan2(Math.cos(q) * r.rz, -Math.sin(q) * r.rx);
        r.s.rotation.x = Math.sin(t * 1.3) * 0.02;
      }
      if (api.flag('opened') && !document.getElementById('nextMeeting')) {
        const b = document.createElement('button'); b.id = 'nextMeeting';
        b.innerHTML = 'GO TO THE EIGHTEENTH COUNCIL MEETING ▶<small style="display:block;font-weight:400;font-size:10px;letter-spacing:2px;color:#c8ecff;margin-top:3px">THE COUNCIL TALKS ABOUT HAVENREACH</small>';
        b.style.cssText = 'position:fixed;left:50%;bottom:22px;transform:translateX(-50%);z-index:9;padding:10px 22px;font:600 14px "Segoe UI",Arial;letter-spacing:3px;color:#fff;background:rgba(20,60,100,.85);border:1px solid #80d8ff;border-radius:5px;cursor:pointer;box-shadow:0 0 18px rgba(128,216,255,.45)';
        b.onmouseenter = () => b.style.background = 'rgba(30,80,130,.95)'; b.onmouseleave = () => b.style.background = 'rgba(20,60,100,.85)';
        b.onclick = () => { location.href = 'councilmeeting/councilmeeting18.html'; };
        document.body.appendChild(b);
      }
    },
    finish: {
      label: 'LAUNCH DAY',
      cam: [[-60, 30, 1180], [-260, -30, 1300]],
      start(api) {
        this.stage = 0; this.t1 = 0; this.ship = P.findShip(api, 'FERRY'); P.ring && P.ring(3);
        const par = this.ship && this.ship.parent; if (!par) return;
        this.px = par.getWorldPosition(new api.THREE.Vector3());
        for (let i = 0; i < 10; i++) P.person(par, i % 3 === 1 ? P.kid(45100 + i) : P.civ(45100 + i), 'idle', 40 + (i % 5) * 3, -28.4 - this.px.y, -30 - (i >> 1) * 1.5 - (i % 2) * 2, Math.PI * 0.8, i % 3 === 1 ? { scale: 0.6 } : {});
      },
      update(api, dt, f) {
        this.t1 += dt; const s = this.ship, px = this.px;
        if (s && px) {
          // slide down the slipway (world x from -120 to -360), then float and sail out west
          const slide = Math.min(1, Math.max(0, (f - 2) / 9)), e = slide * slide;
          let wx = -120 - 240 * e, wy = Math.max(P.slipY(wx) + 1.2 + 1.9, SEA() + 1.9);
          if (f > 11) { const g2 = f - 11; wx = -360 - g2 * 14 - g2 * g2 * 0.4; wy = SEA() + 1.9 + Math.sin(f * 1.3) * 0.15; s.rotation.z *= 0.95; }
          s.position.set(wx - px.x, wy - px.y, 0);
        }
        if (this.stage === 0) {
          P.hint('LAUNCH DAY · THE FERRY COASTLINE SLIDES DOWN THE SLIPWAY INTO THE SEA');
          if (this.t1 > 13) { this.stage = 1; this.t1 = 0; }
        } else if (this.stage === 1) {
          P.hint('UNITY’S FIRST WATER SHIP SAILS OUT ON ITS FIRST RUN ALONG THE COAST');
          if (this.t1 > 12) { this.stage = 2; this.t1 = 0; P.hint(''); P.cover(true, 'THE SEASHORE SHIPYARD IS OPEN', 'THE SLIPWAYS · THE SHIP HALL · THE FLOATING DOCK · THE FITTING-OUT QUAY · THE FERRY COASTLINE · NEXT: THE EIGHTEENTH COUNCIL MEETING'); }
        } else {
          if (this.t1 > 4 && !this._h) { this._h = true; api.setFlag('shipyard', true); api.setFlag('opened', true); }
          if (this.t1 > 6.5) { P.cover(false); this._h = false; return true; }
        }
        return false;
      },
    },
  }));
})();
