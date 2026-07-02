import { Refrigerator, Bath, Flame, Sofa, Drill } from "lucide-react";
import { Link } from "react-router-dom";
import { categoriesData } from "@/lib/products";

const iconMap: Record<string, React.ElementType> = {
  "Électroménagers Encastrables": Refrigerator,
  "Salle de Bains & Sanitaires": Bath,
  "Revêtements & Chauffages": Flame,
  "Accessoires Meuble": Sofa,
  "Machines & Accessoires Machine": Drill,
};

const countMap: Record<string, number> = {
  "Électroménagers Encastrables": 180,
  "Salle de Bains & Sanitaires": 240,
  "Revêtements & Chauffages": 320,
  "Accessoires Meuble": 195,
  "Machines & Accessoires Machine": 275,
};

const CategoryGrid = () => {
  const displayCats = categoriesData.filter((c) => iconMap[c.name]);

  return (
    <section id="categories" className="container py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-heading font-bold text-foreground">Nos Catégories</h2>
        <p className="text-muted-foreground mt-3 font-body">Trouvez tout ce dont vous avez besoin pour vos projets</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
        {displayCats.map((cat, i) => {
          const Icon = iconMap[cat.name];
          return (
            <div
              key={cat.name}
              className="group bg-card rounded-xl p-6 text-center border border-border hover:border-primary hover:shadow-lg hover:shadow-primary/10 transition-all duration-300"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <Link to={`/recherche?category=${encodeURIComponent(cat.name)}`}>
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-accent flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="font-heading font-semibold text-sm text-foreground mb-1">{cat.name}</h3>
                <span className="text-xs text-muted-foreground">{countMap[cat.name] || 0} produits</span>
              </Link>
              <div className="mt-3 flex flex-wrap justify-center gap-1">
                {cat.subcategories.slice(0, 3).map((sub) => (
                  <Link
                    key={sub.name}
                    to={`/recherche?category=${encodeURIComponent(cat.name)}&sub=${encodeURIComponent(sub.name)}`}
                    className="text-[10px] text-muted-foreground hover:text-primary transition-colors bg-accent/50 px-2 py-0.5 rounded-full"
                  >
                    {sub.name}
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CategoryGrid;
