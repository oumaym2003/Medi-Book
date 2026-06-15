import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

// Enveloppe une page : si l'utilisateur n'est pas connecté, on le redirige.
export default function ProtectedRoute({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/connexion" replace />;
  return children;
}
