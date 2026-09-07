import { supabase } from '../lib/supabase';
import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export const defaultContent = {
  // Navigation
  navLogo: "Codexa",
  navAboutEn: "About Us",
  navAboutAr: "من نحن",
  navServicesEn: "Services",
  navServicesAr: "الخدمات",
  navProcessEn: "How We Work",
  navProcessAr: "طريقة العمل",
  navProjectsEn: "Case Studies",
  navProjectsAr: "أعمالنا والمشاريع",
  navTalkEn: "Start a Project",
  navTalkAr: "ابدأ مشروعك",

  // Hero Section
  heroBadgeEn: "Software House · Business Systems & Web Solutions",
  heroBadgeAr: "شركة حلول برمجية وأنظمة أعمال وتطوير ويب",
  heroTitle1En: "We Build Websites & Systems That",
  heroTitle1Ar: "نبني مواقع وأنظمة",
  heroTitle2En: "Help Your Business Scale & Grow.",
  heroTitle2Ar: "تساعد شركتك على النمو.",
  heroIntroEn: "We develop corporate websites, internal business systems, export trading portals, admin dashboards, and custom Laravel web applications — engineered specifically around your real-world workflow.",
  heroIntroAr: "نطور مواقع الشركات، الأنظمة الداخلية، منصات التصدير، لوحات التحكم، وتطبيقات الويب المخصصة — مصممة بدقة حسب طبيعة واحتياجات عملك اليومية.",
  heroBtnProjectsEn: "Explore Our Work",
  heroBtnProjectsAr: "شاهد أعمالنا",
  heroBtnContactEn: "Start Your Project",
  heroBtnContactAr: "ابدأ مشروعك",

  // About Section
  aboutBadgeEn: "Who We Are",
  aboutBadgeAr: "من نحن",
  aboutTitleEn: "Transforming Daily Business Needs Into High-Performance Digital Solutions.",
  aboutTitleAr: "نساعد الشركات والمصانع على تحويل احتياجاتهم اليومية إلى حلول رقمية عملية.",
  aboutP1En: "At Codexa, we partner with companies, manufacturing factories, export businesses, and enterprises to bridge the gap between complex operations and intuitive digital systems. From corporate identities and multilingual trading portals to order management systems and bespoke web applications.",
  aboutP1Ar: "نحن في Codexa نساعد الشركات والمصانع وأصحاب الأعمال على تحويل احتياجاتهم اليومية إلى حلول رقمية عملية. من المواقع التعريفية والمنصات متعددة اللغات لشركات التصدير، إلى أنظمة إدارة الطلبات ولوحات التحكم وتطبيقات الويب المخصصة.",
  aboutP2En: "Our philosophy is simple: we don't just build visually stunning interfaces; we engineer digital solutions that serve your core business, eliminate manual overhead, save valuable time, and optimize operations.",
  aboutP2Ar: "هدفنا ليس بناء موقع جميل فقط، بل بناء نظام متكامل يخدم عملك الفعلي، يوفر الوقت والجهد، وينظم سير العمليات بدقة وأمان.",
  aboutPill1En: "Custom Development",
  aboutPill1Ar: "تطوير مخصص بالكامل",
  aboutPill2En: "Business-Driven Focus",
  aboutPill2Ar: "حلول موجهة لخدمة العمل",
  aboutPill3En: "Responsive & Scalable Architecture",
  aboutPill3Ar: "بنية آمنة وقابلة للتوسع",

  // Services Header
  servicesBadgeEn: "What We Deliver",
  servicesBadgeAr: "ماذا نقدم",
  servicesTitleEn: "Tailored Web & Software Services Engineered for Real Growth",
  servicesTitleAr: "حلول وخدمات برمجية متخصصة لدفع أعمالك نحو الأمام",
  servicesDescEn: "Strategic digital products designed to digitize operations, expand your market reach, and elevate your brand presence.",
  servicesDescAr: "منتجات رقمية مصممة خصيصاً لأتمتة أعمالك، فتح أسواق جديدة لشركتك، وإبراز هويتك باحترافية.",

  // How We Work Section
  processBadgeEn: "Execution Methodology",
  processBadgeAr: "منهجية التنفيذ",
  processTitleEn: "How We Work — From Concept to Scalable Launch",
  processTitleAr: "طريقة العمل — من الفكرة إلى الإطلاق الناجح",
  processDescEn: "A structured, transparent 6-step engineering workflow ensuring predictability, quality, and business alignment.",
  processDescAr: "خطوات واضحة ومنظمة تضمن تنفيذ مشروعك بأعلى معايير الجودة والأمان والتسليم في الموعد المحدد.",

  // Projects Header
  projectsBadgeEn: "Case Studies & Portfolio",
  projectsBadgeAr: "دراسات حالة وأعمالنا",
  projectsTitleEn: "Selected Business Solutions & Case Studies",
  projectsTitleAr: "نماذج من أعمالنا ودراسات الحالة",
  projectsDescEn: "Explore how we engineered custom solutions for export trading enterprises and business management workflows.",
  projectsDescAr: "تعرف على كيف ساعدنا عملاءنا في بناء منصات تصدير وأنظمة إدارة متكاملة تلبي أهدافهم التجارية.",

  // Skills & Reasons
  techStackTitleEn: "Technology Stack",
  techStackTitleAr: "البنية التكنولوجية",
  reasonsTitleEn: "Why Choose Codexa?",
  reasonsTitleAr: "لماذا تختار Codexa؟",

  // Contact
  contactBadgeEn: "Let's Build Together",
  contactBadgeAr: "لنبدأ العمل معاً",
  contactTitleEn: "Tell Us About Your Project",
  contactTitleAr: "أخبرنا عن مشروعك القادم",
  contactDescEn: "Have an upcoming project or looking to digitize your company's workflow? Request a quote and let's discuss your requirements.",
  contactDescAr: "هل تبحث عن نظام مخصص أو موقع احترافي لشركتك؟ املأ النموذج وسنتواصل معك خلال 24 ساعة لتقديم عرض السعر المناسب.",
  contactEmail: "codexa.software0@gmail.com",
  contactPhone: "+20 1060905305",
  contactWhatsapp: "201060905305",
  contactLocationEn: "Alexandria, Egypt",
  contactLocationAr: "الإسكندرية، مصر",

  // Social Links
  githubUrl: "https://github.com/osamamoha32323",
  linkedinUrl: "#",
  twitterUrl: "#",

  // Footer
  footerTitleEn: "Software House · Business Systems & Web Solutions",
  footerTitleAr: "شركة حلول برمجية · أنظمة أعمال ومواقع إلكترونية"
};

