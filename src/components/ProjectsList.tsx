import React from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Project } from '../types';
import { getProjectHighlight } from '../data/projectHighlights';

interface ProjectsListProps {
  projects: Project[];
  language: string;
  onOpen: (project: Project) => void;
}

/**
 * Índice editorial de projetos: uma linha por projeto, todos visíveis de uma vez.
 * Clicar na linha abre o estudo de caso (modal). O link "Live" abre o site do projeto.
 */
export default function ProjectsList({ projects, language, onOpen }: ProjectsListProps) {
  const pt = language !== 'en';

  return (
    <div className="space-y-5 md:space-y-6">
      <div className="flex items-end justify-between gap-3">
        <h3 className="font-serif text-3xl sm:text-4xl lg:text-[40px] leading-[1.1] font-medium text-theme-text tracking-[-0.015em]">
          {pt ? 'Projetos' : 'Projects'}
        </h3>
        <span className="text-[11px] font-mono text-theme-muted tracking-tight select-none pb-1.5">
          {String(projects.length).padStart(2, '0')} {pt ? 'projetos' : 'projects'}
        </span>
      </div>

      <ol className="offset-static mr-2 mb-2 border border-theme-border bg-theme-surface rounded-[2px] divide-y divide-theme-border">
        {projects.map((project, index) => {
          const highlight = getProjectHighlight(project.id, language) ?? project.tagline;
          const techs = project.technologies.slice(0, 3);
          const extra = project.technologies.length - techs.length;

          return (
            <li key={project.id} className="relative group/row">
              <button
                type="button"
                onClick={() => onOpen(project)}
                aria-label={`${pt ? 'Abrir estudo de caso' : 'Open case study'}: ${project.title}`}
                className="w-full text-left grid grid-cols-[auto_1fr] md:grid-cols-[3rem_minmax(0,1.5fr)_minmax(0,1fr)_minmax(0,1.1fr)] gap-x-4 md:gap-x-6 gap-y-1.5 items-baseline px-4 sm:px-6 py-4 sm:py-5 pr-14 sm:pr-28 transition-colors duration-150 hover:bg-theme-border/25 focus-visible:bg-theme-border/25 outline-none focus-visible:ring-1 focus-visible:ring-theme-text/40"
              >
                <span className="font-mono text-[11px] text-theme-muted transition-colors group-hover/row:text-theme-text">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="text-base sm:text-[17px] font-medium text-theme-text leading-snug transition-transform duration-200 group-hover/row:translate-x-1">
                  {project.title}
                </span>
                <span className="col-start-2 md:col-start-auto font-mono text-[12px] text-theme-dim leading-snug">
                  {highlight}
                </span>
                <span className="col-start-2 md:col-start-auto font-mono text-[11px] text-theme-muted truncate">
                  {techs.join(' · ')}
                  {extra > 0 ? ` +${extra}` : ''}
                </span>
              </button>

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
                <ArrowRight className="w-4 h-4 text-theme-muted pointer-events-none transition-all duration-200 group-hover/row:translate-x-1 group-hover/row:text-theme-text" />
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
