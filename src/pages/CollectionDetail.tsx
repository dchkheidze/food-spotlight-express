import { useParams, Link, useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RestaurantCard from "@/components/RestaurantCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { getCollectionBySlug, getCollectionRestaurants } from "@/data/collectionsData";

const CollectionDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const collection = getCollectionBySlug(slug || "");

  if (!collection) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex flex-col items-center justify-center pt-40 pb-20 text-center px-4">
          <h1 className="font-display text-3xl font-bold mb-3">Collection not found</h1>
          <p className="text-muted-foreground mb-6">This collection doesn't exist or has been removed.</p>
          <Button onClick={() => navigate("/rankings")}>Browse Rankings</Button>
        </div>
        <Footer />
      </div>
    );
  }

  const restaurants = getCollectionRestaurants(collection);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <div className="relative w-full h-[40vh] sm:h-[50vh] overflow-hidden">
        <img src={collection.image} alt={collection.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
        <div className="absolute top-20 left-4 sm:left-8">
          <Button variant="ghost" size="sm" className="text-background/80 hover:text-background hover:bg-background/10" onClick={() => navigate(-1)}>
            <ChevronLeft className="h-4 w-4 mr-1" /> Back
          </Button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-8 pb-8 max-w-5xl mx-auto w-full">
          <h1 className="font-display text-3xl sm:text-5xl font-bold text-background mb-3">{collection.title}</h1>
          <p className="text-background/80 text-sm sm:text-base max-w-2xl">{collection.description}</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-8 py-10">
        <Breadcrumb className="mb-8">
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbLink asChild><Link to="/rankings">Rankings</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbPage>{collection.title}</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="space-y-6">
          {restaurants.map((r, idx) => (
            <div key={r.id} className="flex gap-4 items-start">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-display font-bold text-lg shrink-0 mt-2">
                {idx + 1}
              </div>
              <div className="flex-1">
                <Link to={`/restaurants/${r.slug}`} className="block">
                  <RestaurantCard restaurant={r} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {restaurants.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No restaurants in this collection yet.</p>
          </div>
        )}

        {/* CTA */}
        <div className="bg-card rounded-2xl border border-border p-8 text-center mt-12">
          <h3 className="font-display text-xl font-semibold mb-2">Discover More</h3>
          <p className="text-muted-foreground mb-5">Explore our other curated collections and rankings.</p>
          <Button asChild className="rounded-xl"><Link to="/rankings">View All Rankings</Link></Button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CollectionDetail;
