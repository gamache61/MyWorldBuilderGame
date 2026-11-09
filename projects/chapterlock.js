/* ============================================================
   WORLD BUILDER · CHAPTER LOCK
   Keep this file at projects/chapterlock.js.
   Every chapter file loads it right after projects.js.
   - A chapter the player hasn't bought sends them back to the front page.
   - Chapter 1 with nothing bought is the 1-minute demo.
   - When a chapter is finished it is marked COMPLETE on the front page.
   The chapter number comes from the order in projects.js.
   ============================================================ */
(function () {
  var L = window.SPACE_PROJECTS || [];
  var path = decodeURIComponent(location.pathname).replace(/\\/g, '/').toLowerCase();
  var idx = -1, html = '';
  for (var i = 0; i < L.length; i++) {
    var h = (L[i].html || '').toLowerCase();
    if (h && (path === h || path.slice(-(h.length + 1)) === '/' + h)) { idx = i; html = L[i].html; break; }
  }
  if (idx < 0) return;
  var chapter = idx + 1;
  var root = new Array(html.split('/').length).join('../');
  var menu = root + 'index.html';
  var KEY = 'worldBuilderSave';
  var BEGINNING = 5, DEMO_SECONDS = 60;

  function read() {
    var s = null;
    try { s = JSON.parse(localStorage.getItem(KEY) || 'null'); } catch (e) { }
    s = s || {};
    s.currentChapter = s.currentChapter || 1; s.ownedUpTo = s.ownedUpTo || 0; s.progress = s.progress || {};
    return s;
  }
  function write(s) { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) { } }

  var save = read();
  var owned = chapter <= save.ownedUpTo;
  var demo = !owned && chapter === 1 && save.ownedUpTo === 0;

  if (!owned && !demo) { location.replace(menu); return; }
  if (owned) { save.currentChapter = chapter; write(save); }

  function box(title, text, buttons) {
    var d = document.createElement('div');
    d.style.cssText = 'position:fixed;inset:0;z-index:2147483000;display:flex;align-items:center;justify-content:center;background:rgba(2,6,12,.82);font-family:Arial,sans-serif;';
    var c = '<div style="max-width:520px;margin:20px;padding:26px 24px;text-align:center;color:#d8ecff;background:linear-gradient(160deg,rgba(14,34,54,.97),rgba(6,14,24,.97));border:1px solid #40d0ff;border-radius:10px;">' +
      '<div style="font-size:20px;letter-spacing:3px;color:#fff;margin-bottom:10px">' + title + '</div>' +
      '<div style="font-size:14px;color:#8fb0c8;line-height:1.6;margin-bottom:18px">' + text + '</div><div>';
    for (var k = 0; k < buttons.length; k++) c += '<button data-k="' + k + '" style="margin:5px;padding:10px 18px;border-radius:6px;border:1px solid ' + (buttons[k][2] || '#40d0ff') + ';background:rgba(64,208,255,.18);color:#fff;cursor:pointer;font-size:14px;letter-spacing:1px">' + buttons[k][0] + '</button>';
    d.innerHTML = c + '</div></div>';
    d.addEventListener('click', function (e) { var k = e.target.getAttribute && e.target.getAttribute('data-k'); if (k !== null && k !== undefined) buttons[+k][1](d); });
    document.body.appendChild(d);
    return d;
  }
  function stopKeys(e) { e.stopImmediatePropagation(); }

  // ---- the 1-minute demo ----
  if (demo) {
    setTimeout(function () {
      ['keydown', 'keyup', 'keypress'].forEach(function (t) { window.addEventListener(t, stopKeys, true); document.addEventListener(t, stopKeys, true); });
      try { document.querySelectorAll('audio,video').forEach(function (m) { m.pause(); }); } catch (e) { }
      box('THE DEMO IS OVER', 'Thanks for trying World Builder! Buy The Beginning — Chapters 1 to 5 — for $4.89 to keep building.', [
        ['BUY THE BEGINNING — $4.89', function () { window.open('https://gamache61.github.io/MyGamacheAppsWebsite/', '_blank'); }, '#ffb040'],
        ['MAIN MENU', function () { location.href = menu; }]
      ]);
    }, DEMO_SECONDS * 1000);
  }

  // ---- chapter finished ----
  var shown = false;
  window.WB_chapterDone = function () {
    if (demo || shown) return;
    shown = true;
    var s = read();
    s.progress[String(chapter)] = 'complete';
    if (s.currentChapter <= chapter) s.currentChapter = Math.min(chapter + 1, L.length);
    write(s);
    var next = L[chapter], btns = [];
    if (next && chapter + 1 <= s.ownedUpTo) btns.push(['NEXT CHAPTER ▶', function () { location.href = root + next.html; }, '#3ddc84']);
    else if (next) btns.push([s.ownedUpTo < BEGINNING ? 'BUY THE BEGINNING — $4.89' : 'BUY NEXT CHAPTER — $1.99', function () { location.href = menu; }, '#ffb040']);
    btns.push(['MAIN MENU', function () { location.href = menu; }]);
    btns.push(['STAY HERE', function (d) { d.remove(); }]);
    setTimeout(function () {
      box('CHAPTER ' + chapter + ' COMPLETE', (L[idx].name || '') + (next ? '<br><br>Next: Chapter ' + (chapter + 1) + ' · ' + next.name : '<br><br>You have reached the end — for now.'), btns);
    }, 4000);
  };
})();
