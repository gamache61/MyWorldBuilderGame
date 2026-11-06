/* ============================================================
   AEGIS ARK · shared ship plan
   Keep this file in projects/ark next to arkyard.html.
   It holds the shape of the Aegis Ark cargo ship, its
   materials, and the helpers every build file uses.
   build1.js … build14.js load after it.
   ============================================================ */
(function () {
  const S = window.SHIPYARD = {};

  // the Ark's yard sits south-east of the parts depot, across the road from the Seeker's
  S.YARD = { x: 1100, z: 2400 };
  S.SHIP_Y = 30;
  S.parts = {};
  S.TEXT = {
    title: 'AEGIS ARK · SHIPYARD', sign: 'AEGIS ARK SHIPYARD', pad: 'AEGIS ARK · AXA-402', crate: 'AEGIS ARK', code: 'AXA-402', ship: 'THE AEGIS ARK',
    lifted: 'READY TO HAUL PARTS ACROSS THE STARS', gone: 'THE AEGIS ARK HAS LEFT THE YARD', next: 'NEXT: HAUL THE PARTS FOR EVERY BUILD',
    goneBrief: 'The cargo ship is finished and flying. From now on it carries the parts from the depot to every build site.',
  };
  S.launchGlow = [[0, -1, -224, 1.4], [-22, 0, -220, 1], [22, 0, -220, 1], [-11, -8.5, -213, 0.6], [11, -8.5, -213, 0.6]];

  /* ---------- materials ---------- */
  let MM = null;
  const tex = (THREE, w, h, draw) => { const c = document.createElement('canvas'); c.width = w; c.height = h; draw(c.getContext('2d'), w, h); const t = new THREE.CanvasTexture(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; return t; };
  S.mats = THREE => {
    if (MM) return MM;
    const hullTex = tex(THREE, 1024, 1024, (g, w, h) => {
      g.fillStyle = '#4b5059'; g.fillRect(0, 0, w, h);
      const cell = 64;
      for (let i = 0; i < 140; i++) { const pw = cell * (1 + (Math.random() * 3 | 0)), ph = cell * (1 + (Math.random() * 4 | 0)), x = (Math.random() * (w / cell) | 0) * cell, y = (Math.random() * (h / cell) | 0) * cell, v = 68 + Math.random() * 20 | 0; g.fillStyle = `rgb(${v},${v + 3},${v + 9})`; g.fillRect(x, y, pw, ph); }
      g.strokeStyle = 'rgba(10,12,16,.75)'; g.lineWidth = 3;
      for (let x = 0; x <= w; x += cell * 2) { g.beginPath(); g.moveTo(x, 0); g.lineTo(x, h); g.stroke(); }
      for (let y = 0; y <= h; y += cell) { g.beginPath(); g.moveTo(0, y); g.lineTo(w, y); g.stroke(); }
      g.fillStyle = '#7a1f1f'; g.fillRect(0, 512, w, 14);
      g.fillStyle = 'rgba(220,225,230,.55)'; g.font = 'bold 20px Arial';
      for (let i = 0; i < 6; i++) g.fillText('A-' + (100 + Math.random() * 899 | 0), Math.random() * w, Math.random() * h);
    });
    hullTex.repeat.set(1 / 40, 1 / 40);
    const armorTex = hullTex.clone(); armorTex.needsUpdate = true; armorTex.repeat.set(1 / 25, 1 / 25);
    const plumeTex = tex(THREE, 64, 256, (g, w, h) => { const gr = g.createLinearGradient(0, h, 0, 0); gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(.15, 'rgba(255,255,255,.7)'); gr.addColorStop(.5, 'rgba(255,255,255,.2)'); gr.addColorStop(1, 'rgba(255,255,255,0)'); g.fillStyle = gr; g.fillRect(0, 0, w, h); });
    const glow = (c, k, off) => { const col = new THREE.Color(c).multiplyScalar(k); const m = new THREE.MeshBasicMaterial({ color: col.clone() }); m.userData.on = col; m.userData.off = off; return m; };
    const plume = (c, op) => { const col = new THREE.Color(c); const m = new THREE.MeshBasicMaterial({ map: plumeTex, color: col.clone(), transparent: true, opacity: op, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide }); m.userData.on = col; m.userData.off = 0; return m; };
    MM = {
      hull: new THREE.MeshStandardMaterial({ map: hullTex, metalness: 0.6, roughness: 0.42, side: THREE.DoubleSide }),
      armor: new THREE.MeshStandardMaterial({ map: armorTex, color: 0xb8bcc4, metalness: 0.65, roughness: 0.38 }),
      dark: new THREE.MeshStandardMaterial({ color: 0x1d2026, metalness: 0.8, roughness: 0.4 }),
      gun: new THREE.MeshStandardMaterial({ color: 0x30343b, metalness: 0.9, roughness: 0.3 }),
      red: new THREE.MeshStandardMaterial({ color: 0x8a1f1a, metalness: 0.5, roughness: 0.45 }),
      yellow: new THREE.MeshStandardMaterial({ color: 0xd9a21b, metalness: 0.5, roughness: 0.5 }),
      steel: new THREE.MeshStandardMaterial({ color: 0x5a6470, metalness: 0.7, roughness: 0.4 }),
      glass: new THREE.MeshStandardMaterial({ color: 0x050a12, emissive: 0x6fc4ff, emissiveIntensity: 1.1, metalness: 0.9, roughness: 0.1 }),
      podGlass: new THREE.MeshStandardMaterial({ color: 0x0a1622, metalness: 0.9, roughness: 0.06, emissive: 0x2a7fbf, emissiveIntensity: 0.45, transparent: true, opacity: 0.86 }),
      bell: new THREE.MeshStandardMaterial({ color: 0x3c3f46, metalness: .95, roughness: .3, side: THREE.DoubleSide }),
      hidden: new THREE.MeshBasicMaterial({ visible: false }),
      strip: glow(0x40d0ff, 2.2, 0.06), warm: glow(0xffd9a0, 1.8, 0.06), core: glow(0xd8f4ff, 2, 0.06),
      navR: glow(0xff3020, 2, 0.06), navG: glow(0x20ff40, 2, 0.06), navW: glow(0xffffff, 2, 0.06),
      plumeA: plume(0x5fbaff, 0.5), plumeB: plume(0xe8f8ff, 0.9),
    };
    MM.glows = [MM.strip, MM.warm, MM.core, MM.navR, MM.navG, MM.navW, MM.plumeA, MM.plumeB];
    MM.drives = [MM.core, MM.plumeA, MM.plumeB];
    return MM;
  };
  S.setPower = (p) => {
    if (!MM) return;
    for (const m of MM.glows) { const on = m.userData.on, o = m.userData.off, k = m.map ? p * 0.3 : p; m.color.setRGB(o + (on.r - o) * k, o + (on.g - o) * k, o + (on.b - o) * k); }
    MM.glass.emissiveIntensity = 0.1 + 1.0 * p; MM.podGlass.emissiveIntensity = 0.05 + 0.4 * p;
  };

  /* ---------- the Ark's armoured hull shape ---------- */
  const P = [[0, 16], [28, 12], [42, 2], [36, -8], [18, -13], [0, -14], [-18, -13], [-36, -8], [-42, 2], [-28, 12]];
  const BAY_FRONT = 60, BAY_BACK = -80, NOSE = 201, AFT = -185;
  Object.assign(S, { P, BAY_FRONT, BAY_BACK, NOSE, AFT });
  const sect = z => {
    if (z >= BAY_FRONT) { const t = (z - BAY_FRONT) / (NOSE - BAY_FRONT); return { sx: Math.max(0.01, 1 - Math.pow(t, 1.35)), sy: Math.max(0.03, 1 - 0.93 * Math.pow(t, 1.15)), oy: -2.5 * t * t }; }
    if (z <= BAY_BACK) { const t = (BAY_BACK - z) / (BAY_BACK - AFT); return { sx: 1 - 0.18 * t, sy: 1 - 0.12 * t, oy: 0 }; }
    return { sx: 1, sy: 1, oy: 0 };
  };
  S.sp = (THREE, pt, z) => { const s = sect(z); return new THREE.Vector3(pt[0] * s.sx, pt[1] * s.sy + s.oy, z); };
  S.mesh = (THREE, geo, mat, parent, x = 0, y = 0, z = 0) => { const m = new THREE.Mesh(geo, mat); m.position.set(x, y, z); parent.add(m); return m; };
  S.alongZ = geo => { geo.rotateX(Math.PI / 2); return geo; };
  S.loft = (THREE, z0, z1, steps) => {
    const pos = [], uv = [], idx = [], n = P.length; let vi = 0, perim = 0;
    for (let e = 0; e < n; e++) {
      const A = P[e], B = P[(e + 1) % n], len = Math.hypot(B[0] - A[0], B[1] - A[1]);
      for (let k = 0; k <= steps; k++) {
        const z = z0 + (z1 - z0) * k / steps, a = S.sp(THREE, A, z), b = S.sp(THREE, B, z);
        pos.push(a.x, a.y, a.z, b.x, b.y, b.z); uv.push(perim, z, perim + len, z);
        if (k < steps) { const i = vi + k * 2; idx.push(i, i + 1, i + 2, i + 1, i + 3, i + 2); }
      }
      vi += (steps + 1) * 2; perim += len;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
    g.setIndex(idx); g.computeVertexNormals(); return g;
  };
  S.cap = (THREE, z) => {
    const s = sect(z), pos = [], uv = [];
    for (let i = 0; i < P.length; i++) { const A = P[i], B = P[(i + 1) % P.length]; pos.push(0, s.oy, z, A[0] * s.sx, A[1] * s.sy + s.oy, z, B[0] * s.sx, B[1] * s.sy + s.oy, z); uv.push(0, 0, A[0], A[1], B[0], B[1]); }
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2)); g.computeVertexNormals(); return g;
  };
  // a flat plate lying on one facet of the hull (armour, glass, hatches)
  S.slab = (THREE, g, A, B, z0, z1, thick, mat, inset = 0.06) => {
    const zm = (z0 + z1) / 2, a = S.sp(THREE, A, zm), b = S.sp(THREE, B, zm);
    const dx = b.x - a.x, dy = b.y - a.y, len = Math.hypot(dx, dy), nx = -dy / len, ny = dx / len;
    const m = S.mesh(THREE, new THREE.BoxGeometry(len * (1 - inset * 2), thick, Math.abs(z1 - z0)), mat, g);
    m.position.set((a.x + b.x) / 2 + nx * thick / 2, (a.y + b.y) / 2 + ny * thick / 2, zm); m.rotation.z = Math.atan2(dy, dx);
    return m;
  };
  S.turret = (THREE, g, M, pos, up, big, back) => {
    const base = new THREE.Group(); base.position.copy(pos); base.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), up.clone().normalize()); g.add(base);
    const yaw = new THREE.Group(); base.add(yaw); if (back) yaw.rotation.y = Math.PI;
    const pitch = new THREE.Group(); yaw.add(pitch);
    if (big) {
      S.mesh(THREE, new THREE.CylinderGeometry(5, 5.6, 1.4, 16), M.gun, base, 0, 0.4, 0);
      S.mesh(THREE, new THREE.CylinderGeometry(3.6, 4.8, 3.4, 6), M.armor, yaw, 0, 2.6, 0);
      S.mesh(THREE, new THREE.BoxGeometry(5, 1, 4), M.gun, yaw, 0, 4.6, -1);
      pitch.position.set(0, 3, 1.5);
      for (const x of [-1.4, 1.4]) { S.mesh(THREE, S.alongZ(new THREE.CylinderGeometry(0.45, 0.6, 13, 10)), M.gun, pitch, x, 0, 6.5); S.mesh(THREE, S.alongZ(new THREE.CylinderGeometry(0.7, 0.7, 1.6, 10)), M.dark, pitch, x, 0, 12.6); }
    } else {
      S.mesh(THREE, new THREE.CylinderGeometry(2.2, 2.4, 0.8, 12), M.gun, base, 0, 0.3, 0);
      S.mesh(THREE, new THREE.SphereGeometry(1.9, 16, 10, 0, Math.PI * 2, 0, Math.PI / 2), M.armor, yaw, 0, 0.6, 0);
      pitch.position.set(0, 1.5, 0.6);
      S.mesh(THREE, S.alongZ(new THREE.CylinderGeometry(0.25, 0.35, 6, 8)), M.gun, pitch, 0, 0, 3);
    }
  };
  S.engine = (THREE, g, M, x, y, s) => {
    const e = new THREE.Group(); e.position.set(x, y, -201); e.scale.setScalar(s); g.add(e);
    const bell = [[9, 0], [8.2, 3], [6.6, 7], [5, 11], [4, 14], [3.6, 16]].map(([r, h]) => new THREE.Vector2(r, h));
    S.mesh(THREE, S.alongZ(new THREE.LatheGeometry(bell, 32)), M.bell, e);
    S.mesh(THREE, new THREE.TorusGeometry(9.1, 0.5, 8, 40), M.strip, e, 0, 0, 0.2);
    S.mesh(THREE, new THREE.CircleGeometry(3.6, 24), M.core, e, 0, 0, 15).rotation.y = Math.PI;
    for (const [len, rad, mat] of [[60, 7.5, M.plumeA], [30, 4.5, M.plumeB]]) {
      const pg = new THREE.ConeGeometry(rad, len, 32, 1, true); pg.rotateX(-Math.PI / 2); pg.translate(0, 0, -len / 2 + 2);
      const p = S.mesh(THREE, pg, mat, e); p.userData.noShadow = true;
    }
  };

  S.part = (id, def) => { S.parts[id] = Object.assign({ id }, def); return id; };
  S.build = def => { (window.SHIPYARD_BUILDS = window.SHIPYARD_BUILDS || []).push(def); };
})();
