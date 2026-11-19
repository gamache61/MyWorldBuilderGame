/* ============================================================
   THE UNITY MEDICINE WORKS · BUILD 5 · THE PHARMACY DEPOT, THE DRONE PADS & OPENING DAY
   Keep this file in projects/medicineworks next to 86-medicineworks.html.
   A pharmacy depot, three drone pads, a tall red cross tower, and opening day: the ambulance drones lift off with the first medicine for every town on Unity.
   ============================================================ */
(function () {
  const P = window.PWP;
  const HX = -900, HZ = 2200;   // the middle of the Unity Medicine Works terrace (world -2150, 3250)
  // concrete, steel and hazard paint (one copy, shared by every build)
  P.pw = P.pw || function (api) {
    if (this._pw) return this._pw; const T = api.THREE, std = (c, r = 0.8, m = 0, e = {}) => new T.MeshStandardMaterial({ color: c, roughness: r, metalness: m, ...e });
    return this._pw = {
      conc: std(0xa9adb2, 0.95), conc2: std(0x8f949a, 0.95), road: std(0x3a3e45, 0.9), line: std(0xf2e6a0, 0.8), wall: std(0xd7dade, 0.7), wall2: std(0xb8bec6, 0.7, 0.2),
      steel: std(0x9aa3ad, 0.35, 0.85), steel2: std(0x6c7580, 0.4, 0.8), dark: std(0x23282f, 0.55, 0.5), white: std(0xf4f6f8, 0.45, 0.2),
      glass: new T.MeshStandardMaterial({ color: 0xbfe8ff, roughness: 0.05, metalness: 0.3, transparent: true, opacity: 0.32, side: T.DoubleSide, depthWrite: false }),
      win: new T.MeshStandardMaterial({ color: 0x20303a, emissive: 0x9fe0ff, emissiveIntensity: 0.8, roughness: 0.5 }),
      lamp: new T.MeshBasicMaterial({ color: new T.Color(2.0, 1.8, 1.2), toneMapped: false }),
    };
  };
  // the look of the Medicine Works: herbs, glasshouses, white labs, steel tanks and red crosses (one copy, shared by every build here)
  P.md = P.md || function (api) {
    if (this._md) return this._md; const T = api.THREE, std = (c, r = 0.8, m = 0, e = {}) => new T.MeshStandardMaterial({ color: c, roughness: r, metalness: m, ...e });
    return this._md = {
      soil: std(0x5a4030, 1), leaf: std(0x3f9a4a, 0.8), leaf2: std(0x2f7a3a, 0.8), herb: [0x8ac84a, 0x6fb04a, 0xb8d85a, 0xd8a8e8, 0xf2c41a].map(c => std(c, 0.8)),
      frame: std(0xe8eef2, 0.4, 0.6), wall: std(0xf4f6f8, 0.5, 0.1), teal: std(0x2fa8a0, 0.5, 0.2), red: std(0xd8302e, 0.6), tank: std(0xdfe8ee, 0.25, 0.9), roof: std(0x2f8a8a, 0.6, 0.3),
      drone: std(0xf4f6f8, 0.4, 0.3), rotor: new T.MeshStandardMaterial({ color: 0xcfd8de, roughness: 0.3, transparent: true, opacity: 0.5, side: T.DoubleSide, depthWrite: false }),
      ribbon: std(0xd8302e, 0.6, 0, { side: T.DoubleSide }),
    };
  };
  P.gy = P.gy || ((x, z) => window.coaxH(x, z));

  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 5, name: 'THE PHARMACY DEPOT, THE DRONE PADS & OPENING DAY',
    brief: 'The pharmacy depot where the medicine is stored and sent out, three landing pads for the white medicine drones, a tall lit red cross tower that can be seen from the whole terrace, then opening day, when the first drones lift off with medicine for every town on Unity.',
    types: {
      DEPOT: { code: 'FB', name: 'PHARMACY DEPOT', col: '#f4f6f8', w: 100, d: 44, h: 18 },
      PAD:   { code: 'SF', name: 'DRONE PAD',      col: '#e8eef2', w: 24, d: 24, h: 1 },
      CROSS: { code: 'HP', name: 'CROSS TOWER',    col: '#d8302e', w: 12, d: 12, h: 44 },
    },
    order: ['DEPOT', 'PAD', 'CROSS'],
    at: { DEPOT: [[HX, HZ + 190]], PAD: [[HX + 100, HZ + 190], [HX + 135, HZ + 190], [HX + 170, HZ + 190]], CROSS: [[HX - 100, HZ + 190]] },
    eye: [HX + 250, (window.__MED.Y || -85) + 190, HZ + 330],
    stats(api, c) { return [['PHARMACY DEPOT', c('DEPOT') ? 'BUILT' : 'NOT YET'], ['DRONE PADS', c('PAD') + ' / 3'], ['CROSS TOWER', c('CROSS') ? 'LIT' : 'NOT YET'], ['THE UNITY MEDICINE WORKS', api.flag('opened') ? 'OPEN' : 'NOT YET']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, H = P.pw(api), M = P.md(api);
      if (type === 'DEPOT') {
        add(new T.BoxGeometry(100, 1.4, 44), H.conc2, 0, 0.7, 0, false);
        add(new T.BoxGeometry(96, 14, 40), M.wall, 0, 8.4, 0);
        add(new T.BoxGeometry(98, 1.4, 42), M.roof, 0, 16, 0, false);
        for (let i = 0; i < 5; i++) add(new T.BoxGeometry(12, 9, 0.8), H.dark, -36 + i * 18, 6.4, -20.4, false);
        for (let i = 0; i < 9; i++) add(new T.BoxGeometry(5, 4, 0.6), H.win, -36 + i * 9, 11, 20.2, false);
        add(new T.BoxGeometry(20, 8, 4), M.teal, 0, 5, 21.6, false); add(new T.BoxGeometry(16, 6, 0.6), H.glass, 0, 5, 23.8, false);
        P.sign(api, g, 'PHARMACY DEPOT \u00b7 MEDICINE FOR EVERY TOWN', 40, 3, 0, 14, 22.4, 0, '#0c4a46', '#d8fff0');
      } else if (type === 'PAD') {
        add(new T.CylinderGeometry(12, 12, 1.2, 24), H.conc, 0, 0.6, 0, false); add(new T.CylinderGeometry(9, 9, 0.2, 24), M.teal, 0, 1.3, 0, false);
        add(new T.BoxGeometry(11, 0.3, 2.6), M.red, 0, 1.5, 0, false); add(new T.BoxGeometry(2.6, 0.3, 11), M.red, 0, 1.5, 0, false);
      } else if (type === 'CROSS') {
        add(new T.BoxGeometry(9, 2, 9), H.conc2, 0, 1, 0, false);
        add(new T.CylinderGeometry(2.2, 3, 30, 10), M.wall, 0, 17, 0);
        add(new T.BoxGeometry(12, 4, 4), H.lamp, 0, 36, 0, false); add(new T.BoxGeometry(4, 12, 4), H.lamp, 0, 36, 0, false);
        add(new T.BoxGeometry(12.6, 4.6, 3.2), M.red, 0, 36, 0, false); add(new T.BoxGeometry(4.6, 12.6, 3.2), M.red, 0, 36, 0, false);
      }
    },
    finish: {
      label: 'OPENING DAY',
      cam: [[HX + 330, 200, HZ + 380], [HX + 40, 20, HZ + 120]],
      start(api) { this.stage = 0; this.t1 = 0; this.drones = null; P.ring && P.ring(3); },
      update(api, dt, f) {
        this.t1 += dt; const T = api.THREE, off = window.PWP.OFF || [0, 0];
        const land = api.placed.find(p => p.piece && p.piece.parent), par = land ? land.piece.parent : null;
        if (this.stage === 0) {
          const M = P.md(api);
          if (par && !this.drones) {
            this.drones = [];
            for (let i = 0; i < 3; i++) {
              const d = new T.Group(); d.position.set(HX + off[0] + 100 + i * 35, 0, HZ + off[1] + 190); d.userData.y0 = window.coaxH(d.position.x, d.position.z) + 2; d.position.y = d.userData.y0; par.add(d);
              const body = new T.Mesh(new T.BoxGeometry(7, 3, 5), M.drone); body.position.y = 2; d.add(body);
              const cr1 = new T.Mesh(new T.BoxGeometry(3, 0.3, 1), M.red); cr1.position.set(0, 3.7, 0); d.add(cr1); const cr2 = new T.Mesh(new T.BoxGeometry(1, 0.3, 3), M.red); cr2.position.set(0, 3.7, 0); d.add(cr2);
              d.userData.rot = [];
              for (const [x, z] of [[-4, -3], [4, -3], [-4, 3], [4, 3]]) { const r = new T.Mesh(new T.CylinderGeometry(2.4, 2.4, 0.1, 14), M.rotor); r.position.set(x, 3.2, z); d.add(r); d.userData.rot.push(r); }
              this.drones.push(d);
            }
            this.par = par;
          }
          P.hint(this.t1 < 4 ? 'THE RIBBON IS CUT' : 'THE FIRST MEDICINE DRONES LIFT OFF FOR EVERY TOWN ON UNITY');
          if (this.drones) for (const [i, d] of this.drones.entries()) {
            const t = Math.max(0, this.t1 - 3 - i * 1.2), up = Math.min(1, t / 3), far = Math.max(0, (t - 3) / 9);
            d.position.y = d.userData.y0 + up * 40 + far * 60; d.position.x = HX + off[0] + 100 + i * 35 + (i - 1) * far * 520; d.position.z = HZ + off[1] + 190 - far * 520;
            d.rotation.y = (i - 1) * 0.5; for (const r of d.userData.rot) r.rotation.y += dt * 40 * (t > 0 ? 1 : 0.1);
          }
          if (this.t1 > 15) { this.stage = 1; this.t1 = 0; P.hint(''); P.cover(true, 'THE UNITY MEDICINE WORKS IS OPEN', 'HEALING HERBS, MEDICINE AND A DRONE SERVICE FOR EVERY TOWN ON UNITY \u00b7 +60 MILLION A MONTH FOR THE PEOPLE OF UNITY'); }
        } else {
          if (this.t1 > 4 && !this._h) { this._h = true; api.setFlag('medicineworks', true); api.setFlag('opened', true); }
          if (this.t1 > 6.5) { P.cover(false); this._h = false; return true; }
        }
        return false;
      },
    },
    tick(api, dt, t) {
      if (api.flag('opened') && !document.getElementById('nextMeeting')) {
        const b = document.createElement('button'); b.id = 'nextMeeting';
        b.innerHTML = 'GO TO THE NEXT COUNCIL MEETING \u25b6<small style="display:block;font-weight:400;font-size:10px;letter-spacing:2px;color:#d6e6f0;margin-top:3px">THE UNITY MEDICINE WORKS IS OPEN</small>';
        b.style.cssText = 'position:fixed;left:50%;bottom:22px;transform:translateX(-50%);z-index:9;padding:10px 22px;font:600 14px "Segoe UI",Arial;letter-spacing:3px;color:#fff;background:rgba(20,100,96,.88);border:1px solid #bff8e8;border-radius:6px;cursor:pointer';
        b.onmouseenter = () => b.style.background = 'rgba(30,140,134,.96)'; b.onmouseleave = () => b.style.background = 'rgba(20,100,96,.88)';
        b.onclick = () => { location.href = 'councilmeeting/councilmeeting53.html'; };
        document.body.appendChild(b);
      }
    },
  }));
})();
