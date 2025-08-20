// Animations pour le site BTECE

document.addEventListener("DOMContentLoaded", function () {
  // Animation d'entrée des éléments
  animateOnScroll();

  // Animation du texte hero
  animateHeroText();

  // Animation des cartes de services
  setupServiceCardAnimations();

  // Animation du survol des boutons
  setupButtonHoverEffects();

  // Animation du pied de page
  animateFooter();
});

/**
 * Animation au défilement de la page
 */
function animateOnScroll() {
  const animatedElements = document.querySelectorAll(".animate-on-scroll");

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animated");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animatedElements.forEach((element) => {
    observer.observe(element);
  });
}

/**
 * Animation du texte dans la section hero
 */
function animateHeroText() {
  const heroContent = document.querySelector(".hero-content");
  if (!heroContent) return;

  // Délai pour que l'image de fond soit chargée
  setTimeout(() => {
    heroContent.style.opacity = "0";
    heroContent.style.transform = "translateY(20px)";
    heroContent.style.transition = "none";

    // Force le recalcul des styles pour déclencher l'animation
    void heroContent.offsetWidth;

    heroContent.style.transition =
      "opacity 0.8s ease-out, transform 0.8s ease-out";
    heroContent.style.opacity = "1";
    heroContent.style.transform = "translateY(0)";
  }, 300);
}

/**
 * Animations pour les cartes de services
 */
function setupServiceCardAnimations() {
  const serviceCards = document.querySelectorAll(".service-card");
  if (!serviceCards.length) return;

  serviceCards.forEach((card, index) => {
    // Délai progressif pour un effet de cascade
    card.style.transitionDelay = `${index * 0.1}s`;
    card.classList.add("animate-on-scroll");
  });
}

/**
 * Effets de survol pour les boutons
 */
function setupButtonHoverEffects() {
  const buttons = document.querySelectorAll(".cta-button, .learn-more");

  buttons.forEach((button) => {
    button.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.05)";
    });

    button.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1)";
    });
  });
}

/**
 * Animation du pied de page
 */
function animateFooter() {
  const footer = document.querySelector("footer");
  if (!footer) return;

  const observerOptions = {
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateFooterElements();
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  observer.observe(footer);
}

function animateFooterElements() {
  const footerSections = document.querySelectorAll(".footer-section");

  footerSections.forEach((section, index) => {
    section.style.opacity = "0";
    section.style.transform = "translateY(20px)";
    section.style.transition = "none";

    setTimeout(() => {
      section.style.transition = `opacity 0.5s ease-out ${index * 0.2}s, transform 0.5s ease-out ${index * 0.2}s`;
      section.style.opacity = "1";
      section.style.transform = "translateY(0)";
    }, 100);
  });
}

/**
 * Animation des icônes de réseaux sociaux
 */
function animateSocialIcons() {
  const socialIcons = document.querySelectorAll(".social-icons a");

  socialIcons.forEach((icon) => {
    icon.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px)";
      this.style.transition = "transform 0.3s ease";
    });

    icon.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });
}

// Initialisation des animations des icônes sociaux
animateSocialIcons();

// Ajout d'une animation pour le logo
const logo = document.querySelector(".logo a");
if (logo) {
  logo.addEventListener("mouseenter", function () {
    this.style.transform = "rotate(-5deg)";
    this.style.transition = "transform 0.3s ease";
  });

  logo.addEventListener("mouseleave", function () {
    this.style.transform = "rotate(0)";
  });
}

/**
 * Animation de la barre de navigation au scroll
 */
let lastScrollPosition = 0;
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", function () {
  const currentScrollPosition = window.pageYOffset;

  if (currentScrollPosition > lastScrollPosition) {
    // Défilement vers le bas
    navbar.style.transform = "translateY(-100%)";
  } else {
    // Défilement vers le haut
    navbar.style.transform = "translateY(0)";
  }

  lastScrollPosition = currentScrollPosition;
});

// Ajout d'une classe quand on scroll pour changer le style
window.addEventListener("scroll", function () {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});
