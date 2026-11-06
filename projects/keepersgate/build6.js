/* ============================================================
   THE KEEPER'S GATE · BUILD 6 · THE GATE OPENS
   Keep this file in projects/keepersgate next to keepersgate.html.
   The viewing plaza in front of the ring, four light obelisks and
   the gate control pavilion. Ends with L: the emitters fire, the
   gate opens, and the Keeper's world shines through it.
   ============================================================ */
(window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push({
  id: 6,
  name: 'THE GATE OPENS',
  brief: 'The viewing plaza, four light obelisks and the gate control pavilion — then the emitters fire and the gate opens onto the Keeper’s world.',

  types: {
    PLAZA:   { code: 'PZ', name: 'PLAZA STONE',  col: '#e8e2d8', fixed: true, w: 70, d: 40, h: 1, fx: 2 },
    OBELISK: { code: 'OB', name: 'LIGHT OBELISK', col: '#9a8ad0', fixed: true, w: 8, d: 8, h: 44, fx: 3 },
    CONTROL: { code: 'CR', name: 'GATE CONTROL PAVILION', col: '#3a7d44', fixed: true, w: 30, d: 24, h: 14, fx: 3 },
  },
  trips: [{ name: 'THE GATE OPENS', kits: { PLAZA: 6, OBELISK: 4, CONTROL: 1 }, finish: 'custom' }],
  finishLabel: 'OPEN THE KEEPER’S GATE',
  LINE: 'The gate is open. Come, people of Unity. My world is yours to visit, as your world was mine to watch.',

  setup(api) {
    const { THREE } = api, V = (x, y, z) => new THREE.Vector3(x, y, z), KG = window.KG, DT = api.DECK_TOP;
    const shot = (x, z) => ({ look: V(470 - x, 0, -z), eye: V(290 - x, 95, 230 - z) });
    this.slots = [];
    for (const z of [0, -40, 40]) for (const x of [505, 435]) this.slots.push({ type: 'PLAZA', x, z, y: DT, fx: V(0, 1, 0), ...shot(x, z) });
    for (const [x, z] of [[525, -72], [525, 72], [415, -72], [415, 72]]) this.slots.push({ type: 'OBELISK', x, z, y: DT, fx: V(0, 22, 0), ...shot(x, z) });
    this.slots.push({ type: 'CONTROL', x: 470, z: -110, y: DT, fx: V(0, 6, 0), ...shot(470, -110) });
    this.finishCam = [V(250, DT + 60, 170), V(KG.C.x, KG.C.y - 15, 0)];
  },

  rule(type, x, z, rot, api) {
    const [, d] = api.footprint(type, rot);
    if (type.startsWith('SUPPLY') && Math.abs(z) - d / 2 < 182) return 'STACK SUPPLY CRATES AT THE ENDS OF THE FIELD, OFF THE LANDING PAD';
    return null;
  },

  stats(api) {
    return [
      ['PLAZA', (api.count('PLAZA') * 2800).toLocaleString() + ' / 16,800 m²'],
      ['OBELISKS', api.count('OBELISK') + ' / 4'],
      ['CONTROL PAVILION', api.count('CONTROL') ? 'STAFFED' : 'NOT YET'],
      ['THE GATE', api.flag('opened') ? 'OPEN' : 'CLOSED'],
    ];
  },

  make(type, api, p) {
    const { THREE, M } = api, KG = window.KG, K = KG.mats(api);
    const S = this._mats || (this._mats = {
      inlay: new THREE.MeshStandardMaterial({ color: 0xd9b44a, metalness: 0.85, roughness: 0.3 }),
      screen: new THREE.MeshBasicMaterial({ color: new THREE.Color(0.45, 0.8, 1.1), toneMapped: false }),
      roof: new THREE.MeshStandardMaterial({ color: 0xf4f1ea, metalness: 0.2, roughness: 0.4 }),
    });
    const g = new THREE.Group();
    const add = (geo, mat, x, y, z, shadow = true) => { const m = new THREE.Mesh(geo, mat); m.position.set(x, y, z); m.castShadow = shadow; m.receiveShadow = true; g.add(m); return m; };
    const civ = (seed) => { const r = n => ((seed * 9301 + n * 49297) % 233280) / 233280; const pick = (a, n) => a[(r(n) * a.length) | 0]; return { kind: 'worker', civilian: true, seed, female: r(1) < 0.5, shirt: pick(['#b03a2e', '#2f6690', '#e8dcc0', '#3a7d44', '#7b4fa0', '#d9a21b', '#eef2f5', '#5fa6c8'], 2), pants: pick(['#2c3a52', '#3a3a3a', '#5a4b36', '#e8e2d8'], 3) }; };

    if (type === 'PLAZA') {
      add(new THREE.BoxGeometry(69.6, 0.8, 39.6), K.stone, 0, 0.4, 0);
      for (const [w, d, x, z] of [[69.6, 0.5, 0, 19.6], [69.6, 0.5, 0, -19.6], [0.5, 39.6, 34.6, 0], [0.5, 39.6, -34.6, 0]]) add(new THREE.BoxGeometry(w, 0.12, d), S.inlay, x, 0.86, z, false);
      if (p.z === 0) {
        // the sun of Unity set into the stone in front of the gate
        const ring = add(new THREE.TorusGeometry(12, 0.5, 6, 64).rotateX(Math.PI / 2), S.inlay, 0, 0.85, 0, false);
        for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; const r = add(new THREE.BoxGeometry(7, 0.12, 0.8), S.inlay, Math.cos(a) * 17, 0.86, Math.sin(a) * 17, false); r.rotation.y = -a; }
        add(new THREE.CylinderGeometry(4, 4, 0.14, 32), K.gglow, 0, 0.88, 0, false);
      }
      // people come to see the gate: a few workers and visitors on every stone
      if (p.s < 4) KG.person(g, p.s === 1 ? { kind: 'worker', seed: 7601, female: true } : civ(7600 + p.s), p.s === 1 ? 'tablet' : p.s % 2 ? 'gesture' : 'idle', -10 + p.s * 4, 0.8, 4, Math.PI / 2);
    } else if (type === 'OBELISK') {
      add(new THREE.BoxGeometry(10, 2, 10), K.stoneDark, 0, 1, 0);
      const ob = add(new THREE.CylinderGeometry(1.6, 3.6, 38, 4, 1), K.stone, 0, 21, 0); ob.rotation.y = Math.PI / 4;
      const cap = add(new THREE.ConeGeometry(1.7, 4, 4), K.gold, 0, 42, 0); cap.rotation.y = Math.PI / 4;
      for (const y of [10, 22, 34]) { const b = add(new THREE.CylinderGeometry(3.3 - y * 0.05, 3.3 - y * 0.05, 0.6, 4), K.glow, 0, y, 0, false); b.rotation.y = Math.PI / 4; }
    } else if (type === 'CONTROL') {
      add(new THREE.BoxGeometry(30, 1.6, 24), K.stoneDark, 0, 0.8, 0);
      for (const [x, z] of [[-13, -10], [13, -10], [-13, 10], [13, 10]]) { add(new THREE.CylinderGeometry(0.7, 0.8, 10, 12), K.ring, x, 6.6, z); add(new THREE.BoxGeometry(1.8, 0.6, 1.8), K.gold, x, 11.8, z); }
      add(new THREE.BoxGeometry(32, 1.2, 26), S.roof, 0, 12.6, 0);
      add(new THREE.BoxGeometry(32.4, 0.4, 26.4), K.gold, 0, 13.4, 0);
      // a curved console facing the gate, with its screens
      for (let i = 0; i < 5; i++) {
        const a = -0.5 + i * 0.25, x = 6 + Math.cos(a) * 6, z = Math.sin(a) * 6;
        const c = add(new THREE.BoxGeometry(1.4, 1.2, 3), K.ringDark, x, 2.2, z); c.rotation.y = -a;
        const sc = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 1.0), S.screen); sc.position.set(x - 0.3, 3.4, z); sc.rotation.y = -a - Math.PI / 2; sc.rotation.x = 0; g.add(sc);
      }
      KG.person(g, { kind: 'crew', seed: 7700, female: true, name: 'GATE', dept: '#d9b44a', rank: 2 }, 'tablet', 3, 1.6, -1, Math.PI / 2);
      KG.person(g, { kind: 'crew', seed: 7701, female: false, name: 'GATE', dept: '#d9b44a', headset: true }, 'idle', 3.5, 1.6, 3, Math.PI / 2);
      // the opening of the gate: a swirling window onto the Keeper's world (shown when the gate opens)
      const portal = new THREE.Mesh(new THREE.CircleGeometry(KG.RI - 1.5, 160).rotateY(Math.PI / 2), new THREE.ShaderMaterial({
        transparent: true, depthWrite: false, side: THREE.DoubleSide, toneMapped: false,
        uniforms: { time: { value: 0 }, open: { value: 0 } },
        vertexShader: 'varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
        fragmentShader: `uniform float time,open;varying vec2 vUv;
          float h(vec2 q){return fract(sin(dot(q,vec2(12.9898,78.233)))*43758.5453);}
          void main(){
            vec2 p=vUv*2.-1.;float r=length(p);if(r>open)discard;
            float a=atan(p.y,p.x),sw=a+time*.5+2.2/(r+.25);
            float bands=.5+.5*sin(sw*5.+r*14.-time*2.);
            vec3 c=mix(vec3(.01,.02,.07),vec3(.14,.34,.8),bands*smoothstep(.2,1.,r)*.85);
            vec2 cell=floor(p*70.);float st=h(cell);c+=step(.988,st)*(1.-r)*vec3(1.2,1.1,1.);
            // the Keeper, far away: a glowing ball inside six rings, vertical and horizontal in turn
            c+=vec3(2.2,1.75,1.1)*exp(-r*r*110.)+vec3(.9,.6,.3)*exp(-r*r*14.)*.35;
            for(int i=0;i<6;i++){float fi=float(i),rr=.33-fi*.036;bool vert=mod(fi,2.)<.5;
              float sgn=mod(floor(fi/2.),2.)<.5?1.:-1.;float ang=time*1.75*sgn+fi;float k=max(abs(cos(ang)),.06);
              vec2 q=vert?vec2(p.x/k,p.y):vec2(p.x,p.y/k);float d=abs(length(q)-rr)*mix(k,1.,.5);
              c+=vec3(1.5,1.05,.45)*smoothstep(.008,0.,d)*.8;}
            c+=vec3(.6,1.1,1.9)*smoothstep(open-.05,open,r);
            gl_FragColor=vec4(c*.8,.94);}`,
      }));
      portal.position.set(KG.C.x - p.x, KG.C.y - api.DECK_TOP, KG.C.z - p.z); portal.visible = false; portal.castShadow = false; portal.userData.keep = true;
      g.add(portal); KG.portal = portal;
    }
    return KG.bake(api, g);
  },

  // ---- L: the emitters fire, the gate opens, the Keeper speaks ----
  finishStart(api) { this._f = 0; this._said = false; window.KG.openK = 0.001; },
  finishUpdate(api, dt) {
    const KG = window.KG; this._f += dt;
    KG.openK = this._f < 3 ? this._f / 3 * 0.3 : Math.min(1, 0.3 + (this._f - 3) / 6 * 0.7);
    if (this._f > 2.8 && !this._s1) { this._s1 = true; api.sparkle(new api.THREE.Vector3(KG.C.x, KG.C.y, KG.C.z), 5); }
    if (this._f > 9.2 && !this._said) { this._said = true; KG.speak(this.LINE); api.setFlag('opened', true); }
    if (this._f >= 16) { this._s1 = false; return true; }
    return false;
  },

  tick(api, dt, t) {
    window.KG.update(api, dt, t);
    // once the gate is open, a button leads straight into the second council meeting
    if (api.flag('opened') && !document.getElementById('nextMeeting')) {
      const b = document.createElement('button'); b.id = 'nextMeeting';
      b.innerHTML = 'GO TO THE SECOND COUNCIL MEETING ▶<small style="display:block;font-weight:400;font-size:10px;letter-spacing:2px;color:#ffe9b8;margin-top:3px">THE COUNCIL CHOOSES WHAT COMES NEXT</small>';
      b.style.cssText = 'position:fixed;left:50%;bottom:22px;transform:translateX(-50%);z-index:9;padding:10px 22px;font:600 14px "Segoe UI",Arial;letter-spacing:3px;color:#fff;background:rgba(120,90,20,.85);border:1px solid #ffd060;border-radius:5px;cursor:pointer;box-shadow:0 0 18px rgba(255,208,96,.45)';
      b.onmouseenter = () => b.style.background = 'rgba(160,120,30,.95)'; b.onmouseleave = () => b.style.background = 'rgba(120,90,20,.85)';
      b.onclick = () => { location.href = 'councilmeeting/councilmeeting2.html'; };
      document.body.appendChild(b);
    }
  },
});
