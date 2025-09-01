
// Configuration des données
const CONFIG = {
  // Prix des formations en FCFA
  formationPrices: {
    'plans_archi_elec': 130000,
    'conception_elec': 150000,
    'realisation_3d': 120000,
    'programmation': 200000
  },
  
  // Taux de conversion FCFA vers EUR
  exchangeRate: 655.957,
  
  // Temps estimé par étape (en secondes)
  stepTimes: [60, 30, 30, 30, 30],
  
  // Noms des formations pour l'affichage
  formationNames: {
    'plans_archi_elec': 'Réalisation de plans architecturaux et électricité',
    'conception_elec': 'Conception électronique',
    'realisation_3d': 'Réalisation 3D',
    'programmation': 'Programmation'
  },
  
  // Noms des méthodes de paiement
  paymentMethodNames: {
    'VISA': 'Paiement par carte VISA',
    'MTN Mobile Money': 'Paiement par MTN Mobile Money',
    'Moov Africa Mobile Money': 'Paiement par Moov Africa Mobile Money',
    'Celtiis Mobile Money': 'Paiement par Celtiis Mobile Money',
    'Orange Money': 'Paiement par Orange Money',
    'Airtel Money': 'Paiement par Airtel Money',
    'Wari': 'Paiement par Wari',
    'Crypto Currency': 'Paiement par Crypto Currency',
    'Paiement sur place': 'Paiement sur place (espèces/chèque)'
  },
  
  // Sessions disponibles
  sessionDates: {
    'juillet': 'Juillet 2025',
    'aout': 'Août 2025',
    'septembre': 'Septembre 2025',
    'octobre': 'Octobre 2025',
    'novembre': 'Novembre 2025',
    'decembre': 'Décembre 2025'
  }
};

// Initialisation de l'application
class FormApp {
  constructor() {
    this.state = {
      currentStep: 1,
      currentRappelIndex: 0,
      isSubmitting: false,
      formSubmitted: false,
      saveTimeout: null,
      formData: {}
    };
    
    // Configuration des variables d'environnement avec des valeurs par défaut
    this.env = {
      EMAILJS_USER_ID: window.EMAILJS_USER_ID || 'default_user_id',
      EMAILJS_SERVICE_ID: window.EMAILJS_SERVICE_ID || 'default_service_id',
      EMAILJS_TEMPLATE_ID: window.EMAILJS_TEMPLATE_ID || 'default_template_id',
      EMAILJS_ADMIN_TEMPLATE_ID: window.EMAILJS_ADMIN_TEMPLATE_ID || 'default_admin_template_id',
      GOOGLE_SHEETS_API_URL: window.GOOGLE_SHEETS_API_URL || '',
      API_KEY: window.API_KEY || '',
      API_TOKEN: window.API_TOKEN || ''
    };
    
    this.initElements();
    this.initEventListeners();
    this.initForm();
    this.initGoogleSheets();
  }
  
  // Initialisation de la connexion à Google Sheets
  initGoogleSheets() {
    // Récupération des variables d'environnement
    const googleSheetsApiUrl = this.env.GOOGLE_SHEETS_API_URL;
    const API_KEY = this.env.API_KEY;
    const API_TOKEN = this.env.API_TOKEN;
    if (!googleSheetsApiUrl) {
      console.error('URL API Google Sheets non configurée');
      return;
    }

    // Vous pouvez utiliser cette URL pour envoyer des données plus tard
    this.googleSheetsApiUrl = googleSheetsApiUrl;
    this.API_KEY = API_KEY;
    this.API_TOKEN = API_TOKEN;
  }

  // Cache les éléments DOM
  initElements() {
    this.elements = {
      checkboxes: document.querySelectorAll('input[name="selected_courses[]"]'),
      priceDisplay: document.getElementById('price-display'),
      totalPriceFCFA: document.getElementById('total-price-fcfa'),
      totalPriceEUR: document.getElementById('total-price-eur'),
      submitBtn: document.getElementById('submit-btn'),
      loadingIndicator: document.getElementById('loading'),
      registrationForm: document.getElementById('registration-form'),
      paysSelect: document.getElementById('pays'),
      phonePrefix: document.getElementById('phone-prefix'),
      phoneFormat: document.getElementById('phone-format'),
      telephoneInput: document.getElementById('telephone'),
      mainPage: document.getElementById('main-page'),
      confirmationPage: document.getElementById('confirmation-page'),
      modal: document.getElementById('confirmation-modal'),
      modalFormationsList: document.getElementById('modal-formations-list'),
      modalNomComplet: document.getElementById('modal-nom-complet'),
      modalEmail: document.getElementById('modal-email'),
      modalDateNaissance: document.getElementById('modal-date-naissance'),
      modalLieuNaissance: document.getElementById('modal-lieu-naissance'),
      modalTelephone: document.getElementById('modal-telephone'),
      modalPays: document.getElementById('modal-pays'),
      modalProfession: document.getElementById('modal-profession'),
      modalObjectifs: document.getElementById('modal-objectifs'),
      modalSessionInfo: document.getElementById('modal-session-info'),
      modalModeInfo: document.getElementById('modal-mode-info'),
      modalPaymentInfo: document.getElementById('modal-payment-info'),
      modalTotalPrice: document.getElementById('modal-total-price'),
      modalTotalPriceEur: document.getElementById('modal-total-price-eur'),
      closeModal: document.querySelector('.close-modal'),
      modalCancel: document.querySelector('.modal-cancel'),
      modalConfirm: document.querySelector('.modal-confirm'),
      chatToggle: document.getElementById('chat-toggle'),
      chatContainer: document.getElementById('chat-container'),
      closeChat: document.getElementById('close-chat'),
      chatMessages: document.getElementById('chat-messages'),
      chatInput: document.getElementById('chat-input'),
      sendMessage: document.getElementById('send-message'),
      modeFormationSelect: document.getElementById('mode-formation'),
      onlinePaymentMethods: document.getElementById('online-payment-methods'),
      presentielPaymentMethod: document.getElementById('presentiel-payment-method'),
      paymentMethodGroup: document.getElementById('payment-method-group'),
      formSteps: document.querySelectorAll('.form-step'),
      progressSteps: document.querySelectorAll('.step'),
      progressBar: document.getElementById('progress-bar'),
      progressText: document.getElementById('progress-text'),
      timeEstimation: document.getElementById('time-estimation'),
      saveStatus: document.getElementById('save-status'),
      userSummary: document.getElementById('user-summary'),
      rappelMessages: document.querySelectorAll('.rappel-message'),
      rappelContainer: document.querySelector('.raquel-container'),
      objectifsTextarea: document.getElementById('objectifs'),
      objectifsCounter: document.getElementById('objectifs-counter'),
      dateNaissanceInput: document.getElementById('date_naissance'),
      lieuNaissanceInput: document.getElementById('lieu_naissance'),
      ageError: document.getElementById('age-error'),
      resendEmailBtn: document.querySelector('.resend-link'),
      csrfToken: document.getElementById('csrf_token'),
      sessionDatesContainer: document.getElementById('session-dates-container'),
      honeypotField: document.getElementById('bot-field'),
      montantTotalInput: document.getElementById('montant-total'),
      consentementCheckbox: document.getElementById('consentement')
    };
  }
  
