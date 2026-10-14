import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Building2, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import TechBadge from './TechBadge';

export interface WorkExperienceItem {
  company: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  description: string[];
  impact?: string;
  technologies: string[];
  isCurrent?: boolean;
  buttonText?: string;
  projectUrl?: string;
}

interface ExperienceDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  experience: WorkExperienceItem | null;
  language: 'pt' | 'en';
}

export default function ExperienceDetailModal({
  isOpen,
  onClose,
  experience,
  language,
}: ExperienceDetailModalProps) {
  // Lock body scroll when modal is active
  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!experience) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/75 backdrop-blur-sm cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-3xl max-h-[calc(100dvh-1.5rem)] sm:max-h-[calc(100dvh-2.5rem)] md:max-h-[86vh] my-auto bg-theme-surface border border-theme-border rounded-[2px] shadow-2xl flex flex-col overflow-hidden z-10"
            role="dialog"
            aria-modal="true"
            aria-labelledby="experience-modal-title"
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between p-5 sm:p-6 border-b border-theme-border bg-theme-surface shrink-0">
              <div className="space-y-1.5 max-w-[85%]">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-theme-muted">
                    {language === 'pt' ? 'Atuação Profissional Detalhada' : 'Detailed Work History'}
                  </span>
                </div>

                <h3
                  id="experience-modal-title"
                  className="text-lg sm:text-xl md:text-2xl font-semibold text-theme-text tracking-tight uppercase leading-snug"
                >
                  {experience.role}
                </h3>

                <div className="flex flex-wrap items-center gap-y-1.5 gap-x-4 text-xs font-mono text-theme-dim pt-0.5">
                  <span className="inline-flex items-center gap-1.5 text-theme-text font-medium">
                    <Building2 className="w-3.5 h-3.5 text-theme-muted" />
                    {experience.company}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-theme-muted" />
                    {experience.period}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-theme-muted" />
                    {experience.location}
                  </span>
                </div>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={onClose}
                aria-label={language === 'pt' ? 'Fechar modal' : 'Close modal'}
                className="p-1.5 sm:p-2 border border-theme-border rounded-[2px] bg-theme-bg hover:border-theme-text hover:text-theme-text text-theme-dim transition-colors cursor-pointer shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="flex-1 min-h-0 overflow-y-auto p-5 sm:p-6 space-y-5">
              {/* Executive Summary Callout */}
              <div className="p-4 sm:p-5 rounded-[2px] bg-theme-bg border border-theme-border space-y-1.5">
                <span className="text-[10px] font-mono uppercase tracking-widest text-theme-muted block font-medium">
                  {language === 'pt' ? 'Síntese de Atuação' : 'Executive Overview'}
                </span>
                <p className="text-xs sm:text-sm text-theme-text leading-relaxed">
                  {experience.summary}
                </p>
              </div>

              {/* Impact Callout */}
              {experience.impact && (
                <div className="p-4 sm:p-5 rounded-[2px] bg-theme-bg/60 border-l-2 border-theme-text/80 border-r border-t border-b border-theme-border space-y-1.5">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-theme-text block font-semibold">
                    {language === 'pt' ? 'Impacto Realizado' : 'Demonstrated Impact'}
                  </span>
                  <p className="text-xs sm:text-sm text-theme-dim leading-relaxed font-medium">
                    {experience.impact}
                  </p>
                </div>
              )}

              {/* Detailed Responsibilities & Deliverables */}
              <div className="space-y-3">
                <span className="text-[10px] font-mono uppercase tracking-widest text-theme-muted block">
                  {language === 'pt' ? 'Atividades & Entregas Principais:' : 'Key Deliverables & Responsibilities:'}
                </span>

                <ul className="space-y-3">
                  {experience.description.map((bullet, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-xs sm:text-sm text-theme-dim leading-relaxed"
                    >
                      <CheckCircle2 className="w-4 h-4 text-theme-muted shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technical Ecosystem */}
              {experience.technologies && experience.technologies.length > 0 && (
                <div className="space-y-3 pt-4 border-t border-theme-border/60">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-theme-muted block">
                      {language === 'pt' ? 'Ecossistema Técnico & Ferramentas:' : 'Technical Ecosystem & Tools:'}
                    </span>
                    <span className="text-[10px] font-mono text-theme-muted">
                      {experience.technologies.length} {language === 'pt' ? 'itens' : 'items'}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {experience.technologies.map((tech) => (
                      <TechBadge
                        key={tech}
                        tech={tech}
                        language={language}
                        size="md"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-5 border-t border-theme-border bg-theme-surface flex items-center justify-between text-xs font-mono shrink-0">
              <span className="text-theme-muted text-[11px]">
                {experience.period}
              </span>

              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-theme-text text-theme-bg font-medium rounded-[2px] hover:opacity-90 transition-opacity cursor-pointer uppercase tracking-wider text-[11px]"
              >
                {language === 'pt' ? 'Fechar' : 'Close'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
