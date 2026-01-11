import { Link } from "react-router-dom";
import { Instagram, Linkedin, Facebook, Mail, Phone, MapPin } from "lucide-react";
import liftupLogoWhite from "@/assets/liftup-logo-white.png";
import { useLanguage } from "@/contexts/LanguageContext";

const TikTokIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t, isRTL } = useLanguage();

  return (
    <footer className="bg-secondary text-secondary-foreground border-t border-border">
      <div className="container mx-auto px-6 py-16">
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 ${isRTL ? "text-right" : ""}`}>
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/">
              <img src={liftupLogoWhite} alt="LiftUp" className="h-12 w-auto" />
            </Link>
            <p className="text-sm text-muted-foreground">
              {t("footer.tagline")}
            </p>
            <div className={`flex gap-4 ${isRTL ? "justify-end" : ""}`}>
              <a
                href="https://www.instagram.com/liftupim?igsh=MXA3YjM1M2x0dWN6dw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-accent transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://eg.linkedin.com/company/liftup-innovative-marketing-agency"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-accent transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://www.tiktok.com/@liftupim?_r=1&_t=ZS-92D7fwP6n1c"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-accent transition-colors"
              >
                <TikTokIcon size={20} />
              </a>
              <a
                href="https://www.facebook.com/liftupim/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-accent transition-colors"
              >
                <Facebook size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4">{t("footer.quickLinks")}</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {t("nav.home")}
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {t("nav.services")}
                </Link>
              </li>
              <li>
                <Link
                  to="/portfolio"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {t("nav.portfolio")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-4">{t("footer.services")}</h3>
            <ul className="space-y-2">
              <li className="text-sm text-muted-foreground">
                {t("services.brandStrategy.title")}
              </li>
              <li className="text-sm text-muted-foreground">
                {t("services.digitalMarketing.title")}
              </li>
              <li className="text-sm text-muted-foreground">
                {t("services.content.title")}
              </li>
              <li className="text-sm text-muted-foreground">
                {t("services.socialMedia.title")}
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4">{t("footer.connect")}</h3>
            <ul className="space-y-3">
              <li className={`flex items-start gap-2 text-sm text-muted-foreground ${isRTL ? "flex-row-reverse" : ""}`}>
                <Mail size={16} className="mt-0.5 text-primary" />
                <span>admin@liftupim.com</span>
              </li>
              <li className={`flex items-start gap-2 text-sm text-muted-foreground ${isRTL ? "flex-row-reverse" : ""}`}>
                <Phone size={16} className="mt-0.5 text-primary" />
                <span>+20 100 039 3502</span>
              </li>
              <li className={`flex items-start gap-2 text-sm text-muted-foreground ${isRTL ? "flex-row-reverse" : ""}`}>
                <MapPin size={16} className="mt-0.5 text-primary" />
                <span>Ryhana Plaza Building, B Tower, Zahraa Maadi, Cairo</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/50 text-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} LiftUp Agency. {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
