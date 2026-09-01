import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export const defaultContent = {
  // Navigation
  navLogo: "Codexa",
  navAboutEn: "About Us",
  navAboutAr: "من نحن",
  navServicesEn: "Services",
  navServicesAr: "الخدمات",
  navProjectsEn: "Projects",
  navProjectsAr: "المشاريع",
  navTalkEn: "Contact Us",
  navTalkAr: "تواصل معنا",

  // Hero
  heroBadgeEn: "Software House & Business Systems",
  heroBadgeAr: "شركة حلول برمجية وأنظمة أعمال",
  heroTitle1En: "Hi, We are Codexa.",
  heroTitle1Ar: "مرحباً، نحن Codexa.",
  heroTitle2En: "We build digital solutions.",
  heroTitle2Ar: "نبني حلولاً رقمية.",
  heroIntroEn: "We build professional websites and custom business systems for companies, factories, and export businesses.",
  heroIntroAr: "نقوم ببناء مواقع احترافية وأنظمة أعمال مخصصة للشركات والمصانع وشركات التصدير.",
  heroBtnProjectsEn: "View Our Projects",
  heroBtnProjectsAr: "شاهد مشاريعنا",
  heroBtnContactEn: "Contact Us",
  heroBtnContactAr: "تواصل معنا",

  // About
  aboutTitleEn: "About Us",
  aboutTitleAr: "من نحن",
  aboutP1En: "We are a software development agency focused on building real solutions for businesses. We specialize in creating powerful company websites, factory systems, export business portals, admin dashboards, and robust custom web applications.",
  aboutP1Ar: "نحن شركة تطوير برمجيات نركز على بناء حلول حقيقية للشركات. نتخصص في إنشاء مواقع الشركات، أنظمة المصانع، بوابات التصدير، لوحات التحكم، وتطبيقات الويب المخصصة.",
  aboutP2En: "With expertise in Laravel, PHP, MySQL, formatting with HTML/CSS, and interactivity through JavaScript and Bootstrap, our focus is not just on aesthetics, but on engineering systems that drive actual business value.",
  aboutP2Ar: "مع خبرتنا في Laravel, PHP, MySQL بالإضافة إلى الواجهات (HTML/CSS/JS/Bootstrap)، لا ينصب تركيزنا فقط على المظهر الجمالي، بل على هندسة أنظمة تدفع بعجلة الأعمال للأمام وتوفر حلولاً عملية.",
  aboutStat1En: "Business Focused",
  aboutStat1Ar: "أعمال موجهة",
  aboutStat2En: "Reliable Systems",
  aboutStat2Ar: "أنظمة موثوقة",

  // Services Header
  servicesTitleEn: "Services",
  servicesTitleAr: "الخدمات",
  servicesDescEn: "Specialized web development solutions designed to elevate your company's digital infrastructure.",
  servicesDescAr: "حلول برمجية متخصصة مصممة للارتقاء بالبنية التحتية الرقمية لشركتك.",

  // Projects Header
  projectsTitleEn: "Projects",
  projectsTitleAr: "المشاريع",
  projectsDescEn: "A selection of recent development work, ranging from business portals to complex management systems.",
  projectsDescAr: "مجموعة مختارة من أعمال التطوير الحديثة، تتراوح من بوابات الأعمال إلى أنظمة الإدارة المعقدة.",

  // Skills & Reasons
  skillsTitleEn: "Technical Arsenal",
  skillsTitleAr: "المهارات التقنية",
  reasonsTitleEn: "Why Choose Us?",
  reasonsTitleAr: "لماذا تختارنا؟",

  // Contact
  contactTitleEn: "Contact Us",
  contactTitleAr: "تواصل معنا",
  contactDescEn: "Looking for a tailored web solution for your company? Let's discuss your project.",
  contactDescAr: "هل تبحث عن حل برمجي مخصص لشركتك؟ دعنا نناقش مشروعك.",
  contactEmail: "osama.mohamedr3d33@gmail.com",
  contactPhone: "+20 1556701167",
  contactWhatsapp: "201556701167",
  contactLocationEn: "Alexandria, Egypt",
  contactLocationAr: "الإسكندرية، مصر",

  // Social Links
  githubUrl: "https://github.com/osamamoha32323",
  linkedinUrl: "#",
  twitterUrl: "#",

  // Footer
  footerTitleEn: "Software House | Business Systems & Web Solutions",
  footerTitleAr: "شركة حلول برمجية | أنظمة أعمال ومواقع إلكترونية"
};

export const defaultServices = [
  {
    id: 1,
    titleEn: "Company Websites",
    titleAr: "مواقع الشركات",
    descEn: "Professional, responsive websites built to represent your company's brand and attract clients.",
    descAr: "مواقع احترافية وسريعة الاستجابة مصممة لتمثيل علامتك التجارية وجذب العملاء.",
    icon: "Building2"
  },
  {
    id: 2,
    titleEn: "Factory Websites",
    titleAr: "مواقع المصانع",
    descEn: "Digital presence tailored for factories, showcasing facilities, production lines, and achievements.",
    descAr: "واجهة رقمية مخصصة للمصانع، لتقديم المنشآت وخطوط الإنتاج والإنجازات.",
    icon: "Factory"
  },
  {
    id: 3,
    titleEn: "Export Business Websites",
    titleAr: "بوابات ومواقع التصدير",
    descEn: "Multilingual, globally appealing sites for export businesses with product catalogs and order forms.",
    descAr: "مواقع جذابة عالمياً ومتعددة اللغات لشركات التصدير مع قوائم المنتجات ونماذج الطلبات.",
    icon: "Globe"
  },
  {
    id: 4,
    titleEn: "Admin Dashboards",
    titleAr: "لوحات التحكم",
    descEn: "Powerful, secure, and intuitive admin panels to monitor and manage your business metrics.",
    descAr: "لوحات تحكم قوية وآمنة وبديهية لمراقبة وإدارة جميع مؤشرات أعمالك.",
    icon: "LayoutDashboard"
  },
  {
    id: 5,
    titleEn: "Order Management Systems",
    titleAr: "أنظمة إدارة الطلبات",
    descEn: "Custom systems to track orders, manage statuses, and streamline your entire business workflow.",
    descAr: "أنظمة مخصصة لتتبع الطلبات، وإدارة الحالات، وتبسيط سير العمل بالكامل.",
    icon: "ShoppingCart"
  },
  {
    id: 6,
    titleEn: "Custom Laravel Web Apps",
    titleAr: "تطبيقات الويب المخصصة لـ Laravel",
    descEn: "Robust, scalable, and secure backend solutions engineered to handle complex business requirements.",
    descAr: "حلول خلفية قوية وقابلة للتوسع وآمنة مصممة للتعامل مع متطلبات العمل المعقدة.",
    icon: "Code2"
  }
];

