/* ============================================================
   THE RESCUE · BUILD 5 · THE LAUNCH PADS, THE OPERATIONS HALL & THE RESCUE
   Keep this file in projects/rescue next to 56-rescue.html.
   Three launch circles and a hall where every step of the rescue is planned in the open. Ends with L: the rescue craft go out to the stranger.
   ============================================================ */
(function () {
  const P = window.YARD;
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 5, name: 'THE LAUNCH PADS, THE OPERATIONS HALL & THE RESCUE',
    brief: 'Three launch circles and a hall where the rescue is planned in the open — then the rescue itself: the craft go out to the stranger.',
    types: {
      LAUNCHPAD: { code: 'SY', name: 'LAUNCH CIRCLE', col: '#7b4fa0', w: 40, d: 40, h: 8 },
      OPSHALL: { code: 'SY', name: 'OPERATIONS HALL', col: '#e8e1d1', w: 90, d: 50, h: 24 },
    },
    order: ['LAUNCHPAD', 'OPSHALL'],
    at: { LAUNCHPAD: [[1450, 200], [1550, 200], [1650, 200]], OPSHALL: [[1550, 310]] },
    eye: [1100, 180, 420],
    stats(api, c) { return [['LAUNCH CIRCLES', c('LAUNCHPAD') + ' / 3'], ['OPERATIONS HALL', c('OPSHALL') ? 'OPEN' : 'NOT YET'], ['THE RESCUE', api.flag('rescue') ? 'DONE' : 'NOT YET']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, S = P.hm(api), C = P.fun(api);
      const cry = P._cry = P._cry || [0x7ffcff, 0x9f7bff, 0x6dffb0].map(c => new T.MeshStandardMaterial({ color: c, emissive: c, emissiveIntensity: 1.4, roughness: 0.25, transparent: true, opacity: 0.92 }));
      if (type === 'LAUNCHPAD') {
        add(new T.CylinderGeometry(18, 19, 1.4, 32), S.gravel, 0, 0.7, 0);
        add(new T.CylinderGeometry(13, 13, 0.4, 32), F.dark, 0, 1.5, 0);
        const rg = add(new T.TorusGeometry(15, 0.4, 8, 48), cry[k % 3], 0, 1.8, 0); rg.rotation.x = Math.PI / 2; rg.castShadow = false;
        for (let i = 0; i < 4; i++) { const a = i / 4 * Math.PI * 2 + Math.PI / 4; add(new T.BoxGeometry(1, 7, 1), F.steel, Math.cos(a) * 16, 4.5, Math.sin(a) * 16); add(new T.SphereGeometry(0.6, 8, 6), F.lamp, Math.cos(a) * 16, 8.4, Math.sin(a) * 16).castShadow = false; }
        add(new T.BoxGeometry(2.4, 0.2, 14), C.yellow, 0, 1.75, 0); add(new T.BoxGeometry(14, 0.2, 2.4), C.yellow, 0, 1.75, 0);
        P.person(g, P.civ(56500 + k), 'idle', 16, 1, -16, 0);
      } else {
        add(new T.BoxGeometry(92, 1, 52), S.gravel, 0, 0.5, 0);
        add(new T.BoxGeometry(80, 14, 36), F.white, 0, 8, 0);
        const roof = add(new T.CylinderGeometry(24, 24, 84, 3, 1).rotateZ(Math.PI / 2), S.slate, 0, 17, 0); roof.scale.set(1, 0.3, 1);
        for (let x = -32; x <= 32; x += 8) add(new T.BoxGeometry(5, 6, 0.4), S.glass, x, 9, 18.2);
        add(new T.CylinderGeometry(1.2, 1.6, 12, 8), F.steel, 28, 24, 0);
        const dish = add(new T.SphereGeometry(9, 22, 8, 0, Math.PI * 2, 0, 0.7).rotateX(Math.PI), new T.MeshStandardMaterial({ color: 0xf2f5f8, roughness: 0.35, metalness: 0.3, side: T.DoubleSide }), 28, 36, 0); dish.rotation.z = 0.5;
        add(new T.BoxGeometry(60, 5, 0.5), cry[0], 0, 11, -18.3).castShadow = false;
        P.sign(api, g, 'OPERATIONS HALL · EVERY STEP IN THE OPEN', 40, 3.6, 0, 20.5, 18.8, 0, '#14324a', '#bfe8ff', true);
        for (let i = 0; i < 4; i++) P.person(g, P.civ(56600 + i), i % 2 ? 'tablet' : 'idle', -18 + i * 12, 1, 28, Math.PI);
      }
    },
    tick(api, dt, t) {
      if (api.flag('opened') && !document.getElementById('nextMeeting')) {
        const b = document.createElement('button'); b.id = 'nextMeeting';
        b.innerHTML = 'GO TO THE TWENTY-FIFTH COUNCIL MEETING ▶<small style="display:block;font-weight:400;font-size:10px;letter-spacing:2px;color:#c8ecff;margin-top:3px">THE STRANGER IS SAFE</small>';
        b.style.cssText = 'position:fixed;left:50%;bottom:22px;transform:translateX(-50%);z-index:9;padding:10px 22px;font:600 14px "Segoe UI",Arial;letter-spacing:3px;color:#fff;background:rgba(20,60,100,.85);border:1px solid #80d8ff;border-radius:6px;cursor:pointer;text-align:center';
        b.onmouseenter = () => b.style.background = 'rgba(30,80,130,.95)'; b.onmouseleave = () => b.style.background = 'rgba(20,60,100,.85)';
        b.onclick = () => { location.href = 'councilmeeting/councilmeeting25.html'; };
        document.body.appendChild(b);
      }
    },
    finish: {
      label: 'THE RESCUE',
      cam: [[1000, 190, 540], [1550, 200, -300]],
      start(api) {
        this.stage = 0; this.t1 = 0; P.ring && P.ring(2);
        const T = api.THREE, par = (api.placed.find(p => p.piece && p.piece.parent) || {}).piece; if (!par) return;
        const grp = new T.Group(); par.parent.add(grp); this.grp = grp; this.y0 = api.DECK_TOP;
        const bm = (c, o = 0) => new T.MeshBasicMaterial({ color: c, transparent: true, opacity: o, blending: T.AdditiveBlending, depthWrite: false, toneMapped: false, side: T.DoubleSide });
        // the stranger: a dark, hurt ship far out in the sky, drifting
        this.str = new T.Group(); this.str.position.set(1550, this.y0 + 700, -1700); grp.add(this.str);
        const hullM = new T.MeshStandardMaterial({ color: 0x3a4250, roughness: 0.6, metalness: 0.5 });
        const hull = new T.Mesh(new T.CapsuleGeometry(20, 90, 6, 14).rotateZ(Math.PI / 2), hullM); this.str.add(hull);
        for (const sd of [-1, 1]) { const f = new T.Mesh(new T.BoxGeometry(40, 3, 40), hullM); f.position.set(-10, 0, sd * 34); f.rotation.y = sd * 0.4; this.str.add(f); }
        this.lights = []; for (let i = 0; i < 6; i++) { const l = new T.Mesh(new T.SphereGeometry(3.4, 10, 8), bm(new T.Color(2.0, 1.5, 0.5), 0)); l.position.set(-30 + i * 14, 6, 19); this.str.add(l); this.lights.push(l); }
        this.glow = new T.Mesh(new T.SphereGeometry(70, 14, 10), bm(new T.Color(1.0, 0.75, 0.3), 0)); this.str.add(this.glow);
        // three rescue craft and a guard ship, flying out from the pads
        this.fleet = [];
        P.craftPos.forEach(([x, z], i) => {
          const c = new T.Group(); const b = new T.Mesh(new T.CapsuleGeometry(5.2, 24, 6, 12).rotateX(Math.PI / 2), new T.MeshStandardMaterial({ color: 0xf6f8fa, roughness: 0.3, metalness: 0.3 })); c.add(b);
          const e = new T.Mesh(new T.SphereGeometry(3, 10, 8), bm(new T.Color(0.5, 1.4, 2.0), 0.9)); e.position.z = -15; c.add(e);
          const st = new T.Mesh(new T.BoxGeometry(10.6, 1.4, 22), new T.MeshStandardMaterial({ color: 0xf08a1a })); st.position.y = 4.4; c.add(st);
          c.position.set(x, this.y0 + 14, z + 0); grp.add(c); this.fleet.push({ c, x0: x, z0: z, i });
        });
        const esc = new T.Group(); esc.add(new T.Mesh(new T.CapsuleGeometry(4.6, 26, 6, 12).rotateX(Math.PI / 2), new T.MeshStandardMaterial({ color: 0x8e99a6, roughness: 0.4, metalness: 0.5 })));
        const ee = new T.Mesh(new T.SphereGeometry(2.8, 10, 8), bm(new T.Color(0.4, 0.9, 2.0), 0.9)); ee.position.z = -15; esc.add(ee); esc.position.set(1380, this.y0 + 14, -90); grp.add(esc); this.esc = esc;
        // a thin line of fuel light from the lead craft to the stranger
        this.beam = new T.Mesh(new T.CylinderGeometry(1.2, 1.2, 1, 8, 1, true), bm(new T.Color(0.4, 1.6, 1.0), 0)); grp.add(this.beam);
      },
      update(api, dt, f) {
        this.t1 += dt; if (!this.fleet) return this.t1 > 1;
        const T = api.THREE, tgt = this.str.position;
        const fly = (o, i, u, off) => {
          // a long curve up from the pad and out toward the stranger, stopping short of it
          const e = u * u * (3 - 2 * u), sx = o.x0, sz = o.z0, ex = tgt.x + off, ez = tgt.z + 260;
          o.c.position.set(sx + (ex - sx) * e + Math.sin(e * 3.1) * 40, this.y0 + 14 + e * (tgt.y - this.y0 - 14) * 0.96, sz + (ez - sz) * e);
          o.c.rotation.y = Math.atan2(ex - sx, ez - sz); o.c.rotation.x = -0.25 * Math.sin(e * 3.1);
        };
        if (this.stage === 0) {
          P.hint('THE RESCUE · THREE CRAFT RISE FROM THE LAUNCH CIRCLES, A GUARD SHIP BESIDE THEM, OUTSIDE THE SHIELD');
          const u = Math.min(1, this.t1 / 16);
          this.fleet.forEach(o => fly(o, o.i, Math.max(0, Math.min(1, u * 1.08 - o.i * 0.04)), (o.i - 1) * 60));
          fly({ c: this.esc, x0: 1380, z0: -90 }, 3, Math.max(0, u * 1.02), 170);
          if (u >= 1) { this.stage = 1; this.t1 = 0; P.ring && P.ring(3); }
        } else if (this.stage === 1) {
          P.hint('THE FUEL IS LEFT IN THE OPEN, AND A MEDIC GOES ACROSS WITH OPEN HANDS...');
          const mid = this.fleet[1].c.position; this.beam.material.opacity = Math.min(0.7, this.t1 / 2) * (0.7 + Math.sin(f * 6) * 0.3);
          const a = mid, b = tgt, L = a.distanceTo(b); this.beam.scale.set(1, L, 1); this.beam.position.copy(a).lerp(b, 0.5); this.beam.lookAt(b); this.beam.rotateX(Math.PI / 2);
          const lit = Math.min(1, Math.max(0, (this.t1 - 4) / 6));
          this.lights.forEach((l, i) => l.material.opacity = lit > i / 6 ? (0.6 + Math.sin(f * 5 + i) * 0.3) : 0); this.glow.material.opacity = lit * 0.22;
          if (this.t1 > 14) { this.stage = 2; this.t1 = 0; P.hint(''); P.cover(true, 'THE STRANGER HAS POWER AGAIN', 'THE RESCUE CRAFT · THE FUEL · THE MEDICS · A GUARD SHIP BESIDE THEM, OUTSIDE THE SHIELD · THE STRANGER IS SAFE'); }
        } else {
          if (this.t1 > 4 && !this._h) { this._h = true; api.setFlag('rescue', true); api.setFlag('opened', true); }
          if (this.t1 > 6.5) { P.cover(false); this._h = false; return true; }
        }
        return false;
      },
    },
  }));
})();
