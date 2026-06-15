import Appointment from "../models/Appointment.js";

// POST /api/appointments   (protégé)
// Body : { doctor, date, slot }
export async function createAppointment(req, res) {
  try {
    const { doctor, date, slot } = req.body;
    if (!doctor || !date || !slot) {
      return res.status(400).json({ message: "Médecin, date et créneau sont requis." });
    }
    const appt = await Appointment.create({
      patient: req.user._id,
      doctor,
      date,
      slot,
    });
    const populated = await appt.populate("doctor");
    res.status(201).json(populated);
  } catch (err) {
    // Code 11000 = violation d'index unique => créneau déjà pris
    if (err.code === 11000) {
      return res.status(409).json({ message: "Ce créneau vient d'être réservé. Choisissez-en un autre." });
    }
    res.status(500).json({ message: "Erreur serveur.", error: err.message });
  }
}

// GET /api/appointments   (protégé) — rendez-vous du patient connecté
export async function getMyAppointments(req, res) {
  try {
    const appts = await Appointment.find({ patient: req.user._id })
      .populate("doctor")
      .sort({ createdAt: -1 });
    res.json(appts);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur.", error: err.message });
  }
}

// PATCH /api/appointments/:id/cancel   (protégé)
export async function cancelAppointment(req, res) {
  try {
    const appt = await Appointment.findOne({ _id: req.params.id, patient: req.user._id });
    if (!appt) return res.status(404).json({ message: "Rendez-vous introuvable." });
    appt.status = "Annulé";
    await appt.save();
    res.json(appt);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur.", error: err.message });
  }
}
