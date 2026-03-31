import { useParams, Link, useNavigate } from "react-router-dom";
import { Calendar, Clock, ChevronLeft, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { getArticleBySlug, getRelatedArticles } from "@/data/blogData";

const BlogArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const article = getArticleBySlug(slug || "");

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex flex-col items-center justify-center pt-40 pb-20 text-center px-4">
          <h1 className="font-display text-3xl font-bold mb-3">Article not found</h1>
          <p className="text-muted-foreground mb-6">This article doesn't exist or has been removed.</p>
          <Button onClick={() => navigate("/blog")}>Browse Articles</Button>
        </div>
        <Footer />
      </div>
    );
  }

  const related = getRelatedArticles(article);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <div className="relative w-full h-[45vh] sm:h-[55vh] overflow-hidden">
        <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
        <div className="absolute top-20 left-4 sm:left-8">
          <Button variant="ghost" size="sm" className="text-background/80 hover:text-background hover:bg-background/10" onClick={() => navigate(-1)}>
            <ChevronLeft className="h-4 w-4 mr-1" /> Back
          </Button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-8 pb-8 max-w-4xl mx-auto w-full">
          <Badge className="bg-background/20 backdrop-blur-md text-background border-0 mb-3">{article.category}</Badge>
          <h1 className="font-display text-3xl sm:text-5xl font-bold text-background mb-4 leading-tight">{article.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-background/80 text-sm">
            <span>By {article.author}</span>
            <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{article.date}</span>
            <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{article.readTime}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <Breadcrumb className="mb-8">
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbLink asChild><Link to="/blog">Blog</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbPage>{article.title}</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <article className="prose-restgo">
          {article.content.map((block, i) => {
            if (block.type === "heading") return <h2 key={i} className="font-display text-2xl font-semibold text-foreground mt-10 mb-4">{block.value}</h2>;
            if (block.type === "image") return (
              <div key={i} className="my-8 rounded-xl overflow-hidden">
                <img src={block.value} alt="" className="w-full h-auto object-cover" loading="lazy" />
              </div>
            );
            return <p key={i} className="text-foreground/85 leading-relaxed mb-4 text-[16px]">{block.value}</p>;
          })}
        </article>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-10">
          {article.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
          ))}
        </div>

        <Separator className="my-10" />

        {/* Related Articles */}
        {related.length > 0 && (
          <div>
            <h2 className="font-display text-2xl font-semibold mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {related.map((r) => (
                <Link key={r.id} to={`/blog/${r.slug}`} className="group">
                  <div className="bg-card rounded-xl overflow-hidden border border-border hover:shadow-lg transition-all">
                    <div className="h-36 overflow-hidden">
                      <img src={r.image} alt={r.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                    </div>
                    <div className="p-4">
                      <h4 className="font-display text-sm font-semibold group-hover:text-primary transition-colors line-clamp-2">{r.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{r.date}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default BlogArticle;
