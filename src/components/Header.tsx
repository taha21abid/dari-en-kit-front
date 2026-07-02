import { Search, Phone, User, Heart, ShoppingCart, Menu, ChevronDown, ChevronRight, X, Home, Grid3X3, Info, Tag } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { useCart } from "@/lib/cart";
import { categoriesData } from "@/lib/products";
import logo from "@/assets/logo.png";

const navLinks = [
  { label: "Accueil", to: "/", icon: Home },
  { label: "Catégories", to: "/categories", icon: Grid3X3 },
  { label: "Nouveautés", to: "/recherche", icon: Tag, badge: "new" as const },
  { label: "Promotions", to: "/recherche?category=", icon: Tag, badge: "promo" as const },
  { label: "À propos", to: "/a-propos", icon: Info },
  { label: "Contact", to: "/contact", icon: Phone },
];

const TopBar = () => {
  return (
  <div className="bg-topbar text-topbar-foreground">
    <div className="container flex items-center justify-between py-2 text-sm">
      <span className="hidden md:block opacity-80">Livraison partout en Tunisie 🇹🇳</span>
      <div className="flex items-center gap-6">
        <a href="tel:+21658415400" className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity">
          <Phone className="h-3.5 w-3.5" />
          <span>+216 58 415 400</span>
        </a>
        <Link to="/login" className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity">
          <User className="h-3.5 w-3.5" />
          <span>Connexion</span>
        </Link>
        <Link to="/mon-compte" className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity">
          <User className="h-3.5 w-3.5" />
          <span>Mon Compte</span>
        </Link>
      </div>
    </div>
  </div>
  );
};

