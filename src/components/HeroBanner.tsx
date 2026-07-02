import { Link } from "react-router-dom";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface Slide {
  image: string;
  eyebrow: string;
  title: string;
  highlight: string;
  text: string;
  cta: { label: string; to: string };
}

const slides: Slide[] = [
  {
    image: "https://www.promodar.com.tn/Fr/upload/1584083176.jpg",
    eyebrow: "Nouveautés",
    title: "Électroménagers",
    highlight: "Encastrables",
    text: "Hottes, fours, micro-ondes et machines à café pour sublimer votre cuisine.",
    cta: { label: "Découvrir", to: "/recherche?category=Électroménagers%20Encastrables" },
  },
  {
    image: "https://www.promodar.com.tn/Fr/upload/1590584378.jpg",
    eyebrow: "Tendance",
    title: "Salle de bains &",
    highlight: "Sanitaires",
    text: "Robinetterie, vidages, siphons et accessoires haut de gamme.",
    cta: { label: "Voir la collection", to: "/recherche?category=Salle%20de%20Bains%20%26%20Sanitaires" },
  },
  {
    image: "https://www.promodar.com.tn/Fr/upload/1584083056.jpg",
    eyebrow: "Inspiration",
    title: "Revêtements &",
    highlight: "Chauffages",
    text: "Mosaïques, cheminées éthanol et radiateurs design pour chaque espace.",
    cta: { label: "Explorer", to: "/recherche?category=Revêtements%20%26%20Chauffages" },
  },
  {
    image: "https://www.promodar.com.tn/Fr/upload/1584083111.jpg",
    eyebrow: "Pro & Particuliers",
    title: "Accessoires",
    highlight: "Meuble & Machine",
    text: "Systèmes Blum, coulisses, charnières et solutions d'assemblage.",
    cta: { label: "Voir les produits", to: "/recherche?category=Accessoires%20Meuble" },
  },
];

const HeroBanner = () => {
  const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));

  return (
    <section className="relative overflow-hidden bg-secondary/40">
      <Carousel
        plugins={[plugin.current]}
        opts={{ loop: true }}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        className="w-full"
      >
        <CarouselContent>
          {slides.map((slide, idx) => (
            <CarouselItem key={idx}>
              <div className="relative h-[380px] md:h-[520px]">
                <img
                  src={slide.image}
                  alt={`${slide.title} ${slide.highlight}`}
                  className="w-full h-full object-cover"
                  loading={idx === 0 ? "eager" : "lazy"}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-foreground/85 via-foreground/45 to-transparent" />
                <div className="absolute inset-0 flex items-center">
                  <div className="container">
                    <div className="max-w-xl space-y-5 animate-fade-in-up">
                      <span className="inline-block bg-primary/90 text-primary-foreground px-3 py-1 rounded-full text-xs font-heading font-semibold uppercase tracking-wider">
                        {slide.eyebrow}
                      </span>
                      <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-card leading-tight">
                        {slide.title}{" "}
                        <span className="text-primary">{slide.highlight}</span>
                      </h1>
                      <p className="text-card/85 text-lg font-body">{slide.text}</p>
                      <div className="flex flex-wrap gap-3">
                        <Link
                          to={slide.cta.to}
                          className="bg-primary text-primary-foreground px-8 py-3.5 rounded-lg font-heading font-semibold hover:opacity-90 transition-opacity shadow-lg"
                        >
                          {slide.cta.label}
                        </Link>
                        <Link
                          to="/categories"
                          className="bg-card/15 backdrop-blur-sm text-card border border-card/30 px-8 py-3.5 rounded-lg font-heading font-semibold hover:bg-card/25 transition-colors"
                        >
                          Nos catégories
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4 hidden md:flex" />
        <CarouselNext className="right-4 hidden md:flex" />
      </Carousel>
    </section>
  );
};

export default HeroBanner;
