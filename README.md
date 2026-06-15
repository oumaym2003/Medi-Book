# MediBook 🩺

MediBook est une application de prise de rendez-vous médicaux en ligne réalisée en full-stack avec **React** pour le frontend et **Node.js / Express / MongoDB** pour le backend.

## Aperçu

Le projet permet de rechercher des médecins, consulter leurs profils, voir les créneaux disponibles, créer un compte, se connecter et réserver ou annuler un rendez-vous.

## Fonctionnalités

- Recherche de médecins par spécialité et par ville
- Fiche détaillée pour chaque médecin
- Affichage des créneaux disponibles
- Inscription et connexion sécurisées par JWT
- Tableau de bord patient pour consulter et annuler ses rendez-vous
- Protection contre la double réservation d'un créneau

## Architecture

```
medibook/
├── frontend/          # Application React (Vite)
│   └── src/
│       ├── components/   # Navbar, Footer, DoctorCard, ProtectedRoute
│       ├── pages/        # Home, Doctors, DoctorProfile, Login, Dashboard
│       ├── context/      # AuthContext
│       ├── services/     # api.js (Axios)
│       └── data/         # mock.js (données simulées)
└── backend/           # API REST Node + Express
    ├── config/        # connexion MongoDB
    ├── models/        # User, Doctor, Appointment
    ├── controllers/   # logique métier
    ├── routes/        # endpoints API
    ├── middleware/    # vérification JWT
    └── seed.js        # données de test pour les médecins
```

## Démarrage local

### Prérequis

- Node.js 18+
- MongoDB local ou MongoDB Atlas

### Backend

```bash
cd backend
npm install
copy .env.example .env
npm run seed
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## État du projet

- Le frontend fonctionne par défaut avec des données simulées via `frontend/src/services/api.js`.
- Pour utiliser le backend réel, passe `USE_MOCK` à `false`.
- Pense à définir `MONGO_URI`, `JWT_SECRET`, `CLIENT_URL` et éventuellement `VITE_API_URL` avant un déploiement.

## API

| Méthode | Route                          | Description                   | Auth |
|---------|--------------------------------|-------------------------------|------|
| POST    | `/api/auth/register`           | Créer un compte               | Non  |
| POST    | `/api/auth/login`              | Se connecter                  | Non  |
| GET     | `/api/doctors`                 | Liste des médecins            | Non  |
| GET     | `/api/doctors/:id`             | Détail d'un médecin           | Non  |
| GET     | `/api/doctors/:id/slots`       | Créneaux disponibles          | Non  |
| POST    | `/api/appointments`            | Réserver un rendez-vous       | Oui  |
| GET     | `/api/appointments`            | Mes rendez-vous               | Oui  |
| PATCH   | `/api/appointments/:id/cancel` | Annuler un rendez-vous        | Oui  |

## Déploiement

- Frontend : Netlify ou Vercel
- Backend : Render ou Railway
- Base de données : MongoDB Atlas

Pour un déploiement frontend sur Netlify, configure `VITE_API_URL` vers l'URL publique du backend.

## Stack technique

- Frontend : React, React Router, Axios, Vite, lucide-react
- Backend : Node.js, Express, MongoDB, Mongoose, JWT, bcrypt
