import { useParams, Link } from "react-router-dom";
import { Star, ShoppingCart, Heart, ArrowLeft, Truck, Shield, RotateCcw } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { products } from "@/lib/products";
import { useCart } from "@/lib/cart";

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const { addToCart } = useCart();

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-20 text-center">
          <h1 className="text-2xl font-heading font-bold text-foreground">Produit non trouvé</h1>
          <Link to="/" className="text-primary mt-4 inline-block hover:underline">← Retour à l'accueil</Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container py-8">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6">
          <ArrowLeft className="h-4 w-4" /> Retour aux produits
        </Link>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Image */}
          <div className="bg-card rounded-2xl border border-border p-8 flex items-center justify-center">
            <img src={product.image} alt={product.name} className="max-h-[400px] object-contain" />
          </div>

          {/* Info */}
          <div className="space-y-6">
            {product.badge && (
              <span className={`inline-block text-xs font-heading font-bold px-3 py-1 rounded-full ${product.badge === "Promo" ? "bg-badge-promo text-primary-foreground" : "bg-badge-new text-primary-foreground"}`}>
                {product.badge}
              </span>
            )}
            <h1 className="text-3xl font-heading font-bold text-foreground">{product.name}</h1>

            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`h-5 w-5 ${i < Math.floor(product.rating) ? "fill-primary text-primary" : "text-border"}`} />
              ))}
              <span className="text-sm text-muted-foreground ml-2">({product.rating})</span>
            </div>

            <div className="flex items-end gap-3">
              <span className="text-3xl font-heading font-bold text-primary">{product.price}</span>
              <span className="text-muted-foreground">TND</span>
              {product.oldPrice && <span className="text-lg text-muted-foreground line-through">{product.oldPrice} TND</span>}
            </div>

            <p className="text-muted-foreground font-body leading-relaxed">{product.description}</p>

            <div className="flex gap-3">
              <button
                onClick={() => addToCart(product)}
                className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3.5 rounded-lg font-heading font-semibold hover:opacity-90 transition-opacity"
              >
                <ShoppingCart className="h-5 w-5" /> Ajouter au panier
              </button>
              <button className="p-3.5 rounded-lg border border-border hover:bg-accent transition-colors">
                <Heart className="h-5 w-5 text-foreground" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
              {[
                { icon: Truck, label: "Livraison rapide" },
                { icon: Shield, label: "Garantie incluse" },
                { icon: RotateCcw, label: "Retour 14 jours" },
              ].map((f) => (
                <div key={f.label} className="flex flex-col items-center gap-2 text-center">
                  <f.icon className="h-5 w-5 text-primary" />
                  <span className="text-xs text-muted-foreground">{f.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;
