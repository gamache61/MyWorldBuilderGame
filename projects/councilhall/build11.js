/* ============================================================
   THE COUNCIL HALL · BUILD 11 · OPENING DAY
   Keep this file in projects/councilhall next to councilhall.html.
   Golden welcome arches over the six paths. Then open the hall:
   the people of Unity arrive and fill the seats, and the twelve
   heads of the Unity Council take their places round the Heart.
   Build 11 ends when you open the Council Hall (press L).
   ============================================================ */
(function () {
  const K = KRYOS, H = K.HALL, PS = K.PS, TAU = Math.PI * 2;
  const NAMES = ['VANCE', 'OKAFOR', 'LINDQVIST', 'TANAKA', 'MOREAU', 'SINGH', 'NAKAMURA', 'ADEYEMI', 'PARK', 'DUBOIS', 'REYES', 'KAPOOR'];
  const DEPT = ['#b38a2e', '#2f6fb0', '#2f9a6a', '#a3261d', '#7b4fa0', '#3fb0c8'];
  const SH = ['#b03a2e', '#2f6690', '#e8dcc0', '#3a7d44', '#7b4fa0', '#d9a21b', '#eef2f5', '#5fa6c8', '#4a4234'], PA = ['#2c3a52', '#3a3a3a', '#5a4b36', '#e8e2d8'];
  const civ = i => ({ kind: 'worker', civilian: true, seed: 2000 + i, female: i % 2 === 1, shirt: SH[i % SH.length], pants: PA[(i * 7) % PA.length], hairStyle: i % 2 ? ['bun', 'long', 'bob'][i % 3] : undefined, beard: i % 7 === 0 });
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(K.cityBuild({
    id: 11, name: 'OPENING DAY',
    brief: 'Golden welcome arches over the six paths. Then open the doors: the people of Unity fill the hall, and the twelve heads of the Unity Council take their places round the Heart.',
    finishLabel: 'OPEN THE COUNCIL HALL', flags: ['opened'], status: ['THE COUNCIL HALL', 'OPEN'],
    finishCam: [[K.HX, K.HZ], 230], lookUp: 12,
    parts: {
      CARCH: { name: 'WELCOME ARCH', code: 'HP', col: '#d9a21b', h: 50, count: 6, at: k => K.hallAt(K.pathA(k), H.PLAZA + 18), eye: (k, V) => V(90, 50, 110),
        make(g, k, M, THREE) {
          const S = K.hallMats(THREE), r = new THREE.Group(); r.rotation.y = -K.pathA(k); g.add(r);
          for (const z of [-22, 22]) K.add(THREE, r, new THREE.BoxGeometry(5, 34, 5), S.white, 0, 17, z);
          K.add(THREE, r, new THREE.TorusGeometry(22, 2.4, 10, 32, Math.PI).rotateY(Math.PI / 2), S.gold, 0, 34, 0);
          K.add(THREE, r, new THREE.SphereGeometry(3, 16, 12), S.gold, 0, 57, 0);
        } },
    },
    trips: [{ name: 'WELCOME ARCHES', parts: ['CARCH'] }],
    tick(api, dt, t, lv) {
      // once the hall is open, a button leads straight into the first council meeting
      if (api.flag('opened') && !document.getElementById('nextMeeting')) {
        const b = document.createElement('button'); b.id = 'nextMeeting';
        b.innerHTML = 'GO TO THE FIRST COUNCIL MEETING ▶<small style="display:block;font-weight:400;font-size:10px;letter-spacing:2px;color:#ffe9b8;margin-top:3px">THE TWELVE MEET ROUND THE HEART</small>';
        b.style.cssText = 'position:fixed;left:50%;bottom:22px;transform:translateX(-50%);z-index:9;padding:10px 22px;font:600 14px "Segoe UI",Arial;letter-spacing:3px;color:#fff;background:rgba(120,90,20,.85);border:1px solid #ffd060;border-radius:5px;cursor:pointer;box-shadow:0 0 18px rgba(255,208,96,.45)';
        b.onmouseenter = () => b.style.background = 'rgba(160,120,30,.95)'; b.onmouseleave = () => b.style.background = 'rgba(120,90,20,.85)';
        b.onclick = () => { location.href = 'councilmeeting/councilmeeting.html'; };
        document.body.appendChild(b);
      }
      if (this._people || lv < 1 || !window.WB_PERSON) return;
      const piece = api.placed.find(p => p.b === 11 && p.piece); if (!piece) return;
      const parent = piece.piece.parent, gy = K.ground(api, K.HX, K.HZ), HX = K.HX, HZ = K.HZ;
      const put = (o, act, x, y, z, ry, extra) => { const c = window.WB_PERSON(parent, o, act, HX + x, gy + y, HZ + z, ry, extra); c.P.root.scale.setScalar(PS); return c; };
      this._people = true;
      // the Unity Council round the Heart — one of them stands to speak
      for (let i = 0; i < 12; i++) {
        const a = i / 12 * TAU + Math.PI / 12, face = Math.atan2(-Math.cos(a), -Math.sin(a));
        const o = { kind: 'crew', seed: 3000 + i, name: NAMES[i], dept: DEPT[i % 6], rank: 4, coat: true, female: i % 2 === 1, hairStyle: i % 2 ? ['bun', 'bob', 'long'][i % 3] : ['short', 'short', 'buzz'][i % 3], beard: i === 3 || i === 9, hair: i % 4 === 0 ? '#7d7d7d' : undefined };
        if (i === 0) { put(o, 'gesture', Math.cos(a) * 18, 7.6, Math.sin(a) * 18, face); continue; }
        put(o, 'sitCaptain', Math.cos(a) * K.COUNCIL_R - Math.sin(face) * 0.05 * PS, 7.6 + 0.1 * PS, Math.sin(a) * K.COUNCIL_R - Math.cos(face) * 0.05 * PS, face);
      }
      // the people of Unity in the seats
      const chairs = K.hallChairs().slice(), rnd = K.rng(11);
      for (let i = chairs.length - 1; i > 0; i--) { const j = (rnd() * (i + 1)) | 0; [chairs[i], chairs[j]] = [chairs[j], chairs[i]]; }
      chairs.slice(0, 110).forEach((c, i) => put(civ(i), 'sitType', c.x - Math.sin(c.face) * 0.05 * PS, c.y + 0.1 * PS, c.z - Math.cos(c.face) * 0.05 * PS, c.face));
      // people strolling round the plaza
      for (let i = 0; i < 24; i++) { const r = 180 + i * 6; put(civ(200 + i), i % 6 === 0 ? 'carry' : 'walk', 0, 2, 0, 0, { path: { type: 'circle', cx: HX, cz: HZ, r, speed: 5 + (i % 5) * 0.6 } }); }
    },
  }));
})();
