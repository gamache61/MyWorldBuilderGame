/* ============================================================
   SEASHORE · BUILD 13 · HARBOUR SHIPS
   Keep this file in projects/seashore next to seashore.html.
   Trip 1 — 2 cargo ships: one ties up at the cargo terminal, one
            anchors in the harbour.
   Trip 2 — a third cargo ship and an ocean research vessel.
   Build 13 ends when you open the shipping lanes (press L). Ships
            then sail out through the harbour mouth and back for good.
   ============================================================ */
(function () {
  const MOUTH = [-303, -775];
  const SHIPS = [
    { park: [-505, 470], path: null },                                                                  // stays at the terminal
    { park: [-640, 120], path: [[-640, 120], [-580, -280], [-420, -470], MOUTH, [-520, -1000], [-1500, -1500], [-2600, -2600]] },
    { park: [-650, -110], path: [[-650, -110], [-575, -310], [-420, -470], MOUTH, [-560, -1050], [-1200, -2200], [-1800, -3400]] },
    { park: [-600, -330], path: [[-600, -330], [-420, -470], MOUTH, [-500, -1000], [-1600, -900], [-3600, 200]] },
  ];
  const head0 = i => { const P = SHIPS[i]; if (!P.path) return Math.PI / 2; const a = P.path[0], b = P.path[1]; return Math.atan2(b[1] - a[1], b[0] - a[0]); };
  const make = (i, kind) => function (g, k, M, THREE) {
    const s = kind === 'research' ? KRYOS.research(THREE) : KRYOS.cargoShip(THREE, i, i === 0 ? 220 : 200);
    s.rotation.y = -head0(i); s.userData = { i }; g.add(s); g.userData.ship = s;
  };
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(KRYOS.cityBuild({
    id: 13,
    name: 'HARBOUR SHIPS',
    brief: 'Cargo ships and an ocean research vessel for the seashore — they tie up at the terminal, anchor in the harbour and sail out to sea.',
    finishLabel: 'OPEN THE SHIPPING LANES', flags: ['sships'], status: ['SHIPPING LANES', 'OPEN'],
    finishCam: [[-450, -400], 1500], lookUp: 0,
    parts: {
      KSHIPA: { name: 'CARGO SHIP', code: 'DF', col: '#2f6690', h: 30, count: 2, at: k => SHIPS[k].park, eye: (k, V) => V(-200, 110, 260),
        needs: api => api.flag('scargo') ? null : 'NEEDS THE CARGO TERMINAL', make: (g, k, M, T) => make(k, 'cargo')(g, k, M, T) },
      KSHIPB: { name: 'CARGO SHIP', code: 'DF', col: '#2f6690', h: 30, count: 1, at: () => SHIPS[2].park, eye: (k, V) => V(-200, 110, 260), make: (g, k, M, T) => make(2, 'cargo')(g, k, M, T) },
      KRVESSEL: { name: 'RESEARCH VESSEL', code: 'DF', col: '#2f6690', h: 30, count: 1, at: () => SHIPS[3].park, eye: (k, V) => V(-150, 80, 180), make: (g, k, M, T) => make(3, 'research')(g, k, M, T) },
    },
    trips: [{ name: 'FIRST 2 SHIPS', parts: ['KSHIPA'] }, { name: 'SHIP & RESEARCH VESSEL', parts: ['KSHIPB', 'KRVESSEL'] }],
    tick(api, dt, t) {
      const go = api.flag('sships');
      for (const p of api.placed) {
        if (p.b !== 13 || !p.piece || !p.piece.userData.ship) continue;
        const s = p.piece.userData.ship, P = SHIPS[s.userData.i];
        s.position.y = Math.sin(t * 0.8 + s.userData.i) * 0.3;
        if (!go || !P.path) { s.position.x = 0; s.position.z = 0; s.rotation.y = -head0(s.userData.i); continue; }
        const [x, z, h] = KRYOS.sail(P.path, t, 9 + s.userData.i, s.userData.i * 70);
        s.position.x = x - p.x; s.position.z = z - p.z; s.rotation.y = -h;
      }
    },
  }));
})();
