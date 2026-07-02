import { useState, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Search as SearchIcon, Star, ShoppingCart, ArrowLeft, ChevronDown } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { products, categories, categoriesData } from "@/lib/products";
import { useCart } from "@/lib/cart";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const initialCategory = searchParams.get("category") || "";
  const initialSub = searchParams.get("sub") || "";
  const [query, setQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedSub, setSelectedSub] = useState(initialSub);
  const { addToCart } = useCart();

  const currentCatData = categoriesData.find((c) => c.name === selectedCategory);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesQuery = !query || p.name.toLowerCase().includes(query.toLowerCase());
      const matchesCat = !selectedCategory || p.category === selectedCategory;
      return matchesQuery && matchesCat;
    });
  }, [query, selectedCategory]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({ q: query, ...(selectedCategory && { category: selectedCategory }), ...(selectedSub && { sub: selectedSub }) });
  };

  const selectCategory = (cat: string) => {
    setSelectedCategory(cat);
    setSelectedSub("");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container py-8">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6">
          <ArrowLeft className="h-4 w-4" /> Accueil
        </Link>

        <h1 className="text-3xl font-heading font-bold text-foreground mb-6">Recherche</h1>

        <form onSubmit={handleSearch} className="flex gap-3 mb-6">
          <div className="flex-1 flex items-center border-2 border-primary rounded-lg overflow-hidden">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher un produit..."
              className="flex-1 px-4 py-3 bg-transparent outline-none text-sm font-body"
            />
            <button type="submit" className="bg-primary text-primary-foreground px-5 py-3 hover:opacity-90 transition-opacity">
              <SearchIcon className="h-5 w-5" />
            </button>
          </div>
        </form>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-4">
          <button
            onClick={() => selectCategory("")}
            className={`px-4 py-2 rounded-full text-sm font-heading font-medium transition-colors ${!selectedCategory ? "bg-primary text-primary-foreground" : "bg-card border border-border text-foreground hover:bg-accent"}`}
          >
            Tous
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => selectCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-heading font-medium transition-colors ${selectedCategory === cat ? "bg-primary text-primary-foreground" : "bg-card border border-border text-foreground hover:bg-accent"}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Subcategory filters */}
        {currentCatData && (
          <div className="flex flex-wrap gap-2 mb-8 pl-2">
            <span className="text-xs text-muted-foreground font-heading uppercase tracking-wider self-center mr-2">Sous-catégories:</span>
            <button
              onClick={() => setSelectedSub("")}
              className={`px-3 py-1.5 rounded-full text-xs font-heading font-medium transition-colors ${!selectedSub ? "bg-primary/20 text-primary border border-primary/30" : "bg-card border border-border text-muted-foreground hover:bg-accent"}`}
            >
              Toutes
            </button>
            {currentCatData.subcategories.map((sub) => (
              <button
                key={sub.name}
                onClick={() => setSelectedSub(sub.name)}
                className={`px-3 py-1.5 rounded-full text-xs font-heading font-medium transition-colors ${selectedSub === sub.name ? "bg-primary/20 text-primary border border-primary/30" : "bg-card border border-border text-muted-foreground hover:bg-accent"}`}
              >
                {sub.name}
              </button>
            ))}
          </div>
        )}

        <p className="text-sm text-muted-foreground mb-6">{filtered.length} résultat(s)</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((product) => (
            <div key={product.id} className="group bg-card rounded-xl border border-border overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1">
              <Link to={`/produit/${product.id}`} className="block relative aspect-square overflow-hidden bg-secondary/50 p-4">
                <img src={product.image} alt={product.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
                {product.badge && (
                  <span className={`absolute top-3 left-3 text-xs font-heading font-bold px-3 py-1 rounded-full ${product.badge === "Promo" ? "bg-badge-promo text-primary-foreground" : "bg-badge-new text-primary-foreground"}`}>
                    {product.badge}
                  </span>
                )}
              </Link>
              <div className="p-5 space-y-3">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`h-3.5 w-3.5 ${i < Math.floor(product.rating) ? "fill-primary text-primary" : "text-border"}`} />
                  ))}
                </div>
                <Link to={`/produit/${product.id}`}>
                  <h3 className="font-heading font-semibold text-sm text-foreground leading-snug line-clamp-2 min-h-[2.5rem] hover:text-primary transition-colors">{product.name}</h3>
                </Link>
                <div className="flex items-end gap-2">
                  <span className="text-xl font-heading font-bold text-primary">{product.price}</span>
                  <span className="text-xs text-muted-foreground">TND</span>
                  {product.oldPrice && <span className="text-sm text-muted-foreground line-through ml-auto">{product.oldPrice}</span>}
                </div>
                <button onClick={() => addToCart(product)} className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-2.5 rounded-lg font-heading font-semibold text-sm hover:opacity-90 transition-opacity">
                  <ShoppingCart className="h-4 w-4" /> Ajouter au panier
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Search;