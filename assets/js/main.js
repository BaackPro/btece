// ========================================
// BTECE - Script Principal
// ========================================

console.log('🌐 Site BTECE chargé avec succès');

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ DOM complètement chargé');
    initSite();
});

function initSite() {
    // Menu navigation responsive
    initNavigation();
    
    // Animations de défilement
    initScrollAnimations();
    
    // Interactions des formulaires
    initForms();
    
    // Gestion des onglets et accordéons
    initUIComponents();
}

// Navigation responsive
function initNavigation() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
            console.log('🍔 Menu mobile toggled');
        });
    }
    
    // Fermer le menu en cliquant à l'extérieur
    document.addEventListener('click', function(e) {
        if (navMenu && navMenu.classList.contains('active') && 
            !e.target.closest('.nav-menu') && 
            !e.target.closest('.menu-toggle')) {
            navMenu.classList.remove('active');
            if (menuToggle) menuToggle.classList.remove('active');
        }
    });
}

// Animations au scroll
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in, .animate-on-scroll');
    
    if (animatedElements.length > 0) {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    console.log('🎬 Animation déclenchée pour:', entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        animatedElements.forEach(function(el) {
            observer.observe(el);
        });
    }
}

// Gestion des formulaires
function initForms() {
    const forms = document.querySelectorAll('form[data-ajax]');
    
    forms.forEach(function(form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('📧 Formulaire soumis:', form.id || form.className);
            
            // Simulation d'envoi réussi
            showNotification('Message envoyé avec succès !', 'success');
            form.reset();
        });
    });
}

// Composants UI
function initUIComponents() {
    // Accordéons
    const accordions = document.querySelectorAll('.accordion-header');
    accordions.forEach(function(header) {
        header.addEventListener('click', function() {
            this.classList.toggle('active');
            const content = this.nextElementSibling;
            content.style.display = content.style.display === 'block' ? 'none' : 'block';
        });
    });
    
    // Onglets
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            switchTab(tabId);
        });
    });
}

// Utilitaires
function switchTab(tabId) {
    console.log('🔁 Changement d\'onglet:', tabId);
    // Implémentez la logique des onglets ici
}

function showNotification(message, type = 'info') {
    console.log('💬 Notification:', message);
    // Implémentez les notifications toast ici
}

// Helper: Debounce pour les events resize/scroll
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimisation des performances
const optimizedResize = debounce(function() {
    console.log('🔄 Redimensionnement optimisé');
}, 250);

window.addEventListener('resize', optimizedResize);

// Export pour utilisation globale (si nécessaire)
window.BTECEManager = {
    init: initSite,
    showNotification: showNotification,
    switchTab: switchTab
};
