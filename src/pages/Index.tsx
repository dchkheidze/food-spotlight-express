import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import HighlightCarousel from "@/components/HighlightCarousel";
import CategoryShortcuts from "@/components/CategoryShortcuts";
import FeaturedRestaurants from "@/components/FeaturedRestaurants";
import TopRatedRestaurants from "@/components/TopRatedRestaurants";
import NewOpenings from "@/components/NewOpenings";
import PopularCuisines from "@/components/PopularCuisines";
import CuratedCollections from "@/components/CuratedCollections";
import BlogArticles from "@/components/BlogArticles";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <CategoryShortcuts />
      <FeaturedRestaurants />
      <TopRatedRestaurants />
      <NewOpenings />
      <PopularCuisines />
      <CuratedCollections />
      <BlogArticles />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Index;
