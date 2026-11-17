/* ============================================================
   THE VISIT TO OCKNOG · BUILD 5 · THE FRIENDSHIP LANTERNS
   Keep this file in projects/ocknogvisit next to 80-ocknogvisit.html.
   Four beacon towers, then the night the Elder chooses a person of Ocknog to speak for them on Unity's council and the lanterns rise.
   The council meeting itself is held on Unity.
   ============================================================ */
(function () {
  const P = window.PWP;
  const CX = 1550 + 2600, CZ = 990;
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 5, name: 'THE FRIENDSHIP LANTERNS',
    brief: 'Four beacon towers beside the welcome field, then the friendship night: the people of Ocknog choose one of their own to speak for them on Unity\u2019s council, and the lanterns rise.',
    types: {
      BEACON: { code: 'HP', name: 'BEACON TOWER',     col: '#d0a64a', w: 5, d: 5, h: 34 },
    },
    order: ['BEACON'],
    at: {
      BEACON: [[-60, 175], [60, 175], [-130, 110], [130, 110]].map(([x, z]) => [CX + x, CZ + z]) },
    eye: [CX + 0, (window.__OCK.Y || -85) + 200, CZ + 420],
    stats(api, c) { return [['BEACON TOWERS', c('BEACON') + ' / 4'], ['THE FRIENDSHIP NIGHT', api.flag('opened') ? 'HELD' : 'NOT YET']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, O = P.ok(api);
      if (type === 'BEACON') {
        add(new T.CylinderGeometry(2.6, 3.2, 2, 10), O.stone2, 0, 1, 0, false);
        add(new T.CylinderGeometry(0.7, 1.4, 26, 8), O.stone, 0, 14, 0);
        for (let y = 8; y < 26; y += 8) add(new T.TorusGeometry(1.2 - y * 0.012, 0.25, 4, 12), O.brass, 0, y, 0, false).rotation.x = Math.PI / 2;
        add(new T.CylinderGeometry(2.4, 1.4, 3, 10), O.brass, 0, 28.5, 0, false);
        add(new T.SphereGeometry(2.2, 12, 8), O.cure, 0, 31.4, 0, false);
        P.alien(api, g, 4, 0.1, 3, 0.5 + k, { seed: 50 + k, scale: 0.8 });
      }
    },
    tick(api, dt, t) {
      P.moveAliens(t);
      if (api.flag('opened') && !document.getElementById('nextMeeting')) {
        const b = document.createElement('button'); b.id = 'nextMeeting';
        b.innerHTML = 'GO TO THE NEXT COUNCIL MEETING ▶<small style="display:block;font-weight:400;font-size:10px;letter-spacing:2px;color:#ffd9a0;margin-top:3px">A PERSON OF OCKNOG WILL SPEAK FOR THEM ON UNITY</small>';
        b.style.cssText = 'position:fixed;left:50%;bottom:22px;transform:translateX(-50%);z-index:9;padding:10px 22px;font:600 14px "Segoe UI",Arial;letter-spacing:3px;color:#fff;background:rgba(110,70,30,.88);border:1px solid #ffd9a0;border-radius:6px;cursor:pointer';
        b.onmouseenter = () => b.style.background = 'rgba(140,90,40,.96)'; b.onmouseleave = () => b.style.background = 'rgba(110,70,30,.88)';
        b.onclick = () => { location.href = 'councilmeeting/councilmeeting47.html'; };
        document.body.appendChild(b);
      }
    },
    finish: {
      label: 'THE FRIENDSHIP NIGHT',
      cam: [[CX + 0, (window.__OCK.Y || -85) + 55, CZ + 300], [CX + 0, (window.__OCK.Y || -85) + 22, CZ - 60]],
      start(api) {
        this.stage = 0; this.t1 = 0; this._h = false; P.ring && P.ring(2);
        const T = api.THREE, host = api.placed.find(p => p.piece && p.piece.parent), par = host && host.piece.parent, o = P.OFF || [0, 0], Y0 = (window.__OCK.Y || -85);
        this.Y0 = Y0; this.grp = new T.Group(); this.grp.position.set(CX + o[0], 0, CZ + o[1]); par && par.add(this.grp);
        this.modes = P.aliens.map(a => [a, a.userData.mode]);
        // the chosen person of Ocknog stands among the people on the welcome field
        this.del = P.alien(api, this.grp, 0, Y0 + 2.4, 40, Math.PI, { seed: 99, mode: 'idle', scale: 1.05 });
        // sky lanterns
        const cols = [new T.Color(2.4, 1.6, 0.6), new T.Color(2.4, 0.9, 0.5), new T.Color(0.6, 2.0, 1.6)];
        this.lan = []; for (let i = 0; i < 90; i++) { const m = new T.Mesh(new T.SphereGeometry(1.1, 8, 6), new T.MeshBasicMaterial({ color: cols[i % 3], transparent: true, opacity: 0, toneMapped: false })); m.scale.y = 1.4;
          const a = Math.random() * Math.PI * 2, r = Math.sqrt(Math.random()) * 190; m.userData = { x: Math.cos(a) * r, z: Math.sin(a) * r * 0.8 + 20, d: 7 + Math.random() * 9, v: 5 + Math.random() * 5, ph: Math.random() * 6 }; this.grp.add(m); this.lan.push(m); }
        const ring = new T.Mesh(new T.TorusGeometry(210, 0.9, 6, 90), new T.MeshBasicMaterial({ color: new T.Color(0.5, 2.0, 1.6), transparent: true, opacity: 0, toneMapped: false })); ring.rotation.x = Math.PI / 2; ring.position.y = Y0 + 120; this.grp.add(ring); this.ring = ring;
      },
      update(api, dt, f) {
        this.t1 += dt; const t = this.t1; P.moveAliens(performance.now() / 1000);
        const fade = t > 20 ? Math.max(0, 1 - (t - 20) / 3) : 1;
        (this.lan || []).forEach(m => { const u = t - m.userData.d; const up = Math.max(0, u); m.position.set(m.userData.x + Math.sin(t * 0.6 + m.userData.ph) * 3, this.Y0 + 6 + up * m.userData.v, m.userData.z); m.material.opacity = Math.max(0, Math.min(1, u * 0.8)) * fade * Math.max(0, 1 - up / 40); });
        if (this.ring) this.ring.material.opacity = Math.min(0.55, Math.max(0, (t - 10) / 4)) * fade;
        if (this.stage === 0) {
          const d = this.del;
          if (d) {
            // the chosen person steps forward from the people and waves
            const u = Math.max(0, Math.min(1, (t - 4) / 5)); d.position.z = 40 + 22 * u; d.rotation.y = Math.PI;
            if (t > 9) d.userData.mode = 'wave';
          }
          if (t > 14.5 && !this._c) { this._c = true; for (const [a] of this.modes || []) if (a !== this.del) a.userData.mode = 'cheer'; }
          P.hint(t < 4 ? 'THE PEOPLE OF OCKNOG GATHER ON THE WELCOME FIELD' : t < 14 ? 'THE ELDER CHOOSES ONE OF THEM TO SPEAK FOR OCKNOG ON UNITY’S COUNCIL' : 'OCKNOG HAS CHOSEN ITS VOICE · THE LANTERNS RISE');
          if (t > 23) { this.stage = 1; this.t1 = 0; P.hint(''); for (const [a, m] of this.modes || []) if (a !== this.del) a.userData.mode = m; this.grp && this.grp.parent && this.grp.parent.remove(this.grp); this.grp = null; this.lan = this.ring = this.del = null; P.cover(true, 'THE VISIT TO OCKNOG IS DONE', 'THE WELCOME FIELD · THE VILLAGE · THE GREEN FIELDS · THE TABLE OF TRUST · THE MARKET · THE TRADE HALL · A SEAT FOR OCKNOG'); }
        } else {
          if (this.t1 > 4 && !this._h) { this._h = true; api.setFlag('ocknogvisit', true); api.setFlag('opened', true); }
          if (this.t1 > 6.5) { P.cover(false); this._h = false; return true; }
        }
        return false;
      },
    },
  }));
})();
