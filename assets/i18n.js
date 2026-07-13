(function () {
  var KEY = "jayzil-lang";
  var DEFAULT_LANG = "pt"; // .com.br — Portuguese first
  var lang = localStorage.getItem(KEY) || DEFAULT_LANG;

  function apply(l) {
    lang = l;
    var el = document.documentElement;
    el.setAttribute("data-lang", lang);
    el.setAttribute("lang", lang === "pt" ? "pt-BR" : "en");
    var title = el.getAttribute(lang === "pt" ? "data-title-pt" : "data-title-en");
    if (title) document.title = title;
  }

  // Set immediately (before body paints) to avoid a flash of the wrong language.
  apply(lang);

  document.addEventListener("DOMContentLoaded", function () {
    var buttons = document.querySelectorAll(".lang-switch button[data-set-lang]");
    function refreshButtons() {
      buttons.forEach(function (b) {
        b.classList.toggle("active", b.getAttribute("data-set-lang") === lang);
      });
    }
    refreshButtons();
    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var next = btn.getAttribute("data-set-lang");
        if (next === lang) return;
        apply(next);
        localStorage.setItem(KEY, next);
        refreshButtons();
      });
    });
  });
})();
