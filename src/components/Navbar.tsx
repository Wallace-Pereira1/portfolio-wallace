import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight, Sun, Moon, FileDown } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { downloadResumePdf } from '../utils/generateResumePdf';

export default function Navbar() {
  const { language, setLanguage, theme, setTheme, t } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { name: t('nav.inicio'), id: 'inicio' },
    { name: t('nav.projetos'), id: 'projetos' },
    { name: t('nav.experiencia'), id: 'experiencia' },
    { name: t('nav.tecnologias'), id: 'tecnologias' },
    { name: t('nav.contato'), id: 'contato' },
  ];

  // Scroll listener to update active section reliably & sticky shadow
  useEffect(() => {
    if (location.pathname !== '/') {
      setActiveSection('');
      return;
    }

    const sectionIds = ['inicio', 'projetos', 'experiencia', 'tecnologias', 'contato'];

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Top of page -> inicio has absolute priority on page load and top position
      if (window.scrollY < 120) {
        setActiveSection('inicio');
        return;
      }

      // Bottom of page -> contact only if scrolled significantly and truly at footer
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = window.innerHeight;
      if (
        scrollHeight > clientHeight + 300 &&
        window.scrollY > 400 &&
        clientHeight + window.scrollY >= scrollHeight - 70
      ) {
        setActiveSection('contato');
        return;
      }

      const triggerPoint = window.innerHeight * 0.35;
      let current = 'inicio';

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= triggerPoint && rect.bottom > 0) {
            current = id;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
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
        const navOffset = 76;
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

    if (targetId === 'inicio') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      window.history.pushState(null, '', '#inicio');
      setActiveSection('inicio');
      return;
    }

    const element = document.getElementById(targetId);
    if (element) {
      const navOffset = 76;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      window.history.pushState(null, '', `#${targetId}`);
      setActiveSection(targetId);
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
                  <button
                    type="button"
                    onClick={(e) => scrollToSection(link.id, e)}
                    className={`transition-colors duration-150 relative py-1 cursor-pointer bg-transparent border-none ${
                      isActive
                        ? 'text-theme-text font-medium'
                        : 'text-theme-dim hover:text-theme-text'
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <motion.span
                        layoutId="navbar-indicator"
                        className="absolute bottom-0 left-0 right-0 h-[1px] bg-theme-text"
                        transition={{
                          type: 'spring',
                          stiffness: 400,
                          damping: 35,
                        }}
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="h-3 w-[1px] bg-theme-border" />

          {/* Controls: Language and Theme */}
          <div className="flex items-center gap-3">
            {/* Lang switcher */}
            <div className="flex items-center text-[11px] font-mono text-theme-dim">
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

            {/* Theme toggle */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-1 text-theme-muted hover:text-theme-text transition-colors cursor-pointer"
              title={theme === 'dark' ? 'Mudar para modo claro' : 'Mudar para modo escuro'}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-3.5 h-3.5" />
              ) : (
                <Moon className="w-3.5 h-3.5" />
              )}
            </button>
          </div>

          {/* Direct Resume Download */}
          <button
            type="button"
            onClick={() => downloadResumePdf(language)}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider text-theme-text hover:text-theme-dim border border-theme-border hover:border-theme-text bg-theme-surface rounded-[2px] transition-colors cursor-pointer"
            title={language === 'pt' ? 'Baixar Currículo em PDF' : 'Download Resume in PDF'}
            aria-label="Download CV"
          >
            <FileDown className="w-3.5 h-3.5 text-theme-muted" />
            <span>{language === 'pt' ? 'Currículo' : 'Resume'}</span>
          </button>

          <button
            type="button"
            onClick={(e) => scrollToSection('contato', e)}
            className="group inline-flex items-center gap-1.5 text-[12px] font-mono uppercase tracking-wider text-theme-text hover:text-theme-dim transition-colors cursor-pointer bg-transparent border-none"
          >
            <span className="border-b border-theme-text/50 group-hover:border-theme-text pb-0.5 transition-colors">
              {t('nav.cta')}
            </span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-3 md:hidden ml-auto">
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-1.5 text-theme-dim hover:text-theme-text cursor-pointer"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
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
                <span className="text-[10px] font-mono uppercase tracking-widest text-theme-muted block mb-2">
                  {language === 'pt' ? 'Navegação' : 'Navigation'}
                </span>
                <ul className="flex flex-col divide-y divide-theme-border-subtle">
                  {navLinks.map((link) => {
                    const isActive = location.pathname === '/' && activeSection === link.id;

                    return (
                      <li key={link.id} className="py-3">
                        <button
                          type="button"
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
                            <span className="w-1.5 h-1.5 rounded-full bg-theme-text" />
                          )}
                        </button>
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
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    downloadResumePdf(language);
                  }}
                  className="flex items-center justify-center gap-2 w-full py-2.5 border border-theme-border bg-theme-surface hover:border-theme-text text-theme-text text-xs font-mono uppercase tracking-wider rounded-[2px] transition-colors cursor-pointer"
                >
                  <FileDown className="w-4 h-4 text-theme-muted" />
                  <span>{language === 'pt' ? 'Baixar Currículo (PDF)' : 'Download Resume (PDF)'}</span>
                </button>

                <button
                  type="button"
                  onClick={(e) => scrollToSection('contato', e)}
                  className="flex items-center justify-center gap-1.5 w-full py-2.5 bg-theme-text text-theme-bg text-xs font-mono uppercase tracking-wider rounded-[2px] transition-opacity hover:opacity-90 cursor-pointer font-medium border-none"
                >
                  {t('nav.cta')}
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </nav>
  );
}
