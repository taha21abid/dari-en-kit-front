import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, CreditCard, Truck, MapPin, User, CheckCircle2, Banknote, ShieldCheck } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCart } from "@/lib/cart";
import { toast } from "sonner";
import { z } from "zod";

const checkoutSchema = z.object({
  fullName: z.string().trim().nonempty("Nom requis").max(100),
  email: z.string().trim().email("Email invalide").max(255),
  phone: z.string().trim().min(8, "Téléphone invalide").max(20),
  address: z.string().trim().nonempty("Adresse requise").max(200),
  city: z.string().trim().nonempty("Ville requise").max(80),
  postalCode: z.string().trim().min(4, "Code postal invalide").max(10),
  notes: z.string().trim().max(500).optional(),
});

const Checkout = () => {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  const [payment, setPayment] = useState("cod");
  const [shipping, setShipping] = useState("standard");
  const [success, setSuccess] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [form, setForm] = useState({
    fullName: "", email: "", phone: "", address: "", city: "", postalCode: "", notes: "",
  });

  const shippingCost = shipping === "express" ? 15 : 0;
  const grandTotal = totalPrice + shippingCost;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = checkoutSchema.safeParse(form);
    if (!result.success) return toast.error(result.error.issues[0].message);
    const id = `DK-${new Date().getFullYear()}-${Math.floor(Math.random() * 9000 + 1000)}`;
    setOrderId(id);
    setSuccess(true);
    clearCart?.();
    toast.success("Commande confirmée !");
  };

  if (items.length === 0 && !success) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-20 text-center">
          <p className="text-lg text-muted-foreground font-body mb-4">Votre panier est vide.</p>
          <Link to="/" className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg font-heading font-semibold">
            Continuer mes achats
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-16 max-w-xl">
          <div className="bg-card rounded-2xl border border-border p-10 text-center shadow-sm">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-badge-new/10 text-badge-new mb-4">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h1 className="text-2xl font-heading font-bold text-foreground mb-2">Commande confirmée !</h1>
            <p className="text-muted-foreground font-body mb-6">
              Merci pour votre achat. Votre numéro de commande est :
            </p>
            <div className="bg-secondary/50 rounded-lg py-3 px-4 inline-block font-heading font-bold text-primary text-lg mb-6">
              {orderId}
            </div>
            <p className="text-sm text-muted-foreground font-body mb-8">
              Un email de confirmation vous a été envoyé. Vous pouvez suivre votre commande depuis votre espace personnel.
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              <Link to="/mon-compte" className="bg-primary text-primary-foreground px-5 py-2.5 rounded-lg font-heading font-semibold text-sm">
                Voir mes commandes
              </Link>
              <Link to="/" className="bg-secondary text-foreground px-5 py-2.5 rounded-lg font-heading font-semibold text-sm">
                Retour à l'accueil
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container py-8">
        <Link to="/panier" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6">
          <ArrowLeft className="h-4 w-4" /> Retour au panier
        </Link>

        <h1 className="text-3xl font-heading font-bold text-foreground mb-8">Finaliser la commande</h1>

        <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Coordonnées */}
            <section className="bg-card rounded-2xl border border-border p-6">
              <div className="flex items-center gap-2 mb-5">
                <User className="h-5 w-5 text-primary" />
                <h2 className="font-heading font-bold text-lg">Vos coordonnées</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="fullName">Nom complet *</Label>
                  <Input id="fullName" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} maxLength={100} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} maxLength={255} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Téléphone *</Label>
                  <Input id="phone" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} maxLength={20} />
                </div>
              </div>
            </section>

            {/* Adresse */}
            <section className="bg-card rounded-2xl border border-border p-6">
              <div className="flex items-center gap-2 mb-5">
                <MapPin className="h-5 w-5 text-primary" />
                <h2 className="font-heading font-bold text-lg">Adresse de livraison</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="address">Adresse *</Label>
                  <Input id="address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} maxLength={200} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">Ville *</Label>
                  <Input id="city" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} maxLength={80} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="postalCode">Code postal *</Label>
                  <Input id="postalCode" value={form.postalCode} onChange={(e) => setForm({ ...form, postalCode: e.target.value })} maxLength={10} />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="notes">Notes (optionnel)</Label>
                  <Textarea id="notes" rows={3} placeholder="Instructions de livraison..." value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} maxLength={500} />
                </div>
              </div>
            </section>

            {/* Livraison */}
            <section className="bg-card rounded-2xl border border-border p-6">
              <div className="flex items-center gap-2 mb-5">
                <Truck className="h-5 w-5 text-primary" />
                <h2 className="font-heading font-bold text-lg">Mode de livraison</h2>
              </div>
              <RadioGroup value={shipping} onValueChange={setShipping} className="space-y-3">
                <label className="flex items-center gap-3 p-4 rounded-xl border border-border hover:border-primary cursor-pointer transition-colors">
                  <RadioGroupItem value="standard" id="standard" />
                  <div className="flex-1">
                    <p className="font-heading font-semibold">Livraison standard</p>
                    <p className="text-sm text-muted-foreground">3-5 jours ouvrés</p>
                  </div>
                  <span className="font-heading font-bold text-badge-new">Gratuite</span>
                </label>
                <label className="flex items-center gap-3 p-4 rounded-xl border border-border hover:border-primary cursor-pointer transition-colors">
                  <RadioGroupItem value="express" id="express" />
                  <div className="flex-1">
                    <p className="font-heading font-semibold">Livraison express</p>
                    <p className="text-sm text-muted-foreground">24-48h</p>
                  </div>
                  <span className="font-heading font-bold">15.000 TND</span>
                </label>
              </RadioGroup>
            </section>

            {/* Paiement */}
            <section className="bg-card rounded-2xl border border-border p-6">
              <div className="flex items-center gap-2 mb-5">
                <CreditCard className="h-5 w-5 text-primary" />
                <h2 className="font-heading font-bold text-lg">Mode de paiement</h2>
              </div>
              <RadioGroup value={payment} onValueChange={setPayment} className="space-y-3">
                <label className="flex items-center gap-3 p-4 rounded-xl border border-border hover:border-primary cursor-pointer transition-colors">
                  <RadioGroupItem value="cod" id="cod" />
                  <Banknote className="h-5 w-5 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="font-heading font-semibold">Paiement à la livraison</p>
                    <p className="text-sm text-muted-foreground">Espèces à la réception</p>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-4 rounded-xl border border-border hover:border-primary cursor-pointer transition-colors">
                  <RadioGroupItem value="card" id="card" />
                  <CreditCard className="h-5 w-5 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="font-heading font-semibold">Carte bancaire</p>
                    <p className="text-sm text-muted-foreground">Visa, Mastercard, e-Dinar</p>
                  </div>
                </label>
              </RadioGroup>
            </section>
          </div>

          {/* Résumé */}
          <aside className="space-y-4">
            <div className="bg-card rounded-2xl border border-border p-6 sticky top-32">
              <h3 className="font-heading font-bold text-lg mb-4">Récapitulatif</h3>
              <div className="space-y-3 max-h-60 overflow-y-auto pr-1 mb-4">
                {items.map(({ product, quantity }) => (
                  <div key={product.id} className="flex gap-3 text-sm">
                    <img src={product.image} alt={product.name} className="w-12 h-12 object-contain rounded-lg bg-secondary/50 p-1 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-heading font-medium line-clamp-1">{product.name}</p>
                      <p className="text-xs text-muted-foreground">x{quantity}</p>
                    </div>
                    <span className="font-semibold whitespace-nowrap">{(parseFloat(product.price) * quantity).toFixed(3)} TND</span>
                  </div>
                ))}
              </div>
              <div className="space-y-2 text-sm border-t border-border pt-4">
                <div className="flex justify-between"><span className="text-muted-foreground">Sous-total</span><span className="font-semibold">{totalPrice.toFixed(3)} TND</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Livraison</span>
                  <span className="font-semibold">{shippingCost === 0 ? <span className="text-badge-new">Gratuite</span> : `${shippingCost.toFixed(3)} TND`}</span>
                </div>
              </div>
              <div className="border-t border-border pt-4 mt-4 flex justify-between items-center">
                <span className="font-heading font-bold">Total</span>
                <span className="font-heading font-bold text-2xl text-primary">{grandTotal.toFixed(3)} TND</span>
              </div>
              <Button type="submit" className="w-full mt-5 py-6 text-base">
                Confirmer la commande
              </Button>
              <div className="flex items-center gap-2 justify-center mt-4 text-xs text-muted-foreground">
                <ShieldCheck className="h-4 w-4" /> Paiement 100% sécurisé
              </div>
            </div>
          </aside>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;
