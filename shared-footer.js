// Shared Footer Component for Shaminder.sg
// This script injects a consistent footer across all pages

(function() {
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

    // Inject CSS for the footer
    const style = document.createElement('style');
    style.textContent = `
        /* Shared Footer Styles */
        .shared-footer {
            background: var(--bg-dark);
            border-top: 1px solid rgba(0, 245, 255, 0.1);
            padding: 40px 20px;
            margin-top: 3rem;
        }

        .shared-footer .footer-container {
            max-width: 1200px;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 32px;
        }

        /* Brand Section */
        .shared-footer .footer-brand {
            display: flex;
            align-items: center;
            gap: 16px;
        }

        .shared-footer .footer-brand img {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            border: 2px solid var(--neon-cyan);
            box-shadow: 0 0 15px rgba(0, 245, 255, 0.3);
        }

        .shared-footer .footer-brand-text {
            font-family: 'Space Grotesk', sans-serif;
            font-weight: 700;
            font-size: 20px;
            background: linear-gradient(90deg, var(--neon-cyan), var(--neon-pink));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        /* Navigation Links */
        .shared-footer .footer-nav {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 24px;
        }

        .shared-footer .footer-nav a {
            color: var(--text-gray);
            font-size: 14px;
            text-decoration: none;
            transition: color 0.3s;
        }

        .shared-footer .footer-nav a:hover {
            color: var(--neon-cyan);
        }

        /* Trust Badges */
        .shared-footer .footer-badges {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-items: center;
            gap: 16px;
        }

        .shared-footer .footer-badges a {
            transition: transform 0.2s;
        }

        .shared-footer .footer-badges a:hover {
            transform: scale(1.05);
        }

        .shared-footer .badge-ssl {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: linear-gradient(135deg, #166534, #15803d);
            padding: 10px 16px;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(22, 101, 52, 0.3);
        }

        .shared-footer .badge-ssl span {
            color: #ffffff;
            font-size: 11px;
            font-weight: 700;
        }

        .shared-footer .badge-sg {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: linear-gradient(135deg, #dc2626, #b91c1c);
            padding: 10px 16px;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(185, 28, 28, 0.3);
        }

        .shared-footer .badge-sg span {
            color: #ffffff;
            font-size: 11px;
            font-weight: 700;
        }

        .shared-footer .badge-payments {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            background: #ffffff;
            padding: 8px 14px;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        /* Copyright Section */
        .shared-footer .footer-bottom {
            text-align: center;
            color: #606070;
            font-size: 13px;
        }

        .shared-footer .footer-legal {
            display: flex;
            gap: 16px;
            margin-bottom: 12px;
            flex-wrap: wrap;
            justify-content: center;
        }

        .shared-footer .footer-legal a {
            color: #b4b4b4;
            font-size: 13px;
            text-decoration: none;
            transition: color 0.3s;
        }

        .shared-footer .footer-legal a:hover {
            color: var(--neon-cyan);
        }

        @media (max-width: 600px) {
            .shared-footer .footer-nav {
                gap: 16px;
            }
            .shared-footer .footer-badges {
                gap: 12px;
            }
        }
    `;
    document.head.appendChild(style);

    // Create the footer HTML
    const footerHTML = `
    <footer class="shared-footer">
        <div class="footer-container">
            <!-- Brand Section -->
            <div class="footer-brand">
                <img src="${basePath}shaminder.jpg" alt="Shaminder.sg">
                <span class="footer-brand-text">shaminder.sg</span>
            </div>

            <!-- Navigation Links -->
            <div class="footer-nav">
                <a href="${basePath}index.html#solution">Services</a>
                <a href="${basePath}index.html#portfolio">Portfolio</a>
                <a href="${basePath}industries/">Industries</a>
                <a href="${basePath}tools/">Free Tools</a>
                <a href="${basePath}blog/">Blog</a>
                <a href="${basePath}blog/feed.xml" title="RSS Feed"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style="vertical-align: middle; margin-right: 4px;"><path d="M6.18 15.64a2.18 2.18 0 0 1 2.18 2.18C8.36 19 7.38 20 6.18 20C5 20 4 19 4 17.82a2.18 2.18 0 0 1 2.18-2.18M4 4.44A15.56 15.56 0 0 1 19.56 20h-2.83A12.73 12.73 0 0 0 4 7.27V4.44m0 5.66a9.9 9.9 0 0 1 9.9 9.9h-2.83A7.07 7.07 0 0 0 4 12.93V10.1Z"/></svg>RSS</a>
                <a href="${basePath}index.html#contact">Contact</a>
            </div>

            <!-- Trust Badges -->
            <div class="footer-badges">
                <!-- Bark Badge -->
                <a href="https://www.bark.com/en/sg/company/shamindersg/Raqal/" target="_blank" rel="noopener noreferrer">
                    <img src="${basePath}bark-badge.png" alt="Bark Professional" style="height: 60px; width: auto; border-radius: 4px;">
                </a>
                <!-- SSL Secure Badge -->
                <div class="badge-ssl">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="#ffffff"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/></svg>
                    <span>SSL SECURE</span>
                </div>
                <!-- Singapore Business Badge -->
                <div class="badge-sg">
                    <span style="font-size: 14px;">&#127480;&#127468;</span>
                    <span>SINGAPORE BUSINESS</span>
                </div>
                <!-- Payment Methods -->
                <div class="badge-payments">
                    <svg width="32" height="20" viewBox="0 0 48 32"><rect fill="#1a1f71" width="48" height="32" rx="4"/><text x="24" y="20" fill="#fff" font-size="10" font-weight="bold" text-anchor="middle" font-family="Arial">VISA</text></svg>
                    <svg width="32" height="20" viewBox="0 0 48 32"><rect fill="#000" width="48" height="32" rx="4"/><circle cx="18" cy="16" r="10" fill="#eb001b"/><circle cx="30" cy="16" r="10" fill="#f79e1b"/></svg>
                    <svg width="32" height="20" viewBox="0 0 48 32"><rect fill="#003087" width="48" height="32" rx="4"/><text x="24" y="19" fill="#fff" font-size="8" font-weight="bold" text-anchor="middle" font-family="Arial">PayPal</text></svg>
                </div>
                <!-- GOLD SEO & Speed Badge -->
                <a href="${basePath}tools/website-grader.html" target="_blank" style="display:inline-block;text-decoration:none;font-family:system-ui,sans-serif">
                    <div style="position:relative;display:flex;align-items:center">
                        <div style="position:absolute;left:-8px;top:50%;transform:translateY(-50%);width:0;height:0;border-top:14px solid transparent;border-bottom:14px solid transparent;border-right:10px solid #B8860B"></div>
                        <div style="display:flex;align-items:center;gap:8px;padding:6px 14px 6px 10px;border-radius:4px;background:linear-gradient(180deg,#FFD700 0%, #D4A500 50%, #B8860B 100%);box-shadow:0 2px 8px rgba(255,215,0,0.4),inset 0 1px 0 rgba(255,255,255,0.3)">
                            <div style="width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:900;color:#1a1a1a;background:linear-gradient(135deg,#FFF8DC,#FFD700);border:2px solid rgba(0,0,0,0.2)">92</div>
                            <div style="display:flex;flex-direction:column;line-height:1.1">
                                <span style="font-size:7px;font-weight:700;color:rgba(0,0,0,0.6);text-transform:uppercase;letter-spacing:0.5px">SEO & Speed</span>
                                <span style="font-size:13px;font-weight:900;color:#1a1a1a">GOLD</span>
                            </div>
                        </div>
                        <div style="position:absolute;right:-12px;top:50%;transform:translateY(-50%);width:16px;height:28px;background:linear-gradient(180deg,#D4A500,#8B6914);clip-path:polygon(0 0,100% 50%,0 100%)"></div>
                    </div>
                </a>
            </div>

            <!-- Copyright -->
            <div class="footer-bottom">
                <div class="footer-legal">
                    <a href="${basePath}terms-of-service.html">Terms of Service</a>
                    <a href="${basePath}privacy-policy.html">Privacy Policy</a>
                    <a href="${basePath}sitemap.xml">Sitemap</a>
                </div>
                &copy; 2026 Shaminder Technologies. Singapore. | UEN: 53517126J
            </div>
        </div>
    </footer>
    `;

    // Remove any existing footer elements
    const existingFooters = document.querySelectorAll('footer, .footer');
    existingFooters.forEach(footer => {
        // Don't remove if it's inside a specific component (like a card)
        if (!footer.closest('.card, .modal, .popup')) {
            footer.remove();
        }
    });

    // Insert the footer at the end of body
    document.body.insertAdjacentHTML('beforeend', footerHTML);
})();
