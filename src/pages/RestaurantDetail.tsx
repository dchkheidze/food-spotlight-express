import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Star, Heart, Phone, Navigation, UtensilsCrossed, MapPin, Globe, Clock,
  ChevronLeft, Wifi, Car, Music, Truck, TreePine, Dog, Lock, Sun, X,
  ChevronLeft as ChevLeft, ChevronRight as ChevRight,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getRestaurantBySlug, getSimilarRestaurants, type DetailRestaurant } from "@/data/detailData";

const featureIcons: Record<string, React.ReactNode> = {
  "Outdoor Seating": <Sun className="h-4 w-4" />,
  "Free Wi-Fi": <Wifi className="h-4 w-4" />,
  "Delivery": <Truck className="h-4 w-4" />,
  "Live Music": <Music className="h-4 w-4" />,
  "Pet Friendly": <Dog className="h-4 w-4" />,
  "Private Dining": <Lock className="h-4 w-4" />,
  "Vegan Options": <TreePine className="h-4 w-4" />,
  "Rooftop": <Sun className="h-4 w-4" />,
  "Parking": <Car className="h-4 w-4" />,
};

/* ── Lightbox ── */
function Lightbox({ images, index, onClose, onNav }: { images: string[]; index: number; onClose: () => void; onNav: (i: number) => void }) {
  return (
    <div className="fixed inset-0 z-50 bg-foreground/90 flex items-center justify-center" onClick={onClose}>
      <button className="absolute top-4 right-4 text-background/80 hover:text-background" onClick={onClose}><X className="h-8 w-8" /></button>
      <button className="absolute left-4 top-1/2 -translate-y-1/2 text-background/80 hover:text-background" onClick={(e) => { e.stopPropagation(); onNav((index - 1 + images.length) % images.length); }}><ChevLeft className="h-8 w-8" /></button>
      <img src={images[index]} alt="" className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg" onClick={(e) => e.stopPropagation()} />
      <button className="absolute right-4 top-1/2 -translate-y-1/2 text-background/80 hover:text-background" onClick={(e) => { e.stopPropagation(); onNav((index + 1) % images.length); }}><ChevRight className="h-8 w-8" /></button>
      <span className="absolute bottom-6 text-background/70 text-sm">{index + 1} / {images.length}</span>
    </div>
  );
}

