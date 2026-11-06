/* ============================================================
   KRYOS CITY · BUILD 13 · FOREST EDGE SHIELD
   Keep this file in projects/kryoscity next to kryoscity.html.
   Trip 1 — 12 shield emitters round the edge of the plateau,
            where the city meets the wild forest.
   Trip 2 — the shield core south of the landing field and 6
            weather masts.
   Build 13 ends when you raise the shield (press L). A clear
            energy dome then covers the whole city.
   ============================================================ */
(function () {
  const R = 1300, TAU = Math.PI * 2;
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(KRYOS.cityBuild({
    id: 13,
    name: 'FOREST EDGE SHIELD',
    brief: 'Emitters round the plateau raise a clear energy dome over Kryos: it keeps out storms and protects the forest from the city, and the city from the wild.',
    finishLabel: 'RAISE THE SHIELD', flags: ['kshield'], status: ['CITY SHIELD', 'UP'],
    finishCam: [[120, 0], 3800], lookUp: 250,
    parts: {
      KEMIT: {
        name: 'SHIELD EMITTER', code: 'HP', col: '#9a2a22', h: 60, count: 12, at: k => KRYOS.at(k / 12 * TAU + 0.13, R),
        make(g, k, M, THREE, api, sl, B) {
          const base = new THREE.Mesh(new THREE.CylinderGeometry(10, 13, 6, 6), M.dark); base.position.y = 3; g.add(base);
          for (let i = 0; i < 3; i++) { const a = i / 3 * TAU, l = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 2, 52, 6), M.steel); l.position.set(Math.cos(a) * 5, 30, Math.sin(a) * 5); l.rotation.set(Math.sin(a) * 0.12, 0, -Math.cos(a) * 0.12); g.add(l); }
          const orb = new THREE.Mesh(new THREE.SphereGeometry(6, 16, 12), B._mats.em || (B._mats.em = new THREE.MeshBasicMaterial({ color: new THREE.Color(0.3, 0.35, 0.4) }))); orb.position.y = 58; g.add(orb);
          const ring = new THREE.Mesh(new THREE.TorusGeometry(8, 0.6, 6, 24).rotateX(Math.PI / 2), M.glow); ring.position.y = 58; g.add(ring);
        },
      },
      KSCORE: {
        name: 'SHIELD CORE', code: 'HC', col: '#d9731b', h: 30, count: 1, at: () => [120, -420],
        needs: (api, k, cnt) => api.flag('power') ? null : 'NEEDS CITY POWER',
        make(g, k, M, THREE, api, sl, B) {
          const b = new THREE.Mesh(new THREE.CylinderGeometry(30, 34, 8, 12), M.white); b.position.y = 4; g.add(b);
          const c = new THREE.Mesh(new THREE.IcosahedronGeometry(14, 1), B._mats.em2 || (B._mats.em2 = new THREE.MeshBasicMaterial({ color: new THREE.Color(0.3, 0.4, 0.5), wireframe: true }))); c.position.y = 24; g.add(c); B._coreG = c;
          const gl = new THREE.Mesh(new THREE.SphereGeometry(18, 24, 16), M.glass); gl.position.y = 24; g.add(gl);
        },
      },
      KMAST: {
        name: 'WEATHER MAST', code: 'SY', col: '#e8e1d1', h: 90, count: 6, at: k => KRYOS.at(k / 6 * TAU + 0.52, 1360),
        make(g, k, M, THREE) {
          const m = new THREE.Mesh(new THREE.CylinderGeometry(1.4, 3, 86, 8), M.pearl); m.position.y = 43; g.add(m);
          for (const y of [50, 66, 82]) { const r = new THREE.Mesh(new THREE.TorusGeometry(4 + (90 - y) * 0.1, 0.4, 6, 24).rotateX(Math.PI / 2), M.steel); r.position.y = y; g.add(r); }
          const d = new THREE.Mesh(new THREE.SphereGeometry(3, 12, 8), M.white); d.position.y = 88; g.add(d);
        },
      },
    },
    trips: [{ name: 'SHIELD EMITTERS', parts: ['KEMIT'] }, { name: 'CORE & MASTS', parts: ['KSCORE', 'KMAST'] }],
    tick(api, dt, t, lv) {
      const S = this._mats, THREE = api.THREE;
      if (S.em) S.em.color.setRGB(0.3 + 0.4 * lv, 0.35 + 1.4 * lv, 0.4 + 1.9 * lv);
      if (S.em2) S.em2.color.setRGB(0.3 + 0.5 * lv, 0.4 + 1.4 * lv, 0.5 + 2.0 * lv);
      if (this._coreG) { this._coreG.rotation.y += dt * (0.2 + lv); this._coreG.rotation.x += dt * 0.3 * lv; }
      if (!this._dome) {
        const piece = api.placed.find(p => p.b === 13 && p.piece); if (!piece) return;
        const u = this._u = { uTime: { value: 0 }, uOn: { value: 0 } };
        const m = new THREE.Mesh(new THREE.SphereGeometry(1, 96, 48, 0, TAU, 0, Math.PI / 2), new THREE.ShaderMaterial({
          uniforms: u, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide,
          vertexShader: `varying vec3 vN;varying vec3 vV;varying vec3 vO;void main(){vO=position;vec4 mv=modelViewMatrix*vec4(position,1.);vN=normalize(normalMatrix*normal);vV=normalize(-mv.xyz);gl_Position=projectionMatrix*mv;}`,
          fragmentShader: `uniform float uTime;uniform float uOn;varying vec3 vN;varying vec3 vV;varying vec3 vO;
            float hexE(vec2 p){p.x*=1.1547;p.y+=mod(floor(p.x),2.0)*0.5;p=abs(fract(p)-0.5);return abs(max(p.x*1.5+p.y,p.y*2.0)-1.0);}
            void main(){float f=pow(1.0-abs(dot(normalize(vN),normalize(vV))),2.5);vec2 uv=vec2(atan(vO.z,vO.x)*30.0,vO.y*36.0);
              float hex=1.0-smoothstep(0.0,0.08,hexE(uv));float scan=0.5+0.5*sin(vO.y*24.0-uTime*1.5);float base=smoothstep(0.0,0.05,vO.y);
              float a=(f*0.35+hex*(0.05+0.08*scan)*(0.4+f))*uOn*base;gl_FragColor=vec4(vec3(0.35,0.95,0.85)*a,a);}`,
        }));
        const y = KRYOS.ground(api, KRYOS.C.x, KRYOS.C.z);
        m.scale.set(R + 20, 1050, R + 20); m.position.set(KRYOS.C.x, y, KRYOS.C.z); m.frustumCulled = false;
        piece.piece.parent.add(m); this._dome = m;
      }
      this._u.uTime.value = t; this._u.uOn.value += (lv - this._u.uOn.value) * Math.min(1, dt * 2);
      this._dome.visible = this._u.uOn.value > 0.01;
    },
  }));
})();
