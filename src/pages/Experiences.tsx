import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Search, MapPin } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ExperienceCard from "@/components/ExperienceCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { experiences, regionCategories, cuisineTypes, groupSizeOptions } from "@/data/experiencesData";

const PAGE_SIZE = 9;

const Experiences = () => {
  const [region, setRegion] = useState("All");
  const [cuisine, setCuisine] = useState("Any Cuisine");
  const [groupSize, setGroupSize] = useState("Any Size");
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filtered = useMemo(() => {
    return experiences.filter((e) => {
      if (region !== "All" && e.region !== region) return false;
      if (cuisine !== "Any Cuisine" && e.cuisineType !== cuisine) return false;
      if (groupSize !== "Any Size") {
        const maxGroup = parseInt(e.groupSize.split("–").pop()?.replace(/\D/g, "") || "0");
        if (groupSize === "2–4 guests" && maxGroup > 4) return false;
        if (groupSize === "4–8 guests" && (maxGroup < 4 || maxGroup > 8)) return false;
        if (groupSize === "8–15 guests" && (maxGroup < 8 || maxGroup > 15)) return false;
        if (groupSize === "15+ guests" && maxGroup < 15) return false;
      }
      if (search) {
        const q = search.toLowerCase();
        if (
          !e.name.toLowerCase().includes(q) &&
          !e.location.toLowerCase().includes(q) &&
          !e.hostFamily.toLowerCase().includes(q) &&
          !e.description.toLowerCase().includes(q)
        )
          return false;
      }
      return true;
    });
  }, [region, cuisine, groupSize, search]);

  const visible = filtered.slice(0, visibleCount);

  const activeFilterCount = [
    region !== "All",
    cuisine !== "Any Cuisine",
    groupSize !== "Any Size",
  ].filter(Boolean).length;

  const clearFilters = () => {
    setRegion("All");
    setCuisine("Any Cuisine");
    setGroupSize("Any Size");
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
              <BreadcrumbPage>Experiences</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <h1 className="font-display text-3xl sm:text-4xl font-medium text-foreground">
              Authentic Georgian Culinary Experiences
            </h1>
            <p className="text-muted-foreground mt-1">
              {filtered.length} {filtered.length === 1 ? "experience" : "experiences"} available
            </p>
          </div>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search experiences..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setVisibleCount(PAGE_SIZE);
              }}
              className="pl-10 bg-card border-border rounded-xl"
            />
          </div>
        </div>

        {/* Region pills */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide mb-4">
          {regionCategories.map((cat) => (
            <Button
              key={cat}
              variant={region === cat ? "default" : "outline"}
              size="sm"
              className="rounded-xl text-xs whitespace-nowrap"
              onClick={() => {
                setRegion(cat);
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
            value={cuisine}
            onValueChange={(v) => {
              setCuisine(v);
              setVisibleCount(PAGE_SIZE);
            }}
          >
            <SelectTrigger className="w-40 bg-card border-border rounded-xl text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {cuisineTypes.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={groupSize}
            onValueChange={(v) => {
              setGroupSize(v);
              setVisibleCount(PAGE_SIZE);
            }}
          >
            <SelectTrigger className="w-40 bg-card border-border rounded-xl text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {groupSizeOptions.map((g) => (
                <SelectItem key={g} value={g}>
                  {g}
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
              {visible.map((exp) => (
                <ExperienceCard key={exp.id} experience={exp} />
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
              No experiences found
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

export default Experiences;
