import { Link } from "react-router-dom";
import { ArrowLeft, Users, Award, Truck, Headphones } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container py-8">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6">
          <ArrowLeft className="h-4 w-4" /> Accueil
        </Link>

        {/* Hero */}
        <div className="bg-card rounded-2xl border border-border p-10 md:p-16 mb-12 text-center">
          <h1 className="text-4xl font-heading font-bold text-foreground mb-4">
            À propos de <span className="text-primary">Dari en kit</span>
          </h1>
          <p className="text-lg text-muted-foreground font-body max-w-2xl mx-auto leading-relaxed">
            Votre partenaire quincaillerie en ligne en Tunisie. Nous proposons une large gamme d'outillage professionnel, de matériaux de construction et de produits de quincaillerie de qualité supérieure.
          </p>
        </div>

        {/* Values */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { icon: Users, title: "Équipe Experte", desc: "Des professionnels passionnés à votre service depuis plus de 10 ans." },
            { icon: Award, title: "Qualité Premium", desc: "Nous sélectionnons les meilleures marques pour garantir votre satisfaction." },
            { icon: Truck, title: "Livraison Nationale", desc: "Livraison rapide partout en Tunisie avec suivi en temps réel." },
            { icon: Headphones, title: "Support Dédié", desc: "Une équipe à l'écoute pour vous conseiller et vous accompagner." },
          ].map((v) => (
            <div key={v.title} className="bg-card rounded-xl border border-border p-8 text-center hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
              <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-accent flex items-center justify-center">
                <v.icon className="h-7 w-7 text-accent-foreground" />
              </div>
              <h3 className="font-heading font-semibold text-foreground mb-2">{v.title}</h3>
              <p className="text-sm text-muted-foreground font-body">{v.desc}</p>
            </div>
          ))}
        </div>

        {/* Story */}
        <div className="bg-card rounded-2xl border border-border p-10 md:p-16 space-y-6">
          <h2 className="text-2xl font-heading font-bold text-foreground">Notre Histoire</h2>
          <div className="space-y-4 text-muted-foreground font-body leading-relaxed">
            <p>
              Fondée avec la vision de rendre l'outillage professionnel accessible à tous les Tunisiens, Dari en kit est née de la passion pour le bricolage et la construction de qualité.
            </p>
            <p>
              Aujourd'hui, nous sommes fiers de proposer un catalogue de milliers de produits, des plus grandes marques mondiales aux solutions locales innovantes. Notre engagement : qualité, prix compétitifs et service client irréprochable.
            </p>
            <p>
              Que vous soyez un professionnel du bâtiment ou un bricoleur du dimanche, Dari en kit est votre destination unique pour tous vos besoins en quincaillerie.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
