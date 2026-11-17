/* ============================================================
   THE SEASHORE HARBOR · BUILD 5 · THE SALT PANS, THE LIGHTHOUSE & OPENING DAY
   Keep this file in projects/seashoreharbor next to 84-seashoreharbor.html.
   Three white salt pans, a tall lighthouse at the harbor mouth, and opening day: the boats sail out and the first catch comes in.
   ============================================================ */
(function () {
  const P = window.PWP;
  const HX = -1950, HZ = 1100;   // the middle of the Seashore Harbor terrace (world -3200, 2150)
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
  // the look of the Works: ore, slag, fire, sand, solar glass, battery cells and tin (one copy, shared by every build)
  P.uw = P.uw || function (api) {
    if (this._uw) return this._uw; const T = api.THREE, std = (c, r = 0.8, m = 0, e = {}) => new T.MeshStandardMaterial({ color: c, roughness: r, metalness: m, ...e });
    return this._uw = {
      ore: std(0x6b4a36, 1), ore2: std(0x8a5a3c, 1), slag: std(0x3a3532, 0.95), sand: std(0xd8c690, 1), brick: std(0x9a4a34, 0.9), brick2: std(0x7a3a28, 0.9),
      fire: new T.MeshBasicMaterial({ color: new T.Color(2.6, 1.0, 0.25), toneMapped: false }), glow: new T.MeshBasicMaterial({ color: new T.Color(2.0, 1.5, 0.5), toneMapped: false }),
      solar: new T.MeshStandardMaterial({ color: 0x14306a, roughness: 0.15, metalness: 0.6, emissive: 0x0a1a40, emissiveIntensity: 0.5 }), frame: std(0xc8ced6, 0.4, 0.8),
      cell: std(0x2f9d57, 0.5, 0.4), cellw: std(0xeef2f5, 0.5, 0.2), tin: std(0xdfe4ea, 0.25, 0.9), red: std(0xc8402e, 0.7), green: std(0x3a8a44, 0.7), yellow: std(0xe8b82a, 0.7),
      smoke: new T.MeshStandardMaterial({ color: 0xcfd3d8, roughness: 1, transparent: true, opacity: 0.55, depthWrite: false }),
    };
  };
  // sea, boats, nets and salt (one copy, shared by every build here)
  P.hb = P.hb || function (api) {
    if (this._hb) return this._hb; const T = api.THREE, std = (c, r = 0.8, m = 0, e = {}) => new T.MeshStandardMaterial({ color: c, roughness: r, metalness: m, ...e });
    return this._hb = { water: new T.MeshStandardMaterial({ color: 0x2f86b0, roughness: 0.08, metalness: 0.4, transparent: true, opacity: 0.88 }), bed: std(0x1c4a66, 1), hull: [0xc8402e, 0x2f6690, 0xe8b82a, 0x3a8a44].map(c => std(c, 0.6)), hullw: std(0xf4f6f8, 0.5), wood: std(0x6a4a2a, 0.85), salt: std(0xf4f6f8, 0.9), brine: std(0xcfe6ee, 0.4), net: std(0x8aa0a8, 1), awn: [0xc8402e, 0x2f6690, 0xe8b82a, 0x3a8a44].map(c => std(c, 0.8, 0, { side: T.DoubleSide })), fish: std(0xc8d4de, 0.3, 0.8), ice: std(0xdff2fb, 0.2, 0.2) };
  };
  P.gy = P.gy || ((x, z) => window.coaxH(x, z));


  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 5, name: 'THE SALT PANS, THE LIGHTHOUSE & OPENING DAY',
    brief: 'Three shallow salt pans where the sun makes sea salt, a tall lighthouse at the harbor mouth, then opening day, when the boats sail out together and the first catch comes in.',
    types: {
      SALT:  { code: 'SF', name: 'SALT PAN',   col: '#f4f6f8', w: 44, d: 40, h: 2 },
      LIGHT: { code: 'HP', name: 'LIGHTHOUSE', col: '#f4f6f8', w: 14, d: 14, h: 60 },
    },
    order: ['SALT', 'LIGHT'],
    at: { SALT: [[HX + 190, HZ + 20], [HX + 190, HZ + 66], [HX + 190, HZ + 112]], LIGHT: [[HX + 120, HZ - 124]] },
    eye: [HX + 300, (window.__HARBOR.Y || -85) + 190, HZ + 330],
    stats(api, c) { return [['SALT PANS', c('SALT') + ' / 3'], ['THE LIGHTHOUSE', c('LIGHT') ? 'LIT' : 'NOT YET'], ['THE SEASHORE HARBOR', api.flag('opened') ? 'OPEN' : 'NOT YET']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, H = P.pw(api), S = P.hb(api);
      if (type === 'SALT') {
        add(new T.BoxGeometry(44, 1.4, 40), H.conc2, 0, 0.7, 0, false); add(new T.BoxGeometry(40, 0.8, 36), S.brine, 0, 1.5, 0, false);
        for (let i = 0; i < 6; i++) add(new T.ConeGeometry(2.4, 2.6, 6), S.salt, -15 + (i % 3) * 15, 2.6, i < 3 ? -9 : 9, false);
      } else if (type === 'LIGHT') {
        // it stands on the end of the breakwater: a stone foot from the seabed, then the tower
        const off = P.OFF || [0, 0], gy = window.coaxH(HX + 120 + off[0], HZ - 124 + off[1]), top = window.__SEA.WL + 4, ft = top - gy, fh = ft + 45;
        add(new T.CylinderGeometry(9, 10, fh, 18), H.conc2, 0, ft - fh / 2, 0);
        const y0 = ft;
        add(new T.CylinderGeometry(4.4, 6.6, 46, 16), S.hullw, 0, y0 + 23, 0);
        for (let y = 8; y < 44; y += 14) add(new T.CylinderGeometry(5.6 - y * 0.03, 5.8 - y * 0.03, 5, 16), S.hull[0], 0, y0 + y + 2.5, 0, false);
        add(new T.CylinderGeometry(6.4, 5, 2, 16), H.dark, 0, y0 + 47, 0, false); add(new T.CylinderGeometry(4, 4, 7, 14), H.lamp, 0, y0 + 51.5, 0, false);
        add(new T.ConeGeometry(5.4, 5.4, 14), S.hull[0], 0, y0 + 57.5, 0, false); add(new T.SphereGeometry(1, 8, 6), H.steel, 0, y0 + 61, 0, false);
      }
    },
    finish: {
      label: 'OPENING DAY',
      cam: [[HX + 330, 200, HZ + 260], [HX, 20, HZ - 120]],
      start(api) { this.stage = 0; this.t1 = 0; this.boats = null; P.ring && P.ring(3); },
      update(api, dt, f) {
        this.t1 += dt; const T = api.THREE, off = window.PWP.OFF || [0, 0];
        const land = api.placed.find(p => p.piece && p.piece.parent), par = land ? land.piece.parent : null;
        if (this.stage === 0) {
          if (par && !this.boats) {
            const S = P.hb(api), H = P.pw(api), y = window.__SEA.WL + 0.5; this.boats = []; this.par = par;
            for (let i = 0; i < 4; i++) {
              const b = new T.Group(); b.position.set(HX + off[0] - 100 + i * 66, y, HZ + off[1] - 60 - (i % 2) * 22); par.add(b);
              const hull = new T.Mesh(new T.BoxGeometry(30, 4, 10), S.hull[i % 4]); hull.position.y = 3; b.add(hull);
              const cab = new T.Mesh(new T.BoxGeometry(8, 6, 7), S.hullw); cab.position.set(-7, 8, 0); b.add(cab);
              const mast = new T.Mesh(new T.CylinderGeometry(0.4, 0.4, 14, 6), S.wood); mast.position.set(7, 11, 0); b.add(mast);
              const flag = new T.Mesh(new T.BoxGeometry(5, 3, 0.2), S.awn[i % 4]); flag.position.set(9.6, 16, 0); b.add(flag);
              this.boats.push(b);
            }
          }
          P.hint(this.t1 < 8 ? 'THE FISHING BOATS SAIL OUT FOR THE FIRST CATCH' : 'THE LIGHTHOUSE LIGHTS · THE BOATS COME HOME LOADED');
          if (this.boats) for (const [i, b] of this.boats.entries()) {
            const t = this.t1; b.position.x += (t < 8 ? -1 : 1) * 0 + 0;   // keep x, sail along z
            const out = t < 8 ? t / 8 : Math.max(0, 1 - (t - 8) / 6);
            b.position.z = HZ + off[1] - 60 - (i % 2) * 22 - out * 90; b.rotation.y = (t < 8 ? 0.06 : -0.06) * Math.sin(t * 2 + i); b.position.y = window.__SEA.WL + 0.5 + Math.sin(t * 2 + i) * 0.25;
          }
          if (this.t1 > 15) { this.stage = 1; this.t1 = 0; P.hint(''); P.cover(true, 'THE SEASHORE HARBOR IS OPEN', 'FISH AND SEA SALT FOR UNITY AND ITS TOWNS · +70 MILLION A MONTH FOR THE PEOPLE OF UNITY'); }
        } else {
          if (this.t1 > 4 && !this._h) { this._h = true; api.setFlag('seashoreharbor', true); api.setFlag('opened', true); }
          if (this.t1 > 6.5) { P.cover(false); this._h = false; return true; }
        }
        return false;
      },
    },
    tick(api, dt, t) {
      if (api.flag('opened') && !document.getElementById('nextMeeting')) {
        const b = document.createElement('button'); b.id = 'nextMeeting';
        b.innerHTML = 'GO TO THE NEXT COUNCIL MEETING ▶<small style="display:block;font-weight:400;font-size:10px;letter-spacing:2px;color:#d6e6f0;margin-top:3px">THE SEASHORE HARBOR IS OPEN</small>';
        b.style.cssText = 'position:fixed;left:50%;bottom:22px;transform:translateX(-50%);z-index:9;padding:10px 22px;font:600 14px "Segoe UI",Arial;letter-spacing:3px;color:#fff;background:rgba(20,70,110,.88);border:1px solid #bfe8ff;border-radius:6px;cursor:pointer';
        b.onmouseenter = () => b.style.background = 'rgba(40,100,150,.96)'; b.onmouseleave = () => b.style.background = 'rgba(20,70,110,.88)';
        b.onclick = () => { location.href = 'councilmeeting/councilmeeting51.html'; };
        document.body.appendChild(b);
      }
    },
  }));
})();
