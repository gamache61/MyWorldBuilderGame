/* ============================================================
   FARMLANDS OF UNITY · BUILD 6 · THE SKY-POD FOOD LINE
   Keep this file in projects/farmlands next to farmlands.html.
   A pod station at the harvest hall and a raised line of pylons
   that runs out over the forest. Ends with L: the first harvest
   rides the sky-pods to Kryos, and Unity feeds itself.
   ============================================================ */
(function () {
  const ST = { x: 660, z: -290 }, TOP = -28 + 42, N = 8, STEP = 150, LEN = 70 + (N - 1) * STEP + 60;
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(window.FARM.build({
    id: 6, name: 'THE SKY-POD FOOD LINE',
    brief: 'A pod station at the harvest hall and a raised line of pylons over the forest. Then the first harvest rides the sky-pods to Kryos, and Unity feeds itself.',
    types: {
      PODSTATION: { code: 'SY', name: 'POD STATION', col: '#e8e1d1', w: 40, d: 40, h: 44 },
      PODPYLON: { code: 'SF', name: 'POD LINE PYLON', col: '#6c757d', w: 10, d: 10, h: 50 },
    },
    order: ['PODSTATION', 'PODPYLON'],
    at: { PODSTATION: [[ST.x, ST.z]], PODPYLON: Array.from({ length: N }, (_, i) => [ST.x, ST.z - 70 - i * STEP]) },
    eye: [-260, 140, 200],
    stats(api, c) { return [['POD STATION', c('PODSTATION') ? 'READY' : 'NOT YET'], ['LINE PYLONS', c('PODPYLON') + ' / ' + N], ['FOOD LINE', api.flag('harvest') ? 'RUNNING' : 'WAITING']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, top = TOP - sl.y;   // the line runs level at the same height all the way
      if (type === 'PODSTATION') {
        add(new T.BoxGeometry(40, 2, 40), F.stoneDark, 0, 1, 0);
        for (const [x, z] of [[-16, -16], [16, -16], [-16, 16], [16, 16]]) add(new T.CylinderGeometry(1.4, 1.8, top - 2, 12), F.white, x, top / 2, z);
        add(new T.BoxGeometry(36, 2, 36), F.white, 0, top - 3, 0);
        add(new T.BoxGeometry(38, 1.2, 38), F.gold, 0, top + 4.5, 0);
        add(new T.BoxGeometry(36, 1, 36), F.roof, 0, top + 5.4, 0);
        add(new T.BoxGeometry(36.4, 0.8, 36.4), F.glow, 0, top - 1.6, 0, false);
        // lifts up to the platform, and the line itself running out across the forest
        add(new T.BoxGeometry(6, top - 3, 6), F.glass, 14, (top - 3) / 2, 14, false);
        add(new T.BoxGeometry(3, 2, LEN), F.steel, 0, top + 0.2, -LEN / 2 + 10);
        add(new T.BoxGeometry(3.2, 0.3, LEN), F.glow, 0, top + 1.35, -LEN / 2 + 10, false);
        for (let i = 0; i < 6; i++) add(new T.BoxGeometry(2.4, 2.4, 2.4), i % 2 ? F.wood : F.crops[i % 5], -10 + (i % 3) * 3, top - 0.8, -6 + (i >> 1) * 3);
        // the sky-pods (hidden until the first harvest is sent)
        const FARM = window.FARM;
        for (let i = 0; i < 4; i++) {
          const pod = new T.Group(); pod.userData.keep = true; pod.position.set(0, top + 3.4, 0); pod.visible = false;
          const b = new T.Mesh(new T.CapsuleGeometry(1.8, 6, 6, 14).rotateX(Math.PI / 2), F.white); b.castShadow = true; pod.add(b);
          const w = new T.Mesh(new T.CapsuleGeometry(1.85, 3, 4, 14).rotateX(Math.PI / 2), F.glass); w.position.y = 0.4; pod.add(w);
          const s = new T.Mesh(new T.BoxGeometry(3.8, 0.5, 9), F.gold); s.position.y = -1.3; pod.add(s);
          const l = new T.Mesh(new T.SphereGeometry(0.4, 8, 6), F.podGlow); l.position.set(0, 0, -5.2); pod.add(l);
          pod.userData.z0 = 0; pod.userData.len = LEN - 30; pod.userData.off = i * (LEN - 30) / 2;
          g.add(pod); FARM.pods.push(pod);
        }
        FARM.person(g, FARM.civ(8601), 'idle', -10, 2, 18, Math.PI);
        FARM.person(g, { kind: 'worker', seed: 8602, female: false }, 'tablet', 6, 2, 19, Math.PI);
      } else if (type === 'PODPYLON') {
        add(new T.BoxGeometry(10, 2, 10), F.stoneDark, 0, 1, 0);
        add(new T.CylinderGeometry(1.6, 2.6, top - 1, 8), F.white, 0, top / 2, 0);
        add(new T.BoxGeometry(8, 1.4, 4), F.white, 0, top - 1.2, 0);
        add(new T.TorusGeometry(2.0, 0.25, 6, 16).rotateX(Math.PI / 2), F.glow, 0, top - 4, 0, false);
      }
    },
    // once the first harvest is sent, a button leads straight into the third council meeting
    tick(api) {
      if (!api.flag('harvest') || document.getElementById('nextMeeting')) return;
      const b = document.createElement('button'); b.id = 'nextMeeting';
      b.innerHTML = 'GO TO THE THIRD COUNCIL MEETING ▶<small style="display:block;font-weight:400;font-size:10px;letter-spacing:2px;color:#ffe9b8;margin-top:3px">THE COUNCIL CHOOSES WHAT COMES NEXT</small>';
      b.style.cssText = 'position:fixed;left:50%;bottom:22px;transform:translateX(-50%);z-index:9;padding:10px 22px;font:600 14px "Segoe UI",Arial;letter-spacing:3px;color:#fff;background:rgba(120,90,20,.85);border:1px solid #ffd060;border-radius:5px;cursor:pointer;box-shadow:0 0 18px rgba(255,208,96,.45)';
      b.onmouseenter = () => b.style.background = 'rgba(160,120,30,.95)'; b.onmouseleave = () => b.style.background = 'rgba(120,90,20,.85)';
      b.onclick = () => { location.href = 'councilmeeting/councilmeeting3.html'; };
      document.body.appendChild(b);
    },
    finish: {
      label: 'SEND THE FIRST HARVEST TO KRYOS',
      cam: [[470, 40, -150], [660, 10, -560]],
      start(api) { window.FARM.podK = 0.01; },
      update(api, dt, f) {
        const FARM = window.FARM; FARM.podK = Math.min(1, f / 3);
        if (f > 1 && !this._sp) { this._sp = true; api.sparkle(new api.THREE.Vector3(ST.x, TOP, ST.z), 3); }
        if (f >= 9) { api.setFlag('harvest', true); api.setFlag('opened', true); this._sp = false; return true; }
        return false;
      },
    },
  }));
})();
