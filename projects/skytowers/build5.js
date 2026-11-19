/* ============================================================
   SKY TOWERS & GARDEN HOMES · BUILD 5 · THE SKY BRIDGES, THE FLOWER GARDENS & OPENING DAY
   Keep this file in projects/skytowers next to 85-skytowers.html.
   Two glass sky bridges between the towers, three flower gardens, a lit sky beacon, then opening day.
   ============================================================ */
(function () {
  const P = window.PWP;
  const HX = -900, HZ = 0;   // the middle of the Sky Towers terrace (world -2150, 1050)
  // Kryos look: blue glass, white walls with green roofs, stone, trees and water (one copy, shared by every build here)
  P.sk = P.sk || function (api) {
    if (this._sk) return this._sk; const T = api.THREE, std = (c, r = 0.8, m = 0, e = {}) => new T.MeshStandardMaterial({ color: c, roughness: r, metalness: m, ...e });
    const gt = hue => api.canvasTex(128, 512, (c, w, h) => { c.fillStyle = `hsl(${hue},50%,52%)`; c.fillRect(0, 0, w, h); for (let y = 0; y < h; y += 16) { c.fillStyle = 'rgba(15,35,65,.4)'; c.fillRect(0, y, w, 3); } for (let x = 0; x < w; x += 16) { c.fillStyle = 'rgba(15,35,65,.3)'; c.fillRect(x, 0, 2, h); } for (let i = 0; i < 90; i++) { c.fillStyle = 'rgba(255,255,255,.12)'; c.fillRect(Math.random() * w, Math.random() * h, 12, 8); } });
    const gm = [205, 212, 198, 220, 208, 200].map(hue => { const t = gt(hue); t.repeat.set(2, 3); return new T.MeshStandardMaterial({ map: t, metalness: 0.75, roughness: 0.12 }); });
    return this._sk = {
      glass: gm, trim: std(0xf4f6f8, 0.25, 0.3), wall: std(0xf0f2f4, 0.5, 0.1), wall2: std(0xdfe4ea, 0.6), roof: std(0x4f9a3c, 0.95), roof2: std(0x6fb04a, 0.95), grass: std(0x5f9a42, 1), leaf: std(0x3f8f3a, 0.9, 0, { flatShading: true }), leaf2: std(0x6fb040, 0.9, 0, { flatShading: true }),
      blossom: std(0xf2a0c0, 0.8, 0, { flatShading: true }), trunk: std(0x5a4030, 0.9), stone: std(0xcfc8ba, 0.9), stone2: std(0xa9a294, 0.9), path: std(0xe6dcc0, 0.95), wood: std(0x7a5a3a, 0.85), water: new T.MeshStandardMaterial({ color: 0x3f9ac8, roughness: 0.05, metalness: 0.4, transparent: true, opacity: 0.85 }),
      steel: std(0x9aa3ad, 0.35, 0.85), dark: std(0x2a2f38, 0.5, 0.5), win: new T.MeshStandardMaterial({ color: 0x20303a, emissive: 0x9fe0ff, emissiveIntensity: 0.7, roughness: 0.5 }),
      door: std(0x3a6f9a, 0.6), awn: [0xc8402e, 0x2f6690, 0xe8b82a, 0x3a8a44, 0xf06aa8, 0x8a4fd6].map(c => std(c, 0.8, 0, { side: T.DoubleSide })), flower: [0xe8402e, 0xf2c41a, 0xf06aa8, 0xffffff].map(c => std(c, 0.8)),
      glassP: new T.MeshStandardMaterial({ color: 0xbfe8ff, roughness: 0.05, metalness: 0.3, transparent: true, opacity: 0.32, side: T.DoubleSide, depthWrite: false }),
      lamp: new T.MeshBasicMaterial({ color: new T.Color(2.0, 1.8, 1.2), toneMapped: false }), glow: new T.MeshBasicMaterial({ color: new T.Color(0.6, 1.6, 2.4), toneMapped: false }),
      rail: std(0x6c7580, 0.4, 0.8), train: std(0xeef2f5, 0.3, 0.4), trainb: std(0x2f6690, 0.4, 0.4),
    };
  };
  P.gy = P.gy || ((x, z) => window.coaxH(x, z));
  const tree = (add, S, x, y, z, s = 1, b = false) => { add(new P.THREE_CYL(0.3 * s, 0.45 * s, 4 * s, 5), S.trunk, x, y + 2 * s, z, false); add(new P.THREE_ICO(3.4 * s, 0), b ? S.blossom : S.leaf, x, y + 6.2 * s, z, false); };

  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 5, name: 'THE SKY BRIDGES, THE FLOWER GARDENS & OPENING DAY',
    brief: 'Two glass sky bridges joining the towers high up, three flower gardens, a lit beacon, then opening day, when the first Sky Rail train comes in and the first families move in.',
    types: {
      BRIDGE: { code: 'SF', name: 'SKY BRIDGE',   col: '#bfe8ff', w: 70, d: 10, h: 8 },
      GARDEN: { code: 'HP', name: 'FLOWER GARDEN', col: '#f06aa8', w: 56, d: 40, h: 6 },
      BEACON: { code: 'SY', name: 'SKY BEACON',   col: '#40d0ff', w: 10, d: 10, h: 80 },
    },
    order: ['BEACON', 'GARDEN', 'BRIDGE'],
    at: { BEACON: [[HX, HZ + 180]], GARDEN: [[HX - 190, HZ + 150], [HX + 170, HZ + 120], [HX + 170, HZ + 170]], BRIDGE: [[HX - 50, HZ - 140], [HX + 50, HZ - 140]] },
    eye: [HX + 230, (window.__SKY.Y || -85) + 190, HZ + 330],
    stats(api, c) { return [['SKY BRIDGES', c('BRIDGE') + ' / 2'], ['FLOWER GARDENS', c('GARDEN') + ' / 3'], ['SKY BEACON', c('BEACON') ? 'LIT' : 'NOT YET'], ['SKY TOWERS & GARDEN HOMES', api.flag('opened') ? 'OPEN' : 'NOT YET']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, S = P.sk(api); P.THREE_CYL = T.CylinderGeometry; P.THREE_ICO = T.IcosahedronGeometry;
      if (type === 'BRIDGE') {
        add(new T.BoxGeometry(70, 0.8, 8), S.steel, 0, 0, 0); add(new T.BoxGeometry(70, 6, 8), S.glassP, 0, 3.4, 0, false); add(new T.BoxGeometry(70, 0.8, 8.4), S.trim, 0, 6.8, 0, false);
        add(new T.BoxGeometry(68, 0.6, 1.4), S.glow, 0, 0.6, 0, false);
        for (let i = 0; i < 4; i++) P.person(g, P.civ(85500 + k * 4 + i), 'idle', -22 + i * 14, 108.4, 0, i % 2 ? 1.57 : -1.57);
        g.userData.sky = true;
        for (const ch of g.children) ch.position.y += 108;
      } else if (type === 'GARDEN') {
        add(new T.BoxGeometry(56, 0.8, 40), S.stone, 0, 0.4, 0, false);
        for (let i = 0; i < 3; i++) { add(new T.BoxGeometry(48, 1.4, 9), S.wood, 0, 1.5, -12 + i * 12, false); add(new T.BoxGeometry(46, 0.6, 7), S.grass, 0, 2.4, -12 + i * 12, false);
          for (let j = 0; j < 12; j++) add(new T.SphereGeometry(0.8, 6, 5), S.flower[(i + j) % 4], -22 + j * 4, 3.2, -12 + i * 12 + ((j % 2) - 0.5) * 3, false); }
        tree(add, S, -24, 0.8, 17, 1.1, true); tree(add, S, 24, 0.8, 17, 1.1, false);
        P.person(g, P.civ(85520 + k), 'idle', 0, 0.8, 17, Math.PI);
      } else if (type === 'BEACON') {
        add(new T.CylinderGeometry(3.4, 4.4, 3, 12), S.stone2, 0, 1.5, 0); add(new T.CylinderGeometry(0.8, 1.4, 74, 8), S.steel, 0, 40, 0);
        const ring = add(new T.TorusGeometry(4.2, 0.35, 6, 24), S.glow, 0, 70, 0, false); ring.rotation.x = Math.PI / 2;
        const top = add(new T.SphereGeometry(1.6, 10, 8), S.glow, 0, 78.4, 0, false); api.blink(top, 1.2, 0x40d0ff);
      }
    },
    finish: {
      label: 'OPENING DAY',
      cam: [[HX + 300, 150, HZ + 250], [HX + 60, 40, HZ - 80]],
      start(api) { this.stage = 0; this.t1 = 0; this.train = null; P.ring && P.ring(3); },
      update(api, dt, f) {
        this.t1 += dt; const T = api.THREE, off = window.PWP.OFF || [0, 0], S = P.sk(api);
        const land = api.placed.find(p => p.piece && p.piece.parent), par = land ? land.piece.parent : null;
        if (this.stage === 0) {
          if (par && !this.train) {
            const gy = window.coaxH(HX + 150 + off[0], HZ - 158 + off[1]); const t = new T.Group(); this.par = par;
            for (let i = 0; i < 4; i++) { const car = new T.Mesh(new T.BoxGeometry(22, 6, 6), i % 2 ? S.train : S.trainb); car.position.set(-i * 24, 3, 0); t.add(car); const w = new T.Mesh(new T.BoxGeometry(18, 1.6, 6.2), S.win); w.position.set(-i * 24, 4, 0); t.add(w); }
            t.position.set(HX + off[0] + 150 + 300, gy + 25.4, HZ + off[1] - 158.5); par.add(t); this.train = t; this.gy = gy;
          }
          P.hint(this.t1 < 9 ? 'THE FIRST SKY RAIL TRAIN COMES IN TO THE NEW STOP' : 'THE TOWERS LIGHT UP · THE FIRST FAMILIES MOVE IN');
          if (this.train) { const a = Math.min(1, this.t1 / 9), e = 1 - Math.pow(1 - a, 2); this.train.position.x = HX + off[0] + 150 + 300 * (1 - e) + 36; }
          if (this.t1 > 14) { this.stage = 1; this.t1 = 0; P.hint(''); P.cover(true, 'THE SKY TOWERS & GARDEN HOMES ARE OPEN', 'NEW HOMES FOR THE PEOPLE OF KRYOS · THEY STAY FREE · THE MARKET ADDS 40 MILLION A MONTH'); }
        } else {
          if (this.t1 > 4 && !this._h) { this._h = true; api.setFlag('skytowers', true); api.setFlag('opened', true); }
          if (this.t1 > 6.5) { P.cover(false); this._h = false; return true; }
        }
        return false;
      },
    },
    tick(api, dt, t) {
      if (api.flag('opened') && !document.getElementById('nextMeeting')) {
        const b = document.createElement('button'); b.id = 'nextMeeting';
        b.innerHTML = 'GO TO THE NEXT COUNCIL MEETING ▶<small style="display:block;font-weight:400;font-size:10px;letter-spacing:2px;color:#d6e6f0;margin-top:3px">THE SKY TOWERS & GARDEN HOMES ARE OPEN</small>';
        b.style.cssText = 'position:fixed;left:50%;bottom:22px;transform:translateX(-50%);z-index:9;padding:10px 22px;font:600 14px "Segoe UI",Arial;letter-spacing:3px;color:#fff;background:rgba(20,70,110,.88);border:1px solid #bfe8ff;border-radius:6px;cursor:pointer';
        b.onmouseenter = () => b.style.background = 'rgba(40,100,150,.96)'; b.onmouseleave = () => b.style.background = 'rgba(20,70,110,.88)';
        b.onclick = () => { location.href = 'councilmeeting/councilmeeting52.html'; };
        document.body.appendChild(b);
      }
    },
  }));
})();
