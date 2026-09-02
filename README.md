# 💻 Codexa — Software House & Enterprise Web Solutions Platform

![React 18](https://img.shields.io/badge/React-18.2-61DAFB?style=flat-square&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-5.1-646CFF?style=flat-square&logo=vite&logoColor=white)
![TailwindCSS v3](https://img.shields.io/badge/TailwindCSS-v3.4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.0-FF0055?style=flat-square&logo=framer&logoColor=white)
![Lucide Icons](https://img.shields.io/badge/Lucide_Icons-0.358-F56565?style=flat-square)
![Vercel Edge](https://img.shields.io/badge/Vercel-Edge_CDN-000000?style=flat-square&logo=vercel&logoColor=white)
![License MIT](https://img.shields.io/badge/License-MIT-green?style=flat-square)

A production-ready, high-performance web platform and digital solutions hub engineered for **Codexa**, an Egyptian software house delivering tailored enterprise systems, export trading portals, admin dashboards, and custom web applications.

---

## 📸 Project Showcase & Screenshots

### 1. 🏠 Homepage (Hero Showcase & Matrix Cyber Rain)
Dynamic matrix canvas animation with bilingual localization switcher (AR/EN), value pillars, and fast-track RFQ conversion triggers.

![Homepage Hero](./docs/screenshots/01_homepage_hero.png)

---

### 2. ⚙️ Execution Methodology & 6-Step Engineering Workflow
Structured, predictable delivery workflow from initial discovery, architecture design, and UI prototyping to coding, QA testing, and scalable launch.

![Workflow Methodology](./docs/screenshots/02_workflow_methodology.png)

---

### 3. 💎 Core Value Proposition & Value Pillars
Highlights company strengths: bespoke custom development, bank-grade data security, scalable clean architecture, and continuous technical support.

![Why Choose Codexa](./docs/screenshots/03_why_choose_codexa.png)

---

### 4. 👑 Executive Admin Management Dashboard (`/admin`)
Secured administration panel for live website content editing, case study publishing, technology matrix tuning, and incoming client quote tracking.

![Admin Control Panel](./docs/screenshots/04_admin_dashboard.png)

---

## 🌟 Key Features

### 🌐 Client & Public Portal
- **Multilingual Support (i18n)**: Seamless full English and Arabic localization with comprehensive Right-to-Left (RTL) layout switching.
- **Matrix Cyber Canvas Animation**: Custom lightweight HTML5 canvas rain effect tailored for cyber & software house branding.
- **Interactive Project Quote & Cost Funnel**: Multi-step interactive estimation and quote builder connecting directly with WhatsApp Web & Email.
- **Dynamic Case Studies & Portfolio**: Real-world business solution showcases with live links, feature breakdowns, and deliverables.
- **Responsive & Modern UI**: Built with React 18, Tailwind CSS, Framer Motion transitions, and Lucide vector icons.

### 🛡️ Admin Dashboard (`/admin`)
- **Authentication Gateway**: Protected session-scoped admin credentials with instant login guard and persistent session storage.
- **Live Content CMS**: Real-time editor for hero titles, intro copy, service cards, methodology steps, and why-us propositions.
- **Case Study Manager**: Add, edit, or remove client projects with tags, metrics, descriptions, and media links.
- **Quote Requests & Inquiries Inbox**: Centralized dashboard to view, filter, review, and track status for all inbound client inquiries.
- **Instant Client-Side Persistence**: Zero-database latency with automatic synchronization to browser local storage.

---

## 🗄️ Application Architecture & State Management

Powered by **React Context API** coupled with unified browser storage synchronization for zero-latency offline-ready content updates.

```mermaid
graph TD
    A[Client Browser / Visitor] -->|Access https://codexa-xx.vercel.app| B[Vercel Global Edge Network]
    B --> C[Vite Single Page Application]
    
    subgraph Client Application Layer
        C --> D[AppContext Provider]
        D --> E[Locale & RTL Controller (AR / EN)]
        D --> F[Live Content Store (CMS)]
        D --> G[Client RFQ & Quote Engine]
        
        C --> H[Public HomePage View]
        H --> H1[Matrix Rain Canvas]
        H --> H2[Services & Capabilities]
        H --> H3[Case Studies Showcase]
        H --> H4[Interactive Quote Funnel]
        
        C --> I[Secured Admin Dashboard '/admin']
        I --> I1[Session Auth Safeguard]
        I --> I2[Site CMS Live Editor]
        I --> I3[Project Portfolio Publisher]
        I --> I4[Leads & Inquiries Tracker]
    end
    
    subgraph Data Synchronization Layer
        F <--> J[(Browser LocalStorage & SessionStorage)]
        G --> K[Direct WhatsApp API Integration]
        G --> L[Direct Email Dispatch Gateway]
    end
```

---

## ☁️ Production Architecture & Deployment

The application is deployed on **Vercel Global Edge Network** with automated CI/CD pipeline, SSL/TLS certificates, and SPA client rewrites.

```
[ 🌐 Global Web Clients ]
           │
           ▼
[ 🛡️ Vercel Edge CDN ] (Automated SSL • HTTP/3 • Gzip/Brotli Compression)
           │
           ▼
[ ⚡ React 18 + Vite SPA Bundle ]
           │
    ┌──────┴──────────────────────────┐
    ▼                                 ▼
[ 🏠 Public Landing Platform ]   [ 👑 Admin CMS Dashboard ]
(Dual Language RTL/LTR • Canvas) (Session Storage Auth • Dynamic CMS)
```

### Deployment Stack:
- **Hosting Platform**: Vercel Edge Network
- **Build Engine**: Vite 5
- **Routing Configuration**: `vercel.json` SPA wildcard rewrite (`/(.*) -> /index.html`)
- **Security & Headers**: Strict HTTPS enforcement, isolated client storage, and zero-leak version control.

---

## 🏗️ Project Structure

```
codexa/
├── docs/
│   └── screenshots/             # Showcase UI previews (Hero, Workflow, Features, Admin)
├── public/
│   ├── favicon.svg              # Brand SVG Favicon & Identity Icons
│   └── projects/                # Case studies & client project assets
├── src/
│   ├── context/
│   │   └── AppContext.jsx       # Global State, Content Presets & CMS Engine
│   ├── pages/
│   │   ├── HomePage.jsx         # Public Landing View, Matrix Canvas & Quote Engine
│   │   └── AdminPage.jsx        # Protected CMS Dashboard & Lead Inbox
│   ├── App.jsx                  # SPA Router Configuration (Routes: '/' & '/admin')
│   ├── index.css                # Global Tailwind directives & Typography
│   └── main.jsx                 # Application Bootstrap Entry Point
├── .env.example                 # Environment variables configuration template
├── .gitignore                   # Version control exclusion rules
├── index.html                   # HTML5 Entry Point & Metadata Headers
├── package.json                 # Project Dependencies & Build Scripts
├── postcss.config.js            # PostCSS Processing Pipeline
├── tailwind.config.js           # Custom Tailwind Theme, Colors & Gradients
├── vercel.json                  # SPA Route Rewrites for Production Hosting
└── vite.config.js               # Vite 5 Bundler Configuration
```

---

## 🚀 Getting Started (Local Development)

### Prerequisites
- **Node.js**: `>= 18.x`
- **npm** or **yarn**

### 1. Clone the repository
```bash
git clone https://github.com/osamamoha32323/codexa.git
cd codexa
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Copy the `.env.example` template:
```bash
cp .env.example .env
```

Review variables in `.env`:
```env
VITE_APP_NAME="Codexa Software House"
VITE_SITE_URL="https://codexa-xx.vercel.app"
VITE_CONTACT_EMAIL="osama.mohamedr3d33@gmail.com"
VITE_CONTACT_PHONE="+201556701167"
```

### 4. Start Development Server
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

- **Public Platform**: `http://localhost:5173/`
- **Admin Control Panel**: `http://localhost:5173/admin`

### 5. Build for Production
```bash
npm run build
```

---

## 🔒 Security Best Practices Implemented

- 🛡️ **Zero Secret Exposure**: Strict `.gitignore` policy preventing leak of production `.env` files or credentials.
- 🛡️ **Session-Scoped Auth Guard**: Protected administration routes preventing unauthorized view rendering.
- 🛡️ **Isolated Data Storage**: Local CMS overrides and user inquiries are safely partitioned within browser storage contexts.
- 🛡️ **SPA Routing Protection**: `vercel.json` rewrite configuration preventing `404 Not Found` errors on direct deep navigation.

---

## 📄 License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.

---

Developed with ❤️ by **Osama Mohamed**  
*Software Developer & Cybersecurity Engineer*  
- **GitHub**: [@osamamoha32323](https://github.com/osamamoha32323)  
- **Live Demo**: [codexa-xx.vercel.app](https://codexa-xx.vercel.app)
