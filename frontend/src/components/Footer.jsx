import { Stethoscope } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mb-footer">
      <div className="mb-footer-inner">
        <div className="mb-footer-branding">
          <span className="mb-brand sm">
            <span className="mb-logo sm"><Stethoscope size={16} /></span> MediBook
          </span>
          <p className="mb-footer-signature">Projet Oumayma Bouyahia · Ma empreinte.</p>
        </div>
        <p>Projet portfolio — Plateforme de prise de rendez-vous médicaux.</p>
        <span className="mb-footer-copy">© {new Date().getFullYear()} MediBook</span>
      </div>
    </footer>
  );
}
