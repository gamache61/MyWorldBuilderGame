/* ============================================================
   THE SEEKER · shared ship plan
   Keep this file in projects/seeker next to seeker.html.
   It holds the shape of the Seeker, its materials, and the
   helpers every build file uses. build1.js … build14.js load
   after it.
   ============================================================ */
(function () {
  const S = window.SEEKER = {};

  // the shipyard sits south-west of the parts depot on Earth
  S.YARD = { x: -1000, z: 2400 };
  S.SHIP_Y = 48;            // height of the ship's centre line above the yard floor
  S.parts = {};             // every part of the ship, by id

  // a little seeded random so the windows always come out the same
  S.rng = seed => () => (seed = (seed * 16807) % 2147483647) / 2147483647;

  /* ---------- materials (made once, shared by every part) ---------- */
  let MM = null;
  S.mats = THREE => {
    if (MM) return MM;
    const c = document.createElement('canvas'); c.width = c.height = 1024; const g = c.getContext('2d');
    g.fillStyle = '#a3aab4'; g.fillRect(0, 0, 1024, 1024);
    for (let i = 0; i < 160; i++) { const v = 150 + Math.random() * 22 | 0; g.fillStyle = `rgb(${v},${v + 4},${v + 10})`; g.fillRect(Math.random() * 1024, Math.random() * 1024, 40 + Math.random() * 120, 20 + Math.random() * 60); }
    g.strokeStyle = 'rgba(50,56,66,.3)'; g.lineWidth = 2;
    for (let x = 0; x < 1024; x += 96) { g.beginPath(); g.moveTo(x, 0); g.lineTo(x, 1024); g.stroke(); }
    for (let y = 0; y < 1024; y += 64) { g.beginPath(); g.moveTo(0, y); g.lineTo(1024, y); g.stroke(); }
    const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace; tex.wrapS = tex.wrapT = THREE.RepeatWrapping; tex.anisotropy = 8;
    const flat = tex.clone(); flat.repeat.set(1 / 140, 1 / 140); flat.needsUpdate = true;
    const round = tex.clone(); round.repeat.set(3, 2); round.needsUpdate = true;
    const glow = (r, g, b) => { const m = new THREE.MeshBasicMaterial({ color: new THREE.Color(r, g, b) }); m.userData.on = new THREE.Color(r, g, b); return m; };
    MM = {
      hullA: new THREE.MeshStandardMaterial({ map: flat, metalness: 0.55, roughness: 0.38 }),
      hull: new THREE.MeshStandardMaterial({ map: round, metalness: 0.55, roughness: 0.38 }),
      dark: new THREE.MeshStandardMaterial({ color: 0x2a3038, metalness: 0.7, roughness: 0.35 }),
      gold: new THREE.MeshStandardMaterial({ color: 0xd8b060, metalness: 0.95, roughness: 0.25 }),
      glass: new THREE.MeshStandardMaterial({ color: 0x9fd8ff, metalness: 0.9, roughness: 0.05, transparent: true, opacity: 0.75, emissive: 0x2a6090, emissiveIntensity: 0.4 }),
      yellow: new THREE.MeshStandardMaterial({ color: 0xd9a21b, metalness: 0.5, roughness: 0.5 }),
      steel: new THREE.MeshStandardMaterial({ color: 0x5a6470, metalness: 0.7, roughness: 0.4 }),
      teal: glow(0.3, 2.2, 2.0), amber: glow(3.0, 1.6, 0.35), win: glow(1.7, 1.45, 1.0),
      navR: glow(2.5, 0.25, 0.25), navG: glow(0.25, 2.5, 0.45), beacon: glow(2.5, 2.5, 2.5),
    };
    MM.glows = [MM.teal, MM.amber, MM.win, MM.navR, MM.navG, MM.beacon];
    return MM;
  };
  // power: 0 = lights dark (still being built) · 1 = the Seeker is alive
  const OFF = [0.06, 0.065, 0.075];
  S.setPower = (p, pulse = 0) => {
    if (!MM) return;
    for (const m of MM.glows) { const on = m.userData.on, k = m === MM.teal ? p * (0.85 + 0.15 * pulse) : p; m.color.setRGB(OFF[0] + (on.r - OFF[0]) * k, OFF[1] + (on.g - OFF[1]) * k, OFF[2] + (on.b - OFF[2]) * k); }
    MM.glass.emissiveIntensity = 0.05 + 0.35 * p;
  };

  /* ---------- the arrowhead main hull with its split prow ---------- */
  S.outline = (THREE, s) => {
    const p = new THREE.Shape(), m = (x, y) => [x * s, y * s - (1 - s) * 30];
    p.moveTo(...m(-28, -64));
    p.quadraticCurveTo(...m(-78, -50), ...m(-88, -10));
    p.quadraticCurveTo(...m(-92, 20), ...m(-70, 60));
    p.quadraticCurveTo(...m(-40, 120), ...m(-16, 172));
    p.lineTo(...m(-9, 174)); p.quadraticCurveTo(...m(0, 136), ...m(9, 174)); p.lineTo(...m(16, 172));
    p.quadraticCurveTo(...m(40, 120), ...m(70, 60));
    p.quadraticCurveTo(...m(92, 20), ...m(88, -10));
    p.quadraticCurveTo(...m(78, -50), ...m(28, -64));
    p.quadraticCurveTo(...m(0, -50), ...m(-28, -64));
    return p;
  };
  // the three layers of the main hull: [scale, thickness, bevel, base height, window rows]
  S.TIERS = [
    { s: 1, depth: 6, bev: 5, y: -3, rows: [[1, 1, 230, 5.4], [0.92, 8.3, 150, 0]] },
    { s: 0.78, depth: 4, bev: 4, y: 6, rows: [[0.7, 14.2, 100, 0]] },
    { s: 0.5, depth: 4, bev: 3, y: 12, rows: [[0.46, 19.2, 60, 0]] },
  ];
  // cut a polygon to the part that passes a straight-line test (keep(p) >= 0)
  const clip = (poly, keep) => {
    const out = [];
    for (let i = 0; i < poly.length; i++) {
      const a = poly[i], b = poly[(i + 1) % poly.length], da = keep(a), db = keep(b);
      if (da >= 0) out.push(a);
      if ((da >= 0) !== (db >= 0)) { const t = da / (da - db); out.push(a.clone().lerp(b, t)); }
    }
    return out;
  };
  // all the windows of one layer, worked out once
  const winCache = {};
  const tierWindows = (THREE, ti) => {
    if (winCache[ti]) return winCache[ti];
    const r = S.rng(77 + ti * 13), pts = [];
    for (const [s, y, n, out] of S.TIERS[ti].rows) {
      const a = S.outline(THREE, s).getSpacedPoints(n);
      for (let i = 0; i < a.length - 1; i++) {
        const p = a[i], q = a[i + 1], nx = q.y - p.y, nz = -(q.x - p.x), l = Math.hypot(nx, nz) || 1;
        if (r() < 0.5 || (i % 6) > 3) continue;
        pts.push([p.x - nx / l * out, y, p.y - nz / l * out]);
      }
    }
    return (winCache[ti] = pts);
  };
  // one piece of a hull layer: layer ti, from z0 to z1, on one side (side -1 port, +1 starboard)
  S.hullPiece = (THREE, g, ti, z0, z1, side) => {
    const M = S.mats(THREE), T = S.TIERS[ti];
    let poly = S.outline(THREE, T.s).getPoints(24); poly.pop();
    poly = clip(poly, p => p.x * side); poly = clip(poly, p => p.y - z0); poly = clip(poly, p => z1 - p.y);
    if (poly.length < 3) return;
    const geo = new THREE.ExtrudeGeometry(new THREE.Shape(poly), { depth: T.depth, bevelEnabled: true, bevelThickness: T.bev, bevelSize: T.bev, bevelSegments: 4, curveSegments: 12 });
    geo.rotateX(Math.PI / 2); geo.translate(0, T.y + T.depth, 0);
    const m = new THREE.Mesh(geo, M.hullA); m.castShadow = m.receiveShadow = true; g.add(m);
    const w = tierWindows(THREE, ti).filter(p => p[0] * side >= 0 && p[2] >= z0 && p[2] < z1);
    if (w.length) {
      const im = new THREE.InstancedMesh(new THREE.BoxGeometry(1.6, 0.5, 1.6), M.win, w.length), mx = new THREE.Matrix4();
      w.forEach((p, i) => { im.setMatrixAt(i, mx.makeTranslation(p[0], p[1], p[2])); }); g.add(im);
    }
  };

  /* ---------- small helpers the build files use ---------- */
  S.add = (THREE, g, geo, mat, x = 0, y = 0, z = 0) => { const m = new THREE.Mesh(geo, mat); m.position.set(x, y, z); m.castShadow = m.receiveShadow = true; g.add(m); return m; };
  S.V = (THREE, x, y, z) => new THREE.Vector3(x, y, z);
  // one part = one truck load, lifted into place by the gantry crane
  // def: { name, at: [x,y,z] (where the crane sets it, ship coordinates), make(g, M, THREE), cradle: true if it stays in the yard }
  S.part = (id, def) => { S.parts[id] = Object.assign({ id }, def); return id; };
  // register a build
  S.build = def => { (window.SEEKER_BUILDS = window.SEEKER_BUILDS || []).push(def); };
})();
