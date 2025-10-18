#!/usr/bin/env node
/**
 * Script d'analyse du bundle pour identifier les optimisations possibles
 * Usage: node scripts/bundleAnalysis.js
 */

const fs = require('fs');
const path = require('path');

console.log('📊 Analyse du bundle MatchDay App\n');

// Analyse des imports dans le projet
function analyzeImports(dir = './') {
    const results = {
        totalFiles: 0,
        heavyDependencies: new Map(),
        unusedImports: [],
        duplicateImports: new Map(),
        externalLibs: new Map()
    };

    function scanDirectory(directory) {
        const files = fs.readdirSync(directory, { withFileTypes: true });
        
        for (const file of files) {
            const filePath = path.join(directory, file.name);
            
            if (file.isDirectory()) {
                // Skip node_modules, .git, etc.
                if (!['node_modules', '.git', '.expo', 'dist', 'build'].includes(file.name)) {
                    scanDirectory(filePath);
                }
            } else if (file.name.match(/\.(js|jsx|ts|tsx)$/)) {
                results.totalFiles++;
                analyzeFile(filePath);
            }
        }
    }

    function analyzeFile(filePath) {
        try {
            const content = fs.readFileSync(filePath, 'utf-8');
            const lines = content.split('\n');
            
            // Analyse des imports
            lines.forEach((line, index) => {
                // Import statements
                if (line.trim().startsWith('import')) {
                    const importMatch = line.match(/from\s+['"`]([^'"`]+)['"`]/);
                    if (importMatch) {
                        const importPath = importMatch[1];
                        
                        // Bibliothèques externes (dans node_modules)
                        if (!importPath.startsWith('.') && !importPath.startsWith('/')) {
                            const libName = importPath.split('/')[0];
                            results.externalLibs.set(libName, (results.externalLibs.get(libName) || 0) + 1);
                        }
                        
                        // Détection des imports lourds
                        const heavyLibs = [
                            'react-native-vector-icons',
                            'react-native-svg',
                            'react-native-video',
                            'react-native-maps',
                            'lodash',
                            '@react-navigation',
                            'moment'
                        ];
                        
                        if (heavyLibs.some(lib => importPath.includes(lib))) {
                            if (!results.heavyDependencies.has(importPath)) {
                                results.heavyDependencies.set(importPath, []);
                            }
                            results.heavyDependencies.get(importPath).push({
                                file: filePath,
                                line: index + 1
                            });
                        }
                        
                        // Détection des imports dupliqués
                        const key = `${filePath}:${importPath}`;
                        results.duplicateImports.set(key, (results.duplicateImports.get(key) || 0) + 1);
                    }
                }
                
                // Variables inutilisées (simple heuristique)
                const importVarMatch = line.match(/import\s+(\{[^}]+\}|\w+)/);
                if (importVarMatch) {
                    const importedVars = importVarMatch[1];
                    // Check si ces variables sont utilisées dans le fichier
                    // Ici on fait une vérification basique
                    if (importedVars.includes('{')) {
                        const vars = importedVars.replace(/[{}]/g, '').split(',').map(v => v.trim());
                        vars.forEach(varName => {
                            if (varName && !content.includes(varName.split(' as ')[0], line.length)) {
                                results.unusedImports.push({
                                    file: filePath,
                                    line: index + 1,
                                    variable: varName
                                });
                            }
                        });
                    }
                }
            });
        } catch (error) {
            console.warn(`⚠️ Erreur lecture ${filePath}:`, error.message);
        }
    }

    scanDirectory(dir);
    return results;
}

// Analyse de la taille des fichiers
function analyzeFileSizes(dir = './') {
    const results = [];
    
    function scanFiles(directory) {
        const files = fs.readdirSync(directory, { withFileTypes: true });
        
        for (const file of files) {
            const filePath = path.join(directory, file.name);
            
            if (file.isDirectory()) {
                if (!['node_modules', '.git', '.expo', 'dist', 'build'].includes(file.name)) {
                    scanFiles(filePath);
                }
            } else if (file.name.match(/\.(js|jsx|ts|tsx|json)$/)) {
                const stats = fs.statSync(filePath);
                results.push({
                    path: filePath,
                    size: stats.size,
                    sizeKB: Math.round(stats.size / 1024 * 100) / 100
                });
            }
        }
    }
    
    scanFiles(dir);
    return results.sort((a, b) => b.size - a.size);
}

// Recommandations d'optimisation
function generateRecommendations(importAnalysis, fileAnalysis) {
    const recommendations = [];
    
    // 1. Bibliothèques les plus utilisées
    const topLibs = Array.from(importAnalysis.externalLibs.entries())
        .sort(([,a], [,b]) => b - a)
        .slice(0, 10);
    
    if (topLibs.length > 0) {
        recommendations.push({
            type: 'libraries',
            title: '📚 Bibliothèques les plus importées',
            items: topLibs.map(([lib, count]) => `${lib} (${count} fois)`)
        });
    }
    
    // 2. Dépendances lourdes
    if (importAnalysis.heavyDependencies.size > 0) {
        recommendations.push({
            type: 'heavy',
            title: '🏋️ Dépendances lourdes détectées',
            items: Array.from(importAnalysis.heavyDependencies.entries()).map(([lib, usages]) => 
                `${lib} utilisé dans ${usages.length} fichier(s)`
            )
        });
    }
    
    // 3. Fichiers les plus volumineux
    const bigFiles = fileAnalysis.slice(0, 10);
    if (bigFiles.length > 0) {
        recommendations.push({
            type: 'files',
            title: '📄 Fichiers les plus volumineux',
            items: bigFiles.map(file => `${file.path} (${file.sizeKB} KB)`)
        });
    }
    
    // 4. Optimisations spécifiques à React Native / Expo
    recommendations.push({
        type: 'expo',
        title: '🚀 Optimisations Expo recommandées',
        items: [
            'Utiliser expo-image au lieu de react-native Image',
            'Implémenter React.lazy() pour le code splitting',
            'Optimiser les images avec expo-optimize',
            'Utiliser expo-sqlite pour le cache local',
            'Configurer expo-updates pour les mises à jour OTA'
        ]
    });
    
    return recommendations;
}

// Exécution principale
async function main() {
    try {
        console.log('🔍 Analyse des imports...');
        const importAnalysis = analyzeImports('./');
        
        console.log('📏 Analyse des tailles de fichiers...');
        const fileAnalysis = analyzeFileSizes('./');
        
        console.log('💡 Génération des recommandations...\n');
        const recommendations = generateRecommendations(importAnalysis, fileAnalysis);
        
        // Affichage des résultats
        console.log('='.repeat(60));
        console.log('📊 RÉSULTATS DE L\'ANALYSE');
        console.log('='.repeat(60));
        
        console.log(`\n📈 Statistiques générales:`);
        console.log(`   • Fichiers analysés: ${importAnalysis.totalFiles}`);
        console.log(`   • Bibliothèques externes: ${importAnalysis.externalLibs.size}`);
        console.log(`   • Dépendances lourdes: ${importAnalysis.heavyDependencies.size}`);
        
        // Total des tailles
        const totalSize = fileAnalysis.reduce((sum, file) => sum + file.size, 0);
        console.log(`   • Taille totale du code: ${Math.round(totalSize / 1024)} KB`);
        
        console.log('\n' + '='.repeat(60));
        
        recommendations.forEach(rec => {
            console.log(`\n${rec.title}:`);
            rec.items.forEach((item, i) => {
                console.log(`   ${i + 1}. ${item}`);
            });
        });
        
        // Conseils spécifiques
        console.log('\n' + '='.repeat(60));
        console.log('💯 CONSEILS D\'OPTIMISATION PRIORITAIRES');
        console.log('='.repeat(60));
        
        console.log('\n🎯 Actions immédiates:');
        console.log('   1. Implémenter le lazy loading pour les modals lourdes');
        console.log('   2. Utiliser React.memo() pour les composants qui re-render souvent');
        console.log('   3. Mettre en cache les appels API avec une stratégie TTL');
        console.log('   4. Optimiser les images (WebP, tailles adaptatives)');
        console.log('   5. Utiliser un contexte global pour éviter le props drilling');
        
        console.log('\n🔧 Améliorations techniques:');
        console.log('   1. Migrer vers TypeScript pour de meilleures performances');
        console.log('   2. Configurer un bundler plus efficace');
        console.log('   3. Utiliser des libraries tree-shakeable');
        console.log('   4. Implémenter un système de cache persistent');
        
        console.log('\n✨ Analyse terminée!\n');
        
    } catch (error) {
        console.error('❌ Erreur lors de l\'analyse:', error);
        process.exit(1);
    }
}

if (require.main === module) {
    main();
}

module.exports = { analyzeImports, analyzeFileSizes, generateRecommendations };