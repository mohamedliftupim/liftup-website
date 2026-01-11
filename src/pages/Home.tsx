import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, TrendingUp, Lightbulb, Megaphone, Sparkles } from "lucide-react";
import CountUp from "@/components/CountUp";
import LogoMarquee from "@/components/LogoMarquee";
import { useLanguage } from "@/contexts/LanguageContext";
import heroVideo from "@/assets/hero-showreel.mp4";
import { projects } from "@/data/projects";

// Client logos
import britannia from "@/assets/clients/britannia.png";
import carrefour from "@/assets/clients/carrefour.png";
import cib from "@/assets/clients/cib.png";
import clorox from "@/assets/clients/clorox.png";
import emaar from "@/assets/clients/emaar.png";
import ferrero from "@/assets/clients/ferrero.png";
import freshFoodMarket from "@/assets/clients/fresh-food-market.png";
import ikea from "@/assets/clients/ikea.png";
import intel from "@/assets/clients/intel.png";
import iqos from "@/assets/clients/iqos.png";
import kraftHeinz from "@/assets/clients/kraft-heinz.png";
import mastercard from "@/assets/clients/mastercard.png";
import medmark from "@/assets/clients/medmark.png";
import mlay from "@/assets/clients/mlay.png";
import mondelez from "@/assets/clients/mondelez.png";
import philips from "@/assets/clients/philips.png";
import sedar from "@/assets/clients/sedar.png";
import sodic from "@/assets/clients/sodic.png";
import tabali from "@/assets/clients/tabali.png";
import tmg from "@/assets/clients/tmg.png";
import vasko from "@/assets/clients/vasko.png";
import veet from "@/assets/clients/veet.png";
import vodafone from "@/assets/clients/vodafone.png";
const clientLogosRow1 = [britannia, carrefour, cib, clorox, emaar, kraftHeinz, mastercard, medmark, mlay, mondelez, vasko, veet];
const clientLogosRow2 = [ferrero, freshFoodMarket, ikea, intel, iqos, philips, sedar, sodic, tabali, tmg, vodafone];
const Home = () => {
  const {
    t,
    isRTL,
    language
  } = useLanguage();
  const services = [{
    icon: <Lightbulb className="w-8 h-8" />,
    titleKey: "services.brandStrategy.title",
    descKey: "services.brandStrategy.desc"
  }, {
    icon: <TrendingUp className="w-8 h-8" />,
    titleKey: "services.digitalPerformance.title",
    descKey: "services.digitalPerformance.desc"
  }, {
    icon: <Megaphone className="w-8 h-8" />,
    titleKey: "services.digitalMarketing.title",
    descKey: "services.digitalMarketing.desc"
  }, {
    icon: <Sparkles className="w-8 h-8" />,
    titleKey: "services.content.title",
    descKey: "services.content.desc"
  }];
  const stats = [{
    value: 1.5,
    suffix: "M",
    subtext: "SAR",
    labelKey: "stats.budget",
    decimals: 1
  }, {
    value: 8,
    suffix: "x",
    subtext: "",
    labelKey: "stats.roas",
    decimals: 0
  }, {
    value: 12,
    suffix: "M",
    subtext: "SAR",
    labelKey: "stats.revenue",
    decimals: 0
  }];

  // Get first 3 projects from actual portfolio
  const portfolioPreview = projects.slice(0, 3);
  return <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 via-brand-black/50 to-brand-black/60" />

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8
        }} className="max-w-4xl mx-auto space-y-8">
            <motion.div initial={{
            scale: 0.9,
            rotate: -5
          }} animate={{
            scale: 1,
            rotate: 0
          }} transition={{
            duration: 0.8,
            delay: 0.2,
            type: "spring",
            stiffness: 100
          }} whileHover={{
            scale: 1.05,
            rotate: 2
          }} className="inline-block px-6 py-3 bg-accent/10 border-2 border-accent/30 rounded-full text-accent text-sm font-bold glow-cyan cursor-default">
              {t("hero.badge")}
            </motion.div>

            <motion.h1 initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.3
          }} className="text-5xl md:text-7xl leading-tight text-white lg:text-6xl font-bold">
              {t("hero.title1")}{" "}
              <motion.span className="text-primary font-display font-normal block mt-2" animate={{
              scale: [1, 1.02, 1]
            }} transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}>
                {t("hero.title2")}
              </motion.span>
            </motion.h1>

            <motion.p initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} transition={{
            delay: 0.5
          }} className="text-xl text-white/80 max-w-2xl mx-auto font-medium md:text-xl">
              {t("hero.subtitle")}{" "}
              <span className="text-brand-cyan font-bold">{t("hero.wow")}</span>
              {t("hero.subtitleEnd")}
            </motion.p>

            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8,
            delay: 0.6
          }} className={`flex flex-col sm:flex-row gap-4 justify-center ${isRTL ? "sm:flex-row-reverse" : ""}`}>
              <motion.div whileHover={{
              scale: 1.05,
              rotate: 1
            }} whileTap={{
              scale: 0.95
            }}>
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-lg px-8 py-6 glow-cyan transition-smooth group relative overflow-hidden">
                  <Link to="/contact">
                    <span className="relative z-10">{t("hero.cta")}</span>
                    <ArrowRight className={`${isRTL ? "mr-2 rotate-180" : "ml-2"} group-hover:translate-x-2 transition-transform relative z-10`} />
                  </Link>
                </Button>
              </motion.div>
              <motion.div whileHover={{
              scale: 1.05,
              rotate: -1
            }} whileTap={{
              scale: 0.95
            }}>
                <Button asChild size="lg" variant="outline" className="text-lg px-8 py-6 border-2 border-white/50 bg-white/10 text-white hover:bg-accent hover:border-accent hover:text-white backdrop-blur-sm transition-all">
                  <Link to="/portfolio">{t("nav.portfolio")}</Link>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

      </section>

      {/* Clients Section */}
      <section className="py-20 bg-muted/30 relative overflow-hidden">
        <motion.div className="absolute inset-0 opacity-5" animate={{
        backgroundPosition: ["0% 0%", "100% 100%"]
      }} transition={{
        duration: 20,
        repeat: Infinity,
        ease: "linear"
      }} style={{
        backgroundImage: "radial-gradient(circle, hsl(var(--primary)) 1px, transparent 1px)",
        backgroundSize: "50px 50px"
      }} />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} className="text-center mb-12">
            <p className="text-muted-foreground font-bold mb-6 text-lg">
              {t("clients.trusted")}
            </p>
          </motion.div>
          <LogoMarquee logosRow1={clientLogosRow1} logosRow2={clientLogosRow2} />
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl mb-4">
              {t("services.title")}{" "}
              <span className="text-primary font-display font-semibold text-6xl">{t("services.titleHighlight")}</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t("services.subtitle")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => <motion.div key={service.titleKey} initial={{
            opacity: 0,
            y: 30,
            rotate: -5
          }} whileInView={{
            opacity: 1,
            y: 0,
            rotate: 0
          }} viewport={{
            once: true
          }} transition={{
            delay: index * 0.1,
            type: "spring",
            stiffness: 100
          }} whileHover={{
            y: -12,
            rotate: index % 2 === 0 ? 2 : -2,
            transition: {
              duration: 0.3
            }
          }}>
                <Card className={`p-6 h-full playful-card group bg-card border-2 hover:border-accent/50 relative overflow-hidden ${isRTL ? "text-right" : ""}`}>
                  <motion.div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <motion.div className={`text-accent mb-4 relative z-10 ${isRTL ? "flex justify-end" : ""}`} whileHover={{
                scale: 1.2,
                rotate: 360,
                transition: {
                  duration: 0.6
                }
              }}>
                    {service.icon}
                  </motion.div>
                  <h3 className="text-xl mb-3 relative z-10">
                    {t(service.titleKey)}
                  </h3>
                  <p className="text-muted-foreground relative z-10">
                    {t(service.descKey)}
                  </p>
                </Card>
              </motion.div>)}
          </div>

          <motion.div initial={{
          opacity: 0
        }} whileInView={{
          opacity: 1
        }} viewport={{
          once: true
        }} className="text-center mt-12">
            <Button asChild variant="outline" size="lg" className="group">
              <Link to="/services">
                {t("services.viewAll")}
                <ArrowRight className={`${isRTL ? "mr-2 rotate-180" : "ml-2"} group-hover:translate-x-1 transition-transform`} />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Performance & Insights */}
      <section className="py-24 bg-secondary text-secondary-foreground">
        <div className="container mx-auto px-6">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl mb-4">
              {t("stats.title")}{" "}
              <span className="text-primary font-display font-normal">{t("stats.titleHighlight")}</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t("stats.subtitle")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => <motion.div key={stat.labelKey} initial={{
            opacity: 0,
            scale: 0.5,
            rotate: -10
          }} whileInView={{
            opacity: 1,
            scale: 1,
            rotate: 0
          }} viewport={{
            once: true
          }} transition={{
            delay: index * 0.1,
            type: "spring",
            stiffness: 200,
            damping: 15
          }} whileHover={{
            scale: 1.1,
            rotate: [0, -5, 5, 0],
            transition: {
              duration: 0.5
            }
          }} className="text-center cursor-default">
                <motion.div className="text-5xl md:text-6xl font-display font-normal text-accent mb-2" animate={{
              scale: [1, 1.05, 1]
            }} transition={{
              duration: 2,
              repeat: Infinity,
              delay: index * 0.2
            }}>
                  <CountUp end={stat.value} suffix={stat.suffix} decimals={stat.decimals} duration={2.5} />
                  {stat.subtext && <span className="text-2xl md:text-3xl ml-1">{stat.subtext}</span>}
                </motion.div>
                <div className="text-muted-foreground font-medium">
                  {t(stat.labelKey)}
                </div>
              </motion.div>)}
          </div>
        </div>
      </section>

      {/* Portfolio Preview */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl mb-4">
              {t("portfolio.title")}{" "}
              <span className="text-primary font-display font-normal">{t("portfolio.titleHighlight")}</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t("portfolio.subtitle")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {portfolioPreview.map((project, index) => <motion.div key={project.id} initial={{
            opacity: 0,
            y: 50,
            rotate: -5
          }} whileInView={{
            opacity: 1,
            y: 0,
            rotate: 0
          }} viewport={{
            once: true
          }} transition={{
            delay: index * 0.15,
            type: "spring",
            stiffness: 100
          }}>
                <Link to={`/portfolio/${project.id}`}>
                  <motion.div whileHover={{
                y: -15,
                rotate: index % 2 === 0 ? 3 : -3,
                transition: {
                  duration: 0.4
                }
              }}>
                    <Card className="overflow-hidden group cursor-pointer border-2 hover:border-primary/50 transition-all duration-300 tilt-hover">
                      <div className="relative overflow-hidden aspect-[4/3]">
                        <motion.img src={project.image} alt={language === "ar" ? project.titleAr : project.title} className="w-full h-full object-cover" whileHover={{
                      scale: 1.15,
                      rotate: 2
                    }} transition={{
                      duration: 0.6
                    }} />
                        <motion.div className="absolute inset-0 bg-brand-black/70 flex items-end p-6" initial={{
                      opacity: 0,
                      y: 20
                    }} whileHover={{
                      opacity: 1,
                      y: 0
                    }} transition={{
                      duration: 0.3
                    }}>
                          <div className={`text-white ${isRTL ? "text-right w-full" : ""}`}>
                            <p className="text-sm text-primary font-medium mb-1">
                              {language === "ar" ? project.clientAr : project.client}
                            </p>
                            <h3 className="text-xl">{language === "ar" ? project.titleAr : project.title}</h3>
                          </div>
                        </motion.div>
                      </div>
                    </Card>
                  </motion.div>
                </Link>
              </motion.div>)}
          </div>

          <motion.div initial={{
          opacity: 0
        }} whileInView={{
          opacity: 1
        }} viewport={{
          once: true
        }} className="text-center mt-12">
            <Button asChild variant="outline" size="lg" className="group">
              <Link to="/portfolio">
                {t("portfolio.viewAll")}
                <ArrowRight className={`${isRTL ? "mr-2 rotate-180" : "ml-2"} group-hover:translate-x-1 transition-transform`} />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-6">
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl mb-6 text-secondary-foreground">
              {t("cta.title")} <span className="text-primary font-display font-normal">{t("cta.titleHighlight")}</span>
            </h2>
            <p className="text-xl mb-8 text-muted-foreground">
              {t("cta.subtitle")}
            </p>
            <motion.div whileHover={{
            scale: 1.05
          }} whileTap={{
            scale: 0.95
          }}>
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-lg px-8 py-6 glow-cyan group">
                <Link to="/contact">
                  {t("cta.button")}
                  <ArrowRight className={`${isRTL ? "mr-2 rotate-180" : "ml-2"} group-hover:translate-x-1 transition-transform`} />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>;
};
export default Home;