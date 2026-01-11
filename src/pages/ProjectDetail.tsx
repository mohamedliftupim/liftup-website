import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote, MapPin, Instagram } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { getProjectById, projects } from "@/data/projects";
const ProjectDetail = () => {
  const {
    id
  } = useParams<{
    id: string;
  }>();
  const {
    language,
    isRTL
  } = useLanguage();
  const project = id ? getProjectById(id) : undefined;
  if (!project) {
    return <Navigate to="/portfolio" replace />;
  }
  const currentIndex = projects.findIndex(p => p.id === id);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;
  const title = language === "ar" ? project.titleAr : project.title;
  const client = language === "ar" ? project.clientAr : project.client;
  const category = language === "ar" ? project.categoryAr : project.category;
  const description = language === "ar" ? project.fullDescriptionAr : project.fullDescription;
  const tags = language === "ar" ? project.tagsAr : project.tags;
  const results = language === "ar" ? project.resultsAr : project.results;
  const challenge = language === "ar" ? project.challengeAr : project.challenge;
  const solution = language === "ar" ? project.solutionAr : project.solution;
  const location = language === "ar" ? project.locationAr : project.location;
  return <div className={`min-h-screen pt-20 ${isRTL ? "text-right" : ""}`}>
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[550px]">
        <div className="absolute inset-0">
          <img src={project.image} alt={title} className="w-full h-full object-cover object-top" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />
        </div>

        <div className="relative container mx-auto px-6 h-full flex items-end pb-16">
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8
        }} className="max-w-3xl">
            <div className={`flex items-center gap-3 mb-6 ${isRTL ? "justify-end ml-auto" : ""}`}>
              <Link to="/portfolio" className={`flex items-center gap-2 text-white/70 hover:text-white transition-colors ${isRTL ? "flex-row-reverse" : ""}`}>
                <ArrowLeft size={16} className={isRTL ? "rotate-180" : ""} />
                {language === "ar" ? "العودة للأعمال" : "Back to Portfolio"}
              </Link>

              <Badge className="bg-accent text-accent-foreground">
                {category}
              </Badge>
            </div>

            <h1 className="text-5xl md:text-7xl font-display text-white mb-6 drop-shadow-lg leading-tight font-normal">
              {title}
            </h1>

            <div className="flex flex-col gap-3">
              <p className="text-xl text-white/90">
                <span className="text-accent font-semibold">{language === "ar" ? "العميل:" : "Client:"}</span> {client}
              </p>
              {location && <p className={`flex items-center gap-2 text-white/80 ${isRTL ? "flex-row-reverse" : ""}`}>
                  <MapPin size={16} className="text-accent" />
                  {location}
                </p>}
              {project.instagramUrl && <a href={project.instagramUrl} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-2 text-white/80 hover:text-accent transition-colors ${isRTL ? "flex-row-reverse" : ""}`}>
                  <Instagram size={16} className="text-accent" />
                  @{project.instagramUrl.replace('https://www.instagram.com/', '').replace('/', '')}
                </a>}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Logo Section - only show if project has logo */}
      {project.logo && <section className="py-8 bg-background border-b border-border">
          <div className="container mx-auto px-6">
            <div className={`flex items-center gap-4 ${isRTL ? "flex-row-reverse" : ""}`}>
              <img src={project.logo} alt={`${client} logo`} className="h-2/3 sm:-right-0.5 w-50 max-w-[150px] rounded-xl object-fill" />
              <div>
                <p className="text-sm text-muted-foreground">{language === "ar" ? "العلامة التجارية" : "Brand"}</p>
                <p className="font-bold text-lg">{client}</p>
              </div>
            </div>
          </div>
        </section>}

      {/* Content Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6">
          <div className={`grid lg:grid-cols-3 gap-12 ${isRTL ? "lg:grid-flow-dense" : ""}`}>
            {/* Main Content */}
            <div className={`lg:col-span-2 space-y-12 ${isRTL ? "lg:col-start-2" : ""}`}>
              <motion.div initial={{
              opacity: 0,
              y: 20
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }}>
                <h2 className="text-2xl font-bold mb-4">
                  {language === "ar" ? "نظرة عامة" : "Overview"}
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {description}
                </p>
              </motion.div>

              <motion.div initial={{
              opacity: 0,
              y: 20
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }}>
                <h2 className="text-2xl font-bold mb-4">
                  {language === "ar" ? "التحدي" : "The Challenge"}
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {challenge}
                </p>
              </motion.div>

              <motion.div initial={{
              opacity: 0,
              y: 20
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }}>
                <h2 className="text-2xl font-bold mb-4">
                  {language === "ar" ? "الحل" : "Our Solution"}
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {solution}
                </p>
              </motion.div>

              {/* Budget Section - only show if project has budget */}
              {project.budget && <motion.div initial={{
              opacity: 0,
              y: 20
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }}>
                  <h2 className="text-2xl font-bold mb-4">
                    {language === "ar" ? "الميزانية" : "Budget"}
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    {project.budget.clientBudget && <Card className="p-4 bg-accent/5 border-accent/20">
                        <p className="text-sm text-muted-foreground">{language === "ar" ? "ميزانية العميل" : "Client Budget"}</p>
                        <p className="text-xl font-bold text-accent">{project.budget.clientBudget}</p>
                      </Card>}
                    {project.budget.mediaBuyingSpend && <Card className="p-4 bg-accent/5 border-accent/20">
                        <p className="text-sm text-muted-foreground">{language === "ar" ? "إنفاق شراء الوسائط" : "Media Buying Spend"}</p>
                        <p className="text-xl font-bold text-accent">{project.budget.mediaBuyingSpend}</p>
                      </Card>}
                  </div>
                </motion.div>}

              {/* Videos Section - only show if project has videos */}
              {project.videos && project.videos.length > 0 && <motion.div initial={{
              opacity: 0,
              y: 20
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }}>
                  <h2 className="text-2xl font-bold mb-4">
                    {language === "ar" ? "فيديوهات الحملة" : "Campaign Videos"}
                  </h2>
                  <div className="grid gap-6">
                    {project.videos.map((videoUrl, index) => <div key={index} className="aspect-video rounded-lg overflow-hidden">
                        <iframe src={videoUrl} title={`${title} video ${index + 1}`} className="w-full h-full" frameBorder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" allowFullScreen />
                      </div>)}
                  </div>
                </motion.div>}

              {/* Testimonial */}
              {project.testimonial && <motion.div initial={{
              opacity: 0,
              y: 20
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }}>
                  <Card className="p-8 bg-accent/5 border-accent/20">
                    <Quote className="text-accent mb-4" size={40} />
                    <blockquote className="text-xl italic mb-6">
                      "{language === "ar" ? project.testimonial.quoteAr : project.testimonial.quote}"
                    </blockquote>
                    <div>
                      <div className="font-bold">{project.testimonial.author}</div>
                      <div className="text-muted-foreground">
                        {language === "ar" ? project.testimonial.roleAr : project.testimonial.role}
                      </div>
                    </div>
                  </Card>
                </motion.div>}
            </div>

            {/* Sidebar */}
            <div className={`space-y-8 ${isRTL ? "lg:col-start-1 lg:row-start-1" : ""}`}>
              <motion.div initial={{
              opacity: 0,
              x: 20
            }} whileInView={{
              opacity: 1,
              x: 0
            }} viewport={{
              once: true
            }}>
                <Card className="p-6">
                  <h3 className="text-lg font-bold mb-4 text-accent">
                    {language === "ar" ? "النتائج المحققة" : "Key Results"}
                  </h3>
                  <ul className="space-y-3">
                    {results.map((result, index) => <li key={index} className={`flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                        <div className="w-2 h-2 bg-accent rounded-full" />
                        <span className="text-muted-foreground">{result}</span>
                      </li>)}
                  </ul>
                </Card>
              </motion.div>

              <motion.div initial={{
              opacity: 0,
              x: 20
            }} whileInView={{
              opacity: 1,
              x: 0
            }} viewport={{
              once: true
            }} transition={{
              delay: 0.1
            }}>
                <Card className="p-6">
                  <h3 className="text-lg font-bold mb-4">
                    {language === "ar" ? "الخدمات" : "Services"}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {tags.map(tag => <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>)}
                  </div>
                </Card>
              </motion.div>

              <motion.div initial={{
              opacity: 0,
              x: 20
            }} whileInView={{
              opacity: 1,
              x: 0
            }} viewport={{
              once: true
            }} transition={{
              delay: 0.2
            }}>
                <Card className="p-6 bg-accent text-accent-foreground">
                  <h3 className="text-lg font-bold mb-2">
                    {language === "ar" ? "هل لديك مشروع مشابه؟" : "Have a similar project?"}
                  </h3>
                  <p className="text-accent-foreground/80 mb-4">
                    {language === "ar" ? "دعنا نناقش كيف يمكننا مساعدتك في تحقيق نتائج مماثلة." : "Let's discuss how we can help you achieve similar results."}
                  </p>
                  <Button variant="secondary" asChild className="w-full">
                    <Link to="/contact">
                      {language === "ar" ? "تواصل معنا" : "Get in Touch"}
                    </Link>
                  </Button>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-12 bg-secondary">
        <div className="container mx-auto px-6">
          <div className={`flex justify-between items-center ${isRTL ? "flex-row-reverse" : ""}`}>
            {prevProject ? <Link to={`/portfolio/${prevProject.id}`} className={`flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors ${isRTL ? "flex-row-reverse" : ""}`}>
                <ArrowLeft size={20} className={isRTL ? "rotate-180" : ""} />
                <div className={isRTL ? "text-right" : ""}>
                  <div className="text-sm">
                    {language === "ar" ? "المشروع السابق" : "Previous Project"}
                  </div>
                  <div className="font-bold">
                    {language === "ar" ? prevProject.titleAr : prevProject.title}
                  </div>
                </div>
              </Link> : <div />}

            {nextProject ? <Link to={`/portfolio/${nextProject.id}`} className={`flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors ${isRTL ? "flex-row-reverse" : ""}`}>
                <div className={isRTL ? "text-left" : "text-right"}>
                  <div className="text-sm">
                    {language === "ar" ? "المشروع التالي" : "Next Project"}
                  </div>
                  <div className="font-bold">
                    {language === "ar" ? nextProject.titleAr : nextProject.title}
                  </div>
                </div>
                <ArrowRight size={20} className={isRTL ? "rotate-180" : ""} />
              </Link> : <div />}
          </div>
        </div>
      </section>
    </div>;
};
export default ProjectDetail;