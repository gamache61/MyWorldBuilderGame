/* ============================================================
   THE UNITY ORE DEPOT · BUILD 4 · THE ORE DROP
   Keep this file in projects/oredepot next to oredepot.html.
   Covered ore galleries that will carry the ore out of the store
   to the factory district still to come, and the district's
   first marked-out ground. Ends with L: the Aegis Ark flies to Vesh,
   comes back with a full bay of ore, hovers over the shaft, opens
   its belly and drops the ore down into the store.
   ============================================================ */
(function () {
  const D = window.DEPOT, N = 6, SEG = 60, X0 = -190, SHAFT = { x: 0, z: 0 }, HOVER = 34;

  // ---- the ore in the Ark's cargo bay ----
  D.oreBay = (api) => {
    if (D._bay && D._bay.parent) return D._bay;
    const T = api.THREE, F = D.mats(api), ship = api.ship; if (!ship) return null;
    const g = new T.Group(); g.position.set(0, -8.6, -10); ship.add(g);
    const body = new T.Mesh(new T.BoxGeometry(46, 1, 136).translate(0, 0.5, 0), F.oreDark); g.add(body);
    const top = new T.PlaneGeometry(46, 136, 23, 68).rotateX(-Math.PI / 2), p = top.attributes.position;
    for (let i = 0; i < p.count; i++) p.setY(i, (Math.sin(i * 12.9898) * 43758.5453 % 1) * 1.6);
    top.computeVertexNormals(); const cap = new T.Mesh(top, F.ore); g.add(cap);
    g.userData.set = lv => { lv = Math.max(0, Math.min(1, lv)); g.visible = lv > 0.01; body.scale.y = Math.max(0.01, lv * 16); cap.position.y = lv * 16; };
    g.userData.set(0); D._bay = g; return g;
  };
  // ---- the belly doors under the cargo bay ----
  D.belly = (api) => {
    if (D._belly && D._belly.parent) return D._belly;
    const T = api.THREE, F = D.mats(api), ship = api.ship; if (!ship) return null;
    const g = new T.Group(); ship.add(g); g.visible = false; const doors = [];
    for (const s of [-1, 1]) {
      const piv = new T.Group(); piv.position.set(s * 22, -10.6, -10); g.add(piv);
      const plate = new T.Mesh(new T.BoxGeometry(22, 1.2, 130), F.dark); plate.position.x = -s * 11; piv.add(plate);
      const stripe = new T.Mesh(new T.BoxGeometry(21, 0.2, 128), F.yellow); stripe.position.set(-s * 11, -0.7, 0); piv.add(stripe);
      doors.push({ piv, s });
    }
    const hole = new T.Mesh(new T.BoxGeometry(44, 0.4, 130), F.oreDark); hole.position.set(0, -10.2, -10); g.add(hole);
    g.userData.open = k => { g.visible = k > 0.001; for (const d of doors) d.piv.rotation.z = d.s * k * 1.35; };
    D._belly = g; return g;
  };
  D.cover = (on, a, b) => {
    let el = document.getElementById('depotCover');
    if (!el) { el = document.createElement('div'); el.id = 'depotCover'; el.style.cssText = 'position:fixed;inset:0;z-index:8;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:0 40px;background:rgba(8,16,28,.92);color:#fff;font-family:"Segoe UI",Arial;opacity:0;transition:opacity 1.2s;pointer-events:none'; document.body.appendChild(el); }
    if (on) el.innerHTML = '<div style="font-size:26px;letter-spacing:7px;font-weight:600">' + a + '</div><div style="font-size:14px;letter-spacing:4px;margin-top:12px;color:#bfefff">' + (b || '') + '</div>';
    el.style.opacity = on ? 1 : 0;
  };
  D.hint = (text) => {
    let el = document.getElementById('depotHint');
    if (!el) { el = document.createElement('div'); el.id = 'depotHint'; el.style.cssText = 'position:fixed;left:50%;bottom:90px;transform:translateX(-50%);z-index:8;padding:8px 18px;background:rgba(8,20,35,.85);border:1px solid #ffd060;border-radius:5px;color:#fff;font:600 13px "Segoe UI",Arial;letter-spacing:3px;text-align:center;pointer-events:none'; document.body.appendChild(el); }
    el.style.display = text ? 'block' : 'none'; if (text) el.textContent = text;
  };

  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(D.build({
    id: 4, name: 'THE ORE DROP',
    brief: 'Covered ore galleries out to the factory district still to come — then the Ark fetches the ore from Vesh, hovers over the shaft, opens its belly and drops 24,000 t of moon ore into the store.',
    types: {
      GALLERY:  { code: 'SF', name: 'ORE GALLERY', col: '#8a5a3a', w: 60, d: 12, h: 9 },
      DISTRICT: { code: 'SF', name: 'FACTORY DISTRICT MARKERS', col: '#d9a21b', w: 160, d: 160, h: 4 },
    },
    order: ['GALLERY', 'DISTRICT'],
    at: { GALLERY: Array.from({ length: N }, (_, i) => [X0 - SEG * (i + 0.5), 0]), DISTRICT: [[-640, 0]] },
    eye: [-160, 120, 240],
    stats(api, c) { return [['ORE GALLERIES', c('GALLERY') * SEG + ' / ' + N * SEG + ' m'], ['FACTORY DISTRICT', c('DISTRICT') ? 'MARKED OUT' : 'NOT YET'], ['ORE IN THE STORE', api.flag('oreStored') ? '24,000 t' : '0 t']]; },
    make(type, k, g, add, F, api) {
      const T = api.THREE;
      if (type === 'GALLERY') {
        add(new T.BoxGeometry(60, 1, 12), F.stoneDark, 0, 0.5, 0);
        add(new T.BoxGeometry(60, 0.6, 4), F.dark, 0, 2.2, 0);
        add(new T.BoxGeometry(60, 0.3, 3.4), F.oreDark, 0, 2.6, 0);
        for (let x = -26; x <= 26; x += 7) add(new T.DodecahedronGeometry(0.8, 0), F.ore, x, 3.3, 0);
        add(new T.CylinderGeometry(6, 6, 60, 20, 1, true, Math.PI / 2, Math.PI).rotateZ(Math.PI / 2), F.panel, 0, 1, 0);
        for (let x = -27; x <= 27; x += 9) add(new T.TorusGeometry(6.1, 0.3, 6, 16, Math.PI).rotateY(Math.PI / 2), F.white, x, 1, 0);
        add(new T.BoxGeometry(60, 0.6, 0.6), F.glow, 0, 7.2, 0, false);
      } else if (type === 'DISTRICT') {
        // the ground marked out for the factories and warehouses the council will build next
        add(new T.BoxGeometry(160, 0.4, 160), F.stoneDark, 0, 0.2, 0);
        for (const [w, d, x, z] of [[160, 1.6, 0, 79], [160, 1.6, 0, -79], [1.6, 160, 79, 0], [1.6, 160, -79, 0], [160, 1, 0, 0], [1, 160, 0, 0]]) add(new T.BoxGeometry(w, 0.15, d), F.yellow, x, 0.5, z, false);
        for (const [x, z] of [[-79, -79], [79, -79], [-79, 79], [79, 79], [-79, 0], [79, 0], [0, -79], [0, 79]]) { add(new T.CylinderGeometry(0.6, 0.6, 8, 8), F.steel, x, 4, z); add(new T.SphereGeometry(0.9, 8, 6), F.lamp, x, 8.6, z, false); }
        for (let i = 0; i < 6; i++) add(new T.BoxGeometry(2.44, 2.6, 12.2), F[['steel', 'panel', 'yellow'][i % 3]], -60 + (i % 3) * 4, 1.7, 50 + ((i / 3) | 0) * 14);
        D.person(g, { kind: 'worker', seed: 9801, female: false }, 'tablet', 10, 0.4, 10, -Math.PI / 2);
        D.person(g, D.civ(9802), 'gesture', 14, 0.4, 14, -Math.PI / 2);
      }
    },
    tick(api, dt, t) {
      // once the ore is stored, a button leads straight into the fifth council meeting
      if (api.flag('oreStored') && api.flag('opened') && !document.getElementById('nextMeeting')) {
        const b = document.createElement('button'); b.id = 'nextMeeting';
        b.innerHTML = 'GO TO THE FIFTH COUNCIL MEETING ▶<small style="display:block;font-weight:400;font-size:10px;letter-spacing:2px;color:#ffe9b8;margin-top:3px">THE COUNCIL CHOOSES WHAT COMES NEXT</small>';
        b.style.cssText = 'position:fixed;left:50%;bottom:22px;transform:translateX(-50%);z-index:9;padding:10px 22px;font:600 14px "Segoe UI",Arial;letter-spacing:3px;color:#fff;background:rgba(120,90,20,.85);border:1px solid #ffd060;border-radius:5px;cursor:pointer;box-shadow:0 0 18px rgba(255,208,96,.45)';
        b.onmouseenter = () => b.style.background = 'rgba(160,120,30,.95)'; b.onmouseleave = () => b.style.background = 'rgba(120,90,20,.85)';
        b.onclick = () => { location.href = 'councilmeeting/councilmeeting5.html'; };
        document.body.appendChild(b);
      }
      // the falling ore (only while the belly is open)
      const L = D._lumps; if (L && L.visible) L.children.forEach((m, i) => { if (m.userData.curtain) { m.rotation.y = t * 0.5; return; } const ph = (t * 1.1 + i / L.children.length) % 1; m.position.set(Math.sin(i * 7.3) * 18 * (1 - 0.5 * ph), HOVER + 1 - ph * (HOVER + 12), (-60 + (i * 37) % 120) * (1 - 0.78 * ph)); m.rotation.set(t * 3 + i, t * 2, 0); });
    },
    finish: {
      label: 'DROP THE MOON ORE DOWN THE SHAFT',
      cam: [[-190, 40, 230], [0, 10, 0]],
      start(api) {
        const T = api.THREE, F = D.mats(api), fly = this;
        this.stage = 0; this.k = 0; this.level = 1; this.open = 0; this.f = 0; this.t0 = 0; this.t1 = 0;
        D.belly(api);
        // the falling ore, drawn in the world over the shaft
        if (!D._lumps) { const lg = new T.Group(); for (let i = 0; i < 90; i++) lg.add(new T.Mesh(new T.DodecahedronGeometry(1.8 + (i % 4) * 0.7, 0), i % 3 ? F.ore : F.oreDark));
          // three falling curtains of ore from the open belly down into the shaft
          const curtain = new T.MeshStandardMaterial({ color: 0x5a4030, roughness: 1, transparent: true, opacity: 0.85 });
          for (const z of [-34, 0, 34]) { const c = new T.Mesh(new T.CylinderGeometry(9, 5, HOVER + 12, 16, 1, true), curtain); c.position.set(0, (HOVER + 12) / 2 - 11, z * 0.6); c.scale.z = 1.6; c.userData.curtain = true; lg.add(c); }
          lg.visible = false; lg.position.set(SHAFT.x, -28, SHAFT.z); api.ship.parent.add(lg); D._lumps = lg; }
        // first the Ark climbs away and flies to Vesh for the ore, then it comes back down over the shaft
        // (up: metres above where the game puts it · k: 0 = where the game puts it, 1 = over the shaft)
        const hover = new T.Vector3(SHAFT.x, -28 + HOVER + 12, SHAFT.z); this.up = 0;
        window.__shipFly = (ship) => {
          if (fly.k > 0) { ship.position.lerp(hover, fly.k); ship.rotation.set(0, 0, 0); }
          if (fly.up > 0) ship.position.y += fly.up;
          ship.visible = fly.up < 900;
        };
        D.oreBay(api).userData.set(0);
      },
      update(api, dt, f) {
        this.f = f; const bay = D.oreBay(api), belly = D.belly(api);
        if (this.stage === 0) {
          // lift off and climb away towards the moon
          this.t1 = (this.t1 || 0) + dt; const e = Math.min(1, this.t1 / 4); this.up = 1000 * e * e;
          D.hint('THE AEGIS ARK LIFTS OFF FOR THE MOON VESH TO FETCH THE ORE');
          if (this.t1 >= 4) { this.stage = 0.5; this.t1 = 0; D.hint(''); D.cover(true, 'THE AEGIS ARK FLIES TO THE MOON VESH', 'LOADING A FULL BAY OF RAW ORE UNDER THE MINE GANTRY · THEN BACK TO UNITY'); }
        } else if (this.stage === 0.5) {
          // away at the moon: the bay is filled, and the Ark comes back over the shaft
          this.t1 += dt;
          if (this.t1 > 2) { bay.userData.set(1); this.k = 1; }
          if (this.t1 >= 4.5) { this.stage = 0.7; this.t1 = 0; D.cover(false); }
        } else if (this.stage === 0.7) {
          this.t1 += dt; const e = Math.min(1, this.t1 / 6); this.up = 1000 * (1 - e) * (1 - e);
          D.hint('THE AEGIS ARK IS BACK FROM VESH WITH 24,000 t OF ORE · LINING UP OVER THE SHAFT');
          if (this.t1 >= 6) { this.up = 0; this.stage = 1; }
        } else if (this.stage === 1) {
          this.open = Math.min(1, this.open + dt / 2.5); belly.userData.open(this.open); D.hint('OPENING THE BELLY DOORS');
          if (this.open >= 1) { this.stage = 2; if (D._lumps) D._lumps.visible = true; }
        } else if (this.stage === 2) {
          this.level = Math.max(0, this.level - dt / 16); bay.userData.set(this.level);
          D.hint('DROPPING THE MOON ORE DOWN THE SHAFT · ' + Math.round((1 - this.level) * 24000).toLocaleString() + ' t STORED');
          if (this.level <= 0) { this.stage = 3; if (D._lumps) D._lumps.visible = false; api.setFlag('oreStored', true); }
        } else if (this.stage === 3) {
          this.open = Math.max(0, this.open - dt / 2.5); belly.userData.open(this.open); D.hint('24,000 t OF MOON ORE IN THE STORE · CLOSING THE BELLY DOORS');
          if (this.open <= 0) { this.stage = 4; this.t0 = f; }
        } else {
          this.k = Math.max(0, this.k - dt / 5); D.hint('THE ORE IS STORED · UNITY CAN BUILD ITS OWN FACTORIES NOW');
          if (this.k <= 0) { window.__shipFly = null; D.hint(''); api.setFlag('opened', true); return true; }
        }
        return false;
      },
    },
  }));
})();
