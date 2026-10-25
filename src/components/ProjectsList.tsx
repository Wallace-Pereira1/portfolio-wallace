import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight,
  ArrowUpRight,
  ExternalLink,
  Code2,
} from 'lucide-react';
import { Project } from '../types';
import { getProjectHighlight } from '../data/projectHighlights';
import TechBadge from './TechBadge';
import ProjectStudyModal from './ProjectStudyModal';

interface ProjectsListProps {
  projects: Project[];
  language: string;
}

/**
 * Índice editorial de projetos com gaveta expansível inline compacta.
 * Ao clicar na linha, desce uma gaveta rápida e resumida com o resumo,
 * as stacks usadas e o botão "Ler mais" que abre o modal com o estudo completo.
 * Ao clicar em outro ou fora, a gaveta fecha automaticamente.
 */
export default function ProjectsList({ projects, language }: ProjectsListProps) {
  const pt = language !== 'en';
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [modalProjectId, setModalProjectId] = useState<string | null>(null);
  const listRef = useRef<HTMLOListElement>(null);

  // Fecha a gaveta ao clicar fora ou ao pressionar Escape
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      // Se um modal estiver aberto, não interfere
      if (modalProjectId) return;

      if (listRef.current && !listRef.current.contains(e.target as Node)) {
        setExpandedId(null);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !modalProjectId) {
        setExpandedId(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [modalProjectId]);

  const handleToggle = (projectId: string) => {
    setExpandedId((prev) => (prev === projectId ? null : projectId));
  };

  return (
    <div className="space-y-5 md:space-y-6">
      <div className="flex items-end justify-between gap-3">
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-[40px] leading-[1.1] font-medium text-theme-text tracking-[-0.015em]">
          {pt ? 'Projetos' : 'Projects'}
        </h2>
        <span className="text-[11px] font-mono text-theme-muted tracking-tight select-none pb-1.5">
          {String(projects.length).padStart(2, '0')} {pt ? 'projetos' : 'projects'}
        </span>
      </div>

      <ol
        ref={listRef}
        className="offset-static mb-2 border border-theme-border bg-theme-surface rounded-[2px] divide-y divide-theme-border overflow-hidden"
      >
        {projects.map((project, index) => {
          const isExpanded = expandedId === project.id;
          const highlight = getProjectHighlight(project.id, language) ?? project.tagline;
          const primaryTechs = project.technologies.slice(0, 4);

          return (
            <li key={project.id} className="relative group/row">
              {/* Linha Principal do Projeto */}
              <button
                type="button"
                onClick={() => handleToggle(project.id)}
                aria-expanded={isExpanded}
                aria-label={`${isExpanded ? (pt ? 'Fechar gaveta' : 'Close drawer') : (pt ? 'Abrir gaveta de detalhes' : 'Open details drawer')}: ${project.title}`}
                className={`w-full text-left grid grid-cols-[auto_1fr] md:grid-cols-[3rem_minmax(0,1.5fr)_minmax(0,1fr)_minmax(0,1.1fr)] gap-x-4 md:gap-x-6 gap-y-1.5 items-baseline px-4 sm:px-6 py-4 sm:py-5 pr-14 sm:pr-28 transition-colors duration-150 outline-none focus-visible:ring-1 focus-visible:ring-theme-text/40 overflow-hidden cursor-pointer ${
                  isExpanded ? 'bg-theme-border/30' : 'hover:bg-theme-border/25 focus-visible:bg-theme-border/25'
                }`}
              >
                <span
                  className={`font-mono text-[11px] transition-colors ${
                    isExpanded ? 'text-theme-text font-bold' : 'text-theme-muted group-hover/row:text-theme-text'
                  }`}
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="text-base sm:text-[17px] font-medium text-theme-text leading-snug transition-transform duration-200 group-hover/row:translate-x-1">
                  {project.title}
                </span>
                <span className="col-start-2 md:col-start-auto font-mono text-[12px] text-theme-dim leading-snug">
                  {highlight}
                </span>
                <span className="col-start-2 md:col-start-auto font-mono text-[11px] text-theme-muted truncate select-none">
                  {primaryTechs.join(' · ')}
                </span>
              </button>

              {/* Ações Rápidas no Canto Direito da Linha */}
              <div className="absolute right-4 sm:right-6 top-4 sm:top-1/2 sm:-translate-y-1/2 flex items-center gap-3">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    aria-label={`${pt ? 'Abrir site' : 'Open live site'}: ${project.title}`}
                    className="hidden sm:inline-flex items-center gap-1 font-mono text-[11px] text-theme-muted hover:text-theme-text transition-colors"
                  >
                    Live <ArrowUpRight className="w-3 h-3" />
                  </a>
                )}
                <ArrowRight
                  className={`w-4 h-4 pointer-events-none transition-all duration-200 ${
                    isExpanded
                      ? 'rotate-90 text-theme-text'
                      : 'rotate-0 text-theme-muted group-hover/row:translate-x-1 group-hover/row:text-theme-text'
                  }`}
                />
              </div>

              {/* Gavetinha Expansível Compacta e Rápida */}
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    key={`drawer-${project.id}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden border-t border-theme-border bg-theme-bg/60"
                  >
                    <div className="p-3 sm:p-4 space-y-2.5">
                      {/* Descrição / Tagline direta em poucas linhas para evitar scroll no mobile */}
                      <p className="text-xs sm:text-[13px] text-theme-text font-normal leading-relaxed line-clamp-2 sm:line-clamp-3">
                        {project.tagline}
                      </p>

                      {/* Stacks Utilizadas (Exibição compacta e responsiva de ícones com tooltip interativo) */}
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-theme-muted shrink-0 select-none">
                          Stack:
                        </span>
                        <div className="flex flex-wrap items-center gap-1.5">
                          {project.technologies.slice(0, 8).map((tech) => (
                            <TechBadge
                              key={tech}
                              tech={tech}
                              language={pt ? 'pt' : 'en'}
                              size="sm"
                              expandOnHover={true}
                            />
                          ))}
                          {project.technologies.length > 8 && (
                            <span className="text-[10px] font-mono text-theme-muted select-none">
                              +{project.technologies.length - 8}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Botão de "Ler mais" que abre o Modal + Ações Live/GitHub */}
                      <div className="flex flex-wrap items-center gap-2 pt-1.5 border-t border-theme-border/40">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setModalProjectId(project.id);
                          }}
                          className="inline-flex items-center gap-1.5 px-3 py-1 bg-theme-text text-theme-bg hover:opacity-90 rounded-[2px] transition-opacity font-semibold uppercase tracking-wider text-[11px] font-mono cursor-pointer shadow-sm group/btn"
                        >
                          <span>{pt ? 'Ler mais / Estudo completo' : 'Read more / Full case study'}</span>
                          <ArrowUpRight className="w-3 h-3 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                        </button>

                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1 px-2.5 py-1 border border-theme-border bg-theme-surface hover:border-theme-muted text-theme-text rounded-[2px] transition-colors font-mono uppercase tracking-wider text-[11px]"
                          >
                            <span>Live</span>
                            <ExternalLink className="w-3 h-3 text-theme-muted" />
                          </a>
                        )}

                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1 px-2.5 py-1 border border-theme-border bg-theme-surface hover:border-theme-muted text-theme-text rounded-[2px] transition-colors font-mono uppercase tracking-wider text-[11px]"
                          >
                            <Code2 className="w-3 h-3 text-theme-muted" />
                            <span>GitHub</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ol>

      {/* Modal Detalhado Acionado Exclusivamente pelo Botão "Ler Mais" */}
      <ProjectStudyModal
        isOpen={Boolean(modalProjectId)}
        onClose={() => setModalProjectId(null)}
        initialProjectId={modalProjectId}
      />
    </div>
  );
}
