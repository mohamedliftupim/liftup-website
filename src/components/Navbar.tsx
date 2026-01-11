import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import liftupLogoRed from "@/assets/liftup-logo-red.png";
import liftupLogoWhite from "@/assets/liftup-logo-white.png";
import LanguageToggle from "@/components/LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { t, isRTL } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [{
    name: t("nav.home"),
    path: "/"
  }, {
    name: t("nav.services"),
    path: "/services"
  }, {
    name: t("nav.portfolio"),
    path: "/portfolio"
  }, {
    name: t("nav.contact"),
    path: "/contact"
  }];

  const isHomePage = location.pathname === "/";
  const showWhiteLogo = isHomePage && !isScrolled;

  return (
    <motion.nav 
      initial={{ y: -100 }} 
      animate={{ y: 0 }} 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-background/95 backdrop-blur-md shadow-lg border-b border-border" : "bg-transparent"}`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className={`flex items-center justify-between ${isRTL ? "flex-row-reverse" : ""}`}>
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <motion.img 
              src={showWhiteLogo ? liftupLogoWhite : liftupLogoRed} 
              alt="LiftUp" 
              className="h-20 w-auto" 
              whileHover={{ scale: 1.1 }} 
              transition={{ duration: 0.3 }} 
            />
          </Link>

          {/* Desktop Navigation */}
          <div className={`hidden md:flex items-center gap-8 ${isRTL ? "flex-row-reverse" : ""}`}>
            {navLinks.map(link => (
              <motion.div key={link.path} whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                <Link 
                  to={link.path} 
                  className={`text-base font-bold transition-colors hover:text-primary relative ${
                    location.pathname === link.path 
                      ? "text-primary" 
                      : isHomePage && !isScrolled 
                        ? "text-white" 
                        : "text-foreground/80"
                  }`}
                >
                  {link.name}
                  {location.pathname === link.path && (
                    <motion.div 
                      layoutId="navbar-indicator" 
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary" 
                      initial={false} 
                      transition={{ type: "spring", stiffness: 300, damping: 30 }} 
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* CTA Button & Language Toggle */}
          <div className={`hidden md:flex items-center gap-4 ${isRTL ? "flex-row-reverse" : ""}`}>
            <LanguageToggle />
            <motion.div whileHover={{ scale: 1.05, rotate: 2 }} whileTap={{ scale: 0.95 }}>
              <Button asChild className="bg-primary hover:bg-primary/90 transition-smooth">
                <Link to="/contact">{t("nav.getStarted")}</Link>
              </Button>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <div className={`md:hidden flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
            <LanguageToggle />
            <button 
              className={showWhiteLogo ? "text-white" : "text-foreground"} 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }} 
            animate={{ opacity: 1, height: "auto" }} 
            exit={{ opacity: 0, height: 0 }} 
            className="md:hidden bg-background/98 backdrop-blur-lg border-b border-border"
          >
            <div className={`container mx-auto px-6 py-6 space-y-4 ${isRTL ? "text-right" : ""}`}>
              {navLinks.map(link => (
                <Link 
                  key={link.path} 
                  to={link.path} 
                  onClick={() => setIsMobileMenuOpen(false)} 
                  className={`block text-lg font-medium transition-colors hover:text-primary ${
                    location.pathname === link.path ? "text-primary" : "text-foreground/80"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Button asChild className="w-full bg-primary hover:bg-primary/90">
                <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                  {t("nav.getStarted")}
                </Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
