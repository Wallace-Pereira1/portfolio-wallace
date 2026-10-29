import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, ExternalLink, Code2 } from 'lucide-react';
import { Project } from '../types';
import { getProjectHighlight } from '../data/projectHighlights';
import { useApp } from '../context/AppContext';
import TechBadge from './TechBadge';
import ProjectStudyModal from './ProjectStudyModal';
import ProjectMinimalCover from './ProjectMinimalCover';

interface ProjectsListProps {
  projects: Project[];
  language: string;
}

const AUTOPLAY_INTERVAL_MS = 4000;

/**
 * Retorna a menor distância circular entre dois índices em um anel de tamanho `total`.
 * Ex: para total=7, index=0 e current=6 -> diff = +1 (à direita).
 */
function getCircularDiff(index: number, current: number, total: number): number {
  if (total <= 0) return 0;
  let diff = (index - current) % total;
  if (diff > total / 2) diff -= total;
  if (diff < -total / 2) diff += total;
  return diff;
}

/**
 * Carrossel em pirâmide de 3 cards para a seção de Projetos:
 * - Rotação automática suave a cada 4 segundos
 * - Pausa automática no hover ou quando o modal está aberto
 * - Transição fluida de encolhimento do card central e crescimento do novo central
 * - Capas vetoriais ultra-minimalistas sob medida para cada projeto
 * - Navegação via clique nos cards laterais, pills circulares, touch e setas
 */
