/* ============================================================
   THE UNITY WORKS · BUILD 5 · THE CANNERY & OPENING DAY
   Keep this file in projects/unityworks next to 83-unityworks.html.
   A cannery with a water tank and pallets of tins, then opening day: the ribbon across the road is cut, the stacks and the kiln light, and the Unity Works begins to earn for Unity.
   ============================================================ */
(function () {
  const P = window.PWP;
  const HX = -900, HZ = 1100;   // the middle of the Unity Works terrace (world -2150, 2150)
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 5, name: 'THE CANNERY & OPENING DAY',
    brief: 'A cannery for the food of the Farmlands and the Seashore, with its water tank and pallets of shining tins, then opening day, when the ribbon across the road is cut and the Unity Works begins to earn for Unity.',
    types: {
      CANNERY: { code: 'FB', name: 'THE CANNERY',  col: '#e8e2d8', w: 110, d: 70, h: 30 },
      TANK:    { code: 'HP', name: 'WATER TANK',   col: '#9aa3ad', w: 18,  d: 18, h: 36 },
      PALLET:  { code: 'SF', name: 'TIN PALLET',   col: '#dfe4ea', w: 20,  d: 20, h: 8 },
    },
    order: ['CANNERY', 'TANK', 'PALLET'],
    at: { CANNERY: [[HX + 225, HZ + 95]], TANK: [[HX + 270, HZ + 160]], PALLET: [[HX + 190, HZ + 170], [HX + 218, HZ + 170]] },
    eye: [HX + 300, (window.__WORKS.Y || -85) + 190, HZ + 330],
    stats(api, c) { return [['THE CANNERY', c('CANNERY') ? 'CANNING' : 'NOT YET'], ['WATER TANK', c('TANK') ? 'FULL' : 'NOT YET'], ['TIN PALLETS', c('PALLET') + ' / 2'], ['THE UNITY WORKS', api.flag('opened') ? 'OPEN' : 'NOT YET']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, H = P.pw(api), U = P.uw(api);
      if (type === 'CANNERY') {
        add(new T.BoxGeometry(110, 22, 70), H.white, 0, 11, 0); add(new T.BoxGeometry(114, 1.4, 74), U.red, 0, 22.7, 0, false);
        const r1 = add(new T.BoxGeometry(114, 1.2, 40), H.steel, 0, 27, -17); r1.rotation.x = 0.22; const r2 = add(new T.BoxGeometry(114, 1.2, 40), H.steel, 0, 27, 17); r2.rotation.x = -0.22;
        for (let i = 0; i < 5; i++) add(new T.BoxGeometry(12, 6, 0.6), H.win, -38 + i * 19, 14, 35.4, false);
        add(new T.BoxGeometry(18, 14, 0.8), H.dark, -52, 7, 35.4, false);
        add(new T.BoxGeometry(70, 0.9, 5), H.steel2, 0, 3.4, 40, false); for (let i = 0; i < 12; i++) add(new T.CylinderGeometry(1.1, 1.1, 1.8, 10), U.tin, -30 + i * 5.4, 4.7, 40, false);
        P.sign(api, g, 'THE UNITY CANNERY', 40, 4, 0, 28, 36, 0, '#7a1f16', '#ffffff');
        P.person(g, P.civ(83050), 'idle', -20, 0.5, 46, 0); P.person(g, P.civ(83051), 'tablet', 10, 0.5, 48, 0);
      } else if (type === 'TANK') {
        add(new T.CylinderGeometry(7.4, 7.4, 22, 18), H.wall2, 0, 21, 0); add(new T.SphereGeometry(7.6, 14, 8, 0, Math.PI * 2, 0, Math.PI / 2), H.wall2, 0, 32, 0);
        for (const [x, z] of [[-5, -5], [5, -5], [-5, 5], [5, 5]]) add(new T.CylinderGeometry(0.5, 0.5, 11, 6), H.steel2, x, 5.5, z, false);
        add(new T.CylinderGeometry(0.4, 0.4, 24, 6), H.steel2, 8, 12, 0, false);
      } else if (type === 'PALLET') {
        add(new T.BoxGeometry(20, 1, 20), H.dark, 0, 0.5, 0, false);
        for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) add(new T.CylinderGeometry(2.4, 2.4, 6, 12), U.tin, -6 + i * 6, 4, -6 + j * 6, false);
        for (let i = 0; i < 3; i++) add(new T.CylinderGeometry(2.45, 2.45, 2, 12), [U.red, U.green, U.yellow][(i + k) % 3], -6 + i * 6, 4, 0, false);
      }
    },
    finish: {
      label: 'OPENING DAY',
      cam: [[HX + 330, 230, HZ + 300], [HX + 120, 40, HZ]],
      start(api) { this.stage = 0; this.t1 = 0; this.bits = []; this.rib = null; P.ring && P.ring(3); },
      update(api, dt, f) {
        this.t1 += dt; const T = api.THREE, off = window.PWP.OFF || [0, 0];
        const land = api.placed.find(p => p.piece && p.piece.parent), par = land ? land.piece.parent : null;
        if (this.stage === 0) {
          if (par && !this.rib) {
            const U = P.uw(api), x = HX + 150 + off[0], z = HZ + off[1], y = (window.__WORKS.Y || 0) + 2.6;
            this.rib = new T.Group(); this.rib.position.set(x, y, z); par.add(this.rib);
            const band = new T.Mesh(new T.BoxGeometry(0.5, 2.4, 34), U.red); band.position.y = 9; this.rib.add(band); this.band = band;
            for (const s of [-1, 1]) { const pole = new T.Mesh(new T.CylinderGeometry(0.5, 0.6, 14, 8), U.frame); pole.position.set(0, 7, s * 17.5); this.rib.add(pole); }
            this.x = x; this.y = y; this.z = z; this.par = par;
          }
          P.hint(this.t1 < 6 ? 'THE RIBBON ACROSS THE ROAD · THE UNITY WORKS IS ABOUT TO OPEN' : 'THE RIBBON IS CUT · THE STACKS AND THE KILN LIGHT');
          if (this.t1 > 6 && this.band && this.band.visible) {
            this.band.visible = false; const cols = [0xc8402e, 0xe8b82a, 0x3a8a44, 0x2f6690, 0xf2f2f2];
            for (let i = 0; i < 70; i++) { const m = new T.Mesh(new T.BoxGeometry(0.7, 0.2, 0.7), new T.MeshBasicMaterial({ color: cols[i % 5] })); m.position.set(this.x, this.y + 8, this.z + (i % 14 - 7) * 2); this.par.add(m); this.bits.push({ m, vx: (Math.random() - 0.5) * 14, vy: 14 + Math.random() * 14, vz: (Math.random() - 0.5) * 12 }); }
          }
          for (const b of this.bits) { b.vy -= 22 * dt; b.m.position.x += b.vx * dt; b.m.position.y += b.vy * dt; b.m.position.z += b.vz * dt; b.m.rotation.x += dt * 6; if (b.m.position.y < this.y) { b.m.position.y = this.y; b.vy = 0; b.vx *= 0.6; b.vz *= 0.6; } }
          if (this.t1 > 15) { this.stage = 1; this.t1 = 0; P.hint(''); for (const b of this.bits) b.m.visible = false; if (this.rib) this.rib.visible = false; P.cover(true, 'THE UNITY WORKS IS OPEN', 'ORE, GLASS, SUN AND FOOD MADE ON UNITY · +90 MILLION A MONTH FOR THE PEOPLE OF UNITY'); }
        } else {
          if (this.t1 > 4 && !this._h) { this._h = true; api.setFlag('unityworks', true); api.setFlag('opened', true); }
          if (this.t1 > 6.5) { P.cover(false); this._h = false; return true; }
        }
        return false;
      },
    },
    tick(api, dt, t) {
      if (api.flag('opened') && !document.getElementById('nextMeeting')) {
        const b = document.createElement('button'); b.id = 'nextMeeting';
        b.innerHTML = 'GO TO THE NEXT COUNCIL MEETING ▶<small style="display:block;font-weight:400;font-size:10px;letter-spacing:2px;color:#d6e6f0;margin-top:3px">THE UNITY WORKS IS OPEN</small>';
        b.style.cssText = 'position:fixed;left:50%;bottom:22px;transform:translateX(-50%);z-index:9;padding:10px 22px;font:600 14px "Segoe UI",Arial;letter-spacing:3px;color:#fff;background:rgba(40,70,100,.88);border:1px solid #bfe8ff;border-radius:6px;cursor:pointer';
        b.onmouseenter = () => b.style.background = 'rgba(60,100,140,.96)'; b.onmouseleave = () => b.style.background = 'rgba(40,70,100,.88)';
        b.onclick = () => { location.href = 'councilmeeting/councilmeeting50.html'; };
        document.body.appendChild(b);
      }
    },
  }));
})();
