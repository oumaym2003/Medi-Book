import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { login as apiLogin, register as apiRegister } from "../services/api.js";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = async () => {
    setError("");
    try {
      const data =
        mode === "register"
          ? await apiRegister({ name, email, password })
          : await apiLogin({ email, password });
      login(data); // stocke user + token
      navigate("/");
    } catch (e) {
      setError("Email ou mot de passe incorrect.");
    }
  };

  return (
    <main className="mb-auth">
      <div className="mb-auth-card">
        <h2 className="mb-h2 center">{mode === "login" ? "Connexion" : "Créer un compte"}</h2>
        <p className="mb-auth-sub">Accédez à vos rendez-vous et réservez en ligne.</p>

        {error && <div className="mb-error">{error}</div>}

        {mode === "register" && (
          <label className="mb-field">
            <span>Nom complet</span>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Oumayma B." />
          </label>
        )}
        <label className="mb-field">
          <span>Email</span>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="vous@email.com" />
        </label>
        <label className="mb-field">
          <span>Mot de passe</span>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
        </label>

        <button className="mb-btn full" onClick={submit}>
          {mode === "login" ? "Se connecter" : "Créer mon compte"}
        </button>

        <p className="mb-auth-switch">
          {mode === "login" ? "Pas encore de compte ?" : "Déjà inscrit ?"}{" "}
          <button onClick={() => { setMode(mode === "login" ? "register" : "login"); setError(""); }}>
            {mode === "login" ? "Inscrivez-vous" : "Connectez-vous"}
          </button>
        </p>
      </div>
    </main>
  );
}
