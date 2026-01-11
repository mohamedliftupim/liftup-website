import cuisinePlusThumbnail from "@/assets/projects/cuisine-plus-thumbnail.png";
import energizeThumbnail from "@/assets/projects/energize-thumbnail.png";
import lumoraThumbnail from "@/assets/projects/lumora-thumbnail.png";
import traceThumbnail from "@/assets/projects/trace-thumbnail.png";
export interface Project {
  id: string;
  image: string;
  logo?: string;
  title: string;
  titleAr: string;
  client: string;
  clientAr: string;
  location?: string;
  locationAr?: string;
  instagramUrl?: string;
  category: string;
  categoryAr: string;
  description: string;
  descriptionAr: string;
  fullDescription: string;
  fullDescriptionAr: string;
  tags: string[];
  tagsAr: string[];
  results: string[];
  resultsAr: string[];
  challenge: string;
  challengeAr: string;
  solution: string;
  solutionAr: string;
  budget?: {
    clientBudget?: string;
    mediaBuyingSpend?: string;
  };
  videos?: string[];
  testimonial?: {
    quote: string;
    quoteAr: string;
    author: string;
    role: string;
    roleAr: string;
  };
}

export const projects: Project[] = [
  {
    id: "cuisine-plus-campaign",
    image: cuisinePlusThumbnail,
    logo: "/projects/cuisine-plus-logo.jpeg",
    title: "Plus Plus Campaign",
    titleAr: "حملة بلس بلس",
    client: "Cuisine Plus",
    clientAr: "كوزين بلس",
    location: "KSA",
    locationAr: "المملكة العربية السعودية",
    instagramUrl: "https://www.instagram.com/cuisineplusme/",
    category: "Performance Marketing",
    categoryAr: "التسويق الأدائي",
    description: "A performance marketing campaign focused on improving sales performance for Cuisine Plus by enhancing creative direction and optimizing media buying to increase conversions in the Saudi market.",
    descriptionAr: "حملة تسويق أدائي تركز على تحسين أداء المبيعات لكوزين بلس من خلال تعزيز التوجيه الإبداعي وتحسين شراء الوسائط لزيادة التحويلات في السوق السعودي.",
    fullDescription: "A performance marketing campaign focused on improving sales performance for Cuisine Plus by enhancing creative direction and optimizing media buying to increase conversions in the Saudi market. We began by developing a strong creative strategy tailored to the Saudi market, focusing on highlighting product quality and customization options, aligning messaging with target audience preferences, and testing multiple creative angles to identify top-performing ads.",
    fullDescriptionAr: "حملة تسويق أدائي تركز على تحسين أداء المبيعات لكوزين بلس من خلال تعزيز التوجيه الإبداعي وتحسين شراء الوسائط لزيادة التحويلات في السوق السعودي. بدأنا بتطوير استراتيجية إبداعية قوية مصممة خصيصاً للسوق السعودي، مع التركيز على إبراز جودة المنتج وخيارات التخصيص، ومواءمة الرسائل مع تفضيلات الجمهور المستهدف، واختبار زوايا إبداعية متعددة لتحديد الإعلانات الأفضل أداءً.",
    tags: ["Digital Performance", "Creative Direction", "Ad Production", "Landing Pages"],
    tagsAr: ["الأداء الرقمي", "التوجيه الإبداعي", "إنتاج الإعلانات", "صفحات الهبوط"],
    results: ["Monthly Target Achievement 90% - 110%", "CPL 46% below average", "Significant improvement in overall sales performance"],
    resultsAr: ["تحقيق الهدف الشهري 90% - 110%", "تكلفة الاكتساب أقل بنسبة 46% من المتوسط", "تحسن كبير في الأداء العام للمبيعات"],
    challenge: "Before partnering with our team, Cuisine Plus was achieving less than 40% of its expected sales targets. This underperformance was driven by: lack of a clear creative direction, inefficient media buying structure, and low conversion rates despite active ad spend.",
    challengeAr: "قبل الشراكة مع فريقنا، كانت كوزين بلس تحقق أقل من 40% من أهداف المبيعات المتوقعة. كان هذا الأداء الضعيف ناتجاً عن: غياب توجيه إبداعي واضح، وهيكل شراء وسائط غير فعال، ومعدلات تحويل منخفضة رغم الإنفاق الإعلاني النشط.",
    solution: "We developed a strong creative strategy tailored to the Saudi market, focusing on: highlighting product quality and customization options, aligning messaging with target audience preferences, and testing multiple creative angles to identify top-performing ads.",
    solutionAr: "طورنا استراتيجية إبداعية قوية مصممة للسوق السعودي، مع التركيز على: إبراز جودة المنتج وخيارات التخصيص، ومواءمة الرسائل مع تفضيلات الجمهور المستهدف، واختبار زوايا إبداعية متعددة لتحديد الإعلانات الأفضل أداءً.",
    videos: [
      "https://player.vimeo.com/video/1079278154?h=bfe57c6013",
      "https://player.vimeo.com/video/1079276082?h=5a4f43c5fa",
      "https://player.vimeo.com/video/957738761?h=d5890ef10f"
    ]
  },
  {
    id: "energize-train-get-rewarded",
    image: energizeThumbnail,
    logo: "/projects/energize-logo-new.png",
    title: "Train And Get Rewarded Campaign",
    titleAr: "حملة تدرب واحصل على مكافأة",
    client: "Energize",
    clientAr: "إنرجايز",
    location: "Egypt",
    locationAr: "مصر",
    instagramUrl: "https://www.instagram.com/enerjize.eg/",
    category: "Performance Marketing",
    categoryAr: "التسويق الأدائي",
    description: "A performance marketing campaign focused on increasing app downloads and user acquisition for Energize fitness app through optimized paid media strategies and precise audience targeting in the Egyptian market.",
    descriptionAr: "حملة تسويق أدائي تركز على زيادة تحميلات التطبيق واكتساب المستخدمين لتطبيق إنرجايز للياقة البدنية من خلال استراتيجيات الوسائط المدفوعة المحسّنة والاستهداف الدقيق للجمهور في السوق المصري.",
    fullDescription: "Energize is a fitness mobile application, with the main objective of increasing app downloads and user acquisition through paid media. We executed a mobile app-focused media buying strategy, including precise targeting of fitness-focused audiences, optimized creatives designed for app installs, and continuous performance tracking and optimization. Our approach combined data-driven audience segmentation with compelling creative assets that resonated with health-conscious users.",
    fullDescriptionAr: "إنرجايز هو تطبيق لياقة بدنية للهاتف المحمول، بهدف رئيسي هو زيادة تحميلات التطبيق واكتساب المستخدمين من خلال الوسائط المدفوعة. نفذنا استراتيجية شراء وسائط تركز على تطبيقات الهاتف المحمول، تتضمن استهدافاً دقيقاً لجماهير اللياقة البدنية، وتصميمات محسّنة لتثبيت التطبيقات، وتتبع وتحسين الأداء المستمر. جمع نهجنا بين تقسيم الجمهور القائم على البيانات والأصول الإبداعية المقنعة التي تتناسب مع المستخدمين المهتمين بالصحة.",
    tags: ["Digital Performance", "App Marketing", "Creative Production", "Audience Targeting"],
    tagsAr: ["الأداء الرقمي", "تسويق التطبيقات", "الإنتاج الإبداعي", "استهداف الجمهور"],
    results: ["Exceeded yearly target by 130%", "Improved cost efficiency while meeting targets"],
    resultsAr: ["تجاوز الهدف السنوي بنسبة 130%", "تحسين كفاءة التكلفة مع تحقيق الأهداف"],
    challenge: "The app operates in a highly competitive market, with challenges including: high competition in the fitness app space, reaching high-intent users, and maintaining an efficient cost per install.",
    challengeAr: "يعمل التطبيق في سوق تنافسي للغاية، مع تحديات تشمل: المنافسة العالية في مجال تطبيقات اللياقة البدنية، والوصول إلى المستخدمين ذوي النية العالية، والحفاظ على تكلفة تثبيت فعالة.",
    solution: "We executed a mobile app-focused media buying strategy, including: precise targeting of fitness-focused audiences, optimized creatives designed for app installs, and continuous performance tracking and optimization.",
    solutionAr: "نفذنا استراتيجية شراء وسائط تركز على تطبيقات الهاتف المحمول، تتضمن: استهدافاً دقيقاً لجماهير اللياقة البدنية، وتصميمات محسّنة لتثبيت التطبيقات، وتتبع وتحسين الأداء المستمر.",
    videos: [
      "https://player.vimeo.com/video/1121558781?h=c1c15b2482",
      "https://player.vimeo.com/video/1121559156?h=0baeb6c6a9",
      "https://player.vimeo.com/video/1121557445?h=f9a2026e81",
      "https://player.vimeo.com/video/1121558926?h=da31d63cb7"
    ]
  },
  {
    id: "lumora-real-estate-campaign",
    image: lumoraThumbnail,
    logo: "/projects/lumora-logo.jpg",
    title: "Real Estate Campaign",
    titleAr: "حملة عقارية",
    client: "Lumora",
    clientAr: "لومورا",
    location: "Egypt",
    locationAr: "مصر",
    instagramUrl: "https://www.instagram.com/lumorainvestments/",
    category: "Performance Marketing",
    categoryAr: "التسويق الأدائي",
    description: "A lead generation campaign for a real estate project launch, focused on generating qualified leads through a performance-driven media buying strategy.",
    descriptionAr: "حملة توليد عملاء محتملين لإطلاق مشروع عقاري، تركز على توليد عملاء مؤهلين من خلال استراتيجية شراء وسائط قائمة على الأداء.",
    fullDescription: "A lead generation campaign for a real estate project launch, focused on generating qualified leads through a performance-driven media buying strategy. We implemented a lead generation-focused media buying strategy, specifically designed for real estate launches: defined high-intent audiences interested in residential compounds and real estate investment, created conversion-focused creatives highlighting the project's value proposition, built and optimized lead generation funnels, and continuously monitored and optimized campaigns to improve lead quality and reduce cost.",
    fullDescriptionAr: "حملة توليد عملاء محتملين لإطلاق مشروع عقاري، تركز على توليد عملاء مؤهلين من خلال استراتيجية شراء وسائط قائمة على الأداء. نفذنا استراتيجية شراء وسائط تركز على توليد العملاء المحتملين، مصممة خصيصاً لإطلاق المشاريع العقارية: تحديد الجماهير ذات النية العالية المهتمة بالمجمعات السكنية والاستثمار العقاري، وإنشاء تصميمات تركز على التحويل تبرز عرض القيمة للمشروع، وبناء وتحسين مسارات توليد العملاء المحتملين، والمراقبة والتحسين المستمر للحملات لتحسين جودة العملاء وتقليل التكلفة.",
    tags: ["Lead Generation", "Digital Performance", "Conversion Optimization", "Real Estate"],
    tagsAr: ["توليد العملاء المحتملين", "الأداء الرقمي", "تحسين التحويل", "العقارات"],
    results: ["35% qualified leads", "Achieved efficient cost per lead", "Strong lead quality"],
    resultsAr: ["35% عملاء مؤهلين", "تحقيق تكلفة فعالة لكل عميل محتمل", "جودة عملاء قوية"],
    challenge: "Generating high-quality leads for a new launch unit in Mountain View Compound through a performance-driven media buying strategy. They faced several challenges: high competition in the real estate market, the need to generate qualified leads not just traffic, reaching the right audience interested in premium residential compounds, and maintaining an efficient CPL.",
    challengeAr: "توليد عملاء محتملين عاليي الجودة لوحدة إطلاق جديدة في مجمع ماونتن فيو من خلال استراتيجية شراء وسائط قائمة على الأداء. واجهوا عدة تحديات: المنافسة العالية في سوق العقارات، والحاجة إلى توليد عملاء مؤهلين وليس مجرد حركة مرور، والوصول إلى الجمهور المناسب المهتم بالمجمعات السكنية الفاخرة، والحفاظ على تكلفة فعالة لكل عميل محتمل.",
    solution: "We implemented a lead generation-focused media buying strategy, specifically designed for real estate launches: defined high-intent audiences interested in residential compounds and real estate investment, created conversion-focused creatives highlighting the project's value proposition, built and optimized lead generation funnels, and continuously monitored and optimized campaigns to improve lead quality and reduce cost.",
    solutionAr: "نفذنا استراتيجية شراء وسائط تركز على توليد العملاء المحتملين، مصممة خصيصاً لإطلاق المشاريع العقارية: تحديد الجماهير ذات النية العالية المهتمة بالمجمعات السكنية والاستثمار العقاري، وإنشاء تصميمات تركز على التحويل تبرز عرض القيمة للمشروع، وبناء وتحسين مسارات توليد العملاء المحتملين، والمراقبة والتحسين المستمر للحملات لتحسين جودة العملاء وتقليل التكلفة."
  },
  {
    id: "trace-incense-campaign",
    image: traceThumbnail,
    logo: "/projects/trace-logo.png",
    title: "العود صار أأمن أسرع أسهل Campaign",
    titleAr: "حملة العود صار أأمن أسرع أسهل",
    client: "Trace",
    clientAr: "تريس",
    location: "KSA",
    locationAr: "المملكة العربية السعودية",
    instagramUrl: "https://www.instagram.com/bytrace_/",
    category: "Conversion & Awareness",
    categoryAr: "التحويل والوعي",
    description: "A full-funnel marketing campaign for a revolutionary capsule-based incense system, focused on brand awareness, customer education, and e-commerce conversions.",
    descriptionAr: "حملة تسويقية متكاملة لنظام بخور كبسولات ثوري، تركز على الوعي بالعلامة التجارية وتثقيف العملاء وتحويلات التجارة الإلكترونية.",
    fullDescription: "As a completely new concept in the market, Trace faced the challenge of introducing an unfamiliar capsule-based incense system to the audience. We developed a full marketing and media buying strategy focused on clarity, education, and conversion. This included crafting a clear brand narrative, creating educational and conversion-focused creatives, building a custom web funnel designed to guide users from awareness to purchase, and launching a structured product launch campaign supported by performance-driven media buying.",
    fullDescriptionAr: "كمفهوم جديد تماماً في السوق، واجهت تريس تحدي تقديم نظام بخور كبسولات غير مألوف للجمهور. طورنا استراتيجية تسويق وشراء وسائط كاملة تركز على الوضوح والتثقيف والتحويل. شمل ذلك صياغة سرد واضح للعلامة التجارية، وإنشاء تصميمات تعليمية تركز على التحويل، وبناء مسار ويب مخصص مصمم لتوجيه المستخدمين من الوعي إلى الشراء، وإطلاق حملة منظمة لإطلاق المنتج مدعومة بشراء وسائط قائم على الأداء.",
    tags: ["3D Modeling", "Brand Guidelines", "E-commerce", "Social Media", "Reels Production", "Booth Design"],
    tagsAr: ["النمذجة ثلاثية الأبعاد", "إرشادات العلامة التجارية", "التجارة الإلكترونية", "وسائل التواصل", "إنتاج الريلز", "تصميم الأكشاك"],
    results: ["5x ROAS in first 3 months", "Successfully introduced new product concept", "Strong brand positioning achieved"],
    resultsAr: ["عائد 5 أضعاف على الإنفاق الإعلاني في أول 3 أشهر", "نجاح في تقديم مفهوم منتج جديد", "تحقيق مكانة قوية للعلامة التجارية"],
    challenge: "As a completely new concept in the market, Trace faced several key challenges: introducing an unfamiliar product and usage concept to the audience, building brand awareness from zero, educating customers on how the capsule-based incense system works, establishing trust and purchase confidence on a newly launched e-commerce platform, and converting awareness into actual online sales without historical performance data.",
    challengeAr: "كمفهوم جديد تماماً في السوق، واجهت تريس عدة تحديات رئيسية: تقديم منتج ومفهوم استخدام غير مألوف للجمهور، وبناء الوعي بالعلامة التجارية من الصفر، وتثقيف العملاء حول كيفية عمل نظام البخور القائم على الكبسولات، وترسيخ الثقة والاطمئنان للشراء على منصة تجارة إلكترونية جديدة، وتحويل الوعي إلى مبيعات فعلية عبر الإنترنت دون بيانات أداء تاريخية.",
    solution: "We developed a full marketing and media buying strategy focused on clarity, education, and conversion: crafted a clear brand narrative to explain the capsule-based incense concept, created educational and conversion-focused creatives, built a custom web funnel designed to guide users from awareness to purchase, launched a structured product launch campaign supported by performance-driven media buying, and continuously optimized campaigns based on audience behavior and engagement.",
    solutionAr: "طورنا استراتيجية تسويق وشراء وسائط كاملة تركز على الوضوح والتثقيف والتحويل: صياغة سرد واضح للعلامة التجارية لشرح مفهوم البخور القائم على الكبسولات، وإنشاء تصميمات تعليمية تركز على التحويل، وبناء مسار ويب مخصص مصمم لتوجيه المستخدمين من الوعي إلى الشراء، وإطلاق حملة منظمة لإطلاق المنتج مدعومة بشراء وسائط قائم على الأداء، والتحسين المستمر للحملات بناءً على سلوك الجمهور والتفاعل.",
    videos: [
      "https://player.vimeo.com/video/1079412786?h=36a38b8508",
      "https://player.vimeo.com/video/1123508082?h=9d3c67f14a",
      "https://player.vimeo.com/video/1123512234?h=12132ba061",
      "https://player.vimeo.com/video/957641603?h=3be28a967e",
      "https://player.vimeo.com/video/957640085?h=b0bca2ad3c"
    ]
  },
];

export const getProjectById = (id: string): Project | undefined => {
  return projects.find((project) => project.id === id);
};
