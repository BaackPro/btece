

// Configuration des données
const CONFIG = {
  formationPrices: {
    'plans_archi_elec': 130000,
    'conception_elec': 150000,
    'realisation_3d': 120000,
    'programmation': 200000
  },
  exchangeRate: 655.957,
  stepTimes: [60, 30, 30, 30, 30],
  formationNames: {
    'plans_archi_elec': 'Réalisation de plans architecturaux et électricité',
    'conception_elec': 'Conception électronique',
    'realisation_3d': 'Réalisation 3D',
    'programmation': 'Programmation'
  },
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
  sessionDates: {
    'juillet': 'Juillet 2025',
    'aout': 'Août 2025',
    'septembre': 'Septembre 2025',
    'octobre': 'Octobre 2025',
    'novembre': 'Novembre 2025',
    'decembre': 'Décembre 2025'
  }
};

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
    
    this.initElements();
    this.initEventListeners();
    this.initForm();
  }
  
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
      rappelContainer: document.querySelector('.rappel-container'),
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
  
  initEventListeners() {
    document.addEventListener('change', (e) => {
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
      
      if (e.target.matches('input[name="selected_courses[]"]')) {
        this.calculateTotal();
      }
      
      if (e.target === this.elements.dateNaissanceInput) {
        this.validateAge();
      }
      
      if (e.target === this.elements.objectifsTextarea) {
        this.updateWordCounter();
      }
      
      if (e.target.matches('input, select, textarea')) {
        clearTimeout(this.state.saveTimeout);
        this.state.saveTimeout = setTimeout(() => this.autoSave(), 1000);
      }
    });
    
    document.addEventListener('input', (e) => {
      if (e.target.matches('input, select, textarea')) {
        clearTimeout(this.state.saveTimeout);
        this.state.saveTimeout = setTimeout(() => this.autoSave(), 1000);
      }
      
      if (e.target === this.elements.objectifsTextarea) {
        this.updateWordCounter();
      }
    });
    
    if (this.elements.registrationForm) {
      this.elements.registrationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.validateFinalStep();
      });
    }
    
    if (this.elements.modalConfirm) {
      this.elements.modalConfirm.addEventListener('click', () => {
        if (this.validateAllSteps()) {
          this.sendFormData();
        } else {
          const errorDiv = document.createElement('div');
          errorDiv.className = 'error-message';
          errorDiv.textContent = 'Veuillez corriger les erreurs dans le formulaire avant de confirmer.';
          errorDiv.setAttribute('role', 'alert');
          
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
  
  initForm() {
    if (this.elements.dateNaissanceInput) {
      const today = new Date();
      const maxDate = new Date(today.getFullYear() - 13, today.getMonth(), today.getDate());
      this.elements.dateNaissanceInput.max = maxDate.toISOString().split('T')[0];
    }
    
    this.generateCSRFToken();
    this.loadSavedData();
    this.updateProgressBar();
    this.updateTimeEstimation();
    this.displaySessionDates();
    
    if (this.elements.rappelMessages && this.elements.rappelMessages.length > 0) {
      setInterval(() => this.rotateRappelMessages(), 2000);
    }
    
    this.updateWordCounter();
    this.calculateTotal();
  }
  
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
    
    this.announceStepChange(step);
    
    const currentStep = document.getElementById(`form-step-${step}`);
    if (currentStep) {
      const firstInput = currentStep.querySelector('input, select, textarea');
      if (firstInput) firstInput.focus();
    }
  }
  
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
      
      if (this.state.formData.formations?.length > 0 && this.elements.checkboxes) {
        this.state.formData.formations.forEach(formation => {
          const checkbox = document.querySelector(`input[name="selected_courses[]"][value="${this.sanitizeInput(formation)}"]`);
          if (checkbox) checkbox.checked = true;
        });
        this.calculateTotal();
      }
      
      checkRadio('session', this.state.formData.session);
      
      if (this.state.formData.modeFormation && this.elements.modeFormationSelect) {
        this.elements.modeFormationSelect.value = this.state.formData.modeFormation;
        this.elements.modeFormationSelect.dispatchEvent(new Event('change'));
      }
      
      checkRadio('payment_method', this.state.formData.paymentMethod);
      
      if (this.state.formData.consentement && this.elements.consentementCheckbox) {
        this.elements.consentementCheckbox.checked = true;
      }
      
      if (this.state.formData.step) {
        this.showStep(this.state.formData.step);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des données sauvegardées:', error);
      localStorage.removeItem('bteceFormData');
    }
  }
  
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
    
    if (!this.validateAge()) {
      errors.push('Vous devez avoir au moins 13 ans pour vous inscrire');
    }

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

    if (!document.querySelector('input[name="profession"]:checked')) {
      errors.push('Veuillez sélectionner une profession');
    }

    return errors;
  }
  
  validateContactInfo() {
    const errors = [];
    
    if (!this.elements.paysSelect?.value) {
      errors.push('Veuillez sélectionner un pays');
      if (this.elements.paysSelect) this.elements.paysSelect.setAttribute('aria-invalid', 'true');
    } else if (this.elements.paysSelect) {
      this.elements.paysSelect.setAttribute('aria-invalid', 'false');
    }
    
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
      
      const oldError = document.querySelector('.error-message');
      if (oldError) oldError.remove();
      
      const stepElement = this.elements.formSteps[step - 1];
      if (stepElement) {
        stepElement.insertBefore(errorContainer, stepElement.firstChild);
      }
      
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
      
      const oldError = document.querySelector('.error-message');
      if (oldError) oldError.remove();
      
      const secondStep = this.elements.formSteps[1];
      if (secondStep) {
        secondStep.insertBefore(errorMessage, secondStep.firstChild);
      }
      
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
    const errorMessages = [];
    let isValid = true;

    if (!document.querySelector('input[name="payment_method"]:checked')) {
      errorMessages.push('Veuillez sélectionner une méthode de paiement');
      isValid = false;
    }

    const modeFormation = this.elements.modeFormationSelect?.value;
    const paymentMethod = document.querySelector('input[name="payment_method"]:checked')?.value;

    if (modeFormation === 'presentiel' && paymentMethod !== 'Paiement sur place') {
      errorMessages.push('Pour le mode présentiel, seule la méthode "Paiement sur place" est acceptée');
      isValid = false;
    }

    if (modeFormation === 'en-ligne' && paymentMethod === 'Paiement sur place') {
      errorMessages.push('Pour le mode en ligne, le "Paiement sur place" n\'est pas accepté');
      isValid = false;
    }

    return this.displayErrors(errorMessages, 4);
  }
  
  validateStep5() {
    const errorMessages = [];
    let isValid = true;

    if (!this.elements.consentementCheckbox?.checked) {
      errorMessages.push('Veuillez accepter les conditions générales');
      isValid = false;
    }

    return this.displayErrors(errorMessages, 5);
  }
  
  validateFinalStep() {
    const isStep1Valid = this.validateStep1();
    const isStep2Valid = this.validateStep2();
    const isStep3Valid = this.validateStep3();
    const isStep4Valid = this.validateStep4();
    const isStep5Valid = this.validateStep5();

    if (!isStep1Valid) this.showStep(1);
    else if (!isStep2Valid) this.showStep(2);
    else if (!isStep3Valid) this.showStep(3);
    else if (!isStep4Valid) this.showStep(4);
    else if (!isStep5Valid) this.showStep(5);
    else {
      this.showConfirmationModal();
      return true;
    }

    return false;
  }
  
  validateAllSteps() {
    return this.validateStep1() && 
           this.validateStep2() && 
           this.validateStep3() && 
           this.validateStep4() && 
           this.validateStep5();
  }
  
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
    
    if (this.elements.montantTotalInput) {
      const totalEur = (total / CONFIG.exchangeRate).toFixed(2);
      this.elements.montantTotalInput.value = `${total.toLocaleString('fr-FR')} FCFA (≈ ${totalEur} €)`;
    }
    
    this.elements.modal.setAttribute('aria-modal', 'true');
    this.elements.modal.setAttribute('role', 'dialog');
    this.elements.modal.setAttribute('aria-labelledby', 'modal-title');
    
    this.elements.modal.style.display = 'block';
    if (this.elements.modalConfirm) {
      this.elements.modalConfirm.focus();
    }
  }
  
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
      const formData = new FormData(this.elements.registrationForm);
      const formDataObj = {};
      formData.forEach((value, key) => {
        formDataObj[key] = value;
      });

      if (this.isMobileDevice()) {
        this.sendEmailMobile(formDataObj);
      } else {
        this.redirectToGmail(formDataObj);
      }

      setTimeout(() => {
        window.location.href = 'confirmation.html';
      }, 2000);

    } catch (error) {
      console.error('Erreur:', error);
      
      const errorMessage = document.createElement('div');
      errorMessage.className = 'error-message';
      errorMessage.setAttribute('role', 'alert');
      errorMessage.setAttribute('aria-live', 'assertive');
      errorMessage.textContent = 'Une erreur est survenue. Veuillez réessayer ou nous contacter si le problème persiste.';
      
      const oldError = document.querySelector('.error-message');
      if (oldError) oldError.remove();
      
      document.body.insertBefore(errorMessage, document.body.firstChild);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
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

  isMobileDevice() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i;
    const hasTouchScreen = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isSmallScreen = window.innerWidth < 768;
    const isMobileOrientation = window.orientation !== undefined;
    
    return mobileRegex.test(userAgent) || hasTouchScreen || isSmallScreen || isMobileOrientation;
  }

  redirectToGmail(formData) {
    const email = 'contactbtece@gmail.com';
    const subject = 'Nouvelle inscription aux formations BTECE EDUCATION';
    
    let body = `Nouvelle inscription reçue :\n\n`;
    body += `Nom complet: ${formData.prenom} ${formData.nom}\n`;
    body += `Email: ${formData.email}\n`;
    body += `Téléphone: ${formData.telephone}\n`;
    body += `Date de naissance: ${formData.date_naissance}\n`;
    body += `Lieu de naissance: ${formData.lieu_naissance}\n`;
    body += `Pays: ${formData.pays}\n`;
    body += `Profession: ${formData.profession}\n`;
    body += `Objectifs: ${formData.objectifs}\n\n`;
    
    body += `Formations sélectionnées:\n`;
    const formations = Array.isArray(formData['selected_courses[]']) ? 
      formData['selected_courses[]'] : [formData['selected_courses[]']];
    formations.forEach(formation => {
      body += `- ${CONFIG.formationNames[formation]}\n`;
    });
    
    body += `\nSession: ${CONFIG.sessionDates[formData.session]}\n`;
    body += `Mode: ${formData.mode_formation}\n`;
    body += `Méthode de paiement: ${CONFIG.paymentMethodNames[formData.payment_method]}\n`;
    body += `Montant total: ${formData.montant_total}\n`;
    
    const encodedSubject = encodeURIComponent(subject);
    const encodedBody = encodeURIComponent(body);
    
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodedSubject}&body=${encodedBody}`, '_blank');
  }

  sendEmailMobile(formData) {
    const email = 'contactbtece@gmail.com';
    const subject = 'Nouvelle inscription aux formations B-TECH EDUCATION';
    
    let body = `Nouvelle inscription reçue :\n\n`;
    body += `Nom complet: ${formData.prenom} ${formData.nom}\n`;
    body += `Email: ${formData.email}\n`;
    body += `Téléphone: ${formData.telephone}\n`;
    body += `Date de naissance: ${formData.date_naissance}\n`;
    body += `Lieu de naissance: ${formData.lieu_naissance}\n`;
    body += `Pays: ${formData.pays}\n`;
    body += `Profession: ${formData.profession}\n`;
    body += `Objectifs: ${formData.objectifs}\n\n`;
    
    body += `Formations sélectionnées:\n`;
    const formations = Array.isArray(formData['selected_courses[]']) ? 
      formData['selected_courses[]'] : [formData['selected_courses[]']];
    formations.forEach(formation => {
      body += `- ${CONFIG.formationNames[formation]}\n`;
    });
    
    body += `\nSession: ${CONFIG.sessionDates[formData.session]}\n`;
    body += `Mode: ${formData.mode_formation}\n`;
    body += `Méthode de paiement: ${CONFIG.paymentMethodNames[formData.payment_method]}\n`;
    body += `Montant total: ${formData.montant_total}\n`;
    
    const encodedSubject = encodeURIComponent(subject);
    const encodedBody = encodeURIComponent(body);
    
    window.location.href = `mailto:${email}?subject=${encodedSubject}&body=${encodedBody}`;
  }
  
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
        <p>Votre inscription a été envoyée avec succès.</p>
        <p>Notre équipe vous contactera bientôt pour finaliser votre inscription.</p>
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
  
  clearForm() {
    if (this.elements.registrationForm) {
      this.elements.registrationForm.reset();
    }
    
    if (this.elements.checkboxes) {
      this.elements.checkboxes.forEach(checkbox => {
        checkbox.checked = false;
      });
    }
    
    document.querySelectorAll('input[type="radio"]').forEach(radio => {
      radio.checked = false;
    });
    
    if (this.elements.paysSelect) {
      this.elements.paysSelect.selectedIndex = 0;
      this.elements.paysSelect.dispatchEvent(new Event('change'));
    }
    
    if (this.elements.modeFormationSelect) {
      this.elements.modeFormationSelect.selectedIndex = 0;
      this.elements.modeFormationSelect.dispatchEvent(new Event('change'));
    }
    
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
    
    if (this.elements.objectifsCounter) {
      this.elements.objectifsCounter.textContent = '0/100 mots';
      this.elements.objectifsCounter.style.color = '#666';
    }
    
    if (this.elements.objectifsTextarea) {
      this.elements.objectifsTextarea.style.borderColor = '#ddd';
      this.elements.objectifsTextarea.classList.remove('invalid', 'valid');
    }
    
    if (this.elements.dateNaissanceInput) {
      this.elements.dateNaissanceInput.style.borderColor = '#ddd';
    }
    
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
    
    const oldError = document.querySelector('.error-message');
    if (oldError) oldError.remove();
    
    if (this.elements.saveStatus) {
      this.elements.saveStatus.style.display = 'none';
    }
    
    this.state.currentStep = 1;
    this.showStep(1);
    
    localStorage.removeItem('bteceFormData');
  }
}

const phoneConfigurations = {
    'DZ': { code: '+213', pattern: '[0-9]{9}', format: '+213 XX XXX XXXX' },
    'AO': { code: '+244', pattern: '[0-9]{9}', format: '+244 XXX XXX XXX' },
    'BJ': { code: '+229', pattern: '[0-9]{10}', format: '+229 XX XX XX XX' },
    'other': { code: '+', pattern: '[0-9]{8,15}', format: '+XXX XXX XXXX' }
};

document.addEventListener('DOMContentLoaded', () => {
  const app = new FormApp();
  
  window.validateStep = (step) => app.validateStep(step);
  window.prevStep = (current) => app.prevStep(current);
  window.nextStep = (current) => app.nextStep(current);
  window.validateFinalStep = () => app.validateFinalStep();
});