export default function ProjectsList({ projects, language }: ProjectsListProps) {
  const { theme } = useApp();
  const isLight = theme === 'light';
  const pt = language !== 'en';
  const total = projects.length;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalProjectId, setModalProjectId] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  const carouselRef = useRef<HTMLDivElement>(null);

  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotionPreference = () => setPrefersReducedMotion(motionPreference.matches);
    motionPreference.addEventListener('change', updateMotionPreference);
    return () => motionPreference.removeEventListener('change', updateMotionPreference);
  }, []);

  // Navegação
  const handleNext = useCallback(() => {
    if (total === 0) return;
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const handlePrev = useCallback(() => {
    if (total === 0) return;
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const handleSelectIndex = useCallback((idx: number) => {
    setCurrentIndex(idx);
  }, []);

  // Autoplay de 4 segundos, pausado no hover ou com modal aberto
  useEffect(() => {
    if (isHovered || isFocused || prefersReducedMotion || modalProjectId || total <= 1) return;

    const timer = setInterval(() => {
      handleNext();
    }, AUTOPLAY_INTERVAL_MS);

    return () => clearInterval(timer);
  }, [isHovered, isFocused, prefersReducedMotion, modalProjectId, total, handleNext]);

  // Teclado (setas)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target;
      const isTextEntry = target instanceof HTMLElement &&
        (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName));
      if (modalProjectId || isTextEntry || !carouselRef.current?.contains(document.activeElement)) return;
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalProjectId, handleNext, handlePrev]);

  // Gestos de Touch / Swipe mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (deltaX > 40) {
      handlePrev();
    } else if (deltaX < -40) {
      handleNext();
    }
    touchStartX.current = null;
  };

  if (total === 0) return null;

  return (
    <div
      ref={carouselRef}
      role="region"
      aria-roledescription={pt ? 'carrossel' : 'carousel'}
      aria-label={pt ? 'Projetos em destaque' : 'Featured projects'}
      className="space-y-4 sm:space-y-6 select-none"
      onFocus={() => setIsFocused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setIsFocused(false);
      }}
    >
      {/* 1. Cabeçalho da Seção */}
      <div className="pb-3 border-b border-theme-border/60">
        <span className="text-[11px] font-mono text-theme-muted uppercase tracking-widest block mb-1">
          {pt ? 'Estudos de Caso & Portfólio' : 'Case Studies & Portfolio'}
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-[40px] leading-[1.1] font-medium text-theme-text tracking-[-0.015em]">
          {pt ? 'Projetos' : 'Projects'}
        </h2>
      </div>

      {/* 2. Palco do Carrossel Pirâmide com Animação Fluida Sem Travamentos */}
      <div
        className="relative w-full h-[410px] sm:h-[450px] md:h-[520px] lg:h-[550px] overflow-hidden sm:overflow-visible py-2 flex items-center justify-center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="relative w-full h-full max-w-6xl xl:max-w-7xl mx-auto flex items-center justify-center">
          {projects.map((project, index) => {
            const diff = getCircularDiff(index, currentIndex, total);
            const isCenter = diff === 0;
            const isLeft = diff === -1;
            const isRight = diff === 1;
            const isFarLeft = diff === -2;
            const isFarRight = diff === 2;
            const isVisible = Math.abs(diff) <= 2;

            // Se estiver fora do alcance dos 5 cards renderizados, não desenha
            if (!isVisible) return null;

            // Posição horizontal calculada responsiva
            // O centro fica em -50% (ancorado em left: 50%)
            let targetX = '-50%';
            let scale = 1;
            let opacity = 1;
            let zIndex = 10;
            let pointerEvents: 'auto' | 'none' = 'none';

            if (isCenter) {
              targetX = '-50%';
              scale = 1.02;
              opacity = 1;
              zIndex = 30;
              pointerEvents = 'auto';
            } else if (isLeft) {
              targetX = 'calc(-50% - 70%)';
              scale = 0.86;
              opacity = 0.45;
              zIndex = 15;
              pointerEvents = 'auto';
            } else if (isRight) {
              targetX = 'calc(-50% + 70%)';
              scale = 0.86;
              opacity = 0.45;
              zIndex = 15;
              pointerEvents = 'auto';
            } else if (isFarLeft) {
              targetX = 'calc(-50% - 140%)';
              scale = 0.74;
              opacity = 0;
              zIndex = 0;
              pointerEvents = 'none';
            } else if (isFarRight) {
              targetX = 'calc(-50% + 140%)';
              scale = 0.74;
              opacity = 0;
              zIndex = 0;
              pointerEvents = 'none';
            }

            return (
              <motion.div
                key={project.id}
                initial={false}
                animate={{
                  x: targetX,
                  scale,
                  opacity,
                  zIndex,
                }}
                transition={{
                  duration: 0.65,
                  ease: [0.25, 1, 0.5, 1], // Desaceleração suave estilo editorial
                }}
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: 0,
                  pointerEvents,
                }}
                className={`w-[82vw] max-w-[340px] sm:w-[380px] md:w-[470px] lg:w-[530px] xl:w-[560px] origin-center ${
                  !isCenter ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''
                }`}
                onClick={() => {
                  if (isLeft) handlePrev();
                  else if (isRight) handleNext();
                }}
              >
                <ProjectCardItem
                  project={project}
                  isCenter={isCenter}
                  position={isLeft ? 'left' : isRight ? 'right' : 'center'}
                  language={language}
                  pt={pt}
                  isLight={isLight}
                  onOpenModal={() => setModalProjectId(project.id)}
                />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* 3. Indicador de Paginação Circular (Pills clicáveis) */}
      <div className="flex items-center justify-center gap-1.5 pt-1">
        {projects.map((proj, idx) => {
          const isActive = idx === currentIndex;
          return (
            <button
              key={`pill-${proj.id}`}
              type="button"
              onClick={() => handleSelectIndex(idx)}
              aria-label={`${pt ? 'Ir para projeto' : 'Go to project'} ${proj.title}`}
              className={`h-1 transition-all duration-300 rounded-[1px] cursor-pointer ${
                isActive
                  ? 'w-7 bg-theme-text shadow-sm'
                  : 'w-2 bg-theme-border hover:bg-theme-muted'
              }`}
            />
          );
        })}
      </div>

      {/* 4. Modal de Estudo de Caso Completo */}
      <ProjectStudyModal
        isOpen={Boolean(modalProjectId)}
        onClose={() => setModalProjectId(null)}
        initialProjectId={modalProjectId}
      />
    </div>
  );
}

interface ProjectCardItemProps {
  project: Project;
  isCenter: boolean;
  position: 'left' | 'center' | 'right';
  language: string;
  pt: boolean;
  isLight: boolean;
  onOpenModal?: () => void;
}

/**
 * Card individual com capa ultra-minimalista sob medida,
 * acabamento editorial fino, stacks compactas e link para estudo completo.
 */
