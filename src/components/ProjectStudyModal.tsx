import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Code2 } from 'lucide-react';
import { useModalAccessibility } from '../hooks/useModalAccessibility';
import type { Project } from '../types';

interface ProjectStudyModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
  language: 'pt' | 'en';
  triggerElement?: HTMLElement | null;
}

export default function ProjectStudyModal({
  isOpen,
  onClose,
  project,
  language,
  triggerElement,
}: ProjectStudyModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useModalAccessibility(isOpen && !!project, onClose, dialogRef, closeButtonRef, triggerElement);

  if (!project) return null;

  const isEnglish = language === 'en';
  const shortDescription =
    project.subtitle || project.tagline || project.modalIntroduction || project.description;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
            aria-hidden="true"
          />

          {/* Modal Container — max-w-[680px] strictly respected for comfortable reading */}
          <motion.div
            ref={dialogRef}
            initial={{ opacity: 0, scale: 0.97, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 10 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[680px] max-h-[calc(100dvh-1.5rem)] sm:max-h-[calc(100dvh-2.5rem)] md:max-h-[85vh] my-auto bg-theme-surface border border-theme-border rounded-xl shadow-2xl flex flex-col overflow-hidden z-10"
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
          >
            {/* Header com Nome, Descrição Objetiva e Botão Fechar */}
            <div className="flex items-start justify-between p-5 sm:p-6 border-b border-theme-border bg-theme-surface shrink-0">
              <div className="space-y-1.5 pr-4 min-w-0">
                <span className="text-xs font-mono uppercase tracking-widest text-theme-muted block">
                  {isEnglish ? 'Case Study' : 'Estudo de Caso'}
                </span>
                <h3
                  id="project-modal-title"
                  className="text-lg sm:text-xl font-semibold text-theme-text tracking-tight leading-snug"
                >
                  {project.title}
                </h3>
                {shortDescription && (
                  <p className="text-xs sm:text-sm text-theme-dim leading-relaxed line-clamp-2">
                    {shortDescription}
                  </p>
                )}
              </div>

              {/* Botão Fechar */}
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                aria-label={isEnglish ? 'Close modal' : 'Fechar modal'}
                className="p-1.5 sm:p-2 border border-theme-border rounded-lg bg-theme-bg hover:border-theme-text hover:text-theme-text text-theme-dim transition-colors cursor-pointer shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Conteúdo Estruturado e Objetivo com Rolagem Interna */}
            <div className="flex-1 min-h-0 overflow-y-auto p-5 sm:p-6 space-y-5 bg-theme-bg/40">
              {/* 1. O Desafio */}
              <section className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
                  <h4 className="text-xs font-mono uppercase tracking-widest text-theme-text font-semibold">
                    {isEnglish ? 'The Challenge' : 'O Desafio'}
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-theme-dim leading-relaxed pl-3.5 border-l border-theme-border/80">
                  {project.challenge}
                </p>
              </section>

              {/* 2. Minha Solução */}
              <section className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-theme-text shrink-0" />
                  <h4 className="text-xs font-mono uppercase tracking-widest text-theme-text font-semibold">
                    {isEnglish ? 'My Solution' : 'Minha Solução'}
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-theme-dim leading-relaxed pl-3.5 border-l border-theme-border/80">
                  {project.solution}
                </p>
              </section>

              {/* 3. Resultado */}
              {project.impact && (
                <section className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                    <h4 className="text-xs font-mono uppercase tracking-widest text-theme-text font-semibold">
                      {isEnglish ? 'Outcome & Results' : 'Resultado'}
                    </h4>
                  </div>
                  <p className="text-xs sm:text-sm text-theme-dim leading-relaxed pl-3.5 border-l border-theme-border/80">
                    {project.impact}
                  </p>
                </section>
              )}

              {/* 4. Tecnologias */}
              {project.technologies && project.technologies.length > 0 && (
                <section className="space-y-2.5 pt-2 border-t border-theme-border/60">
                  <h4 className="text-xs font-mono uppercase tracking-widest text-theme-muted font-medium">
                    {isEnglish ? 'Technologies' : 'Tecnologias'}
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 text-xs font-mono border border-theme-border bg-theme-surface text-theme-dim rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </section>
              )}

              {/* 5. Ações (Links para Aplicação e Repositório) */}
              {(project.liveUrl || project.githubUrl) && (
                <section className="flex flex-wrap items-center gap-3 pt-4 border-t border-theme-border/70">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-theme-text text-theme-bg hover:opacity-90 rounded-lg transition-opacity font-mono text-xs uppercase tracking-wider font-semibold cursor-pointer"
                    >
                      <span>{isEnglish ? 'Open Live Application' : 'Acessar Aplicação'}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 border border-theme-border text-theme-text hover:bg-theme-surface rounded-lg transition-colors font-mono text-xs uppercase tracking-wider cursor-pointer"
                    >
                      <Code2 className="w-3.5 h-3.5 text-theme-muted" />
                      <span>{isEnglish ? 'View Repository' : 'Ver Repositório'}</span>
                    </a>
                  )}
                </section>
              )}
            </div>

            {/* Rodapé com Período e Botão de Fechar */}
            <div className="p-4 sm:p-5 border-t border-theme-border bg-theme-surface flex items-center justify-between text-xs font-mono shrink-0">
              <span className="text-theme-muted text-xs">
                {project.period || (isEnglish ? 'Production' : 'Produção')}
              </span>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-1.5 border border-theme-border bg-theme-bg hover:border-theme-text text-theme-text rounded-md transition-colors cursor-pointer uppercase tracking-wider text-xs"
              >
                {isEnglish ? 'Close' : 'Fechar'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
