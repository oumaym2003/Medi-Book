import axios from "axios";
import { DOCTORS, SLOTS, TAKEN } from "../data/mock.js";

/*
  Couche d'accès aux données.
  -----------------------------------------------------------
  USE_MOCK = true  -> l'app fonctionne SEULE avec les données simulées.
  USE_MOCK = false -> l'app appelle ton backend Node/Express (port 5000).

  Mets USE_MOCK à false une fois ton backend lancé et alimenté (npm run seed).
*/
const USE_MOCK = true;

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({ baseURL: API_URL });

// Ajoute automatiquement le token JWT à chaque requête
api.interceptors.request.use((config) => {
  const saved = localStorage.getItem("medibook_user");
  if (saved) {
    const { token } = JSON.parse(saved);
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Petite pause pour simuler la latence réseau en mode mock
const delay = (ms = 300) => new Promise((r) => setTimeout(r, ms));

// ---------------- AUTH ----------------
export async function register({ name, email, password }) {
  if (USE_MOCK) { await delay(); return { name, email, token: "mock-token" }; }
  const { data } = await api.post("/auth/register", { name, email, password });
  return data;
}

export async function login({ email, password }) {
  if (USE_MOCK) { await delay(); return { name: email.split("@")[0], email, token: "mock-token" }; }
  const { data } = await api.post("/auth/login", { email, password });
  return data;
}

// ---------------- MÉDECINS ----------------
export async function getDoctors({ specialty, city } = {}) {
  if (USE_MOCK) {
    await delay();
    return DOCTORS.filter(
      (d) => (!specialty || d.specialty === specialty) && (!city || d.city === city)
    );
  }
  const { data } = await api.get("/doctors", { params: { specialty, city } });
  return data;
}

export async function getDoctor(id) {
  if (USE_MOCK) { await delay(); return DOCTORS.find((d) => String(d.id) === String(id)); }
  const { data } = await api.get(`/doctors/${id}`);
  return data;
}

export async function getSlots(doctorId, date) {
  if (USE_MOCK) {
    await delay();
    return SLOTS.map((time) => ({ time, taken: TAKEN.includes(time) }));
  }
  const { data } = await api.get(`/doctors/${doctorId}/slots`, { params: { date } });
  return data;
}

// ---------------- RENDEZ-VOUS ----------------
export async function getAppointments() {
  if (USE_MOCK) { await delay(); return JSON.parse(localStorage.getItem("medibook_appts") || "[]"); }
  const { data } = await api.get("/appointments");
  return data;
}

export async function createAppointment(payload) {
  if (USE_MOCK) {
    await delay();
    const list = JSON.parse(localStorage.getItem("medibook_appts") || "[]");
    const appt = { id: Date.now(), status: "À venir", ...payload };
    localStorage.setItem("medibook_appts", JSON.stringify([appt, ...list]));
    return appt;
  }
  const { data } = await api.post("/appointments", payload);
  return data;
}

export async function cancelAppointment(id) {
  if (USE_MOCK) {
    await delay();
    const list = JSON.parse(localStorage.getItem("medibook_appts") || "[]")
      .map((a) => (a.id === id ? { ...a, status: "Annulé" } : a));
    localStorage.setItem("medibook_appts", JSON.stringify(list));
    return { ok: true };
  }
  const { data } = await api.patch(`/appointments/${id}/cancel`);
  return data;
}

export default api;
