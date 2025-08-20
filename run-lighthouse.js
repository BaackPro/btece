

import chromeLauncher from 'chrome-launcher';
import lighthouse from 'lighthouse';
import fs from 'fs';
import { execSync } from 'child_process';

async function run() {
  try {
    console.log('Lancement de Chrome...');
    const chrome = await chromeLauncher.launch({
      chromePath: '/usr/bin/google-chrome',
      chromeFlags: ['--headless', '--no-sandbox', '--disable-gpu']
    });
    
    console.log('Chrome lancé sur le port:', chrome.port);
    console.log('Exécution de Lighthouse...');
    
    const results = await lighthouse('http://localhost:3000', {
      port: chrome.port,
      output: 'html',
      onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo']
    });
    
    await chrome.kill();
    
    // Sauvegarder le rapport
    fs.writeFileSync('lighthouse-report.html', results.report);
    console.log('Rapport généré: lighthouse-report.html');
    
    // Essayer d'ouvrir le rapport
    try {
      execSync('xdg-open lighthouse-report.html 2>/dev/null || echo "Ouvrez manuellement lighthouse-report.html"');
    } catch (e) {
      console.log('Ouvrez le fichier lighthouse-report.html dans votre navigateur');
    }
    
  } catch (error) {
    console.error('Erreur détaillée:', error.message);
    if (error.stack) console.error(error.stack);
  }
}

run();