export const defaultProjects = [
  {
    id: 1,
    titleEn: "The Accounts - Pro System",
    titleAr: "برنامج المحاسبة - النظام المتكامل",
    descriptionEn: "A comprehensive accounting and business management system. Features dashboard analytics, customer/product management, and financial tracking.",
    descriptionAr: "نظام محاسبة وإدارة أعمال متكامل. يتميز بلوحة تحكم تحليلية، إدارة العملاء والمنتجات، وتتبع الحركات المالية اليومية.",
    tech: "Laravel, React, InertiaJS, MySQL",
    image: "/projects/accounting.png",
    url: "#"
  },
  {
    id: 2,
    titleEn: "Ryan Trading",
    titleAr: "ريان تريدنج",
    descriptionEn: "A high-end multi-language website for an international export company, showcasing fresh produce and facilitating global trade.",
    descriptionAr: "موقع إلكتروني متعدد اللغات رفيع المستوى لشركة تصدير دولية، يعرض المنتجات الطازجة ويسهل عمليات التجارة العالمية.",
    tech: "Laravel, Blade, Multi-language, Bootstrap",
    image: "/projects/export.png",
    url: "https://www.edku-overseas.com/"
  }
];

export const defaultSkills = [
  "Laravel", "PHP", "MySQL", "HTML", "CSS", "JavaScript",
  "Bootstrap", "Blade", "Git", "Responsive Design", "Cyber Security"
];

export const defaultReasons = [
  {
    id: 1,
    en: "Business-focused solutions designed for real-world operations.",
    ar: "حلول تركز على الأعمال ومصممة للعمليات الواقعية."
  },
  {
    id: 2,
    en: "Clean, premium, and highly professional user interfaces.",
    ar: "واجهات مستخدم نظيفة واحترافية وعالية الجودة."
  },
  {
    id: 3,
    en: "Custom systems built entirely around your specific client needs.",
    ar: "أنظمة مخصصة مبنية بالكامل لتناسب متطلبات العمل."
  },
  {
    id: 4,
    en: "Strong backend and database architecture for scalable apps.",
    ar: "بنية تحتية قوية لقواعد البيانات لبناء تطبيقات قابلة للتوسع."
  }
];

export const AppProvider = ({ children }) => {
  const [content, setContent] = useState(() => {
    const saved = localStorage.getItem('codexa_content');
    return saved ? { ...defaultContent, ...JSON.parse(saved) } : defaultContent;
  });

  const [services, setServices] = useState(() => {
    const saved = localStorage.getItem('codexa_services');
    return saved ? JSON.parse(saved) : defaultServices;
  });

  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('codexa_projects');
    return saved ? JSON.parse(saved) : defaultProjects;
  });

  const [skills, setSkills] = useState(() => {
    const saved = localStorage.getItem('codexa_skills');
    return saved ? JSON.parse(saved) : defaultSkills;
  });

  const [reasons, setReasons] = useState(() => {
    const saved = localStorage.getItem('codexa_reasons');
    return saved ? JSON.parse(saved) : defaultReasons;
  });

  const [lang, setLang] = useState('en');

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem('codexa_content', JSON.stringify(content));
  }, [content]);

  useEffect(() => {
    localStorage.setItem('codexa_services', JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem('codexa_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('codexa_skills', JSON.stringify(skills));
  }, [skills]);

  useEffect(() => {
    localStorage.setItem('codexa_reasons', JSON.stringify(reasons));
  }, [reasons]);

  const updateContentField = (key, value) => {
    setContent(prev => ({ ...prev, [key]: value }));
  };

  const updateAllContent = (newContent) => {
    setContent(newContent);
  };

  const resetToDefaults = () => {
    setContent(defaultContent);
    setServices(defaultServices);
    setProjects(defaultProjects);
    setSkills(defaultSkills);
    setReasons(defaultReasons);
    localStorage.removeItem('codexa_content');
    localStorage.removeItem('codexa_services');
    localStorage.removeItem('codexa_projects');
    localStorage.removeItem('codexa_skills');
    localStorage.removeItem('codexa_reasons');
  };

  const addMessage = (message) => {
    console.log("Contact form submission (Mock):", message);
  };

  return (
    <AppContext.Provider value={{
      content,
      setContent,
      updateContentField,
      updateAllContent,
      services,
      setServices,
      projects,
      setProjects,
      skills,
      setSkills,
      reasons,
      setReasons,
      resetToDefaults,
      lang,
      setLang,
      addMessage
    }}>
      {children}
    </AppContext.Provider>
  );
};


