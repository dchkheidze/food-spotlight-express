import { collections } from "@/data/mockData";
import { ArrowRight } from "lucide-react";

const CuratedCollections = () => {
  return (
    <section id="collections" className="py-16 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <p className="text-primary text-sm font-semibold tracking-[0.15em] uppercase mb-2">Curated for you</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">Editor's Collections</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {collections.map((col) => (
            <a
              key={col.id}
              href="#"
              className="group relative h-72 rounded-2xl overflow-hidden cursor-pointer"
            >
              <img
                src={col.image}
                alt={col.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="font-display text-xl font-bold text-white mb-1">{col.title}</h3>
                <p className="text-white/80 text-sm mb-3 line-clamp-2">{col.description}</p>
                <span className="inline-flex items-center gap-1 text-primary text-sm font-semibold group-hover:underline">
                  {col.restaurantCount} restaurants <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CuratedCollections;
