import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Project } from '../types';
import { getProjectHighlight } from '../data/projectHighlights';
import { useApp } from '../context/AppContext';
import ProjectMinimalCover from './ProjectMinimalCover';

interface ProjectsListProps {
  projects: Project[];
  language: string;
}

export default function ProjectsList({ projects, language }: ProjectsListProps) {
  const { theme } = useApp();
  const isLight = theme === 'light';
  const isEnglish = language === 'en';
  const reduceMotion = useReducedMotion();
  const [openProjectId, setOpenProjectId] = useState<string | null>(null);

  if (projects.length === 0) return null;

  return (
    <section
      aria-labelledby="projects-heading"
      className="w-full space-y-5 sm:space-y-7"
    >
      <motion.header
        initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="pb-4 border-b border-theme-border/60"
      >
        <span className="text-xs font-mono text-theme-muted uppercase tracking-widest block mb-3">
          {isEnglish ? 'Selected work' : 'Trabalhos selecionados'}
        </span>
        <h2
          id="projects-heading"
          className="font-serif text-2xl sm:text-[26px] leading-[1.15] font-medium text-theme-text tracking-[-0.015em]"
        >
          {isEnglish ? 'Projects' : 'Projetos'}
        </h2>
      </motion.header>

      <div className="divide-y divide-theme-border/70 border-b border-theme-border/70">
        {projects.map((project, index) => {
          const isOpen = openProjectId === project.id;
          const panelId = `project-details-${project.id}`;
          const shortDescription = project.subtitle || getProjectHighlight(project.id, language) || project.tagline;
          const fullDescription = project.description || project.solution;

          return (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{
                duration: 0.5,
                delay: reduceMotion ? 0 : (index % 4) * 0.07,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group"
            >
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenProjectId(isOpen ? null : project.id)}
                className="w-full py-4 sm:py-5 grid grid-cols-[2.5rem_minmax(0,1fr)_1.5rem] sm:grid-cols-[3rem_minmax(0,1fr)_1.5rem] gap-3 sm:gap-4 text-left cursor-pointer focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-theme-text"
              >
                <span className="font-mono text-xs sm:text-sm text-theme-muted pt-0.5">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="min-w-0 space-y-1.5">
                  <span className="block text-base sm:text-lg font-medium text-theme-text group-hover:text-theme-text transition-colors">
                    {project.title}
                  </span>
                  <span className="block text-sm sm:text-[15px] text-theme-dim leading-relaxed">
                    {shortDescription}
                  </span>
                </span>
                <ChevronDown
                  aria-hidden="true"
                  className={`w-4 h-4 mt-1 text-theme-muted transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                />
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={panelId}
                    role="region"
                    aria-label={`${project.title} ${isEnglish ? 'details' : 'detalhes'}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: reduceMotion ? 0 : 0.2, ease: 'easeOut' }}
                    className="overflow-hidden"
                  >
                    <div className="pl-[2.5rem] sm:pl-[3rem] pb-6 sm:pb-8 grid gap-5 sm:gap-7 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
                      <div className="aspect-[16/9] overflow-hidden border border-theme-border/70 bg-theme-surface grayscale">
                        <ProjectMinimalCover
                          projectId={project.id}
                          isCenter
                          isLight={isLight}
                        />
                      </div>

                      <div className="flex flex-col items-start gap-4 sm:gap-5">
                        <p className="text-sm sm:text-[15px] text-theme-dim leading-relaxed">
                          {fullDescription}
                        </p>
                        <p className="text-xs sm:text-sm font-mono text-theme-muted leading-relaxed">
                          {project.technologies.slice(0, 5).join(' · ')}
                        </p>
                        <Link
                          to={`/projetos/${project.id}`}
                          className="inline-flex items-center gap-1.5 text-sm text-theme-text underline underline-offset-4 decoration-theme-border hover:decoration-theme-text transition-colors"
                        >
                          {isEnglish ? 'View case study' : 'Ver estudo de caso'}
                          <ArrowUpRight aria-hidden="true" className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
