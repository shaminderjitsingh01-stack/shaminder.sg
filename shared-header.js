// Shared Header Component for Shaminder.sg
// This script injects a consistent navbar across all pages

(function() {
    // ===== THEME SYSTEM =====
    // Apply saved theme immediately to prevent flash
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    }

    // Inject theme CSS variables (works site-wide)
    const themeStyles = document.createElement('style');
    themeStyles.textContent = `
        /* Light theme (default) */
        :root {
            --bg-dark: #f8f9fa;
            --bg-card: rgba(255, 255, 255, 0.9);
            --bg-card-solid: #ffffff;
            --navbar-bg: rgba(255, 255, 255, 0.95);
            --neon-cyan: #0891b2;
            --neon-pink: #db2777;
            --neon-purple: #9333ea;
            --neon-green: #059669;
            --neon-orange: #ea580c;
            --text-white: #1f2937;
            --text-gray: #4b5563;
            --text-muted: #6b7280;
            --border: rgba(0, 0, 0, 0.08);
            --glow-cyan: 0 4px 14px rgba(8, 145, 178, 0.25);
            --glow-pink: 0 4px 14px rgba(219, 39, 119, 0.25);
            --glow-green: 0 4px 14px rgba(5, 150, 105, 0.25);
            --btn-primary-bg: linear-gradient(135deg, #22d3ee, #67e8f9);
            --btn-primary-hover: linear-gradient(135deg, #67e8f9, #a5f3fc);
            --btn-glow: 0 4px 20px rgba(34, 211, 238, 0.3);
        }

        /* Dark theme */
        [data-theme="dark"] {
            --bg-dark: #0a0a0f;
            --bg-card: rgba(15, 15, 25, 0.8);
            --bg-card-solid: #0f0f19;
            --navbar-bg: rgba(10, 10, 15, 0.9);
            --neon-cyan: #00f5ff;
            --neon-pink: #ff00aa;
            --neon-purple: #bf00ff;
            --neon-green: #00ff88;
            --neon-orange: #ff6b00;
            --text-white: #ffffff;
            --text-gray: #a0a0b0;
            --text-muted: #8a8a9a;
            --border: rgba(255, 255, 255, 0.08);
            --glow-cyan: 0 0 20px rgba(0, 245, 255, 0.5), 0 0 40px rgba(0, 245, 255, 0.3);
            --glow-pink: 0 0 20px rgba(255, 0, 170, 0.5), 0 0 40px rgba(255, 0, 170, 0.3);
            --glow-green: 0 0 20px rgba(0, 255, 136, 0.5), 0 0 40px rgba(0, 255, 136, 0.3);
            --btn-primary-bg: linear-gradient(135deg, var(--neon-cyan), #00c4cc);
            --btn-primary-hover: linear-gradient(135deg, #00c4cc, var(--neon-cyan));
            --btn-glow: 0 0 20px rgba(0, 245, 255, 0.4);
        }

        /* Base body styling */
        body {
            background: var(--bg-dark);
            color: var(--text-white);
            transition: background-color 0.3s ease, color 0.3s ease;
        }

        /* Theme toggle button */
        .theme-toggle {
            position: absolute;
            right: 140px;
            background: transparent;
            border: 2px solid var(--neon-cyan);
            border-radius: 50%;
            width: 40px;
            height: 40px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
            color: var(--neon-cyan);
        }
        .theme-toggle:hover {
            background: var(--neon-cyan);
            color: var(--bg-dark);
        }
        .theme-toggle svg {
            width: 20px;
            height: 20px;
        }
        @media (max-width: 1024px) {
            .theme-toggle {
                right: 70px;
                width: 36px;
                height: 36px;
            }
        }
    `;
    document.head.insertBefore(themeStyles, document.head.firstChild);

    // Determine base path based on current page location
    const path = window.location.pathname;
    let basePath = '';

    // Check if we're in a subdirectory
    if (path.includes('/tools/') || path.includes('/blog/') || path.includes('/industries/') || path.includes('/services/') || path.includes('/referrals/')) {
        basePath = '../';
    }

    // For deeper nested pages (e.g., /blog/category/post.html)
    const depth = (path.match(/\//g) || []).length;
    if (depth > 2) {
        basePath = '../'.repeat(depth - 1);
    }

    // Inject favicon tags if not already present
    if (!document.querySelector('link[rel="icon"]')) {
        const faviconTags = `
            <link rel="icon" type="image/png" href="${basePath}favicon.png">
            <link rel="apple-touch-icon" href="${basePath}favicon.png">
            <meta name="theme-color" content="var(--neon-cyan)">
        `;
        document.head.insertAdjacentHTML('afterbegin', faviconTags);
    }

    // Inject CSS for the navbar
    const style = document.createElement('style');
    style.textContent = `
        /* Navigation CSS */
        .navbar {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 1000;
            padding: 16px 40px;
            display: flex;
            justify-content: center;
            align-items: center;
            background: var(--navbar-bg);
            backdrop-filter: blur(20px);
            border-bottom: 1px solid var(--border);
        }

        .navbar .logo {
            position: absolute;
            left: 40px;
            display: flex;
            align-items: center;
            gap: 12px;
            text-decoration: none;
        }

        .navbar .logo img {
            height: 44px;
            width: 44px;
            border-radius: 50%;
            object-fit: cover;
            border: 2px solid var(--neon-cyan);
            box-shadow: 0 0 20px rgba(0, 245, 255, 0.5), 0 0 40px rgba(0, 245, 255, 0.3);
        }

        .navbar .logo-text {
            font-family: 'Space Grotesk', sans-serif;
            font-weight: 700;
            font-size: 18px;
            background: linear-gradient(90deg, var(--neon-cyan), var(--neon-pink));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .navbar .nav-links {
            display: flex;
            list-style: none;
            gap: 32px;
            margin: 0;
            padding: 0;
        }

        .navbar .nav-links a {
            color: var(--text-gray);
            font-size: 14px;
            font-weight: 500;
            transition: all 0.3s ease;
            position: relative;
            text-decoration: none;
        }

        .navbar .nav-links a::after {
            content: '';
            position: absolute;
            bottom: -4px;
            left: 0;
            width: 0;
            height: 2px;
            background: var(--neon-cyan);
            box-shadow: 0 0 20px rgba(0, 245, 255, 0.5);
            transition: width 0.3s ease;
        }

        .navbar .nav-links a:hover {
            color: var(--neon-cyan);
            text-shadow: 0 0 10px rgba(0, 245, 255, 0.5);
        }

        .navbar .nav-links a:hover::after {
            width: 100%;
        }

        /* Dropdown Menu */
        .navbar .nav-dropdown {
            position: relative;
        }

        .navbar .nav-dropdown > a {
            display: flex;
            align-items: center;
            gap: 4px;
        }

        .navbar .dropdown-arrow {
            width: 12px;
            height: 12px;
            transition: transform 0.3s;
        }

        .navbar .nav-dropdown:hover .dropdown-arrow {
            transform: rotate(180deg);
        }

        .navbar .dropdown-menu {
            position: fixed;
            top: 70px;
            left: 50%;
            transform: translateX(-50%);
            width: 95%;
            max-width: 1100px;
            background: var(--navbar-bg);
            backdrop-filter: blur(20px);
            border: 1px solid var(--border);
            border-radius: 16px;
            padding: 24px;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s;
            z-index: 1000;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
        }

        .navbar .nav-dropdown:hover .dropdown-menu {
            opacity: 1;
            visibility: visible;
        }

        .navbar .mega-menu-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            padding-bottom: 16px;
            border-bottom: 1px solid var(--border);
        }

        .navbar .mega-menu-title {
            font-family: 'Space Grotesk', sans-serif;
            font-size: 18px;
            font-weight: 600;
            color: var(--text-white);
        }

        .navbar .mega-menu-link {
            font-size: 13px;
            color: var(--neon-cyan);
            display: flex;
            align-items: center;
            gap: 4px;
            text-decoration: none;
        }

        .navbar .mega-menu-link:hover {
            text-decoration: underline;
        }

        .navbar .mega-menu-grid {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 8px;
        }

        @media (max-width: 1000px) {
            .navbar .mega-menu-grid {
                grid-template-columns: repeat(3, 1fr);
            }
        }

        @media (max-width: 700px) {
            .navbar .mega-menu-grid {
                grid-template-columns: repeat(2, 1fr);
            }
        }

        .navbar .dropdown-menu a {
            display: flex;
            align-items: flex-start;
            gap: 12px;
            padding: 12px;
            color: var(--text-gray);
            border-radius: 10px;
            transition: all 0.2s;
            background: rgba(255, 255, 255, 0.02);
            border: 1px solid transparent;
            text-decoration: none;
        }

        .navbar .dropdown-menu a:hover {
            background: rgba(0, 245, 255, 0.08);
            border-color: rgba(0, 245, 255, 0.2);
            color: #fff;
            transform: translateY(-2px);
        }

        .navbar .dropdown-menu a::after {
            display: none;
        }

        .navbar .dropdown-icon {
            width: 24px;
            height: 24px;
            flex-shrink: 0;
            padding: 4px;
            background: rgba(0, 245, 255, 0.1);
            border-radius: 6px;
        }

        .navbar .dropdown-icon.orange { background: rgba(255, 107, 0, 0.15); color: var(--neon-orange); }
        .navbar .dropdown-icon.green { background: rgba(0, 255, 136, 0.15); color: var(--neon-green); }
        .navbar .dropdown-icon.purple { background: rgba(191, 0, 255, 0.15); color: var(--neon-purple); }
        .navbar .dropdown-icon.cyan { background: rgba(0, 245, 255, 0.15); color: var(--neon-cyan); }
        .navbar .dropdown-icon.pink { background: rgba(255, 0, 170, 0.15); color: var(--neon-pink); }

        .navbar .dropdown-text {
            display: flex;
            flex-direction: column;
            min-width: 0;
        }

        .navbar .dropdown-title {
            font-weight: 500;
            font-size: 12px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .navbar .dropdown-desc {
            font-size: 10px;
            color: #606070;
            margin-top: 2px;
        }

        .navbar .tool-badge {
            display: inline-block;
            padding: 2px 6px;
            background: rgba(0, 255, 136, 0.15);
            color: var(--neon-green);
            border-radius: 4px;
            font-size: 9px;
            font-weight: 600;
            margin-left: 6px;
            text-transform: uppercase;
        }

        .navbar .btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            padding: 10px 18px;
            border-radius: 8px;
            font-weight: 600;
            font-size: 14px;
            cursor: pointer;
            transition: all 0.3s ease;
            border: none;
            position: relative;
            overflow: hidden;
            text-decoration: none;
            white-space: nowrap;
        }

        .navbar .btn-neon {
            background: transparent;
            color: var(--neon-cyan);
            border: 2px solid var(--neon-cyan);
            box-shadow: 0 0 20px rgba(0, 245, 255, 0.5), 0 0 40px rgba(0, 245, 255, 0.3), inset 0 0 20px rgba(0, 245, 255, 0.1);
        }

        .navbar .btn-neon:hover {
            background: var(--neon-cyan);
            color: var(--bg-dark);
            transform: translateY(-2px);
            box-shadow: 0 0 20px rgba(0, 245, 255, 0.5), 0 0 40px rgba(0, 245, 255, 0.3);
        }

        .navbar .mobile-menu-btn {
            display: none;
            flex-direction: column;
            gap: 5px;
            background: none;
            border: none;
            cursor: pointer;
            padding: 5px;
            z-index: 1001;
        }

        .navbar .mobile-menu-btn span {
            width: 24px;
            height: 2px;
            background: var(--neon-cyan);
            transition: all 0.3s;
        }

        @media (max-width: 1024px) {
            .navbar .nav-links { display: none; }
            .navbar .mobile-menu-btn {
                display: flex;
                position: absolute;
                right: 20px;
                top: 50%;
                transform: translateY(-50%);
                z-index: 1002;
                padding: 10px;
                cursor: pointer;
            }
            .navbar { padding: 16px 20px; }
        }

        @media (max-width: 768px) {
            .navbar .btn-neon {
                padding: 10px 16px !important;
                font-size: 13px !important;
            }
            .navbar .btn-neon span {
                display: none;
            }
            .navbar .btn-neon svg {
                margin: 0;
            }
        }

        @media (max-width: 480px) {
            .navbar .btn-neon {
                padding: 8px 12px !important;
            }
        }

        /* Mobile Navigation */
        .mobile-nav {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: var(--navbar-bg);
            backdrop-filter: blur(20px);
            z-index: 9999;
            display: none;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            gap: 16px;
            padding: 100px 20px 40px;
            overflow-y: auto;
        }

        .mobile-nav.open { display: flex; }

        .mobile-nav-close {
            position: absolute;
            top: 20px;
            right: 20px;
            width: 44px;
            height: 44px;
            background: transparent;
            border: 2px solid var(--neon-cyan);
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
        }

        .mobile-nav-close svg {
            width: 24px;
            height: 24px;
            stroke: var(--neon-cyan);
        }

        .mobile-nav-close:hover {
            background: var(--neon-cyan);
        }

        .mobile-nav-close:hover svg {
            stroke: var(--bg-dark);
        }

        .mobile-nav a {
            color: #fff;
            font-size: 18px;
            font-weight: 500;
            text-decoration: none;
            transition: color 0.3s;
        }

        .mobile-nav a:hover { color: var(--neon-cyan); }

        .mobile-nav .mobile-cta {
            margin-top: 20px;
            padding: 16px 32px;
            background: linear-gradient(135deg, var(--neon-green), #00cc6a);
            color: #000;
            border-radius: 8px;
            font-weight: 600;
        }

        /* Mobile Tools Dropdown */
        .mobile-nav-dropdown {
            width: 100%;
        }

        .mobile-nav-trigger {
            background: none;
            border: none;
            color: #fff;
            font-size: 18px;
            font-weight: 500;
            padding: 16px 0;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 8px;
            cursor: pointer;
        }

        .mobile-nav-trigger:hover { color: var(--neon-cyan); }

        .mobile-nav-trigger svg {
            width: 16px;
            height: 16px;
            transition: transform 0.3s;
        }

        .mobile-nav-dropdown.open .mobile-nav-trigger svg {
            transform: rotate(180deg);
        }

        .mobile-tools-grid {
            display: none;
            padding: 16px 0;
        }

        .mobile-nav-dropdown.open .mobile-tools-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 8px;
        }

        .mobile-tools-grid a {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 12px;
            background: rgba(255, 255, 255, 0.03);
            border-radius: 8px;
            color: var(--text-gray);
            font-size: 13px;
            text-decoration: none;
            transition: all 0.2s;
        }

        .mobile-tools-grid a:hover {
            background: rgba(0, 245, 255, 0.1);
            color: var(--neon-cyan);
        }

        .mobile-tools-grid svg {
            width: 20px;
            height: 20px;
            flex-shrink: 0;
        }

        .mobile-tools-grid .view-all {
            grid-column: span 2;
            justify-content: center;
            background: linear-gradient(135deg, rgba(0, 245, 255, 0.15), rgba(191, 0, 255, 0.15));
            color: var(--neon-cyan);
            font-weight: 500;
        }
    `;
    document.head.appendChild(style);

    // Create the navbar HTML with ALL 20 tools
    const navbarHTML = `
    <nav class="navbar" id="shared-navbar" role="navigation" aria-label="Main navigation">
        <a href="${basePath}index.html" class="logo">
            <img src="${basePath}shaminder.jpg" alt="Shaminder.sg Logo">
            <span class="logo-text">shaminder.sg</span>
        </a>
        <ul class="nav-links">
            <li><a href="${basePath}index.html#solution">What We Do</a></li>
            <li class="nav-dropdown">
                <a href="${basePath}services/">Services <svg class="dropdown-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg></a>
                <div class="dropdown-menu">
                    <div class="mega-menu-header">
                        <span class="mega-menu-title">Digital Growth Services</span>
                        <a href="${basePath}services/" class="mega-menu-link">View All <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg></a>
                    </div>
                    <div class="mega-menu-grid">
                        <a href="${basePath}services/website-design.html">
                            <svg class="dropdown-icon cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                            <span class="dropdown-text"><span class="dropdown-title">Website Design</span><span class="dropdown-desc">From $1,500</span></span>
                        </a>
                        <a href="${basePath}services/ai-automation.html">
                            <svg class="dropdown-icon pink" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                            <span class="dropdown-text"><span class="dropdown-title">AI Automation</span><span class="dropdown-desc">From $1,000/mo</span></span>
                        </a>
                        <a href="${basePath}services/content-marketing.html">
                            <svg class="dropdown-icon green" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                            <span class="dropdown-text"><span class="dropdown-title">Content Marketing</span><span class="dropdown-desc">From $800/mo</span></span>
                        </a>
                        <a href="${basePath}services/seo.html">
                            <svg class="dropdown-icon orange" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                            <span class="dropdown-text"><span class="dropdown-title">SEO</span><span class="dropdown-desc">From $1,200/mo</span></span>
                        </a>
                        <a href="${basePath}services/dashboards-analytics.html">
                            <svg class="dropdown-icon purple" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
                            <span class="dropdown-text"><span class="dropdown-title">Dashboards</span><span class="dropdown-desc">From $2,000</span></span>
                        </a>
                        <a href="${basePath}services/email-marketing.html">
                            <svg class="dropdown-icon cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                            <span class="dropdown-text"><span class="dropdown-title">Email Marketing</span><span class="dropdown-desc">From $1,500/mo</span></span>
                        </a>
                        <a href="${basePath}services/chatbot.html">
                            <svg class="dropdown-icon purple" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
                            <span class="dropdown-text"><span class="dropdown-title">Chatbot</span><span class="dropdown-desc">From $800</span></span>
                        </a>
                        <a href="${basePath}services/ecommerce.html">
                            <svg class="dropdown-icon green" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
                            <span class="dropdown-text"><span class="dropdown-title">E-commerce</span><span class="dropdown-desc">From $2,000</span></span>
                        </a>
                        <a href="${basePath}services/branding.html">
                            <svg class="dropdown-icon pink" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"/></svg>
                            <span class="dropdown-text"><span class="dropdown-title">Branding & Logo</span><span class="dropdown-desc">From $700</span></span>
                        </a>
                        <a href="${basePath}services/crm.html">
                            <svg class="dropdown-icon orange" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                            <span class="dropdown-text"><span class="dropdown-title">CRM Setup</span><span class="dropdown-desc">From $2,000</span></span>
                        </a>
                    </div>
                </div>
            </li>
            <li><a href="${basePath}index.html#portfolio">Case Study</a></li>
            <li><a href="${basePath}industries/">Industries</a></li>
            <li><a href="${basePath}referrals/">Partners</a></li>
            <li class="nav-dropdown">
                <a href="${basePath}tools/">Free Tools <svg class="dropdown-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg></a>
                <div class="dropdown-menu">
                    <div class="mega-menu-header">
                        <span class="mega-menu-title">Free Business Tools</span>
                        <a href="${basePath}tools/" class="mega-menu-link">View All 20 Tools <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg></a>
                    </div>
                    <div class="mega-menu-grid">
                        <a href="${basePath}tools/website-calculator.html">
                            <svg class="dropdown-icon cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>
                            <span class="dropdown-text"><span class="dropdown-title">Website Calculator</span><span class="dropdown-desc">Get pricing estimates</span></span>
                        </a>
                        <a href="${basePath}tools/website-grader.html">
                            <svg class="dropdown-icon green" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                            <span class="dropdown-text"><span class="dropdown-title">SEO & Speed Checker</span><span class="dropdown-desc">Analyze performance</span></span>
                        </a>
                        <a href="${basePath}tools/invoice-generator.html">
                            <svg class="dropdown-icon pink" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                            <span class="dropdown-text"><span class="dropdown-title">Invoice Generator</span><span class="dropdown-desc">GST-compliant invoices</span></span>
                        </a>
                        <a href="${basePath}tools/qr-generator.html">
                            <svg class="dropdown-icon orange" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h2M4 12h2m10 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"/></svg>
                            <span class="dropdown-text"><span class="dropdown-title">QR Code Generator</span><span class="dropdown-desc">Custom QR with logo</span></span>
                        </a>
                        <a href="${basePath}tools/email-signature.html">
                            <svg class="dropdown-icon purple" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
                            <span class="dropdown-text"><span class="dropdown-title">Email Signature</span><span class="dropdown-desc">Professional signatures</span></span>
                        </a>
                        <a href="${basePath}tools/media-compressor.html">
                            <svg class="dropdown-icon cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                            <span class="dropdown-text"><span class="dropdown-title">Media Compressor & Converter</span><span class="dropdown-desc">Compress & convert images/videos</span></span>
                        </a>
                        <a href="${basePath}tools/business-name-generator.html">
                            <svg class="dropdown-icon orange" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>
                            <span class="dropdown-text"><span class="dropdown-title">Name Generator</span><span class="dropdown-desc">Business name ideas</span></span>
                        </a>
                        <a href="${basePath}tools/gst-calculator.html">
                            <svg class="dropdown-icon green" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>
                            <span class="dropdown-text"><span class="dropdown-title">GST Calculator</span><span class="dropdown-desc">Singapore 9% GST</span></span>
                        </a>
                        <a href="${basePath}tools/whatsapp-link-generator.html">
                            <svg class="dropdown-icon green" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/></svg>
                            <span class="dropdown-text"><span class="dropdown-title">WhatsApp Link</span><span class="dropdown-desc">Click-to-chat links</span></span>
                        </a>
                        <a href="${basePath}tools/color-palette-generator.html">
                            <svg class="dropdown-icon pink" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"/></svg>
                            <span class="dropdown-text"><span class="dropdown-title">Color Palette</span><span class="dropdown-desc">Brand color schemes</span></span>
                        </a>
                        <a href="${basePath}tools/privacy-policy-generator.html">
                            <svg class="dropdown-icon purple" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                            <span class="dropdown-text"><span class="dropdown-title">Privacy Policy</span><span class="dropdown-desc">PDPA compliant</span></span>
                        </a>
                        <a href="${basePath}tools/linkedin-post-generator.html">
                            <svg class="dropdown-icon cyan" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                            <span class="dropdown-text"><span class="dropdown-title">LinkedIn Posts</span><span class="dropdown-desc">Hook templates</span></span>
                        </a>
                        <a href="${basePath}tools/cold-email-generator.html">
                            <svg class="dropdown-icon orange" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                            <span class="dropdown-text"><span class="dropdown-title">Cold Emails</span><span class="dropdown-desc">Outreach templates</span></span>
                        </a>
                        <a href="${basePath}tools/headline-analyzer.html">
                            <svg class="dropdown-icon pink" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/></svg>
                            <span class="dropdown-text"><span class="dropdown-title">Headline Analyzer</span><span class="dropdown-desc">Score your headlines</span></span>
                        </a>
                        <a href="${basePath}tools/meta-tag-generator.html">
                            <svg class="dropdown-icon green" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>
                            <span class="dropdown-text"><span class="dropdown-title">Meta Tag Generator</span><span class="dropdown-desc">SEO meta tags</span></span>
                        </a>
                        <a href="${basePath}tools/roi-calculator.html">
                            <svg class="dropdown-icon purple" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
                            <span class="dropdown-text"><span class="dropdown-title">ROI Calculator</span><span class="dropdown-desc">Marketing ROI</span></span>
                        </a>
                        <a href="${basePath}tools/proposal-generator.html">
                            <svg class="dropdown-icon cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                            <span class="dropdown-text"><span class="dropdown-title">Proposal Generator</span><span class="dropdown-desc">Business proposals</span></span>
                        </a>
                        <a href="${basePath}tools/pdf-merge-split.html">
                            <svg class="dropdown-icon orange" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>
                            <span class="dropdown-text"><span class="dropdown-title">PDF Tools</span><span class="dropdown-desc">Merge & split PDFs</span></span>
                        </a>
                        <a href="${basePath}tools/link-in-bio.html">
                            <svg class="dropdown-icon pink" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/></svg>
                            <span class="dropdown-text"><span class="dropdown-title">Link in Bio</span><span class="dropdown-desc">Bio link page</span></span>
                        </a>
                        <a href="${basePath}tools/content-calendar.html">
                            <svg class="dropdown-icon green" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                            <span class="dropdown-text"><span class="dropdown-title">Content Calendar</span><span class="dropdown-desc">Plan your content</span></span>
                        </a>
                    </div>
                </div>
            </li>
            <li><a href="${basePath}blog/">Blog</a></li>
            <li><a href="${basePath}index.html#contact">Contact</a></li>
        </ul>
        <button class="theme-toggle" aria-label="Toggle theme">
            <svg class="sun-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="display: none;">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
            </svg>
            <svg class="moon-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
            </svg>
        </button>
        <button class="mobile-menu-btn" aria-label="Menu"><span></span><span></span><span></span></button>
    </nav>
    <div class="mobile-nav">
        <button class="mobile-nav-close" aria-label="Close menu">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
        <a href="${basePath}index.html#solution">What We Do</a>
        <a href="${basePath}services/">Services</a>
        <a href="${basePath}index.html#portfolio">Case Study</a>
        <a href="${basePath}industries/">Industries</a>
        <a href="${basePath}referrals/">Partners</a>
        <div class="mobile-nav-dropdown">
            <button class="mobile-nav-trigger">
                Free Tools
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
            </button>
            <div class="mobile-tools-grid">
                <a href="${basePath}tools/website-calculator.html"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>Website Calculator</a>
                <a href="${basePath}tools/website-grader.html"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>SEO Checker</a>
                <a href="${basePath}tools/email-signature.html"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>Email Signature</a>
                <a href="${basePath}tools/qr-generator.html"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h2M4 12h2m10 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"/></svg>QR Generator</a>
                <a href="${basePath}tools/invoice-generator.html"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>Invoice Generator</a>
                <a href="${basePath}tools/media-compressor.html"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>Media Compressor</a>
                <a href="${basePath}tools/business-name-generator.html"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>Name Generator</a>
                <a href="${basePath}tools/whatsapp-link-generator.html"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/></svg>WhatsApp Link</a>
                <a href="${basePath}tools/color-palette-generator.html"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"/></svg>Color Palette</a>
                <a href="${basePath}tools/privacy-policy-generator.html"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>Privacy Policy</a>
                <a href="${basePath}tools/linkedin-post-generator.html"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>LinkedIn Posts</a>
                <a href="${basePath}tools/cold-email-generator.html"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>Cold Emails</a>
                <a href="${basePath}tools/gst-calculator.html"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>GST Calculator</a>
                <a href="${basePath}tools/headline-analyzer.html"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/></svg>Headline Analyzer</a>
                <a href="${basePath}tools/meta-tag-generator.html"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>Meta Tags</a>
                <a href="${basePath}tools/roi-calculator.html"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>ROI Calculator</a>
                <a href="${basePath}tools/proposal-generator.html"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>Proposals</a>
                <a href="${basePath}tools/pdf-merge-split.html"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>PDF Tools</a>
                <a href="${basePath}tools/link-in-bio.html"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/></svg>Link in Bio</a>
                <a href="${basePath}tools/content-calendar.html"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>Content Calendar</a>
                <a href="${basePath}tools/" class="view-all">View All 20 Tools</a>
            </div>
        </div>
        <a href="${basePath}blog/">Blog</a>
        <a href="${basePath}index.html#contact">Contact</a>
    </div>
    `;

    // Remove any existing navbar/header elements
    const existingNavbar = document.querySelector('.navbar, .header, nav.navbar, header.header');
    if (existingNavbar) {
        existingNavbar.remove();
    }

    const existingMobileNav = document.querySelector('.mobile-nav');
    if (existingMobileNav) {
        existingMobileNav.remove();
    }

    // Insert the new navbar at the beginning of body
    document.body.insertAdjacentHTML('afterbegin', navbarHTML);

    // Add padding to body to account for fixed navbar
    document.body.style.paddingTop = '80px';

    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.navbar .mobile-menu-btn');
    const mobileNav = document.querySelector('.mobile-nav');

    if (mobileMenuBtn && mobileNav) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileNav.classList.toggle('open');
            this.classList.toggle('active');
            document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
        });

        // Close button handler
        const closeBtn = mobileNav.querySelector('.mobile-nav-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                mobileNav.classList.remove('open');
                mobileMenuBtn.classList.remove('active');
                document.body.style.overflow = '';
            });
        }

        // Close mobile nav when clicking a link (except dropdown trigger)
        mobileNav.querySelectorAll('a:not(.mobile-nav-trigger)').forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.classList.remove('open');
                mobileMenuBtn.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // Mobile tools dropdown toggle
    const mobileDropdown = document.querySelector('.mobile-nav .mobile-nav-dropdown');
    const mobileDropdownTrigger = document.querySelector('.mobile-nav .mobile-nav-trigger');

    if (mobileDropdownTrigger && mobileDropdown) {
        mobileDropdownTrigger.addEventListener('click', function(e) {
            e.preventDefault();
            mobileDropdown.classList.toggle('open');
        });
    }

    // ===== FLOATING SOCIAL BAR =====
    const pageUrl = encodeURIComponent(window.location.href);
    const pageTitle = encodeURIComponent(document.title);

    // Social bar CSS
    const socialStyle = document.createElement('style');
    socialStyle.textContent = `
        .social-float-bar {
            position: fixed;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            z-index: 997;
            display: flex;
            flex-direction: column;
            gap: 2px;
            background: var(--navbar-bg);
            border: 1px solid var(--border);
            border-left: none;
            border-radius: 0 12px 12px 0;
            padding: 8px 6px;
            backdrop-filter: blur(10px);
            box-shadow: 4px 0 20px rgba(0, 0, 0, 0.1);
        }
        .social-float-bar .share-count {
            text-align: center;
            padding: 8px 4px;
            border-bottom: 1px solid var(--border);
            margin-bottom: 6px;
        }
        .social-float-bar .count-num {
            font-family: 'Space Grotesk', sans-serif;
            font-size: 18px;
            font-weight: 700;
            color: var(--neon-cyan);
            display: block;
        }
        .social-float-bar .count-label {
            font-size: 9px;
            color: var(--text-gray);
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .social-float-bar a,
        .social-float-bar button {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
            border-radius: 8px;
            border: none;
            background: transparent;
            color: var(--text-gray);
            cursor: pointer;
            transition: all 0.3s ease;
            text-decoration: none;
        }
        .social-float-bar a:hover,
        .social-float-bar button:hover {
            transform: scale(1.1);
        }
        .social-float-bar svg {
            width: 20px;
            height: 20px;
        }
        .social-float-bar .fb:hover { background: #1877f2; color: #fff; }
        .social-float-bar .tw:hover { background: #000; color: #fff; }
        .social-float-bar .li:hover { background: #0a66c2; color: #fff; }
        .social-float-bar .wa:hover { background: #25d366; color: #fff; }
        .social-float-bar .cp:hover { background: var(--neon-cyan); color: var(--bg-dark); }
        .social-float-bar .cp.copied { background: var(--neon-green); color: var(--bg-dark); }
        @media (max-width: 768px) {
            .social-float-bar {
                top: auto;
                bottom: 0;
                left: 0;
                right: 0;
                transform: none;
                flex-direction: row;
                justify-content: center;
                border-radius: 0;
                border: none;
                border-top: 1px solid var(--border);
                padding: 8px 10px;
                padding-bottom: max(8px, env(safe-area-inset-bottom));
            }
            .social-float-bar .share-count {
                border-bottom: none;
                border-right: 1px solid var(--border);
                margin-bottom: 0;
                margin-right: 8px;
                padding: 4px 10px 4px 4px;
            }
            .social-float-bar a,
            .social-float-bar button {
                width: 40px;
                height: 40px;
            }
            .social-float-bar svg {
                width: 18px;
                height: 18px;
            }
            .social-float-bar .count-num { font-size: 14px; }
            .social-float-bar .count-label { font-size: 8px; }
        }
    `;
    document.head.appendChild(socialStyle);

    // Social bar HTML with real click counter
    const socialBarHTML = `
    <div class="social-float-bar">
        <div class="share-count">
            <span class="count-num" id="share-counter">0</span>
            <span class="count-label">Shares</span>
        </div>
        <a href="https://www.facebook.com/sharer/sharer.php?u=${pageUrl}" target="_blank" rel="noopener" class="fb" title="Share on Facebook" onclick="trackShare()">
            <svg fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
        </a>
        <a href="https://twitter.com/intent/tweet?url=${pageUrl}&text=${pageTitle}" target="_blank" rel="noopener" class="tw" title="Share on X" onclick="trackShare()">
            <svg fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
        </a>
        <a href="https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}" target="_blank" rel="noopener" class="li" title="Share on LinkedIn" onclick="trackShare()">
            <svg fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
        </a>
        <a href="https://wa.me/?text=${pageTitle}%20${pageUrl}" target="_blank" rel="noopener" class="wa" title="Share on WhatsApp" onclick="trackShare()">
            <svg fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/></svg>
        </a>
        <button class="cp" title="Copy link" onclick="copyLink(this)">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
        </button>
    </div>
    `;

    document.body.insertAdjacentHTML('beforeend', socialBarHTML);

    // Share counter - universal count
    const counterEl = document.getElementById('share-counter');
    let currentCount = 0;

    // Fetch current count
    fetch('https://api.counterapi.dev/v1/shamindersg/shares/')
        .then(r => r.json())
        .then(data => {
            currentCount = data.count || 0;
            counterEl.textContent = currentCount;
        })
        .catch(() => {});

    window.trackShare = function() {
        // Immediate visual feedback
        currentCount++;
        counterEl.textContent = currentCount;
        // Sync with server
        fetch('https://api.counterapi.dev/v1/shamindersg/shares/up')
            .then(r => r.json())
            .then(data => {
                currentCount = data.count || currentCount;
                counterEl.textContent = currentCount;
            })
            .catch(() => {});
    };

    window.copyLink = function(btn) {
        navigator.clipboard.writeText(window.location.href).then(() => {
            btn.classList.add('copied');
            trackShare();
            setTimeout(() => btn.classList.remove('copied'), 2000);
        });
    };

    // ===== THEME TOGGLE HANDLER =====
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        // Update icon based on current theme
        function updateThemeIcon() {
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            const sunIcon = themeToggle.querySelector('.sun-icon');
            const moonIcon = themeToggle.querySelector('.moon-icon');
            if (sunIcon && moonIcon) {
                sunIcon.style.display = isDark ? 'block' : 'none';
                moonIcon.style.display = isDark ? 'none' : 'block';
            }
        }
        updateThemeIcon();

        // Toggle theme on click
        themeToggle.addEventListener('click', function() {
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            if (isDark) {
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
            }
            updateThemeIcon();
        });
    }
})();
