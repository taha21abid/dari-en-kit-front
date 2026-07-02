import { Link } from "react-router-dom";
import { Wrench, Zap, Paintbrush, Lock, Drill, TreePine, Droplets, Settings, ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { categoriesData, products } from "@/lib/products";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const iconMap: Record<string, React.ElementType> = {
  "Outillage Électrique": Drill,
  "Outillage Manuel": Wrench,
  "Plomberie": Droplets,
  "Électricité": Zap,
  "Peinture": Paintbrush,
  "Serrurerie": Lock,
  "Jardinage": TreePine,
  "Quincaillerie Générale": Settings,
};

const countMap: Record<string, number> = {
  "Outillage Électrique": 245,
  "Outillage Manuel": 180,
  "Plomberie": 120,
  "Électricité": 320,
  "Peinture": 95,
  "Serrurerie": 112,
  "Jardinage": 78,
  "Quincaillerie Générale": 200,
};

const Categories = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container py-8">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6">
          <ArrowLeft className="h-4 w-4" /> Accueil
        </Link>
        <h1 className="text-3xl font-heading font-bold text-foreground mb-10">Toutes les Catégories</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categoriesData.map((cat) => {
            const Icon = iconMap[cat.name] || Settings;
            const catProducts = products.filter((p) => p.category === cat.name);
            return (
              <div
                key={cat.name}
                className="bg-card rounded-xl border border-border overflow-hidden hover:border-primary hover:shadow-lg hover:shadow-primary/10 transition-all duration-300"
              >
                <Link
                  to={`/recherche?category=${encodeURIComponent(cat.name)}`}
                  className="block p-8 text-center"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-accent flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-heading font-semibold text-foreground mb-1">{cat.name}</h3>
                  <span className="text-sm text-muted-foreground">{countMap[cat.name] || 0} produits</span>
                  {catProducts.length > 0 && (
                    <div className="mt-4 flex justify-center -space-x-2">
                      {catProducts.slice(0, 3).map((p) => (
                        <img key={p.id} src={p.image} alt="" className="w-10 h-10 rounded-full border-2 border-card object-cover bg-secondary/50" />
                      ))}
                    </div>
                  )}
                </Link>
                {/* Subcategories */}
                <div className="border-t border-border">
                  <Accordion type="single" collapsible>
                    <AccordionItem value="sub" className="border-0">
                      <AccordionTrigger className="px-5 py-3 text-sm font-heading font-medium text-muted-foreground hover:no-underline">
                        Sous-catégories ({cat.subcategories.length})
                      </AccordionTrigger>
                      <AccordionContent className="px-5 pb-4">
                        <div className="flex flex-wrap gap-2">
                          {cat.subcategories.map((sub) => (
                            <Link
                              key={sub.name}
                              to={`/recherche?category=${encodeURIComponent(cat.name)}&sub=${encodeURIComponent(sub.name)}`}
                              className="text-xs bg-accent text-foreground hover:bg-primary hover:text-primary-foreground px-3 py-1.5 rounded-full transition-colors"
                            >
                              {sub.name}
                            </Link>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Categories;