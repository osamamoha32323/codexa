import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { AppContext } from '../context/AppContext';
import {
  Building2, Factory, Globe, LayoutDashboard, ShoppingCart, Code2,
  Mail, PhoneCall, MapPin, CheckCircle2, ArrowRight, ArrowLeft, ExternalLink,
  Github, Linkedin, Twitter, Languages, Search, Menu, X
} from 'lucide-react';
import { Link } from 'react-router-dom';

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

const Logo = ({ light = false }) => (
  <motion.div
    className="flex items-center gap-2"
    dir="ltr"
    whileHover={{ scale: 1.05 }}
  >
    <div className="relative">
      <div className="absolute inset-0 bg-blue-500 blur-lg opacity-20 animate-pulse"></div>
      <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-[#0f172a] text-white shadow-lg border border-white/10 overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <span className="font-mono font-medium text-xl tracking-tighter -ml-0.5 z-10">&lt;/&gt;</span>
      </div>
    </div>
    <div className={`text-3xl font-bold tracking-tight ${light ? 'text-white' : 'text-slate-900'}`}>
      Code<span className="text-blue-500">xa.</span>
    </div>
  </motion.div>
);

const MatrixRain = () => {
  const canvasRef = React.useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = canvas.parentElement.clientHeight;

    const katakana = 'アァカサタナハマヤャラワガザダバパイィキシシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
    const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const nums = '0123456789';
    const alphabet = katakana + latin + nums;

    const fontSize = 16;
    const columns = Math.floor(width / fontSize);

    const rainDrops = [];
    for (let x = 0; x < columns; x++) {
      rainDrops[x] = Math.random() * -100; // Start at different heights
    }

    const draw = () => {
      // Semi-transparent black to create trailing effect
      ctx.fillStyle = 'rgba(2, 6, 23, 0.1)'; // Matches slate-950
      ctx.fillRect(0, 0, width, height);

      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < rainDrops.length; i++) {
        // Random character
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));

        // Varying green shades for depth
        const opacity = Math.random() * 0.5 + 0.5;
        ctx.fillStyle = `rgba(34, 197, 94, ${opacity})`;

        ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

        if (rainDrops[i] * fontSize > height && Math.random() > 0.975) {
          rainDrops[i] = 0;
        }
        rainDrops[i] += 0.8; // Speed of falling
      }
    };

    let interval = setInterval(draw, 30);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
      const newColumns = Math.floor(width / fontSize);
      if (newColumns > rainDrops.length) {
        for (let x = rainDrops.length; x < newColumns; x++) {
          rainDrops[x] = Math.random() * -100;
        }
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-slate-950">
      <div className="absolute inset-0 opacity-40">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>
      {/* Radial gradient overlay to focus attention on the center */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,6,23,0.8)_100%)]"></div>
      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-950 to-transparent"></div>
    </div>
  );
};

