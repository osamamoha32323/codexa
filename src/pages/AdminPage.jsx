import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import {
  Building2, Factory, Globe, LayoutDashboard, ShoppingCart, Code2,
  Save, Plus, Trash2, Edit3, ArrowLeft,
  ExternalLink, Layers, CheckCircle2, Shield, Eye, Database,
  Sparkles, Home, Briefcase, Phone, Settings, Info, Lock, LogOut, KeyRound, Mail, Check
} from 'lucide-react';

const availableIcons = [
  { name: 'Building2', label: 'Building (Company)' },
  { name: 'Factory', label: 'Factory (Manufacturing)' },
  { name: 'Globe', label: 'Globe (Export/Web)' },
  { name: 'LayoutDashboard', label: 'Dashboard (Admin)' },
  { name: 'ShoppingCart', label: 'Cart (Orders/Commerce)' },
  { name: 'Code2', label: 'Code (Custom Apps)' },
];

export default function AdminPage() {
  const {
    content,
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
  } = useContext(AppContext);

  // Authentication State
  const defaultAdminEmail = "osama.mohamedr3d33@gmail.com";
  const defaultAdminPass = "123456789";

  const [adminEmail, setAdminEmail] = useState(() => {
    return localStorage.getItem('codexa_admin_email') || defaultAdminEmail;
  });
  const [adminPass, setAdminPass] = useState(() => {
    return localStorage.getItem('codexa_admin_pass') || defaultAdminPass;
  });

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return sessionStorage.getItem('codexa_admin_logged_in') === 'true';
  });

  // Login form inputs
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Password Change inputs
  const [currentPassInput, setCurrentPassInput] = useState('');
  const [newPassInput, setNewPassInput] = useState('');
  const [confirmPassInput, setConfirmPassInput] = useState('');
  const [passChangeSuccess, setPassChangeSuccess] = useState('');
  const [passChangeError, setPassChangeError] = useState('');

  const [activeTab, setActiveTab] = useState('hero');
  const [saveToast, setSaveToast] = useState(false);

  // Local draft state for form fields to enable the explicit Save Button
  const [formContent, setFormContent] = useState(content);

  useEffect(() => {
    setFormContent(content);
  }, [content]);

  // Edit / Add Service Modal State
  const [editingService, setEditingService] = useState(null);
  const [newServiceModal, setNewServiceModal] = useState(false);

  // Edit / Add Project Modal State
  const [editingProject, setEditingProject] = useState(null);
  const [newProjectModal, setNewProjectModal] = useState(false);

  // Skills input
  const [newSkillText, setNewSkillText] = useState('');

  // Reasons input
  const [newReasonEn, setNewReasonEn] = useState('');
  const [newReasonAr, setNewReasonAr] = useState('');

  const triggerToast = (msg = 'تم حفظ التعديلات بنجاح!') => {
    setSaveToast(msg);
    setTimeout(() => {
      setSaveToast(false);
    }, 3000);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginEmail.trim().toLowerCase() === adminEmail.toLowerCase() && loginPassword === adminPass) {
      setIsLoggedIn(true);
      sessionStorage.setItem('codexa_admin_logged_in', 'true');
      setLoginError('');
    } else {
      setLoginError('البريد الإلكتروني أو كلمة المرور غير صحيحة!');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem('codexa_admin_logged_in');
  };

  const handleFieldChange = (key, value) => {
    setFormContent(prev => ({ ...prev, [key]: value }));
  };

  const handleSaveAll = () => {
    updateAllContent(formContent);
    triggerToast('تم حفظ جميع التعديلات بنجاح!');
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    setPassChangeError('');
    setPassChangeSuccess('');

    if (currentPassInput !== adminPass) {
      setPassChangeError('كلمة المرور الحالية غير صحيحة!');
      return;
    }
    if (newPassInput.length < 6) {
      setPassChangeError('كلمة المرور الجديدة يجب أن تكون 6 أحرف على الأقل!');
      return;
    }
    if (newPassInput !== confirmPassInput) {
      setPassChangeError('كلمة المرور الجديدة وتأكيدها غير متطابقين!');
      return;
    }

    setAdminPass(newPassInput);
    localStorage.setItem('codexa_admin_pass', newPassInput);
    setCurrentPassInput('');
    setNewPassInput('');
    setConfirmPassInput('');
    setPassChangeSuccess('تم تغيير كلمة المرور بنجاح!');
    triggerToast('تم تحديث كلمة المرور بنجاح!');
  };

  // --- Project CRUD ---
  const handleSaveProject = (e) => {
    e.preventDefault();
    if (editingProject.id) {
      setProjects(prev => prev.map(p => p.id === editingProject.id ? editingProject : p));
    } else {
      const newProj = { ...editingProject, id: Date.now() };
      setProjects(prev => [...prev, newProj]);
    }
    setEditingProject(null);
    setNewProjectModal(false);
    triggerToast('تم حفظ المشروع بنجاح!');
  };

  const handleDeleteProject = (id) => {
    if (window.confirm('هل أنت متأكد من حذف هذا المشروع؟')) {
      setProjects(prev => prev.filter(p => p.id !== id));
      triggerToast('تم حذف المشروع');
    }
  };

  // --- Service CRUD ---
  const handleSaveService = (e) => {
    e.preventDefault();
    if (editingService.id) {
      setServices(prev => prev.map(s => s.id === editingService.id ? editingService : s));
    } else {
      const newServ = { ...editingService, id: Date.now() };
      setServices(prev => [...prev, newServ]);
    }
    setEditingService(null);
    setNewServiceModal(false);
    triggerToast('تم حفظ الخدمة بنجاح!');
  };

  const handleDeleteService = (id) => {
    if (window.confirm('هل أنت متأكد من حذف هذه الخدمة؟')) {
      setServices(prev => prev.filter(s => s.id !== id));
      triggerToast('تم حذف الخدمة');
    }
  };

  // --- Skill CRUD ---
  const handleAddSkill = () => {
    if (newSkillText.trim() && !skills.includes(newSkillText.trim())) {
      setSkills(prev => [...prev, newSkillText.trim()]);
      setNewSkillText('');
      triggerToast('تمت إضافة المهارة');
    }
  };

  const handleDeleteSkill = (skillToDelete) => {
    setSkills(prev => prev.filter(s => s !== skillToDelete));
    triggerToast('تمت إزالة المهارة');
  };

  // --- Reasons CRUD ---
  const handleAddReason = () => {
    if (newReasonEn.trim() || newReasonAr.trim()) {
      setReasons(prev => [
        ...prev,
        { id: Date.now(), en: newReasonEn.trim(), ar: newReasonAr.trim() }
      ]);
      setNewReasonEn('');
      setNewReasonAr('');
      triggerToast('تمت إضافة الميزة');
    }
  };

  const handleDeleteReason = (id) => {
    setReasons(prev => prev.filter(r => r.id !== id));
    triggerToast('تمت إزالة الميزة');
  };

  const navTabs = [
    { id: 'hero', label: 'الرئيسية والهيدر', icon: <Home className="w-4 h-4" /> },
    { id: 'about', label: 'من نحن (About Us)', icon: <Info className="w-4 h-4" /> },
    { id: 'services', label: 'الخدمات (Services)', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'projects', label: 'المشاريع (Projects)', icon: <Layers className="w-4 h-4" /> },
    { id: 'skills', label: 'المهارات والمميزات', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'contact', label: 'التواصل والفوتر', icon: <Phone className="w-4 h-4" /> },
    { id: 'security', label: 'إعدادات الأمان والباسورد', icon: <KeyRound className="w-4 h-4" /> },
  ];

  // LOGIN SCREEN
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#080d1a] flex items-center justify-center p-6 text-white font-sans relative overflow-hidden selection:bg-blue-600">
        {/* Background glow effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-md w-full bg-slate-900/80 border border-white/10 rounded-3xl p-8 backdrop-blur-xl shadow-2xl relative z-10">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-600/30 mb-4 border border-white/20">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-black tracking-tight text-white">تسجيل الدخول للإدارة</h2>
            <p className="text-slate-400 text-xs mt-1">لوحة تحكم وإدارة محتوى Codexa</p>
          </div>

          {loginError && (
            <div className="mb-6 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs text-center font-medium">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4" dir="rtl">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 text-right">البريد الإلكتروني</label>
              <div className="relative">
                <input
                  type="email"
                  required
                  dir="ltr"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="osama.mohamedr3d33@gmail.com"
                  className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 text-right">كلمة المرور</label>
              <input
                type="password"
                required
                dir="ltr"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="•••••••••"
                className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-sm transition-all shadow-lg shadow-blue-600/25 mt-2 flex items-center justify-center gap-2"
            >
              <Shield className="w-4 h-4" />
              دخول إلى لوحة التحكم
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-white/5 text-center">
            <Link to="/" className="text-xs text-slate-400 hover:text-blue-400 transition-colors">
              ← العودة إلى الموقع الرئيسي
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ADMIN DASHBOARD
  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Toast Notification */}
      {saveToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-blue-600 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-blue-400/30 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-emerald-300" />
          <span className="font-semibold text-sm">{saveToast}</span>
        </div>
      )}

      {/* Top Header */}
      <header className="border-b border-white/10 bg-slate-950/80 backdrop-blur-xl px-6 py-4 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-lg font-bold tracking-tight text-white leading-tight">
                  Codexa <span className="text-blue-400 font-normal text-sm">Control Panel</span>
                </h1>
                <p className="text-[11px] text-slate-400">{adminEmail}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Primary Save Button */}
            <button
              onClick={handleSaveAll}
              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-2 transition-all shadow-lg shadow-emerald-600/25 cursor-pointer hover:scale-105 active:scale-95"
            >
              <Save className="w-4 h-4" />
              حفظ كل التعديلات
            </button>

            {/* Live Preview Button */}
            <Link
              to="/"
              target="_blank"
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-lg shadow-blue-600/20"
            >
              <Eye className="w-3.5 h-3.5" />
              معاينة الموقع
            </Link>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="p-2 rounded-xl bg-white/5 hover:bg-red-500/20 text-slate-400 hover:text-red-400 border border-white/10 transition-colors"
              title="تسجيل الخروج"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto w-full px-6 py-8 flex-1 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Left Navigation Sidebar */}
        <aside className="md:col-span-1 space-y-2">
          <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-3 backdrop-blur-sm sticky top-24">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 py-2">
              أقسام الموقع
            </p>
            {navTabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20 font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}

            <div className="mt-6 pt-4 border-t border-white/10 px-3">
              <button
                onClick={handleSaveAll}
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition-all mb-2"
              >
                <Save className="w-3.5 h-3.5" /> حفظ التعديلات الآن
              </button>
            </div>
          </div>
        </aside>

        {/* Right Content Editor */}
        <main className="md:col-span-3 space-y-6">
          
          {/* TAB: HERO & GENERAL */}
          {activeTab === 'hero' && (
            <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-sm space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Home className="w-5 h-5 text-blue-400" /> الهيدر والقسم الرئيسي (Hero Section)
                  </h2>
                  <p className="text-slate-400 text-xs mt-1">تعديل اسم اللوجو، الشارة، العناوين ونصوص الأزرار.</p>
                </div>
                <button
                  onClick={handleSaveAll}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-md transition-colors"
                >
                  <Save className="w-3.5 h-3.5" /> حفظ
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">اسم اللوجو (Logo Text)</label>
                  <input
                    type="text"
                    value={formContent.navLogo || ''}
                    onChange={(e) => handleFieldChange('navLogo', e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                    placeholder="Codexa"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">شارة الهيرو (English)</label>
                  <input
                    type="text"
                    value={formContent.heroBadgeEn || ''}
                    onChange={(e) => handleFieldChange('heroBadgeEn', e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">شارة الهيرو (عربي)</label>
                  <input
                    type="text"
                    dir="rtl"
                    value={formContent.heroBadgeAr || ''}
                    onChange={(e) => handleFieldChange('heroBadgeAr', e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="border-t border-white/10 pt-6 space-y-4">
                <h3 className="text-xs font-bold text-blue-400 uppercase tracking-wider">العناوين الرئيسية (Headings)</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">العنوان الأول (English)</label>
                    <input
                      type="text"
                      value={formContent.heroTitle1En || ''}
                      onChange={(e) => handleFieldChange('heroTitle1En', e.target.value)}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">العنوان الأول (عربي)</label>
                    <input
                      type="text"
                      dir="rtl"
                      value={formContent.heroTitle1Ar || ''}
                      onChange={(e) => handleFieldChange('heroTitle1Ar', e.target.value)}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">العنوان الثاني (English)</label>
                    <input
                      type="text"
                      value={formContent.heroTitle2En || ''}
                      onChange={(e) => handleFieldChange('heroTitle2En', e.target.value)}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">العنوان الثاني (عربي)</label>
                    <input
                      type="text"
                      dir="rtl"
                      value={formContent.heroTitle2Ar || ''}
                      onChange={(e) => handleFieldChange('heroTitle2Ar', e.target.value)}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">النص التقديمي (English)</label>
                    <textarea
                      rows={3}
                      value={formContent.heroIntroEn || ''}
                      onChange={(e) => handleFieldChange('heroIntroEn', e.target.value)}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">النص التقديمي (عربي)</label>
                    <textarea
                      rows={3}
                      dir="rtl"
                      value={formContent.heroIntroAr || ''}
                      onChange={(e) => handleFieldChange('heroIntroAr', e.target.value)}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">زر المشاريع (EN / عربي)</label>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={formContent.heroBtnProjectsEn || ''}
                        onChange={(e) => handleFieldChange('heroBtnProjectsEn', e.target.value)}
                        className="bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                        placeholder="View Projects"
                      />
                      <input
                        type="text"
                        dir="rtl"
                        value={formContent.heroBtnProjectsAr || ''}
                        onChange={(e) => handleFieldChange('heroBtnProjectsAr', e.target.value)}
                        className="bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                        placeholder="شاهد مشاريعنا"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">زر التواصل (EN / عربي)</label>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={formContent.heroBtnContactEn || ''}
                        onChange={(e) => handleFieldChange('heroBtnContactEn', e.target.value)}
                        className="bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                        placeholder="Contact Us"
                      />
                      <input
                        type="text"
                        dir="rtl"
                        value={formContent.heroBtnContactAr || ''}
                        onChange={(e) => handleFieldChange('heroBtnContactAr', e.target.value)}
                        className="bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                        placeholder="تواصل معنا"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: ABOUT US */}
          {activeTab === 'about' && (
            <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-sm space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Info className="w-5 h-5 text-blue-400" /> قسم من نحن (About Us)
                  </h2>
                  <p className="text-slate-400 text-xs mt-1">تعديل فقرات النبذة التعريفية والإحصائيات.</p>
                </div>
                <button
                  onClick={handleSaveAll}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-md transition-colors"
                >
                  <Save className="w-3.5 h-3.5" /> حفظ
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">عنوان القسم (English)</label>
                  <input
                    type="text"
                    value={formContent.aboutTitleEn || ''}
                    onChange={(e) => handleFieldChange('aboutTitleEn', e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">عنوان القسم (عربي)</label>
                  <input
                    type="text"
                    dir="rtl"
                    value={formContent.aboutTitleAr || ''}
                    onChange={(e) => handleFieldChange('aboutTitleAr', e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">الفقرة 1 (English)</label>
                  <textarea
                    rows={4}
                    value={formContent.aboutP1En || ''}
                    onChange={(e) => handleFieldChange('aboutP1En', e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">الفقرة 1 (عربي)</label>
                  <textarea
                    rows={4}
                    dir="rtl"
                    value={formContent.aboutP1Ar || ''}
                    onChange={(e) => handleFieldChange('aboutP1Ar', e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">الفقرة 2 (English)</label>
                  <textarea
                    rows={4}
                    value={formContent.aboutP2En || ''}
                    onChange={(e) => handleFieldChange('aboutP2En', e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">الفقرة 2 (عربي)</label>
                  <textarea
                    rows={4}
                    dir="rtl"
                    value={formContent.aboutP2Ar || ''}
                    onChange={(e) => handleFieldChange('aboutP2Ar', e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-white/10 pt-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">شارة الإحصائية 1 (EN / عربي)</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={formContent.aboutStat1En || ''}
                      onChange={(e) => handleFieldChange('aboutStat1En', e.target.value)}
                      className="bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                    />
                    <input
                      type="text"
                      dir="rtl"
                      value={formContent.aboutStat1Ar || ''}
                      onChange={(e) => handleFieldChange('aboutStat1Ar', e.target.value)}
                      className="bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">شارة الإحصائية 2 (EN / عربي)</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={formContent.aboutStat2En || ''}
                      onChange={(e) => handleFieldChange('aboutStat2En', e.target.value)}
                      className="bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                    />
                    <input
                      type="text"
                      dir="rtl"
                      value={formContent.aboutStat2Ar || ''}
                      onChange={(e) => handleFieldChange('aboutStat2Ar', e.target.value)}
                      className="bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: SERVICES */}
          {activeTab === 'services' && (
            <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-sm space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-blue-400" /> إدارة الخدمات (Services)
                  </h2>
                  <p className="text-slate-400 text-xs mt-1">إضافة وتعديل وحذف الخدمات المعروضة.</p>
                </div>
                <button
                  onClick={() => {
                    setEditingService({
                      titleEn: '',
                      titleAr: '',
                      descEn: '',
                      descAr: '',
                      icon: 'Code2'
                    });
                    setNewServiceModal(true);
                  }}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl flex items-center gap-2 transition-colors shadow-lg shadow-blue-600/20"
                >
                  <Plus className="w-4 h-4" /> إضافة خدمة جديدة
                </button>
              </div>

              {/* Service Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {services.map((service) => (
                  <div key={service.id} className="bg-slate-950 border border-white/10 rounded-2xl p-4 flex flex-col justify-between hover:border-blue-500/30 transition-all">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-2.5 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs rounded-lg font-mono">
                          الأيقونة: {service.icon}
                        </span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setEditingService(service);
                              setNewServiceModal(true);
                            }}
                            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteService(service.id)}
                            className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <h4 className="font-bold text-white text-base">{service.titleEn}</h4>
                      <p className="text-xs text-slate-400 font-arabic mt-0.5">{service.titleAr}</p>
                      <p className="text-xs text-slate-300 mt-2 line-clamp-2">{service.descEn}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: PROJECTS */}
          {activeTab === 'projects' && (
            <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-sm space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Layers className="w-5 h-5 text-blue-400" /> مشاريع البورتفوليو (Portfolio)
                  </h2>
                  <p className="text-slate-400 text-xs mt-1">إضافة وتعديل وحذف مشاريع سابقة وروابطها.</p>
                </div>
                <button
                  onClick={() => {
                    setEditingProject({
                      titleEn: '',
                      titleAr: '',
                      descriptionEn: '',
                      descriptionAr: '',
                      tech: 'Laravel, MySQL, React',
                      image: '/projects/accounting.png',
                      url: '#'
                    });
                    setNewProjectModal(true);
                  }}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl flex items-center gap-2 transition-colors shadow-lg shadow-blue-600/20"
                >
                  <Plus className="w-4 h-4" /> إضافة مشروع جديد
                </button>
              </div>

              {/* Projects Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {projects.map((project) => (
                  <div key={project.id} className="bg-slate-950 border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all flex flex-col justify-between">
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs text-blue-400 font-mono bg-blue-500/10 px-2 py-0.5 rounded">
                          {project.tech}
                        </span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setEditingProject(project);
                              setNewProjectModal(true);
                            }}
                            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteProject(project.id)}
                            className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <h4 className="font-bold text-white text-base">{project.titleEn}</h4>
                      <p className="text-xs text-slate-400 font-arabic">{project.titleAr}</p>
                      <p className="text-xs text-slate-300 mt-2 line-clamp-2">{project.descriptionEn}</p>
                      
                      {project.url && project.url !== '#' && (
                        <a href={project.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs text-blue-400 hover:underline mt-3">
                          <ExternalLink className="w-3 h-3" /> {project.url}
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: SKILLS & REASONS */}
          {activeTab === 'skills' && (
            <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-sm space-y-8">
              {/* Technical Arsenal */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-blue-400" /> المهارات والتقنيات (Skills)
                  </h2>
                  <button
                    onClick={handleSaveAll}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-md transition-colors"
                  >
                    <Save className="w-3.5 h-3.5" /> حفظ
                  </button>
                </div>
                
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newSkillText}
                    onChange={(e) => setNewSkillText(e.target.value)}
                    placeholder="أضف تقنية (مثال: Next.js, Redis, Docker)..."
                    className="flex-1 bg-slate-950 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                    onKeyDown={(e) => { if (e.key === 'Enter') handleAddSkill(); }}
                  />
                  <button
                    onClick={handleAddSkill}
                    className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-colors"
                  >
                    إضافة
                  </button>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {skills.map((skill, idx) => (
                    <span key={idx} className="px-3 py-1.5 rounded-xl bg-slate-950 border border-white/10 text-xs text-slate-200 flex items-center gap-2">
                      {skill}
                      <button onClick={() => handleDeleteSkill(skill)} className="text-slate-500 hover:text-red-400 font-bold">
                        &times;
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Why Choose Us Reasons */}
              <div className="border-t border-white/10 pt-6 space-y-4">
                <h3 className="text-base font-bold text-white">لماذا تختارنا؟ (ميزات وأسباب الاختيار)</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={newReasonEn}
                    onChange={(e) => setNewReasonEn(e.target.value)}
                    placeholder="نقطة الميزة بالإنجليزية..."
                    className="bg-slate-950 border border-white/10 rounded-xl px-4 py-2 text-xs text-white"
                  />
                  <input
                    type="text"
                    dir="rtl"
                    value={newReasonAr}
                    onChange={(e) => setNewReasonAr(e.target.value)}
                    placeholder="نقطة الميزة بالعربية..."
                    className="bg-slate-950 border border-white/10 rounded-xl px-4 py-2 text-xs text-white"
                  />
                </div>
                <button
                  onClick={handleAddReason}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-colors"
                >
                  <Plus className="w-3.5 h-3.5 inline mr-1" /> إضافة ميزة
                </button>

                <div className="space-y-2 pt-2">
                  {reasons.map((r) => (
                    <div key={r.id} className="p-3 rounded-xl bg-slate-950 border border-white/10 flex items-center justify-between gap-4">
                      <div className="text-xs space-y-1">
                        <p className="text-white font-medium">{r.en}</p>
                        <p className="text-slate-400 font-arabic" dir="rtl">{r.ar}</p>
                      </div>
                      <button
                        onClick={() => handleDeleteReason(r.id)}
                        className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB: CONTACT & FOOTER */}
          {activeTab === 'contact' && (
            <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-sm space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Phone className="w-5 h-5 text-blue-400" /> معلومات التواصل وروابط السوشيال والفوتر
                  </h2>
                  <p className="text-slate-400 text-xs mt-1">تعديل الإيميل، أرقام الهواتف، والواتساب والموقع.</p>
                </div>
                <button
                  onClick={handleSaveAll}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-md transition-colors"
                >
                  <Save className="w-3.5 h-3.5" /> حفظ
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">البريد الإلكتروني للظهور</label>
                  <input
                    type="email"
                    value={formContent.contactEmail || ''}
                    onChange={(e) => handleFieldChange('contactEmail', e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">رقم الهاتف (نص الظهور)</label>
                  <input
                    type="text"
                    value={formContent.contactPhone || ''}
                    onChange={(e) => handleFieldChange('contactPhone', e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">رقم الواتساب (مثال: 201556701167)</label>
                  <input
                    type="text"
                    value={formContent.contactWhatsapp || ''}
                    onChange={(e) => handleFieldChange('contactWhatsapp', e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">الموقع الجغرافي (EN / عربي)</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={formContent.contactLocationEn || ''}
                      onChange={(e) => handleFieldChange('contactLocationEn', e.target.value)}
                      className="bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                      placeholder="Alexandria, Egypt"
                    />
                    <input
                      type="text"
                      dir="rtl"
                      value={formContent.contactLocationAr || ''}
                      onChange={(e) => handleFieldChange('contactLocationAr', e.target.value)}
                      className="bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                      placeholder="الإسكندرية، مصر"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-white/10 pt-6 space-y-4">
                <h3 className="text-xs font-bold text-blue-400 uppercase tracking-wider">روابط السوشيال ميديا والفوتر</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">رابط GitHub</label>
                    <input
                      type="text"
                      value={formContent.githubUrl || ''}
                      onChange={(e) => handleFieldChange('githubUrl', e.target.value)}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">رابط LinkedIn</label>
                    <input
                      type="text"
                      value={formContent.linkedinUrl || ''}
                      onChange={(e) => handleFieldChange('linkedinUrl', e.target.value)}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">رابط Twitter / X</label>
                    <input
                      type="text"
                      value={formContent.twitterUrl || ''}
                      onChange={(e) => handleFieldChange('twitterUrl', e.target.value)}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">وصف الفوتر الفرعي (English)</label>
                    <input
                      type="text"
                      value={formContent.footerTitleEn || ''}
                      onChange={(e) => handleFieldChange('footerTitleEn', e.target.value)}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">وصف الفوتر الفرعي (عربي)</label>
                    <input
                      type="text"
                      dir="rtl"
                      value={formContent.footerTitleAr || ''}
                      onChange={(e) => handleFieldChange('footerTitleAr', e.target.value)}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2 text-xs text-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: SECURITY & CHANGE PASSWORD */}
          {activeTab === 'security' && (
            <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-sm space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <KeyRound className="w-5 h-5 text-blue-400" /> إعدادات الأمان وتغيير كلمة المرور
                </h2>
                <p className="text-slate-400 text-xs mt-1">يمكنك تغيير كلمة مرور لوحة التحكم الخاصة بك هنا في أي وقت.</p>
              </div>

              {passChangeSuccess && (
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
                  <Check className="w-4 h-4" /> {passChangeSuccess}
                </div>
              )}

              {passChangeError && (
                <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
                  {passChangeError}
                </div>
              )}

              <form onSubmit={handleChangePassword} className="space-y-4 max-w-md">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">البريد الإلكتروني للإدارة</label>
                  <input
                    type="email"
                    disabled
                    value={adminEmail}
                    className="w-full bg-slate-950/50 border border-white/5 rounded-xl px-4 py-2.5 text-xs text-slate-400 cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">كلمة المرور الحالية</label>
                  <input
                    type="password"
                    required
                    value={currentPassInput}
                    onChange={(e) => setCurrentPassInput(e.target.value)}
                    placeholder="•••••••••"
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">كلمة المرور الجديدة</label>
                  <input
                    type="password"
                    required
                    value={newPassInput}
                    onChange={(e) => setNewPassInput(e.target.value)}
                    placeholder="•••••••••"
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">تأكيد كلمة المرور الجديدة</label>
                  <input
                    type="password"
                    required
                    value={confirmPassInput}
                    onChange={(e) => setConfirmPassInput(e.target.value)}
                    placeholder="•••••••••"
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-blue-600/20 transition-all"
                >
                  <Save className="w-4 h-4" /> حفظ كلمة المرور الجديدة
                </button>
              </form>
            </div>
          )}
        </main>
      </div>

      {/* SERVICE MODAL */}
      {newServiceModal && editingService && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-white/15 rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-white">
              {editingService.id ? 'تعديل الخدمة' : 'إضافة خدمة جديدة'}
            </h3>

            <form onSubmit={handleSaveService} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">عنوان الخدمة (English)</label>
                <input
                  type="text"
                  required
                  value={editingService.titleEn}
                  onChange={(e) => setEditingService({ ...editingService, titleEn: e.target.value })}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2 text-sm text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">عنوان الخدمة (عربي)</label>
                <input
                  type="text"
                  dir="rtl"
                  required
                  value={editingService.titleAr}
                  onChange={(e) => setEditingService({ ...editingService, titleAr: e.target.value })}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2 text-sm text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">الوصف (English)</label>
                <textarea
                  rows={2}
                  required
                  value={editingService.descEn}
                  onChange={(e) => setEditingService({ ...editingService, descEn: e.target.value })}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">الوصف (عربي)</label>
                <textarea
                  rows={2}
                  dir="rtl"
                  required
                  value={editingService.descAr}
                  onChange={(e) => setEditingService({ ...editingService, descAr: e.target.value })}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">الأيقونة</label>
                <select
                  value={editingService.icon}
                  onChange={(e) => setEditingService({ ...editingService, icon: e.target.value })}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2 text-sm text-white"
                >
                  {availableIcons.map(icon => (
                    <option key={icon.name} value={icon.name}>{icon.label}</option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setNewServiceModal(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-bold"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/20"
                >
                  حفظ الخدمة
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PROJECT MODAL */}
      {newProjectModal && editingProject && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-white/15 rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-white">
              {editingProject.id ? 'تعديل المشروع' : 'إضافة مشروع جديد'}
            </h3>

            <form onSubmit={handleSaveProject} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">عنوان المشروع (English)</label>
                <input
                  type="text"
                  required
                  value={editingProject.titleEn}
                  onChange={(e) => setEditingProject({ ...editingProject, titleEn: e.target.value })}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2 text-sm text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">عنوان المشروع (عربي)</label>
                <input
                  type="text"
                  dir="rtl"
                  required
                  value={editingProject.titleAr}
                  onChange={(e) => setEditingProject({ ...editingProject, titleAr: e.target.value })}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2 text-sm text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">التقنيات المستخدمة (مفصولة بفواصل)</label>
                <input
                  type="text"
                  required
                  value={editingProject.tech}
                  onChange={(e) => setEditingProject({ ...editingProject, tech: e.target.value })}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2 text-sm text-white"
                  placeholder="Laravel, React, MySQL"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">رابط أو مسار الصورة</label>
                <input
                  type="text"
                  required
                  value={editingProject.image}
                  onChange={(e) => setEditingProject({ ...editingProject, image: e.target.value })}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2 text-sm text-white"
                  placeholder="/projects/accounting.png أو رابط صورة"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">رابط المشروع المباشر (اختياري)</label>
                <input
                  type="text"
                  value={editingProject.url}
                  onChange={(e) => setEditingProject({ ...editingProject, url: e.target.value })}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2 text-sm text-white"
                  placeholder="https://..."
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">الوصف (English)</label>
                <textarea
                  rows={2}
                  required
                  value={editingProject.descriptionEn}
                  onChange={(e) => setEditingProject({ ...editingProject, descriptionEn: e.target.value })}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">الوصف (عربي)</label>
                <textarea
                  rows={2}
                  dir="rtl"
                  required
                  value={editingProject.descriptionAr}
                  onChange={(e) => setEditingProject({ ...editingProject, descriptionAr: e.target.value })}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-xs text-white"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setNewProjectModal(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-bold"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/20"
                >
                  حفظ المشروع
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