const Header = () => {
  const [catOpen, setCatOpen] = useState(false);
  const [hoveredCat, setHoveredCat] = useState<string | null>(null);
  const [mobileExpandedCat, setMobileExpandedCat] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { totalItems } = useCart();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/recherche?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-50">
      <TopBar />
      {/* Main Header */}
      <div className="bg-card shadow-sm border-b border-border">
        <div className="container flex items-center justify-between gap-4 py-4">
          {/* Mobile hamburger */}
          <Sheet>
            <SheetTrigger asChild>
              <button className="lg:hidden p-2 rounded-lg hover:bg-accent transition-colors">
                <Menu className="h-6 w-6 text-foreground" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] p-0 overflow-y-auto">
              <SheetHeader className="p-5 border-b border-border">
                <SheetTitle className="flex items-center gap-3">
                  <img src={logo} alt="Dari en kit" className="h-8 w-auto" />
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col py-2">
                {navLinks.map((link) => (
                  <SheetClose asChild key={link.label}>
                    <Link
                      to={link.to}
                      className="flex items-center gap-3 px-5 py-3.5 text-sm font-heading font-medium text-foreground hover:bg-accent transition-colors"
                    >
                      <link.icon className="h-5 w-5 text-muted-foreground" />
                      {link.label}
                      {link.badge === "new" && (
                        <span className="bg-badge-new text-primary-foreground text-[10px] px-1.5 py-0.5 rounded-full font-semibold ml-auto">NEW</span>
                      )}
                      {link.badge === "promo" && (
                        <span className="bg-badge-promo text-primary-foreground text-[10px] px-1.5 py-0.5 rounded-full font-semibold ml-auto">%</span>
                      )}
                    </Link>
                  </SheetClose>
                ))}

                <div className="border-t border-border my-2" />
                <p className="px-5 py-2 text-xs text-muted-foreground font-heading font-semibold uppercase tracking-wider">Catégories</p>
                {categoriesData.map((cat) => (
                  <div key={cat.name}>
                    <button
                      onClick={() => setMobileExpandedCat(mobileExpandedCat === cat.name ? null : cat.name)}
                      className="w-full flex items-center justify-between px-5 py-3 text-sm font-heading font-medium text-foreground hover:bg-accent transition-colors"
                    >
                      {cat.name}
                      <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${mobileExpandedCat === cat.name ? "rotate-180" : ""}`} />
                    </button>
                    {mobileExpandedCat === cat.name && (
                      <div className="bg-accent/50">
                        {cat.subcategories.map((sub) => (
                          <SheetClose asChild key={sub.name}>
                            <Link
                              to={`/recherche?category=${encodeURIComponent(cat.name)}&sub=${encodeURIComponent(sub.name)}`}
                              className="block px-9 py-2.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                            >
                              {sub.name}
                            </Link>
                          </SheetClose>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img src={logo} alt="Dari en kit" className="h-12 w-auto" />
          </Link>

          {/* Search */}
          <form onSubmit={handleSearch} className="flex-1 max-w-2xl hidden md:flex items-center border-2 border-primary rounded-lg overflow-hidden">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher un produit..."
              className="flex-1 px-4 py-2.5 bg-transparent outline-none text-sm font-body"
            />
            <button type="submit" className="bg-primary text-primary-foreground px-5 py-2.5 hover:opacity-90 transition-opacity">
              <Search className="h-5 w-5" />
            </button>
          </form>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Link to="/recherche" className="md:hidden p-2 rounded-lg hover:bg-accent transition-colors">
              <Search className="h-5 w-5 text-foreground" />
            </Link>
            <button className="relative p-2 rounded-lg hover:bg-accent transition-colors">
              <Heart className="h-5 w-5 text-foreground" />
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold">0</span>
            </button>
            <Link to="/panier" className="relative p-2 rounded-lg hover:bg-accent transition-colors">
              <ShoppingCart className="h-5 w-5 text-foreground" />
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold">{totalItems}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation - desktop only */}
      <nav className="bg-card border-b border-border shadow-sm hidden md:block">
        <div className="container flex items-center gap-1 py-0">
          {/* Categories dropdown with subcategories */}
          <div className="relative" onMouseLeave={() => { setCatOpen(false); setHoveredCat(null); }}>
            <button
              onMouseEnter={() => setCatOpen(true)}
              onClick={() => setCatOpen(!catOpen)}
              className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-3.5 font-heading font-semibold text-sm hover:opacity-90 transition-opacity"
            >
              <Menu className="h-4 w-4" />
              Toutes les Catégories
              <ChevronDown className={`h-4 w-4 transition-transform ${catOpen ? 'rotate-180' : ''}`} />
            </button>
            {catOpen && (
              <div className="absolute top-full left-0 bg-card border border-border rounded-b-lg shadow-lg w-64 z-50 animate-fade-in-up">
                {categoriesData.map((cat) => (
                  <div
                    key={cat.name}
                    className="relative"
                    onMouseEnter={() => setHoveredCat(cat.name)}
                  >
                    <Link
                      to={`/recherche?category=${encodeURIComponent(cat.name)}`}
                      onClick={() => setCatOpen(false)}
                      className="flex items-center justify-between px-5 py-3 text-sm hover:bg-accent hover:text-accent-foreground transition-colors border-b border-border last:border-0"
                    >
                      {cat.name}
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </Link>
                    {/* Subcategory flyout */}
                    {hoveredCat === cat.name && (
                      <div className="absolute top-0 left-full bg-card border border-border rounded-lg shadow-lg w-56 z-50 py-2">
                        {cat.subcategories.map((sub) => (
                          <Link
                            key={sub.name}
                            to={`/recherche?category=${encodeURIComponent(cat.name)}&sub=${encodeURIComponent(sub.name)}`}
                            onClick={() => setCatOpen(false)}
                            className="block px-5 py-2.5 text-sm text-foreground hover:bg-accent hover:text-primary transition-colors"
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Nav links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.slice(1).map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="relative px-4 py-3.5 text-sm font-heading font-medium text-foreground hover:text-primary transition-colors"
              >
                {link.label}
                {link.badge === "new" && (
                  <span className="absolute top-1.5 -right-0.5 bg-badge-new text-primary-foreground text-[10px] px-1.5 py-0.5 rounded-full font-semibold">NEW</span>
                )}
                {link.badge === "promo" && (
                  <span className="absolute top-1.5 -right-1 bg-badge-promo text-primary-foreground text-[10px] px-1.5 py-0.5 rounded-full font-semibold">%</span>
                )}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <Link
            to="/rendez-vous"
            className="ml-auto hidden md:flex items-center gap-2 px-5 py-2.5 my-1 bg-accent text-accent-foreground rounded-lg font-heading font-semibold text-sm hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            📅 Prise de rendez-vous
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;