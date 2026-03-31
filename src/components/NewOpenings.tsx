import RestaurantCard from "./RestaurantCard";
import { newOpenings } from "@/data/mockData";

const NewOpenings = () => {
  return (
    <section className="py-16 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="mb-10">
          <p className="text-primary text-sm font-semibold tracking-[0.15em] uppercase mb-2">Just opened</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">New Openings</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newOpenings.map((r) => (
            <RestaurantCard key={r.id} restaurant={r} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewOpenings;
