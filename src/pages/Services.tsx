import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Lightbulb, TrendingUp, Megaphone, Clapperboard, Sparkles, Code, Share2, Calendar, ArrowRight, Check } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
const Services = () => {
  const {
    t,
    isRTL
  } = useLanguage();
  const services = [{
    icon: <Lightbulb className="w-12 h-12" />,
    title: t("services.brandStrategy.title"),
    description: t("services.brandStrategy.desc"),
    features: [t("services.brandStrategy.f1"), t("services.brandStrategy.f2"), t("services.brandStrategy.f3"), t("services.brandStrategy.f4"), t("services.brandStrategy.f5")]
  }, {
    icon: <TrendingUp className="w-12 h-12" />,
    title: t("services.digitalPerformance.title"),
    description: t("services.digitalPerformance.desc"),
    features: [t("services.digitalPerformance.f1"), t("services.digitalPerformance.f2"), t("services.digitalPerformance.f3"), t("services.digitalPerformance.f4"), t("services.digitalPerformance.f5")]
  }, {
    icon: <Megaphone className="w-12 h-12" />,
    title: t("services.digitalMarketing.title"),
    description: t("services.digitalMarketing.desc"),
    features: [t("services.digitalMarketing.f1"), t("services.digitalMarketing.f2"), t("services.digitalMarketing.f3"), t("services.digitalMarketing.f4"), t("services.digitalMarketing.f5")]
  }, {
    icon: <Clapperboard className="w-12 h-12" />,
    title: t("services.advertising.title"),
    description: t("services.advertising.desc"),
    features: [t("services.advertising.f1"), t("services.advertising.f2"), t("services.advertising.f3"), t("services.advertising.f4"), t("services.advertising.f5")]
  }, {
    icon: <Sparkles className="w-12 h-12" />,
    title: t("services.content.title"),
    description: t("services.content.desc"),
    features: [t("services.content.f1"), t("services.content.f2"), t("services.content.f3"), t("services.content.f4"), t("services.content.f5")]
  }, {
    icon: <Code className="w-12 h-12" />,
    title: t("services.web.title"),
    description: t("services.web.desc"),
    features: [t("services.web.f1"), t("services.web.f2"), t("services.web.f3"), t("services.web.f4"), t("services.web.f5")]
  }, {
    icon: <Share2 className="w-12 h-12" />,
    title: t("services.socialMedia.title"),
    description: t("services.socialMedia.desc"),
    features: [t("services.socialMedia.f1"), t("services.socialMedia.f2"), t("services.socialMedia.f3"), t("services.socialMedia.f4"), t("services.socialMedia.f5")]
  }, {
    icon: <Calendar className="w-12 h-12" />,
    title: t("services.events.title"),
    description: t("services.events.desc"),
    features: [t("services.events.f1"), t("services.events.f2"), t("services.events.f3"), t("services.events.f4"), t("services.events.f5")]
  }];
  const process = [{
    step: "01",
    title: t("services.process.discovery"),
    description: t("services.process.discoveryDesc")
  }, {
    step: "02",
    title: t("services.process.strategy"),
    description: t("services.process.strategyDesc")
  }, {
    step: "03",
    title: t("services.process.execution"),
    description: t("services.process.executionDesc")
  }, {
    step: "04",
    title: t("services.process.optimization"),
    description: t("services.process.optimizationDesc")
  }];
  return <div className={`min-h-screen pt-20 ${isRTL ? "text-right" : ""}`}>
      {/* Hero Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8
        }} className="text-center max-w-4xl mx-auto">
            <motion.div initial={{
            scale: 0.9
          }} animate={{
            scale: 1
          }} transition={{
            duration: 0.8,
            delay: 0.2
          }} className="inline-block px-4 py-2 bg-accent/10 border border-accent/20 rounded-full text-accent text-sm font-medium mb-6">
              {t("services.page.badge")}
            </motion.div>
            
            <h1 className="text-5xl mb-6 md:text-5xl">
              {t("services.page.title")} <span className="text-primary font-display font-semibold text-7xl">{t("services.page.titleHighlight")}</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              {t("services.page.subtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => <motion.div key={index} initial={{
            opacity: 0,
            y: 30
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            delay: index * 0.1
          }}>
                <Card className="p-8 h-full hover:shadow-2xl hover:border-accent/50 transition-all duration-300 group bg-card">
                  <div className="text-accent mb-6 group-hover:scale-110 transition-transform">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl mb-4">{service.title}</h3>
                  <p className="text-muted-foreground mb-6">{service.description}</p>
                  
                  <ul className="space-y-3">
                    {service.features.map((feature, featureIndex) => <li key={featureIndex} className={`flex items-start gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
                        <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>)}
                  </ul>
                </Card>
              </motion.div>)}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-muted/30">
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
              {t("services.process.title")} <span className="text-primary font-display font-normal">{t("services.process.titleHighlight")}</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t("services.process.subtitle")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {process.map((item, index) => <motion.div key={item.step} initial={{
            opacity: 0,
            x: isRTL ? 20 : -20
          }} whileInView={{
            opacity: 1,
            x: 0
          }} viewport={{
            once: true
          }} transition={{
            delay: index * 0.1
          }} className="text-center">
                <div className="text-6xl font-display font-normal text-accent mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </motion.div>)}
          </div>
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
            <h2 className="text-4xl md:text-5xl mb-6 text-ring font-bold">
              {t("services.cta.title")}
            </h2>
            <p className="text-xl mb-8 text-secondary-foreground">
              {t("services.cta.subtitle")}
            </p>
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-lg px-8 py-6 glow-cyan group">
              <Link to="/contact">
                {t("services.cta.button")}
                <ArrowRight className={`${isRTL ? "mr-2 rotate-180" : "ml-2"} group-hover:translate-x-1 transition-transform`} />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>;
};
export default Services;