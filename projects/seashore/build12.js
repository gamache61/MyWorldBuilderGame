/* ============================================================
   SEAPORT · BUILD 12 · SKYPORT & SKY FLEET
   Keep this file in projects/seaport next to seaport.html.
   Trip 1 — the skyport terminal and 6 raised landing pads among
            the towers.
   Trip 2 — the traffic tower and 12 passenger craft.
   Build 12 ends when you launch the fleet (press L). The craft then
            fly along the waterfront, over the harbour and round the
            skyline for good. The seaport is complete.
   ============================================================ */
(function () {
  const C = KRYOS.SKYPORT, PAD_H = 42, TAU = Math.PI * 2;
  const padAt = k => { const a = k / 6 * TAU; return [Math.round(C[0] + Math.cos(a) * 150), Math.round(C[1] + Math.sin(a) * 150)]; };
  const craftAt = k => { const p = Math.floor(k / 2), a = p / 6 * TAU, s = k % 2 ? 1 : -1; return [Math.round(C[0] + Math.cos(a) * 150 - Math.sin(a) * 8 * s), Math.round(C[1] + Math.sin(a) * 150 + Math.cos(a) * 8 * s)]; };
  // flight lanes: 0 = along the waterfront · 1 = round the skyline up high · 2 = from the skyport out over the harbour
  const route = (i, t, out) => {
    const lane = i % 3, ph = i * 1.7;
    if (lane === 0) { const u = Math.sin(t * 0.04 + ph); out.set(-150 + Math.sin(t * 0.3 + ph) * 15 - (i % 4) * 20, 70 + (i % 4) * 20, u * 950); }
    else if (lane === 1) { const a = t * 0.03 * (i % 2 ? 1 : -1) + ph, R = 1050; out.set(500 + Math.cos(a) * R, 520 + (i % 4) * 25, Math.sin(a) * R); }
    else { const u = 0.5 + 0.5 * Math.sin(t * 0.04 + ph); out.set(860 - u * 1500, 170 + (i % 3) * 30, Math.sin(t * 0.05 + ph * 2) * 300); }
    return out;
  };
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(KRYOS.cityBuild({
    id: 12,
    name: 'SKYPORT & SKY FLEET',
    brief: 'A skyport among the towers, with raised pads, a traffic tower and passenger craft that fly people along the waterfront and over the harbour.',
    finishLabel: 'LAUNCH THE CITY FLEET', flags: ['sfleet'], status: ['SKY FLEET', '12 CRAFT FLYING'],
    focus: C, lookUp: 60,
    parts: {
      KTERM: {
        name: 'SKYPORT TERMINAL', code: 'SY', col: '#e8e1d1', h: 36, count: 1, at: () => C,
        make(g, k, M, THREE) {
          const S = KRYOS.style(THREE), add = (geo, m, x, y, z) => KRYOS.add(THREE, g, geo, m, x, y, z);
          add(new THREE.CylinderGeometry(58, 64, 8, 6), S.trim, 0, 4, 0);
          add(new THREE.CylinderGeometry(46, 54, 24, 6, 1, true), S.clear, 0, 20, 0);
          add(new THREE.CylinderGeometry(30, 30, 24, 6), S.glass(1, 4, 1), 0, 20, 0);
          add(new THREE.CylinderGeometry(20, 50, 8, 6), S.pearl, 0, 36, 0);
          KRYOS.add(THREE, g, new THREE.CylinderGeometry(66, 66, 0.8, 6), S.pave(6, 6), 0, 0.4, 0);
        },
      },
      KPAD: {
        name: 'RAISED LANDING PAD', code: 'DC', col: '#2f6690', h: PAD_H, count: 6, at: k => padAt(k),
        make(g, k, M, THREE, api, sl) {
          const S = KRYOS.style(THREE), add = (geo, m, x, y, z) => KRYOS.add(THREE, g, geo, m, x, y, z), a = k / 6 * TAU;
          add(new THREE.CylinderGeometry(4, 7, PAD_H, 8), S.pearl, 0, PAD_H / 2, 0);
          add(new THREE.CylinderGeometry(30, 26, 3, 6), S.trim, 0, PAD_H, 0);
          add(new THREE.CylinderGeometry(27, 27, 0.4, 6), S.dark, 0, PAD_H + 1.7, 0);
          const ring = new THREE.Mesh(new THREE.TorusGeometry(22, 0.5, 6, 32).rotateX(Math.PI / 2), M.glowBlue || new THREE.MeshBasicMaterial({ color: 0x80c0ff })); ring.position.y = PAD_H + 2; g.add(ring);
          const len = 150 - 30 - 52, w = add(new THREE.BoxGeometry(len, 2, 5), S.trim, -Math.cos(a) * (30 + len / 2), PAD_H - 1, -Math.sin(a) * (30 + len / 2)); w.rotation.y = -a;
          const wg = add(new THREE.BoxGeometry(len, 3, 5.4), S.clear, w.position.x, PAD_H + 1.4, w.position.z); wg.rotation.y = -a;
        },
      },
      KTRAFFIC: {
        name: 'TRAFFIC TOWER', code: 'SY', col: '#e8e1d1', h: 190, count: 1, at: () => [C[0], C[1] + 230],
        make(g, k, M, THREE, api) {
          const S = KRYOS.style(THREE), add = (geo, m, x, y, z) => KRYOS.add(THREE, g, geo, m, x, y, z);
          add(new THREE.CylinderGeometry(3, 9, 170, 8), S.pearl, 0, 85, 0);
          add(new THREE.SphereGeometry(18, 24, 12), S.glass(3, 2, 1), 0, 172, 0).scale.y = 0.5;
          add(new THREE.CylinderGeometry(22, 22, 2, 32), S.trim, 0, 168, 0);
          add(new THREE.TorusGeometry(22, 2, 8, 32).rotateX(Math.PI / 2), S.rose, 0, 168, 0);
          const l = new THREE.Mesh(new THREE.SphereGeometry(1.6, 10, 8), new THREE.MeshBasicMaterial({ color: 0xff3030 })); l.position.y = 186; g.add(l); api.blink(l, 1.4, 0xff3030);
        },
      },
      KCRAFT: {
        name: 'PASSENGER CRAFT', code: 'DF', col: '#2f6690', h: 8, count: 12, at: k => craftAt(k), y: () => PAD_H + 2.4,
        needs: (api, k, cnt) => cnt('KPAD') >= 6 ? null : 'NEEDS THE LANDING PADS',
        make(g, k, M, THREE, api, sl) {
          const c = KRYOS.craft(THREE, M, 1.5, k), a = Math.floor(k / 2) / 6 * TAU;
          c.rotation.y = -a + Math.PI; c.userData = { i: k, rot: c.rotation.y };
          g.add(c); g.userData.craft = c;
        },
      },
    },
    trips: [{ name: 'TERMINAL & PADS', parts: ['KTERM', 'KPAD'] }, { name: 'TOWER & FLEET', parts: ['KTRAFFIC', 'KCRAFT'] }],
    tick(api, dt, t, lv) {
      const THREE = api.THREE, go = api.flag('sfleet') ? Infinity : (this._go || 0);
      const v = this._v || (this._v = { a: new THREE.Vector3(), b: new THREE.Vector3(), base: new THREE.Vector3(), home: new THREE.Vector3() });
      for (const p of api.placed) {
        if (p.b !== 12 || !p.piece || !p.piece.userData.craft) continue;
        const c = p.piece.userData.craft, U = c.userData, tl = go - U.i * 0.5;
        if (tl <= 0) { c.position.set(0, 0, 0); c.rotation.set(0, U.rot, 0); continue; }
        p.piece.updateMatrixWorld(true);
        const base = v.base.setFromMatrixPosition(p.piece.matrixWorld), home = v.home.copy(base);
        let pos, ahead;
        if (tl < 2) { const k = tl / 2, e = k * k * (3 - 2 * k); pos = v.a.copy(home); pos.y += 40 * e; ahead = v.b.copy(pos); ahead.x += Math.sin(U.rot) * 30; ahead.z += Math.cos(U.rot) * 30; }
        else {
          const k = Math.min(1, (tl - 2) / 6), e = k * k * (3 - 2 * k), lift = home.clone(); lift.y += 40;
          pos = route(U.i, t, v.a); pos.y += KRYOS.ground(api, pos.x, pos.z); pos.lerp(lift, 1 - e);
          ahead = route(U.i, t + 0.6, v.b); ahead.y += KRYOS.ground(api, ahead.x, ahead.z); ahead.lerp(lift, 1 - Math.min(1, e + 0.2));
          if (ahead.distanceToSquared(pos) < 0.01) ahead.x += 1;
        }
        c.position.set(pos.x - base.x, pos.y - base.y, pos.z - base.z);
        c.lookAt(ahead);
      }
    },
  }));
})();
