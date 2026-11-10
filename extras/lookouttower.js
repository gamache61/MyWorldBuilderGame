/* Extra: Lookout Tower (small) - the player can climb it */
window.WB_EXTRAS.push({
  id: 'lookouttower', name: 'Lookout Tower', size: 'small',
  brief: 'A tall wooden-and-steel tower with a spiral stair and a roofed platform at the top. Climb it for the best view of everything you have built.',
  build: function (T, g) {
    var steel = new T.MeshStandardMaterial({ color: 0x6d7a86, roughness: .5, metalness: .6 });
    var wood = new T.MeshStandardMaterial({ color: 0x9a6334, roughness: .8 });
    var wood2 = new T.MeshStandardMaterial({ color: 0xc89a62, roughness: .8 });
    var roofM = new T.MeshStandardMaterial({ color: 0xb23a2e, roughness: .7 });
    var stone = new T.MeshStandardMaterial({ color: 0x8e8878, roughness: 1 });
    var H = 18;
    var base = new T.Mesh(new T.CylinderGeometry(4.4, 4.8, .8, 8), stone); base.position.y = .4; g.add(base);
    // four legs leaning in
    for (var i = 0; i < 4; i++) {
      var a = i * Math.PI / 2 + Math.PI / 4;
      var bx = Math.cos(a) * 3.2, bz = Math.sin(a) * 3.2, tx = Math.cos(a) * 1.7, tz = Math.sin(a) * 1.7;
      var len = Math.hypot(bx - tx, H, bz - tz);
      var leg = new T.Mesh(new T.CylinderGeometry(.16, .22, len, 8), steel);
      leg.position.set((bx + tx) / 2, .8 + H / 2, (bz + tz) / 2);
      leg.lookAt(new T.Vector3(tx, .8 + H, tz)); leg.rotateX(Math.PI / 2); leg.castShadow = true; g.add(leg);
    }
    // cross braces
    for (var lv = 1; lv <= 4; lv++) {
      var y = .8 + lv * H / 5, r = 3.2 - (3.2 - 1.7) * (lv / 5);
      for (var k = 0; k < 4; k++) {
        var a1 = k * Math.PI / 2 + Math.PI / 4, a2 = (k + 1) * Math.PI / 2 + Math.PI / 4;
        var p1 = new T.Vector3(Math.cos(a1) * r, y, Math.sin(a1) * r), p2 = new T.Vector3(Math.cos(a2) * r, y, Math.sin(a2) * r);
        var d = p1.distanceTo(p2), br = new T.Mesh(new T.CylinderGeometry(.07, .07, d, 6), steel);
        br.position.copy(p1.clone().add(p2).multiplyScalar(.5)); br.lookAt(p2); br.rotateX(Math.PI / 2); g.add(br);
      }
    }
    // spiral stair
    var steps = 60;
    for (var s = 0; s < steps; s++) {
      var f = s / steps, ang = f * Math.PI * 6, rr = 2.4 - 1.0 * f;
      var st = new T.Mesh(new T.BoxGeometry(1.1, .1, .7), wood2);
      st.position.set(Math.cos(ang) * rr, .9 + f * (H - .1), Math.sin(ang) * rr); st.rotation.y = -ang; st.castShadow = true; g.add(st);
    }
    // platform
    var pf = new T.Mesh(new T.CylinderGeometry(3.4, 3.4, .3, 8), wood); pf.position.y = .8 + H; pf.castShadow = true; g.add(pf);
    for (var q = 0; q < 8; q++) {
      var aq = q / 8 * Math.PI * 2 + Math.PI / 8;
      var post = new T.Mesh(new T.BoxGeometry(.18, 2.4, .18), wood); post.position.set(Math.cos(aq) * 3.1, .8 + H + 1.35, Math.sin(aq) * 3.1); g.add(post);
      var rail = new T.Mesh(new T.BoxGeometry(2.4, .1, .1), wood2); rail.position.set(Math.cos(aq + Math.PI / 8) * 2.87, .8 + H + 1, Math.sin(aq + Math.PI / 8) * 2.87); rail.rotation.y = -(aq + Math.PI / 8) + Math.PI / 2; g.add(rail);
    }
    var roof = new T.Mesh(new T.ConeGeometry(4.2, 2.2, 8), roofM); roof.position.y = .8 + H + 3.4; roof.castShadow = true; g.add(roof);
    var lamp = new T.Mesh(new T.SphereGeometry(.3, 12, 12), new T.MeshStandardMaterial({ color: 0xfff2b0, emissive: 0xffd878, emissiveIntensity: 1.4 }));
    lamp.position.y = .8 + H + 2.2; g.add(lamp);
    var flag = new T.Mesh(new T.PlaneGeometry(1.2, .7), new T.MeshStandardMaterial({ color: 0x40d0ff, side: T.DoubleSide })); flag.position.set(.7, .8 + H + 5.2, 0);
    var fp = new T.Mesh(new T.CylinderGeometry(.04, .04, 1.4, 6), steel); fp.position.y = .8 + H + 4.8; g.add(fp, flag);
    // a few trees on the ground
    for (var t2 = 0; t2 < 12; t2++) { var at = t2 / 12 * 6.28 + .3, rd = 10 + (t2 % 3) * 4; var tt = new T.Group(); var tk = new T.Mesh(new T.CylinderGeometry(.2, .3, 2, 7), wood); tk.position.y = 1; var lf = new T.Mesh(new T.ConeGeometry(1.5, 3.6, 8), new T.MeshStandardMaterial({ color: 0x2f8a46 })); lf.position.y = 3.6; tt.add(tk, lf); tt.position.set(Math.cos(at) * rd, 0, Math.sin(at) * rd); g.add(tt); }
    g.userData.tick = function (t) { flag.rotation.y = Math.sin(t * 4) * .35; };
    // climbing: the view goes up the spiral then looks out over the land
    g.userData.ride = {
      label: 'CLIMB THE TOWER',
      start: function (t0) { this.t0 = t0; },
      stop: function () { },
      update: function (t, cam) {
        var u = Math.min((t - this.t0) / 12, 1), ang = u * Math.PI * 6, rr = 2.4 - 1.0 * u;
        var y = 1.9 + u * (H - .1);
        if (u < 1) { cam.position.set(Math.cos(ang) * .6, y + 1.5, Math.sin(ang) * .6); cam.lookAt(Math.cos(ang + .6) * 14, y - 1, Math.sin(ang + .6) * 14); }
        else { var look = (t - this.t0 - 12) * .12; cam.position.set(0, 3.2 + H, 0); cam.lookAt(Math.cos(look) * 30, H - 2, Math.sin(look) * 30); }
      }
    };
  },
  view: { cam: [22, 14, 22], target: [0, 8, 0] }
});
