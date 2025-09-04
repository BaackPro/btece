
// Prix des formations en FCFA (augmentés de 10 000 FCFA pour les formations 1, 2 et 4)
const formationPrices = {
    'plans_archi_elec': 130000,  // Augmenté de 10 000 FCFA
    'conception_elec': 150000,   // Augmenté de 10 000 FCFA
    'realisation_3d': 120000,    // Inchangé
    'programmation': 200000      // Augmenté de 10 000 FCFA
};

// Taux de conversion FCFA vers EUR
const exchangeRate = 655.957;

// Temps estimé par étape (en secondes)
const stepTimes = [60, 30, 30, 30, 30]; // Total: 3 minutes (180 secondes)

// Indicatifs téléphoniques et formats par pays 
const phoneConfigurations = {
    // Afrique
    'DZ': { code: '+213', pattern: '[0-9]{9}', format: '+213 XX XXX XXXX' }, // Algérie
    // ... (conserver tous les autres pays)
    'other': { code: '+', pattern: '[0-9]{8,15}', format: '+XXX XXX XXXX' }
};

// Noms des formations pour l'affichage
const formationNames = {
    'plans_archi_elec': 'Plans architecturaux et électricité',
    'conception_elec': 'Conception électronique',
    'realisation_3d': 'Réalisation 3D',
    'programmation': 'Programmation'
};

// Noms des méthodes de paiement
const paymentMethodNames = {
    'VISA': 'Paiement par carte VISA',
    'MTN Mobile Money': 'Paiement par MTN Mobile Money',
    'Moov Africa Mobile Money': 'Paiement par Moov Africa Mobile Money',
    'Celtiis Mobile Money': 'Paiement par Celtiis Mobile Money',
    'Orange Money': 'Paiement par Orange Money',
    'Airtel Money': 'Paiement par Airtel Money',
    'Wari': 'Paiement par Wari',
    'Bitcoin': 'Paiement par Crypto Currency',
    'Paiement sur place': 'Paiement sur place (espèces/chèque)'
};

// Éléments du DOM
const checkboxes = document.querySelectorAll('input[name="formations[]"]');
const priceDisplay = document.getElementById('price-display');
const totalPriceFCFA = document.getElementById('total-price-fcfa');
const totalPriceEUR = document.getElementById('total-price-eur');
const submitBtn = document.getElementById('submit-btn');
const loadingIndicator = document.getElementById('loading');
const registrationForm = document.getElementById('registration-form');
const paysSelect = document.getElementById('pays');
const phonePrefix = document.getElementById('phone-prefix');
const phoneFormat = document.getElementById('phone-format');
const telephoneInput = document.getElementById('telephone');
const mainPage = document.getElementById('main-page');
const confirmationPage = document.getElementById('confirmation-page');
const modal = document.getElementById('confirmation-modal');
const modalFormationsList = document.getElementById('modal-formations-list');
const modalUserInfo = document.getElementById('modal-user-info');
const modalSessionInfo = document.getElementById('modal-session-info');
const modalModeInfo = document.getElementById('modal-mode-info');
const modalPaymentInfo = document.getElementById('modal-payment-info');
const modalTotalPrice = document.getElementById('modal-total-price');
const modalTotalPriceEur = document.getElementById('modal-total-price-eur');
const modalNomComplet = document.getElementById('modal-nom-complet');
const modalEmail = document.getElementById('modal-email');
const modalDateNaissance = document.getElementById('modal-date-naissance');
const modalLieuNaissance = document.getElementById('modal-lieu-naissance');
const modalTelephone = document.getElementById('modal-telephone');
const modalPays = document.getElementById('modal-pays');
const modalProfession = document.getElementById('modal-profession');
const modalObjectifs = document.getElementById('modal-objectifs');
const closeModal = document.querySelector('.close-modal');
const modalCancel = document.querySelector('.modal-cancel');
const modalConfirm = document.querySelector('.modal-confirm');
const chatToggle = document.getElementById('chat-toggle');
const chatContainer = document.getElementById('chat-container');
const closeChat = document.getElementById('close-chat');
const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');
const sendMessage = document.getElementById('send-message');
const modeFormationSelect = document.getElementById('mode-formation');
const onlinePaymentMethods = document.getElementById('online-payment-methods');
const presentielPaymentMethod = document.getElementById('presentiel-payment-method');
const paymentMethodGroup = document.getElementById('payment-method-group');
const formSteps = document.querySelectorAll('.form-step');
const progressSteps = document.querySelectorAll('.step');
const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');
const timeEstimation = document.getElementById('time-estimation');
const saveStatus = document.getElementById('save-status');
const userSummary = document.getElementById('user-summary');
const rappelMessages = document.querySelectorAll('.rappel-message');
const rappelContainer = document.querySelector('.rappel-container');
const objectifsTextarea = document.getElementById('objectifs');
const objectifsCounter = document.getElementById('objectifs-counter');
const dateNaissanceInput = document.getElementById('date_naissance');
const lieuNaissanceInput = document.getElementById('lieu_naissance');
const ageError = document.getElementById('age-error');

