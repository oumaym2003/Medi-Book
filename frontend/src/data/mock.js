// Données simulées — utilisées tant que le backend n'est pas branché.
// Quand ton backend tourne, mets USE_MOCK = false dans services/api.js.

export const SPECIALTIES = [
  "Médecine générale", "Cardiologie", "Dermatologie", "Pédiatrie",
  "ORL", "Ophtalmologie", "Gynécologie", "Dentiste",
];

export const CITIES = ["Tunis", "Ariana", "Sfax", "Sousse", "Nabeul", "Monastir"];

export const DOCTORS = [
  { id: 1, name: "Dr. Amel Ben Salah", specialty: "Cardiologie", city: "Tunis", rating: 4.9, reviews: 128, fee: 60, bio: "Cardiologue, 12 ans d'expérience. Suivi de l'hypertension et des maladies coronariennes." },
  { id: 2, name: "Dr. Karim Trabelsi", specialty: "Dermatologie", city: "Sfax", rating: 4.7, reviews: 94, fee: 50, bio: "Dermatologue spécialisé en dermatologie esthétique et maladies de la peau." },
  { id: 3, name: "Dr. Sonia Mabrouk", specialty: "Pédiatrie", city: "Ariana", rating: 5.0, reviews: 210, fee: 45, bio: "Pédiatre, suivi du nourrisson et de l'enfant, vaccination et nutrition." },
  { id: 4, name: "Dr. Hatem Gharbi", specialty: "ORL", city: "Sousse", rating: 4.6, reviews: 71, fee: 55, bio: "Oto-rhino-laryngologiste, troubles de l'audition et pathologies tympaniques." },
  { id: 5, name: "Dr. Ines Khelifi", specialty: "Médecine générale", city: "Tunis", rating: 4.8, reviews: 156, fee: 35, bio: "Médecin généraliste, médecine de famille et bilans de santé complets." },
  { id: 6, name: "Dr. Mehdi Aouadi", specialty: "Ophtalmologie", city: "Nabeul", rating: 4.5, reviews: 63, fee: 50, bio: "Ophtalmologue, examens de la vue, prescription et suivi du glaucome." },
];

export const SLOTS = ["08:30", "09:00", "09:30", "10:00", "11:00", "14:00", "14:30", "15:30", "16:00"];

// Créneaux déjà réservés (pour la démo)
export const TAKEN = ["09:00", "14:00", "16:00"];
