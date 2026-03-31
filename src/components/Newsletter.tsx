import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Newsletter = () => {
  return (
    <section className="py-16 lg:py-20 bg-primary">
      <div className="container mx-auto px-4 text-center">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-3">
          Stay in the Loop
        </h2>
        <p className="text-primary-foreground/80 max-w-lg mx-auto mb-8">
          Get weekly picks of the best restaurants, new openings, and exclusive culinary stories delivered to your inbox.
        </p>
        <div className="max-w-md mx-auto flex gap-2">
          <Input
            placeholder="Enter your email"
            type="email"
            className="bg-primary-foreground/20 border-primary-foreground/30 text-primary-foreground placeholder:text-primary-foreground/60 focus-visible:ring-primary-foreground rounded-xl"
          />
          <Button variant="secondary" className="rounded-xl font-semibold px-6 shrink-0">
            Subscribe
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