export default function HomePage() {
  const { content, addMessage, projects, lang, setLang } = useContext(AppContext);
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
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
    navLogo: content.navLogo || "Codexa",
    navAbout: isRtl ? (content.navAboutAr || "من نحن") : (content.navAboutEn || "About Us"),
    navServices: isRtl ? "الخدمات" : "Services",
    navProjects: isRtl ? "المشاريع" : "Projects",
    navTalk: isRtl ? "تواصل معنا" : "Contact Us",

    // Hero
    heroBadge: isRtl ? (content.heroBadgeAr || "شركة حلول برمجية وأنظمة أعمال") : (content.heroBadgeEn || "Software House & Business Systems"),
    heroTitle1: isRtl ? (content.heroTitle1Ar || "مرحباً، نحن Codexa.") : (content.heroTitle1En || "Hi, We are Codexa."),
    heroTitle2: isRtl ? (content.heroTitle2Ar || "نبني حلولاً رقمية.") : (content.heroTitle2En || "We build digital solutions."),
    heroIntro: isRtl
      ? (content.heroIntroAr || "نقوم ببناء مواقع احترافية وأنظمة أعمال مخصصة للشركات والمصانع وشركات التصدير.")
      : (content.heroIntroEn || "We build professional websites and custom business systems for companies, factories, and export businesses."),
    heroBtnProjects: isRtl ? "شاهد مشاريعنا" : "View Our Projects",
    heroBtnContact: isRtl ? "تواصل معنا" : "Contact Us",

    // About
    aboutTitle: isRtl ? (content.aboutTitleAr || "من نحن") : (content.aboutTitleEn || "About Us"),
    aboutP1: isRtl ? (content.aboutP1Ar || "نحن شركة تطوير برمجيات نركز على بناء حلول حقيقية للشركات. نتخصص في إنشاء مواقع الشركات، أنظمة المصانع، بوابات التصدير، لوحات التحكم، وتطبيقات الويب المخصصة.")
      : (content.aboutP1En || "We are a software development agency focused on building real solutions for businesses. We specialize in creating powerful company websites, factory systems, export business portals, admin dashboards, and robust custom web applications."),
    aboutP2: isRtl
      ? (content.aboutP2Ar || "مع خبرتنا في Laravel, PHP, MySQL بالإضافة إلى الواجهات (HTML/CSS/JS/Bootstrap)، لا ينصب تركيزنا فقط على المظهر الجمالي، بل على هندسة أنظمة تدفع بعجلة الأعمال للأمام وتوفر حلولاً عملية.")
      : (content.aboutP2En || "With expertise in Laravel, PHP, MySQL, formatting with HTML/CSS, and interactivity through JavaScript and Bootstrap, our focus is not just on aesthetics, but on engineering systems that drive actual business value."),
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
    projectsViewDetails: isRtl ? "قريباً" : "Coming Soon",
    projectsVisitSite: isRtl ? "زيارة الموقع" : "Visit Website",

    // Skills & Reasons
    skillsTitle: isRtl ? "المهارات التقنية" : "Technical Arsenal",
    reasonsTitle: isRtl ? "لماذا تختارنا؟" : "Why Choose Us?",

    // Contact
    contactTitle: isRtl ? "تواصل معنا" : "Contact Us",
    contactDesc: isRtl
      ? "هل تبحث عن حل برمجي مخصص لشركتك؟ دعنا نناقش مشروعك."
      : "Looking for a tailored web solution for your company? Let's discuss your project.",
    contactEmailValue: "osama.mohamedr3d33@gmail.com",
    contactPhoneValue: "01556701167",

    contactLocationLabel: isRtl ? "الموقع" : "Location",
    contactLocationValue: isRtl ? "الإسكندرية" : "Alexandria",

    // Footer
    footerTitle: isRtl ? (content.footerTitleAr || "شركة حلول برمجية | أنظمة أعمال") : (content.footerTitleEn || "Software House | Business Systems"),
    footerCopyright: isRtl ? `© ${new Date().getFullYear()} Codexa. جميع الحقوق محفوظة.` : `© ${new Date().getFullYear()} Codexa. All rights reserved.`,
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

  const skillsList = [
    "Laravel", "PHP", "MySQL", "HTML", "CSS", "JavaScript",
    "Bootstrap", "Blade", "Git", "Responsive Design", "Cyber Security"
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
      <nav className={`fixed w-full z-50 transition-all duration-500 px-6 md:px-12 lg:px-24 ${scrolled
        ? 'bg-slate-950/90 backdrop-blur-xl border-b border-white/10 py-3 shadow-2xl'
        : 'bg-transparent py-5'
        }`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="hover:opacity-90 transition-opacity relative z-50">
            <Logo light={true} />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 font-medium text-slate-300">
            <a href="#about" className="hover:text-blue-400 transition-colors">{t.navAbout}</a>
            <a href="#services" className="hover:text-blue-400 transition-colors">{t.navServices}</a>
            <a href="#projects" className="hover:text-blue-400 transition-colors">{t.navProjects}</a>

            <div className="flex items-center gap-4 border-s border-white/10 ps-4">
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors px-2 py-1 rounded-md bg-white/5 hover:bg-white/10"
                title={isRtl ? "Switch to English" : "التبديل للعربية"}
              >
                <Languages className="w-5 h-5" />
                <span className="text-sm font-bold uppercase">{isRtl ? 'EN' : 'AR'}</span>
              </button>
              <a href="#contact" className="px-5 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20">
                {t.navTalk}
              </a>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-4 relative z-50">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors px-3 py-1.5 rounded-lg bg-white/5 border border-white/10"
            >
              <Languages className="w-4 h-4" />
              <span className="text-xs font-bold uppercase">{isRtl ? 'EN' : 'AR'}</span>
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-white bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: isMenuOpen ? 1 : 0,
            height: isMenuOpen ? 'auto' : 0
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={`md:hidden absolute top-full left-0 w-full bg-slate-950/95 backdrop-blur-2xl border-b border-white/10 overflow-hidden shadow-2xl`}
        >
          <div className="px-6 py-8 flex flex-col gap-6 text-center">
            <a
              href="#about"
              onClick={() => setIsMenuOpen(false)}
              className="text-xl font-medium text-slate-300 hover:text-blue-400 transition-colors"
            >
              {t.navAbout}
            </a>
            <a
              href="#services"
              onClick={() => setIsMenuOpen(false)}
              className="text-xl font-medium text-slate-300 hover:text-blue-400 transition-colors"
            >
              {t.navServices}
            </a>
            <a
              href="#projects"
              onClick={() => setIsMenuOpen(false)}
              className="text-xl font-medium text-slate-300 hover:text-blue-400 transition-colors"
            >
              {t.navProjects}
            </a>
            <div className="pt-4 border-t border-white/10">
              <a
                href="#contact"
                onClick={() => setIsMenuOpen(false)}
                className="inline-block w-full px-6 py-4 bg-blue-600 text-white rounded-2xl font-bold text-lg shadow-lg shadow-blue-600/20 active:scale-[0.98] transition-all"
              >
                {t.navTalk}
              </a>
            </div>
          </div>
        </motion.div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 md:px-12 lg:px-24 overflow-hidden bg-slate-950">
        {/* Background Matrix Rain */}
        <MatrixRain />

        <div className={`absolute top-20 ${isRtl ? 'right-10' : 'left-10'} w-72 h-72 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob`}></div>
        <div className={`absolute top-20 ${isRtl ? 'left-10' : 'right-10'} w-72 h-72 bg-sky-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob animation-delay-2000`}></div>

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeIn}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-medium text-sm mb-8 shadow-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
              </span>
              {t.heroBadge}
            </div>
          </motion.div>

          <motion.h1
            initial="hidden" animate="visible" variants={fadeIn} transition={{ delay: 0.1 }}
            className={`text-5xl md:text-7xl font-bold tracking-tight mb-6 text-white ${isRtl ? 'leading-[1.4]' : ''}`}
          >
            {t.heroTitle1} <br className="hidden md:block" />
            <span className="gradient-text">{t.heroTitle2}</span>
          </motion.h1>

          <motion.p
            initial="hidden" animate="visible" variants={fadeIn} transition={{ delay: 0.2 }}
            className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed"
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
            <a href="#contact" className="inline-flex justify-center items-center gap-2 px-8 py-4 rounded-full bg-white/10 text-white border border-white/20 font-medium hover:bg-white/20 transition-all backdrop-blur-sm shadow-sm">
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
              <div className="text-lg text-slate-600 leading-relaxed mb-6" dangerouslySetInnerHTML={{ __html: t.aboutP1 }} />
              <div className="text-lg text-slate-600 leading-relaxed mb-8" dangerouslySetInnerHTML={{ __html: t.aboutP2 }} />

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
              <div className="aspect-square md:aspect-[4/3] rounded-3xl bg-slate-100 border border-slate-200 overflow-hidden shadow-2xl flex items-center justify-center p-1">
                <div className="w-full h-full relative structure-bg rounded-2xl bg-slate-900 flex flex-col shadow-[inset_0_2px_20px_rgba(0,0,0,0.5)] border border-white/5" dir="ltr">
                  <div className="absolute inset-0 bg-blue-500/5 pointer-events-none animate-pulse"></div>
                  <div className="flex gap-1.5 p-3 border-b border-white/5 bg-white/5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400/80"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400/80"></div>
                  </div>
                  <div className="flex-1 p-5 overflow-hidden flex flex-col justify-center">
                    <pre className="text-[13px] md:text-[15px] lg:text-[17px] font-mono text-slate-300 leading-[1.8] font-medium text-left">
                      <code>
                        <span className="text-purple-400">const</span> <span className="text-amber-300">Company</span> = &#123;<br />
                        &nbsp;&nbsp;<span className="text-blue-400">role</span>: <span className="text-green-300">"Software House & Solutions"</span>,<br />
                        &nbsp;&nbsp;<span className="text-blue-400">mission</span>: <span className="text-green-300">"Building real business solutions"</span>,<br />
                        &nbsp;&nbsp;<span className="text-blue-400">specialties</span>: [<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-green-300">"Company Websites"</span>, <span className="text-green-300">"Factory Systems"</span>,<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-green-300">"Export Portals"</span>, <span className="text-green-300">"Admin Dashboards"</span>,<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-green-300">"Custom Web Apps"</span><br />
                        &nbsp;&nbsp;],<br />
                        &nbsp;&nbsp;<span className="text-blue-400">expertise</span>: [<span className="text-green-300">"Laravel"</span>, <span className="text-green-300">"PHP"</span>, <span className="text-green-300">"MySQL"</span>,<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-green-300">"JS/Bootstrap"</span>, <span className="text-green-300">"HTML/CSS"</span>],<br />
                        &nbsp;&nbsp;<span className="text-blue-400">goal</span>: <span className="text-orange-300">()</span> <span className="text-purple-400">=&gt;</span> <span className="text-green-300">"Engineering systems that"</span> +<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-green-300">" drive actual business value."</span><br />
                        &#125;;
                      </code>
                    </pre>
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
              <motion.div
                key={index}
                variants={fadeIn}
                className="group bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-[0_20px_50px_rgba(59,130,246,0.1)] hover:border-blue-500/30 hover:-translate-y-2 transition-all duration-500 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                    {React.cloneElement(service.icon, { className: "w-8 h-8 transition-colors duration-500" })}
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors">{service.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{service.desc}</p>
                </div>
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
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group flex flex-col bg-white rounded-3xl border border-slate-200 overflow-hidden hover:border-blue-500/50 hover:shadow-[0_20px_50px_rgba(59,130,246,0.15)] transition-all duration-500"
              >
                <a
                  href={project.url && project.url !== '#' ? project.url : project.image}
                  target="_blank"
                  rel="noreferrer"
                  className={`h-64 w-full ${project.image.startsWith('bg-') ? project.image : 'bg-slate-100'} relative overflow-hidden block cursor-pointer group/img`}
                  dir="ltr"
                >
                  {!project.image.startsWith('bg-') && (
                    <img
                      src={project.image}
                      alt={project.titleEn}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-110"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover/img:opacity-100 duration-300">
                    <div className="bg-white/20 backdrop-blur-md p-4 rounded-full border border-white/30 text-white transform scale-90 group-hover/img:scale-100 transition-transform">
                      {project.url && project.url !== '#' ? <ExternalLink className="w-6 h-6" /> : <Search className="w-6 h-6" />}
                    </div>
                  </div>
                </a>

                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-600 transition-colors uppercase-first">{isRtl ? project.titleAr : project.titleEn}</h3>
                  <p className="text-slate-600 mb-6 flex-1">{isRtl ? project.descriptionAr : project.descriptionEn}</p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tech.split(',').map((item, i) => (
                      <span key={i} className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded-md" dir="ltr">
                        {item.trim()}
                      </span>
                    ))}
                  </div>

                  {project.url && project.url !== '#' ? (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center w-full gap-2 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-all shadow-md shadow-blue-600/20 group/btn active:scale-[0.98]"
                    >
                      <span>{t.projectsVisitSite}</span>
                      <ExternalLink className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5" />
                    </a>
                  ) : (
                    <div className="inline-flex items-center justify-center w-full gap-2 py-3 px-4 bg-slate-50 border border-slate-200 text-slate-400 rounded-xl font-medium cursor-default">
                      {t.projectsViewDetails}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 px-6 md:px-12 lg:px-24 bg-slate-900 text-white relative overflow-hidden">
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

          <div className="max-w-4xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              <motion.div variants={fadeIn} className="bg-white p-8 rounded-3xl border border-slate-200 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-4 shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div className="w-full">
                  <p className="text-sm text-slate-500 font-medium mb-1">{isRtl ? 'البريد الإلكتروني' : 'Email'}</p>
                  <a href="mailto:osama.mohamedr3d33@gmail.com" className="text-slate-900 font-bold hover:text-blue-600 transition-colors block break-words font-sans text-[13px] sm:text-sm md:text-base" dir="ltr">osama.mohamedr3d33@gmail.com</a>
                </div>
              </motion.div>

              <motion.div variants={fadeIn} className="bg-white p-8 rounded-3xl border border-slate-200 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mb-4 shrink-0">
                  <PhoneCall className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-medium mb-1">{isRtl ? 'واتساب' : 'WhatsApp'}</p>
                  <a href="https://wa.me/201556701167" className="text-slate-900 font-bold font-sans hover:text-green-600 transition-colors text-lg" dir="ltr">+20 1556701167</a>
                </div>
              </motion.div>

              <motion.div variants={fadeIn} className="bg-white p-8 rounded-3xl border border-slate-200 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mb-4 shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-medium mb-1">{t.contactLocationLabel}</p>
                  <p className="text-slate-900 font-bold text-lg">{t.contactLocationValue}</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 py-12 px-6 border-t border-slate-900 text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-start flex flex-col items-center md:items-start">
            <Logo light={true} />
            <p className="text-sm mt-3">{t.footerTitle}</p>
          </div>

          <div className="flex gap-4">
            <a href="mailto:osama.mohamedr3d33@gmail.com" className="p-3 bg-white/5 rounded-full hover:bg-blue-600/20 hover:text-blue-400 transition-all duration-300 group" title="Email">
              <Mail className="w-5 h-5" />
            </a>
            <a href="https://wa.me/201556701167" className="p-3 bg-white/5 rounded-full hover:bg-green-600/20 hover:text-green-400 transition-all duration-300 group" title="WhatsApp">
              <PhoneCall className="w-5 h-5" />
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
