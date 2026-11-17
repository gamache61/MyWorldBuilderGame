/* ================================================================
   WORLD BUILDER · WORLD MAP DATA + FLAT PLANET UNITY MAP
   Keep this file next to index.html and map.html.
   Used by both the menu (index.html) and the full map (map.html).

   TO ADD A CHAPTER:   put its number (the number on its html file) in
                       the "ch" list of an area in LOCS.
   TO ADD AN AREA:     add a line to LOCS (give Unity areas an "m" shape
                       so they show on the flat map).
   TO ADD A WORLD:     add a line to WORLDS, a line to LOCS, and a node
                       in NODES for the sky map.
   Chapters not listed anywhere show up under "NOT PLACED YET".
   ================================================================ */
window.WB_MAP = (function () {

  const WORLDS = [
    { id:'earth',  name:'EARTH',                note:'Where the story begins — shipyards and the parts depot.' },
    { id:'space',  name:'DEEP SPACE',           note:'The Seeker’s voyage to The Keeper.' },
    { id:'haven',  name:'STATION-7 HAVENREACH', note:'The sky station above Unity.' },
    { id:'unity',  name:'PLANET UNITY',         note:'The green world of peace and the Unity Council.' },
    { id:'vesh',   name:'MOON VESH',            note:'Unity’s moon — the Moon Ore Mine and the moon town.' },
    { id:'ocknog', name:'PLANET OCKNOG',        note:'Dry alien world and the great alien city of Tuponic.' }
  ];

  // m = place on the flat Unity map (centre x,y and radii) — viewBox 1000 x 640
  const LOCS = [
    { w:'earth',  name:'SHIPYARDS & PARTS DEPOT', c:'#5fe8d8', d:'The Seeker and the Aegis Ark are built here.', ch:[1,3] },
    { w:'space',  name:'THE VOYAGE',              c:'#ffc860', d:'Strange planets, the empty green world, the bright light.', ch:[2] },
    { w:'haven',  name:'HAVENREACH STATION',      c:'#40d0ff', d:'Stacked disc station — Heartforge, gardens, living districts, Sky Docks on top.', ch:[4,48] },

    { w:'unity',  name:'KRYOS CITY',              c:'#5fe0a0', d:'The main city: landing field, Council Hall, homes, school, hospital, shops, arena, library, gate, spaceport, shield and watch builds.',
      ch:[5,7,8,10,18,24,26,28,30,32,34,38,40,44,52,54,56,58,59,60,61,62,65,68,69], m:{x:430,y:300,rx:165,ry:150} },
    { w:'unity',  name:'SEASHORE COAST',          c:'#4fb0ff', d:'Harbour town, shipyard, trade port and the fishing harbor.',
      ch:[6,42,46,84], m:{x:205,y:330,rx:70,ry:190} },
    { w:'unity',  name:'FARMLANDS',               c:'#6fe08a', d:'Reservoir, canals, fields, greenhouses and silos.',
      ch:[12], m:{x:340,y:70,rx:95,ry:48} },
    { w:'unity',  name:'ORCHARD VALLEY & FESTIVAL', c:'#8fd05a', d:'Orchards below the vault, and the Harvest Festival Grounds.',
      ch:[66,67], m:{x:700,y:205,rx:95,ry:55} },
    { w:'unity',  name:'FAR MOUNTAIN',            c:'#bff8d0', d:'The Builder’s Mountain House on the summit and the Seed Vault at its foot.',
      ch:[63,64], m:{x:860,y:95,rx:100,ry:70} },
    { w:'unity',  name:'CRYSTAL MINES',           c:'#70f0e0', d:'The mountain mines east of Kryos and the crystal rail.',
      ch:[50], m:{x:790,y:345,rx:100,ry:75} },
    { w:'unity',  name:'ORE DEPOT',               c:'#e0a070', d:'Underground ore store on the plateau and the freighter yard.',
      ch:[16,36], m:{x:710,y:490,rx:80,ry:55} },
    { w:'unity',  name:'FACTORY VALLEY',          c:'#ffc850', d:'Factories, warehouses, shipyard, sun fields, great park, star chart house, academy, House of Ocknog and the Works.',
      ch:[20,72,73,74,75,76,77,78,79,81,82,83], m:{x:440,y:545,rx:190,ry:72} },

    { w:'vesh',   name:'MOON VESH',               c:'#b8c4d0', d:'The Moon Ore Mine — drills, ore pit, loading gantry — and the town of Vesh.', ch:[14,22] },
    { w:'ocknog', name:'OCKNOG & TUPONIC',        c:'#d9a05a', d:'The dry brown world, the alien city Tuponic, the cure cloud and the friendly visit.', ch:[70,71,80] }
  ];

  // Spots inside Kryos City on the flat map (offsets from the city centre). n = chapter number.
  const KRYOS_SPOTS = [
    { n:8,  dx:35,  dy:-40, t:'COUNCIL HALL' },
    { n:26, dx:-62, dy:8,   t:'PLAYLAND' },
    { n:28, dx:62,  dy:10,  t:'SCHOOL' },
    { n:30, dx:0,   dy:-100,t:'NEW HOMES' },
    { n:32, dx:0,   dy:100, t:'HEALING' },
    { n:34, dx:-130,dy:0,   t:'SHOPS' },
    { n:38, dx:128, dy:0,   t:'ANIMALS' },
    { n:40, dx:95,  dy:80,  t:'SKY RAIL' },
    { n:44, dx:-95, dy:85,  t:'HOMEWARD 2' },
    { n:62, dx:75,  dy:-115,t:'HOMEWARD 3' },
    { n:65, dx:-95, dy:-85, t:'GUESTS' },
    { n:58, dx:-50, dy:-62, t:'ARENA' },
    { n:60, dx:10,  dy:-70, t:'LIBRARY' },
    { n:59, dx:-30, dy:50,  t:'LANGUAGE' },
    { n:61, dx:135, dy:-60, t:'GATE' },
    { n:68, dx:40,  dy:60,  t:'ELDERS' }
  ];

  // sky-map nodes (map.html): world id, x, y, radius, colour. id:null = empty slot
  const NODES = [
    { id:'earth',  x:90,  y:290, r:34, c:'#4f90ff' },
    { id:'space',  x:250, y:180, r:14, c:'#ffc860' },
    { id:'haven',  x:400, y:90,  r:18, c:'#40d0ff' },
    { id:'unity',  x:470, y:250, r:56, c:'#5fe0a0' },
    { id:'vesh',   x:630, y:150, r:22, c:'#b8c4d0' },
    { id:'ocknog', x:830, y:280, r:40, c:'#d9a05a' },
    { id:null, x:760, y:90,  r:26 },
    { id:null, x:930, y:150, r:20 },
    { id:null, x:660, y:340, r:18 }
  ];

  /* ------------------------- helpers ------------------------- */
  const NS = 'http://www.w3.org/2000/svg';
  function mk(t, a, txt) { const e = document.createElementNS(NS, t); for (const k in a) e.setAttribute(k, a[k]); if (txt != null) e.textContent = txt; return e; }
  const clean = n => (n || '').replace(/\s*[··]\s*(PLANET UNITY|MOON VESH|FACTORY DISTRICT TWO)\s*$/i, '').replace(/^THE /, '');
  function numOf(p) { const m = (p.html || '').match(/^(\d+)-/); return m ? parseInt(m[1], 10) : null; }
  function isMeeting(p) { return /councilmeeting/.test(p.html || ''); }
  function getSave() { try { return JSON.parse(localStorage.getItem('worldBuilderSave') || 'null') || {}; } catch (e) { return {}; } }

  function index(list) {
    const items = list.map((p, i) => ({ p, idx: i + 1, num: numOf(p), meet: isMeeting(p) }));
    const byNum = {}; items.filter(x => !x.meet).forEach(x => { if (x.num != null) byNum[x.num] = x; });
    return { items, byNum };
  }
  function openable(x, save) { const o = save.ownedUpTo || 0; return x.idx <= o || (o === 0 && x.idx === 1); }
  function go(x, save) {
    save.currentChapter = x.idx;
    try { localStorage.setItem('worldBuilderSave', JSON.stringify(save)); } catch (e) {}
    location.href = x.p.html;
  }

  /* ------------------- FLAT PLANET UNITY MAP ------------------- */
  function renderUnityMap(container, list) {
    const save = getSave(), prog = save.progress || {};
    const { byNum } = index(list);
    container.innerHTML = '';
    container.classList.add('wbu');

    const wrap = document.createElement('div'); wrap.className = 'wbu-wrap';
    const svg = mk('svg', { viewBox: '0 0 1000 640', class: 'wbu-svg' });
    wrap.appendChild(svg);
    const info = document.createElement('div'); info.className = 'wbu-info';
    info.innerHTML = '<div class="wbu-hint">TAP AN AREA OR A SPOT IN KRYOS TO SEE WHAT IS BUILT THERE</div>';
    container.append(wrap, info);

    // ---- terrain ----
    const defs = mk('defs', {});
    const gr = mk('radialGradient', { id: 'wbuLand', cx: '55%', cy: '45%', r: '70%' });
    gr.append(mk('stop', { offset: '0', 'stop-color': '#17432f' }), mk('stop', { offset: '1', 'stop-color': '#0c2a22' }));
    const gs = mk('linearGradient', { id: 'wbuSea', x1: '0', x2: '1' });
    gs.append(mk('stop', { offset: '0', 'stop-color': '#0b3556' }), mk('stop', { offset: '1', 'stop-color': '#0a2a45' }));
    defs.append(gr, gs); svg.appendChild(defs);
    svg.appendChild(mk('rect', { x: 0, y: 0, width: 1000, height: 640, fill: 'url(#wbuSea)' }));
    svg.appendChild(mk('path', { d: 'M165,0 L1000,0 L1000,640 L235,640 C205,575 150,520 172,455 C196,395 140,345 163,285 C184,225 148,120 165,0 Z', fill: 'url(#wbuLand)', stroke: 'rgba(127,216,255,.5)', 'stroke-width': 2 }));
    // sea label + waves
    svg.appendChild(mk('text', { x: 78, y: 320, fill: '#4f90c8', 'font-size': 15, 'letter-spacing': 6, transform: 'rotate(-90 78 320)', 'text-anchor': 'middle', opacity: .7 }, 'THE SEA'));
    // forest round Kryos
    svg.appendChild(mk('ellipse', { cx: 430, cy: 300, rx: 215, ry: 195, fill: '#1c5a37', opacity: .35 }));
    svg.appendChild(mk('text', { x: 430, y: 118, 'text-anchor': 'middle', fill: '#5fbf8a', 'font-size': 10, 'letter-spacing': 4, opacity: .6 }, 'FOREST'));
    // mountains (east / north-east)
    function mtn(x, y, s) { svg.appendChild(mk('path', { d: 'M' + (x - 26 * s) + ',' + (y + 20 * s) + ' L' + x + ',' + (y - 24 * s) + ' L' + (x + 26 * s) + ',' + (y + 20 * s) + ' Z', fill: '#2a4a5a', stroke: 'rgba(191,248,208,.4)', 'stroke-width': 1.2 })); }
    [[800,40,1.1],[860,30,1.4],[925,50,1.2],[955,120,1],[740,300,1],[800,280,1.2],[860,320,1.1],[890,390,1],[770,400,1]].forEach(a => mtn(...a));
    // river from mountains down the valley to the sea
    svg.appendChild(mk('path', { d: 'M740,130 C660,190 640,260 610,330 C585,400 640,420 590,470 C540,505 470,480 400,500 C330,520 300,590 235,610', fill: 'none', stroke: '#2b78b0', 'stroke-width': 7, 'stroke-linecap': 'round', opacity: .8 }));
    svg.appendChild(mk('text', { x: 612, y: 400, fill: '#7fc0ee', 'font-size': 9, 'letter-spacing': 3, opacity: .8 }, 'RIVER'));
    // sky-rail dashed line Kryos -> Seashore / Farmlands / factories
    [['M430,300 L205,330'], ['M430,300 L340,70'], ['M430,300 L440,545']].forEach(d => svg.appendChild(mk('path', { d: d[0], stroke: '#9fffd8', 'stroke-width': 1.3, 'stroke-dasharray': '3 6', opacity: .35, fill: 'none' })));
    // compass
    const cg = mk('g', { transform: 'translate(955,595)' });
    cg.append(mk('path', { d: 'M0,-22 L6,0 L0,22 L-6,0 Z', fill: '#d8ecff', opacity: .6 }), mk('text', { y: -28, 'text-anchor': 'middle', fill: '#d8ecff', 'font-size': 11 }, 'N'));
    svg.appendChild(cg);
    svg.appendChild(mk('text', { x: 985, y: 20, 'text-anchor': 'end', fill: '#ffd060', 'font-size': 10, 'letter-spacing': 2 }, 'SUNRISE ▶ EAST'));

    // ---- areas ----
    function showArea(l) {
      info.innerHTML = '';
      const h = document.createElement('h3'); h.style.color = l.c; h.textContent = l.name; info.appendChild(h);
      const d = document.createElement('p'); d.textContent = l.d; info.appendChild(d);
      const ul = document.createElement('ul');
      l.ch.map(n => byNum[n]).filter(Boolean).forEach(x => ul.appendChild(row(x, l.c)));
      info.appendChild(ul);
      const e = document.createElement('div'); e.className = 'wbu-more'; e.textContent = '+ ROOM FOR MORE'; info.appendChild(e);
    }
    function showOne(x, c) {
      info.innerHTML = ''; const ul = document.createElement('ul'); ul.appendChild(row(x, c)); info.appendChild(ul);
      if (x.p.brief) { const p = document.createElement('p'); p.textContent = x.p.brief; info.appendChild(p); }
    }
    function row(x, c) {
      const ok = openable(x, save), done = prog[String(x.idx)] === 'complete';
      const li = document.createElement('li'); li.className = (ok ? 'ok' : 'locked') + (done ? ' done' : '');
      li.innerHTML = '<span class="s">' + (done ? '✓' : (ok ? '▶' : '🔒')) + '</span><span class="n" style="color:' + c + '">CH ' + x.num + '</span><span class="t"></span><span class="b">' + (x.p.label || ((x.p.builds || 0) + ' BUILDS')) + '</span>';
      li.querySelector('.t').textContent = clean(x.p.name);
      if (ok) li.onclick = () => go(x, save);
      return li;
    }

    const unity = LOCS.filter(l => l.w === 'unity' && l.m);
    unity.forEach(l => {
      const count = l.ch.filter(n => byNum[n]).length;
      const g = mk('g', { class: 'wbu-area' });
      g.append(
        mk('ellipse', { cx: l.m.x, cy: l.m.y, rx: l.m.rx, ry: l.m.ry, fill: l.c, 'fill-opacity': .14, stroke: l.c, 'stroke-width': 2, 'stroke-dasharray': '6 5' })
      );
      const small = l.m.rx < 110;
      const ly = l.name === 'KRYOS CITY' ? l.m.y - l.m.ry + 22 : (l.name === 'SEASHORE COAST' ? l.m.y - l.m.ry + 20 : l.m.y - (small ? 6 : l.m.ry - 22));
      const lines = l.name.length > 16 ? l.name.split(' & ').map((s, i, a) => i < a.length - 1 ? s + ' &' : s) : [l.name];
      const t = mk('text', { x: l.m.x, y: ly, 'text-anchor': 'middle', fill: '#fff', 'font-size': l.name === 'KRYOS CITY' ? 15 : 11, 'font-weight': 600, 'letter-spacing': 2 });
      lines.forEach((s, i) => t.appendChild(mk('tspan', { x: l.m.x, dy: i ? 13 : 0 }, s)));
      g.appendChild(t);
      g.appendChild(mk('text', { x: l.m.x, y: ly + 13 * lines.length + (l.name === 'KRYOS CITY' ? 2 : 0), 'text-anchor': 'middle', fill: l.c, 'font-size': 10, 'letter-spacing': 1 }, count + (count === 1 ? ' PLACE' : ' PLACES')));
      g.onclick = () => showArea(l);
      svg.appendChild(g);
    });

    // Kryos spots
    const K = LOCS.find(l => l.name === 'KRYOS CITY');
    svg.appendChild(mk('rect', { x: 430 - 22, y: 300 - 11, width: 44, height: 22, rx: 4, fill: 'none', stroke: '#9fffd8', 'stroke-width': 1.2 }));
    svg.appendChild(mk('text', { x: 430, y: 300 + 4, 'text-anchor': 'middle', fill: '#9fffd8', 'font-size': 7, 'letter-spacing': 1 }, 'LANDING'));
    KRYOS_SPOTS.forEach(s => {
      const x = byNum[s.n]; if (!x) return;
      const done = prog[String(x.idx)] === 'complete';
      const g = mk('g', { class: 'wbu-spot' });
      const cx = 430 + s.dx, cy = 300 + s.dy;
      g.append(
        mk('circle', { cx, cy, r: 5, fill: done ? '#3ddc84' : '#fff', stroke: K.c, 'stroke-width': 1.5 }),
        mk('text', { x: cx, y: cy + 15, 'text-anchor': 'middle', fill: '#e8f6ff', 'font-size': 8, 'letter-spacing': .5 }, s.n + ' ' + s.t)
      );
      g.onclick = ev => { ev.stopPropagation(); showOne(x, K.c); };
      svg.appendChild(g);
    });

    // empty slots
    [[250, 590], [610, 600]].forEach(p => {
      const g = mk('g', { class: 'wbu-area' });
      g.append(mk('circle', { cx: p[0], cy: p[1], r: 22, fill: 'none', stroke: 'rgba(127,216,255,.4)', 'stroke-width': 2, 'stroke-dasharray': '4 5' }),
        mk('text', { x: p[0], y: p[1] + 5, 'text-anchor': 'middle', fill: '#5d7f98', 'font-size': 14 }, '?'),
        mk('text', { x: p[0], y: p[1] + 38, 'text-anchor': 'middle', fill: '#5d7f98', 'font-size': 8, 'letter-spacing': 2 }, 'ROOM FOR MORE'));
      g.onclick = () => { info.innerHTML = '<div class="wbu-hint">EMPTY LAND — ROOM FOR A NEW PLACE ON UNITY</div>'; };
      svg.appendChild(g);
    });
  }

  const CSS = `
  .wbu-wrap { background:rgba(6,14,24,.8); border:1px solid rgba(127,216,255,.35); border-radius:10px; overflow:hidden; }
  .wbu-svg { display:block; width:100%; height:auto; }
  .wbu-area { cursor:pointer; } .wbu-area:hover ellipse, .wbu-area:hover circle { fill-opacity:.3; }
  .wbu-spot { cursor:pointer; } .wbu-spot:hover circle { r:7; }
  .wbu-info { margin-top:12px; background:rgba(6,14,24,.85); border:1px solid rgba(127,216,255,.35); border-radius:8px; padding:14px 18px; min-height:70px; }
  .wbu-info h3 { margin:0 0 4px; letter-spacing:3px; font-size:15px; }
  .wbu-info p { margin:4px 0 8px; color:#8fb0c8; font-size:12.5px; line-height:1.5; }
  .wbu-hint { color:#5d7f98; letter-spacing:2px; font-size:12px; text-align:center; padding:14px 0; }
  .wbu-info ul { list-style:none; margin:0; padding:0; }
  .wbu-info li { display:flex; gap:8px; align-items:baseline; padding:5px 0; border-top:1px solid rgba(127,216,255,.12); font-size:13px; color:#fff; }
  .wbu-info li .n { font-size:11px; letter-spacing:1px; min-width:44px; } .wbu-info li .t { flex:1; } .wbu-info li .b { color:#8fb0c8; font-size:11px; letter-spacing:1px; white-space:nowrap; } .wbu-info li .s { width:14px; color:#8fb0c8; }
  .wbu-info li.locked { opacity:.45; } .wbu-info li.ok { cursor:pointer; } .wbu-info li.ok:hover .t { text-decoration:underline; } .wbu-info li.done .s { color:#3ddc84; }
  .wbu-more { border:1px dashed rgba(127,216,255,.35); border-radius:6px; margin-top:8px; padding:6px; text-align:center; color:#5d7f98; font-size:11px; letter-spacing:2px; }`;
  const st = document.createElement('style'); st.textContent = CSS; document.head.appendChild(st);

  return { WORLDS, LOCS, NODES, KRYOS_SPOTS, renderUnityMap, helpers: { mk, clean, numOf, isMeeting, getSave, index, openable, go } };
})();
