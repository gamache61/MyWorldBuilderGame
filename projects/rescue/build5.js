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
        this.str = new T.Group(); this.str.position.set(1550, this.y0 + 6500, -9500); grp.add(this.str);
        // a tall faceted metal shard hanging point-up, panelled like a city wall, with a split down one side
        let ptex = null;
        try {
          const cv = document.createElement('canvas'); cv.width = cv.height = 256; const g2 = cv.getContext('2d');
          g2.fillStyle = '#7d8c9c'; g2.fillRect(0, 0, 256, 256);
          for (let i = 0; i < 260; i++) { const x = Math.random() * 256, y = Math.random() * 256, w = 6 + Math.random() * 40, h = 4 + Math.random() * 26; g2.fillStyle = 'rgba(' + (40 + Math.random() * 90 | 0) + ',' + (55 + Math.random() * 90 | 0) + ',' + (70 + Math.random() * 90 | 0) + ',0.55)'; g2.fillRect(x, y, w, h); g2.strokeStyle = 'rgba(15,20,30,0.5)'; g2.strokeRect(x, y, w, h); }
          ptex = new T.CanvasTexture(cv);
        } catch (e) { }
        const hullM = new T.MeshStandardMaterial({ color: 0xd0dae6, map: ptex, emissive: 0x2a3a4c, roughness: 0.4, metalness: 0.6, flatShading: true });
        const darkM = new T.MeshStandardMaterial({ color: 0x2a3644, emissive: 0x10161e, roughness: 0.5, metalness: 0.5, flatShading: true });
        const TOP = 420, BOT = 240, W = 70, D = 48;
        const shard = (w, d, top, bot, mat) => {
          const gm = new T.OctahedronGeometry(1, 0), pos = gm.attributes.position;
          for (let i = 0; i < pos.count; i++) { const y = pos.getY(i); pos.setXYZ(i, pos.getX(i) * w, y > 0 ? y * top : y * bot, pos.getZ(i) * d); }
          gm.computeVertexNormals(); return new T.Mesh(gm, mat);
        };
        this.str.add(shard(W, D, TOP, BOT, hullM));
        const cleft = shard(14, 10, TOP * 0.8, BOT * 0.8, darkM); cleft.position.set(W * 0.52, 20, 0); cleft.rotation.z = -0.03; this.str.add(cleft);
        const blade = shard(10, 36, TOP * 0.45, BOT * 0.5, hullM); blade.position.set(-W * 0.5, -40, 0); this.str.add(blade);
        this.lights = []; for (let i = 0; i < 12; i++) { const y = -190 + i * 42, h = y >= 0 ? TOP : BOT; const l = new T.Mesh(new T.SphereGeometry(5, 10, 8), bm(new T.Color(1.4, 1.9, 2.0), 0)); l.position.set(0, y, D * (1 - Math.abs(y) / h) + 4); this.str.add(l); this.lights.push(l); }
        this.str.rotation.y = 0.5; this.str.rotation.z = 0.1; this.str.scale.setScalar(5);
        this.glow = new T.Mesh(new T.SphereGeometry(700, 14, 10), bm(new T.Color(0.4, 0.8, 1.0), 0)); this.str.add(this.glow);
        // three rescue craft and a guard ship, flying out from the pads
        this.fleet = [];
        P.craftPos.forEach(([x, z], i) => {
          const c = new T.Group(); const b = new T.Mesh(new T.CapsuleGeometry(5.2, 24, 6, 12).rotateX(Math.PI / 2), new T.MeshStandardMaterial({ color: 0xf6f8fa, roughness: 0.3, metalness: 0.3 })); c.add(b);
          const e = new T.Mesh(new T.SphereGeometry(3, 10, 8), bm(new T.Color(0.5, 1.4, 2.0), 0.9)); e.position.z = -15; c.add(e);
          const st = new T.Mesh(new T.BoxGeometry(10.6, 1.4, 22), new T.MeshStandardMaterial({ color: 0xf08a1a })); st.position.y = 4.4; c.add(st);
          c.position.set(x, this.y0 + 14, z + 0); grp.add(c); c.scale.setScalar(4); this.fleet.push({ c, x0: x, z0: z, i });
        });
        const esc = new T.Group(); esc.add(new T.Mesh(new T.CapsuleGeometry(4.6, 26, 6, 12).rotateX(Math.PI / 2), new T.MeshStandardMaterial({ color: 0x8e99a6, roughness: 0.4, metalness: 0.5 })));
        const ee = new T.Mesh(new T.SphereGeometry(2.8, 10, 8), bm(new T.Color(0.4, 0.9, 2.0), 0.9)); ee.position.z = -15; esc.add(ee); esc.position.set(1380, this.y0 + 14, -90); esc.scale.setScalar(4); grp.add(esc); this.esc = esc;
        // a thin line of fuel light from the lead craft to the stranger
        this.beam = new T.Mesh(new T.CylinderGeometry(1.2, 1.2, 1, 8, 1, true), bm(new T.Color(0.4, 1.6, 1.0), 0)); grp.add(this.beam);
      },
      update(api, dt, f) {
        this.t1 += dt; if (!this.fleet) return this.t1 > 1;
        const T = api.THREE, tgt = this.str.position;
        const fly = (o, i, u, off) => {
          // a long curve up from the pad and out toward the stranger, stopping short of it
          const e = u * u * (3 - 2 * u), sx = o.x0, sz = o.z0, ex = tgt.x + off, ez = tgt.z + 2800;
          o.c.position.set(sx + (ex - sx) * e + Math.sin(e * 3.1) * 40, this.y0 + 14 + e * (tgt.y - 1900 - this.y0 - 14), sz + (ez - sz) * e);
          o.c.rotation.y = Math.atan2(ex - sx, ez - sz); o.c.rotation.x = -0.25 * Math.sin(e * 3.1);
        };
        const follow = (a, b, k, o) => {
          o = o || [230, 70, 400]; const e = new T.Vector3(a.x + o[0], a.y + o[1], a.z + o[2]), l = a.clone().lerp(b, k);
          this.ce = this.ce ? this.ce.lerp(e, Math.min(1, dt * 2.5)) : e.clone(); this.cl = this.cl ? this.cl.lerp(l, Math.min(1, dt * 2.5)) : l.clone();
          api.shot(this.ce, this.cl);
        };
        if (this.stage === 0) {
          P.hint('THE RESCUE · THREE CRAFT RISE FROM THE LAUNCH CIRCLES, A GUARD SHIP BESIDE THEM, OUTSIDE THE SHIELD');
          const u = Math.min(1, this.t1 / 24);
          this.fleet.forEach(o => fly(o, o.i, Math.max(0, Math.min(1, u * 1.08 - o.i * 0.04)), (o.i - 1) * 60));
          fly({ c: this.esc, x0: 1380, z0: -90 }, 3, Math.max(0, u * 1.02), 170);
          follow(this.fleet[1].c.position, tgt, 0.12 + 0.3 * u, u < 0.6 ? [230, 70, 400] : [760 - 120 * (1 - u) / 0.4, -50 + 130 * (1 - u) / 0.4, 255 + 450 * (1 - u) / 0.4]);
          if (u >= 1) { this.stage = 1; this.t1 = 0; P.ring && P.ring(3); }
        } else if (this.stage === 1) {
          P.hint('THE FUEL IS LEFT IN THE OPEN, AND A MEDIC GOES ACROSS WITH OPEN HANDS...');
          const mid = this.fleet[1].c.position; this.beam.material.opacity = Math.min(0.7, this.t1 / 2) * (0.7 + Math.sin(f * 6) * 0.3);
          const a = mid, b = tgt, L = a.distanceTo(b); this.beam.scale.set(1, L, 1); this.beam.position.copy(a).lerp(b, 0.5); this.beam.lookAt(b); this.beam.rotateX(Math.PI / 2);
          { const e = new T.Vector3(mid.x + 500, mid.y - 600, mid.z + 2000), l = new T.Vector3(mid.x - 100, mid.y + 900, mid.z - 1200);
            this.ce = this.ce ? this.ce.lerp(e, Math.min(1, dt * 1.5)) : e.clone(); this.cl = this.cl ? this.cl.lerp(l, Math.min(1, dt * 1.5)) : l.clone(); api.shot(this.ce, this.cl); }
          const lit = Math.min(1, Math.max(0, (this.t1 - 4) / 6));
          this.lights.forEach((l, i) => l.material.opacity = lit > i / 12 ? (0.6 + Math.sin(f * 5 + i) * 0.3) : 0); this.glow.material.opacity = lit * 0.07;
          if (this.t1 > 14) { this.stage = 2; this.t1 = 0; api.shot(new T.Vector3(1000, 190, 540), new T.Vector3(1550, 200, -300)); P.hint(''); P.cover(true, 'THE STRANGER HAS POWER AGAIN', 'THE RESCUE CRAFT · THE FUEL · THE MEDICS · A GUARD SHIP BESIDE THEM, OUTSIDE THE SHIELD · THE STRANGER IS SAFE'); }
        } else {
          if (this.t1 > 4 && !this._h) { this._h = true; api.setFlag('rescue', true); api.setFlag('opened', true); }
          if (this.t1 > 6.5) { P.cover(false); this._h = false; return true; }
        }
        return false;
      },
    },
  }));
})();
