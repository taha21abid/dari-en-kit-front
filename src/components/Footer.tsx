import { Mail, Phone, MapPin, Facebook, Instagram } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const Footer = () => (
  <footer className="bg-topbar text-topbar-foreground">
    <div className="container py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
      <div className="space-y-4">
        <img src={logo} alt="Dari en kit" className="h-12 brightness-0 invert" />
        <p className="text-sm opacity-70 leading-relaxed">
          Votre partenaire pour électroménagers encastrables, salle de bains, revêtements, accessoires meuble et machines.
        </p>
        <div className="flex items-center gap-3 pt-1">
          <a href="https://www.facebook.com/dari.enkit/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-9 h-9 rounded-full bg-topbar-foreground/10 hover:bg-primary flex items-center justify-center transition-colors">
            <Facebook className="h-4 w-4" />
          </a>
          <a href="https://www.instagram.com/dari_en_kit/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-9 h-9 rounded-full bg-topbar-foreground/10 hover:bg-primary flex items-center justify-center transition-colors">
            <Instagram className="h-4 w-4" />
          </a>
        </div>
      </div>
      <div>
        <h4 className="font-heading font-semibold mb-4">Catégories</h4>
        <ul className="space-y-2 text-sm opacity-70">
          <li><Link to="/recherche?category=%C3%89lectrom%C3%A9nagers+Encastrables" className="hover:opacity-100 transition-opacity">Électroménagers Encastrables</Link></li>
          <li><Link to="/recherche?category=Salle+de+Bains+%26+Sanitaires" className="hover:opacity-100 transition-opacity">Salle de Bains & Sanitaires</Link></li>
          <li><Link to="/recherche?category=Rev%C3%AAtements+%26+Chauffages" className="hover:opacity-100 transition-opacity">Revêtements & Chauffages</Link></li>
          <li><Link to="/recherche?category=Accessoires+Meuble" className="hover:opacity-100 transition-opacity">Accessoires Meuble</Link></li>
          <li><Link to="/recherche?category=Machines+%26+Accessoires+Machine" className="hover:opacity-100 transition-opacity">Machines & Accessoires</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="font-heading font-semibold mb-4">Informations</h4>
        <ul className="space-y-2 text-sm opacity-70">
          <li><Link to="/a-propos" className="hover:opacity-100 transition-opacity">À propos</Link></li>
          <li><Link to="/contact" className="hover:opacity-100 transition-opacity">Contact</Link></li>
          <li><Link to="/rendez-vous" className="hover:opacity-100 transition-opacity">Prise de rendez-vous</Link></li>
          <li><a href="#" className="hover:opacity-100 transition-opacity">Conditions générales</a></li>
        </ul>
      </div>
      <div>
        <h4 className="font-heading font-semibold mb-4">Contact</h4>
        <ul className="space-y-3 text-sm opacity-70">
          <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary" /><a href="tel:+21658415400" className="hover:opacity-100">+216 58 415 400</a></li>
          <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary" /><a href="mailto:contact@enkit.tn" className="hover:opacity-100">contact@enkit.tn</a></li>
          <li className="flex items-start gap-2"><MapPin className="h-4 w-4 text-primary mt-0.5" />Route de Tunis KM4, Nabeul 8030, Tunisie</li>
        </ul>
      </div>
    </div>
    <div className="border-t border-topbar-foreground/10">
      <div className="container py-5 text-center text-xs opacity-50">
        © 2026 Dari en kit — enkit.tn. Tous droits réservés.
      </div>
    </div>
  </footer>
);

export default Footer;
