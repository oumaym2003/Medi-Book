import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Home from "./pages/Home.jsx";
import Doctors from "./pages/Doctors.jsx";
import DoctorProfile from "./pages/DoctorProfile.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";

export default function App() {
  return (
    <div className="mb-root">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/medecins" element={<Doctors />} />
        <Route path="/medecins/:id" element={<DoctorProfile />} />
        <Route path="/connexion" element={<Login />} />
        {/* Page protégée : accessible seulement si connecté */}
        <Route
          path="/mes-rendez-vous"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}
