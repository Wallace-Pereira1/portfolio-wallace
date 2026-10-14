import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, ChevronDown, ChevronUp } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { projectsPt, projectsEn } from '../data/projects';

export default function ProjectsSection() {
  const { language, t } = useApp();
  const [activeFilter, setActiveFilter] = useState<'all' | 'web' | 'api' | 'data'>('all');
  const [expandedId, setExpandedId] = useState<string | null>('01'); // First project expanded by default

  const rawProjects = language === 'pt' ? projectsPt : projectsEn;
  const projects = rawProjects.filter((p) => !p.disabled);

  const filteredProjects = projects.filter((project) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'web') return project.category === 'web_product';
    if (activeFilter === 'api') return project.category === 'integration_api';
    if (activeFilter === 'data') return project.category === 'data_backend';
    return true;
  });

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section
      id="projetos"
      className="py-24 md:py-36 bg-theme-bg px-6 md:px-12 transition-colors"
    >
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Editorial Section Header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end pb-8">
          <div className="md:col-span-8 space-y-3">
            <span className="text-[11px] font-mono text-theme-muted uppercase tracking-widest block">
              {language === 'pt' ? 'Estudos de Caso' : 'Case Studies'}
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl lg:text-[40px] leading-[1.1] font-medium text-theme-text tracking-[-0.015em]">
              {t('proj.title')}
            </h3>
            <p className="text-sm sm:text-base text-theme-dim max-w-2xl leading-relaxed">
              {t('proj.desc')}
            </p>
          </div>

          {/* Discreet Monospace Filter Strip */}
          <div className="md:col-span-4 flex md:justify-end">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] font-mono">
              <button
                onClick={() => setActiveFilter('all')}
                className={`transition-colors ${
                  activeFilter === 'all'
                    ? 'text-theme-text font-semibold underline underline-offset-4'
                    : 'text-theme-muted hover:text-theme-text'
                }`}
              >
                {t('proj.filter.all')}
              </button>
              <span className="text-theme-border">/</span>
              <button
                onClick={() => setActiveFilter('web')}
                className={`transition-colors ${
                  activeFilter === 'web'
                    ? 'text-theme-text font-semibold underline underline-offset-4'
                    : 'text-theme-muted hover:text-theme-text'
                }`}
              >
                {t('proj.filter.web')}
              </button>
              <span className="text-theme-border">/</span>
              <button
                onClick={() => setActiveFilter('api')}
                className={`transition-colors ${
                  activeFilter === 'api'
                    ? 'text-theme-text font-semibold underline underline-offset-4'
                    : 'text-theme-muted hover:text-theme-text'
                }`}
              >
                {t('proj.filter.api')}
              </button>
              <span className="text-theme-border">/</span>
              <button
                onClick={() => setActiveFilter('data')}
                className={`transition-colors ${
                  activeFilter === 'data'
                    ? 'text-theme-text font-semibold underline underline-offset-4'
                    : 'text-theme-muted hover:text-theme-text'
                }`}
              >
                {t('proj.filter.data')}
              </button>
            </div>
          </div>
        </div>

        {/* Case Studies Editorial Flow (Divided by Precision Lines) */}
        <div className="divide-y divide-theme-border">
          {filteredProjects.map((project, index) => {
            const isExpanded = expandedId === project.id;
            return (
              <article
                key={project.id}
                className="py-10 md:py-14 space-y-6 transition-colors"
              >
                {/* Master Header Row */}
                <div
                  onClick={() => toggleExpand(project.id)}
                  className="cursor-pointer select-none group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-theme-muted px-1.5 py-0.5 border border-theme-border-subtle bg-theme-surface">
                        {project.category === 'web_product' && (language === 'pt' ? 'Produto Web' : 'Web Product')}
                        {project.category === 'integration_api' && (language === 'pt' ? 'Integração & APIs' : 'Integration & API')}
                        {project.category === 'data_backend' && (language === 'pt' ? 'Dados & Backend' : 'Data & Backend')}
                      </span>
                      {project.period && (
                        <span className="text-xs font-mono text-theme-dim hidden sm:inline">
                          {project.period}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-4 text-xs font-mono">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="group/link inline-flex items-center gap-1 text-theme-text hover:text-theme-dim transition-colors"
                        >
                          <span className="border-b border-theme-text/40 group-hover/link:border-theme-text pb-0.5">
                            {t('proj.action.live')}
                          </span>
                          <ArrowUpRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                        </a>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleExpand(project.id);
                        }}
                        className="p-1 text-theme-muted group-hover:text-theme-text transition-colors"
                        aria-label="Expand case study"
                      >
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-baseline">
                    <h3 className="md:col-span-5 text-xl sm:text-2xl font-semibold text-theme-text tracking-tight group-hover:text-theme-dim transition-colors">
                      {project.title}
                    </h3>
                    <p className="md:col-span-7 text-sm sm:text-base text-theme-dim leading-relaxed">
                      {project.tagline}
                    </p>
                  </div>
                </div>

                {/* Expanded Detailed Architecture & Case Study */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                      className="overflow-hidden pt-4 space-y-8"
                    >
                      {/* Tri-Column Engineering Analysis (Challenge / Architecture / Impact) */}
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-2">
                        {/* Challenge */}
                        <div className="md:col-span-4 space-y-2">
                          <span className="text-[11px] font-mono uppercase tracking-widest text-theme-muted block">
                            {t('proj.label.challenge')}
                          </span>
                          <p className="text-xs sm:text-sm text-theme-dim leading-relaxed">
                            {project.challenge}
                          </p>
                        </div>

                        {/* Solution & Architecture */}
                        <div className="md:col-span-4 space-y-2">
                          <span className="text-[11px] font-mono uppercase tracking-widest text-theme-muted block">
                            {t('proj.label.solution')}
                          </span>
                          <p className="text-xs sm:text-sm text-theme-dim leading-relaxed">
                            {project.solution}
                          </p>
                        </div>

                        {/* Impact */}
                        <div className="md:col-span-4 space-y-2">
                          <span className="text-[11px] font-mono uppercase tracking-widest text-theme-muted block">
                            {t('proj.label.impact')}
                          </span>
                          <p className="text-xs sm:text-sm text-theme-text leading-relaxed">
                            {project.impact}
                          </p>
                        </div>
                      </div>

                      {/* Technical Specs Strip */}
                      <div className="pt-4 border-t border-theme-border-subtle flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 text-xs font-mono">
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                          <span className="text-theme-muted uppercase tracking-wider text-[11px]">
                            Stack Técnica:
                          </span>
                          {project.technologies.map((tech, idx) => (
                            <React.Fragment key={tech}>
                              <span className="text-theme-text">{tech}</span>
                              {idx < project.technologies.length - 1 && (
                                <span className="text-theme-border">/</span>
                              )}
                            </React.Fragment>
                          ))}
                        </div>

                        <div className="text-theme-dim">
                          <span className="text-theme-muted uppercase tracking-wider text-[11px] mr-1">
                            Função:
                          </span>
                          {project.role}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
