// Navigation mobile
const burger = document.querySelector(".burger");
const navLinks = document.querySelector(".nav-links");

burger.addEventListener("click", () => {
  navLinks.classList.toggle("nav-active");

  // Animation du burger
  burger.classList.toggle("toggle");
});

// Animation au défilement
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.2)";
  } else {
    navbar.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
  }
});

// Chargement des autres pages
document.querySelectorAll("a").forEach((link) => {
  if (link.href.includes(".html") && !link.href.includes("#")) {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = link.href;
    });
  }
});
