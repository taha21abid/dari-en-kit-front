import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().trim().email("Email invalide").max(255),
  password: z.string().min(6, "Mot de passe trop court").max(100),
});

const signupSchema = z.object({
  name: z.string().trim().nonempty("Nom requis").max(100),
  email: z.string().trim().email("Email invalide").max(255),
  password: z.string().min(6, "6 caractères minimum").max(100),
});

const Login = () => {
  const navigate = useNavigate();
  const [showPwd, setShowPwd] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({ name: "", email: "", password: "" });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const result = loginSchema.safeParse(loginData);
    if (!result.success) return toast.error(result.error.issues[0].message);
    toast.success("Connexion réussie !");
    setTimeout(() => navigate("/mon-compte"), 600);
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    const result = signupSchema.safeParse(signupData);
    if (!result.success) return toast.error(result.error.issues[0].message);
    toast.success("Compte créé avec succès !");
    setTimeout(() => navigate("/mon-compte"), 600);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container py-10 max-w-md">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6">
          <ArrowLeft className="h-4 w-4" /> Retour à l'accueil
        </Link>

        <div className="bg-card rounded-2xl border border-border p-8 shadow-sm">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-3">
              <User className="h-7 w-7" />
            </div>
            <h1 className="text-2xl font-heading font-bold text-foreground">Bienvenue</h1>
            <p className="text-sm text-muted-foreground font-body mt-1">Connectez-vous à votre compte Dari en kit</p>
          </div>

          <Tabs defaultValue="login">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Connexion</TabsTrigger>
              <TabsTrigger value="signup">Inscription</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="login-email" type="email" placeholder="vous@exemple.com" className="pl-9"
                      value={loginData.email} onChange={(e) => setLoginData({ ...loginData, email: e.target.value })} maxLength={255} />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="login-pwd">Mot de passe</Label>
                    <a href="#" className="text-xs text-primary hover:underline">Oublié ?</a>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="login-pwd" type={showPwd ? "text" : "password"} placeholder="••••••••" className="pl-9 pr-9"
                      value={loginData.password} onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} maxLength={100} />
                    <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                      {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <Button type="submit" className="w-full">Se connecter</Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name">Nom complet</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="signup-name" placeholder="Jean Dupont" className="pl-9"
                      value={signupData.name} onChange={(e) => setSignupData({ ...signupData, name: e.target.value })} maxLength={100} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="signup-email" type="email" placeholder="vous@exemple.com" className="pl-9"
                      value={signupData.email} onChange={(e) => setSignupData({ ...signupData, email: e.target.value })} maxLength={255} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-pwd">Mot de passe</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="signup-pwd" type="password" placeholder="6 caractères minimum" className="pl-9"
                      value={signupData.password} onChange={(e) => setSignupData({ ...signupData, password: e.target.value })} maxLength={100} />
                  </div>
                </div>
                <Button type="submit" className="w-full">Créer mon compte</Button>
              </form>
            </TabsContent>
          </Tabs>

          <p className="text-center text-xs text-muted-foreground mt-6 font-body">
            En continuant, vous acceptez nos conditions d'utilisation.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
