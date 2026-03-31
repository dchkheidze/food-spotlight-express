import { Link } from "react-router-dom";
import Autoplay from "embla-carousel-autoplay";
import { newOpenings } from "@/data/mockData";
import { foodEvents } from "@/data/eventsData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { CalendarDays, MapPin } from "lucide-react";

type Slide =
  | { type: "opening"; id: string; title: string; image: string; description: string; location: string; openedDate?: string }
  | { type: "event"; id: string; title: string; image: string; description: string; venue: string; date: string };

const slides: Slide[] = [];

// Interleave openings and events
const maxLen = Math.max(newOpenings.length, foodEvents.length);
for (let i = 0; i < maxLen; i++) {
  if (i < newOpenings.length) {
    const r = newOpenings[i];
    slides.push({ type: "opening", id: r.id, title: r.name, image: r.image, description: r.description, location: r.location, openedDate: r.openedDate });
  }
  if (i < foodEvents.length) {
    const e = foodEvents[i];
    slides.push({ type: "event", id: e.id, title: e.title, image: e.image, description: e.description, venue: e.venue, date: e.date });
  }
}

const formatDate = (d: string) => {
  const date = new Date(d);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

const HighlightCarousel = () => {
  return (
    <section>
      <Carousel
          opts={{ loop: true, align: "start" }}
          plugins={[Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true })]}
          className="w-full"
        >
          <CarouselContent>
            {slides.map((slide, idx) => (
              <CarouselItem key={`${slide.type}-${slide.id}-${idx}`}>
                <div className="relative h-[320px] md:h-[400px] rounded-2xl overflow-hidden group">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 flex flex-col gap-3">
                    <Badge className={slide.type === "opening" ? "bg-primary text-primary-foreground w-fit" : "bg-accent text-accent-foreground w-fit"}>
                      {slide.type === "opening" ? "New Opening" : "Upcoming Event"}
                    </Badge>
                    <h3 className="font-display text-2xl md:text-3xl font-bold text-white">{slide.title}</h3>
                    <p className="text-white/80 text-sm md:text-base line-clamp-1 max-w-2xl">{slide.description}</p>
                    <div className="flex items-center gap-4 text-white/70 text-sm">
                      {slide.type === "opening" ? (
                        <>
                          <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{slide.location}</span>
                          {slide.openedDate && <span>Opened {slide.openedDate}</span>}
                        </>
                      ) : (
                        <>
                          <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{slide.venue}</span>
                          <span className="flex items-center gap-1"><CalendarDays className="h-4 w-4" />{formatDate(slide.date)}</span>
                        </>
                      )}
                    </div>
                    <Link to={slide.type === "opening" ? `/restaurant/${slide.id}` : "/events"}>
                      <Button size="sm" variant="secondary" className="w-fit mt-1">
                        {slide.type === "opening" ? "View Restaurant" : "See Events"}
                      </Button>
                    </Link>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4 md:left-6 bg-background/80 backdrop-blur-sm border-border" />
          <CarouselNext className="right-4 md:right-6 bg-background/80 backdrop-blur-sm border-border" />
        </Carousel>
      </div>
    </section>
  );
};

export default HighlightCarousel;