// Variables pour la sauvegarde automatique
let saveTimeout;
let formData = {};
let currentStep = 1;
let currentRappelIndex = 0;

// Fonction améliorée de détection des appareils mobiles
function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || 
           (navigator.userAgent.indexOf('IEMobile') !== -1) ||
           (navigator.maxTouchPoints && navigator.maxTouchPoints > 1) ||
           (window.screen.width <= 768 && window.screen.height <= 1024) ||
           /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Fonction pour compter les mots dans le champ Objectifs
function countWords(text) {
    const trimmedText = text.trim();
    if (trimmedText === '') return 0;
    return trimmedText.split(/\s+/).length;
}

// Fonction pour mettre à jour le compteur de mots
function updateWordCounter() {
    const wordCount = countWords(objectifsTextarea.value);
    objectifsCounter.textContent = `${wordCount}/100 mots`;
    
    // Changer la couleur si le nombre de mots dépasse la limite
    if (wordCount > 100) {
        objectifsCounter.style.color = '#e74c3c';
        objectifsTextarea.style.borderColor = '#e74c3c';
    } else {
        objectifsCounter.style.color = '#666';
        objectifsTextarea.style.borderColor = '#ddd';
    }
}

// Fonction pour faire défiler les messages du rappel
function rotateRappelMessages() {
    // Masquer tous les messages
    rappelMessages.forEach(msg => msg.classList.remove('active'));
    
    // Afficher le message courant
    rappelMessages[currentRappelIndex].classList.add('active');
    
    // Passer au message suivant
    currentRappelIndex = (currentRappelIndex + 1) % rappelMessages.length;
}

// Fonction pour calculer l'âge à partir de la date de naissance
function calculateAge(birthDate) {
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
        age--;
    }
    
    return age;
}

// Fonction pour valider l'âge
function validateAge() {
    const birthDate = dateNaissanceInput.value;
    if (!birthDate) return true;
    
    const age = calculateAge(birthDate);
    if (age < 13) {
        ageError.style.display = 'block';
        dateNaissanceInput.style.borderColor = '#e74c3c';
        return false;
    } else {
        ageError.style.display = 'none';
        dateNaissanceInput.style.borderColor = '#ddd';
        return true;
    }
}

