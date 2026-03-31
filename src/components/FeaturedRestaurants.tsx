import RestaurantCard from "./RestaurantCard";
import { featuredRestaurants } from "@/data/mockData";
import { ArrowRight } from "lucide-react";

const FeaturedRestaurants = () => {
  return (
    <section id="discover" className="py-16 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-primary text-sm font-semibold tracking-[0.15em] uppercase mb-2">Handpicked for you</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">Featured Restaurants</h2>
          </div>
          <a href="#" className="hidden sm:flex items-center gap-1 text-sm font-medium text-primary hover:underline">
            View all <ArrowRight className="h-4 w-4" />
          </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredRestaurants.map((r) => (
            <RestaurantCard key={r.id} restaurant={r} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedRestaurants;
