import express from "express";
import { getDoctors, getDoctor, getSlots } from "../controllers/doctorController.js";

const router = express.Router();

router.get("/", getDoctors);
router.get("/:id", getDoctor);
router.get("/:id/slots", getSlots);

export default router;
