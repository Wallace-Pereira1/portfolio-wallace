import { lazy, Suspense, useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ArrowUpRight, ChevronDown, ExternalLink } from 'lucide-react';
import { Project } from '../types';
import { useApp } from '../context/AppContext';
import { isLightTheme } from '../data/themes';
import ProjectMinimalCover from './ProjectMinimalCover';

const ProjectStudyModal = lazy(() => import('./ProjectStudyModal'));

interface ProjectsListProps {
  projects: Project[];
  language: string;
}

export default function ProjectsList({ projects, language }: ProjectsListProps) {
  const { theme } = useApp();
  const isLight = isLightTheme(theme);
  const isEnglish = language === 'en';
  const featuredOrder = ['02', '09', '01'];
  const featuredProjects = featuredOrder
    .map((id) => projects.find((project) => project.id === id))
    .filter((project): project is Project => Boolean(project));
  const remainingProjects = projects.filter((project) => !featuredOrder.includes(project.id));
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [selectedStudyProject, setSelectedStudyProject] = useState<Project | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  // Escuta evento global disparado quando o usuário clica em "Usado em: [Projeto]"
  useEffect(() => {
    const handleOpenProjectEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ projectId: string; openModal?: boolean }>;
      const targetId = customEvent.detail?.projectId;
      if (!targetId) return;

      const found = projects.find(
        (p) =>
          p.id === targetId ||
          p.id === `0${targetId}` ||
          `0${p.id}` === targetId ||
          p.id.toLowerCase() === targetId.toLowerCase()
      );

      if (found) {
        if (!featuredOrder.includes(found.id)) setShowAllProjects(true);
        if (customEvent.detail?.openModal !== false) {
          setSelectedStudyProject(found);
        }
      }
    };

    window.addEventListener('open-project-study', handleOpenProjectEvent);
    return () => {
      window.removeEventListener('open-project-study', handleOpenProjectEvent);
    };
  }, [projects]);

  // Se o usuário acessar /?projeto=04#projetos ou vier de um redirecionamento
  useEffect(() => {
    const paramId = searchParams.get('projeto');
    if (paramId) {
      const found = projects.find(
        (p) =>
          p.id === paramId ||
          p.id === `0${paramId}` ||
          `0${p.id}` === paramId ||
          p.id.toLowerCase() === paramId.toLowerCase()
      );

      if (found) {
        if (!featuredOrder.includes(found.id)) setShowAllProjects(true);
        setSelectedStudyProject(found);
        setTimeout(() => {
          const el = document.getElementById(`project-item-${found.id}`) || document.getElementById('projetos');
          el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 120);

        const nextParams = new URLSearchParams(searchParams);
        nextParams.delete('projeto');
        setSearchParams(nextParams, { replace: true });
      }
    }
  }, [searchParams, setSearchParams, projects]);

  if (projects.length === 0) return null;

  const displayedProjects = showAllProjects
    ? [...featuredProjects, ...remainingProjects]
    : featuredProjects;

  const categoryLabel = (project: Project) => {
    const labels = {
      web_product: isEnglish ? 'WEB PRODUCT' : 'PRODUTO WEB',
      integration_api: isEnglish ? 'INTEGRATIONS & APIs' : 'INTEGRAÇÕES & APIs',
      data_backend: isEnglish ? 'DATA & BACKEND' : 'DADOS & BACKEND',
    };
    return labels[project.category];
  };

  return (
    <section
      aria-labelledby="projects-heading"
      className="w-full space-y-5 sm:space-y-7"
    >
      <header className="pb-4 border-b border-theme-border/60">
        <span className="text-xs font-mono text-theme-muted uppercase tracking-widest block mb-3">
          {isEnglish ? 'Selected work' : 'Trabalhos selecionados'}
        </span>
        <h2
          id="projects-heading"
          className="font-serif text-2xl sm:text-[26px] leading-[1.15] font-medium text-theme-text tracking-[-0.015em]"
        >
          {isEnglish ? 'Projects' : 'Projetos'}
        </h2>
      </header>

      <div className="space-y-5 sm:space-y-7">
        {displayedProjects.map((project, index) => (
          <article
            key={project.id}
            id={`project-item-${project.id}`}
            className="grid gap-5 border border-theme-border/70 bg-theme-surface/35 p-4 sm:p-5 md:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] md:items-center md:gap-6"
          >
            <div className="aspect-[16/9] overflow-hidden border border-theme-border/70 bg-theme-surface">
              {project.imageUrl && project.id !== '09' ? (
                <img
                  src={project.imageUrl}
                  alt={isEnglish ? `${project.title} interface` : `Interface do projeto ${project.title}`}
                  className="h-full w-full object-contain"
                  loading={index < 3 ? 'eager' : 'lazy'}
                />
              ) : (
                <ProjectMinimalCover projectId={project.id} isCenter isLight={isLight} />
              )}
            </div>

            <div className="flex min-w-0 flex-col items-start gap-3 sm:gap-3.5">
              <span className="font-mono text-xs uppercase tracking-[0.16em] text-theme-muted">
                {categoryLabel(project)}
              </span>
              <h3 className="text-lg font-medium leading-snug text-theme-text sm:text-xl">
                {project.title}
              </h3>
              <p className="text-sm leading-relaxed text-theme-dim">
                {project.subtitle || project.tagline}
              </p>

              {project.workflow && project.workflow.length > 0 && (
                <ul className="space-y-1 text-xs text-theme-muted">
                  {project.workflow.slice(0, 3).map((item) => (
                    <li key={item.step} className="flex gap-2">
                      <span aria-hidden="true" className="mt-[0.45rem] h-1 w-1 shrink-0 rounded-full bg-theme-muted" />
                      <span>{item.title}</span>
                    </li>
                  ))}
                </ul>
              )}

              <p className="font-mono text-xs leading-relaxed text-theme-muted">
                {project.technologies.slice(0, 5).join(' · ')}
              </p>

              <div className="mt-1 flex flex-wrap items-center gap-4">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wide text-theme-text underline decoration-theme-border underline-offset-4 transition-colors hover:decoration-theme-text"
                  >
                    {isEnglish ? 'Live' : 'Acessar'}
                    <ExternalLink aria-hidden="true" className="h-3.5 w-3.5" />
                  </a>
                )}
                <button
                  type="button"
                  onClick={(event) => {
                    triggerRef.current = event.currentTarget;
                    setSelectedStudyProject(project);
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wide text-theme-dim underline decoration-theme-border underline-offset-4 transition-colors hover:text-theme-text hover:decoration-theme-text"
                >
                  {isEnglish ? 'Case study' : 'Estudo de caso'}
                  <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {remainingProjects.length > 0 && (
        <button
          type="button"
          aria-expanded={showAllProjects}
          onClick={() => setShowAllProjects((current) => !current)}
          className="group flex w-full items-center justify-between border border-theme-border/70 bg-theme-surface/35 px-4 py-3 text-left font-mono text-xs uppercase tracking-wide text-theme-dim transition-colors hover:border-theme-muted hover:text-theme-text sm:px-5"
        >
          <span>
            {showAllProjects
              ? isEnglish ? 'Show fewer projects' : 'Ver menos projetos'
              : isEnglish ? `View all projects (${remainingProjects.length})` : `Ver mais projetos (${remainingProjects.length})`}
          </span>
          <ArrowUpRight
            aria-hidden="true"
            className={`h-4 w-4 transition-transform ${showAllProjects ? 'rotate-[-45deg]' : 'group-hover:translate-x-0.5 group-hover:-translate-y-0.5'}`}
          />
        </button>
      )}

      {selectedStudyProject && (
        <Suspense fallback={null}>
          <ProjectStudyModal
            isOpen
            onClose={() => setSelectedStudyProject(null)}
            project={selectedStudyProject}
            language={language === 'en' ? 'en' : 'pt'}
            triggerElement={triggerRef.current}
          />
        </Suspense>
      )}
    </section>
  );
}
