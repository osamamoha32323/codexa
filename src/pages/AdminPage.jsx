import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import {
  Building2, Factory, Globe, LayoutDashboard, ShoppingCart, Code2,
  Save, RotateCcw, Plus, Trash2, Edit3, ArrowLeft, ArrowRight,
  ExternalLink, Layers, CheckCircle2, Shield, Eye, Database,
  Download, Upload, Sparkles, Home, Briefcase, Phone, Settings, Info
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
    resetToDefaults,
  } = useContext(AppContext);

  const [activeTab, setActiveTab] = useState('hero');
  const [saveToast, setSaveToast] = useState(false);

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

  const triggerToast = (msg = 'Changes saved successfully!') => {
    setSaveToast(msg);
    setTimeout(() => {
      setSaveToast(false);
    }, 3000);
  };

  const handleExportData = () => {
    const backupData = {
      content,
      services,
      projects,
      skills,
      reasons,
      timestamp: new Date().toISOString(),
    };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backupData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `codexa-backup-${new Date().toISOString().slice(0,10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    triggerToast('Backup exported!');
  };

  const handleImportData = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        if (parsed.content) updateAllContent(parsed.content);
        if (parsed.services) setServices(parsed.services);
        if (parsed.projects) setProjects(parsed.projects);
        if (parsed.skills) setSkills(parsed.skills);
        if (parsed.reasons) setReasons(parsed.reasons);
        triggerToast('Data successfully imported!');
      } catch (err) {
        alert('Invalid JSON backup file');
      }
    };
    reader.readAsText(file);
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
    triggerToast('Project updated successfully!');
  };

  const handleDeleteProject = (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      setProjects(prev => prev.filter(p => p.id !== id));
      triggerToast('Project removed');
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
    triggerToast('Service updated successfully!');
  };

  const handleDeleteService = (id) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      setServices(prev => prev.filter(s => s.id !== id));
      triggerToast('Service removed');
    }
  };

  // --- Skill CRUD ---
  const handleAddSkill = () => {
    if (newSkillText.trim() && !skills.includes(newSkillText.trim())) {
      setSkills(prev => [...prev, newSkillText.trim()]);
      setNewSkillText('');
      triggerToast('Skill added');
    }
  };

  const handleDeleteSkill = (skillToDelete) => {
    setSkills(prev => prev.filter(s => s !== skillToDelete));
    triggerToast('Skill removed');
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
      triggerToast('Advantage point added');
    }
  };

  const handleDeleteReason = (id) => {
    setReasons(prev => prev.filter(r => r.id !== id));
    triggerToast('Advantage point removed');
  };

  const navTabs = [
    { id: 'hero', label: 'General & Hero', icon: <Home className="w-4 h-4" /> },
    { id: 'about', label: 'About Us', icon: <Info className="w-4 h-4" /> },
    { id: 'services', label: 'Services', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'projects', label: 'Projects', icon: <Layers className="w-4 h-4" /> },
    { id: 'skills', label: 'Arsenal & Reasons', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'contact', label: 'Contact & Footer', icon: <Phone className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Toast Notification */}
      {saveToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-blue-600 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-blue-400/30 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-emerald-300" />
          <span className="font-semibold">{saveToast}</span>
        </div>
      )}

      {/* Top Header */}
      <header className="border-b border-white/10 bg-slate-950/80 backdrop-blur-xl px-6 py-4 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link to="/" className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium">
              <ArrowLeft className="w-4 h-4" /> Back to Site
            </Link>
            <div className="h-5 w-[1px] bg-white/10 hidden sm:block"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
                <Shield className="w-4 h-4" />
              </div>
              <h1 className="text-lg font-bold tracking-tight text-white">
                Codexa <span className="text-blue-400 font-normal text-sm">Control Panel</span>
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <label className="cursor-pointer px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-slate-300 flex items-center gap-1.5 transition-colors">
              <Upload className="w-3.5 h-3.5 text-blue-400" />
              Import JSON
              <input type="file" accept=".json" onChange={handleImportData} className="hidden" />
            </label>
            <button
              onClick={handleExportData}
              className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-slate-300 flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              Backup Data
            </button>
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to reset all site content to original defaults?')) {
                  resetToDefaults();
                  triggerToast('Site reset to defaults');
                }
              }}
              className="px-3 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-xs font-medium text-red-400 flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Defaults
            </button>
            <Link
              to="/"
              target="_blank"
              className="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-lg shadow-blue-600/20"
            >
              <Eye className="w-3.5 h-3.5" />
              Live Preview
            </Link>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto w-full px-6 py-8 flex-1 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Left Navigation Sidebar */}
        <aside className="md:col-span-1 space-y-2">
          <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-3 backdrop-blur-sm sticky top-24">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 py-2">
              Website Sections
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
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Database className="w-3.5 h-3.5 text-emerald-400" />
                <span>Auto-saved to LocalStorage</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Right Content Editor */}
        <main className="md:col-span-3 space-y-6">
          
          {/* TAB: HERO & GENERAL */}
          {activeTab === 'hero' && (
            <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-sm space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Home className="w-5 h-5 text-blue-400" /> General & Hero Section
                </h2>
                <p className="text-slate-400 text-sm mt-1">Configure site branding, hero badges, and main headline titles.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Logo Text</label>
                  <input
                    type="text"
                    value={content.navLogo || ''}
                    onChange={(e) => updateContentField('navLogo', e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                    placeholder="Codexa"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Hero Badge (English)</label>
                  <input
                    type="text"
                    value={content.heroBadgeEn || ''}
                    onChange={(e) => updateContentField('heroBadgeEn', e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Hero Badge (Arabic)</label>
                  <input
                    type="text"
                    dir="rtl"
                    value={content.heroBadgeAr || ''}
                    onChange={(e) => updateContentField('heroBadgeAr', e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="border-t border-white/10 pt-6 space-y-4">
                <h3 className="text-sm font-bold text-blue-400 uppercase tracking-wider">Hero Headings</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Title Line 1 (English)</label>
                    <input
                      type="text"
                      value={content.heroTitle1En || ''}
                      onChange={(e) => updateContentField('heroTitle1En', e.target.value)}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Title Line 1 (Arabic)</label>
                    <input
                      type="text"
                      dir="rtl"
                      value={content.heroTitle1Ar || ''}
                      onChange={(e) => updateContentField('heroTitle1Ar', e.target.value)}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Title Line 2 (English)</label>
                    <input
                      type="text"
                      value={content.heroTitle2En || ''}
                      onChange={(e) => updateContentField('heroTitle2En', e.target.value)}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Title Line 2 (Arabic)</label>
                    <input
                      type="text"
                      dir="rtl"
                      value={content.heroTitle2Ar || ''}
                      onChange={(e) => updateContentField('heroTitle2Ar', e.target.value)}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Intro Paragraph (English)</label>
                    <textarea
                      rows={3}
                      value={content.heroIntroEn || ''}
                      onChange={(e) => updateContentField('heroIntroEn', e.target.value)}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Intro Paragraph (Arabic)</label>
                    <textarea
                      rows={3}
                      dir="rtl"
                      value={content.heroIntroAr || ''}
                      onChange={(e) => updateContentField('heroIntroAr', e.target.value)}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Button 1 Text (Projects EN / AR)</label>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={content.heroBtnProjectsEn || ''}
                        onChange={(e) => updateContentField('heroBtnProjectsEn', e.target.value)}
                        className="bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                        placeholder="View Projects"
                      />
                      <input
                        type="text"
                        dir="rtl"
                        value={content.heroBtnProjectsAr || ''}
                        onChange={(e) => updateContentField('heroBtnProjectsAr', e.target.value)}
                        className="bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                        placeholder="شاهد مشاريعنا"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Button 2 Text (Contact EN / AR)</label>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={content.heroBtnContactEn || ''}
                        onChange={(e) => updateContentField('heroBtnContactEn', e.target.value)}
                        className="bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                        placeholder="Contact Us"
                      />
                      <input
                        type="text"
                        dir="rtl"
                        value={content.heroBtnContactAr || ''}
                        onChange={(e) => updateContentField('heroBtnContactAr', e.target.value)}
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
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Info className="w-5 h-5 text-blue-400" /> About Us Section
                </h2>
                <p className="text-slate-400 text-sm mt-1">Manage company description, bio paragraphs, and highlighted badges.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Section Title (English)</label>
                  <input
                    type="text"
                    value={content.aboutTitleEn || ''}
                    onChange={(e) => updateContentField('aboutTitleEn', e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Section Title (Arabic)</label>
                  <input
                    type="text"
                    dir="rtl"
                    value={content.aboutTitleAr || ''}
                    onChange={(e) => updateContentField('aboutTitleAr', e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Paragraph 1 (English)</label>
                  <textarea
                    rows={4}
                    value={content.aboutP1En || ''}
                    onChange={(e) => updateContentField('aboutP1En', e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Paragraph 1 (Arabic)</label>
                  <textarea
                    rows={4}
                    dir="rtl"
                    value={content.aboutP1Ar || ''}
                    onChange={(e) => updateContentField('aboutP1Ar', e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Paragraph 2 (English)</label>
                  <textarea
                    rows={4}
                    value={content.aboutP2En || ''}
                    onChange={(e) => updateContentField('aboutP2En', e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Paragraph 2 (Arabic)</label>
                  <textarea
                    rows={4}
                    dir="rtl"
                    value={content.aboutP2Ar || ''}
                    onChange={(e) => updateContentField('aboutP2Ar', e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-white/10 pt-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Stat Badge 1 (EN / AR)</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={content.aboutStat1En || ''}
                      onChange={(e) => updateContentField('aboutStat1En', e.target.value)}
                      className="bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                    />
                    <input
                      type="text"
                      dir="rtl"
                      value={content.aboutStat1Ar || ''}
                      onChange={(e) => updateContentField('aboutStat1Ar', e.target.value)}
                      className="bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Stat Badge 2 (EN / AR)</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={content.aboutStat2En || ''}
                      onChange={(e) => updateContentField('aboutStat2En', e.target.value)}
                      className="bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                    />
                    <input
                      type="text"
                      dir="rtl"
                      value={content.aboutStat2Ar || ''}
                      onChange={(e) => updateContentField('aboutStat2Ar', e.target.value)}
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
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-blue-400" /> Services Management
                  </h2>
                  <p className="text-slate-400 text-sm mt-1">Add, edit, or remove the services you provide to clients.</p>
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
                  <Plus className="w-4 h-4" /> Add Service
                </button>
              </div>

              {/* Service Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {services.map((service) => (
                  <div key={service.id} className="bg-slate-950 border border-white/10 rounded-2xl p-4 flex flex-col justify-between hover:border-blue-500/30 transition-all">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-2.5 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs rounded-lg font-mono">
                          Icon: {service.icon}
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
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Layers className="w-5 h-5 text-blue-400" /> Portfolio Projects
                  </h2>
                  <p className="text-slate-400 text-sm mt-1">Manage showcased projects, tech stacks, images, and live links.</p>
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
                  <Plus className="w-4 h-4" /> Add Project
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
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-blue-400" /> Technical Arsenal (Skills)
                </h2>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newSkillText}
                    onChange={(e) => setNewSkillText(e.target.value)}
                    placeholder="Add technology (e.g. Next.js, Redis, Docker)..."
                    className="flex-1 bg-slate-950 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                    onKeyDown={(e) => { if (e.key === 'Enter') handleAddSkill(); }}
                  />
                  <button
                    onClick={handleAddSkill}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-colors"
                  >
                    Add
                  </button>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {skills.map((skill, idx) => (
                    <span key={idx} className="px-3 py-1.5 rounded-xl bg-slate-950 border border-white/10 text-xs text-slate-200 flex items-center gap-2">
                      {skill}
                      <button onClick={() => handleDeleteSkill(skill)} className="text-slate-500 hover:text-red-400">
                        &times;
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Why Choose Us Reasons */}
              <div className="border-t border-white/10 pt-6 space-y-4">
                <h3 className="text-base font-bold text-white">Why Choose Us (Advantage Points)</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={newReasonEn}
                    onChange={(e) => setNewReasonEn(e.target.value)}
                    placeholder="Advantage point in English..."
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
                  <Plus className="w-3.5 h-3.5 inline mr-1" /> Add Reason Point
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
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Phone className="w-5 h-5 text-blue-400" /> Contact & Social Links
                </h2>
                <p className="text-slate-400 text-sm mt-1">Configure your email address, phone numbers, location, and social links.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Contact Email</label>
                  <input
                    type="email"
                    value={content.contactEmail || ''}
                    onChange={(e) => updateContentField('contactEmail', e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Phone (Display)</label>
                  <input
                    type="text"
                    value={content.contactPhone || ''}
                    onChange={(e) => updateContentField('contactPhone', e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">WhatsApp Number (e.g. 201556701167)</label>
                  <input
                    type="text"
                    value={content.contactWhatsapp || ''}
                    onChange={(e) => updateContentField('contactWhatsapp', e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Location (English / Arabic)</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={content.contactLocationEn || ''}
                      onChange={(e) => updateContentField('contactLocationEn', e.target.value)}
                      className="bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                      placeholder="Alexandria, Egypt"
                    />
                    <input
                      type="text"
                      dir="rtl"
                      value={content.contactLocationAr || ''}
                      onChange={(e) => updateContentField('contactLocationAr', e.target.value)}
                      className="bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                      placeholder="الإسكندرية، مصر"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-white/10 pt-6 space-y-4">
                <h3 className="text-sm font-bold text-blue-400 uppercase tracking-wider">Social Links & Footer</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">GitHub URL</label>
                    <input
                      type="text"
                      value={content.githubUrl || ''}
                      onChange={(e) => updateContentField('githubUrl', e.target.value)}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">LinkedIn URL</label>
                    <input
                      type="text"
                      value={content.linkedinUrl || ''}
                      onChange={(e) => updateContentField('linkedinUrl', e.target.value)}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Twitter / X URL</label>
                    <input
                      type="text"
                      value={content.twitterUrl || ''}
                      onChange={(e) => updateContentField('twitterUrl', e.target.value)}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Footer Subtitle (English)</label>
                    <input
                      type="text"
                      value={content.footerTitleEn || ''}
                      onChange={(e) => updateContentField('footerTitleEn', e.target.value)}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Footer Subtitle (Arabic)</label>
                    <input
                      type="text"
                      dir="rtl"
                      value={content.footerTitleAr || ''}
                      onChange={(e) => updateContentField('footerTitleAr', e.target.value)}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2 text-xs text-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* SERVICE MODAL */}
      {newServiceModal && editingService && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-white/15 rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-white">
              {editingService.id ? 'Edit Service' : 'Add New Service'}
            </h3>

            <form onSubmit={handleSaveService} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Title (English)</label>
                <input
                  type="text"
                  required
                  value={editingService.titleEn}
                  onChange={(e) => setEditingService({ ...editingService, titleEn: e.target.value })}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2 text-sm text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Title (Arabic)</label>
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
                <label className="block text-xs font-semibold text-slate-300 mb-1">Description (English)</label>
                <textarea
                  rows={2}
                  required
                  value={editingService.descEn}
                  onChange={(e) => setEditingService({ ...editingService, descEn: e.target.value })}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Description (Arabic)</label>
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
                <label className="block text-xs font-semibold text-slate-300 mb-1">Icon Style</label>
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
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/20"
                >
                  Save Service
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
              {editingProject.id ? 'Edit Project' : 'Add New Project'}
            </h3>

            <form onSubmit={handleSaveProject} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Project Title (English)</label>
                <input
                  type="text"
                  required
                  value={editingProject.titleEn}
                  onChange={(e) => setEditingProject({ ...editingProject, titleEn: e.target.value })}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2 text-sm text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Project Title (Arabic)</label>
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
                <label className="block text-xs font-semibold text-slate-300 mb-1">Tech Stack (comma-separated)</label>
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
                <label className="block text-xs font-semibold text-slate-300 mb-1">Image URL / Path</label>
                <input
                  type="text"
                  required
                  value={editingProject.image}
                  onChange={(e) => setEditingProject({ ...editingProject, image: e.target.value })}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2 text-sm text-white"
                  placeholder="/projects/accounting.png or URL"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Live Project Link (optional)</label>
                <input
                  type="text"
                  value={editingProject.url}
                  onChange={(e) => setEditingProject({ ...editingProject, url: e.target.value })}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2 text-sm text-white"
                  placeholder="https://..."
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Description (English)</label>
                <textarea
                  rows={2}
                  required
                  value={editingProject.descriptionEn}
                  onChange={(e) => setEditingProject({ ...editingProject, descriptionEn: e.target.value })}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Description (Arabic)</label>
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
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/20"
                >
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
