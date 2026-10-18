// Runs in <head> before the page paints, so a saved theme choice never flashes.
(function () {
  var saved = null;
  try {
    saved = localStorage.getItem("theme");
  } catch (error) {
    // Storage is blocked (some privacy settings); see the fallback below.
  }
  if (!saved) {
    // When storage can't be written, the choice is kept in this tab's name,
    // which survives moving between pages in the same tab.
    var match = /(?:^|;)sp-theme=(light|dark)(?:;|$)/.exec(window.name || "");
    if (match) saved = match[1];
  }
  if (saved === "light" || saved === "dark") {
    document.documentElement.setAttribute("data-mode", saved);
  }
})();