export const defaultServices = [
  {
    id: 1,
    titleEn: "Corporate & Company Websites",
    titleAr: "مواقع الشركات والمؤسسات",
    descEn: "Fast, responsive, and authoritative corporate websites built to reflect your brand identity and convert business leads.",
    descAr: "مواقع احترافية وسريعة الاستجابة تعكس هوية شركتك، تبني المصداقية وتساعدك على الوصول إلى عملاء جدد.",
    icon: "Building2",
    ctaEn: "Start Company Site →",
    ctaAr: "ابدأ موقع شركتك ←"
  },
  {
    id: 2,
    titleEn: "Manufacturing & Factory Portals",
    titleAr: "مواقع ومنصات المصانع",
    descEn: "Tailored digital presence for manufacturing facilities, showcasing production lines, capacity, certifications, and capabilities.",
    descAr: "واجهات رقمية مخصصة للمصانع، لتقديم خطوط الإنتاج والشهادات والقدرات التشغيلية لشركاء الأعمال.",
    icon: "Factory",
    ctaEn: "Build Factory Portal →",
    ctaAr: "ابدأ منصة مصنعك ←"
  },
  {
    id: 3,
    titleEn: "Export & International Trading Websites",
    titleAr: "مواقع وبوابات التصدير الدولية",
    descEn: "Multilingual, globally optimized platforms with comprehensive product catalogs, RFQ forms, and international buyer appeal.",
    descAr: "مواقع متعددة اللغات لشركات التصدير والمنتجات الزراعية والصناعية مع قوائم المنتجات ونماذج طلب عروض الأسعار.",
    icon: "Globe",
    ctaEn: "Launch Export Site →",
    ctaAr: "انطلق للأسواق العالمية ←"
  },
  {
    id: 4,
    titleEn: "Custom Admin Dashboards",
    titleAr: "لوحات التحكم وإدارة البيانات",
    descEn: "Intuitive, secure control panels that give you full operational oversight, real-time analytics, and data management.",
    descAr: "لوحات تحكم قوية وبديهية تمنحك إشرافاً كاملاً على مؤشرات أعمالك، تقارير الأداء، وإدارة البيانات بأمان.",
    icon: "LayoutDashboard",
    ctaEn: "Build Dashboard →",
    ctaAr: "صمم لوحة تحكمك ←"
  },
  {
    id: 5,
    titleEn: "Order Management & Workflow Systems",
    titleAr: "أنظمة إدارة الطلبات وسير العمل",
    descEn: "Custom internal systems to track orders, automate status updates, dispatching, and eliminate workflow bottlenecks.",
    descAr: "أنظمة مخصصة لتتبع دورة الطلبات، إدارة الحالات التشغيلية، وأتمتة العمليات اليومية لزيادة الإنتاجية.",
    icon: "ShoppingCart",
    ctaEn: "Automate Workflow →",
    ctaAr: "أتمت سير العمل ←"
  },
  {
    id: 6,
    titleEn: "Custom Laravel Web Applications",
    titleAr: "تطبيقات الويب المخصصة لـ Laravel",
    descEn: "Secure, scalable backend web applications designed from scratch to solve your specific, complex business logic.",
    descAr: "حلول خلفية قوية وقابلة للتوسع مبنية من الصفر لتناسب المنطق البرمجي الخاص بطبيعة عملك.",
    icon: "Code2",
    ctaEn: "Build Custom App →",
    ctaAr: "ابنِ تطبيقك المخصص ←"
  }
];

