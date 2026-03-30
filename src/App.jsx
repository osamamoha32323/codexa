import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, Factory, Globe, LayoutDashboard, ShoppingCart, Code2, 
  Mail, PhoneCall, MapPin, CheckCircle2, ArrowRight, ArrowLeft, ExternalLink, 
  Github, Linkedin, Twitter, Languages
} from 'lucide-react';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function App() {
  const [lang, setLang] = useState('en');

  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  const toggleLanguage = () => {
    setLang(prev => prev === 'en' ? 'ar' : 'en');
  };

  const isRtl = lang === 'ar';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const t = {
    // Navigation
    navLogo: "Osama",
    navAbout: isRtl ? "من أنا" : "About",
    navServices: isRtl ? "الخدمات" : "Services",
    navProjects: isRtl ? "المشاريع" : "Projects",
    navTalk: isRtl ? "تواصل معي" : "Let's Talk",

    // Hero
    heroBadge: isRtl ? "مطور لارافل وأنظمة أعمال" : "Laravel & Business Systems Developer",
    heroTitle1: isRtl ? "مرحباً، أنا أسامة." : "Hi, I'm Osama.",
    heroTitle2: isRtl ? "أبني حلولاً رقمية." : "I build digital solutions.",
    heroIntro: isRtl 
      ? "أقوم ببناء مواقع احترافية وأنظمة أعمال مخصصة للشركات والمصانع وشركات التصدير." 
      : "I build professional websites and custom business systems for companies, factories, and export businesses.",
    heroBtnProjects: isRtl ? "شاهد مشاريعي" : "View My Projects",
    heroBtnContact: isRtl ? "تواصل معي" : "Contact Me",

    // About
    aboutTitle: isRtl ? "من أنا" : "About Me",
    aboutP1: isRtl ? (
      <>
        أنا مطور ويب أركز على بناء <strong className="text-slate-900 font-semibold">حلول حقيقية للشركات</strong>. أتخصص في إنشاء مواقع الشركات، أنظمة المصانع، بوابات التصدير، لوحات التحكم، وتطبيقات الويب المخصصة.
      </>
    ) : (
      <>
        I am a web developer focused on building <strong className="text-slate-900 font-semibold">real solutions for businesses</strong>. I specialize in creating powerful company websites, factory systems, export business portals, admin dashboards, and robust custom web applications.
      </>
    ),
    aboutP2: isRtl 
      ? "مع خبرتي في Laravel, PHP, MySQL بالإضافة إلى الواجهات (HTML/CSS/JS/Bootstrap)، لا ينصب تركيزي فقط على المظهر الجمالي، بل على هندسة أنظمة تدفع بعجلة الأعمال للأمام وتوفر حلولاً عملية." 
      : "With expertise in Laravel, PHP, MySQL, formatting with HTML/CSS, and interactivity through JavaScript and Bootstrap, my focus is not just on aesthetics, but on engineering systems that drive actual business value.",
    aboutStat1: isRtl ? "أعمال موجهة" : "Business Focused",
    aboutStat2: isRtl ? "أنظمة موثوقة" : "Reliable Systems",

    // Services
    servicesTitle: isRtl ? "الخدمات" : "Services",
    servicesDesc: isRtl 
      ? "حلول برمجية متخصصة مصممة للارتقاء بالبنية التحتية الرقمية لشركتك." 
      : "Specialized web development solutions designed to elevate your company's digital infrastructure.",
    
    // Projects
    projectsTitle: isRtl ? "المشاريع" : "Projects",
    projectsDesc: isRtl 
      ? "مجموعة مختارة من أعمال التطوير الحديثة، تتراوح من بوابات الأعمال إلى أنظمة الإدارة المعقدة." 
      : "A selection of recent development work, ranging from business portals to complex management systems.",
    projectsViewAll: isRtl ? "عرض كل المشاريع" : "View all projects",
    projectsViewDetails: isRtl ? "عرض التفاصيل" : "View Details",

    // Skills & Reasons
    skillsTitle: isRtl ? "المهارات التقنية" : "Technical Arsenal",
    reasonsTitle: isRtl ? "لماذا تختارني؟" : "Why Choose Me?",
    
    // Contact
    contactTitle: isRtl ? "تواصل معي" : "Get in Touch",
    contactDesc: isRtl 
      ? "هل تبحث عن حل برمجي مخصص لشركتك؟ دعنا نناقش مشروعك." 
      : "Looking for a tailored web solution for your company? Let's discuss your project.",
    contactEmailLabel: isRtl ? "البريد الإلكتروني" : "Email",
    contactPhoneLabel: isRtl ? "واتساب" : "WhatsApp",
    contactLocationLabel: isRtl ? "الموقع" : "Location",
    contactLocationValue: isRtl ? "مصر" : "Egypt",
    contactFormNameLabel: isRtl ? "الاسم" : "Name",
    contactFormNamePH: isRtl ? "أحمد محمد" : "John Doe",
    contactFormEmailLabel: isRtl ? "البريد الإلكتروني" : "Email",
    contactFormEmailPH: isRtl ? "ahmed@example.com" : "john@example.com",
    contactFormMsgLabel: isRtl ? "الرسالة" : "Message",
    contactFormMsgPH: isRtl ? "أخبرني عن مشروعك..." : "Tell me about your project...",
    contactFormBtn: isRtl ? "إرسال الرسالة" : "Send Message",

    // Footer
    footerTitle: isRtl ? "مطور ويب | أنظمة أعمال" : "Web Developer | Business Systems",
    footerCopyright: isRtl ? `© ${new Date().getFullYear()} أسامة. جميع الحقوق محفوظة.` : `© ${new Date().getFullYear()} Osama. All rights reserved.`,
    footerBuiltWith: isRtl ? "تم البناء باستخدام React و Tailwind" : "Built with React & Tailwind",
  };

  const servicesList = [
    { 
      title: isRtl ? "مواقع الشركات" : "Company Websites", 
      desc: isRtl ? "مواقع احترافية وسريعة الاستجابة مصممة لتمثيل علامتك التجارية وجذب العملاء." : "Professional, responsive websites built to represent your company's brand and attract clients.", 
      icon: <Building2 className="w-8 h-8 text-blue-500" /> 
    },
    { 
      title: isRtl ? "مواقع المصانع" : "Factory Websites", 
      desc: isRtl ? "واجهة رقمية مخصصة للمصانع، لتقديم المنشآت وخطوط الإنتاج والإنجازات." : "Digital presence tailored for factories, showcasing facilities, production lines, and achievements.", 
      icon: <Factory className="w-8 h-8 text-blue-500" /> 
    },
    { 
      title: isRtl ? "بوابات ومواقع التصدير" : "Export Business Websites", 
      desc: isRtl ? "مواقع جذابة عالمياً ومتعددة اللغات لشركات التصدير مع قوائم المنتجات ونماذج الطلبات." : "Multilingual, globally appealing sites for export businesses with product catalogs and order forms.", 
      icon: <Globe className="w-8 h-8 text-blue-500" /> 
    },
    { 
      title: isRtl ? "لوحات التحكم" : "Admin Dashboards", 
      desc: isRtl ? "لوحات تحكم قوية وآمنة وبديهية لمراقبة وإدارة جميع مؤشرات أعمالك." : "Powerful, secure, and intuitive admin panels to monitor and manage your business metrics.", 
      icon: <LayoutDashboard className="w-8 h-8 text-blue-500" /> 
    },
    { 
      title: isRtl ? "أنظمة إدارة الطلبات" : "Order Management Systems", 
      desc: isRtl ? "أنظمة مخصصة لتتبع الطلبات، وإدارة الحالات، وتبسيط سير العمل بالكامل." : "Custom systems to track orders, manage statuses, and streamline your entire business workflow.", 
      icon: <ShoppingCart className="w-8 h-8 text-blue-500" /> 
    },
    { 
      title: isRtl ? "تطبيقات الويب المخصصة لـ Laravel" : "Custom Laravel Web Apps", 
      desc: isRtl ? "حلول خلفية قوية وقابلة للتوسع وآمنة مصممة للتعامل مع متطلبات العمل المعقدة." : "Robust, scalable, and secure backend solutions engineered to handle complex business requirements.", 
      icon: <Code2 className="w-8 h-8 text-blue-500" /> 
    },
  ];

  const projectsList = [
    {
      title: isRtl ? "موقع شركة تصدير" : "Export Company Website",
      description: isRtl ? "موقع احترافي لشركة تصدير فواكه وخضروات يحتوي على صفحات المنتجات ومعلومات الشركة ونماذج طلب الشراء." : "A professional website for a fruit and vegetable export company with product pages, company information, and request order forms.",
      tech: ["Laravel", "PHP", "MySQL", "Blade"],
      image: "bg-gradient-to-br from-green-400 to-emerald-600"
    },
    {
      title: isRtl ? "نظام إدارة الطلبات" : "Order Management System",
      description: isRtl ? "نظام ويب لإدارة الطلبات وتتبع الحالة وتنظيم سير العمل للشركات." : "A web system for managing orders, tracking status, and organizing workflow for businesses.",
      tech: ["Laravel", "MySQL", "CRUD", "Bootstrap"],
      image: "bg-gradient-to-br from-blue-400 to-sky-600"
    },
    {
      title: isRtl ? "فكرة نظام تخطيط محاسبي (ERP)" : "ERP / Accounting System Concept",
      description: isRtl ? "فكرة نظام أعمال مخصصة للتعامل مع المحاسبة والمنتجات والطلبات والعمليات الداخلية للشركة." : "A custom business system idea for handling accounting, products, orders, and internal company operations.",
      tech: ["Laravel", "MySQL", "Admin Dashboard", "System Design"],
      image: "bg-gradient-to-br from-indigo-500 to-purple-600"
    }
  ];

  const skillsList = [
    "Laravel", "PHP", "MySQL", "HTML", "CSS", "JavaScript", 
    "Bootstrap", "Blade", "Git", "Responsive Design"
  ];

  const reasonsList = [
    isRtl ? "حلول تركز على الأعمال ومصممة للعمليات الواقعية." : "Business-focused solutions designed for real-world operations.",
    isRtl ? "واجهات مستخدم نظيفة واحترافية وعالية الجودة." : "Clean, premium, and highly professional user interfaces.",
    isRtl ? "أنظمة مخصصة مبنية بالكامل لتناسب متطلبات العمل." : "Custom systems built entirely around your specific client needs.",
    isRtl ? "بنية تحتية قوية لقواعد البيانات لبناء تطبيقات قابلة للتوسع." : "Strong backend and database architecture for scalable apps."
  ];

  return (
    <div className={`min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-200 transition-colors duration-300 ${isRtl ? 'font-arabic' : 'font-sans'}`}>
      
      {/* Navigation */}
      <nav className="fixed w-full z-50 glass-card bg-white/80 border-b border-slate-200 py-4 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <a href="#" className="flex items-center gap-2 text-2xl font-bold tracking-tighter text-slate-900">
            {t.navLogo}<span className="text-blue-600">.</span>
          </a>
          
          <div className="hidden md:flex items-center gap-8 font-medium text-slate-600">
            <a href="#about" className="hover:text-blue-600 transition-colors">{t.navAbout}</a>
            <a href="#services" className="hover:text-blue-600 transition-colors">{t.navServices}</a>
            <a href="#projects" className="hover:text-blue-600 transition-colors">{t.navProjects}</a>
            
            <div className="flex items-center gap-4 border-s border-slate-300 ps-4">
              <button 
                onClick={toggleLanguage} 
                className="flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors px-2 py-1 rounded-md bg-slate-100 hover:bg-slate-200"
                title={isRtl ? "Switch to English" : "التبديل للعربية"}
              >
                <Languages className="w-5 h-5" />
                <span className="text-sm font-bold uppercase">{isRtl ? 'EN' : 'AR'}</span>
              </button>
              <a href="#contact" className="px-5 py-2 bg-slate-900 text-white rounded-full hover:bg-slate-800 transition-all shadow-md">
                {t.navTalk}
              </a>
            </div>
          </div>

          {/* Mobile Language Toggle */}
          <button 
            onClick={toggleLanguage} 
            className="md:hidden flex items-center gap-1 text-slate-500 hover:text-blue-600 transition-colors p-2"
          >
            <Languages className="w-6 h-6" />
            <span className="text-xs font-bold uppercase">{isRtl ? 'EN' : 'AR'}</span>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 md:px-12 lg:px-24 overflow-hidden">
        {/* Background blobs */}
        <div className={`absolute top-20 ${isRtl ? 'right-10' : 'left-10'} w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob`}></div>
        <div className={`absolute top-20 ${isRtl ? 'left-10' : 'right-10'} w-72 h-72 bg-sky-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000`}></div>
        
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeIn}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 font-medium text-sm mb-8 shadow-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
              </span>
              {t.heroBadge}
            </div>
          </motion.div>
          
          <motion.h1 
            initial="hidden" animate="visible" variants={fadeIn} transition={{ delay: 0.1 }}
            className={`text-5xl md:text-7xl font-bold tracking-tight mb-6 ${isRtl ? 'leading-[1.4]' : ''}`}
          >
            {t.heroTitle1} <br className="hidden md:block"/>
            <span className="gradient-text">{t.heroTitle2}</span>
          </motion.h1>
          
          <motion.p 
            initial="hidden" animate="visible" variants={fadeIn} transition={{ delay: 0.2 }}
            className="text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            {t.heroIntro}
          </motion.p>
          
          <motion.div 
            initial="hidden" animate="visible" variants={fadeIn} transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <a href="#projects" className="inline-flex justify-center items-center gap-2 px-8 py-4 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30 transition-all">
              {t.heroBtnProjects} <ArrowIcon className="w-5 h-5" />
            </a>
            <a href="#contact" className="inline-flex justify-center items-center gap-2 px-8 py-4 rounded-full bg-white text-slate-900 border border-slate-200 font-medium hover:bg-slate-50 transition-all shadow-sm">
              {t.heroBtnContact}
            </a>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 md:px-12 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">{t.aboutTitle}</h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                {t.aboutP1}
              </p>
              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                {t.aboutP2}
              </p>
              
              <div className="flex gap-4">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex-1">
                  <h3 className="text-3xl font-bold text-blue-600 mb-1">100%</h3>
                  <p className="text-sm font-medium text-slate-500">{t.aboutStat1}</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex-1">
                  <h3 className="text-3xl font-bold text-blue-600 mb-1">24/7</h3>
                  <p className="text-sm font-medium text-slate-500">{t.aboutStat2}</p>
                </div>
              </div>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="relative">
              <div className="aspect-square md:aspect-[4/3] rounded-3xl bg-slate-100 border border-slate-200 overflow-hidden shadow-2xl flex items-center justify-center p-8">
                {/* Decorative element representing code/system architecture */}
                <div className="w-full h-full relative structure-bg rounded-xl bg-slate-800 flex flex-col pt-4 px-4 shadow-[inset_0_2px_20px_rgba(0,0,0,0.5)]" dir="ltr">
                   <div className="flex gap-2 mb-4">
                     <div className="w-3 h-3 rounded-full bg-red-400"></div>
                     <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                     <div className="w-3 h-3 rounded-full bg-green-400"></div>
                   </div>
                   <div className="flex-1 border-t border-slate-700 flex flex-col gap-3 pt-4 opacity-80">
                     <div className="w-3/4 h-4 bg-slate-700 rounded text-xs px-2 text-slate-400 flex items-center">&lt;?php</div>
                     <div className="w-1/2 h-4 bg-blue-500/20 rounded ml-4"></div>
                     <div className="w-2/3 h-4 bg-blue-500/20 rounded ml-4"></div>
                     <div className="w-1/3 h-4 bg-sky-500/20 rounded ml-8"></div>
                     <div className="w-4/5 h-4 bg-indigo-500/20 rounded ml-4 mt-2"></div>
                     <div className="w-2/5 h-4 bg-slate-700 rounded ml-4"></div>
                   </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-6 md:px-12 lg:px-24 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.servicesTitle}</h2>
            <p className="text-slate-600 text-lg">{t.servicesDesc}</p>
          </div>

          <motion.div 
            variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {servicesList.map((service, index) => (
              <motion.div key={index} variants={fadeIn} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-slate-600 leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6 md:px-12 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.projectsTitle}</h2>
              <p className="text-slate-600 text-lg">{t.projectsDesc}</p>
            </div>
            <a href="#" className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors shrink-0">
              {t.projectsViewAll} <ArrowIcon className="w-4 h-4" />
            </a>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {projectsList.map((project, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group flex flex-col bg-white rounded-3xl border border-slate-200 overflow-hidden hover:shadow-2xl transition-all duration-300"
              >
                {/* Abstract project cover */}
                <div className={`h-48 w-full ${project.image} relative overflow-hidden`} dir="ltr">
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300"></div>
                  <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white/20 blur-2xl rounded-full"></div>
                  <div className="absolute -top-6 -left-6 w-32 h-32 bg-white/20 blur-2xl rounded-full"></div>
                </div>
                
                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-600 transition-colors uppercase-first">{project.title}</h3>
                  <p className="text-slate-600 mb-6 flex-1">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tech.map((item, i) => (
                      <span key={i} className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded-md" dir="ltr">
                        {item}
                      </span>
                    ))}
                  </div>
                  
                  <a href="#" className="inline-flex items-center justify-center w-full gap-2 py-3 px-4 bg-slate-50 hover:bg-slate-900 border border-slate-200 hover:border-slate-900 text-slate-800 hover:text-white rounded-xl font-medium transition-colors">
                    {t.projectsViewDetails} <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills & Why Choose Me Section */}
      <section className="py-20 px-6 md:px-12 lg:px-24 bg-slate-900 text-white relative overflow-hidden">
        {/* Background decorative grid */}
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16">
            
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
              <h2 className="text-3xl md:text-4xl font-bold mb-8">{t.skillsTitle}</h2>
              <div className="flex flex-wrap gap-3">
                {skillsList.map((skill, index) => (
                  <span key={index} className="px-5 py-3 bg-white/10 border border-white/10 rounded-xl text-slate-200 font-medium backdrop-blur-sm hover:bg-white/20 transition-colors" dir="ltr">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} transition={{ delay: 0.2 }}>
              <h2 className="text-3xl md:text-4xl font-bold mb-8">{t.reasonsTitle}</h2>
              <ul className="space-y-4">
                {reasonsList.map((reason, index) => (
                  <li key={index} className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                    <CheckCircle2 className="w-6 h-6 text-blue-400 shrink-0 mt-0.5" />
                    <span className="text-slate-300 text-lg">{reason}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 md:px-12 lg:px-24 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.contactTitle}</h2>
            <p className="text-slate-600 text-lg">{t.contactDesc}</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="lg:col-span-1 flex flex-col gap-4">
              <motion.div variants={fadeIn} className="bg-white p-6 rounded-3xl border border-slate-200 flex items-center gap-4 shadow-sm">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-medium">{t.contactEmailLabel}</p>
                  <a href="mailto:your-email@example.com" className="text-slate-900 font-semibold hover:text-blue-600 transition-colors font-sans" dir="ltr">your-email@example.com</a>
                </div>
              </motion.div>
              
              <motion.div variants={fadeIn} className="bg-white p-6 rounded-3xl border border-slate-200 flex items-center gap-4 shadow-sm">
                <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center shrink-0">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-medium">{t.contactPhoneLabel}</p>
                  <p className="text-slate-900 font-semibold font-sans" dir="ltr">+20 XXX XXX XXXX</p>
                </div>
              </motion.div>

              <motion.div variants={fadeIn} className="bg-white p-6 rounded-3xl border border-slate-200 flex items-center gap-4 shadow-sm">
                <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-medium">{t.contactLocationLabel}</p>
                  <p className="text-slate-900 font-semibold">{t.contactLocationValue}</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Contact Form UI */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} transition={{ delay: 0.3 }} className="lg:col-span-2">
              <form className="bg-white p-8 md:p-10 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50">
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">{t.contactFormNameLabel}</label>
                    <input type="text" placeholder={t.contactFormNamePH} className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">{t.contactFormEmailLabel}</label>
                    <input type="email" placeholder={t.contactFormEmailPH} className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400 font-sans" dir="ltr"/>
                  </div>
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-slate-700 mb-2">{t.contactFormMsgLabel}</label>
                  <textarea rows="5" placeholder={t.contactFormMsgPH} className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400 resize-none"></textarea>
                </div>
                <button type="button" className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2">
                  {t.contactFormBtn} <ArrowIcon className="w-4 h-4" />
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 py-12 px-6 border-t border-slate-900 text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-start">
            <h3 className="text-2xl font-bold text-white mb-1">{t.navLogo}.</h3>
            <p className="text-sm">{t.footerTitle}</p>
          </div>
          
          <div className="flex gap-4">
            <a href="#" className="p-3 bg-white/5 rounded-full hover:bg-white/10 hover:text-white transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href="#" className="p-3 bg-white/5 rounded-full hover:bg-white/10 hover:text-white transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="#" className="p-3 bg-white/5 rounded-full hover:bg-white/10 hover:text-white transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 text-center text-sm flex flex-col md:flex-row justify-between items-center gap-4">
          <p>{t.footerCopyright}</p>
          <p>{t.footerBuiltWith}</p>
        </div>
      </footer>
    </div>
  );
}
