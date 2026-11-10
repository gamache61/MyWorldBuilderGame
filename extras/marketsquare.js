/* Extra: Market Square (medium) - the player can walk through it */
window.WB_EXTRAS.push({
  id: 'marketsquare', name: 'Market Square', size: 'medium',
  brief: 'A cobbled town square with a clock tower in the middle, ten striped market stalls full of food and goods, string lights, and townspeople shopping. Walk through it at street level.',
  build: function (T, g) {
    var M = function (c, r, m) { return new T.MeshStandardMaterial({ color: c, roughness: r == null ? .8 : r, metalness: m || 0 }); };
    function canvasTex(w, h, fn) { var c = document.createElement('canvas'); c.width = w; c.height = h; fn(c.getContext('2d'), w, h); var t = new T.CanvasTexture(c); t.wrapS = t.wrapT = T.RepeatWrapping; return t; }
    // cobbles
    var cob = canvasTex(256, 256, function (x, w, h) {
      x.fillStyle = '#9a9488'; x.fillRect(0, 0, w, h);
      for (var i = 0; i < 160; i++) { var a = 120 + Math.random() * 60 | 0; x.fillStyle = 'rgb(' + a + ',' + (a - 4) + ',' + (a - 14) + ')'; x.beginPath(); x.ellipse(Math.random() * w, Math.random() * h, 9 + Math.random() * 7, 6 + Math.random() * 5, 0, 0, 7); x.fill(); }
    });
    cob.repeat.set(7, 7);
    var plaza = new T.Mesh(new T.CylinderGeometry(17, 17.5, .3, 64), new T.MeshStandardMaterial({ map: cob, roughness: 1 })); plaza.position.y = .15; plaza.receiveShadow = true; g.add(plaza);
    var kerb = new T.Mesh(new T.TorusGeometry(17.2, .25, 8, 64), M(0xb8b2a4)); kerb.rotation.x = Math.PI / 2; kerb.position.y = .3; g.add(kerb);
    // clock tower
    var tw = new T.Group();
    var base = new T.Mesh(new T.BoxGeometry(4, 1.2, 4), M(0x8e8878)); base.position.y = .9; tw.add(base);
    var shaft = new T.Mesh(new T.BoxGeometry(2.6, 8, 2.6), M(0xcfc2a6)); shaft.position.y = 5.5; shaft.castShadow = true; tw.add(shaft);
    var ctop = new T.Mesh(new T.BoxGeometry(3.2, 3.2, 3.2), M(0xcfc2a6)); ctop.position.y = 10.6; ctop.castShadow = true; tw.add(ctop);
    var roof = new T.Mesh(new T.ConeGeometry(2.6, 3.4, 4), M(0xa8382c)); roof.position.y = 14; roof.rotation.y = Math.PI / 4; roof.castShadow = true; tw.add(roof);
    var face = canvasTex(128, 128, function (x, w, h) {
      x.fillStyle = '#f6f0dc'; x.beginPath(); x.arc(64, 64, 60, 0, 7); x.fill(); x.strokeStyle = '#2a2a2a'; x.lineWidth = 4; x.stroke();
      for (var i = 0; i < 12; i++) { var a = i / 12 * 6.283; x.beginPath(); x.moveTo(64 + Math.sin(a) * 50, 64 - Math.cos(a) * 50); x.lineTo(64 + Math.sin(a) * 57, 64 - Math.cos(a) * 57); x.stroke(); }
    });
    face.repeat.set(1, 1);
    var hands = [];
    for (var k = 0; k < 4; k++) {
      var f = new T.Group(); f.rotation.y = k * Math.PI / 2;
      var disc = new T.Mesh(new T.CircleGeometry(1.35, 32), new T.MeshBasicMaterial({ map: face })); disc.position.set(0, 10.6, 1.61); f.add(disc);
      var hh = new T.Mesh(new T.BoxGeometry(.08, .7, .04), M(0x111111)); hh.geometry.translate(0, .3, 0); var hp = new T.Group(); hp.position.set(0, 10.6, 1.64); hp.add(hh);
      var mh = new T.Mesh(new T.BoxGeometry(.06, 1.0, .04), M(0x111111)); mh.geometry.translate(0, .45, 0); var mp = new T.Group(); mp.position.set(0, 10.6, 1.66); mp.add(mh);
      f.add(hp, mp); hands.push([hp, mp]); tw.add(f);
    }
    g.add(tw);
    // stalls
    var stripeTex = function (c1, c2) { var t = canvasTex(64, 64, function (x, w, h) { for (var i = 0; i < 8; i++) { x.fillStyle = i % 2 ? c2 : c1; x.fillRect(i * 8, 0, 8, 64); } }); t.repeat.set(2, 1); return t; };
    var cols = [['#d24a3a', '#f4efe6'], ['#2f7fc0', '#f4efe6'], ['#3a9a4a', '#f4efe6'], ['#e0a020', '#f4efe6'], ['#8a4aa8', '#f4efe6']];
    var wood = M(0x8a5a30), crate = M(0xb88a55);
    var fruitCols = [0xd23a2a, 0xf0a020, 0x6cc040, 0xa03090, 0xf0d030];
    var ST = 10;
    for (var s = 0; s < ST; s++) {
      var a = s / ST * Math.PI * 2, R = 12.2, st = new T.Group();
      var cc = cols[s % 5];
      var table = new T.Mesh(new T.BoxGeometry(3.6, .9, 1.4), wood); table.position.y = .75; table.castShadow = true; st.add(table);
      var cloth = new T.Mesh(new T.BoxGeometry(3.7, .06, 1.5), M(0xf0ead8)); cloth.position.y = 1.22; st.add(cloth);
      [[-1.8, -.8], [1.8, -.8], [-1.8, .8], [1.8, .8]].forEach(function (p) { var po = new T.Mesh(new T.CylinderGeometry(.07, .07, 3.4, 6), wood); po.position.set(p[0], 1.9, p[1]); st.add(po); });
      var aw = new T.Mesh(new T.BoxGeometry(4.1, .1, 2.2), new T.MeshStandardMaterial({ map: stripeTex(cc[0], cc[1]), roughness: .9 })); aw.position.set(0, 3.55, -.1); aw.rotation.x = .18; aw.castShadow = true; st.add(aw);
      var fr = new T.Mesh(new T.BoxGeometry(4.1, .5, .05), new T.MeshStandardMaterial({ map: stripeTex(cc[0], cc[1]) })); fr.position.set(0, 3.25, 1.0); st.add(fr);
      for (var q = 0; q < 9; q++) { var fc = fruitCols[(s + q) % 5]; var fru = new T.Mesh(new T.SphereGeometry(.15, 8, 8), M(fc, .5)); fru.position.set(-1.4 + q * .35, 1.4, ((q % 3) - 1) * .3); st.add(fru); }
      var cr = new T.Mesh(new T.BoxGeometry(.7, .6, .7), crate); cr.position.set(2.3, .6, 0); st.add(cr);
      var cr2 = cr.clone(); cr2.position.set(-2.3, .4, .2); cr2.scale.set(.9, .7, .9); st.add(cr2);
      st.position.set(Math.cos(a) * R, .3, Math.sin(a) * R); st.rotation.y = -a + Math.PI / 2 + Math.PI; st.traverse(function (o) { o.castShadow = true; });
      g.add(st);
      // string lights tower -> stall
      var p0 = new T.Vector3(0, 12, 0), p1 = new T.Vector3(Math.cos(a) * R, 3.9, Math.sin(a) * R);
      for (var b = 1; b < 14; b++) { var u = b / 14, pt = p0.clone().lerp(p1, u); pt.y -= Math.sin(u * Math.PI) * 1.2; var bulb = new T.Mesh(new T.SphereGeometry(.09, 6, 6), new T.MeshStandardMaterial({ color: 0xfff0b0, emissive: 0xffd070, emissiveIntensity: 1.3 })); bulb.position.copy(pt); g.add(bulb); }
    }
    // townspeople
    var folk = [], skin = [0xf0c8a0, 0xd8a070, 0x9a6a44, 0xf4d4b8];
    for (var p = 0; p < 14; p++) {
      var pg = new T.Group();
      var bd = new T.Mesh(new T.CylinderGeometry(.22, .28, .9, 10), M([0x3a6ea8, 0xb04a4a, 0x4a9a5a, 0xd0a030, 0x8a5aa8, 0x506070][p % 6])); bd.position.y = 1.0;
      var hd = new T.Mesh(new T.SphereGeometry(.2, 10, 10), M(skin[p % 4])); hd.position.y = 1.65;
      var lg = new T.Mesh(new T.CylinderGeometry(.2, .2, .55, 8), M(0x333a44)); lg.position.y = .45;
      pg.add(bd, hd, lg); pg.traverse(function (o) { o.castShadow = true; }); g.add(pg);
      folk.push({ g: pg, r: 5.2 + (p % 5) * 1.3, a: p / 14 * 6.283, w: (p % 2 ? 1 : -1) * (.05 + (p % 4) * .015) });
    }
    g.userData.tick = function (t) {
      var d = new Date(), hr = d.getHours() % 12 + d.getMinutes() / 60, mi = d.getMinutes() + d.getSeconds() / 60;
      hands.forEach(function (h) { h[0].rotation.z = -hr / 12 * 6.283; h[1].rotation.z = -mi / 60 * 6.283; });
      folk.forEach(function (f, i) { var a = f.a + t * f.w; f.g.position.set(Math.cos(a) * f.r, .3 + Math.abs(Math.sin(t * 5 + i)) * .05, Math.sin(a) * f.r); f.g.rotation.y = -a + (f.w > 0 ? 0 : Math.PI); });
    };
    g.userData.ride = {
      label: 'WALK THROUGH THE MARKET', t0: 0,
      start: function (t0) { this.t0 = t0; },
      stop: function () { },
      update: function (t, cam) {
        var a = (t - this.t0) * .1, r = 7.5;
        cam.position.set(Math.cos(a) * r, 2.0, Math.sin(a) * r);
        cam.lookAt(Math.cos(a + .45) * 10.5, 1.8 + Math.sin(t * .7) * .15, Math.sin(a + .45) * 10.5);
      }
    };
  },
  view: { cam: [26, 17, 28], target: [0, 4, 0] }
});
