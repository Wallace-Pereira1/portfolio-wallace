import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { THEME_OPTIONS } from '../data/themes';

export default function Navbar() {
  const { language, setLanguage, theme, setTheme, t } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileThemeOpen, setIsMobileThemeOpen] = useState(false);
  const [isThemeExpanded, setIsThemeExpanded] = useState(false);
  const [isDrawerThemeExpanded, setIsDrawerThemeExpanded] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const scrollRafRef = useRef<number | null>(null);
  const desktopThemeRef = useRef<HTMLDivElement>(null);
  const drawerThemeRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const currentThemeOption = THEME_OPTIONS.find((t) => t.id === theme) || THEME_OPTIONS[0];

  useEffect(() => {
    if (!isThemeExpanded) return;

    const handleOutside = (e: Event) => {
      const target = e.target as Node | null;
      if (desktopThemeRef.current && (!target || !desktopThemeRef.current.contains(target))) {
        setIsThemeExpanded(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsThemeExpanded(false);
      }
    };

    const handleBlur = () => {
      setIsThemeExpanded(false);
    };

    document.addEventListener('pointerdown', handleOutside, true);
    document.addEventListener('mousedown', handleOutside, true);
    document.addEventListener('touchstart', handleOutside, true);
    document.addEventListener('keydown', handleKeyDown, true);
    window.addEventListener('blur', handleBlur);

    return () => {
      document.removeEventListener('pointerdown', handleOutside, true);
      document.removeEventListener('mousedown', handleOutside, true);
      document.removeEventListener('touchstart', handleOutside, true);
      document.removeEventListener('keydown', handleKeyDown, true);
      window.removeEventListener('blur', handleBlur);
    };
  }, [isThemeExpanded]);

  useEffect(() => {
    if (!isOpen) {
      setIsDrawerThemeExpanded(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isDrawerThemeExpanded) return;

    const handleOutsideDrawerTheme = (e: Event) => {
      const target = e.target as Node | null;
      if (drawerThemeRef.current && (!target || !drawerThemeRef.current.contains(target))) {
        setIsDrawerThemeExpanded(false);
      }
    };

    document.addEventListener('pointerdown', handleOutsideDrawerTheme, true);
    document.addEventListener('touchstart', handleOutsideDrawerTheme, true);
    return () => {
      document.removeEventListener('pointerdown', handleOutsideDrawerTheme, true);
      document.removeEventListener('touchstart', handleOutsideDrawerTheme, true);
    };
  }, [isDrawerThemeExpanded]);

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

            {/* Theme selection: single circle with current theme that expands on click */}
            <div ref={desktopThemeRef} className="relative flex items-center">
              {!isThemeExpanded ? (
                <button
                  type="button"
                  onClick={() => setIsThemeExpanded(true)}
                  aria-expanded={false}
                  title={
                    language === 'en'
                      ? `Theme: ${currentThemeOption.nameEn} (click to expand)`
                      : `Tema: ${currentThemeOption.namePt} (clique para expandir)`
                  }
                  aria-label={
                    language === 'en'
                      ? `Theme: ${currentThemeOption.nameEn}`
                      : `Tema: ${currentThemeOption.namePt}`
                  }
                  className="p-1 rounded-full border border-theme-border/70 bg-theme-surface/60 hover:border-theme-text/50 transition-all cursor-pointer flex items-center justify-center focus-visible:outline focus-visible:outline-1 focus-visible:outline-theme-text"
                >
                  <span
                    className="w-3.5 h-3.5 rounded-full block transition-transform hover:scale-110"
                    style={{
                      backgroundColor: currentThemeOption.color,
                      boxShadow:
                        theme === 'light' || theme === 'cream'
                          ? 'inset 0 0 0 1px rgba(0,0,0,0.22)'
                          : 'inset 0 0 0 1px rgba(255,255,255,0.25)',
                    }}
                  />
                </button>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.14, ease: 'easeOut' }}
                  role="radiogroup"
                  aria-label={language === 'en' ? 'Select theme' : 'Selecionar tema'}
                  className="flex items-center gap-1.5 p-1 rounded-full border border-theme-border/80 bg-theme-surface shadow-md"
                >
                  {THEME_OPTIONS.map((option) => {
                    const isSelected = theme === option.id;
                    const label = language === 'en' ? option.nameEn : option.namePt;

                    return (
                      <button
                        key={option.id}
                        type="button"
                        role="radio"
                        aria-checked={isSelected}
                        onClick={() => {
                          setTheme(option.id);
                          setIsThemeExpanded(false);
                        }}
                        title={label}
                        aria-label={label}
                        className={`relative w-3.5 h-3.5 rounded-full transition-all cursor-pointer focus-visible:outline focus-visible:outline-1 focus-visible:outline-theme-text ${
                          isSelected
                            ? 'scale-125 ring-2 ring-theme-text ring-offset-2 ring-offset-theme-surface z-10'
                            : 'opacity-70 hover:opacity-100 hover:scale-115'
                        }`}
                        style={{
                          backgroundColor: option.color,
                          boxShadow:
                            option.id === 'light' || option.id === 'cream'
                              ? 'inset 0 0 0 1px rgba(0,0,0,0.22)'
                              : 'inset 0 0 0 1px rgba(255,255,255,0.25)',
                        }}
                      />
                    );
                  })}
                </motion.div>
              )}
            </div>
          </div>

        </div>

        {/* Mobile Menu Toggle & Theme */}
        <div className="flex items-center gap-2.5 md:hidden ml-auto relative">
          <button
            type="button"
            onClick={() => setIsMobileThemeOpen(!isMobileThemeOpen)}
            className="p-1 rounded-full border border-theme-border/80 bg-theme-surface/60 cursor-pointer flex items-center justify-center focus-visible:outline focus-visible:outline-1 focus-visible:outline-theme-text"
            aria-label={language === 'en' ? 'Select theme' : 'Selecionar tema'}
            title={language === 'en' ? 'Themes' : 'Temas'}
          >
            <span
              className="w-4 h-4 rounded-full block"
              style={{
                backgroundColor: currentThemeOption.color,
                boxShadow:
                  theme === 'light' || theme === 'cream'
                    ? 'inset 0 0 0 1px rgba(0,0,0,0.22)'
                    : 'inset 0 0 0 1px rgba(255,255,255,0.25)',
              }}
            />
          </button>

          {/* Micro-popover for mobile: only the circular swatches, no text, no modal */}
          <AnimatePresence>
            {isMobileThemeOpen && (
              <>
                <div
                  className="fixed inset-0 z-30"
                  onClick={() => setIsMobileThemeOpen(false)}
                  aria-hidden="true"
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -4 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -4 }}
                  transition={{ duration: 0.15 }}
                  role="radiogroup"
                  aria-label={language === 'en' ? 'Themes' : 'Temas'}
                  className="absolute top-full right-0 mt-2 z-40 flex items-center gap-2 p-2 rounded-full border border-theme-border bg-theme-surface shadow-2xl"
                >
                  {THEME_OPTIONS.map((option) => {
                    const isSelected = theme === option.id;
                    const label = language === 'en' ? option.nameEn : option.namePt;

                    return (
                      <button
                        key={option.id}
                        type="button"
                        role="radio"
                        aria-checked={isSelected}
                        onClick={() => {
                          setTheme(option.id);
                          setIsMobileThemeOpen(false);
                        }}
                        title={label}
                        aria-label={label}
                        className={`w-4 h-4 rounded-full transition-all cursor-pointer ${
                          isSelected
                            ? 'scale-125 ring-2 ring-theme-text ring-offset-2 ring-offset-theme-surface z-10'
                            : 'opacity-75 hover:opacity-100 hover:scale-110'
                        }`}
                        style={{
                          backgroundColor: option.color,
                          boxShadow:
                            option.id === 'light' || option.id === 'cream'
                              ? 'inset 0 0 0 1px rgba(0,0,0,0.22)'
                              : 'inset 0 0 0 1px rgba(255,255,255,0.25)',
                        }}
                      />
                    );
                  })}
                </motion.div>
              </>
            )}
          </AnimatePresence>

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
                  <span>{language === 'pt' ? 'Tema' : 'Theme'}</span>
                  <div ref={drawerThemeRef} className="flex items-center">
                    <AnimatePresence initial={false} mode="wait">
                      {!isDrawerThemeExpanded ? (
                        <button
                          type="button"
                          onClick={() => setIsDrawerThemeExpanded(true)}
                          title={
                            language === 'en'
                              ? `Theme: ${currentThemeOption.nameEn} (click to expand)`
                              : `Tema: ${currentThemeOption.namePt} (clique para expandir)`
                          }
                          aria-label={
                            language === 'en'
                              ? `Theme: ${currentThemeOption.nameEn}`
                              : `Tema: ${currentThemeOption.namePt}`
                          }
                          className="p-1 rounded-full border border-theme-border/70 bg-theme-surface/60 cursor-pointer flex items-center justify-center"
                        >
                          <span
                            className="w-4 h-4 rounded-full block"
                            style={{
                              backgroundColor: currentThemeOption.color,
                              boxShadow:
                                theme === 'light' || theme === 'cream'
                                  ? 'inset 0 0 0 1px rgba(0,0,0,0.22)'
                                  : 'inset 0 0 0 1px rgba(255,255,255,0.25)',
                            }}
                          />
                        </button>
                      ) : (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ duration: 0.15 }}
                          role="radiogroup"
                          aria-label={language === 'en' ? 'Select theme' : 'Selecionar tema'}
                          className="flex items-center gap-2 p-1.5 rounded-full border border-theme-border/60 bg-theme-surface/60"
                        >
                          {THEME_OPTIONS.map((option) => {
                            const isSelected = theme === option.id;
                            const label = language === 'en' ? option.nameEn : option.namePt;

                            return (
                              <button
                                key={option.id}
                                type="button"
                                role="radio"
                                aria-checked={isSelected}
                                onClick={() => {
                                  setTheme(option.id);
                                  setIsDrawerThemeExpanded(false);
                                }}
                                title={label}
                                aria-label={label}
                                className={`w-4 h-4 rounded-full transition-all cursor-pointer ${
                                  isSelected
                                    ? 'scale-125 ring-2 ring-theme-text ring-offset-2 ring-offset-theme-surface z-10'
                                    : 'opacity-70 hover:opacity-100 hover:scale-110'
                                }`}
                                style={{
                                  backgroundColor: option.color,
                                  boxShadow:
                                    option.id === 'light' || option.id === 'cream'
                                      ? 'inset 0 0 0 1px rgba(0,0,0,0.22)'
                                      : 'inset 0 0 0 1px rgba(255,255,255,0.25)',
                                }}
                              />
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </nav>
  );
}
