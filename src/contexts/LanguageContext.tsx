import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "en" | "ar";

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navbar
    "nav.home": "Home",
    "nav.services": "Services",
    "nav.portfolio": "Portfolio",
    "nav.about": "About",
    "nav.contact": "Contact",
    "nav.workWithUs": "Work with us!",
    "nav.getStarted": "Get Started",

    // Hero
    "hero.badge": "360° Creative Marketing Agency",
    "hero.title1": "We lift ideas into",
    "hero.title2": "Impactful Brands",
    "hero.subtitle": "Creative marketing that makes your audience say",
    "hero.wow": "WOW",
    "hero.subtitleEnd": ". Bold campaigns, stunning visuals and real results.",
    "hero.cta": "Start Your Project",

    // Clients
    "clients.trusted": "Trusted by forward-thinking brands",

    // Services
    "services.title": "Services We",
    "services.titleHighlight": "Offer",
    "services.subtitle": "Full-spectrum creative marketing solutions designed to lift your brand to new heights.",
    "services.viewAll": "View All Services",
    "services.brandStrategy.title": "Brand Strategy & Development",
    "services.brandStrategy.desc": "Build powerful brand foundations with strategic positioning, identity development, and market differentiation.",
    "services.digitalPerformance.title": "Digital Performance",
    "services.digitalPerformance.desc": "Drive measurable results with data-driven campaigns, analytics, and conversion optimization.",
    "services.digitalMarketing.title": "Digital Marketing",
    "services.digitalMarketing.desc": "Comprehensive digital solutions including SEO, email marketing, and marketing automation.",
    "services.advertising.title": "Advertising & Ad Production",
    "services.advertising.desc": "Create compelling ads and campaigns across all platforms with professional production quality.",
    "services.content.title": "Content Creation & Creative Concepts",
    "services.content.desc": "Craft engaging content and innovative creative concepts that captivate your audience.",
    "services.web.title": "Web Development",
    "services.web.desc": "Build high-performing websites and digital platforms with cutting-edge technology.",
    "services.socialMedia.title": "Social Media Management",
    "services.socialMedia.desc": "Grow your online presence with strategic social media management and community building.",
    "services.events.title": "Event Production & Management",
    "services.events.desc": "Create memorable experiences with full-service event planning, production, and execution.",

    // Services Page
    "services.page.badge": "Our Services",
    "services.page.title": "Full-Spectrum",
    "services.page.titleHighlight": "Creative Marketing",
    "services.page.subtitle": "From strategy to execution, we provide end-to-end marketing solutions that deliver measurable results and lasting impact.",
    "services.process.title": "Our Creative",
    "services.process.titleHighlight": "Process",
    "services.process.subtitle": "A proven methodology that transforms ideas into impactful campaigns.",
    "services.process.discovery": "Discovery",
    "services.process.discoveryDesc": "Understanding your brand, goals, and audience",
    "services.process.strategy": "Strategy",
    "services.process.strategyDesc": "Crafting a tailored marketing roadmap",
    "services.process.execution": "Execution",
    "services.process.executionDesc": "Bringing creative concepts to life",
    "services.process.optimization": "Optimization",
    "services.process.optimizationDesc": "Continuous improvement & scaling",
    "services.cta.title": "Ready to elevate your Brand?",
    "services.cta.subtitle": "Let's discuss how our services can help you achieve your marketing goals.",
    "services.cta.button": "Schedule a Consultation",

    // Services Features
    "services.brandStrategy.f1": "Brand positioning & strategy",
    "services.brandStrategy.f2": "Visual identity design",
    "services.brandStrategy.f3": "Brand guidelines development",
    "services.brandStrategy.f4": "Market research & analysis",
    "services.brandStrategy.f5": "Competitive differentiation",
    "services.digitalPerformance.f1": "Performance marketing",
    "services.digitalPerformance.f2": "Conversion rate optimization",
    "services.digitalPerformance.f3": "Analytics & reporting",
    "services.digitalPerformance.f4": "A/B testing strategies",
    "services.digitalPerformance.f5": "ROI tracking & optimization",
    "services.digitalMarketing.f1": "Search engine optimization",
    "services.digitalMarketing.f2": "Email marketing campaigns",
    "services.digitalMarketing.f3": "Marketing automation",
    "services.digitalMarketing.f4": "Lead generation",
    "services.digitalMarketing.f5": "Digital strategy consulting",
    "services.advertising.f1": "Creative ad development",
    "services.advertising.f2": "Video & photo production",
    "services.advertising.f3": "Media planning & buying",
    "services.advertising.f4": "Campaign management",
    "services.advertising.f5": "Performance tracking",
    "services.content.f1": "Content strategy",
    "services.content.f2": "Copywriting & storytelling",
    "services.content.f3": "Photography & videography",
    "services.content.f4": "Graphic design",
    "services.content.f5": "Creative campaign concepts",
    "services.web.f1": "Custom website development",
    "services.web.f2": "E-commerce solutions",
    "services.web.f3": "UI/UX design",
    "services.web.f4": "CMS integration",
    "services.web.f5": "Website maintenance & support",
    "services.socialMedia.f1": "Social media strategy",
    "services.socialMedia.f2": "Community management",
    "services.socialMedia.f3": "Content calendar planning",
    "services.socialMedia.f4": "Influencer partnerships",
    "services.socialMedia.f5": "Social listening & analytics",
    "services.events.f1": "Event concept & planning",
    "services.events.f2": "Venue selection & logistics",
    "services.events.f3": "On-site production",
    "services.events.f4": "Brand activations",
    "services.events.f5": "Post-event reporting",

    // Stats
    "stats.title": "Our Impact on",
    "stats.titleHighlight": "Your Business",
    "stats.subtitle": "Real results that matter. Data-driven strategies that delivers measurable growth.",
    "stats.budget": "Monthly Managed Media Budget",
    "stats.roas": "Return on Ad Spend (ROAS)",
    "stats.revenue": "Monthly Total Revenue",

    // Portfolio
    "portfolio.title": "Work that",
    "portfolio.titleHighlight": "Inspires",
    "portfolio.subtitle": "Explore our portfolio of bold campaigns and stunning creative work.",
    "portfolio.viewAll": "View All Work",
    "portfolio.item1.title": "Social Media Campaign",
    "portfolio.item1.client": "Tech Startup",
    "portfolio.item2.title": "Brand Identity",
    "portfolio.item2.client": "Luxury Retail",
    "portfolio.item3.title": "Video Production",
    "portfolio.item3.client": "E-commerce Brand",

    // Portfolio Page
    "portfolio.page.badge": "Our Portfolio",
    "portfolio.page.title": "Work That Makes an",
    "portfolio.page.titleHighlight": "Impact",
    "portfolio.page.subtitle": "Explore our portfolio of bold campaigns, stunning creative work, and measurable results for forward-thinking brands.",
    "portfolio.keyResults": "Key Results:",
    "portfolio.stats.projects": "Projects Completed",
    "portfolio.stats.satisfaction": "Client Satisfaction",
    "portfolio.stats.awards": "Industry Awards",
    "portfolio.stats.impressions": "Total Impressions",

    // CTA
    "cta.title": "Ready to",
    "cta.titleHighlight": "Elevate",
    "cta.titleEnd": "Your Brand?",
    "cta.subtitle": "Let's create something amazing together. Get in touch and let's start lifting your brand to new heights.",
    "cta.button": "Let's Talk",

    // About Page
    "about.badge": "About LiftUp",
    "about.title": "We Believe in",
    "about.titleHighlight": "Bold Ideas",
    "about.subtitle": "LiftUp is a creative marketing agency that transforms brands through bold campaigns, stunning visuals, and data-driven strategies. We don't just create marketing—we create movements.",
    "about.mission.title": "Our",
    "about.mission.titleHighlight": "Purpose",
    "about.mission.text": "Challenge the norm, spark the move, own the reward.",
    "about.purpose.line1": "Challenge the norm",
    "about.purpose.line2": "spark the move",
    "about.purpose.line3": "own the reward",
    "about.vision.title": "Our",
    "about.vision.titleHighlight": "Vision",
    "about.vision.text": "To build a community around the agency grounded in growth, meaning, and bold thinking, where people move fast, think creatively, feel deeply, and work with purpose to elevate the brands we serve.",
    "about.values.title": "Our",
    "about.values.titleHighlight": "Values",
    "about.values.subtitle": "The principles that guide everything we do and every campaign we create.",
    "about.values.resultsDriven": "Results-Driven",
    "about.values.resultsDrivenDesc": "Every campaign is measured, optimized, and designed to deliver tangible business results.",
    "about.values.clientObsessed": "Client-Obsessed",
    "about.values.clientObsessedDesc": "Your success is our success. We treat your brand like our own and go above and beyond.",
    "about.values.creativelyBold": "Creatively Bold",
    "about.values.creativelyBoldDesc": "We push boundaries, challenge conventions, and create work that makes people say WOW.",
    "about.values.excellenceAlways": "Excellence Always",
    "about.values.excellenceAlwaysDesc": "We never settle for good enough. Premium quality is our standard, not our exception.",
    "about.departments.title": "Our",
    "about.departments.titleHighlight": "Departments",
    "about.departments.strategy": "Strategy & Planning",
    "about.departments.creative": "Creative & Brand Identity",
    "about.departments.content": "Content & Production",
    "about.departments.digital": "Digital Marketing",
    "about.departments.account": "Account Management",
    "about.departments.business": "Business Development",
    "about.stats.brands": "Brands Elevated",
    "about.stats.countries": "Countries Served",
    "about.stats.members": "Team Members",
    "about.stats.satisfaction": "Client Satisfaction",

    // Contact Page
    "contact.badge": "Get in Touch",
    "contact.title": "Let's create something",
    "contact.titleHighlight": "Extraordinary",
    "contact.subtitle": "Ready to lift your brand to new heights? Get in touch with our team and let's start your transformation journey today.",
    "contact.form.title": "Send Us a Message",
    "contact.form.howHelp": "How can we help you?",
    "contact.form.workWithUs": "Work With Us",
    "contact.form.workWithUsDesc": "Start a project",
    "contact.form.joinTeam": "Join The Team",
    "contact.form.joinTeamDesc": "Career opportunities",
    "contact.form.askQuestion": "Ask a Question",
    "contact.form.askQuestionDesc": "General inquiry",
    "contact.form.firstName": "First Name",
    "contact.form.lastName": "Last Name",
    "contact.form.email": "Email",
    "contact.form.phone": "Phone",
    "contact.form.company": "Company",
    "contact.form.message": "Message",
    "contact.form.messagePlaceholder": "Tell us about your project...",
    "contact.form.submit": "Send Message",
    "contact.form.selectPurpose": "Please select a purpose",
    "contact.form.selectPurposeDesc": "Let us know how we can help you.",
    "contact.form.success": "Message Sent!",
    "contact.form.successDesc": "We'll get back to you within 24 hours.",
    "contact.info.title": "Get in",
    "contact.info.titleHighlight": "Touch",
    "contact.info.subtitle": "We'd love to hear from you. Choose the best way to reach us and our team will respond within 24 hours.",
    "contact.info.email": "Email Us",
    "contact.info.call": "Call Us",
    "contact.info.visit": "Visit Us",
    "contact.info.whatsapp": "WhatsApp",
    "contact.info.chatWithUs": "Chat with us",
    "contact.office.title": "Office Hours",
    "contact.office.sunThur": "Sunday - Thursday",
    "contact.office.saturday": "Saturday",
    "contact.office.friday": "Friday",
    "contact.office.closed": "Online",

    // Footer
    "footer.tagline": "Lifting brands to new heights through bold creativity and data-driven strategies.",
    "footer.quickLinks": "Quick Links",
    "footer.services": "Services",
    "footer.connect": "Connect",
    "footer.rights": "All rights reserved.",
    "footer.madeWith": "Made with",
    "footer.inEgypt": "in Egypt",
  },
  ar: {
    // Navbar
    "nav.home": "الرئيسية",
    "nav.services": "خدماتنا",
    "nav.portfolio": "أعمالنا",
    "nav.about": "من نحن",
    "nav.contact": "تواصل معنا",
    "nav.workWithUs": "اعمل معنا!",
    "nav.getStarted": "ابدأ الآن",

    // Hero
    "hero.badge": "وكالة تسويق إبداعية متكاملة",
    "hero.title1": "نرتقي بالأفكار نحو",
    "hero.title2": "علامات تجارية استثنائية",
    "hero.subtitle": "إبداع تسويقي يترك أثراً ويُلهم جمهورك ليقول",
    "hero.wow": "مذهل",
    "hero.subtitleEnd": ". رؤى جريئة، تصاميم آسرة، نتائج ملموسة.",
    "hero.cta": "انطلق بمشروعك",

    // Clients
    "clients.trusted": "شركاء نجاحنا من العلامات الرائدة",

    // Services
    "services.title": "خدماتنا",
    "services.titleHighlight": "المتميزة",
    "services.subtitle": "حلول تسويقية متكاملة تُحدث الفارق وترتقي بعلامتك التجارية.",
    "services.viewAll": "عرض جميع الخدمات",
    "services.brandStrategy.title": "استراتيجية وبناء العلامة التجارية",
    "services.brandStrategy.desc": "نؤسس قواعد راسخة لعلامتك التجارية بتموضع استراتيجي وهوية مميزة تتفوق في السوق.",
    "services.digitalPerformance.title": "الأداء الرقمي",
    "services.digitalPerformance.desc": "نحقق نتائج ملموسة عبر حملات ذكية وتحليلات دقيقة وتحسين مستمر للتحويلات.",
    "services.digitalMarketing.title": "التسويق الرقمي",
    "services.digitalMarketing.desc": "حلول رقمية متكاملة تشمل تصدر محركات البحث والتسويق الإلكتروني والأتمتة الذكية.",
    "services.advertising.title": "الإعلان والإنتاج الإعلاني",
    "services.advertising.desc": "نصنع إعلانات وحملات مؤثرة عبر كافة المنصات بجودة إنتاجية احترافية.",
    "services.content.title": "صناعة المحتوى والأفكار الإبداعية",
    "services.content.desc": "نبتكر محتوى آسر وأفكار إبداعية فريدة تجذب جمهورك وتُلهمه.",
    "services.web.title": "تطوير المواقع الإلكترونية",
    "services.web.desc": "نبني مواقع ومنصات رقمية متطورة بأحدث التقنيات وأعلى معايير الأداء.",
    "services.socialMedia.title": "إدارة منصات التواصل",
    "services.socialMedia.desc": "نُنمّي حضورك الرقمي بإدارة استراتيجية وبناء مجتمع تفاعلي حول علامتك.",
    "services.events.title": "إنتاج وإدارة الفعاليات",
    "services.events.desc": "نصنع تجارب لا تُنسى بتخطيط متقن وإنتاج احترافي وتنفيذ متميز.",

    // Services Page
    "services.page.badge": "خدماتنا",
    "services.page.title": "تسويق إبداعي",
    "services.page.titleHighlight": "شامل",
    "services.page.subtitle": "من الاستراتيجية إلى التنفيذ، نقدم حلول تسويقية متكاملة تحقق نتائج قابلة للقياس وتأثير دائم.",
    "services.process.title": "عمليتنا",
    "services.process.titleHighlight": "الإبداعية",
    "services.process.subtitle": "منهجية مثبتة تحول الأفكار إلى حملات مؤثرة.",
    "services.process.discovery": "الاكتشاف",
    "services.process.discoveryDesc": "فهم علامتك التجارية وأهدافك وجمهورك",
    "services.process.strategy": "الاستراتيجية",
    "services.process.strategyDesc": "صياغة خارطة طريق تسويقية مخصصة",
    "services.process.execution": "التنفيذ",
    "services.process.executionDesc": "تحويل المفاهيم الإبداعية إلى واقع",
    "services.process.optimization": "التحسين",
    "services.process.optimizationDesc": "التحسين المستمر والتوسع",
    "services.cta.title": "مستعد لرفع علامتك التجارية؟",
    "services.cta.subtitle": "لنناقش كيف يمكن لخدماتنا مساعدتك في تحقيق أهدافك التسويقية.",
    "services.cta.button": "حجز استشارة",

    // Services Features
    "services.brandStrategy.f1": "تموضع واستراتيجية العلامة التجارية",
    "services.brandStrategy.f2": "تصميم الهوية البصرية",
    "services.brandStrategy.f3": "تطوير دليل العلامة التجارية",
    "services.brandStrategy.f4": "أبحاث وتحليل السوق",
    "services.brandStrategy.f5": "التميز التنافسي",
    "services.digitalPerformance.f1": "التسويق بالأداء",
    "services.digitalPerformance.f2": "تحسين معدل التحويل",
    "services.digitalPerformance.f3": "التحليلات والتقارير",
    "services.digitalPerformance.f4": "استراتيجيات اختبار A/B",
    "services.digitalPerformance.f5": "تتبع وتحسين العائد على الاستثمار",
    "services.digitalMarketing.f1": "تحسين محركات البحث",
    "services.digitalMarketing.f2": "حملات التسويق عبر البريد الإلكتروني",
    "services.digitalMarketing.f3": "أتمتة التسويق",
    "services.digitalMarketing.f4": "توليد العملاء المحتملين",
    "services.digitalMarketing.f5": "استشارات الاستراتيجية الرقمية",
    "services.advertising.f1": "تطوير الإعلانات الإبداعية",
    "services.advertising.f2": "إنتاج الفيديو والصور",
    "services.advertising.f3": "التخطيط الإعلامي والشراء",
    "services.advertising.f4": "إدارة الحملات",
    "services.advertising.f5": "تتبع الأداء",
    "services.content.f1": "استراتيجية المحتوى",
    "services.content.f2": "كتابة النصوص والسرد القصصي",
    "services.content.f3": "التصوير الفوتوغرافي والفيديو",
    "services.content.f4": "التصميم الجرافيكي",
    "services.content.f5": "مفاهيم الحملات الإبداعية",
    "services.web.f1": "تطوير مواقع مخصصة",
    "services.web.f2": "حلول التجارة الإلكترونية",
    "services.web.f3": "تصميم واجهة وتجربة المستخدم",
    "services.web.f4": "تكامل أنظمة إدارة المحتوى",
    "services.web.f5": "صيانة ودعم المواقع",
    "services.socialMedia.f1": "استراتيجية وسائل التواصل الاجتماعي",
    "services.socialMedia.f2": "إدارة المجتمع",
    "services.socialMedia.f3": "تخطيط تقويم المحتوى",
    "services.socialMedia.f4": "شراكات المؤثرين",
    "services.socialMedia.f5": "الاستماع الاجتماعي والتحليلات",
    "services.events.f1": "مفهوم وتخطيط الفعاليات",
    "services.events.f2": "اختيار المكان والخدمات اللوجستية",
    "services.events.f3": "الإنتاج في الموقع",
    "services.events.f4": "تفعيل العلامة التجارية",
    "services.events.f5": "تقارير ما بعد الفعالية",

    // Stats
    "stats.title": "أثرنا في",
    "stats.titleHighlight": "نجاحك",
    "stats.subtitle": "أرقام تتحدث. استراتيجيات ذكية تصنع نمواً حقيقياً وملموساً.",
    "stats.budget": "ميزانية إعلانية شهرية مُدارة",
    "stats.roas": "العائد على الإنفاق الإعلاني",
    "stats.revenue": "إجمالي الإيرادات الشهرية",

    // Portfolio
    "portfolio.title": "إنجازات",
    "portfolio.titleHighlight": "ملهمة",
    "portfolio.subtitle": "اكتشف مجموعة من الحملات الجريئة والأعمال الإبداعية المتميزة.",
    "portfolio.viewAll": "استعرض جميع الأعمال",
    "portfolio.item1.title": "حملة تواصل اجتماعي",
    "portfolio.item1.client": "شركة تقنية ناشئة",
    "portfolio.item2.title": "هوية علامة تجارية",
    "portfolio.item2.client": "دار أزياء فاخرة",
    "portfolio.item3.title": "إنتاج فيديو",
    "portfolio.item3.client": "علامة تجارة إلكترونية",

    // Portfolio Page
    "portfolio.page.badge": "أعمالنا",
    "portfolio.page.title": "إنجازات تصنع",
    "portfolio.page.titleHighlight": "الفارق",
    "portfolio.page.subtitle": "اكتشف محفظة أعمالنا من الحملات الجريئة والإبداعات المتميزة والنتائج الملموسة.",
    "portfolio.keyResults": "النتائج المحققة:",
    "portfolio.stats.projects": "مشروع مُنجز",
    "portfolio.stats.satisfaction": "رضا العملاء",
    "portfolio.stats.awards": "جائزة متميزة",
    "portfolio.stats.impressions": "إجمالي الوصول",

    // CTA
    "cta.title": "جاهز",
    "cta.titleHighlight": "للانطلاق",
    "cta.titleEnd": "بعلامتك؟",
    "cta.subtitle": "لنصنع معاً شيئاً استثنائياً. تواصل معنا ولننطلق برحلة التميز.",
    "cta.button": "لنتحدث",

    // About Page
    "about.badge": "عن ليفت أب",
    "about.title": "نؤمن بـ",
    "about.titleHighlight": "الأفكار الجريئة",
    "about.subtitle": "ليفت أب هي وكالة تسويق إبداعية تحول العلامات التجارية من خلال الحملات الجريئة والتصاميم المذهلة والاستراتيجيات المبنية على البيانات. نحن لا نصنع التسويق فحسب—بل نصنع الحركات.",
    "about.mission.title": "",
    "about.mission.titleHighlight": "هدفنا",
    "about.mission.text": "تحدي المألوف، إشعال الحركة، امتلاك المكافأة.",
    "about.purpose.line1": "تحدي المألوف",
    "about.purpose.line2": "إشعال الحركة",
    "about.purpose.line3": "امتلاك المكافأة",
    "about.vision.title": "",
    "about.vision.titleHighlight": "رؤيتنا",
    "about.vision.text": "بناء مجتمع حول الوكالة قائم على النمو والمعنى والتفكير الجريء، حيث يتحرك الناس بسرعة، ويفكرون بإبداع، ويشعرون بعمق، ويعملون بهدف لرفع العلامات التجارية التي نخدمها.",
    "about.values.title": "",
    "about.values.titleHighlight": "قيمنا",
    "about.values.subtitle": "المبادئ التي توجه كل ما نفعله وكل حملة نصممها.",
    "about.values.resultsDriven": "مدفوعون بالنتائج",
    "about.values.resultsDrivenDesc": "كل حملة يتم قياسها وتحسينها وتصميمها لتحقيق نتائج أعمال ملموسة.",
    "about.values.clientObsessed": "هوس العميل",
    "about.values.clientObsessedDesc": "نجاحك هو نجاحنا. نتعامل مع علامتك التجارية كأنها علامتنا ونبذل قصارى جهدنا.",
    "about.values.creativelyBold": "جرأة إبداعية",
    "about.values.creativelyBoldDesc": "ندفع الحدود، نتحدى التقاليد، ونصنع أعمالاً تجعل الناس يقولون واو.",
    "about.values.excellenceAlways": "التميز دائماً",
    "about.values.excellenceAlwaysDesc": "لا نرضى أبداً بالجيد بما فيه الكفاية. الجودة المتميزة هي معيارنا، وليست الاستثناء.",
    "about.departments.title": "",
    "about.departments.titleHighlight": "أقسامنا",
    "about.departments.strategy": "الاستراتيجية والتخطيط",
    "about.departments.creative": "الإبداع وهوية العلامة التجارية",
    "about.departments.content": "المحتوى والإنتاج",
    "about.departments.digital": "التسويق الرقمي",
    "about.departments.account": "إدارة الحسابات",
    "about.departments.business": "تطوير الأعمال",
    "about.stats.brands": "علامة تجارية",
    "about.stats.countries": "دولة",
    "about.stats.members": "عضو في الفريق",
    "about.stats.satisfaction": "رضا العملاء",

    // Timeline
    "about.timeline.2019.title": "تأسيس الوكالة",
    "about.timeline.2019.desc": "بدأنا برؤية لتحويل التسويق الإبداعي",
    "about.timeline.2020.title": "50 عميل",
    "about.timeline.2020.desc": "توسعنا لخدمة أكثر من 50 علامة تجارية في صناعات متعددة",
    "about.timeline.2021.title": "فائز بجائزة",
    "about.timeline.2021.desc": "تم الاعتراف بنا كأفضل وكالة إبداعية للعام",
    "about.timeline.2022.title": "توسع عالمي",
    "about.timeline.2022.desc": "افتتحنا مكاتب في دبي ولندن ونيويورك",
    "about.timeline.2023.title": "250+ علامة تجارية",
    "about.timeline.2023.desc": "موثوق به من أكثر من 250 شركة رائدة",

    // Contact Page
    "contact.badge": "تواصل معنا",
    "contact.title": "لنصنع معاً",
    "contact.titleHighlight": "شيئاً استثنائياً",
    "contact.subtitle": "جاهز للانطلاق بعلامتك التجارية؟ تواصل مع فريقنا ولنبدأ رحلة التميز معاً.",
    "contact.form.title": "راسلنا",
    "contact.form.howHelp": "كيف نساعدك؟",
    "contact.form.workWithUs": "شراكة عمل",
    "contact.form.workWithUsDesc": "ابدأ مشروعاً",
    "contact.form.joinTeam": "انضم لفريقنا",
    "contact.form.joinTeamDesc": "فرص وظيفية",
    "contact.form.askQuestion": "استفسار",
    "contact.form.askQuestionDesc": "سؤال عام",
    "contact.form.firstName": "الاسم الأول",
    "contact.form.lastName": "اسم العائلة",
    "contact.form.email": "البريد الإلكتروني",
    "contact.form.phone": "رقم الهاتف",
    "contact.form.company": "اسم الشركة",
    "contact.form.message": "رسالتك",
    "contact.form.messagePlaceholder": "حدثنا عن مشروعك...",
    "contact.form.submit": "أرسل رسالتك",
    "contact.form.selectPurpose": "اختر نوع الاستفسار",
    "contact.form.selectPurposeDesc": "ساعدنا نفهم احتياجك.",
    "contact.form.success": "تم الإرسال!",
    "contact.form.successDesc": "سنتواصل معك خلال 24 ساعة.",
    "contact.info.title": "تواصل",
    "contact.info.titleHighlight": "معنا",
    "contact.info.subtitle": "يسعدنا التواصل معك. اختر الطريقة المناسبة وسيرد فريقنا في أقرب وقت.",
    "contact.info.email": "راسلنا",
    "contact.info.call": "اتصل بنا",
    "contact.info.visit": "زرنا",
    "contact.info.whatsapp": "واتساب",
    "contact.info.chatWithUs": "تحدث معنا",
    "contact.office.title": "ساعات العمل",
    "contact.office.sunThur": "الأحد - الخميس",
    "contact.office.saturday": "السبت",
    "contact.office.friday": "الجمعة",
    "contact.office.closed": "دوام رقمي عبر الانترنت",

    // Footer
    "footer.tagline": "نرتقي بالعلامات التجارية عبر إبداع جريء واستراتيجيات ذكية.",
    "footer.quickLinks": "روابط سريعة",
    "footer.services": "خدماتنا",
    "footer.connect": "تواصل معنا",
    "footer.rights": "جميع الحقوق محفوظة.",
    "footer.madeWith": "صُنع بـ",
    "footer.inEgypt": "في مصر",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("liftup-language");
    return (saved as Language) || "en";
  });

  const isRTL = language === "ar";

  useEffect(() => {
    localStorage.setItem("liftup-language", language);
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.documentElement.lang = language;
  }, [language, isRTL]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "ar" : "en"));
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
