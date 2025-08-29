
const fs = require('fs');
const path = require('path');

console.log('✅ Démarrage de l\'optimisation des images...');

const inputDir = process.argv.includes('--input-dir') 
  ? process.argv[process.argv.indexOf('--input-dir') + 1]
  : 'assets/images';

const outputDir = process.argv.includes('--output-dir')
  ? process.argv[process.argv.indexOf('--output-dir') + 1]
  : 'images';

// Vérifier si le dossier existe
if (!fs.existsSync(inputDir)) {
  console.log(`⚠️  Dossier non trouvé: ${inputDir}`);
  console.log('ℹ️  Utilisez --input-dir pour spécifier un autre dossier');
  process.exit(0);
}

// Créer le dossier de sortie
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
  console.log(`📁 Dossier créé: ${outputDir}`);
}

// Copier les images sans optimisation
const files = fs.readdirSync(inputDir);
const imageFiles = files.filter(file => 
  /\.(jpg|jpeg|png|gif|webp|avif)$/i.test(file)
);

if (imageFiles.length === 0) {
  console.log('ℹ️  Aucune image trouvée');
  process.exit(0);
}

console.log(`📋 ${imageFiles.length} image(s) trouvée(s)`);

imageFiles.forEach(file => {
  const source = path.join(inputDir, file);
  const destination = path.join(outputDir, file);
  
  fs.copyFileSync(source, destination);
  console.log(`✅ Copiée: ${file}`);
});

console.log('🎉 Images copiées avec succès !');
process.exit(0);