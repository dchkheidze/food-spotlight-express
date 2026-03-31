import { Search, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const HeroSection = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&h=900&fit=crop')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-foreground/60 via-foreground/50 to-foreground/70" />

      <div className="relative z-10 container mx-auto px-4 text-center">
        <p className="font-body text-primary text-sm font-semibold tracking-[0.2em] uppercase mb-4">
          Your culinary journey starts here
        </p>
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
          Discover Your Next<br />
          <span className="text-primary">Favorite Place</span>
        </h1>
        <p className="font-body text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-10">
          Explore the best restaurants, cafés, and bars — curated by food lovers, for food lovers.
        </p>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto bg-card/95 backdrop-blur-sm rounded-2xl p-2 shadow-2xl flex flex-col sm:flex-row gap-2">
          <div className="flex-1 flex items-center gap-2 px-3">
            <MapPin className="h-5 w-5 text-muted-foreground shrink-0" />
            <Input
              placeholder="Location"
              className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-foreground placeholder:text-muted-foreground"
            />
          </div>
          <div className="hidden sm:block w-px bg-border" />
          <div className="flex-1 flex items-center gap-2 px-3">
            <Search className="h-5 w-5 text-muted-foreground shrink-0" />
            <Input
              placeholder="Cuisine or restaurant"
              className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-foreground placeholder:text-muted-foreground"
            />
          </div>
          <Button size="lg" className="rounded-xl font-semibold px-8">
            Search
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