export const defaultWorkflow = [
  {
    step: "01",
    titleEn: "Discovery & Analysis",
    titleAr: "الاستكشاف والتحليل",
    descEn: "We deeply understand your business model, operational challenges, and exact technical requirements before writing a single line of code.",
    descAr: "نبدأ بفهم فكرة المشروع ونموذج العمل والمشاكل التي ترغب في حلها وتحديد المتطلبات بدقة قبل أي كود."
  },
  {
    step: "02",
    titleEn: "Architecture & Planning",
    titleAr: "التخطيط وهندسة النظام",
    descEn: "We architect the database schema, define user roles, plan feature roadmaps, and select the optimal technical stack.",
    descAr: "نحدد البنية المعمارية، قواعد البيانات، الصلاحيات، وخطة العمل المناسبة لتحقيق أفضل أداء."
  },
  {
    step: "03",
    titleEn: "UI/UX Design",
    titleAr: "تصميم واجهات وتجربة المستخدم",
    descEn: "We craft modern, user-friendly, responsive layouts tailored for your target audience on both mobile and desktop.",
    descAr: "نصمم واجهات عصرية ومتجاوبة وسهلة الاستخدام تخدم تجربة العميل على الهاتف والكمبيوتر."
  },
  {
    step: "04",
    titleEn: "Full-Stack Development",
    titleAr: "البرمجة والتطوير الفعلي",
    descEn: "We write clean, secure, and maintainable code adhering to industry standards and modern software engineering practices.",
    descAr: "نبدأ بناء النظام وكتابة كود نظيف ومحمي وقابل للتوسع باستخدام أحدث معايير الأمان والتطوير."
  },
  {
    step: "05",
    titleEn: "Testing & Quality Assurance",
    titleAr: "الاختبار وضمان الجودة",
    descEn: "Rigorous testing of workflows, device responsiveness, performance speed, data security, and edge-case scenarios.",
    descAr: "نختبر الأداء وسرعة التحميل، تجاوب الشاشات، واختبارات الأمان لضمان عمل كل وظيفة بكفاءة."
  },
  {
    step: "06",
    titleEn: "Deployment & Growth",
    titleAr: "الإطلاق والدعم المستمر",
    descEn: "We deploy the system to production servers, provide staff training, and offer continuous support and feature extensions.",
    descAr: "نطلق المشروع ونسلمه لك جاهزاً للعمل، مع تدريب فريقك وتقديم الدعم والتطوير المستمر."
  }
];

