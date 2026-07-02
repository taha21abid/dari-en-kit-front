import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, User, Package, MapPin, LogOut, Edit2, Save, X, Calendar, CheckCircle2, Truck, Clock } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { z } from "zod";

type Order = {
  id: string;
  date: string;
  status: "delivered" | "shipped" | "processing";
  total: number;
  items: { name: string; qty: number; price: number }[];
};

const initialOrders: Order[] = [
  {
    id: "DK-2026-0142",
    date: "2026-06-15",
    status: "delivered",
    total: 489.5,
    items: [
      { name: "Perceuse visseuse 18V", qty: 1, price: 289.0 },
      { name: "Coffret embouts 50 pcs", qty: 1, price: 89.5 },
      { name: "Mèches à béton (lot de 5)", qty: 2, price: 55.5 },
    ],
  },
  {
    id: "DK-2026-0118",
    date: "2026-06-02",
    status: "shipped",
    total: 1240.0,
    items: [
      { name: "Plan de travail chêne 240cm", qty: 1, price: 890.0 },
      { name: "Robinet mitigeur cuisine", qty: 1, price: 350.0 },
    ],
  },
  {
    id: "DK-2026-0097",
    date: "2026-05-21",
    status: "processing",
    total: 76.0,
    items: [{ name: "Lot de visserie inox M6", qty: 4, price: 19.0 }],
  },
];

const statusConfig = {
  delivered: { label: "Livrée", icon: CheckCircle2, className: "bg-primary/10 text-primary border-primary/20" },
  shipped: { label: "Expédiée", icon: Truck, className: "bg-blue-500/10 text-blue-600 border-blue-500/20" },
  processing: { label: "En traitement", icon: Clock, className: "bg-amber-500/10 text-amber-600 border-amber-500/20" },
};

const profileSchema = z.object({
  firstName: z.string().trim().min(2).max(50),
  lastName: z.string().trim().min(2).max(50),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(8).max(20),
  address: z.string().trim().max(200),
});

const MonCompte = () => {
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({
    firstName: "Ahmed",
    lastName: "Ben Salah",
    email: "ahmed.bensalah@example.com",
    phone: "+216 22 345 678",
    address: "12 Avenue Habib Bourguiba, 1000 Tunis",
  });
  const [draft, setDraft] = useState(profile);

  const startEdit = () => {
    setDraft(profile);
    setEditing(true);
  };

  const cancelEdit = () => {
    setDraft(profile);
    setEditing(false);
  };

  const saveEdit = () => {
    const parsed = profileSchema.safeParse(draft);
    if (!parsed.success) {
      toast.error(parsed.error.errors[0].message);
      return;
    }
    setProfile(draft);
    setEditing(false);
    toast.success("Profil mis à jour");
  };

  const initials = `${profile.firstName[0]}${profile.lastName[0]}`;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container py-8">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6">
          <ArrowLeft className="h-4 w-4" /> Accueil
        </Link>

        {/* Header card */}
        <div className="bg-card rounded-2xl border border-border p-6 md:p-8 mb-6 flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="w-16 h-16 rounded-full bg-primary/10 text-primary font-heading font-bold text-xl flex items-center justify-center">
            {initials}
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-heading font-bold">
              Bonjour, {profile.firstName} 👋
            </h1>
            <p className="text-sm text-muted-foreground font-body">{profile.email}</p>
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <LogOut className="h-4 w-4" /> Déconnexion
          </Button>
        </div>

        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList className="bg-card border border-border p-1 h-auto">
            <TabsTrigger value="orders" className="gap-2 px-4 py-2">
              <Package className="h-4 w-4" /> Mes commandes
            </TabsTrigger>
            <TabsTrigger value="profile" className="gap-2 px-4 py-2">
              <User className="h-4 w-4" /> Mon profil
            </TabsTrigger>
            <TabsTrigger value="address" className="gap-2 px-4 py-2">
              <MapPin className="h-4 w-4" /> Adresse
            </TabsTrigger>
          </TabsList>

          {/* Orders */}
          <TabsContent value="orders" className="space-y-4">
            {initialOrders.map((order) => {
              const cfg = statusConfig[order.status];
              const Icon = cfg.icon;
              return (
                <div key={order.id} className="bg-card border border-border rounded-2xl p-6 hover:shadow-md transition-shadow">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-4 border-b border-border">
                    <div>
                      <p className="font-heading font-semibold text-foreground">Commande #{order.id}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(order.date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
                      </p>
                    </div>
                    <Badge variant="outline" className={`gap-1.5 ${cfg.className}`}>
                      <Icon className="h-3 w-3" /> {cfg.label}
                    </Badge>
                  </div>
                  <div className="space-y-2 mb-4">
                    {order.items.map((it, i) => (
                      <div key={i} className="flex justify-between text-sm font-body">
                        <span className="text-muted-foreground">{it.qty} × {it.name}</span>
                        <span className="text-foreground font-medium">{(it.price * it.qty).toFixed(2)} TND</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <span className="text-sm text-muted-foreground">Total</span>
                    <span className="text-lg font-heading font-bold text-primary">{order.total.toFixed(2)} TND</span>
                  </div>
                </div>
              );
            })}
          </TabsContent>

          {/* Profile */}
          <TabsContent value="profile">
            <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-heading font-semibold text-lg">Informations personnelles</h2>
                {!editing ? (
                  <Button variant="outline" size="sm" onClick={startEdit} className="gap-2">
                    <Edit2 className="h-4 w-4" /> Modifier
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={cancelEdit} className="gap-2">
                      <X className="h-4 w-4" /> Annuler
                    </Button>
                    <Button size="sm" onClick={saveEdit} className="gap-2">
                      <Save className="h-4 w-4" /> Enregistrer
                    </Button>
                  </div>
                )}
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label>Prénom</Label>
                  <Input disabled={!editing} maxLength={50} value={editing ? draft.firstName : profile.firstName}
                    onChange={(e) => setDraft({ ...draft, firstName: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Nom</Label>
                  <Input disabled={!editing} maxLength={50} value={editing ? draft.lastName : profile.lastName}
                    onChange={(e) => setDraft({ ...draft, lastName: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input type="email" disabled={!editing} maxLength={255} value={editing ? draft.email : profile.email}
                    onChange={(e) => setDraft({ ...draft, email: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Téléphone</Label>
                  <Input disabled={!editing} maxLength={20} value={editing ? draft.phone : profile.phone}
                    onChange={(e) => setDraft({ ...draft, phone: e.target.value })} />
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Address */}
          <TabsContent value="address">
            <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-heading font-semibold text-lg">Adresse de livraison</h2>
                {!editing ? (
                  <Button variant="outline" size="sm" onClick={startEdit} className="gap-2">
                    <Edit2 className="h-4 w-4" /> Modifier
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={cancelEdit} className="gap-2">
                      <X className="h-4 w-4" /> Annuler
                    </Button>
                    <Button size="sm" onClick={saveEdit} className="gap-2">
                      <Save className="h-4 w-4" /> Enregistrer
                    </Button>
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <Label>Adresse complète</Label>
                <Textarea
                  disabled={!editing}
                  maxLength={200}
                  rows={3}
                  value={editing ? draft.address : profile.address}
                  onChange={(e) => setDraft({ ...draft, address: e.target.value })}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
};

export default MonCompte;
