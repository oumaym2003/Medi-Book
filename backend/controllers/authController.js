import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Génère un token JWT valable 7 jours
function genToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
}

// POST /api/auth/register
export async function register(req, res) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Tous les champs sont requis." });
    }
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Cet email est déjà utilisé." });
    }
    const user = await User.create({ name, email, password });
    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      token: genToken(user._id),
    });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur.", error: err.message });
  }
}

// POST /api/auth/login
export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Email ou mot de passe incorrect." });
    }
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      token: genToken(user._id),
    });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur.", error: err.message });
  }
}
