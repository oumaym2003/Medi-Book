import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search, MapPin, Stethoscope, Calendar, CalendarCheck, ChevronRight,
} from "lucide-react";
import DoctorCard from "../components/DoctorCard.jsx";
import { SPECIALTIES, CITIES } from "../data/mock.js";
import { getDoctors } from "../services/api.js";

export default function Home() {
  const navigate = useNavigate();
  const [spec, setSpec] = useState("");
  const [city, setCity] = useState("");
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    getDoctors().then((list) => setFeatured(list.slice(0, 3)));
  }, []);

  const search = () => {
    const params = new URLSearchParams();
    if (spec) params.set("specialty", spec);
    if (city) params.set("city", city);
    navigate(`/medecins?${params.toString()}`);
  };

  return (
    <main>
      <section className="mb-hero">
        <div className="mb-hero-glow" />
        <div className="mb-hero-inner">
          <span className="mb-eyebrow">Votre santé, sans la salle d'attente</span>
          <h1>Trouvez un médecin et réservez en quelques clics.</h1>
          <p className="mb-hero-sub">
            Des praticiens disponibles à Tunis, Sfax, Sousse et ailleurs.
            Choisissez une spécialité, un créneau, et c'est réservé.
          </p>

          <div className="mb-search">
            <div className="mb-search-field">
              <Stethoscope size={18} className="mb-search-ic" />
              <select value={spec} onChange={(e) => setSpec(e.target.value)}>
                <option value="">Toutes les spécialités</option>
                {SPECIALTIES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="mb-search-divider" />
            <div className="mb-search-field">
              <MapPin size={18} className="mb-search-ic" />
              <select value={city} onChange={(e) => setCity(e.target.value)}>
                <option value="">Toutes les villes</option>
                {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <button className="mb-search-btn" onClick={search}>
              <Search size={18} /> Rechercher
            </button>
          </div>
        </div>
      </section>

      <section className="mb-section">
        <h2 className="mb-h2">Comment ça marche</h2>
        <div className="mb-steps">
          {[
            { ic: <Search size={22} />, t: "1 · Cherchez", d: "Filtrez par spécialité et par ville pour trouver le bon praticien." },
            { ic: <Calendar size={22} />, t: "2 · Choisissez", d: "Consultez les créneaux disponibles et sélectionnez celui qui vous convient." },
            { ic: <CalendarCheck size={22} />, t: "3 · Confirmez", d: "Réservez en un clic et recevez votre confirmation." },
          ].map((s) => (
            <div className="mb-step" key={s.t}>
              <span className="mb-step-ic">{s.ic}</span>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-section">
        <div className="mb-section-head">
          <h2 className="mb-h2">Médecins recommandés</h2>
          <button className="mb-link" onClick={() => navigate("/medecins")}>
            Voir tout <ChevronRight size={16} />
          </button>
        </div>
        <div className="mb-grid">
          {featured.map((d) => <DoctorCard key={d.id} doctor={d} />)}
        </div>
      </section>
    </main>
  );
}
