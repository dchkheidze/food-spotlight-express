import { articles } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

const BlogArticles = () => {
  return (
    <section id="blog" className="py-16 lg:py-20 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-primary text-sm font-semibold tracking-[0.15em] uppercase mb-2">From the kitchen</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">Latest Articles</h2>
          </div>
          <a href="#" className="hidden sm:flex items-center gap-1 text-sm font-medium text-primary hover:underline">
            Read more <ArrowRight className="h-4 w-4" />
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((article) => (
            <a key={article.id} href="#" className="group bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-border">
              <div className="h-48 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="secondary" className="text-xs">{article.category}</Badge>
                  <span className="text-xs text-muted-foreground">{article.date}</span>
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-2 leading-tight">
                  {article.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{article.excerpt}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogArticles;
