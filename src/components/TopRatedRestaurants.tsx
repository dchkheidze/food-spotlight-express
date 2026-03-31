import RestaurantCard from "./RestaurantCard";
import { topRatedRestaurants } from "@/data/mockData";
import { ArrowRight } from "lucide-react";

const TopRatedRestaurants = () => {
  return (
    <section className="py-16 lg:py-20 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-primary text-sm font-semibold tracking-[0.15em] uppercase mb-2">Highest rated</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">Top Rated</h2>
          </div>
          <a href="#" className="hidden sm:flex items-center gap-1 text-sm font-medium text-primary hover:underline">
            View all <ArrowRight className="h-4 w-4" />
          </a>
        </div>
        <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide">
          {topRatedRestaurants.map((r) => (
            <div key={r.id} className="min-w-[280px] max-w-[300px] shrink-0">
              <RestaurantCard restaurant={r} variant="compact" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopRatedRestaurants;
