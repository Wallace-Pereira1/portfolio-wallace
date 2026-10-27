import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { X, Layers, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import { DomainItem } from './TiltDomainCard';
import TechBadge from './TechBadge';

interface DomainStudyModalProps {
  isOpen: boolean;
  onClose: () => void;
  domain: DomainItem | null;
  allDomains: DomainItem[];
  onSelectDomain?: (domain: DomainItem) => void;
  language: 'pt' | 'en';
}

export default function DomainStudyModal({
  isOpen,
  onClose,
  domain,
  allDomains,
  onSelectDomain,
  language,
}: DomainStudyModalProps) {
  const modalScrollRef = useRef<HTMLDivElement>(null);

  const currentIndex = domain ? allDomains.findIndex((d) => d.index === domain.index) : -1;
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex >= 0 && currentIndex < allDomains.length - 1;

  const goToPrev = () => {
    if (hasPrev && onSelectDomain) {
      onSelectDomain(allDomains[currentIndex - 1]);
    }
  };

  const goToNext = () => {
    if (hasNext && onSelectDomain) {
      onSelectDomain(allDomains[currentIndex + 1]);
    }
  };

  // Reset scroll when domain changes
  useEffect(() => {
    if (modalScrollRef.current) {
      modalScrollRef.current.scrollTop = 0;
    }
  }, [domain?.index]);

  // Lock body scroll and handle Escape and arrow keys
  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft' && hasPrev) {
        goToPrev();
      } else if (e.key === 'ArrowRight' && hasNext) {
        goToNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, hasPrev, hasNext]);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && domain && (
        <div className="fixed inset-0 z-[99999] overflow-y-auto p-3 sm:p-5 md:p-6 flex items-center justify-center">
          {/* Backdrop with smooth fade-out */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm"
          />

          {/* Modal Window with smooth scale and fade-out */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl bg-theme-surface border border-theme-border rounded-[2px] shadow-2xl flex flex-col max-h-[calc(100dvh-1.5rem)] sm:max-h-[calc(100dvh-2.5rem)] md:max-h-[86vh] z-10 overflow-hidden my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar with Domain Identifier & Close Button */}
            <div className="shrink-0 flex items-center justify-between px-4 sm:px-6 py-2.5 sm:py-3 border-b border-theme-border/70 bg-theme-bg/60">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[2px] bg-theme-text text-theme-bg font-mono text-[10px] uppercase tracking-wider font-semibold">
                  <Layers className="w-3 h-3" />
                  <span>{language === 'pt' ? 'ESPECIFICAÇÃO' : 'SPECIFICATION'}</span>
                </span>
                <span className="text-[10.5px] font-mono text-theme-muted uppercase tracking-wider">
                  {language === 'pt' ? 'DOMÍNIO TÉCNICO' : 'TECHNICAL DOMAIN'}
                </span>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-[2px] text-theme-muted hover:text-theme-text hover:bg-theme-border/40 transition-colors cursor-pointer"
                aria-label={language === 'pt' ? 'Fechar modal' : 'Close modal'}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div
              ref={modalScrollRef}
              className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6 space-y-5 text-theme-text"
            >
              {/* Title & Description */}
              <div className="space-y-2 border-b border-theme-border/50 pb-5">
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-theme-text uppercase leading-snug">
                  {domain.title}
                </h2>
                <p className="text-sm sm:text-[14.5px] text-theme-dim leading-relaxed font-normal">
                  {domain.description}
                </p>
              </div>

              {/* Core Technologies Group with Icons */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-theme-text" />
                  <h3 className="text-xs font-mono uppercase tracking-widest text-theme-muted font-semibold">
                    {language === 'pt' ? 'Tecnologias Principais' : 'Core Technologies'}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  {domain.primarySkills.map((skill) => (
                    <TechBadge
                      key={skill}
                      tech={skill}
                      language={language}
                      size="md"
                    />
                  ))}
                </div>
              </div>

              {/* Secondary Technologies & Ecosystem with Icons */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5 text-theme-muted" />
                  <h3 className="text-xs font-mono uppercase tracking-widest text-theme-muted font-semibold">
                    {language === 'pt' ? 'Ferramentas, Práticas & Ecossistema' : 'Tools, Practices & Ecosystem'}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  {domain.secondarySkills.map((skill) => (
                    <TechBadge
                      key={skill}
                      tech={skill}
                      language={language}
                      size="sm"
                    />
                  ))}
                </div>
              </div>

              {/* Engineering Standards & Real-World Application */}
              <div className="p-4 rounded-[2px] bg-theme-bg/60 border border-theme-border/60 space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-theme-muted block font-semibold">
                  {language === 'pt' ? 'MÉTODO & PRODUÇÃO' : 'METHOD & PRODUCTION'}
                </span>
                <p className="text-xs sm:text-[12.5px] text-theme-dim leading-relaxed font-mono">
                  {language === 'pt'
                    ? 'Todas as competências listadas são aplicadas em ambientes produtivos reais com foco em tipagem estrita, isolamento modular, robustez em runtime e documentação clara.'
                    : 'All listed competencies are actively applied in production environments with strict typing, modular isolation, runtime robustness, and clear technical documentation.'}
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="shrink-0 flex items-center justify-between px-4 sm:px-6 py-2.5 sm:py-3 border-t border-theme-border/70 bg-theme-bg/60 text-xs font-mono">
              <span className="text-theme-muted text-[10.5px]">
                {language === 'pt' ? 'Visão de Arquitetura' : 'Architecture Specifications'}
              </span>

              <div className="flex items-center gap-2">
                {onSelectDomain && (
                  <div className="flex items-center border border-theme-border rounded-[2px] bg-theme-surface overflow-hidden">
                    <button
                      type="button"
                      onClick={goToPrev}
                      disabled={!hasPrev}
                      className="p-1.5 hover:bg-theme-border/40 text-theme-muted hover:text-theme-text disabled:opacity-25 disabled:cursor-not-allowed transition-colors cursor-pointer border-r border-theme-border/40"
                      aria-label={language === 'pt' ? 'Domínio anterior' : 'Previous domain'}
                      title={language === 'pt' ? 'Domínio anterior' : 'Previous domain'}
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={goToNext}
                      disabled={!hasNext}
                      className="p-1.5 hover:bg-theme-border/40 text-theme-muted hover:text-theme-text disabled:opacity-25 disabled:cursor-not-allowed transition-colors cursor-pointer"
                      aria-label={language === 'pt' ? 'Próximo domínio' : 'Next domain'}
                      title={language === 'pt' ? 'Próximo domínio' : 'Next domain'}
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[2px] border border-theme-border bg-theme-surface hover:bg-theme-border/40 text-theme-text transition-colors cursor-pointer text-[11px] sm:text-xs"
                >
                  <span>{language === 'pt' ? 'Fechar' : 'Close'}</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
