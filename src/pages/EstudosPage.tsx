import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, ChevronDown, ChevronUp, ExternalLink, Code2, ChevronLeft, ChevronRight } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import EditorialColophon from '../components/EditorialColophon';
import { useApp } from '../context/AppContext';
import { projectsPt, projectsEn } from '../data/projects';
import { usePageSeo } from '../utils/usePageSeo';

export default function EstudosPage() {
  const { language, t } = useApp();
  const [searchParams] = useSearchParams();
  const { id: routeProjectId } = useParams<{ id?: string }>();
  const initialParamId = routeProjectId || searchParams.get('id');
  const [activeFilter, setActiveFilter] = useState<'all' | 'web' | 'api' | 'data'>('all');
  const [expandedId, setExpandedId] = useState<string | null>(initialParamId || '01');

  const rawProjects = language === 'pt' ? projectsPt : projectsEn;
  const projects = rawProjects.filter((p) => !p.disabled);
  const currentProject = routeProjectId ? projects.find((p) => p.id === routeProjectId) : null;

  usePageSeo({
    title: currentProject
      ? `${currentProject.title} | Wallace Pereira - ${language === 'pt' ? 'Desenvolvedor Full Stack' : 'Full Stack Developer'}`
      : language === 'pt'
        ? 'Estudos de Caso e Projetos | Wallace Pereira - Desenvolvedor Full Stack'
        : 'Case Studies & Projects | Wallace Pereira - Full Stack Developer',
    description: currentProject
      ? currentProject.tagline
      : language === 'pt'
        ? 'Estudos de caso detalhados de projetos full stack desenvolvidos por Wallace Pereira: arquitetura, desafios superados, tecnologias e resultados.'
        : 'In-depth case studies and full stack projects developed by Wallace Pereira: architecture, solved challenges, tech stack, and deliverables.',
    path: routeProjectId ? `/projetos/${routeProjectId}` : '/estudos',
  });

  // Slider & Drag state for Filter Tabs (Desktop & Mobile)
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Mouse Drag refs
  const isMouseDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const hasDraggedRef = useRef(false);

  // Touch Swipe refs
  const touchStartXRef = useRef(0);
  const touchStartYRef = useRef(0);
  const touchStartScrollLeftRef = useRef(0);
  const isTouchDraggingRef = useRef(false);
  const isHorizontalSwipeRef = useRef<boolean | null>(null);

  const updateScrollStatus = () => {
    if (!tabsContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = tabsContainerRef.current;
    setCanScrollLeft(scrollLeft > 6);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 6);
  };

  useEffect(() => {
    const container = tabsContainerRef.current;
    if (!container) return;

    updateScrollStatus();
    container.addEventListener('scroll', updateScrollStatus, { passive: true });
    window.addEventListener('resize', updateScrollStatus);

    return () => {
      container.removeEventListener('scroll', updateScrollStatus);
      window.removeEventListener('resize', updateScrollStatus);
    };
  }, []);

  // Desktop Mouse Drag Listeners
  useEffect(() => {
    const handleWindowMouseMove = (e: MouseEvent) => {
      if (!isMouseDownRef.current || !tabsContainerRef.current) return;
      const deltaX = e.pageX - startXRef.current;
      if (Math.abs(deltaX) > 4) {
        hasDraggedRef.current = true;
      }
      tabsContainerRef.current.scrollLeft = scrollLeftRef.current - deltaX;
      updateScrollStatus();
    };

    const handleWindowMouseUp = () => {
      if (!isMouseDownRef.current) return;
      isMouseDownRef.current = false;
      setIsDragging(false);
      setTimeout(() => {
        hasDraggedRef.current = false;
      }, 80);
    };

    window.addEventListener('mousemove', handleWindowMouseMove);
    window.addEventListener('mouseup', handleWindowMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleWindowMouseMove);
      window.removeEventListener('mouseup', handleWindowMouseUp);
    };
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0 || !tabsContainerRef.current) return;
    if ('pointerType' in e.nativeEvent && (e.nativeEvent as any).pointerType === 'touch') return;
    isMouseDownRef.current = true;
    hasDraggedRef.current = false;
    startXRef.current = e.pageX;
    scrollLeftRef.current = tabsContainerRef.current.scrollLeft;
    setIsDragging(true);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!tabsContainerRef.current || e.touches.length !== 1) return;
    const touch = e.touches[0];
    touchStartXRef.current = touch.clientX;
    touchStartYRef.current = touch.clientY;
    touchStartScrollLeftRef.current = tabsContainerRef.current.scrollLeft;
    isTouchDraggingRef.current = true;
    hasDraggedRef.current = false;
    isHorizontalSwipeRef.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isTouchDraggingRef.current || !tabsContainerRef.current || e.touches.length !== 1) return;
    const touch = e.touches[0];
    const deltaX = touch.clientX - touchStartXRef.current;
    const deltaY = touch.clientY - touchStartYRef.current;

    if (isHorizontalSwipeRef.current === null) {
      if (Math.abs(deltaX) > 4 || Math.abs(deltaY) > 4) {
        isHorizontalSwipeRef.current = Math.abs(deltaX) >= Math.abs(deltaY);
        if (isHorizontalSwipeRef.current) {
          setIsDragging(true);
        }
      }
    }

    if (isHorizontalSwipeRef.current) {
      hasDraggedRef.current = true;
      tabsContainerRef.current.scrollLeft = touchStartScrollLeftRef.current - deltaX;
      updateScrollStatus();
    }
  };

  const handleTouchEnd = () => {
    isTouchDraggingRef.current = false;
    setIsDragging(false);
    isHorizontalSwipeRef.current = null;
    setTimeout(() => {
      hasDraggedRef.current = false;
    }, 100);
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (!tabsContainerRef.current) return;
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      tabsContainerRef.current.scrollLeft += e.deltaY;
      updateScrollStatus();
    }
  };

  const handleClickCapture = (e: React.MouseEvent) => {
    if (hasDraggedRef.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const scrollTabs = (direction: 'left' | 'right') => {
    if (!tabsContainerRef.current) return;
    const offset = direction === 'left' ? -220 : 220;
    tabsContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
  };

  const handleTabSelect = (tabKey: 'all' | 'web' | 'api' | 'data', e: React.MouseEvent<HTMLButtonElement>) => {
    if (hasDraggedRef.current) return;
    setActiveFilter(tabKey);
    e.currentTarget.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
      block: 'nearest',
    });
  };

  useEffect(() => {
    const idToFocus = routeProjectId || searchParams.get('id');
    if (idToFocus) {
      setExpandedId(idToFocus);
      const element = document.getElementById(`estudo-${idToFocus}`) || document.getElementById(`projeto-${idToFocus}`);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 120);
      }
    }
  }, [routeProjectId, searchParams]);

  const filteredProjects = projects.filter((project) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'web') return project.category === 'web_product';
    if (activeFilter === 'api') return project.category === 'integration_api';
    if (activeFilter === 'data') return project.category === 'data_backend';
    return true;
  });

  const filterTabs = [
    { key: 'all', label: language === 'pt' ? 'Todos os Projetos' : 'All Projects', count: projects.length },
    { key: 'web', label: language === 'pt' ? 'Produtos Web & SaaS' : 'Web & SaaS', count: projects.filter(p => p.category === 'web_product').length },
    { key: 'api', label: language === 'pt' ? 'Integrações & APIs' : 'APIs & Integrations', count: projects.filter(p => p.category === 'integration_api').length },
    { key: 'data', label: language === 'pt' ? 'Bancos de Dados & OCR' : 'Data & OCR', count: projects.filter(p => p.category === 'data_backend').length },
  ];

  return (
    <div className="w-full">
      {/* Page Header */}
      <PageHeader
        eyebrow={language === 'pt' ? 'ESTUDOS DE CASO' : 'CASE STUDIES'}
        title={language === 'pt' ? 'Projetos.' : 'Projects.'}
        description={
          language === 'pt'
            ? 'Estudos de caso e arquitetura de sistemas: projetos reais com problemas de negócio concretos, decisões arquiteturais documentadas e código em produção.'
            : 'Case studies and system architecture: production systems solving tangible business problems with documented architectural tradeoffs and live deployments.'
        }
        meta={[
          { label: language === 'pt' ? 'Escopo' : 'Scope', value: language === 'pt' ? 'Full Stack & APIs' : 'Full Stack & APIs' },
          { label: language === 'pt' ? 'Casos Documentados' : 'Documented Cases', value: `${projects.length} Sistemas` },
          { label: language === 'pt' ? 'Padrão' : 'Standard', value: 'Service Layer / Dual-Engine' },
        ]}
      />

      {/* Filter Tabs Bar */}
      <section className="border-b border-theme-border bg-theme-surface/95 py-3 md:py-4 px-4 sm:px-6 md:px-12 sticky top-[57px] md:top-[65px] z-30 transition-colors backdrop-blur-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-3 sm:gap-4 relative">
          {/* Scroll Left Button & Gradient (visible when scrollable to the left) */}
          {canScrollLeft && (
            <div className="absolute left-0 top-0 bottom-0 z-10 flex items-center pointer-events-none pr-6 bg-gradient-to-r from-theme-surface via-theme-surface/80 to-transparent">
              <button
                type="button"
                onClick={() => scrollTabs('left')}
                className="pointer-events-auto p-1 rounded border border-theme-border/80 bg-theme-surface text-theme-dim hover:text-theme-text hover:border-theme-text/40 transition-colors shadow-sm"
                aria-label={language === 'pt' ? 'Rolar filtros para esquerda' : 'Scroll filters left'}
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Draggable & Swipeable Filter Tabs Strip */}
          <div
            ref={tabsContainerRef}
            onMouseDown={handleMouseDown}
            onClickCapture={handleClickCapture}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={handleTouchEnd}
            onWheel={handleWheel}
            className={`flex-1 flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar scroll-smooth py-1 px-0.5 overscroll-x-contain ${
              isDragging
                ? 'cursor-grabbing select-none'
                : 'cursor-grab'
            }`}
            style={{
              WebkitOverflowScrolling: 'touch',
              touchAction: 'pan-y',
            }}
          >
            {filterTabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                draggable={false}
                onClick={(e) => handleTabSelect(tab.key as any, e)}
                className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider rounded-[2px] transition-colors whitespace-nowrap shrink-0 select-none ${
                  activeFilter === tab.key
                    ? 'bg-theme-text text-theme-bg font-medium shadow-sm'
                    : 'text-theme-dim hover:text-theme-text hover:bg-theme-border/40'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>

          {/* Scroll Right Button & Gradient (visible when scrollable to the right) */}
          {canScrollRight && (
            <div className="absolute right-0 md:right-auto md:relative top-0 bottom-0 z-10 flex items-center pointer-events-none pl-6 bg-gradient-to-l from-theme-surface via-theme-surface/80 to-transparent md:bg-none md:pl-1">
              <button
                type="button"
                onClick={() => scrollTabs('right')}
                className="pointer-events-auto p-1 rounded border border-theme-border/80 bg-theme-surface text-theme-dim hover:text-theme-text hover:border-theme-text/40 transition-colors shadow-sm"
                aria-label={language === 'pt' ? 'Rolar filtros para direita' : 'Scroll filters right'}
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          <span className="hidden md:inline-block text-[11px] font-mono text-theme-muted shrink-0 pl-2 border-l border-theme-border/40">
            {filteredProjects.length} {language === 'pt' ? 'registros exibidos' : 'records shown'}
          </span>
        </div>
      </section>

      {/* Case Studies Detailed Document Flow */}
      <main className="py-10 md:py-14 px-6 md:px-12 bg-transparent transition-colors">
        <div className="max-w-6xl mx-auto space-y-8 md:space-y-10">
          {filteredProjects.map((project, index) => {
            const isExpanded = expandedId === project.id;

            return (
              <article
                key={project.id}
                id={`estudo-${project.id}`}
                className="border border-theme-border bg-theme-surface rounded-[2px] overflow-hidden transition-all duration-200 hover:border-theme-text/40"
              >
                {/* Header Summary Bar */}
                <div className="p-6 md:p-8 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-theme-dim border-b border-theme-border/60 pb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-theme-text font-medium">{project.role}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span>{project.period}</span>
                      {project.featured && (
                        <span className="text-[10px] uppercase tracking-widest text-brand-blue border border-brand-blue/30 px-1.5 py-0.5 rounded-[2px]">
                          Destaque
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h2 className="text-xl md:text-2xl font-semibold text-theme-text tracking-tight">
                      {project.title}
                    </h2>
                    <p className="text-sm md:text-base text-theme-dim leading-relaxed max-w-4xl">
                      {project.tagline}
                    </p>
                  </div>

                  {/* Production & Code Links */}
                  <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-mono">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-theme-text text-theme-bg hover:opacity-90 rounded-[2px] transition-opacity uppercase tracking-wider text-[11px]"
                      >
                        <span>{t('proj.action.live')}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-theme-border text-theme-dim hover:text-theme-text rounded-[2px] transition-colors uppercase tracking-wider text-[11px]"
                      >
                        <Code2 className="w-3 h-3" />
                        <span>{t('proj.action.github')}</span>
                      </a>
                    )}

                    <button
                      onClick={() => setExpandedId(isExpanded ? null : project.id)}
                      className="ml-auto inline-flex items-center gap-1 text-xs font-mono text-theme-dim hover:text-theme-text transition-colors py-1.5"
                    >
                      <span>{isExpanded ? (language === 'pt' ? 'Ocultar Detalhes' : 'Hide Specs') : (language === 'pt' ? 'Ver Análise Arquitetural' : 'View Architecture')}</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {/* Expandable Architectural Specification */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      className="border-t border-theme-border bg-theme-bg/60 overflow-hidden"
                    >
                      <div className="p-6 md:p-8 space-y-8">
                        {/* Visual Illustration if available */}
                        {project.imageUrl && (
                          <div className="relative w-full aspect-[21/9] sm:aspect-[2.5/1] overflow-hidden rounded-[2px] border border-theme-border bg-theme-surface">
                            <img
                              src={project.imageUrl}
                              alt={project.title}
                              className="w-full h-full object-cover object-center filter contrast-[1.04] brightness-[0.98]"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-theme-bg via-transparent to-transparent opacity-60" />
                            <span className="absolute bottom-3 left-3 text-[10px] font-mono px-2 py-0.5 bg-black/75 backdrop-blur-sm text-white rounded-[2px] border border-white/10 uppercase tracking-widest">
                              {language === 'pt' ? 'Visualização da Arquitetura do Sistema' : 'Architectural System Visual'}
                            </span>
                          </div>
                        )}

                        {/* Step-by-Step Architectural Pipeline if available */}
                        {project.workflow && project.workflow.length > 0 && (
                          <div className="space-y-3 p-4 sm:p-5 bg-theme-surface border border-theme-border rounded-[2px]">
                            <span className="text-[10px] font-mono uppercase tracking-widest text-theme-muted block font-semibold">
                              {language === 'pt' ? 'Pipeline Operacional Passo a Passo' : 'Step-by-Step Operational Pipeline'}
                            </span>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                              {project.workflow.map((item) => (
                                <div key={item.step} className="p-3 bg-theme-bg border border-theme-border/60 rounded-[2px] space-y-1">
                                  <span className="text-[10px] font-mono text-brand-blue font-bold px-1.5 py-0.2 bg-theme-surface border border-brand-blue/30 rounded-[2px]">
                                    {item.step}
                                  </span>
                                  <h4 className="text-xs font-semibold text-theme-text">{item.title}</h4>
                                  <p className="text-[11px] text-theme-dim leading-relaxed">{item.description}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Tri-Column Specification: Challenge, Architecture, Impact */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                          <div className="space-y-2">
                            <span className="text-[10px] font-mono uppercase tracking-wider text-theme-muted block">
                              {t('proj.label.challenge')}
                            </span>
                            <p className="text-xs sm:text-sm text-theme-dim leading-relaxed">
                              {project.challenge}
                            </p>
                          </div>

                          <div className="space-y-2">
                            <span className="text-[10px] font-mono uppercase tracking-wider text-theme-muted block">
                              {t('proj.label.solution')}
                            </span>
                            <p className="text-xs sm:text-sm text-theme-dim leading-relaxed">
                              {project.solution}
                            </p>
                          </div>

                          <div className="space-y-2">
                            <span className="text-[10px] font-mono uppercase tracking-wider text-theme-muted block">
                              {t('proj.label.impact')}
                            </span>
                            <p className="text-xs sm:text-sm text-theme-dim leading-relaxed">
                              {project.impact}
                            </p>
                          </div>
                        </div>

                        {/* Stack Checklist */}
                        <div className="pt-4 border-t border-theme-border/60">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-theme-muted block mb-2">
                            {t('proj.label.stack')}
                          </span>
                          <div className="flex flex-wrap gap-2 text-xs font-mono">
                            {project.technologies.map((tech) => (
                              <span
                                key={tech}
                                className="px-2 py-1 bg-theme-surface border border-theme-border rounded-[2px] text-theme-dim"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </article>
            );
          })}
        </div>
      </main>

      {/* Editorial Colophon */}
      <EditorialColophon
        nextRoute={{
          path: '/trajetoria',
          label: language === 'pt' ? 'Trajetória Profissional & Formação' : 'Career & Education',
        }}
      />
    </div>
  );
}
