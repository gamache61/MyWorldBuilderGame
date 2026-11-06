/* ============================================================
   THE MOON MINES · BUILD 5 · THE ORE LOADING GANTRY
   Keep this file in projects/moonmines next to moonmines.html.
   A great gantry over the landing field and a raised ore line from
   the depot. Ends with L: the Ark sets down under the gantry, you
   open the bay, it is filled to the top with raw ore, and the Ark
   flies the ore to planet Unity.
   ============================================================ */
(function () {
  const MOON = window.MOON;
  const GX = 120, GZ = 0, LINE_Z = -40, LINE_H = 40, N = 8, SEG = 60, X0 = 220;

  // ---- the ore in the Ark's cargo bay (shared with the Unity Ore Depot project) ----
  MOON.oreBay = (api) => {
    if (MOON._bay && MOON._bay.parent) return MOON._bay;
    const T = api.THREE, F = MOON.mats(api), ship = api.ship; if (!ship) return null;
    const g = new T.Group(); g.position.set(0, -8.6, -10); ship.add(g);
    const body = new T.Mesh(new T.BoxGeometry(46, 1, 136).translate(0, 0.5, 0), F.oreDark); body.receiveShadow = true; g.add(body);
    const top = new T.PlaneGeometry(46, 136, 23, 68).rotateX(-Math.PI / 2), p = top.attributes.position;
    for (let i = 0; i < p.count; i++) p.setY(i, (Math.sin(i * 12.9898) * 43758.5453 % 1) * 1.6);
    top.computeVertexNormals();
    const cap = new T.Mesh(top, F.ore); cap.receiveShadow = true; g.add(cap);
    g.userData.set = lv => { lv = Math.max(0, Math.min(1, lv)); g.visible = lv > 0.01; body.scale.y = Math.max(0.01, lv * 16); cap.position.y = lv * 16; };
    g.userData.set(0); MOON._bay = g; return g;
  };
  MOON.hint = (text) => {
    let el = document.getElementById('moonHint');
    if (!el) { el = document.createElement('div'); el.id = 'moonHint'; el.style.cssText = 'position:fixed;left:50%;bottom:90px;transform:translateX(-50%);z-index:8;padding:8px 18px;background:rgba(8,20,35,.85);border:1px solid #ffd060;border-radius:5px;color:#fff;font:600 13px "Segoe UI",Arial;letter-spacing:3px;text-align:center;pointer-events:none'; document.body.appendChild(el); }
    el.style.display = text ? 'block' : 'none'; if (text) el.textContent = text;
  };
  MOON.cover = (on, a, b) => {
    let el = document.getElementById('moonCover');
    if (!el) { el = document.createElement('div'); el.id = 'moonCover'; el.style.cssText = 'position:fixed;inset:0;z-index:8;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:0 40px;background:rgba(8,16,28,.92);color:#fff;font-family:"Segoe UI",Arial;opacity:0;transition:opacity 1.2s;pointer-events:none'; document.body.appendChild(el); }
    if (on) el.innerHTML = '<div style="font-size:26px;letter-spacing:7px;font-weight:600">' + a + '</div><div style="font-size:14px;letter-spacing:4px;margin-top:12px;color:#bfefff">' + (b || '') + '</div>';
    el.style.opacity = on ? 1 : 0;
  };

  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(MOON.build({
    id: 5, name: 'THE ORE LOADING GANTRY',
    brief: 'A great gantry over the landing field and a raised ore line from the depot — then the Ark is filled to the top with raw ore and flies it to planet Unity.',
    types: {
      GANTRY:  { code: 'SF', name: 'ORE LOADING GANTRY', col: '#6c757d', w: 220, d: 50, h: 70 },
      ORELINE: { code: 'SF', name: 'RAISED ORE LINE', col: '#8a5a3a', w: 60, d: 6, h: 44 },
    },
    order: ['ORELINE', 'GANTRY'],
    at: { ORELINE: Array.from({ length: N }, (_, i) => [X0 + SEG * (i + 0.5), LINE_Z]), GANTRY: [[GX, GZ]] },
    eye: [-200, 140, 260],
    stats(api, c) { return [['ORE LINE', c('ORELINE') * SEG + ' / ' + N * SEG + ' m'], ['GANTRY', c('GANTRY') ? 'READY' : 'NOT YET'], ['ORE IN THE ARK', api.flag('oreLoaded') ? '24,000 t' : 'EMPTY']]; },
    make(type, k, g, add, F, api) {
      const T = api.THREE;
      if (type === 'ORELINE') {
        add(new T.BoxGeometry(60, 1.4, 5), F.dark, 0, LINE_H, 0);
        add(new T.BoxGeometry(60, 0.4, 4.2), F.oreDark, 0, LINE_H + 0.9, 0);
        for (let x = -26; x <= 26; x += 6.5) add(new T.DodecahedronGeometry(0.9, 0), F.ore, x, LINE_H + 1.8, 0);
        for (const s of [-1, 1]) add(new T.BoxGeometry(60, 1.6, 0.3), F.yellow, 0, LINE_H + 1.4, s * 2.5);
        add(new T.BoxGeometry(2.6, LINE_H - 1, 2.6), F.panel, 0, (LINE_H - 1) / 2, 0);
        for (const s of [-1, 1]) { const b = add(new T.BoxGeometry(1, LINE_H * 0.95, 1), F.steel, s * 6, LINE_H * 0.47, 0); b.rotation.z = -s * 0.15; }
        add(new T.BoxGeometry(8, 1.6, 8), F.dark, 0, 0.8, 0);
        if (k === N - 1) { add(new T.BoxGeometry(12, 30, 12), F.panel, 32, 15, 0); add(new T.BoxGeometry(12.4, 1, 12.4), F.gold, 32, 30.5, 0); }
      } else if (type === 'GANTRY') {
        // two great legs either side of the landing pad, and a third pair off the field where the bridge waits.
        // The bridge only rolls over the Ark once it has landed, so the Ark never has to fly through it.
        const PARK = 212;
        for (const x of [-100, 100, 312]) for (const z of [-22, 22]) { add(new T.BoxGeometry(5, 66, 5), F.steel, x, 33, z); add(new T.BoxGeometry(9, 2, 9), F.dark, x, 1, z); }
        for (const x of [-100, 100, 312]) { for (let y = 12; y < 64; y += 13) add(new T.BoxGeometry(2, 1.6, 44), F.yellow, x, y, 0); add(new T.BoxGeometry(6, 4, 50), F.yellow, x, 66, 0); }
        for (const z of [-24.5, 24.5]) add(new T.BoxGeometry(420, 1.6, 2), F.steel, 106, 69, z);   // the rails the bridge rolls on
        add(new T.BoxGeometry(4, 18, 4), F.steel, 100, 49, LINE_Z);
        const br = new T.Group(); br.userData.keep = true; g.add(br); MOON.bridge = br;
        br.position.x = MOON.bridgeOver ? 0 : PARK; MOON.PARK = PARK;
        add(new T.BoxGeometry(206, 5, 8), F.yellow, 0, 72, -20, true, br); add(new T.BoxGeometry(206, 5, 8), F.yellow, 0, 72, 20, true, br);
        for (let x = -90; x <= 90; x += 20) add(new T.BoxGeometry(2, 4, 40), F.steel, x, 72, 0, true, br);
        for (const x of [-100, 100]) for (const z of [-20, 20]) add(new T.CylinderGeometry(1.6, 1.6, 2, 12).rotateX(Math.PI / 2), F.dark, x, 70.4, z, true, br);
        add(new T.BoxGeometry(100, 1.4, 5), F.dark, 50, 64, LINE_Z, true, br);   // the ore line comes in from the depot …
        add(new T.BoxGeometry(5, 1.4, 40), F.dark, 0, 64, LINE_Z / 2, true, br);   // the feed from the ore line over to the hopper
        add(new T.BoxGeometry(20, 12, 20), F.panel, 0, 60, 0, true, br);
        add(new T.CylinderGeometry(10, 3, 10, 16), F.foil, 0, 51, 0, true, br);
        add(new T.CylinderGeometry(2.6, 2.6, 6, 12), F.steel, 0, 44, 0, true, br);
        add(new T.BoxGeometry(20.4, 1, 20.4), F.glow, 0, 66.6, 0, false, br);
        for (const x of [-100, 100, 312]) add(new T.SphereGeometry(1.2, 8, 6), F.eye, x, 69.5, 0, false);
        // the falling ore (shown while the bay is being filled)
        const stream = new T.Group(); stream.position.y = 6; stream.visible = false; br.add(stream);
        const col = new T.Mesh(new T.CylinderGeometry(2.2, 3.2, 24, 12, 1, true), F.oreDark); col.position.y = 23; stream.add(col);
        const lumps = []; for (let i = 0; i < 14; i++) { const m = new T.Mesh(new T.DodecahedronGeometry(0.8 + (i % 3) * 0.3, 0), F.ore); stream.add(m); lumps.push(m); }
        stream.userData.lumps = lumps; MOON.stream = stream;
        MOON.person(g, { kind: 'astro', seed: 9501, stripe: '#d9d9d9' }, 'tablet', -110, 0, 30, Math.PI / 2);
      }
    },
    tick(api, dt, t) {
      // the ore stays in the bay after reloads, and the stream tumbles while it pours
      if (api.flag('oreLoaded')) { const b = MOON.oreBay(api); if (b && !MOON._full) { b.userData.set(1); MOON._full = true; } }
      const s = MOON.stream; if (s && s.visible) s.userData.lumps.forEach((m, i) => { const ph = (t * 1.4 + i / 14) % 1; m.position.set(Math.sin(i * 7) * 1.5, 34 - ph * 24, Math.cos(i * 5) * 1.5); m.rotation.set(t * 3 + i, t * 2, 0); });
      if (api.flag('oreLoaded') && !document.getElementById('nextMeeting')) {
        const b = document.createElement('button'); b.id = 'nextMeeting';
        b.innerHTML = 'GO TO THE FOURTH COUNCIL MEETING ▶<small style="display:block;font-weight:400;font-size:10px;letter-spacing:2px;color:#ffe9b8;margin-top:3px">THE ORE IS ON ITS WAY — THE COUNCIL DECIDES WHAT COMES NEXT</small>';
        b.style.cssText = 'position:fixed;left:50%;bottom:22px;transform:translateX(-50%);z-index:9;padding:10px 22px;font:600 14px "Segoe UI",Arial;letter-spacing:3px;color:#fff;background:rgba(120,90,20,.85);border:1px solid #ffd060;border-radius:5px;cursor:pointer;box-shadow:0 0 18px rgba(255,208,96,.45)';
        b.onmouseenter = () => b.style.background = 'rgba(160,120,30,.95)'; b.onmouseleave = () => b.style.background = 'rgba(120,90,20,.85)';
        b.onclick = () => { location.href = 'councilmeeting/councilmeeting4.html'; };
        document.body.appendChild(b);
      }
    },
    finish: {
      label: 'FILL THE ARK WITH ORE',
      cam: [[-170, 70, 260], [120, 10, 0]],
      start(api) {
        this.stage = 0; this.level = 0; this.t0 = 0; this.f = 0; this._p = false;
        const T = api.THREE, U = (window.MOON_UNITY_AT || new T.Vector3(24000, 15000, -9000)).clone(), fly = this;
        fly.dir = U.sub(new T.Vector3(120, -28, 0)).normalize(); fly.off = new T.Vector3(); fly.q0 = null;
        window.__shipFly = (ship) => {
          if (fly.stage < 4) return;
          const f = fly.f - fly.t0; if (!fly.q0) fly.q0 = ship.quaternion.clone();
          const k = Math.min(1, f / 3), e = k * k * (3 - 2 * k), tau = Math.max(0, f - 3), s = 0.5 * 320 * tau * tau;
          fly.off.set(0, 70 * e, 0).addScaledVector(fly.dir, s); ship.position.add(fly.off);
          ship.quaternion.copy(fly.q0).slerp(new T.Quaternion().setFromUnitVectors(new T.Vector3(0, 0, 1), fly.dir), Math.min(1, f / 4));
          ship.visible = s < 16000;
        };
      },
      update(api, dt, f) {
        this.f = f; const bay = MOON.oreBay(api);
        if (this.stage === 0) {
          if (!this._p) { this._p = true; api.parkShip(); }
          MOON.hint('SETTING THE AEGIS ARK DOWN UNDER THE ORE GANTRY');
          if (api.landed) { this.stage = 0.5; this.tb = 0; }
        } else if (this.stage === 0.5) {
          this.tb += dt; const k = Math.min(1, this.tb / 7), e = k * k * (3 - 2 * k);
          if (MOON.bridge) MOON.bridge.position.x = MOON.PARK * (1 - e);
          MOON.hint('THE GANTRY BRIDGE ROLLS OVER THE ARK');
          if (k >= 1) { this.stage = 1; MOON.bridgeOver = true; }
        } else if (this.stage === 1) {
          MOON.hint('OPEN THE BAY DOORS (B) SO THE GANTRY CAN FILL THE BAY');
          if (api.bayT >= 0.999) this.stage = 2;
        } else if (this.stage === 2) {
          this.level = Math.min(1, this.level + dt / 14); bay && bay.userData.set(this.level);
          if (MOON.stream) MOON.stream.visible = this.level < 1;
          MOON.hint('FILLING THE CARGO BAY WITH RAW ORE · ' + Math.round(this.level * 100) + ' %  ·  ' + Math.round(this.level * 24000).toLocaleString() + ' t');
          if (this.level >= 1) this.stage = 3;
        } else if (this.stage === 3) {
          MOON.hint('BAY FULL · CLOSE THE BAY DOORS (B) FOR THE TRIP TO UNITY');
          if (api.bayT <= 0.001) { this.stage = 3.5; this.tb = 0; }
        } else if (this.stage === 3.5) {
          this.tb += dt; const k = Math.min(1, this.tb / 7), e = k * k * (3 - 2 * k);
          if (MOON.bridge) MOON.bridge.position.x = MOON.PARK * e;
          MOON.hint('THE GANTRY BRIDGE ROLLS BACK · CLEAR FOR LIFT-OFF');
          if (k >= 1) { this.stage = 4; this.t0 = f; MOON.hint(''); MOON.bridgeOver = false; api.setFlag('oreLoaded', true); }
        } else {
          const g = f - this.t0;
          if (g > 13 && !this._c) { this._c = true; MOON.cover(true, 'THE AEGIS ARK IS ON ITS WAY TO UNITY', 'A FULL BAY OF RAW ORE FROM VESH · NEXT: THE COUNCIL DECIDES WHERE IT GOES'); }
          if (g > 16.5 && !this._h) { this._h = true; window.__shipFly = null; api.ship.visible = true; api.setFlag('opened', true); }
          if (g > 19) { MOON.cover(false); this._c = this._h = false; return true; }
        }
        return false;
      },
    },
  }));
})();