// Initialiser le calendrier avec toutes les sessions
document.addEventListener('DOMContentLoaded', function() {
    const calendarEl = document.getElementById('calendar');
    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        initialDate: '2025-07-01', // Commencer en juillet 2025
        locale: 'fr',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        views: {
            dayGridMonth: {
                titleFormat: { year: 'numeric', month: 'long' }
            }
        },
        events: [
            // Session Juillet - Matin (Lundi, Mercredi, Vendredi)
            {
                title: 'Session Matin (8h-12h)',
                start: '2025-07-07T08:00:00',
                end: '2025-07-07T12:00:00',
                color: '#8bc34a', // Vert clair
                daysOfWeek: [1,3,5], // Lundi, Mercredi, Vendredi
                startRecur: '2025-07-07',
                endRecur: '2025-08-01'
            },
            // Session Juillet - Soir (Mardi, Jeudi)
            {
                title: 'Session Soir (16h-20h)',
                start: '2025-07-08T16:00:00',
                end: '2025-07-08T20:00:00',
                color: '#ff9800', // Orange
                daysOfWeek: [2,4], // Mardi, Jeudi
                startRecur: '2025-07-08',
                endRecur: '2025-08-01'
            },
            // Session Août - Week-end (Samedi, Dimanche)
            {
                title: 'Session Week-end (9h-17h)',
                start: '2025-08-02T09:00:00',
                end: '2025-08-02T17:00:00',
                color: '#2196f3', // Bleu
                daysOfWeek: [6,0], // Samedi, Dimanche
                startRecur: '2025-08-02',
                endRecur: '2025-08-31'
            },
            // Session Septembre - Soir (Lundi, Mercredi, Vendredi)
            {
                title: 'Session Soir (18h-22h)',
                start: '2025-09-01T18:00:00',
                end: '2025-09-01T22:00:00',
                color: '#9c27b0', // Violet
                daysOfWeek: [1,3,5], // Lundi, Mercredi, Vendredi
                startRecur: '2025-09-01',
                endRecur: '2025-09-26'
            },
            // Session Octobre - Matin (Mardi, Jeudi)
            {
                title: 'Session Matin (9h-13h)',
                start: '2025-10-07T09:00:00',
                end: '2025-10-07T13:00:00',
                color: '#00bcd4', // Cyan
                daysOfWeek: [2,4], // Mardi, Jeudi
                startRecur: '2025-10-07',
                endRecur: '2025-10-31'
            },
            // Session Novembre - Soir (Lundi, Mercredi, Vendredi)
            {
                title: 'Session Soir (17h-21h)',
                start: '2025-11-03T17:00:00',
                end: '2025-11-03T21:00:00',
                color: '#f44336', // Rouge
                daysOfWeek: [1,3,5], // Lundi, Mercredi, Vendredi
                startRecur: '2025-11-03',
                endRecur: '2025-11-28'
            },
            // Session Décembre - Intensif (Lundi à Vendredi)
            {
                title: 'Session Intensif (9h-17h)',
                start: '2025-12-01T09:00:00',
                end: '2025-12-01T17:00:00',
                color: '#607d8b', // Bleu-gris
                daysOfWeek: [1,2,3,4,5], // Lundi à Vendredi
                startRecur: '2025-12-01',
                endRecur: '2025-12-19'
            }
        ],
        eventTimeFormat: { 
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        },
        height: 'auto',
        contentHeight: 'auto',
        dayMaxEvents: true,
        eventDisplay: 'block',
        eventDidMount: function(info) {
            // Ajouter un effet au survol des événements
            info.el.addEventListener('mouseenter', function() {
                info.el.style.opacity = '0.8';
                info.el.style.transform = 'scale(1.02)';
                info.el.style.zIndex = '100';
            });
            info.el.addEventListener('mouseleave', function() {
                info.el.style.opacity = '1';
                info.el.style.transform = 'scale(1)';
                info.el.style.zIndex = '';
            });
        }
    });
    calendar.render();
    
    // Charger les données sauvegardées si elles existent
    loadSavedData();
    
    // Mettre à jour la barre de progression
    updateProgressBar();
    
    // Mettre à jour l'estimation du temps restant
    updateTimeEstimation();
    
    // Démarrer la rotation des messages du rappel
    setInterval(rotateRappelMessages, 2000);
    
    // Initialiser le compteur de mots
    objectifsTextarea.addEventListener('input', updateWordCounter);
    updateWordCounter();
    
    // Valider l'âge lors du changement de date de naissance
    dateNaissanceInput.addEventListener('change', validateAge);
});

// Sauvegarder automatiquement les données du formulaire
function autoSave() {
    // Afficher l'indicateur de sauvegarde
    saveStatus.textContent = "Sauvegarde en cours...";
    saveStatus.className = "save-status saving";
    saveStatus.style.display = "block";
    
    // Collecter toutes les données du formulaire
    formData = {
        step: currentStep,
        nom: document.getElementById('nom').value,
        prenom: document.getElementById('prenom').value,
        email: document.getElementById('email').value,
        date_naissance: document.getElementById('date_naissance').value,
        lieu_naissance: document.getElementById('lieu_naissance').value,
        pays: document.getElementById('pays').value,
        telephone: document.getElementById('telephone').value,
        profession: document.querySelector('input[name="profession"]:checked')?.value,
        objectifs: document.getElementById('objectifs').value,
        formations: Array.from(document.querySelectorAll('input[name="formations[]"]:checked')).map(cb => cb.value),
        session: document.querySelector('input[name="session"]:checked')?.value,
        modeFormation: document.getElementById('mode-formation').value,
        paymentMethod: document.querySelector('input[name="payment_method"]:checked')?.value,
        consentement: document.getElementById('consentement').checked
    };
    
    // Sauvegarder dans localStorage
    localStorage.setItem('bteceFormData', JSON.stringify(formData));
    
    // Simuler un délai de sauvegarde
    setTimeout(() => {
        saveStatus.textContent = "Données sauvegardées";
        saveStatus.className = "save-status saved";
        
        // Masquer après 3 secondes
        setTimeout(() => {
            saveStatus.style.display = "none";
        }, 3000);
    }, 1000);
}

