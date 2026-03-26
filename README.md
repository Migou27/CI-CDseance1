# 🎓 TP CI/CD Seance 1 - API Annuaire d'Étudiants

[![CI Status](https://github.com/Migou27/CI-CDseance1/actions/workflows/ci.yml/badge.svg)](https://github.com/Migou27/CI-CDseance1/actions)
![Coverage](https://img.shields.io/badge/Coverage-100%25-brightgreen.svg?style=flat-square)
![Last Commit](https://img.shields.io/github/last-commit/Migou27/CI-CDseance1?style=flat-square&color=blue)

![JavaScript](https://img.shields.io/github/languages/top/Migou27/CI-CDseance1?style=flat-square&color=F7DF1E&logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?style=flat-square&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-5.x-000000?style=flat-square&logo=express&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-29.x-C21325?style=flat-square&logo=jest&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-9.x-4B32C3?style=flat-square&logo=eslint&logoColor=white)

![Repo Size](https://img.shields.io/github/repo-size/Migou27/CI-CDseance1?style=flat-square)
![Issues](https://img.shields.io/github/issues/Migou27/CI-CDseance1?style=flat-square)
![Pull Requests](https://img.shields.io/github/issues-pr/Migou27/CI-CDseance1?style=flat-square)
![License](https://img.shields.io/github/license/Migou27/CI-CDseance1?style=flat-square)
![Maintained](https://img.shields.io/badge/Maintained%3F-yes-green.svg?style=flat-square)

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