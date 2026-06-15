import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Vérifie le token JWT envoyé dans l'en-tête Authorization: Bearer <token>
export async function protect(req, res, next) {
  let token;
  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return res.status(401).json({ message: "Non autorisé : token manquant." });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (err) {
    return res.status(401).json({ message: "Non autorisé : token invalide." });
  }
}
