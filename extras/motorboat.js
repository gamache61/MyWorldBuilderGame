/* Extra: Motor Boat (small) - the player drives it around the lake */
window.WB_EXTRAS.push({
  id: 'motorboat', name: 'Motor Boat', size: 'small',
  brief: 'A white motor boat with an outboard engine, moored at a jetty on a quiet lake. Climb in and drive it yourself — arrow keys or W A S D.',
  ground: 'water',
  build: function (T, g) {
    var M = function (c, r, m) { return new T.MeshStandardMaterial({ color: c, roughness: r == null ? .6 : r, metalness: m || 0 }); };
    var white = M(0xf4f6f8, .4), blue = M(0x1f5fa8, .5), dark = M(0x30363c, .6, .3), wood = M(0x9a6334, .8), wood2 = M(0xc89a62, .8), red = M(0xd24a3a, .7);
    var glass = new T.MeshStandardMaterial({ color: 0x9fd8ff, roughness: .1, transparent: true, opacity: .45 });
    // jetty
    var jetty = new T.Group();
    for (var i = 0; i < 12; i++) { var pl = new T.Mesh(new T.BoxGeometry(2.2, .12, .5), wood2); pl.position.set(-14 + i * .55, .45, 0); jetty.add(pl); }
    for (var j = 0; j < 4; j++) { var po = new T.Mesh(new T.CylinderGeometry(.12, .12, 1.4, 8), wood); po.position.set(-14 + j * 1.9, .1, 1); jetty.add(po); var p2 = po.clone(); p2.position.z = -1; jetty.add(p2); }
    jetty.position.set(-5, .3, 6); g.add(jetty);
    // boat: forward is +X
    var boat = new T.Group();
    function plan(sx, depth, y, mat) {
      var s = new T.Shape(); s.moveTo(-3 * sx, -.95 * sx); s.lineTo(1.8 * sx, -.95 * sx); s.lineTo(3.9 * sx, 0); s.lineTo(1.8 * sx, .95 * sx); s.lineTo(-3 * sx, .95 * sx); s.lineTo(-3 * sx, -.95 * sx);
      var m = new T.Mesh(new T.ExtrudeGeometry(s, { depth: depth, bevelEnabled: false }), mat); m.rotation.x = -Math.PI / 2; m.position.y = y; m.castShadow = true; boat.add(m); return m;
    }
    plan(.85, .5, -.1, dark);       // lower hull, a bit narrower
    plan(1, .55, .4, white);        // upper hull
    plan(1.01, .14, .62, blue);     // blue stripe
    plan(.9, .05, .95, M(0xb8c2cc, .8)); // deck
    // windshield + console
    var con = new T.Mesh(new T.BoxGeometry(1.0, .7, 1.2), white); con.position.set(.7, 1.3, 0); con.castShadow = true; boat.add(con);
    var ws = new T.Mesh(new T.BoxGeometry(.08, .7, 1.5), glass); ws.position.set(1.2, 1.9, 0); ws.rotation.z = -.5; boat.add(ws);
    var wheel = new T.Mesh(new T.TorusGeometry(.2, .03, 8, 16), dark); wheel.position.set(.25, 1.75, 0); wheel.rotation.y = Math.PI / 2; wheel.rotation.x = .5; boat.add(wheel);
    // seats
    var sb = new T.Mesh(new T.BoxGeometry(.9, .25, 1.6), blue); sb.position.set(-1.3, 1.1, 0); boat.add(sb);
    var sk = new T.Mesh(new T.BoxGeometry(.15, .5, 1.6), blue); sk.position.set(-1.75, 1.4, 0); boat.add(sk);
    // outboard engine
    var eng = new T.Mesh(new T.BoxGeometry(.7, 1.1, .5), dark); eng.position.set(-3.2, 1, 0); boat.add(eng);
    var lg = new T.Mesh(new T.CylinderGeometry(.08, .1, 1, 8), dark); lg.position.set(-3.3, .1, 0); boat.add(lg);
    var prop = new T.Mesh(new T.BoxGeometry(.05, .5, .12), M(0xc0c8d0, .3, .8)); prop.position.set(-3.45, -.2, 0); boat.add(prop);
    // bow light + flag pole
    var lamp = new T.Mesh(new T.SphereGeometry(.12, 10, 10), new T.MeshStandardMaterial({ color: 0xff5040, emissive: 0xff3020, emissiveIntensity: 1 })); lamp.position.set(3.2, 1.05, 0); boat.add(lamp);
    var fl = new T.Mesh(new T.PlaneGeometry(.6, .35), red); fl.material.side = T.DoubleSide; fl.position.set(-2.4, 2.8, .32); var fpl = new T.Mesh(new T.CylinderGeometry(.03, .03, 1.5, 6), dark); fpl.position.set(-2.7, 2.2, 0); boat.add(fpl, fl);
    boat.position.set(2, .15, 3); g.add(boat);
    // wake foam
    var N = 90, geo = new T.BufferGeometry(), pos = new Float32Array(N * 3), age = new Float32Array(N).fill(9);
    geo.setAttribute('position', new T.BufferAttribute(pos, 3));
    var foam = new T.Points(geo, new T.PointsMaterial({ color: 0xffffff, size: .35, transparent: true, opacity: .8 })); foam.frustumCulled = false; g.add(foam);
    var nf = 0;
    // buoys + island
    for (var b = 0; b < 6; b++) { var a = b / 6 * 6.28 + .4, bu = new T.Mesh(new T.SphereGeometry(.35, 10, 10), b % 2 ? red : white); bu.position.set(Math.cos(a) * 30, .2, Math.sin(a) * 30); g.add(bu); }
    var isl = new T.Mesh(new T.CylinderGeometry(4, 5, 1.2, 20), M(0xc9b98a, 1)); isl.position.set(-22, 0, -14); g.add(isl);
    var tr = new T.Mesh(new T.CylinderGeometry(.2, .3, 3, 8), wood); tr.position.set(-22, 2, -14); g.add(tr);
    var lf = new T.Mesh(new T.SphereGeometry(1.6, 12, 10), M(0x3f9a4a, 1)); lf.position.set(-22, 4, -14); g.add(lf);

    var st = { on: false, h: 0, v: 0, last: 0 }, keys = {};
    function kd(e) { keys[e.key.toLowerCase()] = true; if (st.on && e.key.indexOf('Arrow') === 0) e.preventDefault(); }
    function ku(e) { keys[e.key.toLowerCase()] = false; }
    addEventListener('keydown', kd); addEventListener('keyup', ku);
    var fwd = new T.Vector3();
    function emit(x, z) { var i = nf++ % N; pos[i * 3] = x + (Math.random() - .5) * .8; pos[i * 3 + 1] = .12; pos[i * 3 + 2] = z + (Math.random() - .5) * .8; age[i] = 0; }
    g.userData.tick = function (t) {
      fl.rotation.y = Math.sin(t * 6) * .4; prop.rotation.x = t * (st.on ? 30 : 0);
      if (!st.on) { boat.position.y = .15 + Math.sin(t * 1.4) * .06; boat.rotation.z = Math.sin(t * 1.1) * .02; }
      for (var i = 0; i < N; i++) { age[i] += .016; if (age[i] > 2) pos[i * 3 + 1] = -5; }
      geo.attributes.position.needsUpdate = true;
    };
    g.userData.ride = {
      label: 'DRIVE THE MOTOR BOAT',
      start: function (t0) {
        st.on = true; st.h = Math.PI / 2 * 0; st.v = 0; st.last = t0;
        var p = jetty.position; boat.position.set(p.x + 2, .15, p.z - 3); st.h = .5; boat.rotation.set(0, st.h, 0);
        var bn = document.getElementById('banner'); if (bn) bn.textContent = 'ARROWS OR W A S D TO DRIVE';
      },
      stop: function () {
        st.on = false; boat.position.set(2, .15, 3); boat.rotation.set(0, 0, 0);
        var bn = document.getElementById('banner'); if (bn) bn.textContent = '';
      },
      update: function (t, cam) {
        var dt = Math.min(t - st.last, .05); st.last = t;
        var up = keys['arrowup'] || keys['w'], dn = keys['arrowdown'] || keys['s'], lt = keys['arrowleft'] || keys['a'], rt = keys['arrowright'] || keys['d'];
        var top = 15;
        if (up) st.v += 7 * dt; else if (dn) st.v -= 7 * dt; else st.v *= (1 - .6 * dt);
        st.v = Math.max(-5, Math.min(top, st.v));
        var steer = ((lt ? 1 : 0) - (rt ? 1 : 0)) * Math.min(1, Math.abs(st.v) / 4) * (st.v < 0 ? -1 : 1);
        st.h += steer * 1.3 * dt;
        fwd.set(Math.cos(st.h), 0, -Math.sin(st.h));
        boat.position.x += fwd.x * st.v * dt; boat.position.z += fwd.z * st.v * dt;
        var d = Math.hypot(boat.position.x, boat.position.z);
        if (d > 55) { boat.position.x *= 55 / d; boat.position.z *= 55 / d; st.v *= .9; }
        boat.position.y = .15 + Math.sin(t * 3) * .05 * (.3 + st.v / top);
        boat.rotation.set(0, st.h, -steer * .12 + Math.sin(t * 2) * .01);
        boat.rotation.x = 0; boat.rotation.order = 'YXZ'; boat.rotation.z = -steer * .1; boat.rotation.x = 0;
        if (Math.abs(st.v) > 1) { var sx = boat.position.x - fwd.x * 3.4, sz = boat.position.z - fwd.z * 3.4; emit(sx, sz); emit(sx, sz); }
        var bx = boat.position.x - fwd.x * 10, bz = boat.position.z - fwd.z * 10;
        cam.position.lerp(new T.Vector3(bx, 4.6, bz), Math.min(1, 4 * dt + .02));
        cam.lookAt(boat.position.x + fwd.x * 4, 1.2, boat.position.z + fwd.z * 4);
      }
    };
  },
  view: { cam: [14, 8, 18], target: [0, 1.5, 3] }
});