  // Initialise les écouteurs d'événements avec délégation
  initEventListeners() {
    // Utiliser la délégation d'événements pour une meilleure performance
    document.addEventListener('change', (e) => {
      // Gestion du mode de formation
      if (e.target === this.elements.modeFormationSelect) {
        if (this.elements.onlinePaymentMethods) {
          this.elements.onlinePaymentMethods.style.display = 
            e.target.value === 'en-ligne' ? 'block' : 'none';
        }
        if (this.elements.presentielPaymentMethod) {
          this.elements.presentielPaymentMethod.style.display = 
            e.target.value === 'presentiel' ? 'block' : 'none';
        }
        this.autoSave();
      }
      
      // Gestion du pays et du format de téléphone
      if (e.target === this.elements.paysSelect) {
        const selectedCountry = e.target.value;
        const config = this.getPhoneConfig(selectedCountry);
        
        if (this.elements.phonePrefix) {
          this.elements.phonePrefix.textContent = config.code;
        }
        
        if (this.elements.telephoneInput) {
          this.elements.telephoneInput.pattern = config.pattern;
          this.elements.telephoneInput.title = `Numéro valide (format: ${config.format})`;
        }
        
        if (this.elements.phoneFormat) {
          this.elements.phoneFormat.textContent = `Format: ${config.format}`;
          this.elements.phoneFormat.style.display = 'block';
        }
        
        this.autoSave();
      }
      
      // Calcul du total des formations
      if (e.target.matches('input[name="selected_courses[]"]')) {
        this.calculateTotal();
      }
      
      // Validation de l'âge
      if (e.target === this.elements.dateNaissanceInput) {
        this.validateAge();
      }
      
      // Compteur de mots pour les objectifs
      if (e.target === this.elements.objectifsTextarea) {
        this.updateWordCounter();
      }
      
      // Sauvegarde automatique pour tous les champs de formulaire
      if (e.target.matches('input, select, textarea')) {
        clearTimeout(this.state.saveTimeout);
        this.state.saveTimeout = setTimeout(() => this.autoSave(), 1000);
      }
    });
    
    document.addEventListener('input', (e) => {
      // Sauvegarde automatique pour les champs de texte
      if (e.target.matches('input, select, textarea')) {
        clearTimeout(this.state.saveTimeout);
        this.state.saveTimeout = setTimeout(() => this.autoSave(), 1000);
      }
      
      // Compteur de mots pour les objectifs
      if (e.target === this.elements.objectifsTextarea) {
        this.updateWordCounter();
      }
    });
    
    // Soumission du formulaire
    if (this.elements.registrationForm) {
      this.elements.registrationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.validateFinalStep();
      });
    }
    
    // Gestion de la modal de confirmation
    if (this.elements.modalConfirm) {
      this.elements.modalConfirm.addEventListener('click', () => {
        // Validation avant envoi
        if (this.validateAllSteps()) {
          this.sendFormData();
        } else {
          // Afficher un message d'erreur dans la modal
          const errorDiv = document.createElement('div');
          errorDiv.className = 'error-message';
          errorDiv.textContent = 'Veuillez corriger les erreurs dans le formulaire avant de confirmer.';
          errorDiv.setAttribute('role', 'alert');
          
          // Supprimer les anciens messages d'erreur
          const existingError = this.elements.modal.querySelector('.error-message');
          if (existingError) existingError.remove();
          
          this.elements.modal.querySelector('.modal-body').prepend(errorDiv);
        }
      });
    }
    
    if (this.elements.modalCancel) {
      this.elements.modalCancel.addEventListener('click', () => { 
        if (this.elements.modal) {
          this.elements.modal.style.display = 'none'; 
        }
      });
    }
    
    if (this.elements.closeModal) {
      this.elements.closeModal.addEventListener('click', () => { 
        if (this.elements.modal) {
          this.elements.modal.style.display = 'none'; 
        }
      });
    }
    
    // Gestion du chat
    if (this.elements.chatToggle) {
      this.elements.chatToggle.addEventListener('click', () => {
        if (this.elements.chatContainer) {
          this.elements.chatContainer.style.display = 
            this.elements.chatContainer.style.display === 'block' ? 'none' : 'block';
          if (this.elements.chatContainer.style.display === 'block' && this.elements.chatInput) {
            this.elements.chatInput.focus();
          }
        }
      });
    }
    
    if (this.elements.closeChat) {
      this.elements.closeChat.addEventListener('click', () => { 
        if (this.elements.chatContainer) {
          this.elements.chatContainer.style.display = 'none'; 
        }
      });
    }
    
    if (this.elements.sendMessage) {
      this.elements.sendMessage.addEventListener('click', () => this.sendChatMessage());
    }
    
    if (this.elements.chatInput) {
      this.elements.chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') this.sendChatMessage();
      });
    }
    
    // Boutons précédent/suivant avec délégation d'événements
    document.addEventListener('click', (e) => {
      if (e.target.matches('.btn-next')) {
        e.preventDefault();
        const currentStep = parseInt(e.target.closest('.form-step').id.split('-').pop());
        this.nextStep(currentStep);
      }
      
      if (e.target.matches('.btn-prev')) {
        e.preventDefault();
        const currentStep = parseInt(e.target.closest('.form-step').id.split('-').pop());
        this.prevStep(currentStep);
      }
    });
  }
  
  // Initialise le formulaire
  initForm() {
    // Configuration de la date maximale pour la date de naissance (13 ans minimum)
    if (this.elements.dateNaissanceInput) {
      const today = new Date();
      const maxDate = new Date(today.getFullYear() - 13, today.getMonth(), today.getDate());
      this.elements.dateNaissanceInput.max = maxDate.toISOString().split('T')[0];
    }
    
    // Génération du token CSRF
    this.generateCSRFToken();
    
    // Chargement des données sauvegardées
    this.loadSavedData();
    this.updateProgressBar();
    this.updateTimeEstimation();
    
    // Affichage des dates des sessions
    this.displaySessionDates();
    
    // Rotation des messages du rappel
    if (this.elements.rappelMessages && this.elements.rappelMessages.length > 0) {
      setInterval(() => this.rotateRappelMessages(), 2000);
    }
    
    // Initialisation finale
    this.updateWordCounter();
    this.calculateTotal();
  }
  
  // Fonctions utilitaires
  generateCSRFToken() {
    if (!this.elements.csrfToken) return;
    const token = window.crypto.getRandomValues(new Uint32Array(1))[0].toString(16);
    this.elements.csrfToken.value = token;
    return token;
  }
  
  getPhoneConfig(countryCode) {
    return phoneConfigurations[countryCode] || phoneConfigurations['BJ'];
  }
  
  sanitizeInput(input) {
    if (!input) return '';
    return input.toString()
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }
  
  countWords(text) {
    if (!text) return 0;
    const trimmedText = text.trim();
    return trimmedText === '' ? 0 : trimmedText.split(/\s+/).length;
  }
  
  calculateAge(birthDate) {
    if (!birthDate) return 0;
    
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
      age--;
    }
    
    return age;
  }
  
  validatePhone(phone, country) {
    if (!phone || !country) return false;
    const config = this.getPhoneConfig(country);
    const regex = new RegExp(`^${config.pattern}$`);
    return regex.test(phone);
  }
  
  // Gestion des étapes
  showStep(step) {
    if (!this.elements.formSteps || !this.elements.progressSteps) return;
    
    this.elements.formSteps.forEach((formStep, index) => {
      formStep.classList.toggle('active', index + 1 === step);
      formStep.setAttribute('aria-hidden', index + 1 !== step);
    });

    this.elements.progressSteps.forEach((progressStep, index) => {
      if (index + 1 < step) {
        progressStep.classList.add('completed');
        progressStep.classList.remove('active');
        progressStep.removeAttribute('aria-current');
      } else if (index + 1 === step) {
        progressStep.classList.add('active');
        progressStep.classList.remove('completed');
        progressStep.setAttribute('aria-current', 'step');
      } else {
        progressStep.classList.remove('active', 'completed');
        progressStep.removeAttribute('aria-current');
      }
    });

    this.state.currentStep = step;
    this.updateProgressBar();
    this.updateTimeEstimation();
    this.autoSave();
    
    // Annoncer le changement d'étape pour l'accessibilité
    this.announceStepChange(step);
    
    // Focus sur le premier champ de l'étape pour l'accessibilité
    const currentStep = document.getElementById(`form-step-${step}`);
    if (currentStep) {
      const firstInput = currentStep.querySelector('input, select, textarea');
      if (firstInput) firstInput.focus();
    }
  }
  
  // Annoncer le changement d'étape pour les lecteurs d'écran
  announceStepChange(step) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = `Étape ${step} sur 5`;
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 100);
  }
  
  nextStep(current) {
    if (!this.validateStep(current)) return;
    this.showStep(current + 1);
  }
  
  prevStep(current) {
    this.showStep(current - 1);
  }
  
  updateProgressBar() {
    if (!this.elements.progressBar || !this.elements.progressText) return;
    
    const progress = ((this.state.currentStep - 1) / 5) * 100;
    this.elements.progressBar.style.width = `${progress}%`;
    this.elements.progressText.textContent = `${progress.toFixed(0)}% complété`;
    this.elements.progressBar.setAttribute('aria-valuenow', progress);
    
    if (this.state.currentStep > 1 && document.querySelector('.progress-container')) {
      document.querySelector('.progress-container').style.display = 'block';
    }
  }
  
  updateTimeEstimation() {
    if (!this.elements.timeEstimation) return;
    
    let remainingTime = 0;
    for (let i = this.state.currentStep - 1; i < CONFIG.stepTimes.length; i++) {
      remainingTime += CONFIG.stepTimes[i];
    }
    
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    
    if (minutes > 0) {
      this.elements.timeEstimation.textContent = `Temps estimé : ${minutes} minute${minutes > 1 ? 's' : ''}${seconds > 0 ? ` et ${seconds} seconde${seconds > 1 ? 's' : ''}` : ''}`;
    } else {
      this.elements.timeEstimation.textContent = `Temps estimé : ${seconds} seconde${seconds > 1 ? 's' : ''}`;
    }
  }
  
  // Gestion des données
  autoSave() {
    if (!this.elements.saveStatus) return;
    
    this.elements.saveStatus.textContent = "Sauvegarde en cours...";
    this.elements.saveStatus.className = "save-status saving";
    this.elements.saveStatus.style.display = "block";
    
    this.state.formData = {
      step: this.state.currentStep,
      nom: this.sanitizeInput(document.getElementById('nom')?.value),
      prenom: this.sanitizeInput(document.getElementById('prenom')?.value),
      email: this.sanitizeInput(document.getElementById('email')?.value),
      date_naissance: this.sanitizeInput(this.elements.dateNaissanceInput?.value),
      lieu_naissance: this.sanitizeInput(this.elements.lieuNaissanceInput?.value),
      pays: this.sanitizeInput(this.elements.paysSelect?.value),
      telephone: this.sanitizeInput(this.elements.telephoneInput?.value),
      profession: document.querySelector('input[name="profession"]:checked')?.value,
      objectifs: this.sanitizeInput(this.elements.objectifsTextarea?.value),
      formations: Array.from(this.elements.checkboxes || [])
        .filter(cb => cb.checked)
        .map(cb => this.sanitizeInput(cb.value)),
      session: document.querySelector('input[name="session"]:checked')?.value,
      modeFormation: this.sanitizeInput(this.elements.modeFormationSelect?.value),
      paymentMethod: document.querySelector('input[name="payment_method"]:checked')?.value,
      consentement: this.elements.consentementCheckbox?.checked || false
    };
    
    localStorage.setItem('bteceFormData', JSON.stringify(this.state.formData));
    
    setTimeout(() => {
      this.elements.saveStatus.textContent = "Données sauvegardées";
      this.elements.saveStatus.className = "save-status saved";
      
      setTimeout(() => {
        this.elements.saveStatus.style.display = "none";
      }, 3000);
    }, 1000);
  }
  
  loadSavedData() {
    const savedData = localStorage.getItem('bteceFormData');
    if (!savedData) return;
    
    try {
      this.state.formData = JSON.parse(savedData);
      
      // Remplit les champs avec les données sauvegardées
      const fillField = (id, value) => {
        const element = document.getElementById(id);
        if (element && value) element.value = this.sanitizeInput(value);
      };
      
      const checkRadio = (name, value) => {
        if (value) {
          const radio = document.querySelector(`input[name="${name}"][value="${this.sanitizeInput(value)}"]`);
          if (radio) radio.checked = true;
        }
      };
      
      fillField('nom', this.state.formData.nom);
      fillField('prenom', this.state.formData.prenom);
      fillField('email', this.state.formData.email);
      fillField('date_naissance', this.state.formData.date_naissance);
      fillField('lieu_naissance', this.state.formData.lieu_naissance);
      
      if (this.state.formData.pays && this.elements.paysSelect) {
        this.elements.paysSelect.value = this.state.formData.pays;
        this.elements.paysSelect.dispatchEvent(new Event('change'));
      }
      
      fillField('telephone', this.state.formData.telephone);
      checkRadio('profession', this.state.formData.profession);
      fillField('objectifs', this.state.formData.objectifs);
      
      // Formations
      if (this.state.formData.formations?.length > 0 && this.elements.checkboxes) {
        this.state.formData.formations.forEach(formation => {
          const checkbox = document.querySelector(`input[name="selected_courses[]"][value="${this.sanitizeInput(formation)}"]`);
          if (checkbox) checkbox.checked = true;
        });
        this.calculateTotal();
      }
      
      // Session
      checkRadio('session', this.state.formData.session);
      
      // Mode de formation
      if (this.state.formData.modeFormation && this.elements.modeFormationSelect) {
        this.elements.modeFormationSelect.value = this.state.formData.modeFormation;
        this.elements.modeFormationSelect.dispatchEvent(new Event('change'));
      }
      
      // Méthode de paiement
      checkRadio('payment_method', this.state.formData.paymentMethod);
      
      // Consentement
      if (this.state.formData.consentement && this.elements.consentementCheckbox) {
        this.elements.consentementCheckbox.checked = true;
      }
      
      // Aller à l'étape sauvegardée
      if (this.state.formData.step) {
        this.showStep(this.state.formData.step);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des données sauvegardées:', error);
      localStorage.removeItem('bteceFormData');
    }
  }
  
  // Validation - décomposée en méthodes plus petites
  validateStep(step) {
    switch(step) {
      case 1: return this.validateStep1();
      case 2: return this.validateStep2();
      case 3: return this.validateStep3();
      case 4: return this.validateStep4();
      case 5: return this.validateStep5();
      default: return true;
    }
  }
  
  validateStep1() {
    const errors = [];
    
    errors.push(...this.validatePersonalInfo());
    errors.push(...this.validateContactInfo());
    errors.push(...this.validateObjectives());
    
    // Validation de l'âge
    if (!this.validateAge()) {
      errors.push('Vous devez avoir au moins 13 ans pour vous inscrire');
    }

    // Validation du champ honeypot (anti-spam)
    if (this.elements.honeypotField && this.elements.honeypotField.value.trim() !== '') {
      errors.push('Erreur de validation du formulaire');
    }

    return this.displayErrors(errors, 1);
  }
  
  validatePersonalInfo() {
    const errors = [];
    const requiredFields = [
      { id: 'nom', name: 'Nom', pattern: '[A-Za-zÀ-ÿ\\s\\-\']+', minLength: 2, maxLength: 50 },
      { id: 'prenom', name: 'Prénom', pattern: '[A-Za-zÀ-ÿ\\s\\-\']+', minLength: 2, maxLength: 50 },
      { id: 'email', name: 'Email', pattern: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$' },
      { id: 'date_naissance', name: 'Date de naissance' },
      { id: 'lieu_naissance', name: 'Lieu de naissance', minLength: 2, maxLength: 100 }
    ];

    for (const field of requiredFields) {
      const element = document.getElementById(field.id);
      if (!element) continue;
      
      const value = element.value.trim();
      
      if (!value) {
        errors.push(`Le champ "${field.name}" est obligatoire`);
        element.setAttribute('aria-invalid', 'true');
      } else {
        // Validation supplémentaire si des critères sont spécifiés
        if (field.pattern && !new RegExp(field.pattern).test(value)) {
          errors.push(`Format invalide pour le champ "${field.name}"`);
          element.setAttribute('aria-invalid', 'true');
        }
        
        if (field.minLength && value.length < field.minLength) {
          errors.push(`Le champ "${field.name}" doit contenir au moins ${field.minLength} caractères`);
          element.setAttribute('aria-invalid', 'true');
        }
        
        if (field.maxLength && value.length > field.maxLength) {
          errors.push(`Le champ "${field.name}" ne doit pas dépasser ${field.maxLength} caractères`);
          element.setAttribute('aria-invalid', 'true');
        }
        
        if (element.getAttribute('aria-invalid') !== 'true') {
          element.setAttribute('aria-invalid', 'false');
        }
      }
    }

    // Validation de la profession
    if (!document.querySelector('input[name="profession"]:checked')) {
      errors.push('Veuillez sélectionner une profession');
    }

    return errors;
  }
  
  validateContactInfo() {
    const errors = [];
    
    // Validation du pays
    if (!this.elements.paysSelect?.value) {
      errors.push('Veuillez sélectionner un pays');
      if (this.elements.paysSelect) this.elements.paysSelect.setAttribute('aria-invalid', 'true');
    } else if (this.elements.paysSelect) {
      this.elements.paysSelect.setAttribute('aria-invalid', 'false');
    }
    
    // Validation du téléphone
    if (this.elements.paysSelect && this.elements.telephoneInput) {
      const pays = this.elements.paysSelect.value;
      const telephone = this.elements.telephoneInput.value.trim();
      
      if (!telephone) {
        errors.push('Le champ "Téléphone" est obligatoire');
        this.elements.telephoneInput.setAttribute('aria-invalid', 'true');
      } else if (!this.validatePhone(telephone, pays)) {
        const config = this.getPhoneConfig(pays);
        errors.push(`Format de téléphone invalide (${config.format})`);
        this.elements.telephoneInput.setAttribute('aria-invalid', 'true');
      } else {
        this.elements.telephoneInput.setAttribute('aria-invalid', 'false');
      }
    }

    return errors;
  }
  
  validateObjectives() {
    const errors = [];
    
    // Validation des objectifs
    if (this.elements.objectifsTextarea) {
      const objectifs = this.elements.objectifsTextarea.value.trim();
      const wordCount = this.countWords(objectifs);
      
      if (wordCount < 5) {
        errors.push('Veuillez décrire vos objectifs (minimum 5 mots)');
        this.elements.objectifsTextarea.classList.add('invalid');
        this.elements.objectifsTextarea.classList.add('error-highlight');
        const objectifsError = document.getElementById('objectifs-error');
        if (objectifsError) {
          objectifsError.textContent = "Veuillez décrire vos objectifs (minimum 5 mots)";
          objectifsError.style.display = 'block';
        }
        const objectifsErrorIcon = document.getElementById('objectifs-error-icon');
        if (objectifsErrorIcon) {
          objectifsErrorIcon.style.display = 'inline-block';
        }
        
        setTimeout(() => {
          this.elements.objectifsTextarea.classList.remove('error-highlight');
        }, 50);
      } else if (wordCount > 100) {
        errors.push('Maximum 100 mots autorisés pour les objectifs');
        this.elements.objectifsTextarea.classList.add('invalid');
        this.elements.objectifsTextarea.classList.add('error-highlight');
        const objectifsError = document.getElementById('objectifs-error');
        if (objectifsError) {
          objectifsError.textContent = "Maximum 100 mots autorisés";
          objectifsError.style.display = 'block';
        }
        const objectifsErrorIcon = document.getElementById('objectifs-error-icon');
        if (objectifsErrorIcon) {
          objectifsErrorIcon.style.display = 'inline-block';
        }
        
        setTimeout(() => {
          this.elements.objectifsTextarea.classList.remove('error-highlight');
        }, 50);
      } else {
        this.elements.objectifsTextarea.classList.remove('invalid');
        const objectifsError = document.getElementById('objectifs-error');
        if (objectifsError) {
          objectifsError.style.display = 'none';
        }
        const objectifsErrorIcon = document.getElementById('objectifs-error-icon');
        if (objectifsErrorIcon) {
          objectifsErrorIcon.style.display = 'none';
        }
        this.elements.objectifsTextarea.classList.add('valid');
      }
    }
    
    return errors;
  }
  
  displayErrors(errorMessages, step) {
    const isValid = errorMessages.length === 0;
    
    // Afficher toutes les erreurs en une fois
    if (!isValid) {
      const errorContainer = document.createElement('div');
      errorContainer.className = 'error-message';
      errorContainer.setAttribute('role', 'alert');
      errorContainer.setAttribute('aria-live', 'assertive');
      
      const errorList = document.createElement('ul');
      errorMessages.forEach(msg => {
        const li = document.createElement('li');
        li.textContent = msg;
        errorList.appendChild(li);
      });
      
      errorContainer.appendChild(errorList);
      
      // Supprimer les anciens messages d'erreur
      const oldError = document.querySelector('.error-message');
      if (oldError) oldError.remove();
      
      // Insérer le nouveau message d'erreur
      const stepElement = this.elements.formSteps[step - 1];
      if (stepElement) {
        stepElement.insertBefore(errorContainer, stepElement.firstChild);
      }
      
      // Défilement vers le haut pour voir les erreurs
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    return isValid;
  }
  
  validateStep2() {
    if (!this.elements.checkboxes || 
        !Array.from(this.elements.checkboxes).some(cb => cb.checked)) {
      const errorMessage = document.createElement('div');
      errorMessage.className = 'error-message';
      errorMessage.setAttribute('role', 'alert');
      errorMessage.setAttribute('aria-live', 'assertive');
      errorMessage.textContent = 'Veuillez sélectionner au moins une formation';
      
      // Supprimer les anciens messages d'erreur
      const oldError = document.querySelector('.error-message');
      if (oldError) oldError.remove();
      
      // Insérer le nouveau message d'erreur
      const secondStep = this.elements.formSteps[1];
      if (secondStep) {
        secondStep.insertBefore(errorMessage, secondStep.firstChild);
      }
      
      // Défilement vers le haut pour voir les erreurs
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      return false;
    }
    
    return true;
  }
  
  validateStep3() {
    const errorMessages = [];
    let isValid = true;

    if (!document.querySelector('input[name="session"]:checked')) {
      errorMessages.push('Veuillez sélectionner une session');
      isValid = false;
    }

    if (!this.elements.modeFormationSelect?.value) {
      errorMessages.push('Veuillez sélectionner un mode de formation');
      isValid = false;
    }

    return this.displayErrors(errorMessages, 3);
  }
  
  validateStep4() {
    if (!document.querySelector('input[name="payment_method"]:checked')) {
      const errorMessage = document.createElement('div');
      errorMessage.className = 'error-message';
      errorMessage.setAttribute('role', 'alert');
      errorMessage.setAttribute('aria-live', 'assertive');
      errorMessage.textContent = 'Veuillez sélectionner une méthode de paiement';
      
      // Supprimer les anciens messages d'erreur
      const oldError = document.querySelector('.error-message');
      if (oldError) oldError.remove();
      
      // Insérer le nouveau message d'erreur
      const fourthStep = this.elements.formSteps[3];
      if (fourthStep) {
        fourthStep.insertBefore(errorMessage, fourthStep.firstChild);
      }
      
      // Défilement vers le haut pour voir les erreurs
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      return false;
    }
    
    return true;
  }
  
  validateStep5() {
    if (!this.elements.consentementCheckbox?.checked) {
      const errorMessage = document.createElement('div');
      errorMessage.className = 'error-message';
      errorMessage.setAttribute('role', 'alert');
      errorMessage.setAttribute('aria-live', 'assertive');
      errorMessage.textContent = 'Veuillez accepter les conditions générales';
      
      // Supprimer les anciens messages d'erreur
      const oldError = document.querySelector('.error-message');
      if (oldError) oldError.remove();
      
      // Insérer le nouveau message d'erreur
      const fifthStep = this.elements.formSteps[4];
      if (fifthStep) {
        fifthStep.insertBefore(errorMessage, fifthStep.firstChild);
      }
      
      // Défilement vers le haut pour voir les erreurs
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      return false;
    }

    return true;
  }
  
  validateFinalStep() {
    if (!this.validateAllSteps()) {
      return false;
    }

    this.showConfirmationModal();
    return true;
  }
  
  validateAllSteps() {
    return this.validateStep1() && 
           this.validateStep2() && 
           this.validateStep3() && 
           this.validateStep4() && 
           this.validateStep5();
  }
  
  // Fonctions d'affichage
  updateWordCounter() {
    if (!this.elements.objectifsTextarea || !this.elements.objectifsCounter) return;
    
    const wordCount = this.countWords(this.elements.objectifsTextarea.value);
    this.elements.objectifsCounter.textContent = `${wordCount}/100 mots`;
    
    if (wordCount > 100) {
      this.elements.objectifsCounter.style.color = '#e74c3c';
      this.elements.objectifsTextarea.style.borderColor = '#e74c3c';
      this.elements.objectifsTextarea.setAttribute('aria-invalid', 'true');
    } else {
      this.elements.objectifsCounter.style.color = '#666';
      this.elements.objectifsTextarea.style.borderColor = '#ddd';
      this.elements.objectifsTextarea.setAttribute('aria-invalid', 'false');
    }
  }
  
  rotateRappelMessages() {
    if (!this.elements.rappelMessages || this.elements.rappelMessages.length === 0) return;
    
    this.elements.rappelMessages.forEach(msg => msg.classList.remove('active'));
    this.elements.rappelMessages[this.state.currentRappelIndex].classList.add('active');
    this.state.currentRappelIndex = (this.state.currentRappelIndex + 1) % this.elements.rappelMessages.length;
  }
  
  validateAge() {
    if (!this.elements.dateNaissanceInput || !this.elements.ageError) return true;
    
    const birthDate = this.elements.dateNaissanceInput.value;
    if (!birthDate) return true;
    
    const age = this.calculateAge(birthDate);
    if (age < 13) {
      this.elements.ageError.style.display = 'block';
      this.elements.dateNaissanceInput.style.borderColor = '#e74c3c';
      this.elements.dateNaissanceInput.setAttribute('aria-invalid', 'true');
      return false;
    } else {
      this.elements.ageError.style.display = 'none';
      this.elements.dateNaissanceInput.style.borderColor = '#ddd';
      this.elements.dateNaissanceInput.setAttribute('aria-invalid', 'false');
      return true;
    }
  }
  
  displaySessionDates() {
    if (!this.elements.sessionDatesContainer) return;
    
    this.elements.sessionDatesContainer.innerHTML = '';
    
    for (const [sessionId, dateRange] of Object.entries(CONFIG.sessionDates)) {
      const sessionElement = document.createElement('div');
      sessionElement.className = 'session-date-info';
      sessionElement.innerHTML = `
        <input type="radio" id="${sessionId}" name="session" value="${sessionId}">
        <label for="${sessionId}">${dateRange}</label>
      `;
      this.elements.sessionDatesContainer.appendChild(sessionElement);
    }
  }
  
  calculateTotal() {
    if (!this.elements.checkboxes || !this.elements.priceDisplay || !this.elements.totalPriceFCFA || !this.elements.totalPriceEUR || !this.elements.submitBtn) return;
    
    let totalFCfa = 0;
    const selectedFormations = Array.from(this.elements.checkboxes)
      .filter(checkbox => checkbox.checked)
      .map(checkbox => {
        totalFCfa += CONFIG.formationPrices[checkbox.value] || 0;
        return checkbox.value;
      });
    
    if (selectedFormations.length > 0) {
      const totalEur = (totalFCfa / CONFIG.exchangeRate).toFixed(2);
      
      this.elements.totalPriceFCFA.textContent = totalFCfa.toLocaleString('fr-FR');
      this.elements.totalPriceEUR.textContent = totalEur;
      this.elements.priceDisplay.style.display = 'block';
      
      // Mise à jour du champ caché pour Netlify
      if (this.elements.montantTotalInput) {
        this.elements.montantTotalInput.value = `${totalFCfa.toLocaleString('fr-FR')} FCFA (≈ ${totalEur} €)`;
      }
      
      if (selectedFormations.length === 1) {
        this.elements.submitBtn.textContent = `S'inscrire maintenant (${totalFCfa.toLocaleString('fr-FR')} FCFA / ${totalEur} €)`;
      } else {
        this.elements.submitBtn.textContent = `S'inscrire maintenant (${selectedFormations.length} formations - ${totalFCfa.toLocaleString('fr-FR')} FCFA / ${totalEur} €)`;
      }
    } else {
      this.elements.priceDisplay.style.display = 'none';
      this.elements.submitBtn.textContent = `S'inscrire maintenant`;
    }
    
    this.autoSave();
  }
  
  showConfirmationModal() {
    if (!this.elements.modal || !this.elements.modalFormationsList) return;
    
    const checkedFormations = Array.from(this.elements.checkboxes || []).filter(cb => cb.checked);
    let total = 0;
    this.elements.modalFormationsList.innerHTML = '';
    
    checkedFormations.forEach(checkbox => {
      const formationName = CONFIG.formationNames[checkbox.value];
      const formationPrice = CONFIG.formationPrices[checkbox.value];
      total += formationPrice;
      
      const li = document.createElement('li');
      li.textContent = `${formationName} - ${formationPrice.toLocaleString('fr-FR')} FCFA`;
      this.elements.modalFormationsList.appendChild(li);
    });

    // Remplit les informations dans la modal
    const getValue = id => this.sanitizeInput(document.getElementById(id)?.value);
    const getRadioValue = name => document.querySelector(`input[name="${name}"]:checked`)?.value;
    const getRadioText = name => {
      const radio = document.querySelector(`input[name="${name}"]:checked`);
      return radio ? this.sanitizeInput(radio.nextElementSibling?.textContent) : '';
    };
    const getSelectText = id => {
      const select = this.elements[id];
      return select ? this.sanitizeInput(select.options[select.selectedIndex]?.text) : '';
    };

    if (this.elements.modalNomComplet) {
      this.elements.modalNomComplet.textContent = `${getValue('prenom')} ${getValue('nom')}`;
    }
    if (this.elements.modalEmail) {
      this.elements.modalEmail.textContent = getValue('email');
    }
    if (this.elements.modalDateNaissance) {
      this.elements.modalDateNaissance.textContent = getValue('date_naissance');
    }
    if (this.elements.modalLieuNaissance) {
      this.elements.modalLieuNaissance.textContent = getValue('lieu_naissance');
    }
    if (this.elements.modalTelephone && this.elements.phonePrefix) {
      this.elements.modalTelephone.textContent = `${this.elements.phonePrefix.textContent} ${getValue('telephone')}`;
    }
    if (this.elements.modalPays) {
      this.elements.modalPays.textContent = getSelectText('paysSelect');
    }
    if (this.elements.modalProfession) {
      this.elements.modalProfession.textContent = getRadioText('profession');
    }
    if (this.elements.modalObjectifs) {
      this.elements.modalObjectifs.textContent = getValue('objectifs');
    }
    if (this.elements.modalSessionInfo) {
      this.elements.modalSessionInfo.textContent = CONFIG.sessionDates[getRadioValue('session')] || getRadioValue('session');
    }
    if (this.elements.modalModeInfo) {
      this.elements.modalModeInfo.textContent = getSelectText('modeFormationSelect');
    }
    
    if (this.elements.modalPaymentInfo) {
      const paymentMethod = getRadioValue('payment_method');
      this.elements.modalPaymentInfo.textContent = CONFIG.paymentMethodNames[paymentMethod] || paymentMethod;
    }
    
    if (this.elements.modalTotalPrice && this.elements.modalTotalPriceEur) {
      const totalEur = (total / CONFIG.exchangeRate).toFixed(2);
      this.elements.modalTotalPrice.textContent = total.toLocaleString('fr-FR');
      this.elements.modalTotalPriceEur.textContent = totalEur;
    }
    
    // Ajout du montant total dans le champ caché pour Netlify
    if (this.elements.montantTotalInput) {
      const totalEur = (total / CONFIG.exchangeRate).toFixed(2);
      this.elements.montantTotalInput.value = `${total.toLocaleString('fr-FR')} FCFA (≈ ${totalEur} €)`;
    }
    
    // Ajout des attributs ARIA pour l'accessibilité
    this.elements.modal.setAttribute('aria-modal', 'true');
    this.elements.modal.setAttribute('role', 'dialog');
    this.elements.modal.setAttribute('aria-labelledby', 'modal-title');
    
    // Focus sur le premier élément interactif de la modal
    this.elements.modal.style.display = 'block';
    if (this.elements.modalConfirm) {
      this.elements.modalConfirm.focus();
    }
  }
  
  // Fonctions d'envoi
  async sendFormData() {
    if (this.state.isSubmitting || this.state.formSubmitted || !this.elements.registrationForm) return;
    this.state.isSubmitting = true;
    this.state.formSubmitted = true;
    
    if (this.elements.modal) {
      this.elements.modal.style.display = 'none';
    }
    if (this.elements.loadingIndicator) {
      this.elements.loadingIndicator.style.display = 'block';
    }
    if (this.elements.submitBtn) {
      this.elements.submitBtn.disabled = true;
      this.elements.submitBtn.textContent = "Envoi en cours...";
    }
    
    try {
      // Préparer les données pour Google Sheets
      const formData = new FormData(this.elements.registrationForm);
      const formDataObj = {};
      formData.forEach((value, key) => {
        formDataObj[key] = value;
      });

      // Envoyer les données à Google Sheets
      await this.sendToGoogleSheets(formDataObj);

      // Initialiser et envoyer les emails de confirmation
      await this.initEmailJS();
      await this.sendConfirmationEmails(formDataObj);

      // Soumettre le formulaire à Netlify
      this.submitToNetlify();

    } catch (error) {
      console.error('Erreur:', error);
      this.saveToLocalStorage();
      
      // Afficher un message d'erreur
      const errorMessage = document.createElement('div');
      errorMessage.className = 'error-message';
      errorMessage.setAttribute('role', 'alert');
      errorMessage.setAttribute('aria-live', 'assertive');
      errorMessage.textContent = 'Une erreur est survenue. Veuillez réessayer ou nous contacter si le problème persiste.';
      
      const oldError = document.querySelector('.error-message');
      if (oldError) oldError.remove();
      
      document.body.insertBefore(errorMessage, document.body.firstChild);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      // Réactiver le bouton
      if (this.elements.submitBtn) {
        this.elements.submitBtn.disabled = false;
        this.elements.submitBtn.textContent = "S'inscrire maintenant";
      }
    } finally {
      this.state.isSubmitting = false;
      if (this.elements.loadingIndicator) {
        this.elements.loadingIndicator.style.display = 'none';
      }
      this.state.formSubmitted = false;
    }
  }

  // Initialisation de EmailJS avec gestion de promesse
  async initEmailJS() {
    if (typeof emailjs !== 'undefined') {
      emailjs.init(this.env.EMAILJS_USER_ID);
      return;
    }
    
    return new Promise((resolve, reject) => {
      const emailjsUserId = this.env.EMAILJS_USER_ID;
      if (!emailjsUserId) {
        reject(new Error('Configuration EmailJS incomplète'));
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
      script.onload = () => {
        emailjs.init(emailjsUserId);
        resolve();
      };
      script.onerror = () => {
        reject(new Error('Échec du chargement de EmailJS'));
      };
      document.head.appendChild(script);
    });
  }

  // Soumission du formulaire à Netlify
  submitToNetlify() {
    // Créer un clone du formulaire pour la soumission Netlify
    const netlifyForm = this.elements.registrationForm.cloneNode(true);
    netlifyForm.style.display = 'none';
    netlifyForm.id = 'netlify-submit-form';
    netlifyForm.removeAttribute('data-netlify'); // Éviter les boucles infinies
    
    // Ajouter le formulaire au DOM et le soumettre
    document.body.appendChild(netlifyForm);
    netlifyForm.submit();
    
    // Afficher la page de confirmation après un court délai
    setTimeout(() => {
      this.showConfirmationPage();
      localStorage.removeItem('bteceFormData');
      this.clearForm();
    }, 1000);
  }

  // Envoi des données à Google Sheets avec gestion d'erreur améliorée
  async sendToGoogleSheets(formData) {
    try {
      const response = await fetch(`${this.googleSheetsApiUrl}?key=${this.API_KEY}`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${this.API_TOKEN}`,
          "Content-Type": "application/json",
          "X-Client-Version": "1.0.0" // Optionnel : suivi des versions
        },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString() // Ajout d'un timestamp
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Erreur HTTP ${response.status}: ${errorText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Erreur d'envoi à Google Sheets:", {
        error: error.message,
        formData: { ...formData, telephone: 'REDACTED', email: 'REDACTED' } // Log contrôlé (sans données sensibles)
      });
      
      // Sauvegarder pour une nouvelle tentative
      this.saveForRetry(formData);
      throw error;
    }
  }

  // Sauvegarde des données pour une nouvelle tentative
  saveForRetry(formData) {
    const pendingData = {
      ...formData,
      timestamp: new Date().toISOString(),
      retryCount: 0
    };
    
    const existingPending = localStorage.getItem('pendingRegistrations');
    const pendingRegistrations = existingPending ? JSON.parse(existingPending) : [];
    pendingRegistrations.push(pendingData);
    
    localStorage.setItem('pendingRegistrations', JSON.stringify(pendingRegistrations));
  }

  // Envoi des emails de confirmation via EmailJS avec gestion d'erreur
  async sendConfirmationEmails(formData) {
    const emailjsServiceId = this.env.EMAILJS_SERVICE_ID;
    const emailjsTemplateId = this.env.EMAILJS_TEMPLATE_ID;
    const emailjsAdminTemplateId = this.env.EMAILJS_ADMIN_TEMPLATE_ID;

    if (!emailjsServiceId || !emailjsTemplateId || !emailjsAdminTemplateId) {
      throw new Error('Configuration EmailJS incomplète');
    }

    try {
      // Email à l'utilisateur
      const userEmailParams = {
        to_name: `${formData.prenom} ${formData.nom}`,
        to_email: formData.email,
        formations: formData.formations,
        montant_total: formData.montant_total,
        session: CONFIG.sessionDates[formData.session] || formData.session,
        mode_formation: formData.mode_formation === 'en-ligne' ? 'en ligne' : 'en présentiel',
        payment_method: CONFIG.paymentMethodNames[formData.payment_method] || formData.payment_method
      };

      await emailjs.send(
        emailjsServiceId,
        emailjsTemplateId,
        userEmailParams
      );

      // Email à l'admin
      const adminEmailParams = {
        nom_complet: `${formData.prenom} ${formData.nom}`,
        email: formData.email,
        telephone: `${formData.telephone_prefix || '+229'} ${formData.telephone}`,
        formations: formData.formations,
        montant_total: formData.montant_total,
        session: CONFIG.sessionDates[formData.session] || formData.session,
        mode_formation: formData.mode_formation === 'en-ligne' ? 'en ligne' : 'en présentiel',
        payment_method: CONFIG.paymentMethodNames[formData.payment_method] || formData.payment_method,
        date_inscription: new Date().toLocaleDateString('fr-FR')
      };

      await emailjs.send(
        emailjsServiceId,
        emailjsAdminTemplateId,
        adminEmailParams
      );
    } catch (error) {
      console.error("Erreur d'envoi d'email:", error);
      throw new Error("Impossible d'envoyer les emails de confirmation");
    }
  }
  
  saveToLocalStorage() {
    const formData = {
      nom: this.sanitizeInput(document.getElementById('nom')?.value),
      prenom: this.sanitizeInput(document.getElementById('prenom')?.value),
      email: this.sanitizeInput(document.getElementById('email')?.value),
      dateNaissance: this.sanitizeInput(document.getElementById('date_naissance')?.value),
      lieuNaissance: this.sanitizeInput(document.getElementById('lieu_naissance')?.value),
      pays: this.sanitizeInput(document.getElementById('pays')?.value),
      telephone: this.sanitizeInput(document.getElementById('telephone')?.value),
      profession: document.querySelector('input[name="profession"]:checked')?.value,
      objectifs: this.sanitizeInput(document.getElementById('objectifs')?.value),
      checkedFormations: Array.from(this.elements.checkboxes || [])
        .filter(cb => cb.checked)
        .map(cb => CONFIG.formationNames[cb.value]),
      session: document.querySelector('input[name="session"]:checked')?.value,
      modeFormation: this.elements.modeFormationSelect?.value,
      paymentMethod: document.querySelector('input[name="payment_method"]:checked')?.value,
      total: this.elements.totalPriceFCFA?.textContent,
      timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('pendingRegistration', JSON.stringify(formData));
    
    // Notification accessible
    const notification = document.createElement('div');
    notification.className = 'aria-notification';
    notification.setAttribute('role', 'status');
    notification.setAttribute('aria-live', 'polite');
    notification.textContent = 'Votre inscription a été enregistrée localement. Nous essaierons de la soumettre à nouveau lorsque vous serez en ligne.';
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 5000);
  }
  
  // Fonctions d'affichage des résultats
  showConfirmationPage() {
    if (!this.elements.mainPage || !this.elements.confirmationPage) return;
    
    this.elements.mainPage.style.display = 'none';
    this.elements.confirmationPage.style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    this.displayUserSummary();
    this.simulateTracking();
  }
  
  displayUserSummary() {
    if (!this.elements.userSummary) return;
    
    const getValue = id => this.sanitizeInput(document.getElementById(id)?.value);
    const getRadioValue = name => document.querySelector(`input[name="${name}"]:checked`)?.value;
    const getRadioText = name => {
      const radio = document.querySelector(`input[name="${name}"]:checked`);
      return radio ? this.sanitizeInput(radio.nextElementSibling?.textContent) : '';
    };
    const getSelectText = id => {
      const select = this.elements[id];
      return select ? this.sanitizeInput(select.options[select.selectedIndex]?.text) : '';
    };

    const checkedFormations = Array.from(this.elements.checkboxes || [])
      .filter(cb => cb.checked)
      .map(cb => CONFIG.formationNames[cb.value]);
    
    const total = Array.from(this.elements.checkboxes || [])
      .filter(cb => cb.checked)
      .reduce((sum, cb) => sum + (CONFIG.formationPrices[cb.value] || 0), 0);
    
    const totalEur = (total / CONFIG.exchangeRate).toFixed(2);
    
    this.elements.userSummary.innerHTML = `
      <h4>Récapitulatif de votre inscription</h4>
      <p><strong>Nom complet :</strong> ${getValue('prenom')} ${getValue('nom')}</p>
      <p><strong>Email :</strong> ${getValue('email')}</p>
      <p><strong>Téléphone :</strong> ${this.elements.phonePrefix?.textContent || ''} ${getValue('telephone')}</p>
      <p><strong>Formations :</strong> ${checkedFormations.join(', ')}</p>
      <p><strong>Session :</strong> ${CONFIG.sessionDates[getRadioValue('session')] || getRadioValue('session')}</p>
      <p><strong>Mode :</strong> ${this.elements.modeFormationSelect?.value === 'presentiel' ? 'Présentiel à Cotonou' : 'En ligne'}</p>
      <p><strong>Méthode de paiement :</strong> ${CONFIG.paymentMethodNames[getRadioValue('payment_method')] || getRadioValue('payment_method')}</p>
      <p><strong>Montant total :</strong> ${total.toLocaleString('fr-FR')} FCFA (≈ ${totalEur} €)</p>
      <div class="confirmation-message">
        <p>Un email de confirmation vous a été envoyé à l'adresse ${getValue('email')}.</p>
        <p>Veuillez vérifier votre boîte de réception (et vos spams si vous ne trouvez pas l'email).</p>
      </div>
    `;
  }
  
  simulateTracking() {
    const steps = document.querySelectorAll('.tracking-steps li');
    if (!steps || steps.length === 0) return;
    
    setTimeout(() => {
      steps[1].classList.add('completed');
      steps[2].classList.add('active');
      
      setTimeout(() => {
        steps[2].classList.add('completed');
        steps[3].classList.add('active');
        
        setTimeout(() => {
          steps[3].classList.add('completed');
          steps[4].classList.add('active');
        }, 3000);
      }, 2000);
    }, 1000);
  }
  
  // Fonctions de chat
  sendChatMessage() {
    if (!this.elements.chatInput || !this.elements.chatMessages) return;
    
    const message = this.elements.chatInput.value.trim();
    if (!message) return;
    
    this.addChatMessage(message, 'user');
    this.elements.chatInput.value = '';
    
    setTimeout(() => {
      this.addChatMessage('Merci pour votre message. Veuillez envoyer votre préocupation via notre adresse Mail. Notre équipe vous répondra dans les plus brefs délais.', 'bot');
    }, 1000);
  }
  
  addChatMessage(text, sender) {
    if (!this.elements.chatMessages) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${sender}-message`;
    messageDiv.setAttribute('role', sender === 'user' ? 'status' : 'alert');
    messageDiv.setAttribute('aria-live', 'polite');
    messageDiv.innerHTML = `<p>${this.sanitizeInput(text)}</p>`;
    this.elements.chatMessages.appendChild(messageDiv);
    this.elements.chatMessages.scrollTop = this.elements.chatMessages.scrollHeight;
  }
  
  // Nettoyage
  clearForm() {
    // Réinitialiser tous les champs du formulaire
    if (this.elements.registrationForm) {
      this.elements.registrationForm.reset();
    }
    
    // Réinitialiser les cases à cocher des formations
    if (this.elements.checkboxes) {
      this.elements.checkboxes.forEach(checkbox => {
        checkbox.checked = false;
      });
    }
    
    // Réinitialiser les boutons radio
    document.querySelectorAll('input[type="radio"]').forEach(radio => {
      radio.checked = false;
    });
    
    // Réinitialiser les sélecteurs
    if (this.elements.paysSelect) {
      this.elements.paysSelect.selectedIndex = 0;
      this.elements.paysSelect.dispatchEvent(new Event('change'));
    }
    
    if (this.elements.modeFormationSelect) {
      this.elements.modeFormationSelect.selectedIndex = 0;
      this.elements.modeFormationSelect.dispatchEvent(new Event('change'));
    }
    
    // Réinitialiser les affichages de prix
    if (this.elements.priceDisplay) {
      this.elements.priceDisplay.style.display = 'none';
    }
    
    if (this.elements.totalPriceFCFA) {
      this.elements.totalPriceFCFA.textContent = '0';
    }
    
    if (this.elements.totalPriceEUR) {
      this.elements.totalPriceEUR.textContent = '0';
    }
    
    if (this.elements.submitBtn) {
      this.elements.submitBtn.textContent = "S'inscrire maintenant";
    }
    
    // Réinitialiser le compteur de mots
    if (this.elements.objectifsCounter) {
      this.elements.objectifsCounter.textContent = '0/100 mots';
      this.elements.objectifsCounter.style.color = '#666';
    }
    
    // Réinitialiser les styles des champs
    if (this.elements.objectifsTextarea) {
      this.elements.objectifsTextarea.style.borderColor = '#ddd';
      this.elements.objectifsTextarea.classList.remove('invalid', 'valid');
    }
    
    if (this.elements.dateNaissanceInput) {
      this.elements.dateNaissanceInput.style.borderColor = '#ddd';
    }
    
    // Réinitialiser les messages d'erreur
    if (this.elements.ageError) {
      this.elements.ageError.style.display = 'none';
    }
    
    const objectifsError = document.getElementById('objectifs-error');
    if (objectifsError) {
      objectifsError.style.display = 'none';
    }
    
    const objectifsErrorIcon = document.getElementById('objectifs-error-icon');
    if (objectifsErrorIcon) {
      objectifsErrorIcon.style.display = 'none';
    }
    
    // Réinitialiser les messages d'erreur globaux
    const oldError = document.querySelector('.error-message');
    if (oldError) oldError.remove();
    
    // Réinitialiser le statut de sauvegarde
    if (this.elements.saveStatus) {
      this.elements.saveStatus.style.display = 'none';
    }
    
    // Réinitialiser l'étape courante
    this.state.currentStep = 1;
    this.showStep(1);
    
    // Supprimer toutes les données sauvegardées
    localStorage.removeItem('bteceFormData');
    localStorage.removeItem('pendingRegistration');
    localStorage.removeItem('pendingRegistrations');
  }
}

// Configuration des numéros de téléphone par pays
const phoneConfigurations = {
    // Afrique
    'DZ': { code: '+213', pattern: '[0-9]{9}', format: '+213 XX XXX XXXX' },
    'AO': { code: '+244', pattern: '[0-9]{9}', format: '+244 XXX XXX XXX' },
    'BJ': { code: '+229', pattern: '[0-9]{10}', format: '+229 XX XX XX XX' },
    'BW': { code: '+267', pattern: '[0-9]{7}', format: '+267 XX XXX XXX' },
    'BF': { code: '+226', pattern: '[0-9]{8}', format: '+226 XX XX XX XX' },
    'BI': { code: '+257', pattern: '[0-9]{8}', format: '+257 XX XX XX XX' },
    'CM': { code: '+237', pattern: '[0-9]{8}', format: '+237 6XX XX XX XX' },
    'CV': { code: '+238', pattern: '[0-9]{7}', format: '+238 XXX XX XX' },
    'CF': { code: '+236', pattern: '[0-9]{8}', format: '+236 XX XX XX XX' },
    'TD': { code: '+235', pattern: '[0-9]{8}', format: '+235 XX XX XX XX' },
    'KM': { code: '+269', pattern: '[0-9]{7}', format: '+269 XXX XX XX' },
    'CG': { code: '+242', pattern: '[0-9]{9}', format: '+242 XX XXX XXX' },
    'CD': { code: '+243', pattern: '[0-9]{9}', format: '+243 XXX XXX XXX' },
    'CI': { code: '+225', pattern: '[0-9]{8}', format: '+225 XX XX XX XX' },
    'DJ': { code: '+253', pattern: '[0-9]{8}', format: '+253 XX XX XX XX' },
    'EG': { code: '+20', pattern: '[0-9]{10}', format: '+20 XXXX XXX XXXX' },
    'GQ': { code: '+240', pattern: '[0-9]{9}', format: '+240 XX XXX XXX' },
    'ER': { code: '+291', pattern: '[0-9]{7}', format: '+291 X XXX XXX' },
    'SZ': { code: '+268', pattern: '[0-9]{8}', format: '+268 XX XX XX XX' },
    'ET': { code: '+251', pattern: '[0-9]{9}', format: '+251 XX XXX XXXX' },
    'GA': { code: '+241', pattern: '[0-9]{7}', format: '+241 X XX XX XX' },
    'GM': { code: '+220', pattern: '[0-9]{7}', format: '+220 XXX XX XX' },
    'GH': { code: '+233', pattern: '[0-9]{9}', format: '+233 XX XXX XXXX' },
    'GN': { code: '+224', pattern: '[0-9]{8}', format: '+224 XX XX XX XX' },
    'GW': { code: '+245', pattern: '[0-9]{7}', format: '+245 XXX XX XX' },
    'KE': { code: '+254', pattern: '[0-9]{9}', format: '+254 XXX XXX XXX' },
    'LS': { code: '+266', pattern: '[0-9]{8}', format: '+266 XX XX XX XX' },
    'LR': { code: '+231', pattern: '[0-9]{7}', format: '+231 XX XXX XXX' },
    'LY': { code: '+218', pattern: '[0-9]{9}', format: '+218 XX XXX XXXX' },
    'MG': { code: '+261', pattern: '[0-9]{9}', format: '+261 XX XX XXX XX' },
    'MW': { code: '+265', pattern: '[0-9]{9}', format: '+265 X XXX XXXX' },
    'ML': { code: '+223', pattern: '[0-9]{8}', format: '+223 XX XX XX XX' },
    'MR': { code: '+222', pattern: '[0-9]{8}', format: '+222 XX XX XX XX' },
    'MU': { code: '+230', pattern: '[0-9]{7}', format: '+230 XXX XXXX' },
    'YT': { code: '+262', pattern: '[0-9]{9}', format: '+262 XXX XXX XXX' },
    'MA': { code: '+212', pattern: '[0-9]{9}', format: '+212 X XXX XXXX' },
    'MZ': { code: '+258', pattern: '[0-9]{9}', format: '+258 XX XXX XXX' },
    'NA': { code: '+264', pattern: '[0-9]{9}', format: '+264 XX XXX XXXX' },
    'NE': { code: '+227', pattern: '[0-9]{8}', format: '+227 XX XX XX XX' },
    'NG': { code: '+234', pattern: '[0-9]{10}', format: '+234 XXX XXX XXXX' },
    'RE': { code: '+262', pattern: '[0-9]{9}', format: '+262 XXX XXX XXX' },
    'RW': { code: '+250', pattern: '[0-9]{9}', format: '+250 XXX XXX XXX' },
    'SH': { code: '+290', pattern: '[0-9]{4}', format: '+290 XXXX' },
    'ST': { code: '+239', pattern: '[0-9]{7}', format: '+239 XX XX XXX' },
    'SN': { code: '+221', pattern: '[0-9]{9}', format: '+221 XX XXX XX XX' },
    'SC': { code: '+248', pattern: '[0-9]{7}', format: '+248 X XXX XXX' },
    'SL': { code: '+232', pattern: '[0-9]{8}', format: '+232 XX XXX XXX' },
    'SO': { code: '+252', pattern: '[0-9]{8}', format: '+252 XX XXX XXX' },
    'ZA': { code: '+27', pattern: '[0-9]{9}', format: '+27 XX XXX XXXX' },
    'SS': { code: '+211', pattern: '[0-9]{9}', format: '+211 XX XXX XXXX' },
    'SD': { code: '+249', pattern: '[0-9]{9}', format: '+249 XX XXX XXXX' },
    'TZ': { code: '+255', pattern: '[0-9]{9}', format: '+255 XX XXX XXXX' },
    'TG': { code: '+228', pattern: '[0-9]{8}', format: '+228 XX XX XX XX' },
    'TN': { code: '+216', pattern: '[0-9]{8}', format: '+216 XX XXX XXX' },
    'UG': { code: '+256', pattern: '[0-9]{9}', format: '+256 XXX XXX XXX' },
    'EH': { code: '+212', pattern: '[0-9]{9}', format: '+212 X XXX XXXX' },
    'ZM': { code: '+260', pattern: '[0-9]{9}', format: '+260 XX XXX XXXX' },
    'ZW': { code: '+263', pattern: '[0-9]{9}', format: '+263 XX XXX XXXX' },

    // Amérique
    'US': { code: '+1', pattern: '[0-9]{10}', format: '+1 (XXX) XXX-XXXX' },
    'CA': { code: '+1', pattern: '[0-9]{10}', format: '+1 (XXX) XXX-XXXX' },
    'MX': { code: '+52', pattern: '[0-9]{10}', format: '+52 XXX XXX XXXX' },
    'BR': { code: '+55', pattern: '[0-9]{10,11}', format: '+55 XX XXXX XXXX' },
    'AR': { code: '+54', pattern: '[0-9]{10}', format: '+54 XXX XXX XXXX' },
    'CL': { code: '+56', pattern: '[0-9]{9}', format: '+56 X XXX XXXX' },
    'CO': { code: '+57', pattern: '[0-9]{10}', format: '+57 XXX XXX XXXX' },
    'PE': { code: '+51', pattern: '[0-9]{9}', format: '+51 XXX XXX XXX' },
    'VE': { code: '+58', pattern: '[0-9]{10}', format: '+58 XXX XXX XXXX' },
    'BO': { code: '+591', pattern: '[0-9]{8}', format: '+591 XXXX XXXX' },
    'EC': { code: '+593', pattern: '[0-9]{9}', format: '+593 XX XXX XXXX' },
    'PY': { code: '+595', pattern: '[0-9]{9}', format: '+595 XXX XXX XXX' },
    'UY': { code: '+598', pattern: '[0-9]{8}', format: '+598 XX XXX XXX' },
    'CR': { code: '+506', pattern: '[0-9]{8}', format: '+506 XXXX XXXX' },
    'PA': { code: '+507', pattern: '[0-9]{8}', format: '+507 XXXX XXXX' },
    'DO': { code: '+1', pattern: '[0-9]{10}', format: '+1 XXX XXX XXXX' },
    'CU': { code: '+53', pattern: '[0-9]{8}', format: '+53 X XXX XXXX' },
    'GT': { code: '+502', pattern: '[0-9]{8}', format: '+502 XXXX XXXX' },
    'HN': { code: '+504', pattern: '[0-9]{8}', format: '+504 XXXX XXXX' },
    'NI': { code: '+505', pattern: '[0-9]{8}', format: '+505 XXXX XXXX' },
    'SV': { code: '+503', pattern: '[0-9]{8}', format: '+503 XXXX XXXX' },
    'HT': { code: '+509', pattern: '[0-9]{8}', format: '+509 XX XX XXXX' },
    'JM': { code: '+1', pattern: '[0-9]{10}', format: '+1 XXX XXX XXXX' },
    'TT': { code: '+1', pattern: '[0-9]{10}', format: '+1 XXX XXX XXXX' },
    'BZ': { code: '+501', pattern: '[0-9]{7}', format: '+501 XXX XXXX' },
    'GY': { code: '+592', pattern: '[0-9]{7}', format: '+592 XXX XXXX' },
    'SR': { code: '+597', pattern: '[0-9]{7}', format: '+597 XXX XXXX' },

    // Asie
    'AF': { code: '+93', pattern: '[0-9]{9}', format: '+93 XX XXX XXXX' },
    'AM': { code: '+374', pattern: '[0-9]{8}', format: '+374 XX XXX XXX' },
    'AZ': { code: '+994', pattern: '[0-9]{9}', format: '+994 XX XXX XX XX' },
    'BH': { code: '+973', pattern: '[0-9]{8}', format: '+973 XXXX XXXX' },
    'BD': { code: '+880', pattern: '[0-9]{10}', format: '+880 XX XXX XXXX' },
    'BT': { code: '+975', pattern: '[0-9]{7,8}', format: '+975 XX XXX XX' },
    'BN': { code: '+673', pattern: '[0-9]{7}', format: '+673 XXX XXXX' },
    'KH': { code: '+855', pattern: '[0-9]{8,9}', format: '+855 XX XXX XXX' },
    'CN': { code: '+86', pattern: '[0-9]{11}', format: '+86 XXX XXXX XXXX' },
    'CY': { code: '+357', pattern: '[0-9]{8}', format: '+357 XX XXX XXX' },
    'GE': { code: '+995', pattern: '[0-9]{9}', format: '+995 XXX XXX XXX' },
    'IN': { code: '+91', pattern: '[0-9]{10}', format: '+91 XXXX XXX XXX' },
    'ID': { code: '+62', pattern: '[0-9]{9,11}', format: '+62 XXX XXX XXX' },
    'IR': { code: '+98', pattern: '[0-9]{10}', format: '+98 XXX XXX XXXX' },
    'IQ': { code: '+964', pattern: '[0-9]{10}', format: '+964 XXX XXX XXXX' },
    'IL': { code: '+972', pattern: '[0-9]{9}', format: '+972 X XXX XXXX' },
    'JP': { code: '+81', pattern: '[0-9]{10}', format: '+81 XX XXXX XXXX' },
    'JO': { code: '+962', pattern: '[0-9]{9}', format: '+962 X XXX XXXX' },
    'KZ': { code: '+7', pattern: '[0-9]{10}', format: '+7 XXX XXX XX XX' },
    'KW': { code: '+965', pattern: '[0-9]{8}', format: '+965 XXXX XXXX' },
    'KG': { code: '+996', pattern: '[0-9]{9}', format: '+996 XXX XXX XXX' },
    'LA': { code: '+856', pattern: '[0-9]{9,10}', format: '+856 XX XXX XXXX' },
    'LB': { code: '+961', pattern: '[0-9]{7,8}', format: '+961 XX XXX XXX' },
    'MY': { code: '+60', pattern: '[0-9]{9,10}', format: '+60 X XXX XXX' },
    'MV': { code: '+960', pattern: '[0-9]{7}', format: '+960 XXX XXXX' },
    'MN': { code: '+976', pattern: '[0-9]{8}', format: '+976 XX XX XXXX' },
    'MM': { code: '+95', pattern: '[0-9]{8,10}', format: '+95 XX XXX XXXX' },
    'NP': { code: '+977', pattern: '[0-9]{10}', format: '+977 XXX XXX XXXX' },
    'KP': { code: '+850', pattern: '[0-9]{9,10}', format: '+850 XXX XXX XXXX' },
    'OM': { code: '+968', pattern: '[0-9]{8}', format: '+968 XXXX XXXX' },
    'PK': { code: '+92', pattern: '[0-9]{10}', format: '+92 XXX XXX XXXX' },
    'PS': { code: '+970', pattern: '[0-9]{9}', format: '+970 XX XXX XXXX' },
    'PH': { code: '+63', pattern: '[0-9]{10}', format: '+63 XXX XXX XXXX' },
    'QA': { code: '+974', pattern: '[0-9]{8}', format: '+974 XXXX XXXX' },
    'SA': { code: '+966', pattern: '[0-9]{9}', format: '+966 X XXX XXXX' },
    'SG': { code: '+65', pattern: '[0-9]{8}', format: '+65 XXXX XXXX' },
    'KR': { code: '+82', pattern: '[0-9]{9,10}', format: '+82 XX XXXX XXXX' },
    'LK': { code: '+94', pattern: '[0-9]{9}', format: '+94 XX XXX XXXX' },
    'SY': { code: '+963', pattern: '[0-9]{9}', format: '+963 XX XXX XXXX' },
    'TW': { code: '+886', pattern: '[0-9]{9}', format: '+886 X XXX XXX' },
    'TJ': { code: '+992', pattern: '[0-9]{9}', format: '+992 XX XXX XXXX' },
    'TH': { code: '+66', pattern: '[0-9]{9}', format: '+66 XX XXX XXXX' },
    'TL': { code: '+670', pattern: '[0-9]{8}', format: '+670 XXX XXXX' },
    'TR': { code: '+90', pattern: '[0-9]{10}', format: '+90 XXX XXX XXXX' },
    'TM': { code: '+993', pattern: '[0-9]{8}', format: '+993 XX XXX XX' },
    'AE': { code: '+971', pattern: '[0-9]{9}', format: '+971 X XXX XXXX' },
    'UZ': { code: '+998', pattern: '[0-9]{9}', format: '+998 XX XXX XXXX' },
    'VN': { code: '+84', pattern: '[0-9]{9,10}', format: '+84 XX XXXX XXXX' },
    'YE': { code: '+967', pattern: '[0-9]{9}', format: '+967 X XXX XXXX' },

    // Europe
    'AL': { code: '+355', pattern: '[0-9]{9}', format: '+355 XX XXX XXXX' },
    'AD': { code: '+376', pattern: '[0-9]{6}', format: '+376 XXX XXX' },
    'AT': { code: '+43', pattern: '[0-9]{10,11}', format: '+43 X XXX XXXX' },
    'BY': { code: '+375', pattern: '[0-9]{9}', format: '+375 XX XXX XX XX' },
    'BE': { code: '+32', pattern: '[0-9]{9}', format: '+32 X XXX XX XX' },
    'BA': { code: '+387', pattern: '[0-9]{8}', format: '+387 XX XXX XXX' },
    'BG': { code: '+359', pattern: '[0-9]{9}', format: '+359 XX XXX XXX' },
    'HR': { code: '+385', pattern: '[0-9]{9}', format: '+385 XX XXX XXXX' },
    'CZ': { code: '+420', pattern: '[0-9]{9}', format: '+420 XXX XXX XXX' },
    'DK': { code: '+45', pattern: '[0-9]{8}', format: '+45 XX XX XX XX' },
    'EE': { code: '+372', pattern: '[0-9]{7,8}', format: '+372 XXXX XXXX' },
    'FO': { code: '+298', pattern: '[0-9]{6}', format: '+298 XXX XXX' },
    'FI': { code: '+358', pattern: '[0-9]{9,10}', format: '+358 XX XXX XXXX' },
    'FR': { code: '+33', pattern: '[0-9]{9}', format: '+33 X XX XX XX XX' },
    'DE': { code: '+49', pattern: '[0-9]{10,11}', format: '+49 XXX XXXX XXXX' },
    'GI': { code: '+350', pattern: '[0-9]{8}', format: '+350 XXX XXX' },
    'GR': { code: '+30', pattern: '[0-9]{10}', format: '+30 XXX XXX XXXX' },
    'GG': { code: '+44', pattern: '[0-9]{10}', format: '+44 XXXX XXX XXX' },
    'HU': { code: '+36', pattern: '[0-9]{9}', format: '+36 XX XXX XXXX' },
    'IS': { code: '+354', pattern: '[0-9]{7}', format: '+354 XXX XXXX' },
    'IE': { code: '+353', pattern: '[0-9]{9}', format: '+353 XX XXX XXXX' },
    'IM': { code: '+44', pattern: '[0-9]{10}', format: '+44 XXXX XXX XXX' },
    'IT': { code: '+39', pattern: '[0-9]{9,10}', format: '+39 XXX XXX XXXX' },
    'JE': { code: '+44', pattern: '[0-9]{10}', format: '+44 XXXX XXX XXX' },
    'XK': { code: '+383', pattern: '[0-9]{8}', format: '+383 XX XXX XXX' },
    'LV': { code: '+371', pattern: '[0-9]{8}', format: '+371 XX XXX XXX' },
    'LI': { code: '+423', pattern: '[0-9]{7}', format: '+423 XXX XXXX' },
    'LT': { code: '+370', pattern: '[0-9]{8}', format: '+370 XX XXX XXX' },
    'LU': { code: '+352', pattern: '[0-9]{9}', format: '+352 XXX XXX XXX' },
    'MT': { code: '+356', pattern: '[0-9]{8}', format: '+356 XXXX XXXX' },
    'MD': { code: '+373', pattern: '[0-9]{8}', format: '+373 XX XXX XXX' },
    'MC': { code: '+377', pattern: '[0-9]{8,9}', format: '+377 X XXX XXX' },
    'ME': { code: '+382', pattern: '[0-9]{8}', format: '+382 XX XXX XXX' },
    'NL': { code: '+31', pattern: '[0-9]{9}', format: '+31 X XXX XXX' },
    'MK': { code: '+389', pattern: '[0-9]{8}', format: '+389 XX XXX XXX' },
    'NO': { code: '+47', pattern: '[0-9]{8}', format: '+47 XXX XX XXX' },
    'PL': { code: '+48', pattern: '[0-9]{9}', format: '+48 XXX XXX XXX' },
    'PT': { code: '+351', pattern: '[0-9]{9}', format: '+351 XXX XXX XXX' },
    'RO': { code: '+40', pattern: '[0-9]{9}', format: '+40 XX XXX XXXX' },
    'RU': { code: '+7', pattern: '[0-9]{10}', format: '+7 XXX XXX XX XX' },
    'SM': { code: '+378', pattern: '[0-9]{10}', format: '+378 XXX XXX XXXX' },
    'RS': { code: '+381', pattern: '[0-9]{8,9}', format: '+381 XX XXX XXXX' },
    'SK': { code: '+421', pattern: '[0-9]{9}', format: '+421 XXX XXX XXX' },
    'SI': { code: '+386', pattern: '[0-9]{8}', format: '+386 XX XXX XXX' },
    'ES': { code: '+34', pattern: '[0-9]{9}', format: '+34 XXX XXX XXX' },
    'SE': { code: '+46', pattern: '[0-9]{9}', format: '+46 XX XXX XXXX' },
    'CH': { code: '+41', pattern: '[0-9]{9}', format: '+41 XX XXX XXXX' },
    'UA': { code: '+380', pattern: '[0-9]{9}', format: '+380 XX XXX XXXX' },
    'GB': { code: '+44', pattern: '[0-9]{10}', format: '+44 XXXX XXX XXX' },
    'VA': { code: '+379', pattern: '[0-9]{10}', format: '+379 XXX XXX XXXX' },

    // Océanie
    'AS': { code: '+1', pattern: '[0-9]{10}', format: '+1 XXX XXX XXXX' },
    'AU': { code: '+61', pattern: '[0-9]{9}', format: '+61 X XXX XXX XXX' },
    'CK': { code: '+682', pattern: '[0-9]{5}', format: '+682 XX XXX' },
    'FJ': { code: '+679', pattern: '[0-9]{7}', format: '+679 XXX XXXX' },
    'PF': { code: '+689', pattern: '[0-9]{8}', format: '+689 XX XX XX' },
    'GU': { code: '+1', pattern: '[0-9]{10}', format: '+1 XXX XXX XXXX' },
    'KI': { code: '+686', pattern: '[0-9]{5}', format: '+686 XXX XX' },
    'MH': { code: '+692', pattern: '[0-9]{7}', format: '+692 XXX XXXX' },
    'FM': { code: '+691', pattern: '[0-9]{7}', format: '+691 XXX XXXX' },
    'NR': { code: '+674', pattern: '[0-9]{7}', format: '+674 XXX XXXX' },
    'NC': { code: '+687', pattern: '[0-9]{6}', format: '+687 XXX XXX' },
    'NZ': { code: '+64', pattern: '[0-9]{9}', format: '+64 X XXX XXXX' },
    'NU': { code: '+683', pattern: '[0-9]{4}', format: '+683 XXXX' },
    'NF': { code: '+672', pattern: '[0-9]{5}', format: '+672 XX XXX' },
    'MP': { code: '+1', pattern: '[0-9]{10}', format: '+1 XXX XXX XXXX' },
    'PW': { code: '+680', pattern: '[0-9]{7}', format: '+680 XXX XXXX' },
    'PG': { code: '+675', pattern: '[0-9]{8}', format: '+675 XXX X XXXX' },
    'PN': { code: '+64', pattern: '[0-9]{9}', format: '+64 X XXX XXXX' },
    'WS': { code: '+685', pattern: '[0-9]{7}', format: '+685 XX XXX' },
    'SB': { code: '+677', pattern: '[0-9]{7}', format: '+677 XXX XXXX' },
    'TK': { code: '+690', pattern: '[0-9]{4}', format: '+690 XXXX' },
    'TO': { code: '+676', pattern: '[0-9]{7}', format: '+676 XXX XXXX' },
    'TV': { code: '+688', pattern: '[0-9]{5}', format: '+688 XX XXX' },
    'VU': { code: '+678', pattern: '[0-9]{7}', format: '+678 XXX XXXX' },
    'WF': { code: '+681', pattern: '[0-9]{6}', format: '+681 XX XX XX' },

    // Autres
    'AQ': { code: '+672', pattern: '[0-9]{5}', format: '+672 XX XXX' },
    'BV': { code: '+47', pattern: '[0-9]{8}', format: '+47 XXX XX XXX' },
    'IO': { code: '+246', pattern: '[0-9]{7}', format: '+246 XXX XXXX' },
    'CX': { code: '+61', pattern: '[0-9]{9}', format: '+61 X XXX XXX XXX' },
    'CC': { code: '+61', pattern: '[0-9]{9}', format: '+61 X XXX XXX XXX' },
    'HM': { code: '+672', pattern: '[0-9]{5}', format: '+672 XX XXX' },
    'GS': { code: '+500', pattern: '[0-9]{5}', format: '+500 XX XXX' },
    'UM': { code: '+1', pattern: '[0-9]{10}', format: '+1 XXX XXX XXXX' },
    'TF': { code: '+262', pattern: '[0-9]{9}', format: '+262 XXX XXX XXX' },

    // Option par défaut pour les pays non listés
    'other': { code: '+', pattern: '[0-9]{8,15}', format: '+XXX XXX XXXX' }
};

// Lance l'application lorsque le DOM est chargé
document.addEventListener('DOMContentLoaded', () => {
  const app = new FormApp();
  
  // Exposer les fonctions nécessaires globalement
  window.validateStep = (step) => app.validateStep(step);
  window.prevStep = (current) => app.prevStep(current);
  window.nextStep = (current) => app.nextStep(current);
  window.validateFinalStep = () => app.validateFinalStep();
});