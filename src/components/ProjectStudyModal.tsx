import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  ExternalLink,
  Code2,
  Sparkles,
  Layers,
  Maximize2,
  CheckCircle2,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { projectsPt, projectsEn } from '../data/projects';
import TechBadge from './TechBadge';

interface ProjectStudyModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProjectId?: string | null;
}

export default function ProjectStudyModal({
  isOpen,
  onClose,
  initialProjectId,
}: ProjectStudyModalProps) {
  const { language } = useApp();
  const projects = language === 'pt' ? projectsPt : projectsEn;

  const [currentId, setCurrentId] = useState<string>('01'); // Default to first project (Real Estate)
  const [isImageZoomed, setIsImageZoomed] = useState(false);
  const modalScrollRef = useRef<HTMLDivElement>(null);

  // Sync initial project when modal opens
  useEffect(() => {
    if (isOpen) {
      if (initialProjectId) {
        setCurrentId(initialProjectId);
      }
      setIsImageZoomed(false);
      if (modalScrollRef.current) {
        modalScrollRef.current.scrollTop = 0;
      }
    }
  }, [isOpen, initialProjectId]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isImageZoomed) {
          setIsImageZoomed(false);
        } else {
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, isImageZoomed, onClose]);

  const currentIndex = projects.findIndex((p) => p.id === currentId);
  const currentProject = projects[currentIndex] || projects[0];

  return (
    <AnimatePresence>
      {isOpen && currentProject && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 overflow-y-auto p-2 sm:p-4 md:p-6 flex items-center justify-center"
        >
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-5xl max-h-[calc(100dvh-1.5rem)] sm:max-h-[calc(100dvh-2.5rem)] md:max-h-[88vh] my-auto flex flex-col bg-theme-bg border border-theme-border rounded-[2px] shadow-2xl overflow-hidden z-10"
          >
            {/* Modal Header */}
            <div className="shrink-0 flex items-center justify-between px-4 sm:px-7 py-3 sm:py-3.5 border-b border-theme-border bg-theme-surface">
              <div className="min-w-0">
                <span className="text-[10px] font-mono uppercase tracking-widest text-theme-muted block truncate">
                  {language === 'pt' ? 'Estudo Detalhado de Sistema' : 'Detailed System Study'}
                </span>
                <span className="text-xs sm:text-sm font-semibold text-theme-text truncate block">
                  {currentProject.modalTitle || currentProject.title}
                </span>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={onClose}
                aria-label={language === 'pt' ? 'Fechar modal' : 'Close modal'}
                className="p-1.5 rounded-[2px] border border-theme-border bg-theme-bg text-theme-dim hover:text-theme-text hover:border-theme-text transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body - Scrollable Comprehensive Content */}
            <div
              ref={modalScrollRef}
              className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-7 md:p-8 space-y-6 sm:space-y-8 bg-theme-bg overscroll-contain"
            >
              {/* 1. Header: Nome, Categoria, Período, Status, Resumo & Links de Produção */}
              <div className="space-y-4 border-b border-theme-border pb-6">
                <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-theme-dim">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="px-2 py-0.5 bg-theme-surface border border-theme-border text-theme-text font-medium rounded-[2px]">
                      {currentProject.role}
                    </span>
                    <span className="text-theme-border">/</span>
                    <span className="text-[11px] text-theme-muted uppercase tracking-wider">
                      {currentProject.customCategory || (
                        <>
                          {currentProject.category === 'web_product' && (language === 'pt' ? 'Produto Web & SaaS' : 'Web & SaaS Product')}
                          {currentProject.category === 'integration_api' && (language === 'pt' ? 'Agente de IA & Integrações' : 'AI Agent & Integrations')}
                          {currentProject.category === 'data_backend' && (language === 'pt' ? 'Dados & Backend' : 'Data & Backend')}
                        </>
                      )}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-[11px] text-theme-muted">{currentProject.period}</span>
                    {currentProject.status ? (
                      <span className="text-[10px] uppercase tracking-widest text-emerald-400 border border-emerald-400/30 px-1.5 py-0.5 rounded-[2px]">
                        {currentProject.status}
                      </span>
                    ) : currentProject.featured && (
                      <span className="text-[10px] uppercase tracking-widest text-brand-blue border border-brand-blue/30 px-1.5 py-0.5 rounded-[2px]">
                        {language === 'pt' ? 'Em Produção' : 'In Production'}
                      </span>
                    )}
                  </div>
                </div>

                {/* Cliente / Ano */}
                {(currentProject.client || currentProject.year) && (
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-xs font-mono pt-1">
                    {currentProject.client && (
                      <div className="flex items-center gap-1.5">
                        <span className="text-theme-muted uppercase tracking-wider text-[10.5px]">
                          {language === 'pt' ? 'Cliente:' : 'Client:'}
                        </span>
                        <span className="text-theme-text font-medium">{currentProject.client}</span>
                      </div>
                    )}
                    {currentProject.year && (
                      <div className="flex items-center gap-1.5">
                        <span className="text-theme-muted uppercase tracking-wider text-[10.5px]">
                          {language === 'pt' ? 'Ano:' : 'Year:'}
                        </span>
                        <span className="text-theme-text font-medium">{currentProject.year}</span>
                      </div>
                    )}
                  </div>
                )}

                <div className="space-y-2">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-theme-text tracking-tight leading-tight">
                    {currentProject.modalTitle || currentProject.title}
                  </h1>
                  <p className="text-sm sm:text-base text-theme-dim leading-relaxed max-w-4xl">
                    {currentProject.modalIntroduction || currentProject.tagline}
                  </p>
                </div>

                {/* 10. Links para Produção & Repositório */}
                {(currentProject.liveUrl || currentProject.githubUrl) && (
                  <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-mono">
                    {currentProject.liveUrl && (
                      <a
                        href={currentProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-theme-text text-theme-bg hover:opacity-90 rounded-[2px] transition-opacity font-semibold uppercase tracking-wider text-[11px]"
                      >
                        <span>{language === 'pt' ? 'Abrir Aplicação em Produção' : 'Open Live Application'}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {currentProject.githubUrl && (
                      <a
                        href={currentProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-3.5 py-1.5 border border-theme-border text-theme-text hover:bg-theme-surface rounded-[2px] transition-colors uppercase tracking-wider text-[11px]"
                      >
                        <Code2 className="w-3.5 h-3.5" />
                        <span>{language === 'pt' ? 'Código no GitHub' : 'View on GitHub'}</span>
                      </a>
                    )}
                  </div>
                )}
              </div>

              {/* 4. Imagem ou Capa Principal */}
              {currentProject.imageUrl && (
                <div className="relative group/banner rounded-[2px] overflow-hidden border border-theme-border bg-theme-surface shadow-md">
                  <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] md:aspect-[2.2/1] overflow-hidden bg-black/40">
                    <img
                      src={currentProject.imageUrl}
                      alt={currentProject.title}
                      className="w-full h-full object-cover object-center filter contrast-[1.04] brightness-[0.98] transition-transform duration-500 ease-out group-hover/banner:scale-[1.02]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-theme-bg via-transparent to-transparent opacity-75" />

                    {/* Banner Badges */}
                    <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex flex-wrap items-center gap-2">
                      <span className="px-2 py-0.5 bg-black/75 backdrop-blur-sm text-white text-[10px] font-mono uppercase tracking-widest rounded-[2px] border border-white/10 flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3 text-brand-blue" />
                        {language === 'pt' ? 'Visualização da Arquitetura do Sistema' : 'System Architecture Visual'}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsImageZoomed(true)}
                      className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 px-2.5 py-1 bg-black/75 hover:bg-black text-white text-[11px] font-mono rounded-[2px] border border-white/15 flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
                    >
                      <Maximize2 className="w-3 h-3" />
                      <span>{language === 'pt' ? 'Expandir Imagem' : 'Zoom Image'}</span>
                    </button>
                  </div>
                </div>
              )}

              {/* 5. O Desafio & 6. A Solução Arquitetural */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
                {/* 5. O Desafio */}
                <div className="p-5 sm:p-6 bg-theme-surface border border-theme-border rounded-[2px] space-y-3">
                  <div className="flex items-center gap-2 pb-2 border-b border-theme-border/60">
                    <span className="w-2 h-2 rounded-full bg-red-400" />
                    <h2 className="text-xs font-mono uppercase tracking-widest text-theme-text font-semibold">
                      {language === 'pt' ? 'O Desafio & Contexto Real' : 'Business Challenge & Context'}
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-theme-dim leading-relaxed">
                    {currentProject.challenge}
                  </p>
                </div>

                {/* 6. A Solução Arquitetural */}
                <div className="p-5 sm:p-6 bg-theme-surface border border-theme-border rounded-[2px] space-y-3 lg:col-span-2">
                  <div className="flex items-center gap-2 pb-2 border-b border-theme-border/60">
                    <span className="w-2 h-2 rounded-full bg-brand-blue" />
                    <h2 className="text-xs font-mono uppercase tracking-widest text-theme-text font-semibold">
                      {language === 'pt' ? 'A Solução Arquitetural Implementada' : 'Engineered Architectural Solution'}
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-theme-dim leading-relaxed">
                    {currentProject.solution}
                  </p>
                </div>
              </div>

              {/* 7. Fluxo ou Pipeline Operacional (Step-by-Step) */}
              {currentProject.workflow && currentProject.workflow.length > 0 && (
                <div className="space-y-4 p-5 sm:p-6 bg-theme-surface border border-theme-border rounded-[2px]">
                  <div className="flex items-center justify-between border-b border-theme-border/60 pb-3">
                    <div className="flex items-center gap-2">
                      <Layers className="w-4 h-4 text-theme-text" />
                      <h2 className="text-xs sm:text-sm font-mono uppercase tracking-widest text-theme-text font-semibold">
                        {currentProject.blocksTitle || (language === 'pt' ? 'Pipeline Operacional & Fluxo Arquitetural' : 'Operational Pipeline & Architecture Flow')}
                      </h2>
                    </div>
                    <span className="text-[10px] font-mono text-theme-muted">
                      {currentProject.workflow.length} {language === 'pt' ? 'etapas orquestradas' : 'orchestrated steps'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-1">
                    {currentProject.workflow.map((item) => (
                      <div
                        key={item.step}
                        className="p-3.5 bg-theme-bg border border-theme-border/70 rounded-[2px] space-y-1.5 hover:border-theme-text/40 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono text-brand-blue font-bold px-1.5 py-0.5 bg-theme-surface border border-brand-blue/30 rounded-[2px]">
                            {item.step}
                          </span>
                          <CheckCircle2 className="w-3.5 h-3.5 text-theme-muted" />
                        </div>
                        <h3 className="text-xs sm:text-[13px] font-semibold text-theme-text tracking-tight">
                          {item.title}
                        </h3>
                        <p className="text-[11px] sm:text-xs text-theme-dim leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 8. Tecnologias Utilizadas (Stack Completa) */}
              <div className="p-5 sm:p-6 bg-theme-surface border border-theme-border rounded-[2px] space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-theme-border/60">
                  <h2 className="text-xs font-mono uppercase tracking-widest text-theme-text font-semibold">
                    {language === 'pt' ? 'Stack Tecnológica Completa' : 'Full Technology Ecosystem'}
                  </h2>
                  <span className="text-[11px] font-mono text-theme-muted">
                    {currentProject.technologies.length} {language === 'pt' ? 'tecnologias mapeadas' : 'technologies'}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 pt-1 text-xs font-mono">
                  {currentProject.technologies.map((tech) => (
                    <TechBadge
                      key={tech}
                      tech={tech}
                      language={language}
                      size="md"
                    />
                  ))}
                </div>
              </div>

              {/* 9. Impacto & Resultados Comprovados */}
              <div className="p-5 sm:p-6 bg-theme-surface border border-theme-border rounded-[2px] space-y-3">
                <div className="flex items-center gap-2 pb-2 border-b border-theme-border/60">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <h2 className="text-xs font-mono uppercase tracking-widest text-theme-text font-semibold">
                    {currentProject.id === '08' ? (language === 'pt' ? 'Entregas Comprovadas & Resultados' : 'Verified Deliverables & Results') : (language === 'pt' ? 'Impacto nos Resultados & Negócio' : 'Business Impact & Deliverables')}
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-theme-dim leading-relaxed">
                  {currentProject.impact}
                </p>
              </div>
            </div>

            {/* Modal Footer Controls */}
            <div className="shrink-0 px-4 sm:px-7 py-2.5 sm:py-3 border-t border-theme-border bg-theme-surface flex items-center justify-between text-xs font-mono text-theme-dim">
              <span className="text-[11px] text-theme-muted">
                {language === 'pt' ? 'Pressione ESC para fechar' : 'Press ESC to close'}
              </span>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-1.5 border border-theme-border bg-theme-bg hover:border-theme-text text-theme-text transition-colors rounded-[2px] cursor-pointer font-medium"
              >
                {language === 'pt' ? 'Fechar' : 'Close'}
              </button>
            </div>
          </motion.div>

          {/* Fullscreen Image Lightbox Modal */}
          {isImageZoomed && currentProject.imageUrl && (
            <div
              className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg"
              onClick={() => setIsImageZoomed(false)}
            >
              <div className="relative max-w-6xl max-h-[90vh]">
                <img
                  src={currentProject.imageUrl}
                  alt={currentProject.title}
                  className="max-w-full max-h-[85vh] object-contain rounded-[2px] border border-white/20 shadow-2xl"
                />
                <button
                  type="button"
                  onClick={() => setIsImageZoomed(false)}
                  className="absolute top-3 right-3 p-2 bg-black/80 text-white rounded-[2px] border border-white/20 hover:bg-black transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </AnimatePresence>
  );
}
