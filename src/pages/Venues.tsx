import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Search, MapPin } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VenueCard from "@/components/VenueCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { venues, eventTypeCategories } from "@/data/venuesData";

const PAGE_SIZE = 9;

const capacityOptions = ["Any Capacity", "Up to 50", "50–150", "150–300", "300+"];
const priceOptions = ["Any Price", "₾₾", "₾₾₾", "₾₾₾₾"];

const Venues = () => {
  const [eventType, setEventType] = useState("All");
  const [capacity, setCapacity] = useState("Any Capacity");
  const [price, setPrice] = useState("Any Price");
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filtered = useMemo(() => {
    return venues.filter((v) => {
      if (eventType !== "All" && !v.eventTypes.includes(eventType)) return false;
      if (price !== "Any Price" && v.priceRange !== price) return false;
      if (capacity !== "Any Capacity") {
        const maxCap = parseInt(v.capacity.split("–").pop()?.replace(/\D/g, "") || "0");
        if (capacity === "Up to 50" && maxCap > 50) return false;
        if (capacity === "50–150" && (maxCap < 50 || maxCap > 150)) return false;
        if (capacity === "150–300" && (maxCap < 150 || maxCap > 300)) return false;
        if (capacity === "300+" && maxCap < 300) return false;
      }
      if (search) {
        const q = search.toLowerCase();
        if (
          !v.name.toLowerCase().includes(q) &&
          !v.location.toLowerCase().includes(q) &&
          !v.description.toLowerCase().includes(q)
        )
          return false;
      }
      return true;
    });
  }, [eventType, capacity, price, search]);

  const visible = filtered.slice(0, visibleCount);

  const activeFilterCount = [
    eventType !== "All",
    capacity !== "Any Capacity",
    price !== "Any Price",
  ].filter(Boolean).length;

  const clearFilters = () => {
    setEventType("All");
    setCapacity("Any Capacity");
    setPrice("Any Price");
    setSearch("");
    setVisibleCount(PAGE_SIZE);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-24 pb-16">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Venues</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <h1 className="font-display text-3xl sm:text-4xl font-medium text-foreground">
              Venues
            </h1>
            <p className="text-muted-foreground mt-1">
              {filtered.length} {filtered.length === 1 ? "venue" : "venues"} available
            </p>
          </div>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search venues..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setVisibleCount(PAGE_SIZE);
              }}
              className="pl-10 bg-card border-border rounded-xl"
            />
          </div>
        </div>

        {/* Event type pills */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide mb-4">
          {eventTypeCategories.map((cat) => (
            <Button
              key={cat}
              variant={eventType === cat ? "default" : "outline"}
              size="sm"
              className="rounded-xl text-xs whitespace-nowrap"
              onClick={() => {
                setEventType(cat);
                setVisibleCount(PAGE_SIZE);
              }}
            >
              {cat}
            </Button>
          ))}
        </div>

        {/* Selects row */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <Select
            value={capacity}
            onValueChange={(v) => {
              setCapacity(v);
              setVisibleCount(PAGE_SIZE);
            }}
          >
            <SelectTrigger className="w-40 bg-card border-border rounded-xl text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {capacityOptions.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={price}
            onValueChange={(v) => {
              setPrice(v);
              setVisibleCount(PAGE_SIZE);
            }}
          >
            <SelectTrigger className="w-32 bg-card border-border rounded-xl text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {priceOptions.map((p) => (
                <SelectItem key={p} value={p}>
                  {p}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {activeFilterCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-primary"
              onClick={clearFilters}
            >
              Clear all ({activeFilterCount})
            </Button>
          )}
        </div>

        {/* Grid */}
        {visible.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {visible.map((venue) => (
                <VenueCard key={venue.id} venue={venue} />
              ))}
            </div>

            {visibleCount < filtered.length && (
              <div className="flex justify-center mt-10">
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-xl px-10"
                  onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                >
                  Load More
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="bg-secondary rounded-full p-6 mb-6">
              <MapPin className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="font-display text-xl font-medium text-foreground mb-2">
              No venues found
            </h3>
            <p className="text-muted-foreground max-w-md mb-6">
              Try adjusting your filters or search terms.
            </p>
            <Button variant="outline" onClick={clearFilters}>
              Clear all filters
            </Button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Venues;
