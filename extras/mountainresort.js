/* Extra: Mountain Resort (large) - the player rides the lift and skis down */
window.WB_EXTRAS.push({
  id: 'mountainresort', name: 'Mountain Resort', size: 'large',
  brief: 'A snowy mountain with a lodge at the bottom, a chairlift to the top and a long ski run through the pines. Ride the lift up, then ski all the way down.',
  build: function (T, g) {
    var M = function (c, r, m) { return new T.MeshStandardMaterial({ color: c, roughness: r == null ? .8 : r, metalness: m || 0 }); };
    function H(x, z) { var r = Math.sqrt(x * x + z * z), f = Math.pow(Math.max(0, 1 - r / 60), 1.7); return 42 * f + 1.6 * Math.sin(x * .35) * Math.cos(z * .3) * f * Math.min(1, f * 4); }
    // the ski run: u 0 (top) .. 1 (bottom)
    function ski(u) { var r = 12 + 36 * u, a = .25 + .75 * (1 - u) + .35 * Math.sin(u * 8) * (1 - u); return new T.Vector3(r * Math.cos(a), 0, r * Math.sin(a)); }
    var runPts = []; for (var i = 0; i <= 90; i++) { var p = ski(i / 90); runPts.push([p.x, p.z]); }
    function distRun(x, z) { var m = 1e9; for (var i = 0; i < runPts.length; i++) { var d = Math.hypot(x - runPts[i][0], z - runPts[i][1]); if (d < m) m = d; } return m; }
    // terrain
    var geo = new T.PlaneGeometry(130, 130, 150, 150); geo.rotateX(-Math.PI / 2);
    var pos = geo.attributes.position, col = new Float32Array(pos.count * 3), c = new T.Color(), grass = new T.Color(0x5c9a52), forest = new T.Color(0x3d6b3a), rock = new T.Color(0x8a8a90), snow = new T.Color(0xf4f8ff);
    for (var v = 0; v < pos.count; v++) {
      var x = pos.getX(v), z = pos.getZ(v), y = H(x, z); pos.setY(v, y + .02);
      if (y < 4) c.copy(grass); else if (y < 14) c.copy(grass).lerp(forest, (y - 4) / 10); else if (y < 22) c.copy(forest).lerp(rock, (y - 14) / 8); else c.copy(rock).lerp(snow, Math.min(1, (y - 22) / 4));
      var dr = distRun(x, z), dl = (x > 8 && x < 52) ? Math.abs(z) : 99, dd = Math.min(dr, dl * .9);
      if (dd < 8 && y > 1.5) { var k = dd < 4.5 ? 1 : 1 - (dd - 4.5) / 3.5; c.lerp(snow, k); }
      col[v * 3] = c.r; col[v * 3 + 1] = c.g; col[v * 3 + 2] = c.b;
    }
    geo.setAttribute('color', new T.BufferAttribute(col, 3)); geo.computeVertexNormals();
    var mt = new T.Mesh(geo, new T.MeshStandardMaterial({ vertexColors: true, roughness: 1 })); mt.receiveShadow = true; mt.castShadow = true; g.add(mt);
    // pine trees
    var trees = []; var seed = 7; function rnd() { seed = (seed * 16807) % 2147483647; return seed / 2147483647; }
    for (var n = 0; n < 900 && trees.length < 320; n++) {
      var rr = 14 + rnd() * 46, aa = rnd() * 6.283, tx = rr * Math.cos(aa), tz = rr * Math.sin(aa), ty = H(tx, tz);
      if (ty > 21 || ty < .4) continue; if (distRun(tx, tz) < 7) continue; if (tx > 6 && Math.abs(tz) < 9) continue; if (Math.hypot(tx - 53, tz - 12) < 11) continue;
      trees.push([tx, ty, tz, .8 + rnd() * .9]);
    }
    var cone = new T.InstancedMesh(new T.ConeGeometry(1.4, 4.2, 8), M(0x2d6a3c, 1), trees.length), trunk = new T.InstancedMesh(new T.CylinderGeometry(.2, .3, 1.2, 6), M(0x5a3a20), trees.length), cap = new T.InstancedMesh(new T.ConeGeometry(.9, 1.6, 8), M(0xf4f8ff, 1), trees.length), d = new T.Object3D();
    trees.forEach(function (q, i) {
      d.position.set(q[0], q[1] + 1.2 * q[3] + 2.1 * q[3], q[2]); d.scale.set(q[3], q[3], q[3]); d.updateMatrix(); cone.setMatrixAt(i, d.matrix);
      d.position.set(q[0], q[1] + .6 * q[3], q[2]); d.updateMatrix(); trunk.setMatrixAt(i, d.matrix);
      d.position.set(q[0], q[1] + 4.6 * q[3], q[2]); d.updateMatrix(); cap.setMatrixAt(i, d.matrix);
    });
    cone.castShadow = true; g.add(cone, trunk, cap);
    // chairlift
    var XS = [48, 42, 36, 30, 24, 18, 12], cab = XS.map(function (x) { return new T.Vector3(x, H(x, 0) + 7, 0); });
    var steel = M(0x6d7a86, .5, .6), red = M(0xd24a3a);
    XS.forEach(function (x) {
      var y = H(x, 0), py = new T.Mesh(new T.CylinderGeometry(.16, .24, 7.5, 8), steel); py.position.set(x, y + 3.6, 0); py.castShadow = true; g.add(py);
      var arm = new T.Mesh(new T.BoxGeometry(.2, .2, 2.2), steel); arm.position.set(x, y + 7.1, 0); g.add(arm);
    });
    [-1, 1].forEach(function (sd) {
      var pts = cab.map(function (p) { return new T.Vector3(p.x, p.y, sd * .8); });
      g.add(new T.Line(new T.BufferGeometry().setFromPoints(pts), new T.LineBasicMaterial({ color: 0x222222 })));
    });
    function at(u, side) { u = Math.max(0, Math.min(.9999, u)); var s = u * 6, i = Math.floor(s), f = s - i, p = cab[i].clone().lerp(cab[i + 1], f); p.z = side * .8; return p; }
    function station(x, label) { var b = new T.Mesh(new T.BoxGeometry(4, 4.5, 4), M(0x8a5a30)); b.position.set(x, H(x, 0) + 2.1, 0); b.castShadow = true; g.add(b); var r = new T.Mesh(new T.ConeGeometry(3.8, 1.8, 4), red); r.position.set(x, H(x, 0) + 5.4, 0); r.rotation.y = Math.PI / 4; g.add(r); }
    station(50.5); station(10);
    var chairs = [], NC = 9;
    for (var k = 0; k < NC; k++) for (var sd = -1; sd <= 1; sd += 2) {
      var ch = new T.Group();
      var seat = new T.Mesh(new T.BoxGeometry(1.4, .12, 1.0), red); seat.position.y = -2.2; var back = new T.Mesh(new T.BoxGeometry(1.4, .8, .1), red); back.position.set(0, -1.8, -.45);
      var hang = new T.Mesh(new T.CylinderGeometry(.03, .03, 2.2, 5), steel); hang.position.y = -1.1; ch.add(seat, back, hang); ch.traverse(function (o) { o.castShadow = true; }); g.add(ch); chairs.push({ g: ch, k: k, sd: sd });
    }
    // lodge
    var lodge = new T.Group(), logs = M(0x8a5a30), logs2 = M(0xa8743c), roofM = M(0x6a2a24);
    var lb = new T.Mesh(new T.BoxGeometry(14, 5, 8), logs); lb.position.y = 2.5; lodge.add(lb);
    for (var l = 0; l < 6; l++) { var st = new T.Mesh(new T.BoxGeometry(14.2, .12, 8.2), logs2); st.position.y = .6 + l * .8; lodge.add(st); }
    var sh = new T.Shape(); sh.moveTo(-4.6, 0); sh.lineTo(4.6, 0); sh.lineTo(0, 3.6); sh.lineTo(-4.6, 0);
    var rf = new T.Mesh(new T.ExtrudeGeometry(sh, { depth: 15, bevelEnabled: false }), roofM); rf.rotation.y = Math.PI / 2; rf.position.set(-7.5, 5, 0); lodge.add(rf);
    var ch2 = new T.Mesh(new T.BoxGeometry(1.2, 3, 1.2), M(0x8a8478)); ch2.position.set(4, 7, -1); lodge.add(ch2);
    var win = new T.MeshStandardMaterial({ color: 0xffe6a0, emissive: 0xffc860, emissiveIntensity: .9 });
    for (var w = 0; w < 5; w++) { var wd = new T.Mesh(new T.BoxGeometry(1.2, 1.4, .1), win); wd.position.set(-5 + w * 2.5, 2.8, 4.05); lodge.add(wd); }
    var door = new T.Mesh(new T.BoxGeometry(1.4, 2.2, .12), M(0x4a2a14)); door.position.set(0, 1.1, 4.06); lodge.add(door);
    var porch = new T.Mesh(new T.BoxGeometry(14, .3, 2), logs2); porch.position.set(0, .2, 5); lodge.add(porch);
    lodge.position.set(53, H(53, 12) + .1, 12); lodge.rotation.y = -Math.PI / 2 - .3; lodge.traverse(function (o) { o.castShadow = true; }); g.add(lodge);
    // flag on the top station
    var fp = new T.Mesh(new T.CylinderGeometry(.05, .05, 4, 6), steel); fp.position.set(10, H(10, 0) + 8, 0); g.add(fp);
    var flag = new T.Mesh(new T.PlaneGeometry(1.6, .9), new T.MeshStandardMaterial({ color: 0x40d0ff, side: T.DoubleSide })); flag.position.set(10.8, H(10, 0) + 9.5, 0); g.add(flag);
    g.userData.tick = function (t) {
      flag.rotation.y = Math.sin(t * 4) * .4;
      chairs.forEach(function (c) { var u = (t * .04 + c.k / NC) % 1; if (c.sd < 0) u = 1 - u; var p = at(u, c.sd); c.g.position.copy(p); });
    };
    g.userData.ride = {
      label: 'RIDE THE LIFT AND SKI DOWN', t0: 0,
      start: function (t0) { this.t0 = t0; },
      stop: function () { },
      update: function (t, cam) {
        var T1 = 22, T2 = 34, ph = (t - this.t0) % (T1 + T2), p, q;
        if (ph < T1) { var u = ph / T1; p = at(u, 1); q = at(u + .04, 1); p.y -= .2; q.y -= .8; q.z += 3; }
        else { var s = (ph - T1) / T2; p = ski(s); p.y = H(p.x, p.z) + 1.7 + Math.sin(t * 6) * .04; q = ski(Math.min(1, s + .03)); q.y = H(q.x, q.z) + 1.2; }
        cam.position.copy(p); cam.lookAt(q);
      }
    };
  },
  view: { cam: [-6, 40, 100], target: [14, 12, 0] }
});
