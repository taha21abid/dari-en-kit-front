import { Link } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingCart, ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/lib/cart";

const Cart = () => {
  const { items, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container py-8">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6">
          <ArrowLeft className="h-4 w-4" /> Continuer mes achats
        </Link>

        <h1 className="text-3xl font-heading font-bold text-foreground mb-8">
          <ShoppingCart className="inline h-8 w-8 mr-2" />
          Mon Panier ({totalItems})
        </h1>

        {items.length === 0 ? (
          <div className="bg-card rounded-2xl border border-border p-16 text-center">
            <ShoppingCart className="h-16 w-16 mx-auto text-muted-foreground/30 mb-4" />
            <p className="text-lg text-muted-foreground font-body">Votre panier est vide</p>
            <Link to="/" className="inline-block mt-4 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-heading font-semibold hover:opacity-90 transition-opacity">
              Découvrir nos produits
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="bg-card rounded-xl border border-border p-5 flex gap-5 items-center">
                  <Link to={`/produit/${product.id}`}>
                    <img src={product.image} alt={product.name} className="w-24 h-24 object-contain rounded-lg bg-secondary/50 p-2" />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link to={`/produit/${product.id}`} className="font-heading font-semibold text-foreground hover:text-primary transition-colors line-clamp-1">
                      {product.name}
                    </Link>
                    <p className="text-primary font-heading font-bold mt-1">{product.price} TND</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => updateQuantity(product.id, quantity - 1)} className="p-1.5 rounded-lg border border-border hover:bg-accent transition-colors">
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center font-heading font-semibold">{quantity}</span>
                    <button onClick={() => updateQuantity(product.id, quantity + 1)} className="p-1.5 rounded-lg border border-border hover:bg-accent transition-colors">
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <button onClick={() => removeFromCart(product.id)} className="p-2 text-muted-foreground hover:text-destructive transition-colors">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="bg-card rounded-xl border border-border p-6 h-fit sticky top-32 space-y-4">
              <h3 className="font-heading font-bold text-lg text-foreground">Résumé</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Sous-total</span><span className="font-semibold">{totalPrice.toFixed(3)} TND</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Livraison</span><span className="text-badge-new font-semibold">Gratuite</span></div>
              </div>
              <div className="border-t border-border pt-4 flex justify-between">
                <span className="font-heading font-bold">Total</span>
                <span className="font-heading font-bold text-xl text-primary">{totalPrice.toFixed(3)} TND</span>
              </div>
              <Link to="/checkout" className="block text-center w-full bg-primary text-primary-foreground py-3.5 rounded-lg font-heading font-semibold hover:opacity-90 transition-opacity">
                Passer la commande
              </Link>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