// Charger les données sauvegardées
function loadSavedData() {
    const savedData = localStorage.getItem('bteceFormData');
    if (savedData) {
        formData = JSON.parse(savedData);
        
        // Remplir les champs avec les données sauvegardées
        if (formData.nom) document.getElementById('nom').value = formData.nom;
        if (formData.prenom) document.getElementById('prenom').value = formData.prenom;
        if (formData.email) document.getElementById('email').value = formData.email;
        if (formData.date_naissance) document.getElementById('date_naissance').value = formData.date_naissance;
        if (formData.lieu_naissance) document.getElementById('lieu_naissance').value = formData.lieu_naissance;
        if (formData.pays) {
            document.getElementById('pays').value = formData.pays;
            paysSelect.dispatchEvent(new Event('change'));
        }
        if (formData.telephone) document.getElementById('telephone').value = formData.telephone;
        if (formData.profession) document.querySelector(`input[name="profession"][value="${formData.profession}"]`).checked = true;
        if (formData.objectifs) document.getElementById('objectifs').value = formData.objectifs;
        
        // Formations
        if (formData.formations && formData.formations.length > 0) {
            formData.formations.forEach(formation => {
                document.querySelector(`input[name="formations[]"][value="${formation}"]`).checked = true;
            });
            calculateTotal();
        }
        
        // Session
        if (formData.session) {
            document.querySelector(`input[name="session"][value="${formData.session}"]`).checked = true;
        }
        
        // Mode de formation
        if (formData.modeFormation) {
            document.getElementById('mode-formation').value = formData.modeFormation;
            modeFormationSelect.dispatchEvent(new Event('change'));
        }
        
        // Méthode de paiement
        if (formData.paymentMethod) {
            document.querySelector(`input[name="payment_method"][value="${formData.paymentMethod}"]`).checked = true;
        }
        
        // Consentement
        if (formData.consentement) {
            document.getElementById('consentement').checked = true;
        }
        
        // Aller à l'étape sauvegardée
        if (formData.step) {
            showStep(formData.step);
        }
    }
}

// Mettre à jour la barre de progression
function updateProgressBar() {
    const progress = ((currentStep - 1) / 5) * 100;
    progressBar.style.width = `${progress}%`;
    progressText.textContent = `${progress.toFixed(0)}% complété`;
    
    // Afficher la barre de progression après chaque validation d'étape
    if (currentStep > 1) {
        document.querySelector('.progress-container').style.display = 'block';
    }
}

// Mettre à jour l'estimation du temps restant
function updateTimeEstimation() {
    let remainingTime = 0;
    for (let i = currentStep - 1; i < stepTimes.length; i++) {
        remainingTime += stepTimes[i];
    }
    
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    
    if (minutes > 0) {
        timeEstimation.textContent = `Temps estimé : ${minutes} minute${minutes > 1 ? 's' : ''}${seconds > 0 ? ` et ${seconds} seconde${seconds > 1 ? 's' : ''}` : ''}`;
    } else {
        timeEstimation.textContent = `Temps estimé : ${seconds} seconde${seconds > 1 ? 's' : ''}`;
    }
}

// Gérer l'affichage des méthodes de paiement en fonction du mode de formation
modeFormationSelect.addEventListener('change', function() {
    if(this.value === 'en-ligne') {
        onlinePaymentMethods.style.display = 'block';
        presentielPaymentMethod.style.display = 'none';
    } else if(this.value === 'presentiel') {
        onlinePaymentMethods.style.display = 'none';
        presentielPaymentMethod.style.display = 'block';
    } else {
        onlinePaymentMethods.style.display = 'none';
        presentielPaymentMethod.style.display = 'none';
    }
    
    // Sauvegarder les modifications
    autoSave();
});

// Mettre à jour l'indicatif téléphonique en fonction du pays sélectionné
paysSelect.addEventListener('change', function() {
    const selectedCountry = this.value;
    const config = phoneConfigurations[selectedCountry] || phoneConfigurations['other'];
    
    phonePrefix.textContent = config.code;
    telephoneInput.pattern = config.pattern;
    telephoneInput.title = `Numéro valide (format: ${config.format})`;
    phoneFormat.textContent = `Format: ${config.format}`;
    phoneFormat.style.display = 'block';
    
    // Réinitialiser le champ téléphone
    telephoneInput.value = '';
    
    // Sauvegarder les modifications
    autoSave();
});

// Fonction pour calculer le total
function calculateTotal() {
    let totalFCfa = 0;
    let selectedFormations = [];
    
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            totalFCfa += formationPrices[checkbox.value];
            selectedFormations.push(checkbox.value);
        }
    });
    
    if (selectedFormations.length > 0) {
        const totalEur = (totalFCfa / exchangeRate).toFixed(2);
        
        totalPriceFCFA.textContent = totalFCfa.toLocaleString('fr-FR');
        totalPriceEUR.textContent = totalEur;
        priceDisplay.style.display = 'block';
        
        if (selectedFormations.length === 1) {
            submitBtn.textContent = `S'inscrire maintenant (${totalFCfa.toLocaleString('fr-FR')} FCFA / ${totalEur} €)`;
        } else {
            submitBtn.textContent = `S'inscrire maintenant (${selectedFormations.length} formations - ${totalFCfa.toLocaleString('fr-FR')} FCFA / ${totalEur} €)`;
        }
    } else {
        priceDisplay.style.display = 'none';
        submitBtn.textContent = `S'inscrire maintenant`;
    }
    
    // Sauvegarder les modifications
    autoSave();
}

// Écouteurs d'événements pour les cases à cocher
checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', calculateTotal);
});

