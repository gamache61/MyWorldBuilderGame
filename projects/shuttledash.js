/* ============================================================
   THE SHUTTLE DASH · speed, altitude, heading and a GPS map of every area
   Keep this file at projects/shuttledash.js. Chapters 63 and 72 load it.
   To add a new area to the GPS: add one line to PLACES below.
   x is east, z is south (north is -z), 1 unit = 1 metre.
   ============================================================ */
(function () {
  var PLACES = [
    // name,                 x,      z,      colour
    ['KRYOS CITY',           120,    0,      '#7fd8ff'],
    ['KRYOS SHUTTLE STOP',   270,    -120,   '#7fd8ff'],
    ['GUESTS’ QUARTER', -700,   -690,   '#ffd060'],
    ['PARTS WORKS',          300,    1050,   '#ffb040'],
    ['SEED VAULT',           -4932,  -10052, '#3ddc84'],
    ['ORCHARD VALLEY',       -5432,  -7452,  '#3ddc84'],
    ['HARVEST FESTIVAL',     -4232,  -6552,  '#3ddc84'],
    ['ELDERS’ GARDEN',  -3032,  -5652,  '#3ddc84'],
    ['MOUNTAIN HOUSE',       -8010,  -11110, '#ffffff'],
    ['FACTORY DISTRICT',     7800,   2400,   '#ffb040']
  ];
  var ZOOMS = [{ r: 1500, n: '1.5 KM' }, { r: 5000, n: '5 KM' }, { r: 16000, n: 'ALL' }];

  function make(T) {
    var D = { group: new T.Group(), places: PLACES, zoom: 1, _t: 0 };
    var g = D.group;
    var dark = new T.MeshStandardMaterial({ color: 0x0b1424, roughness: 0.4, metalness: 0.6 });
    var trim = new T.MeshStandardMaterial({ color: 0x1c2c4a, roughness: 0.3, metalness: 0.7 });
    function add(geo, mat, x, y, z, rx, ry, rz) { var m = new T.Mesh(geo, mat); m.position.set(x, y, z); m.rotation.set(rx || 0, ry || 0, rz || 0); g.add(m); return m; }
    // a low sloped console like the ark's, so the whole windshield stays clear
    var TILT = -0.75, SY = -0.74, SZ = -2.4;
    add(new T.BoxGeometry(3.6, 0.5, 1.5), dark, 0, -1.1, -2.4, 0.35);
    add(new T.BoxGeometry(3.2, 0.04, 0.06), trim, 0, SY + 0.2, SZ - 0.3, TILT);
    // the windshield frame: one panel with a window cut out, rounded at the top corners
    (function () {
      var sh = new T.Shape(); sh.moveTo(-3, -1.6); sh.lineTo(3, -1.6); sh.lineTo(3, 1.5); sh.lineTo(-3, 1.5); sh.lineTo(-3, -1.6);
      var hl = new T.Path(), r = 0.5, xt = 1.5, xb = 1.68, yt = 0.7, yb = -1.5;
      hl.moveTo(-xb, yb); hl.lineTo(xb, yb); hl.lineTo(xt + 0.02, yt - r); hl.quadraticCurveTo(xt - 0.02, yt, xt - r, yt);
      hl.lineTo(-xt + r, yt); hl.quadraticCurveTo(-xt + 0.02, yt, -xt - 0.02, yt - r); hl.lineTo(-xb, yb);
      sh.holes.push(hl);
      var m = new T.Mesh(new T.ShapeGeometry(sh), new T.MeshStandardMaterial({ color: 0x0b1424, roughness: 0.4, metalness: 0.6, side: T.DoubleSide }));
      m.position.z = -2.4; g.add(m);
    })();
    // small round gauges and lights on the roof band and both side pillars
    var gauges = [];
    function dial(rad, px, py, rz, col, needle) {
      var c = document.createElement('canvas'); c.width = c.height = 96; var x = c.getContext('2d');
      x.fillStyle = '#06101c'; x.beginPath(); x.arc(48, 48, 46, 0, 7); x.fill();
      x.strokeStyle = '#3a4a66'; x.lineWidth = 5; x.beginPath(); x.arc(48, 48, 44, 0, 7); x.stroke();
      x.strokeStyle = col; x.lineWidth = 3; for (var i = 0; i <= 8; i++) { var a = Math.PI * (0.75 + 1.5 * i / 8); x.beginPath(); x.moveTo(48 + Math.cos(a) * 32, 48 + Math.sin(a) * 32); x.lineTo(48 + Math.cos(a) * 40, 48 + Math.sin(a) * 40); x.stroke(); }
      var an = Math.PI * (0.75 + 1.5 * needle); x.strokeStyle = '#ffffff'; x.lineWidth = 4; x.beginPath(); x.moveTo(48, 48); x.lineTo(48 + Math.cos(an) * 30, 48 + Math.sin(an) * 30); x.stroke();
      x.fillStyle = col; x.beginPath(); x.arc(48, 48, 6, 0, 7); x.fill();
      var tex = new T.CanvasTexture(c); tex.colorSpace = T.SRGBColorSpace;
      var m = new T.Mesh(new T.CircleGeometry(rad, 24), new T.MeshBasicMaterial({ map: tex, toneMapped: false }));
      m.position.set(px, py, -2.38); m.rotation.z = rz; g.add(m);
    }
    function lamp(px, py, col) { var m = new T.Mesh(new T.CircleGeometry(0.025, 10), new T.MeshBasicMaterial({ color: col, toneMapped: false })); m.position.set(px, py, -2.38); g.add(m); }
    var cols = ['#3df0c8', '#ffd060', '#7fd8ff', '#ff9a4a', '#3ddc84'];
    for (var i = 0; i < 7; i++) dial(0.085, -1.02 + i * 0.34, 0.86, 0, cols[i % 5], 0.2 + ((i * 37) % 10) / 14);
    for (var l = 0; l < 10; l++) lamp(-1.19 + l * 0.265, 0.74 + (l % 2) * 0.04, l % 3 === 0 ? 0xff5a4a : l % 3 === 1 ? 0x3df0c8 : 0xffd060);
    for (var q = -1; q <= 1; q += 2) for (var j = 0; j < 4; j++) dial(0.085, q * (1.66 - j * 0.01), 0.35 - j * 0.28, q * 0.16, cols[(j + (q > 0 ? 2 : 0)) % 5], 0.15 + ((j * 53 + (q > 0 ? 3 : 0)) % 10) / 13);
    function screen(w, h, px, cw, ch) {
      var c = cw ? document.createElement('canvas') : null, tex = null;
      if (c) { c.width = cw; c.height = ch; tex = new T.CanvasTexture(c); tex.colorSpace = T.SRGBColorSpace; }
      var frame = add(new T.BoxGeometry(w + 0.07, h + 0.07, 0.03), trim, px, SY, SZ, TILT);
      var m = new T.Mesh(new T.PlaneGeometry(w, h), new T.MeshBasicMaterial({ map: tex, color: tex ? 0xffffff : 0x04101c, toneMapped: false }));
      m.position.set(0, 0, 0.02); frame.add(m);
      return { c: c, x: c ? c.getContext('2d') : null, tex: tex, mesh: m };
    }
    D.speed = screen(0.9, 0.54, -0.98, 480, 288);
    D.view = screen(0.9, 0.54, 0, 0, 0);
    D.gps = screen(0.9, 0.54, 0.98, 480, 288);
    D.setView = function (tex) { D.view.mesh.material.map = tex; D.view.mesh.material.color.set(0xffffff); D.view.mesh.material.needsUpdate = true; };
    g.visible = false;
    // the view straight down: a small camera under the craft drawn onto the middle screen
    D.down = null; D._dn = 0;
    D.renderDown = function (renderer, scene, pos, hide, dt, fx, fz) {
      D._dn -= dt; if (D._dn > 0) return; D._dn = 0.08;
      if (!D.down) { var rt = new T.WebGLRenderTarget(400, 240); rt.texture.colorSpace = T.SRGBColorSpace; var cm = new T.PerspectiveCamera(60, 400 / 240, 1, 20000); D.down = { rt: rt, cam: cm }; D.setView(rt.texture); }
      var cm = D.down.cam; cm.position.set(pos.x, pos.y - 3, pos.z); cm.up.set(fx || 0, 0, fz === undefined ? -1 : fz); cm.lookAt(pos.x, pos.y - 10, pos.z);
      var vis = hide.map(function (o) { return o.visible; }); hide.forEach(function (o) { o.visible = false; });
      var prev = renderer.getRenderTarget(); renderer.setRenderTarget(D.down.rt); renderer.render(scene, cm); renderer.setRenderTarget(prev);
      hide.forEach(function (o, i) { o.visible = vis[i]; });
    };
    D.zoomNext = function () { D.zoom = (D.zoom + 1) % ZOOMS.length; };
    D.update = function (st, dt) {
      D._t -= dt; if (D._t > 0 && !st.force) return; D._t = 0.1;
      drawSpeed(D.speed.x, st); D.speed.tex.needsUpdate = true;
      drawGPS(D.gps.x, st, D.zoom, PLACES); D.gps.tex.needsUpdate = true;
    };
    return D;
  }

  function drawSpeed(x, st) {
    var w = 480, h = 288;
    x.fillStyle = '#04101c'; x.fillRect(0, 0, w, h);
    x.strokeStyle = '#2a7fbf'; x.lineWidth = 3; x.strokeRect(3, 3, w - 6, h - 6);
    // dial
    var cx = 160, cy = 160, R = 110, max = st.maxSpeed || 1100;
    x.lineWidth = 12; x.strokeStyle = '#12304a'; x.beginPath(); x.arc(cx, cy, R, Math.PI * 0.8, Math.PI * 2.2); x.stroke();
    var f = Math.max(0, Math.min(1, st.speed / max));
    var grad = f > 0.8 ? '#ff6a4a' : f > 0.55 ? '#ffd060' : '#3df0c8';
    x.strokeStyle = grad; x.beginPath(); x.arc(cx, cy, R, Math.PI * 0.8, Math.PI * (0.8 + 1.4 * f)); x.stroke();
    x.lineWidth = 2; x.strokeStyle = '#7fd8ff';
    for (var i = 0; i <= 10; i++) { var a = Math.PI * (0.8 + 1.4 * i / 10), r1 = R - 16, r2 = R - (i % 5 === 0 ? 30 : 24); x.beginPath(); x.moveTo(cx + Math.cos(a) * r1, cy + Math.sin(a) * r1); x.lineTo(cx + Math.cos(a) * r2, cy + Math.sin(a) * r2); x.stroke(); }
    x.fillStyle = '#ffffff'; x.textAlign = 'center'; x.font = 'bold 62px Segoe UI, Arial'; x.fillText(String(Math.round(st.speed)), cx, cy + 22);
    x.fillStyle = '#7fd8ff'; x.font = '600 20px Segoe UI, Arial'; x.fillText('KM/H', cx, cy + 50);
    // readouts
    var hd = (Math.round(st.headingDeg) + 360) % 360, dirs = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'], dn = dirs[Math.round(hd / 45) % 8];
    x.textAlign = 'left'; var rx = 300;
    x.fillStyle = '#7fd8ff'; x.font = '600 18px Segoe UI, Arial'; x.fillText('ALTITUDE', rx, 70); x.fillText('HEADING', rx, 140); x.fillText('CLIMB', rx, 210);
    x.fillStyle = '#ffffff'; x.font = 'bold 36px Segoe UI, Arial';
    x.fillText(Math.round(st.alt) + ' M', rx, 106); x.fillText(String(hd).padStart(3, '0') + '° ' + dn, rx, 176);
    x.fillStyle = st.climb > 3 ? '#3df0c8' : st.climb < -3 ? '#ff9a4a' : '#ffffff';
    x.fillText((st.climb > 0 ? '+' : '') + Math.round(st.climb) + ' M/S', rx, 246);
    if (st.fast) { x.fillStyle = '#ffd060'; x.font = 'bold 20px Segoe UI, Arial'; x.fillText('×4', 30, 40); }
  }

  function drawGPS(x, st, zoom, places) {
    var w = 480, h = 288, R = ZOOMS[zoom].r;
    x.fillStyle = '#04120f'; x.fillRect(0, 0, w, h);
    x.save(); x.beginPath(); x.rect(0, 0, w, h); x.clip();
    var cx = w / 2, cy = h / 2 + 6, S = (h / 2 - 22) / R;
    if (zoom === 2) { cx = w / 2 + 30; cy = h / 2; S = Math.min((w - 130) / 2, (h - 40) / 2) / R; }
    // grid
    x.strokeStyle = 'rgba(61,240,200,.14)'; x.lineWidth = 1;
    var gs = R > 8000 ? 4000 : R > 2500 ? 1000 : 500;
    var x0 = Math.floor((st.x - R * 3) / gs) * gs;
    for (var gx = x0; gx < st.x + R * 3; gx += gs) { var sx = cx + (gx - st.x) * S; if (sx > 0 && sx < w) { x.beginPath(); x.moveTo(sx, 0); x.lineTo(sx, h); x.stroke(); } }
    var z0 = Math.floor((st.z - R * 3) / gs) * gs;
    for (var gz = z0; gz < st.z + R * 3; gz += gs) { var sy = cy + (gz - st.z) * S; if (sy > 0 && sy < h) { x.beginPath(); x.moveTo(0, sy); x.lineTo(w, sy); x.stroke(); } }
    // range rings
    x.strokeStyle = 'rgba(61,240,200,.28)';
    [0.5, 1].forEach(function (k) { x.beginPath(); x.arc(cx, cy, R * k * S, 0, Math.PI * 2); x.stroke(); });
    // places
    x.font = '600 15px Segoe UI, Arial'; x.textBaseline = 'middle';
    var nearest = null, nd = 1e12, placed = [];
    places.forEach(function (p) {
      var dx = p[1] - st.x, dz = p[2] - st.z, d = Math.hypot(dx, dz); if (d < nd) { nd = d; nearest = p; }
      var px = cx + dx * S, py = cy + dz * S, inside = px > 8 && px < w - 8 && py > 8 && py < h - 8;
      if (!inside) {   // off the map: a small arrow on the edge pointing toward it
        var ex = Math.max(10, Math.min(w - 10, px)), ey = Math.max(10, Math.min(h - 10, py));
        x.fillStyle = p[3]; x.globalAlpha = 0.7; x.beginPath(); x.arc(ex, ey, 4, 0, Math.PI * 2); x.fill(); x.globalAlpha = 1; return;
      }
      x.fillStyle = p[3]; x.beginPath(); x.arc(px, py, 5, 0, Math.PI * 2); x.fill();
      var tw = x.measureText(p[0]).width, bx = px + 9, by = py, hit = placed.some(function (q) { return bx < q[0] + q[2] && bx + tw > q[0] && Math.abs(by - q[1]) < 15; });
      if (!hit) { placed.push([bx, by, tw]); x.strokeStyle = '#04120f'; x.lineWidth = 3; x.strokeText(p[0], bx, by); x.fillStyle = '#ffffff'; x.textAlign = 'left'; x.fillText(p[0], bx, by); }
    });
    // the craft, always at the centre, pointing the way it flies
    var a = Math.atan2(st.fz, st.fx);
    x.save(); x.translate(cx, cy); x.rotate(a); x.fillStyle = '#3df0c8'; x.strokeStyle = '#ffffff'; x.lineWidth = 2;
    x.beginPath(); x.moveTo(13, 0); x.lineTo(-9, 8); x.lineTo(-4, 0); x.lineTo(-9, -8); x.closePath(); x.fill(); x.stroke(); x.restore();
    x.restore();
    // header and nearest
    x.fillStyle = 'rgba(4,18,15,.85)'; x.fillRect(0, 0, w, 22); x.fillRect(0, h - 24, w, 24);
    x.fillStyle = '#3df0c8'; x.font = 'bold 15px Segoe UI, Arial'; x.textAlign = 'left'; x.fillText('GPS · N ↑ · RANGE ' + ZOOMS[zoom].n + ' · N KEY ZOOMS', 8, 11);
    if (nearest) { x.fillStyle = '#ffffff'; x.fillText('NEAREST: ' + nearest[0] + '  ' + (nd >= 1000 ? (nd / 1000).toFixed(1) + ' KM' : Math.round(nd) + ' M'), 8, h - 12); }
    x.strokeStyle = '#2a7fbf'; x.lineWidth = 3; x.strokeRect(3, 3, w - 6, h - 6);
  }

  window.SHUTTLE_DASH = { make: make, PLACES: PLACES, ZOOMS: ZOOMS };
})();
