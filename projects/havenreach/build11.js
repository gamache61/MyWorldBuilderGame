/* ============================================================
   AEGIS ARK · BUILD 11 · DEFENSE & SHIELD RIM
   Keep this file in the havenreach folder next to AegisArk.html.
   Trip 1 — 12 armoured rim sections round the edge of the disc.
   Trip 2 — 12 sections of shield towers, gun turrets and heat fins.
   Build 11 ends when you raise the force field (press L).
   ============================================================ */
(window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(HAVEN.ringBuild({
  ring: 'DEF', name: 'DEFENSE & SHIELD RIM',
  brief: 'The armoured rim: shield towers, gun turrets and heat fins, and the force field over the whole station.',
  floorName: 'ARMOURED RIM SECTION', floorCode: 'HP', floorCol: '#9a2a22', packName: 'SHIELD & GUN SECTION', packCode: 'HP', packCol: '#9a2a22',
  trip2: 'SHIELDS & GUNS', finishLabel: 'RAISE THE FORCE FIELD', flags: ['shield'],
  fill(api, THREE, S, b, a0, a1, R, k, g, mesh) {
    const y = R.y;
    for (let i = 0; i < 12; i++) { const a = a0 + (i + 0.5) / 12 * (a1 - a0); b.put('tower', S.TOWER, S.steel, a, 2140, y, 6, 46, 6, 0, undefined, true); b.put('cap', S.BALL, S.strip, a, 2140, y + 50, 7, 7, 7, 0, undefined, true); }
    for (let i = 0; i < 11; i++) b.put('turret', S.BOX, S.dark, a0 + (i + 1) / 12 * (a1 - a0), 2150, y, 18, 11, 18, 0, undefined, true);
    for (let i = 0; i < 2; i++) b.put('rimLight', S.BALL, new THREE.MeshBasicMaterial({ color: 0xff3020 }), a0 + (i + 0.5) / 2 * (a1 - a0), HAVEN.R_RIM + 6, y, 8, 8, 8, 0, undefined, true);
    if (k % 2 === 0) { const a = (a0 + a1) / 2, f = new THREE.Mesh(new THREE.BoxGeometry(170, 230, 9), S.heat); f.position.set(Math.cos(a) * (HAVEN.R_RIM + 86), 23, Math.sin(a) * (HAVEN.R_RIM + 86)); f.rotation.y = -a; g.add(f); }
  },
  // the force field: a hex-pattern bubble over the whole station once it is raised
  tick(api, dt, t, lv) {
    if (!this._field) {
      const piece = api.placed.find(p => p.b === 11 && p.piece); if (!piece) return;
      const THREE = api.THREE;
      const u = this._fu = { uTime: { value: 0 }, uOn: { value: 0 } };
      const m = new THREE.Mesh(new THREE.SphereGeometry(1, 96, 48), new THREE.ShaderMaterial({
        uniforms: u, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide,
        vertexShader: `varying vec3 vN;varying vec3 vV;varying vec3 vO;void main(){vO=position;vec4 mv=modelViewMatrix*vec4(position,1.);vN=normalize(normalMatrix*normal);vV=normalize(-mv.xyz);gl_Position=projectionMatrix*mv;}`,
        fragmentShader: `uniform float uTime;uniform float uOn;varying vec3 vN;varying vec3 vV;varying vec3 vO;
          float hexE(vec2 p){p.x*=1.1547;p.y+=mod(floor(p.x),2.0)*0.5;p=abs(fract(p)-0.5);return abs(max(p.x*1.5+p.y,p.y*2.0)-1.0);}
          void main(){float f=pow(1.0-abs(dot(normalize(vN),normalize(vV))),2.5);vec2 uv=vec2(atan(vO.z,vO.x)*24.0,vO.y*40.0);
            float hex=1.0-smoothstep(0.0,0.08,hexE(uv));float scan=0.5+0.5*sin(vO.y*20.0-uTime*2.0);
            float a=(f*0.5+hex*(0.06+0.1*scan)*(0.4+f))*uOn;gl_FragColor=vec4(vec3(0.3,0.75,1.0)*a,a);}`,
      }));
      m.scale.set(2600, 1500, 2600); m.position.set(HAVEN.C.x, HAVEN.C.y - 60, HAVEN.C.z); m.frustumCulled = false;
      piece.piece.parent.add(m); this._field = m;
    }
    this._fu.uTime.value = t; this._fu.uOn.value += (lv - this._fu.uOn.value) * Math.min(1, dt * 2);
    this._field.visible = this._fu.uOn.value > 0.01;
  },
}));
