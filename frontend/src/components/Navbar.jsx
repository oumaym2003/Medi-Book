import { Link, NavLink, useNavigate } from "react-router-dom";
import { Stethoscope, User, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate("/"); };

  return (
    <header className="mb-nav">
      <div className="mb-nav-inner">
        <Link to="/" className="mb-brand">
          <span className="mb-logo"><Stethoscope size={20} /></span>
          Medi<span className="mb-brand-accent">Book</span>
        </Link>

        <nav className="mb-nav-links">
          <NavLink to="/" end>Accueil</NavLink>
          <NavLink to="/medecins">Médecins</NavLink>
          {user && <NavLink to="/mes-rendez-vous">Mes rendez-vous</NavLink>}
        </nav>

        <div className="mb-nav-auth">
          {user ? (
            <>
              <span className="mb-user"><User size={16} /> {user.name}</span>
              <button className="mb-btn-ghost" onClick={handleLogout}>
                <LogOut size={16} /> Déconnexion
              </button>
            </>
          ) : (
            <Link to="/connexion" className="mb-btn">Connexion</Link>
          )}
        </div>
      </div>
    </header>
  );
}
