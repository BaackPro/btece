
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