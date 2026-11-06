/* ============================================================
   THE TOWN ON VESH · BUILD 5 · THE VESH OBSERVATORY
   Keep this file in projects/veshtown next to veshtown.html.
   An observatory dome on the crater rim and a great radio dish,
   where the sky is black all day and no air blurs the stars.
   Ends with L: the first shuttle comes down from Unity, the first
   families walk to the port dome, and the dish swings up for its
   first look at the stars.
   ============================================================ */
(function () {
  const V = window.VESH, PAD = [440, 220], DOOR = [380, 296];
  V.hint = (text) => {
    let el = document.getElementById('veshHint');
    if (!el) { el = document.createElement('div'); el.id = 'veshHint'; el.style.cssText = 'position:fixed;left:50%;bottom:90px;transform:translateX(-50%);z-index:8;padding:8px 18px;background:rgba(8,20,35,.85);border:1px solid #ffd060;border-radius:5px;color:#fff;font:600 13px "Segoe UI",Arial;letter-spacing:3px;text-align:center;pointer-events:none'; document.body.appendChild(el); }
    el.style.display = text ? 'block' : 'none'; if (text) el.textContent = text;
  };
  V.cover = (on, a, b) => {
    let el = document.getElementById('veshCover');
    if (!el) { el = document.createElement('div'); el.id = 'veshCover'; el.style.cssText = 'position:fixed;inset:0;z-index:8;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:0 40px;background:rgba(8,16,28,.92);color:#fff;font-family:"Segoe UI",Arial;opacity:0;transition:opacity 1.2s;pointer-events:none'; document.body.appendChild(el); }
    if (on) el.innerHTML = '<div style="font-size:26px;letter-spacing:7px;font-weight:600">' + a + '</div><div style="font-size:14px;letter-spacing:4px;margin-top:12px;color:#bfefff">' + (b || '') + '</div>';
    el.style.opacity = on ? 1 : 0;
  };
  // the shuttle that flies between Unity and Vesh: it sits on shuttle pad 2
  V.shuttle = (api) => {
    if (V._sh && V._sh.parent) return V._sh;
    const pad = api.placed.find(p => p.type === 'SPAD' && p.x === PAD[0] && p.z === PAD[1] && p.piece); if (!pad) return null;
    const T = api.THREE, F = V.mats(api), g = new T.Group();
    const add = (geo, mat, x, y, z) => { const m = new T.Mesh(geo, mat); m.position.set(x, y, z); m.castShadow = true; m.receiveShadow = true; g.add(m); return m; };
    add(new T.CylinderGeometry(3.4, 4.2, 20, 20), F.white, 0, 13, 0);
    add(new T.ConeGeometry(3.4, 7, 20), F.white, 0, 26.5, 0);
    add(new T.CylinderGeometry(3.45, 3.45, 2, 20), F.gold, 0, 18, 0);
    add(new T.BoxGeometry(2.6, 1.2, 0.2), F.window, 0, 24, 3.3);
    for (let i = 0; i < 4; i++) { const a = i / 4 * Math.PI * 2 + Math.PI / 4, w = add(new T.BoxGeometry(0.6, 8, 5), F.panel, Math.cos(a) * 5, 6, Math.sin(a) * 5); w.rotation.y = -a; add(new T.CylinderGeometry(0.3, 0.3, 4, 6), F.steel, Math.cos(a) * 6.4, 1.6, Math.sin(a) * 6.4); add(new T.CylinderGeometry(1, 1, 0.3, 10), F.dark, Math.cos(a) * 6.4, 0.15, Math.sin(a) * 6.4); }
    add(new T.CylinderGeometry(2.4, 3.2, 3, 16), F.dark, 0, 1.9, 0);
    const flame = new T.Mesh(new T.ConeGeometry(2.6, 14, 14).rotateX(Math.PI), F.hot); flame.position.y = -6; flame.visible = false; g.add(flame); g.userData.flame = flame;
    g.position.set(0, 1.6, 0); pad.piece.add(g); V._sh = g; return g;
  };
  // the first families, in space suits, walking from the shuttle to the port dome
  V.families = (api) => {
    if (V._fam) return; const pad = api.placed.find(p => p.type === 'SPAD' && p.x === PAD[0] && p.z === PAD[1] && p.piece); if (!pad) return; V._fam = true;
    const bx = DOOR[0] - PAD[0], bz = DOOR[1] - PAD[1], stripes = ['#e8c13a', '#2e7cc8', '#3ec85a', '#d9731b', '#b03a2e', '#7b4fa0'];
    for (let i = 0; i < 18; i++) {
      const ax = -6 + (i % 4) * 3, az = 6 + (i % 3) * 3;
      V.person(pad.piece, { kind: 'astro', seed: 11600 + i, stripe: stripes[i % 6] }, 'walk', ax, 1.6, az, 0, { path: { type: 'line', ax, az, bx: bx + (i % 3 - 1) * 2, bz, speed: (i % 5 === 0 ? 0.8 : 1.1) + (i % 4) * 0.1 } });
    }
  };

  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(V.build({
    id: 5, name: 'THE VESH OBSERVATORY',
    brief: 'An observatory dome on the crater rim and a great radio dish, where the sky is black all day — then the first families arrive from Unity.',
    types: {
      OBSERVATORY: { code: 'HM', name: 'OBSERVATORY DOME', col: '#eef0f2', w: 52, d: 52, h: 34 },
      VDISH:       { code: 'HP', name: 'RADIO DISH', col: '#9aa3ad', w: 34, d: 34, h: 36 },
      SKYPATH:     { code: 'SF', name: 'RIM WALKWAY', col: '#6c757d', w: 40, d: 6, h: 3 },
    },
    order: ['OBSERVATORY', 'VDISH', 'SKYPATH'],
    at: { OBSERVATORY: [[900, -100]], VDISH: [[965, -35]], SKYPATH: [[845, -40]] },
    eye: [-230, 160, 250],
    stats(api, c) { return [['OBSERVATORY', c('OBSERVATORY') ? 'OPEN' : 'NOT YET'], ['RADIO DISH', c('VDISH') ? 'LISTENING' : 'NOT YET'], ['RIM WALKWAY', c('SKYPATH') ? 'OPEN' : 'NOT YET'], ['FAMILIES ON VESH', api.flag('veshTown') ? 240 : 0]]; },
    make(type, k, g, add, F, api) {
      const T = api.THREE;
      if (type === 'OBSERVATORY') {
        // a raised mound of rock on the crater rim
        add(new T.CylinderGeometry(22, 27, 8, 32), F.rock, 0, 4, 0);
        add(new T.CylinderGeometry(19, 19, 10, 32), F.white, 0, 13, 0);
        add(new T.TorusGeometry(19.05, 0.6, 6, 48).rotateX(Math.PI / 2), F.gold, 0, 18, 0);
        const dome = new T.Group(); dome.position.y = 18; dome.rotation.y = 0.7; g.add(dome);
        add(new T.SphereGeometry(19, 32, 14, 0.25, Math.PI * 2 - 0.5, 0, Math.PI / 2), F.white, 0, 0, 0, true, dome);
        add(new T.SphereGeometry(18.6, 16, 10, -0.25, 0.5, 0, Math.PI / 2), F.dark, 0, 0, 0, false, dome);
        // the big telescope looking out through the slit
        const tube = add(new T.CylinderGeometry(2.6, 3, 22, 16), F.steel, 4, 9, 0, true, dome); tube.rotation.z = -0.9;
        add(new T.CylinderGeometry(2.7, 2.7, 0.4, 16), F.glass, 13, 15.3, 0, false, dome).rotation.z = -0.9;
        add(new T.BoxGeometry(3, 2.6, 0.2), F.window, 0, 4, 19.2, false);
        add(new T.BoxGeometry(5, 4, 8), F.panel, 0, 10, 22);
        for (let i = 0; i < 2; i++) V.person(g, V.civ(11500 + i), i ? 'tablet' : 'sitType', -5 + i * 8, 8, 6 - i * 4, 0);
      } else if (type === 'VDISH') {
        add(new T.CylinderGeometry(7, 9, 3, 20), F.dark, 0, 1.5, 0);
        add(new T.CylinderGeometry(2.2, 3, 16, 12), F.white, 0, 11, 0);
        add(new T.BoxGeometry(8, 3, 5), F.panel, 0, 19, 0);
        const head = new T.Group(); head.position.y = 21; head.userData.keep = true; g.add(head);
        const tilt = new T.Group(); head.add(tilt);
        const bowl = new T.Mesh(new T.SphereGeometry(16, 40, 10, 0, Math.PI * 2, Math.PI * 0.62, Math.PI * 0.38), F.white); bowl.material = F.white; bowl.position.y = 15; bowl.castShadow = true; tilt.add(bowl);
        const back = new T.Mesh(new T.CylinderGeometry(3, 4, 3, 16), F.steel); back.position.y = 1; tilt.add(back);
        for (let i = 0; i < 3; i++) { const a = i / 3 * Math.PI * 2, s = new T.Mesh(new T.CylinderGeometry(0.25, 0.25, 15, 6), F.steel); s.position.set(Math.cos(a) * 5, 8, Math.sin(a) * 5); s.lookAt(0, 20, 0); s.rotateX(Math.PI / 2); tilt.add(s); }
        const feed = new T.Mesh(new T.SphereGeometry(1.2, 12, 8), F.glow); feed.position.y = 14.5; tilt.add(feed);
        tilt.rotation.x = api.flag('veshTown') ? -0.35 : -1.25; head.rotation.y = -0.8; V.dish = tilt;
      } else if (type === 'SKYPATH') {
        add(new T.BoxGeometry(40, 1, 6), F.dark, 0, 2.5, 0);
        for (const s of [-1, 1]) { add(new T.BoxGeometry(40, 0.2, 0.2), F.steel, 0, 4, s * 2.9); for (let x = -18; x <= 18; x += 6) { add(new T.BoxGeometry(0.2, 1.6, 0.2), F.steel, x, 3.2, s * 2.9); add(new T.BoxGeometry(0.6, 0.3, 0.6), F.glow, x, 3.1, s * 2.4, false); } }
        for (let x = -16; x <= 16; x += 16) add(new T.CylinderGeometry(0.6, 0.8, 2.5, 8), F.steel, x, 1.25, 0);
        V.person(g, { kind: 'astro', seed: 11520, stripe: '#e8c13a' }, 'walk', -16, 3, 0, 0, { path: { type: 'line', ax: -16, az: 0, bx: 16, bz: 0, speed: 0.9 } });
      }
    },
    tick(api) {
      // once the first families are on Vesh, a button leads straight into the eighth council meeting
      if (api.flag('opened') && !document.getElementById('nextMeeting')) {
        const b = document.createElement('button'); b.id = 'nextMeeting';
        b.innerHTML = 'GO TO THE EIGHTH COUNCIL MEETING ▶<small style="display:block;font-weight:400;font-size:10px;letter-spacing:2px;color:#ffe9b8;margin-top:3px">THE COUNCIL CHOOSES WHAT COMES NEXT</small>';
        b.style.cssText = 'position:fixed;left:50%;bottom:22px;transform:translateX(-50%);z-index:9;padding:10px 22px;font:600 14px "Segoe UI",Arial;letter-spacing:3px;color:#fff;background:rgba(120,90,20,.85);border:1px solid #ffd060;border-radius:5px;cursor:pointer;box-shadow:0 0 18px rgba(255,208,96,.45)';
        b.onmouseenter = () => b.style.background = 'rgba(160,120,30,.95)'; b.onmouseleave = () => b.style.background = 'rgba(120,90,20,.85)';
        b.onclick = () => { location.href = 'councilmeeting/councilmeeting8.html'; };
        document.body.appendChild(b);
      }
      // after the opening the shuttle stays on its pad and the families keep walking in
      if (api.flag('veshTown')) { V.shuttle(api); V.families(api); }
    },
    finish: {
      label: 'WELCOME THE FIRST FAMILIES TO VESH',
      cam: [[300, 90, 420], [430, 30, 230]],
      start(api) { this.stage = 0; this.t = 0; },
      update(api, dt, f) {
        const sh = V.shuttle(api); this.t += dt;
        if (!sh) { api.setFlag('veshTown', true); api.setFlag('opened', true); return true; }
        if (this.stage === 0) {
          // the shuttle comes down from Unity and slows on its engine
          const k = Math.min(1, this.t / 12), e = 1 - Math.pow(1 - k, 3);
          sh.position.y = 1.6 + 420 * (1 - e); sh.userData.flame.visible = k < 1; sh.userData.flame.scale.y = 0.6 + (1 - k) * 0.8;
          V.hint(k < 1 ? 'THE FIRST SHUTTLE FROM UNITY IS COMING DOWN · ' + Math.round(sh.position.y) + ' m' : 'TOUCHDOWN ON VESH');
          if (k >= 1 && this.t > 13.5) { this.stage = 1; this.t = 0; V.families(api); }
        } else if (this.stage === 1) {
          V.hint('THE FIRST 240 FAMILIES WALK TO THE PORT DOME · THEIR NEW HOMES ARE READY');
          if (this.t > 12) { this.stage = 2; this.t = 0; }
        } else if (this.stage === 2) {
          const k = Math.min(1, this.t / 6);
          if (V.dish) V.dish.rotation.x = -1.25 + 0.9 * (k * k * (3 - 2 * k));
          V.hint(k < 1 ? 'THE RADIO DISH SWINGS UP FOR ITS FIRST LOOK AT THE STARS' : 'FIRST LIGHT · THE VESH OBSERVATORY IS OPEN');
          if (this.t > 9) { this.stage = 3; this.t = 0; V.cover(true, 'THE TOWN ON VESH IS OPEN', 'ICE FOR WATER AND AIR · A SPACEPORT · HOMES FOR THE MINERS’ FAMILIES · NEXT: THE EIGHTH COUNCIL MEETING'); }
        } else {
          if (this.t > 4 && !this._h) { this._h = true; V.hint(''); api.setFlag('veshTown', true); api.setFlag('opened', true); }
          if (this.t > 6.5) { V.cover(false); this._h = false; return true; }
        }
        return false;
      },
    },
  }));
})();
