import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Sun, Moon, Palette } from 'lucide-react';
import { useApp } from '../context/AppContext';
import AppearanceModal from './AppearanceModal';
import { THEME_OPTIONS } from '../data/themes';

export default function Navbar() {
  const { language, setLanguage, theme, setTheme, t } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [isAppearanceOpen, setIsAppearanceOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const scrollRafRef = useRef<number | null>(null);
  const appearanceTriggerRef = useRef<HTMLButtonElement | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { name: t('nav.inicio'), id: 'inicio' },
    { name: t('nav.projetos'), id: 'projetos' },
    { name: t('nav.experiencia'), id: 'experiencia' },
    { name: t('nav.tecnologias'), id: 'tecnologias' },
    { name: t('nav.contato'), id: 'contato' },
  ];

  const scrolledRef = useRef(false);

  // Scroll listener and IntersectionObserver to update active section reliably & sticky shadow without layout thrashing
  useEffect(() => {
    if (location.pathname !== '/') {
      setActiveSection('');
      return;
    }

    const sectionIds = ['inicio', 'projetos', 'experiencia', 'tecnologias', 'contato'];

    // 1. Smooth hysteresis scroll handler for sticky shadow and edge bounds
    const handleScroll = () => {
      if (scrollRafRef.current !== null) return;
      scrollRafRef.current = requestAnimationFrame(() => {
        scrollRafRef.current = null;
        const currentY = window.scrollY;

        // Sticky shadow with hysteresis to avoid re-render flapping around the threshold
        const isScrolled = scrolledRef.current ? currentY > 15 : currentY > 35;
        if (isScrolled !== scrolledRef.current) {
          scrolledRef.current = isScrolled;
          setScrolled(isScrolled);
        }

        // Top of page guarantee
        if (currentY < 80) {
          setActiveSection('inicio');
          return;
        }

        // Bottom of page guarantee for contact section
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = window.innerHeight;
        if (clientHeight + currentY >= scrollHeight - 70) {
          setActiveSection('contato');
        }
      });
    };

    // 2. High-performance IntersectionObserver for active section detection
    // Root margin creates a focused active band in the upper half of viewport
    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: '-15% 0px -55% 0px',
      threshold: [0, 0.2, 0.5],
    };

    const sectionVisibilityMap = new Map<string, number>();

    const observer = new IntersectionObserver((entries) => {
      // Don't override if near the very top of page
      if (window.scrollY < 80) {
        setActiveSection('inicio');
        return;
      }

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          sectionVisibilityMap.set(entry.target.id, entry.intersectionRatio);
        } else {
          sectionVisibilityMap.delete(entry.target.id);
        }
      });

      // Find the most visible section in the active band
      let highestRatio = -1;
      let mostVisibleId = '';
      sectionVisibilityMap.forEach((ratio, id) => {
        if (ratio > highestRatio) {
          highestRatio = ratio;
          mostVisibleId = id;
        }
      });

      if (mostVisibleId) {
        setActiveSection(mostVisibleId);
      }
    }, observerOptions);

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
      if (scrollRafRef.current !== null) {
        cancelAnimationFrame(scrollRafRef.current);
        scrollRafRef.current = null;
      }
    };
  }, [location.pathname]);

  // Handle hash scrolling only on dynamic route navigation, NEVER on initial mount
  const isInitialMountRef = React.useRef(true);
  useEffect(() => {
    if (isInitialMountRef.current) {
      isInitialMountRef.current = false;
      if (location.pathname === '/') {
        setActiveSection('inicio');
      }
      return;
    }

    if (location.pathname === '/' && location.hash) {
      const targetId = location.hash.replace('#', '');
      if (targetId === 'inicio') {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        setActiveSection('inicio');
        return;
      }

      const element = document.getElementById(targetId);
      if (element) {
        const navOffset = (document.getElementById('main-navbar')?.offsetHeight ?? 65) + 16;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
        setActiveSection(targetId);
      }
    } else if (location.pathname === '/' && !location.hash) {
      setActiveSection('inicio');
    }
  }, [location.pathname, location.hash]);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Handle escape key to close menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Lock background body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const scrollToSection = (targetId: string, e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setIsOpen(false);

    if (location.pathname !== '/') {
      navigate(`/#${targetId}`);
      return;
    }

    setActiveSection(targetId);

    if (targetId === 'inicio') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      window.history.pushState(null, '', '#inicio');
      return;
    }

    const element = document.getElementById(targetId);
    if (element) {
      const navOffset = (document.getElementById('main-navbar')?.offsetHeight ?? 65) + 16;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      window.history.pushState(null, '', `#${targetId}`);
    }
  };

  return (
    <nav
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color] duration-200 border-b ${
        isOpen
          ? 'bg-theme-bg border-theme-border py-4 sm:py-5'
          : scrolled
            ? 'editorial-nav py-4 sm:py-5 border-theme-border'
            : 'bg-theme-bg/90 backdrop-blur-sm py-4 sm:py-5 border-theme-border/60'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 flex items-center justify-between min-h-[32px]">
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-7 ml-auto">
          <ul className="flex items-center gap-6 text-[13px] font-normal">
            {navLinks.map((link) => {
              const isActive = location.pathname === '/' && activeSection === link.id;

              return (
                <li key={link.id}>
                  <a
                    href={`/#${link.id}`}
                    onClick={(e) => scrollToSection(link.id, e)}
                    className={`transition-colors duration-150 relative py-1 cursor-pointer bg-transparent border-none ${
                      isActive
                        ? 'text-theme-text font-medium'
                        : 'text-theme-dim hover:text-theme-text'
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-theme-text pointer-events-none transition-opacity duration-150" />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="h-3 w-[1px] bg-theme-border" />

          {/* Controls: Language and Theme */}
          <div className="flex items-center gap-3">
            {/* Lang switcher */}
            <div className="flex items-center text-xs font-mono text-theme-dim">
              <button
                onClick={() => setLanguage('pt')}
                className={`px-1 py-0.5 transition-colors cursor-pointer ${
                  language === 'pt'
                    ? 'text-theme-text font-semibold underline underline-offset-4'
                    : 'text-theme-muted hover:text-theme-text'
                }`}
              >
                PT
              </button>
              <span className="text-theme-border mx-0.5">/</span>
              <button
                onClick={() => setLanguage('en')}
                className={`px-1 py-0.5 transition-colors cursor-pointer ${
                  language === 'en'
                    ? 'text-theme-text font-semibold underline underline-offset-4'
                    : 'text-theme-muted hover:text-theme-text'
                }`}
              >
                EN
              </button>
            </div>

            {/* Quick toggle Dark / Light (Preserva o comportamento atual) */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-1 text-theme-muted hover:text-theme-text transition-colors cursor-pointer"
              title={theme === 'dark' ? (language === 'en' ? 'Switch to light mode' : 'Mudar para modo claro') : (language === 'en' ? 'Switch to dark mode' : 'Mudar para modo escuro')}
              aria-label="Toggle light dark theme"
            >
              {theme === 'light' ? (
                <Moon className="w-3.5 h-3.5" />
              ) : (
                <Sun className="w-3.5 h-3.5" />
              )}
            </button>

            {/* Configurações → Aparência (Modal de paletas e temas) */}
            <button
              ref={appearanceTriggerRef}
              onClick={() => setIsAppearanceOpen(true)}
              className="p-1 text-theme-muted hover:text-theme-text transition-colors cursor-pointer flex items-center gap-1 group/palette"
              title={language === 'en' ? 'Settings → Appearance (Themes)' : 'Configurações → Aparência (Temas)'}
              aria-label={language === 'en' ? 'Settings → Appearance' : 'Configurações → Aparência'}
            >
              <Palette className="w-3.5 h-3.5 transition-transform group-hover/palette:scale-110" />
            </button>
          </div>

        </div>

        {/* Mobile Menu Toggle & Theme */}
        <div className="flex items-center gap-2 md:hidden ml-auto">
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-1.5 text-theme-dim hover:text-theme-text cursor-pointer"
            aria-label="Toggle theme"
            title={theme === 'dark' ? 'Mudar para modo claro' : 'Mudar para modo escuro'}
          >
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setIsAppearanceOpen(true)}
            className="p-1.5 text-theme-dim hover:text-theme-text cursor-pointer"
            aria-label={language === 'en' ? 'Appearance settings' : 'Configurações de aparência'}
            title={language === 'en' ? 'Appearance' : 'Aparência'}
          >
            <Palette className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-theme-text p-1.5 cursor-pointer"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Editorial Drawer with Backdrop, Animation and Outside-Click */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 top-[65px] z-40 md:hidden flex flex-col justify-start">
            {/* Backdrop Overlay to close on clicking outside */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 top-[65px] bg-black/60 -z-10"
              aria-hidden="true"
            />

            {/* Solid Drawer Content with smooth slide-down + fade-in animation */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="w-full bg-theme-bg border-b border-theme-border shadow-2xl p-6 flex flex-col justify-between max-h-[calc(100vh-65px)] overflow-y-auto"
            >
              <div className="space-y-4">
                <span className="text-xs font-mono uppercase tracking-widest text-theme-muted block mb-2">
                  {language === 'pt' ? 'Navegação' : 'Navigation'}
                </span>
                <ul className="flex flex-col divide-y divide-theme-border-subtle">
                  {navLinks.map((link) => {
                    const isActive = location.pathname === '/' && activeSection === link.id;

                    return (
                      <li key={link.id} className="py-3">
                        <a
                          href={`/#${link.id}`}
                          onClick={(e) => scrollToSection(link.id, e)}
                          className="w-full flex items-center justify-between text-left cursor-pointer group bg-transparent border-none"
                        >
                          <span
                            className={`text-base tracking-tight ${
                              isActive ? 'text-theme-text font-medium' : 'text-theme-dim'
                            }`}
                          >
                            {link.name}
                          </span>
                          {isActive && (
                            <span aria-hidden="true" className="h-px w-6 bg-theme-text" />
                          )}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="pt-6 mt-6 border-t border-theme-border space-y-4">
                <div className="flex items-center justify-between text-xs font-mono text-theme-dim">
                  <span>{language === 'pt' ? 'Idioma' : 'Language'}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setLanguage('pt')}
                      className={`cursor-pointer ${language === 'pt' ? 'text-theme-text font-bold underline' : ''}`}
                    >
                      PT
                    </button>
                    <span>/</span>
                    <button
                      onClick={() => setLanguage('en')}
                      className={`cursor-pointer ${language === 'en' ? 'text-theme-text font-bold underline' : ''}`}
                    >
                      EN
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs font-mono text-theme-dim pt-3 border-t border-theme-border-subtle">
                  <span>{language === 'pt' ? 'Aparência' : 'Appearance'}</span>
                  <button
                    type="button"
                    onClick={() => {
                      setIsOpen(false);
                      setIsAppearanceOpen(true);
                    }}
                    className="inline-flex items-center gap-1.5 text-theme-text hover:underline cursor-pointer"
                  >
                    <Palette className="w-3.5 h-3.5 text-theme-muted" />
                    <span>
                      {THEME_OPTIONS.find((t) => t.id === theme)?.[language === 'en' ? 'nameEn' : 'namePt'] || theme}
                    </span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AppearanceModal
        isOpen={isAppearanceOpen}
        onClose={() => setIsAppearanceOpen(false)}
        triggerElement={appearanceTriggerRef.current}
      />
    </nav>
  );
}