export const defaultProjects = [
  {
    id: 1,
    titleEn: "Ryan Trading — Export & Trading Portal",
    titleAr: "ريان تريدنج — منصة وبوابة التصدير الدولية",
    subtitleEn: "International Agriculture & Fresh Produce Export Portal",
    subtitleAr: "موقع وبوابة تصدير الحاصلات الزراعية والمنتجات الطازجة عالمياً",
    challengeEn: "An international export company needed a globally optimized, multilingual digital platform to present their premium agricultural crops, build buyer confidence across overseas markets, and streamline B2B inquiries.",
    challengeAr: "شركة تعمل في تصدير المنتجات الطازجة والزراعية تحتاج إلى منصة احترافية لعرض منتجاتها بجودة عالية، كسب ثقة المستوردين في الأسواق الدولية وتسهيل استقبال طلبات التصدير.",
    solutionEn: "We engineered a lightning-fast multilingual website with structured product catalogs, high-resolution media galleries, and direct international inquiry channels.",
    solutionAr: "قمنا ببناء موقع متعدد اللغات بتجربة مستخدم عالمية يعرض كتالوج المنتجات والمواصفات ونماذج مخصصة لطلبات الاستيراد والشحنات.",
    tech: "Laravel, Blade, Multi-language, Bootstrap, MySQL",
    resultEn: "An authoritative global presence ready to receive overseas trade leads and establish credible exporter credentials.",
    resultAr: "موقع احترافي جاهز للتواصل مع العملاء الدوليين وعرض المنتجات وجذب عقود تصدير جديدة.",
    image: "/projects/export.png",
    url: "https://www.ryan-trading.com/home"
  },
  {
    id: 2,
    titleEn: "The Accounts — Pro ERP & Financial System",
    titleAr: "نظام المحاسبة المتكامل — The Accounts",
    subtitleEn: "Full-Featured Accounting & Inventory Management",
    subtitleAr: "نظام محاسبي وسحابي لإدارة الفواتير والمخازن والعملاء",
    challengeEn: "Medium businesses struggled with disjointed Excel sheets, unrecorded ledger transactions, and a lack of real-time visibility over inventory turnover and cash flows.",
    challengeAr: "الحاجة إلى نظام إداري ومالي موثوق يلغي العشوائية في الحسابات اليومية وينظم حركة المخزون والفواتير والعملاء في مكان واحد.",
    solutionEn: "Developed a comprehensive business accounting system featuring analytical dashboards, ledger automation, stock tracking, and granular financial reporting.",
    solutionAr: "تطوير نظام محاسبي متكامل يضم لوحة تحكم ذكية، إدارة المبيعات والمشتريات، متابعة الحركات النقدية وتقارير الأرباح والخسائر بدقة.",
    tech: "Laravel, React, InertiaJS, MySQL, Tailwind",
    resultEn: "Streamlined daily operations, error-free financial accounting, and instant insight into profitability metrics.",
    resultAr: "تنظيم كامل للعمليات الحسابية والمالية مع تقليل الأخطاء البشرية وتوفير ساعات العمل اليومية.",
    image: "/projects/accounting.png",
    url: "#"
  }
];