/* ── Similar Card ── */
function SimilarCard({ r }: { r: DetailRestaurant }) {
  return (
    <Link to={`/restaurants/${r.slug}`} className="group min-w-[280px] sm:min-w-[300px] bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-lg transition-all">
      <div className="relative h-44 overflow-hidden">
        <img src={r.image} alt={r.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-card/90 backdrop-blur-sm rounded-full px-2.5 py-1">
          <Star className="h-3.5 w-3.5 fill-gold text-gold" />
          <span className="text-xs font-semibold">{r.rating}</span>
        </div>
      </div>
      <div className="p-4">
        <h4 className="font-display text-lg font-semibold group-hover:text-primary transition-colors">{r.name}</h4>
        <p className="text-xs text-primary font-medium">{r.cuisine}</p>
        <div className="flex items-center gap-1 text-muted-foreground mt-1"><MapPin className="h-3.5 w-3.5" /><span className="text-xs">{r.district}, {r.city}</span></div>
      </div>
    </Link>
  );
}

/* ── Main Page ── */
const RestaurantDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const restaurant = getRestaurantBySlug(slug || "");
  const [saved, setSaved] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex flex-col items-center justify-center pt-40 pb-20 text-center px-4">
          <h1 className="font-display text-3xl font-bold mb-3">Restaurant not found</h1>
          <p className="text-muted-foreground mb-6">The restaurant you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate("/restaurants")}>Browse Restaurants</Button>
        </div>
        <Footer />
      </div>
    );
  }

  const similar = getSimilarRestaurants(restaurant);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {lightboxIndex !== null && (
        <Lightbox images={restaurant.gallery} index={lightboxIndex} onClose={() => setLightboxIndex(null)} onNav={setLightboxIndex} />
      )}

      {/* ── Hero Cover ── */}
      <div className="relative w-full h-[50vh] sm:h-[60vh] overflow-hidden">
        <img src={restaurant.image} alt={restaurant.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />

        <div className="absolute top-20 left-4 sm:left-8">
          <Button variant="ghost" size="sm" className="text-background/80 hover:text-background hover:bg-background/10" onClick={() => navigate(-1)}>
            <ChevronLeft className="h-4 w-4 mr-1" /> Back
          </Button>
        </div>

        <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-8 pb-8 max-w-5xl mx-auto w-full">
          <div className="flex flex-wrap gap-2 mb-3">
            {restaurant.cuisineTags.map((tag) => (
              <Badge key={tag} className="bg-background/20 backdrop-blur-md text-background border-0 text-xs">{tag}</Badge>
            ))}
            <Badge className="bg-background/20 backdrop-blur-md text-background border-0 text-xs">{restaurant.priceRange}</Badge>
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-bold text-background mb-3">{restaurant.name}</h1>
          <div className="flex flex-wrap items-center gap-4 text-background/90 text-sm">
            <div className="flex items-center gap-1.5">
              <Star className="h-5 w-5 fill-gold text-gold" />
              <span className="font-semibold text-background">{restaurant.rating}</span>
              <span className="text-background/70">({restaurant.ratingCount} reviews)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4" />
              <span>{restaurant.district}, {restaurant.city}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Quick Actions ── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-8 -mt-5 relative z-10">
        <div className="bg-card rounded-2xl border border-border shadow-lg p-4 flex flex-wrap gap-3">
          <Button variant={saved ? "default" : "outline"} size="sm" className="rounded-xl gap-2" onClick={() => setSaved(!saved)}>
            <Heart className={`h-4 w-4 ${saved ? "fill-current" : ""}`} /> {saved ? "Saved" : "Save"}
          </Button>
          <Button variant="outline" size="sm" className="rounded-xl gap-2"><Phone className="h-4 w-4" /> Call</Button>
          <Button variant="outline" size="sm" className="rounded-xl gap-2"><Navigation className="h-4 w-4" /> Directions</Button>
          <Button variant="outline" size="sm" className="rounded-xl gap-2"><UtensilsCrossed className="h-4 w-4" /> View Menu</Button>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-8 py-10 space-y-12">

        {/* Breadcrumb */}
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbLink asChild><Link to="/restaurants">Restaurants</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbPage>{restaurant.name}</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* ── Info Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Description */}
          <div className="md:col-span-2 space-y-6">
            <div>
              <h2 className="font-display text-2xl font-semibold mb-3">About</h2>
              <p className="text-muted-foreground leading-relaxed">{restaurant.description}</p>
              {restaurant.editorialNote && (
                <div className="mt-4 border-l-4 border-primary pl-4 py-2 bg-primary/5 rounded-r-lg">
                  <p className="text-sm italic text-foreground/80">
                    <span className="font-semibold text-primary not-italic">Editor's Pick — </span>
                    {restaurant.editorialNote}
                  </p>
                </div>
              )}
            </div>

            {/* Menu Highlights */}
            <div>
              <h2 className="font-display text-2xl font-semibold mb-4">Menu Highlights</h2>
              <div className="space-y-3">
                {restaurant.menuHighlights.map((dish) => (
                  <div key={dish.name} className="flex items-start justify-between gap-4 bg-card rounded-xl p-4 border border-border">
                    <div>
                      <h4 className="font-semibold text-foreground">{dish.name}</h4>
                      <p className="text-sm text-muted-foreground">{dish.description}</p>
                    </div>
                    <span className="text-primary font-semibold whitespace-nowrap">{dish.price}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            <div>
              <h2 className="font-display text-2xl font-semibold mb-4">Features & Amenities</h2>
              <div className="flex flex-wrap gap-3">
                {restaurant.features.map((f) => (
                  <div key={f} className="flex items-center gap-2 bg-secondary rounded-xl px-4 py-2.5 text-sm text-foreground">
                    {featureIcons[f] || <Star className="h-4 w-4" />}
                    {f}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            <div className="bg-card rounded-2xl border border-border p-5 space-y-4">
              <h3 className="font-display text-lg font-semibold">Info</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <span className="text-muted-foreground">{restaurant.address}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-primary shrink-0" />
                  <span className="text-muted-foreground">{restaurant.phone}</span>
                </div>
                {restaurant.website && (
                  <div className="flex items-center gap-3">
                    <Globe className="h-4 w-4 text-primary shrink-0" />
                    <a href={restaurant.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline truncate">{restaurant.website.replace(/https?:\/\//, "")}</a>
                  </div>
                )}
              </div>
              <Separator />
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span className="text-sm font-semibold">Opening Hours</span>
                </div>
                <div className="space-y-1">
                  {restaurant.hours.map((h) => (
                    <div key={h.day} className="flex justify-between text-xs text-muted-foreground">
                      <span>{h.day}</span>
                      <span>{h.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-card rounded-2xl border border-border overflow-hidden">
              <div className="h-48 bg-secondary flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <MapPin className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <p className="text-sm font-medium">Map Coming Soon</p>
                  <p className="text-xs">{restaurant.district}, {restaurant.city}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Photo Gallery ── */}
        <div>
          <h2 className="font-display text-2xl font-semibold mb-4">Photos</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {restaurant.gallery.map((img, i) => (
              <button key={i} onClick={() => setLightboxIndex(i)}
                className="relative aspect-[4/3] rounded-xl overflow-hidden group cursor-pointer">
                <img src={img} alt={`${restaurant.name} photo ${i + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors" />
              </button>
            ))}
          </div>
        </div>

        {/* ── Reviews Placeholder ── */}
        <div>
          <h2 className="font-display text-2xl font-semibold mb-4">Reviews</h2>
          <div className="bg-card rounded-2xl border border-border p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-primary/10 rounded-2xl p-4 text-center">
                <span className="font-display text-3xl font-bold text-primary">{restaurant.rating}</span>
                <div className="flex justify-center mt-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className={`h-3.5 w-3.5 ${s <= Math.round(restaurant.rating) ? "fill-gold text-gold" : "text-border"}`} />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-1">{restaurant.ratingCount} reviews</p>
              </div>
              <div className="flex-1">
                {[5, 4, 3, 2, 1].map((level) => {
                  const pct = level === 5 ? 60 : level === 4 ? 25 : level === 3 ? 10 : level === 2 ? 3 : 2;
                  return (
                    <div key={level} className="flex items-center gap-2 text-xs">
                      <span className="w-3 text-muted-foreground">{level}</span>
                      <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                        <div className="h-full bg-gold rounded-full" style={{ width: `${pct}%` }} />
                      </div>
                      <span className="w-8 text-muted-foreground text-right">{pct}%</span>
                    </div>
                  );
                })}
              </div>
            </div>
            <Separator className="mb-6" />
            <div className="text-center py-6">
              <p className="text-muted-foreground mb-2">User reviews coming soon</p>
              <p className="text-xs text-muted-foreground">Google rating integration planned</p>
            </div>
          </div>
        </div>

        {/* ── Similar Restaurants ── */}
        {similar.length > 0 && (
          <div>
            <h2 className="font-display text-2xl font-semibold mb-4">Similar Restaurants</h2>
            <div className="flex gap-5 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
              {similar.map((r) => <SimilarCard key={r.slug} r={r} />)}
            </div>
          </div>
        )}

        {/* ── CTA ── */}
        <div className="bg-card rounded-2xl border border-border p-8 text-center">
          <h3 className="font-display text-xl font-semibold mb-2">Explore More</h3>
          <p className="text-muted-foreground mb-5">Discover similar places or explore the {restaurant.district} area.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild className="rounded-xl"><Link to="/restaurants">Explore Similar Places</Link></Button>
            <Button variant="outline" asChild className="rounded-xl"><Link to="/restaurants">See More in {restaurant.district}</Link></Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default RestaurantDetail;
