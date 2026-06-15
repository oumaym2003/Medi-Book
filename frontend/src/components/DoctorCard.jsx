import { Link } from "react-router-dom";
import { Star, MapPin, ChevronRight } from "lucide-react";

export default function DoctorCard({ doctor }) {
  const initials = doctor.name
    .replace("Dr. ", "")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);

  return (
    <Link to={`/medecins/${doctor.id}`} className="mb-card">
      <div className="mb-card-top">
        <span className="mb-avatar">{initials}</span>
        <span className="mb-rating"><Star size={14} fill="currentColor" /> {doctor.rating}</span>
      </div>
      <h3 className="mb-card-name">{doctor.name}</h3>
      <span className="mb-tag">{doctor.specialty}</span>
      <p className="mb-card-meta"><MapPin size={14} /> {doctor.city}</p>
      <div className="mb-card-foot">
        <span className="mb-fee">{doctor.fee} DT <small>/ consultation</small></span>
        <span className="mb-card-cta">Réserver <ChevronRight size={15} /></span>
      </div>
    </Link>
  );
}
