/* ============================================================
   THE WATCH NETWORK · BUILD 3 · THE WATCH HALL & THE LIVE SCREENS
   Keep this file in projects/watchnetwork next to 76-watchnetwork.html.
   A watch hall where the council can see every place of Unity, and four tall screens that show Havenreach, the ore mine, Seashore and the Farmlands.
   ============================================================ */
(function () {
  const P = window.PWP;
  P.PLACES = [['HAVENREACH', 'STATION-7'], ['VESH ORE MINE', 'ICE & ORE'], ['SEASHORE', 'HARBOUR'], ['THE FARMLANDS', 'FIELDS']];
  P.watchTex = function (api, k, live) {
    const T = api.THREE, name = P.PLACES[k][0], sub = P.PLACES[k][1];
    const tx = api.canvasTex(512, 320, (c, w, h) => {
      const g = c.createLinearGradient(0, 0, 0, h);
      if (k === 0) { g.addColorStop(0, '#04081a'); g.addColorStop(1, '#16305a'); } else if (k === 1) { g.addColorStop(0, '#0a0a10'); g.addColorStop(1, '#3a3a44'); } else if (k === 2) { g.addColorStop(0, '#6fb8e8'); g.addColorStop(1, '#1d5f9a'); } else { g.addColorStop(0, '#8fd0f0'); g.addColorStop(1, '#4a9a3a'); }
      c.fillStyle = g; c.fillRect(0, 0, w, h);
      if (k === 0) { c.strokeStyle = '#9fd8ff'; c.lineWidth = 3; for (let r = 40; r <= 120; r += 40) { c.beginPath(); c.ellipse(256, 170, r * 1.5, r * 0.5, 0, 0, 7); c.stroke(); } c.fillStyle = '#ffd060'; c.fillRect(246, 100, 20, 140); c.fillStyle = '#fff'; for (let i = 0; i < 40; i++) c.fillRect(Math.random() * w, Math.random() * 120, 2, 2); }
      else if (k === 1) { c.fillStyle = '#5a4a3a'; c.beginPath(); c.ellipse(256, 230, 190, 50, 0, 0, 7); c.fill(); c.fillStyle = '#16161c'; c.beginPath(); c.ellipse(256, 230, 120, 28, 0, 0, 7); c.fill(); c.fillStyle = '#ffb040'; c.fillRect(300, 160, 40, 50); c.fillRect(160, 175, 30, 38); c.fillStyle = '#9fd8ff'; c.beginPath(); c.arc(420, 70, 28, 0, 7); c.fill(); }
      else if (k === 2) { c.fillStyle = '#e8d8a8'; c.fillRect(0, 230, w, 90); c.fillStyle = '#fff'; c.beginPath(); c.moveTo(150, 200); c.lineTo(250, 200); c.lineTo(230, 230); c.lineTo(170, 230); c.fill(); c.fillRect(196, 150, 5, 50); c.fillStyle = '#e44'; c.fillRect(300, 190, 70, 20); }
      else { for (let i = 0; i < 8; i++) { c.fillStyle = i % 2 ? '#7ab648' : '#5a9a38'; c.beginPath(); c.moveTo(i * 64 - 40, 320); c.lineTo(i * 64 + 10, 150); c.lineTo(i * 64 + 40, 150); c.lineTo(i * 64 + 40, 320); c.fill(); } c.fillStyle = '#c8e0f0'; c.fillRect(380, 90, 60, 40); }
      c.fillStyle = 'rgba(0,0,0,0.55)'; c.fillRect(0, h - 64, w, 64); c.fillStyle = '#fff'; c.font = 'bold 36px Arial'; c.fillText(name, 16, h - 28); c.fillStyle = '#7dff9a'; c.font = '20px Arial'; c.fillText('● LIVE · ' + sub, 16, h - 6);
    });
    return new T.MeshBasicMaterial({ map: tx, toneMapped: false });
  };
  (window.AEGIS_BUILDS = window.AEGIS_BUILDS || []).push(P.build({
    id: 3, name: 'THE WATCH HALL & THE LIVE SCREENS',
    brief: 'A watch hall where the council can see how every place is doing, and four tall screens in front of it showing Havenreach, the ore mine on Vesh, Seashore and the Farmlands.',
    types: {
      HALL:   { code: 'FB', name: 'WATCH HALL',  col: '#d7dade', w: 100, d: 50, h: 26 },
      SCREEN: { code: 'HM', name: 'LIVE SCREEN', col: '#2f6fb0', w: 18,  d: 4,  h: 24 },
    },
    order: ['HALL', 'SCREEN'],
    at: { HALL: [[1550 + 1340, -225]], SCREEN: [[1550 + 1300, -150], [1550 + 1360, -150], [1550 + 1440, -150], [1550 + 1500, -150]] },
    eye: [1550 + 1400, (window.__WATCH.Y || -85) + 170, -420],
    stats(api, c) { return [['WATCH HALL', c('HALL') ? 'BUILT' : 'NOT YET'], ['LIVE SCREENS', c('SCREEN') + ' / 4']]; },
    make(type, k, g, add, F, api, sl) {
      const T = api.THREE, H = P.pw(api);
      if (type === 'HALL') {
        add(new T.BoxGeometry(100, 1, 50), H.conc2, 0, 0.5, 0);
        add(new T.BoxGeometry(96, 20, 46), H.wall, 0, 11, 0);
        add(new T.BoxGeometry(98, 1.4, 48), H.roof, 0, 21.7, 0);
        add(new T.BoxGeometry(60, 5, 30), H.roof2, 0, 24.9, 0);
        const dish = add(new T.SphereGeometry(7, 14, 8, 0, Math.PI * 2, 0, 1.2), H.white, 30, 29, 0, false); dish.rotation.x = Math.PI;
        add(new T.CylinderGeometry(0.4, 0.4, 6, 6), H.steel, 30, 27, 0, false);
        for (let i = 0; i < 5; i++) add(new T.BoxGeometry(12, 6, 0.4), H.win, -36 + i * 18, 13, 23.2, false);
        P.sign(api, g, 'THE WATCH HALL', 40, 4, 0, 18, 23.4, 0, '#14242e', '#80f0ff');
        P.person(g, P.civ(76020), 'tablet', -20, 0.5, 30, 0); P.person(g, P.civ(76021), 'idle', 20, 0.5, 30, 0);
      } else if (type === 'SCREEN') {
        add(new T.BoxGeometry(4, 8, 4), H.conc2, 0, 4, 0);
        add(new T.BoxGeometry(1.6, 16, 1.6), H.steel2, 0, 15, -1);
        add(new T.BoxGeometry(18, 12, 1.6), H.dark, 0, 22, 0);
        const sc = new T.Mesh(new T.PlaneGeometry(16.4, 10.4), P.watchTex(api, k)); sc.position.set(0, 22, 0.85); g.add(sc);
        add(new T.BoxGeometry(18.4, 0.5, 1.8), H.cool, 0, 28.3, 0, false);
      }
    },
  }));
})();
