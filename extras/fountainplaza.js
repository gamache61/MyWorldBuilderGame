/* Extra: Fountain Plaza (small) */
window.WB_EXTRAS.push({
  id: 'fountainplaza', name: 'Fountain Plaza', size: 'small',
  brief: 'A round stone plaza with a three-tier fountain in the middle, benches and lamp posts around the edge. A place for the people to meet.',
  build: function (T, g) {
    var stone = new T.MeshStandardMaterial({ color: 0xcfc8b8, roughness: .9 });
    var dark = new T.MeshStandardMaterial({ color: 0x8e8878, roughness: .9 });
    var water = new T.MeshStandardMaterial({ color: 0x4fb8ff, roughness: .15, metalness: .1, transparent: true, opacity: .85 });
    var wood = new T.MeshStandardMaterial({ color: 0x8a5a30, roughness: .8 });
    function cyl(rt, rb, h, y, m) { var o = new T.Mesh(new T.CylinderGeometry(rt, rb, h, 48), m); o.position.y = y; o.castShadow = o.receiveShadow = true; g.add(o); return o; }
    cyl(9, 9.3, .3, .15, stone);
    cyl(7.6, 7.6, .32, .17, dark).scale.set(1, .6, 1);
    // paving rings
    for (var r = 3; r <= 8; r += 1.6) { var ring = new T.Mesh(new T.RingGeometry(r, r + .12, 64), dark); ring.rotation.x = -Math.PI / 2; ring.position.y = .32; g.add(ring); }
    // fountain basins
    cyl(3.2, 3.4, .9, .75, stone);
    var w1 = cyl(2.9, 2.9, .05, 1.18, water);
    cyl(.5, .7, 1.6, 1.4, stone);
    cyl(1.7, 1.2, .35, 2.1, stone);
    var w2 = cyl(1.55, 1.55, .05, 2.3, water);
    cyl(.22, .3, 1.2, 2.7, stone);
    cyl(.9, .6, .25, 3.2, stone);
    var w3 = cyl(.8, .8, .05, 3.34, water);
    cyl(.1, .15, .9, 3.6, stone);
    // water jets
    var N = 140, geo = new T.BufferGeometry(), pos = new Float32Array(N * 3);
    geo.setAttribute('position', new T.BufferAttribute(pos, 3));
    var drops = new T.Points(geo, new T.PointsMaterial({ color: 0xcdeeff, size: .14, transparent: true, opacity: .9 }));
    g.add(drops);
    var seed = []; for (var i = 0; i < N; i++) seed.push({ a: Math.random() * 6.28, s: .6 + Math.random() * .8, p: Math.random() });
    // benches + lamps
    for (var k = 0; k < 6; k++) {
      var a = k / 6 * Math.PI * 2, R = 6.6;
      var b = new T.Group();
      var seat = new T.Mesh(new T.BoxGeometry(2.2, .12, .6), wood); seat.position.y = .6;
      var back = new T.Mesh(new T.BoxGeometry(2.2, .5, .08), wood); back.position.set(0, .95, .28);
      var l1 = new T.Mesh(new T.BoxGeometry(.12, .5, .5), dark); l1.position.set(-.9, .35, 0);
      var l2 = l1.clone(); l2.position.x = .9;
      b.add(seat, back, l1, l2); b.position.set(Math.cos(a) * R, .3, Math.sin(a) * R); b.rotation.y = -a - Math.PI / 2; b.traverse(function (o) { o.castShadow = true; }); g.add(b);
      var a2 = a + Math.PI / 6, lp = new T.Group();
      var pole = new T.Mesh(new T.CylinderGeometry(.06, .08, 2.6, 8), dark); pole.position.y = 1.6;
      var bulb = new T.Mesh(new T.SphereGeometry(.22, 12, 12), new T.MeshStandardMaterial({ color: 0xfff2b0, emissive: 0xffd878, emissiveIntensity: 1.2 }));
      bulb.position.y = 3; lp.add(pole, bulb); lp.position.set(Math.cos(a2) * 8.3, .3, Math.sin(a2) * 8.3); g.add(lp);
    }
    // planters
    for (var m = 0; m < 4; m++) {
      var am = m / 4 * Math.PI * 2 + .785, pl = new T.Group();
      var pot = new T.Mesh(new T.CylinderGeometry(.7, .55, .6, 16), dark); pot.position.y = .6;
      var bush = new T.Mesh(new T.SphereGeometry(.7, 14, 12), new T.MeshStandardMaterial({ color: 0x3f9a4a, roughness: 1 })); bush.position.y = 1.3;
      pl.add(pot, bush); pl.position.set(Math.cos(am) * 4.9, .3, Math.sin(am) * 4.9); pl.traverse(function (o) { o.castShadow = true; }); g.add(pl);
    }
    g.userData.tick = function (t) {
      for (var i = 0; i < N; i++) {
        var d = seed[i], p = (t * .45 * d.s + d.p) % 1, h = 3.7 + Math.sin(p * Math.PI) * 1.6;
        var out = p * 1.2 * d.s;
        pos[i * 3] = Math.cos(d.a) * out; pos[i * 3 + 1] = (p < .5 ? 3.7 + p * 3.2 : 3.7 + (1 - p) * 3.2) + (p > .5 ? -(p - .5) * 1 : 0); pos[i * 3 + 2] = Math.sin(d.a) * out;
        if (p > .5) pos[i * 3 + 1] = Math.max(1.2, 3.7 + 1.6 - (p - .5) * (p - .5) * 24);
      }
      geo.attributes.position.needsUpdate = true;
      var rip = 1 + Math.sin(t * 2) * .004; w1.scale.set(rip, 1, rip); w2.scale.set(rip, 1, rip);
    };
  },
  view: { cam: [13, 9, 14], target: [0, 1.6, 0] }
});
