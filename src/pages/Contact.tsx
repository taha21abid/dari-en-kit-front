import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Mail, Phone, MapPin, Clock, Send, MessageSquare } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().nonempty("Nom requis").max(100),
  email: z.string().trim().email("Email invalide").max(255),
  phone: z.string().trim().max(20).optional(),
  subject: z.string().trim().nonempty("Sujet requis").max(150),
  message: z.string().trim().nonempty("Message requis").max(1000),
});

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(form);
    if (!result.success) return toast.error(result.error.issues[0].message);
    toast.success("Message envoyé ! Nous vous répondrons rapidement.");
    setForm({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  const infos = [
    { icon: MapPin, title: "Adresse", lines: ["Route de Tunis KM4", "Nabeul 8030, Tunisie"] },
    { icon: Phone, title: "Téléphone", lines: ["+216 58 415 400", "Lun-Sam 9h-18h"] },
    { icon: Mail, title: "Email", lines: ["contact@enkit.tn", "www.enkit.tn"] },
    { icon: Clock, title: "Horaires", lines: ["Lun - Ven : 9h - 19h", "Samedi : 9h - 17h"] },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container py-10">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6">
          <ArrowLeft className="h-4 w-4" /> Retour à l'accueil
        </Link>

        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-3">
            <MessageSquare className="h-7 w-7" />
          </div>
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground">Contactez-nous</h1>
          <p className="text-muted-foreground font-body mt-2 max-w-xl mx-auto">
            Une question, un conseil ou un devis ? Notre équipe est à votre écoute.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-10">
          {infos.map((info) => (
            <div key={info.title} className="bg-card rounded-2xl border border-border p-5 flex gap-4 items-start hover:shadow-md transition-shadow">
              <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                <info.icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-foreground">{info.title}</h3>
                {info.lines.map((l) => (
                  <p key={l} className="text-sm text-muted-foreground font-body">{l}</p>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-card rounded-2xl border border-border p-8 shadow-sm">
            <h2 className="text-xl font-heading font-bold text-foreground mb-6">Envoyez-nous un message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom complet *</Label>
                  <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} maxLength={100} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input id="phone" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} maxLength={20} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} maxLength={255} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Sujet *</Label>
                <Input id="subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} maxLength={150} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message *</Label>
                <Textarea id="message" rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} maxLength={1000} />
                <p className="text-xs text-muted-foreground text-right">{form.message.length}/1000</p>
              </div>
              <Button type="submit" className="w-full gap-2">
                <Send className="h-4 w-4" /> Envoyer le message
              </Button>
            </form>
          </div>

          <div className="rounded-2xl overflow-hidden border border-border bg-card min-h-[400px]">
            <iframe
              title="Localisation Dari en kit — Nabeul"
              src="https://www.openstreetmap.org/export/embed.html?bbox=10.69%2C36.43%2C10.77%2C36.48&layer=mapnik&marker=36.4561%2C10.7376"
              className="w-full h-full min-h-[400px] border-0"
              loading="lazy"
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
