import { Star, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Restaurant } from "@/data/mockData";

interface RestaurantCardProps {
  restaurant: Restaurant;
  variant?: "default" | "compact";
}

const RestaurantCard = ({ restaurant, variant = "default" }: RestaurantCardProps) => {
  const isCompact = variant === "compact";

  return (
    <div className="group cursor-pointer bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-border">
      {/* Image */}
      <div className={`relative overflow-hidden ${isCompact ? "h-44" : "h-56"}`}>
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {restaurant.isNew && (
            <Badge className="bg-primary text-primary-foreground border-0 font-semibold text-xs">
              New
            </Badge>
          )}
          <Badge variant="secondary" className="bg-card/90 backdrop-blur-sm text-foreground border-0 text-xs">
            {restaurant.priceRange}
          </Badge>
        </div>

        {/* Rating */}
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-card/90 backdrop-blur-sm rounded-full px-2.5 py-1">
          <Star className="h-3.5 w-3.5 fill-gold text-gold" />
          <span className="text-xs font-semibold text-foreground">{restaurant.rating}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors leading-tight">
            {restaurant.name}
          </h3>
        </div>
        <p className="text-xs font-medium text-primary mb-1">{restaurant.cuisine}</p>
        <div className="flex items-center gap-1 text-muted-foreground mb-2">
          <MapPin className="h-3.5 w-3.5" />
          <span className="text-xs">{restaurant.location}</span>
        </div>
        {!isCompact && (
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
            {restaurant.description}
          </p>
        )}
        {restaurant.openedDate && (
          <p className="text-xs text-muted-foreground mt-2">Opened {restaurant.openedDate}</p>
        )}
      </div>
    </div>
  );
};

export default RestaurantCard;
