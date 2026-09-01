import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { AppContext } from '../context/AppContext';
import {
  Building2, Factory, Globe, LayoutDashboard, ShoppingCart, Code2,
  Mail, PhoneCall, MapPin, CheckCircle2, ArrowRight, ArrowLeft, ExternalLink,
  Github, Linkedin, Twitter, Languages, Search, Menu, X, Sparkles,
  Shield, Check, MessageSquare, Send, ChevronRight, Layers, Cpu, Server, Terminal,
  Workflow, ArrowUpRight, HelpCircle
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
      staggerChildren: 0.15
    }
  }
};

const Logo = ({ light = false }) => (
  <motion.div
    className="flex items-center gap-3.5 select-none"
    dir="ltr"
    whileHover={{ scale: 1.03 }}
    transition={{ duration: 0.2 }}
  >
    {/* Rounded Dark Box with clean </> code icon */}
    <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-[#0e1626]/90 shadow-lg border border-white/10 shrink-0">
      <svg
        className="w-6 h-6"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M34 32 L15 50 L34 68"
          stroke="white"
          strokeWidth="11"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M58 24 L42 76"
          stroke="white"
          strokeWidth="11"
          strokeLinecap="round"
        />
        <path
          d="M66 32 L85 50 L66 68"
          stroke="white"
          strokeWidth="11"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>

    {/* Typography: "Code" in white, "xa" in bright blue, "." in bright blue */}
    <div className={`text-[30px] font-extrabold tracking-tight flex items-baseline leading-none ${light ? 'text-white' : 'text-slate-900'}`}>
      <span>Code</span>
      <span className="text-[#3b82f6]">xa</span>
      <span className="text-[#3b82f6] ml-[0.5px]">.</span>
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
      rainDrops[x] = Math.random() * -100;
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(2, 6, 23, 0.1)';
      ctx.fillRect(0, 0, width, height);
      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        const opacity = Math.random() * 0.5 + 0.5;
        ctx.fillStyle = `rgba(34, 197, 94, ${opacity})`;
        ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

        if (rainDrops[i] * fontSize > height && Math.random() > 0.975) {
          rainDrops[i] = 0;
        }
        rainDrops[i] += 0.8;
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
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,6,23,0.8)_100%)]"></div>
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-950 to-transparent"></div>
    </div>
  );
};