// Écouteurs d'événements pour les champs de formulaire
document.querySelectorAll('input, select, textarea').forEach(element => {
    element.addEventListener('change', function() {
        // Démarrer la sauvegarde après un délai (pour éviter des sauvegardes trop fréquentes)
        clearTimeout(saveTimeout);
        saveTimeout = setTimeout(autoSave, 1000);
    });
    
    element.addEventListener('input', function() {
        // Démarrer la sauvegarde après un délai (pour éviter des sauvegardes trop fréquentes)
        clearTimeout(saveTimeout);
        saveTimeout = setTimeout(autoSave, 1000);
    });
});

// Fonction pour valider le numéro de téléphone
function validatePhone(phone, country) {
    const config = phoneConfigurations[country] || phoneConfigurations['other'];
    const regex = new RegExp(`^${config.pattern}$`);
    return regex.test(phone);
}

// Fonction pour nettoyer les entrées
function sanitizeInput(input) {
    return input.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// Gestion des étapes du formulaire
function showStep(step) {
    formSteps.forEach((formStep, index) => {
        formStep.classList.toggle('active', index + 1 === step);
    });

    progressSteps.forEach((progressStep, index) => {
        if (index + 1 < step) {
            progressStep.classList.add('completed');
            progressStep.classList.remove('active');
        } else if (index + 1 === step) {
            progressStep.classList.add('active');
            progressStep.classList.remove('completed');
        } else {
            progressStep.classList.remove('active', 'completed');
        }
    });

    currentStep = step;
    
    // Mettre à jour la barre de progression et l'estimation du temps
    updateProgressBar();
    updateTimeEstimation();
    
    // Sauvegarder l'étape actuelle
    autoSave();
}

function nextStep(current) {
    // Validation avant de passer à l'étape suivante
    let isValid = true;
    
    if(current === 1) {
        // Valider les informations personnelles
        const nom = document.getElementById('nom').value;
        const prenom = document.getElementById('prenom').value;
        const email = document.getElementById('email').value;
        const dateNaissance = document.getElementById('date_naissance').value;
        const lieuNaissance = document.getElementById('lieu_naissance').value;
        const pays = document.getElementById('pays').value;
        const telephone = document.getElementById('telephone').value;
        const profession = document.querySelector('input[name="profession"]:checked');
        const objectifs = document.getElementById('objectifs').value;
        
        if(!nom || !prenom || !email || !dateNaissance || !lieuNaissance || !pays || !telephone || !profession || !objectifs) {
            alert('Veuillez remplir tous les champs obligatoires');
            isValid = false;
        }
        
        if(email && (!email.includes('@') || !email.includes('.'))) {
            alert('Veuillez entrer une adresse email valide');
            isValid = false;
        }
        
        if(pays && telephone && !validatePhone(telephone, pays)) {
            const config = phoneConfigurations[pays] || phoneConfigurations['other'];
            alert(`Veuillez entrer un numéro de téléphone valide pour votre pays (format: ${config.format})`);
            isValid = false;
        }
        
        // Valider le nombre de mots dans les objectifs
        const wordCount = countWords(objectifs);
        if (wordCount > 100) {
            alert('Veuillez limiter vos objectifs à 100 mots maximum');
            isValid = false;
        }
        
        // Valider l'âge
        if (!validateAge()) {
            isValid = false;
        }
    } else if(current === 2) {
        // Valider les formations sélectionnées
        const checkedFormations = document.querySelectorAll('input[name="formations[]"]:checked');
        if(checkedFormations.length === 0) {
            alert('Veuillez sélectionner au moins une formation');
            isValid = false;
        }
    } else if(current === 3) {
        // Valider la session et le mode
        const session = document.querySelector('input[name="session"]:checked');
        const mode = document.getElementById('mode-formation').value;
        
        if(!session) {
            alert('Veuillez sélectionner une session');
            isValid = false;
        }
        
        if(!mode) {
            alert('Veuillez sélectionner un mode de formation');
            isValid = false;
        }
    } else if(current === 4) {
        // Valider le mode de paiement
        const paymentMethod = document.querySelector('input[name="payment_method"]:checked');
        if(!paymentMethod) {
            alert('Veuillez sélectionner une méthode de paiement');
            isValid = false;
        }
    }
    
    if(isValid) {
        showStep(current + 1);
    }
}

function prevStep(current) {
    showStep(current - 1);
}

// Validation du formulaire
registrationForm.addEventListener('submit', function(e) {
    e.preventDefault();
    validateFinalStep();
});

// Fonction pour valider l'étape finale avant soumission
function validateFinalStep() {
    const consentement = document.getElementById('consentement').checked;
    
    if(!consentement) {
        alert('Veuillez accepter les conditions générales');
        return false;
    }
    
    // Valider que toutes les étapes sont complètes
    if (!validateAllSteps()) {
        alert('Veuillez compléter toutes les étapes du formulaire');
        return false;
    }
    
    // Afficher la modal de confirmation
    const checkedFormations = document.querySelectorAll('input[name="formations[]"]:checked');
    showConfirmationModal(checkedFormations);
    return true;
}

// Fonction pour valider toutes les étapes
function validateAllSteps() {
    // Valider l'étape 1 (Informations personnelles)
    if (!document.getElementById('nom').value || 
        !document.getElementById('prenom').value || 
        !document.getElementById('email').value ||
        !document.getElementById('date_naissance').value ||
        !document.getElementById('lieu_naissance').value ||
        !document.getElementById('pays').value ||
        !document.getElementById('telephone').value ||
        !document.querySelector('input[name="profession"]:checked') ||
        !document.getElementById('objectifs').value) {
        return false;
    }
    
    // Valider l'étape 2 (Formations)
    if (document.querySelectorAll('input[name="formations[]"]:checked').length === 0) {
        return false;
    }
    
    // Valider l'étape 3 (Session & Mode)
    if (!document.querySelector('input[name="session"]:checked') || 
        !document.getElementById('mode-formation').value) {
        return false;
    }
    
    // Valider l'étape 4 (Paiement)
    if (!document.querySelector('input[name="payment_method"]:checked')) {
        return false;
    }
    
    return true;
}

// Afficher la modal de confirmation
function showConfirmationModal(checkedFormations) {
    let total = 0;
    modalFormationsList.innerHTML = '';
    
    checkedFormations.forEach(checkbox => {
        const formationName = formationNames[checkbox.value];
        const formationPrice = formationPrices[checkbox.value];
        total += formationPrice;
        
        const li = document.createElement('li');
        li.textContent = `${formationName} - ${formationPrice.toLocaleString('fr-FR')} FCFA`;
        modalFormationsList.appendChild(li);
    });

    // Remplir les informations personnelles dans la modal
    const nom = document.getElementById('nom').value;
    const prenom = document.getElementById('prenom').value;
    const email = document.getElementById('email').value;
    const dateNaissance = document.getElementById('date_naissance').value;
    const lieuNaissance = document.getElementById('lieu_naissance').value;
    const pays = document.getElementById('pays').options[document.getElementById('pays').selectedIndex].text;
    const telephone = phonePrefix.textContent + ' ' + document.getElementById('telephone').value;
    const profession = document.querySelector('input[name="profession"]:checked').nextElementSibling.textContent;
    const objectifs = document.getElementById('objectifs').value;
    const session = document.querySelector('input[name="session"]:checked').nextElementSibling.textContent;
    const modeFormation = document.getElementById('mode-formation').options[document.getElementById('mode-formation').selectedIndex].text;
    const paymentMethod = document.querySelector('input[name="payment_method"]:checked').value;
    
    modalNomComplet.textContent = `${prenom} ${nom}`;
    modalEmail.textContent = email;
    modalDateNaissance.textContent = dateNaissance;
    modalLieuNaissance.textContent = lieuNaissance;
    modalTelephone.textContent = telephone;
    modalPays.textContent = pays;
    modalProfession.textContent = profession;
    modalObjectifs.textContent = objectifs;
    modalSessionInfo.textContent = session;
    modalModeInfo.textContent = modeFormation;
    modalPaymentInfo.textContent = paymentMethodNames[paymentMethod] || paymentMethod;
    
    const totalEur = (total / exchangeRate).toFixed(2);
    modalTotalPrice.textContent = total.toLocaleString('fr-FR');
    modalTotalPriceEur.textContent = totalEur;
    modal.style.display = 'block';
}

// Confirmer l'inscription
modalConfirm.addEventListener('click', function() {
    modal.style.display = 'none';
    
    // Afficher l'indicateur de chargement
    loadingIndicator.style.display = 'block';
    submitBtn.disabled = true;
    
    // Envoyer les données
    sendFormData();
});

// Fonction pour collecter les données du formulaire
function collectFormData() {
    const nom = document.getElementById('nom').value;
    const prenom = document.getElementById('prenom').value;
    const email = document.getElementById('email').value;
    const dateNaissance = document.getElementById('date_naissance').value;
    const lieuNaissance = document.getElementById('lieu_naissance').value;
    const pays = document.getElementById('pays').options[document.getElementById('pays').selectedIndex].text;
    const telephone = document.getElementById('telephone').value;
    const profession = document.querySelector('input[name="profession"]:checked').nextElementSibling.textContent;
    const objectifs = document.getElementById('objectifs').value;
    const formations = Array.from(document.querySelectorAll('input[name="formations[]"]:checked')).map(cb => formationNames[cb.value]).join(', ');
    const session = document.querySelector('input[name="session"]:checked').nextElementSibling.textContent;
    const modeFormation = document.getElementById('mode-formation').options[document.getElementById('mode-formation').selectedIndex].text;
    const paymentMethod = document.querySelector('input[name="payment_method"]:checked').value;
    
    let total = 0;
    document.querySelectorAll('input[name="formations[]"]:checked').forEach(checkbox => {
        total += formationPrices[checkbox.value];
    });
    const totalEur = (total / exchangeRate).toFixed(2);
    
    return {
        nom, prenom, email, dateNaissance, lieuNaissance, pays, telephone, profession, objectifs,
        formations, session, modeFormation, paymentMethod, total, totalEur
    };
}

// Fonction pour rediriger vers Gmail (ordinateurs)
function redirectToGmail(formData) {
    const subject = "Nouvelle inscription aux formations BTECE";
    const body = `
Nouvelle inscription aux formations BTECE:

Informations personnelles:
- Nom complet: ${formData.prenom} ${formData.nom}
- Email: ${formData.email}
- Date de naissance: ${formData.dateNaissance}
- Lieu de naissance: ${formData.lieuNaissance}
- Pays: ${formData.pays}
- Téléphone: ${formData.telephone}
- Profession: ${formData.profession}
- Objectifs: ${formData.objectifs}

Formations choisies:
${formData.formations}

Session: ${formData.session}
Mode de formation: ${formData.modeFormation}
Méthode de paiement: ${formData.paymentMethod}

Montant total: ${formData.total.toLocaleString('fr-FR')} FCFA (${formData.totalEur} EUR)
    `.trim();

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=contactbtece@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(gmailUrl, '_blank');
}

// Fonction pour envoyer un email via mailto (mobiles)
function sendEmailMobile(formData) {
    const subject = "Nouvelle inscription aux formations BTECE";
    const body = `
Nouvelle inscription aux formations BTECE:

Informations personnelles:
- Nom complet: ${formData.prenom} ${formData.nom}
- Email: ${formData.email}
- Date de naissance: ${formData.dateNaissance}
- Lieu de naissance: ${formData.lieuNaissance}
- Pays: ${formData.pays}
- Téléphone: ${formData.telephone}
- Profession: ${formData.profession}
- Objectifs: ${formData.objectifs.substring(0, 200)}${formData.objectifs.length > 200 ? '...' : ''}

Formations choisies:
${formData.formations}

Session: ${formData.session}
Mode de formation: ${formData.modeFormation}
Méthode de paiement: ${formData.paymentMethod}

Montant total: ${formData.total.toLocaleString('fr-FR')} FCFA (${formData.totalEur} EUR)
    `.trim();

    const mailtoUrl = `mailto:contactbtece@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
}

// Fonction pour envoyer les données du formulaire
function sendFormData() {
    const formData = collectFormData();
    
    if (isMobileDevice()) {
        sendEmailMobile(formData);
    } else {
        redirectToGmail(formData);
    }
    
    // Rediriger vers la page de confirmation après un court délai
    setTimeout(() => {
        showConfirmationPage();
        localStorage.removeItem('bteceFormData');
    }, 2000);
}

// Afficher la page de confirmation
function showConfirmationPage() {
    mainPage.style.display = 'none';
    confirmationPage.style.display = 'block';
    window.scrollTo(0, 0);
    
    // Afficher le résumé
    displayUserSummary();
    
    // Simuler le suivi
    simulateTracking();
}

// Afficher le résumé des informations de l'utilisateur
function displayUserSummary() {
    const nom = document.getElementById('nom').value;
    const prenom = document.getElementById('prenom').value;
    const email = document.getElementById('email').value;
    const dateNaissance = document.getElementById('date_naissance').value;
    const lieuNaissance = document.getElementById('lieu_naissance').value;
    const pays = document.getElementById('pays').value;
    const telephone = document.getElementById('telephone').value;
    const profession = document.querySelector('input[name="profession"]:checked')?.value;
    const objectifs = document.getElementById('objectifs').value;
    const checkedFormations = Array.from(document.querySelectorAll('input[name="formations[]"]:checked')).map(cb => formationNames[cb.value]);
    const session = document.querySelector('input[name="session"]:checked')?.value;
    const modeFormation = document.getElementById('mode-formation').value;
    const paymentMethod = document.querySelector('input[name="payment_method"]:checked')?.value;
    
    let total = 0;
    document.querySelectorAll('input[name="formations[]"]:checked').forEach(checkbox => {
        total += formationPrices[checkbox.value];
    });
    const totalEur = (total / exchangeRate).toFixed(2);
    
    let html = `
        <h4>Récapitulatif de votre inscription</h4>
        <p><strong>Nom complet :</strong> ${prenom} ${nom}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Date de naissance :</strong> ${dateNaissance}</p>
        <p><strong>Lieu de naissance :</strong> ${lieuNaissance}</p>
        <p><strong>Téléphone :</strong> ${phonePrefix.textContent} ${telephone}</p>
        <p><strong>Pays :</strong> ${paysSelect.options[paysSelect.selectedIndex].text}</p>
        <p><strong>Profession :</strong> ${profession}</p>
        <p><strong>Objectifs :</strong> ${objectifs}</p>
        <p><strong>Formations choisies :</strong> ${checkedFormations.join(', ')}</p>
        <p><strong>Session :</strong> ${session.charAt(0).toUpperCase() + session.slice(1)} 2025</p>
        <p><strong>Mode de formation :</strong> ${modeFormation === 'presentiel' ? 'Présentiel à Cotonou' : 'En ligne'}</p>
        <p><strong>Méthode de paiement :</strong> ${paymentMethodNames[paymentMethod] || paymentMethod}</p>
        <p><strong>Montant total :</strong> ${total.toLocaleString('fr-FR')} FCFA (≈ ${totalEur} €)</p>
    `;
    
    userSummary.innerHTML = html;
}

// Simuler le suivi de l'inscription
function simulateTracking() {
    const steps = document.querySelectorAll('.tracking-steps li');
    
    // Étape 1 déjà complétée
    setTimeout(() => {
        steps[1].classList.add('completed');
        steps[2].classList.add('active');
        
        // Simuler un email de confirmation
        setTimeout(() => {
            steps[2].classList.add('completed');
            steps[3].classList.add('active');
            
            // Simuler la confirmation finale
            setTimeout(() => {
                steps[3].classList.add('completed');
                steps[4].classList.add('active');
            }, 3000);
        }, 2000);
    }, 1000);
}

// Gestion du chat
chatToggle.addEventListener('click', function() {
    chatContainer.style.display = chatContainer.style.display === 'block' ? 'none' : 'block';
    if(chatContainer.style.display === 'block') {
        chatInput.focus();
    }
});

// Gestion du chat au clavier
chatToggle.addEventListener('keydown', function(e) {
    if(e.key === 'Enter' || e.key === ' ') {
        chatContainer.style.display = chatContainer.style.display === 'block' ? 'none' : 'block';
        if(chatContainer.style.display === 'block') {
            chatInput.focus();
        }
    }
});

closeChat.addEventListener('click', function() {
    chatContainer.style.display = 'none';
});

sendMessage.addEventListener('click', sendChatMessage);
chatInput.addEventListener('keypress', function(e) {
    if(e.key === 'Enter') {
        sendChatMessage();
    }
});

function sendChatMessage() {
    const message = chatInput.value.trim();
    if(message) {
        // Ajouter le message de l'utilisateur
        addChatMessage(message, 'user');
        chatInput.value = '';
        
        // Réponse automatique
        setTimeout(() => {
            addChatMessage('Merci pour votre message. Veuillez laisser votre préocupation par e-mail via notre adresse. Notre équipe vous répondra dans les plus brefs délais.', 'bot');
        }, 1000);
    }
}

function addChatMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${sender}-message`;
    messageDiv.innerHTML = `<p>${text}</p>`;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Protection contre le clic droit et le glisser-déposer
document.addEventListener('contextmenu', function(e) {
    if(e.target.classList.contains('logo') || e.target.classList.contains('no-download')) {
        e.preventDefault();
    }
});

document.addEventListener('dragstart', function(e) {
    if(e.target.classList.contains('logo') || e.target.classList.contains('no-download')) {
        e.preventDefault();
    }
});

// Animation pour le bouton de renvoi
document.addEventListener('click', function(e) {
    if(e.target && e.target.matches('a[href="#resend"]')) {
        e.preventDefault();
        alert('Un nouvel email de confirmation vous a été envoyé.');
    }
});

// Gestion des gestes tactiles
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
}, false);

document.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, false); 

function handleSwipe() {
    const threshold = 50; // Seuil minimal pour considérer un swipe
    
    if (touchEndX < touchStartX - threshold) {
        // Swipe gauche - aller à l'étape suivante
        if(currentStep < 5) {
            nextStep(currentStep);
        }
    } else if (touchEndX > touchStartX + threshold) {
        // Swipe droit - retour à l'étape précédente
        if(currentStep > 1) {
            prevStep(currentStep);
        }
    }
}

// Initialiser le calcul du prix
calculateTotal();

// Afficher les méthodes de paiement appropriées au chargement
modeFormationSelect.dispatchEvent(new Event('change'));

// Fermer la modal
closeModal.addEventListener('click', function() {
    modal.style.display = 'none';
});

modalCancel.addEventListener('click', function() {
    modal.style.display = 'none';
});

window.addEventListener('click', function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});