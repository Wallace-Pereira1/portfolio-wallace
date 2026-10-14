import React from 'react';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { Project } from '../types';
import TechBadge from './TechBadge';

interface TiltProjectCardProps {
  key?: React.Key;
  project: Project;
  language: 'pt' | 'en';
  isParentDragging?: boolean;
  onOpenDetails?: (project: Project) => void;
  className?: string;
}

export default function TiltProjectCard({
  project,
  language,
  isParentDragging = false,
  onOpenDetails,
  className = '',
}: TiltProjectCardProps) {
  const handleCardClick = (e: React.MouseEvent) => {
    if (isParentDragging) return;
    onOpenDetails?.(project);
  };

  return (
    <article
      data-project-card
      onClick={handleCardClick}
      className={`relative z-0 hover:z-30 focus-within:z-30 [&:has(.is-open)]:z-40 border border-theme-border hover:border-theme-muted/80 bg-theme-surface rounded-[2px] p-4 sm:p-5 flex flex-col justify-between cursor-pointer group transition-all duration-200 offset-card select-none ${className || 'w-full'}`}
    >
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col justify-start">
        {/* Project Cover Image */}
        {project.imageUrl && (
          <div className="relative w-full aspect-[16/9] max-h-[175px] sm:max-h-[190px] overflow-hidden rounded-[2px] border border-theme-border/70 bg-theme-bg mb-3 shrink-0">
            <img
              src={project.imageUrl}
              alt={project.title}
              loading="lazy"
              draggable={false}
              className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-300 ease-out select-none pointer-events-none"
            />
            {/* Subtle Gradient Shadow Base */}
            <div className="absolute inset-0 bg-gradient-to-t from-theme-surface via-transparent to-transparent opacity-40 pointer-events-none" />
          </div>
        )}

        {/* Card Header & Content */}
        <div className="space-y-1">
          {/* Nome do Projeto */}
          <h3 className="text-base sm:text-[17px] font-semibold text-theme-text tracking-tight leading-snug group-hover:text-brand-blue transition-colors break-words">
            {project.title}
          </h3>

          {/* Frase de Impacto */}
          <p className="text-xs sm:text-[12.5px] text-theme-dim leading-relaxed line-clamp-2">
            {project.tagline}
          </p>
        </div>
      </div>

      {/* Footer Area: Technologies & Actions */}
      <div className="mt-2.5 pt-2 sm:mt-3 sm:pt-2 border-t border-theme-border/60 space-y-2 relative z-20">
        {/* Tecnologias Principais (até 5) */}
        <div className="flex flex-wrap gap-1 relative z-30">
          {project.technologies.slice(0, 5).map((tech) => (
            <TechBadge
              key={tech}
              tech={tech}
              language={language}
              size="sm"
            />
          ))}
        </div>

        {/* Botão "Ver Mais" & Links */}
        <div className="pt-1.5 flex items-center justify-between text-xs font-mono">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenDetails?.(project);
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1 bg-theme-text text-theme-bg hover:opacity-90 rounded-[2px] transition-opacity font-mono text-[10.5px] uppercase tracking-wider font-semibold cursor-pointer shadow-sm group/btn"
          >
            <span>{language === 'pt' ? 'Ver Mais' : 'View More'}</span>
            <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
          </button>

          <div className="flex items-center gap-2.5">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1 text-theme-dim hover:text-theme-text transition-colors text-[10.5px] hover:underline"
              >
                <span>Live</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1 text-theme-dim hover:text-theme-text transition-colors text-[10.5px] hover:underline"
              >
                <span>GitHub</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
