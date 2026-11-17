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
      ch:[5,7,8,10,18,24,26,28,30,32,34,38,40,44,52,54,56,58,59,60,61,62,65,68,69], s:'kryos' },
    { w:'unity',  name:'SEASHORE COAST',          c:'#4fb0ff', d:'Harbour town, shipyard, trade port and the fishing harbor.',
      ch:[6,42,46,84], s:'sea' },
    { w:'unity',  name:'FARMLANDS',               c:'#6fe08a', d:'Reservoir, canals, fields, greenhouses and silos.',
      ch:[12], s:'farm' },
    { w:'unity',  name:'ORCHARD VALLEY & FESTIVAL', c:'#8fd05a', d:'Orchards below the vault, and the Harvest Festival Grounds.',
      ch:[66,67], s:'orch' },
    { w:'unity',  name:'FAR MOUNTAIN',            c:'#bff8d0', d:'The Builder’s Mountain House on the summit and the Seed Vault at its foot.',
      ch:[63,64], s:'mtn' },
    { w:'unity',  name:'CRYSTAL MINES',           c:'#70f0e0', d:'The mountain mines east of Kryos and the crystal rail.',
      ch:[50], s:'crys' },
    { w:'unity',  name:'ORE DEPOT',               c:'#e0a070', d:'Underground ore store on the plateau and the freighter yard.',
      ch:[16,36], s:'ore' },
    { w:'unity',  name:'FACTORY VALLEY',          c:'#ffc850', d:'Factories, warehouses, shipyard, watch network, scouts, star chart house, academy, House of Ocknog and the Works.',
      ch:[20,72,73,74,76,77,79,81,82,83], s:'fact' },
    { w:'unity',  name:'SUN FIELDS',              c:'#ffe070', d:'Nine long arrays of sun panels, a power hall and battery houses.', ch:[75], s:'sun' },
    { w:'unity',  name:'GREAT PARK OF UNITY',     c:'#90f0a0', d:'Lawns, a lake, tree walks, picnic groves, a bandstand and a great fountain.', ch:[78], s:'park' },

    { w:'vesh',   name:'MOON VESH',               c:'#b8c4d0', d:'The Moon Ore Mine — drills, ore pit, loading gantry — and the town of Vesh.', ch:[14,22] },
    { w:'ocknog', name:'OCKNOG & TUPONIC',        c:'#d9a05a', d:'The dry brown world, the alien city Tuponic, the cure cloud and the friendly visit.', ch:[70,71,80] }
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
  function drawUnity(svg) {
    const NS = 'http://www.w3.org/2000/svg';
function el(t,a,p,txt){const e=document.createElementNS(NS,t);for(const k in a)e.setAttribute(k,a[k]);if(txt!=null)e.textContent=txt;(p||svg).appendChild(e);return e;}
function g(tr,p){return el('g',{transform:tr},p);}
function blob(pts){const n=pts.length;let d='M'+pts[0][0]+','+pts[0][1];
  for(let i=0;i<n;i++){const p0=pts[(i-1+n)%n],p1=pts[i],p2=pts[(i+1)%n],p3=pts[(i+2)%n];
    d+=' C'+(p1[0]+(p2[0]-p0[0])/6)+','+(p1[1]+(p2[1]-p0[1])/6)+' '+(p2[0]-(p3[0]-p1[0])/6)+','+(p2[1]-(p3[1]-p1[1])/6)+' '+p2[0]+','+p2[1];}
  return d+'Z';}
let seed=7;function rnd(){seed=(seed*16807)%2147483647;return (seed-1)/2147483646;}
function inPoly(x,y,P){let c=false;for(let i=0,j=P.length-1;i<P.length;j=i++){const a=P[i],b=P[j];if(((a[1]>y)!=(b[1]>y))&&(x<(b[0]-a[0])*(y-a[1])/(b[1]-a[1])+a[0]))c=!c;}return c;}

/* ---------- sea + frame ---------- */
const defs=el('defs',{});
const sg=el('linearGradient',{id:'sea',x1:0,y1:0,x2:0,y2:1},defs);
el('stop',{offset:0,'stop-color':'#cdeeff'},sg);el('stop',{offset:1,'stop-color':'#9fd8f5'},sg);
el('rect',{x:0,y:0,width:1000,height:640,fill:'#1d7fd0'});
el('rect',{x:14,y:14,width:972,height:612,rx:10,fill:'url(#sea)'});
for(let i=0;i<60;i++){const x=40+rnd()*920,y=40+rnd()*560;el('path',{d:`M${x},${y} q6,-6 12,0 t12,0`,fill:'none',stroke:'#fff',opacity:.5,'stroke-width':2,'stroke-linecap':'round'});}

/* ---------- ONE BIG CONTINENT ---------- */
const UNITY=[[110,300],[95,230],[140,160],[220,120],[300,95],[400,85],[490,110],[580,85],[680,75],[780,100],[860,150],[905,230],[890,310],[920,380],[880,460],[800,520],[720,505],[650,555],[560,580],[470,545],[380,575],[290,560],[220,520],[150,470],[120,390]];
// islets
const ISL=[[[55,540],[85,520],[110,545],[90,572],[60,568]],[[935,545],[960,525],[975,555],[950,575]],[[215,55],[245,45],[262,62],[235,74]]];
ISL.forEach(p=>{el('path',{d:blob(p),fill:'none',stroke:'#9ed4f2','stroke-width':12,opacity:.55});el('path',{d:blob(p),fill:'#9be08a',stroke:'#fff','stroke-width':4});});
el('path',{d:blob(UNITY),fill:'none',stroke:'#9ed4f2','stroke-width':22,'stroke-linejoin':'round',opacity:.55});
el('path',{d:blob(UNITY),fill:'#9ee08a',stroke:'#fff','stroke-width':6,'stroke-linejoin':'round'});
// beach rim
el('path',{d:blob(UNITY),fill:'none',stroke:'#f3e3a2','stroke-width':3,transform:'translate(0,0)',opacity:.0});

/* ---------- wild biomes (shaded patches) ---------- */
const FOR_NW=[[140,195],[250,130],[345,170],[335,262],[250,305],[160,262]];
const FOR_SW=[[165,405],[265,365],[335,420],[305,505],[212,492]];
const FOR_E=[[765,385],[860,355],[882,450],[800,498],[742,450]];
const FOR_N=[[560,112],[700,112],[722,172],[600,192]];
const FOR_C=[[300,215],[430,185],[560,230],[570,340],[470,400],[330,390],[290,300]];  // wide wood around Kryos
const HIGH_N=[[380,100],[520,102],[545,150],[430,172],[378,140]];
const HIGH_NE=[[750,112],[860,152],[884,232],[792,235]];
const HIGH_E=[[660,285],[765,268],[775,372],[682,382]];
const MEAD1=[[500,165],[600,232],[565,300],[478,262]];
const MEAD2=[[610,500],[780,472],[805,520],[700,525]];
const MEAD3=[[130,330],[200,300],[215,395],[140,395]];
const LAKE1=[[232,415],[262,398],[303,412],[292,444],[250,448]];
const LAKE2=[[570,392],[598,382],[620,402],[596,424],[572,414]];
const LAKE3=[[450,120],[482,112],[500,132],[470,146]];
function patch(P,fill,op){el('path',{d:blob(P),fill:fill,opacity:op,stroke:'none'});}
patch(FOR_C,'#6fc46a',.45);patch(FOR_NW,'#4fae5f',.6);patch(FOR_SW,'#4fae5f',.6);patch(FOR_E,'#4fae5f',.6);patch(FOR_N,'#4fae5f',.6);
patch(HIGH_N,'#c9b99a',.55);patch(HIGH_NE,'#c9b99a',.55);patch(HIGH_E,'#c9b99a',.55);
patch(MEAD1,'#c6ee8a',.8);patch(MEAD2,'#c6ee8a',.8);patch(MEAD3,'#c6ee8a',.8);
[LAKE1,LAKE2,LAKE3].forEach(P=>{el('path',{d:blob(P),fill:'#7fcdf2',stroke:'#fff','stroke-width':3});el('path',{d:blob(P),fill:'none',stroke:'#b8e6fa','stroke-width':1.5,transform:'translate(-2,-2) scale(.92)'});});

/* ---------- built places (centres) ---------- */
const SITES={kryos:[430,300],sea:[148,320],farm:[300,188],park:[536,372],fact:[430,478],sun:[520,500],ore:[650,452],orch:[640,215],mtn:[806,172],crys:[705,332]};
const KEEP=Object.values(SITES).map(p=>[p[0],p[1],p===SITES.kryos?34:40]);
function free(x,y){for(const k of KEEP){if(Math.hypot(x-k[0],y-k[1])<k[2])return false;}for(const L of [LAKE1,LAKE2,LAKE3]){if(inPoly(x,y,L))return false;}return true;}

/* ---------- scatter wild stuff (depth-sorted) ---------- */
const items=[];
function scatter(P,n,fn,minD){let tries=0,got=0;const bb=P.reduce((b,p)=>[Math.min(b[0],p[0]),Math.min(b[1],p[1]),Math.max(b[2],p[0]),Math.max(b[3],p[1])],[1e9,1e9,-1e9,-1e9]);
  while(got<n&&tries<n*30){tries++;const x=bb[0]+rnd()*(bb[2]-bb[0]),y=bb[1]+rnd()*(bb[3]-bb[1]);if(inPoly(x,y,P)&&inPoly(x,y,UNITY)&&free(x,y)){items.push({y,fn:()=>fn(x,y)});got++;}}}
function tree(x,y,s=1,c='#2e9a4f'){const t=g(`translate(${x},${y}) scale(${s})`);el('ellipse',{cx:0,cy:6,rx:5,ry:1.8,fill:'rgba(0,60,20,.18)'},t);el('rect',{x:-1.3,y:0,width:2.6,height:6,fill:'#7a4a22'},t);el('circle',{cx:0,cy:-4,r:6,fill:c,stroke:'#1f6f3a','stroke-width':1},t);}
function pine(x,y,s=1){const t=g(`translate(${x},${y}) scale(${s})`);el('path',{d:'M0,-15 L7,0 L-7,0Z',fill:'#2a8a52',stroke:'#17603a','stroke-width':1},t);el('path',{d:'M0,-20 L5,-8 L-5,-8Z',fill:'#32a060',stroke:'#17603a','stroke-width':.8},t);el('rect',{x:-1.3,y:0,width:2.6,height:4,fill:'#7a4a22'},t);}
function mtn(x,y,s=1,snow=true){const t=g(`translate(${x},${y}) scale(${s})`);el('path',{d:'M-18,0 L0,-30 L18,0Z',fill:'#8a7aa6',stroke:'#5a4a78','stroke-width':1.5,'stroke-linejoin':'round'},t);if(snow)el('path',{d:'M-6,-14 L0,-30 L6,-14 L2,-11 L0,-14 L-3,-11Z',fill:'#fff'},t);}
function flower(x,y){const c=['#ff6b9d','#ffd23f','#fff','#b38cff'][Math.floor(rnd()*4)];el('circle',{cx:x,cy:y,r:1.8,fill:c,stroke:'#fff','stroke-width':.4});}
function tuft(x,y){el('path',{d:`M${x-3},${y} q1,-5 3,-6 q1,3 3,6`,fill:'none',stroke:'#4f9a45','stroke-width':1.2,'stroke-linecap':'round'});}
function hill(x,y){el('path',{d:`M${x-10},${y} q10,-12 20,0`,fill:'#8bd16f',stroke:'#5aa84c','stroke-width':1.2});}
function rock(x,y){el('path',{d:`M${x-5},${y} l2,-5 l6,0 l3,5Z`,fill:'#b7b0a6',stroke:'#807a70','stroke-width':1});}
function deer(x,y){const t=g(`translate(${x},${y})`);el('ellipse',{cx:0,cy:0,rx:6,ry:3,fill:'#b5773a'},t);el('circle',{cx:7,cy:-3,r:2.2,fill:'#b5773a'},t);el('path',{d:'M-4,2 l0,5 M3,2 l0,5',stroke:'#7a4a22','stroke-width':1.3},t);el('path',{d:'M7,-5 l-1,-3 M8,-5 l1,-3',stroke:'#7a4a22','stroke-width':1},t);}
scatter(FOR_C,34,(x,y)=>tree(x,y,.9,'#3fae55'));
scatter(FOR_NW,60,(x,y)=>rnd()<.5?pine(x,y,.95):tree(x,y,1,'#2e9a4f'));
scatter(FOR_SW,50,(x,y)=>rnd()<.5?pine(x,y,.95):tree(x,y,1,'#2e9a4f'));
scatter(FOR_E,40,(x,y)=>pine(x,y,.95));
scatter(FOR_N,28,(x,y)=>pine(x,y,.95));
scatter(HIGH_N,6,(x,y)=>mtn(x,y,1+rnd()*.5));
scatter(HIGH_NE,5,(x,y)=>mtn(x,y,1+rnd()*.5));
scatter(HIGH_E,5,(x,y)=>mtn(x,y,.9+rnd()*.4));
scatter(MEAD1,26,(x,y)=>rnd()<.5?flower(x,y):tuft(x,y));
scatter(MEAD2,26,(x,y)=>rnd()<.5?flower(x,y):tuft(x,y));
scatter(MEAD3,16,(x,y)=>rnd()<.5?flower(x,y):tuft(x,y));
scatter(UNITY,34,(x,y)=>hill(x,y));
scatter(UNITY,20,(x,y)=>rock(x,y));
[[190,222],[705,155],[200,458],[800,415],[470,148]].forEach(p=>items.push({y:p[1],fn:()=>deer(p[0],p[1])}));
// rivers (drawn before items)
el('path',{d:'M806,200 C730,230 700,285 628,312 C560,340 585,395 540,438 C515,470 545,540 562,580',fill:'none',stroke:'#7fcdf2','stroke-width':7,'stroke-linecap':'round'});
el('path',{d:'M806,200 C730,230 700,285 628,312 C560,340 585,395 540,438 C515,470 545,540 562,580',fill:'none',stroke:'#b8e6fa','stroke-width':2,'stroke-linecap':'round'});
el('path',{d:'M500,132 C505,200 470,225 430,262',fill:'none',stroke:'#7fcdf2','stroke-width':4,'stroke-linecap':'round'});
el('path',{d:'M292,430 C320,470 380,470 430,478',fill:'none',stroke:'#7fcdf2','stroke-width':4,'stroke-linecap':'round'});

/* ---------- Sky-rail / roads between built places ---------- */
function road(a,b,bend=0){const A=SITES[a],B=SITES[b],mx=(A[0]+B[0])/2+bend,my=(A[1]+B[1])/2-bend;el('path',{d:`M${A[0]},${A[1]} Q${mx},${my} ${B[0]},${B[1]}`,fill:'none',stroke:'#fff7d6','stroke-width':2.6,'stroke-dasharray':'2 5','stroke-linecap':'round'});}
road('kryos','sea',-10);road('kryos','farm',12);road('kryos','fact',-8);road('kryos','orch',-14);road('kryos','crys',12);road('fact','ore',10);road('fact','sun',0);road('kryos','park',10);road('orch','mtn',-8);

items.sort((a,b)=>a.y-b.y).forEach(i=>i.fn());

/* ---------- built icons ---------- */
function house(x,y,c='#fff',s=1){const t=g(`translate(${x},${y}) scale(${s})`);el('rect',{x:-6,y:-6,width:12,height:9,fill:c,stroke:'#2b5c8a','stroke-width':1},t);el('path',{d:'M-8,-6 L0,-13 L8,-6Z',fill:'#3aa6d9',stroke:'#2b5c8a','stroke-width':1},t);}
function tower(x,y,c,h,s=1){const t=g(`translate(${x},${y}) scale(${s})`);el('rect',{x:-4,y:-h,width:8,height:h,fill:c,stroke:'#2b5c8a','stroke-width':1},t);el('rect',{x:-2,y:-h+3,width:4,height:3,fill:'#fff'},t);}
function factory(x,y,s=1){const t=g(`translate(${x},${y}) scale(${s})`);el('rect',{x:-10,y:-8,width:20,height:10,fill:'#e8873a',stroke:'#8a4a1a','stroke-width':1},t);el('rect',{x:5,y:-18,width:4,height:10,fill:'#b8602a',stroke:'#8a4a1a','stroke-width':1},t);el('path',{d:'M-10,-8 L-5,-13 L0,-8 L5,-13 L10,-8Z',fill:'#f2a15a',stroke:'#8a4a1a','stroke-width':1},t);}
function wheat(x,y){const t=g(`translate(${x},${y})`);for(let i=0;i<3;i++){el('path',{d:`M${i*5-5},4 L${i*5-5},-6`,stroke:'#c79a1f','stroke-width':1.5},t);el('ellipse',{cx:i*5-5,cy:-8,rx:2,ry:4,fill:'#f2c63c'},t);}}
function crystal(x,y,s=1){const t=g(`translate(${x},${y}) scale(${s})`);el('path',{d:'M-7,0 L-4,-14 L0,0Z',fill:'#58d6d0',stroke:'#1f8f92','stroke-width':1},t);el('path',{d:'M-2,0 L3,-22 L8,0Z',fill:'#8ff0ea',stroke:'#1f8f92','stroke-width':1},t);}
function sail(x,y,s=1,c='#fff'){const t=g(`translate(${x},${y}) scale(${s})`);el('path',{d:'M-9,0 L9,0 L6,5 L-6,5Z',fill:'#b0643a',stroke:'#6a3a1a','stroke-width':1},t);el('path',{d:'M0,-1 L0,-16 L8,-3Z',fill:c,stroke:'#999','stroke-width':.8},t);}
function whale(x,y,s=1){const t=g(`translate(${x},${y}) scale(${s})`);el('path',{d:'M-16,0 C-14,-10 6,-12 14,-4 L20,-9 L19,0 C10,8 -10,8 -16,0Z',fill:'#3b86c8',stroke:'#1d5a96','stroke-width':1.2},t);el('circle',{cx:-8,cy:-2,r:1.3,fill:'#fff'},t);el('path',{d:'M-4,-10 q-2,-6 0,-8 M-4,-10 q2,-6 4,-7',stroke:'#fff','stroke-width':1.5,fill:'none'},t);}
function fish(x,y,s=1){const t=g(`translate(${x},${y}) scale(${s})`);el('path',{d:'M-8,0 C-4,-6 4,-6 8,0 C4,6 -4,6 -8,0Z M8,0 L13,-4 L13,4Z',fill:'#ff8a3d',stroke:'#c4561a','stroke-width':1},t);}
function lighthouse(x,y,s=1){const t=g(`translate(${x},${y}) scale(${s})`);el('path',{d:'M-5,0 L-3,-18 L3,-18 L5,0Z',fill:'#fff',stroke:'#c0392b','stroke-width':1.2},t);el('rect',{x:-4,y:-12,width:8,height:4,fill:'#e74c3c'},t);el('rect',{x:-3,y:-22,width:6,height:5,fill:'#ffe066',stroke:'#c0392b','stroke-width':1},t);}
function windmill(x,y,s=1){const t=g(`translate(${x},${y}) scale(${s})`);el('path',{d:'M-5,0 L-3,-14 L3,-14 L5,0Z',fill:'#fff',stroke:'#9a6a3a','stroke-width':1},t);[0,90,180,270].forEach(a=>el('path',{d:'M0,-14 L2,-26 L-2,-26Z',fill:'#d7a46a',stroke:'#9a6a3a','stroke-width':.8,transform:`rotate(${a+20} 0 -14)`},t));}
function star(x,y,s=1,c='#ffd23f'){const t=g(`translate(${x},${y}) scale(${s})`);let d='';for(let i=0;i<10;i++){const r=i%2?4:9,a=Math.PI*i/5-Math.PI/2;d+=(i?'L':'M')+(Math.cos(a)*r)+','+(Math.sin(a)*r);}el('path',{d:d+'Z',fill:c,stroke:'#b8860b','stroke-width':1},t);}
function panel(x,y){el('path',{d:`M${x-7},${y} l3,-6 l11,0 l-3,6Z`,fill:'#3c5fa8',stroke:'#fff','stroke-width':1});}
function appleTree(x,y,c){tree(x,y,.85,c);}
function lbl(x,y,txt,sz=12){return el('text',{x,y,class:'rname','font-size':sz,'text-anchor':'middle'},null,txt);}
function tiny(x,y,txt){return el('text',{x,y,class:'tiny','text-anchor':'middle'},null,txt);}
function wild(x,y,txt,sz=11,r=0){return el('text',{x,y,class:'wild','font-size':sz,'text-anchor':'middle',transform:`rotate(${r} ${x} ${y})`},null,txt);}

// small circular "town" patch under a built place
function townPatch(p,r,fill){el('circle',{cx:p[0],cy:p[1],r:r,fill:fill,stroke:'#fff','stroke-width':2.5,'stroke-dasharray':'5 4',opacity:.95});}
// KRYOS — small
townPatch(SITES.kryos,28,'#e9fff5');
const K=SITES.kryos;
el('rect',{x:K[0]-7,y:K[1]-3,width:14,height:7,rx:2,fill:'#bfc9d6',stroke:'#7b8ba0'});
[[-17,-9],[-12,11],[15,-11],[17,9],[0,-18],[-2,18]].forEach(a=>house(K[0]+a[0],K[1]+a[1]+4,'#fff',.7));
tower(K[0]-7,K[1]-5,'#69b7ff',17,.85);tower(K[0]+8,K[1]-3,'#69b7ff',14,.85);star(K[0],K[1]-36,.8);
// seashore
townPatch(SITES.sea,24,'#f4e3a1');
house(SITES.sea[0]-4,SITES.sea[1]-2,'#fff',.8);house(SITES.sea[0]+9,SITES.sea[1]+9,'#fff',.8);lighthouse(SITES.sea[0]-18,SITES.sea[1]+14,.9);
sail(88,300,.9);sail(78,345,.9,'#ffd2d2');sail(100,255,.8);
// farmlands
townPatch(SITES.farm,30,'#e6f27a');
[[-14,6],[-4,8],[7,5],[16,9],[-9,-6],[3,-8]].forEach(a=>wheat(SITES.farm[0]+a[0],SITES.farm[1]+a[1]));windmill(SITES.farm[0]+14,SITES.farm[1]-6,.8);
// factory valley
townPatch(SITES.fact,34,'#ffd9a0');
[[-20,4,.8],[-6,0,.95],[8,6,.8],[22,2,.75]].forEach(a=>factory(SITES.fact[0]+a[0],SITES.fact[1]+a[1],a[2]));
// sun fields
[[-10,0],[0,0],[10,0],[-10,8],[0,8],[10,8]].forEach(a=>panel(SITES.sun[0]+a[0],SITES.sun[1]+a[1]));
// park
townPatch(SITES.park,26,'#bff0c8');tree(SITES.park[0]-12,SITES.park[1]-2,1.1,'#58c46a');tree(SITES.park[0]+8,SITES.park[1]-9,1.1,'#58c46a');tree(SITES.park[0]-2,SITES.park[1]+12,1,'#58c46a');
// ore depot
townPatch(SITES.ore,24,'#e8d2b0');mtn(SITES.ore[0]-8,SITES.ore[1]+4,.7,false);factory(SITES.ore[0]+10,SITES.ore[1]+8,.7);
// orchard & festival
townPatch(SITES.orch,28,'#ffe38a');[[-12,-4],[0,-8],[12,-3],[-6,8],[8,9]].forEach((a,i)=>appleTree(SITES.orch[0]+a[0],SITES.orch[1]+a[1],i%2?'#ff6b5b':'#3fae55'));
// far mountain
mtn(SITES.mtn[0]-18,SITES.mtn[1]+6,1,true);mtn(SITES.mtn[0]+4,SITES.mtn[1]+2,1.4,true);mtn(SITES.mtn[0]+26,SITES.mtn[1]+7,.9,true);house(SITES.mtn[0]+2,SITES.mtn[1]-30,'#fff',.7);
// crystal mines
townPatch(SITES.crys,24,'#a8ece6');crystal(SITES.crys[0]-8,SITES.crys[1]+8,1.1);crystal(SITES.crys[0]+8,SITES.crys[1]+10,1);tower(SITES.crys[0]+14,SITES.crys[1]-2,'#7a8da6',12,.8);

/* ---------- ROOM FOR MORE markers on empty land ---------- */
[[250,290,'?'],[740,440,'?'],[385,380,'?'],[840,290,'?']].forEach(p=>{el('circle',{cx:p[0],cy:p[1],r:14,fill:'rgba(255,255,255,.35)',stroke:'#fff','stroke-width':2,'stroke-dasharray':'3 3'});el('text',{x:p[0],y:p[1]+6,'text-anchor':'middle','font-size':16,'font-weight':800,fill:'#fff',stroke:'#4a9a3e','stroke-width':.8,'paint-order':'stroke'},null,p[2]);});

/* ---------- labels ---------- */
lbl(K[0],K[1]+46,'KRYOS',14);tiny(K[0],K[1]+57,'THE CITY OF PEACE');
lbl(SITES.sea[0]+2,SITES.sea[1]+34,'SEASHORE',10);
lbl(SITES.farm[0],SITES.farm[1]+44,'FARMLANDS',10);
lbl(SITES.fact[0]-8,SITES.fact[1]+28,'FACTORY VALLEY',10);
lbl(SITES.sun[0]+2,SITES.sun[1]+22,'SUN FIELDS',9);
lbl(SITES.park[0],SITES.park[1]+44,'GREAT PARK',9);
lbl(SITES.ore[0],SITES.ore[1]+32,'ORE DEPOT',9);
lbl(SITES.orch[0],SITES.orch[1]+42,'ORCHARD VALLEY',9);
lbl(SITES.mtn[0],SITES.mtn[1]+26,'FAR MOUNTAIN',10);
lbl(SITES.crys[0],SITES.crys[1]+34,'CRYSTAL MINES',9);
lbl(500,60,'UNITY',24);
// wild names
wild(235,160,'UNTOUCHED FOREST',11,-18);wild(240,520,'WILD WOODS',10,-12);wild(840,420,'EAST WOODS',10,-30);wild(640,128,'PINE COUNTRY',10,6);
wild(440,110,'THE NORTHERN HIGHLANDS',9,-4);wild(785,230,'HIGH PEAKS',9,0);wild(545,205,'OPEN MEADOWS',10,24);wild(700,508,'SOUTH PLAINS',10,-8);
wild(270,425,'QUIET LAKE',8,0);wild(300,320,'THE EMPTY LANDS',9,0);

/* ---------- sea life + sea names ---------- */
whale(52,430,1.1);whale(955,300,1);fish(40,150,.9);fish(950,470,.8);sail(520,610,.9);sail(150,600,.9,'#ffe9a8');fish(700,605,.9);fish(330,610,.8);sail(955,200,.9);
const sn=(x,y,t,r=0)=>el('text',{x,y,class:'sea','text-anchor':'middle',transform:`rotate(${r} ${x} ${y})`},null,t);
sn(48,300,'THE WESTERN SEA',-90);sn(640,38,'SUNRISE OCEAN');sn(965,420,'EASTERN SEA',-90);sn(420,610,'SOUTHERN SEA');

/* ---------- title banner ---------- */
const tb=g('translate(34,34)');
el('rect',{x:0,y:0,width:250,height:52,rx:14,fill:'#2fa86a',stroke:'#fff','stroke-width':4},tb);
el('rect',{x:6,y:6,width:238,height:40,rx:10,fill:'none',stroke:'#7be3a9','stroke-width':2},tb);
el('text',{x:125,y:36,'text-anchor':'middle','font-size':26,'font-weight':900,fill:'#fff',stroke:'#1a6d44','stroke-width':1.2,'paint-order':'stroke','letter-spacing':3},tb,'PLANET UNITY');
el('text',{x:159,y:104,'text-anchor':'middle','font-size':11,'font-weight':800,fill:'#ffd23f',stroke:'#1a6d44','stroke-width':3,'paint-order':'stroke','letter-spacing':2},null,'90% STILL WILD');

/* ---------- compass ---------- */
const cp=g('translate(80,575)');
el('circle',{r:32,fill:'#fff',stroke:'#1d7fd0','stroke-width':3,opacity:.92},cp);
el('path',{d:'M0,-28 L7,0 L0,28 L-7,0Z',fill:'#e74c3c'},cp);el('path',{d:'M-28,0 L0,-7 L28,0 L0,7Z',fill:'#1d7fd0'},cp);el('circle',{r:4,fill:'#fff'},cp);
el('text',{y:-36,'text-anchor':'middle','font-size':13,'font-weight':800,fill:'#123a63'},cp,'N');
el('text',{x:44,y:5,'text-anchor':'middle','font-size':11,'font-weight':800,fill:'#e0a000'},cp,'☀E');

/* ---------- Moon Vesh inset, Havenreach, Ocknog ---------- */
const mv=g('translate(930,70)');
el('circle',{r:40,fill:'#dfe6ee',stroke:'#fff','stroke-width':4},mv);
[[-15,-10,9],[14,-14,6],[10,14,11],[-18,16,5]].forEach(c=>el('circle',{cx:c[0],cy:c[1],r:c[2],fill:'#c3ccd8',stroke:'#aeb8c6'},mv));
factory(0,4,.8);el('text',{y:60,'text-anchor':'middle',class:'rname','font-size':11},mv,'MOON VESH');
const hv=g('translate(380,40)');el('ellipse',{rx:22,ry:8,fill:'#fff',stroke:'#1d7fd0','stroke-width':2},hv);el('ellipse',{rx:10,ry:4,fill:'#7fd8ff'},hv);
el('text',{y:22,'text-anchor':'middle',class:'rname','font-size':9},hv,'HAVENREACH (IN THE SKY)');
el('text',{x:965,y:618,'text-anchor':'end',class:'rname','font-size':10},null,'OCKNOG — FAR BEYOND THE EASTERN SEA ▶');

el('rect',{x:14,y:14,width:972,height:612,rx:10,fill:'none',stroke:'#1d7fd0','stroke-width':6});
    return SITES;
  }

  function renderUnityMap(container, list) {
    const save = getSave(), prog = save.progress || {};
    const { byNum } = index(list);
    container.innerHTML = '';
    container.classList.add('wbu');
    const wrap = document.createElement('div'); wrap.className = 'wbu-wrap';
    const svg = mk('svg', { viewBox: '0 0 1000 640', class: 'wbu-svg' });
    wrap.appendChild(svg);
    const info = document.createElement('div'); info.className = 'wbu-info';
    info.innerHTML = '<div class="wbu-hint">TAP A PLACE ON THE MAP TO SEE WHAT IS BUILT THERE</div>';
    container.append(wrap, info);
    const S = drawUnity(svg);

    function row(x, c) {
      const ok = openable(x, save), done = prog[String(x.idx)] === 'complete';
      const li = document.createElement('li'); li.className = (ok ? 'ok' : 'locked') + (done ? ' done' : '');
      li.innerHTML = '<span class="s">' + (done ? '✓' : (ok ? '▶' : '🔒')) + '</span><span class="n" style="color:' + c + '">CH ' + x.num + '</span><span class="t"></span><span class="b">' + (x.p.label || ((x.p.builds || 0) + ' BUILDS')) + '</span>';
      li.querySelector('.t').textContent = clean(x.p.name);
      li.title = x.p.brief || '';
      if (ok) li.onclick = () => go(x, save);
      return li;
    }
    function showArea(l) {
      info.innerHTML = '';
      const h = document.createElement('h3'); h.style.color = l.c; h.textContent = l.name; info.appendChild(h);
      const d = document.createElement('p'); d.textContent = l.d; info.appendChild(d);
      const ul = document.createElement('ul');
      l.ch.map(n => byNum[n]).filter(Boolean).forEach(x => ul.appendChild(row(x, l.c)));
      info.appendChild(ul);
      const e = document.createElement('div'); e.className = 'wbu-more'; e.textContent = '+ ROOM FOR MORE'; info.appendChild(e);
      info.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    const R = { kryos: 40, mtn: 44, fact: 40, sea: 30, sun: 26 };
    LOCS.filter(l => l.s && S[l.s]).forEach(l => {
      const p = S[l.s];
      const c = mk('circle', { cx: p[0], cy: p[1], r: R[l.s] || 32, class: 'wbu-hit' });
      c.appendChild(mk('title', {}, l.name));
      c.onclick = () => showArea(l);
      svg.appendChild(c);
    });
    [[250, 290], [740, 440], [385, 380], [840, 290]].forEach(p => {
      const c = mk('circle', { cx: p[0], cy: p[1], r: 16, class: 'wbu-hit' });
      c.onclick = () => { info.innerHTML = '<div class="wbu-hint">EMPTY LAND — ROOM FOR A NEW PLACE ON UNITY</div>'; };
      svg.appendChild(c);
    });
  }

  const CSS = `
  .wbu-wrap { background:rgba(6,14,24,.8); border:1px solid rgba(127,216,255,.35); border-radius:10px; overflow:hidden; }
  .wbu-svg { display:block; width:100%; height:auto; }
  .wbu-hit { fill:rgba(255,255,255,0); stroke:rgba(255,255,255,0); stroke-width:3; cursor:pointer; } .wbu-hit:hover { fill:rgba(255,255,255,.22); stroke:#fff; }
  .wbu-svg .rname{font-weight:800;fill:#123a63;paint-order:stroke;stroke:#fff;stroke-width:4;stroke-linejoin:round;letter-spacing:1px}
  .wbu-svg .wild{font-style:italic;font-weight:700;fill:#2f6b3f;paint-order:stroke;stroke:rgba(255,255,255,.7);stroke-width:3;letter-spacing:3px}
  .wbu-svg .sea{font-style:italic;fill:#2a7bbf;letter-spacing:5px;font-size:14px;font-weight:600}
  .wbu-svg .tiny{font-size:9.5px;font-weight:700;fill:#173b63;paint-order:stroke;stroke:#fff;stroke-width:3;stroke-linejoin:round}
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

  return { WORLDS, LOCS, NODES, renderUnityMap, helpers: { mk, clean, numOf, isMeeting, getSave, index, openable, go } };
})();
