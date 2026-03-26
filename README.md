# 🎓 TP CI/CD Seance 1 - API Annuaire d'Étudiants

[![Node.js CI](https://github.com/Migou27/CI-CDseance1/actions/workflows/ci.yml/badge.svg)](https://github.com/Migou27/CI-CDseance1/actions)
![Coverage](https://img.shields.io/badge/Coverage-100%25-brightgreen.svg)
![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)
![Node.js](https://img.shields.io/badge/Node.js-20.x-green?logo=node.js)
![Express](https://img.shields.io/badge/Express-5.x-black?logo=express)
![Jest](https://img.shields.io/badge/Jest-Tests_Automatisés-C21325?logo=jest)

Une API RESTful développée en Node.js et Express pour gérer un annuaire d'étudiants en mémoire. Ce projet valide les concepts de CI/CD, de tests automatisés (Jest) et de qualité de code (ESLint).

---

## 🚀 Démarrage rapide

**1. Installer les dépendances :**
`npm install`

**2. Lancer le serveur :**
`npm start` (Le serveur écoutera sur http://localhost:3000)

**3. Lancer les tests et voir le coverage :**
`npm run test`

**4. Lancer le linter :**
`npm run lint`

---

## 📚 Documentation des Endpoints

Toutes les requêtes doivent être préfixées par `/api/students`.

### 1. Lister tous les étudiants
* **Route :** `GET /api/students`
* **Pagination :** `?page=1&limit=10` (Pagination) et `?sort=grade&order=desc` (Tri)
* **Code succès :** 200

### 2. Statistiques de la promo
* **Route :** `GET /api/students/stats`
* **Retourne :** Nombre total, moyenne générale, répartition par filière et le meilleur étudiant.

### 3. Recherche
* **Route :** `GET /api/students/search?q=motcle`
* **Code erreur :** 400 si le paramètre 'q' est vide.

### 4. Obtenir un étudiant via son ID
* **Route :** `GET /api/students/:id`
* **Code erreur :** 404 (Non trouvé) ou 400 (ID invalide).

### 5. Créer un étudiant
* **Route :** `POST /api/students`
* **Contraintes :** Prénom/nom > 2 caractères, email valide et unique, note entre 0 et 20, filière exacte (informatique, mathématiques, physique, chimie).
* **Codes erreur :** 400 (Validation) ou 409 (Email déjà pris).
* **Code succès :** 201

### 6. Modifier un étudiant
* **Route :** `PUT /api/students/:id`
* **Codes erreur :** 404, 400, ou 409.

### 7. Supprimer un étudiant
* **Route :** `DELETE /api/students/:id`
* **Code succès :** 200 (Avec message de confirmation).