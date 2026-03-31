import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { collections } from "@/data/collectionsData";

const Rankings = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-24 pb-16">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbPage>Rankings</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-2">Curated Rankings</h1>
        <p className="text-muted-foreground mb-10">Hand-picked collections of the best places to eat, drink, and explore in the city.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map((col, idx) => (
            <Link key={col.id} to={`/rankings/${col.slug}`} className="group">
              <div className={`relative rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-xl transition-all ${idx === 0 ? "sm:col-span-2 sm:row-span-2" : ""}`}>
                <div className={`relative overflow-hidden ${idx === 0 ? "h-64 sm:h-80" : "h-52"}`}>
                  <img src={col.image} alt={col.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className={`font-display font-bold text-background mb-1 ${idx === 0 ? "text-2xl sm:text-3xl" : "text-xl"}`}>{col.title}</h3>
                    <p className="text-background/80 text-sm line-clamp-2">{col.description}</p>
                    <div className="flex items-center gap-1 text-primary-foreground mt-2 text-sm font-medium group-hover:gap-2 transition-all">
                      View Collection <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Rankings;