export const defaultTechCategories = [
  {
    categoryEn: "Backend Architecture",
    categoryAr: "تطوير الأنظمة الخلفية (Backend)",
    items: ["Laravel", "PHP", "MySQL", "RESTful APIs", "Database Optimization"]
  },
  {
    categoryEn: "Frontend & UI Systems",
    categoryAr: "واجهات وتجربة المستخدم (Frontend)",
    items: ["React.js", "JavaScript (ES6+)", "Tailwind CSS", "Bootstrap", "HTML5 / CSS3"]
  },
  {
    categoryEn: "Development & Engineering",
    categoryAr: "أدوات الهندسة والعمليات",
    items: ["Git / GitHub", "Vite", "Blade Engine", "Responsive Design", "InertiaJS"]
  },
  {
    categoryEn: "Security & Reliability",
    categoryAr: "الأمان وحماية البيانات",
    items: ["Secure Auth & RBAC", "Data Encryption", "CSRF / SQLi Protection", "Performance Caching"]
  }
];

export const defaultReasons = [
  {
    id: 1,
    num: "01",
    titleEn: "We Understand Your Business First",
    titleAr: "نفهم عملك أولاً",
    en: "We dive deep into your workflow and operational challenges before writing a single line of code.",
    ar: "نبدأ بفهم طبيعة نشاطك التجاري والتحديات اليومية قبل كتابة أي كود برمجي لضمان حل المشكلة الحقيقية."
  },
  {
    id: 2,
    num: "02",
    titleEn: "Tailored, Never Generic",
    titleAr: "حلول مخصصة بالكامل",
    en: "No rigid templates or forced pre-made systems; every solution is built around your specific workflow.",
    ar: "لا نفرض عليك قوالب جاهزة أو أنظمة مقيدة؛ نبني الحل ليناسب دورة العمل الخاصة بك بالضبط."
  },
  {
    id: 3,
    num: "03",
    titleEn: "Modern & Professional UI/UX",
    titleAr: "تصميم واجهات احترافي وسريع",
    en: "Sleek, responsive, and intuitive interfaces optimized for smooth operation on phones and desktops.",
    ar: "واجهات مستخدم حديثة وسريعة الاستجابة تعمل بسلاسة فائقة على أجهزة الهاتف والكمبيوتر."
  },
  {
    id: 4,
    num: "04",
    titleEn: "Engineered for Scalability",
    titleAr: "قابلية التوسع والنمو المستقبلي",
    en: "Clean database architecture and modular code that grows alongside your expanding business.",
    ar: "نبني الأنظمة بهندسة نظيفة تسمح بتطويرها وإضافة ميزات جديدة مع توسع شركتك دون الحاجة لإعادة البناء."
  },
  {
    id: 5,
    num: "05",
    titleEn: "Enterprise-Grade Security",
    titleAr: "أمان وحماية عالية للبيانات",
    en: "Robust protection for accounts, sensitive transactions, and company records following strict security standards.",
    ar: "أولوية قصوى لحماية الحسابات، البيانات المالية، وسجلات العملاء الحساسة من أي اختراق."
  },
  {
    id: 6,
    num: "06",
    titleEn: "Continuous Support & Maintenance",
    titleAr: "دعم فني وتطوير مستمر",
    en: "We stay by your side after launch with system updates, performance tuning, and technical guidance.",
    ar: "نظل بجانبك بعد إطلاق المشروع لتقديم الصيانة والتدريب والدعم الفني السريع متى احتجت."
  }
];