export default function HomePage() {
  const { 
    content, 
    projects, 
    services, 
    workflow,
    techCategories, 
    reasons, 
    lang, 
    setLang, 
    addQuoteRequest,
    usdToEgpRate,
    setUsdToEgpRate
  } = useContext(AppContext);

  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Currency Selection for Budget: 'USD' | 'EGP'
  const [currency, setCurrency] = useState('USD');
  const [budgetSelection, setBudgetSelection] = useState('tier-2'); // 'tier-1', 'tier-2', 'tier-3', 'tier-4', 'custom'
  const [customBudgetAmount, setCustomBudgetAmount] = useState('');

  // Rate helper: formats amount in EGP dynamically
  const formatEgp = (usdVal) => {
    return Math.round(usdVal * (usdToEgpRate || 49)).toLocaleString();
  };

  // Quote Form State
  const [quoteForm, setQuoteForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    projectType: 'Company Website',
    budget: '$500 – $1,500',
    details: ''
  });
  const [quoteSent, setQuoteSent] = useState(false);

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
    navServices: isRtl ? (content.navServicesAr || "الخدمات") : (content.navServicesEn || "Services"),
    navProcess: isRtl ? (content.navProcessAr || "طريقة العمل") : (content.navProcessEn || "How We Work"),
    navProjects: isRtl ? (content.navProjectsAr || "أعمالنا") : (content.navProjectsEn || "Case Studies"),
    navTalk: isRtl ? (content.navTalkAr || "ابدأ مشروعك") : (content.navTalkEn || "Start a Project"),

    // Hero
    heroBadge: isRtl ? (content.heroBadgeAr || "شركة حلول برمجية وأنظمة أعمال") : (content.heroBadgeEn || "Software House · Business Systems & Web Solutions"),
    heroTitle1: isRtl ? (content.heroTitle1Ar || "نبني مواقع وأنظمة") : (content.heroTitle1En || "We Build Websites & Systems That"),
    heroTitle2: isRtl ? (content.heroTitle2Ar || "تساعد شركتك على النمو.") : (content.heroTitle2En || "Help Your Business Scale & Grow."),
    heroIntro: isRtl
      ? (content.heroIntroAr || "نطور مواقع الشركات، الأنظمة الداخلية، منصات التصدير، لوحات التحكم، وتطبيقات الويب المخصصة — مصممة بدقة حسب طبيعة واحتياجات عملك اليومية.")
      : (content.heroIntroEn || "We develop corporate websites, internal business systems, export trading portals, admin dashboards, and custom Laravel web applications — engineered specifically around your real-world workflow."),
    heroBtnProjects: isRtl ? (content.heroBtnProjectsAr || "شاهد أعمالنا") : (content.heroBtnProjectsEn || "Explore Our Work"),
    heroBtnContact: isRtl ? (content.heroBtnContactAr || "ابدأ مشروعك") : (content.heroBtnContactEn || "Start Your Project"),

    // About
    aboutBadge: isRtl ? (content.aboutBadgeAr || "من نحن") : (content.aboutBadgeEn || "Who We Are"),
    aboutTitle: isRtl ? (content.aboutTitleAr || "نساعد الشركات والمصانع على تحويل احتياجاتهم اليومية إلى حلول رقمية عملية.") : (content.aboutTitleEn || "Transforming Daily Business Needs Into High-Performance Digital Solutions."),
    aboutP1: isRtl ? (content.aboutP1Ar || "نحن في Codexa نساعد الشركات والمصانع وأصحاب الأعمال على تحويل احتياجاتهم اليومية إلى حلول رقمية عملية. من المواقع التعريفية والمنصات متعددة اللغات لشركات التصدير، إلى أنظمة إدارة الطلبات ولوحات التحكم وتطبيقات الويب المخصصة.")
      : (content.aboutP1En || "At Codexa, we partner with companies, manufacturing factories, export businesses, and enterprises to bridge the gap between complex operations and intuitive digital systems. From corporate identities and multilingual trading portals to order management systems and bespoke web applications."),
    aboutP2: isRtl
      ? (content.aboutP2Ar || "هدفنا ليس بناء موقع جميل فقط، بل بناء نظام متكامل يخدم عملك الفعلي، يوفر الوقت والجهد، وينظم سير العمليات بدقة وأمان.")
      : (content.aboutP2En || "Our philosophy is simple: we don't just build visually stunning interfaces; we engineer digital solutions that serve your core business, eliminate manual overhead, save valuable time, and optimize operations."),
    aboutPill1: isRtl ? (content.aboutPill1Ar || "تطوير مخصص بالكامل") : (content.aboutPill1En || "Custom Development"),
    aboutPill2: isRtl ? (content.aboutPill2Ar || "حلول موجهة لخدمة العمل") : (content.aboutPill2En || "Business-Driven Focus"),
    aboutPill3: isRtl ? (content.aboutPill3Ar || "بنية آمنة وقابلة للتوسع") : (content.aboutPill3En || "Responsive & Scalable Architecture"),

    // Services
    servicesBadge: isRtl ? (content.servicesBadgeAr || "ماذا نقدم") : (content.servicesBadgeEn || "What We Deliver"),
    servicesTitle: isRtl ? (content.servicesTitleAr || "حلول وخدمات برمجية متخصصة لدفع أعمالك نحو الأمام") : (content.servicesTitleEn || "Tailored Web & Software Services Engineered for Real Growth"),
    servicesDesc: isRtl
      ? (content.servicesDescAr || "منتجات رقمية مصممة خصيصاً لأتمتة أعمالك، فتح أسواق جديدة لشركتك، وإبراز هويتك باحترافية.")
      : (content.servicesDescEn || "Strategic digital products designed to digitize operations, expand your market reach, and elevate your brand presence."),

    // Process / How We Work
    processBadge: isRtl ? (content.processBadgeAr || "منهجية التنفيذ") : (content.processBadgeEn || "Execution Methodology"),
    processTitle: isRtl ? (content.processTitleAr || "طريقة العمل — من الفكرة إلى الإطلاق الناجح") : (content.processTitleEn || "How We Work — From Concept to Scalable Launch"),
    processDesc: isRtl
      ? (content.processDescAr || "خطوات واضحة ومنظمة تضمن تنفيذ مشروعك بأعلى معايير الجودة والأمان والتسليم في الموعد المحدد.")
      : (content.processDescEn || "A structured, transparent 6-step engineering workflow ensuring predictability, quality, and business alignment."),

    // Projects
    projectsBadge: isRtl ? (content.projectsBadgeAr || "دراسات حالة وأعمالنا") : (content.projectsBadgeEn || "Case Studies & Portfolio"),
    projectsTitle: isRtl ? (content.projectsTitleAr || "نماذج من أعمالنا ودراسات الحالة") : (content.projectsTitleEn || "Selected Business Solutions & Case Studies"),
    projectsDesc: isRtl
      ? (content.projectsDescAr || "تعرف على كيف ساعدنا عملاءنا في بناء منصات تصدير وأنظمة إدارة متكاملة تلبي أهدافهم التجارية.")
      : (content.projectsDescEn || "Explore how we engineered custom solutions for export trading enterprises and business management workflows."),
    projectsVisitSite: isRtl ? "زيارة المشروع مباشرة" : "Visit Live Project",
    projectsChallenge: isRtl ? "التحدي التجاري:" : "The Business Challenge:",
    projectsSolution: isRtl ? "الحل البرمجي:" : "The Engineering Solution:",
    projectsResult: isRtl ? "النتيجة والقيمة المضافة:" : "Outcome & Impact:",

    // Tech Stack & Reasons
    techStackTitle: isRtl ? (content.techStackTitleAr || "البنية التكنولوجية") : (content.techStackTitleEn || "Technology Stack"),
    techStackDesc: isRtl ? "التقنيات الحديثة والأدوات القوية التي نبني بها أنظمة عملائنا." : "Modern, reliable, and secure tools used to build robust enterprise software.",
    reasonsTitle: isRtl ? (content.reasonsTitleAr || "لماذا تختار Codexa؟") : (content.reasonsTitleEn || "Why Choose Codexa?"),

    // Contact & Quote Form
    contactBadge: isRtl ? (content.contactBadgeAr || "لنبدأ العمل معاً") : (content.contactBadgeEn || "Let's Build Together"),
    contactTitle: isRtl ? (content.contactTitleAr || "أخبرنا عن مشروعك القادم") : (content.contactTitleEn || "Tell Us About Your Project"),
    contactDesc: isRtl
      ? (content.contactDescAr || "هل تبحث عن نظام مخصص أو موقع احترافي لشركتك؟ املأ النموذج وسنتواصل معك خلال 24 ساعة لتقديم عرض السعر المناسب.")
      : (content.contactDescEn || "Have an upcoming project or looking to digitize your company's workflow? Request a quote and let's discuss your requirements."),
    contactEmailValue: content.contactEmail || "osama.mohamedr3d33@gmail.com",
    contactPhoneValue: content.contactPhone || "+20 1556701167",
    contactWhatsappValue: content.contactWhatsapp || "201556701167",
    contactLocationLabel: isRtl ? "المقر الرئيسي" : "Headquarters",
    contactLocationValue: isRtl ? (content.contactLocationAr || "الإسكندرية، مصر") : (content.contactLocationEn || "Alexandria, Egypt"),

    // Footer
    footerTitle: isRtl ? (content.footerTitleAr || "شركة حلول برمجية · أنظمة أعمال ومواقع إلكترونية") : (content.footerTitleEn || "Software House · Business Systems & Web Solutions"),
    footerDesc: isRtl 
      ? "نبتكر حلولاً رقمية مخصصة، منصات تصدير عالمية، وأنظمة إدارية متطورة تدعم نمو الشركات والمصانع."
      : "Engineering high-performance web applications, export trading portals, and custom business management systems.",
    footerCopyright: isRtl ? `© ${new Date().getFullYear()} ${content.navLogo || 'Codexa'}. جميع الحقوق محفوظة.` : `© ${new Date().getFullYear()} ${content.navLogo || 'Codexa'}. All rights reserved.`,
    footerBuiltWith: isRtl ? "Codexa — شركاؤك في التحول الرقمي" : "Codexa — Digital Engineering & Business Systems",
  };

  const getServiceIcon = (iconName) => {
    switch (iconName) {
      case 'Building2': return <Building2 className="w-8 h-8 text-blue-500" />;
      case 'Factory': return <Factory className="w-8 h-8 text-blue-500" />;
      case 'Globe': return <Globe className="w-8 h-8 text-blue-500" />;
      case 'LayoutDashboard': return <LayoutDashboard className="w-8 h-8 text-blue-500" />;
      case 'ShoppingCart': return <ShoppingCart className="w-8 h-8 text-blue-500" />;
      case 'Code2':
      default:
        return <Code2 className="w-8 h-8 text-blue-500" />;
    }
  };

  const handleQuoteSubmit = (e) => {
    e.preventDefault();

    let finalBudgetText = '';
    if (budgetSelection === 'tier-1') {
      finalBudgetText = currency === 'USD' 
        ? `Under $500 (حوالي ${formatEgp(500)} ج.م)`
        : `أقل من ${formatEgp(500)} ج.م (Under $500)`;
    } else if (budgetSelection === 'tier-2') {
      finalBudgetText = currency === 'USD'
        ? `$500 – $1,500 (${formatEgp(500)} – ${formatEgp(1500)} ج.م)`
        : `${formatEgp(500)} – ${formatEgp(1500)} ج.م ($500 – $1,500)`;
    } else if (budgetSelection === 'tier-3') {
      finalBudgetText = currency === 'USD'
        ? `$1,500 – $3,000 (${formatEgp(1500)} – ${formatEgp(3000)} ج.م)`
        : `${formatEgp(1500)} – ${formatEgp(3000)} ج.م ($1,500 – $3,000)`;
    } else if (budgetSelection === 'tier-4') {
      finalBudgetText = currency === 'USD'
        ? `$3,000+ (${formatEgp(3000)}+ ج.م)`
        : `${formatEgp(3000)}+ ج.م ($3,000+)`;
    } else if (budgetSelection === 'custom') {
      const numVal = parseFloat(customBudgetAmount) || 0;
      if (currency === 'USD') {
        finalBudgetText = `$${numVal.toLocaleString()} USD (${formatEgp(numVal)} ج.م)`;
      } else {
        const usdEquiv = (numVal / (usdToEgpRate || 49)).toFixed(1);
        finalBudgetText = `${numVal.toLocaleString()} ج.م (حوالي $${usdEquiv} USD)`;
      }
    }

    addQuoteRequest({
      ...quoteForm,
      budget: finalBudgetText,
      currencyUsed: currency,
      liveExchangeRate: `1 USD = ${usdToEgpRate || 49} EGP`
    });

    setQuoteSent(true);
    setQuoteForm({
      name: '',
      company: '',
      email: '',
      phone: '',
      projectType: 'Company Website',
      budget: '',
      details: ''
    });
    setCustomBudgetAmount('');
    setTimeout(() => setQuoteSent(false), 6000);
  };

  return (
    <div className={`min-h-screen bg-slate-950 text-slate-100 selection:bg-blue-600 selection:text-white transition-colors duration-300 ${isRtl ? 'font-arabic' : 'font-sans'}`}>

      {/* Floating WhatsApp Quick Action Button */}
      <a
        href={`https://wa.me/${t.contactWhatsappValue}?text=${encodeURIComponent(isRtl ? 'مرحباً Codexa، أود الاستفسار عن تفاصيل مشروع جديد.' : 'Hello Codexa, I would like to inquire about starting a new project.')}`}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 end-6 z-50 flex items-center gap-2.5 px-4 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-2xl shadow-emerald-600/40 hover:scale-105 active:scale-95 transition-all duration-300 border border-emerald-400/30 group font-bold text-sm"
      >
        <MessageSquare className="w-5 h-5 fill-current" />
        <span className="hidden sm:inline">
          {isRtl ? 'تحدث معنا على WhatsApp' : 'Chat on WhatsApp'}
        </span>
      </a>

      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-500 px-6 md:px-12 lg:px-24 ${scrolled
        ? 'bg-slate-950/90 backdrop-blur-xl border-b border-white/10 py-3.5 shadow-2xl'
        : 'bg-transparent py-5'
        }`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="hover:opacity-90 transition-opacity relative z-50">
            <Logo light={true} />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 font-medium text-slate-300 text-sm">
            <a href="#about" className="hover:text-blue-400 transition-colors">{t.navAbout}</a>
            <a href="#services" className="hover:text-blue-400 transition-colors">{t.navServices}</a>
            <a href="#process" className="hover:text-blue-400 transition-colors">{t.navProcess}</a>
            <a href="#projects" className="hover:text-blue-400 transition-colors">{t.navProjects}</a>
            <a href="#why-us" className="hover:text-blue-400 transition-colors">{t.reasonsTitle}</a>

            <div className="flex items-center gap-4 border-s border-white/10 ps-4">
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10"
                title={isRtl ? "Switch to English" : "التبديل للعربية"}
              >
                <span className="text-base">{isRtl ? '🇬🇧' : '🇦🇪'}</span>
                <span className="text-xs font-bold uppercase">{isRtl ? 'EN' : 'العربية'}</span>
              </button>
              <a href="#contact" className="px-5 py-2.5 bg-blue-600 text-white rounded-full hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/25 font-bold text-xs flex items-center gap-1.5">
                {t.navTalk}
                <ArrowIcon className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-3 relative z-50">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors px-2.5 py-1.5 rounded-xl bg-white/5 border border-white/10"
            >
              <span className="text-sm">{isRtl ? '🇬🇧' : '🇦🇪'}</span>
              <span className="text-xs font-bold">{isRtl ? 'EN' : 'عربي'}</span>
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-white bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors"
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
          className={`md:hidden absolute top-full left-0 w-full bg-slate-950/98 backdrop-blur-2xl border-b border-white/10 overflow-hidden shadow-2xl`}
        >
          <div className="px-6 py-8 flex flex-col gap-5 text-center">
            <a href="#about" onClick={() => setIsMenuOpen(false)} className="text-slate-300 hover:text-blue-400 font-medium py-1">{t.navAbout}</a>
            <a href="#services" onClick={() => setIsMenuOpen(false)} className="text-slate-300 hover:text-blue-400 font-medium py-1">{t.navServices}</a>
            <a href="#process" onClick={() => setIsMenuOpen(false)} className="text-slate-300 hover:text-blue-400 font-medium py-1">{t.navProcess}</a>
            <a href="#projects" onClick={() => setIsMenuOpen(false)} className="text-slate-300 hover:text-blue-400 font-medium py-1">{t.navProjects}</a>
            <a href="#why-us" onClick={() => setIsMenuOpen(false)} className="text-slate-300 hover:text-blue-400 font-medium py-1">{t.reasonsTitle}</a>
            <a href="#contact" onClick={() => setIsMenuOpen(false)} className="mt-2 w-full py-3 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-600/30">
              {t.navTalk}
            </a>
          </div>
        </motion.div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[92vh] flex items-center justify-center px-6 md:px-12 lg:px-24 pt-32 pb-20 overflow-hidden">
        <MatrixRain />

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.div
            initial="hidden" animate="visible" variants={fadeIn}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs sm:text-sm font-semibold mb-8 backdrop-blur-md shadow-inner"
          >
            <Sparkles className="w-4 h-4 text-blue-400 shrink-0" />
            <span>{t.heroBadge}</span>
          </motion.div>

          <motion.h1
            initial="hidden" animate="visible" variants={fadeIn} transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.15] mb-8"
          >
            {t.heroTitle1}{' '}
            <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent block sm:inline mt-1 sm:mt-0">
              {t.heroTitle2}
            </span>
          </motion.h1>

          <motion.p
            initial="hidden" animate="visible" variants={fadeIn} transition={{ delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed font-normal"
          >
            {t.heroIntro}
          </motion.p>

          <motion.div
            initial="hidden" animate="visible" variants={fadeIn} transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-4"
          >
            <a
              href="#contact"
              className="w-full sm:w-auto inline-flex justify-center items-center gap-2 px-8 py-4 rounded-2xl bg-blue-600 text-white font-bold hover:bg-blue-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-all transform hover:-translate-y-0.5 active:scale-95 text-base"
            >
              {t.heroBtnContact} <ArrowIcon className="w-5 h-5" />
            </a>
            <a
              href="#projects"
              className="w-full sm:w-auto inline-flex justify-center items-center gap-2 px-8 py-4 rounded-2xl bg-white/10 text-white border border-white/15 font-semibold hover:bg-white/20 transition-all backdrop-blur-md shadow-sm text-base"
            >
              {t.heroBtnProjects}
            </a>
          </motion.div>

          {/* Quick Value Pillars */}
          <motion.div
            initial="hidden" animate="visible" variants={fadeIn} transition={{ delay: 0.4 }}
            className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 text-start max-w-4xl mx-auto"
          >
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-md flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-400">{isRtl ? 'بوابات التصدير والمصانع' : 'Export & Factory Sites'}</p>
                <p className="text-sm font-bold text-white">{isRtl ? 'منصات عالمية ومتعددة اللغات' : 'Global Multilingual Reach'}</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-md flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
                <LayoutDashboard className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-400">{isRtl ? 'لوحات التحكم والإدارة' : 'Internal Dashboards'}</p>
                <p className="text-sm font-bold text-white">{isRtl ? 'أتمتة العمليات وتتبع الطلبات' : 'Operations Automation'}</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-md flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-400">{isRtl ? 'تطبيقات ويب مخصصة' : 'Custom Web Apps'}</p>
                <p className="text-sm font-bold text-white">{isRtl ? 'بنية آمنة مبنية لـ Laravel' : 'Robust & Scalable Stack'}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 md:px-12 lg:px-24 bg-slate-900 text-white relative border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold">
                <Building2 className="w-3.5 h-3.5" />
                <span>{t.aboutBadge}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight">
                {t.aboutTitle}
              </h2>
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                {t.aboutP1}
              </p>
              <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
                {t.aboutP2}
              </p>

              {/* Real Value Badges (No 100% or 24/7 illusions) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4">
                <div className="p-4 bg-slate-950/80 rounded-2xl border border-white/10 flex flex-col justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-500 mb-2"></div>
                  <h3 className="text-sm font-bold text-white">{t.aboutPill1}</h3>
                  <p className="text-xs text-slate-400 mt-1">{isRtl ? 'مبني من الصفر لمتطلباتك' : 'Tailored to your exact logic'}</p>
                </div>
                <div className="p-4 bg-slate-950/80 rounded-2xl border border-white/10 flex flex-col justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 mb-2"></div>
                  <h3 className="text-sm font-bold text-white">{t.aboutPill2}</h3>
                  <p className="text-xs text-slate-400 mt-1">{isRtl ? 'خدمة أهداف العمل والربحية' : 'Built to drive commercial value'}</p>
                </div>
                <div className="p-4 bg-slate-950/80 rounded-2xl border border-white/10 flex flex-col justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 mb-2"></div>
                  <h3 className="text-sm font-bold text-white">{t.aboutPill3}</h3>
                  <p className="text-xs text-slate-400 mt-1">{isRtl ? 'أمان وقابلية للتوسع المستقبلي' : 'Scales seamlessly with growth'}</p>
                </div>
              </div>
            </motion.div>

            {/* Visual Technical Architecture Card (Side Easter-Egg Card) */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="lg:col-span-5 relative">
              <div className="rounded-3xl bg-slate-950 border border-white/15 overflow-hidden shadow-2xl p-1 relative">
                <div className="w-full relative structure-bg rounded-2xl bg-slate-900/90 flex flex-col border border-white/10" dir="ltr">
                  <div className="flex items-center justify-between p-3.5 border-b border-white/10 bg-slate-950/60">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-400/80"></div>
                      <div className="w-3 h-3 rounded-full bg-amber-400/80"></div>
                      <div className="w-3 h-3 rounded-full bg-green-400/80"></div>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                      <Terminal className="w-3 h-3 text-blue-400" /> CodexaArchitecture.ts
                    </span>
                  </div>
                  <div className="p-5 overflow-hidden">
                    <pre className="text-[12px] sm:text-[13px] font-mono text-slate-300 leading-[1.8] text-left">
                      <code>
                        <span className="text-purple-400">interface</span> <span className="text-amber-300">EngineeringStandards</span> &#123;<br />
                        &nbsp;&nbsp;<span className="text-blue-400">coreFocus</span>: <span className="text-green-300">"Business Growth & Scalability"</span>;<br />
                        &nbsp;&nbsp;<span className="text-blue-400">targetClients</span>: [<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-emerald-300">"Corporates"</span>, <span className="text-emerald-300">"Factories"</span>,<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-emerald-300">"Export Businesses"</span>, <span className="text-emerald-300">"Enterprises"</span><br />
                        &nbsp;&nbsp;];<br />
                        &nbsp;&nbsp;<span className="text-blue-400">capabilities</span>: &#123;<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-sky-300">portals</span>: <span className="text-green-300">"Multilingual RFQ Catalogs"</span>,<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-sky-300">dashboards</span>: <span className="text-green-300">"Real-time Analytics"</span>,<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-sky-300">customApps</span>: <span className="text-green-300">"Laravel / React Systems"</span><br />
                        &nbsp;&nbsp;&#125;;<br />
                        &nbsp;&nbsp;<span className="text-blue-400">deliverable</span>: () <span className="text-purple-400">=&gt;</span> <span className="text-green-300">"Systems that drive real ROI"</span>;<br />
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
      <section id="services" className="py-24 px-6 md:px-12 lg:px-24 bg-slate-950 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.servicesBadge}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white">{t.servicesTitle}</h2>
            <p className="text-slate-400 text-base sm:text-lg">{t.servicesDesc}</p>
          </div>

          <motion.div
            variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {services.map((service) => (
              <motion.div
                key={service.id}
                variants={fadeIn}
                className="group bg-slate-900/80 border border-white/10 p-8 rounded-3xl hover:border-blue-500/50 hover:bg-slate-900 hover:shadow-[0_20px_50px_rgba(59,130,246,0.15)] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-16 h-16 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                    {getServiceIcon(service.icon)}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                    {isRtl ? service.titleAr : service.titleEn}
                  </h3>
                  <p className="text-slate-400 leading-relaxed text-sm mb-6">
                    {isRtl ? service.descAr : service.descEn}
                  </p>
                </div>

                {/* Strategic CTA on every service card */}
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 text-xs font-bold text-blue-400 hover:text-white group-hover:translate-x-1 transition-all pt-4 border-t border-white/5"
                >
                  <span>{isRtl ? (service.ctaAr || 'ابدأ مشروعك ←') : (service.ctaEn || 'Start Project →')}</span>
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How We Work Section (Execution Methodology) */}
      <section id="process" className="py-24 px-6 md:px-12 lg:px-24 bg-slate-900/80 text-white relative border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
              <Workflow className="w-3.5 h-3.5" />
              <span>{t.processBadge}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white">{t.processTitle}</h2>
            <p className="text-slate-400 text-base sm:text-lg">{t.processDesc}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workflow.map((item, idx) => (
              <div
                key={idx}
                className="bg-slate-950/70 border border-white/10 rounded-3xl p-6 relative hover:border-emerald-500/40 transition-all group"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-black text-emerald-400/60 group-hover:text-emerald-400 font-mono transition-colors">
                    {item.step}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 text-xs font-bold">
                    ✓
                  </div>
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                  {isRtl ? item.titleAr : item.titleEn}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {isRtl ? item.descAr : item.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section (Case Studies) */}
      <section id="projects" className="py-24 px-6 md:px-12 lg:px-24 bg-slate-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold">
              <Layers className="w-3.5 h-3.5" />
              <span>{t.projectsBadge}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white">{t.projectsTitle}</h2>
            <p className="text-slate-400 text-base sm:text-lg">{t.projectsDesc}</p>
          </div>

          <div className="space-y-12 max-w-5xl mx-auto">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-slate-900 border border-white/10 rounded-3xl overflow-hidden hover:border-blue-500/40 shadow-2xl transition-all grid lg:grid-cols-12 gap-6"
              >
                {/* Project Image Preview */}
                <div className="lg:col-span-5 bg-slate-950 relative overflow-hidden flex items-center justify-center p-6 border-b lg:border-b-0 lg:border-e border-white/10">
                  <img
                    src={project.image}
                    alt={project.titleEn}
                    className="w-full h-full max-h-[340px] object-cover rounded-2xl border border-white/10 shadow-lg hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Case Study Breakdown */}
                <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold rounded-lg">
                        Case Study #{index + 1}
                      </span>
                    </div>
                    <h3 className="text-2xl font-black text-white">
                      {isRtl ? project.titleAr : project.titleEn}
                    </h3>
                    <p className="text-xs text-slate-400 font-medium mt-1">
                      {isRtl ? project.subtitleAr : project.subtitleEn}
                    </p>
                  </div>

                  <div className="space-y-3 text-xs sm:text-sm text-slate-300">
                    <div className="p-3.5 rounded-xl bg-slate-950/80 border border-white/5 space-y-1">
                      <p className="font-bold text-amber-400">{t.projectsChallenge}</p>
                      <p className="text-slate-400 leading-relaxed">{isRtl ? project.challengeAr : project.challengeEn}</p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-950/80 border border-white/5 space-y-1">
                      <p className="font-bold text-blue-400">{t.projectsSolution}</p>
                      <p className="text-slate-400 leading-relaxed">{isRtl ? project.solutionAr : project.solutionEn}</p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-950/80 border border-white/5 space-y-1">
                      <p className="font-bold text-emerald-400">{t.projectsResult}</p>
                      <p className="text-slate-400 leading-relaxed">{isRtl ? project.resultAr : project.resultEn}</p>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-white/10">
                    <div className="flex flex-wrap gap-1.5" dir="ltr">
                      {project.tech.split(',').map((techItem, i) => (
                        <span key={i} className="px-2.5 py-1 bg-white/5 border border-white/10 text-slate-300 text-[11px] font-mono rounded-md">
                          {techItem.trim()}
                        </span>
                      ))}
                    </div>

                    {project.url && project.url !== '#' ? (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-600/20 transition-all"
                      >
                        <span>{t.projectsVisitSite}</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                    ) : (
                      <span className="text-xs text-slate-500 font-mono">
                        {isRtl ? 'نظام خاص / Private ERP' : 'Internal System'}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack & Why Choose Us Section */}
      <section id="why-us" className="py-24 px-6 md:px-12 lg:px-24 bg-slate-900 text-white relative border-t border-white/5">
        <div className="max-w-7xl mx-auto space-y-20">
          
          {/* Why Choose Codexa Grid (6 Pillars) */}
          <div className="space-y-10">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white">{t.reasonsTitle}</h2>
              <p className="text-slate-400 text-base">{isRtl ? 'لماذا يثق بنا أصحاب الشركات والمصانع في تنفيذ مشاريعهم الرقمية؟' : 'The engineering values and guarantees we bring to every enterprise client.'}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reasons.map((r) => (
                <div
                  key={r.id}
                  className="p-6 rounded-3xl bg-slate-950 border border-white/10 hover:border-blue-500/40 transition-all flex flex-col justify-between"
                >
                  <div>
                    <span className="text-xl font-mono font-black text-blue-400 mb-3 block">
                      {r.num}
                    </span>
                    <h3 className="text-lg font-bold text-white mb-2">
                      {isRtl ? r.titleAr : r.titleEn}
                    </h3>
                    <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                      {isRtl ? r.ar : r.en}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Categorized Professional Tech Stack (Not CV style) */}
          <div className="p-8 sm:p-12 rounded-3xl bg-slate-950 border border-white/10 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
              <div>
                <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Cpu className="w-6 h-6 text-blue-400" /> {t.techStackTitle}
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm mt-1">{t.techStackDesc}</p>
              </div>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20 w-fit">
                Production-Ready Stack
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {techCategories.map((cat, idx) => (
                <div key={idx} className="space-y-3">
                  <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                    {isRtl ? cat.categoryAr : cat.categoryEn}
                  </h4>
                  <ul className="space-y-2">
                    {cat.items.map((tech, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs sm:text-sm text-slate-300 font-mono" dir="ltr">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Contact Section with Interactive Request a Quote Form */}
      <section id="contact" className="py-24 px-6 md:px-12 lg:px-24 bg-slate-950 relative border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold">
              <Mail className="w-3.5 h-3.5" />
              <span>{t.contactBadge}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white">{t.contactTitle}</h2>
            <p className="text-slate-400 text-base sm:text-lg">{t.contactDesc}</p>
          </div>

          <div className="grid lg:grid-cols-12 gap-10 max-w-6xl mx-auto items-start">
            
            {/* Direct Contact Channels Info */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-6 rounded-3xl bg-slate-900 border border-white/10 space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">{isRtl ? 'البريد الإلكتروني المباشر' : 'Direct Email'}</p>
                  <a href={`mailto:${t.contactEmailValue}`} className="text-white font-bold hover:text-blue-400 text-sm font-sans" dir="ltr">
                    {t.contactEmailValue}
                  </a>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-slate-900 border border-white/10 space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">{isRtl ? 'واتساب للمحادثة السريعة' : 'WhatsApp Support'}</p>
                  <a
                    href={`https://wa.me/${t.contactWhatsappValue}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-white font-bold hover:text-emerald-400 text-sm font-sans"
                    dir="ltr"
                  >
                    {t.contactPhoneValue}
                  </a>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-slate-900 border border-white/10 space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">{t.contactLocationLabel}</p>
                  <p className="text-white font-bold text-sm">{t.contactLocationValue}</p>
                </div>
              </div>
            </div>

            {/* Project Request & Quote Form */}
            <div className="lg:col-span-7 bg-slate-900 border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl relative">
              <h3 className="text-xl font-bold text-white mb-2">
                {isRtl ? 'طلب عرض سعر / دراسة مشروع' : 'Request a Project Proposal'}
              </h3>
              <p className="text-xs text-slate-400 mb-6">
                {isRtl ? 'أدخل تفاصيل مشروعك وسنقوم بالرد عليك في غضون 24 ساعة بخطة وتكلفة تقديرية.' : 'Provide details about your project and we will get back to you with a structured proposal.'}
              </p>

              {quoteSent ? (
                <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-white">
                    {isRtl ? 'تم استلام طلبك بنجاح!' : 'Your Request Has Been Received!'}
                  </h4>
                  <p className="text-xs text-slate-300">
                    {isRtl ? 'شكراً لتواصلك معنا. سنراجع متطلباتك ونتواصل معك عبر البريد والواتساب قريباً.' : 'Thank you for reaching out. We will review your requirements and respond shortly.'}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleQuoteSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        {isRtl ? 'الاسم الكامل *' : 'Full Name *'}
                      </label>
                      <input
                        type="text"
                        required
                        value={quoteForm.name}
                        onChange={(e) => setQuoteForm({ ...quoteForm, name: e.target.value })}
                        placeholder={isRtl ? 'أحمد محمد' : 'John Doe'}
                        className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        {isRtl ? 'اسم الشركة / المنشأة' : 'Company Name'}
                      </label>
                      <input
                        type="text"
                        value={quoteForm.company}
                        onChange={(e) => setQuoteForm({ ...quoteForm, company: e.target.value })}
                        placeholder={isRtl ? 'شركة الاستيراد والتصدير' : 'Company LLC'}
                        className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        {isRtl ? 'البريد الإلكتروني *' : 'Email Address *'}
                      </label>
                      <input
                        type="email"
                        required
                        dir="ltr"
                        value={quoteForm.email}
                        onChange={(e) => setQuoteForm({ ...quoteForm, email: e.target.value })}
                        placeholder="name@company.com"
                        className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        {isRtl ? 'رقم الهاتف / الواتساب *' : 'Phone / WhatsApp *'}
                      </label>
                      <input
                        type="text"
                        required
                        dir="ltr"
                        value={quoteForm.phone}
                        onChange={(e) => setQuoteForm({ ...quoteForm, phone: e.target.value })}
                        placeholder="+20 1..."
                        className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  {/* Project Type & Dual-Currency Budget Selector */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        {isRtl ? 'نوع المشروع' : 'Project Type'}
                      </label>
                      <select
                        value={quoteForm.projectType}
                        onChange={(e) => setQuoteForm({ ...quoteForm, projectType: e.target.value })}
                        className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500"
                      >
                        <option value="Company Website">{isRtl ? 'موقع شركة / Corporate Site' : 'Company Website'}</option>
                        <option value="Export Portal">{isRtl ? 'موقع تصدير وتجارة / Export Portal' : 'Export & Trading Portal'}</option>
                        <option value="Factory Website">{isRtl ? 'موقع مصنع / Factory Website' : 'Factory Website'}</option>
                        <option value="Admin Dashboard">{isRtl ? 'لوحة تحكم / Admin Dashboard' : 'Admin Dashboard'}</option>
                        <option value="Custom Web App">{isRtl ? 'تطبيق ويب مخصص / Custom App' : 'Custom Web App'}</option>
                        <option value="Other">{isRtl ? 'أخرى / Other' : 'Other'}</option>
                      </select>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-xs font-semibold text-slate-300">
                          {isRtl ? 'الميزانية المتوقعة' : 'Estimated Budget'}
                        </label>
                        
                        {/* Currency Toggle Switcher */}
                        <div className="flex items-center gap-1 bg-slate-950 p-0.5 rounded-lg border border-white/10 text-[10px] font-bold">
                          <button
                            type="button"
                            onClick={() => setCurrency('USD')}
                            className={`px-2 py-0.5 rounded-md transition-colors ${
                              currency === 'USD' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                            }`}
                          >
                            $ USD
                          </button>
                          <button
                            type="button"
                            onClick={() => setCurrency('EGP')}
                            className={`px-2 py-0.5 rounded-md transition-colors ${
                              currency === 'EGP' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
                            }`}
                          >
                            ج.م EGP
                          </button>
                        </div>
                      </div>

                      {/* Budget Dropdown */}
                      <select
                        value={budgetSelection}
                        onChange={(e) => setBudgetSelection(e.target.value)}
                        className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500 font-sans"
                      >
                        {currency === 'USD' ? (
                          <>
                            <option value="tier-1">Under $500 (≈ {formatEgp(500)} EGP)</option>
                            <option value="tier-2">$500 – $1,500 (≈ {formatEgp(500)} – {formatEgp(1500)} EGP)</option>
                            <option value="tier-3">$1,500 – $3,000 (≈ {formatEgp(1500)} – {formatEgp(3000)} EGP)</option>
                            <option value="tier-4">$3,000+ (≈ {formatEgp(3000)}+ EGP)</option>
                            <option value="custom">✍️ {isRtl ? 'أدخل ميزانية مخصصة...' : 'Enter custom budget...'}</option>
                          </>
                        ) : (
                          <>
                            <option value="tier-1">أقل من {formatEgp(500)} ج.م (Under $500)</option>
                            <option value="tier-2">{formatEgp(500)} – {formatEgp(1500)} ج.م ($500 – $1,500)</option>
                            <option value="tier-3">{formatEgp(1500)} – {formatEgp(3000)} ج.م ($1,500 – $3,000)</option>
                            <option value="tier-4">{formatEgp(3000)}+ ج.م ($3,000+)</option>
                            <option value="custom">✍️ {isRtl ? 'أدخل ميزانية مخصصة...' : 'Enter custom budget...'}</option>
                          </>
                        )}
                      </select>
                    </div>
                  </div>

                  {/* Custom Budget Input if Selected */}
                  {budgetSelection === 'custom' && (
                    <div className="p-3.5 rounded-xl bg-slate-950/80 border border-blue-500/30 space-y-2 animate-fadeIn">
                      <label className="block text-xs font-semibold text-blue-300">
                        {isRtl ? `أدخل المبلغ المطلوب (${currency === 'USD' ? 'بالدولار الأمريكي $' : 'بالجنيه المصري ج.م'}):` : `Enter your specific budget amount (${currency}):`}
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          required
                          min="50"
                          value={customBudgetAmount}
                          onChange={(e) => setCustomBudgetAmount(e.target.value)}
                          placeholder={currency === 'USD' ? 'e.g. 1200' : 'مثال: 50000'}
                          className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                        />
                        {customBudgetAmount && parseFloat(customBudgetAmount) > 0 && (
                          <div className="mt-2 text-xs text-slate-400 flex items-center justify-between">
                            <span>
                              {currency === 'USD' 
                                ? `يعادل تقريباً: ${formatEgp(parseFloat(customBudgetAmount))} جنيه مصري`
                                : `Equivalent to: approx $${(parseFloat(customBudgetAmount) / (usdToEgpRate || 49)).toFixed(1)} USD`}
                            </span>
                            <span className="text-[10px] text-slate-500 font-mono">
                              (1 USD = {usdToEgpRate || 49} EGP)
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      {isRtl ? 'تفاصيل ومتطلبات المشروع' : 'Project Details & Scope'}
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={quoteForm.details}
                      onChange={(e) => setQuoteForm({ ...quoteForm, details: e.target.value })}
                      placeholder={isRtl ? 'اشرح باختصار فكرة موقعك أو النظام والوظائف المطلوبة...' : 'Describe what functions and pages you need...'}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl text-sm transition-all shadow-xl shadow-blue-600/30 flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99]"
                  >
                    <Send className="w-4 h-4" />
                    {isRtl ? 'احصل على عرض السعر وخطة التنفيذ' : 'Submit & Get Proposal'}
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* Comprehensive Corporate Footer */}
      <footer className="bg-slate-950 py-16 px-6 md:px-12 lg:px-24 border-t border-white/10 text-slate-400">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/5">
          
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <Logo light={true} />
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              {t.footerDesc}
            </p>
            <div className="flex gap-3 pt-2">
              <a href={`mailto:${t.contactEmailValue}`} className="p-3 bg-white/5 rounded-xl hover:bg-blue-600/20 hover:text-blue-400 transition-all" title="Email">
                <Mail className="w-5 h-5" />
              </a>
              <a href={`https://wa.me/${t.contactWhatsappValue}`} target="_blank" rel="noreferrer" className="p-3 bg-white/5 rounded-xl hover:bg-green-600/20 hover:text-green-400 transition-all" title="WhatsApp">
                <PhoneCall className="w-5 h-5" />
              </a>
              {content.githubUrl && (
                <a href={content.githubUrl} target="_blank" rel="noreferrer" className="p-3 bg-white/5 rounded-xl hover:bg-white/10 hover:text-white transition-all" title="GitHub">
                  <Github className="w-5 h-5" />
                </a>
              )}
              {content.linkedinUrl && content.linkedinUrl !== '#' && (
                <a href={content.linkedinUrl} target="_blank" rel="noreferrer" className="p-3 bg-white/5 rounded-xl hover:bg-blue-600/20 hover:text-blue-400 transition-all" title="LinkedIn">
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>

          {/* Services Column */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              {isRtl ? 'الخدمات والحلول' : 'Services'}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li><a href="#services" className="hover:text-blue-400 transition-colors">{isRtl ? 'مواقع الشركات والمؤسسات' : 'Corporate Websites'}</a></li>
              <li><a href="#services" className="hover:text-blue-400 transition-colors">{isRtl ? 'منصات وبوابات التصدير' : 'Export Trading Portals'}</a></li>
              <li><a href="#services" className="hover:text-blue-400 transition-colors">{isRtl ? 'مواقع ومنصات المصانع' : 'Factory & Plant Sites'}</a></li>
              <li><a href="#services" className="hover:text-blue-400 transition-colors">{isRtl ? 'لوحات التحكم والبيانات' : 'Custom Dashboards'}</a></li>
              <li><a href="#services" className="hover:text-blue-400 transition-colors">{isRtl ? 'تطبيقات الويب المخصصة لـ Laravel' : 'Custom Laravel Apps'}</a></li>
            </ul>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              {isRtl ? 'روابط سريعة' : 'Company'}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li><a href="#about" className="hover:text-blue-400 transition-colors">{t.navAbout}</a></li>
              <li><a href="#process" className="hover:text-blue-400 transition-colors">{t.navProcess}</a></li>
              <li><a href="#projects" className="hover:text-blue-400 transition-colors">{t.navProjects}</a></li>
              <li><a href="#why-us" className="hover:text-blue-400 transition-colors">{t.reasonsTitle}</a></li>
              <li><a href="#contact" className="hover:text-blue-400 transition-colors">{t.navTalk}</a></li>
            </ul>
          </div>

          {/* Direct Contact Column */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              {isRtl ? 'التواصل المباشر' : 'Contact'}
            </h4>
            <div className="space-y-2 text-xs sm:text-sm">
              <p className="font-mono text-slate-300">{t.contactPhoneValue}</p>
              <p className="text-slate-400">{t.contactLocationValue}</p>
              <div className="pt-2">
                <a href="#contact" className="text-blue-400 hover:underline font-bold text-xs">
                  {isRtl ? 'طلب عرض سعر سريع ←' : 'Request a Proposal →'}
                </a>
              </div>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto mt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
          <p>{t.footerCopyright}</p>
          <div className="flex items-center gap-4">
            <p className="text-slate-500">{t.footerBuiltWith}</p>
            <Link to="/admin" className="text-slate-600 hover:text-blue-400 transition-colors text-xs">
              {isRtl ? 'لوحة الإدارة' : 'Admin'}
            </Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
