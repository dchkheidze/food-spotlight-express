import { useState } from "react";
import { X, SlidersHorizontal, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {
  cities,
  districts,
  cuisineTypes,
  priceRanges,
  establishmentTypes,
  featureOptions,
} from "@/data/listingData";

export interface Filters {
  city: string;
  districts: string[];
  cuisines: string[];
  priceRanges: string[];
  minRating: number | null;
  types: string[];
  features: string[];
}

export const defaultFilters: Filters = {
  city: "Tbilisi",
  districts: [],
  cuisines: [],
  priceRanges: [],
  minRating: null,
  types: [],
  features: [],
};

interface FilterSidebarProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
}

const ratingOptions = [4.5, 4.0, 3.5, 3.0];

function FilterSection({ title, children, defaultOpen = true }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-border pb-4 mb-4 last:border-0">
      <button onClick={() => setOpen(!open)} className="flex items-center justify-between w-full text-sm font-semibold text-foreground mb-2">
        {title}
        {open ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
      </button>
      {open && <div className="space-y-2">{children}</div>}
    </div>
  );
}

function CheckboxItem({ label, checked, onCheckedChange }: { label: string; checked: boolean; onCheckedChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center gap-2 cursor-pointer text-sm text-foreground hover:text-primary transition-colors">
      <Checkbox checked={checked} onCheckedChange={onCheckedChange} />
      {label}
    </label>
  );
}

function FilterContent({ filters, onFiltersChange }: FilterSidebarProps) {
  const toggle = (key: keyof Filters, value: string) => {
    const arr = filters[key] as string[];
    const next = arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];
    onFiltersChange({ ...filters, [key]: next });
  };

  const activeCount =
    filters.districts.length + filters.cuisines.length + filters.priceRanges.length +
    filters.types.length + filters.features.length + (filters.minRating ? 1 : 0);

  return (
    <div className="space-y-0">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-lg font-semibold text-foreground">Filters</h3>
        {activeCount > 0 && (
          <Button variant="ghost" size="sm" onClick={() => onFiltersChange(defaultFilters)} className="text-xs text-primary">
            Clear all ({activeCount})
          </Button>
        )}
      </div>

      <FilterSection title="City">
        <div className="flex flex-wrap gap-2">
          {cities.map((c) => (
            <Button key={c} variant={filters.city === c ? "default" : "outline"} size="sm" className="text-xs h-8"
              onClick={() => onFiltersChange({ ...filters, city: c, districts: [] })}>
              {c}
            </Button>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="District">
        {(districts[filters.city] || []).map((d) => (
          <CheckboxItem key={d} label={d} checked={filters.districts.includes(d)} onCheckedChange={() => toggle("districts", d)} />
        ))}
      </FilterSection>

      <FilterSection title="Cuisine">
        {cuisineTypes.map((c) => (
          <CheckboxItem key={c} label={c} checked={filters.cuisines.includes(c)} onCheckedChange={() => toggle("cuisines", c)} />
        ))}
      </FilterSection>

      <FilterSection title="Price Range">
        <div className="flex flex-wrap gap-2">
          {priceRanges.map((p) => (
            <Button key={p} variant={filters.priceRanges.includes(p) ? "default" : "outline"} size="sm" className="text-xs h-8"
              onClick={() => toggle("priceRanges", p)}>
              {p}
            </Button>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Rating">
        <div className="flex flex-wrap gap-2">
          {ratingOptions.map((r) => (
            <Button key={r} variant={filters.minRating === r ? "default" : "outline"} size="sm" className="text-xs h-8"
              onClick={() => onFiltersChange({ ...filters, minRating: filters.minRating === r ? null : r })}>
              {r}+
            </Button>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Type">
        {establishmentTypes.map((t) => (
          <CheckboxItem key={t} label={t} checked={filters.types.includes(t)} onCheckedChange={() => toggle("types", t)} />
        ))}
      </FilterSection>

      <FilterSection title="Features" defaultOpen={false}>
        {featureOptions.map((f) => (
          <CheckboxItem key={f} label={f} checked={filters.features.includes(f)} onCheckedChange={() => toggle("features", f)} />
        ))}
      </FilterSection>
    </div>
  );
}

export function ActiveFilterChips({ filters, onFiltersChange }: FilterSidebarProps) {
  const chips: { label: string; onRemove: () => void }[] = [];

  filters.districts.forEach((d) => chips.push({ label: d, onRemove: () => onFiltersChange({ ...filters, districts: filters.districts.filter((v) => v !== d) }) }));
  filters.cuisines.forEach((c) => chips.push({ label: c, onRemove: () => onFiltersChange({ ...filters, cuisines: filters.cuisines.filter((v) => v !== c) }) }));
  filters.priceRanges.forEach((p) => chips.push({ label: p, onRemove: () => onFiltersChange({ ...filters, priceRanges: filters.priceRanges.filter((v) => v !== p) }) }));
  if (filters.minRating) chips.push({ label: `${filters.minRating}+ stars`, onRemove: () => onFiltersChange({ ...filters, minRating: null }) });
  filters.types.forEach((t) => chips.push({ label: t, onRemove: () => onFiltersChange({ ...filters, types: filters.types.filter((v) => v !== t) }) }));
  filters.features.forEach((f) => chips.push({ label: f, onRemove: () => onFiltersChange({ ...filters, features: filters.features.filter((v) => v !== f) }) }));

  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {chips.map((chip) => (
        <Badge key={chip.label} variant="secondary" className="gap-1 pr-1 text-xs font-medium">
          {chip.label}
          <button onClick={chip.onRemove} className="ml-1 rounded-full hover:bg-foreground/10 p-0.5">
            <X className="h-3 w-3" />
          </button>
        </Badge>
      ))}
    </div>
  );
}

export function DesktopFilterSidebar(props: FilterSidebarProps) {
  return (
    <aside className="hidden lg:block w-72 shrink-0">
      <div className="sticky top-24 bg-card rounded-2xl border border-border p-5 max-h-[calc(100vh-7rem)] overflow-y-auto">
        <FilterContent {...props} />
      </div>
    </aside>
  );
}

export function MobileFilterTrigger(props: FilterSidebarProps) {
  const activeCount =
    props.filters.districts.length + props.filters.cuisines.length + props.filters.priceRanges.length +
    props.filters.types.length + props.filters.features.length + (props.filters.minRating ? 1 : 0);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="lg:hidden gap-2">
          <SlidersHorizontal className="h-4 w-4" />
          Filters
          {activeCount > 0 && (
            <Badge className="bg-primary text-primary-foreground h-5 w-5 p-0 flex items-center justify-center text-[10px]">
              {activeCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80 overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="sr-only">Filters</SheetTitle>
        </SheetHeader>
        <FilterContent {...props} />
      </SheetContent>
    </Sheet>
  );
}