export const AppProvider = ({ children }) => {
  const [content, setContent] = useState(() => {
    const saved = localStorage.getItem('codexa_content_v4');
    return saved ? { ...defaultContent, ...JSON.parse(saved) } : defaultContent;
  });

  const [services, setServices] = useState(() => {
    const saved = localStorage.getItem('codexa_services_v2');
    return saved ? JSON.parse(saved) : defaultServices;
  });

  const [workflow, setWorkflow] = useState(() => {
    const saved = localStorage.getItem('codexa_workflow_v2');
    return saved ? JSON.parse(saved) : defaultWorkflow;
  });

  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('codexa_projects_v3');
    return saved ? JSON.parse(saved) : defaultProjects;
  });

  const [techCategories, setTechCategories] = useState(() => {
    const saved = localStorage.getItem('codexa_tech_v2');
    return saved ? JSON.parse(saved) : defaultTechCategories;
  });

  const [reasons, setReasons] = useState(() => {
    const saved = localStorage.getItem('codexa_reasons_v2');
    return saved ? JSON.parse(saved) : defaultReasons;
  });

  const [quoteRequests, setQuoteRequests] = useState(() => {
    const saved = localStorage.getItem('codexa_quote_requests');
    return saved ? JSON.parse(saved) : [];
  });

  const fetchGlobalProposals = async () => {
    try {
      const { data, error } = await supabase
        .from('proposals')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data) {
        const formatted = data.map(item => ({
          id: item.id,
          name: item.name,
          company: item.company,
          phone: item.phone,
          email: item.email,
          service: item.service || item.project_type || 'Company Website', projectType: item.project_type || item.service || 'Company Website', details: item.details || item.notes || '',
          budget: item.budget,
          currencyUsed: item.currency_used,
          liveExchangeRate: item.exchange_rate,
          notes: item.notes,
          date: item.date || new Date(item.created_at).toLocaleDateString('ar-EG'),
          created_at: item.created_at
        }));
        setQuoteRequests(formatted);
        localStorage.setItem('codexa_quote_requests', JSON.stringify(formatted));
      }
    } catch (err) {
      console.error('Error fetching global proposals:', err);
    }
  };

  useEffect(() => {
    fetchGlobalProposals();
    const channel = supabase
      .channel('public:proposals')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'proposals' }, () => {
        fetchGlobalProposals();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  

  // USD to EGP Exchange Rate (Default: 49, with live auto-sync)
  const [usdToEgpRate, setUsdToEgpRate] = useState(() => {
    const savedRate = localStorage.getItem('codexa_usd_egp_rate');
    return savedRate ? parseFloat(savedRate) : 49.0;
  });

  // Fetch live exchange rate from open API with fallback
  useEffect(() => {
    const fetchLiveRate = async () => {
      try {
        const res = await fetch('https://open.er-api.com/v6/latest/USD');
        if (res.ok) {
          const data = await res.json();
          if (data && data.rates && data.rates.EGP) {
            const liveRate = parseFloat(data.rates.EGP.toFixed(2));
            setUsdToEgpRate(liveRate);
            localStorage.setItem('codexa_usd_egp_rate', liveRate.toString());
          }
        }
      } catch (err) {
        console.log('Using stored/default USD to EGP exchange rate:', usdToEgpRate);
      }
    };
    fetchLiveRate();
  }, []);

      // Global Live Visitor Counter (Shared across all devices via CountAPI/API Counter)
  const [visitorCount, setVisitorCount] = useState(() => {
    const saved = localStorage.getItem('codexa_global_visits');
    return saved ? parseInt(saved, 10) : 52;
  });

  const fetchGlobalVisitorsOnly = async () => {
    try {
      const { data, error } = await supabase
        .from('analytics')
        .select('total_visitors')
        .eq('id', 'site_stats')
        .single();
      if (!error && data && data.total_visitors) {
        const val = Number(data.total_visitors);
        setVisitorCount(val);
        localStorage.setItem('codexa_global_visits', val.toString());
      }
    } catch (e) {
      console.error('Error fetching global visitors:', e);
    }
  };

  const fetchAndIncrementGlobalVisitors = async () => {
    try {
      // Increment global visitors directly\n      const sessionLogged = null;
      if (sessionLogged) {
        fetchGlobalVisitorsOnly();
        return;
      }
      sessionStorage.setItem('codexa_visited_session', 'true');

      const { data: currentStats } = await supabase
        .from('analytics')
        .select('total_visitors')
        .eq('id', 'site_stats')
        .single();

      const currentVal = currentStats ? Number(currentStats.total_visitors) : 56;
      const nextVal = currentVal + 1;

      const { error } = await supabase
        .from('analytics')
        .update({ total_visitors: nextVal, updated_at: new Date().toISOString() })
        .eq('id', 'site_stats');

      if (!error) {
        setVisitorCount(nextVal);
        localStorage.setItem('codexa_global_visits', nextVal.toString());
      } else {
        setVisitorCount(nextVal);
      }
    } catch (e) {
      console.error('Error incrementing visitor count:', e);
      setVisitorCount(prev => prev + 1);
    }
  };

  const [lang, setLang] = useState('ar');

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem('codexa_content_v4', JSON.stringify(content));
  }, [content]);

  useEffect(() => {
    localStorage.setItem('codexa_services_v2', JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem('codexa_workflow_v2', JSON.stringify(workflow));
  }, [workflow]);

  useEffect(() => {
    localStorage.setItem('codexa_projects_v3', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('codexa_tech_v2', JSON.stringify(techCategories));
  }, [techCategories]);

  useEffect(() => {
    localStorage.setItem('codexa_reasons_v2', JSON.stringify(reasons));
  }, [reasons]);

  useEffect(() => {
    localStorage.setItem('codexa_quote_requests', JSON.stringify(quoteRequests));
  }, [quoteRequests]);

  const updateContentField = (key, value) => {
    setContent(prev => ({ ...prev, [key]: value }));
  };

  const updateAllContent = (newContent) => {
    setContent(newContent);
  };

  const addQuoteRequest = async (req) => {
    const proposalDate = new Date().toLocaleDateString('ar-EG');
    const localId = Date.now();
    const optimisticReq = {
      ...req,
      id: localId,
      date: proposalDate
    };
    
    setQuoteRequests(prev => [optimisticReq, ...prev]);

    try {
      const { data, error } = await supabase
        .from('proposals')
        .insert([{
          name: req.name || '',
          company: req.company || '',
          phone: req.phone || '',
          email: req.email || '',
          service: req.service || req.projectType || '', project_type: req.projectType || req.service || '', details: req.details || req.notes || '',
          budget: req.budget || '',
          currency_used: req.currencyUsed || 'USD',
          exchange_rate: req.liveExchangeRate || '',
          notes: req.notes || '',
          date: proposalDate
        }])
        .select();

      if (!error && data && data.length > 0) {
        const savedItem = data[0];
        setQuoteRequests(prev => prev.map(p => p.id === localId ? { ...p, id: savedItem.id } : p));
      }
    } catch (err) {
      console.error('Error saving proposal to Supabase:', err);
    }
    return true;
  };

  const deleteQuoteRequest = async (id) => {
    setQuoteRequests(prev => prev.filter(req => req.id !== id));
    try {
      await supabase.from('proposals').delete().eq('id', id);
    } catch (err) {
      console.error('Error deleting proposal from Supabase:', err);
    }
  };

  

  const resetToDefaults = () => {
    setContent(defaultContent);
    setServices(defaultServices);
    setWorkflow(defaultWorkflow);
    setProjects(defaultProjects);
    setTechCategories(defaultTechCategories);
    setReasons(defaultReasons);
    localStorage.removeItem('codexa_content_v4');
    localStorage.removeItem('codexa_services_v2');
    localStorage.removeItem('codexa_workflow_v2');
    localStorage.removeItem('codexa_projects_v3');
    localStorage.removeItem('codexa_tech_v2');
    localStorage.removeItem('codexa_reasons_v2');
  };

  return (
    <AppContext.Provider value={{
      content,
      setContent,
      updateContentField,
      updateAllContent,
      services,
      setServices,
      workflow,
      setWorkflow,
      projects,
      setProjects,
      techCategories,
      setTechCategories,
      reasons,
      setReasons,
      quoteRequests,
      setQuoteRequests,
      addQuoteRequest,
      deleteQuoteRequest,
      fetchGlobalProposals,
      usdToEgpRate,
      setUsdToEgpRate,
      resetToDefaults,
      lang,
      setLang,
      visitorCount,
      fetchAndIncrementGlobalVisitors, fetchGlobalVisitorsOnly
    }}>
      {children}
    </AppContext.Provider>
  );
};