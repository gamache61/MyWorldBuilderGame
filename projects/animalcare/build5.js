/* ============================================================
   THE ANIMAL CARE CENTRE · BUILD 5 · THE GREEN BRIDGE & RELEASE DAY
   Keep this file in projects/animalcare next to animalcare.html.
   A green bridge over the forest path, so the animals can cross
   without meeting people, and the gate facing the city. Ends with L:
   release day — the first healed deer walks out of the refuge, over
   the green bridge and back into the forest, while the families watch.
   ============================================================ */
(function () {
  const P = window.VET;
  P.hint = (text) => {
    let el = document.getElementById('playHint');
    if (!el) { el = document.createElement('div'); el.id = 'playHint'; el.style.cssText = 'position:fixed;left:50%;bottom:90px;transform:translateX(-50%);z-index:8;padding:8px 18px;background:rgba(8,20,35,.85);border:1px solid #b8f090;border-radius:5px;color:#fff;font:600 13px "Segoe UI",Arial;letter-spacing:3px;text-align:center;pointer-events:none'; document.body.appendChild(el); }
    el.style.display = text ? 'block' : 'none'; if (text) el.textContent = text;
  };
  P.cover = (on, a, b) => {
    let el = document.getElementById('playCover');
    if (!el) { el = document.createElement('div'); el.id = 'playCover'; el.style.cssText = 'position:fixed;inset:0;z-index:8;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:0 40px;background:rgba(8,16,28,.92);color:#fff;font-family:"Segoe UI",Arial;opacity:0;transition:opacity 1.2s;pointer-events:none'; document.body.appendChild(el); }
    if (on) el.innerHTML = '<div style="font-size:26px;letter-spacing:7px;font-weight:600">' + a + '</div><div style="font-size:14px;letter-spacing:4px;margin-top:12px;color:#dcffc8">' + (b || '') + '</div>';
    el.style.opacity = on ? 1 : 0;
  };
  // release day: a healed deer walks from the gate of the first refuge, over the green bridge and away into the forest
  P.release = { t: -1, deer: null };
  P.startRelease = (api) => {
    if (P.release.deer) return; const br = api.placed.find(p => p.type === 'GREENBRIDGE' && p.piece); if (!br) return;
    const g = br.piece.parent, T = api.THREE, d = P.animal(api, (geo, m, x, y, z, sh, parent) => { const o = new T.Mesh(geo, m); o.position.set(x, y, z); o.castShadow = true; parent.add(o); return o; }, g, 'deer', 1180, P.ground(api, 1180, -140) + 0.4, -140, 0, 3);
    P.release.deer = d; P.release.t = 0;
    for (let i = 0; i < 8; i++) P.person(g, i % 3 === 1 ? P.kid(20800 + i) : P.civ(20800 + i), 'idle', 1205 + (i % 4) * 3, P.ground(api, 1200, 30), 22 + (i >> 2) * 3, Math.PI, i % 3 === 1 ? { scale: 0.6 } : {});
  };
  P.stepRelease = (api, dt) => {
    const R = P.release; if (!R.deer || R.t < 0) return; R.t += dt;
    // path: out of the refuge to the bridge, over it, then off east into the trees
    const pts = [[1180, -140], [1220, -60], [1255, -20], [1255, 30], [1290, 80], [1420, 160]], seg = Math.min(pts.length - 2, Math.floor(R.t / 5)), f = Math.min(1, R.t / 5 - seg);
    const [x0, z0] = pts[seg], [x1, z1] = pts[seg + 1], x = x0 + (x1 - x0) * f, z = z0 + (z1 - z0) * f;
    const onBridge = Math.abs(x - 1255) < 4 && Math.abs(z) < 35;
    R.deer.position.set(x, P.ground(api, x, z) + 0.4 + (onBridge ? (Math.abs(z) < 10 ? 8.6 : 8.6 * (1 - (Math.abs(z) - 10) / 25)) : 0), z); R.deer.rotation.y = -Math.atan2(z1 - z0, x1 - x0);
    if (R.t > 26) R.deer.visible = false;
  };
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 5, name: 'THE GREEN BRIDGE & RELEASE DAY',
    brief: 'A green bridge over the forest path so the animals can cross without meeting people, and the gate facing the city — then release day.',
    types: {
      GREENBRIDGE: { code: 'GD', name: 'GREEN BRIDGE', col: '#5f9e3a', w: 40, d: 70, h: 12 },
      VETGATE:     { code: 'HP', name: 'CENTRE GATE', col: '#b8f090', w: 8, d: 60, h: 28 },
    },
    order: ['GREENBRIDGE', 'VETGATE'],
    at: { GREENBRIDGE: [[1255, 0]], VETGATE: [[925, 0]] },
    eye: [-240, 200, 280],
    stats(api, c) { return [['GREEN BRIDGE', c('GREENBRIDGE') ? 'OPEN' : 'NOT YET'], ['CENTRE GATE', c('VETGATE') ? 'STANDING' : 'NOT YET'], ['ANIMALS SET FREE', api.flag('animalOpen') ? '1 AND COUNTING' : 'NOT YET']]; },
    make(type, k, g, add, F, api) {
      const T = api.THREE, S = P.hm(api), C = P.fun(api);
      if (type === 'GREENBRIDGE') {
        // a planted arch over the path, wide enough for deer, with hedges along its edges
        add(new T.BoxGeometry(30, 1.6, 20), S.stone, 0, 7.4, 0); add(new T.BoxGeometry(28, 0.4, 20), C.grass, 0, 8.4, 0);
        for (const s of [-1, 1]) { const r = add(new T.BoxGeometry(30, 1.6, 27), S.stone, 0, 4, s * 22.5); r.rotation.x = s * 0.3; const gr = add(new T.BoxGeometry(28, 0.4, 27), C.grass, 0, 4.9, s * 22.5); gr.rotation.x = s * 0.3; }
        for (const x of [-11, 11]) add(new T.BoxGeometry(3, 7, 3), S.stone, x, 3.4, 0);
        for (const s of [-1, 1]) for (let z = -30; z <= 30; z += 5) add(new T.IcosahedronGeometry(1.6, 0), F.crops[2], s * 13.5, (Math.abs(z) < 10 ? 9.6 : 9.6 - (Math.abs(z) - 10) * 0.31), z, false);
        for (let i = 0; i < 6; i++) add(new T.IcosahedronGeometry(1.6, 0), F.crops[(i + 1) % 5], -6 + (i % 3) * 6, 9.4, -6 + (i >> 2) * 12, false);
        P.sign(api, g, 'GREEN BRIDGE · ANIMALS CROSSING', 16, 2, -15.2, 3, 0, -Math.PI / 2, '#3a2a1a', '#e8d8b0', false);
      } else if (type === 'VETGATE') {
        // a timber gate with a green heart and a paw, facing the city
        for (const s of [-1, 1]) { add(new T.BoxGeometry(5, 20, 5), S.timber, 0, 10, s * 20); add(new T.SphereGeometry(1.2, 10, 8), F.lamp, 0, 21, s * 20, false); }
        add(new T.BoxGeometry(4, 4, 46), S.timber, 0, 22, 0);
        P.sign(api, g, 'ANIMAL CARE CENTRE', 34, 3, -2.1, 22, 0, -Math.PI / 2, '#ffffff', '#3a7a2a', false);
        P.sign(api, g, 'GO GENTLY · ANIMALS CROSSING', 34, 3, 2.1, 22, 0, Math.PI / 2, '#ffffff', '#3a7a2a', false);
        add(new T.BoxGeometry(30, 0.4, 12), C.path, -15, 0.25, 0, false);
        for (const s of [-1, 1]) for (let i = 0; i < 3; i++) add(new T.IcosahedronGeometry(1.8, 0), i % 2 ? F.flower : F.crops[i], -4 - i * 5, 1.6, s * 25, false);
      }
    },
    tick(api, dt) {
      // once the centre is open, a button leads straight into the sixteenth council meeting
      if (api.flag('opened') && !document.getElementById('nextMeeting')) {
        const b = document.createElement('button'); b.id = 'nextMeeting';
        b.innerHTML = 'GO TO THE SIXTEENTH COUNCIL MEETING ▶<small style="display:block;font-weight:400;font-size:10px;letter-spacing:2px;color:#dcffc8;margin-top:3px">THE COUNCIL CHOOSES WHAT COMES NEXT</small>';
        b.style.cssText = 'position:fixed;left:50%;bottom:22px;transform:translateX(-50%);z-index:9;padding:10px 22px;font:600 14px "Segoe UI",Arial;letter-spacing:3px;color:#fff;background:rgba(50,100,40,.85);border:1px solid #b8f090;border-radius:5px;cursor:pointer;box-shadow:0 0 18px rgba(184,240,144,.45)';
        b.onmouseenter = () => b.style.background = 'rgba(65,130,50,.95)'; b.onmouseleave = () => b.style.background = 'rgba(50,100,40,.85)';
        b.onclick = () => { location.href = 'councilmeeting/councilmeeting16.html'; };
        document.body.appendChild(b);
      }
      P.stepRelease(api, dt);
    },
    finish: {
      label: 'RELEASE DAY',
      cam: [[1170, 80, 170], [1255, 5, 0]],
      start(api) { this.stage = 0; this.t1 = 0; P.startRelease(api); },
      update(api, dt, f) {
        this.t1 += dt;
        if (this.stage === 0) {
          P.hint('RELEASE DAY · THE FIRST HEALED DEER WALKS OUT OF THE REFUGE');
          if (this.t1 > 14) { this.stage = 1; this.t1 = 0; }
        } else if (this.stage === 1) {
          P.hint('OVER THE GREEN BRIDGE AND HOME TO THE FOREST · NO WILD ANIMAL ON UNITY IS EVER HUNTED');
          if (this.t1 > 12) { this.stage = 2; this.t1 = 0; P.hint(''); P.cover(true, 'THE ANIMAL CARE CENTRE IS OPEN', 'THE ANIMAL CLINIC · THE FARM BARN · THE WILDLIFE REFUGE · THE RANGERS · THE AVIARY · THE GREEN BRIDGE · NEXT: THE SIXTEENTH COUNCIL MEETING'); }
        } else {
          if (this.t1 > 4 && !this._h) { this._h = true; api.setFlag('animalOpen', true); api.setFlag('opened', true); }
          if (this.t1 > 6.5) { P.cover(false); this._h = false; return true; }
        }
        return false;
      },
    },
  }));
})();
