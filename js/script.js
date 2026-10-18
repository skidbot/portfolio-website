// Header border on scroll, theme button, screenshot viewer, footer year.

(function () {
  var root = document.documentElement;

  // ----- Header: show a hairline once the page is scrolled -----
  var header = document.querySelector(".site-header");
  if (header) {
    var syncHeader = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    syncHeader();
    window.addEventListener("scroll", syncHeader, { passive: true });
  }

  // ----- Theme button -----
  var toggle = document.querySelector(".theme-toggle");
  var prefersDark = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;

  function currentTheme() {
    var chosen = root.getAttribute("data-mode");
    if (chosen === "light" || chosen === "dark") return chosen;
    return prefersDark && prefersDark.matches ? "dark" : "light";
  }

  function labelToggle() {
    if (!toggle) return;
    var next = currentTheme() === "dark" ? "light" : "dark";
    toggle.setAttribute("aria-label", "Switch to " + next + " theme");
    toggle.setAttribute("title", "Switch to " + next + " theme");
  }

  if (toggle) {
    labelToggle();
    toggle.addEventListener("click", function () {
      var next = currentTheme() === "dark" ? "light" : "dark";
      root.setAttribute("data-mode", next);
      try {
        localStorage.setItem("theme", next);
      } catch (error) {
        // Storage is blocked: remember the choice for this tab instead (see theme.js).
        try {
          var others = (window.name || "").split(";").filter(function (part) {
            return part && part.indexOf("sp-theme=") !== 0;
          });
          others.push("sp-theme=" + next);
          window.name = others.join(";");
        } catch (ignored) {
          // The choice still applies until the page is closed.
        }
      }
      labelToggle();
    });
    if (prefersDark && prefersDark.addEventListener) {
      prefersDark.addEventListener("change", labelToggle);
    }
  }

  // ----- Screenshot viewer -----
  // Each screenshot is a link to the full image, so it still works without JS.
  var viewer = document.getElementById("lightbox");
  if (viewer && typeof viewer.showModal === "function") {
    var figure = viewer.querySelector(".lightbox__figure");
    var viewerCaption = viewer.querySelector(".lightbox__caption");
    var viewerImg = document.createElement("img");
    viewerImg.className = "lightbox__img";
    viewerImg.decoding = "async";
    figure.insertBefore(viewerImg, viewerCaption);
    var closeButton = viewer.querySelector(".lightbox__close");
    var opener = null;

    document.querySelectorAll("a.shot, a.game__media").forEach(function (link) {
      link.addEventListener("click", function (event) {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
        event.preventDefault();
        var thumb = link.querySelector("img");
        opener = link;
        viewerImg.src = link.getAttribute("href");
        viewerImg.alt = thumb ? thumb.alt : "";
        viewerCaption.textContent = link.getAttribute("data-caption") || (thumb ? thumb.alt : "");
        viewer.showModal();
        closeButton.focus();
      });
    });

    closeButton.addEventListener("click", function () {
      viewer.close();
    });

    // Clicking the dimmed area around the image closes the viewer.
    viewer.addEventListener("click", function (event) {
      if (event.target === viewer) viewer.close();
    });

    viewer.addEventListener("close", function () {
      viewerImg.removeAttribute("src");
      if (opener) opener.focus();
    });
  }

  // ----- Footer year -----
  var year = document.querySelector("[data-year]");
  if (year) year.textContent = String(new Date().getFullYear());
})();
