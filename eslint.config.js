module.exports = [
    {
        // On cible tous les fichiers JavaScript
        files: ["**/*.js"],
        
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "commonjs",
            // On déclare les variables globales pour Node.js et Jest pour éviter les fausses erreurs "undefined"
            globals: {
                console: "readonly",
                process: "readonly",
                module: "readonly",
                require: "readonly",
                __dirname: "readonly",
                describe: "readonly",
                it: "readonly",
                expect: "readonly",
                beforeEach: "readonly"
            }
        },
        
        rules: {
            "semi": ["error", "always"],       // Point-virgule obligatoire
            "quotes": ["error", "single"],     // Guillemets simples obligatoires
            "no-unused-vars": "warn",          // Avertissement si une variable n'est pas utilisée
            "no-undef": "error"                // Erreur si on utilise une variable non déclarée
        }
    }
];