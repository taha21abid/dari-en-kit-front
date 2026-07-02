import Header from "@/components/Header";
import HeroBanner from "@/components/HeroBanner";
import FeatureBar from "@/components/FeatureBar";
import CategoryGrid from "@/components/CategoryGrid";
import ProductGrid from "@/components/ProductGrid";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroBanner />
      <FeatureBar />
      <CategoryGrid />
      <ProductGrid />
      <Footer />
    </div>
  );
};

export default Index;
