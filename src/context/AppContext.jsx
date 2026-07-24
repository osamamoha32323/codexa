import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

const defaultContent = {
  // Navigation
  navLogo: "Codexa",
  navAboutEn: "About",
  navAboutAr: "من أنا",
  navServicesEn: "Services",
  navServicesAr: "الخدمات",
  navProjectsEn: "Projects",
  navProjectsAr: "المشاريع",
  navTalkEn: "Let's Talk",
  navTalkAr: "تواصل معي",

  // Hero
  heroBadgeEn: "Laravel & Business Systems Developer",
  heroBadgeAr: "مطور لارافل وأنظمة أعمال",
  heroTitle1En: "Hi, We are Codexa.",
  heroTitle1Ar: "مرحباً، نحن Codexa.",
  heroTitle2En: "I build digital solutions.",
  heroTitle2Ar: "أبني حلولاً رقمية.",
  heroIntroEn: "I build professional websites and custom business systems for companies, factories, and export businesses.",
  heroIntroAr: "أقوم ببناء مواقع احترافية وأنظمة أعمال مخصصة للشركات والمصانع وشركات التصدير.",
  heroBtnProjectsEn: "View My Projects",
  heroBtnProjectsAr: "شاهد مشاريعي",
  heroBtnContactEn: "Contact Me",
  heroBtnContactAr: "تواصل معي",

  // About
  aboutTitleEn: "About Me",
  aboutTitleAr: "من أنا",
  aboutP1En: "I am a web developer focused on building real solutions for businesses. I specialize in creating powerful company websites, factory systems, export business portals, admin dashboards, and robust custom web applications.",
  aboutP1Ar: "أنا مطور ويب أركز على بناء حلول حقيقية للشركات. أتخصص في إنشاء مواقع الشركات، أنظمة المصانع، بوابات التصدير، لوحات التحكم، وتطبيقات الويب المخصصة.",
  aboutP2En: "With expertise in Laravel, PHP, MySQL, formatting with HTML/CSS, and interactivity through JavaScript and Bootstrap, my focus is not just on aesthetics, but on engineering systems that drive actual business value.",
  aboutP2Ar: "مع خبرتي في Laravel, PHP, MySQL بالإضافة إلى الواجهات (HTML/CSS/JS/Bootstrap)، لا ينصب تركيزي فقط على المظهر الجمالي، بل على هندسة أنظمة تدفع بعجلة الأعمال للأمام وتوفر حلولاً عملية.",
  
  // Footer
  footerTitleEn: "Web Developer | Business Systems",
  footerTitleAr: "مطور ويب | أنظمة أعمال"
};

const defaultProjects = [
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


export const AppProvider = ({ children }) => {
  const [content] = useState(defaultContent);
  const [projects] = useState(defaultProjects);
  const [lang, setLang] = useState('en');

  // Simple mock for contact form
  const addMessage = (message) => {
    console.log("Contact form submission (Mock):", message);
    // You can integrate an email service here later if needed
  };

  return (
    <AppContext.Provider value={{ 
      content, 
      projects, 
      lang, 
      setLang,
      addMessage
    }}>
      {children}
    </AppContext.Provider>
  );
};


