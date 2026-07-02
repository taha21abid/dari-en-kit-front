import { Heart, ShoppingCart, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { products } from "@/lib/products";
import { useCart } from "@/lib/cart";

const ProductCard = ({ product }: { product: typeof products[0] }) => {
  const { addToCart } = useCart();
  return (
    <div className="group bg-card rounded-xl border border-border overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1">
      <Link to={`/produit/${product.id}`} className="block relative aspect-square overflow-hidden bg-secondary/50 p-4">
        <img src={product.image} alt={product.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
        {product.badge && (
          <span className={`absolute top-3 left-3 text-xs font-heading font-bold px-3 py-1 rounded-full ${product.badge === "Promo" ? "bg-badge-promo text-primary-foreground" : "bg-badge-new text-primary-foreground"}`}>
            {product.badge}
          </span>
        )}
        <button className="absolute top-3 right-3 p-2 rounded-full bg-card/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-card shadow-sm" onClick={(e) => e.preventDefault()}>
          <Heart className="h-4 w-4 text-foreground" />
        </button>
      </Link>
      <div className="p-5 space-y-3">
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={`h-3.5 w-3.5 ${i < Math.floor(product.rating) ? "fill-primary text-primary" : "text-border"}`} />
          ))}
          <span className="text-xs text-muted-foreground ml-1">({product.rating})</span>
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
  );
};

const ProductGrid = () => {
  return (
    <section id="produits" className="container py-16">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2 className="text-3xl font-heading font-bold text-foreground">Produits Tendance</h2>
          <p className="text-muted-foreground mt-2 font-body">Les plus populaires du moment</p>
        </div>
        <Link to="/recherche" className="text-primary font-heading font-semibold text-sm hover:underline">
          Voir tout →
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;
