import { cuisines } from "@/data/mockData";

const PopularCuisines = () => {
  return (
    <section id="cuisines" className="py-16 lg:py-20 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <p className="text-primary text-sm font-semibold tracking-[0.15em] uppercase mb-2">Explore by taste</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">Popular Cuisines</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {cuisines.map((cuisine) => (
            <a
              key={cuisine.id}
              href="#"
              className="group relative h-40 sm:h-48 rounded-2xl overflow-hidden cursor-pointer"
            >
              <img
                src={cuisine.image}
                alt={cuisine.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent group-hover:from-primary/80 transition-all duration-300" />
              <div className="absolute bottom-4 left-4">
                <h3 className="font-display text-lg font-bold text-white">{cuisine.name}</h3>
                <p className="text-white/80 text-xs">{cuisine.count} places</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularCuisines;
