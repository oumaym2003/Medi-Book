import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CalendarCheck, Calendar, Clock, MapPin } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";
import { getAppointments, cancelAppointment } from "../services/api.js";

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);

  const load = () => getAppointments().then(setAppointments);
  useEffect(() => { load(); }, []);

  const cancel = async (id) => {
    await cancelAppointment(id);
    load();
  };

  return (
    <main className="mb-section">
      <h2 className="mb-h2">Bonjour {user.name} 👋</h2>
      <p className="mb-count">Voici vos rendez-vous.</p>

      {appointments.length === 0 ? (
        <div className="mb-empty">
          Vous n'avez aucun rendez-vous pour le moment.
          <button className="mb-btn" style={{ marginTop: 16 }} onClick={() => navigate("/medecins")}>
            Trouver un médecin
          </button>
        </div>
      ) : (
        <div className="mb-appts">
          {appointments.map((a) => (
            <div className={"mb-appt" + (a.status === "Annulé" ? " cancelled" : "")} key={a.id}>
              <div className="mb-appt-ic"><CalendarCheck size={22} /></div>
              <div className="mb-appt-body">
                <h3>{a.doctor}</h3>
                <span className="mb-tag">{a.specialty}</span>
                <p className="mb-appt-meta">
                  <Calendar size={14} /> {a.date} · <Clock size={14} /> {a.slot} · <MapPin size={14} /> {a.city}
                </p>
              </div>
              <div className="mb-appt-right">
                <span className={"mb-status " + (a.status === "Annulé" ? "off" : "on")}>{a.status}</span>
                {a.status !== "Annulé" && (
                  <button className="mb-btn-ghost sm" onClick={() => cancel(a.id)}>Annuler</button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
