import express from "express";
import {
  createAppointment, getMyAppointments, cancelAppointment,
} from "../controllers/appointmentController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// Toutes ces routes nécessitent d'être connecté (token JWT)
router.post("/", protect, createAppointment);
router.get("/", protect, getMyAppointments);
router.patch("/:id/cancel", protect, cancelAppointment);

export default router;
