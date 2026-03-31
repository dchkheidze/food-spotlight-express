import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Calendar as CalendarIcon, Clock, MapPin, Search, Filter } from "lucide-react";
import { format, parseISO, isAfter, isBefore, startOfDay } from "date-fns";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";
import { foodEvents, eventCategories, eventVenues } from "@/data/eventsData";

const PAGE_SIZE = 8;

const Events = () => {
  const [category, setCategory] = useState("All");
  const [venue, setVenue] = useState("All Venues");
  const [priceFilter, setPriceFilter] = useState<"all" | "free" | "paid">("all");
  const [dateFrom, setDateFrom] = useState<Date | undefined>();
  const [dateTo, setDateTo] = useState<Date | undefined>();
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filtered = useMemo(() => {
    return foodEvents.filter((e) => {
      if (category !== "All" && e.category !== category) return false;
      if (venue !== "All Venues" && e.venue !== venue) return false;
      if (priceFilter === "free" && !e.isFree) return false;
      if (priceFilter === "paid" && e.isFree) return false;
      const eventDate = parseISO(e.date);
      if (dateFrom && isBefore(eventDate, startOfDay(dateFrom))) return false;
      if (dateTo && isAfter(eventDate, startOfDay(dateTo))) return false;
      if (search) {
        const q = search.toLowerCase();
        if (!e.title.toLowerCase().includes(q) && !e.venue.toLowerCase().includes(q) && !e.description.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [category, venue, priceFilter, dateFrom, dateTo, search]);

  const visible = filtered.slice(0, visibleCount);
  const activeFilterCount = [category !== "All", venue !== "All Venues", priceFilter !== "all", !!dateFrom, !!dateTo].filter(Boolean).length;

  const clearFilters = () => {
    setCategory("All");
    setVenue("All Venues");
    setPriceFilter("all");
    setDateFrom(undefined);
    setDateTo(undefined);
    setSearch("");
    setVisibleCount(PAGE_SIZE);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-24 pb-16">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbPage>Events</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground">Events</h1>
            <p className="text-muted-foreground mt-1">{filtered.length} upcoming {filtered.length === 1 ? "event" : "events"}</p>
          </div>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search events..." value={search} onChange={(e) => { setSearch(e.target.value); setVisibleCount(PAGE_SIZE); }}
              className="pl-10 bg-card border-border rounded-xl" />
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          {/* Category */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {eventCategories.map((cat) => (
              <Button key={cat} variant={category === cat ? "default" : "outline"} size="sm" className="rounded-xl text-xs whitespace-nowrap"
                onClick={() => { setCategory(cat); setVisibleCount(PAGE_SIZE); }}>
                {cat}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 mb-8">
          {/* Venue */}
          <Select value={venue} onValueChange={(v) => { setVenue(v); setVisibleCount(PAGE_SIZE); }}>
            <SelectTrigger className="w-44 bg-card border-border rounded-xl text-sm"><SelectValue /></SelectTrigger>
            <SelectContent>
              {eventVenues.map((v) => <SelectItem key={v} value={v}>{v}</SelectItem>)}
            </SelectContent>
          </Select>

          {/* Price */}
          <Select value={priceFilter} onValueChange={(v) => { setPriceFilter(v as "all" | "free" | "paid"); setVisibleCount(PAGE_SIZE); }}>
            <SelectTrigger className="w-32 bg-card border-border rounded-xl text-sm"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Prices</SelectItem>
              <SelectItem value="free">Free</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
            </SelectContent>
          </Select>

          {/* Date From */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className={cn("rounded-xl text-xs gap-2", !dateFrom && "text-muted-foreground")}>
                <CalendarIcon className="h-3.5 w-3.5" />
                {dateFrom ? format(dateFrom, "MMM d") : "From"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="single" selected={dateFrom} onSelect={setDateFrom} className={cn("p-3 pointer-events-auto")} />
            </PopoverContent>
          </Popover>

          {/* Date To */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className={cn("rounded-xl text-xs gap-2", !dateTo && "text-muted-foreground")}>
                <CalendarIcon className="h-3.5 w-3.5" />
                {dateTo ? format(dateTo, "MMM d") : "To"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="single" selected={dateTo} onSelect={setDateTo} className={cn("p-3 pointer-events-auto")} />
            </PopoverContent>
          </Popover>

          {activeFilterCount > 0 && (
            <Button variant="ghost" size="sm" className="text-xs text-primary" onClick={clearFilters}>
              Clear all ({activeFilterCount})
            </Button>
          )}
        </div>

        {/* Events Grid */}
        {visible.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {visible.map((event) => {
                const eventDate = parseISO(event.date);
                return (
                  <div key={event.id} className="group bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-lg transition-all">
                    <div className="relative h-44 overflow-hidden">
                      <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                      <div className="absolute top-3 left-3 flex gap-2">
                        <Badge variant="secondary" className="bg-card/90 backdrop-blur-sm border-0 text-xs">{event.category}</Badge>
                        {event.isFree && <Badge className="bg-primary text-primary-foreground border-0 text-xs">Free</Badge>}
                      </div>
                      {/* Date badge */}
                      <div className="absolute top-3 right-3 bg-card/90 backdrop-blur-sm rounded-xl px-3 py-1.5 text-center">
                        <p className="text-xs font-bold text-primary leading-none">{format(eventDate, "MMM")}</p>
                        <p className="text-lg font-bold text-foreground leading-none mt-0.5">{format(eventDate, "d")}</p>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors leading-tight mb-2 line-clamp-2">{event.title}</h3>
                      <div className="space-y-1.5 mb-3">
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Clock className="h-3.5 w-3.5 shrink-0" />
                          <span>{format(eventDate, "EEEE, MMM d")} · {event.time}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <MapPin className="h-3.5 w-3.5 shrink-0" />
                          {event.venueSlug ? (
                            <Link to={`/restaurants/${event.venueSlug}`} className="hover:text-primary transition-colors">{event.venue}</Link>
                          ) : (
                            <span>{event.venue}</span>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">{event.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {visibleCount < filtered.length && (
              <div className="flex justify-center mt-10">
                <Button variant="outline" size="lg" className="rounded-xl px-10" onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}>Load More</Button>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="bg-secondary rounded-full p-6 mb-6">
              <CalendarIcon className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="font-display text-xl font-semibold text-foreground mb-2">No events found</h3>
            <p className="text-muted-foreground max-w-md mb-6">Try adjusting your filters or check back soon for new events.</p>
            <Button variant="outline" onClick={clearFilters}>Clear all filters</Button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Events;
