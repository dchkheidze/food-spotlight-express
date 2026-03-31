import { UtensilsCrossed, Coffee, Wine, Croissant, Zap, Gem } from "lucide-react";

const categories = [
  { name: "Restaurants", icon: UtensilsCrossed },
  { name: "Cafés", icon: Coffee },
  { name: "Bars", icon: Wine },
  { name: "Bakeries", icon: Croissant },
  { name: "Fast Food", icon: Zap },
  { name: "Fine Dining", icon: Gem },
];

const CategoryShortcuts = () => {
  return (
    <section className="py-12 bg-card">
      <div className="container mx-auto px-4">
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide justify-start md:justify-center">
          {categories.map((cat) => (
            <button
              key={cat.name}
              className="flex flex-col items-center gap-3 min-w-[100px] px-6 py-5 rounded-2xl bg-secondary hover:bg-primary hover:text-primary-foreground text-foreground transition-all duration-300 group cursor-pointer"
            >
              <cat.icon className="h-7 w-7 text-primary group-hover:text-primary-foreground transition-colors" />
              <span className="text-sm font-medium whitespace-nowrap">{cat.name}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryShortcuts;
