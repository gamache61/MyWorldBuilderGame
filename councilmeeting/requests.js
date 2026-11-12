/* ============================================================
   WORLD BUILDER · THE BUILDER'S REQUEST · end of every council meeting
   Keep this file at councilmeeting/requests.js.
   When a meeting ends the Speaker asks the Builder (the player) if there is
   anything to add to Unity. The player types a request. The council answers:
     - already built  -> the council says it already stands
     - anything else  -> the council will take it to a future meeting
   and the player can email the request to the Builder's desk.
   To teach the council a new topic: add one line to TOPICS below
   (words to listen for, then the project file it matches).
   ============================================================ */
(function () {
  var MAIL = 'gamacheapps@gmail.com';
  // Free key from web3forms.com (enter gamacheapps@gmail.com there, they email you the key). Paste it between the quotes.
  var WEB3KEY = '32d88891-2d62-44af-83e5-2b87f97c3c99';

  // [ words the player might type , project file it matches , what the council calls it ]
  var TOPICS = [
    [['welcome', 'visitor', 'guest', 'landing pad', 'embassy'], '61-gateofwelcome.html', 'the Gate of Welcome'],
    [['arena', 'stadium', 'sport', 'concert', 'festival', 'race', 'running', 'track'], '58-kryosarena.html', 'the Kryos Arena'],
    [['language', 'translat', 'interpret', 'linguist', 'speak to'], '59-languagehouse.html', 'the Language House'],
    [['rescue', 'medic', 'ambulance', 'lifeboat'], '56-rescue.html', 'the Rescue'],
    [['library', 'book', 'archive', 'reading', 'story'], '60-greatlibrary.html', 'the Great Library'],
    [['mountain', 'summit', 'house on a hill', 'hilltop', 'peak'], '63-mountainhouse.html', 'the Mountain House'],
    [['school', 'class', 'teach', 'learn', 'student', 'universit', 'college'], '28-greatschool.html', 'the Great School of Unity'],
    [['hospital', 'heal', 'doctor', 'clinic', 'medic', 'nurse', 'sick'], '32-houseofhealing.html', 'the House of Healing'],
    [['shop', 'mall', 'market', 'store', 'supermarket', 'restaurant', 'cafe'], '34-shoppingcentre.html', 'the Kryos Shopping Centre'],
    [['playground', 'playland', 'children', 'child', 'kids', 'toy', 'park', 'swing', 'slide'], '26-childrensplayland.html', "the Children's Playland"],
    [['animal', 'vet', 'pet', 'zoo', 'wildlife'], '38-animalcare.html', 'the Animal Care Centre'],
    [['farm', 'crop', 'field', 'harvest', 'orchard', 'greenhouse', 'agricultur'], '12-farmlands.html', 'the Farmlands of Unity'],
    [['crystal', 'fuel'], '50-crystalmines.html', 'the Crystal Mines'],
    [['mine', 'mining', 'ore', 'quarry'], '14-moonmines.html', 'the Moon Mines'],
    [['depot', 'storage', 'warehouse', 'stockpile'], '16-oredepot.html', 'the Unity Ore Depot'],
    [['factory', 'factories', 'industry', 'industrial', 'manufactur', 'workshop', 'recycl'], '20-factorydistrict.html', 'the Factory District'],
    [['rail', 'train', 'monorail', 'tram', 'subway', 'metro', 'bus'], '40-skyrail.html', 'the Sky Rail'],
    [['trade', 'trading', 'freighter', 'import', 'export'], '46-earthtradeport.html', 'the Earth Trade Port'],
    [['shipyard', 'boat', 'harbour', 'harbor', 'dock', 'ferry', 'pier'], '42-seashoreshipyard.html', 'the Seashore Shipyard'],
    [['defence', 'defense', 'guard', 'shield', 'soldier', 'army', 'police', 'military', 'weapon'], '52-guardianyard.html', 'the Guardian Yard'],
    [['telescope', 'observatory', 'radio', 'signal', 'antenna', 'dish', 'listen'], '54-starwatcharray.html', 'the Starwatch Array'],
    [['home', 'house', 'housing', 'apartment', 'flat', 'neighbourhood', 'neighborhood', 'village'], '44-homewardtwo.html', 'Homeward Two'],
    [['moon', 'vesh'], '22-veshtown.html', 'the Town on Vesh'],
    [['fleet', 'spaceship', 'starship', 'cargo'], '24-homewardfleet.html', 'the Homeward Fleet'],
    [['council hall', 'hall', 'parliament'], '08-councilhall.html', 'the Council Hall'],
    [['gate', 'gateway'], '10-keepersgate.html', "the Keeper's Gate"],
    [['sky dock', 'skydock', 'station', 'orbit', 'space station'], '48-havenreachskydocks.html', 'the Havenreach Sky Docks'],
    [['city', 'tower', 'skyscraper', 'power', 'energy', 'garden'], '05-kryoscity.html', 'Kryos City'],
    [['beach', 'sea', 'ocean', 'coast', 'lighthouse', 'resort', 'marina'], '06-seashore.html', 'Seashore']
  ];

  function pageName() { return decodeURIComponent(location.pathname.split('/').pop()).toLowerCase(); }
  function projects() { return window.SPACE_PROJECTS || []; }
  function indexOfFile(file) {
    var L = projects();
    for (var i = 0; i < L.length; i++) { if ((L[i].html || '').split('/').pop().toLowerCase() === file.toLowerCase()) return i; }
    return -1;
  }
  function meetingName() {
    var L = projects(), me = pageName();
    for (var i = 0; i < L.length; i++) { if ((L[i].html || '').split('/').pop().toLowerCase() === me) return L[i].name || me; }
    return me;
  }

  // what did the Builder ask for, and is it already standing?
  function judge(text) {
    var t = text.toLowerCase(), here = indexOfFile(pageName());
    for (var i = 0; i < TOPICS.length; i++) {
      var words = TOPICS[i][0];
      for (var w = 0; w < words.length; w++) {
        // short words must be the whole word (or a plural), longer ones may be the start of a word
        var wd = words[w], re = new RegExp(wd.length <= 4 ? '\\b' + wd + '(s|es)?\\b' : '\\b' + wd);
        if (re.test(t)) {
          var at = indexOfFile(TOPICS[i][1]);
          if (at !== -1 && here !== -1 && at < here) return { built: true, name: TOPICS[i][2] };
          return { built: false };
        }
      }
    }
    return { built: false };
  }

  function say(text, built) {
    var q = text.length > 140 ? text.slice(0, 137) + '...' : text;
    return built
      ? 'Builder, ' + built + ' already stands on Unity. The council believes we should look after what we have built before we ask for more. Thank you for thinking of Unity.'
      : 'The council has heard you, Builder: "' + q + '". We will carry your words to a future meeting and consider them with care.';
  }

  function save(text, built) {
    try {
      var k = 'worldBuilder.requests', a = JSON.parse(localStorage.getItem(k) || '[]');
      a.push({ meeting: meetingName(), text: text, already: !!built, when: new Date().toISOString() });
      localStorage.setItem(k, JSON.stringify(a.slice(-100)));
    } catch (e) { }
  }

  var css = '#wbReq{position:fixed;z-index:50;left:50%;bottom:90px;transform:translateX(-50%);width:min(560px,92vw);padding:18px 20px;background:rgba(6,14,24,.94);border:1px solid rgba(95,232,216,.6);border-radius:8px;color:#d8ecff;font-family:"Segoe UI",Arial,sans-serif;text-align:center;box-shadow:0 0 30px rgba(0,0,0,.6);user-select:text}' +
    '#wbReq h3{margin:0 0 6px;font-size:14px;letter-spacing:4px;color:#fff;font-weight:600}' +
    '#wbReq p{margin:6px 0 12px;font-size:14px;line-height:1.55;color:#bfd6ea;font-style:italic}' +
    '#wbReq textarea{width:100%;box-sizing:border-box;height:74px;padding:10px;font:15px "Segoe UI",Arial;background:#02050a;color:#fff;border:1px solid rgba(127,216,255,.45);border-radius:6px;resize:none;user-select:text}' +
    '#wbReq .row{display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:12px}' +
    '#wbReq button{font:600 12px "Segoe UI",Arial;letter-spacing:2px;padding:9px 16px;border:1px solid #5fe8d8;border-radius:4px;background:rgba(47,184,200,.25);color:#fff;cursor:pointer}' +
    '#wbReq button:hover{background:rgba(47,184,200,.5)}' +
    '#wbReq button.dim{border-color:rgba(127,216,255,.35);background:none;color:#9fbcd4}';

  window.WB_askBuilder = function () {
    if (document.getElementById('wbReq')) { window.WB_reqBusy = false; return; }
    var asked = 'worldBuilder.requestAsked.' + pageName();
    var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
    var box = document.createElement('div'); box.id = 'wbReq';
    box.innerHTML = '<h3>THE SPEAKER ASKS THE BUILDER</h3>' +
      '<p>Builder, is there anything you wish to add to Unity? Tell the council what you would like to see built.</p>' +
      '<textarea id="wbReqText" maxlength="300" placeholder="Type your request here..."></textarea>' +
      '<div class="row"><button id="wbReqSend">SEND TO THE COUNCIL</button><button id="wbReqSkip" class="dim">NOTHING TO ADD</button></div>';
    document.body.appendChild(box);
    ['keydown', 'keyup', 'keypress'].forEach(function (ev) { box.addEventListener(ev, function (e) { e.stopPropagation(); }); });
    function close() { try { localStorage.setItem(asked, '1'); } catch (e) { } box.remove(); window.WB_reqBusy = false; }
    document.getElementById('wbReqSkip').onclick = close;
    document.getElementById('wbReqSend').onclick = function () {
      var text = document.getElementById('wbReqText').value.trim();
      if (!text) { document.getElementById('wbReqText').focus(); return; }
      var j = judge(text);
      save(text, j.built);
      try { localStorage.setItem(asked, '1'); } catch (e) { }
      var auto = !!WEB3KEY && !j.built;
      var html = '<h3>THE COUNCIL ANSWERS</h3><p>' + say(text, j.built ? j.name : null).replace(/&/g, '&amp;').replace(/</g, '&lt;') + '</p><p id="wbReqStat"></p><div class="row">';
      if (!j.built && !auto) html += '<button id="wbReqGmail">SEND WITH GMAIL</button><button id="wbReqMail">OPEN MY EMAIL APP</button><button id="wbReqCopy">COPY REQUEST</button>';
      html += '<button id="wbReqDone" class="dim">' + (auto ? 'SENDING…' : 'CLOSE') + '</button></div>';
      box.innerHTML = html;
      var subj = 'World Builder request', body = 'Request from ' + meetingName() + ':\n\n' + text;
      var sent = function () {
        var d = document.getElementById('wbReqDone'); if (d) d.textContent = 'DONE — BACK TO THE MENU';
        setTimeout(function () { if (document.getElementById('wbReq')) { box.remove(); window.WB_reqBusy = false; } }, 20000);
      };
      if (auto) {
        var stat = document.getElementById('wbReqStat'), dn = document.getElementById('wbReqDone');
        dn.disabled = true;
        fetch('https://api.web3forms.com/submit', { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ access_key: WEB3KEY, subject: subj, from_name: 'World Builder', message: body }) })
          .then(function (r) { return r.json(); })
          .then(function (r) { if (!r.success) throw 0; stat.textContent = 'Your request has been sent to the Builder\'s desk.'; dn.remove(); setTimeout(function () { if (document.getElementById('wbReq')) { box.remove(); window.WB_reqBusy = false; } }, 3500); })
          .catch(function () { stat.textContent = 'Could not send it from here. Please email it to ' + MAIL + '.'; dn.disabled = false; dn.textContent = 'CLOSE'; });
      }
      var gm = document.getElementById('wbReqGmail');
      if (gm) gm.onclick = function () {
        window.open('https://mail.google.com/mail/?view=cm&to=' + encodeURIComponent(MAIL) + '&su=' + encodeURIComponent(subj) + '&body=' + encodeURIComponent(body), '_blank');
        sent();
      };
      var mail = document.getElementById('wbReqMail');
      if (mail) mail.onclick = function () { sent(); location.href = 'mailto:' + MAIL + '?subject=' + encodeURIComponent(subj) + '&body=' + encodeURIComponent(body); };
      var cp = document.getElementById('wbReqCopy');
      if (cp) cp.onclick = function () {
        var t = 'To: ' + MAIL + '\nSubject: ' + subj + '\n\n' + body;
        var ok = function () { cp.textContent = 'COPIED — PASTE IT INTO AN EMAIL TO ' + MAIL; };
        try { navigator.clipboard.writeText(t).then(ok, function () { cp.textContent = 'SEND TO ' + MAIL; }); } catch (e) { cp.textContent = 'SEND TO ' + MAIL; }
        sent();
      };
      document.getElementById('wbReqDone').onclick = function () { box.remove(); window.WB_reqBusy = false; };
    };
    setTimeout(function () { var t = document.getElementById('wbReqText'); if (t) t.focus(); }, 100);
  };
})();
