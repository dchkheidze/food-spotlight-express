const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-14">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <a href="/" className="font-display text-2xl font-bold">
              Rest<span className="text-primary">Go</span>
            </a>
            <p className="text-background/60 text-sm mt-3 leading-relaxed">
              Your go-to guide for discovering the best restaurants, cafés, and bars.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-body font-semibold text-sm mb-4 text-background/90">Explore</h4>
            <ul className="space-y-2 text-sm text-background/60">
              <li><a href="#" className="hover:text-primary transition-colors">Restaurants</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Cuisines</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Collections</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-body font-semibold text-sm mb-4 text-background/90">Company</h4>
            <ul className="space-y-2 text-sm text-background/60">
              <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Press</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-body font-semibold text-sm mb-4 text-background/90">Legal</h4>
            <ul className="space-y-2 text-sm text-background/60">
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/10 pt-6 text-center text-sm text-background/40">
          © {new Date().getFullYear()} RestGo. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
