import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Au chargement, on récupère l'utilisateur stocké (token JWT + infos)
  useEffect(() => {
    const saved = localStorage.getItem("medibook_user");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("medibook_user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("medibook_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook pratique : const { user, login, logout } = useAuth();
export const useAuth = () => useContext(AuthContext);
