// Picks the page language (?lang= → saved choice → browser languages) and
// wires the header toggle. Loaded in <head> so the right language shows on first paint.
(function () {
  var KEY = 'aljid-lang';

  function valid(l) { return l === 'ar' || l === 'en'; }

  function pick() {
    var l = null;
    try { l = new URLSearchParams(location.search).get('lang'); } catch (e) {}
    if (!valid(l)) { try { l = localStorage.getItem(KEY); } catch (e) {} }
    if (!valid(l)) {
      var langs = (navigator.languages && navigator.languages.length)
        ? navigator.languages : [navigator.language || 'ar'];
      l = 'en';
      for (var i = 0; i < langs.length; i++) {
        if (/^ar\b/i.test(langs[i])) { l = 'ar'; break; }
      }
    }
    return l;
  }

  function apply(l) {
    var html = document.documentElement;
    html.lang = l;
    html.dir = l === 'ar' ? 'rtl' : 'ltr';
    var title = html.getAttribute('data-title-' + l);
    if (title) document.title = title;
  }

  apply(pick());

  document.addEventListener('click', function (e) {
    var btn = e.target.closest && e.target.closest('[data-lang-toggle]');
    if (!btn) return;
    var next = document.documentElement.lang === 'ar' ? 'en' : 'ar';
    apply(next);
    try { localStorage.setItem(KEY, next); } catch (err) {}
  });
})();
