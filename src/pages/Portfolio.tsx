import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { projects } from "@/data/projects";
import CompanyProfileBook from "@/components/CompanyProfileBook";
const Portfolio = () => {
  const {
    language,
    isRTL,
    t
  } = useLanguage();
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
              {t("portfolio.page.badge")}
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl mb-6">
              {t("portfolio.page.title")} <span className="text-primary font-display font-semibold">{t("portfolio.page.titleHighlight")}</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              {t("portfolio.page.subtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Company Profile Book */}
      <CompanyProfileBook />

      {/* Projects Grid */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => {
            const title = language === "ar" ? project.titleAr : project.title;
            const client = language === "ar" ? project.clientAr : project.client;
            const category = language === "ar" ? project.categoryAr : project.category;
            const description = language === "ar" ? project.descriptionAr : project.description;
            const tags = language === "ar" ? project.tagsAr : project.tags;
            const results = language === "ar" ? project.resultsAr : project.results;
            return <motion.div key={project.id} initial={{
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
                  <Link to={`/portfolio/${project.id}`}>
                    <Card className="overflow-hidden group cursor-pointer hover:shadow-2xl transition-all duration-500 h-full">
                      {/* Image */}
                      <div className="relative overflow-hidden aspect-[16/10]">
                        <img src={project.image} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                        
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="bg-white text-brand-red p-4 rounded-full">
                            <ArrowRight size={24} className={isRTL ? "rotate-180" : ""} />
                          </div>
                        </div>

                        {/* Category Badge */}
                        <div className={`absolute top-4 ${isRTL ? "right-4" : "left-4"}`}>
                          <Badge className="bg-accent text-accent-foreground">
                            {category}
                          </Badge>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 space-y-4">
                        <div>
                          <div className="text-sm text-muted-foreground mb-1">{client}</div>
                          <h3 className="text-2xl font-bold mb-2">{title}</h3>
                          <p className="text-muted-foreground">{description}</p>
                        </div>

                        {/* Tags */}
                        <div className={`flex flex-wrap gap-2 ${isRTL ? "justify-end" : ""}`}>
                          {tags.map(tag => <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>)}
                        </div>

                        {/* Results */}
                        <div className="pt-4 border-t border-border">
                          <div className="text-sm font-semibold mb-2 text-accent">
                            {t("portfolio.keyResults")}
                          </div>
                          <ul className="space-y-1">
                            {results.map(result => <li key={result} className={`text-sm text-muted-foreground flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
                                <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                                {result}
                              </li>)}
                          </ul>
                        </div>
                      </div>
                    </Card>
                  </Link>
                </motion.div>;
          })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[{
            value: "250+",
            label: t("portfolio.stats.projects")
          }, {
            value: "95%",
            label: t("portfolio.stats.satisfaction")
          }, {
            value: "15+",
            label: t("portfolio.stats.awards")
          }, {
            value: "3.2M+",
            label: t("portfolio.stats.impressions")
          }].map((stat, index) => <motion.div key={stat.label} initial={{
            opacity: 0,
            scale: 0.8
          }} whileInView={{
            opacity: 1,
            scale: 1
          }} viewport={{
            once: true
          }} transition={{
            delay: index * 0.1
          }} className="text-center">
                <div className="text-5xl md:text-6xl font-display font-normal text-accent mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground font-medium">{stat.label}</div>
              </motion.div>)}
          </div>
        </div>
      </section>
    </div>;
};
export default Portfolio;