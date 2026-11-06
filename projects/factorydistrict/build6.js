/* ============================================================
   THE FACTORY DISTRICT · BUILD 6 · THE FREIGHT YARD
   Keep this file in projects/factorydistrict next to factorydistrict.html.
   The freight yard where crates of Unity-made parts are lined up
   for the Ark, a crate gantry over it and four automatic trucks.
   Ends with L: the district transporter beams the first crates of
   Unity-made parts into the Aegis Ark.
   ============================================================ */
(function () {
  const FA = window.FAC;
  FA.CARGO = 24; FA.crates = [];
  // one crate of Unity-made parts in the Ark's cargo bay (colour = part family)
  FA.loadCrate = (api, i, fx) => {
    const T = api.THREE, ship = api.ship, spots = api.baySpots; if (!ship || !spots) return;
    const free = spots.filter(s => !s.kit), sp = free[i]; if (!sp || FA.crates[i]) return;
    const cols = [0x6c757d, 0x9a2a22, 0xe8e1d1, 0xe8c13a, 0xd9731b];
    const mats = FA._cm || (FA._cm = cols.map(c => new T.MeshStandardMaterial({ color: c, metalness: 0.4, roughness: 0.6 })));
    const m = new T.Mesh(new T.BoxGeometry(2.44, 2.6, 12.2), mats[i % 5]); m.castShadow = m.receiveShadow = true; m.position.set(sp.x, sp.y, sp.z); ship.add(m); FA.crates[i] = m;
    if (fx) api.sparkle(ship.localToWorld(m.position.clone()), 0.8);
  };
  FA.hint = (text) => {
    let el = document.getElementById('facHint');
    if (!el) { el = document.createElement('div'); el.id = 'facHint'; el.style.cssText = 'position:fixed;left:50%;bottom:90px;transform:translateX(-50%);z-index:8;padding:8px 18px;background:rgba(8,20,35,.85);border:1px solid #ffd060;border-radius:5px;color:#fff;font:600 13px "Segoe UI",Arial;letter-spacing:3px;text-align:center;pointer-events:none'; document.body.appendChild(el); }
    el.style.display = text ? 'block' : 'none'; if (text) el.textContent = text;
  };
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(FA.build({
    id: 6, name: 'THE FREIGHT YARD',
    brief: 'The freight yard where crates of Unity-made parts wait for the Ark, a crate gantry over it and four automatic trucks — then the first Unity-made crates are beamed into the Aegis Ark.',
    types: {
      YARD:    { code: 'SF', name: 'FREIGHT YARD', col: '#6c757d', w: 200, d: 60, h: 8 },
      CGANTRY: { code: 'HP', name: 'CRATE GANTRY', col: '#d9a21b', w: 70, d: 40, h: 30 },
      TRUCK:   { code: 'SY', name: 'AUTOMATIC TRUCK', col: '#e8e1d1', w: 6, d: 20, h: 6 },
    },
    order: ['YARD', 'CGANTRY', 'TRUCK'],
    at: { YARD: [[450, 330]], CGANTRY: [[420, 330]], TRUCK: [[600, 300], [600, 330], [640, 300], [640, 330]] },
    eye: [-260, 150, 300],
    stats(api, c) { return [['FREIGHT YARD', c('YARD') ? 'OPEN' : 'NOT YET'], ['CRATE GANTRY', c('CGANTRY') ? 'READY' : 'NOT YET'], ['TRUCKS', c('TRUCK') + ' / 4'], ['UNITY-MADE CRATES IN THE ARK', api.flag('unityMade') ? FA.CARGO : 0]]; },
    make(type, k, g, add, F, api) {
      const T = api.THREE, cols = [F.grey, F.red, F.white, F.yellow, F.orange];
      if (type === 'YARD') {
        add(new T.BoxGeometry(200, 0.6, 60), F.deck, 0, 0.3, 0);
        for (let r = 0; r < 3; r++) for (let c = 0; c < 14; c++) for (let l = 0; l < 2; l++) add(new T.BoxGeometry(2.44, 2.6, 12.2), cols[(r * 3 + c + l) % 5], 10 + c * 6, 1.9 + l * 2.6, -18 + r * 16);
        for (const [w, d, x, z] of [[200, 1, 0, 29.5], [200, 1, 0, -29.5]]) add(new T.BoxGeometry(w, 0.15, d), F.yellow, x, 0.7, z, false);
      } else if (type === 'CGANTRY') {
        for (const x of [-32, 32]) for (const z of [-18, 18]) add(new T.BoxGeometry(2.4, 28, 2.4), F.yellow, x, 14, z);
        for (const z of [-18, 18]) add(new T.BoxGeometry(68, 3, 3), F.yellow, 0, 29, z);
        add(new T.BoxGeometry(8, 3, 40), F.dark, 6, 29, 0);
        add(new T.CylinderGeometry(0.2, 0.2, 16, 6), F.steel, 6, 20, 0);
        add(new T.BoxGeometry(4, 1, 13), F.yellow, 6, 11.6, 0);
        add(new T.BoxGeometry(2.44, 2.6, 12.2), F.red, 6, 9.6, 0);
      } else if (type === 'TRUCK') {
        // self-driving freight trucks, no cab and no driver
        add(new T.BoxGeometry(5, 1.4, 18), F.dark, 0, 1.6, 0);
        add(new T.BoxGeometry(4.6, 2.6, 13), F.white, 0, 3.6, -2);
        add(new T.BoxGeometry(4.6, 2.4, 3.6), F.panel, 0, 3.4, 7);
        add(new T.BoxGeometry(4.2, 0.6, 0.2), F.eye, 0, 3.6, 8.85, false);
        for (const z of [-6, 0, 6.5]) for (const s of [-1, 1]) add(new T.CylinderGeometry(1, 1, 0.8, 14).rotateZ(Math.PI / 2), F.dark, s * 2.6, 1, z);
        add(new T.BoxGeometry(2.44, 2.6, 12.2), cols[k % 5], 0, 6.2, -2);
      }
    },
    tick(api) {
      // once the first Unity-made parts are in the Ark, a button leads straight into the seventh council meeting
      if (api.flag('opened') && !document.getElementById('nextMeeting')) {
        const b = document.createElement('button'); b.id = 'nextMeeting';
        b.innerHTML = 'GO TO THE SEVENTH COUNCIL MEETING ▶<small style="display:block;font-weight:400;font-size:10px;letter-spacing:2px;color:#ffe9b8;margin-top:3px">THE COUNCIL CHOOSES WHAT COMES NEXT</small>';
        b.style.cssText = 'position:fixed;left:50%;bottom:22px;transform:translateX(-50%);z-index:9;padding:10px 22px;font:600 14px "Segoe UI",Arial;letter-spacing:3px;color:#fff;background:rgba(120,90,20,.85);border:1px solid #ffd060;border-radius:5px;cursor:pointer;box-shadow:0 0 18px rgba(255,208,96,.45)';
        b.onmouseenter = () => b.style.background = 'rgba(160,120,30,.95)'; b.onmouseleave = () => b.style.background = 'rgba(120,90,20,.85)';
        b.onclick = () => { location.href = 'councilmeeting/councilmeeting7.html'; };
        document.body.appendChild(b);
      }
      if (api.flag('unityMade') && FA.crates.filter(Boolean).length < FA.CARGO) for (let i = 0; i < FA.CARGO; i++) FA.loadCrate(api, i, false);
    },
    finish: {
      label: 'BEAM THE FIRST UNITY-MADE PARTS INTO THE ARK',
      cam: [[0, 90, 330], [180, 0, 60]],
      start(api) { this.n = 0; this.t1 = 0; },
      update(api, dt, f) {
        this.t1 += dt;
        const want = Math.min(FA.CARGO, Math.floor(Math.max(0, this.t1 - 1.5) / 0.3));
        while (this.n < want) { FA.loadCrate(api, this.n, true); this.n++; }
        FA.hint(this.n < FA.CARGO ? 'BEAMING UNITY-MADE PARTS INTO THE AEGIS ARK · ' + this.n + ' / ' + FA.CARGO + ' CRATES' : 'THE FIRST PARTS MADE ON UNITY ARE IN THE ARK · UNITY BUILDS FOR ITSELF NOW');
        if (this.n >= FA.CARGO && this.t1 > 1.5 + FA.CARGO * 0.3 + 5) { FA.hint(''); api.setFlag('unityMade', true); api.setFlag('opened', true); return true; }
        return false;
      },
    },
  }));
})();
