import { useState } from "react";
import { Link } from "react-router-dom";
import { NavLink } from "@/components/NavLink";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
  { name: "About", path: "/about" },
  { name: "Service Areas", path: "/service-areas" },
  { name: "Contact", path: "/contact" },
];

export const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Mobile: Hamburger + Call Button */}
          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="p-2 hover:bg-accent rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-foreground" />
              ) : (
                <Menu className="h-6 w-6 text-foreground" />
              )}
            </button>
            <Button variant="call" size="icon" asChild className="h-10 w-10">
              <a href="tel:+254700000000" aria-label="Call us">
                <Phone className="h-5 w-5" />
              </a>
            </Button>
          </div>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">K</span>
            </div>
            <span className="font-bold text-lg text-foreground hidden sm:inline">
              Killpezts
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100"
                activeClassName="text-foreground after:scale-x-100"
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="call" size="sm" asChild>
              <a href="tel:+254700000000">
                <Phone className="h-4 w-4" />
                Call Now
              </a>
            </Button>
            <Button variant="default" size="sm" asChild>
              <a href="#quote-form">Get Free Quote</a>
            </Button>
          </div>

          {/* Mobile: Logo placeholder for centering */}
          <div className="md:hidden w-10"></div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-foreground/50 z-40 md:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* Mobile Menu Panel */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-full w-[280px] bg-background z-50 transform transition-transform duration-300 ease-out md:hidden shadow-2xl",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <Link to="/" onClick={closeMobileMenu} className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">K</span>
              </div>
              <span className="font-bold text-lg text-foreground">Killpezts</span>
            </Link>
            <button
              onClick={closeMobileMenu}
              className="p-2 hover:bg-accent rounded-lg transition-colors"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={closeMobileMenu}
                className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors py-2 border-b border-border"
                activeClassName="text-primary font-semibold"
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          <div className="mt-8 space-y-3">
            <Button variant="call" className="w-full" asChild>
              <a href="tel:+254700000000">
                <Phone className="h-4 w-4" />
                Call Now
              </a>
            </Button>
            <Button variant="default" className="w-full" asChild>
              <a href="#quote-form">Get Free Quote</a>
            </Button>
          </div>

          <div className="mt-8 pt-6 border-t border-border text-sm text-muted-foreground">
            <p className="font-semibold mb-2">Contact Us:</p>
            <p>Phone: +254 700 000 000</p>
            <p>Email: info@killpezts.co.ke</p>
          </div>
        </div>
      </aside>
    </>
  );
};
