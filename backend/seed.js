import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Doctor from "./models/Doctor.js";
import mongoose from "mongoose";

dotenv.config();

const doctors = [
  { name: "Dr. Amel Ben Salah", specialty: "Cardiologie", city: "Tunis", rating: 4.9, reviews: 128, fee: 60, bio: "Cardiologue, 12 ans d'expérience. Suivi de l'hypertension et des maladies coronariennes." },
  { name: "Dr. Karim Trabelsi", specialty: "Dermatologie", city: "Sfax", rating: 4.7, reviews: 94, fee: 50, bio: "Dermatologue spécialisé en dermatologie esthétique et maladies de la peau." },
  { name: "Dr. Sonia Mabrouk", specialty: "Pédiatrie", city: "Ariana", rating: 5.0, reviews: 210, fee: 45, bio: "Pédiatre, suivi du nourrisson et de l'enfant, vaccination et nutrition." },
  { name: "Dr. Hatem Gharbi", specialty: "ORL", city: "Sousse", rating: 4.6, reviews: 71, fee: 55, bio: "Oto-rhino-laryngologiste, troubles de l'audition et pathologies tympaniques." },
  { name: "Dr. Ines Khelifi", specialty: "Médecine générale", city: "Tunis", rating: 4.8, reviews: 156, fee: 35, bio: "Médecin généraliste, médecine de famille et bilans de santé complets." },
  { name: "Dr. Mehdi Aouadi", specialty: "Ophtalmologie", city: "Nabeul", rating: 4.5, reviews: 63, fee: 50, bio: "Ophtalmologue, examens de la vue, prescription et suivi du glaucome." },
];

async function seed() {
  await connectDB();
  await Doctor.deleteMany();
  await Doctor.insertMany(doctors);
  console.log(`✅ ${doctors.length} médecins ajoutés à la base.`);
  await mongoose.connection.close();
  process.exit(0);
}

seed();
