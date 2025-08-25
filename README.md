# Registrar2026

Gestion des inscriptions et du suivi académique des étudiants pour UAZ Campus.

## Fonctionnalités

- Inscription des étudiants avec formulaire multi-étapes
- Tableau de bord affichant le nombre d’étudiants inscrits
- Liste des étudiants et détails
- Mode sombre / clair mémorisé
- Navigation moderne avec Inertia.js et React
- Interface responsive et moderne

## Installation

1. **Cloner le projet**
   ```
   git clone https://github.com/rHaryLala/registrar2026.git
   cd registrar2026
   ```

2. **Installer les dépendances PHP et JS**
   ```
   composer install
   npm install
   ```

3. **Configurer l’environnement**
   - Copier `.env.example` en `.env` et adapter les paramètres (base de données, etc.)
   - Générer la clé d’application :
     ```
     php artisan key:generate
     ```

4. **Créer la base de données et lancer les migrations**
   ```
   php artisan migrate
   ```

5. **Lancer le serveur de développement**
   ```
   php artisan serve
   npm run dev
   ```

## Structure principale

- `resources/js/pages/` : Pages React (dashboard, students, welcome, etc.)
- `resources/js/components/` : Composants réutilisables (breadcrumbs, modals, transitions…)
- `database/migrations/` : Migrations des tables (students, parents, etc.)

## Personnalisation

- Le thème sombre/clair est mémorisé automatiquement.
- Les styles sont basés sur Tailwind CSS et Shadcn UI.

## Contribuer

Les contributions sont les bienvenues !  
Merci de proposer vos améliorations via des pull requests.

## Licence

Ce projet est sous licence MIT.
