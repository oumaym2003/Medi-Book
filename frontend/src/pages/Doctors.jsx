import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { X } from "lucide-react";
import DoctorCard from "../components/DoctorCard.jsx";
import { SPECIALTIES, CITIES } from "../data/mock.js";
import { getDoctors } from "../services/api.js";

export default function Doctors() {
  const [searchParams, setSearchParams] = useSearchParams();
  const spec = searchParams.get("specialty") || "";
  const city = searchParams.get("city") || "";

  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getDoctors({ specialty: spec, city }).then((list) => {
      setDoctors(list);
      setLoading(false);
    });
  }, [spec, city]);

  const setFilter = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value); else next.delete(key);
    setSearchParams(next);
  };

  return (
    <main className="mb-section">
      <h2 className="mb-h2">Médecins disponibles</h2>

      <div className="mb-filters">
        <select value={spec} onChange={(e) => setFilter("specialty", e.target.value)}>
          <option value="">Toutes les spécialités</option>
          {SPECIALTIES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <select value={city} onChange={(e) => setFilter("city", e.target.value)}>
          <option value="">Toutes les villes</option>
          {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        {(spec || city) && (
          <button className="mb-btn-ghost" onClick={() => setSearchParams({})}>
            <X size={15} /> Réinitialiser
          </button>
        )}
      </div>

      <p className="mb-count">
        {loading ? "Chargement…" : `${doctors.length} médecin(s) trouvé(s)`}
      </p>

      {!loading && doctors.length === 0 ? (
        <div className="mb-empty">
          Aucun médecin ne correspond à votre recherche. Essayez d'élargir vos filtres.
        </div>
      ) : (
        <div className="mb-grid">
          {doctors.map((d) => <DoctorCard key={d.id} doctor={d} />)}
        </div>
      )}
    </main>
  );
}
