module.exports = [
    {
        // On analyse tous les fichiers JS du projet
        files: ["**/*.js"],
        
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "commonjs",
            globals: {
                // Variables globales Node.js
                process: "readonly",
                module: "readonly",
                require: "readonly",
                console: "readonly",
                // Variables globales Jest (pour le dossier tests)
                describe: "readonly",
                it: "readonly",
                expect: "readonly",
                beforeEach: "readonly"
            }
        },
        
        rules: {
            // 1. Pas de variables inutilisées (erreur bloquante)
            "no-unused-vars": "error",
            
            // 2. Indentation cohérente (ici configurée sur 4 espaces)
            "indent": ["error", 4],
            
            // 3. Pas de console.log oubliés
            "no-console": "error",

            // Règles bonus de bonnes pratiques
            "semi": ["error", "always"],
            "quotes": ["error", "single"]
        }
    }
];