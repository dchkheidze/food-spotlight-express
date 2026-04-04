import { Star, MapPin, Clock, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Experience } from "@/data/experiencesData";

interface ExperienceCardProps {
  experience: Experience;
}

const ExperienceCard = ({ experience }: ExperienceCardProps) => {
  return (
    <div className="group cursor-pointer bg-card rounded-xl overflow-hidden border border-border hover:border-primary/30 transition-all">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={experience.image}
          alt={experience.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          {experience.isFeatured && (
            <Badge className="bg-primary text-primary-foreground border-0 text-xs font-medium">
              Featured
            </Badge>
          )}
          <Badge variant="secondary" className="bg-card/90 backdrop-blur-sm text-foreground border-0 text-xs">
            {experience.price}
          </Badge>
        </div>
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-card/90 backdrop-blur-sm rounded-full px-2.5 py-1">
          <Star className="h-3.5 w-3.5 fill-primary text-primary" />
          <span className="text-xs font-medium text-foreground">{experience.rating}</span>
          <span className="text-[10px] text-muted-foreground">({experience.reviewCount})</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-display text-base font-medium text-foreground group-hover:text-primary transition-colors leading-tight mb-1">
          {experience.name}
        </h3>
        <p className="text-xs text-primary font-medium mb-2">{experience.hostFamily}</p>
        <div className="flex items-center gap-1 text-muted-foreground mb-1">
          <MapPin className="h-3.5 w-3.5 shrink-0" />
          <span className="text-xs">{experience.location}</span>
        </div>
        <div className="flex items-center gap-3 text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5 shrink-0" />
            <span className="text-xs">{experience.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5 shrink-0" />
            <span className="text-xs">{experience.groupSize}</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5 mb-3">
          {experience.includes.map((item) => (
            <span
              key={item}
              className="text-[11px] px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground"
            >
              {item}
            </span>
          ))}
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">{experience.description}</p>
      </div>
    </div>
  );
};

export default ExperienceCard;
