import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    patient: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
    date: { type: String, required: true }, // ex : "2026-06-20"
    slot: { type: String, required: true }, // ex : "09:30"
    status: { type: String, enum: ["À venir", "Annulé", "Terminé"], default: "À venir" },
  },
  { timestamps: true }
);

// Empêche la double réservation : un même médecin ne peut avoir
// qu'un seul rendez-vous actif pour une date + un créneau donnés.
appointmentSchema.index(
  { doctor: 1, date: 1, slot: 1 },
  { unique: true, partialFilterExpression: { status: "À venir" } }
);

export default mongoose.model("Appointment", appointmentSchema);
