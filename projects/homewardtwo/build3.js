/* ============================================================
   HOMEWARD TWO · BUILD 3 · THE COURTYARD APARTMENTS
   Keep this file in projects/homewardtwo next to 44-homewardtwo.html.
   Four-storey courtyard apartment blocks along the street, with
   balconies, roof gardens and solar roofs, and small garden courts
   between them with a fountain, trees and benches — homes for the
   families who do not need a whole house.
   ============================================================ */
(function () {
  const P = window.HW2;
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 3, name: 'THE COURTYARD APARTMENTS',
    brief: 'Four-storey apartment blocks with balconies and roof gardens along the street, and little garden courts between them with fountains and benches.',
    types: {
      APARTMENT: { code: 'HM', name: 'APARTMENT BLOCK', col: '#c9a07a', w: 90, d: 50, h: 40 },
      COURTYARD: { code: 'GD', name: 'GARDEN COURT',    col: '#3fb04a', w: 90, d: 28, h: 8 },
    },
    order: ['APARTMENT', 'COURTYARD'],
    at: { APARTMENT: [[-655, 610], [-445, 610], [-655, 690], [-445, 690]], COURTYARD: [[-655, 650], [-445, 650]] },
    eye: [-220, 220, -260],
    stats(api, c) { return [['APARTMENT BLOCKS', c('APARTMENT') + ' / 4'], ['GARDEN COURTS', c('COURTYARD') + ' / 2'], ['FLATS', c('APARTMENT') * 32]]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, H = P.h2(api);
      if (type === 'APARTMENT') {
        const w = 90, d = 50, h = 38, wallM = H.walls[(k * 2 + 1) % 6];
        // facade with rows of windows (lit a little), drawn once per block
        const tex = api.canvasTex(512, 512, (c, cw, ch) => {
          c.fillStyle = '#' + wallM.color.getHexString(); c.fillRect(0, 0, cw, ch);
          for (let r = 0; r < 4; r++) for (let q = 0; q < 8; q++) { c.fillStyle = (r * 3 + q * 5 + k) % 5 === 0 ? '#ffd9a0' : '#5d7a92'; c.fillRect(q * 64 + 14, r * 128 + 26, 36, 56); c.fillStyle = 'rgba(255,255,255,.5)'; c.fillRect(q * 64 + 14, r * 128 + 26, 36, 4); c.fillStyle = 'rgba(40,30,20,.55)'; c.fillRect(q * 64 + 6, r * 128 + 92, 52, 8); }
        });
        tex.repeat.set(1, 1);
        const fm = new T.MeshStandardMaterial({ map: tex, roughness: 0.8 });
        // the block is a U round a court: back wing and two side wings
        const th = sl.z < 650 ? 0 : Math.PI, c = Math.cos(th), sn = Math.sin(th), R = (x, z) => [x * c + z * sn, -x * sn + z * c];   // the two blocks of a pair open toward the garden court between them
        const rg = new T.Group(); rg.rotation.y = th; g.add(rg);
        add(new T.BoxGeometry(w, h, 16), fm, 0, h / 2, -17, true, rg);
        for (const s of [-1, 1]) add(new T.BoxGeometry(16, h, d), fm, s * (w / 2 - 8), h / 2, 0, true, rg);
        // roof gardens, solar panels and parapets
        for (const [x, z, bw, bd] of [[0, -17, w, 16], [-(w / 2 - 8), 0, 16, d], [(w / 2 - 8), 0, 16, d]]) {
          add(new T.BoxGeometry(bw + 1, 1, bd + 1), H.stone, x, h + 0.5, z, true, rg);
          add(new T.BoxGeometry(bw - 2, 0.6, bd - 2), H.grass, x, h + 1.2, z, false, rg);
        }
        for (let i = -3; i <= 3; i++) { const p = add(new T.BoxGeometry(8, 0.3, 5), F.solar, i * 11, h + 3, -17, true, rg); p.rotation.x = -0.4; }
        for (const s of [-1, 1]) for (let z = -16; z <= 16; z += 16) { P.tree(api, add, s * (w / 2 - 8), h + 1.5, z, 0.45, z, rg); }
        // balconies on the court side of every storey, with railings and plants
        for (let r = 1; r < 4; r++) for (let x = -34; x <= 34; x += 17) { add(new T.BoxGeometry(11, 0.5, 4), H.stone, x, r * 9.5, -8.6, true, rg); add(new T.BoxGeometry(11, 1.4, 0.2), H.timber, x, r * 9.5 + 0.9, -6.7, false, rg); add(new T.SphereGeometry(0.8, 6, 5), H.flower[(x + r) & 3], x + 3, r * 9.5 + 1.2, -7.2, false, rg); }
        // entrance on the street side, with a canopy
        for (const s of [-1, 1]) { add(new T.BoxGeometry(8, 5, 0.4), H.door[(k + (s > 0 ? 2 : 0)) % 5], s * (w / 2 - 8), 2.5, d / 2 + 0.2, false, rg); add(new T.BoxGeometry(11, 0.5, 4), H.clay, s * (w / 2 - 8), 5.6, d / 2 + 1.6, true, rg); }
        { const [sx, sz] = R(0, -25.3), [rx, rz] = R(0, -17), [ax, az] = R(-w / 2 + 18, 21), [bx, bz] = R(w / 2 - 18, 21);
          P.sign(api, g, 'HOMEWARD TWO · COURT ' + String.fromCharCode(65 + k), 22, 2.6, sx, h - 6, sz, th + Math.PI, '#4a2a22', '#ffe9c8', false);
          P.person(g, P.civ(44040 + k), 'idle', rx, h + 1.6, rz, 0);
          P.person(g, P.civ(44050 + k), 'walk', ax, 0.3, az, 0, { path: { type: 'line', ax, az, bx, bz, speed: 0.9 } }); }
      } else if (type === 'COURTYARD') {
        // a garden court: lawn, a round fountain, hedges, benches, trees and children playing
        add(new T.BoxGeometry(90, 0.5, 28), H.grass, 0, 0.25, 0, false);
        add(new T.BoxGeometry(90, 0.55, 5), H.paving, 0, 0.3, 0, false);
        add(new T.CylinderGeometry(6, 6.4, 1.2, 24), H.stone, 0, 0.8, 0); add(new T.CylinderGeometry(5.2, 5.2, 1.3, 24), H.water, 0, 0.85, 0, false);
        add(new T.CylinderGeometry(0.6, 0.9, 3.4, 8), H.stone, 0, 2.4, 0); add(new T.SphereGeometry(1.4, 10, 8), H.water, 0, 4.4, 0, false);
        for (const x of [-36, -22, 22, 36]) { P.tree(api, add, x, 0.4, -8, 0.75, x + k); P.tree(api, add, x, 0.4, 9, 0.7, x + 1); }
        for (const x of [-14, 14]) for (const z of [-5, 5]) add(new T.BoxGeometry(5, 0.9, 1.4), H.timber, x, 0.95, z * 1.0 + (z > 0 ? 2 : -2));
        for (const [x, z] of [[-30, -11], [30, 11], [-30, 11], [30, -11]]) add(new T.BoxGeometry(20, 1.6, 1.4), H.leaf, x, 1.2, z, false);
        P.person(g, P.kid(44060 + k), 'walk', 0, 0.5, 0, 0, { path: { type: 'line', ax: -30, az: 8, bx: 30, bz: 8, speed: 1.3 }, scale: 0.6 });
        P.person(g, P.kid(44062 + k), 'walk', 0, 0.5, 0, 0, { path: { type: 'line', ax: 30, az: -8, bx: -30, bz: -8, speed: 1.1 }, scale: 0.6 });
        P.person(g, P.civ(44064 + k), 'idle', -14, 0.5, 4, 0);
      }
    },
  }));
})();
