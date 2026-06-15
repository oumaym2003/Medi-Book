import Doctor from "../models/Doctor.js";
import Appointment from "../models/Appointment.js";

// Tous les créneaux possibles d'une journée (à adapter selon tes besoins)
const ALL_SLOTS = ["08:30", "09:00", "09:30", "10:00", "11:00", "14:00", "14:30", "15:30", "16:00"];

// GET /api/doctors?specialty=&city=
export async function getDoctors(req, res) {
  try {
    const { specialty, city } = req.query;
    const filter = {};
    if (specialty) filter.specialty = specialty;
    if (city) filter.city = city;
    const doctors = await Doctor.find(filter);
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur.", error: err.message });
  }
}

// GET /api/doctors/:id
export async function getDoctor(req, res) {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).json({ message: "Médecin introuvable." });
    res.json(doctor);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur.", error: err.message });
  }
}

// GET /api/doctors/:id/slots?date=YYYY-MM-DD
// Renvoie chaque créneau avec un indicateur "taken" (déjà réservé ce jour-là).
export async function getSlots(req, res) {
  try {
    const { id } = req.params;
    const { date } = req.query;
    const booked = await Appointment.find({ doctor: id, date, status: "À venir" }).select("slot");
    const takenSet = new Set(booked.map((a) => a.slot));
    res.json(ALL_SLOTS.map((time) => ({ time, taken: takenSet.has(time) })));
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur.", error: err.message });
  }
}
