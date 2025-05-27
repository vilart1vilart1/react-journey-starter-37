
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import Container from "@/components/ui/Container";
import CustomButton from "@/components/ui/CustomButton";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigationLinks = [
    { name: "Home", href: "/" },
    { name: "Features", href: "/#features" },
    { name: "About", href: "/#about" },
    { name: "Contact", href: "/#contact" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4",
        isScrolled
          ? "bg-background/80 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      )}
    >
      <Container>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link
              to="/"
              className="text-lg font-semibold tracking-tight text-foreground"
            >
              <span className="sr-only">Your Brand</span>
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold">B</span>
                </div>
                <span>Brand</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-sm text-foreground/80 hover:text-foreground transition-colors duration-200 animated-underline"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <CustomButton variant="outline" size="sm">
              Sign In
            </CustomButton>
            <CustomButton size="sm">Get Started</CustomButton>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:bg-primary/5 focus:outline-none transition-colors duration-200"
            >
              <span className="sr-only">
                {mobileMenuOpen ? "Close menu" : "Open menu"}
              </span>
              {mobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={cn(
            "md:hidden fixed inset-0 z-50 bg-background/98 backdrop-blur-sm transition-transform duration-300 ease-in-out transform",
            mobileMenuOpen
              ? "translate-x-0 opacity-100"
              : "translate-x-full opacity-0"
          )}
          style={{ top: "4rem" }}
        >
          <div className="pt-5 pb-6 px-5 h-full flex flex-col">
            <div className="space-y-1 mb-8">
              {navigationLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-4 text-base font-medium text-foreground border-b border-border/40"
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <div className="mt-auto space-y-4 pb-8">
              <CustomButton variant="outline" className="w-full">
                Sign In
              </CustomButton>
              <CustomButton className="w-full">Get Started</CustomButton>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
