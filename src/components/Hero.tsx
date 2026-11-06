import React, { useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ArrowUpRight, FileDown, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { downloadResumePdf } from '../utils/generateResumePdf';
import { trackEvent } from '../utils/analytics';
import { currentStack } from '../data/stack';
import type { Project } from '../types';

interface HeroProps {
  projects: Project[];
}

export default function Hero({ projects }: HeroProps) {
  const { language, t } = useApp();
  const heroRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number | null>(null);

  // Parallax discreto na camada decorativa de fundo (apenas mouse e sem prefers-reduced-motion)
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    if (prefersReducedMotion || !hasFinePointer) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const render = () => {
      rafId.current = null;
      if (!bgRef.current) return;

      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      bgRef.current.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0)`;

      if (Math.abs(targetX - currentX) > 0.05 || Math.abs(targetY - currentY) > 0.05) {
        rafId.current = requestAnimationFrame(render);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();

      if (e.clientY < rect.top - 50 || e.clientY > rect.bottom + 50) return;

      const normX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const normY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

      // Deslocamento máximo calibrado entre 5px e 8px
      targetX = Math.max(-8, Math.min(8, normX * 8));
      targetY = Math.max(-6, Math.min(6, normY * 6));

      if (rafId.current === null) {
        rafId.current = requestAnimationFrame(render);
      }
    };

    const handleMouseLeave = () => {
      targetX = 0;
      targetY = 0;
      if (rafId.current === null) {
        rafId.current = requestAnimationFrame(render);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    const heroEl = heroRef.current;
    if (heroEl) {
      heroEl.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (heroEl) {
        heroEl.removeEventListener('mouseleave', handleMouseLeave);
      }
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  return (
    <section
      id="inicio"
      ref={heroRef}
      className="portfolio-section portfolio-hero relative flex flex-col justify-start bg-transparent transition-colors overflow-hidden"
    >
      {/* Camada Decorativa de Parallax Sutil de Fundo */}
      <div
        ref={bgRef}
        aria-hidden="true"
        className="absolute inset-[-15px] pointer-events-none overflow-hidden select-none z-0 will-change-transform opacity-60"
        style={{
          transform: 'translate3d(0, 0, 0)',
          maskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black 20%, transparent 85%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black 20%, transparent 85%)',
        }}
      >
        <svg
          className="absolute inset-0 w-full h-full text-theme-text opacity-[0.035]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="bento-fine-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 7" />
              <circle cx="20" cy="20" r="0.6" fill="currentColor" opacity="0.4" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#bento-fine-grid)" />
        </svg>

        {/* Marcadores geométricos discretos */}
        <div className="absolute top-20 sm:top-24 left-10 text-theme-text opacity-[0.06] font-mono text-[9px]">+</div>
        <div className="absolute top-20 sm:top-24 right-10 text-theme-text opacity-[0.06] font-mono text-[9px]">+</div>
        <div className="absolute bottom-8 left-12 text-theme-text opacity-[0.06] font-mono text-[9px]">+</div>
        <div className="absolute bottom-8 right-12 text-theme-text opacity-[0.06] font-mono text-[9px]">+</div>
      </div>

      <div className="portfolio-container relative z-10">
        <div className="relative border border-theme-border bg-theme-surface/90 p-6 sm:p-8 md:p-10 offset-card">
          <div className="max-w-3xl space-y-6 sm:space-y-7">
            <h1 className="font-serif text-[clamp(2rem,4vw,2.75rem)] font-medium tracking-[-0.02em] leading-[1.08] text-theme-text">
              Wallace Pereira
            </h1>

            <p className="max-w-2xl text-[15px] sm:text-base leading-relaxed text-theme-dim">
              {language === 'pt'
                ? 'Desenvolvo aplicações web e integrações com React, Angular, Node.js e PostgreSQL. Também construo automações com n8n e agentes de IA para reduzir tarefas manuais e melhorar operações.'
                : 'I build web applications and integrations with React, Angular, Node.js, and PostgreSQL. I also develop automations with n8n and AI agents to eliminate manual tasks and streamline operations.'}
            </p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-3 pt-1">
              <a
                href={`https://wa.me/5521999688381?text=${encodeURIComponent(
                  language === 'pt'
                    ? 'Olá, Wallace! Vi seu portfólio e gostaria de conversar sobre uma oportunidade / projeto.'
                    : 'Hello, Wallace! I came across your portfolio and would like to talk about an opportunity / project.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('whatsapp_click')}
                className="inline-flex items-center gap-2 border border-theme-text bg-theme-text px-4 py-2.5 text-sm font-mono uppercase tracking-wider text-theme-bg transition-opacity hover:opacity-90"
                title={language === 'pt' ? 'Conversar no WhatsApp com texto pronto' : 'Chat on WhatsApp with preset message'}
              >
                <MessageCircle aria-hidden="true" className="h-4 w-4" />
                <span>{language === 'pt' ? 'Conversar' : 'Get in touch'}</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  trackEvent('resume_download');
                  downloadResumePdf(language);
                }}
                className="inline-flex items-center gap-2 py-2 text-sm text-theme-dim underline decoration-theme-border underline-offset-4 transition-colors hover:text-theme-text hover:decoration-theme-text"
                title={language === 'pt' ? 'Baixar Currículo em PDF' : 'Download Resume as PDF'}
              >
                <FileDown aria-hidden="true" className="h-4 w-4" />
                <span>{language === 'pt' ? 'Currículo' : 'Resume'}</span>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <Link
            to="/#contato"
            aria-label={language === 'pt' ? 'Disponibilidade e contato' : 'Availability and contact'}
            className="group relative flex min-h-[116px] flex-col gap-3 border border-theme-border/80 bg-theme-surface/60 p-5 transition-colors hover:border-theme-muted focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-theme-text"
          >
            <span className="font-mono text-[13px] uppercase tracking-wide text-theme-muted">
              {language === 'pt' ? 'Disponibilidade' : 'Availability'}
            </span>
            <span className="pr-8 text-[15px] leading-relaxed text-theme-dim">
              <span className="block text-theme-text">
                {language === 'pt' ? 'Aberto a vagas full stack' : 'Open to full stack roles'}
              </span>
              <span className="block">{language === 'pt' ? 'Rio de Janeiro · remoto/híbrido' : 'Rio de Janeiro · remote/hybrid'}</span>
              <span className="block text-theme-muted">{t('hero.stat1.val')} {language === 'pt' ? 'de experiência' : 'of experience'}</span>
            </span>
            <ArrowUpRight aria-hidden="true" className="absolute right-5 top-5 h-4 w-4 text-theme-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>

          <Link
            to="/#tecnologias"
            aria-label={language === 'pt' ? 'Stack atual e competências' : 'Current stack and skills'}
            className="group relative flex min-h-[116px] flex-col gap-3 border border-theme-border/80 bg-theme-surface/60 p-5 transition-colors hover:border-theme-muted focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-theme-text"
          >
            <span className="font-mono text-[13px] uppercase tracking-wide text-theme-muted">
              {language === 'pt' ? 'Stack atual' : 'Current stack'}
            </span>
            <span className="pr-8 font-mono text-xs leading-relaxed text-theme-dim">
              {currentStack.join(' · ')}
            </span>
            <ArrowUpRight aria-hidden="true" className="absolute right-5 top-5 h-4 w-4 text-theme-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>

          <Link
            to="/#projetos"
            aria-label={language === 'pt' ? 'Projetos selecionados' : 'Selected projects'}
            className="group relative flex min-h-[116px] flex-col gap-3 border border-theme-border/80 bg-theme-surface/60 p-5 transition-colors hover:border-theme-muted focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-theme-text"
          >
            <span className="font-mono text-[13px] uppercase tracking-wide text-theme-muted">
              {language === 'pt' ? 'Projetos' : 'Projects'}
            </span>
            <span className="pr-8 text-[15px] leading-relaxed text-theme-dim">
              <span className="mb-1 block text-theme-text">
                {projects.length} {language === 'pt' ? 'projetos' : 'projects'}
              </span>
              {projects.slice(0, 2).map((project) => (
                <span key={project.id} className="block text-sm text-theme-muted">{project.title}</span>
              ))}
            </span>
            <ArrowUpRight aria-hidden="true" className="absolute right-5 top-5 h-4 w-4 text-theme-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>

          <Link
            to="/#experiencia"
            aria-label={language === 'pt' ? 'Trajetória profissional atual' : 'Current professional experience'}
            className="group relative flex min-h-[116px] flex-col gap-3 border border-theme-border/80 bg-theme-surface/60 p-5 transition-colors hover:border-theme-muted focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-theme-text"
          >
            <span className="font-mono text-[13px] uppercase tracking-wide text-theme-muted">
              {language === 'pt' ? 'Trajetória' : 'Experience'}
            </span>
            <span className="pr-8 text-[15px] leading-relaxed text-theme-dim">
              <span className="block text-theme-text">Prata e Prata</span>
              <span className="block text-sm text-theme-muted">
                {language === 'pt'
                  ? 'Analista de Automação, Integrações e Operações Financeiras'
                  : 'Automation, Integrations & Financial Operations Analyst'}
              </span>
            </span>
            <ArrowUpRight aria-hidden="true" className="absolute right-5 top-5 h-4 w-4 text-theme-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
