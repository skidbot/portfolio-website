// Add a subtle navbar state change after scrolling.
const navbar = document.querySelector(".navbar");

if (navbar) {
  const syncNavbarState = () => {
    navbar.classList.toggle("scrolled", window.scrollY > 24);
  };

  syncNavbarState();
  window.addEventListener("scroll", syncNavbarState);
}

// Only wire up the lightbox on pages that include the required elements.
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxClose = document.getElementById("lightbox-close");

if (lightbox && lightboxImg && lightboxClose) {
  document.querySelectorAll(".lightbox-img").forEach((img) => {
    img.addEventListener("click", () => {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add("active");
    });
  });

  lightboxClose.addEventListener("click", () => {
    lightbox.classList.remove("active");
  });

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      lightbox.classList.remove("active");
    }
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      lightbox.classList.remove("active");
    }
  });
}
