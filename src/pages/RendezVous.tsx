import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Calendar as CalendarIcon, Clock, MapPin, Wrench, CheckCircle2, User, Phone, Mail, MessageSquare } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { z } from "zod";

const services = [
  { id: "conseil", label: "Conseil produit", icon: Wrench },
  { id: "devis", label: "Devis personnalisé", icon: MessageSquare },
  { id: "installation", label: "Installation cuisine / dressing", icon: Wrench },
  { id: "sav", label: "Service après-vente", icon: CheckCircle2 },
];

const stores = [
  { id: "tunis", label: "Tunis - Centre ville" },
  { id: "ariana", label: "Ariana - Soukra" },
  { id: "sfax", label: "Sfax - Route de Tunis" },
  { id: "sousse", label: "Sousse - Khezama" },
];

const timeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00",
];

const schema = z.object({
  name: z.string().trim().min(2, "Nom trop court").max(80),
  phone: z.string().trim().min(8, "Téléphone invalide").max(20),
  email: z.string().trim().email("Email invalide").max(255),
  message: z.string().trim().max(500).optional(),
});

const RendezVous = () => {
  const [service, setService] = useState<string>("conseil");
  const [store, setStore] = useState<string>("tunis");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState<string>("");
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [confirmed, setConfirmed] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !time) {
      toast.error("Sélectionnez une date et un créneau horaire.");
      return;
    }
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.errors[0].message);
      return;
    }
    setConfirmed(true);
    toast.success("Rendez-vous confirmé !");
  };

  if (confirmed && date) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-16">
          <div className="max-w-xl mx-auto bg-card border border-border rounded-2xl p-10 text-center shadow-sm">
            <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-primary/10 flex items-center justify-center">
              <CheckCircle2 className="h-9 w-9 text-primary" />
            </div>
            <h1 className="text-2xl font-heading font-bold mb-2">Rendez-vous confirmé</h1>
            <p className="text-muted-foreground font-body mb-6">
              Merci {form.name}, votre rendez-vous est enregistré.
            </p>
            <div className="bg-accent/40 rounded-xl p-5 text-left space-y-2 text-sm font-body mb-6">
              <p><strong>Service :</strong> {services.find(s => s.id === service)?.label}</p>
              <p><strong>Magasin :</strong> {stores.find(s => s.id === store)?.label}</p>
              <p><strong>Date :</strong> {format(date, "EEEE d MMMM yyyy", { locale: fr })}</p>
              <p><strong>Heure :</strong> {time}</p>
            </div>
            <Link to="/" className="inline-block">
              <Button>Retour à l'accueil</Button>
            </Link>
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
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6">
          <ArrowLeft className="h-4 w-4" /> Accueil
        </Link>

        <div className="bg-card rounded-2xl border border-border p-8 md:p-12 mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-heading font-bold mb-3">
            Prendre <span className="text-primary">rendez-vous</span>
          </h1>
          <p className="text-muted-foreground font-body max-w-xl mx-auto">
            Réservez un créneau avec nos experts pour un conseil, un devis ou un service personnalisé.
          </p>
        </div>

        <form onSubmit={onSubmit} className="grid lg:grid-cols-3 gap-6">
          {/* Left - service & store */}
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-2xl p-6">
              <h2 className="font-heading font-semibold mb-4 flex items-center gap-2">
                <Wrench className="h-4 w-4 text-primary" /> Service
              </h2>
              <div className="space-y-2">
                {services.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setService(s.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-body text-left transition-all ${
                      service === s.id
                        ? "border-primary bg-primary/5 text-foreground"
                        : "border-border hover:border-primary/40 hover:bg-accent/50"
                    }`}
                  >
                    <s.icon className={`h-4 w-4 ${service === s.id ? "text-primary" : "text-muted-foreground"}`} />
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6">
              <h2 className="font-heading font-semibold mb-4 flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" /> Magasin
              </h2>
              <div className="space-y-2">
                {stores.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setStore(s.id)}
                    className={`w-full px-4 py-3 rounded-xl border text-sm font-body text-left transition-all ${
                      store === s.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/40 hover:bg-accent/50"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Middle - date & time */}
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-2xl p-6">
              <h2 className="font-heading font-semibold mb-4 flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-primary" /> Date
              </h2>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={(d) => d < new Date(new Date().setHours(0,0,0,0)) || d.getDay() === 0}
                locale={fr}
                className="pointer-events-auto rounded-xl border border-border"
              />
            </div>

            <div className="bg-card border border-border rounded-2xl p-6">
              <h2 className="font-heading font-semibold mb-4 flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" /> Créneau
              </h2>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTime(t)}
                    className={`px-3 py-2 rounded-lg border text-sm font-body transition-all ${
                      time === t
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border hover:border-primary/50 hover:bg-accent/50"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right - contact */}
          <div className="bg-card border border-border rounded-2xl p-6 h-fit lg:sticky lg:top-32 space-y-5">
            <h2 className="font-heading font-semibold flex items-center gap-2">
              <User className="h-4 w-4 text-primary" /> Vos coordonnées
            </h2>

            <div className="space-y-2">
              <Label htmlFor="name">Nom complet</Label>
              <Input id="name" maxLength={80} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Jean Dupont" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2"><Phone className="h-3.5 w-3.5" /> Téléphone</Label>
              <Input id="phone" maxLength={20} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+216 XX XXX XXX" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2"><Mail className="h-3.5 w-3.5" /> Email</Label>
              <Input id="email" type="email" maxLength={255} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="vous@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message (optionnel)</Label>
              <Textarea id="message" maxLength={500} rows={3} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Détails sur votre demande..." />
            </div>

            <div className="rounded-xl bg-accent/40 p-3 text-xs font-body text-muted-foreground">
              {date && time ? (
                <>📅 {format(date, "EEEE d MMMM", { locale: fr })} à <strong>{time}</strong></>
              ) : (
                "Sélectionnez une date et une heure"
              )}
            </div>

            <Button type="submit" className="w-full" size="lg">
              Confirmer le rendez-vous
            </Button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default RendezVous;
