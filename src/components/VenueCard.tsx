import { Star, MapPin, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Venue } from "@/data/venuesData";

interface VenueCardProps {
  venue: Venue;
}

const VenueCard = ({ venue }: VenueCardProps) => {
  return (
    <div className="group cursor-pointer bg-card rounded-xl overflow-hidden border border-border hover:border-primary/30 transition-all">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={venue.image}
          alt={venue.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          {venue.isFeatured && (
            <Badge className="bg-primary text-primary-foreground border-0 text-xs font-medium">
              Featured
            </Badge>
          )}
          <Badge variant="secondary" className="bg-card/90 backdrop-blur-sm text-foreground border-0 text-xs">
            {venue.priceRange}
          </Badge>
        </div>
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-card/90 backdrop-blur-sm rounded-full px-2.5 py-1">
          <Star className="h-3.5 w-3.5 fill-primary text-primary" />
          <span className="text-xs font-medium text-foreground">{venue.rating}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-display text-base font-medium text-foreground group-hover:text-primary transition-colors leading-tight mb-1">
          {venue.name}
        </h3>
        <div className="flex items-center gap-1 text-muted-foreground mb-2">
          <MapPin className="h-3.5 w-3.5 shrink-0" />
          <span className="text-xs">{venue.location}</span>
        </div>
        <div className="flex items-center gap-1 text-muted-foreground mb-3">
          <Users className="h-3.5 w-3.5 shrink-0" />
          <span className="text-xs">{venue.capacity}</span>
        </div>
        <div className="flex flex-wrap gap-1.5 mb-3">
          {venue.eventTypes.map((type) => (
            <span
              key={type}
              className="text-[11px] px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground"
            >
              {type}
            </span>
          ))}
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">{venue.description}</p>
      </div>
    </div>
  );
};

export default VenueCard;
