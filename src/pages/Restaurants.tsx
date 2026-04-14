import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Search, ArrowUpDown, MapPin } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingChatButton from "@/components/chat/FloatingChatButton";
import RestaurantCard from "@/components/RestaurantCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DesktopFilterSidebar,
  MobileFilterTrigger,
  ActiveFilterChips,
  defaultFilters,
  type Filters,
} from "@/components/listing/FilterSidebar";
import { listingRestaurants, sortOptions } from "@/data/listingData";

const PAGE_SIZE = 8;

const Restaurants = () => {
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("popular");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filtered = useMemo(() => {
    let results = listingRestaurants.filter((r) => {
      if (r.city !== filters.city) return false;
      if (filters.districts.length && !filters.districts.includes(r.district)) return false;
      if (filters.cuisines.length && !filters.cuisines.includes(r.cuisine)) return false;
      if (filters.priceRanges.length && !filters.priceRanges.includes(r.priceRange)) return false;
      if (filters.minRating && r.rating < filters.minRating) return false;
      if (filters.types.length && !filters.types.includes(r.type)) return false;
      if (filters.features.length && !filters.features.every((f) => r.features.includes(f))) return false;
      if (search) {
        const q = search.toLowerCase();
        if (!r.name.toLowerCase().includes(q) && !r.cuisine.toLowerCase().includes(q) && !r.location.toLowerCase().includes(q)) return false;
      }
      return true;
    });

    switch (sort) {
      case "rating": results.sort((a, b) => b.rating - a.rating); break;
      case "newest": results.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break;
      case "alphabetical": results.sort((a, b) => a.name.localeCompare(b.name)); break;
      default: results.sort((a, b) => b.reviewCount - a.reviewCount); break;
    }

    return results;
  }, [filters, search, sort]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-8">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Restaurants</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Title & Search */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
              Restaurants in {filters.city}
            </h1>
            <p className="text-muted-foreground mt-1">
              {filtered.length} {filtered.length === 1 ? "place" : "places"} found
            </p>
          </div>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search restaurants..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setVisibleCount(PAGE_SIZE); }}
              className="pl-10 bg-card border-border rounded-xl"
            />
          </div>
        </div>

        {/* Sort & mobile filter row */}
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <MobileFilterTrigger filters={filters} onFiltersChange={setFilters} />
          <div className="flex items-center gap-2 ml-auto">
            <ArrowUpDown className="h-4 w-4 text-muted-foreground hidden sm:block" />
            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger className="w-44 bg-card border-border rounded-xl text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((o) => (
                  <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Active filter chips */}
        <ActiveFilterChips filters={filters} onFiltersChange={setFilters} />

        {/* Main layout */}
        <div className="flex gap-8 mt-6">
          <DesktopFilterSidebar filters={filters} onFiltersChange={setFilters} />

          <div className="flex-1 min-w-0">
            {visible.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {visible.map((r) => (
                    <Link key={r.id} to={`/restaurants/${r.slug}`} className="block">
                      <RestaurantCard restaurant={r} />
                    </Link>
                  ))}
                </div>

                {hasMore && (
                  <div className="flex justify-center mt-10">
                    <Button variant="outline" size="lg" className="rounded-xl px-10"
                      onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}>
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
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">No restaurants found</h3>
                <p className="text-muted-foreground max-w-md mb-6">
                  Try adjusting your filters or search query to discover more places.
                </p>
                <Button variant="outline" onClick={() => { setFilters(defaultFilters); setSearch(""); }}>
                  Clear all filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
      <FloatingChatButton />
    </div>
  );
};

export default Restaurants;
