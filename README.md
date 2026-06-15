# MediBook 🩺

Plateforme de prise de rendez-vous médicaux en ligne.
Projet full-stack : **React** (frontend) + **Node.js / Express / MongoDB** (backend).

---

## ✨ Fonctionnalités

- Recherche de médecins par spécialité et par ville
- Profil détaillé de chaque médecin
- Calendrier de réservation avec créneaux disponibles
- Authentification (inscription / connexion) sécurisée par JWT
- Tableau de bord patient : voir et annuler ses rendez-vous
- Protection contre la double réservation d'un même créneau

---

## 🗂️ Structure du projet

```
medibook/
├── frontend/          # Application React (Vite)
│   └── src/
│       ├── components/   # Navbar, Footer, DoctorCard, ProtectedRoute
│       ├── pages/        # Home, Doctors, DoctorProfile, Login, Dashboard
│       ├── context/      # AuthContext (état de connexion global)
│       ├── services/     # api.js (appels Axios vers le backend)
│       └── data/         # mock.js (données simulées)
└── backend/           # API REST Node + Express
    ├── config/        # connexion MongoDB
    ├── models/        # User, Doctor, Appointment (Mongoose)
    ├── controllers/   # logique métier
    ├── routes/        # définition des endpoints
    ├── middleware/    # vérification du JWT
    └── seed.js        # remplit la base avec des médecins de test
```

---

## 🚀 Lancer le projet

### Prérequis
- Node.js 18+
- MongoDB (en local, ou un compte gratuit MongoDB Atlas)

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env        # puis remplis les valeurs dans .env
npm run seed                # ajoute les médecins de test
npm run dev                 # démarre l'API sur http://localhost:5000
```

### 2. Frontend

```bash
cd frontend
npm install
npm run dev                 # démarre l'app sur http://localhost:5173
```

> 💡 Le frontend fonctionne **seul** par défaut (données simulées).
> Pour le brancher au backend : dans `frontend/src/services/api.js`,
> passe `USE_MOCK` à `false`.

---

## 🔌 Endpoints de l'API

| Méthode | Route                         | Description                  | Auth |
|---------|-------------------------------|------------------------------|------|
| POST    | `/api/auth/register`          | Créer un compte              | ❌   |
| POST    | `/api/auth/login`             | Se connecter                 | ❌   |
| GET     | `/api/doctors`                | Liste des médecins (filtres) | ❌   |
| GET     | `/api/doctors/:id`            | Détail d'un médecin          | ❌   |
| GET     | `/api/doctors/:id/slots`      | Créneaux d'un jour           | ❌   |
| POST    | `/api/appointments`           | Réserver un rendez-vous      | ✅   |
| GET     | `/api/appointments`           | Mes rendez-vous              | ✅   |
| PATCH   | `/api/appointments/:id/cancel`| Annuler un rendez-vous       | ✅   |

---

## 🌍 Déploiement

- **Frontend** : Vercel ou Netlify
- **Backend** : Render ou Railway
- **Base de données** : MongoDB Atlas (gratuit)

Pense à définir la variable `VITE_API_URL` (frontend) et les variables
du fichier `.env` (backend) dans les paramètres de ta plateforme d'hébergement.

---

## 🧰 Stack technique

**Frontend** : React, React Router, Axios, Vite, lucide-react
**Backend** : Node.js, Express, MongoDB, Mongoose, JWT, bcrypt