function ProjectCardItem({
  project,
  isCenter,
  position,
  language,
  pt,
  isLight,
  onOpenModal,
}: ProjectCardItemProps) {
  const highlight = getProjectHighlight(project.id, language) ?? project.tagline;

  return (
    <article
      data-project-card
      className={`relative w-full rounded-[2px] border bg-white dark:bg-theme-surface flex flex-col justify-between overflow-hidden transition-all duration-300 ${
        isCenter
          ? 'border-slate-400 dark:border-theme-muted/80 shadow-xl shadow-slate-900/10 dark:shadow-2xl dark:shadow-black/70 ring-1 ring-slate-900/10 dark:ring-white/10'
          : 'border-slate-200 dark:border-theme-border/70 hover:border-slate-300 dark:hover:border-theme-muted/60 shadow-sm'
      }`}
    >
      {/* Capa do Projeto: Capa Vetorial Ultra Minimalista customizada por projeto */}
      <div className="relative w-full aspect-[16/9] max-h-[155px] sm:max-h-[175px] md:max-h-[225px] lg:max-h-[250px] overflow-hidden bg-slate-50 dark:bg-[#090a0e] shrink-0 border-b border-slate-200 dark:border-theme-border/60">
        <ProjectMinimalCover
          projectId={project.id}
          isCenter={isCenter}
          isLight={isLight}
        />

        {/* Gradiente sutil para fusão limpa com o corpo */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/90 dark:from-theme-surface/85 via-transparent to-transparent pointer-events-none" />

        {/* Selo de Categoria (Alto Contraste em Modo Claro e Escuro) */}
        <div className="absolute top-2 left-2 flex items-center gap-1.5 z-10">
          <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-wider px-2 py-0.5 bg-white dark:bg-[#12141c] text-slate-950 dark:text-zinc-100 font-bold rounded-[2px] shadow-sm border border-slate-300 dark:border-white/20">
            {project.category.replace('_', ' ')}
          </span>
        </div>
      </div>

      {/* Conteúdo do Card */}
      <div className="p-3.5 sm:p-4 md:p-5 flex-1 flex flex-col justify-between space-y-2">
        <div className="space-y-1">
          <h3 className="font-serif text-[15px] sm:text-base md:text-[17px] lg:text-lg font-medium text-slate-900 dark:text-theme-text leading-snug line-clamp-1">
            {project.title}
          </h3>
          <p className="font-mono text-[10.5px] md:text-xs text-slate-700 dark:text-theme-dim line-clamp-1 font-medium">
            {project.subtitle || highlight}
          </p>
          <p className="text-xs md:text-[13px] text-slate-600 dark:text-theme-muted line-clamp-2 leading-relaxed pt-0.5 font-normal">
            {project.description || project.tagline}
          </p>
        </div>

        {/* Stacks Compactas com Preview de Ícone */}
        <div className="flex flex-wrap items-center gap-1 pt-1">
          {project.technologies.slice(0, isCenter ? 4 : 3).map((tech) => (
            <TechBadge
              key={tech}
              tech={tech}
              language={pt ? 'pt' : 'en'}
              size="xs"
              expandOnHover={isCenter}
              iconOnly={!isCenter}
            />
          ))}
          {!isCenter && project.technologies.length > 3 && (
            <span className="text-[9.5px] font-mono text-slate-700 dark:text-theme-muted font-semibold select-none">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>

        {/* Rodapé / Ações */}
        {isCenter ? (
          <div className="pt-2 border-t border-theme-border/50 flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onOpenModal?.();
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-theme-text text-theme-bg hover:opacity-90 rounded-[2px] transition-opacity font-semibold uppercase tracking-wider text-[10px] font-mono cursor-pointer shadow-sm group/btn"
            >
              <span>{pt ? 'Estudo completo' : 'Full case study'}</span>
              <ArrowUpRight className="w-3 h-3 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </button>

            <div className="flex items-center gap-1.5">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  aria-label={`${pt ? 'Acessar site' : 'Open live site'}: ${project.title}`}
                  className="inline-flex items-center gap-1 px-2 py-0.5 border border-theme-border bg-theme-bg hover:border-theme-muted text-theme-text rounded-[2px] transition-colors font-mono text-[9.5px] uppercase tracking-wider"
                >
                  <span>{pt ? 'Acessar site' : 'Live site'}</span>
                  <ExternalLink className="w-2.5 h-2.5 text-theme-muted" />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  aria-label={`${pt ? 'Abrir repositório' : 'Open repository'}: ${project.title}`}
                  className="inline-flex items-center gap-1 px-2 py-0.5 border border-theme-border bg-theme-bg hover:border-theme-muted text-theme-text rounded-[2px] transition-colors font-mono text-[9.5px] uppercase tracking-wider"
                >
                  <Code2 className="w-2.5 h-2.5 text-theme-muted" />
                  <span>Code</span>
                </a>
              )}
            </div>
          </div>
        ) : (
          <div className="pt-1 border-t border-theme-border/30 text-center">
            <span className="font-mono text-[9.5px] uppercase tracking-wider text-theme-muted hover:text-theme-text transition-colors">
              {position === 'left'
                ? pt
                  ? '← Clique para focar'
                  : '← Click to focus'
                : pt
                ? 'Clique para focar →'
                : 'Click to focus →'}
            </span>
          </div>
        )}
      </div>
    </article>
  );
}
