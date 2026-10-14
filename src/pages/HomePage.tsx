import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import Hero from '../components/Hero';
import { useApp } from '../context/AppContext';
import { projectsPt, projectsEn } from '../data/projects';
import EditorialColophon from '../components/EditorialColophon';
import ExperienceSection from '../components/ExperienceSection';
import StackSection from '../components/StackSection';
import ContactSection from '../components/ContactSection';
import TiltProjectCard from '../components/TiltProjectCard';
import ProjectStudyModal from '../components/ProjectStudyModal';
import { Project } from '../types';

export default function HomePage() {
  const { language } = useApp();
  const rawProjects = language === 'pt' ? projectsPt : projectsEn;
  const projects = rawProjects.filter((p) => !p.disabled);

  const [activeFilter, setActiveFilter] = useState<'all' | 'web' | 'api' | 'data'>('all');
  const [isStudyModalOpen, setIsStudyModalOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const sliderRef = useRef<HTMLDivElement>(null);

  // Mouse drag handling for desktop trackpad/mouse
  const isMouseDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const hasMovedRef = useRef(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleOpenProjectDetails = (project: Project) => {
    if (hasMovedRef.current) return;
    setSelectedProjectId(project.id);
    setIsStudyModalOpen(true);
  };

  const filteredProjects = projects.filter((project) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'web') return project.category === 'web_product';
    if (activeFilter === 'api') return project.category === 'integration_api';
    if (activeFilter === 'data') return project.category === 'data_backend';
    return true;
  });

  const filterTabs = [
    { key: 'all', label: language === 'pt' ? 'Todos os Projetos' : 'All Projects', count: projects.length },
    { key: 'web', label: language === 'pt' ? 'Web & SaaS' : 'Web & SaaS', count: projects.filter((p) => p.category === 'web_product').length },
    { key: 'api', label: language === 'pt' ? 'APIs & Integrações' : 'APIs & Integrations', count: projects.filter((p) => p.category === 'integration_api').length },
    { key: 'data', label: language === 'pt' ? 'Bancos de Dados & OCR' : 'Data & OCR', count: projects.filter((p) => p.category === 'data_backend').length },
  ];

  const updateScrollState = useCallback(() => {
    const el = sliderRef.current;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

    // Calculate approximate active card index
    const cards = Array.from(el.querySelectorAll('[data-project-card]')) as HTMLElement[];
    if (cards.length > 0) {
      let closestIdx = 0;
      let minDiff = Infinity;
      cards.forEach((card, idx) => {
        const diff = Math.abs(card.offsetLeft - scrollLeft);
        if (diff < minDiff) {
          minDiff = diff;
          closestIdx = idx;
        }
      });
      setActiveIndex(closestIdx);
    }
  }, []);

  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;

    updateScrollState();
    el.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);

    return () => {
      el.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, [updateScrollState, filteredProjects]);

  const handleFilterChange = (key: 'all' | 'web' | 'api' | 'data') => {
    setActiveFilter(key);
    setActiveIndex(0);
    if (sliderRef.current) {
      sliderRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    const el = sliderRef.current;
    if (!el) return;

    const cards = Array.from(el.querySelectorAll('[data-project-card]')) as HTMLElement[];
    if (cards.length === 0) return;

    const currentScroll = el.scrollLeft;
    let targetCard: HTMLElement | null = null;

    if (direction === 'right') {
      targetCard = cards.find((card) => card.offsetLeft > currentScroll + 20) || cards[cards.length - 1];
    } else {
      const reversed = [...cards].reverse();
      targetCard = reversed.find((card) => card.offsetLeft < currentScroll - 20) || cards[0];
    }

    if (targetCard) {
      el.scrollTo({
        left: targetCard.offsetLeft - el.offsetLeft,
        behavior: 'smooth',
      });
    }
  };

  const scrollToCard = (index: number) => {
    const el = sliderRef.current;
    if (!el) return;
    const cards = Array.from(el.querySelectorAll('[data-project-card]')) as HTMLElement[];
    if (cards[index]) {
      el.scrollTo({
        left: cards[index].offsetLeft - el.offsetLeft,
        behavior: 'smooth',
      });
    }
  };

  // Mouse Drag handlers for desktop / PC
  const handleMouseDown = (e: React.MouseEvent) => {
    // Only drag on primary (left) button click
    if (e.button !== 0) return;
    const el = sliderRef.current;
    if (!el) return;

    isMouseDownRef.current = true;
    hasMovedRef.current = false;
    startXRef.current = e.pageX;
    scrollLeftRef.current = el.scrollLeft;

    const onMouseMove = (moveEvent: MouseEvent) => {
      if (!isMouseDownRef.current || !sliderRef.current) return;
      const walk = moveEvent.pageX - startXRef.current;
      if (Math.abs(walk) > 3) {
        if (!hasMovedRef.current) {
          hasMovedRef.current = true;
          setIsDragging(true);
        }
        // Disable snap and smooth scroll while dragging for 1:1 instantaneous tracking
        sliderRef.current.style.scrollBehavior = 'auto';
        sliderRef.current.style.scrollSnapType = 'none';
        sliderRef.current.scrollLeft = scrollLeftRef.current - walk;
      }
    };

    const onMouseUp = () => {
      isMouseDownRef.current = false;
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);

      if (sliderRef.current) {
        sliderRef.current.style.scrollBehavior = '';
        sliderRef.current.style.scrollSnapType = '';
      }

      if (hasMovedRef.current) {
        setTimeout(() => {
          setIsDragging(false);
          hasMovedRef.current = false;
        }, 120);
      } else {
        setIsDragging(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  return (
    <div className="w-full">
      {/* Hero as Editorial Cover */}
      <Hero />

      {/* Selected Works Gallery - Touch & Arrow Slider */}
      <section
        id="projetos"
        className="py-12 md:py-16 bg-transparent px-6 md:px-10 lg:px-12 transition-colors relative z-10"
      >
        <div className="max-w-6xl mx-auto w-full space-y-4 md:space-y-5 relative z-10">
          {/* Section Header with Navigation Arrows */}
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-2xl sm:text-3xl lg:text-[28px] leading-tight font-semibold text-theme-text tracking-tight">
              {language === 'pt' ? 'Projetos' : 'Projects'}
            </h3>

            {/* Setas de navegação e dica discreta */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <span className="text-[10px] sm:text-[10.5px] font-mono text-theme-muted tracking-tight select-none">
                {language === 'pt' ? 'deslize para ver mais' : 'swipe to explore'}
              </span>

              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => scroll('left')}
                  disabled={!canScrollLeft}
                  aria-label={language === 'pt' ? 'Projeto anterior' : 'Previous project'}
                  className="p-1.5 sm:p-2 border border-theme-border rounded-[2px] bg-theme-surface hover:bg-theme-border/40 disabled:opacity-30 disabled:cursor-not-allowed text-theme-text transition-all cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => scroll('right')}
                  disabled={!canScrollRight}
                  aria-label={language === 'pt' ? 'Próximo projeto' : 'Next project'}
                  className="p-1.5 sm:p-2 border border-theme-border rounded-[2px] bg-theme-surface hover:bg-theme-border/40 disabled:opacity-30 disabled:cursor-not-allowed text-theme-text transition-all cursor-pointer"
                >
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Slider Horizontal Track: Desliza com o dedo no mobile, setas e drag no desktop */}
          <div className="relative w-full">
            <div
              ref={sliderRef}
              onMouseDown={handleMouseDown}
              onClickCapture={(e) => {
                if (hasMovedRef.current || isDragging) {
                  e.preventDefault();
                  e.stopPropagation();
                }
              }}
              className={`flex gap-3 sm:gap-5 lg:gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar pb-5 sm:pb-6 pt-1 pr-3 items-stretch select-none ${
                isDragging ? 'cursor-grabbing' : 'cursor-grab'
              }`}
              style={{
                WebkitOverflowScrolling: 'touch',
                touchAction: 'pan-x pan-y',
              }}
            >
              {filteredProjects.map((project) => (
                <TiltProjectCard
                  key={project.id}
                  project={project}
                  language={language}
                  isParentDragging={isDragging}
                  onOpenDetails={handleOpenProjectDetails}
                  className="w-[82vw] min-w-[82vw] max-w-[340px] sm:min-w-0 sm:w-[calc(50%-12px)] sm:max-w-[380px] lg:w-[calc(33.333%-16px)] lg:max-w-[400px] shrink-0 snap-start relative hover:z-30 focus-within:z-30 [&:has(.is-open)]:z-40"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Professional Trajectory & Experience */}
      <ExperienceSection showHeader={true} />

      {/* Technical Domains & Capabilities */}
      <StackSection showHeader={true} />

      {/* Direct Contact & Collaboration */}
      <ContactSection showHeader={true} />

      {/* Editorial Colophon */}
      <EditorialColophon />

      {/* Project Detailed Study Modal */}
      <ProjectStudyModal
        isOpen={isStudyModalOpen}
        onClose={() => setIsStudyModalOpen(false)}
        initialProjectId={selectedProjectId}
      />
    </div>
  );
}
