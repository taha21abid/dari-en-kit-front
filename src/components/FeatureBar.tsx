import { Truck, Shield, Headphones, RotateCcw } from "lucide-react";

const features = [
  { icon: Truck, title: "Livraison Rapide", desc: "Partout en Tunisie" },
  { icon: Shield, title: "Produits Garantis", desc: "Qualité certifiée" },
  { icon: Headphones, title: "Support 24/7", desc: "À votre écoute" },
  { icon: RotateCcw, title: "Retour Facile", desc: "Sous 14 jours" },
];

const FeatureBar = () => (
  <section className="bg-card border-y border-border">
    <div className="container py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
      {features.map((f) => (
        <div key={f.title} className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center flex-shrink-0">
            <f.icon className="h-6 w-6 text-accent-foreground" />
          </div>
          <div>
            <h4 className="font-heading font-semibold text-sm text-foreground">{f.title}</h4>
            <p className="text-xs text-muted-foreground">{f.desc}</p>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default FeatureBar;
