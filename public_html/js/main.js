/**
 * Vartijaksi.com - Main JavaScript
 * Handles: Theme toggle, mobile menu, TOC highlighting, smooth scroll
 */

(function() {
    'use strict';

    // ===================
    // Theme Toggle
    // ===================
    const themeToggle = document.getElementById('theme-toggle');

    function setTheme(theme) {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }

    function toggleTheme() {
        const isDark = document.documentElement.classList.contains('dark');
        setTheme(isDark ? 'light' : 'dark');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    // Listen for system preference changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });

    // ===================
    // Mobile Menu
    // ===================
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');

    let focusableElements = [];
    let firstFocusable = null;
    let lastFocusable = null;

    function openMobileMenu() {
        if (!mobileMenu || !mobileMenuOverlay) return;

        mobileMenu.classList.add('active');
        mobileMenuOverlay.classList.add('active');
        mobileMenu.setAttribute('aria-hidden', 'false');
        mobileMenuOverlay.setAttribute('aria-hidden', 'false');
        mobileMenuButton.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';

        // Set up focus trap
        focusableElements = mobileMenu.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        firstFocusable = focusableElements[0];
        lastFocusable = focusableElements[focusableElements.length - 1];

        // Focus the close button
        if (mobileMenuClose) {
            mobileMenuClose.focus();
        }
    }

    function closeMobileMenu() {
        if (!mobileMenu || !mobileMenuOverlay) return;

        mobileMenu.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        mobileMenu.setAttribute('aria-hidden', 'true');
        mobileMenuOverlay.setAttribute('aria-hidden', 'true');
        mobileMenuButton.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';

        // Return focus to the menu button
        if (mobileMenuButton) {
            mobileMenuButton.focus();
        }
    }

    function handleMobileMenuKeydown(e) {
        if (!mobileMenu.classList.contains('active')) return;

        // Close on Escape
        if (e.key === 'Escape') {
            closeMobileMenu();
            return;
        }

        // Focus trap
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    e.preventDefault();
                    lastFocusable.focus();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    e.preventDefault();
                    firstFocusable.focus();
                }
            }
        }
    }

    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', openMobileMenu);
    }

    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', closeMobileMenu);
    }

    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', closeMobileMenu);
    }

    document.addEventListener('keydown', handleMobileMenuKeydown);

    // Close mobile menu on resize to desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 1024 && mobileMenu && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    // ===================
    // Table of Contents Highlighting
    // ===================
    const tocLinks = document.querySelectorAll('.toc-link');
    const sections = [];

    // Gather sections that correspond to TOC links
    tocLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
            const section = document.querySelector(href);
            if (section) {
                sections.push({
                    id: href.substring(1),
                    element: section,
                    link: link
                });
            }
        }
    });

    function updateTocHighlight() {
        if (sections.length === 0) return;

        const scrollPosition = window.scrollY + 150; // Offset for sticky header

        let currentSection = sections[0];

        for (const section of sections) {
            if (section.element.offsetTop <= scrollPosition) {
                currentSection = section;
            }
        }

        tocLinks.forEach(link => {
            link.classList.remove('active');
        });

        if (currentSection && currentSection.link) {
            currentSection.link.classList.add('active');
        }
    }

    if (sections.length > 0) {
        // Use passive listener for better scroll performance
        window.addEventListener('scroll', updateTocHighlight, { passive: true });
        // Initial highlight
        updateTocHighlight();
    }

    // ===================
    // Smooth Scroll for Anchor Links
    // ===================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();

                // Check if user prefers reduced motion
                const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

                if (prefersReducedMotion) {
                    target.scrollIntoView();
                } else {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }

                // Update URL without scrolling
                history.pushState(null, null, href);

                // Set focus for accessibility
                target.setAttribute('tabindex', '-1');
                target.focus({ preventScroll: true });
            }
        });
    });

    // ===================
    // FAQ Accessibility Enhancement
    // ===================
    const detailsElements = document.querySelectorAll('details');

    detailsElements.forEach(details => {
        const summary = details.querySelector('summary');
        if (summary) {
            // Ensure proper ARIA attributes
            summary.setAttribute('role', 'button');
            summary.setAttribute('aria-expanded', details.open ? 'true' : 'false');

            details.addEventListener('toggle', () => {
                summary.setAttribute('aria-expanded', details.open ? 'true' : 'false');
            });
        }
    });

    // ===================
    // Skip Link Enhancement
    // ===================
    const skipLink = document.querySelector('.skip-link');
    const mainContent = document.getElementById('main-content');

    if (skipLink && mainContent) {
        skipLink.addEventListener('click', (e) => {
            e.preventDefault();
            mainContent.setAttribute('tabindex', '-1');
            mainContent.focus();
            mainContent.scrollIntoView();
        });
    }

})();
