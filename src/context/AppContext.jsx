import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

const defaultContent = {
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
  
  // Footer
  footerTitleEn: "Software House | Business Systems & Web Solutions",
  footerTitleAr: "شركة حلول برمجية | أنظمة أعمال ومواقع إلكترونية"
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


