import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ChevronLeft, MapPin, Star, Phone, Clock, Calendar, Check,
} from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";
import { getDoctor, getSlots, createAppointment } from "../services/api.js";

const DAYS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

function nextDays(n = 7) {
  const out = [];
  const today = new Date();
  for (let i = 0; i < n; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    out.push({
      key: d.toISOString().slice(0, 10),
      day: DAYS[(d.getDay() + 6) % 7],
      num: d.getDate(),
      label: d.toLocaleDateString("fr-FR", { day: "numeric", month: "long" }),
    });
  }
  return out;
}

export default function DoctorProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [doctor, setDoctor] = useState(null);
  const [days] = useState(nextDays(7));
  const [activeDay, setActiveDay] = useState(nextDays(7)[0]);
  const [slots, setSlots] = useState([]);
  const [slot, setSlot] = useState(null);

  useEffect(() => { getDoctor(id).then(setDoctor); }, [id]);

  useEffect(() => {
    if (!doctor) return;
    setSlot(null);
    getSlots(doctor.id, activeDay.key).then(setSlots);
  }, [doctor, activeDay]);

  const confirm = async () => {
    if (!user) { navigate("/connexion"); return; }
    await createAppointment({
      doctor: doctor.name,
      specialty: doctor.specialty,
      city: doctor.city,
      date: activeDay.label,
      slot,
    });
    navigate("/mes-rendez-vous");
  };

  if (!doctor) return <main className="mb-section"><p className="mb-count">Chargement…</p></main>;

  const initials = doctor.name.replace("Dr. ", "").split(" ").map((w) => w[0]).join("").slice(0, 2);

  return (
    <main className="mb-section">
      <Link to="/medecins" className="mb-back"><ChevronLeft size={16} /> Retour aux médecins</Link>

      <div className="mb-profile">
        <div className="mb-profile-card">
          <div className="mb-profile-head">
            <span className="mb-avatar lg">{initials}</span>
            <div>
              <h2 className="mb-profile-name">{doctor.name}</h2>
              <span className="mb-tag">{doctor.specialty}</span>
            </div>
          </div>
          <p className="mb-profile-bio">{doctor.bio}</p>
          <ul className="mb-profile-info">
            <li><MapPin size={16} /> {doctor.city}, Tunisie</li>
            <li><Star size={16} fill="currentColor" /> {doctor.rating} ({doctor.reviews} avis)</li>
            <li><Phone size={16} /> +216 71 000 000</li>
            <li><Clock size={16} /> Consultation : {doctor.fee} DT</li>
          </ul>
        </div>

        <div className="mb-booking">
          <h3 className="mb-booking-title"><Calendar size={18} /> Choisissez un créneau</h3>

          <div className="mb-days">
            {days.map((d) => (
              <button
                key={d.key}
                className={"mb-day" + (activeDay.key === d.key ? " active" : "")}
                onClick={() => setActiveDay(d)}
              >
                <span className="mb-day-name">{d.day}</span>
                <span className="mb-day-num">{d.num}</span>
              </button>
            ))}
          </div>

          <p className="mb-slots-label">Créneaux du {activeDay.label}</p>
          <div className="mb-slots">
            {slots.map((s) => (
              <button
                key={s.time}
                disabled={s.taken}
                className={"mb-slot" + (slot === s.time ? " active" : "") + (s.taken ? " taken" : "")}
                onClick={() => setSlot(s.time)}
              >
                {s.time}
              </button>
            ))}
          </div>

          <div className="mb-booking-foot">
            <span>
              {slot
                ? <>Sélectionné : <strong>{activeDay.day} {activeDay.num} · {slot}</strong></>
                : "Aucun créneau sélectionné"}
            </span>
            <button className="mb-btn" disabled={!slot} onClick={confirm}>
              <Check size={16} /> Confirmer le rendez-vous
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
