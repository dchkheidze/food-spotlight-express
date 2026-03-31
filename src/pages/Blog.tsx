import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { blogArticles, blogCategories } from "@/data/blogData";

const PAGE_SIZE = 6;

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const featured = blogArticles.find((a) => a.isFeatured);
  const filtered = useMemo(() => {
    const list = blogArticles.filter((a) => !a.isFeatured);
    if (activeCategory === "All") return list;
    return list.filter((a) => a.category === activeCategory);
  }, [activeCategory]);
  const visible = filtered.slice(0, visibleCount);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-24 pb-16">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbPage>Blog</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-2">Stories & Guides</h1>
        <p className="text-muted-foreground mb-8">Restaurant openings, food guides, and the stories behind Tbilisi's best tables.</p>

        {/* Featured Article */}
        {featured && (
          <Link to={`/blog/${featured.slug}`} className="group block mb-12">
            <div className="relative rounded-2xl overflow-hidden bg-card border border-border shadow-sm hover:shadow-xl transition-shadow">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="relative h-64 md:h-auto overflow-hidden">
                  <img src={featured.image} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground border-0">Featured</Badge>
                </div>
                <div className="p-6 sm:p-8 flex flex-col justify-center">
                  <Badge variant="secondary" className="w-fit mb-3 text-xs">{featured.category}</Badge>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground group-hover:text-primary transition-colors mb-3">{featured.title}</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4 line-clamp-3">{featured.excerpt}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{featured.date}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{featured.readTime}</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-hide">
          {blogCategories.map((cat) => (
            <Button key={cat} variant={activeCategory === cat ? "default" : "outline"} size="sm" className="rounded-xl text-xs whitespace-nowrap"
              onClick={() => { setActiveCategory(cat); setVisibleCount(PAGE_SIZE); }}>
              {cat}
            </Button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((article) => (
            <Link key={article.id} to={`/blog/${article.slug}`} className="group">
              <div className="bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-lg transition-all">
                <div className="relative h-48 overflow-hidden">
                  <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  <Badge variant="secondary" className="absolute top-3 left-3 bg-card/90 backdrop-blur-sm border-0 text-xs">{article.category}</Badge>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-2 line-clamp-2">{article.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{article.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{article.date}</span>
                    <span>{article.readTime}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {visible.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No articles in this category yet.</p>
          </div>
        )}

        {visibleCount < filtered.length && (
          <div className="flex justify-center mt-10">
            <Button variant="outline" size="lg" className="rounded-xl px-10" onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}>Load More</Button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Blog;
